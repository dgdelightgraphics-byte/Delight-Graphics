const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || ''
const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET || ''

export const MAX_IMAGE_SIZE_BYTES = 3 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
export const MAX_TESTIMONIAL_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_BYTES
export const ALLOWED_TESTIMONIAL_IMAGE_TYPES = ALLOWED_IMAGE_TYPES
export const MAX_TEAM_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_BYTES
export const ALLOWED_TEAM_IMAGE_TYPES = ALLOWED_IMAGE_TYPES

export const validateImageUpload = (file, maxSizeBytes = MAX_IMAGE_SIZE_BYTES, allowedTypes = ALLOWED_IMAGE_TYPES) => {
  if (!file) {
    return { valid: false, error: 'Please select an image file.' }
  }

  if (!file.type || !allowedTypes.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Only JPG, JPEG, PNG, and WEBP images are supported.',
    }
  }

  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: 'Please choose an image smaller than 3MB.',
    }
  }

  return { valid: true }
}

const toHex = (buffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('')

const createSignature = async (params) => {
  const body = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&')

  const encoder = new TextEncoder()
  const data = encoder.encode(`${body}${CLOUDINARY_API_SECRET}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return toHex(digest)
}

export const uploadImageToCloudinary = (file, folder = 'testimonials', onProgress = () => {}) => {
  return new Promise((resolve, reject) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      reject(new Error('Cloudinary is not configured. Please add your cloud name and upload preset.'))
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    formData.append('folder', folder)
    formData.append('quality', 'auto')
    formData.append('fetch_format', 'auto')

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`)

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100)
        onProgress(percent)
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText)
          const imageUrl = response.secure_url || response.url
          if (!imageUrl) {
            reject(new Error('Cloudinary did not return an image URL.'))
            return
          }
          resolve(imageUrl)
        } catch (error) {
          reject(new Error('The image upload response was invalid.'))
        }
      } else {
        let message = 'Image upload failed.'
        try {
          const response = JSON.parse(xhr.responseText)
          message = response.error?.message || message
        } catch (error) {
          // ignore parse errors
        }
        reject(new Error(message))
      }
    })

    xhr.addEventListener('error', () => {
      reject(new Error('Network error while uploading the image.'))
    })

    xhr.send(formData)
  })
}

export const deleteCloudinaryImage = async (imageUrl) => {
  if (!imageUrl || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return false
  }

  try {
    const urlParts = imageUrl.split('/upload/')[1]?.split('/') || []
    const versionIndex = urlParts[0]?.startsWith('v') ? 1 : 0
    const publicId = urlParts.slice(versionIndex).join('/').replace(/\.[^/.]+$/, '')

    if (!publicId) {
      return false
    }

    const timestamp = Math.floor(Date.now() / 1000)
    const params = { public_id: publicId, api_key: CLOUDINARY_API_KEY, timestamp }
    const signature = await createSignature(params)

    const formData = new FormData()
    formData.append('public_id', publicId)
    formData.append('api_key', CLOUDINARY_API_KEY)
    formData.append('timestamp', String(timestamp))
    formData.append('signature', signature)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      return false
    }

    const result = await response.json()
    return result.result === 'ok'
  } catch (error) {
    console.error('Cloudinary delete failed:', error)
    return false
  }
}

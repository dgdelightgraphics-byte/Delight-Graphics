import { ref, uploadBytesResumable, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebase'

// Centralized upload helper for Firebase Storage
// - reports progress via onProgress(percent)
// - returns { url, path }
// - throws an Error with code/message from Firebase when upload fails
export const uploadFile = (file, folder, onProgress = () => {}) => {
  const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`)
  const uploadTask = uploadBytesResumable(storageRef, file)

  return new Promise((resolve, reject) => {
    let settled = false

    const cleanup = () => {
      // noop for now; reserved for future cancellation support
    }

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (!snapshot.totalBytes) return
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        try { onProgress(progress) } catch (e) { /* ignore progress handler errors */ }
      },
      async (error) => {
        if (settled) return
        // If the SDK gave up (retry-limit-exceeded) try a single-shot upload as a fallback
        const code = error?.code || ''
        if (code === 'storage/retry-limit-exceeded' || (error?.message || '').includes('Max retry time')) {
          try {
            const altRef = storageRef
            await uploadBytes(altRef, file)
            const url = await getDownloadURL(altRef)
            settled = true
            cleanup()
            resolve({ url, path: altRef.fullPath })
            return
          } catch (altErr) {
            settled = true
            cleanup()
            const err = new Error(
              altErr?.message || 'Upload failed after multiple attempts. Check network, CORS, and Firebase Storage rules.'
            )
            err.code = altErr?.code || 'storage/fallback-failed'
            reject(err)
            return
          }
        }

        settled = true
        cleanup()
        const err = new Error(error?.message || 'Upload failed')
        err.code = code || 'storage/unknown'
        reject(err)
      },
      async () => {
        if (settled) return
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          settled = true
          cleanup()
          resolve({ url, path: uploadTask.snapshot.ref.fullPath })
        } catch (err) {
          if (settled) return
          settled = true
          cleanup()
          const error = new Error(err?.message || 'Unable to obtain download URL')
          error.code = err?.code || 'storage/no-download-url'
          reject(error)
        }
      }
    )
  })
}

export default uploadFile

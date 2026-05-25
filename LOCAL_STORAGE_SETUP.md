# Local Storage Setup - Website Data Sync

## Overview

Your website now uses **local browser storage** instead of cloud storage. Changes made in the admin panel automatically sync to the website without any code changes needed.

## How It Works

### 1. **Data Storage Location**
All website data is stored in your browser's localStorage under the key: `website_data`

### 2. **Admin Panel Updates**
When you edit any content in the admin panel (/admin):
- Changes are immediately saved to localStorage
- A sync event is triggered to notify all website components
- Website pages automatically update with new data (no page refresh needed)

### 3. **Data Flow**
```
Admin Panel → localStorage (website_data) → Website Pages
```

## What Data Is Managed

The following content can be edited from the admin panel:

✅ **Hero Section** - Heading, subheading, CTA buttons
✅ **About Section** - Description, mission, vision
✅ **Services** - Add/edit/delete services (6 main services on home)
✅ **Portfolio** - Add/edit/delete portfolio items
✅ **Testimonials** - Add/edit/delete client testimonials with photos
✅ **Team Members** - Add/edit/delete team information
✅ **Contact Information** - Phone, email, address, WhatsApp
✅ **Social Media Links** - All social profiles
✅ **Settings** - SEO, theme preferences, footer text
✅ **Media** - Upload and manage media files

## Website Pages Using Dynamic Data

The following pages automatically display your localStorage data:

- **Home** (`/`) - Displays featured services, portfolio, testimonials, stats
- **Portfolio** (`/portfolio`) - Shows all portfolio items from admin
- **Contact** (`/contact`) - Displays your contact information from admin
- **About** (`/about`) - Shows about section data from admin

## How to Edit Content

### 1. Navigate to Admin Panel
```
http://localhost:[PORT]/admin/login
```

### 2. Choose Section to Edit
- Dashboard → Services → Update services
- Dashboard → Testimonials → Add client reviews with photos
- Dashboard → Portfolio → Add your work samples
- Dashboard → Contact → Update contact details
- Dashboard → Hero → Edit main heading
- Dashboard → About → Update company description
- Dashboard → Settings → SEO, theme, footer text

### 3. Save Changes
- Click "Save" or "Update" button
- Changes are instantly saved to localStorage
- Website automatically updates (no refresh needed!)

## Key Features

✨ **Real-Time Sync**
- Changes appear immediately on the website
- No server required, works completely offline
- Fast and responsive updates

✨ **Persistent Data**
- Data stays saved even if you close the browser
- Survives page refreshes
- Works across different browser tabs

✨ **Easy Management**
- Simple admin interface
- Add, edit, delete any content
- Upload images directly

## Browser Storage Info

- **Storage Type**: Browser localStorage (built-in feature)
- **Capacity**: ~5-10MB per website (usually enough)
- **Persistence**: Data stays until cleared (by user)
- **Privacy**: Data stays only in your browser (no cloud)

## Clearing Data

To reset all data to defaults:

### Option 1: From Admin
- Go to Admin Settings
- Look for "Reset Data" option (if available)

### Option 2: Manually Clear
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Find and delete the `website_data` key
4. Page will reload with default data

## Important Notes

⚠️ **Single Device**
- Data is stored on THIS device/browser only
- Editing on one device won't sync to another
- Each device has its own copy

⚠️ **Browser Specific**
- Data in Chrome is separate from Firefox, Edge, etc.
- Clearing browser data will delete all website data
- Switching browsers means starting fresh

⚠️ **Backup Recommendation**
- Export your data periodically (if you add this feature)
- Keep backup copies of important content

## Troubleshooting

### Changes Not Showing?
1. Check if admin saved successfully (look for success message)
2. Refresh the website page (Ctrl+R or Cmd+R)
3. Check browser console for errors (F12)

### Storage Full?
1. Clear some media files from admin
2. Browser localStorage typically has 5-10MB limit

### Need to Start Over?
1. Open DevTools (F12)
2. Application → Local Storage
3. Delete `website_data` key
4. Website returns to defaults

## Technical Details

### Storage Key
- Admin and Website both use: `website_data`
- Located in browser localStorage
- Synced via custom `websiteDataChanged` event

### Default Data Structure
```javascript
{
  hero: { heading, subheading, buttons },
  about: { description, mission, vision },
  services: [],
  portfolio: [],
  testimonials: [],
  team: [],
  contact: { phone, email, address },
  socialMedia: { instagram, facebook, linkedin, ... },
  settings: { darkMode, seoTitle, seoDescription },
  media: []
}
```

## Getting Started

1. ✅ Open admin panel at `/admin/login`
2. ✅ Login with your credentials
3. ✅ Edit any section you want
4. ✅ Click Save
5. ✅ Visit website pages to see changes instantly!

---

**No cloud services needed. No databases to manage. Just pure local storage!**

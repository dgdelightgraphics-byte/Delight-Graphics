# Admin Panel Documentation

## Overview
This is a complete, modern admin dashboard for managing your website content without touching any code. Built with React, Framer Motion, and Tailwind CSS.

## Features

### ✅ Authentication
- **Secure Login**: Username and password authentication
- **Session Persistence**: Your login session is saved to localStorage
- **Protected Routes**: Only authenticated users can access the admin panel
- **Auto-Redirect**: Unauthorized users are automatically redirected to login

### 📊 Dashboard
- **Dashboard Home**: Overview of all website statistics
- **Quick Actions**: Easy access to frequently used management tools
- **Website Overview**: See the status of all major sections

### 🎨 Content Management

#### 1. Hero Section
- Edit main heading and subheading
- Customize CTA button text and links
- Update background effects
- Live preview of changes

#### 2. About Section
- Edit company description
- Set mission statement
- Set vision statement
- Upload company images

#### 3. Services
- Add/Edit/Delete services
- Add service icons
- Edit service descriptions
- Reorder services
- Add up to unlimited services

#### 4. Portfolio
- Add/Edit/Delete portfolio items
- Upload project images
- Add project categories
- Toggle featured projects
- Showcase your best work

#### 5. Testimonials
- Add client testimonials
- Set star ratings (1-5 stars)
- Upload client photos
- Edit/Delete testimonials
- Display social proof

#### 6. Team Members
- Add/Edit/Delete team members
- Upload profile photos
- Add social media links
- Display team roles

#### 7. Contact Information
- Edit phone number
- Edit email address
- Edit physical address
- Update WhatsApp link
- Embed Google Maps

#### 8. Social Media
- Instagram profile link
- Facebook page link
- YouTube channel link
- LinkedIn profile link
- Behance portfolio link

#### 9. Media Manager
- Upload images
- Upload videos
- Organize media files
- Delete unwanted files
- Drag & drop support

#### 10. Website Settings
- Toggle dark/light mode
- Set SEO meta title
- Set SEO meta description
- Upload favicon
- Edit footer text

## Login Credentials

Set the admin username and password in the project root `.env` file:

```
VITE_ADMIN_USERNAME=dg_admin
VITE_ADMIN_PASSWORD=DG_degital_work
```

## How to Access

1. Navigate to `http://localhost:3000/admin/login`
2. Enter the credentials above
3. Click Login
4. You'll be redirected to the dashboard

## File Structure

```
src/admin/
├── context/
│   ├── AdminAuthContext.jsx      # Authentication logic
│   └── AdminDataContext.jsx      # Data management & state
├── components/
│   ├── ProtectedRoute.jsx        # Protected route wrapper
│   ├── AdminSidebar.jsx          # Side navigation
│   ├── AdminTopbar.jsx           # Top navigation
│   └── Toast.jsx                 # Notification system
├── pages/
│   ├── AdminLogin.jsx            # Login page
│   ├── AdminLayout.jsx           # Main layout wrapper
│   ├── Dashboard.jsx             # Dashboard home
│   ├── HeroPage.jsx              # Hero management
│   ├── AboutPage.jsx             # About management
│   ├── ServicesPage.jsx          # Services management
│   ├── PortfolioPage.jsx         # Portfolio management
│   ├── TestimonialsPage.jsx      # Testimonials management
│   ├── TeamPage.jsx              # Team management
│   ├── ContactPage.jsx           # Contact management
│   ├── SocialMediaPage.jsx       # Social media links
│   ├── MediaPage.jsx             # Media management
│   └── SettingsPage.jsx          # Website settings
├── hooks/                        # Custom React hooks
├── utils/
│   └── helpers.js                # Utility functions
└── index.js                      # Exports

```

## Data Storage

All data is stored in **localStorage** initially for easy setup. To integrate with a backend:

1. Modify `AdminDataContext.jsx` to make API calls instead of localStorage
2. Replace localStorage save/load with fetch requests
3. Add error handling for API calls

Example API integration pattern:
```javascript
// Replace localStorage.setItem with API call
const response = await fetch('/api/admin/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

## Styling

- **Framework**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: Dark theme with glassmorphism effects
- **Responsive**: Fully responsive design

## Features Included

✅ Modern admin dashboard
✅ Dark theme with glassmorphism
✅ Smooth animations
✅ Toast notifications
✅ Protected routes
✅ Session persistence
✅ Responsive design
✅ All CRUD operations
✅ Drag & drop interface
✅ Live preview
✅ Form validation
✅ Sidebar navigation
✅ Mobile friendly

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Security Notes

### ⚠️ Important
- The credentials are hardcoded for demo purposes
- For production, implement proper backend authentication
- Use environment variables for credentials
- Add JWT tokens for session management
- Use HTTPS in production

## Extending the Admin Panel

### Adding a New Section

1. Create a new page in `src/admin/pages/NewPage.jsx`
2. Add context methods in `AdminDataContext.jsx`
3. Add route in `App.jsx`
4. Add sidebar menu item in `AdminSidebar.jsx`

### Example:
```javascript
// 1. Create page
export const NewPage = () => {
  const { data, updateNewSection } = useAdminData()
  // ... component code
}

// 2. Add to context
const updateNewSection = (newData) => {
  setData(prev => ({ ...prev, newSection: newData }))
}

// 3. Add route in App.jsx
<Route path="/admin/new" element={<ProtectedRoute><NewPage /></ProtectedRoute>} />

// 4. Add to sidebar
{ title: 'New Section', icon: Icon, path: '/admin/new', category: 'content' }
```

## Performance Tips

1. Images are loaded asynchronously
2. Lazy loading for large datasets
3. Debounced search/filter operations
4. Optimized re-renders with React.memo
5. Minimal bundle size

## Troubleshooting

### Login not working?
- Clear browser localStorage
- Verify `.env` has the correct `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD`
- Make sure you're at `/admin/login`

### Data not saving?
- Check browser's localStorage is enabled
- Open DevTools -> Application -> localStorage
- Verify data is being saved

### Styling issues?
- Ensure Tailwind CSS is properly configured
- Check for CSS conflicts
- Clear browser cache

## Support

For issues or questions:
1. Check the documentation
2. Review the component code
3. Check browser console for errors

## License

This admin panel is part of your website package.

---

**Last Updated**: 2024
**Version**: 1.0.0

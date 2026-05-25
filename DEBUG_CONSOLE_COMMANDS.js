// TEST FILE - Add this to troubleshoot localStorage sync issues
// Open browser console and run these commands

// 1. Check if data is saved in localStorage
console.log('Saved website_data:', localStorage.getItem('website_data'));

// 2. Parse and view the data
const data = JSON.parse(localStorage.getItem('website_data') || '{}');
console.log('Parsed data:', data);

// 3. Check testimonials structure
console.log('Testimonials:', data.testimonials);

// 4. Check services structure
console.log('Services:', data.services);

// 5. Manually trigger sync event
window.dispatchEvent(new Event('websiteDataChanged'));
console.log('Triggered websiteDataChanged event');

// 6. Update localStorage manually to test
const testData = {
  ...data,
  testimonials: [
    ...data.testimonials,
    {
      id: Date.now(),
      name: 'Test User',
      company: 'Test Company',
      content: 'Test testimonial',
      rating: 5,
      image: ''
    }
  ]
};
localStorage.setItem('website_data', JSON.stringify(testData));
window.dispatchEvent(new Event('websiteDataChanged'));
console.log('Added test testimonial');

// 7. Clear all data and reset to defaults
// localStorage.removeItem('website_data');
// window.location.reload();

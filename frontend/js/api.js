// Local testing ke liye: 'http://localhost:5000'
// Render deploy ke baad: apna Render URL paste karo
const API_BASE_URL = 'https://sw-technologies.onrender.com';  // slash hatao end se

window.api = {
  contact: `${API_BASE_URL}/api/contact`,
  newsletter: `${API_BASE_URL}/api/newsletter/subscribe`,
  quote: `${API_BASE_URL}/api/quote`,
  register: `${API_BASE_URL}/api/auth/register`,
  login: `${API_BASE_URL}/api/auth/login`,
  profile: `${API_BASE_URL}/api/auth/profile`,
  adminContacts: `${API_BASE_URL}/api/admin/contacts`,
  adminUsers: `${API_BASE_URL}/api/admin/users`,
  adminQuotes: `${API_BASE_URL}/api/admin/quotes`,
  adminNewsletter: `${API_BASE_URL}/api/admin/newsletter`,
};

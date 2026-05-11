# SW Technologies — Full Stack Web Application

## 🌐 Live URLs
- **Frontend:** https://sw-technologies-web.netlify.app
- **Backend API:** https://sw-technologies.onrender.com

---

## 🔐 Admin Credentials
```
Email:    admin@swtechnologies.in
Password: Admin@123
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Authentication | JWT (7 day expiry) + bcryptjs |
| Frontend Deploy | Netlify |
| Backend Deploy | Render.com |

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | None | Register new user |
| POST | /api/auth/login | None | Login, returns JWT |
| GET | /api/auth/profile | JWT | Get user profile |
| POST | /api/contact | None | Submit contact form |
| POST | /api/newsletter/subscribe | None | Subscribe to newsletter |
| POST | /api/quote | None | Submit quote request |
| GET | /api/admin/contacts | Admin JWT | View all contacts |
| DELETE | /api/admin/contacts/:id | Admin JWT | Delete a contact |
| GET | /api/admin/users | Admin JWT | View all users |
| GET | /api/admin/quotes | Admin JWT | View all quotes |
| GET | /api/admin/newsletter | Admin JWT | View all subscribers |

---

## 🗄️ Database Collections

| Collection | Fields |
|-----------|--------|
| Users | id, name, email, password (hashed), role, createdAt |
| Contacts | id, name, email, phone, subject, message, createdAt |
| Newsletter | id, email, subscribedAt |
| Quotes | id, name, email, phone, serviceRequired, budget, message, createdAt |

---

## ⚙️ Environment Variables (Backend)

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@swtechnologies.in
ADMIN_PASSWORD=Admin@123
FRONTEND_URL=https://sw-technologies-web.netlify.app
```

---


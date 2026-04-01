# Zanzibar Tourism Website - Backend Setup

A stunning tourism website for Zanzibar with contact form management and admin dashboard.

**✨ NO DATABASE NEEDED! - File-based JSON storage**

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14+) and **npm**
- **No MySQL, no PHP required!**

---

## 📋 Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This installs:
- **Express** - Web framework
- **dotenv** - Environment variables
- **CORS** - Cross-origin requests
- **JWT** - Authentication tokens
- **express-validator** - Form validation

### 2. Start the Backend Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

You should see:
```
✓ Zanzibar Tourism Backend Running
✓ Server: http://localhost:5000
✓ Contact API: http://localhost:5000/api/contact
✓ Admin API: http://localhost:5000/api/admin
✓ Health Check: http://localhost:5000/api/health
✓ Storage: File-based JSON (No database needed!)
```

### 3. Open the Site

The Node.js server serves the frontend directly.

Open in your browser: **http://localhost:5000**

If you want the contact page directly: **http://localhost:5000/contact.html**

---

## 🔗 API Endpoints

### Contact Form Submission
- **POST** `/api/contact`
  - Body: `{ fullname, email, phone, subject, message }`
  - Returns: JSON with success status
  - Stored in: `data/messages.json`

### Admin Authentication
- **POST** `/api/admin/login`
  - Body: `{ username, password }`
  - Returns: JWT token

### Admin Messages (Requires Auth Token)
- **GET** `/api/admin/messages` - Get all messages
- **GET** `/api/admin/messages/:id` - Get single message
- **DELETE** `/api/admin/messages/:id` - Delete message

---

## 🔐 Admin Access

1. Open **http://localhost:5000/admin_login.html**
2. Login with:
   - **Username:** `admin`
   - **Password:** `ZanzibarAdmin2026!`
3. View all contact submissions in the dashboard

---

## 📁 Project Structure

```
MyProject/
├── server.js                    # Main Express server
├── package.json                 # Dependencies
├── .env                         # Configuration
├── middleware/
│   └── auth.js                 # JWT authentication
├── controllers/
│   ├── contactController.js    # Form submission
│   └── adminController.js      # Admin dashboard
├── routes/
│   ├── contactRoutes.js        # /api/contact endpoints
│   └── adminRoutes.js          # /api/admin endpoints
├── storage/
│   └── messageStorage.js       # JSON file operations
├── data/
│   └── messages.json           # Stored contact messages
├── index.html                   # Homepage
├── contact.html                 # Contact form
├── admin_login.html             # Admin login
├── admin_dashboard.html         # Admin inbox
└── [other HTML files]
```

---

## 💾 Data Storage

All contact submissions are stored in **`data/messages.json`** file:

```json
[
  {
    "id": 1712064000000,
    "fullname": "John Doe",
    "email": "john@example.com",
    "phone": "+255621234567",
    "subject": "Tour Inquiry",
    "message": "I would like to know more about your packages...",
    "status": "read",
    "created_at": "2025-04-02T10:00:00.000Z",
    "updated_at": "2025-04-02T10:01:00.000Z"
  }
]
```

### Backup Your Messages
```bash
cp data/messages.json data/messages.backup.json
```

---

## 🛡️ Security Features

✅ **No SQL Injection Risk** - No database queries  
✅ **JWT Authentication** - Secure token-based auth  
✅ **Input Validation** - Regex patterns for all fields  
✅ **CORS Protection** - Only allow trusted origins  
✅ **Environment Variables** - Keep secrets safe  

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check Node.js is installed
node --version

# Check port 5000 is free
netstat -ano | findstr :5000

# If in use, change PORT in .env
```

### Contact form not submitting?
- **Check backend running:** Visit `http://localhost:5000/api/health`
- **Check CORS:**  Make sure origins in server.js include your frontend URL
- **Check API URL:** Contact.html should use `http://localhost:5000/api/contact`

### Can't login to admin panel?
- **Check credentials:** Username: `admin`, Password: `ZanzibarAdmin2026!`
- **Check backend running:** Verify Node.js server is active
- **Check browser console:** Open Dev Tools (F12) for errors

### Lost messages?
- Messages are stored in `data/messages.json`
- Don't accidentally delete this file!
- Create backups regularly

---

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT tokens | zanzibar_tourism_key_2026 |
| `JWT_EXPIRE` | Token expiration time | 24h |
| `ADMIN_USERNAME` | Admin login username | admin |
| `ADMIN_PASSWORD` | Admin login password | ZanzibarAdmin2026! |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |

---

## 🎉 Features

✅ Contact form with client & server validation  
✅ Beautiful admin dashboard to view submissions  
✅ JWT token-based authentication  
✅ File-based JSON storage (no database setup)  
✅ Mobile-responsive design  
✅ Message status tracking (read/unread)  
✅ Delete messages from admin panel  

---

## 📞 Support

For issues:
1. Check terminal logs where server runs
2. Open browser Dev Tools (F12) for frontend errors
3. Verify `.env` file has correct settings
4. Check `data/messages.json` file exists and is valid JSON

---

## 📄 License

© 2025 Zanzibar Tourism - All rights reserved.


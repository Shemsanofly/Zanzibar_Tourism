# Zanzibar Tourism Website Backend Setup

A Zanzibar tourism website with a Node.js backend, file-based JSON storage, and an admin inbox for contact submissions.

## Requirements

- Node.js 14 or newer
- npm
- A browser

No database and no PHP are required.

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the backend:

   ```bash
   npm start
   ```

3. Open the site in your browser:

   - [Homepage](http://localhost:5000)
   - [Contact page](http://localhost:5000/contact.html)
   - [Admin login](http://localhost:5000/admin_login.html)

## API Endpoints

- `GET /api/health` - backend health check
- `POST /api/contact` - contact form submission
- `POST /api/admin/login` - admin login
- `GET /api/admin/messages` - list saved messages
- `GET /api/admin/messages/:id` - view one message
- `DELETE /api/admin/messages/:id` - delete one message

## Data Storage

Contact submissions are stored in `data/messages.json`.

## Project Structure

```text
MyProject/
├── server.js
├── controllers/
├── routes/
├── middleware/
├── storage/
├── data/
├── index.html
├── contact.html
├── admin_login.html
├── admin_dashboard.html
└── README.md
```

## Notes

- Keep your local environment file out of Git.
- If the admin page does not open, confirm the backend is running on port 5000.
- To clear saved submissions, empty `data/messages.json`.

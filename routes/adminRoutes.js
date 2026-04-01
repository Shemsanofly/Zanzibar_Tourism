const express = require('express');
const {
  adminLogin,
  getMessages,
  getMessage,
  deleteMessage
} = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/admin/login - Admin login
router.post('/login', adminLogin);

// GET /api/admin/messages - Get all messages (protected)
router.get('/messages', authenticateToken, getMessages);

// GET /api/admin/messages/:id - Get single message (protected)
router.get('/messages/:id', authenticateToken, getMessage);

// DELETE /api/admin/messages/:id - Delete message (protected)
router.delete('/messages/:id', authenticateToken, deleteMessage);

module.exports = router;

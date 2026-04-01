const jwt = require('jsonwebtoken');
const { getMessages, getMessageById, deleteMessageById, markAllAsRead } = require('../storage/messageStorage');

// Admin login
const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password required'
    });
  }

  // Check credentials
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ZanzibarAdmin2026!';

  if (username === adminUsername && password === adminPassword) {
    // Generate JWT token
    const token = jwt.sign(
      { username: adminUsername, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '24h' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token: token
    });
  }

  res.status(401).json({
    success: false,
    message: 'Invalid username or password'
  });
};

// Get all contact messages
const getMessages_handler = (req, res) => {
  try {
    // Mark unread as read
    markAllAsRead();

    // Get all messages
    const messages = getMessages();

    res.json({
      success: true,
      data: messages,
      count: messages.length
    });

  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages'
    });
  }
};

// Get single message
const getMessage = (req, res) => {
  const { id } = req.params;

  try {
    const message = getMessageById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: message
    });

  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve message'
    });
  }
};

// Delete message
const deleteMessage = (req, res) => {
  const { id } = req.params;

  try {
    const deleted = deleteMessageById(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete message'
    });
  }
};

module.exports = {
  adminLogin,
  getMessages: getMessages_handler,
  getMessage,
  deleteMessage
};

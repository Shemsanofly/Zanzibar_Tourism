const express = require('express');
const { validateContactForm, submitContact } = require('../controllers/contactController');

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', validateContactForm, submitContact);

module.exports = router;

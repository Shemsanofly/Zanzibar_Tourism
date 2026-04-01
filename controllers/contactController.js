const { body, validationResult } = require('express-validator');
const { addMessage } = require('../storage/messageStorage');

// Validation rules
const validateContactForm = [
  body('fullname')
    .trim()
    .matches(/^[a-zA-Z\s]{2,100}$/)
    .withMessage('Name must contain only letters and be 2-100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email address required'),
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[0-9\s\-\(\)]{7,20}$/)
    .withMessage('Invalid phone number format'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required'),
  body('message')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters')
];

// Submit contact form
const submitContact = (req, res) => {
  // Check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach(error => {
      formattedErrors[error.param] = error.msg;
    });
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors
    });
  }

  const { fullname, email, phone, subject, message } = req.body;

  try {
    // Save to JSON file
    const savedMessage = addMessage({
      fullname,
      email,
      phone: phone || null,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. We will get back to you soon.',
      data: savedMessage
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit message. Please try again later.'
    });
  }
};

module.exports = {
  validateContactForm,
  submitContact
};

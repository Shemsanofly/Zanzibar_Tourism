require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:8000', 'http://localhost:3000', 'http://127.0.0.1:8000'],
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(__dirname));

// Serve the homepage from the backend root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Friendly admin page routes
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/admin_login.html');
});

app.get('/admin/dashboard', (req, res) => {
  res.sendFile(__dirname + '/admin_dashboard.html');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Application error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✓ Zanzibar Tourism Backend Running`);
  console.log(`✓ Server: http://localhost:${PORT}`);
  console.log(`✓ Admin Login: http://localhost:${PORT}/admin`);
  console.log(`✓ Admin Dashboard: http://localhost:${PORT}/admin/dashboard`);
  console.log(`✓ Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`✓ Admin API: http://localhost:${PORT}/api/admin`);
  console.log(`✓ Health Check: http://localhost:${PORT}/api/health`);
  console.log(`✓ Storage: File-based JSON (No database needed!)\n`);
});

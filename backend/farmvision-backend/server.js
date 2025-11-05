const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import config
const { db } = require('./config/firebase');

// Import routes
const userRoutes = require('./routes/users');
const scanRoutes = require('./routes/scans');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Create uploads directory if not exists
const uploadsDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files
app.use('/uploads', express.static(uploadsDir));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    firebase: 'Connected'
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/scans', scanRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚜 FarmVision AI Backend',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      scans: '/api/scans',
      health: '/health'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path
  });
});

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║   🚜 FarmVision AI Backend         ║
║   Port: ${PORT}                       ║
║   Environment: ${process.env.NODE_ENV}        ║
║   Database: Firebase Realtime      ║
╚════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;

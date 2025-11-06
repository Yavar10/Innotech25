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
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Create uploads directory if not exists
const uploadsDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`✓ Created uploads directory: ${uploadsDir}`);
}

// Serve static files
app.use('/uploads', express.static(uploadsDir));

// Health check with Firebase connection test
app.get('/health', async (req, res) => {
  try {
    // Test Firebase connection
    const testRef = db.ref('.info/connected');
    const snapshot = await testRef.once('value');
    const isConnected = snapshot.val();

    res.json({
      status: 'Server is running',
      timestamp: new Date().toISOString(),
      firebase: isConnected ? 'Connected' : 'Disconnected',
      environment: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 3000
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      timestamp: new Date().toISOString(),
      firebase: 'Error checking connection',
      error: error.message
    });
  }
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
    },
    documentation: 'API documentation available at /api/docs'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════╗
║   🚜 FarmVision AI Backend         ║
║   Port: ${PORT.toString().padEnd(28)}║
║   Environment: ${NODE_ENV.padEnd(21)}║
║   Database: Firebase Realtime      ║
║   Uploads: ${uploadsDir.padEnd(25)}║
╚════════════════════════════════════╝
  `);
  
  if (NODE_ENV === 'production') {
    console.log('✓ Production mode active');
    console.log('✓ CORS configured');
    console.log('✓ Security headers enabled');
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit in production, log and continue
  if (NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Give time to log before exiting
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received, shutting down gracefully`);
  
  server.close(() => {
    console.log('✓ HTTP server closed');
    
    // Close database connections if needed
    // db.goOffline(); // Uncomment if you need to explicitly close Firebase
    
    console.log('✓ Graceful shutdown completed');
    process.exit(0);
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = app;

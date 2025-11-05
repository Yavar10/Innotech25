const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      return res.status(413).json({
        error: 'File too large',
        details: 'Maximum file size is 10MB'
      });
    }
    return res.status(400).json({
      error: 'File upload error',
      details: err.message
    });
  }

  if (err instanceof Error) {
    if (err.message.includes('Only image files')) {
      return res.status(400).json({
        error: 'Invalid file type',
        details: err.message
      });
    }
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;

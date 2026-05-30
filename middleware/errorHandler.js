// middleware/errorHandler.js — centralised error handler
// This catches any error passed to next(err) from any route

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    message: "Me khor phit phard"
  });
};

module.exports = errorHandler;

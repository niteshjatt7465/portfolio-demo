export function errorHandler(err, _req, res, _next) {
  console.error('[error]', err.message)
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack)
  }

  const status = err.statusCode || 500
  res.status(status).json({
    success: false,
    message:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong. Please try again later.'
        : err.message,
  })
}

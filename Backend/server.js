const jsonServer = require('json-server')
const path = require('path')

const server = jsonServer.create()

// Create router - check if db.json exists
let router;
try {
  router = jsonServer.router('db.json')
  console.log('✅ db.json loaded successfully')
} catch (error) {
  console.log('❌ db.json not found, creating sample data...')
  
  // Create sample data if db.json doesn't exist
  const sampleData = {
    products: [
      {
        id: 1,
        name: "Sample Product 1",
        price: 29.99,
        description: "This is a sample product",
        category: "electronics"
      },
      {
        id: 2,
        name: "Sample Product 2", 
        price: 49.99,
        description: "Another sample product",
        category: "clothing"
      }
    ],
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com"
      }
    ],
    orders: []
  }
  
  router = jsonServer.router(sampleData)
}

// Default middlewares (logger, static, cors and no-cache)
const middlewares = jsonServer.defaults({
  static: './build', // Serve static files from build folder if exists
  noCors: false // Enable CORS
})

// Custom middleware to handle CORS properly
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

server.use(middlewares)

// Custom routes (optional)
server.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'JSON Server is running!',
    timestamp: new Date().toISOString()
  })
})

// Use default router
server.use('/api', router) // All routes will be prefixed with /api

// Get port from environment variable or use default
const port = process.env.PORT || 3001

server.listen(port, () => {
  console.log(`🚀 JSON Server is running on port ${port}`)
  console.log(`📍 Local: http://localhost:${port}`)
  console.log(`🔍 Resources available at:`)
  console.log(`   - GET /api/products`)
  console.log(`   - GET /api/users`) 
  console.log(`   - GET /api/orders`)
  console.log(`   - GET /api/health (health check)`)
})

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Server shutting down gracefully...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('👋 Server shutting down gracefully...')
  process.exit(0)
})
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const swaggerConfig = require('./swaggerConfig'); 


require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json());

swaggerConfig(app);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server running on => http://localhost:${PORT}/`)});

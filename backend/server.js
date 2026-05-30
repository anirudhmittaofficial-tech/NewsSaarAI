require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'NewsSaar AI Backend is running.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

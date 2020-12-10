const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');

// Connect to my DB (MongoDB Atlast)
connectDB();

// Middlewares
app.use(express.json());

// Authorize headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-auth-token'
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/experiences', require('./routes/experiences'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/messages'));

// serve static assets for production
if (process.env.NODE_ENV === 'production') {
  // Set static
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

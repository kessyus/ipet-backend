const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Database
const mongoose = require('mongoose');
const db = require('../db/config');
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

// Port environment definition
const port = process.env.PORT || 3000;

// Starting app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);
app.use(morgan('dev')); // logging HTTP requests

// Routes
const router = require('./routes');
router(app);

app.listen(port, () => {
  console.log(`🚀 Server starded at http://localhost:${port}`);
});

module.exports = app;

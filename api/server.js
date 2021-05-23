const express = require('express');
const cors = require('cors');

// Routes
const router = require('./routes');

// Database
const mongoose = require('mongoose');
const db = require('../db/config');
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

// Port environment definition
const port = process.env.PORT || 4000;

// Starting app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

router(app);

app.listen(port, () => {
  console.log(`🚀 Server starded at http://localhost:${port}`);
});

module.exports = app;

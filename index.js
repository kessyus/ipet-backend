const express = require('express');
const cors = require('cors');
const router = require('./api/routes');

const nodeEnvironment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 4000;

// Dev env
if (nodeEnvironment === 'development') {
  require('dotenv').config();
}

// Starting app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

router(app);

app.listen(port, () => {
  console.log(`🚀 Server starded at http://localhost:${port}`);
});
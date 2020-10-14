const express = require('express');

require('dotenv').config();

const port = process.env.PORT || 1337;

const morgan = require('morgan');

const helmet = require('helmet');

const cors = require('cors');

const mongoose = require('mongoose');

const app = express();

const middlewares = require('./middlewares');

const logs = require('./api/logs');

const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .catch((e) => {
  // eslint-disable-next-line no-console
    console.error('Connection Error:', e.message);
  });

app.use(morgan('common'));
app.use(helmet()); // adds extra security such as hiding log info from potential hackers
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());
db.on('error', () => {
  // eslint-disable-next-line no-console
  console.error.bind(console, 'MongoDB connection error:');
});

app.get('/', (req, res) => {
  res.json({
    message: 'Helloooo World!',
  });
});

app.use('/api/logs', logs); // log routes

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

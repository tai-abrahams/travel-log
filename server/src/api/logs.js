const express = require('express');

const LogEntry = require('../models/LogEntry');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});
// eslint-disable-next-line no-unused-vars
router.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const logEntry = new LogEntry(body);
    const createdEntry = await logEntry.save(); // .save returns a promise
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'validationError') {
      res.status(400);
    }
    next(error);
  }
});

module.exports = router;

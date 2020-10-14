const mongoose = require('mongoose');

const { Schema } = mongoose; // destructured

const requiredNumber = {
  type: Number,
  required: true,
};

const logEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String },
  image: { type: String },
  comments: { type: String },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0, /* if ratings arent added, default value sent will be 0 */
  },
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, // automatically creates createdAt and updatedAt
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;

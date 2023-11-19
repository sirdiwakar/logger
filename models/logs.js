const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: [true, 'A log must have a level']
    },
    message: {
      type: String,
      required: [true, 'A log must have a message']
    },
    resourceId: {
      type: String,
      required: [true, 'A log must have a resourceId']
    },
    timestamp: {
      type: Date,
      required: [true, 'A log must have a timestamp']
    },
    traceId: {
      type: String,
      required: [true, 'A log must have a traceId']
    },
    spanId: {
      type: String,
      required: [true, 'A log must have a spanId']
    },
    commit: {
      type: String,
      required: [true, 'A log must have a commit']
    },
    metadata: {
      type: {
        parentResourceId:{
          type: String,
          required: [true, 'A metadata must have a parentResourceId']
        }
      },
      required: [true, 'A log must have a metadata']
    }
  }
);

logSchema.index({timestamp: 1, level: 1, message: 1, commit: 1, traceId: 1});


const Log = mongoose.model('Log', logSchema);

module.exports = Log;
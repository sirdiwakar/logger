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
logSchema.index({ timestamp: 1 }); // Index on timestamp field (ascending)
logSchema.index({ resourceId: 1 }); // Index on resourceId field
logSchema.index({ level: 1 }); // Index on level field
logSchema.index({ traceId: 1 }); // Index on traceId field
logSchema.index({ spanId: 1 }); // Index on spanId field
logSchema.index({ commit: 1 }); // Index on commit field
logSchema.index({ resourceId: 1, level: 1 });

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
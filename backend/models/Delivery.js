
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
      index: true,
    },

    endpointId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Endpoint',
      required: true,
      index: true,
    },

    event: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
      required: true,
    },

    httpStatus: {
      type: Number,
      default: null,
    },

    responseTimeMs: {
      type: Number,
      default: null,
    },

    requestPayload: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    responseBody: {
      type: String,
      default: null,
    },

    errorMessage: {
      type: String,
      default: null,
    },

    attempt: {
      type: Number,
      default: 1,
      min: 1,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

deliverySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Delivery', deliverySchema);
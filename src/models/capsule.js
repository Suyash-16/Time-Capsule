const mongoose = require("mongoose");

const CapsuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    message: {
      type: String,
      required: true
    },

    recipients: {
      type: [String],
      required: true
    },

    sendAt: {
      type: Date,
      required: true
    },

    sent: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Capsule", CapsuleSchema);

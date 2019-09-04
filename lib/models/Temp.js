const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema(
  {
    temp: {
      type: Number,
      required: true
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true
    }
  },
  {
    toJSON: {
      transform: function(doc, ret) {
        delete ret.__v;
      }
    },
    timestamps: true
  }
);

module.exports = mongoose.model('Temp', tempSchema);

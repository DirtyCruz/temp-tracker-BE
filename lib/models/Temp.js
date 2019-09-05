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

tempSchema.statics.getLocationsWithLatestTemp = function() {
  return this.aggregate([
    { $group: { _id: '$location', temp: { $push: { temp: '$temp', createdAt: '$createdAt' } } } }, 
    { $lookup: { from: 'locations', localField: '_id', foreignField: '_id', as: 'location' } }, 
    { $unwind: { path: '$location', } },
    { $project: { latestTemp: { $arrayElemAt: ['$temp', -1] }, locationName: '$location.name' } }
  ]);
};

module.exports = mongoose.model('Temp', tempSchema);

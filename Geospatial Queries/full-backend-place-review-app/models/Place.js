// const mongoose = require("mongoose");

// const placeSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   location: {
//     type: { type: String, enum: ['Point'], default: 'Point' },
//     coordinates: { type: [Number], required: true }
//   }
// }, { timestamps: true });

// placeSchema.index({ location: '2dsphere' });
// placeSchema.index({ name: 'text', description: 'text' });

// module.exports = mongoose.model("Place", placeSchema);

const { Schema, model } = require("mongoose");

const placeSchema = new Schema(
  {
    name: String,
    description: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true },
    },
  },
  { timeStamps: true }
);

placeSchema.index({ location: "2dsphere" });
placeSchema.index({ name: "text", description: "text" });

module.exports = model("Place", placeSchema);

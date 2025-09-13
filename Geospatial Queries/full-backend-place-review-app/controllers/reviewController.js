const Review = require("../models/Review");

exports.getReviewsByPlace = async (req, res) => {
  const reviews = await Review.find({ place: req.params.placeId }).populate('user', 'name');
  res.json(reviews);
};

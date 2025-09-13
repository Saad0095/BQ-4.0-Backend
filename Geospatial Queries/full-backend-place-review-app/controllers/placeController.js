const Place = require("../models/Place");

exports.searchPlaces = async (req, res) => {
  const { search } = req.query;

  let places;
  if (search && search.trim() !== "") {
    places = await Place.find(
      { $text: { $search: search } }, // 1) FILTER
      { score: { $meta: "textScore" } } // 2) PROJECTION
    ).sort({ score: { $meta: "textScore" } }); // 3) SORTING

    // { $text: { $search: search } } = use the text index (fast, efficient).
    // { score: { $meta: "textScore" } } = add a special field called score that tells how relevant each document is.
    // .sort({ score: { $meta: "textScore" } }) = order results by best match first.
  } else {
    places = await Place.find();
  }

  res.json(places);
};

exports.findNearby = async (req, res) => {
  const { lng, lat, distance } = req.query;
  const places = await Place.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)],
        },
        $maxDistance: parseFloat(distance),
      },
    },
  });

  res.json(places);
};

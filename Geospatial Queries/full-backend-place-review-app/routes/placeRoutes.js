const express = require('express');
const router = express.Router();
const { searchPlaces, findNearby } = require('../controllers/placeController');

router.get('/search', searchPlaces);
router.get('/nearby', findNearby);

module.exports = router;

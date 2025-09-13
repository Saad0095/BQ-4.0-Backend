const express = require('express');
const router = express.Router();
const { getReviewsByPlace } = require('../controllers/reviewController');

router.get('/:placeId/reviews', getReviewsByPlace);

module.exports = router;

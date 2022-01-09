const router = require('express').Router();

const controller = require('../controllers/ride');

router.post('/ride/:passenger_id/:driver_id', controller.create);

module.exports = router;

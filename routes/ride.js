const router = require('express').Router();

const controller = require('../controllers/ride');

router.post('/ride/:passenger_id/:driver_id', controller.create);

router.post('/ride/:id/stop', controller.stop);

router.get('/rides/ongoing', controller.ongoing);

module.exports = router;

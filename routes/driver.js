const router = require('express').Router();

const controller = require('../controllers/driver');

router.route('/driver').post(controller.create);

module.exports = router;

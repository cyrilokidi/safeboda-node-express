const router = require('express').Router();

const controller = require('../controllers/passenger');

router.post('/passenger', controller.create);

module.exports = router;

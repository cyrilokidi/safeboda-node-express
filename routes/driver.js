const router = require('express').Router();

const controller = require('../controllers/driver');

router.post('/driver', controller.create);

router
  .route('/driver/:id/suspend')
  .post(controller.suspend)
  .delete(controller.unsuspend);

module.exports = router;

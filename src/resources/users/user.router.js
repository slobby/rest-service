const router = require('express').Router();
const usersController = require('./user.controller');

router.route('/').get(usersController.getAll);

router.route('/').post(usersController.create);

router.route('/:userId').get(usersController.getById);

router.route('/:userId').put(usersController.update);

router.route('/:userId').delete(usersController.deletById);

module.exports = router;

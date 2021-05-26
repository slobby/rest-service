"use strict";
const router = require('express').Router({ mergeParams: true });
const tasksController = require('./task.controller');
router.route('/').get(tasksController.getAll);
router.route('/').post(tasksController.create);
router.route('/:taskId').get(tasksController.getById);
router.route('/:taskId').put(tasksController.update);
router.route('/:taskId').delete(tasksController.deletById);
module.exports = router;

"use strict";
const router = require('express').Router();
const boardsController = require('./board.controller');
router.route('/').get(boardsController.getAll);
router.route('/').post(boardsController.create);
router.route('/:boardId').get(boardsController.getById);
router.route('/:boardId').put(boardsController.update);
router.route('/:boardId').delete(boardsController.deletById);
module.exports = router;

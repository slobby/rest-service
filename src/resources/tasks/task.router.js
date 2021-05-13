const router = require('express').Router({mergeParams : true});
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const {boardId} = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.status(200).json(tasks);
});

router.route('/').post(async (req, res) => {
  const {boardId} = req.params;
  const {title, order, description, userId, columnId} = req.body;
  const task = await tasksService.create({title, order, description, userId, boardId, columnId});
  if (task) {
    res.status(201).json(task);
  }
  else {
  res.status(400).send('Couldn`t create task.');
  }
});

router.route('/:taskId').get(async (req, res) => {
  const {boardId, taskId:id} = req.params;
  const task = await tasksService.getById({boardId, id});
  if (task) {
    res.status(200).json(task);
  }
  else {
  res.status(404).send('Not found.');
  }
});

router.route('/:taskId').put(async (req, res) => {
  const id = req.params.taskId;
  const { title=undefined, order=undefined, description=undefined, userId=null, boardId=null, columnId=null } = req.body;
  const task = await tasksService.update({id, title, order, description, userId, boardId, columnId});
  if (task) {
    res.status(200).json(task);
  }
  else {
  res.status(404).send('Bad request.');
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const {boardId, taskId:id} = req.params;
  const task = await tasksService.deletById({boardId, id});
  if (task) {
    res.status(204).json(task);
  }
  else {
  res.status(404).send('Not found.');
  }
});

module.exports = router;

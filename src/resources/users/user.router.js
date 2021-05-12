const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users);
});

router.route('/').post(async (req, res) => {
  const {name, login, password} = req.body;
  const user = await usersService.create({name, login, password});
  if (user) {
    res.status(201).json(user);
  }
  else {
  res.status(400).send('Couldn`t create user.');
  }
});

router.route('/:userId').get(async (req, res) => {
  const id = req.params.userId;
  const user = await usersService.getById(id);
  if (user) {
    res.status(200).json(user);
  }
  else {
  res.status(404).send('Not found.');
  }
});

router.route('/:userId').put(async (req, res) => {
  const id = req.params.userId;
  const { name, login, passowrd } = req.body;
  const user = await usersService.update({id, name, login, passowrd});
  if (user) {
    res.status(200).json(user);
  }
  else {
  res.status(404).send('Bad request.');
  }
});

router.route('/:userId').delete(async (req, res) => {
  const id = req.params.userId;
  const user = await usersService.deletById(id);
  if (user) {
    res.status(204).json(user);
  }
  else {
  res.status(404).send('Not found.');
  }
});

module.exports = router;

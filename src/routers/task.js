const express = require('express');
const Task = require('../models/Task');
const { ObjectID } = require('mongodb');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
  //const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send();
  }
});

router.get('/tasks', auth, async (req, res) => {
  try {
    //const tasks = await Task.find({ owner: req.user._id});
    await req.user.populate('tasks').execPopulate()

    res.send(req.user.tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  // if (!ObjectID.isValid(_id)) {
  //   return res.status(404).send();
  // }

  try {
    const task = await Task.findOne({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (Object.entries(req.body).length === 0) {
    return res.send({ msg: 'Nothing to update' });
  }

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid update for Task' });
  }
  try {
    // if (!ObjectID.isValid(req.params.id)) {
    //   return res.status(404).send();
    // }

    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id});

    
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    if (!task) {
      return res.status(404).send()
    }

    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;

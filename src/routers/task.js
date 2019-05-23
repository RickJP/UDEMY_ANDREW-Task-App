const express = require('express');
const Task = require('../models/Task')
const { ObjectID } = require("mongodb");
const router = express.Router()


router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send();
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }

  try {
    const task = await Task.findById(_id);
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", async (req, res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (Object.entries(req.body).length === 0) {
    return res.send({ msg: "Nothing to update" });
  }

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update for Task" });
  }
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(404).send();
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.send(task);
  } catch (err) {
    res.status(400).send(err)
  }
  
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send()
    }
    res.send(task)
  } catch (err) {
    res.status(500).send()
  }
})

module.exports = router
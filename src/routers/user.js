const express = require('express')
const { ObjectID } = require("mongodb");
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = express.Router()

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken()
    res.status(201).send({user, token});
  } catch (err) {
    res.status(400).send(err);
  }
});


router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({user, token})
  } catch (err) {
      res.status(400).send()
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    }) 
    await req.user.save()

    res.send()
  } catch (err) {
      res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()

    res.send()
  } catch (err) {
    res.status(500).send()
  }
})


router.get('/users/me', auth , async (req, res) => {
  res.send(req.user)
});



router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (Object.entries(req.body).length === 0) {
    return res.send({ msg: "Nothing to update" });
  }

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    //const user = await User.findById(req.params.id)
    console.log('USER: '+req.user)
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()

    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});


router.delete('/users/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id)
    // if (!user) {
    //   return res.status(404).send()
    // }
    await req.user.remove()

    res.send(req.user)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router


// router.get('/users/:id', async (req, res) => {
//   const _id = req.params.id;

//   if (!ObjectID.isValid(_id)) {
//     return res.status(404).send();
//   }

//   try {
//     const user = await User.findById(_id);

//     res.send(user);
//   } catch (err) {
//     res.status(500).send();
//   }
// });
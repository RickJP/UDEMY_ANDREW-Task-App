const express = require('express')
const { ObjectID } = require("mongodb");
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = express.Router()
const sharp = require('sharp')
const multer = require('multer')

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

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file (jpg, jpeg or png)'))
    }
    cb(undefined, true)
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()

  res.send()
}, (err, req, res, next) => {
  res.status(400).send({error: err.message})
})



router.delete('/users/me/avatar', auth, async (req, res) => {

  req.user.avatar = undefined
  await req.user.save()

  res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type' , 'image/png')
    res.send(user.avatar)
  } catch (err) {
    res.status(404).send()
  }
})

module.exports = router

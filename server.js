// backend/server.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const app = express()
app.use(cors())
app.use(express.json())
const mangoURI = process.env.MONGO_URI


let gID = 0;
let current_group = 0;

const groupschema = new mongoose.Schema({
  groupID: { type: Number, required: true },
  members: { type: Number , default: 0 },
});

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body
  try {
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'User already exists' })
    }
    await User.create({ email, password, current_group })
    res.json({ message: 'Signup successful' })
    const group_ID = gID;
    const group = await groupschema.find({groupID: group_ID})
    group.json()
    if(!group[members] > 99){
      group[member] += 1;
      await group.save();
    } else {
      const group = await groupschema.create({ groupID, members: 0 });
      gID += 1;
      current_group = gID;
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email, password })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    res.json({ message: 'Login successful' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/post', async (req, res) => {
  const { content } = req.body
  try {
    const post = await Post.create({ content })
    res.json({ message: 'Post created', post })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/getpost', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})



/* app.post('/api/assignGroup', async (req, res) => {
  const groupID = gID;
  try {
    const group = await groupschema.find({groupID: groupID})
    group.json()
    if(group[members] > 99){
      const group = await groupschema.create({ groupID, members: 0 });

    }
  }
}) */

//console.log(users)
app.listen(5000, () => console.log('Backend running on http://localhost:5000'))


mongoose.connect(mangoURI, {
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  groupID: { type: Number, required: true },
})

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
})

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)

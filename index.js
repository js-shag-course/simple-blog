const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const { application } = require('express')

mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
    console.log('Mongo Ready')
  }
)

const posts = new mongoose.Schema({
  title: String,
  slug: String,
  text: String
})
const Post = mongoose.model('Post', posts)

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello Blog!')
})

app.get('/categories', (req, res) => {
  res.send('Categories')
})

app.get('/posts', async (req, res) => {
  const allPosts = await Post.find().exec()
  res.json(allPosts)
})

app.get('/posts/:id', async (req, res) => {
  const allPosts = await Post.find({ _id: req.params.id }).exec()
  res.json(allPosts)
})

app.post('/posts/', async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    slug: req.body.slug,
    text: req.body.text
  })
  const result = await newPost.save()
  res.json(result)
})

app.get('/tags', (req, res) => {
  res.send('Tags')
})

app.listen(8888, () => {
  console.log('Example app listening')
})
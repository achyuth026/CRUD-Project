const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Mongoose model setup
mongoose.connect('mongodb://127.0.0.1:27017/crud_demo')


const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});

const Item = mongoose.model('Item', itemSchema);

// Middleware setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
  const items = await Item.find();
  res.render('index', { items });
});

app.post('/add', async (req, res) => {
  const { name, quantity } = req.body;
  await Item.create({ name, quantity });
  res.redirect('/');
});

app.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  await Item.findByIdAndUpdate(id, { quantity });
  res.redirect('/');
});

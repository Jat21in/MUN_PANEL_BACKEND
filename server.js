const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Registration = require('./models/Registration');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB Error:", err));

app.get('/api/registrations', async (req, res) => {
  const registrations = await Registration.find().sort({ createdAt: -1 });
  res.json(registrations);
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port', process.env.PORT || 5000);
});

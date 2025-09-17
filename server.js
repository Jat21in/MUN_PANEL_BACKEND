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

// // Root route
// app.get('/', (req, res) => {
//   res.send('MUN Panel Backend is running 🚀');
// });

app.get('/api/registrations', async (req, res) => {
  const registrations = await Registration.find().sort({ createdAt: -1 });
  res.json(registrations);
});

// PATCH route to update specific fields
app.put('/api/registrations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Update request body:', req.body);
    const { allocatedCommittee, allocatedCountry } = req.body;
    const updateData = { updatedAt: new Date() };
    
    if (allocatedCommittee !== undefined) updateData.allocatedCommittee = allocatedCommittee;
    if (allocatedCountry !== undefined) updateData.allocatedCountry = allocatedCountry;

    // Check if any relevant fields were provided
    if (Object.keys(updateData).length === 1) { // Only updatedAt was added
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update'
      });
    }

    const updatedRegistration = await Registration.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      message: 'Registration updated successfully',
      data: updatedRegistration
    });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port', process.env.PORT || 5000);
});

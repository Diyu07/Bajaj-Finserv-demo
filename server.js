//server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// GET endpoint
app.get('/bfhl', (req, res) => {
  return res.status(200).json({
    operation_code: 1
  });
});

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input format"
      });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && item.length === 1);
    const highest_alphabet = alphabets.length > 0 ? 
      [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : 
      [];

    return res.json({
      is_success: true,
      user_id: "your_name_ddmmyyyy", // Replace with your details
      email: "your.email@college.com", // Replace with your details
      roll_number: "your_roll_number", // Replace with your details
      numbers,
      alphabets,
      highest_alphabet
    });
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

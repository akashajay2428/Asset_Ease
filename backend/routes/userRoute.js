const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userData'); // Import user model

const router = express.Router();

// Middleware to parse JSON and URL-encoded data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// **JWT Middleware**
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Token required');

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    res.status(401).send('Invalid or expired token');
  }
};

// **User Registration**
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// **User Login**
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// **Update User**
router.put('/update', verifyToken, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// **Delete User**
router.delete('/delete', verifyToken, async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).send('User not found');

    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

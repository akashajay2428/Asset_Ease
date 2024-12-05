const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const adminModel = require('../model/adminData'); // Assuming you have an Admin model
const userModel = require('../model/userData'); 
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send('Token required');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded; // Store admin details in the request object
    next();
  } catch (error) {
    res.status(401).send('Invalid or expired token');
  }
};

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the admin by email
    const admin = await adminModel.findOne({ email });
    if (!admin) return res.status(404).send('Admin not found');
    
    // Log the admin password (for debugging purposes)
    console.log('Admin Password Hash:', admin.password);
    console.log('Entered Password:', password);
    
    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).send('Invalid credentials');
    
    // If credentials match, generate JWT
    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1d' });
    
    // Log the generated token (for debugging purposes)
    console.log('Generated Token:', token);
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error.message); // Log detailed error
    res.status(500).send('Server error');
  }
});

// Get All Admins (Protected)
router.get('/get', verifyToken, async (req, res) => {
  try {
    const admins = await adminModel.find();
    res.status(200).send(admins);
  } catch (error) {
    console.error('Error fetching admins:', error.message); // Log error
    res.status(404).send('Admins not found');
  }
});

// Create Admin
router.post('/create', async (req, res) => {
  const { username, email, password } = req.body;
  
  // Input validation
  if (!username || !email || !password) {
    return res.status(400).send('All fields are required');
  }
  
  try {
    // Check if admin with the email already exists
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).send('Admin already exists');
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create and save a new admin
    const newAdmin = new adminModel({
      username,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();
    
    res.status(201).send('Admin created successfully');
  } catch (error) {
    console.error('Error during admin creation:', error.message); // Log detailed error
    res.status(500).send('Server error');
  }
});

// Update Admin Details (Protected)
router.put('/update/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const updatedAdmin = await adminModel.findByIdAndUpdate(id, { username, email }, { new: true });
    if (!updatedAdmin) return res.status(404).send('Admin not found');
    res.status(200).send('Admin updated successfully');
  } catch (error) {
    console.error('Error updating admin:', error.message); // Log error
    res.status(500).send('Server error');
  }
});

// Delete Admin (Protected)
router.delete('/delete/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAdmin = await adminModel.findByIdAndDelete(id);
    if (!deletedAdmin) return res.status(404).send('Admin not found');
    res.status(200).send('Admin deleted successfully');
  } catch (error) {
    console.error('Error deleting admin:', error.message); // Log error
    res.status(500).send('Server error');
  }
});

// Admin creates a new user
router.post('/create-user', verifyToken, async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error.message); // Log error
    res.status(500).send('Server error');
  }
});

// Admin updates an existing user
router.put('/update-user/:id', verifyToken, async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Find user by ID
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    
    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    
    await user.save();
    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error.message); // Log error
    res.status(500).send('Server error');
  }
});

// Admin deletes a user by ID
router.delete('/delete-user/:id', verifyToken, async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error.message); // Log error
    res.status(500).send('Server error');
  }
});

module.exports = router;

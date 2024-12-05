const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },  // Optional: You can differentiate user roles
  isActive: { type: Boolean, default: true }, // Optional: To track active/inactive users
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);

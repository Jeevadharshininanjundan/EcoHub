// backend/models/User.js
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
name: String,
email: { type: String, unique: true, index: true },
passwordHash: String, // if using local auth
role: { type: String, enum: ['citizen','cleaner','ngo','municipality'], default: 'citizen' },
points: { type: Number, default: 0 },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', UserSchema);
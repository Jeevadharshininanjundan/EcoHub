// backend/seed.js - create sample users
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

(async ()=>{
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecohub');
  const users = [
    { name: 'Alice Citizen', email: 'alice@example.com', passwordHash: '', role: 'citizen' },
    { name: 'Charlie Cleaner', email: 'charlie@example.com', passwordHash: '', role: 'cleaner' },
    { name: 'City Admin', email: 'admin@example.com', passwordHash: '', role: 'municipality' },
    { name: 'Food NGO', email: 'ngo@example.com', passwordHash: '', role: 'ngo' }
  ];
  for(let u of users){
    const existing = await User.findOne({ email: u.email });
    if(!existing) await User.create(u);
  }
  console.log('seed done'); process.exit();
})();

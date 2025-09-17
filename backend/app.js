// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const authRoutes = require("./routes/auth");
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();

// Enable CORS for frontend before routes
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true // if you plan to use cookies/auth
}));

app.use(express.json());
app.use(fileUpload({ createParentPath: true }));

// Mount routes AFTER CORS
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

// static uploads
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecohub', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.error('Mongo error', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Backend running on ${PORT}`));

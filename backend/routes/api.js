// backend/routes/api.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Report = require('../models/Report');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// --- Auth (simple register/login for prototype) ---
router.post('/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'email & password required' });
  try{
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ error: 'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const u = new User({ name, email, passwordHash: hash, role: role || 'citizen' });
    await u.save();
    const token = jwt.sign({ id: u._id, role: u.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: u._id, name: u.name, role: u.role, email: u.email } });
  } catch(err){ console.error(err); res.status(500).json({ error: 'Server error' }); }
});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'email & password required' });
  try{
    const u = await User.findOne({ email });
    if(!u) return res.status(401).json({ error: 'Invalid creds' });
    const ok = await bcrypt.compare(password, u.passwordHash || '');
    if(!ok) return res.status(401).json({ error: 'Invalid creds' });
    const token = jwt.sign({ id: u._id, role: u.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: u._id, name: u.name, role: u.role, email: u.email } });
  } catch(err){ console.error(err); res.status(500).json({ error: 'Server error' }); }
});

// auth middleware
function authMiddleware(req, res, next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try{
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data; next();
  } catch(err){ return res.status(401).json({ error: 'Invalid token' }); }
}

// --- Create a report (citizen) ---
router.post('/report', async (req, res) => {
  try{
    const { title, description, lat, lng, reporterName } = req.body;
    let photoUrl = '';
    if(req.files && req.files.photo){
      const photo = req.files.photo;
      const uploadDir = path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');
      if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const filename = `${Date.now()}-${photo.name}`;
      const dest = path.join(uploadDir, filename);
      await photo.mv(dest);
      photoUrl = `/uploads/${filename}`;
    }
    const r = new Report({
      reporterName: reporterName || (req.user ? req.user.id : 'anonymous'),
      title, description, photoUrl,
      location: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] }
    });
    await r.save();
    res.json({ success: true, report: r });
  } catch(err){ console.error(err); res.status(500).json({ error: 'Unable to create report' }); }
});

// GET reports (dashboard)
router.get('/reports', async (req, res) => {
  try{
    const reports = await Report.find().sort({ createdAt: -1 }).limit(500);
    res.json({ reports });
  } catch(err){ res.status(500).json({ error: 'Server error' }); }
});

// Assign a report to cleaner (municipality)
router.post('/assign', authMiddleware, async (req, res) => {
  try{
    if(req.user.role !== 'municipality') return res.status(403).json({ error: 'Only municipality can assign' });
    const { reportId, cleanerId } = req.body;
    const r = await Report.findByIdAndUpdate(reportId, { status: 'assigned', assignedTo: cleanerId }, { new: true });
    res.json({ success: true, report: r });
  } catch(err){ res.status(500).json({ error: 'Server error' }); }
});

// Cleaner completes task (uploads after photo)
router.post('/complete', authMiddleware, async (req, res) => {
  try{
    if(req.user.role !== 'cleaner') return res.status(403).json({ error: 'Only cleaners can complete' });
    const { reportId } = req.body;
    let afterPhotoUrl = '';
    if(req.files && req.files.photo){
      const photo = req.files.photo;
      const uploadDir = path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');
      if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const filename = `${Date.now()}-after-${photo.name}`;
      const dest = path.join(uploadDir, filename);
      await photo.mv(dest);
      afterPhotoUrl = `/uploads/${filename}`;
    }
    const r = await Report.findById(reportId);
    if(!r) return res.status(404).json({ error: 'Report not found' });
    r.status = 'resolved';
    r.resolvedAt = new Date();
    if(afterPhotoUrl) r.description = (r.description || '') + '\n[afterPhoto] ' + afterPhotoUrl;
    await r.save();
    const cleaner = await User.findById(req.user.id);
    if(cleaner){ cleaner.points = (cleaner.points || 0) + 10; await cleaner.save(); }
    res.json({ success: true, report: r });
  } catch(err){ console.error(err); res.status(500).json({ error: 'Server error' }); }
});

// Mock AI classify endpoint
router.post('/ai/classify', async (req, res) => {
  const rand = Math.random();
  const verdict = rand > 0.35 ? 'pass' : 'fail';
  res.json({ verdict, confidence: (0.5 + Math.random()*0.5).toFixed(2) });
});

module.exports = router;

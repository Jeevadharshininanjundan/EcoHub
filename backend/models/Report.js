// backend/models/Report.js
const mongoose = require('mongoose');


const ReportSchema = new mongoose.Schema({
reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
reporterName: String,
title: String,
description: String,
photoUrl: String,
location: {
type: { type: String, default: 'Point' },
coordinates: [Number] // [lng, lat]
},
status: { type: String, enum: ['open','assigned','resolved'], default: 'open' },
assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
createdAt: { type: Date, default: Date.now },
resolvedAt: Date,
aiVerification: { type: String, enum: ['pass','fail','pending'], default: 'pending' }
});


ReportSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Report', ReportSchema);
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  state: String,
  district: String,
  financialYear: String, // e.g., '2024-25'
  year: Number, // extracted year for easier filtering
  totalJobcards: Number,
  totalWorkers: Number,
  totalHouseholdsWorked: Number,
  totalPersondaysGenerated: Number,
  averageWageRate: Number,
  totalWorkCompleted: Number,
  totalExpenditureRs: Number,
  metrics: [{
    month: String,
    value: Number
  }],
  raw: Object, // keep raw payload for later re-processing
  sourceUpdatedAt: Date
}, { timestamps: true });

// Index for faster queries
ReportSchema.index({ state: 1, district: 1, year: 1 });
ReportSchema.index({ district: 1 });

module.exports = mongoose.model('Report', ReportSchema);

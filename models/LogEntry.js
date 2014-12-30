var mongoose = require('mongoose');

var LogEntrySchema = new mongoose.Schema({
	level: Number,
    message : String,
    userId: String,
	created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LogEntry', LogEntrySchema);
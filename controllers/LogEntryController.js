var Q = require("q");

var LogEntry = require("../models/LogEntry");

var createEntry = function(req, res){
	var user = req.user;
	var level = req.body.level;
	var message = req.body.message;

	createUserEntryInternal(user, level, message).then(function(entity){
		res.send(entity);
	});
};

var createUserEntryInternal = function(user, level, message){
	var deferred = Q.defer();

	var logEntry = new LogEntry();

	logEntry.userId = user._id;
	logEntry.level = level;
	logEntry.message = message;
	logEntry.created = new Date();

	logToConsole(user.emailAddress, level, message);

	logEntry.save(function(err, logEntryEntity){
		deferred.resolve(logEntryEntity);
	});

	return deferred.promise;
};

var logToConsole = function(emailAddress, level, message){
	console.log(emailAddress + ": " + message);
};

module.exports = {
	createEntry: createEntry
};
var Q = require("q");

var LogEntry = require("../models/LogEntry");

var createUserEntry = function(req, res){
	var user = req.user;
	var level = req.body.level;
	var message = req.body.message;

	createUserEntryInternal(user, level, message).then(function(entity){
		res.send(entity);
	});
};

var getEntriesByUser = function(req, res){
	var userId = req.user_id;
	getLogEntriesByUser(userId).then(function(entities){
		res.send(entities);
	});
};

var createUserEntryInternal = function(user, level, message){
	var deferred = Q.defer();

	var logEntry = new LogEntry();

	logEntry.userId = user._id;
	logEntry.level = level;
	logEntry.message = message;
	logEntry.created = new Date();

	logEntry.save(function(err, logEntryEntity){
		deferred.resolve(logEntryEntity);
	});

	return deferred.promise;
};

var getUserEntries = function(){
	var deferred = Q.defer();

	LogEntry.find(function(err, entities){
		if ( err ){
			deferred.reject(err);
		}
		else{
			deferred.resolve(entities);
		}
	});

	return deferred.promise;
};

var getLogEntriesByUser = function(userId){

	var deferred = Q.defer();

	LogEntry.find({userId: userId}, function(err, entities){
		if ( err ){
			deferred.reject(err);
		}
		else{
			deferred.resolve(entities);
		}
	});

	return deferred.promise;
};

module.exports = {
	createUserEntry: createUserEntry,
	getUserEntries: getUserEntries,
	getUserEntries: getUserEntries
};
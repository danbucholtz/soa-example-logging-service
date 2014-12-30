var mongoose = require('mongoose');
var service = require("soa-example-core-service");
var config = require("soa-example-service-config").config();

var logEntryController = require('./controllers/LogEntryController');

mongoose.connect(config.mongoUri);

var app = service.createApiServer(config.loggingServicePort);

app.post('/log', service.ensureAuthenticated, logEntryController.createEntry);
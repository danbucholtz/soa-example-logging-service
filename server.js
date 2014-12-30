var mongoose = require('mongoose');
var service = require("soa-example-core-service");
var config = require("soa-example-service-config").config();

var logEntryController = require('./controllers/LogEntryController');

mongoose.connect(config.mongoUri);

var app = service.createApiServer(config.loggingServicePort);

app.post('/userEntries', logEntryController.createUserEntry);
app.get('/userEntries', service.ensureAuthenticated, logEntryController.getUserEntries);
app.get('/userEntries/:userId', service.ensureAuthenticated, logEntryController.getEntriesByUser);
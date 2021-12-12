const room = require('./api/room');

// defining routes
function routes(app) {
  app.use('/api/rooms', room);  
  
}

module.exports = routes;
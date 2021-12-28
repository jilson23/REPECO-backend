const room = require('./api/room');
const user = require('./api/user');
const hotel = require('./api/hotel')
const authLocal = require('./auth/local');

// defining routes
function routes(app) {
  app.use('/api/rooms', room);
  app.use('/api/users', user);
  app.use('/api/hotels', hotel);

  // auth routes
  app.use('/auth/local', authLocal);
}

module.exports = routes;

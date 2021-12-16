const room = require('./api/room');
const user = require('./api/user');
const authLocal = require('./auth/local');

// defining routes
function routes(app) {
  app.use('/api/rooms', room);
  app.use('/api/users', user);

  // auth routes
  app.use('/auth/local', authLocal);
}

module.exports = routes;

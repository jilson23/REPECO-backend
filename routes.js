const room = require('./api/room');
const user = require('./api/user');
const hotel = require('./api/hotel')
const reserve = require('./api/reserve')
const authLocal = require('./auth/local');
const upload = require('./api/upload');

const invoices = require('./api/invoice');

// defining routes
function routes(app) {
  app.use('/api/rooms', room);
  app.use('/api/users', user);
  app.use('/api/hotels', hotel);
  app.use('/api/reserves', reserve);
  app.use('/api/invoices', invoices);
  app.use('/auth/local', authLocal);
  // updaload image route
  app.use('/api/uploads', upload);
}

module.exports = routes;

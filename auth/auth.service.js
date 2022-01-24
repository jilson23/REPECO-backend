const jsonwebtoken = require('jsonwebtoken');
const compose = require('composable-middleware');

const config = require('../config');
const { findOneUser } = require('../api/user/user.service');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose().use(async (req, res, next) => {
    try {
      const authHeader = req.headers?.authorization;
      if (authHeader) {
        const [, token] = authHeader.split(' ');

        // Validate token
        const payload = await validateToken(token);

        if (!payload) {
          return res.status(403).end();
        }

        // Attach user to request
        const user = await findOneUser({ email: payload.email });

        if (!user) {
          return res.status(401).end('Unauthorized');
        }

        req.user = user;
        next();
        return null;
      } else {
        return res.status(401).end('Unauthorized');
      }
    } catch (error) {
      return next(error);
    }
  });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired = []) {
  if (!roleRequired.length) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      const { role } = req.user;
      if (roleRequired.includes(role)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Validate JWT
 * @param {String} token
 * @returns {Object} payload
 */
async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, config.secrets.session);
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Returns a jwt token signed by the app secret
 * @param {String} payload
 * @returns {String} token
 */
function signToken(payload) {
  const token = jsonwebtoken.sign(payload, config.secrets.session, {
    expiresIn: config.expiresIn,
  });

  return token;
};

module.exports = {
  signToken,
  isAuthenticated,
  hasRole,
};

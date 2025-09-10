const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Create a token
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1d',
  });
}

// Verify a token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};

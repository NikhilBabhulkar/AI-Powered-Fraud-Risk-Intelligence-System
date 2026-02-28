// backend/controllers/loginController.js
const jwt = require('jsonwebtoken');

const DEMO_USER = 'gov';
const DEMO_PASS = 'pass';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === DEMO_USER && password === DEMO_PASS) {
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
};

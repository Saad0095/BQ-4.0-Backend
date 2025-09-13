
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { User } from '../models/User.js';

export async function authGuard(req, res, next) {
  try {
    const header = req.headers['authorization'] || '';
    const [, token] = header.split(' ');
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

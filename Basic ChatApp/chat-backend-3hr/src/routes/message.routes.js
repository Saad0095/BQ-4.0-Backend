
import { Router } from 'express';
import { Message } from '../models/Message.js';
import { authGuard } from '../middleware/auth.js';

const router = Router();

// Get recent messages (simple keyset pagination by _id)
router.get('/', authGuard, async (req, res) => {
  const { limit = 20, beforeId } = req.query;
  const query = beforeId ? { _id: { $lt: beforeId } } : {};
  const msgs = await Message.find(query)
    .sort({ _id: -1 })
    .limit(Math.min(parseInt(limit, 10) || 20, 50))
    .populate('senderId', 'name');
  // reverse to chronological (oldest first) on the client if desired
  res.json(msgs.map(m => ({
    _id: m.id,
    text: m.text,
    sender: { _id: m.senderId.id, name: m.senderId.name },
    createdAt: m.createdAt
  })));
});

export default router;

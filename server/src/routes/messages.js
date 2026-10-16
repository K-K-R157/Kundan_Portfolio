import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: { message: 'Too many messages sent, please try again later' },
});

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const { name, email, subject = '', message } = req.body || {};
    if (!String(name ?? '').trim() || !String(email ?? '').trim() || !String(message ?? '').trim()) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }
    if (!EMAIL_RE.test(String(email))) return res.status(400).json({ message: 'Please provide a valid email' });

    await Message.create({ name, email, subject, message });
    res.status(201).json({ message: 'Thanks! Your message has been sent.' });
  } catch (err) {
    next(err);
  }
});

router.get('/', protect, async (req, res, next) => {
  try {
    res.json(await Message.find().sort({ createdAt: -1 }));
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/read', protect, async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { read: req.body?.read ?? true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json(msg);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;

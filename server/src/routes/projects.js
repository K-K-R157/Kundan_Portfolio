import { Router } from 'express';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';

const router = Router();
const FIELDS = ['title', 'subtitle', 'description', 'highlights', 'tech', 'github', 'live', 'date', 'featured', 'order'];
const pick = (body = {}) => Object.fromEntries(FIELDS.filter((f) => f in body).map((f) => [f, body[f]]));

router.get('/', async (req, res, next) => {
  try {
    res.json(await Project.find().sort({ order: 1, createdAt: -1 }));
  } catch (err) {
    next(err);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    res.status(201).json(await Project.create(pick(req.body)));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, pick(req.body), {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;

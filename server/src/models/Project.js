import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true, default: '' },
    description: { type: String, required: true, trim: true },
    highlights: [{ type: String, trim: true }],
    tech: [{ type: String, trim: true }],
    github: { type: String, trim: true, default: '' },
    live: { type: String, trim: true, default: '' },
    date: { type: String, trim: true, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);

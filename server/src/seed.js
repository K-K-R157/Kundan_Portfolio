// Usage: npm run seed            -> creates/updates admin, inserts projects if none exist
//        npm run seed -- --reset -> also replaces all projects with the defaults
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Admin from './models/Admin.js';
import Project from './models/Project.js';
import projects from './data/projects.js';

const reset = process.argv.includes('--reset');

async function run() {
  await connectDB(process.env.MONGO_URI);

  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    let admin = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (!admin) admin = new Admin({ email: ADMIN_EMAIL });
    admin.password = ADMIN_PASSWORD;
    await admin.save();
    console.log(`Admin ready: ${admin.email}`);
  } else {
    console.warn('ADMIN_EMAIL / ADMIN_PASSWORD not set, skipping admin creation');
  }

  const count = await Project.countDocuments();
  if (reset || count === 0) {
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log(`Inserted ${projects.length} projects`);
  } else {
    console.log(`${count} projects already exist (use --reset to replace)`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

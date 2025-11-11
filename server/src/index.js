// server/src/index.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import connectDB from './config/db.config.js';
import { configurePassport } from './config/passport.config.js';
import authRoutes from './routes/auth.routes.js';
import materiRoutes from './routes/materi.routes.js';
import userRoutes from './routes/user.routes.js';
import threadRoutes from './routes/thread.routes.js';
import replyRoutes from './routes/reply.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import submissionRoutes from './routes/submission.routes.js';
import configRoutes from './routes/config.routes.js';
import chatTemplateRoutes from './routes/chatTemplate.routes.js';

connectDB();
configurePassport(passport);

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/materi', materiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/threads', threadRoutes);
app.use('/api/replies', replyRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/config', configRoutes);
app.use('/api/chat-templates', chatTemplateRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
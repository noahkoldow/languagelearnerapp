import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const app: Express = express();
const PORT = process.env.SERVER_PORT || 5000;
app.use(express.json());
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/languagelearnerapp';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

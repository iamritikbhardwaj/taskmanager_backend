import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './db/dbConfig.js';
import userRouter from './routers/user.routes.js';
import taskRouter from './routers/task.routes.js';

dotenv.config(); // ✅ Load environment variables early

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
})();

const app = express();

const corsOptions = {
  origin: [
    '*',
    'http://localhost:5173', // ✅ Only allow your frontend origin in development
    'http://185.193.19.244:5173'
  ],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'credentials'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

// Optional: if using server-side rendering
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../public/temp'));

// Serve frontend in production
if (process.env.ENVIRONMENT === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './db/dbConfig.js';
import userRouter from './routers/user.routes.js';
import taskRouter from './routers/task.routes.js';

// Define __dirname for ES modules

(async () => {
  await connectDB()
}
)()

const app = express();

const corsOptions = {
  origin: [
    '*'
  ],
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'credentials'],
  credentials: true,
};


app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

app.set('view engine', 'ejs');
app.set('views', path.resolve('../public/temp'));

const __dirname = path.resolve();

// Serve frontend build files in production
if (process.env.ENVIRONMENT === 'PRODUCTION') {
  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname, 'build')));
  // All unknown routes should serve the frontend's index.html file
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  );
} else {
  // For development, just respond with a simple message
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
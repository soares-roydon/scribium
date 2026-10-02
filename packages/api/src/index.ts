import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './module/user/user.routes';
import postRouter from './module/post/post.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';

const PORT = 3001;
const app = express();

app.use(
   cors({
      origin: 'http://localhost:3000',
      credentials: true,
   }),
);

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
   res.send('Server health: healthy');
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/blogs', postRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`);
});

import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './module/user/user.routes';
import postRouter from './module/post/post.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/blogs', postRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
   console.log(`http://localhost:${PORT}`);
});

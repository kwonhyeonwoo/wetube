import express from "express";
import morgan from "morgan";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import connectDb from "./db.js";

const app = express();
const port = 3000;
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({}))
connectDb()
app.use('/user', userRouter);
app.use('/video', videoRouter);
// db.js에서 연결 함수가 Promise를 반환한다고 가정할 때
app.listen(port, () => {
    console.log(`Server Open : localhost:${port}`)
});
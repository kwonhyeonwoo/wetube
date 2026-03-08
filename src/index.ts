import express, { type NextFunction, type Request, type Response } from "express";
import morgan from "morgan";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import connectDb from "./db.js";
import session from "express-session";

const app = express();
const port = 3000;
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "your-secret-key", // 세션 암호화 키
        resave: true, // 세션 데이터가 변경되지 않아도 저장할지 여부
        saveUninitialized: true, // 초기화되지 않은 세션도 저장할지 여부
        cookie: {
            secure: false, // https 사용 시 true
            maxAge: 1000 * 60 * 60, // 1시간
        },
    })
);



connectDb();

app.get(('/add-one'), (req: Request, res: Response) => {
    return res.send('hello')
})
app.use('/user', userRouter);
app.use('/video', videoRouter);
// db.js에서 연결 함수가 Promise를 반환한다고 가정할 때
app.listen(port, () => {
    console.log(`Server Open : localhost:${port}`)
});
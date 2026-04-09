import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import connectDb from "./db.js";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const port = 3000;
app.use(morgan('dev'));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.COOKIE_SECRET as string, // 세션 암호화 키
        resave: false, // 세션 데이터가 변경되지 않아도 저장할지 여부
        saveUninitialized: false, // 초기화되지 않은 세션도 저장할지 여부
        cookie: {
            secure: false, // https 사용 시 true
        },
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL as string,
        })
    })
);

connectDb();
app.use("/uploads", express.static('uploads'));
app.use('/user', userRouter);
app.use('/video', videoRouter);
// db.js에서 연결 함수가 Promise를 반환한다고 가정할 때
app.listen(port, () => {
    console.log(`Server Open : localhost:${port}`)
});
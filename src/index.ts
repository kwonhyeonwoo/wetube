import express from "express";
import morgan from "morgan";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";

const app = express();
const port = 3000;
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({}))
app.use('/user', userRouter);
app.use('/video', videoRouter);


app.listen(port, () => {
    console.log(`Server is runngfhgfhging on http://localhost:${port}`);
});
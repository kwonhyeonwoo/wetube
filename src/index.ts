import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 3000;
app.get('/', (req: Request, res: Response) => {
    console.log('hello express ! lets go home!')
});

app.listen(port, () => {
    console.log(`Server is runngfhgfhging on http://localhost:${port}`);
});
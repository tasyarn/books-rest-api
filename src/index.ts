import express, {Request, response, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({
        response: "Express TypeScripst"
    });
    return;
})

app.listen(process.env.APP_PORT, () => {
    console.log((`${process.env.APP_NAME} running on port ${process.env.APP_PORT}`))
});
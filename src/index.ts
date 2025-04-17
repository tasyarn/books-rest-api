import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bookRoutes from "./routes/bookRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import sequelizeConnection from "./config/dbConnect";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    response: "Express TypeScript API",
  });
});

app.use("/books", bookRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`${process.env.APP_NAME} running on port ${port}`);
});

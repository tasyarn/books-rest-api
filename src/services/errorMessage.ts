import { Response } from "express";

const errorMessage = (error: any, res: Response) => {
  console.error(error);
  res.status(500).json({
    status: "error",
    message: error.message || "Internal Server Error",
  });
};

export default errorMessage;

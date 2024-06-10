import configureFirebase from "@/config/firebaseConfig";
import { ApiError } from "@/entities/ApiError";
import authRoutes from "@/routes/auth";
import userRoutes from "@/routes/user";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";

const { db, auth } = configureFirebase();

const server = express();
server.use(cookieParser());

server.use(bodyParser.json());

userRoutes({ server, db, auth });
authRoutes({ server, db, auth });

server.use((err: ApiError, _, res, _2) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode,
    message: err.message,
  });
});

server.listen(3001);

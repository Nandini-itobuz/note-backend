import express from "express";
import { noteRouter } from "./Routers/NoteRouter.js";
import { userRoutes } from "./Routers/UserRoutes.js";
import { connectDb } from "./Connect.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use('/note',noteRouter);
app.use('/user',userRoutes);

connectDb();
app.listen(PORT, () => {
  console.log(`Listining to ${PORT}...`);
});

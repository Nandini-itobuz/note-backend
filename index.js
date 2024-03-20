import express from "express";
import mongoose from "mongoose";
import { noteRouter } from "./Routers/NoteRouter.js";

mongoose.connect('mongodb://localhost:27017');
const app=express();
app.use(express.json());
app.use(noteRouter);
const port = 3001;


app.listen(port, ()=>{
    console.log(`Listining to ${port}...`)
})
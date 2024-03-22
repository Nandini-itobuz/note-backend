import express from "express";
import {
  updateData,
  findData,
  insertData,
  deleteData,defaultRoutes
} from "../Controllers/UserControllers.js";
export const userRoutes = express.Router();

userRoutes.route("/data").post(insertData);
userRoutes.route("/find/:id").get(findData);
userRoutes.route("/update/:id").put(updateData);
userRoutes.route("/delete/:id").delete(deleteData);
userRoutes.route("*").all(defaultRoutes);
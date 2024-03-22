import express from "express";
import jwt from "jsonwebtoken";
import {
  getAllNote,
  updateNote,
  insertNote,
  searchNotes,
  deletedNotes,
  searchByName,
  showUpdatedData,
  showSoftDeleteAll,
  showSoftDeleteTrue
} from "../Controllers/NoteControllers.js";
export const noteRouter = express.Router();

noteRouter.use((req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token present!!!");
    const payload = jwt.verify(token, "ok");
    if (!payload.id) throw new Error("No id found");
    req.idUser = payload.id;
    next();
  } catch (e) {
    res.status(404).send(e.message);
  }
});

noteRouter.route("/").get(getAllNote);
noteRouter.route("/update/:id").put(updateNote);
noteRouter.route("/data").post(insertNote);
noteRouter.route("/search/:id").post(searchNotes);
noteRouter.route("/delete/:id").delete(deletedNotes);
noteRouter.route("/search-by-name").get(searchByName);
noteRouter.route("/last-updated").get(showUpdatedData);
noteRouter.route("/get-soft-delete-all").post(showSoftDeleteAll)
noteRouter.route("/get-soft-delete-true").get(showSoftDeleteTrue)
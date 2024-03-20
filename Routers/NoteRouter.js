import express from 'express'
import {getAllNote, updateNote, insertNote,searchNotes,deletedNotes} from '../Controllers/NoteControllers.js'
export const noteRouter = express.Router();

noteRouter.route('/').get(getAllNote);
noteRouter.route('/update/:id').put(updateNote);
noteRouter.route('/data').post(insertNote);
noteRouter.route('/search/:id').post(searchNotes);
noteRouter.route('/delete/:id').delete(deletedNotes);
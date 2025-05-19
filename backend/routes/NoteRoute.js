import express from 'express';
import {
    getNotes,
    getNoteById,
    createNotes,
    updateNotes,
    deleteNotes
} from "../controllers/NoteController.js";

const router = express.Router();

router.get("/notes", getNotes);
router.get("/note/:id", getNoteById);
router.post("/add-notes", createNotes);
router.put("/note/:id", updateNotes);
router.delete("/note/:id", deleteNotes);

export default router;

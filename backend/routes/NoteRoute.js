import express from 'express';
import {
    getNotes,
    getNoteById,
    createNotes,
    updateNotes,
    deleteNotes,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    login,
    logout,
} from "../controllers/NoteController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getAccessToken } from "../controllers/TokenController.js";

const router = express.Router();

router.get("/notes", getNotes);
router.get("/note/:id", getNoteById);
router.post("/add-notes", createNotes);
router.put("/note/:id", updateNotes);
router.delete("/note/:id", deleteNotes);

router.get("/token", getAccessToken);
router.post("/login", login);
router.delete("/logout", logout);

router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/users", createUser);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;

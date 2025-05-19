import { Note } from "../models/NoteModel.js";

// GET
async function getNotes(req, res) {
    try {
        const response = await Note.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// GET NOTE BY ID
async function getNoteById(req, res) {
    try {
        const note = await Note.findOne({
            where: { id: req.params.id }
        });

        if (!note) {
            return res.status(404).json({ msg: "Catatan tidak ditemukan" });
        }

        res.status(200).json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

// CREATE
async function createNotes(req, res) {
    try {
        const inputResult = req.body;
        await Note.create(inputResult);
        res.status(201).json({ msg: "Note created" });
    } catch (error) {
        console.log(error.message);
    }
}

// UPDATE
async function updateNotes(req, res) {
    try {
        await Note.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "This Note Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

// DELETE
async function deleteNotes(req, res) {
    try {
        await Note.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "This Note Completed Detele" });
    } catch (error) {
        console.log(error.message);
    }
}

export { getNotes, getNoteById, createNotes, updateNotes, deleteNotes };

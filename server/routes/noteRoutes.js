import express from "express";
import { createNote, deleteNote, getNotes } from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);
router.get("/", getNotes);
router.delete("/:id", deleteNote);

export default router;

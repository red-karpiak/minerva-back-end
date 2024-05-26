import { Router } from "express";
import { queryBooks, queryBookById } from "../handlers/books";
const router = Router();
const volumes = "/volumes/:query";
const id = "/:id";

router.get(volumes, queryBooks);
router.get(id, queryBookById);

export default router;

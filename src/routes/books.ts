import { Router } from "express";
import { getBooksByTitle } from "../handlers/books";
const router = Router();
const titlePrefix = "/title";

router.get(titlePrefix, getBooksByTitle);

export default router;

import { Router } from "express";
import bookRouter from "./books";

const router = Router();
const apiPrefix = "/api";
const booksPrefix = "/books";

router.use(`${apiPrefix}${booksPrefix}`, bookRouter);

export default router;

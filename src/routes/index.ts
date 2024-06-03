import { Router } from "express";
import bookRouter from "./books";

const router: Router = Router();
const apiPrefix: string = "/api";
const booksPrefix: string = "/books";

router.use(`${apiPrefix}${booksPrefix}`, bookRouter);

export default router;

import { Router } from "express";
import { queryBooks, queryBookById } from "../handlers/books";
import {
  validateApiKey,
  validateQueryParam,
  validateQueryLength,
} from "../middleware/validationMiddleware";

const router: Router = Router();
const volumes: string = "/volumes";
const id: string = `${volumes}/:id`;

router.get(
  volumes,
  validateApiKey,
  validateQueryParam,
  validateQueryLength,
  queryBooks
);
router.get(id, queryBookById);

export default router;

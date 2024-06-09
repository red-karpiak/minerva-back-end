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
const minimal: string = `${id}/:minimal`;
router.get(
  volumes,
  validateApiKey,
  validateQueryParam,
  validateQueryLength,
  queryBooks
);
router.get(id, validateApiKey, queryBookById);
router.get(minimal, validateApiKey, queryBookById);
export default router;

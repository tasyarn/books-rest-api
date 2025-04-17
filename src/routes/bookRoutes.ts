import { Router } from "express";
import {
  getBooksList,
  getBook,
  createNewBook,
  updateExistingBook,
  deleteExistingBook,
} from "../controllers/bookController";
import { authenticate, authorizeRole } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getBooksList);
router.get("/:id", getBook);
router.post("/", authenticate, authorizeRole(["admin", "user"]), createNewBook);
router.put("/:id", authenticate, authorizeRole(["admin", "user"]), updateExistingBook);
router.delete("/:id", authenticate, authorizeRole(["admin"]), deleteExistingBook);

export default router;

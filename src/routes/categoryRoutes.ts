import { Router } from "express";
import {
  getCategoriesList,
  getCategory,
  createNewCategory,
  updateExistingCategory,
  deleteExistingCategory,
} from "../controllers/categoryController";
import { authenticate, authorizeRole } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getCategoriesList);
router.get("/:id", getCategory);
router.post("/", authenticate, authorizeRole(["admin", "user"]), createNewCategory);
router.put("/:id", authenticate, authorizeRole(["admin", "user"]), updateExistingCategory);
router.delete("/:id", authenticate, authorizeRole(["admin"]), deleteExistingCategory);

export default router;

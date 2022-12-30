import { Router } from "express";
import { loginRoute, registerRoute } from "../controllers/authControllers.js";
const router = Router();

router.post("/register", registerRoute);
router.post("/login", loginRoute);
export default router;

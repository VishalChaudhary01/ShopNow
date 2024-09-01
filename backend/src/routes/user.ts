import express from "express";
import { logout, profile, signin, signup } from "../controllers/user";
import { isAuth } from "../middlewares/auth";

const router = express();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", isAuth, profile);
router.post("/logout", isAuth, logout);

export default router;
import express from "express";
import { requestOtp, verifyOtp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup/request-otp", requestOtp);
router.post("/signup/verify-otp", verifyOtp);

export default router;

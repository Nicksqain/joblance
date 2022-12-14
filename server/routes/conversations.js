// Deps
import express from "express";

// Middlewares
import { requireSignIn } from "../middlewares";
// Express Router
const router = express.Router();
const { message, getConv } = require("../controllers/conversation.js");
router.post("/", message);
router.get("/:userId", getConv);
export default router;

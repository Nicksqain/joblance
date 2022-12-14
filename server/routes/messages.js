// Deps
import express from "express";

// Middlewares
import { requireSignIn } from "../middlewares";
// Express Router
const router = express.Router();
const { addMessage, getMessages } = require("../controllers/conversation.js");
router.get("/:conversationId", getMessages);
router.post("/", addMessage);

export default router;

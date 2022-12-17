// Deps
import express from "express";

// Middlewares
import { requireSignIn } from "../middlewares";
// Express Router
const router = express.Router();
const { getOrders, createOrder } = require("../controllers/orders.js");
router.get("/", getOrders);
router.post("/", createOrder);

export default router;

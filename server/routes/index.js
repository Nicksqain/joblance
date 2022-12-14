// Deps
import express from "express";

// Express Router
const router = express.Router();

// Controllers

router.get("/", (req, res) => {
  res.send("get root");
});

export default router;

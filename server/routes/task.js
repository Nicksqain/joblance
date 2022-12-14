// Deps
import express from "express";

// Middlewares
import { requireSignIn, canChangeTask } from "../middlewares";
// Express Router
const router = express.Router();

// Controllers
const {
  create,
  tasks,
  taskCount,
  update,
  remove,
} = require("../controllers/task");

router.post("/create", requireSignIn, create);
// router.get("/", tasks);
router.get("/page/:page", tasks);
router.put("/:taskId", requireSignIn, canChangeTask, update);
router.delete("/:taskId", requireSignIn, canChangeTask, remove);
router.get("/count", taskCount);

export default router;

import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { 
    getTasks, 
    createTasks, 
    deleteTasks, 
    getTask, 
    updateTasks 
    } from "../controllers/tasks.controller.js";


const router = Router();

router.get("/tasks", authRequired, getTasks);
router.post("/tasks", authRequired, createTasks);
router.delete("/tasks/:id", authRequired, deleteTasks);
router.get("/tasks/:id", authRequired, getTask);
router.put("/tasks/:id", authRequired, updateTasks);

export default router;
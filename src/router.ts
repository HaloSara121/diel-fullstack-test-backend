import express from "express"
import taskController from "./controllers/taskController"

const router = express()


router.get("/tasks", taskController.index)
router.post("/tasks", taskController.create)
router.delete("/tasks/:taskId", taskController.delete)
router.put("/tasks", taskController.update)

export default router
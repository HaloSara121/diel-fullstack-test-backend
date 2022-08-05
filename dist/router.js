"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = __importDefault(require("./controllers/taskController"));
const router = (0, express_1.default)();
router.get("/tasks", taskController_1.default.index);
router.post("/tasks", taskController_1.default.create);
router.delete("/tasks/:taskId", taskController_1.default.delete);
router.put("/tasks", taskController_1.default.update);
exports.default = router;

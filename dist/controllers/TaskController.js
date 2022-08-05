"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskModel_1 = require("../model/taskModel");
const taskController = {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield taskModel_1.taskModel.index();
            res.json({ tasks });
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, durationInMin } = req.body.data;
            if (title && description && durationInMin) {
                yield taskModel_1.taskModel.create({ title, description, durationInMin });
            }
            else {
                return res.status(400).json({ missingData: true });
            }
            res.status(202).json({ success: true });
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskId } = req.params;
            if (taskId) {
                yield taskModel_1.taskModel.delete(taskId);
            }
            else {
                return res.status(400).json({ missingData: true });
            }
            res.status(202);
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskData } = req.body.data;
            if (taskData) {
                yield taskModel_1.taskModel.update(taskData);
            }
            else {
                return res.status(400).json({ missingData: true });
            }
            res.status(202);
        });
    },
};
exports.default = taskController;

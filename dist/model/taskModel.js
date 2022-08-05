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
exports.taskModel = void 0;
const fauna_1 = require("../services/fauna");
const faunadb_1 = require("faunadb");
const uuid_1 = require("uuid");
exports.taskModel = {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasksRasponse = yield fauna_1.fauna.query(faunadb_1.query.Map(faunadb_1.query.Paginate(faunadb_1.query.Documents(faunadb_1.query.Collection('tasks'))), faunadb_1.query.Lambda(x => faunadb_1.query.Get(x))));
            const tasks = tasksRasponse.data.map(tasksRef => tasksRef.data);
            return tasks;
        });
    },
    create(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            yield fauna_1.fauna.query(faunadb_1.query.If(faunadb_1.query.Not(faunadb_1.query.Exists(faunadb_1.query.Match(faunadb_1.query.Index('task_by_id'), faunadb_1.query.Casefold(id)))), faunadb_1.query.Create(faunadb_1.query.Collection('tasks'), { data: {
                    id,
                    title: taskData.title,
                    description: taskData.description,
                    durationInMin: taskData.durationInMin
                } }), faunadb_1.query.Get(faunadb_1.query.Match(faunadb_1.query.Index('task_by_id'), faunadb_1.query.Casefold(id))))).catch(err => console.log(err));
        });
    },
    delete(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield fauna_1.fauna.query(faunadb_1.query.Get(faunadb_1.query.Match(faunadb_1.query.Index("task_by_id"), taskId)));
            yield fauna_1.fauna.query(faunadb_1.query.Delete(task.ref));
        });
    },
    update(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield fauna_1.fauna.query(faunadb_1.query.Get(faunadb_1.query.Match(faunadb_1.query.Index("task_by_id"), taskData.id)));
            yield fauna_1.fauna.query(faunadb_1.query.Update(task.ref, { data: taskData }));
        });
    },
};

import { Response, Request } from "express";
import { taskModel } from "../model/taskModel";

const taskController = {
  async index(req: Request, res: Response) {

    const tasks = await taskModel.index()

    res.json({tasks})
  },

  async create(req: Request, res: Response) {
    const { title, description, durationInMin } = req.body.data 

    if(title && description && durationInMin) {
      await taskModel.create({ title, description, durationInMin })
    } else {
      return res.status(400).json({ missingData: true })
    }


    res.status(202).json({ success: true })
  },

  async delete(req: Request, res: Response) {
    const { taskId } = req.params

    if(taskId) {
      await taskModel.delete(taskId)
    } else {
      return res.status(400).json({ missingData: true })
    }

    res.status(202)
  },

  async update(req: Request, res: Response) {
    const { taskData } = req.body.data

    if (taskData) {
      await taskModel.update(taskData)
    } else {
      return res.status(400).json({ missingData: true })
    }

    res.status(202)
  },
}

export default taskController
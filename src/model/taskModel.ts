import { fauna } from "../services/fauna";
import { query as q } from "faunadb";

import { v4 } from 'uuid'
import { Task } from "../@types/Task";

export const taskModel = {
  async index() {
    const tasksRasponse = await fauna.query<{ data: any[]}>(
      q.Map(
        q.Paginate(q.Documents(q.Collection('tasks'))),
        q.Lambda(x => q.Get(x))
      )
    )

    const tasks = tasksRasponse.data.map(tasksRef => tasksRef.data)

    return tasks
  },

  async create(taskData: Omit<Task, "id">) {
    const id = v4()

    await fauna.query(
      q.If(
        q.Not(
          q.Exists(
            q.Match(
              q.Index('task_by_id'),
              q.Casefold(id)
            )
          )
        ),
        q.Create(
          q.Collection('tasks'),
          {data: {
            id,
            title: taskData.title,
            description: taskData.description,
            durationInMin: taskData.durationInMin
          }}
        ),
        q.Get(
          q.Match(
            q.Index('task_by_id'),
            q.Casefold(id)
          )
        )
      )
    ).catch(err => console.log(err))
  },

  async delete(taskId: string) {
    const task = await fauna.query<any>(
      q.Get(
        q.Match(
          q.Index("task_by_id"),
          taskId
        )
      )
    )

    await fauna.query(
      q.Delete(task.ref)
    )
  },

  async update(taskData: Task) {
    const task = await fauna.query<any>(
      q.Get(
        q.Match(
          q.Index("task_by_id"),
          taskData.id
        )
      )
    )

    await fauna.query(
      q.Update(
        task.ref,
        { data: taskData }
      )
    )
  },
}
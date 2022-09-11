import { Task } from "../model/task";

let db: Task[] = [];

const createTask = (task: Task) => {
  db.push(task);
}

const updateTaskName = (id: string, task: Task) => {
  db.map(dbTask => {
    if (dbTask.id === id) {
      dbTask.text = task.text;
    }
  })
}

const toogleTaskStatus = (id: string) => {
  db.map(dbTask => {
    if (dbTask.id === id) {
      dbTask.done = !dbTask.done;
    }
  })
}

const deleteTask = (id: string) => {
  db = db.filter(task => task.id !== id);
}

export {
  createTask,
  updateTaskName,
  toogleTaskStatus,
  deleteTask
}
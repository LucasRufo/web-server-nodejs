import { Task } from "../model/task";

let db: Task[] = [];

const getTasks = () => {
  return db;
}

const createTask = (task: Task) => {
  db.push(task);
}

const updateTaskName = (id: string, text: string) => {
  db.map(dbTask => {
    if (dbTask.id === id) {
      dbTask.text = text;
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
  getTasks,
  createTask,
  updateTaskName,
  toogleTaskStatus,
  deleteTask
}
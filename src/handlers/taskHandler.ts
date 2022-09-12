import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { Task } from "../model/task";
import * as TaskRepository from "../repository/taskRepository";

const handleGetTasks = async (req: Request, res: Response): Promise<void> => {
  let tasks = TaskRepository.getTasks();

  //weird way to sort all the tasks by desc using createdAt
  tasks = tasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  res.status(200).json(tasks);
}

const handleCreateTask = async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body;

  const validationError = validateText(text);

  if (validationError != null) {
    res.status(422).json(validationError)
    return;
  }

  const task: Task = {
    id: randomUUID(),
    text,
    createdAt: new Date(),
    done: false
  }

  TaskRepository.createTask(task);

  res.status(200).json(task);
}

const handleToogleTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  TaskRepository.toogleTaskStatus(id);

  res.sendStatus(200);
}

const handleNameUpdate = async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body;
  const { id } = req.params;

  const validationError = validateText(text);

  if (validationError != null) {
    res.status(422).json(validationError)
    return;
  }

  TaskRepository.updateTaskName(id, text);

  res.status(200).json({ updatedName: text });
}

const handleDeleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  TaskRepository.deleteTask(id);

  res.sendStatus(200);
}

const validateText = (text: string) => {
  if (text === "")
    return { message: "O campo não pode ser vazio." };

  if (text.length > 50)
    return { message: "O texto não pode conter mais de 50 caracteres." };

  return null;
}

export {
  handleGetTasks,
  handleCreateTask,
  handleToogleTask,
  handleNameUpdate,
  handleDeleteTask
}
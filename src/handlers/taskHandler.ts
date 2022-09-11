import { Request, Response } from "express";

const handleCreateTask = async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body;

  //validate

  //add db
}

const handleToogleTask = async (req: Request, res: Response): Promise<void> => {
  //update status on db
}

const handleNameUpdate = async (req: Request, res: Response): Promise<void> => {
  const { text } = req.body;

  //validate

  //update db
}

const handleDeleteTask = async (req: Request, res: Response): Promise<void> => {
  //remove from db
}

export {
  handleCreateTask,
  handleToogleTask,
  handleNameUpdate,
  handleDeleteTask
}
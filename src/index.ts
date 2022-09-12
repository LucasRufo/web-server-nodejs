import express, { Application, Response } from "express";
import path from "path";
import * as Handler from "./handlers/taskHandler"

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", async (_, res: Response): Promise<void> => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/tasks", Handler.handleGetTasks);

app.post("/tasks", Handler.handleCreateTask);

app.put("/tasks/:id", Handler.handleNameUpdate)

app.delete("/tasks/:id", Handler.handleDeleteTask)

app.put("/tasks/:id/toogle", Handler.handleToogleTask)

try {
  app.listen(port, (): void => {
    console.log(`Servidor escutando na porta: ${port}`);
  });
} catch (error) {
  console.error(`Erro ao subir o servidor: ${error.message}`);
}
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

app.post("/task", Handler.handleCreateTask);

app.put("/task/:id", Handler.handleNameUpdate)

app.delete("task/:id", Handler.handleDeleteTask)

app.put("/task/:id/toogle", Handler.handleToogleTask)

try {
  app.listen(port, (): void => {
    console.log(`Servidor escutando na porta: ${port}`);
  });
} catch (error) {
  console.error(`Erro ao subir o servidor: ${error.message}`);
}
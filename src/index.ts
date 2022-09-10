import express, { Application, Request, Response } from "express";
import path from "path";

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", async (_, res: Response): Promise<void> => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

try {
  app.listen(port, (): void => {
    console.log(`Servidor escutando na porta: ${port}`);
  });
} catch (error) {
  console.error(`Erro ao subir o servidor: ${error.message}`);
}
const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body; // objeto completo

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex == -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  // tudo que está no id repository em repositories será modificado (sobrescrito) pelo input do
  // usuário em updateRepository.
  // const repository = { ...repositories[repositoryIndex], ...updatedRepository }; // objeto

  const likes = repositories[repositoryIndex].likes;

  const repository = {id, title, url, techs, likes};

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex == -1) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  // busca se o id passado como parâmetro existe.
  const repositoryIndex = repositories.find(repository => repository.id === id);

  if (!repositoryIndex) {
    return response.status(404).json({ error: "Repository not found" });
  }

  ++repositoryIndex.likes; // incrementa o número de likes pelo id buscado

  return response.json(repositoryIndex);
});

module.exports = app;

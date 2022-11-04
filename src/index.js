const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalker, getAllTalkerId } = require('./utils/requestApi');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const listTalker = await getAllTalker();
  response.status(HTTP_OK_STATUS).json(listTalker);
});

app.get('/talker/:id', async (request, response) => {
  const { params: { id } } = request;
  const listTalkerId = await getAllTalkerId(id);

  if (listTalkerId.length === 0 || listTalkerId === undefined) {
    const messageErro = { message: 'Pessoa palestrante não encontrada' };
    return response.status(HTTP_NOT_FOUND_STATUS).json(messageErro);
  }

  response.status(HTTP_OK_STATUS).json(listTalkerId[0]);
});

app.listen(PORT, () => {
  console.log('Online');
});

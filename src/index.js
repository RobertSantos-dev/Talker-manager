const express = require('express');
const bodyParser = require('body-parser');

const randomCrypto = require('./utils/randomToken');
const {
  getAllTalker,
  getAllTalkerId,
  postTalkerAdd,
} = require('./utils/requestApi');
const {
  validationUserEmail,
  validationUserPassword,
} = require('./middlewares/validationLogin');
const {
  validationTalk,
  validationTalkWatchedAt,
  validationTalkRate,
} = require('./middlewares/validationTalk');
const validationName = require('./middlewares/validationName');
const validationAge = require('./middlewares/validationAge');
const validationToken = require('./middlewares/validationToken');

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

app.post('/login', validationUserEmail, validationUserPassword, async (_request, response) => {
    const token = randomCrypto();
    response.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker',
validationToken,
validationName,
validationAge,
validationTalk,
validationTalkWatchedAt,
validationTalkRate,
async (request, response) => {
  const obj = request.body;
  const newId = await postTalkerAdd(obj);

  response.status(201).json(
    {
      id: newId,
      name: obj.name,
      age: obj.age,
      talk: {
        watchedAt: obj.talk.watchedAt,
        rate: obj.talk.rate,
      },
    },
  );
});

app.listen(PORT, () => {
  console.log('Online');
});

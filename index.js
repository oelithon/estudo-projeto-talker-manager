const express = require('express');
const bodyParser = require('body-parser');

const talker = require('./middlewares/talker');
const talkerId = require('./middlewares/talker-id');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app
  .route('/talker')
  .get(talker);

// Requisito 02
app
  .route('/talker/:id')
  .get(talkerId);

const isEmailValid = (email) => {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email) === true;
};

// Requisito 03
function validationEmailPassword(res, email, password) {
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
    return;
  }
  if (!isEmailValid(email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    return;
  }
  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
    return;
  }
  return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}

app
  .route('/login')
  .post((req, res) => {
    const { email, password } = req.body;
    if (isEmailValid(email) && password && password.length >= 6) {
      res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
      return;
    }

    validationEmailPassword(res, email, password);
  });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

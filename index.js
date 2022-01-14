const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const arquivoTalker = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERRO_STATUS = 404;
const PORT = '3000';

// Requisito 01
app
  .route('/talker')
  .get((req, res) => {
    const data = JSON.parse(fs.readFileSync(arquivoTalker, 'utf8'));
    res.status(HTTP_OK_STATUS).send(data);
  });

// Requisito 02
app
  .route('/talker/:id')
  .get((req, res) => {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync(arquivoTalker, 'utf8'));
    const searchId = data.find((pessoaId) => pessoaId.id === Number(id));

    if (!searchId) {
      res.status(HTTP_ERRO_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
      return;
    }

    res.status(HTTP_OK_STATUS).json(searchId);
  });

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
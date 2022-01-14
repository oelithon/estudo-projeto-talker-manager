const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const arquivoTalker = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERRO_STATUS = 404;
const PORT = '3000';

app
  .route('/talker')
  .get((req, res) => {
    const data = JSON.parse(fs.readFileSync(arquivoTalker, 'utf8'));
    res.status(HTTP_OK_STATUS).send(data);
  });

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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
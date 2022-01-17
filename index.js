const express = require('express');
const bodyParser = require('body-parser');

const talker = require('./middlewares/talker');
const talkerId = require('./middlewares/talker-id');
const login = require('./middlewares/login');
const {
  postTalker,
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
} = require('./middlewares/postTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app
  .route('/talker')
  .get(talker)
  .post(
    tokenValidator,
    nameValidator,
    ageValidator,
    talkValidator,
    watchedAtValidator,
    rateValidator,
    postTalker,
  );

app
  .route('/talker/:id')
  .get(talkerId);

app
  .route('/login')
  .post(login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

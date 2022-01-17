const express = require('express');
const bodyParser = require('body-parser');

const talker = require('./middlewares/talker');
const talkerId = require('./middlewares/talker-id');
const login = require('./middlewares/login');
const postTalker = require('./middlewares/postTalker');
const putTalkerId = require('./middlewares/putTalkerId');
const deleteTalker = require('./middlewares/deteleTalker');
const getTalkerSearch = require('./middlewares/getTalkerSearch');
const { tokenValidator, nameValidator, ageValidator,
  talkValidator, watchedAtValidator, rateValidator,
} = require('./middlewares/validatorInfo');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app
  .route('/talker/search')
  .get(
    tokenValidator,
    getTalkerSearch,
  );

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
  .get(talkerId)
  .put(
    tokenValidator,
    nameValidator,
    ageValidator,
    talkValidator,
    watchedAtValidator,
    rateValidator,
    putTalkerId,
  )
  .delete(
    tokenValidator,
    deleteTalker,
  );

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

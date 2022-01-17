const fs = require('fs');

const writeFileJson = (req) => {
  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const createTalk = {
    id: data.length + 1,
    ...req,
  };
  console.log(createTalk);
  data.push(createTalk);
  fs.writeFile('./talker.json', JSON.stringify(data), (err) => {
    if (err) {
      return console.log('erro');
    }
  });
  return createTalk;
};

function tokenValidator(res, authorization) {
  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
    return;
  }
  if (authorization.length < 16) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

function nameValidator(res, name) {
  if (!name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
    return;
  }
  if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
}

function ageValidator(res, age) {
  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
    return;
  }
  if (age < 18) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
}

function dataValidator(watchedAt) {
  const regExpData = /^([0-3][0-1]|[0-2]\d)\/(0[1-9]|1[0-2])\/\d{4}/;
  return regExpData.test(watchedAt);
}

function talkValidator(res, talk) {
  if (!talk || !talk.watchedAt || !talk.rate) {
    res
      .status(400)
      .json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }
}

const postTalker = (req, res) => {
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;

  tokenValidator(res, authorization);
  nameValidator(res, name);
  ageValidator(res, age);
  talkValidator(res, talk);

  if (!dataValidator(talk.watchedAt)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    return;
  }
  if (talk.rate > 5 || talk.rate < 1) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    return;
  }
  res.status(201).json(writeFileJson(req.body));
};

module.exports = postTalker;

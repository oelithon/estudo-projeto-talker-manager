const fs = require('fs');

const writeFileJson = (req) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const indexTalker = data.findIndex((pessoaId) => pessoaId.id === Number(id));

  const { name, age, talk } = req.body;
  data[indexTalker] = {
    ...data[indexTalker],
    name,
    age,
    talk,
  };

  fs.writeFile('./talker.json', JSON.stringify(data), (err) => {
    if (err) {
      return console.log('erro');
    }
  });
  return data[indexTalker];
};

const putTalkerId = (req, res) => {
  res.status(200).json(writeFileJson(req));
};

module.exports = putTalkerId;

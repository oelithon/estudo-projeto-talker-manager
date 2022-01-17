const fs = require('fs');

const writeFileJson = (req) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const indexTalker = data.findIndex((pessoaId) => pessoaId.id === Number(id));

  data.splice(indexTalker, 1);

  fs.writeFile('./talker.json', JSON.stringify(data), (err) => {
    if (err) {
      return console.log('erro');
    }
  });
};

const deleteTalker = (req, res) => {
  writeFileJson(req);
  res.status(204).end();
};

module.exports = deleteTalker;

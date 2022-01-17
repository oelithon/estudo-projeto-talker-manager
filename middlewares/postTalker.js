const fs = require('fs');

const writeFileJson = (req) => {
  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const createTalk = {
    id: data.length + 1,
    ...req,
  };
  data.push(createTalk);
  fs.writeFile('./talker.json', JSON.stringify(data), (err) => {
    if (err) {
      return console.log('erro');
    }
  });
  return createTalk;
};

const postTalker = (req, res) => {
  res.status(201).json(writeFileJson(req.body));
};

module.exports = postTalker;

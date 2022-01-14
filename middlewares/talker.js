const fs = require('fs');

const talker = (req, res) => {
  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  res.status(200).send(data);
};

module.exports = talker;

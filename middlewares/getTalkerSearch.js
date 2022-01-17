const fs = require('fs');

const getTalkerSearch = (req, res) => {
  const { q } = req.query;
  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const filteredTalker = data.filter((talker) => talker.name.includes(q));
  res.status(200).json(filteredTalker);
};

module.exports = getTalkerSearch;

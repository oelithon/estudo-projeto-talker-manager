const fs = require('fs');

const talkerId = (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const searchId = data.find((pessoaId) => pessoaId.id === Number(id));

  if (!searchId) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return;
  }

  res.status(200).json(searchId);
};

module.exports = talkerId;

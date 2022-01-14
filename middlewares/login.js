const isEmailValid = (email) => {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email) === true;
};

function validationEmailPassword(res, email, password) {
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
    return;
  }
  if (!isEmailValid(email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    return;
  }
  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
    return;
  }
  return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}

const login = (req, res) => {
  const { email, password } = req.body;
  if (isEmailValid(email) && password && password.length >= 6) {
    res.status(200).json({ token: '7mqaVRXJSp886CGr' });
    return;
  }

  validationEmailPassword(res, email, password);
};

module.exports = login;

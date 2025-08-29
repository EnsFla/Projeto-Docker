const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'chave_super_secreta';

module.exports = (req, res, next) => {
  // Tenta pegar o token do cookie ou do header Authorization Bearer
  const token = req.cookies.accessToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    console.error('Erro ao verificar token:', err.message);
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
};

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const manutencaoRoutes = require('./routes/manutencaoRoutes');
const ferramentaRoutes = require('./routes/ferramentaRoutes');

const app = express();

const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:5000', 'http://127.0.0.1:20', 'http://127.0.0.1:80'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Opcional: responde manualmente a requisições OPTIONS (preflight)
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('🚀 API ProjetoCabo está ativa!'));

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/manutencao', manutencaoRoutes);
app.use('/ferramentas', ferramentaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

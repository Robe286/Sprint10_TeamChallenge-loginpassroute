const express = require('express');
const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

const dotenv = require('dotenv');
dotenv.config();

const session = require('express-session');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');
const routes = require('./routes');

middlewares.setupApp(app);
routes.setup(app);







app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
  });
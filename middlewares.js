const bodyParser = require('body-parser');
const session = require('express-session');

const validarPalabraMiddleware = (req, res, next) => {
    const palabraCorrecta = process.env.PALABRA_SECRETA || '';
  
    if (req.body.palabra === palabraCorrecta) { // palabra escrita en el input === palabraCorrecta
      req.session.palabraSecreta = req.body.palabra;
      next();
    } else {
      res.redirect('/?error=1');
    }
};

const verificarSesionMiddleware = (req, res, next) => { 
    if (req.session.palabraSecreta) { // Creo que esto simula que se ha iniciado sesión correctamente
      next();                         // si la palabra del input = palabra secreta
    } else {
      res.redirect('/?error=2');
    }
};

const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};

module.exports = { // ESTE VA A IR EN MIDDLEWARES
    validarPalabraMiddleware,
    verificarSesionMiddleware,
    setupAPP,
  };
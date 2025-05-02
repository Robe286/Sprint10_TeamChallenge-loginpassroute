// Snippets de código para poder componer el programa

//Usado?: YES
  const middlewares = require('./middlewares');
//--- Explicación: Guardandolo en una variable, requerimos lo que hay dentro del archivo 'middlewares' para poder usarlo

// -------------------------------------------------------------------------------------

//Usado?: YES - Falta explicación
const bodyParser = require('body-parser');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: FALTA MARCAR Y COMENTARIO
const session = require('express-session');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: YES
const express = require('express');
//--- Explicación: Se requiere el módulo express para crear el servidor en node express

// -------------------------------------------------------------------------------------

//Usado?: 
const bodyParser = require('body-parser');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: YES
const session = require('express-session');
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: Usado una vez ya
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: YES
const middlewares = require('./middlewares');
//--- Explicación: requerimos todo lo que hay en el archivo middlewares para usarlo en routes.

// -------------------------------------------------------------------------------------

//Usado?: YES
const routes = require('./routes');
//--- Explicación: Guardandolo en una variable, requerimos lo que hay dentro del archivo routes para traer las rutas

// -------------------------------------------------------------------------------------

//Usado?: Usado una vez ya
dotenv.config();
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: YES
const app = express();
//--- Explicación: Creamos una constante de nombre app para inicializar el servidor con express

// -------------------------------------------------------------------------------------

//Usado?: YES
const PORT = 4000;
//--- Explicación: Creamos una variable de nombre PORT donde guardaremos el puerto que usará el servidor para escuchar

// -------------------------------------------------------------------------------------

//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación: Se requiere el módulo dotenv para cargar la variable que contiene la palabra secreta.

// -------------------------------------------------------------------------------------

//Usado?: YES
dotenv.config();
//--- Explicación: Se llama a dotenv.config() en el incio de la aplicación y ya sería accesible.

// -------------------------------------------------------------------------------------

//Usado?: YES
middlewares.setupApp(app);
//--- Explicación: En middelwares nicializamos setupAPP(app) para...

// -------------------------------------------------------------------------------------

//Usado?: YES -  Falta explicación
routes.setup(app);
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: YES
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: 


// -------------------------------------------------------------------------------------


//Usado?: YES - Falta explicación
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: 


// -------------------------------------------------------------------------------------


//Usado?: YES - Falta explicación
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: 


// -------------------------------------------------------------------------------------

//Usado?: YES - Falta explicación
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: 


// -------------------------------------------------------------------------------------

//Usado?: YES - Falta explicación
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: YES - Falta explicación
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: YES - Falta explicación
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: YES
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: Esta función inicia el servidor y hace que escuche las solicitudes entrantes en el puerto especificado PORT. Este console.log nos da información sobre su correcta escucha, visible en la terminal.

// -------------------------------------------------------------------------------------

//Usado?: YES
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: 

// -------------------------------------------------------------------------------------


//Usado?: YES - Falta explicación
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------


//Usado?: - YES - ESTE POST ES COMO UN MIDDLEWARE - revisar posición
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: YES - Falta explicación - ESTE VA A IR EN ROUTES
module.exports = {
  setup,
};
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: YES - Falta explicación - ESTE VA A IR EN MIDDLEWARES
module.exports = { 
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación:

// -------------------------------------------------------------------------------------


// Snippets de código para poder componer el programa

//Usado?: YES
  const middlewares = require('./middlewares');
//--- Explicación: Guardandolo en una variable, requerimos lo que hay dentro del archivo 'middlewares' para poder usarlo

// -------------------------------------------------------------------------------------

//Usado?: YES
const bodyParser = require('body-parser');
//--- Explicación: Se requiere este módulo para convertir los datos enviados del formulario en un objeto usable.

// -------------------------------------------------------------------------------------

//Usado?: YES
const session = require('express-session');
//--- Explicación: requiriendo este módulo podremos almacenar datos de sesion en el servidor y no en el navegador del usuario.

// -------------------------------------------------------------------------------------

//Usado?: YES
const express = require('express');
//--- Explicación: Se requiere el módulo express para crear el servidor en node express

// -------------------------------------------------------------------------------------

//Usado?: 
const bodyParser = require('body-parser');
//--- Explicación: Se requiere este módulo para convertir los datos enviados del formulario en un objeto usable.

// -------------------------------------------------------------------------------------

//Usado?: YES
const session = require('express-session');
//--- Explicación: requiriendo este módulo podremos almacenar datos de sesion en el servidor y no en el navegador del usuario.

// -------------------------------------------------------------------------------------

//Usado?: Usado una vez ya
const dotenv = require('dotenv');
//--- Explicación: Se requiere el módulo dotenv para cargar la variable que contiene la palabra secreta.


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
//--- Explicación: Se llama a dotenv.config() en el inicio de la aplicación y ya sería accesible.

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
//--- Explicación: Se llama a dotenv.config() en el inicio de la aplicación y ya sería accesible.

// -------------------------------------------------------------------------------------

//Usado?: YES
middlewares.setupApp(app);
//--- Explicación: En middelwares nicializamos setupAPP(app) para...

// -------------------------------------------------------------------------------------

//Usado?: YES -  Falta explicación
routes.setup(app);
//--- Explicación: Inicializa setup(app) en routes

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
//--- Explicación: Middleware que valida si la palabra recogida en el imput es = a la palabra secreta, si no es así redirecciona con un mensaje de error.


// -------------------------------------------------------------------------------------


//Usado?: YES
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
//--- Explicación: Cuando se inicie la aplicación si la palabra es correcta redireccióna a /profile


// -------------------------------------------------------------------------------------


//Usado?: YES
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
//--- Explicación: respuesta para mostrar el formulario al iniciar la aplicación


// -------------------------------------------------------------------------------------

//Usado?: YES
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: que guarde una nueva sesión si ha sido modificada.


// -------------------------------------------------------------------------------------

//Usado?: YES
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Ruta para procesar la sesión

// -------------------------------------------------------------------------------------

//Usado?: YES 
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: Configura el middleware bodyParse para que pueda leer los datos enviados mediante POST desde el formulario HTML

// -------------------------------------------------------------------------------------

//Usado?: YES
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: No tengo claro lo que hace

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
//--- Explicación: Simula la verificación de que ha sido exitoso el inicio de sesión, si no muestra un mensaje de error

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
//--- Explicación: se solicita información a /profile, cuando pase el middleware se visualiza el contenido de la ruta del perfil.

// -------------------------------------------------------------------------------------


//Usado?: - YES - ESTE POST ES COMO UN MIDDLEWARE
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: Cuando se pulsa log Out redirecciona a esta ruta y que borra los datos almacenados en la sesión.

// -------------------------------------------------------------------------------------

//Usado?: YES - ESTE VA A IR EN ROUTES
module.exports = {
  setup,
};
//--- Explicación: se exporta setup para poder ser usado en otros módulos

// -------------------------------------------------------------------------------------

//Usado?: YES - ESTE VA A IR EN MIDDLEWARES
module.exports = { 
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: Se exportan los middlewares para poder usarlos en las rutas y demás módulos en los que sean necesarios.

// -------------------------------------------------------------------------------------


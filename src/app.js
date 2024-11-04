const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const cors = require('cors'); // Importa cors

const app = express();
const PORT = process.env.PORT || 4000;

// Usuario y contraseña
const myUsername = 'user11';
const myPassword = 'mypassword';

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permite solo las solicitudes desde este origen
    credentials: true // Permite el uso de cookies
}));

// Configuración de la sesión
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 día
    resave: false
}));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
app.get('/', (req, res) => {
    if (req.session.userid) {
        res.send("Bienvenido, Usuario. <a href='/logout'>Cerrar sesión</a>");
    } else {
        res.sendFile(__dirname + '/views/login.html');
    }
});

app.post('/login', (req, res) => {
    if (req.body.username === myUsername && req.body.password === myPassword) {
        req.session.userid = req.body.username;
        res.send("Inicio de sesión exitoso. <a href='/logout'>Cerrar sesión</a>");
    } else {
        res.status(401).send('Usuario o contraseña inválidos');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

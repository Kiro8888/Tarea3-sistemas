// netlify/functions/login.js
const cookie = require('cookie');
const sessions = require('express-session');
const { Handler } = require('@netlify/functions');

// Configuración de la sesión en serverless
const sessionConfig = sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 día
});

exports.handler = async (event, context) => {
    const { username, password } = JSON.parse(event.body || '{}');
    const myUsername = 'user11';
    const myPassword = 'mypassword';

    if (username === myUsername && password === myPassword) {
        context.session.userid = username; // Guardar en sesión
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Inicio de sesión exitoso." }),
            headers: { 'Set-Cookie': cookie.serialize('userid', username, { path: '/', maxAge: 86400 }) },
        };
    } else {
        return { statusCode: 401, body: 'Usuario o contraseña inválidos' };
    }
};

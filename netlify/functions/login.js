// netlify/functions/login.js
const cookie = require('cookie');

exports.handler = async (event, context) => {
    const { username, password } = JSON.parse(event.body || '{}');
    const myUsername = 'user11';
    const myPassword = 'mypassword';

    if (username === myUsername && password === myPassword) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Inicio de sesión exitoso." }),
            headers: { 
                'Set-Cookie': cookie.serialize('userid', username, { path: '/', maxAge: 86400 }) 
            }
        };
    } else {
        return { statusCode: 401, body: 'Usuario o contraseña inválidos' };
    }
};

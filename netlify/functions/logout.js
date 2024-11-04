// netlify/functions/logout.js
const cookie = require('cookie');

exports.handler = async () => {
    return {
        statusCode: 200,
        headers: {
            'Set-Cookie': cookie.serialize('userid', '', { path: '/', maxAge: -1 }),
        },
        body: "Sesión cerrada exitosamente",
    };
};

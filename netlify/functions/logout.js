// En tu función de logout (Netlify Function o Express)
exports.handler = async (event) => {
    const sessionId = event.headers.cookie?.split('; ').find(row => row.startsWith('sessionId='));

    if (sessionId) {
        // Aquí deberías destruir la sesión en tu base de datos o sistema de almacenamiento
        // Por ejemplo, eliminando la sesión correspondiente a sessionId

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Logout successful' }),
        };
    }

    return {
        statusCode: 400,
        body: JSON.stringify({ message: 'No session found' }),
    };
};

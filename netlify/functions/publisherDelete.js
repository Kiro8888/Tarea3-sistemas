"use strict";

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {
  // Manejo de las peticiones OPTIONS
  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    // Conexión al cliente MongoDB
    const client = await clientPromise;

    // Obtener el ID del publisher de la URL
    const id = parseInt(event.path.split("/").reverse()[0]);

    // Eliminar el publisher de la colección "publishers"
    await client.db("bookstore").collection("publishers").deleteOne({ id: id });

    // Retornar el éxito de la operación
    return { statusCode: 200, headers, body: 'OK' };
  } catch (error) {
    // En caso de error, retornarlo en el cuerpo de la respuesta
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};

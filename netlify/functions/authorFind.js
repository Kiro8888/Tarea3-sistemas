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

    // Obtener el ID del autor de la URL
    const id = parseInt(event.path.split("/").reverse()[0]);

    // Buscar el autor en la colección "authors" por su ID
    const author = await client.db("bookstore").collection("authors").find({ id: id }).toArray();

    // Retornar los resultados
    return { statusCode: 200, headers, body: JSON.stringify(author) };
  } catch (error) {
    // En caso de error, retornarlo en el cuerpo de la respuesta
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};

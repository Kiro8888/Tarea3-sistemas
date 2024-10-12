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

    // Obtener todos los publishers de la colección "publishers"
    const publishers = await client.db("bookstore").collection("publishers").find({}).toArray();

    // Retornar los datos en formato JSON
    return { statusCode: 200, headers, body: JSON.stringify(publishers) };
  } catch (error) {
    // En caso de error, retornarlo en el cuerpo de la respuesta
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};

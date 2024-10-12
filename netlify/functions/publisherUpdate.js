"use strict";

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {
  // Manejo de peticiones OPTIONS
  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    // Conexión al cliente MongoDB
    const client = await clientPromise;

    // Extraer el ID del publisher desde la ruta
    const id = parseInt(event.path.split("/").reverse()[0]);

    // Parsear el cuerpo del evento para obtener los nuevos datos del publisher
    const data = JSON.parse(event.body);
    console.log(event.body);

    // Actualizar el publisher en la colección "publishers"
    await client.db("bookstore").collection("publishers").updateOne({ _id: id }, { $set: data });

    // Retornar una respuesta de éxito
    return { statusCode: 200, headers, body: 'OK' };
  } catch (error) {
    console.log(error);
    // En caso de error, retornar un estado 422 con el error
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};

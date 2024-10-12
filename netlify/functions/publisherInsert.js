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
    
    // Parsear el cuerpo del evento para obtener los datos del nuevo publisher
    const data = JSON.parse(event.body);

    // Asegurarse de que el ID sea un número (si estás usando IDs numéricos)
    data._id = parseInt(data._id);

    console.log(event.body);

    // Insertar el nuevo publisher en la colección "publishers"
    await client.db("bookstore").collection("publishers").insertOne(data);

    // Retornar una respuesta de éxito
    return { statusCode: 200, headers, body: 'OK' };
  } catch (error) {
    console.log(error);
    // En caso de error, retornar un estado 422 con el error
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};

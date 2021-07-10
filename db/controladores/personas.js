const Persona = require("../schemas/Persona");

const registroPersona = async (dni, nombre, apellidos, edad) => {
  const persona = await Persona.create({
    nombre,
    apellidos,
    dni,
    edad,
  });
  return persona;
};

const listarPersonas = async (dni, nombre, apellidos, edad) => {
  const persona = await Persona.find();
  return persona;
};

module.exports = {
  registroPersona,
  listarPersonas,
};

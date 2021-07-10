const { Schema, model } = require("mongoose");

const centroSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  localizacion: {
    coordenadas: [Number, Number],
    direccion: {
      type: String,
      required: true,
    },
  },
});
const PersonaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: String,
  dni: {
    type: String,
    unique: true,
    maxLength: 9,
  },
  edad: Number,
  centro: centroSchema,
  vacunaAdministrada: String,
  dosis: [Date, Date],
});

const Persona = model("Persona", PersonaSchema, "Persona");

module.exports = Persona;

const { Schema, model } = require("mongoose");

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
  centro: String,
  vacunaAdministrada: String,
  dosis: [Date, Date],
});

const Persona = model("Persona", PersonaSchema, "Persona");

module.exports = Persona;

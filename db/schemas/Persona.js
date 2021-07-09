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
  vacunas: {
    type: [Date],
    validate: [validarVacunas],
  },
});

const Persona = model("Persona", PersonaSchema, "persona");

module.exports = Persona;
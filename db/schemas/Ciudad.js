const { Schema, model } = require("mongoose");
const { VacunaSchema } = require("./Vacuna");

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
  vacunas: [VacunaSchema],
});

const CiudadSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  puntosVacunacion: [centroSchema],
});

const Ciudad = model("Ciudad", CiudadSchema, "Ciudad");

module.exports = Ciudad;

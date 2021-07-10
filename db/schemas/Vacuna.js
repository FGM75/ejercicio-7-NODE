const { Schema, model } = require("mongoose");

const VacunaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  dosis: {
    type: Number,
    required: true,
  },
});

const Vacuna = model("Vacuna", VacunaSchema, "Vacuna");
module.exports = Vacuna;

const Ciudad = require("../schemas/Ciudad");

const listarCentros = async () => {
  const centros = await Ciudad.find().select("puntosVacunacion -_id");
  return centros;
};
const buscarVacunaCentro = async (centro, vacuna) => {
  const vacunaExiste = await Ciudad.find({
    puntosVacunacion: {
      nombre: centro,
    },
  });
  return vacunaExiste;
};
module.exports = {
  listarCentros,
  buscarVacunaCentro,
};

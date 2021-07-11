const Ciudad = require("../schemas/Ciudad");

const listarCentros = async () => {
  const centros = await Ciudad.find();
  return centros;
};
const buscarCentro = async (centro) => {
  const centroExiste = await Ciudad.aggregate([
    {
      $unwind: "$puntosVacunacion",
    },
    {
      $match: {
        "puntosVacunacion.nombre": centro,
      },
    },
  ]);
  return centroExiste;
};
const modificarCentro = async (id, modificaciones) => {
  try {
    const centroCiudadModificado = await Ciudad.findOneAndUpdate(
      id,
      modificaciones
    );
    return centroCiudadModificado;
  } catch (err) {
    console.log(`Error al intentar modificar el centro: ${err.message}`);
  }
};
module.exports = {
  listarCentros,
  buscarCentro,
  modificarCentro,
};

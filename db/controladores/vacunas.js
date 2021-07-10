const { Vacuna } = require("../schemas/Vacuna");

const listarVacunas = async () => {
  const vacunas = await Vacuna.find({});
  return vacunas;
};
module.exports = { listarVacunas };

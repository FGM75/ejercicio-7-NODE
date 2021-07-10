require("./db");
const chalk = require("chalk");
const {
  listarCentros,
  buscarVacunaCentro,
} = require("./db/controladores/ciudades");
const { preguntar } = require("./questions/preguntador");
const {
  preguntasInicial,
  preguntaVacuna,
} = require("./questions/preguntas/preguntas");

const introducirVacunas = async () => {
  const { centroVacunacion, vacuna, anyadir } = await preguntar(
    await preguntaVacuna()
  );
  const vacunaValida = await buscarVacunaCentro(centroVacunacion, vacuna);
  console.log(vacunaValida);
  if (vacunaValida.length > 0) {
    console.log(
      chalk.red.bold(
        "No se ha podido introducir la vacuna a este centro, la vacuna ya está registrada!"
      )
    );
  }
  if (!anyadir) {
    return false;
  }
  await introducirVacunas();
};
const init = async () => {
  const { opcion } = await preguntar(preguntasInicial);
  if (opcion === "introducirVacunas") {
    if (!(await introducirVacunas())) {
      await init();
    }
  } else if (opcion === "introducirPersonasVacunadas") {
    const respuestaVacuna = await preguntar(await preguntaVacuna());
  } else if (opcion === "salir") {
    process.exit(0);
  }
};
init();

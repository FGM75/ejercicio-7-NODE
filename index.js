require("./db");
const chalk = require("chalk");
const {
  listarCentros,
  buscarCentro,
  modificarCentro,
} = require("./db/controladores/ciudades");
const { preguntar } = require("./questions/preguntador");
const {
  preguntasInicial,
  preguntaVacuna,
} = require("./questions/preguntas/preguntas");

const agregarVacunaCentro = async (centro, nombreCentro, vacuna) => {
  const puntosVacunacion = await centro
    .map(({ puntosVacunacion }) => puntosVacunacion)
    .map((puntoVacunacion) => {
      if (puntoVacunacion.nombre === nombreCentro) {
        if (
          !puntoVacunacion.vacunas.find((vacuna) =>
            vacuna._id.equals(vacuna._id)
          )
        ) {
          puntoVacunacion.vacunas.push(vacuna);
        } else {
          console.log(
            chalk.red.bold(
              `\nEl centro ${puntoVacunacion.nombre} ya tiene la vacuna ${vacuna.nombre}`
            )
          );
          return;
        }
      }
      return puntoVacunacion;
    });
  return puntosVacunacion;
};
const introducirVacunas = async () => {
  const { centroVacunacion, vacuna, anyadir } = await preguntar(
    await preguntaVacuna()
  );
  const ciudad = await listarCentros();
  const centro = await buscarCentro(centroVacunacion);
  const nuevoPuntoVacunacion = await agregarVacunaCentro(
    centro,
    centroVacunacion,
    vacuna
  );
  const ciudadModificada = await ciudad[0].puntosVacunacion.map((punto) => {
    if (punto.nombre === centroVacunacion) {
      return punto.push(nuevoPuntoVacunacion);
    }
    return punto;
  });
  const vacunaAgregada = await modificarCentro(
    ciudadModificada._id,
    ciudadModificada
  );
  if (vacunaAgregada) {
    console.log(
      chalk.green(
        `Se ha agregado al centro ${chalk.bold(
          centroVacunacion
        )} la vacuna ${chalk.bold(vacuna.nombre)}!`
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

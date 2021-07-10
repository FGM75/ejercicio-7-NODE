const { listarCentros } = require("../../db/controladores/ciudades");
const { listarVacunas } = require("../../db/controladores/vacunas");

const preguntasInicial = [
  {
    name: "opcion",
    message: "¿Qué desea hacer?",
    type: "list",
    choices: [
      {
        name: "Introducir vacunas",
        value: "introducirVacunas",
      },
      {
        name: "Introducir personas vacunadas",
        value: "introducirPersonasVacunadas",
      },
      {
        name: "Salir",
        value: "salir",
      },
    ],
  },
];
const preguntaVacuna = async () => {
  const centros = await listarCentros();
  const vacunas = await listarVacunas();
  return [
    {
      name: "centroVacunacion",
      message: "\n\nCentro de vacunación",
      type: "list",
      choices: centros[0].puntosVacunacion.map((centro) => ({
        name: centro.nombre,
        value: centro.nombre,
      })),
    },
    {
      name: "vacuna",
      message: "Vacuna",
      type: "list",
      choices: vacunas.map((vacuna) => ({
        name: vacuna.nombre,
        value: vacuna,
      })),
    },
    {
      name: "anyadir",
      message: "¿Añadir otra vacuna?",
      type: "confirm",
    },
  ];
};
module.exports = {
  preguntasInicial,
  preguntaVacuna,
};

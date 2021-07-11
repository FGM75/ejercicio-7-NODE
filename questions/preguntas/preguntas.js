const inquirer = require("inquirer");
const { listarCentros, buscarVacunaCentro } = require("../../db/controladores/ciudades");
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
  const ciudad = await listarCentros();
  const vacunas = await listarVacunas();
  return [
    {
      name: "centroVacunacion",
      message: "\n\nCentro de vacunación",
      type: "list",
      choices: ciudad[0].puntosVacunacion.map((centro) => ({
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

const preguntaDNI = async (persona) => {
  const centros = await listarCentros();
  const preguntarDNI = await inquirer.prompt([
    {
      name: "dni",
      message: "Por favor inidique su DNI:",
      type: "input",
    },
    {
      name: "elegirCentroVacunacion",
      message: "¿En que centro ha sido o sera vacunado?:",
      type: "list",
      choices: centros[0].puntosVacunacion.map((centro) => ({
        name: centro.nombre,
        value: centro._id,
    }))
    },
  ]);
};



  module.exports = {
  preguntasInicial,
  preguntaVacuna,
  preguntaDNI,
  
};

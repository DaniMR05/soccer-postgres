const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

// Ruta de bienvenida
router.get('/', (req, res) => res.send('Welcome to Soccer Teams API'));

// Crear un nuevo equipo
router.post('/teams', controllers.createTeam);

// Obtener todos los equipos
router.get('/teams', controllers.getAllTeams);

// Actualizar un equipo
router.put('/teams/:id', controllers.updateTeam);

// Eliminar un equipo
router.delete('/teams/:id', controllers.deleteTeam);

// Obtener un equipo por su ID
router.get('/teams/:id', controllers.getTeamById);


module.exports = router;

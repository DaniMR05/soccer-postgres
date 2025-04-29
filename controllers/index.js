const models = require("../database/models");

const createTeam = async (req, res) => {
  try {
    const team = await models.Team.create(req.body);
    return res.status(201).json({
      team
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllTeams = async (req, res) => {
  console.log('Getting teams');
  try {
    const teams = await models.Team.findAll({
      include: []
    });
    return res.status(200).json({ teams });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteTeam = async (req, res) => {
   console.log('Deleting team...');

   try {
      const team = await models.Team.findOne({ where: { id: req.params.id } });
      if (team) {
         console.log(team);
         await team.destroy(); // elimina el registro de la base de datos
      } else {
         return res.status(200).json({ "error": req.params.id + " no existe" });
      }
      return res.status(200).json({ "deleted": req.params.id });
   }
   catch (error) {
      return res.status(500).send({ error: error.message });
   }
};

// Actualizar un equipo
const updateTeam = async (req, res) => {
   console.log('Updating team...');

   try {
      const team = await models.Team.findOne({ where: { id: req.params.id } });
      if (team) {
         console.log(team);
         team.name = req.body.name;
         team.city = req.body.city;
         team.country = req.body.country;
         team.stadium = req.body.stadium;
         team.foundedYear = req.body.foundedYear;
         team.localTrophies = req.body.localTrophies;
         team.nationalTrophies = req.body.nationalTrophies;
         await team.save(); // guarda los cambios
      } else {
         return res.status(200).json({ "error": req.params.id + " no existe" });
      }
      return res.status(200).json({ "updated": team });
   }
   catch (error) {
      return res.status(500).send({ error: error.message });
   }
};

const getTeamById = async (req, res) => {
    console.log('Getting team by ID...');
    try {
        const team = await models.Team.findOne({ where: { id: req.params.id } });
        if (team) {
            return res.status(200).json(team);
        } else {
            return res.status(404).json({ error: "Equipo no encontrado" });
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


module.exports = {
   createTeam,
   getAllTeams,
   getTeamById,
   deleteTeam,
   updateTeam
};
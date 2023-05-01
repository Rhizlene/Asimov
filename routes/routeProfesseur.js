const express = require('express');
const ctrlProfesseurs = require('../controllers/professeurController');
const crtlAuth = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const routeur = express.Router();

// Middleware pour définir res.locals.jwtData
routeur.use((req, res, next) => {
    const token = req.cookies.accessToken;
    if (token) {
      const decodedToken = jwt.decode(token);
      const jwtData = {
        user: decodedToken.user,
        identifiant: decodedToken.identifiant,
        roles: decodedToken.roles,
        classe: decodedToken.classe
      };
      res.locals.jwtData = jwtData;
    }
    next();
  });

  

routeur.get('/', crtlAuth.authorize(3), ctrlProfesseurs.getProfesseurs);
routeur.post('/ajouterProfesseur', crtlAuth.authorize(3), ctrlProfesseurs.addProfesseur);
routeur.get('/modifierProfesseur/:id', crtlAuth.authorize(3), ctrlProfesseurs.getOneProfesseur);
routeur.post('/modifierProfesseur/:id', crtlAuth.authorize(3), ctrlProfesseurs.updateProfesseur);
routeur.get('/supprimerProfesseur/:id', crtlAuth.authorize(3), ctrlProfesseurs.deleteProfesseur);

module.exports = routeur 
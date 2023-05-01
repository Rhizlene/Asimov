const express = require('express');
const ctrlClasses = require('../controllers/classesController');
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

routeur.get('/professeur', crtlAuth.authorize(2),ctrlClasses.getClasses);
routeur.get('/proviseur', crtlAuth.authorize(3),ctrlClasses.getClasses);
routeur.post('/ajouterClasse', crtlAuth.authorize(3), ctrlClasses.addClasse);
routeur.get('/modifierClasse/:id',crtlAuth.authorize(3), ctrlClasses.updateClasse);
routeur.post('/modifierClasse/:id', crtlAuth.authorize(3),ctrlClasses.updateClasse);
routeur.get('/supprimerClasse/:id', crtlAuth.authorize(3),ctrlClasses.deleteClasse);

module.exports = routeur 
const express = require('express');
const ctrlMatiere = require('../controllers/matiereController');
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

  
routeur.get('/', crtlAuth.authorize(3),ctrlMatiere.getMatiere);
routeur.post('/ajouterMatiere', crtlAuth.authorize(3),ctrlMatiere.addMatiere);
routeur.get('/supprimerMatiere/:id', crtlAuth.authorize(3),ctrlMatiere.deleteMatiere);

module.exports = routeur 
const express = require('express');
const ctrlEleve = require('../controllers/ElevesController');
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

routeur.get('/', crtlAuth.authorize([3,2]),ctrlEleve.getEleves);
routeur.get('/afficherUneClasse/:id',crtlAuth.authorize([2,3]), ctrlEleve.getElevesClasse);
routeur.post('/ajouterEleve', crtlAuth.authorize([2,3]),ctrlEleve.addEleve);
routeur.get('/modifierEleve/:id', crtlAuth.authorize(3),ctrlEleve.getOneEleve);
routeur.post('/modifierEleve/:id', crtlAuth.authorize(3),ctrlEleve.updateEleve);
routeur.get('/supprimerEleve/:id', crtlAuth.authorize(3),ctrlEleve.deleteEleve);

module.exports = routeur 
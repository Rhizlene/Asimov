const express = require('express');
const ctrlNote = require('../controllers/notesController');
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

routeur.get('/mesNotes', crtlAuth.authorize(1), ctrlNote.controllerNotes.redirectionNoteEleve);
routeur.get('/notesEleve/:id', crtlAuth.authorize(1), ctrlNote.controllerNotes.affichageNote);

module.exports = routeur;
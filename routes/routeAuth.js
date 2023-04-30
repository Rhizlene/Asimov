// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();
const { controlAuth, authorize } = require('../controllers/authController');

routeur.post('/', controlAuth.Authentification)


routeur.get('/', (req, res) => {
    res.render('index');
  });
  
  routeur.get('/auth', (req, res) => {
    res.render('auth');
  });
  
  routeur.post('/auth', controlAuth.Authentification);
  
  routeur.get('/accueil', controlAuth.Accueil);
  
  routeur.get('/logout', controlAuth.logout);
  



// route protégée par JWT
// routeur.post('/accueil', authorize, controlAuth.Authentification );

module.exports = routeur;



// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();
const { controlAuth, authorize } = require('../controllers/authController');

routeur.post('/', controlAuth.Authentification)

// Votre route protégée par JWT
routeur.post('/accueil', controlAuth.Authentification, authorize('2'));

module.exports = routeur;



// // Route pour la déconnexion
// router.get('/logout', (req, res) => {
//   res.clearCookie('accessToken');
//   res.redirect('/');
// });


// inclure les dépendances et middlewares
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const port = 4000

// activer les dépendances pour Express et EJS
let app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))


app.use(express.json());
app.use(express.urlencoded());
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.listen(port, () => console.log('le serveur Asimov est prêt.'))

// utiliser les routeurs
app.get('/', (req, res) => {
    res.send('Asimov est actif');
});

//Afficher page accueil
app.get('/accueil', function(req, res) {
    res.render('accueil');
});


// Importer les routes
const routeAuth = require('./routes/routeAuth');


// Afficher la page connexion
app.get('/auth', function(req, res) {
    res.render('auth');
});


// utiliser les routes
app.use('/Auth', routeAuth);


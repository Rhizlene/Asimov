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
const cookieParser = require('cookie-parser');


app.use(cookieParser());

app.listen(port, () => console.log('le serveur Asimov est prêt.'))

// Afficher la page connexion
app.get('/', (req, res) => {
    res.render('auth');
});


// Importer les routes
const routeAuth = require('./routes/routeAuth');
const routeNotes = require('./routes/routeNotes');
const routeClasses = require('./routes/routeClasses');
const routeEleves = require('./routes/routeEleves');
const routeMatieres = require('./routes/routeMatiere');
const routeProfesseurs = require('./routes/routeProfesseur');


// utiliser les routes
app.use('/', routeAuth);
app.use('/notes', routeNotes);
app.use('/classes', routeClasses);
app.use('/eleves', routeEleves);
app.use('/matieres', routeMatieres);
 app.use('/professeurs', routeProfesseurs);



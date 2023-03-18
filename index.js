// inclure les dépendances et middlewares
const express = require('express');
const ejs = require('ejs');
const path = require('path');

// activer les dépendances pour Express et EJS
let app = express()
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.static('public'))

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// activer le middleware et lancer l'application sur le port 3000

app.listen(4000, () => console.log('le serveur Asimov est prêt.'))


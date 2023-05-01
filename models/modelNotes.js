// inclure les dépendances et middlewares
const mysql = require('mysql2');
let iniparser = require('iniparser');
const bodyparser = require('body-parser');
const { urlencoded } = require('body-parser');
const auth = require('../controllers/authController');

// activer les dépendances pour la bdd
let configDB = iniparser.parseSync('./DB.ini')
let mysqlconnexion = mysql.createConnection({
    host:configDB['dev']['host'],
    user:configDB['dev']['user'],
    password:configDB['dev']['password'],
    database:configDB['dev']['database']
})

mysqlconnexion.connect((err) => {
    if (!err) console.log('BDD connectée. ================================================================')
    else console.log('BDD connexion échouée \n Erreur: '+JSON.stringify(err))
})

const Notes = {

    async afficherNotesEleve(req, res){

        let id = req.params.id

        let requeteSQL = "SELECT matiere.nom_matiere, note.id_note, note.note FROM eleve INNER JOIN Note ON eleve.id_eleve = note.idEleve_note INNER JOIN matiere ON note.id_matiere = matiere.id_matiere WHERE eleve.id_eleve = ? ORDER BY matiere.nom_matiere"
        res.cookie('id', id)

        

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    //Fonction pour tous les utilisateurs : permet d'afficher la moyenne générale d'un élève
    
    async moyenneGenerale(req){

        let id = req.params.id
        let requeteSQL = "SELECT ROUND(AVG(note.note), 2) AS moyenne_generale FROM note WHERE note.idEleve_note = ?"
        
        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    }

//     //Fonction pour le principal ou les professeurs : permet d'afficher une note en particulier
//     async afficherUneNote(req) {

//         let id = req.params.id
//         let requeteSQL = "SELECT * FROM note WHERE note_Id = ?"

//         return new Promise((resolve, reject) => {

//             mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

//                 if (error) {

//                     return reject(error)

//                 }

//                 return resolve(elements)

//             })
//         })
//     },

//     //Fonction pour le principal ou les professeurs : permet d'ajouter une note à un élève
//     async ajouterNote(req){

//         let eleve = req.cookies.idEleve
//         let matiere = req.body.matiere
//         let valeur = req.body.valeur
//         let requeteSQL = "INSERT INTO note (note_IdEleve, note_IdMatiere, note_Valeur) VALUES(?,?,?)"

//         return new Promise((resolve, reject)=>{

//             mysqlconnexion.query(requeteSQL, [eleve, matiere, valeur], (err, lignes, champs) => {

//                 if(err){

//                     return reject(err)

//                 }

//                 return resolve(lignes)

//             })
//         })
//     },

//     //Fonction pour le principal ou les professeurs : permet de supprimer une note à un élève
//     async supprimerNote(req){

//         let id = req.params.id
//         let requeteSQL = "DELETE FROM note WHERE note_Id = ?"

//         return new Promise((resolve, reject)=>{

//             mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

//                 if(err){

//                     return reject(err)

//                 }

//                 return resolve(lignes)

//             })
//         })
//     },

//     //Fonction pour le principal ou les professeurs : permet de modifier une note d'un élève
//     async modifierNote(req){

//         let id = req.params.id
//         let valeur = req.body.valeur
//         let requeteSQL = "UPDATE note SET note_Valeur = ? WHERE note_Id = ?"

//         return new Promise((resolve, reject)=>{

//             mysqlconnexion.query(requeteSQL, [valeur, id], (err, lignes, champs) => {

//                 if(err){

//                     return reject(err)

//                 }

//                 return resolve(lignes)

//             })
//         })
//     }
}

module.exports = {

    Notes
}
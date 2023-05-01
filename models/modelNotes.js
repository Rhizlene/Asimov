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

    async getNotesEleve(req, res){

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
    },


 async getOneNote(req) {

    let id = req.params.id
    let requeteSQL = "SELECT * FROM note WHERE id_note = ?"

    res.cookie('idClasse', id)

    return new Promise((resolve, reject) => {

        mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

            if (error) {

                return reject(error)

            }

            return resolve(elements)

        })
    })
},

async addNote(req){
    let id = req.params.idEleve;
    let matiere = req.body.matiere;
    let valeur = req.body.valeur;

    if (!id) {
      throw new Error("L'id de l'élève est manquant.");
    }

    let requeteSQL = "INSERT INTO note (idEleve_note , id_matiere , note) VALUES(?,?,?)";

    const parametres = [idEleve, idMatiere, note];
  
    return new Promise((resolve, reject) => {
      mysqlconnexion.query(requeteSQL, parametres, (err, resultats) => {
        if (err) {
          reject(err);
        } else {
          resolve(resultats);
        }
      });
    });
  },

async deleteNote(req){

    let id = req.params.id
    let requeteSQL = "DELETE FROM note WHERE id_note = ?"

    return new Promise((resolve, reject)=>{

        mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

            if(err){

                return reject(err)

            }

            return resolve(lignes)

        })
    })
},

async updateNote(req){

    let id = req.params.id
    let valeur = req.body.valeur
    let requeteSQL = "UPDATE note SET note = ? WHERE id_note = ?"

    return new Promise((resolve, reject)=>{

        mysqlconnexion.query(requeteSQL, [valeur, id], (err, lignes, champs) => {

            if(err){

                return reject(err)

            }

            return resolve(lignes)

        })
    })
}


}

module.exports = {

    Notes
}
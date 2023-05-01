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

const Professeurs = {

    async getProfesseurs() {

        let requeteSQL = "SELECT * FROM personnel ORDER BY nom_perso"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    async getMatieresProfesseurs() {

        let requeteSQL = "SELECT * FROM personnel LEFT JOIN matiere ON personnel.id_perso = matiere.idProfesseur_matiere ORDER BY personnel.nom_perso"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    async getOneProfesseur(req){

        let id = req.params.id
        let requeteSQL = "SELECT * FROM personnel WHERE id_perso = ?"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [id], (err, lignes) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

     async addProfesseur(req){

        let nom = req.body.nom
        let prenom = req.body.prenom
        let mdp = req.body.mdp
        let requeteSQL = "INSERT INTO personnel (personnel.nom_perso, personnel.prenom_perso, personnel.mdp, personnel.role) VALUES(?,?, ?, 2)"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [nom, prenom, mdp], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    async deleteProfesseur(req){ 
        
        let id = req.params.id
        let requeteSQL = "DELETE FROM personnel WHERE id_perso = ?"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    async updateProfesseur(req){

        let id = req.params.id
        let nom = req.body.nom
        let prenom = req.body.prenom
        let requeteSQL = "UPDATE personnel SET nom_perso = ?, prenom_perso = ? WHERE id_perso = ?"
        
        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [nom, prenom, id], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    }
}

module.exports = {

    Professeurs
}
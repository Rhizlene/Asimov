// inclure les dépendances et middlewares
const mysql = require('mysql2');
let iniparser = require('iniparser');
const bodyparser = require('body-parser');
const { urlencoded } = require('body-parser');

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


const Matieres = {

    async getMatieres(){

        let requeteSQL = "SELECT * FROM matiere LEFT JOIN personnel ON matiere.idProfesseur_matiere = personnel.id_perso ORDER BY matiere.nom_matiere"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })

    },

    async getMatiereProfesseur(req){

        let idProf = req.cookies.id
        let requeteSQL = "SELECT * FROM matiere WHERE matiere.idProfesseur_matiere = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [idProf], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })

    },

    async addMatiere(req){

        let nom = req.body.nom
        let professeur = req.body.professeur
        let requeteSQL = "INSERT INTO matiere (matiere.nom_matiere, matiere.idProfesseur_matiere) VALUES(?,?)"

        return new Promise((resolve, reject)=>{

            if(professeur){

                mysqlconnexion.query(requeteSQL, [nom, professeur], (err, lignes, champs) => {

                    if(err){

                        return reject(err)

                    }

                    return resolve(lignes)

                })
            
            }else{

                mysqlconnexion.query(requeteSQL, [nom, null], (err, lignes, champs) => {

                    if(err){

                        return reject(err)

                    }

                    return resolve(lignes)

                })
            }
        })
    },

    async deleterMatiere(req){

        let id = req.params.id
        let requeteSQL = "DELETE FROM matiere WHERE matiere_Id = ?"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },
}

module.exports = {

    Matieres
}
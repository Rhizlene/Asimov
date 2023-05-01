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

const Classes = {

    async getClasses(){

        let requeteSQL = "SELECT * FROM classe ORDER BY nom_classe"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })

    },

    async getOneClasse(req){

        let id = req.params.id
        let requeteSQL = "SELECT * FROM classe WHERE classe.id_classe = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    async addClasse(req){

        let nom = req.body.nom
        let requeteSQL = "INSERT INTO classe (classe.nom_classe) VALUES(?)"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [nom], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    async deleteClasse(req){

        let id = req.params.id
        let requeteSQL = "DELETE FROM classe WHERE classe.id_classe = ?"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    async updateClasse(req){

        let nom = req.body.nom
        let requeteSQL = "UPDATE classe SET nom_classe = ?"
        
        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [nom], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    }
}

module.exports = {

    Classes
}
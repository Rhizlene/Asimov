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

const Eleves = {

   async getEleves(){

        let requeteSQL = "SELECT * FROM eleve ORDER BY eleve.nom_eleve"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })

    },

    async getOneEleve(req) {

        let id = req.params.id
        let requeteSQL = "SELECT * FROM eleve INNER JOIN classe ON eleve.id_classe = classe.id_classe WHERE eleve.id_eleve = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [id], (error, elements) => {

                if (error) {

                    return reject(error)

                }

                return resolve(elements)

            })
        })
    },

    async getElevesClasse(idClasse) {
        
        let requeteSQL = "SELECT * FROM eleve WHERE eleve.id_classe = ? ORDER BY eleve.nom_eleve"
    
        return new Promise((resolve, reject) => {
            mysqlconnexion.query(requeteSQL, [idClasse], (error, elements) => {
                console.log('gfgd',idClasse)
                if (error) {
                    return reject(error)
                }
                return resolve(elements)
            })
        })
    },
     async addEleve(req){

        let nom = req.body.nom
        let prenom = req.body.prenom
        let classe = req.body.classe
        let requeteSQL = "INSERT INTO eleve (eleve.nom_eleve, eleve.prenom_eleve, eleve.id_classe) VALUES(?,?,?)"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [nom, prenom, classe], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    async deleteEleve(req){

        let id = req.params.id
        let requeteSQL = "DELETE FROM eleve WHERE eleve.id_eleve = ?"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [id], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    },

    async updateEleve(req){

        let id = req.params.id
        let nom = req.body.nom
        let prenom = req.body.prenom
        let classe = req.body.classe
    
        let requeteSQL = "UPDATE eleve SET eleve.nom_eleve = ?, eleve.prenom_eleve = ?,  eleve.id_classe = ? WHERE eleve.id_eleve = ?"

        return new Promise((resolve, reject)=>{

            mysqlconnexion.query(requeteSQL, [nom, prenom, classe, id], (err, lignes, champs) => {

                if(err){

                    return reject(err)

                }

                return resolve(lignes)

            })
        })
    }
}

module.exports = {

    Eleves
}
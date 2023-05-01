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

const authAsimov = {

    async AuthPersonnel(req) {

        let identifiant = req.body.identifiant
        let mdp = req.body.mdp

        let requete = "SELECT *, COUNT(*) FROM personnel WHERE CONCAT(nom_perso, '.', prenom_perso) = ? AND mdp = ?"

        return new Promise((reussi, echec) => {

            mysqlconnexion.query(requete, [identifiant, mdp] , (err, lignes, champs) => {

                if (err) {

                    return echec(err)

                }

                return reussi(lignes)

            })
        })
    },

    async AuthEleve(req){

        let identifiant = req.body.identifiant
        let mdp = req.body.mdp
        let requeteSQL = "SELECT *, COUNT(*) FROM eleve WHERE CONCAT(nom_eleve, '.', prenom_eleve) = ? AND mdp = ?"

        return new Promise((resolve, reject) => {

            mysqlconnexion.query(requeteSQL, [identifiant, mdp],(err, lignes) => {

                if(err){

                    return reject(err)

                }
                
                return resolve(lignes)

            })
        })
    }
}



module.exports = {
    authAsimov
}


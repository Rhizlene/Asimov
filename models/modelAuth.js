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

    async Auth(req) {

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
    }
}

module.exports = {
    authAsimov
}

//SELECT *, CONCAT(nom_perso, '.', prenom_perso) AS identifiant, mdp 
// FROM personnel 
// HAVING identifiant = 'alfardous.rhizlene' AND mdp = 'root'
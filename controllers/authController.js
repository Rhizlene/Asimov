const authModel = require("../models/modelAuth");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;


const controlAuth = {

    async Authentification(req, res) {
        let message = null;

        try {

            const dataP = await authModel.authAsimov.AuthPersonnel(req);
            const dataE = await authModel.authAsimov.AuthEleve(req);
            
            const isPersonnel = dataP[0]['COUNT(*)'] == 1;
            const isEleve = dataE[0]['COUNT(*)'] == 1;
            const identifiant = req.body.identifiant;

            if (!isPersonnel && !isEleve) {
                // Identifiant ou mot de passe incorrect
                errorMessage = "Identifiant ou mot de passe incorrect";
            }
           
            //opérateur ternaire pour assigner une valeur à la variable roles en fonction de la valeur des variables isPersonnel et isEleve
            //(condition) ? valeur_si_vrai : valeur_si_faux
            const roles = isPersonnel ? dataP[0]['role'] : isEleve ? dataE[0]['role'] : null;
            
            if (isPersonnel || isEleve) {
              // Générer un JWT contenant l'identifiant et les rôles de l'utilisateur
              const accessToken = jwt.sign({ identifiant, roles }, ACCESS_TOKEN_SECRET);
              res.cookie('accessToken', accessToken);
              const decodedToken = jwt.decode(accessToken);
              console.log(decodedToken);
              const jwtData = { identifiant, roles };
              res.locals.jwtData = jwtData;
              return res.render('accueil', { jwtData : jwtData });
            } else {
              message = "Identifiant ou mot de passe incorrect";
              return res.render('auth', { message: message });
            }
        } catch (error) {
            console.log(error);
            return res.redirect("auth");
        }
    },

    async getAuthPage(req, res) {
        return res.render('auth');
    },

    Accueil(req, res) {

        try {
            const token = req.cookies.accessToken;
            const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
            const jwtData = { identifiant: decodedToken.identifiant, roles: decodedToken.roles };
            return res.render('accueil', { jwtData });
        } catch (error) {
            console.log(error);
            return res.redirect("auth");
        }
    },

    logout(req, res) {
        res.clearCookie('accessToken');
        return res.redirect('/');
    }
};

// vérifier les rôles de l'utilisateur à partir du JWT
const authorize = (roles) => {
    console.log('authorize', roles);
    return (req, res, next) => {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.redirect("auth");
        }

        try {
            const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

            if (!decodedToken.roles.includes(roles)) {
                return res.status(401).send('Unauthorized');
            }
            console.log('authentifier');
            next();
        } catch (error) {
            console.log(error);
            return res.status(403).send('Forbidden');
        }
    };
};

module.exports = {
    controlAuth,
    authorize
};
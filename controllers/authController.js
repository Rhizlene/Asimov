const authModel = require("../models/modelAuth");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;


const controlAuth = {

    

    async Authentification(req, res) {

        try {
            
            const data = await authModel.authAsimov.Auth(req);

            if (data[0]['COUNT(*)'] == 1) {
                // generer access token
                const identifiant = req.body.identifiant;
                const roles = data[0]['role_perso'];
                console.log(roles)
          
          
                // Générer un JWT contenant l'identifiant et les rôles de l'utilisateur
              
                const accessToken = jwt.sign({ identifiant, roles }, ACCESS_TOKEN_SECRET);
                res.cookie('accessToken', accessToken);
                const decodedToken = jwt.decode(accessToken);
                console.log(decodedToken);
                res.render('accueil', { req: req, res: res })

            }else {
                res.redirect("auth")
            } 
        } catch (error) {
            console.log(error)
        }
    }
}

// vérifier les rôles de l'utilisateur à partir du JWT
const authorize = (roles) => {
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

            next();
        } catch (error) {
            console.log(error);
            return res.status(403).send('Forbidden');
        }
    }
};

module.exports = {
    controlAuth,
    authorize
}
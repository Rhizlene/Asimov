const modelEleves = require('../models/modelEleves');
const modelClasses = require('../models/modelClasse');
const authConfig = require('../controllers/authController');

const controllerEleve = {
	
	async getEleves(req, res){

		
			try{

				const data1 = await modelEleves.Eleves.getEleves()
				const data2 = await modelClasses.Classes.getClasses()
                const jwtData = res.locals.jwtData;

				if(data1){
					
					res.render("eleves", { dataEleve:data1, dataClasse:data2, role: jwtData.roles})
				
				}else{

					res.render("erreur", {role: jwtData.roles})
				}

			}catch(error){

				console.log(error)
			}
		
	
	},

    async getElevesClasse(req, res) {
        try {
            const idClasse = req.params.idClasse; // Extraire l'id de la classe de l'URL
            const data1 = await modelEleves.Eleves.getElevesClasse(idClasse);
            const jwtData = res.locals.jwtData;
    
            if (data1) {
                res.render("afficherUneClasse", { role: jwtData.roles, dataClasse: data1, idClasse });
            } else {
                res.render("erreur", { role: jwtData.roles });
            }
    
        } catch (error) {
            console.log(error);
        }
    },

     async getOneEleve(req, res){

		
			try {

				const data = await modelEleves.Eleves.getOneEleve(req)
				const data2 = await modelClasses.Classes.getClasses()
                const jwtData = res.locals.jwtData;
				if(data){
	
					res.render("modifierEleves", {dataEleve: data, dataClasse:data2})
	
				}else{
	
					res.render("erreur", {role: jwtData.roles})
				}
	
			} catch (error) {
	
				console.log(error)
			}
		
	},

async addEleve(req, res){

	
			try {

				const data = await modelEleves.Eleves.addEleve(req)
                const jwtData = res.locals.jwtData;
				if(data){
	
					res.redirect("/eleves/afficherUneClasse/" + req.cookies.idClasse)
	
				}else{
	
					res.render("erreur", {role: jwtData.roles})
				}
	
			} catch (error) {
	
				console.log(error)
			}
	
	},

	async deleteEleve(req, res){

		
			try {

				const data = await modelEleves.Eleves.deleteEleveEleve(req)
                const jwtData = res.locals.jwtData;
				if(data){
	
					res.redirect("/eleves");
	
				}else{
	
					res.render("erreur", {role: jwtData.roles})
				}
	
			} catch (error) {
	
				console.log(error)
			}
		
		
	},

	 async updateEleve(req, res){

			try {

				const data = await modelEleves.Eleves.updateEleve(req)
                const jwtData = res.locals.jwtData;
				if(data){
	
					res.redirect("/eleves");
	
				}else{
	
					res.render("erreur", {role: jwtData.roles})
				}
	
			} catch (error) {
	
				console.log(error)
			}
		
	
	}
}
module.exports = controllerEleve
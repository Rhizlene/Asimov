const modelClasses = require('../models/modelClasse');
const authConfig = require('../controllers/authController');

const controllerClasse = {
	
	async getClasses(req, res){

		
			try{

				const data1 = await modelClasses.Classes.getClasses()
				// const data2 = await modelProfesseurs.Professeurs.afficherProfesseurs()
                const jwtData = res.locals.jwtData;

				if(data1){
					
					res.render("classes", {dataClasse:data1, role: jwtData.roles})
				
				}else{

					res.render("accueil")
				}

			} catch (error) {

				console.log(error)
			}
		
		
	},

	async getOneClasse(req, res){

			
			try{

				const data1 = await modelClasses.Classes.getOneClasse(req)
				// const data2 = await modelProfesseurs.Professeurs.afficherProfesseurs()

				if(data1){
					
					res.render("modifierClasses", {dataClasse:data1, role: jwtData.roles})
				
				}else{

					res.render("accueil")
				}

			} catch (error) {

				console.log(error)
			}
		
	},

	async addClasse(req, res){

			try {

				const data = await modelClasses.Classes.addClasse(req)

				if(data){

					res.redirect("/classes/proviseur");

				}else{

					console.log("champs incorrects")
					res.redirect("/classes");
				}

			} catch (error) {

				console.log(error)
			}

	},

async deleteClasse(req, res){

			try {

				const data = await modelClasses.Classes.deleteClasse(req)
	
				if(data){
	
					res.redirect("/classes/proviseur");
	
				}else{
	
					console.log("champs incorrects")
					res.redirect("/classes/proviseur");
				}
	
			} catch (error) {
	
				console.log(error)
			}

	},

	async updateClasse(req, res){

			try {

				const data = await modelClasses.Classes.updateClasse(req)
                
	
				if(data){
	
					res.redirect("/classes/proviseur");
	
				}else{
	
					res.redirect("/classes/modifierClasse/" + req.params.id);
				}
	
			} catch (error) {
	
				console.log(error)
			}

	}
}

module.exports = controllerClasse
const modelProfesseur = require('../models/modelProfesseur');
const modelMatiere = require('../models/modelMatieres');
const authConfig = require('../controllers/authController');



const controllerProfesseur = {
	
	async getProfesseurs(req, res){

		
			try{

				const data1 = await modelProfesseur.Professeurs.getProfesseurs()
                const jwtData = res.locals.jwtData;

				if(data1){
					
					res.render("professeurs", {role: jwtData.roles , dataTotale:data1})
				
				}else{

					res.render("erreur", {role: jwtData.roles })
				}

			} catch (error) {

				console.log(error)
			}
		

	},

	 async getOneProfesseur(req, res){

		
			try{

				const data1 = await modelProfesseur.Professeurs.getOneProfesseur(req)
				const data2 = await modelMatiere.Matieres.getMatieres()
                const jwtData = res.locals.jwtData;

				if(data1){
					
					res.render("updateProf", {dataProfesseur: data1, dataMatiere:data2, role: jwtData.roles})
				
				}else{

					res.render("erreur", {role: jwtData.roles })
				}

			} catch (error) {

				console.log(error)
			}
		
	
	},

	async addProfesseur(req, res){

			try{

				const data = await modelProfesseur.Professeurs.addProfesseur(req)
                const jwtData = res.locals.jwtData;

				if(data){
					
					res.redirect("/professeurs");
				
				}else{

					res.render("erreur", {role: jwtData.roles })
				}

			} catch (error) {

				console.log(error)
			}
		
		
	},

	async deleteProfesseur(req, res){

		
			try{

				const data = await modelProfesseur.Professeurs.deleteProfesseur(req)
                const jwtData = res.locals.jwtData;
				if(data){
					
					res.redirect("/professeurs");
				
				}else{

					res.render("erreur", {role: jwtData.roles })
				}

			} catch (error) {

				console.log(error)
			}
		
		
	},

	 async updateProfesseur(req, res){

		
			try{

				const data = await modelProfesseur.Professeurs.updateProfesseur(req)
                const jwtData = res.locals.jwtData;
				if(data){
					
					res.redirect("/professeurs");
				
				}else{

					res.render("erreur", {role: jwtData.roles })
				}

			} catch (error) {

				console.log(error)
			}
		
		
	}
}

module.exports = controllerProfesseur
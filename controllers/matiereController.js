const modelMatiere = require('../models/modelMatieres');
const modelProfesseurs = require('../models/modelProfesseur');
const authConfig = require('../controllers/authController');

const controllerClasse = {

	async getMatiere(req, res){

		
			try{

				const data1 = await modelMatiere.Matieres.getMatieres()
				const data2 = await modelProfesseurs.Professeurs.getProfesseurs()
                const jwtData = res.locals.jwtData;

				if(data1){
					
					res.render("matieres", {dataMatiere:data1, role: jwtData.roles, dataProfesseur:data2 })
				
				}else{

					res.render("erreur", {role: jwtData.roles})
				}

			}catch(error){

				console.log(error)
			}
		
	
	
	},

	async getOneMatiere(req, res){

		
			try{

				const data1 = await modelMatiere.Matieres.getMatiereProfesseur(req)
				const data2 = await modelProfesseurs.Professeurs.getProfesseurs()

                const jwtData = res.locals.jwtData;
			
				if(data1){
					
					res.render("modifierMatieres", {dataMatiere:data1, role: jwtData.roles, dataProfesseur:data2 })
				
				}else{

					res.render("erreur", {role: jwtData.roles})
				}

			}catch(error){

				console.log(error)
			}
		
	
	},

	async addMatiere(req, res){

			try{

				const data = await modelMatiere.Matieres.addMatiere(req)
                const jwtData = res.locals.jwtData;
				if(data){
					
					res.redirect("/matieres");
				
				}else{

					res.render("erreur", {role: jwtData.roles})
				}

			}catch(error){

				console.log(error)
			}
		
	},

	async deleteMatiere(req, res){


			try{

				const data = await modelMatiere.Matieres.deleterMatiere(req)
                const jwtData = res.locals.jwtData;

				if(data){
					
					res.redirect("/matieres");
				
				}else{

					res.render("erreur", {role: jwtData.roles})
				}

			} catch(error){

				console.log(error)
			}
		
	
	}
}

module.exports = controllerClasse

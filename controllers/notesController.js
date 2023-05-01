
const modelNote = require('../models/modelNotes');
const authConfig = require('../controllers/authController');
const modelMatiere = require('../models/modelMatieres');


const controllerNotes = {

    async getNote(req, res) {

        try {
				
            const data1 = await modelNote.Notes.getNotesEleve(req, res)
			const data2 = await modelMatiere.Matieres.getMatieres()
            const data3 = await modelNote.Notes.moyenneGenerale(req)
			const data4 = await modelMatiere.Matieres.getMatiereProfesseur(req)
            const jwtData = res.locals.jwtData;

            if (data1) {
                res.render("releve_notes", { dataNotes: data1, dataMatieres:data2, dataMoyenne:data3, dataMatieres2:data4,role: jwtData.roles, id: jwtData.user })
            } else {
                res.render("erreur", { role: jwtData.roles})
            }

        } catch (error) {
            console.log(error)
        }

    },

    async redirectionNoteEleve(req, res) {

        const jwtData = res.locals.jwtData;
        console.log('jwtdata :' , jwtData)

        if (jwtData) {
            res.redirect("/notes/notesEleve/" + jwtData.user);
        } else {
            return res.status(401).send('Unauthorized');
        }
    },

    async getOneNote(req, res){

			try{

				const data1 = await modelNote.Notes.afficherUneNote(req)
                const jwtData = res.locals.jwtData;
			
				if(data1){
					
					res.render("updatenote", {dataNotes:data1, role: jwtData.roles})
				
				}else{

					res.render("erreur", {role: jwtData.roles})
				}

			}catch(error){

				console.log(error)
			}
		
	},

	async addNote(req, res){
		try {
		  if (!req.params.idEleve) {
			throw new Error("L'id de l'élève est manquant");
		  }
	  
		  const data = await modelNote.Notes.addNote(req);
		  const jwtData = res.locals.jwtData;
		  console.log(req.params.idEleve);
	  
		  if(data){
			res.redirect("/notes/notesEleve/" + req.params.idEleve);
		  } else {
			res.render("erreur", {role: jwtData.roles});
		  }
		} catch(error) {
		  console.log(error);
		  res.status(500).send("Une erreur est survenue");
		}
	  },

	async deleteNote(req, res){

			
			try{

				const data = await modelNote.Notes.deleteNote(req)
                const jwtData = res.locals.jwtData;
			
				if(data){
					
					res.redirect("/notes/notesEleve/" + req.params.idEleve);
				
				}else{

					res.render("erreur", {role: jwtData.roles})
				}

			}catch(error){

				console.log(error)
			}
	},

	async updateNote(req, res){

			try{

				const data = await modelNote.Notes.modifierNote(req)
                const jwtData = res.locals.jwtData;
			
				if(data){
					
					res.redirect("/notes/notesEleve/" + req.params.idEleve);
				
				}else{

					res.render("erreur", {role: jwtData.roles})
				}

			}catch(error){

				console.log(error)
			}
		
	}
}

module.exports = {
    controllerNotes,
   
};
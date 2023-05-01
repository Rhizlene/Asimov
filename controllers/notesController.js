
const modelNote = require('../models/modelNotes');
const authConfig = require('../controllers/authController');

const controllerNotes = {

    async affichageNote(req, res) {

        try {
            const data1 = await modelNote.Notes.afficherNotesEleve(req, res)
            const data2 = await modelNote.Notes.moyenneGenerale(req)
            const jwtData = res.locals.jwtData;

            if (data1) {
                res.render("releve_notes", { dataNotes: data1, dataMoyenne: data2, role: jwtData.roles, id: jwtData.user })
            } else {
                res.render("erreur", { cookie: jwtData })
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
    }
}

module.exports = {
    controllerNotes,
    authorize: authConfig.authorize // importez le middleware `authorize`
};
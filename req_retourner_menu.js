//==========================================
//
//
//==========================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {
	var marqueurs;
	var page;
	var i;
	var nouveau;
	var registre;
	var objet;
	var score;
	var compteur;
	var nb_question_repondu;
	var qc = query.theme;


if(query.choix === 0) {
	page = fs.readFileSync('modele_accueil_membre.html',"UTF-8");
} else if(query.choix === 1) {
	objet = fs.readFileSync("suivi_"+ query.compte +".json","UTF-8");
	registre = JSON.parse(objet);

	registre[qc].nb_question_repondu = [];
	registre[qc].score = 0;
	registre[qc].compteur = 0;

	objet = JSON.stringify(registre);
	fs.writeFileSync("suivi_"+query.compte+".json" ,objet,"UTF-8");
	page = fs.readFileSync('modele_accueil_membre.html',"UTF-8");
}
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};
//---------------------------------------------
module.exports = trait;

//===========================================================
//
//version 01/05/2018
//=================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs = [];
	var page;
	var chaine;
	var compte;
	var theme;
	var choix;
	var i;
	var questions;
	var reponse_q;
	var question;
	var proposition;
	var no_question;
	var resultat;

	resultat = 0;

	//CORRIGER LA  QUESTION , INCREMENTATION OU DECREMENTATION DU SCORE , AFFICHER LA QUESTION SUIVANTE

	if ( query.theme === "sport" ) {

	chaine = fs.readFileSync("questions_sport.json","utf-8");
	questions = JSON.parse(chaine);
	i = Number(query.no_question);

		if ( query.choix === query.reponse_q ) {
		page = fs.readFileSync('modele_correction_solo.html', 'utf-8');
				marqueurs["question"] = questions[i].question;
				marqueurs["selection"] = questions[i].proposition[query.choix];
				marqueurs["commentaire"] = "Bravo, c'est la bonne reponse" ;
				resultat++;
				page = page.supplant(marqueurs);
		} else {
				page = fs.readFileSync('modele_correction_solo.html', 'utf-8');
                marqueurs["question"] = questions[i].question;
                marqueurs["selection"] = questions[i].proposition[query.choix];
                marqueurs["commentaire"] = "Bravo, c'est la bonne reponse" ;
				page = page.supplant(marqueurs);

		};
};

	marqueurs = {};
	marqueurs.compte = "";
	marqueurs.theme = "";
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//===========================================================
module.exports = trait;

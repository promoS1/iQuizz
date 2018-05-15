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
	var stop = true;
	var i = 0;
	var j = 0;
	var questions;
	var question;
	var proposition1;
	var proposition2;
	var proposition3;
	var resultat = 0;

	//CORRIGER LA  QUESTION , INCREMENTATION OU DECREMENTATION DU SCORE , AFFICHER LA QUESTION SUIVANTE

	page = fs.readFileSync('modele_correction_solo.html', 'utf-8');
	chaine = fs.readFileSync("questions_sport.json","utf-8");
	questions = JSON.parse(chaine);

		if ( query.theme === "sport" ) {
			marqueurs["question"] = questions[j].question;
			marqueurs["proposition1"] = questions[j].proposition[0];
			marqueurs["proposition2"] = questions[j].proposition[1];
			marqueurs["proposition3"] = questions[j].proposition[2];
			marqueurs["resultat"] = resultat;
			page = page.supplant(marqueurs);


			if ( query.choix === question.reponse ) {
				marqueurs["reb"] = "Bravo Vous avez Bon !!!!";
				marqueurs["prop"] = "La Bonne Réponse était " + questions.reponse;
				stop = false;
				j=i+1;
				page = fs.readFileSync('modele_correction_solo.html', 'utf-8');
			} else {

			};
		} else {

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

//===========================================================
//afficher 1ere question
//version 24/04/2018
//=================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var chaine;
	var quest;
	var compte;
	var numero;
	var compteur;
	var theme;
	var i;
	var questions;
	var reponse_q;
	var question;
	var proposition1;
	var proposition2;
	var proposition3;
	
	// TIRE AU SORT DU THEME CHOISI PAR LE JOUEUR
	
	if ( query.theme === "sport" ) {	
		chaine = fs.readFileSync("questions_sport.json","utf-8");
	} else if ( query.theme === "pub" ) {
		chaine = fs.readFileSync("questions_pub.json","utf-8");
	} else if ( query.theme === "cg" ) {
		chaine = fs.readFileSync("questions_cg.json","utf-8");
	} else if ( query.theme === "histoire" ) {
		chaine = fs.readFileSync("questions_histoire.json","utf-8");
	}
		
	questions = JSON.parse(chaine);
	compteur = questions.length;
	i = Math.floor(Math.random() * compteur);

	// CREATION FICHIER PERSONNEL SUIVI DU QCM

	// AFFICHAGE DES QUESTIONS

	page = fs.readFileSync('modele_questionnaire_solo.html', 'utf-8');

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.theme = query.theme;
	marqueurs["question"] = questions[i].question;
	marqueurs["proposition1"] = questions[i].proposition[0];
	marqueurs["proposition2"] = questions[i].proposition[1];
	marqueurs["proposition3"] = questions[i].proposition[2];
	marqueurs["numero"] = i;

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;

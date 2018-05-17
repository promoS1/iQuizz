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
	var j;
	var questions;
	var reponse_q;
	var question;
	var proposition1;
	var proposition2;
	var proposition3;
	var chaine;
	var player = [];
	var Quest = [];


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
	
	check = false;
	j = 0;
	Quest = query.no_question;

	chaine = fs.readFileSync("registered.json","UTF-8");
	register = JSON.parse(chaine);

	while(j<register.legth && check === false) {
		if(register[j].query.compte === 1) {
			check = true;
		}
		j++;

		} else if (check === false){
			player[0].Theme = query.theme;
			player[1].Question = Quest;
			player[2].Score = Compteur;
			chaine2 = JSON.stringify(player);
			fs.writeFileSync("Suivi_" + query.compte + ".json", chaine2 , "UTF-8");

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

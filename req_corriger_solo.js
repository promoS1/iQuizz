//===========================================================
//
//version 01/05/2018
//=================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs ;
	var page;
	var chaine;
	var compte;
	var theme;
	var choix;
	var i;
	var questions;
	var bonne_reponse;
	var question;
	var proposition;
	var no_question;
	var resultat;
	var player = [];
	var j;
	 resultat = 0;

	//TIRE AU SORT DU THEME CHOISI PAR LE JOUEUR

	if ( query.theme === "sport" ) {
		chaine = fs.readFileSync("questions_sport.json","utf-8");
	} else if ( query.theme === "pub" ) {
		chaine = fs.readFileSync("questions_pub.json","utf-8");
	} else if ( query.theme === "cg" ) {
		chaine = fs.readFileSync("questions_cg.json","utf-8");
	} else if ( query.theme === "histoire" ) {
		chaine = fs.readFileSync("questions_histoire.json","utf-8");
	}

	marqueurs = [];
	questions = JSON.parse(chaine);
	i = Number(query.no_question);

	//CORRIGE , COMMENTE LA QUESTION , MODIFIE SCORE 

	chaine = fs.readFileSync(query.compte + ".json","UTF-8");
	suivi = JSON.parse(chaine);

	if ( query.choix === questions[i].bonne_reponse ){
		page = fs.readFileSync('modele_correction_solo.html', 'utf-8');
		marqueurs["question"] = questions[i].question;
		marqueurs["selection"] = questions[i].proposition[query.choix];
		marqueurs["commentaire"] = "Bravo, c'est la bonne reponse" ;
		suivi.score = +1;
		suivi.questions = [];
		suivi.questions.push = query.no_question;

		page = page.supplant(marqueurs);
	} else {
		j = questions[i].bonne_reponse;
		page = fs.readFileSync('modele_correction_solo.html', 'utf-8');
		marqueurs["question"] = questions[i].question;
		marqueurs["selection"] = questions[i].proposition[query.choix];
		marqueurs["commentaire"] = "Vous avez faux, la bonne reponse est "+questions[i].proposition[j];
		suivi.questions = [];
		suivi.questions.push = query.no_questions;
		page = page.supplant(marqueurs);


	};
		chaine = JSON.stringify(suivi);
		fs.writeFileSync(query.pseudo + ".json",chaine,"UTF-8");

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.theme = query.theme;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//===========================================================
module.exports = trait;

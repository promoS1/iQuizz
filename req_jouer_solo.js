//===========================================================
//afficher 1ere question
//version 24/04/2018
//=================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs = {};
	var page;
	var chaine;
	var quest;
	var compte;
	var numero;
	var compteur;
	var i;
	var n;
	var j;
	var questions;
	var reponse_q;
	var question;
	var resultat;
	var no_question_repondu;
	var no_question;
	var proposition1;
	var proposition2;
	var proposition3;
	var chaine;
	var objet;
	var registre;
	var nouveau = {};
	var a = query.theme;

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

	// FICHIER SUIVI DU JOUEUR

	objet = fs.readFileSync("suivi_"+ query.compte +".json","UTF-8");
	registre = JSON.parse(objet);

	// AFFICHAGE DES QUESTIONS

	console.log( "compteur : " + registre[a].compteur);
	if(registre[a].compteur ===  4) {
		page = fs.readFileSync('modele_fin_solo.html', 'utf-8');
		console.log("If-1");
	} else if(registre[a].compteur < 4) {
		page = fs.readFileSync('modele_questionnaire_solo.html','utf-8');
		console.log("test-page");
		marqueurs.compte = query.compte;
		marqueurs.theme = query.theme;
		marqueurs["question"] = questions[i].question;
		marqueurs["proposition1"] = questions[i].proposition[0];
		marqueurs["proposition2"] = questions[i].proposition[1];
		marqueurs["proposition3"] = questions[i].proposition[2];
		marqueurs["numero"] = i;


		console.log("past-marq");
		no_question = i;
		/*
		if(registre[a].compteur < 4) {
			registre[a].nb_question_repondu.push(no_question);
			registre[a].compteur = registre[a].compteur+1;
		} else if(registre[a].compteur === 4) {
			registre[a].compteur = registre[a].compteur;
		}
		*/
		objet = JSON.stringify(registre);
		fs.writeFileSync("suivi_"+ query.compte +".json", objet ,"UTF-8");
	}	
	marqueurs["compte"] = query.compte;
	marqueurs["theme"] = query.theme;
	marqueurs["commentaire"] = "Vous avez terminé le Quizz : " + query.theme + " Avec un score de : " + registre[a].score;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};
//--------------------------------------------------------------------------
module.exports = trait;

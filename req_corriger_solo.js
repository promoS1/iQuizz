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
	var nouveau;
	var registre;
	var objet;
	var j;
	var qc = query.theme;

	query.choix = Number(query.choix);

	//APPEL FICHIER SUIVI JOUEUR

	objet = fs.readFileSync("suivi_"+ query.compte +".json","UTF-8");
	registre = JSON.parse(objet);

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

	if(registre[qc].compteur < 4) {
		page = fs.readFileSync('modele_correction_solo.html', 'utf-8');
		marqueurs["question"] = questions[i].question;
		marqueurs["selection"] = questions[i].proposition[query.choix];	
		if(query.choix === questions[i].bonne_reponse ){
			marqueurs["commentaire"] ="Vous avez selectionne :{selection}" +"<br>"+"Bravo, c'est la bonne reponse" ;
			registre[qc].score = registre[qc].score + 1;	
		} else {
			j = questions[i].bonne_reponse;
			marqueurs["commentaire"] ="Vous avez selectionne :{selection}"+" <br>"+"Vous avez faux, la bonne reponse est "+questions[i].proposition[j];
		}
	} else if(registre[qc].compteur === 4) {
		page = fs.readFileSync('modele_fin_solo.html',"UTF-8")
			marqueurs["commentaire"] = "Vous avez terminé le Quizz : " + query.theme + " Avec un score de : " + registre[qc].score;
	}

	if(registre[qc].compteur < 4) {
		registre[qc].nb_question_repondu.push(no_question);
		registre[qc].compteur = registre[qc].compteur+1;
	} else if(registre[qc].compteur === 4) {
		registre[qc].compteur = registre[qc].compteur;
	}
	page = page.supplant(marqueurs);

	objet = JSON.stringify(registre);
	fs.writeFileSync("suivi_"+ query.compte +".json", objet ,"UTF-8");

	marqueurs.compte = query.compte;
	marqueurs.theme = query.theme;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//===========================================================
module.exports = trait;

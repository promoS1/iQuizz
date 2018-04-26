


"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var page;
	var chaine;
	var quest;
	var compte;
	var pseudo;
	var theme;
	var question = [];
	var noq;
	var resultat;
	
//CREATION DU JSON JOUEUR ET AFFICHAGE DES QUESTIONS 
	
//	pseudo = {compte};
	page = fs.readFileSync('question_solo_sport.html', 'utf-8');
	chaine = fs.readFileSync("question_" + query.theme + ".json","utf-8");
	question = JSON.parse(chaine);

	fs.writeFileSync( query.compte + ".json",JSON.stringify(quest),"utf-8");
	marqueurs = {};
	marqueurs.compte = "";
	question.theme = query.theme;
//	questions = [];
//	noq = [];
//	resultat = [];
	
/*********
	marqueurs.q_1 = quest[0];
	marqueurs.r1 = quest[1];
	marqueurs.r2 = quest[2];
	marqueurs.r3 = quest[3];
	page = page.supplant(marqueurs);
*********/

res.writeHead(200, {'Content-Type': 'text/html'});
res.write(page);
res.end();
};

module.exports = trait;

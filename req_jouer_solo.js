"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var page;
	var chaine;
	var q;
	//lecture du json et affichage de la question
	
	page = fs.readFileSync("questions_solo_sport.html" , "utf-8");
	chaine = fs.readFileSync("questions.json" , "utf-8");
	q = JSON.parse(chaine);
	marqueurs = {};
	marqueurs.compte = "";
	marqueurs.q_1 = q[0];
	marqueurs.r1 = q[1];
	marqueurs.r2 = q[2];
	marqueurs.r3 = q[3];
};


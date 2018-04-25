




"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var page;
	var chaine;
	var quest;

//CREATION DU JSON JOUEUR ET AFFICHAGE DES QUESTIONS 

	quest = JSON.parse(fs.readFileSync("questions" + query.theme + ".json","utf-8"));
	fs.writeFileSync("questions" + query.pseudo + ".json",JSON.stringify(quest),"utf-8");
	marqueurs = {};
	marqueurs.compte = "";
	marqueurs.q_1 = q[0];
	marqueurs.r1 = q[1];
	marqueurs.r2 = q[2];
	marqueurs.r3 = q[3];
	page = page.supplant(marqueurs);

res.writeHead(200, {'Content-Type': 'text/html'});
res.write(page);
res.end();
};

module.exports = trait;

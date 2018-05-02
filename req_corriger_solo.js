//===========================================================
//version 01/05/2018
//=================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs = [];
    var page;
    var chaine;
    var query;
    var compte;
    var pseudo;
    var choix;
    var i = 0;
    var j;
    var questions;
    var question;
    var proposition1;
    var proposition2;
    var proposition3;
    var resultat = 0;

    //CORRIGER LA  QUESTION , INCREMENTATION OU DECREMENTATION DU SCORE , AFFICHER LA QUESTION SUIVANTE

	chaine = fs.readFileSync("questions_sport.json","utf-8");
	questions = JSON.parse(chaine);

	do{
		if ( query.choix === questions[i].reponse ) {
			resultat++;
			i++;
    page = fs.readFileSync('modele_questionnaire_solo.html', 'utf-8');

	marqueurs["question"] = questions[i].question;
	marqueurs["proposition1"] = questions[i].proposition[0];
	marqueurs["proposition2"] = questions[i].proposition[1];
	marqueurs["proposition3"] = questions[i].proposition[2];
		};

	};     
              page = page.supplant(marqueurs);


    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//===========================================================
module.exports = trait;

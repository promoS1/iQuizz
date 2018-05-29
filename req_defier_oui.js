//--JOUEUR-DEFIE----CETTE-REQUETE-LANCE-LE-QUESTIONNAIRE----------------
//-------------------PAR--iQuizz--LE--25/05/2018--------------------
"use strict";

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {

    var compte;
    var theme;
    var i;
    var j;
    var compteur;
    var chaines;
    var questions;
    var proposition;
    var contenu_fichier;
    var liste_membres;
    var proposition1;
    var proposition2;
    var proposition3;
    var page;
    var marqueurs;

	//

	contenu_fichier = fs.readFileSync("salon.json" , "utf-8");
	liste_membres = JSON.parse(contenu_fichier);
		for (j = 0; j < liste_membres.length; j++) {
			if(liste_membres[j].compte === query.compte) {
				liste_membres[j].etat = "joue" ;
				contenu_fichier = JSON.stringify(liste_membres);
				fs.writeFileSync("salon.json", contenu_fichier , "utf-8");
			}
		}

	// TIRE AU SORT DU THEME PAR LE JOUEUR

    if ( query.theme === "sport" ) {
        chaines = fs.readFileSync("questions_sport.json","utf-8");
    } else if ( query.theme === "pub" ) {
        chaines = fs.readFileSync("questions_pub.json","utf-8");
    } else if ( query.theme === "cg" ) {
        chaines = fs.readFileSync("questions_cg.json","utf-8");
    } else if ( query.theme === "histoire" ) {
        chaines = fs.readFileSync("questions_histoire.json","utf-8");
	}

	//

    questions = JSON.parse(chaines);
    compteur = questions.length;
    i = Number(Math.floor(Math.random() * compteur));

	//

	page = fs.readFileSync("modele_questionnaire_multi.html", "utf-8");

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.theme = query.theme;
	marqueurs["question"] = questions[i].question;
	marqueurs["proposition1"] = questions[i].proposition[0];
	marqueurs["proposition2"] = questions[i].proposition[1];
	marqueurs["proposition3"] = questions[i].proposition[2];
	marqueurs["numero"] = i;

	marqueurs = {};
    marqueurs.compte = query.compte;
    marqueurs.theme = query.theme;
    marqueurs.mdp = query.mdp;
    page = page.supplant(marqueurs);


    res.writeHead(200, {'Content-type': 'text/html'});
    res.write(page);
    res.end();

};
//==================================================

module.exports = trait;

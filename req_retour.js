//--CETTE--REQUETE--VA--PERMETTRE--DE--RENTRER--A--LA--PAGE-DACCUEIL
//PAR--iQuizz-----LE---12-06--2018
"use strict";

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {

    var compte;
    var j;
    var contenu_fichier;
    var liste_membres;
    var page;
    var marqueurs;

	
	page = fs.readFileSync("modele_accueil_membre.html" , "utf-8");

	marqueurs = {};
    marqueurs.compte = query.compte;

	page = page.supplant(marqueurs);

	contenu_fichier = fs.readFileSync("salon.json", "utf-8");
    liste_membres = JSON.parse(contenu_fichier);

	 for (j = 0; j < liste_membres.length; j++) {
		if(liste_membres[j].compte === query.compte) {
			liste_membres[j].etat = "connecté" ;
            liste_membres[j].libre = "non";
		}
    }

    contenu_fichier = JSON.stringify(liste_membres);
    fs.writeFileSync("salon.json", contenu_fichier, 'UTF-8');

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//==========================================================================

module.exports = trait;

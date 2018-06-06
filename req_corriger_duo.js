//----- CORRIGE--LES-QUESTIONNAIRES--DES--JOUEURS--
//----PAR--iQuizz-le---05/06/2018-----------------
//================================================
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
    var id;
    var questions;
    var partie;
    var actif;
    var adversaire;
    var joueur1;
    var bonne_reponse;
    var question;
    var proposition;
    var no_question;
    var score;
    var nouveau;
    var objet;
    var j;
    var contenu_fichier;
    var liste_membres;


	contenu_fichier = fs.readFileSync("salon.json" , "utf-8");
    liste_membres = JSON.parse(contenu_fichier);
	for (j = 0; j < liste_membres.length; j++) {
		if(liste_membres[j].compte === query.compte) {
			if(liste_membres[j].id ==="id") {
				adversaire = query.compte;
				compte = liste_membres[j].adversaire;
			} else {
				compte = query.compte;
				adversaire = liste_membres[j].adversaire;
				}
			}
	}

	/*contenu_fichier = JSON.stringify(liste_membres);
	fs.writeFileSync("salon.json" , contenu_fichier ,"UTF-8");*/
	

    //APPEL DU FICHIER PARTIE COMMUNE AU DEUX JOUEURS 

    objet = fs.readFileSync("partie_"+ adversaire +"_vs_"+ compte +".json" ,"UTF-8");
    partie = JSON.parse(objet);

	if( partie.compte === query.compte ) {
		actif = partie.joueur1;
	} else if (partie.compte !== query.compte) {
		actif = partie.adversaire;
	}

	console.log(actif);

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







	marqueurs = {};
	marqueurs.adversaire =query.adversaire;

	res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write(page);
    res.end();
};
//=========================================================
module.exports = trait;

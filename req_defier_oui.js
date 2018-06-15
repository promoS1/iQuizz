//--JOUEUR-DEFIE----CETTE-REQUETE-LANCE-LE-QUESTIONNAIRE----------------
//-------------------PAR--iQuizz--LE--25/05/2018--------------------
"use strict";

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {

    var compte;
    var theme;
    var liste = {};
    var i;
    var j;
    var compteur;
    var chaines;
    var partie;
    var contenu;
    var adversaire;
	var questions;
    var proposition;
    var contenu_fichier;
    var liste_membres;
    var proposition1;
    var proposition2;
    var proposition3;
    var page;
    var etat;
    var marqueurs;
	var compteurq;
	var noq;

	//LE JOUEUR A ACCEPTE LE DEFI , ON L'ATTRIBUT L'ETAT JOUE

	contenu_fichier = fs.readFileSync("salon.json" , "utf-8");
	liste_membres = JSON.parse(contenu_fichier);
	for (j = 0; j < liste_membres.length; j++) {
		if(liste_membres[j].compte === query.compte) {
			adversaire = liste_membres[j].adversaire;
			liste_membres[j].etat = "joue" ;
			for (j = 0; j < liste_membres.length; j++) {
				if (liste_membres[j].compte === adversaire) {
					liste_membres[j].etat = "joue";
					liste_membres[j].id = "id";
				}	
			}
		}
	}
	

	//ECRIE DANS SALON AVEC LE NOUVEAU STATUS DES JOUEURS

	contenu_fichier = JSON.stringify(liste_membres);
	fs.writeFileSync("salon.json", contenu_fichier , "utf-8");

	// TIRE AU SORT DU THEME PAR LE JOUEUR

	chaines = fs.readFileSync("questions_"+ query.theme +".json","utf-8");
	//
	questions = JSON.parse(chaines);
    compteur = questions.length;

	//ON ECRIT LES INFOS DE LA PARTIE DANS LE JSON COMMUN AU DEUX JOUEURS
	compteurq = compteur++ ;
	liste.theme = query.theme;
	liste.hote = adversaire;
	liste.compte = query.compte;
	liste.adversaire = adversaire;
	liste.joueur1 = query.compte ;
	liste.score1 = 0;//SCORE DU JOUEUR DEFIE (1)
	liste.joueur2 = adversaire;
	liste.score2 = 0;//SCORE DU JOUEUR QUI DEFIE (2)
	liste.a = [];//COMPTEUR DU DU JOUEUR COMPTE (1)
	liste.b = [];//COMPTEUR DU DU JOUR HOTE (2)
	liste.noq = [2,3,0,1];
	partie = JSON.stringify(liste);
	contenu = fs.writeFileSync("partie_"+ adversaire +"_vs_"+ query.compte +".json", partie ,"UTF-8");

	//ON AFFICHE LE QUESTIONNAIRE

	contenu_fichier = fs.readFileSync("partie_"+ adversaire +"_vs_"+ query.compte +".json",  "utf-8");
    partie  = JSON.parse(contenu_fichier);
	compteurq = partie.noq.length
	 i = (Math.floor(Math.random() * compteurq));

	page = fs.readFileSync("modele_questionnaire_multi.html", "utf-8");

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.theme = query.theme;
	marqueurs.adversaire = adversaire;
	marqueurs["question"] = questions[i].liste.noq;
	marqueurs["proposition1"] = questions[i].proposition[0];
	marqueurs["proposition2"] = questions[i].proposition[1];
	marqueurs["proposition3"] = questions[i].proposition[2];
	marqueurs["numero"] = i;

    page = page.supplant(marqueurs);


    res.writeHead(200, {'Content-type': 'text/html'});
    res.write(page);
    res.end();

};
//==================================================

module.exports = trait;

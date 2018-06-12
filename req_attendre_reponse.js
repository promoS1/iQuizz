//--CETTE-REQUETTE-VA-SERVIR-DE-REFRESH-A-CHAQUE-FOIS-LA-PAGE-DATTENTE-POUR-SAVOIR-SI-L-ADVERSAIRE-A-ACCEPTER-OU-REFUSER-LE-DEFI--
//PAR-IQUIIZZ-LE-24/05/2018--
"use strict";

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {

    var contenu_fichier1;
    var liste;
    var chaines;
    var partie;
    var liste_membres;
    var adversaire;
    var i;
    var j;
    var x;
    var compte;
    var compteur;
    var question;
    var questions;
    var proposition;
    var hote;
    var page;
    var marqueurs;


    // LECTURE DU JSON "salon.json" --> VOIR SI ÉTAT PASSE EN "attente" 

    contenu_fichier1 = fs.readFileSync("salon.json", "utf-8");
    liste_membres = JSON.parse(contenu_fichier1);

    // REDIRECTION VERS PAGE HTML SI JOUEUR DÉFIÉ

    for(i = 0; i < liste_membres.length; i++) {
        if(liste_membres[i].compte === query.compte) {
			x = i;
			compte = query.compte;
            adversaire = liste_membres[i].adversaire;
		}
	}

	//LE PROCESSUS DE LA PARTIE MULTI S'EXECUTE  

	if (liste_membres[x].etat === "joue") {

		page = fs.readFileSync("modele_questionnaire_multi.html", "utf-8");

	 // CHOIX DU THEME PAR LE JOUEUR

	chaines = fs.readFileSync("questions_"+ query.theme + ".json","utf-8");

	 //ON SELECTIONNE UN j ALEATOIRE

		questions = JSON.parse(chaines);
		compteur = questions.length;
		j = (Math.floor(Math.random() * compteur));

	  //ON AFFICHE LE QUESTIONNAIRE

		page = fs.readFileSync("modele_questionnaire_multi.html", "utf-8");

		marqueurs = {};
		marqueurs["question"] = questions[j].question;
		marqueurs["proposition1"] = questions[j].proposition[0];
		marqueurs["proposition2"] = questions[j].proposition[1];
		marqueurs["proposition3"] = questions[j].proposition[2];
		marqueurs["numero"] = j;

		page = page.supplant(marqueurs);		
	
	} else if (liste_membres[x].etat ==="attente") {
	 page = fs.readFileSync("modele_attendre_reponse.html", "utf-8");
	} else if (liste_membres[x].etat === "connecté") {
		page = fs.readFileSync("modele_refus_defie.html", "utf-8");
	}

		marqueurs = {};
		marqueurs.compte = query.compte;
		marqueurs.theme = query.theme;
		marqueurs.mdp = query.mdp;
		marqueurs.adversaire = adversaire;

		page = page.supplant(marqueurs);		

		res.writeHead(200, {'Content-type': 'text/html'});
		res.write(page);
		res.end();


};
//==================================================

module.exports = trait;

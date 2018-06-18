//--CETTE REQUETTE VA SERVIR DE REFRESH A CHAQUE FOIS LA PAGE D'ATTENTE POUR SAVOIR SI L'ADVERSAIRE A ACCEPTER OU REFUSER LE DEFI
//--PAR- Morgan MBA --LE-24/05/2018--
"use strict";

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {

    var contenu_fichier;
    var contenu_fichier1;
    var objet;
    var chaines;
    var partie;
    var liste_membres;
    var liste_membres1;
    var adversaire;
    var indice;
    var id;
    var i;
    var y;
    var c;
    var j;
    var x;
    var compte;
    var compteur;
    var etat;
    var question;
    var questions;
    var proposition;
    var theme;
    var page;
    var marqueurs = {};


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
	  contenu_fichier = fs.readFileSync("salon.json" , "utf-8");
	    liste_membres1 = JSON.parse(contenu_fichier);
		for (y = 0; y < liste_membres1.length; y++) {
			if(liste_membres1[y].compte === query.compte) {
				if(liste_membres1[y].id ==="id") {
                                adversaire = query.compte;
                                compte = liste_membres1[y].adversaire;
                                marqueurs.adversaire = compte;
                                marqueurs.theme = query.theme;
                                marqueurs.compte = adversaire;

				} else {
                                compte = query.compte;
                                adversaire = liste_membres1[y].adversaire;
                                marqueurs.adversaire = adversaire;
                                marqueurs.theme = query.theme;
                                marqueurs.compte = compte;

                                }
                        }
        }
  //APPEL DU FICHIER PARTIE COMMUNE AU DEUX JOUEURS 

    objet = fs.readFileSync("partie_"+ adversaire +"_vs_"+ compte +".json" ,"UTF-8");
    partie = JSON.parse(objet);

if( partie.compte === query.compte ) {
         indice = partie.c;
    } else if (partie.compte !== query.compte) {
	 indice = partie.d;
    }
		page = fs.readFileSync("modele_questionnaire_multi.html", "utf-8");

	 // CHOIX DU THEME PAR LE JOUEUR

	chaines = fs.readFileSync("questions_"+ query.theme + ".json","utf-8");

	 //ON SELECTIONNE UN j ALEATOIRE

		questions = JSON.parse(chaines);
		j = indice;

	  //ON AFFICHE LE QUESTIONNAIRE

		page = fs.readFileSync("modele_questionnaire_multi.html", "utf-8");

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
		marqueurs.compte = query.compte;
		marqueurs.theme = query.theme;
		marqueurs.adversaire = adversaire;


		page = page.supplant(marqueurs);		

		res.writeHead(200, {'Content-type': 'text/html'});
		res.write(page);
		res.end();


};
//==================================================

module.exports = trait;

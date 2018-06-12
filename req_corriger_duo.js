//----- CORRIGE--LES-QUESTIONNAIRES--DES--JOUEURS--
//----PAR--iQuizz-le---05/06/2018-----------------
//================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
    var marqueurs = {} ;
    var page;
    var chaine;
    var compte;
    var compteur;
    var theme;
    var choix;
    var i;
    var j;
    var a;
    var b;
    var n;
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
    var contenu_fichier;
    var liste_membres;


	contenu_fichier = fs.readFileSync("salon.json" , "utf-8");
    liste_membres = JSON.parse(contenu_fichier);
	for (j = 0; j < liste_membres.length; j++) {
		if(liste_membres[j].compte === query.compte) {
			if(liste_membres[j].id ==="id") {
				adversaire = query.compte;
				compte = liste_membres[j].adversaire;	
				marqueurs.adversaire = compte;
				marqueurs.theme = query.theme;
				marqueurs.compte = adversaire;

			} else {
				compte = query.compte;
				adversaire = liste_membres[j].adversaire;	
				marqueurs.adversaire = adversaire;
				marqueurs.theme = query.theme;
				marqueurs.compte = compte;

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
		score = partie.score1;
		compteur = partie.a
	} else if (partie.compte !== query.compte) {
		actif = partie.adversaire;
		score = partie.score2;
		compteur = partie.b;
	}

	console.log(actif);

 //TIRE AU SORT DU THEME CHOISI PAR LE JOUEUR

        chaine = fs.readFileSync("questions_"+ query.theme +".json","utf-8");
	
	questions = JSON.parse(chaine);
	i = Number(query.no_question);
	compteur.push(i);

	page = fs.readFileSync("modele_correction_duo.html" , "UTF-8");
	marqueurs["question"] = questions[i].question;
	marqueurs["selection"] = questions[i].proposition[query.choix];

	console.log(query.choix);
	console.log(questions[i].proposition[query.choix]);

	if ( query.choix == questions[i].bonne_reponse ) {
		marqueurs["commentaire"] = "Vous avez selectionne :{selection}" +"<br>"+"Bravo , c'est la bonne reponse";
		score = score + 1;
	} else {
		n = questions[i].bonne_reponse;
		marqueurs["commentaire"] = "Vous avez selectionne :{selection}"+" <br>"+"Vous avez faux, la bonne reponse est "+questions[i].proposition[n];
	}
	page = page.supplant(marqueurs);

	console.log(score);
	console.log(compteur);

 if( partie.compte === query.compte ) {
         partie.score1 = score;
         partie.a = compteur;
    } else if (partie.compte !== query.compte) {
         partie.score2 = score;
         partie.b = compteur;
    }

	objet = JSON.stringify(partie);
	fs.writeFileSync("partie_"+ adversaire +"_vs_"+ compte +".json", objet , "UTF-8");

	marqueurs.actif = actif;
	page = page.supplant(marqueurs);

//

 /*   objet = fs.readFileSync("partie_"+ adversaire +"_vs_"+ compte +".json" ,"UTF-8");
	partie = JSON.parse(objet);

if ( partie.a.length === 4 && partie.b.length < 4 ) {
	page = readFileSync("modele_attendre_fini.html" , "utf-8")
} else if (partie.a.length < 4 && partie.b === 4 ) {
	page = readFileSync("modele_attendre_fini.html" , "utf-8")
}	
	page = page.supplant(marqueurs);*/

	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//=========================================================
module.exports = trait;

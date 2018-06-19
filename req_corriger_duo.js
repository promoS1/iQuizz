//----- CORRIGE--LES-QUESTIONNAIRES--DES--JOUEURS--
//----PAR Morgan MBA le---16/06/2018-----------------
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
    var l;
    var n;
    var id;
    var questions;
    var partie;
    var partief;
    var actif;
    var adversaire;
    var joueur1;
    var joueur2;
    var bonne_reponse;
    var question;
    var proposition;
    var no_question;
    var score;
    var score1;
    var score2;
    var indice;
    var nouveau;
    var objet;
    var objetf;
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

	objet = fs.readFileSync("partie_"+ adversaire +"_vs_"+ compte +".json" ,"UTF-8");
	partie = JSON.parse(objet);


    //APPEL DU FICHIER PARTIE COMMUNE AU DEUX JOUEURS 
  
	if( partie.compte === query.compte ) {
		actif = partie.joueur1;
		score = partie.score1;
		compteur = partie.a;
		indice = Number(partie.c);
	} else if (partie.compte !== query.compte) {
		actif = partie.adversaire;
		score = partie.score2;
		compteur = partie.b;
		indice = Number(partie.d);
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
         partie.c = indice + 1;
    } else if (partie.compte !== query.compte) {
         partie.score2 = score;
         partie.b = compteur;
         partie.d = indice + 1;
    } 
	objet = JSON.stringify(partie);
	fs.writeFileSync("partie_"+ adversaire +"_vs_"+ compte +".json", objet , "UTF-8");

	marqueurs.actif = actif;

	//SI UN JOUEUR FINI AVANT L'AUTRE IL EST DIRIGE VERS UNE ATTENTE PENDANT QUE L'AUTRE FINI SA PARTIE ET AFFICHE LE RESULTAT FINAL

	objetf = fs.readFileSync("partie_"+ adversaire +"_vs_"+ compte +".json" ,"UTF-8");
	partief = JSON.parse(objetf);

console.log("indice a :"+ partief.a +" indice b " + partief.b +" compte: "+query.compte); 
 if ( partief.a.length === 4 && partief.b.length < 4 && query.compte === partief.joueur1 ) {
	page = fs.readFileSync("modele_attendre_fini.html" , "UTF-8");

	page = page.supplant(marqueurs);
} else if (partief.a.length < 4 && partief.b.length === 4 && query.compte === partief.joueur2 ) {
	page = fs.readFileSync("modele_attendre_fini.html" , "UTF-8");

	page = page.supplant(marqueurs);
} else if ( partief.a.length === 4 && partief.b.length === 4 && query.compte === partief.joueur1 ) {
	page = fs.readFileSync("modele_fin_duo.html" , "UTF-8");
		if (partief.score1 < partief.score2) {
                marqueurs.compte = partief.joueur1;
                marqueurs.adversaire = partief.joueur2;
                marqueurs.score_j = partief.score1;
                marqueurs.score_a = partief.score2;
                marqueurs.commentaire = " Vous avez perdu contre " + partief.joueur2 ;
                } else if (partief.score1 > partief.score2) {
                marqueurs.compte = partief.joueur1;
                marqueurs.adversaire = partief.joueur2;
                marqueurs.score_j = partief.score1;
                marqueurs.score_a = partief.score2;
                marqueurs.commentaire = " Vous avez gagne contre " + partief.joueur2 ;
                }
	page = page.supplant(marqueurs);
} else if (partief.a.length === 4 && partief.b.length === 4 && query.compte === partief.joueur2 ) {
	page = fs.readFileSync("modele_fin_duo.html" , "UTF-8");
		if (partief.score1 < partief.score2) {
		marqueurs.compte = partief.joueur2;
		marqueurs.adversaire = partief.joueur1;
		marqueurs.score_j = partief.score2;
		marqueurs.score_a = partief.score1;
		marqueurs.commentaire = " Vous avez gagne contre " + partief.joueur1;
		} else if (partief.score1 > partief.score2) {
		marqueurs.compte = partief.joueur2;
		marqueurs.adversaire = partief.joueur1;
		marqueurs.score_j = partief.score2;
		marqueurs.score_a = partief.score1;
		marqueurs.commentaire = " Vous avez perdu contre " + partief.joueur1; 
		}
	page = page.supplant(marqueurs);
};

	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//=========================================================
module.exports = trait;

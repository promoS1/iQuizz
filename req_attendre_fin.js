//--CE REQUETE VA SERVIR A ACTUALISER LA PAGE D'ATTENTE DE FIN DE JEU SI L'ADVERSAIRE FINI ALORS LA PAGE FIN DUO S'AFFICHE
// PAR Morgan MBA LE 16/06/2018--
"use strict";

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {

	var contenu_fichier;
	var liste_membres1;
	var adversaire;
	var compte;
	var marqueurs;
	var theme;
	var y;
	var a;
	var b;
	var score1;
	var score2;
	var objet;
	var joueur1;
	var joueur2;
	var partie;
	var id;
	var page;

		contenu_fichier = fs.readFileSync("salon.json" , "utf-8");
		liste_membres1 = JSON.parse(contenu_fichier);
		marqueurs = {};

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

if ( partie.a.length === 4 && partie.b.length < 4 && query.compte === partie.joueur1 ) {
	page = fs.readFileSync("modele_attendre_fini.html" , "UTF-8");
	marqueurs.compte = partie.joueur1;
	marqueurs.theme = partie.theme;
	marqueurs.adversaire = partie.joueur2;
	page = page.supplant(marqueurs);
} else if ( partie.a.length === 4 && partie.b.length === 4  && query.compte === partie.joueur1 ) {
		page = fs.readFileSync("modele_fin_duo.html" , "UTF-8");
                if (partie.score1 < partie.score2) {
                marqueurs.compte = partie.joueur1;
                marqueurs.adversaire = partie.joueur2;
                marqueurs.score_j = partie.score1;
                marqueurs.score_a = partie.score2;
                marqueurs.commentaire = " Vous avez perdu contre " + partie.joueur2 ;
	page = page.supplant(marqueurs);
                } else if (partie.score1 > partie.score2) {
                marqueurs.compte = partie.joueur1;
                marqueurs.adversaire = partie.joueur2;
                marqueurs.score_j = partie.score1;
                marqueurs.score_a = partie.score2;
                marqueurs.commentaire = " Vous avez gagne contre " + partie.joueur2 ;
	page = page.supplant(marqueurs);
                } else if (partie.score1 === partie.score2) {
                marqueurs.compte = partie.joueur1;
                marqueurs.adversaire = partie.joueur2;
                marqueurs.score_j = partie.score1;
                marqueurs.score_a = partie.score2;
                marqueurs.commentaire = " Egalite !!! Vous avez les meme connaissances que " + partie.joueur2 +" sur le theme "+ partie.theme ;
	page = page.supplant(marqueurs);
                }
} else if (partie.a.length < 4 && partie.b.length === 4 && query.compte === partie.joueur2 ) {
	page = fs.readFileSync("modele_attendre_fini.html" , "UTF-8");
	marqueurs.compte = partie.joueur2;
	marqueurs.theme = partie.theme;
	marqueurs.adversaire = partie.joueur1;
	page = page.supplant(marqueurs);
} else if ( partie.a.length === 4 && partie.b.length === 4 && query.compte === partie.joueur2 ) {
		page = fs.readFileSync("modele_fin_duo.html" , "UTF-8");
                if (partie.score1 < partie.score2) {
                marqueurs.compte = partie.joueur2;
                marqueurs.adversaire = partie.joueur1;
                marqueurs.score_j = partie.score2;
                marqueurs.score_a = partie.score1;
                marqueurs.commentaire = " Vous avez gagne contre " + partie.joueur1 ;
	page = page.supplant(marqueurs);
                } else if (partie.score1 > partie.score2) {
                marqueurs.compte = partie.joueur2;
                marqueurs.adversaire = partie.joueur1;
                marqueurs.score_j = partie.score2;
                marqueurs.score_a = partie.score1;
                marqueurs.commentaire = " Vous avez perdu contre " + partie.joueur1 ;
	page = page.supplant(marqueurs);
		} else if (partie.score2 === partie.score1) {
                marqueurs.compte = partie.joueur2;
                marqueurs.adversaire = partie.joueur1;
                marqueurs.score_j = partie.score2;
                marqueurs.score_a = partie.score1;
                marqueurs.commentaire = " Egalite !!! Vous avez les meme connaissances que " + partie.joueur1 +" sur le theme "+ partie.theme ;
        page = page.supplant(marqueurs);
                }
	}
	page = page.supplant(marqueurs);


	res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(page);
        res.end();
};
//==================================================

module.exports = trait;

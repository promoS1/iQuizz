//--LE--JOUEUR--A--REFUSE--LE--DEFI----------
//PAR--iQuizz----LE--12-06-2018--------------
"use strict";

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {

    var compte;
    var j;
    var adversaire;
    var contenu_fichier;
    var liste_membres;
    var page;
    var etat;
    var marqueurs;

 //LE JOUEUR A ACCEPTE LE DEFI , ON L'ATTRIBUT L'ETAT JOUE

    contenu_fichier = fs.readFileSync("salon.json" , "utf-8");
    liste_membres = JSON.parse(contenu_fichier);
    for (j = 0; j < liste_membres.length; j++) {
        if(liste_membres[j].compte === query.compte) {
            adversaire = liste_membres[j].adversaire;
            liste_membres[j].etat = "connecté" ;
            for (j = 0; j < liste_membres.length; j++) {
                if (liste_membres[j].compte === adversaire) {
                    liste_membres[j].etat = "connecté";
                    liste_membres[j].libre = "non";
                }
            }
        }
    }

    //ECRIE DANS SALON AVEC LE NOUVEAU STATUS DES JOUEURS

    contenu_fichier = JSON.stringify(liste_membres);
    fs.writeFileSync("salon.json", contenu_fichier , "utf-8");

	page = fs.readFileSync("modele_accueil_membre.html" , "utf-8" );

	marqueurs = {};
	marqueurs.compte = query.compte;

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();
};
//==================================================
module.exports = trait;

//--CETTE-REQUETTE-VA-SERVIR-DE-REFRESH-A-CHAQUE-FOIS-LA-PAGE-DATTENTE-POUR-SAVOIR-SI-L-ADVERSAIRE-A-ACCEPTER-OU-REFUSER-LE-DEFI--
//PAR-IQUIIZZ-LE-24/05/2018--
"use strict";

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {

    var contenu_fichier;
    var contenu_fichier1;
    var partie;
    var liste_membres;
    var adversaire;
    var i;
    var j;
    var compte;
    var etat;
    var hote;
    var page;
    var marqueurs;


    // LECTURE DU JSON "salon.json" --> VOIR SI ÉTAT PASSE EN "attente" 

    contenu_fichier1 = fs.readFileSync("salon.json", "utf-8");
    liste_membres = JSON.parse(contenu_fichier1);

    // REDIRECTION VERS PAGE HTML SI JOUEUR DÉFIÉ

    for (i = 0; i < liste_membres.length; i++) {
        if (liste_membres[i].compte === query.compte) {
			compte = query.compte;
            adversaire = liste_membres[i].adversaire;
				for(j = 0; j < liste_membres.length; j++) {
					if (liste_membres[j].compte === adversaire) {
						if (liste_membres[j].etat === "connecté") {
							page = fs.readFileSync('modele_refus_defie.html','utf-8');
						} else if (liste_membres[j].etat === "joue") {
							fs.writeFileSync("partie_"+ query.compte +"_"+ adversaire +".json", "UTF-8");
							page = fs.readFileSync("modele_questionnaire_multi.html", "utf-8");
						} else {
							page = fs.readFileSync("modele_attendre_reponse.html", "utf-8");
						}
					}
				}
			}
		}

/*	if (liste_membres[i].etat === "joue") {

	//LE PROCESSUS DE LA PARTIE SOLO S'EXECUTE 












}*/
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



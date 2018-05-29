//-----REQUETE-LANCER-LE-DEFI-A-UN-MEMBRE-ET-ATTEND-SA-REPONSE--
// PAR-IQUIZZ-LE-23/05/2018--------------------------------------
"use strict"

var fs = require("fs");
require = ("remedial");

var trait = function (req, res, query) {

    var marqueurs = {};
    var contenu_fichier;
    var membres_salon;
    var adversaire;
    var compte;
    var theme;
    var i;
    var page;

    // LIRE LE JSON POUR VÉRIFIÉ LES JOUEURS PRÉSENT DANS LE SALON

    contenu_fichier = fs.readFileSync("salon.json", "UTF-8");
    membres_salon = JSON.parse (contenu_fichier);


    // MODIFICATION DU JSON "SALON.JSON"

    for ( i = 0; i < membres_salon.length; i++) {
        if (membres_salon[i].compte === query.compte) {
            membres_salon[i].etat = "attente";
            membres_salon[i].adversaire = query.adversaire;
        } else if ( membres_salon[i].compte === query.adversaire ) {
            membres_salon[i].etat = "attente";
            membres_salon[i].adversaire = query.compte;
        }
    }


    // ECRITURE DU NOUVEAU JSON "SALON.JSON"

    contenu_fichier = JSON.stringify(membres_salon);
	fs.writeFileSync("salon.json", contenu_fichier, "utf-8");

    page = fs.readFileSync("modele_attendre_reponse.html", "utf-8");

    marqueurs.adversaire = query.adversaire;
    marqueurs.compte = query.compte;
    marqueurs.theme = query.theme;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();

};

//-------------------------------------------------------------------------//

module.exports = trait;

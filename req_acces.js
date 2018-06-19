//=========================================
// REQUETE D'ACCES A LA PAGE D'ACCUEIL MEMBRE
// PAR MORGAN MBA LE 19/06/2018 ------------
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var compte;
    var page;

    // AFFICHAGE DE LA PAGE D'ACCUEIL MEMBRE

    page = fs.readFileSync("modele_accueil_membre.html", "utf-8");

    marqueurs = {};
    marqueurs.compte = query.compte;
    page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;

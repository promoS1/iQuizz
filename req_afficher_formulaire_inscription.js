//=========================================================================
// Traitement de "req_afficher_formulaire_inscription"
// Version : 24/04/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;

    // AFFICHAGE DE LA modele_formulaire_inscription

    page = fs.readFileSync('formulaire_inscription.html', 'utf-8');

    marqueurs = {};
    marqueurs.erreur = "";
    marqueurs.compte = "";
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;


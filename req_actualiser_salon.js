//--------CETTE REQUETE VA PERMETTRE DE METTRE A JOUR LES JOIUEURS CONNECTES DANS LE SALON---------------------------------------------------
//PAR IQUIZZ LE 23/05/2018------------------------------------

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var contenu_fichier;
    var listeMembres;
    var compte;
    var theme;
    var mdp;
    var adversaire_trouve;
    var adversaire;
    var liste;
    var i;
    var marqueurs;
    var page;

    adversaire_trouve = false

    //  SI ÉTAT PASSE EN ATTENTE 

    contenu_fichier = fs.readFileSync("salon.json", "utf-8");
    listeMembres = JSON.parse(contenu_fichier);

    for (i = 0; i < listeMembres.length; i++) {
        if (listeMembres[i].compte === query.compte) {
            compte = listeMembres[i].compte;
            if (listeMembres[i].etat === "attente") {
                adversaire_trouve = true;
                adversaire = listeMembres[i].adversaire;
            }
        }
    }
// REDIRECTION VERS PAGE HTML SI JOUEUR DÉFIÉ

    if (adversaire_trouve === false) {
        page = fs.readFileSync('modele_joueurs_connectes.html','utf-8');
    } else if (adversaire_trouve === true) {
        page = fs.readFileSync("modele_demande_defi.html", "utf-8");
    }

    liste= "";
    for (i = 0; i < listeMembres.length; i++) {
        if (listeMembres[i].compte !== query.compte && listeMembres[i].etat === "connecté" && listeMembres[i].libre === "oui") {
            liste += "<form action = '/req_defier' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type = 'hidden' name='theme' value='"+ query.theme +"'><input type='submit' name='adversaire' value='"+ listeMembres[i].compte +"'></form>";
        }
    }

    marqueurs = {};
    marqueurs.joueurs = liste;
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


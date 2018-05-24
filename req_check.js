//---------------------------------------------------
//-----------Salon-attente----------------------------
//----------------------------------------------------
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var compte;
    var page;
    var theme;
    var i;
    var mdp;
    var trouve;
    var membre_salon;
    var fichier;
    var listeMembres;
    var liste;
    var test;

	// RECUPERATION DU JSON "salon.json"

    fichier = fs.readFileSync("salon.json", 'utf-8');
    listeMembres = JSON.parse(fichier);

	//  LE JOUEUR EST DANS LE SALON.JSON

    test = false;

    for(i = 0; i < listeMembres.length; i++){
        if(listeMembres[i].compte === query.compte){
            test = true;
            listeMembres[i].etat = "connecté";
            listeMembres[i].libre = "oui";
            fichier = JSON.stringify(listeMembres);
            fs.writeFileSync("salon.json", fichier, 'utf-8');
     }
    }

	// NOUVEAU JOUEU  REJOIND LE SALON  

    if(test === false){
        membre_salon = {};
        membre_salon.compte = query.compte;
        membre_salon.etat = "connecté";
        membre_salon.libre = "oui";
        membre_salon.adversaire = "non";
        listeMembres.push(membre_salon);

        fichier = JSON.stringify(listeMembres);
        fs.writeFileSync("salon.json", fichier, 'utf-8');
    }



        fichier = fs.readFileSync("salon.json", 'utf-8');
        listeMembres = JSON.parse(fichier);

    liste= "";
    for (i = 0; i < listeMembres.length; i++) {
        if (listeMembres[i].compte !== query.compte && listeMembres[i].etat === "connecté" && listeMembres[i].libre === "oui") {
            liste += "<form action = 'req_defier' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type= 'hidden' name= 'theme' value='"+ query.theme +"'><input type='submit' name='adversaire' value='"+ listeMembres[i].compte +"'></form>";
     }
    }

    page = fs.readFileSync("modele_joueurs_connectes.html", "UTF-8");

    marqueurs = {};
    marqueurs.compte = query.compte;
    marqueurs.theme = query.theme;
    marqueurs.mdp = query.mdp;
    marqueurs.adversaire = query.adversaire;
    marqueurs.joueurs = liste;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;

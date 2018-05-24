//=========================================================================
// Traitement de "req_identifier"
// Version : 24/04/2018
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var compte;
    var mdp;
    var page;
    var membre;
    var membre_salon;
    var contenu_fichier;
    var contenu_fichier_s;
    var listeMembres;
    var listeMembres_s;
    var i;
    var trouve;
    var trouve_s ;


    // ON LIT LES COMPTES EXISTANTS

    contenu_fichier = fs.readFileSync("membres.json", 'utf-8');    
    listeMembres = JSON.parse(contenu_fichier);
		
    // ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE

    trouve = false;
    i = 0;
    while(i<listeMembres.length && trouve === false) {
        if(listeMembres[i].compte === query.compte) {
            if(listeMembres[i].mdp === query.mdp) {
                trouve = true;
            }
        }
        i++;
    }

    // ON RENVOIT UNE PAGE HTML 

    if(trouve === false) {
        // SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR

        page = fs.readFileSync('modele_accueil.html', 'utf-8');

        marqueurs = {};
        marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
        marqueurs.compte = query.compte;
        page = page.supplant(marqueurs);

    } else if (trouve === true) {
        // SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE

        page = fs.readFileSync('modele_accueil_membre.html', 'UTF-8');
    
		//------------------------------------------------------------------
		//----------------- TRAITEMENT  SALON DE JEU DEFIER------------------

        contenu_fichier_s = fs.readFileSync("salon.json", 'utf-8');
        listeMembres_s = JSON.parse(contenu_fichier_s);

		// SI LE JOUEUR EST DÉJA DANS LE SALON.JSON

		trouve_s = false;
        for(i = 0; i < listeMembres_s.length; i++){
            if(listeMembres_s[i].compte === query.compte){
				trouve_s = true;
				listeMembres_s[i].etat = "connecté";
				listeMembres_s[i].libre = "non";
                contenu_fichier_s = JSON.stringify(listeMembres_s);
                fs.writeFileSync("salon.json", contenu_fichier_s, "utf-8");  
            }
        }

		// SINON 
		if(trouve_s === false){
			membre_salon = {};
            membre_salon.compte = query.compte;
            membre_salon.etat = "connecté";
            membre_salon.libre = "non";
            listeMembres_s.push(membre_salon);

            contenu_fichier_s = JSON.stringify(listeMembres_s);
            fs.writeFileSync("salon.json", contenu_fichier_s, "utf-8");
        }
		page = fs.readFileSync('modele_accueil_membre.html', "utf-8");

	};
		marqueurs = {};
		marqueurs.compte = query.compte;
		marqueurs.adversaire = query.adversaire;
        marqueurs.mdp = query.mdp;
        page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------
module.exports = trait;

//=========================================================================
// Traitement de "req_inscrire"
// Version : 24/04/2018
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var erreur;
	var compte;
	var mdp;
	var mdp2;
	var page;
	var nouveauMembre;
	var contenu_fichier;
	var listeMembres;
	var i;
	var taille_compte ;
	var taille_mdp ;
	var trouve;
	var nouveau;
	var nb_question_repondu = [];
	var pub;
	var pass;
	var histoire;
	var cg;
	var sport;
	var player_suivi;
	var nouveau_suivi;
	var registre;

	marqueurs = {};

    // ON LIT LES COMPTES EXISTANTS

    contenu_fichier = fs.readFileSync("membres.json", 'utf-8');    
    listeMembres = JSON.parse(contenu_fichier);
	
	 // ON VERIFIE SI L'USER SAISIS LES CHAMPS

    if ( query.compte === "" && query.mdp === "" && query.mdp2 === "" ) {

        page = fs.readFileSync('formulaire_inscription.html', 'utf-8');

	 erreur = "<center><font color='blue' face='Times New Roman' size='3'><span class='info'><link rel='stylesheet' href='sms.css' type='text/css'/>Veuillez saisir tous les champs </span></font></center>";
	 marqueurs.erreur = erreur;
	page = page.supplant(marqueurs);
    } else if ( query.compte === "" || query.mdp === "" || query.mdp2 === ""  ) {

        page = fs.readFileSync('formulaire_inscription.html', 'utf-8');

	 erreur = "<center><font color='blue' face='Times New Roman' size='3'><span class='info'><link rel='stylesheet' href='sms.css' type='text/css'/>Veuillez saisir tous les champs </span></font></center>";
         marqueurs.erreur = erreur;
	page = page.supplant(marqueurs);
    }

    // ON VERIFIE QUE LE COMPTE N'EXISTE PAS DEJA

    trouve = false;
    i = 0;
    while(i<listeMembres.length && trouve === false) {
        if(listeMembres[i].compte === query.compte) {
            trouve = true;
        }
        i++;
    }
	//VERIFICATION MOT DE PASSE 
		if(query.mdp === query.mdp2){
			pass = "identique"
		} else {
			pass = "different"
		}

    // SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES

    if (trouve === false) {
		console.log("test");
		nouveau = {"histoire":{"nb_question_repondu":[],"score":0,"compteur":0},"pub":{"nb_question_repondu":[],"score":0,"compteur":0},"cg":{"nb_question_repondu":[],"score":0,"compteur":0},"sport":{"nb_question_repondu":[],"score":0,"compteur":0}};

		registre = JSON.stringify(nouveau); 
		fs.writeFileSync("suivi_"+ query.compte +".json", registre, "UTF-8");
        nouveauMembre = {};
        nouveauMembre.compte = query.compte;
        nouveauMembre.mdp = query.mdp;
		taille_compte = nouveauMembre.compte.length;
		taille_mdp = nouveauMembre.mdp.length;
        listeMembres[listeMembres.length] = nouveauMembre;
			
			if ( taille_compte >= 4 && taille_mdp >= 4 && pass === "identique") {
        		contenu_fichier = JSON.stringify(listeMembres);

        		fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');

        // SI CREATION OK, ON ENVOIE PAGE DE CONFIRMATION

        page = fs.readFileSync('modele_confirmation_inscription.html', 'UTF-8');

        marqueurs.compte = query.compte;
        marqueurs.mdp = query.mdp;
        page = page.supplant(marqueurs);

   			 } else if (taille_compte < 4) {
        		page = fs.readFileSync( 'formulaire_inscription.html', 'utf-8');
			 erreur = "<center><font color='blue' face='Times New Roman' size='3'><span class='info'><link rel='stylesheet' href='sms.css' type='text/css'/>username doit contenir au moins 4 caracteres</span></font></center>";
			 marqueurs.erreur = erreur;
        		 marqueurs.compte = query.compte;
			page = page.supplant(marqueurs);
   			 } else if (taille_mdp <= 4 && pass === "identique") {
        		page = fs.readFileSync( 'formulaire_inscription.html', 'utf-8');
        		marqueurs.compte = query.compte;
			 erreur = "<center><font color='blue' face='Times New Roman' size='3'><span class='info'><link rel='stylesheet' href='sms.css' type='text/css'/>Le  password doit contenir au moins 4 caracteres</span></font></center>";
                         marqueurs.erreur = erreur;
			page = page.supplant(marqueurs);
			} else if (pass === "different" && taille_mdp >= 4) {
				 page = fs.readFileSync( 'formulaire_inscription.html', 'utf-8');
				marqueurs.compte = query.compte;
				 erreur = "<center><font color='blue' face='Times New Roman' size='3'><span class='info'><link rel='stylesheet' href='sms.css' type='text/css'/>Les passwords ne sont pas identiques </span></font></center>";
				 marqueurs.erreur = erreur;
				page = page.supplant(marqueurs);
			}else if (pass === "different") {
                                 page = fs.readFileSync( 'formulaire_inscription.html', 'utf-8');
                                marqueurs.compte = query.compte;
                                 erreur = "<center><font color='blue' face='Times New Roman' size='3'><span class='info'><link rel='stylesheet' href='sms.css' type='text/css'/>Les passwords ne sont pas identiques </span></font></center>";
                                 marqueurs.erreur = erreur;
                                page = page.supplant(marqueurs);
                        }

	};	

    // ON RENVOIT UNE PAGE HTML 

    if(trouve === true ) {
        // SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR

        page = fs.readFileSync('formulaire_inscription.html', 'utf-8');

	erreur = "<center><font color='red' face='Times New Roman' size='3'><span class='error'><link rel='stylesheet' href='sms.css' type='text/css'/> Ce compte existe deja </span></font></center>";
	 marqueurs.erreur = erreur;

        marqueurs.compte = query.compte;
        page = page.supplant(marqueurs);

    } 

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//---------------------------------------------------------------------------
module.exports = trait;

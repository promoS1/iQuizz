//=========================================================================
// Seveur jeu iQuizz
// Version : 24/04/2018
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var mon_serveur;
var port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./req_commencer.js");
var req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req_inscrire.js");
var req_identifier = require("./req_identifier.js");
var req_salon = require("./req_salon.js");
var req_actualiser_salon = require("./req_actualiser_salon.js");
var req_defier = require("./req_defier.js");
var req_attendre_reponse = require("./req_attendre_reponse.js");
var req_defier_oui = require("./req_defier_oui.js");
var req_defier_non = require("./req_defier_non.js");
var req_retour = require("./req_retour.js");
var req_corriger_duo = require("./req_corriger_duo.js");
var req_jouer_solo = require("./req_jouer_solo.js");
var req_corriger_solo = require("./req_corriger_solo.js");
var req_retourner_menu = require("./req_retourner_menu.js");

var req_statique = require("./req_statique.js");
var req_erreur = require("./req_erreur.js");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

    var ressource;
    var requete;
    var pathname;;
    var query;

    console.log("URL reçue : " + req.url);
    requete = url.parse(req.url, true);
    pathname = requete.pathname;
    query = requete.query;

    // ROUTEUR

    try {
        switch (pathname) {
            case '/':
            case '/req_commencer':
                req_commencer(req, res, query);
                break;
            case '/req_afficher_formulaire_inscription':
                req_afficher_formulaire_inscription(req, res, query);
                break;
            case '/req_inscrire':
                req_inscrire(req, res, query);
                break;
            case '/req_identifier':
                req_identifier(req, res, query);
                break;
            case '/req_salon':
                req_salon(req, res, query);
                break;
            case '/req_actualiser_salon':
                req_actualiser_salon(req, res, query);
                break;
            case '/req_defier':
                req_defier(req, res, query);
                break;
            case '/req_attendre_reponse':
                req_attendre_reponse(req, res, query);
                break;
            case '/req_defier_oui':
                req_defier_oui(req, res, query);
                break; 
			case '/req_defier_non':
                req_defier_non(req, res, query);
                break;
			case '/req_retour':
                req_retour(req, res, query);
                break;
            case '/req_corriger_duo':
                req_corriger_duo(req, res, query);
                break;
			case '/req_jouer_solo':
				req_jouer_solo(req, res, query);
				break;
			case '/req_corriger_solo':
				req_corriger_solo(req, res, query);
				break;
			case '/req_retourner_menu':
				req_retourner_menu(req, res, query);
				break;
            default:
                req_statique(req, res, pathname);
                break;
        }
    } catch (e) {
        console.log('Erreur : ' + e.stack);
        console.log('Erreur : ' + e.message);
        //console.trace();
        req_erreur(req, res, query);
    }
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

mon_serveur = http.createServer(traite_requete);
port = 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);

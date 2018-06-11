//=========================================================================
// Affichage d'une page d'erreur
// Version : 24/04/2018
//=========================================================================

"use strict";

var fs = require("fs");
var path = require("path");
"use strict";


var show_erreur = function (req, res, query) {

	var page;

	page = fs.readFileSync("modele_erreur.html");

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//--------------------------------------------------------------------------

module.exports = show_erreur;


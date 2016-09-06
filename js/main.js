/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
  'use strict';

  // Reloads extension panel
  function reloadPanel () {
    location.reload ();
  }

  var csInterface = new CSInterface ();

  function loadJSX (fileName) {
    var extensionRoot = csInterface.getSystemPath (SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript ('$.evalFile("' + extensionRoot + fileName + '")');
  }

  function init () {

    themeManager.init ();
    loadJSX ("json2.js");

    $ ("#btn_test").click (function () {
      csInterface.evalScript ("");
    });

    $ ("#btn_send").click (function () {
      csInterface.evalScript ('sendObjToHTML()', function (result) {
        var o   = JSON.parse (result);
//        var o = result;
        var str = "";
        for (var prop in o) {
          str += prop + " [" + typeof o[prop] + "]: " + o[prop] + ".\n";
        }
        console.log (o);
      });
    });

    $ ("#btn_refresh").click (reloadPanel);
    $ ("#btn_reload").click (function () {
      new CSInterface ().closeExtension ();
    });

  }

  init ();

} ());
    

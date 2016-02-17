'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Fixtures = new Module('fixtures');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Fixtures.register(function(app, auth, database, circles, swagger) {

    //We enable routing. By default the Package Object is passed to the routes
    Fixtures.routes(app, auth, database);

    Fixtures.aggregateAsset('css', 'fixtures.css');

    //We are adding a link to the main menu for all authenticated users
    Fixtures.menus.add({
        title: 'Fixtures',
        link: 'all fixtures',
        roles: ['anonymous'],
        menu: 'main'
    });

    Fixtures.menus.add({
        'roles': ['authenticated'],
        'title': 'New Fixture',
        'link': 'create fixture'
    });

    Fixtures.events.defaultData({
        type: 'post',
        subtype: 'fixture'
    });



    /**
      //Uncomment to use. Requires meanio@0.3.7 or above
      // Save settings with callback
      // Use this for saving data from administration pages
      Fixtures.settings({
          'someSetting': 'some value'
      }, function(err, settings) {
          //you now have the settings object
      });

      // Another save settings example this time with no callback
      // This writes over the last settings.
      Fixtures.settings({
          'anotherSettings': 'some value'
      });

      // Get settings. Retrieves latest saved settigns
      Fixtures.settings(function(err, settings) {
          //you now have the settings object
      });
      */

    return Fixtures;
});

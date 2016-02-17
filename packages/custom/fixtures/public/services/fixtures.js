'use strict';

//Fixtures service used for fixtures REST endpoint
angular.module('mean.fixtures').factory('Fixtures', ['$resource',
    function($resource) {
        return $resource('api/fixtures/:fixtureId', {
            fixtureId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

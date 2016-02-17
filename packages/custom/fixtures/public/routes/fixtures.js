'use strict';

//Setting up route
angular.module('mean.fixtures').config(['$stateProvider',
    function fixtures($stateProvider) {

        // states for my app
        $stateProvider
            .state('all fixtures', {
                url: '/fixtures',
                templateUrl: '/fixtures/views/list.html'
            })
            .state('create fixture', {
                url: '/fixtures/create',
                templateUrl: '/fixtures/views/create.html',
                requiredCircles: {
                    circles: ['can create content']
                }
            })
            .state('edit fixture', {
                url: '/fixtures/:fixtureId/edit',
                templateUrl: '/fixtures/views/edit.html',
                requiredCircles: {
                    circles: ['can edit content']
                }
            })
            .state('fixture by id', {
                url: '/fixtures/:fixtureId',
                templateUrl: '/fixtures/views/view.html'
            });
    }
]);

'use strict';

//Setting up route
angular.module('mean.videos').config(['$stateProvider',
    function videos($stateProvider) {

        // states for my app
        $stateProvider
            .state('all videos', {
                url: '/videos',
                templateUrl: '/videos/views/list.html'
            })
            .state('create video', {
                url: '/videos/create',
                templateUrl: '/videos/views/create.html',
                requiredCircles: {
                    circles: ['can create content']
                }
            })
            .state('edit video', {
                url: '/videos/:videoId/edit',
                templateUrl: '/videos/views/edit.html',
                requiredCircles: {
                    circles: ['can edit content']
                }
            })
            .state('video by id', {
                url: '/videos/:videoId',
                templateUrl: '/videos/views/view.html'
            });
    }
]);

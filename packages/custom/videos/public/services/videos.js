'use strict';

//Videos service used for videos REST endpoint
angular.module('mean.videos').factory('Videos', ['$resource',
  function($resource) {
    return $resource('api/videos/:videoId', {
      videoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

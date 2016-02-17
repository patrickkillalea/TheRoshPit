'use strict';

angular.module('mean.videos').controller('VideosController', ['$scope', '$stateParams', '$location', 'Global', 'Videos', 'MeanUser', 'Circles',
    function($scope, $stateParams, $location, Global, Videos, MeanUser, Circles, VideosController) {
        $scope.global = Global;

        $scope.hasAuthorization = function(video) {
            if (!video || !video.user) return false;
            return MeanUser.isAdmin || video.user._id === MeanUser.user._id;
        };

        $scope.availableCircles = [];

        Circles.mine(function(acl) {
            $scope.availableCircles = acl.allowed;
            $scope.allDescendants = acl.descendants;
        });

        $scope.showDescendants = function(permission) {
            var temp = $('.ui-select-container .btn-primary').text().split(' ');
            temp.shift(); //remove close icon
            var selected = temp.join(' ');
            $scope.descendants = $scope.allDescendants[selected];
        };

        $scope.selectPermission = function() {
            $scope.descendants = [];
        };

        $scope.create = function(isValid) {
            if (isValid) {
                // $scope.video.permissions.push('test test');
                var video = new Videos($scope.video);

                video.$save(function(response) {
                    $location.path('videos/' + response._id);
                });

                $scope.video = {};

            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(video) {
            if (video) {
                video.$remove(function(response) {
                    for (var i in $scope.videos) {
                        if ($scope.videos[i] === video) {
                            $scope.videos.splice(i, 1);
                        }
                    }
                    $location.path('videos');
                });
            } else {
                $scope.video.$remove(function(response) {
                    $location.path('videos');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var video = $scope.video;
                if (!video.updated) {
                    video.updated = [];
                }
                video.updated.push(new Date().getTime());

                video.$update(function() {
                    $location.path('videos/' + video._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Videos.query(function(videos) {
                $scope.videos = videos;
            });
        };

        $scope.findOne = function() {
            Videos.get({
                videoId: $stateParams.videoId
            }, function(video) {
                $scope.video = video;
            });
        };
    }
]);

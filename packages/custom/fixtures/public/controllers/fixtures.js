'use strict';

angular.module('mean.fixtures').controller('FixturesController', ['$scope', '$stateParams', '$location', 'Global', 'Fixtures', 'MeanUser', 'Circles',
    function($scope, $stateParams, $location, Global, Fixtures, MeanUser, Circles, FixturesController) {
        $scope.global = Global;

        $scope.hasAuthorization = function(fixture) {
            if (!fixture || !fixture.user) return false;
            return MeanUser.isAdmin || fixture.user._id === MeanUser.user._id;
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
                // $scope.fixture.permissions.push('test test');
                var fixture = new Fixtures($scope.fixture);

                fixture.$save(function(response) {
                    $location.path('fixtures/' + response._id);
                });

                $scope.fixture = {};

            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(fixture) {
            if (fixture) {
                fixture.$remove(function(response) {
                    for (var i in $scope.fixtures) {
                        if ($scope.fixtures[i] === fixture) {
                            $scope.fixtures.splice(i, 1);
                        }
                    }
                    $location.path('fixtures');
                });
            } else {
                $scope.fixture.$remove(function(response) {
                    $location.path('fixtures');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var fixture = $scope.fixture;
                if (!fixture.updated) {
                    fixture.updated = [];
                }
                fixture.updated.push(new Date().getTime());

                fixture.$update(function() {
                    $location.path('fixtures/' + fixture._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Fixtures.query(function(fixtures) {
                $scope.fixtures = fixtures;
            });
        };

        $scope.findOne = function() {
            Fixtures.get({
                fixtureId: $stateParams.fixtureId
            }, function(fixture) {
                $scope.fixture = fixture;
            });
        };
    }
]);

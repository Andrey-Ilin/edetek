angular.module("edetek.controllers", []);
angular.module("edetek.services", []);
angular.module('edetek.filters', []);

angular.module("edetek", [
    "edetek.controllers",
    "edetek.services",
    "edetek.filters",
    "ui.router"
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('departments', {
                url: '/departments',
                templateUrl: 'templates/departmentsTmpl.html',
                controller: 'controllers.View'
            })
            .state('employees', {
                url: '/employees/:id',
                templateUrl: 'templates/employeesTmpl.html',
                controller: function($scope, $stateParams, $http) {
                    $scope.departmenId = $stateParams.id;
                    $http({method: 'GET', url: 'http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/departments/'})
                        .then (function (response) {
                            $scope.departments = response.data;
                        })
                    }

            });
        $urlRouterProvider.otherwise('/departments');
    });


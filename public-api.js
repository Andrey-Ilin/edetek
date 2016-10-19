angular.module("edetek.controllers", []);
angular.module("edetek.services", []);
angular.module('edetek.filters', []);

angular.module("edetek", [
    "edetek.controllers",
    "edetek.services",
    "edetek.filters",
    "ui.router"
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('departments', {
                url: '/departments',
                templateUrl: 'templates/departmentsTmpl.html',
                controller: 'controllers.View'
            })
            .state('employees', {
                url: '/employees/:id',
                templateUrl: 'templates/employeesTmpl.html',
                controller: function($scope, $stateParams) {
                    console.log($stateParams.id);
                    $scope.departmenId = $stateParams.id;

                    $scope.currentDepartment = $scope.departments.filter(function(item, id) {
                        return item.id === id;
                    })[0]

                    console.log($scope.currentDepartment)
                }
            })
    });


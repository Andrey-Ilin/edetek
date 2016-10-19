angular.module('edetek.controllers').controller('controllers.View',
    ['$scope', '$filter', 'services.Api', function ($scope, $filter, api) {
        $scope.departments = null
        $scope.newDepartment = {};
        $scope.newEmployee = {};
        $scope.addDepartmentInputs = false;
        $scope.employees = null;

        getDepartments();
        getEmployees();

        $scope.addDepartment = function (departmentName, departmentDescription) {
            api.addDepartment(departmentName, departmentDescription)
                .then(function () {
                    getDepartments();
                    $scope.newDepartment = {};
                    $scope.addDepartmentInputs = false;
                })
        };

        $scope.deleteDepartment = function (departmentId) {
            api.deleteDepartment(departmentId)
                .then(function () {
                    getDepartments();
                })
        }

        $scope.addEmployee = function(firstName, lastName, phone, salary, departmentId, departmentName){
            api.addEmployee(firstName, lastName, phone, salary, departmentId, departmentName).then(function(response) {
                $scope.employees.push(response);
                getEmployees();
            })
        };

        $scope.deleteEmployee = function(employeeId) {
            api.deleteEmployee(employeeId).then(function() {
                getEmployees();
            })
        }

        $scope.showAddDepartmentInputs = function() {
            $scope.addDepartmentInputs = !$scope.addDepartmentInputs;
        }
        
        $scope.filterByDepartmentId = function(id) {
            return function(employee) {
                if (!employee) {
                    return;
                }
                if (employee.departmentId === id) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        function getDepartments() {
            api.getDepartments().then(function (response) {
                $scope.departments = response;
            });
        }
        
        function getEmployees() {
            api.getEmployees()
                .then(function(response) {
                    $scope.employees = response;
                })
        }
    }]);
angular.module('edetek.controllers').controller('controllers.View',
    ['$scope', 'services.Api', function ($scope, api) {
        $scope.departments = null
        $scope.newDepartment = {};
        $scope.newEmployee = {};
        $scope.addDepartmentInputs = false;
        $scope.employees = null;
        $scope.showEmployeeForm = false;

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
        };

        $scope.addEmployee = function(firstName, lastName, phone, salary, departmentId, departmentName){
            api.addEmployee(firstName, lastName, phone, salary, departmentId, departmentName).then(function(response) {
                $scope.employees.push(response);
                $scope.showEmployeeForm = false;
                $scope.newEmployee = {};
                getEmployees();
            })
        };

        $scope.deleteEmployee = function(employeeId) {
            api.deleteEmployee(employeeId).then(function() {
                getEmployees();
            })
        };

        $scope.showAddDepartmentInputs = function() {
            $scope.addDepartmentInputs = !$scope.addDepartmentInputs;
        };

        $scope.showAddEmployeeForm = function() {
            $scope.showEmployeeForm = !$scope.showEmployeeForm;
        };

        $scope.backBattonClicked = function() {
            $scope.showEmployeeForm = false;
        };

        $scope.cancelAddEmployee = function() {
            $scope.showEmployeeForm = false;
            $scope.newEmployee = {};
        };

        $scope.filterByDepartmentIdForEmployees = function(id) {
            id = +id;
            return function(item) {
                if (!item) {
                    return;
                }
                if (item.departmentId === id) {
                    return true;
                } else {
                    return false;
                }
            }
        };

        $scope.filterByDepartmentIdForDepartments = function(id) {
            id = +id;
            return function(item) {
                if (!item) {
                    return;
                }
                if (item.id === id) {
                    return true;
                } else {
                    return false;
                }
            }
        };

        function getDepartments() {
            api.getDepartments().then(function (response) {
                $scope.departments = response;
                $scope.departments.forEach(function (department) {
                    department.hasEmployees = false;
                    getEmployeesAmount(department.id).then(function (response) {
                        department.hasEmployees = !response;
                    })
                })
            });
        }

        function getEmployeesAmount(departmentId) {
            return api.getEmployeesAmount(departmentId).then(function(response){
                return response.count
            })
        }
        
        function getEmployees() {
            api.getEmployees()
                .then(function(response) {
                    $scope.employees = response;
                })
        }
    }]);
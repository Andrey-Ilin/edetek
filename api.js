angular.module("edetek.services").factory("services.Api",
    ['$q', '$http',
        function ($q, $http) {
            return {
                getDepartments: function () {
                    var defered = $q.defer();
                    $http({
                        method: 'GET',
                        url: "http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/departments/"
                    })
                        .success(function (data) {
                            defered.resolve(data);
                        });
                    return defered.promise;
                },

                addDepartment: function (name, description) {
                    var defered = $q.defer();
                    $http({
                        method: 'POST',
                        url: "http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/departments",
                        data: {
                            name: name,
                            description: description
                        }
                    })
                        .success(function (data) {
                            defered.resolve(data);
                        });
                    return defered.promise;
                },

                deleteDepartment: function(departmentId) {
                    var defered = $q.defer();
                    $http({
                        method: 'DELETE',
                        url: "http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/departments/" + departmentId,
                    })
                        .success(function (data) {
                            defered.resolve(data);
                        });
                    return defered.promise;
                },

                getEmployees: function () {
                    var defered = $q.defer();
                    $http({
                        method: 'GET',
                        url: "http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/employees/"
                    })
                        .success(function (data) {
                            defered.resolve(data);
                        });
                    return defered.promise;
                },

                addEmployee: function(firstName, lastName, phone, salary, departmentId, departmentName) {
                    var defered = $q.defer();
                    $http({
                        method: 'POST',
                        url: "http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/employees/",
                        data: {
                            firstName: firstName,
                            lastName: lastName,
                            phone: phone,
                            salary: salary,
                            departmentId: departmentId,
                            departmentName: departmentName
                        }
                    })
                        .success(function (data) {
                            defered.resolve(data);
                        });
                    return defered.promise;
                },
                
                deleteEmployee: function(employeeId) {
                    var defered = $q.defer();
                    $http({
                        method: 'DELETE',
                        url: "http://ebsexpress-env.us-west-2.elasticbeanstalk.com/users/employees/" + employeeId,
                    })
                        .success(function (data) {
                            defered.resolve(data);
                        });
                    return defered.promise;
                }
            }
        }]);

angular.module('starter.services', [

])

.service('BranchesService', function ($http, $q, $localstorage, $rootScope, SocketFactory) {
   
    var branches;
    var services;
    var service;
    var branchId;
    var branch;
    var ticket;
    var serverAddress ='http://localhost:5000'
    //get allanches

    $rootScope.$on("_ticketUpdated", function (event, data) {
        console.log("_ticketUpdated recieved", event)
        console.log("_ticketUpdated recieved data", data)
        ticket = data;
        $rootScope.$broadcast('ticketUpdated', ticket);
       
    })

    this.getBranchesData = function () {
        if (branches){
            var q = $q.defer();
            q.resolve(branches);
            return q.promise;
        }else{

            return $http.get( serverAddress + '/rest/branches')
            .then(function(response){
                branches = response.data;
                return branches;
            
            }); 
        }
    }
    // get branch with a specific Id
    this.getBranch = function (branchId) {
        return $http.get(serverAddress + '/rest/branches/' + branchId)
        .then(function (response) {
                branch = response.data;
                return branch;
            
        })
    }
    // get all the services in a branch (parameter branchId)
    this.getBranchServicesData = function (_id) {
        return $http.get(serverAddress + '/rest/branches/'+ _id +/services/)
        .then(function (response) {
            return {
                services: response.data
            }
        })
    }
    // get a single service from the branch      /branch/:branchId/service/:serviceId
    this.getServiceData = function (branchId, serviceId) {
        return $http.get(serverAddress + '/rest/branches/' + branchId + /services/ + serviceId)
        .then(function(response){
            {      
                service = response.data;
                return service;
            }
       })
    }
    // get ticket 
     var  getCurrentTicket= function () {
       
        if (ticket !== undefined) {
            var q = $q.defer();
            q.resolve(ticket);
            return q.promise;
        }
        var ticketFromStorage = $localstorage.getTicket("ticket");
        if (ticketFromStorage !== null && ticketFromStorage !== undefined) {
            console.log(ticketFromStorage);

            return $http.get(serverAddress + '/rest/branches/' + ticketFromStorage.branchId + /services/ + ticketFromStorage.serviceId + /tickets/ + ticketFromStorage._id)
              .then(function (response) {
                  ticket = response.data;
                   $localstorage.setTicket('ticket', ticket);
                   
                      return ticket;
              })
            
        }
        var q = $q.defer();
        q.reject("TicketNot Found");
        return q.promise;
      
    }

    //create ticket
    this.createTicket = function (branchId, serviceId) {
        console.log("createing Ticket ")
        if (ticket !== undefined) {
            var q = $q.defer();
            q.reject("Delete ticket first");
            return q.promise;
        }
        var data = {
            branchId : branchId,
            serviceId: serviceId
        }
        return $http.post(serverAddress + '/rest/branches/' + branchId + /services/ + serviceId + /printTicket/, data)
        .then(function (response) {
            ticket = response.data
            console.log("Ticket reated, storing...", ticket)
              
                $localstorage.setTicket('ticket', ticket);
                console.log("Ticket created, stored")
                console.log("Ticket created, pushing 'ticketCreated' event")
                SocketFactory.createWsConnection();
                return ticket;
            
        })
    }
    //remove 
    this.removeCurrentTicket = function () {

        getCurrentTicket().then(function (t) {
            SocketFactory.cancelTicketWatch(t);
            $localstorage.destroyTicket();
            ticket = undefined;

            $rootScope.$broadcast('ticketRemoved');
            
        }
        );
       
       
    }
    this.getCurrentTicket=getCurrentTicket;
})



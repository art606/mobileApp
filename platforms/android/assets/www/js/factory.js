angular.module('starter.factory', [
  
])

.factory('$localstorage', ['$window', function($window) {
    return {
        setTicket: function (key, value) {
            $window.localStorage[key] = angular.toJson(value);
        },
        getTicket: function (key) {
            return angular.fromJson($window.localStorage[key]);
        },
        destroyTicket: function () {
            return localStorage.clear();
        },
    }
}])

.service('SocketFactory', ['$q', '$rootScope', function ($q, $rootScope) {
    //  return this object to anything injecting the service
    var wsConnection ;
    var serverAddress = 'ws://localhost:5000';

    $rootScope.$on("ticketCreated", function (event, data) {

        //createWsConnection(serverAddress+'/sockets/');

        // connectToWSCHannel
        // sendWatchCommand
    })

    function createWsConnection() {
        console.log("createWsConnection");
        wsConnection = new WebSocket(serverAddress + '/sockets/');
        wsConnection.onmessage = onMessage;
        wsConnection.onclose = onclose;
        wsConnection.onopen = onopen;
        
       
    }

    var Service = {};
    //'ws://arcane-mountain-8166.herokuapp.com'; //'localhost:5000'
    // Create websocket object with the address to the websocket
    function onopen() {
        console.log("Socket has been opened!");
        console.log("pushing webcocketReady event")
        $rootScope.$broadcast("webcocketReady");
    };

    function onclose(data) {
        console.log("Websocket closing.", data)
        $rootScope.$broadcast("webcocketClosed");
    };
    

    function waitForSocketConnection(socket, callback) {
        console.log("waitForSocketConnection... ");
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    console.log("waitForSocketConnection ready");
                    if (callback !== undefined) {
                        callback();
                    }
                    return;
                } else {
                    console.log("waitForSocketConnection...  not Ready");
                    waitForSocketConnection(socket, callback);
                }
            }, 5);
    };

    function sendWSRequest(operation, data) {

       // while ()
        console.log('Sending WSRequest operation:' + operation, data);
       // waitForSocketConnection(wsConnection, function () {
            wsConnection.send(JSON.stringify({operation : operation, data:data}));
       // })
    }
   

    function onMessage(message) {
        var data = JSON.parse(message.data);
        console.log("Received message on websocket: ", data);
        switch (data.operation) {
            case 'TICKET_UPDATED':
                $rootScope.$broadcast('_ticketUpdated', data.data);
               // onTicketUpdate(data.data);
                break;
            case 'TICKET_WATCH_STARTED':

            default:
                $rootScope.$broadcast('ticketWatchStarted', data.data);
        }
    }

   
    return {
        // Define a "getter" for getting customer data
        watchTicket: function (ticket) {
           
            sendWSRequest("WATCH_TICKET", ticket);
        },
        cancelTicketWatch: function (ticket) {

            sendWSRequest("CANCEL_WATCH_TICKET", ticket);

        },
        createWsConnection: createWsConnection
        ,
        sendWSRequest: sendWSRequest
    }

}])
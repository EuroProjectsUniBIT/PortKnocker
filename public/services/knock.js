'use strict';

angular.module('myApp')
  .service('KnockRequester', ['$http', '$location', function($http, $location) {
    this.sendKnock = function(input) {

      var ip = input.ip;
      var port = input.port | null;

      if (input.protocol === "icmp") {
        $http.get($location.$$protocol + '://' + $location.$$host + ':' + $location.$$port + '/ping?ip=' + ip).then(function(result) {
          console.log('ICMP request IP: ' + ip + 'PORT:' + port);
          console.log($location.$$protocol + '://' + $location.$$host + ':' + $location.$$port + '/ping?ip=' + ip);
        });
      }

      if (input.protocol === "tcp") {
        // console.log('http://localhost:3000/tcp?ip=' + ip + '&port=' + port);
        $http.get($location.$$protocol + '://' + $location.$$host + ':' + $location.$$port + '/tcp?ip=' + ip + '&port=' + port).then(function(result) {
          console.log('TCP request IP: ' + ip + 'PORT:' + port);
          console.log($location.$$protocol + '://' + $location.$$host + ':' + $location.$$port + '/ping?ip=' + ip);
        });
      }


    };
  }]);

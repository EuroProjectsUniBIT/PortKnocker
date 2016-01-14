angular.module('myApp')
  .service(('testService'), [function() {
    this.test = function() {
      console.log('test');
    };
  }]);

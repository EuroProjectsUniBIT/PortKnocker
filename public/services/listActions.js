angular
  .module('myApp')
  .service('listActions', listActions);

function listActions() {
  this.removeListElement = function(list, index) {
    list.splice(index, 1);
    // saveToLocal();
  };

  this.moveListElement = function(list, from, to) {
    if (to >= 0) {
      list.splice(to, 0, list.splice(from, 1)[0]);
    }
    // saveToLocal();
  };

  this.addElementToList = function(list) {
    console.log('lol');
    list.push({
      ip: '127.0.0.1',
      port: '80',
      protocol: 'tcp'
    });
    // saveToLocal();
  };
}

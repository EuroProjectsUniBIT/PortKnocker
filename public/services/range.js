angular.module('myApp')
  .service('RangeService', [function() {
    this.Quantity = function(numOfPcs) {
      var qty = numOfPcs;
      var dozens = numOfPcs / 12;

      this.__defineGetter__("qty", function() {
        return qty;
      });

      this.__defineSetter__("qty", function(val) {
        val = parseInt(val);
        qty = val;
        dozens = val / 12;
      });

      this.__defineGetter__("dozens", function() {
        return dozens;
      });

      this.__defineSetter__("dozens", function(val) {
        dozens = val;
        qty = val * 12;
      });
    };
  }]);

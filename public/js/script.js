$(document).ready(function() {
  $.support.transition = false;
  $("body").tooltip({
    selector: '[data-toggle=tooltip]'
  });

  $('[data-toggle="confirmation"]').confirmation('toggle');

  
});

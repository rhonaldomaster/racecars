// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
var racecars = (function () {
  var redcar = {};
  var bluecar = {};
  var createCar = function (img,speed,className,keyAdvance) {
    var $view = $("."+className);
    $view.prop("src",img);
    return {
      image: img,
      speed: speed,
      keyAdvance: keyAdvance,
      move: function () {
        var mleft = ($view.css("margin-left"));
        mleft = mleft.substring(0,mleft.length-2);
        mleft *=1;
        $view.css("margin-left",(mleft+speed)+"px");
      },
      $view: $view
    };
  };
  var initializeCars = function() {
    redcar = createCar("assets/car-red.png",25,"js-redcar",83);
    bluecar = createCar("assets/car-blue.png",25,"js-bluecar",87);
    setControls();
  };
  var setControls = function(){
    $("body").off("keyup");
    $("body").on("keyup",function(ev) {
      if(ev.which==redcar.keyAdvance){
        redcar.move();
      }
      else if(ev.which==bluecar.keyAdvance){
        bluecar.move();
      }
      if(redcar.$view.css("margin-left")>bluecar.$view.css("margin-left")){
        $(".js-raceResult").html("Va ganando rojo");
      }
      else if(redcar.$view.css("margin-left")<bluecar.$view.css("margin-left")){
        $(".js-raceResult").html("Va ganando azul");
      }
      else {
        $(".js-raceResult").html("");
      }
    });
  };
  return{
    initializeCars: initializeCars,
    setControls: setControls
  }
})();
$(document).ready(function () {
  racecars.initializeCars();
});

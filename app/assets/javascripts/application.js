//= require jquery
var racecars = (function () {
  var redcar = {};
  var bluecar = {};
  var $raceresult;
  var createCar = function (img,speed,className,keyAdvance) {
    var $view = $("."+className);
    $view.prop("src",img);
    return {
      image: img,
      speed: speed,
      keyAdvance: keyAdvance,
      points: 0,
      move: function () {
        var mleft = ($view.css("margin-left"));
        mleft = mleft.substring(0,mleft.length-2);
        mleft *=1;
        $view.css("margin-left",(mleft+speed)+"px");
      },
      addPoints: function () {
        this.points += 1;
      },
      $view: $view
    };
  };
  var init = function() {
    redcar = createCar("assets/car-red.png",25,"js-redcar",83);
    bluecar = createCar("assets/car-blue.png",25,"js-bluecar",87);
    setControls();
    $('.js-btn-restart').off('click').on('click',function () {
      resetGame();
    });
  };
  var setControls = function(){
    $("body").off("keyup").on("keyup",function(ev) {
      $raceresult = $(".js-raceResult");
      if(ev.which==redcar.keyAdvance) redcar.move();
      else if(ev.which==bluecar.keyAdvance) bluecar.move();
      if(redcar.$view.css("margin-left")>bluecar.$view.css("margin-left")) $raceresult.html("Va ganando rojo");
      else if(redcar.$view.css("margin-left")<bluecar.$view.css("margin-left")) $raceresult.html("Va ganando azul");
      else $raceresult.html("");
      reviewRace();
    });
  };
  var reviewRace = function () {
    var tam = pxToNumber($('.js-road').css("width")) - pxToNumber($('.js-goal').css("height")) - 25;
    var posr = pxToNumber(redcar.$view.css("margin-left")) + pxToNumber(redcar.$view.css("width"));
    var posb = pxToNumber(bluecar.$view.css("margin-left")) + pxToNumber(bluecar.$view.css("width"));
    if(posr>=tam || posb>=tam){
      if(posr>=tam){
        $raceresult.html("Gana rojo");
        redcar.addPoints();
      }
      if(posb>=tam){
        $raceresult.html("Gana azul");
        bluecar.addPoints();
      }
      $("body").off("keyup");
      viewResults();
    }
  };
  var pxToNumber = function (px) {
    var num = px.substring(0,px.length-2);
    num *= 1;
    return num;
  };
  var resetGame = function() {
    redcar.$view.css("margin-left",0);
    bluecar.$view.css("margin-left",0);
    setControls();
    $raceresult.html("");
  };
  var viewResults = function () {
    $('.js-wins-blue').html(bluecar.points);
    $('.js-wins-red').html(redcar.points);
  };
  return{
    init: init
  };
})();
$(document).ready(function () {
  racecars.init();
});

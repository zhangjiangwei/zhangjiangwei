window.zz = {};
zz.init=function(){
  zz.createStage();
}
zz.createStage = function () {

  var site = new createjs.Stage('canvas');
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", site);
  createjs.Ticker.userRAF = true;
  createjs.Touch.enable(site);

  var layer = new createjs.Container();

  site.addChild(layer);
  this.site = site;
  this.layer = layer;
};
$(document).ready(function () {
  zz.init();
});
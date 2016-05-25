this.zz = this.zz||{};
zz.loading=function(){
	var Bg = new createjs.Shape();
	Bg.graphics.beginFill('#ffff00',.5);
	Bg.graphics.drawRect(0,0,this.stage.width,this.stage.height);
	this.txt = '游戏正在加载中……';
	this.loadBg = Bg;
}
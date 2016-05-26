this.zz = this.zz||{};
zz.loading=function(){
	var Bg = new createjs.Shape();
	Bg.graphics.beginFill('#ffff00',.5);
	Bg.graphics.drawRect(0,0,this.stage.width,this.stage.height);
	this.txt = '游戏正在加载中……';
	var text = new createjs.Text(this.txt,"20px Arial","#ff7700");	
	text.x = (this.stage.width-text.width)/2;
	text.y=(this.stage.height-text.height)/2;
	this.loadBg = Bg;
	this.loadBg.addChild(text);
	this.stage.addChild(this.loadBg);
}
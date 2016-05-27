this.zz=this.zz||{};
zz.run=function(){
	var isRunning = false;
	if(isRunning) return;
	isRunning = true;
	console.log("gameStart!");
	// 初始化显示列表
	this.createStage();
	this.main();
};

this.zz = this.zz||{};
zz.main=function(){
	/**
	*加载进度界面
	*/
	this.loading();
	// initialize the Resource loading library
    //初始化Resource资源加载库
	// this.loadingView.addEventListener("event")
	// this.createScene();
};
this.zz = this.zz||{};
zz.engin=function(){
	this.init=function(){
		
	}
}

this.zz = this.zz||{};
zz.loading=function(){

	var bar;
	var barBg;
	var loaderBar;
	var imageContainer;
	var currentImage;
	var loaderWidth;
	var loaderHeight;
	var loaderColor;
	var borderPadding;
	var preload;
	var oldItem;

	loaderColor = createjs.Graphics.getRGB(0,247,247);
	loaderBar = new createjs.Container();
	loaderHeight = 10;

	bar = new createjs.Shape();
	bar.graphics.beginFill(loaderColor);
	bar.graphics.drawRect(0,0,1,loaderHeight);
	bar.graphics.endFill();

	imageContainer = new createjs.Container();
	imageContainer.x = 0;
	imageContainer.y = 0;

	loaderWidth = 480;

	barBg = new createjs.Shape();
	barBg.graphics.setStrokeStyle(1);
	barBg.graphics.beginStroke(loaderColor);
	barBg.graphics.drawRect(0,0,loaderWidth,loaderHeight);
	barBg.graphics.endFill();
	loaderBar.addChild(bar,barBg);

	var loadtxt = "Loading......";
	var text = new createjs.Text(loadtxt, "36px Arial", "#EEEEEE");
	text.textBaseline = "middle";
	text.x = 20;
	text.y = 400;//this.height / 2;
	var loadNum = 0;
	text.text = loadtxt+loadNum+"%";

	this.loadView.addChild(loaderBar,text);
	var _w=0
	var go_f = setInterval(function(){
		loadNum++;
		_w+=4.8;
		bar.graphics.beginFill(loaderColor);
		bar.graphics.drawRect(0,0,_w,loaderHeight);
		text.text = loadtxt+loadNum+"%";
		if(loadNum>=100){
			clearInterval(go_f);
			zz.loadView.visible = false;
			zz.engin.init();
		}
	},60)
}

zz.createStage=function(){
	var canvas =  document.createElement("canvas");
	canvas.width = 480;
  	canvas.height = 800;
	var context = canvas.getContext("2d");
	$('#myView').append(canvas);

	var site = new createjs.Stage(canvas);
	var _width = 480;
	var _height = 800;
	this.width = site.width = _width;
	this.height = site.height = _height;
	createjs.Ticker.addEventListener("tick",site);
	this.view = new createjs.Container();
	this.loadView = new createjs.Container();
	this.stage = new createjs.Container();
	var bg = new createjs.Shape();
	bg.graphics.beginFill("#990066");
	bg.graphics.drawRect(0,0,_width,_height)
	bg.graphics.endFill();
	bg.alpha = 0.3;
	site.addChild(bg,this.stage);
	this.stage.addChild(this.view,this.loadView);
}
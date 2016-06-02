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
	this.createScene();
};

this.zz =this.zz||{};
zz.mapUI = function(){

};
zz.createScene=function(){
	var self = this;
	var _width = 10;
	var _height = 10;
	var bitMap=function(_rX,_rY,_x,_y,_w,_h,_a){
		_rX = _rX||0;
		_rY = _rY||0;
		_x = _x ||0;
		_y = _y ||0;
		_w = _w || 100;
		_h = _h || 100;
		_a = _a || 1;
		var s=new createjs.Shape();
		s.graphics.setStrokeStyle(3);
	 	s.graphics.beginStroke("#ffffff");
		s.graphics.beginFill("#ff00ff").drawRect(_rX,_rY,_w,_h);
		s.alpha = _a;
		s.x = _x;
		s.y = _y;
		return s;
	};
	var mapId = 0;
<<<<<<< HEAD
	mapUI.pos=new self.Astar();
=======
	self.mapUI.pos = new self.Astar();

>>>>>>> dev
	posHandler=function(e){
		mapId ++;
		console.log(mapId);
		if(mapId>=3){
			mapId=0;
		}
		var arr = (e.target.name).split('_');
		self.mapUI.pos = new self.Astar()
		if(mapId==1){
<<<<<<< HEAD
			var arr = [20,30]
			mapUI.pos.setPos(arr);
=======
			self.mapUI.pos.setPos(mapId,arr);
		}else if(mapId==2){
			self.mapUI.pos.setPos(mapId,arr);
>>>>>>> dev
		}
	};
	for(var i=0;i<48;i++){
		for(var j=0;j<40;j++){
			var _name = i+"_"+j;
			// self.mapUI.arr.push(_name);
			self.mapUI.ui = new bitMap(0,0,0,0,_width,_height,0.3);
			self.mapUI.ui.x = i * _width;
			self.mapUI.ui.y = j * _height;
			self.mapUI.ui.name = _name;
			self.mapUI.ui.addEventListener('click',posHandler);
			self.view.addChild(self.mapUI.ui);
		}
	}
	
};

this.zz = this.zz||{};
zz.engin=function(){
	var self = this;
	var eg = new createjs.Container();

	var padding = 4;
	var width = this.width-padding;
	var height = this.height/2-4
	var e_color = "#336699"
	var e = new createjs.Shape();
	e.graphics.setStrokeStyle(1);
	e.graphics.beginStroke(e_color);

	e.graphics.drawRect(0,0,width,height);
	e.graphics.endFill();
	e.x = padding/2;e.y = padding/2;
	eg.addChild(e);
	//小圆点
	var radius = 10;
	var g_color = "#aaff00";
	var g = new createjs.Shape();
	g.graphics.setStrokeStyle(1);
	g.graphics.beginStroke(g_color);
	g.graphics.beginFill(g_color);
	g.graphics.drawCircle(0,0,radius);
	g.graphics.endFill();
	g.x = 0;
	g.y = 0;
	this.ng = g;
	eg.addChild(g);
	self.view.addChild(eg);
	this.init=function(){

	}
}

this.zz = this.zz||{};
zz.loading=function(){
	var self = this;
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

	var imageBg = new createjs.Shape();
	imageBg.graphics.beginFill("#990066");
	imageBg.graphics.drawRect(0,0,self.width,self.height);
	imageBg.graphics.endFill();
	imageContainer.addChild(imageBg);

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

	this.loadView.addChild(imageContainer,loaderBar,text);
	var _w=0
	var go_f = setInterval(function(){
		loadNum++;
		_w+=4.8;
		bar.graphics.beginFill(loaderColor);
		bar.graphics.drawRect(0,0,_w,loaderHeight);
		text.text = loadtxt+loadNum+"%";
		if(loadNum>=100){
			clearInterval(go_f);
			self.loadView.visible = false;
			self.engin();
		}
	},10)
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
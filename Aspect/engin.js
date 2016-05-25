/**
*zhangjiangwei@16-5-23
*创建游戏地图引擎
*/
this.zz = this.zz||{};

zz.runEngin=function(){
	var isRunning = false;
	if(isRunning) return;
	isRunning = true;
	console.log("gameStart!");
	this.stage($('#myView'));
	this.Main();
};

zz.Main=function(){
	/**
	*加载进度界面
	*/
	this.loadingView = new zz.LoadingUI();
	// initialize the Resource loading library
    //初始化Resource资源加载库
	// this.loadingView.addEventListener("event")
	this.createScene();
};

zz.createScene=function(){
	/**
	*创建游戏主场景
	*/
	/**
	*创建地图数组
	*/
	var self = this;
	var openList = [];//开启列表，存放点Node
	var closeList = [];//关闭列表
	var cost_straight = 48;//垂直或水平方向的路径
	var cost_diagonal = 48;//斜向的路径
	var row = 10;//行
	var column = 10;//列
	var mapUI = {};
	mapUI.arr =[];
	mapUI.ui = null;
	mapUI.width = 48;
	mapUI.height = 48;
	//从起点（x1,y1）查找目标（x2,y2），（－1:错误，0:没找到，1:找到了）
	function search(x1,y1,x2,y2){
		if(x1<0||x1>=row||x2<0||x2>=row||y1>=column||y2<0||y2>=column) return-1;

		if(mapUI.arr[x1][y1]==0||map[x2][y2]==0) return -1;

		var sNode = new Node(x1,y1,null);//起点
		var eNode = new Node(x2,y2,null);//终点

		openList.push(sNode);
		var resultList = search(sNode,eNode);
		if(resultList.length==0) return 0;

		for(i=0;i<resultList.length;i++){
			mapUI.arr[resultList[i].getX()][resultList[i].getY()]=2;
		}
		return 1;
	}
	(function(){
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				var _name = i+"_"+j;
				// console.log('_name:'+_name)
				mapUI.arr.push(_name);
				mapUI.ui = new self.bitMap(0,0,0,0,mapUI.width,mapUI.height,0.3);
				mapUI.ui.x = j * mapUI.width;
				mapUI.ui.y = i * mapUI.height;
				mapUI.ui.name = _name;
				mapUI.ui.addEventListener('click',self.uiHandler);
				self.stage.addChild(mapUI.ui);
			}
		}
	})();

}
zz.uiHandler=function(e){
	console.log(e.target.name);
	
};
zz.bitMap=function(_rX,_rY,_x,_y,_w,_h,_a){
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
}
zz.stage =function(_$div){
	this.$canvas = document.createElement("canvas");
	this.$canvas.width = _$div.width();
	this.$canvas.height = _$div.height();
	var context = this.$canvas.getContext("2d");
	_$div.append(this.$canvas);
	var site = new createjs.Stage(this.$canvas);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", site);
	createjs.Ticker.userRAF = true;
	createjs.Touch.enable(site);
	site.mouseMoveOutside = true;
	
	this.loadingView = new createjs.Container();
	this.stage = new createjs.Container();
	this.stage.width = this.$canvas.width;
	this.stage.height = this.$canvas.height;
	
	var s=new createjs.Shape();	
	s.graphics.beginFill("#ff00ff").drawRect(0,0,this.stage.width,this.stage.height);
	s.x = 0;
	s.y = 0;
	s.alpha=.2;

	site.addChild(s,this.loadingView,this.stage);
}

zz.LoadingUI=function(){
	
}
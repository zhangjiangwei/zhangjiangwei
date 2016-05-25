/**
*zhangjiangwei@16-5-23
*创建游戏地图引擎
*/
this.zz = this.zz||{};

zz.runEngin=function(){
	
};


// add
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
	function searchA(x1,y1,x2,y2){
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
	//
	function searchB(sNode,eNode){
		var resultList=[];
		var isFind=false;
		var node = null;
		while(openList.length>0){
			//取出开启列表中最低F值，即第一个存储的F为最低的
			node=openList[0];
			//判断是否找到目标点
			if(node.getX()==eNdoe.getX()&&node.getY()==eNode.getY()){
				isFind=true;
				break;
			}
			//up
			if((node.getY()-1)>=0){
				checkPath(node.getX(),node.getY()-1,node,eNode,cost_straight);
			}
			//down
			if((node.getY()+1)<column){
				checkPath(node.getX(),node.getY()+1,node,eNode,cost_straight);
			}
			//left
			if((node.getX()-1>=0)){
				checkPath(node.getX()-1,node.getY(),node,eNode,cost_straight);
			}
			//right
			if(node.getX()+1<row){
				checkPath(node.getX()+1,node.getY(),node,eNode,cost_straight);
			}
			//onleft
			if((node.getX()-1)>=0&&(node.getY()-1)>=0){
				checkPath(node.getX()-1,node.getY()-1,node,eNode,cost_diagonal);
			}
			//lowerlfet
			if((node.getX()-1)>=0&&(node.getY+1)<column){
				checkPath(node.getX()-1,node.getY()-1,node,eNdoe,cost_diagonal);
			}
			//onright
			if((node.getX()+1)<row&&(node.getY()-1)>=0){
				checkPath(node.getX()+1,node.getY()-1,node,eNode,cost_diagonal);
			}
			//lowerright
			if((node.getX()+1)<row&&(node.getY()+1)<column){
				checkPath(node.getX()+1,node.getY()+1,node,eNode,cost_diagonal);
			}
			//从开启列表中删除
			//添加到关闭列表中
			closeList.push(openList.shift());
			//开启列表中排序，把f值最低的放到最底端
			openList.sort(compare)
			if(isFind){
				getPath(resultList,node);
			}
			return resultList;
		}
	}
	//查询此路（x,y）是否能走通
	function checkPath(x,y,parentNode,eNode,cost){
		var node = new Node(x,y,parentNode);
		//查询地图中是否能通过
		if(mapUI.arr[x][y]==0){
			closeList.push(node);
			return false;
		}
		//查找关闭列表中是否存在
		if(isListContains(closeList,x,y)!=-1){
			return false;
		}
		//查找开启列表中是否存在
		var index=-1;
		if((index=isListContains(openList,x,y))!=-1){
			//G值是否更小，即是否更新G,F值
			if((parentNode.getG()+cost)<openList[index.getG()]){
				node.setParentNode(parentNode);
				countG(node,eNode,cost);
				countF(node);
				openList[index]=node;
			}
		}else{
			//添加到开启列表中
			node.setParentNode(parentNode);
			count(node,eNode,cost);
			openList.push(node);
		}
		return true;
	}
	//集合 中是否包含某个元素（－1:没有找到，否则返回所在的索引）
	function isListContains(list,x,y){
		var i,node;
		for(i=0;i<list.length;i++){
			node=list[i];
			if(node.getX()=x && node.getY()==y){
				return i;
			}
			return -1;
		}
	}
	//从终点返回到起点
	function getPath(resultList,node){
		if(node.getParentNode()!==null){
			getPath(resultList,node.getParentNode());
		}
		resultList.push(node);
	}
	//计算G,H,F值
	function count(node,eNode,cost){
		countG(node,eNode,cost);
		countH(node,eNode);
		couttF(node);
	}
	//计算G值
	function countG(node,eNode,cost){
		if(node.getParentNode()==null){
			node.set(cost);
		}else{
			node.setG(node.getParentNode().getG()+cost);
		}
	}
	//计算H值
	function countH(node,eNode){
		node.setF(Math.abs(node.getX()-eNode.getX())+Math.abs(node.getY()-eNode.getY()))
	}
	//计算F值
	function countF(node){
		node.setF(node.getG()+node.getH());
	}
	//节点
	function Node(x,y,parentNode){
		this.x=x;
		this.y=y;
		this.parentNode=parentNode;//父节点
		this.g=0;//当前点到起点的移动耗费
		this.h=0;//当前点到终点的移动耗费，即曼哈顿距离|x-1-x2|+|y1-y2|(忽略障碍物)
		this.f=0;//f=g+h
	}
	Node.prototype.getX=function(){
		return this.x;
	}
	Node.prototype.setX=function(x){
		this.x = x;

	}
	Node.prototype.getY=function(){
		return this.y;
	}
	Node.prototype.setY=function(y){
		this.y = y;
	}
	Node.prototype.getParentNode=function(){
		return this.parentNode;
	}
	Node.prototype.setParentNode=function(parentNode){
		this.parentNode=parentNode;
	}
	Node.prototype.getG=function(){
		return this.g;
	}
	Node.prototype.setG=function(g){
		this.g=g;
	}
	Node.prototype.getH=function(){
		return this.h;
	}
	Node.prototype.setH=function(h){
		this.h=h;
	}
	Node.prototype.getF=function(){
		return this.f;
	}
	Node.prototype.setF=function(f){
		this.f=f;
	}
	Node.prototype.toString=function(){
		return "("+this.x+","+this.y+","+this.f+")";
	}
	//节点比较类
	function compare(o1,o2){
		return o1.getF()-o2.getF();
	}
	function astar(){
		var flag=searchA(3,2,3,8);
		if(flag==-1){
			alert('数据错误')
		}else if(flag==0){
			alert('没找到')
		}else{
			for(x=0;x<6;x++){
				for(y=0;y<10;y++){
					if(map.arr[x][y]==1){

					}
				}
			}
		}
	}

	var viewUI = {};
	viewUI.elect=function(_em,_x,_y,_w,_h){
		var cont = new createjs.Container();
		var txt = new createjs.Text();
		var s = new createjs.Shape();
		
	}
	function init(){
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
		//  添加选择元素
		viewUI.elect("A",10,500)
	}
	init();

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


zz.LoadingUI=function(){
	
}
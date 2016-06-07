/**
 *游戏主体方法main
*/
(function(_z){
	/**
	 *运行游戏
	*/
	_z.run=function(){
		console.log("initiation");
		/**
		 *加载动画
		 */
		_z.loading.start(true);
		/**
		 *构建游戏
		 *第一款重力ABC
		 *游戏方法在具体游戏类中
		 *可以使用交互选择方法启动游戏
		 */
		var zGame = new createABC();
		zGame.play();
	}
	/**
	 *定义绘制字符方法
	*/
	var createABC = function(){
		/**
		 *定义可绘制字集
		*/
		var createChars={
			/*,{"x":,"y":},{"x":,"y":},{"x":,"y":},{"x":,"y":},{"x":,"y":},{"x":,"y":},{"x":,"y":},{"x":,"y":}
			*/
			"data":{
				"a":[{"x":26.80,"y":27.20},{"x":37.00,"y":27.30},{"x":47.20,"y":27.30},{"x":67.60,"y":27.30}
					,{"x":16.50,"y":37.40},{"x":56.90,"y":36.80},{"x":67.50,"y":37.50},{"x":16.50,"y":47.70}
					,{"x":67.50,"y":47.80},{"x":16.50,"y":58.00},{"x":67.50,"y":58.10},{"x":16.50,"y":68.30}
					,{"x":56.30,"y":68.70},{"x":67.50,"y":68.40},{"x":26.70,"y":78.60},{"x":36.90,"y":78.70}
					,{"x":47.10,"y":78.70},{"x":67.50,"y":78.70},{"x":77.70,"y":78.80}],
				"b":[{"x":16.00,"y":6.80},{"x":26.20,"y":6.80},{"x":26.20,"y":17.00},{"x":26.30,"y":27.20}
					,{"x":46.70,"y":27.30},{"x":56.90,"y":27.30},{"x":67.10,"y":27.30},{"x":26.20,"y":37.40}
					,{"x":37.50,"y":37.80},{"x":77.20,"y":37.60},{"x":26.20,"y":47.70},{"x":26.20,"y":58.00}
					,{"x":77.20,"y":58.20},{"x":26.20,"y":68.30},{"x":36.90,"y":68.70},{"x":77.20,"y":68.50}
					,{"x":16.00,"y":78.60},{"x":26.20,"y":78.60},{"x":46.60,"y":78.70},{"x":56.80,"y":78.70}
					,{"x":67.00,"y":78.70}],
			},
			/**
			*绘制字符点阵
			*/
			draw:function(_chars,_x,_y){
				var self = this;
				_x = _x||0;
				_y = _y||0;
				// var sp = new createjs.Container();
				var _char = self.data[_chars];
				var _length = _char.length;
				for(i = 0;i<_length;i++){
					var c = createDot(_char[i].x+_x,_char[i].y+_y);
					// sp.addChild(c);
				}
				// return sp;
			}
		}
		var ABC=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
				 "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
				 "0","1","2","3","4","5","6","7","8","9"];
		var character = "";
		var t = null;
		var n = 0;
		var off = false;
		this.play=function(){
			/**
			 *邦定重力
			 *启动
			 */
			createjs.Ticker.addEventListener("tick",function(e){
				// console.log(e);
				// b2.isDebug();
				b2.setp();
				b2.listionAction();
			})
			// 开始游戏
			loop();
		}
		/**
		 *创造点
		 */
		var createDot = function(_x,_y){
			_x = _x || Math.random()*400+200;
			_y = _y || 100;
			var _dot =  new createjs.Shape();
			var color = Math.floor(Math.random()*16777215).toString(16);
			var radius = 2;
			_dot.graphics.beginFill("#"+color);
			_dot.graphics.drawCircle(0,0,radius);
			_dot.graphics.endFill();
			_dot.x = _x;
			_dot.y = _y;
			vi.view.addChild(_dot);
			var density = 1;
			var friction = 0.5;
			var restitution = 0.5;
			var body = b2.createDot(_x,_y,radius,false,_dot,density,friction,restitution);
			return _dot;
		}
		var dot = function(){
			var sp = new createjs.Shape();
			var color = Math.floor(Math.random()*16777215).toString(16);
			sp.graphics.beginFill(color);
			sp.graphics.drawCircle(0,0,4);
			sp.graphics.endFill();
			return sp;
		}
		var mathABC = function(){
			var _x = Math.random()*400 + 200;
			var _y = 100;//Math.random()*vi.height;
			var c = _z.library.indexArrayLook(ABC,0);
			var char = createChars.draw("b",_x,_y);
			// vi.view.addChild(char);
			return c;
		}
		var loop = function(){
			t = setInterval(function(){
				n++;
				if(off){};
				// mathDot();
				mathABC()
				// console.log("输出字符："+mathABC())
				clearInterval(t)
				if(n > 10){
					// vi.view.removeAllChildren();
					n=0;
				}
			},1000)
		}
	};
	
}(this.zz||{}));
/**
 *zhangjiangwei@2016/6/2
 *2016/6/4：定义了启动结构
 *命名重力字母游戏第一场景
 *添加字母输出功能
*/
this.zz=this.zz||{};
/**
 *初始化显示列表
*/
(function(self){
	self.vi = new function(){
		var canvas =  document.getElementById("esCanvas");
		var site = new createjs.Stage(canvas);
		site.snapPixelsEnabled = true;
		createjs.Ticker.addEventListener("tick",site);
		canvas.width = _width = 800;
		canvas.height = _height = 800;

		var bg = new createjs.Shape();
		bg.graphics.beginFill("#990066");
		bg.graphics.drawRect(0,0,_width,_height)
		bg.graphics.endFill();
		bg.alpha = 0.3;

		this.width = site.width = _width;
		this.height = site.height = _height;
		this.loadView = new createjs.Container();
		this.view = new createjs.Container();
		this.stage = new createjs.Container();
		this.stage.addChild(this.view,this.loadView);

		createjs.Ticker.setFPS = 30;
		
		site.addChild(bg,this.stage);
	};
}(window));

/**
 *初始化物理引擎
 */
(function(self){
	self.b2 = new function()
	{
		var _this = this;
		/**
		 *导入b2包
		 */
		var  b2Vec2 = Box2D.Common.Math.b2Vec2
		  ,b2BodyDef = Box2D.Dynamics.b2BodyDef
		  ,b2Body = Box2D.Dynamics.b2Body
		  ,b2FixtureDef = Box2D.Dynamics.b2FixtureDef
		  ,b2World = Box2D.Dynamics.b2World
		  ,b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
		  ,b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
		  ,b2DistanceJointDef=Box2D.Dynamics.Joints.b2DistanceJointDef
		  ,b2PrismaticJointDef=Box2D.Dynamics.Joints.b2PrismaticJointDef
		  ,b2PulleyJointDef=Box2D.Dynamics.Joints.b2PulleyJointDef
		  ,b2RevoluteJointDef=Box2D.Dynamics.Joints.b2RevoluteJointDef
		  ,b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
		  ,b2GearJointDef =  Box2D.Dynamics.Joints.b2GearJointDef
		  ,b2DebugDraw = Box2D.Dynamics.b2DebugDraw
		  ,b2Fixture = Box2D.Dynamics.b2Fixture
		  ,b2AABB = Box2D.Collision.b2AABB
		  ,b2ContactListener=Box2D.Dynamics.b2ContactListener
		  ,b2DestructionListener = Box2D.Dynamics.b2DestructionListener  
	    /**
	     *定义b2空间比例
	     */
	    var WORLDSCALE = 32;
	    var STEP = 20; 
	    var TIMESTEP = 1/STEP;
		/**
		 *初始化b2空间
		 *gx横向重力
		 *gy纵向重力
		 */
		var GRAVITY_X = 0;
		var GRAVITY_Y = 10;
	    var world = new b2World(new b2Vec2(GRAVITY_X, GRAVITY_Y),true);
		var fixedTimestepAccumulator = 0;
		var lastTimestamp = Date.now();
		/*dotArr
		 *用来存放创建vi点
		 */
		var dotArr = [];
		/**
		 *用来存放创建b2点
		 */
		var bodyArr = [];
		/**
		 *用来移除点
		 */
		var bodyRemoveArr = []; 
	    /**
	     *b2空间
	     */
	    var canvas =  document.getElementById("b2Canvas");
	    canvas.width = vi.width;
	    canvas.height = vi.height;
	    /**
	     *绘制调试模式
	     */
	    var debugDraw = new b2DebugDraw();
	    debugDraw.SetSprite(canvas.getContext("2d"));
		debugDraw.SetDrawScale(WORLDSCALE);
		debugDraw.SetFillAlpha(.8);
		debugDraw.SetLineThickness(1);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		world.SetDebugDraw(debugDraw);
		this.isDebug = function(){
			world.ClearForces();
			world.m_debugDraw.m_sprite.graphics.clear();
			world.DrawDebugData();
			
		}
		this.setp=function(){
			world.Step(60/1000,10,10);
		}
		/**
		 *监听模式
		 */
		this.contactListener = new b2ContactListener();
		world.SetContactListener(this.contactListener);
	    /**
	     *绘制b2边界
	     */
	    var b2_side_width = vi.width;
	    var b2_side_height = 10;
	  	var b2_box = function(_width,_height){
		    var bodyDef = new b2BodyDef;//设置刚体
		    bodyDef.type = b2Body.b2_staticBody;//设置刚体为静态
		    var fixDef=new b2FixtureDef;//设置夹具
		    fixDef.shape = new b2PolygonShape;//设置夹具为多边形态
		    //上下边框 
		    fixDef.shape.SetAsBox(_width/WORLDSCALE, _height/WORLDSCALE);
		    //上
		    bodyDef.userData = "b2_top"
		    bodyDef.position.Set(_width/WORLDSCALE, 0);
		    world.CreateBody(bodyDef).CreateFixture(fixDef);
		    //下
		    bodyDef.userData = "b2_down"
		    bodyDef.position.Set(_width/WORLDSCALE, vi.height/WORLDSCALE);
		    world.CreateBody(bodyDef).CreateFixture(fixDef);    
		    //左右边框
		    fixDef.shape.SetAsBox(_height/WORLDSCALE,_width/WORLDSCALE);
		    //左
		    bodyDef.userData = "b2_left"
		    bodyDef.position.Set(0, 0);
		    world.CreateBody(bodyDef).CreateFixture(fixDef);
		    //右
		    bodyDef.userData = "b2_right"
		    bodyDef.position.Set(_width/WORLDSCALE, 0);
		    world.CreateBody(bodyDef).CreateFixture(fixDef);
		};
		b2_box(b2_side_width,b2_side_height);

		var removeDot = function(actor) {
			vi.view.removeChild(actor.dot);
			bodyArr.splice(bodyArr.indexOf(actor),1);
		}
		this.listionAction=function(){
			// var now = Date.now();
			// var dt = now - lastTimestamp;
			// fixedTimestepAccumulator += dt;
			// lastTimestamp = now;
			
			// while(fixedTimestepAccumulator >= STEP) {
				/*for(var i=0, l=bodyRemoveArr.length; i<l; i++) {
					removeDot(bodyRemoveArr[i].GetUserData());
					bodyRemoveArr[i].SetUserData(null);
					world.DestroyBody(bodyRemoveArr[i]);
				}
				bodyRemoveArr = [];*/
				// update active bodyArr
				for(var i=0, l=dotArr.length; i<l; i++) {
					dotArr[i].update();
				}

				// world.Step(TIMESTEP,10,10);
				// fixedTimestepAccumulator -= STEP;
				
	   			/*if(dotArr.length > 20) {
	   				for(var i=0, l=dotArr.length; i<l; i++) {
		   				bodyRemoveArr.push(bodyArr[i]);
		   				bodyArr.splice(0,1);
					}
	   			}*/
	   		// }

		}
		//碰撞后
		this.contactListener.PostSolve=function(contact){
			var body =contact.GetFixtureB().GetBody().GetUserData()|| contact.GetFixtureB().GetBody().GetUserData();
			if(typeof body == "object"){
				bodyRemoveArr.push(bodyArr[0]);
		   		bodyArr.splice(0,1);
				for(var i=0, l=bodyRemoveArr.length; i<l; i++) {
					removeDot(bodyRemoveArr[i].GetUserData());
					bodyRemoveArr[i].SetUserData(null);
					world.DestroyBody(bodyRemoveArr[i]);
					bodyRemoveArr = [];
				}
			}
		}
		/**/
		var bodyObject = function(body, dot) {
			this.body = body;
			this.dot = dot;
			this.update = function() {  // translate box2d positions to pixels
				this.dot.rotation = this.body.GetAngle() * (180 / Math.PI);
				this.dot.x = this.body.GetWorldCenter().x * WORLDSCALE;
				this.dot.y = this.body.GetWorldCenter().y * WORLDSCALE;
			}
			dotArr.push(this);
		}
		this.createDot=function(positionx,positiony,radius,isStatic,userData,density,friction,restitution){
			var dot = userData || {};
			var fixDef = new b2FixtureDef();
			  fixDef.density = density==undefined?1:density;
			  fixDef.friction = friction==undefined?0.5:friction;
			  fixDef.restitution =restitution==undefined?0.2:restitution;
			  fixDef.shape= new b2CircleShape(radius/WORLDSCALE);
			  fixDef.filter.groupIndex = -2;
			  // fixDef.userData=userData;

			var bodyDef = new b2BodyDef();
			  bodyDef.type=isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
			  bodyDef.position.Set(positionx/WORLDSCALE, positiony/WORLDSCALE);
			var body = world.CreateBody(bodyDef);
			  body.CreateFixture(fixDef);

			var _dot = new bodyObject(body, dot);
			body.SetUserData(_dot);
			bodyArr.push(body);
		}
		/**添加圆形物体
		*radius半径，positionx圆心横坐标,positionyx圆心纵坐标,density密度,friction摩擦力,restitution弹性,iStatic是否静态物体默认false,userData用户自定义数据
		*返回 body对象
		*/ 
		this.createCircleBody=function(positionx,positiony,radius,isStatic,userData,density,friction,restitution){
			var fixDef = new b2FixtureDef();
		      fixDef.density = density==undefined?1:density;
		      fixDef.friction = friction==undefined?0.5:friction;
		      fixDef.restitution =restitution==undefined?0.2:restitution;
		      fixDef.shape=new b2CircleShape(radius/WORLDSCALE);
		      fixDef.filter.categoryBits = 0x0002;
		    var bodydef=new b2BodyDef();
		      bodydef.type=isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
		      bodydef.position.Set(positionx/WORLDSCALE, positiony/WORLDSCALE);
		    var m_body=this.world.CreateBody(bodydef);
		      m_body.CreateFixture(fixDef);
		      m_body.SetUserData(userData);
		    return  m_body;
		}
	   /**添加多边形物体
		*vertexs顶点列表（b2Vec2对象数组）,positionx中心横坐标,positiony中心纵坐标,density密度,friction摩擦力,restitution弹性,iStatic是否静态物体默认false,userData用户自定义数据
		*返回 body对象
		*/
		var createPolygonBody=function(vertexs,positionx,positiony,isStatic,userData,density,friction,restitution){
			var fixDef = new b2FixtureDef();
			  fixDef.density = density==undefined?1:density;
			  fixDef.friction = friction==undefined?0.5:friction;
			  fixDef.restitution =restitution==undefined?0.2:restitution;
			  fixDef.shape=new b2PolygonShape();
			  fixDef.shape.SetAsArray(vertexs);
			var bodydef=new b2BodyDef();
			  bodydef.type=isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
			  bodydef.position.Set(positionx/WORLDSCALE, positiony/WORLDSCALE);
			var m_body = world.CreateBody(bodydef);
			  m_body.CreateFixture(fixDef);
			  m_body.SetUserData(userData);
			return  m_body;
		}
	   

		var createBoxBody=function(width,height,positionx,positiony,isStatic,userData,density,friction,restitution){
			var fixDef = new b2FixtureDef();
			  fixDef.density = density==undefined?1:density;
			  fixDef.friction = friction==undefined?0.5:friction;
			  fixDef.restitution =restitution==undefined?0.2:restitution;
			var shape=new b2PolygonShape();
			    shape.SetAsBox(width/2/WORLDSCALE,height/2/WORLDSCALE);
			  fixDef.shape=shape;
			  
			var bodydef=new b2BodyDef();
			  bodydef.type=isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
			  bodydef.position.Set(positionx/WORLDSCALE, positiony/WORLDSCALE);
			var m_body=world .CreateBody(bodydef);
			  m_body.CreateFixture(fixDef);
			  m_body.SetUserData(userData);
			return  m_body;
		};
		
		
	}
	  /**
	  *b2ContactListener是box2d为我们提供的监听器，他为我们实现了四个方法
	  *BeginContact(contact:b2Contact)--------刚刚碰撞开始的时候会触发这个函数
	  *EndContact(contact:b2Contact) -------碰撞结束的时候会触发这个函数
	  *PostSolve(contact:b2Contact, impulse:b2ContactImpulse)-----碰撞后会处理这个函数
	  * PreSolve(contact:b2Contact, oldManifold:b2Manifold)--------- 碰撞前即将碰撞的时候 
	  */
	  /*var contactListener.PostSolve=function(contact){

	  }*/
}(window));
/**
 *加载页面初始化
*/
(function(_z){
	_z.loading = new function(){
		var currentImage;
		var borderPadding;
		var preload;
		var oldItem;

		var loaderColor = createjs.Graphics.getRGB(0,247,247);
		var loaderBar = new createjs.Container();
		var loaderWidth = 800;
		var loaderHeight = 10;

		var bar = new createjs.Shape();
		bar.graphics.beginFill(loaderColor);
		bar.graphics.drawRect(0,0,1,loaderHeight);
		bar.graphics.endFill();

		var imageContainer = new createjs.Container();
		imageContainer.x = 0;
		imageContainer.y = 0;

		var loadBg = new createjs.Shape();
		loadBg.graphics.beginFill("#221100");
		loadBg.graphics.drawRect(0,0,vi.width,vi.height);
		loadBg.graphics.endFill();
		// imageContainer.addChild(imageBg);

		var barBg = new createjs.Shape();
		barBg.graphics.setStrokeStyle(1);
		barBg.graphics.beginStroke(loaderColor);
		barBg.graphics.drawRect(0,0,loaderWidth,loaderHeight);
		barBg.graphics.endFill();
		loaderBar.addChild(bar,barBg);
		loaderBar.y = 450;
		var loadtxt = "Loading......";
		var text = new createjs.Text(loadtxt, "36px Arial", "#EEEEEE");
		text.textBaseline = "middle";
		text.x = 20;
		text.y = 400;
		var loadNum = 0;
		text.text = loadtxt+loadNum+"%";

		vi.loadView.addChild(loadBg,imageContainer,loaderBar,text);
		var _w=0
		var t;

		this.start =function(_el){
			if(_el){
				vi.loadView.visible = false;
				return;
			}
			t = setInterval(function(){
			// console.log("ddd")
				loadNum++;
				_w+=8;
				bar.graphics.beginFill(loaderColor);
				bar.graphics.drawRect(0,0,_w,loaderHeight);
				text.text = loadtxt+loadNum+"%";
				if(loadNum>=100){
					clearInterval(t);
					vi.loadView.visible = false;
					// callback==function();
				}
			},30)
		}
	}
}(this.zz||{}));

/**zz
 *自定义库
*/
(function(_z){
	_z.library = {
		/**
		*返回a到b且不包括c的最大值
		*/
		maxNumberLook : function(_a,_b,_c){
		  _a = _a||0;
		  _b = _b||0;
		  _c = _c||0;

		  if(_a === _b){return _a};
		  if(_a!=0 && _b==0){return Math.round(Math.random()*_a)}
		  if(_a==0 && _b!=0){return Math.round(Math.random()*_b)}
		  if(_a!=0 && _b!=0){return Math.round(Math.random()* Math.abs(_a-_b) + _a)}  
		},
		/**
		*返回数组中任意一个值
		*/
		indexArrayLook : function(_arr,_index){
		  _arr = _arr || [];
		  if(_arr.length != 0){
		  	if(_index != undefined||_index != null){
		        return _arr[_index];
		  	}else{
		  		return _arr[parseInt(Math.random()*_arr.length)];
		    }
		  }
		}
	};
}(this.zz));



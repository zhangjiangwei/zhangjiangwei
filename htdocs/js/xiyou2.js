/* $.fn.bindInput */
;(function($){
  /* if already exist, do nothing */
  if($.fn.bindInput){
    return;
  }

  var mgrInput = {
    _data: [], // [{el: element, para: [{handler: orgHandler, bind: [{'propertychange': f2}] }] }], {...}]
    saveEvent: function(element, eventType, orgHandler, wrapHandler){
      var item, el, para, handler, bind, obj, obj2, paraLen, paraItem;

      var data = this._data;
      var dataLen = data.length;
      while(dataLen--){
        item = data[dataLen];
        el = item.el;
        para = item.para;
        /* if already exist el */
        if(el === element){
          paraLen = para.length;
          while(paraLen--){
            paraItem = para[paraLen];
            if(paraItem.handler === orgHandler){
              obj = {};
              obj[eventType] = wrapHandler;
              paraItem.bind.push(obj);
              return; /* exit function */
            }
          }
          /* no same handler */
          if(paraLen === -1){
            obj = {
              handler: orgHandler,
              bind: [{}]
            };
            obj.bind[0][eventType] = wrapHandler;
            item.para.push(obj);
            return; /* exit function */
          }
        }
      }

      /* no same element */
      if(dataLen === -1){
        obj = {
          el: element,
          para: [{handler: orgHandler, bind: []}]
        };
        obj2 = {};
        obj2[eventType] = wrapHandler;
        obj.para[0].bind.push(obj2);
        data.push(obj);
        return; /* exit function */
      }
    },
    clearEvent: function(element, handler){
      var argLen = arguments.length;
      var data = this._data; // [{el: element, para: [{handler: orgHandler, bind: [{'propertychange': f2}] }] }, {...}]
      var el, para, item, paraLen, n, objPara, objBind, objBindLen, objBindItem;

      var flag1 = (argLen === 1);
      var flag2 = (argLen === 2 && typeof handler === 'function');
      /* flag1 is false and flag2 is false, then return; */
      if(!flag1 && !flag2) { return;}

      var dataLen = data.length;
      var $dom = $(element);
      while(dataLen--){
        item = data[dataLen];
        el = item.el;
        para = item.para;
        paraLen = para.length;
        if(el !== element){ continue; }
        while(paraLen--){
          objPara = para[paraLen];
          /* if flag2 is true, can't find the same handler, continue */
          if(flag2 && objPara.handler !== handler){ continue; }

          clearInterval(objPara.handler.INTERVAL_ID);
          objBind = objPara.bind;
          objBindLen = objBind.length;
          while(objBindLen--){
            objBindItem = objBind[objBindLen];
            for(n in objBindItem){
              $dom.off(n, objBindItem[n]);
            }
          }
          para.splice(paraLen, 1);
        }

        /* el === element, exit function */
        return; 
      }
    }
  };

  var bindAndSave = function(eventType, eventData, orgHandler, wrapHandler){
    mgrInput.saveEvent(this, eventType, orgHandler, wrapHandler);
    $(this).on(eventType, eventData, wrapHandler);
  };

  var unbind = function(handler){
    var args = arguments;
    var slice = Array.prototype.slice;
    mgrInput.clearEvent.apply(mgrInput, [this].concat(slice.apply(arguments)));
  };

  var bind = function(eventData, handler){
    var argLen = arguments.length;
    if(argLen === 1){
      handler = eventData;
      eventData = undefined;
    }
    /* handler is not a function */
    if(typeof handler !== 'function'){
      return;
    }

    var orgVal;
    var $this = $(this);

    var f1 = function(e){
      handler.call(this, e);
    };

    var f2 = function(e){
      var me = this;
      orgVal = $this.val();
      clearInterval(handler.INTERVAL_ID);
      handler.INTERVAL_ID = setInterval(function(){
        var val = $this.val();
        if(val !== orgVal){
          orgVal = val;
          f1.call(me, e);
        }
      }, 25);
    };

    var f3 = function(e){
      clearInterval(handler.INTERVAL_ID);
    };

    bindAndSave.apply(this, ['focus', eventData, handler, f2]);
    bindAndSave.apply(this, ['blur', eventData, handler, f3]);
    bindAndSave.apply(this, ['bindInput', eventData, handler, f1]);
  };

  $.extend($.fn, {
    bindInput: function(eventData, handler){
      var args = arguments;
      this.each(function(){
        bind.apply(this, args);
      });
      return this;
    },
    unBindInput: function(handler){
      var args = arguments;
      this.each(function(){
        unbind.apply(this, args);
      });
      return this;
    }
  });
}(jQuery));
//触摸事件
function Touch(){this._initX=0;this._finishX=0;this._startX=0;this._startY=0}Touch.prototype.touchStart=function(event){this._startX=event.touches[0].clientX;this._startY=event.touches[0].clientY;this._initX=this._startX};Touch.prototype.touchMove=function(event){var touches=event.touches;var _endX=event.touches[0].clientX;var _endY=event.touches[0].clientY;if(Math.abs(_endY-this._startY)>Math.abs(_endX-this._startX)){return}event.preventDefault();this._finishX=_endX;var _absX=Math.abs(_endX-this._startX);if(this._startX>_endX){_absX=-_absX}this._startX=_endX;return _absX};Touch.prototype.touchEnd=function(event){if(this._finishX==0){return}return this._initX-this._finishX;this._initX=0;this._finishX=0};
//焦点图
function Rotator(config){this.config=config;this.currentIndex=0;this.elem=$("#"+this.config.id);this.item=this.elem.find(".pic li.pic-list");this.len=this.item.length;this.isNext=null;this.scrollTimer=null}Rotator.prototype.RotatorInit=function(){if(this.elem.find(".dot").length>0){this.dotInit()}if(this.len>1){this.touchEvent()}if(this.config.is_autoplay&&this.len>1){this.autoplay()}};Rotator.prototype.dotInit=function(){var $dot=this.elem.find(".dot");var _txt="";for(var i=0;i<this.len;i++){_txt+="<li class='dot-list'>"+(i+1)+"</li>"}$dot.html(_txt).find("li").eq(0).addClass("current");this.dotEvent()};Rotator.prototype.dotSet=function(){var $dot=this.elem.find(".dot");$dot.find("li").removeClass("current").eq(this.currentIndex).addClass("current")};Rotator.prototype.dotEvent=function(){var self=this;var $dot=self.elem.find(".dot");$dot.find("li").on("click",function(){self.currentIndex=$dot.find("li").index(this);self.picAnimate("dotClick")})};Rotator.prototype.touchEvent=function(){var self=this;var touch_elem=document.getElementById(self.config.id);var $pic=self.elem.find(".pic");var touch=new Touch();touch_elem.ontouchstart=function(event){touch.touchStart(event);if(self.config.is_autoplay){clearTimeout(self.scrollTimer)}};touch_elem.ontouchmove=function(event){var lastX=parseInt($pic.css("left"));var moveX=touch.touchMove(event);$pic.css("left",lastX+moveX+"px")};touch_elem.ontouchend=function(event){var client_width=document.documentElement.clientWidth;self.isNext=touch.touchEnd(event);if(self.config.is_onlyMovePic!=false){self.picAnimate()}else{if(client_width-parseInt($pic.find("li.pic-list").width())*self.len-parseInt($pic.css("padding-left"))*2<0){self.picAnimate("nonLoop")}else{$pic.animate({"left":0})}}if(self.config.is_autoplay){self._slide()}};if(self.config.is_onlyMovePic==false){var orientationChange=function(){switch(window.orientation){case 0:$pic.css("left",0);this.currentIndex=0;break;case -90:$pic.css("left",0);this.currentIndex=0;break;case 90:$pic.css("left",0);this.currentIndex=0;break;case 180:$pic.css("left",0);this.currentIndex=0;break}};orientationChange();window.onorientationchange=orientationChange}};Rotator.prototype.picAnimate=function(type,callback){var $pic=this.elem.find(".pic");var _width=parseInt($pic.find("li.pic-list").width());if(typeof type=="undefined"){var lastX=parseInt($pic.css("left"));var _index=0;if(lastX>0){_index=this.len-1}else{_index=Math.abs(lastX/_width);if(this.isNext>0){_index=Math.ceil(_index);if(_index==this.len){_index=0}}else{_index=Math.floor(_index)}}this.currentIndex=_index}else{if(type=="nonLoop"){var lastX=parseInt($pic.css("left"));var _index=0;var client_width=document.documentElement.clientWidth;var fix_width=parseInt($pic.css("padding-left"));var fix_index=Math.floor((client_width-fix_width)/_width);if(lastX>0){_index=0}else{_index=Math.abs(lastX/_width);if(this.isNext>0){_index=Math.ceil(_index);if(_index>this.len-fix_index){_index=this.len-fix_index}}else{_index=Math.floor(_index)}}this.currentIndex=_index}}if(this.elem.find(".dot").length>0){this.dotSet()}$pic.animate({"left":-_width*this.currentIndex+"px"},400,function(){if(typeof callback==="function"){callback()}})};Rotator.prototype.loadImg=function(img,callback){if(typeof img==="string"){img=[img]}var len=img.length;var i=0;var done=function(){if(i===len){if(typeof callback==="function"){callback()}}};$.each(img,function(index,el){var $img=$("<img />");$img.one("load",function(){i++;done()}).one("error",function(){i++;done()});$img.attr("src",el)})};Rotator.prototype._slide=function(){var self=this;self.scrollTimer=setTimeout(function(){var index=self.currentIndex;self.currentIndex++;if(index+1==self.len){self.currentIndex=0}var index2=self.currentIndex;var $item=self.item.eq(index);var $item2=self.item.eq(index2);var callback=function(){self.picAnimate("autoplay",function(){self._slide()})};if($item.data("imgLoaded")&&$item2.data("imgLoaded")){callback()}else{var src=$item.find("img").attr("src");var src2=$item2.find("img").attr("src");self.loadImg([src,src2],function(){$item.data("imgLoaded",true);$item2.data("imgLoaded",true);callback()})}},5000)};Rotator.prototype.autoplay=function(){var self=this;self._slide();self.elem.bind({"mouseover":function(){clearTimeout(self.scrollTimer)},"mouseleave":function(){self._slide()}})};

;(function(gol){
  gol.xiyou={};
}(window))
/**
*定义用户数据
*/

xiyou.data={
  getPartitionInterval: null,
  ajaxtimeout       :20000,
  userLogged        :GM.userLogged,
  isNewUser         :false,
  triggerEvent      :"tap",
  jf                :0,
  tb                :0,
  userName          :"",
  countBet          :0, //单次押注的总金额
  issound           :true,
  isrun             :false,
  isTick            :false,
  defaultvalue      :0,
  multiple          :null,
  touzhuArr         :[],
  inputBlurTime     :null,
  stIl              :null,
  onBet             :true,     //初始投注值
  dividingVal       :0,        //本次中奖金额累计
  Audio             :{},
  colors: [0, 2, 0, 1, 0, 0, 3, 2, 2, 2, 2, 1, 1, 0, 0, 1, 1, 1, 1, 1, 2, 1, 2, 2],
  //0狗，1牛，2猪，3鸡，4炮
  beast:  [1, 3, 2, 3, 0, 3, 4, 2, 1, 3, 0, 3, 2, 3, 2, 1, 3, 2, 3, 0, 2, 3, 0, 2],
  defaultColor:{
    "_red":0,
    "_green":1,
    "_yellow":2,
    "_gun":3
  },
  defaultBeast: {
    "0": [4, 10, 19, 22],
    "1": [0, 8, 15],
    "2": [2, 7, 12, 14, 17, 20, 23],
    "3": [1, 3, 5, 9, 11, 13, 16, 18, 21],
    "4": [6]
  },
  photo:{
    tiles:{'src':'../../../files/images/gamepc/xiyou/flowers.png'},
    lines:{'src':'../../../files/images/gamepc/xiyou/lines.png'},
    fingers:{'src':'../../../files/images/gamepc/xiyou/finger.png'}
  },
  popup:{   
    help:null,
    lost:null,
    bet:null,
    pay: null,
    goPay:null,
    award:null,
    win: null,
    openChast:null
  },
  ajaxUrl:
  {
    url_tologin             :   "/?act=user&st=login",
    url_login_wlt           :   "native://login",
    url_userLoginUrl        :   GM.userLoginUrl,                                //登录地址
    url_userInfoData        :   "?act=game_gamebase&st=userAccount&gameId="+GM.gameId,        //获取万里通积分 T点 T币
    url_recharge            :   "/?act=payment",                                //充值
    url_login               :   "/?act=game_xiyou&st=login_status",          //判断登录状态
    url_pool                :   "/?act=game_xiyou&st=pool_info",             //获取奖池数据
    url_play                :   "/?act=game_xiyou&st=play",                  //投注
    url_myinfo              :   "/?act=game_xiyou&st=my_rank_info",          //我的排名
    url_newlist             :   "?act=game_xiyou&st=get_marguee",            //跑马
    url_mermaidDetail       :   "/?act=game_xiyou&st=mermaidDetail",
    url_merFeed             :   "/?act=game_xiyou&st=feed",
    url_openChest           :   "/?act=game_xiyou&st=openChest",
    url_getMultipleData     :   "?act=game_xiyou&st=odds_list",           //赔率;
    url_isNewUser           :   '?act=game_xiyou&st=is_new_user',
    url_myinfo              :   "/?act=game_xiyou&st=my_rank_info",       //我的排名
    url_myrecord            :   "/?act=game_xiyou&st=my_prize_list",      //中奖记录
    url_richlist            :   "/?act=game_xiyou&st=plute_list",         //土豪榜
    url_getBetRank          :   "/?act=game_xiyou&st=get_bet_rank",       //投注排名
    url_mypoolaward         :   "/?act=game_xiyou&st=get_prev_reward",    //上期分奖
    url_my_pool_award       :   "/?act=game_xiyou&st=my_pool_award",      //本次分奖
  }
};
/**
*/
xiyou.mathNumber=function(_a,_b,_c){
  _a = _a||0;
  _b = _b||0;
  _c = _c||0;

  if(_a === _b){return _a};
  if(_a!=0 && _b==0){return Math.round(Math.random()*_a)}
  if(_a==0 && _b!=0){return Math.round(Math.random()*_b)}
  if(_a!=0 && _b!=0){return Math.round(Math.random()* Math.abs(_a-_b) + _a)}  
};
xiyou.getRandom=function(_len)
{
  var len;
  (_len !== undefined) ? (len = Math.round(Math.random()*_len)) : (len = 0);
  return len;
}
xiyou.getPos=function(arr, number)
{
  var len = arr.length;
  var j = xiyou.mathNumber(0,len-1);
  var i, pos;
  var time=-1;
  for(i = j; i < len; i++){
    time++;
    if(time === len + 1){
      throw new Error("cant't find position");
      break;
    }
    if(arr[i] === number){
      pos = i;
      break;
    }
    if(i === len-1){
      i = -1;
    }
  }
  return pos
}
//打印颜色：
xiyou.getColorLog=function(_len)
{
  // console.log("打印颜色：")
  switch (_len){
    case 0:
      console.log("红:"+_len);
      break;
    case 1:
      console.log("绿:"+_len);
      break;
    case 2:
      console.log("黃:"+_len);
      break;
    case 3:
      console.log("全:"+_len);
      break; 
    default :
      break;
  }
}
//打印动物：
xiyou.getKindsLog=function(_len)
{
  // console.log("打印动物：")
  switch (_len){
    case 0:
      console.log("狗:"+_len);
      break;
    case 1:
      console.log("牛:"+_len);
      break;
    case 2:
      console.log("猪:"+_len);
      break;
    case 3:
      console.log("鸡:"+_len);
      break;
    case 4:
      console.log("炮:"+_len);
      break;

    default :
      break;
  }
}
xiyou.getflowPosition=function(_len)
{
  var len;
  (_len !== undefined || _len !== 0) ? (len = this.getRandom(_len)*15) : (len=360);
  return len;
}
xiyou.getfinPosition=function(_len)
{
  var len,dt;
  (_len !== undefined) ? (len = _len) : (len=[]);
  dt = this.getRandom(len.length-1);
  return len[dt];
}
xiyou.arrayReplic=function(_arr,_start,_reg)
{
  var arr = _arr;
  if(_reg !== undefined){
    arr.splice(_start,1,_reg);
  }else{
    arr.splice(_start,1);
  }
  return arr;
}
xiyou.getVal=function(_total)
{
  if(_total == undefined || _total == NaN ||_total == "undefined" || _total == "NaN") return 100;
  if(_total <= 10000) return 100;
  if(_total >= 49990001) return 500000;
  for(var i=1;i<49991;i++){
    if(_total<=i*10000) return i*100;
  }  
};
xiyou.arrayReplic=function(_arr,_start,_reg)
{
  var arr = _arr;
  if(_reg !== undefined){
    arr.splice(_start,1,_reg);
  }else{
    arr.splice(_start,1);
  }
  return arr;
};
xiyou.setArrPosition=function(_arr)
{
  var self = this;
  //返回新的colors;
  var _arr =_arr;
  _arr = [];
  var red = self.mathNumber(4,6);     //0
  var green = self.mathNumber(6,8); //1
  var yellow = 24-red-green;      //2
  //console.log("red:"+red);
  //console.log("green:"+green);
  //console.log("yellow:"+yellow);
  var _a = 0;
  var _b = 2;
  var _c = undefined;

  for(var i=0;i<24;i++)
  {

    var d = self.mathNumber(_a,_b,_c);

    if(d===0){

      red--;
      if(green<0 && yellow<0){
          _a = 0;
          _b = 0;
      }else if(yellow < 0){
        _a=0;
        _b=1;
        _c=undefined;
      }else if(green<0){
        _a = 0;
        _b = 2;
        _c = 1;
      }else if(red<0){
          _a =1;
          _b =2;
          _c =undefined;
      }
    }else if(d===1){

      green--;
      if(red<0 && yellow<0){
          _a = 1;
          _b = 1;
      }else if(red<0){
        _a =1;
        _b =2;
        _c =undefined;
      }else if(yellow < 0){
        _a=0;
        _b=1;
        _c=undefined;
      }else if(green<0){
          _a = 0;
          _b = 2;
          _c = 1;
      }
    }else if(d===2){

      yellow--;
      if(red<0 && green<0){
          _a = 2;
          _b = 2;
      }else if(yellow < 0){
          _a=0;
          _b=1;
          _c=undefined;
      }else if(green<0){
        _a = 0;
        _b = 2;
        _c = 1;
      }else if(red<0){
        _a =1;
        _b =2;
        _c =undefined;
      }
    };
    _arr.push(d);
  }
  _arr.splice(self.getRandom(23),1,3);

  //console.log("_arr.length="+_arr.length);//
  return _arr;
}
xiyou.getUserInfo=function(response, _this){
  var self = _this;  
  self.data.tb = parseInt(response.TCoin)||self.data.tb;
  self.data.jf = parseInt(response.gameScore)||self.data.jf;
  self.$tb.text(self.data.tb);
  self.$jf.text(self.data.jf);
}
//用户信息
xiyou.setUserInfo=function(response, _this)
{
  var self = _this;  
  self.data.tb = parseInt(response.TCoin)||0;
  self.data.jf = parseInt(response.gameScore)||0;
  self.$tb.text(self.data.tb);
  self.$jf.text(self.data.jf);
  self.data.totalMoney = (self.data.tb >self.data.jf)?(self.data.totalMoney = self.data.tb):(self.data.totalMoney =self.data.jf);
  if(self.data.onBet){
    self.data.onBet = false;
    //初始化更新用户总金额;
    self.$inputBet.val(self.getVal(self.data.totalMoney));
  }
  if(response==''){
    self.$registerName.text('Hi --');
    return;
  }
  if(response.nickName){
    self.$registerName.text('Hi '+ response.nickName );
  }else{
    self.$registerName.text('Hi '+ response.userId );
  }  
  // self.data.getAllMoney= self.data.jf + self.data.tb;
};

//初始化赔率
xiyou.setOddsMultiple=function(response, _this){
  var self = _this;
  self.data.multiple = response.multiple;
  // if(response.multiple != null||response.multiple != undefined){
  if(response.multiple){
    for(var key in response.multiple){
      var _val = response.multiple[key];
      $('#'+key).find('.moon').text('x'+_val);
    }
  }
}
//初始化用户平台
xiyou.initPlat=function(){
  var ua = navigator.userAgent;
  var _platform = "";
  if (ua.indexOf("Android") > 0) {
   _platform = "android";
  } else if (ua.indexOf("Mac OS") > 0) {
   _platform = "ios";
  } else {
   _platform = "windows";   //默认返回值windos平台;
  };
  (_platform == "windows")?(_platform = "click"):(_platform = "touchend");
  xiyou.data.triggerEvent = _platform;
};

//舞台
xiyou.createStage=function(_$div, _$canvas){
  var canvas = _$canvas || document.createElement("canvas");
  var context = canvas.getContext("2d");
  var _width = _$div.width() || 100;
  var _height = _$div.height() || 100;
  _$div.append(canvas);
  canvas.width = _width;
  canvas.height = _height;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStorePixelRatio = context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;

  var ratio = devicePixelRatio / backingStorePixelRatio;
  if (devicePixelRatio !== backingStorePixelRatio) {
    var oldWidth = canvas.width;
    var oldHeight = canvas.height;
    canvas.width = oldWidth * ratio;
    canvas.height = oldHeight * ratio;
  };
  var scale = _width - 750 <= 0 ? _width / 750 : 1;
  /**
   *stage
   */
  var site = new createjs.Stage(canvas);
  site.scaleX = site.scaleY = ratio;
  createjs.Ticker.addEventListener("tick", site);
  createjs.Ticker.userRAF = true;
  createjs.Touch.enable(site);
  var layer = new createjs.Container();
  layer.scaleX = layer.scaleY = scale;
  site.addChild(layer);
  var width = site.canvas.clientWidth;
  var height = site.canvas.clientHeight;
    // return {site,layer,width,height,scale}
  this.site = site;
  this.layer = layer;
  this.width = width;
  this.height = height;
  this.scale = scale;
};
/* 验证输入是否正整数 */
xiyou.checkInteger=function (val)
{
  var reg = /^[0-9]\d*$/;
  var valid = !isNaN(val) && reg.test(val);
  return valid;
};

xiyou.imgLoader=function(_imgData,callback){
  var i = 0,n = Object.keys(_imgData).length;
  this.load = function(_imgSrc){
    var image = new Image();
    image.onload = function(){
      _imgSrc.img = image;
      i++;
      if(i===n){
        console.log("载入完成");
        callback();  
      };
    };
    image.onerror = function(e){
      console.log("img...error")
    }
    image.src = _imgSrc.src;//"images/"+
  };
  this.init = function(){
    var self = this;
    $.each(_imgData,function(_imgName,_imgSrc){
      self.load(_imgSrc);    
    });
  };    
  this.init();
};

xiyou.btnEffects=function(_len){
  if(_len.hasClass("clicked")){return;}
  _len.addClass("clicked");
  clearTimeout(st);
  var st = setTimeout(function(){
    _len.removeClass("clicked");
  },100);
};
/**
*定义用户界面元素
*/
xiyou.initElement=function(){
  var self = this;
  this.$tb = $('.tb_num');
  this.$jf = $('.jf_num');
  this.$maxbet = $('.maxbet');
  this.$start = $('.starbtn');
  this.$intPay = $('.popup-pay-input');
  this.$odds = $('.betcon-ul');
  this.$oddsli = $('.betcon-ul li')
  this.$inputBet = $('#inputBet');
  this.$small = $('.small');
  this.$middle = $('.middle');
  this.$max = $('.big');
  this.$reset = $('.reset');
  this.$help = $('.helpbtn'); 
  this.$promptTxt = $('.prompt-txt'); //公共提示层（文本的内容）
  this.$btnSeeRank = $('.btnSeeRank'); //排行榜
  this.$same = $('.same'); //排行榜Tab切换
  this.$equal = $('.equal'); //tab切换的内容
  this.$fastBtn = $('.fast-btn'); //三个快速押注的按钮
  this.$gameCanvas = $('.gameCanvas');//舞台
  this.$popText = $('.pop-text-win');//中奖的div内容
  this.$popLight = $('.pop-light');//光
  this.$winLogoUl = $('.win-logo-ul');//中奖后显示图标ul
  this.$cathectic = $('.cathectic');//押注小提示框
  this.$dividingSpan = $('.dividing-span');//获奖累计
  this.$myRecord = $('#myRecord');//中奖纪录
  this.$myChampion = $('#myChampion');//土豪榜
  this.$myRanking = $('#myRanking');//投注排名 
  this.$myAward = $('#myAward');//上期分奖
  this.$rankingNum = $('.ranking-num');//用户排名
  this.$percentNum = $('.percent-num');//百分比
  this.$currentNum = $('.current-num');//当前奖池金额
  this.$coinbgli = $('.coinbg li');
  this.$voiceBtn = $('.voice-on');
  this.$registerName = $('.register em');
  this.$registerRank = $('.register span');
  this.$partition = $('.partition .number');//奖池分奖金额
  this.$balanceGm = $('.btn-pop-balance-gm');//鼠标放上去更新用户金额
  // this.$numSkin = $('.JS-num-set');
  var Lightbox = PA.ui.LightboxV2;
  //公共提示弹层
  this.data.popup.publicPrompt = new Lightbox({
    target:$('.public-prompt')
    
  });
  //新手引导
  this.data.popup.help = new Lightbox({
    target:$('.popup-guide')
    
  });
  //中奖弹层
  this.data.popup.win= new Lightbox({
    target:$('.get-award')
  })
  .hookShown(function(){
    // console.log('bb')
    $('.pop-light').addClass("bb");
    clearTimeout(ts);
    var ts = setTimeout(function(){
      $('.pop-light').removeClass("bb");
    },500)
  })
  .hookHidden(function(){    //回调方法         
    xiyou.runRemoveLines();
    
  });

  //本期瓜分奖池
  this.data.popup.partition = new Lightbox({
    target:$('.partition'),
    hideDelayTime: 3000
  });
  //排行榜弹层
  this.data.popup.common = new Lightbox({
    target:$('.ranking-box')
  });
  //余额不足充值
  this.data.popup.goPay = new Lightbox({
    target:$('.lose-yu')
  });
  //退出游戏提示
  this.data.popup.exit = new Lightbox({
    target:$('.exit-prompt')
  });
  // 网络异常
  this.data.popup.error = new Lightbox({
    target:$('.window-error')
  });
  //什么都没中到
  this.data.popup.nothing = new Lightbox({
    target:$('.nothing')
  })
  .hookHidden(function(){             
    xiyou.runRemoveLines();
  });
  var banner = new Rotator({
      "id": "guide",
      "is_autoplay": false
  });
  banner.RotatorInit();
};
//初始化中心全局
xiyou.main = function()
{
  var self = this;
  //初始化用户平台
  self.initPlat();
  //初始化数据
  self.initUiData();
  //事件初始化
  self.initEvent();
  //初始化舞台
  self.stageInit();
};
//初始化舞台
xiyou.stageInit = function(){
  var self = this;
  // stage
  self.stage = new xiyou.createStage(self.$gameCanvas);
  self.imgLoader(xiyou.data.photo, function(){
    xiyou.turntable = new self.createTurntable();
    xiyou.turntable.newFlowBar();
    xiyou.turntable.newLineBar();
    xiyou.turntable.newFingerBar();
  })
}
//--------------------FlowBar
//
xiyou.createTurntable=function()
{
  this.flowBar = new createjs.Container();
  this.lineBar = new createjs.Container();
  this.finBar = new createjs.Container();
  this.newFlowBar=function()
  {
    
    this.flowBar.name = "flowBar";
    for(var i=0; i<24; i++)
    {
      var flowbox = this.newTilesBox(xiyou.data.beast[i]);
      flowbox.setTransform(0, 0, 1, 1, 15*i, 0, 0, 0, 243);
      this.flowBar.addChild(flowbox);
    }
    xiyou.stage.layer.addChild(this.flowBar);
    this.flowBar.x = xiyou.stage.width/(2*xiyou.stage.scale);
    this.flowBar.y = xiyou.stage.height/(2*xiyou.stage.scale);
  }
  this.newTilesBox=function(_len)
  {
    var shapes = new createjs.Container();
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#5b4a77");
    shape.graphics.drawCircle(0, 0, 28);
    var flow = this.newTiles(_len);
    flow.setTransform(-35, -45);
    shapes.addChild(shape,flow);
    return shapes;
  }
  this.newTiles=function(_len)
  {
    var len,packBitmap;
    packBitmap = new createjs.Bitmap(xiyou.data.photo.tiles.img);
    (_len !== undefined) ? (len = _len) : (len = Math.floor(Math.random()*4));
    packBitmap.sourceRect = {width:70,height:70,x:70*_len,y:0};
    return packBitmap;
  }
  // 
  this.newLineBar=function()
  {
    
    this.lineBar.name = "lineBar";
    for(var i=0;i<24;i++)
    {
      var linebox = this.newLineBox(xiyou.data.colors[i]);
      linebox.setTransform(0, 0, 1, 1, 15*i, 0, 0, 0, 160);
      this.lineBar.addChild(linebox);
    };
    xiyou.stage.layer.addChild(this.lineBar);
    this.lineBar.x = xiyou.stage.width/(2*xiyou.stage.scale);
    this.lineBar.y = xiyou.stage.height/(2*xiyou.stage.scale);
  }
  this.newLineBox=function(_len)
  {
    var shapes = new createjs.Container();
    var lin = this.newLine(_len);
    lin.setTransform(-20, -45);
    shapes.addChild(lin);
    return shapes;
  }
  this.newLine=function(_len)
  {
    var len,linesBitmap;
    linesBitmap = new createjs.Bitmap(xiyou.data.photo.lines.img);
    (_len !== undefined) ? (len = _len) : (len = Math.floor(Math.random()*3));
    linesBitmap.sourceRect = {width:41,height:108,x:41*_len,y:0};
    return linesBitmap;
  }
  this.newFingerBar=function()
  {  
    this.finBar.name = "finBar";
    var finBitmap = new createjs.Bitmap(xiyou.data.photo.fingers.img);
    finBitmap.x = -93;
    finBitmap.y = -157;
    this.finBar.addChild(finBitmap);
    xiyou.stage.layer.addChild(this.finBar);
    this.finBar.x = xiyou.stage.width/(2*xiyou.stage.scale);
    this.finBar.y = xiyou.stage.height/(2*xiyou.stage.scale);
  }
};
// 初始化数据
xiyou.initUiData=function(){
  var self = this;
  self.initElement();
  // 判断新用户
  // if(self.data.isNewUser === '1') self.showPopup(001);
  if(self.data.userLogged){
    self.getAjaxData('GET',self.data.ajaxUrl.url_isNewUser,function(response,_this){
      var self = _this;
      if(response.isNewUser) self.showPopup(001);
    }); 
  }
  
  //初始化分奖
  self.getPartition();
  //初始赔率
  self.getAjaxData('GET',self.data.ajaxUrl.url_getMultipleData,self.setOddsMultiple,true);  
  //初始用户信息
  self.getAjaxData('GET',self.data.ajaxUrl.url_userInfoData+'&Type=1',self.setUserInfo,true) 
  //news跑马灯
  self.getAjaxData("GET",self.data.ajaxUrl.url_newlist,self.getNews,true);
  // 我得排名
  self.getMyRank();
  //获取奖池数据
  self.getPool();
  //初始化声音
  self.Sound();
   
}
//我的分奖
xiyou.getPartition = function(){
  var self = this;
  self.resetGetMyAward();
  self.getAjaxData('GET', self.data.ajaxUrl.url_my_pool_award, function(response){ 
        self.rendergetPartition(response);
  },true);
 
};

xiyou.resetGetMyAward = function(){
  var self = this;
  clearInterval(self.data.getPartitionInterval);
  self.data.getPartitionInterval = setInterval(function(){
    self.getPartition();    //更新我的分奖
  }, 180*1000);
};
//提示我的分奖:
xiyou.rendergetPartition = function(response, isAfterBet){
  var self = this;
  //判断接口是否正常
    if(response.statusCode == "0000"){
      var amountInt = parseInt(response.res.amount);
    //判断是否分到奖励
     if ( !isNaN(amountInt) && amountInt > 0 ) {
      //分奖
      self.$partition.text(amountInt);
      self.showPopup(008);
      // clearTimeout(self.data.hidePopupResultTimeout);
      // setTimeout(function(){
      //   self.hidePopupResult();
      // }, 2000)
      //排名靠后未分到奖
      } 
    }
};


//获取奖池数据
xiyou.getPool=function(){
  var self = this;
  self.getAjaxData("GET",self.data.ajaxUrl.url_pool,function(response,_this){
    var self = _this;
    self.addPool(response);
    if(self.data.getPool) clearInterval(self.data.getPool);
    self.data.getPool = setInterval(function(){
      self.getPool();					//更新奖池数据
      self.getMyRank();       //更新我的排名
    },60 * 1000);
  }, true);
};
//更新我的排名
xiyou.getMyRank = function(){
  var self = this;
  self.getAjaxData("GET",self.data.ajaxUrl.url_myinfo,function(response,_this){
    var self = _this;
    if(response.statusCode == "0000"){
      self.$rankingNum.text(response.rank);
      self.$registerRank.text(response.rank)
   }else{
   		var txt_num = self.$rankingNum.text();
   		var txt_rank = self.$rankingNum.text();
   		txt_num = txt_num || "--";
   		txt_rank = txt_rank || "--";
      self.$rankingNum.text(txt_num);
      self.$registerRank.text(txt_rank);
   };
  },true);
};


//奖池动画
xiyou.addPool=function(response,isAfterBet){
  var self = this;

  //添加当前奖池金额
  if(response.currentPool){
    self.$currentNum.text(response.currentPool)
  }else{
    self.$currentNum.text(0);
  }
  // 
  if(!response.poolPercent){
    return;
  }
  var percentage = Math.round(response.poolPercent);
  self.$percentNum.text(percentage);
  //修改奖池背景
  
  var coinbg = "";
  if(percentage >= 1 && percentage <= 20){
    coinbg = 0;
  }
  else if(percentage > 20 && percentage <= 40){
    coinbg = 1;
  }
  else if(percentage > 40 && percentage <= 60){
    coinbg = 2;
  }
  else if(percentage > 60 && percentage <= 80){
    coinbg = 3;
  }
  else if(percentage > 80 && percentage <= 100){
    coinbg = 4;
  }else{
    coinbg = -1;
  }
  if(coinbg != -1){
    self.$coinbgli.eq(coinbg).addClass('show').siblings().removeClass('show');
  }
};
//重置
xiyou.setRest=function(){
  var self = this;
  console.log("继续")
  self.data.isrun = false;
  self.$start.removeClass('clicked');
};

//初始化事件
xiyou.initEvent=function(){
  var self = this;  
  // 开始按钮
  self.$start.on(self.data.triggerEvent,function(e){
    if(!self.data.userLogged){// 未登录
        e.preventDefault();   //防止刚弹出来的遮罩层也捕捉到手指抬起的touchend事件
        GM.loginBox.show();
        return;
    }else{
      if(self.data.isrun) return;    //是否在转动
        //判断用户金额是否够押注
        self.data.Audio.Mbtn.play();
        self.$start.addClass("clicked");
        self.autoPlay();
    };
  });
  //鼠标放上去更新用户金额
  xiyou.$balanceGm.on('mouseover', function(){
    //更新用户的当前金额
   self.getAjaxData('GET', self.data.ajaxUrl.url_userInfoData+'&Type=2', self.getUserInfo, true)
  })
  //新手引导弹层
  self.$help.on(self.data.triggerEvent, function(e){
    e.preventDefault();
  	xiyou.data.Audio.Mbtn.play();
    self.showPopup(001);
  })
  //排行榜弹层
  self.$btnSeeRank.on(self.data.triggerEvent, function(e){
    e.preventDefault();
  	xiyou.data.Audio.Mbtn.play();
    //更新排行榜内容
    self.showPopup(007);

    //土豪榜中初始化虚席以待
    var _li3 = "";
    for(var j=0; j<3; j++){
      _li3+= '<li><span class="first-icon icons first'+j+'"></span><span class="name">虚席以待</span><span class="qq">...</span></li>'
    }
    self.$myChampion.html(_li3);

    //更新土豪榜
    $.ajax({
      type: 'GET',
      url: self.data.ajaxUrl.url_richlist,
      timeout : self.data.ajaxtimeout,
      success: function(response){
        if(response.statusCode == "0000"){
          self.rendMyRich(response);
        }
      },
      error: function(xhr, type){
        console.log("土豪榜数据请求失败");
        }
    });
    //更新中奖纪录
    $.ajax({
      type: 'GET',
        url: self.data.ajaxUrl.url_myrecord,
        timeout : self.data.ajaxtimeout,
        success: function(response){
          if(response.statusCode == "0000"){
            self.renderMyRecord(response);
          }else if(response.statusCode == "1000"){
            self.$myRecord.html($('<p>'+response.msg+'</p>'));
          }
        },
      error: function(xhr, type){
        }
    });
    //更新投注排名
    $.ajax({
      type: 'GET',
      url: self.data.ajaxUrl.url_getBetRank,
      timeout : self.data.ajaxtimeout,
      success: function(response){
        if(response.statusCode == "0000"){
          self.renderRichList(response);
        }
      },
      error: function(xhr, type){
        }
    });

    //更新上期分奖
    $.ajax({
      type: 'GET',
        url: self.data.ajaxUrl.url_mypoolaward,
        timeout : self.data.ajaxtimeout,
        success: function(response){ 
          if(response.statusCode == "0000"){
            self.renderMyAward(response);
          }
        },
      error: function(xhr, type){
        }
    });
  })

  //排行榜tab键
  self.$same.on(self.data.triggerEvent, function(){
  	xiyou.data.Audio.Mbtn.play();
    var $this = $(this);
    var index = $this.index();
    $this.addClass('current').siblings('.same').removeClass('current');
    self.$equal.eq(index).addClass('current').siblings('.equal').removeClass('current')
  })

  /*投注input初始值*/
  self.$inputBet.val(100);
  //押注小图标
  self.$odds.on(self.data.triggerEvent,'li',function(){
  	xiyou.data.Audio.Mbtn.play();
    var _val = Number(self.$inputBet.val());
    _val = _val - _val%100;
    //检验input值为0就return;
    if(_val == 0){
      return;
    }
    var _bet = Number($(this).find('.point').text())+_val;    
    self.data.countBet += _val;
    if(self.data.countBet > 500000){
      self.data.countBet -= _val;
      self.showPopup(004, "押注金额不能超过500000");
      return;      
    }
    $(this).find('.point').text(_bet);    
    $(this).addClass('current');
    // 
    var _id = $(this).attr('id');
    var _betNum = $(this).find('.point').text();
    var _odds = $(this).find('.moon').text();
    var betArr = _id+'|'+_betNum+'|'+_odds;    
    if(self.data.touzhuArr.length !== 0){
        var reg=eval("/" + _id + "\\|" + "/");
        for(var i= 0;i<self.data.touzhuArr.length;i++)
        {
            if(reg.test(self.data.touzhuArr[i])){
                self.data.touzhuArr = self.arrayReplic(self.data.touzhuArr,i);
            }
        }
    }
    self.data.touzhuArr.push(betArr);
    // console.log(self.data.touzhuArr);
  })
  //快速押注按钮
  self.$fastBtn.on(self.data.triggerEvent, function(){
    clearTimeout(self.inputBlurTime);
    self.btnEffects($(this));
  	xiyou.data.Audio.Mbtn.play();
    var $this = $(this);
    var value = 0;
    switch (true){
      case $this.hasClass('small'):
        value = 1000;
        break;
      case $this.hasClass('middle'):
        value = 10000;
        break;
        //计算用户最大的押注基数
     case $this.hasClass('big'):
		if(!self.data.userLogged){        // 未登录
	        GM.loginBox.show();
	        return;
	      	}
 		value = 100000;
	 	var _val = self.data.jf + self.data.tb;
        if(_val<=100000){
          value = 10000;
        }
        if(_val<=10000)
        {
          value = 1000;
        }
        if(_val<=1000 || _val<=100)
        {
          value = 100;
        }
        break;
    }
    
    self.$inputBet.val(value);
  })

  // 重置按钮
  self.$reset.on(self.data.triggerEvent,function(){
  	xiyou.data.Audio.Mbtn.play();
    self.btnEffects($(this));
    self.$oddsli.removeClass('current').find('.point').text(0);
    self.data.countBet = 0;
    self.data.touzhuArr = [];
  })
  //input失去焦点

  self.$inputBet.on({
    'blur': function(){
      var $this = $(this);
      self.inputBlurTime = setTimeout(function(){
        var value = $this.val();
        var yu = value%100;
        if(yu!==0){
          value = value - yu;
        }
        $this.val(value);
      },100)
    },
   'keydown': function(e){
        var reg = new RegExp("^[0-9]$");
        var keyCode = String.fromCharCode(e.keyCode);
        
        if(reg.test(keyCode) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 8){
        }
        else{
          return false;
        }
    },
    'keyup':function(e){
      if(parseInt($(this).val()) >= 500000){
        $(this).val("500000");
      }
    }
  })

};

xiyou.getNews=function(response,_this){
  var self = _this;
  if(response.list !=0){
    self.setNews(response);
  }
}

//顶部跑马灯
xiyou.setNews=function(_list){
  if(_list.statusCode != '0000'){
    return;
  };
  //跑马灯数组为空的
  if(!_list.list){
    return;
  }

  function list(){
    var _li='';
    for(var i=0;i<_list.list.length;i++){
      var _name = xiyou.setStrLen(_list.list[i].disName);      
      var _win = parseInt(_list.list[i].prize_amout);
      _li+='<span>'+ "恭喜<em>" + _name + "</em>获得<em>"+_win+'</em>奖励</span>'
    };
    return _li;
  }

  var $div = $(".rollingNewsCont");
  $div.html('');
  var _li='';
  _li+='<div class="rollingNews" id="rollingNews1">'
  _li+=list()
  _li+='</div>'
  _li+='<div class="rollingNews" id="rollingNews2">'
  _li+=list()
  _li+='</div>'
  $div.append(_li);
  var seed = 40;
  var div = getid("rollingNewsCont");
  var div1 = getid("rollingNews1");
  var div2 = getid("rollingNews2");
  clearInterval(setOF);
  var setOF = setInterval(setScroll,seed);
  function setScroll(){
    if(div1.offsetWidth < div.scrollLeft+400){
      div.scrollLeft-=div1.offsetWidth;
      //clearInterval(setOF)
    }else{
      div.scrollLeft++;
    }
  }
  function getid(id){
    return document.getElementById(id);
  };
};
// 排行榜tab切换塞数据：
//奖池数据以及排名

//土豪榜数据
xiyou.rendMyRich = function(response){
  var self = this;
  var betRank = response.topList||[];
  var $mylist = $("#myChampion");
  var _li = "";
  var _li2 = "";
  for(var o in betRank){
    var betRanklist = betRank[o];
    var user_name = betRanklist.disName;
    if(!user_name){
      continue;
    }
    _li += '<li><span class="first-icon icons first'+o+'"></span><span class="name">' + user_name + '</span><span class="qq">' + parseInt(betRanklist.prize_amount) + '</span></li>';
  }
  $mylist.html(_li); 
  var liLength = $mylist.find('li').length;
  if(liLength<3){
    for(var i=liLength; i<3; i++){
      _li2 += '<li><span class="first-icon icons first'+i+'"></span><span class="name">虚席以待</span><span class="qq">...</span></li>';
    }
    $mylist.append(_li2);
  }
};
//中奖纪录
xiyou.renderMyRecord = function(response){
  var self = this;
  var betRank = response.myPrize||[];
  var $mylist = $("#myRecord");
  var _li = "";
  //数组内为空
  if(!betRank.length){
     $mylist.html($('<p>暂无纪录</p>'));
     return;
  }
  for(var o in betRank){
    var betRanklist = betRank[o];
    if(betRanklist){
      _li += '<li><span class="time">' + betRanklist.raw_add_time + '</span><span class="reward">' + parseInt(betRanklist.prize_amount) + '</span></li>';
    }
  }
  $mylist.html(_li);
};
//投注排名
xiyou.renderRichList = function(response){
  var self = this;
  var betRank = response.betRank || [];
  var dispenseLog = response.dispenseLog;
  var $mylist = $("#myRanking");
  var _li = "";
  //数组内为空
  if(!betRank.length){
     $mylist.html($('<p>暂无纪录</p>'));
     return;
  }
  for(var o in betRank){
    var betRanklist = betRank[o];
    if(betRanklist){
      var user_name = betRanklist.disName;
      if(!user_name){
        continue;
      }
      _li += '<li><span class="ranking-txt ranking">' + betRanklist.rank + '</span><span class="ranking-txt">' + user_name + '</span><span class="ranking-txt">' + betRanklist.amount + '</span></li>';
    }
  }
  $mylist.html(_li);
};
//上期分奖
xiyou.renderMyAward = function(response, isAfterBet){
  var self = this;
  var betRank = response.dispenseLog || [];
  var $mylist = $("#myAward");
  var _li = "";
  //数组内为空
  if(!betRank.length){
     $mylist.html($('<p>暂无纪录</p>'));
     return;
  }
  for(var o in betRank){
    var betRanklist = betRank[o];
    if(betRanklist){
      var user_name = betRanklist.disName;
      if(!user_name){
        continue;
      }
      _li += '<li><span class="ranking-txt ranking">' + betRanklist.rank + '</span><span class="ranking-txt">' + user_name + '</span><span class="ranking-txt">' + betRanklist.dispenseAmount + '</span></li>';
    }
  }
  $mylist.html(_li);
};
//--------------------------------------------------------------------------
//让转盘停止
xiyou.errorAction=function(){
  var self = this;
  var _t = 500;
  self.data.isTick = false;
  xiyou.data.Audio.Mstart.pause();
  // 指针结果
  //获取指针的角度
  var rdfinBar = self.turntable.finBar.rotation % 360 ;
  self.turntable.finBar.rotation = rdfinBar;

  var colorPos = self.getRandom(24);
  _t = 1000+(24*100)
  var rdfin = self.turntable.finBar.rotation + (-360 - rdfinBar) - ((24-colorPos) * 15);
  // console.log(rdfin);
  createjs.Tween.get(self.turntable.finBar)
  .to({rotation: rdfin},_t,createjs.Ease.quadOut)
  .call(function(){
    self.setRest();
    self.turntable.finBar.rotation = rdfin;
  });

  // 元素结果
  var rdflowBar = self.turntable.flowBar.rotation % 360;
  self.turntable.flowBar.rotation = rdflowBar
  var _rdflow = self.getRandom(24);
  if(colorPos <= _rdflow){colorPos += 24};
  var positionflow = (colorPos - _rdflow) * 15;
  var rdflow = self.turntable.flowBar.rotation + (360 - rdflowBar) + positionflow;
  createjs.Tween.get(self.turntable.flowBar)
  .to({rotation: rdflow},_t,createjs.Ease.quadOut) 
};

//显示中奖的押注图标
xiyou.showAwardLogo = function(response){
  var self = this;
  var _winData = response.winData;
  var keyArr = [];
  var _html = "";
  for(var key in _winData){
    keyArr.push(key);
  }
  for(var i=0; i<keyArr.length; i++){
    var strDiv1 = '<div class="moon icons">'+_winData[keyArr[i]].moon+'</div>'
    var strDiv2 = '<div class="point icons">'+_winData[keyArr[i]].point+'</div>'
    _html+='<li class="icons" id="'+keyArr[i]+'">'+strDiv1+strDiv2+'</li>'
  }
  self.$winLogoUl.html(_html);
}

//
xiyou.playAction = function(response, _this){
  var self = _this;
  // //显示中奖的押注图标 
  // self.showAwardLogo(response);
  self.data.isTick = false;
  xiyou.data.Audio.Mstart.pause();
  var _t = 500;
  var _color = response.color;
  // self.getColorLog(_color);
  var _kinds = response.kinds;
  // self.getKindsLog(_kinds);
  //查找color的位置
  var colorPos = self.getPos(self.data.colors,_color);
  _t = 1000+(24*100)
  //指针结果
  //获取指针的角度
  var rdfinBar = self.turntable.finBar.rotation % 360 ;
  self.turntable.finBar.rotation = rdfinBar;
  var rdfin = self.turntable.finBar.rotation + (-360 - rdfinBar) - ((24-colorPos) * 15);
  //console.log("指针结果位置:"+ rdfin);
  createjs.Tween.get(self.turntable.finBar)
    .to({rotation: rdfin},_t,createjs.Ease.quadOut)
    .call(function()
    {
      // self.data.isin = true;
      clearTimeout(st)
      var st = setTimeout(function(){
        self.data.Audio.win.play();
        // 中奖结果
        if(response.prizePoint != 0){
          self.showPopup(006,response.prizePoint);  //显示用户本次中奖金额
          self.showAwardLogo(response);             //显示中奖的押注图标
          self.data.dividingVal += Number(response.prizePoint);
          self.$dividingSpan.text(self.data.dividingVal);//更新用户当前赢得的总金额
        }else{
          self.showPopup(005);
          self.socketExec();  
        }
        //更新用户的当前金额
       self.getAjaxData('GET', self.data.ajaxUrl.url_userInfoData+'&Type=2', self.getUserInfo, true)
      },1000);
    })

  // 元素结果
  var rdflowBar = self.turntable.flowBar.rotation % 360;
  self.turntable.flowBar.rotation = rdflowBar;
  //console.log("轮盘的初始角度:"+rdflowBar);
  var _rdflow = self.getfinPosition(self.data.defaultBeast[_kinds]);
  //console.log("返回轮盘中动物的位置："+_rdflow)

  if(colorPos <= _rdflow){colorPos += 24};
  var positionflow = (colorPos - _rdflow) * 15;
  var rdflow = self.turntable.flowBar.rotation + (360 - rdflowBar) + positionflow;

  createjs.Tween.get(self.turntable.flowBar)
    .to({rotation: rdflow},_t,createjs.Ease.quadOut);
  
}
//-----------------------------

//---------------------------------
//自动播放旋转
xiyou.autoPlay = function(_tr){
  var self = this;
  var tk = 1;
  self.data.isrun = true;
  self.data.isTick = true;
  self.data.Audio.Mstart.play();
  var timestamp = new Date().getTime(); 
  var betData = self.data.touzhuArr.join(',');
  var _url = self.data.ajaxUrl.url_play + '&bet='+ encodeURIComponent(betData) //+ "&is_new_user=" + self.data.isNewUser + "&timestamp=" + timestamp;
  if(self.data.touzhuArr.length != 0 ){
    self.getAjaxData("GET", _url, self.playAction, false, null,null ,null ,null , true, true);//,data
  }else{
    self.errorAction(); //
    self.$cathectic.show().delay(2000).fadeOut(800);//押注小提示
  }
  /*update*/
  clearInterval(self.data.undate);
  self.data.undate = setInterval(function(){
    if(self.data.isTick){
      self.turntable.flowBar.rotation += 7;//元素
      self.turntable.finBar.rotation -= 15;//指针
      if(self.turntable.finBar.rotation <= -360)
      {self.turntable.finBar.rotation = 0}
    };
  },60)
};

//彩色条旋转
xiyou.runRemoveLines=function(){
  var self = this;
  for (var i = 0; i < self.turntable.lineBar.numChildren; i++)
  {
    (function(i){
      clearTimeout(st);
      var st = setTimeout(function()
        {
          self.turntable.lineBar.removeChildAt(0);
          if(i == 23){self.runAddLines()};
        },
        i * 60);
    }(i));
  };
  // self.data.isif = true;
}

xiyou.runAddLines=function()
{
  var self = this;
  self.data.colors = self.setArrPosition(self.data.colors);
  for (var i = 0; i < 24; i++)
  {
    (function(i){
    clearTimeout(st);
    var st =setTimeout(function()
      {
        var linebox = self.turntable.newLineBox(self.data.colors[i]);
        linebox.setTransform(0, 0, 1, 1, 15*i, 0, 0, 0, 160);
        self.turntable.lineBar.addChildAt(linebox,i);
        if(i==23){self.setRest()};
      },
      i * 60);
    }(i))
  };
}
/*弹窗显示*/
xiyou.showPopup=function(type,message,dt,error){
  var self = this;
  
  if(type == 001){
      self.data.popup.help.show();
      return;
  };
  // if(type == 002){
  //     self.data.popup.win.show()
  //     return;
  // };
  if(type == 003){
      self.data.popup.award.show();
      return;
  };
  if(type == 004){  //公共弹层
      self.$promptTxt.text(message);
      self.data.popup.publicPrompt.show();
      return;
  };
  //没中
  if(type == 005){
      self.data.popup.nothing.show()
      .hideDelay(3200);
      return;
  };
  //中了
  if(type == 006){
    self.$popText.html(self.transferNumberToHtml(message))
    self.data.popup.win.show()
    .hideDelay(4500);
    return;
  };
  if(type == 007){
      self.data.popup.common.show();//新手引导
      return;
  };
  if(type == 008){
    self.data.popup.partition.show();//分奖弹层
    return;
  };
  if(type == 009){
    self.data.popup.goPay.show();//余额不足弹层
    return;
  };
};

//获取AJAX请求
xiyou.getAjaxData= function (_type,_url,callback,_err,_data,_time,_f, _d, _e,_s)
{
  var self = this;
  _e = _e || false;
  _s = _s || false;
  _err = _err || false;
  var d = "&time="+ (new Date().getTime());
  if(typeof _data != "object" && _data != null && _data != undefined){
    if(_time){_url = _url+d}; 
    _url = _url+_data;
    _data = null; 
  };    
  $.ajax({
    type: _type,
    url: _url,
    data:_data,
    // async: true,
    timeout: self.data.ajaxtimeout,
    success: function (response) {
      var re = response.head?response.head.rspCode:'';
      if( re == '100' || response.statusCode == '100'||response.statusCode=='101'||response.statusCode=='102'|| response.statusCode=='103'){
        // location.href = self.data.ajaxUrl.url_userLoginUrl;
        if(_s) GM.loginBox.show();
        if(_e) self.errorAction();
        self.setRest();
        return;
      };
      if(response.statusCode == "1100"){
        if(_e)self.errorAction();
        self.showPopup(005); 
        self.setRest();
        return;
      };
      if(response.statusCode == "1005"){
        if(_e)self.errorAction();
        self.showPopup(004,"操作异常，请重新开始");    
        self.setRest();          
        return;
      };
      if(response.statusCode == "1007"){
        if(_e)self.errorAction();
        self.showPopup(004,"投注失败，请重新开始");
        self.setRest();
        return;
      };
      if ( response.statusCode == "50") {
        if(_e)self.errorAction();
        self.showPopup(004,"土豪，您押注金额达到万里通单笔限额，请往万里通设置");   
        self.setRest();
        return;
      };
      if ( response.statusCode == "51") {
        if(_e)self.errorAction();
        self.showPopup(004,"您的万里通积分由于消耗超过当日上限，故扣款失败，若要继续游戏，请充值T币");
        self.setRest();
        return;
      };
      // 账号禁用 head.rspCode==100
      if ( response.statusCode == "80"){
        if(_e)self.errorAction();
        self.showPopup(004,"您的账号存在风险，已被禁用，请联系客服！");
        self.setRest();
        return;
      }; 
      // 判断服务器是否在维护
      // console.log(response.maintain_code);
      if(response.maintain_code == 1){
      	if(_e)self.errorAction();
        if(GM.beforeUnloadMgr){ // 设置空字符串，离开页面时(触发 beforeunload 事件) 就不会提示'确定要离开此页'
          GM.beforeUnloadMgr.setText('');
        }
        location.reload();
        self.setRest();
        return;
      };
      if(response.statusCode == "81"){  //  otp短信验证
      	if(_e)self.errorAction();
      	self.setRest();
        if(GM.beforeUnloadMgr){ //设置空字符串，离开页面时(触发 beforeunload 事件) 就不会提示'确定要离开此页'
            GM.beforeUnloadMgr.setText('');
        }
        location.href = "/?act=game_xiyou&st=gameLoginOtpCheck&go_url=" + encodeURIComponent(location.href);
        return;
      };
      if (response.statusCode == "5") { // 余额不足
        // 余额不足时，更新T币和余额的值  
        if(_e)self.errorAction();
        if(window.GM && GM.getUserAccount){
            GM.getUserAccount(function (d){
                self.data.jf = d.gameScore;
                self.data.tb = d.TCoin;
            });
        };
        self.isUpdateMoney = false;
        self.showPopup(009);
        self.setRest();
        return;
      };
      // 防沉迷
      if( GM.addict && GM.addict(response) ){
      	if(_e)self.errorAction();
        self.setRest();
        return;
      };
      if(response.statusCode == "1"){//维护状态
      	if(_e)self.errorAction();
        if(GM.beforeUnloadMgr){ // 设置空字符串，离开页面时(触发 beforeunload 事件) 就不会提示'确定要离开此页'
          GM.beforeUnloadMgr.setText('');
        }
        location.reload();
        self.setRest();
        return;
      };
      if(response.statusCode =="0000" || _err){
        (typeof callback == "function")?(callback(response,self)):(console.log("回调状态无0000"));
      }else{            
        if(_e)self.errorAction();
        self.showPopup(004,"系统异常,请稍后再试!如有问题,请联系客服：400 636 6612");
        console.log("接口异常"+_url);
        self.setRest();
      };          
    },
    error: function (xhr, type){
      if(_e)self.errorAction();
      if(_f){
        window.location.reload();
        return;
      };
      if(_err){
        return;
      };
      self.showPopup(004,"网络超时，请检查您的网络！");
      self.setRest();
      if(_d){
        setTimeout(function(){
           window.location.reload();
         },2000);
      }             
      console.log("ajax获取数据错误"+_type+"->"+_url+":call")
    }
  });
};
xiyou.transferNumberToHtml = function(number){
  var self = this;
  
  if(typeof number == "undefined"){
    return "";
  }
  
  var stringNumber = [];
  number = number.toString();
  
  for(var i = 0;i < number.length;i++){
    var a=number.charAt(i);
    if(number.charAt(i)==".")
      {
        a=10;
      }
    stringNumber.push('<span class="pop' + a + '"></span>');
  }
  var str = '<em class="em1">您赢得了</em>'+
          stringNumber.join("")+
          '<em class="em2">积分</em>'
  return str;
}
//name加***
xiyou.setStrLen=function(_tr){
  if(_tr){
    _str = _tr.substr(0,2);
    _dtr = _tr.substr(_tr.length-2);
    return _str + '******'+_dtr; 
  }    
};
//name长度
xiyou.getStrLen=function(_str,_num){
  var strlen = 0;
  if(_str != undefined){
    for(var i=0;i<_str.length;i++)
    {
      if(_str.charCodeAt(i)>255){
        strlen += 2;
        if(strlen >= _num) _str = _str.substr(0,_num/2);
      }else{
        strlen ++;
        if(strlen >= _num) _str = _str.substr(0,_num);
      }
    }
    return (strlen < _num)?(_str):(_str + '...');
  }
};

//声音：
xiyou.Sound=function(){
  // GM.voiceGame.create //创建一个声音对象
  // GM.voiceGame.set  //设置声音打开还是关闭
  var self = this;
  // 点击声音设置开启和关闭
  self.$voiceBtn.on('click', function() {
         var $this = $(this);
    if( $this.hasClass("btn-disable") ){
             // 声音开启
        $this.removeClass("btn-disable");
        GM.voiceGame.set(true);
    }else{
             // 声音关闭
        $this.addClass("btn-disable");
        GM.voiceGame.set(false);
    }
  });

  var audioCreat = function(para){
    return GM.voiceGame.create(para);
  }

  // xiyou.audio.Mstart.play();
  // xiyou.audio.Mstart.pause();

  //实例化声音
  xiyou.data.Audio.Mstart = audioCreat({
    mpeg: {src: audioSrc + 'slot.mp3'}
  });
  xiyou.data.Audio.Mbtn = audioCreat({
    mpeg: {src: audioSrc + 'btn.mp3'}
  });
  xiyou.data.Audio.win = audioCreat({
    mpeg: {src: audioSrc + 'go.mp3'}
  })
  
};

// 倒霉险
// 重新更新 余和币
xiyou.getUserAccount= function(){
  var self = this;
  if(window.GM && GM.getUserAccount){
    GM.getUserAccount(function (d){
    // 下面代码，更新自己游戏里的data余额和T币，有可能要加也有可能不加，视不同游戏具体情况而定
       d = d || {};
       var gameScore = d.gameScore;
       var TCoin = d.TCoin;
       if(gameScore !== undefined){
           self.data.restScore = gameScore;
       }
       if(TCoin !== undefined){
           self.data.tb = TCoin;
       }
    });
  }
}

// 处理人机游戏 socket的, 包括倒霉险、救济金等
xiyou.socketExec = function(){
  var self = this;
  if( window.GM && GM.socket_RJ && GM.socket_RJ.exec){
    GM.socket_RJ.exec();
  }
  self.getUserAccount(); // 重新更新 余和币
}

/**
*获取用户事件
*/
$(document).ready(function(){
  if( GM.checkSupportCanvas() ){
    xiyou.main();
  }
});


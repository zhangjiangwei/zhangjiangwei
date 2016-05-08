/**
 *zangjiangwei@21016-3-22
 */
/*extend fx.js*/
;(function(e,t){function w(e){return e.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase()}function E(e){return r?r+e:e.toLowerCase()}var n="",r,i,s,o={Webkit:"webkit",Moz:"",O:"o"},u=window.document,a=u.createElement("div"),f=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,l,c,h,p,d,v,m,g,y,b={};e.each(o,function(e,i){if(a.style[e+"TransitionProperty"]!==t)return n="-"+e.toLowerCase()+"-",r=i,!1}),l=n+"transform",b[c=n+"transition-property"]=b[h=n+"transition-duration"]=b[d=n+"transition-delay"]=b[p=n+"transition-timing-function"]=b[v=n+"animation-name"]=b[m=n+"animation-duration"]=b[y=n+"animation-delay"]=b[g=n+"animation-timing-function"]="",e.fx={off:r===t&&a.style.transitionProperty===t,speeds:{_default:400,fast:200,slow:600},cssPrefix:n,transitionEnd:E("TransitionEnd"),animationEnd:E("AnimationEnd")},e.fn.animate=function(n,r,i,s,o){return e.isFunction(r)&&(s=r,i=t,r=t),e.isFunction(i)&&(s=i,i=t),e.isPlainObject(r)&&(i=r.easing,s=r.complete,o=r.delay,r=r.duration),r&&(r=(typeof r=="number"?r:e.fx.speeds[r]||e.fx.speeds._default)/1e3),o&&(o=parseFloat(o)/1e3),this.anim(n,r,i,s,o)},e.fn.anim=function(n,r,i,s,o){var u,a={},E,S="",x=this,T,N=e.fx.transitionEnd,C=!1;r===t&&(r=e.fx.speeds._default/1e3),o===t&&(o=0),e.fx.off&&(r=0);if(typeof n=="string")a[v]=n,a[m]=r+"s",a[y]=o+"s",a[g]=i||"linear",N=e.fx.animationEnd;else{E=[];for(u in n)f.test(u)?S+=u+"("+n[u]+") ":(a[u]=n[u],E.push(w(u)));S&&(a[l]=S,E.push(l)),r>0&&typeof n=="object"&&(a[c]=E.join(", "),a[h]=r+"s",a[d]=o+"s",a[p]=i||"linear")}return T=function(t){if(typeof t!="undefined"){if(t.target!==t.currentTarget)return;e(t.target).unbind(N,T)}else e(this).unbind(N,T);C=!0,e(this).css(b),s&&s.call(this)},r>0&&(this.bind(N,T),setTimeout(function(){if(C)return;T.call(x)},r*1e3+25)),this.size()&&this.get(0).clientLeft,this.css(a),r<=0&&setTimeout(function(){x.each(function(){T.call(this)})},0),this},a=null})(Zepto);
/*extend touch.js*/
;(function(g){function v(a,c,d,f){return Math.abs(a-c)>=Math.abs(d-f)?0<a-c?"Left":"Right":0<d-f?"Up":"Down"}function w(){c=null;a.last&&(a.el.trigger("longTap"),a={})}function r(){d&&clearTimeout(d);m&&clearTimeout(m);n&&clearTimeout(n);c&&clearTimeout(c);d=m=n=c=null;a={}}function t(a){return("touch"==a.pointerType||a.pointerType==a.MSPOINTER_TYPE_TOUCH)&&a.isPrimary}function u(a,c){return a.type=="pointer"+c||a.type.toLowerCase()=="mspointer"+c}var a={},d,m,n,c,p;g(document).ready(function(){var k,q,l=0,f=0,e,h;"MSGesture"in window&&(p=new MSGesture,p.target=document.body);g(document).bind("MSGestureEnd",function(b){if(b=1<b.velocityX?"Right":-1>b.velocityX?"Left":1<b.velocityY?"Down":-1>b.velocityY?"Up":null)a.el.trigger("swipe"),a.el.trigger("swipe"+b)}).on("touchstart MSPointerDown pointerdown",function(b){if(!(h=u(b,"down"))||t(b))e=h?b:b.touches[0],b.touches&&1===b.touches.length&&a.x2&&(a.x2=void 0,a.y2=void 0),k=Date.now(),q=k-(a.last||k),a.el=g("tagName"in e.target?e.target:e.target.parentNode),d&&clearTimeout(d),a.x1=e.pageX,a.y1=e.pageY,0<q&&250>=q&&(a.isDoubleTap=!0),a.last=k,c=setTimeout(w,750),p&&h&&p.addPointer(b.pointerId)}).on("touchmove MSPointerMove pointermove",function(b){if(!(h=u(b,"move"))||t(b))e=h?b:b.touches[0],c&&clearTimeout(c),c=null,a.x2=e.pageX,a.y2=e.pageY,l+=Math.abs(a.x1-a.x2),f+=Math.abs(a.y1-a.y2)}).on("touchend MSPointerUp pointerup",function(b){if(!(h=u(b,"up"))||t(b))c&&clearTimeout(c),c=null,a.x2&&30<Math.abs(a.x1-a.x2)||a.y2&&30<Math.abs(a.y1-a.y2)?n=setTimeout(function(){a.el.trigger("swipe");a.el.trigger("swipe"+v(a.x1,a.x2,a.y1,a.y2));a={}},0):"last"in a&&(30>l&&30>f?m=setTimeout(function(){var b=g.Event("tap");b.cancelTouch=r;a.el.trigger(b);a.isDoubleTap?(a.el&&a.el.trigger("doubleTap"),a={}):d=setTimeout(function(){d=null;a.el&&a.el.trigger("singleTap");a={}},250)},0):a={}),l=f=0}).on("touchcancel MSPointerCancel pointercancel",r);g(window).on("scroll",r)});"swipe swipeLeft swipeRight swipeUp swipeDown doubleTap tap singleTap longTap".split(" ").forEach(function(a){g.fn[a]=function(c){return this.on(a,c)}})})(Zepto);
//触摸事件
function Touch(){this._initX=0;this._finishX=0;this._startX=0;this._startY=0}Touch.prototype.touchStart=function(event){this._startX=event.touches[0].clientX;this._startY=event.touches[0].clientY;this._initX=this._startX};Touch.prototype.touchMove=function(event){var touches=event.touches;var _endX=event.touches[0].clientX;var _endY=event.touches[0].clientY;if(Math.abs(_endY-this._startY)>Math.abs(_endX-this._startX)){return}event.preventDefault();this._finishX=_endX;var _absX=Math.abs(_endX-this._startX);if(this._startX>_endX){_absX=-_absX}this._startX=_endX;return _absX};Touch.prototype.touchEnd=function(event){if(this._finishX==0){return}return this._initX-this._finishX;this._initX=0;this._finishX=0};
//焦点图
function Rotator(config){this.config=config;this.currentIndex=0;this.elem=$("#"+this.config.id);this.item=this.elem.find(".pic li.pic-list");this.len=this.item.length;this.isNext=null;this.scrollTimer=null}Rotator.prototype.RotatorInit=function(){if(this.elem.find(".dot").length>0){this.dotInit()}if(this.len>1){this.touchEvent()}if(this.config.is_autoplay&&this.len>1){this.autoplay()}};Rotator.prototype.dotInit=function(){var $dot=this.elem.find(".dot");var _txt="";for(var i=0;i<this.len;i++){_txt+="<li class='dot-list'>"+(i+1)+"</li>"}$dot.html(_txt).find("li").eq(0).addClass("current");this.dotEvent()};Rotator.prototype.dotSet=function(){var $dot=this.elem.find(".dot");$dot.find("li").removeClass("current").eq(this.currentIndex).addClass("current")};Rotator.prototype.dotEvent=function(){var self=this;var $dot=self.elem.find(".dot");$dot.find("li").on("click",function(){self.currentIndex=$dot.find("li").index(this);self.picAnimate("dotClick")})};Rotator.prototype.touchEvent=function(){var self=this;var touch_elem=document.getElementById(self.config.id);var $pic=self.elem.find(".pic");var touch=new Touch();touch_elem.ontouchstart=function(event){touch.touchStart(event);if(self.config.is_autoplay){clearTimeout(self.scrollTimer)}};touch_elem.ontouchmove=function(event){var lastX=parseInt($pic.css("left"));var moveX=touch.touchMove(event);$pic.css("left",lastX+moveX+"px")};touch_elem.ontouchend=function(event){var client_width=document.documentElement.clientWidth;self.isNext=touch.touchEnd(event);if(self.config.is_onlyMovePic!=false){self.picAnimate()}else{if(client_width-parseInt($pic.find("li.pic-list").width())*self.len-parseInt($pic.css("padding-left"))*2<0){self.picAnimate("nonLoop")}else{$pic.animate({"left":0})}}if(self.config.is_autoplay){self._slide()}};if(self.config.is_onlyMovePic==false){var orientationChange=function(){switch(window.orientation){case 0:$pic.css("left",0);this.currentIndex=0;break;case -90:$pic.css("left",0);this.currentIndex=0;break;case 90:$pic.css("left",0);this.currentIndex=0;break;case 180:$pic.css("left",0);this.currentIndex=0;break}};orientationChange();window.onorientationchange=orientationChange}};Rotator.prototype.picAnimate=function(type,callback){var $pic=this.elem.find(".pic");var _width=parseInt($pic.find("li.pic-list").width());if(typeof type=="undefined"){var lastX=parseInt($pic.css("left"));var _index=0;if(lastX>0){_index=this.len-1}else{_index=Math.abs(lastX/_width);if(this.isNext>0){_index=Math.ceil(_index);if(_index==this.len){_index=0}}else{_index=Math.floor(_index)}}this.currentIndex=_index}else{if(type=="nonLoop"){var lastX=parseInt($pic.css("left"));var _index=0;var client_width=document.documentElement.clientWidth;var fix_width=parseInt($pic.css("padding-left"));var fix_index=Math.floor((client_width-fix_width)/_width);if(lastX>0){_index=0}else{_index=Math.abs(lastX/_width);if(this.isNext>0){_index=Math.ceil(_index);if(_index>this.len-fix_index){_index=this.len-fix_index}}else{_index=Math.floor(_index)}}this.currentIndex=_index}}if(this.elem.find(".dot").length>0){this.dotSet()}$pic.animate({"left":-_width*this.currentIndex+"px"},400,function(){if(typeof callback==="function"){callback()}})};Rotator.prototype.loadImg=function(img,callback){if(typeof img==="string"){img=[img]}var len=img.length;var i=0;var done=function(){if(i===len){if(typeof callback==="function"){callback()}}};$.each(img,function(index,el){var $img=$("<img />");$img.one("load",function(){i++;done()}).one("error",function(){i++;done()});$img.attr("src",el)})};Rotator.prototype._slide=function(){var self=this;self.scrollTimer=setTimeout(function(){var index=self.currentIndex;self.currentIndex++;if(index+1==self.len){self.currentIndex=0}var index2=self.currentIndex;var $item=self.item.eq(index);var $item2=self.item.eq(index2);var callback=function(){self.picAnimate("autoplay",function(){self._slide()})};if($item.data("imgLoaded")&&$item2.data("imgLoaded")){callback()}else{var src=$item.find("img").attr("src");var src2=$item2.find("img").attr("src");self.loadImg([src,src2],function(){$item.data("imgLoaded",true);$item2.data("imgLoaded",true);callback()})}},5000)};Rotator.prototype.autoplay=function(){var self=this;self._slide();self.elem.bind({"mouseover":function(){clearTimeout(self.scrollTimer)},"mouseleave":function(){self._slide()}})};

window.tjb = {};

// 处理人机游戏 socket的, 包括倒霉险、救济金等
tjb.socketExec = function(){
  var self = this;
    if( window.GM && GM.socket_RJ ){
         if( GM.socket_RJ.exec ){
              GM.socket_RJ.exec();
         }
         var getMoney = GM.socket_RJ.getMoney;
         if( getMoney && getMoney() > 0 ){
              self.getUserAccount(); // 重新更新 余和币
         }
    }

}
tjb.data = {
  ajaxtimeout: 20000,
  triggerEvent: 'tap',
  userLogged: GM.userLogged,
  isGate: false,
  isNewUser: window.isNewUser,
  sprite: null,
  ball: null,
  isrun: false,
  ballNumAll: 0,
  jf: 0,
  tb: 0,
  totalMoney: 0,
  isgo: false,
  isBall: false,
  isgoon: false,
  idus:false,
  popup: {
    help: null,
    lost: null,
    bet: null,
    pay: null,
    goPay: null,
    award: null,
    win: null,
    openChast: null
  },
  photo: {
    Gold: {
      'src': imgSrc + 'Gold.png'
    }, //金币
    // lines:{'src':'images/lines.png'}
  },
  ajaxUrl: {
    url_tologin: "http://youxi56-wap.stg2.24cp.com/?act=user&st=login",
    url_login_wlt: "native://login",
    url_userLogin: true,//GM.userLoginUrl, //登录地址
    url_userInfoData: 'http://127.0.0.1:8080/game/dropcoin/queryUserAccount.php',// "/?act=game_gamebase&st=queryUserAccount&gameId=" + window.gameId, //获取万里通积分 T点 T币
    url_recharge: "/?act=payment", //充值
    url_login: "/?act=game_tjb&st=login_status", //判断登录状态
    url_PoolData: "/?act=game_tjb&st=pool", //奖池数据
    url_play: 'php/play.php', //"/?act=game_tjb&st=play",                  //投币
    url_myInnerData: "?act=game_gamecommon&st=getinnerlist&gameId=" + window.gameId + "&type=0", //记录
    url_newlist: "/?act=game_gamecommon&st=getMarquee&gameId=" + window.gameId + "&type=2", //跑马
    url_getRewardList: "?act=game_tjb&st=getRewardList", //宝箱记录接口
    url_mermaidDetail: "/?act=game_tjb&st=mermaidDetail",
    url_merFeed: "/?act=game_tjb&st=feed",
    url_openChest: "/?act=game_tjb&st=openChest",
    url_getBetScroll: "/?act=game_gamecommon&st=get_bet_scroll&gameId=" + window.gameId, //土豪排行榜页面跑马灯接口
    url_getBetRank: "/?act=game_gamecommon&st=get_bet_rank&gameId=" + window.gameId, //土豪排行榜（日/周/月/总）接口
    // url_getBetRank: "http://gameapp.wanlitong.com/http://youxi56-wap.stg2.24cp.com/?act=game_gamecommon&st=get_bet_rank&gameId=1038", //土豪排行榜（日/周/月/总）接口
  }

}
tjb.dataArr = {
  "XY150": {
    "pit1": [
      0.45688434845767917
    ],
    "pit2": [
      0.6398922208882868
    ],
    "pit3": [
      0.4574393368512392
    ],
    "pit4": [
      0.26868886143900456
    ],
    "pit5": [
      0.29608694922178985
    ],
    "pit6": [
      1.096126699214801
    ],
    "pit7": [
      1.0704707809723915
    ]
  }
}

tjb.initEvent = function () {
  //main
  var self = this;
  /*点击Mask*/
  tjb.$mask.touchendV1(function(e){
    if (self.data.isrun) {
      return;
    }
    if (!self.data.userLogged) { // 未登录
      location.href = self.data.ajaxUrl.url_userLogin;
    }else{
      tjb.$mask.hide();
    }
  })
  /*设置点击操作相关*/
  $(document).touchendV1(function(e){
    var $t = $(e.target);
    if($t[0] !== $('.popup-pay-inpupt')[0] ){
     $('.popup-pay-inpupt').blur();
    }
    if($t[0] !== $('.InputH')[0] ){
     $('.InputH').blur();
    }
    
    tjb.data.idus = true;
    tjb.$tipbb.hide();
  });
  setInterval(function(){
    if(tjb.data.idus || tjb.data.isrun){
      tjb.data.idus = false;
      return;
    }else{
      // if(tjb.$tipbb.css("display") == "block"){
        // self.setidu();
        // tjb.$tipbb.css("display") == "none"
      // };
      tjb.$tipbb.show();
    };          
  },5500);
  var isVoiceClick = false; //默认声音没点到
  // 判断新用户1
  if(window.isNewUser == '1') self.showPopup(001);
  //初始用户信息2
  if (self.data.userLogged) {
    self.getAjaxData('GET', self.data.ajaxUrl.url_userInfoData, self.setUserInfo, true);
  }
  // 声音控制
  self.$ctrl_voice.touchendV1(function () {
    isVoiceClick = true;
    var $this = $(this);
    if ($this.hasClass("forbtn-voice")) {
      $(this).removeClass("forbtn-voice");
      // dice.data.canplayAudio = true;
      self.data.sound_on = true;
    } else {
      $(this).addClass("forbtn-voice");
      // dice.data.canplayAudio = false;
      self.data.sound_on = false;
      // dice.closeAudio();
    }
  });
  $(document).touchendV1(function (e) {
    if (isVoiceClick) {
      isVoiceClick = false;
      return;
    }
    var $this = $(this);
    var $node = $(".more-btns-cnt");
    var isShow = isVisible($node);
    var $curNode = $(e.target);
    if ($curNode.hasClass("more-btns-cnt")) {
      return;
    }
    if (!isShow && $curNode.hasClass("morebtns-btn")) {
      $node.show();
    } else {
      $node.hide();
    }
  })
  self.$btnHelp.touchendV1(function (envet) {
    // 打开帮助弹框
    self.showPopup(1);
  });

  // 点击 [添加] [TB]
  self.$qrecharge.touchendV1(function (event) {
    tjb.data.idu = true; // ??
    if (self.data.isrun) {
      return;
    }
    if (!self.data.userLogged) { // 未登录
      location.href = self.data.ajaxUrl.url_userLogin;
    }
    self.showPopup(10);
  });

  // 投注
  self.$betBtn.touchendV1(function () {
    if (self.data.isrun) {
      return;
    }
    if (!self.data.userLogged) { // 未登录
      location.href = self.data.ajaxUrl.url_userLogin;
    }
    console.log(self.data.issound);
    self.$startbet.addClass('clicked');
    $(this).addClass('active');
    if (self.data.issound) {
      // self.data.Audio.buttonClick.play();
    }
    self.$betmenus.show();
  })
  self.$selects.touchendV1('li', function () {
    $(this).addClass('on').siblings().removeClass('on');
    var _num = $(this).find('span').text();
    switch (_num) {
    case "1k":
      self.data.countBet = 1000;
      break;
    case "2k":
      self.data.countBet = 2000;
      break;
    case "5k":
      self.data.countBet = 5000;
      break;
    case "1w":
      self.data.countBet = 10000;
      break;
    case "2w":
      self.data.countBet = 20000;
      break;
    case "5w":
      self.data.countBet = 50000;
      break;
    case "10w":
      self.data.countBet = 100000;
      break;
    default:
      self.data.countBet = Number(_num);
    };
    self.$inputScore.val(self.data.countBet);
  });
  self.$add.touchendV1(function () {
    self.$selects.find('li').removeClass("on");
    var inpVal = Number(self.$inputScore.val());
    (inpVal >= 10000) ? (inpVal += 1000) : (inpVal += 100);
    if (inpVal <= 0) inpVal = 0;
    if (inpVal >= 500000) inpVal = 500000;
    self.$inputScore.val(inpVal);
  });
  self.$rdd.touchendV1(function () {
    self.$selects.find('li').removeClass("on");
    var inpVal = Number(self.$inputScore.val());
    (inpVal >= 10000) ? (inpVal -= 1000) : (inpVal -= 100);
    if (inpVal <= 100) inpVal = 100;
    if (inpVal >= 500000) inpVal = 500000;
    self.$inputScore.val(inpVal);
  });
  self.$maxbet.touchendV1(function () {
    self.$selects.find('li').removeClass("on");
    var inpVal = self.data.totalMoney - self.data.totalMoney % 100;
    if (inpVal > 500000) inpVal = 500000;
    if (inpVal < 100) inpVal = 100;
    self.$inputScore.val(inpVal);
  });
  self.$startbet.touchendV1(function () {
    // if(self.data.isrun) return;
    console.log('投币完成，开始游戏')
    self.data.isrun = true; //游戏状态
    self.data.isgoon = true; //单局状态
    self.data.isgo = true; //金币运动开始状态
    self.data.isBall = true; //金币运动结束状态
    self.$betmenus.hide();
    self.$betBtn.removeClass('active');
  });
  // self.$startbet.touchendV1(function () {
  //   if (self.data.isrun) {
  //     return;
  //   }
  //   self.$selects.find('li').removeClass("on");
  //   if (!self.checkInteger(self.$inputScore.val())) {
  //     self.$inputScore.val("");
  //     return;
  //   }
  //   self.data.countBet = self.$inputScore.val() - self.$inputScore.val() % 100;
  //   if (self.data.countBet >= 500000) self.data.countBet = 500000;
  //   if (self.data.countBet <= 00) self.data.countBet = 100;
  //   self.$InputH.text(self.data.countBet);
  //   self.$inputScore.val(self.data.countBet);
  //   clearTimeout(ss);
  //   var ss = setTimeout(function () {
  //     self.$betmenus.hide();
  //     if (self.data.automatic == 1) {
  //       self.autoPlay(true);
  //     } else {
  //       self.autoPlay();
  //     }
  //   }, 500);
  // });
  self.$inputScore.focus(function () {
    self.$selects.find('li').removeClass("on");
    $(this).keydown(function (e) {
      var reg = new RegExp("^[0-9]\d*$");
      var keyCode = String.fromCharCode(e.keyCode);
      if (!(reg.test(keyCode))) {
        if (!(e.keyCode == 8)) {
          return false;
        }
      }
    })
  });

  self.$btnSeeRank.touchendV1(function (envet) {
    // 打开排名弹框
    self.showPopup(9);
  });

  // 排行榜
  var dq2 = true;
  self.$btnSeeRank.touchendV1(function () {
    if (dq2) {
      dq2 = false;
      self.getAjaxData("GET", self.data.ajaxUrl.url_myInnerData, setDomInnerData, true);
      setDomRanks.init();
    };
    self.showPopup(9);
  });

  function isVisible(elem) {
    return !!(elem.width() || elem.height()) && elem.length > 0 && elem.css("display") !== "none";
  }

  function setDomInnerData(data) {
    if (data.length == 0 || typeof (data) == 'string') {
      return false;
    }
    // 富豪榜
    var $richList = $('.pop-rank .bd-txt .txt ul');
    $richList.html('');
    var html = '';
    for (var i = 0; i < 3; i++) {
      var username = getUserName(data.richList[i]);
      var prizeAmount = (username == '虚位以待' ? '' : data.richList[i].prizeAmount);
      html += '<li>'
      html += '<i>' + (i + 1) + '</i>';
      html += '<span class="name">' + username + '</span>';
      html += '<span>' + prizeAmount + '</span>';
      html += '</li>';
    }
    $richList.append(html);
    // 我的记录
    var $prizeLog = $('.log-myprize table');
    var data_prizelist = data.myPrizeList;
    $prizeLog.html('');
    html = '';
    if (!data_prizelist.length) {
      html = '<tr><td style="line-height: 1.5rem; text-align: center;">暂无记录</td><tr>';
    } else {
      html = '<tr><th>时间</th><th>奖励</th><tr>';
      for (var i = 0; i < data_prizelist
        .length; i++) {
        html += '<tr><td>' + data_prizelist[i].rawAddTime + '</td><td>' + data_prizelist[i].prizePoint + '</td><tr>';
      }
    }
    $prizeLog.html(html);
  }
  var setDomRanks = {
    $tabRankCon: $('.tab-rank .tab-con').eq(0),
    rankDay: function (data) {
      if (!data || !data.list.length) {
        return
      }
      setDomRanks.$tabRankCon.find('.rank-day .inner').html(createDomtableRank(data.list));
    },
    rankWeek: function (data) {
      if (!data || !data.list.length) {
        return
      }
      setDomRanks.$tabRankCon.find('.rank-week .inner').html(createDomtableRank(data.list));
    },
    rankMonth: function (data) {
      if (!data || !data.list.length) {
        return
      }
      setDomRanks.$tabRankCon.find('.rank-month .inner').html(createDomtableRank(data.list));
    },
    rankAll: function (data) {
      if (!data || !data.list.length) {
        return
      }
      setDomRanks.$tabRankCon.find('.rank-all .inner').html(createDomtableRank(data.list));
    },
    init: function () {
      self.getAjaxData("GET", self.data.ajaxUrl.url_getBetRank + '&type=day', setDomRanks.rankDay, true);
      self.getAjaxData("GET", self.data.ajaxUrl.url_getBetRank + '&type=week', setDomRanks.rankWeek, true);
      self.getAjaxData("GET", self.data.ajaxUrl.url_getBetRank + '&type=month', setDomRanks.rankMonth, true);
      self.getAjaxData("GET", self.data.ajaxUrl.url_getBetRank + '&type=all', setDomRanks.rankAll, true);
    }
  }

  function createDomtableRank(list) {
    for (var i = 0; i < list.length; i++) {
      var user_name = getUserName(list[i]);
      if (list[i].rank_trend == 1) {
        var trendDom = '<i class="icon-rank-up"></i>';
      } else if (list[i].rank_trend == 2) {
        var trendDom = '<i class="icon-rank-nochnange"></i>';
      } else {
        var trendDom = '<i class="icon-rank-down"></i>';
      }
      html += '<tr>';
      html += '<td>' + list[i].rank + '</td>';
      html += '<td><span class="name">' + user_name + '</span></td>';
      html += '<td>' + tjb.formatNumber(list[i].amount) + '</td>';

      html += '<td>' + trendDom + '</td>';
      html += '</tr>';
    }
    html += '</table>';
    return html;
  }

  function getUserName(data) {
    if (!data) {
      return '虚位以待';
    }
    if (data.nickname) {
      return data.nickname;
    }
    return tjb.encryptStr(data.userId);
  }
};
tjb.formatNumber = function (nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}
tjb.encryptStr = function (str, type) {
  if (type == 1) {
    _str = _tr.substr(0, 2);
    _dtr = _tr.substr(_tr.length - 2);
    return _str + '******' + _dtr;
  }
}
tjb.openChest = function () {
  var self = this;
  //开奖
  self.showPopup(11);
}
  /*弹窗显示*/
tjb.showPopup = function (type, message, dt, error) {
  var self = this;
  if (type == 1) {
    self.data.popup.guide.show();
    return;
  };
  if (type == 2) {
    self.data.popup.alert1.show();
    return;
  };
  // 失败
  if (type == 3) {
    self.data.popup.alert2.show();
    return;
  };
  if (type == 4) {
    self.data.popup.alert3.show();
    return;
  };
  if (type == 5) {
    self.data.popup.alert4.show();
    return;
  };
  if (type == 6) {
    self.data.popup.alert5.show();
    return;
  }
  if (type == 7) {
    self.data.popup.alert6.show();
    return;
  }
  if (type == 8) {
    self.data.popup.alert7.show();
    return;
  }
  if (type == 9) {
    self.data.popup.rank.show();
    return;
  }
  if (type == 10) {
    self.data.popup.charge.show();
    return;
  }
  if (type == 11) {
    self.data.popup.rotate.show();
    return;
  }
};
// 初始化数据
tjb.initUiData = function () {
  var self = this;


  var banner1 = new Rotator({
    "id": "rank-con-pic",
    "is_autoplay": false
  });
  banner1.RotatorInit();
  var banner2 = new Rotator({
    "id": "guide-con-pic",
    "is_autoplay": false
  });
  banner2.RotatorInit();

  $('.tab-rank').find('.tab-nav li').tap(function () {
    if ($(this).closest('.tab-log').length) {
      return;
    }
    var $tabItem = $(this).parents('.tab-rank').find('.tab-con .tab-item');
    $(this).addClass('cur').siblings('.cur').removeClass('cur');
    $tabItem.eq($(this).index()).addClass('cur').siblings('.cur').removeClass('cur');
  })
  $('.mainBox header .config-box .xl-item').tap(function () {
    $(this).addClass('cur').siblings('.cur').removeClass('cur');
  });
}
tjb.setUserInfo = function (response, _this) {
  var self = _this;
  self.data.tb = parseInt(response.TCoin) || 0;
  self.data.jf = parseInt(response.gameScore) || 0;
  self.$tb.text(self.data.tb);
  self.$jf.text(self.data.jf);
  self.data.totalMoney = (self.data.tb > self.data.jf) ? (self.data.totalMoney = self.data.tb) : (self.data.totalMoney = self.data.jf);
  self.data.countBet = self.data.totalMoney || 100;
  self.$inputScore.val(self.data.countBet);
  self.$betAmount.text(self.data.countBet);
};
//获取AJAX请求
tjb.getAjaxData = function (_type, _url, callback, _err, _data, _time, _f, _d) {
  var self = this;
  _err = _err || false;
  var d = "&time=" + (new Date().getTime());
  if (typeof _data != "object" && _data != null && _data != undefined) {
    if (_time) {
      _url = _url + d
    };
    _url = _url + _data;
    _data = null;
  };
  $.ajax({
    type: _type,
    url: _url,
    data: _data,
    dataType: 'JSONP',//here
    // async: true,
    timeout: self.data.ajaxtimeout,
    success: function (response) {
      if (response.statusCode == '100' || response.statusCode == '101' || response.statusCode == '102' || response.statusCode == '103') {
        location.href = self.data.ajaxUrl.url_userLogin;
        return;
      };
      if (response.statusCode == "1100") {
        self.setRest();
        self.showPopup(005);
        return;
      };
      if (response.statusCode == "1005") {
        self.setRest();
        self.showPopup(004, "操作异常，请重新开始");
        return;
      };
      if (response.statusCode == "1007") {
        self.setRest();
        self.showPopup(004, "投币失败，请重新开始");
        return;
      };
      if (response.statusCode == "51") {
        self.setRest();
        self.showPopup(004, "土豪，您押注金额达到万里通单笔限额，请往万里通设置");
        return;
      };
      if (response.statusCode == "52") {
        self.setRest();
        self.showPopup(004, "您的万里通积分由于消耗超过当日上限，故扣款失败，若要继续游戏，请充值T币");
        return;
      };
      //判断服务器是否在维护
      if (response.maintain_code == 1) {
        location.reload();
        return;
      };
      if (response.statusCode == "81") {
        location.href = "/?act=otp&st=otpPage";
        return;
      };
      if (response.statusCode == "5") { // 余额不足
        // 余额不足时，更新T币和余额的值
        if (window.GM && GM.getUserAccount) {
          GM.getUserAccount(function (d) {
            self.data.jf = d.gameScore;
            self.data.tb = d.TCoin;
          });
        };
        self.isUpdateMoney = false;
        self.showPopup(005);
        self.setRest();
        return;
      };
      if (response.maintain_code == 1) {
        location.reload();
        return;
      };
      // 防沉迷
      if (GM.addict && GM.addict(response)) {
        self.setRest();
        return;
      };
      if (response.startCode == "1") {
        window.location.reload();
        return;
      };
      if (response.statusCode == "0000" || _err) {
        (typeof callback == "function") ? (callback(response, self)) : (console.log("回调状态无0000"));
      } else {
        self.showPopup(004, "系统异常,请稍后再试!如有问题,请联系客服：400 636 6612");
        console.log("接口异常" + _url);
        self.setRest();
      };
    },
    error: function (xhr, type) {
      if (_f) {
        window.location.reload();
        return;
      };
      if (_err) {
        return;
      };
      self.showPopup(004, "网络异常，请检查您的网络！");
      self.setRest();
      if (_d) {
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      }
      console.log("ajax获取数据错误" + _type + "->" + _url + ":call")
    }
  });
}
tjb.main = function () {
  var self = this;
  self.initPlat();
  self.initElement();
  self.initUiData();
  var $div = $('.gameCanvas');
  tjb.stage = new tjb.createStage($div);

  /*var sp = new createjs.Shape();
  sp.graphics.beginFill('#47B');
  sp.graphics.drawRect(0,0,100,100);
  self.stage.layer.addChild(sp);*/
  /**/
  self.loadAction(1, 3500, function () {
    $(".foot-v2-wrap").show();
    self.$news.show();
    self.$main.css('visibility', 'visible');

    self.$loadBox.animate({
      "opacity": 0
    }, 600, function () {

      self.$loadBox.css({
        "display": "none"
      });
      self.$loadBox.remove();
      // self.$logo_fish.remove();
      $(".other-games-gm").show();
      //-----------------------------
      self.initEvent();
    });
  });

  self.imgLoader(tjb.data.photo, function () {
      //gold
      tjb.gold = new tjb.createGold({
        _name: 'gold',
        _x: 0,
        _y: 0,
        _imgSrc: self.data.photo.Gold.img
      });
      //.getChildByName('mc_magnet');
      tjb.gold.addMagnet(150, 40);

      tjb.gold.effMagnet(true, 2000);

      tjb.gold.addBalls();

      tjb.gold.addSpin();

      tjb.gold.effSpinMove(true, 2000)

      tjb.mc = tjb.gold.getEm();
      //world
      tjb.world = new tjb.createBox2d({
        canvas: tjb.stage.canvas,
        width: tjb.stage.w,
        height: tjb.stage.h,
        scale: tjb.stage.scale,
        ratio: tjb.stage.ratio,
        gravityX: 0,
        gravityY: 9.8
      });
      tjb.world.run(true, {
        alpha: 0.5,
        line: 1
      });
      //
      tjb.world.createb2Stage(10);

      tjb.world.createPindBoll();

      tjb.world.createPit();
      //
      createjs.Ticker.addEventListener("tick", function (evt) {
        tjb.world.update(30 / 1000, false);
        // console.log(evt.delta/1000)
        if (tjb.data.isGate) {
          // tjb.data.isGate = false
          tjb.world.listionAction();
        }
      });

    })
    // tjb.showPopup(11);
};
tjb.goAction = function () {
  var self = this;

  tjb.gold.effMagnet(false);

  //投币金额
  var money = 100 //totalMoney;
  var url = self.data.ajaxUrl + '&amount=' + money;
  if (self.data.userLogged && self.data.isrun) {
    self.getAjaxData('GET', self.data.ajaxUrl.url_play, self.palyAction, true)
  }
}
tjb.palyAction = function (response, _this) {
  var self = _this;

  self.data.ballNumAll += 1;
  console.log('金币掉落数量：' + self.data.ballNumAll);

  // if(self.data.isgo){
  console.log('掉落开始');
  var _x = Math.round(tjb.data.mc_ballX);
  var _y = Math.round(tjb.data.mc_ballY + 20);

  console.log("_x:" + _x, "_y:" + _y)
    //添加下一次coin.0
  var _coin = 'coin' + (self.data.ballNumAll - 1);
  console.log(_coin)
  tjb.data.sprite = tjb.gold.addCoin(_x, _y, 'coin', 0);

  // tjb.mc.addChild(tjb.data.sprite);

  console.log(tjb.data.sprite.x + '__' + tjb.data.sprite.y)
    // tjb.data.sprite.x = _x;
    // tjb.data.sprite.x = _y;
    // tjb.mc.addChild(tjb.data.sprite);

  tjb.data.ball = tjb.world.createCircleBody(25, _x, _y, false, 'ball', 1, 0.5, 0.8);
  //
  tjb.data.isGate = true; //侦听保持打开状态

}
tjb.createBox2d = function (_json) {
  var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2World = Box2D.Dynamics.b2World,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
    b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef,
    b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef,
    b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
    b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2AABB = Box2D.Collision.b2AABB,
    b2ContactListener = Box2D.Dynamics.b2ContactListener,
    b2DestructionListener = Box2D.Dynamics.b2DestructionListener;
    var instance = this;
    this.worldScale = 32;
    this.scale = null;
    this.ratio = null;
    this.world = null;
    this.ground = null;
    this.canvas = null;
    this._w = null;
    this._h = null;
    this.contactListener = new b2ContactListener();
    this.dell = new b2DestructionListener();
  this.initWorld = function () {
      var gx = (_json.gravityX == undefined) ? 0 : _json.gravityX;
      var gy = (_json.gravityY == undefined) ? 9.8 : _json.gravityY;
      this.canvas = _json.canvas;
      this._w = _json.width;
      this._h = _json.height;
      this.scale = _json.scale;
      this.ratio = _json.ratio;
      this.world = new b2World(new b2Vec2(gx, gy), true);
      this.ground = this.world.GetGroundBody();
      this.world.SetContactListener(this.contactListener);
      return this;
    }
  this.createb2Stage = function (wallw) {
      var bodyDef = new b2BodyDef;
      bodyDef.type = b2Body.b2_staticBody;
      var fixDef = new b2FixtureDef;
      fixDef.shape = new b2PolygonShape;
      //上下边框
      fixDef.shape.SetAsBox(_json.width / 2 / _json.ratio, wallw * _json.scale / this.worldScale * _json.ratio);
      //下
      bodyDef.userData = "body_down"
      bodyDef.position.Set(_json.width / 2 * _json.scale / this.worldScale * _json.ratio, _json.height / this.worldScale * _json.ratio);
      this.world.CreateBody(bodyDef).CreateFixture(fixDef);
      //上
      bodyDef.userData = "body_top"
      bodyDef.position.Set(_json.width / 2 * _json.scale / this.worldScale * _json.ratio, 0 * _json.scale / this.worldScale * _json.ratio);
      this.world.CreateBody(bodyDef).CreateFixture(fixDef);
      //左右边框
      fixDef.shape.SetAsBox(wallw * _json.scale / this.worldScale * _json.ratio, _json.height / this.worldScale * _json.ratio);
      //左
      bodyDef.userData = "body_left"
      bodyDef.position.Set(0 * _json.scale / this.worldScale * _json.ratio, 0 * _json.scale / this.worldScale * _json.ratio);
      this.world.CreateBody(bodyDef).CreateFixture(fixDef);
      //右
      bodyDef.userData = "body_right"
      bodyDef.position.Set(_json.width / this.worldScale * _json.ratio, 0 * _json.scale / this.worldScale * _json.ratio);
      this.world.CreateBody(bodyDef).CreateFixture(fixDef);
    }
    /**添加多边形物体
     *vertexs顶点列表（b2Vec2对象数组）,positionx中心横坐标,positiony中心纵坐标,density密度,friction摩擦力,restitution弹性,iStatic是否静态物体默认false,userData用户自定义数据
     *返回 body对象
     */
  this.createPolygonBody = function (vertexs, positionx, positiony, isStatic, userData, density, friction, restitution) {
        var fixDef = new b2FixtureDef();
        fixDef.density = density == undefined ? 1 : density;
        fixDef.friction = friction == undefined ? 0.5 : friction;
        fixDef.restitution = restitution == undefined ? 0.2 : restitution;
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsArray(vertexs);
        var bodydef = new b2BodyDef();
        bodydef.type = isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
        bodydef.position.Set(positionx * _json.scale / this.worldScale * _json.ratio, positiony * _json.scale / this.worldScale * _json.ratio);
        var m_body = this.world.CreateBody(bodydef);
        m_body.CreateFixture(fixDef);
        m_body.SetUserData(userData);
        return m_body;
  }
  this.createCircleBall=function(radius,positionx,positiony,isStatic,userData,density,friction,restitution){

    var fixDef = new b2FixtureDef();
      fixDef.density = density==undefined?1:density;
      fixDef.friction = friction==undefined?0.5:friction;
      fixDef.restitution =restitution==undefined?0.2:restitution;
      fixDef.shape=new b2CircleShape(radius*_json.scale/this.worldScale*_json.ratio);
      // fixDef.filter.categoryBits = 0x0002;
      fixDef.filter.groupIndex = -2;
      fixDef.userData=userData;
    var bodyDef=new b2BodyDef();
      bodyDef.type=isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
      bodyDef.position.Set(positionx*_json.scale/this.worldScale*_json.ratio, positiony*_json.scale/this.worldScale*_json.ratio);
    var body=this.world.CreateBody(bodyDef);
      body.CreateFixture(fixDef);
      // body.SetUserData(userData);
    var sprite = null
     // tjb.gold.addCoin(positionx,positiony,'coin',tjb.data.ballNumAll);
    // tjb.data.sprite = sprite;
    var ball = {fixDef:fixDef, bodyDef:bodyDef, body:body, sprite:sprite, restitution:restitution};
      body.userData = ball//sprite.userData = ball;
    return  ball;
  }
  /**添加圆形物体
  *radius半径，positionx圆心横坐标,positionyx圆心纵坐标,density密度,friction摩擦力,restitution弹性,iStatic是否静态物体默认false,userData用户自定义数据
  *返回 body对象
  */ 
  this.createCircleBody=function(radius,positionx,positiony,isStatic,userData,density,friction,restitution){
    var fixDef = new b2FixtureDef();
      fixDef.density = density==undefined?1:density;
      fixDef.friction = friction==undefined?0.5:friction;
      fixDef.restitution =restitution==undefined?0.2:restitution;
      fixDef.shape=new b2CircleShape(radius*_json.scale/this.worldScale*_json.ratio);
      fixDef.filter.categoryBits = 0x0002;
      var bodydef = new b2BodyDef();
      bodydef.type = isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
      bodydef.position.Set(positionx * _json.scale / this.worldScale * _json.ratio, positiony * _json.scale / this.worldScale * _json.ratio);
      var m_body = this.world.CreateBody(bodydef);
      m_body.CreateFixture(fixDef);
      m_body.SetUserData(userData);
      return m_body;
    }
    this.createBoxBody = function (width, height, positionx, positiony, isStatic, userData, density, friction, restitution) {
        var fixDef = new b2FixtureDef();
        fixDef.density = density == undefined ? 1 : density;
        fixDef.friction = friction == undefined ? 0.5 : friction;
        fixDef.restitution = restitution == undefined ? 0.2 : restitution;
        var shape = new b2PolygonShape();
        shape.SetAsBox(width/2*_json.scale/this.worldScale*_json.ratio,height/2*_json.scale/this.worldScale*_json.ratio);
        fixDef.shape = shape;

        var bodydef = new b2BodyDef();
        bodydef.type = isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
        bodydef.position.Set(positionx * _json.scale / this.worldScale * _json.ratio, positiony * _json.scale / this.worldScale * _json.ratio);
        var m_body = this.world.CreateBody(bodydef);
        m_body.CreateFixture(fixDef);
        m_body.SetUserData(userData);
        return m_body;
      }
      /**
       *添加ball点
       */
    this.createPindBoll = function () {
        var _radiu = 12;
        for (var j = 0; j < 6; j++) {
          if (!(j % 2)) {
            for (var i = 0; i < 6; i++) {

          var _x  = (114 * i)+90;
          var _y = (j * 76)+150;
              var userData = 'x' + i + "_" + j
              this.createCircleBody(_radiu, _x, _y, true, userData);
            }
          } else {
            for (var i = 0; i < 7; i++) {
              var userData = 'x' + i + "_" + j
          var _x = (113 * i)+35;
          var _y = (j * 76)+150;
              this.createCircleBody(_radiu, _x, _y, true, userData);
            }
          }
        }
      }
      /**
       *添加井
       */
  this.createEdge = function(){
    // var n = _json.scale/this.worldScale*_json.ratio
    this.createPolygonBody([
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio ,0/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(80/2*_json.scale/this.worldScale*_json.ratio,10/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(80/2*_json.scale/this.worldScale*_json.ratio,200/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio,200/2*_json.scale/this.worldScale*_json.ratio)
    ],80,725,true,'edge_1');
    this.createPolygonBody([
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio ,0/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(72/2*_json.scale/this.worldScale*_json.ratio,10/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(72/2*_json.scale/this.worldScale*_json.ratio,200/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio,200/2*_json.scale/this.worldScale*_json.ratio)
    ],195,705,true,'edge_2');
    this.createPolygonBody([
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio,0/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(45/2*_json.scale/this.worldScale*_json.ratio,-60/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(60/2*_json.scale/this.worldScale*_json.ratio,-55/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(65/2*_json.scale/this.worldScale*_json.ratio,-30/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(65/2*_json.scale/this.worldScale*_json.ratio,200/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio,200/2*_json.scale/this.worldScale*_json.ratio)
    ],305,735,true,'edge_3');
    this.createPolygonBody([
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio ,0/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(40/2*_json.scale/this.worldScale*_json.ratio,-20/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(75/2*_json.scale/this.worldScale*_json.ratio,-5/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(75/2*_json.scale/this.worldScale*_json.ratio,260/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio,260/2*_json.scale/this.worldScale*_json.ratio)
    ],413,715,true,'edge_4');
    this.createPolygonBody([
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio ,0/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(35/2*_json.scale/this.worldScale*_json.ratio,-20/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(68/2*_json.scale/this.worldScale*_json.ratio,5/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(68/2*_json.scale/this.worldScale*_json.ratio,270/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio,270/2*_json.scale/this.worldScale*_json.ratio)
    ],520,720,true,'edge_5');
    this.createPolygonBody([
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio ,0/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(30/2*_json.scale/this.worldScale*_json.ratio,-10/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(75/2*_json.scale/this.worldScale*_json.ratio,50/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(80/2*_json.scale/this.worldScale*_json.ratio,80/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(80/2*_json.scale/this.worldScale*_json.ratio,270/2*_json.scale/this.worldScale*_json.ratio),
      new b2Vec2(0/2*_json.scale/this.worldScale*_json.ratio,270/2*_json.scale/this.worldScale*_json.ratio)
    ],625,715,true,'edge_6');//6
    //7
  }
  this.createPit = function(){
    var _w = 60,_h=10;
    this.createBoxBody(_w,_h,50,785,true,'down_1');
    this.createBoxBody(_w,_h,160,785,true,'down_2');
    this.createBoxBody(_w,_h,270,785,true,'down_3');
    this.createBoxBody(_w,_h,380,785,true,'down_4');
    this.createBoxBody(_w,_h,490,785,true,'down_5');
    this.createBoxBody(_w,_h,590,785,true,'down_6');
    this.createBoxBody(_w,_h,700,785,true,'down_7');
  }
    this.run = function (isdebug, _json) {
      if (isdebug) {
        var _alpha = _json.alpha || 0.8;
        var _line = _json.line || 1.0;
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(this.canvas.getContext("2d"));
        debugDraw.SetDrawScale(this.worldScale);
        debugDraw.SetFillAlpha(_alpha);
        debugDraw.SetLineThickness(_line);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
      }
    }
    this.update = function (_step, _v) {
      instance.world.Step(_step, 10, 10);
      if (_v) {
        instance.world.DrawDebugData(); //绘制调试数据
      }
    instance.world.ClearForces(); //绘制完毕后清

    }
    /**
     *b2ContactListener是box2d为我们提供的监听器，他为我们实现了四个方法
     *BeginContact(contact:b2Contact)--------刚刚碰撞开始的时候会触发这个函数
     *EndContact(contact:b2Contact) -------碰撞结束的时候会触发这个函数
     *PostSolve(contact:b2Contact, impulse:b2ContactImpulse)-----碰撞后会处理这个函数
     * PreSolve(contact:b2Contact, oldManifold:b2Manifold)--------- 碰撞前即将碰撞的时候
     */
    // console.log("G密度:"+contact.GetFixtureB().GetDensity())
    // console.log("G阻力:"+contact.GetFixtureB().GetFriction())
    // console.log("G弹性:"+contact.GetFixtureB().GetRestitution())

  var _Narr = ['body_down','edge_1','edge_2','edge_3','edge_4','edge_5','edge_6'];
  var fix = 0;
  this.contactListener.PreSolve=function(contact){
    var _nameB = contact.GetFixtureB().GetBody().GetUserData();
    var _nameA = contact.GetFixtureA().GetBody().GetUserData();
    var b = $.inArray(_nameB,_Narr);
    var a = $.inArray(_nameA,_Narr);
    if(a!= -1 ||b!= -1){//
      //金币弹性为0  
      var userB = contact.GetFixtureB().GetUserData().cion;
      if(userB=='cion'){
        contact.GetFixtureB().SetRestitution(0);
     }
    }
    //打印掉落坑号
    switch(_nameA||_nameB){//
      case 'down_1':
      var pit = 1;
      console.log('坑'+pit+'::'+fix);
      // fix = contact.GetFixtureB().GetUserData().restitution
      contact.GetFixtureB().SetRestitution(0);
      contact.GetFixtureB().SetUserData = null;
      break;
      case 'down_2':
      var pit = 2;
      // fix = contact.GetFixtureB().GetUserData().restitution
      console.log('坑'+pit+'::'+fix);
      contact.GetFixtureB().SetRestitution(0);
      contact.GetFixtureB().SetUserData = null;
      break;
      case 'down_3':
      var pit = 3;
      // fix = contact.GetFixtureB().GetUserData().restitution
      console.log('坑'+pit+'::'+fix);
      contact.GetFixtureB().SetRestitution(0);
      contact.GetFixtureB().SetUserData = null;
      break;
      case 'down_4':
      var pit = 4;
      // fix = contact.GetFixtureB().GetUserData().restitution
      console.log('坑'+pit+'::'+fix);
      contact.GetFixtureB().SetRestitution(0);
      contact.GetFixtureB().SetUserData = null;
      break;
      case 'down_5':
      var pit = 5;
      // fix = contact.GetFixtureB().GetUserData().restitution
      contact.GetFixtureB().SetRestitution(0);
      contact.GetFixtureB().SetUserData = null;
      break;
      case 'down_6':
      var pit = 6;
      // fix = contact.GetFixtureB().GetUserData().restitution
      console.log('坑'+pit+'::'+fix);
      contact.GetFixtureB().SetRestitution(0);
      contact.GetFixtureB().SetUserData = null;
      break;
      case 'down_7':
      var pit = 7;
      // fix = contact.GetFixtureB().GetUserData().restitution
      console.log('坑'+pit+'::'+fix);
      contact.GetFixtureB().SetRestitution(0);
      contact.GetFixtureB().SetUserData = null;
      break;
      default:  
    }

  };

  this.listionAction=function(){
    //new
    if(tjb.data.ison){
      for (var body = instance.world.GetBodyList(); body; body = body.GetNext()) {
        var ball = body.userData;
        if (!ball) { continue; }
        var pt = body.GetPosition();
        var sprite = ball.sprite;
        tjb.data.px = pt.x*this.worldScale/_json.scale/_json.ratio;
        tjb.data.py = pt.y*this.worldScale/_json.scale/_json.ratio;
        sprite.x = tjb.data.px;
        sprite.y = tjb.data.py;
        sprite.rotation = body.GetAngle()/Math.PI*180;
        fix = body.GetFixtureList().GetRestitution();
        if(!body.IsAwake()||fix>1.02){//这里清楚创建的刚体，如果掉落失败，查看他的fix 是否大于1.02
          body.userData = null;
          tjb.world.world.DestroyBody(body);
        }        
      }
    };
  }
  this.initWorld();
}

tjb.createGold = function (_json) {
    var mc = null;
    var mc_gold = null;
    var mc_magnet = null;
    var mc_balls = null;
    var mc_spin = null;
    var json = null;
    var vr = null;
    var _data = {
      _magnet: {
        w: 84,
        h: 92,
        x: 8,
        y: 13
      }, //
      _gold: {
        w: 52,
        h: 50,
        x: 25,
        y: 131
      }, //金币
      _spin: {
        w: 29,
        h: 116,
        x: 63,
        y: 202
      }, //
      _spinP: {
        w: 47,
        h: 50,
        x: 6,
        y: 193
      }, //
      _ball: {
        w: 42,
        h: 44,
        x: 5,
        y: 253
      }, //球
      _ballP: {
        w: 55,
        h: 55,
        x: 12,
        y: 336
      }
    };

    this.init = function () {
      json = _json ? _json : console.log("->>>no");

      mc_gold = new createjs.Container();
      mc_gold.name = 'mc_gold';
      mc_gold.x = mc_gold.y = 0;

      mc_magnet = new createjs.Container();
      mc_magnet.name = 'mc_magnet';
      mc_magnet.x = mc_magnet.y = 0;

      mc_balls = new createjs.Container();
      mc_balls.name = 'mc_balls';
      mc_balls.x = mc_balls.y = 0;

      mc_spin = new createjs.Container();
      mc_spin.name = 'mc_spin';
      mc_spin.x = mc_spin.y = 0;

      mc = new createjs.Container();
      mc.name = _json._name || "mc";
      mc.x = _json._x || 0;
      mc.y = _json._y || 0;
      tjb.stage.layer.addChild(mc);

      mc.addChild(mc_gold, mc_magnet, mc_balls, mc_spin);
    };
    // 创建移动金币
    this.addCoin = function (_x, _y, _name, _num) {
      var sp = new createjs.Container();

      var ss1 = new createjs.Shape();
      ss1.graphics.beginFill('#ffB');
      ss1.graphics.drawCircle(0, 0, 25);

      var ss = this.Em(json._imgSrc, _data._gold.w, _data._gold.h, _data._gold.x, _data._gold.y);

      sp.addChild(ss, ss1);
      sp.name = _name + _num;
      sp.x = _x;
      sp.y = _y;
      mc.addChild(sp);
      return sp;
    };
    // 创建移动铁臂
    this.addMagnet = function (_x, _y, _imgSrc) {
      var sp = this.Em(json._imgSrc, _data._magnet.w, _data._magnet.h, _data._magnet.x, _data._magnet.y);
      sp.name = '_magnet';
      mc_magnet.x = _x || 0;
      mc_magnet.y = _y || 0;
      var sp1 = this.Em(json._imgSrc, _data._gold.w, _data._gold.h, _data._gold.x, _data._gold.y);
      sp1.name = '_gold';
      sp1.y = -5;
      mc_magnet.addChild(sp, sp1);
    }
    this.effMagnet = function (_v, _t, _e) {
        var gold = mc_magnet.getChildByName('_gold');
        var _tt = (_t / mc_magnet.x * 200) + _t / 10;
        if (_v) {
          gold.alpha = 1;
          createjs.Tween.get(mc_magnet).to({
              x: 600
            }, _tt, createjs.Ease.Equations)
            .call(function () {
              createjs.Tween.get(mc_magnet, {
                  loop: true
                })
                .to({
                  x: 150
                }, _t, createjs.Ease.Equations)
                .call(function () {
                  vr = 1;
                })
                .to({
                  x: 600
                }, _t, createjs.Ease.Equations)
                .call(function () {
                  vr = -1;
                })
            })
        } else {
          gold.alpha = 0;
          createjs.Tween.get(mc_magnet, {
              override: true
            })
            .call(function () {
              tjb.data.mc_ballX = mc_magnet.x;
              tjb.data.mc_ballY = mc_magnet.y;
              console.log("初始金币位置" + tjb.data.mc_ballX + "---" + tjb.data.mc_ballY)
            })
        };
      }
      //创建小球
    this.addBalls = function () {
      for (var j = 0; j < 6; j++) {
        if (!(j % 2)) {
          for (var i = 0; i < 6; i++) {
            var cont = new createjs.Container();
            var ss = new createjs.Shape();
            ss.graphics.beginFill('#ffffff');
            ss.graphics.drawCircle(0, 0, 25);
            ss.name = 'whiteCircle';
            ss.alpha = 0;
            var sp = this.Em(json._imgSrc, _data._ball.w, _data._ball.h, _data._ball.x, _data._ball.y, true);
            sp.setTransform(-_data._ball.w / 2 + 3, -_data._ball.h / 2 + 5);
            cont.addChild(ss, sp);
            cont.name = 'x' + i + '_' + j;
            cont.x = (110 * i) + 95;
            cont.y = (j * 75) + 175;
            mc_balls.addChild(cont);
          }
        } else {
          for (var i = 0; i < 7; i++) {
            var cont = new createjs.Container();
            var ss = new createjs.Shape();
            ss.graphics.beginFill('#ffffff');
            ss.graphics.drawCircle(0, 0, 25)
            ss.name = 'whiteCircle'
            ss.alpha = 0;
            var sp = this.Em(json._imgSrc, _data._ball.w, _data._ball.h, _data._ball.x, _data._ball.y, true);
            sp.setTransform(-_data._ball.w / 2 + 3, -_data._ball.h / 2 + 5);
            cont.addChild(ss, sp);
            cont.name = 'x' + i + '_' + j;
            cont.x = (110 * i) + 45;
            cont.y = (j * 75) + 175;
            mc_balls.addChild(cont);
          }
        }
      }
    };
    //
    this.addSpin = function () {
      /*var p = new createjs.Shape();
      p.graphics.beginFill('#47B');
      p.graphics.drawRect(0,0,50,30);*/


      var sp = this.Em(json._imgSrc, _data._spin.w, _data._spin.h, _data._spin.x, _data._spin.y, true);
      sp.name = '_spin';
      sp.x = 128;
      sp.y = 5;
      sp.rotation = 90;

      var ss1 = this.Em(json._imgSrc, _data._spinP.w, _data._spinP.h, _data._spinP.x, _data._spinP.y);
      ss1.name = 'ss1';
      ss1.x = -5;
      ss1.y = 0;
      var ss2 = this.Em(json._imgSrc, _data._spinP.w, _data._spinP.h, _data._spinP.x, _data._spinP.y);
      ss2.name = 'ss2';
      ss2.x = 105;
      ss2.y = 0;
      mc_spin.addChild(sp, ss1, ss2);
      mc_spin.x = 100;
      mc_spin.y = 600;
    };
    this.effSpinBig = function (_v) {
      if (_v) {
        var ss1 = mc_spin.getChildByName('ss1');
        createjs.Tween.get(ss1).to({
          x: -10
        }, 500, createjs.Ease.Equations)
        var ss2 = mc_spin.getChildByName('ss2');
        createjs.Tween.get(ss2).to({
          x: 115
        }, 500, createjs.Ease.Equations)
      } else {
        var ss1 = mc_spin.getChildByName('ss1');
        createjs.Tween.get(ss1).to({
          y: -5
        }, 500, createjs.Ease.Equations)
        var ss2 = mc_spin.getChildByName('ss2');
        createjs.Tween.get(ss2).to({
          y: 105
        }, 500, createjs.Ease.Equations)
      }
    }
    this.effSpinMove = function (_v, _t, _e) {
      if (_v) {
        createjs.Tween.get(mc_spin).to({
            x: 600 - 100
          }, _t, createjs.Ease.Equations)
          .call(function () {
            createjs.Tween.get(mc_spin, {
                loop: true
              })
              .to({
                x: 100
              }, _t, createjs.Ease.Equations)
              .call(function () {
                vr = 1;
              })
              .to({
                x: 600 - 100
              }, _t, createjs.Ease.Equations)
              .call(function () {
                vr = -1;
              })
          })
      } else {
        createjs.Tween.get(mc_spin, {
            override: true
          })
          .call(function () {
            console.log(mc_spin.x);
          })
      };
    }
    this.Em = function (_imgSrc, _w, _h, _x, _y, _isTrans) {
      _isTrans = _isTrans || false;
      var bitmap = new createjs.Bitmap(_imgSrc);
      bitmap.sourceRect = {
        width: _w,
        height: _h,
        x: _x,
        y: _y
      };
      if (!_isTrans) {
        bitmap.setTransform(-_w / 2, -_h / 2);
      }
      return bitmap;
    };
    this.getEm = function () {
      return mc;
    };
    this.init();
  }
  /**
   *定义用户界面元素
   */
tjb.initElement = function () {
  this.$ctrl_voice = $('.J_voice-btn');
  this.$main = $('.mainBox')
  this.$loaderpro = $(".load");
  this.$loadBox = $(".loadBox");
  this.$logo_fish = $('.logo_fish');
  this.$start = $('.rod');
  this.$automatic = $('.trust');
  this.$news = $('.news');
  this.$jf = $('.num-jf');
  this.$tb = $('.num-tb');
  this.$mask = $('.masktjb');
  this.$btnHelp = $(".btn-rules"); // 新手引导
  this.$btnSeeRank = $(".ctrl-bar .btn-rank"); // 排名
  this.$qrecharge = $(".qrecharge"); // 充值
  // 下注
  this.$betmenus = $('.drop-betrate');
  this.$betBtn = $('.betBtn');
  this.$selects = $('.drop-betrate .select-list'); // 下注 [选择列表]
  this.$inputScore = $('.drop-betrate .input-score'); // 下注 输入框
  this.$add = $('.drop-betrate .btn-add-square'); //下注 -
  this.$rdd = $('.drop-betrate .btn-minus'); //下注 +
  this.$maxbet = $('.drop-betrate .btn-max'); //下注 [max]
  this.$startbet = $('.drop-betrate .btn-ok'); //下注 [ok]

  this.$tipbb = $('.tip-box');//点击提示
  this.$betAmount =$('.input-box span');//投注金币
  // 弹层定义
  //说明
  var Lightbox = PA.ui.LightboxV2;
  this.data.popup.win = new Lightbox({
    target: $('.popup-alert1')
  });
  this.data.popup.guide = new Lightbox({
    target: $('.popup-guide')
  });
  this.data.popup.alert1 = new Lightbox({
    target: $('.popup-alert1')
  });
  this.data.popup.alert2 = new Lightbox({
    target: $('.popup-alert2')
  });
  this.data.popup.alert3 = new Lightbox({
    target: $('.popup-alert3')
  });
  this.data.popup.alert4 = new Lightbox({
    target: $('.popup-alert4')
  });
  this.data.popup.alert5 = new Lightbox({
    target: $('.popup-alert5')
  });
  this.data.popup.alert6 = new Lightbox({
    target: $('.popup-alert6')
  });
  this.data.popup.alert7 = new Lightbox({
    target: $('.popup-alert7')
  });
  this.data.popup.charge = new Lightbox({
    target: $('.popup-charge')
  });
  this.data.popup.rank = new Lightbox({
    target: $('.popup-rank')
  });
  this.data.popup.rotate = new Lightbox({
    target: $('.popup-rotate')
  });
  var banner = new Rotator({
    "id": "guide",
    "is_autoplay": false
  });
  banner.RotatorInit();
};
tjb.loadAction = function (_n, _t, callback) {
  var self = this;
  _t = _t || 500;
  self.$loaderpro.animate({
    "width": 4.9 / _n + "rem"
  }, _t, function () {
    if (typeof callback == "function") callback();
  });
};
tjb.initPlat = function () {
  var ua = navigator.userAgent;
  var _platform = "";
  if (ua.indexOf("Android") > 0) {
    _platform = "android";
  } else if (ua.indexOf("Mac OS") > 0) {
    _platform = "ios";
  } else {
    _platform = "windows"; //默认返回值windos平台;
  };
  (_platform == "windows") ? (_platform = "click") : (_platform = "tap");
  tjb.data.triggerEvent = _platform;
};
tjb.imgLoader = function (_imgData, callback) {
  var i = 0,
    n = Object.keys(_imgData).length;
  this.load = function (_imgSrc) {
    var image = new Image();
    image.onload = function () {
      _imgSrc.img = image;
      i++;
      if (i === n) {
        console.log("载入完成");
        callback();
      };
    };
    image.onerror = function (e) {
      console.log("img...error")
    }
    image.src = _imgSrc.src; //"images/"+
  };
  this.init = function () {
    var self = this;
    $.each(_imgData, function (_imgName, _imgSrc) {
      self.load(_imgSrc);
    });
  };
  this.init();
};
tjb.createStage = function (_$div, _$canvas) {
  var canvas = _$canvas || document.createElement("canvas");
  var context = canvas.getContext("2d");
  var _width = _$div.width() || 100;
  var _height = _$div.height() || 100;
  _$div.append(canvas);
  canvas.width = _width;
  canvas.height = _height;
  // canvas.style.width = '100%';
  // canvas.style.height = '100%';
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStorePixelRatio = context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;

  var ratio = 1//devicePixelRatio / backingStorePixelRatio;
  if (devicePixelRatio !== backingStorePixelRatio) {
    var oldWidth = canvas.width;
    var oldHeight = canvas.height;
    canvas.width = oldWidth * ratio;
    canvas.height = oldHeight * ratio;
  };
  var scale = 1//_width - 750 <= 0 ? _width / 750 : 1;
  var site = new createjs.Stage(canvas);
  site.scaleX = site.scaleY = ratio;
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", site);
  createjs.Ticker.userRAF = true;
  createjs.Touch.enable(site);
  // site.on("stagemousedown", function(e) {
  // tjb.data.mousedownX = e.stageX;
  // tjb.data.mousedownY = e.stageY;
  // });
  site.on("stagemouseup", function (e) {

    /*console.log('mouseupX:'+tjb.data.mouseupX);
    console.log('mouseupY:'+tjb.data.mouseupY);*/
    //
    if (tjb.data.isgo) {
      tjb.data.isgo = false;
      // tjb.data.mouseupX = e.stageX;
      // tjb.data.mouseupY = e.stageY;
      tjb.goAction();
    }
    //

  });
  var layer = new createjs.Container();
  layer.scaleX = layer.scaleY = scale;
  site.addChild(layer);
  var width = site.canvas.clientWidth;
  var height = site.canvas.clientHeight;
  this.canvas = canvas;
  this.site = site;
  this.layer = layer;
  this.w = 750;
  this.h = 800;
  this.scale = scale;
  this.ratio = ratio;
};
$(document).ready(function () {
  tjb.main();
});

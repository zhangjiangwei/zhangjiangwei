window.jQuery = window.Zepto;
//跑马灯
;
(function ($, global) {
  if (!$ || !$.fn) {
    return;
  }
  // 存在, 则调换下
  if ($.fn.animateV1) {
    var animateTemp = $.fn.animateV1;
    $.fn.animateV1 = $.fn.animate;
    $.fn.animate = animateTemp;
  } else {
    $.fn.animateV1 = $.fn.animate;
  }

  window.GM || (window.GM = {});

  var init = function () {
    var f = {};
    // 跑马灯模块
    f.marqueeModule = function (target) {
        var marquee = {
          // 是否已经开始滚动
          isBegin: false,
          // 是否停止滚动
          isStop: false,
          // 是否正在滚动
          isScrolling: false,
          // 容器的宽度
          boxWidth: 0,
          timeout: null,
          maxNum: 30,
          itemsArr: [],
          // 目前一般不会给调用
          setMaxNum: function (num) {
            this.maxNum = parseInt(num, 10);
            return this;
          },
          // 移除多余的条数
          _removeExtra: function () {
            var self = this;

            var $modules = self.$marqueeAni.find('.marquee-module-gm');
            var len = $modules.length;
            var maxNum = this.maxNum;
            var extraNum = len - maxNum;
            if (extraNum <= 0) {
              return this;
            }

            var boxWidth = this.boxWidth;
            // 判断没有隐藏的条数是第几条序号
            var widthAdd = 0;
            var whichNo;
            $modules.each(function (i, el) {
              var $this = $(this);
              widthAdd += self._getWidth($this);
              if (widthAdd > boxWidth) {
                whichNo = i;
                return false;
              }
            });

            if (whichNo !== undefined) {
              whichNo++; // slice 从 whichNo下一位开始
              $modules.slice(whichNo, whichNo + extraNum)
                .remove();
            }
            return this;
          },
          _addItems: function (arr) {
            var self = this;

            arr = arr || [];
            var len = arr.length;
            if (len <= 0) {
              return this;
            }

            var doc = document.createDocumentFragment();
            //arr.forEach(function(el, i){
            $.each(arr, function (i, el) {
              // el = el || {};
              el = el || '';
              var $module = self.$module.clone();
              $module.html(el);
              doc.appendChild($module[0]);
            });
            this.$marqueeAni.append(doc);
            return this;
          },
          _storeItems: function (arr) {
            arr = arr || [];
            this.itemsArr = this.itemsArr.concat(arr);
            return this;
          },
          _emptyStore: function () {
            this.itemsArr = [];
            return this;
          },
          add: function (arr) {
            var self = this;

            // 若还没开始
            if (!this.isBegin) {
              this._addItems(arr);
            } else {
              this._storeItems(arr);
            }

            // 滚动
            this.scroll();
            return this;
          },
          scroll: function () {
            // 是否滚动开始了
            if (this.isBegin) {
              return this;
            }

            var self = this;
            var widthTotal = 0;
            self.$marqueeAni.find('.marquee-module-gm').each(function () {
              var $this = $(this);
              var itemWidth = self._getWidth($this);
              widthTotal += itemWidth;
            });

            // 小于box 总的宽度
            if (widthTotal <= this.boxWidth) {
              return this;
            }

            this.isBegin = true;
            this.start();
          },
          start: function () {
            var self = this;
            // 若还没开始滚动 或者 正在滚动
            if (!self.isBegin || self.isScrolling) {
              return this;
            }

            var loop = function () {
              if (self.isStop) {
                return;
              }
              self.isScrolling = true;
              var $module = self.$marqueeAni.find('.marquee-module-gm');
              var $item = $module.eq(0);
              var itemWidth = self._getWidth($item);


              // 每px用8毫秒
              var aniTime = itemWidth * 8;

              var pxRate = 1;
              if (window.GM && GM.pxRate) {
                pxRate = GM.pxRate;
              }
              aniTime = aniTime / pxRate;

              self.$marqueeAni.animateV1({
                left: -itemWidth + 'px'
              }, aniTime, function () {
                self.isScrolling = false;
                self.$marqueeAni
                  .append($item)
                  .css({
                    left: ''
                  });
                self._addItems(self.itemsArr)
                  ._removeExtra()
                  ._emptyStore();
                self.timeout = setTimeout(loop, 2000);
              });
            }
            clearTimeout(self.timeout);
            self.timeout = setTimeout(loop, 2000);
          },
          // 判断当前的元素是否可见
          isVisible: function (elem) {
            return !!(elem.width() || elem.height()) && elem.length > 0 && elem.css("display") !== "none";
          },
          // 获取item 的宽度
          _getWidth: function ($item) {
            var $item = this.$marqueeAni.find('.marquee-module-gm');
            var marginLeft = $item.css('margin-left');
            var marginRight = $item.css('margin-right');
            marginLeft = parseInt(marginLeft, 10);
            marginRight = parseInt(marginRight, 10);
            var width = $item.width();
            var widthAll = width + marginLeft + marginRight;
            return widthAll;
          },

          // 绑定事件
          _bindEvent: function () {
            var self = this;
            var $marqueeBox = this.$marqueeBox;
            var h = $marqueeBox.offset().top + $marqueeBox.height();
            var $window = $(window);
            var timeout;

            /*
              若当前的看不见滚动的数据, 则设置 visibility: hidden
            */
            $window.on('scroll', function () {
              var scrollTop = $window.scrollTop();
              var visibility;
              clearTimeout(timeout);
              timeout = setTimeout(function () {
                if (scrollTop < h || scrollTop === 0) {
                  visibility = 'visible';
                  self.isStop = false;
                  self.start();
                } else {
                  self.isStop = true;
                  visibility = 'hidden';
                }
                $marqueeBox.css({
                  visibility: visibility
                });
              }, 100);
            });
          },
          // 初始化元素
          _initEl: function () {
            var $marqueeBox = this.$marqueeBox;
            var $marqueeAni = $marqueeBox.find('.marquee-ul-gm');
            var $module = $marqueeAni.find('.marquee-module-gm')
              .removeClass('hide-gm')
              .remove()
              .clone();
            var boxWidth = $marqueeBox.width();
            this.$marqueeAni = $marqueeAni;
            this.$module = $module;
            this.boxWidth = boxWidth;
            return this;
          },
          init: function (target) {
            if ($.type(target) === 'string') {
              target = $(target);
            }

            // 若不可见, 直接 return;
            if (!this.isVisible(target)) {
              return this;
            }

            var $marqueeBox = target;
            this.$marqueeBox = $marqueeBox;
            this._initEl()
              ._bindEvent();
          }
        }
        marquee.init(target);
        return marquee;
      }
      // 获取url地址中的参数
    f.getQueryString = function () {
        var m,
          result = {},
          queryString = location.search.substring(1),
          re = /([^&=]+)=([^&]*)/g;

        while (m = re.exec(queryString)) {
          result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return result;
      }
      // ajax 请求
    f.marqueeAjax = function () {
      var me = this;
      var dataObj = {
        "gameId": GM.gameId,
        "type": 1
      }
      var marqAct = me.getQueryString().act;
      // 3款老游戏(包括native 的guess)要特殊处理，传action
      if (marqAct === 'slot' || marqAct === 'guess' || marqAct === 'guesswap' || marqAct === 'pinballwap' || marqAct === 'act_slot' || marqAct === 'game_poker' || marqAct === 'game_circus') {
        dataObj.action = marqAct;
      }
      //若此款游戏存在GM.marqueeType参数, 则赋值给它
      if (GM.marqueeType) {
        dataObj.type = GM.marqueeType;
      }
      // test
      dataObj = {
        action: "game_crazystuck",
        gameId: "4268",
        type: 1
      }
      $.ajax({
        type: 'GET',
        url: '/?act=game_gamecommon&st=getMarquee',
        dataType: 'json',
        data: dataObj,
        success: function (data) {
          //测试数据
          //data = ["恭喜ddd获得xx奖励","恭喜ddd获得xx奖励"];
          data = data || {};
          //if(data.statusCode == 0){
          // 测试用 data.msg = data.msg.slice(0, 15);
          me.marquee.add(data);
          //}
        }
      });

    }

    f.isVisible = function (elem) {
      return !!(elem.width() || elem.height()) && elem.css("display") !== "none";
    }

    // 跑马灯
    f.marqueeInit = function () {
      var me = this;
      // 若存在, 则不处理, 保证marqueeInit 只执行一次
      if (me.marquee) {
        return this;
      }
      var $target = $('.scroll-marquee-gm');

      // 检测是否是可见的
      var checkIsVisible = function () {
        if (me.isVisible($target)) {
          me.marquee = me.marqueeModule('.scroll-marquee-gm');
          me.marqueeAjax();
          setInterval(function () {
            me.marqueeAjax();
          }, 300000);
        } else {
          setTimeout(checkIsVisible, 1000);
        }
      }
      if ($target.length > 0) {
        checkIsVisible();
      }
    }

    // 初始化所有的属性
    f.init = function () {
      var me = this;
      me.marqueeInit();
    }
    f.init();
  }
  $(init);
})(window.jQuery, window);

/* 自适应页面布局 */
!function(){
	var func;
	var $html = $('html');
	var $window = $(window);
	var fitPage = function(pageWidth){
		// 默认页面的宽度是 750, 兼容以前的游戏
		pageWidth = pageWidth || 750;
		var fit = function(){
			var w = $html.width();
			w = w > pageWidth ? pageWidth: w;
			w = w / pageWidth;
			w = w * 100;
			$html.css({
				fontSize: w
			});
		}
		fit();
		if(typeof func === 'function'){
			$window.off('resize', func);
		};
		var t;
		func = function(){
			clearTimeout(t);
			t = setTimeout(fit, 25);
		}
		$window.on('resize', func);
	}
	fitPage(800);
}();
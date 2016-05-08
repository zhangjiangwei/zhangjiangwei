
/* 自适应页面布局 */
!function(){
	var func;
	var $html = $('html');
	var $window = $(window);
	var fitPage = function(pageWidth){
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
	fitPage();
}();
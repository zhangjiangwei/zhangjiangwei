this.zz = this.zz||{};
zz.Main=function(){
	var isRunning = false;
	if(isRunning) return;
	isRunning = true;
	console.log("gameStart!");
	this.stage($('#myView'));
	this.Main();
	/**
	*加载进度界面
	*/
	// this.loadingView = new zz.LoadingUI();
	// initialize the Resource loading library
    //初始化Resource资源加载库
	// this.loadingView.addEventListener("event")
	this.createScene();
};
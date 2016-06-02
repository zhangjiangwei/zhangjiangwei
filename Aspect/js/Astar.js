/**地图搜索Astar
*zhangjiangwei@h5zz.com
*/
this.zz=this.zz||{};
zz.Astar=function(){
	//定义打开列表和关闭列表用于判断搜索存储
	var openlist=new Array();
	var closelist=new Array();

	//定义地图边长
	var gw = 10;
	var gh = 10;
	var gwh = 14;
	//设置开始点;
	var p_start=new Array(2)
	//设置结束点;
	var p_end=new Array(2);

	var p_path="";
	var n_path="";

	var num,bg;
	//设置标志，表示起点，终点，障碍物
	var flag=0;

	var w=30,h=20;
	//绕过的点
	function GetRound(pos){
	  var a=new Array();
	  a[0]=(pos[0]+1)+","+(pos[1]-1);
	  a[1]=(pos[0]+1)+","+pos[1];
	  a[2]=(pos[0]+1)+","+(pos[1]+1);
	  a[3]=pos[0]+","+(pos[1]+1);
	  a[4]=(pos[0]-1)+","+(pos[1]+1);
	  a[5]=(pos[0]-1)+","+pos[1];
	  a[6]=(pos[0]-1)+","+(pos[1]-1);
	  a[7]=pos[0]+","+(pos[1]-1);
	  return a;
	}
<<<<<<< HEAD

	this.setPos=function(id,arr){
=======
	var arr2;
	this.setPos=function(id,arr){
		console.log(arr);
		if(arr == arr2) {
			console.log("已经存储")
			return;
		}else{
			arr2 = arr;
		}
>>>>>>> dev
		switch(id){
			case 1:
			    p_start=arr;
			    console.log("p_start:"+p_start);
			    break;
			case 2:
			    p_end=arr;
			    console.log("p_end:"+p_end);
			    break;
			case 3:
			    n_path+=arr.join(",")+";";
			    break;
			case 4:
				setPos();
				break;
			default:
				break;
		}
<<<<<<< HEAD
	}
=======
	};
	function setPos(){
	  var h=(Math.abs(p_end[0]-p_start[0])+Math.abs(p_end[1]-p_start[1]))*gw;
	  s_path=[h,0,h,p_start,p_start];
	};
>>>>>>> dev
}
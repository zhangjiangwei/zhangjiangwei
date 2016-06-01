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

	this.setPos=function(id,arr){
		switch(id){
			case 1:
			    p_start=arr;
			    break;
			case 2:
			    p_end=arr;
			    break;
			case 3:
			    n_path+=arr.join(",")+";";
			    break;
			default:
				break;
		}
	}
}
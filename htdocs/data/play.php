<?php
	header("Content-type: application/json");
	$str = '';
	foreach($_GET as $key=>$val)
	{
	    $str .= $key."='$val' AND "; 
	}
	$str = rtrim($str," AND ");

	$color = mt_rand(0, 3);
	$kinds = mt_rand(0, 4);
	$jarr = array(

		"message"	=>	"成功返回数据，需要加载游戏配置表",
		"pos"		=> 	"17",
		"prizeAmount"=>	10000,
		"prizeType"	=>	2,
		"statusCode"=>	"0000",
		"userId"	=>	2037493064,
    );
	// exit(json_encode($jarr))
	$json = json_encode($jarr);
	echo $json;
?>
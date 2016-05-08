<?php
	// header('Content-type: text/json');
	header("Content-type: application/json");

	
	$jarr = array(
		"wltScore"=>0,
		"TScore"=>0,
		"TCoin"=>0,
		"tingdou"=>49999999500,
		"caijin"=>19525,
		"gameScore"=>50000019025,
		"total"=>50000019025
    );
	// exit(json_encode($jarr))
	$json = json_encode($jarr);
	print $json;
?>
<?php
//if($fd=fopen('toto.txt','a+')){ fwrite($fd , __LINE__ . ' ' . var_export( $_POST , true ) ); fclose($fd); }
$postData=json_decode($_POST['data'],true);
$sleep=0;
if(isset($postData['sleeptime']) && is_numeric($postData['sleeptime']) && (int)$postData['sleeptime']>=1 && (int)$postData['sleeptime']<=10){
 $sleep=(int)$postData['sleeptime'];
}
sleep($sleep);
$o1=array('sleeptime' => $sleep);
header('Content-Type: application/json');

//callAnUndefinedFunction(); // uncomment this to set a type of bug

//header("HTTP/1.1 500 big 500 error code here"); exit(); // uncomment this to set an other type of bug



echo json_encode($o1);

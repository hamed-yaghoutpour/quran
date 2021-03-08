<?php
	$servername = "localhost";
	$username = "aneserin_root";
	$password = "hamed1382h";
	$db_name = "aneserin_quran";
	// $servername = "localhost";
	// $username = "root";
	// $password = "";
	// $db_name = "quran";
	$conn = mysqli_connect($servername,$username,$password,$db_name);
	mysqli_set_charset($conn,"utf8");
	$sql = "create table if not exists main(
		id  int(4) primary key auto_increment,
		full_name varchar(50) not null
	)";
	mysqli_query($conn,$sql);
?>



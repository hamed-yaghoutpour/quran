<?php
	include_once("database_config.php");
	$full_name = $_GET["full_name"];
	$sql = "
		insert into main (full_name) values ('$full_name')
	";
	mysqli_query($conn,$sql);
	$sql = "select * from main;";
	$results = mysqli_query($conn,$sql);
	$row = (int)mysqli_num_rows($results);
	$row = ($row * 5)-5;
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css.css">
	<title>quran</title>
</head>
<body>
	<!-- background-image: -->
	<img src="2.jpg" class="background">
	<h1 class="ok">خانم/آقای <span><?php echo $full_name ?></span> سهم شما با موفقیت ثبت شد <span>مقدار ثبت شده برای شما:</span></h1>
	<div class="container_2">
	<h1 class="page">صفحه <span><?php echo $row+1 ?></span></h1>
	<h1 class="page">صفحه <span><?php echo $row+2 ?></span></h1>
	<h1 class="page">صفحه <span><?php echo $row+3 ?></span></h1>
	<h1 class="page">صفحه <span><?php echo $row+4 ?></span></h1>
	<h1 class="page">صفحه <span><?php echo $row+5 ?></span></h1>
	</div>
	
</body>
</html>




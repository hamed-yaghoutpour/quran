<?php
include_once("database_config.php");
	$sql = "
		select * from main
	";
	$results = mysqli_query($conn,$sql);
	$readed_pages_count = (int)mysqli_num_rows($results) * 5;
?>

<!DOCTYPE html>
<html>
<head>
	<!-- <script src="jquery-3.5.1.js"></script> -->
	<!-- <script src="vue.js"></script> -->
	<meta charset="utf-8">
	<link rel="stylesheet" href="css.css">
	<title>quran</title>	
	
</head>
<body>
	<!-- background-image: -->
	<img src="2.jpg" class="background">
	<?php if($readed_pages_count<605) : ?>
		<div id="container">
		<h1 class="title">طرح ختم <span>قرآن </span>گروهی دبیرستان <span style="color:green;">فرهنگ فاطمیه</span></h1>
		<h1 class="all_pages_count">مجموع تمام صفحات: 604</h1>
		<h1 class="readed_pages_count">مجموع صفحاتی که تا به حال تقبل شده است: <?php echo $readed_pages_count ?></h1>
		<div class="line"></div>
		<div class="form">
			<h1>در صورت تمایل به شرکت در این طرح، نام کامل خود را وارد کنید.</h1>
			<span class="number_3">تعداد صفحات: 5 </span>
			<input placeholder="نام و نام خانوادگی شرکت کننده" id="full_name">
			<button id="submit_button">ثبت اطلاعات</button>
		</div>
		</div>
	<?php else: ?>
		<h1 class="finished">با عرض پوزش،  ظرفیت این دوره از ختم به پایان رسیده است و به امید خدا دوره بعد به زودی شروع خواهد شد، التماس دعای فراوان</h1>
	<?php endif; ?>
	<script>
	
	document.getElementById('submit_button').addEventListener('click',function(){
		var input_value = document.getElementById('full_name').value;
		
		function submit_data(function_full_name){
			window.location.assign("action.php?full_name="+function_full_name);
		};
		
		if(input_value != ''){
			if(confirm("آیا از صحت نام ورودی اطمینان دارید؟")){
			submit_data(input_value);
			};
		}else{
			if(confirm("شما نامی وارد نکرده اید، در صورتی که به دلایل شخصی نمیخواهید اسم خود را وارد کنید،تایید کنید.")){
				submit_data('ناشناس');
			};
		};
	});
	</script>
</body>
</html>




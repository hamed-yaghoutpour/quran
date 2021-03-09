<?php
	mysqli_query($conn,$sql);
	class db{
		public $connection;
		public function connect($mode = "public"){
			if($mode == "private"){
				$servername = "localhost";
				$username = "root";
				$password = "";
				$db_name = "quran";
			}
			
			if($mode == "public"){
				$servername = "localhost";
				$username = "aneserin_root";
				$password = "hamed1382h";
				$db_name = "aneserin_quran";
			}
			
			$this.connection = mysqli_connect($servername,$username,$password,$db_name);
			mysqli_set_charset($this.connection,"utf8");
		}
		public function preConfigure(){
			$sql = "create table if not exists records(
				id  int(4) primary key auto_increment,
				full_name varchar(50) not null
			)";
			mysqli_query($this.connection,$sql)
		}
		public function newRecord($full_name){
			$sql = "
				insert into records (full_name) values ('$full_name');
			";
			mysqli_query($this.connection,$sql);

			//return readed pages count:
			$sql = "
				select * from records
			";
			$results = mysqli_query($this.connection,$sql);
			return mysqli_num_rows($results)*5;
		}
		public function getAllRecordsAsJson(){
			$sql = "
				select * from records
			";
			$results = mysqli_query($this.connection,$sql);
			$returnValue = [];
			while($row = mysqli_fetch_assoc($results)){
				$returnValue[] = $row["full_name"]
			}
			return json_encode($returnValue)
		}
		
	}



	// answer to get requests:
	$db = new db;
	$db->connect();
	$db->preConfigure();

	if($_GET["action"]=="newRecord"){
		$full_name = $_GET["full_name"];
		
		
		echo $db->newRecord($full_name);
	}
	
	if($_GET["action"]=="getAllRecordsAsJson"){
		echo $db->getAllRecordsAsJson();
		
	}



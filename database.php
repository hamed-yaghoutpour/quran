<?php
	
	class db{
		public $connection;
		public $servername;
		public $username;
		public $password;
		public $db_name;
		public function __construct($mode = "public"){
			if($mode == "private"){
				$this->servername = "localhost";
				$this->username = "root";
				$this->password = "";
				$this->db_name = "records";
			}elseif($mode == "public"){
				$this->servername = "localhost";
				$this->username = "aneserin_root";
				$this->password = "hamed1382h";
				$this->db_name = "aneserin_quran";
			};
			$this->preConfigure();
		}
		public function preConfigure(){
			$this->connection = mysqli_connect($this->servername,$this->username,$this->password);
			mysqli_set_charset($this->connection,"utf8");

			$sql = "create database if not exists records";
			mysqli_query($this->connection,$sql);
			mysqli_set_charset($this->connection,"utf8");

			$this->connection = mysqli_connect($this->servername,$this->username,$this->password,$this->db_name);
			$sql = "create table if not exists records(
				id  int(4) primary key auto_increment,
				full_name varchar(50) not null
			)";
			mysqli_query($this->connection,$sql);
		}
		public function newRecord($full_name){
			$sql = "
				insert into records (full_name) values ('$full_name');
			";
			mysqli_query($this->connection,$sql);
			$sql = "
				select * from records
			";
			$results = mysqli_query($this->connection,$sql);
			return mysqli_num_rows($results)*5;
		}
		public function getAllRecordsAsJson(){
			$sql = "
				select * from records
			";
			$results = mysqli_query($this->connection,$sql);
			$returnValue = [];
			$counter = 1;
			while($row = mysqli_fetch_assoc($results)){
				$returnValue[] = [
					"full_name"=>$row["full_name"],
					"person_number" => $counter
				];
				$counter++;
			};
			return json_encode($returnValue);
		}
		
	}



	// answer to get requests:
	$db = new db("private");
	if($_GET["action"]=="newRecord"){
		$full_name = $_GET["full_name"];
		echo $db->newRecord($full_name);
	};
	
	if($_GET["action"]=="getAllRecordsAsJson"){
		echo $db->getAllRecordsAsJson();
		
	};



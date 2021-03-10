//this file uses jquery so you have to uput it after that in a html file :

    function newRecord(full_name){
        var readedPagesCount;
        $.ajax({
            url:"database.php",
            method:"GET",
            async:false,
            data:{
                action:"newRecord",
                full_name:full_name
            },
            success:function(data){
                readedPagesCount = Number(data);
                
            },
            fail:function(error){
                console.log(error)
            }

        });
        return readedPagesCount;
    }
    function getAllRecordsAsJson(){ // return an array
        
        var returnValue = false;
        $.ajax({
            url:"database.php",
            method:"GET",
            async:false,
            data:{
                action:"getAllRecordsAsJson"
            },
            success:function(data){
                returnValue = JSON.parse(data)
            }

        })
        return returnValue
    }

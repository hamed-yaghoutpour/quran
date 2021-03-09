//this file uses jquery so you have to uput it after that in a html file :
class db{
    newRecord(full_name){
        let readedPagesCount;
        $.ajax({
            url:"database.php",
            method:"GET",
            data:{
                action:"newRecord",
                full_name:full_name
            },
            success:function(data){
                readedPagesCount = Number(data)
            }

        })
        return readedPagesCount
    }
    getAllRecordsAsJson(){ // return an array
        
        let returnValue;
        $.ajax({
            url:"database.php",
            method:"GET",
            data:{
                action:"getAllRecordsAsJson"
            },
            success:function(data){
                returnValue = JSON.parse(data)
            }

        })
        return returnValue
    }

}
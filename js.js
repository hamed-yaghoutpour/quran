function newRecord(full_name){
    var returnValue;
    $.ajax({
        url:"database.php",
        method:"GET",
        async:false,
        data:{
            action:"newRecord",
            full_name:full_name
        },
        success:function(data){
            console.log(data +"is new record ajax resived data ")
            if(data == "limitReached"){
                returnValue = "limitReached"
            }else{
                returnValue = Number(data);
            }
            
            
        }

    });
    return returnValue;
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
            console.log(data +"is new get all records as json ajax resived data ")
            returnValue = JSON.parse(data)
        }

    })
    return returnValue
}

$(document).ready(function(){
function updateRecords(){
    app.people_object = getAllRecordsAsJson()
    $(".readedPagesCounter span").html(getAllRecordsAsJson().length * 5)
}
updateRecords();

$(".submitButton").click(function(){
    let confirm = window.confirm("صحت اطلاعات ورودی را تایید می کنید؟")
    if(! confirm){
        return false;
    };
    var x = newRecord($("input").val())
    if(x== "limitReached"){
        alert(`
            با عرض پوزش تمام صفحات این دوره از ختم قرآن تقسیم شده است، التماس دعا
        `)
    }else{
        alert(`
        سهم شما صفحه های:
        ${x-4}
        ${x-3}
        ${x-2}
        ${x-1}
        ${x}

        `)
    }
    updateRecords();
})

})
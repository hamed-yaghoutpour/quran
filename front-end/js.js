function newRecord(full_name){
    if((getAllRecordsAsJson().length * 5) >= 605){
        return "limitReached"
    }else{
        var returnValue;
        $.ajax({
            url:"./back-end/database.php",
            method:"GET",
            async:false,
            data:{
                action:"newRecord",
                full_name:full_name
            },
            success:function(data){
                console.log(data)
                returnValue = Number(data);
            }

         });
        return returnValue;
    }
}
function getAllRecordsAsJson(){ // return an array
    let returnValue;
    $.ajax({
        url:"./back-end/database.php",
        method:"GET",
        async:false,
        data:{
            action:"getAllRecordsAsJson"
        },
        success:function(data){
            console.log(data)
            returnValue = JSON.parse(data)
        }

    })
    return returnValue
}
function updateRecords(){
    //pass recived data to vue:
    app.people_object = getAllRecordsAsJson()
    $(".readedPagesCounter span").html(getAllRecordsAsJson().length * 5)
}
$(document).ready(function(){

    updateRecords();
    /* for(var i = 0;i<300;i++){
        console.log(newRecord("hamed"))
    } */

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
    $("input").keydown(function(e){
        if(e.keyCode == 13){
            $(".submitButton").trigger('click')
        }
    })

})
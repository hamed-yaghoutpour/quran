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
            returnValue = JSON.parse(data)
        }

    })
    return returnValue
}
function showNewItem(full_name) {
    let returnValue = document.createElement("div")
    returnValue.className = "item"
    let svgIcon = document.createElement("img")
    svgIcon.src="person.svg"
    returnValue.appendChild(svgIcon)

    let child2 = document.createElement("h1")
    child2.innerHTML = full_name
    returnValue.appendChild(child2)
    return returnValue
}
$(document).ready(function(){
function updateRecords(){
    $(".allRecords").empty();
    getAllRecordsAsJson().forEach(full_name => {
        $(".allRecords").append(showNewItem(full_name))
    });
    $(".readedPagesCounter span").html(getAllRecordsAsJson().length)
    console.log(getAllRecordsAsJson().length + "is ")
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
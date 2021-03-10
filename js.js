$(document).ready(function(){
    function updateRecords(){
        $(".allRecords").empty();
        getAllRecordsAsJson().forEach(element => {
            $(".allRecords").append(
                `
                    <div class="item">
                        <h1>${element}</h1>
                    </div>
                `
            )
        })
    }
    $(".submitButton").click(function(){
        var x = newRecord($("input").val())
        alert(`
            سهم شما صفحه های:
            ${x-4}
            ${x-3}
            ${x-2}
            ${x-1}
            ${x}

        `)
        updateRecords();
    })

})
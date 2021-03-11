Vue.component('item',{
    props:["full_name"],
    template:`
        <div class="item">
            <img src="person.svg">
            <h1>{{full_name}}</h1>
        </div>
    `,
    methods:{
        showPersonPages:function(){
            console.log(22)
        }
    }
})
const app = new Vue({
    el:"#Vue_container",
    data:{
        people_object:[
            {
                name:"hamed"
            }
        ]
    }
});
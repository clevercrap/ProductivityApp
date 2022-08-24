// task constroctor

class Task {
    constructor(task_name, started_time){
        this.task_name = task_name;
        this.started_time = started_time;
    }
}

// UI constructor

class UI {
    
    addtasktolist(task){
        const list = document.querySelector("#task-list");
        
        // creating an element
        const row = document.createElement("tr");
        // inserting elements to the list 
        row.innerHTML = `
            <td>${task.task_name}</td>
            <td>${task.started_time}</td>
            <td class = "${task.task_name}"><button class="button-primary">Finished</button></td>
            <td><a href="#" class = "delete">X</a></td>
        `;
        list.appendChild(row);
    }

    // clearig the field
    clearfields(){
        document.querySelector("#task-name").value = '';
    }

    // clear the finish btn and add duration

    addduration(duration, task_name){

        const head_row = document.querySelector(".head_row").children;
        document.querySelector(".button-primary").remove();

        head_row[2].innerHTML = "TIME ELAPSED";
        document.querySelector("."+task_name).innerHTML = duration;
    }
}

// creating the event listner for adding the task

document.addEventListener("submit",function(e){

    // get form values
    const task_name = document.querySelector("#task-name").value;
    const today = new Date();
    const started_time = today.getHours()+":"+today.getMinutes();

    // instansiation of task
    const task = new Task(task_name, started_time);

    // instansiation of ui
    const ui = new UI();

    ui.addtasktolist(task);
    ui.clearfields();
    e.preventDefault();
})

// creating the event lister for deleting the list

document.querySelector("#task-list").addEventListener("click",function(e){

    if(e.target.className === "delete"){

        e.target.parentElement.parentElement.remove();
    }

    e.preventDefault();
})

// spended time calculator 

document.querySelector("#task-list").addEventListener("click", function(e){
    
    if(e.target.className === "button-primary"){
        const today = new Date();
        const started_time = e.target.parentElement.parentElement.children.item(1).innerHTML +":"+today.getMilliseconds();
        const current_time = today.getHours()+":"+today.getMinutes()+":"+today.getMilliseconds();
        const task_name = e.target.parentElement.className;
        var d1 = new Date(Date.parse(started_time));
        var d2 = new Date(Date.parse(current_time));

        var getDuration = function(d1, d2) {
            d3 = new Date(d2 - d1);
            d0 = new Date(0);
        
            return {
                getHours: function(){
                    return d3.getHours() - d0.getHours();
                },
                getMinutes: function(){
                    return d3.getMinutes() - d0.getMinutes();
                },
                getMilliseconds: function() {
                    return d3.getMilliseconds() - d0.getMilliseconds();
                },
                toString: function(){
                    return this.getHours() + ":" +
                           this.getMinutes() + ":" + 
                           this.getMilliseconds();
                },
            };
        }
        
        const diff = getDuration(d1, d2);
        const ui = new UI();

        ui.addduration(diff.toString(),task_name);
        
    }
    e.preventDefault();
})




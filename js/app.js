// Select the Elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables

let LIST, id;

// Get item from localstorage
let data = localStorage.getItem("TODO");

// This checks if data isn't empty
if(data){
    LIST = JSON.parse(data);
    // Set the id to the last one in the list
    id = LIST.length;
    // Load the list to the user's interface
    loadList(LIST);
}else{

    LIST = []; 
    id = 0; 

}

// Load the items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clear  the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


// Get the todays date
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Add to do function

function addToDo(toDo, id, done, trash){

    if(trash){return; }

    const DONE =  done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH: "";


    const item = ` 
                    <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                `;

    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// add an item to the list when the user hit the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode ==13){
        const toDo = input.value;

        // check if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false

            }); 

            // Add an item to the localstorage 
            //(This line must be added where the array List is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));


            id++;
        }
        input.value = "";
    }
});

// Complete to do

function completToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;

}

// Remove to do

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
    
   
}

// targe the items created

list.addEventListener("click", function(event){
    // return the clicked element from the list
    const element = event.target; 

    // complete or delete
    const elementJob = element.attributes.job.value; 

    if(elementJob == "complete"){
        completToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element)
    }

    // (This line must be added where the array List is updated)
    localStorage.localStorage.setItem("TODO", JSON.stringify(LIST));
});

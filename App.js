var inputId = document.getElementById("text");
var button = document.getElementById("submit");

let totalTask =  [];
var opentask;
var inProgress;
var inReview;
var doneTask;

document.querySelectorAll(".cards>div").forEach((value)=>{
    value.addEventListener("mouseover", function(){
        if(this.id==="openCard"){
            document.getElementById("showText").textContent = "Open";
        }

        else if(this.id==="in_progress"){
            document.getElementById("showText").textContent = "Progress";
        }

        else if(this.id==="review"){
            document.getElementById("showText").textContent = "Review";
        }
        else{
            document.getElementById("showText").textContent = "Done";
        }
    })
})



function dataFilter(){
    opentask = totalTask.filter((obj)=>obj.taskType==="open");
    inProgress = totalTask.filter((obj)=>obj.taskType==="progress");
    inReview = totalTask.filter((obj)=>obj.taskType==="in-review");
    doneTask = totalTask.filter((obj)=>obj.taskType==="done");
}
dataFilter();

var openCard = document.getElementById("openCard");
var progress = document.getElementById("in_progress");
var review = document.getElementById("review");
var done = document.getElementById("done");
var dragstartId = null;
var globalId;



function openTaskRender(){
    openCard.textContent = "";
    opentask.forEach((val, index)=>{    
        var newElement = document.createElement("div");
        newElement.className = "cardDiv";
        newElement.id = val.id;
        globalId = val.id;
        newElement.draggable = true;
        openCard.appendChild(newElement);
        newElement.textContent = val.taskname;
        let textContainer = document.getElementById("textContainer");
        var deleteButton = document.createElement("button");
        deleteButton.className = "removeButton";
        deleteButton.textContent = "Delete";
        newElement.appendChild(deleteButton);
        var descriptionButton = document.createElement("button");
        descriptionButton.className = "descriptionbutton";
        descriptionButton.textContent = "Add Text";
        newElement.appendChild(descriptionButton);
        newElement.addEventListener("dragstart", (e)=>{
            dragstartId = e.target.id;
        });
        deleteButton.addEventListener("click", ()=>{
            totalTask.splice(index,1);
            textContainer.style.display = "none"; 
            dataFilter();
            openTaskRender();
        });
        let descriptionDiv = document.createElement("div");
        descriptionDiv.className = "descriptionDiv";

        descriptionDiv.textContent = val.description;
        newElement.appendChild(descriptionDiv);
        descriptionButton.addEventListener("click", ()=>{
            textContainer.style.display = "block";
        })
        if (descriptionDiv.scrollWidth > newElement.clientWidth || descriptionDiv.scrollHeight > newElement.clientHeight) {
            descriptionDiv.style.overflow = "scroll";
        }          
    })
}

openTaskRender();

function progressTaskRender(){
    progress.textContent = "";
    inProgress.forEach((val, index)=>{  
        var newElement = document.createElement("div");
        newElement.className = "cardDiv";
        newElement.id= val.id;
        newElement.draggable = true;
        progress.appendChild(newElement);
        newElement.textContent = val.taskname;
        var deleteButton = document.createElement("button");
        deleteButton.className = "removeButton";
        deleteButton.textContent = "Delete"
        newElement.appendChild(deleteButton);
        newElement.addEventListener("dragstart", (e)=>{
            dragstartId = e.target.id;
        });
        deleteButton.addEventListener("click", ()=>{
            totalTask.splice(index,1);
            dataFilter();
            openTaskRender();
            progressTaskRender();
        });
        let descriptionDiv = document.createElement("div");
        descriptionDiv.className = "descriptionDiv";
        descriptionDiv.textContent = val.description;
        newElement.appendChild(descriptionDiv);
    });
}

function reviewTaskRender(){
    review.textContent = ""; 
    inReview.forEach((val, index)=>{  
        var newElement = document.createElement("div");
        newElement.className = "cardDiv";
        review.appendChild(newElement);
        newElement.textContent = val.taskname;
        newElement.id = val.id;
        newElement.draggable = true;
        var deleteButton = document.createElement("button");
        deleteButton.className = "removeButton";
        deleteButton.textContent = "Delete"
        newElement.appendChild(deleteButton);
        newElement.addEventListener("dragstart", (e)=>{
            dragstartId = e.target.id;
        })
        deleteButton.addEventListener("click", ()=>{
            totalTask.splice(index,1);
            dataFilter();
            openTaskRender();
            progressTaskRender();
            reviewTaskRender();
        });
        let descriptionDiv = document.createElement("div");
        descriptionDiv.className = "descriptionDiv";
        descriptionDiv.textContent = val.description;
        newElement.appendChild(descriptionDiv);
    })
}



function doneTaskRender(){
    done.textContent = ""; 
    doneTask.forEach((val, index)=>{  
        var newElement = document.createElement("div");
        newElement.className = "cardDiv";
        newElement.id = val.id;
        newElement.draggable = true;
        done.appendChild(newElement);
        newElement.textContent = val.taskname;
        var deleteButton = document.createElement("button");
        deleteButton.className = "removeButton";
        deleteButton.textContent = "Delete"
        newElement.appendChild(deleteButton);
        newElement.addEventListener("dragstart", (e)=>{
            dragstartId = e.target.id;
        })
        deleteButton.addEventListener("click", ()=>{
            totalTask.splice(index,1);
            dataFilter();
            openTaskRender();
            progressTaskRender();
            reviewTaskRender();
            doneTaskRender();
        });
        let descriptionDiv = document.createElement("div");
        descriptionDiv.className = "descriptionDiv";
        descriptionDiv.textContent = val.description;
        newElement.appendChild(descriptionDiv);
    })
}

doneTaskRender();

button.addEventListener("click", () => {
    let id = "abc"+ Math.floor(Math.random()*100)+"cd"+Math.floor(Math.random()*100);
    let obj = {
        taskname:inputId.value,
        description:checkClick(),
        taskType:"open",
        id:id,
    };
    function checkClick(){
        let textarea  = document.getElementById("textarea");
        let textSubmit = document.getElementById("textSubmit");
        textSubmit.addEventListener("click", ()=>{
            for(let i = 0; i<totalTask.length; i++){
                if(totalTask[i].id===globalId){
                    totalTask[i].description = textarea.value;
                }
            }
            document.getElementById("textContainer").style.display = "none";
            openTaskRender();
        })
    }
    checkClick();
    totalTask.push(obj);
    dataFilter();
    openTaskRender();
    progressTaskRender();
    reviewTaskRender();
    doneTaskRender();
});

function progressDetails(){    
    progress.addEventListener("dragover", (e)=>{
        e.preventDefault();
    })
    progress.addEventListener("drop", (e)=>{
        e.preventDefault();
        if(e.target.id==="in_progress"){        
            for(let i = 0; i<totalTask.length; i++){
                if(totalTask[i].id===dragstartId){
                    totalTask[i].taskType = "progress";
                    break; 
                }
            }
            dataFilter();
            openTaskRender();
            progressTaskRender();
            reviewTaskRender();
            doneTaskRender();
        }   
    });
}

progressDetails(); 

function reviewDetails(){
    review.addEventListener("dragover", (e)=>{
        e.preventDefault();
    });
    review.addEventListener("drop", (e)=>{
        e.preventDefault();
        if(e.target.id==="review"){
            for(let i = 0; i<totalTask.length; i++){
                if(totalTask[i].id===dragstartId){
                    totalTask[i].taskType = "in-review";
                    break;
                }
            }
            dataFilter();
            openTaskRender();
            progressTaskRender();
            reviewTaskRender();
            doneTaskRender();
        }
    })
}


reviewDetails();

function doneDetails(){
    done.addEventListener("dragover", (e)=>{
        e.preventDefault();
    });
    done.addEventListener("drop", (e)=>{
        e.preventDefault();
        if(e.target.id==="done"){
            for(let i = 0; i<totalTask.length; i++){

                if(totalTask[i].id===dragstartId){
                    totalTask[i].taskType = "done";
                    break;
                }
            }
            dataFilter();
            openTaskRender();
            progressTaskRender();
            reviewTaskRender();
            doneTaskRender();
          
        }
    })
}

doneDetails();















// virtual dom


// re-concilation


// state are mutable or immutable


// why we should not update state directly ?


// is updating state are sync or async ?


// how react update the state and show the updated value in ui ?


// what is reac-fiber ?


// what is differ algo ?


// how many dom react maintain at the time of state update ?



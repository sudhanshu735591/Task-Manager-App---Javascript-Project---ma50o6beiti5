var inputId = document.getElementById("text");
var button = document.getElementById("submit");
let textarea = document.getElementById("textarea");
let newTextArea;

let textSubmit = document.getElementById("textSubmit");

let totalTask =  [];
var opentask;
var inProgress;
var inReview;
var doneTask;



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
var descriptionId;


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
        var deleteButton = document.createElement("button");
        deleteButton.className = "removeButton";
        deleteButton.textContent = "Delete"
        newElement.appendChild(deleteButton);
        let textContainer = document.getElementById("textContainer");
        var descriptionButton = document.createElement("button");
        descriptionButton.className = "descriptionbutton";
        descriptionButton.textContent = "Add Description";
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

        for(let i = 0; i<opentask.length; i++){
            if(opentask[i].id===globalId){
                descriptionDiv.textContent = val.description;
            }
        }
        
        newElement.appendChild(descriptionDiv);

        descriptionButton.addEventListener("click", ()=>{
            console.log(index, descriptionDiv);
            descriptionId = index;          
            textContainer.style.display = "block";
        })    
    })
}

document.getElementById("textSubmit").addEventListener("click", (e)=>{
    opentask[descriptionId].description = textarea.value;
    document.getElementById("textarea").value = "";
    openTaskRender();
});


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
progressTaskRender();

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

reviewTaskRender();

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
        description:"",
        taskType:"open",
        id:id,
    };
    totalTask.push(obj);
    dataFilter();
    openTaskRender();
    progressTaskRender();
    reviewTaskRender();
    doneTaskRender();
    inputId.value="";
});

function progressDetails(){    
    progress.addEventListener("dragover", (e)=>{
        console.log("dragover");
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

















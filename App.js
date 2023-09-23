var inputId = document.getElementById("text");
var button = document.getElementById("submit");

let totalTask =  [
    
];

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


function openTaskRender(){
    openCard.textContent = "";
    opentask.forEach((val, index)=>{    
        console.log("opentask", opentask);
        var newElement = document.createElement("div");
        newElement.className = "cardDiv";
        newElement.id = val.id;
        newElement.draggable = true;
        openCard.appendChild(newElement);
        newElement.textContent = val.taskname;
    



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
            console.log("dragstartId", dragstartId);
        });


        deleteButton.addEventListener("click", ()=>{
            totalTask.splice(index,1);
            dataFilter();
            openTaskRender();
        });

        let descriptionDiv = document.createElement("div");
        descriptionDiv.className = "descriptionDiv";

        descriptionDiv.textContent = val.description;
        newElement.appendChild(descriptionDiv);
        console.log("newElement", newElement);


        let textContainer = document.getElementById("textContainer");
        let textSubmit = document.getElementById("textSubmit");


        descriptionButton.addEventListener("click", ()=>{
            textContainer.style.display = "block";
        })

        textSubmit.addEventListener("click", ()=>{
            let textarea = document.getElementById("textarea");
            val.description = textarea.value;
            textContainer.style.display = "none"; 
            openTaskRender();
        })

        if (descriptionDiv.scrollWidth > newElement.clientWidth || descriptionDiv.scrollHeight > newElement.clientHeight) {
            descriptionDiv.style.overflow = "scroll";
        }
                
         
        // });
    })
}









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
            console.log("dragstartId progressTaskRender", dragstartId);
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
            console.log("totalTask in progress", totalTask);
            totalTask.splice(index,1);
            console.log("after", opentask);
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
});







function progressDetails(){    
    progress.addEventListener("dragover", (e)=>{
        e.preventDefault();
    })

    progress.addEventListener("drop", (e)=>{
        e.preventDefault();
        console.log("drop", e.target);
        console.log("drop id", e.target.id);

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
        console.log("inProgress", inProgress);
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
                    console.log(`dragstartId ${dragstartId  }`);
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
            console.log("done");
            for(let i = 0; i<totalTask.length; i++){
                console.log("totalTask[i].id -->", totalTask[i].id, "dragstartId-->", dragstartId);

                if(totalTask[i].id===dragstartId){
                    console.log(`dragstartId ${dragstartId  }`);
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
























let card1 = document.querySelectorAll(".card1");

card1.forEach((e)=>{
    let id = null;
    e.addEventListener("click", ()=>{
        id = e.id;
        console.log(id);
        if(id==="openCard"){
            console.log(id);
            opentask.forEach((val, index)=>{
                console.log("val", index);
            })
        }

        else if(id==="in_progress"){

        }

        else if(id==="review"){

        }

        else if(id==="done"){

        }
    })
})


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




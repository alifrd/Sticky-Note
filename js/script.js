(() => {
    
    const BackEnd = (() =>{
    })();

  
  
  
  
  
    const FrontEnd =(() =>{
    })();
 

  
  
  
  
    const Controller = ((bckEnd,frnEnd) =>{
        const Dom = frnEnd.getDom() ;
        

        const setUpEventListner = () => {
          
            const Notes = document.querySelectorAll('li');
            Notes.forEach(element => {
                element.addEventListener('click',function(e){   modifyNote(e,"edit");   });
                element.addEventListener('mouseleave',function(e){  modifyNote(e,"set");    });
            });
            
            document.querySelector(Dom.addbtn).addEventListener('click' , addNote )
            document.querySelector(Dom.noteDelete).addEventListener('click' , function(e) {
                deleteNote(e);     
            });
        
        };

        const modifyNote =(e,mode) =>{
            let content , targetId;
            if(mode === "edit"){
                targetId = e.path[1].id;
                content = frnEnd.callNote(targetId);
            }
            else if(mode === "set"){
                targetId = e.path[0].id;
                content = frnEnd.rejectNote(targetId);
            }
            if(targetId.length !== 0){
               BackEnd.setLocalStorage(targetId,content);
            }
        }

        const addNote = () => {
            frnEnd.BuildNote("Note_"+(BackEnd.numberOfNote()+1),"click for edit");
            setUpEventListner();
        }

        const deleteNote = (e) => {
        }

        const loadHistyory = () =>{
            let perviousNote ;
            let note = [];
            perviousNote =  bckEnd.returnAllNote();
            frnEnd.buildHistory(perviousNote);
        }
        const init = (() =>{
            loadHistyory();    
            setUpEventListner();
        
        });

        init();
    })(BackEnd,FrontEnd);
})();
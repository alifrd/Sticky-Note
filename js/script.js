(() => {
    
    const BackEnd = (() =>{
    })();

  
  
  
  
  
    const FrontEnd =(() =>{
        const Dom= {
            noteID : 'Note_',
            noteContainer : 'ul',
            addbtn : '#addSticker',
            noteDelete : '.Del'

        }
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
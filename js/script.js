(() => {
    
    const BackEnd = (() =>{

        return{
            setLocalStorage : (id,content)=>{
                localStorage.setItem(id,content);
            },
            numberOfNote : () => {
                return localStorage.length;
            },
            returnAllNote :() => {
                let stack = [];
                let filedbuilder;
                for (let index = 1; index <= localStorage.length; index++) {
                    filedbuilder = "Note_"+index;
                    stack.push(filedbuilder+"||"+localStorage.getItem(filedbuilder))  ;               
                }
                return stack;
            }
        }
    })();

  
  
  
  
  
    const FrontEnd =(() =>{
        const Dom= {
            noteID : 'Note_',
            noteContainer : 'ul',
            addbtn : '#addSticker',
            noteDelete : '.Del'

        }

        const clearContent = (noteId) => {
            document.querySelector("#"+noteId).children[0].textContent = "";
        }

        const getContent = (id) =>{
            return document.querySelector("#"+id).children[0].textContent ; 
        }
        const getRndInteger = (min, max) => {
            return Math.floor(Math.random() * (max - min) ) + min;
        }
        const noteBuilder = (id,content)=>{
            let newNote , container ;
            newNote = `<li raggable="true" style="top: ${getRndInteger(-5,70)}%; left:${getRndInteger(0,80)}%;" id="${id}"><a>${content}<img class="Del" src="img/garbage.svg" alt="Delete it"></a></li>`;
            container = document.querySelector(Dom.noteContainer);
            container.innerHTML += newNote ;
        }
        return{
            getDom : () => {
                return Dom;
            },
            callNote : (noteId) => {
                if (noteId != ""){
                    let content;
                    content = getContent(noteId);
                    content = content.trim();    
                    clearContent(noteId);
                    document.querySelector('#'+noteId).innerHTML = `<a><textarea cols="90" rows="90" maxlength="150">${content}</textarea><img class="Del" src="img/garbage.svg" alt="Delete it"></a>`;
                    return content;
                }
            },
            rejectNote : (noteId) => {
                if (noteId != ""){
                    let textAreaContent;
                    textAreaContent = document.querySelector("#"+noteId+" > a > textarea").value ;
                    document.querySelector('#'+noteId).innerHTML = "<a>"+textAreaContent+"<img class=\"Del\" src=\"img/garbage.svg\" alt=\"Delete it\"></a>"; 
                    return textAreaContent;      
                }
            },
            BuildNote : (id,content) =>{
                noteBuilder(id,content);
            },
            getContentById : (id,tag,className) =>{
                return getContent(id,tag,className);
            },
            buildHistory : (pervNote) =>{
                pervNote.map(function(ele) {
                    note = ele.split("||");
                    noteBuilder(note[0],note[1]);
                });
            }
           
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
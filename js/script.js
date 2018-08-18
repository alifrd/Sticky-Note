(() => {
    
    const BackEnd = (() =>{
        var lastnumber ;
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
                if(localStorage.getItem("num"))
                    lastnumber = localStorage.getItem("num")
                else{
                    localStorage.setItem("num",0);
                    lastnumber = 0 ;
                }
                for (let index = 0; index <= lastnumber ; index++) {
                    filedbuilder = "Note_"+index;
                    if(localStorage.getItem(filedbuilder))
                        stack.push(filedbuilder+"||"+localStorage.getItem(filedbuilder))  ;               
                }
                return stack;
            },
            delItem : (key) =>{
                 localStorage.removeItem(key);
            },
            incresNum : () =>{
                lastnumber++;
                localStorage.setItem("num",lastnumber); 
            },
            returnLastNumber : () =>{
                return lastnumber;
            },
            clearLocalStroage : () =>{
                localStorage.clear();
            }
        }
    })();

  
  
  
  
  
    const FrontEnd =(() =>{
        const Dom= {
            noteID : 'Note_',
            noteContainer : 'ul',
            addbtn : '#addSticker',
            noteDelete : '.Del',
            reset : '#reset'

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
            },
            delNote : (key) =>{
                var div = document.getElementById(key);
                div.parentNode.removeChild(div);
            }
           
        }
    })();
 

  
  
  
  
    const Controller = ((bckEnd,frnEnd) =>{
        const Dom = frnEnd.getDom() ;
        

        const setUpEventListner = () => {
          
            const Notes = document.querySelectorAll('li');
            Notes.forEach(element => {
                element.addEventListener('click',function(e){  modifyNote(e,"edit");   });
                element.addEventListener('mouseleave',function(e){  modifyNote(e,"set");    });
            });
            
            document.querySelector(Dom.addbtn).addEventListener('click' , addNote )
            document.querySelector(Dom.reset).addEventListener('click' , resetAll )
          
        };

        const modifyNote =(e,mode) =>{
            let content , targetId;
            mode = e.path[0].className === "Del" ? "delete" : mode ;
            if(mode === "delete"){
                deleteNote(e);
            }
            else {
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
        }

        const addNote = () => {
            frnEnd.BuildNote("Note_"+(BackEnd.returnLastNumber()),"click for edit");
            setUpEventListner();
            BackEnd.incresNum();
        }

        const deleteNote = (e) => {
            let id ;
            id = e.path[2].id;
            console.log(id);
            BackEnd.delItem(id);
            frnEnd.delNote(id);
        }

        const loadHistyory = () =>{
            let perviousNote ;
            let note = [];
            perviousNote =  bckEnd.returnAllNote();
            frnEnd.buildHistory(perviousNote);
        }
        const resetAll = () =>{
            if(confirm("Are You Confirm Delete All Notes ??")){
                BackEnd.clearLocalStroage();
                location.reload();
            }
        }

        const init = (() =>{
            loadHistyory();    
            setUpEventListner();
        
        
        });

        init();
    })(BackEnd,FrontEnd);
})();
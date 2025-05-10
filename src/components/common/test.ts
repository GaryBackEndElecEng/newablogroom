

class DoSomething{
   
    constructor(public mainCont:HTMLElement){}
        

         wantToSaveBeforeFunc({funcSave,functCancel}:{
            funcSave:()=>Promise<void>|void,
            functCancel:()=>Promise<void>|void
        }){
            //DO SOMETHING
            funcSave();//execute function
            // DO SOMETHING ELSE
            functCancel();//execute function
        };

        saveWork({parent}:{parent:HTMLElement}){
            //do something

            return Promise.resolve(parent) as Promise<HTMLElement>
        };
        cancelWork({parent}:{parent:HTMLElement}){
            //do something

            return Promise.resolve(parent) as Promise<HTMLElement>
        };
};

const mainCont=document.createElement("div");

//CLEAN AND VERSATILE
const test=new DoSomething(mainCont)
test.wantToSaveBeforeFunc({
    funcSave:async()=>{
        await this.saveWork({parent}).then(()=>{
            //do something on save
        })
    },
    functCancel:async()=>{
        await this.cancelWork({parent}).then(()=>{
            //do something on cancel
        })
    }
    });
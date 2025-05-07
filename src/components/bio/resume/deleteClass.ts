import Service from "@/components/common/services";
import Resume from "./resume";
import { FaCreate } from "@/components/common/ReactIcons";
import { FaCrosshairs } from "react-icons/fa";
import { mainIntroLetterType, mainResumeRefType, mainResumeType, nameLetterType, nameRefType, nameResumeType, userType } from "./refTypes";
import styles from "./deleteClass.module.css";
import { langConversion } from "./engFre";

class DeleteClass{
    public rowId:string;
    private _mainResume:mainResumeType;
    private _nameResumes:nameResumeType[];
    private _mainResumes:mainResumeType[]
    private _nameLets:nameLetterType[];
    private _mainLets:mainIntroLetterType[];
    private _nameRefs:nameRefType[];
    private _mainRefs:mainResumeRefType[];
    private _mainRef:mainResumeRefType;
    constructor(private _service:Service,private _user:userType|null){
        this.rowId="";
        this._mainRef={} as mainResumeRefType;
        this._nameRefs=[] as nameRefType[];
        this._nameLets=[] as nameLetterType[];
        this._mainRefs=[] as mainResumeRefType[];
        this._mainLets=[] as mainIntroLetterType[];
        this._mainResumes=[] as mainResumeType[];
        this._nameResumes=[] as nameResumeType[];
        this._mainResume={} as mainResumeType;
        if(this._user?.resumes && this._user?.resumes?.length >0){
            this._mainResumes=this._user.resumes as mainResumeType[];
            this._nameResumes=this._mainResumes.map(kv=>({id:kv.id as number,user_id:kv.user_id,name:kv.name,enable:kv.enable,french:kv.french}));
            this._mainRefs=this._user.references as mainResumeRefType[];
            this._nameRefs=this._mainRefs.map(kv=>({id:kv.id as number,user_id:kv.user_id,res_name_id:kv.res_name_id,name:kv.name,french:kv.french}));
            this._mainLets=this._user?.letters as mainIntroLetterType[];
            this._nameLets=this._mainLets.map(kv=>({id:kv.id as number,user_id:kv.user_id,res_name_id:kv.res_name_id,name:kv.name}));
            
        };
    };

    ///////////--GETTER/SETTERS-----------------------------//
    get user(){
        return this._user;
    };
    set user(user:userType|null){
        this._user=user;
    }
    get mainResume(){
        return this._mainResume;
    };
    set mainResume(mainResume:mainResumeType){
        this._mainResume=mainResume
    };
    get mainRefs(){
        return this._mainRefs;
    };
    set mainRefs(mainRefs:mainResumeRefType[]){
        this._mainRefs=mainRefs
    };
    get mainLets(){
        return this._mainLets;
    };
    set mainLets(mainLets:mainIntroLetterType[]){
        this._mainLets=mainLets
    };
    get nameRefs(){
        return this._nameRefs;
    };
    set nameRefs(nameRefs:nameRefType[]){
        this._nameRefs=nameRefs
    };
    get nameLets(){
        return this._nameLets;
    };
    set nameLets(nameLets:nameLetterType[]){
        this._nameLets=nameLets
    };
    get mainResumes(){
        return this._mainResumes;
    };
    set mainResumes(mainResumes:mainResumeType[]){
        this._mainResumes=mainResumes
    }
    get nameResumes(){
        return this._nameResumes;
    };
    set nameResumes(nameResumes:nameResumeType[]){
        this._nameResumes=nameResumes
    }
    ///////////--GETTER/SETTERS-----------------------------//



    deleteResume({parent,target,mainResume,french,func}:{
        target:HTMLElement;
        parent:HTMLElement,
        mainResume:mainResumeType,
        french:boolean,
        func:({mainResumes,nameResumes}:{mainResumes:mainResumeType[],nameResumes:nameResumeType[]})=>Promise<void>|void

    }){
        const xDiv=document.createElement("div");
        parent.style.position="relative";
        xDiv.id="delete-resume";
        xDiv.className=styles.deleteResume;
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"12px",color:"white",borderradius:"50%"}});
        if(this.user){

            target.appendChild(xDiv);
            xDiv.onclick=(e:MouseEvent)=>{
                if(!e) return;
                this.deleteRequest({target,parent,mainResume,french,func})
            };
        };
    };


    deleteRequest({target,parent,mainResume,french,func}:{
        target:HTMLElement,
        parent:HTMLElement,
        french:boolean,
        mainResume:mainResumeType,
        func:({mainResumes,nameResumes}:{mainResumes:mainResumeType[],nameResumes:nameResumeType[]})=>Promise<void>|void}){
        const container=document.createElement("div");
        container.id="delete-resume-request";
        container.className=styles.deleteRequest;
        const para=document.createElement("p");
        para.id="para";
        const text_=langConversion({key:"deleteRequest"})
        para.textContent=french && text_ ? text_ : "are you sure you want to delete this resume?";
        container.appendChild(para);
        container.appendChild(para);
        target.appendChild(container);
        const btnDiv=document.createElement("div");
        btnDiv.id="btnDiv";
        btnDiv.className=styles.deleteRequestBtnDiv;
        const {button:cancel}=Resume.simpleButton({anchor:btnDiv,bg:"blue",color:"white",text:"cancel",time:400,type:"button"});
        const {button:delete_}=Resume.simpleButton({anchor:btnDiv,bg:"red",color:"white",text:"delete",time:400,type:"button"});
        container.appendChild(btnDiv);
        cancel.onclick=(e:MouseEvent)=>{
            if(!e) return;
            target.removeChild(container);
        };
        delete_.onclick=(e:MouseEvent)=>{
            if(e && this._user){
                const {id,name,user_id,enable,french}=mainResume;
                const item={id:id as number,name,user_id,enable,french}
                this._service.deleteResume({item}).then(async(res)=>{
                    if(res){
                        this.mainResumes=this.mainResumes.filter(kv=>(kv.name!==res.name));
                        this.nameResumes=this.nameResumes.filter(kv=>(kv.name !==res.name));
                        ([...parent.children] as HTMLElement[]).forEach(child=>{
                            if(child.id !==this.rowId){
                                parent.removeChild(child);
                            }
                        });
                        const lang2=langConversion({key:"deleted"})
                        const text_2=french && lang2 ? lang2 :"deleted"
                        Resume.message({parent,msg:text_2,type:"success",time:700});

                        func({mainResumes:this.mainResumes,nameResumes:this.nameResumes});
                    };
                });

            };
        };
    };


    deleteReF({parent,target,mainRef,french,func}:{
        target:HTMLElement;
        parent:HTMLElement,
        mainRef:mainResumeRefType,
        french:boolean,
        func:({mainRefs,nameRefs}:{mainRefs:mainResumeRefType[],nameRefs:nameRefType[]})=>Promise<void>|void

    }){
        const xDiv=document.createElement("div");
        parent.style.position="relative";
        xDiv.id="delete-resume";
        xDiv.className=styles.deleteRef;
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"12px",color:"white",borderradius:"50%"}});
        if(this.user){

            target.appendChild(xDiv);
            xDiv.onclick=(e:MouseEvent)=>{
                if(!e) return;
                this.deleteRefRequest({target,parent,mainRef,french,func})
            };
        };
    };



    deleteRefRequest({target,parent,mainRef,french,func}:{
        target:HTMLElement,
        parent:HTMLElement,
        mainRef:mainResumeRefType,
        french:boolean,
        func:({mainRefs,nameRefs}:{mainRefs:mainResumeRefType[],nameRefs:nameRefType[]})=>Promise<void>|void}){
        const container=document.createElement("div");
        container.id="delete-resume-request";
        container.className=styles.deleteRefRequest;
        const para=document.createElement("p");
        para.id="para";
        const text_=langConversion({key:"deleteRefRequest"});
        para.textContent=french && text_ ? text_ : "are you sure you want to delete this resume?";
        container.appendChild(para);
        container.appendChild(para);
        target.appendChild(container);
        const btnDiv=document.createElement("div");
        btnDiv.id="btnDiv";
        btnDiv.className=styles.deleteRequestBtnDiv;
        const {button:cancel}=Resume.simpleButton({anchor:btnDiv,bg:"blue",color:"white",text:"cancel",time:400,type:"button"});
        const {button:delete_}=Resume.simpleButton({anchor:btnDiv,bg:"red",color:"white",text:"delete",time:400,type:"button"});
        container.appendChild(btnDiv);
        cancel.onclick=(e:MouseEvent)=>{
            if(!e) return;
            target.removeChild(container);
        };
        delete_.onclick=(e:MouseEvent)=>{
            if(e && this._user){
                const {id,name,user_id,res_name_id,french}=mainRef;
                const item={id:id as number,name,user_id,res_name_id,french}
                this._service.deleteReference({item}).then(async(res)=>{
                    if(res){
                        this.mainRefs=this.mainRefs.filter(kv=>(kv.name!==res.name));
                        this.nameRefs=this.nameRefs.filter(kv=>(kv.name !==res.name));
                        ([...parent.children] as HTMLElement[]).forEach(child=>{
                            if(child.id !==this.rowId){
                                parent.removeChild(child);
                            }
                        });
                        const lang=langConversion({key:"deleted"});
                        Resume.message({parent,msg:french? lang:" deleted",type:"success",time:700});

                        func({mainRefs:this.mainRefs,nameRefs:this.nameRefs});
                    };
                });

            };
        };
    };


    deleteLet({parent,target,french,mainLet,func}:{
        target:HTMLElement;
        parent:HTMLElement,
        mainLet:mainIntroLetterType,
        french:boolean,
        func:({mainLets,nameLets}:{mainLets:mainIntroLetterType[],nameLets:nameLetterType[]})=>Promise<void>|void

    }){
        const xDiv=document.createElement("div");
        parent.style.position="relative";
        xDiv.id="delete-resume";
        xDiv.className=styles.deleteRef;
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"12px",color:"white",borderradius:"50%"}});
        if(this.user){

            target.appendChild(xDiv);
            xDiv.onclick=(e:MouseEvent)=>{
                if(!e) return;
                this.deleteLetRequest({target,parent,mainLet,french,func})
            };
        };
    };



    deleteLetRequest({target,parent,mainLet,french,func}:{
        target:HTMLElement,
        parent:HTMLElement,
        french:boolean,
        mainLet:mainIntroLetterType,
        func:({mainLets,nameLets}:{mainLets:mainIntroLetterType[],nameLets:nameLetterType[]})=>Promise<void>|void}){
        const container=document.createElement("div");
        container.id="delete-resume-request";
        container.className=styles.deleteRefRequest;
        const para=document.createElement("p");
        para.id="para";
        const text_=langConversion({key:"deleteLetRequest"});
        para.textContent=french && text_ ? text_ : ` are you sure you want to delete this letter:${mainLet.name}?`;
        container.appendChild(para);
        container.appendChild(para);
        target.appendChild(container);
        const btnDiv=document.createElement("div");
        btnDiv.id="btnDiv";
        btnDiv.className=styles.deleteRequestBtnDiv;
        const {button:cancel}=Resume.simpleButton({anchor:btnDiv,bg:"blue",color:"white",text:"cancel",time:400,type:"button"});
        const {button:delete_}=Resume.simpleButton({anchor:btnDiv,bg:"red",color:"white",text:"delete",time:400,type:"button"});
        container.appendChild(btnDiv);
        cancel.onclick=(e:MouseEvent)=>{
            if(!e) return;
            target.removeChild(container);
        };
        delete_.onclick=(e:MouseEvent)=>{
            if(e && this._user){
                const {id,}=mainLet;
                this._service.deleteLetter({id}).then(async(res)=>{
                    if(res){
                        
                        this.mainLets=this.mainLets.filter(kv=>(kv.name!==res.name));
                        this.nameLets=this.nameLets.filter(kv=>(kv.name !==res.name));
                        
                        ([...parent.children] as HTMLElement[]).forEach(child=>{
                            if(child.id !==this.rowId){
                                parent.removeChild(child);
                            }
                        });
                        
                        Resume.message({parent,msg:" deleted",type:"success",time:700});

                        func({mainLets:this.mainLets,nameLets:this.nameLets});
                    };
                });

            };
        };
    };


};
export default DeleteClass;
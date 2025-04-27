import Service from "@/components/common/services";
import {  combinedType, nameLetterType, nameRefType, nameResumeType, userType } from "./refTypes";
import styles from "./mod.module.css";
import Resume from "./resume";
import { getErrorMessage } from "@/components/common/errorBoundary";
import { FaCreate } from "@/components/common/ReactIcons";
import { FaCrosshairs } from "react-icons/fa";
import Topbar from "./topbar";

class ModuleConnect {
    public rowId:string;
    public containerId:string;
    private _nameResumes:nameResumeType[];
    private _nameRefs:nameRefType[];
    private _nameLetters:nameLetterType[];
    private _combined:combinedType;
  

    constructor(private _service:Service, private _user:userType|null){
        this.rowId="";
        this.containerId="";
        this._combined={} as combinedType;
        const nameResumes=this._user ? this._user.resumes.map(kv=>({id:kv.id as number,enable:kv.enable,user_id:kv.user_id,name:kv.name})):[] as nameResumeType[]
        this._nameResumes=nameResumes;
        const nameRefs_= this._user ? this._user.references.map(kv=>({id:kv.id as number,user_id:kv.user_id,name:kv.name,res_name_id:kv.res_name_id})):[] as nameRefType[];
        this._nameRefs=nameRefs_;
        const nameLetters=this._user ? this._user.letters.map(kv=>({id:kv.id as number,user_id:kv.user_id,name:kv.name,res_name_id:kv.res_name_id})):[] as nameLetterType[]
        this._nameLetters=nameLetters;
      
    };

    //--------------------------------GETTER/SETTERS------------------------------//
  

    get nameResumes(){
        return this._nameResumes
    };
    //GETS DATA FROM TOPBAR (CASCADE)
    set nameResumes(nameResumes:nameResumeType[]){
        this._nameResumes=nameResumes
        this._combined={...this._combined,nameResumes};
    };
    get nameRefs(){
        return this._nameRefs
    };
    //GETS DATA FROM TOPBAR (CASCADE)
    set nameRefs(nameRefs:nameRefType[]){
        this._nameRefs=nameRefs
        this._combined={...this._combined,nameRefs:nameRefs};
    };
    get nameLetters(){
        return this._nameLetters;
    };
    //GETS DATA FROM TOPBAR (CASCADE)
    set nameLetters(nameLetters:nameLetterType[]){
        this._nameLetters=nameLetters;
        this._combined={...this._combined,nameLetters};
    };
    get combined(){
        return this._combined;
    };
    set combined(combined:combinedType){
        this._combined=combined;
    }
    get user(){
        return this._user;
    };
    set user(user:userType|null){
        this._user=user;
    }
    
    //--------------------------------GETTER/SETTERS------------------------------//

    main({parent,nameResumes,nameReferences,nameLetters}:
        {parent:HTMLElement,
        nameResumes:nameResumeType[],
        nameReferences:nameRefType[],
        nameLetters:nameLetterType[]

    }){
       const {combined,hasCombined}= this.pickUpData({nameResumes,nameReferences,nameLetters});
        const mainMod=document.createElement("section");
        mainMod.id="main-module-cont";
        mainMod.className=styles.mainMod;
        parent.appendChild(mainMod);
        this.removeView({parent,target:mainMod});
        if(!hasCombined ){
            const user_id=this._user?.id || null
            if(user_id){

                this._service.getcombined({user_id:user_id}).then(async(res)=>{
                    if(res){
                        const {nameResumes,nameRefs,nameLetters}=res;
                        this.nameLetters=nameLetters ? nameLetters as nameLetterType[] : [] as nameLetterType[];
                        this.nameRefs=nameRefs ? nameRefs as nameRefType[] : [] as nameRefType[];
                        this.nameResumes=nameResumes;
                        this.combined=res;
                        this.showCombined({parent:mainMod,combined:res})
                    }
                }).catch(error=>{
                    const msg=getErrorMessage(error);
                     Resume.message({parent,msg,type:"error",time:2500});
                });

            }else{
                const msg="sorry, you have no saved content, within your repetoir. Once you have built a resume with a reference and or letter, the data will be displayed for file attchment."
                Topbar.noLetsResRefsMsg({parent:mainMod,isRes:false,isRef:false,isLet:false,isEdit:false,msg})
                //INDICATE NO DATA MESSAGE!!! HERE
            }
        }else{
            
            this.showCombined({parent:mainMod,combined:combined})
        }
    };

    showCombined({parent,combined}:{parent:HTMLElement,combined:combinedType,}){
        const combinedCont=document.createElement("div");
        combinedCont.id="combined-cont";
        combinedCont.className=styles.combinedCont;
        parent.appendChild(combinedCont);
        const rowCont=document.createElement("div");
        rowCont.id="combined-row-cont";
        rowCont.className=styles.rowCont;
        combinedCont.appendChild(rowCont);
        const {nameResumes,nameRefs,nameLetters}=combined;
        this.nameRefs=nameRefs ? nameRefs as nameRefType[] : [] as nameRefType[];
        this.nameResumes=nameResumes;
        this.nameLetters=nameLetters ? nameLetters as nameLetterType[] : [] as nameLetterType[];
        const len =this.nameResumes.length + this.nameRefs.length +this.nameLetters.length;
        if(len===0){
            const msg="sorry, you have no saved content, within your repetoir. Once you have built a resume with a reference and or letter, the data will be displayed for file attchment."
                Topbar.noLetsResRefsMsg({parent:combinedCont,isRes:false,isRef:false,isLet:false,isEdit:false,msg})
        }
        this.nameresumes({parent:rowCont,order:0,nameResumes});
       this.nameRefs= this.NameRefs({parent:rowCont,order:1,nameRefs,nameresumes:nameResumes});
       this.nameLetters= this.nameLets({parent:rowCont,order:2,nameLetters,nameresumes:nameResumes});
       const {button}=Resume.simpleButton({anchor:combinedCont,type:"button",bg:"#2d3236",color:"#ccedd6",text:"submit",time:400});
       button.style.alignSelf="center";
       button.style.marginBlock="2rem";
       button.onclick=(e:MouseEvent)=>{
        if(!e) return;
        const combined={nameRefs:this.nameRefs,nameResumes:this.nameResumes,nameLetters:this.nameLetters}
        
        this._service.saveCombined({combined}).then (async(res)=>{
            if(res){
               
                const {nameRefs,nameLetters}=res;
                this.nameLetters=nameLetters ? nameLetters as nameLetterType[] : [] as nameLetterType[];
                this.nameRefs=nameRefs ? nameRefs as nameRefType[] : [] as nameRefType[];
                Resume.message({parent,msg:"saved",type:"success",time:800});
            }
        }).catch(error=>{const msg=getErrorMessage(error);Resume.message({parent,msg,type:"success",time:2200});});
       };
    };

    nameresumes({parent,order,nameResumes}:{parent:HTMLElement,order:number,nameResumes:nameResumeType[]}){
        const colCont=document.createElement("div");
        colCont.id="row-col-resumes-cont";
        colCont.className=styles.colCont;
        colCont.style.order=String(order);
        const name=document.createElement("name");
        name.className="text-center text-primary lean my-1 mb-2 justify-self-start";
        name.style.cssText="font-size:135%;text-transform:uppercase;";
        name.textContent="resumes";
        colCont.appendChild(name);
        const ol=document.createElement("ol");
        ol.style.cssText="width:100%;";
        nameResumes.map((resname,index)=>{
            if(resname){
                const {name,enable}=resname;
                const text=enable ? "enabled":"disabled";
                const li=document.createElement("li");
                li.className=styles.resname;
                li.setAttribute("data-resname",text);
                li.style.position="relative";
                li.style.order=String(index);
                const text1=new Text(name);
                li.appendChild(text1);
                ol.appendChild(li);
            }
        });
        colCont.appendChild(ol);
        parent.appendChild(colCont);
    };


    NameRefs({parent,order,nameRefs,nameresumes}:{parent:HTMLElement,order:number,nameRefs:nameRefType[]|null,nameresumes:nameResumeType[]}):nameRefType[]{
        const colCont=document.createElement("div");
        colCont.id="row-col-refs-cont";
        colCont.className=styles.colCont;
        colCont.style.order=String(order);
        const name=document.createElement("name");
        name.className="text-center text-primary lean my-1 mb-2";
        name.style.cssText="font-size:135%;text-transform:uppercase;";
        name.textContent="references";
        colCont.appendChild(name);
        const ol=document.createElement("ol");
        ol.style.cssText="width:100%;";
        if(nameRefs){
            nameRefs= nameRefs.map((refname,index)=>{
                 if(refname){
                     const li=document.createElement("li");
                     li.style.order=String(index);
                     li.style.display="flex";
                     li.style.gap="1rem";
                     li.style.marginBlock="1rem";
                     nameresumes.map(nameresume=>{
                         if(nameresume.name===refname.res_name_id){
                             this.attachDetachAction({target:li,nameresume,nameLetRef:refname});
                         };
                     });
                     const text=new Text(refname.name);
                     li.appendChild(text);
                     this.selection({
                         target:li,
                         nameresumes,
                         func:(nameresume)=>{
                             //---ATTACHES/DETATCHES REF/LETTER TO RESUME-------/////
                             this.attachDetachAction({target:li,nameresume,nameLetRef:refname});
                         }
                     });
                     ol.appendChild(li);
                 }
                 return refname;
             });
             colCont.appendChild(ol);
             parent.appendChild(colCont);
             return nameRefs;

        };
        return [] as nameRefType[]
    };


    nameLets({parent,order,nameLetters,nameresumes}:{parent:HTMLElement,order:number,nameLetters:nameLetterType[]|null,nameresumes:nameResumeType[]}):nameLetterType[]{
        const colCont=document.createElement("div");
        colCont.id="row-col-refs-cont";
        colCont.className=styles.colCont;
        colCont.style.order=String(order);
        const name=document.createElement("name");
        name.className="text-center text-primary lean my-1 mb-2";
        name.style.cssText="font-size:135%;text-transform:uppercase;";
        name.textContent="letters";
        colCont.appendChild(name);
        const ol=document.createElement("ol");
        ol.style.cssText="width:100%;";
        if(!nameLetters) return [] as nameLetterType[]
       nameLetters= nameLetters.map((refname,index)=>{
            if(refname){
                const li=document.createElement("li");
                li.style.order=String(index);
                li.style.display="flex";
                li.style.gap="1rem";
                li.style.marginBlock="1rem";
                const text=new Text(refname.name);
                nameresumes.map(nameresume=>{
                    if(nameresume.name===refname.res_name_id){
                        this.attachDetachAction({target:li,nameresume,nameLetRef:refname});
                    };
                });
                li.appendChild(text);
                this.selection({
                    target:li,
                    nameresumes,
                    func:(nameresume)=>{
                         //---ATTACHES/DETATCHES REF/LETTER TO RESUME-------/////
                        this.attachDetachAction({target:li,nameresume,nameLetRef:refname});
                    }
                });
                ol.appendChild(li);
            }
            return refname;
        });
        colCont.appendChild(ol);
        parent.appendChild(colCont);
        return nameLetters;
    };

    selection({target,nameresumes,func}:{target:HTMLElement,nameresumes:nameResumeType[],func:(nameResume:nameResumeType)=>nameResumeType|void}){
        const cont=document.createElement("div");
        cont.id="selection-cont";
        cont.className=styles.selectionCont;
        target.appendChild(cont);
        const select=document.createElement("select");
        select.id="select";
        select.className=styles.select;
        cont.appendChild(select);
        const len=nameresumes?.length ||1;
        const _cat=[{id:0,name:"select",enable:false,user_id:this.user?.id as string},{id:len+1,name:"detach",enable:false,user_id:this.user?.id as string}];
        const _nameresumes=nameresumes.concat(_cat);
        _nameresumes.toSorted((a,b)=>{if(a.id <b.id) return -1;return 1}).map((resname,index)=>{
            const option=document.createElement("option");
            option.id=`order-${index}`;
            option.value=JSON.stringify(resname);
            option.textContent=resname.name;
            select.appendChild(option);
        });
        select.onchange=(e:Event)=>{
            if(!e) return;
            const valueStr=(e.currentTarget as HTMLSelectElement).value;
            const nameResume=JSON.parse(valueStr as string) as nameResumeType;
            func(nameResume)
        };
    };

    attachDetachAction({target,nameresume,nameLetRef}:{target:HTMLElement,nameresume:nameResumeType,nameLetRef:nameLetterType}){
        const {name:_name}=nameresume;
        target.style.position="relative";
        const attachDetatchCont=document.createElement("div");
        attachDetatchCont.id="attach-detach-cont";
        target.appendChild(attachDetatchCont);
        attachDetatchCont.className=styles.attachDetachCont;               
        if(_name !=="detach"){
            nameLetRef.res_name_id=nameresume.name;
            const span=document.createElement("span");
            span.id="span";
            span.textContent=nameLetRef.res_name_id;
            attachDetatchCont.appendChild(span);
        }else{
            const getSpan=target.querySelector("div#attach-detach-cont") as HTMLSpanElement;
            target.removeChild(getSpan)
            nameLetRef.res_name_id=null;
        }
    };

    removeView({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        const xDiv=document.createElement("div");
        xDiv.id="removeView-delete-popup";
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(5px,5px);padding:2px;bacckground-color:black;color:white;border-radius:50%;display:flex;";
        xDiv.style.backgroundColor="black";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"22px",borderRadius:"50%",color:"white",backgroundColor:"black"}});
        target.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(!e) return;
            parent.removeChild(target);
        };
    };

    showEffect({target,time}:{target:HTMLElement,time:number}){
        target.animate([
            {transform:"scale(0.5)",opacity:"0"},
            {transform:"scale(1)",opacity:"1"},
        ],{duration:time,iterations:1,"easing":"ease-in"});
    };

    pickUpData({nameResumes,nameReferences,nameLetters}:{nameResumes:nameResumeType[],nameReferences:nameRefType[],nameLetters:nameLetterType[]}):{combined:combinedType,hasCombined:boolean}{
        let hasCombined=false;
        const hasLetters=!!(nameLetters?.length && nameLetters.length>0);
    const hasRefs=!!(nameReferences?.length && nameReferences.length >0 );
    const hasResumes=!!(nameResumes?.length && nameResumes.length>0);
    if(hasLetters){
        this._nameLetters=nameLetters;
        this._combined={...this._combined,nameLetters:this._nameLetters};
        hasCombined=true;
    };if(hasResumes){
        this._nameResumes=nameResumes;
        this._combined={...this._combined,nameResumes:this._nameResumes};
    };if(hasRefs){
        this._nameRefs=nameReferences;
        this._combined={...this._combined,nameRefs:this._nameRefs};
        hasCombined=true;
    };
    return {combined:this._combined,hasCombined}

    };
    clearAccess({parent,nameResume,combined }:{parent:HTMLElement,combined:combinedType,nameResume:nameResumeType}){
        const {nameResumes,nameRefs,nameLetters}=combined;
            const clearAccessCont=document.createElement("div");
            clearAccessCont.id="clear-access-cont";
            clearAccessCont.className=styles.clearAccessCont;
            parent.appendChild(clearAccessCont);
            //show before then after once its cleared
            const row=document.createElement("div");
            row.id="clearAccess-row";
            
            clearAccessCont.appendChild(row);
            (Array.from(Array(3).keys())).map((rowNum,index)=>{
                if(rowNum===0){
                    const {name,enable}=nameResume;
                    const resumeCol=document.createElement("div");
                    resumeCol.id=`clear-access-row-col-${index}`;
                    resumeCol.className=styles.resumeCol;
                    resumeCol.style.borderRight="1px solid blue";
                    resumeCol.style.order=String(index);
                    const span=document.createElement("span");
                    span.style.cssText="color:blue;padding-inline:0.75rem;";
                    span.textContent=enable ? "enabled":"disabled";
                    const label=document.createElement("h6");
                    label.className="text-center text-primary display-6 lean";
                    label.textContent="resume";
                    label.style.textTransform="uppercase";
                    label.appendChild(span);
                    resumeCol.appendChild(label);
                    let text:string="";
                    if(enable) text="click to clear";
                    if(!enable) text="click to enable";
                    const {button}=Topbar.customButton({anchor:resumeCol,bg:"black",color:"white",text:name,type:"button",alt:text,time:400,isLeft:true});
                    button.onclick=async(e:MouseEvent)=>{
                        if(!e) return;
                        //set enable to !enable
                        nameResume.enable=!enable;
                        
                            //disabel res_name_id
                           const retNameRefs=nameRefs?.map(nameRef=>{
                            const {res_name_id}=nameRef;
                            if(res_name_id===name){
                                nameRef.res_name_id=null;
                            }
                            return nameRef
                           })|| [] as nameRefType[];
                           const retNameLets=nameLetters?.map(nameRef=>{
                            const {res_name_id}=nameRef;
                            if(res_name_id===name){
                                nameRef.res_name_id=null;
                            }
                            return nameRef
                           }) || [] as nameRefType[];
                      
                        combined={nameResumes,nameRefs:retNameRefs,nameLetters:retNameLets}
                        await this._service.saveCombined({combined}).then(async(res)=>{
                         if(res){
                             combined=res;
                             Resume.cleanUpById({parent,id:"clear-access-cont"});
                             this.clearAccess({parent,nameResume,combined});
                         }
                        });
                    };
                    row.appendChild(resumeCol);

                }else if(rowNum >1){

                    this.showRefsLets({parent:row,nameRefs,nameLets:nameLetters});
                };
            });
            
        return combined;
    };


    showRefsLets({parent,nameRefs,nameLets}:{parent:HTMLElement,nameRefs:nameRefType[]|null,nameLets:nameLetterType[]|null}){
        (Array.from(Array(2).keys())).map(num=>{
            const label=document.createElement("h6");
            label.className="text-center text-primary display-6 lean";
            if(num===0){
                label.textContent="references";
            }else{
                label.textContent="letters";
            }
            label.style.textTransform="uppercase";
            const resumeCol=document.createElement("div");
            resumeCol.id=`clear-access-row-col-${num}`;
            resumeCol.className=styles.resumeCol;
            resumeCol.style.order=String(num);
            resumeCol.appendChild(label);
            parent.appendChild(resumeCol);
            if(num===0){

                nameRefs=nameRefs?.map((nameRef,index)=>{
                    if(nameRef){
                        this.refTelCard({parent:resumeCol,nameRefTel:nameRef,index});
                    }
                    return nameRef;
                })||[] as nameRefType[];
            }else{
               nameLets= nameLets?.map((nameRef,index)=>{
                    if(nameRef){
                        this.refTelCard({parent:resumeCol,nameRefTel:nameRef,index});
                    }
                    return nameRef;
                }) || [] as nameLetterType[];
            };
        });
    };


    refTelCard({parent,nameRefTel,index}:{parent:HTMLElement,nameRefTel:nameRefType|nameLetterType,index:number}){
        const {res_name_id,name}=nameRefTel;
        const span=document.createElement("span");
        span.id=`div-${index}`;
        span.style.cssText="padding:0.75rem;display:flex;gap:1rem;align-items:center;";
        const rname=document.createElement("h6");
        rname.textContent=name;
        if(res_name_id){

            const small=document.createElement("small");
            small.style.cssText="color:blue;text-decoration:underline;line-height:1.55rem;"
            small.textContent=res_name_id ;
            span.appendChild(small);
        }
        span.appendChild(rname);
        parent.appendChild(span);
    };
    
};
export default ModuleConnect;
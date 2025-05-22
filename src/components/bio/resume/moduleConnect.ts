import Service from "@/components/common/services";
import {  combinedType, nameLetterType, nameRefType, nameResumeType, noDataMsgType, userType } from "./refTypes";
import styles from "./mod.module.css";
import Resume from "./resume";
import { getErrorMessage } from "@/components/common/errorBoundary";
import { FaCreate } from "@/components/common/ReactIcons";
import { FaCopy, FaCrosshairs } from "react-icons/fa";
import Topbar from "./topbar";
import { langConversion, langNoData } from "./engFre";

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
        const nameResumes=this._user ? this._user.resumes.map(kv=>({id:kv.id as number,enable:kv.enable,user_id:kv.user_id,name:kv.name,french:kv.french})):[] as nameResumeType[]
        this._nameResumes=nameResumes;
        const nameRefs_= this._user ? this._user.references.map(kv=>({id:kv.id as number,user_id:kv.user_id,name:kv.name,res_name_id:kv.res_name_id,french:kv.french})):[] as nameRefType[];
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

    main({parent,nameResumes,nameReferences,nameLetters,french}:
        {parent:HTMLElement,
        nameResumes:nameResumeType[],
        nameReferences:nameRefType[],
        nameLetters:nameLetterType[],
        french:boolean

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
                        this.showCombined({parent:mainMod,combined:res,french})
                    }
                }).catch(error=>{
                    const msg=getErrorMessage(error);
                     Resume.message({parent,msg,type:"error",time:2500});
                });

            }else{
                const msg=langNoData({french,cat:"combined"});
                const noData={cat:"comb",msg:langNoData({french:false,cat:"combined"}),msgFr:msg} as noDataMsgType;
                Topbar.noLetsResRefsMsg({parent:mainMod,isRes:false,isRef:false,isLet:false,isEdit:false,noDataMsg:noData,french});
                //INDICATE NO DATA MESSAGE!!! HERE
            }
        }else{
            
            this.showCombined({parent:mainMod,combined:combined,french})
        }
    };

    showCombined({parent,combined,french}:{parent:HTMLElement,combined:combinedType,french:boolean,}){
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
            const msg=langNoData({french,cat:"combined"});
                const noData={cat:"comb",msg:langNoData({french:false,cat:"combined"}),msgFr:msg} as noDataMsgType;
                Topbar.noLetsResRefsMsg({parent,isRes:false,isRef:false,isLet:false,isEdit:false,noDataMsg:noData,french});
        };
        this.linkLetters({grandParent:parent,parent:rowCont,order:0,nameResumes:this.nameResumes,nameLetters:this.nameLetters,french});
        this.linkNames({parent:rowCont,order:1,nameResumes,french});
        this.nameresumes({parent:rowCont,order:2,nameResumes,french});
       this.nameRefs= this.NameRefs({parent:rowCont,order:3,nameRefs,nameresumes:nameResumes,french});
       this.nameLetters= this.nameLets({
        parent:rowCont,
        order:3,
        nameLetters,
        nameresumes:nameResumes,
        french,
        callback:(nameresumes,nameletters)=>{
            //REDOES THE COMBINED
           this.linkLetters({grandParent:parent,parent:rowCont,order:0,nameResumes:nameresumes,nameLetters:nameletters,french});
           this.linkNames({parent:rowCont,order:1,nameResumes:nameresumes,french});
            this.nameresumes({parent:rowCont,order:2,nameResumes:nameresumes,french});
            this.nameRefs= this.NameRefs({parent:rowCont,order:3,nameRefs,nameresumes,french});
           this.nameLetters= this.nameLets({parent:rowCont,order:4,nameLetters,nameresumes,french,callback:(_nameresumes,_nameletters)=>{
            //REDOES THE COMBINED
            this.nameResumes=_nameresumes;
            this.nameLetters=_nameletters;
            this.linkLetters({grandParent:parent,parent:rowCont,order:0,nameResumes:nameresumes,nameLetters:nameletters,french});
           this.linkNames({parent:rowCont,order:1,nameResumes:nameresumes,french});
            this.nameresumes({parent:rowCont,order:2,nameResumes:nameresumes,french});
            this.nameRefs= this.NameRefs({parent:rowCont,order:3,nameRefs,nameresumes,french});
            
           }})
        }
       });
      
       const {button}=Resume.simpleButton({anchor:combinedCont,type:"button",bg:"#2d3236",color:"#ccedd6",text:"submit",time:400});
       button.disabled=true;
       button.id="combined-submit-btn";
       button.style.alignSelf="center";
       button.style.marginBlock="2rem";
       button.onclick=(e:MouseEvent)=>{
        if(!e) return;
        const combined={nameRefs:this.nameRefs,nameResumes:this.nameResumes,nameLetters:this.nameLetters}
        
        this._service.saveCombined({combined}).then (async(res)=>{
            if(res){
               button.classList.remove(styles.combinedSubmitBtn);
                const {nameRefs,nameLetters}=res;
                this.nameLetters=nameLetters ? nameLetters as nameLetterType[] : [] as nameLetterType[];
                this.nameRefs=nameRefs ? nameRefs as nameRefType[] : [] as nameRefType[];
                const msg=french ? langConversion({key:"saved"}): "saved";
                Resume.message({parent,msg,type:"success",time:800});
            }
        }).catch(error=>{const msg=getErrorMessage(error);Resume.message({parent,msg,type:"success",time:2200});});
       };
    };


    linkLetters({grandParent,parent,order,nameResumes,nameLetters,french}:{
        parent:HTMLElement,
        order:number,
        nameResumes:nameResumeType[],
        nameLetters:nameLetterType[],
        grandParent:HTMLElement,
        french:boolean

    }){
        Resume.cleanUpById({parent,id:"col-linkLetters"});
        const col=document.createElement("div");
        col.style.order=String(order);
        col.id="col-linkLetters";
        col.className=styles.colCont;
        const label=document.createElement("h6");
        label.textContent="let-links";
        label.className=styles.combineLabel;
        label.classList.add("lean");
        label.style.cssText="font-size:135%;text-transform:uppercase;";
        col.appendChild(label);
        parent.appendChild(col);
        nameLetters.toSorted((a,b)=>{if(a.id < b.id) return -1;return 1}).map((nameLet,index)=>{
            if(nameLet){
                const {res_name_id}=nameLet;
                const nameResume=nameResumes.find(kv=>(kv.name===res_name_id));
                const para=document.createElement("small");
                para.id="let-link-" + String(index);
                if(nameResume){
                    const {name}=nameResume;
                    const url=new URL(`/resumeletter/${name}`,location.origin);
                    para.textContent=nameLet.name;
                    this.copyLink({grandParent,parent:para,url:url.href,name,french});
                }else{
                    para.textContent="";
                }
                col.appendChild(para);
            }
        });
    };



    linkNames({parent,order,nameResumes,french}:{parent:HTMLElement,order:number,nameResumes:nameResumeType[],french:boolean}){
        Resume.cleanUpById({parent,id:"col-link-names"})
        const col=document.createElement("div");
        col.id="col-link-names";
        col.className=styles.colCont;
        const name=document.createElement("h6");
        name.className=styles.combineLabel;
        name.classList.add("lean");
        name.textContent="avail. links";
        col.appendChild(name);
        const linkULCont=document.createElement("ul");
        linkULCont.id="row-col-link-cont";
        linkULCont.className=styles.linkULContCol;
        linkULCont.style.order=String(order);
        col.appendChild(linkULCont);
        parent.appendChild(col);
        nameResumes.map((nameResume,index)=>{
            const {enable,name}=nameResume;
            const li=document.createElement("li");
            li.id="ul-li-" + String(index +1);
            const span=document.createElement("span");
            if( enable){
                const url=new URL(`/showresume/${name}`,location.origin);
                this.copyLink({grandParent:parent,parent:li,url:url.href,name,french});
                span.textContent=`/${name}`;

            }else{
                span.textContent=french ? langConversion({key:"no-link"}): "no-link";
            };
            li.appendChild(span);
            linkULCont.appendChild(li);
        });
    };



    copyLink({grandParent,parent,url,name,french}:{grandParent:HTMLElement,parent:HTMLElement,url:string,french:boolean,name:string}){
        parent.style.position="relative";
        const xDiv=document.createElement("div");
        xDiv.className=styles.copyLink;
        FaCreate({parent:xDiv,name:FaCopy,cssStyle:{color:"inherit",backgroundColor:"inherit",fontSize:"18px"}});
        parent.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(!e) return;
            navigator.clipboard.writeText(url);
            const msg=french ? `enregistrée ${name} a presse-papiers`:`saved: ${name} to clipboard`;
            Resume.message({parent:grandParent,msg,type:"success",time:1200});
        };
    };

    nameresumes({parent,order,nameResumes,french}:{parent:HTMLElement,order:number,nameResumes:nameResumeType[],french:boolean}){
        Resume.cleanUpById({parent,id:"row-col-resumes-cont"});
        const colCont=document.createElement("div");
        colCont.id="row-col-resumes-cont";
        colCont.className=styles.colCont;
        colCont.style.order=String(order);
        const name=document.createElement("h6");
        name.className="text-center text-primary lean my-1 mb-2 justify-self-start";
        name.style.cssText="font-size:135%;text-transform:uppercase;";
        name.textContent="resumes";
        colCont.appendChild(name);
        const ol=document.createElement("ol");
        ol.style.cssText="width:100%;";
        nameResumes.map((resname,index)=>{
            if(resname){
                const {name,enable}=resname;
                const isEnabled=french ? langConversion({key:"enabled"}):"enabled";
                const isDisabled=french ? langConversion({key:"disabled"}):"disabled";
                const text=enable ? isEnabled:isDisabled;
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


    NameRefs({parent,order,nameRefs,nameresumes,french}:{
        parent:HTMLElement,
        order:number,
        nameRefs:nameRefType[]|null
        ,nameresumes:nameResumeType[],
        french:boolean,
     
    }):nameRefType[]{
        Resume.cleanUpById({parent,id:"row-col-refs-cont"});
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
                             this.attachDetachAction({target:li,nameresume,nameLetRef:refname,french});
                         };
                     });
                     const text=new Text(refname.name);
                     li.appendChild(text);
                     this.selection({
                         target:li,
                         nameresumes,
                         french,
                         func:(nameresume)=>{
                             //---ATTACHES/DETATCHES REF/LETTER TO RESUME-------/////
                             this.attachDetachAction({target:li,nameresume,nameLetRef:refname,french});
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


    nameLets({parent,order,nameLetters,nameresumes,french,callback}:{
        parent:HTMLElement,
        order:number,
        nameLetters:nameLetterType[]|null,
        nameresumes:nameResumeType[],
        french:boolean,
        callback:(nameresumes:nameResumeType[],nameLetters:nameLetterType[])=>Promise<void>|void
    }):nameLetterType[]{
        Resume.cleanUpById({parent,id:"row-col-lets-cont"});
        const colCont=document.createElement("div");
        colCont.id="row-col-lets-cont";
        colCont.className=styles.colCont;
        colCont.style.order=String(order);
        const name=document.createElement("name");
        name.className="text-center text-primary lean my-1 mb-2";
        name.style.cssText="font-size:135%;text-transform:uppercase;";
        name.textContent="letters";
        colCont.appendChild(name);
        const ol=document.createElement("ol");
        ol.style.cssText="width:100%;";
        if(!nameLetters) return [] as nameLetterType[];
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
                        this.attachDetachAction({target:li,nameresume,nameLetRef:refname,french});
                    };
                });
                
                li.appendChild(text);
                this.selectionNameLet({
                    target:li,
                    nameresumes,
                    nameLetters,
                    nameLet:refname,
                    french,
                    func:(nameresume,nameletters)=>{
                         //---ATTACHES/DETATCHES REF/LETTER TO RESUME-------/////
                        this.attachDetachAction({target:li,nameresume,nameLetRef:refname,french});
                        nameresumes = nameresumes.map(nameRes=>{
                            if(nameRes.name===nameresume.name){
                                nameRes.enable=true;
                            }
                            return nameRes;
                        });
                        callback(nameresumes,nameletters);
                       
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

    selection({target,nameresumes,french,func}:{target:HTMLElement,nameresumes:nameResumeType[],french:boolean,func:(nameResume:nameResumeType)=>nameResumeType|void}){
        const cont=document.createElement("div");
        cont.id="selection-cont";
        cont.className=styles.selectionCont;
        target.appendChild(cont);
        const select=document.createElement("select");
        select.id="select";
        select.className=styles.select;
        cont.appendChild(select);
        const len=nameresumes?.length ||1;
        const _cat=[{id:0,name:"select",enable:false,user_id:this.user?.id as string,french:false},{id:len+1,name:"detach",enable:false,user_id:this.user?.id as string,french:false}];
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
            const getBtn=document.querySelector("button#combined-submit-btn") as HTMLButtonElement;
            if(!getBtn)return;
            const msg=french ? langConversion({key:"press submit to save"}) : "press submit to save";
            getBtn.setAttribute("data-submit-btn",msg)
            getBtn.classList.add(styles.combinedSubmitBtn);
            getBtn.disabled=false;
        };
    };

    selectionNameLet({target,nameresumes,nameLet,nameLetters,french,func}:{target:HTMLElement,nameresumes:nameResumeType[],nameLet:nameLetterType,nameLetters:nameLetterType[]|null,french:boolean,func:(nameResume:nameResumeType,nameLetters:nameLetterType[])=>nameResumeType|void}){
        const cont=document.createElement("div");
        cont.id="selection-cont";
        cont.className=styles.selectionCont;
        target.appendChild(cont);
        const select=document.createElement("select");
        select.id="select";
        select.className=styles.select;
        cont.appendChild(select);
        const len=nameresumes?.length ||1;
        const _cat=[{id:0,name:"select",enable:false,user_id:this.user?.id as string,french:false},{id:len+1,name:"detach",enable:false,user_id:this.user?.id as string,french:false}];
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
            if(nameLetters){
                nameLetters=this.nameLetters.map(_nameLet=>{
                    if(_nameLet.name===nameLet.name){
                        const {name}=nameResume;
                        if(name !=="detach"){
                            _nameLet.res_name_id=name;
                        }else{
                            _nameLet.res_name_id=null;
                        };
                       
                    }
                    return _nameLet
                });
                
                func(nameResume,nameLetters)
            }else{
                func(nameResume,[] as nameLetterType[]);
            }
            const getBtn=document.querySelector("button#combined-submit-btn") as HTMLButtonElement;
            if(!getBtn)return;
            const msg=french ? langConversion({key:"press submit to save"}) : "press submit to save";
            getBtn.setAttribute("data-submit-btn",msg)
            getBtn.classList.add(styles.combinedSubmitBtn);
            getBtn.disabled=false;
        };
    };

    attachDetachAction({target,nameresume,nameLetRef,french}:{target:HTMLElement,nameresume:nameResumeType,nameLetRef:nameLetterType,french:boolean}){
        
        const {name:_name}=nameresume;
        target.style.position="relative";
        const attachDetatchCont=document.createElement("div");
        attachDetatchCont.id="attach-detach-cont";
        target.appendChild(attachDetatchCont);
        attachDetatchCont.className=styles.attachDetachCont;               
        if(_name!=="detach"){
            nameLetRef.res_name_id=nameresume.name;
            const span=document.createElement("span");
            span.id="span";
            const attached=french ? langConversion({key:'attached'}):"attached";
            attachDetatchCont.setAttribute("data-attached",`${attached}:${_name}`);
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
        xDiv.className=styles.removeViewCont;
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
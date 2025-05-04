import Service from "@/components/common/services";
import { awardType, contactRefType, linkType, mainResumeRefType, nameRefType, resumeRefType, userType, } from "./refTypes";
import styles from "./editRef.module.css"
import Resume from "./resume";
import { FaCreate } from "@/components/common/ReactIcons";
import { FaCrosshairs } from "react-icons/fa";
import EditResume from "./editResume";
import { getErrorMessage } from "@/components/common/errorBoundary";
import FormComponents from "./formComponents";
import ViewReference from "./viewReference";


class EditReference{
    public rowId:string;
    public containerId:string;
     private _mainRef:mainResumeRefType;
    private _nameRefs:nameRefType[];
    private _mainRefs:mainResumeRefType[];
    private _achievement:awardType;
    public contacts:contactRefType[];
    public contact:contactRefType;
    public links:linkType[];
    

    constructor(private _service:Service,private formComp:FormComponents,private _user:userType|null,private viewRef:ViewReference){
        
        this.rowId="";
        this.containerId="";
        this.links=[{name:"ablogroom",link:"https://www.ablogroom.com"},{name:"masterultils",link:"https://masterultils.com"},{name:"masterconnect",link:"https://www.masterconnect.com"},]
        this.contact={
            id:0,
            name:"",
            cell:"",
            address:"",
            city:"",
            email:""
        };
        this.contacts=[this.contact];
      
        this._achievement={
            id:1,
            achievement:"Instead of highlighting your duties and responsibilities, try to outline your achievements and awards",
            reason:" Provide a stand-out answer to the question “reasons to why you should get hired? through reason” by proving how well you handled the things in your past",
            composite:" What you used to attain the above achievement."
        };
       
        this._mainRef={} as mainResumeRefType;
        this._mainRefs=this._user?.references as mainResumeRefType[] || [] as mainResumeRefType[];
        this._nameRefs=this._user?.references.map(kv=>({id:kv.id as number,name:kv.name,user_id:kv.user_id,res_name_id:kv.res_name_id,french:kv.french})) as nameRefType[] || [] as nameRefType[]
    }

    ///----------------------SEETERGS/GETTERS-------------------------------///
    get user(){
        return this._user;
    };
    set user(user:userType|null){
        this._user=user;
    };
    get mainRef(){
        return this._mainRef;
    };
    set mainRef(mainRef:mainResumeRefType){
        this._mainRef=mainRef
    };
    get mainRefs(){
        return this._mainRefs;
    };
    set mainRefs(mainRefs:mainResumeRefType[]){
        this._mainRefs=mainRefs
    };
    get nameRefs(){
        return this._nameRefs;
    };
    set nameRefs(nameRefs:nameRefType[]){
        this._nameRefs=nameRefs
    };
    ///----------------------SEETERGS/GETTERS-------------------------------///

    selectReference({grandParent,parent,css_col,css_row,less900,less400,resumeRef,func}:{
        grandParent:HTMLElement,
        parent:HTMLElement,
        css_col:string,
        css_row:string,
        less400:boolean,
        less900:boolean,
        resumeRef:nameRefType,
        func:(nameRefs:nameRefType[])=>Promise<void>|void

    }){
        const {name}=resumeRef;
            const {button}=Resume.simpleButton({anchor:parent,text:name,type:"button",bg:"black",color:"white",time:400});
            this.deleteRef({
                grandParent,
                parent,
                item:resumeRef,
                css_col,
                css_row,
                func
            });
            button.onclick=(e:MouseEvent)=>{
                if(!e) return;
                ([...grandParent.children] as HTMLElement[]).forEach(child=>{
                    if(child && child.id !==parent.id){
                        grandParent.removeChild(child)
                    }
                });
                this.editResumeRef({parent:grandParent,item:resumeRef,css_col,less900,less400,css_row,func});
            };
        
       
    };


    async editResumeRef({parent,item,css_col,less900,less400,css_row,func}:{
        parent:HTMLElement,
        item:nameRefType,
        css_col:string,
        less400:boolean,
        less900:boolean,
        css_row:string,
        func:(nameRefs: nameRefType[],mainRef:mainResumeRefType,type:"add"|"rem") => Promise<void> | void,
    }){
        
        const {name}=item;
        const hasRef=this.mainRefs.find(kv=>(kv.name===name));
        if(!hasRef){
            const getMainReference= await this._service.getReference({name});
            if(getMainReference){
                this.mainRefs=[...this.mainRefs,getMainReference];
                this.editReferences({parent,mainRef:getMainReference,css_col,css_row,less900,less400,func});
            }
        }else{
            this.editReferences({parent,mainRef:hasRef,css_col,css_row,less900,less400,func});
        }
        
    };


    editReferences({parent,mainRef,css_col,css_row,less900,less400,func}:{parent:HTMLElement,mainRef:mainResumeRefType,css_col:string,css_row:string,less900:boolean,less400:boolean,
        func:(nameRefs: nameRefType[],mainRef:mainResumeRefType,type:"add"|"rem") => Promise<void> | void
    }){
        this.mainRef=mainRef;
            const {id,name:name_,user_id,french}=mainRef;
            const nameRef:nameRefType={id:id as number,name:name_,user_id,res_name_id:null,french:false};
            const container=document.createElement("section");
            container.id="edit-resume-ref";
            container.style.cssText=css_col;
            container.style.width=less900 ?(less400 ? "100%":"90%"):"80%";
            const name=document.createElement("h6");
            name.className="text-center text-primary font-weight-bold display-6 lean mt-2";
            name.style.fontSize=less900 ? (less400 ? "170%":"200%"):"230%";
            name.style.textTransform="capitalize";
            name.textContent="references";
            container.appendChild(name);
            this.closeForm({parent,target:container});
            
            const form=document.createElement("form");
            form.className=styles.editForm;
            form.id="ref-form";
            this.mainRef.references=this.mainRef.references.map((reference,ind)=>{
                if(reference){
                   
                    const mainRand=Math.floor(Math.random()*1000);
                    const refContainer=document.createElement("div");
                    const rand=Math.floor(Math.random()*10 + ind+1);
                    let color:string;
                    if(rand/10 > 0.3){
                        color="white";
                    }else{
                        color="black"
                    }
                    refContainer.id=`refContainer-${ind}`;
                    refContainer.style.cssText=css_col +`width:100%;background-color:rgba(0,0,0,${rand/10});border-radius:8px;box-shadow:1px 1px 12px 1px black;color:${color};margin-block:1.25rem;padding-block:1.25rem;`;
                    const name_=document.createElement("h5");
                    name_.style.cssText="line-height:1.25rem;font-size:120%;align-self:center;text-transform:uppercase;"
                    name_.textContent=reference.name;
                    refContainer.appendChild(name_);
                    form.appendChild(refContainer);
                    
                    for(const [refKey,refValue] of Object.entries(reference)){
                      
                         const check=["id","res_name_id"].includes(refKey)
                        if(refKey && !check ){
                            
                            if(refKey==="mainLink" && typeof(refValue)==="string"){
                                const {input:input1,label,formGrp}=EditResume.inputComponent(refContainer);
                                formGrp.style.cssText=css_col +"gap:1rem;position:relative;align-items:center;margin-inline:auto;";
                                formGrp.style.width=less400 ? "100%":"80%";
                                formGrp.style.order="1";
                                input1.value=refValue;
                                label.setAttribute("for",input1.id);
                                label.textContent=refKey;
                                input1.onchange=(e:Event)=>{
                                    if(!e) return;
                                    const value=(e.currentTarget as HTMLInputElement).value;
                                    reference.mainLink=value
                                };

                            }else if(refKey ==="desc" || refKey==="composite" && typeof(refValue)==="string"){
                                const {textarea,label,formGrp}=EditResume.textareaComponent(refContainer);
                                formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:stretch;margin-inline:auto;";
                                formGrp.style.width=less400 ? "100%":"80%";
                                formGrp.style.order="2";
                                textarea.style.width="auto";
                                textarea.id=`${refKey}-${mainRand}-textarea`;
                                textarea.name=`${refKey}-${mainRand}-textarea`;
                                textarea.value=refValue as string;
                                textarea.rows=4;
                                label.setAttribute("for",textarea.id);
                                label.textContent=refKey;

                                textarea.onchange=(e:Event)=>{
                                    if(!e) return;
                                    const value=(e.currentTarget as HTMLInputElement).value;
                                    if(refKey==="desc"){
                                        reference.desc=value;
                                    }else{
                                        reference.composite=value;
                                    }
                                };
                            }else if(refKey==="links"){
                             reference=this.editRefLinks({parent:refContainer,key:refKey,reference,order:4,less400,css_col,css_row});
                            }else if(refKey==="contacts"){
                                
                                reference=this.formComp.referenceContact({parent:refContainer,reference,key:refKey,css_row,css_col,less400,order:3,french});
                            };
                        }
                    }
                };
                return reference
            });
            const btnCont=document.createElement("div");
            btnCont.id="btn-cont";
            btnCont.className=styles.css_row;
            form.appendChild(btnCont);
            Resume.simpleButton({anchor:btnCont,type:"submit",bg:"black",color:"white",text:"submit",time:400});
            container.appendChild(form);
            const {button:delete_}=Resume.simpleButton({anchor:btnCont,bg:'black',color:'white',type:'button',time:400,text:'delete'});
            delete_.onclick=(e:MouseEvent)=>{
                if(!e) return;
                this.deleteRequest({
                    grandParent:parent,
                    parent,
                    item:nameRef,
                    css_col,
                    css_row,
                    func
                });
            };
            form.onsubmit=(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    container.style.transform="rotateX(90deg)";
                    container.animate([
                        {transform:"rotateX(0deg)",opacity:"1"},
                        {transform:"rotateX(90deg)",opacity:"0"},
                    ],{duration:600,iterations:1,"easing":"ease-in-out"});
                    setTimeout(()=>{
                        parent.removeChild(container);
                        
                        //THIS REPLACES EDITED PORTION WITH THE ORIGINAL REFERENCE DATA
                        const references=this.mainRef.references;
                        //THIS REPLACES EDITED PORTION WITH THE ORIGINAL REFERENCE DATA
                        const containerShow=document.createElement("section");
                        containerShow.id="edit-resume-ref-show";
                        containerShow.style.cssText=css_col + "margin-inline:auto;margin-block:1rem;margin-top:2rem;";
                        containerShow.style.width=less900 ?(less400 ? "100%":"90%"):"80%";
                        parent.appendChild(containerShow);
                        references.map((reference,index)=>{
                            if(reference){
                                this.viewRef.refCard({parent:containerShow,less400,less900,css_col,css_row,reference,index});
                            }
                        });
                        this.saveReferences({parent,mainReference:this.mainRef,css_row,css_col,less400,func});
                    },550);
                };
            };
            parent.appendChild(container);
    };


    saveReferences({parent,mainReference,css_row,css_col,less400,func}:{parent:HTMLElement,mainReference:mainResumeRefType,css_row:string,css_col:string,less400:boolean,
        func:(nameRefs: nameRefType[],mainRef:mainResumeRefType,type:"add"|"rem") => Promise<void> | void
    }){
        const container=document.createElement("div");
        container.id='save-container-references';
        container.style.cssText=css_row +"margin-inline:auto;margin-block;2rem;gap:2rem;align-items:center;justify-content:center;";
        const {button:save}=Resume.simpleButton({anchor:container,type:"button",time:400,bg:"black",color:"white",text:"save"});
        this.saveNewReferences({grandParent:parent,parent:container,mainReference,less400,css_row,css_col,func});
        parent.appendChild(container);
        save.onclick=async(e:MouseEvent)=>{
            if(!e) return;
            await this._service.saveReferences({mainReference}).then(async(res)=>{
                if(res){
                    this.mainRef=res;
                    ([...parent.children] as HTMLElement[]).forEach(child=>{
                        if(child && child.id !=="container-row"){
                            parent.removeChild(child);
                        }
                    });
                    Resume.message({parent,msg:"saved",type:"success",time:600});

                }else{
                    Resume.message({parent,msg:"not saved",type:"error",time:1600});
                }
            }).catch((error)=>{const msg=getErrorMessage(error);console.error(msg)});
        };
    };



    saveNewReferences({grandParent,parent,mainReference,css_row,css_col,less400,func}:{parent:HTMLElement,grandParent:HTMLElement,mainReference:mainResumeRefType,css_row:string,css_col:string,less400:boolean,
        func:(nameRefs: nameRefType[],mainRef:mainResumeRefType,type:"add"|"rem") => Promise<void> | void
    }){
        const less900=window.innerWidth < 900;
        const container=document.createElement("div");
        container.id='save-new-container';
        container.style.cssText=css_row +"margin-inline:auto;margin-block;2rem;flex:1 0 60%;padding-inline:1rem;";
        parent.appendChild(container)
        const form=document.createElement("form");
        form.id="form-save-new";
        form.style.cssText=css_col + "width:100%;padding-inline:auto;margin-block:1rem;padding-block:1rem;gap:1rem;";
        container.appendChild(form);
        const {input,label,formGrp}=EditResume.inputComponent(form);
        formGrp.id="form-group-name";
        formGrp.style.cssText=css_col + "align-items:center;justify-content:center;gap:1rem;";
        input.id="name";
        input.name="name";
        input.style.width="";
        label.setAttribute("for",input.id);
        label.textContent="new name";
        input.placeholder="name";
        input.type="text";
        const {button:saveNew}=Resume.simpleButton({anchor:form,type:"submit",time:400,bg:"black",color:"white",text:"save-new"});
      
        saveNew.style.marginBlock="1rem";
        saveNew.onchange=(e:Event)=>{
            if(!e) return;
            saveNew.disabled=false;
        };
        form.onsubmit=(e:SubmitEvent)=>{
            if(e && this.user){
                e.preventDefault();
                const rand=Math.floor(Math.random()*1000);
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const name=formdata.get("name") as string;
                const _name=name.split(" ").join("_").trim() + "-" + String(rand);
                mainReference={...mainReference,id:0,name:_name,user_id:this.user.id};
                this._service.saveReferences({mainReference}).then(res=>{
                    if(res){
                        
                        this.mainRefs=[...this.mainRefs,res];
                        const addedNameRef={id:res.id as number,user_id:res.user_id,name:res.name} as nameRefType;
                        this.nameRefs=[...this.nameRefs,addedNameRef];
                        ([...grandParent.children] as HTMLElement[]).forEach(child=>{
                            if(child && child.id !==this.rowId){
                                grandParent.removeChild(child);
                            }
                        });
                        const {references,name}=res;
                        this.mainRef=res;
                        this.viewRef.showReferences({parent:grandParent,references,name,show:true,time:1500,css_col,css_row,less400,less900,toPrint:true});
                        func(this.nameRefs,res,"add")
                    }
                });
            }
        };
        
    };


    editRefLinks({parent,reference,key,less400,order,css_col,css_row}:{parent:HTMLElement,reference:resumeRefType,key:string,order:number,less400:boolean,css_col:string,css_row:string}):resumeRefType{
        const len=reference?.links?.length;
        const refLinksCont=document.createElement("div");
        refLinksCont.className=styles.refLinksCont;
        refLinksCont.style.position="relative";
        refLinksCont.id="ref-links-cont";
        refLinksCont.style.order=String(order);
        parent.appendChild(refLinksCont);
        this.formComp.addRemove.addReflink({
            parent:refLinksCont,
            reference,
            less400,
            func:(reference)=>{
                Resume.cleanUpById({parent,id:"ref-links-cont"});
                this.editRefLinks({parent,reference,key,less400,order,css_col,css_row});
            }
        });
      
        if(len >0){
          reference.links=reference.links.map((item,index)=>{
                if(item){
                    const row=document.createElement("div");
                    row.id="ref-links-row-"+String(index);
                    row.className=styles.refLinksCont;
                    row.style.position="relative";
                    refLinksCont.appendChild(row);
                    this.formComp.addRemove.removeReflink({
                        target:row,
                        reference,
                        link:item,
                        less400,
                        func:(reference)=>{
                            Resume.cleanUpById({parent,id:"ref-links-cont"});
                            this.editRefLinks({parent,reference,key,less400,order,css_col,css_row});
                        }
                    });
                    const rand=Math.floor(Math.random()*1000);
                    const colleft=document.createElement("div");
                    colleft.className=styles.colleft
                    colleft.id="row-col-left" + String(index) + "-" + String(rand);
                   
                    const {input,label}=EditResume.inputComponent(colleft);
                    input.style.width=less400 ? "75%":"50%";
                    input.style.width="auto";
                    input.placeholder=key;
                    input.id=`${item.name}-${index}-${rand}`;
                    input.name=`links-${rand}-name-${index}-${rand}`;
                    input.value=item.name;
                    label.setAttribute("for",input.id);
                    label.textContent="name";
                    label.style.textTransform="uppercase";
                    row.appendChild(colleft);
                    input.onchange=(e:Event)=>{
                        if(!e) return;
                        const value=(e.currentTarget as HTMLInputElement).value;
                        item.name=value;
                    };
    
                    const colright=document.createElement("div");
                    colright.id="row-col-right"  + String(index) + "-" + String(rand);
                    colright.className=styles.colleft
                  
                    const {input:rinput,label:rlabel,formGrp:rformGrp}=EditResume.inputComponent(colright);
                    rformGrp.style.cssText=css_col +"width:auto;gap:1rem;position:realtive;align-items:center;";
                    rformGrp.style.width=less400 ? "100%":"80%";
                    rinput.style.width=less400 ? "75%":"50%";
                    rinput.style.width="auto";
                    rinput.placeholder=key;
                    rinput.id=`link-${index}-${rand}`;
                    rinput.name=`links-${rand}-link-${index}-${rand}`;
                    rinput.value=item.link;
                    rlabel.setAttribute("for",input.id);
                    rlabel.textContent="link";
                    rlabel.style.textTransform="uppercase";
                    row.appendChild(colright);
                    rinput.onchange=(e:Event)=>{
                        if(!e) return;
                        const value=(e.currentTarget as HTMLInputElement).value;
                        item.link=value;
                    };
                };
                return item;
            });

        }
        return reference;
    };


    deleteRef({grandParent,parent,item,css_col,css_row,func}:{
        grandParent:HTMLElement,
        parent:HTMLElement,
        item:nameRefType,
        css_col:string,
        css_row:string,
        func:(nameRefs:nameRefType[],mainRef:mainResumeRefType,type:"rem"|"add")=>Promise<void>|void

    }){
        const xDiv=document.createElement("div");
        parent.style.position="relative";
        xDiv.id="delete-ref";
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(40px, 30px);padding:2px;background-color:black;color:white;border-radius:50%";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"12px",color:"white",borderradius:"50%"}});
        parent.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(!e) return;
            this.deleteRequest({
                grandParent,
                parent,
                item,
                css_col,
                css_row,
                func
            });
        };
    };


    closeForm({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        const xDiv=document.createElement("div");
        target.style.position="relative";
        xDiv.id="delete-icon";
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(10px,-15px);background-color:black;padding:2px;border-radius:50%;color:white;z-index:200;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"16px",borderRadius:"50%",bcolor:"white"}});
        target.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(!e) return;

            ([...parent.children] as HTMLElement[]).forEach(child=>{
                if(child && child.id===target.id){
                    parent.removeChild(child);
                }
            });
        };
    };


    deleteRequest({
        grandParent,
        parent,
        item,
        css_col,
        css_row,
        func

    }:{
        grandParent:HTMLElement,
        parent:HTMLElement,
        item:nameRefType,
        css_col:string,
        css_row:string,
        func:(nameRefs: nameRefType[],mainRef:mainResumeRefType,type:"add"|"rem") => Promise<void> | void
    }){
        const container=document.createElement("div");
        const {res_name_id,name}=item;
        container.id="delete-resume-request";
        container.style.cssText=css_col + "margin-inline:auto;padding-inline:1rem;background-color:white;color:black;box-shadow:1px 1px 12px 1px black;border-radius:8px;margin-block:1rem;position:absolute;inset:0%;width:300px;height:150px;align-items:center;";
        const para=document.createElement("p");
        para.id="para";
        if(res_name_id){
            para.textContent= `are you sure you want to delete ${name}.The reference page is ATTACHED to ${res_name_id.split("_")[1]} file resume ?`;

        }else{
            para.textContent= `are you sure you want to delete ${name}?`;
        }
        container.appendChild(para);
        container.appendChild(para);
        grandParent.appendChild(container);
        const btnDiv=document.createElement("div");
        btnDiv.id="btnDiv";
        btnDiv.style.cssText=css_row + "margin-inline:auto;gap:1.5rem;margin-block:1rem;justify-content:space-around;";
        const {button:cancel}=Resume.simpleButton({anchor:btnDiv,bg:"blue",color:"white",text:"cancel",time:400,type:"button"});
        const {button:delete_}=Resume.simpleButton({anchor:btnDiv,bg:"red",color:"white",text:"delete",time:400,type:"button"});
        container.appendChild(btnDiv);
        cancel.onclick=(e:MouseEvent)=>{
            if(!e) return;
            grandParent.removeChild(container);
        };
        delete_.onclick=(e:MouseEvent)=>{
            if(!e) return;
            this._service.deleteReference({item}).then(async(res)=>{
                if(res){
                    const {name}=res
                    this.mainRefs=this.mainRefs.filter(kv=>(kv.id!==res.id));
                    this.nameRefs = this.nameRefs.filter(kv=>(kv.name !==name));
                    const nameRefs=this.nameRefs
                    const mainRef=this.mainRefs.find(kv=>(kv.id !==res.id));
                    Resume.message({parent,msg:" deleted",type:"success",time:700});
                    Resume.cleanUp(grandParent);
                    if(!mainRef) return;
                    func(nameRefs,mainRef,"rem")
                }
            });
        };
    };

};
export default EditReference;
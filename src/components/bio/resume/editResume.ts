import { FaCrosshairs } from "react-icons/fa";
import { FaCreate } from "../../common/ReactIcons";
import Service from "@/components/common/services";
import { awardType, contactRefType, educationType, formResType, linkType, mainResumeRefType, mainResumeType, nameResumeType, orgType, resumeType, userType, workExperienceType } from "./refTypes";
import Resume from "./resume";
import { getErrorMessage } from "../../common/errorBoundary";
import ViewResume from "./viewResume";
import AddRemove from "./addRemove";
import FormComponents from "./formComponents";
import styles from "./editresume.module.css"
import { langConversion } from "./engFre";





class EditResume {
    public rowId:string;
    public containerId:string;
    public innerContId:string;
    public educationOrgs:orgType[];
    public workOrgs:orgType[];
    public injection:HTMLElement;
    private _mainResume:mainResumeType;
    private _mainResumes:mainResumeType[];
    private _nameResumes:nameResumeType[];
    private _mainResumeRefs:mainResumeRefType[];
    private formResNames:formResType[];
    private _experience:workExperienceType;
    private _education:educationType;
    private _achievement:awardType;
    public contacts:contactRefType[];
    public contact:contactRefType;
    public links:linkType[];
   


    
    constructor(private _service:Service,public viewresume:ViewResume,private _addRemove:AddRemove,public formComp:FormComponents, private _user:userType|null){
        
       
        this.rowId="";
        this.containerId="";
        this.innerContId="innercontainer"
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
        this.educationOrgs=[
            {id:0,cat:"school",catFr:"ecole"},
            {id:1,cat:"location",catFr:"location"},
            {id:2,cat:"level",catFr:"niveau"},
            {id:3,cat:"from",catFr:"de"},
            {id:4,cat:"to",catFr:"a"},
            {id:5,cat:"degree",catFr:"degre"},
            {id:6,cat:"GPA",catFr:"GPA/MPC"},
            {id:7,cat:"relevantWork",catFr:"pertinentTravail"},
            {id:8,cat:"extracurricular",catFr:"périscolaire"},
            {id:9,cat:"achievements",catFr:""},
            {id:10,cat:"skills",catFr:""},
        ];

        this.workOrgs=[
            {id:0,cat:"title",catFr:"titre"},
            {id:1,cat:"company",catFr:"companie"},
            {id:2,cat:"summary",catFr:"résumé"},
            {id:3,cat:"location",catFr:"loaction"},
            {id:4,cat:"from",catFr:"de"},
            {id:5,cat:"to",catFr:"a"},
            {id:6,cat:"achievements",catFr:"réalisations"},
            {id:7,cat:"skills",catFr:"compétences"},
        ];

        this._achievement={
            id:1,
            achievement:"Instead of highlighting your duties and responsibilities, try to outline your achievements and awards",
            reason:" Provide a stand-out answer to the question “reasons to why you should get hired? through reason” by proving how well you handled the things in your past",
            composite:" What you used to attain the above achievement."
        };

        this._experience={
            id:0,
            title:"",
            company:"",
            summary:" It is a section where you describe your past jobs, titles, and work history",
            location:"",
            from:"",
            to:"",
            skills:["Teamwork","Critical Thinking","Problem Solving","Customer Service"],
            achievements:[this._achievement]
        };
       
        this._education={
            id:0,
            school:"",
            location:"",
            level:"",
            from:"",
            to:"",
            degree:"",
            GPA:0,
            relevantWork:"",
            extracurricular:"",
            skills:["Problem Solving","Leadership"],
            achievements:[this._achievement]
        };

        this._mainResume={} as mainResumeType;

        this._mainResumes= this._user?.resumes as mainResumeType[] || [] as mainResumeType[];
     
        this._nameResumes=[] as nameResumeType[];

        this._mainResumeRefs= this._user?.references as mainResumeRefType[] || [] as mainResumeRefType[];

        this.formResNames=[] as formResType[];
        
        this.injection={} as HTMLElement;
    }

    //-----------------GETTER/SETTERS--------------------//
    get mainResume(){
        return this._mainResume;
    };
    set mainResume(mainResume:mainResumeType){
        this._mainResume=mainResume
    }
    
    get mainResumeRefs(){
        return this._mainResumeRefs;
    };
    set mainResumeRefs(mainResumeRefs:mainResumeRefType[]){
        this._mainResumeRefs=mainResumeRefs
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
   
    get education(){
        return this._education;
    };
    set education(education:educationType){
        this._education=education
    };
    get experience(){
        return this._experience;
    };
    set experience(experience:workExperienceType){
        this._experience=experience
    };
    set user(user:userType|null){
        this._user=user;
        
    }
    get user(){
        return this._user;
    }
    
    
    //-----------------GETTER/SETTERS--------------------//
    //NOT USED
    main({parent,user,french}:{parent:HTMLElement,user:userType|null,french:boolean}){
        this.injection=parent;
        
        if(user){
            this.user=user;
            this.nameResumes=user.resumes.map(res=>({id:res.id as number,name:res.name,user_id:res.user_id,enable:res.enable}))
            this.mainResumes=user.resumes.map(res=>({id:res.id as number,name:res.name,user_id:res.user_id,enable:res.enable,resume:res.resume as resumeType}))
        }
        const css_col="display:flex;flex-direction:column;"
        const container=document.createElement("section");
        container.id="container-resumes-edit";
        container.style.cssText=css_col + "width:100%;margin-inline:auto;";
        const name=document.createElement("h4");
        name.textContent="edit your resume";
        name.style.cssText="text-transform:capitalize;margin-inline:auto;";
        this.getResumes({parent:container,user,french});
        parent.appendChild(container);
    };
    //NOT USED
    async getResumes({parent,user,french}:{parent:HTMLElement,user:userType|null,french:boolean}){
        this.user=user
        const less400=window.innerWidth < 400;
        const less900=window.innerWidth < 900;
        const hasResume=!!(this.nameResumes?.length && this.nameResumes.length)
        const css_col="display:flex;flex-direction:column;justify-content:center;width:100%;margin-inline:auto;"
        const css_row="display:flex;flex-wrap:nowrap;align-items:center;margin-inline:auto;"
        if(!hasResume && user){
            const resumes=await this._service.getResumes({user_id:user.id}); 
            if(!resumes) return Resume.message({parent,type:"error",msg:"NO RESUMES",time:1200});
            this.nameResumes=[...resumes];
        }
       
        
        const container=document.createElement("section");
        container.id="get-resumes-cont";
        container.style.cssText=css_col + "width:100%;align-items:center;" ;
        //
        const innerContainer=document.createElement("div");
        innerContainer.className=styles.innerContainer
        innerContainer.id="innercontainer";
        const title=document.createElement("h5");
        title.className="text-light text-center my-1 mb-2 lean display-6";
        title.style.marginBlock="1.25rem";
        title.style.marginBottom="1.5rem";
        title.style.marginBottom="1.5rem";
        title.textContent="Editor";
        //cssStyle:{backgroundColor:"brown",height:"2px"}
        Resume.lineDivison({parent:innerContainer,width:"100%",background:"black"});
        innerContainer.appendChild(title);
        const row=document.createElement("div");
        row.id="container-row";
        
        row.className=styles.rowContainer;
        this.selectResume({grandParent:container,parent:innerContainer,row,less400,less900,css_col,css_row,nameResumes:this.nameResumes,user,french});
        innerContainer.appendChild(row);
        const {button}=Resume.simpleButton({anchor:innerContainer,type:"button",bg:"black",color:"white",text:"back",time:400});
        button.style.justifySelf="center";
        button.style.alignSelf="center";
        button.style.order="6";
        button.style.marginBlock="1.5rem";
        button.onclick=(e:MouseEvent)=>{
            if(e){
                const newUrl=new URL("/",window.location.origin);
                window.location.href=newUrl.href;
            }
        };
        Resume.lineDivison({parent:innerContainer,width:"100%",background:"black"});
        container.appendChild(innerContainer);
        parent.appendChild(container);
    };


    //NOT USED
    selectResume({grandParent,parent,row,css_col,css_row,less400,less900,nameResumes,user,french}:{
        grandParent:HTMLElement,
        parent:HTMLElement,
        row:HTMLElement,
        css_col:string,
        css_row:string,
        less400:boolean,
        less900:boolean,
        nameResumes:nameResumeType[],
        user:userType|null,
        french:boolean
    }){
        const col1=document.createElement("div");
        col1.id="resume-side";
        col1.className=styles.rowCol;
        col1.style.flex=less400 ? "":"1 0 50%";
        col1.style.width=less400 ? "100%":"50%";
        col1.style.order="0";
        nameResumes.map((nameResume,index)=>{
            const name=document.createElement("p");
            name.id=`name-${index}`;
            name.style.cssText= "width:auto;margin-inline:auto;";
            name.innerHTML=`<span style=color:blue>name:</span>${nameResume.name}`;
            col1.appendChild(name);
            const {button}=Resume.simpleButton({anchor:col1,text:nameResume.name,type:"button",bg:"black",color:"white",time:400});
            button.onclick=(e:MouseEvent)=>{
                if(!e) return;
                ([...grandParent.children] as HTMLElement[]).forEach(child=>{
                    if(child && child.id !==parent.id){
                        grandParent.removeChild(child)
                    }
                });
                this.editResume({grandParent,parent:grandParent,nameResume,row,css_col,css_row,less900,less400,user,french,
                    func:()=>{}
                });
            };
        });

        row.appendChild(col1);
    };

    //INJECTION POINT!!!
    async editResume({grandParent,parent,nameResume,row,css_col,css_row,less900,less400,user,french,func}:{
        grandParent:HTMLElement,
        parent:HTMLElement,
        row:HTMLElement,
        nameResume:nameResumeType,
        css_col:string,
        css_row:string,
        less400:boolean,
        less900:boolean,
        user:userType|null,
        french:boolean,
        func:(mainResumes:mainResumeType[],mainResume:mainResumeType,type:"rem"|"add")=>Promise<void>|void
    }){
        this.user=user;
        this.formResNames=[];
        const {name}=nameResume;
        const hasResume=this.mainResumes.find(kv=>(kv.name===name));
        if(!hasResume){
            const getMainResume= await this._service.getResume({name});
            if(getMainResume){
                this.mainResumes=[...this.mainResumes,getMainResume];
                this.mainResume=getMainResume
            }
        }else{
            this.mainResume=hasResume;
        }
            const {resume,name:_name}=this.mainResume;
            const container=document.createElement("section");
            container.id="edit-resume";
            container.style.cssText=css_col + "margin-inline:auto;background-color:#032767b8;align-items:center;border-radius:12px;margin-block:2rem;" ;
            container.style.width=less900 ? (less400 ? "100%":"90%"):"80%";
            container.style.paddingInline=less900 ? (less400 ? "0.25rem":"2rem"):"4rem";
            const title=document.createElement("h6");
            title.className="text-center text-light font-weight-bold display-6 lean mt-2";
            title.style.fontSize=less900 ? (less400 ? "170%":"200%"):"230%";
            title.style.textTransform="capitalize";
            title.textContent=french ? langConversion({key:"resume"}):"resume";
            container.appendChild(title);
            //------FILE NAME-------------------//
            const fileCont=document.createElement("div");
            fileCont.className=styles.fileCont;
            const span=document.createElement("span");
            span.textContent=french ? `${langConversion({key:"filename"})}:`:"filename:";
            const filename=document.createElement("h6");
            filename.textContent=_name;
            fileCont.appendChild(span);
            fileCont.appendChild(filename);
            container.appendChild(fileCont);
            //------FILE NAME-------------------//
            this.closeForm({parent,target:container});
            const summCont=document.createElement("div");
            summCont.id="summ-cont";
            summCont.style.cssText="width:100%;margin-inline:auto;border:1px solid grey;box-shadow:1px 1px 10px 1px white;border-radius:inherit;padding:1rem;color:white;text-align:center;background-color:black;";
            container.appendChild(summCont);
            this.mainResume.resume=this.editSummary({parent:summCont,resume,css_col,less400,french});
            const contactCont=document.createElement("div");
            contactCont.className=styles.contactCont;
            contactCont.id="contact-cont";
            container.appendChild(contactCont);
            this.mainResume.resume=this.editContact({parent:contactCont,resume,css_col,less400,french});
            const workCont=document.createElement("div");
            workCont.id="work-cont";
            workCont.style.cssText="width:100%;margin-inline:auto;border:1px solid blue;box-shadow:1px 1px 10px 1px white;border-radius:inherit;padding:1rem;color:white;text-align:center;background-color:black;position:relative;";
            container.appendChild(workCont);
            this.mainResume.resume=this.editWorkExper({parent:workCont,resume,css_col,css_row,less400,french});
            this._addRemove.addWorkEducate({
                parent:workCont,
                resume,
                css_col,
                isEducation:false,
                less400,
                french,
                func:(resume)=>{
                    this.mainResume.resume=this.editWorkExper({parent:workCont,resume,css_col,css_row,less400,french});
                }

            });
            const educateCont=document.createElement("div");
            educateCont.id="educate-cont";
            educateCont.style.cssText="width:100%;margin-inline:auto;border:1px solid blue;box-shadow:1px 1px 10px 1px white;border-radius:inherit;padding:1rem;color:white;text-align:center;background-color:black;";
            container.appendChild(educateCont);
            this.mainResume.resume=this.editEducation({parent:educateCont,resume,css_row,css_col,less400,french});
            this._addRemove.addWorkEducate({
                parent:workCont,
                resume,
                css_col,
                french,
                isEducation:true,
                less400,
                func:(resume)=>{
                    this.mainResume.resume=this.editEducation({parent:educateCont,resume,css_col,css_row,less400,french});
                }

            });
            const sitesCont=document.createElement("div");
            sitesCont.id="sites-cont";
            sitesCont.style.cssText="width:100%;margin-inline:auto;border:1px solid blue;box-shadow:1px 1px 10px 1px white;border-radius:inherit;padding:1rem;color:white;text-align:center;background-color:black;";
            container.appendChild(sitesCont);
            this.mainResume.resume=this.editSites({parent:sitesCont,resume,css_col,less400});
            const languageCont=document.createElement("div");
            languageCont.id="languages-cont";
            languageCont.style.cssText="width:100%;margin-inline:auto;border:1px solid blue;box-shadow:1px 1px 10px 1px white;border-radius:inherit;padding:1rem;color:white;text-align:center;background-color:black;";
            this.mainResume.resume=this.editLanguages({parent:languageCont,resume,css_col,css_row,less400,french});
            container.appendChild(languageCont);
            
            parent.appendChild(container);
           const {button}=Resume.simpleButton({anchor:container,type:"button",text:"submit",bg:"#0fe066",color:"white",time:400});
           button.style.justifySelf="center";
           button.style.alignSelf="center";
           button.style.marginBlock="2rem";
            button.onclick=(e:MouseEvent)=>{
                if(e){
                    container.style.transform="rotateX(90deg)";
                    container.animate([
                        {transform:"rotateX(0deg)",opacity:"1"},
                        {transform:"rotateX(90deg)",opacity:"0"},
                    ],{duration:600,iterations:1,"easing":"ease-in-out"});
                    setTimeout(()=>{
                        parent.removeChild(container);
                     
                        this.viewresume.resume({parent,mainResume:this.mainResume,showPrint:false,closeDelete:true,french,
                            func1:()=>{}
                        });
                        this.saveCreateNewResume({grandParent,parent,row,mainResume:this.mainResume,css_row,css_col,user,french,func});
                    },550);
                }
            };
        
    };


    saveCreateNewResume({grandParent,parent,row,mainResume,css_row,css_col,user,french,func}:{grandParent:HTMLElement,parent:HTMLElement,row:HTMLElement,mainResume:mainResumeType,css_row:string,css_col:string,user:userType|null,french:boolean,
        func:(mainResumes:mainResumeType[],mainResume:mainResumeType,type:"rem"|"add")=>Promise<void>|void
    }){
        
        const container=document.createElement("div");
        container.className=styles.saveCreateNewResume;
        container.id='save-create-new-container';
        const lang=langConversion({key:"save as new File?"});
        const text_=french ? lang :"save as new File?";
        const {button:saveNew}=Resume.simpleButton({anchor:container,type:"button",time:400,bg:"black",color:"white",text:text_});
        saveNew.onclick=(e:MouseEvent)=>{
            if(!e) return;

            this.editSaveAsNew({grandParent,parent,row,mainResume,css_row,css_col,user,func})

            
        };
        const text_1=french? langConversion({key:"save"}) : "save";
        const {button:save}=Resume.simpleButton({anchor:container,type:"button",time:400,bg:"black",color:"white",text:text_1});
        parent.appendChild(container);
        parent.appendChild(container);
        save.onclick=async(e:MouseEvent)=>{
            if(!e) return;
         
            if(user?.id){
                mainResume={...mainResume,user_id:user.id as string}
                await this._service.saveResume({mainResume}).then(async(res)=>{
                    if(res){
                        this.mainResume=res;
                        ([...parent.children] as HTMLElement[]).forEach(child=>{
                            if(child && child.id !==this.rowId){
                                parent.removeChild(child);
                            }
                        });
                        const lang=french ? langConversion({key:"saved"}): "saved";
                        Resume.message({parent,msg:`${lang} :${res.name}`,type:"success",time:600});
                    }else{
                        const lang=french ? langConversion({key:"not saved"}): "not saved";
                        Resume.message({parent,msg:lang,type:"error",time:1600});
                    }
                }).catch((error)=>{const msg=getErrorMessage(error);console.error(msg)});

            }
        };
    };

    editSaveAsNew({grandParent,parent,user,mainResume,func}:{parent:HTMLElement,grandParent:HTMLElement,row:HTMLElement,css_col:string,css_row:string,user:userType|null,mainResume:mainResumeType,
        func:(mainResumes:mainResumeType[],mainResume:mainResumeType,type:"rem"|"add")=>Promise<void>|void
    }){
        console.log("editSaveAsNew: START")
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.id="popup-edit-saveNew";
        popup.className=styles.editSaveAsNewCont;
        popup.style.padding="1rem";
        parent.appendChild(popup);
        const form=document.createElement("form");
        form.id="edit-saveas-new-form";
        form.className=styles.css_col;
        const {input,label,formGrp}=EditResume.inputComponent(form);
        formGrp.className=styles.formGrp;
        formGrp.style.gap="1rem";
        input.id="file-name";
        input.type="text";
        input.name="name";
        input.placeholder="file name";
        label.setAttribute("for",input.id);
        label.textContent="file name";
        popup.appendChild(form);
        Resume.simpleButton({anchor:form,bg:"black",color:"white",type:"submit",time:400,text:"submit"});
        form.onsubmit=async(e:SubmitEvent)=>{
            if(!(e && user)) return;
            e.preventDefault();
            console.log("STEP1");
            const rand=Math.floor(Math.random()*1000);
            const formdata=new FormData(e.currentTarget as HTMLFormElement);
            const name=formdata.get("name") as string;
            const _name=`${name.split(" ").join("_").trim()}-${rand}`;
            mainResume.resume.name=_name;
            mainResume={...mainResume,name:_name,user_id:user.id};
            await this._service.saveResume({mainResume}).then(async(res)=>{
                if(res){
                    this.mainResume=res;
                    this.mainResumes=[...this.mainResumes,res];
                    const nameResume={id:res.id,name:res.name,user_id:res.user_id} as nameResumeType;
                    this.nameResumes=[...this.nameResumes,nameResume];
    
                    ([...parent.children] as HTMLElement[]).forEach(child=>{
                        if(child && child.id !==this.rowId){
                            parent.removeChild(child);
                        }
                    });
                    Resume.message({parent:grandParent,msg:`created new ${name}`,type:"success",time:800});
                    func(this.mainResumes,res,"add");
                    
                }
            });

        };
    }


    //NOT USED
    saveCreateNew({grandParent,parent,row,mainResume,css_col,css_row,user,french}:{grandParent:HTMLElement,parent:HTMLElement,mainResume:mainResumeType,row:HTMLElement,css_col:string,css_row:string,user:userType|null,french:boolean}){
        const less400=window.innerWidth <400;
        const less900=window.innerWidth <900;
        const container=document.createElement("div");
        container.id='createNew-container';
        container.style.cssText=css_col +"margin-inline:auto;align-self:center;justify-content:center;align-items:center;gap:0.75rem;width:100%;position:relative;flex:1 0 60%;";
        const form=document.createElement("form");
        form.id="form-create-new";
        form.style.cssText=css_row +"margin-inline:auto;gap:1rem;justify-content:center;align-items:center;background-color:whitesmoke;border-radius:8px;box-shadow:1px 1px 12px 1px black;padding:1rem;";
        form.style.width="auto";
        const {input,label,formGrp}=EditResume.inputComponent(form);
        formGrp.style.cssText=css_col + "margin-inline:auto;gap:1rem;width:auto;";
        formGrp.style.gap="1rem";
        input.id="name";
        input.name="name";
        input.type="text";
        input.style.width="auto";
        input.placeholder="new name";
        label.setAttribute("for",input.id);
        label.textContent="New Name";
        const {button:new_}=Resume.simpleButton({anchor:form,type:"submit",time:400,bg:"black",color:"white",text:"createNew"});
        new_.disabled=true;
        new_.style.marginBlock="1rem";
       
        input.onchange=(e:Event)=>{
            if(!e) return;
            new_.disabled=false;
        };
        container.appendChild(form)
        parent.appendChild(container);
        form.onsubmit=async(e:SubmitEvent)=>{
            if(!e) return;
            e.preventDefault();
            const formdata=new FormData(e.currentTarget as HTMLFormElement);
            const name=formdata.get("name") as string;
            const _name=name.split(" ").join("").trim()
            mainResume={...mainResume,id:0,name:_name};
            await this._service.saveResume({mainResume}).then(async(res)=>{
                if(res?.id && Number.isNaN(res.name)){
                    this.mainResume=res;
                    const remain=this.mainResumes.filter(res_=>(res_.name !==res.name));
                    this.mainResumes=[...remain,res];
                    const nameResume={id:res.id,name:res.name,user_id:res.user_id} as nameResumeType;
                    const nameRemain=this.nameResumes.filter(_res=>(_res.name !==res.name));
                    this.nameResumes=[...nameRemain,nameResume];
                    ([...parent.children] as HTMLElement[]).forEach(child=>{
                        if(child && child.id !==this.rowId){
                            parent.removeChild(child);
                        }
                    });
                    Resume.message({parent,msg:`created new ${name}`,type:"success",time:800});
                    this.cleanUp(grandParent);
                    this.selectResume({grandParent,parent,css_col,css_row,row,less400,less900,nameResumes:this.nameResumes,user,french});
                }else{
                    Resume.message({parent,msg:"not saved",type:"error",time:1600});
                }
            }).catch((error)=>{const msg=getErrorMessage(error);console.error(msg)});
        };
        
    };

    

    editSummary({parent,resume,css_col,less400,french}:{
        parent:HTMLElement,
        resume:resumeType,
        css_col:string,
        less400:boolean,
        french:boolean
    }):resumeType{
        const {summary}=resume;
        const summaryCont=document.createElement("div");
        summaryCont.id="summary-cont";
        summaryCont.style.cssText=css_col + "background-color:lightblue;border:1px solid purple;box-shadow:1px 1px 12px 1px purple;border-radius:8px;padding-block:1.5rem;margin-block:1.5rem;";
        const name=document.createElement("h4");
        name.style.cssText="text-transform:uppercase;";
        name.textContent=french ? langConversion({key:"summary"}):"summary";
        summaryCont.appendChild(name)
        parent.appendChild(summaryCont);
        const {textarea:summInput,label,formGrp}=EditResume.textareaComponent(summaryCont);
        formGrp.style.cssText=css_col +"width:100%;gap:1rem;position:relative;align-items:stretch;margin-inline:auto;";
        formGrp.style.width=less400 ? "100%":"80%";
       
        summInput.id="summary-"+"summary";
        summInput.name="summary-"+"summary";
        summInput.value=summary;
        summInput.style.width="auto";
        label.setAttribute("for",summInput.id);
        label.textContent=french ? langConversion({key:"summary"}) :"summary";
        summInput.rows=6;
        summInput.onchange=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLTextAreaElement).value;
            resume.summary=value;
        };
        
        return resume;
    };



    editContact({parent,resume,css_col,less400,french}:{
        parent:HTMLElement,
        resume:resumeType,
        css_col:string,
        less400:boolean,
        french:boolean
    }):resumeType{
        const contactCont=document.createElement("div");
        contactCont.id="contact-cont-inner";
        contactCont.style.cssText=css_col + "background-color:whitesmoke;border:1px solid orange;box-shadow:1px 1px 12px 1px orange;border-radius:8px;padding-block:1.5rem;margin-block:1.5rem;";
        const name=document.createElement("h4");
        name.style.cssText="text-transform:uppercase;";
        name.textContent=french ? langConversion({key:"contact"}):"contact";
        name.className="text-primary text-center";
        contactCont.appendChild(name);
        parent.appendChild(contactCont);
        const {contact}=resume;
        for(const [key,value]of Object.entries(contact)){
            const {input,label,formGrp}=EditResume.inputComponent(contactCont);
          
            formGrp.style.cssText=css_col +"width:100%;gap:1rem;position:relative;align-items:center;";
            
            input.id=`${key}`;
            input.name="contact-" + key;
            input.value=value;
            input.style.width=less400 ? "75%":"50%";
            label.setAttribute("for",input.id);
            label.textContent=french? langConversion({key}):key;
            input.onchange=(e:Event)=>{
                if(!e) return;
                const value=(e.currentTarget as HTMLTextAreaElement).value;
                switch(true){
                    case key==="address":
                        resume.contact.address=value;
                        formGrp.style.order="1";
                    break;
                    case key==="name":
                        resume.contact.name=value;
                        formGrp.style.order="0";
                    break;
                    case key==="city":
                        resume.contact.city=value;
                        formGrp.style.order="2";
                    break;
                    case key==="PO":
                        resume.contact.PO=value;
                        formGrp.style.order="3";
                    break;
                    case key==="cell":
                        resume.contact.cell=value;
                        formGrp.style.order="4";
                    break;
                    case key==="email1":
                        resume.contact.email1=value;
                        formGrp.style.order="5";
                    break;
                    case key==="email2":
                        resume.contact.email2=value;
                        formGrp.style.order="6";
                    break;
                }
            };
            this.formResNames.push({cat:"contact",subCat:key,item:undefined,name:"contact-" + key,value:value as string});
        };
        return resume;
    };



    editWorkExper({parent,resume,css_col,css_row,less400,french}:{
        parent:HTMLElement,
        resume:resumeType,
        css_col:string,
        css_row:string,
        less400:boolean,
        french:boolean
    }):resumeType{
        const {workExperience}=resume;
        const mainWorkCont=document.createElement("div");
        mainWorkCont.id="main-work-cont";
        mainWorkCont.style.cssText=css_col +"margin-inline:auto;width:100%;margin-block:1.5rem;align-items:center;";
        parent.appendChild(mainWorkCont);
        resume.workExperience= workExperience.map((experience,index)=>{
            if(experience){
                
                experience={...experience,id:index+1};
                const workExpCont=document.createElement("div");
                workExpCont.className=styles.workExpCont;
                workExpCont.id="work-experience-cont";
                
                
                const name=document.createElement("h4");
                name.style.cssText="text-transform:uppercase;";
                name.textContent=french ? langConversion({key:"work experience"}):"work experience";
                workExpCont.appendChild(name);
                mainWorkCont.appendChild(workExpCont);
                this._addRemove.removeWorkExperience({
                    parent:workExpCont,
                    resume,
                    experience,
                    css_col,less400,
                    func:(resume)=>{
                        Resume.cleanUpById({parent,id:"main-work-cont"});
                        this.editWorkExper({parent,css_row,resume,css_col,less400,french});
                    }
                });
                
               
                for(const [key,value] of Object.entries(experience)){
                    const item=this.workOrgs.find(kv=>(kv.cat===key)) as orgType;
                    const inputType=["title","company","location"].includes(key);
                    
                    if(inputType && typeof(value)==="string" && item.cat===key){
                        experience= this.formComp.workParticulars({parent:workExpCont,order:0,key,value,experience,index,french});
                    }else if(key==="summary" && typeof(value)==="string"){
                        experience=this.formComp.summary({parent:workExpCont,order:1,key,value,experience,less400,french})
                    }else if((key==="from" || key==="to") && typeof(value)==="string"){
                        experience= this.formComp.fromToInputWorkComponent({parent:workExpCont,order:2,key,value,less400,index,experience,french});
                        
                    }else if(key==="achievements"){
                        experience=this.formComp.workAchievement({parent:workExpCont,order:3,css_col,css_row,experience,less400,french});
                    }else if(key==="skills"){
                        experience=this.formComp.workSkills({formChild:workExpCont,order:4,css_col,key,less400,experience,french});
                    }else if(!item){
                        this.workOrgs.map(kv=>{
                            const check=Object.keys(experience).includes(kv.cat);
                            if(kv && !check){
                                const {cat}=kv;
                                if(cat==="achievements"){
                                    experience=this.formComp.workAchievement({parent:workExpCont,order:5,css_col,css_row,experience,less400,french});
                                }else if(kv.cat==="skills"){
                                    experience=this.formComp.workSkills({formChild:workExpCont,order:6,css_col,key,less400,experience,french});

                                }
                            }
                        });
                    }
                  
                };
            };
            return experience
        });
        return resume;
    };



    editEducation({parent,resume,css_col,css_row,less400,french}:{
        parent:HTMLElement,
        resume:resumeType,
        css_col:string,
        css_row:string,
        less400:boolean,
        french:boolean
    }):resumeType{
        const {education}=resume;
        const mainEditCont=document.createElement("div");
        mainEditCont.id="main-edit-cont";
        mainEditCont.style.cssText=css_col + "width:100%;border-radius:8px;margin-block:1.5rem;";
        parent.appendChild(mainEditCont);
        resume.education=education.map((educate,index)=>{
            if(educate){
                educate={...educate,id:index+1};
                const educateCont=document.createElement("div");
                educateCont.className=styles.educateCont;
                educateCont.id="educate-cont";
                const name=document.createElement("h4");
                name.style.cssText="text-transform:uppercase;";
                name.textContent="education";
                educateCont.appendChild(name);
                mainEditCont.appendChild(educateCont);
                this._addRemove.removeEducation({
                    parent:educateCont,
                    resume,
                    education:educate,
                    css_col,less400,
                    func:(resume)=>{
                        Resume.cleanUpById({parent,id:"main-edit-cont"});
                        this.editEducation({parent,resume,css_row,css_col,less400,french});
                    }
                });
                for(const [key,value] of Object.entries(educate)){
                    const check=["achievements","skills","from","to"].includes(key);
                    if(!check && typeof(value)==="string"){
                       educate= this.formComp.educationParticulars({parent:educateCont,order:0,key,value,index,education:educate,less400,french});
                    }else if((key==="from" || key==="to") && typeof(value)==="string"){
                        educate=this.formComp.fromToInputEducateComponent({parent:educateCont,order:1,key,value,less400,index,education:educate,french})
                       
                    }else if(key==="achievements"){
                        educate=this.formComp.educateAchievement({parent:educateCont,order:2,css_col,css_row,education:educate,less400,french})
                     }else if(key==="skills"){
                       educate= this.formComp.educateSkills({parent:educateCont,order:3,css_col,key,less400,education:educate,french});
                    }
                };
            };
            return educate;
        });
        return resume;
    };



    editSites({parent,resume,css_col,less400}:{
        parent:HTMLElement,
        resume:resumeType,
        css_col:string,
        less400:boolean

    }):resumeType{
        const {sites}=resume;
        if(sites){
            const editSiteCont=document.createElement("div");
            editSiteCont.id="edit-site-cont";
            editSiteCont.className=styles.editSiteCont;
            const name=document.createElement("h4");
            name.style.cssText="text-transform:uppercase;";
            name.textContent="affiliated sites";
            editSiteCont.appendChild(name);
            parent.appendChild(editSiteCont);
            this.formComp.addRemove.addSite({
                parent:editSiteCont,
                css_col,
                resume,
                less400,
                func:(resume)=>{
                    Resume.cleanUpById({parent,id:"edit-site-cont"});
                    this.editSites({parent,resume,css_col,less400});
                }
            });
            resume.sites=sites.map((site,index)=>{
                if(site){
                    const {input,label,formGrp}=EditResume.inputComponent(editSiteCont);
                    formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;position:relative;";
                    formGrp.style.width=less400 ? "100%":"80%";
                    this.formComp.addRemove.removeSite({
                        target:formGrp,
                        css_col,
                        resume,
                        value:site,
                        less400,
                        func:(resume)=>{
                            Resume.cleanUpById({parent,id:"edit-site-cont"});
                            this.editSites({parent,resume,css_col,less400});
                        }
                    });
                    input.id=`site-${index}`;
                    input.name="site-" + String(index);
                    input.value=site;
                    input.style.width=less400 ? "75%":"50%";
                    label.setAttribute("for",input.id);
                    label.textContent="site";
                    this.formResNames.push({cat:"main",subCat:"sites",item:undefined,name:"site-" + String(index),value:site});
                    input.onchange=(e:Event)=>{
                        if(!e) return;
                        const value=(e.currentTarget as HTMLInputElement).value;
                        resume.sites[index]=value;
                    };
                }
                return site;
            });
        }
        return resume;
    };

    editLanguages({parent,resume,css_col,css_row,less400,french}:{parent:HTMLElement,resume:resumeType,css_col:string,less400:boolean,css_row:string,french:boolean}):resumeType{
        const languageCont=document.createElement("div");
        languageCont.id="language-cont";
        languageCont.style.cssText=css_col + "margin-inline:auto;padding-block:1rem;margin-block:1rem;position:relative;";
        languageCont.style.width=less400 ? "80%":"70%";
        parent.appendChild(languageCont);
        this.formComp.addRemove.addLanguage({
            parent:languageCont,
            resume,
            css_col,
            less400,
            french,
            func:(resume)=>{
                Resume.cleanUpById({parent,id:"language-cont"});
                this.editLanguages({parent,css_col,css_row,resume,less400,french});
            }
        });

        resume.extra.languages=resume.extra.languages.map((lang,index)=>{
            if(lang){
                const {input,label,formGrp}=EditResume.inputComponent(languageCont);
                formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;position:relative;";
                formGrp.style.width=less400 ? "100%":"80%";
                input.id=`language-${index}`;
                input.name="language-" + String(index);
                input.value=lang;
                input.style.width=less400 ? "75%":"50%";
                label.setAttribute("for",input.id);
                label.textContent="language";
                this.formComp.addRemove.removeLanguage({
                    target:formGrp,
                    resume,
                    lang,
                    index,
                    func:(resume)=>{
                        Resume.cleanUpById({parent,id:"language-cont"});
                        this.editLanguages({parent,css_col,css_row,resume,less400,french});
                    }
                });
                input.onchange=(e:Event)=>{
                    if(!e) return;
                    const value=(e.currentTarget as HTMLInputElement).value;
                    lang=value;
                };
            }
            return lang;
        });
        return resume;
    };


    deleteResume({grandParent,parent,nameResume,css_col,css_row,french}:{grandParent:HTMLElement,parent:HTMLElement,css_col:string,css_row:string,nameResume:nameResumeType,french:boolean}){
        const xDiv=document.createElement("div");
        parent.style.position="relative";
        xDiv.id="delete-resume";
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(40px, 30px);padding:2px;background-color:black;color:white;border-radius:50%";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"12px",color:"white",borderradius:"50%"}});
        parent.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(!e) return;
            this.deleteRequest({grandParent,parent,item:nameResume,css_col,css_row,french})
        };
    };

    deleteRequest({grandParent,parent,item,css_col,css_row,french}:{grandParent:HTMLElement,parent:HTMLElement,item:nameResumeType,css_col:string,css_row:string,french:boolean}){
        const lang=langConversion({key:"are you sure you want to delete this resume?"})
        const container=document.createElement("div");
        container.id="delete-resume-request";
        container.style.cssText=css_col + "margin-inline:auto;padding-inline:1rem;background-color:white;color:black;box-shadow:1px 1px 12px 1px black;border-radius:8px;margin-block:1rem;position:absolute;inset:0%;width:300px;height:150px;align-items:center;";
        const para=document.createElement("p");
        para.id="para";
        para.textContent=french ? lang :"are you sure you want to delete this resume?";
        container.appendChild(para);
        container.appendChild(para);
        grandParent.appendChild(container);
        const btnDiv=document.createElement("div");
        btnDiv.id="btnDiv";
        btnDiv.style.cssText=css_row + "margin-inline:auto;gap:1.5rem;margin-block:1rem;justify-content:space-around;";
        const cancel_=french ? langConversion({key:"cancel"}) : "cancel";
        const {button:cancel}=Resume.simpleButton({anchor:btnDiv,bg:"blue",color:"white",text:cancel_,time:400,type:"button"});
        const del=french ? langConversion({key:"delete"}) : "delete";
        const {button:delete_}=Resume.simpleButton({anchor:btnDiv,bg:"red",color:"white",text:del,time:400,type:"button"});
        container.appendChild(btnDiv);
        cancel.onclick=(e:MouseEvent)=>{
            if(!e) return;
            grandParent.removeChild(container);
        };
        delete_.onclick=(e:MouseEvent)=>{
            if(!e) return;
            this._service.deleteResume({item}).then(async(res)=>{
                if(res){
                    this.mainResumes=this.mainResumes.filter(kv=>(kv.id!==res.id));
                    const msg=french ? langConversion({key:"deleted"}) : "deleted";
                    Resume.message({parent,msg,type:"success",time:700});
                    this.cleanUp(grandParent);
                    this.getResumes({parent:grandParent,user:this._user,french});
                }
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

    cleanUp(grandParent:HTMLElement){
        while(grandParent.firstChild){
            if(grandParent.lastChild){
                grandParent.removeChild(grandParent.lastChild)
            }
        }
    }


   static emailComponent(form:HTMLElement,):{email:HTMLInputElement,label:HTMLLabelElement}{
        const rand=Math.round(Math.random()*100);
        const formGrp_email=document.createElement("div");
        formGrp_email.className="form-group";
        formGrp_email.style.cssText="margin-inline:auto;text-align:center;position:relative;padding-inline:1rem;display:flex; flex-direction:column; margin:auto;align-items:center;";
        const email_cont1=document.createElement("div");
        email_cont1.id="email_cont";
        email_cont1.style.cssText="position:absolute;inset:110% 0% -40% 0%;margin-inline:auto;";
        email_cont1.style.position="relative";
        const label=document.createElement("label");
        label.className="text-primary text-center";
        label.textContent="email";
        const email=document.createElement("input");
        email.name="email";
        email.id=`email-${rand}`;
        label.setAttribute("for",email.id);
        email.className="form-control";
        email.pattern="[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}";
        email.type="email";
        formGrp_email.appendChild(label);
        formGrp_email.appendChild(email);
        formGrp_email.appendChild(email_cont1);
        form.appendChild(formGrp_email)
        //--------message-----------------//
        const res_e1=document.createElement("small");
        res_e1.id="email_msg";
        res_e1.style.cssText="width:fit-content;padding:1rem;padding:4px;color:red;font-weight:bold;font-size:10px;";
        res_e1.textContent="";
        email_cont1.appendChild(res_e1);
        //--------message-----------------//
        email.addEventListener("input",(e:Event)=>{
            if(e){
                const email_=(e.currentTarget as HTMLInputElement).value;
                const Reg:RegExp=/[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}/g;
                if(!Reg.test(email_)){
                    res_e1.textContent=" Form=> MyMail@mail.com"
                }else{
                    const check=([...email_cont1.children] as Element[]).map(child=>(child.id)).includes("email_msg");
                    if(check){
                    email_cont1.removeChild(res_e1);
                    }
                }
            }
        });
        return {email,label}
    };


   static passwordComponent(form:HTMLElement):{password:HTMLInputElement,label:HTMLLabelElement}{
        const rand=Math.round(Math.random()*100);
        const formGrp_pass=document.createElement("div");
        formGrp_pass.className="form-group";
        const pass_cont=document.createElement("div");
        pass_cont.id="pass_cont";
        pass_cont.style.cssText="position:absolute;inset:110% 0% -40% 0%;margin-inline:auto;";
        pass_cont.style.position="relative";
        formGrp_pass.className="form-group";
        formGrp_pass.style.cssText="margin-inline:auto;text-align:center;position:relative;padding-inline:1rem;";
        const label=document.createElement("label");
        label.className="text-primary text-center";
        label.textContent="password";
        const pass=document.createElement("input");
        pass.id=`password-${rand}`;
        label.setAttribute("for",pass.id);
        pass.type="password";
        pass.name="password";
        pass.className="form-control";
        pass.pattern="[a-zA-Z0-9.!?%]{5,}";
        formGrp_pass.appendChild(label);
        formGrp_pass.appendChild(pass);
        formGrp_pass.appendChild(pass_cont);
        form.appendChild(formGrp_pass)
        //--------message-----------------//
        const res_p=document.createElement("small");
        res_p.id="pass_msg";
        res_p.style.cssText="width:fit-content;padding:1rem;padding:4px;color:red;font-weight:bold;font-size:10px;";
        res_p.textContent="";
        pass_cont.appendChild(res_p);
        //--------message-----------------//
        pass.addEventListener("input",(e:Event)=>{
            if(e){
                const pass_=(e.currentTarget as HTMLInputElement).value;
                const Reg:RegExp=/[a-zA-Z0-9^$!]{5,}/g;
                if(!Reg.test(pass_)){
                    res_p.textContent="12345..characters with/without $,#,!,,,"
                }else{
                    const check=([...pass_cont.children] as Element[]).map(child=>(child.id)).includes("pass_msg");
                    if(check){
                    pass_cont.removeChild(res_p);
                    }
                }
               
            }
        });
        return {password:pass,label:label};
    };


   static textareaComponent(form:HTMLElement):{textarea:HTMLTextAreaElement,label:HTMLLabelElement,formGrp:HTMLElement}{
        const rand=Math.round(Math.random()*100);
        const formGrp_textarea=document.createElement("div");
        formGrp_textarea.className="form-group";
        formGrp_textarea.style.cssText="margin-inline:auto;text-align:center;position:relative;padding-inline:1rem;display:flex; flex-direction:column; margin:auto;align-items:center;gap:1rem;";
        const label=document.createElement("label");
        label.className="text-primary text-center";
        label.textContent="Bio";
        const textarea=document.createElement("textarea");
        textarea.id=`textarea-${rand}`;
        textarea.placeholder="I am a developer who enjoys providing you with the best means of creating a great web-page and or a poster or advertising with the tools of exporting your work to suit your purpose. If you desire additional tools, then please don't hesitate on contacting us with your request."
        textarea.rows=4;
        textarea.style.cssText="width:100%;padding-inline:1.5rem;"
        label.setAttribute("for",textarea.id);
        textarea.className="form-control";
        formGrp_textarea.appendChild(label);
        formGrp_textarea.appendChild(textarea);
        form.appendChild(formGrp_textarea)
        return {textarea,label,formGrp:formGrp_textarea}
    };


   static inputComponent(form:HTMLElement):{input:HTMLInputElement,label:HTMLLabelElement,formGrp:HTMLElement}{
        const rand=Math.round(Math.random()*100);
        const formGrp_input=document.createElement("div");
        formGrp_input.className="form-group";
        formGrp_input.style.cssText="margin-inline:auto;text-align:center;position:relative;padding-inline:1rem;display:flex; flex-direction:column; margin:auto;align-items:center;";
        const label=document.createElement("label");
        label.className="text-primary text-center";
        label.textContent="Name";
        const input=document.createElement("input");
        input.id=`input-${rand}`;
        input.placeholder="your name"
        input.type="text";
        input.name="name";
        input.style.cssText="width:100%;padding-inline:1.5rem;"
        label.setAttribute("for",input.id);
        input.className="form-control";
        formGrp_input.appendChild(label);
        formGrp_input.appendChild(input);
        form.appendChild(formGrp_input)
        return {input,label,formGrp:formGrp_input}
    };



    
};
export default EditResume
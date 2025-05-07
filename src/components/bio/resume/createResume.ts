import Service from "@/components/common/services";
import EditResume from "./editResume";
import {  awardType, contactType, educationType, insertType, mainResumeRefType, mainResumeType, miscType, nameRefType, nameResumeType, resumeType, userType, workExperienceType } from "./refTypes";
import Resume from "./resume";
import styles from "./bio.module.css";
import ViewResume from "./viewResume";
import { FaCreate } from "../../common/ReactIcons";
import { FaCrosshairs} from "react-icons/fa";
import FormComponents from "./formComponents";
import { inserts, langAchievement, langContact, langConversion, langEducation, langExperience, langExtra, langInserts, langResume, langSummary } from "./engFre";


class CreateResume {
    public rowId:string;
    public readonly smile:string;
    private _mainResume:mainResumeType;
    private _mainResumeRef:mainResumeRefType;
    private _mainResumes:mainResumeType[];
    private _nameResumes:nameResumeType[];
    private _nameRefs:nameRefType[];
    private _mainResumeRefs:mainResumeRefType[];
    private _achievement:awardType;
    private _education:educationType;
    private _educations:educationType[];
    private _experience:workExperienceType;
    private _experiences:workExperienceType[];
    private _contact:contactType;
    private _extra:miscType;
    private _resume:resumeType;
    private _sites:string[];
    public inserts:insertType[];
    

    constructor(private _service:Service,private viewResume:ViewResume,public formComp:FormComponents,private _user:userType|null){
        this.rowId="";
        this._mainResumeRef={} as mainResumeRefType;
        this._mainResumes=[] as mainResumeType[];
        this._nameResumes=[] as nameResumeType[];
        this._nameRefs=[] as nameRefType[];
        this._mainResumeRefs=[] as mainResumeRefType[];
        this._experiences=[] as workExperienceType[];
        this._educations=[] as educationType[];
        this._sites=[] as string[];
        this.mainResumes=(this._user && this._user?.resumes as mainResumeType[])|| [] as mainResumeType[];
        this.mainResumeRefs=(this._user && this._user?.references as mainResumeRefType[])|| [] as mainResumeRefType[];

        this.smile="/images/emojiSmile.png";

        this.inserts=inserts;
       
       
        this._extra=langExtra({french:false});
        this._achievement=langAchievement({french:false});
        this._contact=langContact({french:false,user:this._user});
        this._experience=langExperience({french:false});
       
        this._education=langEducation({french:false});
        this._resume=langResume({french:false,user:this._user});
        this._mainResume={
            id:0,
            name:"",
            enable:false,
            user_id:this._user?.id || "" ,
            resume:this._resume,
            french:false
        };
        
    };

    //-----------------GETTER/SETTERS--------------------//
    get user(){
        return this._user
    }
    set user(user:userType|null){
        this._user=user;
    }
    get extra(){
        return this._extra;
    };
    set extra(extra:miscType){
        this._extra=extra;
    };
    get sites(){
        return this._sites;
    };
    set sites(sites:string[]){
        this._sites=sites;
    }
    get achievement(){
        return this._achievement;
    };
    get education(){
        return this._education;
    };
    set education(education:educationType){
        this._education=education;
    };
    get educations(){
        return this._educations;
    };
    set educations(educations:educationType[]){
        this._educations=educations;
    };
    set achievement(achievement:awardType){
        this._achievement=achievement
    };
    get experience(){
        return this._experience;
    };
    set experience(experience:workExperienceType){
        this._experience=experience;
    };
    get experiences(){
        return this._experiences;
    };
    set experiences(experiences:workExperienceType[]){
        this._experiences=experiences;
    };
    get contact(){
        return this._contact;
    };
    set contact (contact:contactType){
        this._contact=contact;
    };
    get resume(){
        return this._resume;
    };
    set resume(resume:resumeType){
        this._resume=resume;
    }
    get mainResume(){
        return this._mainResume;
    };
    set mainResume(mainResume:mainResumeType){
        this._mainResume=mainResume
    }
    get mainResumeRef(){
        return this._mainResumeRef;
    };
    set mainResumeRef(mainResumeRef:mainResumeRefType){
        this._mainResumeRef=mainResumeRef
    };
    get mainResumeRefs(){
        return this._mainResumeRefs;
    };
    set mainResumeRefs(mainResumeRefs:mainResumeRefType[]){
        this._mainResumeRefs=mainResumeRefs
    };
    get nameResumes(){
        return this._nameResumes;
    };
    set nameResumes(nameResumes:nameResumeType[]){
        this._nameResumes=nameResumes
    }
    get mainResumes(){
        return this._mainResumes;
    };
    set mainResumes(mainResumes:mainResumeType[]){
        this._mainResumes=mainResumes
    }
    get nameRefs(){
        return this._nameRefs;
    };
    set nameRefs(nameRefs:nameRefType[]){
        this._nameRefs=nameRefs
    };
    
    
    //-----------------GETTER/SETTERS--------------------//
    main({parent,innerParent,french,func}:{parent:HTMLElement,innerParent:HTMLElement,french:boolean,
        func:(mainResumes:mainResumeType[],mainResume:mainResumeType)=>Promise<void>|void
    }){
        let show:boolean=false;
        const lineWidth="40%"
        const less400=window.innerWidth < 400;
        const less900=window.innerWidth < 900;
        const css_col="display:flex;justify-content:center;align-items:center;flex-direction:column;margin-inline:auto;";
        const css_row="display:flex;justify-content:center;align-items:center;flex-wrap:wrap;margin-inline:auto;";
        const container=document.createElement("section");
        container.id="container-resumes-create";
        container.style.cssText=css_col + "width:100%";
        container.style.paddingInline=less900 ? (less400 ? "0.5rem":"0.75rem"):"1.75rem";
        innerParent.appendChild(container);

        const summaryCont=document.createElement("section");
        summaryCont.id="main-summary-cont";
        summaryCont.className=styles.summaryCont;
        container.appendChild(summaryCont);
        Resume.lineDivison({parent:summaryCont,width:lineWidth,background:"blue"});
        const btnLang= french ? "Ajouter un résumé" : "add summary";
        const {button:summaryBtn}=Resume.simpleButton({anchor:summaryCont,type:"button",bg:"black",color:"white",text:btnLang,time:400});

        const contactCont=document.createElement("section");
        contactCont.id="main-contact-cont";
        contactCont.className=styles.contactCont;
        container.appendChild(contactCont);
        Resume.lineDivison({parent:contactCont,width:lineWidth,background:"blue"});
        const btnLang1= french ? "adjouter contact":"add contact";
        const {button:contactBtn}=Resume.simpleButton({anchor:contactCont,type:"button",bg:"black",color:"white",text:btnLang1,time:400});

        const experienceCont=document.createElement("section");
        experienceCont.id="main-experience-cont";
        experienceCont.className=styles.experienceCont;
        container.appendChild(experienceCont);
        Resume.lineDivison({parent:experienceCont,width:lineWidth,background:"blue"});
        const btnLang2=french ? "Adjouter d'Exp d'Emplois":"add work Experience";
        const {button:workExpBtn}=Resume.simpleButton({anchor:experienceCont,type:"button",bg:"black",color:"white",text:btnLang2,time:400});

        const educationCont=document.createElement("section");
        educationCont.id="main-education-cont";
        educationCont.className=styles.educationCont;
        container.appendChild(educationCont);
        Resume.lineDivison({parent:educationCont,width:lineWidth,background:"blue"});
        const btnLang3=french ? "Adjouter d'Education":"Add Education";
        const {button:educateBtn}=Resume.simpleButton({anchor:educationCont,type:"button",bg:"black",color:"white",text:btnLang3,time:400});

        const extra=document.createElement("section");
        extra.id="main-extra-cont";
        extra.className=styles.educationCont;
        container.appendChild(extra);
        Resume.lineDivison({parent:extra,width:lineWidth,background:"blue"});
        const btnLang4=french ? "des Languages":"Languages";
        const {button:extraBtn}=Resume.simpleButton({anchor:extra,type:"button",bg:"black",color:"white",text:btnLang4,time:400});
        extraBtn.id="extra-btn";
        this.resume=french ? langResume({french,user:this.user}) : this.resume;
        const viewresumeCont=document.createElement("div");
        viewresumeCont.id="view-resume-cont";
        viewresumeCont.style.cssText=css_col;
        viewresumeCont.style.width=less400 ? "100%":"80%";
        container.appendChild(viewresumeCont);
        Resume.lineDivison({parent:viewresumeCont,width:lineWidth,background:"#a60859"});
        const btnLang5=french ? "Voir Resume":"View Resumes";
        const {button:viewresBtn}=Resume.simpleButton({anchor:viewresumeCont,type:"button",bg:"#064756",color:"white",text:btnLang5,time:400});
        Resume.lineDivison({parent:viewresumeCont,width:lineWidth,background:"#a60859"});
        contactBtn.onclick=(e:MouseEvent)=>{
            if(!e) return;
            if(!show){
                show=!show;
                contactBtn.textContent=french ? "cache":"hide";
                this.resume=this.createContact({parent:contactCont,resume:this.resume,css_col,less400,show:true,french});
            }else{
                show=!show;
                contactBtn.textContent=french ? "adjouter Contact":"Add Contact";
                this.resume=this.createContact({parent:contactCont,resume:this.resume,css_col,less400,show:false,french});
            }
        };
        summaryBtn.onclick=(e:MouseEvent)=>{
            if(!e) return;
            if(!show){
                show=!show;
                summaryBtn.textContent=french ? "cache":"hide";
                this.resume=this.createSummary({parent:summaryCont,resume:this.resume,css_col,less400,show:true,french});
            }else{
                show=!show;
                summaryBtn.textContent=french ? "adjouter Resume":"Add Summary";
                this.resume=this.createSummary({parent:summaryCont,resume:this.resume,css_col,less400,show:false,french});
            }
        };
        workExpBtn.onclick=(e:MouseEvent)=>{
            if(!e) return;
            if(!show){
                show=!show;
                workExpBtn.textContent=french ? "cache":"hide";
                this.resume=this.createWorkExper({parent:experienceCont,resume:this.resume,css_col,css_row,less400,show:true,french});
            }else{
                show=!show;
                workExpBtn.textContent=french ? "adjouter d'experience":"Add Experience";
                this.resume=this.createWorkExper({parent:experienceCont,resume:this.resume,css_col,css_row,less400,show:false,french});
            }
        };
        educateBtn.onclick=(e:MouseEvent)=>{
            if(!e) return;
            if(!show){
                show=!show;
                educateBtn.textContent=french ? "cache":"hide";
                this.resume=this.createEducation({parent:educationCont,resume:this.resume,css_col,css_row,less400,order:0,show:true,french});
            }else{
                show=!show;
                educateBtn.textContent=french ? "adjouter d'Education":"Add Education";
                this.resume=this.createEducation({parent:educationCont,resume:this.resume,css_col,css_row,less400,order:0,show:false,french});
            }
        };
        extraBtn.onclick=(e:MouseEvent)=>{
            if(!e) return;
            if(!show){
                show=!show;
                extraBtn.textContent=french ? "cacher":"hide";
                this.resume=this.formComp.createExtra({parent:extra,resume:this.resume,css_col,css_row,less400,order:1,show:true,french});
            }else{
                show=!show;
                extraBtn.textContent="languages";
                this.resume=this.formComp.createExtra({parent:extra,resume:this.resume,css_col,css_row,less400,order:1,show:false,french});
            }
        };
        viewresBtn.onclick=(e:MouseEvent)=>{
            if(!e) return;
            this.popupViewResume({parent,container,innerParent,css_col,less400,french,func});
           
        };
    };


    popupViewResume({parent,container,innerParent,css_col,less400,french,func}:{parent:HTMLElement,container:HTMLElement,innerParent:HTMLElement,css_col:string,less400:boolean,french:boolean,
        func:(mainResumes:mainResumeType[],mainResume:mainResumeType)=>Promise<void>|void
    }){
        const popup=document.createElement("div");
        popup.id="popup-view-resume";
        popup.className=styles.popupViewResume;
        container.style.position="relative";
        container.appendChild(popup);
        CreateResume.openPopup({target:popup,time:1500})
        this.viewResume.resume({parent:popup,mainResume:this.mainResume,showPrint:false,closeDelete:true,french,
            func1:()=>{}
        });
        
        const {button}=Resume.simpleButton({anchor:popup,type:"button",bg:"#0827be",color:"white",text:"save",time:400});
        button.style.justifySelf="center";
        button.style.alignSelf="center";
        button.style.marginBlock="2rem";
        CreateResume.removePopup({parent:container,target:popup});
        button.onclick=async(e:MouseEvent)=>{
            if(!e) return;
            await  this.saveNewResume({parent,innerParent,container,css_col,resume:this.resume,less400,french,func})
        };
    }


     async saveNewResume({parent,innerParent,container,resume,css_col,less400,french,func}:{parent:HTMLElement,innerParent:HTMLElement,container:HTMLElement,resume:resumeType,css_col:string,less400:boolean,french:boolean,
        func:(mainResumes:mainResumeType[],mainResume:mainResumeType)=>Promise<void>|void;
     }){
        //create popup asking user to input a resume name after closing the popup,then show the final resume
        const msgPopup=document.createElement("div");
        msgPopup.id="name-enter-popup";
        msgPopup.className=styles.saveNewResume;
        msgPopup.style.width=less400 ? "100%" : "30%";
        //---------------------HEADER------------------------------------//

        const img=document.createElement("img");
        img.id="image";
        img.style.cssText="shape-outside:circle(50%);margin-right:1rem;width:75px;aspect-ratio:1 /1;filter:drop-shadow(0 0 0.5rem black);float:left;border:none"
        img.src=this.smile;
        img.alt="www.ablogroom.com";
        const para=document.createElement("p");
        para.id="name-popup";
        para.style.cssText="margin-inline:auto;padding-inline:1rem;margin-bottom:2rem;";
        para.appendChild(img);
        const text=new Text(" please enter a secure and unique file name.")
        para.appendChild(text);
        Resume.lineDivisonStyle({parent:para,width:"50%",cssStyle:{backgroundColor:"lightblue",marginTop:"3rem"}});
        msgPopup.appendChild(para);

        //---------------------HEADER------------------------------------//
        const form=document.createElement("form");
        form.style.cssText=css_col + "width:100%;margin-inline:auto;gap:1rem;";
        msgPopup.appendChild(form);
        const {input,label,formGrp}=EditResume.inputComponent(form);
        const langFile=langConversion({key:"file name"});
        formGrp.style.cssText=css_col + "margin:auto;width:75%;position:relative;gap:1rem;"
        input.id="name";
        input.name="name";
        input.style.width="auto";
        input.placeholder=french && langFile ? langFile :  "file name";
        label.textContent="file name";
        label.setAttribute("for",input.id);
         //FRENCH OR ENGLISH
         const {input:inputIsFr,label:labelIsFr,formGrp:grpIsFr}=EditResume.inputComponent(form);
         grpIsFr.className=styles.form;
         grpIsFr.classList.remove("form-group");
         formGrp.classList.add("form-group");
         inputIsFr.id="isFr";
         inputIsFr.classList.remove("form-control");
         inputIsFr.name="isFr";
         inputIsFr.type="checkbox";
         labelIsFr.setAttribute("for",inputIsFr.id);
         labelIsFr.textContent="French / Français ?";
         (inputIsFr).value="false";
         //FRENCH OR ENGLISH
        const {button}=Resume.simpleButton({anchor:form,text:"submit",bg:"black",color:"white",type:"submit",time:400});
        button.disabled=true;
        input.onchange=(e:Event)=>{
            if(!e) return;
            button.disabled=false;
        };
        CreateResume.closePopup({parent:innerParent,target:container,time:1500});
        innerParent.appendChild(msgPopup);
        CreateResume.openPopup({target:msgPopup,time:1200});
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e && this.user){
                e.preventDefault();
                const time=800;
                const rand=Math.floor(Math.random()*100);
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const name=formdata.get("name") as string;
                const isFr=Boolean(formdata.get("isFr") as string);
                const newName=`${name.split(" ").join("_").trim()}-${rand}`;
                resume={...resume,name:newName};
                const mainResume:mainResumeType={id:0,name:newName,enable:false,french:isFr,user_id:this.user.id,resume};
                await this._service.saveResume({mainResume}).then(async(res)=>{
                    if(res){
                        const success=langConversion({key:"success"});
                    this.mainResume=res;
                    const {id,name,user_id,enable,french}=this.mainResume;
                    const msg=french ? success: "success;" ;
                    Resume.message({parent,msg,type:"success",time});
                    setTimeout(()=>{
                        Resume.cleanUpById({parent:innerParent,id:msgPopup.id});
                    },time-50);
                    this.mainResumes=[...this.mainResumes,res];
                    this.nameResumes=[...this.nameResumes,{id:id as number,enable,user_id,name:name,french}];
                    //CLOSING ALL IN CREATE RESUME EXCEPT "container-row";
            
                    func(this.mainResumes,res);
                        Resume.message({parent,msg:"saved",type:"success",time:800});
                    }else{
                        Resume.message({parent,msg:"not saved",type:"error",time:time*2});
                    }
                });
               
                
            }
        };
    };



    createSummary({parent,resume,css_col,less400,show,french}:{
            parent:HTMLElement,
            resume:resumeType,
            css_col:string,
            less400:boolean,
            show:boolean,
            french:boolean
        }):resumeType{
            resume=french ? langResume({french,user:this.user}):resume;
            const check=([...parent.children] as HTMLElement[]).map(child=>child.id).includes("summary-cont");
            if(!check){
                const {summary}=resume;
                const summary_=french ? langSummary({french}) :summary;
                const summaryCont=document.createElement("div");
                parent.style.width="100%";
                summaryCont.id="summary-cont";
                summaryCont.style.cssText=css_col + "border:1px solid purple;box-shadow:1px 1px 12px 1px purple;border-radius:8px;padding-block:1.5rem;margin-block:1.5rem;";
                summaryCont.style.width=less400 ? "100%":"80%";
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
                summInput.value=summary_;
                summInput.style.width="auto";
                label.setAttribute("for",summInput.id);
                label.textContent=french ? "résumé":"summary";
                summInput.rows=6;
                summInput.onchange=(e:Event)=>{
                    if(!e) return;
                    const value=(e.currentTarget as HTMLTextAreaElement).value;
                    resume.summary=value;
                };
                CreateResume.hideShow({target:summaryCont,show,time:1100});
            }else{
                const getele=parent.querySelector("div#summary-cont") as HTMLElement;
                CreateResume.hideShow({target:getele,show,time:1100});
            };


            
            return resume;
    };



    createLanguage({parent,resume,css_col,less400,show}:{parent:HTMLElement,resume:resumeType,css_col:string,less400:boolean,show:boolean}){
        const check=([...parent.children] as HTMLElement[]).map(child=>(child.id)).includes("language-cont");
        if(!check){
            const langCont=document.createElement("div");
            langCont.id="language-cont";
            langCont.style.cssText=css_col;
            langCont.style.width=less400 ? "75%":"60%";
            parent.appendChild(langCont);
            resume.extra.languages=resume.extra.languages.map((word,index)=>{
                const {input,label,formGrp}=EditResume.inputComponent(langCont);
                formGrp.id="create-language";
                formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;";
                formGrp.style.width=less400 ? "100%":"80%";
                input.style.width=less400 ? "75%":"50%";
                input.id=`lang-${index}`;
                input.name=`lang-${index}`;
                input.value=word;
                label.setAttribute("for",input.id);
                label.textContent=`language-${index}`;
                input.onchange=(e:Event)=>{
                    if(!e) return;
                    const value=(e.currentTarget as HTMLTextAreaElement).value;
                    word=value;
                };
                
                return word;
            });
            this.extra.languages=resume.extra.languages;
            CreateResume.hideShow({target:langCont,show,time:1100});

        }else{
            const getEle=parent.querySelector("div#language-cont") as HTMLElement;
            CreateResume.hideShow({target:getEle,show,time:1100});
        }
        return resume;
    };


    createContact({parent,resume,css_col,less400,show,french}:{
        parent:HTMLElement,
        resume:resumeType,
        css_col:string,
        less400:boolean,
        show:boolean,
        french:boolean
    }):resumeType{
        const check=([...parent.children] as HTMLElement[]).map(child=>child.id).includes("contact-cont");
        if(!check){
            const contactCont=document.createElement("div");
            contactCont.id="contact-cont";
            contactCont.style.cssText=css_col + "background-color:#ffa50066;border:1px solid orange;box-shadow:1px 1px 12px 1px orange;border-radius:8px;padding-block:1.5rem;margin-block:1.5rem;";
            contactCont.style.width=less400 ? "100%":"80%";
            const name=document.createElement("h4");
            name.style.cssText="text-transform:uppercase;";
            name.textContent="contact";
            contactCont.appendChild(name);
            parent.appendChild(contactCont);
            const {contact}=resume;
           
            for(const [key,value]of Object.entries(contact)){
                if(key!=="id"){

                    const lang=langConversion({key})
                   const insert_=this.inserts.find(kv=>(kv.key===key)) as insertType;
                    const {input,label,formGrp}=EditResume.inputComponent(contactCont);
                    const check=["address","city"].includes(key);
                    if(check){
                        formGrp.style.cssText=css_col +"width:100%;gap:1rem;position:relative;align-items:center;";
                    }else{
                        formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;";
                        
                    }
                    formGrp.style.width=less400 ? "100%":"80%";
                    input.id=`${key}`;
                    input.name="contact-" + key;
                    input.value=value;
                    input.type=insert_ && insert_.type ? insert_.type :"text";
                    input.placeholder=french ? langConversion({key}): key;
                    input.style.width=less400 ? "75%":"50%";
                    label.setAttribute("for",input.id);
                    label.textContent= french && lang ? lang : key;
                    
                    input.onchange=(e:Event)=>{
                        if(!e) return;
                        const value=(e.currentTarget as HTMLTextAreaElement).value;
                        switch(true){
                            case key==="address":
                                resume.contact.address=value;
                            break;
                            case key==="name":
                                resume.contact.name=value;
                            break;
                            case key==="city":
                                resume.contact.city=value;
                            break;
                            case key==="PO":
                                resume.contact.PO=value;
                            break;
                            case key==="cell":
                                resume.contact.cell=value;
                            break;
                            case key==="email1":
                                resume.contact.email1=value;
                            break;
                            case key==="email2":
                                resume.contact.email2=value;
                            break;
                        }
                    };
                }
                
            };

            CreateResume.hideShow({target:contactCont,show,time:1100});

        }else{
            const getContact=parent.querySelector("div#contact-cont") as HTMLElement;
            CreateResume.hideShow({target:getContact,show,time:1100});
        }
        
        this.contact=resume.contact
        return resume;
    };


    createWorkExper({parent,resume,css_col,css_row,less400,show,french}:{
        parent:HTMLElement,
        resume:resumeType,
        css_col:string,
        css_row:string,
        less400:boolean,
        show:boolean,
        french:boolean
    }):resumeType{
        const check=([...parent.children] as HTMLElement[]).map(child=>(child.id)).includes("work-experience-cont");
        if(!check){
            Resume.cleanUpById({parent,id:"work-experience-cont"});
            const workExpCont=document.createElement("div");
            workExpCont.id="work-experience-cont";
            workExpCont.style.cssText=css_col +"width:100%;border:1px solid green;box-shadow:1px 1px 12px 1px green;border-radius:8px;padding-block:1.5rem;margin-block:1.5rem;position:relative;gap:1.5rem;";
            workExpCont.style.width=less400 ? " 100%":"80%";
            const name=document.createElement("h4");
            name.style.cssText="text-transform:uppercase;";
            name.textContent=french ? "expérience de travail":"work experience";
            workExpCont.appendChild(name);
            parent.appendChild(workExpCont);
            const {workExperience}=resume;
            this.formComp.addRemove.addWorkExperience({
                parent:workExpCont,
                resume,
                css_col,
                less400,
                french,
                func:(resume)=>{
                    Resume.cleanUpById({parent,id:"work-experience-cont"});
                    this.createWorkExper({parent,resume,css_col,css_row,less400,show,french});
                    }
            });
            resume.workExperience= workExperience.map((experience,index)=>{
                if(experience){
                    const expDoc=document.createElement("div");
                    expDoc.id=`experience-${index}`;
                    expDoc.style.cssText=css_col + "width:100%;gap:1rem;position:relative;border:1px solid blue;border-radius:8px;margin-inline:auto;padding-block:1.25rem;margin-block:1.25rem;box-shadow:1px 1px 4px 1px lightblue;";
                    workExpCont.appendChild(expDoc);
                    this.formComp.addRemove.removeWorkExperience({
                        parent:expDoc,
                        resume,
                        css_col,
                        less400,
                        experience,
                        func:(resume)=>{
                            Resume.cleanUpById({parent,id:"work-experience-cont"});
                            this.createWorkExper({parent,resume,css_col,css_row,less400,show:true,french})
                        }
                    });
                    for(const [key,value] of Object.entries(experience)){
                        const inputType=["title","company","location"].includes(key);
                        if(key !=="id"){

                            if(inputType){
                               experience= this.companyParticulars({formChild:expDoc,order:0,value:value as string,key,less400,css_col,experience,index,french});
                            }else if(key==="summary"){
                                experience=this.createWorkSummary({formChild:expDoc,order:1,less400,css_col,experience,value:value as string,index,french});
                            }else if(key==="from" || key==="to" && typeof(value)==="string"){
                               experience=this.createFromTo({parent:expDoc,order:2,key,value:value as string,experience,css_row,css_col,less400,index,french});
                                
                            }else if(key==="achievements"){
                                experience= this.createWorkAchievement({parent:expDoc,order:3,experience,css_col,css_row,less400,french});
                             }else if(key==="skills"){
                                experience=this.formComp.workSkills({formChild:expDoc,order:4,experience,css_col,key,less400,french});
                            };
                        };
                    }
                };
                this.experience=experience;
                return experience
            });
            CreateResume.hideShow({target:workExpCont,show,time:1100});
           
        }else{
            const getExperience=parent.querySelector("div#work-experience-cont") as HTMLElement;
            CreateResume.hideShow({target:getExperience,show,time:1100});
            
        }
        this.experiences=resume.workExperience;
        return resume;
    };


    createEducation({parent,resume,css_col,css_row,order,less400,show,french}:{
        parent:HTMLElement,
        resume:resumeType,
        css_col:string,
        less400:boolean,
        css_row:string,
        show:boolean,
        order:number,
        french:boolean
    }):resumeType{
        let educateCont=parent.querySelector("div#educate-cont") as HTMLElement|null;
        if(!educateCont){
            Resume.cleanUpById({parent,id:"educate-cont"});
            educateCont=document.createElement("div") as HTMLElement;
            educateCont.id="educate-cont";
            educateCont.style.cssText=css_col + "border-radius:8px;border:1px solid red;box-shadow:1px 1px 12px 1px red;padding-block:1.5rem;margin-block:1.5rem;position:relative;mrgin-block:1.5rem;padding-block:1.25rem;gap:2rem;";
            educateCont.style.width=less400 ? "100%":"80%";
            educateCont.style.order=String(order);
            const name=document.createElement("h4");
            name.style.cssText="text-transform:uppercase;";
            name.textContent="education";
            educateCont.appendChild(name);
            parent.appendChild(educateCont);
            this.formComp.addRemove.addEducation({
                parent:educateCont,
                resume,
                french,
                css_col,
                less400,
                func:(resume)=>{
                    Resume.cleanUpById({parent,id:"educate-cont"});
                    this.createEducation({parent,resume,css_col,css_row,less400,order,show,french});
                }
            });
            const {education}=resume;
            resume.education=education.map((educate,index)=>{
                if(educate){
                    
                    const educCont=document.createElement("div");
                    educCont.id=`educate-cont-${index}`;
                    educCont.style.cssText=css_col + "width:100%;gap:1rem;border:1px solid lime;margin-inline:auto;position:relative;";
                    (educateCont as HTMLElement).appendChild(educCont);
                    this.formComp.addRemove.removeEducation({
                        parent:educCont,
                        resume,
                        css_col,
                        less400,
                        education:educate,
                        func:(resume)=>{
                            Resume.cleanUpById({parent,id:"educate-cont"});
                            this.createEducation({parent,resume,css_col,css_row,less400,order,show:true,french})
                        }
                    });
                    for(const [key,value] of Object.entries(educate)){
                       
                        const check=["achievements","skills","from","to"].includes(key);
                        if(key!=="id"){
                            if(!check){
                                educate=this.schoolParticular({parent:educCont,order:0,education:educate,less400,css_col,value:value as string,key,index,french})
                            }else if(key==="from" || key==="to"){
                               educate=this.schoolToFrom({parent:educCont,order:1,css_col,css_row,less400,education:educate,value:value as string,key,index,french});
                            }else if(key==="skills"){
                                educate=this.schoolSkills({formChild:educCont,order:2,css_col,css_row,key,less400,education:educate,french})
                            }else if(key==="achievements"){
                                educate=this.schoolAchievements({parent:educCont,order:3,css_col,css_row,less400,education:educate,french})
                            }
                        }
                    };
                };
                this.education=educate;
                return educate;
            });
            this.educations=resume.education;
            CreateResume.hideShow({target:educateCont,show,time:1100});
          
        }else{
           
            CreateResume.hideShow({target:educateCont,show,time:1100});
           
        }
        return resume;
    };



    companyParticulars({formChild,order,value,key,less400,css_col,experience,index,french}:{formChild:HTMLElement,order:number,value:string,key:string,less400:boolean,css_col:string,experience:workExperienceType,index:number,french:boolean}):workExperienceType{
        const translate=[{eng:"title",fr:"titre"},{eng:"company",fr:"companie"},{eng:"location",fr:"location"}].find(kv=>(kv.eng===key)) as {eng:string,fr:string};
        const insert=this.inserts.find(kv=>(kv.key===key)) as insertType;
        let particularComp=formChild.querySelector("div#co-particular-cont") as HTMLElement|null;
        if(!particularComp){
            particularComp=document.createElement("div");
            particularComp.id="co-particular-cont";
            particularComp.style.cssText=css_col + "margin-inline:auto;justify-self:center;align-self:center;border:1px solid lightgrey;border-radius:8px;padding-block:1.5rem;";
            particularComp.style.width=less400 ? "100%":"70%";
            particularComp.style.paddingInline=less400 ? "0.5rem":"1.5rem";
            particularComp.style.order=String(order);
            formChild.appendChild(particularComp);
        };
        
        const {input,label,formGrp}=EditResume.inputComponent(particularComp);
        formGrp.className=styles.formGrpNormal
        formGrp.style.alignItems="center";
        if(key==="title")  formGrp.style.order="0";
        if(key==="company")  formGrp.style.order="1";
        if(key==="location")  formGrp.style.order="2";
        input.id=`${key}`;
        input.type=insert.type;
        input.placeholder=french ? translate.fr:key;
        input.name="work-"+ key + "-" + String(index);
        input.value=value as string;
        input.style.width=less400 ? "75%":"50%";
        label.setAttribute("for",input.id);
        label.textContent=french ? translate.fr:key;
        input.onchange=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLInputElement).value;
            switch(true){
                case key==="title":
                    experience.title=value;
                break;
                case key==="company":
                    experience.company=value;
                break;
                case key==="location":
                    experience.location=value;
                break;
            }
        };
        return experience;
    };




    createWorkSummary({formChild,order,experience,less400,css_col,value,index,french}:{formChild:HTMLElement,order:number,experience:workExperienceType,less400:boolean,css_col:string,value:string,index:number,french:boolean}):workExperienceType{
        const {textarea:summInput,label,formGrp}=EditResume.textareaComponent(formChild);
        formGrp.style.cssText=css_col +"width:100%;gap:1rem;position:relative;align-items:stretch;margin-inline:auto;";
        formGrp.style.width=less400 ? "100%":"80%";
        formGrp.style.order=String(order);
        summInput.id="summary";
        summInput.name="work-summary-" + String(index);
        summInput.placeholder=langInserts({french,key:"summary"}).place;
        summInput.value=value as string;
        label.setAttribute("for",summInput.id);
        label.textContent=french ? "résumé":"summary";
        summInput.rows=6;
        summInput.style.width="auto";
        summInput.onchange=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLInputElement).value;
            experience.summary=value
        };
        return experience
    };



    createFromTo({parent,order,key,value,experience,css_row,css_col,less400,index,french}:{parent:HTMLElement,order:number,key:string,value:string,experience:workExperienceType,css_row:string,css_col:string,less400:boolean,index:number,french:boolean}):workExperienceType{
       
        let fromToCont=parent.querySelector("div#from-to-cont-1") as HTMLElement|null;
        if(!fromToCont){
            fromToCont=document.createElement("div");
            fromToCont.id="from-to-cont-1";
            fromToCont.style.cssText=css_row + "gap:1rem;width:90%;flex-wrap:nowrap;";
            fromToCont.style.flexDirection=less400 ? "column":"row";
            fromToCont.style.flexWrap=less400 ? "wrap":"nowrap";
            fromToCont.style.order=String(order);
            fromToCont.style.order="3";
            parent.appendChild(fromToCont);
            
        };
       
        const count=[...fromToCont.children].length;
        if(count <=1){

            const {input,label,formGrp}=EditResume.inputComponent(fromToCont);
            formGrp.style.cssText=css_col +"width:50%;gap:1rem;flex:1 0 50%;position:relative;align-items:center;";
            formGrp.id=`from-to-cont-child-${count}`
            formGrp.style.flex=less400 ? " 1 0 100%":"1 0 50%";
            formGrp.style.width=less400 ? "100%":"50%";
            if(key==="from")  formGrp.style.order="0";
            else  formGrp.style.order="1";
            input.id=`${key}`;
            input.type="number";
            input.name="work-"+ key + "-" + String(index);
            input.style.width=less400 ? "75%":"50%";
            input.min="1950";
            input.max="3000";
            input.value=value as string;
            input.placeholder="";
            label.setAttribute("for",input.id);
            label.textContent=key;
            input.onchange=(e:Event)=>{
                if(!e) return;
                const value=(e.currentTarget as HTMLInputElement).value;
                if(key==="from"){
                    experience.from=value;
                }else{
                    experience.to=value;
                }
            };
        };
        return experience;
    };


    createWorkAchievement({parent,order,experience,css_col,css_row,less400,french}:{parent:HTMLElement,order:number,experience:workExperienceType,css_col:string,css_row:string,less400:boolean,french:boolean}):workExperienceType{
        const mainCont=document.createElement("div");
        mainCont.id="main-achieve-cont";
        mainCont.style.cssText=css_col + "margin-inline:auto;justify-self:center;margin-block:1.5rem;position:relative;";
        mainCont.style.width=less400 ? "100%":"75%";
        mainCont.style.order=String(order);
        parent.appendChild(mainCont);
        experience=this.formComp.addRemove.addWorkAchiev({
            parent:mainCont,
            experience,
            less400,
            french,
            css_col,
            func:(experience)=>{
                Resume.cleanUpById({parent,id:"main-achieve-cont"});
                this.createWorkAchievement({parent,order,experience,css_col,css_row,less400,french});
            }
        });
        experience.achievements=experience.achievements.map((achiev,index)=>{
            if(achiev){
                const achievCont=document.createElement("div");
                achievCont.id=`achieve-cont-${index}`;
                achievCont.style.cssText=css_col + `order:${index+1};width:100%;margin-block:1rem;position:relative;`;
                mainCont.appendChild(achievCont);
                this.formComp.addRemove.removeWorkAchiev({
                    target:achievCont,
                    experience,
                    achiev,
                    less400,
                    css_row,
                    func:(experience)=>{
                        Resume.cleanUpById({parent,id:"main-achieve-cont"});
                        this.createWorkAchievement({parent,order,experience,css_col,css_row,less400,french});
                    }
                });
                for(const [key,value] of Object.entries(achiev)){
                    if(key !=="id"){

                        const check=["achievement","reason"].includes(key);
                        if(check){
                            const lang=[{eng:"achievement",fr:"réalisation"},{eng:"reason",fr:"raison"}].find(kv=>(kv.eng===key)) as {eng:string,fr:string};
                            const {textarea:achievInput,label,formGrp}=EditResume.textareaComponent(achievCont);
                            formGrp.style.cssText=css_col +"width:100%;gap:1rem;position:relative;align-items:stretch;margin-inline:auto;";
                            formGrp.style.width="100%";
                            formGrp.style.width=less400 ? "100%":"80%";
                            achievInput.id="summary";
                            achievInput.name="work-"+ key + "-" + String(index);
                            achievInput.value=value as string;
                            achievInput.placeholder=langInserts({french,key}).place;
                            achievInput.style.width="auto";
                            label.setAttribute("for",achievInput.id);
                            label.textContent= french ? lang.fr:key;
                            achievInput.rows=3;
                            if(key==="achievement"){
                                formGrp.style.order="0";
                            }else{
                                formGrp.style.order="1";
                            }
                            achievInput.onchange=(e:Event)=>{
                                if(!e) return;
                                const value=(e.currentTarget as HTMLInputElement).value;
                                achiev.achievement=value;
                            };
                        }else{
                            const {input,label,formGrp}=EditResume.inputComponent(achievCont);
                            formGrp.style.cssText=css_col +"width:50%;gap:1rem;flex:1 0 50%;position:relative;align-items:center;";
                            formGrp.style.width=less400 ? "100%":"80%";
                            input.id=`${key}`;
                            input.type="text";
                            input.placeholder=langInserts({french,key}).place;
                            input.name="work-"+ key + "-" + String(index);
                            input.value=value as string;
                            input.style.width=less400 ? "75%":"50%";
                            label.setAttribute("for",input.id);
                            label.textContent=key;
                            formGrp.style.order="2";
                            input.onchange=(e:Event)=>{
                                if(!e) return;
                                const value=(e.currentTarget as HTMLInputElement).value;
                                achiev.composite=value;
                            };
                        }
                    }
                }
            }
            return achiev;
        });
        return experience;
    };

    


    schoolParticular({parent,css_col,less400,education,value,key,order,index,french}:{parent:HTMLElement,css_col:string,less400:boolean,key:string,value:string,education:educationType,order:number,index:number,french:boolean}):educationType{

        const schoolPartCont=document.createElement("div");
        schoolPartCont.id="school-part-cont";
        schoolPartCont.style.cssText=css_col + "margin-inline:auto;color:black;font-weight:bold;border-radius:8px;border:1px solid lime;align-items:stretch;";
        schoolPartCont.style.paddingInline=less400 ? "0.25rem":"1rem";
        schoolPartCont.style.width = less400 ? "100%" :"50%";
        schoolPartCont.style.order=String(order);
        parent.appendChild(schoolPartCont);

        const {input,label,formGrp}=EditResume.inputComponent(schoolPartCont);
        
        formGrp.style.cssText=css_col +"width:100%;gap:1rem;position:relative;align-items:center;";
        formGrp.style.width=less400 ? "100%":"80%";
        input.id=`${key}`;
        input.name="education-" + key + "-" + String(index);
        input.value=value as string;
        input.placeholder=langInserts({french,key}).place;
        input.type=langInserts({french,key}).type;
        input.style.width="100%";
        label.setAttribute("for",input.id);
        label.textContent=french ? langConversion({key}):key;
        input.onchange=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLInputElement).value;
            switch(true){
                case key==="school":
                    education.school=value
                    formGrp.style.order="0";
                break;
                case key==="location":
                    education.location=value;
                    formGrp.style.order="1";
                break;
                case key==="level":
                    education.level=value;
                    formGrp.style.order="2";
                break;
                case key==="degree":
                    education.degree=value;
                    formGrp.style.order="3";
                break;
                case key==="relevantWork":
                    education.relevantWork=value;
                    formGrp.style.order="4";
                break;
                case key==="extracurricular":
                    education.extracurricular=value;
                    formGrp.style.order="5";
                break;
                default:
                    break;
            }
        };
        return education;
    };


    schoolToFrom({parent,css_col,css_row,less400,education,value,key,order,index,french}:{parent:HTMLElement,css_col:string,css_row:string,less400:boolean,key:string,order:number,value:string,education:educationType,index:number,french:boolean}):educationType{
        let getDiv=parent.querySelector("div#from-to-cont-2") as HTMLElement;
        
        if(!getDiv){
            getDiv=document.createElement("div");
            getDiv.id="from-to-cont-2";
            getDiv.style.cssText=css_row + "gap:1rem;width:90%;position:relative;";
            getDiv.style.flexDirection=less400 ? "column":"row";
            getDiv.style.flexWrap=less400 ? "wrap":"nowrap";
            getDiv.style.order=String(order);
            parent.appendChild(getDiv);
        };
        const {input,label,formGrp}=EditResume.inputComponent(getDiv);
        formGrp.style.cssText=css_col +"width:auto;gap:0.5rem;position:relative;align-items:center;";
        formGrp.style.width=less400 ? "100%":"50%";
        formGrp.style.flex=less400 ? "1 0 100%":"1 0 50%";
        
        input.id=`${key}`;
        input.type="number";
        input.name="education-" + key + String(index);
        input.value=value as string;
        input.style.width=less400 ? "75%":"50%";
        input.type="number";
        input.min="1990";
        input.max="3000";
        input.placeholder=french ? langConversion({key}):key;
        label.setAttribute("for",input.id);
        label.textContent=french ? langConversion({key})  :key;
        input.onchange=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLInputElement).value;
            switch(true){
                case key==="from":
                    education.from=value
                    formGrp.style.order="0";
                break;
                case key==="to":
                    education.to=value;
                    formGrp.style.order="1";
                break;
                default:
                    break;
                
            }
        };
        return education;
    };


    schoolSkills({formChild,css_col,key,css_row,less400,order,education,french}:{formChild:HTMLElement,css_col:string,css_row:string,less400:boolean,order:number,key:string,french:boolean,education:educationType}):educationType{
        Resume.cleanUpById({parent:formChild,id:"educate-skill-cont"});
        const educateSkillCont=document.createElement("div");
        educateSkillCont.id="educate-skill-cont";
        educateSkillCont.style.cssText=css_col + "width:100%;margin-block:0.75rem;position:relative;";
        educateSkillCont.style.position="relative";
        educateSkillCont.style.order=String(order);
        formChild.appendChild(educateSkillCont);
        //PREVENT PARENT ON addEducateSkill FROM NOT BEING SEEN WHEN EMPTY
        education=this.formComp.addRemove.addEducateSkill({
            parent:educateSkillCont,
            education,
            css_col,
            less400,
            french,
            key,
            func:(education)=>{
                Resume.cleanUpById({parent:formChild,id:"educate-skill-cont"});
                this.schoolSkills({formChild,css_col,key,css_row,less400,order,education,french});
            }

        });
        education.skills=education.skills.map((skill,index)=>{
            if(skill){
                const {input,label,formGrp}=EditResume.inputComponent(educateSkillCont);
                formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;";
                formGrp.style.width=less400 ? "100%":"80%";
                this.formComp.addRemove.removeEducateSkill({
                    target:formGrp,
                    css_row,
                    key,
                    less400,
                    skill,
                    education,
                    func:(education)=>{
                        Resume.cleanUpById({parent:formChild,id:"educate-skill-cont"});
                        this.schoolSkills({formChild,css_row,key,css_col,less400,order,education,french});
                    }
                });
                input.id=`${key}-${index}`;
                input.name="skill-" + key + String(index);
                input.value=skill as string;
                input .placeholder=french ? langConversion({key}) :key;
                input.style.width=less400 ? "75%":"50%";
                label.setAttribute("for",input.id);
                label.textContent=french ? langConversion({key}) :key;
                input.onchange=(e:Event)=>{
                    if(!e) return;
                    const value=(e.currentTarget as HTMLInputElement).value;
                    education.skills[index]=value;
                };
            }
            return skill;
        });
        return education;
    };


    workSkills({formChild,css_col,css_row,key,less400,experience,french}:{formChild:HTMLElement,css_col:string,css_row:string,less400:boolean,key:string,french:boolean,experience:workExperienceType}):workExperienceType{
        Resume.cleanUpById({parent:formChild,id:"skill-cont"});
        const skillCont=document.createElement("div");
        skillCont.id="skill-cont";
        skillCont.style.cssText=css_col + "width:100%;gap:0.75rem;position:relative;order:5;";
        formChild.appendChild(skillCont);
        experience=this.formComp.addRemove.addWorkSkill({
            parent:skillCont,
            experience,
            css_col,
            less400,
            french,
            func:(experience)=>{
                Resume.cleanUpById({parent:formChild,id:"skill-cont"});
               return this.workSkills({formChild,css_col,css_row,key,less400,experience,french})
            }
        });

        experience.skills=experience.skills.map((skill,index)=>{
            if(skill){
                const {input,label,formGrp}=EditResume.inputComponent(skillCont);
                formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;";
                formGrp.style.width=less400 ? "100%":"80%";
                this.formComp.addRemove.removeWorkSkill({
                    target:formGrp,
                    css_row,
                    key,
                    less400,
                    skill,
                    experience,
                    func:(experience)=>{
                        Resume.cleanUpById({parent:formChild,id:"skill-cont"});
                        this.workSkills({formChild,css_col,css_row,key,less400,experience,french});
                    }
                });
                input.id=`${key}-${index}`;
                input.name="skill-" + key + String(index);
                input.value=skill as string;
                input.placeholder= langInserts({french,key:"skill"}).place;
                input.style.width=less400 ? "75%":"50%";
                label.setAttribute("for",input.id);
                label.textContent=french ? langConversion({key:"skill"}) :"skill";
                input.onchange=(e:Event)=>{
                    if(!e) return;
                    const value=(e.currentTarget as HTMLInputElement).value;
                    experience.skills[index]=value;
                };
            }
            return skill;
        });
        return experience;
    };


    schoolAchievements({parent,css_col,css_row,less400,order,education,french}:{parent:HTMLElement,css_col:string,css_row:string,less400:boolean,order:number,french:boolean,education:educationType}):educationType{
        const achievementCont=document.createElement("div");
        achievementCont.id="achievement-cont";
        achievementCont.style.cssText=css_col + " width:100%;order:8;border:1px solid orange;border-radius:8px;padding:0.25rem;position:relative;";
        achievementCont.style.order=String(order);
        parent.appendChild(achievementCont);
        this.formComp.addRemove.addEducateAchiev({
            parent:achievementCont,
            education,
            less400,
            french,
            func: (education)=>{
                Resume.cleanUpById({parent,id:"achievement-cont"});
                this.schoolAchievements({parent,css_col,less400,order,css_row,education,french});
            }
        });
        education.achievements=education.achievements.map((achiev,index)=>{
            if(achiev){
                const achieveCont=document.createElement("div");
                achieveCont.id="school-achiev-cont";
                achieveCont.style.cssText=css_col + "margin-inline:auto;width:100%;position:relative;";
                achievementCont.appendChild(achieveCont);
                this.formComp.addRemove.removeEducateAchiev({
                    target:achieveCont,
                    education,
                    achiev,
                    less400,
                    func: (education)=>{
                        Resume.cleanUpById({parent,id:"achievement-cont"});
                        this.schoolAchievements({parent,css_col,less400,order,css_row,education,french});
                    }
                });
                for( const [achievKey,value] of Object.entries(achiev)){
                    const insert=this.inserts.find(kv=>kv.key===achievKey) as insertType;
                    if(typeof(value)==="string"){
                        if(achievKey==="achievement" || achievKey==="composite"){
                            const {textarea:achievInput,label,formGrp}=EditResume.textareaComponent(achieveCont);
                                formGrp.style.cssText=css_col +"width:100%;gap:1rem;position:relative;align-items:stretch;margin-inline:auto;";
                                formGrp.style.width=less400 ? "100%":"80%";
                                achievInput.id="achievement-" + String(index);
                                achievInput.name="education-"+ achievKey + "-" + String(index);
                                achievInput.value=value as string;
                                achievInput.style.width="auto";
                                achievInput.placeholder=langInserts({french,key:achievKey}).place;
                                label.setAttribute("for",achievInput.id);
                                label.textContent=french ? langConversion({key:achievKey})  :achievKey;
                                achievInput.rows=3;
                                achievInput.onchange=(e:Event)=>{
                                    if(!e) return;
                                    const value=(e.currentTarget as HTMLTextAreaElement).value;
                                    if(achievKey==="achievement"){
                                        achiev.achievement=value;
                                        formGrp.style.order="0";
                                    }else{
                                        achiev.composite=value;
                                        formGrp.style.order="2";
                                    }
                                };
                
                        }else if(achievKey==="reason"){
                            const {input,label,formGrp}=EditResume.inputComponent(achieveCont);
                                formGrp.style.cssText=css_col +"width:50%;gap:1rem;flex:1 0 50%;position:relative;align-items:center;order:1;";
                                formGrp.style.width=less400 ? "100%":"80%";
                                formGrp.style.order="1";
                                input.id=`${achievKey}-${index}`;
                                input.name="education-"+ achievKey + "-" + String(index);
                                input.value=value as string;
                                input.placeholder= langInserts({french,key:achievKey}).place;
                                input.type=insert.type ||"text";
                                input.style.width=less400 ? "75%":"50%";
                                label.setAttribute("for",input.id);
                                label.textContent=french ? langConversion({key:achievKey}) :achievKey;
                                input.onchange=(e:Event)=>{
                                    if(!e) return;
                                    const value=(e.currentTarget as HTMLTextAreaElement).value;
                                    achiev.reason=value;
                                };
                        };
                    };
                };
            };
            return achiev;
        });
        return education;
    };


   async saveResume({parent,popup,resume,user}:{parent:HTMLElement,popup:HTMLElement,resume:resumeType,user:userType}){
        const mainResume={id:0,name:resume.name,resume,user_id:user.id} as mainResumeType;
       return this._service.saveResume({mainResume}).then(async(res)=>{
            if(res){
                Resume.message({parent,msg:"saved",type:"success",time:800});
                setTimeout(()=>{
                    ([...parent.children] as HTMLElement[]).forEach(child=>{
                        if(child && child.id===popup.id){
                            parent.removeChild(child);
                        }
                    });
                },750);
                return res;
            }
        });
    };

    static removePopup2({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        const xDiv=document.createElement("div");
        xDiv.id="popup-remove-element";
        xDiv.style.cssText="position:absolute;top:0%;right:0%;translate(5px,5px);border-radius:50%;padding:2px;backround-color:black;color:white;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"16px",color:"white",borderRadius:"50%",backgroundColor:"black"}});
        xDiv.onclick=(e:MouseEvent)=>{
            if(!e) return;
            parent.removeChild(target);
        };
    };


    static hideShow({target,show,time}:{target:HTMLElement,show:boolean,time:number}){
        if(show){
            target.hidden=false;
            target.style.transform="rotateX(0deg)";
            target.style.opacity="1";
            target.style.height="auto";
            target.animate([
                {transform:"rotateX(90deg)",opacity:"0",height:"0px"},
                {transform:"rotateX(45deg)",opacity:"0.5",height:"50%"},
                {transform:"rotateX(0deg)",opacity:"1",height:"auto"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
        }else{
            target.style.transform="rotateX(90deg)";
            target.style.opacity="0";
            target.style.height="0px";
            target.animate([
                {transform:"rotateX(0deg)",opacity:"1",height:"auto"},
                {transform:"rotateX(45deg)",opacity:"0.5",height:"50%"},
                {transform:"rotateX(90deg)",opacity:"0",height:"0px"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
            setTimeout(()=>{
                target.hidden=true;
            },time-50);
        }
    };

    static removePopup({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        const xDiv=document.createElement("div");
        xDiv.style.cssText="position:absolute;top:0%;right:0%;tansform:translate(10px,-8px);padding:2px;border-radius:50%;background-color:black;color:white;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"12px",borderRadius:"50%",color:"white"}});
        target.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(!e) return;
            parent.removeChild(target);
        };
    };

    static closePopup({parent,target,time}:{parent:HTMLElement,target:HTMLElement,time:number}){
        target.style.transform="scale(0.2) rotateY(90deg)";
        target.style.opacity="0";
        target.animate([
            {transform:"scale(1) rotateY(0deg)",opacity:"1"},
            {transform:"scale(0.2) rotateY(90deg)",opacity:"0"},
        ],{duration:time,iterations:1,"easing":"ease-in-out"});
        setTimeout(()=>{parent.removeChild(target)},time-50);

    };
    static openPopup({target,time}:{target:HTMLElement,time:number}){
        target.animate([
            {transform:"scale(0) rotateY(90deg)",opacity:"0"},
            {transform:"scale(1) rotateY(0deg)",opacity:"1"},
        ],{duration:time,iterations:1,"easing":"ease-in-out"});
      
    };
}
export default CreateResume;
import { FaMinusCircle, FaPlus, FaPlusCircle } from "react-icons/fa";
import { FaCreate } from "../../common/ReactIcons";
import { awardType, contactRefType, educationType, linkType, miscType, resumeRefType, resumeType, workExperienceType } from "./refTypes";
import styles from "./addRemove.module.css";


class AddRemove{
    private _experience:workExperienceType;
    private _education:educationType;
    private _achievement:awardType;
    private _reference:resumeRefType;
    public contact:contactRefType;
    private _contacts:contactRefType[];
    public links:linkType[];
    private _extra:miscType;
    public skillWords:string[];
    public languages:string[];

    constructor(){
        this.languages=["English","French","Spanish","Mandarin","Hindi","Bengali","Russian","Italian","Turkish","Portuguese","Japanese","Georgian","Arabic","Dutch","Latin","Gaelic","Welsh","Hungarian","Indonesian","Persian","Perubian",""]
        this.skillWords=["Teamwork","Critical Thinking","Problem Solving","Customer Service","Out-Of-The-Box-Thinker","Analytical","Managerial","Unapprehensive"]
        this.contact={
            id:0,
            name:"name",
            cell:"",
            address:"",
            city:"",
            email:""
        }
        this._contacts=[this.contact]
        this._extra={languages:["add a language"]};
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
        this.links=[{name:"ablogroom",link:"https://www.ablogroom.com"},{name:"masterultils",link:"https://masterultils.com"},{name:"masterconnect",link:"https://www.masterconnect.com"},]
        this._reference={
            id:0,
            res_name_id:undefined,
            name:"name",
            composite:"composed of",
            desc:"description",
            mainLink:"https://mainLink.com",
            links:this.links,
            contacts:this._contacts
        };
    };

    //---------------------GETTER/SETTERS--------------////
    get experience(){
        return this._experience;
    };
    set experience(experience:workExperienceType){
        this._experience=experience;
    };
    get education(){
        return this._education;
    };
    set education(education:educationType){
        this._education=education
    };
    get reference(){
        return this._reference;
    };
    set reference(reference:resumeRefType){
        this._reference=reference
    };
    get extra(){
        return this._extra;
    };
    set extra(extra:miscType){
        this._extra=extra;
    };
    get contacts(){
        return this._contacts
    }
    set contacts(contacts:contactRefType[]){
        this._contacts=contacts
    }
    get achievement(){
        return this._achievement;
    };
    set achievement(achievement:awardType){
        this._achievement=achievement;
    };
    //---------------------GETTER/SETTERS--------------////
    removeEducation({parent,resume,education,css_col,less400,func}:{parent:HTMLElement,resume:resumeType,education:educationType,css_col:string,less400:boolean,func:(resume:resumeType)=>resumeType|void}){
        const cont=document.createElement("div");
        cont.id="remove-education-cont";
        cont.style.cssText=css_col + "position:absolute;top:0%;right:0%;background-color:white;z-index:200;color:blue;border-radius:10px;padding:2px;gap:0.5rem;padding:0.5rem;box-shadow:1px 1px 10px 1px blue;max-width:70px;width:100%;";
        cont.style.transform=less400 ? "translate(2px, -30px) scale(0.7)":"translate(-20px,20px) scale(0.9)";
        const name=document.createElement("small");
        name.style.cssText="margin-inline;"
        name.textContent="remove";
        cont.appendChild(name);
        const xDiv=document.createElement("div");
        xDiv.id="add=work-experience";
        xDiv.style.cssText=css_col + "background-color:white;z-index:200;color:red;border-radius:4px;padding:2px;background-color:black";
        FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{width:"100%",aspectratio:"1/1"}});
        xDiv.style.width=less400 ? "45px":"65px;";
        cont.appendChild(xDiv);
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(e){
                resume.education=resume.education.filter(educ=>(educ.id !==education.id));
                func(resume);
            }
        };
       
    };

    addWorkEducate({parent,resume,css_col,isEducation,less400,func}:{parent:HTMLElement,resume:resumeType,css_col:string,less400:boolean,isEducation:boolean,func:(resume:resumeType)=>resumeType|void}){
        const less900=window.innerWidth <900;
            const cont=document.createElement("div");
            if(isEducation){
                cont.id="add-education-cont";
                
            }else{
                cont.id="add-experience-cont";
            }
            cont.className=styles.addExperienceCont;
            if(isEducation){
                cont.style.left="0%";
                cont.style.backgroundColor="orange";
                cont.style.color="white";
                if(less900) cont.style.transform="translate(0px, -10px) scale(0.7)";
                if(less400) cont.style.transform="translate(-10px, 0px) scale(0.5)";
            }else{
                cont.style.left="0%";
                if(less900) cont.style.transform="translate(0px, -10px) scale(0.7)";
                if(less400) cont.style.transform="translate(-150px, 10px) scale(0.5)";
            }
            
            const name=document.createElement("small");
            if(isEducation){
                name.textContent="new Educat";

            }else{
                name.textContent="new Work";
            }
            cont.appendChild(name);
            const xDiv=document.createElement("div");
            xDiv.id="add=work-experience";
            xDiv.style.cssText=css_col + "background-color:white;z-index:200;color:white;border-radius:4px;padding:2px;background-color:black";
            FaCreate({parent:xDiv,name:FaPlus,cssStyle:{width:"100%",aspectratio:"1/1"}});
            xDiv.style.width=less400 ? "45px":"65px;";
            cont.appendChild(xDiv);
            parent.appendChild(cont);
            cont.onclick=(e:MouseEvent)=>{
                if(e){
                    if(!isEducation){
                        const len=resume.workExperience.length+1;
                        this.experience={...this.experience,id:len};
                        resume.workExperience=[...resume.workExperience,this.experience];
                        func(resume);
                    }else{
                        const len=resume.education.length+1;
                        this.education={...this.education,id:len};
                        resume.education=[...resume.education,this.education];
                        func(resume);
                    }
                }
            };
           
    };


     removeWorkExperience({parent,resume,experience,css_col,less400,func}:{parent:HTMLElement,resume:resumeType,experience:workExperienceType,css_col:string,less400:boolean,func:(resume:resumeType)=>resumeType|void}){
            const cont=document.createElement("div");
            cont.id="remove-workExpeience-cont";
            cont.className=styles.removeWorkExperience;
            if(less400) cont.style.transform="translate(30px, -70px) scale(0.7)";
            const name=document.createElement("small");
            name.style.cssText="margin-inline:auto;text-wrap:wrap;"
            name.textContent="remove wkCont";
            cont.appendChild(name);
            const xDiv=document.createElement("div");
            xDiv.id="add=work-experience";
            xDiv.style.cssText=css_col + "background-color:white;z-index:200;color:red;border-radius:4px;padding:2px;background-color:black";
            FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{width:"100%",aspectratio:"1/1",color:"red"}});
            xDiv.style.width=less400 ? "45px":"65px;";
            cont.appendChild(xDiv);
            parent.appendChild(cont);
            cont.onclick=(e:MouseEvent)=>{
                if(e){
                    resume.workExperience=resume.workExperience.filter(exp=>(exp.id !==experience.id));
                    func(resume);
                }
            };
           
    };

    addEducateAchiev({parent,education,less400,func}:{parent:HTMLElement,education:educationType,less400:boolean,func:(education:educationType)=>educationType|void}){
        const less900=window.innerWidth <900;
        const len=education?.achievements?.length;
        const cont=document.createElement("div");
        cont.className=styles.addEducAchiev;
        cont.id=`add-educ-achiev-main-popup`;
      
        if(len>0){
            cont.style.transform="translate(-80px,0px) scale(0.75)";
            if(less900)cont.style.transform="translate(-80px, -15px) scale(0.7)";
            if(less400)cont.style.transform="translate(-15px,-40px) scale(0.5)";
        }else{
            cont.style.transform="translate(-13px, -30px) scale(0.5)";
            if(less900)cont.style.transform="translate(-450px, -60px) scale(0.5)";
            if(less400)cont.style.transform="translate(-10px,-40px) scale(0.4)";
           
        }
        const small=document.createElement("small");
        small.id="add-skill-name";
        small.style.fontSize="0.5rem";
        small.textContent="achievmt";
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:white;background-color:blue;padding:0.25rem;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaPlusCircle,cssStyle:{fontSize:"1.5rem",color:"white",borderRadius:"50%"}});
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            if(education?.achievements?.length){
                const len=education.achievements.length + 1;
                this.achievement={...this.achievement,id:len};
                education.achievements=[...education.achievements,this.achievement];
            }else{
                this.achievement={...this.achievement,id:0};
                education.achievements=[] as awardType[];
                education.achievements=[...education.achievements,this.achievement]
            }
            func(education);
        };

        return education;
    };


    addWorkAchiev({parent,experience,less400,css_col,func}:{parent:HTMLElement,less400:boolean,experience:workExperienceType,css_col:string,func:(experience:workExperienceType)=>workExperienceType|void}){
        const cont=document.createElement("div");
        cont.id=`add-work-achiev-main-popup`;
        cont.style.cssText=css_col + "position:absolute;top:0%;left:0%;width:fit-content;height:auto;border-radius:7px;box-shadow:1px 1px 10px 1px black;padding:0.25rem;background-color:black;color:white;";
        cont.style.transform=less400 ? "translate(-10px,-30px) scale(0.5)":"translate(-50px,-55px) scale(0.7)";
        cont.style.backgroundColor="black";
        cont.style.color="white";
        const small=document.createElement("small");
        small.id="add-skill-name";
        small.style.fontSize="0.5rem";
        small.textContent="achievmt";
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:white;background-color:blue;padding:0.25rem;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaPlusCircle,cssStyle:{fontSize:"1.5rem",color:"white",borderRadius:"50%"}});
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            if(experience.achievements?.length){
                const len=experience.achievements.length + 1;
                this.achievement={...this.achievement,id:len};
                experience.achievements=[...experience.achievements,this.achievement];
            }else{
                experience.achievements=[] as awardType[];
                experience.achievements=[...experience.achievements,this.experience.achievements[0]];
            }
            func(experience);
        };

        return experience;
    };


    removeEducateAchiev({target,education,achiev,less400,func}:{target:HTMLElement,education:educationType,achiev:awardType,less400:boolean,func:(education:educationType)=>educationType|void}){
        const len=education?.achievements?.length;
        const less900=window.innerWidth < 900;
        const cont=document.createElement("div");
        cont.className=styles.contRmEducAchiev;
        cont.id=`remove-educ--achiev-main-popup`;
       
        if(len>0){
            cont.style.transform="transform:translate(0px,0px) scale(0.75)";
            if(less900)cont.style.transform="translate(20px, 0px) scale(0.45)";
            if(less400)cont.style.transform="translate(20px, -10px) scale(0.36)";
        }else{
            cont.style.transform="translate(20px, 70px) scale(0.6)";
            if(less900)cont.style.transform="translate(60px, -20px) scale(0.45)";
            if(less400)cont.style.transform="translate(20px, -10px) scale(0.36)";
           
        }
        if(!less400){

            const small=document.createElement("small");
            small.id="add-skill-name";
            small.style.fontSize="0.5rem";
            small.textContent=`<==rm achievmt`;
            cont.appendChild(small);
        }
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:white;background-color:blue;padding:0.25rem;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{fontSize:"1.5rem",color:"white",borderRadius:"50%"}});
        target.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            education.achievements=education.achievements.filter(kv=>(kv.id !==achiev.id));
            func(education);
        };

        return education;
    };


    removeWorkAchiev({target,experience,achiev,func}:{target:HTMLElement,experience:workExperienceType,achiev:awardType,less400:boolean,css_row:string,func:(experience:workExperienceType)=>educationType|void}){
       
       
        const cont=document.createElement("div");
        cont.id=`remove-achiev-main-popup`;
        cont.className=styles.removeAchievPopup;
        cont.style.maxWidth="75px";
        const small=document.createElement("small");
        small.id="add-skill-name";
        small.style.fontSize="0.5rem";
        small.textContent=`<==rm-achievmt`;
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:pink;background-color:blue;padding:0.25rem;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{fontSize:"1.5rem",color:"red",borderRadius:"50%"}});
        target.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            experience.achievements=experience.achievements.filter(kv=>(kv.id !==achiev.id));
            func(experience);
        };

        return experience;
    };


    removeEducateSkill({target,skill,education,css_row,key,less400,func}:{target:HTMLElement,education:educationType,css_row:string,key:string,less400:boolean,skill:string,func:(education:educationType)=>educationType|void}){
        const len=education?.skills?.length;
        const less900=window.innerWidth < 900;
            const cont=document.createElement("div");
            cont.id="remove-educate-skill-main";
            cont.style.cssText=css_row + "position:absolute;top:0%;right:0%;width:fit-content;height:auto;border-radius:7px;box-shadow:1px 1px 10px 1px black;padding-inline:0.5rem;flex-wrap:nowrap;";
            cont.style.position="absolute";
            cont.style.top="0%";
            cont.style.right="0%";
            if(len>0){
                cont.style.transform="translate(-15px,15px) scale(0.7)";
                if(less900)cont.style.transform="translate(55px, 15px) scale(0.7)";
                if(less400)cont.style.transform="translate(0px,15px) scale(0.5)";
            }else{
                cont.style.transform="translate(-13px, -30px) scale(0.5)";
                if(less900)cont.style.transform="translate(-0px, -75px) scale(0.6)";
                if(less400)cont.style.transform="translate(-0px,-40px) scale(0.4)";
               
            }
            if(!less400){
                const small=document.createElement("small");
                small.id=`remove-skill-name-${key}`;
                small.textContent=skill;
                small.style.fontSize="0.5rem";
                small.style.cssText="font-size:0.5rem;text-wrap:wrap;";
                cont.appendChild(small);
            }
            const xDiv=document.createElement("div");
            xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:red;";
            cont.appendChild(xDiv);
            FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{fontSize:"25px",color:"red",borderRadius:"50%"}});
            target.appendChild(cont);
            cont.onclick=(e:MouseEvent)=>{
                if(!e) return;
                education.skills=education.skills.filter(kv=>kv !==skill);
                func(education);
            };
    
    };
    
    
    addEducateSkill({parent,education,css_col,less400,key,func}:{parent:HTMLElement,education:educationType,css_col:string,less400:boolean,key:string,func:(education:educationType)=>educationType|void}){
        const len=education.skills.length
        const cont=document.createElement("div");
        cont.id=`add-educate-skill-main-${key}`;
        cont.style.cssText=css_col + "position:absolute;top:0%;left:0%;width:fit-content;height:auto;border-radius:7px;box-shadow:1px 1px 10px 1px black;padding:0.25rem;background-color:black;color:white;";
        if(len>0){
            cont.style.transform=less400 ? "translate(2px,-30px) scale(0.5)":"translate(10px, -25px) scale(0.6)";
        }else{
            cont.style.transform=less400 ? "translate(2px,-30px) scale(0.5)":"translate(50px, -75px) scale(0.6)";
        }
        const small=document.createElement("small");
        small.id="add-skill-name";
        small.style.fontSize="0.75rem";
        small.textContent="skill";
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:white;background-color:blue;padding:0.25rem;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaPlusCircle,cssStyle:{fontSize:"1.5rem",color:"white",borderRadius:"50%"}});
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            let count=0;
            const len=education?.skills?.length||0;
            const len2=this.skillWords.length;
            count=len
            if(len>=len2) count=0;
            const word=`${this.skillWords[count]}-${len}`;
            if(education && education?.skills?.length>0){
                education.skills=[...education.skills,word];
              
            }else{
                education.skills=[] as string[]
                education.skills=[...education.skills,word];
            }
            count++;
          
            func(education);
        };

        return education;
    };

    addWorkSkill({parent,experience,css_col,less400,func}:{parent:HTMLElement,experience:workExperienceType,css_col:string,less400:boolean,func:(experience:workExperienceType)=>workExperienceType|void}){
        const len=experience?.skills?.length || 0
        const cont=document.createElement("div");
        cont.id=`add-work-skill-main-`;
        cont.style.cssText=css_col + "position:absolute;top:0%;left:0%;transform:translate(10px,10px);width:fit-content;height:auto;border-radius:7px;box-shadow:1px 1px 10px 1px black;background-color:black;color:white;";
       
        if(len && len>0){
            cont.style.transform=less400 ? "scale(0.5) translate(0px, -10px)":"scale(0.6) translate(10px, -10px)";
        }else{
            cont.style.transform=less400 ? "scale(0.5) translate(0px, -50px)":"scale(0.6) translate(20px, -50px)";
        }
        const small=document.createElement("small");
        small.id="add-skill-name";
        small.style.fontSize="0.5rem";
        small.style.paddingInline="0.5rem";
        small.textContent="add skill";
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:white;background-color:blue;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaPlus,cssStyle:{fontSize:"25px",color:"white",borderRadius:"50%"}});
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            let count=0;
            const len=experience?.skills?.length||0;
            const len2=this.skillWords.length;
            count=len
            if(len>=len2) count=0;
            const word=`${this.skillWords[count]}-${len}`;
            if(experience && experience?.skills?.length>0){
                experience.skills=[...experience.skills,word];
              
            }else{
                experience.skills=[] as string[]
                experience.skills=[...experience.skills,word];
            }
            count++;
            func(experience);
        };

        return experience;
    };


    removeWorkSkill({target,skill,experience,css_row,less400,key,func}:{target:HTMLElement,experience:workExperienceType,css_row:string,less400:boolean,key:string,skill:string,func:(experience:workExperienceType)=>workExperienceType|void}){
        const cont=document.createElement("div");
        cont.id=`remove-work-skill-main-${key}`;
        cont.style.cssText=css_row + "position:absolute;top:0%;right:0%;transform:translate(-10px,10px);width:fit-content;height:auto;border-radius:7px;box-shadow:1px 1px 10px 1px black;gap:0.5rem;width:fit-content;background-color:black;color:white;";
        cont.style.transform=less400 ? "scale(0.5) translate(10px, 20px)":"scale(0.6) translate(20px,30px)"
        const small=document.createElement("small");
        small.id="remove-skill-name";
        small.style.cssText="font-size:0.5rem;padding-inline:0.5rem;";
        small.textContent=skill;
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:red;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{fontSize:"25px",color:"red",borderRadius:"50%"}});
        target.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            this.experience=experience;
            experience.skills=experience.skills.filter(kv=>kv !==skill);
            func(experience);
        };
    };

    addLanguage({parent,resume,css_col,less400,func}:{
        parent:HTMLElement,
        css_col:string,
        resume:resumeType,
        less400:boolean,
        func:(resume:resumeType)=>resumeType|void
    }){
        const len=resume?.extra?.languages.length ||0;
        const cont=document.createElement("div");
        cont.id=`add-language-main`;
        cont.style.cssText=css_col + "position:absolute;top:0%;left:0%;transform:translate(-10px,10px);width:fit-content;height:auto;border-radius:7px;box-shadow:1px 1px 10px 1px black;background-color:blue;color:white;z-index:200;";
        if(len>0){
            cont.style.transform=less400 ? "translate(0px,-40px) scale(0.6)" :"translate(10px,-30px) scale(0.8)";
        }else{
            cont.style.transform=less400 ? "translate(5px,-60px) scale(0.6)" :"translate(20px,-60px) scale(0.8)";
        }
        const small=document.createElement("small");
        small.id="add-skill-name";
        small.style.fontSize="0.5rem";
        small.style.paddingInline="0.5rem";
        small.textContent=`add lang`;
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:white;background-color:green;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaPlus,cssStyle:{fontSize:"25px",color:"white",borderRadius:"50%"}});
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            if(resume?.extra?.languages){
                const len=resume.extra.languages.length;
                const lang=this.languages[len]
                this.extra=resume.extra;
                resume.extra.languages=[...resume.extra.languages,lang];
            }else{
                resume.extra=this.extra;
            }
            func(resume);
        };
    };


    removeLanguage({target,resume,lang,index,func}:{
        target:HTMLElement,
        lang:string,
        resume:resumeType,
        index:number,
        func:(resume:resumeType)=>resumeType|void
    }){
        const cont=document.createElement("div");
        cont.className=styles.removLanguage;
        cont.id=`remove-work-skill-main-${index}`;
        const small=document.createElement("small");
        small.id="remove-skill-name";
        small.style.cssText="font-size:0.5rem;padding-inline:0.5rem;";
        small.textContent=lang;
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:red;background-color:inherit;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{fontSize:"25px",color:"orange",borderRadius:"50%"}});
        target.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            this.extra=resume.extra;
            resume.extra.languages=resume.extra.languages.filter(kv=>kv !==lang);
            func(resume);
        };
    };


    removeSite({target,resume,css_col,value,less400,func}:{
        target:HTMLElement,
        css_col:string,
        resume:resumeType,
        value:string,
        less400:boolean,
        func:(resume:resumeType)=>resumeType|void
    }){
        const len=resume?.extra?.languages.length ||0;
        const cont=document.createElement("div");
        cont.id=`remove-site-main`;
        cont.style.cssText=css_col + "position:absolute;top:0%;right:0%;transform:translate(-10px,10px);width:fit-content;height:auto;border-radius:7px;box-shadow:1px 1px 10px 1px black;background-color:blue;color:white;z-index:200;";
        
        if(len>0){
            cont.style.transform=less400 ? "translate(0px,-40px) scale(0.6)" :"translate(10px,-30px) scale(0.8)";
        }else{
            cont.style.transform=less400 ? "translate(5px,-60px) scale(0.6)" :"translate(20px,-60px) scale(0.8)";
        }
        const small=document.createElement("small");
        small.id="remove-skill-name";
        small.style.fontSize="0.5rem";
        small.style.paddingInline="0.5rem";
        small.textContent=`rm-site`;
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:white;background-color:maroon;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{fontSize:"25px",color:"white",borderRadius:"50%"}});
        target.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            resume.sites=resume.sites.filter(site=>(site!==value))
            func(resume);
        };
        
    };


    addSite({parent,resume,css_col,less400,func}:{
        parent:HTMLElement,
        css_col:string,
        resume:resumeType,
        less400:boolean,
        func:(resume:resumeType)=>resumeType|void
    }){
        const len=resume?.extra?.languages.length ||0;
        const cont=document.createElement("div");
        cont.id=`add-site-main`;
        cont.style.cssText=css_col + "position:absolute;top:0%;left:0%;transform:translate(-10px,10px);width:fit-content;height:auto;border-radius:7px;box-shadow:1px 1px 10px 1px black;background-color:blue;color:white;z-index:200;";
        if(len>0){
            cont.style.transform=less400 ? "translate(0px,-40px) scale(0.6)" :"translate(10px,-30px) scale(0.8)";
        }else{
            cont.style.transform=less400 ? "translate(5px,-60px) scale(0.6)" :"translate(20px,-60px) scale(0.8)";
        }
        const small=document.createElement("small");
        small.id="add-skill-name";
        small.style.fontSize="0.5rem";
        small.style.paddingInline="0.5rem";
        small.textContent=`add site`;
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:white;background-color:green;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaPlus,cssStyle:{fontSize:"25px",color:"white",borderRadius:"50%"}});
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            const rand=Math.floor(Math.random()*100);
            if(resume?.sites){
                resume.sites=[...resume.sites,`www.edit${rand}.com`];
            }else{
                resume.sites=[] as string[];
                resume.sites=[...resume.sites,`www.edit${rand}.com`]
            }
            func(resume);
        };
    };


    addReference({parent,css_col,references,less400,func}:{parent:HTMLElement,css_col:string,less400:boolean,references:resumeRefType[],func:(references:resumeRefType[])=>void}){
        const cont=document.createElement("div");
        cont.id="add-reference-cont"
        cont.style.cssText=css_col + "position:absolute;top:0%;left:0%;background-color:white;z-index:200;color:blue;border-radius:10px;padding:2px;gap:0.5rem;padding:0.5rem;box-shadow:1px 1px 10px 1px blue;max-width:50px;width:100%;text-wrap:wrap;";
        cont.style.transform=less400 ? "translate(150px,50px) scale(0.5)":"translate(0px,-10px) scale(0.8)"
        const name=document.createElement("small");
        name.style.cssText="transform:scale(0.8);";
        name.textContent="new ref";

        cont.appendChild(name);
        const xDiv=document.createElement("div");
        xDiv.id="add=work-experience";
        xDiv.style.cssText=css_col + "background-color:white;z-index:200;color:white;border-radius:4px;padding:2px;background-color:black";
        FaCreate({parent:xDiv,name:FaPlus,cssStyle:{width:"100%",aspectratio:"1/1"}});
        xDiv.style.width=less400 ? "45px":"65px;";
        cont.appendChild(xDiv);
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
           
            if(e){
               
                    this.reference={...this.reference};
                    references=[...references,this.reference];
                    func(references);
            }
        };
       
    };

    removeReference({target,css_col,references,reference,less400,func}:{target:HTMLElement,css_col:string,less400:boolean,references:resumeRefType[],reference:resumeRefType,func:(references:resumeRefType[])=>void}){
        const cont=document.createElement("div");
        cont.id="add-reference-cont"
        cont.style.cssText=css_col + "position:absolute;top:0%;right:0%;background-color:white;z-index:200;color:blue;border-radius:10px;padding:2px;gap:0.5rem;padding:0.5rem;box-shadow:1px 1px 10px 1px blue;max-width:50px;width:100%;text-wrap:wrap;";
        cont.style.transform=less400 ? "translate(150px,50px) scale(0.5)":"translate(0px,-10px) scale(0.9)"
        const name=document.createElement("small");
        name.style.cssText="transform:scale(0.8);";
        name.textContent="del ref";

        cont.appendChild(name);
        const xDiv=document.createElement("div");
        xDiv.id="add=work-experience";
        xDiv.style.cssText=css_col + "background-color:white;z-index:200;color:red;border-radius:4px;padding:2px;background-color:black";
        FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{width:"100%",aspectratio:"1/1",fontSize:"18px"}});
        xDiv.style.width=less400 ? "45px":"65px;";
        cont.appendChild(xDiv);
        target.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(e){
                    references=references.filter(kv=>(kv.id !==reference.id));
                    func(references);
            }
        };
       
    };

    addReflink({parent,reference,less400,func}:{
        parent:HTMLElement,
        reference:resumeRefType,
        less400:boolean,
        func:(reference:resumeRefType)=>resumeType|void
    }){
        const less900=window.innerWidth <900;
        const len=reference.links.length ||0;
        const cont=document.createElement("div");
        cont.className=styles.addReflink;
        cont.id=`add-link`;
        if(len>0){
            cont.style.transform="translateX(-10px) scale(0.6)";
            if(less900)cont.style.transform="translate(-40px,0px) scale(0.5)";
            if(less400)cont.style.transform="translate(-10px,-3px) scale(0.4)";
        }else{
            cont.style.transform="translate(-6px, -20px) scale(0.5)";
            if(less900)cont.style.transform="translate(-10px, -40px) scale(0.5)";
            if(less400)cont.style.transform="translate(-5px,-45px) scale(0.4)";
           
           
        }
        const small=document.createElement("small");
        small.id="add-skill-name";
        small.style.paddingInline="0.5rem";
        small.textContent=`add link`;
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:white;background-color:green;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaPlusCircle,cssStyle:{fontSize:"25px",color:"white",borderRadius:"50%"}});
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            const rand=Math.floor(Math.random()*100);
            if(reference.links?.length>0){
                let index=0;
                const len=reference.links.length
                index=len
                if(len>=3) index=0;
                const link_=`example-${rand}:${this.links[index].link}`
                reference.links=[...reference.links,{name:"added",link:link_}];
            }else{
                reference.links=[] as linkType[];
                reference.links=[...reference.links,{name:"added",link:this.links[0].link}]
            }
            func(reference);
        };
    };


    removeReflink({target,reference,link,less400,func}:{
        target:HTMLElement,
        reference:resumeRefType,
        less400:boolean,
        link:linkType,
        func:(reference:resumeRefType)=>resumeType|void
    }){
        const less900 = window.innerWidth < 900;
        const len=reference.links.length ||0;
        const cont=document.createElement("div");
        cont.id=`rm-site-main`;
        cont.className=styles.rmSiteLink;
        
        if(len>0){
            cont.style.transform="translate(16px, 0px) scale(0.65)";
            if(less900)cont.style.transform="translate(60px, 0px) scale(0.45)";
            if(less400)cont.style.transform="translate(20px, -10px) scale(0.36)";
        }else{
            cont.style.transform="translate(-240px, -30px) scale(0.5)";
            if(less900)cont.style.transform="translate(60px, -20px) scale(0.45)";
            if(less400)cont.style.transform="translate(20px, -10px) scale(0.36)";
           
        }
        const small=document.createElement("small");
        small.id="add-skill-name";
        small.style.paddingInline="0.5rem";
        small.textContent=`rm link`;
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:3px;border-radius:50%;color:white;background-color:black;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{fontSize:"25px",color:"red",borderRadius:"50%"}});
        target.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            const {link:link1}=link;
            reference.links=reference.links.filter(kv=>(kv.link !==link1))
            func(reference);
        };
    };


    addRefContact({parent,reference,css_col,less400,func}:{
        parent:HTMLElement,
        css_col:string,
        reference:resumeRefType,
        less400:boolean,
        func:(reference:resumeRefType)=>resumeType|void
    }){
        const less900 = window.innerWidth <900;
        const len=reference?.contacts?.length ||0;
       
        const cont=document.createElement("div");
        cont.id=`add-contact-main`;
        cont.style.cssText=css_col + "position:absolute;top:0%;left:0%;transform:translate(-10px,10px);width:fit-content;height:auto;border-radius:7px;box-shadow:1px 1px 10px 1px black;background-color:blue;color:white;z-index:200;";
        if(len>0){
            cont.style.transform="translate(-20px, 0px) scale(0.5)";
            if(less900) cont.style.transform="translate(-50px,0px) scale(0.5)";
            if(less400) cont.style.transform="translate(-80px, -3px) scale(0.4)";
        }else{
            cont.style.transform="translate(-490px, -20px) scale(0.75)";
            if(less900) cont.style.transform="translate(-300px, -20px) scale(0.5)";
            if(less400) cont.style.transform= "translate(-150px, -10px) scale(0.4)";
        }
        const small=document.createElement("small");
        small.id="add-scontact-name";
        small.style.paddingInline="0.5rem";
        small.textContent=`add contact`;
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:white;background-color:green;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaPlusCircle,cssStyle:{fontSize:"25px",color:"white",borderRadius:"50%"}});
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
           
            if(!e) return;
            if(reference.contacts?.length>0){
                const len=reference.contacts.length;
                this.contact={...this.contact,id:len};
                reference.contacts=[...reference.contacts,this.contact];
            }else{
                reference.contacts=[] as contactRefType[];
                reference.contacts=[...reference.contacts,this.contact]
            }
            func(reference);
        };
    };


    removeRefContact({target,reference,contact,css_col,less400,func}:{
        target:HTMLElement,
        css_col:string,
        reference:resumeRefType,
        less400:boolean,
        contact:contactRefType,
        func:(reference:resumeRefType)=>resumeType|void
    }){
        const less900=window.innerWidth < 900;
        const len=reference?.contacts?.length ||0;
        const cont=document.createElement("div");
        cont.id=`rm-contact-main`;
        cont.style.cssText=css_col + "position:absolute;top:0%;right:0%;width:fit-content;height:auto;border-radius:7px;box-shadow:1px 1px 10px 1px black;background-color:blue;color:white;z-index:200;";
        cont.style.transform="translate(0px, -30px) scale(0.75)";
        
        if(len>0){
            cont.style.transform="translate(20px, -20px) scale(0.5)";
            if(less900) cont.style.transform="translate(20px, 0px) scale(0.45)";
            if(less400) cont.style.transform="translate(50px,-10px) scale(0.36)";
        }else{
            cont.style.transform="translate(-400px, -20px) scale(0.5)";
            if(less900) cont.style.transform="translate(60px, -20px) scale(0.45)";
            if(less400) cont.style.transform= "translate(5px,-20px) scale(0.36)";
        }
        const small=document.createElement("small");
        small.id="rm-contact-name";
        small.style.paddingInline="0.5rem";
        small.textContent=`rm contact`;
        cont.appendChild(small);
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:3px;border-radius:50%;color:white;background-color:black;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{fontSize:"25px",color:"red",borderRadius:"50%"}});
        target.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            const {id}=contact;
            reference.contacts=reference.contacts.filter(kv=>(kv.id !==id));
            func(reference);
        };
    };

    ///-----------------------------LETTER------------------------------///


    ///-----------------------------LETTER------------------------------///


};


export default AddRemove
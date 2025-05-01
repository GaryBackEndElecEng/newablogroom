import AddRemove from './addRemove';
import CreateResume from "./createResume";
import EditResume from "./editResume";
import { awardType, educationType, orgType, resumeRefType, resumeType, workExperienceType } from "./refTypes";
import Resume from "./resume";
import styles from "./formComp.module.css";
import { langConversion, langInserts } from './engFre';


class FormComponents{
    public educationOrgs:orgType[];
    public workOrgs:orgType[];
    public refKeys:string[];

    constructor( public addRemove:AddRemove){
       
    
        this.refKeys=[
            "id",
            "ref_id",
            "name",
            "composite",
            "desc",
            "mainLink",
            "links",
            "contacts"
        ]
    };

    workParticulars({parent,order,key,value,experience,index,french}:{parent:HTMLElement,order:number,key:string,value:string,index:number,experience:workExperienceType,french:boolean}):workExperienceType{
        const less400=window.innerWidth < 400;
        const parts=[{eng:"title",fr:"titre"},{eng:"company",fr:"companie"},{eng:"location",fr:"emplacement"},{eng:"summary",fr:"résumé"}].find(kv=>(kv.eng===key)) as {eng:string,fr:string};
        let particularCont=parent.querySelector("div#work-particular-cont") as HTMLElement|null;
        if(!particularCont){
            particularCont=document.createElement("div");
            particularCont.className=styles.particularCont;
            particularCont.id="work-particular-cont";
            particularCont.style.order=String(order);
            parent.appendChild(particularCont);
        }
        const {input,label,formGrp}=EditResume.inputComponent(particularCont);
        formGrp.className=styles.formGrpNormal;
        formGrp.classList.add("form-group")
        input.id=`${key}`;
        input.name="work-"+ key + "-" + String(index);
        input.value=value as string;
        input.style.width=less400 ? "95%":"80%";
        label.setAttribute("for",input.id);
        label.textContent=french && parts ? parts.fr :key;
        input.onchange=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLInputElement).value;
            switch(true){
                case key==="title":
                experience.title=value;
                formGrp.style.order="0"
                break;
                case key==="company":
                experience.company=value;
                formGrp.style.order="1"
                break;
                case key==="location":
                experience.location=value;
                formGrp.style.order="2"
                break;
                case key==="summary":
                experience.location=value;
                formGrp.style.order="0"
                break;
            }
        };
        return experience;
    };

    workAchievement({parent,order,css_col,css_row,experience,less400,french}:{parent:HTMLElement,order:number,experience:workExperienceType,css_col:string,css_row:string,less400:boolean,french:boolean}):workExperienceType{
        const achievContMain=document.createElement("div");
        achievContMain.id="experience-achievement-cont-main";
        achievContMain.style.cssText=css_col + "width:100%;margin-inline:auto;margin-block:1rem;position:relative";
        achievContMain.style.width=less400 ? "100%":"80%";
        achievContMain.style.order=String(order);
        parent.appendChild(achievContMain);
        this.addRemove.addWorkAchiev({parent:achievContMain,experience,less400,css_col,french,
            func:(experience)=>{
                Resume.cleanUpById({parent,id:"experience-achievement-cont-main"});
                this.workAchievement({parent,order,css_col,css_row,experience,less400,french});
            }
        });
        if(experience.achievements && experience.achievements.length >0){
            experience.achievements=experience.achievements.map((achiev,index)=>{
                if(achiev){
                    achiev={...achiev,id:index+1};
                    const achievCont=document.createElement("div");
                    achievCont.id="achiev-cont-" + String(index);
                    achievCont.style.cssText="margin-inline:auto;position:relative;width:100%;";
                    achievCont.style.paddingInline=less400 ? "0.25rem":"1rem";
                    achievCont.style.width="100%";
                    achievContMain.appendChild(achievCont);
                    this.addRemove.removeWorkAchiev({
                        target:achievCont,
                        experience,
                        less400,
                        achiev,
                        css_row,
                        func:(experience)=>{
                            Resume.cleanUpById({parent,id:"experience-achievement-cont-main"});
                            this.workAchievement({parent,order,css_col,css_row,experience,less400,french});
                        }
                    });
                    
                    for( const [key,value] of Object.entries(achiev)){
                       
                        if(typeof(value)==="string"){
                            if(key==="achievement"){
                            achiev=this.achievementTextArea({parent:achievCont,order:0,key:key,value,less400,index,achiev,french});
                    
                            }else if(key==="reason"){
                                achiev=this.achievementInput({parent:achievCont,order:1,achiev,value,key:key,less400,index,french});
                            }else if(key==="composite"){
                                achiev=this.achievementTextArea({parent:achievCont,order:2,key:key,value,less400,index,achiev,french});
                            }
    
                        }
                    }
                    achievCont.style.width="100%";
                };
                return achiev;
            });
        };

        return experience
    };


    educateAchievement({parent,order,css_col,css_row,education,less400,french}:{parent:HTMLElement,order:number,education:educationType,css_col:string,css_row:string,less400:boolean,french:boolean}):educationType{
        
        const achievContMain=document.createElement("div");
        achievContMain.id="educate-achievement-cont-main";
        achievContMain.style.cssText=css_col + "width:100%;margin-inline:auto;margin-block:1rem;position:relative";
        achievContMain.style.width=less400 ? "100%":"70%";
        achievContMain.style.order=String(order);
        parent.appendChild(achievContMain);
        this.addRemove.addEducateAchiev({parent:achievContMain,education,less400,french,
            func:(education)=>{
                Resume.cleanUpById({parent,id:"educate-achievement-cont-main"});
                this.educateAchievement({parent,order,css_col,css_row,education,less400,french});
            }
        });
        education.achievements=education.achievements.map((achiev,index)=>{
            if(achiev){
                achiev={...achiev,id:index+1};
                const achievCont=document.createElement("div");
                achievCont.id="achiev-cont-" + String(index);
                achievCont.style.cssText="margin-inline:auto;position:relative";
                achievCont.style.paddingInline=less400 ? "0.25rem":"1rem";
                achievCont.style.width="100%";
                achievContMain.appendChild(achievCont);
                this.addRemove.removeEducateAchiev({
                    target:achievCont,
                    education,
                    achiev,
                    less400,
                    func:(education)=>{
                        Resume.cleanUpById({parent,id:"educate-achievement-cont-main"});
                        this.educateAchievement({parent,order,css_col,css_row,education,less400,french});
                    }
                });
                
                for( const [key,value] of Object.entries(achiev)){

                    if(typeof(value)==="string"){
                        if(key==="achievement"){
                        achiev=this.achievementTextArea({parent:achievCont,order:0,key:key,value,less400,index,achiev,french});
                
                        }else if(key==="reason"){
                            achiev=this.achievementInput({parent:achievCont,order:1,achiev,value,key:key,less400,index,french});
                        }else if(key==="composite"){
                            achiev=this.achievementTextArea({parent:achievCont,order:2,key:key,value,less400,index,achiev,french});
                        }

                    }
                };
                achievCont.style.width="100%";
            };
            return achiev;
        });
        return education;
    };

    achievementTextArea({parent,order,key,value,less400,index,achiev,french}:{parent:HTMLElement,order:number,key:string,value:string,less400:boolean,index:number,achiev:awardType,french:boolean}):awardType{
        const lang=langConversion({key});
        const css_col="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;";
        const {textarea:achievInput,label,formGrp}=EditResume.textareaComponent(parent);
        formGrp.style.cssText=css_col +"width:100%;gap:1rem;position:relative;align-items:stretch;margin-inline:auto;";
        formGrp.style.width="100%";
        formGrp.style.order=String(order);
        formGrp.style.width=less400 ? "100%":"95%";
        achievInput.id=`${key}-achievement-textarea`;
        achievInput.name="work-"+ key + "-" + String(index);
        achievInput.value=value as string;
        achievInput.style.width="auto";
        achievInput.placeholder=langInserts({french,key}).place;
        label.setAttribute("for",achievInput.id);
        label.textContent=french && lang ? lang :key;
        achievInput.rows=3;
        achievInput.onchange=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLInputElement).value;
            if(key==="achievement"){
                achiev.achievement=value
            }else{
                achiev.reason=value
            }
        };
        return achiev;
    };

    summary({parent,order,key,value,less400,experience,french}:{parent:HTMLElement,order:number,key:string,value:string,less400:boolean,experience:workExperienceType,french:boolean}):workExperienceType{
        const lang=langConversion({key:"summary"});
        const {textarea:textinput,label,formGrp}=EditResume.textareaComponent(parent);
        formGrp.className=styles.formGrpTextArea;
        formGrp.style.width="100%";
        formGrp.style.order=String(order);
        formGrp.style.width=less400 ? "100%":"95%";
        textinput.id=`${key}-summary-textarea`;
        textinput.name="work-"+ key + "-" + String(order);
        textinput.value=value as string;
        textinput.placeholder=langInserts({french,key:"summary"}).place;
        textinput.style.width="100%";
        label.setAttribute("for",textinput.id);
        label.textContent=french && lang ? lang : key;
        textinput.rows=4;
        textinput.onchange=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLInputElement).value;
            experience.summary=value;
        };
        return experience;
    };


    achievementInput({parent,order,achiev,value,key,less400,index,french}:{parent:HTMLElement,order:number,achiev:awardType,value:string,key:string,less400:boolean,index:number,french:boolean}){
        const lang=langConversion({key});
        const css_col="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;";
        const {input,label,formGrp}=EditResume.inputComponent(parent);
        formGrp.style.cssText=css_col +"width:50%;gap:1rem;flex:1 0 50%;position:relative;align-items:center;";
        formGrp.style.width=less400 ? "100%":"auto";
        formGrp.style.order=String(order);
        input.id=`${key}`;
        input.name="work-"+ key + "-" + String(index);
        input.value=value as string;
        input.placeholder=langInserts({french,key}).place;
        input.style.width=less400 ? "100%":"75%";
        label.setAttribute("for",input.id);
        label.textContent=french && lang ? lang :key;
        input.onchange=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLInputElement).value;
            achiev.composite=value
        };
        return achiev;
    };


    fromToInputEducateComponent({parent,order,key,value,index,less400,education,french}:{parent:HTMLElement,order:number,key:string,value:string,less400:boolean,index:number,education:educationType,french:boolean}):educationType{
        const css_row="display:flex;justify-content:center;align-items:center;gap:1rem;flex-wrap:nowrap;"
        const css_col="display:flex;justify-content:center;align-items:center;gap:1rem;flex-direction:column;"
        const check=([...parent.children] as HTMLElement[]).map(ch=>ch.id).includes("from-to-cont-1");
        let getDiv:HTMLElement;
        if(!check){
            getDiv=document.createElement("div");
            getDiv.id="from-to-cont-1" + String(index);
            getDiv.style.cssText=css_row + "gap:1rem;width:90%";
            getDiv.style.flexDirection=less400 ? "column":"row";
            getDiv.style.order=String(order);
            parent.appendChild(getDiv);
            
        };
        getDiv=parent.querySelector(`div#${"from-to-cont-1" + String(index)}`) as HTMLElement;
        const count=[...getDiv.children].length;
        if(count <=1){
            
            const lang=langConversion({key});
            const {input,label,formGrp}=EditResume.inputComponent(getDiv);
            formGrp.style.cssText=css_col +"gap:1rem;position:relative;align-items:center;";
            formGrp.style.flex=less400 ? " 1 0 100%":"1 0 50%";
            formGrp.style.width=less400 ? "100%":"50%";
            
            input.id=`${key}`;
            input.type="number";
            input.name="work-"+ key + "-" + String(index);
            input.style.width=less400 ? "75%":"50%";
            input.value=value as string;
            label.setAttribute("for",input.id);
            label.textContent= french && lang ? lang : key;
            input.onchange=(e:Event)=>{
                if(!e) return;
                const value=(e.currentTarget as HTMLInputElement).value;
                if(key==="from"){
                    education.from=value;
                    formGrp.style.order="0"
                }else{
                    education.to=value;
                    formGrp.style.order="1"
                };
            };
        };
        return education;
    };


    fromToInputWorkComponent({parent,order,key,value,less400,index,experience,french}:{parent:HTMLElement,order:number,key:string,value:string,less400:boolean,index:number,experience:workExperienceType,french:boolean}){
        const lang=[{eng:"to",fr:"a"},{eng:"from",fr:"de"}].find(kv=>(kv.eng===key)) as {eng:string,fr:string};
        const css_row="display:flex;justify-content:center;align-items:center;gap:1rem;flex-wrap:nowrap;"
        const css_col="display:flex;justify-content:center;align-items:center;gap:1rem;flex-direction:center;"
        const check=([...parent.children] as HTMLElement[]).map(ch=>ch.id).includes("from-to-cont-1");
        let getDiv:HTMLElement;
        if(!check){
            getDiv=document.createElement("div");
            getDiv.id="from-to-cont-1" + String(index);
            getDiv.style.cssText=css_row + "gap:1rem;width:90%";
            getDiv.style.flexDirection=less400 ? "column":"row";
            getDiv.style.order=String(order);
            parent.appendChild(getDiv);
            
        };
        getDiv=parent.querySelector(`div#${"from-to-cont-1" + String(index)}`) as HTMLElement;
        const count=[...getDiv.children].length;
        if(count <=1){

            const {input,label,formGrp}=EditResume.inputComponent(getDiv);
            formGrp.style.cssText=css_col +"gap:1rem;position:relative;align-items:center;";
            formGrp.style.flex=less400 ? " 1 0 100%":"1 0 50%";
            formGrp.style.width=less400 ? "100%":"50%";
            
            input.id=`${key}`;
            input.type="number";
            input.name="work-"+ key + "-" + String(index);
            input.style.width="";
            input.value=value as string;
            input.placeholder=langInserts({french,key}).place;
            label.setAttribute("for",input.id);
            label.textContent=french && lang ? lang.fr : key;
            input.onchange=(e:Event)=>{
                if(!e) return;
                const value=(e.currentTarget as HTMLInputElement).value;
                if(key==="from"){
                    experience.from=value;
                    formGrp.style.order="0"
                }else{
                    experience.to=value;
                    formGrp.style.order="1"
                };
            };
        };
        return experience;
    };


    educateSkills({parent,order,css_col,key,less400,education,french}:{parent:HTMLElement,order:number,css_col:string,less400:boolean,key:string,education:educationType,french:boolean}):educationType{
        const css_row="display:flex;flex-wrap:nowrap;justify-content:center;align-items:center;ga:0.5rem;"
        const skillsComp=document.createElement("div");
        skillsComp.id="skills-comp";
        skillsComp.style.cssText=css_col + "width:100%;margin-block:1rem;position:relative";
        skillsComp.style.order=String(order);
        parent.appendChild(skillsComp);
        this.addRemove.addEducateSkill({
            parent:skillsComp,
            education,
            css_col,
            less400,
            french,
            key,
            func:(education)=>{
                Resume.cleanUpById({parent,id:"skills-comp"});
                this.educateSkills({parent,order,css_col,key,less400,education,french});
            }
        });
        education.skills=education.skills.map((skill,index)=>{
            if(skill){
                const {input,label,formGrp}=EditResume.inputComponent(skillsComp);
                formGrp.id=`formGrp-skill-${index}`
                formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;";
                formGrp.style.width=less400 ? "100%":"80%";
                input.id=`${key}-${index}`;
                input.name="skill-" + key + String(index);
                input.value=skill as string;
                input.style.width=less400 ? "75%":"50%";
                label.setAttribute("for",input.id);
                label.textContent=french ? "compétence":"skill";
                input.onchange=(e:Event)=>{
                    if(!e) return;
                    const value=(e.currentTarget as HTMLInputElement).value;
                    education.skills[index]=value;
                };
                this.addRemove.removeEducateSkill({
                    target:formGrp,
                    skill,
                    education,
                    css_row,
                    key,
                    less400,
                    func:(education)=>{
                        Resume.cleanUpById({parent,id:"skills-comp"});
                        this.educateSkills({parent,order,css_col,key,less400,education,french});
                    }
                });
            }
            return skill;
        });
        return education;
    };


    workSkills({formChild,order,css_col,key,less400,experience,french}:{formChild:HTMLElement,order:number,css_col:string,less400:boolean,key:string|undefined,experience:workExperienceType,french:boolean}):workExperienceType{
        const css_row="display:flex;flex-wrap:nowrap;justify-content:center;align-items:center;ga:0.5rem;position:relative;"
        const skillsComp=document.createElement("div");
        skillsComp.id="skills-work-comp";
        skillsComp.style.cssText=css_col + "width:100%;margin-block:1rem;position:relative;";
        skillsComp.style.order=String(order);
        formChild.appendChild(skillsComp);
        this.addRemove.addWorkSkill({
            parent:skillsComp,
            experience,
            css_col,
            less400,
            french,
            func:(experience)=>{
                Resume.cleanUpById({parent:formChild,id:"skills-work-comp"});
                this.workSkills({formChild,order,css_col,key,less400,experience,french});
            }
        });
        if(experience.skills && experience.skills.length>0){
            experience.skills=experience.skills.map((skill,index)=>{
                if(skill){
                    const lang=langConversion({key:"skill"});
                    const {input,label,formGrp}=EditResume.inputComponent(skillsComp);
                    formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;";
                    formGrp.style.width=less400 ? "100%":"80%";
                    input.id=`${key}-${index}`;
                    input.name="skill-" + key + String(index);
                    input.value=skill as string;
                    input.style.width=less400 ? "75%":"50%";
                    label.setAttribute("for",input.id);
                    label.textContent=french && lang ? lang:"skill";
                    this.addRemove.removeWorkSkill({
                        target:formGrp,
                        skill,
                        experience,
                        css_row,
                        less400,
                        key: key ||"skill",
                        func:(experience)=>{
                            Resume.cleanUpById({parent:formChild,id:"skills-work-comp"});
                            this.workSkills({formChild,order,css_col,key,less400,experience,french});
                        }
                    });
                    input.oninput=(e:Event)=>{
                        if(!e) return;
                        const value=(e.currentTarget as HTMLInputElement).value;
                        experience.skills[index]=value;
                    };
                }
                return skill;
            }) ;
        }
        return experience;
    };


    educationParticulars({parent,order,key,value,index,education,less400,french}:{parent:HTMLElement,order:number,key:string,value:string,index:number,education:educationType,less400:boolean,french:boolean}):educationType{
        const lang=langConversion({key});
        const css_col="display:flex;justify-content:flex-start;align-items:center;gap:1rem;flex-direction:column;padding-inline:1rem;";
        const particularCont=document.createElement("div");
        particularCont.id="particular-cont";
        particularCont.style.cssText=css_col + `width:100%;margin-inline;margin-block:0.5rem;order:${order}`;
        parent.appendChild(particularCont);
        const {input,label,formGrp}=EditResume.inputComponent(particularCont);
        const check=["relevantWork","extracurricular"].includes(key);
        if(check){
            formGrp.style.cssText=css_col +"gap:1rem;position:relative;align-items:center;";
            
        }else{
            formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;";
        };
        formGrp.style.width=less400 ? "90%":"70%";
        input.id=`${key}`;
        input.name="education-" + key + "-" + String(index);
        input.value=value as string;
        input.style.width="";
        label.setAttribute("for",input.id);
        label.textContent=french && lang ? lang :key;
        
        input.onchange=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLInputElement).value;
            switch(true){
                case key==="school":
                    education.school=value;
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
        return education
    };

  

    createExtra({parent,resume,css_col,css_row,order,less400,show,french}:{parent:HTMLElement,resume:resumeType,css_col:string,css_row:string,order:number,less400:boolean,show:boolean,french:boolean}):resumeType{
        if(show){
            const extraCont=document.createElement("div");
            extraCont.id="extra-cont-languages";
            extraCont.style.cssText=css_col + "margin-inline:auto;padding-block:1rem;margin-block:1.5rem;position:relative";
            extraCont.style.width=less400 ? "80%":"50%";
            extraCont.style.order=String(order);
            parent.appendChild(extraCont);
            this.addRemove.addLanguage({
                parent:extraCont,
                resume,
                css_col,
                less400,
                french,
                func:(resume)=>{
                    Resume.cleanUpById({parent,id:"extra-cont-languages"});
                    this.createExtra({parent,resume,css_col,css_row,less400,order,show,french});
                }
            });
            resume.extra.languages=resume.extra.languages.map((lang,index)=>{
                if(lang){
                    const lang_=langConversion({key:"language"})
                    const {input,label,formGrp}=EditResume.inputComponent(extraCont);
                    formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;";
                    formGrp.id=`formGrp-extra-${index}`;
                    formGrp.style.width=less400 ? "100%":"80%";
                    input.id=`lang-${index}`;
                    input.name="lang-" + String(index);
                    input.value=lang ;
                    input.style.width=less400 ? "75%":"50%";
                    label.setAttribute("for",input.id);
                    label.textContent=french ?  lang_ :"Language";
                    input.oninput=(e:Event)=>{
                        if(!e) return;
                        const value=(e.currentTarget as HTMLInputElement).value;
                        resume.extra.languages[index]=value;
                    };
                    this.addRemove.removeLanguage({
                        target:formGrp,
                        resume,
                        lang,
                        index,
                        func:(resume)=>{
                            Resume.cleanUpById({parent,id:"extra-cont-languages"});
                            this.createExtra({parent,resume,css_col,css_row,less400,order,show,french});
                        }
                    })
                };
                return lang;
            });
            CreateResume.hideShow({target:extraCont,show,time:1100});
        }else{
            const getExtra=parent.querySelector("div#extra-cont-languages") as HTMLElement;
            CreateResume.hideShow({target:getExtra,show,time:1100});

        }

        return resume
    };

    referenceComponent({parent,reference,less400,french}:{parent:HTMLElement,reference:resumeRefType,less400:boolean,french:boolean}){
        const css_col="display:flex;justify-content:flex-start;align-items:center;gap:1rem;flex-direction:column;padding-inline:1rem;";
        const css_row="display:flex;justify-content:flex-start;align-items:center;gap:1rem;flex-wrap:wrap;padding-inline:1rem;";
        const referenceCont=document.createElement("div");
        referenceCont.id="particular-cont";
        referenceCont.style.cssText=css_col + `width:100%;margin-inline;margin-block:0.5rem;`;
        parent.appendChild(referenceCont);
       
        for(const [key,value] of Object.entries(reference)){
            const rand=Math.floor(Math.random()*100);
            const check=["id","links","desc","res_name_id","contacts"].includes(key);
            if(!check){
                const {input,label,formGrp}=EditResume.inputComponent(referenceCont);
                const lang=langConversion({key});
                label.id=String(rand);
                formGrp.style.cssText=css_col +"gap:1rem;position:relative;align-items:center;";
                formGrp.style.width=less400 ? "90%":"70%";
                if(key==="name")  formGrp.style.order="0";
                if(key==="composite")  formGrp.style.order="1";
                if(key==="mainLink")  formGrp.style.order="2";
                input.id="reference-" + key;
                input.name="reference-" + key;
                input.value=value as string;
                input.style.width="";
                label.setAttribute("for",input.id);
                label.textContent=french ? lang :key;
                input.onchange=(e:Event)=>{
                    if(!e) return;
                    const value=(e.currentTarget as HTMLInputElement).value;
                    switch(true){
                        case key==="name":
                            reference.name=value;
                        break;
                        case key==="composite":
                            reference.composite=value;
                        break;
                        case key==="mainLink":
                            reference.mainLink=value;
                        break;
                        default:
                            break;
                    }
                };
            }else{

                reference=this.referenceContact({
                    parent:referenceCont,
                    reference,
                    key,
                    order:5,
                    css_row,
                    css_col,
                    less400,
                    french

                });
            }
        };
        reference=this.referenceLink({parent:referenceCont,reference,order:6,css_row,css_col,less400,french});
       
        
        return reference
    };


    referenceLink({parent,reference,css_row,css_col,order,less400,french}:{parent:HTMLElement,reference:resumeRefType,css_row:string,css_col:string,order:number,less400:boolean,french:boolean}){
        const lang=langConversion({key:"ref links"});
        const refLinkCont=document.createElement("div");
        refLinkCont.id="ref-link-cont";
        refLinkCont.className=styles.css_col;
        refLinkCont.style.order=String(order);
        const name=document.createElement("h6");
        name.className="text-center my-1 my-2 text-primary display-6 lean";
        name.style.fontSize="130%";
        name.style.textTransform="Capitalize";
        name.textContent=french ? lang : "ref links";
        refLinkCont.appendChild(name);
        parent.appendChild(refLinkCont);
        this.addRemove.addReflink({
            parent:refLinkCont,
            reference,
            less400,
            func:(reference)=>{
                Resume.cleanUpById({parent,id:"ref-link-cont"});
                this.referenceLink({parent,reference,css_row,order,css_col,less400,french});
            }
        });
     
            reference.links=reference.links.map((link,index)=>{
               
                const row=document.createElement("div");
                row.id="link-row";
                row.style.cssText=css_row + "margin-inline:auto;position:relative;";
                row.style.flexDirection=less400 ? "column":"row";
                row.style.alignItems=less400 ? "center":"";
                refLinkCont.appendChild(row);
                this.addRemove.removeReflink({
                    target:row,
                    reference,
                    link,
                    less400,
                    func:(reference)=>{
                        Resume.cleanUpById({parent,id:"ref-link-cont"});
                        this.referenceLink({parent,reference,css_row,order,css_col,less400,french});
                    }
                });
    
                for(const [key,value] of Object.entries(link)){
                    if(typeof(key)==="string" && typeof(value)==="string"){
                        const lang=langConversion({key});
                        const {input,label,formGrp}=EditResume.inputComponent(row);
                        formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;";
                        formGrp.id=`formGrp-link-key-${index}-${key}`;
                        formGrp.id=`formGrp-link-key-${index}-${key}`;
                        if(key==="name"){
                            formGrp.style.flex=less400 ? "0 0 100%": " 1 0 30%";
                        }else{
                            formGrp.style.flex=less400 ? "0 0 100%": " 1 0 auto";
                        }
                        input.id=`link-key-${index}`;
                        input.name="link-key" + String(index);
                        input.value=value;
                        input.style.width="auto";
                        label.setAttribute("for",input.id);
                        label.textContent=french ? lang :key;
                        input.onchange=(e:Event)=>{
                            if(!e) return;
                            const value=(e.currentTarget as HTMLInputElement).value;
                            if(key==="name"){
                                link.name=value
                            }else{
                                link.link=value;
    
                            }
                        };
                    };
                };
    
                return link;
            });
      
        return reference;
        
    };



    referenceContact({parent,reference,key,css_row,css_col,order,less400,french}:{parent:HTMLElement,reference:resumeRefType,key:string,css_row:string,css_col:string,order:number,less400:boolean,french:boolean}){
        const len=reference?.contacts?.length;
        Resume.cleanUpById({parent,id:"ref-contact-cont"});
        const refContactCont=document.createElement("div");
        refContactCont.id="ref-contact-cont";
        refContactCont.className=styles.css_col;
        refContactCont.style.order=String(order);
        const name=document.createElement("h6");
        name.className="text-center my-1 my-2 text-primary display-6 lean";
        name.style.fontSize="130%";
        name.style.textTransform="Capitalize";
        name.textContent=french ? langConversion({key:"réf Contacts"}):"ref Contacts";
        refContactCont.appendChild(name);
        parent.appendChild(refContactCont);
        this.addRemove.addRefContact({
            parent:refContactCont,
            reference,
            css_col,
            less400,
            french,
            func:(reference)=>{
                Resume.cleanUpById({parent,id:"ref-contact-cont"});
                this.referenceContact({parent,reference,key,css_row,order,css_col,less400,french});
            }
        });
     
    if(len >0){

        reference.contacts=reference.contacts.map((contact,index)=>{
            if(contact){

                contact.id=index;
                const row=document.createElement("div");
                row.id="contact-row";
                row.style.cssText=css_row + "margin-inline:auto;position:relative;gap:0.75rem;";
                row.style.flexWrap="wrap";
                row.style.flexDirection=less400 ? "column":"row";
                row.style.alignItems=less400 ? "center":"";
                refContactCont.appendChild(row);
                this.addRemove.removeRefContact({
                    target:row,
                    reference,
                    contact,
                    css_col,
                    less400,
                    func:(reference)=>{
                        Resume.cleanUpById({parent,id:"ref-contact-cont"});
                        this.referenceContact({parent,reference,key,css_row,order,css_col,less400,french});
                    }
                });
    
               
                for(const [key,value] of Object.entries(contact)){
                    if(typeof(key)==="string" && typeof(value)==="string" && key !=="id"){
                      
                        const {input,label,formGrp}=EditResume.inputComponent(row);
                        formGrp.style.cssText=css_col +"width:auto;gap:1rem;position:relative;align-items:center;";
                        formGrp.id=`formGrp-contact-key-${index}-${key}`;
                        formGrp.style.order=String(index);
                        formGrp.style.flex=less400 ? "0 0 100%": " 1 0 auto";
                        input.id=`contact-key-${index}`;
                        input.name="contact-key" + String(index);
                        input.value=value;
                        if(key==="name") input.autocomplete="name";
                        if(key==="address") input.autocomplete="on";
                        if(key==="cell") input.autocomplete="tel";
                        if(key==="email") input.autocomplete="email";
                       
                        input.placeholder=key;
                        input.style.width="auto";
                        label.setAttribute("for",input.id);
                        label.textContent=french ? langConversion({key}):key;
                        label.style.textTransform="uppercase";
                        input.onchange=(e:Event)=>{
                            if(!e) return;
                            const value=(e.currentTarget as HTMLInputElement).value;
                            if(key==="name"){
                                contact.name=value
                            }else if(key==="address"){
                                contact.address=value;
                            }else if(key==="city"){
                                contact.city=value;
                            }else if(key==="PO"){
                                contact.PO=value;
                            }else if(key==="cell"){
                                contact.cell=value;
                            }else if(key==="email"){
                                contact.email=value;
                            }
                        };
                    };
                };
            }

            return contact;
        });
    }
        
        // console.log(reference);//works
        return reference;
    };


};
export default FormComponents;
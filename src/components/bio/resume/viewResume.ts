import Service from "@/components/common/services";
import DeleteClass from "./deleteClass";
import Reference from "./viewReference";
import { awardType, contactType, educationType, mainResumeType, miscType, nameRefType, nameResumeType, resumeType, workExperienceType } from "./refTypes";
import Resume from "./resume";
import styles from "./viewResume.module.css";
import { langConversion } from "./engFre";
import PrintResume from "@/components/printResume/printresume";



class ViewResume {
    public rowId:string;
    public containerId:string;
    public show:boolean;
    private _nameRefs:nameRefType[];
    private _resumeData:resumeType;
    private _nameResume:nameResumeType;
    private _nameResumes:nameResumeType[];
    private _mainResume:mainResumeType;
    private _mainResumes:mainResumeType[];
    constructor(private _service:Service,public resumeRef:Reference,public deleteClass:DeleteClass){
        this.rowId="";
        this.containerId="";
        this._nameResumes=[] as nameResumeType[];
        this._nameRefs=[] as nameRefType[];
        this._nameResume={} as nameResumeType;
        this._resumeData={} as resumeType;
        this._mainResume={} as mainResumeType;
        this._mainResumes=[] as mainResumeType[];
        this.show=false;
    };

    //--------GETTERS SETTERS----------//
    get resumeData(){
        return this._resumeData
    };
    set resumeData(resumeData:resumeType){
        this._resumeData=resumeData;
    };
    get mainResume(){
        return this._mainResume;
    };
    set mainResume(mainResume){
        this._mainResume=mainResume;
    }
    get mainResumes(){
        return this._mainResumes;
    };
    set mainResumes(mainResumes){
        this._mainResumes=mainResumes;
    };
    get nameResume(){
        return this._nameResume;
    };
    set nameResume(nameResume:nameResumeType){
        this._nameResume=nameResume;
    };
    get nameResumes(){
        return this._nameResumes;
    };
    set nameResumes(nameResumes:nameResumeType[]){
        this._nameResumes=nameResumes;
    };
    get nameRef(){
        return this.resumeRef.nameRef;
    };
    set nameRef(nameRef:nameRefType){
        this.resumeRef.nameRef=nameRef;
    };
    get nameRefs(){
        return this._nameRefs;
    };
    set nameRefs(nameRefs:nameRefType[]){
        this._nameRefs=nameRefs;
        this.resumeRef.nameRefs=nameRefs;
    };


    //--------GETTERS SETTERS----------//

async showResume({parent,mainResume,french,func1}:{parent:HTMLElement,mainResume:mainResumeType|undefined,french:boolean,
    func1:(mainResumes:mainResumeType[],nameResumes:nameResumeType[])=>Promise<void>|void
}){
    
    this.storeMainResume({mainResume});
    
    if(mainResume){
        this.resume({parent,mainResume,showPrint:true,closeDelete:false,french,func1});
    }
    
};


//FROM SIDEBAR
copyLinkFromSidebar({parent,mainResumes}:{parent:HTMLElement,mainResumes:mainResumeType[]}){
    //SHOW W/o TO INSERT
    //SHOW LIST
    parent.style.position="relative";
    const popup=document.createElement("div");
    popup.id="popup-viewResume";
    popup.className=styles.popupFromSidebar;
    Resume.deletePopup({parent,target:popup});
    parent.appendChild(popup);
    if(mainResumes){
        mainResumes?.map((mainResume,index)=>{
            if(mainResume){
                const {name:_name,enable:enabled}=mainResume;
                let count=0;
                const row=document.createElement("div");
                row.className=styles.fromeSidebarRow;
                row.setAttribute("data-innerRow",`view ${_name}`);
                row.id="row";
                row.style.order=String(index);
                for(const [key,value] of Object.entries(mainResume)){
                    count++;
                    const check=["id","resume","user_id","french"].includes(key);
                    if(!check && typeof(value) !=="object"){
                        const StrValue=String(value);
                        const innerRow=document.createElement("div");
                        innerRow.id="row-innerRow-"+ String(count);
                        innerRow.className=styles.sidebarRowInnerRow;
                        innerRow.style.order=String(count);
                        const name=document.createElement("h6");
                        name.className="text-primary text-center";
                        name.style.cssText="font-size:110%;";
                        name.textContent=key;
                        innerRow.appendChild(name);
                        const nameValue=document.createElement("h6");
                        nameValue.textContent=StrValue;
                        innerRow.appendChild(nameValue);
                        row.appendChild(innerRow);
                        if(key==="enable" && value){
                            const btn=document.createElement("button");
                            btn.id="btn";
                            btn.className=styles.btn;
                            btn.setAttribute("data-sidebar-btn","copy link");
                            btn.textContent="copy link";
                            row.appendChild(btn);
                            btn.onclick=(e:MouseEvent)=>{
                                if(!e) return;
                                const {name}=mainResume;
                                const url=new URL(`showResume/${name}`,location.origin);
                                navigator.clipboard.writeText(url.href);
                                Resume.message({parent,msg:"copied",type:"success",time:800});
                                setTimeout(()=>{parent.removeChild(popup)},800);
                            };
                        };
                        innerRow.onclick=(e:MouseEvent)=>{
                            if(!e) return;
                            parent.style.overflowY="scroll";
                            const {french}=mainResume;
                            const rows=popup.querySelectorAll("div#row");
                            rows.forEach(_row=>{
                                popup.removeChild(_row);
                            });
                            this.resume({
                                parent:popup,
                                mainResume,
                                showPrint:false,
                                closeDelete:true,
                                french,
                                func1:()=>{},
                            });
                            if(enabled){

                                const btn=document.createElement("button");
                                    btn.id="btn";
                                    btn.className=styles.btnNormal;
                                    btn.setAttribute("data-sidebar-btn","copy link");
                                    btn.textContent="copy link";
                                    popup.appendChild(btn);
                                    btn.onclick=(e:MouseEvent)=>{
                                        if(!e) return;
                                        const {name}=mainResume;
                                        const url=new URL(`showResume/${name}`,location.origin);
                                        navigator.clipboard.writeText(url.href);
                                        Resume.message({parent,msg:"copied",type:"success",time:800});
                                        setTimeout(()=>{parent.removeChild(popup)},800);
                                        
                                    };
                                };
                            }
                        }
                       
                }
                popup.appendChild(row);
    
            }
        });
    }else{
        Resume.message({parent,msg:"sorry you have no resumes from resumeBuilder",type:"warning",time:2500});
    }

}




storeMainResume({mainResume}:{mainResume:mainResumeType|undefined}):{nameResumes:nameResumeType[],mainResumes:mainResumeType[]}{
    if(mainResume){
            const {name,user_id,enable,id,french}=mainResume;
            this.mainResume=mainResume;
            const hasMain=this.mainResumes.find(res=>(res.name===mainResume.name));
            this.nameResume={id:id as number,name,user_id,enable,french};
            this.nameResumes=this.mainResumes.map(res=>({id:res.id as number,name:res.name,user_id:res.user_id,enable:res.enable,french:res.french}));
            if(hasMain){
                const remain=this.mainResumes.filter(res=>(res.name !==hasMain.name));
                this.mainResumes=[...remain,mainResume];
            }else{
                this.mainResumes=[...this.mainResumes,mainResume];
                this.nameResumes=[...this.nameResumes,this.nameResume];
            };
    }

    return {mainResumes:this.mainResumes,nameResumes:this.nameResumes}
};





resume({parent,mainResume,showPrint,closeDelete,french,func1}:{parent:HTMLElement,mainResume:mainResumeType,showPrint:boolean,closeDelete:boolean,french:boolean,
    func1:(mainResumes:mainResumeType[],nameResumes:nameResumeType[])=>Promise<void>|void
}){
    const less900=window.innerWidth <900;
    const less400=window.innerWidth <400;
    const time=700;
    const lineWidth=less900 ? (less400 ? "100%":"90%"):"75%";
    const css_col="display:flex;flex-direction:column;";
    const css_row="display:flex;flex-wrap:nowrap;align-items:center;";

    parent.style.cssText=css_col + "margin-inline:auto;align-items:center";
    parent.style.maxWidth=less900 ? (less400 ? "375px":"760px"):"1400px";
    parent.style.paddingInline=less900 ? (less400 ? "5px":"3.5rem"):"4rem";
    parent.style.width="100%";
    const {resume}=mainResume;
    const contact=resume.contact;
    const sites=resume.sites;
    const experData=resume.workExperience;
    const educDataArr=resume.education;
    const extra=resume.extra;
    const summary=resume.summary;
    const filename=this.nameRef?.res_name_id ? resume.name:undefined;
    const mainCont=document.createElement("section");
    mainCont.id="resume-mainCont";
    mainCont.style.cssText=css_col + "position:relative;margin-inline:auto;align-self:center;justify-self:center;";
    mainCont.style.alignItems="stretch";
    mainCont.style.width="100%";
   
    this.header({parent:mainCont,css_col,css_row,less400,less900,contact,sites,filename,french});
    this.summaryCont({parent:mainCont,less400,less900,css_col,summary,french});
    //experience button
    const experienceCont=document.createElement("div");
    experienceCont.id="experience-cont";
    experienceCont.style.cssText=css_col + "justify-content:center;align-items:center;width:100%;";
    mainCont.appendChild(experienceCont);
    this.showHideWorkExp({parent:experienceCont,less400,less900,experData,css_col,css_row,time,show:this.show,lineWidth,french});
    const educateCont=document.createElement("div");
    educateCont.id="educate-cont";
    educateCont.style.cssText=css_col + "width:100%";
    mainCont.appendChild(educateCont);
    this.showHideEducate({
        parent:educateCont,
        less400,
        less900,
        css_col,
        css_row,
        educDataArr,
        show:this.show,
        time,
        lineWidth,
        french

    });
   this.languages({parent:mainCont,extra:extra,french});
   
    const btnDiv=document.createElement("div");
    btnDiv.id="btn-div";
    btnDiv.style.cssText=css_row +"margin-inline:auto;margin-block:2rem;justify-content:center;gap:1.5rem;";
    if(showPrint){
        const lang=langConversion({key:"print"});
        const text_=french && lang ? lang: "print";
        const {button:print}=Resume.simpleButton({anchor:btnDiv,bg:"black",color:"white",text:text_,time:400,type:"button"});
     
         print.onclick=(e:MouseEvent)=>{
             if(!e) return;
             const headerInjector=document.querySelector("div#headerInjector") as HTMLElement;
             const footerInjector=document.querySelector("section#footerInjector") as HTMLElement;
            const grandparent=document.querySelector("section#resume") as HTMLElement;
            if(!grandparent || !footerInjector || !headerInjector) return;
            footerInjector.hidden=true;
            headerInjector.hidden=true;
            Resume.cleanUp(grandparent);
            this.printResume({parent:grandparent,resume,french});
             window.print();
            const url=new URL("/bio",location.origin);
             window.location.href=url.href;
         };
     
    }
    
    mainCont.appendChild(btnDiv);
    this.deleteClass.rowId=this.rowId;
    if(!closeDelete){
        this.deleteClass.deleteResume({parent,target:mainCont,mainResume,french,
            func:({mainResumes,nameResumes})=>{
                this.mainResumes=mainResumes;
                this.nameResumes=nameResumes;
                func1(mainResumes,nameResumes)
            }
            })

    }
    parent.appendChild(mainCont);
};



printResume({parent,resume,french}:{parent:HTMLElement,resume:resumeType,french:boolean}){
    const less900=window.innerWidth <900;
    const less400=window.innerWidth <400;
    const css_col="display:flex;flex-direction:column;";
    const css_row="display:flex;flex-wrap:nowrap;align-items:center;";

    parent.style.cssText=css_col + "margin-inline:auto;align-items:center";
    parent.style.maxWidth=less900 ? (less400 ? "375px":"760px"):"1400px";
    parent.style.paddingInline=less900 ? (less400 ? "5px":"3.5rem"):"4rem";
    parent.style.width="100%";
   
    const contact=resume.contact;
    const sites=resume.sites;
    const experData=resume.workExperience;
    const educDataArr=resume.education;
    const extra=resume.extra;
    const summary=resume.summary;
    const filename=this.nameRef?.res_name_id ? resume.name:undefined;
    const mainCont=document.createElement("section");
    mainCont.id="resume-mainCont";
    mainCont.style.cssText=css_col + "position:relative;margin-inline:auto;align-self:center;justify-self:center;";
    mainCont.style.alignItems="stretch";
    mainCont.style.width="100%";
   
        this.header({parent:mainCont,css_col,css_row,less400,less900,contact,sites,filename,french});
    this.summaryCont({parent:mainCont,less400,less900,css_col,summary,french});
    //experience button
    const experienceCont=document.createElement("div");
    experienceCont.id="experience-cont";
    experienceCont.style.cssText=css_col + "justify-content:center;align-items:center;width:100%;";
    mainCont.appendChild(experienceCont);
    this.experience({
        parent:experienceCont,
        less400,
        less900,
        css_col,
        css_row,
        experData,
        show:true,
        time:0,
        isPrint:true,
        french

    });
    const educateCont=document.createElement("div");
    educateCont.id="educate-cont";
    educateCont.style.cssText=css_col + "width:100%";
    mainCont.appendChild(educateCont);
    this.education({
        parent:experienceCont,
        less400,
        less900,
        css_col,
        css_row,
        educDataArr,
        show:true,
        time:0,
        isPrint:true,
        french

    });
    this.languages({parent:mainCont,extra,french});
    parent.appendChild(mainCont);
};


showHideEducate({parent,time,show,css_row,css_col,less400,less900,educDataArr,lineWidth,french}:{
    parent:HTMLElement,
    time:number,
    show:boolean,
    educDataArr:educationType[],
    less400:boolean,
    less900:boolean,
    css_col:string,
    css_row:string,
    lineWidth:string
    french:boolean,
}){
    Resume.lineDivison({parent:parent,width:lineWidth,background:"blue"});
    const showHideExperience=document.createElement("div");
    showHideExperience.id="show-hide-experience-cont";
    showHideExperience.className=styles.showHideExperience;
    const title=document.createElement("h4");
    title.textContent=french ? langConversion({key:"education"}):"EDUCATION";
    title.style.cssText="text-transform:uppercase;";
    title.className="text-primary display-6";
    parent.appendChild(showHideExperience);
    showHideExperience.appendChild(title);
    const _text=french ? langConversion({key:"open"}) : "open";
    const {button}=Resume.simpleButton({anchor:showHideExperience,type:"button",bg:"black",color:"white",text:_text,time:400});
    Resume.lineDivison({parent:parent,width:lineWidth,background:"blue"});
    //experience button
    const experienceCont=document.createElement("div");
    experienceCont.id="experience-cont";
    experienceCont.style.cssText=css_col + "width:100%";
    parent.appendChild(experienceCont);
    button.onclick=(e:MouseEvent)=>{
        if(!e)return;
        if(!show){
            show=true;
            button.textContent=french ? "fermer":"close";
            title.style.opacity="0";
            title.style.transition="opacity 1s ease-in-out";
            this.education({
                parent:experienceCont,
                less400,
                less900,
                css_col,
                css_row,
                educDataArr,
                show,
                time,
                isPrint:false,
                french
            });
        }else{
            show=!show;
            title.style.opacity="1";
            title.style.transition="opacity 1s ease-in-out";
            button.textContent=french ? langConversion({key:"open"}):"open";
            this.education({
                parent:experienceCont,
                less400,
                less900,
                css_col,
                css_row,
                educDataArr,
                show,
                time,
                isPrint:false,
                french

            });
        }
    };

    
};


showHideWorkExp({parent,time,show,css_row,css_col,less400,less900,experData,lineWidth,french}:{
    parent:HTMLElement,
    time:number,
    show:boolean,
    experData:workExperienceType[],
    less400:boolean,
    less900:boolean,
    css_col:string,
    css_row:string,
    lineWidth:string,
    french:boolean
}){
    const showHideOuter=document.createElement("div");
    showHideOuter.id="show-hide-outer-cont";
    showHideOuter.className=styles.showHideOuter;
    const showHideExperience=document.createElement("div");
    showHideExperience.id="show-hide-experience-cont";
    showHideExperience.className=styles.showHideExperience;
    Resume.lineDivison({parent:showHideOuter,width:lineWidth,background:"blue"});
    const title=document.createElement("h4");
    const lang=langConversion({key:"experience"})
    title.textContent=french && lang ? lang :"experience";
    title.className="text-primary display-6 mx-0";
    title.style.textTransform="uppercase";
    showHideOuter.appendChild(showHideExperience);
    parent.appendChild(showHideOuter);
    showHideExperience.appendChild(title);
    const lang1=langConversion({key:"open"});
    const text_=french && lang1 ? lang1 : "open";
    const {button}=Resume.simpleButton({anchor:showHideExperience,type:"button",bg:"black",color:"white",text:text_,time:400});
    Resume.lineDivison({parent:showHideOuter,width:lineWidth,background:"blue"});
    //experience button
    const experienceCont=document.createElement("div");
    experienceCont.id="experience-cont";
    experienceCont.style.cssText=css_col + "width:100%;align-items:stretch;";
    parent.appendChild(experienceCont);
    experienceCont.style.alignItems="";
    button.onclick=(e:MouseEvent)=>{
        if(!e)return;
        if(!show){
            const lang=langConversion({key:"hide"});
            show=!show;
            title.style.opacity="0";
            title.style.transition="opacity 1s ease-in-out";
            button.textContent=french && lang ? lang : "hide";
            experienceCont.style.alignItems="";
            this.experience({
                parent:experienceCont,
                less400,
                less900,
                css_col,
                css_row,
                experData,
                show,
                time,
                isPrint:false,
                french

            });
        }else{
            const lang=langConversion({key:"open"});
            show=!show;
            title.style.opacity="1";
            experienceCont.style.alignItems="";
            title.style.transition="opacity 1s ease-in-out";
            button.textContent=french && lang ? lang : "open";
            this.experience({
                parent:experienceCont,
                less400,
                less900,
                css_col,
                css_row,
                experData,
                show,
                time,
                isPrint:false,
                french

            });
        }
    };
    showHideExperience.style.alignItems="";
    
};
 
showCombined({parent,resume,showHeader,isPrint,french}:{parent:HTMLElement,resume:resumeType,showHeader:boolean,isPrint:boolean,french:boolean}){
    const {sites,contact,workExperience,education,extra,summary}= resume;
    const less900=window.innerWidth <900;
    const less400=window.innerWidth <400;
    const time=2000;
    const css_col="display:flex;flex-direction:column;";
    const css_row="display:flex;flex-wrap:nowrap;align-items:center;";
    const container=document.createElement("div");
    container.id="resume-container";
    container.style.cssText=css_col + "width:100%;margin-inline:0;";
    parent.appendChild(container);
    if(showHeader){
        
         const filename=this.nameRef?.res_name_id ? resume.name:undefined;
        this.header({parent:container,less400,less900,css_col,css_row,contact,sites,filename,french});
    };
    this.summaryCont({parent:container,less400,less900,css_col,summary,french});
    this.experience({parent:container,less400,less900,css_col,css_row,experData:workExperience,time,show:true,isPrint,french});
    this.education({parent:container,less400,less900,css_col,css_row,educDataArr:education,time,show:true,isPrint,french});
    this.languages({parent:container,extra,french});
    
};

languages({parent,extra,french}:{parent:HTMLElement,extra:miscType,french:boolean}){
    ViewResume.divider({parent,width:75});
    const lang_=langConversion({key:"languages"});
    const extraContLang=document.createElement("div");
    extraContLang.id="extra-cont";
    extraContLang.className=styles.extraContLang;
    const languages=document.createElement("div");
    const lang=document.createElement("h6");
    lang.textContent=french ? lang_ :"Languages";
    lang.className="display-6 text-primary mx-0";
    lang.style.cssText="margin-bottom:1rem;text-transform:uppercase;margin-inline:0;";
    languages.appendChild(lang);
    extraContLang.appendChild(languages);
    const ul=document.createElement("ul");
    ul.id="ul-cont";
    ul.className=styles.ulCont;
    extraContLang.appendChild(ul);
    extra.languages.map((item,index)=>{
        const li=document.createElement("li");
        li.id=`lang-${index}`;
        li.textContent=item;
        ul.appendChild(li);
    });
    parent.appendChild(extraContLang);
    ViewResume.divider({parent,width:75});
}

experience({parent,less400,less900,css_col,css_row,experData,time,show,isPrint,french}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,css_row:string,experData:workExperienceType[],time:number,show:boolean,isPrint:boolean,french:boolean}){
    if(show){
        const workExpCont=document.createElement("div");
        workExpCont.id="work-experience-cont";
        workExpCont.className=styles.workExpCont;
      
        const title=document.createElement("h6");
        title.id="title-exp";
        title.className="display-6 my-1 mb-3 lean text-primary";
        title.style.fontSize=less900 ? (less400 ? "175%":"200%"):"225%";
        title.style.textTransform="uppercase;";
        const lang=langConversion({key:"experience"});
        title.textContent=french ? lang :"experience";
        workExpCont.appendChild(title);
        ViewResume.divider({parent:workExpCont,width:75});

        experData.map((exper,index)=>{
            this.experCard({parent:workExpCont,exper,less400,less900,css_col,css_row,index,french});
        });
        parent.appendChild(workExpCont);

    };
    const getWorkCont=parent.querySelector("div#work-experience-cont") as HTMLElement;
    if(!getWorkCont) return;
    this.showHideEffect({parent,target:getWorkCont,show,time,isPrint});
};


education({parent,css_col,less400,less900,css_row,educDataArr,time,show,isPrint,french}:{parent:HTMLElement,css_col:string,css_row:string,less400:boolean,less900:boolean,educDataArr:educationType[],time:number,show:boolean,isPrint:boolean,french:boolean}){
    if(show){
        const lang=langConversion({key:"education"})
        const educationCont=document.createElement("div");
        educationCont.id="main-education";
        educationCont.className=styles.workExpCont;
        const title=document.createElement("h6");
        title.id="education-title";
        title.style.cssText="text-transform:uppercase;margin-block:0rem;";
        title.className="display-6 my-1 mb-3 lean text-primary";
        title.style.fontSize=less900 ? (less400 ? "180%":"210%"):"225%";
        title.textContent=french ? lang : "education";
        //divider
        ViewResume.divider({parent:educationCont,width:75});
        educationCont.appendChild(title);
      
        parent.appendChild(educationCont);
        educDataArr.map((educData,index)=>{
            this.educationCard({parent:educationCont,less400,less900,css_col,css_row,educData,index,french});

        });

    };
    const getEducateCont=parent.querySelector("div#main-education") as HTMLElement;
    if(!getEducateCont) return;
    this.showHideEffect({parent,target:getEducateCont,show,time,isPrint});
};


header({parent,less400,less900,css_col,css_row,contact,sites,filename,french}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,css_row:string,contact:contactType,sites:string[],french:boolean,filename:string|undefined}){
    const cont=document.createElement("div");
    cont.id="header-main";
    cont.className=styles.viewHeaderMain;;
    const nameCont=document.createElement("div");
    nameCont.id="name-cont";
    nameCont.style.width="100%";
    const name=document.createElement("h6");
    name.style.cssText="margin-bottom:0.5rem;margin-top:2rem;";
    name.className="text-primary display-6 my-1";
    name.style.fontSize=less900 ? (less400 ? "150%":"165%"):"185%";
    name.id="name";
    name.textContent=contact.name;
    nameCont.appendChild(name);
    parent.appendChild(nameCont);
    this.addressTitle({parent:cont,less400,less900,contact,filename,french});
    this.siteTitle({parent:cont,less400,less900,css_col,sites,french});
    parent.appendChild(cont);
};



summaryCont({parent,less400,less900,css_col,summary,french}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,summary:string,french:boolean}){
    const lang=langConversion({key:"summary"});
    const summaryCont=document.createElement("div");
    summaryCont.id="summary-cont";
    summaryCont.className=styles.summaryCont;
    const h6=document.createElement("h6");
    h6.className="text-primary my-1 lean display-6";
    h6.textContent=french && lang ? lang :"summary";
    summaryCont.appendChild(h6);
    const para=document.createElement("p");
    para.style.cssText="text-wrap:pretty";
    para.style.fontSize=less900 ? (less400 ? "auto":"105%"):"110%";
    para.textContent=summary;
    summaryCont.appendChild(para);
    parent.appendChild(summaryCont);
};

addressTitle({parent,less400,less900,contact,filename,french}:{less400:boolean,less900:boolean,parent:HTMLElement,contact:contactType,filename:string|undefined,french:boolean}){
    const nameCont=document.createElement("div");
    nameCont.id="address-cont";
    nameCont.className=styles.addressCont
    nameCont.style.cssText="";
    nameCont.style.flex=less400 ? "1 0 100%":"1 0 50%";
    nameCont.style.width=less400 ? "100%":"auto";
    nameCont.style.lineHeight=less900 ? (less400 ? "0.1rem":"0.15rem"):"0.1rem";
    nameCont.style.paddingInline="0";
    
    //add
    const add=document.createElement("p");
    add.className="";
    add.id="address";
    add.textContent=contact.address;
    nameCont.appendChild(add);
    //city
    const city=document.createElement("p");
    city.className="";
    city.id="city";
    city.textContent=contact.city;
    nameCont.appendChild(city);
    //PO
    const PO=document.createElement("p");
    PO.className="";
    PO.id="PO";
    PO.textContent=contact.PO;
    nameCont.appendChild(PO);
    //cell
    const cell=document.createElement("p");
    cell.className="";
    cell.id="cell";
    cell.textContent=contact.cell;
    nameCont.appendChild(cell);
    //email1
    const email1=document.createElement("p");
    email1.className="";
    email1.id="cell";
    email1.textContent=contact.email1;
    nameCont.appendChild(email1);
    //email2
    if(contact.email2){

        const email2=document.createElement("p");
        email2.className="";
        email2.id="cell";
        email2.textContent=contact.email2;
        nameCont.appendChild(email2);
    };
    if(filename){

        const anchor=document.createElement("a");
        const lang=langConversion({key:"resume + reference"})
        const text = french && lang ? lang :"resume + reference"
        const newUrl=new URL(`/showResume/${filename}`,window.location.origin)
        anchor.href=newUrl.href
        anchor.textContent=text;
        anchor.style.order="2"
        nameCont.appendChild(anchor);
        }
    parent.appendChild(nameCont);
};


siteTitle({parent,less400,less900,css_col,sites,french}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,sites:string[],french:boolean}){
    const siteCont=document.createElement("div");
    siteCont.id="site-cont";
    siteCont.style.cssText=css_col
    siteCont.style.flex=less400 ? "1 0 100%":"1 0 50%";
    siteCont.style.width=less400 ? "100%":"auto";
    siteCont.style.paddingInline=less900 ? (less400 ? "0":"10px"):"1rem";
    sites.map((site,index)=>{
        const convertSite=Resume.convertSitename({site})
        const name=convertSite.name
        const anchor=document.createElement("a");
        anchor.id=`anchor-${index}`;
        anchor.style.marginInline=less400 ? "0":"auto";
        anchor.textContent=name;
        anchor.href=convertSite.http;
        siteCont.appendChild(anchor);
    });
    parent.appendChild(siteCont);
};


experCard({parent,exper,less400,less900,css_col,css_row,index,french}:{parent:HTMLElement,exper:workExperienceType,less400:boolean,less900:boolean,css_col:string,css_row:string,index:number,french:boolean}){
    const check=!!(exper?.achievements && exper.achievements?.length>0);
    const expCard=document.createElement("div");
    expCard.id="exper-card-" + String(index);
    expCard.className=styles.expCard;
    expCard.style.paddingInline="0";
    ViewResume.divider({parent:expCard,width:25});
    this.experHeader({parent:expCard,css_row,exper,less400,less900,french});
    //append cardHeader
    const summary=document.createElement("p");
    summary.id="summary";
    summary.className="px-1 py-1";
    summary.style.textWrap="pretty";
    summary.textContent=exper.summary;
    expCard.appendChild(summary);
    const achievCont=document.createElement("div");
    achievCont.id="achiev-cont";
    achievCont.className=styles.achievCont;
 
    const achieveTitle=document.createElement("h6");
    achieveTitle.textContent=french ? langConversion({key:"achievements"}):"achievements";
    achieveTitle.style.cssText="text-transform:capitalize;margin-bottom:0.25rem;margin-left:0;";
    if(check){
        
        exper.achievements.map((achiev,index)=>{
            if(achiev?.achievement.split("").length>0){
                const ind=document.createElement("span");
                ind.textContent=String(index + 1) + ". ";
                achievCont.appendChild(ind);
                this.achievCard({parent:achievCont,achiev,index,french});
            }
        });
        achievCont.appendChild(achieveTitle);
        expCard.appendChild(achievCont);
    }
    this.skillExperContainer({parent:expCard,css_row,expData:exper,less400,french});
    parent.appendChild(expCard);
};


experHeader({parent,less400,less900,exper,css_row,french}:{parent:HTMLElement,less400:boolean,less900:boolean,css_row:string,exper:workExperienceType,french:boolean}){
    const expCardHeader=document.createElement("div");
    expCardHeader.id="exp-card-header";
    expCardHeader.className=styles.expCardHeader;
   

    const title=document.createElement("h6");
    title.id="title";
    title.className="text-primary display-6";
    title.style.cssText="margin-block:0;text-transform:capitalize;";
    title.textContent=exper.title;
    expCardHeader.appendChild(title);
    //---------------------HEADER BODY---------------------------------------//
    const experHeaderBody=document.createElement("div");
    experHeaderBody.className=styles.experHeaderBody;
    expCardHeader.appendChild(experHeaderBody);//APPEND
    //company
    const company=document.createElement("p");
    company.id="company";
    company.className="text-primary";
    company.innerHTML=`<span style=color:blue;>CO: </span>${exper.company}`;
    experHeaderBody.appendChild(company);
    //location
    const location=document.createElement("p");
    location.id="location";
    location.style.textWrap="pretty";
    location.innerHTML=`<span style=color:blue;>LOC: </span>${exper.location}`;
    experHeaderBody.appendChild(location);
    //date
    const dateCont=document.createElement("div");
    dateCont.id="experHeader-date-cont";
    dateCont.className=styles.experHeaderBodyDateContRow;
    const from=document.createElement("span");
    const from_=french ? langConversion({key:"from"}):"from";
    from.id="from";
    from.className="text-primary";
    from.innerHTML=`<span style=color:blue;>${from_}:</span> ${exper.from}`;
    dateCont.appendChild(from);
    const to=document.createElement("span");
    const to_=french ? langConversion({key:"to"}):"to";
    to.id="to";
    to.className="text-primary";
    to.innerHTML=`<span style=color:blue;>${to_}:</span> ${exper.to}`;
    dateCont.appendChild(to);
    experHeaderBody.appendChild(dateCont);
     //---------------------HEADER BODY---------------------------------------//
    //append expCardHeader
    parent.appendChild(expCardHeader);
};

educationCard({parent,less400,less900,css_col,css_row,educData,french,index}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,css_row:string,educData:educationType,french:boolean,index:number}){
        const card=document.createElement("div");
        card.id="education-card-"+ String(index);
        card.className=styles.educateCard;
        ViewResume.divider({parent:card,width:25});
       
        this.educateHeader({parent:card,css_col,css_row,less900,less400,educData,french});
        //extracurricular
        if(educData.extracurricular){
            const word=french ? langConversion({key:"extracurricular"}): "extracurricular";
            const extracurricular=document.createElement("p");
            extracurricular.id="extracurricular";
            extracurricular.className="px-1 py-1";
            extracurricular.style.textWrap="pretty";
            extracurricular.innerHTML=`<span style=color:blue;>${word}: </span>${educData.extracurricular}`;
            card.appendChild(extracurricular);
        }
        this.educateAchieve({parent:card,educData,less400,less900,css_col,french});
        //SKILLs
        this.skillEducContainer({parent:card,css_row,educData,less400,french});
        parent.appendChild(card);
};



skillEducContainer({parent,css_row,educData,less400,french}:{parent:HTMLElement,css_row:string,educData:educationType,less400:boolean,french:boolean}){
    if(educData && educData?.skills && educData.skills?.length >0){

        const skillCont=document.createElement("div");
        skillCont.id="skill-cont";
        skillCont.className=styles.educateSkillRowCont;
        let skills_=["skills"];
        skills_=skills_.concat(educData.skills)
        skills_.map((skill,index)=>{
            const skill_=document.createElement("p");
            skill_.id="skill-" + String(index);
            skill_.style.paddingInline="0.25rem";
            skill_.style.fontSize=less400 ? "90%":"85%";
            if(index===0){
                skill_.style.borderLeft="none";
                skill_.style.textWrap="nowrap";
                const word=french ? langConversion({key:skill}):"skills";
                skill_.style.color="blue";
                skill_.textContent=`${word} : `;
            }else{
                skill_.style.textWrap="wrap";
                skill_.textContent=`${skill},`;
            }
            skillCont.appendChild(skill_);
        });
        parent.appendChild(skillCont);
        };
    }



skillExperContainer({parent,css_row,expData,less400,french}:{parent:HTMLElement,css_row:string,expData:workExperienceType,less400:boolean,french:boolean}){
    if(expData && expData?.skills && expData.skills?.length >0){

        const {skills}=expData;
        const skillCont=document.createElement("div");
        skillCont.id="skill-cont";
        skillCont.className=styles.educateSkillRowCont;
        
        const skills_=["skill"].concat(skills);
        skills_.map((skill,index)=>{
            const skill_=document.createElement("p");
            skill_.id="skill-" + String(index);
            skill_.style.paddingInline="0.25rem";
            skill_.style.fontSize=less400 ? "90%":"85%";
            if(index===0){
                skill_.style.borderLeft="";
                skill_.style.textWrap="nowrap";
                const word=french ? langConversion({key:skill}):"skills";
                skill_.style.color="blue";
                skill_.textContent=`${word} : `;
            }else{
                
                skill_.style.textWrap="wrap";
                skill_.textContent=`${skill},`;
            }
            skillCont.appendChild(skill_);
        });
        parent.appendChild(skillCont);
        
        };

    };


educateHeader({parent,css_col,css_row,less900,less400,educData,french}:{parent:HTMLElement,css_col:string,css_row:string,less900:boolean,less400:boolean,educData:educationType,french:boolean}){
        const cont=document.createElement("div");
        cont.id="education-header";
        cont.className=styles.educHeaderCont;
        const school=document.createElement("h6");
        school.id="school";
        school.className="text-primary display-6";
        school.textContent=educData.school;
        cont.appendChild(school);
        //---------------------HEADER BODY---------------------------------------//
        const experHeaderBody=document.createElement("div");
        experHeaderBody.className=styles.experHeaderBody;
        cont.appendChild(experHeaderBody);//APPEND
        //degree
        const degree=document.createElement("p");
        degree.id="degree";
        degree.innerHTML=`<span style=color:blue;>Deg: </span>${educData.degree}`;
        
        experHeaderBody.appendChild(degree);
        //location
        const location=document.createElement("p");
        location.id="location";
    
        location.innerHTML=`<span style=color:blue;>Loc: </span>${educData.location}`;
        experHeaderBody.appendChild(location);
        //level
        const level=document.createElement("p");
        level.id="level";
        level.innerHTML=`<span style=color:blue;>Lev: </span>${educData.level}`;
    
        experHeaderBody.appendChild(level);
        //date
        const dateCont=document.createElement("div");
        dateCont.id="date-cont";
        dateCont.className=styles.experHeaderBodyDateContRow;
        const from=document.createElement("span");
        const from_=french ? langConversion({key:"from"}):"From";
        from.id="from";
        from.className="text-primary";
        from.innerHTML=`<span style=color:blue;>${from_}:</span> ${educData.from}`;
        dateCont.appendChild(from);
        const to=document.createElement("span");
        const to_=french ? langConversion({key:"to"}):"To";
        to.id="to";
        to.className="text-primary";
        to.innerHTML=`<span style=color:blue;>${to_}:</span> ${educData.to}`;
        dateCont.appendChild(to);
        experHeaderBody.appendChild(dateCont);
        //relevantWork
        if(educData.relevantWork){
            const relevant=document.createElement("p");
            relevant.id="relevant";
            relevant.className=" py-1";
            relevant.innerHTML=`<span style=color:blue;>Relevant to:</span>${educData.relevantWork}`;
            relevant.style.marginBlock=less900 ? (less400 ? "0.45rem":"0.4rem"):"0.5rem";
            experHeaderBody.appendChild(relevant);
        }
        //GPA
        if(educData.GPA){
            const gpa=document.createElement("p");
            gpa.id="gpa";
            gpa.className=" py-1";
            gpa.innerHTML=`<span style=color:blue;>GPA:</span>${educData.GPA}`;
            gpa.style.marginBlock=less900 ? (less400 ? "0.45rem":"0.4rem"):"0.5rem";
            experHeaderBody.appendChild(gpa);
        }
        parent.appendChild(cont);
};


educateAchieve({parent,educData,less400,less900,css_col,french}:{parent:HTMLElement,educData:educationType,css_col:string,less400:boolean,less900:boolean,french:boolean}){
    const check=!!(educData?.achievements && educData.achievements.length>0);
if(check){

    const achievCont=document.createElement("div");
    achievCont.id="educate-achiev-cont";
    achievCont.className=styles.achievEducCont;
    achievCont.style.marginLeft=less900 ? ( less400 ? "0.3rem":"0.75rem"):"1rem";
    achievCont.style.width=less900 ?(less400 ? "100%":"85%"):"76%";
    const title=document.createElement("h6");
    title.id="achieve-cont-title";
    title.style.cssText="font-weight:bold;line-height:0.5rem;margin-block:0.25;text-transform:capitalize;";
    title.textContent=french ? langConversion({key:"achievements"}):"achievements";
    parent.appendChild(title);
    educData.achievements.map((achiev,index)=>{
        const para1=document.createElement("p");
        para1.id="achiev-para-" + String(index);
        para1.style.cssText="text-wrap:pretty;margin-inline:0;";
        para1.style.lineHeight=less900 ? (less400 ? "1.75rem":"1.5rem"):"1.75rem";
        para1.innerHTML=`<span style=color:blue;>${index + 1}.</span>${achiev.achievement}`;
        achievCont.appendChild(para1);
        
        if(achiev.reason && achiev.reason !==""){
            ViewResume.division({parent:achievCont,position:"start",width:23});
            const div=document.createElement("div");
            div.id="achiev-cont-listings";
            div.style.cssText=css_col + "margin-inline:0;line-height:1.1rem;";
    
            const text=french ? langConversion({key:"aim"}) : "aim";
            const title=document.createElement("h6");
            title.textContent=text;
            const small=document.createElement("small");
            small.id="small-" + String(index);
            small.style.cssText="text-wrap:pretty;order:2";
            small.style.marginLeft=less900 ? (less400 ? "0.3rem":"0.5rem"):"0.75rem";
            small.textContent=achiev.reason;
            
            div.appendChild(title);
            div.appendChild(small);
            achievCont.appendChild(div);
        };
        if(achiev.composite && achiev.composite !==""){
            console.log("composed of:",achiev.composite);
            const div=document.createElement("div");
            div.id="achiev-cont-listings";
            div.style.cssText=css_col + "margin-inline:0;line-height:1.1rem;";
            const word=french ? langConversion({key:"composite"}): "compose of:";
            const title=document.createElement("h6");
            title.textContent=word;
            const small=document.createElement("small");
            small.id="small-" + String(index);
            small.style.cssText="text-wrap:pretty;";
            small.style.marginLeft=less900 ? (less400 ? "0.3rem":"0.5rem"):"0.75rem";
            small.textContent=achiev.composite;
            
            div.appendChild(title);
            div.appendChild(small);
            achievCont.appendChild(div);
        }
    });
    parent.appendChild(achievCont);
    };
}



achievCard({parent,achiev,index,french}:{parent:HTMLElement,achiev:awardType,index:number,french:boolean}){
const achievContCard=document.createElement("div");
achievContCard.id="achievCard-cont-card";
achievContCard.className=styles.achievContCard;
const para1=document.createElement("p");
para1.id="achiev-para-" + String(index);
para1.textContent=achiev.achievement;
achievContCard.appendChild(para1);
const achievReasonComp=document.createElement("div");
achievReasonComp.id="achiev-reason-composite";
achievReasonComp.className=styles.achievReasonComp;
if(achiev?.reason){
    ViewResume.division({parent:achievContCard,position:"start",width:23});
    const title=document.createElement("h6");
    title.textContent=french ? `${langConversion({key:"purpose"})}:`:"purpose:";
    const small=document.createElement("small");
    small.id="small-reason" + String(index);
    small.textContent=achiev.reason;
    achievReasonComp.appendChild(title);
    achievReasonComp.appendChild(small);
};if(achiev?.composite){
    
    const title=document.createElement("h6");
    title.textContent=french ? `${langConversion({key:"composite"})}:`:"composite:";
    title.style.cssText="color:blue";
    const small=document.createElement("small");
    small.id="small-composite" + String(index);
    small.textContent=achiev.composite;
    achievReasonComp.appendChild(title);
    achievReasonComp.appendChild(small);
}
achievContCard.appendChild(achievReasonComp);
parent.appendChild(achievContCard)
};



showHideEffect({parent,target,show,time,isPrint}:{parent:HTMLElement,target:HTMLElement,show:boolean,time:number,isPrint:boolean}){
    if(!isPrint){
        if(show){
            target.animate([
                {transform:"rotateX(90deg)",opacity:"0"},
                {transform:"rotateX(0deg)",opacity:"1"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
        }else{
           
               
                target.style.transform="rotateX(90deg)";
                target.animate([
                    {transform:"rotateX(0deg)",opacity:"1"},
                    {transform:"rotateX(90deg)",opacity:"0"},
                ],{duration:time,iterations:1,"easing":"ease-in-out"});
                setTimeout(()=>{
                    Resume.cleanUpById({parent,id:target.id});
                },time-50);
    
        };
    };
};

static division({parent,position,width}:{parent:HTMLElement,position:"start"|"center"|"end",width:number}){
    const line=document.createElement("div");
    if(position==="start") line.classList.add(("text-start"));
    if(position==="center") line.classList.add(("text-center"));
    if(position==="end") line.classList.add(("text-end"));
    line.style.cssText=`width:${width}%;height:1px;background-color:blue;margin-block:0.5rem;margin-inline:0;`;
    parent.appendChild(line);
};



static divider({parent,width}:{parent:HTMLElement,width:number}){
    const line=document.createElement("div");
    line.id="divider";
    line.style.cssText=`width:${width}%;height:3px;background-color:#0785f1;margin-block:0.25rem;margin-inline:0;`;
    parent.appendChild(line);
}

};
export default ViewResume;
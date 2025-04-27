import Service from "@/components/common/services";
import DeleteClass from "./deleteClass";
import Reference from "./viewReference";
import { awardType, contactType, educationType, mainResumeType, miscType, nameRefType, nameResumeType, resumeType, workExperienceType } from "./refTypes";
import Resume from "./resume";
import styles from "./viewResume.module.css";


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
    constructor(private _service:Service,public resumeRef:Reference,private _deleteClass:DeleteClass){
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

async showResume({parent,mainResume,func1}:{parent:HTMLElement,mainResume:mainResumeType|undefined,
    func1:(mainResumes:mainResumeType[])=>Promise<void>|void
}){
    
    this.storeMainResume({mainResume});
    
    if(mainResume){
        this.resume({parent,mainResume,showPrint:true,closeDelete:false,func1});
    }
    
};




storeMainResume({mainResume}:{mainResume:mainResumeType|undefined}):{nameResumes:nameResumeType[],mainResumes:mainResumeType[]}{
    if(mainResume){
            const {name,user_id,enable,id}=mainResume;
            this.mainResume=mainResume;
            const hasMain=this.mainResumes.find(res=>(res.name===mainResume.name));
            this.nameResume={id:id as number,name,user_id,enable};
            this.nameResumes=this.mainResumes.map(res=>({id:res.id as number,name:res.name,user_id:res.user_id,enable:res.enable}));
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





resume({parent,mainResume,showPrint,closeDelete,func1}:{parent:HTMLElement,mainResume:mainResumeType,showPrint:boolean,closeDelete:boolean,
    func1:(mainResumes:mainResumeType[])=>Promise<void>|void
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
   
        this.header({parent:mainCont,css_col,css_row,less400,less900,contact,sites,filename});
    this.summaryCont({parent:mainCont,less400,less900,css_col,summary});
    //experience button
    const experienceCont=document.createElement("div");
    experienceCont.id="experience-cont";
    experienceCont.style.cssText=css_col + "justify-content:center;align-items:center;width:100%;";
    mainCont.appendChild(experienceCont);
    this.showHideWorkExp({parent:experienceCont,less400,less900,experData,css_col,css_row,time,show:this.show,lineWidth});
    const educateCont=document.createElement("div");
    educateCont.id="educate-cont";
    educateCont.style.cssText=css_col + "width:100%";
    mainCont.appendChild(educateCont);
    this.showHideEducate({parent:educateCont,less400,less900,css_col,css_row,educDataArr,show:this.show,time,lineWidth});
   this.languages({parent:mainCont,extra:extra});
   
    const btnDiv=document.createElement("div");
    btnDiv.id="btn-div";
    btnDiv.style.cssText=css_row +"margin-inline:auto;margin-block:2rem;justify-content:center;gap:1.5rem;";
    if(showPrint){
        const {button:print}=Resume.simpleButton({anchor:btnDiv,bg:"black",color:"white",text:"print",time:400,type:"button"});
     
         print.onclick=(e:MouseEvent)=>{
             if(!e) return;
             const origin=window.location.origin;
             const url=new URL("/print",origin);
             url.searchParams.set("nameResume",resume.name);
             if(resume.id){
                 url.searchParams.set("id",String(resume.id));
             };
             window.location.href=url.href;
         };
     
    }
    
    mainCont.appendChild(btnDiv);
    this._deleteClass.rowId=this.rowId;
    if(!closeDelete){
        this._deleteClass.deleteResume({parent,target:mainCont,mainResume,
            func:({mainResumes,nameResumes})=>{
                this.mainResumes=mainResumes;
                this.nameResumes=nameResumes;
                func1(mainResumes)
            }
            })

    }
    parent.appendChild(mainCont);
};

printResume({parent,resume}:{parent:HTMLElement,resume:resumeType}){
    const less900=window.innerWidth <900;
    const less400=window.innerWidth <400;
    const lineWidth=less900 ? (less400 ? "100%":"90%"):"75%";
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
   
        this.header({parent:mainCont,css_col,css_row,less400,less900,contact,sites,filename});
    this.summaryCont({parent:mainCont,less400,less900,css_col,summary});
    //experience button
    const experienceCont=document.createElement("div");
    experienceCont.id="experience-cont";
    experienceCont.style.cssText=css_col + "justify-content:center;align-items:center;width:100%;";
    mainCont.appendChild(experienceCont);
    this.experience({parent:experienceCont,less400,less900,css_col,css_row,experData,show:true,time:0,isPrint:true});
    const educateCont=document.createElement("div");
    educateCont.id="educate-cont";
    educateCont.style.cssText=css_col + "width:100%";
    mainCont.appendChild(educateCont);
    this.education({parent:experienceCont,less400,less900,css_col,css_row,educDataArr,show:true,time:0,isPrint:true});
    this.languages({parent:mainCont,extra});
    parent.appendChild(mainCont);
};


showHideEducate({parent,time,show,css_row,css_col,less400,less900,educDataArr,lineWidth}:{parent:HTMLElement,time:number,show:boolean,educDataArr:educationType[],less400:boolean,less900:boolean,css_col:string,css_row:string,lineWidth:string}){
    Resume.lineDivison({parent:parent,width:lineWidth,background:"blue"});
    const showHideExperience=document.createElement("div");
    showHideExperience.id="show-hide-experience-cont";
    showHideExperience.className=styles.showHideExperience;
    const title=document.createElement("h4");
    title.textContent="EDUCATION";
    title.className="text-primary display-6";
    parent.appendChild(showHideExperience);
    showHideExperience.appendChild(title);
    const {button}=Resume.simpleButton({anchor:showHideExperience,type:"button",bg:"black",color:"white",text:"open",time:400});
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
            button.textContent="close";
            title.style.opacity="0";
            title.style.transition="opacity 1s ease-in-out";
            this.education({parent:experienceCont,less400,less900,css_col,css_row,educDataArr,show,time,isPrint:false});
        }else{
            show=!show;
            title.style.opacity="1";
            title.style.transition="opacity 1s ease-in-out";
            button.textContent="open";
            this.education({parent:experienceCont,less400,less900,css_col,css_row,educDataArr,show,time,isPrint:false});
        }
    };

    
};


showHideWorkExp({parent,time,show,css_row,css_col,less400,less900,experData,lineWidth}:{parent:HTMLElement,time:number,show:boolean,experData:workExperienceType[],less400:boolean,less900:boolean,css_col:string,css_row:string,lineWidth:string}){
    const showHideOuter=document.createElement("div");
    showHideOuter.id="show-hide-outer-cont";
    showHideOuter.className=styles.showHideOuter;
    const showHideExperience=document.createElement("div");
    showHideExperience.id="show-hide-experience-cont";
    showHideExperience.className=styles.showHideExperience;
    Resume.lineDivison({parent:showHideOuter,width:lineWidth,background:"blue"});
    const title=document.createElement("h4");
    title.textContent="EXPERIENCE";
    title.className="text-primary display-6 mx-0";
    showHideOuter.appendChild(showHideExperience);
    parent.appendChild(showHideOuter);
    showHideExperience.appendChild(title);
    const {button}=Resume.simpleButton({anchor:showHideExperience,type:"button",bg:"black",color:"white",text:"open",time:400});
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
            show=!show;
            title.style.opacity="0";
            title.style.transition="opacity 1s ease-in-out";
            button.textContent="hide";
            experienceCont.style.alignItems="";
            this.experience({parent:experienceCont,less400,less900,css_col,css_row,experData,show,time,isPrint:false});
        }else{
            show=!show;
            title.style.opacity="1";
            experienceCont.style.alignItems="";
            title.style.transition="opacity 1s ease-in-out";
            button.textContent="open";
            this.experience({parent:experienceCont,less400,less900,css_col,css_row,experData,show,time,isPrint:false});
        }
    };
    showHideExperience.style.alignItems="";
    
};
 
showCombined({parent,resume,showHeader,isPrint}:{parent:HTMLElement,resume:resumeType,showHeader:boolean,isPrint:boolean}){
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
        this.header({parent:container,less400,less900,css_col,css_row,contact,sites,filename});
    };
    this.summaryCont({parent:container,less400,less900,css_col,summary});
    this.experience({parent:container,less400,less900,css_col,css_row,experData:workExperience,time,show:true,isPrint});
    this.education({parent:container,less400,less900,css_col,css_row,educDataArr:education,time,show:true,isPrint});
    this.languages({parent:container,extra});
    
};

languages({parent,extra}:{parent:HTMLElement,extra:miscType}){
    ViewResume.divider({parent,width:75});
    const extraContLang=document.createElement("div");
    extraContLang.id="extra-cont";
    extraContLang.className=styles.extraContLang;
    const languages=document.createElement("div");
    const lang=document.createElement("h6");
    lang.textContent="Languages";
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

experience({parent,less400,less900,css_col,css_row,experData,time,show,isPrint}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,css_row:string,experData:workExperienceType[],time:number,show:boolean,isPrint:boolean}){
    if(show){
        const workExpCont=document.createElement("div");
        workExpCont.id="work-experience-cont";
        workExpCont.className=styles.workExpCont;
      
        const title=document.createElement("h6");
        title.id="title-exp";
        title.className="display-6 my-1 mb-3 lean";
        title.style.fontSize="175%";
        title.textContent="EXPERIENCE";
        workExpCont.appendChild(title);
        ViewResume.divider({parent:workExpCont,width:75});

        experData.map((exper,index)=>{
            this.experCard({parent:workExpCont,exper,less400,less900,css_col,css_row,index});
        });
        parent.appendChild(workExpCont);

    };
    const getWorkCont=parent.querySelector("div#work-experience-cont") as HTMLElement;
    if(!getWorkCont) return;
    this.showHideEffect({parent,target:getWorkCont,show,time,isPrint});
};


education({parent,css_col,less400,less900,css_row,educDataArr,time,show,isPrint}:{parent:HTMLElement,css_col:string,css_row:string,less400:boolean,less900:boolean,educDataArr:educationType[],time:number,show:boolean,isPrint:boolean}){
    if(show){
        const educationCont=document.createElement("div");
        educationCont.id="main-education";
        educationCont.className=styles.workExpCont;
        const title=document.createElement("h6");
        title.id="education-title";
        title.style.cssText="text-transform:uppercase;margin-block:0rem;";
        title.className="display-6 my-1 mb-3 lean";
        title.style.fontSize="175%";
        title.textContent="education";
        //divider
        ViewResume.divider({parent:educationCont,width:75});
        educationCont.appendChild(title);
      
        parent.appendChild(educationCont);
        educDataArr.map((educData,index)=>{
            this.educationCard({parent:educationCont,less400,less900,css_col,css_row,educData,index});

        });

    };
    const getEducateCont=parent.querySelector("div#main-education") as HTMLElement;
    if(!getEducateCont) return;
    this.showHideEffect({parent,target:getEducateCont,show,time,isPrint});
};


header({parent,less400,less900,css_col,css_row,contact,sites,filename}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,css_row:string,contact:contactType,sites:string[],filename:string|undefined}){
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
    this.addressTitle({parent:cont,less400,less900,contact,filename});
    this.siteTitle({parent:cont,less400,less900,css_col,sites});
    parent.appendChild(cont);
};



summaryCont({parent,less400,less900,css_col,summary}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,summary:string}){
    const summaryCont=document.createElement("div");
    summaryCont.id="summary-cont";
    summaryCont.style.cssText=css_col + "margin-inline:auto;margin-top:1rem;";
    summaryCont.style.width="100%";
    summaryCont.style.paddingInline=less900 ? (less400 ? "0.25rem":"1rem"):"1.5rem";
    const h6=document.createElement("h6");
    h6.style.cssText="text-transform:uppercase;line-height:0.15rem;margin-bottom:7px;";
    h6.textContent="summary";
    summaryCont.appendChild(h6);
    const para=document.createElement("p");
    para.style.cssText="text-wrap:pretty";
    para.style.fontSize=less900 ? (less400 ? "auto":"105%"):"110%";
    para.textContent=summary;
    summaryCont.appendChild(para);
    parent.appendChild(summaryCont);
};

addressTitle({parent,less400,less900,contact,filename}:{less400:boolean,less900:boolean,parent:HTMLElement,contact:contactType,filename:string|undefined}){
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
        const newUrl=new URL(`/showResume/${filename}`,window.location.origin)
        anchor.href=newUrl.href
        anchor.textContent="resume + reference";
        anchor.style.order="2"
        nameCont.appendChild(anchor);
        }
    parent.appendChild(nameCont);
};


siteTitle({parent,less400,less900,css_col,sites}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,sites:string[]}){
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


experCard({parent,exper,less400,less900,css_col,css_row,index}:{parent:HTMLElement,exper:workExperienceType,less400:boolean,less900:boolean,css_col:string,css_row:string,index:number}){
    const expCard=document.createElement("div");
    expCard.id="exper-card-" + String(index);
    expCard.className=styles.expCard;
    expCard.style.paddingInline="0";
    ViewResume.divider({parent:expCard,width:25});
    this.experHeader({parent:expCard,css_row,exper,less400,less900});
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
    achieveTitle.textContent="achievement";
    achieveTitle.style.cssText="text-transform:capitalize;margin-bottom:0.25rem;margin-left:0;";
    achievCont.appendChild(achieveTitle);
    exper.achievements.map((achiev,index)=>{
        if(achiev?.achievement.split("").length>0){
            const ind=document.createElement("span");
            ind.textContent=String(index + 1) + ". ";
            achievCont.appendChild(ind);
            this.achievCard({parent:achievCont,achiev,index,});
        }
    });
    expCard.appendChild(achievCont);
    parent.appendChild(expCard);
};


experHeader({parent,less400,less900,exper,css_row}:{parent:HTMLElement,less400:boolean,less900:boolean,css_row:string,exper:workExperienceType}){
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
    from.id="from";
    from.className="text-primary";
    from.innerHTML=`<span style=color:blue;>From:</span> ${exper.from}`;
    dateCont.appendChild(from);
    const to=document.createElement("span");
    to.id="to";
    to.className="text-primary";
    to.innerHTML=`<span style=color:blue;>To:</span> ${exper.to}`;
    dateCont.appendChild(to);
    experHeaderBody.appendChild(dateCont);
     //---------------------HEADER BODY---------------------------------------//
    //append expCardHeader
    parent.appendChild(expCardHeader);
};

educationCard({parent,less400,less900,css_col,css_row,educData,index}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,css_row:string,educData:educationType,index:number}){
        const card=document.createElement("div");
        card.id="education-card-"+ String(index);
        card.className=styles.educateCard;
        ViewResume.divider({parent:card,width:25});
       
        this.educateHeader({parent:card,css_col,css_row,less900,less400,educData});
        //extracurricular
        if(educData.extracurricular){
            const extracurricular=document.createElement("p");
            extracurricular.id="extracurricular";
            extracurricular.className="px-1 py-1";
            extracurricular.style.textWrap="pretty";
            extracurricular.innerHTML=`<span style=color:blue;>extracurricular: </span>${educData.extracurricular}`;
            card.appendChild(extracurricular);
        }
        this.educateAchieve({parent:card,educData,less400,less900,css_col});
        //SKILLs
        this.skillContainer({parent:card,css_row,educData,less400});
        parent.appendChild(card);
};



skillContainer({parent,css_row,educData,less400}:{parent:HTMLElement,css_row:string,educData:educationType,less400:boolean}){
const skillCont=document.createElement("div");
skillCont.id="skill-cont";
skillCont.className=styles.educateSkillRowCont;
let skills_=["skills"];
skills_=skills_.concat(educData.skills)
skills_.map((skill,index)=>{
    const skill_=document.createElement("p");
    skill_.id="skill-" + String(index);
    if(index===0){
        skill_.style.color="blue";
        skill_.textContent=`${skill} : `;
    }else{
        skill_.textContent=skill;
    }
    skillCont.appendChild(skill_);
});
parent.appendChild(skillCont);
};


educateHeader({parent,css_col,css_row,less900,less400,educData}:{parent:HTMLElement,css_col:string,css_row:string,less900:boolean,less400:boolean,educData:educationType}){
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
        from.id="from";
        from.className="text-primary";
        from.innerHTML=`<span style=color:blue;>From:</span> ${educData.from}`;
        dateCont.appendChild(from);
        const to=document.createElement("span");
        to.id="to";
        to.className="text-primary";
        to.innerHTML=`<span style=color:blue;>To:</span> ${educData.to}`;
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


educateAchieve({parent,educData,less400,less900,css_col}:{parent:HTMLElement,educData:educationType,css_col:string,less400:boolean,less900:boolean}){
const achievCont=document.createElement("div");
achievCont.id="educate-achiev-cont";
achievCont.style.cssText="margin-inline:0;";
achievCont.style.marginLeft=less900 ? ( less400 ? "0.3rem":"0.75rem"):"1rem";
achievCont.style.width=less900 ?(less400 ? "100%":"85%"):"76%";
const title=document.createElement("h6");
title.id="achieve-cont-title";
title.style.cssText="font-weight:bold;line-height:0.5rem;margin-block:0.25;text-transform:capitalize;";
title.textContent="achievments";
parent.appendChild(title);
educData.achievements.map((achiev,index)=>{
    const para1=document.createElement("p");
    para1.id="achiev-para-" + String(index);
    para1.style.cssText="text-wrap:pretty;margin-inline:0;";
    para1.style.lineHeight=less900 ? (less400 ? "1.25rem":"1.15rem"):"1.20rem";
    para1.innerHTML=`<span style=color:blue;>${index + 1}.</span>${achiev.achievement}`;
    achievCont.appendChild(para1);
    const div=document.createElement("div");
    div.id="achiev-cont-listings";
    div.style.cssText=css_col + "margin-inline:0;line-height:1.1rem;";
    if(achiev.reason){

        const small=document.createElement("small");
        small.id="small-" + String(index);
        small.style.cssText="text-wrap:pretty;";
        small.style.marginLeft=less900 ? (less400 ? "0.3rem":"0.5rem"):"0.75rem";
        small.innerHTML=`<span style=color:blue>purp:</span>${achiev.reason}`;
        
        div.appendChild(small);
    };
    if(achiev.composite){

        const small=document.createElement("small");
        small.id="small-" + String(index);
        small.style.cssText="text-wrap:pretty;";
        small.style.marginLeft=less900 ? (less400 ? "0.3rem":"0.5rem"):"0.75rem";
        small.innerHTML=`<span style=color:blue>comp:</span>${achiev.composite}`;
        
        div.appendChild(small);
    }
    achievCont.appendChild(div);
});
parent.appendChild(achievCont);
};



achievCard({parent,achiev,index,}:{parent:HTMLElement,achiev:awardType,index:number}){
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
    const title=document.createElement("small");
    title.textContent="purpose:";
    const small=document.createElement("small");
    small.id="small-reason" + String(index);
    small.textContent=achiev.reason;
    achievReasonComp.appendChild(title);
    achievReasonComp.appendChild(small);
};if(achiev?.composite){
    const title=document.createElement("small");
    title.textContent="composite:";
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



static divider({parent,width}:{parent:HTMLElement,width:number}){
    const line=document.createElement("div");
    line.id="divider";
    line.style.cssText=`width:${width}%;height:3px;background-color:#0785f1;margin-block:0.25rem;margin-inline:0;`;
    parent.appendChild(line);
}

};
export default ViewResume;
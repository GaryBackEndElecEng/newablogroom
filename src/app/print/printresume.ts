

import { awardType, contactType, educationType, mainResumeRefType, mainResumeType, resumeType, workExperienceType } from "@/components/bio/resume/refTypes";
import Resume from "@/components/bio/resume/resume";
import ViewResume from "@/components/bio/resume/viewResume";
import Service from "@/components/common/services";


class PrintResume{
    private _mainResume:mainResumeType;
    private _mainResumeRef:mainResumeRefType

    constructor(private _service:Service,private viewResume:ViewResume){
        this._mainResume={} as mainResumeType;
        this._mainResumeRef={} as mainResumeRefType;
    };

    //-----------GETTERS SETTERS-------------//

    get mainResume(){
        return this._mainResume;
    };

    set mainResume(mainResume:mainResumeType){
        this._mainResume=mainResume;
    };

    get mainResumeRef(){
        return this._mainResumeRef;
    };

    set mainResumeRef(mainResumeRef:mainResumeRefType){
        this._mainResumeRef=mainResumeRef;
    };
    //-----------GETTERS SETTERS-------------//




    main({injector,mainResume,mainResumeRef}:{mainResume:mainResumeType|null,injector:HTMLElement,mainResumeRef:mainResumeRefType|null}){
        const less400=window.innerWidth <400;
        const less900=window.innerWidth <900;
        const isCombined=!!(mainResumeRef && mainResume && mainResumeRef.res_name_id===mainResume.name)
        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;";
        const css_row="display:flex;flex-wrap:nowrap;align-items:center;justify-content:center;gap:1rem;";
        if(mainResume){
            this.mainResume=mainResume;
            this.viewResume.resume({parent:injector,mainResume,showPrint:false,closeDelete:true,func1:()=>{}});

        }else if(mainResumeRef){
            // print out refrerence
            this.mainResumeRef=mainResumeRef;
            const {name,references}=mainResumeRef;
            this.viewResume.resumeRef.showReferences({parent:injector,less400,less900,css_col,css_row,show:true,time:1000,references,name,toPrint:false});
        };
        const btnDiv=document.createElement("div");
        btnDiv.id="btn-div";
        btnDiv.style.cssText=css_row +"margin-inline:auto;margin-block:2rem;justify-content:center;gap:1.5rem;width:100%;align-items:center;justify-content:center;";
        injector.appendChild(btnDiv);
    
        if(isCombined){

            const {button:printall}=Resume.simpleButton({anchor:btnDiv,bg:"black",color:"white",text:"print all",time:400,type:"button"});
            printall.onclick=(e:MouseEvent)=>{
                if(!e) return;
                const {name}=this.mainResume as mainResumeType;
                const nameResume=name
                const newUrl=new URL(`/showResume/${nameResume}`,location.origin);
                location.href=newUrl.href;
            };
        }else if(mainResume){
            const {button:print}=Resume.simpleButton({anchor:btnDiv,bg:"black",color:"white",text:"print resume",time:400,type:"button"});
        
            print.onclick=(e:MouseEvent)=>{
                if(!e) return;
                Resume.cleanUp(injector);
                const {resume}=this.mainResume as mainResumeType;
                this.viewResume.printResume({parent:injector,resume});
                const getNav=document.querySelector("header#navHeader") as HTMLElement;
                const getFooter=document.querySelector("section#footerInjector") as HTMLElement;
                if(!getNav || ! getFooter) return;
                getNav.hidden=true;
                getFooter.hidden=true;
                setTimeout(()=>{
                    window.print();
                    const url=new URL("/bio",window.location.origin);
                    window.location.href=url.href;
                    
                },0); 
                
            };
        }else if(mainResumeRef){
            const {button:printRef}=Resume.simpleButton({anchor:btnDiv,bg:"black",color:"white",text:"print reference",time:400,type:"button"});
            printRef.id="print-ref"
        
            printRef.onclick=(e:MouseEvent)=>{
                if(!e) return;
                printRef.remove();
                setTimeout(()=>{
                    window.print();
                    const url=new URL("/bio",window.location.origin);
                    window.location.href=url.href;
                    
                },0); 
                
            };
        }
    };

    resume({parent,resume}:{parent:HTMLElement,resume:resumeType}){
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const time=700;
    
        parent.style.cssText="margin-inline:auto;width:100%;";
        parent.style.maxWidth=less900 ? (less400 ? "375px":"760px"):"1500px";
        parent.style.paddingInline=less900 ? (less400 ? "5px":"3.5rem"):"4rem";
       
        const contact=resume.contact;
        const sites=resume.sites;
        const experData=resume.workExperience;
        const educDataArr=resume.education;
        const extra=resume.extra;
        const summary=resume.summary;
        const css_col="display:flex;flex-direction:column;";
        const css_row="display:flex;flex-wrap:nowrap;align-items:center;";
        const mainCont=document.createElement("section");
        mainCont.id="resume-mainCont";
        mainCont.style.cssText=css_col + "position:relative;margin-inline:auto;";
        mainCont.style.width=less900 ? (less400 ? "100%":"95%"):"90%";
        this.header({parent:mainCont,css_col,css_row,less400,less900,contact,sites});
        this.summaryCont({parent:mainCont,less400,less900,css_col,summary});
        //experience button
        const experienceCont=document.createElement("div");
        experienceCont.id="experience-cont";
        experienceCont.style.cssText=css_col + "justify-content:center;align-items:center;width:100%;";
        mainCont.appendChild(experienceCont);
        this.experience({parent:experienceCont,less400,less900,css_col,css_row,experData,show:true,time});
        const educateCont=document.createElement("div");
        educateCont.id="educate-cont";
        educateCont.style.cssText=css_col + "width:100%";
        mainCont.appendChild(educateCont);
        this.education({parent:educateCont,less400,less900,css_col,css_row,educDataArr,show:true,time});
        const extraCont=document.createElement("div");
        extraCont.id="extra-cont";
        extraCont.style.cssText=css_col + " width:100%;";
        const ul=document.createElement("ul");
        ul.style.cssText="margin-inline:0;margin-left:1rem;padding-left:1rem;";
        extra.languages.map((item,index)=>{
            const li=document.createElement("li");
            li.id=`lang-${index}`;
            li.textContent=item;
            ul.appendChild(li);
        });
        mainCont.appendChild(ul);
        const btnDiv=document.createElement("div");
        btnDiv.id="btn-div";
        btnDiv.style.cssText=css_row +"margin-inline:auto;margin-block:2rem;justify-content:center;gap:1.5rem;";
       
           
            const {button:print}=Resume.simpleButton({anchor:btnDiv,bg:"black",color:"white",text:"print",time:400,type:"button"});
    
         
            print.onclick=(e:MouseEvent)=>{
                if(!e) return;
                mainCont.removeChild(btnDiv);
               setTimeout(()=>{
                window.print();
                const url=new URL("/",window.location.origin);
                window.location.href=url.href;

               },0); 
               
            };
        
        
        mainCont.appendChild(btnDiv);
        parent.appendChild(mainCont);
    };


    summaryCont({parent,less400,less900,css_col,summary}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,summary:string}){
        const summaryCont=document.createElement("div");
        summaryCont.id="summary-cont";
        summaryCont.style.cssText=css_col + "margin-inline:auto;margin-top:1rem;";
        summaryCont.style.width=less900 ? (less400 ? "100%":"95%"):"90%";
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


    header({parent,less400,less900,css_col,css_row,contact,sites}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,css_row:string,contact:contactType,sites:string[]}){
        const cont=document.createElement("div");
        cont.id="header-main";
        cont.style.cssText=css_row + "justify-content:center;margin-inline:auto;";
        cont.style.width=less900 ? "100%":"95%";
        cont.style.paddingInline=less900 ? (less400 ? "0.25rem":"1rem"):"1.25rem";
        cont.style.flexDirection=less400 ? "column":"row";
        const name=document.createElement("h6");
        name.style.cssText="line-height:0.25rem;margin-bottom:0.5rem;margin-top:2rem;";
        name.className="text-primary display-6 my-1";
        name.style.fontSize=less900 ? (less400 ? "150%":"165%"):"185%";
        name.id="name";
        name.textContent=contact.name;
        parent.appendChild(name);
        this.addressTitle({parent:cont,less400,less900,contact});
        this.siteTitle({parent:cont,less400,less900,css_col,sites});
        parent.appendChild(cont);
    };


    addressTitle({parent,less400,less900,contact}:{less400:boolean,less900:boolean,parent:HTMLElement,contact:contactType}){
        const nameCont=document.createElement("div");
        nameCont.id="address-cont";
        nameCont.style.cssText="";
        nameCont.style.flex=less400 ? "1 0 100%":"1 0 50%";
        nameCont.style.width=less400 ? "100%":"auto";
        nameCont.style.lineHeight=less900 ? (less400 ? "0.1rem":"0.15rem"):"0.1rem";
        nameCont.style.paddingInline=less900 ? (less400 ? "5px":"0.5rem"):"2.5rem";
        
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

    experience({parent,less400,less900,css_col,css_row,experData,time,show}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,css_row:string,experData:workExperienceType[],time:number,show:boolean}){
        if(show){
            const workExpCont=document.createElement("div");
            workExpCont.id="work-experience-cont";
            workExpCont.style.cssText=css_col + "width:100%;gap:1rem;";
            const title=document.createElement("h3");
            title.id="title-exp";
            title.className="display-4 my-1 mb-3";
            title.textContent="EXPERIENCE";
            const line=document.createElement("div");
            line.id="divider";
            line.style.cssText="width:75%;height:3px;background-color:#0785f1;margin-block:0.25rem;";
            workExpCont.appendChild(title);
            workExpCont.appendChild(line);
            experData.map((exper,index)=>{
                this.experCard({parent:workExpCont,exper,less400,less900,css_col,css_row,index});
            });
    
            parent.appendChild(workExpCont);
            workExpCont.animate([
                {transform:"rotateX(90deg)",opacity:"0"},
                {transform:"rotateX(0deg)",opacity:"1"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
    
        }else{
            const getChild=parent.querySelector("div#work-experience-cont") as HTMLElement;
            if(!getChild) return;
            getChild.style.transform="rotateX(90deg)";
            getChild.animate([
                {transform:"rotateX(0deg)",opacity:"1"},
                {transform:"rotateX(90deg)",opacity:"0"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
            setTimeout(()=>{
                Resume.cleanUpById({parent,id:"work-experience-cont"});
            },time-50);
        };
    };
    
    
    experCard({parent,exper,less400,less900,css_col,css_row,index}:{parent:HTMLElement,exper:workExperienceType,less400:boolean,less900:boolean,css_col:string,css_row:string,index:number}){
        const card=document.createElement("div");
        card.id="exper-card-" + String(index);
        card.style.cssText= "width:100%;";
        card.style.paddingInline="0";
        this.experHeader({parent:card,css_row,exper,less400,less900});
        //append cardHeader
        const summary=document.createElement("p");
        summary.id="summary";
        summary.className="px-1 py-1";
        summary.style.textWrap="pretty";
        summary.textContent=exper.summary;
        card.appendChild(summary);
        const achievCont=document.createElement("div");
        achievCont.id="achiev-cont";
        achievCont.style.cssText=css_col;
        achievCont.style.lineHeight=less900 ? (less400 ? "1.5rem":"0.85rem"):"1rem";
        achievCont.style.width=less900 ?(less400 ? "100%":"85%"):"76%";
        achievCont.style.marginLeft=less900 ?(less400 ? "3px":"0.5rem"):"1rem";
        const achieveTitle=document.createElement("h6");
        achieveTitle.textContent="achievement";
        achieveTitle.style.cssText="text-transform:capitalize;margin-bottom:0.25rem;margin-left:0;";
        achievCont.appendChild(achieveTitle);
        exper.achievements.map((achiev,index)=>{
            if(achiev?.achievement.split("").length>0){
                const ind=document.createElement("span");
                ind.textContent=String(index + 1) + ". ";
                achievCont.appendChild(ind);
                this.achievCard({parent:achievCont,achiev,index,css_col,less400,less900});
            }
        });
        card.appendChild(achievCont);
        parent.appendChild(card);
    };


    experHeader({parent,less400,less900,exper,css_row}:{parent:HTMLElement,less400:boolean,less900:boolean,css_row:string,exper:workExperienceType}){
        const cardHeader=document.createElement("div");
        cardHeader.id="card-header";
        cardHeader.style.cssText="margin-block:1rem;";
        cardHeader.style.lineHeight=less900 ? ( less400 ? "1rem":"1.1rem"):"1.0rem";
    
        const title=document.createElement("h6");
        title.id="title";
        title.className="text-primary display-6";
        title.style.cssText="margin-block:0;text-transform:capitalize;";
        title.style.fontSize=less900 ? (less400 ? "110%":"115%"):"120%";
        title.textContent=exper.title;
        cardHeader.appendChild(title);
        //company
        const company=document.createElement("p");
        company.id="company";
        company.className="text-primary";
        company.innerHTML=`<span style=color:blue;>Co:</span>${exper.company}`;
        cardHeader.appendChild(company);
        //location
        const location=document.createElement("p");
        location.id="summary";
        location.className="px-1 py-1";
        location.style.textWrap="pretty";
        location.innerHTML=`<span style=color:blue;>Loc:</span>${exper.location}`;
        cardHeader.appendChild(location);
        //date
        const dateCont=document.createElement("div");
        dateCont.id="dat-cont";
        dateCont.style.cssText=css_row + " width:100%;justif-content:flex-start;gap:0.5rem;";
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
        cardHeader.appendChild(dateCont);
        //summary
        //append cardHeader
        parent.appendChild(cardHeader);
    };

    achievCard({parent,achiev,index,css_col,less400,less900}:{parent:HTMLElement,achiev:awardType,index:number,css_col:string,less400:boolean,less900:boolean}){
    const cont=document.createElement("div");
    cont.id="achievCard-cont";
    cont.style.cssText="margin-left:1rem;margin-bottom:1rem;"
    const para1=document.createElement("p");
    para1.id="achiev-para-" + String(index);
    para1.style.cssText="text-wrap:pretty";
    para1.style.lineHeight=less900 ? (less400 ? "1.25rem":"1.1rem"):"1.0rem";
    para1.textContent=achiev.achievement;
    cont.appendChild(para1);
    const reasonComp=document.createElement("div");
    reasonComp.id="reason-composite";
    reasonComp.style.cssText=css_col;
    if(achiev?.reason){
        const title=document.createElement("small");
        title.textContent="purpose:";
        title.style.cssText="color:blue;";
        const small=document.createElement("small");
        small.id="small-reason" + String(index);
        small.style.cssText="text-wrap:pretty";
        small.textContent=achiev.reason;
        reasonComp.appendChild(title);
        reasonComp.appendChild(small);
    };if(achiev?.composite){
        const title=document.createElement("small");
        title.textContent="composite:";
        title.style.cssText="color:blue";
        const small=document.createElement("small");
        small.id="small-composite" + String(index);
        small.style.cssText="text-wrap:pretty";
        small.textContent=achiev.composite;
        reasonComp.appendChild(title);
        reasonComp.appendChild(small);
    }
    cont.appendChild(reasonComp);
    parent.appendChild(cont)
    };


    education({parent,css_col,less400,less900,css_row,educDataArr,time,show}:{parent:HTMLElement,css_col:string,css_row:string,less400:boolean,less900:boolean,educDataArr:educationType[],time:number,show:boolean}){
        if(show){
            const educationCont=document.createElement("div");
            educationCont.id="main-education";
            educationCont.style.cssText=css_col + "width:100%;gap:1rem;margin-block:1rem;margin-top:2rem;";
            const title=document.createElement("h3");
            title.id="education-title";
            title.className="display-4 my-1 mb-3 w-100";
            title.textContent="education";
            title.style.cssText="text-transform:uppercase;font-weight:bold;margin-block:0rem;";
            //divider
            const line=document.createElement("div");
            line.id="divider";
            line.style.cssText="width:75%;height:3px;background-color:#0785f1;margin-block:0.25rem;";
            educationCont.appendChild(title);
            educationCont.appendChild(line);
            parent.appendChild(educationCont);
            educDataArr.map((educData,index)=>{
                this.educationCard({parent:educationCont,less400,less900,css_col,css_row,educData,index});
    
            });
            
            educationCont.animate([
                {transform:"rotateX(90deg)",opacity:"0"},
                {transform:"rotateX(0deg)",opacity:"1"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
    
        }else{
            const getEducate=parent.querySelector("div#main-education") as HTMLElement;
            if(!getEducate)return;
            getEducate.style.transform="rotateX(90deg)";
            getEducate.animate([
                {transform:"rotateX(0deg)",opacity:"1"},
                {transform:"rotateX(90deg)",opacity:"0"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
    
            setTimeout(()=>{
                Resume.cleanUpById({parent,id:"main-education"})
            },time-50);
        };
    };

    educationCard({parent,less400,less900,css_col,css_row,educData,index}:{less400:boolean,less900:boolean,parent:HTMLElement,css_col:string,css_row:string,educData:educationType,index:number}){
            const card=document.createElement("div");
            card.id="education-card-"+ String(index);
            card.style.cssText=css_col + "width:100%;";
            card.style.lineHeight=less900 ? "0.55rem":"0.65rem";
            card.style.paddingInline="0";
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


    educateHeader({parent,css_col,css_row,less900,less400,educData}:{parent:HTMLElement,css_col:string,css_row:string,less900:boolean,less400:boolean,educData:educationType}){
            const cont=document.createElement("div");
            cont.id="education-header";
            cont.style.cssText=css_col;
            cont.style.lineHeight=less900 ? (less400 ? "0.35rem":"0.3rem"):"0.35rem";
            const school=document.createElement("p");
            school.id="school";
            school.className="text-primary my-1 mb-3";
            school.textContent=educData.school;
            school.style.fontSize=less900 ? (less400 ? "105%":"110%"):"115%";
            school.style.fontWeight="bold";
            school.style.marginBlock=less900 ? (less400 ? "0.6rem":"0.62rem"):"0.75rem";
            cont.appendChild(school);
            //degree
            const degree=document.createElement("p");
            degree.id="degree";
            degree.className="text-primary my-1";
            degree.innerHTML=`<span style=color:blue;>Deg:</span>${educData.degree}`;
            degree.style.marginBlock=less900 ? (less400 ? "0.45rem":"0.4rem"):"0.5rem";
            cont.appendChild(degree);
            //location
            const location=document.createElement("p");
            location.id="location";
            location.className="px-1 py-1";
            location.style.marginBlock=less900 ? (less400 ? "0.45rem":"0.4rem"):"0.5rem";
            location.innerHTML=`<span style=color:blue;>Loc:</span>${educData.location}`;
            cont.appendChild(location);
            //level
            const level=document.createElement("p");
            level.id="level";
            level.className="px-1 py-1";
            level.innerHTML=`<span style=color:blue;>Lev:</span>${educData.level}`;
            level.style.marginBlock=less900 ? (less400 ? "0.45rem":"0.4rem"):"0.5rem";
            cont.appendChild(level);
            //date
            const dateCont=document.createElement("div");
            dateCont.id="date-cont";
            dateCont.style.cssText=css_row + " width:100%;justif-content:flex-start;gap:1.25rem;";
            dateCont.style.marginBlock=less900 ? (less400 ? "0.45rem":"0.4rem"):"0.5rem";
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
            cont.appendChild(dateCont);
            //relevantWork
            if(educData.relevantWork){
                const relevant=document.createElement("p");
                relevant.id="relevant";
                relevant.className="px-1 py-1";
                relevant.innerHTML=`<span style=color:blue;>Relevant to:</span>${educData.relevantWork}`;
                relevant.style.marginBlock=less900 ? (less400 ? "0.45rem":"0.4rem"):"0.5rem";
                cont.appendChild(relevant);
            }
            //GPA
            if(educData.GPA){
                const gpa=document.createElement("p");
                gpa.id="gpa";
                gpa.className="px-1 py-1";
                gpa.innerHTML=`<span style=color:blue;>GPA:</span>${educData.GPA}`;
                gpa.style.marginBlock=less900 ? (less400 ? "0.45rem":"0.4rem"):"0.5rem";
                cont.appendChild(gpa);
            }
            parent.appendChild(cont);
    };

    educateAchieve({parent,educData,less400,less900,css_col}:{parent:HTMLElement,educData:educationType,css_col:string,less400:boolean,less900:boolean}){
        const achievCont=document.createElement("div");
        achievCont.id="educate-achiev-cont";
        achievCont.style.cssText=css_col + "margin-inline:0;";
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
            para1.style.cssText="text-wrap:pretty";
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

    skillContainer({parent,css_row,educData,less400}:{parent:HTMLElement,css_row:string,educData:educationType,less400:boolean}){
        const skillCont=document.createElement("div");
        skillCont.id="skill-cont";
        skillCont.style.cssText=css_row + "align-items:center;gap:0.5rem";
        skillCont.style.flexWrap=less400 ? "wrap":"nowrap";
        skillCont.style.gap=less400 ? "0":"0.5rem";
        const skillTitle=document.createElement("span");
        skillTitle.id="skill-title";
        skillTitle.textContent="skills";
        skillTitle.style.cssText="color:blue;";
        skillCont.appendChild(skillTitle);
        educData.skills.map((skill,index)=>{
            const skill_=document.createElement("p");
            skill_.id="skill-" + String(index);
            skill_.className="px-1 py-1";
            skill_.style.textWrap="pretty";
            skill_.innerHTML=`<span style=color:blue;>|</span>${skill}`;
            skillCont.appendChild(skill_);
        });
        parent.appendChild(skillCont);
    };
        

    
};
export default PrintResume;
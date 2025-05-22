import LetterView from "@/components/bio/letter/letterView";
import Reference from "@/components/bio/resume/viewReference";
import { mainIntroLetterType, mainResumeRefType, mainResumeType } from "@/components/bio/resume/refTypes";
import ViewResume from "@/components/bio/resume/viewResume";
import Service from "@/components/common/services";
import styles from "./combine.module.css";
import { FaCreate } from "@/components/common/ReactIcons";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Resume from "@/components/bio/resume/resume";

class CombineView {
    private  _mainResume:mainResumeType|null;
    private _mainRefs:mainResumeRefType[]|null;
    private _mainLetters:mainIntroLetterType[]|null;
    private _injector:HTMLElement|null;
    constructor(private _service:Service,private _letterView:LetterView,private _viewResume:ViewResume,private _resumeRef:Reference){
        this._mainResume={} as mainResumeType;
        this._mainRefs=[] as mainResumeRefType[];
        this._mainLetters=[] as mainIntroLetterType[];
        this._injector={} as HTMLElement|null;
    };

    main({injector,mainResume,mainRefs,mainLetters}:{
        injector:HTMLElement,
        mainResume:mainResumeType|null,
        mainRefs:mainResumeRefType[]|null,
        mainLetters:mainIntroLetterType[]|null

    }){
        const {french,name,resume}=mainResume as mainResumeType;
        const {contact,sites}=resume;
        this._injector=injector;
        this._mainResume=mainResume;
        this._mainRefs=mainRefs;
        this._mainLetters=mainLetters;

        const less400=window.innerWidth <400;
        const less900=window.innerWidth <900;
        const css_col="display:flex;flex-direction:column;align-items:center;";
        const css_row="display:flex;flex-wrap:wrap;align-items:flex-start;";
        const mainCont=document.createElement("main");
        mainCont.id="main-cont";
        mainCont.className=styles.mainCont;
        injector.appendChild(mainCont);
        const letCont=document.createElement("div");
        letCont.id="letter-cont";
        letCont.className=styles.letCont;
        letCont.style.order="0";
        mainCont.appendChild(letCont);
        const resCont=document.createElement("div");
        resCont.id="res-cont";
        resCont.className=styles.resCont;
        resCont.style.order="3";
        this._viewResume.header({parent:mainCont,less400,less900,css_col,css_row,contact,sites,filename:name,french});
        this.titleName({
            parent:mainCont,
            name:"resume",
            order:1,
            less400,
            func:(show)=>{
                this.showHide({target:resCont,show,time:1000});
            }
        });
        this.showHide({target:resCont,show:false,time:0});
        this._letterView.lineDivider({parent:mainCont,width:45,color:"lightblue",height:"2px",order:2,position:"flex-start"});
        if(mainResume){
            this._viewResume.showCombined({parent:resCont,resume:mainResume.resume,french,showHeader:false,isPrint:false});
        };
      
        mainCont.appendChild(resCont);
        const refCont=document.createElement("div");
        refCont.id="ref-cont";
        refCont.className=styles.refCont;
        refCont.style.order="6";
        this._letterView.lineDivider({parent:mainCont,width:45,color:"lightblue",height:"2px",order:5,position:"flex-start"});
        mainCont.appendChild(refCont);
        if(mainRefs?.length){
            //---------------------------IF REFRENCES EXIST---------------------//
            this.titleName({
                parent:mainCont,
                name:"references",
                order:4,
                less400,
                func:(show)=>{
                    this.showHide({target:refCont,show,time:1000});
                }
            });
            this.showHide({target:refCont,show:false,time:0});
            mainRefs.map(mainref=>{
                if(mainref){
                    const {name,references,french:frenchRef}=mainref;
                    this._resumeRef.showReferences({parent:refCont,references,name,french:frenchRef,less400,less900,css_col,css_row,show:true,time:2000,toPrint:false});
                }
            });
        };
        const rowBtnCont=document.createElement("div");
        rowBtnCont.className=styles.rowBtnCont;
        rowBtnCont.style.order="20";
        mainCont.appendChild(rowBtnCont);
        const {button:back}=Resume.simpleButton({anchor:rowBtnCont,bg:"black",color:"white",text:"back",type:"button",time:400});
        const {button}=Resume.simpleButton({anchor:rowBtnCont,bg:"black",color:"white",text:"print",type:"button",time:400});
        button.onclick=(e:MouseEvent)=>{
            if(!e) return;
            //PRINT;
            const node=this._injector?.nodeName.toLowerCase();
            const ID=this._injector?.id;
            if(node && ID){
                const getNav=document.querySelector("header#navHeader") as HTMLElement;
                const getFooter=document.querySelector("section#footerInjector") as HTMLElement;
                if(!getNav || !getFooter)return;
                getNav.hidden=true;
                getFooter.hidden=true;
                const getInjector=document.querySelector(`${node}#${ID}`) as HTMLElement;
                Resume.cleanUpById({parent:getInjector,id:"main-cont"});
                this.printDoc({injector:getInjector}).then(async(res)=>{
                    if(res?.injector && res?.mainResume){
                        console.log(res)
                       setTimeout(()=>{
                        window.print();
                        const url=new URL("/",location.origin);
                       location.href=url.href;
                       },2000);
                    }
                });
            }
        };
        back.onclick=(e:MouseEvent)=>{
            if(!e) return;
            history.go(-1);
        };
    };

    titleName({parent,order,name,less400,func}:{parent:HTMLElement,order:number,name:string,less400:boolean,func:(show:boolean)=>void}){
        
        const row=document.createElement("div");
        row.className=styles.titleRow;
        row.style.order=String(order);
        const title=document.createElement("h6");
        title.className="text-primary lean display-6";
        title.style.cssText="text-transform:uppercase;margin-block:1.5rem;line-height:1.5rem;align-self:flex-start;margin-top:2rem;flex:1 0 auto;";
        title.style.fontSize=less400 ? "220%":"295%";
        title.style.order="0";
        title.textContent=name;
        row.appendChild(title);
        const xDiv1=document.createElement("div");
        xDiv1.style.cssText="maxWidth:75px;flex:1 0 50%;"
        FaCreate({parent:xDiv1,name:FaArrowUp,cssStyle:{color:"black",backgroundColor:"transparent",fontSize:"22px"}});
        const xDiv2=document.createElement("div");
        xDiv2.style.cssText="maxWidth:75px;flex:1 0 50%;"
        FaCreate({parent:xDiv2,name:FaArrowDown,cssStyle:{color:"black",backgroundColor:"transparent",fontSize:"22px"}});
        xDiv2.hidden=true;
        xDiv1.onclick=(e:MouseEvent)=>{
            if(!e) return;
            xDiv2.hidden=false;
            xDiv1.hidden=true;
          //show
            func(true)
        };
        xDiv2.onclick=(e:MouseEvent)=>{
            if(!e) return;
            xDiv1.hidden=false;
            xDiv2.hidden=true;
           //hide
           func(false)
        };
        
        row.appendChild(xDiv1);
        row.appendChild(xDiv2);
        parent.appendChild(row);

    };


    titlePrint({parent,order,name,less400}:{parent:HTMLElement,order:number,name:string,less400:boolean}){
        
        const row=document.createElement("div");
        row.className=styles.titleRow;
        row.style.order=String(order);
        const title=document.createElement("h6");
        title.className="text-primary lean display-6";
        title.style.cssText="text-transform:uppercase;margin-block:1.5rem;line-height:1.5rem;align-self:flex-start;margin-top:2rem;flex:1 0 auto;";
        title.style.fontSize=less400 ? "220%":"295%";
        title.style.order="0";
        title.textContent=name;
        row.appendChild(title);
        parent.appendChild(row);

    };

    showHide({target,show,time}:{target:HTMLElement,show:boolean,time:number}){
        if(show){
            target.hidden=false
            target.style.transform="rotateX(0deg) scale(1)";
            target.style.opacity="1";
            target.style.zIndex="0";
            target.animate([
                {transform:"rotateX(90deg) scale(0)",opacity:"0",height:"0%"},
                {transform:"rotateX(0deg) scale(1)",opacity:"1",height:"100%"},
            ],{duration:time,iterations:1,"easing":"ease-in"})

        }else{
            target.style.transform="rotateX(90deg) scale(0.2)";
            target.style.opacity="0";
            target.animate([
                {transform:"rotateX(0deg) scale(1)",opacity:"1",height:"100%"},
                {transform:"rotateX(90deg) scale(0)",opacity:"0",height:"0%"},
            ],{duration:time,iterations:1,"easing":"ease-in"});
            setTimeout(()=>{
                target.style.zIndex="-10";
                target.hidden=true;
            },time-30);
        }
    };


   async printDoc({injector}:{injector:HTMLElement,}): Promise<{
    injector:HTMLElement,
    mainResume:mainResumeType,
    mainRefs:mainResumeRefType[],
    mainLetters:mainIntroLetterType[],
    mainCont:HTMLElement

   }>{
        const mainResume=this._mainResume;
        const {french}=mainResume as mainResumeType;
        const mainRefs=this._mainRefs;
        const mainLetters=this._mainLetters
        const less400=window.innerWidth <400;
        const less900=window.innerWidth <900;
        const css_col="display:flex;flex-direction:column;align-items:center;";
        const css_row="display:flex;flex-wrap:wrap;align-items:flex-start;";
        const mainCont=document.createElement("main");
        mainCont.id="main-cont";
        mainCont.className=styles.mainCont;
        injector.appendChild(mainCont);
        const letCont=document.createElement("div");
        letCont.id="letter-cont";
        const resCont=document.createElement("div");
        resCont.id="res-cont";
        
        if(mainResume){
            this._viewResume.showCombined({parent:resCont,resume:mainResume.resume,french,showHeader:true,isPrint:true});
        };
        this._letterView.lineDivider({parent:mainCont,width:45,color:"lightblue",height:"2px",order:5,position:"flex-start"});
        if(mainRefs?.length){
            //---------------------------IF REFRENCES EXIST---------------------//
            this.titlePrint({
                parent:mainCont,
                name:"references",
                order:4,
                less400
            });
            mainCont.appendChild(resCont);
            const refCont=document.createElement("div");
            refCont.id="ref-cont";
            refCont.className=styles.refCont;
            refCont.style.order="6";
            mainCont.appendChild(refCont);
            await Promise.all( mainRefs.map(async(mainref)=>{
                if(mainref){
                    const {name,references}=mainref;
                    this._resumeRef.showReferences({parent:refCont,references,name,french,less400,less900,css_col,css_row,show:true,time:2000,toPrint:false});
                }
            }));
        };
        return Promise.resolve({injector,mainResume,mainRefs,mainLetters,mainCont}) as Promise<{injector:HTMLElement,mainResume:mainResumeType,mainRefs:mainResumeRefType[],mainLetters:mainIntroLetterType[],mainCont:HTMLElement}>
    };
};

export default CombineView;
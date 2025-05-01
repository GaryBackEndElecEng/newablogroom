import { resume } from "./resumeData";
import Service from "@/components/common/services";
import { msgType, nameLetterType, resumeType, } from "./refTypes";
import Reference from "./viewReference";
import ViewResume from "./viewResume";
import CreateResume from "./createResume";
import { FaCrosshairs } from "react-icons/fa";
import { FaCreate } from "../../common/ReactIcons";
import HeaderEffect from "./headerEffect";
import styles from "./resume.module.css";




class Resume{
   public readonly resumeData:resumeType;
   public show:boolean;
   public nameResumes:{id:number,name:string}[];
   public nameReferences:{id:number,name:string}[];
   public nameLetters:nameLetterType[];
   public readonly dataRow:string;
   public readonly rowId:string;
   public readonly containerId:string;
   public readonly dataContainer:string;
   public readonly injectorId:string;
   public readonly injectorQuery:string;


    constructor(public _injector:HTMLElement,private _service:Service,public headerEffect:HeaderEffect,public resumeRef:Reference,public viewResume:ViewResume,public createResume:CreateResume){
        this.nameLetters=[] as nameLetterType[];
        this.resumeData=resume;
        this.show=false;
        this.nameResumes=[] as {id:number,name:string}[];
        this.nameReferences=[] as {id:number,name:string}[];
        this.dataRow="div[data-row-display]";
        this.rowId="container-row";
        this.containerId="container-resumes";
        this.dataContainer="section[data-resume-container]";
        this.headerEffect.dataRow=this.dataRow;
        this.headerEffect.rowId=this.rowId;
        this.injectorId=this._injector.id;
        const node=this._injector.nodeName.toLowerCase();
        this.injectorQuery=`${node}#${this._injector.id}`;
    };


    //-----------------GETTERS/SETTERS---------------//
    get injector(){
        return this._injector
    };
    //-----------------GETTERS/SETTERS---------------//
    async main({parent}:{parent:HTMLElement}){
        let french=false;
        console.log("french",french);
        parent.style.position="relative";
        parent.style.zIndex="0";
        const less400= window.innerWidth < 400;
        this.headerEffect.main({parent,less400,french});
       //CREAT BUTTON CHANGE LANGUAGE && RECYCLE: main()
       const langBox=document.createElement("div");
       langBox.id="lang-box";
       langBox.className=styles.langBox;
        parent.appendChild(langBox);
        const small=document.createElement("small");
        small.textContent="français";
        langBox.appendChild(small);
       
        langBox.onclick=(e:MouseEvent)=>{
            if(!e) return;
            if(small.textContent==="français"){
                small.textContent="english";
                french=true;
                this.headerEffect.main({parent,less400,french});
            }else{
                small.textContent="français";
                french=false;
                this.headerEffect.main({parent,less400,french});
            }
            langBox.animate([
                {transform:"rotateX(0deg) translate(-20px, 10px)"},
                {transform:"rotateX(360deg) translate(-20px, 10px)"},
            ],{duration:1000,iterations:1});
        };
    };

  



    static convertSitename({site}:{site:string}):{name:string,pathname:string,http:string}{
        const http:RegExp=/(https:\/\/)/;
        const dotEnd:RegExp=/(\.com)|(\.ca)|(\.gov)|(\.as)|(\.eng)|(\.uk)/;
        
        const testhttp=http.test(site);
        const testDotEnd=dotEnd.test(site);
        const startHttp=RegExp(http).exec(site);
        if(testhttp){
            if(startHttp){
                const word=site.slice(startHttp.index+startHttp[0].length,site.length);
                if(testDotEnd){
                    const startDotEnd=RegExp(dotEnd).exec(word);
                    if(startDotEnd){
                        const domain=word.slice(0,startDotEnd.index+startDotEnd[0].length);
                        const pathname=word.slice(startDotEnd.index+startDotEnd[0].length,site.length);
                        const name=`${domain}${pathname}`
                        return {name,pathname,http:site}
                    }
                };

            };
            
        };
        return {name:site,pathname:"/",http:site}
    };

   static cleanUpById({parent,id}:{parent:HTMLElement,id:string}){
        ([...parent.children ] as HTMLElement[]).forEach(child=>{
            if(child && child.id===id){
                parent.removeChild(child);
            }
        });
    };

    static cleanUp(parent:HTMLElement){
        while(parent.firstChild){
            if(parent.lastChild){
                parent.removeChild(parent.lastChild);
            }
        }
    }
    
    static simpleButton(btn:{anchor:HTMLElement,type:"submit"|"button",bg:string,color:string,text:string,time:number}):{button:HTMLButtonElement}{
        const {anchor,bg,color,text,type,time}=btn;
        const button=document.createElement("button");
        const rand=Math.round(Math.random()*100);
        button.id=`button-${type}-${rand}`;
        button.className="simpleButton";
        button.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;padding-inline:2rem;padding-block:0rem;align-self:center;z-index:0;";
        button.textContent=text;
        button.style.backgroundColor=bg;
        button.style.color=color;
        button.type=type;
        button.style.borderRadius="20px";
        button.classList.add("btnBoxShadow");
        if(!button.disabled){
            button.style.color=color;
            button.style.backdropFilter="";
            button.animate([
                {backdropFilter:"blur(20px)"},
                {backdropFilter:"blur(0px)"},
            ],{duration:1200,iterations:1});
        }else{
            button.style.color="transparent";
            button.style.backdropFilter="blur(10px)";
        }
        anchor.appendChild(button);
        button.onmouseover=(e:Event)=>{
            if(e){

                button.animate([
                    {color:color,background:bg,boxShadow:"1px 1px 12px 1px rgb(12, 175, 255)"},
                    {color:"black",background:"rgb(12, 175, 255)",boxShadow:"-1px -1px 12px 1px rgb(12, 175, 255)"},
                ],{iterations:1,duration:time})
            }
        };
        button.onmouseout=(e:Event)=>{
            if(e){

                button.animate([
                    {color:"black",background:"rgb(12, 175, 255)",boxShadow:"-1px -1px 12px 1px rgb(12, 175, 255)"},
                    {color:color,background:bg,boxShadow:"1px 1px 12px 1px rgb(12, 175, 255)"},
                ],{iterations:1,duration:time})
            }
        };
        button.style.zIndex="0"
        return {button};
    };


    static lineDivison({parent,width,background}:{parent:HTMLElement,width:string,background:string}){
        const line=document.createElement("div");
        line.style.cssText=`width:${width};height:2px;background-color:${background};margin-block:1rem;margin-inline:0;`;
        parent.appendChild(line);
    };

    static lineDivisonStyle({parent,width,cssStyle}:{parent:HTMLElement,width:string,cssStyle:{[key:string]:string}}){
        const line=document.createElement("div");
        type Entries<T> = {
            [K in keyof T]: [key: K, value: T[K]];
        }[keyof T][];
        line.style.cssText=`width:${width};height:2px;margin-block:1rem;margin-inline:0;`;
        line.style.setProperty("backgroundColor","black")
        for(const key of ((Object.keys(line.style)) as unknown as Entries<{key:string,value:string}>)){
            for(const [key1,value] of ((Object.keys(cssStyle)) as unknown as Entries<{key:string,value:string}>)){
               
                if( typeof(value)==="string" && typeof(key)==="string" && value){
                    if(key===key1){
                        if(key==="backgroundColor"){
                            line.style.backgroundColor=value
                        }else{
                            line.style[key]=value;

                        }
                    };
                }else if(typeof(key)==="number"){
                    if(line.style.item(key)){
                        line.style[key]=value
                    }
                };
            };
            
        
        }
        parent.appendChild(line);
    };
    
    static message(message:msgType){
        const {parent,msg,type,time}=message;
      
        const container=document.createElement("div");
        container.id="message-id";
        container.style.cssText="position:absolute;top:20%;width:80%;max-width:300px;backdrop-filter:blur(10px);margin-inline:auto;display:flex;place-items:center;flex-direction:column;border-radius:30px;box-shadow:1px 1px 6px 1px #0a2351,-1px -1px 6px -1px #0a2351;padding-inline:1rem;padding-block:0.5rem;background-color:#002244;z-index:2000;";
        const inner=document.createElement("div");
        inner.style.cssText="margin:auto;text-align:center;padding:inherit;box-shadow:1px 1px 6px 1px black;border-radius:30px;width:100%;";
        if(type==="warning"){
            container.style.backgroundColor="#edd309";
            inner.style.backgroundColor="white";
            inner.classList.add("text-warning");
        }else if(type==="success"){
            container.style.backgroundColor="#0919ed";
            inner.style.backgroundColor="white";
            inner.classList.add("text-info");
        }else if(type==="error"){
            container.style.backgroundColor="#f30a0a";
            inner.style.backgroundColor="blue";
            inner.classList.add("text-light");
        }
        const text=document.createElement("p");
        text.textContent=msg;
        text.style.cssText="margin:auto;font-size:110%; font-weight:bold;"
        inner.appendChild(text);
        container.appendChild(inner);
        parent.appendChild(container);
        container.animate([
            {transform:"translateY(100%) scale(0.3)",opacity:"0.3"},
            {transform:"translateY(0%) scale(1)",opacity:"1"},
        ],{duration:time,iterations:1});
        setTimeout(()=>{
            container.animate([
                {transform:"translateY(0%) scale(1)",opacity:"1"},
                {transform:"translateY(100%) scale(0)",opacity:"0"},
            ],{duration:time,iterations:1});
            setTimeout(()=>{
                ([...parent.children] as HTMLElement[]).map(child=>{
                    if(child.id===container.id){
                        container.remove();
                    }
                });
            },time-20);
        },time*3);

    };


    static deletePopup({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        const xDiv=document.createElement("div");
        xDiv.style.cssText="position:absolute;padding:2px;background-color:black;color:white;border-radius:50%;top:0%;right:0%;transform:translate(0px,-6px);";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",borderRadius:"50%",fontSize:"14px"}});
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
                parent.removeChild(target);
            }
        };
    };
    
    static openCloseEffect({parent,target,time,show}:{target:HTMLElement,parent:HTMLElement,time:number,show:boolean}){
        const node=target.nodeName.toLowerCase();
        const id=target.id;
        const getTarget=parent.querySelector(`${node}#${id}`) as HTMLElement;
        if(!getTarget) return;
        if(show){
            getTarget.style.transform="translateY(0%)";
            getTarget.style.opacity="1";
            getTarget.animate([
                {transform:"translateY(100%)",opacity:"0"},
                {transform:"translateY(0%)",opacity:"1"},
            ],{duration:time,iterations:1});
        }else{
            getTarget.style.transform="translateY(-100%)";
            getTarget.style.opacity="0";
            getTarget.animate([
                {transform:"translateY(0%)",opacity:"1"},
                {transform:"translateY(100%)",opacity:"0"},
            ],{duration:time,iterations:1});

            setTimeout(()=>{
                parent.removeChild(getTarget);
            },time-20);
        }
    }
   
};
export default Resume;
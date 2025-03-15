import { providerType} from "@/components/editor/Types";

import {FaCreate} from "@/components/common/ReactIcons";
import { FaStar,FaStarHalf,FaRegStar, FaCrosshairs } from "react-icons/fa";
import { IconType } from "react-icons";
import { buttonReturn,imageLoader,httpImageLoader } from "./tsFunctions";
import Nav from "../nav/headerNav";
import Header from "../editor/header";
import { locationEnumType } from "@/lib/attributeTypes";




export type btnMsgType={
    btn_type:"button" | "submit" |"reset" | undefined,
    msg:string,
    parent:HTMLElement | null,
    msgType:"warning" |"success"|"error"|"normal" ,
    btnColor:string,
    btnBgColor:string,
    btnLabel:string,
}
export type btnOptionType2={
    btn_type2:"button" | "submit" |"reset" | undefined,
    msg2:string,
    btnColor2:string,
    btnBgColor2:string,
    btnLabel2:string,
}
export type btnOptionType={
    btn_type:"button" | "submit" |"reset" | undefined,
    msg:string,
    btnColor:string,
    btnBgColor:string,
    btnLabel:string,
}
export type btnOptionMsgType={
    button1:btnOptionType,
    button2:btnOptionType2,
}
export type msgType={
    parent:HTMLElement,
    msg:string,
    type_:"warning"|"success"|"error",
    time:number
}
export type insertSpanType={
    parent:HTMLElement,
    text:string,
    css:string,
    class_:string
}
export type anchorType={
    parent:HTMLElement,
    text:string,
    href:string,
    css:string,
    class_:string
}
export type fadeOutType={
    anchor:HTMLElement,
    xpos:number,
    ypos:number,
    time:number
}
export type slideInGrowType={
    anchor:HTMLElement,
    scale:number,
    xpos:number,
    ypos:number,
    time:number
}
export type growType={
    anchor:HTMLElement,
    opacity:number,
    scale:number,
    time:number
}
export type mediaQueryType={
    target:HTMLElement,
    css_min_attribute:{[key:string]:string},
    css_max_attribute:{[key:string]:string},
    minWidth:number,
    maxWidth:number
}
class Misc{
    public static providersImgs:{id:string,name:string,img:string}[]=[
        {id:"",name:"google",img:"/images/providers/gmail.png"},
        {id:"",name:"facebook",img:"/images/providers/facebook.png"},
        {id:"",name:"instragramProvider",img:"/images/providers/instagram.png"}
    ]
    public static words:string[]=["The sky", "above", "the port","was", "the color of television", "tuned", "to", "a dead channel", ".", "All", "this happened", "more or less","." ,"I", "had", "the story", "bit by bit", "from various people", "and", "as generally", "happens", "in such cases", "each time", "it", "was", "a different story","." ,"It", "was", "a pleasure", "to", "burn"]
    public static bgColor:string="#34282C";
    public static btnColor:string="#00008B";
    public static baseUrl:string;
    public static stars:{name:string,icon:IconType}[]=[{name:"full",icon:FaStar},{name:"half",icon:FaStarHalf},{name:"empty",icon:FaRegStar},];
    public static blueShades=[{name:"astros",value:"rgb(0, 45, 98)"},{name:"azure",value:"rgb(0, 127, 255)"},{name:"bayern",value:"rgb(0, 102, 178)"},{name:"boeing",value:"rgb(0, 57, 166)"},{name:"brave navy",value:"rgb(19, 39, 79)"},{name:"brewers",value:"rgb(10, 35, 81)"},{name:"capri",value:"rgb(0, 191, 255)"},{name:"chlorine blue",value:"rgb(12, 175, 255)"},{name:"college navy",value:"rgb(0, 34, 68)"},{name:"cubs blue",value:"rgb(14, 51, 134)"},{name:"dark blue",value:"rgb(14, 51, 134)"},{name:"delf blue",value:"rgb(31, 48, 94)"},{name:"primary blue",value:"rgb(8, 4, 249)"},{name:"royal blue",value:"rgb(6, 3, 174)"},];

    public static blueShades2=[{name:"astros",value:"rgba(0, 45, 98,1)"},{name:"azure",value:"rgba(0, 127, 255,1)"},{name:"bayern",value:"rgba(0, 102, 178,1)"},{name:"boeing",value:"rgba(0, 57, 166,0.5)"},{name:"brave navy",value:"rgba(19, 39, 79,0.5)"},{name:"brewers",value:"rgba(10, 35, 81,0.5)"},{name:"capri",value:"rgba(0, 191, 255,0.5)"},{name:"chlorine blue",value:"rgba(12, 175, 255,0.5)"},{name:"college navy",value:"rgba(0, 34, 68,0.5)"},{name:"cubs blue",value:"rgba(14, 51, 134,0.5)"},{name:"dark blue",value:"rgba(14, 51, 134,0.5)"},{name:"delf blue",value:"rgba(31, 48, 94,0.5)"},{name:"primary blue",value:"rgba(8, 4, 249,0.5)"},{name:"royal blue",value:"rgba(6, 3, 174,0.5)"},];

    public static background=[{name:"select",value:"select"},{name:"white",value:"white"},{name:"whitesmoke",value:"whitesmoke"},{name:"astros",value:"#002D62"},{name:"azure",value:"#007FFF"},{name:"bayern",value:"#0066b2"},{name:"boeing",value:"#0039a6"},{name:"brave navy",value:"#13274F"},{name:"brewers",value:"#0a2351"},{name:"capri",value:"#00BFFF"},{name:"chlorine blue",value:"#0CAFFF"},{name:"college navy",value:"#002244"},{name:"cubs blue",value:"#0E3386"},{name:"dark blue",value:"#00008B"},{name:"delf blue",value:"#1F305E"},{name:"silver",value:'#C0C0C0'},{name:"charcoal",value:"#34282C"},{name:"charcoal",value:"#34282C"},{name:"night",value:"#0C090A"},{name:"oil",value:"#3B3131"},{name:"iridium",value:"#3D3C3A"},{name:"rat grey",value:"#6D7B8D"},];

    public static fontFamilys=[{name:"poppins-black",value:"Poppins-Black"},{name:"poppins-regular",value:"Poppins-Regular"},{name:"poppins-thin",value:"Poppins-Thin"},{name:"lobsterTwo-regular",value:"LobsterTwo-Regular"},{name:"lobsterTwo-bold",value:"LobsterTwo-Regular"},];

    public static colors=[{name:"select",value:"black"},{name:"remove",value:"remove"},{name:"red",value:"red"},{name:"black",value:"black"},{name:"purple",value:"purple"},{name:"green",value:"green"},{name:"whitesmoke",value:"whitesmoke"},{name:"cyan",value:'#00FFFF'},{name:"lime",value:'#00FF00'},{name:"magenta",value:'#FF00FF'},{name:"silver",value:'#C0C0C0'},{name:"orange",value:'#FFA500'},{name:"maroon",value:"#800000"},{name:"charcoal",value:"#34282C"},{name:"charcoal",value:"#34282C"},{name:"night",value:"#0C090A"},{name:"oil",value:"#3B3131"},{name:"iridium",value:"#3D3C3A"},{name:"rat grey",value:"#6D7B8D"},];

    public static shades=["greys","grey","none","#ffffff","#f3f5f5","#eaedee","#eaedee","#dde1e3","#dde1e3","#c6cdd1","#b4bdc2","#b4bdc2","#bdc5c9","#bdc5c9","#0e0e0e"];
   public static blue_shades=["blues","blue","none","#E1EBEE","#72A0C1","#F0F8FF","#00FFFF","#7FFFD4","#6CB4EE","#0066b2","#B9D9EB","#00FFFF","#00CED1","#6082B6","#5D76A9","#AFEEEE"];
    public  static font_family=[
     {name:"select",value:"select"},
     {name:"Roboto",value:"'Roboto', sans serif"},
     {name:"Helvetica",value:"'Helvetica', sans serif"},
     {name:"Helvetica Neue",value:"'Helvetica Neue', sans serif"},
     {name:"Helvet",value:"'Helvet', sans serif"},
     {name:"Times",value:"'Times', serif"},
     {name:"Segoe UI",value:"'Segoe UI' , sans serif"},
     {name:"Arial",value:"'Arial', sans serif"},
     {name:"Noto Sans",value:"'Noto Sans', serif"},
     {name:"Liberation",value:"'Liberation Sans', sans serif"},
     {name:"poppins-black",value:"Poppins-Black"},
     {name:"poppins-regular",value:"Poppins-Regular"},
     {name:"poppins-thin",value:"Poppins-Thin"},
     {name:"lobsterTwo-regular",value:"LobsterTwo-Regular"},
     {name:"lobsterTwo-bold",value:"LobsterTwo-Regular"},
     {name:"Play-write",value:"Playwrite"}
 ]

    constructor(){
        
        Misc.baseUrl=window.location.origin;
        Misc.stars=[{name:"full",icon:FaStar},{name:"half",icon:FaStarHalf},{name:"empty",icon:FaRegStar},]
    };
    static wordGen(count:number):string[]{
        return Array.from(Array(count).keys()).map(num=>(Misc.words[Math.floor(Math.random()*(Misc.words.length + num))]));
    };
    static divider_1(parent:HTMLElement,color:string):HTMLElement{
        const div=document.createElement("div");
        div.style.cssText="padding:1rem;";
            const line=document.createElement("hr");
            line.setAttribute("name","hr");
            line.style.cssText=`margin-inline:auto;width:80%;height:4px;background:aquamarine;border-radius:30px;box-shadow:1px 1px 3px 1px black,-1px -1px 3px -1px black;margin-block:2rem;`;
            line.id=`divider-${Math.round(Math.random()*1000)}`;
            line.setAttribute("name","div");
            line.style.backgroundColor=color;
            div.appendChild(line);
            parent.appendChild(div);
            div.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    div.classList.toggle("isActive");
                }
            });
        return line;
    };
    static divider(item:{parent:HTMLElement,numLines:number,divCont:HTMLElement,color:string}):{target:HTMLElement,divcont:HTMLElement}{
        const {parent,numLines,divCont,color}=item;
        const target = document.createElement("div");
        target.id=`divider-${Math.round(Math.random()*1000)}`;
        target.setAttribute("name","div");
        target.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;position:relative;";
        target.className="divider";
        let width=80;
        Array.from(Array(numLines).keys()).map((num,index)=>{
            const line=document.createElement("hr");
            line.setAttribute("name","hr");
            line.style.cssText=`margin-inline:auto;width:80%;height:4px;background:aquamarine;border-radius:30px;box-shadow:1px 1px 3px 1px black,-1px -1px 3px -1px black,`;
            line.id=`divider-${Math.round(Math.random()*1000)}`;
            line.style.backgroundColor=color;
            line.style.opacity=`${1- (index)/numLines}`;
            line.style.transform=`translateY(-${(index +1) *20}px)`;
            if(index===0){
                target.appendChild(line);
            }else{
                width=width/1.62;
                line.style.width=`${width}%`;
                target.appendChild(line);
            }
            
        });
        divCont.appendChild(target)
        parent.appendChild(divCont);
        
        return {divcont:divCont,target};
    };
  
    //DELAY 3000
    static message(message:msgType){
        const {parent,msg,type_,time}=message;
      
        const container=document.createElement("div");
        container.id="message-id";
        container.style.cssText="position:absolute;top:20%;width:80%;max-width:300px;backdrop-filter:blur(10px);margin-inline:auto;display:flex;place-items:center;flex-direction:column;border-radius:30px;box-shadow:1px 1px 6px 1px #0a2351,-1px -1px 6px -1px #0a2351;padding-inline:1rem;padding-block:0.5rem;background-color:#002244;";
        const inner=document.createElement("div");
        inner.style.cssText="margin:auto;text-align:center;padding:inherit;box-shadow:1px 1px 6px 1px black;border-radius:30px;width:100%;";
        if(type_==="warning"){
            container.style.backgroundColor="#edd309";
            inner.style.backgroundColor="white";
            inner.classList.add("text-warning");
        }else if(type_==="success"){
            container.style.backgroundColor="#0919ed";
            inner.style.backgroundColor="white";
            inner.classList.add("text-info");
        }else if(type_==="error"){
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
                ([...parent.children as any] as HTMLElement[]).map(child=>{
                    if(child.id===container.id){
                        container.remove();
                    }
                });
            },time-20);
        },time*3);

    };
    static messageHeader(message:msgType){
        const {parent,msg,type_}=message;
        parent.style.position="relative";
        const container=document.createElement("div");
        container.id="message-id";
        container.style.cssText="position:absolute;width:80%;max-width:300px;min-height:5vh;backdrop-filter:blur(10px);margin-inline:auto;display:flex;place-items:center;border-radius:30px;box-shadow:1px 1px 6px 1px #0a2351,-1px -1px 6px -1px #0a2351;padding-inline:1rem;padding-block:0.5rem;background-color:#002244;";
        const inner=document.createElement("div");
        inner.style.cssText="margin:auto;text-align:center;padding:inherit;box-shadow:1px 1px 6px 1px black;border-radius:30px;width:100%;";

        container.style.top="170% ";
        container.style.left="20% ";
        container.style.right="20% ";
    
        if(type_==="warning"){
            inner.style.backgroundColor="pink";
            inner.style.color="yellow";
        }else if(type_==="success"){
            inner.style.backgroundColor="whitesmoke";
            inner.style.color="green";
        }else if(type_==="error"){
            inner.style.backgroundColor="blue";
            inner.style.color="white";
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
        ],{duration:600,iterations:1});
        setTimeout(()=>{
            container.animate([
                {transform:"translateY(0%) scale(1)",opacity:"1"},
                {transform:"translateY(100%) scale(0)",opacity:"0"},
            ],{duration:600,iterations:1});
            setTimeout(()=>{
                ([...parent.children as any] as HTMLElement[]).map(child=>{
                    if(child.id===container.id){
                        container.remove();
                    }
                });
            },580);
        },3500);

    };
    
    static btnMessagePopup(message:btnMsgType):HTMLElement | null{
        const {parent,msg,msgType,btn_type,btnColor,btnBgColor,btnLabel}=message;
        const conversion=(label:string)=>{
            const result=[{name:"save",name2:"saving"}].find(name=>(name.name===label));
            if(result) return result.name2
            return label
        };
        const convert=conversion(btnLabel) ? conversion(btnLabel) : btnLabel;
        const container=document.createElement("div");
        container.style.cssText=`position:absolute;inset:0%;margin-inline:auto;display:flex;place-items:center;rgba(0,0,0,0.2);box-shadow:1px 1px 1px 1px ${btnBgColor};width:75px;border-radius:10px;`;
        const title=document.createElement("h6");
        title.className="text-primary lean display-6 text-center mb-4";
        title.style.cssText="margin-block:1rem; margin-inline:auto;padding-inline:0.75rem;text-decoration:underline;text-underline-offset-4;"
        const inner=document.createElement("div");
        inner.style.cssText="margin:auto;text-align:center;padding-block:1rem;padding-inline:auto;box-shadow:1px 1px 6px 1px black;border-radius;10px;display:flex;flex-direction:column;gap:1rem;background:black;";
        const para=document.createElement("p");
        para.className=" lean text-center";
        para.style.cssText="margin:auto;padding:auto;font-size:11px;color:white;";
        para.className="text-primary lean";
        const btn=document.createElement("button");
        btn.style.cssText=`padding-inline:1rem;padding-block:0.25rem;border-radius:20px;box-shadow:1px 1px 6px 1px ${btnBgColor},-1px -1px 6px 1px ${btnBgColor};color:${btnColor}:background-color:${btnBgColor};font-size:12px;`;
        btn.type=btn_type || "button";
        if(parent){
            parent.style.position="relative";
            
            if(msgType==="warning"){
                inner.style.backgroundColor="#f94449";
                inner.style.color="white";
                btn.textContent="close";
            }else if(msgType==="success"){
                 title.textContent=" Error sorry";
                inner.style.backgroundColor="#90ff90";
                inner.style.color="black";
                btn.textContent="close";
            }else if(msgType==="error"){
                 title.textContent=" Error sorry";
                inner.style.backgroundColor="#00008b";//darkblue
                inner.style.color="red";
                btn.textContent="close";
            }else if(btn_type==="button"){
                btn.textContent=btnLabel;
                title.textContent=convert;
            }else{
                btn.textContent=btn.type;
                title.textContent=convert;
            }
            
            para.textContent=msg;
            inner.appendChild(title);
            inner.appendChild(para);
            container.appendChild(inner);
            parent.appendChild(container);
            container.animate([
                {transform:"translateY(100%) scale(0.3)",opacity:"0.3"},
                {transform:"translateY(0%) scale(1)",opacity:"1"},
            ],{duration:600,iterations:1});
            btn.onmouseover=()=>{
                btn.style.color="white";
                btn.style.backgroundColor="black";
                btn.animate([
                    {transform:"scale(1)",color:"pink",backgroundColor:btnBgColor},
                    {transform:"scale(1.05)",color:"white",backgroundColor:"black"},
                ],{duration:600,iterations:1});
            };
            btn.onmouseout=()=>{
                btn.style.color=btnColor;
                btn.style.backgroundColor=btnBgColor;
                btn.animate([
                    {transform:"scale(1)",color:"white",backgroundColor:"black"},
                    {transform:"scale(1.05)",color:btnColor,backgroundColor:btnBgColor},
                ],{duration:600,iterations:1});
            };
            inner.appendChild(title);
            inner.appendChild(para);
            inner.appendChild(btn);
            container.appendChild(inner);
            parent.appendChild(container);
            btn.addEventListener("click",(e:MouseEvent) =>{
                if(e){
                    (parent as HTMLElement).removeChild(container)
                }
            });
            return btn;
        }
        return null;

    };

    static saveMessage(parent:HTMLElement,str:string){
        const popup=document.createElement("div");
        popup.style.cssText="position:absolute;inset:%0;width:25%;height:50%;background:backfrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center; justify-content:center;gap:1rem;";
        const text=document.createElement("p");
        text.textContent=str;
        popup.appendChild(text);
        parent.appendChild(popup);
        popup.animate([
            {transform:"scale(0.2)",opacity:0},
            {transform:"scale(1)",opacity:1}

        ],{duration:1000,iterations:1});
        setTimeout(()=>{
            popup.animate([
                {transform:"scale(1)",opacity:1},
                {transform:"scale(0)",opacity:0}
    
            ],{duration:800,iterations:1});
       
        },1800);
        
     };

    static btnOptionMessagePopup(topParent:HTMLElement,options:btnOptionMsgType,loc:locationEnumType):{btn1: HTMLButtonElement,btn2: HTMLButtonElement,container:HTMLElement,grandParent:HTMLElement}{
        let grandParent:HTMLElement|null;
        const {btn_type,msg,btnColor,btnBgColor,btnLabel}=options.button1;
        const {btn_type2,msg2,btnColor2,btnBgColor2,btnLabel2}=options.button2;
        const check=topParent.getAttribute("is-column");
        const container=document.createElement("div");
        container.style.cssText="position:absolute;width:350px;height:auto;background-color:#002D62;border-radius:15px;box-shadow:1px 1px 10px 1px #00BFFF; padding:1rem;display:flex;flex-wrap:wrap;justify-content:space-around;gap:1rem;margin-block:1rem;margin-inline:auto;color:white;font-size:12px;top:30%;left:0%;z-index:2000;";
        if(loc==="footer"){
            container.style.transform="translateY(-50%)";
        }else if(loc==="main"){
            container.style.transform="translateY(0%)";
        }else if(loc==="flexbox"){
            container.style.transform="translateY(-20%)"
        }
        if(check==="true"){
            grandParent=topParent.parentElement as HTMLElement;
        }else{
            grandParent=topParent as HTMLElement;
        }

        const btnCont1=document.createElement("div");
        btnCont1.style.cssText="display:flex;place-items:center;gap:0.67rem;"
        const text1=document.createElement("p");
        text1.textContent=msg;
        const btn1=document.createElement("button");
        btn1.style.cssText=`padding-inline:1.5rem;padding-block:0.25rem;background-color:${btnBgColor};color:${btnColor};border-radius:20px;box-shadow:1px 1px 7px 1px white,-1px -1px 7px 1px white;`;
        btn1.type=btn_type || "button";
        btn1.textContent=btnLabel;
        btnCont1.appendChild(text1);
        btnCont1.appendChild(btn1);
        const btnCont2=document.createElement("div");
        btnCont2.style.cssText="display:flex;place-items:center;gap:0.67rem;"
        const text2=document.createElement("p");
        text2.textContent=msg2;
        const btn2=document.createElement("button");
        btn2.style.cssText=`padding-inline:1.5rem;padding-block:0.25rem;background-color:${btnBgColor2};color:${btnColor2};border-radius:20px;box-shadow:1px 1px 7px 1px white,-1px -1px 7px 1px white;`;
        btn2.type=btn_type2 || "button";
        btn2.textContent=btnLabel2;
        btnCont2.appendChild(text2);
        btnCont2.appendChild(btn2);
        container.appendChild(btnCont1);
        container.appendChild(btnCont2);
        grandParent.appendChild(container);
        Misc.matchMedia({parent:container,maxWidth:500,cssStyle:{left:"0%",right:"0%"}});
        container.animate([
            {transform:"scale(0.2)",opacity:"0"},
            {transform:"scale(1)",opacity:"1"}
        ],{duration:600,iterations:1});
        const retCont={btn1,btn2,container,grandParent};
        return retCont;
        
    };

    static insertSpan(spanInsert:insertSpanType):HTMLSpanElement{
        const {parent,text,css,class_}=spanInsert;
        const span=document.createElement("span");
        span.textContent=text;
        span.style.cssText=css;
        span.className=class_
        span.setAttribute("is-element","true");
        span.setAttribute("contenteditable","true");
        parent.appendChild(span);
       
        return span;
    };

    static insert_anchor(anchor_:anchorType):HTMLSpanElement{
        const shade=Misc.blueShades.find(sh=>(sh.name==="chlorine blue"))?.value;
        const {parent,text,css,class_,href}=anchor_;
        const anchor=document.createElement("a");
        anchor.textContent=text;
        anchor.style.cssText=css;
        anchor.className=class_;
        anchor.href=href;
        anchor.setAttribute("email-tel",href);
        anchor.setAttribute("is-element","true");
        anchor.setAttribute("contenteditable","true");
        parent.appendChild(anchor);
        anchor.onmouseover=()=>{
            anchor.animate([
                {boxShadow:`1px 1px 4px 1px ${shade}`},
                {boxShadow:`1px 1px 7px 2px red`},
                {boxShadow:`1px 1px 4px 1px ${shade}`},
            ],{duration:1000,iterations:1});
        };
        return anchor;
    };

    static fadeOut(fadeout:fadeOutType){
        const {anchor,xpos,ypos,time}=fadeout;
        anchor.animate([
            {transform:`translate(0%,0%) scale(1)`,opacity:"1"},
            {transform:`translate(-${xpos}%,-${ypos}%) scale(0)`,opacity:"0"},
        ],{duration:time,iterations:1});
    };

    static fadeIn(fadeout:fadeOutType){
        const {anchor,xpos,ypos,time}=fadeout;
        anchor.animate([
            {transform:`translate(-${xpos}%,-${ypos}%)`,opacity:"0"},
            {transform:`translate(0%,0%) scale(1)`,opacity:"1",offset:1},
        ],{duration:time,iterations:1,easing:"ease-in"});
    };

    static growOut(fadeout:growType){
        const {anchor,opacity,scale,time}=fadeout;
        anchor.animate([
            {transform:`scale(1)`,opacity:"1"},
            {transform:`scale(${scale})`,opacity:`${opacity}`},
        ],{duration:time,iterations:1});
    };

    static growIn(fadeout:growType){
        const {anchor,opacity,scale,time}=fadeout;
        anchor.animate([
            {transform:`scale(${scale})`,opacity:`${opacity}`},
            {transform:`scale(1)`,opacity:"1"},
        ],{duration:time,iterations:1});
    };

    static blurIn(object:{anchor:HTMLElement,blur:string,time:number}){
        const {anchor,blur,time}=object;
        anchor.style.filter=`blur(${0}px)`;
        anchor.animate([
            {filter:`blur(${blur})`},
            {filter:`blur(${0}px)`},
        ],{duration:time,iterations:1});
        setTimeout(()=>{
            anchor.style.filter="";
        },time +20);
    };

    static slideIn(fadeout:fadeOutType){
        const {anchor,xpos,ypos,time}=fadeout;
        anchor.animate([
            {transform:`translate(-${xpos}%,-${ypos}%)`,opacity:`0.2`},
            {transform:`translate(0%,0%)`,opacity:`1`},
        ],{duration:time,iterations:1});
    };

    static slideInGrow(fadeout:slideInGrowType){
        const {anchor,xpos,ypos,scale,time}=fadeout;
        anchor.animate([
            {transform:`translate(-${xpos}%,-${ypos}%) scale(${scale})`,opacity:`0.2`},
            {transform:`translate(0%,0%)`,opacity:`1`},
        ],{duration:time,iterations:1});
    };

    static slideOut(fadeout:fadeOutType){
        const {anchor,xpos,ypos,time}=fadeout;
        anchor.animate([
            {transform:`translate(0%,0%)`,opacity:`1`},
            {transform:`translate(-${xpos}%,-${ypos}%)`,opacity:`0.2`},
        ],{duration:time,iterations:1});
    };

    static growDown(grow_down:fadeOutType){
        const {anchor,xpos,ypos,time}=grow_down;
        //INCORPOATING IPHONE FORMATS ON xpos%
        const width= window.innerWidth < 412 ? 100 :xpos;
        const media:mediaQueryType={target:anchor,css_min_attribute:{"width":`${xpos}%`},css_max_attribute:{"width":"100%"},minWidth:412,maxWidth:412};
        Misc.mediaQuery(media);
        anchor.animate([
            {height:"0vh",width:`0%`,opacity:"0"},
            {height:`${ypos}vh`,width:`${width}%`,opacity:"1"}
        ],{duration:time,iterations:1});
    };

    static growUp(grow_up:fadeOutType){
        const {anchor,xpos,ypos,time}=grow_up;
         //INCORPOATING IPHONE FORMATS ON xpos%
         const width= window.innerWidth < 412 ? 100 :xpos;
         const media:mediaQueryType={target:anchor,css_min_attribute:{"width":`${xpos}%`},css_max_attribute:{"width":"100%"},minWidth:412,maxWidth:412};
         Misc.mediaQuery(media);
        anchor.animate([
            {height:`${ypos}vh`,width:`${width}%`,opacity:"1"},
            {height:"0vh",width:`0%`,opacity:"0"},
        ],{duration:time,iterations:1});
    };

    static saveNoBlogSetup(parent:HTMLElement): {retParent:HTMLElement,retBtn:HTMLButtonElement,container:HTMLElement}{
        const container = document.createElement("section");
            container.id="main";
            container.className = "";
            container.style.cssText=`margin:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch;width:100%;position:absolute;inset:25%;height:auto;background-color:white;padding:1rem;padding-block:2rem;z-index:100;border-radius:20px;box-shadow:1px 1px 10px 1px ${Misc.btnColor},-1px -1px 10px 1px ${Misc.btnColor};`
            const title=document.createElement("h3");
            title.textContent="about this button";
            title.style.cssText="text-align:center;margin-bottom:2rem;";
            title.className="text-primary";
            const desc=document.createElement("p");
            desc.style.cssText="margin-block:1rem";
            desc.className="px-md-2 ";
            desc.innerHTML=`This button allows you to recover your work encase you refresh the page.
            <span style="color:red; font-size:105%">CAUTION</span><span style="color:${Misc.btnColor}">!!</span>, if you are concern about loosing your work, please save your work.<br/>
                How to save your work?: 
                <ul>
                <li> press the <pre style="font-style:italic;">'final'button ( top-right)</pre></li>
                <li> then <pre style="font-style:italic;">"save"</pre>.</li>
                </ul>
                <br/> 
                Similarly, if you want to print your final work:
                <ul> 
                <li>press the button <span style="font-style:italic;"> "final"</span>
                </li>
                <li>
                then press <span style="font-style:italic;"> "print"</span>
                </li>
                <br/>
                your work will be encapsulated in an image for best viewing.
                <br/>
                <q><pre>Thanks for understanding and enjoy</pre></q>;
            `;
            container.appendChild(title);
            container.appendChild(desc);
            const div=document.createElement("div");
            div.style.cssText="display:flex;place-items:center;margin:5rem;";
            
            const retBtn=buttonReturn({parent:div,text:"close",bg:Misc.btnColor,color:"white",type:"button"});
            container.appendChild(retBtn);
            parent.removeChild(container);
        return {retParent:parent,retBtn,container}
    };

   static fillBlogNameDesc({parent,cssPopup}:{parent:HTMLElement,cssPopup:{[key:string]:string}}):{btn:HTMLButtonElement,popup:HTMLElement,form:HTMLFormElement,input:HTMLInputElement,tinput:HTMLInputElement,textarea:HTMLTextAreaElement,retParent:HTMLElement}{
    const disabled:{input:boolean,textarea:boolean}={input:false,textarea:false}
      
        let useParent:HTMLElement|null=null
        const grandParent=parent.parentElement ? parent.parentElement:null;
        if (grandParent){
            useParent=grandParent
        }else{
            useParent=parent
        }
        const popup=document.createElement("section");
        popup.id="popup-blogNameDesc";
        popup.style.cssText="margin:auto;position:absolute;inset:120% 0% 0%;background-color:white;filter:drop-shadow(0 0 0.75rem crimson);border-radius:7px;z-index:200;padding:1rem;";
        popup.style.inset=`120% 0% 0%`;
        popup.style.maxWidth=`clamp(320px,400px,500px)`;
        popup.style.height=`clamp(420px,500px,600px)`;
        popup.style.width="100%";
        for(const key of Object.keys(popup.style)){
            for( const [key1,value1] of Object.entries(cssPopup)){
                if(key1===key){
                    popup.style[key]=value1;
                }
            }
        }
        const form=document.createElement("form");
        form.style.cssText="display:flexflex-direction:column;align-items:center;justify-content:center;gap:1rem;";
        const {input,label:labelName}=Nav.inputComponent(form);
        input.placeholder="your blog name";
        labelName.textContent="blog Name";
        labelName.className="display-6 text-primary";
        input.name="name";
        const {input:tinput,label:tlabel,formGrp:titleGrp}=Nav.inputComponent(form);
        titleGrp.style.cssText="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;";
        tinput.placeholder="your title";
        tlabel.textContent="title Name";
        tlabel.className="display-6 text-primary";
        tinput.name="title";
        tinput.id="title";
        tlabel.setAttribute("for",tinput.id);
        const {textarea,label:labelDesc}=Nav.textareaComponent(form);
        labelDesc.className="display-6 text-primary"
        textarea.placeholder="brief description";
        textarea.name="desc";
        const btn=buttonReturn({parent:form,color:"white",bg:Misc.btnColor,text:"submit",type:"submit"});
        //APPENDING FORM TO POPUP
        btn.disabled=true;
        input.onchange=(e:Event)=>{
            if(e){
                disabled.input=true;
                if(disabled.input && disabled.textarea){

                    btn.disabled=false;
                }
            }
        };
        textarea.onchange=(e:Event)=>{
            if(e){
                disabled.textarea=true;
                if(disabled.input && disabled.textarea){

                    btn.disabled=false;
                }
            }
        };
        popup.appendChild(form);
        //APPENDING POPUP TO PARENT
        useParent.appendChild(popup);
        //creating cancel
        const xDivIcon=document.createElement("div");
        xDivIcon.id="delete-fliiBlogForm";
        xDivIcon.className="delete";
        xDivIcon.style.cssText="position:absolute;top:0%;left:100%;transform:translate(-15px,2px);";
        FaCreate({parent:xDivIcon,name:FaCrosshairs,cssStyle:{color:"blue",fontSize:"1rem"}});
        //creating cancel
        //APPENDING CANCEL TO FORM
        form.appendChild(xDivIcon);
        xDivIcon.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{Header.cleanUpByID(parent,"popup-blogNameDesc")},398);
            }
        };
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{left:"10%",right:"10%"}});
        Misc.matchMedia({parent:popup,maxWidth:420,cssStyle:{left:"5%",right:"5%"}});
        return {btn,popup,form,input,tinput,textarea,retParent:useParent};



    };

    static signiMain(parent:HTMLElement,providers:providerType[],csrfToken:string|undefined){
        Header.cleanUpByID(parent,"signIn-main");
        parent.style.zIndex="";
        const outerContainer=document.createElement("div");
        outerContainer.style.cssText="margin-inline:auto;padding:1rem;border-radius:12px;"
        if(parent.style.position ==="relative"){
            outerContainer.style.position="absolute";
            outerContainer.style.inset="0% 20% 10% 20%";
            
        }
        const container=document.createElement("section");
        container.id="signIn-main";
        container.style.cssText="margin:auto;position:relative;background-color:white;filter:drop-shadow(0 0 0.75rem crimson);border-radius:7px;padding:1rem;;z-index:1000;display:flex;flex-direction:column;align-items:center;gap:2rem;padding:1.5rem;";
        Object.values(providers).map((provider)=>{
            //provider={callbackUrl:string=>https://,,,api/auth/callback/credentials or google,id:string=>"credentials/google",name:string,signinUrl:string=>http://local,,,api/auth/credentials}
            const signInCallBack=provider.callbackUrl as unknown as string;
            if((provider.id as unknown as string)==="credentials"){
                Misc.signInForm(container,signInCallBack,csrfToken);
            }else{
                Misc.signInProvider(container,signInCallBack,provider);

            }
        });
        outerContainer.appendChild(container);
        parent.appendChild(outerContainer);
        window.scroll(0,0);
        Misc.matchMedia({parent:outerContainer,maxWidth:400,cssStyle:{inset:"0% 5% 20% 5%"}});
    };

   static signInForm(parent:HTMLElement,signinUrl:string|undefined,csrfToken:string|undefined):{btn:HTMLButtonElement,container:HTMLElement,form:HTMLFormElement,email:HTMLInputElement,password:HTMLInputElement}{
        const cssGrp="margin:auto;display:flex;flex-direction:column;align-items:center;gap:1rem;";
        const container=document.createElement("section");
        container.id="container-signIn";
        container.style.cssText="margin:auto;background-color:white;filter:drop-shadow(0 0 0.75rem crimson);border-radius:7px;padding:1rem;;z-index:1000;display:flex;align-items:center;gap:1rem;flex-direction:column;position:relative;";
        container.style.width=`clamp(300px,400px,450px)`;
        container.style.minHeight=`400px`;
        const form=document.createElement("form");
        form.id="signin-form";
        form.method="POST";
        if(signinUrl){
            form.action=signinUrl;
        }
        if(csrfToken){
            const csrfInput=document.createElement("input");
            csrfInput.hidden=true;
            csrfInput.type="hidden";
            csrfInput.name="csrfToken";
            csrfInput.value=csrfToken;
            form.appendChild(csrfInput);
        }
        form.style.cssText="display:flexflex-direction:column;align-items:center;justify-content:center;gap:1rem;width:100%;";
        form.id="signInForm-credentials"
        const {input:email,label:labelEmail,formGrp:grpEmail}=Nav.inputComponent(form);
        grpEmail.style.cssText=cssGrp;
        grpEmail.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:center;gap:1rem;"
        email.placeholder="your email";
        email.type="email";
        email.autocomplete="on";
        email.value="";
        email.pattern="[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}";
        email.id="signInForm-credentials-emails";
        labelEmail.textContent="email";
        labelEmail.classList.add("display-6");
        labelEmail.setAttribute("for",email.id);
        email.name="email";
        email.autocomplete="email";
        email.placeholder=" requires a form of mymail@mail.com"
        const {input:password,label:labelPass,formGrp:grpPassword}=Nav.inputComponent(form);
        grpPassword.style.cssText=cssGrp;
        password.type="password";
        password.id="signInForm-credentials-password"
        password.pattern="[a-zA-Z0-9.?-]{5,}";
        password.value="";
        password.autocomplete="on";
        labelPass.textContent="password";
        labelPass.classList.add("display-6");
        labelPass.setAttribute("for",password.id);
        password.placeholder="must be more that 5 characters";
        password.name="password";
        const btn=buttonReturn({parent:form,color:"white",bg:Misc.btnColor,text:"submit",type:"submit"});
        //APPENDING FORM TO POPUP
        container.appendChild(form);
        //APPENDING POPUP TO PARENT
        parent.appendChild(container);
        email.onchange=(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        };
        password.onchange=(e:Event)=>{
            if(e){
                btn.disabled=false;
                const eValue=(email as HTMLInputElement).value;
                if(eValue && eValue !==""){
                    btn.disabled=false;
                }
            }
        };
        //----------MESSAGE------------///
        const res_e=document.createElement("small");
            res_e.id="email_msg";
            res_e.style.cssText="width:fit-content;padding:1rem;padding:4px;color:red;font-weight:bold;font-size:10px;";
            res_e.textContent="";
            grpEmail.appendChild(res_e);
        const res_p=document.createElement("small");
            res_p.id="pass_msg";
            res_p.style.cssText="width:fit-content;padding:1rem;padding:4px;color:red;font-weight:bold;font-size:10px;";
            res_p.textContent="";
            grpPassword.appendChild(res_p);
            email.addEventListener("input",(e:Event)=>{
                if(e){
                    let pswdVal:string="";
                    const value=(e.currentTarget as HTMLInputElement).value;
                    const test_email=Nav.regTest({item:"email",value});
                    const pswd=parent.querySelector("input#password") as HTMLInputElement|null;
                    if(pswd){
                        pswdVal=pswd.value
                    }
                    const test_pass=Nav.regTest({item:"password",value:pswdVal});
                    
                    if(test_email.item!=="pass"){
                        form.style.border="1px solid blue; border-radius:inherit;";
                        const text="excepts my_email@mail.com form";
                        res_e.textContent=text
                    }else{
                       ([...form.childNodes as any]as ChildNode[]).map(child=>{
                        if(child.nodeName==="SMALL"){
                            form.removeChild(child);
                        }
                       });
                       Header.cleanUpByID(grpEmail,"email_msg");
                       if(test_pass.item ==="pass"){
                        btn.disabled=true;
                       }
                    };
                }
            });
            password.addEventListener("input",(e:Event)=>{
            if(e){
                Header.cleanUpByID(grpPassword,"small#pass_msg");
                const value=(e.currentTarget as HTMLInputElement).value;
                const test=Nav.regTest({item:"password",value});
                const test_email=Nav.regTest({item:"password",value});
                
                if(test.item!=="pass"){
                    form.style.border="1px solid blue; border-radius:inherit;";
                    const text="at least 6 characters long please";
                    res_p.textContent=text
                }else{
                    
                    ([...form.childNodes as any]as ChildNode[]).map(child=>{
                        if(child.nodeName==="SMALL"){
                            form.removeChild(child);
                        }
                        });
                    if(test_email.item==="pass"){
                        btn.disabled=false;
                    }
                    Header.cleanUpByID(grpPassword,"small#pass_msg");
                }
    
            }
            });
        //----------MESSAGE------------///
        //------------window on load------------------//
        window.scroll(0,0);
        container.animate([
            {transform:"translateY(-100%)",opacity:0},
            {transform:"translateY(0%)",opacity:1},
           ],{duration:300,iterations:1});
           //-------------window on load--------------------//
           
        
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{width:"80%"}});
        Misc.matchMedia({parent:container,maxWidth:500,cssStyle:{width:"100%"}});
        Misc.growIn({anchor:container,scale:0,opacity:0,time:400});
        
        return {btn,container,form,email,password}
    };

    static signInProvider(parent:HTMLElement,signinUrl:string|undefined,provider:providerType):{container:HTMLElement}{
        //Misc.providersImgs
        const container=document.createElement("div");
        container.style.cssText="margin:auto;display:flex;justify-content:center;align-items:center;gap:1rem;flex-direction:column;position:relative;";
       
            Misc.providersImgs.map(item=>{
                if(item.name==="google" && (provider.id as unknown as string) ==="google"){
                    const form=document.createElement("form");
                    form.style.cssText="margin:auto;display:flex;align-items:center;gap:1rem;flex-direction:column;position:relative;"
                    form.id=`signInProvider-${Number(provider.id)}`;
                    form.method="POST";
                    if(signinUrl){
                        form.action=signinUrl;
                    }
                    const grp=document.createElement("div");
                    grp.id=`${item.name}-container`;
                    grp.style.cssText="margin:auto;width:100%;display:flex;align-items:center;justify-content:center;gap:1rem;flex-direction:column;"
                    const title=document.createElement("h6");
                    title.className="text-center text-primary text-decoration-underline text-underline-offset-2 my-1 lean display-6";
                    title.textContent=provider.name as unknown as string;
                    const img=document.createElement("img");
                    img.src=item.img;
                    img.alt="google";
                    img.style.cssText="max-width:250px;margin-inline:1rem";
                    grp.appendChild(title);
                    grp.appendChild(img);
                    form.appendChild(grp);
                   Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"white",type:"submit",time:400,text:"submit"});
                    container.appendChild(form);
                    form.onsubmit=(e:SubmitEvent) => {
                        if(e){
                            e.preventDefault();
                            Misc.message({parent,msg:"sent",type_:"success",time:600});
                        }
                    };

                }else if(item.name==="facebook" && (provider.id as unknown as string) ==="facebook"){
                    const form=document.createElement("form");
                    form.style.cssText="margin:auto;display:flex;align-items:center;gap:1rem;flex-direction:column;position:relative;"
                    form.id=`signInprovider-${Number(provider.id)}`;
                    form.method="POST";
                    if(signinUrl){
                        form.action=signinUrl;
                    }
                    const grp=document.createElement("div");
                    grp.id=`${item.name}-container`;
                    grp.style.cssText="margin:auto;width:100%;display:flex;align-items:center;justify-content:center;gap:1rem;flex-direction:column;"
                    const title=document.createElement("h6");
                    title.className="text-center text-primary text-decoration-underline text-underline-offset-2 my-1 lean display-6";
                    title.textContent=provider.name as unknown as string;
                    const img=document.createElement("img");
                    img.src=item.img;
                    img.alt=item.name;
                    img.style.cssText="max-width:250px;margin-inline:1rem";
                    grp.appendChild(title);
                    grp.appendChild(img);
                    form.appendChild(grp);
                   Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"white",type:"submit",time:400,text:"submit"});
                    container.appendChild(form);
                    form.onsubmit=(e:SubmitEvent) => {
                        if(e){
                            e.preventDefault();
                            Misc.message({parent,msg:"sent",type_:"success",time:600});
                        }
                    };
                }
            });
        
        parent.appendChild(container);
        return {container}

    };

    static imageForm(parent:HTMLElement): {form:HTMLFormElement,reParent:HTMLElement,label:HTMLElement,btn:HTMLButtonElement}{
        
       
        parent.style.position="relative";
        parent.style.zIndex="0";
        const css="border-radius:12px; box-shadow:1px 1px 4px 1px black;margin:auto;background:white;position:absolute;z-index:20;padding:2px;inset:0%;";
        const form=document.createElement("form");
        form.id="Misc-image-form"
        form.className="form-group d-flex flex-column align-items-center justify-content-center";
        form.setAttribute("data-form-group","true");
        form.style.cssText=css;
        form.style.height="auto";
        form.style.inset="0% 0% 10% 0%";
        form.style.width="clamp(200px,250px,300px)";
        
        const formGrp=document.createElement("div");
        formGrp.style.cssText="margin-inline:auto;display:flex;justify-content:center;align-items:center;flex-direction:column"
        formGrp.className="form-group";
        const label=document.createElement("label");
        label.textContent="pic a file";
        label.className="text-primary text-center text-decoration-underline text-underline-offset-4 mb-3";
        const input=document.createElement("input");
        input.id="file-id";
        label.setAttribute("for",input.id);
        input.className="form-control"
        input.type="file";
        input.name="file";
        input.accept="image/png image/jpg";
        formGrp.appendChild(label);
        formGrp.appendChild(input);
        form.appendChild(formGrp);
        const {button}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"white",type:"submit",time:400,text:"submit"});
        button.id="imgForm-btn";
        button.disabled=true;
        input.onchange=(e:Event)=>{
            if(e){
                button.disabled=false;
            }
        };
        form.animate([
            {transform:"scale(0)",opacity:"0"},
            {transform:"scale(1)",opacity:"1"}
        ],{duration:750,iterations:1});
        parent.appendChild(form);
       
        return {form,reParent:parent,label:label,btn:button};
    };

    static addLink(parent:HTMLElement):{form:HTMLFormElement,popup:HTMLElement,l_input:HTMLInputElement,n_input:HTMLInputElement}{
        parent.style.position="relative";
        parent.style.zIndex="0";
     
        const popup=document.createElement("section");
        popup.id="popup-link";
        popup.style.cssText="margin:auto;position:absolute;background-color:white;filter:drop-shadow(0 0 0.75rem crimson);border-radius:7px;padding:1rem;z-index:2000;";
        popup.style.top=`40% `;
        const form=document.createElement("form");
        form.style.cssText="display:flexflex-direction:column;align-items:center;justify-content:center;gap:1rem;";
        const {input:n_input,label:labelName}=Nav.inputComponent(form);
        n_input.placeholder="link name";
        labelName.textContent="link name";
        n_input.name="name";
        n_input.placeholder=" link name"
        const {input:l_input,label:labelLink}=Nav.inputComponent(form);
        labelLink.textContent="Link";
        l_input.pattern="(https://)[a-zA-Z0-9.]{2,}.[a-zA-Z]{1,3}";
        l_input.placeholder="form of https://......com";
        l_input.name="link";
        const btn=buttonReturn({parent:form,color:"white",bg:Misc.btnColor,text:"submit",type:"submit"});
        btn.disabled=true;
        //APPENDING FORM TO POPUP
        popup.appendChild(form);
        //APPENDING POPUP TO PARENT
        parent.appendChild(popup);
        l_input.addEventListener("input",(e:Event)=>{
            if(e){
                const reg_:RegExp=/(https:\/\/)[a-zA-Z0-9.]{2,}\.[a-zA-Z]{1,3}/g;
                const input=(e.currentTarget as HTMLInputElement).value;
                if(reg_.test(input)){
                    btn.disabled=false;
                }
            }
        });

        return{form,popup,l_input,n_input}
    };


    static animateScroll(parent:HTMLElement,target:HTMLElement){
        parent.style.width="90%";
        parent.style.overflowX="hidden";
        target.animate([
            {transform:"translateX(-120%)"},
            {transform:"translateX(120%)"}
        ],{duration:4000,iterations:20});

    };

    static buttonHoverEffect(btn:HTMLButtonElement){
        btn.style.animation="";
        btn.onmouseover=()=>{
            btn.animate([
                {transform:"scale(1)",opacity:"0.8",color:"inherit"},
                {transform:"scale(1.075)",opacity:"1",color:"red"},
                {transform:"scale(1)",opacity:"1",color:"inherit"},
            ],{duration:600,iterations:1});
        };
       
    };

    static mediaQuery(mediaPara:mediaQueryType){
        
        const {target,css_min_attribute,css_max_attribute,minWidth,maxWidth}=mediaPara;
        const max_width:boolean=window.matchMedia(`(max-width:${maxWidth}px)`).matches && window.matchMedia("(orientation:portrait)").matches;
        const min_width=window.matchMedia(`(min-width:${minWidth}px)`).matches && window.matchMedia("(orientation:portrait)").matches;
        
        if(target){
            if(max_width){
                for(const key of Object.keys(target.style)){
                    for(const[key1,value1] of Object.entries(css_max_attribute)){
                        if(key===key1){
                            target.style[key]=value1;
                        }
                    }
                }
               
            }
            if(min_width){
                for(const key of Object.keys(target.style)){
                    for(const[key1,value1] of Object.entries(css_min_attribute)){
                        if(key===key1){
                            target.style[key]=value1;
                        }
                    }
                }
               
            }
        }
    };

    static wantToSaveBeforeFunc(item:{parent:HTMLElement,functCancel:()=>Promise<void>,funcSave:()=>Promise<void>}):void{
        const {parent,functCancel,funcSave}=item;
        if(parent.style.position !=="absolute"){
            parent.style.position="relative";
        }
        window.scroll(0,0);
        const popup=document.createElement("div");
        popup.id="wantToSaveBlog-popup";
        popup.style.cssText="position:absolute;inset:10% 30% 50% 30%;background-color:rgba(14, 51, 134,0.5);border-radius:16px;box-shadow:1px 1px 12px 1px black;padding-inline:1.5rem;display:flex;flex-direction:column;justify-content:center;gap:1.5rem;align-items:center;padding-block:1rem;z-index:200;";
        const para=document.createElement("p");
        para.id="wantToSaveBlog-popup-notice-text"
        para.textContent=" Do you want to save?";
        para.style.cssText="color:white;margin-inline;auto;margin-block:1rem;text-decoration:underline;text-underline-offset:0.5rem;font-family:'Poppins-Thin';font-weight:bold;font-size:140%";
        const btnCont=document.createElement("div");
        btnCont.style.cssText="display:flex;justify-content:center;gap:2rem;align-items:center;padding-block:1rem;margin-inline:auto;flex-wrap:wrap;"
        popup.appendChild(para);
        const {button:cancel}=Misc.simpleButton({anchor:btnCont,bg:Nav.btnColor,color:"white",type:"button",time:400,text:"cancel"});
        cancel.onclick=(e:MouseEvent)=>{
            if(e){
                cancel.disabled=true;
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },390);
                functCancel();
            }
        };
        const {button:save}=Misc.simpleButton({anchor:btnCont,bg:Nav.btnColor,color:"white",type:"button",time:400,text:"save"});
        save.onclick=(e:MouseEvent)=>{
            if(e){
                save.disabled=true;
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },390);
                funcSave();
            }
        };
        popup.appendChild(btnCont);
        parent.appendChild(popup);
        Misc.fadeIn({anchor:popup,xpos:100,ypos:50,time:500});
        const getPopup=parent.querySelector("div#wantToSaveBlog-popup") as HTMLElement;
        Misc.matchMedia({parent:getPopup,maxWidth:900,cssStyle:{inset:"25% 5% 50% 5%"}});
        Misc.matchMedia({parent:getPopup,maxWidth:400,cssStyle:{inset:"20% 0% 30% 0%"}});
        Misc.matchMedia({parent:para,maxWidth:400,cssStyle:{fontWeight:"120%"}});
    };

    static matchMedia(media:{parent:HTMLElement,maxWidth:number,cssStyle:{[key:string]:string}}){
        const {parent,maxWidth,cssStyle}=media;
        const matches=window.matchMedia(`(max-width:${maxWidth}px)`).matches;
        if(matches && parent){
            for(const key of Object.keys(parent.style)){
                if(key){

                    for(const [key1,value1] of Object.entries(cssStyle)){
                        if(key1===key && value1){
                            parent.style[key]=value1;
                        }
                    }
                }
            }
        }
    };

    static matchMinMedia(media:{parent:HTMLElement,minWidth:number,cssStyle:{[key:string]:string}}){
        const {parent,minWidth,cssStyle}=media;
        const matches=window.matchMedia(`(min-width:${minWidth}px)`).matches;
        if(matches){
            for(const key of Object.keys(parent.style)){
                for(const [key1,value1] of Object.entries(cssStyle)){
                    if(key1===key){
                        parent.style[key]=value1;
                    }
                }
            }
        }
    };

    static observe(entryParams:{arr:HTMLElement[],root:HTMLElement|null,cssStyleOn:{[key:string]:string},cssStyleOff:{[key:string]:string},time:number}){
        const {arr,root,cssStyleOn,cssStyleOff,time}=entryParams;
        
        const addCssOnOff=(target:HTMLElement,cssStyleOn:{[key:string]:string})=>{
           
            for(const key of Object.keys(target.style)){
                // index++;☺
                for(const [key1,value1] of Object.entries(cssStyleOn)){
                    if(key===key1){
                        target.style[key]=value1
                    }
                }
            }
        }
        
        const observer=new IntersectionObserver(entries=>{
            const entry=entries[0];
          
                if(entry){
                    const html=entry.target as HTMLElement
                    if(entry.isIntersecting){
                        addCssOnOff(html,cssStyleOn);
                        
                        html.animate([
                            cssStyleOff,
                            cssStyleOn,
                        ],{duration:time,iterations:1});
                    }else{
                        addCssOnOff(html,cssStyleOff);
                        html.animate([
                            cssStyleOn,
                            cssStyleOff,
                        ],{duration:time,iterations:1});
                    }
                }
            
        },{threshold:1,rootMargin:"0px",root:root});
        arr.forEach(item=>{
            if(item){
            observer.observe(item);
            }else{
                observer.disconnect()
            }
        });
    };

    static btnHover(btn_hover:{parent:HTMLElement,bg:string,color:string,bRadius1:string|null,bRadius2:string|null,time:number}){
        const {parent,bg,color,bRadius1,bRadius2,time}=btn_hover;
        const bg_color=parent.style.backgroundColor;
        parent.onmouseover=(e:Event)=>{
            if(e){
                parent.style.backgroundColor=bg;
                parent.style.color=color;
                if(bRadius1 && bRadius2){
                    parent.style.borderRadius=bRadius2;
                    parent.animate([
                        {backgroundColor:bg_color,color:"white",borderRadius:bRadius1},
                        {backgroundColor:bg,color:color,borderRadius:bRadius2},
                    ],{duration:time,iterations:1});
                }else{
                    parent.style.color=color;
                    parent.animate([
                        {backgroundColor:bg_color,color:"white"},
                        {backgroundColor:bg,color:color},
                    ],{duration:time,iterations:1});
                }
            }
        }
        parent.onmouseout=(e:Event)=>{
            if(e){
                parent.style.backgroundColor="inherit";
                parent.style.color="white";
                if(bRadius1 && bRadius2){
                    parent.style.borderRadius=bRadius1;
                    parent.style.backgroundColor=bg_color;
                    parent.animate([
                        {backgroundColor:bg,color:color,borderRadius:bRadius2},
                        {backgroundColor:bg_color,color:"white",borderRadius:bRadius1},
                    ],{duration:time,iterations:1});
                }else{
                    parent.style.backgroundColor=bg_color;
                    parent.animate([
                        {backgroundColor:bg,color:color},
                        {backgroundColor:bg_color,color:"white"},
                    ],{duration:time,iterations:1});
                }
            }
        }
    };


    static starRating(starRate:{parent:HTMLElement,rating:number,cssStyle:{[key:string]:string},rowCssStyle:{[key:string]:string}}){
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const cssGen=(anchor:HTMLElement,cssStyle:{[key:string]:string})=>{
            for(const key of Object.keys(anchor.style)){
                for(const [key1,value1] of Object.entries(cssStyle)){
                    if(key===key1 && key !=="backgroundColor"){
                        anchor.style[key]=value1;
                    }else if(key==="backgroundColor"){
                        anchor.style.backgroundColor="black";
                    }
                }
            }
        }
        const {parent,rating,cssStyle,rowCssStyle}=starRate;
        if(!rating) return Misc.message({parent,msg:"no rating",type_:"error",time:700});
        const container=document.createElement("div");
        container.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;";
        const row=document.createElement("div");
        row.id="Misc-starRating-row";
        row.style.cssText="display:inline-flex;flex-direction:row;align-items:center;flex-wrap:nowrap;";
        row.style.gap=less900 ?(less400 ? "0.25rem":"0.35rem"):"0.5rem";
        const fontSize=less900 ?(less400 ? "14px":"16px"):"18px";
        //------------ROW-----------------------//
        for (const key of Object.keys(row.style)){
            for (const [key2, value2] of Object.entries(rowCssStyle)){
                if(key===key2){
                    row.style[key]=value2;
                }
            }
        }
        //------------ROW-----------------------//
        const cssStyle2={fontSize,color:"yellow",fill:"yellow"};
        Array.from(Array(5).keys()).map((num)=>{
            if(num +1  <= rating){
                const faDiv=document.createElement("span");
                faDiv.id="row-faDiv-span";
                const icon:IconType|undefined=Misc.stars.find(name=>(name.name==="full"))?.icon
                FaCreate({parent:faDiv,name:icon,cssStyle:cssStyle2});
                cssGen(faDiv,cssStyle);
                row.appendChild(faDiv);
            }else if(rating<5){
                const faDiv=document.createElement("span");
                const empty=Misc.stars.find(name=>(name.name==="empty"))
                if(empty){
                    const icon:IconType|undefined=empty.icon
                    FaCreate({parent:faDiv,name:icon,cssStyle:cssStyle2});
                    cssGen(faDiv,cssStyle);
                    row.appendChild(faDiv);
                }
            }else{
                const faDiv=document.createElement("span");
                const icon:IconType|undefined=Misc.stars.find(name=>(name.name==="half"))?.icon
                FaCreate({parent:faDiv,name:icon,cssStyle:cssStyle2});
                cssGen(faDiv,cssStyle);
                row.appendChild(faDiv);
            }
        });
        container.appendChild(row);
        parent.appendChild(container);
    };

    ;
    static selectComponent(item:{parent:HTMLElement,name:string,selects:{name:string,value:string}[],cssStyle:{[key:string]:string}}):{select:HTMLSelectElement,label:HTMLLabelElement,formGrp:HTMLElement}{
        //SELECTS=> MUST BE {NAME,VALUE}[] ARRAY,NOTE:!!! IF COLOR=>ADD:bgColor:true/false to cssStyles
        const {parent,name,cssStyle,selects}=item
        const formGrp=document.createElement("div");
        formGrp.className="form-group";
        formGrp.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;";
        const label=document.createElement("label");
        label.textContent=name;
        label.className="form-control text-primary lean display-6";
        const select=document.createElement("select");
        select.id=`select-${name}`;
        label.setAttribute("for",`${select.id}`);
        select.name="fontFamily";
        select.style.cssText="width:fit-content;border-radius:6px;";
        select.value="select";
        formGrp.appendChild(label);
        formGrp.appendChild(select);
        selects.map(select_=>{
            const option=document.createElement("option");
            option.value=select_.value;
            option.textContent=select_.name;
            for(const key of Object.keys(select.style)){
                for(const [key1,value1] of Object.entries(cssStyle)){
                    if(key===key1){
                        if(value1){
                            select.style[key]=value1;
                            option.style[key]=value1
                        }else if(key1==="bgColor"){
                            option.style.backgroundColor=select_.value;
                            select.style.backgroundColor=select_.value;
                        }else{
                            select.style[key]=select_.value;
                        }
                    }
                }
            }
            select.appendChild(option);
        });
        select.selectedIndex=0;
        parent.appendChild(formGrp);
        return {select,formGrp,label}
    };

    static fontFamilySelect(item:{parent:HTMLElement,selects:{name:string,value:string}[],cssStyle:{[key:string]:string}}):{select:HTMLSelectElement}{
        //SELECTS=> MUST BE {NAME,VALUE}[] ARRAY
        const {parent,cssStyle,selects}=item
        const popup=document.createElement('div');
        popup.style.cssText="position:absolute;width:clamp(250px,270px,300px);background-color:white;border-radius:16px;box-shadow:1px 1px 12px 1px black;height:auto";
        popup.style.top="10%";
        popup.style.left="40%";
        popup.style.right="40%";
        for(const key of Object.keys(popup.style)){
            for(const [key1,value1] of Object.entries(cssStyle)){
                if(key===key1){
                    popup.style[key]=value1;
                }
            }
        }
        const select=document.createElement("select");
        select.id="select-font-family";
        select.name="fontFamily";
        select.style.cssText="width:fit-content;border-radius:6px;";
        select.value="select";
        selects.map(select_=>{
            const option=document.createElement("option");
            option.value=select_.value;
            option.textContent=select_.name;
            option.style.fontFamily=`'${select_.value}',sans serif`;
            select.style.fontFamily=`'${select_.value}',sans serif`;
            select.appendChild(option);
        });
        select.selectedIndex=0;
        parent.appendChild(select);
        return {select}
    };

    static simpleButton(btn:{anchor:HTMLElement,type:"submit"|"button",bg:string,color:string,text:string,time:number}):{button:HTMLButtonElement}{
        const {anchor,bg,color,text,type,time}=btn;
        const button=document.createElement("button");
        const rand=Math.round(Math.random()*100);
        button.id=`button-${type}-${rand}`;
        button.className="simpleButton";
        button.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;padding-inline:2rem;padding-block:0rem;align-self:center;";
        button.textContent=text;
        button.style.backgroundColor=bg;
        button.style.color=color;
        button.type=type;
        button.style.borderRadius="20px";
        button.style.boxShadow="1px 1px 12px 1px rgb(12, 175, 255),-1px -1px 12px -1px rgb(12, 175, 255)";
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
        return {button};
    };

    static sourceImage(item:{src:string,width:number,quality:number}):string{
      
        return imageLoader(item)
    };

    static msgSourceImage(item:{parent:HTMLElement,msg:string,src:string,width:number,quality:number,time:number,cssStyle:{[key:string]:string}}){
        const {parent,msg,src,width,quality,time,cssStyle}=item;
        const img=document.createElement("img");
        img.style.cssText=`border-radius:50%;width:${width}px;aspect-ratio: 1/ 1;box-shadow:1px 1px 12px 1px rgb(8, 4, 249);margin-right:1rem;filter:drop-shadow(0 0 0.5rem rgb(8, 4, 249));`;
        const urlLocalPattern:RegExp=/(http:\/\/localhost:3000)\/[0-9a-zA-Z/.]{2,}/g;
        const urlExternalPattern:RegExp=/(https:\/\/[0-9a-z\-.?/]{2,})/g;
        if(urlExternalPattern.test(src)){
            img.src=httpImageLoader({src,width,quality})
        }else if(urlLocalPattern.test(src)){
            img.src=httpImageLoader({src,width,quality})
        }else{
            img.src=imageLoader({src,width,quality});
        }
        img.alt="www.ablogrom.com";
        const div=document.createElement("div");
        div.id="msgSourceImage";
        div.style.cssText=`display:flex;justify-content:center;align-items:center;gap:1rem;position:absolute;width:clamp(350px,375px,375px);height:${width}px;background:white;z-index:200;padding-inline:1rem;padding-block:2.5rem;`;
        div.style.transform="translateY(-100%)";
       
        div.style.inset="0% 0% 50% 0%"
        div.style.alignSelf="center";
        div.style.justifySelf="center";
        for (const [key,value] of Object.entries(cssStyle)){
            div.style[key]=value;
        }
        div.appendChild(img);
        const para=document.createElement("p");
        para.textContent=msg;
        div.appendChild(para);
        parent.appendChild(div);
        // console.log(div)//works
        const trans=div.style.transform;
        div.animate([
            {transform:trans,opacity:"0"},
            {transform:"translateY(-50%)",opacity:"0.5"},
            {transform:"translateY(-10%)",opacity:"1"},
            {transform:"translateY(0%)",opacity:"1"},
            {transform:"translateY(10%)",opacity:"1"},
            {transform:"translateY(20%)",opacity:"1"},
            {transform:"translateY(0%)",opacity:"0.5"},
            {transform:trans,opacity:"0"},
        ],{duration:time,iterations:1,"easing":"eaase-in-out"});
        setTimeout(()=>{
            Misc.growOut({anchor:div,scale:0,opacity:0,time:400});
            setTimeout(()=>{
                parent.removeChild(div);
            },398);
        },time*2);
    };

    static scrollTo(item:{target:HTMLElement,percX:number,percY:number}){
        //SCROLLS THE CLIENTX AND CLIENTY VALUE OF TEH TARGET
        const {target,percX,percY}=item;
        const targetWidthRaw=window.getComputedStyle(target).getPropertyValue("width").split("px")[0];
        const targetHeightRaw=window.getComputedStyle(target).getPropertyValue("height").split("px")[0];
        const targetWidth=parseInt(targetWidthRaw);
        const targetHeight=parseInt(targetHeightRaw);
        if(!(isNaN(targetWidth) && isNaN(targetHeight))){
            //is a number
            //percX=x/width
            window.scrollTo(targetWidth*(percX/100),targetHeight*(percY/100));
        }else{
            Misc.message({parent:target,msg:"is not a number",type_:"error",time:900});
        };

    };

     
    static btnIcon(item:{anchor:HTMLElement,icon:IconType,label:string|null,msgHover:string|null,cssStyle:{[key:string]:string},time:number}):HTMLButtonElement{
        const {anchor,icon,cssStyle,time,label,msgHover}=item;
        const btn=document.createElement("button");
        const rand=Math.round(Math.random()*100);
        btn.id=String(rand)
        if(msgHover){
            
            btn.id=anchor.id + "-" + msgHover + "-" + String(rand);
            btn.classList.add("btnMessageHover");
            btn.setAttribute("data-message",msgHover);
        }
    
        btn.style.cssText="padding:3px;display:flex;justisfy-content:center;align-items:center;z-index:0;background-color:black;border-radius:12px;color:white;position:relative;border:none;box-shadow:1px 1px 12px 3px blue;";
        for(const key of Object.keys(btn.style)){
            for(const [key1,value] of Object.entries(cssStyle)){
                if(key1===key){
                    btn.style[key]=value;
                };
            };
        };
        btn.style.fontSize="12px";
        const bg=btn.style.backgroundColor;
        const col=btn.style.color
        if(label){
            btn.id=anchor.id + "-" + msgHover + "-" + label + String(rand);
            Array.from(Array(2).keys()).map(num=>{
                if(num===0){
                    const span=document.createElement("span");
                    span.style.backgroundColor=bg;
                    span.style.color=col;
                    FaCreate({parent:span,name:icon,cssStyle:{fontSize:btn.style.fontSize,color:col,margin:"auto",zIndex:"20"}});
                    btn.appendChild(span);
                }else{
                    const small=document.createElement("small");
                    small.style.transform="scale(0.8)";
                    small.textContent=label;
                    btn.appendChild(small);
                }
            });
            btn.style.gap="0.25rem";
        }else{
            FaCreate({parent:btn,name:icon,cssStyle:{fontSize:btn.style.fontSize,color:col,margin:"auto",background:bg,zIndex:"20"}});
        }
        anchor.appendChild(btn);
        btn.onmouseover=(e:Event)=>{
            if(e){
                const beforeTime=time * 3
                btn.animate([
                    {backgroundColor:bg,color:col},
                    {backgroundColor:"white",color:"black"},
                ],{duration:beforeTime,iterations:1});
            }
        };
        btn.onmouseout=(e:Event)=>{
            if(e){

                btn.animate([
                    {backgroundColor:"white",color:"black"},
                    {backgroundColor:bg,color:col},
                ],{duration:time,iterations:1});
            }
        };
        return btn;
    };

    static tolocalstring(date:Date){
        if(date && typeof date ==="object"){
            const newDate=date.toLocaleString("en-US",{timeZone:"America/Toronto"});
            return newDate.split("T")[0];
        }else{
            return String(new Date())
        }
    };

   static capitalize({str}:{str:string}){
        let arr=str.split(" ");
        arr=arr.map(wd=>{
            wd=wd.split("").map((lt,ind)=>{
                    if(ind===0){
                        lt.toUpperCase();
                    }
                return lt;
            }).join("");
            return wd;
        });
        return arr.join(" ");
    }
};


export default Misc;
export const divider=Misc.divider;
export const divider_1=Misc.divider_1;
export const message=Misc.message;
export const btnMessagePopup=Misc.btnMessagePopup;


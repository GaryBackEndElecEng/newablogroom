import Misc from "../common/misc";
import Service from "../common/services";
import Nav from "../nav/headerNav";
import Header from "./header";
import ModSelector from "./modSelector";
import {codeType,replType, linecodeType, } from "./Types";
import {FaCreate} from "@/components/common/ReactIcons";
import {FaCrosshairs,FaPython, FaHtml5} from "react-icons/fa";
import { TbJson } from "react-icons/tb";
import { RiJavascriptFill } from "react-icons/ri";
import User from "../user/userMain";

import Main from "./main";


export type regJavaType={
    name:string
    searchwd:RegExp,
    replacewd:(name:string)=>string
    text:string
}
class NewCode{
    _count=0;
     entry:replType={} as replType;
     _code:codeType={} as codeType;
     _selectCodes:codeType[]=[];
     _selectCode={} as codeType;
     textArr:string[];
    static regJavaArr:regJavaType[];
    static regPythonArr:regJavaType[];
    static regHtmlArr:regJavaType[];
    static regJSONArr:regJavaType[];
     //SEARCHPARMETERS:
     //SEARCHPARMETERS:
      _codes:codeType[] = [
             
             {
                 id: 0,
                 type: "code",
                 name: "java",
                 eleId:"",
                 placement:0,
                 img:"",
                 cssText: "margin-left:2rem;text-height:0.1rem; background-color:black;color:white;text-wrap:wrap;display:flex;align-items:center;justify-content:flex-start;gap:0.5rem;padding-inline:1rem;border-radius:12px;padding:1rem;margin-inline:1rem;width:100%;max-width:800px;box-shadow:1px 1px 12px 1px #06f3a769;position:relative;",
                 class: " mx-auto  mb-1 language-javascript ",
                 inner_html:"",
                 linecode:[{id:0,text:"//enter your code;",code_id:0}],
                 template: "//enter your code",
                 attr: "",
                 blog_id:0
             },
             {
                 id: 1,
                 type: "code",
                 name: "html",
                 eleId:"",
                 placement:0,
                 img:"",
                 cssText: "margin-left:2rem;text-height:0.1rem; background-color:black;color:white;text-wrap:wrap;display:flex;align-items:center;justify-content:flex-start;gap:0.5rem;padding-inline:1rem;border-radius:12px;padding:1rem;margin-inline:1rem;width:100%;max-width:800px;box-shadow:1px 1px 12px 1px #06f3a769;position:relative;",
                 class: " mx-auto mb-1 language-html ",
                 inner_html: "",
                 linecode:[{id:0,text:" &lt;div&gt; code&lt;/div&gt;",code_id:1}],
                 template:` &lt;div&gt; code&lt;/code&gt;`,
                 attr: "",
                 blog_id:0
             },
             {
                 id: 2,
                 type: "code",
                 name: "JSON",
                 eleId:"",
                 placement:0,
                 img:"",
                 cssText:"margin-left:2rem;text-height:0.1rem; background-color:whitesmoke;text-wrap:wrap;display:flex;align-items:center;justify-content:flex-start;gap:0.5rem;padding-inline:1rem;max-width:800px;width:100%;background-color:#313030;border-radius:16px;box-shadow:1px 1px 12px 1px #06f3a769;position:relative",
                 class: " mx-auto mb-1 language-json",
                 inner_html:"",
                 linecode:[{id:0,text:`{"id":"0","name":"enter your code"}`,code_id:2}],
                 template: `{"id":"0","name":"enter your code"}`,
                 attr: "",
                 blog_id:0
             },
             {
                 id: 3,
                 type: "code",
                 name: "python",
                 eleId:"",
                 placement:0,
                 img:"",
                 cssText: "margin-left:2rem;text-height:0.1rem; background-color:black;color:white;text-wrap:wrap;display:flex;align-items:center;justify-content:flex-start;gap:0.5rem;padding-inline:1rem;border-radius:12px;padding:1rem;margin-inline:1rem;width:100%;max-width:800px;box-shadow:1px 1px 12px 1px #06f3a769;position:relative;",
                 class: " m-auto   mb-1 w-100 language-python ",
                 inner_html:"",
                 linecode:[{id:0,text:`# enter your code`,code_id:3}],
                 template: `class Python:`,
                 attr: "",
                 blog_id:0,
             },
         ];
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
        this._selectCodes=this._modSelector.selectCodes;
        this._count=this._modSelector.count;
        Main.textarea=document.querySelector("div#textarea");
        NewCode.regJavaArr=[
            {name:"=document",searchwd:/\=(document)/g,replacewd:(name)=>{return `<code id=doc style=color:lightblue;text-wrap:nowrap;>${name}</code>`},text:""},
            {name:"const",searchwd:/( const )/g,replacewd:(name)=>{return `<code id=const style=color:green;text-wrap:nowrap;font-weight:bold;>${name}</code>`},text:""},
            {name:"func",searchwd:/\.[a-zA-Z]{3,}\("[a-zA-Z]+"\)/g,replacewd:(name)=>{return`<code id=func1_ style=color:yellow;text-wrap:nowrap;>${name}</code>`},text:""},
            {name:"async",searchwd:/(async)/g,replacewd:(name)=>{return`<code id=func_ style=color:#ff0048;font-weight:bold;>${name}</code>`},text:""},
            {name:"async",searchwd:/(export)/g,replacewd:(name)=>{return`<code id=func_ style=color:#ff0048;font-weight:bold;>${name}</code>`},text:""},
            {name:"func2",searchwd:/(function)/g,replacewd:(name)=>{return`<code id=func2 style=color:lightblue;>${name}</code>`},text:""},
            {name:"let",searchwd:/(let)/g,replacewd:(name)=>{return`<code id=let_ style=color:#00d6ff;font-weight:bold;>${name}</code>`},text:""},
            {name:"arrow",searchwd:/(=>)/g,replacewd:(name)=>{return`<code id=arrow style=color:red;font-weight:bold;>${name}</code>`},text:""},
            {name:"map",searchwd:/\.(map\()/g,replacewd:(name)=>{return`<code id=map style=color:yellow;font-weight:bold;>${name}</code>`},text:""},
            {name:"filter",searchwd:/\.(filter\()/g,replacewd:(name)=>{return`<code id=filter style=color:yellow;font-weight:bold;>${name}</code>`},text:""},
            {name:"return",searchwd:/(return)/g,replacewd:(name)=>{return`<code id=return style=color:green;font-weight:bold;><br/>${name}</code>`},text:""},
            {name:"reduce",searchwd:/\.(reduce\(\([a-zA-Z.+\-,\s]+\))/g,replacewd:(name)=>{return`<code id=filter style=color:yellow;font-weight:bold;>${name}</code>`},text:""},
            {name:"comment",searchwd:/(\/\/\s[a-zA-Z0-9.,\s]{6,})/g,replacewd:(name)=>{return`<p id=comment style=color:#00ff5c;font-weight:bold;>${name}</p>`},text:""},
            {name:"text",searchwd:/\s"[a-zA-Z0-9;\s]{6,}"/g,replacewd:(name)=>{return`<code id=text style=color:lightbrown;font-weight:bold;>${name}</code>`},text:""},
            {name:"if",searchwd:/(if\([a-zA-Z0-9="'\s]+\))/g,replacewd:(name)=>{return`<code id=if_ style=color:white;><b>${name}</b></code>`},text:""},
            {name:"class",searchwd:/(class)\s/g,replacewd:(name)=>{return`<code id=class style=color:green;font-weight:bold;padding-right:15px;>${name}</code>`},text:""},
            {name:"constructor",searchwd:/(constructor)\s/g,replacewd:(name)=>{return`<code id=constructor style=color:lightgreen;font-weight:bold;padding-right:25px;>${name}</code>`},text:""},
            {name:"htmlElement",searchwd:/(HTMLElement)/g,replacewd:(name)=>{return`<code id=htmlElement style=color:green;font-weight:bold;>${name}</code>`},text:""},
            {name:"this",searchwd:/(this)\./g,replacewd:(name)=>{return`<code id=this style=color:green;font-weight:bold;>${name}</code>`},text:""},
            {name:"as",searchwd:/\s(as)\s(HTMLElement)/g,replacewd:(name)=>{return`<code id=as style=color:green;font-weight:bold;padding-inline:2px;>${name}</code>`},text:""},
            {name:"createElement",searchwd:/(createElement)/g,replacewd:(name)=>{return`<code id=createElement style=color:yellow;font-weight:bold;>${name}</code>`},text:""},
            {name:"getElementById",searchwd:/(getElementById)/g,replacewd:(name)=>{return`<code id=getElementById style=color:yellow;font-weight:bold;>${name}</code>`},text:""},
            {name:"querySelector",searchwd:/(querySelector)/g,replacewd:(name)=>{return`<code id=querySelector style=color:yellow;font-weight:bold;>${name}</code>`},text:""},
            {name:"querySelectorAll",searchwd:/(querySelectorAll)/g,replacewd:(name)=>{return`<code id=querySelectorAll style=color:yellow;font-weight:bold;>${name}</code>`},text:""},
            {name:"Promise",searchwd:/\s(Promise)/g,replacewd:(name)=>{return`<code id=Promise style=color:green;font-weight:bold;>${name}</code>`},text:""},
            {name:"className",searchwd:/(className)/g,replacewd:(name)=>{return`<code id=className style=color:blue;font-weight:bold;>${name}</code>`},text:""},
            {name:"class_name",searchwd:/(class\/s)[a-zA-Z]+/g,replacewd:(name)=>{return`<code id=class_name style=color:green;font-weight:bold;>${name.split(" ")[1]}</code>`},text:""},
            {name:"new",searchwd:/(new)\s/g,replacewd:(name)=>{return`<code id=new style=color:pink;font-weight:bold;>${name}</code>`},text:""},
            {name:"resolver",searchwd:/(resolver\()/g,replacewd:(name)=>{return `<code id=resolver style=color:yellow;font-weight:bold;>${name}</code>`},text:""},
            {name:"export",searchwd:/(export)\\s/g,replacewd:(name)=>{return`<code id=new style=color:maroon;font-weight:bold;>${name}</code>`},text:""},
            {name:"default",searchwd:/(default)\\s/g,replacewd:(name)=>{return`<code id=default style=color:maroon;font-weight:bold;>${name}</code>`},text:""},
            {name:"onclick",searchwd:/(onclick=)/g,replacewd:(name)=>{return`<code id=onclick style=color:yellow;font-weight:bold;>${name}</code>`},text:""},
            {name:"eventListener",searchwd:/(addEventListener)/g,replacewd:(name)=>{return`<code id=addEventListener style=color:yellow;font-weight:bold;>${name}</code>`},text:""},
            {name:"openBrack",searchwd:/\{/g,replacewd:(name)=>{return`{ `},text:""},
            {name:"openBrack",searchwd:/\}/g,replacewd:(name)=>{return` }`},text:""},
            {name:"semi-colon",searchwd:/;\s/g,replacewd:(name)=>{return`<br>}`},text:""},
            {name:"string",searchwd:/:(string)/g,replacewd:(name)=>{return`<code class='language-java' id=string style=color:green;font-weight:bold;>${name.split(":")[1]}</code>`},text:""},
            {name:"number",searchwd:/:(number)/g,replacewd:(name)=>{return`<code class='language-java' id=number style=color:green;font-weight:bold;>${name.split(":")[1]}</code>`},text:""},
        ]
        NewCode.regPythonArr=[
            // {name:"class",searchwd:/(class)+/g,replacewd:`<span id="class_" style="color:green;font-weight:bold;">class</span>
            // `,text:""},
            {name:"class",searchwd:/\s(class)\s/g,replacewd:(name)=>{return `<code id=doc style=color:lightgreen;font-weight:bold;>${name}</code>`},text:""},
            {name:"method",searchwd:/\w{2,}\([a-zA-Z0-9.,]+\):/g,replacewd:(name)=>{return `<code id=doc style=color:yellow;font-weight:bold;>${name}</code><br/>`},text:""},
            {name:"for",searchwd:/(for)\s[a-zA-Z0-9;=+\-\s]{2,}:/g,replacewd:(name)=>{return `<code id=doc style=color:lightblue;font-weight:bold;margin-left:1rem;>${name}</code>`},text:""},
            {name:"items",searchwd:/\.(items)\(\):/g,replacewd:(name)=>{return `<span id=doc style=color:yellow;>${name}</span>`},text:""},
            {name:"comment",searchwd:/#\s[ a-zA-Z0-9?.-]{5,}/g,replacewd:(name)=>{return `<code id=doc style=color:green;margin-left:1rem;>${name}</code>`},text:""},
            {name:"Range",searchwd:/(Range)\([a-zA-Z0-9,]{3,}\):/g,replacewd:(name)=>{return `<code id=doc style=color:yellow;>${name}</code>`},text:""},
            {name:"in",searchwd:/\s(in)\s/g,replacewd:(name)=>{return `<code id=doc style=color:green;font-weight:bold;>${name}</code>`},text:""},
            {name:"self",searchwd:/(self)/g,replacewd:(name)=>{return `<code id=doc style=color:#ee8080;>${name}</code>`},text:""},
            {name:"__init__()",searchwd:/(_init_)\([a-zA-Z0-9.,\s]{5,}\)/g,replacewd:(name)=>{return `<code id=doc style=color:lightblue;font-weight:bold;>${name}</code>`},text:""},
            {name:"if",searchwd:/(if)\s[a-zA-Z0-9]{2,}:/g,replacewd:(name)=>{return `<code id=doc style=color:#8c0505;>${name}</code>`},text:""},
            {name:"return",searchwd:/(return)/g,replacewd:(name)=>{return `<code id=doc style=color:violet;font-weight:bold;>${name}</code>`},text:""},
        ]
        NewCode.regJSONArr=[
            {name:"keyValue1",searchwd:/[a-zA-Z0-9\s"']+:/g,replacewd:(name)=>{return `<code class='language-json' id=keyValue1 style=color:#f30915;margin-left:1rem;><b>${name}</b></code>`},text:""},
            {name:"keyValue2",searchwd:/:[a-zA-Z0-9"'\s]+/g,replacewd:(name)=>{return `<code class='language-json' id=keyValue2 style=color:#f30915;margin-right:1rem;><b>${name.split(":")[1]}</b></code>`},text:""},
            {name:"{",searchwd:/\{/g,replacewd:(name)=>{return `<pre id=opencurl style=color:red;font-weight:bold;margin-inline:1rem;>{</pre>`},text:""},
            {name:"}",searchwd:/\}/g,replacewd:(name)=>{return `<pre><code class='language-json' id=closecurl style=color:red;font-weight:bold;margin-inline:1rem;>}</code></pre>`},text:""},
            {name:",",searchwd:/,/g,replacewd:(name)=>{return `<code class='language-json' id=comma style=color:green;font-weight:bold;margin-inline:0.25rem;font-size:120%;>,</code>`},text:""},
            {name:"[",searchwd:/\[/g,replacewd:(name)=>{return `<pre><code code class='language-json' id=openBracket style=color:pink;font-weight:bold;margin-left:1rem;>${name}</code></pre>`},text:""},
            {name:"]",searchwd:/\]/g,replacewd:(name)=>{return `<pre><code class='language-json' id=closeBracket style=color:pink;font-weight:bold;margin-right:2rem;>]</code></pre>`},text:""},
            
        ]
        //<=&lt;>=&gt;
        NewCode.regHtmlArr=[
            {name:"class",searchwd:/(class)=[a-zA-Z0-9\-\s"']{3,}/g,replacewd:(name)=>{return `<code  style=color:lightgreen;text-wrap:nowrap><b>${name}</b></code>`},text:"html"},
            {name:"id",searchwd:/(id)=[a-zA-Z0-9\-"']{2,}/g,replacewd:(name)=>{return `<code style=color:lightblue;text-wrap:nowrap;><b>${name}</b></code>`},text:"html"},
            {name:"anchor-open",searchwd:/(<[a-zA-Z0-9-]+>)/g,replacewd:(name)=>{return `<code class='language-html' style=color:lime;text-wrap:nowrap;><b>${name}</b></code>`},text:""},
            {name:"anchor-close",searchwd:/(<\/[a-zA-Z0-9-]+>)/g,replacewd:(name)=>{return `<code class='language-html' style=color:lime;text-wrap:nowrap;><b>${name}</b></code>`},text:"html"},
            {name:"xml",searchwd:/<[a-zA-Z0-9-]{2,}\/>/g,replacewd:(name)=>{return `<code class=language-xml style=color:green;text-wrap:nowrap;><b>${name}</b></code>`},text:"xml"},
            {name:"comment",searchwd:/#[a-zA-Z0-9?.\-\s]{5,}/g,replacewd:(name)=>{return `<code  style=color:green;text-wrap:nowrap;>${name}</code>`},text:"html"},
           
        ]
        this.textArr=[];
        
    }

    //----GETTERS SETTERS---///
    get placement(){
        const getPlace=localStorage.getItem("placement");
        if(getPlace){
            return parseInt(getPlace);
        }else{
            localStorage.setItem("placement",String(1));
            return 1;
        }
    }
    set placement(placement:number){
        localStorage.setItem("placement",String(placement));
    }
    get count(){
        return this._count
    }
    set count(count:number){
        this._count=count;
    }
    get code(){
        return this._code;
    }
   set code(code:codeType){
    this._code=code
   }
   set codes(codes:codeType[]){
        this._codes=codes;
   }
   get codes(){
    return this._codes;
   }
   get selectCode(){
    return this._modSelector.selectCode
   }
   set selectCode(selectCode:codeType){
    this._selectCode=selectCode;
    this._modSelector.selectCode=selectCode
   }
    get selectCodes(){
        return this._modSelector.selectCodes;
    }
    set selectCodes(selectCodes:codeType[]){
        this._selectCodes=selectCodes;
        this._modSelector.selectCodes=selectCodes;
        this._modSelector.blog={...this._modSelector.blog,codes:selectCodes}
    }
    //----GETTERS SETTERS---///

   async showCleanCode(item:{parent:HTMLElement,selectCode:codeType}){
        const {parent,selectCode}=item;
        //THIS IS USED IN EDIT ( && CLEAN VERSION: DISPLAY BLOG)
        await this.asyncCode({parent,selectCode}).then(async(res)=>{
            if(res){

                const regType=res.regArr.find(reg=>(reg.name===selectCode.name));
                if(regType){
                    this.preElementClean({pre:res.pre,regArr:regType.arrType,selectCode:this.selectCode});
                    
                }
            }
        });
            
        
    }
   async showCode(item:{parent:HTMLElement,selectCode:codeType}){
        const {parent,selectCode}=item;
        Main.textarea=parent;
        //---------RECAPTURING CODES=>REINSERTING IT TO BLOG.CODES---------//
        this.selectCodes=[...this._selectCodes,selectCode];
        //---------RECAPTURING CODES=>REINSERTING IT TO BLOG.CODES---------//
        //THIS IS USED IN EDIT ( && CLEAN VERSION: DISPLAY BLOG)
        await this.asyncCode({parent,selectCode}).then(async(res)=>{
            if(res){
                this.selectCode=res.selectCode;
                
                const regType=res.regArr.find(reg=>(reg.name===this.selectCode.name));
                if(regType){
                    
                    this.showLinecode({pre:res.pre,selectCode:selectCode,regArr:regType.arrType});
                    this.refreshSave({parent:res.divCont,selectCode:selectCode,pre:res.pre})
                    this.removeMainElement({parent,container:res.divCont,target:res.target});
                }
                res.target.onclick=(e:MouseEvent)=>{
                    if(e){
                        res.divCont.classList.toggle("isActive");
                       res.target.classList.toggle("isActive");
                    }
                };
            }
        });
            
        
    }
    async asyncCode(item:{parent:HTMLElement,selectCode:codeType}):Promise<{divCont:HTMLElement,pre:HTMLPreElement,target:HTMLElement,selectCode:codeType,regArr:{name:string,arrType:regJavaType[]}[]}|undefined>{
        const {parent,selectCode}=item;
        if(!selectCode)return;
            this.selectCode={...selectCode};
            const regArr:{name:string,arrType:regJavaType[]}[]=[
                {name:"java",arrType:NewCode.regJavaArr},
                {name:"python",arrType:NewCode.regPythonArr},
                {name:"html",arrType:NewCode.regHtmlArr},
                {name:"JSON",arrType:NewCode.regJSONArr},

            ]
            Header.cleanUpByID(parent,"genCode-divCont -" + selectCode.eleId);
            const {target,divCont,selectCode:selectCode_,pre}= await this.divContTarget({parent,selectCode});
            return new Promise(resolve=>{
                resolve({divCont,pre,target,selectCode:selectCode_,regArr})
            })as Promise<{divCont:HTMLElement,pre:HTMLPreElement,target:HTMLElement,selectCode:codeType,regArr:{name:string,arrType:regJavaType[]}[]}>;
    }
    //ENTRY POINT FROM SIDEBAR!!!
    codeTemplate(parent:HTMLElement) {
         
        const container = document.createElement("section");
        parent.classList.add("position-relative");
        container.id="codeContainer";
        container.className = "mx-auto my-5 d-flex flex-column w-100 justify-content-center align-items-stretch position-relative ";
        const select = document.createElement("select");
        select.id="codeSelect";
        const option = document.createElement("option");
        option.value = "select";
        option.disabled = false;
        option.textContent = "select";
        select.appendChild(option);
        this._codes.forEach((code) => {
            const option = document.createElement("option");
            option.value =JSON.stringify(code);
            option.textContent = code.name;
            select.appendChild(option);
        });
        container.appendChild(select);
        parent.appendChild(container);
        select.addEventListener("change", async(e:Event) => {
            if (e) {
                const value:string = (e.currentTarget as HTMLSelectElement).value;
                if (value ) {
                    this.selectCode=JSON.parse(value as string) as codeType;
                    //ADDING NEW SELECTCODE TO SELECTCODES FOR BLOG.CODES

                    const rand=Math.round(Math.random()*1000);
                    const eleId=this.selectCode.name + String(rand);
                    this.selectCode={...this.selectCode,eleId:eleId,placement:this.placement};
                    this.selectCodes=[...this.selectCodes,this.selectCode];
                    this.placement=this.placement + 1;
                    //ABOVE:  ADDING NEW SELECTCODE TO SELECTCODES FOR BLOG.CODES
                    await this.genCode({parent,container,selectCode:this.selectCode}).then(async(res)=>{
                        if(res?.arrType){
                            this.selectCode=res.selectCode;
                            this.preElementStart({pre:res.pre,regArr:res.arrType as regJavaType[],selectCode:res.selectCode});
                            this.refreshSave({parent:res.divCont,selectCode:res.selectCode,pre:res.pre});
                            this.removeMainElement({parent,container:res.divCont,target:res.target});
                            res.target.onclick=(e:MouseEvent)=>{
                                if(e){
                                    res.divCont.classList.toggle("isActive");
                                   res.target.classList.toggle("isActive");
                                }
                            };
                        }
                    });
                    container.removeChild(select);
                    Misc.fadeIn({anchor:container,xpos:50,ypos:100,time:400});
                }
            }
        });
    }


    async genCode(item:{parent:HTMLElement,container:HTMLElement, selectCode:codeType}):Promise<{parent:HTMLElement,container:HTMLElement,divCont:HTMLElement,target:HTMLElement,pre:HTMLPreElement,selectCode:codeType,arrType: regJavaType[] | undefined}> {
        //DIVCONT,TARGET AND PRE CREATION
        const {parent,container,selectCode}=item;
        this.selectCode=selectCode;
        const regArr:{name:string,arrType:regJavaType[]}[]=[
            {name:"java",arrType:NewCode.regJavaArr},
            {name:"python",arrType:NewCode.regPythonArr},
            {name:"html",arrType:NewCode.regHtmlArr},
            {name:"JSON",arrType:NewCode.regJSONArr},

        ]
        const getType=regArr.find(type=>(type.name===this.selectCode.name));
        Header.cleanUpByID(parent,"genCode-divCont -" + selectCode.eleId);
       const {target,divCont,selectCode:selectCode_,pre}= await this.divContTarget({parent,selectCode});
        this.removeMainElement({parent,container:divCont,target});
        
        return Promise.resolve({parent,container,pre,divCont,target,selectCode:selectCode_,arrType:getType?.arrType}) as Promise<{parent:HTMLElement,container:HTMLElement,divCont:HTMLElement,target:HTMLElement,pre:HTMLPreElement,selectCode:codeType,arrType: regJavaType[] | undefined}>;
    }
    divContTarget(item:{parent:HTMLElement,selectCode:codeType}):Promise<{target:HTMLElement,divCont:HTMLElement,selectCode:codeType,pre:HTMLPreElement}>{
        const {parent,selectCode}=item;
        const divCont=document.createElement("div");
        divCont.className="eleContainer";
        divCont.id="genCode-divCont -" + selectCode.eleId;
        divCont.style.cssText="width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;position:relative;";
        divCont.setAttribute("data-placement",`${String(selectCode.placement)}-A`);
         parent.style.position="relative";
         //------target container----------//
         const target = document.createElement("code");
         target.setAttribute("is-element","true");
         target.setAttribute("is-code","true");
         target.setAttribute("data-placement",`${selectCode.placement}-A`);
         target.setAttribute("name", selectCode.name);
         target.style.cssText = selectCode.cssText;
         target.className = selectCode.class;
         this.selectCode={...selectCode,cssText:target.style.cssText,name:selectCode.name}
         this.selectCode=selectCode;
         target.id=selectCode.eleId
         //------title container----------//
         this.titleContainer({parent:target,selectCode});
         //------title container----------//
         const pre=document.createElement("pre");
         pre.id=this.selectCode.eleId +"-pre";
         pre.style.cssText="color:white;padding-block:1rem;width:100%;"
         pre.setAttribute("contenteditable","true");
         target.appendChild(pre);
         divCont.appendChild(target);
         parent.appendChild(divCont);
         return new Promise(resolve=>{
            resolve({target,divCont,selectCode,pre})
         }) as Promise<{target:HTMLElement,divCont:HTMLElement,selectCode:codeType,pre:HTMLPreElement}>;
    }
    titleContainer(item:{parent:HTMLElement,selectCode:codeType}){
        const {parent,selectCode}=item;
       
        const title=document.createElement("h6");
        title.textContent=selectCode.name;
        title.className="text-center text-primary mb-2 mx-auto";
        const imgDive=document.createElement("div");
        imgDive.id="imgDiv";
        imgDive.style.cssText="display:block;position:absolute;top:0%;right:-15%;z-index:20;";
        imgDive.style.transform="translate(0px,0px)";
        imgDive.style.right="0px";
        const xDiv=document.createElement("div");
        xDiv.style.cssText="padding:1rem;max-width:175px;border-radius:25%;background-color:black;color:white;display:flex;justify-content:center;align-items:center;gap:1rem;position:relative;z-index:20;box-shadow:1px 1px 12px 1px black;";
        if(selectCode.name==="html"){
            imgDive.style.transform="translate(0px,0px)";
        }
        const span=document.createElement("span");
        span.style.cssText="margin-inline:auto;position:absolute;top:100%;left:0%;transform:translate(15px,-20px);z-index:60;color:white;"
        span.textContent=selectCode.name;
        if(selectCode.name==="java"){
            FaCreate({parent:xDiv,name:RiJavascriptFill,cssStyle:{fontSize:"30px",margin:"auto"}});
            xDiv.style.color="yellow";
        }else if(selectCode.name==="python"){
            FaCreate({parent:xDiv,name:FaPython,cssStyle:{fontSize:"30px",margin:"auto"}});
        }else if(selectCode.name==="JSON"){
            FaCreate({parent:xDiv,name:TbJson,cssStyle:{fontSize:"30px",margin:"auto"}});
        }else if(selectCode.name==="html"){
            FaCreate({parent:xDiv,name:FaHtml5,cssStyle:{fontSize:"30px",margin:"auto"}});
        }
        
        imgDive.appendChild(xDiv);
        imgDive.appendChild(span);
       
        parent.appendChild(imgDive);
    }
    refreshSave(item:{parent:HTMLElement,pre:HTMLPreElement,selectCode:codeType}){
        const {parent,pre,selectCode}=item;
        //parent===divCont!!!
        this.selectCode=selectCode;
        const btnContainer=document.createElement("div");
        btnContainer.id="refreshSave-container";
        btnContainer.style.cssText="margin-inline:auto;display:flex;justify-content;center;align-items:center;"
        const {button:refresh}=Misc.simpleButton({anchor:btnContainer,bg:Nav.btnColor,color:"white",text:"refresh",time:400,type:"button"});
        refresh.onclick=async(e:MouseEvent)=>{
            if(e){
                const arr:{name:string,arrType:regJavaType[]}[]=[
                    {name:"java",arrType:NewCode.regJavaArr},
                    {name:"python",arrType:NewCode.regPythonArr},
                    {name:"html",arrType:NewCode.regHtmlArr},
                    {name:"JSON",arrType:NewCode.regJSONArr},

                ]
                const getType=arr.find(type=>(type.name===selectCode.name))
                if(getType){
                    //SELCODE exist is confirmation that selectCodes was UPDATED!!
                   const selCode = await this.innerPreAdd({pre:pre,regArr:getType.arrType as regJavaType[],selectCode:selectCode});//ADDS TO SELECTCODE
                if(!selCode) return;// selectCodes  was not updated
                //COLORING  CODE THAT WAS SAVED TO MODSELECTOR.CODES
                    this.showLinecode({pre:pre,selectCode:selCode,regArr:getType.arrType});//colors on what's in selectCode
                }
            }
        };
        const {button:save}=Misc.simpleButton({anchor:btnContainer,bg:Nav.btnColor,color:"white",text:"save",time:400,type:"button"});
        save.onclick=async(e:MouseEvent)=>{
            if(e){
                save.disabled=true;
                setTimeout(()=>{
                    save.disabled=false;
                },1200);
                this.verifyFinished({parent,selectCode:this.selectCode});
            }
        };
        parent.appendChild(btnContainer);
    }
    verifyFinished(item:{parent:HTMLElement,selectCode:codeType}){
        const {parent,selectCode}=item;
        parent.style.position="relative";
        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center;";
        const css_row="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;";
        const popup=document.createElement("div");
        popup.id="save-verifyFinished-popup";
        popup.className="popup";
        popup.style.cssText=css_col + "margin:auto;position:absolute;inset:0%;backdrop-filter:blur(20px);";
        const btnCont=document.createElement("div");
        btnCont.id="popup-btnContainer";
        btnCont.style.cssText=css_row + "margin:auto";
        popup.appendChild(btnCont);
        parent.appendChild(popup);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        const {button:cancel}=Misc.simpleButton({anchor:btnCont,type:"button",color:"red",bg:Nav.btnColor,time:400,text:"cancel"});
        cancel.onclick=(e:MouseEvent)=>{
            if(e){
                cancel.disabled=true;
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },390);
            }
        };

        const {button:save}=Misc.simpleButton({anchor:btnCont,type:"button",color:"white",bg:Nav.btnColor,time:400,text:"you are done?"});
        save.onclick=(e:MouseEvent)=>{
            if(e){
                save.disabled=true;
                let codes=this._modSelector.selectCodes;
                codes=codes.map(code=>{
                    if(code.eleId===selectCode.eleId){
                        code=selectCode;
                    }
                    return code;
                });
                this.selectCodes=codes;//SAVING IT TO BLOG
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },390);
                //removing this.refreshsave
                const getRefreshSave=parent.querySelector("div#refreshSave-container") as HTMLElement;
                if(getRefreshSave){
                    Misc.growOut({anchor:getRefreshSave,scale:0,opacity:0,time:600});
                    setTimeout(()=>{
                        parent.removeChild(getRefreshSave);
                    },590);
                }
            }
        };
    };



   async preElementStart(item:{pre:HTMLPreElement,regArr:regJavaType[],selectCode:codeType}){
        const {pre,regArr,selectCode}=item;
        this.selectCode=selectCode;
        pre.style.width="100%";
        const innerPre=document.createElement("div");
        innerPre.setAttribute("contenteditable","true");
        innerPre.id=selectCode.eleId + "innerPre" +"-0";
        innerPre.style.cssText="width:100%;margin:auto;color:white;";
        innerPre.style.width="100%";
        const text:string=this.selectCode.template;
        innerPre.textContent=text;
        this.selectCode.linecode[0].text=text;
        if(selectCode.name!=="html"){
            const inner_html= await this.matchInsert({preChild:innerPre,regArr:regArr});
            innerPre.innerHTML= inner_html ||"";
        }else{
            this.matchHtmlInsert({pre,target:innerPre,text:text,regArr})
        }
        pre.appendChild(innerPre);
    }
   async innerPreAdd(item:{pre:HTMLPreElement,regArr:regJavaType[],selectCode:codeType}){
        const {pre,selectCode}=item;
        //THIS IS EXECUTED ON KEYBOARD.ENTER
        this.selectCode=selectCode;
        pre.style.width="100%";
        const children_=([...pre.children as any] as HTMLElement[]) as HTMLElement[]
        // console.log("is children?",children_);//works
        // console.log("pre main ID",pre.id);//works

         const result_selCode=await Promise.all(([...children_ as any] as HTMLElement[]).map(async(innerPre,index)=>{
            if(innerPre){
                innerPre.id="innerPre-" + String(index);
             this.selectCode = await this.lineCodeCapture({child:innerPre,selectCode:selectCode,index}) as codeType
             return this.selectCode
            }
        }));
        return result_selCode.find(selCode=>(selCode && selCode.eleId===selectCode.eleId))
    }
   
    showLinecode(item:{pre:HTMLPreElement,selectCode:codeType,regArr:regJavaType[]}){
        const {pre,selectCode,regArr}=item;
        Header.cleanUp(pre);
        (selectCode.linecode).toSorted((a,b)=>{if(a.id<b.id) return -1;return 1}).map(async(line,index)=>{
               
            if(line ){
                
                const innerPre=document.createElement("pre");
                innerPre.innerHTML=line.text;
                innerPre.style.color="white";
                innerPre.setAttribute("data-code-id",String(line.code_id));
                innerPre.setAttribute("contenteditable","true");
                innerPre.setAttribute("index",String(index));
                innerPre.id="innerPre-"+ String(index);

                    if(selectCode.name!=="html"){
                        const inner_html= await this.matchInsert({preChild:innerPre,regArr:regArr});
                        innerPre.innerHTML= inner_html || " ";
                    }else{
                        this.matchHtmlInsert({pre,target:innerPre,text:line.text,regArr:regArr});
                    }
                   
                    pre.appendChild(innerPre)
                    }
                    
                });
    }
    preElementClean(item:{pre:HTMLPreElement,regArr:regJavaType[],selectCode:codeType}){
        //REGENERATES LINE CODE AND PROVIDES EDITING LINE
        const {pre,regArr,selectCode}=item;
        this.selectCode=selectCode;
        const container=document.createElement("div");
        container.id="preElementShow-container";
        container.style.cssText="width:100%;background-color:transparent;padding-inline:3px;padding-block:1rem;color:white;"
        const check=(this.selectCode.linecode as linecodeType[]).length>0 ;
        if(check){
            //children P exists
            (this.selectCode.linecode).toSorted((a,b)=>{if(a.id<b.id) return -1;return 1}).map(async(line,index)=>{
               
                if(line ){
                    // console.log("preElementShow:after line:recording line")
                    const innerPre=document.createElement("pre");
                    innerPre.innerHTML=line.text;
                    innerPre.style.color="white";
                    innerPre.setAttribute("contenteditable","true");
                    innerPre.setAttribute("index",String(index));
                    innerPre.id="innerPre-"+ `${index}`;
                    
                        if(selectCode.name!=="html"){
                            const inner_html= await this.matchInsert({preChild:innerPre,regArr:regArr});
                            innerPre.innerHTML= inner_html ||" ";
                        }else{
                            this.matchHtmlInsert({pre,target:innerPre,text:line.text,regArr:regArr});
                        }
                       
                        container.appendChild(innerPre);
                        pre.appendChild(container);
                        }
                        
                    });
            };
    };



    async lineCodeCapture(item:{child:HTMLElement,selectCode:codeType,index:number}):Promise<codeType | undefined>{
        const {child,selectCode,index}=item;
        this.selectCode=selectCode;
        child.setAttribute("index",String(index));
        const text:string|null=child.textContent;//contenteditable: dynamic text
        if(!text) return
        this._selectCodes=this._selectCodes.map(selCode=>{
            if(selCode.eleId===selectCode.eleId){
                const check2=selCode.linecode.find(line=>(line.id ===index));
                if(!check2){
                    selCode.linecode.push({id:index,text:text as string,code_id:selectCode.id});
                }else{
                    selCode.linecode = selCode.linecode.map(line=>{
                        if(line.id===index){
                            line.text=text ||"";
                        }
                        return line;
                    });
                }
               
            }
            return {...selCode,linecode:selCode.linecode.toSorted((a,b)=>{if(a.id < b.id) return -1;return 1})};
            });
            //ADDNG IN TO LOCALSTORAGE
            this.selectCodes=this._selectCodes;
            console.log("this.selectCodes",this.selectCodes)
            //ADDNG IN TO LOCALSTORAGE
        return Promise.resolve(this.selectCodes.find(selCode=>(selCode.eleId===selectCode.eleId)));

    };



    matchInsert(item:{preChild:HTMLElement,regArr:regJavaType[]}):Promise<string|null>{
        //THIS ADDS COLOR TO THE CODE for each line.
        const {preChild,regArr}=item;
        preChild.style.width="100%";
        let replaceText=preChild.textContent;
        // console.log("replaceText",replaceText);//sends once
        if(preChild && replaceText){

            const arrCatch:{start:number,end:number,word:string,replace:string}[]=[]
            regArr.map(reg=>{
                const matches=(replaceText as string).matchAll(reg.searchwd) as any;
                for( const match of matches){
                    if(match[0]){
                        //FILLING ARRCATCH ARRAY WITH REPLACEMENTS
                        const end=match.index + match[0].length
                        const start=match.index;
                        const word=match[0];
                        const replace=reg.replacewd(match[0]);
                        arrCatch.push({start,end,word,replace});
                    }
                }
            });
            arrCatch.map(cat=>{
                //REPLACING WRITTEN TEXT WITH COLOR
                replaceText=(replaceText as string).replace(cat.word,cat.replace);
                // console.log(replaceText)//SENDS A WORD AT A TIME
            
            });
            //REPLACEING LINECODE WITH COLOR
            // preChild.innerHTML=replaceText
        };
        return Promise.resolve(replaceText) as Promise<string | null>;
    };



    matchHtmlInsert(item:{pre:HTMLPreElement,target:HTMLElement,text:string,regArr:regJavaType[]}):void{
        //THIS IS USERDINDIVIDUALLY @ DisplayBlog: THIS ADDS COLOR TO THE CODE
        const {pre,target,text,regArr}=item;
        let replaceText=text;
        const arrCatch:{start:number,end:number,word:string,replace:string}[]=[]
        regArr.map(reg=>{
            const matches=text.matchAll(reg.searchwd) as any;
            if(!matches) return target.innerHTML=text;
            if(reg.text==="html"){
                target.classList.add("language-html");
                pre.classList.add("language-html");
                this.addClass({parent:pre,class_:"language-html"});
            };
             if(reg.text==="xml"){
                target.classList.add("language-xml");
                pre.classList.add("language-xml");
                this.addClass({parent:pre,class_:"language-xml"});
            };
            for( const match of matches){
                if(match && match[0] !==""){
                    // console.log(match)
                    const end=match.index + match[0].length
                    const start=match.index;
                    let word:string="";
                    if(reg.text==="html"){
                        if(reg.name==="anchor-open"){
                            word= " " + (match[0] as string) + " ";
                        }else if(reg.name==="anchor-close"){
                            word= " " + (match[0] as string) + " ";
                        }else{
                            word=" " + match[0] + " "
                        }
                    }else{
                        word=(match[0] as string).slice(start+1,end-2);
                    }
                    const replace=reg.replacewd(word)
                    if(replace){
                        arrCatch.push({start,end,word,replace})
                    }
                }
            }
        });

        arrCatch.map(cat=>{
            replaceText=replaceText.replace(cat.word,cat.replace);
        });

        target.innerHTML=replaceText
    };


    addClass(item:{parent:HTMLElement,class_:string}){
            const {parent,class_}=item;
            ([...parent.children as any] as HTMLElement[]).map(ele=>{
                if(ele){
                    ele.classList.add(class_);
                }
            });
    };


    removeMainElement(item:{parent:HTMLElement,container:HTMLElement,target:HTMLElement}){
        const {parent,container,target}=item;
        Header.cleanUpByID(parent,"xIconDiv-" + container.id);
        const css="position:absolute;transform:translate(-10px,-18px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:0%;left:0%;z-index:10;";
        container.classList.add("position-relative");
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("contenteditable","false");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.className="xIconDiv";
        xIconDiv.id=`xIconDiv-${container.id}`;
        xIconDiv.style.cssText=`${css}`;
        const cssStyle={background:"inherit",fontSize:"inherit"};
        FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
        container.appendChild(xIconDiv);
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.promRemoveElement(target).then(async(res)=>{
                    if(res){
                        this._modSelector.selectCodes.map((code,index)=>{
                            if(code.eleId===target.id){
                                this._modSelector.selectCodes.splice(index,1);
                            }
                        });
                        this._modSelector.shiftPlace(res.placement);///REINDEX PLACEMENT!!!!
                    }
                });
                Misc.fadeOut({anchor:container,xpos:100,ypos:100,time:500});
                setTimeout(()=>{
                    parent.removeChild(container);
                },480);
            }
        });
        
    };

    
    promRemoveElement(target:HTMLElement){
        return Promise.resolve(this.removeElement(target)) as Promise<codeType|undefined>;
    };

    
    removeElement(target:HTMLElement):codeType|undefined{
        let code_:codeType|undefined;
        this._modSelector.selectCodes.map((code,index)=>{
                if(code.eleId===target.id){
                    this._modSelector.elements.splice(index,1);
                    code_= code;
                }
        });
        this.selectCodes=this._modSelector.selectCodes;
        return code_
    }
}

export default NewCode;
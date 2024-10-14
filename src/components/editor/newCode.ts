import Misc from "../common/misc";
import Service from "../common/services";
import Nav from "../nav/headerNav";
import Header from "./header";
import ModSelector from "./modSelector";
import {codeType,replType, linecodeType,} from "./Types";
import {FaCreate} from "@/components/common/ReactIcons";
import {FaCrosshairs,FaPython, FaHtml5} from "react-icons/fa";
import { TbJson } from "react-icons/tb";
import { RiJavascriptFill } from "react-icons/ri";
import User from "../user/userMain";
import { getErrorMessage } from "@/lib/errorBoundaries";


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
                 cssText: "margin-left:2rem;text-height:0.1rem; background-color:black;color:white;text-wrap:wrap;display:flex;align-items:center;justify-content:flex-start;gap:0.5rem;padding-inline:1rem;border-radius:12px;padding:1rem;margin-inline:1rem;width:100%;max-width:600px;box-shadow:1px 1px 12px 1px;",
                 class: " mx-auto  mb-1 language-javascript text-dark ",
                 inner_html:"",
                 linecode:[{id:0,text:"const doc=document.createElement('p');",code_id:0}],
                 template: "const doc=document.createElement('p');",
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
                 cssText: "margin-left:2rem;text-height:0.1rem; background-color:black;color:white;text-wrap:wrap;display:flex;align-items:center;justify-content:flex-start;gap:0.5rem;padding-inline:1rem;border-radius:12px;padding:1rem;margin-inline:1rem;width:100%;max-width:600px;box-shadow:1px 1px 12px 1px;",
                 class: " mx-auto mb-1 language-html text-dark",
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
                 cssText:"margin-left:2rem;text-height:0.1rem; background-color:whitesmoke;text-wrap:wrap;display:flex;align-items:center;justify-content:flex-start;gap:0.5rem;padding-inline:1rem;max-width:600px;width:100%;background-color:#313030;border-radius:16px;box-shadow:1px 1px 12px 1px black;",
                 class: " mx-auto mb-1 language-json text-dark",
                 inner_html:"",
                 linecode:[{id:0,text:`{"id":"0","name":"JSON"}`,code_id:2}],
                 template: `{"id":"0","name":"JSON"}`,
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
                 cssText: "margin-left:2rem;text-height:0.1rem; background-color:black;color:white;text-wrap:wrap;display:flex;align-items:center;justify-content:flex-start;gap:0.5rem;padding-inline:1rem;border-radius:12px;padding:1rem;margin-inline:1rem;width:100%;max-width:600px;box-shadow:1px 1px 12px 1px;",
                 class: " m-auto   mb-1 w-100 language-python ",
                 inner_html:"",
                 linecode:[{id:0,text:`class Python:`,code_id:3}],
                 template: `class Python:`,
                 attr: "",
                 blog_id:0,
             },
         ];
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
        this._selectCodes=this._modSelector._selectCodes;
        this._count=this._modSelector._count;
        // this.divCont_class=="eleContainer";
        // this.divCont_css=="margin:auto;padding:0.75rem;";
        NewCode.regJavaArr=[
            {name:"=document",searchwd:/\=(document)/g,replacewd:(name)=>{return `<span id=doc style=color:lightblue;text-wrap:nowrap>${name}</span>`},text:""},
            {name:"const",searchwd:/(const)/g,replacewd:(name)=>{return `<span id=const style=color:green;text-wrap:nowrap;font-weight:bold;>${name}</span>`},text:""},
            {name:"func",searchwd:/\.[a-zA-Z]{3,}\(\"[a-zA-Z]{1,}\"\)/g,replacewd:(name)=>{return`<span id=func1_ style=color:yellow;text-wrap:nowrap>${name}</span>`},text:""},
            {name:"async",searchwd:/(async)/g,replacewd:(name)=>{return`<span id=func_ style=color:#ff0048;font-weight:bold;>${name}</span>`},text:""},
            {name:"async",searchwd:/(export)/g,replacewd:(name)=>{return`<span id=func_ style=color:#ff0048;font-weight:bold;>${name}</span>`},text:""},
            {name:"func2",searchwd:/(function)/g,replacewd:(name)=>{return`<span id=func2 style=color:lightblue;>${name}</span>`},text:""},
            {name:"let",searchwd:/(let)/g,replacewd:(name)=>{return`<span id=let_ style=color:#00d6ff;font-weight:bold>${name}</span>`},text:""},
            {name:"arrow",searchwd:/(\=\>)/g,replacewd:(name)=>{return`<span id=arrow style=color:red;font-weight:bold>${name}</span>`},text:""},
            {name:"map",searchwd:/\.(map\()/g,replacewd:(name)=>{return`<span id=map style=color:yellow;font-weight:bold>${name}</span>`},text:""},
            {name:"filter",searchwd:/\.(filter\()/g,replacewd:(name)=>{return`<span id=filter style=color:yellow;font-weight:bold>${name}</span>`},text:""},
            {name:"reduce",searchwd:/\.(reduce\(\([a-zA-Z\.\+\-\,]{1,}\))/g,replacewd:(name)=>{return`<span id=filter style=color:yellow;font-weight:bold>${name}</span>`},text:""},
            {name:"comment",searchwd:/(\/\/[\sa-zA-Z0-9\.\,\.]{6,})/g,replacewd:(name)=>{return`<span id=comment style=color:#00ff5c;font-weight:bold>${name}</span>`},text:""},
            {name:"if",searchwd:/(if\([a-zA-Z0-9\=\"\']{1,}\))/g,replacewd:(name)=>{return`<span id=if_ style=color:white;font-weight:bold>${name}</span>`},text:""},
            {name:"class",searchwd:/(class)/g,replacewd:(name)=>{return`<span id=if_ style=color:green;font-weight:bold> ${name} </span>`},text:""},
            {name:"constructor",searchwd:/(constructor)/g,replacewd:(name)=>{return`<span id=if_ style=color:lightblue;font-weight:bold> ${name} </span>`},text:""},
            {name:"this",searchwd:/(this)\./g,replacewd:(name)=>{return`<span id=if_ style=color:#8c0505;font-weight:bold> ${name} </span>`},text:""},
            {name:"as",searchwd:/\\s(as)\\s(HTMLElement)/g,replacewd:(name)=>{return`<span id=if_ style=color:green;font-weight:bold> ${name} </span>`},text:""},
            
        ]
        NewCode.regPythonArr=[
            // {name:"class",searchwd:/(class)+/g,replacewd:`<span id="class_" style="color:green;font-weight:bold;">class</span>
            // `,text:""},
            {name:"class",searchwd:/(class)/g,replacewd:(name)=>{return `<span id=doc style=color:lightgreen;font-weight:bold;>${name}</span>`},text:""},
            {name:"method",searchwd:/[a-zA-Z0-9]{2,}\:/g,replacewd:(name)=>{return `<span id=doc style=color:yellow;font-weight:bold;>${name}</span><br/>`},text:""},
            {name:"for",searchwd:/(for)\s[a-zA-Z0-9\;\=\+\-]{2,}\:/g,replacewd:(name)=>{return `<span id=doc style=color:lightblue;font-weight:bold;margin-left:1rem;>${name}</span>`},text:""},
            {name:"items",searchwd:/\.(items)\(\)\:/g,replacewd:(name)=>{return `<span id=doc style=color:yellow;>${name}</span>`},text:""},
            {name:"comment",searchwd:/\#[\s a-zA-Z0-9\?\.\-]{5,}/g,replacewd:(name)=>{return `<span id=doc style=color:green;margin-left:1rem;>${name}</span>`},text:""},
            {name:"range",searchwd:/(range)\([a-zA-Z0-9\,]{3,}\)\:/g,replacewd:(name)=>{return `<span id=doc style=color:yellow;>${name}</span>`},text:""},
            {name:"in",searchwd:/\s(in)\s/g,replacewd:(name)=>{return `<span id=doc style=color:green;font-weight:bold>${name}</span>`},text:""},
            {name:"self",searchwd:/(self)/g,replacewd:(name)=>{return `<span id=doc style=color:#ee8080;>${name}</span>`},text:""},
            {name:"_init_()",searchwd:/(_init_)\([a-zA-Z0-9\.\,]{5,}\)/g,replacewd:(name)=>{return `<span id=doc style=color:lightblue;font-weight:bold;>${name}</span>`},text:""},
            {name:"if",searchwd:/(if)\s[a-zA-Z0-9]{2,}\:/g,replacewd:(name)=>{return `<span id=doc style=color:#8c0505;>${name}</span>`},text:""},
            {name:"return",searchwd:/(return)/g,replacewd:(name)=>{return `<span id=doc style=color:violet;font-weight:bold;>${name}</span>`},text:""},
        ]
        NewCode.regJSONArr=[
            // {name:"class",searchwd:/(class)+/g,replacewd:`<span id="class_" style="color:green;font-weight:bold;">class</span>
            // `,text:""},
            {name:"keyValue1",searchwd:/\"[a-zA-Z0-9]{1,}\"\:/g,replacewd:(name)=>{return `<span id=keyValue style=color:#bcdbca;margin-left:1rem;>${name}</span>`},text:""},
            {name:"keyValue2",searchwd:/\:\"[a-zA-Z0-9]{1,}\"/g,replacewd:(name)=>{return `<span id=keyValue style=color:#bcdbca;margin-left:1rem;>${name}</span>`},text:""},
            {name:"{",searchwd:/\{/g,replacewd:(name)=>{return `<span id=opencurl style=color:red;font-weight:bold;margin-left:0.5rem>${name}</span><br/>`},text:""},
            {name:"}",searchwd:/\}/g,replacewd:(name)=>{return `<br/><span id=closecurl style=color:red;font-weight:bold;margin-left:0.5rem>${name}</span>`},text:""},
            {name:",",searchwd:/\,/g,replacewd:(name)=>{return `<span id=closecurl style=color:green;font-weight:bold;margin-left:0.5rem;font-size:120%;>${name}</span>`},text:""},
            {name:"[",searchwd:/\[/g,replacewd:(name)=>{return `<span id=closecurl style=color:pink;font-weight:bold;margin-left:1rem>${name}</span>`},text:""},
            {name:"]",searchwd:/\]/g,replacewd:(name)=>{return `<span id=closecurl style=color:pink;font-weight:bold;margin-left:1rem>${name}</span>`},text:""},
            
        ]
        NewCode.regHtmlArr=[
            {name:"class",searchwd:/(class)\=\'[a-zAA-Z0-9]{2,}\'/g,replacewd:(name)=>{return `<span  style=color:lightgreen;text-wrap:nowrap>${name}</span>`},text:""},
            {name:"id",searchwd:/(id)\=\'[a-zAA-Z0-9]{2,}\'/g,replacewd:(name)=>{return `<span  style=color:lightblue;text-wrap:nowrap>${name}</span>`},text:""},
            {name:"anchor-open",searchwd:/\<[a-zA-Z0-9\-]{2,}\/\>/g,replacewd:(name)=>{return `<span  style=color:blueblue;text-wrap:nowrap>&lt;${name}&gt;</span>`},text:""},
            {name:"anchor-close",searchwd:/\<\/[a-zA-Z0-9\-]{2,}\/\>/g,replacewd:(name)=>{return `<span  style=color:blueblue;text-wrap:nowrap>&lt;/${name}&gt;</span>`},text:""},
            {name:"items",searchwd:/\.(items)\(\)/g,replacewd:(name)=>{return `<span  style=color:yellow;text-wrap:nowrap>${name}</span>`},text:""},
            {name:"comment",searchwd:/\#[ a-zA-Z0-9\?\.\-]{5,}/g,replacewd:(name)=>{return `<span  style=color:green;text-wrap:nowrap>${name}</span>`},text:""},
            {name:"range",searchwd:/(range)\([a-zA-Z0-9\,]{3,}\)/g,replacewd:(name)=>{return `<span  style=color:yellow;text-wrap:nowrap>${name}</span>`},text:""},
           
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
    }
    //----GETTERS SETTERS---///

    showCode(parent:HTMLElement,selectCode:codeType){
        //THIS IS USED IN EDIT ( && CLEAN VERSION: DISPLAY BLOG)
        if(selectCode){
            this.selectCode={...selectCode};
            const regArr:{name:string,arrType:regJavaType[]}[]=[
                {name:"java",arrType:NewCode.regJavaArr},
                {name:"python",arrType:NewCode.regPythonArr},
                {name:"html",arrType:NewCode.regHtmlArr},
                {name:"JSON",arrType:NewCode.regJSONArr},

            ]
            const innerContainer=document.createElement("div");
            innerContainer.id="innerContainer";
            innerContainer.style.cssText="width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;position:relative;"
            parent.style.position="relative";
            //------title container----------//

            const imgDive=document.createElement("div");
            imgDive.id="imgDiv";
            imgDive.style.cssText="display:block;justify-content:center;align-items:center;gap:1.25rem;position:absolute;top:0%;right:10%;transform:translate(-185px,15px);";
            if(selectCode.name==="html"){
                imgDive.style.transform="translate(-185px,15px)";
            }
            const xDiv=document.createElement("div");
            xDiv.style.cssText="padding:1rem;max-width:75px;border-radius:25%;background-color:black;color:white;display:flex;justify-content:center;align-items:center;position:relative;z-index:20;box-shadow:1px 1px 12px 1px black;";
            
            const span=document.createElement("span");
            span.style.cssText="position:absolute:top:100%;left:0%;transform:translate(10px,-16px);z-index:100;";
            span.textContent=selectCode.name;
            span.className="text-primary lean text-bold text-lg text-capitalize";
            if(selectCode.name==="java"){
                FaCreate({parent:xDiv,name:RiJavascriptFill,cssStyle:{fontSize:"30px",margin:"auto",padding:"5px",borderRadius:"50%",color:"yellow",backgroundColor:"white"}});
                xDiv.style.color="yellow";
            }else if(selectCode.name==="python"){
                FaCreate({parent:xDiv,name:FaPython,cssStyle:{fontSize:"30px",margin:"auto",padding:"5px",borderRadius:"50%",color:"blue",backgroundColor:"white"}});
            }else if(selectCode.name==="JSON"){
                FaCreate({parent:xDiv,name:TbJson,cssStyle:{fontSize:"30px",margin:"auto",padding:"5px",borderRadius:"50%",color:"red",backgroundColor:"white"}});
            }else if(selectCode.name==="html"){
                FaCreate({parent:xDiv,name:FaHtml5,cssStyle:{fontSize:"30px",margin:"auto",padding:"5px",borderRadius:"50%",color:"blue",backgroundColor:"white"}});
            }
            imgDive.appendChild(xDiv);
            imgDive.appendChild(span);
            innerContainer.appendChild(imgDive);
            const target=document.createElement("code");
            target.id=selectCode.eleId;
            target.setAttribute("is-element","true");
            target.setAttribute("name",selectCode.name);
            target.style.cssText=selectCode.cssText;
            target.className=selectCode.class;
            const pre=document.createElement("pre");
            pre.setAttribute("contenteditable","true");
            target.setAttribute("data-placement",`${String(selectCode.placement)}-A`)
            pre.id="pre";
            pre.className=selectCode.class;
            pre.style.cssText="color:white;padding-block:1rem;width:100%;";
            const regType=regArr.find(reg=>(reg.name===selectCode.name));
            if(regType){
                this.preElementShow({pre:pre,regArr:regType.arrType,selectCode:this.selectCode});
                
            }
            target.onclick=(e:MouseEvent)=>{
                if(e){
                    target.classList.toggle("isActive");
                }
            };
            this.removeMainElement({parent,container:innerContainer,target:target});
            const btnContainer=document.createElement("div");
            btnContainer.style.cssText="margin-inline:auto;display:flex;justify-content;center;align-items:center;"
            const {button:refresh}=Misc.simpleButton({anchor:btnContainer,bg:Nav.btnColor,color:"white",text:"refresh",time:400,type:"button"});
            refresh.onclick=(e:MouseEvent)=>{
                if(e){
                    const getType=regArr.find(type=>(type.name===this.selectCode.name))
                    if(getType){
                        this.preElementShow({pre:pre,regArr:getType.arrType,selectCode:this.selectCode});
                    }
                }
            };
            const {button:save}=Misc.simpleButton({anchor:btnContainer,bg:Nav.btnColor,color:"white",text:"save",time:400,type:"button"});
            save.onclick=(e:MouseEvent)=>{
                if(e){
                    this.selectCode={...this.selectCode,placement:this.placement};
                    this._selectCodes.push(this.selectCode);
                    this.selectCodes=[...this._selectCodes];
                    this.placement= this.placement + 1;
                    //save it to database=>service
                }
            };
            target.appendChild(pre)
            innerContainer.appendChild(target);
            innerContainer.appendChild(btnContainer);
            parent.appendChild(innerContainer);
        }
    }

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
        select.addEventListener("change", (e:Event) => {
            if (e) {
                const value:string = (e.currentTarget as HTMLSelectElement).value;
                if (value ) {
                    this.selectCode=JSON.parse(value as string) as codeType;
                    this.selectCode={...this.selectCode,placement:this.placement};
                    this.placement=this.placement + 1;
                    this.genCode({parent,container,selectCode:this.selectCode}).then(async(res)=>{
                        if(res){
                            this.selectCode=res.selectCode;
                            const btnContainer=document.createElement("div");
                            btnContainer.style.cssText="margin-inline:auto;display:flex;justify-content;center;align-items:center;"
                            const {button:refresh}=Misc.simpleButton({anchor:btnContainer,bg:Nav.btnColor,color:"white",text:"refresh",time:400,type:"button"});
                            refresh.onclick=(e:MouseEvent)=>{
                                if(e){
                                    const arr:{name:string,arrType:regJavaType[]}[]=[
                                        {name:"java",arrType:NewCode.regJavaArr},
                                        {name:"python",arrType:NewCode.regPythonArr},
                                        {name:"html",arrType:NewCode.regHtmlArr},
                                        {name:"JSON",arrType:NewCode.regJSONArr},
                
                                    ]
                                    const getType=arr.find(type=>(type.name===this.selectCode.name))
                                    if(getType){
                                        this.preElement({pre:res.pre,regArr:getType.arrType,selectCode:this.selectCode});
                                    }
                                }
                            };
                            const {button:save}=Misc.simpleButton({anchor:btnContainer,bg:Nav.btnColor,color:"white",text:"save",time:400,type:"button"});
                            save.onclick=async(e:MouseEvent)=>{
                                if(e){
                                    const user=this._user.user;
                                    this.selectCode={...this.selectCode,placement:this.placement};
                                    this._selectCodes.push(this.selectCode);
                                    this.selectCodes=[...this._selectCodes];
                                    const blog=this._modSelector.blog;
                                    this.placement= this.placement + 1;
                                    if(user && user.id && blog && blog.name){
                                        const _blog={...blog,user_id:user.id};
                                        this._service.saveBlog(_blog).then(async(blog_)=>{
                                            if(blog_){
                                                this._service.promsaveItems(blog_).then(async(_blog_)=>{
                                                    if(_blog_){
                                                        Misc.message({parent,msg:" saved",type_:"success",time:800});
                                                    }
                                                }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg);Misc.message({parent,msg:msg,type_:"error",time:800})});
                                            }
                                        });
                                    }else{
                                        const _blog={...blog,user_id:user.id};
                                        await this._user.saveWork({parent,blog:_blog,func:()=>{return undefined}})
                                    }
                            
                                }
                            };
                            res.container.appendChild(btnContainer);
                        }
                    });
                    container.removeChild(select);
                    Misc.fadeIn({anchor:container,xpos:50,ypos:100,time:400});
                }
            }
        });
    }


    genCode(item:{parent:HTMLElement,container:HTMLElement, selectCode:codeType}):Promise<{parent:HTMLElement,container:HTMLElement,pre:HTMLPreElement,selectCode:codeType}> {
        const {parent,container,selectCode}=item;
        this.selectCode=selectCode;
        const maxcount=ModSelector.maxCount(this._modSelector.blog);
            localStorage.setItem("placement",String(maxcount+1));
            this.placement=maxcount+1;
        const regArr:{name:string,arrType:regJavaType[]}[]=[
            {name:"java",arrType:NewCode.regJavaArr},
            {name:"python",arrType:NewCode.regPythonArr},
            {name:"html",arrType:NewCode.regHtmlArr},
            {name:"JSON",arrType:NewCode.regJSONArr},

        ]
        const getType=regArr.find(type=>(type.name===this.selectCode.name))
        let code:codeType=selectCode;
       const innerContainer=document.createElement("div");
       innerContainer.id="innerContainer";
       innerContainer.style.cssText="width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;position:relative;"
        parent.style.position="relative";
        //------title container----------//
        const title=document.createElement("h6");
        title.textContent=selectCode.name;
        title.className="text-center text-primary mb-2 mx-auto";
        const imgDive=document.createElement("div");
        imgDive.id="imgDiv";
        imgDive.style.cssText="display:block;position:absolute;top:0%;right:0%;transform:translate(-205px,15px);z-index:20;";
        const xDiv=document.createElement("div");
        xDiv.style.cssText="padding:1rem;max-width:175px;border-radius:25%;background-color:black;color:white;display:flex;justify-content:center;align-items:center;gap:1rem;position:relative;z-index:20;box-shadow:1px 1px 12px 1px black;";
        if(selectCode.name==="html"){
            imgDive.style.transform="translate(-155px,15px)";
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
        // imgDive.appendChild(title);
        innerContainer.appendChild(imgDive);
        //------title container----------//

        const divCont=document.createElement("div");
        divCont.className="eleContainer";
        divCont.style.cssText="width:100%;padding:1rem;";
        const target = document.createElement("code");
        target.setAttribute("is-element","true");
        target.setAttribute("is-code","true");
        target.setAttribute("data-placement",`${selectCode.placement}-A`);
        target.id = `${selectCode.name}-${selectCode.id}`;
        target.setAttribute("name", selectCode.name);
        target.style.cssText = selectCode.cssText;
        target.className = selectCode.class;
        this.removeMainElement({parent,container,target:target});
        code={...code,placement:this.placement,eleId:target.id,cssText:target.style.cssText,name:selectCode.name}
        this.selectCode={...code};
        const pre=document.createElement("pre");
        pre.id="pre";
        pre.style.cssText="color:white;padding-block:1rem;"
        pre.setAttribute("contenteditable","true");
        this.selectCode.inner_html=selectCode.template ;
        if(getType){
            this.preElement({pre:pre,regArr:getType.arrType,selectCode:this.selectCode});

        }

        target.appendChild(pre);
        divCont.appendChild(target);
      
        target.onclick=(e:MouseEvent)=>{
            if(e){
                target.classList.toggle("isActive");
            }
        };
     
        innerContainer.appendChild(divCont);
        container.appendChild(innerContainer);
        return new Promise(resolver=>{
            resolver({parent,container,pre,selectCode:this.selectCode});
        }) as Promise<{parent:HTMLElement,container:HTMLElement,pre:HTMLPreElement,selectCode:codeType}>;
    }
    preElement(item:{pre:HTMLPreElement,regArr:regJavaType[],selectCode:codeType}){
        const {pre,regArr,selectCode}=item;
        this.selectCode=selectCode;
        // const len=selectCode.linecode?.length ? selectCode.linecode.length :0;
        
        // Header.cleanUpByID(pre,"innerPre");
        const innerPre=document.createElement("p");
        innerPre.setAttribute("contenteditable","true");
        innerPre.id="innerPre";
        innerPre.style.cssText="width:100%;margin:auto;";
        const check=([...pre.children as any] as HTMLElement[]).length>0 ? true:false;
    

        if(check){
            //children P exists
            ([...pre.children as any] as HTMLElement[]).map((child,index)=>{
                //every enter generates a p-tag each enter=>source
                if(child && child.nodeName==="P"){
                    child.id="innerPre-"+ `${index+1}`;
                    child.setAttribute("index",String(index+1));
                    let text:string="";
                    text=child.textContent as string;//contenteditable: dynamic text
                    const check2=this.selectCode.linecode.find(line=>(line.id ===index)) ? false:true;
                    const check1=text !=="" ? true:false;
                    if(check2 && check1){
                        this.selectCode.linecode.push({id:index,text,code_id:selectCode.id});
                    }
                    this.selectCode.linecode = this.selectCode.linecode.map(line=>{
                        if(line.id===index){
                            line.text=text;
                        }
                        return line;
                    });
                   //regArr => SWITCHES UPON SELECTION: BELOW: ADDS COLOR
                   if(selectCode.name!=="html"){
                        this.matchInsert({target:child,text:text,regArr});
                    }else{
                        this.matchHtmlInsert({pre,target:child,text:text,regArr})
                    }
                    }
                    this.count++;
                });
            }else{
                
                let text:string=this.selectCode.linecode[0].text;
                text+=innerPre.textContent;
                this.selectCode.linecode[0].text=text;
                if(selectCode.name!=="html"){
                    this.matchInsert({target:innerPre,text:text,regArr});
                }else{
                    this.matchHtmlInsert({pre,target:innerPre,text:text,regArr})
                }
                pre.appendChild(innerPre);
                this.count++;
            }
            
        return ;
    }
    preElementShow(item:{pre:HTMLPreElement,regArr:regJavaType[],selectCode:codeType}){
        //REGENERATES LINE CODE AND PROVIDES EDITING LINE
        const {pre,regArr,selectCode}=item;
        this.selectCode=selectCode;
        Header.cleanUpByID(pre,"preSubContainer");
        const container=document.createElement("div");
        container.id="preSubContainer";
        container.style.cssText="width:100%;background-color:transparent;padding-inline:3px;"
        const check=(this.selectCode.linecode as linecodeType[]).length>0 ? true:false;
        if(check){
            //children P exists
            (this.selectCode.linecode).sort((a,b)=>{if(a.id<b.id) return -1;return 1}).map((line,index)=>{
               
                if(line ){
                    const innerPre=document.createElement("p");
                    const text:string=line.text;
                    innerPre.setAttribute("contenteditable","true");
                    innerPre.setAttribute("index",String(index));
                    innerPre.id="innerPre-"+ `${index}`;
                    
                        if(selectCode.name!=="html"){
                            this.matchInsert({target:innerPre,text:text,regArr:regArr});
                        }else{
                            this.matchHtmlInsert({pre,target:innerPre,text:text,regArr:regArr});
                        }
                        innerPre.onkeydown=(e:KeyboardEvent)=>{
                            if(e.key==="Enter"){
                                console.log("Entered: index",index)
                            }
                        };
                        container.appendChild(innerPre);
                        pre.appendChild(container);
                        }
                        
                    });
            }
            this.lineEdit({preSub:container,regArr,selectCode});
              
        return ;
    }

    lineEdit(item:{preSub:HTMLElement,regArr:regJavaType[],selectCode:codeType}){
        const {preSub,regArr,selectCode}=item;
        this.selectCode=selectCode;
        const innerPres=([...preSub.children as any] as HTMLElement[]);
        [...innerPres].map((innerPre)=>{
            if(innerPre){
                
                ([...preSub.children as any] as HTMLElement[]).map((child,index)=>{
                    if(child){
                       const text=child.textContent as string;//contenteditable: dynamic text
                        
                        this.selectCode.linecode = this.selectCode.linecode.map(line=>{
                            if(line.id===index && line.text !==text){
                                line.text=text;
                            }
                            return line;
                        });
                            if(selectCode.name==="java"){
                                this.matchInsert({target:child,text:text,regArr:regArr});
                            }else if(selectCode.name==="python"){
                                this.matchInsert({target:child,text:text,regArr:regArr});
                            }else if(selectCode.name==="html"){
                                this.matchInsert({target:child,text:text,regArr:regArr});
                            }else if(selectCode.name==="JSON"){
                                this.matchInsert({target:child,text:text,regArr:regArr});
                            }
                    }
                });
                 
            }

        });
    }
    matchInsert(item:{target:HTMLElement,text:string,regArr:regJavaType[]}):void{
        //THIS IS USERDINDIVIDUALLY @ DisplayBlog: THIS ADDS COLOR TO THE CODE
        const {target,text,regArr}=item;
        let replaceText=text;
        
        const arrCatch:{start:number,end:number,word:string,replace:string}[]=[]
        regArr.map(reg=>{
            const matches=text.matchAll(reg.searchwd) as any;
            for( const match of matches){
                if(match && match[0]){

                    const end=match.index + match[0].length
                    const start=match.index;
                    const word=match[0]
                    const replace=reg.replacewd(match[0])
                    arrCatch.push({start,end,word,replace})
                }
            }
        });
        arrCatch.map(cat=>{
            replaceText=replaceText.replace(cat.word,cat.replace);
        
        });
        target.innerHTML=replaceText
    }
    matchHtmlInsert(item:{pre:HTMLPreElement,target:HTMLElement,text:string,regArr:regJavaType[]}):void{
        //THIS IS USERDINDIVIDUALLY @ DisplayBlog: THIS ADDS COLOR TO THE CODE
        const {target,text,regArr}=item;
        let replaceText=text;
        target.classList.add("language-html")
        const arrCatch:{start:number,end:number,word:string,replace:string}[]=[]
        regArr.map(reg=>{
            const matches=text.matchAll(reg.searchwd) as any;
            for( const match of matches){
                if(match && match[0]){

                    const end=match.index + match[0].length
                    const start=match.index;
                    const word=match[0]
                    const replace=reg.replacewd(match[0])
                    arrCatch.push({start,end,word,replace})
                }
            }
        });
        arrCatch.map(cat=>{
            replaceText=replaceText.replace(cat.word,cat.replace);
        
        });
        target.innerHTML=replaceText
    }
    removeMainElement(item:{parent:HTMLElement,container:HTMLElement,target:HTMLElement}){
        const {parent,container,target}=item;
        Header.cleanUpByID(parent,"xIconDiv");
        const css="position:absolute;transform:translate(-10px,-18px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:0%;left:0%;";
        container.classList.add("position-relative");
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("contenteditable","false");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.className="xIconDiv";
        xIconDiv.id=`xIconDiv`;
        xIconDiv.style.cssText=`${css}`;
        const cssStyle={background:"inherit",fontSize:"inherit"};
        FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
        container.appendChild(xIconDiv);
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.promRemoveElement(target).then(async(res)=>{
                    if(res){
                        this._modSelector._selectCodes.map((code,index)=>{
                            if(code.eleId===target.id){
                                this._modSelector._selectCodes.splice(index,1);
                            }
                        });
                        this._modSelector.selectCodes=this._modSelector._selectCodes;
                        this._modSelector.shiftPlace(res.placement);///REINDEX PLACEMENT!!!!
                    }
                });
                Misc.fadeOut({anchor:container,xpos:100,ypos:100,time:500});
                setTimeout(()=>{
                    parent.removeChild(container);
                },480);
            }
        });
        
    }
    promRemoveElement(target:HTMLElement){
        return new Promise((resolve)=>{
            resolve(this.removeElement(target));
        }) as Promise<codeType|undefined>;
    }
    removeElement(target:HTMLElement):codeType|undefined{
        let code_:codeType|undefined;
        this._modSelector._selectCodes.map((code,index)=>{
                if(code.eleId===target.id){
                    this._modSelector._elements.splice(index,1);
                    code_= code;
                }
        });
        this.selectCodes=this._modSelector._selectCodes;
        return code_
    }
}

export default NewCode;
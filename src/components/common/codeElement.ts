import Service from "./services";
import ModSelector from "../editor/modSelector";
import { regJavaType } from "../editor/newCode";
import { arrCatchType, elementType } from "../editor/Types";
import Misc from "./misc/misc";
import Nav from "../nav/headerNav";
import Header from "../editor/header";
import {FaCreate} from "@/components/common/ReactIcons";
import {FaCrosshairs,FaPython, FaHtml5} from "react-icons/fa";
import { TbJson } from "react-icons/tb";
import { RiJavascriptFill } from "react-icons/ri";
import { idValueType } from "@/lib/attributeTypes";


class CodeElement{
    regJavaArr:regJavaType[];
    regPythonArr:regJavaType[];
    regJSONArr:regJavaType[];
    regHtmlArr:regJavaType[];
    regArrs:{name:string,regArr:regJavaType[]}[];
    _element:elementType;
    initTypes:string[];
    _codeElements:elementType[];
    constructor(private _modSelector:ModSelector,private _service:Service){
        this.regJavaArr=[
            {name:"=document",searchwd:/=(document)\./g,replacewd:(name)=>{return `<code id=document><b>${name}</b></code>`},text:""},
            {name:"const",searchwd:/\s(const)\s/g,replacewd:(name)=>{return `<code id=const><b>${name}</b></code>`},text:""},
            {name:"method",searchwd:/\.\w{3,}\(([a-zA-Z:{}"']+)\)/g,replacewd:(name)=>{return`<code id=method><b>${name}</b></code>`},text:""},
            {name:"async",searchwd:/\s(async)\s/g,replacewd:(name)=>{return`<code id=async style=color:#ff0048;font-weight:bold;><b>${name}</b></code>`},text:""},
            {name:"export",searchwd:/(export)\s/g,replacewd:(name)=>{return`<code id=export ><b>${name}</b></code>`},text:""},
            {name:"function",searchwd:/\s(function)\s/g,replacewd:(name)=>{return`<code id=function><b>${name}</b></code>`},text:""},
            {name:"let",searchwd:/(let)\s/g,replacewd:(name)=>{return`<code id=let><b>${name}</b></code>`},text:""},
            {name:"arrow",searchwd:/(=>)/g,replacewd:(name)=>{return`<code id=arrow ><b>${name}</b></code>`},text:""},
            {name:"map",searchwd:/\.(map\()/g,replacewd:(name)=>{return`<code id=map><b>${name}</b></code>`},text:""},
            {name:"filter",searchwd:/\.(filter\()/g,replacewd:(name)=>{return`<code id=filter ><b>${name}</b></code>`},text:""},
            {name:"return",searchwd:/(return)/g,replacewd:(name)=>{return`<code id=return><b>${name}</b></code>`},text:""},
            {name:"reduce",searchwd:/\.(reduce\(\([a-zA-Z.+-,\s-]+\))/g,replacewd:(name)=>{return`<code id=reduce ><b>${name}</b></code>`},text:""},
            {name:"comment",searchwd:/\/\/[a-zA-Z0-9,.\s]{6,}\./g,replacewd:(name)=>{return`<p id=comment>${name}</p>`},text:""},
            {name:"text",searchwd:/"\s[a-zA-Z0-9;:\s]{6,}"/g,replacewd:(name)=>{return`<code id=text><b>${name}</b></code>`},text:""},
            {name:"if_",searchwd:/\s(if)\([a-zA-Z0-9="']+\)\{/g,replacewd:(name)=>{return`<code id=if_><b>${name}</b></code>`},text:""},
            {name:"class",searchwd:/(class)\s/g,replacewd:(name)=>{return`<code id=class><b>${name}</b></code>`},text:""},
            {name:"constructor",searchwd:/\s(constructor)\(/g,replacewd:(name)=>{return`<code id=constructor><b>${name}</b></code>`},text:""},
            {name:"htmlElement",searchwd:/:(HTMLElement)/g,replacewd:(name)=>{return`<code id=htmlElement><b>${name}</b></code>`},text:""},
            {name:"this",searchwd:/(this)\./g,replacewd:(name)=>{return`<code id=this><b>${name}</b></code>`},text:""},
            {name:"as",searchwd:/\s(as)\s/g,replacewd:(name)=>{return`<code id=as ><b>${name}</b></code>`},text:""},
            {name:"createElement",searchwd:/(createElement)/g,replacewd:(name)=>{return`<code id=createElement><b>${name}</b></code>`},text:""},
            {name:"getElementById",searchwd:/(getElementById)/g,replacewd:(name)=>{return`<code id=getElementById><b>${name}</b></code>`},text:""},
            {name:"querySelector",searchwd:/(querySelector)/g,replacewd:(name)=>{return`<code id=querySelector><b>${name}</b></code>`},text:""},
            {name:"querySelectorAll",searchwd:/(querySelectorAll)/g,replacewd:(name)=>{return`<code id=querySelectorAll><b>${name}</b></code>`},text:""},
            {name:"Promise",searchwd:/\s(Promise\()/g,replacewd:(name)=>{return`<code id=Promise><b>${name}</b></code>`},text:""},
            {name:"Promiseall",searchwd:/\s(Promise.all)\(/g,replacewd:(name)=>{return`<code id=promiseall><b>${name}</b></code>`},text:""},
            {name:"className",searchwd:/(\.className=)/g,replacewd:(name)=>{return`<code id=className ><b>${name}</b></code>`},text:""},
            {name:"class_name",searchwd:/(class)\s\+/g,replacewd:(name)=>{return`<code id=class_name><b>${name.split(" ")[0]}</b></code>`},text:""},
            {name:"new",searchwd:/\s(new)\s/g,replacewd:(name)=>{return`<code id=new><b>${name}</b></code>`},text:""},
            {name:"resolver",searchwd:/(resolver\()/g,replacewd:(name)=>{return `<code id=resolver><b>${name}</b></code>`},text:""},
            {name:"default",searchwd:/\s(default)\s/g,replacewd:(name)=>{return`<code id=default><b>${name}</b></code>`},text:""},
            {name:"onclick",searchwd:/\.(onclick)=/g,replacewd:(name)=>{return`<code id=onclick><b>${name}</b></code>`},text:""},
            {name:"eventListener",searchwd:/(addEventListener)/g,replacewd:(name)=>{return`<code id=addEventListener style=color:yellow;font-weight:bold;><b>${name}</b></code>`},text:""},
            {name:"string",searchwd:/:(string)/g,replacewd:(name)=>{return`<code id=string><b>${name.split(":")[1]}</b></code>`},text:""},
            {name:"number",searchwd:/:(number)/g,replacewd:(name)=>{return`<code id=number ><b>${name.split(":")[1]}</b></code>`},text:""},
        ]
        this.regPythonArr=[
            // {name:"class",searchwd:/(class)+/g,replacewd:`<span id="class_" style="color:green;font-weight:bold;">class</span>
            // `,text:""},
            //NOTE =>$& = THE MATCH[0] OR FOUND WORD.YOU CAN USE IT HERE INSTEAD OF NAME
            {name:"class",searchwd:/\s(class)\s/g,replacewd:(name)=>{return `<code id=pclass style=color:lightgreen;><b>${name}</b></code>`},text:""},
            {name:"method",searchwd:/\w{2,}\([a-zA-Z0-9.,]+\):/g,replacewd:(name)=>{return `<code id=method style=color:yellow;><b>${name}</b></code><br/>`},text:""},
            {name:"for",searchwd:/(for)[a-zA-Z0-9+-\s()]{2,}:/g,replacewd:(name)=>{return `<code id=for style=color:green;><b>${name}</b></code>`},text:""},
            {name:"items",searchwd:/[a-zA-Z0-9]+\.(items)\(\):/g,replacewd:(name)=>{return `<code id=items style=color:yellow;><b>${name}</b></code>`},text:""},
            {name:"enumerate",searchwd:/(enumerate)/g,replacewd:(name)=>{return `<code id=enumerate style=color:yellow;><b>${name}</b></code>`},text:""},
            {name:"comment",searchwd:/#[ a-zA-Z0-9?.-]{5,}\s/g,replacewd:(name)=>{return `<p id=comment style=color:lightgreen><b>${name}</b></p>`},text:""},
            {name:"Range",searchwd:/(Range)\([a-zA-Z0-9,]{3,}\):/g,replacewd:(name)=>{return `<code id=range style=color:green;><b>${name}</b></code>`},text:""},
            {name:"in",searchwd:/\s(in)\s/g,replacewd:(name)=>{return `<code id=in style=color:green;><b>${name}</b></code>`},text:""},
            {name:"self",searchwd:/(self)/g,replacewd:(name)=>{return `<code id=self style=color:#ee8080;><b>${name}</b></code>`},text:""},
            {name:"__init__()",searchwd:/(_init_)\([a-zA-Z0-9.,\s]{5,}\)/,replacewd:(name)=>{return `<code id=__init__ style=color:lightblue><b>${name}</b></code>`},text:""},
            {name:"if",searchwd:/(if)\s[a-zA-Z0-9\s<>=]{2,}:/g,replacewd:(name)=>{return `<code id=if style=color:lightgreen><b>${name}</b><span style=color:white>${name.split("if")[1]}</span></code>`},text:""},
            {name:"return",searchwd:/(return)/g,replacewd:(name)=>{return `<code id=return style=color:green><b>${name}</b></code>`},text:""},
            
        ]
        this.regJSONArr=[
            {name:"json",searchwd:/"[a-zA-Z0-9\s]":"[a-zA-Z0-9\s]"/g,replacewd:(name)=>{return `<code class='language-json' id=json style=color:lime><b>${name}</b></code>`},text:""},
            {name:",",searchwd:/,/g,replacewd:(name)=>{return `<pre class='language-json' id=comma><b>,</b></pre>`},text:""},
            {name:"[",searchwd:/\[/g,replacewd:(name)=>{return `<pre><code class='language-json' id=openBracket ><b>[</b></code></pre>`},text:""},
            {name:"]",searchwd:/\]/g,replacewd:(name)=>{return `<pre><code class='language-json' id=closeBracket ><b>]</b></code></pre>`},text:""},
            
        ]
        //<=&lt;>=&gt;
        this.regHtmlArr=[
            
            {name:"divClass",searchwd:/<(div)\s((class)="[a-zA-Z0-9\s-]+")>/g,replacewd:(name)=>{return `<code id=divClass ><b>${name}</b></code>`},text:"html"},
            {name:"divId",searchwd:/<(div)\s((id)="[a-zA-]+")>/g,replacewd:(name)=>{return `<code id=divId ><b>${name}</b></code>`},text:"html"},
            {name:"xml",searchwd:/<([a-zA-Z0-9-]{2,})\/>/g,replacewd:(name)=>{return `<code class=language-xml style=color:green;><b>${name}</b></code>`},text:"xml"},
            {name:"comment",searchwd:/#[a-zA-Z0-9?.-\s]{5,}/g,replacewd:(name)=>{return `<p id=comment>${name}</p>`},text:"html"},
            {name:"div",searchwd:/<(div)>/g,replacewd:(name)=>{return `<code class=language-html id=div style=color:lime;><b>${name}</b></code>`},text:""},
            {name:"div",searchwd:/<\/(div)>/g,replacewd:(name)=>{return `<code class=language-html id=div style=color:lime;><b>&lt;/${name}</b></code>`},text:""},
            {name:"div",searchwd:/<(div)>([a-zA-Z0-9\-,!\s.]{2,})<\/(div)>/g,replacewd:(name)=>{return `<code class=language-html id=divB style=color:lime;><b>div&gt;${name}&lt;/div&gt;</b></code>`},text:""},
            {name:"spanClass",searchwd:/<(span)((class)(id)[a-zA-Z0-9\-\s"'=]+)>/g,replacewd:(name)=>{return `<code class=language-html id=span style=color:lime;><b>${name}</b></code>`},text:"html"},
            {name:"h1",searchwd:/<(h1)>/g,replacewd:(name)=>{return `<code class=language-html id=h1 style=color:lime;><b>${name}</b></code>`},text:"html"},
            {name:"h1",searchwd:/<\/(h1>)/g,replacewd:(name)=>{return `<code class=language-html id=h1B style=color:lime;><b>&lt;/${name}</b></code>`},text:"html"},
            {name:"h2",searchwd:/<(h2)>/g,replacewd:(name)=>{return `<code class=language-html id=h2 style=color:lime;><b>${name}</b></code>`},text:"html"},
            {name:"h2",searchwd:/<\/(h2)>/g,replacewd:(name)=>{return `<code class=language-html id=h2B style=color:lime;><b>&lt;/${name}</b></code>`},text:"html"},
            {name:"h3",searchwd:/<(h3)>/g,replacewd:(name)=>{return `<code class=language-html id=h3 style=color:lime;><b>${name}</b></code>`},text:"html"},
            {name:"h3",searchwd:/<\/(h3)>/g,replacewd:(name)=>{return `<code class=language-html id=h3B style=color:lime;><b>&lt;/${name}</b></code>`},text:"html"},
            {name:"h4",searchwd:/<(h4)>/g,replacewd:(name)=>{return `<code class=language-html id=h4 style=color:lime;><b>${name}</b></code>`},text:"html"},
            {name:"h4",searchwd:/<\/(h4)>/g,replacewd:(name)=>{return `<code class=language-html id=h4B style=color:lime;><b>&lt;/${name}</b></code>`},text:"html"},
            {name:"h5",searchwd:/<(h5)>/g,replacewd:(name)=>{return `<code class=language-html id=h5 style=color:lime;><b>${name}</b></code>`},text:"html"},
            {name:"h5",searchwd:/<\/(h5)>/g,replacewd:(name)=>{return `<code class=language-html id=h5B style=color:lime;><b>&lt;/${name}</b></code>`},text:"html"},
            {name:"h6",searchwd:/<(h6)>/g,replacewd:(name)=>{return `<code class=language-html id=h6 style=color:lime;><b>${name}</b></code>`},text:"html"},
            {name:"h6",searchwd:/<\/(h6)>/g,replacewd:(name)=>{return `<code class=language-html id=h6B style=color:lime;><b>&lt;/${name}</b></code>`},text:"html"},
            {name:"span",searchwd:/<(span)>/g,replacewd:(name)=>{return `<code class=language-html id=h6 style=color:lime;><b>${name}</b></code>`},text:"html"},
            {name:"span",searchwd:/<\/(span)>/g,replacewd:(name)=>{return `<code class=language-html id=spanB style=color:lime;><b>&lt;/${name}</b></code>`},text:"html"},
            {name:"detail",searchwd:/<(detail)>/g,replacewd:(name)=>{return `<code class=language-html id=detail><b>${name}</b></code>`},text:"html"},
            {name:"detail",searchwd:/<\/(detail)>/g,replacewd:(name)=>{return `<code class=language-html id=detailB><b>&lt;/${name}</b></code>`},text:"html"},
            {name:"summary",searchwd:/<(summary)>/g,replacewd:(name)=>{return `<code class=language-html id=summary><b>${name}</b></code>`},text:"html"},
            {name:"summary",searchwd:/<\/(summary)>/g,replacewd:(name)=>{return `<code class=language-html id=summaryB><b>&lt;/${name}</b></code>`},text:"html"},
           
        ]
        this.regArrs=[
            {name:"Java",regArr:this.regJavaArr},
            {name:"Python",regArr:this.regPythonArr},
            {name:"JSON",regArr:this.regJSONArr},
            {name:"HTML",regArr:this.regHtmlArr},
        ]
        this._element={
            id:0,
            placement:0,
            selectorId:undefined,
            eleId: "",
            name: "",
            class: "",
            inner_html: "",
            cssText: "",
            attr:"data-is-code-element",
            img: undefined,
            imgKey:undefined,
            blog_id:0
            };
        const css_row="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:0rem;width:100%;position:relative;min-height:15vh;max-width:800px;background-color:black;color:white;padding-inline:1rem;border-radius:12px;font-size:20px;line-height:2rem;margin-block:3rem;overflow-x:scroll;";
        this.initTypes=["Java","JSON","Python","HTML"]
        this._codeElements=Array.from(Array(4).keys()).map(num=>{
            return {...this.element,type:this.initTypes[num],name:"div",class:this.initTypes[num],cssText:css_row}
        });

    }
    ///-----------------GETTERS/SETTERS-----------------///
    get element(){
        return this._element;
    }
    set element(element:elementType){
        this._element=element;
    }
    get elements(){
        return this._modSelector.elements;
    }
    set elements(elements:elementType[]){
        this._modSelector.elements=elements;
        this._modSelector.localStore({blog:this._modSelector.blog});
    }
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

    ///-----------------GETTERS/SETTERS-----------------///
    cleanCodeElement({injector,element,idValues}:{injector:HTMLElement,element:elementType,idValues:idValueType[]}){
        this.main({injector,element,isNew:false,isClean:true,idValues});

    }
    codeTemplate({injector,idValues}:{injector:HTMLElement,idValues:idValueType[]}) {
         
         let count=0
        const container = document.createElement("section");
        injector.classList.add("position-relative");
        container.id="codeContainer";
        container.className = "mx-auto my-5 d-flex w-100 flex-wrap justify-content-center align-items-center justify-content-spaced-between position-relative;margin-block:2rem;";
        container.style.cssText="margin-block:1rem;";
        const btncolors=[{bg:"black",color:"white"},{bg:"yellow",color:"black"},{bg:"maroon",color:"white"},{bg:"lightblue",color:"black"}]
        injector.appendChild(container);
        this._codeElements.forEach((code,index) => {
            const {button}=Misc.simpleButton({anchor:container,bg:btncolors[index].bg,color:btncolors[index].color,type:"button",time:400,text:code.type as string});
            Misc.slideIn({anchor:button,xpos:50,ypos:0,time:1000});
            button.onclick=(e:MouseEvent)=>{
                if(e){
                    count++
                    this.element=code as elementType;
                    //ADDING NEW element TO elementS FOR BLOG.CODES
                    const rand=Math.round(Math.random()*1000);
                    const len=this.elements.length;
                    const eleId=(this.element.type ? this.element.type :"java") + String(rand);
                    this.element={...this.element,id:len,eleId:eleId,placement:this.placement,class:`language-${this.element.type}`};
                    //ABOVE:  ADDING NEW element TO elementS FOR BLOG.CODES
                    this.main({injector,element:this.element,isNew:true,isClean:false,idValues})
                    injector.removeChild(container);
                    Misc.fadeIn({anchor:container,xpos:50,ypos:100,time:400});
                    

                }
            };
            
        });
    }

    main({injector,element,isNew,isClean,idValues}:{
        injector:HTMLElement,
        element:elementType,
        isNew:boolean,
        isClean:boolean,
        idValues:idValueType[]

    }){
       
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        Header.cleanUpByID(injector,`main-container-${element.type ? element.type : "not-assigned"}`);
        injector.style.position="relative;"
        const container=document.createElement("div");
        container.id=`main-container-${element.type ? element.type : "not-assigned"}`
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:0rem";
        container.style.cssText=css_col + "box-shadow:1px 1px 12px 1px blue;background-color:black;color:white;min-height:15vh;border-radius:12px;max-width:800px;position:relative;width:100%;margin-block:2rem;";
        container.style.paddingInline=less900 ?(less400 ? "0.25rem":"0.5rem"):"1rem";
        const divCont=document.createElement("div");
        divCont.className="eleContainer";
        divCont.style.cssText=css_col + " min-height:20vh;position:relative;width:100%;";
        divCont.style.paddingInline=less900 ? (less400 ? "0rem":"0.75rem"):"1rem";
        divCont.style.paddingBlock="1rem";
        divCont.style.width="100%";
        divCont.style.maxWidth=less900 ? (less400 ? "375px" : "700px"):"800px";
        divCont.style.background="black";
        divCont.style.color="white";
        divCont.id=`divCont-${element.name}-${element.id ? element.id :0}`;
        this.divTarget({parent:injector,container,divCont:divCont,isNew,isClean,element,css_col,idValues});
        container.appendChild(divCont);
        injector.appendChild(container);

    };


    divTarget({parent,container,divCont,element,isNew,css_col,isClean,idValues}:{
        parent:HTMLElement;
        container:HTMLElement;
        divCont:HTMLElement;
        element:elementType;
        isNew:boolean;
        isClean:boolean;
        css_col:string;
        idValues:idValueType[];
       
    }){
        
        const less900= window.innerWidth < 900;
        ////-------TARGET--------//
        //PARENT==INJECTOR
        const css_row="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:0rem;width:100%;";
        const target=document.createElement("div");
        target.setAttribute("data-is-code-element","true");
        target.setAttribute("name",element.name);
        target.setAttribute("type",element.type ? element.type :"no-type");
        target.setAttribute("is-element","true");
        target.id=element.eleId
        target.className=element.class
        target.style.cssText=element.cssText;
        target.style.background="black";
            target.style.color="white";
        if(isNew){
            ////////////////--------PRE (keeps spacing)--------------------////
            const pre=document.createElement("pre");
            pre.id=`pre`;
            pre.className="pre-element";
            pre.setAttribute("contenteditable","true");
            pre.textContent="comments=>//enter your code... with a period(.) at the end";
            pre.style.cssText="width:100%;text-wrap:pretty;overflow-x:scroll;"
            pre.style.width="100%";
            pre.style.overflowX=less900 ? "scroll":"hidden";
            target.appendChild(pre);
            this._modSelector.elementAdder({target,sel:null,rowEle:null,colEle:null,idValues}).then(async(res)=>{
                if(res){
                    const ele=res.ele as elementType
                    divCont.setAttribute("data-placement",`${ele.placement}-A`);
                }
            });
            
            ////////////////--------PRE (keeps spacing)--------------------////
            
        }else{
            target.id=element.eleId;
            target.style.cssText=element.cssText;
            target.className=element.class;
            target.innerHTML=element.inner_html;
            target.style.backgroundColor="black";
            target.style.color="white";
            target.setAttribute("data-is-code-element","true");
            target.setAttribute("is-element","true");
            divCont.setAttribute("data-placement",`${element.placement}-A`);
            const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                target,sel:null,
                row:null,
                col:null,
                ele:element,
                idValues,
                loc:"htmlElement",
                level:"element",
                clean:false

            });
            idValues=retIdValues;
            const getPre=target.querySelector("pre#pre") as HTMLElement;
            if(!getPre){
                Misc.message({parent,msg:"your code is empty",type_:"error",time:1300});
            }else{
                const check=([...getPre.children as any] as HTMLElement[]).map(child=>(child.nodeName)).includes("DIV");
                if(!check){
                    const div=document.createElement("div");
                    div.textContent="document.querySelector('p') \r // write your code\r";
                    getPre.appendChild(div);
                }
            }
        }
        divCont.onclick=(e:MouseEvent)=>{
            if(e){
                divCont.classList.toggle("isActive");
                //not target because of toolbar influence
            }
        };
        this.titleContainer({divCont,target,element,css_col,isNew,isClean});
        divCont.appendChild(target)
        if(!isClean){
            this.removeMainElement({parent,container,divCont,target,idValues});
            divCont.onclick=(e:MouseEvent)=>{
                if(e){
                    const check=([...target.classList as any] as string[]).includes("isActive");
                    if(!check){
                        divCont.classList.add("isActive");
                        target.classList.add("isActive");
                    }else{
                        divCont.classList.remove("isActive");
                        target.classList.remove("isActive");
                    }
                }
            };
            const btnContainer=document.createElement("div");
            btnContainer.id="divTarget-divCont-btnCntainer";
            btnContainer.style.cssText=css_row + "position:absolute;top:95%;";
            Header.cleanUpByID(divCont,"colorCreator-btn");
            const {button:addColor}=Misc.simpleButton({anchor:btnContainer,type:"button",text:"add-color",bg:Nav.btnColor,color:"white",time:400});
            addColor.id="colorCreator-btn";
            const {button:save}=Misc.simpleButton({anchor:btnContainer,type:"button",text:"save",bg:Nav.btnColor,color:"green",time:400});
            save.id="save-btn";
            divCont.appendChild(btnContainer);
            addColor.onclick=(e:MouseEvent)=>{
                if(e){
                    const regArrType=this.regArrs.find(reg=>(reg.name==element.type));
                    if(!regArrType) return;
                    const regArr=regArrType.regArr;
                    this.colorCreator({target,regArr,isClean});
                }
            };
            save.onclick=(e:MouseEvent)=>{
                if(e){
                    const getTarget=divCont.querySelector(`div#${element.eleId}`) as HTMLElement;
                    if(!getTarget) {
                        Misc.message({parent:divCont,type_:"error",msg:"could not find target",time:1200});
                    }else{
                        this._modSelector.updateElement({target:getTarget,idValues,selRowCol:null}).then(async(res)=>{
                            if(res){
                                const ele= res.ele as elementType
                                Misc.message({parent:divCont,type_:`success`,time:2000,msg:`${ele.eleId} is updated to local`});
                            }
                        });
                    };
    
                }
            };
        }else{
            //REMOVING CONTENTEDITABLE
            const getPre=target.querySelector("pre#pre") as HTMLElement;
            if(!getPre) return;
            getPre.removeAttribute("contenteditable");
            getPre.style.overflowX=less900 ? "scroll":"hidden";
        }
        ////-------TARGET--------//
    }

    colorCreator(item:{target:HTMLElement,regArr:regJavaType[],isClean:boolean}){
        const {target,regArr,isClean}=item;
        const less900=window.innerWidth < 900;
        const type=target.getAttribute("type");
        const getPre=target.querySelector("pre#pre") as HTMLPreElement;
        if(isClean && getPre){
            getPre.removeAttribute("contenteditable");
            getPre.style.overflowX=less900 ? "scroll":"hidden";
        }
        if(type && type !=="HTML"){

            this.matchInsert({pre:getPre,regArr}).then(async(res)=>{
                if(res){
                    // console.log("matchInsert",res.arrCatch)
                    this.showColor({childs:res.childs,arrCatch:res.arrCatch})
                }
            });
        }else{
            this.matchHtmlInsert({pre:getPre,regArr}).then(async(res)=>{
                if(res){
                    // console.log("matchInsert",res.arrCatch)
                    this.showColor({childs:res.childs,arrCatch:res.arrCatch})
                }
            });
        }
    }
    matchInsert(item:{pre:HTMLPreElement,regArr:regJavaType[]}):Promise<{childs:HTMLElement[],arrCatch:arrCatchType[]}>{
        //THIS ADDS COLOR TO THE CODE for each line.
        const {pre,regArr}=item;
        const arrCatch:arrCatchType[]=[]
        const childs=([...pre.children as any] as HTMLElement[])
        if(pre){
            childs.map((child,index)=>{
                    if(child){
                        child.id="innerPre-" + String(index);
                        child.style.cssText="width:100%;text-wrap:pretty;";
                        // console.log(child.textContent)//works
                        regArr.map(reg=>{
                            const matches=(child.textContent as string).matchAll(reg.searchwd) as any;
                            for( const match of matches){
                                // console.log("match",match)
                                if( match[0]){
                                    //FILLING ARRCATCH ARRAY WITH REPLACEMENTS
                                    const end=match.index + match[0].length
                                    const start=match.index;
                                    const word=match[0];
                                    const replace=reg.replacewd(match[0]);
                                    // console.log("arrcatch.replace",replace)
                                    arrCatch.push({id:child.id,start,end,word,replace,index:index,isAncClose:false});
                                }
                            }
                        });
                    }
                }); 
                // console.log("arrCatch",arrCatch)   
        }
        return Promise.resolve({childs,arrCatch}) as Promise<{childs:HTMLElement[],arrCatch:arrCatchType[]}>;
    }
    matchHtmlInsert(item:{pre:HTMLPreElement,regArr:regJavaType[]}):Promise<{childs:HTMLElement[],arrCatch:arrCatchType[]}>{
        //THIS IS USERDINDIVIDUALLY @ DisplayBlog: THIS ADDS COLOR TO THE CODE
        const {pre,regArr}=item;
        // console.log("replaceText",replaceText);//sends once
        const arrCatch:arrCatchType[]=[]
        const childs=([...pre.children as any] as HTMLElement[]);
        childs.map((child,index)=>{
            if(child?.textContent){
                child.id="innerPre-html-" + String(index);
                const child_=child.textContent as string;
                regArr.map(reg=>{
                    const matches=child_.matchAll(reg.searchwd) as any;
                    if(!matches) return;
                    if(reg.text==="html"){
                        child.classList.add("language-html");
                    }else if(reg.text==="xml"){
                        child.classList.add("language-xml");
                    }
                    let count=0;
                 
                    for( const match of matches){
                        if(match){
                            // console.log(match)
                            const end=match.index + match[0].length
                            const start=match.index;
                            const {word,isAncClose}=this.getWord({match});
                            if(!(word))return;
                            const replace=reg.replacewd(word)
                            if(replace){
                                arrCatch.push({id:child.id,start,end,word,replace,index,isAncClose})
                            }
                        }
                        count++;
                    }
                });
            }
        });
        // console.log("arrCatch",arrCatch)
        return Promise.resolve({childs,arrCatch}) as Promise<{childs:HTMLElement[],arrCatch:arrCatchType[]}>;
    }
    getWord(item:{match:string[]}):{word:string|undefined,isAncClose:boolean}{
        const {match}=item;
        let retStr:string="";
        let isAnchorClose:boolean=false;
        const lt:{name:string,reg:RegExp}={name:"lt",reg:/</};
        const gt:{name:string,reg:RegExp}={name:"gt",reg:/>/};
        const sl:{name:string,reg:RegExp}={name:"sl",reg:/\//};
        const regClose:RegExp=/<\//;
        [lt,gt,sl].map((reg,index)=>{
            if(match[index] && match[index] !=="undefined"){
                if(regClose.test(match[index])){
                    isAnchorClose=true;
                }
                const isFalse=reg.reg.test(match[index]);
                if(isFalse) return;
                retStr=match[index]
            }
        });
        return {word:retStr,isAncClose:isAnchorClose};
    };
    showColor(item:{childs:HTMLElement[],arrCatch:arrCatchType[]}){
        const {childs,arrCatch}=item;
        childs.map((child,index)=>{
            if(child){
                arrCatch.toSorted((a,b)=>{if(a.index < b.index) return -1;return 1}).map(cat=>{
                    //REPLACING WRITTEN TEXT WITH COLOR
                    if(cat.id===child.id && cat.index===index){
                        child.innerHTML=(child.textContent as string).replace(cat.word,cat.replace);
                    }
                    // console.log(replaceText)//SENDS A WORD AT A TIME
                    // console.log("335:showColor",child.innerHTML)
                });
            }
        });
    }
    titleContainer(item:{divCont:HTMLElement,target:HTMLElement,element:elementType,css_col:string,isNew:boolean,isClean:boolean}){
        const {divCont,target,element,css_col,isNew,isClean}=item;
        
       
        Header.cleanUpByID(target,"imgDiv");
        Header.cleanUpByID(divCont,"titleContainer-titleCont");
        const title=document.createElement("h5");
        const titleCont=document.createElement("div");
        titleCont.id="titleContainer-titleCont";
        titleCont.style.cssText=css_col + "align-items:center;";
        title.textContent=element.type ? element.type : "";
        title.className="text-center text-primary mb-2 mx-auto";
        const subTitle=document.createElement("h6");
        subTitle.id=`title-${element.type ? element.type : "notAssigned"}-subtitle`;
        subTitle.style.cssText="text-center text-primary mb-2 mx-auto";
        subTitle.textContent=" add your code below: user refresh to give color";
        const imgDive=document.createElement("div");
        imgDive.id="imgDiv";
        imgDive.style.cssText="display:block;position:absolute;top:-50px;right:-40px;z-index:20;";
        imgDive.style.transform="translate(0px,-10px)";
        imgDive.style.right="0px";
        const xDiv=document.createElement("div");
        xDiv.id="titleContainer-xDiv";
        xDiv.style.cssText="padding:1rem;max-width:75px;border-radius:25%;background-color:black;color:white;display:flex;justify-content:center;align-items:center;gap:1rem;position:relative;z-index:20;box-shadow:1px 1px 12px 1px black;";
        imgDive.style.transform="translate(0px,0px)";
        const span=document.createElement("span");
        span.style.cssText="margin-inline:auto;position:absolute;top:100%;left:0%;transform:translate(15px,-20px);z-index:60;color:white;"
        span.textContent=element.type ? element.type :"Code";
        if(element?.type){
            
            if(element.type==="Java"){
                FaCreate({parent:xDiv,name:RiJavascriptFill,cssStyle:{fontSize:"40px",margin:"auto"}});
                xDiv.style.color="yellow";
            }else if(element.type==="Python"){
                FaCreate({parent:xDiv,name:FaPython,cssStyle:{fontSize:"40px",margin:"auto"}});
            }else if(element.type==="JSON"){
                FaCreate({parent:xDiv,name:TbJson,cssStyle:{fontSize:"40px",margin:"auto"}});
            }else if(element.type==="HTML"){
                FaCreate({parent:xDiv,name:FaHtml5,cssStyle:{fontSize:"40px",margin:"auto"}});
            }
        }
        titleCont.appendChild(title);
        titleCont.appendChild(subTitle);
        if(isNew && !isClean){
            divCont.appendChild(titleCont);
            imgDive.appendChild(span);
        }
        imgDive.appendChild(xDiv);
        target.appendChild(imgDive);
    }
    promRemoveElement(target:HTMLElement){
        return Promise.resolve(this.removeElement(target)) as Promise<elementType|undefined>;
    }
    removeElement(target:HTMLElement):elementType|undefined{
        let ele_:elementType|undefined;
        this._modSelector.elements.map((ele,index)=>{
                if(ele.eleId===target.id){
                    this._modSelector.elements.splice(index,1);
                    ele_= ele;
                }
        });
        return ele_
    };


    removeMainElement(item:{parent:HTMLElement,container:HTMLElement,divCont:HTMLElement,target:HTMLElement,idValues:idValueType[]}){
        const {parent,container,divCont,target,idValues}=item;
        Header.cleanUpByID(parent,"xIconDiv-" + container.id);
        const css="position:absolute;transform:translate(10px,26px);background:white;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:red;top:0%;left:0%;z-index:10;";
        divCont.classList.add("position-relative");
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("contenteditable","false");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.className="xIconDiv";
        xIconDiv.id=`xIconDiv-${container.id}`;
        xIconDiv.style.cssText=`${css}`;
        const cssStyle={background:"white",fontSize:"red"};
        FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
        divCont.appendChild(xIconDiv);
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this._modSelector.removeElement({target,idValues,selRowCol:null}).then(async(res)=>{
                    if(res){
                        this._modSelector.shiftPlace(res.placement);///REINDEX PLACEMENT!!!!
                        Misc.message({parent,msg:"deleted",type_:"success",time:800});
                    }
                });
                Misc.fadeOut({anchor:container,xpos:100,ypos:100,time:500});
                setTimeout(()=>{
                    parent.removeChild(container);
                },480);
            }
        });
        
    }
}
export default CodeElement;
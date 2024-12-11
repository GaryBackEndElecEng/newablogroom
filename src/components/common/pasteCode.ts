import {FaCrosshairs,FaPython, FaHtml5, FaJava} from "react-icons/fa";
import { TbJson } from "react-icons/tb";
import { RiJavascriptFill } from "react-icons/ri";
import ModSelector from "../editor/modSelector";
import { elementType, userType } from "../editor/Types";
import Misc from "./misc";
import { FaCreate } from "./ReactIcons";
import Service from "./services";
import Header from "../editor/header";
import { SiJson } from "react-icons/si";
import User from "../user/userMain";


class PasteCode{
    _element:elementType;
    _type:"Java"|"Python"|"JSON"|"HTML";
    typeArr:string[];
    constructor(private _modSelector:ModSelector,private _service:Service){

        this._element={
            id:0,
            placement:0,
            selectorId:undefined,
            eleId: `paste-code-${Math.round(Math.random()*1000)}`,
            name: "div",
            class: "d-flex flex-column align-items-center",
            inner_html: "",
            cssText: "padding:0rem;width:100%;margin-inline:0rem;min-height:40vh;border-radius:12px;padding:1rem;",
            attr:"data-is-code-paste",
            img: undefined,
            imgKey:undefined,
            blog_id:0,
            type:"Java"
            };
            this.typeArr=["select","Java","Python","HTML","JSON"]
    };
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
    showClean(item:{divCont:HTMLElement,target:HTMLElement,element:elementType}){
            const {divCont,target,element}=item;
            const less900= window.innerWidth < 900;
            const less400= window.innerWidth < 400;
            ////-------TARGET--------//
            //PARENT==INJECTOR
            const css_col="margin-inline:auto;display:flex;flex-wrap:wrap;flex-direction:column;justify-content:center;align-items:center;gap:0rem;width:100%;max-width:800px;";
            divCont.id="pasterCode-main-divCont";
            divCont.className="eleContainer";
            divCont.style.cssText=css_col;
            divCont.style.padding="1rem";
            divCont.style.paddingInline=less900 ? (less400 ? "0rem":"0.5rem") :"1rem";
            target.setAttribute("data-is-code-paste","true");
            target.setAttribute("name",element.name);
            target.setAttribute("type",element.type ? element.type :"no-type");
            target.setAttribute("is-element","true");
            target.setAttribute("type",element.type ? element.type:"Java");
            target.id=element.eleId
            target.className=element.class
            target.innerHTML=element.inner_html;
            target.style.cssText=element.cssText;
            target.style.paddingInline=less900 ? (less400 ? "0.25rem":"0.5rem"):"1rem";
            target.style.background="black";
            target.style.color="white";
            divCont.classList.remove("isActive");
            const getPre=target.querySelector(`pre#pre`) as HTMLElement;
            if(!getPre) return;
                getPre.style.padding=less900 ? (less400 ? "0.25rem":"0.5rem"):"1rem";
                    getPre.setAttribute("spellcheck","false");
                    getPre.setAttribute("is-element","true");
                    getPre.classList.remove("isActive");
                    getPre.removeAttribute("contenteditable");
                
            // parent.appendChild(divCont);
            
            Misc.growIn({anchor:divCont,scale:0,opacity:0,time:400});
    }
    initPasteCode(item:{injector:HTMLElement}){
        const {injector}=item;
        this.main({parent:injector,element:this.element,isNew:true,isClean:false});
    }
    main(item:{parent:HTMLElement,element:elementType,isNew:boolean,isClean:boolean}){
        const {parent,isNew,isClean,element}=item;
        const less900= window.innerWidth < 900;
        const less400= window.innerWidth < 400;
        ////-------TARGET--------//
        //PARENT==INJECTOR
        const css_col="margin-inline:auto;display:flex;flex-wrap:wrap;flex-direction:column;justify-content:center;align-items:center;gap:0rem;width:100%;max-width:800px;";
        const divCont=document.createElement("div");
        divCont.id="pasterCode-main-divCont";
        divCont.className="eleContainer";
        divCont.style.cssText=css_col;
        divCont.style.padding="1rem";
        divCont.style.paddingInline=less900 ? (less400 ? "0rem":"0.5rem") :"1rem";
        const target=document.createElement("div");
        target.setAttribute("data-is-code-paste","true");
        target.setAttribute("name",element.name);
        target.setAttribute("type",element.type ? element.type :"no-type");
        target.setAttribute("is-element","true");
        target.setAttribute("type",element.type ? element.type:"Java");
        target.id=element.eleId
        target.className=element.class
        target.innerHTML=element.inner_html;
        target.style.cssText=element.cssText;
        target.style.paddingInline=less900 ? (less400 ? "0.25rem":"0.5rem"):"1rem";
        target.style.background="black";
            target.style.color="white";
            if(isNew){
                const rand=`paste-code-${Math.round(Math.random()*1000)}`
                this._element={...element,eleId:rand}
                target.id=rand;
                ////////////////--------PRE (keeps spacing)--------------------////
                const pre=document.createElement("pre");
                pre.id=`pre`;
                pre.className="pre-element";
                pre.setAttribute("contenteditable","true");
                pre.setAttribute("is-element","true");
                pre.textContent="paste your code";
                pre.style.cssText="width:100%;text-wrap:pretty;overflow-x:scroll;font-size:inherit;";
                pre.style.padding=less900 ? (less400 ? "0.25rem":"0.5rem"):"1rem";
                pre.style.width="100%";
                pre.style.overflowX="scroll";
                pre.setAttribute("spellcheck","false");
                target.appendChild(pre);
                this.typeOPtion({parent:target,typeArr:this.typeArr}).then(async(res_)=>{
                    if(res_){
                        res_.select.onchange=(e:Event)=>{
                            if(e){
                                const value=(e.currentTarget as HTMLSelectElement).value;
                                // do smething
                                this.postImage({parent:target,value});
                                this.element={...this.element,type:value};
                                pre.classList.add(`language-${value.toLowerCase()}`);
                                target.classList.add(`language-${value.toLowerCase()}`);
                                target.setAttribute("type",`language-${value}`);
                                Misc.growOut({anchor:res_.container,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    target.removeChild(res_.container);
                                },390);
                                this._modSelector.promElementAdder(target).then(async(res)=>{
                                    if(res){
                                        const ele=res.ele as elementType;
                                        divCont.setAttribute("data-placement",`${ele.placement}-A`);
                                        this.editElement(target);
                                        this.removeMainElement({parent,divCont,target})
                                        divCont.onclick=(e:MouseEvent)=>{
                                            if(e){
                                                divCont.classList.toggle("isActive");
                                                target.classList.toggle("isActive");
                                                const getPre=target.querySelector("pre#pre") as HTMLElement;
                                                if(!getPre) return;
                                                    getPre.classList.toggle("isActive");
                                                    getPre.setAttribute("contenteditable","true")
                                                    
                                            }
                                        };
                                    }
                                });
                            }
                        };
                    }
                });
                
                ////////////////--------PRE (keeps spacing)--------------------////
                
            }else if(!isNew && !isClean){
                divCont.setAttribute("data-placement",`${element.placement}-A`);
                const getPre=target.querySelector(`pre#pre`) as HTMLElement;
                if(!getPre){
                    Misc.message({parent,msg:"your code pasted is empty",type_:"error",time:1300});
                }else{
                    getPre.style.padding=less900 ? (less400 ? "0.25rem":"0.5rem"):"1rem";
                    getPre.setAttribute("spellcheck","false");
                    getPre.setAttribute("is-element","true");
                    getPre.setAttribute("contenteditable","true")
                    divCont.onclick=(e:MouseEvent)=>{
                        if(e){
                            divCont.classList.toggle("isActive");
                            if(!getPre) return;
                                getPre.setAttribute("spellcheck","false");
                                getPre.setAttribute("is-element","true");
                                getPre.classList.toggle("isActive");
                                getPre.setAttribute("contenteditable","true")
                                
                        }
                    };
                this.removeMainElement({parent,divCont,target});
                this.editElement(target);
                }
            }else if(isClean){

                divCont.classList.remove("isActive");
                const getPre=target.querySelector(`pre#pre`) as HTMLElement;
                if(!getPre) return;
                    getPre.style.padding=less900 ? (less400 ? "0.25rem":"0.5rem"):"1rem";
                     getPre.setAttribute("spellcheck","false");
                     getPre.setAttribute("is-element","true");
                     getPre.classList.remove("isActive");
                     getPre.removeAttribute("contenteditable");
            }
            divCont.appendChild(target);
            parent.appendChild(divCont);
            
            Misc.growIn({anchor:divCont,scale:0,opacity:0,time:400});
    }
   async typeOPtion(item:{parent:HTMLElement,typeArr:string[]}):Promise<{select:HTMLSelectElement,container:HTMLElement}>{
        const {parent,typeArr}=item;
        const container=document.createElement("div");
        container.id="typeOption-popup-container";
        container.style.cssText="margin-inline:auto;min-height:5vh;background:white;color:black;border-radius:12px;display:flex;flex-direction:column;align-items:center;padding:0.5rem;width:100%;";
        const select=document.createElement("select");
        select.id="container-select";
        select.style.cssText="margin:aut0;";
        container.appendChild(select);
        parent.appendChild(container);
        select.selectedIndex=0;
        typeArr.map((type,index)=>{
            const option=document.createElement("option");
            option.value=type;
            option.textContent=type;
            select.appendChild(option);
        });
        return new Promise(resolver=>{
            resolver({select,container})
        }) as Promise<{select:HTMLSelectElement,container:HTMLElement}>;

    }
    postImage(item:{parent:HTMLElement,value:string}){
        const {parent,value}=item;
        parent.style.position="relative";
        const container=document.createElement("div");
        container.id=`image-code-pick-${value}`;
        container.style.cssText="position:absolute;top:0%;left:0%;display:flex;justify-content:center;align-items:center;padding:0.25rem;z-index:2;background-color:black;border-radius:50%;";
        container.style.transform="translate(-10px,-10px)";
        parent.appendChild(container);
        switch(true){
            case value==="Java":
               FaCreate({parent:container,name:FaJava,cssStyle:{color:"yellow",fontSize:"26px"}});
            return;
            case value==="Python":
                FaCreate({parent:container,name:FaPython,cssStyle:{color:"green",fontSize:"26px"}});
            return;
            case value==="HTML":
                FaCreate({parent:container,name:FaHtml5,cssStyle:{color:"blue",fontSize:"26px"}});
            return;
            case value==="JSON":
                FaCreate({parent:container,name:TbJson,cssStyle:{color:"yellow",fontSize:"26px"}});
            return;
            default:
            return;
        }
    }
    removeMainElement(item:{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement}){
        const {parent,divCont,target}=item;
        const css="position:absolute;transform:translate(10px,26px);background:white;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:red;top:0%;left:95%;z-index:10;";
        divCont.classList.add("position-relative");
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("contenteditable","false");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.className="xIconDiv";
        xIconDiv.id=`xIconDiv-${divCont.id}`;
        xIconDiv.style.cssText=`${css}`;
        xIconDiv.style.transform="translate(0px,20px)";
        const cssStyle={background:"white",fontSize:"red"};
        FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
        divCont.appendChild(xIconDiv);
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.promRemoveElement(target).then(async(res)=>{
                    if(res){
                        this._modSelector.elements=this._modSelector._elements;
                        this._modSelector.shiftPlace(res.placement);///REINDEX PLACEMENT!!!!
                        Misc.message({parent,msg:"deleted",type_:"success",time:800});
                    }
                });
                Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:500});
                setTimeout(()=>{
                    parent.removeChild(divCont);
                },480);
            }
        });
        
    };
    promRemoveElement(target:HTMLElement){
        return new Promise((resolve)=>{
            resolve(this.removeElement(target));
        }) as Promise<elementType|undefined>;
    };
    removeElement(target:HTMLElement):elementType|undefined{
        let ele_:elementType|undefined;
        this._modSelector._elements.map((ele,index)=>{
                if(ele.eleId===target.id){
                    this._modSelector._elements.splice(index,1);
                    ele_= ele;
                }
        });
        return ele_
    };
    editElement(target:HTMLElement){
        const getPre=target.querySelector(`pre#pre`) as HTMLElement;
        if(!getPre) return;
        target.addEventListener("input",(e:Event)=>{
            if(e){
                this.elements=this._modSelector._elements.map(ele=>{
                if(ele.eleId===target.id){
                    console.log(target.style.cssText);
                    ele.cssText=target.style.cssText;
                    ele.class=target.className;
                    ele.inner_html=target.innerHTML;
                }
                    return ele;
                });
                    // console.log("953:modSelector:editElement",this.selectors)//works
            }
        });
    }
    updateElement(target:HTMLElement){
        const getPre=target.querySelector(`pre#pre`) as HTMLElement;
        if(!getPre) return;
        target.onchange=(e:Event)=>{
           
            if(e){
                this.elements=this._modSelector._elements.map(ele=>{
                if(ele.eleId===target.id){
                    console.log(target.style.cssText);
                    ele.cssText=target.style.cssText;
                    ele.inner_html=target.innerHTML;
                }
                    return ele;
                });
                    // console.log("953:modSelector:editElement",this.selectors)//works
            }
        };
    }
    
   

    
}
export default PasteCode;


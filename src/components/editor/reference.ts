import Misc from "../common/misc";
import Header from "./header";
import Nav from "../nav/headerNav";
import ModSelector from "./modSelector";
import { arrDivContType, colType, element_selType, elementType,  rowType, selectorType } from "./Types";
import { FaCreate } from "../common/ReactIcons";
import { FaCrosshairs } from "react-icons/fa";
import { idEnumType, idValueType,  selRowColType, typeEnumType } from "@/lib/attributeTypes";
import { attrEnumArr,  IDKeyValuepairs, typeEnumArr } from "../common/lists";


export type arrLinkType={
    id:string,
    name:string,
    link:string
}

class Reference{
    _arrLinks:arrLinkType[];
    _element:elementType;
    _elementSel:element_selType;
    constructor(private _modSelector:ModSelector){
        this._arrLinks=[];
    };

    ///----GETTERS SETTERS----/////
    get arrLinks(){
        return this._arrLinks;
    }
    set arrLinks(arrLinks:arrLinkType[]){
        this._arrLinks=arrLinks;
    };

    get element(){
        return this._element;
    };
    set element(element:elementType){
        this._element=element;
    };
    get elementSel(){
        return this._elementSel;
    };
    set elementSel(elementSel:element_selType){
        this._elementSel=elementSel;
    };

    get elements(){
        return this._modSelector.elements;
    };
    set elements(elements:elementType[]){
        this._modSelector.elements=elements;
    };

    showCleanLinks({parent,ele,idValues}:{parent:HTMLElement,ele:elementType,idValues:idValueType[]}){
        
        Header.cleanUpByID(parent,ele.eleId);
        const eleId=ele.eleId;
        const divCont=document.createElement("div");
        this._modSelector.dataset.insertcssClassIntoComponents({
            target:divCont,
            level:"element",
            headerType:undefined,
            id:"clean",
            loc:"htmlElement",
            type:"reference"

        });
        const target=document.createElement("div");
        target.id=ele.eleId;
        target.style.cssText=ele.cssText;
        target.className=ele.class;
        target.innerHTML=ele.inner_html;
        this.getArrLinks(target);
        target.setAttribute("is-element","true");
        target.setAttribute("name","div");
        target.setAttribute("data-reference",ele.attr as string);
        idValues.push({eleId,id:"reference",attValue:"reference"});
        idValues.push({eleId,id:"isReference",attValue:"isReference"});
        idValues.push({eleId,id:"isElement",attValue:"true"});
        this._modSelector.dataset.populateElement({target,level:"element",loc:"htmlElement",idValues,selRowColEle:ele,clean:true});
        const arrLinks=this.getArrLinks(target)
        if(arrLinks && arrLinks.length>0){
            arrLinks.map(link_=>{
                if(link_){
                    const getAnchor=target.querySelector(`a#${link_.id}`) as HTMLElement;
                    if(getAnchor){
                        (getAnchor as HTMLElement).onclick=(e:MouseEvent)=>{
                            if(e){
                                window.open(link_.link,"_blank");
                            }
                        }
                    }
                }
            });
        }
        divCont.appendChild(target);
        const arrDivCont:arrDivContType={divCont,placement:ele.placement,target,isNormal:false,ele,chart:null,sel:null};
        return arrDivCont
    };

    showLinks({parent,ele,idValues,sel,rowEle,colEle,isHtmlElement}:{
        parent:HTMLElement,
        ele:elementType | element_selType,
        idValues:idValueType[],
        isHtmlElement:boolean,
        sel:selectorType|null,
        rowEle:rowType|null,
        colEle:colType|null

    }):arrDivContType{
        const isFlexbox=sel!==null && rowEle!==null && colEle!=null;
        const selRowCol=isFlexbox ? {selectorId:sel.eleId,rowId:rowEle.eleId,colId:colEle.eleId}: null;
        const css="display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;gap:1.25rem;";
        const divCont=document.createElement("div");
        divCont.style.cssText=css;
        if(isHtmlElement){
            this._modSelector.dataset.insertcssClassIntoComponents({target:divCont,level:"element",headerType:undefined,id:"divContId",loc:"htmlElement",type:"reference"});
            const dataMsg="Upon updating links,the links will be re-slotted to the end of the document automatically to maintain document organization.";
            divCont.setAttribute("data-msg",dataMsg);
            divCont.className="preference-eleContainer";
        }else{
            this._modSelector.dataset.insertcssClassIntoComponents({target:divCont,level:"element",headerType:undefined,id:"divContId",loc:"flexbox",type:"reference"});
            divCont.className="preference-eleContainer-footer";
        }
        const target=document.createElement("div");
        target.id="reference-link-container";//data-href-reference
        target.style.cssText=ele.cssText;
        target.className=ele.class;
        target.innerHTML=ele.inner_html;
        target.setAttribute("is-element","true");
        if(isFlexbox) divCont.setAttribute("data-placement",`${(ele as element_selType).order}-A`);
        else divCont.setAttribute("data-placement",`${(ele as elementType).placement}-A`);
        target.innerHTML=ele.inner_html;//dumps the links: <target><ol>arr.map=>(<li><a>)
        divCont.appendChild(target);
        const links= this.getArrLinks(target);
       
        const {button:update}=Misc.simpleButton({anchor:divCont,bg:Nav.btnColor,color:"green",type:"button",time:400,text:"update links"});
        update.onclick=(e:MouseEvent)=>{
            if(e){
                const arrLink= this._arrLinks || links || undefined
                if(arrLink){
                    this.updateLinks({parent,target,arrLink:arrLink,idValues,isHtmlElement,updateBtn:update,selRowCol})

                }
            }
        };
        divCont.onclick=(e:MouseEvent)=>{
            if(e){
                if(([...divCont.classList as any] as string[]).includes("isActive")){

                    this.removeMainElement({parent,divCont,target,sel,rowEle,colEle,idValues});
                }
                divCont.classList.toggle("isActive");
                target.classList.toggle("isActive");
               
            }
        };
        
        
        ele=ele as elementType
           const arrDivCont={divCont,placement:ele.placement,target,ele,isNormal:false,chart:null,sel:null} as arrDivContType
            return arrDivCont
    };




    main({parent,idValues}:{parent:HTMLElement,idValues:idValueType[]}){
        
        const css="display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;gap:1.25rem;";
        const container=document.createElement("div");
        container.id="reference-form-container";
        container.style.cssText=css + "width:100%;box-shadow:1px 1px 12px 1px black;";
        const text=document.createElement("h6");
        text.textContent="Reference list adder";
        text.className="text-center text-primary lean display-6 my-2 mb-3";
        container.appendChild(text);
        parent.appendChild(container);
        this.form({parent,container,idValues,sel:null,rowEle:null,colEle:null,isHtmlElement:true});

    };
    footerLinks({column,sel,rowEle,colEle,idValues}:{column:HTMLElement,sel:selectorType,rowEle:rowType,colEle:colType,idValues:idValueType[]}){
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const inset="0%";
        const css_col="display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;gap:1.25rem;";
        const css_popup=`position:absolute;inset:${inset};width:clamp(320px,700px,900px);box-shadow:1px 1px 12px 1px black;background-color:white;z-index:100;`
        const container=document.createElement("div");
        container.id="reference-form-container-popup";
        container.style.cssText=css_col + css_popup;
        container.style.transform=less900 ? (less400 ? "translateY(-500%)":"translateY(-400%)"):"translateY(-450%)";
        const text=document.createElement("h6");
        text.textContent="Reference list adder";
        text.className="text-center text-primary lean display-6 my-2 mb-3";
        container.appendChild(text);
        column.appendChild(container);
        this.form({parent:column,container,idValues,sel,rowEle,colEle,isHtmlElement:false});
    }
    form({parent,container,idValues,isHtmlElement,sel,rowEle,colEle}:{
        parent:HTMLElement,
        container:HTMLElement,
        idValues:idValueType[],
        isHtmlElement:boolean,
        sel:selectorType|null,
        rowEle:rowType|null,
        colEle:colType|null
    }){
       
      
        const css_col="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;background-color:white;border-radius:12px;";
        const flex="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:1rem;background-color:white;border-radius:12px;";

        const form=document.createElement("form");
        form.id="reference-form";
        const count=8;
        form.style.cssText=flex ;
        const submit=document.createElement("button");
        submit.type="button";
        submit.style.cssText="padding-inline:2rem;border-radius:30px;padding-block:0.75rem;text-align:center;background-color:blue;color:white;align-self:center;justify-self:center;";
        submit.textContent="submit";
        Array.from(Array(count).keys()).map(num=>{
            const col=document.createElement("div");
            col.style.cssText=css_col + `flex:1 0 ${100/4}%;margin-inline:auto;box-shadow:1px 1px 12px 1px black;padding:1rem;`;
            const {input:nInput,label:nlabel,formGrp:nGrp}=Nav.inputComponent(col);
            nGrp.style.cssText=css_col;
            nInput.id=`name-${num}`;
            nInput.name=`name-${num}`;
            nlabel.textContent=`reference-${num}`;
            nlabel.setAttribute("for",nInput.id);
            nInput.placeholder="add reference";
            const {input:lInput,label:llabel,formGrp:lGrp}=Nav.inputComponent(col);
            lGrp.style.cssText=css_col;
            lInput.id=`link-${num}`;
            lInput.type="url";
            lInput.name=`link-${num}`;
            lInput.pattern="https://.*";
            llabel.textContent=`link-${num}`;
            llabel.setAttribute("for",lInput.id);
            lInput.placeholder="add link: https://...";
            lInput.onchange=(e:Event)=>{
                if(e){
                    const value=(e.currentTarget as HTMLInputElement).value;
                    const reg:RegExp=/(https:\/\/)[a-zA-Z0-9.\-/]{2,}/g;
                    if(value && reg){
                        this.popupMsg({parent:form,isPassed:reg.test(value),btn:submit,msg:`${nlabel.textContent}-link has to be of form: https://..., sorry, retry.`});
                    }
                }
            };
            form.appendChild(col);
            Misc.matchMedia({parent:col,maxWidth:400,cssStyle:{flex:"1 0 100%"}});
        });
        
        container.appendChild(form);
        container.appendChild(submit);
        this.removePopup({parent,target:container});
        Misc.growIn({anchor:form,scale:0,opacity:0,time:600});
        submit.onclick=(e:MouseEvent)=>{
            if(e){
              
                const arrLink:arrLinkType[]=[];
                Array.from(Array(count).keys()).map(num=>{
                   
                    const name=form.querySelector(`input#name-${num}`) as HTMLInputElement;
                    const link=form.querySelector(`input#link-${num}`) as HTMLInputElement;
                    if(!(name && link))return;
                    const getName=name.value as string;
                    const getLink=link.value as string;
                    if(getName && getLink){
                        const rand=Math.floor(Math.random()*1000);
                        const linkRef={id:`a-${rand}`,name:getName,link:getLink};
                        arrLink.push(linkRef);
                     
                    }
                });
                this._arrLinks=[...arrLink];
                Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(container);
                   
                },390);
                if(isHtmlElement){
                    this.addElement({parent,arrLink:this.arrLinks,idValues,isHtmlElement:true,sel:null,rowEle:null,colEle:null});
                }else{
                    this.addElement({parent,arrLink:this.arrLinks,idValues,isHtmlElement:false,sel,rowEle,colEle});
                };
            }
        };
    };
    addElement({parent,arrLink,idValues,isHtmlElement,sel,rowEle,colEle}:{
        parent:HTMLElement,
        arrLink:arrLinkType[],
        idValues:idValueType[],
        isHtmlElement:boolean,
        sel:selectorType|null,
        rowEle:rowType|null,
        colEle:colType|null
    }){
       const selRowCol=(sel && rowEle && colEle) ? {selectorId:sel?.eleId,rowId:rowEle?.eleId,colId:colEle.eleId}:null
        Header.cleanUpByID(parent,"eleContainer-reference");
        const idEnum:idEnumType="isReference";
        const type:typeEnumType="reference";
        //TARGET CONTAINS A GROUP OF ANCHORS <target><ol>arr(<li><a>)
        const css="display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:1rem;background-color:white;border-radius:12px;padding:1rem;width:100%;";
        const target=document.createElement('div');
        target.setAttribute("is-element","true");
        target.setAttribute("name","div");
        const text=document.createElement("h6");
        text.className="text-primary my-2 mx-3";
        text.textContent="References";
        target.id="reference-link-container";//data-href-reference
        const eleId=target.id;
        target.style.cssText=css;
        target.className="reference";
        target.appendChild(text);
        const divCont=document.createElement("div");
        divCont.style.cssText=css +"margin:0px;padding-inline:0rem;padding-top:1rem;position:relative;"
        divCont.id=`divCont-reference-container`;
        if(isHtmlElement){
            const dataMsg="Upon updating links,the links will be re-slotted to the end of the document automatically to maintain document organization.";
            divCont.setAttribute("data-msg",dataMsg);
            divCont.className="preference-eleContainer";
        }else{
            divCont.className="preference-eleContainer-footer";
        }
        this.appendTargetLinks({target,arrLink});
        
        this._modSelector.dataset.idValues=idValues;
        divCont.appendChild(target)
        parent.appendChild(divCont);
        
        const {button:updateBtn}=Misc.simpleButton({anchor:divCont,bg:Nav.btnColor,color:"white",type:"button",time:400,text:"update links"});
        updateBtn.id="reference-updateBtn";
        updateBtn.onclick=(e:MouseEvent)=>{
            if(e){
                
                this.updateLinks({parent,target,arrLink:null,idValues,isHtmlElement,updateBtn,selRowCol})
            }
        };
            idValues.push({eleId,id:type,attValue:type});
            idValues.push({eleId,id:"type",attValue:type});
            idValues.push({eleId,id:"elementId",attValue:eleId});
            idValues.push({eleId,id:"ID",attValue:eleId});
            idValues.push({eleId,id:idEnum,attValue:idEnum});
            this._modSelector.removeClasses({target,classes:["isActive","showName","box-shadow"]});

            

     if(isHtmlElement){
     this.elementAdder({target,sel,rowEle,colEle,idValues}).then(async(res)=>{
         if(res){
             const ele=res.ele as elementType;
             divCont.setAttribute("data-placement",`${ele.placement}-A`);
         }
     });

     }else{
        idValues.push({eleId,id:idEnum,attValue:idEnum});
        idValues.push({eleId,id:"reference",attValue:type});
        this._modSelector.elementAdder({target,sel,rowEle,colEle,idValues}).then(async(res)=>{
            if(res){
                Misc.message({parent,type_:"success",msg:"added",time:500});
            }
        });
     }
        target.onclick=(e:MouseEvent)=>{
            if(e){
                divCont.classList.toggle("isActive");
                target.classList.toggle("isActive");
                this.removeMainElement({parent,divCont,target,sel,rowEle,colEle,idValues});
                this._modSelector.updateElement({target,idValues,selRowCol});
            }
        };

    };


    getSelRowColTarget({parent}:{parent:HTMLElement}){
        const selector=this._modSelector.selectors.find(select=>(select.footer===true)) as selectorType;
        const {rows}=this._modSelector.checkGetRows({select:selector});
        let rowEle:rowType={} as rowType;
        let colEle:colType={} as colType;
        rows.map(row=>{
            row.cols.map(col=>{
                if(col.eleId===parent.id){
                    rowEle=row;
                    colEle=col;
                }
            });
        });
        return {sel:selector,rowEle,colEle}

    };

    appendTargetLinks( {target,arrLink}:{target:HTMLElement,arrLink:arrLinkType[]}){
        Header.cleanUpByID(target,"order-list");
        const ol=document.createElement("ol");
        ol.id="order-list";
        ol.style.cssText="margin-inline:0px;"
        this._arrLinks=[] as arrLinkType[]
        arrLink.map((link,index)=>{
            if(link){
                const li=document.createElement("li");
                const a=document.createElement('a');
                a.classList.add("showLink")
                a.id=link.id;
                a.className="reference-link";
                a.setAttribute("data-reference-link","true");
                a.style.cssText="text-decoration:underline;color:blue;font-weight:bold;cursor:pointer;"
                a.onclick=()=>{window.open(link.link,"_blank")};
                a.textContent=link.name;
                a.setAttribute("data-link",link.link);
                a.setAttribute("name",a.nodeName.toLowerCase());
                a.setAttribute("aria-selected","true");
                li.appendChild(a);
                ol.appendChild(li);
                Misc.fadeIn({anchor:li,xpos:100,ypos:100,time:600});
                IDKeyValuepairs.map(kv=>{
                    const check=kv.nodes.includes("a");
                    if(check && kv.id==="link" && kv.class_){
                        a.classList.add(kv.class_)
                    }
                });
            }
        });
        target.appendChild(ol);
    };

    updateLinks({parent,target,arrLink,idValues,isHtmlElement,updateBtn,selRowCol}:{parent:HTMLElement,target:HTMLElement,arrLink:arrLinkType[]|null,idValues:idValueType[],isHtmlElement:boolean,updateBtn:HTMLButtonElement,selRowCol:selRowColType|null}){
        updateBtn.hidden=true;
        const links=this.getArrLinks(target) as arrLinkType[] ||undefined
        if(links){
            this.updateForm({parent,target,arrLinks:links,idValues,isHtmlElement,updateBtn,selRowCol});
        }
    };

    getArrLinks(target:HTMLElement):arrLinkType[]|undefined{
        const arrLinks:arrLinkType[]=[];
       
        const allAnchors=target.querySelectorAll("a") as any as HTMLElement[];
        [...allAnchors].map(anchor=>{
            if(anchor){
                const link_=anchor.getAttribute("data-link");
            
                if(!link_)return;
                anchor.onclick=(e:MouseEvent)=>{
                    if(!e) return;
                    window.open(link_,"_blank");
                };
                arrLinks.push({id:anchor.id,link:link_,name:anchor.textContent as string})
            }
        });
        return arrLinks;
    };

    updateForm({parent,arrLinks,target,idValues,isHtmlElement,updateBtn,selRowCol}:{parent:HTMLElement,target:HTMLElement,arrLinks:arrLinkType[],idValues:idValueType[],isHtmlElement:boolean,updateBtn:HTMLButtonElement,selRowCol:selRowColType|null}){
        
        const css="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;background-color:white;border-radius:12px;";
        const flex="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:1rem;background-color:white;border-radius:12px;";
        const container=document.createElement("div");
        container.id="update-form-ref-container";
        container.style.cssText=css +"padding:0.75rem;background-color:whitesmoke;";
        const form=document.createElement("form");
        const eleId=target.id;
        form.id="reference-form";
        form.style.cssText=flex ;
        const submit=document.createElement("button");
        submit.type="button";
        submit.style.cssText="padding-inline:2rem;border-radius:30px;padding-block:0.75rem;text-align:center;background-color:blue;color:white;align-self:center;justify-self:center;";
        submit.textContent="submit";
        idValues.filter(kat=>(kat.eleId===eleId)).map((kat,index)=>{
            if(kat){
                idValues.splice(index,1);
            }
        });
        this._modSelector.dataset.idValues=idValues
       arrLinks.map((link,index)=>{
            const col=document.createElement("div");
            col.style.cssText=css + `flex:1 0 ${100/4}%;margin-inline:auto;box-shadow:1px 1px 12px 1px black;padding:1rem;`;
            const {input:nInput,label:nlabel,formGrp:nGrp}=Nav.inputComponent(col);
            nGrp.style.cssText=css;
            nInput.id=`name-${index}`;
            nInput.type="url";
            nInput.value=link.name;
            nInput.name=`name-${index}`;
            nInput.onchange=(e:Event)=>{
                if(!e) return;
                const name=(e.currentTarget as HTMLInputElement).value;
                const reg:RegExp=/[a-zA-Z0-9]{2,}/;
                if(reg.test(name)){
                    arrLinks= arrLinks.map(kat=>{
                        if(kat.id===link.id){
                            kat.name=name;
                        }
                        return kat;
                    });
                }
            };
            nlabel.textContent=`reference-${index}`;
            nlabel.setAttribute("for",nInput.id);
            nInput.placeholder="add reference";
            const {input:lInput,label:llabel,formGrp:lGrp}=Nav.inputComponent(col);
            lGrp.style.cssText=css;
            lInput.id=`link-${index}`;
            lInput.value=link.link;
            lInput.name=`link-${index}`;
            lInput.pattern="https://*.";
            llabel.textContent=`link-${index}`;
            llabel.setAttribute("for",lInput.id);
            lInput.placeholder="add link: https://...";
            lInput.onchange=(e:Event)=>{
                if(e){
                    const value=(e.currentTarget as HTMLInputElement).value;
                    const reg:RegExp=/(https:\/\/)[a-zA-Z0-9.\-/]+/;
                    this.popupMsg({parent:form,isPassed:reg.test(value),btn:submit,msg:`${nlabel.textContent}-link has to be of form: https://..., sorry, retry.`});
                    if(reg.test(value)){
                        arrLinks= arrLinks.map(kat=>{
                            if(kat.id===link.id){
                                kat.link=value;
                            }
                            return kat;
                        });
                    }
                }
            };
            form.appendChild(col);
            Misc.matchMedia({parent:col,maxWidth:400,cssStyle:{flex:"1 0 100%"}});
            
        });
        
        container.appendChild(form);
        container.appendChild(submit);
        parent.appendChild(container);
        Misc.growIn({anchor:form,scale:0,opacity:0,time:600});
        submit.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                parent.removeChild(container);
              
                this._arrLinks=[...arrLinks];
              
                
                //"reference-link-container";//data-href-reference
                
                Header.cleanUpByID(target,"order-list");
                this.appendTargetLinks({target:target,arrLink:arrLinks});
                if(isHtmlElement){
                    this._modSelector.updateElement({idValues,target,selRowCol:null});

                }else{
                    this._modSelector.updateElement({target,idValues,selRowCol});
                }
                //SHOW BTN
                updateBtn.hidden=false;
                //SOW BTN
                //reshow
                if(isHtmlElement){
                    const getRefreshBtn=document.querySelector("button#refreshButton") as HTMLButtonElement;
              
                    if(!getRefreshBtn ) return;
                    setTimeout(()=>{
                        getRefreshBtn.click();
    
                    },100);

                }
                //reshow
            }
            
        };
    };

    popupMsg(item:{parent:HTMLElement,msg:string,btn:HTMLButtonElement,isPassed:boolean}){
        const {parent,isPassed,msg,btn}=item;
        if(!isPassed){
            const popup=document.createElement("div");
            popup.id="reference-message-fail";
            popup.style.cssText="margin-inline:auto;position:absolute;width:50%;box-shadow:1px 1px 12px 1px black;border-radius:12px;padding:1rem;background-color:white;display:flex;justify-content:center;align-items:center;padding:1rem;";
            popup.style.inset="60% 0% 30% 0%";
            const text=document.createElement("p");
            text.className="text-center text-danger lean";
            text.style.cssText="margin:auto;"
            text.textContent=msg;
            btn.disabled=true;
            popup.appendChild(text);
            parent.appendChild(popup);
        }else{
            btn.disabled=false;
            if(!document.querySelector("div#reference-message-fail")) return;
            Header.cleanUpByID(parent,"reference-message-fail");
        }
    };

    elementAdder({target,sel,rowEle,colEle,idValues}:{
                target:HTMLElement,
                idValues:idValueType[],
                sel:selectorType|null,
                rowEle:rowType|null,
                colEle:colType|null
        
            }):Promise<{
                ele:elementType|element_selType|undefined,
                idValues:idValueType[],
                target:HTMLElement

            }>{
                const attr:idEnumType="isReference";
                const type:idEnumType="reference";
                const eleId=target.id;
                const blog=this._modSelector.blog;
                const node=target.nodeName.toLowerCase();
                const maxCount=ModSelector.maxCount(blog);
                const len=this._modSelector.elements.length;
                const {cleaned:classList}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]})
                let tempEle:elementType|element_selType|undefined={} as elementType|element_selType;
                if(sel && rowEle && colEle){
                    tempEle=this._modSelector.initElement_sel;
                    const check=colEle.elements.find(ele=>(ele.eleId===eleId));
                    if(check){

                        const ID=colEle.elements.length
                        tempEle={...tempEle,
                            id:ID,
                            order:ID,
                            colId:colEle.id,
                            class:classList.join(" "),
                            cssText:target.style.cssText,
                            name:node,
                            eleId,
                            type,
                            attr
                        } as element_selType;
                        const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                            target,
                            level:"element",
                            loc:"flexbox",
                            idValues,
                            sel,
                            row:rowEle,
                            col:colEle,
                            ele:tempEle,
                            clean:false
                        });
                        idValues=retIdValues;
                        const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                        getEleIds.map(kat=>{
                            if(kat.attValue && tempEle){
    
                                const attrCheck=attrEnumArr.includes(kat.id);
                                const typeCheck=typeEnumArr.includes(kat.id as typeEnumType);
                                if(attrCheck){
                                    tempEle.attr=kat.id
                                }else if(typeCheck){
                                    tempEle.type=kat.id
                                }else if(kat.id==="imgKey"){
                                    tempEle.imgKey=kat.attValue;
                                }
                            }
                        });
                        
                        //
                        colEle.elements.push(tempEle);
                        const {rows}=this._modSelector.checkGetRows({select:sel});
                        //
                        rowEle.cols = rowEle.cols.map(col=>{
                            if(col.eleId===colEle.eleId){
                                col=colEle;
                            }
                            return col;
                        });
                        //
                        const newRows=rows.map(row=>{
                            if(row.eleId===rowEle.eleId){
                                row=rowEle;
                            }
                            return row;
                        });
                        //
                        sel={...sel,rows:JSON.stringify(newRows)};
                        this._modSelector.selectors=this._modSelector.selectors.map(select=>{
                            if(select.eleId===(sel as selectorType).eleId){
                                select=sel as selectorType;
                            }
                            return select;
                        });
                    };
                    //
                }else{
                    tempEle=this._modSelector.initElement as elementType;
                    const placement=this._modSelector.placement;
                    const check=this._modSelector.elements.find(ele_=>(ele_.eleId===eleId));
                    if(!check){
                        tempEle={...tempEle,
                            id:len,
                            blog_id:blog.id,
                            placement:maxCount+1,
                            inner_html:target.innerHTML,
                            cssText:target.style.cssText,
                            class:classList.join(" "),
                            attr,
                            type,
                            name:node
                        };
                         //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                         const {idValues:retIdValues2}=this._modSelector.dataset.coreDefaultIdValues({
                            target,
                            level:"element",
                            sel,
                            row:rowEle,
                            col:colEle,
                            ele:tempEle,
                            loc:"htmlElement",
                            idValues,
                            clean:false
                        });
                        idValues=retIdValues2;
                        const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                        this._modSelector.dataset.populateElement({target,selRowColEle:tempEle,level:"element",loc:"flexbox",idValues,clean:false});
                        getEleIds.map(kat=>{
                            if(kat.attValue && tempEle){
                                const attrCheck=attrEnumArr.includes(kat.id);
                                const typeCheck=typeEnumArr.includes(kat.id as typeEnumType);
                                if(attrCheck){
                                    tempEle.attr=kat.id
                                }else if(typeCheck){
                                    tempEle.type=kat.attValue;
                                }else if(kat.id==="imgKey"){
                                    tempEle.imgKey=kat.attValue;
                                }else{
                                    tempEle.imgKey=undefined;
                                };
                            };
                        });
                       //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                        this._modSelector.elements.push(tempEle);
                        this._modSelector.blog={...this._modSelector.blog,elements:this._modSelector.elements}
                        this._modSelector.placement=placement + 1;
                    }
                }
                return Promise.resolve({ele:tempEle,idValues,target}) as Promise<{ele:elementType|element_selType|undefined,idValues:idValueType[],target:HTMLElement}>;
    };



    removeMainElement({parent,divCont,target,sel,rowEle,colEle,idValues}:{
        parent:HTMLElement,
        divCont:HTMLElement,
        target:HTMLElement,
        idValues:idValueType[]
        sel:selectorType|null,
        rowEle:rowType|null,
        colEle:colType|null
    }){
        const check=([...target.classList as any] as string[]).includes("isActive");
        Header.cleanUpByID(parent,"xIconDiv");
        
        if(check){
            const css="position:absolute;transform:translate(-12px,-10px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:0px;left:0px;z-index:200;";
            divCont.classList.add("position-relative");
            const xIconDiv=document.createElement("div");
            xIconDiv.setAttribute("contenteditable","false");
            xIconDiv.setAttribute("is-icon","true");
            xIconDiv.className="xIconDiv";
            xIconDiv.id=`xIconDiv`;
            xIconDiv.style.cssText=`${css}`;
            const cssStyle={background:"inherit",fontSize:"inherit"};
            FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
            divCont.appendChild(xIconDiv);
            xIconDiv.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    this.removeElement({target,sel,rowEle,colEle,idValues}).then(async(res)=>{
                        if(res?.ele){
                
                            if(!sel){
                                const ele=res.ele as element_selType;
                                Misc.message({parent,type_:"success",msg:`${ele.id}:deleted`,time:800});
                            }else{
                                const ele=res.ele as elementType;
                                Misc.message({parent,type_:"success",msg:`${ele.id}:deleted`,time:800});
                                this._modSelector.shiftPlace(ele.placement);///REINDEX : deletedPLACEMENT!!!!

                            }
                            Misc.message({parent,type_:"success",msg:"item removed",time:600});
                            Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:500});
                            setTimeout(()=>{
                                parent.removeChild(divCont);
                            },480);
                        
                        }
                    });
                    
                    
                }
            });
         }else{
            Header.cleanUpByID(parent,"xIconDiv");
         }
    };

    removeElement({target,sel,rowEle,colEle,idValues}:{
        target:HTMLElement,
        sel:selectorType|null,
        rowEle:rowType|null,
        colEle:colType|null,
        idValues:idValueType[]

    }):Promise<{ele: element_selType | elementType | undefined;idValues: idValueType[];}>{
        const eleId=target.id;
         let retEle:element_selType|elementType|undefined;

        if(sel && rowEle && colEle){
                colEle.elements= colEle.elements.map((ele,index)=>{
                    if(ele.eleId===target.id){
                        retEle=ele as element_selType;
                        colEle.elements.splice(index,1);
                    }
                    return ele;
                }) as element_selType[];
                ///
               rowEle.cols= rowEle.cols.map(col=>{
                if(col.eleId===colEle.eleId){
                    col=colEle;
                }
                    return col;
                }) as colType[];
                ///
                const {rows}=this._modSelector.checkGetRows({select:sel});
                const newRows= rows.map(row=>{
                    if(row.eleId===rowEle.eleId){
                        row=rowEle;
                    }
                    return row
                });
                ///
                sel={...sel,rows:JSON.stringify(newRows)} as selectorType;
                ///
                this._modSelector.selectors= this._modSelector.selectors.map(select=>{
                        if(select.eleId===(sel as selectorType).eleId){
                            select=sel as selectorType;
                        }
                        return select;
                });
                ///
            
            idValues.map((kat,index)=>{
                if(kat.eleId===eleId){
                    idValues.splice(index,1);
                }
            });
            this._modSelector.dataset.upDateIdValues({idValues});
        }else{

            this._modSelector.elements.map((ele,index)=>{
                if(ele.eleId===target.id){
                    retEle=ele as elementType;
                    this._modSelector.elements.splice(index,1);
                }
            });
            
            idValues.map((kat,index)=>{
                if(kat.eleId===eleId){
                    idValues.splice(index,1);
                }
            });
            ///
            this._modSelector.dataset.upDateIdValues({idValues});
        }
        
        return Promise.resolve({ele:retEle,idValues}) as Promise<{ele:elementType|element_selType|undefined,idValues:idValueType[]}>;
        
    };


    removePopup({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        const popup=document.createElement("div");
        popup.id="delete-popup-form";
        popup.style.cssText="position:absolute;top:0%;right:0%;transform:translate(5px,5px);z-index:20;border-radius:50%;background-color:black;color:white;padding:1px;aspect-ratio:1 / 1;font-size:10px;";
        FaCreate({parent:popup,name:FaCrosshairs,cssStyle:{fonstSize:"100%"}});
        target.appendChild(popup);
        popup.onclick=(e:MouseEvent)=>{
            if(!e) return;
            Misc.fadeOut({anchor:target,xpos:100,ypos:50,time:400});
            setTimeout(()=>{parent.removeChild(target)},390);
        };
    }
}
export default Reference;
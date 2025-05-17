import ModSelector from "../editor/modSelector";
import {  arrDivContType, elementType } from "../editor/Types";
import Nav from "../nav/headerNav";
import Misc from "./misc/misc";
import Header from "../editor/header";
import { FaCreate } from "./ReactIcons";
import { FaCrosshairs } from "react-icons/fa";
import { idEnumType, idValueType } from "@/lib/attributeTypes";
import Dataset from './dataset';


class Ven{
    _element:elementType
    constructor(private _modSelector:ModSelector){
        this._element=this._modSelector.initElement;
        this.element={...this.element,attr:"isVen",type:"ven"};
    };
    /////----GETTTERS/SETTERS------//////
    get element(){
        return this._element;
    };
    set element(element:elementType){
        this._element=element;
    }
    /////----GETTTERS/SETTERS------//////

    showCleanVen({parent,element,idValues}:{parent:HTMLElement,element:elementType,idValues:idValueType[]}):arrDivContType{
        const divCont=document.createElement("div");
        const target=document.createElement(element.name);
        const eleId=element.eleId;
        
        const rand=Math.floor(Math.random() *1000);
        parent.style.position="relative";
        divCont.id=`divCont-ven-${rand}`;
        target.classList.remove("isActive");
        target.id=element.eleId;
        target.innerHTML=element.inner_html;
        target.className=element.class;
        this._modSelector.dataset.insertcssClassIntoComponents({target:divCont,level:"element",headerType:undefined,id:"divContId",type:"ven",loc:"htmlElement"});
        const {cleaned:cleanClasses}=this._modSelector.removeClasses({target:target,classes:["isActive","showName"]});
        target.className=cleanClasses.join(" ");
        target.classList.remove("showName");
       
        target.style.cssText=`${element.cssText}`;
        idValues.push({eleId,id:"divContId",attValue:divCont.id});
        idValues.push({eleId,id:"ele_id",attValue:String(element.id)});
        idValues.push({eleId,id:"name",attValue:element.name});
        //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
        const {idValues:retIdValues2}=this._modSelector.dataset.coreDefaultIdValues({
            target,
            level:"element",
            ele:element,
            sel:null,
            row:null,
            col:null,
            loc:"htmlElement",
            idValues,
            clean:false

        });
        idValues=retIdValues2;
        this._modSelector.dataset.populateElement({target,level:"element",loc:"htmlElement",clean:true,idValues,selRowColEle:element});
       //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
       target.classList.remove("showName");
       divCont.appendChild(target);
       const arrDivCont:arrDivContType={divCont,target,placement:element.placement,ele:element,isNormal:false,chart:null,sel:null}
       return arrDivCont
    };



     showVen({parent,element,idValues}:{parent:HTMLElement,element:elementType,idValues:idValueType[]}):arrDivContType{
        const divCont=document.createElement("div");
        console.log("VEN YES",element)
        const target=document.createElement(element.name);
        const eleId=element.eleId;
        const less400=window.innerWidth < 400;
        const rand=Math.floor(Math.random() *1000);
        parent.style.position="relative";
        divCont.id=`divCont-ven-${rand}`;
        this._modSelector.dataset.insertcssClassIntoComponents({target:divCont,level:"element",headerType:undefined,id:"divContId",type:"ven",loc:"htmlElement"});
        divCont.setAttribute("data-placement",`${element.placement}-A`);
        divCont.style.paddingInline=less400 ? "0.25rem":"1.5rem";
        target.classList.remove("isActive");
        target.id=element.eleId;
        target.innerHTML=element.inner_html;
        target.className=element.class;
        const {cleaned:cleanClasses}=this._modSelector.removeClasses({target:target,classes:["isActive","showName"]});
        target.className=cleanClasses.join(" ");
        target.classList.remove("showName");
       
        target.style.cssText=`${element.cssText}`;
        idValues.push({eleId,id:"divContId",attValue:divCont.id});
        idValues.push({eleId,id:"ele_id",attValue:String(element.id)});
        idValues.push({eleId,id:"name",attValue:element.name});
        //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
        const {idValues:retIdValues2}=this._modSelector.dataset.coreDefaultIdValues({
            target,
            level:"element",
            ele:element,
            sel:null,
            row:null,
            col:null,
            loc:"htmlElement",
            idValues,
            clean:false

        });
        idValues=retIdValues2;
       //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
       target.classList.remove("showName");
       divCont.appendChild(target);
    
        this._modSelector.editElement({target,idValues,selRowCol:null});

       divCont.onclick=async(e:MouseEvent)=>{
        if(!e) return;
            divCont.classList.toggle("isActive");
            target.classList.toggle("isActive");
            await this.removeMainElement({parent,divCont,target,idValues});
        };
    const arrDivCont:arrDivContType={divCont,target,placement:element.placement,ele:element,isNormal:false,chart:null,sel:null}
    return arrDivCont
    };
    
    
    venDiagram({parent,idValues}:{parent:HTMLElement,idValues:idValueType[]}){
        const rand=Math.round(Math.random()*1000);
        Header.cleanUpByID(parent,"container-divCont");
        const container=document.createElement("div");
        container.id="container-divCont";
        container.className="";
        container.style.cssText="display:flex;flex-direction:column;justify-content:center:align-items:center;margin-top:4rem;position:relative;width100%;margin-inline:auto;width:100%;"
        const divCont=document.createElement("div");
        divCont.style.cssText="margin-inline:auto;margin-block:0px;padding:3px;width:100%;display:flex;justify-content:center;align-items;center;flex-direction:column;";
        divCont.setAttribute("data-placement","A");
        const venMain=document.createElement("div");
        venMain.id=`target-venMain-${rand}`;
        venMain.setAttribute("is-element","true");
        venMain.setAttribute("is-vendiagram","true");
        venMain.setAttribute("name","div");
        venMain.style.cssText="margin:auto;display:flex;justify-content:center;align-items:center;flex-direction:column;position:relative;width:100%;min-height:45vh;position:relative;margin-block:2.5rem;margin-inline:1rem;";
        //CIRCLE SIZE
        const initWidth=240;
        const initTrans=Math.round(initWidth/4 + 4);
        const textMd="edit here";
        const cssStyleOne={top:"0%",left:"30%",transform:`translateX(-${initTrans}px)`,width:`${initWidth}px`,height:`${initWidth}px`};
        const cssStyleTwo={top:"0%",right:"30%",transform:`translateX(${initTrans}px)`,width:`${initWidth}px`,height:`${initWidth}px`};
        Array.from(Array(2).keys()).map((num,index)=>{
            if(index===0){
                this.ven({id:index,parent:venMain,shade1:"black",width:initWidth,shade2:"#0CAFFF",title:"edit one",text:"edit one",isSizeAdjust:true,cssStyle:cssStyleOne});
            }else{
                this.ven({id:index,parent:venMain,shade1:"black",width:initWidth,shade2:"#0CAFFF",title:"edit two",text:"edit Two",isSizeAdjust:true,cssStyle:cssStyleTwo});
            }
        });

        this.circleSize(venMain).then(async(res)=>{
            if(res){
                res.input.oninput=(e:Event)=>{
                    if(e){
                        const widthValue=parseInt((e.currentTarget as HTMLInputElement).value);
                        const width=widthValue;
                        const trans=Math.round(width/4 + 4);
                        venMain.style.height=`${width*1.26}px`;
                        const cssStyleOne={top:"0%",left:"30%",transform:`translateX(-${trans}px)`,width:`${width}px`,height:`${width}px`};
                        const cssStyleTwo={top:"0%",right:"30%",transform:`translateX(${trans}px)`,width:`${width}px`,height:`${width}px`};
                        Array.from(Array(2).keys()).map((num,index)=>{
                            if(index===0){
                                //left circle
                                this.ven({id:index,parent:venMain,shade1:"black",width:width,shade2:"#0CAFFF",title:"edit one",text:"edit one",isSizeAdjust:true,cssStyle:cssStyleOne});
                            }else{
                                //right circle
                                this.ven({id:index,parent:venMain,shade1:"black",width:width,shade2:"#0CAFFF",title:"edit two",text:"edit Two",isSizeAdjust:true,cssStyle:cssStyleTwo});
                            }
                        });
                        
                    }
                };
                res.button.onclick=(e:MouseEvent)=>{
                    if(e){
                        Misc.growOut({anchor:res.container,scale:0,opacity:0,time:400});
                        setTimeout(()=>{
                            venMain.removeChild(res.container);
                        },398);
                        //------GET WIDTH-----///
                        const getVenCircle=venMain.querySelector("div#venItem0") as HTMLElement;//ID:"venItem" + `${id}`
                        if(getVenCircle){
                            const width=getVenCircle.style.width;
                            const venHeight=parseInt(width.split("px")[0]);
                            const ven_height= isNaN(venHeight) ? venHeight * 1.26: 350;
                            const trans= isNaN(venHeight) ? Math.round(venHeight/4 + 4): Math.round(350/4);
                            ///-------ADDING LINEAR GRADIENT------------///
                            venMain.style.height=`${ven_height}px`;
                            const cssStyleOne={top:"0%",left:"30%",transform:`translateX(-${trans}px)`,width:width,height:width};
                            const cssStyleTwo={top:"0%",right:"30%",transform:`translateX(${trans}px)`,width:width,height:width};
                            Array.from(Array(2).keys()).map((num,index)=>{
                                if(index===0){
                                    this.ven({id:index,parent:venMain,shade1:"black",width:venHeight,shade2:"#0CAFFF",title:"edit one",text:"edit one",isSizeAdjust:false,cssStyle:cssStyleOne});
                                }else{
                                    this.ven({id:index,parent:venMain,shade1:"black",width:venHeight,shade2:"#0CAFFF",title:"edit two",text:"edit Two",isSizeAdjust:false,cssStyle:cssStyleTwo});
                                }
                            });
                            this.updateElement({target:venMain,idValues});//updating
                            ///-------ADDING LINEAR GRADIENT------------///
                            ///-------ADDING LINEAR GRADIENT BTN BUTTON-----------------------////
                            const grpBtn=document.createElement("div");
                            grpBtn.style.cssText="margin-inline:auto;display:flex;justify-content:center;align-items:center;gap:1rem;margin-top:5rem;"
                            const {button}=Misc.simpleButton({anchor:grpBtn,type:"submit",bg:"black",color:"white",text:"okay",time:400});
                            container.appendChild(grpBtn);
                            button.onclick=(e:Event)=>{
                                if(e){
                                    const getVenLinearGrads=venMain.querySelectorAll("div#venLinearGrad");
                                    const getEdits=venMain.querySelectorAll("[contenteditable='true']");
                                    if(getVenLinearGrads){
                                        ([...getVenLinearGrads as any] as HTMLElement[]).map(child=>{
                                            if(child){
                                                child.remove();
                                            }
                                        });
                                        ([...getEdits as any] as HTMLElement[]).map(child=>{
                                            if(child){
                                                child.setAttribute("contenteditable","true");
                                            }
                                        });
                                        this.updateElement({target:venMain,idValues});
                    
                                       setTimeout(()=>{
                                        container.removeChild(grpBtn)
                                       },400);
                                    }
                                }
                            };
                            ///-------ADDING LINEAR GRADIENT BTN BUTTON-----------------------////
                            ////-----ADDING MID TEXT-----------------////
                            this.paraTextMd(venMain,textMd,venHeight);
                            this.updateElement({target:venMain,idValues});
                            ////-----ADDING MID TEXT-----------------////
                        }
                       
                    }
                };
            }
        });
        divCont.appendChild(venMain);
        container.appendChild(divCont);
        parent.appendChild(container);
        const eleId=venMain.id;
        const idEnum:idEnumType="isVen";
        const type="ven";
        const node=venMain.nodeName.toLowerCase();
        const {cleaned}=this._modSelector.removeClasses({target:venMain,classes:["isActive","box-shadow"]});
        idValues.push({eleId,id:idEnum,attValue:idEnum});
        idValues.push({eleId,id:type,attValue:type});
        idValues.push({eleId,id:"type",attValue:type});
        idValues.push({eleId,id:"attr",attValue:idEnum});
        const placement=this._modSelector.placement
        this.element={...this.element,
            eleId,
            placement,
            attr:idEnum,
            type,
            inner_html:venMain.innerHTML,
            name:node,
            class:cleaned.join(" "),
        }
        this.elementAdder({target:venMain,element:this.element,idValues}).then(async(res)=>{
            if(res){
                const ele=res.ele as elementType;
                divCont.setAttribute("data-placment",`${ele.placement}-A`);
                divCont.onclick=(e:MouseEvent)=>{
                    if(e){
                        divCont.classList.toggle("isActive");
                        res.target.classList.toggle("isActive");
                        this.removeMainElement({parent,divCont:container,target:res.target,idValues:res.idValues});
                    }
                };
            }
        });
        this._modSelector.editElement({target:venMain,idValues,selRowCol:null});
    }
    ven(item:{id:number,parent:HTMLElement,shade1:string,shade2:string,width:number,title:string,text:string,isSizeAdjust:boolean,cssStyle:{[key:string]:string}}){
        const {id,parent,shade1,width,shade2,title,text,isSizeAdjust,cssStyle}=item;
        parent.style.position="relative";
        const arrNotStyle=["position","background","backgroundColor"]
        Header.cleanUpByID(parent,"venItem" + `${id}`);
        const title_=document.createElement("h6");
        title_.setAttribute("contenteditable","true");
        title_.className="text-center text-primary lean display-6";
        title_.style.cssText="position:absolute;top:-15%;left:0%;right:0%;width:100%;font-size:130%;";
        title_.textContent=title;
        const venItem=document.createElement("div");
        venItem.id="venItem" + `${id}`;
        venItem.appendChild(title_);
        //default style
        venItem.style.cssText="position:absolute;"
        venItem.style.minWidth="140px";
        venItem.style.minHeight="140px";
        venItem.style.display="flex";
        venItem.style.flexDirection="column";
        venItem.style.justifyContent="center";
        venItem.style.alignItems="center";
        venItem.style.padding="1.25rem";
        venItem.style.borderRadius="50%";
        venItem.style.boxShadow=`1px 1px 12px ${shade1},-1px -1px 12px ${shade2}`;
        
        //VEN SHADE
        
        const anchorShade=document.createElement("div");
        if(!isSizeAdjust){
            this.venLinearGrad(anchorShade,id,venItem.style.width).then(async(res)=>{
                if(res){
                    
                    res.effect.onchange=(e:Event)=>{
                        if(e){
                            const effect_=(e.currentTarget as HTMLSelectElement).value;
                            res.effect.value=effect_;
                            res.blShades.onchange=(e:Event)=>{
                                if(e){
                                    const color1=(e.currentTarget as HTMLSelectElement).value;
                                    venItem.style.background=`linear-gradient(${effect_},${color1},rgba(255,255,255,0.8))`;
                                }
                            };
                        }
                    };
                }
            });

            //TEXT
            this.paraText(venItem,text,width,id);
            //TEXT
        }
        
        venItem.appendChild(anchorShade);
        //VEN SHADE
        parent.appendChild(venItem);
        
        for(const [key,value] of Object.entries(cssStyle)){
            if(key==="width" && !arrNotStyle.includes(key)){
                venItem.style.width=value;
            }
            if(key==="height" && !arrNotStyle.includes(key)){
                venItem.style.height=value;
            }
            if(key ==="transform" && !arrNotStyle.includes(key)){
                venItem.style.transform=value;
            }
        }
        if(!isSizeAdjust){
            venItem.animate([
                {transform:"translateX(-45%)"},
                {transform:venItem.style.transform},
            ],{duration:1200,iterations:1});
        }

    }
    async venLinearGrad(anchor:HTMLElement,id:number,width:string):Promise<{effect:HTMLSelectElement,blShades:HTMLSelectElement,container:HTMLElement}>{
        const container=document.createElement("div");
        const convWidth=!isNaN(parseInt(width.split("px")[0])) ? parseInt(width.split("px")[0]) :70;
        container.id="venLinearGrad";
        container.className="venLinearGrad";
        container.style.cssText="position:absolute;inset:0%;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;";
        container.style.top="140%";
        if(id===0){
            container.style.transform=`translateX(-${convWidth + 20}px)`;
        }else{
            container.style.transform=`translateX(${convWidth + 20}px)`;
        }
        const effects=[{name:"select",value:""},{name:"angle 45",value:"45deg"},{name:"to left",value:"to left"},{name:"to right",value:"from left"},{name:"polar blend extend",value:"in hsl longer hue"},{name:"polar color",value:"in hsl"},{name:"angle bottom=>top",value:"to left top"},];
        const {select:effect}=Misc.selectComponent({parent:container,name:"effect",selects:effects,cssStyle:{background:"black",color:"white",fontFamily:"Roboto",fontSize:"9px"}});
        effect.id="venEffect";
        effect.name="venEffect";
        const {select:blShades}=Misc.selectComponent({parent:container,name:"shades",selects:Misc.blueShades2,cssStyle:{background:"rgb(8, 4, 249)",color:"white",fontFamily:"Roboto",fontSize:"9px"}});
        blShades.id="blueShades";
        blShades.name="blueShades";
        anchor.appendChild(container);
         return Promise.resolve({effect,container,blShades}) as Promise<{effect:HTMLSelectElement,blShades:HTMLSelectElement,container:HTMLElement}>;
        
    }
    paraText(ven:HTMLElement,text:string,width:number,id:number){
        
        const cont=document.createElement("div");
        cont.style.cssText="padding-inline:1rem;margin:auto;position:absolute;background:transparent;width:70%;font-size:85%;";
        if(id===0){
            cont.style.inset=`35% 1rem 30% 2.25rem`;
            cont.style.transform=`translateX(-${(Math.round(width/4) + 3)}px)`;
        }else{
            cont.style.inset=`35% 1rem 30% 2rem`;
            cont.style.transform=`translateX(${(Math.round(width/4) -2)}px)`;
        }
    
        const para=document.createElement("p");
        para.style.cssText="padding-inline:0.75rem;"
        para.setAttribute("contenteditable","true");
        para.textContent=text;
        cont.appendChild(para);
        ven.appendChild(cont);
    }
    paraTextMd(target:HTMLElement,text:string,width:number){
        const cont=document.createElement("div");
        cont.style.cssText="margin:auto;position:absolute;background:transparent;width:70%;font-size:85%;display:flex;flex-direction:column;align-items:center;";
        cont.style.inset=`40% 25% 40% 25%`;
        cont.style.width=`${width*.5}px`;
        cont.setAttribute("contenteditable","true");
    
        const para=document.createElement("p");
        para.style.cssText="padding-inline:0.75rem;"
        para.setAttribute("contenteditable","true");
        para.textContent=text;
        cont.appendChild(para);
        target.appendChild(cont);
    }
    circleSize(venMain:HTMLElement):Promise<{input:HTMLInputElement,button:HTMLButtonElement,container:HTMLElement}>{
        venMain.style.width="100%";
        venMain.style.zIndex="";
        const container=document.createElement("div");
        container.id="width-adjusment";
        container.style.cssText="position:absolute;box-shadow:1px 1px 12px black;padding-inline:2rem;background:white;border-radius:12px;display:flex;justify-content:center;align-items:center; gap:1.25rem;flex-direction:column;padding-block:1rem;z-index:100;";
        container.style.top=`0%`;
        container.style.left=`43%`;
        container.style.right=`43%`;
        container.style.width=`150px`;
        container.style.height=`200px`;
        const {input,label,formGrp}=Nav.inputComponent(container);
        input.style.paddingInline="0";
        formGrp.style.width="80px";
        input.id="width-size";
        label.setAttribute("for",input.id);
        input.type="number";
        input.min="120";
        input.max="350";
        input.value="240";
        input.placeholder="240px";
        label.textContent="venSize";
        const {button}=Misc.simpleButton({anchor:container,type:"button",bg:Nav.btnColor,color:"white",text:"okay",time:400});
        venMain.appendChild(container);
        Misc.growIn({anchor:container,scale:0,opacity:0,time:400});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{left:"30%",right:"30%"}});
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{left:"20%",right:"20%"}});

        return Promise.resolve({input,button,container}) as Promise<{input:HTMLInputElement,button:HTMLButtonElement,container:HTMLElement}>; 

    }
    regExp(item:{str:string,frontReg:RegExp,backReg:RegExp}):{arrWords:{word:string,frIndex:number,bkIndex:number}[]}{
        const {str,frontReg,backReg}=item;
        const frmatches=str.matchAll(frontReg) as any;
        const bckmatches=str.matchAll(backReg) as any;
        const arr:{word:string,frIndex:number,bkIndex:number}[]=[]
        for(const match of frmatches){
            for(const mBmatch of bckmatches){
                const frIndex=match.index +match[0].length;
                const bkIndex=mBmatch.index + mBmatch[mBmatch.length-1].length
               arr.push({frIndex,bkIndex,word:str.slice(frIndex,bkIndex)})
            }
        }
        return {arrWords:arr}
    };

     elementAdder({target,element,idValues}:{
                target:HTMLElement,
                element:elementType,
                idValues:idValueType[]
        
    }):Promise<{ele:elementType|undefined,idValues:idValueType[],target:HTMLElement}>{
        console.log("BEFORE :INADDER",element)//OK
        const len=this._modSelector.elements.length;
        const eleId=target.id;
        const blog=this._modSelector.blog;
        const placement=this._modSelector.placement;
        const {cleaned:classList}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]})
        const check=this._modSelector.elements.find(ele_=>(ele_.eleId===eleId));
        if(!check){
            element={...element,
                id:len,
                blog_id:blog.id,
                placement:placement,
                inner_html:target.innerHTML,
                cssText:target.style.cssText,
                class:classList.join(" "),
                type:"ven",
                attr:"isVen"
                
            };
            idValues.push({eleId,id:"elementId",attValue:eleId});
            idValues.push({eleId,id:"ID",attValue:eleId});
            console.log("tempEle before",element)//NOT OK
                //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                const {idValues:retIdValues2}=this._modSelector.dataset.coreDefaultIdValues({
                target,
                level:"element",
                sel:null,row:null,col:null,
                ele:element,
                loc:"htmlElement",
                idValues,
                clean:false
            });
            idValues=retIdValues2;
          
            //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
            this._modSelector.elements.push(element as elementType);
            const elements=this._modSelector.elements;
            this._modSelector.blog={...this._modSelector.blog,elements:elements}
            this._modSelector.placement=placement + 1;
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            this._modSelector.dataset.upDateIdValues({idValues});
        }
        return Promise.resolve({ele:element,idValues,target}) as Promise<{ele:elementType|undefined,idValues:idValueType[],target:HTMLElement}>;
    };
    async removeMainElement({parent,divCont,target,idValues}:{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement,idValues:idValueType[]}):Promise<{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement,idValues:idValueType[]}>{
        const check=([...target.classList as any] as string[]).includes("isActive");
        Header.cleanUpByID(parent,"xIconDiv-design");
        
        if(check){
            const css="position:absolute;transform:translate(-2px,-3px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:0px;left:0px;z-index:2000";
            divCont.classList.add("position-relative");
            const xIconDiv=document.createElement("div");
            xIconDiv.setAttribute("contenteditable","false");
            xIconDiv.setAttribute("is-icon","true");
            xIconDiv.className="xIconDiv";
            xIconDiv.id=`xIconDiv-design`;
            xIconDiv.style.cssText=`${css}`;
            xIconDiv.style.zIndex=`2000`;
            const cssStyle={background:"inherit",fontSize:"inherit"};
            FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
            divCont.appendChild(xIconDiv);
            xIconDiv.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    this.removeElement({target,idValues}).then(async(res)=>{
                        if(res?.ele && res?.target && res?.idValues){
                            const ele=res.ele
                            this._modSelector.shiftPlace(ele.placement);///REINDEX PLACEMENT!!!!
                            Misc.message({parent,msg:`item:${ele.name}-${ele.placement} was removed`,type_:"success",time:700});
                            Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:500});
                            
                            setTimeout(()=>{
                                ([...parent.children as any] as HTMLElement[]).map(child=>{
                                    if(child && child.id===divCont.id){
                                        parent.removeChild(child);
                                    }
                                });
                            },480);
                        }else{
                            Misc.message({parent,msg:`item not removed`,type_:"error",time:1200});
                        }
                    });
                }
            });
         }else{
            Header.cleanUpByID(parent,"xIconDiv-design");
         }
         return new Promise(resolver=>{
            if(check){
                resolver({parent,divCont,target,idValues});
            }
         }) as Promise<{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement,idValues:idValueType[]}>;
    };

    updateElement({target,idValues}:{target:HTMLElement,idValues:idValueType[]}):{ele:elementType,target:HTMLElement,idValues:idValueType[]}{
        const eleId=target.id;
        this._modSelector.elements=this._modSelector.elements.map((ele)=>{
        if(ele.eleId===eleId){
            ele.cssText=target.style.cssText;
            ele.class=target.className;
            ele.inner_html=target.innerHTML;
            this.element=ele;
        }
        return ele;
        });
        this._modSelector.datasetSincUpdate({target,ele:this.element,idValues,level:"element",loc:"htmlElement"});
        return {ele:this.element,target,idValues}
    }

    removeElement({target,idValues}:{target:HTMLElement,idValues:idValueType[]}):Promise<{target:HTMLElement,ele:elementType|undefined,idValues:idValueType[]}>{
        let ele_:elementType|undefined;
        const eleId=target.id;
        this._modSelector.elements.map((ele,index)=>{
                if(ele.eleId===target.id){
                    this._modSelector.elements.splice(index,1);
                    idValues.map((kat,index)=>{
                        if(kat.eleId===eleId){
                            idValues.splice(index,1);
                            ele_=ele;
                        }
                    });
                }
        });
        
        return Promise.resolve({target,idValues,ele:ele_}) as Promise<{target:HTMLElement,ele:elementType|undefined,idValues:idValueType[]}>;
    };
}

export default Ven;
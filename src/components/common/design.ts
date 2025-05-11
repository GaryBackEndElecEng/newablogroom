import HtmlElement from "../editor/htmlElement";
import ModSelector from "../editor/modSelector";
import { arrDivContType,elementType, focusOptions } from "../editor/Types";
import Nav from "../nav/headerNav";
import Misc from "./misc";
import Header from "../editor/header";
import { FaCreate } from "./ReactIcons";
import { FaCrosshairs } from "react-icons/fa";
import Main from "../editor/main";
import { attrDesignEnumType, idEnumType, idValueType, selRowColType, typeEnumType } from "@/lib/attributeTypes";
import Dataset from './dataset';
import { attrEnumArr, attrEnumArrTest, typeEnumArr, typeEnumArrTest } from "./lists";



class Design{
    _element:elementType;
   
    constructor(private _modSelector:ModSelector){
        this._element=this._modSelector.initElement;
        this.element={...this.element,type:"design",attr:undefined};
       
    }

    get element(){
        return this._modSelector.element;
    }
    set element(element:elementType){
        this._modSelector.element=element;
    }
    //---------SEMI-CIRCLE-------------------------//
   showCleanDesign({parent,element,idValues}:{parent:HTMLElement,element:elementType,idValues:idValueType[]}):arrDivContType{
      
        const divCont=document.createElement("div");
        const target=document.createElement(element.name);
        const eleId=element.eleId;
        const less400=window.innerWidth < 400;
        const rand=Math.floor(Math.random() *1000);
        parent.style.position="relative";
        divCont.id=`divCont-design-${rand}`;
        this._modSelector.dataset.insertcssClassIntoComponents({
            target:divCont,
            level:"element",
            headerType:undefined,
            id:"divContId",
            loc:"htmlElement",
            type:"design"

        });
        
        divCont.style.paddingInline=less400 ? "0.25rem":"1.5rem";
        idValues.push({eleId,id:"divContId",attValue:divCont.id});
        idValues.push({eleId,id:"ele_id",attValue:String(element.id)});
        target.classList.remove("isActive");
        target.id=element.eleId;
        target.className=element.class;
        target.innerHTML=element.inner_html;
        
        target.style.cssText=`${element.cssText}`;
        //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
        const {idValues:retIdValues2}=this._modSelector.dataset.coreDefaultIdValues({
            target,
            level:"element",
            sel:null,
            row:null,
            col:null,
            ele:element,
            loc:"htmlElement",
            idValues,
            clean:true,
        });
        idValues=retIdValues2;
        this._modSelector.dataset.populateElement(({target,level:"element",loc:"flexbox",idValues,selRowColEle:element,clean:true}));
        const {cleaned:cleanClasses}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow","showName"]});
        target.className=cleanClasses.join(" ");
        divCont.appendChild(target);
        const arrDivCont:arrDivContType={divCont,target,placement:element.placement,ele:element,isNormal:false,chart:null,sel:null}
        return arrDivCont
    }
   showDesign({parent,element,idValues}:{parent:HTMLElement,element:elementType,idValues:idValueType[]}):arrDivContType{
      
        const attrTest=attrEnumArrTest(element);
        const attrDesign:string[]=["isArt" , "isCircle" , "isWave" , "isArrow" , "isArch"];
        const isAttrDesign=attrTest ? attrDesign.includes(attrTest.value) :undefined;
        const divCont=document.createElement("div");
        const target=document.createElement(element.name);
        const eleId=element.eleId;
        const less400=window.innerWidth < 400;
        const rand=Math.floor(Math.random() *1000);
        parent.style.position="relative";
        divCont.id=`divCont-design-${rand}`;
        this._modSelector.dataset.insertcssClassIntoComponents({
            target:divCont,
            level:"element",
            headerType:undefined,
            id:"divContId",
            loc:"htmlElement",
            type:"design"

        })
        divCont.setAttribute("data-placement",`${element.placement}-A`);
        divCont.style.paddingInline=less400 ? "0.25rem":"1.5rem";
        idValues.push({eleId,id:"divContId",attValue:divCont.id});
        idValues.push({eleId,id:"ele_id",attValue:String(element.id)});
        target.classList.remove("isActive");
        target.id=element.eleId;
        target.className=element.class;
        target.innerHTML=element.inner_html;
        target.style.cssText=`${element.cssText}`;
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
        if(isAttrDesign){
            const {cleaned:cleanClasses}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow","showName"]});
            target.className=cleanClasses.join(" ");
            divCont.appendChild(target);
             this._modSelector.editElement({target,idValues,selRowCol:null});
                divCont.onclick=async(e:MouseEvent)=>{
                    if(!e) return;
                    divCont.classList.toggle("isActive");
                    target.classList.toggle("isActive");
                    await this.removeMainElement({parent,divCont,target,idValues}).then(async(res)=>{
                        if(res&& !res.divCont){
                            Misc.message({parent,msg:"removed",type_:"success",time:600});
                        }
                    });
            };
        };
        
     
        const arrDivCont:arrDivContType={divCont,target,placement:element.placement,ele:element,isNormal:false,chart:null,sel:null}
        return arrDivCont
    };


    //PARENT: main.textarea
    circlesDesign(parent:HTMLElement,idValues:idValueType[]){
        const rand=Math.round(Math.random()*100);
        const idEnum="isCircle";

        const minHeight=200;
        const divCont=document.createElement("div");
        divCont.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;"
        const target=document.createElement("div");
        target.id=`div-circleDesign-${rand}`;
        const eleId=target.id;
        const node=target.nodeName.toLowerCase();
        target.setAttribute("is-element","true");
        target.style.cssText=`width:100%;border-radius:12px;display:flex;flex-direction:column;align-items:center;min-height:${minHeight}px;position:relative;justify-content:center;padding:1rem;margin-inline:auto;`;
        target.setAttribute("name","div");
        target.setAttribute("data-circle-design","true");
        //GENERATES PATTERN
        //GENERATES PATTERN
        this.circleOptionGen({target:target,maxRand:undefined,stroke:undefined,fill:undefined})//generate pattern
        //GENERATES PATTERN
         this.formCircleGen(target).then(async(res)=>{
            if(res){
                res.form.onsubmit=(e:SubmitEvent)=>{
                    if(e){
                        e.preventDefault();
                        const formdata=new FormData(e.currentTarget as HTMLFormElement);
                        const fill=formdata.get("fill") ? formdata.get("fill") as string : undefined;
                        const stroke=formdata.get("stroke") ? formdata.get("stroke") as string : undefined;
                        const rand=parseInt(formdata.get("random") as string) as number;
                        this.circleOptionGen({target,maxRand:rand,stroke,fill})//generate pattern
                        target.removeChild(res.popup);
                        idValues.push({eleId,id:idEnum,attValue:idEnum});
                        idValues.push({eleId,id:"elementId",attValue:eleId});
                        idValues.push({eleId,id:"ID",attValue:eleId});
                        idValues.push({eleId,id:"type",attValue:"design"});
                        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
                        this.element={...this.element,
                            type:"design",
                            attr:idEnum,
                             name:node,
                             eleId,
                            inner_html:target.innerHTML,
                            class:cleaned.join(" "),

                        };
                        this.elementAdder({target,element:this.element,idValues,type:"isCircle"}).then(async(res)=>{
                            if(res){
                                const ele=res.ele as elementType;
                                divCont.setAttribute("data-placement",`${ele.placement}`);
                            }
                        });
                        divCont.onclick=(e:MouseEvent)=>{
                            if(e){
                                divCont.classList.toggle("isActive");
                                target.classList.toggle("isActive");
                                this.removeMainElement({parent,divCont,target,idValues});
                                this.updateElement({target,idValues});
                            }
                        };
                        this._modSelector.editElement({target,idValues,selRowCol:null});
                    }
                };
            }
        });
        //GENERATES PATTERN
        const para=document.createElement("p");
        para.textContent="edit Me";
        para.style.cssText="margin-inline:auto;margin-block:2rem;padding-inline:1rem;position:relative;top:30%;"
        para.setAttribute("contenteditable","true");
        target.appendChild(para);
        divCont.appendChild(target);
        parent.appendChild(divCont);
        Misc.fadeIn({anchor:divCont,xpos:50,ypos:200,time:400});
        Misc.matchMedia({parent:para,maxWidth:420,cssStyle:{top:"60%",paddingInline:"10px"}})
     }

     async formCircleGen(target:HTMLElement){
        const popup=document.createElement("div");
        popup.style.cssText="position:absolute;width:300px;top:100%;left:30%;right:30%;display:flex;place-items:center;";
        const form=document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;";
        const {input:fInput,label:flable,formGrp:fformGrp}=Nav.inputComponent(form);
        flable.textContent="fill"
        fformGrp.style.display="flex";
        fformGrp.style.flexDirection="column";
        fformGrp.style.alignItems="center";
        fInput.name="fill";
        fInput.value="black";
        fInput.id="fill";
        fInput.type="color";
        fInput.placeholder="background color";
        flable.setAttribute("for",fInput.id);
        const {input:sInput,label:slable,formGrp:sformGrp}=Nav.inputComponent(form);
        slable.textContent="line"
        sformGrp.style.display="flex";
        sformGrp.style.flexDirection="column";
        sformGrp.style.alignItems="center";
        sInput.name="stroke"
        sInput.id="stroke";
        sInput.value="red";
        sInput.type="color";
        sInput.placeholder="line color";
        slable.setAttribute("for",sInput.id);
        const {input:rInput,label:rlable,formGrp:rformGrp}=Nav.inputComponent(form);
        rlable.textContent="random number"
        rformGrp.style.display="flex";
        rformGrp.style.flexDirection="column";
        rInput.name="random";
        rInput.id="random";
        rInput.type="number";
        rInput.min="10";
        rInput.max="100";
        rInput.value="40";
        rInput.placeholder="10";
        rlable.setAttribute("for",sInput.id);
        Misc.simpleButton({anchor:form,type:"submit",bg:Nav.btnColor,color:"white",time:400,text:"save"});
        popup.appendChild(form);
        target.appendChild(popup);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{left:"25%",right:"25%"}});
        Misc.matchMedia({parent:popup,maxWidth:420,cssStyle:{left:"10%",right:"10%"}});
        fInput.onchange=(e:Event)=>{
            if(e){
                const fill_=(e.currentTarget as HTMLInputElement).value;
                const stroke_=(sInput as HTMLInputElement).value;
                const getFill=Design.hexToRgbA(fill_) as string;
                const getStroke=Design.hexToRgbA(stroke_) as string;
                const rand_=parseInt((rInput as HTMLInputElement).value as string) as number;
                //GENERATES PATTERN
                this.circleOptionGen({target,maxRand:rand_,stroke:getStroke,fill:getFill})//generate pattern
                //GENERATES PATTERN
            }
        }
        sInput.onchange=(e:Event)=>{
            if(e){
                const stroke_=(e.currentTarget as HTMLInputElement).value;
                const fill_=(fInput as HTMLInputElement).value;
                const getFill=Design.hexToRgbA(fill_) as string;
                const getStroke=Design.hexToRgbA(stroke_) as string;
                const rand_=parseInt((rInput as HTMLInputElement).value as string) as number;
                //GENERATES PATTERN
                this.circleOptionGen({target:target,maxRand:rand_,stroke:getStroke,fill:getFill})//generate pattern
                //GENERATES PATTERN
            }
        }
        rInput.onchange=(e:Event)=>{
            if(e){
                const rand_=parseInt((sInput as HTMLInputElement).value as string) as number;
                const fill_=(fInput as HTMLInputElement).value;
                const stroke_=(sInput as HTMLInputElement).value;
                const getFill=Design.hexToRgbA(fill_) as string;
                const getStroke=Design.hexToRgbA(stroke_) as string;
                //GENERATES PATTERN
                this.circleOptionGen({target:target,maxRand:rand_,stroke:getStroke,fill:getFill})//generate pattern
                //GENERATES PATTERN
            }
        }
        return Promise.resolve({form:form,popup:popup}) as Promise<{form:HTMLFormElement,popup:HTMLElement}>;
     }

     circleOptionGen(item:{target:HTMLElement,maxRand:number|undefined,stroke:string|undefined,fill:string|undefined}){
        const {target,maxRand,stroke,fill}=item;
        // CLEAN UP
        const getelements=target.querySelectorAll("div.svgCont-circle") as any as HTMLElement[];
        [...getelements].map(ele=>(target.removeChild(ele)));
        // CLEAN UP
        const arr:{x:number,y:number,width:number,fill:string,stroke:string}[]=[];
        const max=maxRand || 40;

        const stroke_=stroke || "rgba(30, 1, 1,1)";//hsl(0:red-255:blue,0%:light-100%:dark,98%:ligtest-0%:darkest)
        const fill_= fill || "rgba(30, 1, 1,1)";
        let x:number=0; let y:number=0;
        for(let i=1;i<=200;i+=5){
            const rand=Math.round(Math.random()*max)
            const _fill_=this.colorInjector(fill,rand) ? this.colorInjector(fill,rand) as string :stroke_;
            const _stroke_=this.colorInjector(stroke,rand) ? this.colorInjector(stroke,rand) as string : fill_;
            if(rand>100){
                const randAdjust:number=100-rand;
                if(i<96){
                    arr.push({x:i,y:rand*2,width:rand + randAdjust-5,fill:_fill_,stroke:_stroke_})
                }else{
                    const xi=200-i + 1;
                    if(xi>0){
                    arr.push({x:xi,y:rand*2,width:rand + randAdjust-5,fill:_fill_,stroke:_stroke_})
                    }
                }
            }else if(i <96){
                arr.push({x:i,y:rand*2,width:rand,fill:_fill_,stroke:_stroke_})
            }else{
                const xi=200-i + 1;
                    if(xi>0){
                    arr.push({x:xi,y:rand*2,width:rand,fill:_fill_,stroke:_stroke_})
                    }
            }
        }
        arr.map(xy=>{
            const width=xy.width;
            x=xy.x;
            if(xy.y <100){
                y=xy.y
            }else{
                y=5;
            }
           
            const _stroke_=xy.stroke;
            const _fill_=xy.fill;
            this.generateCircle({target,x,y,width,fill:_fill_,stroke:_stroke_});
        });
     }
     colorInjector(color:string|undefined,rand:number){
        if(color){
            const regColor:RegExp=/^(rgba\()(\d{3},)(\d{3},)(\d{3},)\d\)/;
            if(regColor.test(color)){
                const inner=color.split("rgba(")[1];
                const core=inner.split(")")[0];
                let hexs=core.split(",");
                hexs = hexs.map((hex,index)=>{
                    if(index===0){
                        const parse=parseInt(hex as string) as number;
                        if(rand < 100 && rand > 0 && parse + 100 <255){
                            hex= String(rand + parse);
                        }
                    }else if(index===1){
                        const parse=parseInt(hex as string) as number;
                        if(rand < 100 && rand > 0){
                            hex= String(parse - rand);
                        }
                    }else if(index===2){
                        const parse=parseInt(hex as string) as number;
                        if(rand < 100 && rand > 0 && parse + 100 <255){
                            hex= String(parse + rand);
                        }
                    }

                    return hex;
                });
                return `rgba(${hexs.join(",")})`;
            }else{
                return color;
            }
        }
     }
    generateCircle(item:{target:HTMLElement,x:number,y:number,width:number,fill:string,stroke:string}){
        const {target,x,y,width,fill,stroke}=item;
        target.style.position="relative";
        const svgCont=document.createElement("div");
        svgCont.className="svgCont-circle";
        svgCont.id=`svgCont-circle -${x}`;
        svgCont.style.cssText=`position:absolute;padding:5px;width:${(width + 3)*1}px;height:${(width +3)*1}px;display:flex;place-items:center;border-radius:50%;box-shadow:1px 1px 12px 1px ${stroke};z-index:20;`;
        svgCont.style.top=`${y}px`;
        svgCont.style.left=`${x}%`;
        const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
        svg.setAttribute('version', 'http://www.w3.org/2000/svg');
        svg.setAttribute("viewBox",`0 0 ${width} ${width}`);//min-x min-y width height
        const circle=document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute("fill",`${fill}`);
        circle.setAttribute("stroke",`${stroke}`);
        circle.setAttribute("cx",`${width/2}`);//length|percent
        circle.setAttribute("cy",`${width/2}`);//length|percent
        circle.setAttribute("r",`${width/2}`);//length|%
        svg.style.display="block";
        svg.appendChild(circle);
        svgCont.appendChild(svg);
        target.appendChild(svgCont);
    }
      //---------SEMI-CIRCLE-------------------------//
     //Wave- Art
     signalWave(parent:HTMLElement,idValues:idValueType[]){
        const idEnum="isWave"
        const container=document.createElement("div");
        container.id="polyMain";
        container.style.cssText="position:relative;height:auto;background:white;z-index:200;width:100%";
        parent.appendChild(container);
        Misc.fadeIn({anchor:container,xpos:100,ypos:50,time:500});
        this.polyGenerator({parent:container,color:"",omega:10,alpha:10,stroke:"blue"});
        this.formGenerator(container).then(async(res)=>{
            if(res){
                res.omegaInput.onchange=(e:Event)=>{
                    if(e){
                        const value=parseInt((e.currentTarget as HTMLInputElement).value);
                        const stroke=res.strokeSel.value;
                        const color=res.bgSelect.value;
                        const alpha=parseInt(res.alphaInput.value);
                        this.polyGenerator({parent:container,color,omega:value,alpha,stroke});
                    }
                };
                res.alphaInput.oninput=(e:Event)=>{
                    if(e){
                        const value=parseInt((e.currentTarget as HTMLInputElement).value);
                        const color=res.bgSelect.value;
                        const omega=parseInt(res.omegaInput.value);
                        const stroke=res.strokeSel.value;
                        this.polyGenerator({parent:container,color,omega,alpha:value,stroke});
                    }
                };
                res.bgSelect.oninput=(e:Event)=>{
                    if(e){
                        const color=(e.currentTarget as HTMLSelectElement).value;
                        const omega=parseInt(res.omegaInput.value);
                        const alpha=parseInt(res.alphaInput.value);
                        const stroke=res.strokeSel.value;
                        this.polyGenerator({parent:container,color,omega,alpha,stroke});
                    }
                };
                res.strokeSel.oninput=(e:Event)=>{
                    if(e){
                        const stroke=(e.currentTarget as HTMLSelectElement).value;
                        const omega=parseInt(res.omegaInput.value);
                        const alpha=parseInt(res.alphaInput.value);
                        const color=res.bgSelect.value;
                        this.polyGenerator({parent:container,color,omega,alpha,stroke});
                    }
                };
                res.change.onclick=(e:MouseEvent)=>{
                    if(e){
                        const stroke=res.strokeSel.value;
                        const color=res.bgSelect.value;
                        const omega=parseInt(res.omegaInput.value);
                        const alpha=parseInt(res.alphaInput.value);
                        this.polyGenerator({parent:container,color,omega,alpha,stroke})
                    }
                }
                res.close.onclick=(e:MouseEvent)=>{
                    if(e){
                        const color=res.bgSelect.value;
                        const stroke=res.strokeSel.value;
                        const omega=parseInt(res.omegaInput.value);
                        const alpha=parseInt(res.alphaInput.value);
                        const {target,divCont}=this.polyGenerator({parent:parent,color,omega,alpha,stroke});
                        const eleId=target.id;
                        const node=target.nodeName.toLowerCase();
                        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
                        idValues.push({eleId,id:idEnum,attValue:idEnum});
                        idValues.push({eleId,id:"design",attValue:"design"});
                        idValues.push({eleId,id:"type",attValue:"design"});
                        idValues.push({eleId,id:"attr",attValue:idEnum});
                        this.element={...this.element,
                            type:"design",
                            attr:idEnum,
                            inner_html:target.innerHTML,
                            class:cleaned.join(" "),
                            cssText:target.style.cssText,
                            name:node
                        }
                        this.elementAdder({target,element:this.element,idValues,type:"isWave"}).then(async(svg)=>{
                            if(svg){
                                const ele=svg.ele as elementType;
                                divCont.setAttribute("data-placement",`${ele.placement}-A`);
                                Misc.fadeOut({anchor:res.cont,xpos:50,ypos:100,time:400});
                                setTimeout(()=>{
                                    container.removeChild(res.cont);
                                });
                                this._modSelector.editElement({target:svg.target,idValues,selRowCol:null});
                                divCont.onclick=(e:MouseEvent)=>{
                                    if(e){
                                        svg.target.classList.toggle("isActive");
                                        divCont.classList.toggle("isActive");
                                    }
                                };
                                this.removeMainElement({parent:container,divCont,target:svg.target,idValues}).then(async(reParent)=>{
                                    if(reParent){
                                        parent.removeChild(container);
                                    }
                                });
                            }
                        });
                    }
                }
            }
        });
        
     }
     formGenerator(parent:HTMLElement):Promise<{alphaInput:HTMLInputElement,omegaInput:HTMLInputElement,bgSelect:HTMLSelectElement,strokeSel:HTMLSelectElement,change:HTMLButtonElement,close:HTMLButtonElement,cont:HTMLElement}>{
        const container=document.createElement("div");
        container.id="formGenerator";
        container.style.cssText="position:absolute;width:fit-content;height:auto;box-shadow:1px 1px 12px 1px black;background:white;z-index:200;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;padding:1rem;border-radius:16px;";
        container.style.top="100%";
        container.style.right="35%";
        container.style.left="35%";
        const inputGrp=document.createElement("div");
        inputGrp.style.cssText="display:flex;justify-content:space-around;align-items:center;gap:1rem;width:100%;";
        const {input:omegaInput,label:omega,formGrp}=Nav.inputComponent(inputGrp);
        formGrp.style.gap="2rem";
        omegaInput.style.cssText="margin:auto;";
        omega.textContent="carrier";
        omegaInput.name="omega";
        omegaInput.type="number";
        omegaInput.placeholder="1";
        omegaInput.value="10";
        omegaInput.min="1";
        omegaInput.max="100";
        const {input:alphaInput,label:alpha,formGrp:alphaGrp}=Nav.inputComponent(inputGrp);
        alphaGrp.style.gap="2rem";
        alpha.textContent="signal";
        alphaInput.style.cssText="margin:auto;";
        alphaInput.name="omega";
        alphaInput.type="number";
        alphaInput.placeholder="1";
        alphaInput.value="10";
        alphaInput.min="1";
        alphaInput.max="100";
        const {select:bgSelect,label:selLabel}=Misc.selectComponent({parent:inputGrp,name:"color",selects:Misc.colors,cssStyle:{bgColor:"true",color:"red"}});
        selLabel.textContent="bg-color";
        const {select:strokeSel,label:strokeLabel}=Misc.selectComponent({parent:inputGrp,name:"color",selects:Misc.colors,cssStyle:{bgColor:"true",color:"red"}});
        strokeLabel.textContent="line-color";
        container.appendChild(inputGrp);
        const btnGrp=document.createElement("div");
        btnGrp.style.cssText="margin:auto;display:flex;justify-content:space-around;align-items:center;";
        const {button:change}=Misc.simpleButton({anchor:btnGrp,bg:"black",color:"white",type:"button",text:"change",time:400});
        const {button:close}=Misc.simpleButton({anchor:btnGrp,bg:"black",color:"white",type:"button",text:"close",time:400});
        container.appendChild(btnGrp);
        parent.appendChild(container);
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{left:"20%",right:"20%"}});
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{left:"10%",right:"10%"}});
        return Promise.resolve({alphaInput,omegaInput,bgSelect,strokeSel,change,close,cont:container}) as Promise<{alphaInput:HTMLInputElement,omegaInput:HTMLInputElement,bgSelect:HTMLSelectElement,strokeSel:HTMLSelectElement,change:HTMLButtonElement,close:HTMLButtonElement,cont:HTMLElement}>;
        
     }

     polyGenerator(item:{parent:HTMLElement,omega:number,alpha:number,color:string,stroke:string}):{target:HTMLElement,divCont:HTMLElement}{
        const {parent,omega,alpha,color,stroke}=item;
        Header.cleanUpByID(parent,"polyGenerator");
        const container=document.createElement("div");
        container.id="polyGenerator"
        container.style.cssText="width:100%;border-radius:16px;position:relative;display:flex;justify-content:center;align-items:center;flex-direction:column;";
        const divCont=document.createElement("div");
        divCont.className="eleContainer";
        divCont.style.cssText="padding:1rem;width:100%;";
        divCont.setAttribute("data-placement","A");
        const svgOne = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const pathOne = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const svgTwo = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const pathTwo = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const genCircle=(item:{x:number,omega:number,alpha:number}):number=>{
            const {x,omega,alpha}=item;
            const wave=Math.sin(x*omega*0.01)*Math.cos(x*alpha*.01 + 0.3)
            const num=(x*.2*(1+(wave))/3);
                return num;
        };
        const points:number[] = [];
        const pointsTwo:number[] = [];
        const max=2000;
        let y=Math.floor(max/2);
        for(let i = 0; i <= max; i+= 0.5) {
            if(i < max/3){
                points.push(i, genCircle({x:i,omega,alpha}));
                pointsTwo.push(i, genCircle({x:i,omega,alpha}));
            }else{
                y-=1
                points.push(i, genCircle({x:y,omega,alpha}));
                pointsTwo.push(i, genCircle({x:y,omega,alpha}));
            }
            
        }
        //svgContainer
        const svgCont=document.createElement("div");
        svgCont.id=`svgCont-${Math.round(Math.random()*1000)}`;
        svgCont.style.cssText="padding:0rem;margin:0px;position:relative;z-index:200";
        svgCont.setAttribute("is-element","true");
        svgCont.setAttribute("data-placement","A");
        svgCont.setAttribute("is-wave","true");
        svgCont.classList.add("isActive");
        //svgContainer
        //text//
        const paraH6=document.createElement("h6");
        paraH6.style.cssText="margin-block:2rem;margin-inline:1rem;padding:1rem;font-size:1rem;text-wrap:pretty;text-align:center;";
        paraH6.style.position="absolute";
        paraH6.style.inset="20%";
        paraH6.className="text-center lean display-6";
        paraH6.setAttribute("contenteditable","true");
        paraH6.setAttribute("is-element","true");
        paraH6.textContent="EDIT ME";
        //text//
        svgOne.setAttribute('width', `${max}`);
        svgOne.setAttribute('height', `${200}`);
        svgOne.setAttribute('version', 'http://www.w3.org/2000/svg');
        svgOne.setAttribute('xmlns', '1.1');
        pathOne.setAttribute('d', `M${points.shift()} ${points.shift()} L ${points.join(' ')}`);
        pathOne.setAttribute('fill', `${color}`);
        pathOne.setAttribute('fill-opacity', '0.5');
        pathOne.setAttribute('stroke', stroke);
        pathOne.setAttribute('stroke-width', '1');
        svgOne.append(pathOne);
        svgOne.style.cssText="display:block;width:100%;";
        svgOne.id=`svg-one-poly`;
        svgCont.appendChild(svgOne);
        ////
        svgTwo.setAttribute('width', `${max}`);
        svgTwo.setAttribute('height', `${200}`);
        svgTwo.setAttribute('version', 'http://www.w3.org/2000/svg');
        svgTwo.setAttribute('xmlns', '1.1');
        pathTwo.setAttribute('d', `M${pointsTwo.shift()} ${pointsTwo.shift()} L ${pointsTwo.join(' ')}`);
        pathTwo.setAttribute('fill', `${color}`);
        pathTwo.setAttribute('fill-opacity', '0.5');
        pathTwo.setAttribute('stroke', stroke);
        pathTwo.setAttribute('stroke-width', '1');
        svgTwo.append(pathTwo);
        svgTwo.style.cssText="display:block;width:100%;position:absolute;inset:0%;";
        svgTwo.style.rotate="180deg";
        svgTwo.id=`svg-two-poly`;
        svgCont.appendChild(svgOne);
        svgCont.appendChild(svgTwo);
        svgCont.appendChild(paraH6);
        divCont.appendChild(svgCont);
        container.appendChild(divCont);
        parent.appendChild(container);
        return {target:svgCont,divCont}
     }
     
     //Wave- Art

      ////-------------ARROW-------------------------------///
     arrowDesign(parent:HTMLElement,idValues:idValueType[]){
        const idEnum="isArrow";
        const width=35;
        const height=window.innerWidth < 900 ?(window.innerWidth < 420 ? "50vh":"20vh"):"15vh";
        const middleWidth=width*0.5;
        const arrow=0.25*width;
        const divCont=document.createElement("div");
        divCont.style.cssText="margin:0;margin-inline:auto;padding:0.5rem";
        const target=document.createElement("div");
        const node=target.nodeName.toLowerCase();
        target.setAttribute("data-arrow-design","true");
        target.classList.add("arrowDesign");
        target.setAttribute("is-element","true");
        target.id=`arrow-${Math.round(Math.random()*1000)}`;
        const eleId=target.id;
        target.style.cssText=`display:inline-flex;flex-wrap:nowrap;margin-block:1.5rem;padding:1rem;align-items:center;justify-content:center;position:relative;min-height:10vh;max-height:50vh;min-width:15vw;height:${height};margin-inline:auto;`;
        target.style.height=height;
        const left=document.createElement("div");
        left.id="arrowLeft";
        left.style.cssText="flex:1 1 25%;margin:auto;order:1;clip-path: polygon(100% 0%, 50% 50%, 100% 100%);width:25%;background-color:maroon;height:inherit;";
        const middle=document.createElement("div");
        const innerText=document.createElement("p");
        innerText.style.cssText="margin:auto;min-width:10vw;width:100%;text-wrap:wrap;";
        innerText.setAttribute("contenteditable","true");
        innerText.textContent=" for that segment in the animation or transition or for that segment in the animation or transition"
        middle.style.cssText=`flex:1 1 50%;height:inherit;border:1px solid red;order:2;align-self:flex-start;position:relative;display:grid;place-items:center;padding-inline:2rem;width:100%;min-width:15vw;position:relative;`;
        middle.classList.add("arrow-design-middle");
        middle.style.minWidth=`${middleWidth}vw`;
        const right=document.createElement("div");
        right.id="arrowRight";
        right.style.cssText="flex:1 1 25%;margin:auto;order:3;clip-path: polygon(0% 0%, 50% 50%, 0% 100%);width:25%;background-color:maroon;height:inherit;";
        right.style.minWidth=`${arrow}vw`;
        left.style.minWidth=`${arrow}vw`;

        middle.appendChild(innerText);
        target.appendChild(left);
        target.appendChild(middle);
        target.appendChild(right);
        divCont.appendChild(target);
       
        Misc.matchMedia({parent:middle,maxWidth:400,cssStyle:{flex:"1 1 100%",overflowY:"scroll"}});
        this.arrowColor({main:target,targetLeft:left,targetRight:right,idValues});
        idValues.push({eleId,id:idEnum,attValue:idEnum});
        idValues.push({eleId,id:"elementId",attValue:eleId});
        idValues.push({eleId,id:"ID",attValue:eleId});
        idValues.push({eleId,id:"type",attValue:"design"});
        idValues.push({eleId,id:"design",attValue:"design"});
        
        divCont.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                target.classList.toggle("isActive");
                innerText.classList.toggle("isActive")
                this.removeMainElement({parent,divCont,target,idValues})
            }
        });
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
        this.element={...this.element,
            eleId,
            inner_html:target.innerHTML,
            class:cleaned.join(" "),
            cssText:target.style.cssText,
            attr:idEnum,
            type:"design",
            name:node
        }
        this.elementAdder({target,element:this.element,idValues,type:"isArrow"}).then(async(res)=>{
            if(res?.idValues){
                idValues=res.idValues
                const ele=res.ele as unknown as elementType;
                divCont.setAttribute("data-placement",`${ele.placement}`)
            }
        });
        this._modSelector.editElement({target,idValues,selRowCol:null});
        parent.appendChild(divCont);
        Misc.fadeIn({anchor:divCont,xpos:100,ypos:50,time:500});
    }
    arrowColor({main,targetLeft,targetRight,idValues}:{main:HTMLElement,targetLeft:HTMLElement,targetRight:HTMLElement,idValues:idValueType[]}){
       
        Header.cleanUpByID(main,"arrowColor");
        targetLeft.style.position="relative";
        targetRight.style.position="relative";
        main.style.position="relative";
        main.style.zIndex="";
        targetLeft.style.zIndex="";
        targetRight.style.zIndex="";
        const container=document.createElement("div");
        container.id="arrowColor";
        container.style.cssText="position:absolute;width:clamp(200px,300px,350px);background:white;z-index:100;height:12vh;border-radius:12px;box-shadow:1px 1px 10px 1px black;display:flex;flex-direction:column;justify-content:center;align-items;center;gap:1rem;";
        container.style.top="110%";
        container.style.left="35%";
        container.style.right="35%";
        const selectgrp=document.createElement("div");
        selectgrp.style.cssText="margin:auto;display:flex;justify-content:space-around;align-items:center;gap:2rem;width:100%;"
        selectgrp.id="select-arrow-group";
        selectgrp.className="select-arrow-group";
        const {select:leftSelect}=Misc.selectComponent({parent:selectgrp,name:"left-side",selects:Misc.colors,cssStyle:{bgColor:"true",margin:"auto"}});
        const {select:rightSelect}=Misc.selectComponent({parent:selectgrp,name:"left-side",selects:Misc.colors,cssStyle:{bgColor:"true",margin:"auto"}});
        container.appendChild(selectgrp);
        const {button}=Misc.simpleButton({anchor:container,bg:Nav.btnColor,color:"white",type:"button",text:"okay",time:400});
        main.appendChild(container);
        Misc.matchMedia({parent:container,maxWidth:420,cssStyle:{left:"5%",right:"5%"}});
        
        leftSelect.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                if(value !=="remove"){
                const attr=`background-color:${value}`;
               targetLeft.style.cssText=HtmlElement.addStyle(targetLeft,attr);
               const attr1=`box-shadow:1px 1px 7px 1px ${value}`;
               setTimeout(()=>{
                   targetLeft.style.cssText=HtmlElement.addStyle(targetLeft,attr1);
                },0);
                this.updateElement({target:main,idValues});
            }
              
              
            }
        });
        rightSelect.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                if(value !=="remove"){
                    const attr=`background-color:${value}`;
                targetRight.style.cssText=HtmlElement.addStyle(targetRight,attr);
                const attr1=`box-shadow:1px 1px 7px 1px ${value}`;
                setTimeout(()=>{
                    targetRight.style.cssText=HtmlElement.addStyle(targetRight,attr1);
                },0);
                this.updateElement({target:main,idValues});
                }
            }
        });
        button.onclick=(e:MouseEvent)=>{
            if(e){
                const gettextarea=document.querySelector("div#textarea") as HTMLElement;
                Misc.growOut({anchor:container,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    Header.cleanUpByID(gettextarea,"arrowColor");
                    this.updateElement({target:main,idValues});
                },398);
                
            }
        };
    }
    ////-------------ARROW-------------------------------///

    ///---------------------SEMI-CIRCLE-----------//////
    arch(parent:HTMLElement,idValues:idValueType[]){
        const idEnum="arch";
        const attr="isArch";
        const type="design";
        
        const container=document.createElement("div");
        container.id="arch";
        container.style.cssText="margin-inline:auto;display:flex;flex-direction:column;position:relative;background-color:white;";
        parent.appendChild(container);
        Misc.fadeIn({anchor:container,xpos:100,ypos:100,time:500});
        this.archGenerator({parent:container,omega:1,boxShadow:"none",bg:"grey",stroke:"blue",height:1});
        //formContainer:background(fill),border,box-shadow;1+cos(omega*x), where < omega*X=PI<=>0
        this.formArchGenerator(container).then(async(res)=>{
            if(res){
                let omega=parseInt(res.omegaInput.value);
                let bg=res.bgSelect.value;
                let stroke=res.strokeSel.value;
                let height=parseInt(res.heightInput.value);
                res.omegaInput.oninput=(e:Event)=>{
                    if(e){
                        height=parseInt(res.heightInput.value);
                        omega=parseInt((e.currentTarget as HTMLInputElement).value);
                        bg=res.bgSelect.value;
                        stroke=res.strokeSel.value;
                        this.archGenerator({parent:container,omega,boxShadow:"none",bg,stroke,height});
                    }
                };
                res.heightInput.oninput=(e:Event)=>{
                    if(e){
                        height=parseInt((e.currentTarget as HTMLInputElement).value);
                        omega=parseInt((e.currentTarget as HTMLInputElement).value);
                        bg=res.bgSelect.value;
                        stroke=res.strokeSel.value;
                        this.archGenerator({parent:container,omega,boxShadow:"none",bg,stroke,height});
                    }
                };
                res.bgSelect.onchange=(e:Event)=>{
                    if(e){
                        height=parseInt(res.heightInput.value);
                        omega=parseInt(res.omegaInput.value);
                        bg=(e.currentTarget as HTMLSelectElement).value;
                        stroke=res.strokeSel.value;
                        this.archGenerator({parent:container,omega,boxShadow:"none",bg,stroke,height});
                    }
                };
                res.strokeSel.oninput=(e:Event)=>{
                    if(e){
                        height=parseInt(res.heightInput.value);
                        omega=parseInt(res.omegaInput.value);
                        bg=res.bgSelect.value;
                        stroke=(e.currentTarget as HTMLSelectElement).value;
                        this.archGenerator({parent:container,omega,boxShadow:"none",bg,stroke,height});
                    }
                };
                res.change.onchange=(e:Event)=>{
                    if(e){
                        omega=parseInt(res.omegaInput.value);
                        bg=res.bgSelect.value;
                        stroke=res.strokeSel.value;
                        height=parseInt(res.heightInput.value);
                        this.archGenerator({parent:container,omega,boxShadow:"none",bg,stroke,height:1});
                    }
                };
                
                res.close.onclick=async(e:MouseEvent)=>{
                    if(e){
                        const rand=Math.floor(Math.random()* 1000);
                        omega=parseInt(res.omegaInput.value);
                        bg=res.bgSelect.value;
                        stroke=res.strokeSel.value;
                        height=parseInt(res.heightInput.value);
                        Misc.fadeOut({anchor:res.cont,xpos:100,ypos:100,time:400});
                        setTimeout(async()=>{
                            const {ele,divCont}= await this.archGenerator({parent:parent,omega,boxShadow:"none",bg,stroke,height});
                            ele.id=`arch-${rand}`;
                            const eleId=ele.id;
                            Misc.growOut({anchor:container,scale:0,opacity:0,time:400});
                            setTimeout(()=>{container.removeChild(res.cont);},398);
                            this.element={...this.element,type,attr,name:"div"};
                            idValues.push({eleId,id:idEnum,attValue:"true"});
                            idValues.push({eleId,id:"elementId",attValue:eleId});
                            idValues.push({eleId,id:type,attValue:type});
                            idValues.push({eleId,id:attr,attValue:attr});
                            this.elementAdder({target:ele,element:this.element,idValues,type:"isArch"}).then(async(_res)=>{
                                if(_res){
                                    const _ele_=_res.ele as elementType;
                                    idValues=_res.idValues;
                                    divCont.setAttribute("data-placement",`${_ele_.placement}-A`)
                                    this.removeMainElement({parent,divCont,target:_res.target,idValues}).then(async(reParent)=>{
                                        if(reParent){
                                            parent.removeChild(container);
                                        }
                                    });
                                    this._modSelector.editElement({target:_res.target,idValues,selRowCol:null});
                                }
                            });
                            divCont.onclick=(e:MouseEvent)=>{
                                if(e){

                                    divCont.classList.toggle("isActive");
                                    ele.classList.toggle("isActive");
                                }
                            };
                        });
                    }
                };
               
            }
        });
    }
    formArchGenerator(parent:HTMLElement):Promise<{omegaInput:HTMLInputElement,bgSelect:HTMLSelectElement,strokeSel:HTMLSelectElement,change:HTMLButtonElement,close:HTMLButtonElement,cont:HTMLElement,heightInput:HTMLInputElement}>{
        const container=document.createElement("div");
        container.id="formArchGenerator";
        container.style.cssText="position:absolute;width:clamp(350px,450px,500px);height:auto;box-shadow:1px 1px 12px 1px black;background:white;z-index:200;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;padding:1rem;border-radius:16px;";
        container.style.top="100%";
        container.style.right="35%";
        container.style.left="35%";
        const inputGrp=document.createElement("div");
        inputGrp.style.cssText="display:flex;justify-content:space-around;align-items:center;gap:1rem;width:100%;";
        const {input:omegaInput,label:omega,formGrp}=Nav.inputComponent(inputGrp);
        formGrp.style.gap="0rem";
        formGrp.style.paddingInline="0rem";
        omegaInput.style.cssText="margin:auto;";
        omega.textContent="wave";
        omegaInput.name="omega";
        omegaInput.type="number";
        omegaInput.placeholder="1";
        omegaInput.value="10";
        omegaInput.min="1";
        omegaInput.max="100";
        const {input:heightInput,label:height,formGrp:grpHeight}=Nav.inputComponent(inputGrp);
        grpHeight.style.gap="0rem";
        grpHeight.style.paddingInline="0rem";
        heightInput.style.cssText="margin:auto;";
        height.textContent="height";
        heightInput.name="omega";
        heightInput.type="number";
        heightInput.placeholder="1";
        heightInput.value="10";
        heightInput.min="1";
        heightInput.max="100";
        const {select:bgSelect,label:selLabel}=Misc.selectComponent({parent:inputGrp,name:"color",selects:Misc.colors,cssStyle:{bgColor:"true",color:"red"}});
        selLabel.textContent="bg-color";
        const {select:strokeSel,label:strokeLabel}=Misc.selectComponent({parent:inputGrp,name:"color",selects:Misc.colors,cssStyle:{bgColor:"true",color:"red"}});
        strokeLabel.textContent="line-color";
        container.appendChild(inputGrp);
        const btnGrp=document.createElement("div");
        btnGrp.style.cssText="margin:auto;display:flex;justify-content:space-around;align-items:center;";
        const {button:change}=Misc.simpleButton({anchor:btnGrp,bg:"black",color:"white",type:"button",text:"change",time:400});
        const {button:close}=Misc.simpleButton({anchor:btnGrp,bg:"black",color:"white",type:"button",text:"close",time:400});
        container.appendChild(btnGrp);
        parent.appendChild(container);
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{left:"20%",right:"20%"}});
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{left:"10%",right:"10%",flexDirection:"column",justifyContent:"center",alignItems:"center"}});
        return Promise.resolve({omegaInput,bgSelect,strokeSel,change,close,cont:container,heightInput}) as Promise<{omegaInput:HTMLInputElement,bgSelect:HTMLSelectElement,strokeSel:HTMLSelectElement,change:HTMLButtonElement,close:HTMLButtonElement,cont:HTMLElement,heightInput:HTMLInputElement}>;
        
     }
    async archGenerator({parent,omega,boxShadow,bg,stroke,height}:{
        parent:HTMLElement,
        omega:number,
        boxShadow:string,
        bg:string,
        stroke:string,
        height:number

    }):Promise<{ele:HTMLElement,divCont:HTMLElement}>{
        
        Header.cleanUpByID(parent,"archGenerator");
        const container=document.createElement("div");
        container.id="archGenerator"
        container.style.cssText="width:100%;border-radius:16px;position:relative;display:flex;justify-content:center;align-items:center;flex-direction:column;";
        const divCont=document.createElement("div");
        divCont.id="eleContainer-arch";
         this._modSelector.dataset.insertcssClassIntoComponents({
            target:divCont,
            level:"element",
            headerType:undefined,
            id:"isArch",
            loc:"htmlElement",
            type:"design"

        });
        divCont.style.cssText="padding:1rem;width:100%;";
        divCont.setAttribute("data-placement","A");
        const svgOne = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const pathOne = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const svgTwo = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const pathTwo = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const genCircle=(item:{x:number,omega:number,height:number}):number=>{
            //1<omega<100
            const {x,omega}=item;
            const wave=Math.asin(Math.sqrt(1-(Math.cos(x*omega)*Math.cos(x*omega))));
            const numY=(height + Math.sqrt(x)*wave);
                return numY;
        };
        const points:number[] = [];
        const pointsTwo:number[] = [];
        const max=2000;
        let y=Math.floor(max/2);
        for(let i = 0; i <= max; i+= 1) {
            if(i < max/2){
                const result=genCircle({x:i,omega,height});
                if(!isNaN(result)){

                    points.push(i, result);
                    pointsTwo.push(i, result);
                }
            }else{
                y-=1;
                const result=genCircle({x:y,omega,height});
                if(!isNaN(result)){
                    points.push(i, result);
                    pointsTwo.push(i, result);
                }
            }
            
        }
        //svgContainer
        const svgCont=document.createElement("div");
        svgCont.id=`svgCont-${Math.round(Math.random()*1000)}`;
        svgCont.style.cssText="padding:1rem;margin-block:2.5rem;position:relative;z-index:200;margin-inline:auto;min-height;padding-block:2rem;";
        svgCont.setAttribute("is-element","true");
        svgCont.setAttribute("data-placement","A");
        svgCont.setAttribute("is-arch","true");
        svgCont.classList.add("isActive");
        //svgContainer
        //text//
        const paraH6=document.createElement("h6");
        paraH6.id="paraH6";
        paraH6.style.cssText="margin-block:2rem;margin-inline:auto;padding:1rem;font-size:1rem;text-wrap:pretty;text-align:center;";
        paraH6.style.position="absolute";
        paraH6.style.inset="20%";
        paraH6.className="text-center lean display-6";
        paraH6.setAttribute("contenteditable","true");
        paraH6.setAttribute("is-element","true");
        paraH6.textContent="EDIT ME";
        //text//
        svgOne.setAttribute('width', `${max}`);
        svgOne.setAttribute('height', `${200}`);
        svgOne.setAttribute('version', 'http://www.w3.org/2000/svg');
        svgOne.setAttribute('xmlns', '1.1');
        pathOne.setAttribute('d', `M${points.shift()} ${points.shift()} L ${points.join(' ')}`);
        pathOne.setAttribute('fill', `${bg}`);
        pathOne.setAttribute('fill-opacity', '0.5');
        pathOne.setAttribute('stroke', stroke);
        pathOne.setAttribute('stroke-width', '1');
        svgOne.append(pathOne);
        svgOne.style.cssText="display:block;width:100%;";
        svgOne.style.boxShadow=boxShadow;
        svgOne.id=`svg-one-arch`;
        svgCont.appendChild(svgOne);
        ////
        svgTwo.setAttribute('width', `${max}`);
        svgTwo.setAttribute('height', `${200}`);
        svgTwo.setAttribute('version', 'http://www.w3.org/2000/svg');
        svgTwo.setAttribute('xmlns', '1.1');
        pathTwo.setAttribute('d', `M${pointsTwo.shift()} ${pointsTwo.shift()} L ${pointsTwo.join(' ')}`);
        pathTwo.setAttribute('fill', `${bg}`);
        pathTwo.setAttribute('fill-opacity', '0.5');
        pathTwo.setAttribute('stroke', stroke);
        pathTwo.setAttribute('stroke-width', '1');
        svgTwo.append(pathTwo);
        svgTwo.style.cssText="display:block;width:100%;position:absolute;inset:0%;";
        svgTwo.style.rotate="180deg";
        svgTwo.style.boxShadow=boxShadow;
        svgTwo.id=`svg-two-arch`;
        svgCont.appendChild(svgOne);
        svgCont.appendChild(svgTwo);
        svgCont.appendChild(paraH6);
        divCont.appendChild(svgCont);
        container.appendChild(divCont);
        parent.appendChild(container);
        Misc.matchMedia({parent:paraH6,maxWidth:500,cssStyle:{inset:"0%"}});
        return {ele:svgCont,divCont}
     }

    ///---------------------SEMI-CIRCLE-----------//////
    //FROM SIDEBAR PARENT===Main.textarea
    titleArt(parent:HTMLElement,idValues:idValueType[]){
        const getHeight=getComputedStyle(parent).getPropertyValue("height");
        const height=Number(getHeight.split("px")[0]);
        const idEnum="isArt";
        const attr="isArt";
        const type="design";
        parent.style.position="relative";
        Header.cleanUpByID(parent,"popup-title-art");
        const popup=document.createElement("div");
        popup.id="popup-title-art";
        popup.className="popup";
        popup.setAttribute("is-popup","true");
        popup.style.cssText="position:absolute;box-shadow:1px 1px 10px black,-1px -1px 12px 1px blue;border-radius:20px;min-height:15vh;z-index:200;background-color:white;";
        popup.style.top=`${height/2}px`;
        popup.style.left="10%";
        popup.style.right="10%";
        const row = document.createElement("div");
        row.className="row";
        row.style.cssText="display:flex;flex-wrap:wrap;gap:1.25rem;"
        const arrTypes:{name:string,style:string}[]=[{name:"style-one",style:"title-art-one"},{name:"style-two",style:"title-art-two"},{name:"style-three",style:"title-art-three"},{name:"style-four",style:"title-art-four"},{name:"style-five",style:"title-art-five"},{name:"style-six",style:"title-art-six"},{name:"style-seven",style:"title-art-seven"},];
        arrTypes.map((item)=>{
            const rand=Math.floor(Math.random()*1000);
            const col=document.createElement("div");
            col.className="col-md-4";
            col.style.cssText="display:flex;flex-direction:column;padding-inline:1rem;align-items:center;justify-content:center;padding-block:2rem;;box-shadow:1px 1px 6px grey;border-radius:12px;";
            const para=document.createElement("p");
            para.id=`${item.style}-${rand}`;
            para.style.margin="auto";
            para.textContent =item.name;
            para.classList.add(item.style);
            col.appendChild(para);
            const {button}=Misc.simpleButton({anchor:col,bg:Nav.btnColor,color:"white",text:item.name,time:400,type:"button"});
            row.appendChild(col);
            button.onclick=(e:MouseEvent)=>{
                if(e){
                    if(!Main.textarea) return;
                    const jsonSelected=JSON.stringify(item)
                    //ADD INPUT FOR TITLE=> CAN NOT EDIT!=> then feed it to text in designElement
                    this.addTextTitleArt({parent,popup,col,jsonSelected,idEnum,attr,type,idValues});
                }
            };
        });
        popup.appendChild(row);
        parent.appendChild(popup);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        Misc.matchMedia({parent:popup,maxWidth:700,cssStyle:{left:"0%",right:"0%"}});
        //DELETE
        const divx=document.createElement("div");
        divx.style.cssText = "position:absolute;top:0%;right:0%;font-size:16px;z-index:2000;border-radius:50%;";
        FaCreate({parent:divx,name:FaCrosshairs,cssStyle:{color:"black",fontSize:"16px",borderRadius:"50%"}});
        popup.appendChild(divx);
        divx.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                setTimeout(()=>{parent.removeChild(popup);},398);
            }
        };
        //DELETE

    }
    addTextTitleArt({parent,popup,col,jsonSelected,attr,idEnum,type,idValues}:{
        parent:HTMLElement,
        popup:HTMLElement,
        col:HTMLElement,
        jsonSelected:string,
        attr:idEnumType,
        idEnum:idEnumType,
        type:idEnumType,
        idValues:idValueType[]

    }){
       
        const form=document.createElement("form");
        const {name}=JSON.parse(jsonSelected) as {name:string,style:string};
        form.style.cssText="position:absolute;box-shadow:1px 1px 10px black,-1px -1px 12px 1px blue;border-radius:20px;min-height:5vh;z-index:200;background-color:white;display:flex;flex-direction:column;gap:1.5rem;align-items:center;justify-content:center;margin-block:1.5rem;";
        form.id="form-title";
        const {input,label}=Nav.inputComponent(form);
        input.type="text";
        input.placeholder="type your title";
        input.id="input_title";
        input.name="title";
        label.textContent="your title";
        const {button:btn}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"White",text:name,time:400,type:"button"});
        btn.disabled=true;
        btn.style.marginBottom="2rem;"
        col.appendChild(form);
        input.onchange=(ev:Event)=>{
            if(ev){
                btn.disabled=false;
                const title=(ev.currentTarget as HTMLInputElement).value;
                (input as HTMLInputElement).value=title;
            }
        };
        btn.onclick=(e:MouseEvent)=>{
            if(e){
                const parseSelected=JSON.parse(jsonSelected) as {name:string,style:string};
                    const title=(input as HTMLInputElement).value as string;
                    parseSelected.name=title;
                    const jsonReSelected=JSON.stringify(parseSelected)
                    this.designElement({
                        parent:Main.textarea as HTMLElement,
                        eleName:"p",
                        selected:jsonReSelected,
                        idEnum,
                        attr,
                        type,
                        idValues

                    });
                    Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                    setTimeout(()=>{parent.removeChild(popup);},398);
                
            }
        };
    };
    //FROM DESIGN
     designElement({parent,eleName,selected,idEnum,attr,type,idValues}:{
        parent: HTMLElement,
        eleName:string,
        selected:string,
        idEnum:idEnumType,
        attr:idEnumType,
        type:idEnumType,
        idValues:idValueType[]
    }){
        //THIS ADDS ELEMENTS OTHER THAN UL,BLOCKQUOTE,TIME,A,IMG FROM MAIN CLASS
        
        const {name,style}=JSON.parse(selected) as {name:string,style:string};
        const rand=Math.floor(Math.random() * 1000);
        const less400=window.innerWidth < 400;
        const divCont=document.createElement('div');
        divCont.id=`divCont-design-${rand}`;

        divCont.style.paddingInline=less400 ? "0rem":"1.5rem";
        this._modSelector.dataset.insertcssClassIntoComponents({
            target:divCont,
            level:"element",
            headerType:undefined,
            id:"divContId",
            loc:"htmlElement",
            type:"design"

        });
        const target = document.createElement(eleName); //ICON.NAME=ELE TYPE
        target.id=`${eleName}-${rand}`;
        const eleId=target.id;
        target.textContent=name;
        target.classList.add(style);
        
        //THIS ADDS ATTRIBUTES ANC CLASSES TO THE ELEMENTS FROM DATASET CLASS
        idValues.push({eleId,id:"name",attValue:`${eleName}`});
        idValues.push({eleId,id:"design",attValue:"design"});
        Main.container=document.querySelector("section#main") as HTMLElement;
        const checkBgShade=([...(Main.container as HTMLElement).classList as any] as string[]).includes("bgShade");
        if(checkBgShade){
            target.classList.add("background-bgShade");
                divCont.classList.add("background-bgShade");
            }
            if(eleName==="p"){
                target.style.lineHeight="1.75rem";
            }
            
            // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
            divCont.appendChild(target);
            parent.appendChild(divCont);
            Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
            Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
            Misc.fadeIn({anchor:divCont,xpos:60,ypos:100,time:600});
            idValues.push({eleId,id:idEnum,attValue:idEnum});
            idValues.push({eleId,id:attr,attValue:idEnum});
            idValues.push({eleId,id:type,attValue:type});
            this.element={...this.element,name:eleName,eleId,type,attr:idEnum}
           
            this.elementAdder({target:target,element:this.element,idValues,type:"isArt"}).then(async(res)=>{
                if(res){
                   
                    const ele=res.ele as elementType;
                    this._modSelector.count=this._modSelector.count + 1;
                    divCont.setAttribute("data-placement",`${ele.placement}-A`);
                    
                    
                    this._modSelector.footerPlacement();//this shifts footer placement 
                    const maxcount=ModSelector.maxCount(this._modSelector.blog);
                    localStorage.setItem("placement",String(maxcount+1));
                    divCont.addEventListener("click", async(e: MouseEvent) => {
                        if (e) {
                            // console.log("click : 521:",target)
                            res.target.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            const focusOptions: focusOptions = { focusVisible: false, preventScroll: false }
                            target.focus(focusOptions);
                            
                            this.updateElement({ target: res.target, idValues });
                            if(([...target.classList as any] as string[]).includes("isActive")){
                                
                                await this.removeMainElement({parent,divCont:divCont,target:res.target,idValues});
                            }
                            
                        }
                    });
                }
            });
            
            this._modSelector.editElement({target,idValues,selRowCol:null})//pulls flex if exist from target attrubutes
            Misc.matchMedia({parent:divCont,maxWidth:400,cssStyle:{paddingInline:"0px",marginInline:"0px;"}});
    
    };

    addFill({parent,idValues}:{parent:HTMLElement,idValues:idValueType[]}){
        parent.style.position="relative";
        const desc="enter the number of words to be added then click on the button below to complete the request. it adds words after the original content."
        Header.cleanUpByID(parent,"popup-add-fill");
        if(!Main.textarea) return;
        const popup=document.createElement("div");
        popup.id="popup-add-fill";
        popup.className="popup";
        popup.setAttribute("is-popup","true");
        popup.style.cssText="position:absolute;box-shadow:1px 1px 10px black,-1px -1px 12px 1px blue;border-radius:20px;min-height:15vh;z-index:200;background-color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;";
        popup.style.top="20%";
        popup.style.left="10%";
        popup.style.right="10%";
        const getParas=Main.textarea.querySelectorAll("p") as any as HTMLParagraphElement[];
        const row=document.createElement("div");
        row.classList.add("row");
        row.style.cssText="width:100%;justify-content:flex-start;align-items:center;";
        [...getParas].map((para,index)=>{
            if(para){
               
                const col=document.createElement("div");
                col.className="col-md-6";
                col.id=`row-column-${index}`;
                col.setAttribute("data-addfill",desc);
                col.classList.add("addFill");
                col.classList.add("add-fill-row-col");
                col.setAttribute("is-column","true");
                col.style.cssText="display:flex;align-items:center;justify-content:center;flex-wrap:wrap;position:relative;width:fit-content;padding-inline:1rem;min-height:5vh;border-radius:12px;box-shadow:1px 1px 6px 1px lightgrey;padding-block:2rem;flex:1 1 50%;max-height:40vh;overflow-y:scroll;height:auto;";
                //paraNum indicator
                const paraNum=document.createElement("span");
                paraNum.textContent=`${index+1}`;
                paraNum.id="paraNum";
                paraNum.style.cssText="position:absolute;width:20px;height:20px;font-size:16px;text-align:center;top:0%;left:0%;transform:translate(6px,-8px);color:red;background:black;border-radius:50%;";
                col.appendChild(paraNum);
                //paraNum indicator
                //divCont
                const divCont=document.createElement("div");
                divCont.style.cssText="position:relative;margin:auto;padding:1rem;background:lightgrey;border-radius:inherit;"
                const text_=document.createElement("p");
                text_.textContent=para.textContent;
                text_.style.cssText="margin:auto;padding:1.5rem;background:#0C090A;color:rgb(12, 175, 255);border-radius:inherit;margin-left:1.5rem;";
                divCont.appendChild(text_);
                divCont.setAttribute("data-fillCount",String(index+1));
                divCont.classList.add("fillCount");
                const {label,input,formGrp}=Nav.inputComponent(divCont);
                label.textContent="word count";
                input.id="word-count";
                input.style.cssText="border-radius:inherit;width:fit-content;";
                input.placeholder="20";
                input.type="number";
                input.name="count";
                input.min="20";
                input.max="500";
                input.value="20";
                formGrp.style.cssText="border-radius:inherit;color:white;margin-block:1.5rem;display:flex;align-items:center;justify-content:center;gap:1.5rem;";
                label.setAttribute("for",input.id);
                input.onchange=(e:Event)=>{
                    if(e){
                        const value=(e.currentTarget as HTMLInputElement).value;
                        (input as HTMLInputElement).value=value;
                    }
                };
                col.appendChild(divCont);
                const {button:btn}=Misc.simpleButton({anchor:col,bg:Nav.btnColor,color:"white",text:"add fill",type:"button",time:400});
                //divCont
                row.appendChild(col);
                popup.appendChild(row);
                parent.appendChild(popup);
                Misc.fadeIn({anchor:popup,xpos:100,ypos:50,time:400});
                 btn.onclick=async(e:MouseEvent)=>{
                    if(e){
                        const value=(input as HTMLInputElement).value;
                        const words=Misc.wordGen(parseInt(value as string)).join(" ");
                        para.textContent +="added:" + words;
                        const getSelRowCol=this._modSelector.dataset.getAttribute({target:para,id:"selRowCol"});
                        [...getParas].map(child=>{
                            if(child){
                                child.classList.remove("addFill");
                            }
                        });
                        if(getSelRowCol){
                            const selRowCol:selRowColType=JSON.parse(getSelRowCol) as selRowColType;

                           await this._modSelector.updateElement({target:para,idValues,selRowCol}).then(async(res)=>{
                            if(res?.ele){
                                Misc.message({parent,msg:`${res.ele.eleId}:added`,type_:"success",time:600});
                            }
                           });
                        }else{
                            this.updateElement({target:para,idValues});
                        }
                        Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                        setTimeout(()=>{parent.removeChild(popup)},398);
                    }
                };
            }
        });
        //DELETE
        const divx=document.createElement("div");
        divx.style.cssText="position:absolute;width:20px;height:20px;top:0%;right:0%;transform:translate(4px;4px);border-radius:50%;background:black;color:white;";
        FaCreate({parent:divx,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"18px"}});
        popup.appendChild(divx);
        divx.onclick=(e:MouseEvent)=>{
            if(e){
                [...getParas].map(child=>{
                    if(child){
                        child.classList.remove("addFill");
                        this.updateElement({target:child,idValues});
                    }
                });
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{parent.removeChild(popup)},398);
            }
        };
        //DELETE
    };
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
   
    elementAdder({target,element,idValues,type}:{
            target:HTMLElement,
            element:elementType,
            idValues:idValueType[],
            type:attrDesignEnumType
    
        }):Promise<{ele:elementType|undefined,idValues:idValueType[],target:HTMLElement}>{
           
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
                    attr:type,
                    type:element.type
                };
                const idEnum:idEnumType=element.attr as idEnumType;
                idValues.push({eleId,id:"elementId",attValue:eleId});
                idValues.push({eleId,id:idEnum,attValue:idEnum});
                idValues.push({eleId,id:"ID",attValue:eleId});
                idValues.push({eleId,id:"design",attValue:"design"});
                idValues.push({eleId,id:"type",attValue:"design"});
            
                 //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                 const {idValues:retIdValues2}=this._modSelector.dataset.coreDefaultIdValues({
                    target,
                    level:"element",
                    sel:null,
                    row:null,
                    col:null,
                    ele:element,
                    loc:"htmlElement",
                    idValues,
                    clean:false
                });
                idValues=retIdValues2;
                idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
                const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
                this._modSelector.dataset.populateElement({target,selRowColEle:element,level:"element",loc:"htmlElement",clean:false,idValues});
                getEleIds.map(kat=>{
                    const attrTest=attrEnumArrTest(element);
                    const typeTest=typeEnumArrTest(element);
                    const attr=attrEnumArr.includes(kat.id);
                    const type=typeEnumArr.includes(kat.id as typeEnumType);
                    if(kat.attValue){
                        if(!attrTest && attr){
                            element.attr=kat.attValue;
                        }else if(!typeTest && type){
                            element.type=kat.attValue;
                        }else if(!element.imgKey && kat.id==="imgKey"){
                            element.imgKey=kat.attValue;
                        }
                    }
                });
         
               
               //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                this._modSelector.elements.push(element);
                const elements=this._modSelector.elements;
                this._modSelector.blog={...this._modSelector.blog,elements:elements}
                this._modSelector.placement=placement + 1;
            }
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            return Promise.resolve({ele:element,idValues,target}) as Promise<{ele:elementType|undefined,idValues:idValueType[],target:HTMLElement}>;
    };

    

    updateElement({target,idValues}:{target:HTMLElement,idValues:idValueType[]}):{ele:elementType,target:HTMLElement,idValues:idValueType[]}{
        const eleId=target.id;
        const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
        this._modSelector.elements=this._modSelector.elements.map((ele)=>{
        if(ele.eleId===eleId){
            ele.cssText=target.style.cssText;
            ele.class=target.className;
            ele.inner_html=target.innerHTML;
            this.element=ele;
            this._modSelector.dataset.populateElement({target,selRowColEle:ele,level:"element",loc:"htmlElement",clean:false,idValues});
            getEleIds.map(kat=>{
                const attrTest=attrEnumArrTest(ele);
                const typeTest=typeEnumArrTest(ele);
                const attr=attrEnumArr.includes(kat.id);
                const type=typeEnumArr.includes(kat.id as typeEnumType);
                if(kat.attValue){
                    if(!attrTest && attr){
                        ele.attr=kat.attValue;
                    }else if(!typeTest && type){
                        ele.type=kat.attValue;
                    }else if(!ele.imgKey && kat.id==="imgKey"){
                        ele.imgKey=kat.attValue;
                    }
                }
            });
        }
        return ele;
        });
        return {ele:this.element,target,idValues}
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
    }
    
    removeClasses({target,classes}:{target:HTMLElement,classes:string[]}):{cleaned:string[],target:HTMLElement}{
        const targetClasses=([...target.classList as any] as string[]);
        targetClasses.map((cl,index)=>{
            const check=classes.find(cls=>cls===cl);
            if(check){
                targetClasses.splice(index,1);
            };
        });
        return {cleaned:targetClasses,target}
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
    }
    static hexToRgbA(hex:string){
        let c:any;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+ c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
        }
        throw new Error('Bad Hex');
    };

    static HexCode(color:string){
        const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
        const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
        
        return hex;
    }
}
export default Design;
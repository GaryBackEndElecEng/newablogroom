import HtmlElement from "../editor/htmlElement";
import ModSelector from "../editor/modSelector";
import { element_selType, elementType } from "../editor/Types";
import Nav from "../nav/headerNav";
import Misc from "./misc";
import Header from "../editor/header";
import { FaCreate } from "./ReactIcons";
import { FaCrosshairs } from "react-icons/fa";
import Main from "../editor/main";



class Design{
    parent:HTMLElement;
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    constructor(private _modSelector:ModSelector,public htmlelement:HtmlElement){
        
    }
    //---------SEMI-CIRCLE-------------------------//
    //PARENT: main.textarea
    circlesDesign(parent:HTMLElement){
        const rand=Math.round(Math.random()*100);
        const minHeight=200;
        const divCont=document.createElement("div");
        divCont.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;"
        const target=document.createElement("div");
        target.id=`div-circleDesign-${rand}`;
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

                        this._modSelector.promElementAdder(target).then(async(res)=>{
                            if(res){
                                const ele=res.ele as elementType;
                                divCont.setAttribute("data-placement",`${ele.placement}`);
                            }
                        });
                        divCont.onclick=(e:MouseEvent)=>{
                            if(e){
                                divCont.classList.toggle("isActive");
                                target.classList.toggle("isActive");
                                this.removeMainElement(parent,divCont,target);
                                this._modSelector.updateElement(target);
                            }
                        };
                        this._modSelector.editElement(target);
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
        return new Promise((resolve)=>{
            resolve({form:form,popup:popup})
        }) as Promise<{form:HTMLFormElement,popup:HTMLElement}>;
     }

     circleOptionGen(item:{target:HTMLElement,maxRand:number|undefined,stroke:string|undefined,fill:string|undefined}){
        const {target,maxRand,stroke,fill}=item;
        // CLEAN UP
        const getelements=target.querySelectorAll("div.svgCont-circle") as any as HTMLElement[];
        [...getelements].map(ele=>(target.removeChild(ele)));
        // CLEAN UP
        const arr:{x:number,y:number,width:number,fill:string,stroke:string}[]=[];
        const max=maxRand ? maxRand : 40;

        const stroke_=stroke ? stroke : "rgba(30, 1, 1,1)";//hsl(0:red-255:blue,0%:light-100%:dark,98%:ligtest-0%:darkest)
        const fill_= fill ? fill : "rgba(30, 1, 1,1)";
        let x:number=0; let y:number=0;
        for(let i=1;i<=200;i+=5){
            const rand=Math.round(Math.random()*max)
            const _fill_=this.colorInjector(fill,rand) ? this.colorInjector(fill,rand) as string :stroke_;
            const _stroke_=this.colorInjector(stroke,rand) ? this.colorInjector(stroke,rand) as string : fill_;
            if(i<96){
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
            if(/^(rgba\()([0-9]{3,3}\,)([0-9]{3,3}\,)([0-9]{3,3}\,)[0-9]\)/.test(color)){
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
        svgCont.style.cssText=`position:absolute;padding:5px;width:${(width + 3)*1}px;height:${(width +3)*1}px;display:flex;place-items:center;border-radius:50%;box-shadow:1px 1px 12px 1px ${stroke};`;
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
     signalWave(parent:HTMLElement){
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
                        const {ele:svgCont,divCont}=this.polyGenerator({parent:parent,color,omega,alpha,stroke})
                        this.promElementAdder(svgCont).then(async(svg)=>{
                            if(svg){
                                const ele=svg.ele as elementType;
                                svgCont.setAttribute("data-placement",`${ele.placement}-A`);
                                Misc.fadeOut({anchor:res.cont,xpos:50,ypos:100,time:400});
                                setTimeout(()=>{
                                    container.removeChild(res.cont);
                                });
                                this._modSelector.editElement(svgCont);
                                svgCont.onclick=(e:MouseEvent)=>{
                                    if(e){
                                        svgCont.classList.toggle("isActive");
                                        divCont.classList.toggle("isActive");
                                    }
                                };
                                this.promRemoveMainElement({parent:container,divCont,target:svgCont}).then(async(reParent)=>{
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
        return new Promise((resolve)=>{
            resolve({alphaInput,omegaInput,bgSelect,strokeSel,change,close,cont:container})
        }) as Promise<{alphaInput:HTMLInputElement,omegaInput:HTMLInputElement,bgSelect:HTMLSelectElement,strokeSel:HTMLSelectElement,change:HTMLButtonElement,close:HTMLButtonElement,cont:HTMLElement}>;
        
     }

     polyGenerator(item:{parent:HTMLElement,omega:number,alpha:number,color:string,stroke:string}):{ele:HTMLElement,divCont:HTMLElement}{
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
        return {ele:svgCont,divCont}
     }
     
     //Wave- Art

      ////-------------ARROW-------------------------------///
     arrowDesign(parent:HTMLElement){
        const width=35;
        const height=window.innerWidth < 900 ?(window.innerWidth < 420 ? "50vh":"20vh"):"15vh";
        const middleWidth=width*0.5;
        const arrow=0.25*width;
        const divCont=document.createElement("div");
        divCont.style.cssText="margin:0;margin-inline:auto;padding:0.5rem";
        const main=document.createElement("div");
        main.setAttribute("data-arrow-design","true");
        main.classList.add("arrowDesign");
        main.setAttribute("is-element","true");
        main.id=`arrow-${Math.round(Math.random()*1000)}`;
        main.style.cssText=`display:inline-flex;flex-wrap:nowrap;margin-block:1.5rem;padding:1rem;align-items:center;justify-content:center;position:relative;min-height:10vh;max-height:50vh;min-width:15vw;height:${height};margin-inline:auto;`;
        main.style.height=height;
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
        main.appendChild(left);
        main.appendChild(middle);
        main.appendChild(right);
        divCont.appendChild(main);
        // Misc.matchMedia({parent:main,maxWidth:1000,cssStyle:{maxHeight:"50vh",height:"20vh"}});
        Misc.matchMedia({parent:middle,maxWidth:400,cssStyle:{flex:"1 1 100%",overflowY:"scroll"}});
        this.arrowColor(main,left,right);
        
        main.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                main.classList.toggle("isActive");
                innerText.classList.toggle("isActive")
                this._modSelector.removeMainElement(parent,divCont,main)
            }
        });
        this.promElementAdder(main).then(async(res)=>{
            if(res){
                const ele=res.ele as unknown as elementType;
                main.setAttribute("data-placement",`${ele.placement}`)
            }
        });
        this._modSelector.editElement(main);
        parent.appendChild(divCont);
        Misc.fadeIn({anchor:divCont,xpos:100,ypos:50,time:500});
    }
    arrowColor(main:HTMLElement,targetLeft:HTMLElement,targetRight:HTMLElement){
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
                this._modSelector.updateElement(main);
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
                this._modSelector.updateElement(main);
                }
            }
        });
        button.onclick=(e:MouseEvent)=>{
            if(e){
                const gettextarea=document.querySelector("div#textarea") as HTMLElement;
                Misc.growOut({anchor:container,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    Header.cleanUpByID(gettextarea,"arrowColor");
                    this._modSelector.updateElement(main);
                },398);
                
            }
        };
    }
    ////-------------ARROW-------------------------------///

    ///---------------------SEMI-CIRCLE-----------//////
    arch(parent:HTMLElement){
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
                res.change.onclick=(e:MouseEvent)=>{
                    if(e){
                        omega=parseInt(res.omegaInput.value);
                        bg=res.bgSelect.value;
                        stroke=res.strokeSel.value;
                        height=parseInt(res.heightInput.value);
                        this.archGenerator({parent:container,omega,boxShadow:"none",bg,stroke,height:1});
                    }
                };
                
                res.close.onclick=(e:MouseEvent)=>{
                    if(e){
                        omega=parseInt(res.omegaInput.value);
                        bg=res.bgSelect.value;
                        stroke=res.strokeSel.value;
                        height=parseInt(res.heightInput.value);
                        Misc.fadeOut({anchor:res.cont,xpos:100,ypos:100,time:400});
                        setTimeout(()=>{
                            const {ele,divCont}=this.archGenerator({parent:parent,omega,boxShadow:"none",bg,stroke,height});
                            Misc.growOut({anchor:container,scale:0,opacity:0,time:400});
                            setTimeout(()=>{container.removeChild(res.cont);},398);
                            this.promElementAdder(ele).then(async(ele_)=>{
                                if(ele_){
                                    const _ele_=ele_.ele as elementType;
                                    divCont.setAttribute("data-placement",`${_ele_.placement}-A`)
                                    this.promRemoveMainElement({parent,divCont,target:ele}).then(async(reParent)=>{
                                        if(reParent){
                                            parent.removeChild(container);
                                        }
                                    });
                                    this._modSelector.editElement(ele);
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
        return new Promise((resolve)=>{
            resolve({omegaInput,bgSelect,strokeSel,change,close,cont:container,heightInput})
        }) as Promise<{omegaInput:HTMLInputElement,bgSelect:HTMLSelectElement,strokeSel:HTMLSelectElement,change:HTMLButtonElement,close:HTMLButtonElement,cont:HTMLElement,heightInput:HTMLInputElement}>;
        
     }
    archGenerator(item:{parent:HTMLElement,omega:number,boxShadow:string,bg:string,stroke:string,height:number}):{ele:HTMLElement,divCont:HTMLElement}{
        const {parent,omega,boxShadow,bg,stroke,height}=item;
        Header.cleanUpByID(parent,"archGenerator");
        const container=document.createElement("div");
        container.id="archGenerator"
        container.style.cssText="width:100%;box-shadow:1px 1px 10px 1px black;border-radius:16px;position:relative;display:flex;justify-content:center;align-items:center;flex-direction:column;";
        const divCont=document.createElement("div");
        divCont.className="eleContainer";
        divCont.id="eleContainer-arch"
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
    async promElementAdder(target:HTMLElement){
        return new Promise((resolver)=>{
            resolver(this._modSelector.elementAdder(target))
        }) as Promise< {
            target: HTMLElement | HTMLImageElement;
            ele: element_selType;
        } | {
            target: HTMLElement | HTMLImageElement;
            ele: elementType;
        } | undefined>;
    }
    titleArt(parent:HTMLElement){
        parent.style.position="relative";
        Header.cleanUpByID(parent,"popup-title-art");
        const popup=document.createElement("div");
        popup.id="popup-title-art";
        popup.className="popup";
        popup.setAttribute("is-popup","true");
        popup.style.cssText="position:absolute;box-shadow:1px 1px 10px black,-1px -1px 12px 1px blue;border-radius:20px;min-height:15vh;z-index:200;background-color:white;";
        popup.style.top="5%";
        popup.style.left="10%";
        popup.style.right="10%";
        const row = document.createElement("div");
        row.className="row";
        row.style.cssText="display:flex;flex-wrap:wrap;gap:1.25rem;"
        const arrTypes:{name:string,attr:string}[]=[{name:"style-one",attr:"title-art-one"},{name:"style-two",attr:"title-art-two"},{name:"style-three",attr:"title-art-three"},{name:"style-four",attr:"title-art-four"},{name:"style-five",attr:"title-art-five"},{name:"style-six",attr:"title-art-six"},{name:"style-seven",attr:"title-art-seven"},];
        arrTypes.map((item)=>{
            const col=document.createElement("div");
            col.className="col-md-4";
            col.style.cssText="flex:1 1 33%;display:flex;flex-direction:column;padding-inline:1rem;align-items:center;justify-content:center;padding-block:2rem;;box-shadow:1px 1px 6px grey;border-radius:12px;";
            const para=document.createElement("p");
            para.id=item.attr;
            para.style.margin="auto";
            para.textContent =item.name;
            para.classList.add(item.attr);
            col.appendChild(para);
            const {button}=Misc.simpleButton({anchor:col,bg:Nav.btnColor,color:"white",text:item.name,time:400,type:"button"});
            row.appendChild(col);
            button.onclick=(e:MouseEvent)=>{
                if(e){
                    if(!Main.textarea) return;
                    //ADD INPUT FOR TITLE=> CAN NOT EDIT!=> then feed it to text in designElement
                    this.addTextTitleArt(parent,popup,col,item);
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
    addTextTitleArt(parent:HTMLElement,popup:HTMLElement,col:HTMLElement,item:{name:string,attr:string}){
        const form=document.createElement("form");
        form.style.cssText="position:absolute;box-shadow:1px 1px 10px black,-1px -1px 12px 1px blue;border-radius:20px;min-height:5vh;z-index:200;background-color:white;display:flex;flex-direction:column;gap:1.5rem;align-items:center;justify-content:center;margin-block:1.5rem;";
        form.id="form-title";
        const {input,label}=Nav.inputComponent(form);
        input.type="text";
        input.placeholder="type your title";
        input.id="input_title";
        input.name="title";
        label.textContent="your title";
        const {button:btn}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"White",text:item.name,time:400,type:"button"});
        btn.disabled=true;
        btn.style.marginBottom="2rem;"
        col.appendChild(form);
        input.onchange=(e:MouseEvent)=>{
            if(e){
                btn.disabled=false;
                const value=(e.currentTarget as HTMLInputElement).value;
                (input as HTMLInputElement).value=value;
            }
        };
        btn.onclick=(e:MouseEvent)=>{
            if(e){
                    const title=(input as HTMLInputElement).value as string;
                    this.htmlelement.designElement(Main.textarea as HTMLElement,"p",title,item.attr);
                    Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                    setTimeout(()=>{parent.removeChild(popup);},398);
                
            }
        };
    }
    addFill(parent:HTMLElement){
        parent.style.position="relative";
        Header.cleanUpByID(parent,"popup-title-art");
        if(!Main.textarea) return;
        const popup=document.createElement("div");
        popup.id="popup-title-art";
        popup.className="popup";
        popup.setAttribute("is-popup","true");
        popup.style.cssText="position:absolute;box-shadow:1px 1px 10px black,-1px -1px 12px 1px blue;border-radius:20px;min-height:15vh;z-index:200;background-color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;";
        popup.style.top="5%";
        popup.style.left="10%";
        popup.style.right="10%";
        const getParas=Main.textarea.querySelectorAll("p") as any as HTMLParagraphElement[];
        const row=document.createElement("div");
        row.classList.add("row");
        row.style.cssText="width:100%;justify-content:flex-start;align-items:center;";
        [...getParas].map((para,index)=>{
            if(para){
                para.setAttribute("data-addfill",`${index+1}`);
                para.classList.add("addFill");
                const col=document.createElement("div");
                col.className="col-md-6";
                col.id=`row-column-${index}`;
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
                btn.onclick=(e:MouseEvent)=>{
                    if(e){
                        const value=(input as HTMLInputElement).value;
                        const words=Misc.wordGen(parseInt(value as string)).join(" ");
                        para.textContent +=" " + words;
                        [...getParas].map(child=>{
                            if(child){
                                child.classList.remove("addFill");
                                // this._modSelector.updateElement(child);
                            }
                        });
                        this._modSelector.updateElement(para);
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
                        this._modSelector.updateElement(child);
                    }
                });
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{parent.removeChild(popup)},398);
            }
        };
        //DELETE
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
    }
    async promRemoveMainElement(item:{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement}):Promise<{parent:HTMLElement}>{
        const {parent,divCont,target}=item;
        return new Promise(resolver=>{
            resolver(this.removeMainElement(parent,divCont,target));
        }) as Promise<{parent:HTMLElement}>;
    }
    removeMainElement(parent:HTMLElement,divCont:HTMLElement,target:HTMLElement):{parent:HTMLElement}{
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
                    this.promRemoveElement(target).then(async(res)=>{
                        if(res){
                            this._modSelector.shiftPlace(res.placement);///REINDEX PLACEMENT!!!!
                        }
                    });
                    Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:500});
                    setTimeout(()=>{
                        ([...parent.children as any] as HTMLElement[]).map(child=>{
                            if(child && child.id===divCont.id){
                                console.log("divCont",divCont)
                                parent.removeChild(child);
                            }
                        });
                    },480);
                }
            });
         }else{
            Header.cleanUpByID(parent,"xIconDiv-design");
         }
         return {parent}
    }
    promRemoveElement(target:HTMLElement){
        return new Promise((resolve)=>{
            resolve(this.removeElement(target));
        }) as Promise<elementType|undefined>;
    }
    removeElement(target:HTMLElement):elementType|undefined{
        let ele_:elementType|undefined;
        this._modSelector._elements.map((ele,index)=>{
                if(ele.eleId===target.id){
                    this._modSelector._elements.splice(index,1);
                    ele_= ele;
                }
        });
        this._modSelector.elements=this._modSelector._elements;
        return ele_
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
    }
}
export default Design;
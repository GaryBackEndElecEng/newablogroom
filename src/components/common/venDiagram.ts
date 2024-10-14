import ModSelector from "../editor/modSelector";
import { element_selType, elementType } from "../editor/Types";
import Nav from "../nav/headerNav";
import Misc from "./misc";
import Header from "../editor/header";
import { FaCreate } from "./ReactIcons";
import { FaCrosshairs } from "react-icons/fa";


class Ven{
    constructor(private _modSelector:ModSelector){

    }

    
    venDiagram(parent:HTMLElement){
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
        venMain.id=`div-venMain-${rand}`;
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
                                this.ven({id:index,parent:venMain,shade1:"black",width:width,shade2:"#0CAFFF",title:"edit one",text:"edit one",isSizeAdjust:true,cssStyle:cssStyleOne});
                            }else{
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
                            this._modSelector.updateElement(venMain);//updating
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
                                        this._modSelector.updateElement(venMain);
                                        setTimeout(()=>{
                                            // container.removeChild(grpBtn);
                                        },1000);
                    
                                       setTimeout(()=>{
                                        container.removeChild(grpBtn)
                                       },400);
                                    }
                                }
                            };
                            ///-------ADDING LINEAR GRADIENT BTN BUTTON-----------------------////
                            ////-----ADDING MID TEXT-----------------////
                            this.paraTextMd(venMain,textMd,venHeight);
                            this._modSelector.updateElement(venMain);
                            ////-----ADDING MID TEXT-----------------////
                        }
                       
                    }
                };
            }
        });
        divCont.appendChild(venMain);
        container.appendChild(divCont);
        parent.appendChild(container);

        this._modSelector.promElementAdder(venMain).then(async(res)=>{
            if(res){
                const ele=res.ele as elementType;
                divCont.setAttribute("data-placment",`${ele.placement}-A`);
                divCont.classList.add("isActive");
                venMain.classList.add("isActive");
            }
        });
        divCont.onclick=(e:MouseEvent)=>{
            if(e){
                divCont.classList.toggle("isActive");
                venMain.classList.toggle("isActive");
                const check=([...venMain.classList as any] as string[]).includes("isActive");
                if(check){
                    this.removeMainElement(parent,container,venMain);
                }
            }
        };
        this._modSelector.editElement(venMain);
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
         return new Promise((resolver)=>{
            resolver({effect,container,blShades})
         }) as Promise<{effect:HTMLSelectElement,blShades:HTMLSelectElement,container:HTMLElement}>;
        
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

        return new Promise((resolver)=>{
            resolver({input,button,container});
        }) as Promise<{input:HTMLInputElement,button:HTMLButtonElement,container:HTMLElement}>; 

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
    removeMainElement(parent:HTMLElement,divCont:HTMLElement,target:HTMLElement){
        const check=([...target.classList as any] as string[]).includes("isActive");
        Header.cleanUpByID(parent,"xIconDiv");
        
        if(check){
            const css="position:absolute;transform:translate(-2px,-3px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:0px;left:0px;";
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
            Header.cleanUpByID(parent,"xIconDiv");
         }
    }

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
}

export default Ven;
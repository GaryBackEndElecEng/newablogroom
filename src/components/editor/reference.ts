import Misc from "../common/misc";
import Header from "./header";
import Nav from "../nav/headerNav";
import ModSelector from "./modSelector";
import { elementType } from "./Types";
import { FaCreate } from "../common/ReactIcons";
import { FaCrosshairs } from "react-icons/fa";

export type arrLinkType={
    id:string,
    name:string,
    link:string
}

class Reference{
    _arrLinks:arrLinkType[];
    constructor(private _modSelector:ModSelector){
        this._arrLinks=[];
    }
    ///----GETTERS SETTERS----/////
    get arrLinks(){
        return this._arrLinks;
    }
    set arrLinks(arrLinks:arrLinkType[]){
        this._arrLinks=arrLinks;
    }

    showCleanLinks(item:{parent:HTMLElement,ele:elementType}){
        const {parent,ele}=item;
        const target=document.createElement("div");
        target.id=ele.eleId;
        target.style.cssText=ele.cssText;
        target.className=ele.class;
        target.innerHTML=ele.inner_html;
        target.setAttribute("is-element","true");
        target.setAttribute("name","div");
        target.setAttribute("data-href-reference",ele.attr as string);
        const arrLink=JSON.parse(ele.attr as string) as arrLinkType[];
        if(arrLink && arrLink.length>0){
            arrLink.map(link_=>{
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
        parent.appendChild(target);

    }
    showLinks(item:{parent:HTMLElement,ele:elementType}){
        const {parent,ele}=item;
        const css="display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;gap:1.25rem;";
        const divCont=document.createElement("div");
        divCont.style.cssText=css;
        divCont.className="preference-eleContainer";
        const target=document.createElement("div");
        target.id="reference-link-container";//data-href-reference
        target.style.cssText=ele.cssText;
        target.className=ele.class;
        target.innerHTML=ele.inner_html;
        target.setAttribute("is-element","true");
        target.setAttribute("name","div");
        target.setAttribute("data-href-reference",ele.attr as string);
        divCont.setAttribute("data-placement",`${ele.placement}-A`);
        const arrLink=JSON.parse(ele.attr as string) as arrLinkType[];
        if(arrLink && arrLink.length>0){
            this.arrLinks=arrLink;
        }
        target.innerHTML=ele.inner_html;//dumps the links: <target><ol>arr.map=>(<li><a>)
        divCont.appendChild(target);
        const {button:update}=Misc.simpleButton({anchor:divCont,bg:Nav.btnColor,color:"green",type:"button",time:400,text:"update links"});
        update.onclick=(e:MouseEvent)=>{
            if(e){
                const links= this.getArrLinks()
                const arrLink=(this.arrLinks && this._arrLinks.length>0) ? this._arrLinks :(links ? links : undefined)
                console.log(arrLink)
                if(arrLink){
                    this.updateLinks({parent,arrLink:arrLink})

                }
            }
        };
        divCont.onclick=(e:MouseEvent)=>{
            if(e){
                if(([...divCont.classList as any] as string[]).includes("isActive")){

                    this.removeMainElement(parent,divCont,target);
                }
                divCont.classList.toggle("isActive");
                target.classList.toggle("isActive");
                this._modSelector.updateElement(target);
            }
        };
        parent.appendChild(divCont);

    }

    main(item:{parent:HTMLElement}){
        const {parent}=item;
        const css="display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;gap:1.25rem;";
        const container=document.createElement("div");
        container.style.cssText=css + "width:100%;box-shadow:1px 1px 12px 1px black;";
        const text=document.createElement("h6");
        text.textContent="Reference list adder";
        text.className="text-center text-primary lean display-6 my-2 mb-3";
        container.appendChild(text);
        this.form({parent});

    }
    form(item:{parent:HTMLElement}){
        const {parent}=item;
        const css="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;background-color:white;border-radius:12px;";
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
            col.style.cssText=css + `flex:1 0 ${100/4}%;margin-inline:auto;box-shadow:1px 1px 12px 1px black;padding:1rem;`;
            const {input:nInput,label:nlabel,formGrp:nGrp}=Nav.inputComponent(col);
            nGrp.style.cssText=css;
            nInput.id=`name-${num}`;
            nInput.name=`name-${num}`;
            nlabel.textContent=`reference-${num}`;
            nlabel.setAttribute("for",nInput.id);
            nInput.placeholder="add reference";
            const {input:lInput,label:llabel,formGrp:lGrp}=Nav.inputComponent(col);
            lGrp.style.cssText=css;
            lInput.id=`link-${num}`;
            lInput.name=`link-${num}`;
            lInput.pattern="(https\:\/\/)[a-zA-Z0-9\.\-\/]{2,}";
            llabel.textContent=`link-${num}`;
            llabel.setAttribute("for",lInput.id);
            lInput.placeholder="add link: https://...";
            lInput.onchange=(e:Event)=>{
                if(e){
                    const value=(e.currentTarget as HTMLInputElement).value;
                    const reg:RegExp=/(https\:\/\/)[a-zA-Z0-9\.\-\/]{2,}/g;
                    if(value && reg){
                        this.popupMsg({parent:form,isPassed:reg.test(value),btn:submit,msg:`${nlabel.textContent}-link has to be of form: https://..., sorry, retry.`});
                    }
                }
            };
            form.appendChild(col);
            Misc.matchMedia({parent:col,maxWidth:400,cssStyle:{flex:"1 0 100%"}});
        });
        
        parent.appendChild(form);
        parent.appendChild(submit);
        Misc.growIn({anchor:form,scale:0,opacity:0,time:600});
        submit.onclick=(e:MouseEvent)=>{
            if(e){
                // e.preventDefault();
                // const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const arrLink:arrLinkType[]=[];
                Array.from(Array(count).keys()).map(num=>{
                    const name=form.querySelector(`input#name-${num}`) as HTMLInputElement;
                    const link=form.querySelector(`input#link-${num}`) as HTMLInputElement;
                    if(!(name && link))return;
                    const getName=name.value as string;
                    const getLink=link.value as string;
                    if(getName && getLink){
                        arrLink.push({id:"",name:getName,link:getLink})
                    }
                });
                this._arrLinks=[...arrLink];
                Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(form);
                    parent.removeChild(submit);
                },390);
                this.addElement({parent,arrLink:this.arrLinks});
            }
        };
    }
    addElement(item:{parent:HTMLElement,arrLink:arrLinkType[]}){
        const {parent,arrLink}=item;
        Header.cleanUpByID(parent,"eleContainer-reference");
        //TARGET CONTAINS A GROUP OF ANCHORS <target><ol>arr(<li><a>)
        const css="display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:1rem;background-color:white;border-radius:12px;padding:1rem;width:100%;";
        const target=document.createElement('div');
        target.setAttribute("is-element","true");
        target.setAttribute("name","div");
        const text=document.createElement("h6");
        text.className="text-primary my-2 mx-3";
        text.textContent="References";
        target.id="reference-link-container";//data-href-reference
        target.style.cssText=css;
        target.className="reference";
        target.appendChild(text);
        const divCont=document.createElement("div");
        divCont.className="eleContainer-reference";
        divCont.style.cssText=css +"margin:0px;padding-inline:0rem;padding-top:1rem;position:relative;"
        divCont.id=`divCont-refrence-container`;
        const ol=document.createElement("ol");
        this._arrLinks=[] as arrLinkType[]
        arrLink.map((link,index)=>{
            if(link){
                const li=document.createElement("li");
                const a=document.createElement('a');
                a.id=`reference-link-${index}`;
                a.className="reference-link";
                a.setAttribute("data-reference-link","true");
                a.style.cssText="text-decoration:underline;color:blue;font-weight:bold;cursor:pointer;"
                a.onclick=()=>{window.open(link.link,"_blank")};
                a.textContent=link.name;
                a.setAttribute("data-href",link.link);
                a.setAttribute("name",a.nodeName.toLowerCase());
                a.setAttribute("aria-selected","true");
                li.appendChild(a);
                ol.appendChild(li);
                this._arrLinks.push({id:a.id,name:link.name,link:link.link});
                Misc.fadeIn({anchor:li,xpos:100,ypos:100,time:600});
            }
        });
        target.setAttribute("data-href-reference",JSON.stringify(this._arrLinks));
        target.appendChild(ol);
        divCont.appendChild(target)
        parent.appendChild(divCont);
        const {button:update}=Misc.simpleButton({anchor:divCont,bg:Nav.btnColor,color:"white",type:"button",time:400,text:"update links"});
        update.onclick=(e:MouseEvent)=>{
            if(e){
                // const arrLink=this.getArrLinks() ? this.getArrLinks() : null
                this.updateLinks({parent,arrLink:null})
            }
        };
        this._modSelector.promElementAdder(target).then(async(res)=>{
            if(res){
                const ele=res.ele as elementType;
                divCont.setAttribute("data-placement",`${ele.placement}-A`);
            }
        });
        target.onclick=(e:MouseEvent)=>{
            if(e){
                divCont.classList.toggle("isActive");
                target.classList.toggle("isActive");
                this.removeMainElement(parent,divCont,target);
                this._modSelector.updateElement(target);
            }
        };

    }
    updateLinks(item:{parent:HTMLElement,arrLink:arrLinkType[]|null}){
        const {parent,arrLink}=item;
        const links=arrLink ? arrLink : this.getArrLinks() as arrLinkType[] |undefined
        if(links){
            this.updateForm({parent,arrLinks:links});
        }
    }
    getArrLinks():arrLinkType[]|undefined{
        const arrLinks:arrLinkType[]=[];
        const getTarget=document.querySelector("div#reference-link-container");
        if(!getTarget) return;
        const allAnchors=getTarget.querySelectorAll("a") as any as HTMLElement[];
        [...allAnchors].map(link=>{
            if(link){
                const link_=link.getAttribute("data-href");
                if(!link_)return;
                arrLinks.push({id:link.id,link:link_,name:link.textContent as string})
            }
        });
        return arrLinks;
    }
    updateForm(item:{parent:HTMLElement,arrLinks:arrLinkType[]}){
        const {parent,arrLinks}=item;
        const css="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;background-color:white;border-radius:12px;";
        const flex="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:1rem;background-color:white;border-radius:12px;";
        const form=document.createElement("form");
        form.id="reference-form";
        form.style.cssText=flex ;
        const submit=document.createElement("button");
        submit.type="button";
        submit.style.cssText="padding-inline:2rem;border-radius:30px;padding-block:0.75rem;text-align:center;background-color:blue;color:white;align-self:center;justify-self:center;";
        submit.textContent="submit";
        arrLinks.map((link,index)=>{
            const col=document.createElement("div");
            col.style.cssText=css + `flex:1 0 ${100/4}%;margin-inline:auto;box-shadow:1px 1px 12px 1px black;padding:1rem;`;
            const {input:nInput,label:nlabel,formGrp:nGrp}=Nav.inputComponent(col);
            nGrp.style.cssText=css;
            nInput.id=`name-${index}`;
            nInput.value=link.name;
            nInput.name=`name-${index}`;
            nlabel.textContent=`reference-${index}`;
            nlabel.setAttribute("for",nInput.id);
            nInput.placeholder="add reference";
            const {input:lInput,label:llabel,formGrp:lGrp}=Nav.inputComponent(col);
            lGrp.style.cssText=css;
            lInput.id=`link-${index}`;
            lInput.value=link.link;
            lInput.name=`link-${index}`;
            lInput.pattern="(https\:\/\/)[a-zA-Z0-9\.\-\/]+";
            llabel.textContent=`link-${index}`;
            llabel.setAttribute("for",lInput.id);
            lInput.placeholder="add link: https://...";
            lInput.onchange=(e:Event)=>{
                if(e){
                    const value=(e.currentTarget as HTMLInputElement).value;
                    const reg:RegExp=/(https\:\/\/)[a-zA-Z0-9\.\-\/]+/;
                    this.popupMsg({parent:form,isPassed:reg.test(value),btn:submit,msg:`${nlabel.textContent}-link has to be of form: https://..., sorry, retry.`})
                }
            };
            form.appendChild(col);
            Misc.matchMedia({parent:col,maxWidth:400,cssStyle:{flex:"1 0 100%"}});
        });
        
        parent.appendChild(form);
        parent.appendChild(submit);
        Misc.growIn({anchor:form,scale:0,opacity:0,time:600});
        submit.onclick=(e:MouseEvent)=>{
            if(e){
                // e.preventDefault();
                // const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const arrLinks_:arrLinkType[]=[];
                arrLinks.map((link_,index)=>{
                    const name=form.querySelector(`input#name-${index}`) as HTMLInputElement;
                    const link=form.querySelector(`input#link-${index}`) as HTMLInputElement;
                    if(!(name && link))return;
                    const getName=name.value as string;
                    const getLink=link.value as string;
                    if(getName && getLink){
                        arrLinks_.push({id:link_.id,name:getName,link:getLink})
                    }
                });
                Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(form);
                    parent.removeChild(submit);
                },390);
                this._arrLinks=[...arrLinks_];
                //"reference-link-container";//data-href-reference
                const getTarget=parent.querySelector("div#reference-link-container") as HTMLElement;
                if(!getTarget) return;
                getTarget.setAttribute("data-href-reference",JSON.stringify(this._arrLinks));
                this._arrLinks.map(link=>{
                    if(link){
                        const getAnchor=parent.querySelector(`a#${link.id}`) as HTMLAnchorElement;
                        if(!getAnchor) return;
                        getAnchor.onclick=()=>{window.open(link.link,"_blank")};
                        getAnchor.textContent=link.name;
                        getAnchor.setAttribute("data-href",link.link);
                    }
                });
                this._modSelector.updateElement(getTarget);
            }
        };
    }
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
    }
    removeMainElement(parent:HTMLElement,divCont:HTMLElement,target:HTMLElement){
        const check=([...target.classList as any] as string[]).includes("isActive");
        Header.cleanUpByID(parent,"xIconDiv");
        
        if(check){
            // const rand=Math.round(Math.random()*1000);
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
                    this._modSelector.promRemoveElement(target).then(async(res)=>{
                        if(res){
                            
                            Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:500});
                            setTimeout(()=>{
                                parent.removeChild(divCont);
                            },480);
                            this._modSelector.shiftPlace(res.placement);///REINDEX PLACEMENT!!!!
                        }
                    });
                    
                    
                }
            });
         }else{
            Header.cleanUpByID(parent,"xIconDiv");
         }
    }
}
export default Reference;
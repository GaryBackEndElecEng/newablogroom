import { IconType } from "react-icons";
import { FaBold, FaCaretSquareDown, FaPalette, FaParagraph, FaUnderline,FaThumbsUp, FaHighlighter, FaFonticons, FaAlignCenter, FaItalic, FaBraille, FaBoxOpen, FaDoorClosed, FaDoorOpen } from "react-icons/fa";
import { FaCircleUp, FaSpaceAwesome } from "react-icons/fa6";
import Misc from "./misc";
import Header from "../editor/header";
import { FaCreate } from "./ReactIcons";
import ModSelector from "../editor/modSelector";
import { elementType} from "../editor/Types";


class EditText{
    toolbar_arr:{name:string,icon:IconType,class:string|undefined,show:boolean}[];
    _selected:string;
    _startEnd:{start:number,end:number};
    _content:string;
    _replaceText:string;
    _element:elementType;

    constructor(private _modSelector:ModSelector){
        this.toolbar_arr=[
            {name:"p",icon:FaParagraph,class:"my-1",show:false},
            {name:"underline",icon:FaUnderline,class:"text-decoration-underline text-underline-offset-2",show:true},
            {name:"return",icon:FaCaretSquareDown,class:"my-1",show:false},
            {name:"bold",icon:FaBold,class:"font-bold",show:true},
            {name:"italic",icon:FaItalic,class:"font-italic",show:true},
            {name:"italic-bracket",icon:FaBraille,class:"font-italic",show:true},
            {name:"color",icon:FaPalette,class:undefined,show:true},
            {name:"bg",icon:FaHighlighter,class:undefined,show:true},
            {name:"fontSize",icon:FaFonticons,class:undefined,show:true},
            {name:"text-center",icon:FaAlignCenter,class:"text-center mb-2",show:true},
        
            ]
            this._content="";
            this._selected="";
            this._startEnd={start:0,end:0};
            this._replaceText="";
    };

    //---------GETTERS SETTERS--------------------//
    get selected(){
        return this._selected
    }
    set selected(selected:string){
        this._selected=selected;
    }
    get startEnd(){
        return this._startEnd
    }
    set startEnd(startEnd:{start:number,end:number}){
        this._startEnd=startEnd;
    }
    get content(){
        return this._content
    }
    set content(content:string){
        this._content=content;
    }
    get replacetext(){
        return this._replaceText
    }
    set replaceText(replaceText:string){
        this._replaceText=replaceText;
    }
    get element(){
        return this._element;
    }
    set element(element:elementType){
        this._element=element;
    }
    //---------GETTERS SETTERS--------------------//



    toolbar(item:{parent:HTMLElement,target:HTMLTextAreaElement,submit:HTMLButtonElement|null}){
        const {parent,target,submit}=item;
        this.content=target.value;
        target.onselectionchange=(e:Event)=>{
            //THIS RECORDS THE HIGHLIGTHED BY START AND END POINTS
            if(e){
                const target=(e.currentTarget as HTMLTextAreaElement);
                const start=target.selectionStart;//START SELECTION
                const end=target.selectionEnd;//END SELECTION
                this.startEnd={start,end};
                const selected=target.value.slice(start,end);
                this.selected=selected;//works
                Header.cleanUpByID(parent,"textTool-popup");
                // parent.style.position="relative";
                const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;max-width:400;width:100%;padding-inline:0.25rem;"
                const css_row_block="margin-inline:auto;display:inline-flex;justify-content:space-around;align-items:center;width:100%;height:30px;flex-wrap:wrap;padding-inline:1rem;"
                const popup=document.createElement("div");
                popup.id="textTool-popup";
                popup.style.cssText=css_col + "position:absolute;background-color:white;color:black;box-shadow:1px 1px 12px 1px lightblue;border-radius:12px;height:auto;z-index:100;top:100%;";
                const showSelected=document.createElement("p");
                showSelected.className="text-center mb-3 text-primary";
                showSelected.textContent=this.selected;
                popup.appendChild(showSelected);
                const toolbar=document.createElement("div");
                toolbar.id="textTool-popup-toolbar";
                toolbar.style.cssText=css_row_block;
                const cssStyle={backgroundColor:"black",color:"white",textDecoration:"underline",fontWeight:"bold",fontSize:"26px",width:"28px"};
                this.toolbar_arr.map(item=>{
                    const btn=Misc.btnIcon({anchor:toolbar,cssStyle,icon:item.icon,label:null,msgHover:item.name,time:400});
                    btn.onclick=(e:MouseEvent)=>{
                        if(e){
                            this.textTool({btn,target,selected:selected,name:item.name,submit,start,end}).then(async(res)=>{
                                if(res){
                                    target.value=res.content;
                                    if(res.submit){
                                        res.submit.disabled=false;

                                    }
                                }
                            });
                        }
                    };
                });
                popup.appendChild(toolbar);
                parent.appendChild(popup);
            }
        };

    }
    paragraphEditorbar(item:{parent:HTMLElement,target:HTMLElement}){
        const {parent,target}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const btnContainer=document.createElement("div");
        btnContainer.id="btn-container";
        btnContainer.style.cssText="width:auto;display:flex;justify-content:center;align-items:center;margin-inline:auto;position:absolute;top:90%;right:0%;order:-1;";
        parent.appendChild(btnContainer);
        // button
        const cssStyle={backgroundColor:"black",color:"white",textDecoration:"underline",fontWeight:"bold",fontSize:"26px",width:"auto"};
        let getToolbar: HTMLButtonElement | null;
        let getHidebar:HTMLButtonElement | null;
        // Header.cleanUpByID(btnContainer,"toolbar-btn");
        // Header.cleanUpByID(btnContainer,"hide-btn");
        ["showBtn","hideBtn"].map(itemBtn=>{
            if(itemBtn==="showBtn"){
                const icon:IconType=FaDoorOpen
                const btn=Misc.btnIcon({anchor:btnContainer,cssStyle,icon,label:"open",msgHover:"open Toolbar",time:400});
                btn.id="toolbar-btn";
                btn.style.opacity="1";
                btn.style.order="-1";
                getToolbar=btn;
                
            }else if(itemBtn==="hideBtn"){
                const icon:IconType=FaDoorClosed
                const btn=Misc.btnIcon({anchor:btnContainer,cssStyle,icon,label:"close",msgHover:"close Toolbar",time:400});
                btn.id="hide-btn";
                btn.style.opacity="0";
                btn.style.order="1";
                getHidebar=btn;
            };
        });
        //BUTTON ABOVE
        target.onselectstart=(e:Event)=>{
            if(e){
                getHidebar=btnContainer.querySelector("button#hide-btn") as HTMLButtonElement;
                getToolbar=btnContainer.querySelector("button#toolbar-btn") as HTMLButtonElement;
                if(!(getHidebar && getToolbar)) return;;
                getHidebar.onclick=(e:MouseEvent)=>{
                    if(e){ 
                        getToolbar=getToolbar as HTMLButtonElement; 
                        getToolbar.style.opacity="1";
                        getToolbar.style.order="-1";
                        const btn=(e.currentTarget as HTMLButtonElement);
                        btn.style.opacity="0";
                        btn.style.order="1";
                        this.paraEditorbarPopup({parent,target,less900,less400,show:false});
                    };
                }
                getToolbar.onclick=(e:MouseEvent)=>{
                    if(e){
                        getHidebar=getHidebar as HTMLButtonElement;
                        const btn=(e.currentTarget as HTMLButtonElement);
                        btn.style.opacity="0";
                        btn.style.order="1";
                        getHidebar.style.opacity="1";
                        getHidebar.style.order="-1";
                        this.paraEditorbarPopup({parent,target,less900,less400,show:true});   
                        }
                    }
            };
        }
}

    paraEditorbarPopup(item:{parent:HTMLElement,target:HTMLElement,less900:boolean,less400:boolean,show:boolean}){
        const {parent,target,less900,less400,show}=item;
        if(show){

            Header.cleanUpByID(parent,"paragraphEditorbar-popup");
            // parent.style.position="relative";
            const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;max-width:400;width:100%;padding-inline:0.25rem;"
            const css_row_block="margin-inline:auto;display:inline-flex;justify-content:space-around;align-items:center;width:100%;height:30px;flex-wrap:wrap;padding-inline:1rem;"
            const popup=document.createElement("div");
            popup.id="paragraphEditorbar-popup";
            popup.style.cssText=css_col + "position:absolute;background-color:white;color:black;box-shadow:1px 1px 12px 1px lightblue;border-radius:12px;height:auto;z-index:100;";
            popup.style.top=less900 ? (less400 ? "-20%":"-20%") : "-15%";
            const toolbar=document.createElement("div");
            toolbar.id="textTool-popup-toolbar";
            toolbar.style.cssText=css_row_block;
            const cssStyle={backgroundColor:"black",color:"white",textDecoration:"underline",fontWeight:"bold",fontSize:"26px",width:"28px"};
            this.toolbar_arr.map(item=>{
                if(item.show){
    
                    const btn=Misc.btnIcon({anchor:toolbar,cssStyle,icon:item.icon,label:null,msgHover:item.name,time:400});
                    btn.setAttribute("name",item.name)
                    btn.onclick=(e:MouseEvent)=>{
                        if(e){
                            const {selected,start,end,len,node}=this.getSelectionText({target});
                            this.startEnd={start,end};
                            this.selected=selected;
                            // console.log("node",node)// this is the node that the item is heightlighted
                            const class_=item.class;
                            if(selected && start && end){
                                this.textToolEditorClass({parent,btn,selected,class_,target,start,end,node});
                            }
                        }
                    };
                }
            });
            
            popup.appendChild(toolbar);
            parent.appendChild(popup);
        }else{
            Header.cleanUpByID(parent,"paragraphEditorbar-popup");
        }
    }
    getSelectionText({target}:{target:HTMLElement}):{selected:string,start:number,end:number,len:number,node:Node}{
        const words=target.innerHTML as string;
        let text="";
        let start=0;
        let end=0;
        let node:Node={} as Node;
        //need to replicate process to pull the next highlight
        Array.from(Array(2).keys()).map(num=>{
            const doc=document.getSelection() as Selection;
            const range=document.createRange();
            range.selectNode(target);
            doc.addRange(range);
            text=doc.toString();
            start=doc.focusOffset;
            end=start + text.length;
            node=doc.focusNode as Node;
        });
        // }
        return{
            selected:text,
            start,
            end,
            len:words.length,
            node:node
        }
        
    }

   async textToolEditorClass(item:{parent:HTMLElement,btn:HTMLButtonElement,selected:string,class_:string|undefined,start:number,end:number,target:HTMLElement,node:Node}){
        const {parent,btn,target,selected,start,end,class_,node}=item;
        const name=btn.getAttribute("name");
        
        //create span, add class && appendTo Target
        switch(true){
            case name==="underline":
                const under=document.createElement("u");
                under.textContent=selected;
                return await this.insertWord({target,span:under,selected,start,end,node})?.then(async(res_)=>{
                    console.log(res_);
                    if(res_ && res_.found){
                        this.element=res_.ele;
                    }
                    return this.element;
                });
            
            case name==="italic":
                const ital=document.createElement("i");
                ital.textContent=selected;
                return await this.insertWord({target,span:ital,selected,start,end,node})?.then(async(res_)=>{
                    console.log(res_);
                    if(res_ && res_.found){
                        this.element=res_.ele;
                    }
                    return this.element;
                });
            
            case name==="italic-bracket":
                const italic=document.createElement("i");
                italic.textContent=selected;
                if(class_){
                    italic.className=class_;
                }
               return await  this.insertWord({target,span:italic,selected,start,end,node})?.then(async(res_)=>{
                    console.log(res_);
                    if(res_ && res_.found){
                        this.element=res_.ele;
                    }
                    return this.element;
                });
            
            case name==="p":
                const para=document.createElement("p");
                para.textContent=selected;
               return await this.insertWord({target,span:para,selected,start,end,node})?.then(async(res_)=>{
                    if(res_ && res_.found){
                        this.element=res_.ele;
                    }
                    return this.element;
                });
           
            case name==="return":
                const ret=document.createElement("div");
                ret.textContent=selected;
                if(class_){
                    ret.className=class_;
                }
              return await  this.insertWord({target,span:ret,selected,start,end,node})?.then(async(res_)=>{
                    console.log(res_);
                    if(res_ && res_.found){
                        this.element=res_.ele;
                    }
                    return this.element;
                });
           
            case name==="bold":
                const b=document.createElement("b");
                b.textContent=selected;
                if(class_){
                    b.className=class_
                }
               return await this.insertWord({target,span:b,selected,start,end,node})?.then(async(res_)=>{
                    console.log(res_)
                    if(res_ && res_.found){
                        this.element=res_.ele;
                    }
                    return this.element;
                });
           
            case name==="color":
               return await this.colorTwoPalette({parent,selected}).then(async(res)=>{
                    if(res){

                        res.form.onsubmit=async(e:SubmitEvent)=>{
                            if(e){
                                e.preventDefault();
                                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                                const getColor=formdata.get("color") as string;
                                const span=document.createElement("span");
                                span.textContent=selected;
                                span.style.cssText=`color:${getColor};`;
                                if(!getColor) return;
                               return await this.insertWord({target,span,selected,start,end,node})?.then(async(res_)=>{
                                    console.log(res_);
                                    if(res_ && res_.found){
                                        this.element=res_.ele;
                                    }
                                    res.parent.removeChild(res.popup);
                                    return this.element;
                                });
                            }
                        };

                    }
                });
           
            case name==="bg":
               return await this.colorTwoPalette({parent,selected}).then(async(res)=>{
                    if(res){
                        res.form.onsubmit=async(e:SubmitEvent)=>{
                            if(e){
                                e.preventDefault();
                                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                                const getColor=formdata.get("color") as string;
                                const span=document.createElement("span");
                                span.textContent=selected;
                                span.style.cssText=`background-color:${getColor};`;
                                if(!getColor) return;
                                this.insertWord({target,span,selected,start,end,node})?.then(async(res_)=>{
                                    console.log(res_);
                                    if(res_ && res_.found){
                                        this.element=res_.ele;
                                    }
                                    res.parent.removeChild(res.popup);
                                    return this.element;
                                });
                            }
                        };
                    }
                });
           
            case name==="fontSize":
               return await this.fontsize({parent,selected}).then(async(res)=>{
                    if(res){
                        res.form.onsubmit=(e:SubmitEvent)=>{
                            if(e){
                                e.preventDefault();
                                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                                const getNum=formdata.get("num") as string;
                                const span=document.createElement("span");
                                span.textContent=selected;
                                span.style.cssText=`font-size:${getNum}px;`
                                if(!getNum) return;
                                this.insertWord({target,span,selected,start,end,node})?.then(async(res_)=>{
                                    // console.log(res_);
                                    if(res_ && res_.found){
                                        this.element=res_.ele;
                                    }
                                    res.parent.removeChild(res.popup);
                                    return this.element;
                                });
                            }
                        };

                    }
                });
          
            case name==="text-center":
                const span=document.createElement("div");
                span.textContent=selected;
                if(class_){
                    span.className=class_;
                }
               return await this.insertWord({target,span,selected,start,end,node})?.then(async(res)=>{
                    if(res && res.found){
                        this.element=res.ele;
                    }
                    return this.element;
                });
            default:
                return;
           
        }

    };
    async textTool(item:{btn:HTMLButtonElement,target:HTMLTextAreaElement,selected:string,name:string,submit:HTMLButtonElement|null,start:number,end:number}):Promise<{content:string,submit:HTMLButtonElement|null}|void>{
        const {btn,target,selected,name,submit,start,end}=item;
        switch(true){
            case name==="P":
                this.replaceText=`<p>${selected}</p>`;
                const text0=`<p>${selected}</p>`;
                // submit.disabled=false;
                return await this.matchword({target,selected,replace_:text0,start,end,submit});
            case name==="underline":
                this.replaceText=`<span style=text-decoration:underline;>${selected}</span>`;
                const text=`<span style=text-decoration:underline;>${selected}</span>`;
                // submit.disabled=false;
                return await this.matchword({target,selected,replace_:text,start,end,submit});
            case name==="upperCase":
                this.replaceText=`<span>${selected.toUpperCase()}</span>`;
                const text2=`<span>${selected.toUpperCase()}</span>`;
                // submit.disabled=false;
                return await this.matchword({target,selected,replace_:text2,start,end,submit});
            case name==="return":
                const text4=`${selected}<br>`;
            return await this.matchword({target,selected,replace_:text4,start,end,submit});
            case name==="bold":
                this.replaceText=`<span style=font-weight:bold;>${selected}</span>`;
                const text3=`<span style=font-weight:bold;>${selected}</span>`;
                // submit.disabled=false;
                return await this.matchword({target,selected,replace_:text3,start,end,submit});
            case name==="bg":
                const text5=`<span style=background-color:black;color:white;padding-inline:10px;>${selected}</span>`;
                // submit.disabled=false;
                return await this.matchword({target,selected,replace_:text5,start,end,submit});
            case name==="color":
                return await this.colorPalette({parent:btn,selected}).then(async(input)=>{
                    if(input){
                        input.onchange=async (e:Event)=>{
                            if(e){
                                const selectedColor=(e.currentTarget as HTMLInputElement).value;
                                const text=`<span style=color:${selectedColor};>${selected}</span>`;
                                const result= await this.matchword({target,selected,replace_:text,start,end,submit});
                                target.value=result.content;
                                // submit.disabled=false;
                                input.remove();
                            }
                        };
                    };
                });
            return;
            default:
                return undefined;
            
        }
    }
   async colorPalette(item:{parent:HTMLElement,selected:string}):Promise<HTMLInputElement>{
        const {parent,selected}=item;
        const input=document.createElement("input");
        input.id="colorPallette-input";
        input.type="color";
        parent.append(input);
        return new Promise(resolved=>{
            resolved(input)
        }) as Promise<HTMLInputElement>;
    }
   async colorTwoPalette(item:{parent:HTMLElement,selected:string}):Promise<{input:HTMLInputElement,parent:HTMLElement,popup:HTMLElement,form:HTMLFormElement}>{
        const {parent,selected}=item;
        Header.cleanUpByID(parent,"popup-colorTwopalette");
        const popup=document.createElement("div");
        popup.id="popup-colorTwopalette";
        popup.style.cssText="position:absolute;top:-30%;width:fit-content;z-index:100;";
        const form=document.createElement("form");
        form.style.cssText="display:flex;margin:1rem;border-radius:12px;flex-direction:column;width:200px;align-items:center;";
        form.id="color-form";
        const input=document.createElement("input");
        input.id="colorPallette-input";
        input.type="color";
        input.name="color";
        const {button}=Misc.simpleButton({anchor:form,text:"submit",bg:"black",color:"white",type:"submit",time:400});
        form.append(input);
        popup.appendChild(form);
        parent.appendChild(popup);
        return new Promise(resolved=>{
            resolved({input,parent,popup,form})
        }) as Promise<{input:HTMLInputElement,parent:HTMLElement,popup:HTMLElement,form:HTMLFormElement}>;
    }
   async fontsize(item:{parent:HTMLElement,selected:string}):Promise<{input:HTMLInputElement,parent:HTMLElement,popup:HTMLElement,form:HTMLFormElement}>{
        const {parent,selected}=item;
        Header.cleanUpByID(parent,"popup-fontsize");
        const popup=document.createElement("div");
        popup.id="popup-fontsize";
        popup.style.cssText="position:absolute;top:-30%;width:fit-content;z-index:100;";
        const form=document.createElement("form");
        form.style.cssText="display:flex;margin:1rem;border-radius:12px;flex-direction:column;width:200px;align-items:center;";
        form.id="fontsize-form";
        const input=document.createElement("input");
        input.id="fontsize-input";
        input.type="number";
        input.name="num";
        const {button}=Misc.simpleButton({anchor:form,text:"submit",bg:"black",color:"white",type:"submit",time:400});
        form.append(input);
        popup.appendChild(form);
        parent.appendChild(popup);
        return new Promise(resolved=>{
            resolved({input,parent,popup,form})
        }) as Promise<{input:HTMLInputElement,parent:HTMLElement,popup:HTMLElement,form:HTMLFormElement}>;
    }
    matchword(item:{target:HTMLTextAreaElement,selected:string,replace_:string,start:number,end:number,submit:HTMLButtonElement|null}):Promise<{content:string,submit:HTMLButtonElement|null}>{
        const {target,selected,replace_,start,end,submit}=item;
        const content=target.value;
        let newText="";
        if(content.includes(selected)){
            // const start=this.startEnd.start;
            // const end=this.startEnd.end;
            const len=content.length;
            const textStart=content.slice(0,start);
            const textEnd=content.slice(end,len);
            newText=textStart + " " + replace_ + " " + textEnd
        }
        return new Promise(resolver=>{
            resolver({content:newText,submit})
        }) as Promise<{content:string,submit:HTMLButtonElement|null}>;
    }
    insertWord(item:{target:HTMLElement,span:HTMLElement,selected:string,start:number,end:number,node:Node}):Promise<{ele:elementType,found:boolean}>|undefined{
        const {target,span,selected,start,end,node}=item;
        const selectionWords=node.textContent;
        let found:boolean=false;
        if(!selectionWords) return ;
        const len=selectionWords.length;
        const startStr=selectionWords.slice(0,start);
        const endStr=selectionWords.slice(end,len);
        const isChildNode=target.childNodes && [...target.childNodes].find(node_=>((node_.textContent)?.includes(selectionWords)));
        if(isChildNode){
            let targetNew:string="";
            let count=0;
                [...target.childNodes].map((child,index)=>{
                    count++;
                    const check=child.textContent===node.textContent;
                    const newEle=document.createElement("div");
                    if(child.nodeName==="#text" && check){
                        const startText= new Text(startStr);
                        const endText= new Text(endStr);
                        newEle.appendChild(startText) ;
                        newEle.appendChild(span);
                        newEle.appendChild(endText);
                        targetNew +=newEle.innerHTML;
                        found=true;
                        console.log("newEle.innerHTML",newEle.innerHTML);
                    }else{
                        const {newFound,inner_html}=this.secondLevel({child,span,found,node,startStr,endStr});
                        newEle.innerHTML=inner_html;
                        if(newFound){
                           
                            found=newFound
                        }else{
                            // console.log(child)
                            newEle.appendChild(child);
                        }
                        targetNew+=newEle.innerHTML;
                        // found=newFound;
                    }
                });
                target.innerHTML=targetNew;
        }
        
        
        if(found){
          
            this.element=this._modSelector.updateElement(target)as elementType;
            
        }
        return new Promise(resolver=>{
            resolver({ele:this.element,found})
        }) as Promise<{ele:elementType,found:boolean}>;

    }

    secondLevel(item:{child:ChildNode,span:HTMLElement,found:boolean,node:Node,startStr:string,endStr:string}):{newFound:boolean,inner_html:string}{
        const {child,found,node,startStr,endStr,span}=item;
        let targetNew:string="";
        let newFound:boolean=false;
        if(!found && child){
            const selectionWords=node.textContent as string;
            [...child.childNodes].map((enfant,index)=>{
                const check=enfant.textContent===selectionWords;
            //    console.log("enfant",enfant,"check",check)
                const newEle=document.createElement("div");
                if( check){
                    child.removeChild(enfant);
                    const startText= new Text(startStr);
                    const endText= new Text(endStr);
                    newEle.appendChild(startText) ;
                    newEle.appendChild(span);
                    newEle.appendChild(endText);
                    targetNew +=`<div>${newEle.innerHTML}</div>`;
                    newFound=true;
                } else{
                    newEle.appendChild(enfant);
                    targetNew+=newEle.innerHTML;
                }
                // console.log(targetNew)
            });
        };
        return {newFound,inner_html:targetNew}
    };
};
export default EditText;
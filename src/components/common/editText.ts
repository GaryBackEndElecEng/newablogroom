import { IconType } from "react-icons";
import { FaBold, FaCaretSquareDown, FaPalette, FaParagraph, FaUnderline, FaHighlighter, FaFonticons, FaAlignCenter, FaItalic, FaBraille, FaDoorClosed, FaDoorOpen } from "react-icons/fa";

import Misc from "./misc/misc";
import Header from "../editor/header";

import ModSelector from "../editor/modSelector";
import { element_selType, elementType} from "../editor/Types";
import { idValueType } from "@/lib/attributeTypes";


class EditText{
    toolbar_arr:{name:string,icon:IconType,class:string|undefined,show:boolean,cssStyle:{[key:string]:string}|undefined}[];
    _selected:string;
    _startEnd:{start:number,end:number};
    _content:string;
    _replaceText:string;
    private _element:elementType;

    constructor(private _modSelector:ModSelector){
        this.toolbar_arr=[
            {name:"p",icon:FaParagraph,class:"my-1",show:false,cssStyle:{marginLeft:"0.5rem"}},
            {name:"underline",icon:FaUnderline,class:"text-decoration-underline text-underline-offset-2",show:true,cssStyle:{marginInline:"auto"}},
            {name:"return",icon:FaCaretSquareDown,class:"my-1",show:false,cssStyle:undefined},
            {name:"bold",icon:FaBold,class:"font-bold",show:true,cssStyle:undefined},
            {name:"italic",icon:FaItalic,class:"font-italic",show:true,cssStyle:undefined},
            {name:"italic-bracket",icon:FaBraille,class:"font-italic",show:true,cssStyle:undefined},
            {name:"color",icon:FaPalette,class:undefined,show:true,cssStyle:undefined},
            {name:"bg",icon:FaHighlighter,class:undefined,show:true,cssStyle:undefined},
            {name:"fontSize",icon:FaFonticons,class:undefined,show:true,cssStyle:undefined},
            {name:"text-center",icon:FaAlignCenter,class:"text-center mb-2",show:true,cssStyle:undefined},
        
            ];
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



    toolbar(item:{parent:HTMLElement,target:HTMLTextAreaElement,submit:HTMLButtonElement|null,idValues:idValueType[]}){
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
                            const {cssStyle:cssStyle_}=item;
                            this.textTool({btn,target,selected:selected,name:item.name,submit,start,end,cssStyle:cssStyle_}).then(async(res)=>{
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

    };


    paragraphEditorbar(item:{parent:HTMLElement,target:HTMLElement,idValues:idValueType[]}){
        const {parent,target,idValues}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const btnContainer=document.createElement("div");
        btnContainer.id="btn-container";
        btnContainer.style.cssText="width:auto;display:flex;justify-content:center;align-items:center;margin-inline:auto;position:absolute;bottom:0%;right:0%;order:-1";
        btnContainer.style.transform=less900 ? ( less400 ? "translate(20px,20px)":"translate(40px,20px)"):"translate(70px,20px)";
        parent.appendChild(btnContainer);
        // button
        const cssStyle={backgroundColor:"black",color:"white",textDecoration:"underline",fontWeight:"bold",fontSize:"26px",width:"auto"};
        let getToolbar: HTMLButtonElement | null;
        let getHidebar:HTMLButtonElement | null;
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
                        this.paraEditorbarPopup({parent,target,less900,less400,show:false,idValues});
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
                        this.paraEditorbarPopup({parent,target,less900,less400,show:true,idValues});   
                        }
                    }
            };
        }
}

    paraEditorbarPopup(item:{parent:HTMLElement,target:HTMLElement,less900:boolean,less400:boolean,show:boolean,idValues:idValueType[]}){
        const {parent,target,show,idValues}=item;
        if(show){

            Header.cleanUpByID(parent,"paragraphEditorbar-popup");
          
            const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;max-width:400;width:100%;padding-inline:0.25rem;"
            const css_row_block="margin-inline:auto;display:inline-flex;justify-content:space-around;align-items:center;width:100%;height:30px;flex-wrap:wrap;padding-inline:1rem;"
            const popup=document.createElement("div");
            popup.id="paragraphEditorbar-popup";
            popup.style.cssText=css_col + "position:absolute;background-color:white;color:black;box-shadow:1px 1px 12px 1px lightblue;border-radius:12px;height:auto;z-index:100;";
            popup.style.top="-10px";
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
                            const {selected,start,end,node}=this.getSelectionText({target});
                            this.startEnd={start,end};
                            this.selected=selected;
                            // console.log("node",node)// this is the node that the item is heightlighted
                            const class_=item.class;
                            if(selected && start && end){
                                this.textToolEditorClass({parent,btn,selected,class_,target,start,end,node,idValues});
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
    };


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
            // console.log("node",node);
            // console.log("text",text);
            // console.log("doc",doc);
        });
        // }
        return{
            selected:text,
            start,
            end,
            len:words.length,
            node:node
        }
        
    };

   async textToolEditorClass(item:{
    parent:HTMLElement,
    btn:HTMLButtonElement,
    selected:string,
    class_:string|undefined,
    start:number,
    end:number,
    target:HTMLElement,
    node:Node,
    idValues:idValueType[]

   }){
        const {parent,btn,target,selected,start,end,class_,node,idValues}=item;
        const name=btn.getAttribute("name");
        
        //create span, add class && appendTo Target
        if(name==="underline"){
            const under=document.createElement("u");
            under.textContent=selected;
            return await this.insertWord({target,span:under,start,end,node,idValues})?.then(async(res_)=>{
                if(res_?.found){
                    this.element=res_.ele as elementType;
                }
                return this.element;
            });
        }else if(name==="italic"){
            const ital=document.createElement("i");
            ital.textContent=selected;
            return await this.insertWord({target,span:ital,start,end,node,idValues})?.then(async(res_)=>{
                if(res_?.found){
                    this.element=res_.ele as elementType;
                }
                return this.element;
            });
        }else if(name==="italic-bracket"){
            const italic=document.createElement("i");
            italic.textContent=selected;
            if(class_){
                italic.className=class_;
            }
           return await  this.insertWord({target,span:italic,start,end,node,idValues})?.then(async(res_)=>{
                if(res_?.found){
                    this.element=res_.ele as elementType;
                }
                return this.element;
            });
        }else if(name==="p"){
            const para=document.createElement("p");
            para.textContent=selected;
           return await this.insertWord({target,span:para,start,end,node,idValues})?.then(async(res_)=>{
                if(res_?.found){
                    this.element=res_.ele as elementType;
                }
                return this.element;
            });
        }else if(name==="return"){
            const ret=document.createElement("div");
            ret.textContent=selected;
            if(class_){
                ret.className=class_;
            }
          return await  this.insertWord({target,span:ret,start,end,node,idValues})?.then(async(res_)=>{
                console.log(res_);
                if(res_?.found){
                    this.element=res_.ele as elementType;
                }
                return this.element;
            });
        }else if(name==="bold"){
            const b=document.createElement("b");
            b.textContent=selected;
            if(class_){
                b.className=class_
            }
           return await this.insertWord({target,span:b,start,end,node,idValues})?.then(async(res_)=>{
                console.log(res_)
                if(res_?.found){
                    this.element=res_.ele as elementType;
                }
                return this.element;
            });
        }else if(name==="color"){
            return await this.colorTwoPalette({parent,selected}).then(async(res)=>{
                if(res){
                    res.form.onsubmit=async(e:SubmitEvent)=>{
                        if(e){
                            e.preventDefault();
                            const formdata=new FormData(e.currentTarget as HTMLFormElement);
                            const getColor=formdata.get("color") as string;
                            const span=document.createElement("color");
                            span.textContent=selected;
                            span.style.cssText=`color:${getColor};`;
                            if(!getColor) return;
                           return await this.insertWord({target,span,start,end,node,idValues})?.then(async(res_)=>{
                                console.log(res_);
                                if(res_?.found){
                                    this.element=res_.ele as elementType;
                                }
                                res.parent.removeChild(res.popup);
                                return this.element;
                            });
                        }
                    };

                }
            });
        }else if(name==="bg"){
            return await this.colorTwoPalette({parent,selected}).then(async(res)=>{
                if(res){
                    res.form.onsubmit=async(e:SubmitEvent)=>{
                        if(e){
                            e.preventDefault();
                            const formdata=new FormData(e.currentTarget as HTMLFormElement);
                            const getColor=formdata.get("color") as string;
                            const span=document.createElement("color");
                            span.textContent=selected;
                            span.style.cssText=`background-color:${getColor};`;
                            if(!getColor) return;
                            this.insertWord({target,span,start,end,node,idValues})?.then(async(res_)=>{
                                console.log(res_);
                                if(res_?.found){
                                    this.element=res_.ele as elementType;
                                }
                                res.parent.removeChild(res.popup);
                                return this.element;
                            });
                        }
                    };
                }
            });
        }else if(name==="fontSize"){
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
                            this.insertWord({target,span,start,end,node,idValues})?.then(async(res_)=>{
                                
                                if(res_?.found){
                                    this.element=res_.ele as elementType;
                                }
                                res.parent.removeChild(res.popup);
                                
                            });
                        }
                    };

                }
            });
        }else if(name==="text-center"){
            const span=document.createElement("div");
            span.textContent=selected;
            if(class_){
                span.className=class_;
            }
           return await this.insertWord({target,span,start,end,node,idValues})?.then(async(res)=>{
                if(res?.found){
                    this.element=res.ele as elementType;
                }
                return this.element;
            });
        }


    };
    

    async textTool(item:{
        btn:HTMLButtonElement;
        target:HTMLTextAreaElement;
        selected:string;
        name:string;
        submit:HTMLButtonElement|null;
        start:number;
        end:number;
        cssStyle:{[key:string]:string}|undefined;

    }):Promise<{content:string,submit:HTMLButtonElement|null}|void>{
        const {btn,target,selected,name,submit,start,end}=item;
        if(name==="color"){
            await this.colorPalette({parent:btn,selected}).then(async(input)=>{
                if(input){
                    input.onchange=async (e:Event)=>{
                        if(e){
                            const selectedColor=(e.currentTarget as HTMLInputElement).value;
                            const html=this.cssClassInserter({name,highlighted:selected,cssStyle:{color:selectedColor}});
                            input.remove();
                            return await this.matchword({target,selected,replace_:html as string,start,end,submit});
                        }
                    };
                };
            });
        }else if(name==="bg"){
            await this.colorPalette({parent:btn,selected}).then(async(input)=>{
                if(input){
                    input.onchange=async (e:Event)=>{
                        if(e){
                            const selectedColor=(e.currentTarget as HTMLInputElement).value;
                            const html=this.cssClassInserter({name,highlighted:selected,cssStyle:{backgroundColor:selectedColor}});
                            input.remove();
                            return await this.matchword({target,selected,replace_:html as string,start,end,submit});
                        }
                    };
                };
            });
        }else{
            const html=this.cssClassInserter({name,highlighted:selected,cssStyle:{color:"black"}});
            return await this.matchword({target,selected,replace_:html as string,start,end,submit});
        };
       
    };


    cssClassInserter({name,highlighted,cssStyle}:{
        name:string;
        highlighted:string;
        cssStyle:{[key:string]:string}|undefined;
    }):string|undefined{
        const span=document.createElement("span");
        if(cssStyle){
            for(const [key,value] of Object.entries(cssStyle)){
                if(key && value){
                    span.style[key]=value;
                };
            };
        };
        const css=span.style.cssText;
        const cssInsert=css!=="" ? css :"";
        const toolArr:{name:string,html:string}[]=[
            {name:"P",html:`<p style=${cssInsert}><br/>${highlighted}</p>`},
            {name:"underline",html:`<span style=${cssInsert}><u>${highlighted}</u></span>`},
            {name:"upperCase",html:`<span style=${cssInsert}>${highlighted.toUpperCase()}</span>`},
            {name:"bold",html:`span style=${cssInsert}><strong>${highlighted}</strong></span>`},
            {name:"bg",html:`<span style=${cssInsert}>${highlighted}</span>`},
            {name:"color",html:`<span style=${cssInsert}>${highlighted}</span>`},
        ];
        const selected=toolArr.find(kv=>(kv.name===name));
        if(selected){
            return selected.html
        };
        
    };



   async colorPalette(item:{parent:HTMLElement,selected:string}):Promise<HTMLInputElement>{
        const {parent}=item;
        const input=document.createElement("input");
        input.id="colorPallette-input";
        input.type="color";
        parent.append(input);
        return Promise.resolve(input) as Promise<HTMLInputElement>;
    };


   async colorTwoPalette(item:{parent:HTMLElement,selected:string}):Promise<{input:HTMLInputElement,parent:HTMLElement,popup:HTMLElement,form:HTMLFormElement}>{
        const {parent}=item;
        Header.cleanUpByID(parent,"popup-colorTwopalette");
        const popup=document.createElement("div");
        popup.id="popup-colorTwopalette";
        popup.style.cssText="position:absolute;top:-10%;width:fit-content;z-index:100;";
        const form=document.createElement("form");
        form.style.cssText="display:flex;margin:1rem;border-radius:12px;flex-direction:column;width:200px;align-items:center;";
        form.id="color-form";
        const input=document.createElement("input");
        input.id="colorPallette-input";
        input.type="color";
        input.name="color";
        Misc.simpleButton({anchor:form,text:"submit",bg:"black",color:"white",type:"submit",time:400});
        form.append(input);
        popup.appendChild(form);
        parent.appendChild(popup);
        return Promise.resolve({input,parent,popup,form}) as Promise<{input:HTMLInputElement,parent:HTMLElement,popup:HTMLElement,form:HTMLFormElement}>;
    };


   async fontsize(item:{parent:HTMLElement,selected:string}):Promise<{input:HTMLInputElement,parent:HTMLElement,popup:HTMLElement,form:HTMLFormElement}>{
        const {parent,}=item;
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
        Misc.simpleButton({anchor:form,text:"submit",bg:"black",color:"white",type:"submit",time:400});
        form.append(input);
        popup.appendChild(form);
        parent.appendChild(popup);
        return Promise.resolve({input,parent,popup,form}) as Promise<{input:HTMLInputElement,parent:HTMLElement,popup:HTMLElement,form:HTMLFormElement}>;
    };


    matchword(item:{target:HTMLTextAreaElement,selected:string,replace_:string,start:number,end:number,submit:HTMLButtonElement|null}):Promise<{content:string,submit:HTMLButtonElement|null}>{
        const {target,selected,replace_,start,end,submit}=item;
        const content=target.value;
        let newText="";
        if(content.includes(selected)){
            const len=content.length;
            const textStart=content.slice(0,start);
            const textEnd=content.slice(end,len);
            newText=textStart + " " + replace_ + " " + textEnd
        }
        return Promise.resolve({content:newText,submit}) as Promise<{content:string,submit:HTMLButtonElement|null}>;
    };


    async insertWord({target,span,start,end,node,idValues}:{target:HTMLElement,span:HTMLElement,start:number,end:number,node:Node,idValues:idValueType[]}):Promise<{ele:elementType|element_selType,found:boolean,idValues:idValueType[]}|undefined>{
        
        const selectionWords=node.textContent;
        let found:boolean=false;
        if(!selectionWords) return ;
        const len=selectionWords.length;
        const startStr=selectionWords.slice(0,start);
        const endStr=selectionWords.slice(end,len);
        const isChildNode=target.childNodes && [...target.childNodes].find(node_=>((node_.textContent)?.includes(selectionWords)));
        if(isChildNode){
            let count=0;
              const retResults= await Promise.all([...target.childNodes].map(async(child,index)=>{
                    //TEXT CONTENT CONTAINING THE SELECTED TEXT FOUND
                    count++;
                    const check=child.textContent===node.textContent;
                    const hasChilds=[...child.childNodes].length >0;
                    if(child.nodeName==="#text" && check){
                        const newEle=document.createElement("div");
                        //check===FOUND SELECTED TEXT
                        const startText= new Text(startStr);
                        const endText= new Text(endStr);
                        newEle.appendChild(startText) ;
                        newEle.appendChild(span);
                        newEle.appendChild(endText);
                        [...target.childNodes].forEach((ch,ind)=>{
                            const check=ch.textContent===child.textContent;
                            if(index===ind && check){
                                target.removeChild(ch);
                                target.appendChild(newEle);
                            }
                        });
                        found=true;

                        const{ ele:element,idValues:retValues}=await this._modSelector.updateElement({target,idValues,selRowCol:null});
                         this.element= element as elementType;
                         idValues=retValues
                     
                     return {ele:this.element,found:true,idValues};
                      
                    }else if(hasChilds){
                        const {newFound}=this.secondLevel({target,child,span,found,node,startStr,endStr,index});
                        
                        if(newFound){
                            //SECONDLEVEL ALREADY EMBEDDED THE MODIFIED TEXT IN TARGET GIVEN=>newFound===true
                            const{ ele:element,idValues:retValues}=await this._modSelector.updateElement({target,idValues,selRowCol:null});
                             this.element= element as elementType;
                             idValues=retValues
                             return {ele:this.element,found:true,idValues};
                            };
                        }
                        return {ele:undefined,found:false,idValues};
                    }));
                    const result=retResults.find(res=>(res.found)) || {ele:undefined,found:false,idValues};
                    return Promise.resolve(result) as Promise<{ele:elementType|element_selType,found:boolean,idValues:idValueType[]}>;
                }
    };



    secondLevel(item:{
        target:HTMLElement,
        child:ChildNode,
        span:HTMLElement,
        found:boolean,
        node:Node,
        startStr:string,
        endStr:string,
        index:number

    }):{newFound:boolean,inner_html:string}{
        const {target,child,found,node,startStr,endStr,span,index}=item;
        

        if(!found && child){
            const selectionWords=node.textContent as string;
           const results= [...child.childNodes].map((enfant,ind)=>{
                const check=enfant.textContent===selectionWords;
            //    console.log("enfant",enfant,"check",check)
                const newEle=document.createElement("div");
                if( check){
                  const responses=([...target.childNodes] as any as ChildNode[]).map((ch,indx)=>{
                        const check=ch.textContent===child.textContent
                        if(indx===index && check){
                            //WORKS
                            ch.removeChild(enfant);
                            const startText= new Text(startStr);
                            const endText= new Text(endStr);
                            newEle.appendChild(startText) ;
                            newEle.appendChild(span);
                            newEle.appendChild(endText);
                            ch.appendChild(newEle);
                            return{newFound:true,inner_html:target.innerHTML};
                        };
                        return {newFound:false,inner_html:target.innerHTML}
                    });
                    const response=responses.find(res=>(res.newFound)) || {newFound:false,inner_html:target.innerHTML}
                    return response
                }else{
                    return {newFound:false,inner_html:target.innerHTML}
                };
            });
            return results.find(res=>(res.newFound))|| {newFound:false,inner_html:target.innerHTML};
        };
        return {newFound:false,inner_html:target.innerHTML};
    };
};
export default EditText;
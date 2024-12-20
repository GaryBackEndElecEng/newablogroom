import { IconType } from "react-icons";
import { FaBold, FaCaretSquareDown, FaPalette, FaParagraph, FaUnderline,FaThumbsUp,FaSmile, FaHighlighter } from "react-icons/fa";
import { FaCircleUp } from "react-icons/fa6";
import Misc from "./misc";
import Header from "../editor/header";
import { FaCreate } from "./ReactIcons";


class EditText{
    toolbar_arr:{name:string,icon:IconType}[];
    _selected:string;
    _startEnd:{start:number,end:number};
    _content:string;
    _replaceText:string;

    constructor(){
        this.toolbar_arr=[
            {name:"P",icon:FaParagraph},
            {name:"underline",icon:FaUnderline},
            {name:"upperCase",icon:FaCircleUp},
            {name:"return",icon:FaCaretSquareDown},
            {name:"bold",icon:FaBold},
            {name:"color",icon:FaPalette},
            {name:"bg",icon:FaHighlighter},
        
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
                popup.style.cssText=css_col + "position:absolute;background-color:white;color:black;box-shadow:1px 1px 12px 1px lightblue;border-radius:12px;height:auto;z-index:100;top:90%;";
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
}
export default EditText;
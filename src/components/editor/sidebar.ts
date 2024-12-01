import {flexType,elementType,themeType,swapHeaderType, blogType, userType, element_selType, deletedImgType, selectorType, flexSelectorType} from "./Types";


import Main from "./main";
import ModSelector from "./modSelector";
import Header from "./header";
import Footer from "@/components/editor/footer";
import {FaCreate} from "@/components/common/ReactIcons";
import {FaTrash,FaCrosshairs,FaArrowAltCircleLeft} from "react-icons/fa";
import DisplayBlog from "../blog/displayBlog";
import Misc, {divider, divider_1,fadeOutType} from "@/components/common/misc";
import {button, buttonReturn,btnReturnType, btnType} from "@/components/common/tsFunctions";
import Edit from "./edit";
import Design from "../common/design";
import User from "../user/userMain";
import Service from "@/components/common/services";
import CustomHeader from "./customHeader";
import Flexbox from "./flexBox";
import HtmlElement from "./htmlElement";
import { getErrorMessage } from "@/lib/errorBoundaries";
import Nav from "../nav/headerNav";
import ShapeOutside from "./shapeOutside";
import Ven from "../common/venDiagram";
import Intro from "../common/instructions";
import LoadMisc from "../common/loadFiles";
import MetaBlog from "./metaBlog";
import RegSignIn from "../nav/regSignin";
import Reference from "./reference";
import NewCode from "./newCode";
import ChartJS from "../chart/chartJS";
import AddImageUrl from "../common/addImageUrl";
import CodeElement from "../common/codeElement";


export type extendType={
    id:number,
    btnColor:string,

}[]

export type themeType2={
    name:string,
    value:string,
    type:string,
    btnColors:extendType[]
}

class SideSetup{
static bgColor:string;
static btnColor:string;
_theme:themeType;
_themes:themeType[];
listThemeTypes:{name:string}[]=[{name:"background"},{name:"fonts"},{name:"colors"},{name:"buttons"},{name:"bgImage"},{name:"bgShade"}];

    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private _displayBlog:DisplayBlog,private _edit:Edit){
        SideSetup.bgColor=this._modSelector._bgColor;
        SideSetup.btnColor=this._modSelector.btnColor;
        this._theme={} as themeType;
        this._themes=[] as themeType[];
    }
    // //////GETTERS SETTERS/////
    get theme(){
        return this._theme;
    }
    set theme(theme:themeType){
        this._theme=theme
    }
    get themes(){
        return this._themes;
    }
    set themes(themes:themeType[]){
        this._themes=themes
    }
    // //////GETTERS SETTERS/////
    //INJECTION Main.container
    themeSetup(parent:HTMLElement|null,init:boolean){
        //INJECTED INTO CONTAINER Main.container
        if(parent){
            Sidebar.cleanUpID(parent,"themes")
        parent.style.position="relative";
        const container = document.createElement("section");
        container.id="themes";
        container.className = "";
        container.style.cssText=`margin:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;background-color:#0804f9;padding:1rem;z-index:100;border-radius:18px;box-shadow:1px 1px 3px 1px green,-1px -1px 3px 2px yellow;z-index:200;height:auto;`;
        container.style.top="20%";
        container.style.left="30%";
        container.style.right="30%";
        container.style.width="clamp(320px,550px,600px)";
       
        const innerContainer=document.createElement('div');
        innerContainer.style.cssText=`border-radius:inherit;background:white;margin-inline:auto;box-shadow:inherit;position:relative;margin-inline:${8}px;padding:0.5rem;width:100%;`;
        
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{top:"40%",left:"0%",right:"0%"}});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{top:"30%",left:"10%",right:"10%"}});

        this.rowTemplate(parent,container,innerContainer);

        container.appendChild(innerContainer);
        const {close,reset}=this.themeBtn(container);
        parent.appendChild(container);
        const containerEffect:fadeOutType={
            anchor:container,
            xpos:50,
            ypos:100,
            time:600
        }
        if(init){
            Misc.fadeIn(containerEffect);
        }
        close.addEventListener("click",(e:MouseEvent)=>{
            //CLOSE
            if(e){
                const fade:fadeOutType={
                    anchor:container,
                    xpos:50,
                    ypos:100,
                    time:600
                }
                Misc.fadeOut(fade);
                setTimeout(()=>{
                    parent.removeChild(container);
                },580);
            }
        });
     
        reset.addEventListener("click",(e:MouseEvent)=>{
            //CLOSE
            if(e){

                this.resetTheme(parent);
                const fade:fadeOutType={
                    anchor:container,
                    xpos:50,
                    ypos:100,
                    time:1000
                }
                Misc.fadeOut(fade);
                setTimeout(()=>{
                    parent.removeChild(container);
                },980);
            }
        });
        }
    }
    themeBtn(innerTheme:HTMLElement):{close:HTMLButtonElement,select:HTMLButtonElement,reset:HTMLButtonElement}{
        const btnContainer=document.createElement("div");
        btnContainer.id="theme-btns"
        btnContainer.style.cssText="display:inline-flex;justify-content:center;gap:1rem;flex-wrap:wrap;"
        const close:btnType={
            parent:btnContainer,
            text:"close",
            bg:"#00008B",
            color:"white",
            type:"button"
        }
        innerTheme.appendChild(btnContainer)
        const closeBtn=buttonReturn(close)
        const select:btnType={
            parent:btnContainer,
            text:"select",
            bg:"#0CAFFF",
            color:"white",
            type:"button"
        }
        innerTheme.appendChild(btnContainer)
        const selectBtn=buttonReturn(select)
        const reset:btnType={
            parent:btnContainer,
            text:"reset",
            bg:"#007FFF",
            color:"white",
            type:"button"
        }
        innerTheme.appendChild(btnContainer)
        const resetBtn=buttonReturn(reset)
        return {close:closeBtn,select:selectBtn,reset:resetBtn}
    }
    rowTemplate(parent:HTMLElement,container:HTMLElement,innerContainer:HTMLElement){
        //parent=Main.container (#main)
        const blog=this._modSelector._blog;
        parent.style.position="relative";
        const row=document.createElement('div');
        row.style.cssText="display:flex;flex-direction:row;flex-wrap:wrap;gap:0.62rem;margin:auto;justify-content:space-around;align-items:center;width:100%;position:relative;";
        innerContainer.appendChild(row);
        const selStyle="display:flex;flex-direction:column;place-items:center;border-radius:10px;cursor:pointer;font-size:9px;";
        //listThemeTypes:{name:string}[]=[{name:"background"},{name:"fonts"},{name:"colors"},{name:"buttons"},{name:"bgImage"},{name:"bgShade"}];
        this.listThemeTypes.map(listItem=>{
            const column=document.createElement("div");
            column.className="form-group";
            column.style.cssText="margin:auto;width:clamp(75px,120px,150px);position:relative;display:flex;flex-direction:column;align-items:center;min-height:75px;padding-inline:1rem;padding-block:0rem;border-radius:20px;background-color:#002244;color:white;font-size:10px;";
            
            const select=document.createElement("select");
            select.id=`${listItem.name}`;
            select.style.cssText=selStyle;
            select.className="form-control";
            const label=document.createElement("label");
            label.setAttribute("for",`${listItem.name}`);
            label.textContent=listItem.name;
            if(listItem.name ==="background"){
                Misc.background?.forEach(cl=>{
                    const option=document.createElement("option");
                    option.style.cssText=`font-size:9px;background-color:${cl.value};`;
                    option.textContent=cl.name
                    option.value=cl.value;
                    select.style.fontFamily="";
                    select.appendChild(option);
                });
                column.appendChild(label);
                column.appendChild(select);
                row.appendChild(column);
                select.onchange=(e:Event)=>{
                    if(e){
                        const value=(e.currentTarget as HTMLSelectElement).value;
                        parent.style.backgroundColor=value;
                        this._modSelector.blog={...blog,cssText:parent.style.cssText};
                        // Header.cleanUp(parent);
                        // this._edit.main(parent,this._modSelector._blog);
                        Header.cleanUpByID(parent,"themes");
                        this.themeSetup(parent,false);
                        Misc.message({parent:container,msg:"added",type_:"success",time:500});
                    }
                };
            }else if(listItem.name==="colors"){
                Misc.colors?.forEach(cl=>{
                    const option=document.createElement("option");
                    option.style.cssText=``;
                    option.style.cssText=`font-size:10px;color:white;background-color:${cl.value};`;
                    option.textContent=cl.name
                    option.value=cl.value;
                    select.style.fontFamily="";
                    select.appendChild(option);
                });
                select.onchange=(e:Event)=>{
                    if(e){
                        const value=(e.currentTarget as HTMLSelectElement).value;
                        parent.style.color=value;
                        this._modSelector.blog={...blog,cssText:parent.style.cssText};
                        // Header.cleanUp(parent);
                        // this._edit.main(parent,this._modSelector._blog);
                        Header.cleanUpByID(parent,"themes");
                        this.themeSetup(parent,false);
                        Misc.message({parent:container,msg:"added",type_:"success",time:500});
                    }
                };
                column.appendChild(label);
                column.appendChild(select);
                row.appendChild(column);
    
            }else if(listItem.name==="buttons"){
                Misc.colors?.forEach(cl=>{
                    const option=document.createElement("option");
                    option.style.cssText=``;
                    option.style.cssText=`font-size:10px;color:white;background-color:${cl.value};`;
                    option.textContent=cl.name
                    option.value=cl.value;
                    select.style.fontFamily="";
                    select.appendChild(option);
                });
                select.onchange=(e:Event)=>{
                    if(e){
                        const value=(e.currentTarget as HTMLSelectElement).value;
                        const textarea=document.querySelector("div#textarea") as HTMLElement;
                        const getBtns=textarea.querySelectorAll("[is-btn = 'true']") as unknown as HTMLButtonElement[];
                        if(getBtns){
                            ([...getBtns]).map((btn)=>{
                                if(btn){
                                    btn.style.backgroundColor=value
                                }
                            });
                        }
                        // Header.cleanUp(parent);
                        // this._edit.main(parent,this._modSelector._blog);
                        Header.cleanUpByID(parent,"themes");
                        this.themeSetup(parent,false);
                        Misc.message({parent:container,msg:"added",type_:"success",time:500});
                    }
                };
                column.appendChild(label);
                column.appendChild(select);
                row.appendChild(column);
    
            }else if(listItem.name==="fonts"){
                Misc.font_family?.forEach(cl=>{
                    const option=document.createElement("option");
                    option.textContent=cl.name
                    option.value=cl.value;
                    option.style.fontFamily=cl.value;
                    select.appendChild(option);
                });
                column.appendChild(label);
                column.appendChild(select);
                row.appendChild(column);
                select.onchange=(e:Event)=>{
                    if(e){
                        const value=(e.currentTarget as HTMLSelectElement).value;
                        parent.style.fontFamily=value;
                        this._modSelector.blog={...blog,cssText:parent.style.cssText};
                        // Header.cleanUp(parent);
                        // this._edit.main(parent,this._modSelector._blog);
                        Header.cleanUpByID(parent,"themes");
                        this.themeSetup(parent,false);
                        Misc.message({parent:container,msg:"added",type_:"success",time:500});
                    }
                };
            }else if(listItem.name==="bgImage"){
                const btnBg=buttonReturn({parent:row,text:listItem.name,bg:"#1F305E",color:"white",type:"button"});
                btnBg.onclick=(e:MouseEvent)=>{
                    if(e){
                        // console.log("CLICK",btnBg)//work
                        this.backgroundImg(parent);
                        parent.removeChild(container)
                    }
                };
                innerContainer.appendChild(row);
            }else if(listItem.name==="bgShade"){
                const btnBg_=buttonReturn({parent:row,text:listItem.name,bg:"#1F305E",color:"white",type:"button"});
                btnBg_.onclick=(e:MouseEvent)=>{
                    if(e){
                       
                        this.bgShade(parent);
                        parent.removeChild(container)
                    }
                };
                innerContainer.appendChild(row);
               
            }
        });

    }
    generateSelect(parent:HTMLElement,container:HTMLElement,select:HTMLSelectElement,type:string){
        //parent=Main.container
        select.onchange=(e:Event)=>{
            if(e){
                const listItem:{name:string,value:string}=JSON.parse((e.currentTarget as HTMLSelectElement).value as string) as {name:string,value:string};
                if(listItem && listItem.name){
                    const blog=this._modSelector.blog;
                    console.log("outside",listItem)
                    if(type==="fonts"){
                        parent.style.fontFamily=listItem.value;
                        this._modSelector.blog={...blog,cssText:parent.style.cssText};
                        this._edit.main(parent,this._modSelector._blog);
                        Misc.message({parent:container,msg:"added",type_:"success",time:500});
                    }else if(type==="background"){
                        parent.style.backgroundColor=listItem.value;
                        this._modSelector.blog={...blog,cssText:parent.style.cssText};
                        this._edit.main(parent,this._modSelector._blog);
                        Misc.message({parent:container,msg:"added",type_:"success",time:500});
                    }else if(type==="colors"){
                        (Main.textarea as HTMLElement).style.color=listItem.value;
                        this._modSelector.blog={...blog,cssText:parent.style.cssText};
                        this._edit.main(parent,this._modSelector._blog);
                        Misc.message({parent:container,msg:"added",type_:"success",time:500});
                    }else if(type==="buttons"){
                        this._modSelector.btnColor=listItem.value;
                        const textarea=document.querySelector("div#textarea") as HTMLElement;
                        const getBtns=textarea.querySelectorAll("button") as unknown as HTMLButtonElement[];
                        Misc.message({parent:container,msg:"added",type_:"success",time:500});
                        ([...getBtns]).map((btn)=>{
                            if(btn){
                                btn.style.backgroundColor=listItem.value
                            }
                        });
                        this._edit.main(parent,this._modSelector._blog);
                    }
                   
                }

            }
        };
    }
   
    resetTheme(parent:HTMLElement){
        if(!Main.textarea || !Main.topMain) return;
        Sidebar.btnEles=Sidebar.getBtns();
        const btnsSave:{id:number,bgColor:string}[]|undefined=Sidebar.btnEles?.map((btn,index)=>({id:index,bgColor:btn.style.backgroundColor}));
        parent.style.fontFamily="Times";
        parent.style.backgroundColor="white";
        parent.style.color="black";
        parent.style.backgroundImage="";
        parent.style.backgroundPosition="";
        parent.style.backgroundSize="";
        // this._modSelector.saveTheme(Main.textarea,null); //updating blog cssText
        this._modSelector.btnColor="#0C090A";
        const blog=this._modSelector._blog;
        if(blog.imgBgKey){
            this._service.adminImagemark(blog.imgBgKey).then(async(res)=>{
                if(res){
                    Misc.message({parent,msg:`${blog.imgBgKey}`,type_:"success",time:700});
                }
            });
        }
        this._modSelector._blog={...blog,cssText:parent.style.cssText};
        this._modSelector.blog=this._modSelector._blog;
        this._edit.main(parent,this._modSelector._blog);
        Sidebar.btnEles?.map((btn,index)=>{
            btnsSave?.map(item=>{
                if(btn && item.id===index){
                    btn.style.backgroundColor=item.bgColor;
                }
            });
        });
        
    }
    backgroundImg(parent:HTMLElement){
        // const mainInjection = document.getElementById("mainInjection");
        // if(!mainInjection)return;
       
        if(!parent) return;
       
        parent.style.position="relative";
        const innerContainer=document.createElement("section");
        innerContainer.style.cssText="margin:auto;background:white;display:flex;flex-direction:column;position:absolute;inset:0%;width:clamp(250px,300px,300px);border-radius:inherit;background-color:whitesmoke;box-shadow:inherit;max-height:220px;z-index:200;";
        innerContainer.className="d-flex flex-column align-items-center";
        const title=document.createElement("h6");
        title.className="text-center text-primary lean display-6";
        title.style.cssText="width:fit-content;font-size:130%;"
        title.textContent="Upload a bg-image";
        innerContainer.appendChild(title);
        const form=document.createElement("form");
        form.style.cssText=`display:flex;flex-direction:column;align-items:center;gap-:2rem;align-items:center;justify-content:flex-start;width:inherit;padding:1rem;position:relative;width:100%;`;
        const grpForm=document.createElement("div");
        grpForm.className="form-group w-100";
        grpForm.style.cssText="width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center; gap-1;margin-inline:auto;";
        const label=document.createElement("label");
        label.setAttribute("for","img");
        label.textContent="image upload";
        label.classList.add("form-control");
        const input=document.createElement("input");
        input.style.cssText="width:95%;"
        input.name="file";
        input.id="file";
        label.setAttribute("for",`${input.id}`);
        input.className="form-control";
        input.type="file";
        input.accept="image/png image/jpg";
        grpForm.appendChild(label);
        grpForm.appendChild(input);
        form.appendChild(grpForm);
        const btn_:btnReturnType={
            parent:form,
            text:"submit",
            bg:"#13274F",
            color:"white",
            type:"submit"
        }
        const btn=buttonReturn(btn_);
        btn.disabled=true;
        //DELETION
        const xDivIcon=document.createElement("div");
        xDivIcon.id="xDivIcon";
        xDivIcon.style.cssText="position:absolute;padding:5px;background-color:black;top:0%;left:100%;transform:translate(-30px,5px);border-radius:50%;";
        FaCreate({parent:xDivIcon,name:FaCrosshairs,cssStyle:{fontSize:"16px",color:"white"}});
        //APPENDING
        innerContainer.appendChild(xDivIcon);
        
        //DELETION
        //APPENDING ELEMENTS
        innerContainer.appendChild(form);
        parent.appendChild(innerContainer);
        Misc.growIn({anchor:innerContainer,scale:0,opacity:0,time:400});
        //TO DELETE
        xDivIcon.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:innerContainer,scale:0,opacity:0,time:400});
                setTimeout(()=>{parent.removeChild(innerContainer)},398);
            }
        };
        //TO DELETE
         //APPENDING ELEMENTS
        
        input.addEventListener("click",(e:MouseEvent) => {
            if(e){
                btn.disabled=false
            }
        });
        
        form.addEventListener("submit",(e:SubmitEvent) => {
            if(e){
                e.preventDefault();
                const filedata=new FormData(e.currentTarget as HTMLFormElement);
                const file=filedata.get("file");
                // console.log("bg-image:file",file)
                if(file && Main.textarea){
                    const imgUrl=URL.createObjectURL(file as File);
                    /// loading into top container////
                    //Main.container.style.cssText = Main.main_css
                    parent.style.backgroundImage=`url(${imgUrl})`;
                    parent.style.backgroundSize=`100% 100%`;
                    parent.style.backgroundPosition=`50% 50%`;
                    parent.classList.add("bgShade");
                    Main.main_css +=`background-image:url(${imgUrl});background-size:100% 100%;background-position:50% 50%;`;
                   const theme:themeType[]=[
                    {name:"background",type:"backgroundImage",value:`url(${imgUrl})`},
                    {name:"background",type:"backgroundSize",value:`100% 100%`},
                    {name:"background",type:"backgroundPosition",value:`50% 50%`},
                   ];

                    this._modSelector._blog={...this._modSelector._blog,eleId:parent.id};
                    let _blog=this._modSelector._blog;
                    const user=this._user.user;
                
                    if(_blog && user && user.id && _blog.name){
                        // if(_blog.imgBgKey){
                        //     const deletedImg:deletedImgType={imgKey:_blog.imgBgKey,del:true,date:new Date()}
                        //     this._service.markDelKey(deletedImg);//marking delete on exiting image
                        // }
                        //GENERATING NEW KEY
                        const {Key}=this._service.generateFreeImgKey({formdata:filedata,user}) as {Key:string};
                        _blog={..._blog,user_id:user.id,imgBgKey:Key};
                        this._modSelector._blog=_blog;
                        this._modSelector.blog=this._modSelector._blog;

                        this._service.uploadfreeimage({parent,formdata:filedata}).then(async(res)=>{
                            if(res){
                                parent.style.backgroundImage=`url(${res.img})`;
                                parent.style.backgroundSize="100% 100%";
                                parent.style.backgroundPosition="50% 50%";
                                this._service.promsaveItems(_blog).then(async(blog_)=>{
                                    if(blog_){
                                        this._modSelector.saveTheme(parent,theme);
                                        //SENDING IT TO SIMPLE UPLOAD PROCESS:BgImage has no element
            
                                        // this._user.askSendToServer({bg_parent:parent,formdata:filedata,image:null,blog:this._modSelector._blog,oldKey:null});
                                    }
                                });
                            }
                        });
                    }
                    parent.removeChild(innerContainer);
                   
                }
            }
        });
    }
    bgShade(parent:HTMLElement){
        //parent=Main.container
        // row.parentElement=#main=>(#main children=>#sectionHeader,#textarea,#mainFooter)
        //CREATING ARRAY FOR SELECTION
        parent.style.position="relative";
        (Main.textarea as HTMLElement).style.background="";
        const arrShades:{name:string,value:string}[]=[];
        for(let i=0; i<50;i++){
            const insert=i/100;
            arrShades.push({name:`${i}%`,value:`rgba(0,0,20,${insert})`});
        }
        //CREATING ARRAY FOR SELECTION
        const title=document.createElement("h6");
        title.className="text-center my-2 text-primary lean display-6";
        title.textContent="background shade";
        const innerContainer=document.createElement("div");
        innerContainer.style.cssText="position:absolute;width:clamp(300px,350px,400px);border-radius:20px;box-shadow:1px 1px 12px 1px black;height:auto;display:flex;flex-direction:column;place-items:center;padding:1rem;z-index:2000;background-color:white;";
        innerContainer.style.top="20%";
        innerContainer.style.left="35%";
        innerContainer.style.right="35%";
        innerContainer.style.height="auto";
        const form=document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;margin:auto;width:100%;";
        //APPENDING-FORMGRP 
        const cssStyle={backgroundColor:"",fontSize:"10px"}
        const cssStyle2={backgroundColor:"",fontSize:"10px"}
        const cssStyleEffect={backgroundColor:"",fontSize:"10px"}
        const selects=arrShades;
        //SHADE
        const {select:selectShade,label:labelShade}=Misc.selectComponent({parent:form,name:"shade",cssStyle,selects});
       
        selectShade.style.borderRadius="6px";
        selectShade.name="select";
        selectShade.id="select";
        selectShade.style.cssText="margin-inline:auto;min-width:75px;"
        labelShade.setAttribute("for",`${selectShade.id}`);
        //SHADE
        //EFFECT
        const effects=[{name:"select",value:""},{name:"angle 45",value:"45deg"},{name:"to left",value:"to left"},{name:"to right",value:"from left"},{name:"polar blend extend",value:"in hsl longer hue"},{name:"polar color",value:"in hsl"},{name:"angle bottom=>top",value:"to left top"},];
        const {select:selectEffect}=Misc.selectComponent({parent:form,name:"effects",cssStyle:cssStyleEffect,selects:effects});
        selectEffect.style.borderRadius="6px";
        selectEffect.name="select";
        selectEffect.id="selectEffect";
        selectEffect.style.cssText="margin-inline:auto;min-width:75px;"
        labelShade.setAttribute("for",`${selectEffect.id}`);
        //EFFECT
        //BLUES
        const selectBlueShades=Misc.blueShades
        const {select:selectBlue}=Misc.selectComponent({parent:form,name:"blue shade",cssStyle:cssStyle2,selects:selectBlueShades});
        selectBlue.style.borderRadius="6px";
        selectBlue.name="select";
        selectBlue.id="selectBlue";
        selectBlue.style.cssText="margin-inline:auto;min-width:75px;"
        labelShade.setAttribute("for",`${selectBlue.id}`);
        //BLUES
        //APPENDING
        const divBtn=document.createElement("div");
        divBtn.style.cssText="display:flex;justify-content:space-around;flex-wrap:nowrap;";
        const reset=buttonReturn({parent:divBtn,text:"reset",bg:Nav.btnColor,color:"white",type:"button"});
        const okay=buttonReturn({parent:divBtn,text:"okay",bg:Nav.btnColor,color:"white",type:"button"});
        form.appendChild(divBtn);
        innerContainer.appendChild(title)
        innerContainer.appendChild(form)
        parent.appendChild(innerContainer);
        //APPENDING
        selectShade.onchange=(e:Event)=>{
            if(e){
                const shade=((e.currentTarget as HTMLSelectElement).value) as string;
                // parent.style.cssText +=`background:linear-gradient(${shade});`;
                const cssText_={background:shade};
                const effect=(selectEffect as HTMLSelectElement).value;
                this.insertBgShade({target:parent,insert:cssText_,effect:effect});
                const blog=this._modSelector.blog;
                parent.classList.add("bgShade");
                const cssText=parent.style.cssText;
                this._modSelector._blog={...blog,cssText:cssText};
                this._modSelector.blog=this._modSelector._blog;
                
               
            }
        };
        selectBlue.onchange=(e:Event)=>{
            if(e){
                const shade=((e.currentTarget as HTMLSelectElement).value) as string;
                // parent.style.cssText +=`background:linear-gradient(${shade});`;
                const cssText_={background:shade}
                const effect=(selectEffect as HTMLSelectElement).value;
                this.insertBgShade({target:parent,insert:cssText_,effect:effect});
                const blog=this._modSelector.blog;
                const cssText=parent.style.cssText;
                this._modSelector._blog={...blog,cssText:cssText};
                this._modSelector.blog=this._modSelector._blog;
                // const hasAdded=this.insertBgImageShade(parent,)
                // console.log("parent.style.cssText",parent.style.cssText)
            }
        };
        selectEffect.onchange=(e:Event) =>{
            if(e){
                const effect=((e.currentTarget as HTMLSelectElement).value) as string;
                selectEffect.value=effect ? effect : "";
            }
        }
        okay.onclick=(e:MouseEvent)=>{
            if(e){

                parent.removeChild(innerContainer);
                parent.classList.add("bgShade");
                this._modSelector.blog={...this._modSelector._blog,class:parent.className}
            }
        };
        reset.onclick=(e:MouseEvent)=>{
            if(e){
                parent.style.background="";
                parent.style.backgroundColor="";
                document.body.style.backgroundColor="white";
                (Main.textarea as HTMLElement).style.background="";
                const cssText=parent.style.cssText;
                const blog=this._modSelector._blog;
                this._modSelector._blog={...blog,cssText:cssText};
                this._modSelector.blog=this._modSelector._blog;
                parent.classList.remove("bgShade");
            }
        };
        Misc.matchMedia({parent:innerContainer,maxWidth:900,cssStyle:{top:"30%",left:"20%",right:"20%"}});
        Misc.matchMedia({parent:innerContainer,maxWidth:400,cssStyle:{top:"35%",left:"0%",right:"0%"}});

    }
    insertBgShade(item:{target:HTMLElement,insert:{[key:string]:string},effect:string}):string{
        //MODIFY THE TARGET ELEMENT CSS AND RETURNS cssText string
        const {target,insert,effect}=item;
        for(const [key,valueOld] of Object.entries(target.style)){
            for(const [key1,valueNew] of Object.entries(insert)){
                if(key===key1){
                    const isUrl=valueOld.includes("url(");
                    const openBrack:RegExp=/\(/g;
                    const closeBrack:RegExp=/\)/g;
                    const openUrl:RegExp=/(url\()/g;
                    const linear:RegExp=/(linear\-gradient)/g;
                    const isLinear=this.checkRegExp({str:valueOld,reg:linear});
                    
                    const parseValue=valueOld.split(",");//separates Url and linear
                    const insertEffect= effect ? effect : "to left";
                   
                    
                    switch(true){
                        case key==="backgroundImage":
                            target.style[key]=`${valueNew}`;
                        break;
                        case isUrl && isLinear && key==="background":
                            if(!(parseValue && parseValue.length)) break;
                            const getUrlObj=this.getRegExpStartEnd({str:valueOld,startReg:openUrl,endReg:closeBrack,effect});
                            const getLinearOriginal=this.getRegExpStartEnd({str:valueOld,startReg:openBrack,endReg:closeBrack,effect});
                            const getLinearAdded=this.getRegExpStartEnd({str:valueNew,startReg:openBrack,endReg:closeBrack,effect});
                            const css =`linear-gradient(${insertEffect},${getLinearOriginal.exp},${getLinearAdded.exp}),url(${getUrlObj.exp})`;
                            target.style[key]=css.trim();
                            // console.log("target.key=",target.style[key])
                        break;
                        case !isUrl && isLinear && key==="background":
                            const getLinearOriginal2=this.getRegExpStartEnd({str:valueOld,startReg:openBrack,endReg:closeBrack,effect});
                            if(!effect){
                            const css_ =`linear-gradient(${getLinearOriginal2.exp},${valueNew})`;
                            target.style[key]=css_.trim()
                            }else{
                                // console.log("611:CHANGE" ,"valueNew",valueNew,"valueOLd",valueOld,"effect",effect);
                                const css_ =`linear-gradient(${effect},${getLinearOriginal2.exp},${valueNew})`;
                                target.style[key]=css_.trim()
                            }
                        break;
                        case !isLinear && !isUrl && key==="background":
                            if(valueNew && valueOld ){
                                //have => background:color
                                if(effect){
                                    target.style[key]=`linear-gradient(${effect},${valueOld},${valueNew})`;
                                }else{
                                    target.style[key]=`linear-gradient(${valueOld},${valueNew})`;
                                }
                                //converted linear-gradient() to add color
                            }else if(valueNew){
                                //new=> background:color
                                // console.log("value1",valueNew)
                                target.style[key]=valueNew;
                            }
                        break;
                        default:
                            break;
                    }
            }
                
            }
        }
        return target.style.cssText
    }
   async saveWorkSetup(parent:HTMLElement,blog:blogType): Promise<{retBtn:HTMLButtonElement,retCanc:HTMLButtonElement,retParent:HTMLElement,container:HTMLElement}>{
        const divCont=document.createElement("div");
        divCont.className="eleContainer";
        divCont.style.cssText="margin:0px;margin-left:0.35rem;"
        parent.style.position="relative";
        const container = document.createElement("section");
        container.id="main";
        container.className = "";
        container.style.cssText="margin:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch;width:100%;position:absolute;inset:-5% 0%;height:auto;background-color:white;padding:1rem;padding-block:2rem;z-index:100;"
           await  this._displayBlog.saveFinalWork({outerContainer:container,innerContainer:container,blog});
            //BUTTON SELECTION
            const btnDiv=document.createElement("div");
            btnDiv.style.cssText="display:flex;flex-direction:column;margin:auto;align-items:center;justify-content:center;";
            const btnGroup=document.createElement("div");
             btnGroup.style.cssText="display:flex;gap:0.5rem;alignitems:center;justify-content:center;";
            const message:btnReturnType={
                parent:btnGroup,
                text:"save",
                bg:"#00008b",
                color:"white",
                type:"button"
            }
            const cancel:btnReturnType={
                parent:btnGroup,
                text:"cancel",
                bg:"#da1afb",
                color:"white",
                type:"button"
            }
            const retBtn=buttonReturn(message);
            const retCanc=buttonReturn(cancel);
            container.appendChild(btnGroup);
           const {divcont} = divider({parent:container,numLines:3,divCont,color:SideSetup.btnColor});
            container.animate([
                {transform:"translateX(-100%) scale(0.4)",opacity:"0"},
                {transform:"translateX(0%) scale(1)",opacity:"1"},
            ],{duration:600,iterations:1});
            container.appendChild(divcont);
            parent.appendChild(container);
            return {retBtn,retCanc,retParent:parent,container}
    }
    getRegExpStartEnd(item:{str:string,startReg:RegExp,endReg:RegExp,effect:string}):{start:number,end:number,exp:string}{
        const {str,startReg,endReg,effect}=item;
        const matchstarts=str.matchAll(startReg) as any ;
        const matchends=str.matchAll(endReg) as any ;
        const startArr:{start:number,end:number,exp:string}[]=[];
        const endArr:{start:number,end:number,exp:string}[]=[];
        let retRes:{start:number,end:number,exp:string}|undefined;

        for (const match of matchstarts) {
            if(!(match && match.index)) return {start:0,end:0,exp:""}
            startArr.push({start:match.index,end:match.index + match.length,exp:match[0]});
          }
        for (const match of matchends) {
            if(!(match && match.index)) return {start:0,end:0,exp:""}
            endArr.push({start:match.index,end:match.index + match.length,exp:match[0]});
          }
          const start=startArr[0].start;
          const end=endArr[endArr.length-1].end;
          if(effect){
          const exp=str.slice(start+1,end-1).split(`${effect},`)[1];
          retRes={start:start,end:end,exp:exp}
          console.log("701:EXTRACTED",retRes)
          return retRes
          }else{
            const exp=str.slice(start+1,end-1);
          retRes={start:start,end:end,exp:exp}
          console.log("701:EXTRACTED",retRes)
          return retRes
          }

    }
    checkRegExp(item:{str:string,reg:RegExp}):string|undefined{
        const {str,reg}=item;
        let exp:string|undefined;
        const all=str.matchAll(reg) as any;
        for(const match of all){
            exp=match[0]
        }
        return exp
    }
    RGBAToHexA(rgba:string, forceRemoveAlpha = false) {
        return "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
          .split(',') // splits them at ","
          .filter((string, index) => !forceRemoveAlpha || index !== 3)
          .map(string => parseFloat(string)) // Converts them to numbers
          .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
          .map(number => number.toString(16)) // Converts numbers to hex
          .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
          .join("") // Puts the array to togehter to a string
      }
   static saveNoBlogSetup(parent:HTMLElement): {retParent:HTMLElement,retBtn:HTMLButtonElement,container:HTMLElement}{
        const container = document.createElement("section");
            container.id="main";
            container.className = "";
            container.style.cssText=`margin:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch;width:100%;position:absolute;inset:25%;height:auto;background-color:white;padding:1rem;padding-block:2rem;z-index:100;border-radius:20px;box-shadow:1px 1px 10px 1px ${SideSetup.btnColor},-1px -1px 10px 1px ${SideSetup.btnColor};`
            const title=document.createElement("h3");
            title.textContent="about this button";
            title.style.cssText="text-align:center;margin-bottom:2rem;";
            title.className="text-primary";
            const desc=document.createElement("p");
            desc.style.cssText="margin-block:1rem";
            desc.className="px-md-2 ";
            desc.innerHTML=`This button allows you to recover your work encase you refresh the page.
            <span style="color:red; font-size:105%">CAUTION</span><span style="color:${this.btnColor}">!!</span>, if you are concern about loosing your work, please save your work.<br/>
                How to save your work?: 
                <ul>
                <li> press the <pre style="font-style:italic;">'final'button ( top-right)</pre></li>
                <li> then <pre style="font-style:italic;">"save"</pre>.</li>
                </ul>
                <br/> 
                Similarly, if you want to print your final work:
                <ul> 
                <li>press the button <span style="font-style:italic;"> "final"</span>
                </li>
                <li>
                then press <span style="font-style:italic;"> "print"</span>
                </li>
                <br/>
                your work will be encapsulated in an image for best viewing.
                <br/>
                <q><pre>Thanks for understanding and enjoy</pre></q>;
            `;
            container.appendChild(title);
            container.appendChild(desc);
            const div=document.createElement("div");
            div.style.cssText="display:grid;place-items:center;margin:5rem;";
            const message:btnReturnType={
                parent:div,
                text:"close",
                bg:SideSetup.btnColor,
                color:"white",
                type:"button"
            }
            const retBtn=buttonReturn(message);
            container.appendChild(retBtn);
            parent.removeChild(container);
        return {retParent:parent,retBtn,container}
    }
   static fillBlogNameDesc(parent:HTMLElement):{btn:HTMLButtonElement,popup:HTMLElement,form:HTMLFormElement,input:HTMLInputElement,textarea:HTMLTextAreaElement}{
        parent.style.position="relative";
        parent.style.zIndex="0";
        const width=window.innerWidth <500 ? "0%":"30%";
        const popup=document.createElement("section");
        popup.id="popup-blogNameDesc";
        popup.style.cssText="margin:auto;position:absolute;background-color:white;filter:drop-shadow(0 0 0.75rem crimson);border-radius:7px;z-index:200;padding:1rem;";
        popup.style.inset=`20% ${width} 40% ${width}`;
        const form=document.createElement("form");
        form.style.cssText="display:flexflex-direction:column;align-items:center;justify-content:center;gap:1rem;";
        const {input,label:labelName}=Nav.inputComponent(form);
        input.placeholder="your blog name";
        labelName.textContent="blog Name";
        labelName.className="display-6 text-primary";
        input.name="name";
        const {textarea,label:labelDesc}=Nav.textareaComponent(form);
        labelDesc.className="display-6 text-primary"
        textarea.placeholder="brief description";
        textarea.name="desc";
        const btn=buttonReturn({parent:form,color:"white",bg:SideSetup.btnColor,text:"submit",type:"submit"});
        //APPENDING FORM TO POPUP
        popup.appendChild(form);
        //APPENDING POPUP TO PARENT
        parent.appendChild(popup);
        return {btn,popup,form,input,textarea}



    }
   static signInForm(parent:HTMLElement):{btn:HTMLButtonElement,popup:HTMLElement,form:HTMLFormElement,email:HTMLInputElement,password:HTMLInputElement}{
        parent.style.position="relative";
        parent.style.zIndex="0";
        const width=window.innerWidth <500 ? "0%":"30%";
        const popup=document.createElement("section");
        popup.id="popup-signIn";
        popup.style.cssText="margin:auto;position:absolute;background-color:white;filter:drop-shadow(0 0 0.75rem crimson);border-radius:7px;padding:1rem;";
        popup.style.inset=`20% ${width} 40% ${width}`;
        const form=document.createElement("form");
        form.style.cssText="display:flexflex-direction:column;align-items:center;justify-content:center;gap:1rem;";
        const {email:email,label:labelEmail}=Nav.emailComponent(form);
        email.placeholder="your email";
        labelEmail.textContent="email";
        labelEmail.classList.add("display-6");
        email.name="email";
        email.placeholder=" requires a form of mymail@mail.com"
        const {password,label:labelPass}=Nav.passwordComponent(form);
        labelPass.textContent="password";
        labelPass.classList.add("display-6");
        password.placeholder="must be more that 5 characters";
        password.name="password";
        const btn=buttonReturn({parent:form,color:"white",bg:SideSetup.btnColor,text:"submit",type:"submit"});
        //APPENDING FORM TO POPUP
        popup.appendChild(form);
        //APPENDING POPUP TO PARENT
        parent.appendChild(popup);
        
        return {btn,popup,form,email,password}
    }
}



class Sidebar{
    pic="/images/gb_logo.png";
    url="/api/uploadImage"
    bgColor="#042b42";
    btnColor:string;
    textColor:string="#7ad6e8";
    textFontSize:string="14px";
    flex:flexType;
    _main:Main;
   static headerType:swapHeaderType;
   static btnEles:HTMLButtonElement[] |null;
    _header:Header;
    _footer:Footer;
    _edit:Edit;
    htmlelement:HtmlElement;
    _displayBlog:DisplayBlog;
    sideSetup:SideSetup;
    loadMisc:LoadMisc;
    _selectors_:flexSelectorType[]
    ven:Ven;
    intro:Intro;
    reference:Reference;
    // DROP-DOWN SELECTOR FOR EACH BOX
   design:Design;
   addImage:AddImageUrl;
    _elements:elementType[]=[];
    codeElement:CodeElement
    //Column GENERATOR
    arrCol=[{col:1,num:12},{col:2,num:6},{col:3,num:4},{col:4,num:3},{col:6,num:2}]
    //-------------------INITIALIZE---------------------///


    
    
    //---------------------INITIALIZE------------------------///

    constructor(private _modSelector:ModSelector,private _service:Service,main:Main, private _flexbox:Flexbox,private _code:NewCode,header:Header,public customHeader:CustomHeader,footer:Footer,edit:Edit,private _user:User,private _regSignin:RegSignIn,displayBlog:DisplayBlog,public chart:ChartJS,public shapeOutside:ShapeOutside,private _metablog:MetaBlog){
        this.flex={} as flexType;
        this._selectors_=Flexbox.selectors_;
        this.btnColor=this._modSelector.btnColor;
        this._main=main;
        this._header=header;
        this._footer=footer;
        this._edit=edit;
        this.reference= new Reference(this._modSelector);
        this.htmlelement=new HtmlElement(this._modSelector,this._service,this._user,this.shapeOutside)
        this._displayBlog=displayBlog;
        Sidebar.headerType={normal:true,custom:false}
        this.sideSetup= new SideSetup(this._modSelector,this._service,this._user,this._displayBlog,this._edit);
        this.design= new Design(this._modSelector,this.htmlelement);
        this.ven= new Ven(this._modSelector);
        this.intro=new Intro(this._modSelector,this._service);
        this.loadMisc= new LoadMisc(this._modSelector,this._service);
        this.loadBlog().then(async(res)=>{
            if(res){
                //uploading it from Storage
                const blog=JSON.parse(res);
                this._modSelector._blog={...blog};
            }
        });
        this.addImage=new AddImageUrl(this._modSelector,this._service);
    }
    //------GETTER SETTERS-----/////
    
    get elements(){
        return this._modSelector.elements
    }
    set elements(elements:elementType[]){
        this._modSelector.elements=elements;
    }
    get placement(){
        return this._modSelector._placement;
    }
    set placement(placement:number){
        this._modSelector._placement=placement;
    }

   
   
    //------GETTER SETTERS-----/////
    // MAIN INJECTION FOR SIDEBAR
    onclickHideShowSideBar(injector:HTMLElement){
        const lessThan1000=window.innerWidth <988 ? true:false;
        injector.style.position="relative";
        const arrDiv=document.createElement("div");
        arrDiv.style.cssText=`border-radius:50%;background:${this.bgColor};filter:drop-shadow(0 0 0.75rem ${this.bgColor});font-size:18px;display:grid;place-items:center;width:40px;height:40;position:absolute;`;
        arrDiv.style.top="0%";
        arrDiv.style.right="0%";
        arrDiv.style.transform=lessThan1000 ? "rotate(90deg)":"rotate(0deg)";
        arrDiv.style.transform="translate(-10px,0px)";
        FaCreate({parent:arrDiv,name:FaArrowAltCircleLeft,cssStyle:{color:"white",width:"35px",height:"35px",margin:"auto",backgroundColor:"transparent"}});
        if(lessThan1000){
            this.onclickHideShowSidebarLt1000(injector,arrDiv);
        }else{
            this.onclickHideShowSideBarGt100(injector,arrDiv);
        }
    }
   //PARENT onClickHideShowSidebar()
    onclickHideShowSideBarGt100(injector:HTMLElement,arrDiv:HTMLElement){
        const maxHeight=110
        this.sidebarMain(injector,maxHeight);
        injector.appendChild(arrDiv);
        arrDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                if(!Main.mainInjection) return;
                const time=700;
                const mainInjector=Main.mainInjection as HTMLElement;
                arrDiv.classList.toggle("show-aside");
                const check=([...arrDiv.classList as any] as string[]).includes("show-aside");
                if(check){
                    setTimeout(()=>{
                        mainInjector.style.transform="translateX(-10%)";
                        injector.style.transform="translateX(-85%)";
                        arrDiv.style.transform="rotate(180deg)";
                        arrDiv.style.color="blue";
                    },time-10);
                    mainInjector.animate([
                        {tansform:"translate(0%)"},
                        {tansform:"translate(2.5%)"},
                        {tansform:"translate(5%)"},
                        {tansform:"translate(7.5%)"},
                        {tansform:"translate(-10%)"}
                    ],{duration:time,iterations:1});
                    injector.animate([
                        {transform:"translate(0%)"},
                        {transform:"translate(-85%)"},
                    ],{duration:time,iterations:1});
                    arrDiv.animate([
                        {transform:"rotate(0deg)",color:"white"},
                        {transform:"rotate(180deg)",color:"blue"},
                    ],{duration:time,iterations:1});
                }else{
                    setTimeout(()=>{
                        mainInjector.style.transform="translateX(0%)";
                        injector.style.transform="translateX(0%)";
                        arrDiv.style.transform="rotate(0deg)";
                        arrDiv.style.color="inherit";
                    },time-10);
                    mainInjector.animate([
                        {tansform:"translate(-10%)"},
                        {tansform:"translate(-7.5%)"},
                        {tansform:"translate(-5%)"},
                        {tansform:"translate(-2.5%)"},
                        {tansform:"translate(0%)"}
                    ],{duration:time,iterations:1});
                    injector.animate([
                        {transform:"translate(-85%)"},
                        {transform:"translate(0%)"},
                    ],{duration:time,iterations:1});
                    arrDiv.animate([
                        {transform:"rotate(180deg)",color:"blue"},
                        {transform:"rotate(0deg)",color:"white"},
                    ],{duration:time,iterations:1});
                }
            }
        });

        //add: sidebarMain() here
    }
    //PARENT onClickHideShowSidebar()
    onclickHideShowSidebarLt1000(injector:HTMLElement,arrDiv:HTMLElement){
        const maxHeight=80;
        this.sidebarMain(injector,maxHeight);
        injector.appendChild(arrDiv);
        arrDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                if(!injector) return;
                const time=700;
                arrDiv.classList.toggle("show-aside");
                const check=([...arrDiv.classList as any] as string[]).includes("show-aside");
                if(!check){
                    setTimeout(()=>{
                        injector.style.height=`${maxHeight}vh`;
                        arrDiv.style.transform="rotate(270deg)";
                        arrDiv.style.color="blue";
                    },time-10);
                    injector.animate([
                        {height:"0vh"},
                        {height:`${maxHeight}vh`},
                        
                    ],{duration:time,iterations:1});
                    arrDiv.animate([
                        {transform:"rotate(90deg)",color:"white"},
                        {transform:"rotate(270deg)",color:"blue"},
                    ],{duration:time,iterations:1});
                }else{
                    setTimeout(()=>{
                        injector.style.height=`${7}vh`;
                        arrDiv.style.transform="rotate(90deg)";
                        arrDiv.style.color="inherit";
                    },time-10);
                    injector.animate([
                        {height:`${maxHeight}vh`},
                        {height:`${7}vh`},
                        
                    ],{duration:time,iterations:1});
                    arrDiv.animate([
                        {transform:"rotate(270deg)",color:"blue"},
                        {transform:"rotate(90deg)",color:"white"},
                    ],{duration:time,iterations:1});
                }
            }
        });
    }
    
    // PARENT onclickHideShowSideBarGt100 && onClickHideShowSidebar
    sidebarMain(parent:HTMLElement,maxHeight:number){
        const injection=document.querySelector("section#mainInjection") as HTMLElement;
        Main.textarea=document.querySelector("div#textarea");
        const less900=window.innerWidth < 900;
        let setHeight:string="100vh";
        let setOverflowY:string="scroll";
        if(injection  ){
            setHeight=window.getComputedStyle(injection).getPropertyValue("height");
            setHeight=less900 ? window.getComputedStyle(injection).getPropertyValue("height"):"80vh";
            setOverflowY="scroll";
        }
        
        parent.style.paddingBottom="2rem";
        parent.style.paddingInline="0.5rem";
        parent.style.justifySelf="flex-start";
        parent.style.backgroundColor=this.bgColor;
        Main.cleanUp(parent);
        const sidebarMain=document.createElement("section");
        sidebarMain.id="sidebarMain";
        sidebarMain.style.cssText=`justify-content:flex-start;align-items:center;overflow-y:${setOverflowY};gap:1rem;padding-inline:1rem;border:1px solid white;font-size:${this.textFontSize};height:${setHeight};padding-block:2rem;`;
        sidebarMain.style.maxHeight=`${maxHeight}vh`;
        sidebarMain.className="flexCol";
        this.introduction(sidebarMain);
        this.initializeTheme(sidebarMain);
        this.initiatesAddNewBlog(sidebarMain);
        this.addAGraph(sidebarMain);
        this.initiateEdit(sidebarMain);
        this.refreshEditor(sidebarMain);
        this.editMeta(sidebarMain);//edit Meta
        // this.initiateEdit(sidebarMain);
        this.saveBlog(sidebarMain);
        this.reOrder(sidebarMain);
        this.initiateHeaderTemplate(sidebarMain);
        this.ultility(sidebarMain);
        this.initiateCustomHeaderBtn(sidebarMain);
        this.addimageClass(sidebarMain);
        this.loadImages(sidebarMain);
        this.initiateShapOutsideBtn(sidebarMain);
        // this.initiateGenerateCode(sidebarMain);
        this.initiateCodElement(sidebarMain);
        this.initiateReference(sidebarMain);
        this.initiateGenerateFooter(sidebarMain);
        this.flexBoxLayout(sidebarMain);
        parent.appendChild(sidebarMain);
    }
    introduction(parent:HTMLElement){
        //BTN THAT DESCRIBES ITS PURPOSE ON SIDEBAR
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Intro on the Editor";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="gives you a visual instruction set on how the editor works."
        btnContainer.appendChild(para);
        const divCont=document.createElement("div");
        divCont.id="divCont-intro";
        divCont.style.cssText="margin-inline:auto;padding-inline:1rem;padding-block:0rem;border-radius:70px;box-shadow:1px 1px 3px 1px black;font-size:8px;background-color:rgba(8, 4, 249,0.5)";
        const btn_:btnType={
            parent:divCont,
            text:"introduction",
            bg:"#0C090A",
            color:"white",
            type:"button"
        }
        const btn=buttonReturn(btn_);
        btnContainer.appendChild(divCont);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e && Main.container){
                window.scroll(0,0);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                this.intro.viewInstruction(Main.container);
            }
        });
     };
    //THEME
    initializeTheme(parent: HTMLElement){
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Edit Your Theme work";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const divpara=document.createElement("div");
        divpara.style.cssText="color:white;font-size:18px;"
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.color="white";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.textContent="choose you theme.";
        divpara.appendChild(para);
        Misc.animateScroll(divpara,para);
        btnContainer.appendChild(divpara);
        const btn_:btnType={
            parent:btnContainer,
            text:"themes",
            bg:"blue",
            color:"white",
            type:"button"
        }
        const btn=buttonReturn(btn_);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1});
       
        Misc.buttonHoverEffect(btn);
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,0);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                this.sideSetup.themeSetup(Main.container,true)
            }
        });
     }
   
    //BTN INITIATE EDIT
    saveBlog(parent:HTMLElement){
        //BTN THAT DESCRIBES OPTION TO SAVE BLOG AND OPENS this.saveWork()
        const outerContainer=document.createElement("div");
        outerContainer.className="flexCol my-2 py-2";
        outerContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;width:100%;";
        const container=document.createElement("div");
        container.className="w-80 min-height-10vh mx-auto p-1 flexRow";
        container.style.cssText="display:grid;place-items:center;background-color:#00fc00;color:white;border-radius:20px;padding-inline:2rem;padding-block:0.75rem;";
        const H5=document.createElement("h5");
        H5.textContent="Save Your Work";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        outerContainer.appendChild(H5);
        const para=document.createElement("p");
        para.style.cssText="padding:0.5rem;margin:auto;text-wrap:wrap;margin-block:1rem;";
        para.className="";
        para.style.color=this.textColor;
        para.textContent="This allows you to save your work so that your work is preserved.";
        outerContainer.appendChild(para);
        const btnGroup=document.createElement("div");
        btnGroup.style.cssText="display:flex;gap:0.5rem;alignitems:center;justify-content:center;";
    
        const retBtn=buttonReturn({parent:btnGroup,text:"save",bg:"#00008b",color:"white",type:"button"});
        container.appendChild(btnGroup);
        if(!retBtn) return
        retBtn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,0);
                retBtn.disabled=true;
                setTimeout(()=>{
                    retBtn.disabled=false;
                },1000);
                const blog=this._modSelector.blog;
                const user=this._user.user;
                Main.container=document.querySelector("section#main") as HTMLElement;
                if(!Main.container) return;
                if(blog && user.id && user.email){
                    this._user.saveWork({parent:Main.container,blog,func:()=>undefined})

                }else{
                    this._regSignin.signIn();
                }
            }
        });
       
        outerContainer.appendChild(container);
        parent.appendChild(outerContainer);
    }
    //PARENT MAIN()-onTop
    reOrder(parent:HTMLElement){
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Re-order your work";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to reorder your content."
        btnContainer.appendChild(para);
        const btn=document.createElement("button");
        btn.className="btnStyle2 box-shadow1";
        btn.style.fontSize="12px";
        btn.style.backgroundColor=this.bgColor;
        btn.onmouseover=()=>{
            btn.animate([
                {transform:"scale(1)",opacity:"1"},
                {transform:"scale(1.1)",opacity:"0.7"},
                {transform:"scale(1)",opacity:"1"},
            ],{duration:1000,iterations:1});
        };
        btn.textContent="re-order ";
        btnContainer.appendChild(btn);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e && Main.container){
                const check= this._modSelector.blog ? true : false;
                window.scroll(0,400);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                if( check ){
                    const blog=this._modSelector.blog;
                    this._edit.reOrder(Main.container,blog);
                }
            }
        });
     }
     //PARENT MAIN()-onTop
     initiatesAddNewBlog(parent:HTMLElement){
        //BTN THAT DESCRIBES ITS PURPOSE ON SIDEBAR
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Create New Blog";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to create a new blog."
        btnContainer.appendChild(para);
        const btn_:btnType={
            parent:btnContainer,
            text:"new blog",
            bg:"blue",
            color:"white",
            type:"button"
        }
        const btn=buttonReturn(btn_);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",async(e:MouseEvent)=>{
            if(e && Main.container){
                window.scroll(0,0);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                const blog=this._modSelector.blog;
                const user=this._user.user;
                const checkUser=(user && user.id && user.email) ? true:false;
                const checkBlog=(blog && blog.name) ;
                const modBlog=await Main.hasBlog();
                const check=modBlog && blog && user && user.id;
                Main.container=document.querySelector("section#main") as HTMLElement;
                const mainContainer=Main.container as HTMLElement
                if(check){
                    //ask to save
                    Misc.wantToSaveBeforeFunc({
                        parent:mainContainer,
                        funcSave:async()=>{await this._user.saveWork({parent,blog,func:async()=>{
                            await this._main.newBlog({
                                parent:mainContainer,
                                func:()=>undefined,
                                })
                        }})},
                        functCancel:async()=>{
                            await this._main.newBlog({
                                parent:mainContainer,
                                func:()=>undefined,
                                })
                         }})

                }else{
                    this._regSignin.signIn();
                }
            }
        });
     };
     addAGraph(parent:HTMLElement){
        //BTN THAT DESCRIBES ITS PURPOSE ON SIDEBAR
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="add a graph";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to create your own graph for your blog/website. All you need is label and y-array with a a name."
        btnContainer.appendChild(para);
        const btn_:btnType={
            parent:btnContainer,
            text:"new new Graph",
            bg:"rgba(14, 51, 134,0.5)",
            color:"white",
            type:"button"
        }
        const btn=buttonReturn(btn_);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e && Main.textarea){
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                const blog=this._modSelector.blog;
                this.chart.mainChart(Main.textarea,blog);
            }
        });
     };
     //PARENT MAIN()-onTop
     refreshEditor(parent:HTMLElement){
        //BTN THAT DESCRIBES ITS PURPOSE ON SIDEBAR
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="refresh work";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="Refresh your page.";
        btnContainer.appendChild(para);
        const divCont=document.createElement("div");
        divCont.style.cssText="margin-inline:auto;padding-inline:1rem;padding-block:0rem;border-radius:70px;box-shadow:1px 1px 3px 1px black;font-size:8px;background-color:#b99fa4";
        const btn_:btnType={
            parent:divCont,
            text:"REFRESH",
            bg:"#1F305E",
            color:"white",
            type:"button"
        }
        const btn=buttonReturn(btn_);
        btnContainer.appendChild(divCont);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e && Main.container){
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                const blog=this._modSelector.blog;
                this._edit.main(Main.container as HTMLElement,blog)
                // this._edit.selEleGenerator(Main.textarea as HTMLElement,blog)
            }
        });
     };
 
    
      //!! NOT USED-BTN INITIATE EDIT
    
      initiateEdit(parent:HTMLElement){
        const container=document.createElement("div");
        container.className="flexCol my-2 py-2";
        container.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Edit work";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        const para=document.createElement("p");
        para.style.cssText="padding:0.5rem;margin:auto;text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.className="";
        para.textContent="view your blogs with edit options.";
        container.appendChild(H5);
        container.appendChild(para);
        const message:btnReturnType={
            parent:container,
            text:"edit work",
            bg:this.btnColor,
            color:"white",
            type:"button"
        }
        const retBtn=buttonReturn(message);
        retBtn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,0);
                retBtn.disabled=true;
                setTimeout(()=>{
                    retBtn.disabled=false;
                },1000);
                this._edit.editViewUserBlogs(Main.container as HTMLElement)
            }
        });
       
        parent.appendChild(container);
    }
     //PARENT MAIN()-onTop!!FIX!!!!!!!!!!!!!!!
     async editMeta(parent:HTMLElement){
         const btnContainer=document.createElement("div");
         btnContainer.className="flexCol text-center";
         btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Edit Meta";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance  text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to edit name and description of your blog cover. The meta will be injected within teh meta data, allowing for easy distribution.."
        const btn=document.createElement("button");
        btn.className="btnStyle2 box-shadow1";
        btn.style.fontSize="12px";
        btn.style.backgroundColor=this.bgColor;
        btn.onmouseover=()=>{
            btn.animate([
                {transform:"scale(1)",opacity:"1"},
                {transform:"scale(1.1)",opacity:"0.7"},
                {transform:"scale(1)",opacity:"1"},
            ],{duration:1000,iterations:1});
        };
        btn.textContent="edit meta";
        btnContainer.appendChild(H5);
        btnContainer.appendChild(para);
        btnContainer.appendChild(btn);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",async(e:MouseEvent)=>{
            if(e && Main.container && Main.textarea){
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                const user=this._user._user;
                const blog=this._modSelector.blog;
                const check= ( user && user.id && user.email) ? true : false;
                const check1= (check && blog && blog.user_id) ? true : false;
                const check2=check1 && blog.name ? true : false;
                // console.log("user",user,"blog",blog);
                if(check2){
                    this._metablog.metablog({grandParent:null,parent:Main.textarea as HTMLElement,blog,type:"editor"})
                }
                else if(check){
                    this._main.newBlog({parent:Main.container as HTMLElement,func:()=>{this._metablog.metablog({grandParent:null,parent:Main.textarea as HTMLElement,blog,type:"editor"})}});
                }else{
                    this._regSignin.signIn()
                }
            }
        });
     }
   
     //PARENT MAIN()-onTop
     initiateHeaderTemplate(parent:HTMLElement){
        Sidebar.headerType={normal:true,custom:false};
        const outerContainer=document.createElement("div");
        outerContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        outerContainer.className=" my-2 py-2";
        const H3=document.createElement("h5");
        H3.textContent="Header-layout";
        H3.className="text-info lean";
        H3.style.cssText="margin-block:1rem;margin-bottom:2rem;text-decoration:underline;text-underline-offset:1rem;";
        outerContainer.appendChild(H3);
        const containerFlex=document.createElement("div");
        containerFlex.className="container_Flex mx-auto p-1 py-1 my-2";
        containerFlex.style.cssText="height:30vh;margin-block;2rem;overflow-y:scroll;width:100%;position:relative;flex-wrap:wrap;padding-block:2rem;";
        Header.headers_.map((header)=>{
            header.isOn=false;
            const headerCol=document.createElement("div");
            headerCol.className="headerCol ";
            headerCol.id="headerCol";
            headerCol.style.cssText="position:relative;display:block;flex:1;align-items:center;border:1px solid blue;margin-block:1rem;";
            const title=document.createElement("h6");
            title.textContent=header.name;
            title.style.cssText="align-text:center;margin-bottom:0.5rem;margin-inline:auto;padding-inline:1rem;color:white;";
            headerCol.appendChild(title);
           
            const img=document.createElement("img");
            img.style.cssText="width:100%"
            img.src=header.image;
            img.alt=header.name;
            img.id=`${header.name}-${header.id}`;
            img.onmouseover=()=>{
                img.animate([
                    {boxShadow:"1px 1px 5px 1px var(--bs-teal)"},
                    {boxShadow:"1px 1px 8px 2px var(--bs-teal)"},
                    {boxShadow:"1px 1px 5px 1px var(--bs-teal)"}
                ],{duration:750,iterations:1});
            };
            headerCol.appendChild(img);
            containerFlex.appendChild(headerCol);
            // console.log("ISON BEFORE BTN",header.isOn);
            img.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    header.isOn=true;
                    this._header._HeaderDataMain=header;
                    this._header.getHeader=header;
                    //headerSidebar is injected in main from header
                    if(!header.isOn && Sidebar.headerType.normal===true) return;
                    this._header.headerSidebar(Main._mainHeader as HTMLElement,this._header.getHeader)
                }
            });
        });
        outerContainer.appendChild(containerFlex);
        parent.appendChild(outerContainer);
        
     };
     //PARENT MAIN CUSTOM HEADER
     ultility(parent:HTMLElement){
        //create btn-group
        const base=document.createElement("div");
        const title=document.createElement("h6");
        title.className="lean display-6 my-2 text-primary font-bold text-decoration-underline text-underline-offset-3";
        title.style.cssText="font-size:120%;"
        title.textContent="Ultilities & tools";
        title.className="lean text-info";
        const para=document.createElement("p");
        para.className="text-center ";
        para.style.color=this.textColor;
        para.style.cssText="text-wrap:pretty;padding:1rem;background-color:white;border-radius:12px;padding:0.5rem;margin-block:1rem;";
        para.textContent=" added features for you";
        base.style.cssText="width:100%;margin-inline:auto;box-shadow:1px 1px 3px 1px lightgrey;border-radius:4px;display:flex;flex-direction:column;align-items:center;";
        const btnGrp=document.createElement("div");
        btnGrp.className="btn-group";
        btnGrp.style.cssText="display:flex;flex-wrap:wrap;margin-inline:auto;justify-content:center;align-items:center;padding-block:2rem;gap:1rem;background-color:white;";
        const btnUltils=[{name:"divider"},{name:"separator"},{name:"circles-design"},{name:"arrow-design"},{name:"clean-text"},{name:"Ven-Diagram"},{name:"wave-art"},{name:"arch-art"},{name:"title-art"},{name:"add-fill"},];
        btnUltils.forEach(word=>{
            const btn=document.createElement("button");
            btn.textContent=word.name.toUpperCase();
            btn.style.fontSize="10px";
            btn.className="text-primary btn-sm font-bold";
            btn.style.cssText=`background-color:white;font-size:10px;color:white;border-radius:15px;box-shadow:1px 1px 2px 1px black;font-weight:bold;`
            btnGrp.appendChild(btn);
            btn.addEventListener("click",(e:MouseEvent)=>{
                if(e && Main.textarea){
                    window.scroll(0,0);
                    if(word.name==="divider"){
                    this.btnDivider(Main.textarea as HTMLElement);
                    }
                    else if(word.name==="separator"){
                        this.btn1Separator(Main.textarea as HTMLElement);
                    }
                    else if(word.name==="circles-design"){
                        this.design.circlesDesign(Main.textarea as HTMLElement);
                    }
                    else if(word.name==="arrow-design"){
                        this.design.arrowDesign(Main.textarea as HTMLElement);
                    }
                    else if(word.name==="clean-text"){
                        this.cleanText(Main.textarea as HTMLElement);
                    }
                    else if(word.name==="Ven-Diagram"){
                        this.ven.venDiagram(Main.textarea as HTMLElement);
                    }
                    else if(word.name==="wave-art"){
                        this.design.signalWave(Main.textarea as HTMLElement);
                    }
                    else if(word.name==="arch-art"){
                        this.design.arch(Main.textarea as HTMLElement);
                    }
                    else if(word.name==="title-art"){
                        this.design.titleArt(Main.textarea as HTMLElement);
                    }
                    else if(word.name==="add-fill"){
                        this.design.addFill(Main.textarea as HTMLElement);
                    }
                }
            });
        });

        base.appendChild(title);
        base.appendChild(para);
        base.appendChild(btnGrp);
        parent.appendChild(base);
     }
     //PARENT MAIN CUSTOM HEADER
     initiateCustomHeaderBtn(parent:HTMLElement){
        Sidebar.headerType={normal:false,custom:true};
        this.customHeader.isRefreshed=false;
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Custom Header";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to custimze your header.";
        btnContainer.appendChild(para);
        const btn=document.createElement("button");
        btn.className="btnStyle1 box-shadow2";
        btn.style.backgroundColor=this.bgColor;
        btn.onmouseover=()=>{
            btn.animate([
                {transform:"scale(1)",opacity:"1"},
                {transform:"scale(1.1)",opacity:"0.7"},
                {transform:"scale(1)",opacity:"1"},
            ],{duration:1000,iterations:1});
        };
        btn.textContent="customize header";
        btnContainer.appendChild(btn);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);

                    this.customHeader.customHeader(Main._mainHeader as HTMLElement,false);
                    console.log(Sidebar.headerType,"hello")
                // }
            }
        });
     };
     addimageClass(parent:HTMLElement){
        Sidebar.headerType={normal:false,custom:true};
        this.customHeader.isRefreshed=false;
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Load free Images";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance  text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to insert images.";
        btnContainer.appendChild(para);
        const btn=document.createElement("button");
        btn.className="btnStyle1 box-shadow2";
        btn.style.backgroundColor="blue";
        btn.style.color="white";
        btn.onmouseover=()=>{
            btn.animate([
                {transform:"scale(1)",opacity:"1"},
                {transform:"scale(1.1)",opacity:"0.7"},
                {transform:"scale(1)",opacity:"1"},
            ],{duration:1000,iterations:1});
        };
        btn.textContent="image inserter";
        btnContainer.appendChild(btn);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",async(e:MouseEvent)=>{
            if(e){
                window.scroll(0,500);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                //MAIN INSERTION POINT FOR TEXTAREA
                if(!Main.textarea) return;
                const blog=this._modSelector.blog;
                   await this.addImage.main({parent:Main.textarea,blog});
            }
        });
     };
     loadImages(parent:HTMLElement){
        Sidebar.headerType={normal:false,custom:true};
        this.customHeader.isRefreshed=false;
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Load third party Images";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance  text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to upload free images.";
        btnContainer.appendChild(para);
        const btn=document.createElement("button");
        btn.className="btnStyle1 box-shadow2";
        btn.style.backgroundColor="blue";
        btn.style.color="white";
        btn.onmouseover=()=>{
            btn.animate([
                {transform:"scale(1)",opacity:"1"},
                {transform:"scale(1.1)",opacity:"0.7"},
                {transform:"scale(1)",opacity:"1"},
            ],{duration:1000,iterations:1});
        };
        btn.textContent="image selector";
        btnContainer.appendChild(btn);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,500);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                //MAIN INSERTION POINT FOR TEXTAREA
                if(!Main.textarea) return;
                    this.loadMisc.main(Main.textarea);
            }
        });
     };
     initiateReference(parent:HTMLElement){
        Sidebar.headerType={normal:false,custom:true};
        this.customHeader.isRefreshed=false;
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Create reference list";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-info text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to add reference list.";
        btnContainer.appendChild(para);
        const btn=document.createElement("button");
        btn.className="btnStyle1 box-shadow2";
        btn.style.backgroundColor="blue";
        btn.style.color="white";
        btn.onmouseover=()=>{
            btn.animate([
                {transform:"scale(1)",opacity:"1"},
                {transform:"scale(1.1)",opacity:"0.7"},
                {transform:"scale(1)",opacity:"1"},
            ],{duration:1000,iterations:1});
        };
        btn.textContent="add references";
        btnContainer.appendChild(btn);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                //MAIN INSERTION POINT FOR TEXTAREA
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                if(!Main.textarea) return;
                    this.reference.main({parent:Main.textarea});
            }
        });
     };
     //PARENT MAIN SHAPE-OUTSIDE
     initiateShapOutsideBtn(parent:HTMLElement){
        Sidebar.headerType={normal:false,custom:true};
        this.customHeader.isRefreshed=false;
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Create new Blog";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This gives you a choice of merging image-to-text.";
        btnContainer.appendChild(para);
        const btn=document.createElement("button");
        btn.className="btnStyle1 box-shadow2";
        btn.style.backgroundColor=this.bgColor;
        btn.onmouseover=()=>{
            btn.animate([
                {transform:"scale(1)",opacity:"1"},
                {transform:"scale(1.1)",opacity:"0.7"},
                {transform:"scale(1)",opacity:"1"},
            ],{duration:1000,iterations:1});
        };
        btn.textContent="image-text-merger";
        btnContainer.appendChild(btn);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,300);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                    this.shapeOutside.sidebarMain(Main.textarea as HTMLElement);
            }
        });
     };
    //PARENT MAIN(): GENERATES CODE TEMPLATE
    initiateGenerateCode(parent:HTMLElement){
    
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Generate Your code";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to display code using regular formatting techniques.";
        btnContainer.appendChild(para);
        const btn=document.createElement("button");
        btn.className="btnStyle2 box-shadow1";
        btn.style.backgroundColor=this.bgColor;
        btn.onmouseover=()=>{
            btn.animate([
                {transform:"scale(1)",opacity:"1"},
                {transform:"scale(1.1)",opacity:"0.7"},
                {transform:"scale(1)",opacity:"1"},
            ],{duration:1000,iterations:1});
        };
        btn.textContent="generate code";
        btnContainer.appendChild(btn);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,400);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                this._code.codeTemplate(Main.textarea as HTMLElement);
            }
        });
    
    };
    initiateCodElement(parent:HTMLElement){
    
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="past/create your code";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to display code using VS color palette.";
        btnContainer.appendChild(para);
        const {button:btn}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:"green",color:"white",time:400,text:"create code"});
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,400);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                this.codeElement= new CodeElement(this._modSelector,this._service) ;
                this.codeElement.codeTemplate({
                    injector:Main.textarea as HTMLElement,
                })
            }

        });
    
    };
    //PARENT MAIN() INJECTOR-!!!!BUTTON
    initiateGenerateFooter(parent:HTMLElement){
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Create a Footer";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to create a footer.";
        btnContainer.appendChild(para);
        const btn=document.createElement("button");
        btn.className="btnStyle2 box-shadow1";
        btn.style.backgroundColor=this.bgColor;
        btn.onmouseover=()=>{
            btn.animate([
                {transform:"scale(1)",opacity:"1"},
                {transform:"scale(1.1)",opacity:"0.7"},
                {transform:"scale(1)",opacity:"1"},
            ],{duration:1000,iterations:1});
        };
        btn.textContent="generate footer";
        btnContainer.appendChild(btn);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,800);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                this._footer.main(Main._mainFooter as HTMLElement);
            }
        });
    }
     
    //PARENT MAIN()-selector are appended to textarea
    flexBoxLayout(parent:HTMLElement){
        this.flex={} as flexType;
        const outerContainer=document.createElement("div");
        outerContainer.id="flexbox-outerContainer";
        outerContainer.className="flexCol my-2 py-2";
        outerContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const container=document.createElement("div");
        container.id="flexbox-container";
        container.className="w-100 min-height-10vh mx-auto p-1 flexRow py-2 my-2";
        container.style.cssText="justify-content:center;align-items:flex-start;max-height:40vh;overflow-y:scroll;";
        const H3=document.createElement("h5");
        H3.textContent="Flex-box layout";
        H3.style.cssText="margin-block:1rem;margin-bottom:2rem;text-decoration:underline;text-underline-offset:1rem;";
        H3.className="text-info lean";
        outerContainer.appendChild(H3);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to structure your work within grid boxes.";
        outerContainer.appendChild(para);
        const selectors=this._selectors_;
        selectors.map(selector=>{
            this.selectorTemplate({container,selector})
        });
        outerContainer.appendChild(container);
        parent.appendChild(outerContainer);
    }

    selectorTemplate(item:{container:HTMLElement,selector:flexSelectorType}){
        const {container,selector}=item;
        const div=document.createElement("div");
            div.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:center;";
            const small=document.createElement("small");
            small.style.cssText="margin-block:0.75rem;color:white;text-decoration:underline;margin-inline:auto;text-underline-offset:0.5rem;";
            small.textContent=selector.name;
            const select_img=document.createElement("img");
            select_img.src=selector.image;
            select_img.alt=selector.name;
            select_img.style.cssText="width:100px;aspect-ratio:1 / 1;";
            div.appendChild(small);
            div.appendChild(select_img);
            container.appendChild(div);
            select_img.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    window.scroll(0,800);
                    // console.log("sidebar:Header.selectors",this._modSelector.selectors)
                    this._flexbox.rowColGenerator(Main.textarea as HTMLElement,selector);
                    
                }
            });
    }

    deleteElement(parent:HTMLElement,target:HTMLElement){
        if(parent && target){
                const iconDiv=document.createElement("div");
                target.classList.add("position-relative");
                iconDiv.className="fa-solid fa-trash text-danger deleteIcon";
                iconDiv.setAttribute("contenteditable","false");
                iconDiv.style.cssText="font-size:14px;position:absolute;right:0px;top:-1.5rem;padding:0px;border:none; text-decoration:none;z-index:1000;transform:translate(10px,-7px);";
                const cssStyle={}
                FaCreate({parent:iconDiv,name:FaCrosshairs,cssStyle})
                    target.appendChild(iconDiv);
                    iconDiv.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            parent.removeChild(target);
                            this._modSelector.promRemoveElement(target).then(async(res)=>{
                                if(res){
                                    this._modSelector.shiftPlace(res.placement);
                                }
                            });
                        }
                    });
           
        }
    }
   
    //BTN ULTILITIES
    btn1Separator(parent:HTMLElement){
        parent.style.position="relative";
        const width=window.innerWidth <900 ? 80 :30;
        const popup=document.createElement("div");
        popup.style.cssText=`position:absolute; background:#0a2351;backdrop-filter:blur(15px);color:white;width:${width}%;height:30vh;margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:10px; box-shadow:1px 1px 5px 1px black;inset:50% 0%`;
        const form=document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;margin:auto;gap-1;position:relative;"
        const formGrp1=document.createElement("div");
        formGrp1.className="form-group";
        const color=document.createElement("label");
        color.setAttribute("for","color");
        color.textContent="color";
        const colInput=document.createElement("input");
        colInput.type="color";
        colInput.id="color";
        colInput.name="color";
        colInput.className="form-control";
        formGrp1.appendChild(color);
        formGrp1.appendChild(colInput);
        form.appendChild(formGrp1);
        button({parent:form,text:"submit",bg:this.bgColor,color:"white",type:"submit"});
        const cancel=document.createElement("div");
        cancel.style.cssText="position:absolute;top:0;right:0;transform:translate(2px,2px);";
        FaCreate({parent:cancel,name:FaTrash,cssStyle:{color:"red"}});
        form.appendChild(cancel);
        popup.appendChild(form);
        parent.appendChild(popup);
        cancel.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:500});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },480);
            }
        });
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const color=formdata.get("color") as string;
                const divCont=document.createElement("div");
                divCont.className="eleContainer";
                divCont.style.cssText="margin:0;padding.0.25rem;width:100%;";
                const hr=divider_1(divCont,color) as HTMLElement;
                hr.style.width="100%";
                parent.appendChild(divCont);
                this._modSelector.elementAdder(hr);
                this._modSelector.removeMainElement(parent,divCont,hr)
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:500});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },480);
            }
        });
        
    }
    btnDivider(parent:HTMLElement){
        parent.style.position="relative";
        const width=window.innerWidth <900 ? 80 :30;
        const popup=document.createElement("div");
        popup.style.cssText=`position:absolute; background:#0a2351;backdrop-filter:blur(15px);color:white;width:${width}%;height:30vh;margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:10px; box-shadow:1px 1px 5px 1px black;inset:50% 0%`;
        const form=document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;margin:auto;gap-1;"
        const formGrp=document.createElement("div");
        formGrp.className="form-group";

        const label=document.createElement("label");
        label.setAttribute("for","line");
        label.textContent="# of lines";
        const numInput=document.createElement("input");
        numInput.type="number";
        numInput.min="1";
        numInput.max="4";
        numInput.id="line";
        numInput.name="line";
        numInput.className="form-control";
        formGrp.appendChild(label);
        formGrp.appendChild(numInput);

        const formGrp1=document.createElement("div");
        formGrp1.className="form-group";
        const color=document.createElement("label");
        color.setAttribute("for","color");
        color.textContent="color";
        const colInput=document.createElement("input");
        colInput.type="color";
        colInput.id="color";
        colInput.name="color";
        colInput.className="form-control";
        formGrp1.appendChild(color);
        formGrp1.appendChild(colInput);

        form.appendChild(formGrp);
        form.appendChild(formGrp1);
        const submit:btnReturnType={
            parent:form,
            text:"submit",
            bg:this.bgColor,
            color:"white",
            type:"submit"
        }
        button(submit);
        const cancel=document.createElement("div");
        cancel.style.cssText="position:absolute;top:0;right:0;transform:translate(2px,2px);";
        FaCreate({parent:cancel,name:FaTrash,cssStyle:{color:"red"}});
        form.appendChild(cancel);
        popup.appendChild(form);
        parent.appendChild(popup);
        cancel.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:500});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },480);
            }
        });
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault()
                const divCont=document.createElement("div");
                divCont.style.cssText="margin:0;margin-left:0.25rem;width:100%;";
                divCont.className="eleContainer";
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const num=parseInt(formdata.get("line") as string);
                const color=formdata.get("color") as string;
                const {divcont,target}=Misc.divider({parent,numLines:num,divCont,color});
                target.style.width="100%";
                divcont.style.position="relative";
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:500});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },480);
                this._modSelector.elementAdder(target);
                this._modSelector.removeMainElement(parent,divcont,target)
            }
        });
        
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
    arrowColor(target:HTMLElement){
        target.style.position="relative";
        const select=document.createElement("select");
       
        if(target.id==="arrowLeft"){
            select.style.inset="inset:50% 20% 20% 0%";
             select.style.cssText="position:absolute;width:fit-content;font-size:10px;z-index:2000;inset:40% -10% 20% 60%;";
        }else{
            select.style.inset="inset:50% 0% 20% 20%";
             select.style.cssText="position:absolute;width:fit-content;font-size:10px;z-index:2000;inset:40% 30% 20% -5%;";
        }
        Misc.colors.forEach((col)=>{
            const option=document.createElement("option");
            option.value=col.value;
            option.style.backgroundColor=col.value;
            option.textContent=col.name;
            select.appendChild(option);
        });
        
        target.appendChild(select);
        select.addEventListener("click",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                if(value !=="remove"){
                const attr=`background-color:${value}`;
               target.style.cssText=HtmlElement.addStyle(target,attr);
               const attr1=`box-shadow:1px 1px 7px 1px ${value}`;
               setTimeout(()=>{
                   target.style.cssText=HtmlElement.addStyle(target,attr1);
               },0);
            }else{
                target.removeChild(select);
            }
              
              
            }
        });
    }
    cleanText(parent:HTMLElement){
        const blog=this._modSelector.blog;
        const popup=document.createElement("div");
        popup.id="clean-text";
        popup.className="cleantext";
        popup.style.cssText="position:absolute;max-width:700px;height:auto;display:flex;flex-direction:column;align-items:center;gap:1.75rem;background:white;border-radius:16px;box-shadow:1px 1px 12px 1px black;z-index:200;padding:1rem;width:100%;";
        popup.style.top="20%";
        const title=document.createElement("h6");
        title.className="text-center text-primary my-2 lean display-6";
        title.textContent="clean text";
        popup.appendChild(title);
        parent.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{top:"30%"}});

        Sidebar.genParagraph(blog).map(item=>{
            const container=document.createElement("div");
            container.style.cssText="display:flex; justify-content:space-around;align-items:center;";
            const btn=buttonReturn({parent:container,text:"clean",bg:"#00FFFF",color:"white",type:"button"});
            const para=document.createElement("p");
            para.id=item.para.id;
            para.innerHTML=item.para.innerHTML;
            para.style.cssText=item.para.style.cssText;
            para.className=item.para.className;
            container.appendChild(para);
            popup.appendChild(container);
            Misc.matchMedia({parent:container,maxWidth:600,cssStyle:{flexDirection:"column"}});
            Misc.matchMedia({parent:para,maxWidth:600,cssStyle:{order:"-1"}});
            Misc.matchMedia({parent:btn,maxWidth:600,cssStyle:{order:"2"}});
            btn.onclick=(e:MouseEvent)=>{
                if(e){
                    const para2=Sidebar.cleanPara(para as HTMLParagraphElement);
                    if(!para2)return;
                    item.para.textContent=para2.textContent;
                    this._modSelector.updateElement(item.para);
                    
                }
            };
        });
        const Btn=buttonReturn({parent:popup,text:"close",bg:Nav.btnColor,color:"white",type:"button"});
        Btn.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:100,ypos:50,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },398);
            }
        };
    }
    //BTN ULTILITIES
    //PARENT EDIT BLOG PAGE-edit meta button
    blogEditDisplay(parent:HTMLElement,file:File,formdata:FormData){
        //upload image to blog.img then display blog.name, blog.desc;
        const editSubContainer=document.createElement("div");
        editSubContainer.className="mx-auto my-2 w-100";
        editSubContainer.style.cssText="background-color:black;colr:white;border-radius:12px;padding:1rem;box-shadow:1px 1px 10px 1px black;";
        const picDescCont=document.createElement("p");
        picDescCont.style.cssText="display:flex;margin-inline:auto;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:1rem;width:100%;";
        const filename=document.createElement("h6");
        filename.className="lean display-6 ";
        filename.textContent=this._modSelector.blog && this._modSelector.blog.name ? this._modSelector.blog.name :'';
        editSubContainer.appendChild(filename);
        // insert
        const cssText="border-radius:50%;filter:drop-shadow(0 0 0.75rem crimson);shape-outside:circle():margin-right:1rem;margin-bottom:1.25rem;float:left;";
        let urlImg:string;
        if(this._modSelector.blog.imgKey && this._modSelector.blog.img){
            urlImg=this._modSelector.blog.img;
        }
        if(file as File){
            urlImg=URL.createObjectURL(file);
            this.uploadBlogImg(parent,formdata);
        }else{
            urlImg=this.pic;
        }
        
        picDescCont.innerHTML=`<img src="${urlImg} alt="${"www.ablogroom.com"}" style="${cssText}"/> ${this._modSelector.blog.desc}`;
        editSubContainer.appendChild(picDescCont);
        parent.appendChild(editSubContainer);

    }
    uploadBlogImg(parent:HTMLElement,formdata:FormData){
        console.log("formdata recieved",formdata)
        const option={
            method:"PUT",
            body:formdata
        }
        fetch(this.url,option).then(async(res)=>{
            if(res){
                const imgKey=formdata.get("Key") as string;
                if(imgKey){
                this._modSelector.blog={...this._modSelector.blog,imgKey};
               
                Misc.message({parent,msg:"success",type_:"success",time:400});
                }
            }else{
                Misc.message({parent,msg:"something went wrong",type_:"error",time:700});

            }
        }).catch((err)=>console.log(err.message));
    }
    blogNameDescFill(parent:HTMLElement,blog:blogType){
        //SIGNEDIN  BLOG SAVED PROCESS::THIS OPENS A POPUP FOR BLOG NAME AND DESCRIPTION COMPLETION, THEN SAVES THE BLOG AND IS THEN REMOVED
        const {popup,form,input,textarea}=Misc.fillBlogNameDesc(parent);
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const name_=input.name;
                const desc_=textarea.name;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const name=formdata.get(name_);
                const desc=formdata.get(desc_);
                if(blog && blog.user_id && name && desc){
                    blog={...blog,name:name as string,desc:desc as string}
                    //CREATING A NEW BLOG
                    this._service.newBlog(blog).then(async(blog_)=>{
                        if(blog_ && typeof(blog_)==="object"){
                            blog_={...blog_,selectors:blog.selectors,elements:blog.elements,codes:blog.codes};
                            //SAVING WHOLE BLOG
                            this._service.saveBlog(blog_).then(async(_Blog_)=>{
                                if(_Blog_){
                                    //STORING IT IN STORAGE
                                    localStorage.setItem("blog",JSON.stringify(_Blog_));
                                    //SAVING IT IN MODSELECTOR
                                    this._modSelector.blog= await this._service.promsaveItems(_Blog_);
                                    Misc.message({parent,msg:"saved",type_:"success",time:400});
                                    setTimeout(()=>{
                                        Misc.fadeOut({anchor:popup,xpos:100,ypos:50,time:400});
                                        setTimeout(()=>{textarea.removeChild(popup)},380);
                                    },380);
                                }else{
                                    Misc.message({parent,msg:"blog was not saved",type_:"error",time:700});
                                    setTimeout(()=>{
                                        Misc.fadeOut({anchor:popup,xpos:100,ypos:50,time:400});
                                        setTimeout(()=>{textarea.removeChild(popup)},380);
                                    },680);
                                }
                            }).catch((err)=>{
                                const msg=getErrorMessage(err);
                                console.error(msg);
                                Misc.message({parent,msg:msg,type_:"error",time:700});
                                setTimeout(()=>{parent.removeChild(popup)},680);
                            });
                        }
                    });
                }

            }
        });
    }
    async loadBlog(){
        return new Promise(resolve=>{
            if(typeof window !=="undefined"){
                resolve(localStorage.getItem("blog"));

            }

        }) as Promise<string | null> ;
    }

    
   

    static divider1(parent:HTMLElement,divCont:HTMLElement,color:string):{divCont:HTMLElement,line1:HTMLElement,line2:HTMLElement}{
        const line=document.createElement("div");
        line.style.cssText=`margin-inline:auto;width:49%;height:4px;background:aquamarine;border-radius:30px;box-shadow:1px 1px 3px 1px ${color},-1px -1px 3px -1px ${color},`;
        const line2=document.createElement("div");
        line.style.cssText=`margin-inline:auto;width:80%;height:4px;background:aquamarine;border-radius:30px;box-shadow:1px 1px 3px 1px ${color},-1px -1px 3px -1px ${color},`;
        divCont.appendChild(line);
        divCont.appendChild(line2);
        parent.appendChild(divCont);
        return {divCont:divCont,line1:line,line2:line2}
    }
    static cleanUpWithID(parent:HTMLElement,target:HTMLElement){
        const label=target.nodeName.toLowerCase();
        const getTarget=parent.querySelector(`${label}#${target.id}`);
        if(getTarget){
            parent.removeChild(target);
        }
    }
    static cleanUpID(parent:HTMLElement,id:string){
        const getAll=parent.querySelectorAll(`#${id}`);
        if(getAll){
            ([...getAll as any] as HTMLElement[]).map(ch=>{
                if(ch){
                    parent.removeChild(ch);
                }
            })
        }
    }
    static getBtns():HTMLButtonElement[]|null{
        if(!Main.textarea) return null
        const allBtns=Main.textarea?.querySelectorAll("button");
        if(!allBtns) return null
        return ([...allBtns as any] as HTMLButtonElement[])
    }
    static genParagraph(blog:blogType):{para:HTMLElement}[]{
        const arr:{para:HTMLElement}[]=[];
        if(!blog)return [];
         blog.elements.map(ele=>{
            if(ele && ele.name==="p"){
                const getEle=document.querySelector(`${ele.name}#${ele.eleId}`) as HTMLElement;
                if(getEle){
                    const check=([...getEle.classList as any] as string[]).includes("isActive");
                    if(check){
                        arr.push({para:getEle});
                    }

                }
            }
        });
        blog.selectors.map(sel=>{
            sel.rows.map(row=>{
                row.cols.map(col=>{
                    col.elements.map(ele=>{
                        if(ele && ele.name==="p"){
                            const getEle=document.querySelector(`${ele.name}#${ele.eleId}`) as HTMLElement;
                            if(getEle){
                                const check=([...getEle.classList as any] as string[]).includes("isActive");
                                if(check){
                                    arr.push({para:getEle});
                                }
            
                            }
                        }
                    });
                });
            });
        });
        return arr;
    }
    static cleanPara(para:HTMLParagraphElement):HTMLParagraphElement|undefined{
        
        if(!para)return;
        let text:string="";
        text=para.textContent ? para.textContent : "";
        ([...para.children as any] as HTMLElement[]).map(child=>{
            if(child){
                // text+=child.textContent ? child.textContent : "";
            }
        });
        if(text !==""){
           para.textContent=text;
        }
        return para;
    }
    
    
}



export default Sidebar;
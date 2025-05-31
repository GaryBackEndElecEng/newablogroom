import {elementType,themeType,swapHeaderType, blogType, userType, flexSelectorType, rowType,} from "./Types";


import Main from "./main";
import ModSelector from "./modSelector";
import Header from "./header";
import Footer from "@/components/editor/footer";
import {FaCreate} from "@/components/common/ReactIcons";
import {FaTrash,FaCrosshairs,FaArrowAltCircleLeft} from "react-icons/fa";
import DisplayBlog from "../blog/displayBlog";
import Misc, { divider_1,fadeOutType} from "@/components/common/misc/misc";
import {button, buttonReturn,btnReturnType, btnType} from "@/components/common/tsFunctions";
import Edit from "./edit";
import Design from "../common/design";
import User from "../user/userMain";
import Service from "@/components/common/services";
import CustomHeader from "./customHeader";
import Flexbox from "./flexBox";
import HtmlElement from "./htmlElement";
import Nav from "../nav/headerNav";
import ShapeOutside from "./shapeOutside";
import Ven from "../common/venDiagram";
import Intro from "../common/instructions";
import LoadMisc from "../common/loadFiles";
import MetaBlog from "./metaBlog/metaBlog";
import RegSignIn from "../nav/regSignin";
import Reference from "./reference";
import NewCode from "./newCode";
import ChartJS from "../chart/chartJS";
import AddImageUrl from "../common/addImageUrl";
import CodeElement from "../common/codeElement";
import PasteCode from "../common/pasteCode";
import Headerflag from "./headerFlag/headerflag";
import { idValueType, selRowColType } from "@/lib/attributeTypes";
import AuthService from "../common/auth";
import Toolbar from "../common/toolbar";
import ViewResume from "../bio/resume/viewResume";
import { mainResumeType } from "../bio/resume/refTypes";
import ReorgBlog from "../common/reorg/reorgBlog";




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
public mainContainer:HTMLElement|null=Main.container
static bgColor:string;
static btnColor:string;
public logo="/images/gb_logo.png";
public _colors:{id:number,color:string}[];
_theme:themeType;
_themes:themeType[];
listThemeTypes:{name:string}[]=[{name:"background"},{name:"fonts"},{name:"colors"},{name:"buttons"},{name:"bgImage"},{name:"bgShade"}];

    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private _displayBlog:DisplayBlog,private _edit:Edit){
        SideSetup.bgColor=this._modSelector._bgColor;
        SideSetup.btnColor=this._modSelector.btnColor;
        this._theme={} as themeType;
        this._themes=[] as themeType[];
        this.logo="/images/gb_logo.png";
        this._colors=[];
        this.mainContainer=Main.container;
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
    get colors(){
        return this._colors
    };
    set colors(colors:{id:number,color:string}[]){
        this._colors=colors;
    }

    // //////GETTERS SETTERS/////
    //INJECTION Main.container
    themeSetup({mainCont,init,idValues,textarea,mainHeader,footer}:{
        mainCont:HTMLElement|null,
        init:boolean,
        idValues:idValueType[],
        textarea:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement
    }){
        //INJECTED INTO CONTAINER Main.container
        this.mainContainer=mainCont
        if(mainCont){
            Sidebar.cleanUpID(mainCont,"themes")
            mainCont.style.position="relative";
            const container = document.createElement("section");
            container.id="themes";
            container.className = "";
            container.style.cssText=`margin:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;background-color:rgb(4, 43, 66);padding:1rem;z-index:100;border-radius:18px;box-shadow:1px 1px 3px 1px green,-1px -1px 3px 2px yellow;z-index:200;height:auto;`;
            container.style.top="20%";
            container.style.left="30%";
            container.style.right="30%";
            container.style.width="clamp(320px,550px,600px)";
        
            const innerContainer=document.createElement('div');
            innerContainer.id="themeSetup-innerContainer";
            innerContainer.style.cssText=`border-radius:inherit;background:white;margin-inline:auto;box-shadow:inherit;position:relative;margin-inline:${8}px;padding:0.5rem;width:100%;`;
            
            Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{top:"40%",left:"0%",right:"0%"}});
            Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{top:"30%",left:"10%",right:"10%"}});

            this.rowTemplate({parent:mainCont,container,innerContainer,idValues,textarea,mainHeader,footer});

            container.appendChild(innerContainer);
            const {close,reset,save}=this.themeBtn(container);
            mainCont.appendChild(container);
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
                        mainCont.removeChild(container);
                    },580);
                }
            });

            save.onclick=(e:MouseEvent)=>{
                if(e){
                    this._modSelector.blog={...this._modSelector.blog,
                        cssText:mainCont.style.cssText,
                        class:mainCont.className,
                        eleId:mainCont.id,

                    };
                    this._modSelector.localStore({blog:this._modSelector.blog});
                }
            };
        
            reset.addEventListener("click",async(e:MouseEvent)=>{
                //CLOSE
                if(e){

                   await this.resetTheme({mainCont,textarea,mainHeader,footer});
                    const fade:fadeOutType={
                        anchor:container,
                        xpos:50,
                        ypos:100,
                        time:1000
                    }
                    Misc.fadeOut(fade);
                    setTimeout(()=>{
                        mainCont.removeChild(container);
                    },980);
                }
            });
        }
    };



    themeBtn(innerTheme:HTMLElement):{close:HTMLButtonElement,save:HTMLButtonElement,reset:HTMLButtonElement}{
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
        const save:btnType={
            parent:btnContainer,
            text:"save",
            bg:"#0CAFFF",
            color:"white",
            type:"button"
        }
        innerTheme.appendChild(btnContainer)
        const saveBtn=buttonReturn(save)
        const reset:btnType={
            parent:btnContainer,
            text:"reset",
            bg:"#007FFF",
            color:"white",
            type:"button"
        }
        innerTheme.appendChild(btnContainer)
        const resetBtn=buttonReturn(reset)
        return {close:closeBtn,save:saveBtn,reset:resetBtn}
    };



    rowTemplate({parent,container,innerContainer,idValues,mainHeader,textarea,footer}:{
        parent:HTMLElement,
        container:HTMLElement,
        innerContainer:HTMLElement,
        idValues:idValueType[]
        textarea:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement
    }){
        //parent=Main.container (#main)
        const blog=this._modSelector.blog;
        innerContainer.style.position="relative";
        const row=document.createElement('div');
        row.style.cssText="display:flex;flex-direction:row;flex-wrap:wrap;gap:0.62rem;margin:auto;justify-content:space-around;align-items:center;width:100%;position:relative;";
        innerContainer.appendChild(row);
        const selStyle="display:flex;flex-direction:column;place-items:center;border-radius:10px;cursor:pointer;font-size:9px;";
       
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
                        this._modSelector.localStore({blog:this._modSelector.blog});
                        Header.cleanUpByID(parent,"themes");
                        this.themeSetup({mainCont:parent,init:false,idValues,mainHeader,textarea,footer});
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
                        this._modSelector.localStore({blog:this._modSelector.blog});
             
                        Header.cleanUpByID(parent,"themes");
                        this.themeSetup({mainCont:parent,init:false,idValues,textarea,mainHeader,footer});
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
                        this._modSelector.localStore({blog:this._modSelector.blog});
                        Header.cleanUpByID(parent,"themes");
                        this.themeSetup({mainCont:parent,init:false,idValues,textarea,mainHeader,footer});
                        Misc.message({parent:container,msg:"added",type_:"success",time:500});
                    }
                };
            }else if(listItem.name==="bgImage"){
                const btnBg=buttonReturn({parent:row,text:listItem.name,bg:"#1F305E",color:"white",type:"button"});
                btnBg.onclick=(e:MouseEvent)=>{
                    if(e){
                        // console.log("CLICK",btnBg)//work
                        this.backgroundImg({parent,innerContainer,idValues});
                       
                    }
                };
                innerContainer.appendChild(row);
            }else if(listItem.name==="bgShade"){
                const btnBg_=buttonReturn({parent:row,text:listItem.name,bg:"#1F305E",color:"white",type:"button"});
                btnBg_.onclick=(e:MouseEvent)=>{
                    if(e){
                       
                        this.bgShade({parent,idValues});
                        parent.removeChild(container)
                    }
                };
                innerContainer.appendChild(row);
               
            }
        });

    };
    

   
    async resetTheme({mainCont,textarea,mainHeader,footer}:{
        mainCont:HTMLElement,
        textarea:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement

    }){
        
        Sidebar.btnEles=Sidebar.getBtns();
        const btnsSave:{id:number,bgColor:string}[]|undefined=Sidebar.btnEles?.map((btn,index)=>({id:index,bgColor:btn.style.backgroundColor}));
        mainCont.style.fontFamily="Times";
        mainCont.style.backgroundColor="white";
        mainCont.style.color="black";
        mainCont.style.backgroundImage="";
        mainCont.style.backgroundPosition="";
        mainCont.style.backgroundSize="";
        mainCont.style.background="";
        this._modSelector.btnColor="#0C090A";
        this._modSelector.blog={...this._modSelector.blog,attr:""};
        const blog=this._modSelector.blog;
        if(blog.imgBgKey){
         await  this._service.adminImagemark(blog.imgBgKey,true).then(async(res)=>{
            if(res){
                Misc.message({parent:mainCont,msg:`${blog.imgBgKey}`,type_:"success",time:700});
                this._modSelector.blog={...blog,imgBgKey:undefined};
                
            }
         });
        }
        this._modSelector.blog={...this._modSelector.blog,cssText:mainCont.style.cssText};
        this._modSelector.localStore({blog:this._modSelector.blog});

        await this._modSelector.loadFromLocal().then(async(res)=>{
            const {blog,user}=res.getBlog() as {blog:blogType|null,user:userType|null};
            if(blog){
                await this._service.promsaveItems({blog,user}).then(async(_res)=>{
                if(_res){
                    await this._edit.main({parent:mainCont,blog:_res,user,textarea,mainHeader,footer});
                        Sidebar.btnEles?.map((btn,index)=>{
                            btnsSave?.map(item=>{
                                if(btn && item.id===index){
                                    btn.style.backgroundColor=item.bgColor;
                                }
                            });
                        });
                }
                });

            }
        });
        
    };


    backgroundImg({parent,innerContainer,idValues}:{parent:HTMLElement,innerContainer:HTMLElement,idValues:idValueType[]}){
      
        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center;";
        innerContainer.style.position="relative";
        const popup=document.createElement("div");
        popup.id="theme-bg-popup";
        popup.style.cssText="margin:auto;background:white;display:flex;flex-direction:column;position:absolute;inset:0%;width:clamp(250px,300px,300px);border-radius:inherit;background-color:whitesmoke;box-shadow:1px 1px 12px 1px black;height:220px;z-index:200;z-index:200;";
        popup.className="d-flex flex-column align-items-center";
        const form=document.createElement("form");
        form.style.cssText=css_col + "width:100%;height:100%;padding:1rem;"
        const {input,label}=Nav.inputComponent(form);
        input.style.cssText="width:95%;"
        input.name="file";
        input.id="file";
        label.textContent="bg-image";
        label.setAttribute("for",`${input.id}`);
        input.className="form-control";
        input.type="file";
        input.accept="image/png image/jpg";
        label.setAttribute("for",input.id);
        const {button}=Misc.simpleButton({anchor:form,bg:"black",color:"white",type:"submit",time:400,text:"submit"});
        button.disabled=true;
        input.onchange=(e:Event)=>{
            if(e){
                button.disabled=false;
            }
        };
        popup.appendChild(form);
        innerContainer.appendChild(popup);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        //DELETION

        const xDivIcon=document.createElement("div");
        xDivIcon.id="xDivIcon";
        xDivIcon.style.cssText="position:absolute;padding:5px;background-color:black;top:0%;left:100%;transform:translate(-34px,4px);border-radius:50%;";
        FaCreate({parent:xDivIcon,name:FaCrosshairs,cssStyle:{fontSize:"16px",color:"white",borderRadius:"inherit"}});
        //APPENDING
        popup.appendChild(xDivIcon);
        xDivIcon.onclick=(e:MouseEvent)=>{
            if(e){
                innerContainer.removeChild(popup);
            }
        };

        //DELETION
        
        form.addEventListener("submit",(e:SubmitEvent) => {
            if(e){
                e.preventDefault();
                const filedata=new FormData(e.currentTarget as HTMLFormElement);
                const file=filedata.get("file");
                // console.log("bg-image:file",file)
                if(file){
                    const eleId=parent.id;
                    let blog=this._modSelector.blog;
                    const imgUrl=URL.createObjectURL(file as File);
                    /// loading into top container////
                    //Main.container.style.cssText = Main.main_css
                    parent.style.backgroundImage=`url(${imgUrl})`;
                    parent.style.backgroundSize=`100% 100%`;
                    parent.style.backgroundPosition=`50% 50%`;
                    parent.classList.add("bgShade");
                    parent.style.cssText =Main.main_css +`background-image:url(${imgUrl});background-size:100% 100%;background-position:50% 50%;`;
                    //GENERATING NEW KEY
                    const user=this._user.user;
                    const {Key}=this._service.generateFreeImgKey({formdata:filedata,user}) as {Key:string};
                    blog={...blog,user_id:user.id,imgBgKey:Key,eleId:parent.id,cssText:parent.style.cssText};
                    this._modSelector.blog={...blog};
                    this._modSelector.localStore({blog});
                    idValues.push({eleId,id:"backgroundImg",attValue:"backgroundImg"});
                    idValues.push({eleId,id:"blogId",attValue:eleId});
                    idValues.push({eleId,id:"imgBgKey",attValue:Key});
                    const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                    this._modSelector.dataset.simplePopulateAttributes({target:parent,idValues,popIdValues:getEleIds});
                    this._service.uploadfreeimage({formdata:filedata}).then(async(res)=>{
                        if(res){
                            blog={...blog,imgBgKey:res.Key};
                            parent.style.backgroundImage=`url(${res.img})`;
                            parent.style.backgroundSize="100% 100%";
                            parent.style.backgroundPosition="50% 50%";
                            
                            this._service.promsaveItems({blog,user}).then(async(blog_)=>{
                                if(blog_){
                                    this._modSelector.blog={...blog_};
                                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                                    setTimeout(()=>{
                                        innerContainer.removeChild(popup);
                                    },390);
                                }
                            });
                        }
                    });

                   
                }
            }
        });
    };


    bgShade({parent,idValues}:{parent:HTMLElement,idValues:idValueType[]}){
        //parent=Main.container
        // row.parentElement=#main=>(#main children=>#sectionHeader,#textarea,#mainFooter)
        //CREATING ARRAY FOR SELECTION
        parent.style.position="relative";
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
         //EFFECT
         const effects=[{name:"select",value:""},{name:"angle 45",value:"45deg"},{name:"to left",value:"to left"},{name:"to right",value:"from left"},{name:"polar blend extend",value:"in hsl longer hue"},{name:"polar color",value:"in hsl"},{name:"angle bottom=>top",value:"to left top"},];
         const {select:selectEffect,label:labelEffect}=Misc.selectComponent({parent:form,name:"effects",cssStyle:cssStyleEffect,selects:effects});
         selectEffect.style.borderRadius="6px";
         selectEffect.name="select";
         selectEffect.id="selectEffect";
         selectEffect.style.cssText="margin-inline:auto;min-width:75px;"
         labelEffect.setAttribute("for",`${selectEffect.id}`);
         //EFFECT
        //SHADE
        const {select:selectShade,label:labelShade1}=Misc.selectComponent({parent:form,name:"shade",cssStyle,selects});
       
        selectShade.style.borderRadius="6px";
        selectShade.name="select";
        selectShade.id="select";
        selectShade.style.cssText="margin-inline:auto;min-width:75px;"
        labelShade1.setAttribute("for",`${selectShade.id}`);
        //SHADE
       
        //BLUES
        const selectBlueShades=Misc.blueShades
        const {select:selectBlue,label:labelShade2}=Misc.selectComponent({parent:form,name:"blue shade",cssStyle:cssStyle2,selects:selectBlueShades});
        selectBlue.style.borderRadius="6px";
        selectBlue.name="select";
        selectBlue.id="selectBlue";
        selectBlue.style.cssText="margin-inline:auto;min-width:75px;"
        labelShade2.setAttribute("for",`${selectBlue.id}`);
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
        selectEffect.onchange=(e:Event) =>{
            if(e){
                const effect=((e.currentTarget as HTMLSelectElement).value) as string;
                selectEffect.value=effect ||"to left";
            }
        };

        selectShade.onchange=(e:Event)=>{
            if(e){
                const effect=(selectEffect as HTMLSelectElement).value;
                const shade=((e.currentTarget as HTMLSelectElement).value) as string;
                const shade1=Design.HexCode(shade);
                const len=this.colors.length;
                this.colors=[...this.colors,{id:len,color:shade1}];
                const {url}=this.extractBgImage({target:parent})
                this.insertBgShade({target:parent,colors:this.colors,effect:effect,url});
                parent.classList.add("bgShade");
               
                
               
            }
        };
        selectBlue.onchange=(e:Event)=>{
            if(e){
                const shadeTwo=((e.currentTarget as HTMLSelectElement).value) as string;
                const shade2=Design.HexCode(shadeTwo);
                const len=this.colors.length;
                this.colors=[...this.colors,{id:len,color:shade2}];
                const effect=(selectEffect as HTMLSelectElement).value;
                const {url}=this.extractBgImage({target:parent})
                this.insertBgShade({target:parent,colors:this.colors,effect:effect,url});
            }
        };
        
        okay.onclick=(e:MouseEvent)=>{
            if(e){
                const eleId=parent.id;
                parent.removeChild(innerContainer);
                parent.classList.add("bgShade");
                idValues.push({eleId,id:"blogId",attValue:eleId});
                idValues.push({eleId,id:"linearGrad",attValue:"linearGrad"});
                const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                this._modSelector.dataset.simplePopulateAttributes({target:parent,idValues,popIdValues:getEleIds});
                this._modSelector.blog={...this._modSelector.blog,
                    class:parent.className,
                    attr:"linearGrad",
                    cssText:parent.style.cssText

                };
                this._modSelector.localStore({blog:this._modSelector.blog});
            }
        };
        reset.onclick=(e:MouseEvent)=>{
            if(e){
                this.colors=[] as {id:number,color:string}[];
                const eleId=parent.id;
                idValues=idValues.filter(kat=>(kat.eleId !==eleId));
                this._modSelector.dataset.upDateIdValues({idValues});
                const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                this._modSelector.dataset.simplePopulateAttributes({target:parent,idValues,popIdValues:getEleIds});
                parent.style.background="";
                parent.style.backgroundColor="";
                parent.style.color="black";
                document.body.style.backgroundColor="white";
                (Main.textarea as HTMLElement).style.background="";
                const cssText=parent.style.cssText;
                const blog=this._modSelector.blog;
                this._modSelector.blog={...blog,cssText:cssText,attr:""};
                parent.classList.remove("bgShade");
                this._modSelector.localStore({blog:this._modSelector.blog});
            }
        };
        Misc.matchMedia({parent:innerContainer,maxWidth:900,cssStyle:{top:"30%",left:"20%",right:"20%"}});
        Misc.matchMedia({parent:innerContainer,maxWidth:400,cssStyle:{top:"35%",left:"0%",right:"0%"}});

    };


    extractBgImage({target}:{target:HTMLElement}):{url:string|null}{
        const testUrl:RegExp=/(url\()/;
        const testEnd:RegExp=/\)/;
        for(const [key,value] of Object.entries(target.style)){
            if(key==="background" && value){
                if(testUrl.test(value)){
                    const start=RegExp(testUrl).exec(value);
                    if(start){
                        const arrValue=value.split("");
                        const endPart=arrValue.slice(start.index+start[0].length,arrValue.length-1).join("");
                        const end=RegExp(testEnd).exec(endPart);
                        if(end){
                            const url=endPart.slice(0,end.index);
                            return {url};
                        };
                    };
                };
            }else if(key==="backgroundImage" && value){
                if(testUrl.test(value)){
                    const start=RegExp(testUrl).exec(value);
                    const end=RegExp(testEnd).exec(value);
                    if(start && end){
                        const url=value.slice(start.index+start[0].length,end.index);
                        return {url};
                    };
                };
            };
        };
        return {url:null};
    };


    insertBgShade(item:{
        target:HTMLElement,
        colors:{id:number,color:string}[],
        effect:string,
        url:string|null,
    }):void{
        //MODIFY THE TARGET ELEMENT CSS AND RETURNS cssText string
        const {target,effect,url,colors}=item;
        const HexReg:RegExp=/(#[a-z0-9]+)|(rbg\()|(rgba\()/;
        const linearReg:RegExp=/(linear-gradient\()/;
        const backgroundValue=target.style.background;
        const isHex=HexReg.test(backgroundValue);
        const isLinear=linearReg.test(backgroundValue);
        const len=colors.length;
        const colorStr= colors.map((col)=>(col.color)).join(",");
        this._modSelector.blog={...this._modSelector.blog,attr:"linearGrad"};

            if(isHex && colorStr && !isLinear){
              
                target.style.background="";
                const color_=target.style.background;
                if(len===1){
                    target.style.background=`linear-gradient(${effect},${color_},${colorStr})`;
                    if(url){
                        target.style.background=`linear-gradient(${effect},${color_},${colorStr}),url(${url})`;
                    };
                }else{
                    target.style.background=`linear-gradient(${effect},${colorStr})`;
                    if(url){
                        target.style.background=`linear-gradient(${effect},${colorStr}),url(${url})`;
                    };
                };

            }else if(isLinear){
                if(len===1){
                    target.style.background=`linear-gradient(${effect},${colorStr},rgb(0 0 20 / 40%)`;
                    if(url){
                        target.style.background=`linear-gradient(${effect},${colorStr},rgb(0 0 20 / 40%),url(${url})`;
                    };

                }else{
                    target.style.background=`linear-gradient(${effect},${colorStr})`;
                    if(url){
                        target.style.background=`linear-gradient(${effect},${colorStr}),url(${url})`;
                    };
                }
            }else if(colorStr){
              
                target.style.background="";
                if(len===1){
                    target.style.background=`linear-gradient(${effect},${colorStr},rgb(0 0 20 / 40%)`;
                    if(url){
                        target.style.background=`linear-gradient(${effect},${colorStr},rgb(0 0 20 / 40%),url(${url})`;
                    };

                }else{
                    target.style.background=`linear-gradient(${effect},${colorStr})`;
                    if(url){
                        target.style.background=`linear-gradient(${effect},${colorStr}),url(${url})`;
                    };
                }

            };

    };

   
   
    getRegExpStartEnd(item:{str:string,startReg:RegExp,endReg:RegExp,effect:string}):{start:number,end:number,exp:string}{
        const {str,startReg,endReg,effect}=item;
        const matchstarts=str.matchAll(startReg) as any ;
        const matchends=str.matchAll(endReg) as any ;
        const startArr:{start:number,end:number,exp:string}[]=[];
        const endArr:{start:number,end:number,exp:string}[]=[];
        let retRes:{start:number,end:number,exp:string}|undefined;

        for (const match of matchstarts) {
            if(!(match.index)) return {start:0,end:0,exp:""}
            startArr.push({start:match.index,end:match.index + match.length,exp:match[0]});
          }
        for (const match of matchends) {
            if(!(match.index)) return {start:0,end:0,exp:""}
            endArr.push({start:match.index,end:match.index + match.length,exp:match[0]});
          }
          const start=startArr[0].start;
          const end=endArr[endArr.length-1].end;
          if(effect){
          const exp=str.slice(start+1,end-1).split(`${effect},`)[1];
          retRes={start:start,end:end,exp:exp}
          return retRes
          }else{
            const exp=str.slice(start+1,end-1);
          retRes={start:start,end:end,exp:exp}
          return retRes
          }

    };


    extractLinearGradiantColor(item:{
        target:HTMLElement,
    }):{colorOne:string|null,colorTwo:string|null}{
        const {target}=item;
        //linear-gradient(45deg, #ffff, whitesmoke), url("https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/no_userid-unknownUser-fastestGRowing.png") 
        const background=target.style.background;
        const LinReg:RegExp=/(linear-gradient\()/;
       
        
        const endTagReg:RegExp=/\),/;
        const isLinear=LinReg.test(background);
        const colors:string[]=[]
        if(isLinear){
            const startMatch=RegExp(LinReg).exec(background);
            if(startMatch){
                const startLen=startMatch.index + startMatch[0].length;
                //DOES NOT HAVE URL()
                const endPart=background.slice(startLen,background.length-1);
                const getEnd=RegExp(endTagReg).exec(endPart);
                console.log("COLORS!!:endPart",endPart);
                console.log("COLORS!!:getEnd",getEnd);
                if(getEnd){
                    const endPart2=endPart.slice(0,getEnd.index);
                    console.log("COLORS!!:inside",endPart2);
                    const arr=[...endPart2.split(",")]
                    return {colorOne:arr[1]|| null,colorTwo:arr[2] ||null}
                }
                
            };
        };
        return {colorOne:null,colorTwo:null};
    };



    oldNewEffect({oldEffect,effect,colorOne,newValue,url,defaultValue}:{
        oldEffect:string|null,
        effect:string|null,
        colorOne:string|null,
        newValue:string|null,
        url:string|null,
        defaultValue:string
    }):{newValue:string}{
        if(oldEffect){

            if( colorOne && newValue){
                const middleRes=`${oldEffect},${colorOne},${newValue}`;
                if(url){
                    const linearRes=`linear-gradient(${middleRes}),url(${url})`;
                    return{newValue:linearRes}
                }else{
                    const linearRes=`linear-gradient(${middleRes})`;
                    return{newValue:linearRes}
                }
            }else if( !colorOne && newValue){
                const middleRes=`${oldEffect},${newValue},${newValue}`;
                if(url){
                    const linearRes=`linear-gradient(${middleRes}),url(${url})`;
                    return{newValue:linearRes}
                }else{
                    const linearRes=`linear-gradient(${middleRes})`;
                    return{newValue:linearRes}
                }
            }else if( !colorOne && !newValue){
                return {newValue:""}
            }else{
                return {newValue:""}
            }
        }else if(effect){
            if( colorOne && newValue){
                const middleRes=`${effect},${colorOne},${newValue}`;
                if(url){
                    const linearRes=`linear-gradient(${middleRes}),url(${url})`;
                    return{newValue:linearRes}
                }else{
                    const linearRes=`linear-gradient(${middleRes})`;
                    return{newValue:linearRes}
                }
            }else if( !colorOne && newValue){
                const middleRes=`${effect},${newValue},${newValue}`;
                if(url){
                    const linearRes=`linear-gradient(${middleRes}),url(${url})`;
                    return{newValue:linearRes}
                }else{
                    const linearRes=`linear-gradient(${middleRes})`;
                    return{newValue:linearRes}
                }
            }else if( !colorOne && !newValue){
                return {newValue:""}
            }else{
                return {newValue:""}
            }
        }else if(!effect && !oldEffect){
            if( colorOne && newValue){
                const middleRes=`${defaultValue},${colorOne},${newValue}`;
                if(url){
                    const linearRes=`linear-gradient(${middleRes}),url(${url})`;
                    return{newValue:linearRes}
                }else{
                    const linearRes=`linear-gradient(${middleRes})`;
                    return{newValue:linearRes}
                }
            }else if( !colorOne && newValue){
                const middleRes=`${defaultValue},${newValue},${newValue}`;
                if(url){
                    const linearRes=`linear-gradient(${middleRes}),url(${url})`;
                    return{newValue:linearRes}
                }else{
                    const linearRes=`linear-gradient(${middleRes})`;
                    return{newValue:linearRes}
                }
            }else if( !colorOne && !newValue){
                return {newValue:""}
            }else{
                return {newValue:""}
            }
        }else{
            return {newValue:""}
        }
    };


    checkRegExp(item:{str:string,reg:RegExp}):string|undefined{
        const {str,reg}=item;
        let exp:string|undefined;
        const all=str.matchAll(reg) as any;
        for(const match of all){
            exp=match[0]
        }
        return exp
    };


    RGBAToHexA(rgba:string, forceRemoveAlpha = false) {
        const reg:RegExp=/^rgba?\(|\s+|\)$/g;
        return "#" + rgba.replace(reg, '') // Get's rgba / rgb string values
          .split(',') // splits them at ","
          .filter((string, index) => !forceRemoveAlpha || index !== 3)
          .map(string => parseFloat(string)) // Converts them to numbers
          .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
          .map(number => number.toString(16)) // Converts numbers to hex
          .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
          .join("") // Puts the array to togehter to a string
      };


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
    };


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



    };


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
        const {email,label:labelEmail}=Nav.emailComponent(form);
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
    };


}



class Sidebar{
   public readonly logo:string="/images/gb_logo.png";
   public readonly pic="/images/gb_logo.png";
   public readonly url="/api/uploadImage";
   public readonly emojiSmile:string="/images/emojiSmile.png";
   public readonly bgColor="#042b42";
   public btnColor:string;
   public readonly textColor:string="#7ad6e8";
   public textFontSize:string="14px";
   public _main:Main;
   static headerType:swapHeaderType;
   static btnEles:HTMLButtonElement[] |null;
   private _header:Header;
   private _footer:Footer;
   private _edit:Edit;
   private htmlelement:HtmlElement;
   private _displayBlog:DisplayBlog;
   private sideSetup:SideSetup;
   private loadMisc:LoadMisc;
   private _selectors_:flexSelectorType[]
   private ven:Ven;
   private intro:Intro;
   private reference:Reference;
    // DROP-DOWN SELECTOR FOR EACH BOX
  private design:Design;
  
   addImage:AddImageUrl;
  private  _elements:elementType[]=[];
  private  codeElement:CodeElement;
  private  _pasteCode:PasteCode;
    //Column GENERATOR
    arrCol=[{col:1,num:12},{col:2,num:6},{col:3,num:4},{col:4,num:3},{col:6,num:2}]
    //-------------------INITIALIZE---------------------///


    
    
    //---------------------INITIALIZE------------------------///

    constructor(private _modSelector:ModSelector,private _service:Service,private auth:AuthService,main:Main, private _flexbox:Flexbox,private _code:NewCode,header:Header,public customHeader:CustomHeader,footer:Footer,edit:Edit,private _User:User,private _regSignin:RegSignIn,displayBlog:DisplayBlog,public chart:ChartJS,public shapeOutside:ShapeOutside,private _metablog:MetaBlog,private _headerFlag:Headerflag,public toolbar:Toolbar,private _blog:blogType,private _viewResume:ViewResume,private __user:userType|null,private reorg:ReorgBlog){
        this.emojiSmile="./images/emojiSmile.png";
        this.logo="/images/logo.png";
        this._selectors_=Flexbox.selectors_;
        this.btnColor=this._modSelector.btnColor;
        this._main=main;
        this._header=header;
        this._footer=footer;
        this._edit=edit;
        this.reference= new Reference(this._modSelector);
        this.design= new Design(this._modSelector);
        this.ven= new Ven(this._modSelector);
        this._pasteCode= new PasteCode(this._modSelector,this._service)
        this.htmlelement=new HtmlElement(this._modSelector,this._service,this._User,this.shapeOutside,this.design,this.ven,this.reference,this._headerFlag,this._pasteCode)
        this._displayBlog=displayBlog;
        Sidebar.headerType={normal:true,custom:false}
        this.sideSetup= new SideSetup(this._modSelector,this._service,this._User,this._displayBlog,this._edit);
        this.intro=new Intro(this._modSelector,this._service);
        this.loadMisc= new LoadMisc(this._modSelector,this._service);
       
        this.addImage=new AddImageUrl(this._modSelector,this._service);
        
    }
    //------GETTER SETTERS-----/////
    get user(){
        return this.__user;
    };
    set user(user:userType|null){
        this.__user=user;
    }
    get blog(){
        const strBlog=localStorage.getItem("blog");
        if(strBlog){
            const blog=JSON.parse(strBlog) as blogType
            return blog
        }else{
            return this._blog
        }
    };
    set blog(blog:blogType){
        this._blog=blog
        localStorage.setItem("blog",JSON.stringify(blog));
    };
    
    get elements(){
        return this._modSelector.elements
    }
    set elements(elements:elementType[]){
        this._modSelector.elements=elements;
    }
    get placement(){
        return this._modSelector.placement;
    }
    set placement(placement:number){
        this._modSelector.placement=placement;
    }

   
   
    //------GETTER SETTERS-----/////
    // MAIN INJECTION FOR SIDEBAR
    onclickHideShowSideBar({injector,mainContainer,textarea,footer,mainHeader,blog}:{
        injector:HTMLElement,
        mainContainer:HTMLElement,
        textarea:HTMLElement,
        footer:HTMLElement,
        mainHeader:HTMLElement,
        blog:blogType|null

    }){
        injector.style.alignSelf="flex-start";
        mainContainer.id="main";
        this.blog=blog || {} as blogType;
        Main.container=mainContainer;
        Main.textarea=textarea;
        const less1000=window.innerWidth <988 ;
        injector.style.position="relative";
        const arrDiv=document.createElement("div");
        arrDiv.style.cssText=`border-radius:50%;background:${this.bgColor};filter:drop-shadow(0 0 0.75rem ${this.bgColor});font-size:18px;display:grid;place-items:center;width:40px;height:40;position:absolute;`;
        arrDiv.style.top="0%";
        arrDiv.style.right="0%";
        arrDiv.style.transform=less1000 ? "rotate(90deg)":"rotate(0deg)";
        arrDiv.style.transform="translate(-10px,0px)";
        FaCreate({parent:arrDiv,name:FaArrowAltCircleLeft,cssStyle:{color:"white",width:"35px",height:"35px",margin:"auto",backgroundColor:"transparent"}});
        if(less1000){
            this.onclickHideShowSidebarLt1000({injector,arrDiv,mainCont:mainContainer,less1000,textarea,footer,mainHeader,blog});
        }else{
            this.onclickHideShowSideBarGt100({injector,arrDiv,mainCont:mainContainer,less1000,textarea,footer,mainHeader,blog});
        };
        
    };



   //PARENT onClickHideShowSidebar()
    onclickHideShowSideBarGt100({injector,arrDiv,mainCont,less1000,textarea,footer,mainHeader,blog}:{injector:HTMLElement,arrDiv:HTMLElement,mainCont:HTMLElement,less1000:boolean,textarea:HTMLElement,footer:HTMLElement,mainHeader:HTMLElement,blog:blogType|null}){
        injector.style.alignSelf="flex-start";
        const maxHeight=200
        this.sidebarMain({parent:injector,maxHeight,mainCont,less1000,textarea,footer,mainHeader,blog});
        injector.appendChild(arrDiv);
        arrDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                if(!Main.mainEntry) return;
                const time=700;
                const mainInjector=Main.mainEntry as HTMLElement;
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
    };



    //PARENT onClickHideShowSidebar()
    onclickHideShowSidebarLt1000({injector,arrDiv,mainCont,less1000,textarea,footer,mainHeader,blog}:{injector:HTMLElement,arrDiv:HTMLElement,mainCont:HTMLElement,less1000:boolean,textarea:HTMLElement,footer:HTMLElement,mainHeader:HTMLElement,blog:blogType|null}){
        const maxHeight=60;
        injector.style.alignSelf="flex-start";
        this.sidebarMain({parent:injector,maxHeight,mainCont,less1000,textarea,footer,mainHeader,blog});
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
    };

    
    // PARENT onclickHideShowSideBarGt100 && onClickHideShowSidebar
   async sidebarMain({parent,maxHeight,mainCont,less1000,textarea,footer,mainHeader,blog}:{
        parent:HTMLElement,
        maxHeight:number,
        mainCont:HTMLElement,
        less1000:boolean,
        textarea:HTMLElement,
        footer:HTMLElement,
        mainHeader:HTMLElement,
        blog:blogType|null

    }){
        const less400= window.innerWidth <400;
        const less900= window.innerWidth <900;
        const height=less1000 ? "60vh":"260vh";
        const user=this.user ? this.user : this._User.user;
        const idValues=this._modSelector.dataset.idValues
        Main.textarea=document.querySelector("div#textarea");
        parent.style.paddingBottom="2rem";
        parent.style.paddingInline="0.5rem";
        parent.style.justifySelf="flex-start";
        parent.style.backgroundColor=this.bgColor;
        Main.cleanUp(parent);
        const sidebarMain=document.createElement("section");
        sidebarMain.id="sidebarMain";
        sidebarMain.style.cssText=`justify-content:flex-start;align-items:center;overflow-y:scroll;gap:1rem;padding-inline:1rem;border:1px solid white;font-size:${this.textFontSize};padding-block:2rem;`;
        sidebarMain.style.maxHeight=height;
        sidebarMain.style.background=this.bgColor;
        sidebarMain.style.height="100%";
        sidebarMain.className="flexCol";
        this.clearTextarea({parent:sidebarMain,mainCont,idValues,textarea,mainHeader,footer,blog});
        this.introduction(sidebarMain,mainCont);
        this.initializeTheme({parent:sidebarMain,mainCont,idValues,textarea,mainHeader,footer});
        this.addToolbar({parent:sidebarMain,mainCont,idValues,textarea,mainHeader,footer,blog});
        this.initiatesAddNewBlog(sidebarMain,mainCont);
        this.insertResumeLink(sidebarMain,textarea,this.user);
        this.addAGraph(sidebarMain,textarea,idValues);
        this.initiateEdit({parent:sidebarMain,mainCont,textarea,mainHeader,footer,idValues,less400,less900});
        this.refreshEditor({parent:sidebarMain,mainCont,textarea,mainHeader,footer,blog,user});
        this.editMeta({parent:sidebarMain,mainCont,textarea});//edit Meta
        // this.initiateEdit(sidebarMain);
        this.saveBlog(sidebarMain,mainCont);
        this.reOrder({parent:sidebarMain,height,user,textarea,mainCont,mainHeader,footer});
        this.initiateHeaderTemplate(sidebarMain,idValues,mainHeader,this._modSelector.blog);
        this.initiateHeaderFlag(sidebarMain,idValues,textarea);
        this.ultility(sidebarMain,idValues,null,textarea);
        this.initiateCustomHeaderBtn(sidebarMain,mainHeader,this._modSelector.blog);
        this.addimageClass(sidebarMain,idValues,textarea);
        this.initiateShapOutsideBtn(sidebarMain,idValues,textarea);
        this.initiatePasteCode(sidebarMain,idValues,textarea);
        this.initiateReference(sidebarMain,idValues);
        this.initiateGenerateFooter({parent:sidebarMain,idValues,footer});
        this.flexBoxLayout({parent:sidebarMain,textarea});
        parent.appendChild(sidebarMain);
    };


    introduction(parent:HTMLElement,mainCont:HTMLElement){
        //BTN THAT DESCRIBES ITS PURPOSE ON SIDEBAR
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Editor Overview";
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
                this.intro.viewInstruction(mainCont);
            }
        });
     };


    //THEME
    initializeTheme({parent,idValues,mainCont,textarea,mainHeader,footer}:{
        parent: HTMLElement,
        idValues:idValueType[],
        mainCont:HTMLElement,
        textarea:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement

    }){
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="choose a theme";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const divpara=document.createElement("div");
        divpara.style.cssText="color:white;font-size:18px;"
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.color="white";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.textContent="choose you theme,,, font,background,,,";
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
                this.sideSetup.themeSetup({mainCont:mainCont,init:true,idValues,textarea,mainHeader,footer})
            }
        });
     };



    clearTextarea({parent,textarea,mainHeader,footer,blog}:{
        parent: HTMLElement,
        idValues:idValueType[],
        mainCont:HTMLElement,
        textarea:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement,
        blog:blogType|null

    }){
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;width:100%;";
        
        const divpara=document.createElement("div");
        divpara.style.cssText="color:pink;font-size:18px;"
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.color="white";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.textContent="Clear Screen";
        divpara.appendChild(para);
        btnContainer.appendChild(divpara);
        const btn_:btnType={
            parent:btnContainer,
            text:"initialize",
            bg:"white",
            color:"black",
            type:"button"
        }
        const btn=buttonReturn(btn_);
        btn.style.boxShadow="1px 1px 8px 1px white,-1px -1px 8px 1px white"
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1});
       
        Misc.buttonHoverEffect(btn);
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                Header.cleanUp(textarea);
                Header.cleanUp(mainHeader);
                Header.cleanUp(footer);
                this._modSelector.blogInitializer(this._User.user);
            }
        });
     };


    addToolbar({parent,idValues,mainCont,textarea,mainHeader,footer,blog}:{
        parent: HTMLElement,
        idValues:idValueType[],
        mainCont:HTMLElement,
        textarea:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement,
        blog:blogType|null

    }){
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Add toolbar";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-primary lean";
        btnContainer.appendChild(H5);
        const divpara=document.createElement("div");
        divpara.style.cssText="color:white;font-size:18px;"
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.color="white";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.textContent="add toolbar for easy access";
        divpara.appendChild(para);
        btnContainer.appendChild(divpara);
        const btn_:btnType={
            parent:btnContainer,
            text:"toolbar",
            bg:"gold",
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
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                this.toolbar.mainColBtn({parent:textarea,mainContainer:mainCont,textarea,blog});
            }
        });
     };


   
    //BTN INITIATE EDIT
    saveBlog(parent:HTMLElement,mainCont:HTMLElement){
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
                const user=this.user;
              
                if(blog && user?.id ){
                    
                    this._User.saveWork({parent:mainCont,blog,func:()=>undefined})

                }else{
                    this._regSignin.signIn();
                }
            }
        });
       
        outerContainer.appendChild(container);
        parent.appendChild(outerContainer);
    };


    //PARENT MAIN()-onTop
    reOrder({parent,textarea,user,height,mainCont,mainHeader,footer}:{
        parent:HTMLElement,
        height:string
        user:userType,
        textarea:HTMLElement,
        mainCont:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement

    }){

        Main.textarea=document.querySelector("div#textarea") as HTMLElement;
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;width:100%;";
        const H5=document.createElement("h6");
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
            if(e && Main.textarea){
                const blog=this._modSelector.blog;
                const maxCount=ModSelector.maxCount(blog);
                const check= maxCount>1;
                window.scroll(0,400);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                if( check ){
                    this._modSelector.removeDuplicates({blog:this._modSelector.blog});
                    const blog=this._modSelector.blog;
                    this.reorg.reOrder({parent:textarea,textarea,blog,
                        callback:async(_blog)=>{
                            Header.cleanUp(textarea);
                          await this._edit.main({parent:mainCont,textarea,mainHeader,footer,blog:_blog,user});
                            this._modSelector.removeDuplicates({blog:_blog});
                            parent.style.height=height;
                            parent.style.overflowY="scroll";
                        }
                    });
                }
            }
        });
     };

     //PARENT MAIN()-onTop
     initiatesAddNewBlog(parent:HTMLElement,mainCont:HTMLElement){
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
        const {button:btn}=Misc.simpleButton({anchor:btnContainer,text:"new blog",type:"button",bg:"blue",color:"white",time:400});
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",async(e:MouseEvent)=>{
            if(e ){
                window.scroll(0,0);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                const blog=this._modSelector.blog;
                const maxCount=ModSelector.maxCount(blog);
                const user=this.user;
                const checkUser=!!(user?.id!=="" && user?.email!=="");
                const checkBlog=!!( blog.name !=="undefined" && maxCount>0) ;
                if(checkUser){
                    //ask to save
                   
                    if(checkBlog){

                        Misc.wantToSaveBeforeFunc({
                            parent:mainCont,
                            funcSave:async()=>{await this._User.saveWork({parent:mainCont,blog,func:async()=>{
                                await this._main.newBlog({
                                    parent:mainCont,
                                    func:({blog})=>{
                                        if(blog){
                                            this._modSelector.blog=blog
                                        }
                                    },
                                    })
                            }})},
                            functCancel:async()=>{
                                await this._main.newBlog({
                                    parent:mainCont,
                                    func:()=>undefined,
                                    })
                             }})
                    }else{
                        await this._main.newBlog({parent:mainCont,func:()=>undefined})
                    }

                }else{
                    this._regSignin.signIn();
                }
            }
        });
     };



     insertResumeLink(parent:HTMLElement,textArea:HTMLElement,user:userType|null){
        //BTN THAT DESCRIBES ITS PURPOSE ON SIDEBAR
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="Resume";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="Insert Your Resume.";
        btnContainer.appendChild(para);
        const {button:btn}=Misc.simpleButton({anchor:btnContainer,text:"insertResume",type:"button",bg:"#0dcaf0",color:"black",time:400});
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",async(e:MouseEvent)=>{
            if(e ){
                window.scroll(0,0);
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                
                
                const checkUser=!!(user && user?.id );
                if(checkUser){
                    //ask to save
                    const mainResumes=user.resumes as mainResumeType[]
                   this._viewResume.copyLinkFromSidebar({parent:textArea,mainResumes})

                }else{
                    this._regSignin.signIn();
                }
            }
        });
     };


     addAGraph(parent:HTMLElement,textarea:HTMLElement,idValues:idValueType[]){
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
            if(e ){
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                const blog=this._modSelector.blog;
                this.chart.editorChart(textarea,blog,idValues);
            }
        });
     };



     //PARENT MAIN()-onTop
     refreshEditor({parent,mainCont,textarea,mainHeader,footer,blog,user}:{
        parent:HTMLElement,
        mainCont:HTMLElement,
        mainHeader:HTMLElement,
        textarea:HTMLElement,
        footer:HTMLElement,
        blog:blogType |null,
        user:userType

     }){
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
        btn.id="refreshButton";
        btnContainer.appendChild(divCont);
        parent.appendChild(btnContainer);
        btn.animate([
            {transform:"translateY(-100%) skew(45deg,0deg)",opacity:"0.3"},
            {transform:"translateY(0%) skew(0deg,0deg)",opacity:"1"}
        ],{duration:1000,iterations:1})
        btn.addEventListener("click",async(e:MouseEvent)=>{
            if(e && Main.container){
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                if(!blog){
                  const getBlog=await this._modSelector.loadFromLocal()
                  const {blog:_blog}=getBlog.getBlog();
                  blog=_blog;
                  ReorgBlog.sortPlacement({blog});
                  this._modSelector.loadBlog({blog,user});
                }
                
                await this._edit.main({parent:mainCont,textarea,mainHeader,footer,blog,user});
                // this._edit.selEleGenerator(Main.textarea as HTMLElement,blog)
            }
        });
     };
 
   
      initiateEdit({parent,mainCont,idValues,textarea,mainHeader,footer,less400,less900}:{
        parent:HTMLElement,
        mainCont:HTMLElement,
        idValues:idValueType[],
        textarea:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement,
        less400:boolean,
        less900:boolean
      }){
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
                this._edit.editViewUserBlogs({parent:mainCont,mainCont,mainHeader,textarea,footer,idValues,less400,less900})
            }
        });
       
        parent.appendChild(container);
    };


     //PARENT MAIN()-onTop!!FIX!!!!!!!!!!!!!!!
     async editMeta({parent,mainCont,textarea}:{parent:HTMLElement,mainCont:HTMLElement,textarea:HTMLElement}){
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
                const user=this.user;
                const blog=this._modSelector.blog;
                const signedIn= user?.id ;
                const allGood= (signedIn && blog && blog.user_id!=="");
                if(allGood){
                    this._metablog.metablog({
                        grandParent:null,
                        parent:textarea,
                        blog,type:"editor",
                        func:async(blog:blogType)=>{
                            await this._metablog.finalMeta({blog,parent:textarea,type:"none"});
                        }
                    })
                }
                else if(signedIn && !allGood){
                    this._main.newBlog({parent:mainCont,func:async(res)=>{
                        if(res.blog){

                            this._metablog.metablog({
                                grandParent:null,
                                parent:textarea,
                                blog:res.blog,
                                type:"editor",
                                func:async(blog:blogType)=>{
                                    await this._metablog.finalMeta({blog,parent:textarea,type:"none"});
                                }
                            })
                        }
                    }});
                }else{
                    this._regSignin.signIn()
                }
            }
        });
     };

     
   
     //PARENT MAIN()-onTop
     initiateHeaderTemplate(parent:HTMLElement,idValues:idValueType[],mainHeader:HTMLElement,blog:blogType|null){
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
           
            img.addEventListener("click",async(e:MouseEvent)=>{
                if(e){
                    header.isOn=true;
                    this._header._HeaderDataMain=header;
                    this._header.getHeader=header;
                    const res=await this._modSelector.loadFromLocal();
                    const {blog:_blog,user:_user}=res.getBlog();
                    const blog_=_blog || null;
                    const user=_user || null;
                    this.checkHeaderThenCreate({mainHeader,blog:blog_,user,
                        func:()=>this._header.headerSidebar({mainHeader,style:header.headerStyle,id:header.id,idValues})
                    });
                    
                }
            });
        });
        outerContainer.appendChild(containerFlex);
        parent.appendChild(outerContainer);
        
     };


     initiateHeaderFlag(parent:HTMLElement,idValues:idValueType[],textarea:HTMLElement){
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        Sidebar.headerType={normal:true,custom:false};
        const outerContainer=document.createElement("div");
        outerContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        outerContainer.className=" my-2 py-2";
        const H3=document.createElement("h5");
        H3.textContent="Header-Flag";
        H3.className="text-info lean";
        H3.style.cssText="margin-block:1rem;margin-bottom:2rem;text-decoration:underline;text-underline-offset:1rem;";
        outerContainer.appendChild(H3);
        const containerFlex=document.createElement("div");
        containerFlex.className="container_Flex mx-auto p-1 py-1 my-2";
        containerFlex.style.cssText="margin-block;2rem;width:100%;position:relative;flex-wrap:wrap;padding-block:2rem;";
        containerFlex.style.height="20vh";
        containerFlex.style.overflowY="scroll";
        //List start
        Headerflag.cardBodyCss.map((item_,index)=>{
                const headerCol=document.createElement("div");
                headerCol.className="headerCol ";
                headerCol.id=`headerCol-${index}`;
                headerCol.style.cssText="position:relative;display:block;flex:1;align-items:center;border:1px solid blue;margin-block:1rem;";
                const title=document.createElement("h6");
                title.textContent=item_.name;
                title.style.cssText="align-text:center;margin-bottom:0.5rem;margin-inline:auto;padding-inline:1rem;color:white;";
                headerCol.appendChild(title);
                const img=document.createElement("img");
                img.style.cssText="width:100%";
                img.style.maxWidth=less900 ? (less400 ? "350px":"500px"): "300px";
                img.style.aspectRatio=less900 ? (less400 ? "4/1":"5/1"): "";
                img.src=item_.img;
                img.alt=`headerflag-img-${item_.name}`;
                img.id=`headerflag-img-${item_.name}`;
                img.onmouseover=()=>{
                    img.animate([
                        {boxShadow:"1px 1px 5px 1px var(--bs-teal)"},
                        {boxShadow:"1px 1px 8px 2px var(--bs-teal)"},
                        {boxShadow:"1px 1px 5px 1px var(--bs-teal)"}
                    ],{duration:750,iterations:1});
                };
                headerCol.appendChild(img);
                containerFlex.appendChild(headerCol);
                
                img.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
    
                        this._headerFlag.initMain({
                            parent:textarea,
                            cardBodyCss:item_,
                            idValues
                        });
                    }
                });

            });
        ///----------list end------------//
        outerContainer.appendChild(containerFlex);
        parent.appendChild(outerContainer);
        
     };


     //PARENT MAIN CUSTOM HEADER
     ultility(parent:HTMLElement,idValues:idValueType[],selRowCol:selRowColType|null,textarea:HTMLElement){
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
                    this.btnDivider({parent:Main.textarea as HTMLElement,idValues,selRowCol});
                    }
                    else if(word.name==="separator"){
                        this.btn1Separator({parent:Main.textarea as HTMLElement,idValues,selRowCol});
                    }
                    else if(word.name==="circles-design"){
                        this.design.circlesDesign(Main.textarea as HTMLElement,idValues);
                    }
                    else if(word.name==="arrow-design"){
                        this.design.arrowDesign(Main.textarea as HTMLElement,idValues);
                    }
                    else if(word.name==="clean-text"){
                        this.cleanText(Main.textarea as HTMLElement,idValues);
                    }
                    else if(word.name==="Ven-Diagram"){
                        this.ven.venDiagram({parent:Main.textarea as HTMLElement,idValues});
                    }
                    else if(word.name==="wave-art"){
                        this.design.signalWave(Main.textarea as HTMLElement,idValues);
                    }
                    else if(word.name==="arch-art"){
                        this.design.arch(Main.textarea as HTMLElement,idValues);
                    }
                    else if(word.name==="title-art"){
                        this.design.titleArt(Main.textarea as HTMLElement,idValues);
                    }
                    else if(word.name==="add-fill"){
                        this.design.addFill({parent:textarea,idValues});
                    }
                }
            });
        });

        base.appendChild(title);
        base.appendChild(para);
        base.appendChild(btnGrp);
        parent.appendChild(base);
     };


     //PARENT MAIN CUSTOM HEADER
    async initiateCustomHeaderBtn(parent:HTMLElement,mainHeader:HTMLElement,blog:blogType){
        Sidebar.headerType={normal:false,custom:true};
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
        btn.addEventListener("click",async(e:MouseEvent)=>{
            if(e){
                btn.disabled=true;
                setTimeout(()=>{
                    btn.disabled=false;
                },1000);
                const res=await this._modSelector.loadFromLocal();
                const {blog:_blog,user:_user}=res.getBlog();
                const blog_=_blog || null;
                const user=_user || null;
               
                    this.checkHeaderThenCreate({mainHeader:Main._mainHeader,blog:blog_,user,
                        func:()=>this.customHeader.customHeader(mainHeader,false)
                    });
            }
        });
     };


     addimageClass(parent:HTMLElement,idValues:idValueType[],textarea:HTMLElement){
        Sidebar.headerType={normal:false,custom:true};
        this.customHeader.isRefreshed=false;
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h6");
        H5.textContent="free Images";
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
                const user=this.user;
                   await this.addImage.main({parent:textarea,blog,useParent:true,idValues,user});
            }
        });
     };


     loadImages(parent:HTMLElement,idValues:idValueType[]){
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
                    this.loadMisc.main({parent:Main.textarea,idValues});
            }
        });
     };


     initiateReference(parent:HTMLElement,idValues:idValueType[]){
        Sidebar.headerType={normal:false,custom:true};
        this.customHeader.isRefreshed=false;
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h6");
        H5.textContent="reference list";
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
                    this.reference.main({parent:Main.textarea,idValues});
            }
        });
     };

     //PARENT MAIN SHAPE-OUTSIDE
     initiateShapOutsideBtn(parent:HTMLElement,idValues:idValueType[],textarea:HTMLElement){
        Sidebar.headerType={normal:false,custom:true};
        this.customHeader.isRefreshed=false;
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h6");
        H5.textContent="image-text-merger";
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
                    this.shapeOutside.sidebarMain({parent:textarea,idValues});
            }
        });
     };

    //PARENT MAIN(): GENERATES CODE TEMPLATE
    initiateGenerateCode(parent:HTMLElement,textarea:HTMLElement){
    
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h6");
        H5.textContent="type Your code";
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
                this._code.codeTemplate(textarea);
            }
        });
    
    };
   

    initiatePasteCode(parent:HTMLElement,idValues:idValueType[],textarea:HTMLElement){
    
        const btnContainer=document.createElement("div");
        btnContainer.className="flexCol text-center";
        btnContainer.style.cssText="box-shadow:1px 1px 12px 1px white;border-radius:10px;padding-inline:0.5rem;padding-block:1rem;text-align:center;align-items:center;width:100%;";
        const H5=document.createElement("h5");
        H5.textContent="past your code";
        H5.style.cssText="margin:auto;text-decoration:underline;text-underline-offset:1rem;";
        H5.className="text-info lean";
        btnContainer.appendChild(H5);
        const para=document.createElement("p");
        para.className="mc-auto px-1 text-balance text-center";
        para.style.cssText="text-wrap:wrap;margin-block:1rem;";
        para.style.color=this.textColor;
        para.textContent="This allows you to paste your VS Code";
        btnContainer.appendChild(para);
        const {button:btn}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:"green",color:"white",time:400,text:"paste code"});
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
                this._pasteCode=new PasteCode(this._modSelector,this._service);
                this._pasteCode.initPasteCode({injector:textarea,idValues})
            }

        });
    
    };

    //PARENT MAIN() INJECTOR-!!!!BUTTON
    initiateGenerateFooter({parent,idValues,footer}:{parent:HTMLElement,idValues:idValueType[],footer:HTMLElement}){
       
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
                this._footer.main(footer,idValues);
            }
        });
    };
     
    //PARENT MAIN()-selector are appended to textarea
    flexBoxLayout({parent,textarea}:{parent:HTMLElement,textarea:HTMLElement}){
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
            this.selectorTemplate({container,selector,textarea})
        });
        outerContainer.appendChild(container);
        parent.appendChild(outerContainer);
    };

    selectorTemplate(item:{container:HTMLElement,selector:flexSelectorType,textarea:HTMLElement}){
        const {container,selector,textarea}=item;
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
            select_img.addEventListener("click",async (e:MouseEvent)=>{
                if(e){
                    window.scroll(0,800);
                    // console.log("sidebar:Header.selectors",this._modSelector.selectors)
                   await this._flexbox.rowColGenerator(textarea,selector);
                    
                }
            });
    };


    async checkHeaderThenCreate({mainHeader,blog,user,func}:{
        mainHeader:HTMLElement|null,
        blog:blogType|null,
        user:userType|null,
        func:()=>Promise<void>|void
}){
    const _mainHeader_=document.querySelector("section#sectionHeader") as HTMLElement;
    mainHeader=mainHeader ||_mainHeader_;
    if(!blog){
        const getBlog=await this._modSelector.loadFromLocal()
        const {blog:_blog,user:_user}=getBlog.getBlog();
        blog=_blog;
        user=_user || null;
        this._modSelector.loadBlog({blog,user});
      }
    const foundHeader=blog.selectors.find(select=>(select.header));
            
                if(foundHeader){
                    //message
                    this.foundHeaderMsg({parent:mainHeader,blog,func});
                }else{
                    func();
                }
    }

    foundHeaderMsg({parent,blog,func}:{
        parent:HTMLElement,
        blog:blogType,
        func:()=>Promise<void>|void
    }){
       
        parent.style.position="relative";
        const css_col="display:flex;justify-content:center;align-items:center;flex-direction:column;";
        const css_row="display:flex;justify-content:space-around;align-items:center;flex-wrap:nowrap;";
        const css_inline="display:inline-flex;justify-content:space-around;align-items:center;flex-wrap:nowrap;gap:3rem;";
        const popup=document.createElement("div");
        popup.id="foundCustom header-popup";
        popup.className="popup";
        popup.style.cssText= css_col + "position:absolute;inset:0% 0% -20%;width:clamp(350px,500px,575px);background-color:#00020875;color:blue;border-radius:12px;box-shadow:1px 1px 12px 1px black; padding-inline:1rem; padding-block:0.5rem;gap:1rem;z-index:100;transform:translateY(20%);backdrop-filter:blur(10px);color:white;";
        popup.style.transform="translateY(20%);";
        const emoji=document.createElement("img");
        emoji.src=this.emojiSmile;
        emoji.alt="www.ablogroom.com";
        emoji.style.cssText="width:50px;margin:auto;filter:drop-shadow(0 0 0.5rem black);border-radius:50%;border:none;";
        const msg=document.createElement("p");
        msg.style.cssText="text-wrap:pretty;margin:auto;";
        msg.textContent="You have an already existing header. If you click change, then all your styles and information will be deleted. Do you want to change the header?";
        const msgCont=document.createElement("div");
        msgCont.style.cssText=css_row;
        popup.appendChild(msg);
        const btnDiv=document.createElement("div");
        btnDiv.style.cssText=css_inline
        const {button:cancel}=Misc.simpleButton({anchor:btnDiv,text:"cancel",type:"button",bg:Nav.btnColor,color:"white",time:400});
        const {button:remove}=Misc.simpleButton({anchor:btnDiv,text:"change",type:"button",bg:Nav.btnColor,color:"white",time:400});
        cancel.style.transform="scale(0.8)";
        remove.style.transform="scale(0.8)";
        msgCont.appendChild(emoji);
        Misc.rotateIn({anchor:emoji,rotate:360,direction:"x",time:1200});
        msgCont.appendChild(msg);
        popup.appendChild(msgCont);
        popup.appendChild(btnDiv);
        parent.appendChild(popup);
        cancel.onclick=(e:MouseEvent)=>{
            if(!e) return;
            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
            setTimeout(()=>{
                parent.removeChild(popup);
            },390);
        };
        remove.onclick=(e:MouseEvent)=>{
            if(!e) return;
            Header.cleanUp(parent);
            blog.selectors = blog.selectors.filter(select=>(!select.header));
            this._modSelector.selectors=blog.selectors;
            //execute the function
            func();
        };
    };
    
    //BTN ULTILITIES
    btn1Separator({parent,idValues,selRowCol}:{
        parent:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }){
        parent.style.position="relative";
        const width=window.innerWidth <900 ? 80 :30;
        const popup=document.createElement("div");
        popup.style.cssText=`position:absolute; background:#0a2351;backdrop-filter:blur(15px);color:white;width:${width}%;height:30vh;margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:10px; box-shadow:1px 1px 5px 1px black;inset:auto 0% auto 0%;z-index:200;`;
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
        form.addEventListener("submit",async(e:SubmitEvent)=>{
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
               await this._modSelector.elementAdder({target:hr,sel:null,rowEle:null,colEle:null,idValues}).then(async(res)=>{
                if(res){
                    const ele=res.ele as elementType;
                    idValues=res.idValues
                    divCont.setAttribute("data-element",`${ele.placement}-A`);
                    divCont.classList.add("isActive");
                    res.target.classList.add("isActive");
                    this._modSelector.removeMainElement({parent,divCont,target:res.target,idValues,selRowCol})
                }
               });
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:500});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },480);
            }
        });
        
    };


    btnDivider({parent,idValues,selRowCol}:{
        parent:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }){
        parent.style.position="relative";
        const width=window.innerWidth <900 ? 80 :30;
        const popup=document.createElement("div");
        popup.id="popup-divider";
        popup.style.cssText=`position:absolute; background:#0a2351;backdrop-filter:blur(15px);color:white;width:${width}%;height:30vh;margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:10px; box-shadow:1px 1px 5px 1px black;inset:auto 0% auto 0%;z-index:200;`;
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
                this._modSelector.elementAdder({target,sel:null,rowEle:null,colEle:null,idValues}).then(async(res)=>{
                    if(res){
                        const ele=res.ele as elementType;
                        divCont.setAttribute("data-placement",`${ele.placement}-A`);
                        divCont.classList.toggle("isActive");
                        res.target.classList.toggle("isActive");
                        this._modSelector.removeMainElement({parent,divCont,target,idValues,selRowCol});
                    }
                });
            }
        });
        
    };

    
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
    };


    cleanText(parent:HTMLElement,idValues:idValueType[]){
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

        this.genParagraph({blog,idValues}).map(item=>{
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
            btn.onclick=async(e:MouseEvent)=>{
                if(e){
                    const para2=Sidebar.cleanPara(para as HTMLParagraphElement);
                    if(!para2)return;
                    item.para.textContent=para2.textContent;
                    await this._modSelector.updateElement({target:item.para,idValues,selRowCol:item.selRowCol}).then(async(res)=>{
                        if(res ){
                            if(res.ele){
                                const ele=res.ele
                                Misc.message({parent,msg:`updated:${ele.eleId}`,type_:"success",time:700});
                            }
                        }else{
                            Misc.message({parent,msg:`value was not saved`,type_:"success",time:700});
                        }
                    });
                    
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
    };
    //BTN ULTILITIES
    //PARENT EDIT BLOG PAGE-edit meta button
    blogEditDisplay(parent:HTMLElement,file:File,formdata:FormData){
        //upload image to blog.img then display blog.name, blog.desc;
        const blog=this._modSelector.blog;
        const user=this.auth.user;
        const hasBlog=blog.user_id !=="" && blog.name !=="undefined";
        const blogHasKey=hasBlog && blog.imgKey!=="undefined";
        const editSubContainer=document.createElement("div");
        editSubContainer.className="mx-auto my-2 w-100";
        editSubContainer.style.cssText="background-color:black;colr:white;border-radius:12px;padding:1rem;box-shadow:1px 1px 10px 1px black;";
        const picDescCont=document.createElement("p");
        picDescCont.style.cssText="display:flex;margin-inline:auto;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:1rem;width:100%;gap:1.5rem;";
        //IMG
        const img=document.createElement("img");
        const cssText="border-radius:50%;filter:drop-shadow(0 0 0.75rem crimson);shape-outside:circle():margin-right:1rem;margin-bottom:1.25rem;float:left;";
        img.style.cssText=cssText;
        //IMG
        
        const filename=document.createElement("h6");
        filename.className="lean display-6 ";
        filename.textContent=hasBlog ? this._modSelector.blog.name as string :'no name';
        editSubContainer.appendChild(filename);
        // insert
        let urlImg:string;
        if(blogHasKey){
            const key=blog.imgKey as string
            this._service.getSimpleImg(key).then(async(res)=>{
                if(res){
                    this._modSelector.blog.img=res.img;
                    img.src=res.img;
                }
            });
        }else if(file as File){
            urlImg=URL.createObjectURL(file);
            img.src=urlImg;
            if(!user){
                Misc.message({parent,msg:"this pic has not been uploaded and therefore used for just display purpuses",type_:"error",time:1500});
            }else{

                this.uploadBlogImg({parent,formdata}).then(async(res)=>{
                    if(res){
                        img.src=res.img;
                        img.alt="www.ablogroom.com";
                    }
                });
            }

        }else{
            this._modSelector.blog.img=this.logo;
            img.src=this.logo;
        }
        const text=new Text(blog.desc || "enter your content");
        picDescCont.appendChild(img);
        picDescCont.appendChild(text);
        editSubContainer.appendChild(picDescCont);
        parent.appendChild(editSubContainer);

    };

    
   async uploadBlogImg({parent,formdata}:{parent:HTMLElement,formdata:FormData}){
       const imgAndKey=await  this._service.simpleImgUpload(parent,formdata);
       if(imgAndKey){
        const {img}=imgAndKey;
        return {img}
       }
       
    };

    
    async loadBlog(){
        return new Promise(resolve=>{
            if(typeof window !=="undefined"){
                resolve(localStorage.getItem("blog"));

            }

        }) as Promise<string | null> ;
    };

    
   

    static divider1(parent:HTMLElement,divCont:HTMLElement,color:string):{divCont:HTMLElement,line1:HTMLElement,line2:HTMLElement}{
        const line=document.createElement("div");
        line.style.cssText=`margin-inline:auto;width:49%;height:4px;background:aquamarine;border-radius:30px;box-shadow:1px 1px 3px 1px ${color},-1px -1px 3px -1px ${color},`;
        const line2=document.createElement("div");
        line.style.cssText=`margin-inline:auto;width:80%;height:4px;background:aquamarine;border-radius:30px;box-shadow:1px 1px 3px 1px ${color},-1px -1px 3px -1px ${color},`;
        divCont.appendChild(line);
        divCont.appendChild(line2);
        parent.appendChild(divCont);
        return {divCont:divCont,line1:line,line2:line2}
    };

    static cleanUpWithID(parent:HTMLElement,target:HTMLElement){
        const label=target.nodeName.toLowerCase();
        const getTarget=parent.querySelector(`${label}#${target.id}`);
        if(getTarget){
            parent.removeChild(target);
        }
    };

    static cleanUpID(parent:HTMLElement,id:string){
        const getAll=parent.querySelectorAll(`#${id}`);
        if(getAll){
            ([...getAll as any] as HTMLElement[]).map(ch=>{
                if(ch){
                    parent.removeChild(ch);
                }
            })
        }
    };

    static getBtns():HTMLButtonElement[]|null{
        if(!Main.textarea) return null
        const allBtns=Main.textarea?.querySelectorAll("button");
        if(!allBtns) return null
        return ([...allBtns as any] as HTMLButtonElement[])
    };

     genParagraph({blog,idValues}:{blog:blogType,idValues:idValueType[]}):{para:HTMLElement,selRowCol:selRowColType|null}[]{
        const arr:{para:HTMLElement,selRowCol:selRowColType|null}[]=[];
        if(!blog)return [];
         blog.elements.map(ele=>{
            if(ele && ele.name==="p"){
                const getEle=document.querySelector(`${ele.name}#${ele.eleId}`) as HTMLElement;
                if(getEle){
                    const check=([...getEle.classList as any] as string[]).includes("isActive");
                    if(check){
                        arr.push({para:getEle,selRowCol:null});
                    }

                }
            }
        });
        blog.selectors.map(sel=>{
            const rows=JSON.parse(sel.rows) as rowType[];
            rows.map(row=>{
                row.cols.map(col=>{
                    col.elements.map(ele=>{
                        if(ele && ele.name==="p"){
                            const getEle=document.querySelector(`${ele.name}#${ele.eleId}`) as HTMLElement;
                            if(getEle){
                                const check=([...getEle.classList as any] as string[]).includes("isActive");
                                if(check){
                                    const getSelRowCol=this._modSelector.dataset.getIdValue({target:getEle,idValues,id:"selRowCol"})
                                    if(getSelRowCol){
                                        const selRowCol=JSON.parse(getSelRowCol.attValue);
                                        arr.push({para:getEle,selRowCol});
                                    }else{
                                        arr.push({para:getEle,selRowCol:null});
                                    }
                                }
            
                            }
                        }
                    });
                });
            });
        });
        return arr;
    };

    static cleanPara(para:HTMLParagraphElement):HTMLParagraphElement|undefined{
        
        if(!para)return;
        let text:string="";
        text=para.textContent || "";
        if(text !==""){
           para.textContent=text;
        }
        return para;
    };
    
    
}



export default Sidebar;
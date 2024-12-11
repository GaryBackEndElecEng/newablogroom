import {flexType,elementType,iconType,selectorType, blogType, navLinkBtnType} from "./Types";
import Header from "./header";
import ModSelector from "./modSelector";
import {FaFont,FaBold,FaItalic,FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight, FaQuoteLeft, FaTable, FaPalette, FaParagraph, FaFileImage, FaColumns, FaPaperclip, FaCalendar,FaFonticons,FaCrosshairs,FaHome,FaBlog, FaSign, FaComment, FaArrowCircleDown} from "react-icons/fa";
import { TbLineHeight } from "react-icons/tb";
import { BiBorderOuter } from "react-icons/bi";
import { BsShadows } from "react-icons/bs";
import {FaCreate,FaBtn} from "@/components/common/ReactIcons";
import { IconType } from "react-icons";
import {MouseOver} from "@/components/common/MouseOver";
import DisplayBlog from "@/components/blog/displayBlog";
import { buttonReturn } from "../common/tsFunctions";
import Footer from "@/components/editor/footer";
import Edit from "@/components/editor/edit";
import Service from "@/components/common/services";
import CustomHeader from "./customHeader";
import User from "../user/userMain";
import Flexbox from "./flexBox";
import HtmlElement from "./htmlElement";
import Misc, { mediaQueryType } from "../common/misc";
import MainHeader from '@/components/nav/mainHeader';
import Nav from "../nav/headerNav";
import AuthService from "../common/auth";
import Profile from "../profile/profile";
import { getErrorMessage } from "@/lib/errorBoundaries";
import ShapeOutside from "./shapeOutside";
import RegSignIn from "../nav/regSignin";
import NavArrow from "../nav/arrow";
import NewCode from "./newCode";


class MainSetup{

    bgColor:string;
    btnColor:string;

    constructor(private _modSelector:ModSelector,private _service:Service){
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;

    }
    newBlogSetup(parent:HTMLElement):{form:HTMLFormElement,container:HTMLElement}{
        parent.classList.add("position-relative");
        const padWidth = window.innerWidth < 900 ? 1 :4;
        const formWidth=window.innerWidth < 900 ? "90%":"65%";
        const container=document.createElement("section");
        container.style.cssText="margin:auto;width:100%;height:50vh;background:white;display:flex;flex-direction:column;color:black;position:absolute;top:0;z-index:2000;";
        container.className="d-flex flex-column align-items-center";
        container.id="newBlogSetup";
        const title=document.createElement("h4");
        title.className="display-4 text-primary";
        title.textContent="new Blog";
        const text=document.createElement("p");
        text.textContent=`enter a file name and description. Don't worry you can modify the description to better position your blog.This description will be at the top of your pdf to better serve your target.`;
        text.style.cssText=`margin-inline:2rem;padding-inline:${padWidth}rem;align-text:center;`;
        container.appendChild(title);
        container.appendChild(text);
        const form=document.createElement("form");
        form.style.cssText=`display:flex;flex-direction:column;align-items:center;gap-:2rem;align-items:center;justify-content:flex-start;width:${formWidth};position:relative;padding-inline:2rem;margin-block:2rem;`;
        const grpForm=document.createElement("div");
        grpForm.className="form-group w-100";
        grpForm.style.cssText="width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center; gap-1;margin-inline:auto;";
        const grpForm1=document.createElement("div");
        grpForm1.className="form-group w-100";
        grpForm1.style.cssText="width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center; gap-1;margin-inline:auto;";
        const label=document.createElement("label");
        label.textContent="filename";
        const input=document.createElement("input");
        input.style.cssText="width:95%;"
        input.name="filename";
        input.className="form-control";
        input.type="text";
        input.id="filename";
        label.setAttribute("for",input.id);
        const {input:tinput,label:tlabel,formGrp:titleGrp}=Nav.inputComponent(form);
        titleGrp.style.cssText="margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;"
        tinput.id="title";
        tinput.name="title";
        tinput.placeholder="blog title";
        tlabel.textContent="title";
        tlabel.setAttribute("for",tinput.id);
        grpForm.appendChild(label);
        grpForm.appendChild(input);
        const labelDesc=document.createElement("label");
        labelDesc.textContent="description";
        const textarea=document.createElement("textarea");
        textarea.style.cssText="width:95%;";
        textarea.className="form-control";
        textarea.rows=4;
        // textarea.cols=150;
        textarea.name="desc";
        grpForm1.appendChild(labelDesc);
        grpForm1.appendChild(textarea);
        form.appendChild(grpForm);
        form.appendChild(grpForm1);
        const divCont=document.createElement("div");
        divCont.style.cssText="display:flex;justify-content:center;align-items:center;margin-inline:auto;gap:1.5rem;";
        const cancel=buttonReturn({parent:divCont,text:"cancel",bg:"#0804f9",color:"white",type:"button"});
        const btn=buttonReturn({parent:divCont,text:"cancel",bg:"#0804f9",color:"white",type:"button"});
        btn.type="submit";
        btn.textContent="submit";
        btn.className="btn btn-sm text-light bg-primary";
        btn.style.cssText="margin-block:2rem; padding-inline:1rem;padding-block:0.5rem;border-radius:20px";
        form.appendChild(divCont);
        container.appendChild(form);
        parent.appendChild(container);
        cancel.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:container,xpos:25,ypos:150,time:400});
                setTimeout(()=>{parent.removeChild(container)},398);
            }
        };
        form.animate([
            {transform:"translateY(-100%) scale(0.2)"},
            {transform:"translateY(0%) scale(1)"}
        ],{duration:700,iterations:1});
        return {form,container}
    }
   
}


class  Main  {
    //------INITIALIZE--------////
    _regSignin:RegSignIn;
    mainSetup:MainSetup;
    _edit:Edit;
    _flex:flexType;
    bgColor:string;
    btnColor:string;
    _displayBlog:DisplayBlog;
    _header:Header;
   _selected:boolean;
   _header_:selectorType|undefined;
   _footer_:selectorType|undefined;
  static mainInjection:HTMLElement;
    static topMain:HTMLElement | null;
    static _mainHeader:HTMLElement | null;
   static _mainFooter:HTMLElement | null;
   static textarea:HTMLElement | null;
    static container:HTMLElement | null;
    static show:boolean;
    static main_css:string;
    static main_class:string;
    //------INITIALIZE--------////
   
 static colArr=[{name:"select",value:"noColumns"},{name:"remove",value:"noColumns"},{name:"two",value:"columns"},{name:"three",value:"columns-3"},{name:"four",value:"columns-4"}]

    static icons: iconType[] = [
        {id:"1",attr:true, name: "fontSize", display: "f-size", class_: "fa fa-font",faIcon:FaFont, isIcon: true, isElement: false },
        {id:"2",attr:true, name: "bold", display: "Bold", class_: "fa fa-bold",faIcon:FaBold, isIcon: true, isElement: false },
        {id:"3",attr:true, name: "italic", display: "Italic", class_: "fa fa-italic",faIcon:FaItalic, isIcon: true, isElement: false },
        {id:"4",attr:true, name: "underline", display: "Underline", class_: "fa fa-underline",faIcon:FaUnderline, isIcon: true, isElement: false },
        {id:"5",attr:true, name: "left-align", display: "Left align", class_: "fa fa-align-left",faIcon:FaAlignLeft, isIcon: true, isElement: false },
        {id:"6",attr:true, name: "center-align", display: "Center align", class_: "fa fa-align-center",faIcon:FaAlignCenter, isIcon: true, isElement: false },
        {id:"7",attr:true, name: "right-align", display: "Right align", class_: "fa fa-align-right",faIcon:FaAlignRight, isIcon: true, isElement: false },
        {id:"8",attr:false, name: "blockquote", display: "Quote", class_: "fa-solid fa-quote-left",faIcon:FaQuoteLeft, isIcon: true, isElement: false },
        {id:"9",attr:true, name: "capitalize", display: "Capitalize", class_: "fa fa-font",faIcon:FaFont, isIcon: true, isElement: false },
        {id:"10",attr:false, name: "list", display: "List", class_: "fa-solid fa-table-list",faIcon:FaTable, isIcon: true, isElement: false },
        {id:"11",attr:false, name: "color", display: "Color", class_: "fa-solid fa-palette",faIcon:FaPalette, isIcon: true, isElement: false },
        {id:"12",attr:false, name: "p", display: "paragraph", class_: "fa fa-paragraph",faIcon:FaParagraph, isIcon: true, isElement: true },
        {id:"13",attr:false, name: "img", display: "image", class_: "far fa-file-image",faIcon:FaFileImage, isIcon: true, isElement: true },
        {id:"14",attr:false, name: "bg-shade", display: "bg-shade", class_: "fa-file-image",faIcon:BsShadows, isIcon: true, isElement: true },
        {id:"15",attr:true, name: "box-shadow-md", display: "shadow", class_: "tb-shadow",faIcon:BiBorderOuter, isIcon: true, isElement: false },
        {id:"16",attr:false, name: "line-height", display: "line-height", class_: "line-height",faIcon:TbLineHeight, isIcon: true, isElement: true },
        {id:"17",attr:false, name: "h1", display: "Title", class_: "H1", isIcon: false, isElement: true },
        {id:"18",attr:false, name: "h2", display: "h2-title", class_: "H2", isIcon: false, isElement: true },
        {id:"19",attr:false, name: "h3", display: "h3-title", class_: "H3", isIcon: false, isElement: true },
        {id:"20",attr:false, name: "h4", display: "h4-title", class_: "H4", isIcon: false, isElement: true },
        {id:"21",attr:false, name: "h5", display: "h5-title", class_: "H5", isIcon: false, isElement: true },
        {id:"22",attr:false, name: "h6", display: "h6-title", class_: "H6", isIcon: false, isElement: true },
        {id:"23",attr:false, name: "SH", display: "img-text-merge", class_: "SH", isIcon: false, isElement: true },
        {id:"24",attr:true, name: "columns", display: "2-columns", class_: "fa-solid fa-columns",faIcon:FaColumns, isIcon: true, isElement: false },
        {id:"25",attr:false, name: "a", display: "link", class_: "fa-solid fa-paperclip",faIcon:FaPaperclip, isIcon: true, isElement: false },
        {id:"26",attr:false, name: "time", display: "date", class_: "fa-regular fa-calendar-days",faIcon:FaCalendar, isIcon: true, isElement: false },
        {id:"27",attr:false, name: "font-family", display: "Font-Family", class_: "fa fa-fonticons",faIcon:FaFonticons, isIcon: true, isElement: false },
        {id:"28",attr:false, name: "show", display: "show work", class_: "show", isIcon: false, isElement: false },
        {id:"29",attr:false, name: "final", display: "show final", class_: "final", isIcon: false, isElement: false },
    ];
    constructor(private _modSelector:ModSelector,private _service:Service,mainInject:HTMLElement,public edit:Edit,private _user:User,private _flexbox:Flexbox,private _htmlElement:HtmlElement,private _footer:Footer,header:Header,public customHeader:CustomHeader,displayBlog:DisplayBlog,public shapeOutside:ShapeOutside,private _navArrow:NavArrow ) {
        this._regSignin=new RegSignIn(this._modSelector,this._service,this._user);
        Main.mainInjection=mainInject;
        this._displayBlog=displayBlog;
        this._selected=false;
        this._modSelector._selectors=[];
        this._modSelector._elements=[];
        this._modSelector._selectCodes=[];
        this._flex={} as flexType;
        Main.container=document.querySelector("section#main");
        Main.textarea=document.querySelector("div#textarea");
        Main._mainHeader=document.querySelector("section#sectionHeader");
        Main._mainFooter=document.querySelector("footer#mainFooter");
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this._edit=edit
        this._header=header;
        this.mainSetup= new MainSetup(this._modSelector,this._service);
        Main.main_css=ModSelector.main_css + "width:100%";
        Main.main_class=ModSelector.main_class;
    }
    //--------------SETTER GETTERS----------////////
    get status(){
        return this._modSelector.status
    }
    get element(){
        return this._modSelector.element
    }
    set element(element:elementType){
        this._modSelector.element=element;
    }
    get elements(){
        return this._modSelector.elements
    }
    set elements(elements:elementType[]){
        this._modSelector.elements=elements;
        
    }
    get selector(){
        return this._modSelector.selector;
    }
    set selector(selector:selectorType){
        this._modSelector.selector=selector;
    }
    get selectors(){
        return this._modSelector.selectors;
    }
    set selectors(selectors:selectorType[]){
        this._modSelector.selectors=selectors;
    }
    get placement(){
        const getPlace=localStorage.getItem("placement");
        if(getPlace){
            return parseInt(getPlace)
        }else{
            return 1;
        }
    }
    set placement(placement:number){
        localStorage.setItem("placement",JSON.stringify(placement))
    }
   
    
    

    //--------------SETTER GETTERS----------////////
    //MAIN INJECTOR-HEADER////

    //MAIN INJECTOR-HEADER////
    ////- MAIN INJECTOR-----//////////////////////////
   async newBlog(item:{parent:HTMLElement,func:()=>Promise<void>|void}):Promise<void>{
        const {parent,func}=item;
        parent.style.position="relative";
        const {form,container} =this.mainSetup.newBlogSetup(parent);
        container.id="newBlogSetup";
        form.addEventListener("submit",(e:SubmitEvent) => {
            if(e){
                e.preventDefault();
                const user=this._user.user;
                this._modSelector.blogInitializer(user);
                const checkUser=(user && user.id && user.email) ? true:false;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const filename=formdata.get("filename") as string;
                const desc=formdata.get("desc") as string;
                const title=formdata.get("title") as string;
                
                //ADDING USER_ID TO NEW BLOG IF EXIST!!
                if(checkUser){
                    this._modSelector.blog={...this._modSelector.blog,name:filename,title:title,desc:desc,user_id:user.id,eleId:parent.id};
                    const blog=this._modSelector.blog;
                    this._service.newBlog(blog).then(async(blog_)=>{
                        if(blog_ && blog_.user_id){
                            this._modSelector.blog={...blog,id:blog_.id,class:Main.main_class,cssText:Main.main_css,eleId:parent.id}
                            this._service.promsaveItems(this._modSelector._blog).then(async(_blog_)=>{
                                if(_blog_){
                                    const max_=ModSelector.maxCount(_blog_);
                                    localStorage.setItem("placement",String(max_+1));
                                    func();
                                    Misc.message({parent,msg:"created",type_:"success",time:400})
                                    Misc.fadeOut({anchor:container,xpos:50,ypos:100,time:400});
                                    setTimeout(()=>{
                                        Header.cleanUpByID(parent,"newBlogSetup");
                                    },380);
                                }
                            });
                        }
                    }).catch((err)=>{
                        const msg=getErrorMessage(err);
                        Misc.message({parent,msg:msg,type_:"error",time:500});
                        setTimeout(()=>{parent.removeChild(container);},380);
                    });
                }else{
                    this._modSelector.blog={...this._modSelector.blog,name:filename,title:title,desc:desc,cssText:Main.main_css,class:Main.main_class,eleId:parent.id};
                    const _blog_=this._modSelector.blog;
                    this._service.promsaveItems(_blog_).then(async(resBlog)=>{
                        if(resBlog){
                            const max_=ModSelector.maxCount(resBlog);
                            localStorage.setItem("placement",String(max_+1));
                        }
                    });
                    Misc.message({parent,msg:"created",type_:"success",time:400});
                    setTimeout(()=>{
                        ([...parent.children as any] as HTMLElement[]).map(child=>{
                            if(child && child.id==="newBlogSetup"){
                                parent.removeChild(child);
                            }
                        });

                    },380);
                    this._regSignin.signIn();///signing in
                }
                Main.cleanUp(Main.textarea as HTMLElement);
                Main.cleanUp(Main._mainHeader as HTMLElement);
                Main.cleanUp(Main._mainFooter as HTMLElement);
                
           

            }
        });
    }
    //INJECTION POINT////////////////
   async mainContainer(parent: HTMLElement|null):Promise<void> {
        if (parent) {
            Main.cleanUp(parent);
            Main.btnInitialize();
            Main.topMain=document.createElement("article");
            Main.topMain.className="top-main";
            Main.topMain.id=`topMain-blog-${this._modSelector.blog.id}`
            Main.topMain.style.cssText="margin:0px;padding:0px;position:relative;display:flex;flex-direction:column;justify-content:flex-start;width:100%;background-color:white;border-radius:15px;"
             //----------------- Iphone adjustments---------------//
        const mediaTopMain390:mediaQueryType={
            target:Main.topMain,
            css_max_attribute:{"max-width":"370px","height":"auto","width":"100%","font-size":"10px"},
            css_min_attribute:{"max-width":`auto`,"height":"auto","width":"100%","font-size":"auto"},
            minWidth:400,
            maxWidth:400
        }
        Misc.mediaQuery(mediaTopMain390)
        //----------------- Iphone adjustments---------------//
            parent.style.backgroundColor=this.bgColor;
            parent.style.paddingBottom="1rem";
            parent.style.marginBottom="1px;"
            Main.container = document.createElement("section");
            Main.container.id=`main`;
            Main.container.className = Main.main_class;
            Main.container.style.cssText = Main.main_css;
            Main.container.style.width="100% !important";
            Main.container.style.position="relative";
            this._modSelector._blog.class=Main.container.className;
            this._modSelector._blog.cssText=Main.container.style.cssText;
            this._modSelector._blog.eleId=Main.container.id;
            const mediaMain390:mediaQueryType={
                target:Main.container,
                css_max_attribute:{"max-width":"370px","height":"auto","width":"100%","font-size":"12px"},
                css_min_attribute:{"max-width":`auto`,"height":"auto","width":"100%","font-size":"auto"},
                minWidth:400,
                maxWidth:400
            }
            Misc.mediaQuery(mediaMain390)
            //----------------- Iphone adjustments---------------//
            const bottomMain=document.createElement("section");
            bottomMain.id="bottomMain";
            bottomMain.style.cssText="margin-inline:auto;width:100%;min-height:5vh;display:flex;flex-direction:column;align-items:center;"
            this.mainBtn(Main.topMain);
            this.header(Main.container);
            this.textArea(Main.container);
            Main.topMain.appendChild(Main.container);
            Main.container.style.width="100% !important";
            Main.container.classList.add("w-100");
            parent.appendChild(Main.topMain);
            Main.container.appendChild(bottomMain);
            this.footer(bottomMain);
            this.mainBtnChoices(bottomMain);
            this.hideShowBottom({mainBottom:bottomMain,time:500})
            Main.container.animate([
                {transform:"scale(0.2)"},
                {transform:"scale(1)"},
            ],{duration:1000,iterations:1});
            if(Main.container){
           await this.localBlogLoad(Main.container);
             Main.container.style.width="100% !important";
            
            }
        } else {
            alert("no parent")
        }
    }
    ////- MAIN INJECTOR ABOVE ----///////////////////////////
    //INITIALIZED

    ////- MAIN INJECTOR ABOVE ----///////////////////////////
    //INITIALIZED
    mainBtn(parent: HTMLElement | null):void {
        if(!parent)return;
        Main.cleanUp(parent)
        Main.textarea=document.querySelector("div#textarea");
        const row = document.createElement("div");
        row.className = "row d-flex flex-wrap justify-content-center group-btn bg-dark";
        row.id="main-group-btn";
        row.style.cssText="padding-inline:5px;border-radius:10px;background:black;margin-inline:0px;width:100%;";
        row.style.backgroundColor=this.bgColor;
        
        //----------------- Iphone adjustments---------------//
        const mediaBtnRow390:mediaQueryType={
            target:row,
            css_max_attribute:{"max-width":"370px","height":"auto","width":"100%","flex-wrap":"wrap","font-size":"10px"},
            css_min_attribute:{"max-width":``,"height":"auto","width":"100%","font-size":"auto"},
            minWidth:400,
            maxWidth:400
        }
        Misc.mediaQuery(mediaBtnRow390)
        //----------------- Iphone adjustments---------------//
        //nitialize btns
        Main.btnInitialize();
        Main.icons.forEach((icon) => {
            const btn = document.createElement("button");
            btn.id = icon.name;
            btn.setAttribute("data-id",`${btn.id}`);
            btn.setAttribute("data-name-icon-id",`${icon.name}-${icon.id}`);
            btn.setAttribute("is-button","true");
            btn.className = "btn  text-white col position-relative btnHover";
            btn.style.cssText = "padding-inline:3px;padding-block:1px;border-radius:0px;";
            btn.setAttribute("data-btnName", icon.display);
            
            if (icon.isIcon) {
                
                if(icon.faIcon as IconType){
                        if( btn.id !=="fontSize"){

                            const icontype=icon.faIcon;
                            FaCreate({parent:btn,name:icontype,cssStyle:{background:"inherit"}});
                            btn.style.color="white";

                        }else if( btn.id ==="fontSize"){
                            btn.classList.add("flexRow");
                            btn.style.color="white";
                            const input=document.createElement("input");
                            input.id=`${icon.name}-input`;
                            input.className="input-fontSize";
                            input.type="number";
                            input.min="12";
                            input.max="142";
                            input.style.cssText="font-size:12px;align-text:center;";
                            btn.appendChild(input);
                            // const icontype=icon.faIcon;
                            // FaCreate({parent:btn,name:icontype,cssStyle:{background:"inherit"}});
                            input.addEventListener("change",(e:Event)=>{
                                if(!e) return
                                const num=(e.currentTarget as HTMLInputElement).value;
                                this.fontSize(parseInt(num));
                            
                            });
                            
                        }
                }else{
                    
                    const iico = document.createElement("i");
                    iico.className = icon.class_;
                    iico.setAttribute("aria-hidden", "true");
                    iico.setAttribute("icon",JSON.stringify(icon.faIcon));
                    iico.style.cssText = "color:white;";
                    btn.appendChild(iico);
                    
                }
            
            } else {
                btn.textContent = icon.name;
            }
            row.appendChild(btn);
            switch(true){
                case icon.attr:
                    btn.setAttribute("is-attr",`${icon.attr}`);
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            // this._flexbox.setBtnAttributes(btn,icon);
                            this._htmlElement.fontAction(btn);
                            this._flexbox.fontAction(btn);
                            this._footer.footerAttributes(btn);
                            btn.classList.add("attribute");
                            if(icon.name==="SH"){
                            const target=document.querySelector("div#textarea") as HTMLElement;
                            this.shapeOutside.setShapeOutside(target,btn)
                            }else if(btn.id ==="columns"){
                                this._htmlElement.selectColumns(row,btn);
                            }
                           
                        }
                    });
                break;
                case icon.isElement:
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            this.addElement(btn,icon);
                            // console.log("287:mainBtn():addElement() elements",this.elements)
                        }
                    });
                break;
                
                case icon.name==="list":
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            this._htmlElement.selectUltype(row,btn,icon);
                        }
                    });
                break;
                case icon.name==="blockquote":
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            btn.classList.add(icon.display);
                            this._htmlElement.createQuote(null,btn,icon);
                        }
                    });
                break;
                case icon.name==="a":
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            btn.classList.add(icon.display);
                            this._htmlElement.createAnchor(Main.textarea as HTMLElement,btn,icon);
                        }
                    });
                break;
                case icon.name==="font-family":
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            this.fontFamily(row,btn);
                        }
                    });
                break;
                case icon.name==="color":
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            this.getColor(row,btn);
                        }
                    });
                break;
                case icon.name==="time":
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            this._htmlElement.insertDateTime(Main.textarea as HTMLElement,btn,icon);
                        }
                    });
                break;
                case icon.name==="show":
                    Main.show=false;
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            
                            const sectionMain=document.querySelector("section#main") as HTMLElement;
                            btn.classList.toggle("showOn");
                            const check=([...btn.classList as any] as string[]).includes("showOn");
                            if(check) {
                                Main.show=true;
                                btn.style.borderRadius="10px"
                            }else{
                                Main.show=false;
                                btn.style.borderRadius="0px";
                            };
                            // console.log("Main.show",Main.show)//works
                            if(sectionMain){
                            this._displayBlog.cleanAttributes(sectionMain,Main.show);
                            }
                        }
                    });
                break;
                case icon.name==="final":
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            btn.classList.toggle("showFinal");
                            const isBlog=this._modSelector.blog; 
                            const checkBlog=isBlog && (isBlog.elements || isBlog.selectors || isBlog.codes || isBlog.charts) ? true :false;
                            if(checkBlog){

                            Main.container=document.querySelector("section#main") as HTMLElement;
                            if( Main.container){
                            this._displayBlog.showFinal(Main.container,isBlog);
                            }

                            }else{
                                this.noBlogMsg(btn);
                            }
                        }
                    });
                break;
                default:
                    return;
            }
        });
        parent?.appendChild(row);
        Main.initMainBtns(); //clears active btns

    }
    //INJECTION
    header(parent:HTMLElement){
        Header.cleanUpByID(parent,"sectionHeader");
        parent.style.position="relative";
        Main._mainHeader=document.createElement("section");
        Main._mainHeader.id="sectionHeader";
        Main._mainHeader.style.zIndex="";
        Main._mainHeader.setAttribute("name","section-header");
        Main._mainHeader.className=ModSelector.mainHeader_class;
        Main._mainHeader.style.cssText=ModSelector.mainHeader_css;
         // ADD INSERT HEADER FROM EDIT
        // ADD INSERT HEADER FROM EDIT
        parent.appendChild(Main._mainHeader)
    }
    //INJECTION
    textArea(parent: HTMLElement):void {
       //INSERT SELECTORS/ELEMENTS FROM EDIT
       const less900=window.innerWidth < 900;
       const less400=window.innerWidth < 400;
       Header.cleanUpByID(parent,"textarea");
       parent.style.position="relative";
       const cssTextarea="margin-inline:auto;padding-inline:1rem;padding-block:1.5rem;margin-block:1rem;border:1px solid lightgrey; border-radius:4px;width:100%;height:110vh;box-shadow:1px 1px 4px 1px grey;overflow-y:scroll;display:block;position:relative;padding-block;1rem;padding-bottom:2rem;";
       
        Main.textarea = document.createElement("div");
        Main.textarea.setAttribute("contenteditable", "false");
        Main.textarea.style.cssText = cssTextarea;
        Main.textarea.style.paddingInline=less900 ? (less400 ? "0.25rem":"0.5rem"):"1rem";
        Main.textarea.style.width = "100%";
        Main.textarea.id=`textarea`;
        //ADD WORK DONE _edit.selEleGenerator(Main.textarea,blog)
        //ADD WORK DONE

        parent.appendChild(Main.textarea);
        (Main.container as HTMLElement).style.width="100% !important";
    }
    footer(parent:HTMLElement){
        Header.cleanUpByID(parent,"mainFooter");
        parent.style.position="relative";
        Main._mainFooter=document.createElement("footer");
        Main._mainFooter.id="mainFooter";
        Main._mainFooter.className=ModSelector.mainFooter_class;
        Main._mainFooter.style.cssText=ModSelector.mainFooter_css;
         // ADD INSERT HEADER FROM EDIT
        // ADD INSERT HEADER FROM EDIT
        parent.appendChild(Main._mainFooter)
    }
    
    //PARENT mainContainer()-?????????
    mainBtnChoices(parent:HTMLElement){
        MainHeader.header=document.querySelector("header#navHeader") as HTMLElement;
        if(MainHeader.header){
            const container=document.createElement("div");
            container.id="mainBtnChoices";
            container.style.cssText="border-radius:20px;background-color:white;color:black;margin-inline:20px;padding-inline:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;width:fit-content;";
            const btnGrp=document.createElement("div");
            btnGrp.className="btn-group-mainBtnChoices";
            btnGrp.style.cssText="display:flex;justify-content:space-between;align-items:center;margin-block:2rem;margin-inline:auto;flex-wrap:wrap;";
            container.appendChild(btnGrp);
            // console.log("containe",container);
            const checkSignedIn=(this._user.user && this._user.user.id) ? true: false;
            const btnArray:navLinkBtnType[]=[
                {id:0,name:"home",color:"#0a2351",link:"/",func:()=>undefined,icon:FaHome,show:true,isEditor:false,save:()=>null},
                {id:1,name:"blogs",color:"#0a2351",link:"/blogs",func:()=>undefined,icon:FaBlog,show:true,isEditor:false,save:()=>null},
                {id:2,name:"signin",color:"#0a2351",link:null,func:async()=>{await this._regSignin.signIn()},icon:FaSign,show:!checkSignedIn,isEditor:false,save:()=>null},
                {id:3,name:"logout",color:"#0a2351",link:null,func:()=>{this._navArrow.logout({func:()=>undefined,redirect:true})},icon:FaSign,show:checkSignedIn,isEditor:false,save:()=>null},
                {id:4,name:"contact",color:"#0a2351",link:null,func:()=>{this._navArrow.contact(MainHeader.header as HTMLElement)},icon:FaComment,show:true,isEditor:false,save:()=>null},
    
            ]
            const loggedIn=(this.status==="authenticated")
            btnArray.filter(item=>(item.show)).forEach((action,index)=>{
            if(action.name !=="logout"){

                const btn=document.createElement("button");
                btn.id=`main-btn-${index}`;
                btn.className="btn btn-sm text-primary";
                btn.style.cssText="display:flex;justify-content:space-between;align-items:center;border-radius:6px;padding-inline:1.25rem;padding-block:0.75rem;gap:0.5rem;";
                btn.style.color=action.color;
                const span=document.createElement("span");
                const text=document.createElement("small");
                text.textContent=action.name;//display NAME
                FaBtn({parent:span,icon:action.icon,cssStyle:{background:"inherit",color:"black"}});
                btn.appendChild(span);
                btn.appendChild(text);
                btnGrp.appendChild(btn);
                btn.onclick=(e:MouseEvent)=>{
                    if(e){
                        e.preventDefault();
                        if(typeof window !=="undefined"){
                            const url=new URL(window.location.href);
                            if(action.link){
                                const newUrl=new URL(action.link,url.origin);
                                window.location.href=newUrl.href;
                            }
                            action.func();
                            
                        }
                    }
                };
                btn.onmouseover=(e:MouseEvent)=>{
                    if(e){
                        btn.style.backgroundColor="black";
                        btn.style.color="white";
                        span.style.backgroundColor="white";
                        span.style.color="blue";
                        btn.style.transition="all 1s ease-in-out";
                    }
                };
                btn.onmouseout=(e:MouseEvent)=>{
                    if(e){
                        btn.style.backgroundColor="inherit";
                        btn.style.color="inherit";
                        span.style.backgroundColor="inherit";
                        span.style.color="inherit";
                        btn.style.transition="all 0.5s ease-in-out";
                    }
                };
                
               
                parent.appendChild(container);
            };
            });
        };
           
       
    }
    hideShowBottom(item:{mainBottom:HTMLElement,time:number}){
        const {mainBottom,time}=item;
        mainBottom.style.position="relative";
        const arrowPopup=document.createElement("div");
        const bottomHeight=window.getComputedStyle(mainBottom).getPropertyValue("height");
        arrowPopup.id="arrowPopup";
        arrowPopup.style.cssText="position:absolute;width:26px;background-color:black;aspect-ratio:1 /1;border-radius:50%;filter:drop-shadow(0 0 0.5rem blue);display:flex;justify-content:center;align-items:center;";
        arrowPopup.style.top="0%";
        arrowPopup.style.right="0%";
        arrowPopup.style.transform="translate(20px,-20px)";
        FaCreate({parent:arrowPopup,name:FaArrowCircleDown,cssStyle:{color:"white",bordRadius:"50%",fontSize:"20px"}});
        mainBottom.appendChild(arrowPopup);
        arrowPopup.onclick=(e:MouseEvent)=>{
            if(e){
                arrowPopup.classList.toggle("activate");
               const check= ([...arrowPopup.classList as any] as string[]).includes("activate");
               this.activateBottom({mainBottom,mainBotHeight:bottomHeight,time,check});
               if(check){
                    arrowPopup.style.transform="rotate(180deg)";
                    arrowPopup.style.color="red";
                   arrowPopup.animate([
                       {transform:"rotate(0deg)",color:"white"},
                       {transform:"rotate(180deg)",color:"red"},
                   ],{duration:time,iterations:1,"easing":"ease-in-out"});
               }else{
                arrowPopup.style.transform="rotate(0deg)";
                arrowPopup.style.color="white";
                arrowPopup.animate([
                    {transform:"rotate(180deg)",color:"red"},
                    {transform:"rotate(0deg)",color:"white"},
                ],{duration:time,iterations:1,"easing":"ease-in-out"});
               }
            }
        };
    }
    activateBottom(item:{mainBottom:HTMLElement,mainBotHeight:string,check:boolean,time:number}){
        const {mainBottom,mainBotHeight,check,time}=item;
        console.log("bottom height",mainBotHeight)
        if(check){
            mainBottom.style.height="5px";
            mainBottom.style.minHeight="0px";
           
            mainBottom.animate([
                {height:"auto",minHeight:mainBotHeight},
                {height:"15px",minHeight:"5px"},
            ],{duration:time,iterations:1});
            ([...mainBottom.children as any] as HTMLElement[]).map(child=>{
                if(child && child.id!=="arrowPopup"){
                    child.style.opacity="0";
                }
            });
        }else{
            mainBottom.style.minHeight=mainBotHeight;
            mainBottom.style.height="auto";
            
            mainBottom.animate([
                {height:"15px",opacity:"0",minHeight:"0px"},
                {height:"auto",minHeight:mainBotHeight,opacity:"1"},
            ],{duration:time,iterations:1});
            ([...mainBottom.children as any] as HTMLElement[]).map(child=>{
                if(child){
                    child.style.opacity="1";
                }
            });
        }
    }
    //ADD ELEMENT FROM TOOLBAR ANND ADD FONT-KEEP HERE
    addElement(btn:HTMLButtonElement,icon:iconType):void {
       
        Main.textarea=document.querySelector("div#textarea");
        if(Main.textarea){
            if(icon.name ==="img"){
                
                btn.classList.add(icon.display)
                this._htmlElement.addImage(Main.textarea as HTMLElement,btn,icon);
                
            }else if(icon.name==="bg-shade"){
               
                this._htmlElement.bgShade(Main.textarea,btn);
            }else if(icon.name==="SH"){
                this.shapeOutside.shapeOutsideCircle({parent:Main.textarea,flex:null})
            }else if(icon.name==="line-height"){
                this.lineHeight(Main.textarea,btn);
            }else{
                this._htmlElement.appElement( Main.textarea,btn, icon);
               
            }
            
        }
    }
    
    //PARENT MAINBTN()- KEEP
    fontSize(num:number){
        const isActives=document.querySelectorAll("[is-element='true'].isActive") as any as HTMLElement[];
        if(isActives){
            [...isActives].forEach((activeEle)=>{
                if(activeEle){
                    const activeThis=activeEle as HTMLElement;
                    activeThis.style.fontSize=`${num}px`;
                    Main.addAttributeToChildren(activeThis,{"font-size":`${num}px`});
                    this._modSelector.addAttribute(activeEle,"font-size",`${num}px`);
                    this._modSelector.updateElement(activeThis);//does both selector and elements
                    // this._modSelector.editElement(activeThis);//does both
                }
            });
        }
    }
   
    fontFamily(parent:HTMLElement,btnClicked:HTMLButtonElement){
        Main.textarea=document.querySelector("div#textarea");
        const container=document.querySelector("section#main") as HTMLElement;
        btnClicked.classList.add("active");
        // const textarea=document.querySelector("div#textarea");
        const select=document.createElement("select");
        select.setAttribute("isPopup","true");
        select.className="select-font";
        Misc.font_family.forEach((fam)=>{
            const option=document.createElement("option");
            option.value=fam.value;
            option.textContent=fam.name;
            select.appendChild(option);
        });
            parent.appendChild(select);//parent=row group-btn
            select.addEventListener("change",(e:Event)=>{
                if(!e) return
                const value=(e.currentTarget as HTMLSelectElement).value;
                if(!Main.textarea) return;
                const arr=Main.getActives();
                if(arr && arr.length>0){
                    arr.forEach(item=>{
                        if(!item.isActive) return;
                        const arr:string[]=item.item.style.cssText.split(";");
                        arr.push(`font-family:${value};`)
                        item.item.style.cssText=arr.join(";");
                        Main.addAttributeToChildren(item.item,{"font-family":value});
                        // this._modSelector.addAttribute(item.item,"font-family",value);
                        this._modSelector.updateElement(item.item);
                        item.item.style.fontFamily=value;
                        
                    });
                }else{
                    (Main.textarea as HTMLElement).style.fontFamily=value;
                    parent.removeChild(select);
                    btnClicked.classList.remove("active");
                    container.style.fontFamily=value;
                    const blog=this._modSelector._blog;
                    const cssArr=blog.cssText?.split(";");
                    if(!cssArr) return;
                    cssArr.filter(cl=>(!cl.includes("font-family")));
                    cssArr.push(`font-family:${value}`);
                    blog.cssText=cssArr.join(";").trim();
                    this._modSelector.blog={...blog};
                }
                const getSelects=document.querySelectorAll("select.select-font");
                if(getSelects){
                    getSelects.forEach(el=>{
                        const par=el.parentElement;
                        if(el && par){
                            par.removeChild(el);

                        }
                    });
                }
    
            });

    }
    //MULTI-PURPOSE
    addRemoveIsActive(){
        Main.textarea=document.querySelector("div#textarea");
        const children=Main.textarea ? ([...Main.textarea.children as any] as HTMLElement[]) : null;
        if(children){
            children.forEach((child)=>{
                // const check=[...(child as HTMLElement).classList].includes("btnHover");
                
                    // console.log("child",child)
                    child.addEventListener("click",(e:Event)=>{
                        if(e){
                            (child as HTMLElement).classList.add("position-relative");
                            (child as HTMLElement).classList.toggle("isActive");
                        }
                    });
                
            });  
        }
    }
    //PARENT MAINBTN()-KEEP
    getColor(parent:HTMLElement,btnClicked:HTMLButtonElement){
        const isActives=document.querySelectorAll("[is-element='true'].isActive") as any as HTMLElement[];
        btnClicked.classList.add("active");
        const palContainer=document.createElement("div");
        palContainer.className="flexCol palcontainer";
        palContainer.style.cssText="top:100%;width:auto;position:absolute;box-shadow:1px 1px 10px 2px grey;border-radius:10px;z-index:100;";
        const input=document.createElement("input") as HTMLInputElement;
        input.type="color";
        palContainer.appendChild(input);
        parent.appendChild(palContainer);
        parent.classList.add("position-relative");
        input.addEventListener("change",(e:Event)=>{
            if(e){
                const color=(e.currentTarget as HTMLInputElement).value;
                [...isActives].forEach(ele=>{
                    if(ele){
                        ele.style.color=color;
                        this._modSelector.addAttribute(ele,"color",color);
                        this._modSelector.updateElement(ele);//updates on both selector and Element
                    }
                });

            }
            btnClicked.classList.remove("active");
            parent.removeChild(palContainer);
        });
    }

    //GENERAL-Flexbox
    removeMainElement(parent:HTMLElement,container:HTMLElement,target:HTMLElement,flex:flexType| null){
        const css="position:absolute;transform:translate(2px,-5px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;"
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("contenteditable","false");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.className="";
        if(flex){
        xIconDiv.style.cssText=`${css}top:-6px;left:0px;`;
        }else{
            xIconDiv.style.cssText=`${css}top:-6px;right:0px;`;
        }
        const cssStyle={background:"inherit",fontSize:"inherit"};
        FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
        container.appendChild(xIconDiv);
        xIconDiv.onmouseover=(e:MouseEvent) =>{
            if(e){
                MouseOver({parent:xIconDiv,msg:"remove item"});
            }
        };
        xIconDiv.onmouseout=(e:MouseEvent) =>{
            if(e){
                const span=xIconDiv.querySelector("span");
                if(!span) return;
                xIconDiv.removeChild(span);
            }
        };
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this._modSelector.promRemoveElement(target).then(async(res)=>{
                    if(res){
                        this._modSelector.shiftPlace(res.placement);
                    }
                });
                parent.removeChild(container);
                
                
                //resetting buttons
                Main.initMainBtns();
            }
        });
    }
    //IITIALIZE ALL BUTTONS!!NOTE NEED TO FIX THE LOGIC check=true(&& empty),check1=false when not true
    static initMainBtns():void{
        const maingroupBtn=document.getElementById("main-group-btn");
        if(maingroupBtn){
        ([...maingroupBtn.children as any] as HTMLElement[]).map(btn=>btn.classList.remove("active"));
        }
    }
    //INSERT element- delete
    mainAddelement(_ele:HTMLElement){
        const checkPlace=this.placement ===0 ? true:false;
        if(checkPlace) this.placement = this.placement + 1;
        
        
        if(_ele as HTMLElement ){
            let ele:elementType={} as elementType;
            const rand=Math.round(Math.random()*1000);
            const name=_ele.nodeName.toLowerCase();
            _ele.id=`${name}-${rand}`;
            _ele.setAttribute("name",name);
            _ele.setAttribute("is-element","true");
            ele={...ele,
                id:this.placement,
                placement:this.placement,
                eleId:_ele.id,
                name:name,
                selectorId:undefined,
                class:_ele.className,
                cssText:_ele.style.cssText,
            }
            if(name ==="img"){
                const img=_ele as HTMLImageElement;
                ele={...ele,
                    img:img.src,
                    inner_html:img.alt
                };
            }else{
                    ele={...ele,
                        inner_html:_ele.innerHTML

                    };
            };
            this._modSelector._elements.push(ele);
            this._modSelector.elements=this._modSelector._elements
        this.placement=this.placement + 1;
        this._modSelector.footerPlacement();//this shifts footer placement down
        };
    };
    //GENERAL for showFinal(blog)
    noBlogMsg(btn:HTMLButtonElement){
        btn.style.position="relative";
        const container=document.createElement("div");
        container.style.cssText="position:absolute;inset:100% 0% -250% -350%;background:white;z-index:100;";
        const para=document.createElement("p");
        para.style.cssText="padding:1rem;text-wrap:wrap;color:blue";
        para.textContent="This is for final view of your project.It includes header, body, grid and code and allows to PDF the report for download.";
        container.appendChild(para);
        btn.appendChild(container);
        container.animate([
            {transform:"translate(-50%,-100%)",opacity:"0.2"},
            {transform:"translate(0%,0%)",opacity:"1"},
        ],{duration:700,iterations:1});
        setTimeout(()=>{
            btn.removeChild(container);
        },5600);

    }
    //ADD ELEMENT NO SELECTOR-delete
    appendElement(target:HTMLElement){
       
        const len=this._modSelector._elements.length;
        const ele={
            id:len,
            eleId:target.id,
            name:target.nodeName.toLowerCase(),
            cssText:target.style.cssText,
            class:target.className,
            placement:this.placement,
            inner_html:target.innerHTML
        } as elementType
        this.placement=this.placement + 1;
        this.elements=[...this.elements,ele];
    }
    //REMOVE ELEMENT elementType
    removeElement(parent:HTMLElement,target:HTMLElement){
            target.style.position="relative";
            const css="position:absolute;transform:translate(2px,-5px);background:black;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;"
            const xIconDiv=document.createElement("span");
            xIconDiv.setAttribute("contenteditable","false");
            xIconDiv.setAttribute("is-icon","true");
            xIconDiv.className="";
            xIconDiv.id="xIconDiv";
            xIconDiv.style.cssText=`${css}top:-6px;right:0px;`;
            const cssStyle={background:"inherit",fontSize:"inherit"};
            FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
            target.after(xIconDiv);
            xIconDiv.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    const check=([...parent.children as any] as HTMLElement[]).map(ele=>{if(ele.id===target.id){return true}else{return false}}).includes(true);
                    if(check){
                        parent.removeChild(target);
                    }else{
                        parent.removeChild(target.parentElement as HTMLElement);
                        
                    }
                    this._modSelector.promRemoveElement(target).then(async(res)=>{
                        if(res){
                            this._modSelector.shiftPlace(res.placement);
                        }
                    });
                    
                }
            });
        
    }
    
    elementAttributeToggle(target:HTMLElement){
        const actives=document.querySelectorAll("[is-icon = 'true']");
        if(actives){
            const array=[...actives as any] as HTMLButtonElement[];
            array.forEach(activeEle=>{
                activeEle.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        target.classList.toggle(activeEle.id);
                    }
                });
            });
        } 
    }
    //THIS IS CRITICAL ON REFRESH: THIS UPLOADS THE STORAGE TO MAIN THROUGH EDIT
   async localBlogLoad(mainContainer:HTMLElement){
        /////------!!!NOTE::topParent child=Main.topMain-----//////
        
        const promise1= new Promise((resolve,reject)=>{
            resolve({
                retBlog:localStorage.getItem("blog"),
                user_id:localStorage.getItem("user_id"),
                email:localStorage.getItem("email"),
        });
            reject(()=>{console.log("error: did not get blog from local")})//ONLY GENERATES IF ERROR
        }) as Promise<{retBlog:string | null,user_id:string | null,email:string | null}>;
        promise1.then(async(value)=>{
            if(value && value.retBlog){
                const blogStr= value.retBlog.trim();
                const {parsed,isJSON}=Header.checkJson(blogStr)
                // console.log(parsed,"blogStr",blogStr)//works
                if(isJSON){
                    this._service.initializeBlog();
                    const blog_=parsed as blogType;
                    const placement=ModSelector.maxCount(blog_);
                    this._modSelector.blog={...blog_};
                    this._modSelector.placement=placement + 1;
                    localStorage.setItem("placement",String(placement + 1));
                    this._service.promsaveItems(this._modSelector._blog).then(async(_blog)=>{
                        if(_blog){
                            if(!_blog.cssText){
                                this._modSelector._blog.cssText=mainContainer.style.cssText + "width:100%;";
                            }else if(!_blog.class){
                                this._modSelector._blog.class=mainContainer.className;
                            }else if(!(_blog.cssText && _blog.cssText )){
                                mainContainer.style.cssText=_blog.cssText;
                                mainContainer.className=_blog.class;
                            }
                            this._modSelector._blog.eleId=mainContainer.id;
                           await this._edit.main(mainContainer,_blog);//sending it to viewport
                        }
                    });//saving it to modSelector
                    
                    
                }
                if(value.user_id){
                    this._user._user={...this._user._user,id:value.user_id};
                    if(!value.email) return;
                    this._user._user={...this._user._user,email:value.email};
                }
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
   
    lineHeight(parent:HTMLElement,btn:HTMLButtonElement){
        ShapeOutside.cleanUpByID(parent,"popup");
        btn.classList.add("active");
        const popup=document.createElement("div");
        popup.id="popup";
        popup.style.cssText="position:absolute;top:5%;left:30%;right:30%;block-size:fit-content;padding:0.5rem;display:flex;justify-content:center;align-items:center;box-shadow:1px 1px 12px 1px black;border-radius:16px;background-color:white;";
        const {input,label,formGrp}=Nav.inputComponent(popup);
        formGrp.style.display="flex";
        formGrp.style.flexDirection="column";
        formGrp.style.gap="1rem";
        formGrp.style.margin="auto";
        label.textContent="line-height";
        input.name="lineHeight";
        input.type="number";
        input.min="1";
        input.max="40";
        input.value="1";
        input.placeholder="";
        const okay=buttonReturn({parent:popup,text:"okay",bg:this.btnColor,color:"white",type:"button"});
        parent.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:500,cssStyle:{top:"50%",left:"10%",right:"10%"}});
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        input.oninput=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value;
                const getIsActives=document.querySelectorAll(".isActive");
                ([...getIsActives as any] as HTMLElement[]).map(active=>{
                    if(active){
                        active.style.lineHeight=`${value}px`;
                        this._modSelector.updateElement(active);
                    }
                });
            }
        };
        okay.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    popup.remove();
                },390);
                btn.classList.remove("active");
            }
        };


    }
    //THIS ADDS FLEX TO TARGET ID AND FLEX ATTRIBUTE
    testThis(){
        let blogs:blogType[]=[]
        
            
                fetch("http://localhost:3000/api/blog").then(async(res)=>{
                    if(res.ok){
                        blogs= await res.json();
                        console.log(blogs)
                        return blogs
                    }
                })
          
        
        return blogs
    }
    static hasBlog(){
        return new Promise(resolve=>{
            if(typeof window !=="undefined"){
                const getBlog:string|null=localStorage.getItem("blog");
                if(getBlog){
                    const blog=JSON.parse(getBlog) as blogType;
                    resolve(blog);

                }
            };
        }) as Promise<blogType|null>;
    }
   static flexTracker(target:HTMLElement,flex:flexType):flexType{
        const nodename=target.nodeName.toLowerCase();
        const rand=Math.round(Math.random()*1000);
        const {anchorContainer}=flex as flexType;
        const {order,shapeOutsideCircle,shapeOutsideSquare,shapeOutsidePolygon}=flex;
        const link=target.getAttribute("data-href");
        const email=target.getAttribute("data-href-email");
        const tel=target.getAttribute("data-href-tel");
        if(target as HTMLElement){
            flex.name=nodename;
            const ID=`${nodename}-${rand}`;
            flex={...flex,elementId:ID,name:nodename};
            target.id=ID;
            target.setAttribute("flex",JSON.stringify(flex));
            target.setAttribute("is-element","true");
            target.setAttribute("contenteditable","true");
            target.setAttribute("order",String(order));
            target.setAttribute("name",nodename);
            if(shapeOutsideCircle){
                target.setAttribute("data-shapeoutside-circle","true");
            }else if(shapeOutsideSquare){
                target.setAttribute("data-shapeoutside-square","true");
            }else if(shapeOutsidePolygon){
                target.setAttribute("data-shapeoutside-polygon","true");
            }else if(link){
                    target.setAttribute("data-href",anchorContainer as string);
            }else if(email){
                target.setAttribute("data-href-email",anchorContainer as string);
            }else if(tel){
                target.setAttribute("data-href-tel",anchorContainer as string);
            }else if(nodename==="img"){
                target.setAttribute("contenteditable","false");
            }
            
        }
        return flex;
    }
    static flexColTracker(target:HTMLElement,flex:flexType):flexType{
        const {order,backgroundImage}= flex;
        const name=target.nodeName.toLowerCase(); 
        const rand=`${name}-${Math.round(Math.random()*100)}`;
        target.id=`${rand}`;
        target.setAttribute("name",name);
        target.setAttribute("is-column","true");
        target.setAttribute("order",String(order));
        flex={...flex,colId:rand};
        if(backgroundImage){
            target.setAttribute("data-backgroundImage","true");
        }
        target.setAttribute("flex",JSON.stringify(flex));
        target.setAttribute("aria-selected","true");
        return flex;
    }
    static flexRowTracker(target:HTMLElement,flex:flexType):flexType{
        const {order,backgroundImage}=flex;
        const name=target.nodeName.toLowerCase(); 
        const rand=`${name}-${Math.round(Math.random()*100)}`;
        target.id=`${rand}`;
        target.setAttribute("name",name);
        target.setAttribute("is-row","true");
        target.setAttribute("order",String(order));
        target.setAttribute("aria-selected","true");
        if(backgroundImage){
            target.setAttribute("data-backgroundImage","true");
        }
        flex={...flex,rowId:rand};
        target.setAttribute("flex",JSON.stringify(flex));
        return flex;
    }
    static btnInitialize(){
        const mainBtns=document.querySelectorAll("[is-button='true']");
        const arrBtns=[...mainBtns as any] as HTMLButtonElement[];
        arrBtns.map(btn=>{
            if(btn){
                btn.classList.remove("active");
                
            }
        });

    }
    static removeIcon(target:HTMLElement):HTMLElement{
        const icons=target.getElementsByTagName("I");
        ([...icons as any] as HTMLElement[]).forEach(icon=>{
            if(icon){
                target.removeChild(icon);
            }
        });
        return target
    }
    static cleanUp(parent:HTMLElement){
        while(parent.firstChild){
            if(parent.lastChild){
            parent.removeChild(parent.lastChild);
            }
        }
    }
    static slateColors(){
        const shades=["#ffffff","#f3f5f5","#eaedee","#eaedee","#dde1e3","#dde1e3","#c6cdd1","#b4bdc2","#b4bdc2","#bdc5c9","#bdc5c9"];
        return shades
    }
    static removeLinks(target:HTMLElement){
        const isPara=target.nodeName==="P" ? true:false;
        if(isPara){
            const childs=([...target.children as any] as HTMLElement[]);
            if(childs && childs.length){
                childs.map(child=>{
                    if(child.nodeName==="LINK"){
                        target.removeChild(child);
                    }
                });
            }
        }
        return target;

    }
    static toggleActiveIcon(target:HTMLElement){
        const classArr=[...target.classList as any] as string[];
        const isActive=classArr.includes("isActive");
        Main.icons.map(icon=>{
            classArr.map(cl=>{
                if(cl===icon.name && isActive){
                    const getBtn=document.getElementById(icon.name);
                    if(getBtn){
                        getBtn.classList.toggle("active");
                    }
                }
            });
        });
    }
    static getActives():{isActive:boolean,item:HTMLElement}[]{
        const isActives=document.querySelectorAll("[is-element = 'true']");
        const arr:{isActive:boolean,item:HTMLElement}[]=[];
        if(isActives){
            const convert=[...isActives as any] as HTMLElement[];
            convert.map(is_active=>{
                const check=([...is_active.classList as any] as string[]).includes("isActive");
                if(check){
                    arr.push({isActive:true,item:is_active});
                }
            });
           
        }
        return arr;

    }
    static replaceBgImage(colcss: string, url: string): string {
        let cssArr = colcss.split(";");
        cssArr = cssArr.filter(cl => (!(cl.includes("background-image"))))
        cssArr.push(`backgroung-image:url${url}`);
        colcss = cssArr.join(";");
        return colcss;
    }
    static addAttributeToChildren(target:HTMLElement,attr:{[key:string]:string}){
        const key=Object.keys(attr)[0]
        const value=Object.values(attr)[0]
        const children=([...target.children as any] as HTMLElement[]);
        children.map(child=>{
            if(child){
                let css=child.style.cssText;
                const cssArr=css.split(";");
                cssArr.filter(cl=>(!cl.includes(key)));
                cssArr.push(`${key}:${value}`);
                css=cssArr.join(";");
                child.style.cssText=css;
            }
        });
    }
    
    

}
export const shades=["grey","none","#ffffff","#f3f5f5","#eaedee","#eaedee","#dde1e3","#dde1e3","#c6cdd1","#b4bdc2","#b4bdc2","#bdc5c9","#bdc5c9"];
export const blueShades=["blue","none","#E1EBEE","#72A0C1","#F0F8FF","#00FFFF","#7FFFD4","#6CB4EE","#0066b2","#B9D9EB","#00FFFF","#00CED1","#6082B6","#5D76A9","#AFEEEE"];
export default Main;
export const initMainBtns=Main.initMainBtns;
export const removeIcon=Main.removeIcon;
export const slateColors=Main.slateColors;
export const mainIcons=Main.icons;
export const flexTracker=Main.flexTracker;

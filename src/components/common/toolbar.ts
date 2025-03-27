
import { BiBorderOuter } from "react-icons/bi";
import { BsShadows,BsBoxFill } from "react-icons/bs";
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaBold, FaBoxOpen, FaCalendar, FaColumns, FaCrosshairs, FaFileImage, FaFont, FaFonticons, FaItalic, FaPalette, FaPaperclip, FaParagraph, FaQuoteLeft, FaTable, FaUnderline } from "react-icons/fa";
import { TbLineHeight } from "react-icons/tb";
import { blogType, iconType } from "../editor/Types";
import Main from "../editor/main";
import { FaCreate } from "./ReactIcons";
import Misc, { mediaQueryType } from "./misc";
import ModSelector from "../editor/modSelector";
import DisplayBlog from "../blog/displayBlog";
import Header from "../editor/header";
import { idValueType, selRowColType } from "@/lib/attributeTypes";
import { buttonReturn } from "./tsFunctions";
import ShapeOutside from "../editor/shapeOutside";
import Nav from "../nav/headerNav";
import HtmlElement from "../editor/htmlElement";
import Service from "./services";
import User from "../user/userMain";
import ChartJS from "../chart/chartJS";
import Message from "./message";




class Toolbar{
    public readonly btnColor:string=this._modSelector.btnColor;
    public readonly bgColor:string=this._modSelector._bgColor;
    public textarea:HTMLElement;
    public toolbar:HTMLElement;
    public mainCont:HTMLElement;
    public displayBlog:DisplayBlog;
    public chart:ChartJS;
    public message:Message;
    public shapeOutside:ShapeOutside;
    public openClose:boolean;
 public static readonly icons: iconType[] = [
        { id: "1", attr: true, name: "fontSize", display: "f-size", class_: "fa fa-font", faIcon: FaFont, isIcon: true, isElement: false },
        { id: "2", attr: true, name: "bold", display: "Bold", class_: "fa fa-bold", faIcon: FaBold, isIcon: true, isElement: false },
        { id: "3", attr: true, name: "italic", display: "Italic", class_: "fa fa-italic", faIcon: FaItalic, isIcon: true, isElement: false },
        { id: "4", attr: true, name: "underline", display: "Underline", class_: "fa fa-underline", faIcon: FaUnderline, isIcon: true, isElement: false },
        { id: "5", attr: true, name: "left-align", display: "Left align", class_: "fa fa-align-left", faIcon: FaAlignLeft, isIcon: true, isElement: false },
        { id: "6", attr: true, name: "center-align", display: "Center align", class_: "fa fa-align-center", faIcon: FaAlignCenter, isIcon: true, isElement: false },
        { id: "7", attr: true, name: "right-align", display: "Right align", class_: "fa fa-align-right", faIcon: FaAlignRight, isIcon: true, isElement: false },
        { id: "9", attr: true, name: "capitalize", display: "Capitalize", class_: "fa fa-font", faIcon: FaFont, isIcon: true, isElement: false },
        { id: "11", attr: true, name: "color", display: "Color", class_: "fa-solid fa-palette", faIcon: FaPalette, isIcon: true, isElement: false },
        { id: "14", attr: true, name: "bg-shade", display: "bg-shade", class_: "fa-file-image", faIcon: BsShadows, isIcon: true, isElement: false },
        { id: "15", attr: true, name: "box-shadow-md", display: "shadow", class_: "tb-shadow", faIcon: BiBorderOuter, isIcon: true, isElement: false },
        { id: "16", attr: true, name: "line-height", display: "line-height", class_: "line-height", faIcon: TbLineHeight, isIcon: true, isElement: false },
        
        { id: "10", attr: false, name: "ul", display: "List", class_: "fa-solid fa-table-list", faIcon: FaTable, isIcon: true, isElement: true },
        { id: "13", attr: false, name: "img", display: "add-image", class_: "far fa-file-image", faIcon: FaFileImage, isIcon: true, isElement: true },
        { id: "12", attr: false, name: "p", display: "paragraph", class_: "fa fa-paragraph", faIcon: FaParagraph, isIcon: true, isElement: true },
        { id: "17", attr: false, name: "h1", display: "Title", class_: "H1", isIcon: false, isElement: true },
        { id: "18", attr: false, name: "h2", display: "h2-title", class_: "H2", isIcon: false, isElement: true },
        { id: "19", attr: false, name: "h3", display: "h3-title", class_: "H3", isIcon: false, isElement: true },
        { id: "20", attr: false, name: "h4", display: "h4-title", class_: "H4", isIcon: false, isElement: true },
        { id: "21", attr: false, name: "h5", display: "h5-title", class_: "H5", isIcon: false, isElement: true },
        { id: "22", attr: false, name: "h6", display: "h6-title", class_: "H6", isIcon: false, isElement: true },
        { id: "25", attr: false, name: "a", display: "link", class_: "fa-solid fa-paperclip", faIcon: FaPaperclip, isIcon: true, isElement: true },
        { id: "26", attr: false, name: "time", display: "date", class_: "fa-regular fa-calendar-days", faIcon: FaCalendar, isIcon: true, isElement: true },
        { id: "8", attr: false, name: "blockquote", display: "Quote", class_: "fa-solid fa-quote-left", faIcon: FaQuoteLeft, isIcon: true, isElement: true },
        { id: "23", attr: false, name: "SH", display: "img-text-merge", class_: "SH", isIcon: false, isElement: true },

        { id: "24", attr: true, name: "columns", display: "2-columns", class_: "fa-solid fa-columns", faIcon: FaColumns, isIcon: true, isElement: false },
        { id: "27", attr: true, name: "font-family", display: "Font-Family", class_: "fa fa-fonticons", faIcon: FaFonticons, isIcon: true, isElement: false },
        { id: "28", attr: false, name: "show", display: "show work", class_: "show", isIcon: false, isElement: false },
        { id: "29", attr: false, name: "final", display: "show final", class_: "final", isIcon: false, isElement: false },
    ];
   
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private htmlElement:HtmlElement){
        this.openClose=false;
        this.btnColor=this._modSelector.btnColor;
        this.bgColor=this._modSelector._bgColor;
        this.shapeOutside=new ShapeOutside(this._modSelector,this._service,this._user);
        this.displayBlog=new DisplayBlog(this._modSelector,this._service,this._user,this._modSelector.blog,this.chart,this.message,this.htmlElement)

    };


     mainRowBtn({parent,mainContainer,textarea,blog}:{parent: HTMLElement | null,mainContainer:HTMLElement,textarea:HTMLElement,blog:blogType}): void {
        this.mainCont=mainContainer;
        this.textarea=textarea;
        const idValues=this._modSelector.dataset.idValues
        if (!parent) return;
        const less400=window.innerWidth < 400;
        const less900=window.innerWidth < 900;
        Header.cleanUpByID(parent,"main-group-btn");
        const row = document.createElement("div");
        row.setAttribute("aria-label","toolbar");
        row.setAttribute("role","toolbar");
        row.className = "btn-group";
        row.id = "main-group-btn";
        row.style.cssText = "display:inline-flex !important;flex-wrap:wrap;padding-inline:5px;border-radius:6px;background-color:rgb(4 97 66);margin-inline:0px;width:100%;height:26px;position:relative;";
        row.style.backgroundColor = this.bgColor;
        Main.mainRowBtns=row;
        parent?.appendChild(row);
        //----------------- Iphone adjustments---------------//
        const mediaBtnRow390: mediaQueryType = {
            target: row,
            css_max_attribute: { "max-width": "370px", "height": "auto", "width": "100%", "flex-wrap": "wrap", "font-size": "10px" },
            css_min_attribute: { "max-width": ``, "height": "auto", "width": "100%", "font-size": "auto" },
            minWidth: 400,
            maxWidth: 400
        }
        Misc.mediaQuery(mediaBtnRow390)
        //----------------- Iphone adjustments---------------//
        //nitialize btns
        Main.btnInitialize();
        //{ id: "1", attr: true, name: "fontSize", display: "f-size", class_: "fa fa-font", faIcon: FaFont, isIcon: true, isElement: false },
        Toolbar.icons.toSorted((a,b)=>{if(a.id<b.id) return -1;return 1}).forEach((icon) => {
            this.toolbarBtn({rowCol:row,icon,idValues,textarea,less400,less900,isRow:true,blog});
        });
        row.style.height="26px";
        Main.initMainBtns(); //clears active btns

    };



     mainColBtn({parent,mainContainer,textarea,blog}:{parent: HTMLElement | null,mainContainer:HTMLElement,textarea:HTMLElement,blog:blogType}): void {
        const time=600;
        const idValues=this._modSelector.dataset.idValues
        if (!parent) return;
        this.openClose=false;
        Header.cleanUpByID(textarea,"main-group-col-btn");
        const col = document.createElement("div");
        col.setAttribute("aria-label","toolbar");
        col.setAttribute("role","toolbar");
        col.className = "btn-group";
        col.id = "main-group-col-btn";
        col.style.cssText = "display:block;border-radius:6px;margin-inline:0px;width:40px;height:auto;position:absolute;top:30%;z-index:200;";
        col.style.left="0%"
        col.style.backgroundColor = this.bgColor;
        parent.appendChild(col);
        this.removePopup({parent,target:col});
        Main.btnInitialize();

        //{ id: "1", attr: true, name: "fontSize", display: "f-size", class_: "fa fa-font", faIcon: FaFont, isIcon: true, isElement: false },
        this.openCloseBtn({parent:col,idValues,textarea,openClose:this.openClose,time,blog});
        Main.initMainBtns(); //clears active btns
     

    };



    openCloseBtn({parent,idValues,textarea,openClose,time,blog}:{parent:HTMLElement,idValues:idValueType[],textarea:HTMLElement,openClose:boolean,time:number,blog:blogType}){
        this.openClose=openClose;
        //add button to open left(from-4%=>0%)
        this.openCloseBtnAction({parent}).then(async(res)=>{
            if(res){

                res.closeIcon.onclick=(e:MouseEvent)=>{
                    if(!e) return;
                    res.openIcon.hidden=false;
                    res.closeIcon.hidden=true;
                    this.openClose=false;
                 
                    this.showCloseToolbar({parent:res.parent,openClose:false,idValues,textarea,time,blog});
                };
                res.openIcon.onclick=(e:MouseEvent)=>{
                    if(!e) return;
                    res.openIcon.hidden=true;
                    res.closeIcon.hidden=false;
                    this.openClose=true;
                    this.showCloseToolbar({parent:res.parent,openClose:true,idValues,textarea,time,blog});
                };
            }
        });
        
    };


    openCloseBtnAction({parent}:{parent:HTMLElement}):Promise<{parent:HTMLElement,openIcon:HTMLElement,closeIcon:HTMLElement,btnContainer:HTMLElement}>{
        Header.cleanUpByID(parent,"openClose-btnContainer");
        const btnContainer=document.createElement("div");
        btnContainer.id="openClose-btnContainer";
        btnContainer.style.cssText="margin-inline:auto;margin-block:0;position:relative;";
        const openIcon=document.createElement("div");
        openIcon.id="openCloseBtn-open";
        openIcon.style.cssText="position:absolute;left:0%;top:0%;translate(-1px,-1px);padding:7px;background-color:black;color:white;z-index:100;border-radius:50%;";
        const closeIcon=document.createElement("div");
        closeIcon.id="openCloseBtn-close";
        closeIcon.style.cssText="position:absolute;left:0%;top:0%;translate(-1px,-1px);padding:7px;background-color:black;color:white;z-index:100;border-radius:50%;";
        FaCreate({parent:openIcon,name:FaBoxOpen,cssStyle:{background:"black",color:"white",borderRadius:"50%",zIndex:"100"}})
        FaCreate({parent:closeIcon,name:BsBoxFill,cssStyle:{background:"black",color:"white",borderRadius:"50%",zIndex:"100"}});
        btnContainer.appendChild(closeIcon);
        btnContainer.appendChild(openIcon);
        parent.appendChild(btnContainer);
        const getOpenIcon=btnContainer.querySelector("div#openCloseBtn-open") as HTMLElement;
        const getCloseIcon=btnContainer.querySelector("div#openCloseBtn-close") as HTMLElement;
        getOpenIcon.hidden=false;
        getCloseIcon.hidden=true;
        return Promise.resolve({parent,btnContainer,openIcon:getOpenIcon,closeIcon:getCloseIcon}) as Promise<{parent:HTMLElement,openIcon:HTMLElement,closeIcon:HTMLElement,btnContainer:HTMLElement}>;
    };
    

    showCloseToolbar({parent,openClose,idValues,textarea,time,blog}:{parent:HTMLElement,openClose:boolean,idValues:idValueType[],textarea:HTMLElement,time:number,blog:blogType}){
        const less400= window.innerWidth <400;
        const less900= window.innerWidth <900;
        const check=([...parent.children as any] as HTMLElement[]).find(ch=>(ch.id==="showCloseToolbar-icons-container"));
        parent.style.position="relative;"
        const colCont=document.createElement("div");
        colCont.id="showCloseToolbar-icons-container";
        colCont.style.cssText="position:absolute;top:0%;left:0%;display:block;width:30px;height:auto;";
        if(!check){
            parent.appendChild(colCont);
            Toolbar.icons.toSorted((a,b)=>{if(a.id<b.id) return -1;return 1}).forEach((icon) => {
                this.toolbarBtn({rowCol:colCont,icon,idValues,textarea,less400,less900,isRow:false,blog});
            });
            colCont.style.transform="translate(0%,10%)";
            colCont.style.opacity="1";
            colCont.animate([
                {transform:"translate(-100%,0%)",opacity:"0"},
                {transform:"translate(0%,10%)",opacity:"1"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
        }else{
            const getColCont=parent.querySelector("div#showCloseToolbar-icons-container") as HTMLElement;
            if(openClose===true){
                getColCont.style.transform="translate(0%,10%)";
                getColCont.style.opacity="1";
                getColCont.animate([
                    {transform:"translate(-100%,0%)",opacity:"0"},
                    {transform:"translate(0%,10%)",opacity:"1"},
                ],{duration:time,iterations:1,"easing":"ease-in-out"});
            }else{
                getColCont.style.transform="translate(-150%,0%)";
                getColCont.style.opacity="0";
                getColCont.animate([
                    {transform:"translate(0%,10%)",opacity:"1"},
                    {transform:"translate(-150%,0%)",opacity:"0"},
                ],{duration:time,iterations:1,"easing":"ease-in-out"});
            }
        }
    };



    toolbarBtn({rowCol,icon,idValues,textarea,less400,less900,isRow,blog}:{
        rowCol:HTMLElement,
        icon:iconType,
        idValues:idValueType[],
        textarea:HTMLElement,
        less400:boolean,
        less900:boolean,
        isRow:boolean,
        blog:blogType
        
    }){

        const node=icon.name
            const check=["h1","h2","h3","h4","h5","h6","fontSize"].includes(node)
            const btn = document.createElement("button");
            btn.id = icon.name;
            btn.setAttribute("data-id", `${btn.id}`);
            btn.setAttribute("data-name-icon-id", `${icon.name}-${icon.id}`);
            btn.setAttribute("is-button", "true");
            btn.setAttribute("type", "button");
            btn.className = "btn  text-white col position-relative";
            if(isRow){
                btn.classList.add("btnHover");
            }else{
                btn.classList.add("btnHover-col");
            }
            btn.style.cssText = "padding-inline:3px;padding-block:1px;border-radius:0px;color:white;background-color:black;";
            if(icon.isIcon && !check){
                const cssStyle={margin:"auto",alignSelf:"center",justifySelf:"center",zIndex:"2",color:"inherit",backgroundColor:"inherit"};
                FaCreate({ parent: btn, name: icon.faIcon, cssStyle:cssStyle});
               
            }else if(node==="fontSize"){
                this.initFontSize({btn,icon,idValues,isRow})
            }else{
                btn.textContent = icon.name;
            }
            btn.setAttribute("data-btnName", icon.display);
            rowCol.appendChild(btn)
            this.btnAction({row:rowCol,btn,icon,idValues,textarea,less400,less900,isRow,blog})
    };


    btnAction({row,btn,icon,idValues,textarea,less400,less900,isRow,blog}:{
        row:HTMLElement,
        btn:HTMLButtonElement,
        icon:iconType,
        idValues:idValueType[],
        textarea:HTMLElement,
        less400:boolean,
        less900:boolean,
        isRow:boolean,
        blog:blogType

    }){
       
        const {attr,isElement}=icon;
        switch (true) {
            case attr:
                btn.setAttribute("is-attr", `${icon.attr}`);
                btn.addEventListener("click", (e: MouseEvent) => {
                    if (e) {

                        btn.classList.add("attribute");
                        if (icon.name === "SH") {
                            const target = document.querySelector("div#textarea") as HTMLElement;
                            this.shapeOutside.setShapeOutside(target, btn)
                        } else if (icon.name=== "columns") {
                            this.selectColumns({parent:row, btnClk:btn,idValues,isRow});
                        }else if(icon.name==="font-family"){
                            this.fontFamily({parent:row, btnClicked:btn,idValues,isRow});
                        }else if(icon.name==="color"){
                            
                            this.getColor(row, btn,idValues,isRow);
                        }else if(icon.name==="bg-shade"){
                            this.bgShade({parent:row,btn,idValues,selRowCol:null,isRow})
                        }else if(icon.name==="line-height"){
                            Main.textarea = document.querySelector("div#textarea") as HTMLElement;
                            this.lineHeight(textarea,btn,idValues,isRow);
                        }else{
                            //THIS CONTROLS ALL NONFLEX AND FLEX ELEMENTS
                            this.fontAction(btn,idValues);
                            //THIS CONTROLS ALL NONFLEX AND FLEX ELEMENTS
                        };

                    }
                });
                break;
            case isElement:
                btn.addEventListener("click", (e: MouseEvent) => {
                    if (e) {
                        btn.classList.add(icon.display)
                        this.htmlElement.fromMain({
                            parent:textarea,
                            btn,
                            icon,
                            idValues
                        });
                       
                    }
                });
                break;
            case icon.name==="line-height":
                btn.addEventListener("click", (e: MouseEvent) => {
                    if (e) {
                        this.lineHeight(textarea,btn,idValues,isRow)
                       
                    }
                });
                break;
            case icon.name === "show":
               
                btn.addEventListener("click", (e: MouseEvent) => {
                    if (e) {

                        const sectionMain = document.querySelector("section#main") as HTMLElement;
                        btn.classList.toggle("showOn");
                        const check = ([...btn.classList as any] as string[]).includes("showOn");
                        if(sectionMain){

                            if (check) {
                               
                                btn.style.border = "1px solid red";
                                this.cleanAttributes(sectionMain, true);
                            } else {
                               
                                btn.style.border= "none";
                                this.cleanAttributes(sectionMain, false);
                            };
                        }
                     
                      
                    }
                });
                break;
            case icon.name === "final":
                btn.addEventListener("click", (e: MouseEvent) => {
                    if (e) {
                        
                        this.showFinale({
                            mainContainer:textarea,
                            btn,
                            blog:blog,
                            idValues,
                            less400,
                            less900,
                            func:({showOn})=>{
                               this.cleanAttributes(textarea,showOn)
                            }
                        })
                    }
                });
                break;
            default:
                return;
        }
    };


     showFinale({mainContainer
        ,
        btn,
        blog,
        idValues,
        less400,
        less900,
        func
     }:{
            mainContainer:HTMLElement,
            btn:HTMLButtonElement,
            blog:blogType,
            idValues:idValueType[],
            less400:boolean,
            less900:boolean,
            func:({showOn}:{showOn:boolean})=>Promise<void>|void,
    
        }){
            btn.classList.toggle("showFinal");
            this._modSelector.loadFromLocal().then(async(res)=>{
                const getBlog=res.getBlog();
                const {blog}=getBlog;
                if(blog){
                    const maxCount=ModSelector.maxCount(blog)
                    if (maxCount>0) {
                        this.cleanAttributes(mainContainer,true);
                        mainContainer.style.position="relative";
                        this.displayBlog.showFinal({
                            parent:mainContainer,
                             blog:blog,
                            idValues,
                            less400,
                            less900
                        }).then(async(res)=>{
                            if(res){
                                const showOn=false
                                btn.classList.toggle("showFinal");
                                func({showOn})
                            }
                        });
                    } else {
                        this.noBlogMsg(btn);
                    };
                }
            });
    };


    
    async fontAction(btn:HTMLButtonElement,idValues:idValueType[]){
        //THIS IS THE MAIN CONTROLLER FOR ALL NONFLEX AND FLEX ITEMS
        const isActives=(Main.container as HTMLElement).querySelectorAll("[data-is-element='true']");
        // console.log("isActives",[...isActives])
        if(isActives){
           await Promise.all([...isActives as any as HTMLElement[]].map(async(activeEle)=>{
               const getSelRowCol=activeEle.getAttribute("data-sel-row-col");
               const {isJSON,parsed}=getSelRowCol ? Header.checkJson(getSelRowCol):{isJSON:false,parsed:null};
                if(activeEle?.classList.contains("isActive")){
                    activeEle.classList.toggle(btn.id);
                    if(isJSON){
                        const selRowCol=parsed as selRowColType;
                        await this._modSelector.updateElement({target:activeEle,idValues,selRowCol});
                    }else{
                        await this._modSelector.updateElement({target:activeEle,idValues,selRowCol:null});
                    }
                   
                }
            }));
        }
    };

    
    bgShade({parent,btn,idValues,selRowCol,isRow}:{parent:HTMLElement,btn:HTMLButtonElement,idValues:idValueType[],selRowCol:selRowColType|null,isRow:boolean}){
        const css_row="display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap;gap:0;z-index:200;align-items:center;justify-content:center";
        const direction=window.innerWidth < 600 ? "column":"row" ;
        btn.style.position="relative";
        btn.classList.add("active");
        //show drop-down on shade selection
        const popup=document.createElement("div");
        if(isRow){
            popup.style.cssText=`position:absolute;border-radius:5px;box-shadow:1px 1px 10px 1px #bdc5c9;display:flex;flex-direction:${direction};width:200px;height:40px;z-index:200;padding:1rem;top:0%;transform:translate(75%,15%);background-color:white;justify-content:center;align-items:center;`;
           
        }else{
            popup.style.cssText=css_row +"position:absolute;top:20%;left:200%;width:fit-content;padding-inline:10px;padding-block:0.5rem;height:auto;backdrop-filter:blur(20px);fontSize:12px;background-color:#00000069;";

        };
        popup.style.position="absolute";
        popup.setAttribute("is-popup","true");
        popup.id="popup";
        const selectBlue=document.createElement("select");
        selectBlue.style.cssText="border-radius:15px;font-size:10px;";
        selectBlue.className="box-shadow";
        Misc.blue_shades.forEach((shade,index)=>{
            const option=document.createElement("option");
            option.value=shade;
            if(index===0) option.textContent=shade;
            option.style.cssText=`font-size:9px;background-color:${shade};`;
            option.textContent=shade;
            selectBlue.appendChild(option);
        });
        popup.appendChild(selectBlue);
        
        selectBlue.addEventListener("change",(e:Event)=>{
            if(e){
                const getActives=document.querySelectorAll("[is-element=true].isActive");
                const value=(e.currentTarget as HTMLSelectElement).value as string;
                
                if(getActives){
                    ([...getActives as any] as HTMLElement[]).forEach((activeEle)=>{
                        
                            if(activeEle){
                                
                                activeEle.style.backgroundColor=value;
                                this._modSelector.updateElement({target:activeEle,idValues,selRowCol});//updates on both selector and Element
                            }
                            
                    });
                };
                btn.classList.remove("active");
                Header.cleanUpByID(parent,popup.id);

                
            }
        });
        const select1=document.createElement("select");
        select1.style.cssText="border-radius:15px;font-size:10px;";
        select1.className="box-shadow";
        Misc.shades.forEach((shade,index)=>{
            const option=document.createElement("option");
            option.value=shade;
            if(index===0) option.textContent=shade;
            option.style.cssText=`font-size:9px;background-color:${shade};`;
            option.textContent=shade;
            select1.appendChild(option);
        });
        popup.appendChild(select1);
        this.removePopup({parent,target:popup});
        parent.appendChild(popup);
        if(isRow){
            Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        }else{
            Misc.slideIn({anchor:popup,xpos:100,ypos:0,time:400});
        }
        select1.addEventListener("change",(e:Event)=>{
            if(e){
                const getActives=document.querySelectorAll("[is-element=true].isActive");
                const value=(e.currentTarget as HTMLSelectElement).value as string;
                btn.classList.remove("active");
                const check=(getActives && getActives.length>0);
                
                if(check){
                    ([...getActives as any] as HTMLElement[]).forEach((activeEle)=>{
                        
                            if(activeEle){
                                activeEle.style.backgroundColor=value;
                                this._modSelector.updateElement({target:activeEle,idValues,selRowCol});//updates on both selector and Element
                            }
                            
                    });
                };
                btn.classList.remove("active");
                Header.cleanUpByID(parent,popup.id);
                
            }
        });
        
        //then remove "active" on btn
    };


    lineHeight(parent: HTMLElement, btn: HTMLButtonElement,idValues:idValueType[],isRow:boolean) {
        ShapeOutside.cleanUpByID(parent, "popup");
        btn.classList.add("active");
        const css_col="display:flex;flex-direction:column;align-items:center;gap:0;z-index:200;";
        parent.style.position="relative";
        const popup = document.createElement("div");
        popup.id="select-line-height-popup";
        
        if(isRow){
            popup.style.cssText = "position:absolute;top:5%;left:30%;right:30%;block-size:fit-content;padding:0.5rem;display:flex;justify-content:center;align-items:center;box-shadow:1px 1px 12px 1px black;border-radius:16px;background-color:white;";
        }else{
            popup.style.cssText=css_col +"position:absolute;top:50%;left:5%;width:170px;height:auto;backdrop-filter:blur(20px);fontSize:12px;padding-inline:1rem;padding-block:0.5rem;";
        };
        popup.style.position="absolute";
        const small=document.createElement("small");
        small.id="title";
        small.textContent="select columns";
        small.className="text-center text-primary";
        const { input, label, formGrp } = Nav.inputComponent(popup);
        formGrp.style.display = "flex";
        formGrp.style.flexDirection = "column";
        formGrp.style.gap = "1rem";
        formGrp.style.margin = "auto";
        label.textContent = "line-height";
        input.name = "lineHeight";
        input.type = "number";
        input.min = "1";
        input.max = "40";
        input.value = "1";
        input.placeholder = "";
        const okay = buttonReturn({ parent: popup, text: "okay", bg: this.btnColor, color: "white", type: "button" });
        parent.appendChild(popup);
        this.removePopup({parent,target:popup});
        if(isRow){
            Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        }else{
            Misc.slideIn({anchor:popup,xpos:100,ypos:0,time:400});
        }
        Misc.matchMedia({ parent: popup, maxWidth: 500, cssStyle: { top: "50%", left: "10%", right: "10%" } });
        Misc.growIn({ anchor: popup, scale: 0, opacity: 0, time: 400 });
        input.oninput = async(e: Event) => {
            if (e) {
                const value = (e.currentTarget as HTMLInputElement).value;
                const getIsActives = document.querySelectorAll(".isActive");
                ([...getIsActives as any] as HTMLElement[]).forEach(async(active) => {
                    if (active) {
                        active.style.lineHeight = `${value}px`;
                        await this._modSelector.updateElement({target:active,idValues,selRowCol:null});
                    }
                });
            }
        };
        okay.onclick = (e: MouseEvent) => {
            if (e) {
                Misc.growOut({ anchor: popup, scale: 0, opacity: 0, time: 400 });
                setTimeout(() => {
                    popup.remove();
                }, 390);
                btn.classList.remove("active");
            }
        };


    };


    selectColumns({parent,btnClk,idValues,isRow}:{parent:HTMLElement,btnClk:HTMLButtonElement,idValues:idValueType[],isRow:boolean}){
        
        btnClk.classList.add("active");
        parent.style.position="relative";
        const css_col="display:flex;flex-direction:column;align-items:center;gap:0;z-index:200;";
        const popup=document.createElement("div");
        popup.id="select-columns-popup";
        if(isRow){
            popup.style.cssText=css_col +"position:absolute;top:0%;left:50%;width:150px;height:auto;backdrop-filter:blur(20px);fontSize:12px;background-color:rgb(255 255 255 / 6%);";
        }else{
            popup.style.cssText=css_col +"position:absolute;top:50%;left:120%;width:150px;height:auto;backdrop-filter:blur(20px);fontSize:12px;background-color:rgb(255 255 255 / 6%);";
        };
        const small=document.createElement("small");
        small.id="title";
        small.textContent="select columns";
        small.className="text-center text-primary";

        const select=document.createElement("select") as HTMLSelectElement;
        select.style.cssText=css_col + "width:100%;margin-inline:auto;color:black;background-color:white;";
        popup.appendChild(small);
        popup.appendChild(select);
        const isActives=document.querySelectorAll("[is-element='true'].isActive");
        Main.colArr.forEach((op)=>{
            const option=document.createElement("option") as HTMLOptionElement;
            option.value=op.value;
            option.textContent=op.name;
            select.appendChild(option);
        });
        parent.appendChild(popup);
        this.removePopup({parent,target:popup});
        if(isRow){
            Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        }else{
            Misc.slideIn({anchor:popup,xpos:100,ypos:0,time:400});
        }
        select.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                
                ([...isActives as any] as HTMLElement[]).forEach((ele)=>{
                    if(ele){
                        Main.colArr.forEach(col=>(ele.classList.remove(col.value)));
                        if(value!=="noColumns"){
                            const getSelRowCol=this._modSelector.dataset.getIdValue({target:ele,idValues,id:"selRowCol"});
                            const {isJSON,parsed}=getSelRowCol ? Header.checkJson(getSelRowCol.attValue) :{isJSON:false,parsed:null};
                            ele.classList.toggle(value);
                            const selRowCol=isJSON ? parsed as selRowColType:null
                            this._modSelector.addAttribute({target:ele,type:"class",attr:value,idValues,selRowCol});
                        }
                        
                    }
                });
                parent.removeChild(popup);
                btnClk.classList.remove("active");
                
            }
        });
    };

    
    //PARENT MAINBTN()- KEEP
    fontSize(num: number,idValues:idValueType[]) {
        const isActives = document.querySelectorAll("[is-element='true'].isActive") as any as HTMLElement[];
        if (isActives) {
            [...isActives].forEach(async(activeEle) => {
                if (activeEle) {
                    const getSelRowCol=this._modSelector.dataset.getIdValue({target:activeEle,idValues,id:"selRowCol"});
                    const {isJSON,parsed}=getSelRowCol ? Header.checkJson(getSelRowCol.attValue) :{isJSON:false,parsed:null};
                    const activeThis = activeEle as HTMLElement;
                    activeThis.style.fontSize = `${num}px`;
                    Main.addAttributeToChildren(activeThis, { "font-size": `${num}px` });
                    const selRowCol=isJSON ? parsed as selRowColType:null;
                    this._modSelector.addAttribute({target:activeEle,type:"font-size",attr: `${num}px`,idValues,selRowCol});
                   await this._modSelector.updateElement({target:activeThis,idValues,selRowCol:null});//does both selector and elements
                   
                }
            });
        }
    };

    fontFamily({parent,btnClicked,idValues,isRow}:{parent: HTMLElement, btnClicked: HTMLButtonElement,idValues:idValueType[],isRow:boolean}) {
        const css_col="display:flex;flex-direction:column;align-items:center;gap:0;z-index:200;";
            Main.textarea = document.querySelector("div#textarea");
            const container = document.querySelector("section#main") as HTMLElement;
            btnClicked.classList.add("active");
            const popup=document.createElement("div");
            popup.id="select-fonts-popup";
            if(isRow){
                popup.style.cssText=css_col +"position:absolute;top:0%;left:55%;width:150px;height:auto;backdrop-filter:blur(20px);fontSize:12px;";
            }else{
                popup.style.cssText=css_col +"position:absolute;top:55%;left:120%;width:150px;height:auto;backdrop-filter:blur(20px);fontSize:12px;";
            };
            const small=document.createElement("small");
            small.id="title";
            small.textContent="select Font";
            small.className="text-center text-primary";
            const select = document.createElement("select");
            select.setAttribute("isPopup", "true");
            select.className = "select-font";
            Misc.font_family.forEach((fam) => {
                const option = document.createElement("option");
                option.value = fam.value;
                option.textContent = fam.name;
                select.appendChild(option);
            });
            popup.appendChild(small);
            popup.appendChild(select);
            parent.appendChild(popup);
            this.removePopup({parent,target:popup});
            if(isRow){
                Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
            }else{
                Misc.slideIn({anchor:popup,xpos:100,ypos:0,time:400});
            }
            select.addEventListener("change", (e: Event) => {
                if (!e) return
                const value = (e.currentTarget as HTMLSelectElement).value;
                if (!Main.textarea) return;
                const arr = Main.getActives();
                if (arr && arr.length > 0) {
                    arr.forEach(async(item) => {
                        if (!item.isActive) return;
                        const getSelRowCol=this._modSelector.dataset.getIdValue({target:item.item,idValues,id:"selRowCol"});
                        const {isJSON,parsed}=getSelRowCol ? Header.checkJson(getSelRowCol.attValue) :{isJSON:false,parsed:null};
                        const arr: string[] = item.item.style.cssText.split(";");
                        arr.push(`font-family:${value};`)
                        item.item.style.cssText = arr.join(";");
                        Main.addAttributeToChildren(item.item, { "font-family": value });
                        const selRowCol= isJSON ? parsed as selRowColType:null;
                        await this._modSelector.updateElement({target:item.item,idValues,selRowCol});
                        item.item.style.fontFamily = value;
    
                    });
                } else {
                    (Main.textarea as HTMLElement).style.fontFamily = value;
                    btnClicked.classList.remove("active");
                    container.style.fontFamily = value;
                    const blog = this._modSelector.blog;
                    const cssArr = blog.cssText?.split(";");
                    if (!cssArr) return;
                    const cleanFonts= cssArr.filter(cl => (!cl.includes("font-family")));
                    cleanFonts.push(`font-family:${value}`);
                    blog.cssText = cssArr.join(";").trim();
                    this._modSelector.blog = { ...blog };
                }
                Header.cleanUpByID(parent,"select-fonts-popup");
    
            });
    
        };


    getColor(parent: HTMLElement, btnClicked: HTMLButtonElement,idValues:idValueType[],isRow:boolean) {
        const css_col="display:flex;flex-direction:column;align-items:center;gap:0;z-index:200;";
        parent.style.zIndex="0";
        const isActives = document.querySelectorAll("[is-element='true'].isActive") as any as HTMLElement[];
        btnClicked.classList.add("active");
        const popup=document.createElement("div");
        popup.id="select-colors-popup";
        if(isRow){
            popup.style.cssText=css_col +"position:absolute;top:0%;left:15%;width:150px;height:auto;backdrop-filter:blur(20px);fontSize:12px;";
        }else{
            popup.style.cssText=css_col +"position:absolute;top:10%;left:120%;width:150px;height:auto;backdrop-filter:blur(20px);fontSize:12px;";
        };
        const small=document.createElement("small");
        small.id="title";
        small.textContent="select Font";
        small.className="text-center text-primary";
       
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "color";
        popup.appendChild(small);
        popup.appendChild(input);
        parent.appendChild(popup);
            if(isRow){
                Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
            }else{
                Misc.slideIn({anchor:popup,xpos:100,ypos:0,time:400});
            }
        this.removePopup({parent,target:popup});
        parent.classList.add("position-relative");
        input.addEventListener("change", async(e: Event) => {
            if (e) {
                const color = (e.currentTarget as HTMLInputElement).value;
                [...isActives].forEach(async(ele) => {
                    if (ele) {
                        const getSelRowCol=this._modSelector.dataset.getAttribute({target:ele,id:"selRowCol"});
                        ele.style.color = color;
                        if(getSelRowCol){
                            const selRowCol=JSON.parse(getSelRowCol) as selRowColType;
                            this._modSelector.addAttribute({target:ele,type: "color",attr:color,idValues,selRowCol});
                            await this._modSelector.updateElement({target:ele,idValues,selRowCol});//updates on both selector and Element
                            
                        }else{
                            await this._modSelector.updateElement({target:ele,idValues,selRowCol:null});//updates on both selector and Element
                        }
                    }
                });

                btnClicked.classList.remove("active");
                parent.removeChild(popup);
            }
        });
    };
    

    //FONT-SIZE
        initFontSize({btn,icon,idValues,isRow}:{btn:HTMLButtonElement,icon:iconType,idValues:idValueType[],isRow:boolean}){
        btn.classList.add("flexRow");
        btn.style.color = "white";
        const input = document.createElement("input");
        input.id="fontSize";
        input.style.width="36px";
        input.id = `${icon.name}-input`;
        input.className = "input-fontSize";
        input.type = "number";
        input.min = "12";
        input.max = "142";
        input.style.cssText = "align-text:center;";
        btn.appendChild(input);
        input.addEventListener("change", (e: Event) => {
            if (!e) return
            const num = (e.currentTarget as HTMLInputElement).value;

            this.fontSize(parseInt(num),idValues);

        });
    };

    removePopup({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        const popup=document.createElement("popup");
        
        popup.id="remove-popup";
        popup.className="remove-popup";
        popup.style.cssText="position:absolute;top:0%;right:0%;transform:translate(0px,-20px);z-index:200;aspect-ratio:1/1;border-radius:50%;background-color:black;color:white;cursor:pointer;display:flex;justify-content:center;align-items:center;padding:3px;";
        FaCreate({parent:popup,name:FaCrosshairs,cssStyle:{borderRadius:"50%",fontSize:"14px",color:"white"}});
        target.appendChild(popup);
        popup.onclick=(e:MouseEvent)=>{
            if(!e) return;
            Misc.growOut({anchor:target,scale:0,opacity:0,time:400});
            setTimeout(()=>{
                parent.removeChild(target);
            },390);
        };
    };

    noBlogMsg(btn: HTMLButtonElement) {
        btn.style.position = "relative";
        const container = document.createElement("div");
        container.style.cssText = "position:absolute;inset:100% 0% -250% -350%;background:white;z-index:100;";
        const para = document.createElement("p");
        para.style.cssText = "padding:1rem;text-wrap:wrap;color:blue";
        para.textContent = "This is for final view of your project.It includes header, body, grid and code and allows to PDF the report for download.";
        container.appendChild(para);
        btn.appendChild(container);
        container.animate([
            { transform: "translate(-50%,-100%)", opacity: "0.2" },
            { transform: "translate(0%,0%)", opacity: "1" },
        ], { duration: 700, iterations: 1 });
        setTimeout(() => {
            btn.removeChild(container);
        }, 5600);

    };


    elementAttributeToggle(target: HTMLElement) {
        const actives = document.querySelectorAll("[is-icon = 'true']");
        if (actives) {
            const array = [...actives as any] as HTMLButtonElement[];
            array.forEach(activeEle => {
                activeEle.addEventListener("click", (e: MouseEvent) => {
                    if (e) {
                        target.classList.toggle(activeEle.id);
                    }
                });
            });
        }
    };


    cleanAttributes(parent:HTMLElement,showOn:boolean){
       
        //OBJECT IS TO HAVE CONTROL ON THE TEXTAREA'S CONTAINER AND TURNON AND OFF ALL ATTRIBUTES ASSOCIATED TO EDITING
        const elements=document.querySelectorAll("[data-is-element='true']") as any as HTMLElement[];//this covers all selector's eles and eles
        const divConts=document.querySelectorAll("div.eleContainer");
        const popups=document.querySelectorAll("div.popup");
        const btnConts=document.querySelectorAll("div#btn-container");
        const cols = parent.querySelectorAll("[data-is-column=true]") as any as HTMLElement[];
        const popups1=parent.querySelectorAll("[isPopup='true']") as any as HTMLElement[];
        const popups3=parent.querySelectorAll("[is-popup='true']") as any as HTMLElement[];
        const popups2=parent.querySelectorAll("div#popup") as any as HTMLElement[];
        const deleteIcons=parent.getElementsByTagName("I") as any as HTMLElement[];
        const contentEdits=parent.querySelectorAll("[contenteditable='true']");
        const contentEditsFalse=parent.querySelectorAll("[contenteditable='false']");
        const IconHeaders=document.querySelectorAll("[is-icon='true']") as any as HTMLElement[];
        const formGroups=document.querySelectorAll("[data-form-group ='true']");
       
        const flexchoices=document.querySelectorAll("div.flex-choices");
        const removeDesignSelectArrows=document.querySelectorAll("select.select-arrow") as unknown as HTMLElement[];

            if(flexchoices && showOn){
                ([...flexchoices as any]as HTMLElement[]).forEach(flex=>{
                    flex.style.opacity="0";
                    
                });
            }else{
                ([...flexchoices as any]as HTMLElement[]).forEach(flex=>{
                    flex.style.opacity="1";
                });
            }
                    //ALL COMPONENTS
                    //DESIGN REMOVE ARROW COLOR
                    if(removeDesignSelectArrows){
                        removeDesignSelectArrows.forEach(arrow=>{
                            arrow.remove();
                        })
                    }
                    IconHeaders.forEach((icon)=>{
                        if(icon as HTMLElement){
                            // console.log(icon)
                            if(showOn){
                                (icon as HTMLElement).style.display="none";
                            }else{
                                (icon as HTMLElement).style.display="block";
                            }
                            
                        }
                    });
                    ([...divConts as any] as HTMLElement[]).forEach((divCont)=>{
                    if(divCont && showOn){
                        divCont.classList.remove("box-shadow");
                        divCont.classList.remove("isActive");
                        ([...divCont.children as any] as HTMLElement[]).map(ele=>{
                            if(ele){
                                ele.classList.remove("isActive");
                                ele.classList.remove("box-shadow");
                                const getIcons=ele.getElementsByTagName("I");
                                //within elements
                                if( getIcons){
                                    
                                    ([...getIcons as any] as HTMLElement[]).map(icon=>((icon as HTMLElement).style.display="none"));
                                }
                            }
                            
                        });
                    }else{
                        ([...elements as any] as HTMLElement[]).forEach(ele=>{
                                if(ele){
                                    const getIcons=ele.getElementsByTagName("I");
                                   //within elements
                                   if( getIcons){
                                       ([...getIcons as any] as HTMLElement[]).map(icon=>((icon as HTMLElement).style.display="block"));
                                    }
                                }
                        });
                    }
                    });
                    //colums
                    ([...cols as any] as HTMLElement[]).map(col=>{
                        if(col as HTMLElement && showOn){
                            (col as HTMLElement).classList.remove("box-shadow");
                            (col as HTMLElement).classList.remove("coliIsActive");
                        }
                    });
                    //Parent=textarea
                    ([...deleteIcons as any] as HTMLElement[]).map(icon=>{
                        if(icon as HTMLElement && showOn){
                            icon.classList.add("hide");
                        }else{
                            icon.classList.remove("hide");
                        }
                    });
                    ([...popups1 as any] as HTMLElement[]).map(popup=>{
                        if(popup as HTMLElement){
                            if(showOn){
                            popup.style.opacity="0";
                            }else{
                                popup.style.opacity="1";
                            }
                        }
                    });
                    ([...popups2 as any] as HTMLElement[]).map(popup=>{
                        if(popup as HTMLElement){
                            if(showOn){
                                popup.style.opacity="0";
                                }else{
                                    popup.style.opacity="1";
                                }
                        }
                    });
                    ([...popups3 as any] as HTMLElement[]).map(popup=>{
                        if(popup as HTMLElement){
                            if(showOn){
                                popup.style.opacity="0";
                                }else{
                                    popup.style.opacity="1";
                                }
                        }
                    });
                    ([...popups as any] as HTMLElement[]).map(popup=>{
                        if(popup as HTMLElement){
                            if(showOn){
                                popup.style.opacity="0";
                                }else{
                                    popup.style.opacity="1";
                                }
                        }
                    });

                    if(contentEdits.length && contentEdits.length>0 && showOn){
                        contentEdits.forEach((element)=>{
                            if(element){
                                element.setAttribute("contenteditable","false");
                            }
                        });
                    }else if( contentEditsFalse.length && !showOn){
                            contentEditsFalse.forEach((element)=>{
                                if(element && element.nodeName!=="I"){
                                    element.setAttribute("contenteditable","true");
                                    
                                }
                            });
                    };

                    ([...formGroups as any] as HTMLElement[]).map(formGrp=>{
                        if(formGrp as HTMLElement){
                            if( showOn){
                                (formGrp as HTMLElement).style.zIndex="-200";
                            }else{
                                (formGrp as HTMLElement).style.zIndex="1";
                            }
                        }
                    });
                    ([...btnConts as any] as HTMLElement[]).forEach(btnCont=>{
                        if(btnCont){
                            if(showOn){
                                btnCont.hidden=true;
                            }else{
                                btnCont.hidden=false;
                            }
                        }
                    });
    };
    
};
export default Toolbar;
export const toolbarIcons = Toolbar.icons;
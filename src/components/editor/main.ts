import {  elementType, iconType, blogType, navLinkBtnType, userType, } from "./Types";
import Header from "./header";
import ModSelector from "./modSelector";
import { FaFont, FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight, FaQuoteLeft, FaTable, FaPalette, FaParagraph, FaFileImage, FaColumns, FaPaperclip, FaCalendar, FaFonticons, FaCrosshairs, FaHome, FaBlog, FaSign, FaComment, FaArrowCircleDown } from "react-icons/fa";
import { TbLineHeight } from "react-icons/tb";
import { BiBorderOuter } from "react-icons/bi";
import { BsShadows } from "react-icons/bs";
import { FaCreate, FaBtn } from "@/components/common/ReactIcons";
import DisplayBlog from "@/components/blog/displayBlog";
import { buttonReturn } from "../common/tsFunctions";
import Edit from "@/components/editor/edit";
import Service from "@/components/common/services";
import CustomHeader from "./customHeader";
import User from "../user/userMain";
import HtmlElement from "./htmlElement";
import Misc, { mediaQueryType } from "../common/misc";
import Nav from "../nav/headerNav";
import AuthService from "../common/auth";
import { getErrorMessage } from "@/lib/errorBoundaries";
import ShapeOutside from "./shapeOutside";
import RegSignIn from "../nav/regSignin";
import { idValueType, selRowColType } from "@/lib/attributeTypes";
import CommonInfo from "../common/commonInfo";


class MainSetup {

    public bgColor: string;
    public btnColor: string;
    private _modSelector: ModSelector;
    constructor(modSelector: ModSelector) {
        this._modSelector=modSelector
        this.bgColor = this._modSelector._bgColor;
        this.btnColor = this._modSelector.btnColor;

    }
    newBlogSetup(parent: HTMLElement): { form: HTMLFormElement, container: HTMLElement } {
        parent.classList.add("position-relative");
        const padWidth = window.innerWidth < 900 ? 1 : 4;
        const formWidth = window.innerWidth < 900 ? "90%" : "65%";
        const container = document.createElement("section");
        container.style.cssText = "margin:auto;width:100%;height:50vh;background:white;display:flex;flex-direction:column;color:black;position:absolute;top:0;z-index:2000;";
        container.className = "d-flex flex-column align-items-center";
        container.id = "newBlogSetup";
        const title = document.createElement("h4");
        title.className = "display-4 text-primary";
        title.textContent = "new Blog";
        const text = document.createElement("p");
        text.textContent = `enter a file name and description. Don't worry you can modify the description to better position your blog.This description will be at the top of your pdf to better serve your target.`;
        text.style.cssText = `margin-inline:2rem;padding-inline:${padWidth}rem;align-text:center;`;
        container.appendChild(title);
        container.appendChild(text);
        const form = document.createElement("form");
        form.style.cssText = `display:flex;flex-direction:column;align-items:center;gap-:2rem;align-items:center;justify-content:flex-start;width:${formWidth};position:relative;padding-inline:2rem;margin-block:2rem;`;
        const grpForm = document.createElement("div");
        grpForm.className = "form-group w-100";
        grpForm.style.cssText = "width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center; gap-1;margin-inline:auto;";
        const grpForm1 = document.createElement("div");
        grpForm1.className = "form-group w-100";
        grpForm1.style.cssText = "width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center; gap-1;margin-inline:auto;";
        const label = document.createElement("label");
        label.textContent = "filename";
        const input = document.createElement("input");
        input.style.cssText = "width:95%;"
        input.name = "filename";
        input.className = "form-control";
        input.type = "text";
        input.id = "filename";
        label.setAttribute("for", input.id);
        const { input: tinput, label: tlabel, formGrp: titleGrp } = Nav.inputComponent(form);
        titleGrp.style.cssText = "margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;"
        tinput.id = "title";
        tinput.name = "title";
        tinput.placeholder = "blog title";
        tlabel.textContent = "title";
        tlabel.setAttribute("for", tinput.id);
        grpForm.appendChild(label);
        grpForm.appendChild(input);
        const labelDesc = document.createElement("label");
        labelDesc.textContent = "description";
        const textarea = document.createElement("textarea");
        textarea.style.cssText = "width:95%;";
        textarea.className = "form-control";
        textarea.rows = 4;
        textarea.name = "desc";
        grpForm1.appendChild(labelDesc);
        grpForm1.appendChild(textarea);
        form.appendChild(grpForm);
        form.appendChild(grpForm1);
        const divCont = document.createElement("div");
        divCont.style.cssText = "display:flex;justify-content:center;align-items:center;margin-inline:auto;gap:1.5rem;";
        const cancel = buttonReturn({ parent: divCont, text: "cancel", bg: "#0804f9", color: "white", type: "button" });
        const btn = buttonReturn({ parent: divCont, text: "cancel", bg: "#0804f9", color: "white", type: "button" });
        btn.type = "submit";
        btn.textContent = "submit";
        btn.className = "btn btn-sm text-light bg-primary";
        btn.style.cssText = "margin-block:2rem; padding-inline:1rem;padding-block:0.5rem;border-radius:20px";
        form.appendChild(divCont);
        container.appendChild(form);
        parent.appendChild(container);
        cancel.onclick = (e: MouseEvent) => {
            if (e) {
                Misc.fadeOut({ anchor: container, xpos: 25, ypos: 150, time: 400 });
                setTimeout(() => { parent.removeChild(container) }, 398);
            }
        };
        form.animate([
            { transform: "translateY(-100%) scale(0.2)" },
            { transform: "translateY(0%) scale(1)" }
        ], { duration: 700, iterations: 1 });
        return { form, container }
    }

}


class Main {
    //------INITIALIZE--------////
    //------INITIALIZE--------////

   public static readonly colArr = [{ name: "select", value: "noColumns" }, { name: "remove", value: "noColumns" }, { name: "two", value: "columns" }, { name: "three", value: "columns-3" }, { name: "four", value: "columns-4" }]

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
    public mainSetup: MainSetup;
   private _edit: Edit;
   public bgColor: string;
    public btnColor: string;
   private _displayBlog: DisplayBlog;
   private _header:Header;
    public mainInjection: HTMLElement;
    public static  mainEntry: HTMLElement;
    public static topMain: HTMLElement | null=null;
    public static _mainHeader: HTMLElement | null;
    public static _mainFooter: HTMLElement | null;
    public static  textarea: HTMLElement | null;
    public static  container: HTMLElement | null;
    public static  show: boolean;
    public static  main_css: string;
    public static  main_class: string;
    public static  mainRowBtns: HTMLElement|null;
    private _regSignin: RegSignIn;
    private _blog:blogType;
    constructor(private _modSelector: ModSelector, private _service: Service,private auth:AuthService, mainInject: HTMLElement, public edit: Edit, private _user: User, blog:blogType, private _htmlElement: HtmlElement, header: Header, public customHeader: CustomHeader, displayBlog: DisplayBlog, public shapeOutside: ShapeOutside, public commonInfo: CommonInfo) {
        this._blog=blog;
        this._regSignin = new RegSignIn(this._modSelector, this._service, this._user);
        this.mainInjection = mainInject;
        Main.mainEntry=mainInject;
        this._displayBlog = displayBlog;
        this.bgColor = this._modSelector._bgColor;
        this.btnColor = this._modSelector.btnColor;
        this._edit = edit
        this.mainSetup = new MainSetup(this._modSelector);
        Main.main_css=ModSelector.main_css + "width:100%";
        Main.main_class= ModSelector.main_class;
        this._header=header;
    }
    //--------------SETTER GETTERS----------////////
   
    get placement() {
        const getPlace = localStorage.getItem("placement");
        if (getPlace) {
            return parseInt(getPlace)
        } else {
            return 1;
        }
    }
    set placement(placement: number) {
        localStorage.setItem("placement", JSON.stringify(placement))
    }

    get blog(){
        return this._blog;
    };
    set blog(blog:blogType){
       
        this._blog=blog;
    };




    //--------------SETTER GETTERS----------////////
    //MAIN INJECTOR-HEADER////

    //MAIN INJECTOR-HEADER////
    ////- MAIN INJECTOR-----//////////////////////////
    async newBlog(item: { parent: HTMLElement, func: () => Promise<void> | void }): Promise<void> {
        const { parent, func } = item;
        parent.style.position = "relative";
        const { form, container } = this.mainSetup.newBlogSetup(parent);
        container.id = "newBlogSetup";
        const user = this._user.user;
        const initBlog = this._modSelector.blogInitializer(user);
        form.addEventListener("submit", (e: SubmitEvent) => {
            if (e) {
                e.preventDefault();
                const checkUser = (user && user.id!=="" && user.email!=="");
                const formdata = new FormData(e.currentTarget as HTMLFormElement);
                const filename = formdata.get("filename") as string;
                const desc = formdata.get("desc") as string;
                const title = formdata.get("title") as string;

                //ADDING USER_ID TO NEW BLOG IF EXIST!!
                if (checkUser) {
                    if (!(filename)) { Misc.message({ parent, msg: "No filename", type_: "error", time: 1400 }); return container.remove(); }
                    const name = filename.split(" ").join("");
                    const _title=Misc.capitalize({str:title})
                    this._modSelector.blog = { ...initBlog, name:name, title: _title, desc: desc, user_id: user.id, eleId: parent.id };
                    const blog = this._modSelector.blog;
                    this._service.newBlog(blog).then(async (blog_) => {
                        if (blog_ && blog_.user_id) {
                            this._modSelector.blog = { ...blog, id: blog_.id, class: Main.main_class, cssText: Main.main_css, eleId: parent.id }
                            const _blog = this._modSelector.blog;
                            this._modSelector.loadBlog({ blog: _blog, user });
                            Misc.message({ parent, msg: "created", type_: "success", time: 400 })
                            Misc.fadeOut({ anchor: container, xpos: 50, ypos: 100, time: 400 });
                            setTimeout(() => {
                                container.remove()
                            }, 380);
                            func();
                        }
                    }).catch((err) => {
                        const msg = getErrorMessage(err);
                        Misc.message({ parent, msg: msg, type_: "error", time: 1500 });
                        setTimeout(() => { parent.removeChild(container); }, 1480);
                    });

                } else {
                    this._modSelector.blog = { ...initBlog, name: filename, title: title, desc: desc, cssText: Main.main_css, class: Main.main_class, eleId: parent.id };
                    const blog = this._modSelector.blog;
                    this._modSelector.blog = { ...blog, id: blog.id, class: Main.main_class, cssText: Main.main_css, eleId: parent.id };
                    const _blog = this._modSelector.blog;
                    this._modSelector.loadBlog({ blog: _blog, user });
                    Misc.fadeOut({ anchor: container, xpos: 50, ypos: 100, time: 400 });
                    setTimeout(() => {
                        container.remove()
                    }, 380);
                    func();
                    Misc.message({ parent, msg: "created but not saved", type_: "success", time: 1400 });
                    setTimeout(() => {
                        ([...parent.children as any] as HTMLElement[]).forEach(child => {
                            if (child && child.id === "newBlogSetup") {
                                parent.removeChild(child);
                            }
                        });

                    }, 1380);
                    this._regSignin.signIn();///signing in
                }
                Main.cleanUp(Main.textarea as HTMLElement);
                Main.cleanUp(Main._mainHeader as HTMLElement);
                Main.cleanUp(Main._mainFooter as HTMLElement);



            }
        });
    };
    //INJECTION POINT////////////////
    async mainContainer(parent: HTMLElement | null): Promise<{
        mainCont:HTMLElement|null,
        textarea:HTMLElement|null,
        mainHeader:HTMLElement|null,
        footer:HTMLElement|null,
    }> {
        
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const idValues=this._modSelector.dataset.idValues;
        const status=this.auth._isAuthenticated;
        const isAuthenticated=status
        const user=this.auth.user;
        if (parent) {
            Main.cleanUp(parent);
            Main.btnInitialize();
            Main.topMain = document.createElement("article");
            Main.topMain.className = "top-main";
            Main.topMain.id = `topMain-blog-${this._modSelector.blog.id}`
            Main.topMain.style.cssText = "margin:0px;padding:0px;position:relative;display:flex;flex-direction:column;justify-content:flex-start;width:100%;background-color:white;border-radius:15px;"
            Main.topMain.style.gap=less900 ? (less400 ? "3.5rem":"1.5rem"):"1rem";
            //----------------- Iphone adjustments---------------//
            const mediaTopMain390: mediaQueryType = {
                target: Main.topMain,
                css_max_attribute: { "max-width": "370px", "height": "auto", "width": "100%", "font-size": "10px" },
                css_min_attribute: { "max-width": `auto`, "height": "auto", "width": "100%", "font-size": "auto" },
                minWidth: 400,
                maxWidth: 400
            }
            Misc.mediaQuery(mediaTopMain390)
            //----------------- Iphone adjustments---------------//
            parent.style.backgroundColor = this.bgColor;
            parent.style.paddingBottom = "1rem";
            parent.style.marginBottom = "1px;"
            const mainCont = document.createElement("section");
            Main.container = document.createElement("section");
            mainCont.id = `main`;
            Main.container.id = `main`;
            mainCont.className = Main.main_class;
            Main.container.className = Main.main_class;
            Main.container.style.cssText = Main.main_css;
            mainCont.style.cssText = Main.main_css;
            mainCont.style.width = "100% !important";
            this._modSelector.blog.class = mainCont.className;
            this._modSelector.blog.cssText = mainCont.style.cssText;
            this._modSelector.blog.eleId = mainCont.id;
            const mediaMain390: mediaQueryType = {
                target: mainCont,
                css_max_attribute: { "max-width": "370px", "height": "auto", "width": "100%", "font-size": "12px" },
                css_min_attribute: { "max-width": `auto`, "height": "auto", "width": "100%", "font-size": "auto" },
                minWidth: 400,
                maxWidth: 400
            }
            Misc.mediaQuery(mediaMain390)
            //----------------- Iphone adjustments---------------//
            const bottomMain = document.createElement("section");
            bottomMain.id = "bottomMain";
            bottomMain.style.cssText = "margin-inline:auto;width:100%;min-height:5vh;display:flex;flex-direction:column;align-items:center;"
            //HEADER INJECTION
            // this._header.editorHeader({parent:mainCont});
            // this.customHeader.editorHeader({parent:mainCont});
            //HEADER INJECTION
            const {mainHeader}= await this.header(mainCont);
            const {textarea}= await this.textArea(mainCont);
            this.mainBtn({parent:Main.topMain,textarea,idValues});
            Main.topMain.appendChild(mainCont);
            mainCont.style.width = "100% !important";
            mainCont.classList.add("w-100");
            parent.appendChild(Main.topMain);
            mainCont.appendChild(bottomMain);
            mainCont.id="main";
            //ASSIGNING Main.container()
            
            (Main.container as HTMLElement).style.width = "100% !important";
            //ASSIGNING Main.container()
            const {footer}= await this.footer(bottomMain);
            this.mainBtnChoices({parent:bottomMain,isAuthenticated,user});
            this.hideShowBottom({ mainBottom: bottomMain, time: 500 })
            mainCont.animate([
                { transform: "scale(0.2)" },
                { transform: "scale(1)" },
            ], { duration: 1000, iterations: 1 });

                mainCont.style.width = "100% !important";
                await this.localBlogLoad({mainCont,textarea,footer,mainHeader,blog:this.blog,user:this._user.user});
                return {mainCont:mainCont,textarea,footer,mainHeader}
          
        } else {
            alert("no parent");
        
        };
        return {mainCont:null,textarea:null,footer:null,mainHeader:null};
    }
    ////- MAIN INJECTOR ABOVE ----///////////////////////////
    //INITIALIZED

    ////- MAIN INJECTOR ABOVE ----///////////////////////////
    //INITIALIZED
    mainBtn({parent,textarea,idValues}:{parent: HTMLElement | null,textarea:HTMLElement,idValues:idValueType[]}): void {
        if (!parent) return;
        Main.cleanUp(parent)
        Main.textarea = document.querySelector("div#textarea");
        const row = document.createElement("div");
        row.setAttribute("aria-label","toolbar");
        row.setAttribute("role","toolbar");
        row.className = "btn-group";
        row.id = "main-group-btn";
        row.style.cssText = "display:inline-flex !important;flex-wrap:wrap;padding-inline:5px;border-radius:6px;background-color:rgb(4 97 66);margin-inline:0px;width:100%;height:26px;position:relative;";
        row.style.backgroundColor = this.bgColor;
        Main.mainRowBtns=row;
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
        Main.icons.toSorted((a,b)=>{if(a.id<b.id) return -1;return 1}).forEach((icon) => {
            const node=icon.name
            const check=["h1","h2","h3","h4","h5","h6","fontSize"].includes(node)
            const btn = document.createElement("button");
            btn.id = icon.name;
            btn.setAttribute("data-id", `${btn.id}`);
            btn.setAttribute("data-name-icon-id", `${icon.name}-${icon.id}`);
            btn.setAttribute("is-button", "true");
            btn.setAttribute("type", "button");
            btn.className = "btn  text-white col position-relative btnHover";
            btn.style.cssText = "padding-inline:3px;padding-block:1px;border-radius:0px;height:100%;color:white;background-color:black;";
            if(icon.isIcon && !check){
                const cssStyle={margin:"auto",alignSelf:"center",justifySelf:"center",zIndex:"2",color:"inherit",backgroundColor:"inherit"};
                FaCreate({ parent: btn, name: icon.faIcon, cssStyle:cssStyle});
               
            }else if(node==="fontSize"){
                this.initFontSize({btn,icon,idValues})
            }else{
                btn.textContent = icon.name;
            }
            btn.setAttribute("data-btnName", icon.display);
            const isElement=icon.isElement;
            const isInsertAttributes=icon.attr
            row.appendChild(btn);
            switch (true) {
                case isInsertAttributes:
                    btn.setAttribute("is-attr", `${icon.attr}`);
                    btn.addEventListener("click", (e: MouseEvent) => {
                        if (e) {
 
                            btn.classList.add("attribute");
                            if (icon.name === "SH") {
                                const target = document.querySelector("div#textarea") as HTMLElement;
                                this.shapeOutside.setShapeOutside(target, btn)
                            } else if (icon.name=== "columns") {
                                this._htmlElement.selectColumns({parent:row, btnClk:btn,idValues});
                            }else if(icon.name==="font-family"){
                                this.fontFamily({parent:row, btnClicked:btn,idValues});
                            }else if(icon.name==="color"){
                                
                                this.getColor(row, btn,idValues);
                            }else if(icon.name==="bg-shade"){
                                this.bgShade({btn,idValues,selRowCol:null})
                            }else if(icon.name==="line-height"){
                                Main.textarea = document.querySelector("div#textarea") as HTMLElement;
                                this.lineHeight(Main.textarea,btn,idValues);
                            }else{
                                //THIS CONTROLS ALL NONFLEX AND FLEX ELEMENTS
                                this._htmlElement.fontAction(btn,idValues);
                                //THIS CONTROLS ALL NONFLEX AND FLEX ELEMENTS
                            };

                        }
                    });
                    break;
                case isElement:
                    btn.addEventListener("click", (e: MouseEvent) => {
                        if (e) {
                            this.addElement({textarea,btn, icon,idValues});
                           
                        }
                    });
                    break;
                case icon.name === "show":
                    Main.show = false;
                    btn.addEventListener("click", (e: MouseEvent) => {
                        if (e) {

                            const sectionMain = document.querySelector("section#main") as HTMLElement;
                            btn.classList.toggle("showOn");
                            const check = ([...btn.classList as any] as string[]).includes("showOn");
                            if (check) {
                                Main.show = true;
                                btn.style.borderRadius = "10px"
                            } else {
                                Main.show = false;
                                btn.style.borderRadius = "0px";
                            };
                         
                            if (sectionMain) {
                                this._displayBlog.cleanAttributes(sectionMain, Main.show);
                            }
                        }
                    });
                    break;
                case icon.name === "final":
                    btn.addEventListener("click", (e: MouseEvent) => {
                        if (e) {
                            btn.classList.toggle("showFinal");
                            const blog = this._modSelector.blog;
                            const maxCount=ModSelector.maxCount(blog)
                            if (maxCount>0) {

                                Main.container = document.querySelector("section#main") as HTMLElement;
                                if (Main.container) {
                                    this._displayBlog.showFinal(Main.container, blog,idValues);
                                }

                            } else {
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
        row.style.height="26px";
        Main.initMainBtns(); //clears active btns

    };


      //THIS IS CRITICAL ON REFRESH: THIS UPLOADS THE STORAGE TO MAIN THROUGH EDIT
      async localBlogLoad({mainCont,blog,user,textarea,mainHeader,footer}:{
        mainCont: HTMLElement,
        textarea:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement,
        blog:blogType,
        user:userType

      }) {
        //THIS INITIALIZES BLOG FROM THE LOCALSTORAGE:SOURCED FROM INDEX
        //INDEX(MOD GETS=> LOADS, THEN FEEDS ALL CLASSES)
        //INDEX(AUTH GETS USER=>CONFIRMS USER=> THEN STORES USER)

        if (blog) {
       
            await this._service.promsaveItems({blog,user}).then(async(res)=>{
                if(res){
                    
                    localStorage.removeItem("count");
                    mainCont.style.cssText = res.cssText + "width:100%;"||mainCont.style.cssText;
                    mainCont.className=res.class || mainCont.className;
                    this._modSelector.blog.eleId = mainCont.id;
                    await this._edit.main({parent:mainCont,textarea,mainHeader,footer,blog:res,user});//sending it to viewport
                }
            });
        

        
        }else{
            this._modSelector.blogInitializer(null);
        };
        
         
     };



    //INJECTION
    header(parent: HTMLElement):Promise<{mainHeader:HTMLElement}> {
        Header.cleanUpByID(parent, "sectionHeader");
        parent.style.position = "relative";
        const mainHeader=document.createElement("section");
        Main._mainHeader=document.createElement("section");
        mainHeader.id = "sectionHeader";
        Main._mainHeader.id = "sectionHeader";
        mainHeader.style.zIndex = "";
        Main._mainHeader.style.zIndex = "";
        mainHeader.setAttribute("name", "section-header");
        Main._mainHeader.setAttribute("name", "section-header");
        mainHeader.className = ModSelector.mainHeader_class;
        Main._mainHeader.className = ModSelector.mainHeader_class;
        mainHeader.style.cssText = ModSelector.mainHeader_css;
        Main._mainHeader.style.cssText = ModSelector.mainHeader_css;
        // ADD INSERT HEADER FROM EDIT
        // ADD INSERT HEADER FROM EDIT
        parent.appendChild(mainHeader);
        Main._mainHeader=mainHeader
        return Promise.resolve({mainHeader}) as Promise<{mainHeader:HTMLElement}>;
    };


    //INJECTION
    textArea(parent: HTMLElement): Promise<{textarea:HTMLElement}> {
        //INSERT SELECTORS/ELEMENTS FROM EDIT
        const less900 = window.innerWidth < 900;
        const less400 = window.innerWidth < 400;
        parent.style.width = "100% !important";
        Header.cleanUpByID(parent, "textarea");
        parent.style.position = "relative";
        const cssTextarea = "margin-inline:auto;padding-inline:1rem;padding-block:1.5rem;margin-block:1rem;border:1px solid lightgrey; border-radius:4px;width:100%;height:110vh;box-shadow:1px 1px 4px 1px grey;overflow-y:scroll;display:block;position:relative;padding-block;1rem;padding-bottom:2rem;";
        
        const textarea = document.createElement("div");
        textarea.setAttribute("contenteditable", "false");
        textarea.style.cssText = cssTextarea;
        textarea.style.paddingInline = less900 ? (less400 ? "0.25rem" : "0.5rem") : "1rem";
        textarea.style.width = "100%";
        textarea.id = `textarea`;
        Main.textarea = document.createElement("div");
        Main.textarea.setAttribute("contenteditable", "false");
        Main.textarea.style.cssText = cssTextarea;
        Main.textarea.style.paddingInline = less900 ? (less400 ? "0.25rem" : "0.5rem") : "1rem";
        Main.textarea.style.width = "100%";
        Main.textarea.id = `textarea`;
        //ADD WORK DONE _edit.selEleGenerator(Main.textarea,blog)
        //ADD WORK DONE
        parent.appendChild(textarea);
       
        return Promise.resolve({textarea}) as Promise<{textarea:HTMLElement}>;
    };



    async footer(parent: HTMLElement):Promise<{footer:HTMLElement}> {
        Header.cleanUpByID(parent, "mainFooter");
        parent.style.position = "relative";
        const footer = document.createElement("footer");
         Main._mainFooter = document.createElement("footer");
        footer.id = "mainFooter";
        Main._mainFooter.id = "mainFooter";
        footer.className = ModSelector.mainFooter_class;
        Main._mainFooter.className = ModSelector.mainFooter_class;
        footer.style.cssText = ModSelector.mainFooter_css;
        Main._mainFooter.style.cssText = ModSelector.mainFooter_css;
        Main._mainFooter=footer
        // ADD INSERT HEADER FROM EDIT
        // ADD INSERT HEADER FROM EDIT
        parent.appendChild(footer)
        return Promise.resolve({footer}) as Promise<{footer:HTMLElement}>;
    };


     //FONT-SIZE
     initFontSize({btn,icon,idValues}:{btn:HTMLButtonElement,icon:iconType,idValues:idValueType[]}){
        btn.classList.add("flexRow");
        btn.style.color = "white";
        const input = document.createElement("input");
        input.id = `${icon.name}-input`;
        input.className = "input-fontSize";
        input.type = "number";
        input.min = "12";
        input.max = "142";
        input.style.cssText = "font-size:12px;align-text:center;";
        btn.appendChild(input);
        input.addEventListener("change", (e: Event) => {
            if (!e) return
            const num = (e.currentTarget as HTMLInputElement).value;
            this.fontSize(parseInt(num),idValues);

        });
    };

    //PARENT mainContainer()-?????????
    mainBtnChoices({parent,isAuthenticated,user}:{parent: HTMLElement,isAuthenticated:boolean,user:userType}) {
        
        const container = document.createElement("div");
        container.id = "mainBtnChoices";
        container.style.cssText = "border-radius:20px;background-color:white;color:black;margin-inline:20px;padding-inline:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;width:fit-content;";
        const btnGrp = document.createElement("div");
        btnGrp.className = "btn-group-mainBtnChoices";
        btnGrp.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-block:2rem;margin-inline:auto;flex-wrap:wrap;";
        container.appendChild(btnGrp);
       
        const checkSignedIn = (user.id!=="");
        const btnArray: navLinkBtnType[] = [
            { id: 0, name: "home", color: "#0a2351", link: "/", func: () => undefined, icon: FaHome, show: true, isEditor: false, save: () => null },
            { id: 1, name: "blogs", color: "#0a2351", link: "/blogs", func: () => undefined, icon: FaBlog, show: true, isEditor: false, save: () => null },
            { id: 2, name: "signin", color: "#0a2351", link: null, func: async () => { await this._regSignin.signIn() }, icon: FaSign, show: !checkSignedIn, isEditor: false, save: () => null },
            { id: 3, name: "logout", color: "#0a2351", link: null, func: () => { this.auth.logout({ func: () => undefined, redirect: true }) }, icon: FaSign, show: checkSignedIn, isEditor: false, save: () => null },
            { id: 4, name: "contact", color: "#0a2351", link: null, func: () => { this.commonInfo.contact({user,isAuthenticated}) }, icon: FaComment, show: true, isEditor: false, save: () => null },

        ];
        btnArray.filter(item => (item.show)).forEach((action, index) => {
            if (action.name !== "logout") {

                const btn = document.createElement("button");
                btn.id = `main-btn-${index}`;
                btn.className = "btn btn-sm text-primary";
                btn.style.cssText = "display:flex;justify-content:space-between;align-items:center;border-radius:6px;padding-inline:1.25rem;padding-block:0.75rem;gap:0.5rem;";
                btn.style.color = action.color;
                const span = document.createElement("span");
                const text = document.createElement("small");
                text.textContent = action.name;//display NAME
                FaBtn({ parent: span, icon: action.icon, cssStyle: { background: "inherit", color: "black" } });
                btn.appendChild(span);
                btn.appendChild(text);
                btnGrp.appendChild(btn);
                btn.onclick = (e: MouseEvent) => {
                    if (e) {
                        e.preventDefault();
                        if (typeof window !== "undefined") {
                            const url = new URL(window.location.href);
                            if (action.link) {
                                const newUrl = new URL(action.link, url.origin);
                                window.location.href = newUrl.href;
                            }
                            action.func();

                        }
                    }
                };
                btn.onmouseover = (e: MouseEvent) => {
                    if (e) {
                        btn.style.backgroundColor = "black";
                        btn.style.color = "white";
                        span.style.backgroundColor = "white";
                        span.style.color = "blue";
                        btn.style.transition = "all 1s ease-in-out";
                    }
                };
                btn.onmouseout = (e: MouseEvent) => {
                    if (e) {
                        btn.style.backgroundColor = "inherit";
                        btn.style.color = "inherit";
                        span.style.backgroundColor = "inherit";
                        span.style.color = "inherit";
                        btn.style.transition = "all 0.5s ease-in-out";
                    }
                };


                parent.appendChild(container);
            };
        });
        


    };



    hideShowBottom(item: { mainBottom: HTMLElement, time: number }) {
        const { mainBottom, time } = item;
        mainBottom.style.position = "relative";
        const arrowPopup = document.createElement("div");
        const bottomHeight = window.getComputedStyle(mainBottom).getPropertyValue("height");
        arrowPopup.id = "arrowPopup";
        arrowPopup.style.cssText = "position:absolute;width:26px;background-color:black;aspect-ratio:1 /1;border-radius:50%;filter:drop-shadow(0 0 0.5rem blue);display:flex;justify-content:center;align-items:center;";
        arrowPopup.style.top = "0%";
        arrowPopup.style.right = "0%";
        arrowPopup.style.transform = "translate(20px,-20px)";
        FaCreate({ parent: arrowPopup, name: FaArrowCircleDown, cssStyle: { color: "white", bordRadius: "50%", fontSize: "20px" } });
        mainBottom.appendChild(arrowPopup);
        arrowPopup.onclick = (e: MouseEvent) => {
            if (e) {
                arrowPopup.classList.toggle("activate");
                const check = ([...arrowPopup.classList as any] as string[]).includes("activate");
                this.activateBottom({ mainBottom, mainBotHeight: bottomHeight, time, check });
                if (check) {
                    arrowPopup.style.transform = "rotate(180deg)";
                    arrowPopup.style.color = "red";
                    arrowPopup.animate([
                        { transform: "rotate(0deg)", color: "white" },
                        { transform: "rotate(180deg)", color: "red" },
                    ], { duration: time, iterations: 1, "easing": "ease-in-out" });
                } else {
                    arrowPopup.style.transform = "rotate(0deg)";
                    arrowPopup.style.color = "white";
                    arrowPopup.animate([
                        { transform: "rotate(180deg)", color: "red" },
                        { transform: "rotate(0deg)", color: "white" },
                    ], { duration: time, iterations: 1, "easing": "ease-in-out" });
                }
            }
        };
    };


    activateBottom(item: { mainBottom: HTMLElement, mainBotHeight: string, check: boolean, time: number }) {
        const { mainBottom, mainBotHeight, check, time } = item;
     
        if (check) {
            mainBottom.style.height = "5px";
            mainBottom.style.minHeight = "0px";

            mainBottom.animate([
                { height: "auto", minHeight: mainBotHeight },
                { height: "15px", minHeight: "5px" },
            ], { duration: time, iterations: 1 });
            ([...mainBottom.children as any] as HTMLElement[]).forEach(child => {
                if (child && child.id !== "arrowPopup") {
                    child.style.opacity = "0";
                }
            });
        } else {
            mainBottom.style.minHeight = mainBotHeight;
            mainBottom.style.height = "auto";

            mainBottom.animate([
                { height: "15px", opacity: "0", minHeight: "0px" },
                { height: "auto", minHeight: mainBotHeight, opacity: "1" },
            ], { duration: time, iterations: 1 });
            ([...mainBottom.children as any] as HTMLElement[]).forEach(child => {
                if (child) {
                    child.style.opacity = "1";
                }
            });
        }
    };



    //ADD ELEMENT FROM TOOLBAR ANND ADD FONT-KEEP HERE
    addElement({textarea,btn,icon,idValues}:{textarea:HTMLElement,btn: HTMLButtonElement, icon: iconType,idValues:idValueType[]}): void {

        if (textarea) {
            if (icon.name !== "line-height") {

                btn.classList.add(icon.display)
                this._htmlElement.fromMain({
                    parent:textarea,
                     btn,
                     icon,
                    idValues
                });

            }else{
                this.lineHeight(textarea,btn,idValues)
            };

        };
    };


    bgShade({btn,idValues,selRowCol}:{btn:HTMLButtonElement,idValues:idValueType[],selRowCol:selRowColType|null}){
        
        const direction=window.innerWidth < 600 ? "column":"row" ;
        btn.style.position="relative";
        btn.classList.add("active");
        //show drop-down on shade selection
        const popup=document.createElement("div");
        popup.style.cssText=`position:absolute;border-radius:5px;box-shadow:1px 1px 10px 1px #bdc5c9;display:flex;flex-direction:${direction};width:200px;height:40px;z-index:200;padding:1rem;inset:0%;transform:translateY(15%);background-color:white;justify-content:center;align-items:center;`;
        popup.setAttribute("is-popup","true");
        popup.id="popup";
        popup.style.transform="none";
            if(direction==="column"){
                popup.style.width="75px";
                popup.style.inset="105% -50% -110% -150%";
            }else{
            popup.style.inset="-55% -50% -110% -250%";
            }
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
                Header.cleanUpByID(btn,popup.id);

                
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
        this.removePopup({parent:btn,target:popup});
        btn.appendChild(popup);
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
                Header.cleanUpByID(btn,popup.id);
                
            }
        });
        
        //then remove "active" on btn
    };



    removePopup({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        const popup=document.createElement("popup");
       
        popup.id="remove-popup";
        popup.className="remove-popup";
        popup.style.cssText="position:absolute;top:0%;right:0%;transform:translate(0px,0px);z-index:200;aspect-ratio:1/1;border-radius:50%;background-color:black;color:white;cursor:pointer;display:flex;justify-content:center;align-items:center;padding:3px;";
        const span=document.createElement("span");
        span.style.cssText="color:white;width:auto;";
        span.textContent="X";
        popup.appendChild(span);
        target.appendChild(popup);
        popup.onclick=(e:MouseEvent)=>{
            if(!e) return;
            Misc.growOut({anchor:target,scale:0,opacity:0,time:400});
            setTimeout(()=>{
                Header.cleanUpByID(parent,target.id);
            },390);
        };
    };




    lineHeight(parent: HTMLElement, btn: HTMLButtonElement,idValues:idValueType[]) {
        ShapeOutside.cleanUpByID(parent, "popup");
        btn.classList.add("active");
        const popup = document.createElement("div");
        popup.id = "popup";
        popup.style.cssText = "position:absolute;top:5%;left:30%;right:30%;block-size:fit-content;padding:0.5rem;display:flex;justify-content:center;align-items:center;box-shadow:1px 1px 12px 1px black;border-radius:16px;background-color:white;";
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


   
    selectColumns({parent,btnClk,idValues}:{parent:HTMLElement,btnClk:HTMLButtonElement,idValues:idValueType[]}){
        btnClk.classList.add("active");
        parent.style.position="relative";
        const select=document.createElement("select") as HTMLSelectElement;
        select.style.cssText="width:100%;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;";
        const isActives=document.querySelectorAll("[is-element='true'].isActive");
        Main.colArr.forEach((op)=>{
            const option=document.createElement("option") as HTMLOptionElement;
            option.value=op.value;
            option.textContent=op.name;
            select.appendChild(option);
        });
        parent.appendChild(select);
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
                parent.removeChild(select);
                btnClk.classList.remove("active");
            }
        });
    }
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

    fontFamily({parent,btnClicked,idValues}:{parent: HTMLElement, btnClicked: HTMLButtonElement,idValues:idValueType[]}) {
        Main.textarea = document.querySelector("div#textarea");
        const container = document.querySelector("section#main") as HTMLElement;
        btnClicked.classList.add("active");
        const select = document.createElement("select");
        select.setAttribute("isPopup", "true");
        select.className = "select-font";
        Misc.font_family.forEach((fam) => {
            const option = document.createElement("option");
            option.value = fam.value;
            option.textContent = fam.name;
            select.appendChild(option);
        });
        parent.appendChild(select);//parent=row group-btn
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
                parent.removeChild(select);
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
            const getSelects = document.querySelectorAll("select.select-font");
            if (getSelects) {
                getSelects.forEach(el => {
                    const par = el.parentElement;
                    if (el && par) {
                        par.removeChild(el);

                    }
                });
            }

        });

    };
    //MULTI-PURPOSE
    addRemoveIsActive() {
        Main.textarea = document.querySelector("div#textarea");
        const children = Main.textarea ? ([...Main.textarea.children as any] as HTMLElement[]) : null;
        if (children) {
            children.forEach((child) => {
               
                child.addEventListener("click", (e: Event) => {
                    if (e) {
                        (child as HTMLElement).classList.add("position-relative");
                        (child as HTMLElement).classList.toggle("isActive");
                    }
                });

            });
        }
    };


    //PARENT MAINBTN()-KEEP
    getColor(parent: HTMLElement, btnClicked: HTMLButtonElement,idValues:idValueType[]) {
       
        parent.style.zIndex="0";
        const isActives = document.querySelectorAll("[is-element='true'].isActive") as any as HTMLElement[];
        btnClicked.classList.add("active");
        const palContainer = document.createElement("div");
        palContainer.id="add-color";
        palContainer.className = "flexCol palcontainer";
        palContainer.style.cssText = "inset:-60% auto auto auto;width:auto;position:absolute;box-shadow:1px 1px 10px 2px grey;border-radius:10px;z-index:100;width:100px;height:100px;border-radius:12px;display:flex;align-items:center;justify-content:center;background-color:white;";
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "color";
        palContainer.appendChild(input);
        this.removePopup({parent,target:palContainer});
        parent.appendChild(palContainer);
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
                parent.removeChild(palContainer);
            }
        });
    };

    
   static activatebuttons({target}:{target:HTMLElement}){
        const getRow=document.querySelector(`div#main-group-btn`) as HTMLElement;
        if(!getRow) return;
        const check=([...target.classList as any] as string[]).includes("isActive");
        const node=target.nodeName.toLowerCase();
       

            ([...getRow.children as any] as HTMLElement[]).map(btn=>{
                if(btn?.id===node){
                    if(check){
                        btn.classList.add("active");
                    }else{
                        btn.classList.remove("active");
                    }
                   
                }else{
                    btn.classList.remove("active");
                }
            });
        
    };

    //IITIALIZE ALL BUTTONS!!NOTE NEED TO FIX THE LOGIC check=true(&& empty),check1=false when not true
    static initMainBtns(): void {
        const maingroupBtn = document.getElementById("main-group-btn");
        if (maingroupBtn) {
            ([...maingroupBtn.children as any] as HTMLElement[]).forEach(btn => btn.classList.remove("active"));
        }
    }
    //INSERT element- delete
    mainAddelement(_ele: HTMLElement) {
        const checkPlace = this.placement === 0 ;
        if (checkPlace) this.placement = this.placement + 1;


        if (_ele as HTMLElement) {
            let ele: elementType = {} as elementType;
            const rand = Math.round(Math.random() * 1000);
            const name = _ele.nodeName.toLowerCase();
            _ele.id = `${name}-${rand}`;
            _ele.setAttribute("name", name);
            _ele.setAttribute("is-element", "true");
            ele = {
                ...ele,
                id: this.placement,
                placement: this.placement,
                eleId: _ele.id,
                name: name,
                selectorId: undefined,
                class: _ele.className,
                cssText: _ele.style.cssText,
            }
            if (name === "img") {
                const img = _ele as HTMLImageElement;
                ele = {
                    ...ele,
                    img: img.src,
                    inner_html: img.alt
                };
            } else {
                ele = {
                    ...ele,
                    inner_html: _ele.innerHTML

                };
            };
            this._modSelector.elements.push(ele);
            this.placement = this.placement + 1;
            this._modSelector.footerPlacement();//this shifts footer placement down
        };
    };
    //GENERAL for showFinal(blog)
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

    }

    removeElement({parent,target,idValues,selRowCol}:{
        parent: HTMLElement,
         target: HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null
    }) {
        target.style.position = "relative";
        const css = "position:absolute;transform:translate(2px,-5px);background:black;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;"
        const xIconDiv = document.createElement("span");
        xIconDiv.setAttribute("contenteditable", "false");
        xIconDiv.setAttribute("is-icon", "true");
        xIconDiv.className = "";
        xIconDiv.id = "xIconDiv";
        xIconDiv.style.cssText = `${css}top:-6px;right:0px;`;
        const cssStyle = { background: "inherit", fontSize: "inherit" };
        FaCreate({ parent: xIconDiv, name: FaCrosshairs, cssStyle })
        target.after(xIconDiv);
        xIconDiv.addEventListener("click", (e: MouseEvent) => {
            if (e) {
                const check = ([...parent.children as any] as HTMLElement[]).map(ele => { if (ele.id === target.id) { return true } else { return false } }).includes(true);
                if (check) {
                    parent.removeChild(target);
                } else {
                    parent.removeChild(target.parentElement as HTMLElement);

                }
                this._modSelector.removeElement({target,idValues,selRowCol}).then(async (res) => {
                    if (res) {
                        if(!selRowCol){
                            const ele = res.ele as elementType;
                            if (!ele.placement) return;
                            this._modSelector.shiftPlace(ele.placement);

                        }
                    }
                });

            }
        });

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
  



    static hasBlog() {
        return new Promise(resolve => {
            if (typeof window !== "undefined") {
                const getBlog: string | null = localStorage.getItem("blog");
                if (getBlog) {
                    const blog = JSON.parse(getBlog) as blogType;
                    resolve(blog);

                }
            };
        }) as Promise<blogType | null>;
    }
   
   
    static btnInitialize() {
        const mainBtns = document.querySelectorAll("[is-button='true']");
        const arrBtns = [...mainBtns as any] as HTMLButtonElement[];
        arrBtns.forEach(btn => {
            if (btn) {
                btn.classList.remove("active");

            }
        });

    }
    static removeIcon(target: HTMLElement): HTMLElement {
        const icons = target.getElementsByTagName("I");
        ([...icons as any] as HTMLElement[]).forEach(icon => {
            if (icon) {
                target.removeChild(icon);
            }
        });
        return target
    };


    static cleanUp(parent: HTMLElement) {
        if(parent?.firstChild){
            while (parent.firstChild) {
                if (parent.lastChild) {
                    parent.removeChild(parent.lastChild);
                }
            }

        }
    }
    static slateColors() {
        const shades = ["#ffffff", "#f3f5f5", "#eaedee", "#eaedee", "#dde1e3", "#dde1e3", "#c6cdd1", "#b4bdc2", "#b4bdc2", "#bdc5c9", "#bdc5c9"];
        return shades
    }
    static removeLinks(target: HTMLElement) {
        const isPara = target.nodeName === "P" ;
        if (isPara) {
            const childs = ([...target.children as any] as HTMLElement[]);
            if (childs) {
                childs.forEach(child => {
                    if (child.nodeName === "LINK") {
                        target.removeChild(child);
                    }
                });
            }
        }
        return target;

    }
    static toggleActiveIcon(target: HTMLElement) {
        const classArr = [...target.classList as any] as string[];
        const isActive = classArr.includes("isActive");
        Main.icons.forEach(icon => {
            classArr.forEach(cl => {
                if (cl === icon.name && isActive) {
                    const getBtn = document.getElementById(icon.name);
                    if (getBtn) {
                        getBtn.classList.toggle("active");
                    }
                }
            });
        });
    }
    static getActives(): { isActive: boolean, item: HTMLElement }[] {
        const isActives = document.querySelectorAll("[is-element = 'true']");
        const arr: { isActive: boolean, item: HTMLElement }[] = [];
        if (isActives) {
            const convert = [...isActives as any] as HTMLElement[];
            convert.forEach(is_active => {
                const check = ([...is_active.classList as any] as string[]).includes("isActive");
                if (check) {
                    arr.push({ isActive: true, item: is_active });
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
    static addAttributeToChildren(target: HTMLElement, attr: { [key: string]: string }) {
        const key = Object.keys(attr)[0]
        const value = Object.values(attr)[0]
        const children = ([...target.children as any] as HTMLElement[]);
        children.forEach(child => {
            if (child) {
                let css = child.style.cssText;
                const cssArr = css.split(";");
                const cleanKeys=cssArr.filter(cl => (!cl.includes(key)));
                cleanKeys.push(`${key}:${value}`);
                css = cssArr.join(";");
                child.style.cssText = css;
            }
        });
    }



}
export const shades = ["grey", "none", "#ffffff", "#f3f5f5", "#eaedee", "#eaedee", "#dde1e3", "#dde1e3", "#c6cdd1", "#b4bdc2", "#b4bdc2", "#bdc5c9", "#bdc5c9"];
export const blueShades = ["blue", "none", "#E1EBEE", "#72A0C1", "#F0F8FF", "#00FFFF", "#7FFFD4", "#6CB4EE", "#0066b2", "#B9D9EB", "#00FFFF", "#00CED1", "#6082B6", "#5D76A9", "#AFEEEE"];
export default Main;
export const initMainBtns = Main.initMainBtns;
export const removeIcon = Main.removeIcon;
export const slateColors = Main.slateColors;
export const mainIcons = Main.icons;


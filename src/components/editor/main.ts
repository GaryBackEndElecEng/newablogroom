import {  blogType, navLinkBtnType, userType, } from "./Types";
import Header from "./header";
import ModSelector from "./modSelector";
import { FaHome, FaBlog, FaSign, FaComment, FaArrowCircleDown } from "react-icons/fa";

import { FaCreate, FaBtn } from "@/components/common/ReactIcons";
import DisplayBlog from "@/components/blog/displayBlog";
import { buttonReturn } from "../common/tsFunctions";
import Edit from "@/components/editor/edit";
import Service from "@/components/common/services";
import CustomHeader from "./customHeader";
import Misc, { mediaQueryType } from "../common/misc";
import Nav from "../nav/headerNav";
import AuthService from "../common/auth";
import { getErrorMessage } from "@/lib/errorBoundaries";
import ShapeOutside from "./shapeOutside";
import RegSignIn from "../nav/regSignin";

import CommonInfo from "../common/commonInfo";
import Toolbar from "../common/toolbar";


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
    public mainCont:HTMLElement;
    public textarea:HTMLElement;
    public topMain:HTMLElement;
    public toolbar:HTMLElement;
    constructor(private _modSelector: ModSelector, private _service: Service,private auth:AuthService, mainInject: HTMLElement,public _toolbar:Toolbar, public edit: Edit, private _user: userType, blog:blogType, header: Header, public customHeader: CustomHeader, displayBlog: DisplayBlog, public shapeOutside: ShapeOutside, public commonInfo: CommonInfo) {
        this._blog=blog;
        this._regSignin = new RegSignIn(this._modSelector, this._service, this._user);
        this.mainInjection = mainInject;
        Main.mainEntry=mainInject;
        this._displayBlog = displayBlog;
        this.bgColor = this._modSelector._bgColor;
        this.btnColor = this._modSelector.btnColor;
        this._edit = edit
        this.mainSetup = new MainSetup(this._modSelector);
        Main.main_css=blog?.cssText || ModSelector.main_css + "width:100%";
        Main.main_class= blog.class || ModSelector.main_class;
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
    get user(){
        return this._user;
    };
    set user(user:userType){
        this._user=user;
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
        const user = this.user;
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
        toolbar:HTMLElement|null,
        blog:blogType|null,
        user:userType|null
    }> {
        //----!!!!!NOTE:TOOLBAR IS INSERTED AT THE INDEX!!!!!!!-----////
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const status=this.auth._isAuthenticated;
        const isAuthenticated=status
        const user=this.auth.user;
        const css_col="display:flex;flex-direction:column;justify-content:flex-start;"
        if (parent) {
            Main.cleanUp(parent);
            Main.btnInitialize();
            this.topMain = document.createElement("article");
            this.topMain.className = "top-main";
            this.topMain.id = `topMain-blog-${this._modSelector.blog.id}`;
            this.topMain.style.cssText ="margin:0px;padding:0px;position:relative;width:100%;background-color:white;border-radius:15px;display:flex;flex-direction:column;";
            this.topMain.style.gap=less900 ? (less400 ? "3.5rem":"1.5rem"):"1rem";
            this.toolbar=document.createElement("div");
            this.toolbar.id="toolbar-main";
            this.toolbar.style.cssText=css_col + "width:100%;margin-inline:auto;";
            this.topMain.appendChild(this.toolbar);
            //----------------- Iphone adjustments---------------//
            const mediaTopMain390: mediaQueryType = {
                target: this.topMain,
                css_max_attribute: { "max-width": "370px", "height": "auto", "width": "100%", "font-size": "10px" },
                css_min_attribute: { "max-width": `auto`, "height": "auto", "width": "100%", "font-size": "auto" },
                minWidth: 400,
                maxWidth: 400
            }
            Misc.mediaQuery(mediaTopMain390)
            Main.topMain=this.topMain as HTMLElement;
            parent.appendChild(this.topMain);
            //----------------- Iphone adjustments---------------//
            parent.style.backgroundColor = this.bgColor;
            parent.style.paddingBottom = "1rem";
            parent.style.marginBottom = "1px;"
            this.mainCont = document.createElement("section");
            Main.container = document.createElement("section");
            this.mainCont.id = `main`;
            Main.container.id = `main`;
           this. mainCont.className = Main.main_class;
            Main.container.className = Main.main_class;
            Main.container.style.cssText = Main.main_css;
            this.mainCont.style.cssText = Main.main_css;
            this.mainCont.style.width = "100% !important";
            this._modSelector.blog.class = this.mainCont.className;
            this._modSelector.blog.cssText = this.mainCont.style.cssText;
            this._modSelector.blog.eleId = this.mainCont.id;
            const mediaMain390: mediaQueryType = {
                target: this.mainCont,
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
          
            const {mainHeader}= await this.header(this.mainCont);
            const {textarea}= await this.textArea(this.mainCont);
            this._toolbar.mainRowBtn({parent:this.toolbar,mainContainer:this.mainCont,textarea:this.textarea});
            
            this.topMain.appendChild(this.mainCont);
            this.mainCont.style.width = "100% !important";
            this.mainCont.classList.add("w-100");
            this.mainCont.appendChild(bottomMain);
            this.mainCont.id="main";
            //ASSIGNING Main.container()
            
            (Main.container as HTMLElement).style.width = "100% !important";
            Main.container=this.mainCont as HTMLElement;
            //ASSIGNING Main.container()
            const {footer}= await this.footer(bottomMain);
            this.mainBtnChoices({parent:bottomMain,isAuthenticated,user});
            this.hideShowBottom({ mainBottom: bottomMain, time: 500 })
            this.mainCont.animate([
                { transform: "scale(0.2)" },
                { transform: "scale(1)" },
            ], { duration: 1000, iterations: 1 });
            await this.localBlogLoad({mainCont:this.mainCont,textarea,footer,mainHeader,blog:this.blog,user:this.user});
                this.mainCont.style.width = "100% !important";
                return {mainCont:this.mainCont,textarea,footer,mainHeader,toolbar:this.toolbar,blog:this.blog,user:this.user}
          
        } else {
            alert("no parent");
        
        };
        return {mainCont:null,textarea:null,footer:null,mainHeader:null,toolbar:null,blog:null,user:null};
    }
    ////- MAIN INJECTOR ABOVE ----///////////////////////////
    //INITIALIZED

    ////- MAIN INJECTOR ABOVE ----///////////////////////////
    //INITIALIZED



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
        const cssTextarea = "margin-inline:auto;padding-inline:1rem;padding-block:1.5rem;margin-block:1rem;border:1px solid lightgrey; border-radius:4px;width:100%;height:110vh;box-shadow:1px 1px 4px 1px grey;overflow-y:scroll;display:block;position:relative;padding-block;1rem;padding-bottom:2rem;display:flex;align-items:stretch; flex-direction:column;gap:1rem;";
        
        this.textarea = document.createElement("div");
        this.textarea.setAttribute("contenteditable", "false");
        this.textarea.style.cssText = cssTextarea;
        this.textarea.style.paddingInline = less900 ? (less400 ? "0.25rem" : "0.5rem") : "1rem";
        this.textarea.style.width = "100%";
        this.textarea.style.flexDirection = "column";
        this.textarea.id = `textarea`;
        Main.textarea = document.createElement("div");
        Main.textarea.setAttribute("contenteditable", "false");
        Main.textarea.style.cssText = cssTextarea;
        Main.textarea.style.paddingInline = less900 ? (less400 ? "0.25rem" : "0.5rem") : "1rem";
        Main.textarea.style.width = "100%";
        Main.textarea.id = `textarea`;
        Main.textarea=this.textarea as HTMLElement;
        //ADD WORK DONE _edit.selEleGenerator(Main.textarea,blog)
        //ADD WORK DONE
        this._toolbar.mainColBtn({parent:this.textarea,mainContainer:parent,textarea:this.textarea})
        parent.appendChild(this.textarea);
       
        return Promise.resolve({textarea:this.textarea}) as Promise<{textarea:HTMLElement}>;
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
    };

 
    //GENERAL for showFinal(blog)
  



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
    };
   
   
    static btnInitialize() {
        const mainBtns = document.querySelectorAll("[is-button='true']");
        const arrBtns = [...mainBtns as any] as HTMLButtonElement[];
        arrBtns.forEach(btn => {
            if (btn) {
                btn.classList.remove("active");

            }
        });

    };


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
    };


    static slateColors() {
        const shades = ["#ffffff", "#f3f5f5", "#eaedee", "#eaedee", "#dde1e3", "#dde1e3", "#c6cdd1", "#b4bdc2", "#b4bdc2", "#bdc5c9", "#bdc5c9"];
        return shades
    };


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

    };


    static toggleActiveIcon(target: HTMLElement) {
        const classArr = [...target.classList as any] as string[];
        const isActive = classArr.includes("isActive");
        Toolbar.icons.forEach(icon => {
            classArr.forEach(cl => {
                if (cl === icon.name && isActive) {
                    const getBtn = document.getElementById(icon.name);
                    if (getBtn) {
                        getBtn.classList.toggle("active");
                    }
                }
            });
        });
    };


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

    };


    static replaceBgImage(colcss: string, url: string): string {
        let cssArr = colcss.split(";");
        cssArr = cssArr.filter(cl => (!(cl.includes("background-image"))))
        cssArr.push(`backgroung-image:url${url}`);
        colcss = cssArr.join(";");
        return colcss;
    };


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
    };



}
export const shades = ["grey", "none", "#ffffff", "#f3f5f5", "#eaedee", "#eaedee", "#dde1e3", "#dde1e3", "#c6cdd1", "#b4bdc2", "#b4bdc2", "#bdc5c9", "#bdc5c9"];
export const blueShades = ["blue", "none", "#E1EBEE", "#72A0C1", "#F0F8FF", "#00FFFF", "#7FFFD4", "#6CB4EE", "#0066b2", "#B9D9EB", "#00FFFF", "#00CED1", "#6082B6", "#5D76A9", "#AFEEEE"];
export default Main;
export const initMainBtns = Main.initMainBtns;
export const removeIcon = Main.removeIcon;
export const slateColors = Main.slateColors;



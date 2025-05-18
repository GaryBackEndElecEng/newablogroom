import { linkType, userType } from "@/components/editor/Types";
import ModSelector from "../editor/modSelector";
import AuthService from "../common/auth";
import Service from "../common/services";
import Misc from "../common/misc/misc";
import Header from "../editor/header";
import Meta from "../meta/meta";
import NavArrow from "./arrow";
import SignInAndUp from "./signinAndUp";
import BrowserType from "../common/browserType";
import MiddleLogo from "./middleLogo";
import styles from "./nav.module.css";

class MainHeader {
    public meta: Meta
    public readonly logo: string = "gb_logo.png";
    public readonly logoLarge: string = "./images/gb_logo_600.png";
    public static navUrl = [{ id: 0, name: "home", url: "/" }, { id: 1, name: "terms-of-service", url: "/termsOfServce" }, { id: 2, name: "blogs", url: "/blogs" }, { id: 3, name: "privacy", url: "/privacy" },]
    public static injector: HTMLElement;
    public static header: HTMLElement | null;
    public bgColor: string;
    public btnColor: string;
    public static mainHeader_css: string;
    // dataflow:Dataflow;
    public static readonly links: linkType[] = [{ name: "home", link: "/" }, { name: "editor", link: "/editor" }, { name: "blogs", link: "/blogs" }, { name: "posts", link: "/posts" }, { name: "charts", link: "/chart" }]
    public pic = "/images/gb_logo.png";
    public count: number;
    public pageCount: number;
    public textFlow: string;
    public _status: "authenticated" | "loading" | "unauthenticated";
    private _isSignedIn: boolean;
    public browser:BrowserType;
    public middleLogo:MiddleLogo;

    constructor(private _modSelector: ModSelector, private _service: Service, public navArrow: NavArrow, private auth: AuthService, public signinAndUp: SignInAndUp,) {
        this.bgColor = "#0C090A";
        this.btnColor = this._modSelector.btnColor;
        MainHeader.mainHeader_css = `width:100%;height:5vh;box-shadow:1px 1px 5px 1px black,-1px -1px 5px -1px black;margin-block:0px;position:relative;background:${this.bgColor};display:flex;justify-content:space-between;`;



        this.logo = "gb_logo.png";
        this.logoLarge = "./images/gb_logo_600.png"
        this.meta = new Meta();
        this.count = 0;
        this.pageCount = 0;
        this.textFlow = "Create your own flexible page to download."
        this._status = "unauthenticated";
        this.browser= new BrowserType(this.auth.user.id);
        this.middleLogo=new MiddleLogo(this.browser);
    };


    //---------------------GETTER SETTERS-----------------------//
    get status() {
        return this.auth.status;
    }
    set status(status: "authenticated" | "loading" | "unauthenticated") {
        this._status = status;
    }
    get isSignedIn() {
        return this.auth._isAuthenticated
    }
    //---------------------GETTER SETTERS-----------------------//


    //INJECTOR:headerInjector)
   async main(item: { parent: HTMLElement, user: userType, isAuthenticated: boolean }) {
        const { parent, user, isAuthenticated } = item;
        this.meta.checkPathname();// redirecting to error page if error
        //-----------------REPEAT CONTROL(ANIMATION)-------------------//
        const repeatCount=1
        const isRepeat=this.browser.repeatShowControl({repeatCount});
        const isRepeatAdmin=this.browser.repeatAdminControl({repeatCount});
       
        //-----------------REPEAT CONTROL(ANIMATION)-------------------//
        MainHeader.injector = parent;
        Header.cleanUpByID(parent, "navHeader");
        MainHeader.header = document.createElement("header");
        MainHeader.header.id = "navHeader";
        MainHeader.header.className=styles.mainHeader;
        const headerStart=document.createElement("div");
        headerStart.id="headerStart;"
        headerStart.className=styles.headerStart;
        const headerMiddle=document.createElement("div");
        headerMiddle.id="headerMiddle";
        headerMiddle.className=styles.headerMiddle;
        const headerEnd = document.createElement("div");
        headerEnd.id = "headerEnd";
        headerEnd.className=styles.headerEnd;
        MainHeader.header.appendChild(headerStart);
        MainHeader.header.appendChild(headerMiddle);
        MainHeader.header.appendChild(headerEnd);
        //signIn-out
        if (user.id === "") {
            // NOT SIGNEDIN=> SHOW SIGNIN && SIGNUP
           await this.signinAndUp.main({ parent: headerEnd ,navHeader:MainHeader.header,isRepeat}).then(async (_res) => {
                if (_res) {
                    _res.parent.appendChild(_res.container);
                }
            });
        }
        //signIn-out
        //NAV BUTTON
        const button = document.createElement("button");
        this.navArrow.rotateArrow({navHeader:MainHeader.header,headerStart, button, time: 800, user, isAuthenticated });//arrow navigator
        headerStart.appendChild(button);
        this.middleLogo.main({parent:headerMiddle});
        parent.appendChild(MainHeader.header);
        //NAV BUTTON
       await this.showRectDropDown({ parent: MainHeader.injector,headerMiddle,headerStart, headerEnd, user, count: 0, isSignedIn: isAuthenticated,isRepeat,isRepeatAdmin:isRepeatAdmin });
        //AUTH INJECTION UNDER MainHeader.header=document.querySelector(header#navHeader)

    };


    //AUTH:EXECUTOR: INJECTION:MainHeader.header=document.querySelector("header#navHeader") as HTMLElement
    async showRectDropDown(item: {
         parent: HTMLElement,
         headerStart: HTMLElement,
         headerMiddle:HTMLElement,
         headerEnd: HTMLElement, 
        user: userType | null,
         count: number,
         isSignedIn: boolean,
        isRepeat:boolean,
        isRepeatAdmin:boolean

     }) {
        const { parent, user, count, headerEnd, isSignedIn,isRepeat,headerMiddle,headerStart,isRepeatAdmin } = item;
        const url = new URL(window.location.href);
        const pathname = "/";
        const isTimeUp=isRepeat ? 5000 :1000;
        const isTimeDown=isRepeat ? 3000 :500;
        const time = url.pathname === "/" && user !== null ? isTimeUp : isTimeDown; //if home=> after drop-down (5000) else 1000

        const innerTime = time - 200
        await this.sleep({
            time: time,
            func: async () => {
                await this.asyncShowRectDrpDown({ parent, headerEnd,headerStart,headerMiddle, user, count, pathname, time, isSignedIn,isRepeat }).then(async (res) => {
                    if (res && res.count === 1) {
                        //GENERATES DROP-DOWN 'WELCOME"
                        await this.sleep({
                            time: innerTime,
                            func: async () => {
                                //RES.RECT EXIST IF PATHNAME MATCH

                                const check = res.parent.querySelector(`div#${res?.rect?.id}`) as HTMLElement;
                                if (check && res.isRepeat) {
                                    //REMOVES DROP-DOWN WELCOME
                                    res.parent.removeChild(check);
                                }

                                MainHeader.removeAllClass({ parent: res.parent, class_: "ablogroom" });
                                if (!res.isSignedIn && pathname==="/"){
                                    
                                    await this.ablogroom({ parent: res.headerMiddle, user: null })
                                
                                };//SHOWS IF USER===NULL}
                                //GENERATES DISPLAY PAGE COUNT(TOP-LEFT)
                                await this.genPageCount({ parent: res.headerStart, count });//PAGE COUNT ON HEADER
                                //GENERATES (IF USER IS SIGNED IN HIS SIGNED IN)
                                await this.signinAndUp.main({ parent: res.headerEnd,navHeader:res.parent,isRepeat:res.isRepeat }).then(async (res_) => {
                                    if (res_) {
                                        if (res_.isSignedIn) {
                                            this.navArrow.cleanUpByQueryKeep(res_.parent, "div#headerNav-signInDisplay-container"); //this cleans up but one
                                            const admin = res_.user?.admin;
                                            if (admin && res_.isAdminRepeat && url.pathname !=="/admin") {
                                                //ADMIN PRIVILEDGES
                                                Misc.msgSourceImage({ parent: res_.navHeader, msg: "You have admin Rights", src: this.logo,show:isRepeatAdmin, width: 125, quality: 75, time: 5200, cssStyle: { boxShadow: "1px 1px 12px 1px white", backgroundColor: "black", color: "white", inset: "680% 0% 70% 0%", position: "absolute" } });
                                            }
                                        }

                                    }
                                });
                            }
                        })
                    };
                });
            }
        });




    };


    async asyncShowRectDrpDown(item: {
         parent: HTMLElement,
         headerEnd: HTMLElement,
         headerStart: HTMLElement,
         headerMiddle: HTMLElement,
         user: userType | null,
         count: number,
         pathname: string,
         time: number,
         isSignedIn: boolean,
        isRepeat:boolean

     }) {
        //DISPLAY A BLOGROOM BLOCK ON LOAD
        //BLOGROOM BLOCK SHOWS ONLY @ HOME
        const { parent, headerEnd, user, count, pathname, time, isSignedIn,isRepeat,headerStart,headerMiddle } = item;
        let rectangle: HTMLElement | undefined;
        const less900 = window.innerWidth < 900;
        const less700 = window.innerWidth < 700;
        const less400 = window.innerWidth < 400;
        if (window.location.pathname === pathname && count === 0 && user) {

            this.count = count + 1;
            Header.cleanUpByID(parent, "rectangle");
            parent.style.zIndex = "";
            parent.style.position = "relative";
            rectangle = document.createElement("div");
            rectangle.id = "rectangle";
            rectangle.style.cssText = `margin-inline:auto;position:absolute; background:black;height:150px;display:flex;place-items:center;padding:2rem;padding-inline:6rem;color:white;top:0%;left:0%;right:0%;border-radius:0px 0px 12px 12px;z-index:200;text-wrap:pretty`;
            rectangle.style.width = less900 ? (less700 ? (less400 ? "100%" : "85%") : "80%") : "75%";
            if (isSignedIn) {
                const text = document.createElement("p");
                const fontSize = less900 ? (less400 ? "100%" : "225%") : "250%";
                text.style.cssText = `font-size:${fontSize};text-wrap:pretty;margin-inline:auto;`;
                const word = user.name ? ` welcome ${user.name.split(" ")[0]}` : `welcome ${user.email.split("@")[0]}`;
                text.textContent = word.toUpperCase();
                rectangle.appendChild(text);
            } else {
                this.nonSignedInWelcome({ rectangle, less900, less400 });
            };
            const cssStyle = { width: "100%", background: "#0C090A", color: "blue", "border-radius": "0px 0px 40px 40px", "paddingInline": "1rem" };
            if(isRepeat){

                parent.appendChild(rectangle);
                this.matches(rectangle, 900, cssStyle);
                rectangle.animate([
                    { transform: "translateY(-120%)" },
                    { transform: "translateY(0%)", color: "blue" },
                    { transform: "translateY(30%)", color: "blue" },
                    { transform: "translateY(50%)", color: "white" },
                    { transform: "translateY(50%)", color: "blue" },
                    { transform: "translateY(50%)", color: "white" },
                    { transform: "translateY(30%)", color: "blue" },
                    { transform: "translateY(10%)", color: "white" },
                    { transform: "translateY(0%)", color: "blue" },
                    { transform: "translateY(-120%)" },
                ], { duration: time, iterations: 1, "easing": "ease-in-out" });
            }

        };


        return Promise.resolve({ parent, headerEnd, rect: rectangle, user, count: count + 1, isSignedIn,isRepeat,headerStart,headerMiddle}) as Promise<{ parent: HTMLElement, headerEnd: HTMLElement, rect: HTMLElement | undefined, user: userType | null, count: number, isSignedIn: boolean,isRepeat:boolean,headerStart:HTMLElement,headerMiddle:HTMLElement}>;

    };




    async sleep({ time, func }: { time: number, func: () => Promise<void> }) {

        return Promise.resolve(setTimeout(func, time));
    };


    nonSignedInWelcome({ rectangle, less900, less400 }: { rectangle: HTMLElement, less900: boolean, less400: boolean }) {
        rectangle.style.height = less400 ? "220px" : "150px";
        const text = document.createElement("p");
        const fontSize = less900 ? (less400 ? "120%" : "225%") : "250%";
        text.style.cssText = `font-size:${fontSize};text-wrap:none;margin-inline:auto;line-height:1.75rem;width:100%;margin-inline:auto;text-wrap:nowrap;`;
        text.style.lineHeight = less400 ? "1rem" : "1.85rem";
        text.style.marginInline = less400 ? "0px" : "auto";
        const innerCont = document.createElement("div");
        innerCont.id = "nonSignedInWelcome-innerCont";
        innerCont.style.cssText = "display:flex;width:inherit;align-items:center;justify-content:space-around;height:inherit;";
        innerCont.style.flexDirection = less400 ? "column" : "row";
        innerCont.style.justifyContent = less400 ? "center" : "space-around";
        innerCont.style.alignItems = "center";
        const word = "THE BEST IN CANADA";
        text.textContent = word.toUpperCase();
        const textCont = document.createElement("div");
        textCont.className = "text-center";
        textCont.style.cssText = "display:flex;flex-direction:column;justify-content:center;align-items:center;margin-inline:auto;";
        textCont.style.height = less400 ? "50%" : "100%";
        const logoText = document.createElement("p");
        logoText.textContent = "www.ablogroom.com";
        logoText.className = "text-primary text-align-center text-center";
        const img = document.createElement("img");
        img.src = this.logoLarge;
        img.alt = "www.ablogroom.com";
        img.style.cssText = "aspect-ratio: 1/1;filter:drop-shadow(0 0 0.5rem white);border-radius:26%;border:none;";
        img.style.height = less400 ? "50%" : "100%";
        innerCont.appendChild(img);
        textCont.appendChild(text);
        textCont.appendChild(logoText);
        innerCont.appendChild(textCont);
        rectangle.appendChild(innerCont);
    };




    matches(target: HTMLElement, width: number, cssStyle: { [key: string]: string }) {
        const arrKey: { key: string, value: string }[] = [];
        for (const [key, value] of Object.entries(cssStyle)) {
            arrKey.push({ key: key, value: value })
        }

        const matches900 = window.matchMedia(`(max-width:${width}px)`);
        if (matches900.matches) {
            for (const key of Object.keys(target.style as CSSStyleDeclaration)) {
                arrKey.map(item => {
                    if (item.key === key) {
                        target.style[key] = item.value;
                    }
                });
            }
        }
    };


    ablogroom(item: { parent: HTMLElement, user: userType | null }): Promise<{ parent: HTMLElement }> {
        const { parent, user } = item;
        if (!user && window.location.pathname==="/") {
            ///----ONLY SHOW IF NOT LOGGED IN----//////
            Header.cleanUpByID(parent, "ablogroom");
            parent.style.zIndex = '';
            const container = document.createElement("div");
            container.className = "ablogroom";
            const width = window.innerWidth;
            const inst = width < 900 ? 34 : 43;
            container.style.cssText = `color:white;position:absolute;inset:20% ${inst}%;order:2;`;
            container.id = "ablogRoom";
            const text = document.createElement("p");
            text.className = "text-center";
            text.style.cssText = "text-align:center;padding-inline:1rem;margin-inline:auto;font-size:110%;letter-spacing:0.15rem;margin-inline:auto;";
            text.textContent = "Ablogroom";
            text.className = "lobster";
            container.appendChild(text);
            parent.appendChild(container);
            text.animate([
                { opacity: 0, letterSpacing: "3rem", transform: "scale(1.05)" },
                { opacity: 1, letterSpacing: "0.15rem", transform: "scale(1)" },
            ], { duration: 1500, iterations: 1 });
            Misc.matchMedia({ parent: container, maxWidth: 400, cssStyle: { inset: "20% 34%" } });
            Misc.matchMedia({ parent: text, maxWidth: 400, cssStyle: { fontSize: "100%" } });
        }
        return Promise.resolve({ parent }) as Promise<{ parent: HTMLElement }>;

    };

    async genPageCount(item: { parent: HTMLElement, count: number,}): Promise<void> {
        const { parent, count } = item;
        if (typeof window === "undefined") return;
        const less900 = window.innerWidth < 900;
        const less400 = window.innerWidth < 400;


        const pg = window.location.pathname;
        if (count > 0) return;
        //BELOW EXTRACTS BLOG OR POST NUMBER BLOG/#NUM => NAME:BLOG, NUM=>\d+ ( full digit)
        const blog_id = MainHeader.getBlogPostID({ pathname: pg }).name === "blog" ? MainHeader.getBlogPostID({ pathname: pg }).num : undefined;
        const post_id = MainHeader.getBlogPostID({ pathname: pg }).name === "post" ? MainHeader.getBlogPostID({ pathname: pg }).num : undefined;
       const isPage=!!(this.meta.pages.find(async (page) => {
            if ((page.match.test(pg))) {
                   return page;
                }
            }));
                if(!isPage) return
                this.pageCount++;
                await this._service.getPageCount({ page: pg, blog_id, post_id }).then(async (res) => {
                    if (res) {
                        const count_ = (res.count) || 0;
                     this.pageCountMain({parent,name:res.name,count:count_,less400,less900});
                   
                    }
                });
      



    };


    pageCountMain({parent,name,count,less400,less900}:{parent:HTMLElement,less400:boolean,less900:boolean,name:string,count:number}):{pageCountContainer:HTMLElement}{
        if(name==="/") name="/home";
        Header.cleanUpByID(parent, "genPageCount-main");
        const container = document.createElement("div");
        container.id = "genPageCount-main";
        container.className=styles.pageCountMain;
        const text = document.createElement("small");
        text.id = "genPageCount-inner-text";
        text.style.cssText = "color:#0CAFFF;font-size:10px;font-weight:bold;";
        text.textContent = `${name.split("").slice(0,9).join("")}:`;
        const count_ = document.createElement("small");
        count_.id = "genPageCount-inner-count";
        count_.style.cssText = "color:white;font-size:10px;font-weight:bold;"
        count_.innerHTML = `<span style="color:#0CAFFF;">:, </span>${count}`;
        text.style.fontSize = less900 ? (less400 ? "70%" : "90%") : "100%";
        count_.style.fontSize = less900 ? (less400 ? "70%" : "90%") : "100%";
        container.appendChild(text);
        container.appendChild(count_);
        parent.appendChild(container);
        Misc.growIn({ anchor: container, scale: 0.2, opacity: 0, time: 500 });
        return {pageCountContainer:container}
    };





    static closeNav(logoCont: HTMLElement) {
        //THIS CLOSES THE NAV IF OPEN AND MOUSECLICK IS DETECTED ON BODY
        document.body.addEventListener("click", (e: MouseEvent) => {
            const checkOne = ([...document.body.classList as any] as string[]).includes("logoCont");
            if (e) {
                const invPad = logoCont.querySelector("div.navOn") as HTMLElement;
                if (checkOne && invPad) {
                    ([...invPad.children as any] as HTMLElement[]).map(child => {
                        if (child && child.id === "dropdown-container") {
                            child.animate([
                                { transform: "translateX(0%)", opacity: "1" },
                                { transform: "translateX(-100%)", opacity: "0" },
                            ], { duration: 400, iterations: 1 });
                            setTimeout(() => {
                                invPad.removeChild(child);
                                invPad.style.left = "-190px";
                            }, 380);
                        }
                    });
                }
            }
        });

    }

    static slateColors() {
        const shades = [
            { color: "#f3f5f5", box: "1px 1px 3px 1px #f3f5f5, -1px -1px 3px -1px black", borderRadius: "0%" },
            { color: "#eaedee", box: "1px 1px 3px 1px #bdc5c9, -1px -1px 3px -1px black", borderRadius: "5%" },
            { color: "#dde1e3", box: "1px 1px 3px 1px #b4bdc2, -1px -1px 3px -1px black", borderRadius: "10%" },
            { color: "#dde1e3", box: "1px 1px 3px 1px #c6cdd1, -1px -1px 3px -1px black", borderRadius: "15%" },
            { color: "#c6cdd1", box: "1px 1px 3px 1px #dde1e3, -1px -1px 3px -1px black", borderRadius: "20%" },
            { color: "#b4bdc2", box: "1px 1px 3px 1px #b4bdc2, -1px -1px 3px -1px #b4bdc2", borderRadius: "25%" },
            { color: "#bdc5c9", box: "1px 1px 3px 1px #eaedee, -1px -1px 3px -1px black", borderRadius: "30%" },
            { color: "#f3f5f5", box: "1px 1px 3px 1px #283845, -1px -1px 3px -1px #283845", borderRadius: "35%" },
            { color: "#555D5F", box: "1px 1px 3px 1px #263542, -1px -1px 3px -1px #263542", borderRadius: "40%" },
            { color: "#202C39", box: "1px 1px 3px 1px #f3f5f5, -1px -1px 3px -1px black", borderRadius: "45%" },
            { color: "#263542", box: "1px 1px 3px 1px #f3f5f5, -1px -1px 3px -1px black", borderRadius: "50%" },
            { color: "#283845", box: "1px 1px 3px 1px #f3f5f5, -1px -1px 3px -1px black", borderRadius: "45%" },
            { color: "#b4bdc2", box: "1px 1px 3px 1px #b4bdc2, -1px -1px 3px -1px #b4bdc2", borderRadius: "40%" },
            { color: "#bdc5c9", box: "1px 1px 3px 1px #eaedee, -1px -1px 3px -1px black", borderRadius: "35%" },
            { color: "#bdc5c9", box: "1px 1px 3px 1px #f3f5f5, -1px -1px 3px -1px black", borderRadius: "30%" },
            { color: "#b4bdc2", box: "1px 1px 3px 1px #bdc5c9, -1px -1px 3px -1px black", borderRadius: "25%" },
            { color: "#dde1e3", box: "1px 1px 3px 1px #b4bdc2, -1px -1px 3px -1px black", borderRadius: "20%" },
            { color: "#dde1e3", box: "1px 1px 3px 1px #c6cdd1, -1px -1px 3px -1px black", borderRadius: "15%" },
            { color: "#c6cdd1", box: "1px 1px 3px 1px #dde1e3, -1px -1px 3px -1px black", borderRadius: "10%" },
            { color: "#eaedee", box: "1px 1px 3px 1px #b4bdc2, -1px -1px 3px -1px #b4bdc2", borderRadius: "5%" },
            { color: "#f3f5f5", box: "1px 1px 3px 1px #eaedee, -1px -1px 3px -1px black", borderRadius: "0%" },
        ];
        return shades
    };
    static cleanUp(parent: HTMLElement) {
        while (parent.firstChild) {
            if (parent.lastChild) {
                parent.removeChild(parent.lastChild);
            }
        }
    }
    static cleanUpOnId(parent: HTMLElement, id: string) {
        const getItem = parent.querySelector(`#${id}`);
        if (getItem) {
            parent.removeChild(getItem);
        }
    }
    static chechChildExist(parent: HTMLElement, target: HTMLElement) {
        ([...parent.children as any] as HTMLElement[]).map(child => {
            if (child && (child.id === target.id || child === target)) {
                return true
            }
        });
        return false;
    }
    static removeAllClass(item: { parent: HTMLElement, class_: string }) {
        const { parent, class_ } = item;
        const ablogRoomtext = parent.querySelectorAll(`.${class_}`) as unknown as HTMLElement[];
        ([...ablogRoomtext]).map(html => {
            if (html) {
                html.remove();
            }
        });
    }
    static getBlogPostID(item: { pathname: string }): { name: string, num: number | undefined } {
        //THIS RETURNS A THE ID TO THE PAGE (BLOG/ID) OR POST/ID IF EXIST: NUMBER ELSE UNDEFINED
        const { pathname } = item;
        let nameNum: { name: string, num: number | undefined } = {} as { name: string, num: undefined };
        const regBlog_id: RegExp = /\/(blog)\/\d+/;
        const regPost_id: RegExp = /\/(post)\/\d+/;
        const match_num: RegExp = /\d+/;
        const arr: { name: string, reg: RegExp, match: RegExp, id: number | undefined }[] = [
            { name: "blog", reg: regBlog_id, match: match_num, id: undefined },
            { name: "post", reg: regPost_id, match: match_num, id: undefined }
        ];
        arr.map(item_ => {
            if (item_.reg.test(pathname)) {
                const match_s = RegExp(item_.reg).exec(pathname) as any;
                const match_number = match_s[0].match(item_.match) as any;
                const int_ = parseInt(match_number[0])
                if (!isNaN(int_)) {
                    nameNum = { name: item_.name, num: int_ };
                }
            }
        });
        return nameNum
    }


}

export default MainHeader;
export const cleanUp = MainHeader.cleanUp;
export const cleanUpOnId = MainHeader.cleanUpOnId;
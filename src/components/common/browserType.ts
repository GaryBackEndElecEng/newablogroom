import Header from "../editor/header";
import { pageType, stateType, useAgentDataType } from "../editor/Types";



class BrowserType {
    public static readonly pages: pageType[] = [
        {reg:/(?!\/)(editor)/, id: 1, pathname: "/editor",pagename:"editor" },
        {reg:/(?!\/)(posts)/, id: 2, pathname: "/posts",pagename:"posts" },
        {reg:/(?!\/)(blogs)/, id: 3, pathname: "/blogs",pagename:"blogs" },
        {reg:/(?!\/)(chart)/, id: 4, pathname: "/chart",pagename:"chart" },
        {reg:/(?!\/)(post)\/\d+/, id: 5, pathname: "/post/",pagename:"post" },
        {reg:/(?!\/)(blog)\/\d+/, id: 6, pathname: "/blog/",pagename:"blog" },
        {reg:/(?!\/)(admin)/, id: 7, pathname: "/admin",pagename:"admin" },
        {reg:/(?!\/)(printblog)/, id: 8, pathname: "/printblog",pagename:"printblog" },
        {reg:/(?!\/)(policy)/, id: 9, pathname: "/policy",pagename:"policy" },
        {reg:/(?!\/)(quote)/, id: 10, pathname: "/quote",pagename:"quote" },
        {reg:/(?!\/)(register)/, id: 11, pathname: "/register",pagename:"register" },
        {reg:/(?!\/)(signin)/, id: 12, pathname: "/signin",pagename:"signin" },
        {reg:/(?!\/)(termsOfService)/, id: 13, pathname: "/termsOfService",pagename:"termsOfAervice" },
        {reg:/(?!\/)(error_page)/, id: 14, pathname: "/error_page",pagename:"error_page" },
        {reg:/(?!\/)/, id: 0, pathname: "/",pagename:"" },


    ];
    _keywords: string[];
    list: { name: string, func: (name: string) => boolean }[];
    public readonly pagename: string = window.location.pathname;
    public _user_id: string | null;
    constructor(user_id: string | undefined) {
        this.pagename = window.location.pathname;
        this._user_id = user_id || null;
        this._keywords = ["Mozilla", "AppleWebKit", "Macintosh", "Safari"];
        this.list = [
            { name: "IE", func: (name: string) => this.isIE(name) },
            { name: "Safari", func: (name: string) => this.isSafari(name) },
            { name: "Chrome", func: (name: string) => this.isChrome(name) },
            { name: "Firfox", func: (name: string) => this.isFirefox(name) },
            { name: "Edge", func: (name: string) => this.isEdge(name) },
        ]
    };


    ///GETTER SETTERS/////
    get user_id() {
        return this._user_id || "";
    };
    set user_id(user_id: string) {
        this._user_id = user_id
    };

    ///GETTER SETTERS/////




    main(item: { parent: HTMLElement, navigator: string }): boolean {
        //RETURNS TRUE IF THE BROWSER IS COMPATIBLE
        const { parent, navigator } = item;
        const navs = navigator.split(" ");
        const word = navs.find(wd => (this._keywords.map(key => (wd.includes(key)))));
        const retName: string[] = [];
        if (word) {

            const bool = this.agentHas(word)
            if (bool) {

                this.list.map(isBool => {
                    if (isBool.func(word)) {
                        retName.push(isBool.name)
                    }
                });
            }
        }
        if (retName.length > 0) {
            return true
        } else {
            this.showMessage({ parent });
            return false
        }

    };

    userAgentData({ parent, userAgentData, userAgent }: { parent: HTMLElement, userAgentData: useAgentDataType | undefined, userAgent: string }) {
        const check = this.pagename === "/editor";
        if (!userAgentData && check) {
            this.showMessage({ parent })
        }
    };


    pushHistory({ user_id,pathname}: { user_id: string | undefined,pathname:string }) {
        this.user_id = user_id || "";
        const states: stateType[] = [];
       
        
        // setTimeout(()=>{
            const pagename=pathname.split("/")[1];
        const getPage = BrowserType.pages.find(res => {
           if( res.reg.test(pathname)){
                return res
           };
        });
       
        if (getPage) {
            const getstates = localStorage.getItem("states");
          
            if (!getstates) {
                //NOT FOUND
                const state:stateType = { id: 0, page_id: getPage.id, pathname: pathname, user_id: user_id, pagename: pagename,count:1 };
                states.push(state);
                localStorage.setItem("states", JSON.stringify(states));
            } else {
                //FOUND
                let retStates = JSON.parse(getstates) as stateType[];
               if(user_id){
                retStates=retStates.map(kv=>({...kv,user_id:user_id}));
               };
                const remain=retStates.filter(kv=>(kv.page_id !==getPage.id));
                const state=retStates.find(kv=>(kv.page_id ===getPage.id));
                
                if(state){
                    state.count+=1;
                    retStates=[...remain,state];
                }else{
                    const state = { id: retStates.length, page_id: getPage.id, pathname: pathname, user_id: user_id, pagename: pagename,count:1 };
                    retStates.push(state);
                };
              
                localStorage.setItem("states", JSON.stringify(retStates))
            };

        };
    };


    getHistory(): stateType[] | null {
        const getstates = localStorage.getItem("states");
        if (getstates) {
            const states = JSON.parse(getstates) as stateType[];
            return states
        };
        return null
    };


    repeatShowControl({repeatCount}:{repeatCount:number}):boolean{
         //----------REPEAT PROCESS CONTROL----------//
         const pathname=window.location.pathname;
         const states=this.getHistory();
         const getState=states?.find(kv=>kv.pathname===pathname);
         if(getState){
            return getState.count <=repeatCount
         };
         return true;
         //----------REPEAT PROCESS CONTROL----------//
    };


    showMessage(item: { parent: HTMLElement }) {
        const { parent } = item;
        const time = 15200;
        const less900 = window.innerWidth < 900;
        const less400 = window.innerWidth < 400;
        const container = document.createElement("div");
        Header.cleanUpByID(parent, "browser-showMessage-container");
        container.id = "browser-showMessage-container";
        container.style.cssText = "position:absolute;margin-inline:auto;height:10vh;background-color:black;color:white;display:flex;place-items:center;box-shadow:1px 1px 12px 1px black;border-radius:12px;z-index:200;padding:1rem;min-height:20vh;";
        container.style.width = less900 ? (less400 ? "100%" : "75%") : "50%";
        container.style.maxWidth = less900 ? (less400 ? "400px" : "800px") : "900px";
        container.style.padding = less900 ? (less400 ? "1rem" : "2rem") : "3rem";
        container.style.inset = less900 ? (less400 ? "0%" : "0% 15% auto 15%") : "0% 15% auto 15%";
        const text = document.createElement("p");
        text.innerHTML = `This editor has been thoroughly tested in <span style=font-size:115%;font-weight:bold;> Google </span> and <span style=font-size:115%;font-weight:bold;>edge</span> environments. We are not sure about this environment. If you come accross issues, within this environment, please send us a note,,,thank you for using the Editor.`;
        container.appendChild(text);
        parent.appendChild(container);
        container.animate([
            { transform: "translateY(-100%)", opacity: "0" },
            { transform: "translateY(-10%)", opacity: "0.3" },
            { transform: "translateY(10%)", opacity: "0.7" },
            { transform: "translateY(30%)", opacity: "1" },
            { transform: "translateY(80%)", opacity: "1" },
            { transform: "translateY(120%)", opacity: "1" },
            { transform: "translateY(120%)", opacity: "1" },
            { transform: "translateY(120%)", opacity: "1" },
            { transform: "translateY(80%)", opacity: "1" },
            { transform: "translateY(30%)", opacity: "0.7" },
            { transform: "translateY(10%)", opacity: "0.5" },
            { transform: "translateY(0%)", opacity: "0.5" },
            { transform: "translateY(-100%)", opacity: "0" },
        ], { duration: time, iterations: 1 });
        setTimeout(() => {
            const isCont = parent.querySelector("div#browser-showMessage-container") as HTMLElement;
            if (isCont) {
                parent.removeChild(isCont);
            }
        }, time - 50);
    };


    agentHas(keyword: string) {
        return navigator.userAgent.toLowerCase().search(keyword.toLowerCase()) > -1;
    };


    isIE(keyword: string) {
        return !!document.DOCUMENT_NODE;
    };


    isSafari(keyword: string) {
        // Safari
        return this.agentHas(keyword) && !this.agentHas("Chrome") && !this.agentHas("CriOS");
    };


    isChrome(keyword: string) {
        //Chrome
        return this.agentHas("CriOS") || this.agentHas(keyword);
    };


    isFirefox(keyword: string) {
        //Firefox
        return this.agentHas(keyword) || this.agentHas("FxiOS") || this.agentHas("Focus");
    };


    isEdge(keyword: string) {
        //Edg
        return this.agentHas(keyword);
    };


};
export default BrowserType;
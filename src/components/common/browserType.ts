import Header from "../editor/header";
import Misc from "./misc";


class BrowserType {
    _keywords:string[];
    list:{name:string,func:(name:string)=>boolean}[];
    constructor(){
        this._keywords=["Mozilla","AppleWebKit","Macintosh","Safari"];
        this.list=[
            {name:"IE",func:(name:string)=>this.isIE(name)},
            {name:"Safari",func:(name:string)=>this.isSafari(name)},
            {name:"Chrome",func:(name:string)=>this.isChrome(name)},
            {name:"Firfox",func:(name:string)=>this.isFirefox(name)},
            {name:"Edge",func:(name:string)=>this.isEdge(name)},
        ]
    }
    main(item:{parent:HTMLElement,navigator:string}):boolean{
        //RETURNS TRUE IF THE BROWSER IS COMPATIBLE
        const {parent,navigator}=item;
        const navs=navigator.split(" ");
        const word=navs.find(wd=>(this._keywords.map(key=>(wd.includes(key)))));
        const retName:string[]=[];
        if(word){

            const bool= this.agentHas(word)
            if(bool){
    
                this.list.map(isBool=>{
                    if(isBool.func(word)){
                        retName.push(isBool.name)
                    }
                });
            }
        }
        if(retName.length>0){
            return true
        }else{
            this.showMessage({parent});
            return false
        }
       
    }

    showMessage(item:{parent:HTMLElement}){
        const {parent}=item;
        const time=10200;
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const container=document.createElement("div");
        Header.cleanUpByID(parent,"browser-showMessage-container");
        container.id="browser-showMessage-container";
        container.style.cssText="position:absolute;margin-inline:auto;height:10vh;background-color:black;color:white;display:flex;place-items:center;box-shadow:1px 1px 12px 1px black;border-radius:12px;z-index:200";
        container.style.width=less900 ? (less400 ? "100%":"75%"):"50%";
        container.style.maxWidth=less900 ? (less400 ? "400px":"800px"):"900px";
        container.style.padding=less900 ? (less400 ? "1rem":"2rem"):"3rem";
        container.style.inset=less900 ? (less400 ? "0%":"0% 15% 0% 15%"):"0% 15% 0% 15%";
        const text=document.createElement("p");
        text.textContent=` sorry, it seems that your browser does not support the recommended types such as:${this._keywords.join(",")}. because of this, the browser will not work properly. Sorry for the inconvenience,,,admin`;
        container.appendChild(text);
        parent.appendChild(container);
        container.animate([
            {transform:"translateY(-100%)",opacity:"0"},
            {transform:"translateY(-10%)",opacity:"0.3"},
            {transform:"translateY(10%)",opacity:"0.7"},
            {transform:"translateY(30%)",opacity:"1"},
            {transform:"translateY(80%)",opacity:"1"},
            {transform:"translateY(120%)",opacity:"1"},
            {transform:"translateY(120%)",opacity:"1"},
            {transform:"translateY(120%)",opacity:"1"},
            {transform:"translateY(80%)",opacity:"1"},
            {transform:"translateY(30%)",opacity:"0.7"},
            {transform:"translateY(10%)",opacity:"0.5"},
            {transform:"translateY(0%)",opacity:"0.5"},
            {transform:"translateY(-100%)",opacity:"0"},
        ],{duration:time,iterations:1});
        setTimeout(()=>{
            const isCont=parent.querySelector("div#browser-showMessage-container") as HTMLElement;
            if(isCont){
                parent.removeChild(isCont);
            }
        },time-100);
    }

    agentHas(keyword:string) {
        return navigator.userAgent.toLowerCase().search(keyword.toLowerCase()) > -1;
    }
    isIE(keyword:string) {
        return !!document.DOCUMENT_NODE;
    }
    isSafari(keyword:string) {
        // Safari
        return  this.agentHas(keyword) && !this.agentHas("Chrome") && !this.agentHas("CriOS");
    }
    isChrome(keyword:string) {
        //Chrome
        return this.agentHas("CriOS") || this.agentHas(keyword);
    }
    isFirefox(keyword:string) {
        //Firefox
        return this.agentHas(keyword) || this.agentHas("FxiOS") || this.agentHas("Focus");
    }
    isEdge(keyword:string) {
        //Edg
        return this.agentHas(keyword);
    }
};
export default BrowserType;
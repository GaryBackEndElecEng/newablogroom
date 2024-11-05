import { linkType, userType } from "@/components/editor/Types";
import Nav from "@/components/nav/headerNav";
import ModSelector from "../editor/modSelector";
import AuthService from "../common/auth";
import Service from "../common/services";
import User from "../user/userMain";
import Profile from "../editor/profile";
import Misc from "../common/misc";
import Header from "../editor/header";
import Dataflow from "../common/dataflow";
import Meta from "../meta/meta";
import NavArrow from "./arrow";
import RegSignIn from "./regSignin";
import { Session } from "next-auth";

class MainHeader{
    meta:Meta
    logo:string;
    static navUrl=[{id:0,name:"home",url:"/"},{id:1,name:"terms-of-service",url:"/termsOfServce"},{id:2,name:"blogs",url:"/blogs"},{id:3,name:"privacy",url:"/privacy"},]
static injector:HTMLElement;
static header:HTMLElement|null;
bgColor:string;
btnColor:string;
static mainHeader_css:string;
// dataflow:Dataflow;
static links:linkType[]=[{name:"home",link:"/"},{name:"editor",link:"/editor"},{name:"blogs",link:"/blogs"}]
pic="/images/gb_logo.png";
count:number;
pageCount:number;
textFlow:string;
_status:"authenticated" | "loading" | "unauthenticated";
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private nav:Nav,private _navArrow:NavArrow){
        this.bgColor="#0C090A";
        this.btnColor=this._modSelector.btnColor;
        MainHeader.mainHeader_css=`width:100%;height:5vh;box-shadow:1px 1px 5px 1px black,-1px -1px 5px -1px black;margin-block:0px;position:relative;background:${this.bgColor};display:flex;justify-content:space-between;`;
        
        // this.dataflow= new Dataflow(this._service);
        this.logo="gb_logo.png"
        this.meta=new Meta();
       this.count=0;
       this.pageCount=0;
       this.textFlow="Create your own flexible page to download."
       this._status="unauthenticated";
    }
    //---------------------GETTER SETTERS-----------------------//
    get status(){
        return this._status;
    }
    set status(status:"authenticated" | "loading" | "unauthenticated"){
        this._status=status;
    }
    //---------------------GETTER SETTERS-----------------------//
    //INJECTOR:headerInjector)
      main(item:{parent:HTMLElement}){
        const {parent}=item;
        this.meta.checkPathname();// redirecting to error page if error
        MainHeader.injector=parent;
        //SETTING WIDTH
        let width_:number;
        if(typeof window !=="undefined"){
            width_=window.innerWidth <983 ? 99 : 100;
            MainHeader.injector.style.width=`${width_}%`;
        }
        Header.cleanUpByID(parent,"navHeader");
        MainHeader.header=document.createElement("header");
        MainHeader.header.id="navHeader"
        parent.style.zIndex="0;"
        MainHeader.header.style.cssText=MainHeader.mainHeader_css;
        const button=document.createElement("button");
        this._navArrow.rotateArrow({button,time:800});//arrow navigator
        MainHeader.header.appendChild(button);
        parent.appendChild(MainHeader.header);
          //AUTH INJECTION UNDER MainHeader.header=document.querySelector(header#navHeader)
  
    }
    //AUTH:EXECUTOR: INJECTION:MainHeader.header=document.querySelector("header#navHeader") as HTMLElement
    showRectDropDown(item:{parent:HTMLElement,user:userType|null,count:number}){
        const {parent,user,count}=item;
        const url=new URL(window.location.href);
        const pathname="/";
        const time=url.pathname === "/" ? 5000 : 1000; //if home=> after drop-down (5000) else 1000
        setTimeout(()=>{
            MainHeader.header=parent.querySelector("header#navHeader") as HTMLElement;
            if(!MainHeader.header && count >0) return
            this.asyncShowRectDrpDown({parent:MainHeader.header as HTMLElement,user,count,pathname,time}).then(async(res)=>{
                if(res){
                    //IF PATHNAME DOES NOT MATCH THEN RES.RECT DOES NOT EXIST
                    setTimeout(async()=>{
                        //RES.RECT EXIST IF PATHNAME MATCH
                        if(res.rect){
                            const check=res.parent.querySelector(`div#${res.rect.id}`) as HTMLElement;
                            if(check){
                                res.parent.removeChild(check);
                            }
                            // Header.cleanUpByID(parent,"ablogroom");
                            MainHeader.removeAllClass({parent:res.parent,class_:"ablogroom"});
                            await this.ablogroom({parent:res.parent,user:null});//SHOWS IF USER===NULL
                        }
                        
                        this.genPageCount({parent:res.parent,count});
                        await this.nav.signInDisplay(res.parent,res.user).then(async(res_)=>{
                            //ONLY GENERATES IF USER EXIST ( user !==null)
                            if(res_ && res_.user){
                                    if(res_.user && res_.parent){
                                        const admin=res_.user.admin;
                                        if(admin){
                                            Misc.msgSourceImage({parent:res_.parent,msg:"You have admin Rights",src:this.logo,width:125,quality:75,time:2200,cssStyle:{boxShadow:"1px 1px 12px 1px white",backgroundColor:"black",color:"white",inset:"680% 0% 70% 0%"}});
                                        }
                                    }
                            }
                            });
                    },time-20);
    
                }
            });
        },time);
    }
    asyncShowRectDrpDown(item:{parent:HTMLElement,user:userType|null,count:number,pathname:string,time:number}): Promise<{
        parent: HTMLElement;
        rect: HTMLElement|undefined;
        user: userType | null;
    }> {
        //DISPLAY A BLOGROOM BLOCK ON LOAD
        //BLOGROOM BLOCK SHOWS ONLY @ HOME
        const {parent,user,count,pathname,time}=item;
        let rectangle:HTMLElement|undefined;
        const less900=window.innerWidth < 900;
        const less700=window.innerWidth < 700;
        const less400=window.innerWidth < 400;
        if(window.location.pathname===pathname && count===0){
            this.count=count + 1;
            Header.cleanUpByID(parent,"rectangle");
            parent.style.zIndex="";
            parent.style.position="relative";
            let word:string;
            rectangle=document.createElement("div");
            rectangle.id="rectangle";
            rectangle.style.cssText=`margin-inline:auto;position:absolute; background:black;height:150px;display:flex;place-items:center;padding:2rem;padding-inline:6rem;color:white;top:0%;left:0%;right:0%;border-radius:0px 0px 12px 12px;z-index:200;text-wrap:pretty`;
            rectangle.style.width=less900 ? (less700 ? (less400 ? "100%":"85%") :"80%") : "75%";
    
            const text=document.createElement("p");
            if(user && user.id){
                const fontSize=less900 ? (less400 ? "100%" : "225%") :"250%";
                word=user.name ? ` welcome ${user.name.split(" ")[0]}` : `welcome ${user.email.split("@")[0]}`;
                text.textContent=word.toUpperCase();
                text.style.cssText=`font-size:${fontSize};text-wrap:pretty;margin-inline:auto;`
            }else{
                const fontSize=less900 ? (less400 ? "150%" : "225%") :"300%";
                word="A Blog Room";
                text.textContent=word.toUpperCase();
                 text.style.cssText=`font-size:${fontSize};text-wrap:pretty;margin-inline:auto;`
            }
            rectangle.appendChild(text);
            const cssStyle={width:"100%",background:"#0C090A",color:"blue","border-radius":"0px 0px 40px 40px","paddingInline":"1rem"}
            parent.appendChild(rectangle);
            this.matches(rectangle,900,cssStyle);
            rectangle.animate([
                {transform:"translateY(-120%)"},
                {transform:"translateY(50%)",color:"blue"},
                {transform:"translateY(50%)",color:"white"},
                {transform:"translateY(50%)",color:"white"},
                {transform:"translateY(-120%)"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
           
        }
        return new Promise((resolve)=>{
           
                resolve({parent,rect:rectangle,user})
            
        }) as Promise<{parent:HTMLElement,rect:HTMLElement|undefined,user:userType|null}>;
        
    }
    matches(target:HTMLElement,width:number,cssStyle:{[key:string]:string}){
        const arrKey:{key:string,value:string}[]=[];
        for(const [key,value] of Object.entries(cssStyle)){
            arrKey.push({key:key,value:value})
        }

        const matches900=window.matchMedia(`(max-width:${width}px)`);
        if(matches900.matches){
            for(const key of Object.keys(target.style as CSSStyleDeclaration)){
               arrKey.map(item=>{
                   if(item.key===key){
                       target.style[key]=item.value;
                   }
               });
            }
        }
    }
   
    ablogroom(item:{parent:HTMLElement,user:userType|null}):Promise<{parent:HTMLElement}>{
        const {parent,user}=item;
        if(!user){
            ///----ONLY SHOW IF NOT LOGGED IN----//////
            Header.cleanUpByID(parent,"ablogroom");
            parent.style.zIndex='';
            const container=document.createElement("div");
            container.className="ablogroom";
            const width=window.innerWidth;
            const inst=width <900 ? 34 :43;
            container.style.cssText=`color:white;position:absolute;inset:20% ${inst}%;order:2;`;
            container.id="ablogRoom";
            const text=document.createElement("p");
            text.className="text-center";
            text.style.cssText="text-align:center;padding-inline:1rem;margin-inline:auto;font-size:110%;letter-spacing:0.15rem;margin-inline:auto;";
            text.textContent="Ablogroom";
            text.className="lobster";
            container.appendChild(text);
            parent.appendChild(container);
            text.animate([
                {opacity:0,letterSpacing:"3rem",transform:"scale(1.05)"},
                {opacity:1,letterSpacing:"0.15rem",transform:"scale(1)"},
            ],{duration:1500,iterations:1});
            Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{inset:"20% 34%"}});
            Misc.matchMedia({parent:text,maxWidth:400,cssStyle:{fontSize:"100%"}});
        }
        return new Promise((resolve)=>{
            resolve({parent})
        }) as Promise<{parent:HTMLElement}>;
        
    }
    genPageCount(item:{parent:HTMLElement,count:number}):void{
        const {parent,count}=item;
        if(typeof window ==="undefined") return;
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const pg=window.location.pathname;
        if(!pg || count >0) return;
        //ensuring to count page based on landed pages from match RegExp
        const blog_id=pg.split("/")[2] ? parseInt(pg.split("/")[2]) as number : undefined
        this.meta.pages.map(page=>{
            if((page.match.test(pg)) && this.pageCount===0){
                this.pageCount++;
                this._service.getPageCount(pg,blog_id).then(async(res)=>{
                    if(res){
                            Header.cleanUpByID(parent,"genPageCount-main");
                            let name=(res && res && res.name) ? res.name : "";
                            if(res.name==="/"){
                                name="/home"
                            }
                            const count_=(res && res && res.count) ? res.count : 0;
                            const container=document.createElement("div");
                            container.id="genPageCount-main";
                            container.style.cssText="position:relative;width:auto;height:auto;display:flex;justify-content:center;flex-direction:column;align-items:center;border-left:1px solid white;border-right:1px solid white;margin-left:5px;justify-self:start;";
                            container.style.left=less900 ? (less400 ? "0px" :"50px"):"90px";
                            container.style.transform=less900 ? (less400 ? "scale(0.6)" :"scale(0.7)"):"scale(1)";
                            const div=document.createElement("div");
                            div.id="genPageCount-inner";
                            div.style.cssText="margin:auto;display:flex;justify-content:center;gap:1rem;align-items:center;flex-direction:row;flex-wrap:wrap;"
                            const text=document.createElement("small");
                            text.id="genPageCount-inner-text";
                            text.style.cssText="color:#0CAFFF;font-size:10px;font-weight:bold;";
                            text.textContent=`${name} :`;
                            const count=document.createElement("small");
                            count.id="genPageCount-inner-count";
                            count.style.cssText="color:white;font-size:10px;font-weight:bold;"
                            count.innerHTML=`<span style="color:#0CAFFF;">#: </span>${count_}`;
                            text.style.fontSize=less900 ? (less400 ? "80%":"90%"):"100%";
                            count.style.fontSize=less900 ? (less400 ? "80%":"90%"):"100%";
                            div.appendChild(text);
                            div.appendChild(count);
                            container.appendChild(div);
                            parent.appendChild(container);
                            Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{transform:"scale(0.6)",left:"0px"}})
                            Misc.growIn({anchor:container,scale:0.2,opacity:0,time:500});
                        }
                    });
            }
        });

                
       
    }
   
    static closeNav(logoCont:HTMLElement){
        //THIS CLOSES THE NAV IF OPEN AND MOUSECLICK IS DETECTED ON BODY
        document.body.addEventListener("click",(e:MouseEvent)=>{
            const checkOne=([...document.body.classList as any] as string[]).includes("logoCont");
            if(e){
                const invPad=logoCont.querySelector("div.navOn") as HTMLElement;
                if(checkOne && invPad){
                    ([...invPad.children as any] as HTMLElement[]).map(child=>{
                        if(child && child.id==="dropdown-container"){
                            child.animate([
                                {transform:"translateX(0%)",opacity:"1"},
                                {transform:"translateX(-100%)",opacity:"0"},
                            ],{duration:400,iterations:1});
                            setTimeout(()=>{
                                invPad.removeChild(child);
                                invPad.style.left="-190px";
                            },380);
                        }
                    });
                }
            }
        });
        
    }

    static slateColors(){
        const shades=[
            {color:"#f3f5f5",box:"1px 1px 3px 1px #f3f5f5, -1px -1px 3px -1px black",borderRadius:"0%"},
            {color:"#eaedee",box:"1px 1px 3px 1px #bdc5c9, -1px -1px 3px -1px black",borderRadius:"5%"},
            {color:"#dde1e3",box:"1px 1px 3px 1px #b4bdc2, -1px -1px 3px -1px black",borderRadius:"10%"},
            {color:"#dde1e3",box:"1px 1px 3px 1px #c6cdd1, -1px -1px 3px -1px black",borderRadius:"15%"},
            {color:"#c6cdd1",box:"1px 1px 3px 1px #dde1e3, -1px -1px 3px -1px black",borderRadius:"20%"},
            {color:"#b4bdc2",box:"1px 1px 3px 1px #b4bdc2, -1px -1px 3px -1px #b4bdc2",borderRadius:"25%"},
            {color:"#bdc5c9",box:"1px 1px 3px 1px #eaedee, -1px -1px 3px -1px black",borderRadius:"30%"},
            {color:"#f3f5f5",box:"1px 1px 3px 1px #283845, -1px -1px 3px -1px #283845",borderRadius:"35%"},
            {color:"#555D5F",box:"1px 1px 3px 1px #263542, -1px -1px 3px -1px #263542",borderRadius:"40%"},
            {color:"#202C39",box:"1px 1px 3px 1px #f3f5f5, -1px -1px 3px -1px black",borderRadius:"45%"},
            {color:"#263542",box:"1px 1px 3px 1px #f3f5f5, -1px -1px 3px -1px black",borderRadius:"50%"},
            {color:"#283845",box:"1px 1px 3px 1px #f3f5f5, -1px -1px 3px -1px black",borderRadius:"45%"},
            {color:"#b4bdc2",box:"1px 1px 3px 1px #b4bdc2, -1px -1px 3px -1px #b4bdc2",borderRadius:"40%"},
            {color:"#bdc5c9",box:"1px 1px 3px 1px #eaedee, -1px -1px 3px -1px black",borderRadius:"35%"},
            {color:"#bdc5c9",box:"1px 1px 3px 1px #f3f5f5, -1px -1px 3px -1px black",borderRadius:"30%"},
            {color:"#b4bdc2",box:"1px 1px 3px 1px #bdc5c9, -1px -1px 3px -1px black",borderRadius:"25%"},
            {color:"#dde1e3",box:"1px 1px 3px 1px #b4bdc2, -1px -1px 3px -1px black",borderRadius:"20%"},
            {color:"#dde1e3",box:"1px 1px 3px 1px #c6cdd1, -1px -1px 3px -1px black",borderRadius:"15%"},
            {color:"#c6cdd1",box:"1px 1px 3px 1px #dde1e3, -1px -1px 3px -1px black",borderRadius:"10%"},
            {color:"#eaedee",box:"1px 1px 3px 1px #b4bdc2, -1px -1px 3px -1px #b4bdc2",borderRadius:"5%"},
            {color:"#f3f5f5",box:"1px 1px 3px 1px #eaedee, -1px -1px 3px -1px black",borderRadius:"0%"},
        ];
        return shades
    }
    static cleanUp(parent:HTMLElement){
        while(parent.firstChild){
            if(parent.lastChild){
            parent.removeChild(parent.lastChild);
            }
        }
    }
    static cleanUpOnId(parent:HTMLElement,id:string){
        const getItem=parent.querySelector(`#${id}`);
        if(getItem){
            parent.removeChild(getItem);
        }
    }
    static chechChildExist(parent:HTMLElement,target:HTMLElement){
        ([...parent.children as any] as HTMLElement[]).map(child=>{
            if(child && (child.id===target.id || child===target)){
                return true
            }
        });
        return false;
    }
    static removeAllClass(item:{parent:HTMLElement,class_:string}){
        const {parent,class_}=item;
        const ablogRoomtext=parent.querySelectorAll(`.${class_}`) as unknown as HTMLElement[];
        ([...ablogRoomtext]).map(html=>{
            if(html){
                html.remove();
            }
        });
    }
    
    
}

export default MainHeader;
export const cleanUp=MainHeader.cleanUp;
export const cleanUpOnId=MainHeader.cleanUpOnId;
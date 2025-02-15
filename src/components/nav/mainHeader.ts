import { linkType, userType } from "@/components/editor/Types";
import Nav from "@/components/nav/headerNav";
import ModSelector from "../editor/modSelector";
import AuthService from "../common/auth";
import Service from "../common/services";
import User from "../user/userMain";
import Profile from "../profile/profile";
import Misc from "../common/misc";
import Header from "../editor/header";
import Dataflow from "../common/dataflow";
import Meta from "../meta/meta";
import NavArrow from "./arrow";
import RegSignIn from "./regSignin";
import { Session } from "next-auth";
import MainFooter from "../footer/mainFooter";

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
static links:linkType[]=[{name:"home",link:"/"},{name:"editor",link:"/editor"},{name:"blogs",link:"/blogs"},{name:"posts",link:"/posts"},{name:"charts",link:"/chart"}]
pic="/images/gb_logo.png";
count:number;
pageCount:number;
textFlow:string;
_status:"authenticated" | "loading" | "unauthenticated";
    constructor(private _modSelector:ModSelector,private _service:Service,private _navArrow:NavArrow){
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
        const time=url.pathname === "/" && user ? 5000 : 1000; //if home=> after drop-down (5000) else 1000
        setTimeout(()=>{
            MainHeader.header=parent.querySelector("header#navHeader") as HTMLElement;
            if(!MainHeader.header && count >0) return
            this.asyncShowRectDrpDown({parent:MainHeader.header as HTMLElement,user,count,pathname,time}).then(async(res)=>{
                if(res && res.count===1){
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
                        }else{
                            //NOT SIGNED IN 
                            await this.ablogroom({parent:res.parent,user:null});//SHOWS IF USER===NULL
                        }
                        //signedin/not signed in BELOW
                        this.genPageCount({parent:res.parent,count});//PAGE COUNT ON HEADER
                        await this._navArrow.signInDisplay(res.parent,res.user).then(async(res_)=>{
                            //SHOWS LOGIN/USERNAME ON HEADER
                            //if user:shows user else shows LOGIN PAGE
                            if(res_ ){
                                    if(res_.user && res_.parent){
                                        this._navArrow.cleanUpByQueryKeep(res_.parent,"div#headerNav-signInDisplay-container"); //this cleans up but one
                                        const admin=res_.user.admin;
                                        if(admin){
                                            Misc.msgSourceImage({parent:res_.parent,msg:"You have admin Rights",src:this.logo,width:125,quality:75,time:2200,cssStyle:{boxShadow:"1px 1px 12px 1px white",backgroundColor:"black",color:"white",inset:"680% 0% 70% 0%"}});
                                        }
                                        // this.footer.centerBtnsRow({container:res_.centerBtnCont,status:"authenticated"});//footer shows logout
                                    }else{
                                        // this.footer.centerBtnsRow({container:res_.centerBtnCont,status:"unauthenticated"});//footer shows signin
                                    }
                            }
                            });
                    },time-500);
    
                }
            });
        },time);
    }
    asyncShowRectDrpDown(item:{parent:HTMLElement,user:userType|null,count:number,pathname:string,time:number}): Promise<{
        parent: HTMLElement;
        rect: HTMLElement|undefined;
        user: userType | null;
        count:number
    }> {
        //DISPLAY A BLOGROOM BLOCK ON LOAD
        //BLOGROOM BLOCK SHOWS ONLY @ HOME
        const {parent,user,count,pathname,time}=item;
        let rectangle:HTMLElement|undefined;
        const less900=window.innerWidth < 900;
        const less700=window.innerWidth < 700;
        const less400=window.innerWidth < 400;
        if(window.location.pathname===pathname && count===0 && user){
            this.count=count + 1;
            Header.cleanUpByID(parent,"rectangle");
            parent.style.zIndex="";
            parent.style.position="relative";
            rectangle=document.createElement("div");
            rectangle.id="rectangle";
            rectangle.style.cssText=`margin-inline:auto;position:absolute; background:black;height:150px;display:flex;place-items:center;padding:2rem;padding-inline:6rem;color:white;top:0%;left:0%;right:0%;border-radius:0px 0px 12px 12px;z-index:200;text-wrap:pretty`;
            rectangle.style.width=less900 ? (less700 ? (less400 ? "100%":"85%") :"80%") : "75%";
    
            const text=document.createElement("p");
            const fontSize=less900 ? (less400 ? "100%" : "225%") :"250%";
               const word=user.name ? ` welcome ${user.name.split(" ")[0]}` : `welcome ${user.email.split("@")[0]}`;
                text.textContent=word.toUpperCase();
                text.style.cssText=`font-size:${fontSize};text-wrap:pretty;margin-inline:auto;`
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
           
                resolve({parent,rect:rectangle,user,count:count+1})
            
        }) as Promise<{parent:HTMLElement,rect:HTMLElement|undefined,user:userType|null,count:number}>;
        
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
        const less375=window.innerWidth <375;

        const regBlog_id:RegExp=/(\/blog\/)[0-9]+/;
        const pg=window.location.pathname;
        if(!pg || count >0) return;
        //ensuring to count page based on landed pages from match RegExp
        const blog_id=MainHeader.getBlogPostID({pathname:pg}).name==="blog" ? MainHeader.getBlogPostID({pathname:pg}).num : undefined;
        const post_id=MainHeader.getBlogPostID({pathname:pg}).name==="post" ? MainHeader.getBlogPostID({pathname:pg}).num : undefined;
        this.meta.pages.map(page=>{
            if((page.match.test(pg)) && this.pageCount===0){
                this.pageCount++;
                this._service.getPageCount({page:pg,blog_id,post_id}).then(async(res)=>{
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
                            container.style.left=less900 ? (less400 ? (less375 ? "-10px" :"-2px"):"50px"):"90px";
                            container.style.transform=less900 ? (less400 ? (less375 ? "scale(0.4)" :"scale(0.5)") :"scale(0.7)"):"scale(0.8)";
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
    static getBlogPostID(item:{pathname:string}):{name:string,num:number|undefined}{
        //THIS RETURNS A THE ID TO THE PAGE (BLOG/ID) OR POST/ID IF EXIST: NUMBER ELSE UNDEFINED
        const {pathname}=item;
        let num:{name:string,num:number|undefined}={} as {name:string,num:undefined};
        const regBlog_id:RegExp=/\/(blog)\/[0-9]+/;
        const regPost_id:RegExp=/\/(post)\/[0-9]+/;
        const match_num:RegExp=/[0-9]+/;
        const arr:{name:string,reg:RegExp,match:RegExp,id:number|undefined}[]=[
            {name:"blog",reg:regBlog_id,match:match_num,id:undefined},
            {name:"post",reg:regPost_id,match:match_num,id:undefined}
        ];
        arr.map(item_=>{
            if(item_.reg.test(pathname)){
                const match_s=pathname.match(item_.reg) as any;
                const match_number=match_s[0].match(item_.match) as any;
                const int_=parseInt(match_number[0])
                    if(!isNaN(int_)){
                        num={name:item_.name,num:int_};
                    }
            }
        });
        return num
    }
    
    
}

export default MainHeader;
export const cleanUp=MainHeader.cleanUp;
export const cleanUpOnId=MainHeader.cleanUpOnId;
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
count:number=0;

    constructor(private _modSelector:ModSelector,private auth:AuthService,private _service:Service,private _user:User,private nav:Nav,private regSignin:RegSignIn,private _profile:Profile,private _navArrow:NavArrow){
        this.bgColor="#0C090A";
        this.btnColor=this._modSelector.btnColor;
        MainHeader.mainHeader_css=`width:100%;height:5vh;box-shadow:1px 1px 5px 1px black,-1px -1px 5px -1px black;margin-block:0px;position:relative;background:${this.bgColor};display:flex;justify-content:space-between;`;
        
        // this.dataflow= new Dataflow(this._service);
        this.logo="gb_logo.png"
        this.meta=new Meta();
       
    }
    textFlow="Create your own flexible page to download."
    //INJECTOR
    async main(parent:HTMLElement){
        this.meta.checkPathname();// redirecting to error page if error
        MainHeader.injector=parent;
        //SETTING WIDTH
        let width_:number;
        if(typeof window !=="undefined"){
            width_=window.innerWidth <983 ? 99 : 100;
            MainHeader.injector.style.width=`${width_}%`;
        }
        MainHeader.cleanUp(parent);
        MainHeader.header=document.createElement("header");
        MainHeader.header.id="navHeader"
        parent.style.zIndex="0;"
        MainHeader.header.style.cssText=MainHeader.mainHeader_css;
        const button=document.createElement("button");
        this._navArrow.rotateArrow({button,time:800});//arrow navigator
        MainHeader.header.appendChild(button);
        parent.appendChild(MainHeader.header);
          //ADMIN DISPLAY
          if(!MainHeader.header) return;
          //ADMIN DISPLAY
            if(window.location.pathname==="/"){
                //------USER----/////
                const user=this._user.user
                //------USER----/////
                //GENERAL INFO
                // (MainHeader.header as HTMLElement).appendChild(contact);
                await this.nav.signInDisplay(MainHeader.header as HTMLElement,this._user._user).then(async(res)=>{
                if(res){
                    if(res.parent ){
                        //NOT LOGGED IN
                        this.showAblogRoom({parent:res.parent,user:user}).then(async(res_)=>{
                            if(res_){
                                setTimeout(async()=>{
                                    res.parent.removeChild(res_.rec);
                                    if(res.user){
                                        //GENERAL INFO
                                            const admin=user.admin;
                                            if(admin){
                                                Misc.msgSourceImage({parent:res.parent,msg:"You have admin Rights",src:this.logo,width:125,quality:75,time:2200,cssStyle:{boxShadow:"1px 1px 12px 1px white",backgroundColor:"black",color:"white",inset:"680% 0% 70% 0%"}});
                                            }
                                    }else{
                                        //small ablogrooom signature shown
                                        await this.ablogroom({parent:res.parent,user:null});
                                            //page count shown
                                        }
                                        this.genPageCount(MainHeader.header as HTMLElement);
                                 },4970);
                            }
                        }); //drop-down

                    }
                }
                });
                
            }else{
                //other than "/" or home
                await this.nav.signInDisplay(MainHeader.header as HTMLElement,this._user._user).then(async(res)=>{
                    if(res){
                        if(res.parent ){
                            //NOT LOGGED IN
                            // this.genPageCount(MainHeader.header as HTMLElement);
    
                        }
                    }
                    });
            }
        
        
       
    }
    showAblogRoom(item:{parent:HTMLElement,user:userType}){
        //DISPLAY A BLOGROOM BLOCK ON LOAD
        const {parent,user}=item;
        parent.style.zIndex="";
        parent.style.position="relative";
        let word:string;
        const rectangle=document.createElement("div");
        rectangle.id="rectangle";
        rectangle.style.cssText=`margin-inline:auto;position:absolute; background:black;height:150px;display:flex;place-items:center;padding:2rem;padding-inline:6rem;color:white;top:0%;left:0%;right:0%;border-radius:0px 0px 12px 12px;z-index:200;text-wrap:pretty`;
        rectangle.style.width=window.innerWidth<900 ? (window.innerWidth <420 ? "100%":"85%") : "75%";

        const text=document.createElement("p");
        if(user && user.id){
            const fontSize=window.innerWidth <900 ? (window.innerWidth < 395 ? "100%" : "225%") :"250%";
            word=user.name ? ` welcome ${user.name}` : `welcome ${user.email}`;
            text.textContent=word.toUpperCase();
            text.style.cssText=`font-size:${fontSize};text-wrap:pretty;margin-inline:auto;`
        }else{
            const fontSize=window.innerWidth <900 ? (window.innerWidth < 400 ? "150%" : "225%") :"300%";
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
        ],{duration:5000,iterations:1,"easing":"ease-in-out"});
        return new Promise((resolve)=>{
            resolve({rec:rectangle})
        }) as Promise<{rec:HTMLElement}>;
        
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
            parent.style.zIndex='';
            const container=document.createElement("div");
            container.className="ablogroom";
            const width=window.innerWidth;
            const inst=width <900 ? 34 :43;
            container.style.cssText=`color:white;position:absolute;inset:20% ${inst}%;`;
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
    genPageCount(parent:HTMLElement):void{
        if(typeof window ==="undefined") return;
        
        const pg=window.location.pathname;
        if(!pg) return;
        //ensuring to count page based on landed pages from match RegExp
        const blog_id=pg.split("/")[2] ? parseInt(pg.split("/")[2]) as number : undefined
        this.meta.pages.map(page=>{
            if((page.match.test(pg)) && this.count===0){
                this.count++;
                // this._service.getPageCount(pg,blog_id).then(async(res)=>{
                //     if(res){
                //             Header.cleanUpByID(parent,"genPageCount-main");
                //             let name=(res && res && res.name) ? res.name : "";
                //             if(res.name==="/"){
                //                 name="/home"
                //             }
                //             const count_=(res && res && res.count) ? res.count : 0;
                //             const container=document.createElement("div");
                //             container.id="genPageCount-main";
                //             container.style.cssText="position:relative;width:auto;height:auto;display:flex;justify-content:center;flex-direction:column;align-items:center;border-left:1px solid white;border-right:1px solid white;min-width:90px;";
                //             const div=document.createElement("div");
                //             div.id="genPageCount-inner";
                //             div.style.cssText="margin:auto;display:flex;justify-content:center;gap:1rem;align-items:center;flex-direction:row;flex-wrap:wrap;"
                //             const text=document.createElement("p");
                //             text.id="genPageCount-inner-text";
                //             text.style.cssText="color:#0CAFFF;font-size:10px;font-weight:bold;";
                //             text.innerHTML=`<span style="color:white;">loc: </span>${name}`;
                //             const count=document.createElement("p");
                //             count.id="genPageCount-inner-count";
                //             count.style.cssText="color:white;font-size:10px;font-weight:bold;"
                //             count.innerHTML=`<span style="color:#0CAFFF;">#: </span>${String(count_)}`;
                //             div.appendChild(text);
                //             div.appendChild(count);
                //             container.appendChild(div);
                //             parent.appendChild(container);
                //             Misc.growIn({anchor:container,scale:0.2,opacity:0,time:500});
                //         }
                //     });
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
    
    
}

export default MainHeader;
export const cleanUp=MainHeader.cleanUp;
export const cleanUpOnId=MainHeader.cleanUpOnId;
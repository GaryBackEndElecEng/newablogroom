
import {FaCreate} from "@/components/common/ReactIcons";
import { FaArrowRight,FaFingerprint, FaInfoCircle, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Misc from "../common/misc";
import { buttonReturn } from "../common/tsFunctions";
import ModSelector from "../editor/modSelector";
import Nav from "../nav/headerNav";
import Service from "../common/services";
import MainHeader from "../nav/mainHeader";
import Dataflow from "../common/dataflow";
import Header from "../editor/header";
import RegSignIn from "../nav/regSignin";
import Features from "../home/feature";
import { userType } from "../editor/Types";
import AllMsgs from "../home/allMsgs";
import { FaGooglePlay, FaMobileScreen, FaRightLong } from "react-icons/fa6";
import styles from "./footer.module.css";
import AuthService from "../common/auth";
import CommonInfo from "../common/commonInfo";
import BrowserType from "../common/browserType";
import FirstTimeIntro from "../common/firstTimeIntro";




class MainFooter{
    public static entry:HTMLElement;
   public baseUrl:URL;
   public noteAddUrl:string;
   public closeInfoMsg:boolean;
   public centerBtnsParent:HTMLElement|null;
   public infoMsg:string;
   public bioPhrase:string;
   private _regSignin:RegSignIn;
   public thankYouImg:string;
   public readonly btnColor:string=Nav.btnColor;
   public readonly privacyUlr:string="/policy";
   public readonly policyUrl:string="/policy";
   public logoUrl:string;
   private _status:"authenticated" | "loading" | "unauthenticated";
    termsOfServiceUrl:string="/termsOfService";
    masterultilsUrl:string="https://www.masterultils.com";
    arrUrl:{name:string,link:string}[];
    public injector_:HTMLElement;
    public firstTimeIntro:FirstTimeIntro;



    constructor(private _modSelector:ModSelector,private _service:Service,injector:HTMLElement,private auth:AuthService,private _user:userType|null,public dataflow:Dataflow,public feature:Features,public allMsgs:AllMsgs,public commonInfo:CommonInfo,private browser:BrowserType){
        this.btnColor=Nav.btnColor
        this.injector_=injector;
        MainFooter.entry=injector;
        this.arrUrl=[
            {name:"masterconnect",link:"https://www.masterconnect.ca"},
            {name:"masterultils",link:this.masterultilsUrl},
            {name:"policy",link:"/policy"},
            {name:"privacy",link:"/termsOfService"},

        ];
        this.noteAddUrl="https://chromewebstore.google.com/detail/note-adder/ipdhlngobmbmoaoheaiflbdmgjmeeoad?hl=en-US&utm_source=ext_sidebar";
        this._regSignin= new RegSignIn(this._modSelector,this._service,this._user,this.auth.status);
        this.firstTimeIntro=new FirstTimeIntro();
        this.closeInfoMsg=false;
        this.centerBtnsParent=document.querySelector("div#footer-centerBtns-container");
        this._status="unauthenticated";
        this.infoMsg="The site uses both cookies and browser storage to ensure that your work is temporaryily saved and secure during your editing before saving your work to the server. <br/><span style='color:blue;font-weight:bold;background-color:white;padding-inline:2rem;border-radius:12px;line-height:2rem;'> We believe in securing your interests.</span> <br/><span style='font-size:120%;font-weight:bold;margin-top:1.25rem;padding-left:4rem;'> The Team.</span>"
        this.baseUrl=new URL(window.location.href);
        this.bioPhrase=`I am an ex Military Officer /Engineer turned developer who enjoys providing you with the best means of creating a great web-page and or a poster or advertising with the tools of exporting your work to suit your purpose. If you desire additional tools, then please don't hesitate on contacting us with your request.
        <hr style="width:80%;margin-inline:auto;margin-block:1rem;">
        `;
        this.thankYouImg="/images/thankYou.png";
        this.btnColor=Misc.btnColor
        this.privacyUlr="/policy";
        this.policyUrl="/policy";
        this.logoUrl="/images/gb_logo.png";
        this.termsOfServiceUrl="/termsOfService";
    }

    //-------GETTERS ------SETTERS------///
    get status(){
        return this.auth.status;
    }
    set status(status:"authenticated" | "loading" | "unauthenticated"){
        this._status=status;
       
    }
    get user(){
        return this._user;
    }
    //-------GETTERS ------SETTERS------///

    main(item:{injector:HTMLElement,isAuthenticated:boolean,user:userType}){
        const {injector,isAuthenticated,user}=item;
        this.status=isAuthenticated ? "authenticated" : "unauthenticated";
        const less900=window.innerWidth < 900;
        const less400= window.innerWidth < 400;
        MainFooter.cleanUp(injector);
        const container=document.createElement("section");
        container.id="mainFooter-container";
        container.className=styles.mainFooterCont;
        injector.appendChild(container);
        injector.appendChild(container);
        const repeatCount=0;
        const isRepeat=this.browser.homeShowControl({repeatCount});
        this.showStorageMsg({parent:container,isRepeat});
        const row=document.createElement("div");
        row.style.cssText="display:flex;justify-content:center;align-items:center;width:100%;min-height:15vh;height:auto;"
        row.id="row-mainFooter";
        const arr:string[]=["col-md-4 left-side","col-md-5 center","col-md-3 right-side"];
        Misc.matchMedia({parent:row,maxWidth:900,cssStyle:{flexDirection:"column",justifyContent:"center",alignItems:"center"}})
      
        arr.map((str,index)=>{
            const col=document.createElement("div");
            col.id=`col-mainFooter-${index}`;
            col.style.cssText="box-shadow:1px 1px 6px 1px white;position:relative;margin:auto;padding:0.5rem;";
            col.className=str;
            if(less900){
                col.style.minHeight= "20vh";
                col.style.height="auto";
                col.style.flex="0 0 100%";
                col.style.width="100%";
                row.style.flexDirection="column";
                if(str==="col-md-5 center"){
                    col.style.order="3";
                }else{
                    col.style.order=`${index}`;
                }
            }else{
                col.style.order="auto";
                col.style.minHeight= "20vh";
                col.style.height="auto";
                col.className=str;
                col.style.flex="1 0 auto";
                row.style.flexDirection="row";
                row.classList.add("row");
            }
            
            
            this.addElement({col,main:container,str,isAuthenticated,less400,less900,user});
            row.appendChild(col);
        });
      
        container.appendChild(row);
       
    };

   

    async addElement(item:{col:HTMLElement,main:HTMLElement,str:string,isAuthenticated:boolean,less400:boolean,less900:boolean,user:userType}){
        const {col,main,str,isAuthenticated,less400,less900,user}=item;
        const size:{width:string,height:string}= window.innerWidth <1000 ? {width:"60px",height:"60px"} : {width:"80px",height:"80px"};
        const container=document.createElement("div");
        container.id="addElement";
        container.style.cssText="margin:0px;padding:0px;position:relative;width:100%;height:100%;";
        switch(true){
            case str==="col-md-4 left-side":
            this.leftSide({col:container,main,size}).then(async(res)=>{
                if(res){
                    // DESCRIPTION
                    this.description(res.container,main);
                }
            });
            col.appendChild(container);
            return;
            case str==="col-md-5 center":
             this.centerSide({col:container,main,isAuthenticated,less400,less900,user});
            col.appendChild(container);
            return;
            case str==="col-md-3 right-side":
            this.rightSide({col:container,main,isAuthenticated});
            col.appendChild(container);
            return;
        }
    };



    leftSide(item:{col:HTMLElement,main:HTMLElement,size:{width:string,height:string}}):Promise<{container:HTMLElement}>{
        const {col,main,size}=item;
        const {width,height}=size;
        this.scrollToTop({parent:col});
        const container=document.createElement("div");
        container.id="left-container-row";
        container.classList.add("row");
        container.style.cssText="margin:0px;padding:0px;position:relative;gap:1rem;justify-content:space-around;display:flex;";
        //IMAGE AND TEXT WRAPPER
        const imgWrapper=document.createElement("div");
        imgWrapper.id="imgWrapper";
        imgWrapper.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer";
        imgWrapper.classList.add("col-lg-6");
        imgWrapper.style.flex="0 0 45%";
        //IMAGE CONTAINER
        const imgDiv=document.createElement("div");
        imgDiv.id="imgDiv";
        imgDiv.style.cssText="border-radius:50%;filter:drop-shadow(0 0 0.75rem white);position:relative;margin:1rem;display:flex;align-items:center;flex-direction:column;justify-content:center;order:-1;border:none;position:relative;";
        imgDiv.style.left="0px";
        imgDiv.style.width=width;
        imgDiv.style.height=height;
        //IMAGE
        const img=document.createElement("img");
        img.id="logo-img";
        img.src=this.logoUrl;
        img.alt="www.ablogroom.com";
        img.style.cssText="margin:auto;width::80px;height:80px;border-radius:inherit;filter:drop-shadow(0 0 0.75rem white);position:absolute;inset:0%;border:none;";
        img.style.top="0px";
        img.style.left="0px";
        img.style.width=width;
        img.style.height=height;
        //TITLE
        const text=document.createElement("p");
        text.textContent="www.ablogroom.com";
        text.classList.add("text-primary");
        text.style.cssText="font-size:14px;margin-top:0.25rem;";

        
        //APPENDING COMPONENTS
        imgDiv.append(img);
        Misc.btnHover({parent:imgDiv,bg:"white",color:"black",bRadius1:"50%",bRadius2:"25%",time:400})
        imgWrapper.append(imgDiv);
        imgWrapper.append(text);
        container.appendChild(imgWrapper);
        col.appendChild(container);
        imgWrapper.onclick=(e:MouseEvent)=>{
            if(e){
                this.allMsgs.advertise({col,main});
            }
        };
        return Promise.resolve({container}) as Promise<{container:HTMLElement}>;
    };



    centerSide(item:{col:HTMLElement,main:HTMLElement,isAuthenticated:boolean,less400:boolean,less900:boolean,user:userType}){
        const {col,main,isAuthenticated,less400,less900,user}=item;
        const container=document.createElement("div");
        container.style.cssText="margin:0px;padding:0px;position:relative;width:100%;min-height:10vh;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center";
        container.id="center";
        this.centerBtns({parent:container,main,isAuthenticated,user});//BUTTONS
        this.centerSideContent({parent:container,main,less400});
        this.copyRight({parent:container,main,less400,less900});
        col.appendChild(container);
    };



    rightSide(item:{col:HTMLElement,main:HTMLElement,isAuthenticated:boolean}){
        const {col,main,isAuthenticated}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const container=document.createElement("div");
        container.id="right";
        container.style.cssText="margin:0px;padding:0px;position:relative;";
        const innerContainer=document.createElement("div");
        innerContainer.id="innerContainer-rightSide";
        innerContainer.style.cssText="position:absolute; inset:0% 0% 0% 20%;min-height:10vh;margin-right:0.25rem;min-height:15vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-inline:1rem;";
        innerContainer.style.minHeight=less900 ? (less400 ? "18vh" :"16vh") :"16vh";
        this.rightSideContent({innerContainer,main,isAuthenticated});
        container.appendChild(innerContainer);
        Misc.matchMedia({parent:innerContainer,maxWidth:900,cssStyle:{"position":"absolute","inset":"1.5rem 0% 0% 10%","width":"auto"}});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"position":"relative","width":"100%","flexDirection":"column"}});
        Misc.matchMedia({parent:container,maxWidth:800,cssStyle:{"position":"relative","width":"100%","flexDirection":"row"}});
        Misc.matchMedia({parent:innerContainer,maxWidth:770,cssStyle:{"position":"absolute","inset":"0% 0% 0% 15%","marginRight":"0.5rem","width":"auto"}});
        this.privacy({parent:container,isAuthenticated})
        col.appendChild(container);
       
    };



    privacy(item:{parent:HTMLElement,isAuthenticated:boolean}){
        const {parent}=item;
        parent.style.position="relative";
        parent.style.zIndex="3";
       
        const flexDir=window.innerWidth <600 ? "flex-direction:row" :"flex-direction:column;"
        const overflow=window.innerWidth <600 ? "overflow-x:scroll":"overflow-y:scroll"
        const width=window.innerWidth < 900 ? (window.innerWidth <500 ? "270px" :"290px;") :"300px";
        const height=window.innerWidth < 900 ? (window.innerWidth <600 ? "175px" :"205px;") :"14vh";
        //CONTAINER
        const container=document.createElement("div");       
        container.style.cssText=`width:${width};max-height:${height};box-shadow:1px 1px 10px 1px white;position:absolute;display:flex;justisfy-content:center;gap:1rem;align-items:center;border-radius:7px;font-size:16px;z-index:2000;padding:1rem;${overflow};${flexDir}`;
        container.style.position="absolute";
        container.style.top="0%";
        container.id="privacy-container";
        container.style.transform=`scale(0)`;
        //ARROW CONTAINER
        //ARROW CONTAINER
        const arrCont=document.createElement("div");
        arrCont.id="arrCont";
        arrCont.style.cssText="position:absolute;top:0%;left:0%,right:75%;border-radius:20px;width:fit-content;display:flex;justify-content:center;align-items:center;gap:0.5rem;flex-direction:column;";
        const text=document.createElement("p");
        text.textContent="SITES";
        text.classList.add("text-primary")
        text.style.cssText="margin-inline:auto;text-decoration:underline;text-underline-offset:0.5rem;";
        arrCont.appendChild(text);
        const privArr=document.createElement("div");
        privArr.style.cssText="position:relative;padding:2px;border-radius:50%;box-shadow:1px 1px 10px 1px;#1F305E;text-align:center;display:flex;align-items:center;background-color:white;transform:translate(-3px,-5px);";
        privArr.style.color="blue";
        // privArr.style.transform=trans;
        //attching arrow
        FaCreate({parent:privArr,name:FaArrowRight,cssStyle:{fontSize:"20px",margin:"auto"}});
        arrCont.appendChild(privArr);
        //PRIVACY LINK
        const privAnc=document.createElement("a");
        privAnc.textContent="privacy policy"
        privAnc.href="#";
        privAnc.style.cssText="text-decoration:underline;text-underline-offset:1rem;";
        privAnc.onclick=()=>{
            const newUrl=new URL(window.location.href);
            window.open(new URL(this.privacyUlr,newUrl.origin).href,"_blank");
        }
        //POLICY LINK
        this.arrUrl.forEach((link)=>{
            const check=["/policy","/termsOfService"].includes(link.link);
            const anchor=document.createElement("a");
            anchor.textContent=link.name
            anchor.href="#";
            anchor.style.cssText="text-decoration:underline;text-underline-offset:1rem;padding-block:0.25rem;padding-inline:1.5rem;box-shadow:1px 1px 10px black,-2px -2px 10px 2px blue;border-radius:10px;";
            anchor.onclick=()=>{
                parent.style.zIndex="0";
                if(check){
                    const newUrl2=this.removeSlash({url:window.location.href});
                    const newUrl=new URL(newUrl2);
                    window.open(new URL(link.link,newUrl.origin).href,"_blank");
                }else{
                    window.open(link.link,"_blank")
                }
            }
            //HORIZONTAL LINE
            const line=document.createElement("hr");
            line.style.cssText="width:75%; background-color:white;margin-block:1rem;"
            anchor.appendChild(line);
            container.appendChild(anchor);
        });
        // APPENDING ARROW TO PARENT;
        parent.appendChild(arrCont);
        //CONTAINER EFFECT
        privArr.onclick=()=>{
            //APPENDING CONTAINER
            parent.appendChild(container);
            Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"flexDirection":"row","justifyContent":"space-around","margin-inline":"auto","overflowY":"auto","overflowX":"scroll",width:"250px"}})
            container.style.background="white";
            parent.style.zIndex="";
            parent.style.color="black";
            //SETTING INITIAL POSITION
            container.style.transform="scale(1)";
            container.style.zIndex="100";
            container.style.left="25%";
            container.style.transition="all 1s ease-in-out";
            container.classList.toggle("activate");
            const check=([...container.classList as any] as string[]).includes("activate");
            if(check){
                privArr.animate([
                    {transform:`rotate(0deg)`},
                    {transform:`rotate(180deg`}
                ],{duration:500,iterations:1,easing:"ease-in-out"});
                container.animate([
                    {transform:`scale(0)`,left:"0%",zIndex:"-1",background:"transparent"},
                    {transform:"scale(1)",left:"25%",zIndex:"100",background:"white"}
                ],{duration:500,iterations:1,easing:"ease-in-out"});
                setTimeout(()=>{
                    privArr.style.transform="rotate(180deg)";
                    privArr.style.color="white";
                    privArr.style.backgroundColor="black";
                    privArr.style.boxShadow="1px 1px 10px white";
                },480);
            }else{
                //REMOVING CONTAINER
                privArr.animate([
                    {transform:` rotate(180deg`},
                    {transform:` rotate(0deg)`},
                ],{duration:500,iterations:1,easing:"ease-in-out"});
                container.animate([
                    {transform:"scale(1)",left:"25%",background:"white"},
                    {transform:`scale(0)`,left:"0",background:"transparent"}
                ],{duration:500,iterations:1,easing:"ease-in-out"});
                setTimeout(()=>{
                    privArr.style.transform="rotate(00deg)";
                    privArr.style.color="blue";
                    privArr.style.backgroundColor="white";
                    privArr.style.boxShadow="1px 1px 10px black";
                    //CLEANUP
                    const check_container=([...parent.children as any] as HTMLElement[]).find(child=>(child.id==="privacy-container"));
                    if(check_container){
                        parent.removeChild(check_container);
                        parent.style.color="inherit";
                    }
                },480);
            }
        }
    };


    removeSlash(item:{url:string}):string{
        const {url}=item;
        let retStr=url;
        const match:{name:string,reg:RegExp}={name:"https://main",reg:/(https:\/\/main\.)/};
        if(match.reg.test(url)){
           const lts=url.split("");
           const len=lts.length;
           retStr=lts.slice(0,len-1).join("");
        }
        return retStr;
    };


    //LEFT SIDE
    description(row:HTMLElement,main:HTMLElement){
        const css_row="display:flex;justify-content:center;align-items:center;";
        const css_col="display:flex;justify-content:center;align-items:center;flex-direction:column;";
        const email_=this.allMsgs.Email;
        const phoneNum=this.allMsgs.telephone;
        const column=document.createElement("div");
        column.style.background="#34282C";
        column.style.color="white";
        column.style.cssText="padding:1rem;display:flex;justify-content:center;align-items:center;gap:1rem;flex-direction:column;order:1;";
        column.style.width="auto";
        column.style.maxHeight="15vh";
        column.style.flex=window.innerWidth <900 ? (window.innerWidth<400 ? "0 0 40%" : "0 0 35%") :"0 0 50%" ;
        column.classList.add("col-lg-6");
        Misc.matchMedia({parent:column,maxWidth:900,cssStyle:{"width":"auto","flexDirection":"row"}});
        //NAME
        const text=document.createElement("h6");
        text.style.cssText="padding-inline:0.5rem;cursor:pointer;";
        text.textContent="Developer";
        text.classList.add("growName");
        text.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,0);
                this.bio({css_row,css_col,email:email_,phoneNum});
            }
        });
        Misc.btnHover({parent:text,bg:"white",color:"black",bRadius1:"23px",bRadius2:"13px",time:500});
        //EMAIL
        const email=document.createElement("a");
        email.style.cssText="padding-inline:0.5rem;text-clip:clip;text-overflow:ellipsis;color:white;text-decoration:none;text-underline-offset:0.5rem;";
        email.href="mailto:masterconnect919@gmail.com";
        const mail="mail"
        email.textContent=`${mail.slice(0,15)}...`;
        //PHONE
        
        column.append(text);
        const mailPhoneWrapper=document.createElement("div");
        mailPhoneWrapper.id="mailPhoneWrapper";
        mailPhoneWrapper.style.cssText="display:inline-flex;justify-content:center;align-items:center;gap:0.5rem;"
        this.allMsgs.mailWrapper({parent:mailPhoneWrapper,css_row,email:email_});
        this.allMsgs.phoneWrapper({parent:mailPhoneWrapper,css_row,phoneNum});
        column.appendChild(mailPhoneWrapper);
        row.appendChild(column); 
    };


    //CENTER
    copyRight({parent,main,less400,less900}:{parent:HTMLElement,main:HTMLElement,less400:boolean,less900:boolean}){
        const container=document.createElement("div");
        container.style.cssText="position:absolute;left:0%;width:130px;display:grid;place-items:center;font-size:12px;";
        container.style.top=less900 ? less400 ? "95%":"75%":"90%";
        const year:number=new Date().getFullYear();
        const copyright=document.createElement("div");
        copyright.style.cssText="margin-inline:auto;";
        copyright.style.top="20%";
        copyright.textContent=`@copyright ${year}`;
        container.appendChild(copyright);
        main.appendChild(copyright);
        parent.appendChild(container);
        Misc.matchMedia({parent:container,maxWidth:500,cssStyle:{"top":"95%"}});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"top":"98%"}});
    };



    async centerBtns(item:{parent:HTMLElement,main:HTMLElement,isAuthenticated:boolean,user:userType}){
        const {parent,main,isAuthenticated,user}=item;
        const container=document.createElement("div");
        container.id="footer-centerBtns-container";
        const css_row="display:flex;justify-content:center;align-items:center;width:100%;margin-inline:auto;";
        container.style.cssText=css_row;
        container.style.maxHeight=window.innerWidth <900 ? "8vh":"6vh";
        this.centerBtnsRow({container,main,isAuthenticated,user});
        parent.appendChild(container);
    };



    centerBtnsRow(item:{container:HTMLElement,main:HTMLElement,isAuthenticated:boolean,user:userType}){
        //!!! NOTE:THIS GETS TOGGLED TO LOGOUT FROM auth.getUser() AND A DUPLICATE FUNCTION IS ATTACHED TO NAVARROW.CENTERBTNSROW() FOR LOGOUT
        const {container,main,isAuthenticated,user}=item;
        Header.cleanUpByID(container,"footer-centerBtns-row")
        const row=document.createElement("div");
        row.id="footer-centerBtns-row";
        row.style.cssText="display:flex; justify-content:space-around;align-items:center;margin:auto;width:100%;";
        const arr=["contact","signup","quote generator"];
        arr.forEach(async(item)=>{
            if(item==="contact"){
                const cssStyle={backgroundColor:"#34282C",color:"white",borderRadius:"20px",padding:"5px"}
                const btn=Misc.btnIcon({anchor:row,icon:FaMobileScreen,msgHover:"contact info",label:"contact us",cssStyle,time:400});
                btn.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                           window.scroll(0,0);
                           this.commonInfo.contact({user,isAuthenticated})
                        }
                });
            }else if(item==="signup"){
                
                    if(isAuthenticated){
                        const cssStyle={backgroundColor:"black",color:"white",borderRadius:"50%",padding:"3px"}
                        const btn=Misc.btnIcon({anchor:row,icon:FaSignOutAlt,msgHover:"signout",cssStyle,label:null,time:1000});
                        btn.id="btn-footer-logout";
                        btn.addEventListener("click",(e:MouseEvent)=>{
                            if(e){

                                   window.scroll(0,0);
                                   this.auth.logout({
                                    func:()=>{this.centerBtnsRow({container,main,isAuthenticated,user})},
                                    redirect:true

                                   }).then(()=>{
                                    
                                   });
                                }
                        });
                    }else{
                        const cssStyle={backgroundColor:"black",color:"white",borderRadius:"50%",padding:"3px",zIndex:"2",boxShadow:"1px 1px 12px 1px lightblue"}
                        const btn=Misc.btnIcon({anchor:row,icon:FaSignInAlt,msgHover:"signin",cssStyle,label:null,time:400});
                        btn.id="btn-footer-signin";
                        btn.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                   window.scroll(0,0);
                                   this._regSignin.signIn();
                                }
                        }); 
                    }
                
            }else if(item==="quote generator"){
                const cssStyle={backgroundColor:"#34282C",color:"white",borderRadius:"20px",padding:"3px",fontSize:"20px",boxShadow:"1px 1px 12px 1px blue"};
                const btn=Misc.btnIcon({anchor:row,icon:FaRightLong,cssStyle,msgHover:"web-services",label:item,time:800});
                btn.onclick=(e:MouseEvent)=>{
                    if(e){
                        const newUrl=new URL("/quote",window.location.origin);
                        window.location.href=newUrl.href;
                    }
                };
            }
        });
        container.appendChild(row);
    };


    centerSideContent(item:{parent:HTMLElement,main:HTMLElement,less400:boolean}){
        const {parent,main,less400}=item;
       
        const container=document.createElement("div");
        container.id="centerSideContent";
        container.style.cssText="margin-inline:auto;margin-block:0.5rem;width:100%;min-height:inherit;border-top:1px solid white;border-bottom:1px solid white;padding-block:0.25rem;display:flex;justify-content:space-around;align-items:center;";
        container.style.paddingInline=less400 ? "1rem":"2rem";
        const cssStyle={backgroundColor:"#34282C",color:"white",borderRadius:"20px",padding:"3px",fontSize:"20px",boxShadow:"1px 1px 12px 1px blue"};
        const btn=Misc.btnIcon({anchor:container,icon:FaInfoCircle,cssStyle,msgHover:"contact info",label:"contact info",time:800});
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,0);
                this.commonInfo.generalInfo(MainHeader.header as HTMLElement);
            }
        });
        const cssStyle_1={backgroundColor:"#34282C",color:"white",borderRadius:"20px",padding:"3px",fontSize:"20px",boxShadow:"1px 1px 12px 1px blue"};
        const button=Misc.btnIcon({anchor:container,icon:FaGooglePlay,cssStyle:cssStyle_1,msgHover:"free Google ext.",label:"Google Ext",time:800});
        button.onclick=(e:MouseEvent)=>{
            if(e){
                window.open(this.noteAddUrl,"_blank");

            }
        };
        // Misc.btnHover({parent:div,bg:"white",color:"black",bRadius1:"10px",bRadius2:"23px",time:700})
        parent.appendChild(container);
    };


    rightSideContent(item:{innerContainer:HTMLElement,main:HTMLElement,isAuthenticated:boolean}){
        const {innerContainer,main,isAuthenticated}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const container=document.createElement("div");
        container.id="rightSideContent";
        container.style.cssText="display:flex;height:inherit;overflow-y:scroll;align-items:center;width:100%;justify-content:flex-start;flex-direction:column;";
        container.style.gap=less900 ? (less400 ? "5px":"6px") : "8px";
        const text=document.createElement("h6");
        text.textContent="items";
        text.className="text-center text-primary text-decoration-underline text-underline-offset-3 mb-3 ms-auto";
        text.style.cssText="margin-inline:auto;"
        
        const {button}=Misc.simpleButton({anchor:container,text:"data-flow",bg:this.btnColor,color:"white",type:"button",time:400});
        button.style.transform="scale(0.8)";
     
       
        button.onclick=(e:MouseEvent)=>{
            if(e){
                if(!MainHeader.header) return;
                window.scroll(0,0);
                this.dataflow.main(MainHeader.header);
                
            }
        };
        const {button:btnStorage}=Misc.simpleButton({anchor:container,text:"storage message",bg:this.btnColor,color:"white",type:"button",time:600});
        btnStorage.style.transform="scale(0.8)";
  
        
        btnStorage.onclick=(e:MouseEvent)=>{
            if(e){
                const header=document.querySelector("header#navHeader") as HTMLElement;
                if(!header) return;
                this.dataflow.storageMessage(header);
            }
        };
        const {button:btnFeature}=Misc.simpleButton({anchor:container,text:"features",bg:this.btnColor,color:"white",type:"button",time:600});
        btnFeature.style.transform="scale(0.8)";
        btnFeature.onclick=(e:MouseEvent)=>{
            if(e){
                const body=document.body;
                this.feature.feature(body)
            }
        };
        const {button:btnFirstTimeIntro}=Misc.simpleButton({anchor:container,text:"Editor Features",bg:this.btnColor,color:"white",type:"button",time:600});
        btnFirstTimeIntro.style.transform="scale(0.8)";
        btnFirstTimeIntro.onclick=(e:MouseEvent)=>{
            if(e){
                const body=document.body;
                this.firstTimeIntro.main({parent:body});
            }
        };
        innerContainer.appendChild(container);
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{paddingInline:"1rem",overflowX:"scroll",overflowY:"hidden",alignItems:"center",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",paddingBottom:"1.5rem"}});
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{paddingInline:"0.5rem",overflowY:"scroll",alignItems:"center",flexDirection:"column",overflowX:"hidden"}});
    };



    bio({css_row,css_col,email,phoneNum}:{css_row:string,css_col:string,email:string,phoneNum:string}){
       
        const parent=document.querySelector("header#navHeader") as HTMLElement;
        if(parent){
            const less900=window.innerWidth < 900;
            const less400=window.innerWidth < 400;
            parent.style.position="relative";
            parent.style.zIndex="";
            const container=document.createElement("div");
            container.id="mainFooter-bio-container";
            container.style.cssText="width:100%; max-width:600px;box-shadow:1px 1px 10px black;border-radius:16px;position:absolute;box-shadow:1px 1px 10px 1px black;border-radius:16px;z-index:1000;";
            container.style.inset="160% 0% auto 0%";
            const card=document.createElement("div");
            card.className="card";
            card.style.cssText="width:100%;border-radius:inherit;";
            const img=document.createElement("img");
            img.classList.add("card-img-top");
            img.src=this.thankYouImg;
            img.alt="Gary Wallace";
            card.appendChild(img);
            const cardBody=document.createElement("div");
            cardBody.style.cssText="margin-inline:auto;padding-inline:1rem;display:flex;justify-content:center;flex-direction:column;align-items:center;";
            const H5=document.createElement("h6");
            H5.className="display-6 text-primary";
            H5.textContent="Thank you for visiting us!";
            H5.classList.add("card-title");
            cardBody.appendChild(H5);
            const para=document.createElement("p");
            para.style.cssText="margin-inline:auto;padding-inline:1rem;padding-block:1rem;font-family:Roboto-Regular;font-size:110%;letter-spacing:0.18rem;";
            para.innerHTML=this.bioPhrase;
            cardBody.appendChild(para);
            this.signature({parent:cardBody,css_row,css_col,email,phoneNum,less400})
            Misc.matchMinMedia({parent:para,minWidth:720,cssStyle:{"fontSize":"120%"}});
            const btnGrp=document.createElement("div");
            btnGrp.style.cssText="padding-inline:1rem;margin-inline:auto;display:flex;flex-direction:row;justify-content:center;aligns-item:center;margin-block:1rem;";
            const close=buttonReturn({parent:btnGrp,text:"close",bg:"black",color:"white",type:"button"});
            cardBody.appendChild(btnGrp);
            card.appendChild(cardBody);
            container.appendChild(card);
            parent.appendChild(container);
            Misc.fadeIn({anchor:container,xpos:20,ypos:100,time:700});
            close.addEventListener("click",(e:MouseEvent)=>{
                if(e){

                    Misc.fadeOut({anchor:container,xpos:20,ypos:110,time:400});
                    setTimeout(()=>{
                        parent.removeChild(container);
                    },380);
                }
            });
        }
    };
    

    signature({parent,css_col,css_row,less400,email,phoneNum}:{
        parent:HTMLElement,
        css_col:string,
        css_row:string,
        less400:boolean,
        email:string,
        phoneNum:string
    }){
        const container=document.createElement("div");
        container.id="signature-main";
        container.style.cssText=css_col + "width:100%,align-items:stretch";
        //horizontal block
        const horizontalRow=document.createElement("div");
        horizontalRow.id="horizontal-block";
        horizontalRow.style.cssText=css_row + "width:100%;gap:1rem;margin-block:1rem;";
        const horizontalDivide=document.createElement("div");
        horizontalDivide.id="signature-horizontalDivide";
        horizontalDivide.style.cssText="width:4px;height:6rem;background-color:red;";
        const innerHorizontal=document.createElement("div");
        innerHorizontal.id="innerHorizontal";
        innerHorizontal.style.cssText=css_col + "gap:1rem;";
        const name=document.createElement("span");
        name.style.cssText="font-style:italic;font-family:'Playwrite',sans serif;font-size:20px;"
        name.textContent="Gary Wallace";
        innerHorizontal.appendChild(name);
        const telEmailWrapper=document.createElement("div");
        telEmailWrapper.id="telEmailWrapper";
        telEmailWrapper.style.cssText=css_row + "flex-wrap:nowrap;gap:1.5rem";
        this.allMsgs.mailWrapper({parent:telEmailWrapper,css_row,email});
        this.allMsgs.phoneWrapper({parent:telEmailWrapper,css_row,phoneNum});
        innerHorizontal.appendChild(telEmailWrapper);
        //Main horizontale Block Append
        horizontalRow.appendChild(horizontalDivide);
        horizontalRow.appendChild(innerHorizontal)
        //Main horizontale Block Append
        //horizontal block
        const span=document.createElement("span");
        span.textContent="Sincerely,";
        span.style.cssText="font-family:'Playwrite',sans serif;margin-bottom:1rem;font-style:italic;font-size:21px;";
        const pre=document.createElement("pre");
        pre.id="cont-pre";
        pre.style.cssText="color:#0a2351;font-size:20px;width:350px;overflow:hidden;";
        pre.appendChild(span);
        pre.appendChild(horizontalRow);
        container.appendChild(pre);
        parent.appendChild(container);
       

    }

    
  
    static cleanUp(parent:HTMLElement){
        const check=[...parent.childNodes].length >0
        if(typeof window !=="undefined" && check ){
            if((parent && !parent.firstChild)) return;
        while(parent.firstChild){
            parent.removeChild(parent.lastChild as ChildNode);
        }
    }
    };



    showStorageMsg(item:{parent:HTMLElement,isRepeat:boolean}){
        const {parent,isRepeat}=item;
        // console.log("url",url)//url.pathname="/":home works
       
        this.storageMsg({parent,isRepeat});
       
    };



    storageMsg(item:{parent:HTMLElement,isRepeat:boolean}){
        const {parent,isRepeat}=item;
        Header.cleanUpByID(parent,"popup-storageMsg");
        if(isRepeat){

            parent.style.position="relative";
            const popup=document.createElement("div");
            popup.id="popup-storageMsg";
            popup.className=styles.storage_message_popup;
            const title=document.createElement("p");
            title.className=styles.titleArt;
            title.textContent="Storage Message";
            popup.appendChild(title);
            const text=document.createElement("p");
            text.innerHTML=this.infoMsg;
            popup.appendChild(text);
            const btnCont=document.createElement("div");
            btnCont.id="btnCont";
            btnCont.style.cssText="width:100%;display:flex;justify-content:center;align-items:center;gap:3rem;margin-bottom:2rem;";
            
            const {button:close}=Misc.simpleButton({anchor:btnCont,type:"button",bg:"rgb(31, 48, 94)",color:"white",text:"Got it!",time:400});
            const {button:openStorage}=Misc.simpleButton({anchor:btnCont,type:"button",bg:"#06f0be",color:"white",text:"more info?",time:400});
            popup.appendChild(btnCont);
            
            close.onclick=(e:MouseEvent)=>{
                if(e){
                    this.closeInfoMsg=true;
                    popup.style.transform="translateY(100%)";
                   
                popup.animate([
                    {transform:"translateY(0%)",opacity:"1"},
                    {transform:"translateY(100%)",opacity:"0"},
                ],{iterations:1,duration:800});
                setTimeout(()=>{
                    ([...parent.children as any] as HTMLElement[]).map(html=>{
                        if(html && html.id==="popup-storageMsg"){
                            parent.removeChild(html);
                        }
                    });
                  
                },790);
                }
            };
            openStorage.onclick=(e:MouseEvent)=>{
                if(e){
                    this.closeInfoMsg=true;
                    parent.removeChild(popup);//observer ref
                    const getNavHeader=document.querySelector("header#navHeader") as HTMLElement;
                    window.scroll(0,0);
                    this.dataflow.storageMessage(getNavHeader);
                }
            };
            parent.appendChild(popup);
            popup.style.transform="translateY(0%)";//height, above was replaced because issues with variables included in animate()
            popup.animate([
                {transform:"translateY(100%)",opacity:"0"},
                {transform:"translateY(0%)",opacity:"1"},
            ],{iterations:1,duration:800});
           
        }

    };


    scrollToTop(item:{parent:HTMLElement}){
        const {parent}=item;
        const less900= window.innerWidth < 900;
       
        const css_col="display:flex;justify-content:center;align-items:center;flex-direction:column;";
        const css_row="display:flex;justify-content:center;align-items:center;";
        const name=FaFingerprint;
        const container=document.createElement("div");
        container.id="scrollTop-container";
        container.style.cssText=css_col + "position:absolute;transform:translate(15px,15px);gap:8px;z-index:100";
        container.style.top="0%";
        container.style.left="0%";
        container.style.transform=less900 ? "translate(0px,0px)": "translate(0px,-10px)";
        const text=document.createElement("p");
        text.textContent="TOP";
        text.className="text-center text-primary";
        text.style.cssText="font-size:80%;line-height:0.75rem;margin-bottom:0px;"
        const button=document.createElement("button");
        button.id="scrollToTop-button";
        button.style.cssText=css_row + "padding:auto;border-radius:50%;position:relative;box-shadow:1px 1px 6px 1px white;z-index:100;background-color:inherit;";
        FaCreate({parent:button,name,cssStyle:{color:"whitesmoke",fontSize:"26px",borderRadius:"50%"}});
       container.appendChild(text);
       container.appendChild(button);
       parent.appendChild(container);
       button.onclick=(e:MouseEvent)=>{
        if(e){
            window.scroll(0,0);
        }
       };

    };



    async getUser():Promise<userType | undefined>{
       return this.asyncGetUser().then(async(value)=>{
            if(value && typeof(value)==="string"){
                return JSON.parse(value as string) as userType;
            }
        }) as Promise<userType | undefined>;
    };


    asyncGetUser(){
        return Promise.resolve(localStorage.getItem("user"));
    };
   
}
export default MainFooter;
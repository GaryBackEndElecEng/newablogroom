
import {FaCreate} from "@/components/common/ReactIcons";
import { FaArrowRight } from "react-icons/fa";
import Misc from "../common/misc";
import { buttonReturn } from "../common/tsFunctions";
import ModSelector from "../editor/modSelector";
import Nav from "../nav/headerNav";
import Service from "../common/services";
import MainHeader from "../nav/mainHeader";
import Dataflow from "../common/dataflow";
import Header from "../editor/header";
import RegSignIn from "../nav/regSignin";
import User from "../user/userMain";
import NavArrow from "../nav/arrow";
import Features from "../home/feature";
import { userType } from "../editor/Types";



class MainFooter{
    baseUrl:URL;
    closeInfoMsg:boolean;
    infoMsg:string;
    bioPhrase:string;
    _regSignin:RegSignIn;
    thankYouImg:string;
    btnColor:string;
    privacyUlr:string;
    policyUrl:string;
    logoUrl:string;
    termsOfServiceUrl:string;
    masterultilsUrl:string;
    arrUrl:{name:string,link:string}[]
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private _nav:Nav,private _navArrow:NavArrow,public dataflow:Dataflow,public feature:Features){
        this.arrUrl=[{name:"masterconnect",link:"https://www.masterconnect.ca"},{name:"masterultils",link:this.masterultilsUrl},{name:"policy",link:this.policyUrl},{name:"privacy",link:this.termsOfServiceUrl},];
        this._regSignin= new RegSignIn(this._modSelector,this._service,this._user);
        this.closeInfoMsg=false;
        this.infoMsg="The site uses both cookies and browser storage to ensure that your work is temporaryily saved and secure during your editing before saving your work to the server. <br/><span style='color:blue;font-weight:bold;background-color:white;padding-inline:2rem;border-radius:12px;line-height:2rem;'> We believe in securing your interests.</span> <br/><span style='font-size:120%;font-weight:bold;margin-top:1.25rem;padding-left:4rem;'> The Team.</span>"
        this.baseUrl=new URL(window.location.href);
        this.bioPhrase=`I am an ex Military Officer /Engineer turned developer who enjoys providing you with the best means of creating a great web-page and or a poster or advertising with the tools of exporting your work to suit your purpose. If you desire additional tools, then please don't hesitate on contacting us with your request.
        <hr style="width:80%;margin-inline:auto;margin-block:1rem;">
        <pre style="color:#0a2351"><span class="small-left-triangle"></span> Sincerely,<span class="small-right-triangle"></span></pre>
        <div style="display:flex;margin-left:2rem;">
        <div style="width:4px;height:3rem;margin-right:10px;background-color:red;"></div><span style="font-style:italic;"> Gary Wallace <pre>c:416-917-5768</pre></span>
        </div>
        `;
        this.thankYouImg="/images/thankYou.png";
        this.btnColor=Misc.btnColor
        this.privacyUlr="/policy";
        this.policyUrl="/policy";
        this.logoUrl="/images/gb_logo.png";
        this.termsOfServiceUrl="/termsOfService";
    }

    //-------GETTERS ------SETTERS------///
    
    //-------GETTERS ------SETTERS------///

    main(injector:HTMLElement){
        const user=this._user.user;
        const css="position:relative;margin:auto;width:100%;"
        injector.style.width="100%";
        injector.style.marginBottom="0";
        MainFooter.cleanUp(injector);
        const container=document.createElement("section");
        container.style.cssText="width:100%;height:100%;color:white;box-shadow:1px 1px 6px 1px white;position:relative;margin:auto;z-index:30;background:black;margin-top:1.5rem;margin-bottom:0;";
        injector.appendChild(container);
        const msgCont=document.createElement("div");
        msgCont.style.cssText=css + "margin-inline:auto;background:transparent;";
        container.appendChild(msgCont);
        this.showStorageMsg({parent:container,msgCont:msgCont,user,closeInfoMsg:this.closeInfoMsg});
        const row=document.createElement("div");
        row.id="row-mainFooter";
        row.classList.add("row");
        const arr:string[]=["col-md-4 left-side","col-md-5 center","col-md-3 right-side"];
        Misc.matchMedia({parent:row,maxWidth:900,cssStyle:{"flexDirection":"column","justifyContent":"center","alignItems":"center"}})
        const matches400=window.matchMedia("(max-width:550px") && window.matchMedia("(orientation:portrait");
        arr.map((str,index)=>{
            const col=document.createElement("div");
            col.id=`col-mainFooter-${index}`;
            col.style.cssText="box-shadow:1px 1px 6px 1px white;position:relative;margin:auto;padding:0.5rem;min-height:15vh;";
                col.style.height="20vh";
            col.className=str;
            Misc.matchMedia({parent:col,maxWidth:900,cssStyle:{"minHeight":"20vh","height":"auto","width":"100%"}});
               
            if(str==="col-md-5 center" && matches400.matches){
                col.style.order="3";
            }else{
                col.style.order=`${index}`;
            }
            
            this.addElement(col,str,matches400.matches);
            row.appendChild(col);
        });
      
        container.appendChild(row);
       
    }
    addElement(col:HTMLElement,str:string,matches:boolean){
        const size:{width:string,height:string}= window.innerWidth <1000 ? {width:"60px",height:"60px"} : {width:"80px",height:"80px"};
        const container=document.createElement("div");
        container.id="addElement";
        container.style.cssText="margin:0px;padding:0px;position:relative;width:100%;height:100%;";
        switch(true){
            case str==="col-md-4 left-side":
            this.leftSide(container,size,matches);
            col.appendChild(container);
            return;
            case str==="col-md-5 center":
            this.centerSide(container);
            col.appendChild(container);
            return;
            case str==="col-md-3 right-side":
            this.rightSide(container);
            col.appendChild(container);
            return;
        }
    }
    leftSide(col:HTMLElement,size:{width:string,height:string},matches:boolean){
        const {width,height}=size;
        const container=document.createElement("div");
        container.id="left";
        container.classList.add("row");
        container.style.cssText="margin:0px;padding:0px;position:relative;gap:1rem;justify-content:space-around;display:flex;";
        if(matches){
            container.style.flexDirection="row"
        }
        //IMAGE AND TEXT WRAPPER
        const imgWrapper=document.createElement("div");
        imgWrapper.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;"
        imgWrapper.classList.add("col-lg-3");
        //IMAGE CONTAINER
        const imgDiv=document.createElement("div");
        imgDiv.style.cssText="border-radius:50%;filter:drop-shadow(0 0 0.75rem white);position:relative;margin:1rem;display:grid;place-items:center;order:-1;border:none;";
        imgDiv.style.left="0px";
        imgDiv.style.width=width;
        imgDiv.style.height=height;
        //IMAGE
        const img=document.createElement("img");
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

        // DESCRIPTION
        this.description(container);
        //APPENDING COMPONENTS
        imgDiv.append(img);
        Misc.btnHover({parent:imgDiv,bg:"white",color:"black",bRadius1:"50%",bRadius2:"25%",time:400})
        imgWrapper.append(imgDiv);
        imgWrapper.append(text);
        container.appendChild(imgWrapper);
        col.appendChild(container);
    }
    centerSide(parent:HTMLElement){
        const container=document.createElement("div");
        container.style.cssText="margin:0px;padding:0px;position:relative;width:100%;min-height:10vh;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center";
        container.id="center";
        this.centerBtns(container);//BUTTONS
        this.centerSideContent(container);
        this.copyRight(container);
        parent.appendChild(container);
    }
    rightSide(parent:HTMLElement){
        const container=document.createElement("div");
        container.id="right";
        container.style.cssText="margin:0px;padding:0px;position:relative;";
        const innerContainer=document.createElement("div");
        innerContainer.id="innerContainer-rightSide";
        innerContainer.style.cssText="position:absolute; inset:0% 0% 0% 20%;box-shadow:1px 1px 6px 1px white;min-height:10vh;margin-right:0.25rem;min-height:15vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-inline:1rem;";
        this.rightSideContent(innerContainer);
        container.appendChild(innerContainer);
        Misc.matchMedia({parent:innerContainer,maxWidth:900,cssStyle:{"position":"absolute","inset":"1.5rem 0% 0% 10%","width":"auto"}});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"position":"relative","width":"100%","flexDirection":"column"}});
        Misc.matchMedia({parent:container,maxWidth:800,cssStyle:{"position":"relative","width":"100%","flexDirection":"row"}});
        Misc.matchMedia({parent:innerContainer,maxWidth:770,cssStyle:{"position":"absolute","inset":"0% 0% 0% 15%","marginRight":"0.5rem","width":"auto"}});
        Misc.matchMedia({parent:innerContainer,maxWidth:400,cssStyle:{minHeight:"20vh"}});
        this.privacy(container)
        parent.appendChild(container);
       
    }
    privacy(parent:HTMLElement){
        parent.style.position="relative";
        parent.style.zIndex="3";
        const trans=window.innerWidth <600 ? "translate(10px,-5px)":"translate(0px,-5px)";
        const flexDir=window.innerWidth <600 ? "flex-direction:row" :"flex-direction:column;"
        const overflow=window.innerWidth <600 ? "overflow-x:scroll":"overflow-y:scroll"
        const width=window.innerWidth <600 ? "175px" :"250px;";
        const height=window.innerWidth <600 ? "125px" :"105px;";
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
        arrCont.style.cssText="position:absolute;top:0%;left:0%,right:75%;border-radius:20px;box-shadow:1px 1px 6px white;width:fit-content;padding:0.5rem;display:flex;justify-content:center;align-items:center;gap:0.5rem;flex-direction:column;";
        const text=document.createElement("p");
        text.textContent="sites";
        text.classList.add("text-primary")
        text.style.cssText="margin-inline:auto;text-decoration:underline;text-underline-offset:0.5rem;";
        arrCont.appendChild(text);
        const privArr=document.createElement("div");
        privArr.style.cssText="position:relative;width:25px;height:25px;border-radius:50%;box-shadow:1px 1px 10px 1px;#1F305E;text-align:center;display:grid;place-items:center;background-color:white;";
        privArr.style.color="blue";
        privArr.style.transform=trans;
        //attching arrow
        FaCreate({parent:privArr,name:FaArrowRight,cssStyle:{fontSize:"20px"}});
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
            const anchor=document.createElement("a");
            anchor.textContent=link.name
            anchor.href="#";
            anchor.style.cssText="text-decoration:underline;text-underline-offset:1rem;padding-block:0.25rem;padding-inline:1.5rem;box-shadow:1px 1px 10px black,-2px -2px 10px 2px blue;border-radius:10px;";
            anchor.onclick=()=>{
                parent.style.zIndex="0";
                const newUrl=new URL(window.location.href);
                window.open(new URL(link.link,newUrl.origin).href,"_blank");
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
    }
    //LEFT SIDE
    description(row:HTMLElement){
        const column=document.createElement("div");
        column.classList.add("col-lg-9");
        column.style.background="#34282C";
        column.style.color="white";
        column.style.cssText="box-shadow:1px 1px 7px white;padding:1rem;display:flex;justify-content:center;align-items:center;gap:1rem;flex-direction:column;order:1;";
        column.style.width="auto";
        column.style.maxHeight="15vh";
        Misc.matchMedia({parent:column,maxWidth:900,cssStyle:{"width":"auto","flexDirection":"row"}});
        //NAME
        const text=document.createElement("h6");
        text.style.cssText="padding-inline:0.5rem;cursor:pointer;";
        text.textContent="Developer";
        text.classList.add("growName");
        text.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,0);
                this.bio();
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
        const phone=document.createElement("a");
        phone.style.cssText="padding-inline:0.5rem;color:white;text-decoration:none;text-underline-offset:0.5rem;";
        phone.href="tel:416-917-5768";
        phone.textContent="phone";
        
        column.append(text);
        column.append(email);
        column.append(phone);
        row.appendChild(column); 
    }
    //CENTER
    copyRight(parent:HTMLElement){
        const container=document.createElement("div");
        container.style.cssText="position:absolute;top:90%;left:0%;width:130px;display:grid;place-items:center;font-size:12px;";
        const year:number=new Date().getFullYear();
        const copyright=document.createElement("div");
        copyright.style.cssText="margin-inline:auto;";
        copyright.style.top="20%";
        copyright.textContent=`@copyright ${year}`;
        container.appendChild(copyright);
        parent.appendChild(container);
        Misc.matchMedia({parent:container,maxWidth:500,cssStyle:{"top":"95%"}});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"top":"98%"}});
    }
    centerBtns(parent:HTMLElement){
        const container=document.createElement("div");
        container.style.cssText="width:100%;margin-inline:auto;"
        const row=document.createElement("div");
        row.style.cssText="display:flex; justify-content:space-between;align-items:center;";
        const arr=["contact","signup"];
        arr.forEach((item)=>{
            if(item==="contact"){
                const btn=buttonReturn({parent:row,text:item,bg:"#34282C",color:"white",type:"button"});
                const getHeader=document.querySelector("header#navHeader") as HTMLElement;
                // if(!getHeader) return
                btn.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                           window.scroll(0,0);
                           this._navArrow.contact(getHeader)
                        }
                });
            }else if(item==="signup" && !(this._user.user && this._user.user.id && this._user.user.email)){
                const btn=buttonReturn({parent:row,text:item,bg:"#34282C",color:"white",type:"button"});
                btn.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                           window.scroll(0,0);
                           this._regSignin.signIn();
                        }
                });
            }
        });
        container.appendChild(row);
        parent.appendChild(container);
    }
    centerSideContent(parent:HTMLElement){
        const container=document.createElement("div");
        container.id="centerSideContent";
        container.style.cssText="margin-inline:auto;margin-block:0.5rem;width:100%;min-height:inherit;border-top:1px solid white;border-bottom:1px solid white;padding-block:0.25rem;display:flex;justify-content:space-around;align-items:center;";
        const div=document.createElement("div");
        div.id="extra-info";
        div.style.cssText="margin:auto;display:grid;place-items:center;gap:0.5rem;flex-direction:column;cursor:pointer;box-shadow:1px 1px 7px 1px #0CAFFF,-1px -1px 7px 1px #0CAFFF;border-radius:23px;background-color:#0C090A;color:white;";
        const text=document.createElement("p");
        text.textContent="additional info";
        text.style.cssText="font-size:12px;padding-inline:1.5rem;padding-block:0.15rem;border-radius:20px;margin:auto;";
        div.appendChild(text);
        container.appendChild(div);
        div.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.scroll(0,0);
                this._navArrow.generalInfo(MainHeader.header as HTMLElement);
            }
        });
        Misc.btnHover({parent:div,bg:"white",color:"black",bRadius1:"10px",bRadius2:"23px",time:700})
        parent.appendChild(container);
    }
    rightSideContent(parent:HTMLElement){
        const container=document.createElement("div");
        container.id="rightSideContent";
        container.style.cssText="display:flex;height:inherit;overflow-y:scroll;align-items:center;width:100%;justify-content:flex-start;gap:1.5rem;flex-direction:column;"
        const text=document.createElement("h6");
        text.textContent="items";
        text.className="text-center text-primary text-decoration-underline text-underline-offset-3 mb-3 ms-auto";
        text.style.cssText="margin-inline:auto;"
        // container.appendChild(text);
        const {button}=Misc.simpleButton({anchor:container,text:"data-flow",bg:"rgba(10, 35, 81,0.5)",color:"white",type:"button",time:400});
        // const cssStyle={width:"100%",height:"130%",backgroundColor:"black",color:"white"}
        // Misc.buttonMouseoverMsg({btn:button,cssStyle:cssStyle,msg:"Editor explained",time:600});
        button.onclick=(e:MouseEvent)=>{
            if(e){
                if(!MainHeader.header) return;
                this.dataflow.main(MainHeader.header);
                
            }
        };
        const {button:btnStorage}=Misc.simpleButton({anchor:container,text:"storage message",bg:Nav.btnColor,color:"white",type:"button",time:600});
        // Misc.buttonMouseoverMsg({btn:btnStorage,cssStyle:cssStyle,msg:"storage explained",time:600});
        btnStorage.onclick=(e:MouseEvent)=>{
            if(e){
                const header=document.querySelector("header#navHeader") as HTMLElement;
                if(!header) return;
                this.dataflow.storageMessage(header);
            }
        };
        const {button:btnFeature}=Misc.simpleButton({anchor:container,text:"features",bg:Nav.btnColor,color:"white",type:"button",time:600});
        btnFeature.onclick=(e:MouseEvent)=>{
            if(e){
                const body=document.body;
                this.feature.feature(body)
            }
        };
        parent.appendChild(container);
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{paddingInline:"1rem",overflowX:"scroll",overflowY:"hidden",alignItems:"center",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",paddingBottom:"1.5rem"}});
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{paddingInline:"0.5rem",overflowY:"scroll",alignItems:"center",flexDirection:"column",gap:"0.5rem",overflowX:"hidden"}});
    }

    bio(){
       
        const parent=document.querySelector("header#navHeader") as HTMLElement;
        if(parent){
            
            parent.style.position="relative";
            parent.style.zIndex="";
            const container=document.createElement("div");
            container.id="bio-container";
            container.style.cssText="width:100%; max-width:600px;box-shadow:1px 1px 10px black;border-radius:16px;position:absolute;top:160%;left:28%;right:28%;box-shadow:1px 1px 10px 1px black;border-radius:16px;z-index:100;";
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
            Misc.matchMinMedia({parent:para,minWidth:720,cssStyle:{"fontSize":"120%"}});
            const btnGrp=document.createElement("div");
            btnGrp.style.cssText="padding-inline:1rem;margin-inline:auto;display:flex;flex-direction:row;justify-content:center;aligns-item:center;margin-block:1rem;";
            const close=buttonReturn({parent:btnGrp,text:"close",bg:"black",color:"white",type:"button"});
            cardBody.appendChild(btnGrp);
            card.appendChild(cardBody);
            container.appendChild(card);
            Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"top":"160%","left":"13%","right":"13%","width":"100%"}});
            Misc.matchMedia({parent:container,maxWidth:800,cssStyle:{"top":"160%","left":"9%","right":"9%"}});
            Misc.matchMedia({parent:container,maxWidth:420,cssStyle:{"top":"160%","left":"0%","right":"0%"}});
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
    }
    static cleanUp(parent:HTMLElement){
        if(typeof window !=="undefined" ){
            if((parent && !parent.firstChild)) return;
        while(parent.firstChild){
            parent.removeChild(parent.lastChild as ChildNode);
        }
    }
    }
    showStorageMsg(item:{parent:HTMLElement,msgCont:HTMLElement,user:userType,closeInfoMsg:boolean}){
        const {parent,user,closeInfoMsg,msgCont}=item;
        const url=new URL(window.location.href);
        // console.log("url",url)//url.pathname="/":home works
        const observer=new IntersectionObserver((entries)=>{
            const entry=entries[0];
            if(entry.isIntersecting){
                this.storageMsg({parent,msgCont,show:true,closeInfoMsg});
            }else{
                this.storageMsg({parent,msgCont,show:false,closeInfoMsg});
            }
        },{threshold:0.5});
        if(parent && !closeInfoMsg && url.pathname==="/" && !(user && user.id)){
            setTimeout(()=>{
                observer.observe(msgCont);
            },5000);
        }else{
            parent.removeChild(msgCont);
            observer.disconnect();
        }
    }
    storageMsg(item:{parent:HTMLElement,msgCont:HTMLElement,show:boolean,closeInfoMsg:boolean}){
        const {parent,show,msgCont,closeInfoMsg}=item;
        Header.cleanUpByID(parent,"popup-storageMsg");
        const popup=document.createElement("div");
        popup.id="popup-storageMsg";
        popup.style.cssText="font-family:Poppins-Regular;position:absolute;width:50%;min-height:20vh;display:flex;justify-content:center;flex-direction:column;align-items:center;padding:1rem;background-color:black;color:white;z-index:200;border-radius:12px;box-shadow:1px 1px 12 1px rgba(12, 175, 255,0.5);margin-inline:auto;";
        popup.style.inset="0% 20% 0% 20%";
        const text=document.createElement("p");
        text.innerHTML=this.infoMsg;
        popup.appendChild(text);
        const btnCont=document.createElement("div");
        btnCont.id="btnCont";
        btnCont.style.cssText="width:100%;display:flex;justify-content:center;align-items:center;gap:3rem;"
        const {button:close}=Misc.simpleButton({anchor:btnCont,type:"button",bg:"rgb(31, 48, 94)",color:"white",text:"Got it!",time:400});
        const {button:openStorage}=Misc.simpleButton({anchor:btnCont,type:"button",bg:"#06f0be",color:"white",text:"more info?",time:400});
        popup.appendChild(btnCont);
        
        close.onclick=(e:MouseEvent)=>{
            if(e){
                this.closeInfoMsg=true;
                parent.removeChild(msgCont);//observer ref
            }
        };
        openStorage.onclick=(e:MouseEvent)=>{
            if(e){
                this.closeInfoMsg=true;
                parent.removeChild(msgCont);//observer ref
                const getNavHeader=document.querySelector("header#navHeader") as HTMLElement;
                window.scroll(0,0);
                this.dataflow.storageMessage(getNavHeader);
            }
        };
        parent.appendChild(popup);
        const getPopup=parent.querySelector("div#popup-storageMsg") as HTMLElement;
        if(getPopup){
        Misc.matchMedia({parent:getPopup,maxWidth:900,cssStyle:{inset:"0% 10% 60% 10%",width:"auto"}});
        Misc.matchMedia({parent:getPopup,maxWidth:400,cssStyle:{inset:"0% 2% 40% 2%",padding:"0px",transform:"translateY(-110%)"}});
        }else{
            Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{inset:"0% 10% 60% 10%",width:"auto"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{inset:"0% 2% 40% 2%",padding:"0px",transform:"translateY(-110%)"}});
        }
        const height=window.innerWidth <410 ? "translateY(-110%)":"translateY(-150%)";
        if(show && !closeInfoMsg){
            popup.style.transform=height;
            popup.animate([
                {transform:"translateY(0%)",opacity:"0"},
                {transform:height,opacity:"1"},
            ],{iterations:1,duration:800});
        }else{
            popup.style.transform="translateY(100%)";
            popup.animate([
                {transform:height,opacity:"1"},
                {transform:"translateY(0%)",opacity:"0"},
            ],{iterations:1,duration:800});
            setTimeout(()=>{
                ([...parent.children as any] as HTMLElement[]).map(html=>{
                    if(html && html.id==="popup-storageMsg"){
                        parent.removeChild(html);
                    }
                });
            },790);
        }

    }
   
}
export default MainFooter;
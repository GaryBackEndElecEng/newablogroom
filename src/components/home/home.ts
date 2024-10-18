
import Service from "../common/services";
import ModSelector from "../editor/modSelector";
import {blogType, imageType} from "@/components/editor/Types";
import Misc from "../common/misc";
import MainHeader from "../nav/mainHeader";
import Blogs from "../blogs/blogsInjection";
import Nav from "../nav/headerNav";
import { buttonReturn } from "../common/tsFunctions";
import HomeIntro from "./intro";
import AllMsgs from './allMsgs';
import Features from "./feature";
import Header from "../editor/header";
import { FaCrosshairs } from "react-icons/fa";
import { FaCreate } from "../common/ReactIcons";
import { IoArrowRedoSharp } from "react-icons/io5";

export type imageType2={
    id:number,
    name:string,
    image:string,
    desc:string,
    
}
export type arrItemType={
    name:string,
    image:string,
    desc:string,
    detail:string
}

const baseUrl="http://localhost:3000";

class Home{
    count:number=0;
    bgColor:string;
    btnColor:string;
    intro:HomeIntro;
    introImage:string="/images/introImage.png";
    linkImg:string="https://images.unsplash.com/photo-1657963928657-9da48ea0c496?crop=entropy";
    imagineResponse:string="Imagine....an editor that empowers you to create a flexible webpage to suit your needs.";
    createYourBlogMsg:string="create your blog,,,we layed it out for you for all size screens,,its the best in Canada";
    static injector:HTMLElement|null
    _images:imageType[];
    getImages:imageType2[]=[
        {id:0,name:"Explore",image:"",desc:"creativity"},
        {id:1,name:"symetric",image:"",desc:"and clean"},
        {id:2,name:"fast",image:"",desc:"creation"},
        {id:3,name:"elagent",image:"",desc:"class"},
        {id:4,name:"symetry",image:"",desc:"uniform"},
        {id:5,name:"time",image:"",desc:"moment"},
        {id:6,name:"wonder",image:"",desc:"symetric erosion"},
        {id:7,name:"tranquil",image:"",desc:"smooth"},
        {id:8,name:"majestic",image:"",desc:"cautious"},
        {id:9,name:"earth",image:"",desc:"alone"},
        {id:10,name:"organized",image:"",desc:"structure"},
        {id:11,name:"dynamic",image:"",desc:"busy"},
        {id:12,name:"nature",image:"",desc:"harvest"},
    ]
   
    constructor(private _modSelector:ModSelector,private _service:Service,private _nav:Nav,public allmsgs:AllMsgs,public feature:Features,public _blogs:Blogs) {
        Home.injector=document.querySelector("section#home-index");
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        localStorage.removeItem("blog");
        localStorage.removeItem("userBlogs");
        localStorage.removeItem("placement");
        this.intro=new HomeIntro(this._service);
        this._images=[];
    }

    ////-----------------GETTERS//SETTERS------------------//
    get images(){
        return this._images;
    }
    set images(images){
        this._images=images;
    }
    ////-----------------GETTERS//SETTERS------------------//
    //INJECTION
    async main(parent:HTMLElement){
        await this.asyncMain({parent}).then(async(res)=>{
            if(res){
                await this._service.getImages().then(async(images)=>{
                    if(images){
                        const cutOff=3
                        this.images=images;
                        this.getImages=this.getImages.map((getImage,index)=>{
                            if(index <= cutOff){
                            const image=images[index].image
                            getImage={...getImage,image:image}
                            }
                            return getImage
                            
                        });
                    //    const  showImages=this.getImages.filter((im,index)=>(index<=cutOff)) as imageType2[];
                        const {button:openFeatures}=Misc.simpleButton({anchor:res.messageDisplay,bg:Nav.btnColor,color:"white",text:"open features",type:"button",time:400});
                        const arrReveal:{html:HTMLElement}[]=[
                            {html:res.messageDisplay},
                            {html:openFeatures},
                            {html:res.showEffectContainer},
                            {html:res.btnContainer},
                            {html:res.showBlogs},
                            {html:res.showmsgs},
        
                        ]
                        //opacity=0, hide
                        arrReveal.map(html=>(html.html.style.opacity="0"));
                        //opacity=0
                        setTimeout(async()=>{
                            //opacity=1 show
                            arrReveal.map(html=>{
                                if(html){
                                    html.html.style.opacity="1";
                                    html.html.animate([
                                        {opacity:"0"},
                                        {opacity:"1"},
                                    ],{duration:1500,iterations:1});
                                }
                            });
                        //opacity=1
                        this.signoutFromEditor();//signout message from /editor

                        },4000);

                            this.normalCreateYourBlog(res.messageDisplay);//SCROLL DISPLAY
                            openFeatures.onclick=(e:MouseEvent)=>{
                                if(e){
                                    this.feature.feature(parent);//features
                                }
                            };
                            //introLayout
                            this.normalLayout(res.showEffectContainer);
                            ///-----------display Blogs-------////
                             await this.listBlogs(res.showEffectContainer).then(async(_res)=>{
                                if(_res && _res.blogs && _res.blogs.length>0){
                                    this._blogs.showBlogs(_res.container,true,_res.blogs);
                                    this.normalLinks(res.btnContainer);
                                }
                            });
                            ///-----------display Blogs-------////
                        }
                    }); 
                }
        });
    
    };

    async asyncMain(item:{parent:HTMLElement}): Promise<{messageDisplay:HTMLElement,showBlogs:HTMLElement,showBlogsTwo:HTMLElement,showEffectContainer:HTMLElement,btnContainer:HTMLElement,showmsgs:HTMLElement}|undefined>{
        const {parent}=item;
        if(!parent)return;
        window.scroll(0,0);
        Home.injector=parent;
        Home.cleanUp(parent);
        parent.style.cssText="margin-inline:auto;padding-block:2rem;min-height:80vh;box-shadow:1px 1px 3px black;border-radius:10px 1px 10px 10px;background:white;display:grid;position:relative;z-index:0;";
        parent.style.width="80%";
        parent.style.paddingInline="1rem";
        const messageDisplay=document.createElement("div");
        messageDisplay.id="messageDisplay";
        messageDisplay.style.cssText="margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;width:100%;"
        parent.appendChild(messageDisplay);
        const showBlogs=document.createElement("div");
        showBlogs.id="showBlogs";
        showBlogs.style.cssText="margin-block:2rem;padding:auto;margin-inline:auto;max-width:800px;width:100%;position:relative;";
        parent.appendChild(showBlogs);
        const showBlogsTwo=document.createElement("div");
        showBlogsTwo.id="showBlogsTwo";
        showBlogsTwo.style.cssText="margin-block:2rem;padding:auto;margin-inline:auto;max-width:800px;width:100%;";
        parent.appendChild(showBlogsTwo);
        const showEffectContainer=document.createElement("div");
        showEffectContainer.id="showEffectContainer";
        showEffectContainer.style.cssText="display:flex;flex-direction:column;align-items:center;position:relative;width:100%;overflow-x:hidden;"
        const showmsgs=document.createElement("div");
        showmsgs.id="showmsgs";
        showmsgs.style.cssText="width:100%;margin-inline:auto;display:flex;flex-direction:column;align-items:center;";
        parent.appendChild(showEffectContainer);
        const btnContainer=document.createElement("div");
        btnContainer.id="btnContainer";
        btnContainer.style.cssText="margin-block:2rem;padding:auto;margin-inline:auto;max-width:800px;width:100%;";
        parent.appendChild(showmsgs);
        parent.appendChild(btnContainer);
        
        Misc.matchMedia({parent,maxWidth:900,cssStyle:{"width":"100%","paddingInline":"2px","maxWidth":"auto"}});
        Misc.matchMedia({parent,maxWidth:400,cssStyle:{"paddingInline":"1px","maxWidth":"390px"}});
        Misc.matchMedia({parent,maxWidth:800,cssStyle:{"maxWidth":"790px"}});
        return new Promise(resolve=>{
            resolve({messageDisplay,showBlogs,showBlogsTwo,showEffectContainer,btnContainer,showmsgs})
        }) as Promise<{messageDisplay:HTMLElement,showBlogs:HTMLElement,showBlogsTwo:HTMLElement,showEffectContainer:HTMLElement,btnContainer:HTMLElement,showmsgs:HTMLElement,}>;
    }

  
    normalLinks(parent:HTMLElement){
        //DISPLAY THE TWO LINKS /EDITOR && /BLOGS
        Home.cleanUp(parent);
        const outerContainer=document.createElement("div");
        outerContainer.id="outerContainer";
        outerContainer.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;position:relative;";
        const container=document.createElement("div");
        container.style.cssText="width:100%;min-height:10vh;display:inline-flex;justify-content:space-around;align-items:center;gap:1rem;position:relative;max-width:800px;margin-inline:auto;";
        container.id="main-links";
        const divTop=document.createElement("div");
        divTop.style.cssText="width:80%;margin-inline:auto;margin-bottom:2rem;margin-top:3rem;height:4px;background-color:#0E3386;";
        const divBottom=document.createElement("div");
        divBottom.style.cssText="width:80%;margin-inline:auto;margin-top:2rem;height:4px;background-color:#0E3386;";
        outerContainer.appendChild(divTop);
        outerContainer.appendChild(container);
        outerContainer.appendChild(divBottom);

        MainHeader.links.map((link,index)=>{
            if(!(link.name==="home")){
                const anchor=document.createElement("a");
                anchor.id=`link-${index}`;
                // anchor.href="#";
                anchor.textContent=link.name;
                anchor.style.cssText="text-decoration:none; text-decoration:underline; text-underline-offset:0.5rem;color:black;position:relative;border-radius:2rem;padding-inline:2rem;padding-block:0.5rem;box-shadow:1px 1px 6px 1px black;cursor:pointer;background-color:#0C090A;color:white;";
                anchor.style.fontSize="110%";
                anchor.classList.add("showAnchor");
                if(link.name==="editor"){
                    anchor.setAttribute("data-link","The Editor")
                }else if(link.name==="blogs"){
                    anchor.setAttribute("data-link","View Blogs")
                }
                
                Misc.slideInGrow({anchor:anchor,xpos:0,ypos:110,scale:0.2,time:1200});
                container.appendChild(anchor);
                setTimeout(()=>{
                    anchor.animate([
                        {transform:""},
                        {fontSize:"40%"},
                        {fontSize:"50%"},
                        {fontSize:"60%"},
                        {fontSize:"80%"},
                        {fontSize:"90%"},
                        {fontSize:"100%"},
                        {fontSize:"110%"},
                    ],{duration:1000,iterations:1});
                },780);
                
               anchor.addEventListener("click",(e:MouseEvent)=>{
                  
                    if(e){
                        const newUrl=new URL(link.link,baseUrl);
                        window.location.href=newUrl.href;
                        Nav.navHistory(link.link)
                    }
                });
                Misc.btnHover({parent:anchor,bg:"white",color:"#0C090A",bRadius1:"23px",bRadius2:"9px",time:600});
            };
        });
        parent.appendChild(outerContainer);
        Misc.fadeIn({anchor:container,xpos:100,ypos:0,time:1200});
       
    }
  
     normalLayout(parent:HTMLElement){
        //DISPLAYS THE SCOLLING -SNAP-TO-CENTER-IMAGES
        Home.cleanUp(parent);
        const itemArr:HTMLElement[]=[];
        const outerContainer=document.createElement("div");
        outerContainer.id="normalLayout";
        outerContainer.style.cssText="margin-inline:auto;margin-block:1.5rem;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-inline:5px;max-width:800px;gap:4.5rem;width:100%;position:relative;height:30vh;overflow-y:scroll;padding-block:2rem;margin-block:1.5rem;";
        outerContainer.style.scrollSnapType="y mandatory";
        outerContainer.style.backgroundColor="#f5f6fa";
        Misc.matchMedia({parent:outerContainer,maxWidth:900,cssStyle:{"gap":"3rem"}});
        Misc.matchMedia({parent:outerContainer,maxWidth:420,cssStyle:{"width":"98%","gap":"2.5rem"}});
       
        
        const arrImgs:arrItemType[]=[
            {name:"graphic",desc:"ease upload and replace images",image:"/images/display/graphic.png",detail:"secure url-signed ease upload imagery allowing you to share your thoughts and images with no image thievery"},
            {name:"secure",desc:"secure and  quick registration",image:"/images/display/secure.png",detail:"secure password protected registration with options."},
            {name:"symetric",desc:"encourages symetric displays",image:"/images/display/symetric.png",detail:"symetric displays outlined by the golden-rule, ensuring symetry to your blogs."},
            {name:"Timely",desc:"build in minutes",image:"/images/display/timely.png",detail:"you can build an attractive blog in minutes. The system holds over 10,000 full-size blogs securly held."},
            {name:"peronalized",desc:"your own secure account",image:"/images/display/secureAccount.png",detail:"build your blog in minutes, using our tools with ease. We provide free data exports, avalaible within your profile page."},

        ];
        arrImgs.map((item,index)=>{
            const container=document.createElement("div");
            container.id=`normalLayout-arrImg-${index}`;
            container.classList.add("arrImg");
            container.style.cssText="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center; gap:1rem;padding-inline:0.75rem;min-height:25vh;background-color:black;color:white;text-align:center;padding-block:1.5rem;flex:1 1 25%;align-self:stretch;position:relative;z-index:0;width:100%;border-radius:12px;box-shadow:1px 1px 12px 1px #0CAFFF,-1px -1px 12px 1px black;cursor:pointer;";
            container.style.scrollSnapAlign="center";
            container.style.transform="translateX(-0%)";
            const mask=document.createElement("div");
            mask.id="normalLayout-mask";
            mask.style.cssText=`position:absolute;inset:0%;z-index:0;border-radius:inherit;`;
            mask.style.backgroundImage=`url(${item.image})`;
            mask.style.backgroundPosition="50% 50%";
            mask.style.backgroundSize="50% 50%";
            container.appendChild(mask);
            const h6=document.createElement("h6");
            h6.id="h6"+ index;
            h6.textContent=item.name;
            h6.style.cssText="margin-inline:auto;margin-bottom:2rem;text-align:center;z-index:10;color:white;background:rgba(0,0,0,0.2);";
            container.appendChild(h6);
            const text=document.createElement("p");
            text.style.cssText="margin-inline:auto;padding-inline:1rem;color:white;z-index:10;background:rgba(0,0,0,0.2);";
            text.textContent=item.desc;
            text.id="text" + index;
            container.appendChild(text);
            text.animate([
                {opacity:"0"},
                {opacity:"1"},
            ],{duration:2000,iterations:1});
            h6.animate([
                {opacity:"0"},
                {opacity:"1"},
            ],{duration:2000,iterations:1});
            Misc.blurIn({anchor:container,blur:"20px",time:600});
            h6.style.fontSize="300%";
            Misc.matchMedia({parent:h6,maxWidth:420,cssStyle:{"fontSize":"220%",marginBottom:"auto"}});
            text.style.fontSize="250%";
            Misc.matchMedia({parent:text,maxWidth:420,cssStyle:{"fontSize":"200%"}});
            outerContainer.appendChild(container);
            itemArr.push(mask)
            mask.onclick=(e:MouseEvent)=>{
                if(e){
                    this.showMaskDetail({container,item:item,index});
                }
            };
        });
        parent.appendChild(outerContainer);
        const cssStyleOn:{[key:string]:string}={opacity:"1",backgroundSize:"100% 100%"};
        const cssStyleOff:{[key:string]:string}={opacity:"0",backgroundSize:"75% 75%"};
        Misc.observe({arr:itemArr,root:null,cssStyleOn:cssStyleOn,cssStyleOff:cssStyleOff,time:2000});
       
        
    }
    //LIST SCROLL
    normalCreateYourBlog(parent: HTMLElement){
        //THIS IS THE ROLLING DISPLAY ON THE SCREEN,roll=>"create your blog,,,,etc"
        const container=document.createElement("div");
        container.id="createYourBlogMsg";
        container.style.cssText="overflow-x:hidden;min-height:5vh;background:black;color:white;position:relative;margin-inline:auto;display:grid;place-items:center;border-radius:10px;box-shadow:1px 1px 6px 1px #0CAFFF";
        const innerCont=document.createElement("div");
        innerCont.style.cssText="display:inline-flex; flex-direction:row; flex-wrap:nowrap;align-items:center;position:absolute;"
        innerCont.style.width="160%";
        container.style.width="60%";
        Misc.matchMedia({parent:innerCont,maxWidth:900,cssStyle:{"width":"180%"}});
        Misc.matchMedia({parent:innerCont,maxWidth:500,cssStyle:{"width":"220%"}});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"width":"100%"}});
        const text=document.createElement("p");
        text.style.cssText="margin:auto;font-size:120%";
        text.textContent=this.createYourBlogMsg;
        innerCont.appendChild(text);
        container.appendChild(innerCont);
        parent.appendChild(container);
        innerCont.animate([
            {transform:"translateX(100%)"},
            {transform:"translateX(-100%)"},
        ],{duration:20000,iterations:Infinity});
    }
    async listBlogs(parent:HTMLElement): Promise<{blogs:blogType[] | undefined,container:HTMLElement}>{
        //MAXIMUM OF QTY=4 && RATING > 3
        parent.style.position="relative";
        const container=document.createElement("section");
        container.id="showBlogs";
        container.style.cssText="max-width:800px;margin-inline:auto;margin-block:2rem;display:flex;flex-direction:column;gap:4rem;position:relative;width:100%";
        parent.appendChild(container);
        Misc.blurIn({anchor:container,blur:"20px",time:600});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{maxWidth:"900px",width:"100%"}});
        Misc.matchMedia({parent:container,maxWidth:840,cssStyle:{maxWidth:"840px",width:"100%"}});
        Misc.matchMedia({parent:container,maxWidth:420,cssStyle:{maxWidth:"420px",width:"100%"}});
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{maxWidth:"375px",width:"100%"}});
        
        return this._service.fetchBlogs().then(async(blogs)=>{
            if(blogs){
                this._modSelector.blogs=blogs;
                if(blogs.length>0){
                    const limitBlogs=blogs.filter(bl=>(bl.rating >3)).slice(0,4);
                 return {container:container,blogs:limitBlogs};
                }else{
                    // return Blogs.noBlogs(container);
                }
            }
        }) as Promise<{container:HTMLElement,blogs:blogType[] | undefined}>;

        
    }
    signoutFromEditor(){
        const url=new URL(window.location.href);
        const isSignout=url.searchParams.get("signout");
        if(isSignout==="true"){
            const parent= MainHeader.header ? MainHeader.header as HTMLElement : document.querySelector("header#navHeader") as HTMLElement;
            
            Misc.msgSourceImage({parent,msg:"thanks for comming!!",width:175,quality:75,time:3500,src:"gb_logo.png",cssStyle:{borderRadius:"20px",backgroundColor:"black",color:"white",boxShadow:"1px 1px 12px 1px rgb(8, 4, 249);",inset:"-760% 0% -1600% 0%",zIndex:"4000"}});
            console.log("533:signedOutFromEditor:isSignout",isSignout)
        }
    }
    showMaskDetail(_item:{container:HTMLElement,item:arrItemType,index:number}){
        const {container,item,index}=_item;
        Header.cleanUpByID(container,`showMaskDetail-popup-${index}`);
        const popup=document.createElement("div");
        popup.id=`showMaskDetail-popup-${index}`;
        popup.style.cssText="position:absolute;backdrop-filter:blur(20px);inset:-2rem;z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.7rem;border-radius:12px;box-shadow:1px 1px 12px 1px rgba(12, 175, 255,0.5);padding:0.75rem;";
        popup.style.position="absolute";
        popup.style.inset="-1rem";
        const h6=document.createElement("h6");
        h6.textContent=item.desc;
        h6.style.cssText="width:100%;text-wrap:pretty;font-family:'Poppins-Regular';margin-inline:auto !important;padding:7px;background-color:white;font-size:140%;";
        h6.className="text-primary";
        const imgH6=document.createElement("div");
        imgH6.id="showmaskDetail-popup-imgH6";
        imgH6.style.cssText="margin-inline:auto;padding-inline:8px;display:flex;justify-content:center;width:100%;height:8vh;align-items:center;position:relative;background-color:white;border-radius:12px;box-shadow:1px 1px 12px 1px #0CAFFF;";
        imgH6.appendChild(h6);
        const img=document.createElement("img");
        img.src=item.image;
        img.alt="www.ablogroom.com";
        img.style.cssText="position:absolute;height:inherit;aspect-ratio:1/1;border-radius:50%;top:0%;left:3px;filter:drop-shadow(0 0 0.5rem black);";
        imgH6.appendChild(img);
        popup.appendChild(imgH6);
        const para=document.createElement("p");
        para.id="showMaskDetail-popup-para";
        para.style.cssText="font-family:'Poppins-thin';font-weight:600;text-wrap:pretty;padding:7px;border-radius:12px;margin-inline:auto;color:black;font-size:140%;background-color:white;";
        para.textContent=item.detail;
        popup.appendChild(para);
        //CLOSE----///
        const xDiv=document.createElement("div");
        xDiv.style.cssText="border-radius:50%;background:black;position:absolute;top:0%;right:0%;transform:translate(-22px,22px);diplay:flex;justify-content:center;align-items:center;padding:0.15rem;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"20px;color:white;"}});
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    container.removeChild(popup);
                },390);
            }
        };
        popup.appendChild(xDiv);
        //CLOSE----///
        //---------------BUTTON TO GO TO EDITOR-----------///
        const btnCont=document.createElement("div");
        btnCont.style.cssText="width:100%;margin-inline:auto;margin-block:0.55rem;display:flex;justify-content:center;align-items:center;gap:0.75rem;position:relative;";
        btnCont.id="showMaskDetail-popup-btnCont";
        const {button:editor}=Misc.simpleButton({anchor:btnCont,text:"editor",bg:"blue",color:"white",time:400,type:"button"});
        editor.id="btn-editor-go";
        const icon=document.createElement("div");
        icon.style.cssText="padding:8px;border-radius:50%;background:blue;transform:scale(1.3);"
        FaCreate({parent:icon,name:IoArrowRedoSharp,cssStyle:{fontSize:"26px",backgroundColor:"black",color:"white",padding:"5px",borderRadius:"50%"}});
        btnCont.appendChild(icon);
        icon.animate([
            {transform:"translateX(-150%) scale(0.2)",opacity:"0.3"},
            {transform:"translateX(0%) scale(1.3)",opacity:"1"},
        ],{duration:1500,iterations:1,"easing":"ease-in-out"});
        editor.animate([
            {backgroundColor:"black",opacity:"0.3"},
            {backgroundColor:"blue",opacity:"1"},
        ],{duration:1000,iterations:1,"easing":"ease-in-out"});
        editor.onclick=(e:MouseEvent)=>{
            if(e){
                this._modSelector.blogInitializer(null);
                window.location.href=new URL("/editor",new URL(window.location.href).origin).href;
            }
        };
        //---------------BUTTON TO GO TO EDITOR-----------///
        
        popup.appendChild(btnCont);
        container.appendChild(popup);

        Misc.growIn({anchor:popup,scale:0.2,opacity:0.2,time:500});

    }


    //NOT USED!! BUTTON FOR INTRODUCTION
    //NOT USED!! BUTTON FOR INTRODUCTION
    showIntroBtn(parent:HTMLElement){
        const container=document.createElement("div");
        container.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-10px,10px);width:fit-content;";
        parent.appendChild(container);
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{top:"38px"}});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{top:"6%"}});
        const btn=buttonReturn({parent:container,color:"white",bg:this.btnColor,text:"intro",type:"button"});
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.intro.main(parent,baseUrl);
            }
        });
    }
  
  
    static cleanUp(parent:HTMLElement){
        while(parent.firstChild){
            parent.removeChild(parent.lastChild as ChildNode);
        }
    }
}
export default Home;
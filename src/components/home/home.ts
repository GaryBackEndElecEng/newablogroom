
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

export type imageType2={
    id:number,
    name:string,
    image:string,
    desc:string
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
   
    constructor(private _modSelector:ModSelector,private _service:Service,private _nav:Nav,public allmsgs:AllMsgs,public feature:Features) {
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
        if(!parent)return;
        window.scroll(0,0);
        Home.injector=parent;
        Home.cleanUp(parent);
        parent.style.cssText="margin-inline:auto;padding-block:2rem;min-height:80vh;box-shadow:1px 1px 3px black;border-radius:10px 1px 10px 10px;background:white;display:grid;position:relative;z-index:0;";
        parent.style.width="80%";
        parent.style.paddingInline="1rem";
        const messageDisplay=document.createElement("div");
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
        showEffectContainer.id="showEffect";
        showEffectContainer.style.cssText="display:flex;flex-direction:column;align-items:center;position:relative;width:100%;overflow-x:hidden;"
        const showmsgs=document.createElement("div");
        showmsgs.id="showmsgs";
        showmsgs.style.cssText="width:100%;margin-inline:auto;display:flex;flex-direction:column;align-items:center;";
        parent.appendChild(showEffectContainer);
        const showSlide=document.createElement("div");
        showSlide.id="showSlides";
        showSlide.style.cssText="margin-block:2rem;padding:auto;margin-inline:auto;max-width:800px;width:100%;";
        parent.appendChild(showSlide);
        const text=document.createElement("div");
        text.id="testID"
        text.style.cssText="width:100%;margin-top:1rem;";
        parent.appendChild(text);
        const cutOff=3
        Misc.matchMedia({parent,maxWidth:900,cssStyle:{"width":"100%","paddingInline":"2px","maxWidth":"auto"}});
        Misc.matchMedia({parent,maxWidth:400,cssStyle:{"paddingInline":"1px","maxWidth":"390px"}});
        Misc.matchMedia({parent,maxWidth:800,cssStyle:{"maxWidth":"790px"}});
        
        await this._service.getImages().then(async(images)=>{
            if(images){
                
                this.images=images;
                this.getImages=this.getImages.map((getImage,index)=>{
                    if(index <= cutOff){
                    const image=images[index].image
                    getImage={...getImage,image:image}
                    }
                    return getImage
                    
                });
            //    const  showImages=this.getImages.filter((im,index)=>(index<=cutOff)) as imageType2[];
                const {button:openFeatures}=Misc.simpleButton({anchor:messageDisplay,bg:Nav.btnColor,color:"white",text:"open features",type:"button",time:400});
                const arrReveal:{html:HTMLElement}[]=[{html:messageDisplay},{html:openFeatures},{html:showEffectContainer},{html:showSlide},{html:showBlogs},{html:showmsgs},]
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
                    this.normalCreateYourBlog(messageDisplay);//SCROLL DISPLAY
                    openFeatures.onclick=(e:MouseEvent)=>{
                        if(e){
                            this.feature.feature(parent);
                        }
                    };
                    this.normalLayout(showEffectContainer,showSlide,showBlogs);
                    ///-----------displays IMAGES-------////
                    // GET MSGS----------------------//
                    
                    await this.allmsgs.showMsgs(showmsgs); 
                    parent.appendChild(showmsgs); 
                    // GET MSGS----------------------// 
        }
        }); 

        
    }

    //BUTTON FOR INTRODUCTION
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
  
   
    //PARENT:promImageEffect
    links(parent:HTMLElement){
        Home.cleanUp(parent);
        const width=window.innerWidth < 900 ? "1.5rem":"5rem";
        parent.style.display="flex";
        parent.style.justifyContent="space-between";
        const outerContainer=document.createElement("div");
        outerContainer.style.cssText="max-width:800px;position:relative;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;"
        const container=document.createElement("div");
        container.style.cssText=`border-radius:10px;width:100%;min-height:10vh;display:inline-flex;justify-content:center;align-items:center;position:relative;max-width:800px;margin-inline:auto;display:flex;justify-content:space-between;align-items:center;padding-inline:${width};`;
        container.id="main-links";
        const divTop=document.createElement("div");
        divTop.style.cssText="width:80%;margin-inline:auto;height:3px;background-color:#0804f9;margin-block:1rem;";
        const divBottom=document.createElement("div");
        divBottom.style.cssText="width:80%;margin-inline:auto;height:3px;background-color:#0603ae;margin-block:1rem;";
        outerContainer.appendChild(divTop);
        outerContainer.appendChild(container);
        outerContainer.appendChild(divBottom);
        parent.appendChild(outerContainer);
        Misc.fadeIn({anchor:container,xpos:100,ypos:0,time:1000});

        MainHeader.links.map((link,index)=>{
            if(!(link.name==="home")){
                const anchor=document.createElement("a");
                anchor.id=`link-${index}`;
                // anchor.href="#";
                anchor.textContent=link.name;
                anchor.style.cssText="text-decoration:none; text-decoration:underline; text-underline-offset:0.5rem;background-color:#0C090A;color:white;position:relative;padding-inline:2rem;padding-block:0.25rem;border-radius:23px;";
                anchor.style.zIndex="0";
                anchor.style.fontSize="160%";
                anchor.classList.add("showAnchor");
                Misc.btnHover({parent:anchor,bg:"black",color:"white",bRadius1:"23px",bRadius2:"8px",time:600})
                if(link.name==="editor"){
                    anchor.setAttribute("data-link","The Editor")
                }else if(link.name==="blogs"){
                    anchor.setAttribute("data-link","View Blogs")
                }
                Misc.slideInGrow({anchor:anchor,xpos:0,ypos:110,scale:0.2,time:800});
                container.appendChild(anchor);
                setTimeout(()=>{
                    anchor.animate([
                        {transform:""},
                        {fontSize:"100%"},
                        {fontSize:"110%"},
                        {fontSize:"120%"},
                        {fontSize:"130%"},
                        {fontSize:"140%"},
                        {fontSize:"150%"},
                        {fontSize:"160%"},
                    ],{duration:1000,iterations:1});
                },780);
                
               anchor.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        const newUrl=new URL(link.link,baseUrl);
                        window.location.href=newUrl.href;
                        Nav.navHistory(link.link)
                    }
                });
            };
        });

        setTimeout(()=>{
           const showSlide=document.querySelector("div#showSlides") as HTMLElement;
           if(!showSlide) return;
           // SLIDE SHOW
            this.introLayout(showSlide).then(async(res)=>{
                if(res.flexCont){
                    setTimeout(()=>{
                        res.flexCont.animate([
                            {transform:`translateX(-${0 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${0 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${1 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${1 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${2 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${2 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${3 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${3 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${4 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${4 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${3 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${2 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${1 * 20}%)`,opacity:"1"},
                            {transform:`translateX(-${0 * 20}%)`,opacity:"1"},
                        ],{iterations:1,duration:21000,easing:"ease-in-out"});
                    },400);
                    setTimeout(()=>{
                        Misc.fadeOut({anchor:res.innerContainer,xpos:20,ypos:100,time:400});
                        setTimeout(()=>{
                            res.parent.removeChild(res.innerContainer)
                            this.listBlogs(res.parent).then(async(res)=>{
                                if(res && res.blogs){
                                    const showBlogs=new Blogs(this._modSelector,this._service);
                                    showBlogs.showBlogs(res.container,true,res.blogs);
                                }
                            });
                        },380);
                    },21380);
                }
            });
        },400);
        Misc.matchMinMedia({parent:container,minWidth:910,cssStyle:{"paddingInline":"4rem;","maxWidth":"600px"}});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"paddingInline":"2rem;","maxWidth":"600px"}});
        Misc.matchMedia({parent:container,maxWidth:600,cssStyle:{"paddingInline":"1rem;","maxWidth":"400px"}});
        Misc.matchMedia({parent:container,maxWidth:420,cssStyle:{"paddingInline":"1rem;","maxWidth":"350px"}});
    }
    normalLinks(parent:HTMLElement){
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
    async introLayout(parent:HTMLElement){
        parent.style.marginBlock="2rem"
        const outerContainer=document.createElement("div");
        outerContainer.style.cssText="width:100%;overflow-x:scroll;position:relative;min-height:35vh;"
        const innerContainer=document.createElement("div");
        innerContainer.id="introLayout";
        innerContainer.style.cssText="margin-inline:auto;margin-block:1.5rem;display:flex;flex-direction:column;align-items:stretch;justify-content:center;padding-inline:5px;max-width:800px;gap:1.5rem;overflow-x:scroll;overflow-x:scroll;width:100%;position:relative;min-height:35vh;"
        innerContainer.style.top="35%";
        Misc.matchMedia({parent:innerContainer,maxWidth:420,cssStyle:{"width":"98%","top":"30%"}});
        Misc.matchMedia({parent:innerContainer,maxWidth:900,cssStyle:{"width":"98%","top":"30%"}});
        const flexCont=document.createElement("div");
        flexCont.style.cssText="margin-inline:auto;display:flex;width:500%;gap:2px;position:relative;position:absolute;top:0%;min-height:15vh;"
        flexCont.id="flexCont";
        const arrImgs=[
            {name:"graphic",desc:"ease upload and replace images",image:"/images/display/graphic.png"},
            {name:"secure",desc:"secure and  quick registration",image:"/images/display/secure.png"},
            {name:"symetric",desc:"encourages symetric displays",image:"/images/display/symetric.png"},
            {name:"Timely",desc:"build in minutes",image:"/images/display/timely.png"},
            {name:"peronalized",desc:"your own secure account",image:"/images/display/secureAccount.png"},

        ];
        arrImgs.map((item,index)=>{
            const container=document.createElement("div");
            container.id=`arrImg-${index}`;
            container.style.cssText="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center; gap:1rem;padding-inline:0.75rem;min-height:25vh;background-color:black;color:white;text-align:center;padding-block:1.5rem;flex:1 1 25%;align-self:stretch;position:relative;z-index:0;";
            container.style.transform="translateX(-0%)";
            const mask=document.createElement("div");
            mask.id="mask";
            mask.style.cssText=`position:absolute;inset:0%;z-index:0;`;
            mask.style.backgroundImage=`url(${item.image})`;
            mask.style.backgroundPosition="50% 50%";
            mask.style.backgroundSize="50% 50%";
            container.appendChild(mask);
            const h6=document.createElement("h6");
            h6.textContent=item.name;
            h6.style.cssText="margin-inline:auto;margin-bottom:2rem;text-align:center;z-index:10;color:white;background:rgba(0,0,0,0.2);";
            container.appendChild(h6);
            const text=document.createElement("p");
            text.style.cssText="margin-inline:auto;padding-inline:1rem;color:white;z-index:10;background:rgba(0,0,0,0.2);";
            text.textContent=item.desc;
            container.appendChild(text);
            Misc.fadeIn({anchor:container,xpos:50,ypos:0,time:600});
            h6.style.fontSize="300%";
            Misc.matchMedia({parent:h6,maxWidth:420,cssStyle:{"fontSize":"280%"}});
            text.style.fontSize="250%";
            Misc.matchMedia({parent:text,maxWidth:420,cssStyle:{"fontSize":"200%"}});
            flexCont.appendChild(container);

        });
        
        innerContainer.appendChild(flexCont);
        parent.appendChild(innerContainer);
        return new Promise((resolver)=>{
                resolver({flexCont:flexCont,
                    innerContainer:innerContainer,
                    parent:parent
                })
        }) as Promise<{flexCont:HTMLElement,innerContainer:HTMLElement,parent:HTMLElement}>;

    }
     normalLayout(parent:HTMLElement,showSlides:HTMLElement,showBlogs_:HTMLElement){
        //PARENT==SHOWEFFECT
        Home.cleanUp(parent);
        Home.cleanUp(showSlides);
        Home.cleanUp(showBlogs_);
        const itemArr:HTMLElement[]=[];
        const outerContainer=document.createElement("div");
        outerContainer.id="introLayout";
        outerContainer.style.cssText="margin-inline:auto;margin-block:1.5rem;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-inline:5px;max-width:800px;gap:4.5rem;width:100%;position:relative;height:30vh;overflow-y:scroll;padding-block:2rem;margin-block:1.5rem;";
        outerContainer.style.scrollSnapType="y mandatory";
        outerContainer.style.backgroundColor="#f5f6fa";
        Misc.matchMedia({parent:outerContainer,maxWidth:900,cssStyle:{"gap":"3rem"}});
        Misc.matchMedia({parent:outerContainer,maxWidth:420,cssStyle:{"width":"98%","gap":"2.5rem"}});
       
        
        const arrImgs=[
            {name:"graphic",desc:"ease upload and replace images",image:"/images/display/graphic.png"},
            {name:"secure",desc:"secure and  quick registration",image:"/images/display/secure.png"},
            {name:"symetric",desc:"encourages symetric displays",image:"/images/display/symetric.png"},
            {name:"Timely",desc:"build in minutes",image:"/images/display/timely.png"},
            {name:"peronalized",desc:"your own secure account",image:"/images/display/secureAccount.png"},

        ];
        arrImgs.map((item,index)=>{
            const container=document.createElement("div");
            container.id=`arrImg-${index}`;
            container.classList.add("arrImg");
            container.style.cssText="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center; gap:1rem;padding-inline:0.75rem;min-height:25vh;background-color:black;color:white;text-align:center;padding-block:1.5rem;flex:1 1 25%;align-self:stretch;position:relative;z-index:0;width:100%;border-radius:12px;box-shadow:1px 1px 12px 1px #0CAFFF,-1px -1px 12px 1px black;";
            container.style.scrollSnapAlign="center";
            container.style.transform="translateX(-0%)";
            const mask=document.createElement("div");
            mask.id="mask";
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

        });
        parent.appendChild(outerContainer);
        const cssStyleOn:{[key:string]:string}={opacity:"1",backgroundSize:"100% 100%"};
        const cssStyleOff:{[key:string]:string}={opacity:"0",backgroundSize:"75% 75%"};
        Misc.observe({arr:itemArr,root:null,cssStyleOn:cssStyleOn,cssStyleOff:cssStyleOff,time:2000});
        this.listBlogs(parent).then(async(res)=>{
            if(res && res.blogs && res.blogs.length>0){
                const showBlogs=new Blogs(this._modSelector,this._service);
                showBlogs.showBlogs(res.container,true,res.blogs);
                this.normalLinks(showSlides);
            }
        });
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
  
  
    static cleanUp(parent:HTMLElement){
        while(parent.firstChild){
            parent.removeChild(parent.lastChild as ChildNode);
        }
    }
}
export default Home;
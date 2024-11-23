
import Service from "../common/services";
import ModSelector from "../editor/modSelector";
import {blogType, imageType, messageType, postType} from "@/components/editor/Types";
import Misc from "../common/misc";
import MainHeader from "../nav/mainHeader";
import Blogs from "../blogs/blogsInjection";
import Nav from "../nav/headerNav";
import { AWSImageLoader, buttonReturn, imageLoader } from "../common/tsFunctions";
import HomeIntro from "./intro";
import AllMsgs from './allMsgs';
import Features from "./feature";
import Header from "../editor/header";
import { FaCrosshairs } from "react-icons/fa";
import { FaCreate } from "../common/ReactIcons";
import { IoArrowRedoSharp } from "react-icons/io5";
import { img_keyType } from '../editor/Types';
import { SiAnswer } from "react-icons/si";

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



class Home{
    logo:string;
    colors:string;
    bend1:string;
    count:number=0;
    bgColor:string;
    btnColor:string;
    intro:HomeIntro;
    postLogo:string;
    introImage:string="/images/introImage.png";
    linkImg:string="https://images.unsplash.com/photo-1657963928657-9da48ea0c496?crop=entropy";
    imagineResponse:string="Imagine....an editor that empowers you to create a flexible webpage to suit your needs.";
    createYourBlogMsg:string="create your blog,,,we layed it out for you for all size screens,,its the best in Canada";
    static injector:HTMLElement|null
    _images:imageType[];
    getImages:imageType2[];
   
    constructor(private _modSelector:ModSelector,private _service:Service,private _nav:Nav,public allmsgs:AllMsgs,public feature:Features,public _blogs:Blogs) {
        Home.injector=document.querySelector("section#home-index");
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        localStorage.removeItem("blog");
        localStorage.removeItem("userBlogs");
        localStorage.removeItem("placement");
        this.intro=new HomeIntro(this._service);
        this._images=[];
        this.bend1="/images/bend2.png";
        this.postLogo="/images/posts.png";
        this.getImages=[
            {id:0,name:"Explore",image:"https://images.unsplash.com/photo-1657736301709-b1365740ddbe?crop=entropy",desc:"creativity"},
            {id:1,name:"symetric",image:"https://images.unsplash.com/photo-1658288797137-7ca820c77a2b?crop=entropy",desc:"and clean"},
            {id:2,name:"fast",image:"https://images.unsplash.com/photo-1657987273071-fbe77b5b4e90?crop=entropy&h=900",desc:"creation"},
            {id:3,name:"elagent",image:"https://images.unsplash.com/photo-1655760862449-52e5b2bd8620?crop=entropy",desc:"class"},
            {id:4,name:"symetry",image:"https://images.unsplash.com/photo-1657963928657-9da48ea0c496?crop=entropy",desc:"uniform"},
            {id:5,name:"time",image:"https://images.unsplash.com/photo-1656922612260-2ebb170dd637?crop=entropy",desc:"moment"},
            {id:6,name:"wonder",image:"https://images.unsplash.com/photo-1656342468017-a298b6c63cc9?crop=entropy",desc:"symetric erosion"},
            {id:7,name:"tranquil",image:"https://images.unsplash.com/photo-1658137135662-82ab663ee627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",desc:"smooth"},
            {id:8,name:"majestic",image:"https://images.unsplash.com/photo-1657653463810-fa2f223fbb82?crop=entropy",desc:"cautious"},
            {id:9,name:"earth",image:"https://images.unsplash.com/photo-1657832034979-e2f9c5b0a2fc?crop=fit&h=900",desc:"alone"},
            
        ]
        this.logo="/images/gb_logo.png";
        this.colors="/images/colors.png";
    }

    ////-----------------GETTERS//SETTERS------------------//
    get images(){
        return this._images;
    }
    set images(images){
        this._images=images;
    }
    ////-----------------GETTERS//SETTERS------------------//
    //INJECTION !! STYLE FOR PARENT IS DONE VIA home.module.css
    async main(parent:HTMLElement){
        const css_col="display:flex;flex-direction:column;align-items:center;gap:1.5rem;width:100%";
        Header.cleanUp(parent);
        const show=true;
        await this.introTitleDisplay({parent,show,time:500}).then(async(container)=>{
            //SHOWS ABLOGROOM DISPLAY
            if(container){
                await this.sleep({time:1200});//waits
            }
            });
        await this.asyncMain({parent}).then(async(res)=>{
            if(res){
                this.images=this.getImages;

            //    const  showImages=this.getImages.filter((im,index)=>(index<=cutOff)) as imageType2[];
            Header.cleanUp(res.sectionOne);//clean up
                const {button:openFeatures}=Misc.simpleButton({anchor:res.sectionOne,bg:Nav.btnColor,color:"white",text:"open features",type:"button",time:400});
                openFeatures.style.marginInline="auto";
                openFeatures.style.marginBlock="1rem";
                //----------------------SHOW HOME SECTION-------------------------//

                const arrReveal:{html:HTMLElement}[]=[
                    {html:res.sectionOne},
                    {html:openFeatures},
                    {html:res.showBlogs},

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
                            ],{duration:1000,iterations:1});
                        }
                    });
                },200);

                //----------------------SHOW HOME SECTION-------------------------//
                // show attributes
                openFeatures.onclick=(e:MouseEvent)=>{
                    if(e){
                        this.feature.feature(parent);//features
                    }
                };
                const show=true;
                
                        this.normalCreateYourBlog(res.sectionOne);//SCROLL DISPLAY
                        this.editorAttributeDisplay(res.sectionOne);//SNAP-SCROLL IMAGES
                        //Main editor/Blogs links
                        this.mainLinks(res.sectionOne);//EDITOR/BLOGS LINK
                            // show attributes
                            ///-----------display Blogs-------////
                                await this.listBlogs(res.showBlogs).then(async(_res)=>{
                                    //MAX 4 BLOGS SCROLLING
                                if(_res && _res.blogs && _res.blogs.length>0){
                                    _res.blogs.map(async(blog)=>{
                                        if(blog){
                                            this.blogCard({parent:_res.blogMsgCont,blog})
                                        }
                                    });
                                    // this._blogs.showBlogs(_res.container,true,_res.blogs);
                                    
                                }
                            });
                            await this.posts({parent:res.showPosts});
                        
                
                }
        });
    
    };

    async asyncMain(item:{parent:HTMLElement}): Promise<{showBlogs:HTMLElement,showPosts:HTMLElement,sectionOne:HTMLElement}|undefined>{
        const less900=window.innerWidth < 900;
        const less600=window.innerWidth < 600;
        const less400=window.innerWidth < 400;

        window.scroll(0,0);
        const css_col="margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0rem;position:relative;";
        const {parent}=item;
        if(!parent)return;
        window.scroll(0,0);
        Home.injector=parent;
        const showBlogs=document.createElement("div");
        showBlogs.id="asyncmain-showBlogs";
        showBlogs.style.cssText=css_col + "max-width:1000px;width:100%;";
        const showPosts=document.createElement("div");
        showPosts.id="asyncmain-showPosts";
        showPosts.style.cssText=css_col + "max-width:1000px;width:100%;";
        
        // const titleShowDisplay=document.createElement("div");
        // titleShowDisplay.id="asyncmain-titleShowDisplay";
        // titleShowDisplay.style.cssText=css_col ;
        // titleShowDisplay.style.width=less900 ? "100%":"80%";

        const messageDisplay=document.createElement("div");
        messageDisplay.id="messageDisplay";
        messageDisplay.style.cssText=css_col;

        const showmsgs=document.createElement("div");
        showmsgs.id="asyncmain-showmsgs";
        showmsgs.style.cssText=css_col + "justify-content:flex-start;";

        const btnContainer=document.createElement("div");
        btnContainer.id="asyncmain-btnContainer";
        btnContainer.style.cssText="margin-block:2rem;padding:auto;margin-inline:auto;max-width:800px;width:100%;";
        const sectionOne=document.createElement("section");
        sectionOne.id="asyncmain-sectionOne";
        sectionOne.style.cssText=css_col + "width:100%;padding:0rem;padding-block:2rem;border-radius:16px;background-color:aliceblue;min-height:50vh;box-shadow:1px 1px 12px 1px #b4f3f3;";
        sectionOne.style.maxWidth="1000px";
        sectionOne.style.opacity="0";
        sectionOne.style.backgroundImage=`url(${this.bend1})`;
        sectionOne.style.backgroundSize=`100% 100%`;
        sectionOne.style.backgroundPosition=`50% 50%`;
        sectionOne.style.backgroundColor=`aliceblue`;
        sectionOne.style.paddingBlock=less900 ? (less400 ? "2.5rem":"2rem") : "2rem";
        sectionOne.appendChild(messageDisplay);
        sectionOne.appendChild(showmsgs);
        sectionOne.appendChild(btnContainer);
        parent.appendChild(sectionOne);
        parent.appendChild(showBlogs);
        parent.appendChild(showPosts);
        return new Promise(resolve=>{
            resolve({showBlogs,sectionOne,showPosts})
        }) as Promise<{showBlogs:HTMLElement,showPosts:HTMLElement,sectionOne:HTMLElement}>;
    }
    sleep(item:{time:number}){
        const {time}=item;
        return new Promise((resolve)=>{
            setTimeout(resolve,time)
        });
    }

  
    mainLinks(parent:HTMLElement){
        //DISPLAY THE TWO LINKS /EDITOR && /BLOGS
        // Home.cleanUp(parent);
        const outerContainer=document.createElement("div");
        outerContainer.id="mainLinks-outerContainer";
        outerContainer.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;position:relative;";
        const container=document.createElement("div");
        container.style.cssText="width:100%;min-height:10vh;display:flex;flex-wrap:wrap;justify-content:space-around;align-items:center;gap:1rem;position:relative;max-width:1000px;margin-inline:auto;";
        container.id="mainLinks-container";
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
                anchor.id=`mainLinks-container-link-${index}`;
                // anchor.href="#";
                anchor.textContent=link.name;
                anchor.style.cssText="text-decoration:none; text-decoration:underline; text-underline-offset:0.5rem;color:black;position:relative;border-radius:2rem;padding-inline:2rem;padding-block:0.5rem;box-shadow:1px 1px 6px 1px black;cursor:pointer;background-color:#0C090A;color:white;";
                anchor.style.fontSize="110%";
                anchor.classList.add("showAnchor");
                if(link.name==="editor"){
                    anchor.setAttribute("data-link","The Editor")
                }else if(link.name==="blogs"){
                    anchor.setAttribute("data-link","View Blogs")
                }else if(link.name==="posts"){
                    anchor.setAttribute("data-link","View Posts")
                }else if(link.name==="chart"){
                    anchor.setAttribute("data-link","Build a chart")
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
                        const url=new URL(window.location.href);
                        const newUrl=new URL(link.link,url.origin);
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
  
     editorAttributeDisplay(parent:HTMLElement){
        //DISPLAYS THE SCOLLING -SNAP-TO-CENTER-IMAGES
        // Home.cleanUp(parent);
        const itemArr:HTMLElement[]=[];
        const outerContainer=document.createElement("div");
        outerContainer.id="editorAttributeDisplay";
        outerContainer.style.cssText="margin-inline:auto;margin-block:1.5rem;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-inline:0px;max-width:800px;gap:4.5rem;width:100%;position:relative;height:30vh;overflow-y:scroll;padding-block:2rem;margin-block:1.5rem;";
        outerContainer.style.scrollSnapType="y mandatory";
        outerContainer.style.backgroundColor="#f5f6fa";
        Misc.matchMedia({parent:outerContainer,maxWidth:900,cssStyle:{gap:"3rem"}});
        Misc.matchMedia({parent:outerContainer,maxWidth:420,cssStyle:{gap:"0.25rem"}});
        outerContainer.style.width=window.innerWidth < 500 ? "98%" :"100%";
        outerContainer.style.gap=window.innerWidth < 900 ? (window.innerWidth < 500 ? "2.5rem":"3rem") :"4.5rem";
       
        
        const arrImgs:arrItemType[]=[
            {name:"graphic",desc:"ease upload and replace images",image:"/images/display/graphic.png",detail:"secure url-signed ease upload imagery allowing you to share your thoughts and images with no image thievery"},
            {name:"secure",desc:"secure and  quick registration",image:"/images/display/secure.png",detail:"secure password protected registration with options."},
            {name:"symetric",desc:"encourages symetric displays",image:"/images/display/symetric.png",detail:"symetric displays outlined by the golden-rule, ensuring symetry to your blogs."},
            {name:"Timely",desc:"build in minutes",image:"/images/display/timely.png",detail:"you can build an attractive blog in minutes. The system holds over 10,000 full-size blogs securly held."},
            {name:"peronalized",desc:"your own secure account",image:"/images/display/secureAccount.png",detail:"build your blog in minutes, using our tools with ease. We provide free data exports, avalaible within your profile page."},

        ];
        arrImgs.map((item,index)=>{
            const container=document.createElement("div");
            container.id=`editorAttributeDisplay-arrImg-${index}`;
            container.classList.add("arrImg");
            container.style.cssText="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center; gap:1rem;padding-inline:0.75rem;min-height:25vh;background-color:black;color:white;text-align:center;padding-block:1.5rem;flex:1 1 25%;align-self:stretch;position:relative;z-index:0;width:100%;border-radius:12px;box-shadow:1px 1px 12px 1px #0CAFFF,-1px -1px 12px 1px black;cursor:pointer;";
            container.style.scrollSnapAlign="center";
            container.style.transform="translateX(-0%)";
            const mask=document.createElement("div");
            mask.id="editorAttributeDisplay-mask";
            mask.style.cssText=`position:absolute;inset:0%;z-index:0;border-radius:inherit;`;
            mask.style.backgroundImage=`url(${item.image})`;
            mask.style.backgroundPosition="50% 50%";
            mask.style.backgroundSize="100% 100%";
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
            text.style.fontSize=window.innerWidth <900 ? "160%":"250%";
            Misc.matchMedia({parent:h6,maxWidth:420,cssStyle:{"fontSize":"220%",marginBottom:"auto"}});
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
        Misc.matchMedia({parent:innerCont,maxWidth:900,cssStyle:{"width":"180%"}});
        Misc.matchMedia({parent:innerCont,maxWidth:500,cssStyle:{"width":"220%"}});
        innerCont.style.width=window.innerWidth < 900 ? (window.innerWidth < 600 ? (window.innerWidth <400 ? "300%":"220%") : "180%"):"160%";
        container.style.width=window.innerWidth <900 ? (window.innerWidth<600 ? "100%" :"80%") :"60%";
        const text=document.createElement("p");
        text.id="createYourBlogMsg-text"
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
    async listBlogs(parent:HTMLElement): Promise<{blogs:blogType[] | undefined,blogMsgCont:HTMLElement}>{
        //MAXIMUM OF QTY=4 && RATING > 3
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const less375=window.innerWidth < 375;
        parent.style.position="relative";
        const css_col="margin-inline:auto;display:flex;flex-direction:column;";
        const container=document.createElement("section");
        container.id="home-listBlogs-showBlogs";
        container.style.cssText=css_col + "gap:1rem;position:relative;width:100%";
        //----------textCont-----------------//
        this.blogPostTitle({parent:container,css_col,context:"top blogs"});
        //----------textCont-----------------//
        //----------blogCont-----------------//
        const blogMsgCont=document.createElement("div");
        blogMsgCont.id="container-blogMsgCont";
        blogMsgCont.style.cssText=css_col + "width:100%;box-shadow:1px 1px 12px 1px #01d1f7;border-radius:12px";
        //----------blogCont-----------------//
        parent.appendChild(container);
        Misc.blurIn({anchor:container,blur:"20px",time:600});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{maxWidth:"900px",width:"100%"}});
        Misc.matchMedia({parent:container,maxWidth:840,cssStyle:{maxWidth:"840px",width:"100%"}});
        Misc.matchMedia({parent:container,maxWidth:420,cssStyle:{maxWidth:"420px",width:"100%"}});
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{maxWidth:"375px",width:"100%"}});
        
        return this._service.fetchBlogs().then(async(blogs)=>{
            if(blogs && blogs.length>0){
                container.appendChild(blogMsgCont);
                const limitBlogs=blogs.filter(bl=>(bl.rating >3)).slice(0,4);
                const len=limitBlogs.length;
                const height=less900 ? (less400 ? "80vh":"60vh"):"60vh";
                blogMsgCont.style.height= len > 1 ? height :"auto";
                blogMsgCont.style.overflowY= len > 1 ? "scroll" :"auto";
                this._modSelector.blogs=blogs;
                 return {blogMsgCont:blogMsgCont,blogs:limitBlogs};
                
                    // return Blogs.noBlogs(container);
                
            }
        }) as Promise<{blogMsgCont:HTMLElement,blogs:blogType[] | undefined}>;

        
    }
    blogPostTitle(item:{parent:HTMLElement,css_col:string,context:string}){
        const {parent,css_col,context}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const less375=window.innerWidth < 375;
        const textCont=document.createElement("div");
        textCont.id="container-textCont";
        textCont.style.cssText=css_col + "gap:0.25rem;width:100%;margin-block:1rem;";
        textCont.style.marginBlock=less900 ? (less400 ? "2rem":"1.25rem") : "1rem";
        textCont.style.marginTop=less900 ? (less400 ? "1rem":"0.25rem") : "0rem";
        const text=document.createElement("h6");
        text.className="subTitleStyleThreeNoBorder";
        text.id="textCont-text";
        text.textContent= context;
        text.style.cssText="margin:auto;text-transform:uppercase;font-family:'Poppins-Regular';";
        text.style.fontSize=less900 ? (less400 ? "280%":"350%") : "360%";
        const line1=document.createElement("div");
        line1.className="lineStyleOne";
        line1.id="textCont-line1";
        line1.style.cssText="width:100%;line-height:20px;height:8px;margin:auto;border-radius:30%;";
        const line2=document.createElement("div");
        line2.className="lineStyleOne";
        line2.id="textCont-line2";
        const width=100/1.62;
        line2.style.cssText=`width:${width}%;line-height:20px;height:5.5px;margin:auto;border-radius:30%;`;
        textCont.appendChild(text);
        textCont.appendChild(line1);
        textCont.appendChild(line2);
        parent.appendChild(textCont);
    }
    async blogCard(item:{parent:HTMLElement,blog:blogType}){
        const {parent,blog}=item;
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const url=new URL(window.location.href);
        const css_col="margin-inline:auto;display:flex;flex-direction:column;place-items:center;width:100%;";
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;place-items:center;gap:0.5rem;width:100%;";
        const card=document.createElement("div");
        card.className="card";
        card.id=`home-blogCard-${blog.id}`;
        card.style.cssText=css_col + "position:relative;";
        card.style.paddingBlock=less900 ? (less400 ? "1rem" : "0.75rem"):"0.5rem";
        const cardTopHeight=less900 ? (less400 ? 75 : 110):150;
        //--------------STAR CONTAINER ---------------------//
        this._blogs.thumbsUpStartRating({parent:card,rating:blog.rating,minRating:3});
        //--------------STAR CONTAINER ---------------------//
        //--------------CARD TOP ---------------------//
        //--------------CARD TOP ---------------------//
        
        const cardTop=document.createElement("div");
        cardTop.id=`home-blogCard-cardTop`;
        cardTop.style.cssText=css_row + `height:${cardTopHeight}px;margin-block:1rem;`;
        //-----------------------IMG--------------------//
        const img=document.createElement("img");
        img.id=`cardTop-img-${blog.id}`;
        img.style.cssText=`border-radius:50%;height:${cardTopHeight}px;aspect-ratio:1 / 1;filter:drop-shadow(0 0 0.75rem black);padding:0px;`;
        if(blog.imgKey){
            this._service.getSimpleImg(blog.imgKey).then(async(res_)=>{
                if(res_){
                    img.src=res_.img;
                    img.alt=res_.Key;
                }
            });
        }else{
            img.src=imageLoader({src:this.logo,width:cardTopHeight,quality:75});
            img.alt="www.ablogroom.com"
        }
        cardTop.appendChild(img);
        //-----------------------IMG--------------------//
        //-----------------------DESC--------------------//
        const descContainer=document.createElement("div");
        descContainer.id=`cardTop-descContainer-${blog.id}`;
        descContainer.style.cssText=css_col + `height:${cardTopHeight}px;overflow-y:scroll;background-color:black;color:white;font-family:'Poppins-Regular';padding-inline:0.25rem;margin-block:auto;width:50%;border-radius:12px;box-shadow:1px 1px 12px 1px black;`;
        descContainer.style.width=less900 ? (less400 ? "100%":"50%") : "50%";
        const desc=document.createElement("p");
        desc.id=`descContainer-desc-${blog.id}`;
        desc.style.cssText="text-wrap:pretty;";
        desc.textContent=blog.desc ? blog.desc :"missing content";
        descContainer.appendChild(desc);
        //-----smallCont----------///
        const small=document.createElement("small");
        small.id="cardBottom-small-" + `${blog.id}`;
        const date=document.createElement("span");
        date.id="cardBottom-date-" + `${blog.id}`;
        date.textContent= blog.date ? Blogs.tolocalstring(blog.date):"no date";
        small.textContent=blog.username ? blog.username : " blogger";
        const smallCont=document.createElement("div");
        smallCont.id="cardBottom-smallCont-" + `${blog.id}`;
        smallCont.style.cssText="display:flex;flex-wrap:wrap;align-items:center;gap:0rem;font-size:12px;";
        smallCont.style.paddingInline=less900 ?(less400 ? "1rem":"1.5rem") :"3rem";
        smallCont.appendChild(date);
        smallCont.appendChild(small);
        descContainer.appendChild(smallCont);
        cardTop.appendChild(descContainer);
        //---------smallCont-----//
        //-----------------------DESC--------------------//
        card.appendChild(cardTop);
        //--------------CARD TOP ---------------------//
        //--------------CARD BOTTOM ---------------------//
        const cardBottom=document.createElement("div");
        cardBottom.id=`home-blogCard-cardBottom`;
        cardBottom.style.cssText=css_col + "width:100%;position:relative;";
        cardBottom.style.paddingTop=less900 ? (less400 ? "4rem":"1rem"):"0.5rem";
        ///////-------------msgsCONTAINER--------/////
        const msgCont=document.createElement("div");
        msgCont.style.cssText=css_col + "padding-inline:0.25rem";
            
        // all messages--------///
        this.blogMsgs({col:cardBottom,blog});
        // all messages--------///
        ///////-------------msgsCONTAINER--------/////
        card.appendChild(cardBottom);
        const {button}=Misc.simpleButton({anchor:card,type:"button",bg:Nav.btnColor,color:"white",time:400,text:"view detail"});
        button.style.placeSelf="center";
        button.style.margin="auto";
        button.style.marginBlock=less900 ? (less400 ? "1.5rem":"1rem") : "0.75rem";
        button.onclick=(e:MouseEvent)=>{
            if(e){
                const newUrl=new URL(`/blog/${blog.id}`,url.origin);
                window.location.href=newUrl.href;
            }
        };

        //--------------CARD BOTTOM ---------------------//


        parent.appendChild(card);
    }
    blogMsgs(item:{col:HTMLElement,blog:blogType}){
        const {col,blog}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const less375=window.innerWidth < 375;
        const url=new URL(window.location.href);

        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:1rem;";
        const msgs=blog.messages ? blog.messages : [] as messageType[];
        if(blog && msgs && msgs.length>0){
            const contScroll=document.createElement("div");
            contScroll.id="home-blogMsgs-contScroll";
            contScroll.style.cssText=css_col + "overflow-y:scroll;padding:1rem;width:100%";
            contScroll.style.height=less900 ? (less400 ? "12vh":"15vh") :"18vh";
            contScroll.style.marginBlock=less900 ? (less400 ? "3rem": "1rem") : "0.5rem";
            contScroll.style.marginBlock=less400 ? "2rem":"auto";
            contScroll.style.paddingInline=less900 ? (less400 ? "10px":"7.75rem"):"10.5rem";
            col.appendChild(contScroll);
            msgs.slice(0,3).sort((a,b)=>{if(a.rate > b.rate) return -1;else return 1}).map(msg=>{
                if(msg){
                    
                    this.singleMsgTwo({col:col,contScroll:contScroll,msg,imgKey:blog.imgKey})
                }
            });
        }
    }
    singleMsgTwo(item:{col:HTMLElement,contScroll:HTMLElement,msg:messageType,imgKey:string|undefined}){
        const {col,contScroll,msg,imgKey}=item;
        const less900=window.innerWidth <900 ? true:false;
        const less600=window.innerWidth <600 ? true:false;
        const less400=window.innerWidth <400 ? true:false;
        const less375=window.innerWidth <375 ? true:false;
        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center;";
        const css_row="display:flex;flex-direction:row;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap;";
        Header.cleanUpByID(contScroll,`allMsgs-singleMsgTwo-msg-card-${msg.id}`);
        const card=document.createElement("div");
        card.id=`home-singleMsgTwo-msg-card-${msg.id}`;
        card.className="msgCard row";
        card.style.cssText=css_row +`width:100%;box-shadow:1px 1px 5px 1px #00BFFF,-1px -1px 5px 1px #00BFFF;cursor:pointer;`;
            //ICONDIV && NAME
            const nameCont=document.createElement("span");
            nameCont.style.cssText=css_row + "flex-wrap:nowrap;";
            nameCont.id="card-nameCont";
            nameCont.classList.add("viewCard");
            nameCont.setAttribute("data-link","click to view comment");
            const name=document.createElement("p");
            name.id="card-nameCont-name";
            name.style.cssText="margin-right:0.5rem;margin-block:0.5rem;";
            name.textContent=msg.name;
        const iconDiv=document.createElement("span");
        iconDiv.id="card-nameCont-iconDiv";
        iconDiv.style.cssText=css_col + "font-size:40px;width:45px;height:45px;padding:3px;"
        FaCreate({parent:iconDiv,name:SiAnswer,cssStyle:{marginRight:"10px",background:"white",color:"#00BFFF",zIndex:"1"}});
        //APPENDING ICONDIV && NAME
        nameCont.appendChild(iconDiv);
        nameCont.appendChild(name);
        card.appendChild(nameCont);
        //APPENDING ICONDIV && NAME
        //STARS AND RATING
        const rating=document.createElement("p");
        rating.id="contStar-rating";
        rating.style.cssText="position:absolute;top:0%;margin-right:0.5rem;text-decoration:underline;text-underline-offset:0.25rem;width:40px;font-size:70%;";
        rating.style.top=less900 ?(less600 ? "0%":"0%"):"10%"
        rating.style.left=less900 ? (less600 ? (less400 ? "65%":"10%"):"10%"):"88%";
        rating.style.fontSize=less900 ? (less600 ? (less400 ? "90&":"100%"):"100%"):"110%";
        rating.style.transform=window.innerWidth <900 ? (window.innerWidth <400 ? "translate(-30px,0px)" : "translate(-40px,5px)") : "translate(20px,-5px)";
       
        rating.innerHTML=`<span style=color:red;font-size:80%;>R</span> : ${msg.rate}`;

        const contStar=document.createElement("span");
        contStar.id="nameCont-contStar";
        contStar.style.cssText=css_row;
        contStar.appendChild(rating);
        //,boxShadow:"1px 1px 3px #07f9e2"
        const cssStyle={color:"yellow",padding:"1px",borderRadius:"50%"};
        const rowCssStyle={filter:"drop-shadow(0 0 0.25rem black)",backgroundColor:"#0c0326",borderRadius:"8px"};
        Misc.starRating({parent:contStar,rating:msg.rate,cssStyle,rowCssStyle});
        //APPENDING rating and contStar
        //APPENDING rating and contStar
        nameCont.appendChild(contStar);
        contScroll.appendChild(card);
        card.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.viewCard({parent:col,msg,imgKey});
            }
        });
       
    }
   async viewCard(item:{parent:HTMLElement,msg:messageType,imgKey:string|undefined}){
        const {parent,msg,imgKey}=item;
        parent.style.position="relative";
        const url=new URL(window.location.href);
        const less900=window.innerWidth <900 ? true:false;
        const less600=window.innerWidth <600 ? true:false;
        const less400=window.innerWidth <400 ? true:false;
        const less375=window.innerWidth <375 ? true:false;
        if(less900){
            window.scrollBy(0,-80)
        }else if(less400){
            window.scrollBy(0,-100)
        }
        const container=document.createElement("div");
        container.id="home-viewCard-container";
        container.style.cssText ="max-width:800px;padding-inline:1rem;display:flex;flex-direction:column;place-items:center;position:absolute;border-radius:14px;box-shadow:1px 1px 10px 1px #0CAFFF,-1px -1px 10px 1px #0CAFFF;z-index:100;background-color:white;padding-block:1rem;";
        container.style.inset=less900 ? (less400 ? "-133% 0% 85% 0%" : "-135% 5% 80% 5%") :"-130% 10% 80% 10%";
        parent.appendChild(container);
        const card=document.createElement("div");
        card.id="home-viewCard-card"
        card.style.cssText ="padding-inline:1rem;display:flex;justify-content:space-around;flex-wrap:nowrap;align-items:flex-start;position:relative;background-color:white;width:100%;padding-block:1rem;";
        container.appendChild(card);
        const width=less900 ? (less600 ? (less400 ? 50 : 60) :80) : 100;
        const img=document.createElement("img");
        img.id="viewCard-card-img";
        if(imgKey){
            this._service.getSimpleImg(imgKey).then(async(res)=>{
                if(res){
                    img.src=AWSImageLoader({url:res.img,width,quality:70});
                    img.alt="www.ablogroom.ca";
                }
            });
        }else{
            img.src=imageLoader({src:this.colors,width,quality:75});
            img.alt="www.ablogroom.ca";
        }
        
        img.style.cssText=`width:${width}px;height:50px;aspect-ratio:1 / 1;border-radius:50%;filter:drop-shadow(0 0 0.5rem #0CAFFF);background-color:black;`;
        card.appendChild(img);
        const cardBody=document.createElement("div");
        cardBody.id="card-cardBody";
        cardBody.style.cssText="width:100%; margin-inline:auto;padding:0.5rem;display:flex;flex-direction:column;align-items:flex-start;max-height:15vh;overflow-y:scroll;position:relative;";
        card.appendChild(cardBody);
        const name=document.createElement("span");
        name.id="cardBody-name";
        name.style.cssText="display:flex;flex-wrap:wrap;";
        const rate=document.createElement("div");
       rate.style.cssText="margin-inline:auto;"
        rate.id="cardBody-rate";
        const cssStyle={width:"100%",padding:"1px",color:"yellow",backgroundColor:"black",borderRadius:"50%"};
        const rowCssStyle={width:"100%",gap:"2px",borderRadius:"8px",filter:"drop-shadow(0 0 0.25rem black)"};
        Misc.starRating({parent:rate,rating:msg.rate,cssStyle,rowCssStyle});
        name.innerHTML=`<span id="view-cardBody-name" style="display:flex;"><span style="color:black;font-weight:bold;">name: </span> <h6 style="font-size:18px;color:blue;margin-right:0.5rem;"> ${msg.name}</h6></span>`;
        cardBody.appendChild(rate);
        cardBody.appendChild(name);
        const mess=document.createElement("p");
        mess.id="cardBody-mess";
        mess.style.cssText="padding:0.7rem;border:1px solid #0CAFFF;border-radius:7px;width:100%; ";
        mess.textContent=msg.msg;
        cardBody.appendChild(mess);
        Misc.fadeIn({anchor:container,xpos:70,ypos:100,time:400});
        Misc.matchMedia({parent:rate,maxWidth:500,cssStyle:{width:"8px;"}});
        
        const btn=buttonReturn({parent:container,bg:"black",color:"white",text:"close",type:"button"});
        btn.id="viewCard-container-btn";
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:container,xpos:30,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(container);
                },380);
            }
        });

    }
   async posts(item:{parent:HTMLElement}){
        const {parent}=item;
        parent.style.position="relative";
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const less375=window.innerWidth < 375;
        const minLikes=3;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;align-items:center;gap:0.75rem;";
        const css_row="margin-inline:auto;display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;";
        const container=document.createElement("div");
        Header.cleanUpByID(parent,"home-posts-container");
        container.id="home-posts-container";
        container.style.cssText=css_col + "width:100%";
        this.blogPostTitle({parent:container,css_col,context:"top posts"});
        const innerContainer=document.createElement("div");
        innerContainer.id="container-innerContainer";
        innerContainer.style.cssText=css_col + "background-color:white;color:black;font-family:'Poppins-Regular';border-radius:12px;box-shadow:1px 1px 12px 1px #01d1f7;";
        innerContainer.style.width=less900 ? "100%":"80%";
        const row=document.createElement("div");
        row.id="innerContainer-row";
        row.style.cssText=css_row + "width:100%;justify-content:space-between;";
        row.style.width="100%";
        row.style.paddingInline=less900 ? (less400 ? "5px":"1rem"):"1rem";
        row.style.display=less400 ? "block":"flex";
        Misc.matchMedia({parent:row,maxWidth:400,cssStyle:{display:"block",paddingInline:"5px"}});
        await this._service.getposts().then(async(posts:postType[]|undefined)=>{
            if(posts && posts.length >0){
                const minPosts=posts.filter(post=>(post.likes > minLikes));
                const innerHeight= minPosts.length >3 ? "30vh":"auto";
                const scroll= minPosts.length >3 ? "scroll":"hidden";
                innerContainer.style.height=innerHeight;
                innerContainer.style.overflow=scroll;
                innerContainer.appendChild(row);
                container.appendChild(innerContainer);
                parent.appendChild(container);
                minPosts.map(post=>{
                    if(post){
                        this.postCard({row:row,post,css_col,css_row,less900,less400});
                    }
                });
            }
        });


    }
    async postCard(item:{row:HTMLElement,post:postType,css_col:string,css_row:string,less900:boolean,less400:boolean}){
        const {row,post,css_col,css_row,less900,less400}=item;
        const imgWidth=75;
        const id=String(post.id);
        const col=document.createElement("div");
        col.id="innerContainer-postCard-col-" + id;
        col.style.cssText=css_col;
        col.style.flex=less900 ? (less400 ? "0 0 100%":"0 0 48%"): "0 0 48%";
        const card=document.createElement("div");
        card.id="col-card-" + id;
        card.style.cssText=css_row + `margin:auto;min-height:${imgWidth }px;width:100%;flex-wrap:wrap;height:auto;`;
        card.style.cursor="pointer";
        const img=document.createElement("img");
        img.id="card-img-" + id;
        img.style.cssText=`margin:auto;width:${imgWidth-5}px;aspect-ratio: 1/ 1;border-radius:50%;margin-inline:5px;filter:drop-shadow(0 0 0.5rem black);`;
        if(post.image){
            img.src=imageLoader({src:post.image,width:imgWidth-5,quality:75});
            img.alt="www.ablogroom.com";
            Misc.blurIn({anchor:img,blur:"20px",time:700});
        }else if(post.imageKey){
            await this._service.getSimpleImg(post.imageKey).then(async(res)=>{
                if(res){
                    img.src=res.img;
                    img.alt=res.Key;
                    Misc.blurIn({anchor:img,blur:"20px",time:700});
                }
            });
        }else{
            img.src=imageLoader({src:this.postLogo,width:imgWidth-5,quality:75});
             img.alt="www.ablogroom.com";
            Misc.blurIn({anchor:img,blur:"20px",time:700});
        }
        card.appendChild(img);
        const postTitle=document.createElement("h6");
        postTitle.id="card-postTitle-" + id;
        postTitle.className="text-center lean text-primary";
        postTitle.style.fontSize="110%";
        postTitle.textContent=post.title ? post.title : "post title";
        card.appendChild(postTitle);
        const contLikes=document.createElement("div");
        contLikes.id="card-contLikes-" + id;
        contLikes.style.cssText="margin:auto;display:flex;align-items:center;justify-content:center;";
        const likes=document.createElement("small");
        likes.className="text-center text-danger";
        likes.textContent=`likes: ${post.likes}`;
        contLikes.appendChild(likes);
        const line=document.createElement("hr");
        line.style.cssText="width:80%;height:1px;background:black;box-shadow:1px 1px 3px 1px black;margin-block:12px;"
        card.appendChild(contLikes);
        col.appendChild(card);
        col.appendChild(line);
        Misc.matchMedia({parent:col,maxWidth:400,cssStyle:{flex:"0 0 100%"}});
        card.onclick=(e:MouseEvent)=>{
            if(e){
                const url=new URL(window.location.href);
                const origin=url.origin;
                window.location.href=(new URL(`post/${id}`,origin)).href;
            }
        };
        row.appendChild(col);
    };
    
//SIGNOUTFROMEDITOR NOT USED:=> MESSAGE IS EXECUTED FROM navArrow.logout()
    signoutFromEditor(){
        const url=new URL(window.location.href);
        const isSignout=url.searchParams.get("signout");
        if(isSignout==="true"){
            const parent= MainHeader.header ? MainHeader.header as HTMLElement : document.querySelector("header#navHeader") as HTMLElement;
            
            Misc.msgSourceImage({parent,msg:"thanks for comming!!",width:175,quality:75,time:3500,src:"gb_logo.png",cssStyle:{borderRadius:"20px",backgroundColor:"black",color:"white",boxShadow:"1px 1px 12px 1px rgb(8, 4, 249);",inset:"-760% 0% -1600% 0%",zIndex:"4000"}});
            console.log("533:signedOutFromEditor:isSignout",isSignout)
        }
    }
    //SIGNOUTFROMEDITOR NOT USED:=> MESSAGE IS EXECUTED FROM navArrow.logout()
    showMaskDetail(_item:{container:HTMLElement,item:arrItemType,index:number}){
        const {container,item,index}=_item;
        Header.cleanUpByID(container,`showMaskDetail-popup-${index}`);
        const popup=document.createElement("div");
        popup.id=`showMaskDetail-popup-${index}`;
        popup.style.cssText="position:absolute;backdrop-filter:blur(20px);inset:-2rem;z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.7rem;border-radius:12px;box-shadow:1px 1px 12px 1px rgba(12, 175, 255,0.5);padding:0.75rem;border:none;";
        popup.style.position="absolute";
        const h6=document.createElement("h6");
        h6.textContent=item.desc;
        h6.style.cssText="width:100%;text-wrap:pretty;font-family:'Poppins-Regular';margin-inline:auto !important;padding:7px;background-color:white;font-size:140%;";
        h6.className="text-primary";
        const imgH6=document.createElement("div");
        imgH6.id="showmaskDetail-popup-imgH6";
        imgH6.style.cssText="margin-inline:auto;padding-inline:8px;display:flex;justify-content:center;width:100%;height:8vh;align-items:center;position:relative;background-color:white;border-radius:12px;box-shadow:1px 1px 12px 1px #0CAFFF;";
        const img=document.createElement("img");
        img.src=item.image;
        img.alt="www.ablogroom.com";
        img.style.cssText="position:absolute;height:inherit;aspect-ratio:1/1;border-radius:50%;top:0%;left:3px;filter:drop-shadow(0 0 0.5rem black);border:none;";
        imgH6.appendChild(img);
        imgH6.appendChild(h6);
        popup.appendChild(imgH6);
        const para=document.createElement("p");
        para.id="showMaskDetail-popup-para";
        para.style.cssText="font-family:'Poppins-thin';font-weight:600;text-wrap:pretty;padding:7px;border-radius:12px;margin-inline:auto;color:black;background-color:white;";
        para.style.fontSize=window.innerWidth < 900 ? (window.innerWidth <500 ? "100%" : "130%") :"140%";
        h6.style.fontSize=window.innerWidth < 900 ? (window.innerWidth <500 ? "100%" : "130%") :"140%";
        para.textContent=item.detail;
        popup.appendChild(para);
        popup.style.inset=window.innerWidth < 900 ? (window.innerWidth <500 ? "0%" : "-1rem") :"-1rem";
        
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{inset:"0%",gap:"5px"}});
        Misc.matchMedia({parent:h6,maxWidth:400,cssStyle:{fontSize:"100%"}});
        Misc.matchMedia({parent:imgH6,maxWidth:400,cssStyle:{flexDirection:"column"}});
        Misc.matchMedia({parent:img,maxWidth:400,cssStyle:{position:"static"}});
        Misc.matchMedia({parent:para,maxWidth:400,cssStyle:{fontSize:"100%",padding:"5px"}});
        //CLOSE----///
        const xDiv=document.createElement("div");
        xDiv.style.cssText="border-radius:50%;background:black;position:absolute;top:0%;right:0%;transform:translate(-22px,22px);diplay:flex;justify-content:center;align-items:center;padding:0.15rem;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"20px",color:"white"}});
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
        btnCont.style.cssText="margin-inline:auto;margin-block:0.55rem;display:flex;justify-content:center;align-items:center;gap:2rem;position:relative;";
        btnCont.id="showMaskDetail-popup-btnCont";
        const {button:editor}=Misc.simpleButton({anchor:btnCont,text:"editor",bg:"blue",color:"white",time:400,type:"button"});
        editor.style.marginInline="auto"
        editor.id="btn-editor-go";
        const icon=document.createElement("div");
        icon.style.cssText="padding:8px;border-radius:50%;background:blue;transform:scale(1.3);"
        FaCreate({parent:icon,name:IoArrowRedoSharp,cssStyle:{fontSize:"26px",backgroundColor:"black",color:"white",padding:"5px",borderRadius:"50%"}});
        btnCont.appendChild(icon);
        Misc.matchMedia({parent:btnCont,maxWidth:400,cssStyle:{marginBlock:"0px"}});
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

    introTitleDisplay(item:{parent:HTMLElement,show:boolean,time:number}):Promise<HTMLElement>{
        const {parent,show,time}=item;
        const bgColor= show ? "#0b0a0a7a":"transparent";
        parent.style.backgroundColor=bgColor;
        const less900=window.innerWidth <900;
        const less600=window.innerWidth <600;
        const less400=window.innerWidth <400;
        const container=document.createElement("div");
        container.id="home-introTitleDisplay-container";
        container.style.cssText="margin-inline:auto;width:100%;height:auto;display:flex;flex-direction:column;place-items:center";
        container.style.opacity=bgColor;
        container.style.paddingInline=less900 ? (less600 ? (less400 ? "0rem":"1.5rem") :"1.75rem"): "6rem";
        container.style.gap="0px";
        //----------------titleOneLineCont-------------------------//
        const lineHeight=this.titleOneLine({parent:container,text:"blog",show:show,time:time,less900,less600,less400});
        //----------------titleOneLineCont-------------------------//
        //----------------titleTwo-------------------------//
        this.titleTwoOnLine({parent:container,text:"ablogroom",show:show,time:time*1.62,less900,less600,less400});
        //----------------titleTwo-------------------------//
        //----------------titleThree-------------------------//
        this.titleThreeOnLine({parent:container,text:"Blogs",show:show,time:(time*1.62)*1.62,less900,less600,less400});
        //----------------titleThree-------------------------//
        //----------------underline-------------------------//
        this.underline({parent:container,time,show,lineHeight});
        //----------------underline-------------------------//
        //----------------subTitle-------------------------//
        this.subTitle({parent:container,text:" the best blog editor in canada",show:show,time:(time*1.62)*1.62*1.62,less900,less600,less400});
        //----------------subTitle-------------------------//
        parent.appendChild(container);
        return new Promise((resolver=>{
            resolver(parent)
        })) as Promise<HTMLElement>;
    }
    titleOneLine(item:{parent:HTMLElement,text:string,show:boolean,time:number,less900:boolean,less600:boolean,less400:boolean}):number{
        const {parent,show,time,text,less900,less600,less400}=item;
        const lineHeightratio=0.4;
        const timeDiff=time + 1000;
        const opacity=show ? "1":"0";
        const titleOneLineCont=document.createElement("div");
        titleOneLineCont.id="container-titleOneLineCont";
        titleOneLineCont.style.cssText="margin-inline:auto;display:flex;place-items:center;padding:auto;width:100%;";
        titleOneLineCont.style.gap=less900 ? (less600 ? (less400 ? "0.25rem":"0.75rem") :"1.25rem"): "0.75rem";
        titleOneLineCont.style.opacity=opacity;
        const logo=document.createElement("img");
        logo.id="titleOneLineCont-img";
        logo.style.cssText="aspect-ration: 1 / 1;filter:drop-shadow(0 0 0.5rem rgba(12, 175, 255,0.5));border-radius:50%;align-self:center;";
        const titleOne=document.createElement("p");
        titleOne.id="titleOneLineCont-titleOne";
        titleOne.style.cssText="text-transform:uppercase;color:white;";
        titleOne.style.lineHeight=less900 ? (less600 ? (less400 ? "0.75rem":"1.15rem"):"1.5rem"):"1.75rem";
        logo.style.width=less900 ? (less600 ? (less400 ? "22px":"26px") : "32px") : "37px";
        const logoWidth=less900 ? (less600 ? (less400 ? 22:26) : 32) : 37;
        logo.src=imageLoader({src:this.logo,width:logoWidth,quality:75});
        titleOne.style.fontSize=less900 ? (less600 ? (less400 ? "22px":"26px") : "32px") : "37px";
        const calcHeight=lineHeightratio*(parseInt(titleOne.style.fontSize.split("px")[0]));
        titleOne.textContent=text;
        const line1=document.createElement("div");
        line1.style.cssText="width:100%";
        line1.id="titleOneLineCont-line1";
        line1.className="lineStyleOne";
        line1.style.height=`${calcHeight}px`;//calculated height
        line1.style.minWidth=`100px`;//calculated height
        const line2=document.createElement("div");
        line2.style.cssText="width:100%";
        line2.id="titleOneLineCont-line2";
        line2.className="lineStyleOne";
        line2.style.height=`${calcHeight}px`;//calculated height
        line2.style.minWidth=`100px`;//calculated height
        titleOneLineCont.appendChild(line1);//append
        titleOneLineCont.appendChild(logo);//append
        titleOneLineCont.appendChild(titleOne);//append
        titleOneLineCont.appendChild(line2);//append
        if(show){
            titleOneLineCont.animate([
                {transform:"translateX(-50%)",opacity:"0"},
                {transform:"translateX(0%)",opacity:"1"},
            ],{duration:timeDiff,iterations:1,"easing":"ease-in-out"});
        }
        parent.appendChild(titleOneLineCont);//append
        return calcHeight;
    }
    titleTwoOnLine(item:{parent:HTMLElement,text:string,less900:boolean,less600:boolean,less400:boolean,show:boolean,time:number}){
        const {parent,show,time,text,less900,less600,less400}=item;
        const timeDiff=time + 1000;
        const opacity=show ? "1":"0";
        const titleTwo=document.createElement("p");
        titleTwo.id="container-titleTwo";
        titleTwo.style.cssText="margin-inline:auto;text-transform:uppercase;";
        titleTwo.style.opacity=opacity;
        titleTwo.textContent=text;
        titleTwo.style.fontSize=less900 ? (less600 ? (less400 ? "40px":"50px"): "60px") : "70px";
        titleTwo.style.lineHeight=less900 ? (less600 ? (less400 ? "1.75rem":"2.1rem"): "2.55rem") : "2.95rem";
        titleTwo.className="titleStyleOne";
        if(show){
            titleTwo.animate([
                {transform:"translateX(-50%)",opacity:"0"},
                {transform:"translateX(0%)",opacity:"1"},
            ],{duration:timeDiff,iterations:1,"easing":"ease-in-out"});
        }
        parent.appendChild(titleTwo);
    }
    titleThreeOnLine(item:{parent:HTMLElement,text:string,less900:boolean,less600:boolean,less400:boolean,show:boolean,time:number}){
        const {parent,time,text,less900,less600,less400,show}=item;
        const timeDiff=time + 1000;
        const opacity=show ? "1":"0";
        const titleThree=document.createElement("p");
        titleThree.id="container-titleThree";
        titleThree.style.cssText="margin-inline:auto;text-transform:uppercase;";
        titleThree.textContent=text;
        titleThree.style.fontSize=less900 ? (less600 ? (less400 ? "85px":"95px"): "120px") : "150px";
        titleThree.style.lineHeight=less900 ? (less600 ? (less400 ? "2.25rem":"3rem"): "4.25rem") : "6.15rem";
        titleThree.style.opacity=opacity;
        titleThree.className="titleStyleTwo";
        if(show){
            titleThree.animate([
                {transform:"translateX(-50%)",opacity:"0"},
                {transform:"translateX(0%)",opacity:"1"},
            ],{duration:timeDiff,iterations:1,"easing":"ease-in-out"});
        }
        parent.appendChild(titleThree);
    }
    
    underline(item:{parent:HTMLElement,show:boolean,time:number,lineHeight:number}){
        const {parent,time,show,lineHeight}=item;
        const timeDiff=time + 1000;
        const opacity=show ? "1":"0";
        const underline=document.createElement("div");
        underline.id="container-underline";
        underline.style.height=`${lineHeight}px`;
        underline.style.opacity=opacity;
        underline.className="lineStyleOne";
        if(show){
            underline.animate([
                {transform:"translateX(-50%)",opacity:"0"},
                {transform:"translateX(0%)",opacity:"1"},
            ],{duration:timeDiff,iterations:1,"easing":"ease-in-out"});
        }
        parent.appendChild(underline);
    }
    subTitle(item:{parent:HTMLElement,text:string,less900:boolean,less600:boolean,less400:boolean,show:boolean,time:number}){
        const {parent,show,time,text,less900,less600,less400}=item;
        const timeDiff=time + 1000;
        const opacity=show ? "1":"0";
        const subTitle=document.createElement("p");
        subTitle.id="container-subTitle";
        subTitle.style.cssText="margin-inline:auto;text-transform:uppercase;text-wrap:pretty;";
        subTitle.style.opacity=opacity;
        subTitle.textContent=text;
        subTitle.style.fontSize=less900 ? (less600 ? (less400 ? "18px":"22px"): "24px") : "30px";
        subTitle.style.paddingInline=less900 ? (less600 ? (less400 ? "1.25rem":"1.5rem"): "2rem") : "3rem";
        subTitle.className="subTitleStyleThree";
        if(show){
            subTitle.animate([
                {transform:"translateX(-50%)",opacity:"0"},
                {transform:"translateX(0%)",opacity:"1"},
            ],{duration:timeDiff,iterations:1,"easing":"ease-in-out"});
        }
        parent.appendChild(subTitle);
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
                const url=new URL(window.location.href);
                this.intro.main(parent,url.origin);
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
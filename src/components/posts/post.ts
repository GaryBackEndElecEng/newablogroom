import Service from "../common/services";
import ModSelector from "../editor/modSelector";
import { postType, statusType, userType } from "../editor/Types";
import Nav from "../nav/headerNav";
import Misc from "../common/misc/misc";
import Header from "../editor/header";
import { FaCrosshairs,FaThumbsUp } from "react-icons/fa";
import { FaCreate } from "../common/ReactIcons";
import { FaHandBackFist } from "react-icons/fa6";
import { imageLoader } from "../common/tsFunctions";
import AddImageUrl from "../common/addImageUrl";
import PostDetail from "../postDetail/postdetail";
import Searchbar from "../common/searchbar";
import BrowserType from "../common/browserType";


class Post{
   public readonly handPic:string="/images/hand.png";
   public readonly smile:string="/images/emojiSmile.png";
   public readonly background1:string="/images/backround1.png";
   public readonly btnColor:string;
   public readonly btnUpdate:string;
   public readonly btnDetail:string;
   public count:number;
   public no_posts:string;
   public addImageClass:AddImageUrl
   public logo:string;
   public postLogo:string;
    private _post:postType;
   private initPost:postType;
   private _posts:postType[];
   public injector:HTMLElement;
   private _like:boolean;
   private postDetail:PostDetail;
   private _usersinfo:userType[];
    private _user:userType|null;
   public searchbar:Searchbar;
    public browser:BrowserType;

    constructor(private _modSelector:ModSelector,private _service:Service,private _status:statusType,signinUser:userType|null){
        this._user=signinUser;
        this.btnColor=this._modSelector.btnColor;
        this.btnUpdate=this._modSelector.btnUpDate;
        this.btnDetail=this._modSelector.btnDetail;
        this.background1="/images/backround1.png";
        this.smile="/images/emojiSmile.png";
        this.logo="/images/gb_logo.png";
        this.postLogo="/images/posts.png";
        this.no_posts="Sorry there are no posts,,,try again later,, then add advertising to get contracts;";
        this.initPost={id:0,title:"",imageKey:undefined,image:undefined,sendReqKey:undefined,sendMsg:undefined,content:undefined,link:undefined,published:true,userId:"",date:{} as Date,likes:0} as postType;
        this._post=this.initPost;
        this._posts=[] as postType[];
        this._like=false;
        this._usersinfo=[] as userType[];
        this.addImageClass= new AddImageUrl(this._modSelector,this._service);
        this.postDetail=new PostDetail(this._modSelector,this._service,this._status,this._user);
        this.count=0;
        this.handPic="/images/hand.png";
        this.browser=new BrowserType(this._user?.id || "");
       
        
    };

    
    //----GETTERS SETTERS----////
    get post(){
        return this._post;
    };
    set post(post:postType){
        this._post=post;
    };
    get posts(){
        return this._posts;
    };
    set posts(posts:postType[]){
        this._posts=posts;
    };
    get like(){
        return this._like;
    };
    set like(like:boolean){
        this._like=like;
    };
    get usersinfo(){
        return this._usersinfo;
    };
    set usersinfo(usersinfo:userType[]){
        this._usersinfo=usersinfo;
    };
    get user(){
        return this._user;
    };
    get status(){
        return this._status;
    };
    set status(status:statusType){
        this._status=status;
    };

    loadPosts({posts}:{posts:postType[]}):Promise<postType[]>{

        this.posts=posts;
        return Promise.resolve(this.posts) as Promise<postType[]>
    };
    
    //----GETTERS SETTERS----////

    async main(item:{injector:HTMLElement,posts:postType[],usersinfo:userType[]}){
        const {injector,posts,usersinfo}=item;
        const isSignedIn=this.status==="authenticated";
        //recieved posts:posts from index
        //CONTROLLING THE ANIMATION ITERATIONS
        const repeatCount=1;
        const isAnimate=this.browser.repeatShowControl({repeatCount});
       
        //CONTROLLING THE ANIMATION ITERATIONS
        const url=new URL(window.location.href);
        const pathname=url.pathname;
        this.posts=posts;
        this.searchbar= new Searchbar({blogs:null,posts:this.posts});//INPUT INTO POST DISPLAYS
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        this.usersinfo=usersinfo;
        
        Header.cleanUpByID(injector,"main-post-container");
        const css_col="margin-inline:auto;display:flex;flex-direction:column;align-items:center;margin-block:1.65rem;";
        this.injector=injector;
        const container=document.createElement("div");
        container.id="main-post-container";
        container.style.cssText=css_col + " width:100%;min-height:110vh;";
        container.style.gap=less900 ? (less400 ? "3rem":"2.5rem"):"2rem";
        injector.appendChild(container);
        if(this.user?.id && isSignedIn){
            const {button:create_post}=Misc.simpleButton({anchor:container,type:"button",bg:this.btnColor,color:"white",time:400,text:"create a post"});
            create_post.style.marginBottom="1rem;"
            create_post.onclick=(e:MouseEvent) =>{
                if(e){
                    this.createPost({injector:injector,user:this.user as userType,pathname,mainPostCont:container});
                }
            };
        }
        Misc.matchMedia({parent:injector,maxWidth:1200,cssStyle:{width:"85%"}});
        Misc.matchMedia({parent:injector,maxWidth:1000,cssStyle:{width:"90%"}});
        Misc.matchMedia({parent:injector,maxWidth:900,cssStyle:{width:"100%"}});


        this.titlePage({container,time:4000,less400,less900,isAnimate}).then(async(res)=>{
            if(res){
                res.para.style.fontSize=less900 ? (less400 ? "130%":"150%"):"135%";
                //SEARCH BAR CONTROLS THE POST LISTS funcPosts is the DISPLAYER
                await this.searchbar.mainPost({
                    parent:container,
                    funcPost:async({posts})=>{
                        //RETURN FILED POSTS
                        await this.Posts({container,posts:posts,user:this.user}).then(async(res_)=>{
                            if(res_){
                               
                                if(res_.posts && res_.posts.length>0){
                                    this.posts=res_.posts.toSorted((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                        
                                    this.posts.map(async(post,index)=>{
                                        if(post){
                                            const userinfo=usersinfo.find(user_=>(user_.id===post.userId));
                                            this.postCard({row:res_.row,post,user:this.user,userinfo,index,pathname});
                                        }
                                    });
                                    Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                                }else{
                                    this.noPosts({parent:container,posts:this.posts});
                                }
                                
                            }
                        });
                    }
                });
                

            }
        });
        injector.animate([
            {opacity:"0"},
            {opacity:"1"}
        ],{duration:1000,iterations:1,"easing":"ease-in-out"});
    };



    async titlePage(item:{
        container:HTMLElement,
        time:number,
        less900:boolean,
        less400:boolean,
        isAnimate:boolean
    }):Promise<{
        textContainer:HTMLElement,
        container:HTMLElement,
        para:HTMLElement,
        time:number,
        isAnimate:boolean
       
    }>{
        const phrase="updates, comments && Miscelanous";
        const {container,time,less400,less900,isAnimate}=item;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;";
        const textContainer=document.createElement("div");
        textContainer.id="post-titlepage-textContainer";
        textContainer.style.cssText=css_col + "background-color:black;border-radius:12px;margin-top:1rem;filter:drop-shadow(0 0 0.5rem white);position:relative;";
        textContainer.style.width="100%";
        textContainer.style.paddingBottom=less900 ? (less400 ? "2rem":"2.5rem") : "2rem";
        textContainer.style.paddingInline=less900 ? "1rem" : "2rem";
        const text=document.createElement("p");
        text.id="textContainer-mainTitle";
        text.className="subTitleStyleThreeNoBorder text-center  my-2 mb-4 mx-auto lean";
        text.style.cssText="margin-bottom:1.62rem;background:linear-gradient(180deg, #fff, #06a4f7);background-clip:text;-webkit-background-clip:text;";
        text.style.fontSize=less900 ? (less400 ? "200%":"300%"):"375%";
        text.textContent="Savy posts";
        text.id="showBlogs-title";
        text.style.position="relative";
        text.style.textTransform="capitalize";
        const div1=document.createElement("div");
        div1.id="textContainer-div1";
        //#0804e9
        div1.style.cssText="margin-inline:auto;width:85%;height:3px;filter:drop-shadow(0 0 0.25rem blue);";
        div1.style.height=less900 ? (less400 ? "5px":"8px"):"9px";
        div1.className="lineStyleOne";
        const div2=document.createElement("div");
        div2.id="textContainer-div1";
        div2.className="lineStyleOne";
        div2.style.cssText="margin-block;margin-inline:auto;width:55%;height:3px;filter:drop-shadow(0 0 0.25rem blue);";
        div2.style.height=less900 ? (less400 ? "5px":"8px"):"9px";
        const para=document.createElement("p");
        para.id="textContainer-para";
       
        para.style.cssText="padding-block:1rem;padding-inline:1rem;margin-inline:auto;margin-top:0.5rem;text-wrap:wrap;text-align:center;box-shadow:1px 1px 3px 1px #06a4f7;";
        para.style.fontSize=less900 ? (less400 ? "130%":"150%"):"175%";
        para.style.color="#06a4f7";
        textContainer.appendChild(text);
        textContainer.appendChild(div1);
        textContainer.appendChild(div2);
        textContainer.appendChild(para);
        //-----------------SPACE FOR INTRODUCTION TO BE DISPLAYED---------------------//
        const introContainer=document.createElement("div");
        introContainer.id="showIntro-container";
        introContainer.style.cssText=css_col + "box-shadow:1px 1px 3px 1px rgb(6, 164, 247);border-radius:12px;backgroun:transparent;color:white;font-family:Poppins-regular;";
        textContainer.appendChild(introContainer);
        introContainer.style.opacity="0";
        introContainer.style.minHeight=less900 ? (less400 ? "170px":"100px"):"75px";
        //-----------------SPACE FOR INTRODUCTION TO BE DISPLAYED---------------------//
        if(isAnimate){
            this.handSmileWave({introContainer:introContainer,innerParent:text,less400,less900,time:4000});
        }else{
            this.showIntroduction({introContainer,less900,less400}).then(async(res)=>{
                if(res){
                    //hide vertical effects
                    
                    //hide vertical effects
                    const containerKeyEffect=new KeyframeEffect(res.introContainer,[
                        {transform:"translateY(150%)",opacity:"0"},
                        {transform:"translateY(0%)",opacity:"1"},
                    ],{iterations:1,duration:time*0.5,"easing":"ease-in-out"});
                    const paraKeyEffect=new KeyframeEffect(res.para,[
                        {transform:"translateY(-150%)",opacity:"0"},
                        {transform:"translateY(0%)",opacity:"1"},
                    ],{iterations:1,duration:time*0.25,"easing":"ease-in-out"});
                    const smallKeyEffect=new KeyframeEffect(res.para,[
                        {transform:"translateX(150%)",opacity:"0"},
                        {transform:"translateX(0%)",opacity:"1"},
                    ],{iterations:1,duration:time*0.5,"easing":"ease-in-out"});
                    res.introContainer.style.opacity="1";
                    const containerAnimate= new Animation(containerKeyEffect,document.timeline);
                    const paraAnimate= new Animation(paraKeyEffect,document.timeline);
                    const smallAnimate= new Animation(smallKeyEffect,document.timeline);
                    res.para.style.opacity="1";
                    containerAnimate.play();
                    paraAnimate.play();
                    res.small.style.opacity="1";
                    smallAnimate.play();

                }
            });
        }
        textContainer.style.opacity="0";
        para.style.opacity="0";
        textContainer.style.transform="scale(0.8)";
        para.style.textTransform="uppercase";
        ///--------------------------title display ----------------------///
        textContainer.style.opacity="1";
        textContainer.style.overflowY="hidden";
        textContainer.style.transform="scale(1)";
        textContainer.animate([
            {transform:"scale(0.8)",opacity:"0"},
            {transform:"scale(1)",opacity:"1"},
        ],{duration:time,iterations:1,"easing":"ease-in-out"});
        para.style.opacity="1";
            para.style.borderRadius="12px";

            //LIMITING THE EFFECT COUNT ON PAGE VISITS
            
               
                if(isAnimate){
                    await this.phraseArt({target:para,less400,less900,phrase,time}).then(async(res)=>{
                      if(res){
                          res.target.style.opacity="1";
                          ([...res.target.children as any] as HTMLElement[]).map(span=>{
                              span.style.opacity="1";
                              span.style.letterSpacing=less900 ? (less400 ? "0.1rem":"0.13rem"):"0.2rem";
                              const letterSpacing=less900 ? (less400 ? "0.3rem":"0.5rem"):"1rem";
                              const fallingLetter=new KeyframeEffect(
                                  span,
                                  [
                                      {opacity:"0"},
                                      {opacity:"1",letterSpacing:"normal",lineHeight:"normal",fontSize:"100%"},
                                      {opacity:"1",letterSpacing:letterSpacing,lineHeight:"1.75rem",fontSize:"100%"},
                                      {opacity:"1",letterSpacing:".2rem",lineHeight:"normal",fontSize:"100%"},
                                  ],
                                  {
                                      duration:time,
                                      direction:"normal", //reverse,alternate
                                      easing:"linear",
                                      iterations:1,
                                      // delay:time*10,
                                      // composite:"replace"
                                  }
                                  
                              );
                              const runfallingletter= new Animation(fallingLetter,document.timeline);
                              runfallingletter.play();
                          });
                      }
                    });
                }else{
                    para.textContent=phrase;
                }
           
        ///--------------------------title display ----------------------///
        
        container.appendChild(textContainer);
        return Promise.resolve({textContainer,container,para,time,isAnimate}) as Promise<{textContainer:HTMLElement,container:HTMLElement,para:HTMLElement,time:number,isAnimate:boolean}>;
    };



    phraseArt({target,phrase,less400,less900,time}:{target:HTMLElement,phrase:string,less400:boolean,less900:boolean,time:number}):Promise<{target:HTMLElement}>{
        const wordArr=phrase.split("");
        target.style.opacity="0";
        wordArr.map(lt=>{
            if(lt){
                const span=document.createElement("span");
                span.textContent=lt;
                span.style.cssText="opacity:0;";
                target.appendChild(span);
            }
        });
        return Promise.resolve({target}) as Promise<{target:HTMLElement}>;
       
    };



    handSmileWave({introContainer,innerParent,less400,less900,time}:{introContainer:HTMLElement,innerParent:HTMLElement,less400:boolean,less900:boolean,time:number}){

        const hand=document.createElement("img");
        hand.id="imgCont-img";
        const smile=document.createElement("img");
        smile.id="imgCont-smile";
        const imgContainer=document.createElement("div");
        imgContainer.id="handWave-imgContainer";
        imgContainer.style.cssText="position:absolute;display:flex;align-items:center;justify-content:center;position:relative;z-index:2;background:transparent;top:0%;left:0%;";
        imgContainer.className="position-absolute";
        imgContainer.style.left="0%";
        imgContainer.style.top="0%";
        imgContainer.style.position="absolute";
        imgContainer.style.top=less900 ? (less400 ? "-5%":"25%"):"25%";
        imgContainer.style.left=less900 ? (less400 ? "-80%":"-125%"):"-200%";
        imgContainer.style.transform=less900 ? (less400 ? "translate(-10px,-5px)":"translate(-5px,-10px)"):"translate(-20px,-20px";
        imgContainer.style.width=less900 ? (less400 ? "90px":"120px"):"143px";
        hand.style.cssText="margin-auto;filter:drop-shadow(0 0 0.5rem lightblue);position:relative;";
        hand.src=this.handPic;
        hand.alt="www.ablogroom.com";
        smile.style.cssText="margin-auto;filter:drop-shadow(0 0 0.5rem lightblue);position:relative;";
        smile.style.width=less900 ? (less400 ? "48px":"68px"):"78px";
        hand.style.width=less900 ? (less400 ? "28px":"35px"):"35px";
        hand.style.left="13%";
        hand.style.transform=less900 ? (less400 ? "translate(10px,-12px)":"translate(8px,25px)"):"translate(-20px,-20px)";
        smile.style.transform=less900 ? (less400 ? "translate(10px,20px)":"translate(8px,25px)"):"translate(10px,36px)";
        imgContainer.appendChild(hand);
        imgContainer.appendChild(smile);
        smile.src=this.smile;
        smile.alt="www.ablogroom.com";
        innerParent.appendChild(imgContainer);
        const transform=imgContainer.style.transform;
        hand.animate([
            {transform:"rotate(45deg)"},
            {transform:"rotate(0deg)"},
            {transform:"rotate(-45deg)"},
            {transform:"rotate(0deg)"},
            {transform:"rotate(45deg)"},
        ],{duration:time,iterations:Infinity,"composite":"replace"});
        imgContainer.animate([
            {transform:`scale(0) ${transform}`,opacity:"0"},
            {transform:`scale(1) ${transform}`,opacity:"1"},
        ],{duration:time,iterations:1});
        setTimeout(()=>{
            imgContainer.animate([
                {transform:`translateX(0%) ${transform}`,opacity:"1"},
                {transform:`translateX(-120%) ${transform}`,opacity:"0"},
            ],{duration:time,iterations:1});;
            setTimeout(()=>{innerParent.removeChild(imgContainer)},time-30);
            this.showIntroduction({introContainer,less900,less400}).then(async(res)=>{
                if(res){
                    //hide vertical effects
                    
                    //hide vertical effects
                    const containerKeyEffect=new KeyframeEffect(res.introContainer,[
                        {transform:"translateY(150%)",opacity:"0"},
                        {transform:"translateY(0%)",opacity:"1"},
                    ],{iterations:1,duration:time*0.5,"easing":"ease-in-out"});
                    const paraKeyEffect=new KeyframeEffect(res.para,[
                        {transform:"translateY(-150%)",opacity:"0"},
                        {transform:"translateY(0%)",opacity:"1"},
                    ],{iterations:1,duration:time*0.25,"easing":"ease-in-out"});
                    const smallKeyEffect=new KeyframeEffect(res.para,[
                        {transform:"translateX(150%)",opacity:"0"},
                        {transform:"translateX(0%)",opacity:"1"},
                    ],{iterations:1,duration:time*0.5,"easing":"ease-in-out"});
                    res.introContainer.style.opacity="1";
                    const containerAnimate= new Animation(containerKeyEffect,document.timeline);
                    const paraAnimate= new Animation(paraKeyEffect,document.timeline);
                    const smallAnimate= new Animation(smallKeyEffect,document.timeline);
                    res.para.style.opacity="1";
                    containerAnimate.play();
                    paraAnimate.play();
                    res.small.style.opacity="1";
                    smallAnimate.play();

                }
            });
        },time*2);


    };


    async showIntroduction({introContainer,less900,less400}:{introContainer:HTMLElement,less400:boolean,less900:boolean}):Promise<{introContainer:HTMLElement,para:HTMLElement,small:HTMLElement}>{
       
        const para=document.createElement("p");
        para.innerHTML="Science, Technology, Puzzles,Thoughts and Riddles all on one page for your<span style=font-weight:bold;> Interest.</span>";
        const small=document.createElement("small");
        small.textContent="Send Us a thought or suggestion and we will get On It!";
        para.style.opacity="0";
        small.style.opacity="0";
        introContainer.appendChild(para);
        introContainer.appendChild(small);
        introContainer.style.opacity="0";
        introContainer.style.paddingInline=less900 ? (less400 ? "10px":"1rem"):"2rem";
        introContainer.style.minHeight=less900 ? (less400 ? "170px":"100px"):"75px";
        return Promise.resolve({introContainer,para,small}) as Promise<{introContainer:HTMLElement,para:HTMLElement,small:HTMLElement}>;
    };


    async Posts(item:{container:HTMLElement,posts:postType[],user:userType|null}):Promise<{container:HTMLElement,subDiv:HTMLElement,row:HTMLElement,posts:postType[],user:userType|null}>{
        const {container,posts,user}=item;
        const less900=window.innerWidth < 900 ;
        const less400=window.innerWidth < 400 ;
        Header.cleanUpByID(container,"main-post-container-subDiv");//CLEANING UP
        const css="margin-inline:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:1.5rem;";
        const css_row="margin-inline:auto;display:flex;justify-content:flex-start;align-items:flex-start;flex-wrap:wrap;width:100%;";
    
        const subDiv=document.createElement("div");
        subDiv.id="main-post-container-subDiv";
        subDiv.style.cssText=css + "position:relative;width:100%;padding-inline:2rem;border-radius:12px;";
        subDiv.style.paddingInline=less900 ? (less400 ? "0rem" : "0.5rem") : "2rem";
        subDiv.style.paddingBottom=less900 ? (less400 ? "2rem" : "1.5rem") :"2rem";
        subDiv.style.height="100vh";
        subDiv.style.overflowY="scroll";
        const row=document.createElement("div");
        row.id="main-post-container-subDiv-row";
        row.style.cssText=css_row + "gap:1rem;";
        row.style.justifyContent="flex-start";
        if(less900){
            row.classList.remove("row");
            row.style.flexDirection="column";
            row.style.display="block";
            row.style.gap="2rem";
        }else{
            row.className="row";

        }
        subDiv.appendChild(row);
        container.appendChild(subDiv);
        return Promise.resolve({container,subDiv,row,posts,user}) as Promise<{container:HTMLElement,subDiv:HTMLElement,row:HTMLElement,posts:postType[],user:userType}>;
    };



    createPost(item:{injector:HTMLElement,user:userType,pathname:string|null,mainPostCont:HTMLElement}){
        const {injector,user,pathname,mainPostCont}=item;
        const less900= window.innerWidth < 900;
        const less400= window.innerWidth < 400;
        injector.style.position="relative";
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
        const css_row="margin-inline:auto;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.7rem;";
        Header.cleanUpByID(injector,`createPost-popup`);
        const popup=document.createElement("div");
        popup.id=`createPost-popup`;
        popup.style.cssText=css_col + "position:absolute;min-height:400px;gap:1rem;box-shadow:1px 1px 12px 1px blue;border-radius:12px;backdrop-filter:blur(20px);border:none;z-index:100;";
        popup.style.width=less900 ? (less400 ? "375px":"575px"):"675px";
        const form=document.createElement("form");
        form.id="createPost-form";
        form.style.cssText=css_col + "width:100%;padding-inline:1rem;margin-block:1.5rem;";
        const {input:inTitle,label:lTitle,formGrp:grpTitle}=Nav.inputComponent(form);
        grpTitle.style.cssText=css_col + "width:100% !important;";
        grpTitle.style.width="100% !important";
        inTitle.id="title";
        inTitle.style.cssText="width:100%;margin-inline:auto;padding-inline:1rem;"
        inTitle.name="title";
        inTitle.placeholder="Your Title";
        lTitle.textContent="Title";
        lTitle.style.cssText="font-size:140%;text-decoration:underline;text-underline-offset:0.5rem;margin-bottom:1rem;";
        lTitle.setAttribute("for",inTitle.id);
        inTitle.onchange=(e:Event)=>{
            if(e){
                const content=(incontent as HTMLTextAreaElement).value;
                const title=(e.currentTarget as HTMLInputElement).value;
                const {disabled,msg,type,time}=this.enableSubmit({title,content})
                submit.disabled=disabled;
               if(msg) Misc.message({parent:form,msg,type_:type,time})
            }
        };
        const {textarea:incontent,label:lcontent,formGrp:grpContent}=Nav.textareaComponent(form);
        grpContent.style.cssText=css_col + "width:100%;";
        grpContent.style.width="100%";
        incontent.id="content";
        incontent.rows=4;
        incontent.style.cssText="width:100%";
        incontent.name="content";
        incontent.placeholder="Your Thoughts";
        lcontent.textContent="content";
        lcontent.style.cssText="font-size:140%;text-decoration:underline;text-underline-offset:0.5rem;margin-bottom:1rem;";
        lcontent.setAttribute("for",incontent.id);
        incontent.onchange=(e:Event)=>{
            if(e){
                const title=(inTitle as HTMLInputElement).value;
                const content=(e.currentTarget as HTMLTextAreaElement).value;
                const {disabled,msg,type,time}=this.enableSubmit({title,content})
                submit.disabled=disabled;
               if(msg) Misc.message({parent:form,msg,type_:type,time})
            }
        };
        //MSG INPUT FOR EMAILING
        const {textarea:textareaSendMsg,label:lSendMsg,formGrp:grpSendMsg}=Nav.textareaComponent(form);
        grpSendMsg.id="form-group-sendMsg";
        grpSendMsg.style.cssText="margin-inline:auto;width:100%;";
        grpSendMsg.className="text-light text-center";
        textareaSendMsg.id="editPost-post-sendMsg";
        textareaSendMsg.name="sendMsg";
        textareaSendMsg.autocomplete="off";
        textareaSendMsg.rows=4;
        textareaSendMsg.style.cssText="border-radius:12px;box-shadow:1px 1px 12px 1px black;";
        textareaSendMsg.style.width="100%;";
        textareaSendMsg.placeholder="answer to your posts, if required";
        lSendMsg.textContent="Your respond email msg";
        lSendMsg.className="text-light display-6";
        lSendMsg.setAttribute("for",textareaSendMsg.id);
        //MSG INPUT FOR EMAILING
        const {input:pub,label:lpub,formGrp:grpPub}=Nav.inputComponent(form);
        grpPub.className="";
        pub.className="";
        pub.id="pub";
        pub.name="pub";
        pub.type="checkbox";
        pub.checked=true;
        lpub.textContent="publish";
        lpub.style.cssText="font-size:140%;text-decoration:underline;text-underline-offset:0.5rem;margin-bottom:1rem;";
        lpub.setAttribute("for",pub.id);
        const {input:link,label:lLink}=Nav.inputComponent(form);
        link.id="link";
        link.name="link";
        link.placeholder="https://example.com";
        link.type="url";
        link.pattern="https://*.";
        lLink.textContent="add a link ";
        lLink.style.cssText="font-size:140%;text-decoration:underline;text-underline-offset:0.5rem;margin-bottom:1rem;";
        lLink.setAttribute("for",link.id);
        const btnContainer=document.createElement("div");
        btnContainer.id="createPoste-btnContainer";
        btnContainer.style.cssText=css_row + "";
        const {button:submit}=Misc.simpleButton({anchor:form,type:"submit",bg:this.btnColor,color:"white",text:"submit",time:400});
        submit.disabled=true;
        form.appendChild(btnContainer);
        popup.appendChild(form);
        injector.appendChild(popup);
        Misc.fadeIn({anchor:popup,xpos:100,ypos:100,time:500});
        //-------DELETE----------//
        const xDiv=document.createElement("div");
        xDiv.id="xDiv-delete-createpost"
        xDiv.style.cssText=css_col + "position:absolute;padding:0.7rem;background:black;color:white;top:0%;right:0%;transform:translate(-12px,12px);border-radius:50%;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"22px",backgroundColor:"grey",borderradius:"50%",padding:"2px"}});
        popup.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent) =>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    injector.removeChild(popup);
                },390);
            }
        };
        //-------DELETE----------//
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                submit.disabled=true;
                submit.hidden=true;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const content=formdata.get("content") as string;
                const title=formdata.get("title") as string;
                const sendMsg=formdata.get("sendMsg") as string|undefined;
                const pub=formdata.get("pub") as string;
                const link=formdata.get("link") as string|undefined;
                if(content && title){
                    const send_msg=sendMsg;
                    const post:postType={...this.initPost,userId:user.id,sendMsg:send_msg,title:title as string,content:content as string,published:Boolean(pub),link}
                    this.uploadFreeNone({injector,popup:popup,post:post,user,css_col,css_row,pathname,mainPostCont});
                    const labelDisplay2=injector.querySelector("div#labelDisplay2") as HTMLElement;
                    if(labelDisplay2){
                        labelDisplay2.hidden=false;
                    }
                }
            }
        };
    };

    enableSubmit({title,content}:{title:string,content:string|null}):{disabled:boolean,msg:string|null,type:"success"|"error",time:number}{
        const regTitle:RegExp=/\w+/;
        const regContent:RegExp=/\w{5,}/;
        const testTitle=regTitle.test(title);
        const testContent=content ? regContent.test(content):false;
       
        if(testTitle && testContent){
            return {disabled:false,msg:"thanks",type:"success",time:600};
        }else if(testContent && !testTitle){
            return {disabled:true,msg:"you forgot the title",type:"error",time:1200};
        }else if(!(testTitle && testContent)){
            return {disabled:true,msg:"you have to fill out both the title and content please",type:"error",time:2000};
        }else{
            return {disabled:true,msg:null,type:"error",time:0};
        }
    };


    uploadFreeNone(item:{
        injector:HTMLElement,
        popup:HTMLElement,
        mainPostCont:HTMLElement,
        post:postType,
        user:userType,
        css_col:string,
        css_row:string,
        pathname:string|null

    }){
        const {injector,popup,post,user,css_col,css_row,pathname,mainPostCont}=item;
        this.post=post;
        const less900= window.innerWidth < 900;
        const less400= window.innerWidth < 400;
        const btnContainer=document.createElement("div");
        btnContainer.id="uploadFreeNone-btn";
        btnContainer.style.cssText=css_row;
        btnContainer.style.paddingInline=less900 ? (less400 ? "1rem":"2rem") :"3rem";
        const {button:uploadBtn}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:this.btnColor,color:"white",text:"upload",time:400});
        const {button:freePicBtn}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:this.btnColor,color:"white",text:"free-pics",time:400});
        const {button:noPic}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:this.btnColor,color:"white",text:"no pic",time:400});
        const {button:addSendReqKey}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:this.btnColor,color:"white",text:"add answer image",time:400});
        addSendReqKey.id="addSendReqKey";
        popup.appendChild(btnContainer);
        uploadBtn.onclick=(e:MouseEvent)=>{
            if(e){
                this.uploadPic({injector,popup,post,user,pathname,mainPostCont});
                uploadBtn.disabled=true;
                popup.removeChild(btnContainer);
                popup.style.zIndex="1";
            }
        };
        freePicBtn.onclick=(e:MouseEvent)=>{
            if(e){
                //import  class for image selection
                this.freePic({injector,popup,post,user,pathname});
                uploadBtn.disabled=true;
                popup.removeChild(btnContainer);
                popup.style.zIndex="1";
            }
        };
        addSendReqKey.onclick=(e:MouseEvent)=>{
            if(e){
                this.uploadSendMsgPic({editPopup:popup,post,user,css_col,});
                btnContainer.removeChild(addSendReqKey);
                
            }
        };
        noPic.onclick=async(e:MouseEvent)=>{
            if(e){
                //import different logo on post /images/posts.png
                uploadBtn.disabled=true;
                const post_:postType={...post,userId:user.id,imageKey:undefined,image:undefined};
               await this._service.saveUpdatepost({post:post_}).then(async(res)=>{
                    if(res){
                        this.posts=[...this._posts,res];

                       
                        if(mainPostCont){
                            //USED BY Profile: client account
                            // const getCont=getScrollCol1.querySelector("div#main-post-container") as HTMLElement;
                            await this.Posts({container:mainPostCont,posts:this.posts,user}).then(async(res_)=>{
                                if(res_.posts && res_.posts.length>0){
                                    this.posts=res_.posts.toSorted((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                    this.posts.map(async(post,index)=>{
                                        if(post){
                                            const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                            this.postCard({row:res_.row,post,user:this.user,userinfo,index,pathname});
                                        }
                                    });
                                    Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                                }
                            });
                            injector.style.height="auto";
                        }
                        Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                        setTimeout(()=>{
                            const labelDisplay2=injector.querySelector("div#labelDisplay2") as HTMLElement;
                            if(labelDisplay2){
                                labelDisplay2.hidden=true;
                            }
                            injector.removeChild(popup);
                        },390);
                    }
                });
            }
        };
    };



    freePic(item:{injector:HTMLElement,popup:HTMLElement,post:postType,user:userType,pathname:string|null}){
        const {injector,popup,post,user,pathname}=item;
        //get class
        injector.removeChild(popup);
        this.addImageClass.asyncPicImage({parent:injector}).then(async(res)=>{
            if(res){
                res.arr.map((btnUrl,index)=>{
                    if(btnUrl){
                        
                        btnUrl.btn.onclick=async(e:MouseEvent)=>{
                            if(e){
                                this.post=this.initPost;
                                const image=res.arr[index].imageUrl;
                                this.post={...post,userId:user.id,image:image};
                               
                                await this._service.saveUpdatepost({post:this.post}).then(async(post_)=>{
                                    if(post_){
                                        this.posts=[...this._posts,post_];
                                       
                                        const getScrollCol1=document.querySelector("div#scrollCol1") as HTMLElement;
                                        if(getScrollCol1){
                                            //USED BY Profile: client account
                                            const getCont=getScrollCol1.querySelector("div#main-post-container") as HTMLElement;
                                            await this.Posts({container:getCont,posts:this.posts,user}).then(async(res_)=>{
                                                if(res_.posts && res_.posts.length>0){
                                                    this.posts=res_.posts.toSorted((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                                    this.posts.map(async(post,index)=>{
                                                        if(post){
                                                            const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                                            this.postCard({row:res_.row,post,user:this.user,userinfo,index,pathname});
                                                        }
                                                    });
                                                    Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                                                }
                                            });
                                            res.reParent.style.height="auto";
                                        }else{
                                            const getCont=this.injector.querySelector("div#main-post-container") as HTMLElement;
                                            
                                            await this.Posts({container:getCont,posts:this.posts,user}).then(async(res_)=>{
                                                if(res_.posts && res_.posts.length>0){
                                                    this.posts=res_.posts.toSorted((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                                    this.posts.map(async(post,index)=>{
                                                        if(post){
                                                            const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                                            this.postCard({row:res_.row,post,user:this.user,userinfo,index,pathname});
                                                        }
                                                    });
                                                    Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                                                }
                                            });
                                        }
                                        Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                                        Misc.growOut({anchor:res.popup,scale:0,opacity:0,time:400});
                                        setTimeout(()=>{
                                            const labelDisplay2=res.reParent.querySelector("div#labelDisplay2") as HTMLElement;
                                            if(labelDisplay2){
                                                labelDisplay2.hidden=true;
                                            }
                                            res.reParent.removeChild(res.popup);
                                           
                                        },390);
                                    }
                                });

                            }
                        };
                    }
                });
            }
        });
    };



    uploadPic(item:{
        injector:HTMLElement,
        popup:HTMLElement,
        post:postType,
        user:userType,
        pathname:string|null,
        mainPostCont:HTMLElement,

    }){
        const {user,post,injector,popup,pathname,mainPostCont}=item;
        this.post={...post,userId:user.id};
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
        const form=document.createElement("form");
        form.style.cssText=css_col;
        const {input:file,label:lfile}=Nav.inputComponent(form);
        file.id="file";
        file.type="file";
        file.name="file";
        file.placeholder="";
        lfile.textContent="Upload a Pic";
        lfile.setAttribute("for",file.id);
        const {button:submitBtn}=Misc.simpleButton({anchor:form,type:"submit",text:"submit",bg:this.btnColor,color:"white",time:400});
        submitBtn.disabled=true;
        file.onchange=(e:Event)=>{
            if(e){
                submitBtn.disabled=false;
            }
        };
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File | null;
                if(file ){
                    submitBtn.disabled=true;
                    
                    this._service.generatePostImgKey(formdata,post) as {Key:string};
                   await this._service.simpleImgUpload(injector,formdata).then(async(res)=>{
                        if(res){
                            this.post={...post,imageKey:res.Key};
                           await this._service.saveUpdatepost({post:this.post}).then(async(post_)=>{
                                if(post_){
                                    this.posts=[...this._posts,post_];
                                 
                                    if(mainPostCont){
                                        //USED BY Profile: client account
                                        // const getCont=scrollCol1.querySelector("div#main-post-container") as HTMLElement;
                                        await this.Posts({container:mainPostCont,posts:this.posts,user}).then(async(res_)=>{
                                            if(res_.posts && res_.posts.length>0){
                                                this.posts=res_.posts.toSorted((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                                this.posts.toSorted((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(async(post,index)=>{
                                                    if(post){
                                                        const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                                        this.postCard({row:res_.row,post,user:this.user,userinfo,index,pathname});
                                                    }
                                                });
                                                Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                                            }
                                        });
                                        injector.style.height="auto";
                                    }
                                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                                    Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                                    setTimeout(()=>{
                                        const labelDisplay2=injector.querySelector("div#labelDisplay2") as HTMLElement;
                                        if(labelDisplay2){
                                            labelDisplay2.hidden=true;
                                        }
                                        injector.removeChild(popup);
                                    },390);
                                }
                            });
                        }
                    });

                };
            }
        };
        popup.appendChild(form);
        injector.appendChild(popup)
    };



    uploadSendMsgPic(item:{editPopup:HTMLElement,post:postType,user:userType,css_col:string}){
        const {editPopup,post,css_col}=item;
        this.post=post;
        editPopup.style.zIndex="1";
        const popup=document.createElement('div');
        popup.id="post-uploadSendMsgPic-popup";
        popup.style.cssText=css_col + "position:absolute;inset:20% 0% 40% 0%;z-index:2;background-color:white;border-radius:12px;box-shadow:1px 1px 12px 1px black;width:300px;height:300px;justify-content:center;text-wrap:wrap;";
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        editPopup.appendChild(popup);
        const form=document.createElement('form');
        form.id="popup-form-sendReqKey";
        form.style.cssText=css_col;
        popup.appendChild(form);
        const {input:inFile,label:lFile,formGrp:grpFile}=Nav.inputComponent(form);
        grpFile.id="form-group-title";
        grpFile.style.cssText="margin-inline:auto;";
        grpFile.className="text-light text-center";
        inFile.id="editPost-post-file";
        inFile.name="file";
        inFile.type="file";
        inFile.onchange=(e:Event)=>{
            if(e){
                const value=e.currentTarget as HTMLInputElement;
                if(value){
                    const getBtn=form.querySelector("button#btn-submit") as HTMLButtonElement;
                    getBtn.disabled=false;
                }
            }
        };
        lFile.textContent="upload an img or pdf for automatic request to answer your post";
        lFile.className="text-dark lean font-bold";
        lFile.setAttribute("for",inFile.id);
        const {button:submit}=Misc.simpleButton({anchor:form,type:"submit",text:"submit img",bg:this.btnColor,color:"white",time:400});
        submit.id="btn-submit";
        submit.disabled=true;
        submit.style.marginBlock="1.5rem";
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData( e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File;
                if(file){
                    submit.disabled=true;
                  const {Key}=this._service.generatePostSendReqKey({formdata,post}) as {Key:string};
                    this.post={...post,sendReqKey:Key};
                  this._service.uploadfreeimage({formdata}).then(async(res)=>{
                    if(res){
                        const img=document.createElement("img");
                        img.id="form-img-show";
                        img.src=res.img;
                        img.alt=res.Key;
                        img.style.cssText="width:120px;aspect-ratio: 1 / 1;border-radius:50%;";
                        form.appendChild(img);
                        await this._service.saveUpdatepost({post:this.post}).then(async(res)=>{
                            if(res){
                                 this.post=res;
                                 
                                 setTimeout(()=>{
                                     Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                                     editPopup.removeChild(popup);
                                 },5000);
                             }
                         });
                    }
                  });
                }
            }
        };

    };


    async postCard(item:{row:HTMLElement,post:postType,user:userType|null,userinfo:userType |undefined,index:number,pathname:string|null}){
        const {row,post,user,userinfo,index,pathname}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        Header.cleanUpByID(row,`posts-postcard-col-${index}`);
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;color:inherit;border-radius:inherit;width:100%;overflow-x:hidden;";
        const shapoutside="text-wrap:wrap;color:black;font-family:'Poppins-Regular';font-weight:bold;font-size:120%;line-height:2.05rem;color:inherit;border-radius:12px;box-shadow:1px 1px 12px white;"
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.27rem;color:inherit;border-radius:inherit;";
        const col=document.createElement("div");
        col.id=`posts-postcard-col-${index}`;
        col.className=less900 ? "col-md-12" : "col-md-6";
        //background-color:#098ca091
        col.style.cssText="margin-inline:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:0.75rem;border-radius:12px;box-shadow:1px 1px 6px 1px #9de8eb;background-color:#ffffffb3;";
        col.style.width=less900 ? "100%":"auto";
        col.style.flex=less900 ? "1 0 100%":"1 0 47%";
        col.style.paddingInline=less900 ? (less400 ? "0rem":"0.5rem"):"1rem";
        const card=document.createElement("div");
        card.id=`posts-postcard-card-${index}`;
        card.style.cssText=css_col;
        const title=document.createElement("p");
        title.id=`posts-card-title-${index}`;
        title.className="post-title";
        
        title.textContent=post.title;
        card.appendChild(title);
        const shapeOutside=document.createElement("p");
        shapeOutside.id=`posts-shapeOutside-${index}`;
        shapeOutside.style.cssText=less400 ? shapoutside + css_col :shapoutside;
        shapeOutside.style.padding=less400 ? "0.75rem" :"1rem";
        const img=document.createElement("img");
        img.id=`posts-shapeOutside-img-${index}`;
        img.style.cssText="border-radius:50%;shape-outside:circle(50%);float:left;margin-right:1.25rem;margin-bottom:2rem;aspect-ratio:1/1;filter:drop-shadow(0 0 0.75rem white);border:none;";
        img.style.filter="drop-shadow(0 0 0.75rem white) !important";
        img.style.width=less900 ? (less400 ? "320px" : "280px") :"255px";
        const widthConv=parseInt(img.style.width.split("px")[0]) as number;
        if(post.image){
            img.src=imageLoader({src:post.image,width:widthConv,quality:75});
            img.alt="www.ablogroom.com";
            shapeOutside.appendChild(img);
            Misc.blurIn({anchor:img,blur:"20px",time:700});
            shapeOutside.innerHTML+=post.content ? `${post.content.slice(0,250)}...see detail` : "";
        }else if(post.imageKey){
            await this._service.getSimpleImg(post.imageKey).then(async(res)=>{
                if(res){
                    img.src=res.img;
                    img.alt=res.Key;
                    shapeOutside.appendChild(img);
                    Misc.blurIn({anchor:img,blur:"20px",time:700});
                    const postMod=Post.brInserter({targetStr:post.content})
                    shapeOutside.innerHTML+=postMod ? `${postMod.slice(0,250)}...see detail`  : "";
                }
            });
        }else{
            img.src=imageLoader({src:this.postLogo,width:widthConv,quality:75});
             img.alt="www.ablogroom.com";
            shapeOutside.appendChild(img);
            Misc.blurIn({anchor:img,blur:"20px",time:1800});
            
            shapeOutside.innerHTML+=post.content ? `${post.content.slice(0,250)}...see detail`  : "";
        }
        Misc.matchMedia({parent:img,maxWidth:400,cssStyle:{maxWidth:"300px",shapeOutside:""}});
        card.appendChild(shapeOutside);
        Misc.matchMedia({parent:shapeOutside,maxWidth:400,cssStyle:{display:"flex",flexDirection:"column",alignItems:"center"}});
        Misc.matchMedia({parent:img,maxWidth:400,cssStyle:{shapeOutside:"none"}});
        const cardBody=document.createElement("div");
        cardBody.id=`cardBody-${index}`;
        cardBody.style.cssText=css_col +"gap:2rem;padding:1rem;" ;
        const datePosterCont=document.createElement("div");
        datePosterCont.id=`datePosterCont-${index}`;
        datePosterCont.style.cssText=css_row + "position:relative;";
        datePosterCont.style.gap=less900 ?(less400 ? "1rem":"1.25rem"):"1.5rem";
        const date=document.createElement("small");
        date.className="text-primary";
        date.id=`date-${index}`;
        const poster=document.createElement("small");
        poster.className="text-primary";
        poster.id=`userinfo-poster-name-${index}`;
        poster.textContent=(userinfo?.name) ||"blogger";
        date.textContent= post.date ? Misc.tolocalstring(post.date):"no date";
        datePosterCont.appendChild(date);
        datePosterCont.appendChild(poster);
        this.likepost({parent:datePosterCont,post});
        cardBody.appendChild(datePosterCont);
        if(post.link){
            const anchor=document.createElement("a");
            anchor.style.cssText="align-self:center;justify-self:center;font-weight:800;margin-inline:auto;color:white;"
            anchor.id=`posts-post-anchor-${index}`;
            anchor.href=post.link;
            anchor.textContent=post.link;
            cardBody.appendChild(anchor);
        }
        this.removePost({parent:row,target:col,post,user,pathname});
        const btnContainer=document.createElement("div");
        btnContainer.id="card-btnContainer";
        btnContainer.style.cssText=css_row + "gap:2rem;margin-block:1rem;";
        if(post.userId===user?.id){
            const {button:edit}=Misc.simpleButton({anchor:btnContainer,bg:this.btnUpdate,color:"white",type:"button",time:400,text:"update"});
            edit.disabled=false;
            edit.onclick=(e:MouseEvent)=>{
                if(e){
                    this.editPost({parent:row,col,post,user,index,pathname});
                    edit.disabled=true;
                }
            };
        }
        const {button:detail}=Misc.simpleButton({anchor:btnContainer,bg:this.btnDetail,color:"white",type:"button",time:400,text:"quick detail"});
        detail.classList.add("btnBoxShadow");
        detail.onclick=(e:MouseEvent)=>{
            if(e){
                detail.disabled=true;
                const _userinfo:userType|null=userinfo || null;
                const postMod={...post,content:Post.brInserter({targetStr:post.content})}
                this.postDetail.main({injector:col,post:postMod,count:0,poster:_userinfo,isPage:false,isUser:false,user,pathname});
            }
        };
        const {button:pageDetail}=Misc.simpleButton({anchor:btnContainer,bg:this.btnColor,color:"white",type:"button",time:400,text:"page detail"});
        pageDetail.onclick=(e:MouseEvent)=>{
            if(e){
                detail.disabled=true;
                const url=new URL(window.location.href);
                const newUrl=new URL(`/post/${post.id}`,url.origin)
                window.location.href=newUrl.href;
            }
        };
        card.appendChild(cardBody);
        card.appendChild(btnContainer);
        col.appendChild(card);
        row.appendChild(col);
        Misc.growIn({anchor:card,scale:1,opacity:0,time:500});
        const getShapeOutside=card.querySelector(`div#posts-shapeOutside-${index}`) as HTMLElement;
        if(!getShapeOutside) return;
        const getImg=getShapeOutside.querySelector(`img#posts-shapeOutside-img-${index}`) as HTMLElement;
        if(!getImg) return;
        Misc.matchMedia({parent:getShapeOutside,maxWidth:400,cssStyle:{display:"flex",flexDirection:"column",alignItems:"center"}});
        Misc.matchMedia({parent:getImg,maxWidth:400,cssStyle:{shapeOutside:"none"}});
       
    };


    likepost(item:{parent:HTMLElement,post:postType}){
        const {parent,post}=item;
        const less400=window.innerWidth <400 ;
        const less900=window.innerWidth <900 ;
        parent.style.position="relative";
        parent.style.zIndex="0";
        const popup=document.createElement("div");
        popup.style.cssText="position:absolute;width:auto;height:auto;border-radius:50%;top:0%;right:0%;z-index:1;aspect-ratio:1 / 1;padding:0px;";
        popup.style.top=less900 ? (less400 ? "45%":"50%"):"15%";
        popup.style.transform=less400 ? "translate(5px,-27px)" :"translate(20px,-20px)";
        popup.id=`popup-likepost-${post.id}`;
        popup.className="popup";
        const xDiv=document.createElement("div");
        xDiv.id="thumb";
        xDiv.style.cssText="padding:2px;border-radius:50%;background-color:black;color:white;position:relative;display:flex;justify-content:center;align-items:center;aspect-ratio:inherit;";
        popup.appendChild(xDiv);
        const root=FaCreate({parent:xDiv,name:FaHandBackFist,cssStyle:{fontSize:"20px",borderRadius:"50%",color:"white",margin:"auto",zIndex:"1"}});
        parent.appendChild(popup);
        xDiv.onclick=async(e:MouseEvent)=>{
            if(e){

                root?.unmount();
                Header.cleanUp(xDiv);
                FaCreate({parent:xDiv,name:FaThumbsUp,cssStyle:{fontSize:"20px",borderRadius:"50%",color:"white",margin:"auto",zIndex:"1"}});
                xDiv.style.backgroundColor="blue";
                xDiv.style.color="green";
                xDiv.animate([
                    {transform:"scale(1)",backgroundColor:"black",color:"white"},
                    {transform:"scale(1.1)",backgroundColor:"red",color:"blue"},
                    {transform:"scale(1)",backgroundColor:"blue",color:"green"},
                ],{duration:1000,iterations:1});
                const addLikePost={...post,likes:post.likes +1};
                const isPost= await this._service.checkPostlike({post:addLikePost});
                if(isPost !==false){
                    this.post=isPost as postType;
                    //-----------------------show likes-----------------//
                    this.showLikes({parent,post:this.post});
                    //-----------------------show likes-----------------//
                }
                setTimeout(()=>{
                   parent.removeChild(popup)
                },1600);
            }
        }
        //-----------------------show likes-----------------//
        this.showLikes({parent,post});
        //-----------------------show likes-----------------//

    };


    showLikes(item:{parent:HTMLElement,post:postType}){
        const {parent,post}=item;
        if(post.likes && post.likes>0){
            Header.cleanUpByID(parent,`likes-${post.id}`)
            const likes=document.createElement("div");
            likes.id=`likes-${post.id}`;
            likes.style.cssText="background-color:#0999b0;font-size:20px;display:flex;justify-content:center;align-items:center:gap:0.5rem;padding-block:2px;border-radius:50%;color:white;padding-inline:12px;filter:drop-shadow(0 0 0.5rem white);";
            const xDiv=document.createElement("div");
            xDiv.id=`posts-xDiv-thumbs-up-${post.id}`;
            xDiv.style.margin="auto";
            FaCreate({parent:xDiv,name:FaThumbsUp,cssStyle:{fontSize:"25px",padding:"5px",borderRadius:"50%",color:"white",margin:"auto",zIndex:"1"}});
            const subLike=document.createElement("small");
            subLike.id=`posts-likes-subLike-${post.id}`;
            subLike.style.color="#23f803";
            subLike.textContent=`: ${ post?.likes ||0}`;
            likes.appendChild(xDiv);
            likes.appendChild(subLike);
            parent.appendChild(likes);
        }
    };



    noPosts(item:{parent:HTMLElement,posts:postType[]}){
        const {parent,posts}=item;
        if(posts && posts.length===0){

            parent.style.position="relative";
            const css="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
            const container=document.createElement("div");
            container.id="noposts";
            container.style.cssText=css + " border-radius:12px;box-shadow:1px 1px 12px 1px #0a2351;background-color:white;color:black;padding:1rem;min-height:20vh;width:100%;";
            const para=document.createElement("p");
            para.textContent=this.no_posts;
            para.style.cssText="margin-inline:auto;padding-inline:1rem;font-family:'Poppins-Regular';padding-block:2rem;text-wrap:pretty;font-size:160%;font-weight:700;";
            container.appendChild(para);
            parent.appendChild(container);
        }else{
            Header.cleanUpByID(parent,"noposts");
        }

    };



    editPost(item:{parent:HTMLElement,col:HTMLElement,post:postType,user:userType,index:number,pathname:string|null}){
        const {parent,col,post,user,index,pathname}=item;
        this.post=post;
        Header.cleanUpByID(col,`editPost-popup-${post.id}`);
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.7rem;";
        col.style.position="relative";
        const popup=document.createElement('div');
        popup.id=`editPost-popup-${post.id}`;
        popup.style.cssText="position:absolute;inset:0%;backdrop-filter:blur(20px);border-radius:12px;box-shadow:1px 1px 12px 1px #0CAFFF;padding:7px;z-index:1000;border:none;";
        col.appendChild(popup);
        //-------DELETE----------//
        const xDiv=document.createElement("div");
        xDiv.style.cssText=css_row + "position:absolute;padding:0.37rem;background:black;color:white;top:0%;right:0%;transform:translate(-12px,12px);z-index:200;border-radius:50%;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"22px"}});
        popup.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent) =>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    col.removeChild(popup);
                },390);
            }
        };
        //-------DELETE----------//
        const form=document.createElement('form');
        form.id=`post-form-${post.id}`;
        form.style.cssText=css_col +"color:white;";
        popup.appendChild(form);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        const {input:intitle,label:ltitle,formGrp:grptitle}=Nav.inputComponent(form);
        grptitle.style.cssText="margin-inline:auto;";
        grptitle.className="text-light text-center";
        intitle.id="post-title";
        intitle.name="title";
        intitle.value=post.title ? post.title : "";
        ltitle.textContent="Your Title";
        ltitle.className="text-light display-6";
        ltitle.setAttribute("for",intitle.id);
        const {textarea:inContent,label:lContent,formGrp:grpTextarea}=Nav.textareaComponent(form);
        grpTextarea.style.cssText="width:100% !important;margin-inline:auto;";
        grpTextarea.className="text-center";
        inContent.id="post-content";
        inContent.name="content";
        inContent.rows=4;
        inContent.value=post.content ? post.content : "";
        lContent.className="text-light text-center display-6";
        lContent.textContent="edit your thoughts";
        lContent.setAttribute("for",inContent.id);
        const {input:pub,label:lpub,formGrp:grpPub}=Nav.inputComponent(form);
        grpPub.className="text-light";
        grpPub.style.cssText="margin-inline:auto;";
        pub.className="";
        pub.id="pub";
        pub.name="pub";
        pub.type="checkbox";
        pub.checked=post.published;
        lpub.textContent="publish";
        lpub.style.cssText="font-size:140%;text-decoration:underline;text-underline-offset:0.5rem;margin-bottom:1rem;";
        lpub.setAttribute("for",pub.id);
        const {input:link,label:lLink}=Nav.inputComponent(form);
        link.id="link";
        link.name="link";
        link.value=post.link ? post.link : "";
        link.placeholder="https://example.com";
        link.type="url";
        lLink.textContent="add a link ";
        lLink.style.cssText="font-size:140%;text-decoration:underline;text-underline-offset:0.5rem;margin-bottom:1rem;";
        lLink.setAttribute("for",link.id);
        const {button:submit}=Misc.simpleButton({anchor:form,bg:this.btnColor,color:"white",text:"submit",time:400,type:"submit"});
        submit.disabled=false;
        form.onsubmit=async(e:SubmitEvent) =>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const title=formdata.get("title") as string;
                const content=formdata.get("content") as string;
                const pub=formdata.get("pub") as string;
                const link=formdata.get("link") as string;
                if(title && content){
                    this.post={...post,title:title as string,content:content as string,published:Boolean(pub),link:link};
                   await this._service.saveUpdatepost({post:this.post}).then(async(res)=>{
                        if(res){

                            const getPopup=col.querySelector(`div#editPost-popup-${post.id}`) as HTMLElement;
                            if(getPopup){
                                Misc.growOut({anchor:getPopup,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    col.removeChild(getPopup);
                                },390);
    
                            }
                            const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                            this.postCard({row:parent,post:this.post,user,userinfo,index:index,pathname});
                        }
                            
                        
                    });

                }
            }
        };
    };


    removePost(item:{parent:HTMLElement,target:HTMLElement,post:postType,user:userType|null,pathname:string|null}){
        const {parent,target,post,user,pathname}=item;
        Header.cleanUpByID(target,`delete-${post.id}`);
        target.style.position="relative";
       
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.7rem;";
        if(post.userId===user?.id){
            const xDiv=document.createElement("div");
            xDiv.id=`delete-${post.id}`;
            xDiv.style.cssText=css_row + "position:absolute;padding:0.37rem;background:black;color:white;top:0%;right:0%;transform:translate(-18px,32px);z-index:1;border-radius:50%;";
            FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"22px"}});
            target.appendChild(xDiv);
            xDiv.onclick=(e:MouseEvent) =>{
                if(e){
                    this.askToDelete({parent,target,post,user,pathname});
                }
            };

        }
    };


    askToDelete(item:{parent:HTMLElement,target:HTMLElement,post:postType,user:userType,pathname:string|null}){
        const {parent,target,post,user,pathname}=item;
        target.style.position="relative";
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.7rem;";
        const container=document.createElement("div");
        container.id="askToDelete-popup";
        container.style.cssText=css_row + "position:absolute;inset:0%;backdrop-filter:blur(12px);border-radius:12px;justify-content:center;gap:1.5rem;border:none;";
        const {button:cancel}=Misc.simpleButton({anchor:container,bg:this.btnColor,color:"white",type:"button",time:40,text:"cancel"});
        const {button:del}=Misc.simpleButton({anchor:container,bg:"#007FFF",color:"red",type:"button",time:40,text:"delete"});
        target.appendChild(container);
        Misc.growIn({anchor:container,scale:0,opacity:0,time:400});
        cancel.onclick=(e:MouseEvent) => {
            if(e){
                Misc.growOut({anchor:container,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    target.removeChild(container);
                },390);
            }
        };
        del.onclick=(e:MouseEvent) => {
            if(e){
                this._service.delpost({id:post.id}).then(async(res)=>{
                    if(res){
                      await  Promise.all(this.posts.map(async(_post,ind)=>{
                            if(_post && _post.id===post.id){
                                this._posts.splice(ind,1);
                                const getCont=this.injector.querySelector("div#main-post-container") as HTMLElement;
                                if(!getCont) return;
                                await this.Posts({container:getCont,posts:this.posts,user}).then(async(res_)=>{
                                    if(res_.posts && res_.posts.length>0){
                                        this.posts=res_.posts.toSorted((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                        this.posts.map(async(post,index)=>{
                                            if(post){
                                                const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                                this.postCard({row:res_.row,post,user:this.user,userinfo,index,pathname});
                                            }
                                        });
                                        Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                                    }
                                });
                                Misc.growOut({anchor:target,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    parent.removeChild(target);
                                },390);
                            }
                        }));
                    }
                });

            }
        };


    };


    static brInserter(item:{targetStr:string|undefined}):string{
        const {targetStr}=item;
        const text=targetStr;
        let text2=text as string;
        const reg1:RegExp=/(1)\./g;
        const reg2:RegExp=/(2)\./g;
        const reg3:RegExp=/(3)\./g;
        const reg4:RegExp=/(4)\./g;
        const reg5:RegExp=/(5)\./g;
        const reg6:RegExp=/(6)\./g;
        const reg7:RegExp=/(7)\./g;
        const reg8:RegExp=/(8)\./g;
        const reg9:RegExp=/(9)\./g;
        const reg10:RegExp=/(10)\.|(10)\.\)/g;
        const reg11:RegExp=/(NOTE):/g;
        const arrReg:{id:number,reg:RegExp}[]=[
            {id:0,reg:reg1},
            {id:1,reg:reg2},
            {id:2,reg:reg3},
            {id:3,reg:reg4},
            {id:4,reg:reg5},
            {id:5,reg:reg6},
            {id:6,reg:reg7},
            {id:7,reg:reg8},
            {id:8,reg:reg9},
            {id:9,reg:reg10},
            {id:10,reg:reg11},
            // {id:11,reg:reg12},
        ];
        if(text2 && text){
            arrReg.map((regItem,index)=>{
                const {reg}=regItem;
                const matches=text.matchAll(reg) as any;
                // let index=0
                for(const match of matches){
                    if(index !==11){
                        text2=text2.replace(regItem.reg,`<br/> ${match[0]}`);
                    }else if(index===11){
                        text2=text2.replace(regItem.reg,`<span style="color:lightblue"> ${match[0]} </span>`);
                    }
                    
                }
            });
        }
        return text2;

    };


   
    
};
export default Post;
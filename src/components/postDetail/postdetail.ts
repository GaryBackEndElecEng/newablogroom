import { FaCrosshairs, FaThumbsUp } from "react-icons/fa";
import Blogs from "../blogs/blogsInjection";
import Misc from "../common/misc";
import { FaCreate } from "../common/ReactIcons";
import Service from "../common/services";
import { imageLoader } from "../common/tsFunctions";
import Header from "../editor/header";
import ModSelector from "../editor/modSelector";
import { pageCountType, postType, userType } from "../editor/Types";
import Nav from "../nav/headerNav";
import AddImageUrl from "../common/addImageUrl";
import User from "../user/userMain";
import Post from "../posts/post";



class PostDetail{
    addImageClass:AddImageUrl;
    _poster:userType;
    _post:postType;
    initPost:postType;
    userPic:string;
    postLogo:string;
    logo:string;
    injector:HTMLElement|null;
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,user:userType|null){
        this.injector=document.querySelector("section#postdetail") as HTMLElement;
        this.postLogo="/images/posts.png";
        this.logo="/images/gb_logo.png";
        this.userPic="/images/userpic.png";
        if(user){
            this.user=user;
        }
        this.initPost={
            id:0,
            title:"",
            content:undefined,
            link:undefined,
            image:undefined,
            imageKey:undefined,
            published:false,
            date:new Date(),
            userId:"",
            likes:0,
            pageCounts:[] as pageCountType[]
        };
        this._post=this.initPost;
        this.addImageClass=new AddImageUrl(this._modSelector,this._service);
    }
    /////--------GETTERS/SETTERS---------////
    get post(){
        return this._post;
    }
    set post(post:postType){
        this._post=post;
    }
    get poster(){
        return this._poster;
    }
    set poster(poster:userType){
        this._poster=poster;
    }
    get user(){
        return this._user.user
    }
    set user(user:userType){
        this._user.user=user
    }
    

   async main(item:{injector:HTMLElement,post:postType,count:number,poster:userType |null,isPage:boolean,isUser:boolean,user:userType|null}):Promise<number>{
        const {injector,post,poster,count,isPage,isUser,user}=item;
        const less1550=window.innerWidth < 1550;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        if(poster){
            this.poster=poster;
        }
        if(user){
            this.user=user;
        }
        this.injector=injector as HTMLElement;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;color:inherit;border-radius:inherit;";
        const shapoutside="padding:1rem;text-wrap:wrap;font-family:'Poppins-Thin';font-weight:bold;inherit;border-radius:12px;box-shadow:1px 1px 12px white;width:100%;"
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.27rem;color:inherit;border-radius:inherit;";
        const container=document.createElement("div");
        container.className="postdetail-main-container";
        container.id="postdetail-main-container";
        container.style.cssText=css_col + "background-color:black;color:white;font-family:'Poppins-Regular';position:relative;";
        // container.style.width=less400 ? "100%":"auto";
        container.style.width="100%";
        if(!isPage){
            injector.style.position="relative;";
            const parent=injector.parentElement;
            container.style.position="absolute";
            container.style.zIndex="200";
            container.style.top="0%";
            container.style.left=less1550 ? (less900 ? (less400 ? "0%" :"-2.5%"): "-30%"):"-50%";
            container.style.right=less1550 ? (less900 ? (less400 ? "0%" :"-2.5%"): "-30%"):"-50%";
            container.style.overflowY="scroll";
            container.style.height=less900 ? (less400 ? "120vh":"65vh"):"70vh";
            container.style.justifyContent="flex-start";
        }else{
            this.injector=injector as HTMLElement;
            this.injector.style.width=less1550 ? (less900 ? (less400 ? "100%" :"100%"): "65%"):"50%";
            this.injector.style.paddingInline=less400 ? "0rem":"1rem";
            this.injector.style.paddingTop=less400 ? "0.25rem":"1rem";
            this.injector.style.marginTop=less400 ? "0rem":"1rem";
        }
        const card=document.createElement("div");
        card.id=`posts-postcard-card-${post.id}`;
        card.style.cssText=css_col + "border-radius:12px;box-shadow:1px 1px 5px 1px white;gap:1rem";
        card.style.width="100%";
        const title=document.createElement("p");
        title.id=`posts-card-title-${post.id}`;
        title.className="post-title";
        
        title.textContent=post.title;
        card.appendChild(title);
        const shapeOutside=document.createElement("p");
        shapeOutside.id=`posts-shapeOutside-${post.id}`;
        shapeOutside.style.cssText=less400 ? shapoutside + css_col :shapoutside;
        shapeOutside.style.lineHeight=less900 ? (less400 ? "2.05rem":"2.25rem") :"2.85rem";
        shapeOutside.style.fontSize=less900 ? (less400 ? "120%":"126%") :"150%";
        const img=document.createElement("img");
        img.id=`posts-shapeOutside-img-${post.id}`;
        img.style.cssText="border-radius:50%;shape-outside:circle(50%);float:left;margin-bottom:2rem;aspect-ratio:1/1;filter:drop-shadow(0 0 0.75rem white);border:none;";
        img.style.filter="drop-shadow(0 0 0.75rem white) !important";
        img.style.width=less900 ? (less400 ? "300px" : "330px") :"395px";
        img.style.marginRight=less900 ? (less400 ? "0.85rem" : "0.85rem") :"1rem";
        const widthConv=parseInt(img.style.width.split("px")[0]) as number;
        if(post.image){
            img.src=imageLoader({src:post.image,width:widthConv,quality:75});
            img.alt="www.ablogroom.com";
            shapeOutside.appendChild(img);
            Misc.blurIn({anchor:img,blur:"20px",time:700});
            const postMod=Post.brInserter({targetStr:post.content});
            shapeOutside.innerHTML+=postMod ? postMod : "";
        }else if(post.imageKey){
            await this._service.getSimpleImg(post.imageKey).then(async(res)=>{
                if(res){
                    img.src=res.img;
                    img.alt=res.Key;
                    shapeOutside.appendChild(img);
                    Misc.blurIn({anchor:img,blur:"20px",time:700});
                    shapeOutside.innerHTML+=post.content ? post.content : "";
                }
            });
        }else{
            const url=new URL(window.location.href)
            const newUrl=new URL(this.postLogo,url.origin)
            img.src=imageLoader({src:"/images/posts.png",width:widthConv,quality:75});
             img.alt="www.ablogroom.com";
            shapeOutside.appendChild(img);
            Misc.blurIn({anchor:img,blur:"20px",time:700});
            const postMod=Post.brInserter({targetStr:post.content});
            shapeOutside.innerHTML+=postMod ? postMod : "";
        }
        card.appendChild(shapeOutside);
        const cardBody=document.createElement("div");
        cardBody.style.cssText=css_col + "gap:0rem;width:100%;box-shadow:1px 1px 3px 1px white;border-radius:inherit;";
        const link=document.createElement("a");
        link.id="card-link";
        link.style.cssText="margin-inline:auto;margin-block:1rem;"
        const date=document.createElement("small");
        date.style.cssText="padding-inline:1rem;margin-inline:auto;";
        date.textContent= post.date ? Blogs.tolocalstring(post.date):"no date";
        cardBody.appendChild(date);
        //btn Container///
        const btnContainer=document.createElement("div");
        btnContainer.id="card-btnContainer";
        btnContainer.style.cssText=css_row + "gap:1rem;";
        btnContainer.style.marginBlock=less900 ? (less400 ? "1.75rem":"1.5rem"):"1rem";
        if(poster){
        this.showPoster({parent:card,poster});
        this.showLikes({parent:card,post});
        }
        if(!isPage){
            const {button:btnClose}=Misc.simpleButton({anchor:btnContainer,text:"close",type:"button",bg:Nav.btnColor,color:"white",time:400});
            btnClose.onclick=(e:MouseEvent)=>{
                if(e){
                    Misc.fadeOut({anchor:container,xpos:30,ypos:100,time:400});
                    setTimeout(()=>{
                        injector.removeChild(container);
                    },390);
                }
            };
            
        }else{
            const {button:btnBack}=Misc.simpleButton({anchor:btnContainer,text:"back",type:"button",bg:Nav.btnColor,color:"white",time:400});
            btnBack.onclick=(e:MouseEvent)=>{
                if(e){
                    window.history.go(-1);
                }
            };
          
            if(isUser && user){

                const {button:btnEdit}=Misc.simpleButton({anchor:btnContainer,text:"edit",type:"button",bg:Nav.btnColor,color:"white",time:400});
                btnEdit.onclick=(e:MouseEvent)=>{
                    if(e){
                        this.editPost({card,targetImg:img,post,user:user,imgWidth:widthConv});
                    }
                };
                this.removePost({parent:injector,target:container,post,user:user})
            }
        }
        
        card.appendChild(cardBody);
        card.appendChild(btnContainer);
        container.appendChild(card);
        injector.appendChild(container);
        this.cleaupKeepOne({parent:injector,class_:"postdetail-main-container"});//keep 
        injector.animate([
            {opacity:"0"},
            {opacity:"1"}
        ],{duration:1000,iterations:1,"easing":"ease-in-out"});
        if(!isPage){
            Misc.growIn({anchor:container,scale:0,opacity:0,time:400});
        }
        return new Promise(resolver=>{
            resolver(count + 1)
        }) as Promise<number>;
    }
    showPoster(item:{parent:HTMLElement,poster:userType}){
        const {parent,poster}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        if(!(poster && poster.id)) return;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;color:inherit;border-radius:inherit;width:100%";
        const shapoutside="padding:1rem;text-wrap:wrap;color:black;font-family:'Poppins-Thin';font-weight:bold;font-size:120%;line-height:2.05rem;color:inherit;border-radius:12px;box-shadow:1px 1px 12px white;"
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.27rem;color:inherit;border-radius:inherit;";
       
        Header.cleanUpByID(parent,"showPoster-user-container");
        parent.style.position="relative";
        const container=document.createElement("div");
        container.id="showPoster-user-container";
        container.style.cssText="margin-inline:auto;margin-block:1.25rem;display:flex;align-items:center;justify-content:space-around;flex-warp:wrap;background-color:white;color:black;border-radius:11px;padding-block:1.5rem;padding-inline:1.25rem;box-shadow:1px 1px 12px 2px #10c7e9ab,-1px -1px 12px 1px #10c7e9ab;";
        container.style.width=less900 ? (less400 ? "100%" :"90%" ) : "80%";
        container.style.paddingInline=less900 ? (less400 ? "0.25rem" :"0.5rem" ) : "1rem";
        const img=document.createElement("img");
        const maximgwidth=120;
        img.style.cssText=`max-width:${maximgwidth}px;border-radius:50%;aspect-ratio: 1 / 1;box-shadow:1px 1px 10px 1px black;float:left; `;
        if(poster.imgKey){
            this._service.getSimpleImg(poster.imgKey).then(async(res_)=>{
                if(res_){
                 
                    img.src=res_.img;
                    img.alt=res_.Key;
                }
            });
        } else if(poster.image){
            img.src=poster.image ? poster.image: imageLoader({src:poster.image,quality:75,width:maximgwidth});
            img.alt=poster.name ? poster.name: "blogger";
        }else{
            img.src=imageLoader({src:this.userPic,quality:75,width:maximgwidth});
            img.alt="www.ablogroom.com";
        }
        Misc.blurIn({anchor:img,blur:"10px",time:600});
        container.appendChild(img);
        const innerContainer=document.createElement("div");
        innerContainer.style.cssText="display:flex;justify-content:center;flex-direction:center;align-items:center;gap:0.5rem;height:120px;overflow-y:scroll;"
        const ulCont=document.createElement("ul");
        ulCont.id="showinfo";
        ulCont.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:stretch;justify-content:center;";
        const text=document.createElement("h6");
        text.className="text-primary";
        text.innerHTML=poster.name ? `<span style="color:blue;text-decoration:underline;">name: </span><span>${poster.name}<span>`:"";
        text.style.textWrap="pretty";
        text.style.display=poster.name ? "block":"none";
        ulCont.appendChild(text);
        const li1=document.createElement("li");
        li1.innerHTML=poster.email ? `<span style="color:blue;text-decoration:underline;">email: </span><span>${poster.email}<span>`:"";
        li1.style.display=poster.email ? "block":"none";
        ulCont.appendChild(li1);
        const li2=document.createElement("li");
        li2.innerHTML=poster.bio ? `<span style="color:blue;text-decoration:underline;">bio: </span><span>${poster.bio}<span>`:"";
        li2.style.display=poster.bio ? "block":"none";
        li1.style.display="flex";
        li1.style.flexWrap="wrap";
        li2.style.display="flex";
        li2.style.flexWrap="wrap";
        ulCont.appendChild(li2);
        innerContainer.appendChild(ulCont)
        container.appendChild(innerContainer);
        
        parent.appendChild(container);
    }
  
    editPost(item:{card:HTMLElement,targetImg:HTMLImageElement,post:postType,user:userType,imgWidth:number}){
        const {card,targetImg,post,user,imgWidth}=item;
        this.post=post;
        const less900= window.innerWidth < 900 ? true:false;
        const less400= window.innerWidth < 400 ? true:false;
        Header.cleanUpByID(card,`postdetail-editPost-popup-${post.id}`);
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;";
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.7rem;";
        card.style.position="relative";
        const popup=document.createElement('div');
        popup.id=`postdetail-editPost-popup-${post.id}`;
        popup.style.cssText=css_col + "position:absolute;inset:0%;backdrop-filter:blur(20px);border-radius:12px;box-shadow:1px 1px 12px 1px #0CAFFF;padding:7px;z-index:10;border:none;";
        card.appendChild(popup);
        //-------DELETE----------//
        const xDiv=document.createElement("div");
        xDiv.style.cssText=css_row + "position:absolute;padding:0.37rem;background:black;color:white;top:0%;right:0%;transform:translate(-12px,12px);z-index:100;border-radius:50%;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"22px"}});
        popup.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent) =>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    card.removeChild(popup);
                },390);
            }
        };
        //-------DELETE----------//
        const form=document.createElement('form');
        form.id=`editPost-form-${post.id}`;
        form.style.cssText=css_col +"color:white;width:100%;";
        popup.appendChild(form);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        const {input:intitle,label:ltitle,formGrp:grptitle}=Nav.inputComponent(form);
        grptitle.id="form-group-title";
        grptitle.style.cssText="margin-inline:auto;";
        grptitle.className="text-light text-center";
        intitle.id="editPost-post-title";
        intitle.name="title";
        intitle.value=post.title ? post.title : "";
        ltitle.textContent="Your Title";
        ltitle.className="text-light display-6";
        ltitle.setAttribute("for",intitle.id);
        const {textarea:inContent,label:lContent,formGrp:grpTextarea}=Nav.textareaComponent(form);
        grpTextarea.id="form-grpTextarea";
        grpTextarea.style.cssText="width:100% !important;margin-inline:auto;";
        grpTextarea.className="text-center";
        inContent.id="editPost-content";
        inContent.name="content";
        inContent.rows=less900 ? (less400 ? 17 :15):13;
        inContent.value=post.content ? post.content : "";
        lContent.className="grpTextarea-label";
        lContent.className="text-light text-center display-6";
        lContent.textContent="edit your thoughts";
        lContent.setAttribute("for",inContent.id);
        const {input:pub,label:lpub,formGrp:grpPub}=Nav.inputComponent(form);
        grpPub.id="form-grpPub";
        grpPub.className="text-light";
        grpPub.style.cssText="margin-inline:auto;";
        pub.className="";
        pub.id="pub";
        pub.name="pub";
        pub.type="checkbox";
        pub.checked=post.published;
        lpub.id="grpPub-label";
        lpub.textContent="publish";
        lpub.style.cssText="font-size:140%;text-decoration:underline;text-underline-offset:0.5rem;margin-bottom:1rem;";
        lpub.setAttribute("for",pub.id);
        const {input:link,label:lLink,formGrp:grplink}=Nav.inputComponent(form);
        grplink.id="form-grplink";
        link.id="link";
        link.name="link";
        link.value=post.link ? post.link : "";
        link.placeholder="https://example.com";
        link.type="url";
        lLink.id="grplink-label";
        lLink.textContent="add a link ";
        lLink.style.cssText="font-size:140%;text-decoration:underline;text-underline-offset:0.5rem;margin-bottom:1rem;";
        lLink.setAttribute("for",link.id);
        const {button:submit}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"white",text:"submit",time:400,type:"submit"});
        submit.disabled=false;
        this.edituploadFreeNone({card,editPopup:popup,targetImg,post,user,imgWidth});
        form.onsubmit=async(e:SubmitEvent) =>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const title=formdata.get("title") as string;
                const content=formdata.get("content") as string;
                const pub=formdata.get("pub") as string;
                const link=formdata.get("link") as string;
                if(title && content){
                    this.post={...this.post,title:title as string,content:content as string,published:Boolean(pub),link:link};
                   await this._service.saveUpdatepost({post:this.post}).then(async(res)=>{
                       if(res){
                            this.post=res;
                            const getPopup=card.querySelector(`div#${popup.id}`) as HTMLElement;
                            if(getPopup){
                                Misc.growOut({anchor:getPopup,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    card.removeChild(getPopup);
                                },390);

                            }
                            this.injector=document.querySelector("section#postdetail") as HTMLElement;
                            if(!this.injector) return;
                            Header.cleanUpByID(this.injector,`postdetail-main-container`);
                            this.main({injector:this.injector,post:this.post,count:0,poster:this.poster,isPage:true,isUser:true,user});
                        }
                    });

                }
            }
        };
    }
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
            subLike.textContent=`: ${post && post.likes ? post.likes :0}`;
            likes.appendChild(xDiv);
            likes.appendChild(subLike);
            parent.appendChild(likes);
        }
    }
    
    removePost(item:{parent:HTMLElement,target:HTMLElement,post:postType,user:userType}){
        const {parent,target,post,user}=item;
        Header.cleanUpByID(target,`delete-${post.id}`);
        target.style.position="relative";
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.7rem;";
        if(post.userId===user.id){
            const xDiv=document.createElement("div");
            xDiv.id=`delete-${post.id}`;
            xDiv.style.cssText=css_row + "position:absolute;padding:0.37rem;background:black;color:white;top:0%;right:0%;transform:translate(-18px,32px);z-index:1;border-radius:50%;";
            FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"22px"}});
            target.appendChild(xDiv);
            xDiv.onclick=(e:MouseEvent) =>{
                if(e){
                    this.askToDelete({parent,target,post,user});
                }
            };

        }
    }

    askToDelete(item:{parent:HTMLElement,target:HTMLElement,post:postType,user:userType}){
        const {parent,target,post,user}=item;
        target.style.position="relative";
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.7rem;";
        const container=document.createElement("div");
        container.id="askToDelete-popup";
        container.style.cssText=css_row + "position:absolute;inset:0%;backdrop-filter:blur(12px);border-radius:12px;justify-content:center;gap:1.5rem;border:none;";
        const {button:cancel}=Misc.simpleButton({anchor:container,bg:Nav.btnColor,color:"white",type:"button",time:40,text:"cancel"});
        const {button:del}=Misc.simpleButton({anchor:container,bg:"#007FFF",color:"red",type:"button",time:40,text:"delete"});
        target.appendChild(container);
        Misc.growIn({anchor:container,scale:0,opacity:0,time:400});
        cancel.onclick=(e:MouseEvent) => {
            if(e){
                const getCont=target.querySelector(`div#${container.id}`) as HTMLElement;
                if(!getCont) return;
                Misc.growOut({anchor:getCont,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    target.removeChild(getCont);
                },390);
            }
        };
        del.onclick=(e:MouseEvent) => {
            if(e){
                this._service.delpost({id:post.id}).then(async(res)=>{
                    if(res){
                        window.history.go(-1);
                    }
                });

            }
        };


    };
    edituploadFreeNone(item:{card:HTMLElement,editPopup:HTMLElement,targetImg:HTMLImageElement,post:postType,user:userType,imgWidth:number}){
        const {card,targetImg,editPopup,post,user,imgWidth}=item;
        const less900= window.innerWidth < 900;
        const less400= window.innerWidth < 400;
        const css_row="margin-inline:auto;display:flex;justify-content:center:align-items:center;gap:0.75rem;margin-block:1.5rem;flex-wrap:wrap;"
        const btnContainer=document.createElement("div");
        btnContainer.id="edituploadFreeNone-btn";
        btnContainer.style.cssText=css_row +"justify-content:center;align-items:center";
        btnContainer.style.paddingInline=less900 ? (less400 ? "1rem":"2rem") :"3rem";
        const {button:uploadBtn}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:Nav.btnColor,color:"white",text:"upload",time:400});
        const {button:freePicBtn}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:Nav.btnColor,color:"white",text:"free-pics",time:400});
        const {button:noPic}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:Nav.btnColor,color:"white",text:"no pic",time:400});
        editPopup.appendChild(btnContainer);
        uploadBtn.onclick=(e:MouseEvent)=>{
            if(e){
                this.uploadPic({card,editPopup,targetImg,post,user,imgWidth});
                uploadBtn.disabled=true;
                editPopup.removeChild(btnContainer);
            }
        };
        freePicBtn.onclick=(e:MouseEvent)=>{
            if(e){
                //import  class for image selection
                this.freePic({card,editPopup,targetImg,post,user,imgWidth});
                uploadBtn.disabled=true;
                editPopup.removeChild(btnContainer);
            }
        };
        noPic.onclick=async(e:MouseEvent)=>{
            if(e){
                //import different logo on post /images/posts.png
                uploadBtn.disabled=true;
                const post_:postType={...post,userId:user.id,imageKey:undefined,image:undefined};
               await this._service.saveUpdatepost({post:post_}).then(async(res)=>{
                    if(res){
                        this.post={...res};
                        targetImg.src="";
                        targetImg.alt="www.ablogroom.com";
                        targetImg.hidden=true;
                        this.injector=document.querySelector("section#postdetail") as HTMLElement;
                        if(!this.injector) return;
                        // Header.cleanUpByID(this.injector,`postdetail-main-container`);
                        Misc.growOut({anchor:editPopup,scale:0,opacity:0,time:400});
                        setTimeout(()=>{
                            card.removeChild(editPopup);
                        },390);
                        this.main({injector:this.injector,post:this.post,count:0,poster:this.poster,isPage:true,isUser:true,user});
                       
                    }
                });
            }
        };
    }
    freePic(item:{card:HTMLElement,editPopup:HTMLElement,targetImg:HTMLImageElement,post:postType,user:userType,imgWidth}){
        const {card,editPopup,post,targetImg,user,imgWidth}=item;
        //ADD BTNURL
        // this.addImageClass.getImages({parent})//NEED TO BUILD AN ACCESSPOINT
        this.addImageClass.asyncPicImage({parent:editPopup}).then(async(res)=>{
            if(res){
            
                res.arr.map((btnUrl,index)=>{
                    if(btnUrl){
                        // const getBtnEle=res.popup.querySelector(`button#${btnUrl.btn.id}`) as HTMLButtonElement;
                        // if(!getBtnEle) return;
                        btnUrl.btn.onclick=async(e:MouseEvent)=>{
                            if(e){
                                this.post=this.initPost;
                                const image=res.arr[index].imageUrl;
                                this.post={...post,userId:user.id,image:image,imageKey:undefined};
                                targetImg.src=imageLoader({src:image,width:imgWidth,quality:75});
                                targetImg.alt="www.ablogroom.com";
                                Misc.blurIn({anchor:targetImg,blur:"20px",time:600});
                                Misc.growOut({anchor:res.popup,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    res.reParent.removeChild(res.popup);
                                    
                                },390);
                               
                            }
                        };
                    }
                });
            }
        });
    }
    uploadPic(item:{card:HTMLElement,editPopup:HTMLElement,targetImg:HTMLImageElement,post:postType,user:userType,imgWidth:number}){
        const {card,editPopup,post,targetImg,user,imgWidth}=item;
        const less900= window.innerWidth <900;
        const less400= window.innerWidth <400;
        this.post={...post,userId:user.id};
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
        const css_row="margin-inline:auto;display:flex;flex-direction:row;justify-content:center;align-items:center;width:100%;flex-wrap:wrap;";
        const formPopup=document.createElement("div");
        formPopup.id="editPopup-formPopup";
        formPopup.style.cssText=css_row + "position:absolute;border-radius:12px;box-shadow:1px 1px 6px 1px white;padding-block:0.25rem;padding-inline:0rem;z-index:20;backdrop-filter:blur(20px);";
        formPopup.style.top=less900 ? (less400 ? "35%":"50%") : "30%";
        formPopup.style.left="0%";
        formPopup.style.right="0%";
        const showImage=document.createElement("img");
        showImage.id="formPopup-img";
        showImage.src=targetImg.src;
        showImage.alt=targetImg.alt;
        const showImgWidth=less900 ? (less400 ? 50 : 70) :90;
        showImage.style.cssText=`width:${showImgWidth}px;aspect-ratio:1 / 1;border-radius:50%;filter:drop-shadow(0 0 0.25rem white);`;
        Misc.blurIn({anchor:showImage,blur:"20px",time:600});
        const form=document.createElement("form");
        form.style.cssText=css_col;
        const {input:file,label:lfile}=Nav.inputComponent(form);
        file.id="file";
        file.type="file";
        file.name="file";
        file.placeholder="";
        lfile.textContent="Upload a Pic";
        lfile.setAttribute("for",file.id);
        const {button:submitBtn}=Misc.simpleButton({anchor:form,type:"submit",text:"submit",bg:Nav.btnColor,color:"white",time:400});
        submitBtn.disabled=false;
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
                    const urlImg=URL.createObjectURL(file as File);
                   const {Key} = this._service.generatePostImgKey(formdata,this.post) as {Key:string};
                    // console.log("file",file)
                    await this._service.simpleImgUpload(editPopup,formdata).then(async(res)=>{
                        if(res){
                            submitBtn.disabled=true;
                            this.post={...post,imageKey:Key,image:res.img};
                            targetImg.src=imageLoader({src:res.img,width:imgWidth,quality:75});
                            targetImg.alt=res.Key;
                            showImage.src=imageLoader({src:res.img,width:showImgWidth,quality:75});
                            showImage.alt=res.Key;
                            Misc.blurIn({anchor:targetImg,blur:"20px",time:600});
                            Misc.blurIn({anchor:showImage,blur:"20px",time:600});
                            Misc.growOut({anchor:formPopup,scale:0,opacity:0,time:1400});
                            setTimeout(()=>{
                                editPopup.removeChild(formPopup);
                            },1390);
                        }
                    });

                };
            }
        };
        formPopup.appendChild(showImage);
        formPopup.appendChild(form);
        editPopup.appendChild(formPopup);
    }
    cleaupKeepOne(item:{parent:HTMLElement,class_:string}){
        const {parent,class_}=item;
        const eles=parent.querySelectorAll(`.${class_}`) as any as HTMLElement[];
        if(eles.length > 0){
            ([...eles as any] as HTMLElement[]).map((ele,index)=>{
                if(ele && index > 0){
                    parent.removeChild(ele);
                }
            });
        }

    }
};
export default PostDetail;
import Misc from "../common/misc";
import Service from "../common/services";
import ModSelector from "../editor/modSelector";
import { postType, userType } from "../editor/Types";
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import User from "../user/userMain";
import Nav from "../nav/headerNav";
import Header from "../editor/header";
import { FaCrosshairs } from "react-icons/fa";
import { FaCreate } from "../common/ReactIcons";
import Blogs from "../blogs/blogsInjection";
import { FaThumbsUp } from "react-icons/fa";
import { FaHandBackFist } from "react-icons/fa6";
import { imageLoader } from "../common/tsFunctions";
import AddImageUrl from "../common/addImageUrl";
import PostDetail from "../postDetail/postdetail";


class Post{
    no_posts:string;
    addImageClass:AddImageUrl
    logo:string;
    postLogo:string;
    _post:postType;
    initPost:postType;
    _posts:postType[];
    injector:HTMLElement;
    _like:boolean;
    postDetail:PostDetail;
    _usersinfo:userType[];
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
        this.logo="/images/gb_logo.png";
        this.postLogo="/images/posts.png";
        this.no_posts="Sorry there are no posts,,,try again later,, then add advertising to get contracts;";
        this.initPost={id:0,title:"",imageKey:undefined,image:undefined,content:undefined,link:undefined,published:true,userId:"",date:{} as Date,likes:0} as postType;
        this._post=this.initPost;
        this._posts=[] as postType[];
        this._like=false;
        this._usersinfo=[] as userType[];
        this.addImageClass= new AddImageUrl(this._modSelector,this._service);
        const thisuser=this._user.user
        this.postDetail=new PostDetail(this._modSelector,this._service,this._user,thisuser);
    }
    //----GETTERS SETTERS----////
    get post(){
        return this._post;
    }
    set post(post:postType){
        this._post=post;
    }
    get posts(){
        return this._posts;
    }
    set posts(posts:postType[]){
        this._posts=posts;
    }
    get like(){
        return this._like;
    }
    set like(like:boolean){
        this._like=like;
    }
    get usersinfo(){
        return this._usersinfo;
    }
    set usersinfo(usersinfo:userType[]){
        this._usersinfo=usersinfo;
    }
    get user(){
        return this._user.user;
    }
    
    //----GETTERS SETTERS----////

    async main(item:{injector:HTMLElement,posts:postType[],usersinfo:userType[]}){
        const {injector,posts,usersinfo}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        this.usersinfo=usersinfo;
        // console.log(this.usersinfo);//all users showinfo works
        this.posts=posts;
        Header.cleanUpByID(injector,"main-post-container");
        const width=window.innerWidth;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;margin-block:1.65rem;";
        this.injector=injector;
        const container=document.createElement("div");
        container.id="main-post-container";
        container.style.cssText=css_col + " width:100%;";
        container.style.gap=less900 ? (less400 ? "3rem":"2.5rem"):"2rem";
        injector.appendChild(container);
        if(this.user && this.user.id && this.user.email){
            const {button:create_post}=Misc.simpleButton({anchor:container,type:"button",bg:Nav.btnColor,color:"white",time:400,text:"create a post"});
            create_post.style.marginBottom="1rem;"
            create_post.onclick=(e:MouseEvent) =>{
                if(e){
                    this.createPost({injector:injector,user:this.user});
                }
            };
        }
        Misc.matchMedia({parent:injector,maxWidth:1200,cssStyle:{width:"85%"}});
        Misc.matchMedia({parent:injector,maxWidth:1000,cssStyle:{width:"90%"}});
        Misc.matchMedia({parent:injector,maxWidth:900,cssStyle:{width:"100%"}});
        this.titlePage({container,time:1200}).then(async(res)=>{
            if(res){
                const paraSize=less900 ? (less400 ? "130%":"150%"):"135%";
                const preParaSize=less900 ? (less400 ? "130%":"170%"):"150%";
                await this.Posts({injector:injector,container,posts:this.posts,user:this.user}).then(async(res_)=>{
                    if(res_){
                        if(res_.posts && res_.posts.length>0){
                            this.posts=res_.posts.sort((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                            this.posts.map(async(post,index)=>{
                                if(post){
                                    const userinfo=usersinfo.find(user_=>(user_.id===post.userId));
                                    this.postCard({row:res_.row,post,user:this.user,userinfo,index});
                                }
                            });
                            Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                        }else{
                            this.noPosts({parent:container});
                        }
                        ///--------------------------title display ----------------------///
                        res.textContainer.style.opacity="1";
                        res.textContainer.style.transform="scale(1)";
                        res.textContainer.animate([
                            {transform:"scale(0.8)",opacity:"0"},
                            {transform:"scale(1)",opacity:"1"},
                        ],{duration:res.time,iterations:1,"easing":"ease-in-out"});
                        setTimeout(()=>{
                            res.para.style.opacity="1";
                            res.para.style.backgroundColor="rgb(212 229 225 / 33%)";
                            res.para.style.borderRadius="12px";
                            res.para.animate([
                                {transform:"translateX(-75%)",opacity:"0",fontSize:preParaSize,backgroundColor:"black",color:"white"},
                                {transform:"translateX(0%)",opacity:"1",fontSize:paraSize,backgroundColor:"rgb(212 229 225 / 33%)",color:"#1dcbfb"},
                            ],{duration:res.time,iterations:1,"easing":"ease-in-out"});
                        },res.time);
                        ///--------------------------title display ----------------------///
                    }
                });
                

            }
        });
    };
    titlePage(item:{container:HTMLElement,time:number}):Promise<{textContainer:HTMLElement,container:HTMLElement,para:HTMLElement,time:number}>{
        const {container,time}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;";
        const textContainer=document.createElement("div");
        textContainer.id="post-titlepage-textContainer";
        textContainer.style.cssText=css_col + "background-color:black;border-radius:12px;margin-top:1rem;filter:drop-shadow(0 0 0.5rem white);";
        textContainer.style.width=less900 ? (less400 ? "100%":"80%") : "70%";
        textContainer.style.paddingBottom=less900 ? (less400 ? "2rem":"2.5rem") : "2rem";
        textContainer.style.paddingInline=less900 ? (less400 ? "1rem":"1rem") : "2rem";
        const text=document.createElement("p");
        text.id="textContainer-mainTitle";
        text.className="subTitleStyleThreeNoBorder text-center  my-2 mb-4 mx-auto lean";
        text.style.cssText="margin-bottom:1.62rem;background:linear-gradient(180deg, #fff, #06a4f7);background-clip:text;-webkit-background-clip:text;";
        text.style.fontSize=less900 ? (less400 ? "200%":"300%"):"375%";
        text.textContent="quick posts";
        text.id="showBlogs-title";
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
        para.textContent="updates and comments for your pleasure.";
        para.style.cssText="padding-block:1rem;padding-inline:1rem;margin-inline:auto;margin-top:0.5rem;text-wrap:wrap;text-align:center;box-shadow:1px 1px 3px 1px #06a4f7;background-color:rgb(212 229 225 / 20%);";
        para.style.fontSize=less900 ? (less400 ? "130%":"150%"):"175%";
        para.style.color="#06a4f7";
        textContainer.appendChild(text);
        textContainer.appendChild(div1);
        textContainer.appendChild(div2);
        textContainer.appendChild(para);
        textContainer.style.opacity="0";
        para.style.opacity="0";
        textContainer.style.transform="scale(0.8)";
        
        container.appendChild(textContainer);
        return new Promise(resolve=>{
            resolve({textContainer,container,para,time});
        }) as Promise<{textContainer:HTMLElement,container:HTMLElement,para:HTMLElement,time:number}>;
    }
    
    async Posts(item:{injector:HTMLElement,container:HTMLElement,posts:postType[],user:userType}):Promise<{container:HTMLElement,subDiv:HTMLElement,row:HTMLElement,posts:postType[],user:userType}>{
        const {injector,container,posts,user}=item;
        const less900=window.innerWidth < 900 ? true:false;
        const less400=window.innerWidth < 400 ? true:false;
        Header.cleanUpByID(container,"main-post-container-subDiv");//CLEANING UP
        const css="margin-inline:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:1.5rem;";
        const css_row="margin-inline:auto;display:flex;justify-content:flex-start;align-items:flex-start;flex-wrap:wrap;width:100%;";
        const subDiv=document.createElement("div");
        subDiv.id="main-post-container-subDiv";
        subDiv.style.cssText=css + "position:relative;width:100%;padding-inline:2rem;border-radius:12px;";
        subDiv.style.paddingInline=less900 ? (less400 ? "0rem" : "0.5rem") : "2rem";
        subDiv.style.paddingBottom=less900 ? (less400 ? "2rem" : "1.5rem") :"2rem";
        subDiv.style.minHeight=less900 ? (less400 ? "100vh" : "80vh") :"70vh";
        const row=document.createElement("div");
        row.id="main-post-container-subDiv-row";
        row.style.cssText=css_row + "gap:1rem;";
        row.style.justifyContent="flex-start";
        row.className="row";
        if(window.innerWidth <900){
            row.classList.remove("row");
            row.style.flexDirection="column";
            row.style.gap="2rem";
        }
        subDiv.appendChild(row);
        container.appendChild(subDiv);
        return new Promise(resolve=>{
            resolve({container,subDiv,row,posts,user})
        }) as Promise<{container:HTMLElement,subDiv:HTMLElement,row:HTMLElement,posts:postType[],user:userType}>;
    };
    createPost(item:{injector:HTMLElement,user:userType}){
        const {injector,user}=item;
        const less900= window.innerWidth < 900;
        const less400= window.innerWidth < 400;
        injector.style.position="relative";
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
        Header.cleanUpByID(injector,`createPost-popup`);
        const popup=document.createElement("div");
        popup.id=`createPost-popup`;
        popup.style.cssText=css_col + "position:absolute;min-height:400px;gap:1rem;box-shadow:1px 1px 12px 1px blue;border-radius:12px;backdrop-filter:blur(20px);border:none;";
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
        const {input:link,label:lLink,formGrp:grplink}=Nav.inputComponent(form);
        link.id="link";
        link.name="link";
        link.placeholder="https://example.com";
        link.type="url";
        lLink.textContent="add a link ";
        lLink.style.cssText="font-size:140%;text-decoration:underline;text-underline-offset:0.5rem;margin-bottom:1rem;";
        lLink.setAttribute("for",link.id);
        const {button:submit}=Misc.simpleButton({anchor:form,type:"submit",bg:Nav.btnColor,color:"white",text:"submit",time:400});
        submit.disabled=true;
        inTitle.onchange=(e:Event)=>{
            if(e){
                submit.disabled=false;
            }
        };
        if(user && user.id && user.email){
            popup.appendChild(form);
            injector.appendChild(popup);
            Misc.fadeIn({anchor:popup,xpos:100,ypos:100,time:500});
        }
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
                const pub=formdata.get("pub") as string;
                const link=formdata.get("link") as string;
                if(content && title){
                    const post:postType={...this.initPost,userId:user.id,title:title as string,content:content as string,published:Boolean(pub),link}
                    this.uploadFreeNone({injector,popup:popup,post,user});
                    const labelDisplay2=injector.querySelector("div#labelDisplay2") as HTMLElement;
                    if(labelDisplay2){
                        labelDisplay2.hidden=false;
                    }
                }
            }
        };
    }
    uploadFreeNone(item:{injector:HTMLElement,popup:HTMLElement,post:postType,user:userType}){
        const {injector,popup,post,user}=item;
        const less900= window.innerWidth < 900;
        const less400= window.innerWidth < 400;
        const btnContainer=document.createElement("div");
        btnContainer.id="uploadFreeNone-btn";
        btnContainer.style.cssText="margin-inline:auto;display:flex;justify-content:center:align-items:center;gap:0.75rem;";
        btnContainer.style.paddingInline=less900 ? (less400 ? "1rem":"2rem") :"3rem";
        const {button:uploadBtn}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:Nav.btnColor,color:"white",text:"upload",time:400});
        const {button:freePicBtn}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:Nav.btnColor,color:"white",text:"free-pics",time:400});
        const {button:noPic}=Misc.simpleButton({anchor:btnContainer,type:"button",bg:Nav.btnColor,color:"white",text:"no pic",time:400});
        popup.appendChild(btnContainer);
        uploadBtn.onclick=(e:MouseEvent)=>{
            if(e){
                this.uploadPic({injector,popup,post,user});
                uploadBtn.disabled=true;
                popup.removeChild(btnContainer);
            }
        };
        freePicBtn.onclick=(e:MouseEvent)=>{
            if(e){
                //import  class for image selection
                this.freePic({injector,popup,post,user});
                uploadBtn.disabled=true;
                popup.removeChild(btnContainer);
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

                        const getScrollCol1=document.querySelector("div#scrollCol1") as HTMLElement;
                        if(getScrollCol1){
                            //USED BY Profile: client account
                            const getCont=getScrollCol1.querySelector("div#main-post-container") as HTMLElement;
                            await this.Posts({injector:getScrollCol1,container:getCont,posts:this.posts,user}).then(async(res_)=>{
                                if(res_.posts && res_.posts.length>0){
                                    this.posts=res_.posts.sort((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                    this.posts.map(async(post,index)=>{
                                        if(post){
                                            const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                            this.postCard({row:res_.row,post,user:this.user,userinfo,index});
                                        }
                                    });
                                    Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                                }
                            });
                            injector.style.height="auto";
                        }else{
                            const getCont=this.injector.querySelector("div#main-post-container") as HTMLElement;
                            await this.Posts({injector:this.injector,container:getCont,posts:this.posts,user}).then(async(res_)=>{
                                if(res_.posts && res_.posts.length>0){
                                    this.posts=res_.posts.sort((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                    this.posts.map(async(post,index)=>{
                                        if(post){
                                            const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                            this.postCard({row:res_.row,post,user:this.user,userinfo,index});
                                        }
                                    });
                                    Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                                }
                            });
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
    }
    freePic(item:{injector:HTMLElement,popup:HTMLElement,post:postType,user:userType}){
        const {injector,popup,post,user}=item;
        //get class
        this.addImageClass.asyncPicImage({parent:injector}).then(async(res)=>{
            if(res){
                res.arr.map((btnUrl,index)=>{
                    if(btnUrl){
                        // const getBtnEle=res.reParent.querySelector(`button#${btnUrl.btn.id}`) as HTMLButtonElement;
                        // if(!getBtnEle) return;
                        // console.log("click",btnUrl.btn)//works
                        btnUrl.btn.onclick=async(e:MouseEvent)=>{
                            if(e){
                                this.post=this.initPost;
                                const image=res.arr[index].imageUrl;
                                this.post={...post,userId:user.id,image:image};
                                // console.log("outside:",this.post);//works
                                await this._service.saveUpdatepost({post:this.post}).then(async(post_)=>{
                                    if(post_){
                                        this.posts=[...this._posts,post_];
                                        console.log("inside:",this.posts);
                                        const getScrollCol1=document.querySelector("div#scrollCol1") as HTMLElement;
                                        if(getScrollCol1){
                                            //USED BY Profile: client account
                                            const getCont=getScrollCol1.querySelector("div#main-post-container") as HTMLElement;
                                            await this.Posts({injector:getScrollCol1,container:getCont,posts:this.posts,user}).then(async(res_)=>{
                                                if(res_.posts && res_.posts.length>0){
                                                    this.posts=res_.posts.sort((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                                    this.posts.map(async(post,index)=>{
                                                        if(post){
                                                            const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                                            this.postCard({row:res_.row,post,user:this.user,userinfo,index});
                                                        }
                                                    });
                                                    Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                                                }
                                            });
                                            res.reParent.style.height="auto";
                                        }else{
                                            const getCont=this.injector.querySelector("div#main-post-container") as HTMLElement;
                                            // console.log("getCont",getCont)//works
                                            await this.Posts({injector:injector,container:getCont,posts:this.posts,user}).then(async(res_)=>{
                                                if(res_.posts && res_.posts.length>0){
                                                    this.posts=res_.posts.sort((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                                    this.posts.map(async(post,index)=>{
                                                        if(post){
                                                            const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                                            this.postCard({row:res_.row,post,user:this.user,userinfo,index});
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
                                            injector.removeChild(popup);
                                        },390);
                                    }
                                });

                            }
                        };
                    }
                });
            }
        });
    }
    uploadPic(item:{injector:HTMLElement,popup:HTMLElement,post:postType,user:userType}){
        const {user,post,injector,popup}=item;
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
        const {button:submitBtn}=Misc.simpleButton({anchor:form,type:"submit",text:"submit",bg:Nav.btnColor,color:"white",time:400});
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
                    const urlImg=URL.createObjectURL(file as File);
                    this._service.generatePostImgKey(formdata,post) as {Key:string};
                   await this._service.simpleImgUpload(injector,formdata).then(async(res)=>{
                        if(res){
                            this.post={...post,imageKey:res.Key};
                           await this._service.saveUpdatepost({post:this.post}).then(async(post_)=>{
                                if(post_){
                                    this.posts=[...this._posts,post_];
                                    const getScrollCol1=document.querySelector("div#scrollCol1") as HTMLElement;
                                    if(getScrollCol1){
                                        //USED BY Profile: client account
                                        const getCont=getScrollCol1.querySelector("div#main-post-container") as HTMLElement;
                                        await this.Posts({injector:getScrollCol1,container:getCont,posts:this.posts,user}).then(async(res_)=>{
                                            if(res_.posts && res_.posts.length>0){
                                                this.posts=res_.posts.sort((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                                this.posts.sort((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(async(post,index)=>{
                                                    if(post){
                                                        const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                                        this.postCard({row:res_.row,post,user:this.user,userinfo,index});
                                                    }
                                                });
                                                Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                                            }
                                        });
                                        injector.style.height="auto";
                                    }else{
                                        const getCont=injector.querySelector("div#main-post-container") as HTMLElement;
                                        await this.Posts({injector,container:getCont,posts:this.posts,user}).then(async(res_)=>{
                                            if(res_.posts && res_.posts.length>0){
                                                this.posts=res_.posts.sort((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                                this.posts.sort((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(async(post,index)=>{
                                                    if(post){
                                                        const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                                        this.postCard({row:res_.row,post,user:this.user,userinfo,index});
                                                    }
                                                });
                                                Misc.matchMedia({parent:res_.container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
                                            }
                                        });;
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
    }
    async postCard(item:{row:HTMLElement,post:postType,user:userType,userinfo:userType |undefined,index:number}){
        const {row,post,user,userinfo,index}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        Header.cleanUpByID(row,`posts-postcard-col-${index}`);
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;color:inherit;border-radius:inherit;width:100%";
        const shapoutside="padding:1rem;text-wrap:wrap;color:black;font-family:'Poppins-Thin';font-weight:bold;font-size:120%;line-height:2.05rem;color:inherit;border-radius:12px;box-shadow:1px 1px 12px white;"
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.27rem;color:inherit;border-radius:inherit;";
        const col=document.createElement("div");
        col.id=`posts-postcard-col-${index}`;
        col.className=less900 ? "col-md-12" : "col-md-6";
        col.style.cssText="margin-inline:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:0.75rem;background-color:#098ca091;color:white;border-radius:12px;box-shadow:1px 1px 6px 1px white;padding-inline:1rem;";
        col.style.width=less900 ? "100%":"auto";
        col.style.flex=less900 ? "1 0 100%":"1 0 47%";
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
        shapeOutside.style.cssText=window.innerWidth <400 ? shapoutside + css_col :shapoutside;
        const img=document.createElement("img");
        img.id=`posts-shapeOutside-img-${index}`;
        img.style.cssText="border-radius:50%;shape-outside:circle(50%);float:left;margin-right:1.25rem;margin-bottom:2rem;aspect-ratio:1/1;filter:drop-shadow(0 0 0.75rem white);border:none;";
        img.style.filter="drop-shadow(0 0 0.75rem white) !important";
        img.style.width=window.innerWidth <900 ? (window.innerWidth <400 ? "300px" : "310px") :"355px";
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
                    shapeOutside.innerHTML+=post.content ? `${post.content.slice(0,250)}...see detail`  : "";
                }
            });
        }else{
            img.src=imageLoader({src:this.postLogo,width:widthConv,quality:75});
             img.alt="www.ablogroom.com";
            shapeOutside.appendChild(img);
            Misc.blurIn({anchor:img,blur:"20px",time:700});
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
        datePosterCont.style.cssText=css_row + "position:relative;gap:1.5rem;"
        const date=document.createElement("small");
        date.id=`date-${index}`;
        const poster=document.createElement("small");
        poster.id=`userinfo-poster-name-${index}`;
        poster.textContent=(userinfo && userinfo.name) ? userinfo.name :"blogger";
        date.textContent= post.date ? Blogs.tolocalstring(post.date):"no date";
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
        this.removePost({parent:row,target:col,post,user});
        const btnContainer=document.createElement("div");
        btnContainer.id="card-btnContainer";
        btnContainer.style.cssText=css_row + "gap:2rem;margin-block:1rem;";
        if(post.userId===user.id){
            const {button:edit}=Misc.simpleButton({anchor:btnContainer,bg:Nav.btnColor,color:"white",type:"button",time:400,text:"update"});
            edit.disabled=false;
            edit.onclick=(e:MouseEvent)=>{
                if(e){
                    this.editPost({parent:row,col,post,user,index});
                    edit.disabled=true;
                }
            };
        }
        const {button:detail}=Misc.simpleButton({anchor:btnContainer,bg:Nav.btnColor,color:"white",type:"button",time:400,text:"quick detail"});
        detail.onclick=(e:MouseEvent)=>{
            if(e){
                detail.disabled=true;
                const _userinfo:userType|null=userinfo ? userinfo as userType : null;
                this.postDetail.main({injector:col,post,count:0,poster:_userinfo,isPage:false,isUser:false,user});
            }
        };
        const {button:pageDetail}=Misc.simpleButton({anchor:btnContainer,bg:Nav.btnColor,color:"white",type:"button",time:400,text:"page detail"});
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
       
    }
    likepost(item:{parent:HTMLElement,post:postType}){
        const {parent,post}=item;
        const less400=window.innerWidth <400 ? true:false;
        const less900=window.innerWidth <900 ? true:false;
        parent.style.position="relative";
        parent.style.zIndex="0";
        const popup=document.createElement("div");
        popup.style.cssText="position:absolute;width:auto;height:auto;border-radius:50%;top:0%;right:0%;z-index:1;aspect-ratio:1 / 1;padding:0px;";
        popup.style.transform=less400 ? "translate(10px,-20px)" :"translate(20px,-20px)";
        popup.id="popup-likepost";
        popup.className="popup";
        const xDiv=document.createElement("div");
        xDiv.id="thumb";
        xDiv.style.cssText="padding:2px;border-radius:50%;background-color:black;color:white;position:relative;display:flex;justify-content:center;align-items:center;aspect-ratio:inherit;";
        popup.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaHandBackFist,cssStyle:{fontSize:"20px",borderRadius:"50%",color:"white",margin:"auto",zIndex:"1"}});
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{transform:"translate(30px,-30px)"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{transform:"translate(25px,-25px)"}});
        parent.appendChild(popup);
        xDiv.onclick=async(e:MouseEvent)=>{
            if(e){
                //FaHandBackFist
                Header.cleanUp(xDiv);
                FaCreate({parent:xDiv,name:FaThumbsUp,cssStyle:{fontSize:"20px",borderRadius:"50%",color:"white",margin:"auto",zIndex:"1"}});
                xDiv.style.backgroundColor="blue";
                xDiv.style.color="green";
                xDiv.animate([
                    {transform:"scale(1)",backgroundColor:"black",color:"white"},
                    {transform:"scale(1.1)",backgroundColor:"red",color:"blue"},
                    {transform:"scale(1)",backgroundColor:"blue",color:"green"},
                ],{duration:1000,iterations:1});
                const isPost= await this._service.checkPostlike({post:post});
                if(isPost !==false){
                    this.post=isPost as postType;
                    //-----------------------show likes-----------------//
                    this.showLikes({parent,post:this.post});
                    //-----------------------show likes-----------------//
                }
            }
        }
        //-----------------------show likes-----------------//
        this.showLikes({parent,post});
        //-----------------------show likes-----------------//

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
    noPosts(item:{parent:HTMLElement}){
        const {parent}=item;
        parent.style.position="relative";
        const css="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
        const container=document.createElement("div");
        container.style.cssText=css + " border-radius:12px;box-shadow:1px 1px 12px 1px #0a2351;background-color:white;color:black;padding:1rem;min-height:20vh;width:100%;";
        const para=document.createElement("p");
        para.textContent=this.no_posts;
        para.style.cssText="margin-inline:auto;padding-inline:1rem;font-family:'Poppins-Thin';padding-block:2rem;text-wrap:pretty;font-size:160%;font-weight:700;";
        container.appendChild(para);
        parent.appendChild(container);

    }
    editPost(item:{parent:HTMLElement,col:HTMLElement,post:postType,user:userType,index:number}){
        const {parent,col,post,user,index}=item;
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
        const {input:link,label:lLink,formGrp:grplink}=Nav.inputComponent(form);
        link.id="link";
        link.name="link";
        link.value=post.link ? post.link : "";
        link.placeholder="https://example.com";
        link.type="url";
        lLink.textContent="add a link ";
        lLink.style.cssText="font-size:140%;text-decoration:underline;text-underline-offset:0.5rem;margin-bottom:1rem;";
        lLink.setAttribute("for",link.id);
        const {button:submit}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"white",text:"submit",time:400,type:"submit"});
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
                    //    if(res){
                            
                            const getPopup=col.querySelector(`div#editPost-popup-${post.id}`) as HTMLElement;
                            if(getPopup){
                                Misc.growOut({anchor:getPopup,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    col.removeChild(getPopup);
                                },390);

                            }
                            const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                            this.postCard({row:parent,post:this.post,user,userinfo,index:index});
                        // }
                    });

                }
            }
        };
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
                                await this.Posts({injector:this.injector,container:getCont,posts:this.posts,user}).then(async(res_)=>{
                                    if(res_.posts && res_.posts.length>0){
                                        this.posts=res_.posts.sort((a,b)=>{if(a.likes > b.likes)return -1;return 1}).map(post=>(post));
                                        this.posts.map(async(post,index)=>{
                                            if(post){
                                                const userinfo=this.usersinfo.find(user_=>(user_.id===post.userId));
                                                this.postCard({row:res_.row,post,user:this.user,userinfo,index});
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


    }
   
    
};
export default Post;
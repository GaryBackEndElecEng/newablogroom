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


class Post{
    no_posts:string;
    logo:string;
    _post:postType;
    _posts:postType[];
    injector:HTMLElement;
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
        this.logo="/images/gb_logo.png";
        this.no_posts="Sorry there are no posts,,,try again later,, then add advertising to get contracts;";
        this._post={id:0,title:"",imgKey:"",content:"",link:"",published:true,userId:"",date:{} as Date} as postType;
        this._posts=[] as postType[];
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
    //----GETTERS SETTERS----////

    async main(item:{injector:HTMLElement,posts:postType[]}){
        const {injector,posts}=item;
        Header.cleanUpByID(injector,"main-post-container");
        const width=window.innerWidth;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
        injector.style.cssText=css_col + "gap:1rem;position:relative;width:75%;min-height:100vh;";
        this.injector=injector;
        const user=this._user.user;
        const container=document.createElement("div");
        container.id="main-post-container";
        container.style.cssText=css_col + " width:100%;margin-block:2rem;";
        const title=document.createElement("h4");
        title.textContent="Posts";
        title.className="text-center my-2 text-primary lean display-4";
        const div=document.createElement("div");
        div.style.cssText=`height:3px;width:${(0.8*width)}px;background-color:blue;margin-block:1rem;border-radius:10px;`;
        const div1=document.createElement("div");
        div1.style.cssText=`height:3px;width:${(0.8*width/1.62)}px;background-color:lightblue;margin-bottom:1rem;border-radius:10px;`;
        container.appendChild(title);
        container.appendChild(div);
        container.appendChild(div1);
        injector.appendChild(container);
        if(user && user.id && user.email){
            const {button:createpost}=Misc.simpleButton({anchor:container,type:"button",bg:Nav.btnColor,color:"white",time:400,text:"create a post"});
            createpost.onclick=(e:MouseEvent) =>{
                if(e){
                    this.createPost({parent:injector,user});
                }
            };
        }
        Misc.matchMedia({parent:injector,maxWidth:1200,cssStyle:{width:"85%"}});
        Misc.matchMedia({parent:injector,maxWidth:1000,cssStyle:{width:"90%"}});
        Misc.matchMedia({parent:injector,maxWidth:900,cssStyle:{width:"100%"}});
        this.Posts({injector:injector,posts,user});
    };
    
    async Posts(item:{injector:HTMLElement,posts:postType[],user:userType}){
        const {injector,posts,user}=item;
        Header.cleanUpByID(injector,"inner-post-container");//CLEANING UP
        const css="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1.5rem;";
        const container=document.createElement("div");
        container.id="inner-post-container";
        container.style.cssText=css + "position:relative;width:100%;padding-inline:2rem;border-radius:12px;";
        const row=document.createElement("div");
        row.id="posts-row";
        row.className="row";
        if(posts && posts.length>0){
            this.posts=posts;
            this.posts.map(async(post,index)=>{
                if(post){
                    const col=document.createElement("div");
                    col.className="col-md-6";
                    col.id=`posts-col-${index}`;
                    col.style.cssText="margin-inline:auto;display:flex;flex-direction:column;align-items:center;gap:0.75rem;flex:0 0 50%;background-color:#098ca091;color:white;border-radius:12px;";
                    this.postCard({row:row,col:col,post,user:user,index});
                    row.appendChild(col);
                    Misc.growIn({anchor:col,scale:1,opacity:0,time:500});
                    Misc.matchMedia({parent:col,maxWidth:900,cssStyle:{flex:"0 0 100%"}});
                }
            });
            Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{paddingInline:"0px"}})
        }else{
            this.noPosts({parent:container});
        }
        container.appendChild(row);
        console.log(container,injector)
        if(injector && container){

            injector.appendChild(container);
        }
    };
    createPost(item:{parent:HTMLElement,user:userType}){
        const {parent,user}=item;
        parent.style.position="relative";
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
        Header.cleanUpByID(parent,`createPost-popup`);
        const popup=document.createElement("div");
        popup.id=`createPost-popup`;
        popup.style.cssText=css_col + "position:absolute;width:375px;min-height:400px;gap:1rem;box-shadow:1px 1px 12px 1px blue;border-radius:12px;backdrop-filter:blur(20px);border:none;";
        const form=document.createElement("form");
        form.id="createPost-form";
        form.style.cssText=css_col + "width:100%;padding-inline:1rem;margin-block:1.5rem;";
        const {input:inTitle,label:lTitle,formGrp:grpTitle}=Nav.inputComponent(form);
        grpTitle.style.width="100% !important";
        inTitle.id="title";
        inTitle.name="title";
        inTitle.placeholder="Your Title";
        lTitle.textContent="Title";
        lTitle.style.cssText="font-size:140%;text-decoration:underline;text-underline-offset:0.5rem;margin-bottom:1rem;";
        lTitle.setAttribute("for",inTitle.id);
        const {textarea:incontent,label:lcontent,formGrp:grpContent}=Nav.textareaComponent(form);
        grpContent.style.width="100% !important";
        incontent.id="content";
        incontent.rows=4;
        incontent.style.cssText="width:100% !important";
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
            parent.appendChild(popup);
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
                    parent.removeChild(popup);
                },390);
            }
        };
        //-------DELETE----------//
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const content=formdata.get("content") as string;
                const title=formdata.get("title") as string;
                const pub=formdata.get("pub") as string;
                const link=formdata.get("link") as string;
                if(content && title){
                    this.post={...this._post,title:title as string,content:content as string,published:Boolean(pub),link}
                    this.uploadPic({parent,popup:popup,post:this.post,user});
                    const labelDisplay2=parent.querySelector("div#labelDisplay2") as HTMLElement;
                    if(labelDisplay2){
                        labelDisplay2.hidden=false;
                    }
                }
            }
        };
    }
    async postCard(item:{row:HTMLElement,col:HTMLElement,post:postType,user:userType,index:number}){
        const {row,col,post,user,index}=item;
        this.post=post;
        Header.cleanUpByID(col,`postcard-card-${index}`);
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;background-color:inherit;color:inherit;border-radius:inherit;";
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.27rem;background-color:inherit;color:inherit;border-radius:inherit;";
        const card=document.createElement("div");
        card.id=`postcard-card-${index}`;
        card.style.cssText=css_col + "width:100%;padding-block:2rem;";
        const title=document.createElement("p");
        title.id="card-title";
        title.className="post-title";
        
        title.textContent=post.title;
        card.appendChild(title);
        const shapeOutside=document.createElement("p");
        shapeOutside.id="shapeOutside";
        shapeOutside.style.cssText="padding:1rem;text-wrap:wrap;color:black;font-family:'Poppins-Thin';font-weight:bold;font-size:120%;line-height:2.05rem;color:inherit;border-radius:12px;background-color:black;box-shadow:1px 1px 12px white;";
        const img=document.createElement("img");
        img.id="shapeOutside-img";
        img.src=this.logo;
        img.alt="www.ablogroom.com";
        img.style.cssText="border-radius:50%;max-width:250px;shape-outside:circle(50%);float:left;margin-right:1.25rem;margin-bottom:2rem;aspect-ratio:1/1;filter:drop-shadow(0 0 0.75rem white);border:none;";
        img.style.filter="drop-shadow(0 0 0.75rem white) !important";
        if(post.imageKey){
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
            shapeOutside.appendChild(img);
            Misc.blurIn({anchor:img,blur:"20px",time:700});
            shapeOutside.innerHTML+=post.content ? post.content : "";
        }
        Misc.matchMedia({parent:img,maxWidth:400,cssStyle:{maxWidth:"300px",shapeOutside:""}});
        card.appendChild(shapeOutside);
        Misc.matchMedia({parent:shapeOutside,maxWidth:400,cssStyle:{display:"flex",flexDirection:"column",alignItems:"center"}});
        Misc.matchMedia({parent:img,maxWidth:400,cssStyle:{shapeOutside:"none"}});
        const cardBody=document.createElement("div");
        cardBody.style.cssText=css_col +"gap:2rem;padding:1rem;" ;
        const dateEmailCont=document.createElement("div");
        dateEmailCont.style.cssText=css_row
        const date=document.createElement("small");
        const email=document.createElement("small");
        email.textContent=user.email;
        date.textContent= post.date ? Blogs.tolocalstring(post.date):"no date";
        dateEmailCont.appendChild(date);
        dateEmailCont.appendChild(email);
        cardBody.appendChild(dateEmailCont);
        if(post.link){
            const anchor=document.createElement("a");
            anchor.style.cssText="align-self:center;justify-self:center;font-weight:800;margin-inline:auto;color:white;"
            anchor.id="post-anchor";
            anchor.href=post.link;
            anchor.textContent=post.link;
            cardBody.appendChild(anchor);
        }
        this.removePost({parent:row,target:col,post,user});
        if(post.userId===user.id){
            const {button:edit}=Misc.simpleButton({anchor:cardBody,bg:Nav.btnColor,color:"white",type:"button",time:400,text:"update"});
            edit.disabled=false;
            edit.onclick=(e:MouseEvent)=>{
                if(e){
                    this.editPost({parent:row,col,post,user,index});
                }
            };
        }
        card.appendChild(cardBody);
        col.appendChild(card);
        Misc.growIn({anchor:card,scale:1,opacity:0,time:500});
        const getShapeOutside=card.querySelector("p#shapeOutside") as HTMLElement;
        if(!getShapeOutside) return;
        const getImg=getShapeOutside.querySelector("img#shapeOutside-img") as HTMLElement;
        if(!getImg) return;
        Misc.matchMedia({parent:getShapeOutside,maxWidth:400,cssStyle:{display:"flex",flexDirection:"column",alignItems:"center"}});
        Misc.matchMedia({parent:getImg,maxWidth:400,cssStyle:{shapeOutside:"none"}});
       
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
                            this.postCard({row:parent,col,post:this.post,user,index:index});
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
            xDiv.style.cssText=css_row + "position:absolute;padding:0.37rem;background:black;color:white;top:0%;right:0%;transform:translate(-18px,32px);z-index:200;border-radius:50%;";
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
                        this.posts.map((_post,ind)=>{
                            if(_post && _post.id===post.id){
                                this._posts.splice(ind,1);
                                this.posts=this._posts;
                                Misc.growOut({anchor:target,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    parent.removeChild(target);
                                },390);
                            }
                        });
                        await this.Posts({injector:this.injector,posts:this.posts,user});
                    }
                });

            }
        };


    }
    uploadPic(item:{parent:HTMLElement,popup:HTMLElement,post:postType,user:userType}){
        const {user,post,parent,popup}=item;
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
        const {button:submit}=Misc.simpleButton({anchor:form,type:"submit",text:"submit",bg:Nav.btnColor,color:"white",time:400});
        file.onchange=(e:Event)=>{
            if(e){
                submit.disabled=false;
            }
        };
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File;
                if(file ){
                    const urlImg=URL.createObjectURL(file as File);
                    this._service.generatePostImgKey(formdata,post) as {Key:string};
                   await this._service.simpleImgUpload(parent,formdata).then(async(res)=>{
                        if(res){
                            this.post={...this._post,imageKey:res.Key};
                           await this._service.saveUpdatepost({post:this.post}).then(async(post_)=>{
                                if(post_){
                                    this.posts=[...this._posts,post_];
                                    const getScrollCol1=document.querySelector("div#scrollCol1") as HTMLElement;
                                    if(getScrollCol1){
                                        //USED BY Profile: client account
                                        await this.Posts({injector:getScrollCol1,posts:this.posts,user});
                                        parent.style.height="auto";
                                    }else{
                                        await this.Posts({injector:this.injector,posts:this.posts,user});
                                    }
                                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                                    setTimeout(()=>{
                                        const labelDisplay2=parent.querySelector("div#labelDisplay2") as HTMLElement;
                                        if(labelDisplay2){
                                            labelDisplay2.hidden=true;
                                        }
                                        parent.removeChild(popup);
                                    },390);
                                }
                            });
                        }
                    });

                };
            }
        };
        popup.appendChild(form);
        parent.appendChild(popup)
    }
    
};
export default Post;
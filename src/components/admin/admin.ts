import Service from "../common/services";
import ModSelector from "../editor/modSelector";
import { adminImageType, adminReplyMsgType, blogType, delteUserType, infoType2, messageType, pageCountType, postType, userType } from "../editor/Types";
import User from "../user/userMain";
import Header from "../editor/header";
import Misc from "../common/misc";
import Nav from "../nav/headerNav";
import {FaCreate} from '@/components/common/ReactIcons';
import { FaCrosshairs } from "react-icons/fa";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { mainResumeStrType, mainResumeType } from "../bio/resume/refTypes";
import styles from "./admin.module.css";



class Admin{
    public viewPortId:string;
    private _info:infoType2;
   private _adminimgs:adminImageType[];
   private _pagecounts:pageCountType[];
   private _admin:userType;
   private _posts:postType[];
   private _blogs:blogType[];
   private _resumes:mainResumeType[];
   private _messages:messageType[];
   public readonly btnColor:string="#0C090A";
   public readonly logo:string="./images/gb_logo.png";
    nofilePara:string=" no files";
    constructor(private _service:Service,private _modSelector:ModSelector,private _user:User,private _users:userType[],admin:userType|null){
        this.viewPortId="viewport";
        this.logo="./images/gb_logo.png";
        this.btnColor="#0C090A";
        this._adminimgs=[] as adminImageType[];
        this._messages=[];
        this.posts=[] as postType[];
        this.blogs=[] as blogType[];
        const mainResumeArr:mainResumeType[]=[];
        this._users.map(user=>{
            if(user?.resumes){
                 (user.resumes as mainResumeStrType[]).map(_resume=>{
                    const mainRes={..._resume,resume:JSON.parse(_resume.resume)} as mainResumeType;
                    mainResumeArr.push(mainRes);
                }) ;
            }
        });
        this._resumes=mainResumeArr;
        this._users.map(user=>{
            if(user){
                this._posts=this._posts.concat(user.posts);
                this._blogs=this._blogs.concat(user.blogs);
            }
        });
        
        this._admin=admin ||{} as userType;
        this._info={
            id: 2,
            name: "Gary Wallace",
            address: "21 Rue St-Jean",
             cell: "416-917-5768",
            country: "CA",
            provState: "ON",
            city: "Chateauguay",
             postal: "L4C-1K8",
             vacation:"working",
             delay:"working on a project",
             hours: "9:00 am-6:00 pm",
            extra: "Business hours: mon-Fri, 9-6pm",
            siteArray: [
                    {
                        name: "fb",
                        url: "https://www.facebook.com/people/Master-Connect/100077971323770/"
                    },
                    {
                        name: "linkedin",
                        url: "https://www.linkedin.com/in/gary-wallace-501513229/"
                    },
                    {
                        name: "masterconnect",
                        url: "https://www.masterconnect.ca"
                    },
                    {
                        name: "masterconnect-US",
                        url: "https://www.master-connect.com"
                    },
                    {
                        name: "email",
                        url: "masterconnect919@gmail.com"
                    },
                    {
                        name: "email2",
                        url: "masterultils@gmail.com"
                    },
                    {
                        name: "github",
                        url: "https://github.com/GaryBackEndElecEng"
                    },
                    {
                        name: "instagram",
                        url: "https://www.instagram.com/garysjwallacedeveloper/?next=%2F"
                
                    }
                ]
    
        }
}
    //--------GETTER SETTERS------////
    get adminimgs(){
        return this._adminimgs
    }
    set adminimgs(adminimgs:adminImageType[]){
        this._adminimgs=adminimgs;
    }
    get adminUser(){
        return this._admin
    }
    set adminuser(user:userType){
        this._admin=user;
    }
    get resumes(){
        return this._resumes;
    };
    set resumes(resumes:mainResumeType[]){
        this._resumes=resumes;
    };
    get users(){
        return this._users
    }
    set users(users:userType[]){
        this._users=users;
    }
    set messages(messages:messageType[]){
        this._messages=messages;
    }
    get messages(){
        return this._messages;
    }
    get pagecounts(){
        return this._pagecounts;
    }
    set pagecounts(pagecounts:pageCountType[]){
        this._pagecounts=pagecounts;
    }
    get posts(){
        return this._posts
    }
    set posts(posts:postType[]){
        this._posts=posts
    }
    get blogs(){
        return this._blogs
    }
    set blogs(blogs:blogType[]){
        this._blogs=blogs
    }
    get admin(){
        return this._user.user.admin
    }
    get  info(){
        return this._info
    }
    set info(info:infoType2){
        this._info=info
    }
    //--------GETTER SETTERS------////
    // :INJECTOR : id="admin-injection"
    async main(item:{injector:HTMLElement,count:number}):Promise<number>{
        const {injector,count}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        Header.cleanUpByID(injector,"injector-mainContainer");
        const adminUser=this.adminUser;
        const css="display:flex;flex-direction:column;align-items:center;margin:auto;padding-inline:1rem;width:100%;position:relative;";
        const css_row="display:flex;place-items:center;margin-inline:auto;padding-inline:1rem;width:100%;position:relative;flex-warp:wrap;";
        const mainContainer=document.createElement("section");
        mainContainer.id="injector-mainContainer";
        mainContainer.style.cssText=css;
        mainContainer.style.padding=less900 ? (less400 ? "0rem":"0.5rem"):"1rem";
        const viewport=document.createElement("div");
        viewport.id=this.viewPortId;
        viewport.style.cssText=css + "margin-inline:auto; width:100%;min-height:70vh;padding-inline:auto;box-shadow:1px 1px 12px 1px white;backdrop-filter:blur(4px);";
        const btnContainer=document.createElement("div");
        btnContainer.id="btnContainer";
        btnContainer.style.cssText = css_row + "margin-block:2rem;margin-inline:auto;justify-content:center;flex-wrap:wrap;gap:1rem;";

        mainContainer.appendChild(viewport);
        mainContainer.appendChild(btnContainer);
        injector.appendChild(mainContainer);
            
        const {button:btnImages}=Misc.simpleButton({anchor:btnContainer,text:"open images",type:"button",time:400,bg:this.btnColor,color:"white"});
            btnImages.onclick=(e:MouseEvent)=>{
                if(e){
                    // GET IMAGES!!
                    btnImages.disabled=true;
                     setTimeout(()=>{btnImages.disabled=false;},1000);

                    this.openClean({parent:viewport});
                    const row=document.createElement("div");
                    row.style.cssText="display:flex;margin-inline:auto;flex-direction:row;flex-wrap:wrap;align-items:center;";
                    row.id="row-images";
                    row.classList.add("row");
                    viewport.appendChild(row)
                        if(!(this._adminimgs && this._adminimgs.length>0)){
                            this._service.adminImages(adminUser).then(async(res)=>{
                                if(res && res.length>0){
                                        this.adminimgs=res;
                                        this.adminimgs.toSorted((a,b)=>{if(a.id<b.id) return -1;return 1}).map(adminimg=>{
                                            if(adminimg){
                                                this.imgCard(row,adminimg);
                                                
                                            }
                                        });
                                        this.searchImg(viewport,this.adminimgs);
                                }
                                else{
                                    this.noFiles(viewport);
                                }
                            });
                        
                    }else{
                        this.adminimgs.toSorted((a,b)=>{if(a.id<b.id) return -1;return 1}).map(adminimg=>{
                            if(adminimg){
                                this.imgCard(row,adminimg);
        
                                
                            }
                        });
                    }
                }
            };
        const {button:resumeBtn}=Misc.simpleButton({anchor:btnContainer,text:"open resumes",type:"button",time:400,bg:this.btnColor,color:"white"});
            resumeBtn.onclick=(e:MouseEvent)=>{
                if(e){
                    //GET USERS
                    console.log("clicked")
                    // resumeBtn.disabled=true;
                    // setTimeout(()=>{usersBtn.disabled=false;},1000);
                    this.openClean({parent:viewport});
                   this.getResumes({parent:viewport,mainResumes:this.resumes});
                  
                }
            };
        const {button:usersBtn}=Misc.simpleButton({anchor:btnContainer,text:"open users",type:"button",time:400,bg:this.btnColor,color:"white"});
            usersBtn.onclick=(e:MouseEvent)=>{
                if(e){
                    //GET USERS
                    usersBtn.disabled=true;
                    setTimeout(()=>{usersBtn.disabled=false;},1000);
                    this.openClean({parent:viewport});
                   this.getUsers({parent:viewport,css,users:this._users,adminUser});
                   this.searchUser({viewport:viewport,users:this._users,adminUser});
                  
                }
            };
        const {button:postBtn}=Misc.simpleButton({anchor:btnContainer,text:"open posts",type:"button",time:400,bg:this.btnColor,color:"white"});
            postBtn.onclick=(e:MouseEvent)=>{
                if(e){
                    //GET USERS
                    postBtn.disabled=true;
                    setTimeout(()=>{postBtn.disabled=false;},1000);
                    postBtn.disabled=true;
                    setTimeout(()=>{postBtn.disabled=false;},1000);
                    this.openClean({parent:viewport});
                   this.getPosts({parent:viewport,posts:this.posts});
                  
                }
            };
        const {button:blogBtn}=Misc.simpleButton({anchor:btnContainer,text:"open blogs",type:"button",time:400,bg:this.btnColor,color:"white"});
            blogBtn.onclick=(e:MouseEvent)=>{
                if(e){
                    //GET USERS
                    blogBtn.disabled=true;
                     setTimeout(()=>{blogBtn.disabled=false;},1000);
                    this.openClean({parent:viewport});
                   this.getBlogs({parent:viewport,blogs:this.blogs});
                  
                }
            };
        const {button:messBtn}=Misc.simpleButton({anchor:btnContainer,text:"open msgs",type:"button",time:400,bg:this.btnColor,color:"white"});
            messBtn.onclick=(e:MouseEvent)=>{
                if(e){
                    messBtn.disabled=true;
                    setTimeout(()=>{messBtn.disabled=false;},1000);
                    //GET MESSAGES
                    this.openClean({parent:viewport});
                   this.getMessages(viewport,this.adminUser);
                }
            };

        const {button:openpgcounts}=Misc.simpleButton({anchor:btnContainer,text:"open pg-counts",type:"button",time:400,bg:this.btnColor,color:"white"});
            openpgcounts.onclick=(e:MouseEvent)=>{
                if(e){
                    openpgcounts.disabled=true;
                    setTimeout(()=>{openpgcounts.disabled=false;},1000);
                    this.openClean({parent:viewport});
                    const user_id=this._user.user.id;
                    this.getPagecounts(viewport,user_id);
                }
            }
        const {button:close}=Misc.simpleButton({anchor:btnContainer,text:"close",type:"button",time:400,bg:this.btnColor,color:"white"});
        close.onclick=(e:MouseEvent)=>{
            if(e){
                close.disabled=true;
                setTimeout(()=>{close.disabled=false;},1000);
                const searchContainer=viewport.querySelector("div#search-container") as HTMLElement;
                const getmsgsContainer=document.querySelector("div#messages-container") as HTMLElement;
                const getUsers=viewport.querySelector("div#getUsers-row") as HTMLElement ;
                const getpgCounts=injector.querySelector("div#pg-counts-main") as HTMLElement ;
                const getrowImages=viewport.querySelector("div#row-images") as HTMLElement;
                const get_posts=viewport.querySelector("div#getPosts-container") as HTMLElement;
                const get_blogs=viewport.querySelector("div#getBlogs-container") as HTMLElement;
                const userSearchCont=viewport.querySelector("div#userSearch-container") as HTMLElement;
                const infoPage=viewport.querySelector("div#infoForm-container") as HTMLElement;
                const arr:{name:string,html:HTMLElement}[]=[{name:"messages",html:getmsgsContainer},{name:"users",html:getUsers},{name:"pagecounts",html:getpgCounts},{name:"images",html:getrowImages},{name:"search",html:searchContainer},{name:"get_posts",html:get_posts},{name:"get_blogs",html:get_blogs},{name:"user-search",html:userSearchCont},{name:"info-page",html:infoPage}] as {name:string,html:HTMLElement}[]
                [...arr].map(item=>{
                    if(item.html){
                        const ID=item.html.id;
                        const check=([...viewport.children as any] as HTMLElement[]).map(html=>html.id).includes(ID)
                        if(check){

                            if(item.name !== "images"){
                                Misc.fadeOut({anchor:item.html,xpos:100,ypos:100,time:400});
                                setTimeout(()=>{
                                    viewport.removeChild(item.html);
    
                                },398);
                            }else{
                                Misc.fadeOut({anchor:item.html,xpos:100,ypos:100,time:400});
                                setTimeout(()=>{
                                    viewport.removeChild(item.html);
                                    if(searchContainer){
                                        viewport.removeChild(searchContainer)
                                    }
                                },398);
                            }
                        }
                    }
                });
              
            }
            };
            
            const {button:infoBtn}=Misc.simpleButton({anchor:btnContainer,text:"open info form",type:"button",time:400,bg:this.btnColor,color:"white"});
            infoBtn.onclick=async(e:MouseEvent)=>{
                if(e){
                    infoBtn.disabled=true;
                    setTimeout(()=>{infoBtn.disabled=false;},1000);
                    //GET USERS
                    this.openClean({parent:viewport});
                    const checkInfo = await this._service.peronalInfo2()
                        if(checkInfo){
                            this._info=checkInfo;
                            
                            this.infoForm({parent:viewport,info:this._info});
                        }
                    
                }
            };
            
            return Promise.resolve(count+1) as Promise<number>;
    };
    //end

    openClean(item:{parent:HTMLElement}){
        const {parent}=item
        const IDs:{name:string,id:string}[]=[
            {name:"images",id:"row-images"},
            {name:"users",id:"getUsers-row"},
            {name:"messages",id:"messages-container"},
            {name:"page-counts",id:"pg-counts-main"},
            {name:"page-posts",id:"getPosts-container"},
            {name:"page-blogs",id:"getBlogs-container"},
            {name:"search image",id:"searchImg-container"},
            {name:"search user",id:"userSearch-container"},
            {name:"info container",id:"infoForm-container"},
            {name:"resumes",id:"get-resumes"},
        ]
        IDs.map(item=>{
            Header.cleanUpByID(parent,item.id);
        });
    };

    getResumes({parent,mainResumes}:{parent:HTMLElement,mainResumes:mainResumeType[]}){
        if(mainResumes?.length && mainResumes.length>0){

            const container=document.createElement("div");
            container.id="resume-cont";
            container.id="get-resumes";
            container.className=styles.getResumes;
            parent.appendChild(container);
            const row=document.createElement("div");
            row.id="resume-row";
            row.className=styles.resumeRow;
            mainResumes.map((mainResume,index)=>{
                this.Resume({row,mainResume,index});
            });
            container.appendChild(row);
        }
    };

    Resume({row,mainResume,index}:{row:HTMLElement,mainResume:mainResumeType,index:number}){
        const {resume,name}=mainResume;
        const {contact}=resume;
        const col=document.createElement("div");
        col.id="row-col-" + String(index);
        col.className=styles.resumeCol;
        const h6=document.createElement("h6");
        h6.className="text-primary lean my-1 mb-2";
        h6.style.cssText="font-size:110%;"
        h6.id="col-h6";
        h6.textContent=name;
        col.appendChild(h6);
        for(const [key,value] of Object.entries(contact)){
            const innerRow=document.createElement("div");
            const h6=document.createElement("h6");
            h6.style.cssText="color:blue";
            h6.textContent=key;
            const para=document.createElement("p");
            para.textContent=value;
            innerRow.appendChild(h6);
            innerRow.appendChild(para);
            col.appendChild(innerRow);

        };
        row.appendChild(col);

    }

  
    imgCard(row:HTMLElement,adminimg:adminImageType){
        const col=document.createElement("div");
        col.id="col-img-card";
        col.style.cssText="margin:auto;background:white;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;align-items:center;gap:1.5rem;margin-bottom:1rem;overflow-x:hidden;width:100%;";
        col.className="col-md-4 mx-auto";
        const div=document.createElement("div");
        div.className="imgCard-container";
        div.id="imgCard-container";
        div.style.cssText="margin:auto;display:flex;justify-content:center;align-items:center;gap:1rem;flex-wrap:wrap;";
        const img=document.createElement("img");
        img.src=adminimg.img;
        img.alt=adminimg.imgKey;
        img.style.cssText="float:left;margin:auto;width:175px;aspect-ratio: 1 / 1;border-radius:50%;box-shadow:1px 1px 12px 1px black;";
        div.appendChild(img);
        const ul=document.createElement("ul");
        ul.id="image-details";
        ul.style.cssText="padding-inline:1rem;overflow-x:hidden;"
        for (const [key,value] of Object.entries(adminimg)){
            if(key !=="img"){
                
                if(key==="del" && Boolean(value)===true){
                    const li=document.createElement("li");
                    li.style.color="red";
                    li.style.fontWeight="bold";
                    li.style.textDecoration="underline";
                    li.textContent=`${key}:${value}`;
                    ul.appendChild(li);
                }
                if(key==="count" && !isNaN(value as number) && (value as number)>1){
                    const li=document.createElement("li");
                    li.style.color="blue";
                    li.style.fontWeight="bold";
                    li.style.textDecoration="underline";
                    li.textContent=`${key}:${value}`;
                    ul.appendChild(li);
                }
                if(key==="imgKey" && value && typeof(value)==="string"){
                    const li=document.createElement("li");
                    const ul1=document.createElement("ul");
                    li.appendChild(ul1);
                    const arrImgKey=this.arrImgkey({value:value,num:6})
                    const li1=document.createElement("li");
                    const div=document.createElement("div");
                    div.style.cssText="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;text-wrap:wrap;"
                    arrImgKey.map((str,index)=>{
                        if(str){
                            const span=document.createElement("span");
                            span.textContent=str;
                            div.appendChild(span);
                        }
                    });
                    const text=new Text(key);
                    li1.appendChild(text);
                    li1.appendChild(div);
                    ul1.appendChild(li1);
                    ul.appendChild(li);

                }
                if(key==="date"){
                    const li1=document.createElement("li");
                    const date=(value as Date);
                    li1.style.cssText="text-wrap:wrap;display:flex;flex-wrap:wrap;"
                    li1.innerHTML=`<span style="color:blue;">key: ${key}</span><span>date:  ${date}</span>`;
                    ul.appendChild(li1);
                    

                }
            }
        }
        div.appendChild(ul);
        col.appendChild(div);
        row.appendChild(col);
        Misc.matchMedia({parent:div,maxWidth:400,cssStyle:{flexDirection:"column",alignItems:"center",justifyContent:"center"}})
        Misc.matchMedia({parent:ul,maxWidth:400,cssStyle:{paddingInline:"2rem"}})
        const {button}=Misc.simpleButton({anchor:col,type:"button",bg:this.btnColor,color:"white",time:300,text:"delete"});
        button.onclick=(e:MouseEvent)=>{
            if(e){
                button.disabled=true;
                setTimeout(()=>{button.disabled=false;},1000);
                this._service.adminImageDel(adminimg.id).then(async(res)=>{
                    if(res){
                        Misc.message({parent:row,msg:"deleted",type_:"success",time:400});
                        const getRow=document.querySelector("div#row-images") as HTMLElement;
                        if(getRow){
                            Header.cleanUp(getRow);
                            this._adminimgs.map((adm,index)=>{
                                if(adm.id===adminimg.id){
                                    this._adminimgs.splice(index,1);
                                }
                            });
                            this._adminimgs.toSorted((a,b)=>{if(a.id<b.id) return -1;return 1}).map(adminimage=>{
                                if(adminimage){
                                    this.imgCard(row,adminimage);
                                }
                            });
                        }
                    }
                });
            }
        };
    };



    arrImgkey({value,num}:{value:string,num:number}):string[]{
        const arr=value.split("");
        let count=0
       
        const arr2 = arr.map((lt,index)=>{
            if(index%num===0){
                const word=arr.slice(count,index).join("");
                count=index;
                return word;
            }
            
        }).filter(kv=>kv!==undefined);
        return arr2
    };

    noFiles(parent:HTMLElement){
        Header.cleanUpByID(parent,"noFiles");
        parent.style.position="relative;";
        const time=1200;
        const cont=document.createElement("div");
        cont.id="nofiles"
        cont.style.cssText="display:grid;place-items:center;margin:auto;height:10vh;width:100%;box-shadow:1px 1px 12px 1px lightblue;border-radius:12px;";
        const para=document.createElement("p");
        para.textContent=this.nofilePara;
        para.className="text-primary text-center";
        para.style.cssText="font-size:150%;"
        cont.appendChild(para);
        parent.appendChild(cont);
        Misc.growOut({anchor:cont,time,scale:0,opacity:0});
        setTimeout(()=>{
            parent.removeChild(cont);
        },time-20);
    };


    
    async getUsers(item:{parent:HTMLElement,css:string,users:userType[],adminUser:userType}){
        const {parent,css,users,adminUser}=item;
        const display=window.innerWidth <400 ? "block":"flex";
        Header.cleanUpByID(parent,"getUsers-row");
        const containerRow=document.createElement("div");
        containerRow.id="getUsers-row";
        containerRow.style.cssText=`display:${display};flex-direction:row;flex-wrap:wrap;width:100%;position:relative;justify-content:space-around;align-items:center;`;
        parent.appendChild(containerRow);
            
           users.toSorted((a,b)=>{if(a.id<b.id) return -1;return 1}).map((user,index)=>{
               if(user){
                this.userCard({parent,containerRow,user,css,index,adminUser});
               }
           });
        
           Misc.matchMedia({parent:containerRow,maxWidth:400,cssStyle:{display:"block",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",gap:"1.5rem"}});
       
    };


    userCard(item:{parent:HTMLElement,containerRow:HTMLElement,user:userType,css:string,index:number,adminUser:userType}){
        const { parent,containerRow,user,index,adminUser}=item;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;place-items:center;gap:0px;"
        const nameStyle="color:red;margin-right:1rem;font-size:110%;font-weight:bold;"
        const card=document.createElement("div");
        card.className="card";
        card.id=`card-${index}`;
        card.style.cssText=css_col;
        card.style.borderRadius="15px";
        card.style.backgroundColor="white";
        card.style.position="relative";
        card.style.alignItems="stretch";
        card.style.flex="1 1 25%";
        const img=document.createElement("img");
        img.style.cssText="width:130px;aspect-ratio: 1/1;box-shadow:1px 1px 12px 1px;border-radius:50%;align-self:center;";
        if(user.imgKey){
            this._service.getSimpleImg(user.imgKey).then(async(res)=>{
                if(res){
                    img.src=res.img;
                    img.alt=res.Key;
                }
            });
        }else{

            img.src=user.image? user.image : this.logo;
            img.alt="www.ablogroom.com";
        }
        img.className="card-img-top";
        img.alt=user.name ? user.name : " blogger";
        card.appendChild(img);
        const cardBody=document.createElement("div");
        cardBody.className="card-body";
        cardBody.style.cssText="border-radius:inherit;box-shadow:1px 1px 12px 1px lightblue;padding:1rem;";
        const h5=document.createElement("h5");
        h5.innerHTML=`<span style="${nameStyle}">name:</span>${user.name ? user.name : "blogger"}`;
        h5.className="card-title text-primary";
        const desc=document.createElement("p");
        const email=document.createElement("div");
        email.className="card-text";
        email.innerHTML=`<span style="${nameStyle}">email:</span>${user.email}`;
        desc.className="card-text";
        desc.style.cssText="padding-inline:1.5rem;margin-block:1.5rem;";
        desc.innerHTML=`Bio:${user.bio ? user.bio : " no description"}`
        cardBody.appendChild(h5);
        cardBody.appendChild(email);
        cardBody.appendChild(desc);
        if(user.blogs){
            user.blogs.map((blog,)=>{
                const blogCont=document.createElement("div");
                blogCont.id=`${blog.id}-blog`;
                const name=document.createElement("h6");
                name.innerHTML=`<span style="${nameStyle}"> Blog name:</span>${blog.name ? blog.name : " no name blog"}`;
                blogCont.appendChild(name);
                cardBody.appendChild(blogCont);
            });
        }
        card.appendChild(cardBody);
        containerRow.appendChild(card);
        // console.log("containerRow",containerRow)//works
        // console.log("card")//works
        // console.log("parent",parent)// works
        const {button:deleteUser}=Misc.simpleButton({anchor:card,bg:this.btnColor,color:"white",text:"delete",time:400,type:"button"});
        deleteUser.onclick=(e:MouseEvent)=>{
            if(e){
                const item:delteUserType={adminemail:adminUser.email,adminId:adminUser.id,delete_id:user.id};
                this._service.adminDelUser(item).then(async(res)=>{
                    if(res?.id){
                        this.deleteUser({parent,adminUser,item});
                    }
                });
            }
        };
        Misc.matchMedia({parent:card,maxWidth:800,cssStyle:{flex:"1 1 50%"}});
        Misc.matchMedia({parent:card,maxWidth:400,cssStyle:{flex:"1 1 100%"}});
        Misc.matchMedia({parent:containerRow,maxWidth:400,cssStyle:{flexDirection:"column"}});

    };



    deleteUser(items:{parent:HTMLElement,adminUser:userType,item:delteUserType}){
        const {parent,adminUser,item}=items;
        //it deletes user and then redoes the user row
        const css_col="margin-inline:auto;display:flex;flex-direction:column;place-items:center;gap:0px;"
        this._service.adminDelUser(item).then(async(res)=>{
            if(res?.id){
                this._users.map((user_,ind)=>{
                    if(user_ && (user_.id !==item.delete_id)){
                        this._users.splice(ind,1)
                        this.users=this._users;
                    }
                });
                const getRow=parent.querySelector("div#getUsers-row") as HTMLElement;
                if(getRow){
                    Header.cleanUp(getRow);
                    this.users.map((user_,index_)=>{
                        if(user_){
                            this.userCard({parent,containerRow:getRow,user:user_,css:css_col,index:index_,adminUser});
                        }
                    });
                }
            }
        });
    };


    searchUser(item:{viewport:HTMLElement,users:userType[],adminUser:userType}){
        const {viewport,users,adminUser}=item;
        Header.cleanUpByID(viewport,"userSearch-container");
        const container=document.createElement("div");
        const text=document.createElement("h6");
        text.className="text-center text-underline text-primary my-2";
        text.textContent="search user";
        container.id="userSearch-container";
        container.style.cssText="width:100%;box-shadow:1px 1px 12px 1px black;padding:1.rem;margin-inline:auto;margin-block:2rem;display:flex;flex-direction:row;align-items:center;padding:1rem;background-color:#dedeec;flex-wrap:wrap";
        container.style.flexWrap="wrap";
        const searchUser=document.createElement("div");
        searchUser.id="searchUser";
        searchUser.style.cssText="box-shadow:1px 1px 12px 1px black;padding:1.rem;margin-inline:auto;margin-block:2rem;display:flex;flex-direction:column;align-items:center;flex:1 1 33%";
        const results=document.createElement("div");
        results.id="User-results";
        results.style.cssText="box-shadow:1px 1px 12px 1px black;padding:1.rem;margin-inline:auto;margin-block:2rem;display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;flex:1 1 67%;height:40vh; overflow-y:scroll;";
        const resultText=document.createElement("h6");
        resultText.className="text-center text-underline text-primary my-2";
        resultText.textContent="Found - items";
        const {input,label,formGrp}=Nav.inputComponent(searchUser);
        input.type="text";
        input.name="search-user";
        input.id="search-user";
        formGrp.style.cssText="display:flex;flex-direction:row;justify-content:center;gap:1rem; align-items:center;";
        label.setAttribute("for",input.id);
        label.textContent="search keys";
        input.placeholder="search";
        searchUser.appendChild(text);
        container.appendChild(searchUser);
        results.appendChild(resultText);
        container.appendChild(results);
        viewport.appendChild(container);
        input.oninput=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value.toLowerCase();
                const userOnes=users.filter(user=>(user.name?.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)));
                if(userOnes && value){
                    this.getSearchUser({viewport,results,users:userOnes,adminUser});
                    
                }else{
                    Header.cleanUpByID(viewport,"getSearchUser-results-row");
                }
            };
        };
        

    };



    getSearchUser(item:{viewport:HTMLElement,results:HTMLElement,users:userType[],adminUser:userType}){
        const {viewport,results,users,adminUser}=item;
        Header.cleanUpByID(viewport,"getSearchUser-results-row");
        const css_row="margin-inline:auto;display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;";
        const row=document.createElement("div");
        row.id="getSearchUser-results-row";
        row.style.cssText=css_row ;
        results.appendChild(row);
        if(users && users.length>0){
            users.map((user,index)=>{
                if(user){
                    this.searchUserItem({results,row,user,index,adminUser})
                    
                }
            });
        }
    };



    searchUserItem(item:{results:HTMLElement,row:HTMLElement,user:userType,index:number,adminUser:userType}){
        const {results,row,user,index,adminUser}=item;
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const css="margin-inline;padding-inline:1rem;padding-block:1.5rem;";
        const css_row="margin-inline:auto;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;";
        const css_col="margin-inline:auto;display:flex;flex-direction:column;flex-wrap:wrap;justify-content:center;align-items:center;";
        const col=document.createElement("div");
        col.id="row-col-" + index;
        col.style.cssText=css_col + "flex:1 0 25%;padding:1rem;background-color:white;";
        col.style.flex=less900 ? (less400 ? "1 0 100%" : "1 0 50%"): "1 0 25%";
        const topCont=document.createElement("div");
        topCont.id="col-topCont";
        topCont.style.cssText=css_col + "padding:0.25rem;box-shadow:1px 1px 12px 1px black;";
        const topTitle=document.createElement("h6");
        topTitle.className="text-primary text-center mb-2 text-underline";
        topTitle.textContent="user";
        const name=document.createElement("p");
        name.id="results-name";
        name.style.cssText=css;
        name.textContent=user.name ? user.name :"no user name";
        const email=document.createElement("p");
        email.id="results-name";
        email.style.cssText=css;
        email.textContent=user.email ? user.email :"no user name";
        topCont.appendChild(name);
        topCont.appendChild(email);
        col.appendChild(topTitle);
        col.appendChild(topCont);
        const blogCont=document.createElement("div");
        blogCont.id="col-blogCont";
        blogCont.style.cssText=css_row + "padding:0.25rem;box-shadow:1px 1px 12px 1px black;";
        const blogContTitle=document.createElement("h6");
        blogContTitle.id="blogCont-blogContTitle";
        blogContTitle.className="text-primary text-center text-underline mb-2";
        blogContTitle.textContent="blog";
        col.appendChild(blogContTitle);
        const postCont=document.createElement("div");
        postCont.id="col-postCont";
        postCont.style.cssText=css_row + "padding:0.25rem;box-shadow:1px 1px 12px 1px black;";
        const postContTitle=document.createElement("h6");
        postContTitle.id="blogCont-blogContTitle";
        postContTitle.className="text-primary text-center text-underline mb-2";
        postContTitle.textContent="post";
        if(user.blogs && user.blogs.length>0){
            user.blogs.map((blog,index)=>{
                if(blog){
                    const blogItem=document.createElement("div");
                    blogItem.id="blogCont-blogItem"+index;
                    blogItem.style.cssText=css_col + "padding:3px;flex:1 0 50%;";
                    const blogname=document.createElement("p");
                    blogname.id="blogCont-blogname";
                    blogname.textContent=`name: ${blog.name ? blog.name : " no blog name"}`;
                    const blogtitle=document.createElement("p");
                    blogtitle.id="blogCont-blogtitle";
                    blogtitle.style.cssText="text-wrap:pretty;"
                    blogtitle.textContent=`name: ${blog.name ? blog.name : " no blog name"}`;
                    blogItem.appendChild(blogname);
                    blogItem.appendChild(blogtitle);
                    blogCont.appendChild(blogItem);
                }
            });
            col.appendChild(blogCont);
        }
        if( user.posts && user.posts.length>0){
            user.posts.map((post,index)=>{
                if(post){
                    const postItem=document.createElement("div");
                    postItem.id="postCont-blogItem"+index;
                    postItem.style.cssText=css_col + "padding:3px;flex:1 0 50%;";
                    const posttitle=document.createElement("p");
                    posttitle.id="postCont-posttitle";
                    posttitle.textContent=`name: ${post.title ? post.title : " no post title"}`;
                    const postLikes=document.createElement("p");
                    postLikes.id="postCont-postlikes";
                    postLikes.style.cssText="text-wrap:pretty;"
                    postLikes.textContent=`likes#: ${post.likes ? String(post.likes ): " no post likes"}`;
                    postItem.appendChild(posttitle);
                    postItem.appendChild(postLikes);
                    postCont.appendChild(postItem);
                    
                }
            });
            col.appendChild(postContTitle);
            col.appendChild(postCont);
            const {button:delUser}=Misc.simpleButton({anchor:col,bg:this.btnColor,text:"delete",color:"white",type:"button",time:400});
            delUser.onclick=(e:MouseEvent)=>{
                if(e){
                    const item:delteUserType={adminemail:adminUser.email,adminId:adminUser.id,delete_id:user.id}
                    this.deleteUser({parent:results,adminUser,item});
                }
            };
            row.appendChild(col);
        }
    }
    searchImg(parent:HTMLElement,adminimgs:adminImageType[]){
        Header.cleanUpByID(parent,"searchImg-container");
        const container=document.createElement("div");
        const text=document.createElement("h6");
        text.className="text-center text-underline text-primary my-2";
        text.textContent="search keys";
        container.id="searchImg-container";
        container.style.cssText="width:100%;box-shadow:1px 1px 12px 1px black;padding:1.rem;margin-inline:auto;margin-block:2rem;display:flex;flex-direction:row;align-items:center;padding:1rem;";
        const searchCont=document.createElement("div");
        searchCont.id="searchCont";
        searchCont.style.cssText="box-shadow:1px 1px 12px 1px black;padding:1.rem;margin-inline:auto;margin-block:2rem;display:flex;flex-direction:column;align-items:center;flex:1 1 33%";
        const results=document.createElement("div");
        results.id="searchImg-results";
        results.style.cssText="box-shadow:1px 1px 12px 1px black;padding:1.rem;margin-inline:auto;margin-block:2rem;display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;flex:1 1 67%;height:40vh; overflow-y:scroll;";
        const resultText=document.createElement("h6");
        resultText.className="text-center text-underline text-primary my-2";
        resultText.textContent="Found - items";
        const {input,label,formGrp}=Nav.inputComponent(searchCont);
        const {button:clear}=Misc.simpleButton({anchor:searchCont,bg:"black",color:"white",text:"clear",time:400,type:"button"});
        input.type="text";
        input.name="search";
        input.id="search";
        formGrp.style.cssText="display:flex;flex-direction:row;justify-content:center;gap:1rem; align-items:center;";
        label.setAttribute("for",input.id);
        label.textContent="search keys";
        input.placeholder="search";
        searchCont.appendChild(text);
        container.appendChild(searchCont);
        results.appendChild(resultText);
        container.appendChild(results);
        parent.appendChild(container);
        Misc.matchMedia({parent:searchCont,maxWidth:420,cssStyle:{flex:"1 1 100%"}});
        Misc.matchMedia({parent:results,maxWidth:420,cssStyle:{flex:"1 1 100%"}});
        Misc.matchMedia({parent:container,maxWidth:420,cssStyle:{flexDirection:"column"}});
        let adminImages:adminImageType[]|[];
        input.oninput=(e:Event)=>{
            if(e){
                Header.cleanUp(results);
                const value=(e.currentTarget as HTMLInputElement).value as string;
                adminImages=adminimgs.filter(adimg=>(adimg.imgKey.includes(value)));
                const row=document.createElement("div");
                row.className="row";
                results.appendChild(row);
                row.id="div-search";
                row.style.cssText="margin-inline:auto;padding:1rem;width:100%;background-color:white;border-radius:12px;display:flex;gap:1rem;flex-wrap:wrap;";
                adminImages.map((admin_,)=>{
                    if(admin_){
                        const col=document.createElement("div");

                        col.style.cssText="display:flex;flex-direction:column;padding:0.5rem;border:1px solid blue;border-radius:12px;width:fit-content;padding-inline:1rem;"
                        const imgCss="float:left;margin:auto;width:125px;border-radius:50%;border-radius:50%;box-shadow:1px 1px 12px 1px black;margin-right:1rem;";
                       const img=document.createElement("img");
                       img.style.cssText=imgCss;
                       img.src=admin_.img;
                        const ul=document.createElement("ul");
                        ul.id=`span-search-folder`;
                        ul.style.cssText="display:flex;justify-content:flex-start;align-items:center;flex-wrap:wrap;";
                        const retKeyArr=this.arrImgkey({value:admin_.imgKey,num:6});
                        const newArrKey=retKeyArr.map(word=>{
                            return `<span>${word}</span>`
                        });
                        ul.innerHTML=`<li><span style="color:red;">folder: </span>
                        ${newArrKey}
                        </li><li><span style="color:red;">file: </span>${admin_.imgKey.split("/")[1]}</li>`;
                        col.appendChild(img);
                        col.appendChild(ul);
                        row.appendChild(col);
                       
                    }
                });
            }
        };
        clear.onclick=(e:MouseEvent)=>{
            if(e){
                (input as HTMLInputElement).value="";
                Header.cleanUp(results);
            }
        };
    };



    getPosts(item:{parent:HTMLElement,posts:postType[]}){
        const {parent,posts}=item;
        Header.cleanUpByID(parent,"getPosts-container");
        const css_col="margin-inline:auto;display:flex;flex-direction:column;place-items:center;gap:0px;";
        const css_row="margin-inline:auto;display:flex;place-items:center;gap:10px;flex-wrap:wrap;";
        const container=document.createElement("div");
        container.id="getPosts-container";
        container.style.cssText=css_col;
        const row=document.createElement("div");
        row.id="container-row";
        row.style.cssText=css_row;
        container.appendChild(row);
        posts.map(post=>{
            if(post){
                this.postcard({parent,row,post});

            }
        });
        parent.appendChild(container);

    };
    getBlogs(item:{parent:HTMLElement,blogs:blogType[]}){
        const {parent,blogs}=item;
        Header.cleanUpByID(parent,"getBlogs-container");
        const css_col="margin-inline:auto;display:flex;flex-direction:column;place-items:center;gap:0px;";
        const css_row="margin-inline:auto;display:flex;place-items:center;gap:10px;flex-wrap:wrap;";
        const container=document.createElement("div");
        container.id="getBlogs-container";
        container.style.cssText=css_col;
        const row=document.createElement("div");
        row.id="getBlogs-container-row";
        row.style.cssText=css_row;
        container.appendChild(row);
        blogs.map(blog=>{
            if(blog){
                this.blogcard({parent,row,blog});

            }
        });
        parent.appendChild(container);

    };
    blogcard(item:{parent:HTMLElement,row:HTMLElement,blog:blogType}){
        const {parent,row,blog}=item;
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;place-items:center;padding-inline:0.25rem;padding-block:1rem;";
        const css_row="margin-inline:auto;display:flex;place-items:center;padding-inline:0.25rem;flex-wrap:wrap;";
        const col=document.createElement("div");
        col.id="row-col"+ `${blog.id}`;
        col.style.cssText=css_col + "background-color:white;color:black;";
        col.style.width=less900 ? (less400 ? "100%":"48%"): "33%";
        const user=this.users.find(user=>(user.id===blog.user_id));
        const ul=document.createElement("ul");
        ul.id="col"+ `${blog.id}-ul`;
        this.postUser({ul,user});
        const ID=document.createElement("span");
        ID.textContent=String(blog.id);
        const title=document.createElement("h6");
        title.style.cssText="margin-inline:auto;text-align:center;";
        title.textContent=`title:${blog.title}`;
        const content=document.createElement("p");
        content.style.cssText="margin-inline:auto;text-wrap:pretty;";
        content.textContent=`desc: ${blog.desc ? blog.desc : " no desc"}`;
        const rating=document.createElement("small");
        rating.textContent=`ratings:${String(blog.rating)}`;
        const messages=document.createElement("small");
        messages.textContent=`msgs#:${String(blog.messages ? blog.messages.length:0)}`;
        const contLikes=document.createElement("div");
        contLikes.style.cssText=css_row;
        const pageCounts=document.createElement("small");
        pageCounts.textContent=`pageCounts:${blog.pageCounts ? blog.pageCounts[0].count : 0}`;
        contLikes.appendChild(messages);
        contLikes.appendChild(pageCounts);
        [ID,title,content,contLikes,rating].map((html,index)=>{
            const li=document.createElement("li");
            li.id="ul-li-"+String(index);
            li.style.listStyle="circular";
            li.appendChild(html);
            ul.appendChild(li);
        });
       
        col.appendChild(ul);
        this.delBlog({parent,col,blog});
        row.appendChild(col);
    };



    postcard(item:{parent:HTMLElement,row:HTMLElement,post:postType}){
        const {parent,row,post}=item;
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;padding-inline:0.25rem;padding-block:1rem;height:40vh;overflow-y:scroll;";
        const col=document.createElement("div");
        col.id="row-col"+ `${post.id}`;
        col.style.cssText=css_col + "background-color:white;color:black;";
        col.style.width=less900 ? (less400 ? "100%":"48%"):"33%";
        const user=this.users.find(user=>(user.id===post.userId));
        const ul=document.createElement("ul");
        ul.id="col"+ `${post.id}-ul`;
        this.postUser({ul,user});
        const ID=document.createElement("span");
        ID.textContent=String(post.id);
        const title=document.createElement("h6");
        title.style.cssText="margin-inline:auto;text-align:center;";
        title.textContent=`title:${post.title}`;
        const content=document.createElement("p");
        content.style.cssText="margin-inline:auto;text-wrap:pretty;";
        content.textContent=`desc: ${post.content ? post.content : " no desc"}`;
        const likes=document.createElement("small");
        likes.textContent=`likes:${String(post.likes)}`
        const contLikes=document.createElement("div");
        const link=document.createElement("small");
        link.textContent=`link:${post.link ? post.link : " no link"}`;
        [ID,title,content,likes,contLikes,link].map((html,index)=>{
            const li=document.createElement("li");
            li.id="ul-li-"+String(index);
            li.style.listStyle="circular";
            li.appendChild(html);
            ul.appendChild(li);
        });
       
        col.appendChild(ul);
        this.delPost({parent,row,col,post});
        row.appendChild(col);
    };


    postUser(item:{ul:HTMLUListElement,user:userType|undefined}){
        const {ul,user}=item;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;place-items:center;padding-inline:0.25rem;";
        if(user){

            const cont=document.createElement("div");
            cont.id="ul-user-cont";
            cont.style.cssText=css_col;
            const id=document.createElement("h6");
            id.textContent=user.id;
            const name=document.createElement("li");
            name.textContent=user.name ? user.name : " no name";
            const email=document.createElement("li");
            email.textContent=user.email;
            [id,name,email].map((item,index)=>{
                item.id=`user-${item.nodeName}-${index}`;
                cont.appendChild(item);
                ul.appendChild(cont);
            });
        }

    };


    delBlog(item:{parent:HTMLElement,col:HTMLElement,blog:blogType}){
        const {parent,col,blog}=item;
        col.style.position="relative";
        const xDiv=document.createElement("div");
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-10px,10px);max-width:20px;width:100%;background-color:black;color:white;border-radius:50%;padding:2px;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"16px",color:"white"}});
        col.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
                this._service.deleteBlog(blog).then(async(res)=>{
                    if(res){
                        
                        this._blogs.map((blog_,index)=>{
                            if(blog_.id===blog.id){
                                this._blogs.splice(index,1);
                                this.getBlogs({parent:parent,blogs:this._blogs});
                            }
                        });
                    }
                });
            }
        };

    };



    delPost(item:{parent:HTMLElement,row:HTMLElement,col:HTMLElement,post:postType}){
        const {col,post}=item;
        col.style.position="relative";
        const xDiv=document.createElement("div");
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-10px,10px);max-width:20px;width:100%;background-color:black;color:white;border-radius:50%;padding:2px;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"16px",color:"white"}});
        col.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
                this._service.delpost({id:post.id}).then(async(res)=>{
                    if(res){
                        
                        this.posts.map((post_,index)=>{
                            if(post_.id===res.id){
                                this._posts.splice(index,1);
                                const viewport=document.querySelector("div#viewport") as HTMLElement;
                                if(!viewport) return;
                                this.getPosts({parent:viewport,posts:this.posts});
                            }
                        });
                    }
                });
            }
        };

    };



    getMessages(parent:HTMLElement,user:userType):void{
        if(!( user && user.admin)) return
        Header.cleanUpByID(parent,"messages-container")
        const container=document.createElement("div");
        container.id="messages-container";
        container.style.cssText="width:100%;margin-inline:auto;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:1rem;";
        const row=document.createElement("div");
        row.id="message-container-row";
        row.className="row";
        row.style.cssText="justify-content:center;align-items:center; gap:1.25rem";
        container.appendChild(row);
        parent.appendChild(container);
        this._service.getAdminMessages(user).then(async(res)=>{
            if(res && res.length>0){
                this.messages=res;
                this.messages.map(async(msg,index)=>{
                    if(msg){
                        const col=document.createElement("div");
                        col.className="col-md-3";
                        col.id="msg-col-" + String(index)
                        col.style.cssText="margin:auto;display:flex;justify-content:center;align-items:center;gap:1rem;box-shadow:1px 1px 12px 1px black;border-radius:12px;flex-direction:column;padding:1rem;background-color:white;padding:1rem;border-radius:12px;";
                        this.singleMsg({parent,row:row,msg:msg,col:col,index:index});
                        this.deleteMsg({parent,row,col,msg,msgs:this.messages});
                    }
                });
                
            }else{
                this.noFiles(parent);
            }
        });
    };



    singleMsg(item:{parent:HTMLElement,row:HTMLElement,msg:messageType,col:HTMLElement,index:number}):void{
        const {parent,row,msg,index,col}=item;
        let j=0;
        const ul=document.createElement("ul");
        ul.style.cssText="display:flex;flex-wrap:wrap;"
        for( const [key,value] of Object.entries(msg)){
            const nValue=typeof(value)==="string" ? Admin.wrapText(value as string,20): value
            j+=1;
            const li=document.createElement("li");
            li.style.listStyle="none";
            li.id="li" + String(index) + "-" + String(j);
            if(typeof(value)!=="boolean"){
                li.innerHTML=`<span style="color:blue;">${key} :</span><span style="color:green;text-wrap:pretty;display:flex;flex-wrap:wrap;">${nValue}</span>`;
            }else{
                const nValue=Boolean(value) || "false";
                li.innerHTML=`<span style="color:green;">${key} :</span><span style="color:red;">${nValue}</span>`;
            }
            ul.appendChild(li);
        }
        col.appendChild(ul);
        row.appendChild(col);
        const {button:reply}=Misc.simpleButton({anchor:col,text:"reply",bg:this.btnColor,color:"white",time:400,type:"button"});
        reply.onclick=(e:MouseEvent)=>{
            if(e){
                const user=this._user.user;
                this.replyClient({parent,row,col:col,msg:msg,user})
            }
        };
        Misc.matchMedia({parent:col,maxWidth:400,cssStyle:{flex:"1 1 auto"}});
        Misc.matchMedia({parent:row,maxWidth:400,cssStyle:{flexDirection:"column"}});
    };



    deleteMsg(item:{parent:HTMLElement,row:HTMLElement,col:HTMLElement,msg:messageType,msgs:messageType[]}):void{
        const {parent,row,col,msg,msgs}=item;
        col.style.position="relative";
        const xDiv=document.createElement("div");
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-8px,-8px);border-radius:50%;width:20px;height:20px;background-color:black;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"red",fontSize:"18px"}})
        col.appendChild(xDiv);
        xDiv.onclick=async(e:MouseEvent)=>{
            if(e){
                await this._service.adminDelMsg(msg.id as number).then(async(res)=>{
                    if(res){
                        Misc.message({parent,msg:`deleted: ${res.id}`,type_:"success",time:1000});
                        Header.cleanUp(row);
                        msgs.map((ms,index)=>{
                            if(ms.id===msg.id){
                                this.messages.splice(index,1)
                            }
                            
                        });
                        this.messages.map((_msg,index)=>{
                            if(_msg){
                                const col_=document.createElement("div");
                                col_.className="col-md-3";
                                col_.id="msg-col-" + String(index)
                                col_.style.cssText="margin:auto;display:flex;justify-content:center;align-items:center;gap:1rem;box-shadow:1px 1px 12px 1px black;border-radius:12px;flex:1 1 33%";
                               this.singleMsg({parent,row:row,msg:msg,col:col_,index:index});
                               this.deleteMsg({parent,row,col:col_,msg,msgs:this.messages});
                            }
                        });
                    }
                });
            }
        };

    };




    getPagecounts(parent:HTMLElement,user_id:string){
        Header.cleanUpByID(parent,"pg-counts-main");
        parent.style.position="relative";
        const container=document.createElement("div");
        container.id="pg-counts-main";
        container.style.cssText="margin-inline:auto;display:flex;flex-direction:column;align-items:center; width:100%;";
        const row=document.createElement("div");
        row.className="row";
        row.id="row-pagecounts";
        row.style.cssText="justify-content:center;align-items:center;gap:1rem;";
        this._service.getAdminPageCounts(user_id).then(async(res)=>{
            if(res && res.length>0){
                this.pagecounts=res;
                const sortPageCounts=this.pagecounts.toSorted((a,b)=>{if(a.count > b.count) return -1;else return 1})
                    .toSorted((a,b)=>{if(!b.blog_id) return 1;else return -1})
                    .toSorted((a,b)=>{if(!b.post_id) return 1;else return -1})
                        sortPageCounts.map((pg,index)=>{
                    if(pg){
                        this.pageCountPage(parent,user_id,row,pg,index);
                    }
                });
                container.appendChild(row);
                parent.appendChild(container);
            }else{
                this.noFiles(parent);
            }
        });
    };



    pageCountPage(parent:HTMLElement,user_id:string,row:HTMLElement,pg:pageCountType,index:number){
        Header.cleanUpByID(parent,`col-pg-count-${index}`);
        const col=document.createElement("div");
        col.id=`col-pg-count-${index}`;
        col.style.cssText="margin:auto;display:flex;justify-content:center;align-items:flex-start;flex-direction:column;padding:1rem;box-shadow:1px 1px 12px 1px;border-radius:12px;position:relative;background-color:white;border-radius:12px;";
        col.className="col-md-3";
        const card=document.createElement("div");
        card.id="col-pg-count-card";
        card.style.cssText="margin-left:1rem;display:flex;flex-wrap:wrap;";
        for( const [key,value] of Object.entries(pg)){
            if(key === "blog_id" || key==="post_id" ){
                const title=document.createElement("h6");
                title.className="text-primary text-center";
                if(key==="blog_id" && value){
                    title.textContent="Blog";
                }else if(value){
                    title.textContent="Post";
                }
                col.appendChild(title);
            }
            const span=document.createElement("span");
            span.style.cssText="margin-inline:auto;padding:1rem;display:flex;flex-wrap:wrap;color:green;";
            span.innerHTML=`<span>${key}:</span><span style=color:blue;>${value}</span>`
          
            card.appendChild(span);
        }
        col.appendChild(card);
        row.appendChild(col);
        //DELETE
        const xDiv=document.createElement("div");
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-10px,10px);width:22px;height:22px;border-radius:50%;background:black;display:flex;place-items:center;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"20px",color:"white",borderRadius:"18px"}});
        col.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
                this._service.delPageCount(pg.id as number).then(async(res)=>{
                    if(res && res.id){
                        this.pagecounts.map((pg_,ind)=>{
                            if(pg_ && pg_.id===pg.id){
                                this.pagecounts.splice(ind,1);
                            }
                        });
                        this.pagecounts.map((pg_,ind)=>{
                            if(pg_){
                                this.pageCountPage(parent,user_id,row,pg_,ind);

                            }
                        });
                    }
                });
            }
        };
        //DELETE
    };




    replyClient(items:{parent:HTMLElement,row:HTMLElement,col:HTMLElement,msg:messageType,user:userType}):void{
        const {parent,row,col,msg,user}=items;
        Header.cleanUpByID(col,"reply-client");
        const popup=document.createElement("div");
        popup.id="reply-client";
        popup.style.cssText="margin-inline:auto;position:absolute;inset:-120% 0% 120% 0%;backdrop-filter:blur(10px);box-shadow:1px 1px 12px 1px black;border-radius:12px;padding:1rem;display:flex;justify-content:center;align-items:center;"
        const form=document.createElement("form");
        form.id="reply-client-form";
        form.style.cssText="margin-inline:auto;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:1.25rem;box-shadow:1px 1px 12px 1px black;background-color:white;border-radius:inherit;";
        const {textarea:reply,label,formGrp}=Nav.textareaComponent(form);
        label.textContent="Your comments to the client";
        reply.rows=4;
        reply.id="reply";
        reply.name="reply";
        reply.autocomplete="on";
        label.setAttribute("for",reply.id);
        reply.style.cssText="min-width:300px;border-radius:inherit;";
        reply.placeholder="Your comments";
        const {button:btn}=Misc.simpleButton({anchor:form,text:"submit",type:"submit",bg:this.btnColor,color:"white",time:400});
        btn.disabled=true;
        popup.appendChild(form);
        col.appendChild(popup);
        // delete
        const xDiv=document.createElement("div");
        xDiv.style.cssText="position:absolute;top:0%;right:0%;width:30px;aspect-ratio:1 / 1;border-radius:50%;background-color:black;display:flex;justify-content:center;align-items:center;transform:translate(10px,-12px);color:white;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"26px",margin:"auto",color:"white"}});
        form.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
                col.removeChild(popup);
            }
        };
        // delete
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        reply.onchange=(e:Event)=>{
            if(e){
                const area=(e.currentTarget as HTMLTextAreaElement).value;
                const len=area.length;
                const limit=30
                const mess=`length ${len} must be greater than ${limit}, because the email is well layout and has much info;`;
                this.lengthMsg({parent:formGrp,btn,mess,limit,len})
            }
        };
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const reply=formdata.get("reply") as string;
                if(reply && !btn.disabled){

                    const item:adminReplyMsgType={msg,user_id:user.id,reply,admin_id:this.adminUser.id}
                    //generate popup with textarea for reply to client in admin
                    await this._service.adminSendEmail(item).then(async(reply:{msg:string,success:boolean}|undefined)=>{
                        if(reply && reply.success){
                            Misc.message({parent:col,msg:reply.msg,type_:"success",time:1000});
                            // UPDATE MESSAGES
                            
                            const msg_={...msg,sent:true};
                            const remain=this.messages.filter(_ms=>(_ms.id !==msg.id));
                            this.messages=[...remain,msg_];
                            Header.cleanUp(row);
                            this.messages.map(async(msg,index)=>{
                                if(msg){
                                    const col=document.createElement("div");
                                    col.className="col-md-3";
                                    col.id="msg-col-" + String(index)
                                    col.style.cssText="margin:auto;display:flex;justify-content:center;align-items:center;gap:1rem;box-shadow:1px 1px 12px 1px black;border-radius:12px;flex-direction:column;padding:1rem;";
                                    this.singleMsg({parent,row:row,msg:msg,col:col,index:index});
                                    this.deleteMsg({parent,row,col,msg,msgs:this.messages});
                                }
                            });
                            // UPDATE MESSAGES
                            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                            setTimeout(()=>{
                                parent.removeChild(popup);
                            },390);
                        }
                    });
                }
            }
        };

    };



    
    lengthMsg(item:{parent:HTMLElement,btn:HTMLButtonElement,mess:string,len:number,limit:number}){
        const {parent,btn,mess,len,limit}=item;
        parent.style.position="relative";
        parent.style.zIndex="2";
        const text=document.createElement("p");
        text.id="message-limit-text";
        text.textContent=mess;
        text.style.cssText="margin-inline:auto;padding:1rem;border-radius:12px;box-shadow:1px 1px 12px 1px red;position:absolute;top:110%;z-index:200";
        if(len < limit){
            parent.appendChild(text);
            Misc.growIn({anchor:text,scale:0,opacity:0,time:300});
            btn.disabled=true;
        }else{
            Header.cleanUpByID(parent,"message-limit-text");
            btn.disabled=false;
        }

    };




    infoForm(item:{parent:HTMLElement,info:infoType2}){
        const {parent,info}=item;
        const css_col="margin:auto;display:flex;justify-content:center;flex-direction:column;gap:1rem;";
        const css_row="margin:auto;display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;";
        Header.cleanUpByID(parent,"infoForm-container");
        const container=document.createElement("div");
        container.id="infoForm-container";
        container.style.cssText=css_col;
        const form=document.createElement("form");
        form.id="container_form_info" + String(info.id);
        form.style.cssText=css_col;
        const persContainer=document.createElement("div");
        persContainer.style.cssText=css_row;
        const subTitle=document.createElement("h6");
        subTitle.className="text-center text-light my-2 text-transform-uppercase";
        subTitle.textContent="links";
        const arrContainer=document.createElement("div");
        arrContainer.id="form-arrContainer";
        arrContainer.style.cssText=css_row + "margin-block:1.5rem;";
        let index=0;
        for(const [key,value] of Object.entries(info)){
            if(key !=="id"){
                if(key !=="siteArray"){
    
                    const {input:nInput,label:nLabel}=Nav.inputComponent(persContainer);
                    nLabel.classList.remove("text-primary");
                    nLabel.classList.add("text-light");
                    nInput.id=`${key}-${index}`;
                    nInput.name=key;
                    nInput.value=value as string;
                    nLabel.textContent=key;
                    nLabel.setAttribute("for",nInput.id);
                }else if(key==="siteArray"){
                    const siteArray=value as {name:string,url:string}[];
                    siteArray.map((item,index)=>{
                        if(item){
                            const {input,label}=Nav.inputComponent(arrContainer);
                            label.classList.remove("text-primary");
                            label.classList.add("text-danger");
                            label.style.backgroundColor="white";
                            label.style.paddingInline="1.5rem";
                            input.id=item.name + "-"+ String(index);
                            input.name=item.name;
                            input.value=item.url;
                            label.textContent=`link:${item.name}`;
                            label.setAttribute("for",input.id);
                        }
                    });
                }
                index++;
            }
        };




        
        form.appendChild(persContainer);
        form.appendChild(subTitle);
        form.appendChild(arrContainer);
        const {button}=Misc.simpleButton({anchor:form,text:"submit",type:"submit",bg:this.btnColor,color:"white",time:400});
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const site_array:string[]=this.info.siteArray.map(key=>(key.name));
                let isChecked:boolean=true;
                if(formdata){
                    formdata.forEach((value,key)=>{
                        if(!(item && (typeof key ==="string") || (typeof key ==="number"))){
                            isChecked=false
                        }else{
                            const check=site_array.includes(key)
                            if(key !=="siteArray" && !check){
                                this.info[key]=value
                            }else if(key==="siteArray"){
                                const siteArray=value as unknown as {name:string,url:string}[];
                                siteArray.map(item=>{
                                    this.info.siteArray.push({name:item.name,url:item.url});
                                });
                            }
                        }
                    });
                }
                if(formdata && isChecked && this.info !== undefined){
                    button.disabled=true;
                  
                    //WRITE CODE TO SEND INFO TO api/info (node) for s3.send to new ablogroom
                    //https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/info.json @ NODE
                    // console.log("this.info",this.info);//works
                    this._service.admin_update_info({info:this.info,user_id:this._admin.id}).then(async(res)=>{
                        //api/admin/updateinfo
                        if(res && res.success){
                            this.info=res.info as infoType2;
                        }else{
                            console.log("failed")
                        }
                    }).catch((err)=>{const msg=getErrorMessage(err);Misc.message({parent,msg,type_:"error",time:1200});});
                }

            }
        };

        container.appendChild(form);
        parent.appendChild(container);

    }

    static wrapText(str:string,num:number):string{
        if(!str) return "";
        const arr=str.split("");
        const mSpan=document.createElement("span");
        arr.map((lt,index)=>{
            if(index===num){
                const span=document.createElement("span");
                span.textContent=str.slice(0,index);
                mSpan.appendChild(span);
            }else if(index===2*num){
                const span=document.createElement("span");
                span.textContent=str.slice(num+1,index);
                mSpan.appendChild(span);
            }else if(index===3*num){
                const span=document.createElement("span");
                span.textContent=str.slice(2*num+1,index);
                mSpan.appendChild(span);
            }
        });
        return mSpan.innerHTML;
    }

}
export default Admin;
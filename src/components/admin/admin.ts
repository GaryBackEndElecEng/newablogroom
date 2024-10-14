import Service from "../common/services";
import ModSelector from "../editor/modSelector";
import { adminImageType, adminReplyMsgType, delteUserType, messageType, pageCountType, userType } from "../editor/Types";
import User from "../user/userMain";
import Header from "../editor/header";
import Misc from "../common/misc";
import Nav from "../nav/headerNav";
import AuthService from "../common/auth";
import {FaCreate} from '@/components/common/ReactIcons';
import { FaCrosshairs } from "react-icons/fa";



class Admin{
    _adminimgs:adminImageType[];
    _pagecounts:pageCountType[]
    _users:userType[];
    _messages:messageType[];
    logo:string="./images/gb_logo.png";
    nofilePara:string=" no files";
    constructor(private _service:Service,private _modSelector:ModSelector,private _auth:AuthService,private _user:User){
        this._adminimgs=[] as adminImageType[];
        this._users=[] as userType[];
        this._messages=[];
    }
    //--------GETTER SETTERS------////
    get adminimgs(){
        return this._adminimgs
    }
    set adminimgs(adminimgs:adminImageType[]){
        this._adminimgs=adminimgs;
    }
    get adminUser(){
        return this._user.user
    }
    set adminuser(user:userType){
        this._user.user=user;
    }
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
    get admin(){
        return this._auth.admin
    }
    //--------GETTER SETTERS------////
    // :INJECTOR : id="admin-injection"
    async main(parent:HTMLElement){
        Header.cleanUpByID(parent,"mainContainer");
        const adminUser=this._user.user;
        const css="display:flex;flex-direction:column;align-items:center;margin:auto;padding-inline:1rem;width:100%;position:relative;";
        const mainContainer=document.createElement("div");
        mainContainer.id="mainContainer";
        mainContainer.style.cssText = css + "height:auto;";
        mainContainer.style.minHeight = "100vh";

        const innerImage=document.createElement("div");
            innerImage.id="innerImage";
            innerImage.style.cssText=css + "height:auto;";
            innerImage.style.height="auto";
            mainContainer.appendChild(innerImage);
        const innerUser=document.createElement("div");
            innerUser.id="innerUser";
            innerUser.style.cssText=css + "height:auto;" ;
            innerUser.style.height="auto";
            mainContainer.appendChild(innerUser);
        const btnGrp=document.createElement("div");
            btnGrp.id="btnGrp";
            btnGrp.style.cssText="display:flex;justify-content:space-around;align-items:center;flex-wrap:wrap; gap:1rem;"
            mainContainer.appendChild(btnGrp);
            parent.appendChild(mainContainer);
            
        const {button:btnImages}=Misc.simpleButton({anchor:btnGrp,text:"open images",type:"button",time:400,bg:Nav.btnColor,color:"white"});
            btnImages.onclick=(e:MouseEvent)=>{
                if(e){
                    // GET IMAGES!!
                    const row=document.createElement("div");
                    row.style.cssText="display:flex;margin-inline:auto;flex-direction:row;flex-wrap:wrap;align-items:center;";
                    row.id="row-images";
                    innerImage.appendChild(row)
                    // Header.cleanUpByID(innerCont,"btnGrp");
                        if(!(this._adminimgs && this._adminimgs.length>0)){
                            this._service.adminImages(adminUser).then(async(res)=>{
                                if(res && res.length>0){
                                        this.adminimgs=res;
                                        this.searchImg(parent,this.adminimgs);
                                            this.adminimgs.sort((a,b)=>{if(a.id<b.id) return -1;return 1}).map(adminimg=>{
                                                if(adminimg){
                                                    this.imgCard(row,adminimg);
                            
                                                }
                                            });
                                }
                                else{
                                    this.noFiles(parent);
                                }
                            });
                        
                    }else{
                        this.adminimgs.sort((a,b)=>{if(a.id<b.id) return -1;return 1}).map(adminimg=>{
                            if(adminimg){
                                this.imgCard(row,adminimg);
        
                            }
                        });
                    }
                }
            };
        const {button:usersBtn}=Misc.simpleButton({anchor:btnGrp,text:"open users",type:"button",time:400,bg:Nav.btnColor,color:"white"});
            usersBtn.onclick=(e:MouseEvent)=>{
                if(e){
                    //GET USERS
                   this.getUsers(innerUser,css,adminUser);
                   if(window.innerWidth <900){
                    innerUser.style.height="70vh";
                    innerUser.style.overflowY="scroll";
                    }else{
                        innerUser.style.height="auto";
                    }
                }
            };
        const {button:messBtn}=Misc.simpleButton({anchor:btnGrp,text:"open msgs",type:"button",time:400,bg:Nav.btnColor,color:"white"});
            messBtn.onclick=(e:MouseEvent)=>{
                if(e){
                    //GET MESSAGES
                   this.getMessages(mainContainer,this.adminUser);
                }
            };
        const {button:closeMsg}=Misc.simpleButton({anchor:btnGrp,text:"close msgs",type:"button",time:400,bg:Nav.btnColor,color:"white"});
            closeMsg.onclick=(e:MouseEvent)=>{
                if(e){
                    //GET MESSAGES
                   const getmsgsContainer=document.querySelector("div#messages-container") as HTMLElement;
                   if(getmsgsContainer){
                    mainContainer.removeChild(getmsgsContainer);
                   
                   }
                }
            };
        const {button:close}=Misc.simpleButton({anchor:btnGrp,text:"close images",type:"button",time:400,bg:Nav.btnColor,color:"white"});
            close.onclick=(e:MouseEvent)=>{
                if(e){

                    // Header.cleanUpByID(mainContainer,"innerImage");
                    const getrowImages=innerImage.querySelector("div#row-images") as HTMLElement;
                        Misc.fadeOut({anchor:getrowImages,xpos:100,ypos:100,time:400});
                        setTimeout(()=>{Header.cleanUp(innerImage)},398);
                        Header.cleanUpByID(parent,"search-container");
                }
                
            };
        const {button:closeUser}=Misc.simpleButton({anchor:btnGrp,text:"close users",type:"button",time:400,bg:Nav.btnColor,color:"white"});
            closeUser.onclick=(e:MouseEvent)=>{
                if(e){

                    // Header.cleanUpByID(mainContainer,"innerUser");
                    const getUsers=innerUser.querySelector("div#getUsers-row") as HTMLElement ;
                    if(getUsers){
                        if(window.innerWidth <900){
                            innerUser.style.height="0px";
                        }else{
                            innerUser.style.height="auto";
                        }
                        Misc.fadeOut({anchor:getUsers,xpos:100,ypos:100,time:400});
                        setTimeout(()=>{innerUser.removeChild(getUsers)},398);
                    }
                }
            };
        const {button:openpgcounts}=Misc.simpleButton({anchor:btnGrp,text:"open pg-counts",type:"button",time:400,bg:Nav.btnColor,color:"white"});
            openpgcounts.onclick=(e:MouseEvent)=>{
                if(e){

                    // Header.cleanUpByID(mainContainer,"innerUser");
                    const user_id=this._user.user.id;
                    this.getPagecounts(parent,user_id);
                }
            }
        const {button:closepgcounts}=Misc.simpleButton({anchor:btnGrp,text:"close pg-counts",type:"button",time:400,bg:Nav.btnColor,color:"white"});
        closepgcounts.onclick=(e:MouseEvent)=>{
            if(e){

                // Header.cleanUpByID(mainContainer,"innerUser");
                const getpgCounts=parent.querySelector("div#pg-counts-main") as HTMLElement ;
                if(getpgCounts){
                    
                    Misc.fadeOut({anchor:getpgCounts,xpos:100,ypos:100,time:400});
                    setTimeout(()=>{parent.removeChild(getpgCounts)},398);
                }
            }
            };
            Misc.matchMedia({parent:mainContainer,maxWidth:900,cssStyle:{maxWidth:"900px",width:"100%",paddingInline:"5px;"}});
            Misc.matchMedia({parent:innerUser,maxWidth:900,cssStyle:{paddingInline:"5px;"}});
    
    }

  
    imgCard(row:HTMLElement,adminimg:adminImageType){
        const col=document.createElement("div");
        col.style.cssText="margin:auto;background:white;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;align-items:center;gap:1.5rem;margin-bottom:1rem;overflow-x:hidden;";
        col.className="col-md-4 mx-auto";
        const div=document.createElement("div");
        div.id="div-container";
        div.style.cssText="margin:auto;display:flex;justify-content:center;align-items:center;gap:1rem;flex-wrap:wrap;";
        const img=document.createElement("img");
        // img.src=Misc.AWSSourceImage({url:adminimg.img,width:175,quality:50});
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
                if(key==="imgKey"){
                    const li=document.createElement("li");
                    const ul1=document.createElement("ul");
                    li.appendChild(ul1);
                    const imgKeySplit=(value as string).split("/");
                    imgKeySplit.map((str,index)=>{
                        if(str){
                            const li1=document.createElement("li");
                            li1.style.cssText="text-wrap:wrap;display:flex;flex-wrap:wrap;"
                            if(index===0){
                                const str_=Nav.splitString(str,8);
                                li1.innerHTML=`<span style="color:blue;">folder:</span><span> ${str_}</span>`;

                            }else{
                                const str_=Nav.splitString(str,8);
                                li1.innerHTML=`<span style="color:green;">file: </span><span> ${str_}</span>`;
                            }
                            ul1.appendChild(li1);
                            ul.appendChild(li);
                        }
                    });

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
        const {button}=Misc.simpleButton({anchor:col,type:"button",bg:Nav.btnColor,color:"white",time:300,text:"delete"});
        button.onclick=(e:MouseEvent)=>{
            if(e){
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
                            this._adminimgs.sort((a,b)=>{if(a.id<b.id) return -1;return 1}).map(adminimage=>{
                                if(adminimage){
                                    this.imgCard(row,adminimage);
                                }
                            });
                        }
                    }
                });
            }
        };
    }

    noFiles(parent:HTMLElement){
        Header.cleanUpByID(parent,"noFiles");
        const cont=document.createElement("div");
        cont.id="nofiles"
        cont.style.cssText="display:grid;place-items:center;margin:auto;min-height:100vh;";
        const para=document.createElement("p");
        para.textContent=this.nofilePara;
        para.className="text-primary text-center";
        para.style.cssText="font-size:150%;"
        cont.appendChild(para);
        parent.appendChild(cont);
    }
    async getUsers(inneruser:HTMLElement,css:string,adminUser:userType){
        const display=window.innerWidth <400 ? "block":"flex";
        Header.cleanUpByID(inneruser,"getUsers-row");
        const containerRow=document.createElement("div");
        containerRow.id="getUsers-row";
            containerRow.style.cssText=`display:${display};flex-direction:row;flex-wrap:wrap;width:100%;position:relative;justify-content:space-around;align-items:center;`;
            
        if(!(this._users && this._users.length>0)){

            return await this._service.adminUsers(adminUser.email,adminUser.id).then(async(res)=>{
                if(res){
                    inneruser.appendChild(containerRow);
                    this._users=res.users;
                    this._users.sort((a,b)=>{if(a.id<b.id) return -1;return 1}).map((user,index)=>{
                        // console.log("user:first time",user);//works
                        this.userCard(inneruser,containerRow,user,css,index,adminUser);
                    });
                }
            });
        } else{
            inneruser.appendChild(containerRow);
            this._users.sort((a,b)=>{if(a.id<b.id) return -1;return 1}).map((user,index)=>{
                // console.log(parent);//works
                this.userCard(inneruser,containerRow,user,css,index,adminUser);
            });
        };
           Misc.matchMedia({parent:containerRow,maxWidth:400,cssStyle:{display:"block",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",gap:"1.5rem"}});
       
    }
    userCard(inneruser:HTMLElement,containerRow:HTMLElement,user:userType,css:string,index:number,adminUser:userType){
        // Header.cleanUpByID(containerRow,`card-${index}`);
        // console.log("user: inside",user)//works
        const users=this._users;
        const nameStyle="color:red;margin-right:1rem;font-size:110%;font-weight:bold;"
        const card=document.createElement("div");
        card.className="card";
        card.id=`card-${index}`;
        card.style.cssText=css;
        card.style.borderRadius="15px";
        card.style.backgroundColor="white";
        card.style.position="relative";
        card.style.alignItems="stretch";
        card.style.flex="1 1 33%";
        const img=document.createElement("img");
        img.style.cssText="width:130px;aspect-ratio: 1/1;box-shadow:1px 1px 12px 1px;border-radius:50%;align-self:center;";
        img.src=user.image? user.image : this.logo;
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
        const {button:deleteUser}=Misc.simpleButton({anchor:card,bg:Nav.btnColor,color:"white",text:"delete",time:400,type:"button"});
        deleteUser.onclick=(e:MouseEvent)=>{
            if(e){
                const item:delteUserType={adminemail:adminUser.email,adminId:adminUser.id,delete_id:user.id};
                this._service.adminDelUser(item).then(async(res)=>{
                    if(res && res.id){
                        this.deleteUser(inneruser,users,css,adminUser,item);
                    }
                });
            }
        };
        Misc.matchMedia({parent:card,maxWidth:800,cssStyle:{flex:"1 1 50%"}});
        Misc.matchMedia({parent:card,maxWidth:400,cssStyle:{flex:"1 1 100%"}});
        Misc.matchMedia({parent:containerRow,maxWidth:400,cssStyle:{flexDirection:"column"}});

    }
    deleteUser(inneruser:HTMLElement,users:userType[],css:string,adminUser:userType,item:delteUserType){
        //it deletes user and then redoes the user row
      
        this._users=users;
        this._service.adminDelUser(item).then(async(res)=>{
            if(res && res.id){
                users.map((user_,ind)=>{
                    if(user_ && (user_.id !==item.delete_id)){
                        this._users.splice(ind,1)
                    }
                });

                const getRow=inneruser.querySelector("div#getUsers-row") as HTMLElement;
                if(getRow){
                    Header.cleanUp(getRow);
                    this._users.map((user_,index_)=>{
                        if(user_){
                            this.userCard(inneruser,getRow,user_,css,index_,adminUser);
                        }
                    });
                }
            }
        });
    }
    searchImg(parent:HTMLElement,adminimgs:adminImageType[]){
        Header.cleanUpByID(parent,"search-container");
        const container=document.createElement("div");
        const text=document.createElement("h6");
        text.className="text-center text-underline text-primary my-2";
        text.textContent="search keys";
        container.id="search-container";
        container.style.cssText="width:100%;box-shadow:1px 1px 12px 1px black;padding:1.rem;margin-inline:auto;margin-block:2rem;display:flex;flex-direction:row;align-items:center;padding:1rem;";
        const searchCont=document.createElement("div");
        searchCont.id="searchCont";
        searchCont.style.cssText="box-shadow:1px 1px 12px 1px black;padding:1.rem;margin-inline:auto;margin-block:2rem;display:flex;flex-direction:column;align-items:center;flex:1 1 33%";
        const results=document.createElement("div");
        results.id="search-results";
        results.style.cssText="box-shadow:1px 1px 12px 1px black;padding:1.rem;margin-inline:auto;margin-block:2rem;display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;flex:1 1 67%;height:30vh; overflow-y:scroll;";
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
               
                // Header.cleanUpByID(popup,"div-search");
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
                        ul.style.cssText="display:flex;justify-content:flex-start;align-items:center;";
                        ul.id=`span-search-folder`;
                        ul.innerHTML=`<li><span style="color:red;">folder: </span>${admin_.imgKey.split("/")[0]}</li><li><span style="color:red;">file: </span>${admin_.imgKey.split("/")[1]}</li>`;
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
    }
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
    }
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
                const nValue=Boolean(value) ? "true":"false";
                li.innerHTML=`<span style="color:green;">${key} :</span><span style="color:red;">${nValue}</span>`;
            }
            ul.appendChild(li);
        }
        col.appendChild(ul);
        row.appendChild(col);
        const {button:reply}=Misc.simpleButton({anchor:col,text:"reply",bg:Nav.btnColor,color:"white",time:400,type:"button"});
        reply.onclick=(e:MouseEvent)=>{
            if(e){
                const user=this._user.user;
                this.replyClient({parent,row,col:col,msg:msg,user})
            }
        };
        Misc.matchMedia({parent:col,maxWidth:400,cssStyle:{flex:"1 1 auto"}});
        Misc.matchMedia({parent:row,maxWidth:400,cssStyle:{flexDirection:"column"}});
    }
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
                this.pagecounts.map((pg,index)=>{
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
    }
    pageCountPage(parent:HTMLElement,user_id:string,row:HTMLElement,pg:pageCountType,index:number){
        Header.cleanUpByID(parent,`col-pg-count-${index}`);
        const col=document.createElement("div");
        col.id=`col-pg-count-${index}`;
        col.style.cssText="margin:auto;display:flex;justify-content:center;align-items:flex-start;flex-direction:column;padding:1rem;box-shadow:1px 1px 12px 1px;border-radius:12px;position:relative;background-color:white;border-radius:12px;";
        col.className="col-md-3";
        const ul=document.createElement("ul");
        ul.style.cssText="margin-left:1rem;display:block;";
        for( const [key,value] of Object.entries(pg)){
            const ul1=document.createElement("ul");
            ul1.style.cssText="margin-inline:auto;padding:1rem;display:flex;justify-content:center;flex-direction:column;align-items:center:gap:1.25rem;margin-right:1.25rem;color:green;";
            const li1=document.createElement("li");
            li1.style.cssText="color:red;order:2;list-style:none;";
            li1.innerHTML=`${key}.) :${value}`;
            ul1.innerHTML+="<span style='color:blue;order:1;'>item:</span>";
            if(key !=="id"){

                ul1.appendChild(li1);
                ul.appendChild(ul1);
            }
        }
        col.appendChild(ul);
        row.appendChild(col);
        //DELETE
        const xDiv=document.createElement("div");
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-10px,10px);width:22px;height:22px;border-radius:50%;background:black;display:flex;place-items:center;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"20px",color:"white",borderRadius:"18px;"}});
        col.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
               
                // if(!getRow) return;
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
    }
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
        const {button:btn}=Misc.simpleButton({anchor:form,text:"submit",type:"submit",bg:Nav.btnColor,color:"white",time:400});
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

                    const item:adminReplyMsgType={msg,user_id:user.id,reply}
                    //generate popup with textarea for reply to client in admin
                    await this._service.adminSendEmail(item).then(async(reply:{msg:string,success:boolean}|undefined)=>{
                        if(reply && reply.success){
                            Misc.message({parent:col,msg:reply.msg,type_:"success",time:1000});
                            // UPDATE MESSAGES
                            let msg_=msg;
                            msg_={...msg,sent:true};
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



    }
    
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
            }else{
                // const span=document.createElement("span");
                // span.textContent=str.slice(arr.length-num,arr.length-1);
                // mSpan.appendChild(span);
            }
        });
        return mSpan.innerHTML;
    }

}
export default Admin;
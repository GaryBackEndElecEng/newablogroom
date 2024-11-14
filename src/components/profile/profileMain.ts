import AuthService from "../common/auth";
import Service from "../common/services";
import {blogType, gets3ImgKey, userType, messageType,sendEmailMsgType, postType} from "../editor/Types";
import ModSelector from "../editor/modSelector";
import {FaCreate} from "@/components/common/ReactIcons";
import { FaCrosshairs,FaSignal } from "react-icons/fa";
import User from "../user/userMain";
import Misc from "../common/misc";
import { buttonReturn } from '../common/tsFunctions';
import Nav from '../nav/headerNav';
import { getErrorMessage } from "@/lib/errorBoundaries";
import DisplayBlog from "../blog/displayBlog";
import Header from "../editor/header";
import ShapeOutside from "../editor/shapeOutside";
import Message from "../common/message";
import MetaBlog from "../editor/metaBlog";
import NewCode from "../editor/newCode";
import ChartJS from "../chart/chartJS";
import Post from "../posts/post";
import Blogs from "../blogs/blogsInjection";



class ProfileMain{
    bgColor:string;
    btnColor:string;
    userUrlUpdate:string;
    logo:string="/images/gb_logo.png";
    blogUrl:string="/api/blog";
    _messages:messageType[];
    _displayBlog:DisplayBlog;
    shapeOutside:ShapeOutside;
    classMsg:Message;
    newCode:NewCode;
    _posts:postType[];
    _blogs:blogType[];
    static main:HTMLElement | null;


    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private _metaBlog:MetaBlog,public chart:ChartJS,private _post:Post){
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.userUrlUpdate="/api/user_update";
        this._messages=[];
        this._posts=[] as postType[];
        this._blogs=[] as blogType[];
        this.newCode=new NewCode(this._modSelector,this._service,this._user);
        this.shapeOutside=new ShapeOutside(this._modSelector,this._service,this._user);
        const message=new Message(this._modSelector,this._service,this._modSelector.blog);
        this._displayBlog=new DisplayBlog(this._modSelector,this._service,this._user,this.shapeOutside,this.newCode,this.chart,message);
        this.classMsg= new Message(this._modSelector,this._service,this._modSelector.blog);

    }
    //----------SETTER/GETTERS---------/////
    get user(){
        return this._user.user;
    }
    set user(user:userType){
        this._user.user=user;
    }
    get msgs(){
        return this._messages;
    }
    set msgs(messages:messageType[]){
        this._messages=messages;
    }
    set blogs(blogs:blogType[]){
        this._modSelector._blogs=blogs
        this._user.blogs=blogs;
        this._blogs=blogs;
    }
    get blogs(){
        return this._modSelector._blogs;
    }
    set blog(blog:blogType){
        this._modSelector._blog=blog;
    }
    get blog(){
        return this._modSelector._blog;
    }
    get posts(){
        return this._posts;
    }
    set posts(posts:postType[]){
        this._posts=posts;
    }
    //----------SETTER/GETTERS---------/////
    //parent: MainHeader.header,id="navHeader"
   async main(item:{parent:HTMLElement,user:userType}){
    const {parent,user}=item;
        parent.style.position="relative";
        parent.style.width="100%";
        const css_col="position:relative;height:auto;margin:auto;display:flex;place-items:center;flex-direction:column;border-radius:11px;";
        const css_row="position:relative;height:auto;margin:auto;display:flex;place-items:center;border-radius:11px;flex-wrap:wrap;";
        this.user=user;
        this.blogs=user.blogs;
        this.posts=user.posts;
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        ProfileMain.cleanUpByID(parent,"section#main-outerMain")
        parent.style.position="relative";
        // parent.style.justifyContent="space-between";
        const outerMain=document.createElement("section");
        outerMain.id="main-outerMain";
        outerMain.style.cssText=css_col + "box-shadow:1px 1px 12px 1px #1F305E;width:100%;";
        outerMain.style.backgroundColor="#34282C";
        outerMain.id="profileMain";
        ProfileMain.main=outerMain;
        ////--------------row -------------------------///
        const mainRow=document.createElement("div");
        mainRow.style.cssText="margin:auto;position:relative;justify-content:center;align-items:center;width:100%;padding-inline:1.25rem;";
        mainRow.id="outerMain-row";
        //EMAIL SECTION colNum=2 => two section
        ////--------------row -------------------------///
        this.updateImageBio({mainRow,user,column:1})
        const emailPassword=document.createElement("div");
        emailPassword.style.cssText=css_row;
        mainRow.appendChild(emailPassword);
        this.emailForm({mainRow,innerRow:emailPassword,column:2,user});
        this.passwordForm({mainRow,innerRow:emailPassword,column:2,user});
        this.userBlogs({mainRow,column:1,blogs:this.blogs});//row.id=row-profile
        await this.messages({mainRow,user,column:2});
        await this.userposts({mainRow,user,cols:2,posts:this.posts})
       outerMain.appendChild(mainRow);
        parent.appendChild(outerMain);//MAIN INJECTION
        Misc.slideIn({anchor:outerMain,xpos:0,ypos:70,time:500});
    }

    //EMAIL FORM
    emailForm(item:{mainRow:HTMLElement,innerRow:HTMLElement,column:number,user:userType}){
        const {mainRow,innerRow,column,user}=item;
        const partition=Math.round(12/column);
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const col=document.createElement("section");
        col.style.cssText="margin:auto;display:flex;flex-direction:column;aligm-items:center;justify-content:center;align-items:center;";
        col.classList.add(`col-md-${partition}`);
        col.style.flex=less900 ? (less400 ? "1 0 100%" : "1 0 50%"): "1 0 50%";
        const title=document.createElement("h6");
        title.className="text-primary text-center lean mx-auto";
        title.textContent="email changeout";
        title.style.cssText="margin-inline:auto;margin-block:1rem;";
        //APPENDING TITLE TO COL
        col.appendChild(title);
        const form = document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;max-width:300px;border-radius:12px;box-shadow:1px 1px 3px 1px blue,-1px -1px 3px -1px blue;"
        form.classList.add("text-center");
        //EMAIL SECTION
        const {emailNew,emailOld}=this.emailChange(form);
        //APPENDING btn TO FORM
        const btnEmail=buttonReturn({parent:form,text:"submit",type:"submit",bg:"#002244",color:"white"});
        btnEmail.disabled=true;
        //APPENDING FORM TO COL
        col.appendChild(form);
        //APPENDING COL TO ROW
        innerRow.appendChild(col);
        emailNew.addEventListener("change",(e:Event)=>{
            if(e){
                const em=(e.currentTarget as HTMLInputElement).value
                if(em.split("").length>0){
                    btnEmail.disabled=false
                }
            }
        });
        emailOld.addEventListener("change",(e:Event)=>{
            if(e){
                const em=(e.currentTarget as HTMLInputElement).value
                if(em.split("").length>0){
                    btnEmail.disabled=false
                }
            }
        });
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const newForm=new FormData(e.currentTarget as HTMLFormElement);
                const emailNew_=newForm.get("emailNew") as string;
                const emailOld_=newForm.get("emailOld") as string;
                if(emailOld_ && emailNew_){
                    if(user && user.id){
                        const emails={emailNew:emailNew_,emailOld:emailOld_};
                        this._user.changeEmail(mainRow,user,emails).then(async(user)=>{
                            if(user){
                                emailNew.value="";
                                emailOld.value="";
                                Misc.message({parent:mainRow,msg:"updated",type_:"success",time:400});
                            }
                        });
                    }else{
                        Misc.message({parent:mainRow,msg:"please sign-in again",type_:"error",time:700})
                    }

                }
            }
        });
    }
    //PARENT: EMAIL FORM ABOVE
    emailChange(form:HTMLFormElement):{emailNew:HTMLInputElement,emailOld:HTMLInputElement}{
        const rand=Math.round(Math.random()*100);
        const h6=document.createElement("h6");
        h6.textContent="email change"
        h6.className="text-center mb-1 text-primary";
        //APPENDING H6 TO FORM
        form.appendChild(h6);
        //APPENDING NEW EMAIL INPUT TO FORM
        const {email:emailOld,label:emailOldLabel}=Nav.emailComponent(form)
        emailOld.id=`emailOld-${rand}`;
        emailOld.name=`emailOld`;
        emailOld.autocomplete="on";
        emailOld.style.cssText="max-width:200px;font-size:12px;line-height:0.75;"
        emailOldLabel.textContent="old Email"
        //APPENDING NEw EMAIL INPUT TO FORM
        const {email:emailNew,label:emailLabel}=Nav.emailComponent(form)
        emailNew.style.cssText="max-width:200px;font-size:12px;line-height:0.75;";
        emailNew.id=`emailNew-${rand}`;
        emailNew.autocomplete="off";
        emailNew.name="emailNew";
        emailLabel.textContent="new Email";
        
        return {emailNew,emailOld}
    }

    //PASSWORD FORM
    passwordForm(item:{mainRow:HTMLElement,innerRow:HTMLElement,column:number,user:userType}){
        const {mainRow,innerRow,column,user}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const partition=Math.round(12/column);
        const col=document.createElement("section");
        col.style.cssText="margin:auto;display:flex;flex-direction:column;aligm-items:center;justify-content:center;align-items:center;";
        col.style.flex=less900 ? (less400 ? "1 0 100%" : "1 0 50%"): "1 0 50%";
        col.classList.add(`col-md-${partition}`);
        const title=document.createElement("h6");
        title.textContent="password changeout";
        title.className="text-primary text-center lean mx-auto";
        title.style.cssText="margin-inline:auto;margin-block:1rem;";
        //APPENDING TITLE TO COL
        col.appendChild(title);
        const form = document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;max-width:300px;border-radius:12px;box-shadow:1px 1px 3px 1px blue,-1px -1px 3px -1px blue;"
        form.classList.add("text-center");
        //EMAIL SECTION
        const {passNew,passOld}=this.passwordChange(form);
        //APPENDING btn TO FORM
        const btnPass=buttonReturn({parent:form,text:"submit",type:"submit",bg:"#002244",color:"white"});
        btnPass.disabled=true;
        //APPENDING FORM TO COL
        col.appendChild(form);
        //APPENDING COL TO ROW
        innerRow.appendChild(col);
        passNew.addEventListener("input",(e:Event)=>{
            if(e){
                const em=(e.currentTarget as HTMLInputElement).value;
                const em1=(passOld as HTMLInputElement).value;
                const check=[em,em1].map(val=>(val.split("").length>4)).includes(true);
                if(check){
                    btnPass.disabled=false;
                }
               
            }
        });
        passOld.addEventListener("input",(e:Event)=>{
            if(e){
                const em=(e.currentTarget as HTMLInputElement).value;
                const em1=(passNew as HTMLInputElement).value;
                const check=[em,em1].map(val=>(val.split("").length>4)).includes(true);
                if(check){
                    btnPass.disabled=false;
                }
                
            }
        });
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const newForm=new FormData(e.currentTarget as HTMLFormElement);
                const passNew_=newForm.get("passNew") as string;
                const passOld_=newForm.get("passOld") as string;
                // console.log(passNew_,passOld_)
                if(passNew_ && passOld_){
                    if(user && user.id){
                        const passwords={passNew:passNew_,passOld:passOld_}
                        this._user.changePassword(mainRow,user,passwords).then(async(user)=>{
                            if(user){
                                passNew.value="";
                                passOld.value="";
                                Misc.message({parent:mainRow,msg:"updated",type_:"success",time:400});
                            }
                        }).catch((err)=>{
                            const msg=getErrorMessage(err); console.error(msg)
                            Misc.message({parent:mainRow,msg:msg,type_:"error",time:700})
                        });
                    }else{
                        Misc.message({parent:mainRow,msg:"please sign-in again",type_:"error",time:700})
                    }

                }
            }
        });
    }
    //PASSWORD FORM
    passwordChange(form:HTMLFormElement):{passNew:HTMLInputElement,passOld:HTMLInputElement}{
        const rand=Math.round(Math.random()*100);
        const h6=document.createElement("h6");
        h6.textContent="password change"
        h6.className="text-center mb-1 text-primary";
        //APPENDING H6 TO FORM
        form.appendChild(h6);
        //APPENDING NEW EMAIL INPUT TO FORM
        const {password:passOld,label:passOldLabel}=Nav.passwordComponent(form)
        passOld.id=`passOld-${rand}`;
        passOld.name="passOld";
        passOld.autocomplete="on";
        passOld.placeholder="old password";
        passOld.style.cssText="max-width:200px;font-size:12px;line-height:0.75;"
        passOldLabel.textContent="old password"
        //APPENDING NEw EMAIL INPUT TO FORM
        const {password:passNew,label:passNewLabel}=Nav.passwordComponent(form)
        passNew.style.cssText="max-width:200px;font-size:12px;line-height:0.75;";
        passNew.id=`passNew-${rand}`;
        passNew.name="passNew";
        passNew.placeholder="new password";
        passNew.autocomplete="off";
        passNewLabel.textContent="new password";
        
        return {passNew,passOld}
    }
    updateImageBio(item:{mainRow:HTMLElement,user:userType,column:number}){
        const {mainRow,user,column}=item;
        const rowClass=window.innerWidth < 600 ? "" : "row";
        const partition=Math.round(12/column);
        const cont=document.createElement("section");
        cont.className=`col-lg-${partition}`;
        cont.style.cssText="margin-inline:auto;background-color:#bdc5c9;width:100%;position:relative;";
        cont.id="updateImageBio";
        const title=document.createElement("h6");
        title.textContent="Bio and Image creation";
        title.className="text-center text-primary";
        title.style.cssText="margin-bottom:1.5rem;text-decoration:underline;text-underline-offset:2.rem;"
        //----APPENDING TITLE TO CONT--///
        cont.appendChild(title);
        const row=document.createElement("div");
        row.id="updateImageBio-row";
        row.className=`${rowClass} update-image-bio`;
        row.style.cssText="margin-inline:auto;box-shadow:1px 1px 7px 1px #c6cdd1;padding:1rem;border-radius:6px;width:100%;position:relative;"
        //------APPENDING BIO TO ROW----//////
        this.uploadImageForm(row,user);
        this.bio(row,user);
        //-APENDING ROW TO CONT---////
        cont.appendChild(row);
        mainRow.appendChild(cont);
    }

    //PARENT::updateImageBio()
    bio(row:HTMLElement,user:userType){
        //parent.id=row-profile
        const rand=Math.round(Math.random()*1000);
        Header.cleanUpByID(row,"col-bio-column");
        const col=document.createElement("div");
        col.className="col-lg-6";
        col.id=`bio-col-column`;
        col.style.cssText="display:flex;justify-content:center;flex-direction:column;gap:1rem;align-items:center;position:relative;";
        const form =document.createElement("form");
        form.id=`col-form-${rand}`
        form.style.cssText="display:flex;justify-content:center;align-items:center;flex-direction:column;width:100%";
        const {input,label:inLabel} =Nav.inputComponent(form);
        input.id=`form-name-${rand}`;
        inLabel.textContent="name";
        input.id=`name-change-${rand}`;
        input.name="name";
        input.value=user.name ? user.name :"";
        const {textarea,label}=Nav.textareaComponent(form);
        textarea.id=`form-textarea-${rand}`;
        label.textContent="Bio";
        textarea.name="textarea";
        label.classList.add("display-6");
        textarea.value=user.bio ? user.bio :"";
        textarea.style.cssText="margin-inline:auto;margin:1rem;border-radius:7px;width:100%;box-shadow:1px 1px 6px 1px black;";
        textarea.rows=5;
        textarea.name="textarea";
        textarea.style.width="100%";
        const {input:usern,label:userLabel} =Nav.inputComponent(form);
        userLabel.textContent="username";
        usern.id=`form-username-change-${rand}`;
        usern.name="username";
        usern.placeholder="username";
        usern.autocomplete="username";
        userLabel.setAttribute("for",usern.id);
        //showinfo
        const grpShow=document.createElement("div");
        grpShow.className="form-group";
        grpShow.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;";
        const showinfo=document.createElement("input");
        showinfo.id=`chaeckbox-showinfo-${rand}`;
        showinfo.type="checkbox";
        showinfo.name="showWork";
        showinfo.style.width="50px";
        showinfo.checked=user.showinfo as boolean;
        // showinfo.checked;
        const showLabel=document.createElement("label");
        showLabel.textContent="put your name to your work";
        grpShow.appendChild(showLabel);
        grpShow.appendChild(showinfo);
        //showinfo
        form.appendChild(grpShow);
        const btn=buttonReturn({parent:form,text:"submit",bg:"#00008B",color:"white",type:"submit"});
        btn.id=`bio-form-btn-submit-${rand}`;
        btn.disabled=true;
        col.appendChild(form);
        row.appendChild(col);
        Misc.matchMedia({parent:col,maxWidth:500,cssStyle:{"width":"95%","marginInline":"auto"}});
        showinfo.onchange=(e:Event)=>{
            if(e){
                const check=(e.currentTarget as HTMLInputElement).checked;
                (showinfo as HTMLInputElement).checked=check;
                showLabel.textContent=`${check}:put your name to your work`;
                btn.disabled=false;

            }
        };
        input.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        usern.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        textarea.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const name=formdata.get("name") as string;
                const textarea=formdata.get("textarea") as string;
                const showWork=formdata.get("showWork") as string;
                const username=formdata.get("username") as string;
                this._user.user={...user,bio:textarea,name:name,username:username,showinfo:Boolean(showWork)};
                user=this._user.user;
                if((name || textarea) && user){
                    this._user.userUpdate(row,user).then(async(user_)=>{
                        if(user_){
                            user_={...user_,blogs:user.blogs,posts:user.posts}
                            localStorage.setItem("user",JSON.stringify(user_));
                            this._user.user=user_;
                            
                            // const parent=document.getElementById("row-profile") as HTMLElement;
                            // const row=document.getElementById("updateImageBio-row") as HTMLElement;
                            this.bio(row,user_);
                        }
                    });
                }

            }
        });

    }
    uploadImageForm(parent:HTMLElement,user:userType){
        const rand=Math.round(Math.random()*100);
        
        const col=document.createElement("div");
        col.id=`col-uploadImageForm-${rand}`;
        col.className="col-lg-6";
        col.style.cssText="margin-inline:auto;"
         //------IMAGE Creation----------//
         const img=document.createElement("img");
         img.style.cssText="margin:auto;max-width:175px;height:175px;border-radius:50%;filter:drop-shadow(0 0 0.75rem #800000);aspect-ratio: 1 / 1;"
         img.id="profile_pic";
         if(user.imgKey){
            this._service.getSimpleImg(user.imgKey).then(async(res)=>{
                if(res){
                    img.src=res.img;
                    img.alt=res.Key;
                }
            });
         }else{

             img.src=user.image ? user.image : this.logo;
             img.alt=user.name ? user.name: "www.ablogroom.com";
         }
         col.appendChild(img);
         //------IMAGE Creation----------//
        const form=document.createElement("form");
        form.id=`profile-image-form-rand`;
        form.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.75rem;"
        const input=document.createElement("input");
        input.type="file";
        input.id=`file-${rand}`;
        input.name="file";
        form.appendChild(input);
        const btn=buttonReturn({parent:form,bg:this.btnColor,text:"upload",color:"white",type:"submit"});
        btn.disabled=true;
        input.addEventListener("change",(e:Event)=>{
            if(e){
                const file=(e.currentTarget as HTMLInputElement).files;
                if(file){
                    btn.disabled=false;
                }
            }
        });
        //-----APPENDING FORM TO COL----///
        col.appendChild(form);
        //-----APPENDING COL TO PARENT----///
        parent.appendChild(col);
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File;
                let user=this._user.user;
                if(user.imgKey){
                    this._service.adminImagemark(user.imgKey).then(async(res)=>{
                        if(res){
                            Misc.message({parent,msg:"deleted old profile",type_:"success",time:600});
                        }
                    });
                }
                if(file && user.id){
                    let blog=this._modSelector.blog;
                    const name=blog && blog.name ? blog.name : "userBio";
                    blog={...blog,name:name}
                    blog.user_id=user.id;
                    this._service.generateImgKey(formdata,blog);
                    this._service.simpleImgUpload(parent,formdata).then(async(res:gets3ImgKey)=>{
                        if(res){
                            user={...user,imgKey:res.Key,image:res.img};
                            this._user.user=user;
                            img.src=res.img;
                            Misc.fadeOut({anchor:form,xpos:50,ypos:100,time:400});
                            setTimeout(()=>{
                                col.removeChild(form);
                            },380);
                            this._user.userUpdate(parent,this._user.user).then(async(user)=>{
                                if(user){
                                    this._user.user=user;
                                    localStorage.setItem("user",JSON.stringify(user));
                                }
                            });
                            // form.style.opacity="0";
                            Misc.message({parent,msg:"uploaded",type_:"success",time:400});
                        }
                    }).catch((err)=>{const msg=getErrorMessage(err);Misc.message({parent,msg:msg,type_:"error",time:700})});
                }
            }
        });
    }
    userBlogs(item:{mainRow:HTMLElement,column:number,blogs:blogType[]}){
        const {mainRow,column,blogs}=item;
        ProfileMain.cleanUpByID(mainRow,"section#contID");
        const partition=Math.round(12/column);
        const cont=document.createElement("section");
        cont.id="contID";
        cont.className=`col-md-${partition}`;
        cont.style.cssText="margin-inline:auto;background-color:#bdc5c9;width:100%;position:relative;overflow-x:hidden;margin-block:1rem;";

        const title=document.createElement("h6");
        title.textContent="Your Blogs";
        title.className="text-center text-primary display-6";
        title.style.cssText="margin-block:1.0rem;text-decoration:underline;text-underline-offset:0.75rem;";
        //----APPENDING TITLE TO CONT--///
        cont.appendChild(title);
        const inner_row=document.createElement("div");
        inner_row.className="row user-blogs";
        inner_row.id="user-blogs";
        inner_row.style.cssText="margin-inline:auto;box-shadow:1px 1px 7px 1px #c6cdd1;padding:1rem;border-radius:6px;display:flex;flex-direction:row;flex-wrap:nowrap; width:100%;overflow-x:scroll;position:relative;";
        //APPENDING ROW TO CONT
        cont.appendChild(inner_row);
        ///---------------DISPLAY BLOGS------------------------//
        const user_id=this._user.user.id;
                if(blogs.length>0){
                    this._modSelector.blogs=blogs;
                    localStorage.setItem("userBlogs",JSON.stringify(blogs));
                    blogs.map((blog,index)=>{
                        this.showBlog({mainRow,innerRow:inner_row,blog,index})

                    });
                }else{
                    this.noBlogs(cont);
                }
    
        ///---------------DISPLAY BLOGS------------------------//
        
        //APPEND CONT TO PARENT
        const getInnerRow=mainRow.querySelector("div#user-blogs") as HTMLElement;
        Misc.matchMedia({parent:getInnerRow,maxWidth:400,cssStyle:{flexDirection:"column"}});
        mainRow.appendChild(cont);
        Misc.matchMedia({parent:cont,maxWidth:400,cssStyle:{aspectRatio:"1 / 1.5"}});
    }
   async messages(item:{mainRow:HTMLElement,user:userType,column:number}){
    const {mainRow,user,column}=item;
        mainRow.style.position="relative";
        const partition=Math.round(12/column);
        const cssLeft=`flex:1 0 ${(1/column)*100}%;`;
        const cssRight=`flex:1 0 ${(1/column)*100}%;min-height:23vh;position:relative;`;
        const css=`height:15vh;margin-inline:2px;background-color:white;margin-block:1.5rem;overflow-y:scroll;`;
        //LEFT SIDE
        const colLeft=document.createElement("section");
        colLeft.id="colLeft";
        colLeft.style.cssText=`margin:auto;display:flex;flex-direction:column;aligm-items:center;justify-content:center;align-items:center;background-color:rgb(189, 250, 221);box-shadow:1px 1px 10px 1px black;${cssLeft}`;
        Misc.matchMedia({parent:colLeft,maxWidth:600,cssStyle:{"width":"100%"}});
        colLeft.classList.add(`col-lg-${partition}`);
        //LEFT SIDE
        //RIGHTSIDE
        //RIGHT SIDE
        const colRight=document.createElement("section");
        colRight.id="colRight";
        colRight.style.cssText=`margin:auto;display:flex;flex-direction:column;aligm-items:center;justify-content:center;align-items:center;background-color:rgb(129, 167, 201);box-shadow:1px 1px 10px 1px black;${cssRight}`;
        Misc.matchMedia({parent:colRight,maxWidth:600,cssStyle:{"width":"100%"}});
        colRight.classList.add(`col-md-${partition}`);
        const titleRight=document.createElement("h5");
        titleRight.className="text-light text-center lean mx-auto";
        titleRight.textContent="View panel";
        titleRight.style.cssText="margin-inline:auto;margin-block:1rem;";
        //APPENDING TITLE TO COL
        colRight.appendChild(titleRight);
        //RIGHTSIDE
        const titleLeft=document.createElement("h5");
        titleLeft.className="text-primary text-center lean mx-auto";
        titleLeft.textContent="users comments";
        titleLeft.style.cssText="margin-inline:auto;margin-block:1rem;";
        const msgList=document.createElement("div");
        msgList.style.cssText=`${css}`;
        msgList.style.overflowY="scroll";
    
        await this.promGetmsgs(user).then(async(msgs:messageType[])=>{
            if(msgs && msgs.length>0){
                this.msgs=msgs;
                this.msgs.map(async(msg,index)=>{
                    const div=document.createElement("div");
                    div.id=`msg-${index};`
                    div.style.cssText="display:flex;justify-content:space-around;align-items:center;background-color:#34282C;color:white;border-top:1px solid white;padding:1rem;";
                    //NAME
                    const name=document.createElement("p");
                    name.style.cssText="text-wrap:wrap;";
                    name.innerHTML=`<span style="color:red;">${msg.id}.) </span>${msg.name}`;
                    div.appendChild(name);
                    //EMAIL
                    const email=document.createElement("p");
                    email.style.cssText="text-wrap:wrap;";
                    email.textContent=msg.email;
                    div.appendChild(email);
                    //APPENDING DIV TO MSGLIST
                    msgList.appendChild(div);
                    div.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            this.msgRightCard(colRight,user,msg);
                        }
                    });
                });
                return msgs;//loading messages
            }else{
                //NO MESSAGES
                const div=document.createElement("div");
                div.id=`msg-no-messages;`
                div.style.cssText="display:flex;justify-content:space-around;align-items:center;background-color:#34282C;color:white;border-top:1px solid white;padding:1rem;";
                //NAME
                const name=document.createElement("p");
                name.style.cssText="text-wrap:wrap;";
                name.innerHTML=`<span style="color:red;">SORRY!! </span> YOU HAVE NO MESSAGES. As soon as a client comments on your blog, a message will appear on screen. This screen has a overflow to accommodate multiple messages.`;
                div.appendChild(name);
                msgList.appendChild(div);
            }
        });
       
        //APPENDING TITLE TO COL
        colLeft.appendChild(titleLeft);
        colLeft.appendChild(msgList);
        
        //APPENDING LEFT
        mainRow.appendChild(colLeft);
        //APPENDING RIGHT
        mainRow.appendChild(colRight);
   
    }
    msgRightCard(colRight:HTMLElement,user:userType,msg:messageType){
        ProfileMain.cleanUpByID(colRight,"div#card-right");
        const card=document.createElement("div");
        card.className="card";
        card.id="card-right";
        card.style.cssText="display:flex;margin:auto;flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:stretch;width:100%;height:100%;";
        const left=document.createElement("div");
        left.style.cssText="display:flex;margin:auto;flex-direction:column;justify-content:center;align-items:stretch;gap:1rem;border-right:1px solid:blue;";
        const nameDiv=document.createElement("div");
        // nameDiv.setAttribute("data-email",JSON.stringify({name:msg.name,email:msg.email}));
        nameDiv.style.cssText="margin:auto;display:flex;flex-direction;column;align-items:center;justify-content:center;flex:1 1 40%";
        const name=document.createElement("p");
        name.id="name_id";
        name.style.cssText="margin:auto;cursor:pointer";
        name.innerHTML=`<span style="color:red;font-weight:bold;">${msg.id}.) </span><span style="color:blue;">n:</span>${msg.name.slice(0,5)}...`;
        name.setAttribute("data-name",msg.name)
        nameDiv.appendChild(name);
        const email=document.createElement("p");
        email.id="email_id";
        email.style.cssText="margin:auto;text-decoration:underline;color:blue;cursor:pointer;";
        email.innerHTML=`${msg.email.slice(0,10)}...`;
        nameDiv.appendChild(email);
        const sent=document.createElement("input");
        sent.id="sent-checkbox";
        sent.type="checkbox";
        sent.checked=msg.sent;
        sent.style.cssText="border:1px solid blue;width:10px;height:10px;";
        sent.innerHTML=`${msg.email.slice(0,10)}...`;
        nameDiv.appendChild(sent);
        //message popup
        const message=document.createElement("p");
        message.style.cssText="justify-content:center;align-items:center;gap:1rem;flex-wrap:wrap;width:100%;padding-inline:0.75rem;padding-block:0.5rem;border-radius:12px;box-shadow:1px 1px 12px 1px black;position:absolute;top:-340%;background-color:white;padding-inline:0.5rem;margin-block:1rem;";
        message.innerHTML=`<span>click to reply to:</span><span>name: ${msg.name}</span><span>name: ${msg.email}</span>`;
        message.style.top="-340%";
        message.style.display="none";
        nameDiv.appendChild(message);
        nameDiv.onmouseover=(e:Event)=>{
            if(e){

                message.style.display="flex";
                message.animate([
                    {transform:"translateY(-210%) scale(0.5)",opacity:"0"},
                    {transform:"translateY(-340%) scale(1)",opacity:"1"},
                ],{duration:700,iterations:1});
            }
        };
        nameDiv.onmouseout=()=>{
            // message.style.top="-210%";
            message.animate([
                {transform:"translateY(-340%) scale(1)",opacity:"1"},
                {transform:"translateY(-210%) scale(0.5)",opacity:"0"},
            ],{duration:700,iterations:1});
           setTimeout(()=>{message.style.display="none";},680);
        };
        //message popup
        //appending NAME && EMAIL TO LEFT
        left.appendChild(nameDiv);
        //APPENDING DIV TO CARD
        card.appendChild(left);
        //MESSAGE BODY
        const commentDiv=document.createElement("div");
        commentDiv.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1 1 60%;cursore:pointer";
        const cssStyle={fontSize:"10px",padding:"2px",color:"yellow",borderRadius:"50%"};
        const rowCssStyle={backgroundColor:"black",borderRadius:"5px"};
        Misc.starRating({parent:commentDiv,rating:msg.rate,cssStyle,rowCssStyle});
        const comment=document.createElement("p");
        comment.style.cssText="margin:auto; text-wrap:wrap;";
        comment.textContent=msg.msg;
        //APPENDING MSG to card
        commentDiv.appendChild(comment);
        card.appendChild(commentDiv);
        //APPENDING CARD TO COLRIGHT
        colRight.appendChild(card)
        this.deleteMsg(colRight,user,msg);
        Misc.matchMedia({parent:nameDiv,maxWidth:500,cssStyle:{flex:"1 1 100%"}});
        Misc.matchMedia({parent:commentDiv,maxWidth:500,cssStyle:{flex:"1 1 100%"}});
        Misc.matchMedia({parent:card,maxWidth:500,cssStyle:{flexDirection:"column"}});
        Misc.fadeIn({anchor:card,xpos:20,ypos:0,time:400});
        email.onclick=(e:MouseEvent)=>{
            if(e){
                const sendEmail:sendEmailMsgType={user_id:user.id,messageId:msg.id as number,viewerEmail:msg.email,viewerName:msg.name,msg:""}
                this.sendEmail({colRight:colRight,user:user,message_:msg,sendEmail:sendEmail})
            }
        };
        commentDiv.onclick=(e:MouseEvent)=>{
            if(e){
                this.classMsg.viewCard({parent:colRight,msg});
            }
        };
    }
    deleteMsg(colRight:HTMLElement,user:userType,msg:messageType){
        colRight.style.position="relative";
        colRight.style.zIndex="2";
        const xDivIcon=document.createElement("div");
        xDivIcon.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-4px,-4px);width:30px;height:30px;border-radius:50%;background:black; box-shadow:1px 1px 12px 1px black;";
        FaCreate({parent:xDivIcon,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"28px"}})
        colRight.appendChild(xDivIcon);
        xDivIcon.onclick=(e:MouseEvent)=>{
            if(e){

                this.deleteMsgWarning(colRight,user,msg);
            }
        };
    }
    deleteMsgWarning(colRight:HTMLElement,user:userType,msg:messageType){
        colRight.style.zIndex="200";
        colRight.style.position="relative";
        const popup=document.createElement("div");
        popup.id="popup-warning-delete";
        popup.style.cssText='margin-inline:auto;position:absolute;backdrop-filter:blur(10px);background:black; box-shadow:1px 1px 12px 1px black;width:275px;height:auto;display:flex;flex-direction:column;place-items:center;border-radius:12px;min-height:80px;';
        const text=document.createElement("h6");
        text.className="text-light text-center text-decoration-underline lean display-6";
        text.textContent=`delete ${msg.name} ?`;
        popup.appendChild(text);
        const div=document.createElement("div");
        div.style.cssText="width:100%,height:100%;background-color:rgba(8, 4, 249,0.5);color:white; box-shadow:1px 1px 12px 1px black;display:flex;justify-content:space-around;align-items:center;";
        const {button:close}=Misc.simpleButton({anchor:div,bg:Nav.btnColor,color:"white",text:"close",type:"button",time:400});
        const {button:del}=Misc.simpleButton({anchor:div,bg:"red",color:"white",text:"delete",type:"button",time:400});
        close.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    colRight.removeChild(popup);
                },390);
            }
        };
        del.onclick=(e:MouseEvent)=>{
            if(e){
                this._service.deleteMessage(msg.id as number).then(async(res)=>{
                    if(res && res.id){
                        this.msgs.map((msg,index)=>{
                            if(msg.id===msg.id){
                                this._messages.splice(index,1);
                            }
                        });
                       
                        if(this.msgs){
                            this.msgs.map(_msg=>{
                                if(_msg){
                                    this.msgRightCard(colRight,user,_msg);
                                }
                            });
                        }
                        Misc.message({parent:colRight,type_:"success",msg:"REMOVED",time:700});
                    }else{
                        Misc.message({parent:colRight,type_:"error",msg:"was not deleted",time:1000});
                    }
                });
                Misc.fadeOut({anchor:popup,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    colRight.removeChild(popup);
                },390);
            }
        };
        popup.appendChild(div);
        colRight.appendChild(popup);

    }
    sendEmail(item:{colRight:HTMLElement,user:userType,message_:messageType,sendEmail:sendEmailMsgType}){
        const {colRight,user,sendEmail,message_}=item;
        //msgCard(colRight,user,msg)
        //sendEmailMsgType=>{user_id,userEmail,message}
        const form=document.createElement("form");
        form.style.cssText="position;absolute;inset:0%;background-color:white;border-radius:12px;padding:1rem;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:200;gap:1.5rem;margin-block:1.25rem;";
        const {label,textarea}=Nav.textareaComponent(form);
        textarea.name="message";
        label.textContent="send message";
        textarea.id="send-msg";
        textarea.placeholder="type your message";
        label.setAttribute("for",textarea.id);
        textarea.cols=50;
        textarea.rows=4;
        const {button}=Misc.simpleButton({anchor:form,type:"submit",bg:Nav.btnColor,color:"white",text:"send",time:400});
        button.disabled=true;
        colRight.appendChild(form);
        //DELETE
        const divx=document.createElement("div");
        FaCreate({parent:divx,name:FaCrosshairs,cssStyle:{color:"red",fontSize:"16px"}});
        divx.style.cssText="position:absolute;top:0%;right:0%;width:18px;height:18px;border-radius:50%;background:black;z-index:200;transform:translate(4px,4px);";
        label.appendChild(divx);
        divx.onclick=(e:MouseEvent)=>{
            if(e){
                colRight.removeChild(form);
            }
        };
        //DELETE
        Misc.growIn({anchor:form,scale:0,opacity:0,time:400});
        textarea.onchange=(e:Event)=>{
            if(e){
                button.disabled=false;
            }
        };
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const message=formdata.get("message");
                if(message){
                    sendEmail.msg=message as string;
                    this._service.respondEmail(sendEmail).then(async(res)=>{
                        console.log("res",res)
                        if(res && res.msg==="sent"){
                            Misc.message({parent:colRight,type_:"success",msg:res.msg,time:700});
                            Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                            setTimeout(()=>{
                                colRight.removeChild(form);
                            },398);
                            this.msgs.map((mess,index)=>{
                                if(mess && mess.id===message_.id){
                                    this._messages.splice(index,1);
                                }
                            });
                            let _message=message_;
                            _message={..._message,sent:true};
                            this._messages=[...this._messages,_message];
                            Header.cleanUp(colRight);
                            this._messages.map(_msg=>{
                                if(_msg){
                                    this.msgRightCard(colRight,user,_msg)
                                }
                            });
                        }else{
                            Misc.message({parent:colRight,msg:res && res.msg ? res.msg as string :"was not sent",time:1200,type_:"error"})
                        }
                    }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
                }
            }
        };
    }
    async showBlog(item:{mainRow:HTMLElement,innerRow:HTMLElement,blog:blogType,index:number}){
        const {mainRow,innerRow,blog,index}=item;
            ProfileMain.cleanUpByID(innerRow,`div#column-${blog.id}`);
            const flex=window.innerWidth < 900 ? (window.innerWidth < 410 ? "none":"1 0 50%") :"1 0 33%";
            const col=document.createElement("div");
            // console.log("index",index)//works
            col.id=`column-${blog.id}`;
            col.className="";
            col.style.cssText=`box-shadow:1px 1px 12px white;border-radius:12px;flex:${flex};`;
            const card=document.createElement("div");
            card.id=`showBlog-card-${blog.id}`;
            card.style.cssText=`margin:auto;display:flex;flex-direction:column;background-color:${this.btnColor};color:white;width:100%;border-radius:12px;`;
            const filename=document.createElement("h6");
            filename.className="text-center text-light lean display-6";
            filename.textContent=blog.title ? blog.title : " no title";
            //APPENDING FILENAME TO CARD
            card.appendChild(filename);
            const innerCard=document.createElement("div");
            innerCard.style.cssText="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;";
            const img=document.createElement("img");
            if(blog.imgKey){
                const imgs3= await this._service.getSimpleImg(blog.imgKey) as gets3ImgKey | null;
                if(imgs3){
                    img.src=imgs3.img;
                }
            }else{
                img.src=this.logo;
            }
            img.alt=blog.name ? blog.name:"www.ablogroom.com";
            img.style.cssText="max-width:122px;box-shadow:1px 1px 6px 1px white,-1px -1px 6px 1px #9cd3c7;";
            if(blog.attr==="circle"){
                img.style.borderRadius="50%";
                img.style.aspectRatio="1 / 1";
            }else if(blog.attr==="square"){
                img.style.borderRadius="12px";
            }
            const desc=document.createElement("p");
            desc.style.cssText="padding-inline:1rem;margin:1rem;";
            desc.textContent=blog.desc ? `${blog.desc.slice(0,70)}....` : " no description ";
            //APPENDING IMG TO INNERCARD
            innerCard.appendChild(img);
            //APPENDING DESCTO INNERCARD
            innerCard.appendChild(desc);
            //APPENDING innerCard to Card
            card.appendChild(innerCard);
            //APPENDING CARD TO COL
            col.appendChild(card);
            //APPENDING COL TO ROW;
            innerRow.appendChild(col);
            this.showOnline({parent:col,show:blog.show});
            Misc.matchMedia({parent:col,maxWidth:900,cssStyle:{"flex":"1 0 50%"}});
            Misc.matchMedia({parent:col,maxWidth:412,cssStyle:{"flex":"1 0 100%"}});
            const btn=buttonReturn({parent:card,text:"option",bg:this.btnColor,color:"white",type:"button"});
            btn.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    this.viewChoice({mainRow,innerRow,col,card,blog,index});
                    
                }
            });
           
    }
    showOnline(item:{parent:HTMLElement,show:boolean}){
        const {parent,show}=item;
        if(show){
            parent.style.position="relative";
            parent.style.zIndex="1";
        const popup=document.createElement("div");
        popup.id="showOnline-popup";
        popup.className="popup";
        popup.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-8px,-8px);width:36px;height:36px;background:black;z-index:200;border-radius:50%;display:flex;justify-content:center;align-items:center;";
        FaCreate({parent:popup,name:FaSignal,cssStyle:{fontSize:"32px",color:"white",margin:"auto"}});
        parent.appendChild(popup);
        }

    }
    noBlogs(row:HTMLElement){
        const col=document.createElement("div");
        col.style.cssText=`display:block;margin-inline:auto;background-color:${this.btnColor};color:white;flex:1 1 100%;`;
        const para=document.createElement("p");
        para.innerHTML=" <span> sorry you have no blogs in the database.</span><span> all your blogs will be shown here with the priviledge of taking them live</span>,<span> if requested.Once ypu have blogs</span>,<span> you can remove them from the live site or have a one-click publish for your viewers.</span> <pre> Gary Wallace</pre>.";
        col.appendChild(para);
        row.appendChild(col);

    }
    async showFinalWork(grandRow:HTMLElement,blog:blogType){
        const popup=document.createElement("section");
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        grandRow.style.width="100%";
        popup.id="profile-show-final-work-popup";
        popup.style.cssText="position:absolute;background:white;width:100%;height:auto;z-index:200;overflow-y:scroll;"
        popup.style.inset=less900 ? (less400 ? "0% 0% 40% 0%" : "0% 0% 50% 0%") : "0%";
        const container=document.createElement("div");
        container.id="profile-show-final-work-container";
        container.className="profile-show-final-work-container";
        container.style.cssText=blog.cssText ? blog.cssText :"margin-inline:auto;display:flex;flex-direction:column;align-items:center;width:100%;margin-block:2rem;";
        container.id="blog-work"
        //META
        
        //APPENDING container to popup
        popup.appendChild(container);
        //APPENDING POPUPU TO GRANDROW
        grandRow.appendChild(popup);
        await this._displayBlog.saveFinalWork({outerContainer:container,innerContainer:container,blog});
        Misc.fadeIn({anchor:popup,xpos:50,ypos:100,time:400});
        const btnGrp=document.createElement("div");
        btnGrp.classList.add("profile-showFinalWork-btnGrp");
        btnGrp.id="profile-showFinalWork-btnGrp";
        btnGrp.style.cssText="display:flex;justify-content:spaced-around;align-items:center;"
        const close=buttonReturn({parent:btnGrp,text:"close",bg:this.btnColor,color:"white",type:"button"});
        const edit=buttonReturn({parent:btnGrp,text:"edit",bg:this.btnColor,color:"white",type:"button"});
        const del=buttonReturn({parent:btnGrp,text:"delete",bg:"red",color:"white",type:"button"});
        popup.appendChild(btnGrp);
        close.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                // Profile.cleanUpByID(parent,"div#final-work");
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                setTimeout(()=>{
                    grandRow.removeChild(popup);
                },380);
               
            }
        });
        edit.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                // Profile.cleanUpByID(parent,"div#final-work");
                this._modSelector._blog={} as blogType;
                this._modSelector._blog={...blog,eleId:"main"};
                this._modSelector.selectors=blog.selectors;
                this._modSelector.elements=blog.elements;
                this._modSelector.selectCodes=blog.codes;
                this._modSelector.blog=blog;
                const maxCount=ModSelector.maxCount(blog);
                localStorage.setItem("placement",String(maxCount));
                localStorage.setItem("blog",JSON.stringify(this._modSelector._blog));
                const user=this._user.user;
                localStorage.setItem("user_id",user.id);
                localStorage.setItem("email",user.email);
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                setTimeout(()=>{
                    grandRow.removeChild(popup);
                    const url=new URL(window.location.href);
                    const newUrl=new URL("/editor",url.origin);
                    window.location.href=newUrl.href;
                },380);
                
            }
        });
        del.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                const getColumn=grandRow.querySelector(`div#column-${blog.id}`) as HTMLElement | null;
                const getInnerRow=grandRow.querySelector(`div#user-blogs`) as HTMLElement | null;
                if(!(getColumn && getInnerRow)) return;
                this.verifyDeleteFinaleShow(grandRow,popup,getInnerRow,getColumn,blog)
               
            }
        });
    }
    viewChoice(item:{mainRow:HTMLElement,innerRow:HTMLElement,col:HTMLElement,card:HTMLElement,blog:blogType,index:number}){
        const {mainRow,innerRow,col,card,blog,index}=item;
        ProfileMain.cleanUpByID(card,`div#choice`);
        let liveOnOff:HTMLButtonElement;
        col.style.position="relative";
        col.style.zIndex="";
        const popup=document.createElement("div");
        popup.id="choice";
        popup.style.cssText="position:absolute;z-index:200;backdrop-filter:blur(4px);display:flex;justify-content:space-around;flex-direction:row;flex-wrap:wrap;";
        popup.style.inset="20% 0% 65% 0%";
        //APPENDING POPUP TO ROW
        col.appendChild(popup);
        Misc.fadeIn({anchor:popup,xpos:100,ypos:50,time:400});
        const viewBtn=buttonReturn({parent:popup,color:"white",bg:"#0C090A",type:"button",text:"VIEW BLOG"});
        const delBtn=buttonReturn({parent:popup,color:"white",bg:"#FFA500",type:"button",text:"DELETE?"});
        const cancel=buttonReturn({parent:popup,color:"black",bg:"aquamarine",type:"button",text:"CANCEL BTNS?"});
        const editmetaBtn=buttonReturn({parent:popup,color:"white",bg:"rgba(10, 35, 81,0.5)",type:"button",text:"EDIT META"});
        if(blog.show){
            liveOnOff=buttonReturn({parent:popup,color:"white",bg:"#00FF00",type:"button",text:"GO-OFFLINE"});
        }else{
            liveOnOff=buttonReturn({parent:popup,color:"white",bg:"#FF00FF",type:"button",text:"GO-LIVE"});
        }
        liveOnOff.addEventListener("click",(e:MouseEvent)=>{
            if(e){
               
                this.promLiveonoff(card,blog).then(async(res)=>{
                    if(res && res.blogs){
                        if(res.show){
                        Misc.message({parent:card,msg:"your blog is active",type_:"success",time:400});
                        }else{
                            Misc.message({parent:card,msg:"your blog is offline",type_:"success",time:400});
                        }
                        //redue view
                       res.blogs.map(_blog=>{
                            if(_blog){
                                this.showBlog({mainRow,innerRow,blog:_blog,index});
                            }
                        });
                    }
                }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg);Misc.message({parent:card,msg:msg,type_:"error",time:700})});
            }
        });
        viewBtn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                const blog_id=blog.id;
                    this._service.getBlog(blog_id as number).then(async(blog:blogType)=>{
                        if(blog && ProfileMain.main){
                            localStorage.setItem("blog",JSON.stringify(blog));
                            const max_=ModSelector.maxCount(blog);
                            localStorage.setItem("placement",String(max_));
                            this._modSelector.loadBlog(blog);
                            ProfileMain.cleanUpByID(mainRow,"section#show-final-popup");
                            await this.showFinalWork(mainRow,blog);
                            Misc.fadeOut({anchor:popup,xpos:100,ypos:50,time:400});
                            setTimeout(()=>{
                                col.removeChild(popup);
                            },380);
                        }
                    }).catch((msg:string)=>{Misc.message({parent:card,msg:msg,type_:"error",time:700});console.error(msg)});
            }
        });
        editmetaBtn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.editMeta({mainRow,blog:blog});
                Misc.fadeOut({anchor:popup,xpos:100,ypos:50,time:400});
                setTimeout(()=>{
                    col.removeChild(popup);
                },380);
            }
        });
        delBtn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.verifyDeleteChoice({mainRow,innerRow,col,blog});
            }
        });
        cancel.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:100,ypos:50,time:400});
                setTimeout(()=>{
                    col.removeChild(popup);
                },380);
            }
        });



    }
   async promLiveonoff(card:HTMLElement,blog:blogType):Promise<void | {blogs: blogType[],show: boolean} | undefined>{
        //THE SERVER CHANGES THE SHOW LOGIC
        return this._service.liveonoff(blog).then(async(blog_)=>{
            if(blog_){
                const show=blog_.show;
                blog={...blog,show:show};
                this._modSelector._blog=blog;
                const reduce=this._modSelector._blogs.filter(bl=>(bl.id !==blog.id));
                this._modSelector._blogs=[...reduce,blog];
                this._user.blogs=this._modSelector._blogs;
                return {blogs:this._user.blogs,show:blog_.show}
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg);Misc.message({parent:card,msg:msg,type_:"error",time:700})});
    }

    verifyDeleteChoice(item:{mainRow:HTMLElement,innerRow:HTMLElement,col:HTMLElement,blog:blogType}){
        const {mainRow,innerRow,col,blog}=item;
        Header.cleanUpByID(col,"verifyDeleteChoice");
        const popup=document.createElement("div");
        popup.id="verifyDeleteChoice";
        popup.style.cssText="position:absolute;inset:0% 0% 50% 0%;z-index:2000;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:1.5rem;border-radius:15px;box-shadow:1px 1px 12px 1px black;background-color:black;color:white;";
        const text=document.createElement("h6");
        text.textContent="delete blog?";
        text.className="text-primary text-center text-decoration-underline text-underline-offset-3";
        popup.appendChild(text);
        const btnGrp=document.createElement("div");
        btnGrp.style.cssText="margin-inline:auto;display:flex;justify-content:space-around;align-items:center;margin-block:2rem;width:100%;"
        const {button:del}=Misc.simpleButton({anchor:btnGrp,text:"delete?",type:"button",time:400,bg:"red",color:"white"});
        const {button:cancel}=Misc.simpleButton({anchor:btnGrp,text:"cancel",type:"button",time:400,bg:Nav.btnColor,color:"white"});
        popup.appendChild(btnGrp);
        col.appendChild(popup);
        col.appendChild(popup);
        cancel.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:col,xpos:100,ypos:50,time:400});
                setTimeout(()=>{
                    col.removeChild(popup);
                },380);
            }
        };
        del.onclick=async(e:MouseEvent)=>{
            if(e){
                await this._service.deleteBlog(blog).then(async(res)=>{
                    if(res){
                        this._modSelector._blogs=this._modSelector._blogs.filter(bl=>(bl.id !==blog.id));
                        this._user.blogs=this._modSelector.blogs;
                        const remainderBlogs=this._modSelector.blogs;
                        Misc.message({parent:mainRow,msg:`deleted id=${blog.id}`,type_:"success",time:600});
                        setTimeout(()=>{
                            Misc.fadeOut({anchor:col,xpos:100,ypos:50,time:400});
                            setTimeout(()=>{
                                innerRow.removeChild(col);
                            },380);
                        },580);
                        const arrimgs=ModSelector.getAllImgKeys(blog);
                        const ids=arrimgs.map(ar=>(ar.id));
                        Misc.message({parent:mainRow,msg:`marked: ${JSON.stringify(ids)} as delete`,type_:"success",time:1000});
                        remainderBlogs.map((blog_,index)=>{
                            if(blog_){
                                this.showBlog({mainRow,innerRow,blog:blog_,index})
                            }
                        });
                    }
                }).catch((err)=>{Misc.message({parent:mainRow,msg:err,type_:"error",time:700})});
                Misc.fadeOut({anchor:col,xpos:100,ypos:50,time:400});
                setTimeout(()=>{
                    col.removeChild(popup);
                },380);
            }
        };
    }
    verifyDeleteFinaleShow(grandRow:HTMLElement,parentPopup:HTMLElement,innerRow:HTMLElement,col:HTMLElement,blog:blogType){
        Header.cleanUpByID(col,"verifyDeleteFinalShow");
        const popup=document.createElement("div");
        popup.id="verifyDeleteFinalShow"
        popup.style.cssText="position:absolute;inset:0% 0% 50% 0%;z-index:2000;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:1.5rem;border-radius:15px;box-shadow:1px 1px 12px 1px black;background-color:black;color:white;";
        const text=document.createElement("h6");
        text.textContent="delete blog?";
        text.className="text-primary text-center text-decoration-underline text-underline-offset-3";
        popup.appendChild(text);
        const btnGrp=document.createElement("div");
        btnGrp.style.cssText="margin-inline:auto;display:flex;justify-content:space-around;align-items:center;margin-block:2rem;width:100%;"
        const {button:del}=Misc.simpleButton({anchor:btnGrp,text:"delete?",type:"button",time:400,bg:"red",color:"white"});
        const {button:cancel}=Misc.simpleButton({anchor:btnGrp,text:"cancel",type:"button",time:400,bg:Nav.btnColor,color:"white"});
        popup.appendChild(btnGrp);
        col.appendChild(popup);
        Misc.fadeIn({anchor:popup,xpos:100,ypos:50,time:400});
        cancel.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:col,xpos:100,ypos:50,time:400});
                setTimeout(()=>{
                    col.removeChild(popup);
                },380);
            }
        };
        del.onclick=async(e:MouseEvent)=>{
            if(e){
                await this._service.deleteBlog(blog).then(async(res)=>{
                    if(res){
                        this._modSelector._blogs=this._modSelector._blogs.filter(bl=>(bl.id !==blog.id));
                        this._user.blogs=this._modSelector.blogs;
                        const remainderBlogs=this._modSelector.blogs;
                        Misc.message({parent:grandRow,msg:`deleted id=${blog.id}`,type_:"success",time:600});
                        setTimeout(()=>{
                            Misc.fadeOut({anchor:col,xpos:100,ypos:50,time:400});
                            Misc.fadeOut({anchor:parentPopup,xpos:100,ypos:50,time:400});
                            setTimeout(()=>{
                                innerRow.removeChild(col);
                                grandRow.removeChild(parentPopup);
                            },380);
                        },580);
                        const arrimgs=ModSelector.getAllImgKeys(blog);
                        const ids=arrimgs.map(ar=>(ar.id));
                        Misc.message({parent:grandRow,msg:`marked: ${JSON.stringify(ids)} as delete`,type_:"success",time:1000});
                        remainderBlogs.map((blog_,index)=>{
                            if(blog_){
                                this.showBlog({mainRow:grandRow,innerRow,blog:blog_,index})
                            }
                        });
                    }
                }).catch((err)=>{Misc.message({parent:grandRow,msg:err,type_:"error",time:700})});
                Misc.fadeOut({anchor:col,xpos:100,ypos:50,time:400});
                setTimeout(()=>{
                    col.removeChild(popup);
                },380);
            }
        };
    }
    promGetmsgs(user:userType){
        return this._service.getUserMessages(user.id).then(async(msgs:messageType[])=>{
            if(msgs){
                this.msgs=msgs;
                return msgs;
            }
        }) as Promise<messageType[]>;
    }
    async editMeta(item:{mainRow:HTMLElement,blog:blogType}){
        const {mainRow,blog}=item;
        const user=this._user.user;
        const isSelects=(blog && blog.selectors && blog.selectors.length>0)? true:false;
        const isElements=(blog && blog.elements && blog.elements.length>0)? true:false;
        if(!(isSelects && isElements)){
            this._service.getUserBlog({user_id:user.id,blog_id:blog.id}).then(async(resBlog)=>{
                if(resBlog && !(typeof(resBlog)==="string") ){
                    this._modSelector.blog=resBlog;
                    const container=document.createElement("div");
                    container.id="profile-editMeta-main";
                    container.style.cssText="position:relative;z-index:3;display:flex;justify-content:space-around;flex-direction:column;width:80%;background-color:white;box-shadow:1px 1px 12px 1px black;height:70vh;overflow-y:scroll;border-radius:12px;";
                    container.style.inset="20% 0% 65% 0%";
                    const {button:saveClose}=Misc.simpleButton({anchor:container,bg:Nav.btnColor,color:"white",text:"close",type:"button",time:400});
                    mainRow.appendChild(container);
                    this.removeChild(mainRow,container);
                    this._metaBlog.metablog({grandParent:mainRow,parent:container,blog:resBlog,type:"profile"});
                    saveClose.onclick=(e:MouseEvent)=>{
                        if(e){
                            Misc.growOut({anchor:container,scale:0,opacity:0,time:400});
                            setTimeout(()=>{mainRow.removeChild(container)},390);

                        }
                    };
                }
            });
        
    }
        


    }
    async userposts(item:{mainRow:HTMLElement,user:userType,cols:number,posts:postType[]}){
        const {mainRow,user,cols,posts}=item;
        const css_row="display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;position:relative;padding-block:2rem;";
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const section =document.createElement("section");
        section.id="userposts-section";
        section.style.cssText=css_row + "width:100%;";
        section.className="col-md-12 row";
        mainRow.appendChild(section);
        const scrollCol1=document.createElement("div");
        scrollCol1.id="scrollCol1";
        scrollCol1.style.cssText="height:400px;overflow-y:scroll;display:flex;flex-direction:column;align-items:center;width:100%;position:relative;";
        scrollCol1.className=`col-md-${12/cols}`;
        section.appendChild(scrollCol1);
        const displayCol2=document.createElement("div");
        displayCol2.style.cssText="height:inherit;min-height:5vh;margin-block:1rem;display:flex;flex-direction:column;align-items:center;width:100%;position:relative;";
        if(less900){
            section.style.flexDirection="row";
            scrollCol1.style.flex="0 0 46%";
            displayCol2.style.flex="0 0 46%";
            if(less400){
                section.style.flexDirection="column";
                scrollCol1.style.flex="0 0 100%";
                displayCol2.style.flex="0 0 100%";
            };
        }else{
            section.style.flexDirection="row";
            scrollCol1.style.flex="0 0 50%";
            displayCol2.style.flex="0 0 50%";
        };
        const labelDisplay2=document.createElement("p");
        labelDisplay2.id="labelDisplay2";
        labelDisplay2.style.cssText="position:absolute;z-index:200;background-color:black;color:white;font-Family:'Poppins-Thin';font-weight:800;font-size:180%;padding-inline:6rem;padding-block:1.5rem;border-radius:42px;box-shadow:1px 1px 12px 1px blue;display:flex;justify-content:center;align-items:center;";
        const {button:createPost}=Misc.simpleButton({anchor:labelDisplay2,bg:"#002380",color:"white",text:"create post",time:400,type:"button"});
        createPost.onclick=(e:MouseEvent)=>{
            if(e){
                displayCol2.style.height="400px";
                displayCol2.style.width="100%";
                this.createPost({displayCol2:displayCol2,scrollCol1,user});
                labelDisplay2.hidden=true;
            }
        };
        labelDisplay2.hidden=false;
        const span=document.createElement("span");
        span.style.cssText="text-align:center;margin-inline:auto;padding-left:2rem";
        span.textContent="Edit-panel";
        labelDisplay2.appendChild(span);
        displayCol2.appendChild(labelDisplay2);
        displayCol2.className=`col-md-${12/cols}`;
        displayCol2.id="displayCol2";
        section.appendChild(displayCol2);
        Misc.growIn({anchor:scrollCol1,scale:1,opacity:0,time:500});
        // Misc.matchMedia({parent:section,maxWidth:900,cssStyle:{flexDirection:"column",flexWrap:"noWrap"}});
        Misc.matchMedia({parent:scrollCol1,maxWidth:900,cssStyle:{flex:"0 0 100%",order:"-1"}});
        Misc.matchMedia({parent:displayCol2,maxWidth:900,cssStyle:{flex:"0 0 100%",order:"2"}});
            if(posts && posts.length>0){
                this._user.user.posts=posts;
                posts.map(async(post,index)=>{
                    if(post){
                        const col1=document.createElement("div");
                        // col1.className=`col-md-${12/cols}`;
                        col1.id=`posts-col1-${index}`;
                        col1.style.cssText="margin-inline:auto;display:flex;flex-direction:column;align-items:center;gap:0.75rem;flex:0 0 50%;background-color:#098ca091;color:white;border-radius:12px;";
                        scrollCol1.appendChild(col1);
                        const getCol1=scrollCol1.querySelector(`div#posts-col1-${index}`) as HTMLElement;
                        
                        this.postCard({scrollCol1,col:col1,post,user:user,index}).then(async(res_)=>{
                            if(res_){
                                res_.card.onclick=(e:MouseEvent)=>{
                                    if(e){
                                        labelDisplay2.hidden=true;
                                        this.editPost({parent:section,col1:col1,displayCol2:displayCol2,post,user,index});
                                        col1.style.border="1px solid red";
                                    }
                                };
                            }
                        });
                       
                        
                    }
                });

            }else{
                scrollCol1.style.height="auto";
                this.noPosts({scrollCol1})
            }

    };
    noPosts(item:{scrollCol1:HTMLElement}){
        const {scrollCol1}=item;
        const container=document.createElement("div");
        container.id="noPosts-container";
        container.style.cssText="padding:1.5rem;background-color:white;display:flex;place-items:center;border-radius:12px;";
        const para=document.createElement("p");
        para.style.cssText="padding:0.5rem;background-color:white";
        para.textContent="  you have no posts. Press create post to creat a post."
        container.appendChild(para);
        scrollCol1.appendChild(container);
    }
    async postCard(item:{scrollCol1:HTMLElement,col:HTMLElement,post:postType,user:userType,index:number}):Promise<{card:HTMLElement}>{
        const {scrollCol1,col,post,user,index}=item;
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
        shapeOutside.style.cssText="padding:1rem;text-wrap:wrap;color:black;font-family:'Poppins-Thin';font-weight:bold;font-size:120%;line-height:2.05rem;color:inherit;";
        const img=document.createElement("img");
        img.src=this.logo;
        img.alt="www.ablogroom.com";
        img.style.cssText="border-radius:50%;filter:drop-shadow(0 0 0.75rem white);max-width:250px;shape-outside:circle(50%);float:left;margin-right:1.25rem;margin-bottom:2rem;aspect-ratio:1/1;";
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
        card.appendChild(cardBody);
        col.appendChild(card);
        await this.removePost({parent:scrollCol1,target:col,post,index}).then(async(res)=>{
            if(res){
                res.xDiv.onclick=(e:MouseEvent) =>{
                    if(e){
                        const getCol=scrollCol1.querySelector(`div#${res.target.id}`) as HTMLElement;
                        //res.parent===scrollCol1
                        this.askToDelete({scrollCol1:res.parent,target:getCol,post:res.post,user});
                    }
                };
            }
        });
        Misc.growIn({anchor:card,scale:1,opacity:0,time:500});
        return {card}
       
    }
    editPost(item:{parent:HTMLElement,displayCol2:HTMLElement,col1:HTMLElement,post:postType,user:userType,index:number}){
        const {parent,col1,displayCol2,post,user,index}=item;
        const labelDisplay2=displayCol2.querySelector("div#labelDisplay2") as HTMLElement;
        if(labelDisplay2){
            labelDisplay2.hidden=true;
        }
        Header.cleanUpByID(displayCol2,`editPost-container-${post.id}`);
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.7rem;";
        displayCol2.style.position="relative";
        const container=document.createElement('div');
        container.id=`editPost-container-${post.id}`;
        container.style.cssText="width:100%;border-radius:12px;box-shadow:1px 1px 12px 1px #0CAFFF;padding:7px;z-index:1000;";
        displayCol2.appendChild(container);
        //-------DELETE----------//
        const xDiv=document.createElement("div");
        xDiv.style.cssText=css_row + "position:absolute;padding:0.37rem;background:black;color:white;top:0%;right:0%;transform:translate(-12px,12px);z-index:200;border-radius:50%;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"22px"}});
        container.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent) =>{
            if(e){
                Misc.growOut({anchor:container,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    displayCol2.removeChild(container);
                    const getlabelDisplay2=displayCol2.querySelector("p#labelDisplay2") as HTMLElement;
                    getlabelDisplay2.hidden=false;
                },390);
            }
        };
        //-------DELETE----------//
        const form=document.createElement('form');
        form.id=`post-form-${post.id}`;
        form.style.cssText=css_col +"color:white;width:100%";
        container.appendChild(form);
        Misc.growIn({anchor:container,scale:0,opacity:0,time:400});
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
        link.value=post.link? post.link : "";
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
                    this._post.post={...post,title:title as string,content:content as string,published:Boolean(pub),link:link};
                   await this._service.saveUpdatepost({post:this._post.post}).then(async(res)=>{
                    //    if(res){
                            
                            const getContainer=displayCol2.querySelector(`div#editPost-container-${post.id}`) as HTMLElement;
                            if(getContainer){
                                Misc.growOut({anchor:getContainer,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    displayCol2.removeChild(getContainer);
                                    labelDisplay2.hidden=false;
                                    displayCol2.style.height="auto";
                                },390);
                                const getCol1=parent.querySelector(`div#${col1.id}`) as HTMLElement;
                                this.postCard({scrollCol1:parent,col:getCol1,post:this._post.post,user,index:index});
                            }
                        // }
                    });

                }
            }
        };
    }
    createPost(item:{displayCol2:HTMLElement,scrollCol1:HTMLElement,user:userType}){
        const {displayCol2,scrollCol1,user}=item;
        // const parent=displayCol2.parentElement as HTMLElement;
        displayCol2.style.position="relative";
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;";
        Header.cleanUpByID(displayCol2,`createPost-popup`);
        const popup=document.createElement("div");
        popup.id=`createPost-popup`;
        popup.style.cssText=css_col + "position:absolute;width:375px;min-height:400px;gap:1rem;box-shadow:1px 1px 12px 1px blue;border-radius:12px;backdrop-filter:blur(20px);";
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
            displayCol2.appendChild(popup);
        }
        //-------DELETE----------//
        const xDiv=document.createElement("div");
        xDiv.id="xDiv-delete-createpost"
        xDiv.style.cssText=css_col + "position:absolute;padding:0.7rem;background:black;color:white;top:0%;right:0%;transform:translate(-12px,12px);border-radius:50%;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"22px",backgroundColor:"grey",borderradius:"50%",padding:"2px"}});
        popup.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent) =>{
            if(e){
                const labelDisplay2=displayCol2.querySelector("p#labelDisplay2") as HTMLElement;
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    displayCol2.removeChild(popup);
                    labelDisplay2.hidden=false;
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
                    this._post.post={...this._post.post,title:title as string,content:content as string,published:Boolean(pub),link}
                    this.uploadPic({displayCol2,popup:popup,scrollCol1,post:this._post.post,user});
                    const labelDisplay2=displayCol2.querySelector("div#labelDisplay2") as HTMLElement;
                    // const scrollCol1=document.querySelector("div#labelDisplay2") as HTMLElement;
                    if(labelDisplay2){
                        labelDisplay2.hidden=false;
                        labelDisplay2.style.height="auto";
                    }
                }
            }
        };
    }
    uploadPic(item:{displayCol2:HTMLElement,popup:HTMLElement,scrollCol1:HTMLElement,post:postType,user:userType}){
        const {user,post,displayCol2,popup,scrollCol1}=item;
        this._post.post={...post,userId:user.id};
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
                   await this._service.simpleImgUpload(displayCol2,formdata).then(async(res)=>{
                        if(res){
                            this._post.post={...this._post.post,imageKey:res.Key};
                            const labelDisplay2=displayCol2.querySelector("p#labelDisplay2") as HTMLElement;
                            const section=displayCol2.parentElement as HTMLElement;

                           await this._service.saveUpdatepost({post:this._post.post}).then(async(post_)=>{
                                if(post_){
                                    this._post.posts=[...this._post.posts,this._post.post];
                                    const len=this._post.posts ? this._post.posts.length :0;
                                    const col1=document.createElement("div");
                                    col1.id=`posts-col1-${len-1}`;
                                    col1.style.cssText="margin-inline:auto;display:flex;flex-direction:column;align-items:center;gap:0.75rem;flex:0 0 50%;background-color:#098ca091;color:white;border-radius:12px;";
                                    scrollCol1.appendChild(col1);
                                    this.postCard({scrollCol1:scrollCol1,col:col1,post:post_,user:user,index:len+1}).then(async(res_)=>{
                                        if(res_){
                                            res_.card.onclick=(e:MouseEvent)=>{
                                                if(e){
                                                    this.editPost({parent:section,col1:col1,displayCol2:displayCol2,post,user,index:len-1});
                                                    col1.style.border="1px solid red";
                                                }
                                            };
                                         
                                        }
                                    });
                                }
                                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    labelDisplay2.hidden=false;
                                    displayCol2.removeChild(popup);
                                    labelDisplay2.style.height="auto";
                                    displayCol2.style.height="auto";
                                },390);
                            });
                        }
                    });

                };
            }
        };
        popup.appendChild(form);
    }
    removePost(item:{parent:HTMLElement,target:HTMLElement,post:postType,index:number}):Promise<{xDiv:HTMLElement,parent:HTMLElement,target:HTMLElement,post:postType}>{
        const {parent,target,post,index}=item;
        Header.cleanUpByID(target,`delete-${index}`);
        target.style.position="relative";//need this
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.7rem;";
            const xDiv=document.createElement("div");
            xDiv.id=`delete-${index}`;
            xDiv.style.cssText=css_row + "position:absolute;padding:0.37rem;background:black;color:white;top:0%;right:0%;transform:translate(-18px,32px);z-index:200;border-radius:50%;";
            FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"22px"}});
            target.appendChild(xDiv);
            return new Promise(resolve=>{
                resolve({xDiv,parent,target,post})
            }) as Promise<{xDiv:HTMLElement,parent:HTMLElement,target:HTMLElement,post:postType}>;
        
    }
    removeChild(parent:HTMLElement,target:HTMLElement){
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.id="del-metablog-element";
        popup.className="popup";
        popup.style.cssText="background-color:black;color:white;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;height:26px;width:26pxborder-radius:50%;box-shadow:1px 1px 12px 1px black;top:0%;right:0%;transform:translate(-16px,8px);"
        FaCreate({parent:popup,name:FaCrosshairs,cssStyle:{width:"100%",fontSize:"22px",margin:"auto",color:"red",borderRadius:"50%"}});
        target.appendChild(popup);
        popup.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:target,xpos:100,ypos:50,time:400});
                setTimeout(()=>{parent.removeChild(target)},368);
            }
        };
    }
    askToDelete(item:{scrollCol1:HTMLElement,target:HTMLElement,post:postType,user:userType}){
        const {scrollCol1,target,post,user}=item;
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
                        this._post.posts.map((_post,ind)=>{
                            if(_post && _post.id===post.id){
                                this._post.posts.splice(ind,1);
                                this._post.posts=this._post._posts;
                               
                            }
                        });
                        const scrollCol1=document.querySelector("div#scrollCol1") as HTMLElement;
                        if(scrollCol1){
                            //MEANS DELETING FROM PROFILE: PROFILE SECTION IS USING THIS
                            Header.cleanUp(scrollCol1);
                            scrollCol1.style.height="auto";
                            if(this._post.posts && this._post.posts.length>0){

                                await Promise.all(this._post.posts.map(async(post,index)=>{
                                    if(post){
                                        const col1=document.createElement("div");
                                        // col1.className=`col-md-${12/cols}`;
                                        col1.id=`posts-col1-${index}`;
                                        col1.style.cssText="margin-inline:auto;display:flex;flex-direction:column;align-items:center;gap:0.75rem;flex:0 0 50%;background-color:#098ca091;color:white;border-radius:12px;";
                                        scrollCol1.appendChild(col1);
                                        await this.postCard({scrollCol1:scrollCol1,col:col1,post:post,user,index});
    
                                    }
                                }));
                            }else{
                                scrollCol1.style.height="auto";
                            }
                        }
                    }
                });

            }
        };


    }
    static cleanUpByID(parent:HTMLElement,query:string){
        const getElements=parent.querySelectorAll(query);
        if(getElements){
            ([...getElements as any] as Element[]).map(child=>{
                if(child){
                    parent.removeChild(child);
                }
            });
        }
    }

}
export default ProfileMain;
import {userType,userSignInType,blogType, flexType, elementType, element_selType, gets3ImgKey, colType, rowType, selectorType, arrImgType2, accountType, sessionType, saveProcessType} from "@/components/editor/Types";
import ModSelector from "../editor/modSelector";
import DisplayBlog from "../blog/displayBlog";
import Misc, { btnOptionMsgType, btnOptionType, btnOptionType2 } from "../common/misc";
import Service from "@/components/common/services";
import {msgType} from '@/components/common/misc';
import { getErrorMessage } from "@/lib/errorBoundaries";
import AuthService from "../common/auth";
import Main from "../editor/main";
import Header from "../editor/header";
import { btnType, button, buttonReturn } from "../common/tsFunctions";
import Edit from "../editor/edit";
import Nav from "../nav/headerNav";
import RegSignIn from "../nav/regSignin";

class UserSetups  {
    bgColor:string;
    btnColor:string;
        constructor(private _modSelector:ModSelector,private _service:Service){
            this.bgColor=this._modSelector._bgColor
            this.btnColor=this._modSelector.btnColor;
        }

        changeImage(targetContainer:HTMLElement,formdata:FormData|null):{targetContainer:HTMLElement,select:HTMLElement,mainTextarea:HTMLElement}{
            //Main.textarea.id=`textarea`;

            const mainTextarea=Main.textarea ? Main.textarea as HTMLElement : document.getElementById("textarea") as HTMLElement;
            Edit.cleanUpByID(targetContainer,"changeImage");
            targetContainer.style.position="relative";
            targetContainer.style.zIndex="0";
            const select=document.createElement("select");
            select.id="changeImage";
            select.className="box-shadow changeImage";
            select.style.cssText="position:absolute;top:90%;left:0px;font-size:10px;border-radius:18px;z-index:0;width:fit-content;height:fit-content;"
            select.value="remove";
            const arr=["select","remove","upload new","save"];
            const arrChange=formdata ? arr :arr.filter(st=>(st !=="save"));
            select.selectedIndex=1;
            arrChange.forEach(sel=>{
                const option=document.createElement("option");
                option.style.cssText="font-size:10px;";
                option.className="text-primary";
                option.value=sel;
                option.innerHTML=sel;
                select.appendChild(option);
               
            });
            select.selectedIndex=0;
            targetContainer.appendChild(select);
            return {targetContainer,select,mainTextarea}
        };

        imageForm(mainTextarea:HTMLElement,flex:flexType |null): {form:HTMLFormElement,mainTextarea:HTMLElement,flex:flexType|null}{
            const checkMain=mainTextarea.id==="textarea" ? mainTextarea : Main.textarea as HTMLElement;
            mainTextarea.style.position="relative";
            const css="border-radius:20px; box-shadow:1px 1px 4px 1px black;margin:auto;background:white;position:absolute;z-index:200";
            const form=document.createElement("form");
            form.id="image-form"
            form.className="form-group d-flex flex-column align-items-center gap-2";
            form.setAttribute("data-form-group","true");
            form.style.cssText=css;
            form.style.width="clamp(250px,400px,500px)";
            form.style.height="400px";
            form.style.top="5%";
            form.style.left="30%";
            form.style.right="30%";
            form.style.height="400px";
            form.style.width="clamp(250px,400px,500px)";
            form.style.cssText=css;
           
            // console.log("inside form")//works
            const label=document.createElement("label");
            label.textContent="add your logo";
            const input=document.createElement("input");
            input.className="form-control"
            input.type="file";
            input.name="file";
            input.accept="image/png image/jpg";
            const submit:btnType={
                parent:form,
                text:"submit",
                bg:this._modSelector.btnColor,
                color:"white",
                type:"submit"
            }
            form.appendChild(label);
            form.appendChild(input);
            button(submit);
            form.animate([
                {transform:"scale(0)",opacity:"0"},
                {transform:"scale(1)",opacity:"1"}
            ],{duration:750,iterations:1});
            checkMain.appendChild(form);
            Misc.matchMedia({parent:form,maxWidth:900,cssStyle:{left:"20%",right:"20%",top:"10%"}});
            Misc.matchMedia({parent:form,maxWidth:400,cssStyle:{left:"5%",right:"5%",top:"10%"}});
            // Header.removeEffect(grandParent,form);
            return {form,mainTextarea:checkMain,flex};
        }
        twoBtnSaveCancel(parent:HTMLElement,msgSv:string,msgOther:string){
            const div=document.createElement("div");
        div.style.cssText="margin-inline:auto;display:flex;place-items:center;"
        parent.style.position="relative";
        const uploadImg:btnOptionType2={
            btn_type2:"button",
            msg2:msgSv,
            btnColor2:"black",
            btnBgColor2:"#00BFFF",
            btnLabel2:"upload",
        }
        const notNow:btnOptionType={
            btn_type:"button",
            msg:msgOther,
            btnColor:"black",
            btnBgColor:"#0066b2",
            btnLabel:"no",
        }
        const btnGroup:btnOptionMsgType={
            button2:uploadImg,
            button1:notNow,
        }
        const btnGrp=Misc.btnOptionMessagePopup(div,btnGroup);
        return {retParent:parent,btnGrp,btnContainer:div}
        }

        blogForm(parent:HTMLElement):{retParent:HTMLElement,form:HTMLFormElement,popup:HTMLElement}{
            const popup=document.createElement("section");
            popup.style.cssText="position:absolute;inset:0;backdrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center; justify-content:center;gap:1rem;";
            popup.id="popup-blog-form";
            const form=document.createElement("form");
            form.style.cssText="margin-inline:auto;padding-inline:1rem;width:auto;display:flex;flex-direction:column;";
            const formGrp=document.createElement("div");
            formGrp.className="form-group mx-auto d-flex flex-column";
            const elabel=document.createElement("label");
            elabel.className="text-primary text-center mx-auto";
            elabel.textContent="email";
            elabel.setAttribute("for","email");
            const einput=document.createElement("input");
            einput.className="form-control";
            einput.type="email";
            einput.autocomplete="email";
            einput.id="email";
            einput.name="email";
            einput.pattern="[a-zA-Z0-9\.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}";
            formGrp.appendChild(elabel);
            formGrp.appendChild(einput);
            const formGrp1=document.createElement("div");
            formGrp1.className="form-group mx-auto d-flex flex-column";
            const plabel=document.createElement("label");
            plabel.className="text-primary text-center mx-auto";
            plabel.textContent="password";
            plabel.setAttribute("for","password");
            const pinput=document.createElement("input");
            pinput.className="form-control";
            pinput.type="password";
            pinput.name="password";
            formGrp1.appendChild(plabel);
            formGrp1.appendChild(pinput);
            form.appendChild(formGrp);
            form.appendChild(formGrp1);
            const btn =document.createElement("button");
            btn.style.cssText=`margin-block:2rem;background:${this.bgColor};color:white;border:1px solid white;padding-inline:2rem;padding-block:0.5rem;border-radius:25px;`;
            btn.className="btn";
            btn.type="submit";
            btn.textContent="signin";
            DisplayBlog.separator(form,this.bgColor);
            form.appendChild(btn);
            popup.appendChild(form);
            parent.appendChild(popup);
            popup.animate([
                {transform:"scale(0.3)",opacity:"0"},
                {transform:"scale(1)",opacity:"1"}
            ],{duration:600,iterations:1});
            return {retParent:parent,form,popup}
        }
        signInPopupSetup(parent:HTMLElement):{form:HTMLFormElement,textarea:HTMLElement,popup:HTMLElement} {
        const textarea=Main.textarea ? Main.textarea : parent;
        textarea.style.position="relative";
        textarea.style.zIndex="0";
        const popup=document.createElement("section");
        popup.style.cssText="position:absolute;backdrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center; justify-content:center;gap:1rem;width:clamp(350px,400px,500px);height:400px;";
        popup.style.top="10%";
        popup.style.left="35%";
        popup.style.right="35%";
        popup.id="signin-popup-setup";
        const form=document.createElement("form");
        form.style.cssText="margin-inline:auto;padding-inline:1rem;width:auto;display:flex;flex-direction:column;";
        const formGrp=document.createElement("div");
        formGrp.className="form-group mx-auto d-flex flex-column";
        const elabel=document.createElement("label");
        elabel.className="text-primary text-center mx-auto";
        elabel.textContent="email";
        elabel.setAttribute("for","email");
        const einput=document.createElement("input");
        einput.className="form-control";
        einput.type="email";
        einput.autocomplete="email";
        einput.id="email";
        einput.name="email";
        einput.pattern="[a-zA-Z0-9\.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}";
        formGrp.appendChild(elabel);
        formGrp.appendChild(einput);
        const formGrp1=document.createElement("div");
        formGrp1.className="form-group mx-auto d-flex flex-column";
        const plabel=document.createElement("label");
        plabel.className="text-primary text-center mx-auto";
        plabel.textContent="password";
        plabel.setAttribute("for","password");
        const pinput=document.createElement("input");
        pinput.className="form-control";
        pinput.type="password";
        pinput.name="password";
        pinput.autocomplete="on";
        formGrp1.appendChild(plabel);
        formGrp1.appendChild(pinput);
        form.appendChild(formGrp);
        form.appendChild(formGrp1);
        const btn =document.createElement("button");
        btn.style.cssText=`margin-block:2rem;background:${Nav.btnColor};color:white;border:1px solid white;padding-inline:2rem;padding-block:0.5rem;border-radius:25px;`;
        btn.className="btn";
        btn.type="submit";
        btn.textContent="signin";
        DisplayBlog.separator(form,Nav.btnColor);
        form.appendChild(btn);
        popup.appendChild(form);
        textarea.appendChild(popup);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{left:"20%",right:"20%",top:"15%"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{left:"6%",right:"6%",top:"20%"}});
        return {form,textarea,popup};
        }
        signInPopupSetupTwo(parent:HTMLElement):{form:HTMLFormElement,popup:HTMLElement} {
        parent.style.zIndex="0";
        const popup=document.createElement("section");
        popup.style.cssText="position:absolute;backdrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center; justify-content:center;gap:1rem;width:clamp(350px,400px,500px);height:400px;";
        popup.style.top="10%";
        popup.style.left="35%";
        popup.style.right="35%";
        popup.id="signin-popup-setup";
        const form=document.createElement("form");
        form.style.cssText="margin-inline:auto;padding-inline:1rem;width:auto;display:flex;flex-direction:column;";
        const formGrp=document.createElement("div");
        formGrp.className="form-group mx-auto d-flex flex-column";
        const elabel=document.createElement("label");
        elabel.className="text-primary text-center mx-auto";
        elabel.textContent="email";
        elabel.setAttribute("for","email");
        const einput=document.createElement("input");
        einput.className="form-control";
        einput.type="email";
        einput.autocomplete="email";
        einput.id="email";
        einput.name="email";
        einput.pattern="[a-zA-Z0-9\.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}";
        formGrp.appendChild(elabel);
        formGrp.appendChild(einput);
        const formGrp1=document.createElement("div");
        formGrp1.className="form-group mx-auto d-flex flex-column";
        const plabel=document.createElement("label");
        plabel.className="text-primary text-center mx-auto";
        plabel.textContent="password";
        plabel.setAttribute("for","password");
        const pinput=document.createElement("input");
        pinput.className="form-control";
        pinput.type="password";
        pinput.name="password";
        pinput.autocomplete="on";
        formGrp1.appendChild(plabel);
        formGrp1.appendChild(pinput);
        form.appendChild(formGrp);
        form.appendChild(formGrp1);
        const btn =document.createElement("button");
        btn.style.cssText=`margin-block:2rem;background:${Nav.btnColor};color:white;border:1px solid white;padding-inline:2rem;padding-block:0.5rem;border-radius:25px;`;
        btn.className="btn";
        btn.type="submit";
        btn.textContent="signin";
        DisplayBlog.separator(form,Nav.btnColor);
        form.appendChild(btn);
        popup.appendChild(form);
        parent.appendChild(popup);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{left:"20%",right:"20%",top:"15%"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{left:"6%",right:"6%",top:"20%"}});
        return {form,popup};
        }
        imageSaveCancel(parent:HTMLElement):{cancelBtn:HTMLButtonElement,saveBtn:HTMLButtonElement,msgCont:HTMLElement,grandParent:HTMLElement}{
            parent.style.zIndex="";
            parent.style.position="relative";
            parent.style.zIndex="";
            // const shade1=Misc.blueShades.find(sh=>(sh.name==="college navy"))?.value;
            const shade2=Misc.blueShades.find(sh=>(sh.name==="chlorine blue"))?.value;
            const shade3=Misc.blueShades.find(sh=>(sh.name==="azure"))?.value;
            //DO YOU WANT TO SAVE IMAGE YES/NO !
            const button1:btnOptionType={
                btn_type:"button",
                msg:"don't save to server",
                btnBgColor:shade2 ? shade2 as string : "black",
                btnColor:"white;",
                btnLabel:"cancel"
            }
            const button2:btnOptionType2={
                btn_type2:"button",
                msg2:"save to server",
                btnBgColor2:shade3 ? shade2 as string : "black",
                btnColor2:"white;",
                btnLabel2:"save"
            }
            const options:btnOptionMsgType={
                button1:button1,
                button2:button2,
            };
            const {btn1,btn2,container,grandParent}= Misc.btnOptionMessagePopup(parent,options);
            container.id="image-save-cancel";
            return {cancelBtn:btn1,saveBtn:btn2,msgCont:container,grandParent}
        }

        
    //END
    };

class User{
    logo:string;
    bgColor:string;
    saveBlogUrl:string="/api/blog";
    urlUpload:string="/api/uploadImage";
    signin:string="/api/user";
    userUrl:string="/api/user";
    userUrlUpdate:string="/api/user_update";

    _user:userType={
        id:"",
        email:"",
        name:undefined,
        password:undefined,
        emailVerified:undefined,
        image:undefined,
        imgKey:undefined,
        bio:undefined,
        blogs:[] as blogType[],
        accounts:[] as accountType[],
        sessions:[] as sessionType[],
        admin:false,
    } as userType;

    _signIn:userSignInType;
    _blogs:blogType[];
    _blog:blogType;
    hasSignedIn:boolean;
    userSetups:UserSetups;
    constructor(private _modSelector:ModSelector,private _service:Service,private _auth:AuthService){
        this.logo=`gb_logo.png`
        this._signIn={} as userSignInType;
        this.bgColor=this._modSelector._bgColor;
        this._blog={} as blogType;
        this.hasSignedIn=false;
        this.userSetups=new UserSetups(this._modSelector,this._service);
        this.getRefreshedUser().then(async(value)=>{
            if(value && value.user && value.user_id){
                value.user.then(async(user:userType)=>{
                    if(user){
                        this._user=user;
                        value.user_id.then(async(user_id:string)=>{
                            this._user={...this._user,id:user_id};
                        });
                    }
                })
            }
        }) as Promise<{user:userType}>
       
    }

   
    //GETTER SETTERS
    get signUp(){
        return {email:this._signIn.email,user_id:this._signIn.user_id}
    }
    set signUp(signIn:userSignInType){
        this._signIn=signIn;
        this._auth._user={...this._auth._user,email:signIn.email,password:signIn.password}
    }
    set user(user:userType){
        this._user=user;
        this._auth._user=user;
        if(user && user.id && user.email){

            localStorage.setItem("user",JSON.stringify(user));
            localStorage.setItem("email",user.email);
            localStorage.setItem("user_id",user.id);
        }
    }
    get user(){
        const {parsed,isJSON}=Header.checkJson(localStorage.getItem("user"));
        if(isJSON){
            this._user=parsed as userType;
            this._auth.user=this._user;
            return this._user;
        }else{
            return this._user;
        }
    }
    set blogs(blogs:blogType[]){
        this._blogs=blogs;
        this._modSelector.blogs=blogs;
    }
    get blogs(){
        return this._modSelector.blogs;
    }
    set blog(blog:blogType){
        this._blog=blog;
        this._modSelector.blog=blog;
    }
    get blog(){
        return this._modSelector._blog;
    }
    get admin(){
        return this._auth.admin;
    }

    //GETTER SETTERS

    //TEST SIGNIN
    //FETCH BLOGS VIA USER_ID
    async authorizeRequest(parent:HTMLElement,email:string){
       this._service.authorizeRequest(email).then(async(res)=>{
        if(res){
            const cssStyle={top:"20%",left:"30%",right:"30%",borderRadius:"12px",boxShadow:"1px 1px 12px 1px black"}
            Misc.msgSourceImage({parent,msg:"is authorized",src:this.logo,width:100,quality:75,time:400,cssStyle});
        }
       });
    }
    async saveBlog(parent:HTMLElement,blog:blogType):Promise<blogType|void>{
        // let tempBlog:blogType;
        if(parent && blog){
                const container=document.createElement("div");
                container.style.cssText="margin:auto; width:300px;height:auto;padding:1rem; box-shadow:1px 1px 4px 1px black;border-radius:20px;"
                const text=document.createElement("h6");
                text.className="text-primary text-center mx-auto";
                text.textContent="=>.....saving";
                container.appendChild(text);
                parent.appendChild(container);
            //STUCK HERE: ISSUE:"can not readproperties of null"
               return this._service.saveBlog(blog).then(async(res)=>{
                if(res){
                this._modSelector._blog=res as blogType;
                localStorage.setItem("blog",JSON.stringify(res));
                parent.removeChild(container);
                Misc.message({parent,msg:"blog is saved",type_:"success",time:400});
                return res;
                }else{
                    Misc.message({parent,msg:"blog not saved",type_:"success",time:400});
                }
               }).catch((err)=>{
                const msg=getErrorMessage(err);
                console.error({"error":msg});
                
               })
        }
    }
    
    async signInBlogForm(parent:HTMLElement,blog:blogType){
        const user=this.user;
        if(!(user.email && user.id)){
            await this._service.signIn(parent)
        }else if(blog){
            blog={...blog,user_id:user.id,id:0}
            this._modSelector._blog=blog;
            const {parentTextarea,form,input,textarea,popup}=Misc.fillBlogNameDesc(parent);
            input.name="filename";
            textarea.name="desc";
            form.onsubmit=(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    const formdata=new FormData(e.currentTarget as HTMLFormElement);
                    const desc=formdata.get("desc") as string;
                    const filename=formdata.get("filename") as string;
                    blog={...blog,name:filename,desc:desc};
                    //closing form
                    Misc.fadeOut({anchor:popup,xpos:100,ypos:100,time:400});
                    setTimeout(()=>{textarea.removeChild(popup)},398);
                    //closing form
                    return this._service.saveBlog(blog).then((blog_:blogType)=>{
                        if(blog_){
                            blog={...blog,id:blog_.id};
                            Misc.message({parent,msg:`${blog_.name} saved`,type_:"error",time:700});
                            this._modSelector.blog=blog;
                            Misc.message({parent,msg:"saved",type_:"success",time:500});
                        }else{
                            Misc.message({parent,msg:"NOT SAVED",type_:"error",time:700});
                        }
                
                        Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                        setTimeout(()=>{
                            parentTextarea.removeChild(popup)
                          
                        },380);
                    }).catch(()=>{
                        
                        Misc.message({parent:parent,msg:"save blog failed,try again",type_:"error",time:700});
                    });
                }
            };
        }
    }


    async refreshImageShow(parent:HTMLElement,image:HTMLImageElement,formdata:FormData|null,flex:flexType | null):Promise<void>{
        //SELECTION: UPLOAD OR CANCEL
        Edit.cleanUpByID(parent,"changeImage");
        await this.imgKeyMarkDelete(parent,image);//MARK DELETE IMAGES ON AWS
        const {targetContainer,select,mainTextarea}=this.userSetups.changeImage(parent,formdata);
        select.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                const check=([...image.classList as any] as string[]).includes("isActive");
                const {isJSON}=Header.checkJson(image.getAttribute("flex"));
                if(check){
                    image.classList.add("isActive");
                    //hits
                    if(!isJSON){
                        ([...image.children as any] as HTMLElement[]).map(child=>{
                            if(child){
                                //doesn hit
                                const check=([...child.classList as any] as string[]).includes("isActive");
                                if(check) {
                                    child.classList.add("isActive")
                                }
                            }
                        });
                    }
                }
            }
        });
        select.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                if(value==="remove"){
                    //REMOVING SELECT
                    Misc.fadeOut({anchor:select,xpos:50,ypos:100,time:600});
                    setTimeout(()=>{
                        parent.removeChild(targetContainer);
                    },580);
                }else if(value==="save" && formdata){
                    const blog=this._modSelector.blog;
                    this.saveOnlyImage(parent,formdata,image,blog);
                }else {
                    //SHOWING FORM!!!
                    console.log("value",value)
                    this.refreshImageUpload(targetContainer,mainTextarea,image,flex);
                    targetContainer.removeChild(select);
                }
            }
        });
        
    
        
    };
     //IMAGE FORM: THIS APPENDS CHOICE image in refreshImageShow() above
     async refreshImageUpload(targetContainer:HTMLElement,mainTextArea:HTMLElement,image:HTMLImageElement,flex:flexType | null):Promise<void>{
        //parent=>element container
        const {form,mainTextarea:grandParent}=this.userSetups.imageForm(mainTextArea,flex);
        await this.imgKeyMarkDelete(targetContainer,image);//MARK DELETE IMAGES ON AWS
        //grandParent=> column
        form.addEventListener("submit",(e:SubmitEvent)=>{
            //CLIENT IS SAVING
            if(e){
                //GETTING IMAGE
                e.preventDefault();
                targetContainer.classList.remove("isActive");
                const formData=new FormData(e.currentTarget as HTMLFormElement);
                const file:File|null=formData.get("file") as File;
                const imageUrl=URL.createObjectURL(file as File);
                if( file && file.name){
                    image.src=imageUrl;
                    image.alt=file.name;
                    this._modSelector.updateElement(image);
                    const blog=this._modSelector._blog;
                    Misc.blurIn({anchor:image,blur:"20px",time:400});
                    this.askSendToServer(grandParent,formData,image,blog)
                    grandParent.removeChild(form)
                    
                    
                   
                }
    
            }
        });
    };
    //BEAR REQUEST WITH NO BACKING
    async requestSaveImage(parent:HTMLElement,blog:blogType,img:HTMLImageElement,formdata:FormData){
        await this.imgKeyMarkDelete(parent,img);//MARK DELETE IMAGES ON AWS
        const {isJSON}=Header.checkJson(img.getAttribute("flex"));
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.style.cssText="margin:auto;position:absolute;display:flex;justify-content:center;align-items:center;gap:1rem;";
        if(isJSON){
            popup.style.inset="50% 0%";
            popup.style.width="150px";
        }else{
            popup.style.inset="50% 0%";
            popup.style.width="150px";
        }
        const save=buttonReturn({parent:popup,color:"white",text:"save?",bg:this.bgColor,type:"button"});
        const cancel=buttonReturn({parent:popup,color:"white",text:"nt right now",bg:this.bgColor,type:"button"});
        parent.appendChild(popup);
        save.addEventListener("click",(e:MouseEvent)=>{
            if(e){

                this.saveImage(parent,blog,formdata,img).then(async(s3ImgKey:gets3ImgKey)=>{
                    if(s3ImgKey){
                        img.src=s3ImgKey.img;
                        const {parsed,isJSON}=Header.checkJson(img.getAttribute("flex"));
                        if(isJSON){
                            let flex=parsed as flexType;
                            flex={...flex,imgKey:s3ImgKey.Key};
                            img.setAttribute("flex",JSON.stringify(flex));
                            this._modSelector.updateElement(img);
                            Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400})
                            setTimeout(()=>{
                                parent.removeChild(popup);
                            },380);
                        }else{
                            img.setAttribute("imgKey",s3ImgKey.Key);
                            this._modSelector.updateElement(img);
                        }
                    }
                });
            }
        });
        cancel.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400})
                setTimeout(()=>{
                    parent.removeChild(popup);
                },380);
            }
        });
    }

    async askSendToServer(bg_parent:HTMLElement,formdata:FormData,image:HTMLImageElement|null,blog:blogType){
        //FORMDATA NEEDS A KEY INSERTED WITHIN ITS FORM ALONG WITH BLOG.USER_ID OR SIGNED IN
        this.blog={...blog};
        await this.imgKeyMarkDelete(bg_parent,image);//MARK DELETE IMAGES ON AWS
        
        const {cancelBtn,saveBtn,msgCont,grandParent}=this.userSetups.imageSaveCancel(bg_parent);
        msgCont.style.zIndex="100";
        cancelBtn.addEventListener("click",(e:MouseEvent)=>{
            //CANCEL---- : NOT SAVING IMAGE TO SERVER
            if(e){
                //CLOSING POPUP----------//
                Misc.fadeOut({anchor:msgCont,xpos:50,ypos:100,time:600});
                setTimeout(()=>{
                    grandParent.removeChild(msgCont);
                    grandParent.style.zIndex="";
                },580);
            }
        });
        saveBtn.addEventListener("click",(e:MouseEvent)=>{
            //SAVING----- IMAGE TO SERVER--HAS SIGNED IN BLOG.USER_ID EXISTS
            if(e){
                //CLOSING POPUP----------//
                Misc.fadeOut({anchor:msgCont,xpos:50,ypos:100,time:600});
                setTimeout(()=>{
                    grandParent.removeChild(msgCont);
                    grandParent.style.zIndex="";
                },580);
                // CLOSING POPUP ABOVE
                this.saveOnlyImage(bg_parent,formdata,image,blog);
            }
        });
    }

    popupImageOption(bg_parent:HTMLElement,image:HTMLImageElement,blog:blogType){
        Header.cleanUpByID(bg_parent,"popupImageOption");
        // const {parsed,isJSON}=Header.checkJson(image.getAttribute("flex"));
        // const flex=isJSON ? parsed as flexType : null;
        
        const {cancelBtn,saveBtn,msgCont,grandParent}=this.userSetups.imageSaveCancel(bg_parent);
        msgCont.style.zIndex="100";
        msgCont.id="popupImageOption";
        saveBtn.textContent="upload an image";
        cancelBtn.addEventListener("click",(e:MouseEvent)=>{
            //CANCEL---- : NOT SAVING IMAGE TO SERVER
            if(e){
                //CLOSING POPUP----------//
                Misc.fadeOut({anchor:msgCont,xpos:50,ypos:100,time:600});
                setTimeout(()=>{
                    grandParent.removeChild(msgCont);
                    grandParent.style.zIndex="";
                },580);
            }
        });
        saveBtn.addEventListener("click",(e:MouseEvent)=>{
            //SAVING----- IMAGE TO SERVER--HAS SIGNED IN BLOG.USER_ID EXISTS
            if(e){
                //CLOSING POPUP----------//
                Misc.fadeOut({anchor:msgCont,xpos:50,ypos:100,time:600});
                setTimeout(()=>{
                    grandParent.removeChild(msgCont);
                    grandParent.style.zIndex="";
                },580);
                // CLOSING POPUP ABOVE
                this.upLoadImage(bg_parent,image,blog);
            }
        });
    }
    sendImgToServer(parent:HTMLElement,formdata:FormData,img:HTMLImageElement,flex:flexType|null){
        //RETURNS BLOG TO BE SAVED AFTER IMG UPLOAD AND IMG WITH IMG KE SAVED IN modSelector Blog => send to this._user.saveBlog(Main.textarea as HTMLElement,blog) OR RETURNS BOOLEAN FALSE=> MEANS USER NEEDS TO BE SIGNED IN
        const msgSv="do you want to save image?";
        const msgOther="Do you want to cancel this?"
        const {retParent,btnGrp,btnContainer}=this.userSetups.twoBtnSaveCancel(parent,msgSv,msgOther);
        const {btn1,btn2}=btnGrp;
        retParent.appendChild(btnContainer);
        // console.log("btn1",btn1,"btn2",btn2)//works
        btn1.addEventListener("click",(e:MouseEvent) =>{
            if(e){
                retParent.removeChild(btnContainer);
                retParent.classList.remove("isActive");
                if(flex){
                    flex={...flex,imgKey:undefined}
                    img.setAttribute("flex",JSON.stringify(flex));
                    this._modSelector.updateElement(img);
                }else{
                    img.setAttribute("imgKey","");
                };
            }
        });
        //UPLOADS IMAGE TO AWS, STORES IMGKEY AND THEN DOWLOADS BLOG TO SERVER WITH A FULL RETURN
        btn2.addEventListener("click",(e:MouseEvent) =>{
            if(e){
                retParent.classList.remove("isActive");
                const blog=this._modSelector._blog;
                ////////////////USER HAS SIGNED IN///////////
                if(blog.user_id){
                    //!!!GENERATES A KEY AND SET IT IN FORMDATA
                    const Key=flex?.imgKey
                    // console.log("Key",Key)
                   
                    if(!Key) return  Misc.message({parent:retParent,msg:"did not generate key",type_:"error",time:700});
                    parent.removeChild(btnContainer);
                    return this._service.uploadSaveImage(parent,formdata,img,blog,flex).then(async(value)=>{
                        ////////UPLOADS IMG AND SAVES IMGKEY TO BLOG=>ELEMENT//////
                        //READY TO BE SAVED
                        if(value){
                            ////////RETURNED VALUES FROM SERVER//////
                            const blog:blogType|null=value.blog;
                            const data:{Key:string|null,img:string|null}=value.data;
                            console.log("!!!BLOG SENDING TO SERVER:",blog)//OK
                            const ID=blog.id ? blog.id : 0;
                            value.blog={...value.blog,id:ID}
                            const updateBlog:blogType=value.blog;
                           return this.saveBlog(Main.textarea as HTMLElement,updateBlog).then(blog=>{
                                    if(blog && data && data.img){
                                        img.src=data.img;
                                        Misc.message({parent:retParent,msg:"Complete",type_:"success",time:400});
                                    }else{
                                            return  Misc.message({parent:retParent,msg:"not saved",type_:"error",time:700});
                                    }
                                });
                        
                        };
                    });
               
                }else{
                    ////////USER HAS NOT SIGNED IN ////////////////////////
                    return this.signInBlogForm(Main.textarea as HTMLElement,blog);//returns blog
                }
            }
        });
    };

    //THIS ONLY UPLOADS AN IMAGE/INSERTS IT IN THE IMG AND STORES IT IN THE BLOG.
    //IF USER IS NOT SIGNED IN THEN IT ASKS THE USER TO SIGNIN FIRST.

   async signInImageOnly(parent:HTMLElement,image:HTMLImageElement|null,filedata:FormData,blog:blogType){
    //FORMDATA HAS {KEY,FILE} SET IN FORM
    //IF IMAGE==NULL => BG-IMAGE
    this.blog={...blog};
    const useParent=Main.textarea ? Main.textarea : parent;
    parent.style.position="relative";
    parent.style.zIndex="0";
    const {cancelBtn,saveBtn,msgCont,grandParent}=this.userSetups.imageSaveCancel(useParent);
    cancelBtn.addEventListener("click",(e:MouseEvent)=>{
        if(e){
            //NO!!!
            Misc.fadeOut({anchor:msgCont,xpos:50,ypos:100,time:500});
            setTimeout(()=>{
                useParent.removeChild(msgCont)
            },492);
        }
    });
    
    saveBtn.addEventListener("click",(e:MouseEvent)=>{
        if(e){
            //YES!!!  SIGNIN
            Misc.fadeOut({anchor:msgCont,xpos:50,ypos:100,time:500});
            setTimeout(()=>{
                grandParent.removeChild(msgCont)
            },580);
            
            this.saveOnlyImage(parent,filedata,image,blog)
            

        }
    });
   };

    async imgKeyMarkDelete(parent:HTMLElement,image:HTMLImageElement|null):Promise<void>{
    if(image){
        const {isJSON,parsed}=Header.checkJson(image.getAttribute("flex"));
        if(isJSON){
            const flex=parsed as flexType;
        //IF IMGkEY MARK DELETE
            await this._service.markDelKey({del:true,Key:flex.imgKey as string})
            //IF IMGkEY MARK DELETE
        }else{
            const imgKey=image.getAttribute("imgKey") as string;
            await this._service.markDelKey({del:true,Key:imgKey})
        }
        }else{
            //background
            const {isJSON,parsed}=Header.checkJson(parent.getAttribute("flex"));
            const urlImage=parent.style.backgroundImage;
            if(isJSON && urlImage){
                const flex=parsed as flexType;
                if(flex.imgKey){
                    await this._service.markDelKey({del:true,Key:flex.imgKey});
                }
            }
           
        }
   };
   


//UPDATES IMGKEY AND IMG
   async simpleGetS3Image(bg_parent:HTMLElement,formdata:FormData,image:HTMLImageElement|null):Promise<gets3ImgKey | void>{
    //RETURNS IMG AND IMGKEY AFTER SAVING/RECORDING IT TO MODSELECTOR
    const {parsed,isJSON}=Header.checkJson(bg_parent.getAttribute("flex"));
    const flex= isJSON ? parsed as flexType : null;
    const blog=this._modSelector.blog;
    const Key=formdata.get("Key")
        if(!Key){
        this._service.generateImgKey(formdata,blog)//sets key in formdata
        }
        return await this._service.simpleImgUpload(bg_parent,formdata).then(async(s3ImgKey:gets3ImgKey)=>{
            if(s3ImgKey){
                //SAVED IMAGE!!
               this.registerRecordImgKey(bg_parent,formdata,image,flex,s3ImgKey,blog);
               
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg);Misc.message({parent:bg_parent,msg,type_:"error",time:700})});
   }


   
   registerRecordImgKey(bg_parent:HTMLElement,formdata:FormData,image:HTMLImageElement|null,flex:flexType|null,s3ImgKey:gets3ImgKey,blog:blogType){
     //SAVED AND RECORD IMAGE AND OR BGIMAGE WITH IMGKEY!!
     if(flex){
        //FLEXBOX/HEADER/FOOTER
        flex={...flex,imgKey:s3ImgKey.Key}
        if(image){
            //CHECK IF IMAGE EXIST
            flex={...flex,position:"ele"}
            image.src=s3ImgKey.img;
            image.setAttribute("flex",JSON.stringify(flex));
            image.setAttribute("imgKey",s3ImgKey.Key);
            this._modSelector.updateElement(image);
            Misc.message({parent:bg_parent,msg:"image saved",type_:"success",time:400});
        }else{
            //COMPLETING BACKGROUND IMAGE
            bg_parent.setAttribute("flex",JSON.stringify(flex));
            bg_parent.style.backgroundImage=`url(${s3ImgKey.img})`;
            const element=this._modSelector.getElement(bg_parent);//adds imgKey to element AND UPDATES ALL
            if(element){
                ModSelector.addBgImageToCss(bg_parent,s3ImgKey.img);//adds url to backgroundImage;
                Misc.message({parent:bg_parent,msg:"background image saved",type_:"success",time:400});
            }
        }
    }else{
        //HTMLELEMENT OR BLOG
        if(image){
            //IMAGE ELEMENT
            const file=formdata.get("file") as File;
            image.src=s3ImgKey.img;
            image.alt=file.name;
            image.setAttribute("imgKey",s3ImgKey.Key);
            this._modSelector.updateElement(image);
            Misc.message({parent:bg_parent,msg:"saved image",type_:"success",time:400});
        }else{
            //BLOG
            ModSelector.addBgImageToCss(bg_parent,s3ImgKey.img);//adds url to backgroundImage;
            this._blog={...blog,imgBgKey:s3ImgKey.Key}
            this.blog=this._blog;//sending it to localStorage
             Misc.message({parent:bg_parent,msg:"blog image saved",type_:"success",time:400})
        }
    }
   }

   message(parent:HTMLElement,target:HTMLElement|null,str:string,type:"success"|"error",time:number):boolean{
    const msg:msgType={
      parent:parent,
      msg:str,
      type_:type,
      time
    }
    Misc.message(msg)///3000 delay
    //
    setTimeout(()=>{
        if(!target) return
        parent.removeChild(target);
    },2800);
    if(type==="success") return true;
    else return false
   }

   async saveImage(parent:HTMLElement,blog:blogType,formdata:FormData,image:HTMLImageElement|null){
    //THIS IS FOR IMAGES THAT ARE UPLOADED AND HAVE FORMDATA WITH USER SIGNIN
    const user=this.user;
    if(user && user.id){
        blog={...blog,user_id:user.id};
        const getKey=formdata.get("Key") as string;
        if(!getKey){
        this._service.generateImgKey(formdata,blog) as {Key:string};
        }
        return this.simpleGetS3Image(parent,formdata,image);

    }else{
        await this.signInBlogForm(parent,blog);
    }
   }

   async changePassword(parent:HTMLElement,user:userType,passwords:{passNew:string,passOld:string}){
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({user,passwords,emails:null})
        }
        //HAVE TO CREATE USER PASSWORD AND EMAIL CHANGE OUTS
        return await fetch(this.userUrlUpdate,option).then(async(res)=>{
            if(res.ok){
                const user= await res.json() as userType;
                this.user=user;
                Misc.message({parent:parent,msg:"saved",type_:"success",time:400});
                return user;
            }
        }).catch((err)=>{
            Misc.message({parent:parent,msg:"somthing went wrong",type_:"error",time:700});
            const msg=getErrorMessage(err);
            console.error(msg);
        }) ;
    }
    async changeEmail(parent:HTMLElement,user:userType,emails:{emailNew:string,emailOld:string}){
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({user,emails,passwords:null})
        }
        //HAVE TO CREATE USER PASSWORD AND EMAIL CHANGE OUTS
        return await fetch(this.userUrlUpdate,option).then(async(res)=>{
            if(res.ok){
                const user= await res.json() as userType;
                this.user=user;
                Misc.message({parent:parent,msg:"saved",type_:"success",time:400});
                return user;
            }
        }).catch((err)=>{
            Misc.message({parent:parent,msg:"somthing went wrong",type_:"error",time:700});
            const msg=getErrorMessage(err);
            console.error(msg);
        }) ;
    }
    async userUpdate(parent:HTMLElement,user:userType){
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({user,emails:null,passwords:null})
        }
        //HAVE TO CREATE USER PASSWORD AND EMAIL CHANGE OUTS
        return await fetch(this.userUrlUpdate,option).then(async(res)=>{
            if(res.ok){
                const user= await res.json() as userType;
                this.user=user;
                Misc.message({parent:parent,msg:"saved",type_:"success",time:400});
                return user;
            }
        }).catch((err)=>{
            Misc.message({parent:parent,msg:"somthing went wrong",type_:"error",time:700});
            const msg=getErrorMessage(err);
            console.error(msg);
        }) ;
    }
    
   async getRefreshedUser():Promise<{user:Promise<userType|undefined>,user_id:Promise<string|undefined>}>{
    return{
            user: this.getLocalUser().then(async(res:string)=>{
            if(res as string){
                const {parsed,isJSON}=Header.checkJson(res);
                if(isJSON){
                    return parsed as userType
                }
            }
            })as Promise<userType|undefined>,
            user_id:this.getLocalUserID().then(async(user_id:string)=>{
                if(user_id){
                    return user_id;
                }
            }) as Promise<string|undefined>
        }
   }
   async getLocalUserID(){
    return new Promise((resolver,reject)=>{
        if(typeof window !=="undefined"){
            resolver(localStorage.getItem("user_id"));
            reject("no user_id");
        }
    }) as Promise<string|null>;
   }
   async getLocalUser(){
    return new Promise((resolver,rejector)=>{
        if(typeof window !=="undefined"){
        resolver(localStorage.getItem("user"))
        rejector("not logged-in")
        }
    }) as Promise<string |null>;
   }
    async saveWork(item:{parent:HTMLElement,blog:blogType,func:()=>Promise<void>|void|undefined}){
        const {parent,blog,func}=item;
        let _blog=blog;
        this._modSelector.loadBlog(blog);//loads blog and saves it to storage
        const user=this.user
        const notSignedIn=user && !user.id ? true:false;
        const hasBlogWithSigninAndNoBlogName=(blog && user.id && !blog.name) ? true:false;
        const hasSignedInWithBlogName=(blog && blog.user_id && blog.name)? true:false;
     if(user && user.id){
         _blog={...blog,user_id:user.id,id:blog.id};
        if(blog && !blog.name){
            _blog={..._blog};
        }
        this._modSelector._blog=_blog;
        this._modSelector.blog=this._modSelector._blog;
     }
     switch(true){
        case notSignedIn:
            await this._service.signIn(parent);
        return
        case hasBlogWithSigninAndNoBlogName:
            const {parentTextarea,popup:nameDescPopup,form:nameDescForm,input:name_,textarea:desc_}=Misc.fillBlogNameDesc(parent);
            nameDescForm.onsubmit=(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    const nameDescFormdata=new FormData(e.currentTarget as HTMLFormElement);
                    const _name=(name_ as HTMLInputElement).name as string;
                    const _desc=(desc_ as HTMLTextAreaElement).name as string;
                    const name=nameDescFormdata.get(_name) as string;
                    const desc=nameDescFormdata.get(_desc) as string;
                    const title=nameDescFormdata.get("title") as string;
                    this.blog={..._blog,name,desc,title}; //saving it to local Storage
                   
                    //----------------------REMOVING FILBLOGNAMEDESC Form-----------------------//
                    Misc.message({parent,msg:"got it, thanks",type_:"success",time:400});
                    setTimeout(()=>{
                        Misc.fadeOut({anchor:nameDescPopup,xpos:50,ypos:100,time:400});
                        setTimeout(()=>{
                            parentTextarea.removeChild(nameDescPopup);
                        },380);
                    },400);
                    //----------------------REMOVING FILBLOGNAMEDESC Form-----------------------//
                    //----------------------CREATING NEW BLOG-----------------------//
                    this.blog={...this.blog,user_id:user.id};
                    this._service.newBlog(this.blog).then(async(_blog_:blogType)=>{
                        if(_blog_){
                            this.blog={...this.blog,id:_blog_.id};
                            Misc.message({parent,msg:"new blog created",type_:"success",time:400});
                            //----------------------SAVING BLOG-----------------------//

                                    this._service.saveBlog(this.blog).then(async(_blog:blogType)=>{
                                        if(_blog){
                                            this.blog={..._blog};//saving it to localStorage
                                            const BlogFinal= await this._service.promsaveItems(_blog);
                                            if(BlogFinal){
                                            localStorage.setItem("blog",JSON.stringify(BlogFinal));
                                            this.blog=BlogFinal;
                                            Misc.message({parent,type_:"success",msg:" created && saved",time:700});
                                            }
                                            Misc.message({parent,type_:"success",msg:" created && saved",time:700});
                                            func();//executing function
                                        }
                                    }).catch((err)=>{const msg=getErrorMessage(err); console.error(msg);
                                        Misc.message({parent,msg:msg,type_:"error",time:800});
                                    });
                           
                            //----------------------SAVING BLOG-----------------------//
                        }
                    }).catch((err)=>{const msg=getErrorMessage(err); console.error(msg);
                        Misc.message({parent,msg:msg,type_:"error",time:800});
                    });
                    //----------------------CREATING NEW BLOG-----------------------//
                }
            };
               
        return;
        case hasSignedInWithBlogName:
                 //----------------------SAVING BLOG-----------------------//
                 this.blog={...blog,user_id:user.id};
                 this._service.promsaveItems(this.blog).then(async(_blog_)=>{
                    if(_blog_){

                        this._service.saveBlog(_blog_).then(async(_blog:blogType)=>{
                            if(_blog){
                                this.blog={..._blog};//saving it to localStorage
                                const BlogFinal= await this._service.promsaveItems(_blog);
                                if(BlogFinal){
                                localStorage.setItem("blog",JSON.stringify(BlogFinal));
                                this.blog=BlogFinal;
                                Misc.message({parent,type_:"success",msg:" created && saved",time:700});
                                }
                                func();//executing function
                            }
                        }).catch((err)=>{const msg=getErrorMessage(err); console.error(msg);
                            Misc.message({parent,msg:msg,type_:"error",time:800});
                        });
                    }
                });
                //----------------------SAVING BLOG-----------------------//
        return;
        default:
            return;
     }
    }
    async saveOnlyImage(parent:HTMLElement,formdata:FormData,img:HTMLImageElement|null,blog:blogType){
        const user=this._user;
        if(user && user.id && blog && !blog.user_id){
            blog={...blog,user_id:user.id};
        }
        const notSignedIn=user && !(user.id || user.email)? true : false;
        const signedInPlusNoBlog=(blog && user && user.id && !blog.name) ? true:false;
        const signedInPLUSBlogName=(blog && blog.user_id && blog.name)? true:false;
        switch(true){
            case notSignedIn:
            await this._service.signIn(parent);
            return;
            case signedInPlusNoBlog:
                const {parentTextarea,popup:nameDescPopup,form:nameDescForm,input:name_,textarea:desc_}=Misc.fillBlogNameDesc(parent);
                    nameDescForm.addEventListener("submit",async(e:SubmitEvent)=>{
                        if(e){
                            e.preventDefault();
                            const nameDescFormdata=new FormData(e.currentTarget as HTMLFormElement);
                            const _name=(name_ as HTMLInputElement).name as string;
                            const _desc=(desc_ as HTMLTextAreaElement).name as string;
                            const name=nameDescFormdata.get(_name) as string;
                            const desc=nameDescFormdata.get(_desc) as string;
                            if(name && desc){

                                //REMOVING FORM
                                Misc.fadeOut({anchor:nameDescPopup,xpos:50,ypos:100,time:400});
                                setTimeout(()=>{
                                    parentTextarea.removeChild(nameDescPopup)
                                    
                                },380);
                                this.blog={...blog,name,desc} as blogType; //saving it to local Storage
                                blog={...blog,name,desc} as blogType; //saving it to local Storage
    
                                  this._service.generateImgKey(formdata,this.blog) as {Key:string};//inserts Key into formdata
                                 const _blog_:blogType|undefined|void=  await this._service.simpleImgUpload(parent,formdata).then(async(imgKeyUrl:gets3ImgKey)=>{
                                       if(imgKeyUrl){
                                           if(img){
                                               const file=formdata.get("file") as File;
                                               const filename=file.name as string;
                                               img.src=imgKeyUrl.img;
                                               img.alt=filename;
                                               formdata.set("file","");
                                               formdata.set("Key","");
                                              const blog_:blogType|undefined= await this.saveKeyWithinSelectorOrNot({parent,target:img,imgKey:imgKeyUrl.Key,blog:this.blog});
                                              return blog_;
                                           }else{
                                             const blog_= await this.saveKeyWithinBackground({parent,imgKeyUrl,blog:this.blog});
                                             formdata.set("file","");
                                               formdata.set("Key","");
                                             return blog_;
                                           }
                                       }
                                   }).catch((err)=>{const msg=getErrorMessage(err);Misc.message({parent,msg,type_:"error",time:700})});
                                   //saving image
                                   if(_blog_ && _blog_.user_id){
                                    this._modSelector.blog={..._blog_}
                                    
                                   }
                                
                            }
                        }
                    });
            return;
            case signedInPLUSBlogName:
                if(formdata){
                    // const blog=this._modSelector._blog;
                this._service.generateImgKey(formdata,blog) as {Key:string};
                const file=formdata.get("file") as File;
                const filename=file.name as string;
                //GETTING s3ImgKey && url
                const finalBlog: void | blogType | undefined= await this._service.simpleImgUpload(parent,formdata).then(async(imgKeyUrl:gets3ImgKey)=>{
                    if(imgKeyUrl){
                        if(img){
                            img.src=imgKeyUrl.img;
                            img.alt=filename;
                            formdata.set("Key","");
                            formdata.set("file","");
                           return await this.saveKeyWithinSelectorOrNot({parent,target:img,imgKey:imgKeyUrl.Key,blog});
                           
                        }else{
                            parent.style.backgroundImage=`url(${imgKeyUrl.img})`;
                            parent.style.backgroundSize="100% 100%";
                            parent.style.backgroundPosition="50% 50%";
                            formdata.set("Key","");
                            formdata.set("file","");
                            // console.log("saveKeyWithinBackground",imgKeyUrl,blog)
                           return await this.saveKeyWithinBackground({parent,imgKeyUrl,blog});
                            
                        }
                    }
                }).catch((err)=>{const msg=getErrorMessage(err);Misc.message({parent,msg,type_:"error",time:700})});
                if(finalBlog){
                    // console.log("finalBlog",finalBlog)
                    this._modSelector._blog={...finalBlog}
                }
                }
            return;
            
        }
    }
    
  
    //popupImageOption();
    upLoadImage(parent:HTMLElement,image:HTMLImageElement,blog:blogType){
        parent.style.position="relative";
        parent.style.zIndex="";
        const container=document.createElement("div");
        container.style.cssText="position:absolute;width:clamp(300px,350px,375px);background:white;z-index:200;border-radius:16px;box-shadow:1px 1px 12px 1px black;";
        container.style.top="0%";
        container.style.left="35%";
        container.style.right="35%";
        const form=document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1.25rem;width:100%;";
        const {input,label}=Nav.inputComponent(form);
        input.type="file";
        input.name="file";
        input.id="imageInput";
        label.textContent="select image";
        label.setAttribute("for",input.id);
        const {button}=Misc.simpleButton({anchor:form,type:"submit",bg:Nav.btnColor,color:"white",text:"submit",time:400});
        button.disabled=true;
        container.appendChild(form);
        parent.appendChild(container);
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{left:"20%",right:"20%"}});
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{left:"5%",right:"5%"}});
        input.onchange=(e:Event) => {
            if(e){
                button.disabled=false;
            }
        };
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File;
                if(file && file as File){
                    const imgUrl=URL.createObjectURL(file);
                    const filename=file.name as string;
                    image.src=imgUrl;
                    image.alt=filename;
                    Misc.blurIn({anchor:image,blur:"20px",time:500});
                    this.askSendToServer(parent,formdata,image,blog);
                    //REMOVE CONTAINER
                    Misc.growOut({anchor:container,scale:0,opacity:0,time:500});
                    setTimeout(()=>{
                        parent.removeChild(container);
                    },498);
                }
            }
        };
    }
    static sleep(ms:number){
        return new Promise(resolve=>setTimeout(resolve,ms))
    }
    async saveKeyWithinSelectorOrNot(item:{parent:HTMLElement,target:HTMLElement,imgKey:string,blog:blogType}):Promise<blogType | undefined>{
        //SAVES IMGKEY IN TARGET DEPENDING IF FLEX ATTRIBUTE EXISTS ON TARGET: NOT=>BGIMAGE,TARGET:FLEX EXIST=>IMAGE; THEN SAVES BLOG AND RETURN THE NEWLY SAVED BLOG
        const {parent,target,imgKey,blog}=item;
        const circle=parent.getAttribute("data-shapeoutside-circle");
        const square=parent.getAttribute("data-shapeoutside-square");
        const polygon=parent.getAttribute("data-shapeoutside-polygon");
        const checkShapeOutside=[circle,square,polygon].find(item=>(item !==null));
        this._modSelector._blog={...blog};
        const {isJSON,parsed}=Header.checkJson(target.getAttribute("flex"));
        
        if(isJSON){
            let flex=parsed as flexType;
            flex={...flex,imgKey:imgKey}
            if(checkShapeOutside){
                parent.setAttribute("flex",JSON.stringify(flex));
                target.setAttribute("imgKey",imgKey);
            }else{
                target.setAttribute("flex",JSON.stringify(flex));
            }
        }else{
            if(checkShapeOutside){
                parent.setAttribute("imgKey",imgKey);
                target.setAttribute("imgKey",imgKey);
            }else{
                target.setAttribute("imgKey",imgKey)
            }
            Misc.message({parent:parent,msg:" mainimage saved",type_:"success",time:700});
        }
        if(checkShapeOutside){

            return this._modSelector.promGetElement(parent).then(async(res)=>{
                  //updates to updates @ flex.imgKey for both target && background=> found or getAttribute("imgKey")=>found
                 if(res){
                     const level=parent.getAttribute("level");
                     Misc.message({parent:parent,msg:` image saved: level=${level}`,type_:"success",time:1100});
                     return this._service.promsaveItems(res);
                 }
             });
        }else{
            return this._modSelector.promGetElement(target).then(async(res)=>{
                //updates to updates @ flex.imgKey for both target && background=> found or getAttribute("imgKey")=>found
               if(res){
                   const level=target.getAttribute("level");
                   Misc.message({parent:parent,msg:` image saved: level=${level}`,type_:"success",time:1100});
                   return this._service.promsaveItems(res);
               }
           });
        };
    }
    async unregisteredImages(parent:HTMLElement,arrImgs:arrImgType2[]):Promise<{cancel:HTMLButtonElement,save:HTMLButtonElement,popup:HTMLElement}>{
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.id="popup";
        popup.style.cssText="position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center; gap:1rem;background:white;border-radius:20px;box-shadow:1px 1px 12px 1px black;width:clamp(350px,500px,600px);height:auto;";
        popup.style.top="20%";
        popup.style.marginBlock="2rem";
        popup.style.paddingBlock="2rem";
        const title=document.createElement("h6");
        title.textContent="unregistered images";
        title.className="text-center text-primary text-decoration-underline my-2";
        popup.appendChild(title);
        const para=document.createElement("p");
        para.style.cssText="margin-inline:auto;padding-inline:2rem;";
        para.textContent="you have the following imgaes that are unregistered. If you save your work, your images will not be saved!!";
        popup.appendChild(para);
        const ul=document.createElement("ul");
        ul.style.cssText="margin-left:1.5rem;color:rgb(8, 4, 249);";
        arrImgs.map(res=>{
            if(!res) return;
            const li=document.createElement("li");
            for(const [key,value] of Object.entries(res)){
                const li2=document.createElement("li");
                li2.innerHTML=`<span style="color:black;font-size:120%;">${key}:</span><span style="color:blue;text-decoration:underline;">${value}</span>`;
                li.appendChild(li2);
            }
            
            ul.appendChild(li);
        });
        popup.appendChild(ul);
        const btnGrp=document.createElement("div");
        btnGrp.style.cssText="display:flex;justify-content:space-around;align-items:center;marging-block:2rem;"
        const {button:cancel}=Misc.simpleButton({anchor:btnGrp,type:"button",bg:Nav.btnColor,color:"white",time:400,text:"cancel"});
        const {button:save}=Misc.simpleButton({anchor:btnGrp,type:"button",bg:Nav.btnColor,color:"red",time:400,text:"don't care"});
        popup.appendChild(btnGrp);
        parent.appendChild(popup);
        return new Promise((resolve)=>{
            resolve({popup,cancel,save})
        }) as Promise<{cancel:HTMLButtonElement,save:HTMLButtonElement,popup:HTMLElement}>;

    }
    async saveKeyWithinBackground(item:{parent:HTMLElement,imgKeyUrl:gets3ImgKey,blog:blogType}):Promise<blogType|undefined>{
        //SAVES IMGKEY IN TARGET DEPENDING IF FLEX ATTRIBUTE EXISTS ON TARGET: NOT=>BGIMAGE,TARGET:FLEX EXIST=>IMAGE; THEN SAVES BLOG AND RETURN THE NEWLY SAVED BLOG
        const {parent,imgKeyUrl,blog}=item;
        this._modSelector._blog=blog;
        //SAVES IMGKEY IN TARGET DEPENDING IF FLEX ATTRIBUTE EXISTS ON TARGET: NOT=>BGIMAGE,TARGET:FLEX EXIST=>IMAGE THEN SAVES BLOG AND RETURN THE NEWLY SAVED BLOG
        const {isJSON,parsed}=Header.checkJson(parent.getAttribute("flex"));
        const {img,Key}=imgKeyUrl;
        if(isJSON){
            let flex=parsed as flexType;
            flex={...flex,imgKey:Key,backgroundImage:true};
            parent.setAttribute("flex",JSON.stringify(flex));
        }else{
            parent.setAttribute("imagKey",Key);
        }
        parent.style.backgroundImage=`url(${img})`;//to be stored
        parent.style.backgroundSize=`100% 100%`;//to be stored
        parent.style.backgroundPosition=`50% 50%`;//to be stored
        return this._modSelector.promGetElement(parent).then(async(res)=>{
            //updates to updates @ flex.imgKey for both target && background=> found or getAttribute("imgKey")=>found
            if(res){
                const level=parent.getAttribute("level");
                Misc.message({parent:parent,msg:` image saved: level=${level}`,type_:"success",time:1100});
                return this._service.promsaveItems(res);
            }
        });
        return this._service.promsaveItems(this._modSelector._blog)
    }

    checkIfHasImagesButNoImgKey(blog:blogType):arrImgType2[]{
        const arrImgs:arrImgType2[]=[];
        if(!blog)return [];
        if(this.checkStrLength(blog.img)){
            if(!blog.imgKey && blog.name){
                arrImgs.push({name:blog.name,img:blog.img as string,loc:"blog"});
            }
        }
        blog.elements.map(ele=>{
            if(this.checkStrLength(ele.img) && !ele.imgKey ){
                arrImgs.push({name:ele.name,img:ele.img as string,loc:"element"});
            }
        });
        blog.selectors.map(sel=>{
            if(sel){
                sel.rows.map(row=>{
                    if(row){
                        const res=this.checkBackgroundUrl(row.cssText);
                        if(res && row.imgKey){
                            arrImgs.push({name:row.name,img:res.word,loc:"row"});
                        }
                        row.cols.map(col=>{
                            if(!col) return;
                            const res=this.checkBackgroundUrl(col.cssText);
                            if(res && col.imgKey){
                                arrImgs.push({name:col.name,img:res.word,loc:"col"});
                            }
                            col.elements.map(ele=>{
                                if(!ele) return;
                                if(ele.img && !ele.imgKey){
                                    arrImgs.push({name:ele.name,img:ele.img,loc:"element"});
                                }
                            });
                        });
                    }
                });
            }
        });
        if(arrImgs && arrImgs.length>0){
            return arrImgs;
        }
        return []
    }

    checkStrLength=(img:string | undefined):boolean=>{
        if(img && img as string ){
            const check=img.split("") && img.split("").length >0 ? true : false;
            return check
        }
        return false
    }
    checkBackgroundUrl(css:string):{start:number,end:number,word:string,found:boolean}|undefined{
        let cssArr:string[]=[];
        if(this.checkStrLength(css)){
            cssArr=css.split(";");
            cssArr.map(keyValue=>{
                if(!keyValue)return;
                const str=keyValue.split(":")[1];
                const startReg:RegExp=/(url\()/g;
                const endReg:RegExp=/\)/g;
                const retRes=User.regExp({str,startReg,endReg});
                if(!retRes.found) return;
                return retRes;
            });
        }
        return
    }
    static regExp(item:{str:string,startReg:RegExp,endReg:RegExp}):{start:number,end:number,word:string,found:boolean}{
        const {str,startReg,endReg}=item;
        let retAns:{start:number,end:number,word:string,found:boolean}={start:0,end:0,word:"",found:false};
        const startMatches=str.matchAll(startReg) as any;
        const endMatches=str.matchAll(endReg) as any;
        for(const start of startMatches){
            if(start && start[0]){
                const _start=start.index
                for(const end of endMatches){
                    if(end && end[0]){
                        const end_=end.index + end[0].length
                        retAns={start:_start,end:end_,word:str.slice(_start,end_),found:true}
                    }
                }
            }
        }
        return retAns;
    }
     hasImgKeyMark(res:any){
        switch(true){
            case res.blog_id && !res.header:
                if(res.imgkey){
                    return this._service.adminImagemark(res.imgKey).then(async(adminRes)=>{
                        if(adminRes){
                            return res as elementType;
                        }
                    });
                }else{
                    return res as elementType;
                }
            case res.blog_id && res.header:
                if(res.imgkey){
                    return this._service.adminImagemark(res.imgKey).then(async(adminRes)=>{
                        if(adminRes){
                            return res as selectorType;
                        }
                    });
                }else{
                    return res as selectorType;
                }

            case res.order:
                if(res.imgkey){
                    return this._service.adminImagemark(res.imgKey).then(async(adminRes)=>{
                        if(adminRes){
                            return res as element_selType;
                        }
                    });
                }else{
                    return res as element_selType;
                }
            case res.row_id:
                if(res.imgkey){
                    return this._service.adminImagemark(res.imgKey).then(async(adminRes)=>{
                        if(adminRes){
                            return res as colType;
                        }
                    });
                }else{
                    return res as colType;
                }
            case res.selector_id:
                if(res.imgkey){
                    return this._service.adminImagemark(res.imgKey).then(async(adminRes)=>{
                        if(adminRes){
                            return res as rowType;
                        }
                    });
                }else{
                    return res as rowType;
                }
            case res.elements && res.selectors:
                if(res.imgkey){
                    return this._service.adminImagemark(res.imgKey).then(async(adminRes)=>{
                        if(adminRes){
                            return res as blogType;
                        }
                    });
                }else{
                    return res as blogType;
                }
            default:
                return
            
        }
    }
}






// const modSelector= new ModSelector()
// const service = new Service(modSelector)
// const userimgloads= new UserImageLoads(modSelector,service)
export default User;
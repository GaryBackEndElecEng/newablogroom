import {userType,userSignInType,blogType, elementType, element_selType, gets3ImgKey, colType, rowType, selectorType, arrImgType2, accountType, sessionType,  postType, userDevelopType, userQuoteType} from "@/components/editor/Types";
import ModSelector from "../editor/modSelector";
import DisplayBlog from "../blog/displayBlog";
import Misc, { btnOptionMsgType, btnOptionType, btnOptionType2 } from "../common/misc";
import Service from "@/components/common/services";
import {msgType} from '@/components/common/misc';
import { getErrorMessage } from "@/lib/errorBoundaries";
import AuthService from "../common/auth";
import Main from "../editor/main";
import Header from "../editor/header";
import { btnType, button } from "../common/tsFunctions";
import Edit from "../editor/edit";
import Nav from "../nav/headerNav";
import { FaCrosshairs } from "react-icons/fa";
import { FaCreate } from "../common/ReactIcons";
import { idValueType, locationEnumType, selRowColType, selRowType } from "@/lib/attributeTypes";

class UserSetups  {
   public bgColor:string;
   public btnColor:string;
        constructor(private _modSelector:ModSelector,private _service:Service){
            this.bgColor=this._modSelector._bgColor
            this.btnColor=this._modSelector.btnColor;
        }

        changeImage(targetContainer:HTMLElement,formdata:FormData|null):{targetContainer:HTMLElement,select:HTMLElement,mainTextarea:HTMLElement}{

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
            this.removeForm({parent:targetContainer,target:select});
            return {targetContainer,select,mainTextarea}
        };

        imageForm(mainTextarea:HTMLElement,selRowCol:selRowColType|null): {form:HTMLFormElement,mainTextarea:HTMLElement}{
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
            if(selRowCol){
                form.style.top="5%";
                form.style.left="30%";
                form.style.right="30%";
            }
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
            this.removeForm({parent:checkMain,target:form});
            checkMain.appendChild(form);
            Misc.matchMedia({parent:form,maxWidth:900,cssStyle:{left:"20%",right:"20%",top:"10%"}});
            Misc.matchMedia({parent:form,maxWidth:400,cssStyle:{left:"5%",right:"5%",top:"10%"}});
            return {form,mainTextarea:checkMain};
        };

        twoBtnSaveCancel(parent:HTMLElement,msgSv:string,msgOther:string,loc:locationEnumType){
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
        const btnGrp=Misc.btnOptionMessagePopup(div,btnGroup,loc);
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
            einput.pattern="[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}";
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
            this.removeForm({parent,target:popup});
            popup.animate([
                {transform:"scale(0.3)",opacity:"0"},
                {transform:"scale(1)",opacity:"1"}
            ],{duration:600,iterations:1});
            return {retParent:parent,form,popup}
        };


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
        einput.pattern="[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}";
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
        this.removeForm({parent:textarea,target:popup});
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{left:"20%",right:"20%",top:"15%"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{left:"6%",right:"6%",top:"20%"}});
        return {form,textarea,popup};
        };


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
        einput.pattern="[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}";
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
        this.removeForm({parent,target:popup});
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{left:"20%",right:"20%",top:"15%"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{left:"6%",right:"6%",top:"20%"}});
        return {form,popup};
        };


        imageSaveCancel(parent:HTMLElement,loc:locationEnumType):{cancelBtn:HTMLButtonElement,saveBtn:HTMLButtonElement,msgCont:HTMLElement,grandParent:HTMLElement}{
            parent.style.zIndex="";
            parent.style.position="relative";
            parent.style.zIndex="";
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
            const {btn1,btn2,container,grandParent}= Misc.btnOptionMessagePopup(parent,options,loc);
            container.id="image-save-cancel";
            return {cancelBtn:btn1,saveBtn:btn2,msgCont:container,grandParent}
        };


        removeForm(item:{parent:HTMLElement,target:HTMLElement}){
            const {parent,target}=item;
            const xDiv=document.createElement("div");
            Header.cleanUpByID(parent,"userSetup-removeForm-popup");
            xDiv.id="userSetup-removeForm-popup";
            xDiv.style.cssText="position:absolute;margin-inline:auto;display:flex;align-items:center;width:fit-content;padding:0.25rem;background:black;z-index:20;color:white;border-radius:50%;";
            xDiv.style.top="0%";
            xDiv.style.left="100%";
            xDiv.style.transform="translate(-5px,-5px)";
            FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"20px",color:"inherit"}});
            target.appendChild(xDiv);
            xDiv.onclick=(e:MouseEvent)=>{
                if(e){
                    parent.removeChild(target);
                }
            };
        };
        
    //END
    };



class User{
   public readonly logo:string=`gb_logo.png`;
   public bgColor:string;
   public readonly saveBlogUrl:string="/api/blog";
   public readonly urlUpload:string="/api/uploadImage";
   public readonly signin:string="/api/user";
   public readonly userUrl:string="/api/user";
   public readonly userUrlUpdate:string="/api/user_update";
   private _status:"authenticated" | "loading" | "unauthenticated";
   public readonly init:userType={
        id:"",
        email:"",
        name:undefined,
        password:undefined,
        emailVerified:undefined,
        image:undefined,
        imgKey:undefined,
        bio:undefined,
        blogs:[] as blogType[],
        posts:[] as postType[],
        quoteImgs:[] as userQuoteType[],
        devDeployimgs:[] as userDevelopType[],
        accounts:[] as accountType[],
        sessions:[] as sessionType[],
        admin:false,
    } as userType;
   private _user:userType;

   private _signIn:userSignInType;
    hasSignedIn:boolean;
    userSetups:UserSetups;


    constructor(private _modSelector:ModSelector,private _service:Service,private auth:AuthService){
        this._user=this.auth.user;
        this._status="unauthenticated";
        this.logo=`gb_logo.png`
        this._signIn={} as userSignInType;
        this.bgColor=this._modSelector._bgColor;
        this.hasSignedIn=false;
        this.userSetups=new UserSetups(this._modSelector,this._service);
        
       
    }

   
    //GETTER SETTERS
    get status(){
        return this.auth.status
    }
    set status(status:"authenticated" | "loading" | "unauthenticated"){
        this._status=status;
    }
    get signUp(){
        return {email:this._signIn.email,user_id:this._signIn.user_id}
    }
    set signUp(signIn:userSignInType){
        this._signIn=signIn;
        this._user={...this._user,email:signIn.email,password:signIn.password}
    }
    set user(user:userType){
        this.auth.user=user;
        this._user=user;
    }
    get user(){
        const {parsed,isJSON}=Header.checkJson(localStorage.getItem("user"));
        if(isJSON){
            this._user=parsed as userType;
            this.auth.user=this._user;
            return this._user;
        }else{
            this._user=this.auth.user;
            return this._user;
        }
    }
    set blogs(blogs:blogType[]){
        this._modSelector.blogs=blogs;
    }
    get blogs(){
        return this._modSelector.blogs;
    }
    set blog(blog:blogType){
        this._modSelector.blog=blog;
    }
    get blog(){
        return this._modSelector.blog;
    }
   

    //GETTER SETTERS

    //TEST SIGNIN

    async saveBlog(item:{parent:HTMLElement,blog:blogType,user:userType}):Promise<blogType|void>{
        const {blog,user,parent}=item;
      
       if(!parent) return Misc.message({parent,msg:"Sorry no parent Dom",type_:"error",time:1400});
        const container=document.createElement("div");
        container.style.cssText="margin:auto; width:300px;height:auto;padding:1rem; box-shadow:1px 1px 4px 1px black;border-radius:20px;"
        const text=document.createElement("h6");
        text.className="text-primary text-center mx-auto";
        text.textContent="=>.....saving";
        container.appendChild(text);
        parent.appendChild(container);
    //STUCK HERE: ISSUE:"can not readproperties of null"
        return this._service.saveBlog({blog:blog,user}).then(async(res)=>{
        if(res){
                
                parent.removeChild(container);
                Misc.message({parent,msg:"blog is saved",type_:"success",time:400});
                return res;
        }else{
            Misc.message({parent,msg:"blog not saved",type_:"success",time:400});
        }
        }).catch((err)=>{
        const msg=getErrorMessage(err);
        console.error({"error":msg});
        
        });
        
    }
    
    async signInBlogForm(item:{parent:HTMLElement,blog:blogType,func:()=>Promise<void>|undefined|void}){
        const {parent,blog,func}=item;
        const user=this.user;
        const cssPopup={inset:"120% 0% 0% 0%",position:"absolute"};
        let blogUser:blogType={} as blogType;
        if(!(user.email && user.id)){
            await this._service.signIn(parent)
        }else if(blog){
            blogUser={...blog,user_id:user.id,id:0}
            this._modSelector.blog=blog;
            const {retParent,form,input,textarea,popup}=Misc.fillBlogNameDesc({parent,cssPopup});
            input.name="filename";
            textarea.name="desc";
            form.onsubmit=async(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    const formdata=new FormData(e.currentTarget as HTMLFormElement);
                    const desc=formdata.get("desc") as string;
                    const filename=formdata.get("filename") as string;
                    blogUser={...blogUser,name:filename,desc:desc};
                    //closing form
                    Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                        setTimeout(()=>{
                            retParent.removeChild(popup);
                        },380);
                    //closing form
                    return await  this._service.saveBlog({blog:blogUser,user}).then((blog_:blogType)=>{
                        //api/savegetblog
                        if(blog_){
                            Misc.message({parent,msg:`${blog_.name} saved`,type_:"error",time:700});
                            Misc.message({parent,msg:"saved",type_:"success",time:500});
                            func();
                        }else{
                            Misc.message({parent,msg:"NOT SAVED",type_:"error",time:700});
                        }
                
                        
                    }).catch(()=>{
                        
                        Misc.message({parent:parent,msg:"save blog failed,try again",type_:"error",time:700});
                    });
                }
            };
        }
    }


    async refreshImageShow({parent,image,formdata,idValues,selRowCol}:{parent:HTMLElement,image:HTMLImageElement,formdata:FormData|null,selRowCol:selRowColType|null,idValues:idValueType[]}):Promise<void>{
        //SELECTION: UPLOAD OR CANCEL
        Edit.cleanUpByID(parent,"changeImage");
        await this._service.imgKeyMarkDelete({targetParent:null,targetImage:image,oldKey:null,idValues,selRowCol});//MARK DELETE IMAGES ON AWS
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
                    this.saveOnlyImage({parent,formdata,img:image,blog,idValues,selRowCol});
                }else {
                    //SHOWING FORM!!!
                   
                    this.refreshImageUpload({targetContainer,mainTextArea:mainTextarea,image,selRowCol,idValues});
                    targetContainer.removeChild(select);
                }
            }
        });
        
    
        
    };
     //IMAGE FORM: THIS APPENDS CHOICE image in refreshImageShow() above
     async refreshImageUpload({targetContainer,mainTextArea,image,selRowCol,idValues}:{
        targetContainer:HTMLElement,
        mainTextArea:HTMLElement,
        image:HTMLImageElement,
        selRowCol:selRowColType|null,
        idValues:idValueType[]

     }):Promise<void>{
        //parent=>element container
       
        const blog=this._modSelector.blog;
        await this._service.imgKeyMarkDelete({targetParent:null,targetImage:image,oldKey:null,selRowCol,idValues});//MARK DELETE IMAGES ON AWS
        const {form,mainTextarea:grandParent}=this.userSetups.imageForm(mainTextArea,selRowCol);
        //grandParent=> column
        form.addEventListener("submit",async(e:SubmitEvent)=>{
            //CLIENT IS SAVING
            if(e){
                //GETTING IMAGE
                e.preventDefault();
                targetContainer.classList.remove("isActive");
                const formData=new FormData(e.currentTarget as HTMLFormElement);
                const file:File|null=formData.get("file") as File;
                const imageUrl=URL.createObjectURL(file as File);
                if(file?.name){
                    const eleId=image.id;
                    image.src=imageUrl;
                    image.alt=file.name;
                    const {Key}=this._service.generateImgKey(formData,blog) as {Key:string};
                    const idValue:idValueType={eleId,id:"imgKey",attValue:Key};
                    this._modSelector.dataset.upDateIdValue({target:image,idValues,idValue});
                    this._modSelector.updateElement({target:image,idValues,selRowCol});
                    Misc.blurIn({anchor:image,blur:"20px",time:400});
                    this.askSendToServer({bg_parent:grandParent,formdata:formData,image,blog,oldKey:null,idValues,selRowCol})
                    grandParent.removeChild(form)
                    
                    
                   
                }
    
            }
        });
    };
  
    async askSendToServer( {bg_parent,formdata,image,blog,oldKey,idValues,selRowCol}:{
        bg_parent:HTMLElement,
        formdata:FormData,
        image:HTMLImageElement|null,
        blog:blogType,
        oldKey:string|null,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }){
        const {selectorId,rowId,colId}=selRowCol ? selRowCol as selRowColType :{selectorId:null,rowId:null,colId:null};
        const isRow= bg_parent.id===rowId ;
        const isCol= bg_parent.id===colId ;
        const selRow:selRowType|null = selRowCol ? {selectorId,rowId} as selRowType : null;
        let loc:locationEnumType="htmlElement";
        if(rowId){
            loc="flexbox"
        }
        //FORMDATA NEEDS A KEY INSERTED WITHIN ITS FORM ALONG WITH BLOG.USER_ID OR SIGNED IN
        //THE BG_PARENT MUST BE EITHER A COLUMN OR ROW IF THERE ARE NO IMAGE ELEMENT
        this.blog={...blog};
        if(oldKey && image){
            await this._service.imgKeyMarkDelete({targetParent:null,targetImage:null,oldKey,selRowCol,idValues});//MARK DELETE IMAGES ON AWS

        }
        
        const {cancelBtn,saveBtn,msgCont,grandParent}=this.userSetups.imageSaveCancel(bg_parent,loc);
        msgCont.style.zIndex="100";
        cancelBtn.addEventListener("click",(e:MouseEvent)=>{
            //CANCEL---- : NOT SAVING IMAGE TO SERVER
            if(e){
                //CLOSING POPUP----------//
                if(image){
                    this._modSelector.dataset.removeSubValue({idValues,id:"imgKey",target:image,eleId:image.id});
                    this._modSelector.updateElement({target:image,idValues,selRowCol}).then(async(res)=>{
                        if(res){
                            Misc.message({parent:bg_parent,msg:"updated",type_:"success",time:400});
                        }
                       });;
                  
                }else if(isCol || isRow){
                    
                    const eleId=bg_parent.id;
                    this._modSelector.dataset.removeSubValue({idValues,id:"imgKey",target:bg_parent,eleId:bg_parent.id});
                    this._modSelector.dataset.removeSubValue({idValues,target:bg_parent,id:"backgroundImg",eleId:bg_parent.id});
                    
                    if(isCol && selRow){
                        idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
                        this._modSelector.updateColumn({target:bg_parent,idValues,selRowCol:selRowCol as selRowColType}).then(async(res)=>{
                            if(res?.col){
                              Misc.message({parent:bg_parent,type_:"success",msg:"updated column",time:600});
                                
                            }
                           });;
                    }else if(isRow && selRow){
                        idValues.push({eleId,id:"selRow",attValue:JSON.stringify(selRow)});
                        this._modSelector.updateRow({target:bg_parent,idValues,selRow});
                    };
                }
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
                this.saveOnlyImage({parent:bg_parent,formdata,selRowCol,img:image,blog,idValues});
            }
        });
    };

    //THIS ONLY UPLOADS AN IMAGE/INSERTS IT IN THE IMG AND STORES IT IN THE BLOG.
    //IF USER IS NOT SIGNED IN THEN IT ASKS THE USER TO SIGNIN FIRST.

   async signInImageOnly({parent,image,formdata,blog,idValues,sel,row,col}:{
    parent:HTMLElement,
    image:HTMLImageElement|null,
    formdata:FormData,
    blog:blogType,
    idValues:idValueType[],
    loc:locationEnumType
    sel:selectorType|null,
    row:rowType|null,
    col:colType|null
   }){
    //FORMDATA HAS {KEY,FILE} SET IN FORM
    //IF IMAGE==NULL => BG-IMAGE
    this.blog={...blog};
    let loc:locationEnumType="htmlElement"
    if(sel && row && col){
        loc="flexbox";
    }
    const selRowCol=sel && row && col ? {selectorId:sel.eleId,rowId:row.eleId,colId:col.eleId} as selRowColType : null;
    const useParent=Main.textarea ? Main.textarea : parent;
    parent.style.position="relative";
    parent.style.zIndex="0";
    const {cancelBtn,saveBtn,msgCont,grandParent}=this.userSetups.imageSaveCancel(useParent,loc);
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
            
            this.saveOnlyImage({parent,formdata,img:image,blog,idValues,selRowCol})
            

        }
    });
   };


//UPDATES IMGKEY AND IMG
   async simpleGetS3Image({bg_parent,formdata,image,idValues,selRowCol}:{
    bg_parent:HTMLElement,
    formdata:FormData,
    image:HTMLImageElement|null,
    idValues:idValueType[],
    selRowCol:selRowColType|null
   }):Promise<gets3ImgKey | void>{
    //RETURNS IMG AND IMGKEY AFTER SAVING/RECORDING IT TO MODSELECTOR
    const blog=this._modSelector.blog;
    const {rowId,colId}=selRowCol || {selectorId:null,rowId:null,colId:null};
    const isRow=bg_parent.id===rowId;
    const isCol=bg_parent.id===colId;
 
    const {Key}=this._service.generateImgKey(formdata,blog) as {Key:string}//sets key in formdata
        const eleId=(isRow || isCol) ? bg_parent.id :image?.id; 
        if(Key){
            if(eleId && (isRow || isCol)){
                const idValue={eleId,id:"imgKey",attValue:Key} as idValueType;
                this._modSelector.dataset.upDateIdValue({target:bg_parent,idValue,idValues});
            }else if(image){
                const idValue={eleId,id:"imgKey",attValue:Key} as idValueType;
                this._modSelector.dataset.upDateIdValue({target:image,idValue,idValues});
            }

        }
        return await this._service.simpleImgUpload(bg_parent,formdata).then(async(s3ImgKey:gets3ImgKey)=>{
            if(s3ImgKey){
                const {img,Key}=s3ImgKey;
                if(image){
                    image.src=img;
                    image.alt=Key;
                    this._modSelector.updateElement({target:image,idValues,selRowCol});
                }else if(isCol || isRow){
                    bg_parent.style.backgroundImage=`url(${img})`;
                    bg_parent.style.backgroundSize=`100% 100%`;
                    bg_parent.style.backgroundPosition=`50% 50%`;
                    if(selRowCol){
                        if(isCol){
                            this._modSelector.updateColumn({target:bg_parent,idValues,selRowCol});
                        }else if(isRow ){
                            const {selectorId,rowId}=selRowCol;
                            const selRow={selectorId,rowId} as selRowType;
                            this._modSelector.updateRow({target:bg_parent,idValues,selRow});
                        }

                    }
                }
               
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg);Misc.message({parent:bg_parent,msg,type_:"error",time:700})});
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

   async saveImage({parent,blog,formdata,image,idValues,selRowCol}:{
    parent:HTMLElement,
    blog:blogType,
    formdata:FormData,
    image:HTMLImageElement|null,
    idValues:idValueType[],
    selRowCol:selRowColType|null

   }){
    //THIS IS FOR IMAGES THAT ARE UPLOADED AND HAVE FORMDATA WITH USER SIGNIN
    const user=this.user;
    if(user.id !==""){
        blog={...blog,user_id:user.id};
        const getKey=formdata.get("Key") as string;
        if(!getKey){
        this._service.generateImgKey(formdata,blog) as {Key:string};
        }
        return this.simpleGetS3Image({bg_parent:parent,formdata,image,idValues,selRowCol});

    }else{
        await this.signInBlogForm({parent,blog,func:()=>undefined});
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
            "/api/user_update"
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
            "/api/user_update"
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
            "/api/user_update"
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
           
        }
    }) as Promise<string|null>;
   }
   async getLocalUser(){
    return new Promise((resolver,rejector)=>{
        if(typeof window !=="undefined"){
        resolver(localStorage.getItem("user"))
       
        }
    }) as Promise<string |null>;
   }
   //ATTENTION!!:PARENT===navHeader (from Sidebar)
    async saveWork({parent,blog,func}:{parent:HTMLElement,blog:blogType,func:()=>Promise<void>|void|undefined}){
        //ATTENTION!!:PARENT===navHeader (from Sidebar)
        const user=this.user;
       const blogUser=this._modSelector.loadBlog({blog:blog,user});//loads blog and saves it to storage
        // console.log(user)//works
        const {blog:blog_}=blogUser;
        blog={...blog_}
        
        const notSignedIn=user && !user.id;
        const hasBlogWithSigninAndNoBlogName=(blog && user.id!=="" && !blog.name);
        const hasSignedInWithBlogName=(blog.user_id !=="" && blog.name && blog.name !=="undefined");
        blog={...blog,user_id:user.id};
    
         if(hasSignedInWithBlogName){
            blog={...blog,name:blog.name,desc:blog.desc,user_id:user.id}
        }
     
     switch(true){
        case notSignedIn:
            await this._service.signIn(parent);
        return
        case hasBlogWithSigninAndNoBlogName:
            this.SaveWorkblogNameDesc({parent,blog,user,func})
               
        return;
        case hasSignedInWithBlogName:
                 //----------------------SAVING BLOG-----------------------//
                 this.saveBlogWork({parent,blog,user,func});
                //----------------------SAVING BLOG-----------------------//
        return;
        default:
            return;
     }
    };


    async saveOnlyImage({parent,formdata,selRowCol,img,blog,idValues}:{
        parent:HTMLElement,
        formdata:FormData,
        img:HTMLImageElement|null,
        blog:blogType,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }){
       
        const user=this.user;
        if( img){
            const eleId=img.id;
            
            if(selRowCol){
                const idValue:idValueType={eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)};
                this._modSelector.dataset.upDateIdValue({target:img,idValues,idValue});
            }
        }

        if(user.id && blog && !blog.user_id){
            blog={...blog,user_id:user.id};
        }
       
        const notSignedIn=(!(user.id || user.email));
        const signedInPlusNoBlog=( user.id!=="" && blog.name==="");
        const signedInPLUSBlogName=(blog.user_id!=="" && blog.name !=="");
        switch(true){
            case notSignedIn:
            await this._service.signIn(parent);
            return;
            case signedInPlusNoBlog:
                this.blogNameDescFill({parent,img,blog,formdata,user,selRowCol,idValues})
            return;
            case signedInPLUSBlogName:
                this.signinPlusBlog({parent,img,formdata,selRowCol,idValues})
            return;
            
        }
    };

    SaveWorkblogNameDesc({parent,blog,user,func}:{
        parent:HTMLElement,
        blog:blogType,
        user:userType,
        func:()=>Promise<void>|void
    }){
        //NEEDS TO CREATE A NEW BLOG
    
        const cssPopup={inset:"0% 0% 0% 0%"};
            const {retParent,popup:nameDescPopup,form:nameDescForm,input:name_,textarea:desc_}=Misc.fillBlogNameDesc({parent,cssPopup});
                nameDescForm.onsubmit=async(e:SubmitEvent)=>{
                    if(e){
                        e.preventDefault();
                        const rand=Math.floor(Math.random()*1000);
                        const nameDescFormdata=new FormData(e.currentTarget as HTMLFormElement);
                        const _name=(name_ as HTMLInputElement).name as string;
                        const _desc=(desc_ as HTMLTextAreaElement).name as string;
                        const name=nameDescFormdata.get(_name) as string ||`${ user.username}-${rand}`;
                        const desc=nameDescFormdata.get(_desc) as string || "This is a description";
                        const title=nameDescFormdata.get("title") as string || "Your title can be changed";
                        const joinName=name.split(" ").join("");
                        blog={...blog,name:joinName,desc,title,user_id:user.id}; //saving it to local Storage
                       
                        //----------------------REMOVING FILBLOGNAMEDESC Form-----------------------//
                        Misc.message({parent,msg:"got it, thanks",type_:"success",time:400});
                        setTimeout(()=>{
                            Misc.fadeOut({anchor:nameDescPopup,xpos:50,ypos:100,time:400});
                            setTimeout(()=>{
                                retParent.removeChild(nameDescPopup);
                            },380);
                        },400);
                        //----------------------REMOVING FILBLOGNAMEDESC Form-----------------------//
                        //----------------------CREATING NEW BLOG-----------------------//
                        const getTextarea=document.querySelector("div#textarea") as HTMLElement;
                       await this._service.newBlog(blog).then(async(_blog:blogType)=>{
                            if(_blog){
                                blog={...blog,id:_blog.id};
                                Misc.message({parent,msg:"new blog created",type_:"success",time:400});
                                //----------------------SAVING BLOG-----------------------//
    
                                       await this._service.saveBlog({blog:blog,user}).then(async(savedB:blogType)=>{
                                            if( savedB){
                                                this.blog=savedB;//SAVING TO LOCAL
                                                Misc.message({parent:getTextarea,type_:"success",msg:" created && saved",time:700});
                                                func();//executing function
                                            }else{
                                                Misc.message({parent,type_:"error",msg:" was not saved: missing User_id",time:700});
                                            }
                                            
                                            
                                        }).catch((err)=>{const msg=getErrorMessage(err); console.error(msg);
                                            Misc.message({parent:getTextarea,msg:msg,type_:"error",time:1200});
                                        });
                               
                                //----------------------SAVING BLOG-----------------------//
                            }
                        }).catch((err)=>{const msg=getErrorMessage(err); console.error(msg);
                            Misc.message({parent,msg:msg,type_:"error",time:800});
                        });
                        //----------------------CREATING NEW BLOG-----------------------//
                    }
                };
    };


    saveBlogWork({parent,blog,user,func}:{parent:HTMLElement,blog:blogType,user:userType,func:()=>Promise<void>|void}){

        this._service.saveBlog({blog,user}).then(async(newBlog:blogType)=>{
            if(newBlog){
                this._service.promsaveItems({blog:newBlog,user}).then(async(_blog)=>{
                    if(_blog){
                        Misc.message({parent,type_:"success",msg:" created && saved",time:700});
                        func();//executing function
                    }
                });
            }else{
                Misc.message({parent,type_:"error",msg:"missing user_id",time:1200});
            }
            
        }).catch((err)=>{
            const msg=getErrorMessage(err);
             console.error(msg);
            Misc.message({parent,msg:msg,type_:"error",time:1600});
         });
    }



    blogNameDescFill({parent,img,blog,formdata,user,selRowCol,idValues}:{
        parent:HTMLElement,
        formdata:FormData,
        img:HTMLImageElement|null,
        blog:blogType,
        user:userType,
        selRowCol:selRowColType|null,
        idValues:idValueType[]
    }){
        const cssPopup={inset:"160% 0% 0% 0%"};
        const {rowId,colId,selectorId}=selRowCol || {selectorId:null,rowId:null,colId:null};
        const isCol=parent.id===colId;
        const isRow=parent.id===rowId;
        const {retParent,popup:nameDescPopup,form:nameDescForm,input:name_,textarea:desc_}=Misc.fillBlogNameDesc({parent,cssPopup});
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
                        retParent.removeChild(nameDescPopup)
                        
                    },380);
                    const combName=name.split(" ").join("");
                   
                    this.blog={...blog,name:combName,desc,user_id:user.id} as blogType; //saving it to local Storage
                    blog={...blog,name:combName,desc,user_id:user.id} as blogType; 
                    if(img){
                        const eleId=img.id;

                        await this._service.simpleImgUpload(parent,formdata).then(async(imgKeyUrl:gets3ImgKey)=>{
                                if(imgKeyUrl){
                                    const {img:image,Key}=imgKeyUrl;
                                    const getTextarea=document.querySelector("div#textarea") as HTMLElement;
                                        img.src=image;
                                        img.alt=Key;
                                        formdata.set("file","");
                                        formdata.set("Key","");
                                        const idValue:idValueType={eleId,id:"imgKey",attValue:Key};
                                        this._modSelector.dataset.upDateIdValue({target:img,idValues,idValue});
                                            if(selRowCol){
                                                await this._modSelector.updateElement({target:img,idValues,selRowCol}).then(async(res)=>{
                                                    if(res){
                                                        
                                                        Misc.message({parent:getTextarea,type_:"success",msg:" created && saved",time:700});
                                                    }
                                                });
                                            }else{
                                            this._modSelector.updateElement({target:img,idValues,selRowCol:null}).then(async(res)=>{
                                                if(res){
                                                    const ele=res.ele as elementType;
                                                    Misc.message({parent:getTextarea,msg:`${ele.eleId}- saved`,type_:"success",time:1200});
                                                }
                                            });
                                            }
                                        
                                    
                                    
                                }
                            }).catch((err)=>{const msg=getErrorMessage(err);Misc.message({parent,msg,type_:"error",time:700})});
                    }else if(selRowCol){
                        //BACKGROUND IMAGE
                        await this._service.uploadfreeimage({formdata}).then(async(res)=>{
                            if(res){
                                parent.style.backgroundImage=`url(${res.img})`;
                                parent.setAttribute("data-backgroundImage","true");
                                parent.style.backgroundSize="100%  100%";
                                parent.style.backgroundPosition="50% 50%";
                                
                                    const eleId=parent.id;
                                    
                                    const idValue:idValueType={eleId,id:"imgKey",attValue:res.Key};
                                    this._modSelector.dataset.upDateIdValue({target:parent,idValues,idValue});
                                        if(isRow ){
                                            const selRow={selectorId,rowId};
                                            this._modSelector.updateRow({target:parent,idValues,selRow}).then(async(res)=>{
                                                if(res){
                                                    Misc.message({parent,msg:`${parent.id}- saved`,type_:"success",time:1200});
                                                }
                                            });
                                        }else if(isCol){
                                            this._modSelector.updateColumn({target:parent,idValues,selRowCol}).then(async(res)=>{
                                                if(res){
                                                    Misc.message({parent,msg:`${parent.id}- saved`,type_:"success",time:1200});
                                                }
                                            });
                                        };
                                    }
                        });

                    }else{
                        Misc.message({parent,msg:`the parent element is not a row or column`,type_:"error",time:2500});

                    }
                }
            }
        });
    };


   async signinPlusBlog({parent,img,formdata,selRowCol,idValues}:{
        parent:HTMLElement,
        formdata:FormData,
        img:HTMLImageElement|null,
        selRowCol:selRowColType|null,
        idValues:idValueType[]
    }){
        const {selectorId,rowId,colId}=selRowCol || {selectorId:null,rowId:null,colId:null};
        const isRow=parent.id===rowId;
        const isCol=parent.id===colId;
        if(img){
            const eleId=img.id;
            await this._service.simpleImgUpload(parent,formdata).then(async(imgKeyUrl:gets3ImgKey)=>{
                  if(imgKeyUrl){
                        const {Key,img:image}=imgKeyUrl
                        const idValue={eleId,id:"imgKey",attValue:Key} as idValueType
                        this._modSelector.dataset.upDateIdValue({target:img,idValues,idValue});
                        img.src=image;
                        img.alt=Key;
                        formdata.set("file","");
                        formdata.set("Key","");
                        if(selRowCol){
                            this._modSelector.updateElement({target:img,idValues,selRowCol}).then(async(res)=>{
                                if(res){
                                    const ele=res.ele as element_selType;
                                    Misc.message({parent,msg:`${ele.eleId}- saved`,type_:"success",time:1200});
                                }
                            });
                        }else{
                        this._modSelector.updateElement({target:img,idValues,selRowCol:null}).then(async(res)=>{
                            if(res?.ele){
                                const ele=res.ele as elementType;
                                Misc.message({parent,msg:`${ele.eleId}- saved`,type_:"success",time:1200});
                            }
                        });
                        }
                      
                        
                  }
              }).catch((err)=>{const msg=getErrorMessage(err);Misc.message({parent,msg,type_:"error",time:700})});

        }else if(selRowCol){
            const eleId=parent.id;
            //BACKGROUND IMAGE
            await this._service.uploadfreeimage({formdata}).then(async(res)=>{
                if(res){
                    const {img:image,Key}=res as {img:string,Key:string};
                    parent.style.backgroundImage=`url(${image})`;
                    parent.setAttribute("data-backgroundImage","true");
                    parent.style.backgroundSize="100%  100%";
                    parent.style.backgroundPosition="50% 50%";
                    const idValue={eleId,id:"imgKey",attValue:Key} as idValueType
                        this._modSelector.dataset.upDateIdValue({target:parent,idValues,idValue});
                    if(isCol){
                            this._modSelector.updateColumn({target:parent,idValues,selRowCol}).then(async(res)=>{
                                if(res){
                                    Misc.message({parent,msg:`${parent.id}- saved`,type_:"success",time:1200});
                                }
                            });
                    }else if(isRow){
                            const selRow={selectorId,rowId};
                            this._modSelector.updateRow({target:parent,idValues,selRow}).then(async(res)=>{
                                if(res){
                                    Misc.message({parent,msg:`${parent.id}- saved`,type_:"success",time:1200});
                                }
                            });
                    }
                }
            });
        }else{
            Misc.message({parent,msg:`the parent element is not a row or column`,type_:"error",time:2500});
        }
    };


    
  
    
    upLoadImage({parent,image,blog,idValues,sel,row,col}:{
        parent:HTMLElement,
        image:HTMLImageElement,
        blog:blogType,
        idValues:idValueType[]
        sel:selectorType|null,
        row:rowType|null,
        col:colType|null
    }){
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
                    const selRowCol=sel && row && col ? {selectorId:sel?.eleId,rowId:row.eleId,colId:col.eleId} as selRowColType:null
                    this.askSendToServer({bg_parent:parent,formdata,image,blog,oldKey:null,idValues,selRowCol});
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
    };

    
   
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
        return Promise.resolve({popup,cancel,save}) as Promise<{cancel:HTMLButtonElement,save:HTMLButtonElement,popup:HTMLElement}>;

    };


    checkStrLength=(img:string | undefined):boolean=>{
        if(img && img as string ){
            const check=img.split("") && img.split("").length >0 ;
            return check
        }
        return false
    };


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
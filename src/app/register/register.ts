import Misc from "@/components/common/misc";
import Service from "@/components/common/services";
import Header from "@/components/editor/header";
import ModSelector from "@/components/editor/modSelector";
import { userType } from "@/components/editor/Types";
import Nav from "@/components/nav/headerNav";
import RegSignIn from "@/components/nav/regSignin";
import User from "@/components/user/userMain";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { getCsrfToken, getProviders } from "next-auth/react";


class Register {
    regSignin:RegSignIn;
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
        this.regSignin=new RegSignIn(this._modSelector,this._service,this._user);
    }
    main(item:{parent:HTMLElement,count:number}):Promise<number>{
        const {parent,count}=item;
        Header.cleanUpByID(parent,"register-page-main");
        Header.cleanUpByID(parent,"button-signin");
        Header.cleanUpByID(parent,"register-page-main-text");
        parent.style.cssText="margin-inline:auto;padding-inline:10rem;padding-block:1rem;height:auto;width:100%;display:flex;flex-direction:column;width:100%;align-items:center;justify-content:flex-start;z-index:20;";
        const container=document.createElement("section");
        container.id="register-page-main";
        container.style.cssText="padding-inline:2rem;margin-inline:2rem;margin-block:3rem;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:1.5rem;background-color:black;border-radius:12px;z-index:2;width:100%;height:auto;";
        const innerContainer=document.createElement("div");
        innerContainer.id="register-page-main-sub";
        innerContainer.style.cssText="padding:5rem;border-radius:12px;background-color:#0000ff70;z-index:2;width:100%;min-height:90vh;display:flex;align-items:center;flex-direction:column;justify-content:flex-start;";
        this.displayFailedSignin({parent:innerContainer});
        container.appendChild(innerContainer);
        this.register(container,innerContainer);
        parent.appendChild(container)
        const {button}=Misc.simpleButton({anchor:parent,bg:Nav.btnColor,color:"white",text:"sign in",type:"button",time:400});
        button.id="button-signin";
        button.onclick=(e:MouseEvent)=>{
            if(e){
                // redirecting  to signIn
                const url=new URL(window.location.href);
                const newUrl=new URL("/signin",url.origin);
                window.location.replace(newUrl.href);
            }
        };
        Misc.matchMedia({parent,maxWidth:1100,cssStyle:{paddingInline:"6rem"}});
        Misc.matchMedia({parent,maxWidth:900,cssStyle:{paddingInline:"4rem"}});
        Misc.matchMedia({parent,maxWidth:400,cssStyle:{paddingInline:"1rem",height:"110vh",minHeight:"auto",overflowY:"scroll"}});
        Misc.matchMedia({parent:innerContainer,maxWidth:400,cssStyle:{paddingInline:"0rem",marginInline:"0rem",height:"80vh"}});
        Misc.matchMedia({parent:innerContainer,maxWidth:900,cssStyle:{paddingInline:"4rem",height:"60vh"}});
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{paddingInline:"0rem",marginInline:"0rem",marginBlock:"auto"}});
        return new Promise(resolve=>{
            resolve(count + 1)
        }) as Promise<number>;
    }

    displayFailedSignin(item:{parent:HTMLElement}){
        const {parent}=item;
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const word=this.getUrlError();
        if(word){
            const container=document.createElement("div");
            container.id="register-displayFailedSignin-container";
            container.style.cssText="margin-inline:auto;margin-block:2rem;display:flex;flex-direction:column;place-items:center;padding-block:2rem;border-radius:12px;color:white;box-shadow:1px 1px 12px 1px white;";
            container.style.paddingInline=less900 ? ( less400 ? "1rem":"2rem"):"3rem";
            const message=document.createElement("h6");
            message.id="container-warning";
            message.style.cssText="font-family:'Poppins-Regular';font-weight:bold;color:white;margin-inline:auto;padding-block:1rem;font-size:140%;";
            message.textContent=word;
            const para=document.createElement("p");
            para.id="container-para";
            para.style.cssText="font-family:'Poppins-Regular';color:white;margin-inline:auto;padding-bottom:1rem;";
            para.innerHTML=`sorry for the inconvenience. It appears that you encountered <span style=color:#00fff2> ${word} </span>. So just register with another email, then re-sign in and we will be on the road with success.`;
            para.style.paddingInline=less900 ?(less400 ? "1.5rem":"2rem"):"3rem";
            const signed= document.createElement("pre");
            signed.id="container-signed";
            signed.style.cssText="color:#00fff2;font-size:175%;font-weight:bold;"
            signed.textContent="registration is below";
            container.appendChild(message);
            container.appendChild(para);
            container.appendChild(signed);
            parent.appendChild(container);
            container.animate([
                {opacity:"0"},
                {opacity:"1"},
            ],{duration:1700,iterations:1,"easing":"ease-in-out"});
            
        }
    }
    getUrlError():string|null{
        const params: { name: string, value: RegExp }[] = [{ name: "account already exist", value: /(OAuthAccountNotLinked)/ },{ name: "account missed configured", value: /(OAuthCallback)/ },{ name: " wrong password or forgotten password", value: /(CredentialsSignin)/ }];
        const url=new URL(window.location.href);
        let word:string|null=null;
        params.map(link=>{
            const error=url.searchParams.get("error");
            if(error && link.value.test(error)){
                word=link.name
            }else{
                word=error;
            }
        });
        return word;
    }
    register(mainHeader:HTMLElement,section:HTMLElement){
        //ADD LOG AND ENSURE SECRETLEY
        //REMOVING SIGNIN AND BUILDING REGISTER
        Header.cleanUpByID(section,"signIn-main");
        Header.cleanUpByID(section,"signIn-main-register-btn");
        Header.cleanUpByID(section,"register-container");
        mainHeader.style.position="relative";
        const container=document.createElement("div");
        container.id="register-container";
        section.style.position="relative";
        section.style.display="flex";
        section.style.flexDirection="column";
        section.style.alignItems="center";
        section.style.backgroundColor="transparent";
        container.style.cssText = "position:relative;margin-inline:auto;margin-block:1rem;display:flex;justify-content:flex-start;flex-direction:column;align-items:center;gap:1rem;padding-inline:2rem;padding-block:1rem;padding-inline:3rem;backround-color:white;border-radius:16px;background-color:white;padding:1rem;font-size:18px;max-width:650px;width:100%;";
        container.style.zIndex="0";
        // container.style.inset=section.style.inset;
        //LOGO
        const paraLogo=document.createElement("p");
        paraLogo.id="paraLogo";
        paraLogo.style.cssText="margin-inline;auto;font-family:LobsterTwo-Regular;color:white;font-size:18px;padding-inline:1rem;line-height:2.75rem;border-radius:15px;background-color:#0C090A";
        const img=document.createElement("img");
        img.src=Misc.sourceImage({src:this.regSignin.logo,width:125,quality:75});
        img.alt="www.ablogroom.com";
        img.style.cssText="shape-outside:circle(50%);border-radius:50%;aspect-ratio: 1 / 1;width:155px;filter:drop-shadow(0 0 0 0.5rem white);float:left;line-height:2.54rem;margin-right:1rem;margin-block:1.5rem;box-shadow:1px 1px 12px 1px white;";
        paraLogo.appendChild(img);
        paraLogo.innerHTML+="When Registering, we Keep Your Information Secret and Provide the Means Allowing You the Option on keeping your Information hiding with the highest regard to safeguard your email.";
        container.appendChild(paraLogo);
        //LOGO
       
        const form=document.createElement("form");
        form.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;width:fit-content;";
        form.id="register-form";
        const {input:name,label:lname}=Nav.inputComponent(form);
        name.name="name";
        name.autocomplete="name";
        name.id="register-form-name";
        name.type="text";
        name.value="";
        lname.setAttribute("for",name.id);
        lname.textContent="name";
        name.placeholder="full name";
        const {input:email,label:lemail,formGrp:femail}=Nav.inputComponent(form);
        email.name="email";
        email.pattern="[0-9a-zA-Z]{2,}\@[a-z]{2,}\.[a-z]{2,3}";
        email.id="register-form-email";
        email.type="email";
        email.autocomplete="on";
        email.value="";
        lemail.setAttribute("for",email.id);
        lemail.textContent="email";
        email.placeholder="your@email.com";
        const divPass=document.createElement("div");
        divPass.style.cssText="margin-inline:auto;display:flex;justify-content:center;align-items:center;padding:1rem;background-color:rgb(4 10 63 / 97%);border-radius:12px;"
        const {input:pass,label:lpass,formGrp:fpass}=Nav.inputComponent(divPass);
        pass.name="password";
        pass.pattern="[0-9a-zA-Z\?\!]{5,}";
        pass.id="register-form-password";
        pass.type="password";
        pass.value="";
        pass.autocomplete="on";
        lpass.setAttribute("for",pass.id);
        lpass.textContent="password";
        pass.placeholder="at least five characters please";
        const {input:vpass,label:lvpass,formGrp:fvpass}=Nav.inputComponent(divPass);
        vpass.name="verify-password";
        vpass.pattern="[0-9a-zA-Z\?\!]{5,}";
        vpass.id="register-form-verify-password";
        vpass.type="password";
        vpass.autocomplete="on";
        vpass.value="";
        lvpass.setAttribute("for",pass.id);
        lvpass.textContent="password again for you";
        vpass.placeholder="at least five characters please";
        form.appendChild(divPass);
        const {textarea:bio,label:lbio}=Nav.textareaComponent(form);
        bio.name="bio";
        bio.id="register-form-bio";
        bio.rows=4;
        bio.style.cssText="min-width:300px;width:100%;"
        lbio.setAttribute("for",bio.id);
        lbio.textContent="who you are"
        bio.placeholder="your summary";
        const {input:showinfo,label:lshowinfo}=Nav.inputComponent(form);
        showinfo.className="";
        showinfo.name="showinfo";
        showinfo.id="register-form-showinfo";
        showinfo.type="checkbox";
        showinfo.checked=true;
        lshowinfo.setAttribute("for",pass.id);
        lshowinfo.textContent="show your name and email?";
        const {button:submit}=Misc.simpleButton({anchor:form,type:"submit",bg:Nav.btnColor,color:"white",text:"submit",time:400});
        submit.disabled=true;
        email.onchange=(e:Event)=>{
            if(e){
                const email_=(e.currentTarget as HTMLInputElement).value;
                this.regSignin.checkEmailReg({femail:femail,email:email_,btn:submit})
            }
        };
        pass.onchange=(e:Event)=>{
            if(e){
                const passValue=(e.currentTarget as HTMLInputElement).value;
                this.regSignin.showPasswordMatch({formPass:fpass,pass:passValue,vpass:null,change:false,btn:submit})
            }
        };
        vpass.onchange=(e:Event)=>{
            if(e){
                const vpassValue=(e.currentTarget as HTMLInputElement).value;
                const passValue=(pass as HTMLInputElement).value;
                this.regSignin.showPasswordMatch({formPass:fvpass,pass:passValue,vpass:vpassValue,change:true,btn:submit})
            }
        };
        container.appendChild(form);
        section.appendChild(container);
        
        
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{flexDirection:"column",justifyContent:"center",alignItems:"center"}});
        Misc.matchMedia({parent:divPass,maxWidth:400,cssStyle:{flexDirection:"column",justifyContent:"center",alignItems:"center"}});
        Misc.growIn({anchor:container,scale:0,opacity:0,time:400});

        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const password=formdata.get("password") as string;
                const verifyPassword=formdata.get("verify-password") as string;
                const email=formdata.get("email") as string;
                const name=formdata.get("name") as string;
                const bio=formdata.get("bio") as string;
                const showinfo=Boolean(formdata.get("showinfo") as string);
                if(verifyPassword !==password){
                    this.regSignin.showPasswordMatch({formPass:fpass,pass:password,vpass:verifyPassword,change:false,btn:submit})
                }
                const user={...this._user.user,email,name,password,bio:bio,showinfo:showinfo};
                this._service.registerUser(user).then(async(user_)=>{
                    if(user_){
                            this._user.user={...user_,password:user.password};
                            container.removeChild(form);
                            //ADD IMAGE DISPLAY ON CONTAINER FROM HERE
                            const image=document.createElement("img");
                            image.style.cssText="width:150px;border-radius:50%;box-shadow:1px 1px 12px 1px black;position:absolute;inset:0%;filter:drop-shadow(0 0 0.5rem black);margin:auto;";
                            const user_id=this._user.user.id as string;
                           await this._service.newUserEMailTo(user_id)
                            this.regSignin.wantProfileImage(mainHeader,section,container,image,user_);
                            // /auth/new-user url is used for new user and therefore this is not needed for first time user
                            // await this._service.welcomeEmail(user.id)//AUTH/NEW-USER HANDLES THIS
                    }
                });
            }
        };
    }
    showPasswordMatch(item:{formPass:HTMLElement,pass:string,vpass:string|null,change:boolean,btn:HTMLButtonElement}){
        const {formPass,pass,vpass,btn}=item;
        Header.cleanUpByID(formPass,"showPasswordmatch");
        const checkOne=this.regSignin.pReg.test(pass) ? true:false;
        const checkTwo=(vpass && this.regSignin.pReg.test(pass) && this.regSignin.pReg.test(vpass) && pass===vpass) ? true:false;
        const container=document.createElement("div");
        container.id="showPasswordmatch"
        formPass.style.position="relative";
        container.style.cssText="position:absolute;z-index:200;width:100%;top:-290%;left:0%;right:0%;color:red;padding:1rem;border-radius:12px;box-shadow:1px 1px 12px 1px black;background-color:white;box-shadow:1px 1px 12px 1px black;margin-block:1.5rem;";
        const text=document.createElement("p");
        if(!checkTwo && (pass && vpass)){
            btn.disabled=true;
            btn.textContent="disabled";
            text.textContent="passwords are not equal. please verify,,,";
            container.appendChild(text);
        }
        else if(!checkOne && !vpass){
            btn.disabled=true;
            btn.textContent="disabled";
            text.textContent="password needs to be atleast 5-characters long";
            container.appendChild(text);
        }else{
            btn.disabled=false;
            btn.textContent="sign in";
            text.textContent="thanks";
            container.appendChild(text);
        }
        
        formPass.appendChild(container);
        container.animate([
            {transform:"scale(0.2)",opacity:"0.4"},
            {transform:"scale(1)",opacity:"1"},
        ],{duration:400,iterations:1});
        setTimeout(()=>{
            Misc.growOut({anchor:container,scale:0,opacity:0,time:400});
            setTimeout(()=>{
                formPass.removeChild(container);
            },390);
        },1200);
     }
     wantProfileImage(mainHeader:HTMLElement,section:HTMLElement,container:HTMLElement,image:HTMLImageElement,user:userType){
        //THIS GIVES THE USER TWO CHOICES CLOSE UPLOADING IMAGE AND OPEN SIGNIN POPUP OR UPLOAD IMAGE THEN GO TO SIGNIN
        const popup=document.createElement("div");
        popup.id="ask-profile-image-upload";
        popup.style.cssText="margin-inline:auto;position:absolute;inset:0%;background-color:white;border-radius:12px;box-shadow:1px 1px 12px 1px black;padding:1rem;";
        const text=document.createElement("h6");
        text.textContent="profile upload?";
        text.className="text-center text-primary text-decoration-underline text-underline-offset-3 mb-4";
        popup.appendChild(text);
        const divGrp=document.createElement("div");
        divGrp.style.cssText="margin:auto;display:flex;justify-content:space-around;align-items:center;"
        const {button:close}=Misc.simpleButton({anchor:divGrp,text:"not now",type:"button",bg:"black",color:"white",time:400});
        const {button:upload}=Misc.simpleButton({anchor:divGrp,text:"upload image",type:"button",bg:"blue",color:"white",time:400});
        popup.appendChild(divGrp);
        section.appendChild(popup);
        close.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:section,scale:0,opacity:0,time:400});
                setTimeout(async()=>{
                    const providers= await getProviders()
                    const csrfToken=await getCsrfToken();
                    if(!providers && !csrfToken){
                        //DIRECTING USER TO SIGNIN IF CAN'TE GET PROVIDERS
                        const url=new URL(window.location.href);
                        const newUrl= new URL("/",url.origin);
                        window.location.href=newUrl.href;
                    }else if(providers && csrfToken){
                        //removing container
                        section.removeChild(container);
                        //pulling up form for signIn
                        Object.values(providers).map(provider=>{
                            if((provider.id as unknown as string)==="credentials"){
                                const signInCallBack=provider.callbackUrl as unknown as string;
                                this.regSignin.signInForm(section,signInCallBack,csrfToken);
                                //closing popup
                                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                                setTimeout(()=>{section.removeChild(popup)},390);
                            }
                        });
                    }
                    
                },300);
            }
        };
        upload.onclick=(e:MouseEvent)=>{
            if(e){
                //uploading file import for upload image
                this.regSignin.userImageForm(mainHeader,section,container,image,user);
                //closing popup
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{section.removeChild(popup)},390);
            }
        };
    }
    

}
export default Register;
    
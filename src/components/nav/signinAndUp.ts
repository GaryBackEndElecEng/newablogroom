import { getErrorMessage } from "@/lib/errorBoundaries";
import Misc from "../common/misc";
import Service from "../common/services";
import Header from "../editor/header";
import ModSelector from "../editor/modSelector";
import Nav from "./headerNav";
import RegSignIn from "./regSignin";
import { FaCreate } from "../common/ReactIcons";
import { FaCrosshairs, FaSign, FaSignOutAlt } from "react-icons/fa";
import { gets3ImgKey, userType } from "../editor/Types";
import AuthService from "../common/auth";


class SignInAndUp{
    public readonly signin:string="/images/signin.png";
    public readonly barIcon:string="/images/barIcon.png";
    public readonly signup:string="/images/signup.png";
    public readonly signupTwo:string="/images/signupTwo.png";
    public logo:string="/images/gb_logo.png";
    private _isSignedIn:boolean;
    constructor(private _modSelector:ModSelector,private _service:Service,public regSignin:RegSignIn,private auth:AuthService,isSignedIn:boolean){
        this.signin="/images/signin.png";
        this.signup="/images/signup.png";
        this.logo="/images/gb_logo.png";
        this.signupTwo="/images/signupTwo.png";
        this.barIcon="/images/barIcon.png";
        this._isSignedIn=isSignedIn;

    };

    //----------------SETTERS/GETTERS----------------------//
    get user(){
        return this.auth.user;
    }
    //----------------SETTERS/GETTERS----------------------//

    //INJECTED:Id:mainHeader#header-end
   async main({parent}:{parent:HTMLElement}):Promise<{parent:HTMLElement,container:HTMLElement,user:userType,isSignedIn:boolean}>{
        //MUST PARENT MUST APPEND CONTAINER OR IT WILL NOT SHOW
        const url=new URL(window.location.href);
        const pathname=url.pathname;
        const isSignedIn=this._isSignedIn;
        const less900= window.innerWidth <900;
        const less400= window.innerWidth <400;
        parent.style.position="relative";
        const css_col="display:flex;justify-content:center;align-items:center;flex-direction:column;height:45px;";
        const css_row="display:flex;justify-content:center;align-items:center;flex-wrap:nowrap;height:40px;gap:1rem;";
        const btnShape="margin:auto;position:relative;height:100%;aspect-ratio:1 / 1;background-color:black;filter:drop-shadow(0 0 1rem white);border-radius:50%;";
        const container=document.createElement("div");
        container.id="signInAndUp-main-container";
        container.style.cssText="margin:auto;height:inherit;";
        container.style.gap=less400 ? "0":"1rem";
        if(pathname !=="/register"){
            if(isSignedIn){
                await this.signInDisplay({parent,user:this.user})
    
            }else{
                this.dropDownIcon({parent:container,css_col,css_row,less900,less400,btnShape});
                
            };
        }
        return Promise.resolve({parent,container,user:this.user,isSignedIn}) as Promise<{parent:HTMLElement,container:HTMLElement,user:userType,isSignedIn:boolean}>;
    };


    dropDownIcon({parent,css_col,css_row,less900,less400,btnShape}:{
        parent:HTMLElement,
        css_col:string,
        css_row:string,
        less900:boolean,
        less400:boolean,
        btnShape:string

    }){
        let isOn=false;
        const div=document.createElement("div");
        div.id="dropDownIcon-barIcon-cont";
        div.style.cssText="display:flex;justify-content:center;align-items:center;border-radius:10px;height:40px;width:auto;cursor:pointer;border-radius:26px;padding:10px;";
        const img=document.createElement("img");
        img.id="bar-img";
        img.style.cssText="height:inherit;aspect-ratio:inherit;width:auto;border-radius:inherit;filter:drop-shadow(0 0 0.5rem white);border:none;";
        img.style.transform=less900 ? (less400 ? "scale(0.3)":"scale(0.4)"):"scale(0.5)";
        img.src=this.barIcon;
        img.alt="ablogroom";
        div.appendChild(img);
        parent.appendChild(div);
        div.onclick=async(e:MouseEvent)=>{
            if(isOn){
                isOn=false;
            }else{
                isOn=true;
            }
            await this.dropDownCont({parent,css_col,css_row,less900,less400,btnShape,isOn});
            if(!e) return;
        };

    };


    async dropDownCont({parent,css_col,css_row,less900,less400,btnShape,isOn}:{
        parent:HTMLElement,
        css_col:string,
        css_row:string,
        less900:boolean,
        less400:boolean,
        btnShape:string,
        isOn:boolean

    }){
        Header.cleanUpByID(parent,"dropDown-popup")
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.id="dropDown-popup";
        popup.className="popup";
        popup.style.cssText=css_row +"position:absolute;inset:0%;width:fit-content;height:inherit;border-radius:inherit;height:inherit;z-index:2000;background-color:white;border-radius:8px;";
        popup.style.transform="translateX(-100px)";
        popup.style.gap="0.5rem";
        popup.style.paddingInline="0.5rem";
        popup.style.paddingBlock="0.25rem";
        const time=1000;
        if(isOn){
            popup.style.opacity="1";
            popup.animate([
                {transform:"translateX(0px) scale(0)",opacity:"0",backgroundColor:"transparent"},
                {transform:"translateX(-25px) scale(0.5)",opacity:"1",backgroundColor:"whitesmoke"},
                {transform:"translateX(-50px) scale(1)",opacity:"0.5",backgroundColor:"white"},
                {transform:"translateX(-100px) scale(1)",opacity:"1",backgroundColor:"white"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
        }else{
            popup.style.opacity="0";
            popup.animate([
                {transform:"translateX(-100px) scale(1)",opacity:"1",backgroundColor:"white"},
                {transform:"translateX(-50px) scale(1)",opacity:"1",backgroundColor:"white"},
                {transform:"translateX(-25px) scale(0.5)",opacity:"0.5",backgroundColor:"whitesmoke"},
                {transform:"translateX(0px) scale(0)",opacity:"0",backgroundColor:"transparent"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
            await this.sleep({time,func:()=>{parent.removeChild(popup)}});
        }
        parent.appendChild(popup);
        this.signInBtn({parent:popup,css_col,less900,less400,btnShape});
        this.signUpBtn({parent:popup,css_col,less900,less400,btnShape});
    };

 async sleep({time,func}:{time:number,func:()=>Promise<void>|void}){
    return Promise.resolve(setTimeout(func,time));
 }


    signInBtn({parent,css_col,less900,less400,btnShape}:{
        parent:HTMLElement,
        css_col:string,
        less900:boolean,
        less400:boolean,
        btnShape:string

    }){
        const container=document.createElement("div");
        container.id="signIn-container";
        container.style.cssText= btnShape;
        container.style.transform=less400 ? "scale(0.8)":"scale(1)";
        const img=document.createElement("img");
        img.id="signin-img";
        img.src=this.signin;
        img.alt="www.ablogroom.com";
        img.style.cssText="width:100%;margin:auto;border-radius:inherit;";
        container.appendChild(img);
        parent.appendChild(container);
        container.onclick=(e:MouseEvent)=>{
            if(e){
                this.regSignin.signIn();
            }
        };
    };

    signUpBtn({parent,css_col,less900,less400,btnShape}:{parent:HTMLElement,css_col:string,less900:boolean,less400:boolean,btnShape:string}){
        const container=document.createElement("div");
        container.id="signUp-container";
        container.style.cssText=btnShape;
        container.style.transform=less400 ? "scale(0.8)":"scale(1)";
        const img=document.createElement("img");
        img.id="signup-img";
        img.src=this.signup;
        img.alt="www.ablogroom.com";
        img.style.cssText="width:100%;margin:auto;border-radius:inherit;";
        container.appendChild(img);
        parent.appendChild(container);
        container.onclick=(e:MouseEvent)=>{
            if(e){
                this.signupForm({css_col,less400});
            }
        };
    };

    signupForm({css_col,less400}:{css_col:string,less400:boolean}){
   
        const getBody=document.querySelector("header#navHeader") as HTMLElement;
        const less900=window.innerWidth < 900 ;
        const less380=window.innerWidth < 380 ;
        getBody.style.zIndex="";
        getBody.style.position="relative";
        Header.cleanUpByID(getBody,"signInUp-signIn-section-popup");
      
        const section=document.createElement("section");
        section.id="signInUp-signIn-section-popup";
        section.style.cssText=css_col + "margin:auto;position:absolute;background-color:#10c0b68f;filter:drop-shadow(0 0 0.75rem crimson);border-radius:7px;padding:1rem;z-index:100;padding:1.5rem;z-index:20;backdrop-filter:blur(20px);gap:1rem;";
        section.style.inset=less900 ? (less400 ? "-100% 0% auto 0%":"0% 20% auto 20%") :"0% 30% auto 30%";
        section.style.transform=less900 ? (less400 ? "translateY(100px)":"translateY(90px)"):"translateY(90px)";
        section.style.height="400px";
        section.style.maxWidth=less900 ? (less400 ? (less380 ? "390px" :"490px"):"500px") :"600px";
        section.style.minWidth=less900 ? (less400 ? (less380 ? "370px" :"320px"):"400px") :"400px";
        section.style.width="100%";
        section.style.position="absolute";
        //SIGNUP IMG
        const img=document.createElement("img");
        img.style.cssText="border-radius:26%; width:150px;aspect-ratio:1 /1;filter:drop-shadow(0 0 0.5rem black);border:none;";
        img.src=this.signupTwo;
        img.alt="www.ablogroom.com";
        section.appendChild(img);
        //SIGNUP IMG
        //FORM => NAME && EMAIL
        const form=document.createElement("form");
        form.id="signUpForm-form";
        form.style.cssText=css_col + " width:100%;position:relative;maring:auto;background-color:white;border-radius:8px;box-shadow:1px 1px 12px 1px black;height:auto;";
        form.style.padding=less900 ? (less400 ? "1px" :"5px") :"1rem";
        const {input:ninput,label:llabel,formGrp:grpName}=Nav.inputComponent(form);
        grpName.classList.add("mx-auto");
        grpName.classList.add("w-75");
        ninput.id="name";
        ninput.name="name";
        ninput.type="name";
        ninput.autocomplete="name";
        ninput.placeholder="name";
        llabel.setAttribute("for",ninput.id);
        llabel.textContent="name";
        const {input:einput,label:elabel,formGrp:grpEmail}=Nav.inputComponent(form);
        grpEmail.classList.add("mx-auto");
        grpEmail.classList.add("w-75");
        einput.id="email";
        einput.name="email";
        einput.type="email";
        einput.autocomplete="email";
        einput.placeholder="email";
        elabel.setAttribute("for",einput.id);
        elabel.textContent="email";
        const {button}=Misc.simpleButton({anchor:form,type:"submit",bg:Nav.btnColor,color:"white",text:"ok",time:400});
        button.disabled=true;
        section.appendChild(form);//appending form
        getBody.appendChild(section);//APPENDING SECTION
        this.removeForm({parent:getBody,target:section});
        const yy=section.style.transform
        section.animate([
            {transform:"translateY(-100%)",opacity:"0.2"},
            {transform:yy,opacity:"1"}
        ],{duration:600,iterations:1,"easing":"ease-in-out"});
        ninput.onchange=(e:Event)=>{
            if(e){
                button.disabled=false;
            }
        };
        einput.onchange=(e:Event)=>{
            if(e){
                button.disabled=false;
            }
        };
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const name=formdata.get("name") as string;
                const email=formdata.get("email") as string;
                if(name && email){
                    
                    const nameEmail={name:name,email:email};
                    this._service.simpleSignUp(nameEmail).then(async(res)=>{
                        if(res){
                            const time=400 + 4900
                            Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                            setTimeout(()=>{
                                section.removeChild(form);
                                const msg="Thank you for signing up. We are fortunate to have trustworthy members to join.... Thank you kindly. admin."
                                 this.saveMessage(section,msg);

                            },390)
                           
                            setTimeout(()=>{
                                Misc.growOut({anchor:section,scale:0,opacity:0,time:400});
                                setTimeout(()=>{ getBody.removeChild(section);},390);
                            },time);
                        }
                    }).catch((err)=>{
                        const msg=getErrorMessage(err);
                        Misc.message({parent:section,msg:`${msg}:sorry try again later,, something went wrong`,type_:"error",time:1500});
                    });
                }
            }
        };
    };

    saveMessage(parent:HTMLElement,str:string){
        const container=document.createElement("div");
        parent.style.height="30vh";
        container.style.cssText="position:relative;width:100%;background:white;color:black;display:flex;align-items:center; justify-content:space-around;gap:1rem;padding:1rem;border-radius:10px;";
        const img=document.createElement("img");
        img.style.cssText="max-width:125px;border-radius:50%;filter:drop-shadow(0 0 0.5rem black);";
        img.src=this.logo;
        img.alt="www.ablogroom.com";
        container.appendChild(img);
        const text=document.createElement("p");
        text.textContent=str;
        container.appendChild(text);
        parent.appendChild(container);
        container.animate([
            {transform:"scale(0.2)",opacity:0},
            {transform:"scale(1)",opacity:1}

        ],{duration:1000,iterations:1});
        
        
     };

    removeForm({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        const css="display:block;position:absolute;background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:0px;left:0px;";
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("contenteditable","false");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.className="xIconDiv";
        xIconDiv.id=`xIconDiv-headerflag`;
        xIconDiv.style.cssText=`${css}`;
        xIconDiv.style.transform="translate(3px,3px)";
        const cssStyle={background:"inherit",fontSize:"inherit"};
        FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle});
        target.appendChild(xIconDiv);
        xIconDiv.onclick=(e:MouseEvent)=>{
            if(e){
                parent.removeChild(target);
            }
        };
    };

    //INJECTED:Id:mainHeader#header-end
    async signInDisplay({parent,user}:{parent:HTMLElement,user:userType|null}): Promise<{
        user: userType | null;
        parent: HTMLElement;
        container:HTMLElement;
        centerBtnCont:HTMLElement;
    }>{
        const centerBtnCont=document.querySelector("div#footer-centerBtns-container") as HTMLElement;
        Nav.cleanUpByQuery(parent,"div#signInAndUp-signInDisplay-container");
        const container=document.createElement("div");
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        container.id="signInAndUp-signInDisplay-container";
        container.className="user-signature";
        if(user?.id !=="" && user?.email!==""){
            container.style.cssText="display:flex;justify-content:space-around;align-items:center;margin-inline:1rem;box-shadow:1px 1px 12px 1px white;padding-inline:0.5rem;border-radius:10px;color:white;background-color:#0a2351;overflow:hidden;position:relative;right:20px;justify-self:end;margin-right:10px;order:3;cursor:pointer;height:100%;overflow-y:hidden;";
            container.style.marginRight=less900 ? (less400 ? "1px":"4px") :"10px";
            container.style.right=less900 ? (less400 ? "8px":"-10px") :"20px";
            container.style.transform=less900 ? (less400 ? "scale(0.5)":"scale(0.6)") :"scale(0.7)";
            container.style.maxWidth="300px;";
            const img=document.createElement("img");
            img.id="para-img";
            img.style.cssText="width:55px;border-radius:50%;filter:drop-shadow(0 0 0.25 white);";
            if(user?.imgKey){
                const res3key:gets3ImgKey | null= await this._service.getSimpleImg(user.imgKey)
                if(res3key){
                    img.src=res3key.img;
                    img.alt=res3key.Key;
                }
            }else{
                img.src=user?.image ? user?.image : Nav.logo;
                img.alt="www.ablogroom.com";
            }
            const small=document.createElement("small");
            small.id="container-para";
            const name=user?.name ? user?.name : "blogger";
            small.innerHTML=Nav.splitWord({parent:small,str:name,splitCount:10});
            container.appendChild(img);
            container.appendChild(small);
            container.onclick=(e:MouseEvent)=>{
                if(e){
                    this.showDropDownLogout({container});
                }
            };
            parent.appendChild(container);
            Misc.matchMedia({parent:img,maxWidth:420,cssStyle:{width:"35px"}});
            Misc.matchMedia({parent:small,maxWidth:420,cssStyle:{fontSize:"12px"}});
            Misc.growIn({anchor:container,scale:0.2,opacity:0,time:500});
        }
        return new Promise((resolve)=>{
            if(user && user.id!==""){
                resolve({user:user,parent:parent,container,centerBtnCont});
            }else{
                resolve({user:null,parent:parent,container,centerBtnCont});
            }
        })as Promise<{user:userType|null,parent:HTMLElement,container:HTMLElement,centerBtnCont:HTMLElement}> ;
    };


    showDropDownLogout(item:{container:HTMLElement}){
        const {container}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        container.style.zIndex="2";
        const popup=document.createElement("div");
        popup.id="signInDisplay-showDropDownLogout-popup";
        popup.style.cssText="position:absolute;inset:0%;background-color:black;z-index:100;border-radius:0px 0px 12px 12px;box-shadow:1px 1px 12px 1px white;display:flex;justify-content:center;align-items:center;color:white;";
        const logoutCont=document.createElement("div");
        logoutCont.style.cssText="display:flex;justify-content:center;align-items:center;gap:1rem;";
        const xDiv=document.createElement("div");
        xDiv.style.cssText="padding:2px;margin:auto";
        FaCreate({parent:xDiv,name:FaSignOutAlt,cssStyle:{fontSize:"22px",color:"blue",backgroundColor:"white"}});
        const logoutText=document.createElement("small");
        logoutText.id="popup-logoutText";
        logoutText.textContent="logout";
        logoutText.style.cssText="color:white;font-family:'Poppins-Regular';margin:auto;text-transform:uppercase;";
        logoutText.style.fontSize=less900 ? (less400 ? "18px":"20px"):"22px";
        logoutCont.appendChild(logoutText);
        logoutCont.appendChild(xDiv);
        popup.appendChild(logoutCont);
        container.appendChild(popup);
        setTimeout(()=>{
            Misc.growOut({anchor:popup,scale:0,opacity:0,time:1000});
            setTimeout(()=>{container.removeChild(popup);},990);
        },5000);
        container.onclick=(e:MouseEvent)=>{
            if(e){
                this.auth.logout({func:()=>undefined,redirect:true});
            }
        };
    };

};
export default SignInAndUp;
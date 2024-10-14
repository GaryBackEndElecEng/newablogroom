import Misc from "@/components/common/misc";
import Service from "@/components/common/services";
import Header from "@/components/editor/header";
import ModSelector from "@/components/editor/modSelector";
import Nav from "@/components/nav/headerNav";
import RegSignIn from "@/components/nav/regSignin";
import User from "@/components/user/userMain";


class Register {
    regSignin:RegSignIn;
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
        this.regSignin=new RegSignIn(this._modSelector,this._service,this._user);
    }
    main(parent:HTMLElement){
        Header.cleanUpByID(parent,"register-page-main");
        Header.cleanUpByID(parent,"button-signin");
        Header.cleanUpByID(parent,"register-page-main-text");
        parent.style.cssText="margin-inline:auto;padding-inline:10rem;padding-block:1rem;height:110vh;width:100%;display:flex;flex-direction:column;width:100%;align-items:center;justify-content:flex-start;z-index:20;";
        const container=document.createElement("section");
        container.id="register-page-main";
        container.style.cssText="padding-inline:2rem;margin-inline:2rem;margin-block:3rem;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:1.5rem;background-color:black;border-radius:12px;z-index:2;width:100%;min-height:100vh;";
        const innerContainer=document.createElement("div");
        innerContainer.id="register-page-main-sub";
        innerContainer.style.cssText="padding:5rem;border-radius:12px;background-color:#0000ff70;z-index:2;width:100%;height:90vh;display:flex;align-items:center;flex-direction:column;justify-content:flex-start;";
        container.appendChild(innerContainer);
        this.regSignin.register(container,innerContainer);
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

    }
}
export default Register;
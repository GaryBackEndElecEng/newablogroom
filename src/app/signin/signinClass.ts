import Misc from "@/components/common/misc";
import Service from "@/components/common/services";
import Header from "@/components/editor/header";
import ModSelector from "@/components/editor/modSelector";
import RegSignIn from "@/components/nav/regSignin";
import User from "@/components/user/userMain";


class SigninClass{
    regSignin:RegSignIn;
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
        this.regSignin=new RegSignIn(this._modSelector,this._service,this._user);
    }
   async main(parent:HTMLElement){
    parent.style.cssText="min-height:110vh;display:flex;justify-content:center;flex-direction:column;align-items:center;width:100%;"
        Header.cleanUp(parent);
         await this.regSignin.signIn();

        Misc.matchMedia({parent,maxWidth:1100,cssStyle:{paddingInline:"6rem"}});
        Misc.matchMedia({parent,maxWidth:900,cssStyle:{paddingInline:"4rem"}});
        Misc.matchMedia({parent,maxWidth:400,cssStyle:{paddingInline:"1rem",height:"auto",minHeight:"auto"}});
       
        return new Promise(resolve=>{
            resolve(parent)
        }) as Promise<HTMLElement>;

    }
}
export default SigninClass;
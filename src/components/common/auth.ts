import {blogType, userType, jwtPayload, accountType, sessionType, postType} from "@/components/editor/Types";
import ModSelector from "@/components/editor/modSelector";
import { Session } from "next-auth";
import User from "../user/userMain";
import Service from "./services";
import MainHeader from "../nav/mainHeader";
import Footer from "../editor/footer";
import MainFooter from "../footer/mainFooter";
import { userDevelopType, userQuoteType } from '../editor/Types';


class AuthService {
    static headerInjector:HTMLElement|null;
    _jwtPayload:jwtPayload={} as jwtPayload;
    _isAuthenticated: boolean;
    logo:string;
    blog:blogType;
    bgColor:string;
    btnColor:string;
    adminEmail:string;
    usersignin:string;
    _admin:string[];
    isSignedOut:boolean;
    __user:userType;
    userInit:userType={
        id:"",
        email:"",
        name:undefined,
        password:undefined,
        emailVerified:undefined,
        image:undefined,
        imgKey:undefined,
        bio:undefined,
        showinfo:undefined,
        blogs:[] as blogType[],
        posts:[] as postType[],
        devDeployimgs:[] as userDevelopType[],
        quoteImgs:[] as userQuoteType[],
        accounts:[] as accountType[],
        sessions:[] as sessionType[],
        admin:false,
        username:undefined,
    } as userType;
    _status:"authenticated" | "loading" | "unauthenticated";

    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private _mainHeader: MainHeader,private _mainFooter:MainFooter){
        this._isAuthenticated=false;
        this.__user=this.userInit as userType;
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.logo=`gb_logo.png`;
        this._admin=[];
        this.blog={} as blogType;
        this.adminEmail= "" as string;
        this.usersignin="/api/usersignin";
        this.isSignedOut=false;
        this.__user=this._user.user;
    }
    ///-------------------GETTER SETTERS-------------------------//
    get status(){
        return this._status
    }
    set status(status:"authenticated" | "loading" | "unauthenticated"){
        this._status=status;
        this._user.status=status;
        // this._mainFooter.status=status;
    }
   
    ///-------------------GETTER SETTERS-------------------------//

    set user(user:userType){
        this._user.user=user;
        this.__user=user;
        if(!(user && user.id)) return
        this.isSignedOut=false;
        this.storeLocal(user).then(async(res)=>{
            res(); //stores user_id && email to localStorage
        });
    }
    get user(){
        return this.__user;
    }
    set payload(payload:jwtPayload){
        this._jwtPayload=payload;
    }
    get payload(){
        return this._jwtPayload;
    }
    set admin(admin:string[]){
        if(admin && admin.length>0){
            this.__user={...this.__user,admin:true}
        }
        this._admin=admin;
    }
    get admin(){
        return this._admin;
    }


    async getUser(item:{injector:HTMLElement,user:userType|null,count:number}):Promise<{count:number}>{
        const {injector,count,user}=item;
        //MAIN HEADER INJECTOR GOES THROUGH THIS
        AuthService.headerInjector=injector;
        const footerCenterBtns=document.querySelector("div#footer-centerBtns-container") as HTMLElement;
        this.user={} as userType;
        if(user && count===0){
            this.user=user;
            this._isAuthenticated=true;
            this._user.status="authenticated";
            this._mainFooter.status="authenticated";
            this._mainHeader.status="authenticated";
            this.status="authenticated";
            this._modSelector.status="authenticated";
            this._service.isSignedOut=false;
            if(footerCenterBtns){
                this._mainFooter.centerBtnsRow({container:footerCenterBtns,isAuthenticated:this._isAuthenticated});
            };
            this._mainHeader.showRectDropDown({ parent: injector, user: user, count: count });
            return {count:count+1}
            
        }else{
            this.user=this.userInit;
            this._user.status="unauthenticated";
            this._mainFooter.status="unauthenticated";
            this._mainHeader.status="unauthenticated";
            this._modSelector.status="unauthenticated";
            this.status="unauthenticated";
            this._service.isSignedOut=false;
            localStorage.removeItem("user");
            localStorage.removeItem("user_id");
            localStorage.removeItem("userBlogs");
            localStorage.removeItem("email");
            if(footerCenterBtns){
                this._mainFooter.centerBtnsRow({container:footerCenterBtns,isAuthenticated:this._isAuthenticated});
            };
            this._mainHeader.showRectDropDown({ parent: injector, user: null, count: count });
            return {count:count+1};
        }

    }
   

   async navigator(user:userType){
    const publicKey : PublicKeyCredentialCreationOptions={
        challenge:new Uint8Array(26),
        rp:{name:"ablogroom"},
        user:{
            id:new Uint8Array(26),
            name:user.email,
            displayName:"Jamie Doe"
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 },{ type: "public-key", alg: -8 },{ type: "public-key", alg: -257 },],
    }
        const data= await navigator.credentials.create({
            publicKey:publicKey,
        }) as Credential | null;
        return data
    }

    navsetCookies(user:userType){
        return new Promise((resolver,reject)=>{
            resolver(JSON.stringify(user));
            reject(()=>{console.error("refused")})
        }); 
    }
    storeLocal(user:userType){
        return new Promise((resolve)=>{
            resolve(()=>{
                if(typeof window !=="undefined" && user && user.id){
                    localStorage.setItem("user_id",user.id);
                    localStorage.setItem("email",user.email);
                    localStorage.setItem("user",JSON.stringify(user));
                }
            })
        }) as Promise<()=>void>;
    }
   async refreshUser():Promise<userType|undefined>{
        const str=await this.getUserLocal() as string;
        if(str){
            return JSON.parse(str as string) as userType;
        }
    }
    getUserLocal():Promise<string>{
        return new Promise((resolve)=>{
            if(typeof window !=="undefined"){
                resolve(localStorage.getItem("user") as string)
            }
            
        }) as Promise<string>;
    }

}
export default AuthService;
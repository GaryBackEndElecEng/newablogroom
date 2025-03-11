import {blogType, userType, jwtPayload, accountType, sessionType, postType} from "@/components/editor/Types";
import ModSelector from "@/components/editor/modSelector";
import Service from "./services";
import MainHeader from "../nav/mainHeader";
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
    _user:userType;
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

    constructor(private _modSelector:ModSelector,private _service:Service){
        this._isAuthenticated=false;
        this._user=this.userInit as userType;
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.logo=`gb_logo.png`;
        this._admin=[];
        this.adminEmail= "" as string;
        this.usersignin="/api/usersignin";
        this.isSignedOut=false;
        // console.log("AUTH:Constructor")
    }
    ///-------------------GETTER SETTERS-------------------------//
    get status(){
        return this._status
    }
    set status(status:"authenticated" | "loading" | "unauthenticated"){
        this._status=status;
        if(status==="authenticated"){
            this._isAuthenticated=true;
        }else{
            this._isAuthenticated=false;
        };
       
    }
   
    ///-------------------GETTER SETTERS-------------------------//

    set user(user:userType){
        if((user?.id && user.id!=="" && user.email!=="")){
            this._user=user;
            this.isSignedOut=false;
            this.status="authenticated";
            localStorage.setItem("user",JSON.stringify(user));
        }else{
            this.isSignedOut=true;
            this.status="unauthenticated";
            this._user=this.userInit;
        };
        
    }
    get user(){
        return this._user;
    }
    set payload(payload:jwtPayload){
        this._jwtPayload=payload;
    }
    get payload(){
        return this._jwtPayload;
    }
    set admin(admin:string[]){
        if(admin && admin.length>0){
            this._user={...this._user,admin:true}
        }
        this._admin=admin;
    }
    get admin(){
        return this._admin;
    }

    async generateUser(): Promise<{user:userType}>{
        return Promise.resolve({user:this.user?.id ? this.user : null}) as Promise<{user:userType}>;
    };


    async getUser(item:{user:userType|null,count:number}):Promise<{isSignedIn:boolean,user:userType,count:number}>{
        const {count,user}=item;
        //MAIN HEADER INJECTOR GOES THROUGH THIS

        const url=new URL(window.location.href);
        const check=["/editor","/chart"].includes(url.pathname);
        if(!check){
            console.log("INIT BLOG HERE")
            this._modSelector.blogInitializer(user);
            const blog=this._modSelector.blog;
            this.storeLocal(user,blog).then(async(res)=>{
                res(); //stores user_id && email to localStorage
            });
        };
        console.log("AUTH",this._modSelector.blog)
        if(user?.id && user?.id!=="" && user?.email !=="" && count===0){
             //---!!!!!!!initinilizes blog and user && stores it in local!!!!!!!
            this.user=user;
            
            //---!!!!!!!initinilizes blog and user && stores it in local!!!!!!!
            this._isAuthenticated=true;
            this.status="authenticated";
            this._modSelector.status="authenticated";
            this._service.isSignedOut=false;
            
            return Promise.resolve({isSignedIn:this._isAuthenticated,count:count+1,user:this.user}) as Promise<{isSignedIn:boolean,user:userType,count:number}>;
        }else{
            console.log("AUTH","NO USER",url.pathname);
            //THIS INITIALIZE ALL PARAMS TO ALL PAGES( WITHOUT USER)
            this.user=this.userInit;
            this._isAuthenticated=false;
            this._modSelector.status="unauthenticated";
            this.status="unauthenticated";
            this._service.isSignedOut=true;
            localStorage.removeItem("user");
            localStorage.removeItem("user_id");
            localStorage.removeItem("userBlogs");
            localStorage.removeItem("email");
            if(!check){
                localStorage.removeItem("blog");
                localStorage.removeItem("placement");
            };

            return Promise.resolve({isSignedIn:this._isAuthenticated,count:count+1,user:this.user}) as Promise<{isSignedIn:boolean,user:userType,count:number}>;
        };
        

    };

    

    confirmUser({user,count}:{user:userType|null,count:number}): Promise<{user:userType,isAuthenicated:boolean,count:number}>{
        if(user){
            const check=(this._isAuthenticated && this.user.id===user.id && this.user.email===user.email);
            if(check){
                this.user=user;
            };
        }
        return Promise.resolve({user:this.user,isAuthenicated:this._isAuthenticated,count:count+1}) as Promise<{user:userType,isAuthenicated:boolean,count:number}>;
    }

    loadUser(){
        return this.user;
    }

    async logout(item:{func:()=>Promise<void>|void|undefined,redirect:boolean}):Promise<void>{
        const {func,redirect}=item;
        this.user={} as userType;
        
        await this.getUser({user:null,count:0}).then(async(res)=>{
            if(res){
                localStorage.removeItem("user");
                localStorage.removeItem("user_id");
                localStorage.removeItem("userBlogs");
                localStorage.removeItem("email");
                MainHeader.header=document.querySelector("header#navHeader") as HTMLElement;
                this._service.isSignedOut=true;
                this._user=this.userInit
                this.status="unauthenticated";
                MainHeader.removeAllClass({parent:MainHeader.header,class_:"ablogroom"});
                window.scroll(0,0);
                func();//calling function void
                this._service.signout({redirect})
            }
        });

    };
   

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
        return Promise.resolve(JSON.stringify(user)); 
    };

    
    storeLocal(user:userType|null,blog:blogType){
        return Promise.resolve(()=>{
                if(typeof window !=="undefined"){
                    if(user && user.id!=="" && user.email!==""){
                        localStorage.setItem("user_id",user.id);
                        localStorage.setItem("email",user.email);
                        localStorage.setItem("user",JSON.stringify(user));
                    }
                    if(blog){
                        localStorage.setItem("blog",JSON.stringify(blog));
                        const maxCount=ModSelector.maxCount(blog);
                        localStorage.setItem("placement",String(maxCount+1));
                    }
                }
            }) as Promise<()=>void>;
    };

   async refreshUser():Promise<userType|undefined>{
        const str=await this.getUserLocal() as string;
        if(str){
            return JSON.parse(str as string) as userType;
        }
    };
    
    getUserLocal():Promise<string>{
        return new Promise((resolve)=>{
            if(typeof window !=="undefined"){
                resolve(localStorage.getItem("user") as string)
            }
            
        }) as Promise<string>;
    }

}
export default AuthService;
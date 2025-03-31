import {blogType, userType, jwtPayload, accountType, sessionType, postType, stateType, statusType} from "@/components/editor/Types";
import ModSelector from "@/components/editor/modSelector";
import Service from "./services";
import MainHeader from "../nav/mainHeader";
import { userDevelopType, userQuoteType } from '../editor/Types';
import BrowserType from "./browserType";
import { getSession } from "next-auth/react";


class AuthService {
    static headerInjector:HTMLElement|null;
   private _jwtPayload:jwtPayload={} as jwtPayload;
   public _isAuthenticated: boolean;
    logo:string;
    blog:blogType;
    bgColor:string;
    btnColor:string;
   private _isAdmin:boolean;
   private _user:userType;
    private _states:stateType[];
   static readonly userInit:userType={
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
    _status:statusType;

    constructor(private _modSelector:ModSelector,private _service:Service){
        this._isAuthenticated=false;
        this._user=AuthService.userInit as userType;
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.logo=`gb_logo.png`;
        this._isAdmin=false;
        this._states=[]
        // console.log("AUTH:Constructor")
    }
    ///-------------------GETTER SETTERS-------------------------//
    get status(){
        return this._status
    };
    set status(status:statusType){
        this._status=status;
        if(status==="authenticated"){
            this._isAuthenticated=true;
        }else{
            this._isAuthenticated=false;
        };
       
    };
   
    ///-------------------GETTER SETTERS-------------------------//

    set user(user:userType){
        if((user?.id && user.id!=="" && user.email!=="")){
            this._user=user;
            this._isAuthenticated=true;
            this.status="authenticated";
            localStorage.setItem("user",JSON.stringify(user));
        }else{
            this._isAuthenticated=false;
            this.status="unauthenticated";
            this._user=AuthService.userInit;
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
    set isAdmin(isAdmin:boolean){
        this._isAdmin=isAdmin
    };
    get isAdmin(){
        return this._isAdmin;
    };
    set states(states:stateType[]){
        this._states=states
    };
    get states(){
        return this._states
    }

    //-----GETTER SETTERS-----////

    async generateUser(): Promise<{user:userType|null}>{
        return Promise.resolve({user:this.user?.id ? this.user : null}) as Promise<{user:userType|null}>;
    };


    async getUser(item:{user:userType|null,count:number}):Promise<{isSignedIn:boolean,user:userType,count:number,isAdmin:boolean,status:statusType}>{
        const {count,user}=item;
        //MAIN HEADER INJECTOR GOES THROUGH THIS
        const pathname=window.location.pathname;
        const check=["/editor","/chart","/"].includes(pathname);
        const getBlog= await this.getBlogLocal();
        const blog=getBlog();
        this.storeLocal(user,blog);
        const browser=new BrowserType(this.user.id);
        this.states=browser.getHistory()|| [] as stateType[];
        if(user?.id && user?.id!==""){
             //---!!!!!!!initinilizes blog and user && stores it in local!!!!!!!
            this.user=user;
            this.isAdmin=user.admin;
            //---!!!!!!!initinilizes blog and user && stores it in local!!!!!!!
            this._isAuthenticated=true;
            this.status="authenticated";
            this._modSelector.status="authenticated";
            this._service.isSignedOut=false;
            return Promise.resolve({isSignedIn:this._isAuthenticated,count:count+1,user:this.user,isAdmin:this.isAdmin,status:this.status}) as Promise<{isSignedIn:boolean,user:userType,count:number,isAdmin:boolean,status:statusType}>;
        }else{
            
            //THIS INITIALIZE ALL PARAMS TO ALL PAGES( WITHOUT USER)
            this.user=AuthService.userInit;
            this._isAuthenticated=false;
            this._modSelector.status="unauthenticated";
            this.status="unauthenticated";
            this._service.isSignedOut=true;
            this.isAdmin=false;
            localStorage.removeItem("user");
            localStorage.removeItem("user_id");
            localStorage.removeItem("userBlogs");
            localStorage.removeItem("email");
            if(!check){
                localStorage.removeItem("blog");
                localStorage.removeItem("placement");
            };

            return Promise.resolve({isSignedIn:this._isAuthenticated,count:count+1,user:this.user,isAdmin:false}) as Promise<{isSignedIn:boolean,user:userType,count:number,isAdmin:boolean,status:statusType}>;
        };
        

    };

    async getSessionUser(){
        const session=await getSession();
        if(session && session?.user?.email){
            const getuser= await this._service.getUser({email:session.user.email});
            if(getuser){
                this.user=getuser
            }
           
            this._isAuthenticated=true;
            this.status="authenticated";
            this._modSelector.status="authenticated";
            this._service.isSignedOut=false;
        }else {
            this._isAuthenticated=false;
            this.status="unauthenticated";
            this._modSelector.status="unauthenticated";
            this._service.isSignedOut=true;
        }
        return Promise.resolve({isAuthenticated:this._isAuthenticated,user:this.user,states:this.states,status:this.status}) as Promise<{isAuthenticated:boolean,user:userType,states:stateType[],status:statusType}>;
        
    };

   async confirmUser({user,count}:{user:userType|null,count:number}): Promise<{user:userType,isAuthenicated:boolean,count:number,status:statusType}>{
        const getUser= await this.refreshUser();
        if(user && getUser){
            const check=(getUser.id===user?.id && getUser.email===user?.email);
            if(check){
                this.user=getUser;
                this._isAuthenticated=true;
                this.status="authenticated";
                this._modSelector.status="authenticated";
                this._service.isSignedOut=false;
            }
            
        }else{
            this._isAuthenticated=false;
            this.status="unauthenticated";
            this._modSelector.status="unauthenticated";
            this._service.isSignedOut=true;
        }
        return Promise.resolve({user:this.user,isAuthenicated:this._isAuthenticated,count:count+1,states:this.states,status:this.status}) as Promise<{user:userType,isAuthenicated:boolean,count:number,states:stateType[],status:statusType}>;
    };

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
                this._user=AuthService.userInit
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

    
    storeLocal(user:userType|null,blog:blogType|null){
        return Promise.resolve(()=>{
                if(typeof window !=="undefined"){
                    if(user && user.id!=="" && user.email!==""){
                        localStorage.setItem("user_id",user.id);
                        localStorage.setItem("email",user.email);
                        localStorage.setItem("user",JSON.stringify(user));
                    }
                    if(blog){
                        if(user){
                            blog={...blog,user_id:user.id}
                        }
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

    getBlogLocal():Promise<() => blogType | null>{
        return Promise.resolve(()=>{
            const blogStr=localStorage.getItem("blog");
            if(blogStr){
                const blog=JSON.parse(blogStr) as blogType;
                const maxcount=ModSelector.maxCount(blog);
                if(maxcount>0){
                    return blog as blogType
                }else{
                    return null
                }
            }else{
             
                return null;
            };
            
        })
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
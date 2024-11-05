import {blogType, userType, jwtPayload} from "@/components/editor/Types";
import ModSelector from "@/components/editor/modSelector";
import { Session } from "next-auth";
import User from "../user/userMain";
import Service from "./services";
import MainHeader from "../nav/mainHeader";


class AuthService {
    _jwtPayload:jwtPayload={} as jwtPayload
    logo:string;
    blog:blogType;
    bgColor:string;
    btnColor:string;
    adminEmail:string;
    usersignin:string;
    _admin:string[];
    isSignedOut:boolean;
    __user:userType;

    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private _mainHeader: MainHeader,private session:Session |null){
        this.__user={} as userType;
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.logo=`gb_logo.png`;
        this._admin=[];
        this.blog={} as blogType;
        this.adminEmail= "" as string;
        this.usersignin="/api/usersignin";
        this.isSignedOut=false;
        
    }

    set user(user:userType){
        this._user.user=user;
        this.__user=user;
        this.storeLocal(user).then(async(res)=>{
            res(); //stores user_id && email to localStorage
        });
        this.isSignedOut=false;
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
    async getUser(item:{session:Session|null,injector:HTMLElement}):Promise<{user:userType,injector:HTMLElement}| {user:null,injector:HTMLElement}>{
        const {session,injector}=item;
        //MAIN HEADER INJECTOR GOES THROUGH THIS
        const email=session && session.user?.email ? session.user.email:null;
        let user_={} as userType;
        if(!email)return {user:null,injector};
        user_={...user_,email:email}
        const option={
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(user_)
        }
        const res = await fetch(this.usersignin,option)
        if(res){
            const body= await res.json() as userType
            this.user=body;
            this.__user=body
            this._service.isSignedOut=false;
            this.isSignedOut=false;
            this.storeLocal(body).then(async(res)=>{
                res()
            });
            
            return {user:body as userType,injector}
        }else{
            
            return {user:null,injector}
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
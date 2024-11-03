import {blogType, userType, jwtPayload} from "@/components/editor/Types";
import ModSelector from "@/components/editor/modSelector";
import { Session } from "next-auth";
import User from "../user/userMain";
import Service from "./services";


class AuthService {
    _jwtPayload:jwtPayload={} as jwtPayload
    logo:string;
    blog:blogType;
    bgColor:string;
    btnColor:string;
    adminEmail:string;
    userupdate:string;
    _admin:string[];
    isSignedOut:boolean;

    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.logo=`gb_logo.png`;
        this._admin=[];
        this.blog={} as blogType;
        this.adminEmail= "" as string;
        this.userupdate="/api/user_update";
        this.isSignedOut=false;
    }

    set user(user:userType){
        this._user.user=user;
        this.storeLocal(user).then(async(res)=>{
            res(); //stores user_id && email to localStorage
        });
        this.isSignedOut=false;
    }
    get user(){
        return this._user.user;
    }
    set payload(payload:jwtPayload){
        this._jwtPayload=payload;
    }
    get payload(){
        return this._jwtPayload;
    }
    set admin(admin:string[]){
        this._admin=admin;
    }
    get admin(){
        return this._admin;
    }
    async getUser(item:{session:Session}):Promise<boolean|undefined>{
        const {session}=item;
        const email=session && session.user?.email ? session.user.email:null;
        if(!email) return;
        const option={
            headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        const res = await fetch(`${this.userupdate}?email=${email}`,option)
        if(res.ok){
            const body= await res.json() as userType
            this.user=body;
            this._service.isSignedOut=false;
            this.isSignedOut=false;
            return true
        }else{
            return false
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

}
export default AuthService;
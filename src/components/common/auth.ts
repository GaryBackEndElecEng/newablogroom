import {blogType, userType, jwtPayload} from "@/components/editor/Types";
import ModSelector from "@/components/editor/modSelector";


class AuthService {
    _jwtPayload:jwtPayload={} as jwtPayload
    logo:string;
    _user:userType;
    blog:blogType;
    bgColor:string;
    btnColor:string;
    adminEmail:string;
    _admin:string[];

    constructor(private _modSelector:ModSelector){
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.logo=`gb_logo.png`;
        this._admin=[];
    }

    set user(user:userType){
        this._user=user;
        this.storeLocal(user).then(async(res)=>{
            res(); //stores user_id && email to localStorage
        });
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
        this._admin=admin;
    }
    get admin(){
        return this._admin;
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
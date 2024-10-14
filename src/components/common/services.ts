import {flexType,elementType,selectorType,element_selType,codeType,blogType, gets3ImgKey, userType,messageType, imageType, generalInfoType, deletedImgType, img_keyType, adminImageType, credentialType, providerType, pageCountType, delteUserType, sendEmailMsgType, categoryListType, barOptionType, chartType} from "@/components/editor/Types";
import Misc from "../common/misc";
import ModSelector from "@/components/editor/modSelector";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { v4 as uuidv4 } from 'uuid';
import Main from "../editor/main";
import AuthService from "./auth";
// import { genHash } from "@/lib/ultils/bcrypt";
import { getCsrfToken,getProviders } from "next-auth/react";
import {signOut } from "next-auth/react";
import Header from "../editor/header";
import Nav from "../nav/headerNav";
import MainHeader from "../nav/mainHeader";

class Service {
    awsimgUrl:string="/api/awsimg";
    liveonoffUrl:string="/api/liveonoff";
    newBlogUrl:string="/api/blog/createNew"
    images:string="https://newmasterconnect.herokuapp.com/api/category/";
    category:string="https://newmasterconnect.herokuapp.com/api/category/";
    urlUpload="/api/uploadImage";
    urlBlog:string="/api/blog";
    urlsaveBlog:string="/api/savegetblog";
    urlSignin:string="/api/auth/callback/credentials";
    urlProvider:string="/api/auth/providers";
    urlSignOut:string="/api/auth/signout"
    imgLoad:string="/api/imgload";
    urlGetImg="/api/blog/getimg";
    urlMsg="/api/message";
    urlAllmsgs:string="/api/allmsgs"
    urlToken:string="api/token;"
    urlAdminGetMsgs:string="/api/admin/getmessages";
    urlAdminEmail:string="/api/admin/adminemail";
    adminUserUrl:string="/api/admin/user";
    userUrlUpdate:string="/api/user_update";
    getuserinfo_url:string="/api/getuserinfo";
    emailUrl:string="/api/email";
    signupemailUrl:string="/api/signupemail";
    sendEmailUrl:string="/api/sendemail";
    registeruserUrl:string="/api/registeruser";
    user_blogs:string="/api/user_blogs";
    userBlogUrl:string="/api/blog/getuserblog";
    requestUrl:string="/api/admin/request";
    btnColor:string;
    bgColor:string;
    adminimages:string="/api/admin/images";
    adminusers:string="/api/admin/users";
    adminpagecountUrl:string="/api/admin/adminpagecount";
    pageCountUrl:string="/api/pagecount";
    metaUrl:string="/api/meta";
    user:userType;
    checkemail:string="/api/checkemail";
    showCustomHeader:boolean;
    showHeader:boolean;
    element:elementType | element_selType | undefined;
    // getInitBlog:blogType;
    constructor(private _modSelector:ModSelector,private _auth:AuthService){
        this.showCustomHeader=false;
        this.showHeader=false;
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.user=this._modSelector._user;
    }
///GETTERS SETTERS///////////////////
    saveItems(blog:blogType):blogType{
        const show=blog.show;
        const username=blog.username;
        const css=blog.cssText;const class_=blog.class;
        this._modSelector._elements=this.checkElements(blog.elements) as elementType[];
        this._modSelector._selectors=this.checkSelectors(blog.selectors);
        this._modSelector._codes=this.checkCodes(blog.codes);
        this._modSelector._charts=blog.charts;
        this._modSelector._pageCounts=blog.pageCounts;
        const findHeader=blog.selectors && blog.selectors.find(sel=>(sel.header===true)) ? blog.selectors.find(sel=>(sel.header===true)):null;
        const findFooter=blog.selectors && blog.selectors.find(sel=>(sel.footer===true)) ? blog.selectors.find(sel=>(sel.footer===true)) :null;
        this._modSelector._blog={...blog,cssText:css,class:class_,show:show,username:username};
        this._modSelector.blog=this._modSelector._blog;
        if(findHeader){
            this._modSelector._header=findHeader;
        }
        if(findFooter){
            this._modSelector._footer=findFooter;
        }
        localStorage.setItem("blog",JSON.stringify(this._modSelector.blog));
        return blog;
    }
    promsaveItems(blog:blogType):Promise<blogType>{
        return new Promise((resolver)=>{
            // console.log("BLOG",blog)
            resolver( this.saveItems(blog));
        }) as Promise<blogType>
        
    }
    checkElements(eles:elementType[] | element_selType[]){
        if(eles && eles.length>0){
            return eles;
        }else{
            if(eles as elementType[]){
                return [] as elementType[]
            }else{
                return [] as element_selType[]
            }
        }
        
    };
    checkSelectors(selects:selectorType[]){
        if(selects && selects.length>0){
            return selects;
        }else{
            return [] as selectorType[]
        }
    }
    checkCodes(codes:codeType[]){
        if(codes && codes.length>0){
            return codes
        }else{
            return [] as codeType[]
        }
        
    };
    initializeBlog(){
        let blog={} as blogType
        this._modSelector.pageCounts=[] as pageCountType[];
        this._modSelector._elements=[] as elementType[];
        this._modSelector._selectors=[] as selectorType[];
        this._modSelector.selectCodes=[] as codeType[];
        this._modSelector.charts=[] as chartType[];
        blog={id:0,name:undefined,desc:undefined,user_id:"",class:ModSelector.main_class,inner_html:undefined,cssText:ModSelector.main_css,img:undefined,imgKey:undefined,show:false,username:undefined,rating:0,selectors:[] as selectorType[],elements:[] as elementType[],codes:[] as codeType[],pageCounts:[] as pageCountType[],charts:[] as chartType[],date:new Date(),attr:"circle",barOptions:[]};
        this._modSelector._blog=blog;
        this._modSelector.blog=this._modSelector._blog;
    }
    async get_csrfToken(){
        return await getCsrfToken();
    }

///GETTERS SETTERS///////////////////


    async fetchBlogs():Promise<blogType[]|void>{
        return fetch(this.urlsaveBlog).then(async(res)=>{
            if(res.ok){
                const body= await res.json() as blogType[];
                this._modSelector.blogs=body;
                return body
            }
        }).catch(err=>{const msg=getErrorMessage(err);console.error(msg)});
       
    }
    //YOU NEED A BLOG WITH IMAGE IT NEEDS A KEY SET IN FORMDATA
    async uploadSaveImage(parent:HTMLElement,formData:FormData,image:HTMLImageElement,blog:blogType,flex:flexType|null):Promise<{
        blog: blogType;
        data: {
            Key: string | null;
            img: string | null;
        };
    } | null | undefined>{
        // console.log(formData,formData.get("file"),formData.get("Key"));
        const option={
            method: "PUT",
            body: formData
            
        }
        const file=formData.get("file");
        const Key=formData.get("Key");
        if(file && Key){
            return fetch(this.urlUpload,option).then(async(res)=>{
                
                if(res.ok){
                    const formdata_key=formData.get("Key") as string;
                    const file=formData.get("file") as File;
                    const filename=file.name as string;
                    image.alt=filename;
                    //GETTING IMAGE URL////////
                    const data =await this.getImg(parent,image,formdata_key) as {Key:string|null,img:string|null};
                    //GETTING IMAGE URL-STORED IMGURL IN IMAGE.SRC////////
                    if(data){
                        if(flex ){
                            const {selectorId,rowId,colId}=flex;
                        this._modSelector._selectors= blog.selectors.map(sel=>{
                                if(sel.eleId===selectorId){
                                    sel.rows.map(row=>{
                                        if(row.eleId===rowId){
                                            row.cols.map(col=>{
                                                if(col.eleId===colId){
                                                    col.elements.map(ele=>{
                                                        if(ele.eleId===image.id){
                                                            ele.img=data.img ? data.img : undefined;
                                                            ele.inner_html=image.alt;
                                                            ele.imgKey=data.Key ? data.Key : undefined;
                                                        }
                                                        return ele;
                                                    });
                                                }
                                                return col;
                                            });
                                        }
                                        return row;
                                    });
                                }
                            return sel;
                        });
                        blog={...blog,selectors:this._modSelector._selectors};
                        this._modSelector.blog=blog;
                        
                        }else{
                            let eles=blog && blog.elements;
                            if(eles && eles.length>=0){
                                eles=eles.map(ele=>{
                                    if(ele.eleId===image.id){
                                        ele.img=image.src;
                                        ele.inner_html=image.alt;
                                        ele.imgKey=formdata_key;
                                    }
                                    return ele;
                                });
                                blog={...blog,elements:eles};
                            }
                            if(blog.eleId===image.id){
                                blog={...blog,img:image.src,imgKey:formdata_key}
                            }
                            this._modSelector.blog=blog;
                        }
                        localStorage.setItem("blog",JSON.stringify(blog));
                        return{blog,data};
                        }else{
                           
                            Misc.message({parent,msg:"image was not uploaded",type_:"error",time:400});
                        }
                        return null
                }
            });
        }else{
            
            Misc.message({parent,msg:"missing a Key and or File",type_:"error",time:600})
        }
    };
    
    //RETURNS PROMISE<{KEY,IMG}>
    async simpleImgUpload(parent:HTMLElement,formData:FormData):Promise<gets3ImgKey|null>{
        const file=formData.get("file") as string;
        const Key=formData.get("Key") as string;
        if(file && Key){
            const option={
                method: "PUT",
                body: formData
                
            }
            return fetch(this.urlUpload,option).then(async(res)=>{
                
                if(res.ok){
                    const formdata_key=formData.get("Key") as string;
                    //store key//
                    const store:deletedImgType={id:undefined,Key:formdata_key,del:false}
                    await this.storeKey(store)
                    //store key//
                    //GETTING IMAGE URL////////
                    const data:gets3ImgKey|null =await this.getSimpleImg(formdata_key);
                    if(data && data.Key){
                        // const store_key:deletedImgType={Key:data.Key,del:false}
                        return data as gets3ImgKey|null;
                    }
                    //GETTING IMAGE URL-STORED IMGURL IN IMAGE.SRC////////
                    
                }
                return null;
            });
        }else{
            
            Misc.message({parent,msg:"missing the form or Key",type_:"error",time:400})
        }
        
        return null;
    }
    //GETS IMAGE AND POPULATES IMAGE URL FROM AWS TO IMAGE.SRC=>RETURNS(IMGURL,KEY})
    async getImg(parent:HTMLElement,image:HTMLImageElement|null,Key:string):Promise<{img:string|null,Key:string|null}>{
        return fetch(`${this.urlGetImg}/?Key=${Key}`).then(async(res)=>{
            if(res.ok){
                const getimg:gets3ImgKey= await res.json();
                const {Key,img}=getimg;
                if(image) image.src=img;
                Misc.message({parent,msg:"image saved",type_:"success",time:400});
                return {img:img,Key:Key};
            }else{
               
                Misc.message({parent,msg:"failed to get image",type_:"success",time:500});
                return {img:null,Key:null} ;
            }
            
        });
    }
     injectBgAwsImage(item:{target:HTMLElement,imgKey:string,cssStyle:{[key:string]:string}}): Promise<HTMLElement |undefined> | undefined{
        //THIS GET THE AWSURL AND THEN INJECTS IT INTO THE BACKGROUND IMAGE WITH CSSSTYLES ADDED
        const {target,imgKey,cssStyle}=item;
        if(imgKey){
           return this.getSimpleImg(imgKey).then(async(res:gets3ImgKey|null)=>{
                if(res){
                    let index=0;
                    for ( const key of Object.keys(target.style)){
                        index++;
                        if(key==="backgroundImage"){
                            target.style.backgroundImage="url(" + res.img + ")";
                            Misc.blurIn({anchor:target,blur:"20px",time:500});
                        }else{

                            for (const [key2,value2] of Object.entries(cssStyle)){
                                if(key===key2){
                                    target.style[key]=value2
                                }
                            }
                        }
                    }
                    return target
                   
                }
            });
        }
    }
    

    async saveBlog(blog:blogType):Promise<blogType|void>{
            const option={
                headers:{
                    "Content-Type":"application/json",
                },
                method:"POST",
                body:JSON.stringify(blog)
            };
            return fetch(this.urlsaveBlog,option).then(async(res)=>{
                    let blog_:blogType;
                    if(res.ok){
                    blog_= await res.json();
                    this.promsaveItems(blog_).then(((_blog_:blogType)=>{
                        localStorage.setItem("blog",JSON.stringify(_blog_));
                    }));
                    return blog as blogType;
                    }
                
                    
                // closing signin
                
            }).catch((err)=>{console.log(err.message)});
        
    }
    async liveonoff(blog:blogType){
        const option={
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(blog)
        }
        return fetch(this.liveonoffUrl,option).then(async(res)=>{
            if(res){
                const blog= await res.json() as blogType;
                return blog;
            }
        });
    }
    //PASSES USER_ID WITH EMAIL=> STORED IN _USER
    async signIn(parent:HTMLElement): Promise<void>{
        let useParent:HTMLElement;
        const pathname=window.location.pathname;
        if(pathname==="/editor"){
            Main.container=document.querySelector("section#main") as HTMLElement;
            useParent=Main.container;
        }else{
            useParent=parent;
        }
        const csrfToken= await this.get_csrfToken();
        const providers= await getProviders() as unknown as providerType[];
        Misc.signiMain(useParent,providers,csrfToken);
        
    }
    async signout(){
        Nav.navHeader=document.querySelector("header#navHeader") as HTMLElement;
        const url=new URL(window.location.href);
        this.initializeBlog();
        localStorage.removeItem("blog");
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        localStorage.removeItem("placement");
        localStorage.removeItem("userBlogs");
        localStorage.removeItem("btnLinkChecks");
        localStorage.removeItem("email");
        localStorage.removeItem("count");
        Header.cleanUpByID(Nav.navHeader,"user-signature");
        this._auth.user={} as userType;
        const loc=url.pathname;
        if(loc==="/admin"){
            await signOut()
        }else{
            if(loc==="/editor"){
                if(Main.container){
                    Header.cleanUp(Main._mainFooter as HTMLElement);
                    Header.cleanUp(Main.textarea as HTMLElement);
                    Header.cleanUp(Main._mainHeader as HTMLElement);
                }
            }
            await signOut({redirect:false});
        }
        const reParent= MainHeader.header ? MainHeader.header as HTMLElement : document.querySelector("header#navHeader") as HTMLElement;    
        Misc.msgSourceImage({parent:reParent,msg:"thanks for comming!!",width:175,quality:75,time:3500,src:"gb_logo.png",cssStyle:{borderRadius:"20px",backgroundColor:"black",color:"white",boxShadow:"1px 1px 12px 1px rgb(8, 4, 249);",inset:"-760% 0% -1600% 0%",zIndex:"4000"}});
        return "logged out";
    }

    //THIS GETS IMAGE FROM AWS USING ONLY A KEY
    async getSimpleImg(Key:string):Promise<gets3ImgKey|null>{
        return fetch(`${this.urlGetImg}/?Key=${Key}`).then(async(res)=>{
            if(res.ok){
                const getimg:gets3ImgKey= await res.json();
                const {Key}=getimg;
                await this.adminImagecount(Key);//count
                return getimg;
            }else{
                return null ;
            }
            
        });
    }


   async blogSaveProcess(parent:HTMLElement,blog:blogType,user:userType|null): Promise<{user: () => Promise<userType | void>,blog: () => Promise<blogType | void>}>{
        return  {
                user:async():Promise<userType|void>=>{
                    if(!blog.user_id && user){
                        const pass=user.password ? user.password :undefined
                            const credent:credentialType={id:user.id,email:user.email,password:pass,admin:false};
                            if(credent){
                                user={...user,id:credent.id as string,email:credent.email}
                                blog={...blog,user_id:credent.id}
                                const newBlog= await this.saveBlog(blog);
                                if(newBlog){
                                    blog={...blog,id:newBlog.id,user_id:newBlog.user_id};
                                    this._modSelector.blog=blog;
                                    Misc.message({parent,msg:"saved",type_:"success",time:400})
                                }
                                return user
                            }
                    }

                },
                blog:async():Promise<blogType|void>=>{
                    if(blog.user_id){
                        const savedBlog= await this.saveBlog(blog);
                        if(savedBlog){
                            blog={...blog,id:savedBlog.id};
                            this._modSelector.blog=blog;
                            Misc.message({parent,msg:"saved",type_:"success",time:400})
                            return blog as blogType;
                        }
                    }
                }
            } 
        
   }
   async peronalInfo(){
    const option={
        headers:{
            "Content-Type":"application/json"
        },
        method:"GET"
    }
    return fetch(this.category,option).then(async(res)=>{
        if(res){
            const body= await res.json() as categoryListType[];
            const general:generalInfoType=(body).filter((obj)=>(obj.name==="GeneralInfo"))[0].categoryGeneralInfo[0];
            return general
        }
    }) as Promise<generalInfoType | undefined>;
   }
   
   //PARENT _user.REFRESHIMAGES
   

    getFlexElement(target:HTMLElement,flex:flexType|null){
       this.promsaveItems(this._modSelector.blog).then((blog:blogType)=>{
        const prom= new Promise((resolver,reject)=>{
            resolver(this.flexElement(target,flex,blog))
            reject("could not get element")
        });
        return prom as Promise<elementType |element_selType>;
    
       });
       
    }
    flexElement(target:HTMLElement,flex:flexType|null,blog:blogType){
        let ele_={} as elementType|element_selType|undefined;
        if(flex && target && blog){
            ele_=ele_ as element_selType;
            const children=[...target.children as any] as HTMLElement[];
            const {selectorId,rowId,colId,elementId}=flex;
            const checkEle=children.map(ele=>(ele.id)).includes(elementId as string)
            const checkEle1=target.id===elementId ? true : false;
            if(checkEle || checkEle1){
                const select=blog.selectors.find(sel=>(sel.eleId===selectorId));
                if(select){
                    // console.log("select",select)
                    const row=select.rows.find(row=>(row.eleId===rowId))
                    if(row){
                        // console.log("row",row)
                        const col=row.cols.find(col=>(col.eleId===colId));
                        if(col){
                            // console.log("col",col)
                            ele_=col.elements.find(ele=>(ele.eleId===elementId));
                        }
                    }

                }
            }
        }else if(target && blog){
            ele_=ele_ as elementType;
            ele_=blog.elements.find(ele=>(ele.eleId===target.id));
            
        }
        return ele_;
    }
    sendMessage(parent:HTMLElement,msg:string,type_:"warning"|"success"|"error",time:number){
        Misc.message({parent,msg,type_,time});
    }
    generateImgKey(formdata:FormData,blog:blogType):{Key:string}|undefined{
        //THIS GENERATES AN IMAGE KEY=> NEEDS FORMDATA && BLOG.NAME && user_id
        const getKey=formdata.get("Key");
        const file=formdata.get("file") as File;
        if(!file)return;
        if(!getKey){
            const rand=uuidv4().split("-")[0];
            const name=blog.name ? blog.name.split(" ").join("").trim() :"noBlog";
            const user_id=blog.user_id ? blog.user_id : "ananomous"
            const Key=`${user_id}-${name}/${rand}-${file.name}`;
            const Key_=Key.trim();
            formdata.set("Key",Key_);
            return {Key:Key_}
        }else{
            return {Key:getKey as string}

        }
    }
    async storeKey(store:deletedImgType):Promise<void | deletedImgType>{
        //EXECUTES ONLY IF DEL=FALSE && KEY EXIST.IT STORES KEY IN DeletedImg table
        const {Key,del}=store;
        if(!del && Key){
            const option={
                headers:{
                    "Content-Type":"application/json"
                },
                method:"POST",
                body:JSON.stringify(store)
            };//api/awsimg
            return fetch(this.awsimgUrl,option).then(async(res)=>{
                if(res){
                    const storedKey= await res.json() as deletedImgType;
                    return storedKey;
                }
            }).catch((err)=>{const msg=getErrorMessage(err); console.error(msg)});
        }
    }
    async markDelKey(item:deletedImgType):Promise<void | deletedImgType>{
        // DEL=TRUE  AND KEY EXIST FOR DELETE: it does not delete item from the db (DeletedImg table) only changes its del state. it deletes teh image fro aws
        const {del,Key}=item;
        if(del && Key){
            const option={
                headers:{
                    "Content-Type":"application/json"
                },
                method:"PUT",
                body:JSON.stringify(item)
            };
            return fetch(this.awsimgUrl,option).then(async(res)=>{
                if(res){
                    const storedKey= await res.json() as deletedImgType;
                    return storedKey;
                }
            }).catch((err)=>{const msg=getErrorMessage(err); console.error(msg)});
        }
    }
    async getimgsAndKeys(item:{user_id:string,email:string}): Promise<void | img_keyType[]>{
        // THIS GETS ALL IMAGES FROM ALL REGISTERED BLOGS
        const {user_id,email}=item;
        if(user_id && email){
            const option={
                headers:{
                    "Content-Type":"application/json"
                },
                method:"GET"
            };
            return fetch(`${this.awsimgUrl}?user_id=${user_id}&email=${email}`,option).then(async(res)=>{
                if(res){
                    const imsKeys= await res.json() as img_keyType[];
                    return imsKeys;
                }
            }).catch((err)=>{const msg=getErrorMessage(err); console.error(msg)});
        }
    }

    async hashGenerator(pswd:string|null){
        //RETURN hashPswd WHEN READY!!
        if(pswd){
        //    const hashPswd= await genHash(pswd)
            return pswd;
    
        }else{
            //create message did not get password
            return null;
        }
       }
    async sendMsgToServer(parent:HTMLElement,msg:messageType){
    const option={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(msg)
    }
    return fetch(this.urlMsg,option).then(async(res)=>{
        if(res.ok){
            const message:messageType= await res.json();

            Misc.message({parent:parent,msg:`thanks ${message.name}`,type_:"success",time:500});
            return message
        }
    }).catch((err)=>{
        const msg=getErrorMessage(err);
        console.error(msg)
        Misc.message({parent:parent,msg:msg,type_:"error",time:600});
    }) as Promise<messageType>;
    }

    sendClientMessage(msg:messageType){
        const option={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(msg)
        }
        return fetch(this.urlMsg,option).then(async(res)=>{
            if(res.ok){
                const message:messageType= await res.json();
                return message
            }
        }).catch((err)=>{
            const msg=getErrorMessage(err);
            console.error(msg)
        }) as Promise<messageType>;
    }
    async getAdminMessages(user:userType){
            const option={
                headers:{"Content-Type":"application/json"},
                method:"POST",
                body:JSON.stringify(user)
            }
            return fetch(this.urlAdminGetMsgs,option).then(async(res:Response)=>{
                if(res){
                    return await res.json() as messageType[];
                }
            });
    }
    async adminDelMsg(msg_id:number): Promise<{
        id: string|null;
    } | undefined>{
            const option={
                headers:{"Content-Type":"application/json"},
                method:"DELETE",
            }
            return fetch(`${this.urlAdminGetMsgs}?msg_id=${msg_id}`,option).then(async(res:Response)=>{
                if(res){
                    return await res.json() as {id:string|null};
                }
            });
    }
    async getBlogMessages(blog_id:number){
            const option={
                headers:{"Content-Type":"application/json"},
                method:"GET",
            }
            return fetch(`${this.urlMsg}?blog_id=${blog_id}`,option).then(async(res:Response)=>{
                if(res){
                    return await res.json() as messageType[];
                }
            });
    }
    async getUserMessages(user_id:string){
            const option={
                headers:{"Content-Type":"application/json"},
                method:"GET",
            }
            return fetch(`${this.urlMsg}?user_id=${user_id}`,option).then(async(res:Response)=>{
                if(res){
                    return await res.json() as messageType[];
                }
            });
    }
    async deleteMessage(msg_id:number){
            const option={
                headers:{"Content-Type":"application/json"},
                method:"DELETE",
            }
            return fetch(`${this.urlMsg}?msg_id=${msg_id}`,option).then(async(res:Response)=>{
                if(res){
                    return await res.json() as {id:string};
                }
            });
    }
    async getAllmsgs(item:{rating:number|null,secret:boolean|null}):Promise<messageType[] | undefined>{
        const {rating,secret}=item;
        //ONLY RECIEVES NON SECRET MESSAGES WITH BLOG_ID
        const option={
            Headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        return fetch(`${this.urlAllmsgs}?rating=${rating}&secret=${secret}`,option).then(async(res)=>{
            if(res){
                const allmsgs=await res.json() as messageType[];
                return allmsgs;
            }
        });
    }

    async userWithBlogs(user_id:string){
        const option={
            headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        return fetch(`${this.user_blogs}?user_id=${user_id}`,option).then(async(res)=>{
            if(res){
                const user= await res.json() as userType; // !! with blogs
                localStorage.setItem("userBlogs",JSON.stringify(user.blogs));
                return user;
            }
        });
    }

    async getBlog(blog_id:number){
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"GET"
        }
        return fetch(`${this.urlBlog}/${blog_id}`,option).then(async(res)=>{
            if(res){
                return await res.json() as blogType;
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.log(msg);return msg});
    }
    async getUserBlog(item:{user_id:string|undefined,blog_id:number}){
        const {user_id,blog_id}=item;
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"GET"
        }
        if(user_id && blog_id){

            return fetch(`${this.userBlogUrl}?blog_id=${blog_id}&user_id=${user_id}`,option).then(async(res)=>{
                if(res){
                    return await res.json() as blogType;
                }
            }).catch((err)=>{const msg=getErrorMessage(err);console.log(msg);return msg});
        }
    }
    async newBlog(blog:blogType){
        blog={...blog,id:0};
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(blog)
        }
        return fetch(this.newBlogUrl,option).then(async(res)=>{
            if(res){
                return await res.json() as blogType;
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg);return msg});
    }
   async deleteBlog(blog:blogType):Promise<number|void |undefined>{
        const option={
            headers:{"Content-Type":"application/json"},
            method:"DELETE"
        }
        return fetch(`${this.urlBlog}/${blog.id}`,option).then(async(res)=>{
            if(res){
                return blog.id;
            }
        }).catch((err)=>{
            const msg=getErrorMessage(err);
            console.error(msg);
        });
    }
    async getImages(){
        const option={
            headers:{
            "Content-Type":"application/json",
            },
            method:"GET"
        }
        return fetch(this.images,option).then(async(res)=>{
            if(res){
                const body:any= await res.json() as any;
                const imageCat=body.filter(obj=>(obj.name==="extraImages"))[0]?.imageCategory as imageType[];
                const imageCat2=body.filter(obj=>(obj.name==="FlowerShop"))[0]?.imageCategory as imageType[];
                return imageCat.concat(imageCat2);
            }
        });
        //FlowerShop
    }

    async registerUser(user:userType):Promise<userType|void>{
        if(!user) return;
        const option={
            headers:{
            "Content-Type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(user)
        }
       //api/user
        return fetch(this.registeruserUrl,option).then(async(res)=>{
            if(res){
                const user= await res.json() as userType;
                return user;
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
    async newUserEMailTo(user_id:string):Promise<string|undefined>{
        const option={
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify({user_id:user_id})
        }
        return fetch(this.signupemailUrl,option).then(async(res)=>{
            if(res){
                return "sent"
            }
        });
    }
    async updateUser(user:userType):Promise<userType|undefined>{
        if(!(user && user.id && user.email)) return;
        const option={
            headers:{
            "Content-Type":"application/json",
            },
            method:"PUT",
            body:JSON.stringify(user)
        }
       //api/user
        return fetch(this.registeruserUrl,option).then(async(res)=>{
            if(res){
                const user:any= await res.json() as userType;
                return user;
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
    async getSimpleUser(user_id:string):Promise<userType|void>{
        if(!user_id) return;
        const option={
            headers:{
            "Content-Type":"application/json",
            },
            method:"GET",
        }
       //api/user : need only id
        return fetch(`${this.registeruserUrl}?user_id=${user_id}`,option).then(async(res)=>{
            if(res){
                const user= await res.json() as userType;
                return user;
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
    async deleteUser(user:userType):Promise<{id:string}|void>{
        if(!user) return;
        const option={
            headers:{
            "Content-Type":"application/json",
            },
            method:"DELETE",
            body:JSON.stringify(user)
        }
       //api/user : need id && email
        return fetch(this.adminUserUrl,option).then(async(res)=>{
            if(res){
                const ID= await res.json() as {id:string};
                return ID;
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
    async getUserInfo(user_id:string|undefined):Promise<userType|void>{
        if(!user_id) return;
        const option={
            headers:{
            "Content-Type":"application/json",
            },
            method:"GET"
        }
        //this.getuserinfo_url
        ///api/getuserinfo
        return fetch(`/api/getuserinfo?user_id=${user_id}`,option).then(async(res)=>{
            if(res){
                const user= await res.json() as userType;
                return user;
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
    async authorizeRequest(email:string):Promise<{user:userType} | undefined>{
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"GET"
        }
        return fetch(`${this.requestUrl}?email=${email}`,option).then(async(res)=>{
            if(res){
                const user= await res.json() as {user:userType};
                return user
            }
        });
    }
    async adminImages(user:userType):Promise<adminImageType[] | undefined>{
        const option={
            headers:{
                "Content-Type":"application/json"

            },
            method:"POST",
            body:JSON.stringify(user)
        }
        return fetch(this.adminimages,option).then(async(res)=>{
            if(res){
                return await res.json() as adminImageType[]
            }
        });
    }
    async adminImagecount(imgKey:string):Promise<adminImageType | undefined>{
        //adds 1 to the image count
        const option={
            headers:{
                "Content-Type":"application/json"

            },
            method:"GET",
        }
        return fetch(`${this.adminimages}?imgKey=${imgKey}&count=count`,option).then(async(res)=>{
            if(res){
                return await res.json() as adminImageType
            }
        });
    }
    async adminImageDel(img_id:number):Promise<adminImageType | undefined>{
        const option={
            headers:{
                "Content-Type":"application/json"

            },
            method:"DELETE",
        }
        return fetch(`${this.adminimages}?id=${img_id}`,option).then(async(res)=>{
            if(res){
                return await res.json() as adminImageType
            }
        });
    }
    async markHeaderImgKey(blog:blogType):Promise<(adminImageType | undefined)[] | undefined>{
        const header=blog.selectors.find(sel=>(sel.header));
        if(header){
           const retRows=await Promise.all( header.rows.map(async(row)=>{
                if(row){
                    if(row.imgKey){
                        return await this.adminImagemark(row.imgKey).then(async(res)=>{
                            if(res){
                              return res
                            }
                        });
                    };
                    row.cols.map(async(col)=>{
                        if(col){
                            if(col.imgKey){
                                return await this.adminImagemark(col.imgKey).then(async(res)=>{
                                    if(res){
                                      return res
                                    }
                                });
                            }
                            col.elements.map(async(ele)=>{
                                if(ele){
                                    if(ele.imgKey){
                                        return await this.adminImagemark(ele.imgKey).then(async(res)=>{
                                            if(res){
                                                return res
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            }));
            
        return retRows
        }
    }
    async adminImagemark(imgKey:string):Promise<adminImageType | undefined>{
        const option={
            headers:{
                "Content-Type":"application/json"

            },
            method:"PUT",
        }
        return fetch(`${this.adminimages}?imgKey=${imgKey}`,option).then(async(res)=>{
            if(res){
                return await res.json() as adminImageType
            }
        });
    }
    async welcomeEmail(user_id:string):Promise<{msg:string}|undefined>{
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"GET"
        }
        return fetch(`${this.signupemailUrl}?user_id=${user_id}`,option).then(async(res)=>{
            if(res){
                return await res.json() as {msg:string}
            }
        });
    }
    async respondEmail(item:sendEmailMsgType){
        //USER CLIENTS RESPONSE TO VIEWERS COMMENTS( GET SENT TO VIEWER)
        // const {user_id,messageId,msg,viewerEmail,viewerName}=item;
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(item)
        }
        return fetch(this.sendEmailUrl,option).then(async(res)=>{
            if(res){
                return await res.json() as {msg:string};
            };

        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
    async adminUsers(email:string,user_id:string):Promise<{users: userType[]} | undefined>{
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"GET",
        }
        return fetch(`${this.adminusers}?email=${email}&id=${user_id}`,option).then(async(res)=>{
            if(res){
                const users= await res.json() as {users:userType[]};
                return users;
            }
        });
    }
    async adminDelUser(item:{adminemail:string,adminId:string,delete_id:string}):Promise<{id:string} | undefined>{
        const {adminemail,adminId,delete_id}=item as delteUserType;
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"DELETE",
        }
        return fetch(`${this.adminusers}?adminemail=${adminemail}&adminId=${adminId}&delete_id=${delete_id}`,option).then(async(res)=>{
            if(res){
                const del_user= await res.json() as {id:string};
                return del_user;
            }
        });
    }
    
    async adminSendEmail(item:{msg:messageType,user_id:string,reply:string}):Promise<{msg:string,success:boolean} | undefined>{
        // const {msg,user_id,reply}=item as adminReplyMsgType;
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(item)
        }
        return fetch(this.urlAdminEmail,option).then(async(res)=>{
            if(res){
                const delivered= await res.json() as {msg:string,success:boolean};
                return delivered;
            }
        });
    }
    async getToken(): Promise<void | {token: string} |null>{
        const option={
            Headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        return fetch(this.urlToken,option).then(async(res)=>{
            if(res){
                const token= await res.json() as {token:string};
                return token;
            }
            return null
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
    async getAdminPageCounts(user_id:string): Promise<void |  pageCountType[] | null>{
        const option={
            Headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        return fetch(`${this.adminpagecountUrl}?user_id=${user_id}`,option).then(async(res)=>{
            if(res){
                const pageCounts= await res.json() as pageCountType[];
                return pageCounts;
            }
            return null
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
    async getPageCount(page:string,id:number|undefined): Promise<void |  pageCountType | null>{
        const option={
            Headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        return fetch(`${this.pageCountUrl}?name=${page}&blog_id=${id}`,option).then(async(res)=>{
            if(res){
                const pageCount= await res.json() as pageCountType;
                return pageCount;
            }
            return null
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
    async delPageCount(id:number): Promise<void |  {id:string} | null>{
        const option={
            Headers:{"Content-Type":"application/json"},
            method:"DELETE"
        }
        return fetch(`${this.pageCountUrl}?id=${id}`,option).then(async(res)=>{
            if(res){
                const ID= await res.json() as {id:string};
                return ID;
            }
            return null
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
    async check_email(user:userType):Promise<userType | null|undefined>{
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(user)
        }
        return fetch(this.checkemail,option).then(async(res)=>{
            if(res){
                const user= await res.json() as userType|null|undefined;
                return user;
            }
        })
    }
    async updateBlogMeta(blogmeta:blogType){
        //UPDATES ONLY THE BLOG AS PUT
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"PUT",
            body:JSON.stringify(blogmeta)
        }
        return fetch(this.metaUrl,option).then(async(res)=>{
            if(res){
                const blogOnly=await res.json() as blogType;
                return blogOnly
            }
        });
    }
   

       
    
}
export default Service;
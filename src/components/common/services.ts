import {flexType,elementType,selectorType,element_selType,codeType,blogType, gets3ImgKey, userType,messageType, imageType, generalInfoType, deletedImgType, img_keyType, adminImageType, credentialType, providerType, pageCountType, delteUserType, sendEmailMsgType, categoryListType, barOptionType, chartType, postType, infoType2, bucketType, quoteType, returnQuoteFinalType, quoteimgType, signupQuoteType, rowType, sendPostRequestType} from "@/components/editor/Types";
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
import { onChangeVerifyType } from '../editor/Types';

class Service {
    usersignin="/api/usersignin";
    awsimgUrl:string="/api/awsimg";
    postlike:string="/api/postlike";
    liveonoffUrl:string="/api/liveonoff";
    newBlogUrl:string="/api/blog/createNew";
    urlUpload:string="/api/uploadImage";
    urlBlog:string="/api/blog";
    urlsaveBlog:string="/api/savegetblog";
    urlSignin:string="/api/auth/callback/credentials";
    urlProvider:string="/api/auth/providers";
    urlSignOut:string="/api/auth/signout"
    imgLoad:string="/api/imgload";
    urlGetImg:string="/api/blog/getimg";
    urlMsg:string="/api/message";
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
    adminUpdateinfo:string="/api/admin/updateinfo";
    pageCountUrl:string="/api/pagecount";
    metaUrl:string="/api/meta";
    postsUrl:string="/api/posts";
    userpostUrl:string="/api/userpost";
    user:userType;
    uploadfreeimageUrl:string="/api/uploadfreeimage";
    freeurl:string="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
    checkemail:string="/api/checkemail";
    quoteUrl:string="/api/quote";
    quoteimgUrl:string="/api/quoteimg";
    signupUrl:string="/api/signup";
    putimagefileUrl:string="/api/imagefile";
    showCustomHeader:boolean;
    showHeader:boolean;
    bucket:bucketType; //"masterultils-postimages" | "newablogroom-free-bucket";
    element:elementType | element_selType | undefined;
    isSignedOut:boolean;
    deletemarkImg:string="/api/admin/deletemarkimg";
    requestreset:string="/api/admin/requestreset";
    postRequest:string="/api/postrequest";
    // getInitBlog:blogType;
    constructor(private _modSelector:ModSelector){
        this.bucket="masterultils-postimages";
        this.usersignin="/api/usersignin";
        this.awsimgUrl="/api/awsimg";
        this.deletemarkImg="/api/admin/deletemarkimg";
        this.liveonoffUrl="/api/liveonoff";
        this.newBlogUrl="/api/blog/createnew";
        this.urlUpload="/api/uploadImage";
        this.urlBlog="/api/blog";
        this.urlsaveBlog="/api/savegetblog";
        this.urlSignin="/api/auth/callback/credentials";
        this.urlProvider="/api/auth/providers";
        this.urlSignOut="/api/auth/signout"
        this.imgLoad="/api/imgload";
        this.urlGetImg="/api/blog/getimg";
        this.urlMsg="/api/message";
        this.urlAllmsgs="/api/allmsgs"
        this.urlToken="api/token;";
        this.uploadfreeimageUrl="/api/uploadfreeimage";
        this.freeurl="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
        this.urlAdminGetMsgs="/api/admin/getmessages";
        this.urlAdminEmail="/api/admin/adminemail";
        this.adminUserUrl="/api/admin/user";
        this.adminUpdateinfo="/api/admin/updateinfo";
        this.userUrlUpdate="/api/user_update";
        this.getuserinfo_url="/api/getuserinfo";
        this.emailUrl="/api/email";
        this.signupemailUrl="/api/signupemail";
        this.sendEmailUrl="/api/sendemail";
        this.registeruserUrl="/api/registeruser";
        this.user_blogs="/api/user_blogs";
        this.userBlogUrl="/api/blog/getuserblog";
        this.requestUrl="/api/admin/request";
        this.btnColor=this._modSelector.btnColor;
        this.adminimages="/api/admin/images";
        this.adminusers="/api/admin/users";
        this.adminpagecountUrl="/api/admin/adminpagecount";
        this.pageCountUrl="/api/pagecount";
        this.metaUrl="/api/meta";
        this.postsUrl="/api/posts";
        this.userpostUrl="/api/userpost";
        this.checkemail="/api/checkemail";
        this.quoteUrl="/api/quote";
        this.quoteimgUrl="/api/quoteimg";
        this.signupUrl="/api/signup";
        this.requestreset="/api/admin/requestreset";
        this.postRequest="/api/postrequest";
        this.showCustomHeader=false;
        this.showHeader=false;
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.user=this._modSelector._user;
        this.isSignedOut=true;
    }
///GETTERS SETTERS///////////////////
async apiUploadSaveFree(item:{parent:HTMLElement,Key:string,formdata:FormData}):Promise<gets3ImgKey | null|void
>{
    const {parent,Key,formdata}=item;
    if(!(formdata && Key)){
        Misc.message({parent,msg:"missing params check input",type_:"error",time:800});
       return null
    }else{
        formdata.set("Key",Key)
        const option={
            method:"PUT",
            body:formdata
        }
        return fetch(this.uploadfreeimageUrl,option).then(async(res)=>{
            // /api/uploadfreeimage
            if(res){
                if(res){
                    return{
                        img:`${this.freeurl}/${Key as string}`,
                        Key:Key as string
                    }
                }else{
                    return null
                }
            }else{
                Misc.message({parent,msg:"did not upload",type_:"error",time:800});
                return null
            }
        });

    };
}

 async getUsersignin(item:{user:userType}):Promise<userType|undefined>{
    const {user}=item;
    if(user.email){
        const option={
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(user)
        }
        const res = await fetch(this.usersignin,option)
        if(res){
           this.isSignedOut=false;
            const body= await res.json() as userType
            return body;
           }
    }
 }
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
        const maxcount=ModSelector.maxCount(blog);
        localStorage.setItem("blog",JSON.stringify(this._modSelector.blog));
        if(maxcount>0){
            localStorage.setItem("placement",String(maxcount + 1));
        }
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
        blog={id:0,name:undefined,desc:undefined,user_id:"",class:ModSelector.main_class,inner_html:undefined,cssText:ModSelector.main_css,img:undefined,imgKey:undefined,show:false,username:undefined,rating:0,selectors:[] as selectorType[],elements:[] as elementType[],codes:[] as codeType[],pageCounts:[] as pageCountType[],messages:[] as messageType[],charts:[] as chartType[],date:new Date(),update:new Date(),attr:"circle",barOptions:[]};
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

    //---------------------THIS MARKS DELETE MAIN:ADDS:TO BE DELETED--------------------------------------///

    async imgKeyMarkDelete(item:{targetParent:HTMLElement|null,targetImage:HTMLImageElement|null,oldKey:string|null}):Promise<void>{
        const {oldKey,targetParent,targetImage}=item;
        switch(true){
            case oldKey !==null && targetParent ===null && targetImage ===null:
                 await this.markDelKey({del:true,imgKey:oldKey,date:new Date()});
            return;
            case oldKey ===null && targetParent !==null && targetImage ===null:
                const {isJSON,parsed}=Header.checkJson(targetParent.getAttribute("flex"));
                if(isJSON){
                    const flex=parsed as flexType;
                //IF IMGkEY MARK DELETE
                    await this.markDelKey({del:true,imgKey:flex.imgKey as string,date:new Date()});
                    //IF IMGkEY MARK DELETE
                }else{
                    const imgKey=targetParent.getAttribute("imgKey") as string;
                    await this.markDelKey({del:true,imgKey:imgKey,date:new Date()});
                }
            return;
            case oldKey ===null && targetParent ===null && targetImage !==null:
                const {isJSON:isJSON_1,parsed:parsed_1}=Header.checkJson(targetImage.getAttribute("flex"));
                if(isJSON_1){
                    const flex=parsed_1 as flexType;
                //IF IMGkEY MARK DELETE
                    await this.markDelKey({del:true,imgKey:flex.imgKey as string,date:new Date()});
                    //IF IMGkEY MARK DELETE
                }else{
                    const imgKey=targetImage.getAttribute("imgKey") as string;
                    await this.markDelKey({del:true,imgKey:imgKey,date:new Date()});
                }
            return;
            default:
                return;

        }
       };

    //---------------------THIS MARKS DELETE MAIN DELETE (ADDS MARK TO BE DELETED)--------------------------------------///
    //YOU NEED A BLOG WITH IMAGE IT NEEDS A KEY SET IN FORMDATA
    async uploadSaveImage(parent:HTMLElement,formData:FormData,image:HTMLImageElement,blog:blogType,flex:flexType|null):Promise<{
        blog: blogType;
        data: {
            Key: string | null;
            img: string | null;
        };
    } | null | undefined>{
        // console.log(formData,formData.get("file"),formData.get("Key"));
        // headers:{"Content-Type":"multipart/form-data"}=>DOES NOT WORK,
        const option={
            method: "PUT",
            body: formData
            
        }
        const file=formData.get("file");
        const Key=formData.get("Key");
        if(file && Key){
            return fetch(this.urlUpload,option).then(async(res)=>{
                ///api/uploadImage
                
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
                                    const rows=JSON.parse(sel.rows as string) as rowType[];
                                    rows.map(row=>{
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
    async simpleImgUpload(parent:HTMLElement,formData:FormData):Promise<void | gets3ImgKey|null>{
        //UPLOADS FILE AND THEN GETS IMAGE WITH IMAGEKEY
        // // headers:{"Content-Type":"multipart/form-data"},=>causes issue,
        const file=formData.get("file") as string;
        const Key=formData.get("Key") as string;
        
        if(file && Key){
            const option={
                method: "PUT",
                body: formData
                
            }
            return fetch(this.urlUpload,option).then(async(res)=>{
                ///api/uploadImage
                if(res.ok){
                    const formdata_key=formData.get("Key") as string;
                    //store key//
                    if(formdata_key){
                        let _res_:gets3ImgKey|null=null;
                        //store key//
                        //GETTING IMAGE URL////////
                        const data:gets3ImgKey|null =await this.getSimpleImg(formdata_key);
                        if(data && data.Key){
                            _res_= data as gets3ImgKey|null;
                        }
                        return _res_
            
                       

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
    async uploadfreeimage(item:{parent:HTMLElement,formdata:FormData}):Promise<gets3ImgKey|null>{
        const {parent,formdata}=item;
        // console.log("before sending",formdata.get("file"))
        if(!formdata) return null;
        const Key=formdata.get("Key");
        // if( Key)return null;
        const option={
            method:"PUT",
            body:formdata
        }
        return fetch(this.uploadfreeimageUrl,option).then(async(res)=>{
            //sends only 200 because url/user/filename.png will be image key=userID/
            if(res){
                return{
                    img:`${this.freeurl}/${Key as string}`,
                    Key:Key as string
                }
            }else{
                return null
            }
        });
    }
    //GETS IMAGE AND POPULATES IMAGE URL FROM AWS TO IMAGE.SRC=>RETURNS(IMGURL,KEY})
    async getImg(parent:HTMLElement,image:HTMLImageElement|null,Key:string):Promise<{img:string|null,Key:string|null}>{
        //GET ONLY IMAGE KEY =: HANDLER COUNTS IMAGE RETRIEVAL
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
    async injectBgAwsImage(item:{target:HTMLElement,imgKey:string,cssStyle:{[key:string]:string}}): Promise<HTMLElement>{
        //THIS GET THE AWSURL AND THEN INJECTS IT INTO THE BACKGROUND IMAGE WITH CSSSTYLES ADDED
        const {target,imgKey,cssStyle}=item;
        if(imgKey){
           this.getSimpleImg(imgKey).then(async(res:gets3ImgKey|null)=>{
                if(res){
                    for ( const key of Object.keys(target.style)){
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
                }
            });
        }
        return target
    }
    

    async saveBlog(blog:blogType):Promise<blogType|void>{
        if(!blog) return;
            const option={
                headers:{
                    "Content-Type":"application/json",
                },
                method:"POST",
                body:JSON.stringify(blog)
            };
            return fetch(this.urlsaveBlog,option).then(async(res)=>{
                //api/savegetblog
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
    async signout(item:{redirect:boolean}){
        const {redirect}=item;
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
        this.isSignedOut=true;
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
            if(redirect){
                await signOut({redirect:true});
            }else{
                await signOut({redirect:false});

            }
        }
      
        return;
    }

    //THIS GETS IMAGE FROM AWS USING ONLY A KEY
    async getSimpleImg(Key:string):Promise<gets3ImgKey|null>{
        //GET IMG HTTP AND COUNTS IMAGE UNDER DELETEDIMG
        ///api/blog/getimg
        return fetch(`${this.urlGetImg}?Key=${Key}`).then(async(res)=>{
            if(res.ok){
                const getimg:gets3ImgKey= await res.json();
                const {Key}=getimg;
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
                            if(credent && credent.id){
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
   
   
   //PARENT _user.REFRESHIMAGES
   

    async getFlexElement(target:HTMLElement,flex:flexType|null){
        await this.promsaveItems(this._modSelector.blog).then((blog:blogType)=>{
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
                    const rows=JSON.parse(select.rows as string) as rowType[];
                    const row=rows.find(row=>(row.eleId===rowId))
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
    generateFreeImgKey(item:{formdata:FormData,user:userType}):{Key:string}|undefined{
        //THIS GENERATES AN IMAGE KEY=> NEEDS FORMDATA &&  (N/A)=>user
        const {formdata,user}=item;
        const getKey=formdata.get("Key");
        const file=formdata.get("file") as File;
        if(!file)return;
        if(!getKey){
            const rand=uuidv4().split("-")[0];
            const name=user.name ? user.name.split(" ").join("").trim() :"unknownUser";
            const user_id=user.id ? user.id : "no_userid"
            const Key=`${user_id}-${name}-${file.name}`;
            const Key_=Key.trim();
            formdata.set("Key",Key_);
            return {Key:Key_}
        }else{
            return {Key:getKey as string}

        }
    }
    generateQuoteKey(item:{formdata:FormData,user:userType}):{Key:string|undefined}{
        //THIS GENERATES AN IMAGE KEY=> NEEDS FORMDATA &&  (N/A)=>user. IF USER then all quotes will have unique keys for user account
        const {formdata,user}=item;
        const getKey=formdata.get("Key");
        const file=formdata.get("file") as File;
        if(!file)return {Key:undefined};
        if(!getKey){
            const name=user.name ? user.name.split(" ").join("").trim() :"unknownUser";
            const user_id=user.id ? user.id : "nouserid";
            const rand=user.id ? `-${Math.round(Math.random()*100)}-`:"";
            const Key=`quote/${user_id}-${name}-${rand}quote.png`;
            const Key_=Key.trim();
            formdata.set("Key",Key_);
            return {Key:Key_}
        }else{
            return {Key:getKey as string}

        }
    }
    generatePostSendReqKey(item:{formdata:FormData,post:postType}):{Key:string|undefined}{
        //THIS GENERATES AN IMAGE KEY=> NEEDS FORMDATA &&  (N/A)=>user. IF USER then all quotes will have unique keys for user account
        const {formdata,post}=item;
        const getKey=formdata.get("Key");
        const file=formdata.get("file") as File;
        if(!file)return {Key:undefined};
        if(!getKey){
            const name=post.title ? post.title.split(" ").join("").trim() :"unknownTitle";
            const user_id=post.userId ? post.userId : "nouserid";
            const Key=`sendPostAnswer/${user_id}-${name}.png`;
            const Key_=Key.trim();
            formdata.set("Key",Key_);
            return {Key:Key_}
        }else{
            return {Key:getKey as string}

        }
    }
   
    async storeKey(store:deletedImgType):Promise<void | deletedImgType>{
        //EXECUTES ONLY IF DEL=FALSE && KEY EXIST.IT STORES KEY IN DeletedImg table
        const {imgKey,del}=store;
        if(!del && imgKey){
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
        const {del,imgKey}=item;
        if(del && imgKey){
            const option={
                headers:{
                    "Content-Type":"application/json"
                },
                method:"PUT",
                body:JSON.stringify(item)
            };
            return fetch(this.deletemarkImg,option).then(async(res)=>{
                //api/admin/deletemarkimg
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

    async userBlogs(user_id:string):Promise<blogType[]|void>{
        //GETS ALL USER BLOGS (/api/user_blogs)
        const option={
            headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        ///api/user_blogs
        return fetch(`${this.user_blogs}?user_id=${user_id}`,option).then(async(res)=>{
            if(res){
                const blogs= await res.json() as blogType[]; // !! with blogs
                return blogs;
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
            ///api/blog
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
                //"/api/blog/getuserblog"
                if(res){
                    return await res.json() as blogType;
                }
            }).catch((err)=>{const msg=getErrorMessage(err);console.log(msg);return msg});
        }
    }
    async newBlog(blog:blogType):Promise<blogType | void>{
        blog={...blog,id:0};
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(blog)
        }
        return fetch(this.newBlogUrl,option).then(async(res)=>{
            ///api/blog/createnew
            if(res){
                blog= await res.json() as blogType;
                return blog;
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg);console.log(msg)});
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
    // async getImages(){
    //     const option={
    //         headers:{
    //         "Content-Type":"application/json",
    //         },
    //         method:"GET"
    //     }
    //     return fetch(this.images,option).then(async(res)=>{
    //         if(res){
    //             const body:any= await res.json() as any;
    //             const imageCat=body.filter(obj=>(obj.name==="extraImages"))[0]?.imageCategory as imageType[];
    //             const imageCat2=body.filter(obj=>(obj.name==="FlowerShop"))[0]?.imageCategory as imageType[];
    //             return imageCat.concat(imageCat2);
    //         }
    //     });
    //     //FlowerShop
    // }

    async registerUser(user:userType):Promise<userType|void>{
        if(!user) return;
        const option={
            headers:{
            "Content-Type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(user)
        }
       ///api/registeruser
        return fetch(this.registeruserUrl,option).then(async(res)=>{
            if(res){
                const user= await res.json() as userType;
                return user;
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
    async newUserEMailTo(user_id:string):Promise<{msg:string}|undefined>{
        const option={
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify({user_id:user_id})
        }
        //api/signupemail
        return fetch(this.signupemailUrl,option).then(async(res)=>{
            if(res){
                const body= await res.json() as {msg:string}
                return body
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
            const rows=JSON.parse(header.rows as string) as rowType[];
           const retRows=await Promise.all( rows.map(async(row)=>{
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
            //api/admin/images
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
        //"/api/admin/users"
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
        // api/admin/users
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
    async getPageCount(item:{page:string,blog_id:number|undefined,post_id:number|undefined}): Promise<void |  pageCountType | null>{
        const {page,blog_id,post_id}=item;
        const option={
            Headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        return fetch(`${this.pageCountUrl}?name=${page}&blog_id=${blog_id}&post_id=${post_id}`,option).then(async(res)=>{
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
    async check_email(user:userType):Promise<{name:string|null,email:string|null}|void>{
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(user)
        }
        return fetch(this.checkemail,option).then(async(res)=>{
            ///api/checkemail
            if(res){
                //if res exist has email else {name:str}
                const user= await res.json() as {name:string|null,email:string|null};
                return user;
            }
        }).catch((err)=>{console.error(err)})
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

    async getposts():Promise<postType[] |void>{
        //api/posts
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"GET"
        }
        return fetch(this.postsUrl,option).then(async(res)=>{
            //api/posts
            if(res.ok){
                const posts= await res.json() as postType[];
                return posts;
            }
        });
    }
    async getpost(item:{id:number}):Promise<postType |void>{
        const {id}=item;
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"GET"
        }
        return fetch(`${this.postsUrl}?id=${id}`,option).then(async(res)=>{
            //api/posts
            if(res.ok){
                const post= await res.json() as postType;
                return post;
            }
        });
    }
    async saveUpdatepost(item:{post:postType}):Promise<postType |void>{
        const {post}=item;
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(post)
        }
        return fetch(this.postsUrl,option).then(async(res)=>{
            //api/posts
            if(res.ok){
                const post= await res.json() as postType;
                return post;
            }
        });
    }
    async getUserposts(item:{user:userType}):Promise<postType[] |void>{
        const {user}=item;
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"GET",
        }
        return fetch(`${this.userpostUrl}?user_id=${user.id}`,option).then(async(res)=>{
            if(res.ok){
                const post= await res.json() as postType[];
                return post;
            }
        });
    }
    async delpost(item:{id:number}):Promise<postType |void>{
        const {id}=item;
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"DELETE"
        }
        return fetch(`${this.postsUrl}?id=${id}`,option).then(async(res)=>{
            if(res.ok){
                const post= await res.json() as postType;
                return post;
            }
        });
    }
    generatePostImgKey(formdata:FormData,post:postType):{Key:string}|undefined{
        //THIS GENERATES AN IMAGE KEY=> NEEDS FORMDATA && BLOG.NAME && user_id
        const getKey=formdata.get("Key");
        const file=formdata.get("file") as File;
        if(!file)return;
        if(!getKey){
            const rand=uuidv4().split("-")[0];
            const name=post.title ? post.title.split(" ").join("-"):"postTitle";
            const user_id=post.userId ? post.userId : "ananomous"
            const Key=`${user_id}-${name}/${rand}-${file.name}`;
            const Key_=Key.trim();
            formdata.set("Key",Key_);
            return {Key:Key_}
        }else{
            return {Key:getKey as string}

        }
    }
    async checkPostlike(item:{post:postType}):Promise<postType|boolean>{
        const {post}=item;
        const option={
            headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        const likes=post.likes? post.likes:0;
        return fetch(`${this.postlike}?id=${post.id}&likes=${likes}`,option).then(async(res)=>{
            if(res){
                const post=await res.json() as postType;
                return post;
            }
            return false;
        });
    }
   
       async peronalInfo2():Promise<infoType2|undefined>{
        //THIS PULLS THE PERSONAL INFO FROM newablogroom-free-bucket
        const option={
            headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        return fetch(`${this.freeurl}/info.json`,option).then(async(res_)=>{
            if(res_){
                const body= await res_.json() as infoType2
                return body;
            }
        });
        
       }
    async admin_update_info(item:{info:string |infoType2,user_id:string}):Promise<{info:infoType2|null,success:boolean}>{
        const {info,user_id}=item;

        if(!info && user_id) return {info:null,success:false};
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"PUT",
            body:JSON.stringify(item)
        }
        return fetch(this.adminUpdateinfo,option).then(async(res)=>{
            //api/admin/updateinfo
            if(res.ok){
                const body= await res.json()
                return {info:body,success:true};
            }else{
                return {info:null,success:false};
            }
        });
    }
    ////------------WORKS BUT NOT USING START-------------------//
    async getQuote(item:{quoteParams:quoteType}):Promise<returnQuoteFinalType|undefined>{
        const {quoteParams}=item;
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(quoteParams)
        }
        return fetch(this.quoteUrl,option).then(async(res)=>{
            //"/api/quote"
            if(res.ok){
                const body= await res.json() as returnQuoteFinalType 
                return body;
            }
        });
    }
    ////----------WORKS BUT NOT USING END--------////
    async putQuoteimg(item:{formdata:FormData}):Promise<{success:string,Key:string}|undefined>{
        const {formdata}=item;
        const file=formdata.get("file")
        if(!file) return
    
        const option={                                 
            method:"PUT",
            body:formdata
        }
        return fetch(this.putimagefileUrl,option).then(async(res)=>{
            //api/imagefile
            if(res.ok){
                const body= await res.json() as {success:string,Key:string} 
                return body;
            }
        });
    }
    async postQuoteimg(item:{quoteimgParams:quoteimgType}):Promise<{msg:string}|undefined>{
        const {quoteimgParams}=item;
        console.log("sent",quoteimgParams)
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(quoteimgParams)
        }
        return fetch(this.quoteimgUrl,option).then(async(res)=>{
            //api/quoteimg
            if(res.ok){
                const body= await res.json() as {msg:string} 
                return body;
            }
        });
    }
    async getQuoteimg(item:{imgKey:string}):Promise<string|undefined>{
        const {imgKey}=item;
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"GET",
        }
        return fetch(`${this.quoteimgUrl}?imgKey=${imgKey}`,option).then(async(res)=>{
            //api/quoteimg
            if(res.ok){
                const body= await res.json() as string 
                return body;
            }
        });
    }
    async signup(item:{signupquote:signupQuoteType}):Promise<{msg:string}|undefined>{
        const {signupquote}=item;
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(signupquote)
        }
        return fetch(this.signupUrl,option).then(async(res)=>{
            //api/quoteimg
            if(res.ok){
                const body= await res.json() as {msg:string} 
                return body;
            }
        });
    }

    //------------------REST PASSWORD REQUEST-----------------///////
   async sendRestePassword(item:{params:onChangeVerifyType}):Promise<messageType|void>{
        const {params}=item;
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(params)
        }
        //api/admin/requestreset
        return fetch(this.requestreset,option).then(async(res)=>{
            if(res){
                const body= await res.json() as messageType;
                return body
            }
        });
    }
    //------------------REST PASSWORD REQUEST-----------------///////
    //---------- REQUEST POST ANSWER-----------------///////
    async requestPost(item:{sendRequest:sendPostRequestType}):Promise<{msg:string}|void>{
        const {sendRequest}=item;
        const option={
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(sendRequest)
        };
        return fetch(this.postRequest,option).then(async(res)=>{
            //api/postrequest
            if(res){
                const body= await res.json() as {msg:string};
                return body;
            }
        });
    }
    //---------- REQUEST POST ANSWER-----------------///////

   

       
    
}
export default Service;
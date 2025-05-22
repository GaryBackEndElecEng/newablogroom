import {elementType,selectorType,codeType,blogType, gets3ImgKey, userType,messageType, deletedImgType, img_keyType, adminImageType, providerType, pageCountType, delteUserType, sendEmailMsgType, chartType, postType, infoType2, bucketType, quoteType, returnQuoteFinalType, quoteimgType, signupQuoteType, rowType, sendPostRequestType, checkemailType, quoteCalcItemType} from "@/components/editor/Types";

import { combinedType, mainIntroLetterType, mainResumeRefType, mainResumeType, nameLetterType, nameRefType, nameResumeType } from '../bio/resume/refTypes';

import Misc from "./misc/misc";
import ModSelector from "@/components/editor/modSelector";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { v4 as uuidv4 } from 'uuid';
import Main from "../editor/main";
import { getCsrfToken,getProviders,signOut } from "next-auth/react";
import Header from "../editor/header";
import Nav from "../nav/headerNav";
import { onChangeVerifyType } from '../editor/Types';
import { idValueType, selRowColType } from "@/lib/attributeTypes";

class Service {
  private readonly  awsimgUrl:string="/api/awsimg";
  private readonly  postlike:string="/api/postlike";
  private readonly  liveonoffUrl:string="/api/liveonoff";
  private readonly  newBlogUrl:string="/api/newblog";
  private readonly  urlUpload:string="/api/uploadImage";
  private readonly  urlBlog:string="/api/blog";
  private readonly  urlsaveBlog:string="/api/savegetblog";
  private readonly  urlSignin:string="/api/auth/callback/credentials";
  private readonly  urlProvider:string="/api/auth/providers";
  private readonly  urlSignOut:string="/api/auth/signout"
  private readonly  imgLoad:string="/api/imgload";
  private readonly  urlGetImg:string="/api/blog/getimg";
  private readonly  urlMsg:string="/api/message";
  private readonly  urlAllmsgs:string="/api/allmsgs"
  private readonly  urlToken:string="api/token;"
  private readonly  urlAdminGetMsgs:string="/api/admin/getmessages";
  private readonly  urlAdminEmail:string="/api/admin/adminemail";
  private readonly  adminUserUrl:string="/api/admin/user";
  private readonly  userUrlUpdate:string="/api/user_update";
  private readonly  getuserinfo_url:string="/api/getuserinfo";
  private readonly  getuser:string="/api/getuser";
  private readonly  emailUrl:string="/api/email";
  private readonly  signupemailUrl:string="/api/signupemail";
  private readonly  sendEmailUrl:string="/api/sendemail";
  private readonly  registeruserUrl:string="/api/registeruser";
  private readonly  user_blogs:string="/api/user_blogs";
  private readonly  userBlogUrl:string="/api/blog/getuserblog";
  private readonly  requestUrl:string="/api/admin/request";
  private readonly  btnColor:string;
  private readonly  bgColor:string;
  private readonly  adminimages:string="/api/admin/images";
  private readonly  adminusers:string="/api/admin/users";
  private readonly  adminpagecountUrl:string="/api/admin/adminpagecount";
  private readonly  adminUpdateinfo:string="/api/admin/updateinfo";
  private readonly  pageCountUrl:string="/api/pagecount";
  private readonly  metaUrl:string="/api/meta";
  private readonly  postsUrl:string="/api/posts";
  private readonly  userpostUrl:string="/api/userpost";
  private readonly  uploadfreeimageUrl:string="/api/uploadfreeimage";
  private readonly  freeurl:string="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
  private readonly  checkemail:string="/api/checkemail";
  private readonly  quoteUrl:string="/api/quote";
  private readonly  quoteimgUrl:string="/api/quoteimg";
  private readonly  adminquote:string="/api/admin/quote";
  private readonly  signupUrl:string="/api/signup";
  private readonly  simpleSignupUrl:string="/api/simplesignup";
  private readonly  putimagefileUrl:string="/api/imagefile";
  private readonly  bucket:bucketType="masterultils-postimages"; 
  public   isSignedOut:boolean;
  private readonly  deletemarkImg:string="/api/admin/deletemarkimg";
  private readonly  requestreset:string="/api/admin/requestreset";
  private readonly  postRequest:string="/api/postrequest";
  //BIO----------PORTFOLIO-------------------//--------------------------//
  public readonly resume:string;
  public readonly resumes:string;
  public readonly reference:string;
  public readonly references:string;
  public readonly checkref:string;
  public readonly letter:string;
  public readonly letters:string;
  public readonly resrefslets:string;
  
  //BIO----------PORTFOLIO-------------------//--------------------------//
    // getInitBlog:blogType;
    constructor(private _modSelector:ModSelector){
        //BIO----------PORTFOLIO-------------------//--------------------------//
        this.resume="/api/resume/resume";
        this.resumes="/api/resume/resumes";
        this.reference="/api/resume/resumeref";
        this.references="/api/resume/resumerefs";
        this.checkref="/api/resume/checkref";
        this.letter="/api/resume/letter/letter";
        this.letters="/api/resume/letter/letters";
        this.resrefslets="/api/resume/resrefslets";
        //BIO----------PORTFOLIO-------------------//--------------------------//
        this.bucket="masterultils-postimages";
        this.awsimgUrl="/api/awsimg";
        this.deletemarkImg="/api/admin/deletemarkimg";
        this.liveonoffUrl="/api/liveonoff";
        this.newBlogUrl="/api/newblog";
        this.urlUpload="/api/uploadImage";
        this.urlBlog="/api/blog";
        this.urlsaveBlog="/api/savegetblog";
        this.urlSignin="/api/auth/callback/credentials";
        this.urlProvider="/api/auth/providers";
        this.urlSignOut="/api/auth/signout"
        this.imgLoad="/api/imgload";
        this.urlGetImg="/api/blog/getimg";
        this.urlMsg="/api/message";
        this.urlAllmsgs="/api/allmsgs";
        this.getuser="/api/getuser";
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
        this.simpleSignupUrl="/api/simplesignup";
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
        this.adminquote="/api/admin/quote";
        this.signupUrl="/api/signup";
        this.requestreset="/api/admin/requestreset";
        this.postRequest="/api/postrequest";
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.isSignedOut=true;
        // console.log("SERVICE:CONSTRUCTOR")
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
                return{
                    img:`${this.freeurl}/${Key as string}`,
                    Key:Key as string
                }
            }else{
                Misc.message({parent,msg:"did not upload",type_:"error",time:800});
                return null
            }
        });

    };
};

getFreeBgImageUrl({imgKey}:{imgKey:string}):string{
    //https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/imgKey
    return `${this.freeurl}/${imgKey}`
};


getKey({imgUrl}:{imgUrl:string}):string|null{
    const regFreeTest:RegExp=/(https:\/\/newablogroom-free-bucket.s3.us-east-1.amazonaws.com)/;
    if(regFreeTest.test(imgUrl)){
        const match=RegExp(regFreeTest).exec(imgUrl);
        if(match){
            const end=match.index+match[0].length +1;
            return imgUrl.slice(end,imgUrl.length);
        };
    }
    return null
}

 
    saveItems(item:{blog:blogType,user:userType|null}):blogType{
        //REORGS THE MODSELECTOR.BLOG AND ADDS USER ID TO BLOG IF EXISTS
        const {blog,user}=item;
        const show=blog.show;
        const username=blog.username;
        const css=blog.cssText;
        const class_=blog.class;
        this._modSelector.elements=this.checkElements({blog}) as elementType[];
        this._modSelector.selectors=this.checkSelectors({blog});
        this._modSelector.charts=this.checkCharts({blog});
        this._modSelector.pageCounts=blog.pageCounts;
        const findHeader= blog?.selectors ? blog.selectors.find(sel=>(sel.header===true)):null;
        const findFooter= blog?.selectors ? blog.selectors.find(sel=>(sel.footer===true)) :null;
        this._modSelector.blog={...blog,cssText:css,class:class_,show:show,username:username};
        
        if(findHeader){
            this._modSelector._header=findHeader;
        }
        if(findFooter){
            this._modSelector._footer=findFooter;
        }
        if(user && user.id!==""){
            this._modSelector.blog={...this._modSelector.blog,user_id:user.id};
        }
        const maxcount=ModSelector.maxCount(blog);
        if(maxcount>0){
            localStorage.setItem("placement",String(maxcount + 1));
        }
        localStorage.setItem("blog",JSON.stringify(this._modSelector.blog));
        return blog;
    };


    promsaveItems(item:{blog:blogType,user:userType|null}):Promise<blogType>{
        const {blog,user}=item;
        return Promise.resolve(this.saveItems({blog,user})) as Promise<blogType>
        
    };



    checkElements(item:{blog:blogType}):elementType[]{
        const {blog}=item;
        let eles=blog.elements as elementType[];
        eles=eles?.toSorted((a,b)=>{if(a.placement < b.placement) return -1;return 1});
        // console.log("checkEle: eles",eles)
        if(eles?.length>0){
             eles=eles.map(ele=>{
                ele.blog_id=blog.id;
                return ele;
             });
            return eles;
        }else{
            return [] as elementType[]
        }
        
    };


    checkSelectors(item:{blog:blogType}){
        const {blog}=item;
        let selects:selectorType[]=blog.selectors;
        selects=selects?.toSorted((a,b)=>{if(a.placement < b.placement) return -1;return 1});
        if(selects?.length>0){
            selects=selects.map(select=>{
                select.blog_id=blog.id;
                return select;
            });
            return selects;
        }else{
            return [] as selectorType[]
        }
    };



    checkCodes(item:{blog:blogType}){
        const {blog}=item;
        let codes:codeType[]=blog.codes;
        codes=codes?.toSorted((a,b)=>{if(a.placement < b.placement) return -1;return 1});
        if(codes?.length>0){
            codes=codes.map(code=>{
                code.blog_id=blog.id;
                return code;
            });
            return codes
        }else{
            return [] as codeType[]
        }
        
    };



    checkCharts(item:{blog:blogType}){
        const {blog}=item;
        let charts:chartType[]=blog.charts;
        charts=charts?.toSorted((a,b)=>{if(a.placement < b.placement) return -1;return 1});
        if(charts?.length>0){
            charts=charts.map(chart=>{
                chart.blog_id=blog.id;
                return chart;
            });
            return charts
        }else{
            return [] as chartType[]
        }
        
    };


    initializeBlog(){
        this._modSelector.pageCounts=[] as pageCountType[];
        this._modSelector.elements=[] as elementType[];
        this._modSelector.selectors=[] as selectorType[];
        this._modSelector.selectCodes=[] as codeType[];
        this._modSelector.charts=[] as chartType[];
        const blog:blogType={id:0,name:undefined,desc:undefined,user_id:"",class:ModSelector.main_class,inner_html:undefined,cssText:ModSelector.main_css,img:undefined,imgKey:undefined,show:false,username:undefined,rating:0,selectors:[] as selectorType[],elements:[] as elementType[],codes:[] as codeType[],pageCounts:[] as pageCountType[],messages:[] as messageType[],charts:[] as chartType[],date:new Date(),update:new Date(),attr:"circle",barOptions:[]};
        this._modSelector.blog=blog;
       
    };


    async get_csrfToken(){
        return await getCsrfToken();
    };

///GETTERS SETTERS///////////////////


    async fetchBlogs():Promise<blogType[]|void>{
        return fetch(this.urlsaveBlog).then(async(res)=>{
            if(res.ok){
                const body= await res.json() as blogType[];
                this._modSelector.blogs=body;
                return body
            }
        }).catch(err=>{const msg=getErrorMessage(err);console.error(msg)});
       
    };

    //---------------------THIS MARKS DELETE MAIN:ADDS:TO BE DELETED--------------------------------------///

    async imgKeyMarkDelete({oldKey,targetParent,targetImage,selRowCol,idValues}:{
        targetParent:HTMLElement|null,
        targetImage:HTMLImageElement|null,
        oldKey:string|null,
        selRowCol:selRowColType|null,
        idValues:idValueType[]
    }):Promise<void>{
        const idValue=targetParent !==null ? this._modSelector.dataset.getIdValue({target:targetParent,id:"imgKey",idValues}):null;
        const getKey=targetParent ? targetParent.getAttribute("data-img-key"):null;
        const keyResolve=idValue ? idValue.attValue:(getKey)
        switch(true){
            case oldKey !==null && targetParent ===null && targetImage ===null:
                 await this.markDelKey({del:true,imgKey:oldKey,date:new Date()});
            return;
            case oldKey ===null && targetParent !==null && targetImage ===null:
                
                if(!(keyResolve)) return;
                    await this.markDelKey({del:true,imgKey:keyResolve,date:new Date()});
                    //IF IMGkEY MARK DELETE
            return;
            case oldKey ===null && targetParent ===null && targetImage !==null:
                    if(!keyResolve) return;
                    await this.markDelKey({del:true,imgKey:keyResolve,date:new Date()});
            return;
            default:
                return;

        }
       };

    //---------------------THIS MARKS DELETE MAIN DELETE (ADDS MARK TO BE DELETED)--------------------------------------///
   
    
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
                        if(data ){
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
    };

    
    async uploadfreeimage(item:{formdata:FormData}):Promise<gets3ImgKey|null>{
        const {formdata}=item;
        // console.log("before sending",formdata.get("file"))
        if(!formdata) return null;
        const Key=formdata.get("Key");
        
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
    

    async saveBlog(item:{blog:blogType,user:userType}):Promise<blogType|void>{
        const {blog,user}=item;
        if(!blog) return;
            const option={
                headers:{
                    "Content-Type":"application/json",
                },
                method:"POST",
                body:JSON.stringify(blog)
            };
            return fetch("/api/savegetblog",option).then(async(res)=>{
                //api/savegetblog,this.urlsaveBlog
                    let blog_:blogType;
                    if(res.ok){
                    blog_= await res.json();
                    await this.promsaveItems({blog:blog_,user:user});
                    return blog_ as blogType;
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
        switch(true){
            case loc==="/admin":
                await signOut();
            break;
            case loc==="/editor":
                Header.cleanUp(Main._mainFooter as HTMLElement);
                Header.cleanUp(Main.textarea as HTMLElement);
                Header.cleanUp(Main._mainHeader as HTMLElement);
                await signOut({redirect});
            break;
            default:
                await signOut({redirect});
            return;

        };
    }

    //THIS GETS IMAGE FROM AWS USING ONLY A KEY
    async getSimpleImg(Key:string):Promise<gets3ImgKey|null>{
        //GET IMG HTTP AND COUNTS IMAGE UNDER DELETEDIMG
        ///api/blog/getimg
        return fetch(`${this.urlGetImg}?Key=${Key}`).then(async(res)=>{
            if(res.ok){
                const getimg:gets3ImgKey= await res.json();
                return getimg;
            }else{
                return null ;
            }
            
        });
    };
   
   //PARENT _user.REFRESHIMAGES
  
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
    };


    generateFreeImgKey(item:{formdata:FormData,user:userType}):{Key:string}|undefined{
        //THIS GENERATES AN IMAGE KEY=> NEEDS FORMDATA &&  (N/A)=>user
        const {formdata,user}=item;
        const getKey=formdata.get("Key");
        const file=formdata.get("file") as File;
        if(!file)return;
        if(!getKey){
            const name=user.name ? user.name.split(" ").join("").trim() :"unknownUser";
            const user_id=user.id ? user.id : "no_userid"
            const Key=`${user_id}-${name}-freeImg-${file.name}`;
            const Key_=Key.trim();
            formdata.set("Key",Key_);
            return {Key:Key_}
        }else{
            return {Key:getKey as string}

        }
    };


    checkFreeImgKey({imgKey}:{imgKey:string}){
        //FORM: ${user_id}-${name}-${file.name}
        //cm82yqjd70000w958mglvn99p-testthis/56efea2f-firePic.png
        // const regName:RegExp=/\w/;
        const regFree:RegExp=/(freeImg)/;
        const regHyph:RegExp=/\w-\w/;
        const hasHyphen=regHyph.test(imgKey);
        const words=hasHyphen ? imgKey.split("-"):["yes"];
        const testLen=words.length===1;
        const testFree=regFree.test(imgKey);
        if(hasHyphen){
            //has free && non free key
            if(testFree){
                return true
            }else{
                return false;
            }

        }else if(testLen){
            //from insert image
            return true;
        }
        return false    
    };



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
    };

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
    };


    async markDelKey(item:deletedImgType):Promise<void | deletedImgType>{
        // DEL=TRUE  AND KEY EXIST FOR DELETE: it does not delete item from the db (DeletedImg table) only changes its del state. it deletes teh image fro aws
        const {del,imgKey}=item;
        if(del && imgKey){
            const option={
                headers:{
                    "Content-Type":"application/json"
                },
                method:"POST",
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
    };


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
    };


    async hashGenerator(pswd:string|null){
        //RETURN hashPswd WHEN READY!!
        if(pswd){
        //    const hashPswd= await genHash(pswd)
            return pswd;
    
        }else{
            //create message did not get password
            return null;
        }
       };



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
        };
        }).catch((err)=>{
            const msg=getErrorMessage(err);
            console.error(msg)
            Misc.message({parent:parent,msg:msg,type_:"error",time:600});
        }) as Promise<messageType>;
    };


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
    };


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
    };


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
    };


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
    };


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
    };


    async deleteMessage(msg_id:number){
            const option={
                headers:{"Content-Type":"application/json"},
                method:"DELETE",
            }
            return fetch(`${this.urlMsg}?msg_id=${msg_id}`,option).then(async(res:Response)=>{
                if(res){
                    return await res.json() as {id:number};
                }
            });
    };


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
    };


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
    };


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
    };



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
    };



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
            ///api/newblog
            if(res){
                blog= await res.json() as blogType;
                return blog;
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg);console.log(msg)});
    };



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
    };


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
    };



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
    };



    async updateUser(user:userType):Promise<userType|undefined>{
        if(!(user.id && user.email)) return;
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
    };



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
    };



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
    };



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
    };



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
    };



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
    };



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
    };



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
    };


    async markHeaderImgKey(blog:blogType):Promise<(adminImageType | undefined)[] | undefined>{
        const header=blog.selectors.find(sel=>(sel.header));
        if(header){
            const rows=JSON.parse(header.rows as string) as rowType[];
           const retRows=await Promise.all( rows.map(async(row)=>{
                if(row){
                    if(row.imgKey){
                        return await this.adminImagemark(row.imgKey,false).then(async(res)=>{
                            if(res){
                              return res
                            }
                        });
                    };
                    row.cols.map(async(col)=>{
                        if(col){
                            if(col.imgKey){
                                return await this.adminImagemark(col.imgKey,false).then(async(res)=>{
                                    if(res){
                                      return res
                                    }
                                });
                            }
                            col.elements.map(async(ele)=>{
                                if(ele){
                                    if(ele.imgKey){
                                        return await this.adminImagemark(ele.imgKey,false).then(async(res)=>{
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
    };


    async adminImagemark(imgKey:string,del:boolean):Promise<adminImageType | undefined>{
        const option={
            headers:{
                "Content-Type":"application/json"

            },
            method:"PUT",
        };
       
            return fetch(`${this.adminimages}?imgKey=${imgKey}&del=${String(del)}`,option).then(async(res)=>{
                //api/admin/images
                if(res){
                    return await res.json() as adminImageType
                }
            });
       
    };


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
    };


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
    };


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
    };


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
    };


    
    async adminSendEmail(item:{msg:messageType,user_id:string,reply:string}):Promise<{msg:string,success:boolean} | undefined>{
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
    };


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
    };


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
    };


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
    };


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
    };


    async check_email(user:userType):Promise<checkemailType|void>{
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(user)
        }
        return fetch(this.checkemail,option).then(async(res)=>{
            ///api/checkemail
            if(res.ok){
                //if res exist has email else {name:str}
                const user= await res.json() as checkemailType;
                return user;
            }
        }).catch((err)=>{console.error(err)})
    };

    async getUser({email}:{email:string}):Promise<userType|undefined>{
        if(!email) return;
       return fetch(`${this.getuser}?email=${email}`).then(async(res)=>{
            if(res.ok){
                return await res.json() as userType;
            }
        });
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
            //api/meta
            if(res.ok){
                const blogOnly=await res.json() as blogType;
                return blogOnly
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.log(msg)});
    };



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
    };


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
    };


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
    };


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
    };


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
    };


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
    };


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
    };


   
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
    
    };



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
    };


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
    };


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
    };


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
    };


    async adminSaveQuotes({userId,email,quotes}:{userId:string,email:string,quotes:quoteCalcItemType[]}): Promise<void | quoteCalcItemType[]>{
        if(!((userId && email) || quotes?.length))return;
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({userId,email,quotes})
        }
        //api/admin/quote
        return fetch(this.adminquote,option).then(async(res)=>{
            if(res.ok){
                return await res.json() as quoteCalcItemType[];
            }
        }).catch((error)=>{const msg=getErrorMessage(error); console.error(msg);});
    };

    
    async adminGetQuotes({userId,email}:{userId:string,email:string}): Promise<void | quoteCalcItemType[]>{
        if(!(userId || email)) return;
        return fetch(`${this.adminquote}?userId=${userId}&email=${email}`).then(async(res)=>{
            if(res.ok){
                return await res.json() as quoteCalcItemType[];
            }
        }).catch((error)=>{const msg=getErrorMessage(error);console.error(msg)});
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
    };


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
    };


    async newSignup(item:{email:string,name:string}):Promise<{msg:string}|undefined>{
        const {email,name}=item;
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({email,name})
        }
        return fetch(this.signupUrl,option).then(async(res)=>{
            //api/quoteimg
            if(res.ok){
                const body= await res.json() as {msg:string} 
                return body;
            }
        });
    };



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
    };
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
    };
    //---------- REQUEST POST ANSWER-----------------///////
    //-------------CHECK URL------------------------/////
    async checkUrl({url}:{url:string|undefined}){
        if(!(url && url=="undefined" || url===undefined || url==="null" || url===null)) return false;
        if(url){
            return fetch(url).then(async(res)=>{
                if(res.ok) return true;
                return false;
            });
        }
    };

    


    async simpleSignUp(item:{name:string,email:string}):Promise<{email:string,name:string}|undefined>{
        const option={
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(item)
        };
            
            return fetch(this.simpleSignupUrl,option).then(async(res)=>{
                if(res.ok){
                    const body= await res.json();
                    return body;
                };
            });
        
    };


    //------------------------------------RESUME PORTFOLIO BIO-----------------------------------//
     ///------------------------------------RESUME BELOW---------------------------//
   
     getResume({name}:{name:string}):Promise<mainResumeType|void>{
      
        return fetch(`${this.resume}?name=${name}`).then(async(res)=>{
            if(res.ok){
                return await res.json() as mainResumeType;
            }
        });
    
  };

  getResumes({user_id}:{user_id:string}):Promise<nameResumeType[]|void>{
    
        return fetch(`${this.resumes}?user_id=${user_id}`).then(async(res)=>{
            if(res.ok){
                return await res.json() as nameResumeType[];
            }
        });
    
  };


 async saveResume({mainResume}:{mainResume:mainResumeType}): Promise<mainResumeType | undefined>{
      const option={
          headers:{
              "Content-Type":"application/json"
          },
          method:"POST",
          body:JSON.stringify(mainResume)
      }
    
        return fetch(this.resume,option).then(async(res)=>{
            if(res.ok){
                return await res.json() as mainResumeType
            }
        });
  };

 async deleteResume({item}:{item:nameResumeType}): Promise<mainResumeType | undefined>{
  const {id,name}=item;
      const option={
          headers:{
              "Content-Type":"application/json"
          },
          method:"DELETE",
      }
    
        return fetch(`${this.resume}?id=${id}&name=${name}`,option).then(async(res)=>{
            if(res.ok){
                return await res.json() as mainResumeType
            }
        });
  };

///------------------------------------RESUME ABOVE-------------------------------------------//
     ///------------------LETTERS-------------------------------------//
   async getLetters({user_id}:{user_id:string|null}):Promise<void|nameLetterType[] | undefined>{
    if(!user_id) return;
        return fetch(`${this.letters}?user_id=${user_id}`).then(async(res)=>{
            if(res.ok){
                return await res.json() as nameLetterType[];
            }
        }).catch((error)=>{const msg=getErrorMessage(error);console.error(msg)});
    };

   async getLetter({name}:{name:string}):Promise<void|mainIntroLetterType | undefined>{
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"GET"
        }
        return fetch(`${this.letter}?name=${name}`,option).then(async(res)=>{
            if(res.ok){
                return await res.json() as mainIntroLetterType;
            }
        }).catch((error)=>{const msg=getErrorMessage(error);console.error(msg)});
    };

    async deleteLetter({id}:{id:number}):Promise<void|nameLetterType | undefined>{
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"DELETE"
        }
        return fetch(`${this.letter}?id=${id}`,option).then(async(res)=>{
            if(res.ok){
                return await res.json() as nameLetterType;
            }
        }).catch((error)=>{const msg=getErrorMessage(error);console.error(msg)});
    };

    async saveLetter({mainLetter}:{mainLetter:mainIntroLetterType}):Promise<void|mainIntroLetterType | undefined>{
        const option={
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(mainLetter)
        }
       
        return fetch(this.letter,option).then(async(res)=>{
            if(res.ok){
                return await res.json() as mainIntroLetterType;
            }
        }).catch((error)=>{const msg=getErrorMessage(error);console.error(msg)});
    };
    ///------------------LETTERS-------------------------------------//
    //-------------------------------------REFERENCES-BELOW----------------------------------------//

getReference({name}:{name:string}):Promise<mainResumeRefType|void>{
      
    return fetch(`${this.reference}?name=${name}`).then(async(res)=>{
        if(res.ok){
            return await res.json() as mainResumeRefType
        }
    });
};

    getReferences({user_id}:{user_id:string}):Promise<void | nameRefType[] | undefined>{
        
        return fetch(`${this.references}?user_id=${user_id}`).then(async(res)=>{
            if(res.ok){
                return await res.json() as nameRefType[]
            }
        }).catch(error=>{const msg=getErrorMessage(error);console.log(msg)});
  };

 async saveReferences({mainReference}:{mainReference:mainResumeRefType}): Promise<mainResumeRefType | undefined>{
      const option={
          headers:{
              "Content-Type":"application/json"
          },
          method:"POST",
          body:JSON.stringify(mainReference)
      }
    //"/api/resume/resumeref"
        return fetch(this.reference,option).then(async(res)=>{
            if(res.ok){
                return await res.json() as mainResumeRefType
            }
        });
  };

    async deleteReference({item}:{item:nameRefType}): Promise<nameRefType | undefined>{
        const {id,name}=item;
            const option={
                headers:{
                    "Content-Type":"application/json"
                },
                method:"DELETE",
               
            }
          
              return fetch(`${this.reference}?id=${id}&name=${name}`,option).then(async(res)=>{
                  if(res.ok){
                      return await res.json() as nameRefType
                  }
              });
        };

    async checkRef({nameResume}:{nameResume:nameResumeType}): Promise<void | {nameRef: nameRefType;found: boolean;} | undefined>{
        const {name}=nameResume;
        return fetch(`${this.checkref}?name=${name}`).then(async(res)=>{
            if(res.ok){
                return await res.json() as {nameRef:nameRefType,found:boolean}
            }
        }).catch((error)=>{const msg=getErrorMessage(error);console.error(msg);});
    };

    //-------------------------------------REFERENCES ABOVE-----------------------------------------//
      ///------------------COMBINED-------------------------------------//
      async getcombined({user_id}:{user_id:string|null}): Promise<void | combinedType | undefined>{
        if(!user_id)return
        return fetch(`${this.resrefslets}?user_id=${user_id}`).then(async(res)=>{
            if(res.ok){
                return await res.json() as combinedType
            }
        }).catch(error=>{const msg=getErrorMessage(error);console.log(msg)});
    };
    async saveCombined({combined}:{combined:combinedType}): Promise<void | combinedType | undefined>{
        const option={
            headers:{
                "Content-Type":"application/json",
            },
            method:"POST",
            body:JSON.stringify(combined)
        };
        return fetch(this.resrefslets,option).then(async(res)=>{
            if(res.ok){
                return await res.json() as combinedType;
            }
        }).catch(error=>{const msg=getErrorMessage(error);console.log(msg)});
    }
    ///------------------COMBINED-------------------------------------//

    //------------------------------------RESUME PORTFOLIO BIO-----------------------------------//


   

       
    
}
export default Service;
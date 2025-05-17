import {selectorType,blogType, userType, arrDivPlaceType} from "./Types";
import ModSelector from "@/components/editor/modSelector";
import DisplayBlog, {separator} from "@/components/blog/displayBlog";
import Header from "@/components/editor/header";
import Misc, {btnOptionMsgType, btnOptionType, btnOptionType2} from "@/components/common/misc/misc";
import Main from "@/components/editor/main";
import { buttonReturn,btnReturnType } from "../common/tsFunctions";
import Footer from "@/components/editor/footer";
import Service from "@/components/common/services";
import { getErrorMessage } from "@/lib/errorBoundaries";
import CustomHeader from "./customHeader";
import Flexbox from "./flexBox";
import HtmlElement from "./htmlElement";

import Nav from "../nav/headerNav";
import RegSignIn from "../nav/regSignin";

import ChartJS from "../chart/chartJS";

import PasteCode from "../common/pasteCode";

import { idValueType, locationEnumType } from "@/lib/attributeTypes";
import Toolbar from "../common/toolbar";

class EditSetups{
    bgColor:string;
    btnColor:string;
    displayBlog:DisplayBlog;
    flexbox:Flexbox;

    constructor(private _modSelector:ModSelector,private _service:Service,public _displayBlog:DisplayBlog,public flexBox:Flexbox,private _blog:blogType){
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.displayBlog=_displayBlog;
        this.flexbox=flexBox;
      
    };
    /////-----\\ GETTERS SETTERS----//-----\\\\
    get blog(){
        const strBlog=localStorage.getItem("blog");
        if(strBlog){
            const blog=JSON.parse(strBlog) as blogType
            return blog
        }else{
            return this._blog
        }
    };
    set blog(blog:blogType){
        this._blog=blog
        localStorage.setItem("blog",JSON.stringify(blog));
    };
    /////-----\\ GETTERS SETTERS----//-----\\\\
    blogDescSetup(parent:HTMLElement,blog:blogType,idValues:idValueType[]): {cont:HTMLElement,image:HTMLImageElement,desc:HTMLElement,title:HTMLElement,idValues:idValueType[]}{
        this.blog=blog;
        const blogDesc=blog.desc || "";
        const blogImg= blog?.img || "/images/gb_logo.png";
        const cont=document.createElement("div");
        cont.id="blogDescSetup";
        cont.style.cssText="margin:auto;width:100%;background:white;display:flex;flex-direction:column;color:black;position:relative;margin bottom:3rem;min-height:5vh;";
        cont.className="d-flex flex-column align-items-center";
        const imgText=document.createElement("div");
        imgText.style.cssText="display:flex;flex-direction:row;flex-wrap:wrap;position:relative;justify-content:space-around;align-items:center;margin-block:1rem;gap:2rem;"
        const img=document.createElement("img");
        img.style.cssText="border-radius:50%;filter:drop-shadow(0 0 0.75rem #0039a6);width:clamp(175px,220px,300px);aspect-ratio: 1 / 1;float:left;";
        img.src=blogImg;
        img.alt="www.ablogroom.com";
        img.id="blog-edit-img"
        const title=document.createElement("h6");
        title.className="display-6 text-primary";
        title.textContent="edit description && image";
        cont.appendChild(title);
        const desc=document.createElement("p");
        desc.setAttribute("contenteditable","true");
        imgText.appendChild(img);
        desc.textContent=blogDesc;
        desc.style.cssText="text-wrap:pretty;padding-inline:1rem;margin-bottom:2rem;line-height:1.25rem;";
        imgText.appendChild(desc);
        cont.appendChild(imgText);
        desc.oninput=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLParagraphElement).textContent;
            if(value){
                this.blog={...this.blog,desc:value};
                
            }
        };
        parent.appendChild(cont);
        return {image:img,desc,cont,title,idValues};
    };
   
    saveNoBlogSetup(parent:HTMLElement): {retParent:HTMLElement,retBtn:HTMLButtonElement,container:HTMLElement}{
        const container = document.createElement("section");
            container.id="main";
            container.className = "";
            container.style.cssText=`margin:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch;width:100%;position:absolute;inset:25%;height:auto;background-color:white;padding:1rem;padding-block:2rem;z-index:100;border-radius:20px;box-shadow:1px 1px 10px 1px ${this.btnColor},-1px -1px 10px 1px ${this.btnColor};`
            const title=document.createElement("h3");
            title.textContent="about this button";
            title.style.cssText="text-align:center;margin-bottom:2rem;";
            title.className="text-primary";
            const desc=document.createElement("p");
            desc.style.cssText="margin-block:1rem";
            desc.className="px-md-2 ";
            desc.innerHTML=`This button allows you to recover your work encase you refresh the page.
            <span style="color:red; font-size:105%">CAUTION</span><span style="color:${this.btnColor}">!!</span>, if you are concern about loosing your work, please save your work.<br/>
                How to save your work?: 
                <ul>
                <li> press the <pre style="font-style:italic;">'final'button ( top-right)</pre></li>
                <li> then <pre style="font-style:italic;">"save"</pre>.</li>
                </ul>
                <br/> 
                Similarly, if you want to print your final work:
                <ul> 
                <li>press the button <span style="font-style:italic;"> "final"</span>
                </li>
                <li>
                then press <span style="font-style:italic;"> "print"</span>
                </li>
                <br/>
                your work will be encapsulated in an image for best viewing.
                <br/>
                <q><pre>Thanks for understanding and enjoy</pre></q>;
            `;
            container.appendChild(title);
            container.appendChild(desc);
            const div=document.createElement("div");
            div.style.cssText="display:grid;place-items:center;margin:5rem;";
            const message:btnReturnType={
                parent:div,
                text:"close",
                bg:this.btnColor,
                color:"white",
                type:"button"
            }
            const retBtn=buttonReturn(message);
            container.appendChild(retBtn);
            parent.removeChild(container);
        return {retParent:parent,retBtn,container}
    };


    signInPopupSetup(parent:HTMLElement):{form:HTMLFormElement,retParent:HTMLElement,popup:HTMLElement} {
        const popup=document.createElement("section");
        popup.id="signin-popup";
        popup.style.cssText="position:absolute;inset:0;backdrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center; justify-content:center;gap:1rem;";
        const form=document.createElement("form");
        form.style.cssText="margin-inline:auto;padding-inline:1rem;width:auto;display:flex;flex-direction:column;";
        const formGrp=document.createElement("div");
        formGrp.className="form-group mx-auto d-flex flex-column";
        const elabel=document.createElement("label");
        elabel.className="text-primary text-center mx-auto";
        elabel.textContent="email";
        elabel.setAttribute("for","email");
        const einput=document.createElement("input");
        einput.className="form-control";
        einput.type="email";
        einput.autocomplete="email";
        einput.id="email";
        einput.name="email";
        einput.pattern="[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}";
        formGrp.appendChild(elabel);
        formGrp.appendChild(einput);
        const formGrp1=document.createElement("div");
        formGrp1.className="form-group mx-auto d-flex flex-column";
        const plabel=document.createElement("label");
        plabel.className="text-primary text-center mx-auto";
        plabel.textContent="password";
        plabel.setAttribute("for","password");
        const pinput=document.createElement("input");
        pinput.className="form-control";
        pinput.type="password";
        pinput.name="password";
        formGrp1.appendChild(plabel);
        formGrp1.appendChild(pinput);
        form.appendChild(formGrp);
        form.appendChild(formGrp1);
        const btn =document.createElement("button");
        btn.style.cssText=`margin-block:2rem;background:${this.bgColor};color:white;border:1px solid white;padding-inline:2rem;padding-block:0.5rem;border-radius:25px;`;
        btn.className="btn";
        btn.type="submit";
        btn.textContent="signin";
        DisplayBlog.separator(form,this.bgColor);
        form.appendChild(btn);
        popup.appendChild(form);
        parent.appendChild(popup);
        popup.animate([
            {transform:"scale(0.3)",opacity:"0"},
            {transform:"scale(1)",opacity:"1"}
        ],{duration:600,iterations:1});
        return {form,retParent:parent,popup};
    };


    saveOption(parent:HTMLElement,loc:locationEnumType):{cancelBtn:HTMLButtonElement,saveBtn:HTMLButtonElement,container:HTMLElement}{
        parent.style.position="relative";
        parent.style.zIndex="0";
        const shade2=Misc.blueShades.find(sh=>(sh.name==="chlorine blue"))?.value;
        const shade3=Misc.blueShades.find(sh=>(sh.name==="azure"))?.value;
        
        //DO YOU WANT TO SAVE IMAGE YES/NO !
        const button1:btnOptionType={
            btn_type:"button",
            msg:"don't save to server",
            btnBgColor:shade2 ? shade2 as string : "black",
            btnColor:"white;",
            btnLabel:"cancel"
        }
        const button2:btnOptionType2={
            btn_type2:"button",
            msg2:"save to server",
            btnBgColor2:shade3 ? shade2 as string : "black",
            btnColor2:"white;",
            btnLabel2:"save"
        }
        const options:btnOptionMsgType={
            button1:button1,
            button2:button2,
        };
        const {btn1,btn2,container}= Misc.btnOptionMessagePopup(parent,options,loc);
        return {cancelBtn:btn1,saveBtn:btn2,container}
    }


};

//------------EDIT CLASS------------///

class Edit {
   public readonly logo:string="./images/gb_logo.png";
   public readonly url:string="http://localhost:3000/api/blog";
   public readonly urlUpload:string="http://localhost:3000/api/uploadImage";
   public bgColor:string;
   public showMeta:boolean;
   public btnColor:string;
   public mainInjection:HTMLElement | null;
    private _header:Header;
   private  _footer:Footer;
   private  editSetup:EditSetups;
    flexbox:Flexbox;
   private  _regSignin:RegSignIn;
   private  _pasteCode:PasteCode;
   private _blog:blogType;
    css:string="min-height:100vh;height:auto;box-shadow:1px 1px 12px 2px black;border-radius:10px;padding-inline:0px;padding-block:0px;margin:0px;z-index:0;position:relative;width:100%;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:1rem;";
  
    constructor(private _modSelector:ModSelector,private _service:Service,public _mainInjection:HTMLElement | null,private _user:userType,public _flexbox:Flexbox,public _htmlElement:HtmlElement,public header:Header, public customHeader:CustomHeader,public footer:Footer,public displayBlog:DisplayBlog,public chart:ChartJS,private toolbar:Toolbar){
        this.flexbox=_flexbox;
        this._footer=footer;
        this._header=header;
        this.bgColor=this._modSelector._bgColor;
        this.showMeta=false;
        this.btnColor=this._modSelector.btnColor;
        this._blog=this._modSelector.blog;
       
        this.mainInjection=_mainInjection;
        this.editSetup=new EditSetups(this._modSelector,this._service,this.displayBlog,this.flexbox,this._blog)
        this._pasteCode=new PasteCode(this._modSelector,this._service)
       
        
    }
    

    //GETTER SETTERS
    get user(){
        return this._user;
     };
     set user(user:userType){
         this._user=user;
     };

     get blog(){
        return this._modSelector.blog
    };
   
    //INJECTION : MainContainer
   async main({parent,textarea,mainHeader,footer,blog,user}:{
    parent:HTMLElement,
    textarea:HTMLElement,
    mainHeader:HTMLElement,
    footer:HTMLElement
    blog:blogType,
    user:userType|null

   }){
   
    let idValues=this._modSelector.dataset.idValues;
    const less900= window.innerWidth < 900;
    const less400= window.innerWidth < 400;

            parent.style.cssText=blog.cssText ? blog.cssText :this.css;
            
           
            if(blog){
                parent.id=blog.eleId as string;
                const eleId=blog.eleId as string;
                idValues.push({eleId,id:"blogId",attValue:eleId});
                Main.btnInitialize();
                //   console.log("parent",parent.style.cssText,parent.className) //works 
                parent.style.position="relative";
                parent.setAttribute("data-refreshed","true");
                parent.className=blog.class ? blog.class as string : "d-flex flex-column my-1";
                parent.style.cssText=blog.cssText ? blog.cssText + "width:100%;" : this.css;
                if(blog.attr==="linearGrad") idValues.push({eleId,id:"linearGrad",attValue:"linearGrad"});
                if(blog.imgBgKey){
                    //THIS INSERTS URL INTO BACKGROUND FOR LINEAR-GRAD AND SIMPLE BG STYLES
                    idValues.push({eleId,id:"backgroundImg",attValue:"backgroundImg"});
                   const {idValues:idVals,blog:retBlog}=this.appendBlogBgImgUrl({target:parent,blog,idValues});
                   idValues=[...idVals];
                   blog={...retBlog};
                //    this.blog=blog;
                    //THIS INSERTS URL INTO BACKGROUND FOR LINEAR-GRAD AND SIMPLE BG STYLES
                };
                const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                this._modSelector.dataset.simplePopulateAttributes({target:parent,idValues,popIdValues:getEleIds});
        
                   await this.bodyWork({parent,textarea,mainHeader,footer,blog,showMeta:false,less900,less400,idValues,user}); 
            
            }else{
                const {retParent,retBtn,container}=this.editSetup.saveNoBlogSetup(parent)
                retBtn.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        retParent.removeChild(container)
                    }
                });
            
            }
       
    this._modSelector.dataset.idValues=idValues;
    };


    appendBlogBgImgUrl({target,blog,idValues}:{target:HTMLElement,blog:blogType,idValues:idValueType[]}){
        console.log("HIT!!!");
        const eleId=target.id;
        const attr=blog.attr;
        const imgBgKey=blog?.imgBgKey;
        const background=target.style.background;
        const linearReg:RegExp=/(linear-gradient\()/;
        const URLReg:RegExp=/(url\()/;
        const isLinear=linearReg.test(background);
        const isUrl=URLReg.test(background);
        if(attr && imgBgKey){
            idValues.push({eleId,id:"imgBgKey",attValue:imgBgKey});
            idValues.push({eleId,id:"blogId",attValue:eleId});
            const url= this._service.getFreeBgImageUrl({imgKey:imgBgKey})
            if(isLinear && isUrl){
                idValues.push({eleId,id:"linearGrad",attValue:"linearGrad"});
             const {bg}=this.insertLinearBgUrl({background,url});
             if(bg){
                target.style.background=bg;
             }
            }else{
                console.log("here")
                idValues.push({eleId,id:"backgroundImg",attValue:"backgroundImg"});
                target.style.backgroundImage=`url(${url})`;
                blog={...blog,attr:"backgroundImg"};
            }
        };

        return {idValues,blog}

    };



    insertLinearBgUrl({background,url}:{background:string,url:string}):{bg:string|null}{
        //linear-gradient([a-z0-9.,]),url([a-z0-9,.])
        const linearReg:RegExp=/(linear-gradient\()/;
        const URLReg:RegExp=/(url\()/;
        const endReg:RegExp=/\),|\)\s,|\s\)\s,|\s\),/;
        const linstart=RegExp(linearReg).exec(background);
        const urlstart=RegExp(URLReg).exec(background);
        const len=background.length;
        
        if(linstart && urlstart){
            if(linstart.index < urlstart.index){
                const endPt=RegExp(endReg).exec(background);
                if(endPt){
                    const retained=background.slice(0,endPt.index +endPt[0].length);
                    const insert= `url(${url})` +  "," + retained;
                    return {bg:insert}
                }
            }else{
                const endPt=RegExp(endReg).exec(background);
                if(endPt){
                    const retained=background.slice(endPt.index + endPt[0].length,len-1);
                    const insert= `url(${url})` +  "," + retained;
                    return {bg:insert}
                }
            }

        }
        return {bg:null}

    };


    //PARENT: Injection Sidebar class
    async editViewUserBlogs({parent,mainCont,mainHeader,textarea,footer,idValues,less900,less400}:{
        parent:HTMLElement,
        mainCont:HTMLElement,
        mainHeader:HTMLElement,
        textarea:HTMLElement,
        footer:HTMLElement,
        idValues:idValueType[],
        less400:boolean,
        less900:boolean

    }){
        //get blogs per user_id: verifify if user={...user.email:"",id:""}
        parent=textarea || parent;
        parent.style.width="100%";
        const user_=this.user;
        const userEmailPlusUser_id=user_.id!=="" && user_.email!=="" ;
        const container=document.createElement("div");
        container.style.cssText="position:absolute; background:white;width:100%;border-radius:20px;box-shadow:1px 1px 12px 1px 10px;min-height:700px;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;padding:1rem;inset:0%;z-index:200 !important;backdrop-filter:blur(20px);";
        container.id="editViewUserBlogs";
        parent.appendChild(container);
        parent.animate([
            {opacity:"0"},
            {opacity:"1"}
        ],{duration:1000,iterations:1,"easing":"ease-in-out"});

        if(userEmailPlusUser_id){
            
           await this.retUserBlogs({parent,mainCont,mainHeader,textarea,footer,container,user_id:user_.id,idValues,less400,less900});
        }else{
           await this._regSignin.signIn();
        }
        parent.appendChild(container);
        Misc.matchMedia({parent,maxWidth:900,cssStyle:{width:"100%"}});
        Misc.fadeIn({anchor:container,xpos:50,ypos:100,time:600});
    };


    //PARENT:editViewUserBlogs()
   async retUserBlogs({parent,mainCont,mainHeader,textarea,footer,container,user_id,idValues,less400,less900}:{
    parent:HTMLElement,
    container:HTMLElement,
    mainCont:HTMLElement,
    textarea:HTMLElement,
    mainHeader:HTMLElement,
    footer:HTMLElement,
    user_id:string,
    idValues:idValueType[],
    less400:boolean,
    less900:boolean

   }){
        container.style.position="absolute";
        container.style.zIndex="200";
        const row=document.createElement("div");
        row.id="row-user-blogs";
        row.style.cssText="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;width:100%;";
        row.className="row";
        await this._service.userBlogs(user_id).then(async(blogs)=>{
            if(blogs && blogs.length>0){
                blogs=blogs.toSorted((a,b)=>{if(a.id-b.id) return -1;return 1});
                this._modSelector.blogs=blogs;
                container.appendChild(row);
                
                blogs.map(async(blog)=>{
                    const col=document.createElement("div");
                        col.className="col-md-4";
                       await this.blogCard({parent,mainCont,mainHeader,textarea,footer,container,row,col,blog,idValues,less400,less900});

                    });
                    //REMOVE BUTTON
                    const div=document.createElement("div");
                    div.style.cssText="width:80%;margin-block:1.5rem;margin-inline:auto;height:4px;background:rgb(8, 4, 249);";
                    container.appendChild(div);
                    const {button}=Misc.simpleButton({anchor:container,type:"button",bg:"green",color:"blue",text:"close",time:400});
                    button.onclick=(e:MouseEvent) =>{
                        if(e){
                            Misc.fadeOut({anchor:container,xpos:50,ypos:100,time:400});
                            setTimeout(()=>{parent.removeChild(container);},398);
                        }
                    };
                    //REMOVE BUTTON
               
            }else{ 
                Misc.message({parent:container,msg:"You have no blogs",type_:"error",time:1700});
                setTimeout(()=>{
                    container.remove();
                },1698);
            }
        });
    };



   //PARENT:retuserBlogs()
    async blogCard({parent,mainCont,textarea,mainHeader,footer,container,row,col,blog,idValues,less400,less900}:{
        parent:HTMLElement,
        container:HTMLElement,
        row:HTMLElement,
        col:HTMLElement,
        blog:blogType,
        idValues:idValueType[],
        mainCont:HTMLElement,
        textarea:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement,
        less400:boolean,
        less900:boolean
    }){
        const {user_id,id}=blog;
        const card=document.createElement("div");
        card.className="card";
        card.style.cssText="width:100%;padding:1rem;";
        const text=document.createElement("h6");
        text.className="text-primary lean display-6 mb-3 card-title text-center";
        text.textContent=blog.title ? blog.title : "no title";
        const img=document.createElement("img");
        img.style.cssText="max-width:175px; aspect-ratio: 1 / 1;border-radius:50%;box-shadow:1px 1px 12px 1px black,-1px -1px 12px -1px;blue;shape-outside:circle();margin-block:2rem; margin-right:1.75rem;float:left;";
        if(blog.imgKey){
            await this._service.getSimpleImg(blog.imgKey).then(async(res)=>{
                if(res){
                    img.src=res.img as string
                }
           });
        }else{

            img.src=this.logo;
        }
        img.alt=blog.name ? blog.name:"www.ablogroom.com";
        const desc=document.createElement("p");
        desc.style.cssText="margin-block:1.5rem;margin-inline:auto;";
        desc.appendChild(img);
        desc.innerHTML+=blog.desc ? blog.desc : `no filled blog description - ${Misc.wordGen(20)}`;
        card.appendChild(text);
        card.appendChild(desc);
        const div=document.createElement("div");
        div.className="card-body m-1";
        div.style.cssText="display:flex;flex-direction:row;flex-wrap:wrap;gap:1.5rem;";
        const {button:view}=Misc.simpleButton({anchor:div,type:"button",bg:Nav.btnColor,color:"white",text:"view",time:400});
        const {button:edit}=Misc.simpleButton({anchor:div,type:"button",bg:Nav.btnColor,color:"white",text:"edit",time:400});
        card.appendChild(div);
        col.appendChild(card);
        row.appendChild(col);
        view.onclick=(e:MouseEvent)=>{
            if(e){
                this._service.getUserBlog({user_id,blog_id:id}).then(async(resBlog)=>{
                    if(resBlog && resBlog as blogType){
                        const _blog={...resBlog as blogType};
                        this._modSelector.blog={..._blog, selectors:_blog.selectors,elements:_blog.elements,codes:_blog.codes};
                        this.viewBlog({parent,container,row,blog:_blog,idValues,mainCont,textarea,mainHeader,footer,less900,less400});
                    }else if(resBlog && resBlog as string){
                        const msg=resBlog as string
                        Misc.message({parent:container,msg,type_:"error",time:700})
                    }
                });
            }
        }
        edit.onclick=(e:MouseEvent)=>{
            if(e){
                this._service.getUserBlog({user_id,blog_id:id}).then(async(resBlog)=>{
                    if(resBlog && resBlog as blogType){
                        const _blog=resBlog as blogType;
                        const user=this.user;
                        this._modSelector.loadBlog({blog:_blog,user});
                        localStorage.setItem("user_id",user.id);
                        localStorage.setItem("email",user.email);
                        this.main({parent:mainCont,textarea,mainHeader,footer,blog:_blog,user});
                        container.remove();
                    }else if(resBlog && resBlog as string){
                        const msg=resBlog as string
                        Misc.message({parent:container,msg,type_:"error",time:700})
                    }
                });
            }
        };

    };



    //PARENT:blogCard()
    async viewBlog({parent,container,row,blog,mainCont,textarea,mainHeader,footer,idValues,less400,less900}:{
        parent:HTMLElement,
        container:HTMLElement,
        row:HTMLElement,
        blog:blogType,
        idValues:idValueType[],
        mainCont:HTMLElement,
        textarea:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement,
        less400:boolean,
        less900:boolean
    }){
        container.style.zIndex="";
        const arrDivPlaces:arrDivPlaceType[]=[];
        const innerContainer=document.createElement("div");
        innerContainer.style.cssText="width:100%;position:absolute;z-index:200;background:white;";
        await this.displayBlog.saveFinalWork({innerContainer,blog,idValues,arrDivPlaces:arrDivPlaces,less400,less900});
        const btnCont=document.createElement("div");
        btnCont.style.cssText="display:flex;flex-direction:row;padding-inline:margin;margin-block:1.5rem;gap:1.5rem;justify-content:space-around;align-items:center;";
        const {button:close}=Misc.simpleButton({anchor:btnCont,type:"button",bg:Nav.btnColor,color:"white",text:"close",time:400});
        const {button:edit}=Misc.simpleButton({anchor:btnCont,type:"button",bg:Nav.btnColor,color:"white",text:"edit",time:400});
        const {button:del}=Misc.simpleButton({anchor:btnCont,type:"button",bg:"#FFA500",color:"red",text:"delete",time:400});
        innerContainer.appendChild(btnCont);
        container.appendChild(innerContainer);
        Misc.growIn({anchor:innerContainer,scale:0,opacity:0,time:400});
        close.onclick=(e:MouseEvent) => {
            if(e){
                Misc.fadeOut({anchor:innerContainer,xpos:50,ypos:100,time:400});
                    setTimeout(()=>{
                        container.removeChild(innerContainer);
                        container.style.zIndex="200 !important";
                    },398);
            }
        };
        edit.onclick=(e:MouseEvent) => {
            if(e){
                this._modSelector.blog={} as blogType;
                this._modSelector.blog={...blog,eleId:parent.id};
                this._modSelector.selectors=blog.selectors;
                this._modSelector.elements=blog.elements;
                this._modSelector.selectCodes=blog.codes;
                this._modSelector.blog=blog;
                const maxCount=ModSelector.maxCount(blog);
                localStorage.setItem("placement",String(maxCount));
                localStorage.setItem("blog",JSON.stringify(this._modSelector.blog));
                const user=this.user;
                localStorage.setItem("user_id",user.id);
                localStorage.setItem("email",user.email);
                this.main({parent:mainCont,textarea,mainHeader,footer,blog,user});
                container.remove();
            }
        };
        del.onclick=(e:MouseEvent)=>{
            if(e){
                this.messageDelete({parent,container,innerContainer,row,blog,idValues,mainCont,textarea,mainHeader,footer,less400,less900});
            }
        };
    };

    messageDelete({parent,container,innerContainer,row,blog,idValues,mainCont,textarea,mainHeader,footer,less400,less900}:{
        parent:HTMLElement,
        container:HTMLElement,
        innerContainer:HTMLElement,
        row:HTMLElement,
        blog:blogType,
        idValues:idValueType[],
        mainCont:HTMLElement,
        textarea:HTMLElement,
        mainHeader:HTMLElement,
        footer:HTMLElement,
        less400:boolean,
        less900:boolean
    }){
        const popup=document.createElement("div");
        popup.style.cssText="positiion:absolute;inset:40%;background:white;box-shadow:1px 1px 12px 1px black;border-radius:12px;display:flex;justify-content:space-around;align-items:center;z-index:2000";
        popup.id="popup-messageDelete";
        popup.className="popup";
        innerContainer.appendChild(popup)
        const {button:delete_}=Misc.simpleButton({anchor:popup,bg:"#FFA500",color:"white",type:"button",time:400,text:"delete?"});
        const {button:cancel}=Misc.simpleButton({anchor:popup,bg:"#FFA500",color:"white",type:"button",time:400,text:"cancel"});
        delete_.onclick=async(e:MouseEvent)=>{
            if(e){
                
                await this._service.deleteBlog(blog).then(async(res)=>{
                    if(res){
                        Misc.message({parent:container,type_:"success",msg:"deleted",time:600});
                        Misc.growOut({anchor:innerContainer,scale:0,opacity:0,time:400});
                        setTimeout(()=>{container.removeChild(innerContainer);
                            container.style.position="absolute";
                            container.style.zIndex="200";
                        },398);
                        
                        this._modSelector.blogs.forEach((blog_,index)=>{
                            if(blog_ && blog_.id===blog.id ){
                                this._modSelector.blogs.splice(index,1);
                            }
                        });
                        const userBlogs=this._modSelector.blogs;
                        Header.cleanUp(row);
                        [...userBlogs].forEach(async(blog)=>{
                        const col=document.createElement("div");
                        col.className="col-md-4";
                        await this.blogCard({parent,container,row,col,blog,idValues,mainCont,textarea,mainHeader,footer,less400,less900});
    
                        });
                    }
                });
            }
        };
        cancel.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:innerContainer,scale:0,opacity:0,time:400});
                setTimeout(()=>{container.removeChild(innerContainer)},398);
            }
        };

    };


    async bodyWork({parent,blog,textarea,mainHeader,footer,showMeta,less900,less400,idValues,user}:{
        parent:HTMLElement,
        textarea:HTMLElement
        ,mainHeader:HTMLElement,
        footer:HTMLElement,
        blog:blogType,
        showMeta:boolean,
        less900:boolean,
        less400:boolean,
        idValues:idValueType[],
        user:userType|null

    }){
      
        const arrDivPlaces:arrDivPlaceType[]=[];
        //ADDING BACKGROUND////
        if(blog){
            const header:selectorType|undefined=blog?.selectors?.find(sel=>(sel.header===true));
            const footerSelect:selectorType|undefined=blog?.selectors?.find(sel=>(sel.footer===true));
            if(header) this._modSelector._header=header;
            if(footerSelect) this._modSelector._footer=footerSelect;

            //title description section

            const titleDesc=document.createElement("section");
            titleDesc.className="mx-auto px-3 my-3";
            titleDesc.style.cssText="display:flex;align-items:center;justify-content:center;flex-direction:column;margin-inline:auto;";
                if(blog.name && blog.desc && showMeta){
                    const title=document.createElement("h3");
                    title.textContent=blog.name;
                    title.style.cssText="text-align:center;margin-bottom:2rem;";
                    title.className="text-primary";
                    titleDesc.appendChild(title);
                    const desc=document.createElement("p");
                    desc.style.cssText="margin-block:1rem";
                    desc.className="px-md-2 ";
                    desc.textContent=blog.desc;
                    titleDesc.appendChild(desc);
                    separator(titleDesc,this.bgColor);
                    parent.appendChild(titleDesc);
                }
            //EDIT WILL BE DONE IN MAIN
            
            
                if(header && mainHeader){
                    Main.cleanUp(mainHeader);
                    if(header.headerType==="normal"){
                        this._header.showHdrSelector(mainHeader,header,idValues);
                    }
                    if(header.headerType==="custom"){
                        this.customHeader.showCustHdrSelector(mainHeader,header,true,idValues)
                    }
                }
              
                Header.cleanUp(textarea);
               
               await this.selEleGenerator({parent:textarea,blog,less900,less400,idValues,user});
                if(footerSelect && footer){
                    Main.cleanUp(footer);
                    await this._footer.showSelector({parent_:footer,selector:footerSelect,idValues,user});
                }
               
        
        }
       
    };


   async selEleGenerator( {parent,blog,less900,less400,idValues,user}:{
    parent:HTMLElement,
    blog:blogType|null,
    less900:boolean,
    less400:boolean,
    idValues:idValueType[],
    user:userType|null
    
   }):Promise<void>{
   
    if(blog){
        const arrDivPlaces:arrDivPlaceType[]=[];
            // Main.cleanUp(parent)
            const selects=blog?.selectors?.filter(select=>(!select.header)).filter(select=>(!select.footer));
            const selectSorts=selects?.toSorted((a,b)=>{if(a.placement < b.placement) return -1;return 1;});
            const elements=blog?.elements.toSorted((a,b)=>{if(a.placement < b.placement) return -1;return 1;});
            const charts=blog?.charts.toSorted((a,b)=>{if(a.placement < b.placement) return -1;return 1;});;
            const maxcount=ModSelector.maxCount(blog);
            // console.log("selEleGenerator:codes",blog.charts,"maxCount:",maxCount)//works
            
               await Promise.all(Array.from(Array(maxcount +2).keys()).map(async(num)=>{
                   const check=arrDivPlaces.find(item=>(item.id===num));
                   if(num > 0 && !check){
                        const select=selectSorts.find(sel=>(sel.placement ===num));
                        const ele=elements.find(el=>(el.placement===num));
                        const chart=charts.find(cht=>(cht.placement===num));
                        if(select){
                            const innerCont=await this.flexbox.showSelector(parent,select,idValues);
                            arrDivPlaces.push({id:num,divCont:innerCont,type:"selector",parent,displayClean:false,chart:null,element:null,selector:select,target:innerCont});
                        }else if(ele){
                            const div_cont=await this._htmlElement.showElement({parent,element:ele,idValues,selRowCol:null});
                            if (div_cont){
                                const {target,divCont,placement}=div_cont
                                arrDivPlaces.push({id:placement,divCont:divCont,parent,displayClean:false,type:"element",chart:null,element:ele,selector:null,target:target});

                            }else if(chart){
                                await this.chart.viewChart({parent,chart,idValues}).then(async(res)=>{
                                    if(res){
                                        arrDivPlaces.push({id:res.placement,divCont:res.divCont,parent,displayClean:false,type:"chart",chart,element:null,selector:null,target:res.target})
                                    };
                                });
                            };
                        };
                       
                    };
                })).catch((err)=>{const msg=getErrorMessage(err);console.log(msg)});
                const arrPlaces=this.removeDuplications({arr:arrDivPlaces});
                arrPlaces.toSorted((a,b)=>{if(a.id <b.id) return -1;return 1}).forEach((item,index)=>{
                    
                    if(item?.divCont){
                        parent.appendChild(item.divCont);
                       

                    }
                    
                });

        }
   
    };


    
    removeDuplications({arr}:{arr:arrDivPlaceType[]}){
        const newSet= new Set();
        const newArr:arrDivPlaceType[]=[]
        arr.map(kv=>(newSet.add(kv.id)));
        Array.from(newSet).map(kv=>{
            const check=arr.find(kat=>(kat.id===kv));
            if(check){
                newArr.push(check)
            }
        });
        return newArr
    };


    async sleep(item:{func:()=>Promise<void>,time:number}){
            const {func,time}=item;
            return new Promise(resolver=>{
                setTimeout(()=>{return resolver(func)},time)
            }) as Promise<()=>Promise<void>>;
    };

   
   static cleanUpByID(parent:HTMLElement,id:string){
    ([...parent.children as any] as HTMLElement[]).forEach(child=>{
        if(child && child.id===id){
            parent.removeChild(child);
        }else if(child){
            ([...child.children as any] as HTMLElement[]).forEach(ch=>{
                if(ch && ch.id===id){
                    child.removeChild(ch);

                }
            });
        }
    });
   }
   static cleanUpByClass(parent:HTMLElement,cl:string){
    ([...parent.children as any] as HTMLElement[]).forEach(child=>{
        const check=([...child.classList as any] as string[]).includes(cl);
        if(child && check){
            parent.removeChild(child);
        }else if(child){
            ([...child.children as any] as HTMLElement[]).forEach(ch=>{
                const check=([...ch.classList as any] as string[]).includes(cl);
                if(ch && check){
                    child.removeChild(ch);

                }
            });
        }
    });
   }
   static isBackgroundImage(target:HTMLElement){
        if(!target) return false;
        for( const [key,value] of Object.entries(target.style)){
            if(key==="backgroundImage" && value.startsWith("url(")){
                return true
            }
        }
        return false
   }
    
   
};

export default Edit;

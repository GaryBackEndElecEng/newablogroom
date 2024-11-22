import {flexType,elementType,selectorType,element_selType,codeType,blogType, chartType,} from "./Types";
import ModSelector from "@/components/editor/modSelector";
import DisplayBlog, {separator} from "@/components/blog/displayBlog";
import Header from "@/components/editor/header";
import { FaCreate } from "../common/ReactIcons";
import { FaCrosshairs } from "react-icons/fa";
import Misc, {btnOptionMsgType, btnOptionType, btnOptionType2,msgType} from "@/components/common/misc";
import Main from "@/components/editor/main";
import { buttonReturn,btnReturnType } from "../common/tsFunctions";
import User from "../user/userMain";
import Footer from "@/components/editor/footer";
import Service from "@/components/common/services";
import { getErrorMessage } from "@/lib/errorBoundaries";
import CustomHeader from "./customHeader";
import AuthService from "../common/auth";
import Flexbox from "./flexBox";
import HtmlElement from "./htmlElement";
import ShapeOutside from "./shapeOutside";
import Nav from "../nav/headerNav";
import RegSignIn from "../nav/regSignin";
import NewCode from "./newCode";
import ChartJS from "../chart/chartJS";

class EditSetups{
    bgColor:string;
    btnColor:string;
    displayBlog:DisplayBlog;
    flexbox:Flexbox;

    constructor(private _modSelector:ModSelector,private _service:Service,public _displayBlog:DisplayBlog,public flexBox:Flexbox){
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.displayBlog=_displayBlog;
        this.flexbox=flexBox;
    }
    blogDescSetup(parent:HTMLElement,blog:blogType): {cont:HTMLElement,image:HTMLImageElement,desc:HTMLElement,title:HTMLElement}{
        const blogDesc=blog && blog.desc ? blog.desc : "";
        const blogImg=blog && (blog.imgKey && blog.img) ? blog.img : "/images/gb_logo.png";
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
        this._modSelector.editElement(desc);
        parent.appendChild(cont);
        return {image:img,desc,cont,title};
    }
   
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
    }
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
        einput.pattern="[a-zA-Z0-9\.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}";
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
    }
    saveOption(parent:HTMLElement):{cancelBtn:HTMLButtonElement,saveBtn:HTMLButtonElement,container:HTMLElement}{
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
        const {btn1,btn2,container}= Misc.btnOptionMessagePopup(parent,options);
        return {cancelBtn:btn1,saveBtn:btn2,container}
    }


}

class Edit {
    logo:string="./images/gb_logo.png";
    url:string="http://localhost:3000/api/blog";
    urlUpload:string="http://localhost:3000/api/uploadImage";
    bgColor:string;
    showMeta:boolean;
    btnColor:string;
    _modSelector:ModSelector;
    mainInjection:HTMLElement | null;
    _header:Header;
    _footer:Footer;
    flex:flexType;
    editSetup:EditSetups;
    flexbox:Flexbox;
    _regSignin:RegSignIn;
    css:string="min-height:100vh;height:auto;box-shadow:1px 1px 12px 2px black;border-radius:10px;padding-inline:0px;padding-block:0px;margin:0px;z-index:0;position:relative;width:100%;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:1rem;";
  
    constructor(public modSelector:ModSelector,private _service:Service,public _mainInjection:HTMLElement | null,private _user:User,public _flexbox:Flexbox,public _htmlElement:HtmlElement,public header:Header, public customHeader:CustomHeader,public footer:Footer,public displayBlog:DisplayBlog,private _code:NewCode,public chart:ChartJS,private _shapeOutside:ShapeOutside){
        this._modSelector=modSelector;
        this.flexbox=_flexbox;
        this._footer=footer;
        this._header=header;
        this.bgColor=this._modSelector._bgColor;
        this.showMeta=false;
        this.btnColor=this._modSelector.btnColor;
        this._regSignin=new RegSignIn(this._modSelector,this._service,this._user)
        // this._main=main;
        this.mainInjection=_mainInjection;
        this.flex={} as flexType;
        this.editSetup=new EditSetups(this._modSelector,this._service,this.displayBlog,this.flexbox)
        
       
        
    }
    

    //GETTER SETTERS
    get element(){
        return this._modSelector._element;
    }
    set element(ele:elementType){
        this._modSelector._element=ele;
    }
    get elements(){
        return this._modSelector._elements;
    }
    set elements(eles:elementType[]){
        this._modSelector._elements=eles;
    }
    get codes(){
        return this._modSelector._codes;
    }
    set codes(codes:codeType[]){
        this._modSelector._codes=codes;
    }
    get selector(){
        return this._modSelector._selector;
    }
    set selector(selector:selectorType){
        this._modSelector._selector=selector;
    }
    get selectors(){
        return this._modSelector._selectors;
    }
    set selectors(selectors:selectorType[]){
        this._modSelector._selectors=selectors;
    }
    set blog(blog:blogType){
        this._modSelector._blog=blog;
        this._modSelector.blog=this._modSelector._blog;
    }
    get blog(){
        return this._modSelector._blog;
    }
   
    //GETTER SETTERS
    //INJECTION : MainContainer
   async main(parent:HTMLElement|null,blog:blogType){
        if(parent){
            parent.style.cssText=blog.cssText ? blog.cssText :this.css;
            // console.log(blog)
            if(blog){
                this._modSelector._blog={...blog};
                Main.btnInitialize();
                //   console.log("parent",parent.style.cssText,parent.className) //works 
                parent.style.position="relative";
                parent.setAttribute("data-refreshed","true");
                parent.className=blog.class ? blog.class as string : "d-flex flex-column my-1";
                parent.style.cssText=blog.cssText as string;
                if(blog.imgBgKey){
                    parent.setAttribute("data-backgroundimage","true");
                   await this._service.getSimpleImg(blog.imgBgKey).then(async(res)=>{
                        if(res && res.Key){
                            parent.style.backgroundImage=`url(${res.img})`;
                            parent.style.backgroundSize="100% 100%";
                            parent.style.backgroundPosition="50% 50%";
                        }
                    });
                }
                   await this.bodyWork(parent,blog,false); 
            
            }else{
                const {retParent,retBtn,container}=this.editSetup.saveNoBlogSetup(parent)
                retBtn.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        retParent.removeChild(container)
                    }
                });
            
            }
        }
        
    };
    //PARENT: Injection Sidebar class
    async editViewUserBlogs(parent:HTMLElement){
        //get blogs per user_id: verifify if user={...user.email:"",id:""}
        const textarea=document.querySelector("div#textarea") as HTMLElement;
            if(!textarea) return;
        parent=textarea;
        parent.style.width="100%";
        const user_=this._user.user;
        const userEmailPlusUser_id=user_ && user_.id && user_.email ? true : false;
        const container=document.createElement("div");
        container.style.cssText="position:absolute; background:white;width:100%;border-radius:20px;box-shadow:1px 1px 12px 1px 10px;min-height:700px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:1rem;inset:0%;z-index:200 !important;backdrop-filter:blur(20px);";
        container.id="editViewUserBlogs";
        parent.appendChild(container);

        if(userEmailPlusUser_id){
            
           await this.retUserBlogs(parent,container,user_.id);
        }else{
           await this._regSignin.signIn();
        }
        parent.appendChild(container);
        Misc.matchMedia({parent,maxWidth:900,cssStyle:{width:"100%"}});
        Misc.fadeIn({anchor:container,xpos:50,ypos:100,time:600});
    }
    //PARENT:editViewUserBlogs()
   async retUserBlogs(parent:HTMLElement,container:HTMLElement,user_id:string){
        container.style.position="absolute";
        container.style.zIndex="200";
        const row=document.createElement("div");
        row.id="row-user-blogs";
        row.style.cssText="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;width:100%;";
        row.className="row";
        await this._service.userBlogs(user_id).then(async(blogs)=>{
            if(blogs && blogs.length>0){
                this._modSelector.blogs=blogs;
                container.appendChild(row);
                
                blogs.map(async(blog)=>{
                    const col=document.createElement("div");
                        col.className="col-md-4";
                       await this.blogCard(parent,container,row,col,blog);

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
    }
   //PARENT:retuserBlogs()
    async blogCard(parent:HTMLElement,container:HTMLElement,row:HTMLElement,col:HTMLElement,blog:blogType){
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
                this._service.getUserBlog({user_id:blog.user_id,blog_id:blog.id}).then(async(resBlog)=>{
                    if(resBlog && resBlog as blogType){
                        const _blog={...resBlog as blogType};
                        this._modSelector._blog={..._blog, selectors:_blog.selectors,elements:_blog.elements,codes:_blog.codes};
                        this._modSelector.blog=this._modSelector._blog;
                        this.viewBlog(parent,container,row,_blog);
                    }else if(resBlog && resBlog as string){
                        const msg=resBlog as string
                        Misc.message({parent:container,msg,type_:"error",time:700})
                    }
                });
            }
        }
        edit.onclick=(e:MouseEvent)=>{
            if(e){
                this._service.getUserBlog({user_id:blog.user_id,blog_id:blog.id}).then(async(resBlog)=>{
                    if(resBlog && resBlog as blogType){
                        const _blog=resBlog as blogType;
                        this._modSelector._blog={} as blogType;
                        this._modSelector._blog={..._blog,eleId:parent.id};
                        this._modSelector.selectors=_blog.selectors;
                        this._modSelector.elements=_blog.elements;
                        this._modSelector.selectCodes=_blog.codes;
                        this._modSelector.blog=_blog;
                        this.codes=_blog.codes;
                        const maxCount=ModSelector.maxCount(_blog);
                        localStorage.setItem("placement",String(maxCount));
                        localStorage.setItem("blog",JSON.stringify(this._modSelector._blog));
                        const user=this._user.user;
                        localStorage.setItem("user_id",user.id);
                        localStorage.setItem("email",user.email);
                        this.main(Main.container as HTMLElement,_blog);
                        container.remove();
                    }else if(resBlog && resBlog as string){
                        const msg=resBlog as string
                        Misc.message({parent:container,msg,type_:"error",time:700})
                    }
                });
            }
        };

    }
    //PARENT:blogCard()
    async viewBlog(parent:HTMLElement,container:HTMLElement,row:HTMLElement,blog:blogType){
        container.style.zIndex="";
        const innerContainer=document.createElement("div");
        innerContainer.style.cssText="width:100%;position:absolute;z-index:200;background:white;";
        await this.displayBlog.saveFinalWork({outerContainer:parent,innerContainer,blog});
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
                this._modSelector._blog={} as blogType;
                this._modSelector._blog={...blog,eleId:parent.id};
                this._modSelector.selectors=blog.selectors;
                this._modSelector.elements=blog.elements;
                this._modSelector.selectCodes=blog.codes;
                this._modSelector.blog=blog;
                this.codes=blog.codes;
                const maxCount=ModSelector.maxCount(blog);
                localStorage.setItem("placement",String(maxCount));
                localStorage.setItem("blog",JSON.stringify(this._modSelector._blog));
                const user=this._user.user;
                localStorage.setItem("user_id",user.id);
                localStorage.setItem("email",user.email);
                this.main(Main.container as HTMLElement,blog);
                container.remove();
            }
        };
        del.onclick=(e:MouseEvent)=>{
            if(e){
                this.messageDelete(parent,container,innerContainer,row,blog)
            }
        };
    }
    messageDelete(parent:HTMLElement,container:HTMLElement,innerContainer:HTMLElement,row:HTMLElement,blog:blogType){
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
                        // console.log("BEFORE",this._modSelector._blogs);//works
                        this._modSelector._blogs.map((blog_,index)=>{
                            if(blog_ && blog_.id===blog.id ){
                                this._modSelector._blogs.splice(index,1);
                            }
                        });
                        const userBlogs=this._modSelector._blogs;
                        Header.cleanUp(row);
                        userBlogs.map((blog)=>{
                            const col=document.createElement("div");
                            col.className="col-md-4";
                            this.blogCard(parent,container,row,col,blog);
    
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

    }
    async bodyWork(parent:HTMLElement,blog:blogType,showMeta:boolean){
        this._modSelector.blog={...blog};
        //ADDING BACKGROUND////
        if(blog){
            const header:selectorType|undefined=blog.selectors && blog.selectors.find(sel=>(sel.header===true));
            const footer:selectorType|undefined=blog.selectors && blog.selectors.find(sel=>(sel.footer===true));
            if(header) this._modSelector.header=header;
            if(footer) this._modSelector.footer=footer;

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
            
            
                if(header && Main._mainHeader){
                    Main.cleanUp(Main._mainHeader as HTMLElement);
                    if(header.headerType==="normal"){
                        this._header.showHdrSelector(Main._mainHeader as HTMLElement,this._modSelector.header);
                    }
                    if(header.headerType==="custom"){
                        // console.log("log",header.headerType,"custom");
                        this.customHeader.showCustHdrSelector(Main._mainHeader as HTMLElement,this._modSelector.header,true)
                    }
                }
                blog={...this._modSelector.blog}
               await this.selEleGenerator(Main.textarea as HTMLElement,blog);
                if(footer && Main._mainFooter){
                    Main.cleanUp(Main._mainFooter as HTMLElement);
                    await this._footer.showSelector(Main._mainFooter as HTMLElement,this._modSelector.footer);
                }
        
        }
       
    };
   async selEleGenerator(parent:HTMLElement,blog:blogType|null){
        if(blog){
            Main.cleanUp(parent)
            const elements=blog.elements && blog.elements.length>0 ? blog.elements as elementType[] :null;
            const selects=(blog.selectors && blog.selectors.length) ? blog.selectors as selectorType[]: null;
            const cleanSels=selects ? selects.filter(sel=>(sel.header===false)).filter(sel=>(sel.footer===false)): null
            const codes=blog.codes && blog.codes.length>0 ? blog.codes as codeType[] :null;
            const charts=blog.charts && blog.charts.length>0 ? blog.charts as chartType[] :null;
            const maxCount=ModSelector.maxCount(blog);
            ShapeOutside.cleanUpByID(parent,"setAttributes");
            ShapeOutside.cleanUpByID(parent,"popup");
            // console.log("selEleGenerator:codes",blog.charts,"maxCount:",maxCount)//works
                if(!(maxCount>0)) return
                const arrMax:number[]=Array.from(Array(maxCount + 1).keys());
                await Promise.all(arrMax.map(async(num)=>{
                    if(cleanSels){
                        const select=cleanSels.find(sel=>(sel.placement===num+1));
                        if(select){
                            await this.flexbox.showSelector(parent,select);
                        }
                    }

                    if(elements){
                        const element=elements.find(ele=>(ele.placement===num+1));
                        if(element){
                            await this._htmlElement.showElement(parent,element);
                        }
                    }
                    if(codes){
                        const code=codes.find(cde=>(cde.placement===num+1));
                        if(code){
                            await this._code.showCode({parent,selectCode:code});
                        }
                    }
                    if(charts){
                        const chart=charts.find(cht=>(cht.placement===num+1));
                        if(chart){
                            await this.chart.viewChart({parent,chart});
                        }
                    }
                }));
                    
                    
             
            
        }
    }
    
    //PARENT SORTELESELECTOR()
    async showSelector(parent:HTMLElement,selector:selectorType){
        let flex:flexType={} as flexType;
        // console.log("Header selector",selector)//works
        if(selector && selector.name){
            const innerCont=document.createElement(selector.name);
            innerCont.id=selector.eleId;
            innerCont.className=selector.class;
            innerCont.setAttribute("name",selector.name);
            innerCont.setAttribute("data-selector-id",`${selector.id}`);
                innerCont.setAttribute("data-container-id",`${innerCont.id}`);
            innerCont.setAttribute("data-selector-id",selector.eleId);
            innerCont.style.cssText=selector.cssText;
            flex={...flex,selectorId:selector.eleId,placement:selector.placement}
                await Promise.all(selector.rows.map(async(row_)=>{
                    const row=document.createElement("div");
                    row.className=row_.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                    row.style.cssText=row_.cssText;
                    row.setAttribute("name",row_.name);
                    row.setAttribute("rowID",`${row_.id}`);
                    row.id=row_.eleId;
                    flex={...flex,rowId:row_.eleId};
                    innerCont.appendChild(row);
                    if(row_.imgKey){
                        flex={...flex,imgKey:row_.imgKey}
                        row.setAttribute("data-backgroundimage","true");
                        const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                       await this._service.injectBgAwsImage({target:row,imgKey:row_.imgKey,cssStyle});
                    }
                    row.setAttribute("flex",JSON.stringify(flex));
                   await Promise.all(row_.cols && row_.cols.map(async(col_)=>{
                        const col=document.createElement("div");
                        col.id=col_.eleId;
                        col.setAttribute("colID",`${col_.id}`);
                        col.style.cssText=`${col_.cssText}`;
                        col.className=col_.class;
                        flex={...flex,rowId:row_.eleId,colId:col_.eleId};
                        row.appendChild(col);
                        if(col_.imgKey){
                            flex={...flex,imgKey:col_.imgKey};
                            col.setAttribute("data-backgroundimage","true");
                            const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                           await this._service.injectBgAwsImage({target:row,imgKey:col_.imgKey,cssStyle});
                        }
                        col.setAttribute("flex",JSON.stringify(flex));
                        this._flexbox.genChoice(col,flex);
                        col.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                flex={...flex,colId:col_.eleId}
                                col.classList.toggle("coliIsActive");
                                this._modSelector.updateColumn(col,flex);
                                if(selector.footer){
                                    //new elements and attr(s)
                                    this._footer.selectElements({column:col});
                                }
                            }
                        });
                        await Promise.all(col_.elements && col_.elements.sort((a,b)=>{if(a.id < b.id) return -1 ; return 1}).map(async (element)=>{
                            const checkArr=["img","ul","blockquote","a","span","logo","image"].includes(element.name);
                            const divCont=document.createElement("div");
                            divCont.style.cssText="margin-block:auto;padding:3px;";
                            divCont.className="eleContainer";
                            divCont.setAttribute("data-placement",`${element.order}`);
                            // if(element.name==="span") this._modSelector.removeUnwanted(element.name)
                            if(!checkArr){
                                const ele:HTMLElement=document.createElement(element.name);
                                ele.setAttribute("is-element","true");
                                ele.setAttribute("contenteditable","true");
                                ele.setAttribute("aria-selected","true");
                                ele.setAttribute("name",element.name);
                                ele.className=element.class;
                                ele.setAttribute("name",element.name);
                                flex={...flex,elementId:element.eleId,name:element.name,imgKey:element.imgKey}
                                const {elementId}=flex as flexType;
                                ele.id=elementId as string;;
                                ele.style.cssText=element.cssText;
                                ele.innerHTML=element.inner_html;
                                divCont.appendChild(ele);
                                col.appendChild(divCont);
                                if(element.attr==="data-backgroundImage" && element.imgKey){
                                    ShapeOutside.cleanUpByID(parent,"popup");
                                    ele.setAttribute("data-backgroundImage","true");
                                    flex={...flex,backgroundImage:true,imgKey:element.imgKey};
                                    const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                                    this._service.injectBgAwsImage({target:ele,imgKey:element.imgKey,cssStyle});
                                }else if(element.attr==="data-shapeOutside-circle" && element.imgKey){
                                    flex={...flex,shapeOutsideCircle:true,imgKey:element.imgKey};
                                    ele.setAttribute("data-shapeOutside-circle","true");
                                    await this._shapeOutside.shapeOutsideInjectImage({para:ele,imgKey:element.imgKey});
                                }else if(element.attr==="data-shapeOutside-square" && element.imgKey){
                                    flex={...flex,shapeOutsideCircle:true,imgKey:element.imgKey};
                                    ele.setAttribute("data-shapeOutside-square","true");
                                    await this._shapeOutside.shapeOutsideInjectImage({para:ele,imgKey:element.imgKey});
                                }else if(element.attr==="data-shapeOutside-polygon" && element.imgKey){
                                    ele.setAttribute("data-shapeOutside-polygon","true")
                                    flex={...flex,shapeOutsidePolygon:true,imgKey:element.imgKey};
                                    await this._shapeOutside.shapeOutsideInjectImage({para:ele,imgKey:element.imgKey});
                                }
                                ele.setAttribute("flex",JSON.stringify(flex));
                                Main.toggleActiveIcon(ele);
                                ele.addEventListener("click",(e:MouseEvent) =>{
                                    if(e){
                                        ele.classList.toggle("isActive");
                                        this._modSelector.updateElement(ele);
                                        this._modSelector.showRemoveItem(parent,divCont,ele);
                                    }
                                });
                                this._modSelector.editElement(ele);
                                
                            }else if(element.name==="ul"){
                                const ele=document.createElement("ul");
                                ele.setAttribute("is-element","true");
                                ele.setAttribute("contenteditable","true");
                                ele.setAttribute("aria-selected","true");
                                ele.setAttribute("name",element.name);
                                ele.className=element.class;
                                ele.classList.remove("isActive");
                                ele.style.cssText=element.cssText;
                                ele.innerHTML=element.inner_html;
                                divCont.appendChild(ele);
                                col.appendChild(divCont);
                                Main.toggleActiveIcon(ele);
                                flex={...flex,elementId:element.eleId,name:element.name};
                                const {elementId} = flex as flexType;
                                ele.id=elementId as string;
                                ele.setAttribute("name",element.name);
                                ele.setAttribute("flex",JSON.stringify(flex));
                                ele.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        ele.classList.toggle("isActive");
                                        this._modSelector.updateElement(ele);
                                        this._modSelector.showRemoveItem(parent,divCont,ele);
                                    }
                                });
                                this._modSelector.editElement(ele);
                            }else if(element.name==="blockquote"){
                                const ele=document.createElement("blockquote");
                                ele.setAttribute("is-element","true");
                                ele.setAttribute("contenteditable","true");
                                ele.setAttribute("aria-selected","true");
                                ele.className=element.class;
                                ele.classList.remove("isActive");
                                ele.style.cssText=element.cssText;
                                ele.innerHTML=element.inner_html;
                                divCont.appendChild(ele);
                                col.appendChild(divCont);
                                Main.toggleActiveIcon(ele);
                                ele.setAttribute("name",element.name);
                                flex={...flex,elementId:element.eleId,name:element.name};
                                const {elementId}=flex as flexType;
                                ele.id=elementId as string;
                                ele.setAttribute("name",element.name);
                                ele.setAttribute("flex",JSON.stringify(flex));
                                ele.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        ele.classList.toggle("isActive");
                                        this._modSelector.updateElement(ele);
                                        this._modSelector.showRemoveItem(parent,divCont,ele);
                                    }
                                });
                                this._modSelector.editElement(ele);
                            }else if(element.name==="a"){
                                const {container}=this._header.appendCont(col);
                                container.setAttribute("data-placement",`${element.order}`)
                                const link=element.attr as string;
                                const ele=document.createElement("a");
                                ele.setAttribute("is-element","true");
                                ele.setAttribute("contenteditable","true");
                                ele.setAttribute("aria-selected","true");
                                ele.className=element.class;
                                flex={...flex,elementId:element.eleId,name:element.name};
                                ele.setAttribute("name",element.name);
                                const {elementId}=flex as flexType;
                                ele.id=elementId as string;
                                ele.setAttribute("name",element.name);
                                ele.setAttribute("flex",JSON.stringify(flex));
                                ele.style.cssText=element.cssText;
                                ele.innerHTML=element.inner_html;
                                ele.href="#";
                                ele.onclick=()=>{return window.open(link,"_blank")};
                                Main.toggleActiveIcon(ele);
                                container.appendChild(ele);
                                this._modSelector.showRemoveItem(parent,container,ele);
                            }else if(element.name==="logo"){
                                flex={...flex,elementId:element.eleId,name:element.name,imgKey:element.imgKey};
                                const ele=document.createElement("img");
                                ele.setAttribute("is-element","true");
                                ele.setAttribute("contenteditable","true");
                                ele.setAttribute("aria-selected","true");
                                ele.setAttribute("name",element.name);
                                ele.className=element.class;
                                ele.src=element.img as string;
                                const {elementId}=flex as flexType;
                                ele.id=elementId as string;
                                ele.setAttribute("name",element.name);
                                ele.setAttribute("flex",JSON.stringify(flex));
                                ele.style.cssText=element.cssText;
                                ele.alt=element.inner_html;
                                divCont.style.cssText="margin:1rem;width:100px;height:100px;position:relative;position:relative;";
                                divCont.appendChild(ele);
                                col.appendChild(divCont);
                                if(element.imgKey){
                                    this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                                        if(res){
                                            ele.src=res.img as string;

                                        }
                                   });
                                   ele.setAttribute("flex",JSON.stringify(flex));
                                }
                                Main.toggleActiveIcon(ele);
                                this._user.refreshImageShow(divCont,ele,null,flex);
                                ele.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        ele.classList.toggle("isActive");
                                        this._modSelector.updateElement(ele);
                                        this._modSelector.showRemoveItem(parent,divCont,ele);
                                    }
                                });
                            }else if(element.name==="image"){
                                // const link=element.attr as string;
                                const ele=document.createElement("img");
                                ele.setAttribute("is-element","true");
                                ele.setAttribute("contenteditable","true");
                                ele.setAttribute("aria-selected","true");
                                ele.setAttribute("name",element.name);
                                ele.className=element.class;
                                ele.src=element.img as string;
                                flex={...flex,elementId:element.eleId,name:element.name,imgKey:element.imgKey};
                                const {elementId}= flex as flexType;
                                ele.id=elementId as string;
                                ele.setAttribute("name",element.name);
                                ele.setAttribute("flex",JSON.stringify(flex));
                                ele.style.cssText=element.cssText;
                                ele.alt=element.inner_html;
                                divCont.style.cssText="margin:1rem;width:100px;height:100px;position:relative;"
                                divCont.appendChild(ele);
                                col.appendChild(divCont);
                                if(element.imgKey){
                                    this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                                        if(res){
                                            ele.src=res.img as string;

                                        }
                                   });
                                   ele.setAttribute("flex",JSON.stringify(flex));
                                }
                                // this._user.refreshImageShow(divCont,ele,null,flex);
                                ele.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        ele.classList.toggle("isActive");
                                        Main.toggleActiveIcon(ele);
                                        this._modSelector.updateElement(ele);
                                        this._modSelector.showRemoveItem(parent,divCont,ele);
                                    }
                                });
                            }else if(element.name==="img" ){
                                flex={...flex,elementId:element.eleId,name:element.name,imgKey:element.imgKey};
                                const ele:HTMLImageElement=document.createElement(element.name);
                                ele.setAttribute("is-element","true");
                                ele.setAttribute("contenteditable","true");
                                ele.setAttribute("aria-selected","true");
                                ele.setAttribute("name",element.name);
                                divCont.style.cssText="position:relative;max-width:100% !important;display:flex;flex-direction:column;jusify-content:center;align-items:center;padding:0.5rem;";
                                ele.className=element.class;
                                flex={...flex,elementId:element.eleId,name:element.name};
                                this._user.refreshImageShow(divCont,ele,null,flex);
                                const {elementId}=flex as flexType;
                                ele.id=elementId as string;
                                ele.setAttribute("flex",JSON.stringify(flex));
                                ele.style.cssText=element.cssText;
                                ele.src=element.img as string;
                                ele.alt=element.inner_html;
                                ele.setAttribute("flex",JSON.stringify(flex));
                                divCont.appendChild(ele);
                                col.appendChild(divCont);
                                if(element.imgKey){
                                    await this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                                        if(res){
                                            ele.src=res.img as string;
                
                                        }
                                   });
                                }
                                ele.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        ele.classList.toggle("isActive");
                                        Main.toggleActiveIcon(ele);
                                        this._modSelector.updateElement(ele);
                                        this._modSelector.showRemoveItem(parent,divCont,ele);
                                    }
                                });
                            }

                        }));
                        // row.appendChild(col);
                    }));
                    
                    // console.log(innerCont)//works
                }));
                this._modSelector.removeHeader(parent,innerCont);
            parent.appendChild(innerCont);
        }
    };
    //PARENT SORTELESELECTOR()
    async showElement(parent:HTMLElement,element:elementType){
        const divCont=document.createElement("div");
        divCont.className="eleContainer";
        divCont.style.cssText="margin-block:auto;padding:3px;";
        divCont.setAttribute("data-placement",`${element.placement}`);
        const ele=document.createElement(element.name);
        ele.setAttribute("name",element.name);
        ele.setAttribute("is-element","true");
        ele.classList.remove("isActive");
        ele.id=element.eleId;
        ele.className=element.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
        // console.log("768:modSelector:element className",ele.className);
        ele.classList.toggle("isActive");
        ele.style.cssText=`${element.cssText}`;
        const checkEle=["p","h1","h2","h3","h4","h5","h6","div","blockquote","ul","hr"].includes(element.name);
        // console.log(element.name,checkEle)//works
        switch(true){
            case checkEle:
                // console.log("Paragraph: ",element.inner_html)
                ele.innerHTML=element.inner_html;
                ele.setAttribute("contenteditable","true");
                ele.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        ele.classList.toggle("isActive");
                        divCont.classList.toggle("isActive");
                        if(ModSelector.isActive(ele)){
                            this._modSelector.showRemoveItem(parent,divCont,ele);
                            }
                    }
                });
                divCont.appendChild(ele);
                parent.appendChild(divCont);
                this._modSelector.editElement(ele);
            return;
            case element.name==="img":
                divCont.style.cssText="padding:1rem;position:relative;";
                const image=ele as HTMLImageElement;
                image.alt=element.inner_html;
                image.setAttribute("is-element","true");
                image.src=element.img as string;
                image.style.cssText=`${element.cssText}aspect-ratio: 1 / 1;`;
                divCont.appendChild(image);
                parent.appendChild(divCont);
                if(element.imgKey){
                    await this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                        if(res){
                            image.src=res.img as string;

                        }
                   });
                   image.setAttribute("imgKey",element.imgKey);
                }
                image.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        divCont.classList.toggle("isActive");
                        if(ModSelector.isActive(divCont)){
                        this._modSelector.showRemoveItem(parent,divCont,image);
                        }
                    }
                });
                // this._user.refreshImageShow(divCont,image,null,null);
            return;
            case element.name==="time":
                ele.innerHTML=element.inner_html;
                ele.setAttribute("datetime",`${element.inner_html}`)
                divCont.appendChild(ele);
                parent.appendChild(divCont);
                const par=ele.parentElement as HTMLElement;
                ele.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        par.classList.toggle("isActive");
                        if(ModSelector.isActive(ele)){
                            this._modSelector.showRemoveItem(parent,divCont,ele);
                            }
                    }
                });
               
            return;
            case element.name==="a":
                const link=element.attr as string;
                ele.innerHTML=element.inner_html;
                (ele as HTMLAnchorElement).href="#";
                ele.onclick=()=>{return window.open(link,"_blank")};
                divCont.appendChild(ele);
                parent.appendChild(divCont);
                const par1=ele.parentElement as HTMLElement;
                ele.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        par1.classList.toggle("isActive");
                        divCont.classList.toggle("isActive");
                        if(ModSelector.isActive(par1)){
                            this._modSelector.showRemoveItem(parent,divCont,par1);
                            }
                    }
                });
            return;
            default:
                return;
        }
        
    };
   
    
    sendMessage(parent:HTMLElement,msg:string,type_:"warning"|"success"|"error",time:number){
        const Msg:msgType={
            parent,
            msg,
            type_,
            time

        }
        Misc.message(Msg);
    }
    async saveRecord(parent:HTMLElement,blog:blogType){
        //parent==container
        if(blog.user_id){
        return this._user.saveBlog(parent,blog).then(async(blog_)=>{
            if(blog_){
                this._modSelector.blog=blog_;
                return blog_;
            }

        }); 
        }else{
        return this._user.signInBlogForm(parent,blog);  
        } 
    }
   
    getFlexElement(target:HTMLElement,flex:flexType|null):elementType|element_selType | undefined{
        const blog=this.blog;
        let ele_={} as elementType|element_selType|undefined;
        if(flex && target && blog){
            ele_=ele_ as element_selType;
            const children=[...target.children as any] as HTMLElement[];
            const {selectorId,rowId,colId,elementId}=flex;
            const checkEle=children.map(ele=>(ele.id)).includes(elementId as string)
            const checkEle1=target.id===elementId ? true : false;
            if(checkEle || checkEle1){
                ele_=blog.selectors.filter(sel=>(sel.eleId===selectorId))[0].rows.filter(row=>(row.eleId===rowId))[0].cols.filter(col=>(col.eleId===colId))[0].elements.find(ele=>(ele.eleId===elementId));
                if(ele_){
                    return ele_;
                }
            }
        }else if(target && blog){
            ele_=ele_ as elementType;
            ele_=blog.elements.find(ele=>(ele.eleId===target.id));
            if(ele_){
                return ele_;
            }
        }
        return undefined;
    }
    

    editSigninWithImage(parent:HTMLElement,blog:blogType|null,filedata:FormData|null,image:HTMLImageElement|null){
        const {cancelBtn,saveBtn,container}=this.editSetup.saveOption(parent);
        cancelBtn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:container,xpos:50,ypos:100,time:600});
                setTimeout(()=>{
                    parent.removeChild(container)
                },580);
            }
        });
        saveBtn.addEventListener("click",async(e:MouseEvent)=>{
            if(e){
                //closing popup
                Misc.fadeOut({anchor:container,xpos:50,ypos:100,time:600});
                setTimeout(()=>{
                    parent.removeChild(container)
                },580);
                const user=this._user.user;
                if(!user.id){
                    await this._service.signIn(parent);
                }else{

                    this._user.user=user;
                    if(blog){
                        blog={...blog,user_id:user.id};
                        this._modSelector._blog=blog;
                        this._modSelector.blog=this._modSelector._blog;
                        if(filedata){
                            const {Key}=this._service.generateImgKey(filedata,blog) as {Key:string};
                            blog={...blog,imgKey:Key};
                            this._modSelector._blog=blog;
                            this._modSelector.blog=this._modSelector._blog;
                            this._service.simpleImgUpload(parent,filedata).then(async(s3ImgKey)=>{
                                if(s3ImgKey){
                                    if(image){
                                        image.src=s3ImgKey.img;
                                        this._modSelector._blog={...this._modSelector._blog,img:s3ImgKey.img};
                                        this._modSelector.blog=this._modSelector._blog;
                                    }
                                    
                                }
                            }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg);Misc.message({parent,msg:"image NOT saved",type_:"error",time:500});});
                        }
                    }
                }
                           
            }else{
                Misc.message({parent,msg:"no email/password",type_:"error",time:500})
            };
        });
    }


    //FROM SIDEBAR injected into Main.container
    reOrder(parent:HTMLElement,blog:blogType){
        //cleaning attributes
        const sectionMain=document.querySelector("section#main") as HTMLElement;
        this.displayBlog.cleanAttributes(sectionMain,true);
        //CLEANING ATTRIBUTES
        const maxCount=ModSelector.maxCount(blog);
        const arrPopups:{popup:HTMLElement,parent:HTMLElement}[]=[];
        blog.elements.map(ele=>{
            Edit.cleanUpByID(parent,`${ele.name}#${ele.eleId}`);
            const getElement=parent.querySelector(`${ele.name}#${ele.eleId}`) as HTMLElement;
            // getElement.style.top="-50px";
            if(!getElement) return;
            this.newOrderele({parent:getElement,ele,maxCount}).then(async(res)=>{
                if(res){
                    res.select.onchange=(e:Event)=>{
                        if(e){
                            const value=parseInt((e.currentTarget as HTMLSelectElement).value as string) as number;
                            blog=this._modSelector.shiftUpItems({blog,changeEle:ele,changeSelector:null,changeCode:null,changeChart:null,place:value}); 
                            res.divCont.classList.toggle("isActive");
                        }
                    };
                    arrPopups.push({popup:res.popup,parent:res.divCont});
                }
            });

        });
         blog.selectors.filter(sel=>(!sel.header)).filter(sel=>(!sel.footer)).map(sel=>{
            Edit.cleanUpByID(parent,`${sel.name}#${sel.eleId}`);
            const getElement=parent.querySelector(`${sel.name}#${sel.eleId}`) as HTMLElement;
            // getElement.style.top="-50px";
            if(!getElement) return;
            getElement.setAttribute("data-placement",`${sel.placement}-A`);
            getElement.classList.add("isActive");
            this.newOrderSel({parent:getElement,sel,maxCount}).then(async(res)=>{
                if(res){
                    res.select.onchange=(e:Event)=>{
                        if(e){
                            const value=parseInt((e.currentTarget as HTMLSelectElement).value as string) as number;
                            blog=this._modSelector.shiftUpItems({blog,changeEle:null,changeSelector:sel,changeCode:null,changeChart:null,place:value}); 
                            getElement.classList.remove("isActive");
                        }
                    };
                    arrPopups.push({popup:res.popup,parent:getElement});
                }
            });
        });
         blog.codes.map(code=>{
            Edit.cleanUpByID(parent,`${code.name}#${code.eleId}`);
            const getElement=parent.querySelector(`${code.name}#${code.eleId}`) as HTMLElement;
            // getElement.style.top="-50px";
            if(!getElement) return;
            this.newOrderCode({parent:getElement,code,maxCount}).then(async(res)=>{
                if(res){
                    getElement.classList.add("isActive");
                    getElement.setAttribute("data-placement",`${code.placement}-A`)
                    res.select.onchange=(e:Event)=>{
                        if(e){
                            const value=parseInt((e.currentTarget as HTMLSelectElement).value as string) as number;
                            blog=this._modSelector.shiftUpItems({blog,changeEle:null,changeSelector:null,changeCode:code,changeChart:null,place:value}); 
                            getElement.classList.remove("isActive");
                        }
                    };
                    arrPopups.push({popup:res.popup,parent:getElement});
                }
            });
        });
         blog.charts.map(chart=>{
            Edit.cleanUpByID(parent,`div#${chart.eleId}`);
            const getCtx=parent.querySelector(`div#${chart.eleId}`) as HTMLCanvasElement;
            // getElement.style.top="-50px";
            if(!getCtx) return;
            this.newOrderChart({getCtx:getCtx,chart,maxCount}).then(async(res)=>{
                if(res){
                    getCtx.classList.add("isActive");
                    getCtx.setAttribute("data-placement",`${chart.placement}-A`);
                    
                    res.select.onchange=(e:Event)=>{
                        if(e){
                            const value=parseInt((e.currentTarget as HTMLSelectElement).value as string) as number;
                            blog=this._modSelector.shiftUpItems({blog,changeEle:null,changeSelector:null,changeCode:null,changeChart:chart,place:value}); 
                            getCtx.classList.remove("isActive");
                        }
                    };
                    arrPopups.push({popup:res.popup,parent:getCtx});
                }
            });
        });
        //place execute here
        this.exeCloseReOrder(parent).then(async(res)=>{
            if(res){
            res.btn.onclick=(e:MouseEvent)=>{
                if(e){
                    arrPopups.map((res)=>{
                        Misc.fadeOut({anchor:res.popup,xpos:100,ypos:10,time:400});
                        setTimeout(()=>{
                            // res.parent.classList.remove("isActive");
                            // (res.parent.parentElement as HTMLElement).classList.remove("isActive");
                            res.popup.remove();
                        },380);
                    });
                    Misc.fadeOut({anchor:res.masterPopup,xpos:100,ypos:0,time:400});
                    setTimeout(()=>{
                        parent.removeChild(res.masterPopup);
                    },380);
                    setTimeout(()=>{
                        this.selEleGenerator(Main.textarea as HTMLElement,blog)
    
                    },500);
                }
            };
        }
        });
    }

     newOrderele(item:{parent:HTMLElement,ele:elementType,maxCount:number}):Promise<{select:HTMLSelectElement,popup:HTMLElement,divCont:HTMLElement}>{
        const {parent,ele,maxCount}=item;
        Edit.cleanUpByClass(parent,`ele-order-item`);
        const divCont=parent.parentElement as HTMLElement;
        parent.style.position="relative";
        divCont.style.position="relative";
        const popup=document.createElement("div");
        popup.id=`ele-order-item-${ele.placement}`;
        popup.classList.add("ele-order-item");
        popup.style.cssText="position:absolute;width:clamp(50px,100px,125px);height:auto;display:flex;flex-direction:column;align-items:center;font-size:12px;;z-index:100;";
        popup.style.top="50%";
        popup.style.left="0%";
        popup.style.right="95%";
        const select=document.createElement("select");
        select.style.cssText="margin:auto;";
        select.value=`${ele.placement}`;
        select.textContent=`${ele.placement}`;
        popup.appendChild(select);
        divCont.appendChild(popup);
        Misc.fadeIn({anchor:popup,xpos:100,ypos:10,time:400});
        Array.from(Array(maxCount + 1).keys()).map(num=>{
            const option=document.createElement("option");
            if(num>0){
            option.value=String(num);
            option.textContent=`${num}`;
            }else{
                option.textContent=`select`;
            }
            select.appendChild(option);
        });
        
        return new Promise((resolve)=>{
            resolve({select,popup,divCont})
        }) as Promise<{select:HTMLSelectElement,popup:HTMLElement,divCont:HTMLElement}>; 
        
    }
    async newOrderSel(item:{parent:HTMLElement,sel:selectorType,maxCount:number}):Promise<{select:HTMLSelectElement,popup:HTMLElement}>{
        const {parent,sel,maxCount}=item;
        parent.classList.add("isActive");
        Edit.cleanUpByClass(parent,`select-order-item`);
        const popup=document.createElement("div");
        popup.id=`select-order-item-${sel.placement}`;
        popup.classList.add("select-order-item");
        popup.style.cssText="position:absolute;width:clamp(50px,100px,125px);height:auto;display:flex;flex-direction:column;align-items:center;;z-index:100;";
        popup.style.top="50%";
        popup.style.left="20%";
        popup.style.right="80%";
        const select=document.createElement("select");
        select.style.cssText="margin:auto;";
        select.value=`${sel.placement}`;
        select.textContent=`${sel.placement}`;
        popup.appendChild(select);
        parent.appendChild(popup);
        Misc.fadeIn({anchor:popup,xpos:100,ypos:10,time:400});
        Array.from(Array(maxCount+1).keys()).map(num=>{
            const option=document.createElement("option");
            if(num>0){
            option.value=String(num);
            option.textContent=`${num}`;
            }else{
                option.textContent=`select`;
            }
            select.appendChild(option);
        });
        // select.selectedIndex=0;
        return new Promise((resolve)=>{
            resolve({select,popup})
        }) as Promise<{select:HTMLSelectElement,popup:HTMLElement}>; 
        
    }
    async newOrderCode(item:{parent:HTMLElement,code:codeType,maxCount:number}):Promise<{select:HTMLSelectElement,popup:HTMLElement}>{
        const {parent,code,maxCount}=item;
        parent.classList.add("isActive");
        Edit.cleanUpByClass(parent,`code-order-item`);
        const popup=document.createElement("div");
        popup.id=`code-order-item-${code.placement}`;
        popup.classList.add("code-order-item");
        popup.style.cssText="position:absolute;width:clamp(50px,100px,125px);height:auto;display:flex;flex-direction:column;align-items:center;z-index:100;";
        popup.style.top="-10%";
        popup.style.left="20%";
        popup.style.right="80%";
        const select=document.createElement("select");
        select.style.cssText="margin:auto;";
        select.value=`${code.placement}`;
        select.textContent=`${code.placement}`;
        popup.appendChild(select);
        parent.appendChild(popup);
        Misc.fadeIn({anchor:popup,xpos:100,ypos:10,time:400});
        Array.from(Array(maxCount + 1).keys()).map(num=>{
            const option=document.createElement("option");
            if(num>0){
            option.value=String(num);
            option.textContent=`${num}`;
            }else{
                option.textContent=`select`;
            }
            select.appendChild(option);
        });
        // select.selectedIndex=0;
        return new Promise((resolve)=>{
            resolve({select,popup})
        }) as Promise<{select:HTMLSelectElement,popup:HTMLElement}>; 
        
    }
    async newOrderChart(item:{getCtx:HTMLCanvasElement,chart:chartType,maxCount:number}):Promise<{select:HTMLSelectElement,popup:HTMLElement}>{
        const {getCtx,chart,maxCount}=item;
        Header.cleanUpByID(getCtx,`chart-order-item-${chart.placement}`)
        getCtx.classList.add("isActive");
        const popup=document.createElement("div");
        popup.id=`chart-order-item-${chart.placement}`;
        popup.classList.add("chart-order-item");
        popup.style.cssText="position:absolute;width:clamp(50px,100px,125px);height:auto;display:flex;flex-direction:column;align-items:center;z-index:100;";
        popup.style.top="-10%";
        popup.style.left="20%";
        popup.style.right="80%";
        const select=document.createElement("select");
        select.style.cssText="margin:auto;";
        select.value=`${chart.placement}`;
        select.textContent=`${chart.placement}`;
        popup.appendChild(select);
        getCtx.appendChild(popup);
        Misc.fadeIn({anchor:popup,xpos:100,ypos:10,time:400});
        Array.from(Array(maxCount + 1).keys()).map(num=>{
            const option=document.createElement("option");
            if(num>0){
            option.value=String(num);
            option.textContent=`${num}`;
            }else{
                option.textContent=`select`;
            }
            select.appendChild(option);
        });
        // select.selectedIndex=0;
        return new Promise((resolve)=>{
            resolve({select,popup})
        }) as Promise<{select:HTMLSelectElement,popup:HTMLElement}>; 
        
    }
    exeCloseReOrder(parent:HTMLElement):Promise<{btn:HTMLButtonElement,masterPopup:HTMLElement}>{
        Edit.cleanUpByID(parent,"masterPopup");
        const masterPopup=document.createElement("div");
        masterPopup.style.cssText="position:absolute;width:150px;background:transparent;z-index:200;display:flex;place-items:center;box-shadow:1px 1px 12px 1px black,-2px -2px 10px -2px blue;border-radius:126px;";
        masterPopup.style.top="290px";
        masterPopup.style.left="120px";
        masterPopup.style.right="95%";
        masterPopup.id="masterPopup";
        const btn=buttonReturn({parent:masterPopup,text:"re-order",bg:Nav.bgColor,color:"blue",type:"button"});
        parent.appendChild(masterPopup);
        Misc.matchMedia({parent:masterPopup,maxWidth:900,cssStyle:{top:"290px",left:"120px",right:"95%"}});
        Misc.matchMedia({parent:masterPopup,maxWidth:400,cssStyle:{top:"490px",left:"120px",right:"95%"}});
        Misc.fadeIn({anchor:masterPopup,xpos:100,ypos:0,time:400});
        return new Promise((resolve)=>{
            resolve({btn,masterPopup})
        });
    
    }
    async editDescBlog(parent:HTMLElement){
        let blog=this._modSelector.blog;
        const flex="display:flex;flex-direction:column;align-items:center;gap:1.5rem;justify-content:center;width:100%;";
        const container=document.createElement("div");
        container.id="editDescBlog";
        container.className="popup";
        container.style.cssText="position:absolute;box-shadow:1px 1px 12px 1px lightblue;border-radius:12px;display:flex;flex-direction:column;align-items:center;gap:1.5rem;justify-content:center;background:white;border-radius:12px;padding-block:2rem;";
        container.style.inset="20%";
        container.style.width="700px";
        const form=document.createElement("form");
        form.style.cssText=flex;
        container.appendChild(form);
        if(blog.imgKey){
            const img_key= await this._service.getSimpleImg(blog.imgKey);
            blog={...blog,img:img_key ? img_key.img : this.logo}
        }
        const {cont:sample,image,desc:Desc}=this.editSetup.blogDescSetup(container,blog);
        sample.id="sample-desc";
        //DESC IS EDITED VIA blogDescSetup();
        const {textarea,label}=Nav.textareaComponent(form);
        textarea.name="desc";
        textarea.id="desc";
        textarea.value=blog.desc as string;
        textarea.style.cssText="width:100%;min-width:350px;";
        textarea.rows=5;
        label.setAttribute("for",textarea.id);
        const {input:file,label:fileLabel,formGrp:fileForm}=Nav.inputComponent(form);
        fileForm.style.cssText=flex;
        file.type="file";
        file.name="file";
        file.id="file";
        fileLabel.setAttribute("for",file.id);
        const {button:btn}=Misc.simpleButton({anchor:form,type:"submit",text:"submit",bg:Nav.btnColor,color:"white",time:400});
        btn.disabled=true;
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{inset:"0%",width:"600px"}});
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{inset:"0%",width:"375px"}});
        container.appendChild(form);
        parent.appendChild(container);
        Misc.growIn({anchor:container,scale:0,opacity:0,time:400});
        //DELETE
        const divx=document.createElement("div");
        divx.style.cssText="position:absolute;top:0%;right:0%;transform:translate(4px,4px);width:20px;length:20px;border-radius:50%;background:black;";
        FaCreate({parent:divx,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"18px"}});
        container.appendChild(divx);
        divx.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:container,scale:0,opacity:0,time:400});
                setTimeout(()=>{parent.removeChild(container)},390);
            }
        };
        //DELETE
        file.onchange=(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        };
        textarea.onchange=(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        };
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const desc=formdata.get("desc") as string;
                const file=formdata.get("file");
                const oldImgKey=this._modSelector._blog.imgKey;
                    this._modSelector.blog={...blog,desc:desc as string};
                    blog=this._modSelector.blog;
                    Desc.textContent=desc as string;
                    Misc.blurIn({anchor:Desc,blur:"20px",time:600});
                if(file){
                    const filename=(file as File).name;
                    const newUrl=URL.createObjectURL(file as File);
                    image.src=newUrl;
                    image.alt=filename;
                    Misc.blurIn({anchor:image,blur:"20px",time:700});
                    const {Key}=this._service.generateImgKey(formdata,blog) as {Key:string};
                    this._modSelector.blog={...blog,imgKey:Key};
                    blog=this._modSelector.blog;
                    image.setAttribute("imgKey",Key);
                    if(oldImgKey){
                        // console.log("BEFORE",oldImgKey)
                        this._service.adminImagemark(oldImgKey).then(async(res)=>{
                            if(res){
                                // console.log("AFTER",res)
                                Misc.message({parent:container,msg:"cleaned",type_:"success",time:400});
                                const {button}=Misc.simpleButton({anchor:container,text:"next",bg:Nav.btnColor,color:"white",type:"button",time:400});
                                Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                                setTimeout(()=>{container.removeChild(form)},390);
                                button.onclick=(e:MouseEvent)=>{
                                    if(e){
                                        this._user.askSendToServer({bg_parent:parent,formdata,image,blog,oldKey:null});
                                        Misc.growOut({anchor:container,scale:0,opacity:0,time:400});
                                        setTimeout(()=>{parent.removeChild(container)},390);
                                    }
                                };
                            }
                        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
                    }else{
                        const {button}=Misc.simpleButton({anchor:container,text:"next",bg:Nav.btnColor,color:"white",type:"button",time:400});
                        Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                        setTimeout(()=>{container.removeChild(form)},390);
                        button.onclick=(e:MouseEvent)=>{
                            if(e){
                                this._user.askSendToServer({bg_parent:parent,formdata,image,blog,oldKey:null});
                                Misc.growOut({anchor:container,scale:0,opacity:0,time:400});
                                setTimeout(()=>{parent.removeChild(container)},390);
                            }
                        };
                    }
                }
            }
           
        };
    }
   
   static cleanUpByID(parent:HTMLElement,id:string){
    ([...parent.children as any] as HTMLElement[]).map(child=>{
        if(child && child.id===id){
            parent.removeChild(child);
        }else if(child){
            ([...child.children as any] as HTMLElement[]).map(ch=>{
                if(ch && ch.id===id){
                    child.removeChild(ch);

                }
            });
        }
    });
   }
   static cleanUpByClass(parent:HTMLElement,cl:string){
    ([...parent.children as any] as HTMLElement[]).map(child=>{
        const check=([...child.classList as any] as string[]).includes(cl);
        if(child && check){
            parent.removeChild(child);
        }else if(child){
            ([...child.children as any] as HTMLElement[]).map(ch=>{
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

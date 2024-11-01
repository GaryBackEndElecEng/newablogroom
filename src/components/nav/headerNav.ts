
import { buttonCheckType, navLinkBtnType, userType, blogType, messageType,saveProcessType } from "../editor/Types";

import AuthService from "../common/auth";
import Service from "../common/services";
import ModSelector from "../editor/modSelector";
import Header from "@/components/editor/header";
import Misc from "../common/misc";
import User from "../user/userMain";
import Profile from "../editor/profile";
import { getCsrfToken } from "next-auth/react"
import RegSignIn from "./regSignin";
import NavArrow from "./arrow";


class Nav{
    static links:{name:string,link:string}[]=[{name:"home",link:"/"},{name:"blogs",link:"/blogs"},{name:"editor",link:"/editor"},{name:"blog",link:"/blog"}]
    static count:number;
    static navHeader:HTMLElement;
    static btnLinkChecks:buttonCheckType[];
    static logo:string;
    static logo2:string;
    static bgColor:string;
    static btnColor:string;
    urlBlog:string;
    btnArray:navLinkBtnType[];
    navList:{id:number,name:string,svg:string}[];
   static thanksMsg:"<span> Thank you for messsaging us. We will get back to you within one day. please send us a message for any other requests.</span> <blockquote><pre>Enjoy!, Gary</pre></blockquote> ";
    constructor(private _modSelector:ModSelector, private _auth:AuthService,private _service:Service,private _user:User,_regSignin:RegSignIn){
        this.navList=[{id:0,name:"signin",svg:""},{id:1,name:"contact",svg:""},{id:2,name:"blogs",svg:""},]
        this.urlBlog="/blogs";
        Nav.logo="/images/gb_logo.png";
        Nav.logo2="gb_logo.png";
        Nav.btnLinkChecks=[] as buttonCheckType[]
        Nav.count=0;
        Nav.bgColor=this._modSelector._bgColor;
        Nav.btnColor=this._modSelector.btnColor;
        this.btnArray=[] as navLinkBtnType[]
       

    }
    //--------GETTER SETTERS------//
    get btnLinkChecks(){
        const {parsed,isJSON}=Header.checkJson(localStorage.getItem("btnLinkChecks"))
        if(isJSON){
            return parsed as buttonCheckType[]
        }else{
            return Nav.btnLinkChecks
        }
    }
    set btnLinkChecks(btnLinkChecks:buttonCheckType[]){
        localStorage.setItem("btnLinkChecks",JSON.stringify(btnLinkChecks))
        Nav.btnLinkChecks=btnLinkChecks;
    }

    async getcsrfToken(){
        return await getCsrfToken()
    }
 
     
    //--------GETTER SETTERS------//
    

   
    contact(parent:HTMLElement){
        Nav.navHeader=document.querySelector("header#navHeader") as HTMLElement;
        const useParent= parent ? parent :Nav.navHeader;
        useParent.style.zIndex="";
        const cont=document.createElement("div");
        useParent.style.position="relative";
        cont.id="headerNav-contact";
        cont.style.cssText=`position:absolute;padding:1rem;background:rgb(3 13 49);color:white;inset:270% 30% 0% 30%;height:fit-content;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:16px;box-shadow:1px 1px 6px 1px aquamarine;padding:1rem;z-index:200;`;
        Misc.matchMedia({parent:cont,maxWidth:1400,cssStyle:{inset:"270% 29% 10% 29%"}});
        Misc.matchMedia({parent:cont,maxWidth:1200,cssStyle:{inset:"270% 25% 10% 25%"}});
        Misc.matchMedia({parent:cont,maxWidth:900,cssStyle:{inset:"270% 18% 10% 18%"}});
        Misc.matchMedia({parent:cont,maxWidth:400,cssStyle:{inset:"270% 1% 10% 1%"}});
        cont.style.inset=window.innerWidth <900 ? (window.innerWidth <410 ? "270% 1% 10% 1%" : "270% 18% 10% 18%") :"270% 37% 10% 37%";
        cont.style.width=window.innerWidth <900 ? (window.innerWidth <410 ? "100%" : "fit-content") :"fit-content";

        const form=document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;padding:1.5rem;border-radius:inherit;background:white;color:black;margin:1rem;color:white;box-shadow:1px 1px 12px 1px skyblue;";
        const divGrp=document.createElement("div");
        divGrp.id="headerNav-contact-welcom-message";
        divGrp.style.cssText="margin-inline:auto;position:relative;display:flex;flex-direction:column;margin-bottom:2rem;padding-inline:2rem;";
        const img=document.createElement("img");
        const imgWidth=170;
        img.src=Misc.sourceImage({src:"gb_logo.png",width:imgWidth,quality:75});
        img.alt="www.ablogroom.com";
        img.style.cssText="border-radius:50%;filter:drop-shadow(0 0 0.5rem white);shape-outside:circle(50%);float:right;margin-right:1.5rem;margin-bottom:0px;box-shadow:1px 1px 12px 1px;";
        img.style.width=`${imgWidth}px`;
        const text=document.createElement("p");
        text.id="headerNav-contact-text-title"
        text.className="text-primary";
        text.style.cssText="font-family:'Playwrite';font-size:130%;line-height:2.75rem;";
        text.appendChild(img);
        text.innerHTML+="send us a thought. We keep your information private secret. Alternatively, you can uncheck the box, below; title:<span style='color:white'>'secret'</span>";
        divGrp.appendChild(text);
        const formGrp=document.createElement("div");
        const formGrp1=document.createElement("div");
        const formGrp2=document.createElement("div");
        const formGrp3=document.createElement("div");
        formGrp.className="form-group";
        formGrp.style.cssText="margin-inline:auto;text-align:center;position:relative;";
        formGrp1.className="form-group";
        formGrp1.style.cssText="margin-inline:auto;text-align:center;position:relative;";
        formGrp2.className="form-group";
        formGrp2.style.cssText="margin-inline:auto;text-align:center;position:relative;";
        formGrp3.className="form-group";
        formGrp3.style.cssText="margin-inline:auto;text-align:center;position:relative;";
        const labelName=document.createElement("label");
        labelName.className="text-primary text-center";
        labelName.textContent="name";
        formGrp2.appendChild(labelName);
        const name=document.createElement("input");
        name.name="name";
        name.className="form-control";
        name.type="text";
        formGrp2.appendChild(name);
        const label=document.createElement("label");
        label.className="text-primary text-center";
        label.textContent="email";
        formGrp.appendChild(label);
        const email=document.createElement("input");
        email.name="email";
        email.className="form-control";
        email.pattern="[a-zA-Z0-9\.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}";
        email.type="text";
        formGrp.appendChild(email);
        formGrp.className="form-group";
        const labelMsg=document.createElement("label");
        labelMsg.className="text-primary text-center";
        labelMsg.textContent="Request";
        formGrp1.appendChild(labelMsg);
        const msg=document.createElement("textarea");
        msg.name="msg";
        msg.className="form-control";
        msg.style.cssText="min-width:300px;";
        msg.rows=4;
        ///
        const labelRate=document.createElement("label");
        labelRate.className="text-primary text-center";
        labelRate.textContent="rate us";
        formGrp3.appendChild(labelRate);
        const rate=document.createElement("input");
        rate.name="rate";
        rate.className="form-control";
        rate.type="number";
        rate.min="1";
        rate.max="5";
        formGrp3.appendChild(rate);
        const btn=document.createElement("button");
        btn.className="btn btn-sm btn-primary";
        btn.style.cssText="padding-inline:2rem; padding-block:0.5rem;border-radius:20px;margin-block:2rem;";
        btn.type="submit";
        btn.disabled=true;
        btn.textContent="send";
        const rateSecret=document.createElement("div");
        rateSecret.style.cssText="margin:auto;display:flex;justify-content:center;align-items:center;gap:1.5rem;";
        rateSecret.appendChild(formGrp3);
        rateSecret.appendChild(formGrp3);

        ///
        const {input:secret,label:seclabel,formGrp:fGrp}=Nav.inputComponent(rateSecret);
        secret.type="checkbox";
        secret.id="secret-checkbox";
        secret.name="secret";
        seclabel.setAttribute("for",secret.id);
        fGrp.className="";
        secret.className="";
        seclabel.textContent="secret";
        secret.checked=false;
        secret.style.width="30px";
        formGrp1.appendChild(msg);
        form.appendChild(formGrp2);
        form.appendChild(formGrp);
        form.appendChild(formGrp1);
        form.appendChild(rateSecret);
        ///
        form.appendChild(btn);
        cont.appendChild(divGrp);
        cont.appendChild(form);
        Nav.cancel(parent,cont);
        useParent.appendChild(cont);
        if(btn.disabled){
            btn.style.color="white";
            btn.style.backdropFilter="";
            btn.animate([
                {backdropFilter:"blur(20px)"},
                {backdropFilter:"blur(0px)"},
            ],{duration:1200,iterations:1});
        }else{
            btn.style.color="transparent";
            btn.style.backdropFilter="blur(10px)";
        }

        
       cont.animate([
        {transform:"translateY(-100%)",opacity:0},
        {transform:"translateY(0%)",opacity:1},
       ],{duration:300,iterations:1});
       const msg_e=document.createElement("p");
       msg_e.style.cssText="position:absolute;font-weight:bold;font-size:12px;";
       msg_e.className="text-primary"
       msg_e.style.inset="100% 0% -40% 0%";
       formGrp.appendChild(msg_e);
       name.addEventListener("change",(e:Event)=>{
        if(e){
            const nm=(e.currentTarget as HTMLInputElement).value;
            const msg_=(msg as HTMLTextAreaElement).value;
            const email_=(email as HTMLInputElement).value;
            const checks=[nm,msg_,email_].map(ch=>((ch.split("").length>0)));
            if(checks.includes(true)){
                btn.disabled=false;
            }
        }
       });
       msg.addEventListener("change",(e:Event)=>{
        if(e){
            const nm=(e.currentTarget as HTMLTextAreaElement).value;
            const msg_=(name as HTMLInputElement).value;
            const email_=(email as HTMLInputElement).value;
            const checks=[nm,msg_,email_].map(ch=>((ch.split("").length>0)));
            if(checks.includes(true)){
                btn.disabled=false;
            }
        }
       });
       email.addEventListener("input",(e:Event)=>{
        if(e){
            const reg:RegExp=/[a-zA-Z0-9\.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}/g;
            const mail=(e.currentTarget as HTMLInputElement).value;
            
            if(reg.test(mail)){
                msg_e.textContent="Thanks"
            }else{
                msg_e.textContent=" in a form of myEmail@mail.com";
            }
        }
       });
       form.addEventListener("submit",async(e:SubmitEvent) =>{
        if(e){
            e.preventDefault();
            const value=(email as HTMLInputElement).value;
            const testEmail=Nav.regTest({item:"email",value});
            if(testEmail.item==="pass"){
                btn.disabled=false;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const email:string | null=formdata.get("email") as string;
                const name:string | null=formdata.get("name") as string;
                const msg:string | null=formdata.get("msg") as string;
                const rate:string | null=formdata.get("rate") as string;
                const secret:string | null=formdata.get("secret") as string;
                if(email && name && msg){
                    const user_id=this._user.user.id ? this._user.user.id : undefined;
                    const Msg:messageType={name,email,msg,user_id,rate:parseInt(rate),secret:Boolean(secret),sent:false};
                    await this._service.sendMsgToServer(useParent,Msg).then(async(res)=>{
                        if(res){
                            Misc.fadeOut({anchor:cont,xpos:75,ypos:100,time:400});
                            setTimeout(()=>{useParent.removeChild(cont);},380);
                            Nav.thankMsg(useParent,"signIn",Nav.thanksMsg);
                        }
                    });
                  
                }else{
                    Misc.messageHeader({parent:useParent,msg:"email, name and message should be filled",type_:"error",time:700});
                }
            }
        }
       });
       setTimeout(()=>{
        const getCont=parent.querySelector("div#headerNav-contact") as HTMLElement;
        getCont.style.inset=window.innerWidth <900 ? (window.innerWidth <410 ? "270% 1% 10% 1%" : "270% 18% 10% 18%") :"270% 37% 10% 37%";
       },0);
    }
   
  
    signInDisplay(parent:HTMLElement,user:userType|null): Promise<{
        user: userType | null;
        parent: HTMLElement;
    }>{
        Header.cleanUpByID(parent,"user-signature");
        if(user && user.id){
        const container=document.createElement("div");
        container.id="user-signature";
        container.style.cssText="display:flex;justify-content:space-around;align-items:center;margin-inline:1rem;box-shadow:1px 1px 12px 1px white;padding-inline:0.5rem;border-radius:10px;color:white;background-color:#0a2351;overflow:hidden;position:relative;right:20px";
        container.style.maxWidth="300px;";
        const img=document.createElement("img");
        img.style.cssText="width:55px;border-radius:50%;filter:drop-shadow(0 0 0.25 white);";
        img.src=user.image ? user.image : Nav.logo;
        const para=document.createElement("p");
        const name=user.name ? user.name : "blogger"
        para.innerHTML=Nav.splitWord({parent:para,str:name,splitCount:4});
        container.appendChild(img);
        container.appendChild(para);
        parent.appendChild(container);
        Misc.matchMedia({parent:img,maxWidth:420,cssStyle:{width:"35px"}});
        Misc.matchMedia({parent:container,maxWidth:420,cssStyle:{maxWidth:"155px",marginInline:"0rem",paddingInline:"5px;"}});
        Misc.matchMedia({parent:para,maxWidth:420,cssStyle:{fontSize:"12px"}});
        Misc.growIn({anchor:container,scale:0.2,opacity:0,time:500});
        }
        return new Promise((resolve)=>{
            if(user && user.id){
                resolve({user:user,parent:parent});
            }else{
                resolve({user:null,parent:parent});
            }
        })as Promise<{user:userType|null,parent:HTMLElement}> ;
    }
 

    static splitWord(item:{parent:HTMLElement,str:string,splitCount:number}):string{
        const {parent,str,splitCount}=item;
        let word="";
        const arrWord:string[]=[];
        if(str && str.split("").length > splitCount){
            str.split("").map((lt,index)=>{
                if(lt){
                    word +=lt;
                    if(index===splitCount+1){
                        const newWord=word.slice(0,index);
                        arrWord.push(newWord);
                    }else if(index===splitCount*2 +1){
                        const newWord=word.slice(splitCount+1,index);
                        arrWord.push(newWord);
                    }else if(index === splitCount*3 +1){
                        const newWord=word.slice(splitCount*2+1,index);
                        arrWord.push(newWord)
                    }else if(index===str.length-1){
                        if(index > splitCount+1 && index < splitCount*2+1){
                            const newWord=word.slice(splitCount+1,str.length);
                                arrWord.push(newWord)
                        }else if(index > splitCount*2+1 && index < splitCount*3+1){
                            const newWord=word.slice(splitCount*2+1,str.length);
                                arrWord.push(newWord)
                        }else{
                            const newWord=word.slice(splitCount*3+1,str.length);
                                arrWord.push(newWord)
                        };
                    }
                }
            });
            //create span
            arrWord.map(word=>{
                if(word){
                    const span=document.createElement("span");
                    span.textContent=word;
                    parent.appendChild(span);
                }
            });
            parent.style.textWrap="pretty";
            return parent.innerHTML
        }else{
            return parent.innerHTML
        }
    }
    static splitString(str:string,splitCount:number):string|undefined{
        let word="";
        const arrWord:string[]=[];
        if(str && str.split("").length > splitCount){
            str.split("").map((lt,index)=>{
                if(lt){
                    word +=lt;
                    if(index===splitCount+1){
                        const newWord=word.slice(0,index);
                        arrWord.push(newWord);
                    }else if(index===splitCount*2 +1){
                        const newWord=word.slice(splitCount+1,index);
                        arrWord.push(newWord);
                    }else if(index === splitCount*3 +1){
                        const newWord=word.slice(splitCount*2+1,index);
                        arrWord.push(newWord)
                    }else if(index===str.length-1){
                        if(index > splitCount+1 && index < splitCount*2+1){
                            const newWord=word.slice(splitCount+1,str.length);
                                arrWord.push(newWord)
                        }else if(index > splitCount*2+1 && index < splitCount*3+1){
                            const newWord=word.slice(splitCount*2+1,str.length);
                                arrWord.push(newWord)
                        }else{
                            const newWord=word.slice(splitCount*3+1,str.length);
                                arrWord.push(newWord)
                        };
                    }
                }
            });
            //create span
            const parent=document.createElement("span");
            arrWord.map(word=>{
                if(word){
                    const span=document.createElement("span");
                    span.textContent=word;
                    parent.appendChild(span);
                }
            });
            parent.style.textWrap="pretty";
            return parent.innerHTML
        }
    }

    async send_contact(parent:HTMLElement,msg:messageType){
        return this._service.sendMsgToServer(parent,msg) as Promise<messageType>
        
    }
    async loadBlog():Promise<blogType | null>{
        return this.getLocal("blog").then(async(value)=>{
            const {parsed,isJSON}=Header.checkJson(value as string);
            if(isJSON){
                return parsed as blogType;
            }
        }) as Promise<blogType|null>
    }
    async loadUserId():Promise<string|null>{
        return this.getLocal("user_id").then(async(value:string|null)=>{
            return value as string
        }) as Promise<string | null>
    }
    async getLocal(item:string){
        return new Promise((resolver,reject)=>{
            if(typeof window !=="undefined"){
                resolver(localStorage.getItem(item));
                reject("nav:no localStorage blogs");
            };
        }) as Promise<string | null>;
    }
    cleanUpByQuery(parent:HTMLElement,target:HTMLElement){
        ([...parent.children as any] as HTMLElement[]).map(child=>{
            if(child.id ===target.id){
                parent.removeChild(child);
            }
        });
    }
   
   static regTest({item,value}:{item:string,value:string}):{item:string,value:string}{
        const reg_pswd=/[a-zA-z0-9\.\?\-\!]{6,}/g;
        const reg_email=/[a-zA-Z0-9\.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}/g;
        if(item==="password" && !reg_pswd.test(value)){
            return {item:"fail",value:"password"};
        }else if(item==="email" && !reg_email.test(value)){
            return {item:"fail",value:"email"};
        }else{
            return {item:"pass",value:""};
        }
    }

   static cancel(parent:HTMLElement,target:HTMLElement){
        Nav.navHeader=document.querySelector("header#navHeader") as HTMLElement;
        const useParent= parent ? parent :Nav.navHeader;
        const btn=document.createElement("button");
        // FaBtn({parent:btn,icon:FaTrash,cssStyle:css});
        btn.style.cssText="position:absolute;top:0px;right:0px;transform:translate(-9px,9px);border-radius:50%;border:1px solid white;z-index:1000;padding:0px;font-size:10px;width:11px;height:11px;";
        btn.textContent="X";
        btn.className="btn text-danger btn-sm";
        target.appendChild(btn);
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                if(!target) return;
                Misc.fadeOut({anchor:target,xpos:50,ypos:100,time:400});
                setTimeout(()=>{
                    useParent.removeChild(target);
                },380);
            }
        });

    }
   static thankMsg(parent:HTMLElement,type:string,thanks:string){
        parent.style.zIndex="";
        const width=window.innerWidth < 780 ? 5 :20;
        const cont=document.createElement("div");
        parent.style.position="relative";
        cont.id="thankyou";
        const text=document.createElement("p");
        text.style.cssText="margin-inline:auto;padding-inline:2rem;color:white;";
        if(type==="signIn"){
            cont.style.cssText=`position:absolute;width:fit-content;padding:1rem;background:${Nav.btnColor};color:white;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:16px;box-shadow:1px 1px 6px 1px aquamarine;z-index:200;`;
            text.innerHTML="<span> Thank you for signing in. please send us a message for any requests.</span> <blockquote><pre>Enjoy!, Gary</pre></blockquote> ";
            text.className="lobster";
            cont.style.inset=`40px ${width}% -100px ${width}%`;

        }else if (type==="contact"){
            cont.style.cssText=`position:absolute;width:fit-content;padding:1rem;background:${Nav.btnColor};color:white;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:16px;box-shadow:1px 1px 6px 1px aquamarine;z-index:200;`;
            text.innerHTML=thanks;
            text.className="lobster";
            cont.style.inset=`40px ${width}% -100px ${width}%`;
        }
        cont.appendChild(text);
        parent.appendChild(cont);
        cont.animate([
            {transform:"translateY(-100%)",opacity:0},
            {transform:"translateY(0%)",opacity:1},
           ],{duration:1000,iterations:1});
        setTimeout(()=>{
            cont.animate([
                {transform:"translateY(0%)",opacity:1},
                {transform:"translateY(-100%)",opacity:0},
               ],{duration:1000,iterations:1});
               setTimeout(()=>{
                parent.removeChild(cont);
               },1000);
        },6000);
        
        
        
    }
    
    static cleanUpByQuery(parent:HTMLElement,query:string){
        const getContainers=parent.querySelectorAll(query);
        const elements=([...getContainers as any] as Element[])
        if(getContainers){
            ([...parent.children as any] as HTMLElement[]).map(child=>{
                if(child && elements.length>0){
                    elements.map(child2=>{
                        if(child2.id===child.id){
                            parent.removeChild(child);

                        }
                    });

                }
            });
        }
    }
    static navHistory(url_:string){
        const {parsed:btnChecks}=Header.checkJson(localStorage.getItem("btnLinkChecks"));
        const {isJSON:isUser}=Header.checkJson(localStorage.getItem("user_id"));
        if(btnChecks){
            Nav.btnLinkChecks=btnChecks as buttonCheckType[]
            Nav.btnLinkChecks=Nav.btnLinkChecks.map(linkCheck=>{
                if(url_ && linkCheck.link && url_.includes(linkCheck.link)){
                    linkCheck.check=true;
                    linkCheck.isUser=isUser?true:false;
                    if(linkCheck.count >0){
                        linkCheck.count+=1;
                    }else{
                        linkCheck.count=1;
                    }
                }else{
                    linkCheck.check=false;
                    linkCheck.count=0;
                }
                return linkCheck;
            });
        }else{
            const lnk=Nav.links.find(lk=>(lk.link===url_));
            if(lnk){
                 Nav.btnLinkChecks=[{id:0,name:lnk.name,link:url_,btn:{} as HTMLButtonElement,check:true,isEditor:false,count:1,isUser:isUser}]
            }else{
                 Nav.btnLinkChecks=[{id:0,name:"",link:url_,btn:{} as HTMLButtonElement,check:true,isEditor:false,count:1,isUser:isUser}]
            }
        }
        localStorage.setItem("btnLinkChecks",JSON.stringify(Nav.btnLinkChecks))
        return Nav.btnLinkChecks;
        
        
    }
    
   static wordAddEffect(target:HTMLElement,text:string){
        if(!text)return;
        const textArr=text.split("");
        textArr.forEach(lt=>{
            const span=document.createElement("span");
            span.textContent=lt;
            span.animate([
                {transform:"translateY(350%)",position:"absolute",opacity:"0.5"},
                {transform:"translateY(0%)",position:"relative",opacity:"1"},
            ],{duration:700,iterations:1});
            target.appendChild(span);
        });
        setTimeout(()=>{
            ([...target.children as any] as HTMLSpanElement[]).map(sp=>{
                target.removeChild(sp);
            });
        },1600);
        target.textContent=text;
    }
    static emailComponent(form:HTMLElement,):{email:HTMLInputElement,label:HTMLLabelElement}{
        const rand=Math.round(Math.random()*100);
        const formGrp_email=document.createElement("div");
        formGrp_email.className="form-group";
        formGrp_email.style.cssText="margin-inline:auto;text-align:center;position:relative;padding-inline:1rem;display:flex; flex-direction:column; margin:auto;align-items:center;";
        const email_cont1=document.createElement("div");
        email_cont1.id="email_cont";
        email_cont1.style.cssText="position:absolute;inset:110% 0% -40% 0%;margin-inline:auto;";
        email_cont1.style.position="relative";
        const label=document.createElement("label");
        label.className="text-primary text-center";
        label.textContent="email";
        const email=document.createElement("input");
        email.name="email";
        email.id=`email-${rand}`;
        label.setAttribute("for",email.id);
        email.className="form-control";
        email.pattern="[a-zA-Z0-9\.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}";
        email.type="email";
        formGrp_email.appendChild(label);
        formGrp_email.appendChild(email);
        formGrp_email.appendChild(email_cont1);
        form.appendChild(formGrp_email)
        //--------message-----------------//
        const res_e1=document.createElement("small");
        res_e1.id="email_msg";
        res_e1.style.cssText="width:fit-content;padding:1rem;padding:4px;color:red;font-weight:bold;font-size:10px;";
        res_e1.textContent="";
        email_cont1.appendChild(res_e1);
        //--------message-----------------//
        email.addEventListener("input",(e:Event)=>{
            if(e){
                const email_=(e.currentTarget as HTMLInputElement).value;
                const Reg:RegExp=/[a-zA-Z0-9\.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}/g;
                if(!Reg.test(email_)){
                    res_e1.textContent=" Form=> MyMail@mail.com"
                }else{
                    const check=([...email_cont1.children as any] as Element[]).map(child=>(child.id)).includes("email_msg");
                    if(check){
                    email_cont1.removeChild(res_e1);
                    }
                }
            }
        });
        return {email,label}
    }
    static passwordComponent(form:HTMLElement):{password:HTMLInputElement,label:HTMLLabelElement}{
        const rand=Math.round(Math.random()*100);
        const formGrp_pass=document.createElement("div");
        formGrp_pass.className="form-group";
        const pass_cont=document.createElement("div");
        pass_cont.id="pass_cont";
        pass_cont.style.cssText="position:absolute;inset:110% 0% -40% 0%;margin-inline:auto;";
        pass_cont.style.position="relative";
        formGrp_pass.className="form-group";
        formGrp_pass.style.cssText="margin-inline:auto;text-align:center;position:relative;padding-inline:1rem;";
        const label=document.createElement("label");
        label.className="text-primary text-center";
        label.textContent="password";
        const pass=document.createElement("input");
        pass.id=`password-${rand}`;
        label.setAttribute("for",pass.id);
        pass.type="password";
        pass.name="password";
        pass.className="form-control";
        pass.pattern="[a-zA-Z0-9\.\!\?\%]{5,}";
        formGrp_pass.appendChild(label);
        formGrp_pass.appendChild(pass);
        formGrp_pass.appendChild(pass_cont);
        form.appendChild(formGrp_pass)
        //--------message-----------------//
        const res_p=document.createElement("small");
        res_p.id="pass_msg";
        res_p.style.cssText="width:fit-content;padding:1rem;padding:4px;color:red;font-weight:bold;font-size:10px;";
        res_p.textContent="";
        pass_cont.appendChild(res_p);
        //--------message-----------------//
        pass.addEventListener("input",(e:Event)=>{
            if(e){
                const pass_=(e.currentTarget as HTMLInputElement).value;
                const Reg:RegExp=/[a-zA-Z0-9\^\$\!]{5,}/g;
                if(!Reg.test(pass_)){
                    res_p.textContent="12345..characters with/without $,#,!,,,"
                }else{
                    const check=([...pass_cont.children as any] as Element[]).map(child=>(child.id)).includes("pass_msg");
                    if(check){
                    pass_cont.removeChild(res_p);
                    }
                }
               
            }
        });
        return {password:pass,label:label};
    }
    static textareaComponent(form:HTMLElement):{textarea:HTMLTextAreaElement,label:HTMLLabelElement,formGrp:HTMLElement}{
        const rand=Math.round(Math.random()*100);
        const formGrp_textarea=document.createElement("div");
        formGrp_textarea.className="form-group";
        formGrp_textarea.style.cssText="margin-inline:auto;text-align:center;position:relative;padding-inline:1rem;display:flex; flex-direction:column; margin:auto;align-items:center;gap:1rem;";
        const label=document.createElement("label");
        label.className="text-primary text-center";
        label.textContent="Bio";
        const textarea=document.createElement("textarea");
        textarea.id=`textarea-${rand}`;
        textarea.placeholder="I am a developer who enjoys providing you with the best means of creating a great web-page and or a poster or advertising with the tools of exporting your work to suit your purpose. If you desire additional tools, then please don't hesitate on contacting us with your request."
        textarea.rows=4;
        textarea.style.cssText="width:100%;padding-inline:1.5rem;"
        label.setAttribute("for",textarea.id);
        textarea.className="form-control";
        formGrp_textarea.appendChild(label);
        formGrp_textarea.appendChild(textarea);
        form.appendChild(formGrp_textarea)
        return {textarea,label,formGrp:formGrp_textarea}
    }
    static inputComponent(form:HTMLElement):{input:HTMLInputElement,label:HTMLLabelElement,formGrp:HTMLElement}{
        const rand=Math.round(Math.random()*100);
        const formGrp_input=document.createElement("div");
        formGrp_input.className="form-group";
        formGrp_input.style.cssText="margin-inline:auto;text-align:center;position:relative;padding-inline:1rem;display:flex; flex-direction:column; margin:auto;align-items:center;";
        const label=document.createElement("label");
        label.className="text-primary text-center";
        label.textContent="Name";
        const input=document.createElement("input");
        input.id=`input-${rand}`;
        input.placeholder="your name"
        input.type="text";
        input.name="name";
        input.style.cssText="width:100%;padding-inline:1.5rem;"
        label.setAttribute("for",input.id);
        input.className="form-control";
        formGrp_input.appendChild(label);
        formGrp_input.appendChild(input);
        form.appendChild(formGrp_input)
        return {input,label,formGrp:formGrp_input}
    }
    static cleanUp(parent:HTMLElement){
        while(parent.firstChild){
            parent.removeChild(parent.lastChild as ChildNode)
        }
    }
}
export default Nav;

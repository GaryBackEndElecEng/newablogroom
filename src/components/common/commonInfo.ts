import { FaFacebookF, FaGithub, FaInstagramSquare, FaLinkedin, FaMailBulk, FaSitemap } from "react-icons/fa";
import ModSelector from "../editor/modSelector";
import AuthService from "./auth";
import Misc from "./misc";
import { FaCreate } from "./ReactIcons";
import Service from "./services";
import { infoType2, messageType, userType } from "../editor/Types";
import Nav from "../nav/headerNav";


class CommonInfo{

    constructor(private _modSelector:ModSelector,private _service:Service,private auth:AuthService){

    };


    generalInfo(parent:HTMLElement){
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const container=document.createElement("div");
        container.style.cssText="margin-inline:auto;position:absolute;max-width:600px;width:100%;top:160%;left:35%;";
        Misc.matchMedia({parent:container,maxWidth:600,cssStyle:{"top":"160%","left":"0%","right":"0%"}});
        this._service.peronalInfo2().then(async(info:infoType2|undefined)=>{
                if(info){
                    const maxWidth=400;
                    parent.style.position="relative";
                    parent.style.zIndex="";
                    const container=document.createElement("div");
                    container.id="navArrow-bio-container";
                    container.style.cssText=`width:100%; max-width:${maxWidth}px;box-shadow:1px 1px 10px black;border-radius:16px;position:absolute;box-shadow:1px 1px 10px 1px black;border-radius:16px;z-index:1000;display:grid;place-items:center;`;
                    Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{top:"160%",left:"23%",right:"23%"}});
                    Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{top:"160%",left:"1%",right:"1%"}});
                    container.style.top="160%";
                    container.style.left=less900 ? (less400 ? "0%" :"16%") :"34%";
                    container.style.right=less900 ? (less400 ? "0%" :"16%") :"34%";
                    Misc.matchMedia({parent:container,maxWidth:600,cssStyle:{"top":"160%","left":"0%","right":"0%"}});
                    const card=document.createElement("div");
                    card.className="card";
                    card.style.cssText=`width:100%;border-radius:inherit;background-color:#0C090A;max-width:${maxWidth}px;margin-inline:auto;border-radius:inherit;position:relative;display:flex;justify-content:center;align-items:center;flex-direction:column;box-shadow:1px 1px 10px 1px black;`;
                    const img=document.createElement("img");
                    img.style.cssText=`border-radius:50%;box-shadow:1px 1px 10px 1px white;padding:0.5rem;margin-block:0.5rem;margin-inline:auto;width:100%;max-width:${maxWidth}px;`
                    img.classList.add("card-img-top");
                    img.src="/images/gb_logo.png";
                    img.alt="Gary Wallace";
                    card.appendChild(img);
                    const cardBody=document.createElement("div");
                    cardBody.style.cssText=`margin-inline:auto;padding-inline:1rem;display:flex;justify-content:center;flex-direction:column;align-items:center;background-color:white;border-radius:0% 0% 16px 16px;`;
                    const H5=document.createElement("h6");
                    H5.className=" text-primary";
                    H5.style.cssText="font-size:1.5rem;"
                    H5.textContent="Info";
                    H5.classList.add("card-title");
                    cardBody.appendChild(H5);
                    const UL=document.createElement("ul");
                    UL.style.cssText="width:100%;margin:auto;text-wrap:nowrap;";
                    cardBody.appendChild(UL);
                    const css_li="margin-inline:1rem;padding-inline:0.5rem;width:100%;text-wrap:pretty;";
                    for(const [key,value] of Object.entries(info)){
                        if(!key && !value && typeof key !=="string" && typeof value !=="string") return;
                        if(key!=="id"){
                            if(key !=="siteArray"){
                                if(key==="name"){
                                    const name=document.createElement("h6");
                                    name.className="text-primary display-6";
                                    name.textContent=value as string;
                                    cardBody.appendChild(name);
                                }else {
                                    const li=document.createElement("li");
                                    const span=document.createElement("span");
                                    span.className="text-primary mr-1";
                                    span.textContent=`${key}: `;
                                    li.style.cssText=css_li;
                                    const add= value as string;
                                    li.appendChild(span);
                                    li.innerHTML+=add;
                                    UL.appendChild(li);
                                }
                                cardBody.appendChild(UL);
                            }else if(key==="siteArray"){
                                const siteArray=value as {name:string,url:string}[];
                                this.siteArray(cardBody,siteArray);
                            }
                        }
                    }
                    //address
                    const btnGrp=document.createElement("div");
                    btnGrp.style.cssText="padding-inline:1rem;margin-inline:auto;display:flex;flex-direction:row;justify-content:center;aligns-item:center;margin-block:1rem;";
                    const {button:close}=Misc.simpleButton({anchor:btnGrp,text:"close",bg:"black",color:"white",type:"button",time:400});
                    cardBody.appendChild(btnGrp);
                    card.appendChild(cardBody);
                    container.appendChild(card);
                    parent.appendChild(container);
                    Misc.fadeIn({anchor:container,xpos:20,ypos:100,time:400});
                    close.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            Misc.fadeOut({anchor:container,xpos:20,ypos:100,time:600});
                            setTimeout(()=>{
                                parent.removeChild(container);
                            },580);
                        }
                    });
                }
        });
    };

    siteArray(parent:HTMLElement,array:{name:string,url:string}[]){
        const container=document.createElement("div");
        container.id="sites";
        const row=document.createElement("div");
        row.style.cssText="display:flex;justify-content:center;align-items:center;flex-direction:row;flex-wrap:wrap;"
        array.map((item,index)=>{
            if(item){
                if(item.name==="fb"){
                    
                    const iconDiv=document.createElement("div");
                    iconDiv.id="fa";
                    iconDiv.style.cssText="border-radius:50%;width:37px;height:37px;position:relative;"
                    FaCreate({parent:iconDiv,name:FaFacebookF,cssStyle:{color:"blue"}});
                    row.appendChild(iconDiv);
                    iconDiv.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            window.open(item.url,"_blank");
                        }
                    });
                }else if(item.name==="linkedin"){
                    
                    const iconDiv1=document.createElement("div");
                    iconDiv1.id="linkedln";
                    iconDiv1.style.cssText="border-radius:50%;width:37px;height:37px;position:relative;"
                    FaCreate({parent:iconDiv1,name:FaLinkedin,cssStyle:{color:"blue"}});
                    row.appendChild(iconDiv1);
                    iconDiv1.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            window.open(item.url,"_blank");
                        }
                    });
                }else if(item.name==="github"){
                    
                    const iconDiv2=document.createElement("div");
                    iconDiv2.id="github";
                    iconDiv2.style.cssText="border-radius:50%;width:37px;height:37px;position:relative;"
                    FaCreate({parent:iconDiv2,name:FaGithub,cssStyle:{color:"blue"}});
                    row.appendChild(iconDiv2);
                    iconDiv2.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            window.open(item.url,"_blank");
                        }
                    });
                }else if(item.name==="instagram"){
                    
                    const iconDiv3=document.createElement("div");
                    iconDiv3.id="instagram";
                    iconDiv3.style.cssText="border-radius:50%;width:37px;height:37px;position:relative;"
                    FaCreate({parent:iconDiv3,name:FaInstagramSquare,cssStyle:{color:"blue"}});
                    row.appendChild(iconDiv3);
                    iconDiv3.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            window.open(item.url,"_blank");
                        }
                    });
                }else if(item.name !=="email"){
                    
                    const iconDiv4=document.createElement("div");
                    iconDiv4.id=`website-${index}`;
                    iconDiv4.style.cssText="border-radius:50%;width:37px;height:37px;position:relative;"
                    FaCreate({parent:iconDiv4,name:FaSitemap,cssStyle:{color:"blue"}});
                    row.appendChild(iconDiv4);
                    iconDiv4.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            window.open(item.url,"_blank");
                        }
                    });
                }else{
                    const anchor=document.createElement("a");
                    anchor.style.cssText="cursor:pointer;color:white;background-color:rgba(0,0,0,0.1);border-radius:6px;display:flex;justify-content:center;align-items:center;margin-block:1rem;"
                    const iconDiv4=document.createElement("div");
                    iconDiv4.id=`email-${index}`;
                    iconDiv4.style.cssText="border-radius:50%;width:37px;height:37px;position:relative;"
                    FaCreate({parent:iconDiv4,name:FaMailBulk,cssStyle:{color:"red",fontSize:"35px"}});
                    anchor.appendChild(iconDiv4);
                    container.appendChild(anchor);
                }
            }
        });
        container.appendChild(row);
        parent.appendChild(container);
    };

    contact({user,isAuthenticated}:{user:userType,isAuthenticated:boolean}){
        const headerInject=document.getElementById("headerInjector") as HTMLElement;
        Nav.navHeader=headerInject.querySelector("header#navHeader") as HTMLElement;
        const useParent=headerInject.querySelector("header#navHeader") as HTMLElement;
        useParent.style.zIndex="";
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        const cont=document.createElement("div");
        useParent.style.position="relative";
        cont.id="navArrow-contact";
        cont.style.cssText=`position:absolute;width:fit-content;padding:1rem;background:rgb(3 13 49);color:white;height:fit-content;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:16px;width:100%;box-shadow:1px 1px 6px 1px aquamarine;padding:1rem;z-index:1000;`;
        cont.style.width=less900 ? (less400 ? "100%" :"75%") :"40%";
        cont.style.inset="270% 0% 10% 0%";
        const form=document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;padding:1.5rem;border-radius:inherit;background:white;color:black;margin:1rem;color:white;box-shadow:1px 1px 12px 1px skyblue;";
        const divGrp=document.createElement("div");
        divGrp.id="navArrow-contact-welcome-message";
        divGrp.style.cssText="margin-inline:auto;position:relative;display:flex;flex-direction:column;margin-bottom:2rem;padding-inline:2rem;";
        window.scroll(0,0);
        const img=document.createElement("img");
        const imgWidth=170;
        img.id="navArrow-image"
        img.src=Misc.sourceImage({src:"gb_logo.png",width:imgWidth,quality:75});
        img.alt="www.ablogroom.com";
        img.style.cssText="border-radius:50%;filter:drop-shadow(0 0 0.5rem white);shape-outside:circle(50%);float:right;margin-right:1.5rem;margin-bottom:0px;box-shadow:1px 1px 12px 1px;";
        img.style.width=`${imgWidth}px`;
        const text=document.createElement("p");
        text.id="navArrow-contact-text-title"
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
        email.pattern="[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}";
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
        Nav.cancel(useParent,cont);
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
            const reg:RegExp=/[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}/g;
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
                    const user_id= isAuthenticated ? user.id :undefined;
                    const Msg:messageType={name,email,msg,user_id:user_id,rate:parseInt(rate),secret:Boolean(secret),sent:false};
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
    };
};
export default CommonInfo;
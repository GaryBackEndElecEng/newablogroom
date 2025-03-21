import {  blogType, chartType, messageType, postType, sendPostRequestType, userType } from '@/components/editor/Types';
import {FaCrosshairs} from "react-icons/fa";
import Misc from '../common/misc';
import Nav from '../nav/headerNav';
import Service from '../common/services';
import ModSelector from '../editor/modSelector';
import { getErrorMessage } from '@/lib/errorBoundaries';
import {FaCreate} from "@/components/common/ReactIcons";
import { SiAnswer } from "react-icons/si";
import { buttonReturn } from '@/components/common/tsFunctions';
import Header from '../editor/header';
import Main from '../editor/main';

class MessageSetup{
    logo:string="/images/gb_logo.png";
    requestPic:string;
    constructor(){
        this.requestPic="/images/requestAnswer.png";
    }
    contact(parent:HTMLElement): {form:HTMLFormElement,email:HTMLInputElement,textarea:HTMLTextAreaElement,rate:HTMLInputElement,btn:HTMLButtonElement,name:HTMLInputElement,msgEvent:HTMLElement,cont:HTMLElement}{
        Nav.navHeader=document.querySelector("header#navHeader") as HTMLElement;
        window.scroll(0,0);
        const useParent= parent || Nav.navHeader;
        useParent.style.zIndex="";
        const cont=document.createElement("div");
        useParent.style.position="relative";
        cont.id="contact-message";
        cont.style.cssText=`position:absolute;width:fit-content;padding:1rem;background:white;color:black;height:fit-content;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:16px;box-shadow:1px 1px 6px 1px aquamarine;padding:1rem;z-index:200;`;
        cont.style.inset="20% 0% 0% 0%";
        const form=document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;padding:1.5rem;border-radius:inherit;background:white;color:black;margin:1rem;box-shadow:1px 1px 10px 1px black;";
        const text=document.createElement("h6");
        text.textContent="send a comment";
        text.className="text-primary display-6 my-2 mx-auto text-center";
        text.style.cssText="font-family:'Playwrite'";
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
        name.placeholder="name";
        name.className="form-control";
        name.type="text";
        formGrp2.appendChild(name);
        const label=document.createElement("label");
        label.className="text-primary text-center";
        label.textContent="email";
        formGrp.appendChild(label);
        const email=document.createElement("input");
        email.name="email";
        email.placeholder="form: mymail@mail.com";
        email.className="form-control";
        email.pattern="[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}";
        email.type="text";
        formGrp.appendChild(email);
        formGrp.className="form-group";
        const labelMsg=document.createElement("label");
        labelMsg.className="text-primary text-center";
        labelMsg.textContent="comment";
        formGrp1.appendChild(labelMsg);
        const msg=document.createElement("textarea");
        msg.name="msg";
        msg.className="form-control";
        msg.style.cssText="width:100%;";
        msg.rows=4;
        msg.minLength=10;
        msg.placeholder="send a comment";
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
        btn.textContent="send msg";
        formGrp1.appendChild(msg);
        form.appendChild(formGrp2);
        form.appendChild(formGrp);
        form.appendChild(formGrp1);
        form.appendChild(formGrp3);
        form.appendChild(btn);
        cont.appendChild(text);
        cont.appendChild(form);
        Nav.cancel(parent,cont);
        useParent.appendChild(cont);
        cont.animate([
            {transform:"scale(0)",opacity:0},
            {transform:"scale(1)",opacity:1},
           ],{duration:300,iterations:1});
           const msg_e=document.createElement("p");
           msg_e.style.cssText="position:absolute;font-weight:bold;font-size:12px;";
           msg_e.className="text-primary"
           msg_e.style.inset="100% 0% -40% 0%";
           formGrp.appendChild(msg_e);
        return {form,email,textarea:msg,name,rate,btn,msgEvent:msg_e,cont}
    }
    contact2(parent:HTMLElement):{form:HTMLFormElement,popup:HTMLElement,useParent:HTMLElement,btn:HTMLButtonElement}{
        const css="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;";
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        Nav.navHeader=document.querySelector("header#navHeader") as HTMLElement;
        window.scroll(0,0);
        const useParent= parent || Nav.navHeader;
        useParent.style.zIndex="";
        const popup=document.createElement("div");
        useParent.style.position="relative";
        popup.id="contact2-message";
        popup.style.cssText=`position:absolute;padding:1rem;background:white;color:black;height:fit-content;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:16px;box-shadow:1px 1px 6px 1px aquamarine;padding:1rem;z-index:200;background-color:black;padding-block:1rem;align-self:center`;
        popup.style.top="5%";
        popup.style.left=less900 ? "0%" : "25%";
        popup.style.right=less900 ? "0%" : "25%";
        popup.style.width="100%";
        popup.style.maxWidth=less900 ? (less400 ? "375px" :"600px" ) : "620px";
        const img=document.createElement("img");
        img.style.cssText="shape-outside:circle(50%);margin-right:1rem;width:125px;height:125px;border-radius:50%;box-shadow:1px 1px 12px 1px white;filter:drop-shadow(0 0 0.75rem white);float:left;";
        img.src=this.logo;
        img.alt="www.ablogroom.com";
        const para=document.createElement("p");
        para.appendChild(img);
        para.innerHTML+="Sending the author a message improves on the quality of the blog and improves what you would like to see. The message will be delivered to the author, upon 'send'";
        para.style.cssText="color:white;font-family:Poppins-Regular;padding-right:1rem;";
        popup.appendChild(para);
        const form=document.createElement("form");
        form.id="contact-form";
        form.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;padding:1.5rem;border-radius:inherit;background:white;color:black;margin:1rem;box-shadow:1px 1px 10px 1px black;";
        form.style.width=less400 ? "100%":"80%";
        const text=document.createElement("h6");
        text.textContent="Your thoughts";
        text.className="text-primary display-6 my-2 mx-auto text-center";
        text.style.cssText="font-family:'Playwrite'";
        const {input:name,label:lname,formGrp:grpName}=Nav.inputComponent(form);
        name.autocomplete="name";
        grpName.style.cssText=css;
        name.type="text";
        name.id="name";
        name.name="name";
        name.value="";
        lname.textContent="name";
        name.placeholder="so we can respectfully reply";
        lname.classList.add("text-primary");
        lname.setAttribute("for",name.id);
        const {input:email,label:lemail,formGrp:grpEmail}=Nav.inputComponent(form);
        grpEmail.style.cssText=css;
        email.autocomplete="email";
        email.type="email";
        email.id="email";
        email.name="email";
        email.pattern="[a-zA-Z0-9._]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}"
        lemail.textContent="email";
        email.placeholder="format:myemail@email.com";
        lemail.classList.add("text-primary");
        lemail.setAttribute("for",email.id);
        const {textarea:tArea,label,formGrp:grpText}=Nav.textareaComponent(form);
        grpText.style.cssText=css;
        label.textContent="your thoughts"
        tArea.autocomplete="on";
        tArea.rows=4;
        tArea.style.minWidth="300px";
        tArea.name="textarea";
        tArea.id="textarea";
        label.setAttribute("for",tArea.id);
        tArea.placeholder="Your thoughts";
        const {input:rate,label:lrate,formGrp:grpRate}=Nav.inputComponent(form);
        grpRate.style.cssText=css;
        rate.type="number";
        rate.min="1";
        rate.max="5";
        rate.id="rate";
        rate.name="rate";
        rate.placeholder="";
        lrate.textContent="rate";
        lrate.classList.add("text-primary");
        lrate.setAttribute("for",rate.id);
        const {input:secret,label:lsecret,formGrp:grpSecret}=Nav.inputComponent(form);
        grpSecret.style.cssText=css;
        secret.className="";
        secret.type="checkbox";
        secret.id="secret";
        secret.name="secret";
        secret.checked=false;
        lsecret.textContent="secret";
        lsecret.classList.add("text-primary");
        lsecret.setAttribute("for",secret.id);
       
        const {button:btn}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"white",type:"submit",time:400,text:"submit comment"});
        btn.disabled=true;
        popup.appendChild(form);
        this.removeEle(useParent,popup);
        useParent.appendChild(popup);
        name.onchange=(e:Event)=>{
            if(e){
                const nvalue=(e.currentTarget as HTMLInputElement).value;
                if(nvalue){
                    btn.disabled=false;
                    btn.textContent="submit comment";
                    this.eleMsg({parent:grpName,msg:"thanks",close:true,color:"blue"});
                }else{
                    btn.disabled=true
                    const msg="your name ??";
                    btn.textContent="disabled";
                    this.eleMsg({parent:grpName,msg,close:false,color:"red"});
                }
            }
        };
        tArea.onchange=(e:Event)=>{
            if(e){
                const tvalue=(e.currentTarget as HTMLInputElement).value;
                const isLen=tvalue.length > 10;
                if(isLen){
                    btn.disabled=false;
                    btn.textContent="submit comment";
                    this.eleMsg({parent:grpText,msg:"thanks",close:true,color:"blue"});
                }else{
                    btn.disabled=true;
                    const msg="your comment??";
                    btn.textContent="disabled";
                    this.eleMsg({parent:grpText,msg,close:false,color:"red"});
                }
            }
        };
        email.onchange=(e:Event)=>{
            if(e){
                const eReg:RegExp=/[a-zA-Z0-9._]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}/;
                const evalue=(e.currentTarget as HTMLInputElement).value;
                if(eReg.test(evalue)){
                    btn.disabled=false;
                    btn.textContent="submit comment";
                    this.eleMsg({parent:grpEmail,msg:"thanks",close:true,color:"blue"});
                }else{
                    btn.disabled=true;
                    btn.textContent="disabled";
                    const msg="email format is myEmail@mail.ca, or myEmail@mail.com,,,"
                    this.eleMsg({parent:grpEmail,msg,close:false,color:"red"});
                }
            }
        };
        Misc.fadeIn({anchor:popup,xpos:50,ypos:100,time:500});
        window.scroll(0,0);
        return {form,popup,useParent,btn}
    };


    sendPostAnswerRequest(item:{parent:HTMLElement,pathname:string|null}):{form:HTMLFormElement,btn:HTMLButtonElement,popup:HTMLElement,retParent:HTMLElement}{
        const {parent,pathname}=item;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;";
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const popup=document.createElement("div");
        if(pathname==="/posts"){
            parent.style.position="absolute";
        }else{
            parent.style.position="relative";
        }
        popup.id="messageSetup-sendPostAnswerRequest-message";
        popup.style.cssText=css_col + `position:absolute;padding:1rem;background-color:white;color:black;height:fit-content;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:16px;box-shadow:1px 1px 6px 1px black;padding:1rem;z-index:200;`;
        popup.style.inset="20% 0% 0% 0%";
        popup.style.width="100%";
        popup.style.maxWidth=less900 ? (less400 ? "375px" :"420px" ) : "520px";
        const img=document.createElement("img");
        img.style.cssText="shape-outside:circle(50%);margin-right:1rem;aspect-ratio:1 / 1;border-radius:50%;box-shadow:1px 1px 12px 1px white;filter:drop-shadow(0 0 0.75rem white);float:left;";
        img.style.width=less900 ? (less400 ? "120px":"135px") : "150px";
        img.src=this.requestPic;
        img.alt="www.ablogroom.com";
        const para=document.createElement("p");
        para.appendChild(img);
        para.innerHTML+="The author will send you the answers to your email.It should arrive within the next 2-3mins. Thank you for sending this request.";
        para.style.cssText="font-family:Poppins-Regular;padding-right:1rem;margin-bottom:1rem;border-bottom:1px solid blue;";
        popup.appendChild(para);
        const form=document.createElement("form");
        form.id="contact-form";
        form.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5rem;padding:1.5rem;border-radius:inherit;background:white;color:black;margin:1rem;box-shadow:1px 1px 10px 1px black;margin-inline:auto;";
        form.style.width=less900 ? (less400 ? "100%":"85%"):"80%";
        const text=document.createElement("h6");
        text.textContent="Your thoughts";
        text.className="text-primary display-6 my-2 mx-auto text-center";
        text.style.cssText="font-family:'Playwrite'";
        const {input:name,label:lname,formGrp:grpName}=Nav.inputComponent(form);
        name.autocomplete="name";
        grpName.style.cssText=css_col;
        name.type="text";
        name.id="name";
        name.name="name";
        name.value="";
        name.autocomplete="name";
        lname.textContent="name";
        name.placeholder="so we can respectfully reply";
        lname.classList.add("text-primary");
        lname.setAttribute("for",name.id);
        const {input:email,label:lemail,formGrp:grpEmail}=Nav.inputComponent(form);
        grpEmail.style.cssText=css_col;
        email.autocomplete="email";
        email.type="email";
        email.id="email";
        email.name="email";
        email.autocomplete="email";
        email.pattern="[a-zA-Z0-9._]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}"
        lemail.textContent="email";
        email.placeholder="format:myemail@email.com";
        lemail.classList.add("text-primary");
        lemail.setAttribute("for",email.id);
        const {button:btn}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"white",type:"submit",time:400,text:"get answer"});
        btn.disabled=true;
        popup.appendChild(form);
        this.removeEle(parent,popup);
        parent.appendChild(popup);
        name.onchange=(e:Event)=>{
            if(e){
                const nvalue=(e.currentTarget as HTMLInputElement).value;
                if(nvalue){
                    btn.disabled=false;
                    btn.textContent="submit comment";
                    this.eleMsg({parent:grpName,msg:"thanks",close:true,color:"blue"});
                }else{
                    btn.disabled=true
                    const msg="your name ??";
                    btn.textContent="disabled";
                    this.eleMsg({parent:grpName,msg,close:false,color:"red"});
                }
            }
        };
       
        email.onchange=(e:Event)=>{
            if(e){
                const eReg:RegExp=/[a-zA-Z0-9._]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}/;
                const evalue=(e.currentTarget as HTMLInputElement).value;
                if(eReg.test(evalue)){
                    btn.disabled=false;
                    btn.textContent="submit comment";
                    this.eleMsg({parent:grpEmail,msg:"thanks",close:true,color:"blue"});
                }else{
                    btn.disabled=true;
                    btn.textContent="disabled";
                    const msg="email format is myEmail@mail.ca, or myEmail@mail.com,,,"
                    this.eleMsg({parent:grpEmail,msg,close:false,color:"red"});
                }
            }
        };
        Misc.fadeIn({anchor:popup,xpos:50,ypos:100,time:500});
        return {retParent:parent,popup,form,btn};
    };


    eleMsg(item:{parent:HTMLElement,msg:string,close:boolean,color:string}){
        const {parent,msg,close,color}=item;
        Header.cleanUpByID(parent,"element-msg");
        const classColor=(color==="red" ? "danger" : "primary"); 
        parent.style.position="relative";
        parent.style.zIndex="2";
        const popup=document.createElement("div");
        popup.id="element-msg";
        popup.style.cssText="margin-inline:auto;position:absolute;top:100%;z-index:200";
        const text=document.createElement("p");
        text.textContent=msg;
        text.className=`text-center text-${classColor}`;
        text.style.cssText=`margin-inline:auto;padding-inline:0.25rem;margin-block:0.35rem;color:${color}`;
        popup.appendChild(text);
        parent.appendChild(popup);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:300});
        if(close){
            setTimeout(()=>{
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:300});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },290);
            },1200);
        } 
    };


    removeEle(parent:HTMLElement,target:HTMLElement){
        const xDiv=document.createElement("div");
        parent.style.zIndex="2";
       
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-4px,-4px);width:25px;height:25px;border-radius:50%;background-color:black;display:flex;place-items:center;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"23px",color:"white"}});
        target.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:target,scale:0,opacity:0,time:300});
                setTimeout(()=>{
                    parent.removeChild(target);
                },290);
            }
        };
    };


};

////-------MESSAGE CLASS----///

class Message{
    freepicurl:string="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
    logo:string="/images/gb_logo.png";
    thanksMsg:string=`<span>We or the author will get back to you as soon as possible.</span><hr style="width:80%;margin:auto;">
    <span style="width:5px;height:4vh;margin-inline:1rem;background:red;"></span>
    <span><pre style="text-align:center;font-family:'Play-write';margin:auto;">
    Gary Wallace
    </pre></span>
     <hr style="width:80%;margin:auto;">`;
    signUpMsg:string="<span> Thank you for signing in. please send us a message for any requests.</span> <blockquote><pre>Enjoy!, Gary</pre></blockquote> "
    _blog:blogType;
    _post:postType;
    _message:messageType;
    _messages:messageType[];
    _placement:number;
    msgSetup:MessageSetup;
    static bgColor:string;
    static btnColor:string;
    private _user:userType|null;
    
    constructor(private _modSelector:ModSelector,private _service:Service,blog:blogType|null,post:postType|null,user:userType|null){
        this.freepicurl="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
        this._user=user;
        this._blog={} as blogType;
        this._message={} as messageType;
        this._messages=[] as messageType[];
        if(blog){
            this._blog=blog;
            this._message={} as messageType;
            this._messages=[] as messageType[];
            Message.bgColor=this._modSelector._bgColor;
            Message.btnColor=this._modSelector.btnColor;
           
        }
        if(post){
            this._post=post;
        }
        this.msgSetup=new MessageSetup();

    }
    /////----------------SETTER/GETTERS------------------///////
    get placement(){
        const getPlace=localStorage.getItem("placement");
        // console.log("164:",getPlace)
        if(getPlace){
            this._placement=Number(getPlace);
            return parseInt(getPlace)
        }else{
            return 1;
        }
    };
    set placement(placement:number){
        this._placement=placement;
        localStorage.setItem("placement",JSON.stringify(placement))
    };

    get blog(){
        return this._blog;
    }
    set blog(blog:blogType){
        this._blog=blog;
        // this._modSelector.blog=blog
    }
    get post(){
        return this._post;
    }
    set post(post:postType){
        this._post=post;
    }
    get messages(){
        return this._messages;
    }
    set messages(messages:messageType[]){
        this._messages=messages;
    }
    get message(){
        return this._message;
    }
    set message(message:messageType){
        this._message=message;
        this._messages.push(message);
    }
    /////----------------SETTER/GETTERS------------------///////

    contact(parent:HTMLElement,blog:blogType|null){
        const  {form,popup,useParent} =this.msgSetup.contact2(parent);
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
       form.addEventListener("submit",(e:SubmitEvent) =>{
        if(e){
            e.preventDefault();
                const getParent=([...parent.children as any] as HTMLElement[]).find(child=>(child.id==="display-main"));
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const email:string | null=formdata.get("email") as string;
                const name:string | null=formdata.get("name") as string;
                const msg:string | null=formdata.get("textarea") as string;
                const rate:number | null=parseInt(formdata.get("rate") as string);
                const secret:boolean | null=Boolean(formdata.get("secret") as string);
                if(email && name && msg){
                    const blog_id=blog ? blog.id : undefined;
                    const user_id=blog?.user_id !=="" ? blog?.user_id : undefined;
                    const Msg:messageType={name,email,msg,user_id,rate,blog_id:blog_id,secret:secret,sent:false};
                    this.message=Msg;
                    this._service.sendClientMessage(Msg).then(async(res:messageType)=>{
                        if(res){
                            Misc.fadeOut({anchor:popup,xpos:75,ypos:100,time:400});
                            setTimeout(()=>{useParent.removeChild(popup);},380);
                            const cssStyle={boxShadow:"1px 1px 10px 1px #0CAFFF",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}
                            Message.thankMsg({parent,thanks:this.thanksMsg,cssStyle,useParent:false,less400,less900});
                            //GETTING CONTAINER
                            if(getParent && blog){
                                this.getBlogMsgs(getParent,blog.id).then(async(res1)=>{
                                    if(res1){
                                        this.contactCards(res1.container,res1.messages);
                                    }
                                });
                            }
                            //GETTING CONTAINER
                        }
                    }).catch((err)=>{
                        const msg=getErrorMessage(err);
                        console.error(msg)
                        Misc.message({parent:parent,msg:msg,type_:"error",time:600});
                    });
                }else{
                    Misc.messageHeader({parent,msg:"email, name and message should be filled",type_:"error",time:700});
                }
          
        }
       });
    }
   
    static thankMsg(msgThank:{parent:HTMLElement,thanks:string,cssStyle:{[key:string]:string},useParent:boolean,less400:boolean,less900:boolean}){
        //IF useParent is false=>parent=== body
        const {parent,thanks,cssStyle,useParent,less400,less900}=msgThank;
        const css_col_abs=`position:absolute;inset:30%;width:fit-content;padding:1rem;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;border-radius:16px;z-index:2000;`;
        const css_col=`width:fit-content;padding:1rem;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:16px;`;
        const getBody=document.querySelector("body") as HTMLElement;
        let newParent:HTMLElement|null;
        if(!useParent && getBody){
            Main.textarea=getBody;
            newParent=getBody;
        }else{
            newParent=parent;
        }
        const cont=document.createElement("div");
        cont.id="thankyou";
        cont.style.cssText=css_col_abs + "backdrop-fliter:blur(20px);background:rgba(0,0,0,0.4);";
        cont.style.inset=less900 ?(less400 ? "25% 0% 55% 0%":"10% 0% 80% 0%"):"30% 0% 50% 0%";
        if(less900){
            if(less400){
                window.scroll(0,400);
            }else{
                window.scroll(0,0);

            }
        }else{
            window.scroll(0,300);
        }
        const innerCont=document.createElement("div");
        innerCont.id="thankYou-cont-innerCont";
        innerCont.style.cssText=css_col + `background:${Message.btnColor};box-shadow:1px 1px 6px 1px aquamarine;`;
       
        innerCont.style.width="100%";
        cont.appendChild(innerCont);
        const title=document.createElement("h5");
        title.textContent="Thank You!!";
        title.className="text-center text-primary my-1 mx-auto";
        innerCont.appendChild(title);
        const text=document.createElement("p");
        text.style.cssText="margin-inline:auto;padding-inline:2rem;color:white;font-size:20px;";
        text.innerHTML=thanks;
        for(const key of Object.keys(cont.style)){
            for(const [key1,value] of Object.entries(cssStyle)){
                if(key===key1){
                    cont.style[key]=value;
                }
            }
        }
        innerCont.style.marginInline="auto";
        innerCont.appendChild(text);
        newParent.appendChild(cont);
        cont.animate([
            {transform:"translateY(-100%)",opacity:0},
            {transform:"translateY(0%)",opacity:1},
           ],{duration:1000,iterations:1});
        setTimeout(()=>{
            cont.animate([
                {transform:"translateY(0%)",opacity:1},
                {transform:"translateY(-100%)",opacity:0},
               ],{duration:800,iterations:1});
               setTimeout(()=>{
                newParent.removeChild(cont);
               },790);
        },6600);
    }
    async getBlogMsgs(parent:HTMLElement,blog_id:number):Promise<{container: HTMLDivElement,messages: messageType[]} | undefined>{
        Message.cleanUpID(parent,"msgs-main-container");
        const container=document.createElement("div");
        container.id="msgs-main-container";
        container.style.cssText="width:100%;max-width:900px;position:relative;background-color:white;box-shadow:1pa 1px 10px 1px #0CAFFF;border-radius:8px;margin-top:4rem;margin-bottom:2rem;min-height:5vh;display:flex;justify-content:center;align-items:center;flex-direction:column;margin-inline:auto;box-shadow:1px 1px 10px 1px #00BFFF";
        parent.appendChild(container);
        return this._service.getBlogMessages(blog_id).then(async(msgs)=>{
            if(msgs && msgs.length>0){
                const avg=Message.calcAverage(msgs);
                const divAvg=document.createElement("div");
                divAvg.classList.add("showAnchor");
                divAvg.setAttribute("data-link","Average rating");
                divAvg.style.cssText="margin-block:1rem;margin-inline:auto;"
                const cssStyle={fontSize:"22px",color:"yellow",backgroundColor:"black",padding:"3px",borderRadius:"50%"};
                const rowCssStyle={backgroundColor:"black",padding:"3px",borderRadius:"8px"};
                Misc.starRating({parent:divAvg,rating:avg,cssStyle,rowCssStyle});
                this.messages=msgs;
                const hr=document.createElement("hr");
                hr.style.cssText="width:75%;margin-inline:auto;color:#00BFFF;background:#00BFFF;margin-top:0rem;"
                container.appendChild(divAvg);
                container.appendChild(hr);
                return {container:container,messages:this.messages};
            }else{
                container.style.display="none";
            }
        });
    }
    //PARENT getBlogMsgs
    contactCards(container:HTMLElement,msgs:messageType[]){
        const len= msgs && msgs.length>0 ? msgs.length : null;
        const box=document.createElement("div");
        Header.cleanUpByID(container,"box-column-msgs");
        box.id="box-column-msgs";
        box.style.cssText="justify-content:space-around;align-items:center;margin-inline:auto;width:100%;display:flex;position:relative;flex-direction:column;gap:1rem;;height:15vh;overflow-y:scroll;padding-block:1rem;";
        const parent=container.parentElement as HTMLElement;
        container.appendChild(box);
        Misc.matchMedia({parent:box,maxWidth:900,cssStyle:{"height":"10vh"}});
        if(len && parent){
           msgs.map((msg,index)=>{
                if(msg){

                    this.contactCard({container,box,msg,index});
                    
                }
            });
        }
    }
    contactCard(item:{container:HTMLElement,box:HTMLElement,msg:messageType,index:number}){
        const {container,box,msg,index}=item;
        Header.cleanUpByID(box,`msg-card-${index}`);
        const card=document.createElement("div");
        card.id=`msg-card-${index}`;
        card.className="msgCard row";
        card.style.cssText=`width:100%;display:inline-flex;justify-content:center;box-shadow:1px 1px 5px 1px #00BFFF,-1px -1px 5px 1px #00BFFF;cursor:pointer;`
            //ICONDIV && NAME
            const nameCont=document.createElement("span");
            nameCont.style.cssText="display:flex;flex-wrap:nowrap;justify-content:space-around;align-items:center;margin-block:auto;";
            nameCont.id="nameCont";
            nameCont.classList.add("viewCard");
            nameCont.setAttribute("data-link","click to view comment");
            const name=document.createElement("p");
            name.id="msg-name";
            name.style.cssText="margin-right:0.5rem;margin-block:0.5rem;";
            name.textContent=msg.name;
        const iconDiv=document.createElement("span");
        iconDiv.id="iconDiv";
        iconDiv.style.cssText="font-size:40px;width:45px;height:45px;padding:3px;display:flex;"
        FaCreate({parent:iconDiv,name:SiAnswer,cssStyle:{marginRight:"10px",background:"white",color:"black",zIndex:"1"}});
        //APPENDING ICONDIV && NAME
        nameCont.appendChild(iconDiv);
        nameCont.appendChild(name);
        card.appendChild(nameCont);
            //APPENDING ICONDIV && NAME
            //STARS AND RATING
            const rating=document.createElement("p");
            rating.id="rating";
            rating.style.cssText="margin-right:0.5rem;margin-block:auto;padding-block:auto;";
        rating.textContent=`rating:${msg.rate}`;

        const contStar=document.createElement("span");
        contStar.id="contStar";
        contStar.style.cssText="display:flex;flex-wrap:wrap;width:100%;align-items:center;justify-content:space-around;";
        contStar.appendChild(rating);
       const cssStyle={color:"yellow",padding:"3px",borderRadius:"50%","fontSize":"25px","fill":"yellow","marginInline":"0px"};
       const rowCssStyle={color:"yellow","backgroundColor":"black",padding:"3px",borderRadius:"8px"};
        Misc.starRating({parent:contStar,rating:msg.rate,cssStyle,rowCssStyle});
        //APPENDING rating and contStar
        //APPENDING rating and contStar
        nameCont.appendChild(contStar);
        box.appendChild(card);
        card.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.viewCard({parent:container,msg});
                
            }
        });
    }
    viewCard(item:{parent:HTMLElement,msg:messageType}){
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const {parent,msg}=item;
        const isHome=parent.id==="home-index";
        const container=document.createElement("div");
        container.id="message-viewCard-container";
        container.style.cssText ="max-width:800px;width:100%;padding-inline:1rem;display:grid;place-items:center;position:absolute;border-radius:14px;box-shadow:1px 1px 10px 1px #0CAFFF,-1px -1px 10px 1px #0CAFFF;z-index:100;background-color:white;";
        if(isHome){
            container.style.top="75%";
            container.style.left="20%";
            container.style.right="20%";
            // window.scrollTo(0,5)
        }else{
            container.style.top="-100%";
            container.style.left=less900 ? (less400 ? "0%" : "10%") :"20%";
            container.style.right=less900 ? (less400 ? "0%" : "10%") :"20%";
            
        };
        
        parent.appendChild(container);
        const card=document.createElement("div");
        card.id="message-viewCard-card"
        card.style.cssText ="padding-inline:1rem;display:flex;justify-content:space-around;flex-wrap:nowrap;align-items:flex-start;position:relative;background-color:white;width:100%;padding-block:1rem;";
        container.appendChild(card);
        const img=document.createElement("img");
        img.id="message-viewCard-img"
        img.src=this.logo;
        img.alt="www.ablogroom.ca";
        img.style.cssText="width:50px;height:50%;border-radius:50%;filter:drop-shadow(0 0 0.5rem #0CAFFF);background-color:black;";
        card.appendChild(img);
        const cardBody=document.createElement("div");
        cardBody.id="message-viewCard-body";
        cardBody.style.cssText="width:100%; margin-inline:auto;padding:0.5rem;display:flex;flex-direction:column;justify-content:flex-start;margin-block:1rem;align-items:flex-start;max-height:15vh;overflow-y:scroll;position:relative;";
        card.appendChild(cardBody);
        const name=document.createElement("span");
        name.id="viewCrad-body-name";
        name.style.cssText="display:flex;flex-wrap:wrap;";
        const rate=document.createElement("div");
       rate.style.cssText="margin-inline:auto;"
        rate.id="cardBody-rate";
        const cssStyle={fontSize:"22px",color:"yellow",backgroundColor:"black",padding:"3px",borderRadius:"50%"};
        const rowCssStyle={backgroundColor:"black",padding:"3px",borderRadius:"8px"};
        Misc.starRating({parent:rate,rating:msg.rate,cssStyle,rowCssStyle});
        name.innerHTML=`<span id="view-cardBody-name" style="display:flex;"><span style="color:black;font-weight:bold;">name: </span> <h6 style="font-size:18px;color:blue;margin-right:0.5rem;"> ${msg.name}</h6></span>`;
        cardBody.appendChild(rate);
        cardBody.appendChild(name);
        const mess=document.createElement("p");
        mess.id="viewCard-body-mess";
        mess.style.cssText="padding:0.7rem;border:1px solid #0CAFFF;border-radius:7px;width:100%; ";
        mess.textContent=msg.msg;
        cardBody.appendChild(mess);
        Misc.fadeIn({anchor:container,xpos:70,ypos:100,time:400});
        if(isHome){
            Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"maxWidth":"700px","width":"auto","top":"65%","left":"5%","right":"5%"}});
            Misc.matchMedia({parent:container,maxWidth:500,cssStyle:{"maxWidth":"390px","width":"auto","top":"73%","left":"5%","right":"5%"}});
        }else{

            Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"maxWidth":"700px","width":"auto","top":"-140%","left":"3%","right":"3%"}});
            Misc.matchMedia({parent:container,maxWidth:500,cssStyle:{"maxWidth":"390px","width":"auto","top":"-130%","left":"1%","right":"1%"}});
        }
        Misc.matchMedia({parent:rate,maxWidth:500,cssStyle:{width:"8px;"}});
        
        const btn=buttonReturn({parent:container,bg:"black",color:"white",text:"close",type:"button"});
        btn.id="viewCard-btn";
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:container,xpos:30,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(container);
                },380);
            }
        });

    };



    chartmessage(parent:HTMLElement,charts:chartType[]){
        const popup=document.createElement("div");
        popup.id="chartmessage-popup";
        popup.style.cssText="margin-inline:auto;position:absolute;inset:0%;backdrop-filter:blur(12px);box-shadow:1px 1px 12px 1px black;border-radius:12px;display:flex;justify-content:center;align-items:center;gap:1rem;padding:1rem;width:100%;";
        const container=document.createElement("div");
        container.id="popup-message-inner";
        container.style.cssText="width:100%;padding:1rem;margin:auto;text-wrap:pretty;";
        const para=document.createElement("p");
        para.style.cssText="margin-inline:auto;margin-block:3rem;font-family:'Poppins-Regular';line-height:2rem;";
        para.textContent="Before saving your chart, you must first create a blog, so that we have a reference on your data,so you don't lose it.";
        const btnCont=document.createElement("div");
        btnCont.id="btn-cont-chart-message";
        btnCont.style.cssText="margin:auto;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:1.55rem;";
        const {button:save}=Misc.simpleButton({anchor:btnCont,text:"save",bg:"#05607e",color:"white",type:"button",time:400});
        save.onclick=(e:MouseEvent)=>{
            if(e){
                //barOption is already stringify in chart && added to chartsconst
                const placement=this.placement
                this._modSelector.blog={...this._modSelector.blog,charts:charts};
                localStorage.setItem("blog",JSON.stringify(this._modSelector.blog));

                localStorage.setItem("placement",String(placement));
                this._modSelector.placement+=1;
                const url=new URL(window.location.href);
                const newUrl=new URL("/editor",url.origin);
                window.location.href=newUrl.href;
            }
        }
        const {button:cancel}=Misc.simpleButton({anchor:btnCont,text:"cancel",bg:Nav.btnColor,color:"white",type:"button",time:400});
        cancel.onclick=(e:MouseEvent)=>{
            if(e){
                this._modSelector.blogInitializer(this._user);
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:40});
                setTimeout(()=>{
                    parent.removeChild(popup);
                });
            }
        };
        container.appendChild(para);
        container.appendChild(btnCont);
        popup.appendChild(container);
        parent.appendChild(popup);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:500});

    };

    sendPostmessage(item:{parent:HTMLElement,post:postType,pathname:string|null,func:()=>Promise<void>}):Promise<{sent:boolean,retParent:HTMLElement}>{
        //THIS SENDS THE ANSWER TO A POST EITHER BY URI OR AND MSG (post.sendMsg or And uri=freepicurl/post.sendRqKey)
        const {parent,post,func,pathname}=item;
        console.log("pathname:",pathname);
        let sent:boolean=false;
        if(pathname==="/posts"){
            parent.style.position="absolute";
        };
        const {form,popup,retParent}=this.msgSetup.sendPostAnswerRequest({parent,pathname});
        retParent.style.position=parent.style.position;
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const name=formdata.get("name") as string;
                const email=formdata.get("email") as string;
                if(email){
                    const name_=name || undefined;
                    const send:sendPostRequestType={post,clientName:name_,clientEmail:email};
                   await this._service.requestPost({sendRequest:send}).then(async(res)=>{
                        //api/postrequest
                        if(res){
                            const msg=`Your request message to ${post.title} was sent. You will be recieving an email with the answers;`
                            Misc.message({parent,msg:msg,type_:"success",time:1200});
                            sent=true;
                            func()
                        }
                        retParent.removeChild(popup);
                    });
                }
            }
        };

        return new Promise(resolver=>{
            sent=true;
            resolver({sent,retParent})
        }) as Promise<{sent:boolean,retParent:HTMLElement}>;
    }
    static calcAverage(msgs:messageType[]):number{
        const rates=msgs.map(msg=>(msg.rate));
        if(!(rates && rates.length>0)) return 1;
        const sum=rates.reduce((a,b)=>(a+b),0);
        return Math.round(sum/(rates.length));
    }
    static cleanUpID(parent:HTMLElement,ID:string){
        ([...parent.children as any] as HTMLElement[]).map(ch=>{
            if(ch && ch.id===ID){
                parent.removeChild(ch);
            }
        });
     }
}
export default Message;
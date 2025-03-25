
import { buttonCheckType, navLinkBtnType, messageType } from "../editor/Types";
import Service from "../common/services";
import ModSelector from "../editor/modSelector";
import Header from "@/components/editor/header";
import Misc from "../common/misc";
import User from "../user/userMain";
import { getCsrfToken } from 'next-auth/react';



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
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
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
    

  
 

    static splitWord(item:{parent:HTMLElement,str:string,splitCount:number}):string{
        const {parent,str,splitCount}=item;
        let count=0;
        const arr=str.split("")
        const len=arr.length-1;
        const arrWord:string[]=[];
        if(str && arr.length > splitCount){
            arr.map((lt,index)=>{
                if(lt && index%splitCount===0){
                    
                    if(index===splitCount+1){
                        const newWord=arr.slice(count,index).join("");
                        arrWord.push(newWord);
                        count=index;
                    }
                }else if((splitCount)>=len-index){
                        const newWord=arr.slice(index,len).join("");
                        arrWord.push(newWord);
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
    };

    
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
    };
  

   
   static regTest({item,value}:{item:string,value:string}):{item:string,value:string}{
        const reg_pswd=/[a-zA-Z0-9.?\-!]{6,}/g;
        const reg_email=/[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}/g;
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
        const useParent= parent ||Nav.navHeader;
        const btn=document.createElement("button");
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
        window.scroll(0,0);
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
        if(getContainers && elements.length>0){
                elements.map(child=>{
                    if(child){
                        parent.removeChild(child);
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
                    linkCheck.isUser=isUser;
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
        email.pattern="[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}.[a-z]{2,3}";
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
                const Reg:RegExp=/[a-zA-Z0-9.]{2,}@[a-zA-Z0-9]{2,}\.[a-z]{2,3}/g;
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
        pass.pattern="[a-zA-Z0-9.!?%]{5,}";
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
                const Reg:RegExp=/[a-zA-Z0-9^$!]{5,}/g;
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
    static cleanUpByQueryKeep(parent:HTMLElement,query:string){
        //THIS REMOVES ALL BUT ONE CHILD BY QUERY ( CLASS OR ID);
        const getContainers=parent.querySelectorAll(query);
        const elements=([...getContainers as any] as Element[]);
        if(getContainers && elements.length>1){
                elements.map((child,index)=>{
                    if(child && index>0){
                        parent.removeChild(child);
                    }
                });

        }
    }
}
export default Nav;

import ModSelector from "@/components/editor/modSelector";
import { blogType, userType } from "../../components/editor/Types";
import DisplayBlog from "@/components/blog/displayBlog";
import Misc from "@/components/common/misc";
import Header from "@/components/editor/header";
import { imageLoader } from "@/components/common/tsFunctions";
import Service from "@/components/common/services";


class PrintPdf{
    _blog:blogType;
    logo2="gb_logo.png";
    userPic="userpic.png";
    _user:userType | null;
    constructor(private _service:Service,private _displayBlog:DisplayBlog,blog:blogType,user:userType|null){
        this._blog=blog;
        this._user=user;
        this.logo2="gb_logo.png";
        this.userPic="userpic.png";
    };

    //GETTERS SETTERS-------------//
    get blog(){
        return this._blog;
    }
    get user(){
        return this._user
    }

   async main(item:{parent:HTMLElement}){
        const {parent}=item
        const blog=this.blog;
        const user=this.user;
        const less400=window.innerWidth < 400;
        const less900=window.innerWidth < 900;
        Header.cleanUpByID(parent,"printpdf-main-container");
        parent.style.background="white";
        parent.style.marginInline="auto";
        parent.style.maxWidth=less900 ? (less400 ? "100%":"85%"):"70%";
        const css_col="margin-inlin:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;"
        const container=document.createElement("section");
        container.id="printpdf-main-container";
        container.style.cssText=css_col;
        container.style.paddingInline=less400 ? "0.5rem":"1rem";
        container.style.position="relative";
        const innerContainer=document.createElement("div");
        innerContainer.id="container-innerContainer";
        innerContainer.style.cssText=css_col + "width:100%";
        innerContainer.style.background="white";
        await this._displayBlog.saveFinalWork({innerContainer,blog}).then(async(res)=>{
            if(res){
               
                await this.getUserInfo({parent:innerContainer,user:user});
                const {button}=Misc.simpleButton({anchor:res.innerContainer,bg:"#03052c",color:"white",type:"button",time:700,text:"print"});
                button.style.marginBlock="2rem";
                button.onclick=(e:MouseEvent)=>{
                    if(e){

                        //hidden footer
                        const getFooter=document.querySelector("section#footerInjector") as HTMLElement;
                        if(!getFooter) return;
                        const getHeader=document.querySelector("div#headerInjector") as HTMLElement;
                        if(!getHeader) return;
                        getFooter.style.display="none";
                        getHeader.style.display="none";
                        button.style.display="none";
                        parent.style.maxWidth="100%";
                        document.body.style.backgroundImage="";
                        window.print();
                        window.history.go(-1);
                        setTimeout(()=>{
                            getFooter.style.display="block";
                            getHeader.style.display="block";
                            button.style.display="block";
                            parent.style.maxWidth=less900 ? (less400 ? "100%":"85%"):"70%";
                            document.body.style.backgroundImage="var(--bg-image-body)";
                        },300);
                    }
                };
            }
        });
        container.appendChild(innerContainer);
        Header.cleanUpByID(parent,"printpdf-main-container");
        parent.appendChild(container);
    }
    async getUserInfo(item:{parent:HTMLElement,user:userType|null}): Promise<{user:userType | null,parent:HTMLElement}|undefined>{
        const {parent,user}=item;
        if(!user) return;
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        Header.cleanUpByID(parent,"getUserInfo-displayBlog-user-container");
        parent.style.position="relative";
        const container=document.createElement("div");
        container.id="getUserInfo-displayBlog-user-container";
        container.style.cssText="margin-inline:auto;margin-block:1.25rem;display:flex;align-items:center;justify-content:space-around;flex-warp:wrap;background-color:white;border-radius:11px;padding-block:1.5rem;padding-inline:1.25rem;box-shadow:1px 1px 12px 2px #10c7e9ab,-1px -1px 12px 1px #10c7e9ab;";
        container.style.width=less900 ? (less400 ? "100%" :"85%" ) : "67%";
        container.style.paddingInline=less900 ? (less400 ? "1rem" :"1.5rem" ) : "2rem";
        const img=document.createElement("img");
        const maximgwidth=120;
        img.style.cssText=`max-width:${maximgwidth}px;border-radius:50%;aspect-ratio: 1 / 1;box-shadow:1px 1px 10px 1px black;float:left; `;
        if(user.imgKey){
            this._service.getSimpleImg(user.imgKey).then(async(res_)=>{
                if(res_){
                    img.src=res_.img;
                    img.alt=res_.Key;
                }
            });
        }else{
            img.src=user.image ? user.image: imageLoader({src:this.userPic,quality:75,width:maximgwidth});
            img.alt=user.name ? user.name: "blogger";
        }
        Misc.blurIn({anchor:img,blur:"10px",time:600});
        container.appendChild(img);
        const subContainer=document.createElement("div");
        subContainer.style.cssText="display:flex;justify-content:center;flex-direction:center;align-items:center;gap:0.5rem;height:120px;overflow-y:scroll;"
            const ulCont=document.createElement("ul");
            ulCont.id="showinfo";
            ulCont.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:stretch;justify-content:center;";
            const text=document.createElement("h6");
            text.className="text-primary";
            text.innerHTML=user.name ? `<span style="color:blue;text-decoration:underline;">name: </span><span>${user.name}<span>`:"";
            text.style.textWrap="pretty";
            text.style.display=user.name ? "block":"none";
            ulCont.appendChild(text);
            const li1=document.createElement("li");
            li1.innerHTML=user.email ? `<span style="color:blue;text-decoration:underline;">email: </span><span>${user.email}<span>`:"";
            li1.style.display=user.email ? "block":"none";
            ulCont.appendChild(li1);
            const li2=document.createElement("li");
            li2.innerHTML=user.bio ? `<span style="color:blue;text-decoration:underline;">bio: </span><span>${user.bio}<span>`:"";
            li2.style.display=user.bio ? "block":"none";
            li1.style.display="flex";
            li1.style.flexWrap="wrap";
            li2.style.display="flex";
            li2.style.flexWrap="wrap";
            ulCont.appendChild(li2);
            subContainer.appendChild(ulCont)
            container.appendChild(subContainer);
        
            parent.appendChild(container);
        return {user,parent}
                
          
        }
}
export default PrintPdf;
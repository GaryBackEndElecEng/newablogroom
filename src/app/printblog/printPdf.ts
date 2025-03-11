import ModSelector from "@/components/editor/modSelector";
import { arrDivPlaceType, blogType, userType } from "../../components/editor/Types";
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
    constructor(private _modSelector:ModSelector,private _service:Service,private _displayBlog:DisplayBlog,blog:blogType,user:userType|null){
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
        const arrDivPlaces:arrDivPlaceType[]=[];
        const idValues=this._modSelector.dataset.idValues;
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
        container.style.cssText=css_col + "width:100%";
        container.style.paddingInline=less400 ? "0.5rem":"1rem";
        container.style.position="relative";
        const innerContainer=document.createElement("div");
        innerContainer.id="container-innerContainer";
        innerContainer.style.cssText=css_col + "width:100%;gap:2rem;";
        innerContainer.style.background="white";
        await this.getUserInfo({parent:innerContainer,user:user}).then(async(res)=>{
            if(res){
        await this._displayBlog.saveFinalWork({innerContainer:res.parent,blog,idValues,arrDivPlaces}).then(async(res_)=>{
            if(res_){
                        const {button}=Misc.simpleButton({anchor:res_.innerContainer,bg:"#03052c",color:"white",type:"button",time:700,text:"print"});
                        button.style.marginBlock="2rem";
                        button.id="main-print_btn";
                        button.onclick=async(e:MouseEvent)=>{
                            if(e){
        
                                //hidden footer && HEADER && BUTTON
                                const getFooter=document.querySelector("section#footerInjector") as HTMLElement;
                                const getButton=document.querySelector("button#main-print_btn") as HTMLElement;
                                if(!getFooter) return;
                                const getHeader=document.querySelector("div#headerInjector") as HTMLElement;
                                if(!getHeader) return;
                                await PrintPdf.sleep({time:300});
                                getFooter.hidden=true;
                                getHeader.hidden=true;
                                getButton.hidden=true;
                                parent.style.maxWidth="100%";
                                //hidden footer && HEADER && BUTTON
                                //ADJUST HEIGHT
                                document.body.style.backgroundImage="";
                                const getInnerContHeight=window.getComputedStyle(res_.innerContainer).getPropertyValue("height");
                                const height=Number(getInnerContHeight.split("px")[0]);
                                const newHeight=`${height + 500}px`;
                                res_.innerContainer.style.height=newHeight;
                                res_.innerContainer.style.display="flex";
                                res_.innerContainer.style.justifyContent="flex-start";
                                res_.innerContainer.style.width="100%";
                                res_.innerContainer.style.alignItems="center";
                                //ADJUST HEIGHT
                                //removing shadows
                                const cssStyle={boxShadow:"",overflowY:"auto",overflowX:"auto"};
                                const classList=["box-shadow"];
                                PrintPdf.removeStyles({target:res_.innerContainer,cssStyle,classList});
                                //removing shadows
                                getFooter.style.display="block";
                                getHeader.style.display="block";
                                button.style.display="block";
                                parent.style.maxWidth=less900 ? (less400 ? "100%":"85%"):"70%";
                                document.body.style.backgroundImage="var(--bg-image-body)";
                                await PrintPdf.sleep({time:300});
                                window.print();
                                window.history.go(-1);
                            }
                        };
                    }
                });
            }
        });
        container.appendChild(innerContainer);
        Header.cleanUpByID(parent,"printpdf-main-container");
        parent.appendChild(container);
    };


    static removeStyles({target,cssStyle,classList}:{target:HTMLElement,cssStyle:{[key:string]:string},classList:string[]}){
        const {isNextLevel,arr}=PrintPdf.subRemoveStyles({target,classList,cssStyle});
        if(isNextLevel){
            arr.map(child=>{
                const {isNextLevel:level2,arr:arr2}=PrintPdf.subRemoveStyles({target:child,classList,cssStyle});
                if(level2){
                    arr2.map(child2=>{
                        const {isNextLevel:level3,arr:arr3}=PrintPdf.subRemoveStyles({target:child2,classList,cssStyle});
                        if(level3){
                            arr3.map(child3=>{
                                const {isNextLevel:level4,arr:arr4}=PrintPdf.subRemoveStyles({target:child3,classList,cssStyle});
                                if(level4){
                                    arr4.map(child4=>{
                                        const {isNextLevel:level5,arr:arr5}=PrintPdf.subRemoveStyles({target:child4,classList,cssStyle});
                                        if(level5){
                                            arr5.map(child5=>{
                                                PrintPdf.subRemoveStyles({target:child5,classList,cssStyle});
                                               
                                            });
                                        }else{
                                            return;
                                        }
                                    });
                                }else{
                                    return;
                                };
                            });
                        }else{
                            return;
                        }
                    });
                }else{
                    return;
                }
            });
        }else{
            return;
        }
      
    };


   static subRemoveStyles({target,classList,cssStyle}:{target:HTMLElement,classList:string[],cssStyle:{[key:string]:string}}):{isNextLevel:boolean,arr:HTMLElement[]}{
        const nextLevelArr=([...target.children as any] as HTMLElement[]);
        const node=target.nodeName.toLowerCase();
        const check=nextLevelArr.length>0;
        ([...target.classList as any] as string[]).map(cl=>{
            classList.map(remCl=>{
                if(remCl===cl){
                    target.classList.remove(cl);
                }
            });
        });
        for ( const key of Object.keys(target.style)){
            for(const [key1,value1] of Object.entries(cssStyle)){
                if(key===key1){
                    target.style[key]=value1;
                }else if(key==="marginBlock"){
                    target.style.marginBlock="1rem";
                }else if(key==="overflow-y"){
                    target.style.overflowY="none";
                }else if (key==="height" && node !=="img"){
                    target.style.height="auto";
                }else if(key==="overflow-x"){
                    target.style.overflowX="none";
                }
            }
        }
     return {isNextLevel:check,arr:nextLevelArr}
    };



    static sleep({time}:{time:number}): Promise<number>{
        return Promise.resolve(time) as Promise<number>;
    };


    async getUserInfo(item:{parent:HTMLElement,user:userType|null}): Promise<{user:userType,parent:HTMLElement,container:HTMLElement}|undefined>{
        const {parent,user}=item;
        if(!user) return;
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        Header.cleanUpByID(parent,"getUserInfo-displayBlog-user-container");
        parent.style.position="relative";
        const container=document.createElement("div");
        container.className="position-relative";
        container.id="getUserInfo-displayBlog-user-container";
        container.style.cssText="margin-inline:auto;margin-block:1.25rem;display:flex;align-items:center;justify-content:space-around;flex-wrap:wrap;background-color:white;border-radius:11px;padding-block:1.5rem;padding-inline:1.25rem;box-shadow:1px 1px 12px 2px #10c7e9ab,-1px -1px 12px 1px #10c7e9ab;width:100%;padding-inline:1rem;";
        container.style.width="100%";
        container.style.paddingInline=less900 ? (less400 ? "1rem" :"1.5rem" ) : "2rem";
        const img=document.createElement("img");
        const maximgwidth=175;
        img.style.cssText=`max-width:${maximgwidth}px;max-height:${maximgwidth}px;border-radius:50%;aspect-ratio: 1 / 1;box-shadow:1px 1px 10px 1px black;float:left;flex:1 0 40%; `;
        img.style.flex=less900 ? (less400 ? "auto":"1 0 50%"):"1 0 40%";
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
        subContainer.style.cssText="display:flex;justify-content:center;flex-direction:center;align-items:center;gap:0.5rem;min-height:175px;";
        subContainer.style.flex=less900 ? (less400 ? "auto":"1 0 50%"):"1 0 60%";
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
            li2.style.cssText="color:blue;font-weight:bold";
            const span=document.createElement("span");
            span.id="user-bio-text";
            span.style.cssText="width:100%;padding:0.5rem;text-wrap:pretty;color:black;font-weight:normal;font-family:'Poppins-Regular';height:auto;";
            span.textContent=user?.bio || "no bio";
            const smallText=new Text("user's BIO:")
            li2.appendChild(smallText);
            li2.appendChild(span);
            li2.style.display=user.bio ? "block":"none";
            li2.style.width="100%";
            li1.style.display="flex";
            li2.style.display="flex";
            li2.style.flexWrap="wrap";
            ulCont.appendChild(li2);
            subContainer.appendChild(ulCont)
            container.appendChild(subContainer);
        
            parent.appendChild(container);
        return Promise.resolve({user,parent,container}) as Promise<{user:userType,parent:HTMLElement,container:HTMLElement}>;
                
          
    };

}
export default PrintPdf;
export const removeStyles=PrintPdf.removeStyles;
export const sleep=PrintPdf.sleep;
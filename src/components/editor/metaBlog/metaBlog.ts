import {blogType, gets3ImgKey} from "../Types";
import ModSelector from "@/components/editor/modSelector";
import { FaCreate } from "../../common/ReactIcons";
import { FaCrosshairs } from "react-icons/fa";
import Misc from "@/components/common/misc/misc";
import Service from "@/components/common/services";
import Nav from "../../nav/headerNav";
import Header from "../header";
import styles from "./metaBlog.module.css";


class MetaBlog{
    logo:string;
    constructor(private _modSelector:ModSelector,private _service:Service,private _blog:blogType){
        this.logo="/images/gb_logo.png";
    };

    //GETTER SETTERS----//
    get blog(){
        return this._blog;
    };
    set blog(blog:blogType){
        this._blog=blog;
    }
    //GETTER SETTERS----//




    async metablog({grandParent,parent,blog,type,func}:{grandParent:HTMLElement|null,parent:HTMLElement,blog:blogType,type:string,func:(blog:blogType)=>Promise<void>|void}){
        this.blog={...blog};
        //USER MUST BE LOGGED-IN!!!
        ///check to see if blog.selectors & blog.elements exit=>if not then get it from api and then save=>_service. promsaveitems(blog).then()
        Header.cleanUpByID(parent,"popup-main-metablog");
        // console.log("metaBlog: blog",_blog)
        const popup=document.createElement("div");
        popup.id="popup-main-metablog";
        popup.className=styles.metablogPopup;
        if(type==="profile"){
            popup.style.inset="10% 10% auto 10%";
        }else{
            popup.style.inset="0% 10% auto 10%";
            popup.style.boxShadow="1px 1px 12px 1px black";

        }
        popup.className="popup";
        const container=document.createElement("div");
        container.id="popup-main-metablog-container";
        container.className=styles.metablogInnerCont;
        const title=document.createElement("h4");
        title.id="title-metablog";
        title.setAttribute("contenteditable","true");
        title.className="display-4 text-primary";
        title.textContent=blog.title ? blog.title : "title";
        container.appendChild(title);
        const paraShape=document.createElement("p");
        paraShape.className=styles.paraShape;
        paraShape.id="metablog-parashape";
        paraShape.setAttribute("contenteditable","true");
        const tempDesc= "EDIT HERE " + Misc.wordGen(80).join("");
        const text=new Text(blog.desc || tempDesc);
        const img=document.createElement("img");
        paraShape.appendChild(img);
        paraShape.appendChild(text);
        img.id="meta-image";
        if(blog.imgKey){
            const gets3= await this._service.getSimpleImg(blog.imgKey) as gets3ImgKey|null;
            if(gets3){
                const {img:image}=gets3;
                img.src=image;
                img.alt="www.ablogroom.com"
            }
        }else{
            img.src="/images/gb_logo.png";
            img.alt="www.ablogroom.com";

        }
        if(this.blog.attr==="square"){
            img.style.borderRadius="12px";
            img.style.shapeOutside="square()";
        }else if(this.blog.attr==="circle"){
            img.style.borderRadius="50%";
            img.style.aspectRatio="1 / 1";
            img.style.shapeOutside="circle(50%)";
        }
        
    
        container.appendChild(paraShape);
      
        const formDivider=document.createElement("div");
        formDivider.id="formDivider";
        formDivider.style.cssText="margin-inline:auto;display:flex;justify-content:center;align-items:center;gap:1.5rem;"
        const {select}=this.imageShape({parent:formDivider,image:img,blog:this.blog});
        select.onchange=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                const image=document.querySelector("img#meta-image") as HTMLImageElement;
              
                if(value==="square"){
                    img.style.borderRadius="12px";
                    img.style.aspectRatio="";
                    this.blog={...this.blog,attr:"square"};
                    Misc.blurIn({anchor:img,blur:"12px",time:400});
                }else if(value==="circle"){
                    img.style.borderRadius="50%";
                    img.style.aspectRatio="1 / 1";
                    this.blog={...this.blog,attr:"circle"};
                    Misc.blurIn({anchor:img,blur:"12px",time:400});
                }
                
            }
        };
       await this.fileUploader({container:formDivider,img:img,blog:this.blog,paraShape}).then(async(res)=>{
        if(res){
             res.form.onsubmit=async(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    const formdata=new FormData(e.currentTarget as HTMLFormElement);
                    const file=formdata.get("file") as File;
                    if(file){
                        const filename=file.name;
                        const getImg=res.paraShape.querySelector("img#meta-image") as HTMLImageElement;
                        const imgurl=URL.createObjectURL(file);
                        res.img.src=imgurl;
                        Misc.blurIn({anchor:res.img,blur:"20px",time:700});
                        const {Key}=this._service.generateImgKey(formdata,res.blog) as {Key:string};
                        res.img.setAttribute("data-img-key",Key);
                        res.img.setAttribute("level","blog");
                        this.blog={...this.blog,imgKey:Key};
                        
                     const s3ImgKey=  await this._service.simpleImgUpload(container,formdata);
                     if(s3ImgKey){
                        res.img.src=s3ImgKey.img;
                        res.img.alt=filename;
                        this.blog={...this.blog,imgKey:s3ImgKey.Key};
                     const _blog=   await this._service.updateBlogMeta(this.blog);
                     if(_blog){
                        this._modSelector.blog={...this.blog,id:_blog.id};
                        this.blog={...this.blog,id:_blog.id};
                        Misc.message({parent:container,type_:"success",msg:"uploaded",time:600});
                        getImg.setAttribute("data-img-key",s3ImgKey.Key);
                    }
                    }
                    }
                }
            };
        }
       });
    //   //has no key
        paraShape.oninput=(e:Event)=>{
            if(e){
                const paraValue=(e.currentTarget as HTMLParagraphElement).textContent;
                if(paraValue){
                    this.blog={...this.blog,desc:paraValue}
                    blog=this.blog
                }
            }
        };
        title.oninput=(e:Event)=>{
            if(e){
                const paraValue=(e.currentTarget as HTMLParagraphElement).textContent;
               
                if(paraValue){
                    this.blog={...this.blog,title:paraValue};
                    blog=this.blog
                }
            }
        };
        const {button:save}=Misc.simpleButton({anchor:container,type:"button",bg:Nav.btnColor,color:"white",text:"save",time:400});
        save.onclick=async(e:MouseEvent)=>{
            if(e){

               await this._service.updateBlogMeta(this.blog).then(async(res)=>{
                    if(res){
                        this.blog={...this.blog,id:res.id};
                        this._modSelector.blog={...this.blog};
                        localStorage.setItem("blog",JSON.stringify(this._modSelector.blog));
                        if(grandParent){
                        Misc.message({parent:grandParent,type_:"success",msg:"saved",time:600});
                        Misc.growOut({anchor:parent,scale:0,opacity:0,time:400});
                        
                            setTimeout(()=>{
                                grandParent.removeChild(parent);
                            },390);

                        
                        }else{
                            Misc.message({parent,type_:"success",msg:"saved",time:600});
                        Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                     
                        }
                        func(this.blog);
                    };
                });
                
            };
        
        };

        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        
        container.appendChild(formDivider);
        popup.appendChild(container);
        popup.style.inset=less900 ? (less400 ? "10% 0% auto 0%":"10% 5% auto 5%"):"10% 5% auto 5%";
        this.removeChild(parent,popup);
        parent.appendChild(popup);
        Misc.fadeIn({anchor:popup,xpos:100,ypos:100,time:400});
       

    };


    removeChild(parent:HTMLElement,target:HTMLElement){
       
        const popup=document.createElement("div");
        popup.id="del-metablog-element";
        popup.className="popup";
        popup.style.cssText="background-color:black;color:white;display:flex;flex-direction:column;justify-content:center;align-items:center;position:absolute;height:26px;width:26pxborder-radius:50%;box-shadow:1px 1px 12px 1px black;top:0%;right:0%;transform:translate(-16px,8px);"
        FaCreate({parent:popup,name:FaCrosshairs,cssStyle:{width:"100%",fontSize:"22px",margin:"auto",color:"white"}});
        target.appendChild(popup);
        popup.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:target,xpos:100,ypos:50,time:400});
                setTimeout(()=>{parent.removeChild(target)},368);
            }
        };
    };



    imageShape(item:{parent:HTMLElement,image:HTMLImageElement,blog:blogType}):{select:HTMLSelectElement}{
        const {parent,blog}=item;
        const _blog=blog;
        const css="display:flex;justify-content:center;flex-direction:column;align-items:center;gap:1rem;border-radius:inherit;"
        const container=document.createElement("div");
        container.id="container-main-imageShape";
        container.style.cssText="margin:auto;background:white;display:flex;flex-direction:column;align-items:center;position:relative;margin bottom:3rem;background-color:white;border-radius:12px;font-size:18px;z-index:2;padding:1rem;box-shadow:1px 1px 12px 1px black;";
        
        container.style.boxShadow="1px 1px 12px 1px black";
        container.className="imageShape";
        const selects:{name:string,value:string}[]=[{name:"select",value:"select"},{name:"square",value:"square"},{name:"circle",value:"circle"}]
        const {select,label,formGrp}=Misc.selectComponent({parent:container,name:"image shape",cssStyle:{background:"black",color:"white"},selects});
        label.textContent="blog cover image shape";
        formGrp.style.cssText=css;
        parent.appendChild(container);
        return {select}
    };


   async fileUploader({container,blog,img,paraShape}:{container:HTMLElement,img:HTMLImageElement,blog:blogType,paraShape:HTMLParagraphElement}){
        const form=document.createElement("form");
        form.id="metablog-form";
        form.style.cssText="display:flex;flex-direction:column;align-items:center;gap:1rem;border-radius:12px;box-shadow:1px 1px 12px 1px;margin-block:2.25rem;margin-inline:auto;"
        const {input:file,label,formGrp}=Nav.inputComponent(form);
        formGrp.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:center;gap:1rem;border-radius:12px;box-shadow:1px 1px 12px 1px;";
        label.textContent="image upload";
        file.type="file";
        file.name="file";
        file.id="metablog-file";
        label.setAttribute("for",file.id);
        const {button:submit}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"white",text:"submit",type:"submit",time:400});
        submit.disabled=true;
        file.onchange=(e:Event)=>{
            if(e){
                submit.disabled=false;
            }
        };
        container.appendChild(form);
        return Promise.resolve({container,form,blog,img,paraShape}) as Promise<{container:HTMLElement,form:HTMLFormElement,blog:blogType,img:HTMLImageElement,paraShape:HTMLParagraphElement}>
        
    };



   async finalMeta({parent,blog,type}:{parent:HTMLElement,blog:blogType,type:string}){
    Header.cleanUpByID(parent,"popup-main-metablog");
        // console.log("metaBlog: blog",_blog)
        const popup=document.createElement("div");
        popup.id="popup-main-metablog";
        popup.className=styles.metablogFinalePopup;
        if(type==="profile"){
            popup.style.inset="10% 10% auto 10%";
        }else{
            popup.style.inset="0% 10% auto 10%";
            popup.style.boxShadow="1px 1px 12px 1px black";

        };
        popup.classList.add("popup");
        const container=document.createElement("div");
        container.id="popup-main-metablog-container";
        container.className=styles.metablogFinaleInner;
        const title=document.createElement("h4");
        title.id="title-metablog";
        title.setAttribute("contenteditable","false");
        title.className="display-4 text-primary";
        title.textContent=blog.title ? blog.title : "title";
        container.appendChild(title);
        const paraShape=document.createElement("p");
        paraShape.className=styles.paraShapeFinale;
        paraShape.id="metablog-parashape";
        paraShape.setAttribute("contenteditable","false");
        const text=new Text(blog.desc || "description");
        const img=document.createElement("img");
        paraShape.appendChild(img);
        paraShape.appendChild(text);
        if(blog.imgKey){
            const gets3= await this._service.getSimpleImg(blog.imgKey) as gets3ImgKey|null;
            if(gets3){
                const {img:image}=gets3;
                img.src=image;
                img.alt="www.ablogroom.com";
            }
        }else{
            img.src="./images/gb_logo.png";
            img.alt="www.ablogroom.com"
        };
        if(blog.attr==="square"){
            img.style.borderRadius="8px";
            img.setAttribute("data-shapeOutside","square()");
            img.style.shapeOutside="square()";
        }else{
            img.style.borderRadius="50%";
            img.setAttribute("data-shapeOutside","circle()");
            img.style.shapeOutside="circle()";
        }
       
        popup.appendChild(paraShape);
        parent.appendChild(popup);
        Header.removePopup({parent,target:popup,position:"right"});
    };

   

}
export default MetaBlog;
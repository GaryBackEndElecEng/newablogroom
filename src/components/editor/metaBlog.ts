import {blogType, gets3ImgKey} from "./Types";
import ModSelector from "@/components/editor/modSelector";
import { FaCreate } from "../common/ReactIcons";
import { FaCrosshairs } from "react-icons/fa";
import Misc from "@/components/common/misc";
import Service from "@/components/common/services";
import Nav from "../nav/headerNav";
import Header from "./header";


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
        this.blog=blog;
        //USER MUST BE LOGGED-IN!!!
        ///check to see if blog.selectors & blog.elements exit=>if not then get it from api and then save=>_service. promsaveitems(blog).then()
        Header.cleanUpByID(parent,"popup-main-metablog");
        // console.log("metaBlog: blog",_blog)
        let blogImg=blog?.img || "/images/gb_logo.png";
        if(blog.imgKey){
            const gets3= await this._service.getSimpleImg(blog.imgKey) as gets3ImgKey|null;
            if(gets3){
                const {img}=gets3;
                blogImg=img;
            }
        }
        const popup=document.createElement("div");
        popup.id="popup-main-metablog";
        popup.style.cssText="margin:auto;background:white;display:flex;flex-direction:column;align-items:center;position:absolute;margin bottom:3rem;overflow-y:scroll;background-color:white;border-radius:12px;font-size:18px;z-index:200;";
        if(type==="profile"){
            popup.style.inset="10% 10% 20% 10%";
        }else{
            popup.style.inset="0% 10% 10% 10%";
            popup.style.boxShadow="1px 1px 12px 1px black";

        }
        popup.className="popup";
        const container=document.createElement("div");
        container.id="popup-main-metablog-container";
        container.style.cssText="width:100%;position:relative;padding:1rem;margin-block:1.5rem;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:flex-start; gap:1rem;";
        const title=document.createElement("h4");
        title.id="title-metablog";
        title.style.cssText="display:flex;flex-direction:row;flex-wrap:wrap;position:relative;justify-content:space-around;align-items:center;margin-block:1rem;gap:2rem;";
        title.setAttribute("contenteditable","true");
        title.className="display-4 text-primary";
        title.textContent=blog.title ? blog.title : "title";
        container.appendChild(title);
        const paraShape=document.createElement("p");
        paraShape.style.cssText="padding-inline:1.25rem;margin-block:1rem;width:auto;padding-block:1rem;margin-inline:auto;max-width:600px;line-height:2.25rem;";
        paraShape.id="metablog-parashape";
        paraShape.setAttribute("contenteditable","true");
        const img=document.createElement("img");
        img.id="meta-image";
        img.style.cssText="filter:drop-shadow(0 0 0.75rem #0039a6);width:clamp(175px,220px,300px);float:left;margin-right:1rem;margin-bottom:1rem;box-shadow:1px 1px 12px 1px black;";
        if(blog.attr==="square"){
            img.style.borderRadius="12px";
            img.style.shapeOutside="square()";
        }else if(blog.attr==="circle"){
            img.style.borderRadius="50%";
            img.style.aspectRatio="1 / 1";
            img.style.shapeOutside="circle(50%)";
        }
        img.src=blogImg;
        img.alt="www.ablogroom.com";
        img.id="img-metablog";
        paraShape.appendChild(img);
        const tempDesc= "EDIT HERE " + Misc.wordGen(80).join("");
        paraShape.innerHTML+=blog.desc || tempDesc;
        container.appendChild(paraShape);
        const formDivider=document.createElement("div");
        formDivider.id="formDivider";
        formDivider.style.cssText="margin-inline:auto;display:flex;justify-content:center;align-items:center;gap:1.5rem;"
        const {select}=this.imageShape({parent:formDivider,image:img,blog});
        select.onchange=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                const image=document.querySelector("img#img-metablog") as HTMLImageElement;
              
                if(value==="square"){
                    image.style.borderRadius="12px";
                    image.style.aspectRatio="";
                    blog={...blog,attr:"square"};
                    Misc.blurIn({anchor:image,blur:"12px",time:400});
                }else if(value==="circle"){
                    image.style.borderRadius="50%";
                    image.style.aspectRatio="1 / 1";
                    blog={...blog,attr:"circle"};
                    Misc.blurIn({anchor:image,blur:"12px",time:400});
                }
                this.blog=blog
            }
        };
       await this.fileUploader({container:formDivider,img:img,blog,paraShape}).then(async(res)=>{
        if(res){
             res.form.onsubmit=async(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    const formdata=new FormData(e.currentTarget as HTMLFormElement);
                    const file=formdata.get("file") as File;
                    if(file){
                        const filename=file.name;
                        const getImg=res.paraShape.querySelector("img#img-metablog") as HTMLImageElement;
                        const imgurl=URL.createObjectURL(file);
                        getImg.src=imgurl;
                        Misc.blurIn({anchor:res.img,blur:"20px",time:700});
                        const {Key}=this._service.generateImgKey(formdata,res.blog) as {Key:string};
                        getImg.setAttribute("data-img-key",Key);
                        getImg.setAttribute("level","blog");
                        res.blog={...res.blog,imgKey:Key};
                        this.blog=res.blog;
                     const s3ImgKey=  await this._service.simpleImgUpload(container,formdata);
                     if(s3ImgKey){
                        getImg.src=s3ImgKey.img;
                        getImg.alt=filename;
                        res.blog={...res.blog,imgKey:s3ImgKey.Key};
                     const _blog=   await this._service.updateBlogMeta(res.blog);
                     if(_blog){
                        this._modSelector.blog={...blog,id:_blog.id};
                        res.blog={...res.blog,id:_blog.id};
                        Misc.message({parent:container,type_:"success",msg:"uploaded",time:600});
                        blog=res.blog;
                        this.blog={...blog};
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
                        if(grandParent){
                        Misc.message({parent:grandParent,type_:"success",msg:"saved",time:600});
                        Misc.growOut({anchor:parent,scale:0,opacity:0,time:400});
                        setTimeout(()=>{
                            grandParent.removeChild(parent);
                        },390);
                        }else{
                            Misc.message({parent,type_:"success",msg:"saved",time:600});
                        Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                        setTimeout(()=>{
                            parent.removeChild(popup);
                        },390);
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
        popup.style.inset=less900 ? (less400 ? "10% 0% 0% 0%":"10% 5% 20% 5%"):"10% 5% 20% 5%";
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
    }

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
        
    }

}
export default MetaBlog;
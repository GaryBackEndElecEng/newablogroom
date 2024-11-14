import Blogs from "../blogs/blogsInjection";
import Misc from "../common/misc";
import Service from "../common/services";
import { imageLoader } from "../common/tsFunctions";
import Header from "../editor/header";
import ModSelector from "../editor/modSelector";
import { postType, userType } from "../editor/Types";
import Nav from "../nav/headerNav";



class PostDetail{
    _poster:userType;
    userPic:string;
    postLogo:string;
    logo:string;
    injector:HTMLElement|null;
    constructor(private _modSelector:ModSelector,private _service:Service){
        this.injector=document.querySelector("section#postdetail") as HTMLElement;
        this.postLogo="/images/posts.png";
        this.logo="/images/gb_logo.png";
        this.userPic="/images/userpic.png";
    }
    get poster(){
        return this._poster;
    }
    set poster(poster:userType){
        this._poster=poster;
    }

   async main(item:{injector:HTMLElement,post:postType,count:number,poster:userType,isPage:boolean}):Promise<number>{
        const {injector,post,poster,count,isPage}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        Header.cleanUpByID(injector,`postdetail-main-container`);
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;color:inherit;border-radius:inherit;";
        const shapoutside="padding:1rem;text-wrap:wrap;color:black;font-family:'Poppins-Thin';font-weight:bold;font-size:120%;line-height:2.05rem;color:inherit;border-radius:12px;box-shadow:1px 1px 12px white;"
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.27rem;color:inherit;border-radius:inherit;";
        const container=document.createElement("div");
        container.id="postdetail-main-container";
        container.style.cssText=css_col + "background-color:black;color:white;font-family:'Poppins-Regular';position:realtive;";
        if(!isPage){
            injector.style.position="relative;";
            const parent=injector.parentElement;
            container.style.position="absolute";
            container.style.zIndex="200";
            container.style.top="0%";
            container.style.left=less900 ? (less400 ? "0%" :"-2.5%"): "-50%";
            container.style.right=less900 ? (less400 ? "0%" :"-2.5%"): "-50%";
            container.style.maxWidth=less900 ? (less400 ? "375px" :"800px"): "auto";
            container.style.width=less400 ? "100%":"auto";
        }else{
            this.injector=injector as HTMLElement;
            container.style.width="100%";
        }
       
        const card=document.createElement("div");
        card.id=`posts-postcard-card-${post.id}`;
        card.style.cssText=css_col + "border-radius:12px;box-shadow:1px 1px 5px 1px white;gap:1rem;";
        const title=document.createElement("p");
        title.id=`posts-card-title-${post.id}`;
        title.className="post-title";
        
        title.textContent=post.title;
        card.appendChild(title);
        const shapeOutside=document.createElement("p");
        shapeOutside.id=`posts-shapeOutside-${post.id}`;
        shapeOutside.style.cssText=window.innerWidth <400 ? shapoutside + css_col :shapoutside;
        const img=document.createElement("img");
        img.id=`posts-shapeOutside-img-${post.id}`;
        img.style.cssText="border-radius:50%;shape-outside:circle(50%);float:left;margin-right:1.25rem;margin-bottom:2rem;aspect-ratio:1/1;filter:drop-shadow(0 0 0.75rem white);border:none;";
        img.style.filter="drop-shadow(0 0 0.75rem white) !important";
        img.style.width=window.innerWidth <900 ? (window.innerWidth <400 ? "300px" : "310px") :"355px";
        const widthConv=parseInt(img.style.width.split("px")[0]) as number;
        if(post.image){
            img.src=imageLoader({src:post.image,width:widthConv,quality:75});
            img.alt="www.ablogroom.com";
            shapeOutside.appendChild(img);
            Misc.blurIn({anchor:img,blur:"20px",time:700});
            shapeOutside.innerHTML+=post.content ? post.content : "";
        }else if(post.imageKey){
            await this._service.getSimpleImg(post.imageKey).then(async(res)=>{
                if(res){
                    img.src=res.img;
                    img.alt=res.Key;
                    shapeOutside.appendChild(img);
                    Misc.blurIn({anchor:img,blur:"20px",time:700});
                    shapeOutside.innerHTML+=post.content ? post.content : "";
                }
            });
        }else{
            img.src=imageLoader({src:this.postLogo,width:widthConv,quality:75});
             img.alt="www.ablogroom.com";
            shapeOutside.appendChild(img);
            Misc.blurIn({anchor:img,blur:"20px",time:700});
            shapeOutside.innerHTML+=post.content ? post.content : "";
        }
        card.appendChild(shapeOutside);
        const cardBody=document.createElement("div");
        cardBody.style.cssText=css_col + "gap:0rem;width:100%;box-shadow:1px 1px 3px 1px white;border-radius:inherit;";
        const link=document.createElement("a");
        link.id="card-link";
        link.style.cssText="margin-inline:auto;margin-block:1rem;"
        const date=document.createElement("small");
        date.style.cssText="padding-inline:1rem;margin-inline:auto;";
        date.textContent= post.date ? Blogs.tolocalstring(post.date):"no date";
        cardBody.appendChild(date);
        this.showPoster({parent:card,poster});
        if(!isPage){
            const {button:btnClose}=Misc.simpleButton({anchor:card,text:"close",type:"button",bg:Nav.btnColor,color:"white",time:400});
            btnClose.onclick=(e:MouseEvent)=>{
                if(e){
                    Misc.fadeOut({anchor:container,xpos:30,ypos:100,time:400});
                    setTimeout(()=>{
                        injector.removeChild(container);
                    },390);
                }
            };
            
        }
        
        card.appendChild(cardBody);
        container.appendChild(card);
        injector.appendChild(container);
        if(!isPage){
            Misc.fadeIn({anchor:container,xpos:30,ypos:100,time:400});
        }
        return new Promise(resolver=>{
            resolver(count + 1)
        }) as Promise<number>;
    }
    showPoster(item:{parent:HTMLElement,poster:userType}){
        const {parent,poster}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        if(!(poster && poster.id)) return;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.7rem;color:inherit;border-radius:inherit;width:100%";
        const shapoutside="padding:1rem;text-wrap:wrap;color:black;font-family:'Poppins-Thin';font-weight:bold;font-size:120%;line-height:2.05rem;color:inherit;border-radius:12px;box-shadow:1px 1px 12px white;"
        const css_row="margin-inline:auto;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.27rem;color:inherit;border-radius:inherit;";
       
        Header.cleanUpByID(parent,"showPoster-user-container");
        parent.style.position="relative";
        const container=document.createElement("div");
        container.id="showPoster-user-container";
        container.style.cssText="margin-inline:auto;margin-block:1.25rem;display:flex;align-items:center;justify-content:space-around;flex-warp:wrap;background-color:white;border-radius:11px;padding-block:1.5rem;padding-inline:1.25rem;box-shadow:1px 1px 12px 2px #10c7e9ab,-1px -1px 12px 1px #10c7e9ab;";
        container.style.width=less900 ? (less400 ? "100%" :"85%" ) : "67%";
        container.style.paddingInline=less900 ? (less400 ? "1rem" :"1.5rem" ) : "2rem";
        const img=document.createElement("img");
        const maximgwidth=120;
        img.style.cssText=`max-width:${maximgwidth}px;border-radius:50%;aspect-ratio: 1 / 1;box-shadow:1px 1px 10px 1px black;float:left; `;
        if(poster.imgKey){
            this._service.getSimpleImg(poster.imgKey).then(async(res_)=>{
                if(res_){
                    console.log(res_.img)
                    img.src=res_.img;
                    img.alt=res_.Key;
                }
            });
        } else if(poster.image){
            img.src=poster.image ? poster.image: imageLoader({src:poster.image,quality:75,width:maximgwidth});
            img.alt=poster.name ? poster.name: "blogger";
        }else{
            img.src=imageLoader({src:this.userPic,quality:75,width:maximgwidth});
            img.alt="www.ablogroom.com";
        }
        Misc.blurIn({anchor:img,blur:"10px",time:600});
        container.appendChild(img);
        const innerContainer=document.createElement("div");
        innerContainer.style.cssText="display:flex;justify-content:center;flex-direction:center;align-items:center;gap:0.5rem;height:120px;overflow-y:scroll;"
        const ulCont=document.createElement("ul");
        ulCont.id="showinfo";
        ulCont.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:stretch;justify-content:center;";
        const text=document.createElement("h6");
        text.className="text-primary";
        text.innerHTML=poster.name ? `<span style="color:blue;text-decoration:underline;">name: </span><span>${poster.name}<span>`:"";
        text.style.textWrap="pretty";
        text.style.display=poster.name ? "block":"none";
        ulCont.appendChild(text);
        const li1=document.createElement("li");
        li1.innerHTML=poster.email ? `<span style="color:blue;text-decoration:underline;">email: </span><span>${poster.email}<span>`:"";
        li1.style.display=poster.email ? "block":"none";
        ulCont.appendChild(li1);
        const li2=document.createElement("li");
        li2.innerHTML=poster.bio ? `<span style="color:blue;text-decoration:underline;">bio: </span><span>${poster.bio}<span>`:"";
        li2.style.display=poster.bio ? "block":"none";
        li1.style.display="flex";
        li1.style.flexWrap="wrap";
        li2.style.display="flex";
        li2.style.flexWrap="wrap";
        ulCont.appendChild(li2);
        innerContainer.appendChild(ulCont)
        container.appendChild(innerContainer);
        
        parent.appendChild(container);
    }
};
export default PostDetail;
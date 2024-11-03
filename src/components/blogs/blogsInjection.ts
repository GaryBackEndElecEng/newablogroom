import {blogType} from "@/components/editor/Types";
import { slateColors } from "../editor/main";
import DisplayBlog from "@/components/blog/displayBlog";
import ModSelector from "@/components/editor/modSelector";
import {  buttonReturn, imageLoader } from "../common/tsFunctions";
import Misc from "../common/misc";
import Service from "../common/services";
import Header from "../editor/header";
import { FaCreate } from "../common/ReactIcons";
import { BsHandThumbsUpFill } from "react-icons/bs";
import AllMsgs from "../home/allMsgs";
import Message from "../common/message";

const base_url="http://localhost:3000";
// const base_url=process.env.BASE_URL as string;

class Blogs{
    bendImg:string="/images/bend.png";
    bendImg1:string="/images/bend1.png";
    static text=`<span>sorry there are no blogs just yet. Be the first to create a blog.</span><span> We garrantee data preservation, with the following advantage:</span>
    <ul> <pre>
   <li style="text-wrap:wrap;"> You can create your own flamboyant poster and or design</li>
   <li style="text-wrap:wrap;"> Your post and or poster are small format compatible, meaning you can print your site as a blog or web-site and or poster fitting ( smat phone and or Ipad format)</li>
   <li style="text-wrap:wrap;"> its absolutely free with tight security protocol to protect your information.</li>
   </pre>
   </ul>
   <blockquote>
   <pre style="font-style:italic"> "to create is to learn and grow",,, <span style="font-size:22px;font-weight:bold">try it out</span><span style="color:red;font-weight:bold;font-size:30px;margin-right:1rem;">!</span></pre>
   </blockquote>
   <prev> yours truly Gary Wallace</prev>`
    baseUrl:string;
    bgColor:string;
    static bg_color:string="#34282C"
    gbLogo:string;
    logo:string;
_blogs:blogType[];
_blog:blogType;
allMsgs:AllMsgs;
message:Message
    constructor( private _modSelector:ModSelector,private _service:Service){
        this.baseUrl=base_url
       this.gbLogo=`${base_url}/images/gb_logo.png`;
       this.logo=`gb_logo.png`;
       this._blogs=[] as blogType[];
        this._blog={} as blogType;
       this.bgColor=this._modSelector._bgColor;
       this.message=new Message(this._modSelector,this._service,this._modSelector.blog);
        this.allMsgs=new AllMsgs(this._modSelector,this._service,this.message);
    }

    //GETTERS SETTERS
    set blogs(blogs:blogType[]){
        this._blogs=blogs;
        this._modSelector.blogs=blogs;
    }
    get blogs(){
        return this._blogs;
    }
    set blog(blog:blogType){
        this._blog=blog;
        this._modSelector._blog=blog;
    }
    get blog(){
        return this._blog;
    }

   async awaitBlogs(blogs:blogType[]){
        const promiseBlog=new Promise((resolve,reject)=>{
            resolve(blogs as blogType[]);
            reject("could not find item")
        });
        return promiseBlog as Promise<blogType[]>
    }
//GETTERS SETTERS
//main injector ---MAIN INJECTION----
   async showBlogs(parent:HTMLElement,home:boolean,blogs:blogType[]){
    const css_col="display:flex;flex-direction:column;align-items:center;gap:1rem;position:relative;width:100%";
    const css_row="display:flex;justify-content:center;align-items:center;gap:1.25rem;position:relative;";
    this.baseUrl=new URL(window.location.href).origin;
    this.blogs=blogs;
    Header.cleanUp(parent);
    const m_block= window.innerWidth < 500 ? "0rem" : "0.25rem";
        parent.style.position="relative";
        parent.classList.add("container-fluid");
        parent.classList.add("mx-auto");
        const container=document.createElement("section");
        container.className="blogs-container";
        container.id="blogs-container";
        container.classList.add("container");
        container.classList.add("mx-auto");
        container.style.cssText=css_col;
        container.style.marginBlock=`${m_block}`;
        container.style.marginInline=window.innerWidth < 900 ? "0px":"auto";
        container.style.paddingInline=window.innerWidth < 900 ? "0px":"2rem";
        const text=document.createElement("h3");
        text.style.cssText="margin-bottom:1.62rem;"
        if(home){
            text.textContent="top Blogs";
        }else{
            text.textContent="Articles && Blogs";
        }
        text.className=` text-center text-primary my-2 mb-4 mx-auto lean display-3`;
        const div1=document.createElement("div");
        div1.style.cssText="margin-inline:auto;width:85%;height:3px;background-color:#0804e9;";
        const div2=document.createElement("div");
        div2.style.cssText="margin-block;margin-inline:auto;width:55%;height:3px;background-color:#0804f9;";
        container.appendChild(text);
        container.appendChild(div1);
        container.appendChild(div2);
        await this.generateBlogs(container,this.blogs)
            
            parent.appendChild(container);
        
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"paddingInline":"0rem"}});
        Misc.matchMedia({parent:container,maxWidth:500,cssStyle:{"borderRadius":"16px",border:"1px solid #0E3386"}});
    }
   async generateBlogs(parent:HTMLElement,blogs:blogType[]){
       Header.cleanUpByID(parent,"showBlogs-generateBlogs-mainRow")
        if(blogs && blogs.length>0){
            const mainRow=document.createElement("div");
            mainRow.id="showBlogs-generateBlogs-mainRow";
            const blogBaseCss=`display:flex; justify-content:center;flex-direction:column;padding-inline:0.25rem;gap:2.5rem;margin-top:2rem;position:relative;`;
                mainRow.style.cssText=blogBaseCss;
                mainRow.style.paddingInline=window.innerWidth <900 ? (window.innerWidth <600 ? "0px":"10px"):"1rem";
                // mainRow.style.backgroundColor="#e7e8ee";
                mainRow.style.backgroundColor="whitesmoke";
                mainRow.style.borderRadius="16px";
            
                await Promise.all(
                    blogs && blogs.sort((a,b)=>{if(a.rating > b.rating) return -1; return 1}).
                        sort((a,b)=>{if(a.update > b.update) return -1; return 1}).map(async(blog,index)=>{
                    const colBlog=document.createElement("div");
                    colBlog.style.cssText=blogBaseCss;
                    colBlog.className=`text-center`;
                    colBlog.id="showBlogs-generateBlogs-mainRow-colBlogs";
                    colBlog.style.color=`#00008B`;
                    if(index%2===0){
                        colBlog.style.backgroundImage=`url(${this.bendImg})`;

                    }else{
                        colBlog.style.backgroundImage=`url(${this.bendImg1})`;
                    }
                    colBlog.style.paddingInline=window.innerWidth <900 ? (window.innerWidth <600 ? "0px":"10px"):"1rem";
                    colBlog.style.marginBlock=window.innerWidth <400 ? "1rem":"0.5rem";
                    colBlog.style.borderRadius=`inherit`;
                    colBlog.style.backgroundSize=`100% 100%`;
                    colBlog.style.backgroundPosition=`50% 50%`;
                    colBlog.style.boxShadow=`1px 1px 4px 1px #0aa2db,-1px -1px 4px 1px #0aa2db`;
                    await this.displayCard(colBlog,blog);
                    await this.allMsgs.blogMsgs({col:colBlog,blog});
                    const {button:btn}=Misc.simpleButton({anchor:colBlog,text:"view details",bg:"#0C090A",color:"white",type:"button",time:400});
                    btn.id="showBlogs-generateBlogs-btn";
                    btn.style.marginBottom="1rem";
                    colBlog.appendChild(btn);
                    mainRow.appendChild(colBlog);
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            const blogUrl=new URL(`/blog/${blog.id}`,this.baseUrl);
                            window.location.href=blogUrl.href; //going to page
                            // this.blog=blog;//feeds it to Mod
                            // this._displayBlog.main(parent);
                        }
                    });
                   
                }));
            
            parent.appendChild(mainRow)
        }else{
            
            Blogs.noBlogs(parent);
        }
    }
    async displayCard(column:HTMLElement,blog:blogType){
        const flex_between= window.innerWidth < 500 ? "center" : "space-between";
        column.style.position="relative";
        const card=document.createElement("div");
        card.className="displayCard-card";
        card.id="displayCard-card";
        card.style.cssText=`width:auto;display:flex; flex-direction:row !important;flex-wrap:nowrap;justify-content:${flex_between};align-items:center;margin:auto;gap:1rem;margin:0;padding;width:100%;position:relative;border-radius:12px;font-family:'Poppins-Regular'`;
        card.style.flexDirection=window.innerWidth < 900 ? "column":"row";
        const textDiv=document.createElement("div");
        textDiv.id="displayCard-card-textDiv";
        textDiv.style.cssText="margin-inline:auto;margin-block:1rem;display:flex;flex-wrap:nowrap;gap:1.5rem;justify-content:center;align-items:center;width:auto;";
        const text=document.createElement("h6");
        text.id="displayCard-card-text";
        text.className="text-center  lean mt-2";
        text.style.cssText="color:rgb(7, 4, 125);text-decoration:underline;text-decoration-style:wavy;text-underline-offset:0.55rem;text-decoration-thickness:5%;text-transform:capitalize;";
        text.style.fontSize=window.innerWidth<900 ? (window.innerWidth<400 ? "120%" : "185%") : "230%";
        text.textContent=blog.title ? blog.title : " your title";
        textDiv.appendChild(text);
        Misc.thumbsUp({parent:textDiv,cssStyle:{fontSize:"22px",color:"rgba(8, 4, 249,0.5)",zIndex:"1"},time:400,rating:blog.rating,limit:3});
        column.appendChild(textDiv);
        const imgCont=document.createElement("div");
        imgCont.id="displayCard-card-imgCont";
        imgCont.className="imgCont col-md-6"
        imgCont.style.cssText="padding:0.75rem;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.65rem;";
        imgCont.style.flex="flex:1 1 33%";
        const small=document.createElement("small");
        small.id="displayCard-card-small";
        const date=document.createElement("span");
        date.id="displayCard-card-date";
        date.textContent= blog.date ? Blogs.tolocalstring(blog.date):"no date";
        small.textContent=blog.username ? blog.username : " blogger";
        const smallCont=document.createElement("div");
        smallCont.id="displayCard-card-smallCont";
        smallCont.style.cssText="display:flex;flex-wrap:wrap;align-items:center;gap:1rem;font-size:12px;";
        smallCont.appendChild(date);
        smallCont.appendChild(small);
        const img=document.createElement('img');
        img.id="displayCard-card-imgCont-img";
        img.className="";
        img.alt=`${blog.name}-www.ablogroom.com`;
        img.style.cssText="width:280px;filter:drop-shadow(0 0 0.25rem #0aa2db);background-color:#34282C;padding:5px;";
        if(blog.imgKey){
            await this._service.getSimpleImg(blog.imgKey).then(async(res)=>{
                if(res){
                    img.src=res.img as string;
                    img.alt="www.ablogroom.com";
                    if(blog.attr==="square"){
                        img.style.borderRadius="12px";
                        img.style.aspectRatio="";
                    }else if(blog.attr==="circle"){
                        img.style.borderRadius="50%";
                        img.style.aspectRatio="1 / 1";
                    }
                    Misc.blurIn({anchor:img,blur:"10px",time:600});
                }
           });
        }else{
            img.src=imageLoader({src:this.logo,quality:75,width:100});
            img.alt="www.ablogrrom.com";
            if(blog.attr==="square"){
                img.style.borderRadius="12px";
                img.style.aspectRatio="";
            }else if(blog.attr==="circle"){
                img.style.borderRadius="50%";
                img.style.aspectRatio="1 / 1";
            }
            Misc.blurIn({anchor:img,blur:"10px",time:600});
        }
        img.style.filter="drop-shadow(0 0 0.25rem #0aa2db)";
        imgCont.appendChild(img);
        imgCont.appendChild(smallCont);
        const cardBody=document.createElement("div");
        cardBody.id="cardBody";
        cardBody.className="C";
        cardBody.style.cssText=`padding-inline:5px;flex:1 1 auto;border-radius:6px;margin-inline:auto;`;
        cardBody.style.flex="1 1 67%";
        const update=document.createElement("small");
        update.style.cssText="margin-inline:auto;margin-block:0.5rem;margin-bottom:1rem;margin-bottom:1rem;";
        update.className="text-primary";
        update.textContent=blog.update ? `update: ${Blogs.tolocalstring(blog.date)}`:"no date";
        const desc=document.createElement("div");
        const descHeight=window.innerWidth < 900 ? (window.innerWidth <400 ? "20vh": "15vh") :"12vh";
        desc.id=`blog-desc-${blog.id}`;
        desc.textContent=blog.desc ? `${(blog.desc as string)}`:" no description";
        desc.style.cssText=`margin-inline:auto; padding:1.25rem; text-align:center; margin-block:1rem;border-radius:inherit;background-color:black;color:white;filter:none;box-shadow:1px 1px 12px 1px #0aa2db;height:${descHeight};overflow-y:scroll;text-wrap:pretty;`;
        if(blog.rating){
            const div=document.createElement("div");
            div.style.cssText="display:flex;justify-content:center;gap:1rem;align-items:center;cursor:none;";
            if(blog.rating > 2){
                const span=document.createElement("span");
                span.style.cssText="align-items:center;gap:1rem;width:fit-content;"
                FaCreate({parent:span,name:BsHandThumbsUpFill,cssStyle:{fontSize:"12px",color:"blue"}});
                span.innerHTML=`<span style="margin-block:1rem;margin-right:1rem;">:${blog.rating}</span>`;
                div.appendChild(span);
            }
            Misc.starRating({parent:div,rating:blog.rating,cssStyle:{fontSize:"18px",color:"yellow",backgroundColor:"#34282C",padding:"3px",borderRadius:"50%",cursor:"none"}});
            cardBody.appendChild(div);
        }
        card.appendChild(imgCont);
        cardBody.appendChild(desc);
        cardBody.appendChild(update);
        card.appendChild(cardBody);
        column.appendChild(card);
        Misc.matchMedia({parent:card,maxWidth:600,cssStyle:{flexDirection:"column"}});
        Misc.matchMedia({parent:cardBody,maxWidth:500,cssStyle:{flex:"1 1 100%"}});
        Misc.matchMedia({parent:imgCont,maxWidth:500,cssStyle:{flex:"1 1 100%"}});
       

    }
     static noBlogs(parent:HTMLElement){
        const container=document.createElement("section");
        container.style.cssText=`margin:auto;width:80%;padding-inline:1rem;padding-block:5rem;background-color:${Blogs.bg_color};color:white;border-radius:7px;position:relative;font-size:18px;`;
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"width":"100%","paddingInline":"5px;","marginBlock":"2rem","paddingBlock":"2rem","maxWidth":"700px"}});
        const innerCont=document.createElement("div");
        innerCont.style.cssText="padding:1rem;box-shadow:1px 1px 10px 1px white,-1px -1px 10px 1px whitesmoke;margin:auto;border-radius:inherit;width:100%;position:relative;";
        const para=document.createElement("p");
        para.style.cssText="margin:auto;padding:0.5remrem;text-wrap:wrap;font-family:'Playwrite'";
        para.innerHTML=Blogs.text;
        innerCont.appendChild(para);
        container.appendChild(innerCont);
        parent.appendChild(container);
        Misc.fadeIn({anchor:container,xpos:50,ypos:100,time:400});
        Misc.matchMedia({parent:container,maxWidth:800,cssStyle:{"maxWidth":"700px"}});
        Misc.matchMedia({parent:container,maxWidth:600,cssStyle:{"maxWidth":"500px"}});
        Misc.matchMedia({parent:container,maxWidth:460,cssStyle:{"maxWidth":"350px"}});

    }
    static slateColorAlways(index:number){
        const colors=slateColors();
        let count=index;
        const len=colors.length;
        if(count < len){
            return colors[count+2];
        }else{
            count=index-len;
            return colors[count +1]
        }
    }
    static removeCssAttribute(css:string){
        const arr=css.split(";").map(cl=>(cl.trim()));
        const arrClean:string[]=["max-width","width","max-height","height"];
        arrClean.forEach((rm)=>{
            const rmTrim=rm.split(":")[0].trim();
            arr.forEach((rmThis,index)=>{
                if(rmThis.startsWith(rmTrim)){
                    arr.splice(index,1);
                }
            });
        });
        return arr.join(";")
    }
    static tolocalstring(date:Date){
        if(date && typeof date ==="object"){
            const newDate=date.toLocaleString("en-US",{timeZone:"America/Toronto"});
            return newDate.split("T")[0];
        }else{
            return String(new Date())
        }
    }
    
   


}
export default Blogs;
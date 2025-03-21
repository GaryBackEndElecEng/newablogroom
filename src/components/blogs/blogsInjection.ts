import {blogType} from "@/components/editor/Types";
import { slateColors } from "../editor/main";
import ModSelector from "@/components/editor/modSelector";
import { imageLoader } from "../common/tsFunctions";
import Misc from "../common/misc";
import Service from "../common/services";
import Header from "../editor/header"
import { FaCreate } from "../common/ReactIcons";
import { BsHandThumbsUpFill } from "react-icons/bs";
import AllMsgs from "../home/allMsgs";
import Message from "../common/message";
import Searchbar from "../common/searchbar";



class Blogs{
    public bendImg:string="/images/bend.png";
    public bendImg1:string="/images/bend1.png";
    public static  text=`<span>sorry there are no blogs just yet. Be the first to create a blog.</span><span> We garrantee data preservation, with the following advantage:</span>
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
    public baseUrl:string;
    public bgColor:string;
    public static bg_color:string="#34282C"
    public gbLogo:string="/images/gb_logo.png";
    public logo:string="gb_logo.png";
    private _blogs:blogType[];
    private _blog:blogType;
    private allMsgs:AllMsgs;
    private message:Message;
    private searchbar:Searchbar;
   
    constructor( private _modSelector:ModSelector,private _service:Service){
        this.baseUrl=window.location.origin;
       this.gbLogo=`/images/gb_logo.png`;
       this.logo=`gb_logo.png`;
       this._blogs=[] as blogType[];
        this._blog={} as blogType;
       this.bgColor=this._modSelector._bgColor;
        this.allMsgs=new AllMsgs(this._modSelector,this._service,this.message);
        
    }

    //GETTERS SETTERS
    set blogs(blogs:blogType[]){
        this._blogs=blogs;
        
    }
    get blogs(){
        return this._blogs;
    }
    set blog(blog:blogType){
        this._blog=blog;
      
    }
    get blog(){
        return this._blog;
    }

   async awaitBlogs(blogs:blogType[]){
        this._blogs=blogs;
        const promiseBlog=Promise.resolve(blogs as blogType[]);
        return promiseBlog as Promise<blogType[]>
    }
//GETTERS SETTERS
//main injector ---MAIN INJECTION----
   async showBlogs({parent,home,blogs}:{parent:HTMLElement,home:boolean,blogs:blogType[]}){
  
    this.searchbar= new Searchbar({blogs:blogs,posts:null});
    const less900=window.innerWidth < 900;
    const less500=window.innerWidth < 500;
    const less400=window.innerWidth < 400;
    const css_col="display:flex;flex-direction:column;align-items:center;gap:1rem;position:relative;width:100%";
    this.baseUrl=new URL(window.location.origin).origin;
    this.blogs=blogs;
    const len=blogs.length;
    const m_block= less500 ? "0rem" : "0.25rem";
    const container=document.createElement("section");
    container.className="blogs-container";
    container.id="blogs-container";
    container.classList.add("mx-auto");
    container.style.cssText=css_col + "width:100%;border-radius:12px;min-height:110vh;";
    container.style.marginBlock=`${m_block}`;
    await this.titlePage({container,home,time:1200}).then(async(res)=>{
        if(res){
            const paraSize=less900 ? (less400 ? "130%":"150%"):"175%";
            const preParaSize=less900 ? (less400 ? "130%":"170%"):"200%";
                if(len===0){
                    this.noBlogs({parent:res.container});
                }else{
                    
                    await this.searchbar.mainBlog({
                        parent:res.container,
                        funcBlog:async({blogs})=>{ 
                            await this.generateBlogs({parent:container,blogs,less400,less900});
                    }
                    });//searchbar
                }
                res.textContainer.style.opacity="1";
                res.textContainer.style.transform="scale(1)";
                res.textContainer.animate([
                    {transform:"scale(0.8)",opacity:"0"},
                    {transform:"scale(1)",opacity:"1"},
                ],{duration:res.time,iterations:1,"easing":"ease-in-out"});
                setTimeout(()=>{
                    res.para.style.opacity="1";
                    res.para.style.borderRadius="12px";
                    res.para.animate([
                        {transform:"translateX(-75%)",opacity:"0",fontSize:preParaSize,backgroundColor:"white",color:"white"},
                        {transform:"translateX(0%)",opacity:"1",fontSize:paraSize,backgroundColor:"transparent",color:"#1dcbfb"},
                    ],{duration:res.time,iterations:1,"easing":"ease-in-out"});
                },res.time);
                
            }
        });
            
            parent.appendChild(container);
            container.animate([
                {opacity:"0"},
                {opacity:"1"}
            ],{duration:1100,iterations:1,"easing":"ease-in-out"});
        
        Misc.matchMedia({parent:container,maxWidth:500,cssStyle:{"borderRadius":"16px",border:"1px solid #0E3386"}});
    };


   async blogsLoading({parent,loaded,blogs}:{parent:HTMLElement,loaded:boolean,blogs:blogType[]}):Promise<boolean|undefined>{
        
        if( blogs.length>0){
            Header.cleanUpByID(parent,"blogsLoading-container");
            const container=document.createElement("div");
            container.id="blogsLoading-container";
            container.style.cssText="display:flex;justify-content:center;align-items:center;padding-inline:2rem;min-height:100vh;";
            const para=document.createElement("p");
            para.textContent=".......Loading........";
            container.appendChild(para);
            parent.appendChild(container);
            return Promise.resolve(true) as Promise<boolean>;
        }else{
           
            Header.cleanUpByID(parent,"blogsLoading-container");
            return Promise.resolve(true) as Promise<boolean>;
        }

    };

    async sleep({time}:{time:number}){
        return new Promise(resolve=>{
            setTimeout(()=>{resolve(true)},time)
        }) as Promise<boolean>
    };

   async titlePage(item:{container:HTMLElement,home:boolean,time:number}):Promise<{textContainer:HTMLElement,container:HTMLElement,para:HTMLElement,time:number}>{
        const {container,home,time}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;";
        const textContainer=document.createElement("div");
        textContainer.id="titlepage-textContainer";
        textContainer.style.cssText=css_col + "background-color:black;border-radius:12px;margin-top:1rem;filter:drop-shadow(0 0 0.5rem white);width:100%;overflow-x:hidden;";
        textContainer.style.width="100%";
        textContainer.style.paddingBottom=less900 ? (less400 ? "2rem":"2.5rem") : "2rem";
        textContainer.style.paddingInline=less900 ? "1rem" : "2rem";
        const text=document.createElement("p");
        text.id="container-mainTitle";
        text.className="subTitleStyleThreeNoBorder text-center  my-2 mb-4 mx-auto lean";
        text.style.cssText="margin-bottom:1.62rem;background:linear-gradient(180deg,#fff,#06e9f7);background-clip:text;-webkit-background-clip:text;";
        text.style.fontSize=less900 ? (less400 ? "200%":"300%"):"375%";
        if(home){
            text.textContent="top Blogs";
        }else{
            text.textContent="Articles && Blogs";
        }
        text.id="showBlogs-title";
        text.style.textTransform="capitalize";
        const lineCont=document.createElement("div");
        lineCont.style.cssText="margin-inline:auto;width:85%;";
        const div1=document.createElement("div");
        div1.id="textContainer-div1";
        //#0804e9
        div1.style.cssText="margin-inline:auto;width:85%;height:3px;filter:drop-shadow(0 0 0.25rem blue);";
        div1.style.height=less900 ? (less400 ? "5px":"8px"):"9px";
        div1.className="lineStyleOne";
        const div2=document.createElement("div");
        div2.id="textContainer-div1";
        div2.className="lineStyleOne";
        div2.style.cssText="margin-block;margin-inline:auto;width:55%;height:3px;filter:drop-shadow(0 0 0.25rem blue);";
        div2.style.height=less900 ? (less400 ? "5px":"8px"):"9px";
        const para=document.createElement("p");
        para.id="textContainer-para";
        para.textContent="for your leisure to view.";
        para.style.cssText="padding-block:1rem;padding-inline:1rem;margin-inline:auto;margin-top:0.5rem;text-wrap:wrap;text-align:center;box-shadow:1px 1px 3px 1px rgb(29, 203, 251);";
        para.style.fontSize=less900 ? (less400 ? "130%":"150%"):"175%";
        para.style.color="#1dcbfb";
        lineCont.appendChild(div1);
        lineCont.appendChild(div2);
        textContainer.appendChild(text);
        textContainer.appendChild(lineCont);
         await this.triangleL({parent:lineCont,less400,less900}).then(async(res)=>{
            if(res){
                const triTransform=res.triangleL.style.transform;
                const transRotate=`${triTransform} rotate(0deg)`
                res.triangleL.animate([
                    {transform:"translateX(-200px) rotate(62deg)",backgroundColor:"black"},
                    {transform:transRotate,},
                ],{duration:1.75*time,iterations:1,"easing":"ease-in-out"})
            }
        });
         await this.triangleR({parent:lineCont,less400,less900}).then(async(res)=>{
            if(res){
                const triTransform=res.triangleR.style.transform;
                res.triangleR.animate([
                    {transform:"translateX(200px) rotate(62deg)",backgroundColor:"black"},
                    {transform:triTransform},
                ],{duration:1.75*time,iterations:1,"easing":"ease-in-out"})
            }
        });
        textContainer.appendChild(para);
        textContainer.style.opacity="0";
        para.style.opacity="0";
        textContainer.style.transform="scale(0.8)";
        
        container.appendChild(textContainer);
        return Promise.resolve({textContainer,container,para,time}) as Promise<{textContainer:HTMLElement,container:HTMLElement,para:HTMLElement,time:number}>;
    }
    triangleL({parent,less400,less900}:{parent:HTMLElement,less400:boolean,less900:boolean}):Promise<{triangleL:HTMLElement}>{
        const gradiant="linear-gradient(rgb(255, 255, 255), rgb(6, 233, 247))";
        const spanTria=`display:block;padding:0px;position:absolute;top:0%;left:0%;width:75px;height:50px;border: 1px solid white;clip-path: polygon(0% 0%, 100% 50%, 0% 100%);background-color:white;`;
        parent.style.position="relative";
        const triangleL= document.createElement("span");
        triangleL.id="contL-triangleL";
        triangleL.style.cssText=spanTria;
        triangleL.style.transform=less900 ? ( less400 ? "translate(-50px,-21px)":"translate(-67px,-20px)"):"translate(-133px,-20px)";
        triangleL.style.width=less900 ? ( less400 ? "75px":"100px"):"208px";
        triangleL.style.background=gradiant;
        parent.appendChild(triangleL);
        return Promise.resolve({triangleL}) as Promise<{triangleL:HTMLElement}>;
    }
    triangleR({parent,less400,less900}:{parent:HTMLElement,less400:boolean,less900:boolean}):Promise<{triangleR:HTMLElement}>{
        const gradiant="linear-gradient(rgb(255, 255, 255), rgb(6, 233, 247))";
        const spanTria="display:block;padding:0px;position:absolute;top:0%;right:0%;width:75px;height:50px;clip-path:polygon(100% 0%, 0% 50%, 100% 100%);border: 1px solid white;background-color:white;";
        parent.style.position="relative";
        const triangleR= document.createElement("span");
        triangleR.id="contR-triangleR";
      
        triangleR.style.cssText=spanTria;
        triangleR.style.transform=less900 ? ( less400 ? "translate(50px,-21px)":"translate(67px,-21px)"):"translate(133px,-20px)";
        triangleR.style.width=less900 ? ( less400 ? "75px":"100px"):"208px";
        triangleR.style.background=gradiant;
        parent.appendChild(triangleR);
        return Promise.resolve({triangleR}) as Promise<{triangleR:HTMLElement}>;
    };


   async generateBlogs({parent,blogs,less400,less900}:{parent:HTMLElement,blogs:blogType[],less400:boolean,less900:boolean}){
       Header.cleanUpByID(parent,"showBlogs-generateBlogs-mainRow");
       parent.style.position="relative";

        if(blogs && blogs.length>0){
            const mainRow=document.createElement("div");
            mainRow.id="showBlogs-generateBlogs-mainRow";
            const blogBaseCss=`display:flex;justify-content:flex-start;flex-direction:column;margin-top:0rem;position:relative;width:100%;`;
                mainRow.style.cssText=blogBaseCss + "height:100vh;overflow-y:scroll;justify-content:flex-start;";
                mainRow.style.paddingInline=less900 ? (less400 ? "0.25rem":"2rem"): "4rem";
                mainRow.style.gap=less900 ? (less400 ? "3rem":"2rem"): "1.5rem";
                mainRow.style.borderRadius="16px";
            
                await Promise.all(
                    blogs.toSorted((a,b)=>{if(a.rating > b.rating) return -1; return 1}).
                        sort((a,b)=>{if(a.update > b.update) return -1; return 1}).map(async(blog,index)=>{
                    const colBlog=document.createElement("div");
                    colBlog.style.cssText=blogBaseCss + "background-color:#ffffff87;padding-block:1rem;" ;
                    colBlog.className=`text-center`;
                    colBlog.id="showBlogs-generateBlogs-mainRow-colBlogs";
                    
                    if(index%2===0){
                        colBlog.style.backgroundImage=`url(${this.bendImg})`;

                    }else{
                        colBlog.style.backgroundImage=`url(${this.bendImg1})`;
                    }
                  
                    colBlog.style.paddingInline="10px";
                    colBlog.style.height="100%";
                    colBlog.style.marginBlock=window.innerWidth <400 ? "1rem":"0.5rem";
                    colBlog.style.borderRadius=`inherit`;
                    colBlog.style.backgroundSize=`100% 100%`;
                    colBlog.style.backgroundPosition=`50% 50%`;
                    await this.displayCard(colBlog,blog);
                    this.allMsgs.blogMsgs({col:colBlog,blog});
                    const {button:btn}=Misc.simpleButton({anchor:colBlog,text:"view details",bg:"#0C090A",color:"white",type:"button",time:400});
                    btn.style.zIndex="0";
                    btn.id="showBlogs-generateBlogs-btn";
                    btn.style.marginBottom="1rem";
                    colBlog.appendChild(btn);
                    mainRow.appendChild(colBlog);
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            const blogUrl=new URL(`/blog/${blog.id}`,this.baseUrl);
                            window.location.href=blogUrl.href; //going to page
                        }
                    });
                     //---------------divider------------------//
                    const divider=document.createElement("div");
                    divider.id="divider";
                    divider.style.cssText="height:5px;margin-inline:auto;box-shadow:1px 1px 6px 1px lightblue;background-color:inherit;";
                    divider.style.width=less900 ? (less400 ? "90%" : "80%") : "62%";
                    colBlog.appendChild(divider);
                    //---------------divider------------------//
                   
                }));
            
            parent.appendChild(mainRow)
        };
    };



    async displayCard(column:HTMLElement,blog:blogType){
        const flex_between= window.innerWidth < 500 ? "center" : "space-between";
        const css_col="margin:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;";
       
        const less900= window.innerWidth <900;
        const less400= window.innerWidth <400;
        column.style.position="relative";
        const card=document.createElement("div");
        card.id="displayCard-card";
        card.style.cssText=css_col + `margin:0;padding;width:100%;position:relative;border-radius:12px;font-family:'Poppins-Regular'`;
        card.style.flexDirection=window.innerWidth < 900 ? "column":"row";
        card.style.justifyContent=flex_between;
        const textDiv=document.createElement("div");
        textDiv.id="displayCard-card-textDiv";
        textDiv.style.cssText="margin-inline:auto;margin-block:0rem;display:flex;flex-wrap:nowrap;justify-content:center;align-items:center;width:auto;";
        const text=document.createElement("h6");
        text.id="displayCard-card-text";
        text.className="text-center  lean mt-2";
        //text-decoration:underline;text-decoration-style:wavy;text-underline-offset:0.55rem;
        text.style.cssText="color:rgb(7, 4, 125);text-decoration-thickness:5%;text-transform:capitalize;";
        text.classList.add("title-art-display");
        text.style.fontSize=window.innerWidth<900 ? (window.innerWidth<400 ? "130%" : "175%") : "220%";
        text.textContent=blog.title ? blog.title : " your title";
        textDiv.appendChild(text);
      
        column.appendChild(textDiv);
        const imgCont=document.createElement("div");
        imgCont.id="displayCard-card-imgCont";
        imgCont.className="imgCont col-md-6"
        imgCont.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.65rem;";
        imgCont.style.flex=less900 ? "":"1 1 40%";
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
        img.style.cssText="filter:drop-shadow(0 0 0.25rem #0aa2db);background-color:#34282C;padding:5px;";
        img.style.width=less400 ? "100%" : "180px";
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
            img.src=imageLoader({src:this.logo,quality:95,width:100});
            img.alt="www.ablogrrom.com";
            if(blog.attr==="square"){
                img.style.borderRadius="12px";
                img.style.aspectRatio="";
            }else if(blog.attr==="circle"){
                img.style.borderRadius="50%";
                img.style.aspectRatio="1 / 1";
            }
            Misc.blurIn({anchor:img,blur:"10px",time:1200});
        }
        img.style.filter="drop-shadow(0 0 0.25rem #0aa2db)";
        imgCont.appendChild(img);
        imgCont.appendChild(smallCont);
        const cardBody=document.createElement("div");
        cardBody.id="cardBody";
        cardBody.className="C";
        cardBody.style.cssText=`padding-inline:5px;flex:1 1 auto;border-radius:6px;margin-inline:auto;`;
        cardBody.style.flex=less900 ? "":"1 1 55%";
        cardBody.style.width=less900 ? "100%":"auto";
        const update=document.createElement("small");
        update.style.cssText="margin-inline:auto;margin-block:0.5rem;margin-bottom:1rem;margin-bottom:1rem;";
        update.className="text-primary";
        update.textContent=blog.update ? `update: ${Blogs.tolocalstring(blog.date)}`:"no date";
        const desc=document.createElement("div");
        const descHeight=less900? (less400 ? "20vh": "15vh") :"12vh";
        desc.id=`blog-desc-${blog.id}`;
        desc.textContent=blog.desc ? `${(blog.desc.slice(0,76) as string)}...`:" no description";
        desc.style.cssText=`margin-inline:auto; padding:1.25rem; text-align:center; margin-block:1rem;border-radius:inherit;background-color:black;color:white;box-shadow:1px 1px 12px 1px #0aa2db;height:${descHeight};text-wrap:pretty;`;
        this.thumbsUpStartRating({parent:cardBody,rating:blog.rating,minRating:3});
        card.appendChild(imgCont);
        cardBody.appendChild(desc);
        cardBody.appendChild(update);
        card.appendChild(cardBody);
        column.appendChild(card);
        card.animate([
            {opacity:"0"},
            {opacity:"1"},
        ],{duration:400,iterations:1});
        Misc.matchMedia({parent:card,maxWidth:600,cssStyle:{flexDirection:"column"}});
        Misc.matchMedia({parent:cardBody,maxWidth:500,cssStyle:{flex:"1 1 100%"}});
        Misc.matchMedia({parent:imgCont,maxWidth:500,cssStyle:{flex:"1 1 100%"}});
       

    };



    thumbsUpStartRating(item:{parent:HTMLElement,rating:number,minRating:number}){
        const {parent,rating,minRating}=item;
        const div=document.createElement("div");
        div.id="thumbsUpStartRating-div"
            div.style.cssText="display:flex;justify-content:center;gap:1rem;align-items:center;cursor:none;";
            const cssStyle={fontSize:"18px",color:"yellow",padding:"3px",borderRadius:"50%",cursor:"none"}
            const rowCssStyle1={filter:"drop-shadow(0 0 0.25rem black)",boxShadow:"1px 1px 3px #07f9e2",backgroundColor:"#0c0326",borderRadius:"8px"};
            const rowCssStyle2={backgroundColor:"#0c0326",borderRadius:"8px"};
            if(rating > minRating){
                const span=document.createElement("span");
                span.id="div-span-thumbsUp";
                span.style.cssText="align-items:center;gap:1rem;width:fit-content;"
                FaCreate({parent:span,name:BsHandThumbsUpFill,cssStyle:{fontSize:"12px",color:"blue"}});
                span.innerHTML=`<span style="margin-block:1rem;margin-right:1rem;">:${rating}</span>`;
                div.appendChild(span);
                Misc.starRating({parent:div,rating:rating,cssStyle,rowCssStyle:rowCssStyle1});
                parent.appendChild(div);
            }else{
                Misc.starRating({parent:div,rating:rating,cssStyle,rowCssStyle:rowCssStyle2});
                parent.appendChild(div);
            }
    };


    
      noBlogs(item:{parent:HTMLElement}){
        const {parent}=item;
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

    };


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
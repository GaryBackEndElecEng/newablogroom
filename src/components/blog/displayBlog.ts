import {blogType,selectorType,elementType,element_selType,codeType, flexType, userType,  colType, chartType} from "@/components/editor/Types";
import Blogs from "@/components/blogs/blogsInjection";
import {modAddEffect} from "@/components/editor/modSelector";
import html2canvas from "html2canvas";
import ModSelector from "@/components/editor/modSelector";
import User from "@/components/user/userMain"
import Misc, {  mediaQueryType} from "../common/misc";
import Edit from "../editor/edit";
import Service from "@/components/common/services";
import {AWSImageLoader, btnReturnType, buttonReturn, imageLoader, smallbtnReturn } from '../common/tsFunctions';
import Main from "../editor/main";
import Message from "@/components/common/message";
import { FaPython, FaHtml5} from "react-icons/fa";
import {FaCreate} from "@/components/common/ReactIcons";
import ShapeOutside from "../editor/shapeOutside";
import Header from "../editor/header";
import Reference from "../editor/reference";
import NewCode, { regJavaType } from "../editor/newCode";
import { RiJavascriptFill } from "react-icons/ri";
import { TbJson } from "react-icons/tb";
import ChartJS from "../chart/chartJS";

const baseUrl="http://localhost:3000";
// const baseUrl=process.env.BASE_URL as string;


class DisplayBlog{
    count:number;
    baseUrl:URL;
    url:string;
    signin:string;
    imgLoad:string;
    logo:string;
    logo2:string;


mainSection:HTMLElement|null;
_blog:blogType;
_codes:codeType[];
_charts:chartType[];
_selector:selectorType;
_selectors:selectorType[];
_elements:elementType[];
_element:elementType;
_element_sel:element_selType;
_element_sels:element_selType[];
_bgColor:string="#41393C";
btnColor:string;
// _edit:Edit;
reference:Reference;
_onlyMeta:boolean=false;
 static _showOn:boolean;
 _showMeta=false;
 printThis:boolean;
 static noBlogText:string;
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private _shapeOutside:ShapeOutside,private _code:NewCode,private chart:ChartJS,private _message:Message){
        this.count=0;
        this.mainSection=document.querySelector("section#main");
        this.printThis=false;
        this.baseUrl=new URL(window.location.href);
        this._bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.logo="/images/gb_logo.png";
        this.logo2="gb_logo.png";
        this.url="/api/blog";
        this.signin="/api/user";
        this.imgLoad="/api/imgload";
        DisplayBlog._showOn=true;
        this._blog={} as blogType;
        this._codes=[] as codeType[];
        this._charts=[] as chartType[];
        this._selector={} as selectorType;
        this._selectors=[] as selectorType[];
        this._elements=[] as elementType[];
        this._element={} as elementType;
        this._element_sel={} as element_selType;
        this._element_sels=[] as element_selType[];
        // this._edit=new Edit(this._modSelector,this._auth,this._service)
        this.reference=new Reference(this._modSelector);
       DisplayBlog.noBlogText=`<span>sorry there are no blogs just yet. Be the first to create a blog.</span><span> We garrantee data preservation, with the following advantage:</span>
        <ul> <pre>
       <li style="text-wrap:wrap;"> You can create your own flamboyant poster and or design</li>
       <li style="text-wrap:wrap;"> Your post and or poster are small format compatible, meaning you can print your site as a blog or web-site and or poster fitting ( smat phone and or Ipad format)</li>
       <li style="text-wrap:wrap;"> its absolutely free with tight security protocol to protect your information.</li>
       </pre>
       </ul>
       <blockquote>
       <pre style="font-style:italic"> "to create is to learn and grow",,, <span style="font-size:22px;font-weight:bold">try it out</span><span style="color:red;font-weight:bold;font-size:30px;margin-right:1rem;">!</span></pre>
       </blockquote>
       <prev> yours truly Gary Wallace</prev>`;
      
    }
    //GETTERS SETTERS
    
    get blog(){
        return this._blog;
    }
    set blog(blog:blogType){
        this._blog=blog;
        this._modSelector._blog=blog;
       
    }
    set selector(selector:selectorType){
        this._selector=selector;
    }
    get selector(){
        return this._selector;
    }
    set selectors(selectors:selectorType[]){
        this._selectors=selectors;
    }
    get selectors(){
        return this._selectors;
    }
    get elements(){
        return this._elements;
    }
    set elements(elements:elementType[]){
        this._elements=elements;
    }
    set codes(codes:codeType[]){
        this._codes=codes;
    }
    get codes(){
        return this._codes;
    }
    set charts(charts:chartType[]){
        this._charts=charts;
    }
    get charts(){
        return this._charts;
    }
     //GETTERS SETTERS
     //DATA PARSERS
     parseSelectors(blog:blogType){
        this._selectors=blog.selectors;
     }
     parseElements(blog:blogType){
        this._elements=blog.elements;
     }
     parseCodes(blog:blogType){
        this._codes=blog.codes;
     }
     //DATA PARSERS

     //MAIN INJECTION DONE @ Index.tsx//id=client_blog
    async main(item:{parent:HTMLElement,blog:blogType}){
        const {parent,blog}=item;
        this._modSelector.loadSimpleBlog(blog);
        await this.awaitBlog(blog);
        this.blog=blog;
        const paddingInline=window.innerWidth < 900 ? (window.innerWidth < 420 ? "0rem" : "0.5rem") :"1rem"
        DisplayBlog.cleanUp(parent);//cleansup duplicates
        const outerContainer=document.createElement("article");
        outerContainer.id="display-main";
        outerContainer.style.cssText="margin-inline:auto;margin-block:1rem;padding-block:auto;width:100%;position:relative;min-height:110vh;padding-block:2rem;";
        outerContainer.style.paddingInline=paddingInline;
        parent.classList.add("container-fluid");
        parent.classList.add("w-100");
        parent.classList.add("mx-auto");
        parent.classList.add("px-0");
        parent.style.cssText="margin-inline:auto;border-radius:12px;position:relative;display:flex;flex-direction:column;padding-inline:1rem;align-items:center;justify-content:center;";
        parent.style.maxWidth="75vw";
        parent.style.backgroundColor="rgb(6 125 243 / 11%)";
        parent.appendChild(outerContainer);
        
        //-----------BTN CONTAINER FOR FINAL WORK-----------------//
        const btnContainer=document.createElement("div");
        btnContainer.id="btnContainer";
        btnContainer.style.cssText="margin-inline:auto;";
        parent.appendChild(btnContainer);
        //-----------BTN CONTAINER FOR FINAL WORK-----------------//
        //-----------user info-------------------------------------//
        const userInfo=document.createElement("div");
        userInfo.id="userInfo";
        userInfo.style.cssText="min-height:5vh;width:60%;margin-block:2rem;border-radius:10px;display:flex;justify-content:center;flex-direction:column;align-items:center;margin-block:2rem;padding:1rem;";
        Header.cleanUpByID(parent,"userInfo");
        parent.appendChild(userInfo);
        Misc.matchMedia({parent:userInfo,maxWidth:820,cssStyle:{width:"70%"}});
        Misc.matchMedia({parent:userInfo,maxWidth:400,cssStyle:{width:"auto",maxWidth:"none",paddingInline:"0rem;"}});
        //-----------user info-------------------------------------//
        //-----------CONTAINER FOR FINAL WORK-----------------//
        const container=document.createElement("section");
        container.id="section-container";
        container.className="section-container container"
        container.style.cssText="margin-inline:auto;padding-block:1rem; height:100vh;overflow-y:scroll;position:relative;background-color:white;border-radius:11px;";
        outerContainer.appendChild(container);
        //-----------CONTAINER FOR FINAL WORK-----------------//
        const btnGrp=document.createElement("div");
        btnGrp.style.cssText="display:flex;flex-direction;justify-content:space-between;align-items:center;flex-wrap:wrap;"
        btnGrp.className="btn-group btnGrp justify-content-around gap-2";
        //SHOWS PAGE
        await this.saveFinalWork(container,blog);
        //SHOWS PAGE
       //RATE SECTION !!!SHOWS RATINGGG
           this._message.getBlogMsgs(outerContainer,blog.id).then(async(res)=>{
            if(res && res.messages && res.container){
                this._message.contactCards(res.container,res.messages);
            }
           });
       //RATE SECTION
        // BUTTON RETURN NAV OPTIONS
            // Main.cleanUp(btnGrp);
        
            const btnBack=buttonReturn({parent:btnGrp,text:"back",bg:"#0C090A",color:"white",type:"button"})
            btnBack.className=""
            btnBack.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                window.history.go(-1)
            }
            });
            const btn=buttonReturn({parent:btnGrp,text:"main",bg:"#0C090A",color:"white",type:"button"})
            btn.className=""
            btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.baseUrl=new URL(window.location.href);
                const blogsUrl=new URL("/",this.baseUrl.origin);
                window.location.href=blogsUrl.href;
            }
            });
            const sendMsg=buttonReturn({parent:btnGrp,text:"sendMsg",bg:"#0C090A",color:"white",type:"button"})
            sendMsg.className=""
            sendMsg.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this._message.contact(parent,this.blog);
            }
            });
            await this._user.getLocalUserID().then(async(user_id)=>{
                //SHOWS EDIT BUTTON IF USER.ID===BLOG.USER_ID
                if(user_id){

                    if(user_id===blog.user_id){
                        // console.log("blog",this._blog)//works
                        const {button}=Misc.simpleButton({anchor:btnGrp,text:"edit your blog",bg:"#34282C",color:"white",type:"button",time:600});
                        btn.className=""
                        button.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            this._service.promsaveItems(blog).then(async(blog:blogType)=>{
                                if(blog){
                                    localStorage.setItem("blog",JSON.stringify(blog));
                                    localStorage.setItem("user_id",user_id);

                                    setTimeout(()=>{
                                        this.baseUrl=new URL(window.location.href);
                                        const blogsUrl=new URL("/editor",this.baseUrl.origin);
                                        window.location.href=blogsUrl.href;
                                    },200);
                                }
                            });
        
                        }
                        });
                    }
                }
               
                
            });
        
            const btn1=buttonReturn({parent:btnGrp,text:"editor",bg:"#0C090A",color:"white",type:"button"});
            btn1.className=""
            btn1.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    this.baseUrl=new URL(window.location.href);
                    const blogsUrl=new URL("/editor",this.baseUrl.origin);
                    window.location.href=blogsUrl.href;
                }
                });

            btnContainer.appendChild(btnGrp);
            setTimeout(()=>{
                this.count++;
                // console.log("btnGrp",btnGrp,"count",this.count)
                Misc.growIn({anchor:btnGrp,scale:0,opacity:0,time:800});
            },800);
            
            //-----------INTRO EFFECT-----------////
            outerContainer.animate([
                {opacity:"0"},
                {opacity:"1"},
            ],{duration:700,iterations:1});
            //-----------INTRO EFFECT-----------////

            Misc.matchMedia({parent:outerContainer,maxWidth:920,cssStyle:{paddingInline:"1rem",maxWidth:"100%"}});
            Misc.matchMedia({parent:parent,maxWidth:700,cssStyle:{maxWidth:"none",width:"100%"}});
        Misc.matchMedia({parent:outerContainer,maxWidth:420,cssStyle:{paddingInline:"0px",maxWidth:"100%",width:"100%"}});
        for(const key of Object.keys(parent.style)){
            if(key==="maxWidth"){
                parent.style.maxWidth="100%";
            }
        }
        
     }

    async awaitBlog(blog:blogType):Promise<{blog:()=>blogType}>{
        //NOTE: RELAY PLACEMENT THROUGH HERE
        return  new Promise((resolve,reject)=>{
            resolve({
                blog:()=>{
                    this._selectors=blog.selectors;
                    this._elements=blog.elements;
                    this._codes=blog.codes;
                    this._charts=blog.charts;
                    this.blog={...blog,selectors:this._selectors,elements:this._elements,codes:this._codes,charts:this.charts};
                    return blog;
                }

            });
            reject("could not get")
        }) as Promise<{blog:()=>blogType}>;
       
     }
     ///////////////////FINALE SHOW/////////////////////////////
     //INJECTED IN MAIN (BUTTON => final)
     async promShowFinal(parent:HTMLElement,blog:blogType){
        return new Promise((resolver,reject)=>{
            resolver(this.showFinal(parent,blog));
            reject("can not show")
        }) as Promise<HTMLElement|undefined>;
     }
    async showFinal(parent:HTMLElement,blog:blogType):Promise<HTMLElement|undefined>{
        // this.blog=blog;
        this.cleanAttributes(parent,true);
        const checkBlog=(blog && ( blog.elements || blog.codes)) ? true:false;
        blog={...blog,name:"blog one"};
        if(checkBlog){
           
            const showFinalMain=document.getElementById("showFinalMain");
            if(showFinalMain){
                parent.removeChild(showFinalMain);
            }
                //MAIN
                
            parent.classList.add("position-relative");
            parent.style.position="relative";
            parent.style.width="100%";
            parent.classList.add("mx-auto");
            parent.classList.add("my-4");
            parent.style.zIndex="0";
            const mainContainer=document.createElement("section");
            mainContainer.style.cssText="position:absolute;width:100%;min-height:100vh; padding:1rem;padding-inline:1.75rem;background:white;z-index:200;top:-5%;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;";
            mainContainer.className="flexCol align-stretch justify-start";
            mainContainer.id="showFinalMain";
            
            const innerContainer=document.createElement("div");
            innerContainer.id="PDFPrint";
            innerContainer.style.cssText="width:100%; padding:1rem;margin:1rem;border-radius:10px;margin-inline:auto;padding-inline:1rem;display:flex;flex-direction:column;justify-content:center;align-items:center;";
            innerContainer.className="mx-auto";
            
           await this.saveFinalWork(innerContainer,blog);
            
            //BUTTON SELECTION
            const btnContainer=document.createElement("footer");
            btnContainer.className="position-relative d-flex flex-column mx-auto width-sm-80 my-3 padding-2";
            const groupBtn=document.createElement("div");
            groupBtn.className="w-100 mx-auto gap-5";
            groupBtn.classList.add("btn-group");
            groupBtn.classList.add("justify-between");
            groupBtn.setAttribute("role","group");
            groupBtn.classList.add("gap-2");
            const arr=["close","save","print"];
            arr.forEach(str=>{
                const button=buttonReturn({parent:groupBtn,text:str,bg:"#13274F",color:"white",type:"button"});
                groupBtn.appendChild(button);
                button.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        if( str==="close"){
                            parent.style.zIndex="0";
                            // localStorage.removeItem("blog");
                            Misc.growOut({anchor:mainContainer,scale:0,opacity:0,time:400});
                            setTimeout(()=>{parent.removeChild(mainContainer);},398);
                        }else if( str==="save"){
                            this._user.saveWork({parent,blog,func:()=>{return undefined}});
                            Misc.growOut({anchor:mainContainer,scale:0,opacity:0,time:400});
                            setTimeout(()=>{parent.removeChild(mainContainer);},398);

                        }else if(str==="print"){
                            this.printThis=true;
                            const finalWork=parent.querySelector("div#PDFPrint") as HTMLElement;
                            this._service.promsaveItems(blog).then(async(_blog)=>{
                                if(_blog){
                                    finalWork.style.backgroundColor="white";
                                    finalWork.style.height="auto";
                                    finalWork.style.overflowY="auto";
                                    this.htmlTwoCanvassPDF(finalWork,_blog);
                                }
                            });
                            Misc.growOut({anchor:mainContainer,scale:0,opacity:0,time:400});
                            setTimeout(()=>{parent.removeChild(mainContainer);},398);
                        }
                      
                }
                });
            });
            
            btnContainer.appendChild(groupBtn);
            mainContainer.appendChild(innerContainer);
            mainContainer.appendChild(btnContainer);
            modAddEffect(mainContainer);
            parent.appendChild(mainContainer);
            
            return parent;
        }
    }
    //--PARENT:showFinal(parent)-----------PARENT Edit.editSetup.saveWorkSetup-()---------///
   async saveFinalWork(parent:HTMLElement,blog:blogType){
        ShapeOutside.cleanUpByID(parent,"popup");
        ShapeOutside.cleanUpByID(parent,"setAttributes");
        const rmList=["overflow-y","overflow-x"];
        const addList=["height:auto"];
        blog.cssText=DisplayBlog.removeCleanCss({css:blog.cssText,rmList,addList});
        const container=document.createElement("div");
        container.className="final-work";
        container.style.cssText=blog.cssText ? blog.cssText : "margin-inline:auto;width:100%;height:100vh;overflow-y:scroll;margin-top:2rem;justify-content:flex-start;";
        container.style.width="100%";
        container.style.display="flex";
        container.style.placeItems="center";
        container.id="saveFinalWork-container";
        if(blog.imgBgKey){
            container.setAttribute("data-backgroundimage","true");
            const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
           await this._service.injectBgAwsImage({target:container,imgKey:blog.imgBgKey,cssStyle});
        }

        //META
        if(this._onlyMeta){
            // await this.onlyMeta(container,blog);
        }else{
            // await this.showMeta(container,blog,printThis,_showMeta);
        }
        //META
        const header=blog.selectors && blog.selectors.find(sel=>(sel.header));
        const sels=(blog.selectors && blog.selectors) ? blog.selectors.filter(sel=>(!sel.header)).filter(sel=>(!sel.footer)) as selectorType[] : [] as selectorType[];
        const eles=(blog && blog.elements && blog.elements.length>0)? blog.elements : [] as elementType[];
        const maxCount=ModSelector.maxCount(blog);
        const footer=blog.selectors && blog.selectors.find(sel=>(sel.footer));
        const codes=(blog && blog.codes && blog.codes.length>0) ? blog.codes : [] as codeType[];
        const charts=(blog && blog.charts && blog.charts.length>0) ? blog.charts : [] as chartType[]
        

        if(header){
            const head=document.createElement(header.name);
            head.style.cssText=ModSelector.mainHeader_css ? ModSelector.mainHeader_css as string : "margin-inline:0px;width:100%;display:flex;flex-direction:column;align-items:center;";
            head.className=ModSelector.mainHeader_class ? ModSelector.mainHeader_class :"sectionHeader";
            head.id=Main._mainHeader? Main._mainHeader.id as string :"mainHeader";
            await this.showCleanSelector({parent:head,selector:header});
            container.appendChild(head);
        }
        if(maxCount>0){
            const main=document.createElement("section");
            main.id="saveFinalWork-section-main";
            main.style.cssText="width:100%;margin-inline:auto;margin-block:0.5rem;position:relative;height:auto;";
           
            await Promise.all(Array.from(Array(maxCount+1).keys()).map(async(num)=>{
                const select =sels.find(sel=>(sel.placement===num+1));
                if(select){
                    await this.showCleanSelector({parent:main,selector:select});

                }
                const chart=charts.find(ch=>(ch.placement===num+1));
                if(chart){
                    await this.chart.showCleanChart({parent:main,chart});
                }
                const ele=eles.find(el=>(el.placement===num+1));
                if(ele){
                    await this.showCleanElement({parent:main,element:ele});
                }
                const code=codes.find(cd=>(cd.placement===num+1));
                if(code){
                   await this._code.showCleanCode({parent:main,selectCode:code});
                }
            }));
            container.appendChild(main);
            Misc.matchMedia({parent:main,maxWidth:400,cssStyle:{paddingInline:"0px"}});
            }
        if(footer){
            const foot=document.createElement(footer.name);
            foot.className=ModSelector.mainFooter_class;
            foot.style.cssText=ModSelector.mainFooter_css;
           await this.showCleanSelector({parent:foot,selector:footer});
            container.appendChild(foot);
        }
        parent.appendChild(container);
        
    }
   async showCleanSelector(item:{parent:HTMLElement,selector:selectorType}){
        const {parent,selector}=item;
        let flex:flexType={} as flexType;
        // console.log("Header selector",selector)//works
        if(selector.header){
            // console.log(parent)
        }
        if(selector && selector.name){
            const innerCont=document.createElement(selector.name);
            const maxWidthImg=selector.header ? "100px":"auto";
            innerCont.id=selector.eleId;
            innerCont.className=selector.class;
            innerCont.setAttribute("name",selector.name);
            innerCont.setAttribute("data-selector-id",`${selector.id}`);
                innerCont.setAttribute("data-container-id",`${innerCont.id}`);
            innerCont.setAttribute("data-selector-id",selector.eleId);
            innerCont.style.cssText=selector.cssText;
            innerCont.style.display="flex";
            innerCont.style.flexDirection="column";
            innerCont.style.alignItems="center";
            parent.appendChild(innerCont);
            flex={...flex,selectorId:selector.eleId,placement:selector.placement}
                await Promise.all(selector.rows.sort((a,b)=>{if(a.order < b.order){return -1}; return 1}).map(async(row_)=>{
                    const row=document.createElement("div");
                    row.className=row_.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                    row.style.cssText=row_.cssText;
                    row.setAttribute("name",row_.name);
                    row.setAttribute("rowID",`${row_.id}`);
                    row.setAttribute("order",String(row_.order));
                    row.id=row_.eleId;
                    flex={...flex,rowId:row_.eleId,imgKey:row_.imgKey};
                    innerCont.appendChild(row);
                    Misc.matchMedia({parent:row,maxWidth:420,cssStyle:{flexDirection:"column"}});
                    if(row_.imgKey){
                        row.setAttribute("data-backgroundimage","true");
                        const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                       await this._service.injectBgAwsImage({target:row,imgKey:row_.imgKey,cssStyle});
                    }
                    await Promise.all(row_.cols && row_.cols.sort((a,b)=>{if(a.order < b.order){return -1}; return 1}).map(async(col_)=>{
                        const col=document.createElement("div");
                        col.id=col_.eleId;
                        col.setAttribute("colID",`${col_.id}`);
                        col.setAttribute("order",String(col_.order));
                        col.style.cssText=col_.cssText;
                        col.className=col_.class.split(" ").filter(cl=>(cl !=="coliIsActive")).join(" ");
                        flex={...flex,colId:col_.eleId,imgKey:col_.imgKey}
                        await this.showCleanColumnToEle({parent:parent,col:col,col_:col_,flex:flex,maxWidthImg:maxWidthImg}).then(async(resCol)=>{
                             if(resCol){
 
                                 row.appendChild(resCol);
                                 if(col_.imgKey){
                                     col.setAttribute("data-backgroundimage","true");
                                     const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                                   await this._service.injectBgAwsImage({target:resCol,imgKey:col_.imgKey,cssStyle});
                                 }
                             }
                         });
                    }));
                    
                   
                }));
            
           
        }
    };
    async showCleanColumnToEle(item:{parent:HTMLElement,col:HTMLElement,col_:colType,flex:flexType,maxWidthImg:string}){
        const {parent,col,col_,flex,maxWidthImg}=item;
        await Promise.all(col_.elements && col_.elements.sort((a,b)=>{if(a.order < b.order){return -1}; return 1}).map(async (element)=>{
            const checkArr=["img","ul","blockquote","a","logo","image"].includes(element.name);
            const link=element && element.attr && element.attr.startsWith("http") ? element.attr : null;
            const email=element && element.attr && element.attr.startsWith("mail") ? element.attr : null;
            const tel=element && element.attr && element.attr.startsWith("tel") ? element.attr : null;
            const eleClass=element.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
            let flex_={...flex,elementId:element.eleId,name:element.name,imgKey:element.imgKey};
            if(!checkArr){
                const ele:HTMLElement=document.createElement(element.name);
                ele.setAttribute("is-element","true");
                ele.setAttribute("aria-selected","true");
                ele.setAttribute("order",String(element.order));
                ele.setAttribute("name",element.name);
                ele.className=eleClass;
                ele.setAttribute("name",element.name);
                ele.id=element.eleId;
                ele.style.cssText=element.cssText;
                ele.innerHTML=element.inner_html;
                col.appendChild(ele);
                if(element.attr==="data-backgroundImage" && element.imgKey){
                    ShapeOutside.cleanUpByID(parent,"popup");
                    ele.setAttribute("data-backgroundImage","true");
                    flex_={...flex_,backgroundImage:true,imgKey:element.imgKey};
                    const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                    await this._service.injectBgAwsImage({target:ele,imgKey:element.imgKey,cssStyle});
                    Misc.blurIn({anchor:ele,blur:"20px",time:500});
                }else if(element.attr==="data-shapeoutside-circle" && element.imgKey){
                    flex_={...flex_,shapeOutsideCircle:true,imgKey:element.imgKey};
                    ele.setAttribute("data-shapeoutside-circle","true");
                    await this._shapeOutside.shapeOutsideInjectImage({para:ele,imgKey:element.imgKey});
                    Misc.blurIn({anchor:ele,blur:"20px",time:500});
                }else if(element.attr==="data-shapeoutside-square" && element.imgKey){
                    flex_={...flex_,shapeOutsideCircle:true,imgKey:element.imgKey};
                    ele.setAttribute("data-shapeoutside-square","true");
                    await this._shapeOutside.shapeOutsideInjectImage({para:ele,imgKey:element.imgKey});
                    Misc.blurIn({anchor:ele,blur:"20px",time:500});
                }else if(element.attr==="data-shapeoutside-polygon" && element.imgKey){
                    ele.setAttribute("data-shapeoutside-polygon","true")
                    flex_={...flex_,shapeOutsidePolygon:true,imgKey:element.imgKey};
                    await this._shapeOutside.shapeOutsideInjectImage({para:ele,imgKey:element.imgKey});
                    Misc.blurIn({anchor:ele,blur:"20px",time:500});
                }
                ele.setAttribute("flex",JSON.stringify(flex_));
                Misc.matchMedia({parent:ele,maxWidth:900,cssStyle:{paddingInline:"1rem"}});
            }else if(element.name==="ul"){
                const ele=document.createElement("ul");
                ele.setAttribute("is-element","true");
                ele.setAttribute("aria-selected","true");
                ele.setAttribute("order",String(element.order));
                ele.setAttribute("name",element.name);
                ele.className=eleClass;
                ele.classList.remove("isActive");
                ele.id=element.eleId;
                ele.setAttribute("name",element.name);
                ele.style.cssText=element.cssText;
                ele.innerHTML=element.inner_html;
                ele.setAttribute("flex",JSON.stringify(flex));
                col.appendChild(ele);
            }else if(element.name==="blockquote"){
                const ele=document.createElement("blockquote");
                ele.setAttribute("is-element","true");
                ele.setAttribute("aria-selected","true");
                ele.setAttribute("order",String(element.order));
                ele.setAttribute("name",element.name);
                ele.className=eleClass;
                ele.classList.remove("isActive");
                ele.id=element.eleId;
                ele.setAttribute("name",element.name);
                ele.style.cssText=element.cssText;
                ele.innerHTML=element.inner_html;
                ele.setAttribute("flex",JSON.stringify(flex));
                col.appendChild(ele);
            }else if(element.name==="a"){
                if(link){
                    const ele=document.createElement("a");
                    ele.setAttribute("is-element","true");
                    ele.setAttribute("aria-selected","true");
                    ele.setAttribute("order",String(element.order));
                    ele.setAttribute("name",element.name);
                    ele.className=eleClass;
                    ele.id=element.eleId;
                    ele.setAttribute("name",element.name);
                    ele.style.cssText=element.cssText;
                    ele.innerHTML=element.inner_html;
                    // (ele as HTMLAnchorElement).href="#";
                    ele.setAttribute("data-href",link);
                    ele.onclick=()=>{return window.open(link,"_blank")};
                    ele.setAttribute("flex",JSON.stringify(flex));
                    col.appendChild(ele);
                }else if(email){
                    const ele=document.createElement("a");
                    ele.setAttribute("is-element","true");
                    ele.setAttribute("aria-selected","true");
                    ele.setAttribute("order",String(element.order));
                    ele.setAttribute("name",element.name);
                    ele.className=eleClass;
                    ele.id=element.eleId;
                    ele.setAttribute("name",element.name);
                    ele.style.cssText=element.cssText;
                    ele.innerHTML=element.inner_html;
                    (ele as HTMLAnchorElement).href=email;
                    ele.setAttribute("data-href-email",email);
                    ele.setAttribute("flex",JSON.stringify(flex));
                    col.appendChild(ele);
                }else if(tel){
                    const ele=document.createElement("a");
                    ele.setAttribute("is-element","true");
                    ele.setAttribute("aria-selected","true");
                    ele.setAttribute("order",String(element.order));
                    ele.setAttribute("name",element.name);
                    ele.className=eleClass;
                    ele.id=element.eleId;
                    ele.setAttribute("name",element.name);
                    ele.style.cssText=element.cssText;
                    ele.innerHTML=element.inner_html;
                    (ele as HTMLAnchorElement).href=tel;
                    ele.setAttribute("data-href-tel",tel);
                    ele.setAttribute("flex",JSON.stringify(flex));
                    col.appendChild(ele);
                }
            }else if(element.name==="logo"){
                const ele=document.createElement("img");
                ele.setAttribute("is-element","true");
                ele.setAttribute("aria-selected","true");
                ele.setAttribute("order",String(element.order));
                ele.setAttribute("name",element.name);
                ele.className=eleClass;
                ele.src=element.img as string;
                ele.id=element.eleId;
                ele.setAttribute("name",element.name);
                ele.setAttribute("flex",JSON.stringify(flex));
                ele.style.cssText=element.cssText;
                ele.style.maxWidth=maxWidthImg;
                ele.alt=element.inner_html;
                ele.setAttribute("flex",JSON.stringify(flex));
                col.appendChild(ele);
                if(element.imgKey){
                    const res= await this._service.getSimpleImg(element.imgKey);
                    if(res){
                        ele.src=res.img as string;
                        ele.alt=res.Key as string;
                        Misc.blurIn({anchor:ele,blur:"20px",time:500});
                    }
                }
                // this._user.refreshImageUpload(innerCont,col,ele,flex);
            }else if(element.name==="image"){
                // const link=element.attr as string;
                const ele=document.createElement("img");
                ele.setAttribute("is-element","true");
                ele.setAttribute("aria-selected","true");
                ele.setAttribute("order",String(element.order));
                ele.setAttribute("name",element.name);
                ele.className=eleClass;
                ele.src=element.img as string;
                ele.id=element.eleId;
                ele.setAttribute("name",element.name);
                ele.style.cssText=element.cssText;
                ele.style.maxWidth=maxWidthImg;
                ele.alt=element.inner_html;
                ele.setAttribute("flex",JSON.stringify(flex));
                col.appendChild(ele);
                if(element.imgKey){
                    await this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                        if(res){
                            ele.src=res.img as string;
                            ele.alt=res.Key as string;
                            Misc.blurIn({anchor:ele,blur:"20px",time:500});

                        }
                   });
                }
            }else if(element.name==="img" ){
                const ele:HTMLImageElement=document.createElement(element.name);
                ele.setAttribute("is-element","true");
                ele.setAttribute("aria-selected","true");
                ele.setAttribute("order",String(element.order));
                ele.setAttribute("name",element.name);
                ele.className=eleClass;
                ele.id=element.eleId;
                ele.src=element.img as string;
                ele.style.cssText=element.cssText;
                ele.style.maxWidth=maxWidthImg;
                ele.src=element.img as string;
                ele.setAttribute("flex",JSON.stringify(flex));
                col.appendChild(ele);
                if(element.imgKey){
                    const res= await this._service.getSimpleImg(element.imgKey);
                    if(res){
                        ele.src=res.img as string;
                        ele.alt=res.Key as string;
                        Misc.blurIn({anchor:ele,blur:"20px",time:500});
                    }
                }
            }
        }));
        return col;
    }
    async showCleanElement(item:{parent:HTMLElement,element:elementType}){
        const {parent,element}=item;
        await this.cleanElement({parent,element}).then(async(res)=>{
            if(res){

                const checkEle=["p","h1","h2","h3","h4","h5","h6","div","blockquote","ul","hr"].includes(element.name);
                const imgKey=element.imgKey;
                const link=element.attr && element.attr.startsWith("http") ? element.attr : null;
                const email=element.attr && element.attr.startsWith("mail") ? element.attr : null;
                const tel=element.attr && element.attr.startsWith("tel") ? element.attr : null;
                // console.log(element.name,checkEle)//works
                switch(true){
                    case checkEle:
                        if(([...res.ele.classList as any] as string[]).includes("reference")){
                            this.reference.showCleanLinks({parent,ele:element});
                        }else{
                            res.ele.innerHTML=element.inner_html;
                        }
                        if(imgKey){
                            if(element.attr==="data-backgroundImage"){
                                ShapeOutside.cleanUpByID(parent,"popup");
                                res.ele.setAttribute("data-backgroundImage","true");
                                res.ele.setAttribute("imgKey",imgKey);
                                const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                               await this._service.injectBgAwsImage({target:res.ele,imgKey:imgKey,cssStyle});
                            }else if(element.attr==="data-shapeoutside-circle"){
                                res.ele.setAttribute("data-shapeoutside-circle","true");
                                res.ele.setAttribute("imgKey",imgKey);
                               await this._shapeOutside.shapeOutsideInjectImage({para:res.ele,imgKey:imgKey});
                            }else if(element.attr==="data-shapeoutside-square"){
                                res.ele.setAttribute("data-shapeoutside-square","true");
                                res.ele.setAttribute("imgKey",imgKey);
                                this._shapeOutside.shapeOutsideInjectImage({para:res.ele,imgKey:imgKey});
                            }else if(element.attr==="data-shapeoutside-polygon"){
                                res.ele.setAttribute("data-shapeoutside-polygon","true")
                                res.ele.setAttribute("imgKey",imgKey);
                               await this._shapeOutside.shapeOutsideInjectImage({para:res.ele,imgKey:imgKey});
                            }else if(element.attr="data-arrow-design"){
                                res.ele.setAttribute("data-arrow-design","true");
                                res.ele.setAttribute("imgKey",imgKey);
        
                            }
                        }
                        if(element.attr==="data-arrow-design"){
                            Misc.matchMedia({parent:res.ele,maxWidth:400,cssStyle:{paddingInline:"0rem",padding:"0px",height:"50vh"}});
                        }else{
        
                            Misc.matchMedia({parent:res.ele,maxWidth:400,cssStyle:{paddingInline:"1rem"}});
                        }
                        ShapeOutside.cleanUpByID(res.ele,"popup");
                        ShapeOutside.cleanUpByID(res.ele,"setAttributes");
                    return;
                    case element.name==="img":
                        const width:number=700;
                        res.ele=res.ele as HTMLImageElement;
                        (res.ele as HTMLImageElement).alt=element.inner_html;
                        res.ele.setAttribute("is-element","true");
                        (res.ele as HTMLImageElement).src=element.img as string;
                        res.ele.style.cssText=element.cssText;
                        res.ele.style.width=`${width}px`;
                        res.ele.style.maxHeight="50vh";
                        if(element.imgKey){
                            const res_= await this._service.getSimpleImg(element.imgKey);
                            if(res_){
                                (res.ele as HTMLImageElement).src=res_.img;
                                (res.ele as HTMLImageElement).alt=res_.Key as string;
                            }
                        }
                        Misc.blurIn({anchor:res.ele,blur:"20px",time:600});
                        // this._user.refreshImageUpload(parent,image);
                    return;
                    case element.name==="time":
                        res.ele.innerHTML=element.inner_html;
                        res.ele.setAttribute("datetime",`${element.inner_html}`)
                        res.ele.onmouseover=()=>{
                            res.ele.classList.add("show-time");
                        };
                        res.ele.onmouseout=()=>{
                            res.ele.classList.remove("show-time");
                        };
                    return;
                    case element.name==="a":
                        if(link){
                            res.ele.innerHTML=element.inner_html;
                            // (ele as HTMLAnchorElement).href="#";
                            res.ele.setAttribute("data-href",link);
                            res.ele.onclick=()=>{return window.open(link,"_blank")};
                            res.ele.onmouseover=()=>{
                                res.ele.classList.add("show-link");
                            };
                            res.ele.onmouseout=()=>{
                                res.ele.classList.remove("show-link");
                            };
                        }else if(email){
                            
                            (res.ele as HTMLAnchorElement).innerHTML=element.inner_html;
                            // (ele as HTMLAnchorElement).href="#";
                            (res.ele as HTMLAnchorElement).setAttribute("data-href",email);
                            (res.ele as HTMLAnchorElement).href=email;
                            res.ele.onmouseover=()=>{
                                res.ele.classList.add("show-link");
                            };
                            res.ele.onmouseout=()=>{
                                res.ele.classList.remove("show-link");
                            };
                        }else if(tel){
                            (res.ele as HTMLAnchorElement).innerHTML=element.inner_html;
                            // (ele as HTMLAnchorElement).href="#";
                            (res.ele as HTMLAnchorElement).setAttribute("data-href",tel);
                            (res.ele as HTMLAnchorElement).href=tel;
                            res.ele.onmouseover=()=>{
                                res.ele.classList.add("show-link");
                            };
                            res.ele.onmouseout=()=>{
                                res.ele.classList.remove("show-link");
                            };
                        }
                    return;
                    default:
                        return;
                }
            }
        });
        
    };
    cleanElement(item:{parent:HTMLElement,element:elementType}):Promise<{ele:HTMLElement,divCont:HTMLElement}>{
        const {element,parent}=item;
        const ele=document.createElement(element.name);
        ele.setAttribute("name",element.name);
        ele.setAttribute("is-element","true");
        ele.classList.remove("isActive");
        ele.id=element.eleId;
        ele.className=element.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
        ele.classList.remove("isActive");
        ele.style.cssText=element.cssText;
        ele.style.marginInline="auto";
        const divCont=document.createElement("div");
        divCont.id="eleContainer";
        divCont.style.cssText="margin-block:auto;padding:0.25rem;position:relative;width:100%;display:flex;flex-direction:column;align-items:center;";
        divCont.appendChild(ele);
        parent.appendChild(divCont);
        return new Promise(resolve=>(
            resolve({ele,divCont})
        )) as Promise<{ele:HTMLElement,divCont:HTMLElement}>;
    }
    showCleanCode(item:{parent:HTMLElement,selectCode:codeType}){
        const {parent,selectCode}=item;
        if(selectCode){
            const regArr:{name:string,arrType:regJavaType[]}[]=[
                {name:"java",arrType:NewCode.regJavaArr},
                {name:"python",arrType:NewCode.regPythonArr},
                {name:"html",arrType:NewCode.regHtmlArr},
                {name:"JSON",arrType:NewCode.regJSONArr},

            ]
            const innerContainer=document.createElement("div");
            innerContainer.id="innerContainer";
            innerContainer.style.cssText="width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;"
            parent.style.position="relative";
            //------title container----------//

            const imgDive=document.createElement("div");
            imgDive.id="imgDiv";
            imgDive.style.cssText="display:flex;justify-content:center;align-items:center;gap:1.25rem;";
            const xDiv=document.createElement("div");
            xDiv.style.cssText="padding:1rem;max-width:75px;border-radius:25%;background-color:black;color:white;display:flex;justify-content:center;align-items:center;gap:1rem;position:relative;z-index:20;box-shadow:1px 1px 12px 1px black;";
            if(selectCode.name==="html"){
                imgDive.style.transform="translate(-155px,15px)";
            }
            const span=document.createElement("span");
            span.textContent=selectCode.name;
            span.className="text-primary lean text-bold text-lg text-capitalize";
            if(selectCode.name==="java"){
                FaCreate({parent:xDiv,name:RiJavascriptFill,cssStyle:{fontSize:"30px",margin:"auto",padding:"5px",borderRadius:"50%",color:"yellow",backgroundColor:"white"}});
                xDiv.style.color="yellow";
            }else if(selectCode.name==="python"){
                FaCreate({parent:xDiv,name:FaPython,cssStyle:{fontSize:"30px",margin:"auto",padding:"5px",borderRadius:"50%",color:"blue",backgroundColor:"white"}});
            }else if(selectCode.name==="JSON"){
                FaCreate({parent:xDiv,name:TbJson,cssStyle:{fontSize:"30px",margin:"auto",padding:"5px",borderRadius:"50%",color:"red",backgroundColor:"white"}});
            }else if(selectCode.name==="html"){
                FaCreate({parent:xDiv,name:FaHtml5,cssStyle:{fontSize:"30px",margin:"auto",padding:"5px",borderRadius:"50%",color:"blue",backgroundColor:"white"}});
            }
            imgDive.appendChild(xDiv);
            imgDive.appendChild(span);
            innerContainer.appendChild(imgDive);
            const target=document.createElement("code");
            target.id=selectCode.eleId;
            target.setAttribute("is-element","true");
            target.setAttribute("name",selectCode.name);
            target.style.cssText=selectCode.cssText;
            target.className=selectCode.class;
            const pre=document.createElement("pre");
            pre.setAttribute("contenteditable","true");
            target.setAttribute("placement",`${String(selectCode.placement)}-A`)
            pre.id="pre";
            pre.style.cssText="color:white;padding-block:1rem;width:100%;";
            target.onclick=(e:MouseEvent)=>{
                if(e){
                    target.classList.toggle("isActive");
                }
            };
            const regType=regArr.find(reg=>(reg.name===selectCode.name));
            if(regType){
                selectCode.linecode.map(line=>{
                    if(line && line.text){

                        const para=document.createElement("p");
                        if(selectCode.name==="java"){
                            this._code.matchInsert({target:para,text:line.text,regArr:regType.arrType});
                        }else if(selectCode.name==="html"){
                            this._code.matchInsert({target:para,text:line.text,regArr:regType.arrType});
                        }else if(selectCode.name==="python"){
                            this._code.matchInsert({target:para,text:line.text,regArr:regType.arrType});
                        }else if(selectCode.name==="JSON"){
                            this._code.matchInsert({target:para,text:line.text,regArr:regType.arrType});
                        }
                        pre.appendChild(para);
                    }
                });

                }
            
            target.appendChild(pre)
            innerContainer.appendChild(target);
            parent.appendChild(innerContainer);
        }
    }
    genStars(parent:HTMLElement,rating:number){
        if(rating){
            const container=document.createElement("div");
            container.style.cssText="display:flex;justify-content:center;align-items:center;gap:1.5rem;";
            const title=document.createElement("h6");
            title.textContent="feed back";
            title.className="text-primary";
            title.style.cssText="align-text:center;text-decoration:underline;text-underline-offset:0.5rem;";
            container.appendChild(title);
            Misc.starRating({parent:container,rating:rating,cssStyle:{"color":"yellow","fontSize":"28px"}});
            parent.appendChild(container);
        }
    }
     ///////////////////FINALE SHOW/////////////////////////////

    
   
    async htmlTwoCanvassPDF(parent:HTMLElement,blog:blogType){
        const getFinalWork=document.querySelector("div#blog-work") as HTMLElement;
       if(!getFinalWork) return;
            const getBase=window.getComputedStyle(getFinalWork);
            const getWidth=parseInt(getBase.getPropertyValue("width").split("px")[0]);
            const getHeight=parseInt(getBase.getPropertyValue("height").split("px")[0]);
            const margin=16;
            const area=parent.getBoundingClientRect();
            const scale =2;
            // const scale =(getWidth + margin*2) / getWidth;
            window.scroll(0,0);
            //PROBLEM IS FORMATTING!!- WIDTH!! FIND THE MAXIMUM WIDTH BEFORE SCREWING UP WITH BLACK
            html2canvas(getFinalWork,{
                backgroundColor:null,
                // backgroundColor:"#ffffff",
                width: (area.width + margin),
                // width:getWindowWidth + margin,
                height:(area.height + margin*2),
                // height:getWindowHeight + margin*3,
                x:margin/2,
                scrollY:0,
                scrollX:0,
                foreignObjectRendering:false,
                scale,
                imageTimeout:3000,
                "proxy":"masterultils-postimages.s3.us-east-1.amazonaws.com",
                "logging":false,
                allowTaint:false,
                useCORS:true,
                
            }).then(canvas=>{
                //converting to base64 url string
                // canvas.style.marginInline="auto";
                canvas.style.width=`${getWidth}px`;
                canvas.style.height=`${getHeight}px`;
                canvas.style.paddingInline=`${margin *2}px`;
                canvas.style.backgroundColor=`inherit`;
                const imgData=canvas.toDataURL("image/png");
                const anchor=document.createElement("a");
                anchor.href=imgData;
                anchor.download=`${blog.name}.png`;
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
                setTimeout(()=>{
                    this.printThis=false;
                    parent.style.height="auto";
                    parent.style.overflowY="auto";
                },700);
            });
        
    
    }
   async getUserInfo(htmlUserInfo:HTMLElement,blog:blogType): Promise<userType | undefined>{
    Header.cleanUpByID(htmlUserInfo,"user-container");
        htmlUserInfo.style.position="relative";
        const container=document.createElement("div");
        container.id="user-container";
        container.style.cssText="margin-inline:auto;margin-block:1.25rem;display:flex;align-items:center;justify-content:space-around;flex-warp:wrap;background-color:white;width:100%;border-radius:11px;padding-block:1.5rem;padding-inline:1.25rem;box-shadow:1px 1px 12px 2px #10c7e9ab,-1px -1px 12px 1px #10c7e9ab;";
        if(!blog) return;
        if(!(blog.user_id)) return;
        return this._service.getUserInfo(blog.user_id).then(async(user)=>{
            if(user && user.showinfo){
                const img=document.createElement("img");
                img.style.cssText="max-width:120px;border-radius:50%;aspect-ratio: 1 / 1;box-shadow:1px 1px 10px 1px black;float:left; ";
                img.src=user.image ? user.image: imageLoader({src:this.logo2,quality:75,width:120});
                img.alt=user.name ? user.name: "blogger";
                Misc.blurIn({anchor:img,blur:"10px",time:600});
                container.appendChild(img);
                    const divCont=document.createElement("ul");
                    divCont.id="showinfo";
                    divCont.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:stretch;justify-content:center;";
                    const text=document.createElement("h6");
                    text.className="text-primary";
                    text.innerHTML=user.name ? `<span style="color:blue;text-decoration:underline;">name: </span><span>${user.name}<span>`:"";
                    text.style.display=user.name ? "block":"none";
                    divCont.appendChild(text);
                    const li1=document.createElement("li");
                    li1.innerHTML=user.email ? `<span style="color:blue;text-decoration:underline;">email: </span><span>${user.email}<span>`:"";
                    li1.style.display=user.email ? "block":"none";
                    divCont.appendChild(li1);
                    const li2=document.createElement("li");
                    li2.innerHTML=user.bio ? `<span style="color:blue;text-decoration:underline;">bio: </span><span>${user.bio}<span>`:"";
                    li2.style.display=user.bio ? "block":"none";
                    divCont.appendChild(li2);
                    container.appendChild(divCont);
              
                htmlUserInfo.appendChild(container);
                return user
            }
        });
    }
    //PARENT MAIN: INJECTOR ON show button
    cleanAttributes(parent:HTMLElement,showOn:boolean){
        DisplayBlog._showOn=showOn;
       
        //OBJECT IS TO HAVE CONTROL ON THE TEXTAREA'S CONTAINER AND TURNON AND OFF ALL ATTRIBUTES ASSOCIATED TO EDITING
        const elements=document.querySelectorAll("[is-element=true]") as any as HTMLElement[];//this covers all selector's eles and eles
        const cols = parent.querySelectorAll("[is-column=true]") as any as HTMLElement[];
        const popups1=parent.querySelectorAll("[isPopup='true']") as any as HTMLElement[];
        const popups3=parent.querySelectorAll("[is-popup='true']") as any as HTMLElement[];
        const popups2=parent.querySelectorAll("div#popup") as any as HTMLElement[];
        const deleteIcons=parent.getElementsByTagName("I") as any as HTMLElement[];
        const contentEdits=parent.querySelectorAll("[contenteditable='true']");
        const contentEditsFalse=parent.querySelectorAll("[contenteditable='false']");
        const IconHeaders=document.querySelectorAll("[is-icon='true']") as any as HTMLElement[];
        const formGroups=document.querySelectorAll("[data-form-group ='true']");
        // const textarea=document.querySelector("div#textarea");
        // const allIcons=textarea?.querySelectorAll("i");
        const flexchoices=document.querySelectorAll("div.flex-choices");
        const removeDesignSelectArrows=document.querySelectorAll("select.select-arrow") as unknown as HTMLElement[];

            if(flexchoices && showOn){
                ([...flexchoices as any]as HTMLElement[]).forEach(flex=>{
                    flex.style.opacity="0";
                    
                });
            }else{
                ([...flexchoices as any]as HTMLElement[]).forEach(flex=>{
                    flex.style.opacity="1";
                });
            }
                    //ALL COMPONENTS
                    //DESIGN REMOVE ARROW COLOR
                    if(removeDesignSelectArrows){
                        removeDesignSelectArrows.forEach(arrow=>{
                            arrow.remove();
                        })
                    }
                    IconHeaders.forEach((icon)=>{
                        if(icon as HTMLElement){
                            // console.log(icon)
                            if((icon as HTMLElement).style.display==="none"){
                                (icon as HTMLElement).style.display="block";
                            }else{
                                (icon as HTMLElement).style.display="none";
                            }
                            
                        }
                    });
                    ([...elements as any] as HTMLElement[]).forEach((element)=>{
                        
                            if(element && showOn){
                            element.classList.remove("box-shadow");
                            element.classList.remove("isActive");
                            ([...element.children as any] as HTMLElement[]).map(ele=>{
                                // console.log("displayBlog:847",ele)
                                const check1=ele.nodeName==="SVG";
                                const check2=([...ele.classList as any] as string[]).includes("isActive")
                                if(ele && check1 && check2){
                                    ele.classList.remove("isActive")
                                }
                            });
                            }
                            //within elements
                            const getIcons=element.getElementsByTagName("I");
                            if(showOn){
                                ([...getIcons as any] as HTMLElement[]).map(icon=>((icon as HTMLElement).style.display="none"));
                                }else{
                                    ([...getIcons as any] as HTMLElement[]).map(icon=>((icon as HTMLElement).style.display="block"));
                                }
                    });
                    //colums
                    ([...cols as any] as HTMLElement[]).map(col=>{
                        if(col as HTMLElement && showOn){
                            (col as HTMLElement).classList.remove("box-shadow");
                            (col as HTMLElement).classList.remove("coliIsActive");
                        }else{
                            // (col as HTMLElement).classList.add("box-shadow");
                        }
                    });
                    //Parent=textarea
                    ([...deleteIcons as any] as HTMLElement[]).map(icon=>{
                        if(icon as HTMLElement && showOn){
                            icon.classList.add("hide");
                        }else{
                            icon.classList.remove("hide");
                        }
                    });
                    ([...popups1 as any] as HTMLElement[]).map(popup=>{
                        if(popup as HTMLElement){
                            if(showOn){
                            popup.style.opacity="0";
                            }else{
                                popup.style.opacity="1";
                            }
                        }
                    });
                    ([...popups2 as any] as HTMLElement[]).map(popup=>{
                        if(popup as HTMLElement){
                            if(showOn){
                                popup.style.opacity="0";
                                }else{
                                    popup.style.opacity="1";
                                }
                        }
                    });
                    ([...popups3 as any] as HTMLElement[]).map(popup=>{
                        if(popup as HTMLElement){
                            if(showOn){
                                popup.style.opacity="0";
                                }else{
                                    popup.style.opacity="1";
                                }
                        }
                    });

                    if(contentEdits && contentEdits.length && contentEdits.length>0){
                        contentEdits.forEach((element)=>{
                            if(element && showOn){
                                element.setAttribute("contenteditable","false");
                            }
                        });
                    }else{
                        if(contentEditsFalse && contentEditsFalse.length){
                            contentEditsFalse.forEach((element)=>{
                                if(element && element.nodeName!=="I"){
                                    element.setAttribute("contenteditable","true");
                                    
                                }
                            });
                        }
                    };

                    ([...formGroups as any] as HTMLElement[]).map(formGrp=>{
                        if(formGrp as HTMLElement){
                            if( showOn){
                                (formGrp as HTMLElement).style.zIndex="-200";
                            }else{
                                (formGrp as HTMLElement).style.zIndex="1";
                            }
                        }
                    });
                


    }
  
   
    loadBlog(blog:blogType){
        this._blog=blog;
        this._selectors=blog.selectors;
        this._elements=blog.elements;
        this._codes=blog.codes;
    }
     async onlyMeta(parent:HTMLElement,blog:blogType){
        const container=document.createElement("div");
        container.style.cssText="display:flex;place-items:center;width:100%;background:white;";
        container.id="metaContainer";
        const metaCont=document.createElement("section");
        metaCont.style.cssText="width:100%;position:relative;margin-inline:auto;text-align:center;50vh;margin-bottom:2rem;";

        metaCont.classList.add("show-meta");
        metaCont.id="show-meta";
        if(blog.imgKey){
            const imgDiv=document.createElement('div');
            imgDiv.style.cssText="position:relative;text-align:center;display:flex;flex-direction:column;place-items:center;overflow:hidden;gap:2rem;"
            const img=document.createElement('img');
            img.id="blog-image";
            const res= await this._service.getSimpleImg(blog.imgKey);
                if(res){
                    img.src=res.img as string;
                    img.alt=res.Key as string;
                }else{
                    img.src=this.logo;
                }
            img.style.cssText="border-radius:10px;max-height:45vh";
            imgDiv.appendChild(img);
            metaCont.appendChild(imgDiv);
        }
        const title=document.createElement("h3");
        title.textContent=blog.name? blog.name : "";
        title.style.cssText="text-align:center;margin-bottom:2rem;margin-inline:auto;";
        title.className="text-primary";
        metaCont.appendChild(title);
        const desc=document.createElement("p");
        desc.style.cssText="margin-block:1rem;margin-inline:auto;padding-inline:2rem;text-align:center;";
        desc.className="px-md-2 ";
        desc.textContent=blog.desc ? blog.desc : "";
        metaCont.appendChild(desc);
        const divCont=document.createElement("div");
        divCont.style.cssText="margin-inline:auto;";
        Misc.divider({parent:metaCont,numLines:2,divCont,color:"blue"});
        parent.appendChild(container)
        container.appendChild(metaCont);
    }
    static noBlog(item:{parent:HTMLElement}){
        const {parent}=item;
        const container=document.createElement("section");
        container.style.cssText=`margin:auto;width:80%;padding-inline:1rem;padding-block:5rem;background-color:${Blogs.bg_color};color:white;border-radius:7px;position:relative;font-size:18px;`;
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{"width":"100%","paddingInline":"5px;","marginBlock":"2rem","paddingBlock":"2rem","maxWidth":"700px"}});
        const innerCont=document.createElement("div");
        innerCont.style.cssText="padding:1rem;box-shadow:1px 1px 10px 1px white,-1px -1px 10px 1px whitesmoke;margin:auto;border-radius:inherit;width:100%;position:relative;";
        const para=document.createElement("p");
        para.style.cssText="margin:auto;padding:0.5remrem;text-wrap:wrap;font-family:'Playwrite'";
        para.innerHTML=DisplayBlog.noBlogText;
        innerCont.appendChild(para);
        container.appendChild(innerCont);
        parent.appendChild(container);
        Misc.fadeIn({anchor:container,xpos:50,ypos:100,time:400});
        Misc.matchMedia({parent:container,maxWidth:800,cssStyle:{"maxWidth":"700px"}});
        Misc.matchMedia({parent:container,maxWidth:600,cssStyle:{"maxWidth":"500px"}});
        Misc.matchMedia({parent:container,maxWidth:460,cssStyle:{"maxWidth":"350px"}});

    }

    async showMeta(parent:HTMLElement,blog:blogType,printThis:boolean){
        const topContainer=document.createElement("section");
        topContainer.id="topContainer";
        topContainer.style.cssText="position:absolute;padding:5px;background:#0E3386;top:0px;right:60px;border-radius:0px 0px 20px 20px;box-shadow:1px 1px 5px 1px black,-1px -1px 5px 1px black;display:grid;place-items:center;z-index:400;";
        parent.appendChild(topContainer);
        const mediaTop:mediaQueryType={
            target:topContainer,
            css_min_attribute:{"transform":"","width":"130px","right":"60px"},
            css_max_attribute:{"transform":"translate(5px,-5px)","width":"90px","top":"-30px","right":"0px"},
            minWidth:412,
            maxWidth:412
        }
        Misc.mediaQuery(mediaTop);
        const container=document.createElement("div");
        container.style.cssText="display:grid;place-items:center;width:100%;background:white;";
        container.id="metaContainer";
        container.style.transform="translate(0px,0px)";
        if(printThis){
        container.style.transform="translate(100%,-110%)";
        }
        const text=this._showMeta ? "hide meta":"show meta";
        const btn:btnReturnType={
            parent:topContainer,
            text,
            bg:"#13274F",
            color:"white",
            type:"button"
        }
        ///////////////BODY CONTAINER-topContainer appends this!!!///////////////////////////////
        const metaCont=document.createElement("section");
        metaCont.style.cssText="width:100%;position:relative;margin-inline:auto;text-align:center;50vh;";

        metaCont.classList.add("show-meta");
        metaCont.id="show-meta";
        if(blog.imgKey){
            const imgDiv=document.createElement('div');
            imgDiv.style.cssText="position:relative;width:100%;text-align:center;"
            const img=document.createElement('img');
            img.id="blog-image";
            img.src=blog.img ? blog.img as string : this.logo;
            img.style.cssText="border-radius:10px;";
            imgDiv.appendChild(img);
            metaCont.appendChild(imgDiv);
        }
        const title=document.createElement("h3");
        title.textContent=blog.name? blog.name : "";
        title.style.cssText="text-align:center;margin-bottom:2rem;margin-inline:auto;";
        title.className="text-primary";
        metaCont.appendChild(title);
        const desc=document.createElement("p");
        desc.style.cssText="margin-block:1rem;margin-inline:auto;padding-inline:2rem;text-align:center;";
        desc.className="px-md-2 ";
        desc.textContent=blog.desc ? blog.desc : "";
        metaCont.appendChild(desc);
        separator(metaCont,this.btnColor);
        parent.appendChild(container)
        container.appendChild(metaCont);
        ///////////////BODY CONTAINER-topContainer appends this!!!///////////////////////////////
        ///////////////BODY CONTAINER///////////////////////////////
       const retBtn=smallbtnReturn(btn);
           retBtn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                const show_container=container.querySelector("#show-meta") as HTMLElement;
                if(show_container){
                    container.removeChild(show_container);
                    this._showMeta=true;
                }else{
                    this._showMeta=false;
                    container.appendChild(metaCont);//APPENDS BODY
                    metaCont.animate([
                        {maxHeight:"1vh",opacity:"0",zIndex:"-20"},
                        {maxHeight:"50vh",opacity:"1",zIndex:"0"},
            
                    ],{duration:700,iterations:1});
                    
                }
               
                }
           });
            
      
       
    }
  

    static removeCleanCss(item:{css:string|undefined,rmList:string[],addList:string[]}){
        const {css,rmList,addList}=item;
        if(!css) return "";
        let modList:string=css;
        //REMOVE FROM CSS
        let arr:string[]=modList.split(";");
        if(arr && arr.length>0){
            rmList.map(chList=>{
                arr=arr.filter(cl=>(!cl.includes(chList)));
            });
            //ADD TO CSS
            if(addList && addList.length>0 && arr && arr.length>0){
                addList.map(chList=>{
                        arr.push(chList);
                });
                modList=arr.join(";");
            }
            return arr.join(";").trim();
        }
    }
     static cleanUp(parent:HTMLElement){
        if(parent && parent.children){
        const check=([...parent.children as any] as HTMLElement[]).length>0 ? true:false;
        if(check){
            while(parent.firstChild){
                if(parent.lastChild){
                parent.removeChild(parent.lastChild);
                }
            }
        }
        }
     }
     static separator(parent:HTMLElement,bg:string){
        const div=document.createElement("div");
        div.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;";
        const inner=document.createElement("div");
        inner.style.cssText=`height:3px; width:85%;margin-inline:auto;background:${bg};margin-top:2.35rem;`;
        div.appendChild(inner);
        parent.appendChild(div);
     }
    
     static cleanUpID(parent:HTMLElement,ID:string){
        ([...parent.children as any] as HTMLElement[]).map(ch=>{
            if(ch && ch.id===ID){
                parent.removeChild(ch);
            }
        });
     }


}
export default DisplayBlog
export const cleanUp=DisplayBlog.cleanUp;
export const separator=DisplayBlog.separator;

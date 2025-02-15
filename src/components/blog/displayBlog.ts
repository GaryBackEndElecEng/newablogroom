import {blogType,selectorType,elementType,element_selType,codeType, flexType, userType,  colType, chartType, rowType} from "@/components/editor/Types";
import Blogs from "@/components/blogs/blogsInjection";
import {modAddEffect} from "@/components/editor/modSelector";
import ModSelector from "@/components/editor/modSelector";
import User from "@/components/user/userMain"
import Misc, {  mediaQueryType} from "../common/misc";
import Edit from "../editor/edit";
import Service from "@/components/common/services";
import { AWSImageLoader, btnReturnType, buttonReturn, imageLoader, smallbtnReturn } from '../common/tsFunctions';
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
import CodeElement from "../common/codeElement";
import HtmlElement from "../editor/htmlElement";
import PasteCode from "../common/pasteCode";
import Htmlpdf from "../common/htmltwocanvas";
import Headerflag from "../editor/headerflag";

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
 _pasteCode:PasteCode;
 static noBlogText:string;
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private _shapeOutside:ShapeOutside,private _code:NewCode,private chart:ChartJS,private _message:Message,private codeElement:CodeElement, private headerFlag:Headerflag){
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
      this._pasteCode=new PasteCode(this._modSelector,this._service);
      
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
    async main(item:{parent:HTMLElement,blog:blogType|null,user:userType|null}){
        const {parent,blog,user}=item;
        if(blog && user){
            const less400=window.innerWidth < 420;
            const less900=window.innerWidth < 900;
            const paddingInline=less900 ? (less400 ? "0rem" : "2px") :"1rem";
            DisplayBlog.cleanUp(parent);//cleansup duplicates
            const outerContainer=document.createElement("article");
            outerContainer.id="display-main";
            outerContainer.style.cssText="margin-inline:auto;margin-block:1rem;padding-block:auto;width:100%;position:relative;min-height:110vh;";
            outerContainer.style.paddingInline=paddingInline;
            outerContainer.style.paddingBlock=less900 ? (less400 ? "0rem" : "0rem") :"2rem";
            outerContainer.style.opacity="0";
            outerContainer.style.paddingBlock=less400 ? "0rem":"2rem";
            outerContainer.style.paddingBottom=less400 ? "2rem":"";
            
            //-----------BTN CONTAINER FOR FINAL WORK-----------------//
            const btnContainer=document.createElement("div");
            btnContainer.id="btnContainer";
            btnContainer.style.cssText="margin-inline:auto;";
            
            //-----------BTN CONTAINER FOR FINAL WORK-----------------//
            
            //-----------CONTAINER FOR FINAL WORK-----------------//
            const container=document.createElement("section");
            container.id="section-container";
            //CLASS=> CONTAINER => WIDTH:80%, LESS900=> NO CONTAINER
            container.className="section-container";
            container.style.cssText="margin-inline:auto;padding-block:1rem; height:100vh;overflow-y:scroll;position:relative;background-color:white;border-radius:11px;";
            outerContainer.appendChild(container);
            //-----------CONTAINER FOR FINAL WORK-----------------//
            const btnGrp=document.createElement("div");
            btnGrp.style.cssText="display:flex;flex-direction;justify-content:space-between;align-items:center;flex-wrap:wrap;"
            btnGrp.className="btn-group btnGrp justify-content-around gap-2";
            // BUTTON RETURN NAV OPTIONS
                // Main.cleanUp(btnGrp);
                const btnBack=buttonReturn({parent:btnGrp,text:"back",bg:"#0C090A",color:"white",type:"button"});
                btnBack.id="btnBack";
                const btnMain=buttonReturn({parent:btnGrp,text:"main",bg:"#0C090A",color:"white",type:"button"});
                btnMain.id="btnMain";
                const sendMsg=buttonReturn({parent:btnGrp,text:"sendMsg",bg:"#0C090A",color:"white",type:"button"});
                sendMsg.id="sendMsg";
                const btnEditor=buttonReturn({parent:btnGrp,text:"editor",bg:"#0C090A",color:"white",type:"button"});
                btnEditor.id="btnEditor";
                const print_btn=buttonReturn({parent:btnGrp,text:"print",bg:"green",color:"white",type:"button"});
                print_btn.id="printPdf_btn";
                [btnBack,btnMain,sendMsg,btnEditor,print_btn].map(async(btn)=>{
                    if(btn){
                        if(btn.id==="btnBack"){
                            btn.className=""
                            btn.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                window.history.go(-1)
                            }
                            });
                        }else if(btn.id==="btnMain"){
                            btn.className=""
                            btn.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                this.baseUrl=new URL(window.location.href);
                                const blogsUrl=new URL("/",this.baseUrl.origin);
                                window.location.href=blogsUrl.href;
                            }
                            });

                        }else if(btn.id==="sendMsg"){
                            btn.className=""
                            btn.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                this._message.contact(parent,blog);
                            }
                            });

                        }else if(btn.id==="btnEditor"){
                            btn.className=""
                            btn.addEventListener("click",(e:MouseEvent)=>{
                                if(e){
                                    this.baseUrl=new URL(window.location.href);
                                    const blogsUrl=new URL("/editor",this.baseUrl.origin);
                                    window.location.href=blogsUrl.href;
                                }
                                });
                        }else if(btn.id==="printPdf_btn"){
                            btn.addEventListener("click",(e:MouseEvent)=>{
                                if(e){
                                    this.baseUrl=new URL(window.location.href);
                                    const blogsUrl=new URL(`/printblog/${blog.id}`,this.baseUrl.origin);
                                    window.location.href=blogsUrl.href;
                                }
                                });
                        }

                    }
                });
               
                btnContainer.appendChild(btnGrp);

                setTimeout(()=>{
                    this.count++;
                    // console.log("btnGrp",btnGrp,"count",this.count)
                    Misc.growIn({anchor:btnGrp,scale:0,opacity:0,time:800});
                },800);
                
                //SHOWS PAGE
                await this.saveFinalWork({innerContainer:container,blog}).then(async(res)=>{
                    if(res){

                        this.getUserInfo({htmlUserInfo:outerContainer,user:user}).then(async(_res)=>{
                            if(_res && _res.outerContainer){
    
                                //BTN CONTAINER
                                outerContainer.appendChild(btnContainer);
                                //BTN CONTAINER
                            }
                        });
                       
                        //-----------INTRO EFFECT-----------////
                        setTimeout(()=>{
                            outerContainer.style.opacity="1";
                            outerContainer.animate([
                                {opacity:"0"},
                                {opacity:"1"},
                            ],{duration:700,iterations:1});
                        },0);
                        //-----------INTRO EFFECT-----------////
                       
                    }
                });
                //SHOWS PAGE
                
    
            Misc.matchMedia({parent:outerContainer,maxWidth:920,cssStyle:{paddingInline:"0rem",maxWidth:"100%",width:"100%"}});
            for(const key of Object.keys(parent.style)){
                if(key==="maxWidth"){
                    parent.style.maxWidth="100%";
                }
            }
            parent.appendChild(outerContainer);
            
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
            mainContainer.appendChild(innerContainer);
           await this.saveFinalWork({innerContainer,blog}).then(async(res)=>{
            if(res){

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
                                const newUrl=new URL(`/printblog/${blog.id}`,window.location.origin)
                                window.location.href=newUrl.href;
                                Misc.growOut({anchor:mainContainer,scale:0,opacity:0,time:400});
                                setTimeout(()=>{parent.removeChild(mainContainer);},398);
                            }
                          
                    }
                    });
                });
                btnContainer.appendChild(groupBtn);
                mainContainer.appendChild(btnContainer);
            }
           });
            
            modAddEffect(mainContainer);
            parent.appendChild(mainContainer);
            
            return parent;
        }
    }
    //--PARENT:showFinal(parent)-----------PARENT Edit.editSetup.saveWorkSetup-()---------///
   async saveFinalWork(item:{innerContainer:HTMLElement,blog:blogType}):Promise<{blogContainer:HTMLElement,innerContainer:HTMLElement}>{
        const {innerContainer,blog}=item;
        ShapeOutside.cleanUpByID(innerContainer,"popup");
        ShapeOutside.cleanUpByID(innerContainer,"setAttributes");
        const rmList=["overflow-y","overflow-x"];
        const addList=["height:auto"];
        blog.cssText=DisplayBlog.removeCleanCss({css:blog.cssText,rmList,addList});
        const container=document.createElement("div");
        container.className="final-work d-flex flex-column";
        container.style.cssText=blog.cssText ? blog.cssText : "margin-inline:auto;width:100%;height:100vh;overflow-y:scroll;margin-top:2rem;justify-content:flex-start;";
        container.style.flexDirection="column";
        container.style.width="100%";
        container.style.display="flex";
        container.style.placeItems="center";
        container.id="saveFinalWork-container";
        if(blog.imgBgKey){
            container.setAttribute("data-backgroundimage","true");
        //     const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
        //    await this._service.injectBgAwsImage({target:container,imgKey:blog.imgBgKey,cssStyle});
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
            main.style.cssText="width:100%;margin-inline:auto;position:relative;height:auto;";
           
            await Promise.all(Array.from(Array(maxCount+3).keys()).map(async(num)=>{
                const select =sels.find(sel=>(sel.placement===num+1));
                if(select){
                    await this.showCleanSelector({parent:main,selector:select});

                }
                const chart=charts.find(ch=>(ch.placement===num+1));
                if(chart){
                    // console.log("chart:insideside",chart)//works
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
        innerContainer.appendChild(container);
        return new Promise(resolve=>{
            resolve({blogContainer:container,innerContainer})
        }) as Promise<{blogContainer:HTMLElement,innerContainer:HTMLElement}>;
        
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
            const less900=window.innerWidth < 900 ;
            const less400=window.innerWidth < 400 ;
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
            const rows=JSON.parse(selector.rows) as rowType[];
                await Promise.all(rows.sort((a,b)=>{if(a.order < b.order){return -1}; return 1}).map(async(row_)=>{
                    const row=document.createElement("div");
                    row.className=row_.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                    row.style.cssText=row_.cssText;
                    row.setAttribute("name",row_.name);
                    row.setAttribute("rowID",`${row_.id}`);
                    row.setAttribute("order",String(row_.order));
                    row.id=row_.eleId;
                    if(less400){
                        row.style.flexDirection="column";
                    }
                    flex={...flex,rowId:row_.eleId,imgKey:row_.imgKey};
                    innerCont.appendChild(row);
                    Misc.matchMedia({parent:row,maxWidth:420,cssStyle:{flexDirection:"column"}});
                    if(row_.imgKey){
                        row.setAttribute("data-backgroundimage","true");
                    //     const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                    //    await this._service.injectBgAwsImage({target:row,imgKey:row_.imgKey,cssStyle});
                    }
                    await Promise.all(row_.cols && row_.cols.sort((a,b)=>{if(a.order < b.order){return -1}; return 1}).map(async(col_)=>{
                        const col=document.createElement("div");
                        col.id=col_.eleId;
                        col.setAttribute("colID",`${col_.id}`);
                        col.setAttribute("order",String(col_.order));
                        col.style.cssText=col_.cssText;
                        col.style.paddingInline="0rem";
                        if(less400){
                            col.style.flex="0 0 100%";
                            col.classList.remove("col-md-3");
                            col.classList.remove("col-md-4");
                            col.classList.remove("col-md-6");
                            col.classList.add("col-md-12");
                        }
                        col.className=col_.class.split(" ").filter(cl=>(cl !=="coliIsActive")).join(" ");
                        flex={...flex,colId:col_.eleId,imgKey:col_.imgKey}
                        col.setAttribute("flex",JSON.stringify(flex));
                        row.appendChild(col);
                        await this.showCleanColumnToEle({parent:parent,col:col,col_:col_,flex:flex,maxWidthImg:maxWidthImg}).then(async(res)=>{
                             if(res){
                                if(res.col && res.eles){
                                    const order=res.col.getAttribute("order") ? parseInt(res.col.getAttribute("order") as string):null;
                                    if(order===col_.order ){
                                        res.eles.map(ele=>{
                                            if(ele){
                                                res.col.appendChild(ele)
                                                
                                            }
                                        });
                                    }
                                }
 
                                 if(col_.imgKey){
                                     col.setAttribute("data-backgroundimage","true");
                                //      const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                                //    await this._service.injectBgAwsImage({target:resCol,imgKey:col_.imgKey,cssStyle});
                                 }
                             }
                         });
                    }));
                    
                   
                }));
            
           
        }
    };
    async showCleanColumnToEle(item:{parent:HTMLElement,col:HTMLElement,col_:colType,flex:flexType,maxWidthImg:string}): Promise<{
        col: HTMLElement;
        eles: (HTMLElement | undefined)[];
    }>{
        const {parent,col,col_,flex,maxWidthImg}=item;
        const less400=window.innerWidth < 400 ;
        const eles=await Promise.all(col_.elements && col_.elements.sort((a,b)=>{if(a.order < b.order){return -1}; return 1}).map(async (element)=>{
            const checkArr=["img","ul","blockquote","a","logo","image","time"].includes(element.name);
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
                if(less400){
                    ele.style.paddingInline="0.5rem";
                }
                if(element.name==="p"){
                    ele.style.lineHeight="1.75rem";
                }
                ele.innerHTML=element.inner_html;
                // col.appendChild(ele);
                if(element.attr==="data-backgroundImage" && element.imgKey){
                    ShapeOutside.cleanUpByID(parent,"popup");
                    ele.setAttribute("data-backgroundImage","true");
                    flex_={...flex_,backgroundImage:true,imgKey:element.imgKey};
                    // const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                    // await this._service.injectBgAwsImage({target:ele,imgKey:element.imgKey,cssStyle});
                    Misc.blurIn({anchor:ele,blur:"20px",time:500});
                }else if(element.attr==="data-shapeoutside-circle" && element.imgKey){
                    flex_={...flex_,shapeOutsideCircle:true,imgKey:element.imgKey};
                    ele.setAttribute("data-shapeoutside-circle","true");
                    // await this._shapeOutside.shapeOutsideInjectImage({para:ele,imgKey:element.imgKey});
                    Misc.blurIn({anchor:ele,blur:"20px",time:500});
                }else if(element.attr==="data-shapeoutside-square" && element.imgKey){
                    flex_={...flex_,shapeOutsideCircle:true,imgKey:element.imgKey};
                    ele.setAttribute("data-shapeoutside-square","true");
                    // await this._shapeOutside.shapeOutsideInjectImage({para:ele,imgKey:element.imgKey});
                    Misc.blurIn({anchor:ele,blur:"20px",time:500});
                }else if(element.attr==="data-shapeoutside-polygon" && element.imgKey){
                    ele.setAttribute("data-shapeoutside-polygon","true")
                    flex_={...flex_,shapeOutsidePolygon:true,imgKey:element.imgKey};
                    // await this._shapeOutside.shapeOutsideInjectImage({para:ele,imgKey:element.imgKey});
                    Misc.blurIn({anchor:ele,blur:"20px",time:500});
                }
                ele.setAttribute("flex",JSON.stringify(flex_));
                
                return ele;
            }else if(checkArr && element.name==="ul"){
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
                // col.appendChild(ele);
                return ele;
            }else if(checkArr && element.name==="blockquote"){
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
                // col.appendChild(ele);
                return ele;
            }else if(checkArr && element.name==="time"){
                const datetime=element.attr as string;// data-time for popup on hover
                const ele=document.createElement("time");
                ele.setAttribute("datetime",String(datetime))
                ele.id=element.eleId;
                ele.className=element.class;
                ele.classList.add("show-time");
                ele.classList.remove("isActive");
                ele.style.cssText=element.cssText;
                ele.innerHTML=element.inner_html;
                // col.appendChild(ele);
                return ele;
            }else if(checkArr && element.name==="a"){
                const linkObj=element && element.attr && element.attr.startsWith("http") && JSON.parse(element.attr) as {link:string};
                const emailObj=element && element.attr && element.attr.startsWith("mail") && JSON.parse(element.attr) as {email:string};
                const telObj=element && element.attr && element.attr.startsWith("tel") && JSON.parse(element.attr) as {tel:string};
                if(linkObj){
                    const {link}=linkObj as {link:string}
                    const ele=document.createElement("a");
                    ele.setAttribute("data-href",link);
                    ele.className=element.class;
                    ele.id=element.eleId;
                    ele.setAttribute("is-element","true");
                    ele.setAttribute("aria-selected","true");
                    ele.setAttribute("order",String(element.order));
                    ele.setAttribute("name",element.name);
                    ele.style.cssText=element.cssText;
                    ele.innerHTML=element.inner_html;
                    ele.href="";
                    // col.appendChild(divCont);
                    ele.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            return window.open(link,"_blank")
                        }
                    });
                    return ele;
                }else if(emailObj){
                    const {email}=emailObj;
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
                    // col.appendChild(ele);
                    return ele;
                }else if(telObj){
                    const {tel}=telObj;
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
                    // col.appendChild(ele);
                    return ele;
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
                // col.appendChild(ele);
                if(element.imgKey){
                    const res= await this._service.getSimpleImg(element.imgKey);
                    if(res){
                        ele.src=res.img as string;
                        ele.alt=res.Key as string;
                        Misc.blurIn({anchor:ele,blur:"20px",time:500});
                    }
                }
                return ele;
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
                // col.appendChild(ele);
                if(element.imgKey){
                    await this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                        if(res){
                            ele.src=res.img as string;
                            ele.alt=res.Key as string;
                            Misc.blurIn({anchor:ele,blur:"20px",time:500});

                        }
                   });
                }
                return ele
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
                // col.appendChild(ele);
                if(element.imgKey){
                    const res= await this._service.getSimpleImg(element.imgKey);
                    if(res){
                        ele.src=res.img as string;
                        ele.alt=res.Key as string;
                        Misc.blurIn({anchor:ele,blur:"20px",time:500});
                    }
                }
                return ele;
            }
            
        }));
        return {col,eles};
    }
    async showCleanElement(item:{parent:HTMLElement,element:elementType}){
        const {parent,element}=item;
        const less400= window.innerWidth < 400;
        await this.cleanElement({parent,element}).then(async(res)=>{
            if(res){

                const checkEle=["p","h1","h2","h3","h4","h5","h6","div","blockquote","ul","hr"].includes(res.element.name);
                const imgKey=res.element.imgKey;
                const attrArr=["data-shapeoutside-circle","data-shapeoutside-square","data-shapeoutside-polygon"]
                const link=res.element.attr && res.element.attr.startsWith("http") ? res.element.attr : null;
                const email=res.element.attr && res.element.attr.startsWith("mail") ? res.element.attr : null;
                const tel=res.element.attr && res.element.attr.startsWith("tel") ? res.element.attr : null;
                const type=res.element.type ? res.element.type : undefined;
                const headerflag=type==="headerflag";
                const shapeoutside=type==="shapeoutside";
                const checkType=["headerflag","shapeoutside"].find(ch=>(ch ===res.element.type));
                // console.log(element.name,checkEle)//works
                switch(true){
                    case checkEle && !checkType:
                        if(([...res.ele.classList as any] as string[]).includes("reference")){
                            this.reference.showCleanLinks({parent,ele:res.element});
                        }
                        if(imgKey){
                                if(res.element.attr==="data-backgroundImage"){
                                    ShapeOutside.cleanUpByID(parent,"popup");
                                    res.ele.setAttribute("data-backgroundImage","true");
                                }else if(res.element.attr="data-arrow-design"){
                                    res.ele.setAttribute("data-arrow-design","true");
                                    res.ele.setAttribute("imgKey",imgKey);
            
                                }else{
                                    ShapeOutside.cleanUpByID(res.ele,"popup");
                                    ShapeOutside.cleanUpByID(res.ele,"setAttributes");
                                }
                            
                        }if( res.element.attr==="data-is-code-element"){
                            res.ele.setAttribute(`${res.element.attr ? res.element.attr :"data-is-code-element"}`,"true");
                            this.codeElement.main({injector:parent,element:res.element,isNew:false,isClean:true});
                        }else if(res.element.attr==="data-is-code-paste"){
                            this._pasteCode.showClean({divCont:res.divCont,target:res.ele,element:res.element});
                        }else{

                            if(element.attr==="data-arrow-design"){
                                Misc.matchMedia({parent:res.ele,maxWidth:400,cssStyle:{paddingInline:"0rem",padding:"0px",height:"50vh"}});
                            }
                            res.ele.innerHTML=element.inner_html;
                        }
                        
                    return;
                    case shapeoutside && checkType !==undefined:
                        if(imgKey){
                            res.ele.setAttribute("imgKey",imgKey);
                            //    await this._shapeOutside.shapeOutsideInjectImage({para:res.ele,imgKey:imgKey});
                        }
                        const attrTest=res.element.attr;
                        if(attrTest && attrArr.includes(attrTest)){
                            res.ele.setAttribute(attrTest,attrTest);
                            res.ele.setAttribute(type,type);
                        }
                        res.ele.style.display=less400 ? "flex":"block";
                       res.ele.style.flexDirection=less400 ? "column":"";
                       res.ele.innerHTML=element.inner_html;
                       res.ele.style.cssText=element.cssText;
                       res.ele.className=element.class;
                    return;
                    case headerflag && checkType !==undefined:
                        res.divCont.removeChild(res.ele);//needed because cleanElement append ele;
                        this.headerFlag.showCleanHeaderflag({parent:res.divCont,element:res.element});
                    return;
                    case element.name==="img":
                        const width:number=700;
                        const img=res.ele as HTMLImageElement;
                        img.alt=element.inner_html;
                        res.ele.setAttribute("is-element","true");
                        img.src=element.img as string;
                        res.ele.style.cssText=element.cssText;
                        res.ele.style.width=`${width}px`;
                        res.ele.style.maxHeight="50vh";
                        if(element.imgKey){
                            const res_= await this._service.getSimpleImg(element.imgKey);
                            if(res_){
                                (res.ele as HTMLImageElement).src=res_.img;
                                (res.ele as HTMLImageElement).alt=res_.Key as string;
                            }
                        }else{
                            (res.ele as HTMLImageElement).src=this.logo;
                        }
                        const desc=document.createElement("SMALL");
                        desc.style.cssText=HtmlElement.imgDesc_css;
                        if(res.element.attr){
                            desc.textContent=res.element.attr ;
                            res.divCont.appendChild(desc);
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
    cleanElement(item:{parent:HTMLElement,element:elementType}):Promise<{ele:HTMLElement,divCont:HTMLElement,element:elementType}>{
        const {element,parent}=item;
        const less400=window.innerWidth < 400 ;
        const ele=document.createElement(element.name);
        ele.setAttribute("name",element.name);
        ele.setAttribute("is-element","true");
        if(element.type && element.attr){
            ele.setAttribute(element.attr,"true");
        }
        ele.classList.remove("isActive");
        ele.id=element.eleId;
        ele.className=element.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
        ele.classList.remove("isActive");
        ele.style.cssText=element.cssText;
        ele.style.paddingInline=less400 ? "0.25rem":"1rem";
        if(element.name==="p"){
            ele.style.lineHeight="1.75rem";
        }
        if(ele.nodeName==="UL" || ele.nodeName==="OL"){
            ele.style.lineHeight="1.85rem";
            const lis=(ele as HTMLElement).querySelectorAll("li") as any as HTMLElement[];
            lis.forEach(li=>{
                if(li && li.textContent===""){
                    li.remove();
                }
            });
        }
        if(less400){
            ele.style.paddingInline="0.5rem";
            ele.classList.remove("columns-3");
            ele.classList.remove("columns-4");
            ele.classList.remove("columns-2");
            ele.classList.remove("columns");
        };
        ele.style.marginInline="auto";
        const divCont=document.createElement("div");
        divCont.id="eleContainer";
        divCont.style.cssText="margin-block:auto;padding:0.25rem;position:relative;width:100%;display:flex;flex-direction:column;align-items:center;";
        divCont.appendChild(ele);
        parent.appendChild(divCont);
        return new Promise(resolve=>(
            resolve({ele,divCont,element})
        )) as Promise<{ele:HTMLElement,divCont:HTMLElement,element:elementType}>;
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
                            this._code.matchInsert({preChild:para,regArr:regType.arrType});
                        }else if(selectCode.name==="html"){
                            this._code.matchInsert({preChild:para,regArr:regType.arrType});
                        }else if(selectCode.name==="python"){
                            this._code.matchInsert({preChild:para,regArr:regType.arrType});
                        }else if(selectCode.name==="JSON"){
                            this._code.matchInsert({preChild:para,regArr:regType.arrType});
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
            const cssStyle={"color":"yellow","fontSize":"28px"};
            const rowCssStyle={backgroundColor:"black",borderRadius:"8px",filter:"drop-shadow(0 0 0.25rem black)"};
            Misc.starRating({parent:container,rating:rating,cssStyle,rowCssStyle});
            parent.appendChild(container);
        }
    }
     ///////////////////FINALE SHOW/////////////////////////////

    
   
    
   async getUserInfo(item:{htmlUserInfo:HTMLElement,user:userType|null}): Promise<{user:userType | null,outerContainer:HTMLElement}>{
    const {htmlUserInfo,user}=item;
    const less900=window.innerWidth <900;
    const less400=window.innerWidth <400;
    const css_col="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0;";
    const css_row="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.25rem;flex-wrap:wrap;";
    Header.cleanUpByID(htmlUserInfo,"displayBlog-user-container");
        htmlUserInfo.style.position="relative";
        const container=document.createElement("div");
        container.id="displayBlog-user-container";
        container.style.cssText="margin-inline:auto;margin-block:1.25rem;display:flex;align-items:center;justify-content:space-around;flex-wrap:wrap;background-color:white;border-radius:11px;padding-inline:1.25rem;box-shadow:1px 1px 12px 2px #10c7e9ab,-1px -1px 12px 1px #10c7e9ab;max-width:800px;";
        container.style.width=less900 ? (less400 ? "100%" :"85%" ) : "67%";
        container.style.paddingInline=less900 ? (less400 ? "1rem" :"1.5rem" ) : "2rem";
        if(!(user && user.id && user.showinfo)) return {user:null,outerContainer:htmlUserInfo};
                const img=document.createElement("img");
                const maximgwidth=less400 ? 90 : 120;
                img.style.cssText=`max-width:${maximgwidth}px;border-radius:50%;aspect-ratio: 1 / 1;box-shadow:1px 1px 10px 1px black;float:left; `;
                if(user.imgKey){
                   await this._service.getSimpleImg(user.imgKey).then(async(res_)=>{
                        if(res_){
                            img.src=res_.img;
                            img.alt=res_.Key;
                        }
                    });
                }else{
                    img.src=user.image ? user.image: imageLoader({src:this.logo2,quality:75,width:maximgwidth});
                    img.alt=user.name ? user.name: "blogger";
                }
                Misc.blurIn({anchor:img,blur:"10px",time:600});
                container.appendChild(img);
                const infoContainer=document.createElement("div");
                infoContainer.id="getUserInfo-infoContainer";
                infoContainer.style.cssText=css_col + "height:auto;"
                const nameEmail=document.createElement("div");
                nameEmail.id="nameEmail";
                nameEmail.style.cssText=css_row + "width:100%;justify-content:space-between;";
                const email=document.createElement("span");
                email.innerHTML=user.email ? `<span style="color:blue;text-decoration:underline;">email:</span><span>${user.email}<span>`:"";
                email.style.display=user.email ? "block":"none";
                nameEmail.appendChild(email);
                const name=document.createElement("span");
                name.className="text-primary";
                name.innerHTML=user.name ? `<span class='text-primary'>name: </span><span>${user.name}<span>`:"";
                name.style.textWrap="pretty";
                name.style.display=user.name ? "block":"none";
                nameEmail.appendChild(name);
                infoContainer.appendChild(nameEmail);
                const bioMain=document.createElement("div");
                bioMain.id="bioMain";
                bioMain.style.cssText=css_row + "width:100%;margin-top:0.25rem;";
                bioMain.style.flexDirection=less400 ? "column":"row";
                const bioName=document.createElement("h6");
                bioName.textContent="Bio:";
                bioName.className="text-primary mx-2";
                bioName.style.flex=less400 ? "1 0 100%": "1 0 28%";
                bioMain.appendChild(bioName);
                const bioCont=document.createElement("div");
                bioCont.id="bioCont";
                bioCont.style.cssText=css_col + "border-radius:12px;height:100%;overflow-y:scroll;background-color:black;color:white;";
                bioCont.style.flex=less400 ? "1 0 100%": "1 0 70%";
                bioCont.style.width=less400 ? "100%": "auto";
                bioCont.style.boxShadow=user && user.bio ? "1px 1px 12px 1px #04788f" : "";
                bioCont.style.padding=user && user.bio ? "0.25rem" : "";
                bioCont.style.maxHeight=less900 ? (less400 ? "300px":"200px"):"150px";
                const bio=document.createElement("p");
                bio.id="bio";
                bio.style.cssText="text-wrap:pretty;"
                bio.textContent=user.bio ? user.bio :"";
                bioCont.appendChild(bio);
                bioMain.appendChild(bioCont);
                infoContainer.appendChild(bioMain);
                container.appendChild(infoContainer);
                htmlUserInfo.appendChild(container);
                return {user,outerContainer:htmlUserInfo}
        
            
      
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

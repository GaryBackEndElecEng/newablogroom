import {blogType,selectorType,elementType,element_selType,codeType, userType,  colType, chartType, rowType, arrDivPlaceType} from "@/components/editor/Types";
import Blogs from "@/components/blogs/blogsInjection";
import ModSelector,{modAddEffect} from "@/components/editor/modSelector";
import User from "@/components/user/userMain"
import Misc, {  mediaQueryType} from "../common/misc";
import Service from "@/components/common/services";
import { btnReturnType, buttonReturn, imageLoader, smallbtnReturn } from '../common/tsFunctions';
import Main from "../editor/main";
import Message from "@/components/common/message";
import ShapeOutside from "../editor/shapeOutside";
import Header from "../editor/header";
import Reference from "../editor/reference";


import ChartJS from "../chart/chartJS";
import HtmlElement from "../editor/htmlElement";
import PasteCode from "../common/pasteCode";
import { idEnumType, idValueType, selRowColType, typeEnumType, } from "@/lib/attributeTypes";
import Dataset from '../common/dataset';
import { attrEnumArrTest, typeEnumArrTest } from "../common/lists";
import { Chart } from "chart.js";
import { barOptionType, lineOptionType } from "../common/chartTypes";



class DisplayBlog{
    public readonly btnDetail:string;
    public count:number;
    public baseUrl:URL;
    public url:string;
    public signin:string;
    public imgLoad:string;
    public logo:string;
    public logo2:string;
    public phone:string;
    public mail:string;
    public link:string;
    public mainSection:HTMLElement|null;
    private _blog:blogType;
    private _codes:codeType[];
    private _charts:chartType[];
    private _selector:selectorType;
    private _selectors:selectorType[];
    private _elements:elementType[];
    private _element:elementType;
    private _element_sel:element_selType;
    private _element_sels:element_selType[];
    private _bgColor:string="#41393C";
    private _pasteCode:PasteCode;
    public btnColor:string;
    // _edit:Edit;
    private reference:Reference;
    _onlyMeta:boolean=false;
    _showOn:boolean;
    _showMeta=false;
    public printThis:boolean;
    private _arrDivPlaces:arrDivPlaceType[]
    public static noBlogText:string;

    private _modSelector:ModSelector;
    constructor(modSelector:ModSelector,private _service:Service,private _user:User,blog:blogType|null,private chart:ChartJS,private _message:Message,private htmlElement:HtmlElement){
        this._modSelector=modSelector;
        this.btnDetail=this._modSelector.btnDetail;
        // console.log("Display",blog)
        this.mail="/images/mail.png";
        this.phone="/images/phone.png";
        this.link="/images/link.png";
        this._arrDivPlaces=[];
        this.count=0;
        this.mainSection=document.querySelector("section#main");
        this.printThis=false;
        this.baseUrl=new URL(window.location.href);
        this._bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.logo="/images/gb_logo.png";
        this.logo2="/images/gb_logo.png";
        this.url="/api/blog";
        this.signin="/api/user";
        this.imgLoad="/api/imgload";
        this._showOn=true;
        this._blog=blog || {} as blogType;
        this._codes=blog?.codes || [] as codeType[];
        this._charts=blog?.charts || [] as chartType[];
        this._selector={} as selectorType;
        this._selectors=blog?.selectors || [] as selectorType[];
        this._elements=blog?.elements || [] as elementType[];
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
      
    };
    //GETTERS SETTERS
    
    get blog(){
        return this._blog;
    };
    set blog(blog:blogType){
        this._blog=blog;
    }
   
     //GETTERS SETTERS
     

     //MAIN INJECTION DONE @ Index.tsx//id=client_blog
    async main(item:{parent:HTMLElement,blog:blogType|null,user:userType|null}){
        const {parent,blog,user}=item;
        const idValues=this._modSelector.dataset.idValues;
        
        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center";
        this._arrDivPlaces=[];
        if(blog ){
            console.log("MESSAGES",blog.messages)
            const less400=window.innerWidth < 420;
            const less900=window.innerWidth < 900;
            const paddingInline=less900 ? (less400 ? "0rem" : "2px") :"1rem";
            DisplayBlog.cleanUp(parent);//cleansup duplicates
            const outerContainer=document.createElement("article");
            outerContainer.id="display-main";
            outerContainer.style.cssText=css_col +"margin-inline:auto;margin-block:1rem;padding-block:auto;width:100%;position:relative;min-height:110vh;gap:2rem;";
            outerContainer.style.paddingInline=paddingInline;
            outerContainer.style.paddingBlock=less900 ? "0%" :"2rem";
            outerContainer.style.opacity="0";
            outerContainer.style.paddingBlock=less400 ? "0rem":"2rem";
            outerContainer.style.paddingBottom=less400 ? "2rem":"";
            //-------------COMMENT CONTAINER----------------------------///
            const commentUserCont=document.createElement("div");
            commentUserCont.id="commentUserCont";
            commentUserCont.style.cssText=css_col +"margin-inline:auto;width:100%;gap:1rem;";
            //-------------MCOMMENT CONTAINER----------------------------///
          
            //-------------META- BLOG----------------------------///
            const metaCont=document.createElement("div");
            metaCont.id="displayBlog-main-metaCont";
            metaCont.style.cssText=css_col;
            this.metaDisplay({parent:metaCont,blog,user,css_col,less900,less400});
            outerContainer.appendChild(metaCont);
            //-------------META- BLOG----------------------------///
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
            outerContainer.appendChild(commentUserCont);
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
                            btn.addEventListener("click",async(e:MouseEvent)=>{
                            if(e){
                                const getComment=outerContainer.querySelector("div#commentUserCont") as HTMLElement;
                                if(getComment){
                                    await this._message.contact({
                                        parent,
                                        commentCont:getComment,
                                        blog,
                                        func:async({msgs})=>{
                                            this._message.contactCards(getComment,msgs);
                                            await this.showUserComments({parent:outerContainer,user,blog,css_col,showComment:true});
                                        }
                                    });

                                }
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
                await this.saveFinalWork({innerContainer:container,blog,idValues,arrDivPlaces:this._arrDivPlaces,less900,less400}).then(async(res)=>{
                    if(res){
                       await this.showUserComments({parent:outerContainer,user,blog,css_col,showComment:false});
                        //BTN CONTAINER
                        outerContainer.appendChild(btnContainer);
                        //BTN CONTAINER
                       
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
     };


     metaDisplay({parent,blog,user,css_col,less900,less400}:{parent:HTMLElement,blog:blogType,user:userType|null,css_col:string,less900:boolean,less400:boolean}){
        const container=document.createElement("div");
        container.id="metaDisplay-cont";
        container.style.cssText=css_col + "position:relative;background-color:white;color:black;width:100%;";
        container.style.height="auto";
        container.style.borderRadius="8px";
        const title=document.createElement("p");
        title.id="metaDisplay-title";
        title.classList.add("title-art-display");
        title.textContent=blog.title || "";
        const para=document.createElement("p");
        para.style.cssText="margin-inline:auto;margin-block:1rem;padding-inline:1rem; padding-block:0.5rem;height:100%;position:relative;";
        para.id="metaDisplay-para";
        para.style.height=less900 ? (less400 ? "auto":"30vh"):"20vh";
        para.style.lineHeight="2.1rem";
        const text = new Text(blog.desc || "");
        const img=document.createElement("img");
        img.style.cssText="margin-inline:auto;margin-right:2rem;border:none;";
        img.style.height=less400 ? "auto":"100%";
        img.style.width=less400 ? "100%":"auto";
        img.style.float="left";
        if(blog.imgKey){
             this._service.getSimpleImg(blog.imgKey).then(async(res)=>{
                if(res){
                    img.src=res.img;
                    img.alt=res.Key;
                }
            });
        }else{
            img.src=this.logo;
            img.alt="www.ablogroom.com";
        };
        if(less400){
            para.style.display="flex";
            para.style.alignItems="center";
            para.style.flexDirection="column";
        }
         if(blog?.attr==="circle"){
            img.style.shapeOutside=less400 ? "": "circle(50%)";
            img.style.borderRadius="50%";
            img.style.border="none";
            img.style.aspectRatio="1 /1";
           
        }else{
            img.style.shapeOutside=less400 ? "":"square()";
            img.style.borderRadius="8px";
            img.style.border="none";
        };
       

        para.appendChild(img);
        Misc.blurIn({anchor:img,blur:"20px",time:600});
        para.appendChild(text);
        container.appendChild(title);
        container.appendChild(para);
        parent.appendChild(container);


     };


     async showUserComments({parent,user,blog,css_col,showComment}:{parent:HTMLElement,user:userType|null,blog:blogType,css_col:string,showComment:boolean}){
        const getCommentUser=parent.querySelector("div#commentUserCont") as HTMLElement;
        if(getCommentUser){
          
            Header.cleanUp(getCommentUser);
            const {button:btnComments}=Misc.simpleButton({anchor:getCommentUser,bg:this.btnDetail,color:"white",text:"show comments",time:600,type:"button"});
            const userCont=document.createElement("div");
            userCont.id="userCont";
            userCont.style.cssText=css_col;
            userCont.style.width="100%";
            userCont.style.marginInline="auto";
            getCommentUser.appendChild(userCont);
            const commentCont=document.createElement("div");
            commentCont.id="userCont";
            commentCont.style.cssText=css_col ;
            commentCont.style.width="100%";
            commentCont.style.marginInline="auto";
            getCommentUser.appendChild(commentCont);
            await this.getUserInfo({htmlUserInfo:userCont,user:user});

            await  this._message.getBlogMsgs(commentCont,blog.id).then(async(res1)=>{
                if(res1){
                    this._message.contactCards(res1.container,res1.messages);
                }
            });
            const len=this._message.messages.length;
                    if(len<=0){
                        btnComments.hidden=true;
                    }else{
                        btnComments.hidden=false;
                    };
            commentCont.hidden=true;
            if(showComment){
                btnComments.textContent="close";
                commentCont.hidden=false;
                userCont.hidden=true;
                Misc.growIn({anchor:commentCont,scale:0,opacity:0,time:400});
                
            }
            btnComments.onclick=(e:MouseEvent)=>{
                if(!e) return;
                if(commentCont.hidden===true){
                    btnComments.textContent="close";
                    commentCont.hidden=false;
                    userCont.hidden=true;
                    Misc.growIn({anchor:commentCont,scale:0,opacity:0,time:400});
                }else{
                    btnComments.textContent="show comments";
                    commentCont.hidden=true;
                    userCont.hidden=false;
                    Misc.growIn({anchor:userCont,scale:0,opacity:0,time:400});
                }
                

            };
            
        }
     };



    async awaitBlog(blog:blogType):Promise<{blog:()=>blogType}>{
        //NOTE: RELAY PLACEMENT THROUGH HERE
        return  Promise.resolve({
                blog:()=>{
                    this._selectors=blog.selectors;
                    this._elements=blog.elements;
                    this._codes=blog.codes;
                    this._charts=blog.charts;
                    this.blog={...blog,selectors:this._selectors,elements:this._elements,codes:this._codes,charts:this._charts};
                    return blog;
                }

            })
     }
     ///////////////////FINALE SHOW/////////////////////////////
     //INJECTED IN MAIN (BUTTON => final)
    
    async showFinal({parent,blog,idValues,less400,less900}:{parent:HTMLElement,blog:blogType,idValues:idValueType[],less400:boolean,less900:boolean}):Promise<HTMLElement|undefined>{
        this._arrDivPlaces=[];
        this.cleanAttributes(parent,true);
        const checkBlog=(( blog?.elements.length>0 || blog?.selectors.length>0) || blog?.charts.length>0);
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
           await this.saveFinalWork({innerContainer,blog,idValues,arrDivPlaces:this._arrDivPlaces,less900,less400}).then(async(res)=>{
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
   async saveFinalWork({innerContainer,blog,idValues,arrDivPlaces,less900,less400}:{
    innerContainer:HTMLElement,
    blog:blogType,
    idValues:idValueType[],
    arrDivPlaces:arrDivPlaceType[],
    less900:boolean,
    less400:boolean

   }):Promise<{blogContainer:HTMLElement,innerContainer:HTMLElement}>{
       
        ShapeOutside.cleanUpByID(innerContainer,"popup");
        ShapeOutside.cleanUpByID(innerContainer,"setAttributes");
        const rmList=["overflow-y","overflow-x"];
        const addList=["height:auto"];
        blog.cssText=DisplayBlog.removeCleanCss({css:blog.cssText,rmList,addList});
        const container=document.createElement("div");
        container.className="final-work d-flex flex-column";
        container.style.cssText=blog.cssText ? blog.cssText : "margin-inline:auto;width:100%;height:100vh;overflow-y:scroll;margin-top:2rem;justify-content:flex-start;gap:2rem";
        container.style.flexDirection="column";
        container.style.width="100%";
        container.style.display="flex";
        container.style.placeItems="center";
        container.id="saveFinalWork-container";
        if(blog.imgBgKey){
            container.setAttribute("data-backgroundimage","true");
    
        }

        const header=blog.selectors.find(sel=>(sel.header));
        const sels=( blog.selectors) ? blog.selectors.filter(sel=>(!sel.header)).filter(sel=>(!sel.footer)) as selectorType[] : [] as selectorType[];
        const eles=(blog.elements && blog.elements.length>0)? blog.elements : [] as elementType[];
        const maxCount=ModSelector.maxCount(blog);
        const footer= blog.selectors.find(sel=>(sel.footer));
        const charts=(blog.charts && blog.charts.length>0) ? blog.charts : [] as chartType[]
       
        if(header){
            const head=document.createElement(header.name);
            head.style.cssText=ModSelector.mainHeader_css ? ModSelector.mainHeader_css as string : "margin-inline:0px;width:100%;display:flex;flex-direction:column;align-items:center;";
            head.className=ModSelector.mainHeader_class ? ModSelector.mainHeader_class :"sectionHeader";
            head.id=Main._mainHeader? Main._mainHeader.id as string :"mainHeader";
         
       
           const _header= await this.showCleanSelector({parent:head,selector:header,idValues,less900,less400});
            container.appendChild(_header);
        }
        if(maxCount>0){
            const main=document.createElement("section");
            main.id="saveFinalWork-section-main";
            main.style.cssText="width:100%;margin-inline:auto;position:relative;height:auto;";
            await Promise.all(Array.from(Array(maxCount+3).keys()).map(async(num)=>{
                const check=arrDivPlaces.find(item=>(item.id===num));
                if(num>0 && !check){

                    const select =sels.find(sel=>(sel.placement===num));
                    if(select){
                      const divCont= await this.showCleanSelector({parent:main,selector:select,idValues,less900,less400});
                        arrDivPlaces.push({id:num,divCont,displayClean:true,parent:main,type:"selector",selector:select,element:null,chart:null,target:divCont})
    
                    }
                    const chart=charts.find(ch=>(ch.placement===num));
                    if(chart){
                        // console.log("chart:insideside",chart)//works
                        await this.chart.showCleanChart({parent:main,chart}).then(_res=>{
                            if(_res){
                              
                                arrDivPlaces.push({id:_res.placement,parent:main,displayClean:true,type:"chart",divCont:_res.divCont,target:_res.target,chart:chart,selector:null,element:null});
                            }
                        });
                    }
                    const ele=eles.find(el=>(el.placement===num));
                    if(ele){
                      
                        await this.htmlElement.showCleanElement({parent:main,element:ele,idValues}).then(async(res)=>{
                            if(res?.div_cont){
                                const {target,divCont}=res.div_cont;
                                target.style.lineHeight="";
                                arrDivPlaces.push({id:res.div_cont.placement,parent:main,displayClean:true,type:"element",divCont,element:ele,selector:null,chart:null,target});
                               
                            }
                        });
                    }
                
                }
            })).then(()=>{
                arrDivPlaces.toSorted((a,b)=>{if(a.id <b.id) return -1;return 1}).map(item=>{
                    if(item){
                   
                        if(item.type==="element" || item.type==="selector"){
                            item.parent.appendChild(item.divCont);
                            item.target.removeAttribute("contenteditable");
                            Header.cleanUpByID(item.divCont,"setAttributes");
                        }else if(item.type==="chart" && item.chart){
                            const {divCont,chart}=item
                            const ctx=item.target as HTMLCanvasElement;
                            const option=JSON.parse(chart.chartOption) as barOptionType|lineOptionType;
                            item.parent.appendChild(divCont);
                            const _chart=new Chart(ctx,option);

                        }
                    }
                });
            });
            container.appendChild(main);
            Misc.matchMedia({parent:main,maxWidth:400,cssStyle:{paddingInline:"0px"}});
            }
        if(footer){
            const foot=document.createElement(footer.name);
            foot.className=ModSelector.mainFooter_class;
            foot.style.cssText=ModSelector.mainFooter_css;
           const _footer=await this.showCleanSelector({parent:foot,selector:footer,idValues,less400,less900});
            container.appendChild(_footer);
        }
        innerContainer.appendChild(container);
        return Promise.resolve({blogContainer:container,innerContainer}) as Promise<{blogContainer:HTMLElement,innerContainer:HTMLElement}>;
        
    };



   async showCleanSelector({parent,selector,idValues,less900,less400}:{parent:HTMLElement,selector:selectorType,idValues:idValueType[],less400:boolean,less900:boolean}):Promise<HTMLElement>{
   
       
        const innerCont=document.createElement(selector.name);
       
      
        if(selector?.name){
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
            
            const {rows}=this._modSelector.checkGetRows({select:selector});
            if(rows && rows.length>0){

                await Promise.all(rows.toSorted((a,b)=>{if(a.order < b.order){return -1}; return 1}).map(async(row_)=>{
                    if(row_){

                        const eleId=row_.eleId;
                        const len=row_.cols.length
                        const numRows=selector.rowNum;
                        idValues.push({eleId,id:"rowId",attValue:eleId});
                        idValues.push({eleId,id:"rowOrder",attValue:String(row_.order)});
                        idValues.push({eleId,id:"numCols",attValue:String(len)});
                        idValues.push({eleId,id:"rowNum",attValue:String(numRows)});
                        const row=document.createElement("div");
                        row.className=row_.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                        row.style.cssText=row_.cssText;
                        row.id=eleId;
                        if(less400){
                            row.style.flexDirection="column";
                            row.style.maxHeight="";
                        };
                        
                        innerCont.appendChild(row);
                        Misc.matchMedia({parent:row,maxWidth:420,cssStyle:{flexDirection:"column"}});
                        if(row_.imgKey){
                            row.setAttribute("data-backgroundImg","true");
                            idValues.push({eleId,id:"imgKey",attValue:row_.imgKey});
                            idValues.push({eleId,id:"backgroundImg",attValue:"true"});
                            const url=this._service.getFreeBgImageUrl({imgKey:row_.imgKey});
                            row.style.backgroundImage=`url(${url})`;
                        };
                        this._modSelector.dataset.populateElement({target:row,level:"row",loc:"flexbox",idValues,selRowColEle:row_,clean:true});
                        await Promise.all(row_.cols.toSorted((a,b)=>{if(a.order < b.order){return -1}; return 1}).map(async(col_)=>{
                            if(col_){
                                const selRowCol:selRowColType={
                                    selectorId:selector.eleId,
                                    rowId:row_.eleId,
                                    colId:col_.eleId

                                }

                               await this.generateCleanColumn({row,sel:selector,row_,col_,selRowCol,idValues,less400:less400,less900}).then(async(cres)=>{
                                    if(cres){
                                        cres.col_.elements.map(async(element)=>{
                                            if(element){
                                                await this.generateCleanElement({
                                                    selRowCol,
                                                    col:cres.col,
                                                    col_:cres.col_,
                                                    element:element,
                                                    maxWidthImg:maxWidthImg,
                                                    idValues:cres.idValues,
                                                    less400:cres.less400
        
                                                }).then(async(res)=>{
                                                     if(res){
                                                        res.parent.appendChild(res.divCont);
                                                        Misc.blurIn({anchor:res.divCont,blur:"20px",time:600});
                                                     };
                                                 });
                                            }
                                        });

                                    }
                                });
                            };
                        }));
                    };
                    
                   
                }));
            };
            
            };
            return innerCont
    };


   async generateCleanColumn({row,sel,selRowCol,col_,row_,idValues,less400,less900}:{
        row:HTMLElement;
        selRowCol:selRowColType;
        sel:selectorType;
        col_:colType;
        row_:rowType;
        idValues:idValueType[],
        less400:boolean,
        less900:boolean
    }):Promise<{row:HTMLElement,sel:selectorType,col:HTMLElement,col_:colType,row_:rowType,less400:boolean,idValues:idValueType[]}>{
        const eleId=col_.eleId;
        const col=document.createElement("div");
        col.id=eleId;
        idValues.push({eleId,id:"colId",attValue:eleId});
        idValues.push({eleId,id:"colOrder",attValue:(String(col_.order))});
        idValues.push({eleId,id:"rowId",attValue:row_.eleId});
        idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
        col.style.cssText=col_.cssText;
        col.style.width=less900 ? "100%" :"";
        col.style.paddingInline="0rem";
        if(less400){
            col.style.flex="0 0 100%";
            col.classList.remove("col-md-3");
            col.classList.remove("col-md-4");
            col.classList.remove("col-md-6");
            col.classList.add("col-md-12");
            col.style.minHeight="22vh";
            col.style.width="100%";
            col.style.borderRadius="6px";
            col.style.borderBottom="1px solid lightgrey";
        }
        if(col_.imgKey){
            idValues.push({eleId,id:"imgKey",attValue:col_.imgKey});
            idValues.push({eleId,id:"backgroundImg",attValue:"true"});
            const url=this._service.getFreeBgImageUrl({imgKey:col_.imgKey});
            col.style.backgroundImage=`url(${url})`;
            
        }
        col.className=col_.class;

        this._modSelector.dataset.populateElement({target:col,level:"col",loc:"flexbox",idValues,selRowColEle:col_,clean:true});
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId})
        const {cleaned}=this._modSelector.removeClasses({target:col,classes:["isActive","box-shadow","coliIsActive"]});
        col.className=cleaned.join(" ");
        row.appendChild(col);
        return Promise.resolve({row,sel,col,row_,col_,idValues,less400}) as Promise<{row:HTMLElement,sel:selectorType,col:HTMLElement,row_:rowType,col_:colType,idValues:idValueType[],less400:boolean}>;
    };


    async generateCleanElement({selRowCol,col,element,col_,maxWidthImg,idValues,less400}:{
        selRowCol:selRowColType;
        col:HTMLElement;
        element:element_selType;
        col_:colType;
        maxWidthImg:string;
        idValues:idValueType[];
        less400:boolean;

    }): Promise<arrDivPlaceType|undefined>{
       //USE TYPE TO PULL (SHAPEOUTSIDE && REFERENCE TO PULL FROM)
       const checkTypeArr:{id:typeEnumType,test:boolean|undefined,value:string|undefined}[]=[];
       const len=col_.elements.length;
        const eleId=element.eleId;
        const node=element.name;
        const checkArr=["img","blockquote","ol","ul","a","logo","image","time"].includes(node);
        
        const attrTest=attrEnumArrTest(element);
        const typeTest=typeEnumArrTest(element);
        const isShapeOutSide=(typeTest && typeTest.id==="shapeOutside") ? typeTest:undefined;
        if(isShapeOutSide) checkTypeArr.push(isShapeOutSide);
        const isHeaderflag=(typeTest && typeTest.id==="headerflag") ? typeTest:undefined;
        if(isHeaderflag) checkTypeArr.push(isHeaderflag);
        const isDesign=(typeTest && typeTest.id==="design") ? typeTest:undefined;
        if(isDesign)checkTypeArr.push(isDesign);
        const isVen=(typeTest && typeTest.id==="ven") ? typeTest:undefined;
        if(isVen) checkTypeArr.push(isVen);
        const isReference=(typeTest && typeTest.id==="reference") ? typeTest:undefined;
        if(isReference) checkTypeArr.push(isReference);
        const isCircle=(attrTest && attrTest.id==="shapeOutsideCircle") ? attrTest:undefined; 
        const isSquare=(attrTest && attrTest.id==="shapeOutsideSquare") ? attrTest:undefined; 
        const isPolygon=(attrTest && attrTest.id==="shapeOutsidePolygon") ? attrTest:undefined; 
        const isBg=(attrTest && attrTest.id==="backgroundImg") ? attrTest:undefined; 
        const isImgkey=(attrTest && attrTest.id==="imgKey") ? attrTest:undefined; 
        const isLink=(attrTest && attrTest.id==="link") ? attrTest:undefined; 
        const isEmail=(attrTest && attrTest.id==="email") ? attrTest:undefined; 
        const isTel=(attrTest && attrTest.id==="tel") ? attrTest:undefined; 
        const link= isLink ? isLink.value:undefined; 
        const email= isEmail ? isEmail.value:undefined; 
        const tel= isTel ? isTel.value:undefined;
        const isTime=(attrTest && attrTest.id==="time") ? attrTest:undefined; 
        const time= isTime ? isTime.value:undefined;
        if(isHeaderflag) idValues.push({eleId,id:"headerflag",attValue:isHeaderflag.value});
        if(isDesign) idValues.push({eleId,id:"design",attValue:isDesign.value});
        if(isVen) idValues.push({eleId,id:"ven",attValue:isVen.value});
        if(link) idValues.push({eleId,id:"link",attValue:link});
        if(email) idValues.push({eleId,id:"email",attValue:email});
        if(tel) idValues.push({eleId,id:"tel",attValue:tel});
        if(time) idValues.push({eleId,id:"time",attValue:time});
        if(isCircle) idValues.push({eleId,id:isCircle.id as idEnumType,attValue:isCircle.value});
        if(isSquare) idValues.push({eleId,id:isSquare.id as idEnumType,attValue:isSquare.value});
        if(isPolygon) idValues.push({eleId,id:isPolygon.id as idEnumType,attValue:isPolygon.value});
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        const checkType=checkTypeArr.find(blur=>(blur.test));
        if(checkType){
            //REDIRECT
            if(checkType.id==="shapeOutside"){
                const arrDivContShape=await this.htmlElement.shapeOutside.showCleanShapeOutside({
                    parent:col,
                    selRowCol,
                    element,
                    idValues
                });
                if(arrDivContShape){
                    const {divCont,placement:id,target,ele}=arrDivContShape;
                    return {id,divCont,parent:col,displayClean:true,type:"element",chart:null,element:ele,selector:null,target};
                };
            }else if(checkType.id==="ven"){
                const arrDivConVen=this.htmlElement.ven.showCleanVen({
                    parent:col,
                    element:element as any as elementType,
                    idValues
                });
                if(arrDivConVen){
                    const {divCont,placement:id,target}=arrDivConVen;
                    return {id,divCont,parent:col,displayClean:true,type:"element",chart:null,element,selector:null,target};
                }
            }else if(checkType.id==="design"){
                const arrDivConDesign=this.htmlElement.design.showCleanDesign({
                    parent:col,
                    element:element as any as elementType,
                    idValues
                });
                if(arrDivConDesign){
                    const {divCont,placement:id,target}=arrDivConDesign;
                    return {id,divCont,parent:col,displayClean:true,type:"element",chart:null,element,selector:null,target};
                }
            }
        }else{
            const rand=Math.floor(Math.random()*1000);
            const divCont=document.createElement("div");
            divCont.id=`divCont-clean-${rand}`;
            divCont.style.cssText="margin:auto;padding:5px;margin-block:1rem;";
            divCont.className="eleContainer-clean divCont";
            const target:HTMLElement=document.createElement(element.name);
            target.setAttribute("is-element","true");
            target.setAttribute("aria-selected","true");
            target.setAttribute("order",String(element.order));
            target.setAttribute("name",element.name);
            target.className=element.class;
            const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
            target.className=cleaned.join(" ")
            target.setAttribute("name",element.name);
            target.id=element.eleId;
            target.style.cssText=element.cssText;
            target.innerHTML=element.inner_html;
            idValues.push({eleId,id:"eleOrder",attValue:String(element.order)});
            idValues.push({eleId,id:"elementId",attValue:eleId});
            idValues.push({eleId,id:"colId",attValue:col_.eleId});
            idValues.push({eleId,id:"numCols",attValue:String(len)});
            idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
            this._modSelector.dataset.populateElement({target,selRowColEle:element,idValues,level:"element",loc:"flexbox",clean:true});
            target.removeAttribute("contenteditable");
            target.style.lineHeight="";
            if(!checkArr){
                //p,hs
                if(less400){
                    target.style.paddingInline="0.5rem";
                }
               
                target.innerHTML=element.inner_html;
                
                if(isBg || isImgkey){
                    ShapeOutside.cleanUpByID(col,"popup");
                    Misc.blurIn({anchor:target,blur:"20px",time:500});
                };

                divCont.appendChild(target);
                
                return {id:element.order,divCont,parent:col,displayClean:true,type:"element",chart:null,element,selector:null,target};
            }else if( node==="ul" || node==="ol"){
                divCont.style.marginBlock="2rem";
                divCont.style.marginInline="0px";
                divCont.style.alignSelf="flex-start";
                divCont.style.justifySelf="flex-start";
                divCont.appendChild(target);
                return {id:element.order,divCont,parent:col,displayClean:true,type:"element",chart:null,element,selector:null,target};
            }else if( node==="blockquote"){
                divCont.style.marginTop="3rem";
                divCont.style.marginInline="0px";
                divCont.style.alignSelf="flex-start";
                divCont.style.justifySelf="flex-start";
                divCont.style.marginLeft="2rem";
                divCont.appendChild(target);
                return {id:element.order,divCont,parent:col,displayClean:true,type:"element",chart:null,element,selector:null,target};
            }else if(node==="time" && time){
                target.setAttribute("data-time",time)
                divCont.style.marginInline="0px";
                divCont.style.alignSelf="flex-start";
                divCont.style.justifySelf="flex-start";
                divCont.style.paddingBlock="0.5rem";
                divCont.style.marginLeft="0rem";
                divCont.appendChild(target);
                return {id:element.order,divCont,parent:col,displayClean:true,type:"element",chart:null,element,selector:null,target};
            }else if(node==="a"){
                divCont.style.marginTop="3rem";
                divCont.style.marginInline="0px";
                divCont.style.alignSelf="flex-start";
                divCont.style.justifySelf="flex-start";
                divCont.style.marginLeft="2rem";
                const name=target.textContent ||"name";
                    Header.cleanUp(target);
                    if(isLink){
                        this.addLinkEmailTelImg({
                            target:(target as HTMLAnchorElement),
                            image:this.link,
                            href:isLink.value,
                            name,
                            type:"link"
                        });
                    }else if(isEmail){
                        this.addLinkEmailTelImg({
                            target:(target as HTMLAnchorElement),
                            image:this.mail,
                            href:isEmail.value,
                            name,
                            type:"email"
                        });
                    }else if(isTel){
                        this.addLinkEmailTelImg({
                            target:(target as HTMLAnchorElement),
                            image:this.phone,
                            href:isTel.value,
                            name,
                            type:"tel"
                        });
                    };
                    divCont.appendChild(target);
                    
                    return {id:element.order,divCont,parent:col,displayClean:true,type:"element",chart:null,element,selector:null,target};
                    
            }else if(node==="img"){
                
                target.setAttribute("contenteditable","false");
                (target as HTMLImageElement).src=element.img as string;
                target.style.cssText=element.cssText;
                target.style.maxWidth=maxWidthImg;
                (target as HTMLImageElement).alt=element.inner_html;
                if(element.imgKey){
                    const check=this._service.checkFreeImgKey({imgKey:element.imgKey as string});
                    if(check){
                        const url=this._service.getFreeBgImageUrl({imgKey:element.imgKey as string});
                        (target as HTMLImageElement).src=url as string;
                        (target as HTMLImageElement).alt=url as string;
                    }else{
                        const res= await this._service.getSimpleImg(element.imgKey);
                        if(res){
                            (target as HTMLImageElement).src=res.img as string;
                            (target as HTMLImageElement).alt=res.Key as string;
                            Misc.blurIn({anchor:target,blur:"20px",time:500});
                            
                        }
                    }
                }
                divCont.appendChild(target);
                return {id:element.order,divCont,parent:col,displayClean:true,type:"element",chart:null,element,selector:null,target};
                
            }
            
        };
    };

   
  
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

    
   
    
   async getUserInfo(item:{htmlUserInfo:HTMLElement,user:userType|null}): Promise<{user:userType | null,htmlUserInfo:HTMLElement}>{
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
        if(!(user?.id!=="" && user?.showinfo)) return {user:null,htmlUserInfo};
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
                bioCont.style.boxShadow=user?.bio ? "1px 1px 12px 1px #04788f" : "";
                bioCont.style.padding= user?.bio ? "0.25rem" : "";
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
                return {user,htmlUserInfo}
        
            
      
    };


    //PARENT MAIN: INJECTOR ON show button
    cleanAttributes(parent:HTMLElement,showOn:boolean){
       
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

                    if(contentEdits.length && contentEdits.length>0){
                        contentEdits.forEach((element)=>{
                            if(element && showOn){
                                element.setAttribute("contenteditable","false");
                            }
                        });
                    }else if( contentEditsFalse.length){
                            contentEditsFalse.forEach((element)=>{
                                if(element && element.nodeName!=="I"){
                                    element.setAttribute("contenteditable","true");
                                    
                                }
                            });
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
    };


    addLinkEmailTelImg({target,image,href,name,type}:{target:HTMLAnchorElement,image:string,href:string,name:string,type:"link"|"email"|"tel"}){
        target.textContent="";
        const text=new Text(name);
        const span=document.createElement("span");
        span.style.cssText="display:inline-flex;align-items:center;gap:4px;";
        const img=document.createElement("img");
        img.src=image;
        img.alt="www.ablogroom.com";
        this._modSelector.dataset.insertcssClassIntoComponents({target:img,level:"element",loc:"flexbox",type:"customHeader",id:"linkImgs",headerType:"custom"});
        span.appendChild(img);
        span.appendChild(text);
        target.appendChild(span);
        if(type==="link") window.open(href,"_blank");
        if(type==="email") target.href=href;
        if(type==="tel") target.href=href;
    };

    //NOT USED
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
    };

    //NOT USED
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

    };


    //NOT USED
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
    };
    

    static removeCleanCss(item:{css:string|undefined,rmList:string[],addList:string[]}){
        const {css,rmList,addList}=item;
        if(!css) return "";

        //REMOVE FROM CSS
        let arr:string[]=css.split(";");
        if(arr && arr.length>0){
            rmList.map(chList=>{
                arr=arr.filter(cl=>(!cl.includes(chList)));
            });
            //ADD TO CSS
            if(addList && addList.length>0 && arr && arr.length>0){
                addList.map(chList=>{
                        arr.push(chList);
                });
                
            }
            return arr.join(";").trim();
        }
    };


     static cleanUp(parent:HTMLElement){
        if(parent.children){
        const check=([...parent.children as any] as HTMLElement[]).length>0 ;
        if(check){
            while(parent.firstChild){
                if(parent.lastChild){
                parent.removeChild(parent.lastChild);
                }
            }
        }
        }
     };



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

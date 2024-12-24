import { flexType, element_selType, colType, rowType, selectorType, headerType, columnAttrType, classAttType, blogType, deletedImgType, } from './Types';
import ModSelector from "./modSelector";
import {FaCrosshairs} from "react-icons/fa";
import {FaCreate} from "@/components/common/ReactIcons";
import { MouseOver } from "../common/MouseOver";
import Main from "@/components/editor/main";
import Edit from "./edit";
import Misc, {  insertSpanType } from "../common/misc";
import User from "../user/userMain";
import CustomHeader from './customHeader';
import { buttonRetDisable, buttonReturn } from '../common/tsFunctions';
import Service from '../common/services';
import Nav from '../nav/headerNav';

export interface headerSelector extends selectorType{
image:string,
}

class Header{
    urlImg:string;
    flex:flexType;
    bgColor:string;
    btnColor:string;
    divCont_css:string;
    divCont_class:string;
    _count=0;
    _placement=0;
    _HeaderData:{[key:string]:string}={} as {[key:string]:string};
    _HeaderDataMain:headerType={} as headerType;
    _selector={
        id:0,
        blog_id:0,
        header:true,
        placement:0,
        name:"",
        class:"",
        cssText:"",
        eleId:"",
        colNum:2,
        rowNum:1,
        inner_html:"",
        colAttr:[{
            id:0,
            T:2,
            B:0,
            selector_id:0
        }],
        rows:"",
        footer:false,
        headerType:"normal",
    } as selectorType;
    

    ////--------SELECTOR FOR IMAGES
   static selectors_:headerSelector[]=[
        {
            id:1,
            eleId:"",
            placement:0,
            name:"flex-row1-col2",
            image:"./images/flex.png",
            class:"",
            cssText:"",
            inner_html:"",
            rowNum:1,
            colNum:2,
            colAttr:[{id:0,selector_id:1,T:2,B:0}],
            rows:"",
            blog_id:0,
            header:true,
            footer:false,
            headerType:"normal"
        },
        {
            id:2,
            eleId:"",
            placement:0,
            name:"flex-row2-colT1-colB2",
            image:"./images/flex1.png",
            class:"",
            cssText:"",
            inner_html:"",
            rowNum:2,
            colNum:3,
            colAttr:[{id:1,selector_id:1,T:1,B:2}],
            rows:"",
            blog_id:0,
            header:true,
            footer:false,
            headerType:"normal"
        },
        {
            id:3,
            eleId:"",
            placement:0,
            name:"flex-row2-colT2-colB1",
            image:"./images/flex2.png",
            class:"",
            cssText:"",
            inner_html:"",
            rowNum:2,
            colNum:3,
            colAttr:[{id:2,selector_id:3,T:2,B:1}],
            rows:"",
            blog_id:0,
            header:true,
            footer:false,
            headerType:"normal"
        },
        {
            id:4,
            eleId:"",
            placement:0,
            name:"flex-row2-colT2-colB2",
            image:"./images/flex3.png",
            class:"",
            cssText:"",
            inner_html:"",
            rowNum:2,
            colNum:4,
            colAttr:[{id:3,selector_id:4,T:2,B:2}],
            rows:"",
            blog_id:0,
            header:true,
            footer:false,
            headerType:"normal"
        },
        {
            id:5,
            eleId:"",
            placement:0,
            name:"flex-row2-colT4-colB4",
            image:"./images/flex4.png",
            class:"",
            cssText:"",
            inner_html:"",
            rowNum:2,
            colNum:8,
            colAttr:[{id:4,selector_id:5,T:4,B:4}],
            rows:"",
            blog_id:0,
            header:true,
            footer:false,
            headerType:"normal"
        },
        {
            id:6,
            eleId:"",
            placement:0,
            name:"flex-row2-colT3-colB1",
            image:"./images/flex5.png",
            class:"",
            cssText:"",
            inner_html:"",
            rowNum:2,
            colNum:4,
            colAttr:[{id:5,selector_id:6,T:3,B:1}],
            rows:"",
            header:true,
            footer:false,
            blog_id:0,
            headerType:"normal"
        },
        {
            id:7,
            eleId:"",
            placement:0,
            name:"flex-row2-colT3-colB1",
            image:"./images/flex5.png",
            class:"",
            cssText:"",
            inner_html:"",
            rowNum:2,
            colNum:4,
            colAttr:[{id:6,selector_id:7,T:3,B:1}],
            rows:"",
            blog_id:0,
            header:true,
            footer:false,
            headerType:"normal"
        },
        ]
    ////--------SELECTOR FOR IMAGES
    _headerTemplate=[
        {name:"img",row:0,col:0},
        {name:"H3",row:0,col:1},
        {name:"H6",row:0,col:1},
        {name:"H5",row:0,col:2},
        {name:"div",row:0,col:2},
    ];
  static  styleDatas:{[key:string]:string}[]=[
        {boxShadow:"1px 1px 12px 1px black",border:"1px solid blue",backgroundColor:"white",color:"black",width:"100%"},
        {boxShadow:"1px 1px 12px 1px black",backgroundColor:"black",color:"white",height:"160px",width:"100%"},
        {backgroundColor:"darkblue",color:"white",height:"150px",width:"100%"},
        {backgroundColor:"darkblue",color:"white",height:"140px",width:"100%"},
        {backgroundColor:"lightblue",color:"white",height:"130px",width:"100%"},
        {backgroundColor:"lightpink",color:"dark",height:"120px",width:"100%"},

    ]

   static headers_:headerType[]=[
        {id:0,placement:0,eleId:"header-{h:160,w:100}",isOn:false,name:"header",image:"./images/header.png",headerData:Header.styleDatas[0]},
        {id:1,placement:0,eleId:"header-{h:150,w:100}",isOn:false,name:"header1",image:"./images/header1.png",headerData:Header.styleDatas[1]},
        {id:2,placement:0,eleId:"header-{h:130,w:100}",isOn:false,name:"header2",image:"./images/header2.png",headerData:Header.styleDatas[2]},
        {id:3,placement:0,eleId:"header-{h:120,w:100}",isOn:false,name:"header3",image:"./images/header.png",headerData:this.styleDatas[3]},
        {id:4,placement:0,eleId:"header-{h:110,w:100}",isOn:false,name:"header4",image:"./images/header1.png",headerData:Header.styleDatas[4]},
        {id:5,placement:0,eleId:"header-{h:100,w:100}",isOn:false,name:"header5",image:"./images/header2.png",headerData:Header.styleDatas[5]},
    ]

    constructor(private _modSelector : ModSelector,private _service:Service,private _user:User){
        this._count=0;
        // this._selector={...this._selector,id:0}
        this.bgColor="#0C090A";
        this.btnColor=this._modSelector.btnColor;
        this.bgColor=this._modSelector._bgColor;
       this.flex={} as flexType;
       this.urlImg="/images/gb_logo.png";
       this.divCont_css="display:flex;flex-direction:column;justify-content:center;width100%;align-items:center;padding:0.25rem;";
        this.divCont_class="eleContainer";
    }
    

    get placement(){
        return this._modSelector.placement;
    }
    set placement(placement:number){
        this._modSelector._placement=placement;
    }
    get getHeader(){
        return this._HeaderDataMain;
    }
    set getHeader(header:headerType){
        this._HeaderDataMain=header;
    }
    
    set selectors(selectors:selectorType[]){
        this._modSelector.selectors=selectors;
    }
    get selectors(){
        return this._modSelector.selectors;
    }
   

    //PARENT EDIT=> INJECTED INTO EDIT FOR REFRESH AND FINAL SHOW
    showHdrSelector(parent:HTMLElement,selector:selectorType){
        parent.style.width="100%";
        let flex:flexType={} as flexType;
        const less900=window.innerWidth < 900 ;
        const less400=window.innerWidth < 400 ;
        // console.log("Header selector",selector)//works
        if(selector && selector.name){
            const innerCont=document.createElement(selector.name);
            innerCont.id=selector.eleId;
            innerCont.className=selector.class;
            innerCont.classList.add("w-100");
            innerCont.setAttribute("name",selector.name);
            innerCont.setAttribute("data-selector-id",`${selector.id}`);
                innerCont.setAttribute("data-container-id",`${innerCont.id}`);
            innerCont.setAttribute("data-selector-id",selector.eleId);
            innerCont.style.cssText=selector.cssText;
            this.flex={...this.flex,selectorId:selector.eleId}
            const rows=JSON.parse(selector.rows) as rowType[];
                rows.sort((a,b)=>{if(a.order < b.order) return -1;return 1}).map((row_)=>{
                    const row=document.createElement("div");
                    row.className=row_.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                    row.style.cssText=row_.cssText;
                    row.style.flexDirection=less400 ? "column":"row";
                    this.flex={...this.flex,rowId:row_.eleId,order:row_.order,position:"row",imgKey:row_.imgKey};
                    if(row_.imgKey){
                            this.flex={...this.flex,backgroundImage:true};
                            row.setAttribute("data-backgroundimage","true");
                        
                    }
                    row.setAttribute("name",row_.name);
                    row.setAttribute("flex",JSON.stringify(this.flex));
                    row.setAttribute("is-row","true");
                    row.id=row_.eleId;
                    Header.detectImageEffect(row);
                    if(Edit.isBackgroundImage(row)){
                        row.setAttribute("data-backgroundimage","true");
                    };
                    row_.cols.sort((a,b)=>{if(a.order < b.order) return -1;return 1}).map(col_=>{
                        const col=document.createElement("div");
                        col.style.cssText=col_.cssText;
                        col.className=col_.class;
                        if(less400){
                            col.classList.remove("col-md-3");
                            col.classList.add("col-md-12");
                            col.style.flex="0 0 100%";
                        }
                        this.flex={...this.flex,colId:col_.eleId,order:col_.order,position:"col",imgKey:col_.imgKey};
                        if(col_.imgKey){
                            this.flex={...this.flex,backgroundImage:true};
                            col.setAttribute("data-backgroundimage","true");
                            // const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                            // this._service.injectBgAwsImage({target:col,imgKey:col_.imgKey,cssStyle});
                        
                        }
                        col.id=col_.eleId;
                        col.setAttribute("flex",JSON.stringify(this.flex));
                        col.setAttribute("is-column","true");
                        Header.detectImageEffect(col);
                        this.selectElementAttribute(col);
                        col.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                this.flex={...this.flex,colId:col_.eleId,order:col_.order,position:"col",imgKey:col_.imgKey};
                                col.classList.toggle("coliIsActive");
                                this._modSelector.updateColumn(col,this.flex);
                                this._modSelector.updateRow(row,this.flex);
                            }
                        });
                       col_.elements.sort((a,b)=>{if(a.order < b.order) return -1;return 1}).map((element)=>{
                            const textTypes=["p","h1","h2","h3","h4","h5","h6"].includes(element.name);
                            const notAnchorTypes=["ul","ol","blockquote"].includes(element.name);
                            const divCont=document.createElement("div");
                            const link=element.attr && element.attr.startsWith("http") ? element.attr : null;
                            const email=element.attr && element.attr.startsWith("mail") ? element.attr : null;
                            const tel=element.attr && element.attr.startsWith("tel") ? element.attr : null;
                            divCont.id="eleContainer";
                            divCont.style.cssText="margin-block:auto;padding:0.5rem;";
                            divCont.style.zIndex="200";
                            divCont.setAttribute("data-placement",`${element.order}-A`);
                            this.flex={...this.flex,elementId:element.eleId,name:element.name,imgKey:element.imgKey,order:element.order,position:"element"}
                            switch(true){
                                case textTypes:
                                    const ele:HTMLElement=document.createElement(element.name);
                                    ele.setAttribute("is-element","true");
                                    ele.setAttribute("contenteditable","true");
                                    ele.setAttribute("aria-selected","true");
                                    ele.setAttribute("name",element.name);
                                    ele.className=element.class;
                                    ele.setAttribute("name",element.name);
                                    ele.setAttribute("order",String(element.order));
                                    ele.id=element.eleId as string;;
                                    ele.setAttribute("flex",JSON.stringify(this.flex));
                                    ele.style.cssText=element.cssText;
                                    ele.textContent=element.inner_html;
                                    divCont.appendChild(ele);
                                    col.appendChild(divCont);
                                    divCont.addEventListener("click",(e:MouseEvent) =>{
                                        if(e){
                                            ele.classList.toggle("isActive");
                                            divCont.classList.toggle("isActive");
                                            Main.toggleActiveIcon(ele);
                                            this.updateElement(ele).then(async(res)=>{
                                                if(res){
                                                    const ele=res.element as element_selType;
                                                    divCont.setAttribute("data-placement",`${ele.order}-A`)
                                                }
                                            });
                                            this.showRemoveItem(parent,divCont,ele);
                                        }
                                    });
                                    this._modSelector.editElement(ele);
                                return;
                                case notAnchorTypes:
                                    const ele1=document.createElement(element.name);
                                    ele1.setAttribute("is-element","true");
                                    ele1.setAttribute("contenteditable","true");
                                    ele1.setAttribute("aria-selected","true");
                                    ele1.setAttribute("data-placement",`${element.order}`);
                                    ele1.setAttribute("name",element.name);
                                    ele1.className=element.class;
                                    ele1.style.cssText=element.cssText;
                                    ele1.innerHTML=element.inner_html;
                                    divCont.appendChild(ele1);
                                    col.appendChild(divCont);
                                    ele1.id=element.eleId as string;
                                    ele1.setAttribute("name",element.name);
                                    ele1.setAttribute("flex",JSON.stringify(this.flex));
                                    ele1.addEventListener("click",(e:MouseEvent)=>{
                                        if(e){
                                            ele.classList.toggle("isActive");
                                            Main.toggleActiveIcon(ele1);
                                            this.updateElement(ele1).then(async(res)=>{
                                                if(res){
                                                    const ele=res.element as element_selType;
                                                    divCont.setAttribute("data-placement",`${ele.order}-A`);
                                                }
                                            });
                                            this.showRemoveItem(parent,divCont,ele1);
                                        }
                                    });
                                    this._modSelector.editElement(ele1);
                                return;
                                case element.name==="a":

                                    const anchor=document.createElement("a");
                                    anchor.setAttribute("is-element","true");
                                    // anchor.setAttribute("contenteditable","false");
                                    anchor.setAttribute("aria-selected","true");
                                    anchor.setAttribute("data-placement",`${element.order}`);
                                    anchor.setAttribute("name",element.name);
                                    anchor.className=element.class;
                                    anchor.style.cssText=element.cssText;
                                    anchor.innerHTML=element.inner_html;
                                    anchor.setAttribute("name",element.name);
                                    divCont.setAttribute("data-placement",`${element.order}`)
                                    if(element.attr){
                                        
                                        // console.log("anchorContainer",anchorContainer)
                                        if(link){
                                            flex={...this.flex,anchorContainer:link};
                                            anchor.id=element.eleId as string;
                                            anchor.setAttribute("flex",JSON.stringify(flex));
                                            divCont.className="flex-space-between";
                                            // anchor.href=link ? link : "#";
                                            anchor.textContent=element.inner_html;
                                            anchor.setAttribute("data-href",link);
                                            anchor.onclick=()=>{return window.open(link,"_blank")};
                                            divCont.id +="anchor";
                                            divCont.appendChild(anchor);
                                            col.appendChild(divCont);

                                        }else if(email){
                                            // console.log("element.attr",element.attr && JSON.parse(element.attr))
                                            flex={...this.flex,anchorContainer:email};
                                            anchor.href=email ? email :"#";
                                            anchor.textContent=element.inner_html;
                                            anchor.setAttribute("data-href-email",anchor.href);
                                            anchor.setAttribute("flex",JSON.stringify(flex));
                                            divCont.appendChild(anchor);
                                            col.appendChild(divCont);
                                        }else if(tel){
                                            // console.log("element.attr",element.attr && JSON.parse(element.attr))
                                            flex={...this.flex,anchorContainer:tel};
                                            anchor.href=tel ? tel :"#";
                                            anchor.textContent=element.inner_html;
                                            anchor.setAttribute("data-href-tel",anchor.href);
                                            anchor.setAttribute("flex",JSON.stringify(flex));
                                            divCont.appendChild(anchor);
                                            col.appendChild(divCont);
                                        }
                                        
                                    }else{
                                        anchor.href=element.attr ? element.attr : "#";
                                        divCont.appendChild(anchor);
                                        col.appendChild(divCont);
                                    }
                                    divCont.addEventListener("click",(e:MouseEvent)=>{
                                        if(e){
                                            anchor.classList.toggle("isActive");
                                            divCont.classList.toggle("isActive");
                                            this.updateElement(anchor).then(async(res)=>{
                                                if(res){
                                                    const ele=res.element as element_selType;
                                                    divCont.setAttribute("data-placement",`${ele.order}-A`)
                                                    this.showRemoveItem(parent,divCont,anchor);
                                                }
                                            });
                                           
                                            Main.toggleActiveIcon(anchor);
                                        }
                                    });
                                    this._modSelector.editElement(anchor);
                                return;
                                case element.name==="img":
                                    const img=document.createElement("img");
                                    const image=element.img ? element.img : this.urlImg;
                                    if(element.imgKey){
                                        this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                                            if(res){
                                                img.src=res.img;
                                                img.alt=res.Key
                                            }
                                        });
                                    }else{
                                        img.src=image;
                                        img.alt="www.ablogroom.com"

                                    }
                                    img.setAttribute("is-element","true");
                                    img.setAttribute("contenteditable","false");
                                    img.setAttribute("aria-selected","true");
                                    img.setAttribute("name",element.name);
                                    img.className=element.class;
                                    img.id=element.eleId as string;
                                    img.setAttribute("name",element.name);
                                    img.setAttribute("data-placement",`${element.order}`);
                                    img.setAttribute("flex",JSON.stringify(this.flex));
                                    img.style.cssText=element.cssText;
                                    img.alt=element.inner_html ? element.inner_html : "www.ablogroom.com";
                                    const div=document.createElement("div");
                                    div.style.cssText="margin:1rem;max-width:150px;max-height:150px;position:relative;position:relative;";
                                    div.appendChild(img);
                                    col.appendChild(div);
                                    Header.detectImageEffect(img);
                                    div.addEventListener("click",(e:MouseEvent)=>{
                                        if(e){
                                            img.classList.toggle("isActive");
                                            div.classList.toggle("isActive");
                                            this._user.refreshImageShow(div,img,null,this.flex);
                                            Main.toggleActiveIcon(img);
                                            this.updateElement(img).then(async(res)=>{
                                                if(res){
                                                    const ele=res.element as element_selType;
                                                    div.setAttribute("data-placement",`${ele.order}-A`);
                                                    img.setAttribute("data-placement",`Add`);
                                                }
                                            });
                                            this.showRemoveItem(parent,div,img);
                                            
                                        }
                                    });
                                return;
                                default:
                                    return;
                            }
                            

                        });
                        if(Edit.isBackgroundImage(col)){
                            col.setAttribute("is-backgroundimage","true");
                        };
                        row.appendChild(col);
                    });
                    innerCont.appendChild(row);
                    // console.log(innerCont)//works
                });
                this._modSelector.removeHeader(parent,innerCont);
            parent.appendChild(innerCont);
        }
    };

   async headerSidebar(parent:HTMLElement|null,header:headerType){
        //THIS IS ACTIVATE BY THE SIDEBAR ON CLICK AND IS THE MAIN INJECTION FOR NEW HEADER
        this.flex={} as flexType;
        const blog=this._modSelector._blog;
        const maxcount=ModSelector.maxCount(blog);
        if(parent && header &&  header.isOn){
            parent.style.width="100%";
            Header.cleanUpByID(parent,"mainHeader");
            const mainHeader=document.createElement("header");
            mainHeader.id="mainHeader";
            mainHeader.setAttribute("name","header");
            mainHeader.setAttribute("is-header","true");
            mainHeader.className="mainHeader flexCol text-center position-relative mb-5";
            //headerStyleCreator=> creates styles
            this.headerStyleCreator({parent:mainHeader,cssStyle:header.headerData});
             this.flex={...this.flex,selectorId:mainHeader.id,rowId:"",colId:"",placement:0,col:2,row:1};
             //marking images to be deleted if imgkey
            //marking images to be deleted if imgkey
           await this.promSelectorAdder(mainHeader,this._selector).then(async(selector)=>{
                if(selector){
                    this.flex={...this.flex,selectorId:selector.eleId};
                    this.headerInnerLayout(mainHeader,header,this.flex).then(async(res)=>{
                        if(res){

                            if(res.colLeft && res.colRight && res.colCenter){
                                //FUNCTION THAT ALLOWS ELEMENT AND ATTRIBUTE SELECTION
                                this.selectElementAttribute(res.colLeft);
                                res.colLeft.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        const {parsed,isJSON}=Header.checkJson(res.colLeft.getAttribute("flex"));
                                        if(!isJSON) return;
                                        const flex=parsed as flexType;
                                        this._modSelector.updateColumn(res.colLeft,flex);
                                        res.colLeft.classList.toggle("coliIsActive");
                                    }
                                });
                                this.selectElementAttribute(res.colCenter);
                                res.colCenter.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        const {parsed,isJSON}=Header.checkJson(res.colCenter.getAttribute("flex"));
                                        if(!isJSON) return;
                                        const flex=parsed as flexType;
                                        this._modSelector.updateColumn(res.colCenter,flex);
                                        res.colCenter.classList.toggle("coliIsActive");
                                       
                                    }
                                });
                                this.selectElementAttribute(res.colRight);
                                res.colRight.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        const {parsed,isJSON}=Header.checkJson(res.colRight.getAttribute("flex"));
                                        if(!isJSON) return;
                                        const flex=parsed as flexType;
                                        // this.selectElementAttribute(res.colRight);
                                        this._modSelector.updateColumn(res.colRight,flex);
                                        res.colRight.classList.toggle("coliIsActive");
                                    }
                                });
                            }
                        }
                    });
                    parent.appendChild(mainHeader);
                   Misc.fadeIn({anchor:mainHeader,xpos:100,ypos:0,time:500});
                    this.deleteEffect(parent,mainHeader);
                }
            });
        }
     }
     //PARENT HEADERSIDEBAR()- STYLE CREATOR
     headerStyleCreator(item:{parent:HTMLElement,cssStyle:{[key:string]:string}}):void{ 
        const {parent,cssStyle}=item;
        
        for(const [key,value] of Object.entries(cssStyle)){
            
               parent.style[key]=value;
        }
        
     }
     //PARENT:headerSidebar:mainHeader HEADERSIDEBAR()=> INJECTED ONTO MAIN
    async headerInnerLayout(parent:HTMLElement,header:headerType,flex:flexType):Promise<{colLeft:HTMLElement,colCenter:HTMLElement,colRight:HTMLElement,row:rowType}|undefined>{

        const containerRow=document.createElement("div");
        containerRow.style.cssText="width:100%;min-height:100%;margin:1px;padding-inline:5px;padding-block:1px;position:relative;flex-wrap:wrap;align-items:center;";
        containerRow.className=" row";
        containerRow.id="header-container-row";
        flex={...flex,order:1};
        const flexRow=Main.flexRowTracker(containerRow,flex);
        return this._modSelector.rowAdder(containerRow,flexRow.selectorId as string).then(async(row)=>{
            if(row){

                const colLogo=document.createElement("div");
                const cssStyle={minHeight:"15vh",position:"relative"}
                this.headerStyleCreator({parent:colLogo,cssStyle});
                colLogo.className="col-lg-3 column colLogo column-header flexCol";
                colLogo.style.flex="1 1 25%";
                colLogo.style.minHeight="15vh";
                colLogo.classList.add("colLogo");
                colLogo.style.zIndex="";
                flex={...flexRow};
              Main.flexColTracker(colLogo,flex);
                colLogo.setAttribute("name","div");
                this.promColumnAdder(colLogo).then(async(res)=>{
                    if(res && res.target && res.col){
                        // this._modSelector.updateColumn(res.target,flexColLOgo);
                        this.promAddElement(res.target,"img","img",undefined).then(async(res)=>{
                            if(res && res.ele){
                                res.ele.setAttribute("data-placement",`A`)
                            }
                        });
                       
                    }
                });
                const colCenter=document.createElement("div");
                colCenter.className="col-lg-6 column colCenter column-header";
                const _cssStyle_={position:"relative",margin:"auto",minHeight:"15vh",flex:"1 1 50%"};
                colCenter.style.zIndex="";
                this.headerStyleCreator({parent:colCenter,cssStyle:_cssStyle_});
                colCenter.classList.add("colCenter");
                flex={...flexRow,order:2};
               Main.flexColTracker(colCenter,flex);
                colCenter.setAttribute("name","div");
                this.promColumnAdder(colCenter).then(async(res)=>{
                    if(res && res.target && res.col){
                        this.promAddElement(res.target,"h4","h4","insert H4");
                            this.promAddElement(res.target,"h6","h6","inser h6");
                    }
                });
                const colRight=document.createElement("div");
                flex={...flexRow,order:3};
               Main.flexColTracker(colRight,flex);
                colRight.setAttribute("name","div");
                colRight.className="colRight column-header flexCol"
                colRight.style.cssText=`position:relative;;margin:auto;min-height:15vh;`;
                const cssStyle_={position:"relative",margin:"auto",minHeight:"15vh"};
                this.headerStyleCreator({parent:colRight,cssStyle:cssStyle_});
                colRight.style.cssText="margin-inline:0px;";
                colRight.style.minHeight="15vh";
                colRight.style.flex="1 1 25%";
                colRight.style.zIndex="";
                this.promColumnAdder(colRight).then(async(res)=>{
                    if(res && res.target && res.col){
                        this.addElement(res.target,"h6","h6","inser h6 info");
                        
                    }
                });
                containerRow.appendChild(colLogo);
                containerRow.appendChild(colCenter);
                containerRow.appendChild(colRight);
                parent.appendChild(containerRow);
                Misc.matchMedia({parent:colLogo,maxWidth:720,cssStyle:{flex:"none",width:"100%",zIndex:"0",position:"relative"}});
                Misc.matchMedia({parent:colCenter,maxWidth:720,cssStyle:{flex:"none",width:"100%",zIndex:"0",position:"relative"}});
                Misc.matchMedia({parent:colRight,maxWidth:720,cssStyle:{flex:"none",width:"100%",zIndex:"0",position:"relative"}});
                Misc.matchMedia({parent:containerRow,maxWidth:720,cssStyle:{flexDirection:"column",width:"100%",zIndex:"0",position:"relative",minHeight:containerRow.style.height}});
        
                return{colLeft:colLogo,colCenter:colCenter,colRight:colRight,row}
            }
        });
        
     }
    
    

    //PARENT HEADERSIDEBAR
    selectElementAttribute(parent:HTMLElement){
        //THIS ALLOWS USER TO ADD ELEMENT AND ATTRIBUTE TO COLUMN
        // if(check){
        //     Header.cleanUpByID(parent,"popup-select-element");
            parent.classList.add("coliIsActive");
            const {parsed,isJSON}=Header.checkJson(parent.getAttribute("flex"));
            parent.style.position="relative";
            const popup=document.createElement("div");
            popup.id="popup-select-element";
            popup.setAttribute("is-popup","true");
            popup.classList.add("popup");
            popup.style.cssText="margin:auto;position:absolute;height:auto;width:fit-content;z-index:2000;";
            popup.style.top="80%";
            popup.style.transform="translate(5px,5px)";
            popup.style.position="absolute";
            const text=document.createElement("p");
            text.className="text-center text-primary";
            text.style.cssText="font-size:14px; font-weight:bold";
            text.textContent="options";
            const select=document.createElement("select");
            select.style.cssText="width:fit-content;";
        CustomHeader.nameValueAttrs.map((item)=>{
            const option=document.createElement("option");
            option.textContent=item.name;
            if(item.value){
                option.style.background="black";
                option.style.color="white";
            }else{
                option.style.background="blue";
                option.style.color="white";
            }
            option.value=JSON.stringify(item);
            select.appendChild(option);
            
        });
        select.selectedIndex=0;
        popup.appendChild(text);
        popup.appendChild(select);
        parent.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{top:"60%",left:"0%",right:"",inset:"",fontSize:"10px",transform:""}});
        Misc.matchMedia({parent:popup,maxWidth:700,cssStyle:{top:"50%",left:"0%",right:"",inset:"",fontSize:"10px",transform:""}});
        select.addEventListener("change",(e:Event)=>{
            if(e){
                const item=JSON.parse((e.currentTarget as HTMLSelectElement).value as string) as columnAttrType;
                //id: number,name: string,attr?: string,value?: string,remove?: boolean,level?: "col" | "row" | "element";
                const {name,value,attr,level}=item;
                if(isJSON){
                    this.flex=parsed as flexType;
                    this.flex={...this.flex,position:"col"};
                    parent.setAttribute("flex",JSON.stringify(this.flex));
                    if(value){
                        //element to add
                        if(name==="bg-image"){
                            this.bgImage({column:parent,blog:this._modSelector.blog});
                        }else{
    
                            const text=`insert-${value}`
                            this.promAddElement(parent,name,value,text).then(async(res)=>{
                                if(res && res.ele){
                                    parent.classList.remove("coliIsActive");
                                   this._modSelector.updateElement(res.ele);
                                }
                            });
                        }
                    } else if(attr){
                            
                            if(name ==="bg-color"){
                                this.columnColor(parent,attr,this.flex);
                            }else if(name==="bg-row-color"){
                                
                                this.rowColor(parent,attr,this.flex);
                            }else if(name==="round"){
                                this.imgRound(parent,attr);
                                
                            }else if(name==="adjust-img-size"){
                                this.adjustImgSize(parent);
                            }else{
                                if(level==="element"){
                                   if(attr==="pretty-font"){
                                    const eleActives=parent.querySelectorAll("[is-element].isActive");
                                    ([...eleActives as any] as HTMLElement[]).forEach(element=>{
                                        // console.log(element)//works
                                            element.classList.toggle(attr as string);
                                            this.updateElement(element);
                                        // }
                                    });
                                   }else{
                                       //EFFECTS ONLY ACTIVE ELEMENTS=>isActive
                                   this.toggleAttributeElement(parent,attr);

                                   }
                                }else if(level==="col"){
                                    if(name==="rm-bg-image"){
                                        this.rmBgImage({column:parent});
                                    }else{
            
                                        const {parsed}=Header.checkJson(parent.getAttribute("flex"));
                                        const flex_=parsed as flexType;
                                        parent.classList.toggle(attr);
                                        this._modSelector.updateColumn(parent,flex_);
                                        this.changePartition(parent,attr);//modifying partition
                                    }
                                }else if(level==="row"){
                                    if(name==="bg-row-image"){
                                        this.bgRowImage({column:parent,blog:this._modSelector.blog});
                                    }else if(name==="bg-row-height"){
                                        this.bgRowHeight(parent)
                                    }else{
        
                                        const grandParent=parent.parentElement as HTMLElement;
                                        if(!grandParent) return;
                                        const {parsed}=Header.checkJson(grandParent.getAttribute("flex"));
                                        let flex_= parsed as flexType;
                                        flex_={...flex_,position:"row"};
                                        grandParent.setAttribute("flex",JSON.stringify(flex_))
                                        this._modSelector.updateRow(grandParent,flex_);
                                        grandParent.classList.toggle(attr);
                                        
                                    }
        
                                }
                            }
                        }
                    
                }
            }
        });
        // }

        //nameValueAttrs:columnAttrType[]
    }
    //PARENT: selectElementAttribute
    toggleAttributeElement(col:HTMLElement,attr:string){
        const {isJSON}=Header.checkJson(col.getAttribute("flex"));
        if(!isJSON) return;
        const children=([...col.children as any] as HTMLElement[]);
        children.map(child=>{
            const isActive=([...child.classList as any] as string[]).includes("isActive");
            const {isJSON}=Header.checkJson(child.getAttribute("flex"));
            if(isActive){
                if(child && isJSON){
                    child.classList.toggle(attr);
                    Header.cleanAttribute(child,attr);
                    this.updateElement(child).then(async(res)=>{
                        if(res){
                            col.classList.remove("coliSiActive");
                        }
                    });
                }else if( child){
                    //SECOND-LEVEL
                    ([...child.children as any] as HTMLElement[]).map(ch=>{
                        const {isJSON}=Header.checkJson(ch.getAttribute("flex"))
                        if(ch && isJSON){
                            ch.classList.toggle(attr);
                            Header.cleanAttribute(ch,attr);
                            this.updateElement(ch).then(async(res)=>{
                                if(res){
                                    const ele=res.element as element_selType;
                                   col.classList.remove("coliIsActive");
                                }
                            });;
                        }
                    });
                }
            }
        });
    }
   
   
        //PARENT:promAddElement PROMISE!!
     addElement(col:HTMLElement,name:string,value:string,text:string|undefined):{appended:string,ele:HTMLElement|null}|undefined{
        const textTypes=["p","h1","h2","h3","h4","h5","h6"].includes(value);
        const anchorTypes=["ul","ol","blockquote"].includes(value);
        const imgTypes=["image","logo"].includes(value);
        const divCont=document.createElement("div");
        divCont.id="eleContainer";
        divCont.style.cssText="margin-block:auto;padding:0.25rem;position:relative;z-index:200;"
        const {parsed,isJSON}=Header.checkJson(col.getAttribute("flex"))
        if(!isJSON) return;
        const flex= parsed as flexType;
        if(name && col){
            switch(true){
                case textTypes:
                    const ele=document.createElement(name);
                    ele.textContent=text ? text :"insert";
                    ele.style.cssText="margin-bottom:1rem;margin-inline:auto;width:70%;border-radius:12px;"
                    ele.setAttribute("data-header-title",`${name}`);
                    ele.style.cssText="padding-inline:1.25rem;border-radius:8px;";
                    Main.flexTracker(ele,flex);//adds ID,plus
                    this.promElementAdder(ele).then(async(res)=>{
                        if(res){

                            divCont.setAttribute("data-placement",`${res.order}`)
                        }
                    });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
                    divCont.appendChild(ele);
                    col.appendChild(divCont);
                    Misc.fadeIn({anchor:ele,xpos:30,ypos:100,time:400});
                    ele.addEventListener("click",(e:MouseEvent) => {
                        if(e){
                            ele.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            this.updateElement(ele).then(async(res)=>{
                                if(res){
                                    const ele=res.element as element_selType;
                                    divCont.setAttribute("data-placement",`${ele.order}-A`)
                                }
                            });
                        }
                    });
                    this._modSelector.editElement(ele);
                    this.btnAttributeUpdate(ele);
                return {appended:"okay",ele:ele};
                case anchorTypes:
                    const ele1=document.createElement(name);
                    ele1.innerHTML=text ? text :"";
                    ele1.style.cssText="margin-bottom:1rem;margin-inline:auto;width:70%;"
                    ele1.setAttribute("data-header-title",`${name}`);
                    ele1.setAttribute("data-href",`#`);
                    ele1.setAttribute("data-anchor-container","");
                    Main.flexTracker(ele1,flex);//adds ID,plus
                    this.promElementAdder(ele1).then(async(res)=>{
                        if(res){
                            divCont.setAttribute("data-placement",`${res.order}`)
                        }

                    });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
                    divCont.appendChild(ele1);
                    col.appendChild(divCont);
                    this._modSelector.updateElement(ele1);
                    divCont.addEventListener("click",(e:MouseEvent) => {
                        if(e){
                            divCont.classList.toggle("isActive");
                            ele.classList.toggle("isActive");
                            this._modSelector.updateElement(ele1);
                        }
                    });
                    this._modSelector.editElement(ele1);
                    this.btnAttributeUpdate(ele1);
                return {appended:"okay",ele:ele1};
                case imgTypes:
                    divCont.setAttribute("name","div");
                    divCont.className="m-auto d-flex flex-column justify-content-center align-items-center position-relative"
                    divCont.style.cssText="margin:auto;padding:0.5rem;z-index:0;max-width:125px;max-height:125px;position:relative;";
                    divCont.style.zIndex="200";
                    divCont.id+="imDiv-left";
                    divCont.classList.add("img-cont");//THIS IS FOR ATTRIBUTES
                    const tempImg=document.createElement("img");
                    tempImg.src=this.urlImg;
                    tempImg.style.cssText="width:100%;";
                    tempImg.style.maxWidth="125px";
                    tempImg.style.maxHeight="125px";
                    tempImg.style.borderRadius="7px";
                    tempImg.style.boxShadow="1px 1px 6px 1px #007FFF,-1px -1px 6px -1px #007FFF";
                    tempImg.style.borderRadius="11px";
                    tempImg.alt="www.ablogroom.com";
                    tempImg.setAttribute("name","img");
                    tempImg.setAttribute("is-element","true");
                    Misc.fadeIn({anchor:tempImg,xpos:30,ypos:100,time:400});
                    const retFlexImg=Main.flexTracker(tempImg,flex);//adds ID,plus
                    divCont.appendChild(tempImg);
                    col.appendChild(divCont);
                    this.promElementAdder(tempImg).then(async(ele:element_selType)=>{
                        if(ele){
                            //adds choice on image change
                            const mainTextArea=Main.textarea as HTMLElement;
                            this._user.refreshImageUpload({targetContainer:divCont,mainTextArea,image:tempImg,flex:retFlexImg});
                            divCont.addEventListener("click",(e:MouseEvent)=>{
                                if(e){
                                    divCont.classList.toggle("isActive");
                                    divCont.setAttribute("data-placement",`${ele.order}-A`)
                                    tempImg.classList.toggle("isActive");
                                }
                            });
                        }
                    });
                    this.showRemoveItem(col,divCont,tempImg);
                
                    return {appended:"okay",ele:tempImg};
                case name==="span" && value==="span":
                    const spanInsert1:insertSpanType={
                        parent:divCont,
                        text:text ? text : "insert",
                        css:`margin-inline:5px;padding-inline:0.65rem;padding-block:0.25rem;min-width:30px;text-decoration:underline;border:none;color:inherit;`,
                        class_:""
                    }
                    const span=Misc.insertSpan(spanInsert1);
                    Main.flexTracker(span,flex);//adds ID,plus
                    col.appendChild(divCont);
                    Misc.fadeIn({anchor:span,xpos:30,ypos:100,time:400});
                    this.promElementAdder(span).then(async(res)=>{
                        if(res){
                            divCont.setAttribute("data-placement",`${res.order}-A`)
                        }
                    });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
                   
                    const shade=Misc.blueShades.filter(shade_=>(shade_.name==="capri"))[0].value
                    // col.appendChild(spans);
                    span.onmouseover=()=>{
                        span.animate([
                            {boxShadow:`1px 1px 4px 1px ${shade}`},
                            {boxShadow:`1px 1px 7px 2px red`},
                            {boxShadow:`1px 1px 4px 1px ${shade}`},
                        ],{duration:1000,iterations:1});
                    };
                    
                    span.addEventListener("click",(e:Event)=>{
                        if(e){
                            span.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            
                        }
                    });
                return {appended:"okay",ele:span};
                case name==="line" && value==="line":
                    divCont.style.cssText="padding:0.5rem;display:grid;place-items:center;position:relative";
                    const hr=document.createElement("hr");
                    hr.style.cssText="margin:auto;width:75%;background-color:black;";
                    Main.flexTracker(hr,flex);
                    this.promElementAdder(hr).then(async(res)=>{
                        if(res){
                            divCont.setAttribute("data-placement",`${res.order}-A`)
                        }
                    });
                    divCont.appendChild(hr);
                    col.appendChild(divCont);
                    Misc.fadeIn({anchor:divCont,xpos:30,ypos:100,time:400});
                    divCont.addEventListener("click",(e:MouseEvent) => {
                        if(e){
                            hr.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            this._modSelector.updateElement(ele);
                        }
                    });
                return;
                case name==="vertical-line" && value==="vertical-line":
                   
                    divCont.style.cssText="padding:0.5rem;display:grid;place-items:center;position:relative;";
                    const div=document.createElement("div");
                    div.style.cssText="margin:auto;width:3px;height:min-height:10vh;background-color:black;margin-inline:5px;padding-inline:2px;";
                    Main.flexTracker(div,flex);
                    this.promElementAdder(div).then(async(res)=>{
                        if(res){
                            divCont.setAttribute("data-placement",`${res.order}-A`)
                        }
                    });;
                    divCont.appendChild(div);
                    col.appendChild(divCont);
                    Misc.fadeIn({anchor:divCont,xpos:30,ypos:100,time:400});
                    divCont.addEventListener("click",(e:MouseEvent) => {
                        if(e){
                            div.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            this._modSelector.updateElement(ele);
                        }
                    });
                return;
                case name==="email":
                    this.getEmail(col)
                return;
                case name==="insert-tel":
                    this.insertTel(col)
                return;
                case name==="bg-image":
                        this.bgImage({column:col,blog:this._modSelector.blog});
                return;
                case name==="rm-bg-image":
                        this.rmBgImage({column:col});
                return;
                case name==="a":
                    const anchor_=document.createElement("a");
                    anchor_.innerHTML=text ? text :"";
                    anchor_.style.cssText="margin-bottom:1rem;margin-inline:auto;width:70%;"
                    anchor_.setAttribute("name","a");
                    anchor_.setAttribute("data-href",`#`);
                    anchor_.setAttribute("data-anchor-container","");
                    this.addLink(col,anchor_);//appends link
                    this._modSelector.updateElement(anchor_);
                    Misc.fadeIn({anchor:anchor_,xpos:30,ypos:100,time:400});
                    anchor_.addEventListener("click",(e:MouseEvent) => {
                        if(e){
                            ele.classList.toggle("isActive");
                            this._modSelector.updateElement(ele);
                        }
                    });
                    this._modSelector.editElement(anchor_);
                    this.btnAttributeUpdate(anchor_);
                return {appended:"okay",ele:anchor_};
                
                default:
                    return {appended:"failed",ele:null};
        }
            
        }
     }
     promAddElement(col:HTMLElement,value:string,name:string,text:string|undefined){
            return new Promise((resolver,reject)=>{
                resolver(this.addElement(col,name,value,text));
                reject("missed element");
            }) as Promise<{appended:string,ele:HTMLElement|null}|undefined>;
     }
    //ADD LINK
    addLink(parent:HTMLElement,target:HTMLAnchorElement){
        const {form,popup,l_input,n_input}=Misc.addLink(parent);
        const {parsed}=Header.checkJson(target.getAttribute("flex"));
        let flex= parsed as flexType;
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const newFormdata=new FormData(e.currentTarget as HTMLFormElement);
                const link_=l_input.name;
                const name_=n_input.name ;
                const link=newFormdata.get(link_) as string;
                const name=newFormdata.get(name_) as string;
                target.href=link;
                target.textContent=name;
                target.setAttribute("data-href",link);
                flex={...flex,anchorContainer:link}
                Main.flexTracker(target,flex);
                parent.appendChild(target);
                this._modSelector.elementAdder(target);
                //CLOSING FORM
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },380);
            }
        });
    }
     //PARENT email Telephone above
     appendCont(parent:HTMLElement):{container:HTMLElement,isFull:boolean}{
        parent.style.position="relative";
        const check=([...parent.children as any] as HTMLElement[]).map(id=>(id.id)).includes("emailTel");
        let container:HTMLElement|null=null;
        if(check){
            container=parent.querySelector("div#emailTel");
        }else{
            container=document.createElement("div");
            container.style.cssText="width:100%;display:flex;flex-direction:row; align-items:center; justify-content:space-between;";
            container.id="emailTel";
            parent.appendChild(container)
        }
        const checkTwo=([...(container as HTMLElement).children as any] as HTMLElement[]).length;
       
        let isFull=false;
        if(checkTwo >2){ isFull=true; (container as HTMLElement).style.background="inherit";(container as HTMLElement).style.color="inherit";}
        
        return {container:container as HTMLElement,isFull}
     }
     //PARENT insertAnchor
     getEmail(col:HTMLElement){
        const form=document.createElement("form");
        form.style.cssText="position:absolute;width:clamp(200px,350px,400px);height:auto;display:flex;align-items:center;justify-content:center;top:100%;left:0%;right:10%;z-index:200;;flex-direction:column;gap:1rem;background-color:white";
        const {input:LInput,label:Llabel}=Nav.inputComponent(form);
        LInput.type="text";
        LInput.name="email";
        LInput.id="email";
        LInput.placeholder="email";
        Llabel.textContent="email";
        Llabel.setAttribute("for",LInput.id);
        const {input:NInput,label:Nlabel}=Nav.inputComponent(form);
        NInput.id="name";
        NInput.name="name";
        NInput.type="text";
        NInput.placeholder="name";
        Nlabel.setAttribute("for",NInput.id);
        const {button}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"white",text:"ok",time:400,type:"submit"});
        button.disabled=true;
        LInput.onchange=(e:Event)=>{
            if(e){
                (button as HTMLButtonElement).disabled=false;
            }
        };
        NInput.onchange=(e:Event)=>{
            if(e){
                (button as HTMLButtonElement).disabled=false;
            }
        };
        col.appendChild(form);
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const divCont=document.createElement("div");
                divCont.style.cssText=this.divCont_css;
                divCont.className=this.divCont_class;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const email=formdata.get("email") as string;
                const name=formdata.get("name") as string;
                const anchor=document.createElement("a");
                const {parsed}=Header.checkJson(col.getAttribute("flex"));
                anchor.href=`mailto:${email}`;
                anchor.textContent=name;
                anchor.setAttribute("data-href-email",`mailto:${email}`);
                let flex=parsed as flexType;
                flex={...flex,anchorContainer:anchor.href}
                Main.flexTracker(anchor,flex);
                divCont.appendChild(anchor);
                col.appendChild(divCont);
                this._modSelector.promElementAdder(anchor).then(async(res)=>{
                    if(res){
                        const ele=res.ele as element_selType;
                        divCont.onclick=(e:MouseEvent)=>{
                            if(e){
                                divCont.setAttribute("data-placement",`${ele.order}-A`)
                                divCont.classList.toggle("isActive");
                                anchor.classList.toggle("isActive");
                            }
                        };
                    }
                });
                Misc.fadeOut({anchor:form,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    col.removeChild(form);
                },398);
                this.showRemoveItem(col,divCont,anchor);
            }
        };
     }
     insertTel(col:HTMLElement){
        const form=document.createElement("form");
        form.style.cssText="position:absolute;width:clamp(200px,350px,400px);height:auto;display:flex;align-items:center;justify-content:center;top:100%;left:0%;right:10%;z-index:200;;flex-direction:column;gap:1rem;background-color:white";
        const {input:LInput,label:Llabel}=Nav.inputComponent(form);
        LInput.type="text";
        LInput.name="tel";
        LInput.id="tel";
        LInput.placeholder="tel";
        Llabel.textContent="tel";
        Llabel.setAttribute("for",LInput.id);
        const {input:NInput,label:Nlabel}=Nav.inputComponent(form);
        NInput.id="name";
        NInput.name="name";
        NInput.type="text";
        NInput.placeholder="name";
        Nlabel.setAttribute("for",NInput.id);
        const {button}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"white",text:"ok",time:400,type:"submit"});
        button.disabled=true;
        LInput.onchange=(e:Event)=>{
            if(e){
                (button as HTMLButtonElement).disabled=false;
            }
        };
        NInput.onchange=(e:Event)=>{
            if(e){
                (button as HTMLButtonElement).disabled=false;
            }
        };
        col.appendChild(form);
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const divCont=document.createElement("div");
                divCont.style.cssText=this.divCont_css;
                divCont.className=this.divCont_class;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const tel=formdata.get("tel") as string;
                const name=formdata.get("name") as string;
                const anchor=document.createElement("a");
                const {parsed}=Header.checkJson(col.getAttribute("flex"));
                let flex=parsed as flexType;
                anchor.href=`tel:${tel}`;
                anchor.textContent=name;
                flex={...flex,anchorContainer:anchor.href};
                anchor.setAttribute("data-href-tel",anchor.href);
                Main.flexTracker(anchor,flex);
                divCont.appendChild(anchor);
                col.appendChild(divCont);
                this._modSelector.promElementAdder(anchor).then(async(res)=>{
                    if(res){
                        const ele=res.ele as element_selType;
                        divCont.onclick=(e:MouseEvent)=>{
                            if(e){
                                divCont.setAttribute("data-placement",`${ele.order}-A`)
                                divCont.classList.toggle("isActive");
                                anchor.classList.toggle("isActive");
                            }
                        };
                    }
                });
                Misc.fadeOut({anchor:form,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    col.removeChild(form);
                },398);
                this.showRemoveItem(col,divCont,anchor);
            }
        };
     }
     addHeaderAttribute(target:HTMLElement){
        const allAttributeBtns=document.querySelectorAll("[is-attr='true']");
        const check=([...target.classList as any] as string[]).includes("isActive");
            ([...allAttributeBtns as any] as HTMLElement[]).forEach(btn=>{
                (btn as HTMLButtonElement).addEventListener("click",(e:MouseEvent)=>{
                    if(e && check){
                        target.classList.toggle(btn.id);
                       
                    }
                });
                
            });
           
        
     }
     //ADDED TO PARENT addSelector @ element level
     editSelectorEle(target:HTMLElement,flex:flexType){
       if(flex && typeof(flex)==="object"){
        const {selectorId,rowId,colId}=flex as flexType;
        target.addEventListener("input",(e:Event)=>{
            if(e){
              this._modSelector.selectors = this._modSelector._selectors.map(select=>{
                    if(select.eleId===selectorId){
                        const rows=JSON.parse(select.rows) as rowType[];
                        rows.map((row)=>{
                            if(row.eleId===rowId){
                                row.cols.map(col=>{
                                    if(col.eleId===colId){
                                        col.elements.map(ele=>{
                                            if(ele.eleId===target.id){
                                                const currentHTML=e.currentTarget as HTMLElement;
                                                if(currentHTML.nodeName==="DIV"){
                                                    const classes=Header.cleanClass(currentHTML);
                                                    const value=currentHTML.innerHTML;
                                                    ele.inner_html=value;
                                                    ele.class=classes ? classes as string :currentHTML.className
                                                }else{
                                                    const value=currentHTML.textContent as string;
                                                    ele.inner_html=value;
                                                }
                                               
                                            }
                                            return ele;
                                        });
                                    }
                                    return col;
                                });
                            }
                            return row;
                        });
                        select.rows=JSON.stringify(rows);
                    }
                    return select;
                });
                this._modSelector.selectors=this._modSelector._selectors
            }
        });
       }
       
        
     }
    
     //PARENT selectElementAttribute()
     rowColor(col:HTMLElement,attrName:string,flex:flexType){
            Header.cleanUpByID(col,"popup-background-color");
            const row=col.parentElement as HTMLElement;
            row.style.position="relative";
            const popup=document.createElement("div");
            popup.style.cssText="position:absolute;width:100px;height:75px;background-color:white;box-shadow:1px 1px 12px 1px black;border-radius:17px;"
            popup.id="popup-background-color";
            popup.className="popup";
            popup.style.inset="100% 50% -30% 50%";
            const title=document.createElement("h6");
            title.textContent="bg-color";
            title.className="text-primary text-center";
            popup.appendChild(title)
            row.appendChild(popup);
            if(row as HTMLElement){
                const input=document.createElement("input");
                input.type="color";
                input.id="color-row-picker";
                popup.appendChild(input);
                input.addEventListener("change",()=>{
                    const color:string=input.value;
                    (row as HTMLElement).style.background=color;
                    this._modSelector.updateRow(row as HTMLElement,flex); //updating selector and storing it
                    if(input.value){
                    Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                    setTimeout(()=>{row.removeChild(popup)},398);
                    }
                });
            
        }
       
     }
     bgRowHeight(column:HTMLElement){
        if(!column) return;
        const parent=column.parentElement as HTMLElement;
        const getColumns=document.querySelectorAll("div.column-header") as unknown as HTMLElement[];
        parent.style.position="relative";
        const cont=document.createElement('div');
        cont.id="row-height";
        cont.classList.add("popup");
        cont.setAttribute("is-popup","true");
        cont.style.cssText ="position:absolute;top:100%;left:50%,right:50%;width:170px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;margin-block:1rem;box-shadow:1px 1px 12px 1px black;border-radius:12px;z-index:200;padding-block;";
        cont.style.left="40%";
        cont.style.right="40%";
        const {input,label}=Nav.inputComponent(cont);
        input.type="number";
        input.placeholder="100";
        input.min="100";
        input.max="600";
        label.textContent="row-height";
        label.classList.add("text-primary");
        const {button}=Misc.simpleButton({anchor:cont,bg:Nav.btnColor,color:"white",text:"ok",time:300,type:"button"});
        parent.appendChild(cont);
        input.oninput=(e:Event)=>{
            if(e){
                const number=(e.currentTarget as HTMLInputElement).value;
                parent.style.height=`${number}px`;
            }
        };
        button.onclick=(e:MouseEvent)=>{
            if(e){
                const {parsed}=Header.checkJson(parent.getAttribute("flex"));
                const flex=parsed as flexType;
                this._modSelector.updateRow(parent,flex);
                ([...getColumns] as HTMLElement[]).map(col=>{
                    if(col){
                        const {parsed}=Header.checkJson(col.getAttribute("flex"));
                        this._modSelector.updateColumn(col,parsed as flexType);
                    }
                });
                Misc.fadeOut({anchor:cont,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(cont);
                },398);
            }
        };
     }
     columnColor(col:HTMLElement,attrName:string,flex:flexType){
        if(col && attrName==="bg-color"){
            const input=document.createElement("input");
            input.type="color";
            input.id="color-col-picker";
            col.appendChild(input);
            input.addEventListener("change",()=>{
                const color:string=input.value;
                // console.log("color!!:",color)
                col.style.background=color;
                this._modSelector.updateColumn(col,flex); //updating selector and storing it
                if(input.value){
                col.removeChild(input);
                }
            });
        }
       
     }
    
     bgImage(item:{column:HTMLElement,blog:blogType}){
        const {column,blog}=item;
       
        column.style.minHeight="15vh";
        let rowCol:HTMLElement | null;
        if(window.innerWidth <900){
            rowCol=column.parentElement as HTMLElement;    
        }else{
            rowCol=column as HTMLElement;
        }
        rowCol.style.height="15vh";
        const formContainer=document.createElement("div");
        formContainer.className="flexCol box-shadow";
        formContainer.style.cssText="position:absolute;width:clamp(150px,250px,300px);height:150px;z-index:100;font-size:15px;align-items:center;z-index:300;background-color:white;box-shadow:1px 1px 12px 1px black;border-radius:12px;";
        formContainer.style.inset="0%";
        const form=document.createElement("form");
        form.className="m-auto d-flex flex-column gap-1 form-group";
        form.setAttribute("data-form-group","true");
        form.style.cssText="margin:auto; width:inherit;";
        const label=document.createElement("label");
        label.textContent="upload image";
        label.style.cssText="font-size:14px; text-align:center;"
        label.className="form-control text-sm text-primary";
        const input=document.createElement("input");
        input.type="file";
        input.style.cssText="font-size:14px;"
        input.name="file";
        input.accept="image/jpg image/png";
        input.className="form-control";
        const btn=buttonRetDisable({parent:form,text:"submit",bg:this.btnColor,color:"white",type:"submit",disable:true})
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(btn);
        formContainer.appendChild(form);
        rowCol.appendChild(formContainer);
        ModSelector.modAddEffect(formContainer);
        input.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        form.addEventListener("submit",async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const user=this._modSelector._user;
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file");
                if(file as File){
                column.style.zIndex="0";
                column.style.position="relative";
                const image=URL.createObjectURL(file as File);
                column.setAttribute("data-background-image","true");
                column.style.backgroundSize="100% 100%";
                column.style.backgroundPosition="50% 50%";
                column.style.backgroundImage=`url(${image})`;
                Misc.blurIn({anchor:column,blur:"20px",time:600});
                const {parsed}=Header.checkJson(column.getAttribute("flex"));
                let flex=parsed as flexType;
                const oldKey=flex.imgKey ? flex.imgKey : null;
                const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                flex={...flex,position:"col",backgroundImage:true,imgKey:Key}
                column.setAttribute("flex",JSON.stringify(flex));
                await this._modSelector.promUpdateColumn(column,flex).then(async(res)=>{
                    if(res){
                        Misc.fadeOut({anchor:formContainer,xpos:50,ypos:100,time:500});
                        setTimeout(()=>{
                            rowCol.removeChild(formContainer);
                        },480);
                        this._user.askSendToServer({bg_parent:column,formdata,image:null,blog,oldKey});

                    }
                });

                }
            }
        });


        
     }
     rmBgImage(item:{column:HTMLElement}){
        const {column}=item;
        for(const key of Object.keys(column.style)){
            if(key==="backgroundImage"){
                column.style.backgroundImage="";
                column.style.backgroundPosition="";
                column.style.backgroundSize="";
            }
        }
        const {isJSON,parsed}=Header.checkJson(column.getAttribute("flex"));
        if(!isJSON) return;
        const flex=parsed as flexType;
        const {imgKey}=flex;
        if( imgKey){
            Misc.message({parent:column,msg:`${imgKey} is removed`,type_:"success",time:700});
                    const flex_={...flex,imgKey:undefined,backgroundImage:undefined};
                    if(flex.colId){

                        this._modSelector.promUpdateColumn(column,flex_).then(async(coltype:colType|undefined)=>{
                            if(coltype){
                                column.setAttribute("flex",JSON.stringify(flex_));
                                Misc.message({parent:column,type_:"success",time:1200,msg:`${column.id} is updated`});
                            }
                        });
                    }else if(flex.rowId){
                        this._modSelector.promUpdateRow(column).then(async(res)=>{
                            if(res){
                                column.setAttribute("flex",JSON.stringify(flex_));
                                Misc.message({parent:column,type_:"success",time:1200,msg:`${column.id} is updated`});
                            }
                        });
                    }
        
        }
     }
     async bgRowImage(item:{column:HTMLElement,blog:blogType}){
        const {column,blog}=item;
        const row=column.parentElement;
        if(!row) return;
        const {isJSON,parsed}=Header.checkJson(row.getAttribute("flex"));
        if(row && isJSON){
            const user=this._user.user;
            let flex=parsed as flexType;
            const oldKey=flex.imgKey ? flex.imgKey : null;;
            const {form:form2,reParent:parent}=Misc.imageForm(column,flex);
            parent.style.zIndex="-1";
            form2.addEventListener("submit",(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    const formdata= new FormData(e.currentTarget as HTMLFormElement);
                    const file=formdata.get("file") as File;
                    const blog=this._modSelector.blog;
                    
                    if(file){
                        const {Key}= this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                        flex={...flex,backgroundImage:true,imgKey:Key};
                        row.setAttribute("flex",JSON.stringify(flex));
                        const urlImg=URL.createObjectURL(file) as string;
                        row.style.backgroundImage=`url(${urlImg})`;
                        row.style.backgroundSize=`100% 100%`;
                        row.style.backgroundPosition=`50% 50%`;
                        row.setAttribute("data-backgroundImage","true");
                        parent.style.zIndex="0";
                        this._modSelector.updateRow(row,flex);
                        this._user.askSendToServer({bg_parent:row,formdata,image:null,blog,oldKey:oldKey});
                        Misc.growOut({anchor:form2,scale:0,opacity:0,time:400});
                        setTimeout(()=>{parent.removeChild(form2)},398);
                    }
                }
            });
        }
     }
    
    deleteHeaderElement(parent:HTMLElement|null,target:HTMLElement){
        //TARGET TO BE REMOVED!!
        Main.cleanUp(target);
        const iconDiv=document.createElement("div");
        iconDiv.id="delete-header";
        iconDiv.className="";
        iconDiv.setAttribute("is-icon","true");
        iconDiv.setAttribute("contenteditable","false");
        iconDiv.style.cssText="position:absolute;top:0px;right:0px;font-size:20px;transform.translate(-10px,-10px);background:black;color:white;border-radius:50%;";
        const cssStyle={background:"inherit",color:"blue"}
        FaCreate({parent:iconDiv,name:FaCrosshairs,cssStyle});
        target.appendChild(iconDiv);
        iconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:target,xpos:50,ypos:100,time:752});

                if(parent as HTMLElement){
                    setTimeout(()=>{
                        (parent as HTMLElement).removeChild(target);
                    },750);
                }
                
            this._modSelector._selectors.map((sel,index)=>{
                if(sel.header){
                   const arr= Header.getImgKeys(sel);
                   arr.map(item=>{
                    if(item){
                        this._service.adminImagemark(item.imgKey).then(async(res)=>{
                            if(res && parent){
                                Misc.message({parent:parent,msg:`${item.imgKey} is deleted`,type_:"success",time:400});
                            }
                        });
                    }
                   });
                    this._modSelector._selectors.splice(index,1);
                    
                }
            });
            this._modSelector.selectors=this._modSelector._selectors;
        //    this._modSelector.shiftPlace();
                
            }
        });
       
     }
     updateElement(target:HTMLElement):Promise<{element:element_selType|undefined}>{
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        const flex=parsed as flexType;
        let element:element_selType={} as element_selType;
        const {selectorId,rowId,colId,imgKey}=flex ;
        this._modSelector._selectors=this._modSelector._selectors.map(select=>{
                if(select.eleId===selectorId){
                    const rows=JSON.parse(select.rows) as rowType[];
                    rows.map(row=>{
                        if(row.eleId===rowId){
                            row.cols.map(col=>{
                                if(col.eleId===colId){
                                    col.elements.map(ele=>{
                                        if(ele.eleId===target.id){
                                            ele.cssText=target.style.cssText;
                                            ele.class=target.className.split(" ").filter(cl=>(cl !== "isActive")).join(" ");
                                            ele.inner_html=target.innerHTML;
                                            if(target.nodeName.toLowerCase()==="a"){
                                                const link=target.getAttribute("data-href");
                                                const anchorContainer=target.getAttribute("data-anchor-container");
                                                ele.attr=JSON.stringify({link,anchorContainer});
                                                ele.inner_html=target.innerHTML;
                                            }else if(target.nodeName.toLowerCase()==="img"){
                                                const img=target as HTMLImageElement;
                                                ele.img=img.src;
                                                ele.inner_html=img.alt;
                                                ele.imgKey=imgKey ? imgKey as string : undefined;
                                            }
                                            element=ele;
                                        }
                                        return ele;
                                    });
                                }
                                return col;
                            });
                        }
                        return row;
                    });
                    select.rows=JSON.stringify(rows);
                }
            return select;
        });
        this._modSelector.selectors=this._modSelector._selectors;
        return new Promise(resolver=>{
            resolver({element})
        }) as Promise<{element:element_selType|undefined}>;
        
    }
    
     btnAttributeUpdate(target:HTMLElement){
        const actives=document.querySelectorAll("[is-icon = 'true']");
        if(actives){
            const array=[...actives as any] as HTMLButtonElement[];
            array.forEach(activeEle=>{
                activeEle.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        if(activeEle && activeEle.id as string){
                        target.classList.toggle(activeEle.id);
                        }
                    }
                });
            });
        }
     }
    //HEADERS USE THEIR OWN ADDER SEPARATE FROM MODSELECTOR
    selectorAdder(target:HTMLElement,selector:selectorType):selectorType{
        const checkHeader=this._modSelector._selectors.find(sel=>(sel.header===selector.header));
        if(checkHeader){
            this._modSelector._selectors.splice(0,1);
        }
        const newSelect:selectorType={
            ...selector as selectorType,
            id:0,
            name:target.getAttribute("name")? target.getAttribute("name") : "",
            eleId:target.id,
            class:target.className,
            cssText:target.style.cssText,
            rows:"",
            header:true,
            placement:0,
            footer:false,
            headerType:"normal",
        } as selectorType;
        this._modSelector.count=this._modSelector.count+1;
        this._modSelector._selectors.push(newSelect);
        this._modSelector.selectors=this._modSelector._selectors;
        if(selector.header){
            this._modSelector.header=newSelect;
        }
        //addAttributes
        target.setAttribute("is-selector","true");
        return newSelect
    }
    promSelectorAdder(target:HTMLElement,selector:selectorType){
        return new Promise((resolver,reject)=>{
            resolver(this.selectorAdder(target,selector));
            reject("missed selector");
        }) as Promise<selectorType>;
    }

    rowAdder(target:HTMLElement,selectorId:string):selectorType{
        let row_:rowType={} as rowType;
        let rows=[] as rowType[];
        this._modSelector._selectors=this._modSelector._selectors.map(select=>{
            // console.log("188:rowAdderr:outside",select.eleId,selectorId);//works
            if(select.eleId===selectorId){
            // console.log("188:rowAdderr:inside",select.eleId,selectorId);//works
                rows=this._modSelector.checkGetRows({select}).rows
                const ID=select.rows ? select.rows.length :0;
                // console.log("201:modSelector:rowAdderr:inside",select.id,selectorId);
                
                    row_={
                        id: ID,
                        name:target.getAttribute("name") ? target.getAttribute("name") as string : '' ,
                        class:target.className,
                        eleId:target.id,
                        inner_html:target.textContent ? target.textContent : "",
                        cssText:target.style.cssText,
                        cols:[] as colType[],
                        selector_id:select.id,
                        order:ID ? ID:0
                    } as rowType;
                    rows.push(row_);
                    target.setAttribute("order",`${row_.order}`)
                
               
            }
            select.rows=JSON.stringify(rows);
            this._modSelector.header=select;
            return select;
        });
        this._modSelector.selectors=this._modSelector._selectors;
        return this._modSelector._selectors.filter(sel=>(sel.eleId===selectorId))[0]
    }

    columnAdder(column:HTMLElement){
        const flex=JSON.parse(column.getAttribute("flex") as string) as flexType;
        // console.log("920:flex",flex)
        let col:colType={} as colType;
        const {selectorId,rowId}=flex;
        this._modSelector._selectors=this._modSelector._selectors.map(sel=>{
            // console.log("columnAdder:selector cmp:",sel.eleId,selectorId);//works
        if(sel.eleId===selectorId){
            //DOES NOT SEE ROW
            const rows=JSON.parse(sel.rows);
            rows.map(row=>{
                // console.log("columnAdder:row:",row);
                // console.log("columnAdder:row cmp:",row.eleId,rowId);//doesnt work
                if(row.eleId===rowId){
                    column.style.zIndex="";
                    const ID=row.cols.length
                        col={
                            id:ID,
                            name:column.getAttribute("name") ? column.getAttribute("name") as string : '' ,
                            class:column.className,
                            eleId:column.id,
                            inner_html:column.textContent ? column.textContent : "",
                            cssText:column.style.cssText,
                            elements:[] as element_selType[],
                            row_id:row.id,
                            order:ID
                    }as colType;
                    row.cols=[...row.cols,col]
                    column.setAttribute("order",`${ID}`);
                }
                // console.log("COLS ADDED",row.cols);
                return row;
            });
            sel.rows=JSON.stringify(rows);
        }
            this._modSelector.header=sel;
            return sel;
        });
        this._modSelector.selectors=this._modSelector._selectors;
        return {target:column,col:col};
    }
    async promColumnAdder(column:HTMLElement){
        return new Promise((resolver,reject)=>{
            resolver(this.columnAdder(column));
            reject("missed column")
        }) as Promise<{target:HTMLElement,col:colType}>;
    }

    async promElementAdder(target:HTMLElement):Promise<element_selType>{
        const prom=new Promise((resolver,reject)=>{
            resolver(this.elementAdder(target));
            reject("element was not added")
        });
        return prom as Promise<element_selType>;
    }
    elementAdder(target:HTMLElement):element_selType | undefined{
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        const checkNodename=["a","blockquote","ul","img","ol"]
        const nodename=target.nodeName.toLowerCase();
        const specialNodename=checkNodename.includes(nodename);
        let ele:element_selType={} as element_selType;
        // console.log("flex",flex)//works
        if(isJSON){
            const flex=parsed as flexType;
            const {selectorId,rowId,colId,imgKey}=flex;
            // console.log("FLEX: ","rowId:",rowId,"eleId",flex.elementId);
            //ADDING ATTRIBUTES
            const name=target.nodeName.toLowerCase();
            target.setAttribute("is-element","true");
            target.setAttribute("name",name);
            //ADDING ATTRIBUTES
       
            this._modSelector._selectors = this._modSelector._selectors.map(selector_=>{
                if(selector_.eleId===selectorId ){
                    // console.log("inside selector:",selector_.eleId===selectorId);//works
                    const rows=JSON.parse(selector_.rows);
                    rows.map(row=>{
                        if(row.eleId===rowId){
                            row.cols.map((col)=>{
                                // console.log("compare col:",col.eleId,"flex.col",colId);//works
                                // console.log("inside col:",col.eleId===colId);
                                if(col.eleId===colId){
                                    const ID=col.elements ? col.elements.length:0;

                                    const check=col.elements && col.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);

                                        if(nodename && !check){
                                            // console.log("418 HELROWSSSSS",JSON.parse(target.id));
                                            ele={
                                                ...ele,
                                                id:ID ,
                                                selectorId:selector_.id,
                                                name:nodename as string,
                                                class:target.className.split(" ").filter(cl=>(cl !=="isActive")).join(" "),
                                                eleId:target.id,
                                                placement:ID ? ID as number : undefined,
                                                cssText:target.style.cssText,
                                                attr:target.getAttribute("attr") ? target.getAttribute("attr") as string :undefined,
                                                col_id:col.id,
                                                order:ID ? ID:0
                                            } as element_selType;
                                            if(!specialNodename){
                                                    ele.inner_html=target.innerHTML;
                                    
                                            }else if(nodename==="a"){
                                                const link=target.getAttribute("data-href") as string;
                                                ele.attr=link;
                                                ele.inner_html=target.innerHTML;
                                                
                                            }else if(specialNodename && nodename !=="a" && nodename !=="img"){
                                                ele.inner_html=target.innerHTML as string
                                                // console.log("modSelector.elementAdder()",ele.inner_html)
                                            }else if(nodename==="img"){
                                                const target_=target as HTMLImageElement;
                                                ele.img=target_.src;
                                                ele.inner_html=target_.alt;
                                                ele.imgKey=imgKey ? imgKey : ""
                                            }
                                            col.elements.push(ele)
                                            target.setAttribute("order",`${ele.order}`)
                                           
                                        }
                                       
                                }
                                
                                return col;
                            })
                        }
                        return row;
                    });
                    selector_.rows=JSON.stringify(rows);
                }
                return selector_;
            });
            this._modSelector.selectors=this._modSelector._selectors; //saving it to blog
            return ele;
        }

    }
    promflexColTracker=(target:HTMLElement,flex:flexType,position:string):Promise<flexType>=>{
        const prom=new Promise((resolver,reject)=>{
            resolver(this.flexColTracker(target,flex,position))
            reject(console.error("did not record"))
        });
        return prom as Promise<flexType>
    }
     flexColTracker(target:HTMLElement,flex:flexType,position:string):flexType{
        const name=target.nodeName.toLowerCase(); 
        const rand=`${position}-${name}-${Math.round(Math.random()*100)}`;
        target.id=`${rand}`;
        target.setAttribute("name",name);
        target.setAttribute("is-column","true");
        flex={...flex,colId:rand,position};
        target.setAttribute("flex",JSON.stringify(flex));
        return flex;
    }
    showRemoveItem(parent:HTMLElement,divCont:HTMLElement,target:HTMLElement):void{
        //showREmoveItem () ID="show-remove-item-XiconDiv"
        target.style.position="relative";
        Header.cleanUpByID(target,"show-remove-item-XiconDiv");
        const iconDiv=document.createElement("div");
        iconDiv.setAttribute("is-icon","true");
        iconDiv.id="show-remove-item-XiconDiv";
        iconDiv.style.cssText="position:absolute;top:-20px;right:0%;width:25px;height:25px;transform:translate(12px,12px);border-radius:50%;"
        const css={color:"red"}
        FaCreate({parent:iconDiv,name:FaCrosshairs,cssStyle:css})
      
            divCont.appendChild(iconDiv);
            iconDiv.addEventListener("click",(e:MouseEvent)=>{
                if(e ){
                    Misc.fadeOut({anchor:divCont,xpos:50,ypos:100,time:400});
                    setTimeout(()=>{divCont.remove()},398);
                    this._modSelector.promRemoveElement(target).then(async(res)=>{
                        if(res){
                            if(target.nodeName==="IMG"){
                                const {parsed}=Header.checkJson(target.getAttribute("flex"));
                                const flex=parsed as flexType;
                                const {imgKey}=flex;
                                if(imgKey){
                                    this._service.adminImagemark(imgKey as string).then(async(res)=>{
                                        if(res){
                                            Misc.message({parent,msg:`${imgKey} is removed`,type_:"success",time:700});
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            });
        
        
    }
   
    removeElement(target:HTMLElement){
        const {parsed,isJSON} = Header.checkJson(target.getAttribute("flex"));
        const flex=isJSON ? parsed as flexType : null;
        if(!flex) return;
        const {colId,rowId,selectorId}=flex;
        this._modSelector._selectors=this._modSelector._selectors.map(sel=>{
                if(sel.eleId===selectorId){
                    const rows=JSON.parse(sel.rows) as rowType[];
                    rows.map(row=>{
                        if(row.eleId===rowId){
                            row.cols.map(col=>{
                                if(col.eleId===colId){
                                    col.elements.map((ele,index)=>{
                                        if(ele.eleId ===target.id){
                                            col.elements.splice(index,1)
                                        }
                                    });
                                }
                                return col;
                            });
                        }
                        return row;
                    });
                    sel.rows=JSON.stringify(rows);
                }
            return sel;
        });
        this._modSelector.selectors=this._modSelector._selectors
    }
     imgRound(col:HTMLElement,attr:string){
        const childs=([...col.children as any] as HTMLElement[]);
        childs.map(async(child)=>{
            const {isJSON}=Header.checkJson(child.getAttribute("flex"));
            if(child.nodeName==="IMG" && isJSON){
                Header.rmAttributes({target:child,cssStyleRm:{borderRadius:"50%"}});
                child.classList.toggle(attr);
                await this.updateElement(child);
            }else if(child){
                ([...child.children as any] as HTMLElement[]).map(async(ch)=>{
                    const {isJSON}=Header.checkJson(ch.getAttribute("flex"));
                    if(ch && isJSON ){
                        Header.rmAttributes({target:child,cssStyleRm:{borderRadius:"50%"}});
                        ch.classList.toggle(attr);
                        await this.updateElement(ch);
                    }
                });
            }
        });
    }
    adjustImgSize(col:HTMLElement){
        //add input.type="number"
        Header.cleanUpByID(col,"changeImage");
        col.style.position="relative";
        col.style.zIndex="";
        const popup=document.createElement("div");
        popup.style.cssText="position:absolute;top:110%;left:30%,right:30%;width:85%;height:150px;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;";
        const {input,label,formGrp}=Nav.inputComponent(popup);
        formGrp.style.cssText="display:flex;flex-direction:column;margin:auto;";
        input.type="number";
        input.placeholder="75";
        input.min="75";
        input.max="175";
        input.style.cssText="background:white;width:auto;padding:0.5rem;color:blue;font-size:14px;";
        label.textContent="img-size";
        label.classList.add("text-primary");
        const btn=buttonReturn({parent:popup,color:"white",bg:this.btnColor,text:"okay",type:"button"});
        col.appendChild(popup);
        input.addEventListener("input",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value;
                const childs=([...col.children as any] as HTMLElement[]);
                childs.map(async(ch)=>{
                    const isActive=([...ch.classList as any] as string[]).includes("isActive");
                    if(ch && isActive && ch.nodeName==="IMG"){
                        const width=`${value}px`;
                        const img=ch as HTMLImageElement;
                        Header.addAttributes({target:ch,cssStyleAdd:{width:width,height:width,maxWidth:"none",maxHeight:"none"}});
                       
                        await this.updateElement(img);
                    }else if(isActive && ch){
                        //second level
                        const check2=([...ch.children as any] as HTMLElement[]).map((chl)=>(chl.nodeName)).includes("IMG");
                        if(check2){
                            ([...ch.children as any] as HTMLElement[]).map(async(chl)=>{
                                if(chl){
                                    const width=`${value}px`;
                                    const img=chl as HTMLImageElement;
                                    Header.addAttributes({target:chl,cssStyleAdd:{width:width,height:width,maxWidth:"none",maxHeight:"none"}});
                                    await this.updateElement(img);
                                }
                            });
                        }
                    }
                });
            }
        });
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:100,ypos:100,time:500});
                setTimeout(()=>{col.removeChild(popup)},480);
            }
        });
    }
    changePartition(column:HTMLElement,attr:string){
        //THIS CHANGES FLEX PARTITION (ie;flex:1 1 25%,,,50%,,,75%)
        const row=column.parentElement as HTMLElement;
        const {parsed}=Header.checkJson(column.getAttribute("flex"));
        const columns=([...row.children as any] as HTMLElement[]);
        const cleanClass=(attr_:string)=>{
            ([...column.classList as any] as string[]).map(cl=>{
                if(cl.includes(attr_)){
                    column.classList.remove(cl)
                }
            })
        }
        const colLen=columns.length;
        const checkAttr =CustomHeader.columnPartition.find(colAttr=>(colAttr.attr===attr));
       
        if(checkAttr){
                cleanClass("flex");
                switch(true){
                    case checkAttr.attr==="flex-normal":
                        column.style.display="flex";
                        column.style.flexDirection="row";
                        column.style.flexWrap="wrap";
                        column.style.justifyContent="flex-start";
                        column.style.alignItems="flex-start";
                        const flex=parsed as flexType;
                    return this._modSelector.updateColumn(column,flex);
                    case checkAttr.attr==="flex-static":
                        columns.map(col=>{
                            if(col){
                                const findClass=([...col.classList as any] as string[]).find(cl=>(cl.includes("col-")));
                                if(findClass){
                                    col.classList.remove(findClass);
                                    col.classList.add(`col-lg-${12/colLen}`);
                                }
                                col.style.flex="1 0 33%";
                                const {parsed}=Header.checkJson(column.getAttribute("flex"));
                                const flex=parsed as flexType;
                                this._modSelector.updateColumn(col,flex)
                            }
                        });

                    return;
                    case checkAttr.attr==="flex-double":
                        columns.map(col=>{
                            if(col){
                                const findClass=([...col.classList as any] as string[]).find(cl=>(cl.includes("col-")));
                                if(findClass){
                                    col.classList.add(attr);
                                    col.classList.remove(findClass);
                                    if(col.id !==column.id){
                                        col.classList.add(`col-lg-${6/colLen}`);
                                        col.style.flex="1 0 33%";
                                    }else{
                                        col.classList.add(`col-lg-6`);
                                        col.style.flex="1 0 50%";
                                    }
                                }
                                const {parsed}=Header.checkJson(column.getAttribute("flex"));
                                const flex=parsed as flexType;
                                this._modSelector.updateColumn(col,flex)
                            }
                        });

                    return;
                    case checkAttr.attr==="flexRow":
                        column.classList.add(attr);
                        column.style.display="flex";
                        column.style.flexDirection="row";
                        column.style.flexWrap="nowrap";
                        column.style.justifyContent="flex-start";
                        column.style.alignItems="flex-start";
                        const flex1=parsed as flexType;
                    return this._modSelector.updateColumn(column,flex1);
                    case checkAttr.attr==="flexCol":
                        column.classList.add(attr);
                        column.style.display="flex";
                        column.style.flexDirection="column";
                        const flex2=parsed as flexType;
                    return this._modSelector.updateColumn(column,flex2);
                    case checkAttr.attr==="flex-quarter":
                        columns.map(col=>{
                            if(col){
                                col.classList.add(attr);
                                const findClass=([...col.classList as any] as string[]).find(cl=>(cl.includes("col-")));
                                if(findClass){
                                    col.classList.remove(findClass);
                                    if(col.id !==column.id){
                                        //1/4*12
                                        col.classList.add(`col-lg-${4}`);
                                        col.style.flex="1 0 37.5%";
                                    }else{
                                        col.classList.add(`col-lg-3`);
                                        col.style.flex="1 0 25%";
                                    }
                                }
                                const {parsed}=Header.checkJson(column.getAttribute("flex"));
                                const flex=parsed as flexType;
                                this._modSelector.updateColumn(col,flex)
                            }
                        });
                    return;
                    case checkAttr.attr==="flex-three-quarter":
                        columns.map(col=>{
                            if(col){
                                col.classList.add(attr);
                                const findClass=([...col.classList as any] as string[]).find(cl=>(cl.includes("col-")));
                                if(findClass){
                                    col.classList.remove(findClass);
                                    if(col.id !==column.id){
                                        //3/4*12=3*3=6
                                        col.classList.add(`col-lg-${3}`);
                                        col.style.flex="1 0 12.5%";
                                    }else{
                                        col.classList.add(`col-lg-6`);
                                        col.style.flex="1 0 75%";
                                    }
                                }
                                const {parsed}=Header.checkJson(column.getAttribute("flex"));
                                const flex=parsed as flexType;
                                this._modSelector.updateColumn(col,flex)
                            }
                        });

                    return;
                    case checkAttr.attr==="flexCol-normal":
                        column.classList.add(attr);
                        column.style.display="flex";
                        column.style.flexDirection="column";
                        column.style.justifyContent="flex-start";
                        column.style.alignItems="flex-start";
                        const flex3=parsed as flexType;
                    return this._modSelector.updateColumn(column,flex3);
                    case checkAttr.attr==="flex-default":
                        
                        columns.map((col)=>{
                            if(col){
                                col.classList.add(attr);
                                const logo=([...col.classList as any] as string[]).find(cl=>(cl==="colLogo"));
                                const center=([...col.classList as any] as string[]).find(cl=>(cl==="colCenter"));
                                const right=([...col.classList as any] as string[]).find(cl=>(cl==="colRight"));
                                const findClass=([...col.classList as any] as string[]).find(cl=>(cl.includes("col-")));
                                if(findClass){
                                    col.classList.remove(findClass);
                                    if(logo){
                                        //3/4*12=3*3=6
                                        col.classList.add(`col-lg-${3}`);
                                        col.classList.add(`col-1`);
                                        col.style.flex="1 0 25%";
                                    }else if(center){
                                        col.classList.add(`col-lg-6`);
                                        col.classList.add(`col-2`);
                                        col.style.flex="1 0 50%";
                                    }else if(right){
                                        col.classList.add(`col-lg-3`);
                                        col.classList.add(`col-2`);
                                        col.style.flex="1 0 25%";
                                    }else{
                                        col.style.flex="1 0 25%";
                                    }
                                }
                                col.style.minHeight="15vh";
                                const {parsed}=Header.checkJson(column.getAttribute("flex"));
                                const flex=parsed as flexType;
                                this._modSelector.updateColumn(col,flex)
                            }
                        });

                    return;
                }
        }
    }
    
    
     deleteEffect(parent:HTMLElement,target:HTMLElement){
        //TARGET TO BE REMOVED!!
        const iconDiv=document.createElement("div");
        iconDiv.id="header-delete-effect";
        iconDiv.className="";
        iconDiv.setAttribute("is-icon","true");
        iconDiv.style.cssText="position:absolute;top:0px;right:10px;font-size:26px;transform.translate(0px,-13px);background:black;color:white;border-radius:50%;z-index:400;";
        const cssStyle={background:"inherit",fontSize:"inherit"}
        FaCreate({parent:iconDiv,name:FaCrosshairs,cssStyle});
        target.appendChild(iconDiv);
        iconDiv.onmouseover=(e:MouseEvent)=>{
            if(e){
                MouseOver({parent:iconDiv,msg:"Removes item"});
            }
        };
        iconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Header.removeEffect(parent,target)//effect and removes target
                this._modSelector._selectors=this._modSelector._selectors.filter(sel=>(sel.eleId !==target.id));
                this._modSelector.selectors=this._modSelector._selectors;

            }
        });
       
     }
     static getImgKeys(selector:selectorType):{targetName:string,imgKey:string}[]{
        const arr:{targetName:string,imgKey:string}[]=[] as {targetName:string,imgKey:string}[];
        const rows=JSON.parse(selector.rows) as rowType[];
        rows.map(row=>{
            if(row){
                if(row.imgKey){
                    arr.push({targetName:row.name,imgKey:row.imgKey});
                }
                row.cols.map(col=>{
                    if(col){
                        if(col.imgKey){
                            arr.push({targetName:col.name,imgKey:col.imgKey});
                        }
                        col.elements.map(ele=>{
                            if(ele){
                                if(ele.imgKey){
                                    arr.push({targetName:ele.name,imgKey:ele.imgKey});
                                }
                            }
                        });
                    }
                });
            }
        });
        return arr
    }
    static removeEffect(parent:HTMLElement,target:HTMLElement){
        //TARGET TO BE REMOVED!!
        target.animate([
            {transform:"scale(1) translate(0%,0%)",opacity:"1"},
            {transform:"scale(0.2) translate(-100%,-100%)",opacity:"0"},
        ],{duration:760,iterations:1});
        setTimeout(()=>{
            parent.removeChild(target);
        },700);
       
     }
     static cleanClass(target:HTMLElement):string | undefined{
        let classes:string[]=[];
        let returnClass="";
        if( target){
            if(target.children){
                const childs=[...target.children as any] as HTMLElement[];
                childs.forEach(child=>{
                    classes=child.className.split(" ");
                    returnClass=classes.filter(cl=>(cl !=="isActive")).join(" ");
                    
                });
            }else{
                classes=target.className.split(" ");
                classes.filter(cl=>(cl !=="isActive"));
                returnClass=classes.filter(cl=>(cl !=="isActive")).join(" ");
            }
            return returnClass
        }
     }
     static growIn(target:HTMLElement){
        target.animate([
            {transform:"translate(-50%,-50%) scale(0)"},
            {transform:"translate(0%,0%) scale(1)"},
        ],{duration:750,iterations:1});
     }
     static sortElementOrder(target:HTMLElement):number{
        const arr=[
            {name:"H1",num:0},
            {name:"H2",num:1},
            {name:"H3",num:2},
            {name:"H4",num:3},
            {name:"H5",num:4},
            {name:"H6",num:5},
            {name:"DIV",num:6},
            {name:"UL",num:7},
            {name:"P",num:8},
            {name:"IMG",num:9},
            {name:"SPAN",num:10},
            {name:"BUTTON",num:11},
        ]
        const num=arr.filter(node=>(node.name===target.nodeName))[0].num
        return num
     }
     static cleanUp(parent:HTMLElement){
        while(parent.firstChild){
            if(parent.lastChild){
            parent.removeChild(parent.lastChild as ChildNode)
            }
        }
     }
     static cleanUpByID(parent:HTMLElement,id:string){
        if(!parent) return;
        ([...parent.children as any] as HTMLElement[]).map(child=>{
            if(child && child.id===id){
                parent.removeChild(child);
            }else if(child){
                ([...child.children as any] as HTMLElement[]).map(ch=>{
                    if(ch && ch.id===id){
                        child.removeChild(ch);
                    }else if(ch){
                        ([...ch.children as any] as HTMLElement[]).map(chl=>{
                            if(chl && chl.id===id){
                                ch.removeChild(chl);
                            }
                        });
                    }
                });
            }
        });
     }
     static checkJson=(checkStr:string | null):{parsed:object|null,isJSON:boolean}=>{
        const str=checkStr;
        if(str){
            const lftBracket=/\{/g;
            const rghtBracket=/\}/g;
            const matchLefts=str.match(lftBracket);
            const matchRghts=str.match(rghtBracket);
            //p:emailtelType | undefined
            if(matchLefts && matchRghts){
                const result=JSON.parse(str) as any;
                return {parsed:result,isJSON:true};
            }
        }
        return {parsed:null,isJSON:false};
    }
    static addAttributes(addon:{target:HTMLElement,cssStyleAdd:{[key:string]:string}}){
        const {target,cssStyleAdd}=addon;
        let index=0;
        for(const key of Object.keys(target.style)){
            index++;
            for(const [keyAdd,valueAdd] of Object.entries(cssStyleAdd)){
                if(key===keyAdd){
                    target.style[index]=valueAdd;
                }
                      
            }
        }
    }
    static rmAttributes(addon:{target:HTMLElement,cssStyleRm:{[key:string]:string}}){
        const {target,cssStyleRm}=addon;
        let index=0;
        for(const key of Object.keys(target.style)){
            index++;
            for(const keyAdd of Object.keys(cssStyleRm)){
                    if(key===keyAdd){
                        target.style[index]="none";

                    }
                      
            }
        }
    }
    static cleanAttribute(target:HTMLElement,attr:string){
        const attrsStyle:classAttType[]=[{id:18,cssStyle:{display:"flex",justifyContent:"flex-start",alignItems:"flex-start"},attr:"flex-normal",level:"col"},{id:19,cssStyle:{display:"flex",justifyContent:"",alignItems:""},attr:"flex-static",level:"col"},{id:20,cssStyle:{flex:"2 1 50%"},attr:"flex-double",level:"col"},{id:21,cssStyle:{transform:" skew(45deg, 45deg)"},attr:"skew-45",level:"element"},{id:22,cssStyle:{transform:" skew(15deg, 15deg)"},attr:"skew-15",level:"element"},{id:23,cssStyle:{display:"flex",flexDirection:"row",flexWrap:"wrap"},attr:"flexRow",level:"col"},{id:24,cssStyle:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},attr:"flexCol",level:"col"},{id:25,cssStyle:{boxShadow:"1px 1px 7px 1px #3a484a, -1px -1px 7px -1px #3a484a"},attr:"box-shadow-md1",level:"element"},{id:26,cssStyle:{borderRadius:"50%",aspectRatio:"1 / 1"},attr:"round",level:"element"},{id:27,cssStyle:{borderRadius:"50%",aspectRatio:"1 / 1",boxShadow:"1px 1px 7px 1px #3a484a, -1px -1px 7px -1px #3a484a"},attr:"box-shadow-round",level:"element"},{id:28,cssStyle:{flex:"1 1 25%"},attr:"flex-quarter",level:"col"},{id:29,cssStyle:{flex:"1 1 50%"},attr:"flex-half",level:"col"},{id:30,cssStyle:{flex:"1 1 75%"},attr:"flex-three-quarter",level:"col"}]
        const getAttr=attrsStyle.find(att=>(att.attr===attr));
        const check=([...target.classList as any] as string[]).includes(attr);
        if(!getAttr) return;
        if(!check){
            let index=0;
            for(const key of Object.keys(target.style)){
                index++;
                for(const [key1,value1] of Object.entries(getAttr.cssStyle)){
                    if(key===key1){
                        target.style[index]=value1;
                    }
                }
            }
        }else{
            let index=0;
            for(const key of Object.keys(target.style)){
                index++;
                for(const key1 of Object.keys(getAttr.cssStyle)){
                    if(key===key1){
                        target.style[index]="none";
                    }
                }
            }
        }
    }
    static detectImageEffect(target:HTMLElement):void{
        
        const check=target.nodeName==="IMG" ? true:false;
        if(check)return  Misc.blurIn({anchor:target,blur:"20px",time:900});
     
        for(const key of Object.keys(target.style)){
            if(key==="backgroundImage"){
                return Misc.blurIn({anchor:target,blur:"20px",time:900});
            }
        }
        

    }
}

export default Header;
export const headRemoveEffect=Header.removeEffect;
export const headCleanClass=Header.cleanClass;
export const headgrowIn=Header.growIn;
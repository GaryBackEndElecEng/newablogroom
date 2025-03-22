import { element_selType, colType, rowType, selectorType, headerType, columnAttrType, classAttType, blogType } from './Types';
import ModSelector from "./modSelector";
import {FaCrosshairs} from "react-icons/fa";
import {FaCreate} from "@/components/common/ReactIcons";
import Main from "@/components/editor/main";
import Misc from "../common/misc";
import User from "../user/userMain";
import CustomHeader from './customHeader';
import { buttonRetDisable, buttonReturn } from '../common/tsFunctions';
import Service from '../common/services';
import Nav from '../nav/headerNav';
import { idValueType, levelEnumType, selRowColType, selRowType, typeEnumType } from '@/lib/attributeTypes';
import { attrEnumArr, attrEnumArrTest,  typeEnumArr, typeEnumArrTest } from '../common/lists';
import Dataset from '../common/dataset';

export interface headerSelector extends selectorType{
image:string,
}

class Header{
   public phone:string="./images/phone.png";
   public link:string="./images/link.png";
   public mail:string="./images/mail.png";
   static logo:string="./images/gb_logo_768x1025.png";
   public urlImg:string;
   public bgColor:string;
   public btnColor:string;
   public divCont_css:string;
   public divCont_class:string;
   public _count=0;
   private _placement=0;
   public _HeaderData:{[key:string]:string}={} as {[key:string]:string};
   public _HeaderDataMain:headerType={} as headerType;
   private _selector={
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
            eleId:"h-160-w-100",
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
            eleId:"header-h-150-w-100",
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
            eleId:"header-h-130-w-100",
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
            eleId:"header-h-120-w-100",
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
            eleId:"header-h-110-w-100",
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
            eleId:"header-h-100-w-100",
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
        {backgroundColor:"darkblue",color:"white",minHeight:"150px",width:"100%"},
        {backgroundColor:"darkblue",color:"white",minHeight:"140px",width:"100%"},
        {backgroundColor:"lightblue",color:"white",minHeight:"130px",width:"100%"},
        {backgroundColor:"lightpink",color:"dark",minHeight:"120px",width:"100%"},

    ]

   static headers_:headerType[]=[
        {id:1,placement:0,eleId:"header-h-160-w-100",isOn:false,name:"header",image:"./images/header.png",headerStyle:Header.styleDatas[0]},
        {id:2,placement:0,eleId:"header-h-150-w-100",isOn:false,name:"header1",image:"./images/header1.png",headerStyle:Header.styleDatas[1]},
        {id:3,placement:0,eleId:"header-h-130-w-100",isOn:false,name:"header2",image:"./images/header2.png",headerStyle:Header.styleDatas[2]},
        {id:4,placement:0,eleId:"header-h-120-w-100",isOn:false,name:"header3",image:"./images/header.png",headerStyle:this.styleDatas[3]},
        {id:5,placement:0,eleId:"header-h-110-w-100",isOn:false,name:"header4",image:"./images/header1.png",headerStyle:Header.styleDatas[4]},
        {id:6,placement:0,eleId:"header-h-100-w-100",isOn:false,name:"header5",image:"./images/header2.png",headerStyle:Header.styleDatas[5]},
    ];

    public mainHeader:HTMLElement;

    constructor(private _modSelector : ModSelector,private _service:Service,private _user:User){
        Header.logo="./images/gb_logo_768x1025.png"
        this.phone="./images/phone.png";
        this.link="./images/link.png";
        this.mail="./images/mail.png";
        this._count=0;
        // this._selector={...this._selector,id:0}
        this.bgColor="#0C090A";
        this.btnColor=this._modSelector.btnColor;
        this.bgColor=this._modSelector._bgColor;
       this.urlImg="/images/gb_logo.png";
       this.divCont_css="display:flex;flex-direction:column;justify-content:center;width100%;align-items:center;padding:0.25rem;";
        this.divCont_class="eleContainer";
        this.mainHeader=document.createElement("section");
        this.mainHeader.id="sectionHeader";
        this.mainHeader.className = ModSelector.mainHeader_class;
        this.mainHeader.classList.add("normal-header");
        this.mainHeader.style.cssText = ModSelector.mainHeader_css;
    }
    

    get placement(){
        return this._modSelector.placement;
    };

    set placement(placement:number){
        this._modSelector.placement=placement;
    };

    get getHeader(){
        return this._HeaderDataMain;
    };

    set getHeader(header:headerType){
        this._HeaderDataMain=header;
    };

    get selector(){
        return this._selector;
    };
    
    set selector(selector:selectorType){
        this._selector=selector;
    }
    
    set selectors(selectors:selectorType[]){
        this._modSelector.selectors=selectors;
    };

    get selectors(){
        return this._modSelector.selectors;
    };

   

    //PARENT EDIT=> INJECTED INTO EDIT FOR REFRESH AND FINAL SHOW
   async showHdrSelector(parent:HTMLElement,selector:selectorType,idValues:idValueType[]){
        parent.style.width="100%";
        const less400=window.innerWidth < 400 ;
        // console.log("Header selector",selector)//works
        if(selector.name){
            
            const innerCont=document.createElement(selector.name);
            const selEleId=selector.eleId;
            innerCont.id=selEleId;
            innerCont.className=selector.class;
            innerCont.classList.add("w-100");
            innerCont.setAttribute("name",selector.name);
            innerCont.setAttribute("data-selector-id",`${selector.id}`);
                innerCont.setAttribute("data-container-id",`${innerCont.id}`);
            innerCont.setAttribute("data-selector-id",selector.eleId);
            innerCont.style.cssText=selector.cssText;
            idValues.push({eleId:selEleId,id:"selectorId",attValue:selEleId});
            idValues.push({eleId:selEleId,id:"selector_id",attValue:String(selector.id)});
            idValues.push({eleId:selEleId,id:"ID",attValue:selEleId});
             //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
             const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                target:innerCont,
                sel:selector,
                row:null,
                col:null,
                ele:null,
                idValues,
                loc:"flexbox",
                level:"selector",
                clean:false
            });
            idValues=retIdValues
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:selEleId});
            const getEleIds=idValues.filter(kat=>(kat.eleId===selEleId));
            this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
            const {rows}=this._modSelector.checkGetRows({select:selector});
            const newRows=rows.toSorted((a,b)=>{if(a.order < b.order) return -1;return 1})
            await Promise.all(newRows.map(async(row_,index)=>{
                const row=document.createElement("div");
                const rEleId=row_.eleId;
                row.id=rEleId;
                row.className=row_.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                row.style.cssText=row_.cssText;
                row.style.zIndex="0";
                row.style.flexDirection=less400 ? "column":"row";
                const selRow:selRowType={selectorId:selector.eleId,rowId:rEleId};
                idValues.push({eleId:rEleId,id:"selRow",attValue:JSON.stringify(selRow)});
                idValues.push({eleId:rEleId,id:"ID",attValue:rEleId});
                idValues.push({eleId:rEleId,id:"rowId",attValue:rEleId});
                idValues.push({eleId:rEleId,id:"rowNum",attValue:String(index)});
                idValues.push({eleId:rEleId,id:"row_id",attValue:String(row_.id)});
              //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
             const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                target:row,
                sel:selector,
                row:row_,
                col:null,
                ele:null,
                idValues,
                loc:"flexbox",
                level:"row",
                clean:false
            });
            idValues=retIdValues
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:rEleId});
            const getEleIds=idValues.filter(kat=>(kat.eleId===rEleId));
            this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
            
            this._modSelector.dataset.populateElement({target:row,selRowColEle:row_,level:"row",loc:"flexbox",idValues,clean:false});
            const _row_= await this._modSelector.removeBlob({target:row,rowColEle:row_,loc:"flexbox",level:"row",idValues,selRowCol:null,selRow});
                if(_row_.imgKey){
                    row.setAttribute("data-backgroundImg","true");
                    idValues.push({eleId:rEleId,id:"backgroundImg",attValue:"true"});
                    idValues.push({eleId:rEleId,id:"imgKey",attValue:_row_.imgKey});
                    const check=this._service.checkFreeImgKey({imgKey:_row_.imgKey as string});
                    
                        if(check){
                            const url=this._service.getFreeBgImageUrl({imgKey:_row_.imgKey as string});
                            row.style.backgroundImage=`url(${url})`;
                        }
                };
            //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
                    Header.detectImageEffect(row);
                 
                  await  Promise.all(row_.cols.toSorted((a,b)=>{if(a.order < b.order) return -1;return 1}).map(async(col_,index)=>{
                    const eleId=col_.eleId;
                    const selRow:selRowType={selectorId:selector.eleId,rowId:row_.eleId};
                    const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row_.eleId,colId:eleId};
                    
                        const col=document.createElement("div");
                        col.id=eleId;
                        col.style.cssText=col_.cssText;
                        col.style.zIndex="0";
                        col.className=col_.class;
                        if(less400){
                            col.classList.remove("col-md-3");
                            col.classList.add("col-md-12");
                            col.style.flex="0 0 100%";
                        };
                        
                        //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
                        idValues.push({eleId,id:"colId",attValue:col.id});
                        idValues.push({eleId,id:"rowId",attValue:row_.eleId});
                        idValues.push({eleId,id:"selRow",attValue:JSON.stringify(selRow)});
                        idValues.push({eleId,id:"ID",attValue:col.id});
                        idValues.push({eleId,id:"colOrder",attValue:String(col_.order)});
                        idValues.push({eleId,id:"col_id",attValue:String(col_.id)});
                        idValues.push({eleId,id:"column",attValue:"true"});
                        idValues.push({eleId,id:"isColumn",attValue:"true"});
                        //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
                        const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                            target:col,
                            sel:selector,
                            row:row_,
                            col:col_,
                            ele:null,
                            idValues,
                            loc:"flexbox",
                            level:"col",
                            clean:false
                        });
                        idValues=retIdValues
                        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:eleId});
                        const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                        this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
                        this._modSelector.dataset.populateElement({target:col,selRowColEle:col_,level:"col",loc:"flexbox",idValues,clean:false});
                        const _col_= await this._modSelector.removeBlob({target:col,rowColEle:col_,loc:"flexbox",level:"col",idValues,selRowCol,selRow:null});
                       
                        if(_col_.imgKey){
                            idValues.push({eleId,id:"imgKey",attValue:_col_.imgKey});
                            col.setAttribute("data-backgroundImg","true");
                            const check=this._service.checkFreeImgKey({imgKey:_col_.imgKey as string});
                            
                            if(check){
                                const url=this._service.getFreeBgImageUrl({imgKey:_col_.imgKey as string});
                                col.style.backgroundImage=`url(${url})`;
                            }
                        }
                        //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
                        col.setAttribute("is-column","true");
                        Header.detectImageEffect(col);
                        //SETATTRIBUTE PLUSS MORE
                      
                       
                        this.selectElementAttribute({parent:col,selector,row:row_,col:col_,idValues});

                        //----/////-----APPENDING COLUMN-----\\\\------///
                        row.appendChild(col);
                        //----/////-----APPENDING COLUMN-----\\\\------///

                        col.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                col.classList.toggle("coliIsActive");
                            }
                        });
                     await  Promise.all(col_.elements.toSorted((a,b)=>{if(a.order < b.order) return -1;return 1}).map(async(element,index)=>{
                            
                        await this.generateElement({column:col,selector,row:row_,col:col_,element,idValues}).then(async(res)=>{
                             if(res){
                                const node=res.target.nodeName.toLowerCase();
                                res.column.appendChild(res.divCont);//appending elements
                                idValues=Dataset.removeIdValueDuplicates({arr:res.idValues,eleId:res.target.id});
                                const getEleIds=idValues.filter(kat=>(kat.eleId===res.target.id));
                                this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
                                if(res.selRowCol && res.isEdit===true){
                                    this.editElement({target:res.target,idValues:res.idValues,selRowCol:res.selRowCol});
                                };
                             
                                res.divCont.addEventListener("click",async(e:MouseEvent)=>{
                                    if(e){
                                      
                                        res.target.classList.toggle("isActive");
                                        res.divCont.classList.toggle("isActive");
                                        Main.activatebuttons({target:res.target});
                                        this.showRemoveItem({
                                            parent:res.column,
                                            divCont:res.divCont,
                                            target:res.target,
                                            idValues:res.idValues,
                                            selRowCol:res.selRowCol

                                        });
                                        await this.updateElement({
                                            target:res.target,
                                            idValues:res.idValues,
                                            selRowCol:res.selRowCol

                                        });
                                        if(node==="img"){
                                            this._user.refreshImageShow({parent:res.divCont,image:(res.target as HTMLImageElement),formdata:null,selRowCol:res.selRowCol,idValues:res.idValues});
                                        }
                                    }
                                });
                                
                             }
                        })
                            

                        }));
                       
                    }));
                    innerCont.appendChild(row);
                    // console.log(innerCont)//works
                   
                }));
                this._modSelector.removeHeader({parent,target:innerCont,idValues});
            parent.appendChild(innerCont);
        }
    };

    //FOR SHOWHDRSELECTOR
   async generateElement({column,selector,row,col,element,idValues}:{
        column:HTMLElement;
        element:element_selType;
        idValues:idValueType[];
        selector:selectorType;
        row:rowType;
        col:colType;
        
    }):Promise<{
        column:HTMLElement;
        divCont:HTMLElement;
        target:HTMLElement;
        idValues:idValueType[];
        selRowCol:selRowColType;
        isEdit:boolean;
    }
    |undefined
    >{
        const textTypes=["p","h1","h2","h3","h4","h5","h6",].includes(element.name);
        const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId};
        const eleId=element.eleId;
        const attrTest=attrEnumArrTest(element);
        const typeTest=typeEnumArrTest(element);
        const isLink=(attrTest && attrTest.id==="link") ? attrTest:undefined;
        const isEmail=(attrTest && attrTest.id==="email") ? attrTest:undefined;
        const isTel=(attrTest && attrTest.id==="tel") ? attrTest:undefined;
        const type=typeTest|| undefined;
        const rand=Math.floor(Math.random()*1000);
        const listTypes=["ul","ol","blockquote"].includes(element.name);
        const divCont=document.createElement("div");
        divCont.id=`eleContainer-${rand}`;
        divCont.style.cssText="margin-block:auto;padding:0.5rem;";
        const target=document.createElement(element.name);
        target.id=eleId;
        //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
        const link=isLink ? isLink.value : undefined;
        const email=isEmail ? isEmail.value : undefined;
        const tel=isTel ? isTel.value: undefined;
        if(link) idValues.push({eleId,id:"link",attValue:link});
        if(email) idValues.push({eleId,id:"email",attValue:email});
        if(tel) idValues.push({eleId,id:"tel",attValue:tel});
        if(type) idValues.push({eleId,id:type.id,attValue:type.value});
        divCont.style.zIndex="200";
        divCont.setAttribute("data-placement",`${element.order}-A`);
        idValues.push({eleId,id:"elementId",attValue:eleId});
        idValues.push({eleId,id:"editableTrue",attValue:"true"});
        //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
        const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
            target,
            sel:selector,
            row,
            col,
            ele:element,
            idValues,
            loc:"flexbox",
            level:"element",
            clean:false
        });
        idValues=retIdValues
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:eleId});
        this._modSelector.dataset.populateElement({target,level:"element",loc:"flexbox",idValues,selRowColEle:element,clean:false});
        const getEleIds_=idValues.filter(kat=>(kat.eleId===eleId));
        this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds_);
            //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
            
            
        target.className=element.class;
        target.style.cssText=element.cssText;
        target.innerHTML=element.inner_html;
        switch(true){
            case textTypes:
                divCont.appendChild(target);
            return Promise.resolve({column,divCont,target,idValues,selRowCol,isEdit:true}) as Promise<{column:HTMLElement,divCont:HTMLElement,target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType,isEdit:boolean}>;
            case listTypes:
                divCont.style.cssText+="margin-top:1.5rem;"
                divCont.appendChild(target);
            return Promise.resolve({column,divCont,target,idValues,selRowCol,isEdit:true}) as Promise<{column:HTMLElement,divCont:HTMLElement,target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType,isEdit:boolean}>;

            case element.name==="a" :
                
                    if(link){
                        this.addLinkEmailTelImg({target:target as HTMLAnchorElement,image:this.link,href:link,name:target.textContent||"name",type:"link"});
                        divCont.id +="anchor";
                        divCont.appendChild(target);

                    }else if(email){
                        this.addLinkEmailTelImg({target:target as HTMLAnchorElement,image:this.link,href:email,name:target.textContent||"name",type:"email"});
                        (target as HTMLAnchorElement).href=email ;
                        target.setAttribute("data-email",(target as HTMLAnchorElement).href);
                        divCont.appendChild(target);
                    }else if(tel){
                        // console.log("element.attr",element.attr && JSON.parse(element.attr))
                        this.addLinkEmailTelImg({target:target as HTMLAnchorElement,image:this.link,href:tel,name:target.textContent||"name",type:"tel"});
                        target.setAttribute("data-tel",(target as HTMLAnchorElement).href);
                        divCont.appendChild(target);
                    };
             
            return Promise.resolve({column,divCont,target,idValues,selRowCol,isEdit:false}) as Promise<{column:HTMLElement,divCont:HTMLElement,target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType,isEdit:boolean}>;

            case element.name==="img":
                if( element.imgKey){
                    const check=this._service.checkFreeImgKey({imgKey:element.imgKey as string});
                   
                        if(check){
                            const url=this._service.getFreeBgImageUrl({imgKey:element.imgKey as string});
                            (target as HTMLImageElement).src=url;
                            (target as HTMLImageElement).alt=url;
                        }else{

                            this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                                if(res){
                                    (target as HTMLImageElement).src=res.img;
                                    (target as HTMLImageElement).alt=res.Key
                                }
                            });
                        }
                }else{
                    (target as HTMLImageElement).src=element.img ||this.urlImg;
                    (target as HTMLImageElement).alt="www.ablogroom.com"
                }
                target.setAttribute("contenteditable","false");
                (target as HTMLImageElement).alt=element.inner_html ? element.inner_html : "www.ablogroom.com";
                divCont.style.cssText="margin:1rem;max-width:150px;max-height:150px;position:relative;position:relative;";
                divCont.appendChild(target);
                Header.detectImageEffect(target);
                
            
            return Promise.resolve({column,divCont,target,idValues,selRowCol,isEdit:false}) as Promise<{column:HTMLElement,divCont:HTMLElement,target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType,isEdit:boolean}>;

            default:
                return;
        }
    };

     //INJECTOR:Main.container: THIS FEEDS Main._mainHeader the DOC
    editorHeader({parent}:{parent:HTMLElement}){
        Header.cleanUpByID(parent, "sectionHeader");
        parent.style.position = "relative";
        //Main._mainHeader is public
        Main._mainHeader =this.mainHeader
        // ADD INSERT HEADER FROM EDIT
        // ADD INSERT HEADER FROM EDIT
        parent.appendChild(this.mainHeader)
    };

   async headerSidebar({mainHeader,style,id,idValues}:{mainHeader:HTMLElement|null,style:{[key:string]:string},id:number,idValues:idValueType[]}){
        //THIS IS ACTIVATE BY THE SIDEBAR ON CLICK AND IS THE MAIN INJECTION FOR NEW HEADER
        const selected=Header.selectors_.find(sel=>(sel.id===id));
       
        if(mainHeader && style && selected){
            mainHeader.classList.add("normal-header");
            mainHeader.classList.remove("custom-header");
            const rand=Math.floor(Math.random()*1000);
            const eleId=`normal-${selected.eleId}-${rand}`;
            this.selector={...selected,eleId,placement:0,id:0};
            mainHeader.style.width="100%";
            Header.cleanUpByID(mainHeader,"mainHeader-selector");
            const innerHeader=document.createElement("header");
            idValues.push({eleId,id:"name",attValue:"header"});
            idValues.push({eleId,id:"isHeader",attValue:"true"});
            innerHeader.id=eleId;
            innerHeader.className="mainHeader flexCol text-center position-relative mb-5";
            idValues.push({eleId:mainHeader.id,id:"selectorId",attValue:eleId});
            idValues.push({eleId:mainHeader.id,id:"ID",attValue:eleId});
            idValues.push({eleId:mainHeader.id,id:"selector_id",attValue:"0"});
            idValues.push({eleId:mainHeader.id,id:"placement",attValue:"0"});
            idValues.push({eleId:mainHeader.id,id:"type",attValue:"header"});
            //ADDS STYLES TO TARGET
            this.headerStyleCreator({target:innerHeader,cssStyle:style,level:"selector"});
            mainHeader.appendChild(innerHeader);
           
            
            //SAVING SELECTOR
            this.selectorAdder({target:innerHeader,selector:this._selector,idValues}).then(async(resSel)=>{
                if(resSel){
                    idValues=resSel.idValues
                    this.selector=resSel.selector;
                    this.appendRowColLayout({
                        mainHeader,
                        targetSel:resSel.target,
                        selector:resSel.selector,
                        idValues
                    });
                    //APPENDING SELECTOR TARGET
                    
                    //APPENDING SELECTOR TARGET
                   Misc.fadeIn({anchor:resSel.target,xpos:100,ypos:0,time:500});
                    this.deleteSelector({mainHeader,target:resSel.target});
                }
            });
        }
     };


     //PARENT HEADERSIDEBAR()- STYLE CREATOR
     headerStyleCreator(item:{target:HTMLElement,cssStyle:{[key:string]:string},level:levelEnumType}):void{ 
        const {target,cssStyle,level}=item;
        
        for(const [key,value] of Object.entries(cssStyle)){
                if(level!=="selector" && (key==="minHeight" || key==="height")){
                    target.style[key]=value;
                }else if(level==="selector" && key==="height"){
                    target.style.height="auto";
                }else{
                    target.style[key]=value;
                }
        }
        
     };


     //PARENT:headerSidebar:mainHeader HEADERSIDEBAR()=> INJECTED ONTO MAIN
    async appendRowColLayout({mainHeader,targetSel,idValues,selector}:{mainHeader:HTMLElement,targetSel:HTMLElement,idValues:idValueType[],selector:selectorType}):Promise<void>{
        const colAttr=selector.colAttr[0];
        const topNum=colAttr.T;
        const botNum=colAttr.B;
        const topRow= topNum !==0 ? 1 :0;
        const botRow= botNum !==0 ? 1 :0;
        const rowNums=topRow + botRow;
        await Promise.all(Array.from(Array(rowNums).keys()).map(async(rowNum)=>{
            const headerRow=document.createElement("div");
            const rand=Math.floor(Math.random()*1000);
            headerRow.style.cssText="width:100%;min-height:20vh;margin:1px;padding-inline:5px;padding-block:1px;position:relative;flex-wrap:wrap;align-items:center;";
            headerRow.className="headerRow row";
            headerRow.id=`header-container-row-${rowNum}-${rand}`;
            const rowId=headerRow.id;
            idValues.push({eleId:rowId,id:"row",attValue:"true"});
            idValues.push({eleId:rowId,id:"isRow",attValue:"true"});
            idValues.push({eleId:rowId,id:"selectorId",attValue:targetSel.id});
            targetSel.appendChild(headerRow);
             await this._modSelector.rowAdder({target:headerRow,selectEle:targetSel,idValues,selector}).then(async(Res)=>{
                if(Res){
                    idValues=Res.idValues
                   
                    const {top,bot}=Header.calcColBootStrapClassFlex({top:topNum,bot:botNum})
                    if(topNum>0 && rowNum===0){
                        //TOP
                       await Promise.all(Array.from(Array(topNum).keys()).map(async (num)=>{
                            const rand=Math.floor(Math.random()*100);
                            const eleId=`normal-col-top-${num}-${rand}`;
                            const col=document.createElement("div");
                            col.id=eleId;
                            idValues.push({eleId,id:"colId",attValue:eleId});
                            idValues.push({eleId,id:"rowId",attValue:Res.target.id});
                            idValues.push({eleId,id:"numCols",attValue:String(num)});
                            const cssStyle={minHeight:"15vh",position:"relative"}
                            this.headerStyleCreator({target:col,cssStyle,level:"row"});
                            col.classList.add(top.topClass);
                            col.style.flex=top.flexTop;
                            Res.target.appendChild(col);
                            await this.colAdder({
                                parent:Res.target,
                                target:col,
                                idValues,
                                selector:Res.sel,
                                row:Res.rowEle as rowType
    
                            }).then(cRes=>{
                                if(cRes ){
                                    idValues=cRes.idValues
                                    this.selectElementAttribute({
                                        parent:cRes.target,
                                        selector:cRes.selector,
                                        col:cRes.col,
                                        row:cRes.row as rowType,
                                        idValues:cRes.idValues
    
                                    });
                                    cRes.target.addEventListener("click",(e:MouseEvent)=>{
                                        if(e){
                                            cRes.target.classList.toggle("coliIsActive");
                                           
                                        }
                                    });
                                };
                            });
                        }));
                    }else if(botNum>0 && rowNum===1){
                        //BOTTOM
                       await Promise.all (Array.from(Array(botNum).keys()).map(async(num)=>{
                            const rand=Math.floor(Math.random()*100);
                            const eleId=`normal-col-bot-${num}-${rand}`;
                            const col=document.createElement("div");
                            col.id=eleId;
                            idValues.push({eleId,id:"colId",attValue:eleId});
                            idValues.push({eleId,id:"rowId",attValue:Res.target.id});
                            idValues.push({eleId,id:"numCols",attValue:String(num)});
                            const cssStyle={minHeight:"15vh",position:"relative"}
                            this.headerStyleCreator({target:col,cssStyle,level:"row"});
                            col.classList.add(bot.botClass);
                            col.style.flex=bot.flexBot;
                            Res.target.appendChild(col);
                            await this.colAdder({
                                parent:Res.target,
                                target:col,
                                idValues,
                                selector:Res.sel,
                                row:Res.rowEle as rowType
    
                            }).then(cRes=>{
                                if(cRes){
                                    idValues=cRes.idValues;
                                    this.selectElementAttribute({
                                        parent:cRes.target,
                                        selector:cRes.selector,
                                        col:cRes.col,
                                        row:cRes.row as rowType,
                                        idValues:cRes.idValues
    
                                    });
                                    cRes.target.addEventListener("click",(e:MouseEvent)=>{
                                        if(e){
                                            cRes.target.classList.toggle("coliIsActive");
                                           
                                        }
                                    });
                                };
                            });
                        }));
                    };
                   
                }
            });

        }));
        
     };

    
    
    

    //PARENT HEADERSIDEBAR
    selectElementAttribute({parent,selector,row,col,idValues}:{parent:HTMLElement,selector:selectorType,col:colType,row:rowType,idValues:idValueType[]}){
        //THIS ALLOWS USER TO ADD ELEMENT AND ATTRIBUTE TO COLUMN
        // if(check){
        //     Header.cleanUpByID(parent,"popup-select-element");
           const selRowCol={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId} as selRowColType
           const selRow={selectorId:selector.eleId,rowId:row.eleId} as selRowType
        parent.classList.add("coliIsActive");
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.id="popup-select-element";
        popup.setAttribute("is-popup","true");
        popup.classList.add("popup");
        popup.style.cssText="margin:auto;position:absolute;height:auto;width:fit-content;z-index:2000;";
        popup.style.top="100%";
        popup.style.transform="translate(5px,-15px)";
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
        Header.removePopup({parent,target:popup,position:"right"});
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{top:"60%",left:"0%",right:"",inset:"",fontSize:"10px",transform:""}});
        Misc.matchMedia({parent:popup,maxWidth:700,cssStyle:{top:"50%",left:"0%",right:"",inset:"",fontSize:"10px",transform:""}});
        select.addEventListener("change",(e:Event)=>{
            if(e){
                const item=JSON.parse((e.currentTarget as HTMLSelectElement).value as string) as columnAttrType;
                //id: number,name: string,attr?: string,value(node)?: string,remove?: boolean,level?: "col" | "row" | "element";
                const {name,value,attr,level}=item;
               
                 if(value){
                    //element to add
                    const text=`insert-${value}`
                        this.addElement({parent,label:name,node:value,text,idValues,selector,row,col}).then(async(res)=>{
                            if(res && res.appended && res.divCont && res.parent && res.target){
                                parent.classList.remove("coliIsActive");
                                res.parent.appendChild(res.divCont);
                                if(res.selRowCol){
                                    this.editElement({target:res.target,idValues:res.idValues,selRowCol:res.selRowCol});
                                }
                                
                            }
                        });
                } else if(attr){
                        
                        if(name ==="bg-color"){
                            this.columnColor({target:parent,attrName:attr,selRowCol,idValues});
                        }else if(name==="bg-row-color"){
                            
                            this.rowColor({target:parent,selRow,idValues});
                        }else if(name==="round"){
                            this.imgRound({col:parent,attr,idValues,selRowCol});
                            
                        }else if(name==="adjust-img-size"){
                            this.adjustImgSize({col:parent,idValues,selRowCol});
                        }else if(name==="bg-image"){
                            this.bgImage({column:parent,blog:this._modSelector.blog,idValues,selRowCol});
                        }else if(level==="element"){
                            if(attr==="pretty-font"){
                            const eleActives=parent.querySelectorAll("[is-element].isActive");
                            ([...eleActives as any] as HTMLElement[]).forEach(element=>{
                                // console.log(element)//works
                                    element.classList.toggle(attr as string);
                                    this.updateElement({target:element,idValues,selRowCol});
                                // }
                            });
                            }else{
                                //EFFECTS ONLY ACTIVE ELEMENTS=>isActive
                            this.toggleAttributeElement({col:parent,attr,idValues,selRowCol});

                            }
                        }else if(level==="col"){
                            if(name==="rm-bg-image"){
                                this.rmBgImage({target:parent,idValues,selRowCol});
                            }else{
                                
                                this.flexColAdjustments({target:parent,class_:attr,idValues,selRowCol});//modifying partition
                            }
                        }else if(level==="row"){
                            if(name==="bg-row-image"){
                                this.bgRowImage({column:parent,selRow,idValues});
                            }else if(name==="bg-row-height"){
                                this.bgRowHeight({target:parent,idValues,selRowCol})
                            }else{

                                const grandParent=parent.parentElement as HTMLElement;
                                if(!grandParent) return;
                                const {selectorId,rowId}=selRowCol;
                                const selRow={selectorId,rowId} as selRowType;
                                this._modSelector.updateRow({target:grandParent,idValues,selRow});
                                grandParent.classList.toggle(attr);
                                
                            }

                        }
                }
                    
                
            }
        });
        // }

        //nameValueAttrs:columnAttrType[]
    }
    //PARENT: selectElementAttribute
    toggleAttributeElement({col,attr,idValues,selRowCol}:{col:HTMLElement,attr:string,idValues:idValueType[],selRowCol:selRowColType}){
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
                    this.updateElement({target:child,idValues,selRowCol}).then(async(res)=>{
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
                            this.updateElement({target:ch,idValues,selRowCol}).then(async(res)=>{
                                if(res){
                                    
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
     async addElement({parent,label,node,text,idValues,selector,row,col}:{
        parent:HTMLElement,
        node:string,
        label:string,
        text:string|undefined,
        idValues:idValueType[]
        selector:selectorType,
        row:rowType,
        col:colType
     }):Promise<{appended:boolean,target:HTMLElement|null,idValues:idValueType[],divCont:HTMLElement,parent:HTMLElement,selRowCol:selRowColType|null}|undefined>{
    //    console.log("node",node,"parent",parent)//works
        const rand=Math.floor(Math.random()*1000) ;
         const textTypes=["p","h1","h2","h3","h4","h5","h6","blockquote"].includes(node);
         const divCont=document.createElement("div");
         divCont.id="eleContainer" + String(rand);
         const target=document.createElement(node);
         
         target.id=`${node}-${rand}`;
         
         const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId};
         divCont.style.cssText="margin-block:auto;padding:0.25rem;position:relative;z-index:200;"
       
             switch(true){
                 case textTypes:
                    target.textContent=text ||"insert";
                    target.style.cssText="padding-inline:1.25rem;border-radius:8px;";
                    await this.elementAdder({selector,row,col,target,idValues}).then(async(res)=>{
                        if(res ){
                            idValues=res.idValues
                            const ele_=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele_.order}-A`);
                            divCont.addEventListener("click",(e:MouseEvent) => {
                                if(e){
                                    res.target.classList.toggle("isActive");
                                    divCont.classList.toggle("isActive");
                                    this.showRemoveItem({parent,divCont,target:res.target,idValues,selRowCol});
                                        this.updateElement({target:res.target,idValues,selRowCol});
                                }
                            });
                           
                        }
                    });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
                    divCont.appendChild(target);
                   
                    Misc.fadeIn({anchor:divCont,xpos:30,ypos:100,time:400});
                return {appended:true,target,divCont,parent,idValues,selRowCol};
                case node==="ol" || node==="ul":
               
                return this.orderedList({parent,divCont,target,node,sel:selector,row,col,idValues});
                
                case node==="img":
                   
                    divCont.setAttribute("name","div");
                    divCont.className="m-auto d-flex flex-column justify-content-center align-items-center position-relative"
                    divCont.style.cssText="margin:auto;padding:0.5rem;z-index:0;max-width:125px;max-height:125px;position:relative;";
                    divCont.style.zIndex="200";
                    divCont.classList.add("img-cont");//THIS IS FOR ATTRIBUTES
                    (target as HTMLImageElement).src=this.urlImg;
                    target.style.cssText="width:100%;";
                    target.style.maxWidth="125px";
                    target.style.maxHeight="125px";
                    target.style.borderRadius="7px";
                    target.style.boxShadow="1px 1px 6px 1px #007FFF,-1px -1px 6px -1px #007FFF";
                    target.style.borderRadius="11px";
                    (target as HTMLImageElement).alt="www.ablogroom.com";
                    target.setAttribute("name","img");
                    target.setAttribute("is-element","true");
                    Misc.fadeIn({anchor:target,xpos:30,ypos:100,time:400});
                    //ADDS ATTRIBUTES AND ID TO NEW ELEMENT
                    
                    //ADDS ATTRIBUTES AND ID TO NEW ELEMENT
                    divCont.appendChild(target);
                    
                    this.elementAdder({selector,row,col,target,idValues}).then(async(res)=>{
                        if(res){
                            const ele_=res.ele as element_selType;
                            const image=res.target as HTMLImageElement;
                            divCont.setAttribute("data-placement",`${ele_.order}-A`);
                            const mainTextArea=Main.textarea as HTMLElement;
                            this._user.refreshImageUpload({targetContainer:divCont,mainTextArea,image,selRowCol,idValues});
                            divCont.addEventListener("click",(e:MouseEvent)=>{
                                if(e){
                                    divCont.classList.toggle("isActive");
                                    res.target.classList.toggle("isActive");
                                    this.showRemoveItem({parent,divCont,target:res.target,idValues,selRowCol});
                                }
                            });
                        }
                    });
                
                    return {appended:true,target,divCont,parent,idValues,selRowCol:null};

                case node==="span":
                    target.style.cssText+=`margin-inline:5px;padding-inline:0.65rem;padding-block:0.25rem;min-width:30px;text-decoration:underline;border:none;color:inherit;`
                    //ADDS ATTRIBUTES AND ID TO NEW ELEMENT
                    divCont.appendChild(target);
                   
                    Misc.fadeIn({anchor:target,xpos:30,ypos:100,time:400});
                    this.elementAdder({selector,row,col,target:target,idValues}).then(async(res)=>{
                        if(res){
                            divCont.setAttribute("data-placement",`${res.ele.order}-A`);
                            divCont.onclick=(e:MouseEvent)=>{
                                divCont.classList.toggle("isActive");
                                res.target.classList.toggle("isActive");
                                this.showRemoveItem({parent,target:res.target,divCont,idValues,selRowCol});
                            };
                            const shade=Misc.blueShades.filter(shade_=>(shade_.name==="capri"))[0].value
                          
                            res.target.onmouseover=()=>{
                                res.target.animate([
                                    {boxShadow:`1px 1px 4px 1px ${shade}`},
                                    {boxShadow:`1px 1px 7px 2px red`},
                                    {boxShadow:`1px 1px 4px 1px ${shade}`},
                                ],{duration:1000,iterations:1});
                            };
                          
                        }
                    });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements

                   
                return {appended:true,target,divCont,parent,idValues,selRowCol};
                case label==="line" && node==="div":
                    divCont.style.cssText+="padding:0.5rem;display:grid;place-items:center;position:relative";
                    target.style.cssText+="margin:auto;width:75%;background-color:black;";
                   
                   //ADDS ATTRIBUTES AND ID TO NEW ELEMENT
                    this.elementAdder({selector,row,col,target,idValues}).then(async(res)=>{
                        if(res){
                            divCont.setAttribute("data-placement",`${res.ele.order}-A`);
                           
                            divCont.addEventListener("click",(e:MouseEvent) => {
                                if(e){
                                    res.target.classList.toggle("isActive");
                                    divCont.classList.toggle("isActive");
                                    this._modSelector.updateElement({target:res.target,idValues,selRowCol});
                                    this.showRemoveItem({parent,target:res.target,divCont,idValues,selRowCol});
                                }
                            });
                        }
                    });
                    divCont.appendChild(target);
                  
                    Misc.fadeIn({anchor:divCont,xpos:30,ypos:100,time:400});
                return {appended:true,divCont,target,parent,idValues,selRowCol:null};

                case label==="vertical-line" && node==="div":
                    
                    divCont.style.cssText="padding:0.5rem;display:grid;place-items:center;position:relative;";
                    target.style.cssText="margin:auto;width:3px;height:min-height:10vh;background-color:black;margin-inline:5px;padding-inline:2px;";
                   
                   //ADDS ATTRIBUTES AND ID TO NEW ELEMENT
                    this.elementAdder({selector,row,col,target,idValues}).then(async(res)=>{
                        if(res){
                            const ele_=res.ele as element_selType
                            divCont.setAttribute("data-placement",`${ele_.order}-A`);
                            divCont.addEventListener("click",(e:MouseEvent) => {
                                if(e){
                                    res.target.classList.toggle("isActive");
                                    divCont.classList.toggle("isActive");
                                    this.showRemoveItem({parent,target:res.target,divCont,idValues,selRowCol});
                                }
                            });
                            
                        }
                    });;
                    divCont.appendChild(target);
                  
                    Misc.fadeIn({anchor:divCont,xpos:30,ypos:100,time:400});
                return {appended:true,target,divCont,parent,idValues,selRowCol:null};

                case node==="a" :
                    target.style.cssText+="margin-inline:0px;padding-inline:5px;"
                    target.textContent=text? `${label}-${text}`: "insert"
                    if(label==="email"){
                        this.getEmail({parent,target,divCont,idValues,selector,row,col})
                    }else if(label==="insert-tel"){
                        this.insertTel({parent,target,divCont,idValues,selector,row,col})
                    }else{
                        //link
                        this.addLink({parent,target:target as HTMLAnchorElement,divCont,idValues,selector,row,col});//appends link

                    }
                return {appended:true,target,divCont,parent,idValues,selRowCol};
              
                case label==="bg-image":
                        this.bgImage({column:parent,blog:this._modSelector.blog,idValues,selRowCol});
                return 
                case label==="rm-bg-image":
                        this.rmBgImage({target:parent,idValues,selRowCol});
                return
                
                default:
                    return ;
        }
            
      
     };
    
     async orderedList({parent,divCont,target,node,sel,row,col,idValues}:{
        parent:HTMLElement,
        divCont:HTMLElement,
        target:HTMLElement,
        node:string,
        sel:selectorType,
        row:rowType,
        col:colType,
        idValues:idValueType[]
     }):Promise<{appended:boolean,
        target:HTMLElement,
        idValues:idValueType[],
        divCont:HTMLElement,
        parent:HTMLElement,
        selRowCol:selRowColType

     }>{
        const selRowCol:selRowColType={selectorId:sel.eleId,rowId:row.eleId,colId:col.eleId};
        const list=node==="ol" ? target as HTMLOListElement :target as HTMLUListElement;
                    
        list.style.cssText+="margin-bottom:1rem;margin-inline:auto;width:70%;"
        list.textContent=target.textContent ||"insert";
        
        //ADDS ATTRIBUTES AND ID TO NEW ELEMENT
       await this.elementAdder({selector:sel,row,col,target:list,idValues}).then(async(res)=>{
            if(res){
                const ele_=res.ele as element_selType
                divCont.setAttribute("data-placement",`${ele_.order}-A`);
                divCont.addEventListener("click",(e:MouseEvent) => {
                    if(e){
                        divCont.classList.toggle("isActive");
                        res.target.classList.toggle("isActive");
                        this.showRemoveItem({parent,divCont,target:res.target,idValues,selRowCol});
                        this.updateElement({target:res.target,idValues,selRowCol});
                    }
                });
            }

        });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
        divCont.appendChild(list);
   
    return {appended:true,target:list,idValues,divCont,parent,selRowCol};

     };

    //ADD LINK
    addLink({parent,target,divCont,idValues,selector,row,col}:{
        parent:HTMLElement,
        target:HTMLAnchorElement,
        divCont:HTMLElement,
        idValues:idValueType[],
        selector:selectorType,
        row:rowType,
        col:colType
    }){
        const {form,popup,l_input,n_input}=Misc.addLink(parent);
        Header.removePopup({parent,target:form,position:"right"});
        form.addEventListener("submit",async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const anchor=target as HTMLAnchorElement;
                const eleId=target.id;
                const newFormdata=new FormData(e.currentTarget as HTMLFormElement);
                const link_=l_input.name;
                const name_=n_input.name ;
                const link=newFormdata.get(link_) as string;
                const name=newFormdata.get(name_) as string;
                this.addLinkEmailTelImg({target:anchor,image:this.link,href:link,name,type:"link"});
                idValues.push({eleId:target.id,id:"link",attValue:link})
                target.setAttribute("data-link",link);
                idValues.push({eleId,id:"link",attValue:link});
                idValues.push({eleId,id:"elementId",attValue:eleId});
                idValues.push({eleId,id:"colId",attValue:col.eleId});
                idValues.push({eleId,id:"divContId",attValue:divCont.id});
                parent.appendChild(target);
                //ADDS ATTRIBUTES AND ID TO NEW ELEMENT
                this.elementAdder({selector,row,col,target,idValues}).then(async(res)=>{
                    if(res ){
                        const ele=res.ele as element_selType
                        divCont.setAttribute("data-placement",`${ele.order}-A`);
                        
                       
                    }
                });
               
               //ADDS ATTRIBUTES AND ID TO NEW ELEMENT
                //CLOSING FORM
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },380);
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
    

     getEmail({parent,target,divCont,idValues,selector,row,col}:{
        target:HTMLElement,
        parent:HTMLElement,
        divCont:HTMLElement,
        idValues:idValueType[]
        selector:selectorType,
        row:rowType,
        col:colType
     }){
        const form=document.createElement("form");
        form.style.cssText="position:absolute;width:clamp(200px,350px,400px);height:auto;display:flex;align-items:center;justify-content:center;top:10%;left:0%;right:10%;z-index:2000;;flex-direction:column;gap:1rem;background-color:white";
        const {input:LInput,label:Llabel}=Nav.inputComponent(form);
        LInput.className="form-control";
        LInput.type="text";
        LInput.name="email";
        LInput.id="email";
        LInput.autocomplete="email";
        LInput.placeholder="email";
        Llabel.textContent="email";
        Llabel.setAttribute("for",LInput.id);
        const {input:NInput,label:Nlabel}=Nav.inputComponent(form);
        NInput.className="form-control";
        NInput.id="name";
        NInput.name="name";
        NInput.autocomplete="name";
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
        parent.appendChild(form);
        form.onsubmit=async(e:SubmitEvent)=>{
        Header.removePopup({parent,target:form,position:"right"});
            if(e){
                e.preventDefault();
                const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId}
               const email_=target as HTMLAnchorElement;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const email=formdata.get("email") as string;
                const name=formdata.get("name") as string;
                const eleId=target.id
                this.addLinkEmailTelImg({target:email_,image:this.mail,href:`mailto:${email}`,name,type:"email"});
                idValues.push({eleId,id:"email",attValue:`mailto:${email}`});
                //ADDS ATTRIBUTES AND ID TO NEW ELEMENT
               
                divCont.appendChild(target);
                parent.appendChild(divCont);
                await this.elementAdder({target,idValues,selector,row,col}).then(async(res)=>{
                    if(res){
                        const ele_=res.ele as element_selType;
                        divCont.setAttribute("data-placement",`${ele_.order}-A`);
                        divCont.onclick=(e:MouseEvent)=>{
                            if(e){
                                divCont.classList.toggle("isActive");
                                target.classList.toggle("isActive");
                                this.showRemoveItem({parent,divCont,target:res.target,idValues,selRowCol});
                            }
                        };
                    }
                });
                Misc.fadeOut({anchor:form,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(form);
                },398);
            }
        };
     };


     insertTel({parent,target,divCont,idValues,selector,row,col}:{
        parent:HTMLElement,
        target:HTMLElement,
        divCont:HTMLElement,
        idValues:idValueType[]
        selector:selectorType,
        row:rowType,
        col:colType
     }){
        const form=document.createElement("form");
        form.style.cssText="position:absolute;width:clamp(200px,350px,400px);height:auto;display:flex;align-items:center;justify-content:center;top:10%;left:0%;right:10%;z-index:2000;;flex-direction:column;gap:1rem;background-color:white";
        const {input:LInput,label:Llabel}=Nav.inputComponent(form);
        LInput.type="text";
        LInput.name="tel";
        LInput.id="tel";
        LInput.autocomplete="tel";
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
        parent.appendChild(form);
        Header.removePopup({parent,target:form,position:"right"});
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId};
                const tel_=target as HTMLAnchorElement;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const tel=formdata.get("tel") as string;
                const name=formdata.get("name") as string;
                const eleId=target.id;
                idValues.push({eleId,id:"tel",attValue:`tel:${tel}`})
                this.addLinkEmailTelImg({target:tel_,image:this.phone,href:`tel:${tel}`,name,type:"tel"});
                divCont.appendChild(target);
                parent.appendChild(divCont);
                this.elementAdder({target,selector,row,col,idValues}).then(async(res)=>{
                    if(res ){
                        const ele_=res.ele as element_selType
                        divCont.setAttribute("data-placement",`${ele_.order}-A`);
                        divCont.onclick=(e:MouseEvent)=>{
                            if(e){
                                divCont.classList.toggle("isActive");
                                res.target.classList.toggle("isActive");
                                this.showRemoveItem({parent,divCont,target,idValues,selRowCol});
                            }
                        };
                    }
                });
                Misc.fadeOut({anchor:form,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(form);
                },398);
            }
        };
     };
   
   
    
     //PARENT selectElementAttribute()
     rowColor({target,selRow,idValues}:{target:HTMLElement,idValues:idValueType[],selRow:selRowType}){
            Header.cleanUpByID(target,"popup-background-color");
            const row=target.parentElement as HTMLElement;
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
            Header.removePopup({parent:row,target:popup,position:"right"});
            if(row as HTMLElement){
                const input=document.createElement("input");
                input.type="color";
                input.id="color-row-picker";
                popup.appendChild(input);
                input.addEventListener("change",()=>{
                    const color:string=input.value;
                    (row as HTMLElement).style.background=color;
                    this._modSelector.updateRow({target:row as HTMLElement,idValues,selRow}); //updating selector and storing it
                    if(input.value){
                    Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                    setTimeout(()=>{row.removeChild(popup)},398);
                    }
                });
            
        }
       
     };



     bgRowHeight({target,idValues,selRowCol}:{target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
        if(!target) return;
        const {selectorId,rowId}=selRowCol as selRowColType;
        const parent=target.parentElement as HTMLElement;
        parent.style.minHeight="auto";
        const getColumns=document.querySelectorAll("div.column-header") as unknown as HTMLElement[];
        parent.style.position="relative";
        const cont=document.createElement('div');
        cont.id="row-height";
        cont.classList.add("popup");
        cont.setAttribute("is-popup","true");
        cont.style.cssText ="position:absolute;left:50%,right:50%;width:170px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;margin-block:1rem;box-shadow:1px 1px 12px 1px black;border-radius:12px;z-index:200;padding-block;";
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
        Header.removePopup({parent,target:cont,position:"right"});
        input.oninput=(e:Event)=>{
            if(e){
                const number=(e.currentTarget as HTMLInputElement).value;
                parent.style.height=`${number}px`;
            }
        };
        button.onclick=(e:MouseEvent)=>{
            if(e){
               const selRow={selectorId,rowId} as selRowType;
                this._modSelector.updateRow({target:parent,idValues,selRow});
                ([...getColumns] as HTMLElement[]).map(col=>{
                    if(col){
                        col.style.minHeight="auto";
                        col.style.height=parent.style.height;
                        this.updateColumn({target:col,idValues,selRowCol});
                    }
                });
                Misc.fadeOut({anchor:cont,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(cont);
                },398);
            }
        };
     };

     columnColor({target,attrName,idValues,selRowCol}:{target:HTMLElement,attrName:string,idValues:idValueType[],selRowCol:selRowColType}){
        if(target && attrName==="bg-color"){
            const input=document.createElement("input");
            input.type="color";
            input.id="color-col-picker";
            target.appendChild(input);
            Header.removePopup({parent:target,target:input,position:"right"});
            input.addEventListener("change",()=>{
                const color:string=input.value;
                // console.log("color!!:",color)
                target.style.background=color;
                idValues.push({eleId:target.id,id:"bgColor",attValue:color})
                this.updateColumn({target:target,idValues,selRowCol}); //updating selector and storing it
                if(input.value){
                target.removeChild(input);
                }
            });
        }
       
     };
    


     bgImage({column,blog,idValues,selRowCol}:{column:HTMLElement,blog:blogType,idValues:idValueType[],selRowCol:selRowColType}){
       
        column.style.minHeight="15vh";
        let parent:HTMLElement | null;
        if(window.innerWidth <900){
            parent=column.parentElement as HTMLElement;    
        }else{
            parent=column as HTMLElement;
        }
        parent.style.height="15vh";
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
        parent.appendChild(formContainer);
        ModSelector.modAddEffect(formContainer);
        Header.removePopup({parent,target:formContainer,position:"right"});
        input.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        form.addEventListener("submit",async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const user=this._user.user;
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file");
                if(file as File){
                    const eleId=column.id;
                    const getOld=this._modSelector.dataset.getIdValue({target:column,idValues,id:"imgKey"});
                    const oldKey= getOld?.attValue ? getOld.attValue : null;
                    column.style.zIndex="0";
                    column.style.position="relative";
                    const image=URL.createObjectURL(file as File);
                    column.setAttribute("data-background-image","true");
                    column.style.backgroundSize="100% 100%";
                    column.style.backgroundPosition="50% 50%";
                    column.style.backgroundImage=`url(${image})`;
                    Misc.blurIn({anchor:column,blur:"20px",time:600});
                    const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                    const idValue:idValueType={eleId,id:"imgKey",attValue:Key};
                    this._modSelector.dataset.upDateIdValue({target:column,idValues,idValue});
                    idValues.push({eleId:column.id,id:"backgroundImg",attValue:"backgroundImg"});
                    idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
                    await this.updateColumn({target:column,idValues,selRowCol}).then(async(res)=>{
                        if(res){
                           
                            Misc.fadeOut({anchor:formContainer,xpos:50,ypos:100,time:500});
                            setTimeout(()=>{
                                
                                parent.removeChild(formContainer);
                            },480);
                            this._user.askSendToServer({bg_parent:column,formdata,image:null,blog,oldKey,idValues,selRowCol});

                        }
                    });

                }
            }
        });


        
     };


     rmBgImage({target,idValues,selRowCol}:{target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
        const {selectorId,rowId}=selRowCol;
        const isCol=this._modSelector.dataset.getAttribute({target,id:"selRowCol"});
        const selRow={selectorId,rowId} as selRowType
        const eleId=target.id
        this._modSelector.dataset.removeSubValue({target,idValues,eleId,id:"backgroundImg"});
        this._modSelector.dataset.removeSubValue({target,idValues,eleId,id:"backgroundImage"});
        this._modSelector.dataset.removeSubValue({target,idValues,eleId,id:"imgKey"});
        for(const key of Object.keys(target.style)){
            if(key==="backgroundImg"){
                target.style.backgroundImage="";
                target.style.backgroundPosition="";
                target.style.backgroundSize="";
            };
        };
            if(isCol){
                this.updateColumn({target,idValues,selRowCol}).then(async(res)=>{
                    if(res){
                        idValues=res.idValues;
                        this._modSelector.dataset.upDateIdValues({idValues});
                        Misc.message({parent:target,type_:"success",time:600,msg:`removed`});
                    }else{
                        Misc.message({parent:target,type_:"error",time:1200,msg:`column:${target.id} was not updated`});
                    }
                });
            }else{
                this._modSelector.updateRow({target,idValues,selRow}).then(async(res)=>{
                    if(res){
                        idValues=res.idValues;
                        this._modSelector.dataset.upDateIdValues({idValues});
                        Misc.message({parent:target,type_:"success",time:600,msg:`removed`});
                    }else{
                        Misc.message({parent:target,type_:"error",time:1200,msg:`column:${target.id} was not updated`});
                    }
                });
            };
        
       
     };


     async bgRowImage({column,selRow,idValues}:{column:HTMLElement,selRow:selRowType,idValues:idValueType[]}){
        column.style.zIndex="0";
        const target=column.parentElement;
        const selRowCol:selRowColType={...selRow,colId:column.id};
        if(!target) return;
        
        if(target){
            target.style.zIndex="0";
            const eleId=target.id;
            const user=this._user.user;
            const getOld=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
            const oldKey=getOld?.attValue ? getOld.attValue : null;
            const {form:form2,reParent:parent}=Misc.imageForm(column);
            parent.style.zIndex="-1";
            Header.removePopup({parent:column,target:form2,position:"right"});
            form2.addEventListener("submit",async(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    const formdata= new FormData(e.currentTarget as HTMLFormElement);
                    const file=formdata.get("file") as File;
                    const blog=this._modSelector.blog;
                    
                    if(file){
                       
                        const urlImg=URL.createObjectURL(file) as string;
                        target.style.backgroundImage=`url(${urlImg})`;
                        target.style.backgroundSize=`100% 100%`;
                        target.style.backgroundPosition=`50% 50%`;
                        const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                        const idValue:idValueType={eleId,id:"imgKey",attValue:Key};
                        this._modSelector.dataset.upDateIdValue({target:column,idValues,idValue});
                        idValues.push({eleId:column.id,id:"backgroundImg",attValue:"backgroundImg"});
                        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
                        parent.style.zIndex="0";
                        await this._modSelector.updateRow({target,idValues,selRow}).then(async(res)=>{
                            if(res){
                                idValues=res.idValues;
                                this._user.askSendToServer({bg_parent:target,formdata,image:null,blog,oldKey:oldKey,idValues,selRowCol});
                            }
                        });
                        Misc.growOut({anchor:form2,scale:0,opacity:0,time:400});
                        setTimeout(()=>{parent.removeChild(form2)},398);
                    }
                }
            });
        }
     };



     editElement({target,idValues,selRowCol}:{target:HTMLElement | HTMLImageElement,idValues:idValueType[],selRowCol:selRowColType}){
        if(selRowCol){
            const eleId=target.id;
            const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
            const {rowId,colId}= selRowCol as selRowColType;
            target.oninput=(e:Event)=>{
                if(e){
                    
                    this._modSelector.selectors=this._modSelector.selectors.map(selector_=>{
                        if(selector_.header){
                            const {rows}=this._modSelector.checkGetRows({select:selector_});
                            const newRows= rows.map(row=>{
                                if(row.eleId===rowId){
                                    row.cols.map(col=>{
                                        if(col.eleId===colId){
                                            col.elements.map(element=>{
                                                if(element.eleId===target.id){
                                                    element.inner_html=target.innerHTML;
                                                        element.class=cleaned.join(" ");
                                                        element.cssText=target.style.cssText;
                                                       
                                                }
                                                return element;
                                            });
                                        }
                                        return col;
                                    });
                                }
                                return row;
                            });
                           
                            selector_.rows=JSON.stringify(newRows);
                        }
                        return selector_;
                    });
                    this._modSelector.localStore({blog:this._modSelector.blog});
                };
            };
            target.onchange=(e:MouseEvent)=>{
                if(e){
                    const idValue:idValueType={eleId,id:"update",attValue:"true"};
                    this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                    this.updateElement({target,idValues,selRowCol});
                }
            };
            
              
        };
           
            
       
    };


    async colAdder({parent,target,idValues,selector,row}:{parent:HTMLElement,target:HTMLElement,idValues:idValueType[],selector:selectorType,row:rowType}):Promise<{target:HTMLElement,col:colType,idValues:idValueType[],parent:HTMLElement,selector:selectorType,row:rowType}>{
       
        const eleId=target.id;
        const node=target.nodeName.toLowerCase();
        let col:colType={} as colType;
        row.cols=row.cols as colType[] 
        
        const check=row.cols.map(col=>(col.eleId)).includes(target.id as string);
        const selRowCol:selRowColType={selectorId:selector.eleId,rowId:eleId,colId:eleId};
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isCative","box-shadow"]});
        idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
        // console.log("277:check:determines if COL extis",check,"target.id",target.id,)//works
        if(!check){
            const ID1=row.cols?.length ? row.cols.length : 0;
            col={
                id:ID1,
                name:node ,
                class:cleaned.join(" "),
                eleId:target.id,
                inner_html:target.textContent ? target.textContent : "",
                cssText:target.style.cssText,
                elements:[] as element_selType[],
                row_id:row.id,
                order:ID1,
                attr:""
                }as colType;

            //LOADING ATTRIBUTES INTO ELEMENT, BELOW
            idValues.push({eleId,id:"colOrder",attValue:String(ID1)});
           //THIS LOADS THE DEFAULTS AND POPULATES THE ELEMENT BASED ON IDVALUE INPUTS
           const {idValues:retIdValues2}=this._modSelector.dataset.coreDefaultIdValues({
            target,
            level:"col",
            sel:selector,
            row,
            col,
            ele:null,
            loc:"flexbox",
            idValues,
            clean:false

            });
            idValues=retIdValues2
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId})
            this._modSelector.dataset.populateElement({target,selRowColEle:col,idValues,level:"col",loc:"flexbox",clean:false});
            //THIS LOADS THE DEFAULTS AND POPULATES THE ELEMENT BASED ON IDVALUE INPUTS
                row.cols=[...row.cols,col];
                
                //ADDING MODIFIED ROW TO SELECTOR
                const {rows}=this._modSelector.checkGetRows({select:selector});
                const newRows=rows.map(row_=>{
                    if(row_.eleId===row.eleId){
                        row_=row;
                    }
                    return row_;
                });
                //ADDING NEW ROWS TO SELECTOR
                selector.rows=JSON.stringify(newRows);
                //ADDING SELECTOR TO TO SELECTORS
                this._modSelector.selectors=this._modSelector.selectors.map(select=>{
                        if(select.eleId===selector.eleId){
                            select=selector;
                        }
                    return select;
                });
                this._modSelector.localStore({blog:this._modSelector.blog});
        };


        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
           this._modSelector.dataset.idValues=idValues;
           return Promise.resolve({target,col,idValues,parent,selector,row}) as Promise<{target:HTMLElement,col:colType,idValues:idValueType[],parent:HTMLElement,selector:selectorType,row:rowType}>;
            
    };


    async elementAdder({target,idValues,selector,row,col}:{
        target:HTMLElement | HTMLImageElement,
        idValues:idValueType[],
        selector:selectorType,
        row:rowType,
        col:colType

    }): Promise<{
        target: HTMLElement;
        ele: element_selType;
        idValues:idValueType[];
        selector:selectorType;
        row:rowType;
        col:colType
    } | undefined>{
        const eleId=target.id;
        const node=target.nodeName.toLowerCase();
        const parent= target.parentElement;
        const parent_id=parent ? parent.id : null;
        const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
        const imgKey=getImgKey?.attValue || undefined;
        let ele:element_selType={} as element_selType;
        if(parent_id) idValues.push({eleId,id:"divContId",attValue:parent_id})
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
        //ADDING ATTRIBUTES
        const check= col.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
        if(!check){
            const ID=col.elements ? col.elements.length:0;
            if(ID===0){
                col.elements=[] as element_selType[]
            }
            ele={
                ...ele,
                id:ID ,
                selectorId:selector.id,
                name:node,
                class:cleaned.join(" "),
                eleId:target.id,
                cssText:target.style.cssText,
                inner_html:target.innerHTML,
                attr:undefined,
                col_id:col.id,
                imgKey:imgKey,
                order:ID,
                type:undefined,
                
            } as element_selType;
            
            if(node==="img"){
                const target_=target as HTMLImageElement;
                ele.img=target_.src;
                ele.inner_html=target_.alt;
            }
            //LOADING ATTRIBUTES INTO ELEMENT, BELOW
            idValues.push({eleId,id:"eleOrder",attValue:String(ID)});
            const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                const attrTest=attrEnumArrTest(ele);
                const typeTest=typeEnumArrTest(ele);
                 //THIS LOADS THE DEFAULTS AND POPULATES THE ELEMENT BASED ON IDVALUE INPUTS
                 getEleIds.map(kat=>{
                    const attr=attrEnumArr.includes(kat.id);
                    const type=typeEnumArr.includes(kat.id as typeEnumType);
                    if(kat.attValue && !(attrTest) && attr){
                        ele.attr=kat.attValue;
                    }else if(kat.attValue && !(typeTest) && type){
                        ele.type=kat.attValue;
                    }else if(kat.id==="imgKey"){
                        ele.imgKey=kat.attValue;
                    }
                 });
                 const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                    target,
                    sel:selector,
                    row:row,
                    col:col,
                    ele,
                    idValues,
                    loc:"flexbox",
                    level:"element",
                    clean:false
                });
                idValues=retIdValues
                idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:eleId});
                this._modSelector.dataset.populateElement({target,selRowColEle:ele,level:"element",loc:"flexbox",idValues,clean:false});
                col.elements.push(ele)// oushing it

                //adding it TO ROW
                row.cols=row.cols.map(col_=>{
                    if(col_.eleId===col.eleId){
                        col_=col; //updating column
                    }
                    return col_;
                });
                //adding it TO ROW
                // adding ROW TO SELECTOR
                const {rows}=this._modSelector.checkGetRows({select:selector});
                    const newRows=rows.map(row_=>{
                        if(row_.eleId===row.eleId){
                            row_.cols=row.cols;
                        }
                        return row_;
                    });
                    const stringRows=JSON.stringify(newRows);
                    selector={...selector,rows:stringRows};
                // adding ROW TO SELECTOR
                //ADDING SELECTOR TO SELECTORS AND SAVING IT TO LOCAL
                this._modSelector.selectors=this._modSelector.selectors.map(select=>{
                    if(select.eleId===selector.eleId){
                        select=selector;// ADDING SELECTOR
                    }
                    return select;
                }); 
                this._modSelector.localStore({blog:this._modSelector.blog});
                //ADDING SELECTOR TO SELECTORS AND SAVING IT TO LOCAL
                //UPDATING IDVALUES
                idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
                const getEleIds_=idValues.filter(kat=>(kat.eleId===eleId));
                this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds_);
        };
        //UPDATING IDVALUES
        return {target,ele:ele as element_selType,idValues,selector,row,col};
       
    };
    


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
                
            this._modSelector.selectors.map((sel,index)=>{
                if(sel.header){
                   const arr= Header.getImgKeys({selector:sel});
                   arr.map(item=>{
                    if(item){
                        const check=this._service.checkFreeImgKey({imgKey:item.imgKey});
                            if(check) return;
                        this._service.adminImagemark(item.imgKey).then(async(res)=>{
                            if(res && parent){
                                Misc.message({parent:parent,msg:`${item.imgKey} is deleted`,type_:"success",time:400});
                            }
                        });
                    }
                   });
                    this._modSelector.selectors.splice(index,1);
                    
                }
            });

            }
        });
       
     };



     updateElement({target,idValues,selRowCol}:{target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}):Promise<{element:element_selType|undefined,selRowCol:selRowColType,idValues:idValueType[]}>{
        const eleId=target.id;
        let element:element_selType={} as element_selType;
        const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
        const imgKey=getImgKey?.attValue ||undefined;
        const {selectorId,rowId,colId}=selRowCol as selRowColType ;
        if(selRowCol){

            this._modSelector.selectors=this._modSelector.selectors.map(select=>{
                    if(select.eleId===selectorId){
                        const {rows}=this._modSelector.checkGetRows({select});
                        rows.map(row=>{
                            if(row.eleId===rowId){
                                row.cols.map(col=>{
                                    if(col.eleId===colId){
                                        col.elements.map(ele=>{
                                            if(ele.eleId===target.id){
                                                this._modSelector.dataset.simpleInsertAttrAndType({target,ele,idValues});
                                                ele.cssText=target.style.cssText;
                                                ele.imgKey=imgKey
                                                ele.class=target.className.split(" ").filter(cl=>(cl !== "isActive")).join(" ");
                                                ele.inner_html=target.innerHTML;
                                          
                                                idValues= this._modSelector.datasetSincUpdate({target,ele:ele,idValues,level:"element",loc:"flexbox"});
                                                const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                                                const testAttr=attrEnumArrTest(ele);
                                                const testType=typeEnumArrTest(ele);
                                                getEleIds.map(kat=>{
                                                    if(kat.attValue){
                                                        if(testAttr && kat.id===testAttr.id ){
                                                            ele.attr=kat.attValue
                                                        }else if(testType && kat.id===testType.id ){
                                                            ele.type=kat.attValue
                                                        }else if(kat.id==="imgKey"){
                                                            ele.imgKey=kat.attValue
                                                        }
                                                    }
                                                });
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
            this._modSelector.localStore({blog:this._modSelector.blog});
         
        }
        return Promise.resolve({element,selRowCol,idValues}) as Promise<{element:element_selType|undefined,selRowCol:selRowColType,idValues:idValueType[]}>;
        
    };


    
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
     };



    //HEADERS USE THEIR OWN ADDER SEPARATE FROM MODSELECTOR
    selectorAdder({target,selector,idValues}:{
        target:HTMLElement,
        selector:selectorType,
        idValues:idValueType[]

    }):Promise<{target:HTMLElement,selector:selectorType,idValues:idValueType[]}>{
        const eleId=target.id;
        const checkHeader=this._modSelector.selectors.find(sel=>(sel.header===selector.header));
        const node=target.nodeName.toLowerCase();
        if(checkHeader){
           this._modSelector.selectors= this._modSelector.selectors.filter(sel=>(!sel.header));
          
        }
        selector={
            ...selector as selectorType,
            id:0,
            name:node,
            eleId,
            class:target.className,
            cssText:target.style.cssText,
            rows:"",
            header:true,
            placement:0,
            footer:false,
            headerType:"normal",
        } as selectorType;
        this._modSelector.count=this._modSelector.count+1;
        this._modSelector.selectors.push(selector);
        if(selector.header){
            this._modSelector.header=selector;
        }
        //addAttributes
        const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
            target,
            sel:selector,
            row:null,
            col:null,
            ele:null,
            idValues,
            loc:"flexbox",
            level:"selector",
            clean:false

        });
        idValues=retIdValues;
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        this._modSelector.dataset.populateElement({target,selRowColEle:selector,idValues,level:"selector",loc:"flexbox",clean:false});
        const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
        this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
        target.setAttribute("is-selector","true");
        this._selector=selector;
        return Promise.resolve({target,selector,idValues}) as Promise<{target:HTMLElement,selector:selectorType,idValues:idValueType[]}>; 
    };
  
 
   
    showRemoveItem({parent,divCont,target,idValues,selRowCol}:{
        parent:HTMLElement,
        divCont:HTMLElement,
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType

    }):void{
        const check=([...target.classList as any] as string[]).includes("isActive");
        if(check){
            target.style.position="relative";
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
                    this.removeElement({target,idValues,selRowCol}).then(async(res)=>{
                        if(res){
                                console.log(res.ele,res.getEleIds)
                                const idValue=res.getEleIds.find(kat=>(kat.id==="imgKey"));
                                if(idValue){
                                    const check=this._service.checkFreeImgKey({imgKey:idValue.attValue});
                                    if(check) return;
                                    this._service.adminImagemark(idValue.attValue).then(async(res)=>{
                                        if(res){
                                            Misc.message({parent,msg:`${idValue.attValue} is removed`,type_:"success",time:700});
                                        }
                                    });
                                }
                        }
                    });
                }
            });
        }else{
            Header.cleanUpByID(divCont,"show-remove-item-XiconDiv");
        }
        
        
    };


   
    removeElement({target,idValues,selRowCol}:{
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType

    }):Promise<{getEleIds:idValueType[],ele:element_selType|undefined}>{
        const eleId=target.id;
        let ele_:element_selType={} as element_selType;
        const {colId,rowId,selectorId}=selRowCol;
        this._modSelector.selectors=this._modSelector.selectors.map(sel=>{
                if(sel.eleId===selectorId){
                    const {rows}=this._modSelector.checkGetRows({select:sel});
                    rows.map(row=>{
                        if(row.eleId===rowId){
                            row.cols.map(col=>{
                                if(col.eleId===colId){
                                    col.elements.map((ele,index)=>{
                                        if(ele.eleId ===eleId){
                                            ele_=ele;
                                            col.elements.splice(index,1);
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
       
        const getEleIds:idValueType[]=[]
        idValues.map((kat,ind)=>{
            if(kat && kat.eleId===eleId){
                getEleIds.push(kat)
                idValues.splice(ind,1);
            }
        });
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        this._modSelector.dataset.idValues=idValues;
        return Promise.resolve({getEleIds,ele:ele_}) as Promise<{getEleIds:idValueType[],ele:element_selType|undefined}>;
    };


     imgRound({col,attr,idValues,selRowCol}:{col:HTMLElement,attr:string,idValues:idValueType[],selRowCol:selRowColType}){
        const childs=([...col.children as any] as HTMLElement[]);
        childs.map(async(child)=>{
            const {isJSON}=Header.checkJson(child.getAttribute("flex"));
            if(child.nodeName==="IMG" && isJSON){
                Header.rmAttributes({target:child,cssStyleRm:{borderRadius:"50%"}});
                child.classList.toggle(attr);
                await this.updateElement({target:child,idValues,selRowCol});
            }else if(child){
                ([...child.children as any] as HTMLElement[]).map(async(ch)=>{
                    const {isJSON}=Header.checkJson(ch.getAttribute("flex"));
                    if(ch && isJSON ){
                        Header.rmAttributes({target:child,cssStyleRm:{borderRadius:"50%"}});
                        ch.classList.toggle(attr);
                        await this.updateElement({target:ch,idValues,selRowCol});
                    }
                });
            }
        });
    };


    adjustImgSize({col,idValues,selRowCol}:{col:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
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
                       
                        await this.updateElement({target:img,idValues,selRowCol});
                    }else if(isActive && ch){
                        //second level
                        const check2=([...ch.children as any] as HTMLElement[]).map((chl)=>(chl.nodeName)).includes("IMG");
                        if(check2){
                            ([...ch.children as any] as HTMLElement[]).map(async(chl)=>{
                                if(chl){
                                    const width=`${value}px`;
                                    const img=chl as HTMLImageElement;
                                    Header.addAttributes({target:chl,cssStyleAdd:{width:width,height:width,maxWidth:"none",maxHeight:"none"}});
                                    await this.updateElement({target:img,idValues,selRowCol});
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
    };



    async updateColumn({target,idValues,selRowCol}:{target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}): Promise<{target:HTMLElement,col:colType|undefined,idValues:idValueType[]}|undefined>{
        const eleId=target.id;
        let colEle:colType|undefined;
        const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
        const imgKey=getImgKey?.attValue ||undefined;
        const {selectorId,rowId,colId}=selRowCol;
        const isCol=eleId===colId;
        if(!isCol){
            Misc.message({parent:target,msg:"!!TARGET IS NOT COLID,,,,canceling update",type_:"error",time:1200});
            return;
        }else{
    
            this._modSelector.selectors=this._modSelector.selectors.map((select)=>{
                if(select.eleId===selectorId){
                    const {rows}=this._modSelector.checkGetRows({select});
                    const newRows=rows.map((row)=>{
                        if(row.eleId===rowId){
                            row.cols.map((_col_)=>{
                                if(_col_.eleId===eleId){
                                    _col_.class=target.className;
                                    _col_.cssText=target.style.cssText;
                                    _col_.imgKey=imgKey;
                                    //LOADING ELEMENT 
                                    //REPOPULATING TARGET
                                    idValues=this._modSelector.datasetSincUpdate({target,ele:_col_,idValues,level:"col",loc:"flexbox"});
                                   
                                    const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                                    const testAttr=attrEnumArrTest(_col_);
                                    const testType=typeEnumArrTest(_col_);
                                    getEleIds.map(kat=>{
                                        if(kat.attValue){
                                            if(testAttr && kat.id===testAttr.id ){
                                                _col_.attr=kat.attValue
                                            }else if(testType && kat.id===testType.id ){
                                                _col_.type=kat.attValue
                                            }else if(kat.id==="imgKey"){
                                                _col_.imgKey=kat.attValue
                                            }
                                        }
                                    });
                                }
                                colEle=_col_;
                                return _col_;
                            });
                        }
                        return row;
                    });
                    select.rows=JSON.stringify(newRows);
                }
                return select;
            });
            this._modSelector.localStore({blog:this._modSelector.blog});
        }
        //RE-POPULATING TARGET WITH NEW COLLECTED ATTRIBUTES
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        this._modSelector.dataset.idValues=idValues;
        //RE-POPULATING TARGET WITH NEW COLLECTED ATTRIBUTES
        return Promise.resolve({target,col:colEle,idValues}) as Promise<{target:HTMLElement,col:colType|undefined,idValues:idValueType[]}|undefined>;
        
    };



    flexColAdjustments({target,class_,idValues,selRowCol}:{target:HTMLElement,class_:string,idValues:idValueType[],selRowCol:selRowColType}){
        //THIS CHANGES FLEX PARTITION (ie;flex:1 1 25%,,,50%,,,75%)
        const row=target.parentElement as HTMLElement;
        if(!row) return;
        const eleId=target.id;
        const cols=([...row.children as any] as HTMLElement[]) as HTMLElement[];
        const colLen=cols.length;
        const rowManipClasses=["flex-double","flex-quarter","flex-default","flex-static"]
        const checkRowManipulation=rowManipClasses.includes(class_);
        const colClasses=([...target.classList as any] as string[]);
        colClasses.map(cl=>{
            if(cl){
                const findFlex=cl.includes("flex") || null;
                if(findFlex){
                    target.classList.remove(cl);
                    //initializing
                };
               
            }
        });
        
        if(checkRowManipulation && colLen>1){
            //INITIALIZING
            [...cols].map((col,index)=>{
                if(col){
                    for(const key of Object.keys(target.style)){
                        const check=["justifyContent","alignItems","display","flex"].includes(key);
                        if(check){
                            target.style[key]="";
                        }
                    }
                    const colClasses=([...col.classList as any] as string[]);
                    const rowManip=colClasses.find(cl=>(rowManipClasses.includes(cl)))
                    const findFlex=colClasses.find(cl=>(cl.includes("flex")));
                    const findClass=colClasses.find(cl=>(cl.includes("col-")));
                    if(findFlex || findClass || rowManip){
                       if(findFlex) col.classList.remove(findFlex);
                       if(findClass) col.classList.remove(findClass);
                       if(rowManip) col.classList.remove(rowManip);
                    };
                }
            });
            //INITIALIZING
           [...cols].map((col,index)=>{
            if(col){
                
                if(class_==="flex-double"){
                    if(col.id===target.id){
                        col.classList.add(class_);
                        col.classList.add("col-md-8");
                        col.style.flex="1 0 75%";
                    }else{
                        col.style.flex="1 0 25%";
                        col.classList.add("col-md-4");
                        col.classList.add("flex-quarter");
                    }
                }else if(class_==="flex-quarter"){
                    if(col.id===target.id){
                        col.classList.add(class_);
                        col.classList.add("col-md-4");
                        col.style.flex="1 0 25%";
                    }else{
                        col.classList.add("flex-double");
                        col.classList.add("col-md-8");
                        col.style.flex="1 0 75%";
                    }
                }else if(class_==="flex-static"){
                    col.classList.add(class_);
                    const flex=`1 0 ${100/colLen}%`;
                    col.classList.add(`col-md-${12/colLen}`);
                    col.style.flex=flex;
                }else{
                    col.classList.add(class_);
                    col.classList.add(`col-md-${12/colLen}`);
                };
              
                const selRowCol_={...selRowCol,colId:col.id};
                this.updateColumn({target:col,idValues,selRowCol:selRowCol_});
            };
           });
         

        };
        
        
        //initializing
        const idValue:idValueType={eleId,id:"cssStyle",attValue:class_};
        this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
        
    };
    
    

     deleteSelector({mainHeader,target}:{mainHeader:HTMLElement,target:HTMLElement}){
        //TARGET TO BE REMOVED!!
        const iconDiv=document.createElement("div");
        iconDiv.id="header-delete-effect";
        iconDiv.className="";
        iconDiv.setAttribute("is-icon","true");
        iconDiv.style.cssText="position:absolute;top:0px;right:10px;font-size:26px;transform.translate(0px,-13px);background:black;color:white;border-radius:50%;z-index:400;";
        const cssStyle={background:"inherit",fontSize:"inherit"}
        FaCreate({parent:iconDiv,name:FaCrosshairs,cssStyle});
        target.appendChild(iconDiv);
       
        iconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                const sel=this._modSelector.selectors.find(sel=>(sel.eleId===target.id));
                if(sel){
                    const arr= Header.getImgKeys({selector:sel});
                       arr.map(item=>{
                        if(item){
                            this._service.adminImagemark(item.imgKey).then(async(res)=>{
                                if(res && parent){
                                    Misc.message({parent:mainHeader,msg:`${item.imgKey} is deleted`,type_:"success",time:400});
                                }
                            });
                        }
                       });

                }
                Header.removeTarget(mainHeader,target)//effect and removes target
                this._modSelector.selectors=this._modSelector.selectors.filter(sel=>(sel.eleId !==target.id));

            }
        });
       
     };


    static removePopup({parent,target,position}:{parent:HTMLElement,target:HTMLElement,position:"left"|"right"}){
            const xDiv=document.createElement("div");
            xDiv.id="removePopup-popup";
            const css_row="display:flex;justify-content:center;align-items:center;"
            xDiv.style.cssText=css_row + `position:absolute;top:0%;${position}:0%;border-radius:50%;background-color:black;color:white;`;
            if(position==="right"){
                xDiv.style.transform="translate(-3px,3px)";
            }else{
                xDiv.style.transform="translate(3px,3px)";
            }
            FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",borderRadius:"50%"}});
            target.appendChild(xDiv);
            xDiv.onclick=(e:MouseEvent)=>{
                if(!e) return;
                Misc.growOut({anchor:target,scale:0,opacity:0,time:400});
                setTimeout(()=>{parent.removeChild(target)},390);
            };
     };



     static getImgKeysIdValues({selector,idValues,selRowCol}:{selector:selectorType,idValues:idValueType[],selRowCol:selRowColType}):{targetName:string,imgKey:string}[]{
        const arr:{targetName:string,imgKey:string}[]=[] as {targetName:string,imgKey:string}[];
        const rows=JSON.parse(selector.rows) as rowType[];
        const {selectorId,rowId,colId}=selRowCol
        idValues.map(kat=>{
            if(kat.eleId===selectorId && kat.id==="imgKey"){
                arr.push({targetName:kat.eleId,imgKey:kat.attValue});
            }else if(kat.eleId===rowId && kat.id==="imgKey"){
                arr.push({targetName:kat.eleId,imgKey:kat.attValue});
            }else if(kat.eleId===colId && kat.id==="imgKey"){
                arr.push({targetName:kat.eleId,imgKey:kat.attValue});
            }else{

                rows.map(row=>{
                    if(row){
                        row.cols.map(col=>{
                            if(col){
                                col.elements.map(ele=>{
                                    if(ele){
                                        if(ele.eleId===kat.eleId && kat.id==="imgKey"){
                                            arr.push({targetName:kat.eleId,imgKey:kat.attValue});
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        return arr
    };


     static getImgKeys({selector}:{selector:selectorType}):{targetName:string,imgKey:string}[]{
        const arr:{targetName:string,imgKey:string}[]=[] as {targetName:string,imgKey:string}[];
        const rows=JSON.parse(selector.rows) as rowType[];
            rows.map(row=>{
                if(row?.imgKey){
                    arr.push({targetName:row.eleId,imgKey:row.imgKey});
                }else if(row){
                    row.cols.map(col=>{
                        if( col?.imgKey){
                            arr.push({targetName:col.eleId,imgKey:col.imgKey});
                        }else if(col){
                            col.elements.map(ele=>{
                                if(ele?.imgKey){
                                    arr.push({targetName:col.eleId,imgKey:ele.imgKey});
                                }
                            });
                        }
                    });
                }
            });
        return arr
    };;


    static removeTarget(parent:HTMLElement,target:HTMLElement){
        //TARGET TO BE REMOVED!!
        target.animate([
            {transform:"scale(1) translate(0%,0%)",opacity:"1"},
            {transform:"scale(0.2) translate(-100%,-100%)",opacity:"0"},
        ],{duration:760,iterations:1});
        setTimeout(()=>{
            parent.removeChild(target);
        },700);
       
     };


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
     };


     static growIn(target:HTMLElement){
        target.animate([
            {transform:"translate(-50%,-50%) scale(0)"},
            {transform:"translate(0%,0%) scale(1)"},
        ],{duration:750,iterations:1});
     };


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
     };


     static cleanUp(parent:HTMLElement){
        if(parent?.firstChild){

            while(parent.firstChild){
                if(parent.lastChild){
                parent.removeChild(parent.lastChild as ChildNode)
                }
            }
        }
     };


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
     };


     static checkJson=(checkStr:string | null):{parsed:object|null,isJSON:boolean}=>{
        const str=checkStr;
        const lftBracket=/\{/g;
        const rghtBracket=/\}/g;
        if(str){
            const testLeft=lftBracket.test(str);
            const testRight=rghtBracket.test(str);
            if(testLeft && testRight){

                const matchLeft=str.match(lftBracket) as any;
                const matchRight=str.match(rghtBracket) as any;
                const start=matchLeft.index + 1;
                const end=matchRight.index ;
                const content=str.slice(start,end);
                const len=content.split("").length
                if(len>0){
                    const result=JSON.parse(str) as any;
                    return {parsed:result,isJSON:true};

                }
            }

        }
        return {parsed:null,isJSON:false};
    };


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
    };


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
    };


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
    };


    static detectImageEffect(target:HTMLElement):void{
        
        const check=target.nodeName==="IMG" ;
        if(check)return  Misc.blurIn({anchor:target,blur:"20px",time:900});
     
        for(const key of Object.keys(target.style)){
            if(key==="backgroundImg"){
                return Misc.blurIn({anchor:target,blur:"20px",time:900});
            }
        }
        

    };

   static calcColBootStrapClassFlex({top,bot}:{top:number,bot:number}):{
        top:{topClass:string,flexTop:string},
        bot:{botClass:string,flexBot:string}
    }{
        let topClass="";
        let flexTop=""
        let botClass="";
        let flexBot=""
        if(top>0){
            const outOf12Top=12/top;
            topClass=`col-md-${outOf12Top}`;
            flexTop=`1 0 ${top*10}`
        };
        if(bot>0){
            const outOf12Bot=12/bot;
            botClass=`col-md-${outOf12Bot}`;
            flexBot=`1 0 ${bot*10}`
        }

        return {top:{topClass,flexTop},bot:{botClass,flexBot}}
     };


     static  returnBackgroundUrl(css:string):{start:number,str:string,end:number}|undefined{
        let cssArr:string[]=[];
        let obj:{start:number,str:string,end:number}={start:0,str:"",end:0};
        const startReg:RegExp=/(background-image:url\()/;
        if(startReg.test(css)){
            cssArr=css.split(";");
            cssArr.map(keyValue=>{
                if(!keyValue)return;
                const endReg:RegExp=/\)/;
                const startMatch=RegExp(startReg).exec(keyValue);
                const endMatch=RegExp(endReg).exec(keyValue);
                if(startMatch && endMatch){
                    const start=startMatch.index+startMatch[0].length;
                    const end=endMatch.index;
                    const middle=keyValue.slice(start,end);
                    obj={start,str:middle,end}

                }
                
            });
            return obj
        };
        
    };


     


};//end

export default Header;
export const removeTarget=Header.removeTarget;
export const headCleanClass=Header.cleanClass;
export const headgrowIn=Header.growIn;
export const calcColBootStrapClassFlex=Header.calcColBootStrapClassFlex;
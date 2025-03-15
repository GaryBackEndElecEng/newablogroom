import {flexType,elementType,colType,rowType,selectorType,element_selType, choiceType, iconType, focusOptions, deletedImgType,flexSelectorType, arrDivContType} from "./Types";
import ModSelector from "./modSelector";
import Service from "@/components/common/services";
import Misc from "@/components/common/misc";
import Main from "./main";
import { FaCreate } from "../common/ReactIcons";
import { FaCrosshairs, FaTrash } from "react-icons/fa";
import Edit from "./edit";
import User from "../user/userMain";
import { btnReturnDisableType, buttonRetDisable} from "../common/tsFunctions";
import Header from "./header";
import { getErrorMessage } from "@/lib/errorBoundaries";
import ShapeOutside from "./shapeOutside";
import Dataset from "../common/dataset";
import {  idValueType, selRowColType, selRowType, typeEnumType } from "@/lib/attributeTypes";
import { attrEnumArr, attrEnumArrTest, typeEnumArr, typeEnumArrTest } from "../common/lists";

import Nav from "../nav/headerNav";



const baseUrl="http://localhost:3000";

class Flexbox {

phone:string="./images/phone.png";
link:string="./images/link.png";
mail:string="./images/mail.png";
bgColor:string;
btnColor:string;
logo:string=baseUrl + "/images/gb_logo.png";
_elements:elementType[]=[];
_selectors:selectorType[]=[];
_cols:colType[]=[];
_col:colType={} as colType;
_row:rowType={} as rowType;
_rows:rowType[]=[];
flex:flexType;
_element_sel:element_selType;
divCont_css:string;
divCont_class:string;
static selectors_:flexSelectorType[]=[
    {
        id:1,
        eleId:"",
        placement:0,
        name:"1 X 2",
        image:"/images/flex.png",
        class:"",
        cssText:"",
        inner_html:"",
        rowNum:1,
        colNum:2,
        colAttr:[{id:0,selector_id:1,T:2,B:0}],
        rows:"",
        blog_id:0,
        header:false,
        footer:false,
    },
    {
        id:2,
        eleId:"",
        placement:0,
        name:"1 X 1,2 X 2",
        image:"/images/flex1.png",
        class:"",
        cssText:"",
        inner_html:"",
        rowNum:2,
        colNum:3,
        colAttr:[{id:1,selector_id:1,T:1,B:2}],
        rows:"",
        blog_id:0,
        header:false,
        footer:false,
    },
    {
        id:3,
        eleId:"",
        placement:0,
        name:"1 X 2, 2 X 1",
        image:"/images/flex2.png",
        class:"",
        cssText:"",
        inner_html:"",
        rowNum:2,
        colNum:3,
        colAttr:[{id:2,selector_id:3,T:2,B:1}],
        rows:"",
        blog_id:0,
        header:false,
        footer:false,
    },
    {
        id:4,
        eleId:"",
        placement:0,
        name:"2 X 2",
        image:"/images/flex3.png",
        class:"",
        cssText:"",
        inner_html:"",
        rowNum:2,
        colNum:4,
        colAttr:[{id:3,selector_id:4,T:2,B:2}],
        rows:"",
        blog_id:0,
        header:false,
        footer:false,
    },
    {
        id:5,
        eleId:"",
        placement:0,
        name:"2 X 4",
        image:"/images/flex4.png",
        class:"",
        cssText:"",
        inner_html:"",
        rowNum:2,
        colNum:8,
        colAttr:[{id:4,selector_id:5,T:4,B:4}],
        rows:"",
        blog_id:0,
        header:false,
        footer:false,
    },
    {
        id:6,
        eleId:"",
        placement:0,
        name:"1 X 3, 2 X 1",
        image:"/images/flex5.png",
        class:"",
        cssText:"",
        inner_html:"",
        rowNum:2,
        colNum:4,
        colAttr:[{id:5,selector_id:6,T:3,B:1}],
        rows:"",
        header:false,
        footer:false,
        blog_id:0
    },
    {
        id:7,
        eleId:"",
        placement:0,
        name:"1 X 3, 2 X 1",
        image:"/images/flex5.png",
        class:"",
        cssText:"",
        inner_html:"",
        rowNum:2,
        colNum:4,
        colAttr:[{id:6,selector_id:7,T:3,B:1}],
        rows:"",
        blog_id:0,
        header:false,
        footer:false
    },
    ]
static choice:choiceType[]=[
    {name:"select",isEle:false,level:"element"},
    {name:"image",ele:"img",isEle:true,level:"element"},
    {name:"bg-image",isEle:false,level:"col",class_:undefined},
    {name:"bg-row-image",isEle:false,level:"col",class_:undefined},
    {name:"title",ele:"h1",isEle:true,level:"element",class_:undefined},
    {name:"sub title",ele:"h2",isEle:true,level:"element",class_:undefined},
    {name:"inner title",ele:"h3",isEle:true,level:"element",class_:undefined},
    {name:"inner sub title",ele:"h4",isEle:true,level:"element",class_:undefined},
    {name:"h5-small",ele:"h5",isEle:true,level:"element",class_:undefined},
    {name:"h6-small",ele:"h6",isEle:true,level:"element",class_:undefined},
    {name:"text",ele:"p",isEle:true,level:"element",class_:undefined},
    {name:"unorder-list",ele:"ul",isEle:true,level:"element",class_:undefined},
    {name:"order-list",ele:"ol",isEle:true,level:"element",class_:undefined},
    {name:"link",ele:"a",isEle:true,level:"element",class_:undefined},
    {name:"time",ele:"time",isEle:true,level:"element",class_:undefined},
    {name:"quote",ele:"blockquote",isEle:true,level:"element",class_:undefined},
    {name:"shapeOutside",isEle:false,level:"element",class_:undefined},
    {name:"flex-center",isEle:false,class_:"col-center",level:"col"},
    {name:"shadow",isEle:false,class_:"box-shadow-md",level:"col"},
    {name:"bg-shade",isEle:true,level:"col",class_:undefined},
    {name:"flex-end",isEle:false,class_:"col-end",level:"col"},
    {name:"flex-start",isEle:false,class_:"col-start",level:"col"},
    {name:"img-round",isEle:false,class_:"round",level:"element"},
    {name:"set-even-height",isEle:false,class_:"set-even-height",level:"col"},
    {name:"remove-even-height",isEle:false,level:"col"},
    {name:"cleanUp",isEle:true,level:"none"},
    {name:"remove",isEle:true,level:"none"},

];
eleAttrs=["round",];
colAttrs=["col-start","col-end","col-center"];

    constructor(private _modSelector:ModSelector,private _service:Service, private _user:User,public _shapeOutside:ShapeOutside){
        this._element_sel=this._modSelector.initElement_sel
        this.phone="./images/phone.png";
        this.link="./images/link.png";
        this.mail="./images/mail.png";
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this._selectors=this._modSelector.selectors;
        this.flex={} as flexType;
        Flexbox.getPlacement().then(async(value)=>{
            if(value){
                this.placement=parseInt(value);
            }
        });
        this.divCont_css="display:flex;align-items:center;justify-content:center;flex-direction:column;padding:0.5rem;border-radius:12px;margin-inline:3rem;padding-inline:1rem;width:100%";
        this.divCont_class="eleContainer";
    }

    //GETTER SETTERS---////////
    get placement(){
        const getPlace=localStorage.getItem("placement");
        if(getPlace){
            return parseInt(getPlace);
        }else{
            localStorage.setItem("placement",String(1));
            return 1;
        }
    }
    set placement(placement:number){
        localStorage.setItem("placement",String(placement));
        this._modSelector.placement=placement;
    }
    get selectors(){
        return this._modSelector.selectors;
    }
    set selectors(selectors:selectorType[]){
        this._modSelector.selectors=selectors;
        this._modSelector.localStore({blog:this._modSelector.blog});

    }
    //GETTER SETTERS---////////
    ///--------------INJECTION INTO EDIT-----WORK DONE DURING REFRESH AND EDIT-------///////////////
   async showSelector(parent:HTMLElement,selector:selectorType,idValues:idValueType[]){
        //THIS IS USED FOR REFRESH 
        const selNode=selector.name
        const innerCont=document.createElement(selNode);
        Header.cleanUpByID(parent,"section#main");
        if(selector.name){
            innerCont.id=selector.eleId;
            const eleId=selector.eleId;
            innerCont.className=selector.class;
            innerCont.setAttribute("data-placement",`${selector.placement}`);
            innerCont.setAttribute("name",selector.name);
            innerCont.setAttribute("data-selector-id",`${selector.id}`);
                innerCont.setAttribute("data-container-id",`${innerCont.id}`);
            innerCont.setAttribute("data-selector-id",selector.eleId);
            innerCont.setAttribute("is-selector","true");
            // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
            Main.container=document.querySelector("section#main") as HTMLElement;
            const checkBgShade=([...(Main.container as HTMLElement).classList as any] as string[]).includes("bgShade");
            if(checkBgShade){
                innerCont.classList.add("background-bgShade");
            }
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
            idValues.push({eleId:selector.eleId,id:"selector_id",attValue:String(selector.id)});
            idValues.push({eleId:selector.eleId,id:"selectorId",attValue:selector.eleId});
            idValues.push({eleId:selector.eleId,id:"placement",attValue:String(selector.placement)});
             //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
             const {idValues:retIdValues4}=this._modSelector.dataset.coreDefaultIdValues({
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
            idValues=retIdValues4
            this._modSelector.dataset.populateElement({target:innerCont,selRowColEle:selector,level:"selector",loc:"flexbox",idValues,clean:false});
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:selector.eleId});
            const getEleIds=idValues.filter(kat=>(kat.eleId===eleId))
           this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
            
            //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
           
            Misc.blurIn({anchor:innerCont,blur:"20px",time:700});
            // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
      
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
            innerCont.style.cssText=selector.cssText;
            
          
            const {rows}=this._modSelector.checkGetRows({select:selector});
            if(rows){

                await  Promise.all(rows.toSorted((a,b)=>{if(a.order < b.order) return -1;return 1}).map(async(row_,index)=>{
                    const eleId=row_.eleId
                    idValues.push({eleId:row_.eleId,id:"rowId",attValue:row_.eleId});
                    idValues.push({eleId:row_.eleId,id:"name",attValue:row_.name});
                    idValues.push({eleId:row_.eleId,id:"row_id",attValue:String(row_.id)});
                    idValues.push({eleId:row_.eleId,id:"rowOrder",attValue:String(row_.order)});
                    idValues.push({eleId:row_.eleId,id:"placement",attValue:String(selector.placement)});
                    if(row_.attr) idValues.push({eleId:row_.eleId,id:"backgroundImg",attValue:"true"});
                    if(row_.imgKey) idValues.push({eleId:row_.eleId,id:"imgKey",attValue:row_.imgKey});
                 
                    const row=document.createElement("div");
                    row.className=row_.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                    row.style.cssText=row_.cssText;
                    row.id=row_.eleId;
                    //REMOVES BLOB URLS
                    console.log(row_.cssText);
                    await this._modSelector.removeBlob({target:row,rowColEle:row_,loc:"flexbox",level:"row",idValues});
                    //REMOVES BLOB URLS
                     
                     //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
                    const {idValues:retIdValues4}=this._modSelector.dataset.coreDefaultIdValues({
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
                    idValues=retIdValues4
                    this._modSelector.dataset.populateElement({target:row,selRowColEle:row_,level:"row",loc:"flexbox",idValues,clean:false});
                    idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:row_.eleId});
                   
                    const getEleIds=idValues.filter(kat=>(kat.eleId===eleId))
                    this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
                    //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
                    Header.detectImageEffect(row);
                   //APPENDING ROW
                   innerCont.appendChild(row);
                   //APPENDING ROW
                    await Promise.all(row_?.cols.toSorted((a,b)=>{if(a.order < b.order) return -1;return 1}).map(async(col_,index1)=>{
                     this.generateColumn({row,row_,sel:selector,idValues,col_}).then(async(cres)=>{
                            if(cres){
                               await Promise.all(cres.col_.elements.map(async(element)=>{
                                    await this.generateElement({col:cres.col,element,sel:selector,row_,col_:cres.col_,idValues:cres.idValues}).then(async(eres)=>{
                                        if(eres){
                                            const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row_.eleId,colId:col_.eleId}
                                            eres.col.appendChild(eres.ele);
                                            if(eres.isEdit){
                                                this.editElement({target:eres.ele,idValues:eres.idValues,selRowCol})
                                            };
                                            eres.divCont.onclick=(e:MouseEvent)=>{
                                                if(e){
                                                    eres.divCont.classList.toggle("isActive");
                                                    eres.ele.classList.toggle("isActive");
                                                    Main.activatebuttons({target:eres.ele});
                                                    this.removeMainElement({parent:eres.col,target:eres.ele,divCont:eres.divCont,idValues,selRowCol})
                                                }
                                            }
                                            
                                        }
                                    });
                                }));
                            }
                     });
                    
                    
                       
                    }));
                    
                
                }));
            };

            this.removeFlexBox({parent,target:innerCont,idValues});
        };
        return innerCont
    };


   async generateColumn({row,col_,idValues,row_,sel}:{
    row:HTMLElement,
    idValues:idValueType[],
    col_:colType,
    row_:rowType,
    sel:selectorType

   }):Promise<{row:HTMLElement,col_:colType,idValues:idValueType[],row_:rowType,sel:selectorType,col:HTMLElement}>{
        
        const eleId=col_.eleId;
        idValues.push({eleId:col_.eleId,id:"colId",attValue:col_.eleId});
        idValues.push({eleId:col_.eleId,id:"name",attValue:col_.name});
        idValues.push({eleId:col_.eleId,id:"col_id",attValue:String(col_.id)});
        idValues.push({eleId:col_.eleId,id:"colOrder",attValue:String(col_.order)});
        if(col_.attr) idValues.push({eleId:col_.eleId,id:"backgroundImg",attValue:"true"});
        
        idValues.push({eleId:col_.eleId,id:"colOrder",attValue:String(col_.order)});
            const col=document.createElement("div");
            col.id=col_.eleId;
            col.style.cssText=`${col_.cssText}`;
            await this._modSelector.removeBlob({target:col,rowColEle:col_,loc:"flexbox",level:"col",idValues});
                //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
            const {idValues:retIdValues4}=this._modSelector.dataset.coreDefaultIdValues({
                target:col,
                sel:sel,
                row:row_,
                col:col_,
                ele:null,
                idValues,
                loc:"flexbox",
                level:"col",
                clean:false
            });
            idValues=retIdValues4
            this._modSelector.dataset.populateElement({target:col,selRowColEle:col_,level:"col",loc:"flexbox",idValues,clean:false});
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:col_.eleId});
            const getEleIds=idValues.filter(kat=>(kat.eleId===eleId))
            this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
            //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
            col.className=col_.class;
            col.style.cssText=col_.cssText;
            
            Header.detectImageEffect(col);
            
            //APPENDING COL
            row.appendChild(col);
            //APPENDING COL
            
            this.genChoice({
                column:col,
                idValues,
                row:row_,
                selector:sel,
                col:col_
            });
            col.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    col.classList.toggle("coliIsActive");
                }
            });

        return Promise.resolve({row,col,col_,idValues,row_,sel}) as Promise<{row:HTMLElement,col_:colType,idValues:idValueType[],row_:rowType,sel:selectorType,col:HTMLElement}>;
    };


    async generateElement({col,element,sel,row_,col_,idValues}:{
        col:HTMLElement,
        element:element_selType,
        sel:selectorType,
        row_:rowType,
        col_:colType,
        idValues:idValueType[]

    }): Promise<{
        ele: HTMLElement;
        divCont: HTMLElement;
        element: element_selType;
        col:HTMLElement;
        isEdit:boolean;
        idValues:idValueType[];
} | undefined>{
        const selRowCol:selRowColType={selectorId:sel.eleId,rowId:row_.eleId,colId:col_.eleId};
        const rand=Math.floor(Math.random() *1000);
        const eleId=element.eleId;
        const attrTest=attrEnumArrTest(element);
        const typeTest=typeEnumArrTest(element);
        const link = attrTest && attrTest.id==="link" ? attrTest.value:undefined;
        const email = attrTest && attrTest.id==="email" ? attrTest.value:undefined;
        const tel = attrTest && attrTest.id==="tel" ? attrTest.value:undefined;
        const time = attrTest && attrTest.id==="time" ? attrTest.value:undefined;
        const isCircle = attrTest && attrTest.id==="shapeOutsideCircle" ? attrTest.value:undefined;
        const isSquare = attrTest && attrTest.id==="shapeOutsideSquare" ? attrTest.value:undefined;
        const isPolygon = attrTest && attrTest.id==="shapeOutsidePolygon" ? attrTest.value:undefined;
        const shapeOutside = typeTest && typeTest.id==="shapeOutside" ? typeTest.value:undefined;
        if(isCircle) idValues.push({eleId,id:"shapeOutsideCircle",attValue:isCircle});
        if(isSquare) idValues.push({eleId,id:"shapeOutsideSquare",attValue:isSquare});
        if(isPolygon) idValues.push({eleId,id:"shapeOutsidePolygon",attValue:isPolygon});
        const divCont=document.createElement("div");
        divCont.setAttribute("data-placement",`${element.order}-A`);
        divCont.className=this.divCont_class;
        divCont.id=`flexbox-divCont-${element.name}-${rand}`;
        divCont.style.cssText=this.divCont_css;
        const target:HTMLElement=document.createElement(element.name);
        target.id=element.eleId;
        target.className=element.class;
        target.style.cssText=element.cssText;
        target.innerHTML=element.inner_html;
        //REMOVES BLOB URLS
        await this._modSelector.removeBlob({target,rowColEle:element,loc:"flexbox",level:"element",idValues});
        //REMOVES BLOB URLS

            //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
        const {idValues:retIdValues4}=this._modSelector.dataset.coreDefaultIdValues({
            target,
            sel,
            row:row_,
            col:col_,
            ele:element,
            idValues,
            loc:"flexbox",
            level:"element",
            clean:false
        });
        idValues=retIdValues4
        
        this._modSelector.dataset.populateElement({target,selRowColEle:element,level:"element",loc:"flexbox",idValues,clean:false});
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:element.eleId});
        
        //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
        
        const checkArr=["img","ul","ol","blockquote","a","span","logo","image","time"].includes(element.name);
        const checkUlType=["ol","ul","blockquote"].includes(element.name);

        if(!checkArr && !shapeOutside ){
            
            if(element.attr==="data-backgroundImg" && element.imgKey){
                idValues.push({eleId,id:"backgroundImg",attValue:"backgroundImg"});
                target.setAttribute("data-backgroundImg","true");
                target.style.backgroundPosition="50% 50%";
                target.style.backgroundSize="100% 100%";
             
            }
            
            divCont.setAttribute("data-placement",`${element.order}-A`);
            
            divCont.appendChild(target);
            Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
            Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
            return {ele:target,divCont,element,col,isEdit:true,idValues};
            
        }else if(!checkArr && shapeOutside){
            divCont.style.marginBlock="2rem";
            divCont.style.paddingBlock="1rem";
            
            const arrDivCont:arrDivContType= this._shapeOutside.showShapeOutside({parent:col,element,idValues,selRowCol});
            const {divCont:SHDivCont,target:SHTarget}=arrDivCont
            return {ele:SHTarget,divCont:SHDivCont,element,col,isEdit:false,idValues};

        }else if(checkUlType){
    
            target.id=element.eleId;
            target.className=element.class;
            target.classList.remove("isActive");
            target.style.cssText=element.cssText;
            target.innerHTML=element.inner_html;
            divCont.appendChild(target);
            Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
            Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
        

            return {ele:target,divCont,element,col,isEdit:true,idValues}

        }else if(checkArr && element.name==="a"){
            target.className=element.class;
            target.id=element.eleId;
            target.style.cssText=element.cssText;
            Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
            Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
    
            divCont.appendChild(target);

            if(link) target.onclick=()=>{window.open(link,"_blank")};
            if(email) (target as HTMLAnchorElement).href=email;
            if(tel) (target as HTMLAnchorElement).href=tel;

            return {ele:target,divCont,element,col,isEdit:true,idValues};

        }else if(checkArr && element.name==="time"){
    
            target.id=element.eleId;
            target.className=element.class;
            target.style.cssText=element.cssText;
            target.innerHTML=element.inner_html;
            if(time) target.setAttribute("data-time",time);
            divCont.appendChild(target);
            Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
            Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
        
        
            return {ele:target,divCont,element,col,isEdit:false,idValues}

        }else if(element.name==="img"){
       
       
            target.setAttribute("contenteditable","false");
            (target as HTMLImageElement).alt=element.inner_html;
            (target as HTMLImageElement).src=element.img ? element.img : this.logo;
            if(element.imgKey){
                idValues.push({eleId,id:"imgKey",attValue:element.imgKey});
                const res=await this._service.getSimpleImg(element.imgKey);
                if(res){
                    (target as HTMLImageElement).src=res.img;
                    (target as HTMLImageElement).alt=res.Key;
                }
                
            }
            target.style.cssText=element.cssText;
            target.className=element.class;
            divCont.appendChild(target);
         
            Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
            Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
            Header.detectImageEffect(target);
            this._user.refreshImageShow({parent:divCont,image:(target as HTMLImageElement),formdata:null,selRowCol,idValues});

            return {ele:target,divCont,element,col,isEdit:false,idValues}
        }

    };

    ///--------------INJECTION INTO EDIT-----WORK DONE-------///////////////
     //SIDEBAR=>PARENT FLEXBOXLAYOUT()-FROM SIDEBAR
    async rowColGenerator(parent:HTMLElement,selector:selectorType){
        //PARENT =>THIS.TEXTAREA
        let idValues=this._modSelector.dataset.idValues;
        const less900=window.innerWidth < 900;
        parent.classList.add("mx-2");
        const container=document.createElement("section");
        const rand=`${container.nodeName.toLowerCase()}-${Math.round(Math.random()*1000)}`
        container.id=`flexbox-selector-${rand}`;
        container.className="mx-auto";
        container.style.cssText="padding-inline:10px;position:relative;width:100%;";
        container.setAttribute("name","section");
        container.setAttribute("is-selector","true");
        container.setAttribute("data-placement",`${this.placement}`);
        const arrRow=Array.from(Array(selector.rowNum).keys());
        const arrColT=Array.from(Array(selector.colAttr[0].T).keys());
        const arrColB=Array.from(Array(selector.colAttr[0].B).keys());
        const numTop=this.colGenerator(arrColT.length);
        const numBot=this.colGenerator(arrColB.length);
      
        //FOR COLUMNS CLASS (col-container),attribute: data-cols
        const bottom_data_cols=(less900 && arrColB.length && arrColB.length >0) ? `1 0 100%`:`1 0 ${100/(arrColB.length as number)}%`;
        const top_data_cols=(less900 && arrColT.length && arrColT.length >0) ? `1 0 100%`:`1 0 ${100/(arrColT.length as number)}%`;
        container.setAttribute("data-selector-id",`${selector.id}`);
        container.setAttribute("is-flexbox","true");
        selector.eleId=container.id;
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
        Main.container=document.querySelector("section#main") as HTMLElement;
        const checkBgShade=([...(Main.container as HTMLElement).classList as any] as string[]).includes("bgShade");
        if(checkBgShade){
            container.classList.add("background-bgShade");
        }
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
       await this.selectorAdder({target:container,selector:selector,idValues}).then(async(sel)=>{
            if(sel){
                idValues=sel.idValues
               
               await Promise.all(arrRow.map(async( orderRow)=>{
                    const rand=Math.round(Math.random()*1000);
                    const row=document.createElement("div");
                    row.id=`flexbox-row-${orderRow}-${rand}`;
                    const eleId=row.id;
                    row.className=" row mx-auto jusifiy-content-start flexbox-row";
                    row.style.cssText="margin-inline:auto;margin-block:2rem;width:100%;"
                    row.setAttribute("is-row","true");
                    row.style.cssText="width:100%;min-height:10vh;position:relative;min-width:50vw;justify-content:flex-start;";
                    const selRow:selRowType={selectorId:sel.selector.eleId,rowId:eleId};
                   idValues.push({eleId,id:"selRow",attValue:JSON.stringify(selRow)});
                   idValues.push({eleId,id:"rowId",attValue:eleId});
                   
                  
                   await this._modSelector.rowAdder({target:row,selector:sel.selector as selectorType,selectEle:sel.target,idValues}).then(async(resRow)=>{
                        if(resRow){
                            idValues=resRow.idValues;
                           
                            if(orderRow===0){
                               await Promise.all(arrColT.map(async(orderCol)=>{
                                    const rand=Math.round(Math.random()*1000);
                                    const col=document.createElement("div");
                                    col.id=`col-div-top-${orderCol}-${rand}`;
                                    col.className=`col-lg-${numTop} flexbox-column`;
                                    col.classList.add("box-shadow");
                                    col.classList.add("col-container");//for attr(data-cols)
                                    // col.setAttribute("data-cols",top_data_cols);//for class:col-container: attr(data-cols)
                                    col.style.cssText="align-items:stretch;";
                                    const eleId=col.id;
                                    idValues.push({eleId,id:"numCols",attValue:`${top_data_cols}`});
                                    idValues.push({eleId,id:"colOrder",attValue:`${orderCol}`});
                                    idValues.push({eleId,id:"rowId",attValue:`${row.id}`});
                                    row.appendChild(col);
                                    // console.log("ROWGENERTOR:AFTER FLEXCOLTRACKER:","flex",flexCol,"COL::",newCol)
                                
                                   await this._modSelector.colAdder({parent:resRow.target,target:col,selector:resRow.sel,row:resRow.rowEle as rowType,idValues}).then(async(resCol)=>{
                                        if(resCol){
                                            idValues=resCol.idValues;
                                           
                                           
                                            this.genChoice({
                                                column:resCol.target,
                                                idValues,
                                                row:resCol.row,
                                                selector:resCol.selector,
                                                col:resCol.col
                                            });
                                            resCol.target.addEventListener("click",(e:MouseEvent)=>{
                                                if(e){
                                                    resCol.target.classList.toggle("coliIsActive");
                                                }
                                            });
                                        }
                                    });
                                    
                                }));
                            }else{
                              
                                await Promise.all(arrColB.map(async(orderColB)=>{
                                    
                                    const col1=document.createElement("div");
                                    col1.id=`col-div-bottom-${orderColB}-${rand}`;
                                    const eleId=col1.id;
                                    col1.className=`col-lg-${numBot} col-container flexbox-column`;
                                    col1.classList.add("col-container");//for attr(data-cols)
                                    col1.setAttribute("data-cols",bottom_data_cols);
                                    idValues.push({eleId,id:"rowId",attValue:`${resRow.target.id}`});
                                    idValues.push({eleId:col1.id,id:"numCols",attValue:`${bottom_data_cols}`});
                                    resRow.target.appendChild(col1);
                                   await this._modSelector.colAdder({parent:resRow.target,target:col1,selector:resRow.sel,row:resRow.rowEle as rowType,idValues}).then(async(resCol1)=>{
                                    if(resCol1 ){
                                        idValues=resCol1.idValues;
                                     
                                        this.genChoice({
                                            column:resCol1.target,
                                            row:resCol1.row,
                                            idValues,
                                            selector:resCol1.selector,
                                            col:resCol1.col
                                        });
                                        resCol1.target.addEventListener("click",(e:MouseEvent)=>{
                                            if(e){
                                                resCol1.target.classList.toggle("coliIsActive");
                                         
                                            }
                                        });
                                    }
                                    }).catch((err)=>console.error(getErrorMessage(err)));
                                    
                                }));
                            }
                        }
                    });
                    
                    if(Edit.isBackgroundImage(row)){
                        row.setAttribute("is-backgroundimage","true");
                    };
                    container.appendChild(row);
                    
                }));
                parent.appendChild(container);
                Misc.fadeIn({anchor:container,xpos:50,ypos:100,time:700});
            };
            //--------------DELETE ICON----------------//
            this.removeFlexBox({parent,target:sel.target,idValues});
            this._modSelector.dataset.idValues=idValues;
            //--------------DELETE ICON--------------//
        }).catch((err)=>{console.error(getErrorMessage(err));});
    }
    //PARENT ROWCOLGENERATOR()=> feeds to Main() appElement +++ others() on Main()
   
   
    
    genChoice({column,idValues,selector,row,col}:{
        column:HTMLElement,
        idValues:idValueType[]
        row:rowType,
        selector:selectorType,
        col:colType
    }){
        Header.cleanUpByID(column,"popup");
        const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId};
        const popup=document.createElement("div");
        popup.classList.add("popup");
        popup.setAttribute("is-popup","true");
        popup.id="popup";
        const small=document.createElement("small");
        small.className="text-primary text-center text-sm";
        small.textContent="select";
        column.classList.add("position-relative");
        popup.className="popup text-center p-1 d-flex flex-column";
        popup.style.cssText="position:absolute;top:0;right:0;transform:translate(12px,-12px);background:white; color:darkblue;z-index:200;";
        const select=document.createElement("select") as HTMLSelectElement;
        select.setAttribute("name","default");
        select.setAttribute("isPopup","true");
        Flexbox.choice.forEach((choice)=>{
            if(choice){
                const option=document.createElement("option") as HTMLOptionElement;
                const choice_:choiceType={ele:choice.ele,isEle:choice.isEle,name:String(choice.name),class_:String(choice.class_),level:choice.level}
                option.value=JSON.stringify(choice_);
                option.textContent=choice.name;
                option.setAttribute("name",choice.name);
                if(choice.isEle){
                    option.style.backgroundColor="#002D62";
                    option.style.color="white";
                }else{
                    option.style.color="black";
                }
                select.appendChild(option);
            }
        });
        popup.appendChild(small);
        popup.appendChild(select);
        column.appendChild(popup);
        select.addEventListener("change",async(e:Event)=>{
            if(e){
               
                const value_=(e.currentTarget as HTMLSelectElement).value
                const {parsed,isJSON}=Header.checkJson(value_)
                const value:choiceType|null=isJSON ? parsed as choiceType : null;
                if(!value) return
                const {ele,isEle,level,class_,name}=value;
                const checkColAttrs=class_ ? this.colAttrs.includes(class_ as string) : false;
                let icon:iconType | undefined;
                let btn:HTMLButtonElement | null;
                
              
                
                if(isEle && ele){
                        const checkEle=["p","h1","h2","h3","h4","h5","h6","span","img","time","blockquote","a","ul","ol"].includes(ele);
                        const checkText=["p","h1","h2","h3","h4","h5","h6","span"].includes(ele);
                        //GOES TO MAIN FOR ELEMENT CREATION
                        if(checkEle){
                            const rand=Math.floor(Math.random()*1000);
                            const divCont=document.createElement("div");
                            this._modSelector.dataset.insertcssClassIntoComponents({target:divCont,level:"element",loc:"flexbox",type:"flexbox",id:"divContId",headerType:undefined});
                            divCont.id=`flexbox-divCont-${rand}`;
                            const target=document.createElement(ele);
                            target.id=`flexbox-${ele}-${rand}`;
                            target.style.cssText="padding-inline:1rem;width:100% !important;position:relative;border-radius:6px;"
                            const eleId=target.id;
                            const selRowCol={selectorId:selector.eleId,rowId:row.eleId,colId:column.id};
                            const strSelRowCol=JSON.stringify(selRowCol);
                            idValues.push({eleId,id:"selRowCol",attValue:strSelRowCol});
                            
                            switch(true){
                                case ele==="img":
                                    icon=Main.icons.find(ico=>(ico.name==="img")) as iconType;
                                    btn=document.querySelector(`button#${icon.name}`) as HTMLButtonElement;
                                    //ADDING IMAGE
                                    this.addImage({
                                        parent:column,
                                        target,
                                        divCont,
                                        btn,
                                        icon,
                                        idValues,
                                        selector,
                                        row,
                                        col

                                    })
                                    
                                return;
                                
                                case checkText :
                                     icon=Main.icons.filter(ico=>(ico.isElement===true)).find(ico=>(ico.name===ele)) as iconType;
                                     btn=document.querySelector(`button#${icon.name}`) as HTMLButtonElement;
                                    this._modSelector.dataset.insertcssClassIntoComponents({
                                        target,level:"element",
                                        headerType:undefined,
                                        id:"para",
                                        loc:"flexbox",
                                        type:"flexbox"

                                    });
                                     if(icon){
                                       await this.appElement({
                                            parent:column,
                                            target,
                                            divCont,
                                            btn,
                                            icon,
                                            idValues,
                                            selector,
                                            row,
                                            col

                                        });
                                        
                                     }
                                return;
                                case ele ==="blockquote":
                                    icon=Main.icons.find(ico=>(ico.name==="blockquote")) as iconType;
                                    
                                     this.createQuote({
                                        parent:column,
                                        target,
                                        divCont,
                                        icon,
                                        idValues,
                                        selector,
                                        row,
                                        col

                                     });
                                     
                                return;
                                case ele ==="a":
                                    icon=Main.icons.find(ico=>(ico.name==="a")) as iconType;
                                    
                                     this.createAnchor({
                                        parent:column,
                                        target,
                                        divCont,
                                        icon,
                                        idValues,
                                        selector,
                                        row,
                                        col

                                     });
                                     
                                return;
                                case ele ==="ul" || ele==="ol":
                                    
                                    btn=document.querySelector(`button#ul`) as HTMLButtonElement;
                                    this.createList({
                                        parent:column,
                                        target,
                                        divCont,
                                        btn,
                                        idValues,
                                       selector,
                                       row,
                                       col

                                    });
                                    
                                return;
                                case ele ==="time":
                                    icon=Main.icons.find(ico=>(ico.name==="time")) as iconType;
                                   
                                    this.insertDateTime({
                                        parent:column,
                                        target,
                                        divCont,
                                        icon,
                                        idValues,
                                       selector,
                                       row,
                                       col

                                    });
                                    
                                return;
                                default:
                                    return;
                            }

                        }

                }else if(!ele){
                    if(level==="col" && class_==="undefined"){
                        const selRow:selRowType={selectorId:selector.eleId,rowId:row.eleId}
                       switch(true){
                           case name ==="bg-shade":
                           icon=Main.icons.find(ico=>(ico.name==="bg-shade")) as iconType;
                           btn=document.querySelector(`button#${icon.name}`) as HTMLButtonElement;
                           this.bgShade({parent:column,btn,sel:selector,row,col,idValues});
                       return;
                       case name==="bg-image":
                           this.bgImage({column,idValues,sel:selector,row,col});
                       return
                       case name==="bg-row-image":
                           this.RowBgImage({column,idValues,selRow});
                       return
                       case checkColAttrs:
                           column.classList.toggle(class_ as string);
                       return
                       case name==="set-even-height":
                          
                           this.setEvenHeight({target:column,idValues,selRowCol});
                       return
                       case name==="remove-even-height":
                           
                           this.removeEvenHeight({target:column,idValues,selRowCol});
                       return
                       
                       default:
                           return;
                       }
                   }else if(level==="element" && name==="shapeOutside"){
                       const selRowCol={selectorId:selector.eleId,rowId:row.eleId,colId:column.id};
                       const rand=Math.floor(Math.random()*1000);
                       const eleId=`flexbox-shape-${rand}`;
                       this._element_sel={...this._element_sel,eleId,id:0,attr:"shapeOutsideCircle",type:"shapeOutside"};;
                       const strSelRowCol=JSON.stringify(selRowCol);
                       idValues.push({eleId,id:"selRowCol",attValue:strSelRowCol});
                       this._shapeOutside.addShapeOutside({parent:column,sel:selector,rowEle:row,colEle:col,element:this._element_sel,idValues})
                   }else if(name==="remove"){
                       column.removeChild(popup);
                   }else if(class_ !=="undefined" && !isEle && class_){
                       column.classList.toggle(class_);
                       const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId};
                      await this.updateColumn({target:column,idValues,selRowCol}).then(async(res)=>{
                       if(res){
                           const col=res.col
                           Misc.message({parent:column,msg:`HERE updated ${col?.eleId}`,type_:"success",time:800});
                       }
                      });
                   }
               }
                }
        });
        
    }
    //PARENT genChoice

   async addClass({column,class_,idValues,selRowCol}:{column:HTMLElement,class_:string,idValues:idValueType[],selRowCol:selRowColType}){
        const eles=column.querySelectorAll(`[is-element].isActive`) as any as HTMLElement[];
        
           await Promise.all(([...eles] as HTMLElement[]).map(async(ele)=>{
                if(ele ){
                    ele.classList.toggle(class_);
                   await this.updateElement({target:ele,idValues,selRowCol}).then(async(res)=>{
                    if(res){
                        const ele=res.ele;
                        console.log("retEle",ele);
                        console.log("target",res.target);
                    }
                });
                }
            }));
        
    }
    fontAction(btn:HTMLButtonElement){
        const getColumns=document.querySelectorAll("[is-column='true']") as any as HTMLElement[];
        ([...getColumns]).map(col=>{
            if(col){
                ([...col.children as any] as HTMLElement[]).map(ele=>{
                    if(ele){
                        const isActive=([...ele.classList as any] as string[]).includes("isActive");
                        if(isActive){
                            ele.classList.toggle(btn.id);
                           
                        }
                    }
                });
            }
        });
    }
  
    checkIsActive(parent:HTMLElement):boolean{
        const check=([...parent.classList as any] as string[]).includes("coliIsActive");
        return check
    }
    //PARENT ADDELEMENT()
    async appElement({parent,target,divCont,btn,icon,idValues,selector,row,col}:{
        parent: HTMLElement,
        target:HTMLElement,
        divCont:HTMLElement,
        btn:HTMLElement|null,
         icon:iconType|undefined,
        idValues:idValueType[],
        selector:selectorType,
        row:rowType,
        col:colType
    }) {
        if(!icon)return;
       
        target.classList.add(icon.display);
        target.classList.add("w-100");
        target.innerHTML = `${icon.name}=>`;
        target.classList.add("box-shadow");
        const eleId=target.id;
        idValues.push({eleId,id:"name",attValue:icon.name});
        divCont.appendChild(target);
        parent.appendChild(divCont);
        Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
        Misc.fadeIn({anchor:divCont,xpos:50,ypos:100,time:600});
        await this.elementAdder({
            target:target,
            selector,
            row,
            col,
            idValues
        }).then(async(res)=>{
            if(res){
                const selRowCol={selectorId:res.selector.eleId,rowId:res.row.eleId,colId:res.col.eleId} as selRowColType;
                const ele=res.ele as unknown as element_selType;
                divCont.setAttribute("data-placement",`${ele.order}-A`);
                
                divCont.onclick=(e: MouseEvent) => {
                    if (e) {
                        res.target.classList.toggle("isActive");
                        divCont.classList.toggle("isActive");
                        const focusOptions: focusOptions = { focusVisible: false, preventScroll: false }
                        res.target.focus(focusOptions);
                       idValues=this.removeMainElement({parent,divCont,target:res.target,idValues,selRowCol});
                    }
                };
                this.editElement({target:res.target,idValues,selRowCol})//pulls flex if exist from target attrubutes
            }
        });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
          
        
    }
    //PARENT ADDELEMENT()
    async addImage({parent,selector,target,divCont,row,col,icon,btn,idValues}:{
        parent:HTMLElement,
        btn:HTMLButtonElement,
        target:HTMLElement,
        divCont:HTMLElement,
        icon:iconType,
        idValues:idValueType[],
        selector:selectorType,
        row:rowType,
        col:colType

    }):Promise<void>{
        const blog=this._modSelector.blog;
        const user=this._user.user;
        this._modSelector.loadBlog({blog,user});
        const idValue:idValueType|null=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"})
        if(idValue){
            const markDel:deletedImgType={id:undefined,imgKey:idValue.attValue,del:true,date:new Date()};
            await this._service.markDelKey(markDel);
        }
        btn.classList.add("active");
        btn.classList.add(icon.display);
        const popup=document.createElement("div");
        parent.classList.add("position-relative");
        parent.classList.add("z-0");
        popup.id="addImage-popup";
        popup.classList.add("flexCol");
        popup.style.cssText="position:absolute;inset:0%;transform:translateY(-50%);width:clamp(150px,200px,250px);border-radius:12px;box-shadow:1px 1px 12px 1px black;";
        const form=document.createElement("form");
        form.classList.add("flexCol");
        const {input,label}=Nav.inputComponent(form);
        const submit=document.createElement("button");
        submit.className="btn btn-primary btn-sm rounded d-flex align-items-center gap-1";
        submit.innerHTML=`submit <i class="far fa-file-image text-white bg-black"/>`;
        input.type="file";
        input.name="file";
        input.id="image-file";
        label.setAttribute("for",input.id);
        label.textContent="select file";
        input.placeholder="";
        form.appendChild(submit);
        popup.appendChild(form);
        parent.appendChild(popup);
        form.addEventListener("submit",async(e:SubmitEvent)=>{
            if(e ){
                e.preventDefault();
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file");
                const image=URL.createObjectURL(file as File);
                const img=target as HTMLImageElement;
                img.setAttribute("contenteditable","false");
                const eleId=img.id;
                img.src=image;
                img.alt="image";
                img.classList.add("image");
                img.style.cssText="position:relative !important;width:100% !important;padding-inline:2rem;margin-inline:auto;border-radius:12px;border-radius:6px;";
                const {Key}=this._service.generateImgKey(formdata,blog) as {Key:string};
                const idValue1:idValueType={eleId,id:"imgKey",attValue:Key};
                divCont.appendChild(img);
                parent.appendChild(divCont);
                this._modSelector.dataset.upDateIdValue({target,idValues,idValue:idValue1});
                Header.detectImageEffect(img);
                this.elementAdder({
                    target:img,
                    selector,
                    row,
                    col,
                    idValues

                }).then(async(res)=>{
                    if(res){
                        const selRowCol={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId} as selRowColType
                        const ele=res.ele as unknown as element_selType;
                        divCont.setAttribute("data-placement",`${ele.order}-A`)
                        const blog=this._modSelector.blog;
                        this._user.askSendToServer({bg_parent:parent,formdata,image:img,blog,oldKey:null,idValues,selRowCol});
                        Misc.fadeIn({anchor:divCont,xpos:50,ypos:100,time:600});
                        Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:600});
                        setTimeout(()=>{parent.removeChild(popup);},580);
                        btn.classList.remove("active");
                        divCont.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                divCont.classList.toggle("isActive");
                                res.target.classList.toggle("isActive");
                              idValues=this.removeMainElement({parent,divCont,target:img,idValues,selRowCol});
                                
                            }
                        });
                    }
                });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
                Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
                Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
                    
              
                
            }
        });

    }

    async bgImage({column,sel,row,col,idValues}:{
        column:HTMLElement,
        idValues:idValueType[]
        sel:selectorType,
        row:rowType,
        col:colType
    }){
        const selRowCol={selectorId:sel.eleId,rowId:row.eleId,colId:col.eleId};
        const blog=this._modSelector.blog;
        const {form,reParent,btn}=Misc.imageForm(column);
        reParent.style.zIndex="2";
        const idValue=this._modSelector.dataset.getIdValue({target:column,idValues,id:"imgKey"});
        const oldKey=idValue  ? idValue.attValue : null;
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const idValues:idValueType[]=this._modSelector.dataset.idValues;
                const eleId=column.id;
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File;
                if(file ){
                    btn.disabled=true;
                    const user=this._user.user
                    const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                    const imgUrl=URL.createObjectURL(file);
                    column.style.backgroundImage=`url(${imgUrl})`;
                    column.style.backgroundSize=`100% 100%`;
                    column.style.backgroundPosition=`50% 50%`;
                    const idValue2:idValueType={eleId,id:"imgKey",attValue:Key};
                    const idValue3:idValueType={eleId,id:"backgroundImg",attValue:"backgroundImg"};
                    const idValue4:idValueType={eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)};
                    this._modSelector.dataset.upDateIdValue({target:column,idValues,idValue:idValue2});
                    this._modSelector.dataset.upDateIdValue({target:column,idValues,idValue:idValue3});
                    this._modSelector.dataset.upDateIdValue({target:column,idValues,idValue:idValue4});
                    await this.updateColumn({target:column,idValues,selRowCol}).then(async(res)=>{
                    if(res ){
                        const col=res.col;
                        Misc.message({parent:column,msg:`updated ${col?.eleId}`,type_:"success",time:500});
                        await this._user.askSendToServer({bg_parent:column,formdata,image:null,blog,oldKey,idValues,selRowCol});//THIS SAVES IT AS BACKGROUND IF IMAGE=NULL
                    }
                   });
                    Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        reParent.removeChild(form);
                    },398);
                }
            }
        };
    }
    async RowBgImage({column,idValues,selRow}:{column:HTMLElement,idValues:idValueType[],selRow:selRowType}){
        const row=column.parentElement;
        if(!row) return;
        
        const countCols=([...row.children as any] as HTMLElement[]).length;
        const idValue:idValueType|null=this._modSelector.dataset.getIdValue({target:row,idValues,id:"imgKey"});
        const oldKey=idValue  ? idValue.attValue : null;
        const {form,reParent}=Misc.imageForm(row);
        
        reParent.style.zIndex="2";
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
            
                const user=this._user.user
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File;
                if(file){
                    const eleId=row.id;
                    const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                    const idValue2:idValueType={eleId,id:"imgKey",attValue:Key};
                    this._modSelector.dataset.upDateIdValue({target:row,idValues,idValue:idValue2});
                    const imgUrl=URL.createObjectURL(file);
                    row.style.backgroundImage=`url(${imgUrl})`;
                    row.style.backgroundSize=`100% 100%`;
                    row.style.backgroundPosition=`50% 50%`;
                    idValues.push({eleId,id:"backgroundImg",attValue:"true"});
                    idValues.push({eleId,id:"numCols",attValue:String(countCols)});
                    this.updateRow({target:row,idValues,selRow}).then(async(_res)=>{
                        if(_res){
                            const {selectorId,rowId}=selRow;
                            const selRowCol={selectorId,rowId,colId:column.id} as selRowColType
                            //rowType,rowAtt,isSaved
                            const blog=this._modSelector.blog;
                            //
                            this._user.askSendToServer({bg_parent:row,formdata,image:null,blog,oldKey,idValues,selRowCol});//THIS SAVES IT AS BACKGROUND IF IMAGE=NULL
                        }
                    });
                    Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        reParent.removeChild(form);
                    },398);
                }
            }
        };
    };


    createAnchor({parent,target,divCont,selector,row,icon,col,idValues}:{
        parent:HTMLElement,
        icon:iconType,
        target:HTMLElement,
        divCont:HTMLElement,
        selector:selectorType,
        row:rowType,
        col:colType,
        idValues:idValueType[]
    }){
       
        //Form group
        const width=window.innerWidth < 900 ? 75 : 50;
        const div=document.createElement("div");
        div.className="m-1 position-relative element-container";
        div.style.cssText="margin-inline:auto;padding-inline:2rem;margin-block:1rem;"
        const form=document.createElement("form");
        form.id="link-form-input"
        form.className="form-group mx-auto flex flex-column align-items-center gap-1";
        form.setAttribute("data-form-group","true");
        form.style.cssText=`width:${width}%;text-align:center; font-size:12px;display:flex;flex-direction:column;gap:10px;`;
        const {input:inName,label:nlabel,}=Nav.inputComponent(form);
        inName.type="text";
        inName.name="name";
        inName.placeholder="link name";
        inName.style.cssText="width:200px;margin-block:0.5rem";
        inName.id="name";
        nlabel.setAttribute("for",inName.id);
        nlabel.textContent="link name";
        const {input:inLink,label:lLabel,}=Nav.inputComponent(form);
        inLink.type="url";
        inLink.name="link";
        inLink.placeholder="https://example.com";
        inLink.style.cssText="width:200px;margin-block:0.5rem";
        inLink.pattern="https://*.";
        inLink.id="inLink";
        inLink.placeholder="https://example.com";
        lLabel.setAttribute("for",inLink.id);
        lLabel.textContent="url link"
        const {button}=Misc.simpleButton({anchor:form,type:"submit",text:"submit",bg:Nav.btnColor,color:"white",time:400});
        button.disabled=true;
        inLink.onchange=(e:Event)=>{
            if(!e) return;
            button.disabled=false;
            const reg:RegExp=/(https:\/\/)[a-zA-Z0-9]{2,}\.[a-z]{2,3}/g;
                const linkValue=(e.currentTarget as HTMLInputElement).value;
                if(reg.test(linkValue)){
                inLink.value=linkValue;
                button.disabled=false;
                }else{
                    Misc.message({parent:parent,msg:"enter htpps://,,,.ca or .com or,,,",type_:"error",time:700})
                }
        };
        parent.appendChild(form);
        Misc.fadeIn({anchor:form,xpos:50,ypos:100,time:600});
        form.onclick=async(e:MouseEvent)=>{
            if(e){
                e.preventDefault();
                const numEles=([...parent.children as any] as HTMLElement[]).length;
                const eleId=target.id;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const name=formdata.get("name") as string;
                const link=formdata.get("link") as string;
                if( name && link){
                    const anchor=target as HTMLAnchorElement;
                    anchor.style.cssText="margin-inline:auto;padding:1rem;font-size:18px;";
                    anchor.className="text-primary"
                    anchor.textContent=inName.value;
                    anchor.href="#";
                    anchor.setAttribute("data-link",link);
                    this.addLinkEmailTelImg({target:anchor,image:this.link,href:link,name,type:"link"});
                    divCont.appendChild(anchor);
                    parent.appendChild(divCont);
                    idValues.push({eleId,id:"link",attValue:link});
                    idValues.push({eleId,id:"IDCol",attValue:`${parent.id}-${numEles}`});
                    idValues.push({eleId,id:"numEles",attValue:String(numEles)});
                    
                    this.elementAdder({
                        target:anchor,
                        selector,
                        row,
                        col,
                        idValues
                    }).then(async(res)=>{
                        if(res ){
                            idValues=res.idValues;
                             const selRowCol={selectorId:res.selector.eleId,rowId:res.row.eleId,colId:res.col.eleId} as selRowColType;
                            const ele=res.ele as unknown as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                            divCont.onclick=(e:MouseEvent)=>{
                                if(e){
                                    res.target.classList.toggle("isActive");
                                    divCont.classList.toggle("isActive");
                                }
                            };
                            Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
                            Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
                           idValues=this.removeMainElement({parent,divCont,target:res.target,idValues,selRowCol});
                            Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                           setTimeout(()=>{parent.removeChild(form);},400); 
                           
                        }
                    });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
                    
                }
            }
        };

        
        
    }
 
    //PARENT SELECTULTYPE()
    createList({parent,target,divCont,btn,selector,row,col,idValues}:{
        parent:HTMLElement,
        selector:selectorType,
        row:rowType,
        col:colType,
        target:HTMLElement,
        divCont:HTMLElement,
        idValues:idValueType[],
        btn:HTMLButtonElement

    }){
        btn.classList.add("active");
        const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId}
        Main.textarea=document.querySelector("div#textarea");
        const node=target.nodeName.toLowerCase()
        let list:HTMLOListElement|HTMLUListElement;
        if(node=="ol"){
            list=target as HTMLOListElement
        }else{
            list=target as HTMLUListElement
        }
        
        const eleId=list.id;
        list.classList.add("w-100");
        const countEles=([...parent.children as any] as HTMLElement[]).length;
        list.setAttribute("name",node);
        list.className=" box-shadow";
        list.classList.add("box-shadow");
        list.style.cssText="padding-inline:6px;width:90%;margin-inline:auto;";
        const li=document.createElement("li");
       
        if(node==="ul"){
            li.classList.add("decimal");
        }
        divCont.appendChild(list);
        parent.appendChild(divCont);
        Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
        Misc.fadeIn({anchor:divCont,xpos:50,ypos:100,time:600});
        idValues.push({eleId,id:"IDCol",attValue:`${parent.id}-col-${countEles}`});
        idValues.push({eleId,id:"name",attValue:node});
        this.elementAdder({
            target:list,
            selector,
            row,
            col,
            idValues
        }).then(async(res)=>{
            if(res ){
                const ele=res.ele as element_selType;
                divCont.setAttribute("data-placement",`${ele.order}-A`);
                
                this.editElement({target:res.target,idValues,selRowCol})//pulls flex if exist from target attrubutes
                divCont.onclick=(e:MouseEvent)=>{
                    if(e){
                         const selRowCol={selectorId:res.selector.eleId,rowId:res.row.eleId,colId:res.col.eleId} as selRowColType;
                        if(!(([...res.target.children as any] as HTMLElement[]).map(li=>(li.nodeName)).includes("LI"))){
                            list.appendChild(li);
                        }
                        divCont.classList.toggle("isActive");
                        res.target.classList.toggle("isActive");
                        btn.classList.remove("active");
                      this.removeMainElement({parent,divCont,target:res.target,idValues:res.idValues,selRowCol});
                    }
                };
            }
        });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
        
      
    };



    createQuote({parent,target,divCont,selector,row,col,icon,idValues}:{
        parent:HTMLElement,
        icon:iconType,
        row:rowType,
        col:colType,
        selector:selectorType
        target:HTMLElement,
        divCont:HTMLElement,
        idValues:idValueType[]
    }){
        const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId}
        Main.textarea=document.querySelector("div#textarea");
        const quote=target as HTMLQuoteElement;
        const countEles=([...parent.children as any] as HTMLElement[]).length;
        quote.className="position-relative";
        quote.classList.add(icon.display);
        quote.classList.add("element");
        quote.classList.add("box-shadow");
        quote.textContent=icon.name;
        divCont.appendChild(quote);
        parent.appendChild(divCont);
        Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
        Misc.fadeIn({anchor:quote,xpos:50,ypos:100,time:600});
        //ADDING element
        const eleId=quote.id;
        idValues.push({eleId,id:"name",attValue:`${quote.nodeName.toLowerCase()}`});
        idValues.push({eleId,id:"IDCol",attValue:`${parent.id}-col-${countEles}`});
        
        this.elementAdder({
            target:quote,
            selector,
            row,
            col,
            idValues
        }).then(async(res)=>{
            if(res ){
                const ele=res.ele as unknown as element_selType;
                idValues=res.idValues;
                divCont.setAttribute("data-placement",`${ele.order}-A`);
                divCont.onclick=async(e:MouseEvent)=>{
                    if(!e) return
                     const selRowCol={selectorId:res.selector.eleId,rowId:res.row.eleId,colId:res.col.eleId} as selRowColType;
                    divCont.classList.toggle("isActive");
                    res.target.classList.toggle("isActive");
                    if(([...res.target.classList as any] as string[]).includes("isActive")){
                   idValues= this.removeMainElement({parent,divCont,target:res.target,idValues,selRowCol});
                    
                    };
                };
            };
            this.editElement({target:res.target,idValues,selRowCol})//realtime edits on either flex or none items
        });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
       
        
       
        
    };
    insertDateTime({parent,target,divCont,selector,row,col,icon,idValues}:{
        parent:HTMLElement,
        icon:iconType,
        row:rowType,
        col:colType,
        selector:selectorType
        target:HTMLElement,
        divCont:HTMLElement,
        idValues:idValueType[]
    }){
        
        const popup=document.createElement("div");
        const css_col="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;padding:1rem;"
        popup.id="dateTime-popup";
        popup.className="position-relative flexCol justify-center align-center mx-auto my-auto px-1 py-2 ";
        popup.style.cssText="width:300px;height:300px;border-radius:12px;box-shadow:1px 1px 12px 1px black;backround-color:white;" + css_col;
        const form=document.createElement("form");
        form.style.cssText=css_col +"width:100%;";
        const {input,label}=Nav.inputComponent(form)
        input.type="datetime-local";
        input.name="datetime";
        input.id="datetime";
        input.min="2024-04-07T00:00";
        input.max="2026-04-24T00:00";
        input.placeholder="Date";
        label.setAttribute("for",input.id);
        const submit:btnReturnDisableType={
            parent:form,
            text:"submit",
            bg:this.bgColor,
            color:"white",
            type:"submit",
            disable:true
        }
       const btn= buttonRetDisable(submit);
       btn.disabled=true;
        popup.appendChild(form);
        parent.appendChild(popup);
        input.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        Misc.fadeIn({anchor:popup,xpos:50,ypos:100,time:600});
        form.addEventListener("submit",async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const datetime=formdata.get("datetime") as string;
                const newDate=new Date(datetime as string);
                const mkDateTime=`about-${datetime.split("-")[2].split("T")[1]}`;
                const time=target as HTMLTimeElement;
                const eleId=time.id;
                time.setAttribute("date-time",`${mkDateTime}`);
                time.innerHTML=newDate.toLocaleDateString();
                const numEles=([...parent.children as any] as HTMLElement[]).length;
                idValues.push({eleId,id:"IDCol",attValue:`${parent.id}-col-${numEles}`});
                idValues.push({eleId,id:"numEles",attValue:String(numEles)});
                idValues.push({eleId,id:"time",attValue:mkDateTime});
              
                divCont.appendChild(time);
                parent.appendChild(divCont);
                parent.removeChild(popup);
                Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
                Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
                
                this.elementAdder({
                    target:time,
                    row,
                    selector,
                    col,
                    idValues
                }).then(async(res)=>{
                    if(res){
                        const selRowCol={selectorId:res.selector.eleId,rowId:res.row.eleId,colId:res.col.eleId} as selRowColType;
                        const ele=res.ele as unknown as element_selType;
                        idValues=res.idValues;
                        divCont.setAttribute("data-placement",`${ele.order}`);
                        divCont.addEventListener("click",async(e:Event)=>{
                            if(e){
                                divCont.classList.toggle("isActive");
                                res.target.classList.toggle("isActive");
                                idValues=this.removeMainElement({parent,divCont,target:time,idValues,selRowCol});
                            }
                        });
                    }
                });
                
                
                
            }
        });

    };

    
    setEvenHeight({target,idValues,selRowCol}:{target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
        const eleId=target.id
        for(const key of Object.keys(target.style)){
            if(key==="height"){
                target.style.height="auto";
            }
        }
        
        const getRow=target.parentElement;
        if(!( getRow)) return;
        const rowHeight=window.getComputedStyle(getRow).getPropertyValue("height");
        target.style.height=rowHeight;
        const idValue:idValueType={eleId,id:"height",attValue:rowHeight};
        this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
        this._modSelector.updateColumn({target:target,idValues,selRowCol}).then(async(col)=>{
            if(!col){
                Misc.message({parent:target,msg:"set height failed",time:700,type_:"error"});
            }
        });
    };


    removeEvenHeight({target,idValues,selRowCol}:{target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
        target.style.height="auto";
        this.updateColumn({target,idValues,selRowCol}).then(async(res)=>{
            if(res ){
                const col=res.col;
                Misc.message({parent:target,msg:`${col?.eleId}:removed`,type_:"success",time:600});
            }
        });
    };


    removeFlexBox({parent,target,idValues}:{parent:HTMLElement,target:HTMLElement,idValues:idValueType[]}){
        //--------------DELETE ICON----------------//
        const delDiv=document.createElement("div");
        delDiv.style.cssText="position:absolute;top:0;left:0;transform:translate(-12px,0px);background:black;color:white;border-radius:50%;font-size:26px;";
        delDiv.setAttribute("is-icon","true");
        delDiv.className="fa-solid fa-circle-xmark";
        const cssStyle={background:"inherit",color:"red"};
        FaCreate({parent:delDiv,name:FaTrash,cssStyle});
        target.appendChild(delDiv);
        delDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this._modSelector.selectors.map((sel,index)=>{
                    if(sel && sel.eleId===target.id){
                        const {rows}=this._modSelector.checkGetRows({select:sel});
                        rows.map(row=>{
                            if(row){
                                row.cols.map(col=>{
                                    if(col){
                                        col.elements.map(ele=>{
                                            if(ele){
                                                idValues.map((kat,index)=>{
                                                    const check=[sel.eleId,row.eleId,col.eleId].includes(kat.eleId)
                                                    if(check){
                                                        idValues.splice(index,1);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        const arr=Header.getImgKeys({selector:sel});
                        if(arr && arr.length>0){
                            arr.map(item=>{
                                if(item){
                                    const check=this._service.checkFreeImgKey({imgKey:item.imgKey});
                                    if(check) return;
                                    this._service.adminImagemark(item.imgKey).then(async(res)=>{
                                        if(res){
                                            Misc.message({parent,msg:`${item.imgKey}`,type_:"success",time:400});
                                        }
                                    });
                                }
                            });
                        }
                        
                    }
                });
                this._modSelector.selectors.forEach((sel,index)=>{
                    if(sel.eleId===target.id){
                        this._modSelector.selectors.splice(index,1);
                        this._modSelector.shiftPlace(sel.placement);
                    }
                });
                this._modSelector.blog={...this._modSelector.blog,selectors:this._modSelector.selectors}
                this._modSelector.localStore({blog:this._modSelector.blog});
                Misc.fadeOut({anchor:target,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(target);
                },380);
               
            }
        });
    };

    static getPlacement():Promise<string | null>{
        return new Promise((resolver,reject)=>{
            if(typeof window !=="undefined"){
                resolver(localStorage.getItem("placement"));
            };
        }) as Promise<string | null>;
    }
   


   //PARENT: ROWCOLGENERATOR()- GENERATES COLUMNS
   colGenerator(cols:number){
     //Column GENERATOR PRODUCES FLEX NUMS MAX=COLUMNS:4 MIN=COLUMNS:1, the input is the #of columns
     //OUTPUT:NUM:=> FOR 12/NUM
    const arrCol=[{col:1,num:12},{col:2,num:6},{col:3,num:4},{col:4,num:3},{col:6,num:2}]
    const result=arrCol.find(col_=>(col_.col===cols));
    if(!result)return
    return result.num;
    }


    bgShade({parent,sel,row,col,btn,idValues}:{
        parent:HTMLElement,
        sel:selectorType,
        row:rowType,
        col:colType,
        btn:HTMLButtonElement,
        idValues:idValueType[]

    }){
        const less600=window.innerWidth < 600;
        const eleId=parent.id;
        const selRowCol:selRowColType={selectorId:sel.eleId,rowId:row.eleId,colId:col.eleId};
        const idValue:idValueType={eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)};
        this._modSelector.dataset.upDateIdValue({target:parent,idValues,idValue});
        const direction=less600 ? "column":"row" ;
        const height=less600 ? "auto":"36px"
        parent.style.position="relative";
       
        btn.classList.add("active");
        //show drop-down on shade selection
        const popup=document.createElement("div");
        popup.style.cssText=`position:absolute;inset:0%;transform:translateY(-10%);border-radius:5px;box-shadow:1px 1px 10px 1px #bdc5c9;display:flex;flex-direction:${direction};width:175px;height:auto;z-index:200;height:${height}`;
        popup.setAttribute("is-popup","true");
        popup.id="popup";
        popup.style.top="0px";
        popup.style.left="0px";
        popup.style.transform="translate(5px,-25px)";
        const selectBlue=document.createElement("select");
        selectBlue.style.cssText="border-radius:15px;height:26px;";
        selectBlue.className="box-shadow";
       
        Misc.blueShades?.forEach((shade)=>{
            const option=document.createElement("option");
            option.value=JSON.stringify(shade);
            option.textContent=shade.name;
            option.style.cssText=`font-size:9px;background-color:${shade.value};`;
            selectBlue.appendChild(option);
        });
        popup.appendChild(selectBlue);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:600});
        selectBlue.addEventListener("change",(e:Event)=>{
            if(e){
                const getActives=parent.querySelectorAll("[is-element=true].isActive");
                const value=(e.currentTarget as HTMLSelectElement).value as string;
                const {parsed,isJSON}=Header.checkJson(value);
                const shade= isJSON ? parsed as {name:string,value:string}:null;
                const check=(getActives && getActives.length>0);
                
                if(check){
                    (([...getActives as any] as HTMLElement[]).forEach(async(activeEle)=>{
                        
                            if(activeEle && shade){
                                const eleId=activeEle.id;
                                const idValue:idValueType={eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)};
                                this._modSelector.dataset.upDateIdValue({target:activeEle,idValues,idValue});
                                activeEle.style.backgroundColor=shade.value;
                               await this.updateElement({target:activeEle,idValues,selRowCol}).then(async(res)=>{
                                if(res){
                                    const ele=res.ele
                                    console.log("ele",ele);
                                    console.log("target",res.target)
                                }
                               });
                            }
                        
                    }));
                    btn.classList.remove("active");
                    parent.removeChild(popup);
                }
                
            }
        });
        const select1=document.createElement("select");
        select1.style.cssText="border-radius:15px;height:26px;";
        select1.className="box-shadow";
        Misc.shades.forEach((shade,index)=>{
            const option=document.createElement("option");
            option.value=shade;
            if(index===0) option.textContent=shade;
            option.style.cssText=`font-size:9px;background-color:${shade};`;
            option.textContent=shade;
            select1.appendChild(option);
        });
        popup.appendChild(select1);
        parent.appendChild(popup);
        select1.addEventListener("change",(e:Event)=>{
            if(e){
              
                const getActives=parent.querySelectorAll("[is-element=true].isActive");
                const value=(e.currentTarget as HTMLSelectElement).value as string;
                const check=(getActives && getActives.length>0);
                
                if(check){
                    ([...getActives as any] as HTMLElement[]).forEach(async(activeEle)=>{
                        
                            if(activeEle){
                                const eleId=activeEle.id;
                                const idValue:idValueType={eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)};
                                this._modSelector.dataset.upDateIdValue({target:activeEle,idValues,idValue});
                                activeEle.style.backgroundColor=value;
                                await this.updateElement({target:activeEle,idValues,selRowCol}).then(async(res)=>{
                                    if(res){
                                        const ele=res.ele;
                                        console.log("retEle",ele);
                                        console.log("target",res.target);
                                    }
                                });
                            }
                        
                    });
                    btn.classList.remove("active");
                    parent.removeChild(popup);
                }
                
            }
        });
        
        //then remove "active" on btn
    }

   async selectorAdder({target,selector,idValues}:{target:HTMLElement,selector:selectorType,idValues:idValueType[]}):
   Promise<{
    selector:selectorType,
    target:HTMLElement,
    idValues:idValueType[]
   }>{
    const eleId=target.id;
        
        const node=target.nodeName.toLowerCase();
            selector={
               ...selector as selectorType,
               id:this.placement,
               name:node,
               eleId:eleId,
               class:target.className,
               cssText:target.style.cssText,
               rows:"",
               header:false,
               placement:this.placement,
               footer:false
           } as selectorType;
           
        
           
           idValues.push({eleId,id:"selectorId",attValue:eleId});
           idValues.push({eleId,id:"placement",attValue:String(selector.placement)});
           const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({target,sel:selector,row:null,col:null,ele:null,idValues,loc:"flexbox",level:"selector",clean:false});
           idValues=retIdValues;
           this.placement=this.placement + 1;
           this._modSelector.selectors.push(selector);
        this._modSelector.dataset.populateElement({target,selRowColEle:selector,idValues,level:"selector",loc:'flexbox',clean:false});
       this._modSelector.footerPlacement();
       this._modSelector.dataset.upDateIdValues({idValues});
       return Promise.resolve({selector,target,idValues}) as Promise<{selector:selectorType,target:HTMLElement,idValues:idValueType[]}>; 
       
   }
  
   
   async elementAdder({target,selector,row,idValues,col}:{
    //ADDS ELEMENT, ADD IDVALUES DEFAULTS AND POPULATES ATTRIBUTES
    target:HTMLElement,
    selector:selectorType,
    row:rowType,
    col:colType,
    idValues:idValueType[]
   }):Promise<{
    target:HTMLElement,
    ele:element_selType|undefined
    selector:selectorType,
    row:rowType,
    col:colType,
    idValues:idValueType[]
   }>{
       const eleId=target.id;
        const node=target.nodeName.toLowerCase();
        let ele:element_selType|undefined={} as element_selType;
        const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId};
        idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive"]});
        //COL
        const check= col?.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
        if(node && !check){
            const ID=col.elements.length
            ele={
                ...ele,
                id:ID ,
                selectorId:selector.id,
                name:node,
                class:cleaned.join(" "),
                eleId,
                inner_html:target.innerHTML,
                placement:ID ? ID as number : undefined,
                cssText:target.style.cssText,
                attr:target.getAttribute("attr") ? target.getAttribute("attr") as string :undefined,
                col_id:col.id,
                order:ID,
                // imgKey: imgKey ? imgKey : undefined
            } as element_selType;
            idValues.push({eleId,id:"eleOrder",attValue:String(ID)});
            const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                target,
                sel:selector,
                row,
                col,
                ele,
                idValues,
                loc:"flexbox",
                level:"element",
                clean:false
            });
            idValues=retIdValues
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
            getEleIds.map(kat=>{
                if(ele && kat.attValue){
                    const attrTest=attrEnumArrTest(ele);
                    const typeTest=typeEnumArrTest(ele);
                    const hasAttr=attrEnumArr.includes(kat.id);
                    const hasType=typeEnumArr.includes(kat.id as typeEnumType);
                    if(kat.id==="imgKey" && ele){
                        if(kat.attValue){
                            ele.imgKey=kat.attValue;
                        }
                    }else if(!attrTest){
                        if(hasAttr){
                            ele.attr=kat.attValue
                        };
                    }else if(!typeTest){
                        if(hasType && ele){
                            ele.type=kat.attValue;
                        };
                    }

                }
            });
                        
            if(node==="img"){
                const target_=target as HTMLImageElement;
                if(!ele.imgKey){
                    ele.img=target_.src;
                }
                ele.inner_html=target_.alt;
            }
            col.elements.push(ele as element_selType);
                      
                    }
        //COL
        //APPENDING COL
       row.cols= row.cols.map((col_)=>{
            if(col_.eleId===col.eleId){
                col_=col;
            }
            return col_;
        });
        //APPENDING COL
        //APPENDING ROW
        const {rows}=this._modSelector.checkGetRows({select:selector});
        const newRows= rows.map((row_)=>{
               if(row_.eleId===row.eleId){
                   row_=row;
               }
               return row_;
           });
        //APPENDING ROW
        //ADDING IT TO SELECTOR
        selector={...selector,rows:JSON.stringify(newRows)}
        //ADDING IT TO SELECTOR
        //ADDING SELECTOR TO SELECTORS
        this.selectors = this._modSelector.selectors.map((selector_)=>{
           
            if(selector_.eleId===selector.eleId ){
                selector_=selector;
            }
            return selector_;
        }); //saving it to blog
        
        //POPULATING ATTRIBUTE
        this._modSelector.dataset.populateElement({
            target,
            loc:"flexbox",
            level:"element",
            selRowColEle:ele,
            idValues,
            clean:false
        });
        //POPULATING ATTRIBUTE
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        this._modSelector.dataset.upDateIdValues({idValues});
        //ADDING SELECTOR TO SELECTORS
        return Promise.resolve({target:target,ele:ele as element_selType|undefined,selector,idValues,row,col}) as Promise<{ 
            target:HTMLElement,
            ele:element_selType|undefined
            selector:selectorType,
            row:rowType,
            col:colType,
            idValues:idValueType[]}>;

    };


    async updateElement({target,idValues,selRowCol}:{
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType

    }):Promise<{ele:element_selType|undefined,target:HTMLElement,selRowCol:selRowColType}>{
        const eleId=target.id;
        const idValue={eleId,id:"update",attValue:"update"} as idValueType;
        this._modSelector.dataset.upDateIdValue({target,idValues,idValue})
        const node=target.nodeName.toLowerCase();
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
        let retEle:element_selType|undefined={} as element_selType;
    
        const {selectorId,rowId,colId}=selRowCol as selRowColType;
        this._selectors=this._modSelector.selectors.map(select=>{
            if(select.eleId===selectorId){
                const {rows}=this._modSelector.checkGetRows({select});
                const newRows= rows.map(row=>{
                    if(row.eleId===rowId){
                        row.cols.map(col=>{
                            if(col.eleId===colId){
                                col.elements.map(ele=>{
                                    if(ele.eleId===target.id){
                                        ele.cssText=target.style.cssText;
                                        ele.class=cleaned.join(" ");
                                        ele.inner_html=target.innerHTML;
                                        if(node==="img") ele.inner_html=(target as HTMLImageElement).alt;
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
                                        retEle=ele;
                                    }
                                    return ele;
                                });
                            }
                            return col;
                        });
                    }
                    return row;
                });
                select.rows=JSON.stringify(newRows);
            }
        return select;
        });
        this._modSelector.selectors=this._selectors;
        this._modSelector.dataset.upDateIdValues({idValues});
        
        return Promise.resolve({ele:retEle,target,selRowCol}) as Promise<{ele:element_selType|undefined,target:HTMLElement,selRowCol:selRowColType}>;
    };



    editElement({target,idValues,selRowCol}:{target:HTMLElement | HTMLImageElement,idValues:idValueType[],selRowCol:selRowColType}){
       
        const eleId=target.id;
        const idValue={eleId,id:"update",attValue:"edit"} as idValueType;
        this._modSelector.dataset.upDateIdValue({target,idValue,idValues});
        const {selectorId,rowId,colId} = selRowCol as selRowColType;
        target.oninput=(e:Event)=>{
            if(!e) return;
            this.selectors=this._modSelector.selectors.map(selector_=>{
                if(selector_.eleId===selectorId){
                    const {rows}=this._modSelector.checkGetRows({select:selector_});
                    const newRows=rows.map(row=>{
                        if(row.eleId===rowId){
                            row.cols.map(col=>{
                                if(col.eleId===colId){
                                    col.elements.map(element=>{
                                        
                                        if(element.eleId===target.id){
                                            element.inner_html=target.innerHTML;
                                        };
                                        return element;
                                    });
                                };
                                
                                return col;
                            });
                        };
                        return row;
                    });
                    selector_.rows=JSON.stringify(newRows);
                };
                return selector_;
            });
            
        };
      
    };


   async updateColumn({target,idValues,selRowCol}:{target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}):Promise<{col:colType|undefined,target:HTMLElement}|undefined>{
        const eleId=target.id;
        let col_:colType|undefined={} as colType;
        const {selectorId,colId,rowId}=selRowCol as selRowColType;
        const isCol=eleId===colId;
        const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
        const imgKey=getImgKey?.attValue ||undefined;
        const idValue:idValueType={eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)};
        this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
      if(!isCol){
        Misc.message({parent:target,msg:"!!TARGET IS NOT COLID,,- canceling upgrade",type_:"error",time:1200});
        return
      }else{
          this.selectors=this.selectors.map(select=>{
              if(select.eleId===selectorId){
                  const {rows}=this._modSelector.checkGetRows({select});
                  const newRows= rows.map(row=>{
                      if(row.eleId===rowId){
                          row.cols.map(col=>{
                              if(col.eleId===eleId){
                                  col.class=cleaned.join(" ");
                                  col.cssText=target.style.cssText;
                                  col.imgKey=imgKey;
                                 idValues=this._modSelector.datasetSincUpdate({target,ele:col,idValues,level:"col",loc:"flexbox"});
                                  const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                                    const testAttr=attrEnumArrTest(col);
                                    const testType=typeEnumArrTest(col);
                                    getEleIds.map(kat=>{
                                        if(kat.attValue){
                                            if(testAttr && kat.id===testAttr.id ){
                                                col.attr=kat.attValue
                                            }else if(testType && kat.id===testType.id ){
                                                col.type=kat.attValue
                                            }else if(kat.id==="imgKey"){
                                                col.imgKey=kat.attValue
                                            }
                                        }
                                    });
                                  col_=col;
                              }
                              return col;
                          });
                      }
                      return row;
                  });
                  select.rows=JSON.stringify(newRows);
              }
              return select;
          });
          
      }
      this._modSelector.dataset.upDateIdValues({idValues});
        return Promise.resolve({col:col_,target}) as Promise<{col:colType|undefined,target:HTMLElement}|undefined>;

    };


   async updateRow({target,idValues,selRow}:{target:HTMLElement,idValues:idValueType[],selRow:selRowType}):Promise<{target:HTMLElement,row:rowType|undefined}|undefined>{
        const eleId=target.id;
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
        const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
        const imgKey=getImgKey?.attValue ||undefined;
        const {selectorId,rowId}=selRow as selRowType;
        const isRow=eleId===rowId;
        let row_:rowType|undefined={} as rowType
        if(!isRow){
            Misc.message({parent:target,msg:"ERROR-TARGET ID NOT ROW!!- update canceled",type_:"error",time:1200});
            return;
        }else{
            this._modSelector.selectors=this._modSelector.selectors.map(select=>{
                if(select.eleId===selectorId){
                  
                    const {rows}=this._modSelector.checkGetRows({select});
                  const newRows=rows.map(row=>{
                  
                        if(row.eleId===target.id){
                            row.class=cleaned.join(" ");
                            row.cssText=target.style.cssText;
                            row.imgKey=imgKey;
                            this._modSelector.datasetSincUpdate({target,ele:row,idValues,level:"row",loc:"flexbox"});
                        }
                        row_=row;
                        return row;
                    });
                    select.rows=JSON.stringify(newRows);
                }
                return select;
            });
           
            this._modSelector.dataset.populateElement({target,selRowColEle:row_,idValues,level:"row",loc:"flexbox",clean:false});
            this._modSelector.dataset.upDateIdValues({idValues});
        };
        return Promise.resolve({target,row:row_}) as Promise<{target:HTMLElement,row:rowType|undefined}|undefined>;
    };

///---------ULTILITIES///-----------///

    removeMainElement({parent,divCont,target,idValues,selRowCol}:{
        parent:HTMLElement,
        divCont:HTMLElement,
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType

    }){
       const check=([...divCont.classList as any] as string[]).includes("isActive");
        const css="position:absolute;transform:translate(2px,5px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:-6px;left:0px;"
        divCont.style.position="relative";
        if(check){
            const xIconDiv=document.createElement("div");
            xIconDiv.id="flexbox-delete-element";
            xIconDiv.setAttribute("contenteditable","false");
            xIconDiv.setAttribute("is-icon","true");
            xIconDiv.className="xIconDiv";
            xIconDiv.style.cssText=`${css}`;
            const cssStyle={background:"inherit",fontSize:"inherit"};
            FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
            divCont.appendChild(xIconDiv);
            xIconDiv.addEventListener("click",async(e:MouseEvent)=>{
                if(e){
                    const idValue=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
                    await this.removeElement({target,idValues,selRowCol}).then(async(res)=>{
                        if(res){
                            idValues=res.idValues
                            
                            if(target.nodeName==="IMG" && idValue){
                                if(idValue){
                                    const check=this._service.checkFreeImgKey({imgKey:idValue.attValue});
                                    if(check) return;
                                    this._service.adminImagemark(idValue.attValue).then(async(res)=>{
                                        if(res){
                                            Misc.message({parent:parent,msg:`${idValue.attValue} is deleted`,type_:"success",time:700});
                                        }
                                    });
                                }
                            }
                            Misc.message({parent,msg:"removed",type_:"success",time:800});
                        }else{
                            Misc.message({parent,msg:"ITEM WAS NOT DELETED",type_:"error",time:1200});
                        }
                       
                    });
                    Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:400});
                    setTimeout(()=>{parent.removeChild(divCont);},398);
                    //resetting buttons
                    Main.initMainBtns();
                }
            });

        }else{
            Header.cleanUpByID(divCont,"flexbox-delete-element");
        }
        return idValues
    }
    
    //REMOVES ELEMENT FROM BLOG AND REINDEXES!!!!!!!!
    removeElement({target,idValues,selRowCol}:{
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType

    }){
        //DELETES TARGET FROM IDVALUES AND REMOVES TARGET FROM COLUMN
        const eleId=target.id;
            const {colId,rowId,selectorId}=selRowCol as selRowColType;
            this.selectors=this.selectors.map(sel=>{
                    if(sel.eleId===selectorId){
                        const {rows}=this._modSelector.checkGetRows({select:sel});
                       const newRows= rows.map(row=>{
                            if(row.eleId===rowId){
                                row.cols.map(col=>{
                                    if(col.eleId===colId){
                                        col.elements.map((ele,index)=>{
                                            if(ele.eleId ===target.id){
                                                col.elements.splice(index,1);
                                            };
                                        });
                                    };
                                    return col;
                                });
                            };
                            return row;
                        });
                        sel.rows=JSON.stringify(newRows);
                    };
                return sel;
            });//SAVING IT TO LOCAL
            //----------REINDEXING------///
            idValues.map((kat,index)=>{
                if(kat && kat.eleId===eleId){
                    idValues.splice(index,1);
                }
            });
           idValues= this._modSelector.dataset.upDateIdValues({idValues});
        return Promise.resolve({idValues,eleId,selRowCol}) as Promise<{idValues:idValueType[],eleId:string,selRowCol:selRowColType}>;
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

   

static cleanUpByClass(parent:HTMLElement,class_:string){
    const getaLL=parent.querySelectorAll(`.${class_}`);
    if(getaLL){
        ([...getaLL as any] as HTMLElement[]).map(rmEle=>{
            if(rmEle){
                parent.removeChild(rmEle)
            }
        });
    }
}


}
export default Flexbox;
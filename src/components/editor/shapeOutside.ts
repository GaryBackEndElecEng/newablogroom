
import { FaCrosshairs } from "react-icons/fa";
import { FaCreate } from "../common/ReactIcons";
import Service from "../common/services";
import Main from "./main";
import ModSelector from "./modSelector";
import { arrDivContType, colType, element_selType, elementType, flexType, gets3ImgKey, iconType, rowType, selectorType } from "./Types";
import Misc from "../common/misc/misc";
import { buttonReturn, imageLoader } from "../common/tsFunctions";
import Nav from "../nav/headerNav";
import User from "../user/userMain";
import Header from "./header";
import { attrEnumArrTest, IDKeys, IDKeyValuepairs, typeEnumArrTest} from "../common/lists";
import { idEnumType, idValueType, selRowColType, } from "@/lib/attributeTypes";
import Dataset from "../common/dataset";
import Toolbar from "../common/toolbar";


export type attributeType={
    id:number,
    name:string,
    ele?:string,
    attr?:string
}

class ShapeOutside{
   private  _element:elementType={} as elementType;
    private _elementSel:element_selType={} as element_selType;
    private readonly initElement:elementType={
        id: 0, 
        placement:0,
        selectorId:undefined,
        eleId: "",
        name: "div",
        class: "",
        inner_html:"",
        cssText: "",
        attr:"shapeOutsideCircle",
        img:"",
        imgKey:undefined,
        blog_id:0,
        type:"shapeOutside"
    };
   private readonly initElementSel:element_selType={
        id: 0, 
        order:0,
        selectorId:undefined,
        eleId: "",
        col_id:0,
        name: "div",
        class: "",
        inner_html:"",
        cssText: "",
        attr:"shapeOutsideCircle",
        img:"",
        imgKey:undefined,
        type:"shapeOutside"
    };
    logo:string="/images/gb_logo.png";
    btnColor:string;
    bgColor:string;
    icons:iconType[];
    attributes:attributeType[]=[
        {id:0,name:"select",attr:"select"},
        {id:1,name:"line-height",attr:"lineHeight"},
        {id:2,name:"color",ele:"color"},
        {id:3,name:"upload image",ele:"upload image"},
        {id:4,name:"imgSize",ele:"adjustImgSize"},
        {id:5,name:"font",attr:"fontFamily"},
        {id:6,name:"right margin",attr:"marginRight"},
        {id:7,name:"remove",attr:"remove"},

    ];
    divCont_css:string;
    divCont_class:string;
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
        this.btnColor=this._modSelector.btnColor;
        this.bgColor=this._modSelector._bgColor;
        this.icons=Toolbar.icons;
        
        this.initElementSel={
            id: 0, 
            order:0,
            col_id:0,
            selectorId:undefined,
            eleId: "",
            name: "div",
            class: "",
            inner_html:"",
            cssText: "",
            attr:"shapeOutsideCircle",
            img:"",
            imgKey:undefined,
            type:"shapeOutside"
        }
        this._elementSel=this.initElementSel;
        this.initElement={
            id: 0, 
            placement:0,
            selectorId:undefined,
            eleId: "",
            name: "div",
            class: "",
            inner_html:"",
            cssText: "",
            attr:"shapeOutsideCircle",
            img:"",
            imgKey:undefined,
            blog_id:0,
            type:"shapeOutside"
        }
        this._element=this.initElement;
    }

     //////------GETTERS/SETTERS-----/////////
     get placement(){
        return this._modSelector.placement;
    }
    set placement(placement:number){
        this._modSelector.placement=placement;
    }
    get elements(){
        return this._modSelector.elements;
    }
    set elements(elements:elementType[]){
        this._modSelector.elements=elements;
    }
    get element(){
        return {...this._element,type:"shapeOutside"};
    }
    set element(element:elementType){
        this._element={...element,type:"shapeOutside"};
    }
    get elementSel(){
        return {...this._elementSel,type:"shapeOutside"};
    }
    set elementSel(elementSel:element_selType){
        this._elementSel={...elementSel,type:"shapeOutside"};
    };
    get user(){
        return this._user.user;
    }
    //////------GETTERS/SETTERS-----/////////
    ///-----FROM HTMLEMENT CLASS///
    async showCleanShapeOutside({parent,selRowCol,element,idValues}:{parent:HTMLElement,selRowCol:selRowColType|null,element:elementType|element_selType,idValues:idValueType[]}):Promise<arrDivContType|undefined>{
        //FOR HTMLELEMENT ON REFRESH; HTMLELEMENT THEN GOES TO EDIT
        const less400=window.innerWidth < 400;
        const typeTest=typeEnumArrTest(element);
        const isShape= typeTest && typeTest.id==="shapeOutside";
        if(!isShape) return;
        
        const rand=Math.floor(Math.random()*1000);
        const parent_id= parent ? parent.id:null;
        const attrTest=attrEnumArrTest(element);
        
        
        const para=document.createElement("p");
        para.id=element.eleId;
        para.style.cssText=element.cssText;
         para.innerHTML=element.inner_html;
         para.innerHTML=element.class;
        const eleId=para.id;
        const img=para.querySelector("img") as HTMLImageElement;
            
            if(img){
                const getWidth=Number((img.style.width).split("px")[0]);
                img.setAttribute("contenteditable","false");
                img.setAttribute("is-shapeoutside","true");
                const eleSrc=element.img || this.logo;
                img.alt="ww.ablogroom.com";
                img.style.width=less400 ? "100%":"158px";
                img.style.aspectRatio=less400 ? "":"1 / 1";
                if(element.imgKey){
                    const url=this._service.getFreeBgImageUrl({imgKey:element.imgKey});
                    img.alt=element.imgKey;
                    idValues.push({eleId,id:"imgKey",attValue:element.imgKey});
                    img.src=imageLoader({src:url,width:getWidth,quality:90});
                }else{
                    img.src=imageLoader({src:eleSrc,width:getWidth,quality:90});
                };

                //--------COMPLETE:=> ADD SETATTRIBUTES TO SHOWSHAPEOS/////////////
                const isCircle=attrTest && attrTest.id==="shapeOutsideCircle" ? attrTest.value: undefined;
                const isSquare=attrTest && attrTest.id==="shapeOutsideSquare" ? attrTest.value : undefined;
                const isPolygon=attrTest && attrTest.id==="shapeOutsidePolygon" ? attrTest.value : undefined;
                if(isCircle){
                    idValues.push({eleId,id:"shapeOutsideCircle",attValue:"true"});
                    img.id="shape-outside-circle";
                }else if(isSquare){
                    idValues.push({eleId,id:"shapeOutsideSquare",attValue:"true"});
                    img.id="shape-outside-square";
                }else if(isPolygon){
                    idValues.push({eleId,id:"shapeOutsidePolygon",attValue:"true"});
                    img.id="shape-outside-polygon";
                }
            };
        if(less400){
            para.classList.add("flex-column");
            para.style.display="flex";
            para.style.flexDirection="column";
            para.style.alignItems="center";
            para.style.justifyContent="center";
            para.style.height="";
            para.style.width="100%";
            para.style.marginInline="auto";
            para.style.paddingInline="3px";
            if(img){
                img.style.float="none";
                img.style.marginInline="auto";
            }
        }
        const divCont=document.createElement("div");
        divCont.className=this.divCont_class;
        divCont.style.cssText=this.divCont_css;
        divCont.id=`divCont-div-${rand}`;
        if(selRowCol){
            const {colId}=selRowCol as selRowColType;
            const idValue:idValueType={eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)};
            this._modSelector.dataset.upDateIdValue({target:para,idValues,idValue});
            idValues.push({eleId,id:"colId",attValue:parent.id});
            idValues.push({eleId,id:"dFlex",attValue:"true"});
            idValues.push({eleId,id:"colId",attValue:colId});
            this._modSelector.dataset.insertcssClassIntoComponents({
                target:divCont,
                level:"element",
                loc:"flexbox",
                id:"divContId",
                headerType:undefined,
                type:"shapeOutside"

            });
        }else{
            idValues.push({eleId,id:"parentId",attValue:parent.id});
            idValues.push({eleId,id:"noFlex",attValue:"true"});
            idValues.push({eleId,id:"divContId",attValue:divCont.id});
            this._modSelector.dataset.insertcssClassIntoComponents({
                target:divCont,
                level:"element",
                loc:"htmlElement",
                id:"divContId",
                headerType:undefined,
                type:"shapeOutside"

            });
        };
        idValues.push({eleId,id:"shapeOutside",attValue:"shapeOutside"});
        idValues.push({eleId,id:"type",attValue:"shapeOutside"});
        if(parent_id) idValues.push({eleId,id:"parent_id",attValue:parent_id});
            //APPENDING ATTRIBUTES TO PARA
            const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
            this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
            //appending attributes for BOT FLEX AND NON FLEX TARGET ELEMENT
            const {idValues:retidValues3}=this._modSelector.dataset.generateIdValues({
               target:para,
               idValues,
               rowColEle:element,
               level:"element",
               loc:selRowCol? "flexbox":"htmlElement",
               index:selRowCol ? (element as element_selType).order : (element as elementType).placement
               
             });
             idValues=retidValues3
            
             //appending attributes for BOT FLEX AND NON FLEX TARGET ELEMENT
            idValues.map(kat=>{
                if(kat.attValue && kat.eleId===eleId){
                    IDKeys.map(kv=>{
                        if(kv.id===kat.id && kv.key){
                            para.setAttribute(kv.key,kat.attValue)
                        }
                    });
                }
            });
            if(less400){
            para.classList.add("flex-column");
            para.style.display="flex";
            para.style.flexDirection="column";
            para.style.alignItems="center";
            para.style.justifyContent="center";
            para.style.height="";
            para.style.width="100%";
            para.style.marginInline="auto";
            para.style.paddingInline="3px";
            if(img){
                img.style.float="none";
                img.style.marginInline="auto";
            }
        }
            
            divCont.appendChild(para);
            Header.cleanUpByID(divCont,"setAttributes");
            Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
            Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
            if((element as elementType).placement){
                const ele=element as elementType
                this._modSelector.dataset.populateElement({target:para,level:"element",loc:"htmlElement",selRowColEle:ele,idValues,clean:true});
                const arrDivCont:arrDivContType={divCont,target:para,placement:ele.placement,ele,isNormal:false,chart:null,sel:null};
                para.removeAttribute("contenteditable");
                return Promise.resolve(arrDivCont) as Promise<arrDivContType>;
            }else{
                
                const ele=element as element_selType
                this._modSelector.dataset.populateElement({target:para,level:"element",loc:"flexbox",selRowColEle:ele,idValues,clean:true});
                const arrDivCont:arrDivContType={divCont,target:para,placement:ele.order,ele,isNormal:false,sel:null,chart:null};
                para.removeAttribute("contenteditable");
                return Promise.resolve(arrDivCont) as Promise<arrDivContType>;

            }
    };


     showShapeOutside({parent,element,idValues,selRowCol}:{parent:HTMLElement,element:elementType|element_selType,idValues:idValueType[],selRowCol:selRowColType|null}):arrDivContType{
        //FOR HTMLELEMENT ON REFRESH; HTMLELEMENT THEN GOES TO EDIT
        // console.log("element:SH",element)//works
        const rand=Math.floor(Math.random()*1000);
        const parent_id= parent ? parent.id:null;
        let ele:elementType|element_selType={} as elementType|element_selType;
        // console.log("element",element);//NOT GENERATING FROM HTMLELEMENT BECAUSE TYPE!===shapeOutside
        const para=document.createElement("p");
        para.id=element.eleId;
        para.innerHTML=element.inner_html;
        para.style.cssText=element.cssText;
        const eleId=para.id;
       
        const divCont=document.createElement("div");
        divCont.className=this.divCont_class;
        divCont.style.cssText=this.divCont_css;
        divCont.id=`divCont-div-${rand}`;
        if(selRowCol){
            const {rowId,colId}= selRowCol as selRowColType
            ele=element as element_selType;
            divCont.setAttribute("data-placement",`${ele.order}-A`);
            idValues.push({eleId,id:"colId",attValue:parent.id});
            idValues.push({eleId,id:"dFlex",attValue:"true"});
            idValues.push({eleId,id:"colId",attValue:colId});
            idValues.push({eleId,id:"rowId",attValue:rowId});
        }else{
            ele=element as elementType;
            divCont.setAttribute("data-placement",`${ele.placement}-A`);
            idValues.push({eleId,id:"noFlex",attValue:"true"});
            idValues.push({eleId,id:"divContId",attValue:divCont.id});
        }
         //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
         this._modSelector.dataset.populateElement({
            target:para,
            level:"element",
            selRowColEle:element,
            loc: selRowCol ?  "flexbox":"htmlElement",
            idValues,
            clean:false

        });
        
       //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
       const attrTest=attrEnumArrTest(element);
       const isCircle=(attrTest && attrTest.id==="shapeOutsideCircle")? attrTest.value:undefined;
       const isSquare=(attrTest && attrTest.id==="shapeOutsideSquare")? attrTest.value:undefined;
       const isPolygon=(attrTest && attrTest.id==="shapeOutsidePolygon")? attrTest.value:undefined;
        const img=para.querySelector("img") as HTMLImageElement;
        img.setAttribute("contenteditable","false");
        img.setAttribute("is-shapeoutside","true");
        img.src=element.img || this.logo;
        img.alt="ww.ablogroom.com";
        if(element.imgKey){
            const url=this._service.getFreeBgImageUrl({imgKey:element.imgKey});
            const getWidth=Number(getComputedStyle(img).getPropertyValue("width").split("px")[0]);
            img.src=imageLoader({src:url,width:getWidth,quality:90});
            img.alt=element.imgKey;
            idValues.push({eleId,id:"imgKey",attValue:element.imgKey});
          }
        
        if(parent_id) idValues.push({eleId,id:"parent_id",attValue:parent_id});
            if(isCircle){
                idValues.push({eleId,id:"shapeOutsideCircle",attValue:String(isCircle)});
                img.id="shape-outside-circle";
            }else if(isSquare){
                idValues.push({eleId,id:"shapeOutsideSquare",attValue:isSquare});
                img.id="shape-outside-square";
            }else if(isPolygon){
                idValues.push({eleId,id:"shapeOutsidePolygon",attValue:isPolygon});
                divCont.id=this.divCont_class + "-" + "poly";
            };
            //--------COMPLETE:=> ADD SETATTRIBUTES TO SHOWSHAPEOS/////////////
            const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
            this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
            //APPENDING ATTRIBUTES TO PARA
            this._modSelector.dataset.populateElement({
                target:para,
                selRowColEle:element,
                idValues,level:"element",
                loc:selRowCol ? "flexbox":"htmlElement",
                clean:false

            });
       
        //appending attributes for BOT FLEX AND NON FLEX TARGET ELEMENT
        para.innerHTML =element.inner_html;
        divCont.appendChild(para);
       
        this._modSelector.editElement({target:para,idValues,selRowCol});
        
        Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
        
            this.setAttributes({column:parent,divCont,target:para,idValues,selRowCol});//ID=shape-outside-${rand}
           
                    divCont.addEventListener("click",async(e:MouseEvent)=>{
                        if(e){
                           
                            ShapeOutside.cleanUpByID(para,"setAttributes");
                            para.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            this.removeMainElement({parent,divCont,target:para,idValues,selRowCol});
                        }
                    });
        if(!selRowCol){
            const ele=element as elementType
            this._modSelector.dataset.populateElement({target:para,level:"element",loc:"htmlElement",selRowColEle:ele,idValues,clean:false});
            const arrDivCont:arrDivContType={divCont,target:para,placement:ele.placement,ele,isNormal:false,sel:null,chart:null};
            return arrDivCont
        }else{
            const ele=element as element_selType
            this._modSelector.dataset.populateElement({target:para,level:"element",loc:"flexbox",selRowColEle:ele,idValues,clean:false});
            const arrDivCont:arrDivContType={divCont,target:para,placement:ele.order,ele,isNormal:false,sel:null,chart:null};
            return arrDivCont
        }
    };
    //FROM SIDEBAR BTN
    
    sidebarMain({parent,idValues}:{parent:HTMLElement,idValues:idValueType[]}){
        
       
        parent.style.position="relative";
        parent.style.zIndex="";
        const popup=document.createElement("div");
        popup.style.cssText="margin:auto;position:absolute;background-color:white;border-radius:18px;box-shadow:1px 1px 12px 1px black,-1px -1px 12px 1px black;padding:1rem;z-index:200;height:padding-inline:2rem;display:flex;justify-content:center;align-items:center;flex-direction:column;background-color:#0a2351;height:20vh;";
        popup.id="popup-shape-outside";
        
        popup.style.left="15%";
        popup.style.right="15%";
        const title=document.createElement("h6");
        title.className="text-light text-center my-2 display-6 lean";
        title.textContent="image-text-merger:shape-outside";
        const shapeOutsideCircle=IDKeyValuepairs.find(kv=>(kv.id==="shapeOutsideCircle"));
        const shapeOutsideSquare=IDKeyValuepairs.find(kv=>(kv.id==="shapeOutsideSquare"));
        const shapeOutsidePolygon=IDKeyValuepairs.find(kv=>(kv.id==="shapeOutsidePolygon"));
        const circle=shapeOutsideCircle ? shapeOutsideCircle.key :"data-shapeoutside-circle";
        const square=shapeOutsideSquare ? shapeOutsideSquare.key :"data-shapeoutside-circle";
        const polygon=shapeOutsidePolygon ? shapeOutsidePolygon.key :"data-shapeoutside-polygon";
        const arr:{id:idEnumType|undefined,name:string,desc:string,value:string}[]=[
            {id:undefined,name:"select",desc:"please select below",value:"select"},
            {id:"shapeOutsideCircle",name:"circular image",desc:"circular image embedded within your paragraph",value:circle},
            {id:"shapeOutsideSquare",name:"square image",desc:"square image embedded within your paragraph",value:square},
            {id:"shapeOutsidePolygon",name:"polygon image",desc:"polgon image embedded within your paragraph",value:polygon},

        ]
        const select=document.createElement("select");
        select.style.cssText="padding:0.5rem;padding-inline:1rem;margin:auto;border-radius:12px;position:relative;display:flex;flex-direction:column;align-items:center;";
        popup.appendChild(title);
        popup.appendChild(select);
        parent.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{top:"50%",left:"10%",right:"10%"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{top:"60%",left:"0%",right:"0%"}});
        //REMOVE ELEMENT
        const xdiv=document.createElement("div");
        xdiv.style.cssText="position:absolute;top:0%;right:0%;background-color:white;border-radius:50%;transform:translate(-5px,-5px);padding:1px;"
        FaCreate({parent:xdiv,name:FaCrosshairs,cssStyle:{color:"black",fontSize:"18px"}});
        popup.appendChild(xdiv);
        //REMOVE ELEMENT
        Misc.fadeIn({anchor:popup,xpos:100,ypos:50,time:600});
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{inset:"180% 5% 60% 5%"}});
        Misc.matchMedia({parent:popup,maxWidth:500,cssStyle:{inset:"220% 0% 60% 0%"}});
        arr.forEach(item=>{
            const stringThis=JSON.stringify(item)
            const option=document.createElement("option");
            option.innerHTML=`<span style="color:purple;font-size:18px;">${item.name}</span><span> :=> ${item.desc}</span>`;
            option.value=stringThis;
            select.appendChild(option);
        });
        select.onchange=(e:Event)=>{
            if(e){
                const parseThis=(e.currentTarget as HTMLSelectElement).value;
                const {id,value}=JSON.parse(parseThis) as {id:idEnumType,name:string,desc:string,value:string}
                if(value){
                    const rand=Math.floor(Math.random()*1000);
                    const eleId=`${id}-${rand}`;
                    this.element={...this.element,attr:id,eleId,type:"shapeOutside"};
                    idValues.push({eleId,id:"shapeOutside",attValue:"true"});
                    idValues.push({eleId,id:"type",attValue:"shapeOutside"});
                    idValues.push({eleId,id:id,attValue:id});
                    this.addShapeOutside({parent,sel:null,rowEle:null,colEle:null,element:this.element,idValues})
                    Misc.fadeOut({anchor:popup,xpos:100,ypos:50,time:420});
                    setTimeout(()=>{parent.removeChild(popup);},400);
                }
            }
        };
        xdiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:20,ypos:100,time:395});
                setTimeout(()=>{parent.removeChild(popup)},400);
            }
        });
    };



   async addShapeOutside({parent,sel,rowEle,colEle,element,idValues}:{
    parent:HTMLElement,
    sel:selectorType|null,
    rowEle:rowType|null,
    colEle:colType|null,
    element:elementType|element_selType,
    idValues:idValueType[]

   }){
    const selRowCol:selRowColType|null=(sel && rowEle && colEle) ? {selectorId:sel.eleId,rowId:rowEle.eleId,colId:colEle.eleId}: null;
    if(selRowCol){
        sel=sel as selectorType;
        rowEle=rowEle as rowType;
        colEle=colEle as colType
        const eleId=element.eleId;
       idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
    };
        const rand=Math.floor(Math.random()*1000);
        const less900=window.innerWidth < 900;
        const less800=window.innerWidth < 800;
        const less500=window.innerWidth < 500;
        const less400=window.innerWidth < 400;
        element={...element,type:"shapeOutside"};
        const typeTest=typeEnumArrTest(element);
        const attrTest=attrEnumArrTest(element);
        if(!typeTest) element.type="shapeOutside";
        const para=document.createElement("p");
        para.id=element.eleId;
        const eleId=para.id;
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        const cssPara="position:relative;padding:0.35rem;";
        
        para.style.lineHeight="2.27rem;";
        const divCont=document.createElement("div");
        divCont.id=`div-cont-${rand}`;
        divCont.className=this.divCont_class;
        divCont.style.cssText=this.divCont_css;
        idValues.push({eleId,id:"parentId",attValue:parent.id});
        idValues.push({eleId,id:"type",attValue:"shapeOutside"});
        idValues.push({eleId,id:"divContId",attValue:divCont.id});
        idValues.push({eleId,id:"backgroundImg",attValue:"true"});
        if(selRowCol){
            const idValue={eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)} as idValueType;
            this._modSelector.dataset.upDateIdValue({target:para,idValue,idValues})
        }
        const isCircle=attrTest && attrTest.id==="shapeOutsideCircle" ? attrTest:undefined;
        const isSquare=attrTest && attrTest.id==="shapeOutsideSquare" ? attrTest:undefined;
        const isPolygon=attrTest && attrTest.id==="shapeOutsidePolygon" ? attrTest:undefined;
    if(selRowCol) idValues.push({eleId,id:"colId",attValue:parent.id});
    if(selRowCol) idValues.push({eleId,id:"dFlex",attValue:"true"});
    if(!selRowCol) idValues.push({eleId,id:"parent_id",attValue:parent.id});
    if(!selRowCol) idValues.push({eleId,id:"noFlex",attValue:"true"});
        const img=document.createElement("img");
        const imgCss="max-width:350px;width:100%;float:left !important;margin-block:1rem;";
        img.src=this.logo;
        img.alt="ww.ablogroom.com";
        if(isCircle){
            idValues.push({eleId,id:isCircle.id as idEnumType,attValue:isCircle.value});
            para.style.cssText=cssPara +"width:100%;";
            img.style.cssText=imgCss + "margin-right:4rem;shape-outside:circle();border-radius:50%;";
            img.id="shape-outside-circle";
            img.style.width=less900 ? ( less400 ? "300px":"320px"):"330px";
            img.style.aspectRatio="1 / 1";
            para.appendChild(img);
        }else if(isSquare){
            idValues.push({eleId,id:isSquare.id as idEnumType,attValue:isSquare.value});
            para.style.cssText=cssPara +"width:100%;";
            img.style.cssText=imgCss ;
            img.id="shape-outside-square";
            img.style.width=less900 ? ( less400 ? "300px":"320px"):"330px";
            img.style.aspectRatio="1 / 1";
            para.appendChild(img);
        }else if(isPolygon){
            idValues.push({eleId,id:isPolygon.id as idEnumType,attValue:isPolygon.value});
            divCont.style.marginBlock="2rem";
            divCont.style.paddingBlock="1rem";
            divCont.id=this.divCont_class + "-" + "poly";
            para.style.cssText=cssPara;
            const imgDiv=document.createElement("div");
            imgDiv.setAttribute("contenteditable","false");
            imgDiv.id="polygon";
            imgDiv.id="polygon";
            const css="border-radius:10%;position:relative;float:left !important;margin-right:5rem;margin-block:3rem;transform:rotate(45deg);shape-outside:polygon(50% 0%,75% 25%,100% 50%,100% 50%,100% 50%,100% 50%, 90% 50%,80% 60%,70% 70%, 50% 80%,50% 80%,45% 85%,40% 90%,35% 100%);";
            imgDiv.style.cssText=css;
            imgDiv.style.marginBottom="7rem";
            imgDiv.style.overflow="hidden";
            imgDiv.style.aspectRatio="1 / 1";
            imgDiv.style.width=less900 ? (less800 ? (less500 ? (less400 ? "200px":"220px"):"275px"):"300px"):"350px";
            const img=document.createElement("img");
            img.style.cssText="width:100%;border:none;transform:rotate(-45deg);";
            img.style.aspectRatio="1 / 1";
            img.src=this.logo;
            img.id="shape-outside-polygon";
            img.alt="ww.ablogroom.com";
          
            imgDiv.appendChild(img);
            para.appendChild(imgDiv);
            Misc.matchMedia({parent:imgDiv,maxWidth:920,cssStyle:{width:"300px",height:"300px"}});
            Misc.matchMedia({parent:imgDiv,maxWidth:800,cssStyle:{width:"275px",height:"275px"}});
            Misc.matchMedia({parent:imgDiv,maxWidth:500,cssStyle:{width:"220px",height:"220px"}});
            Misc.matchMedia({parent:imgDiv,maxWidth:400,cssStyle:{width:"200px",height:"200px"}});
        }
       
        //appending attributes for BOT FLEX AND NON FLEX TARGET ELEMENT
        para.innerHTML +=`ENTER YOUR TEXT HERE=> ${Misc.wordGen(100)}`;
        divCont.appendChild(para);
        parent.appendChild(divCont);
        Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
            //POPUP PROVIDING OPTIONS TO CLIENT
            this.setAttributes({column:parent,divCont,target:para,idValues,selRowCol});//ID=shape-outside-${rand}
             //POPUP PROVIDING OPTIONS TO CLIENT
            this.elementAdder({target:para,sel,rowEle,colEle,element,idValues}).then(async(res)=>{
                if(res ){
                    const isFlex=(sel && rowEle && colEle);
                    if(!(isFlex)){
                       
                        const ele=res.ele as unknown as elementType;
                        divCont.setAttribute("data-placememt",`${ele.placement}-A`);
                        res.target.setAttribute("data-placememt",`${ele.placement}-A`);
                    }else{
                        const ele=res.ele as unknown as element_selType;
                        divCont.setAttribute("data-placememt",`${ele.order}-A`);
                        res.target.setAttribute("data-placememt",`${ele.order}-A`);
                    };
                    divCont.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                        
                            res.target.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            this.removeMainElement({parent,divCont,target:res.target,idValues,selRowCol});
                            
                           
                        }
                    });
                    this._modSelector.editElement({target:res.target,idValues,selRowCol});
                }
            });

    };


    async elementAdder({target,sel,rowEle,colEle,element,idValues}:{
        target:HTMLElement,
        sel:selectorType|null,
        rowEle:rowType|null,
        colEle:colType|null,
        idValues:idValueType[]
        element:elementType|element_selType
    }): Promise<{
        target: HTMLElement;
        flex: flexType | null;
        ele: element_selType;
        idValues:idValueType[];
    } | {
        target: HTMLElement;
        sel:selectorType|null;
        rowEle:rowType|null;
        colEle:colType|null;
        ele: elementType | element_selType;
        idValues:idValueType[];
    } | undefined>{
        const blog=this._modSelector.blog;
        const eleId=target.id;
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
        const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
        const node=target.nodeName.toLowerCase();
        const placement=this.placement;
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        if(sel && rowEle && colEle){
            sel=sel as selectorType;
            rowEle=rowEle as rowType;
            colEle=colEle as colType;
            const selRowCol:selRowColType={selectorId:sel.eleId,rowId:rowEle.eleId,colId:colEle.eleId}
            idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
            target.setAttribute("is-element","true");
            //ADDING ATTRIBUTES
            const {rows}=this._modSelector.checkGetRows({select:sel});
            rowEle.cols = rowEle.cols.map(col=>{
                if(colEle && sel){
                    if(col.eleId===colEle.eleId){
    
                        const ID=col.elements ? col.elements.length:0;
                        const check= col.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
                            if(node && !check){
                            element=element as element_selType
                                element={
                                    ...element,
                                    id:ID ,
                                    selectorId:sel.id,
                                    name:node,
                                    class:cleaned.join(" "),
                                    eleId:target.id,
                                    cssText:target.style.cssText,
                                    inner_html:target.innerHTML,
                                    col_id:col.id,
                                    order:ID,
                                    
                                } as element_selType;
                                //LOADING ATTRIBUTES INTO ELEMENT, BELOW
                                idValues.push({eleId,id:"eleOrder",attValue:String(ID)});
                                getEleIds.map(kat=>{
                                    if(kat.id==="imgKey"){
                                         element.imgKey=kat.attValue;
                                     }
                                 });
                                //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                                const {idValues:retIdValues2}=this._modSelector.dataset.coreDefaultIdValues({
                                    target,
                                    level:"element",
                                    sel,
                                    row:rowEle,
                                    col:colEle,
                                    ele:element,
                                    loc:"flexbox",
                                    idValues,
                                    clean:false
                                });
                                //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                                this._modSelector.dataset.populateElement({
                                    target,
                                    selRowColEle:element,
                                    level:"selector",
                                    loc:"flexbox",
                                    idValues:retIdValues2,
                                    clean:false
                                    });
                                idValues=retIdValues2;
                                idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId})
                                //----------//---POPULATING ATTRIBUTES TO TARGET------\\-----///
                                
                                
                                //RE-ASSIGNMENT HAS NEW INFO FROM TARGET
                                // ele={...newEle} as element_selType
                                //RE-ASSIGNMENT HAS NEW INFO FROM TARGET
                                col.elements.push(element)
                                // console.log("ELEMENT ADDER:INSIDE",col.elements)
                            }
    
                    }

                }
                return col;
            });
            const newRows= rows.map(row=>{
                    if(rowEle && row.eleId===rowEle.eleId){
                        row=rowEle;
                    }
                return row;
            });
            const strRows=JSON.stringify(newRows);
            sel={...sel,rows:strRows} as selectorType;
            this._modSelector.selectors = this._modSelector.selectors.map(select=>{
                    if(select.eleId===(sel as selectorType).eleId){
                        select=sel as selectorType;
                    }
                return select;
            });
            
            return Promise.resolve({target,ele:element as element_selType,sel:sel as selectorType,rowEle:rowEle as rowType,colEle:colEle as colType,idValues}) as Promise<{target:HTMLElement,ele:element_selType,sel:selectorType,rowEle:rowType,colEle:colType,idValues:idValueType[]}>;
        }else{
            element=element as elementType
            const ID=this.elements.length;
            const imgKey=target.getAttribute("imgKey");
            const check=this.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
                if(node && !check){
                    element={
                        ...element,
                        id:ID ,
                        blog_id:blog.id,
                        selectorId:undefined,
                        placement:placement,
                        name:node,
                        class:cleaned.join(" "),
                        eleId:target.id,
                        imgKey:imgKey ||undefined,
                        cssText:target.style.cssText,
                        inner_html:target.innerHTML,
                    };
                   
                    //LOADING ATTRIBUTES INTO TARGET ELEMENT, BELOW
                    idValues.push({eleId,id:"numEles",attValue:String(ID)});
                    idValues.push({eleId,id:"elementId",attValue:target.id});
                    idValues.push({eleId,id:"elePlacement",attValue:String(this.placement)});
                    idValues.push({eleId,id:"ele_id",attValue:String(ID)});
                     //LOADING ATTRIBUTES INTO ELEMENT, BELOW
                     idValues.push({eleId,id:"eleOrder",attValue:String(ID)});
                     getEleIds.map(kat=>{
                       if(kat.id==="imgKey"){
                            element.imgKey=kat.attValue;
                        }
                    });
                     //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                     const {idValues:retIdValues2}=this._modSelector.dataset.coreDefaultIdValues({
                         target,
                         level:"element",
                         sel:null,
                         row:null,
                         col:null,
                         ele:element,
                         loc:"htmlElement",
                         idValues,
                        clean:false
                     });
                     this._modSelector.dataset.populateElement({
                        target,
                        selRowColEle:element,
                        level:"element",
                        loc:"htmlElement",
                        idValues:retIdValues2,
                        clean:false
                       });
                     idValues=retIdValues2;
                    //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///

                    //RE-ASSIGNMENT HAS NEW INFO FROM TARGET
                    this._modSelector.elements.push(element);
                    this.elements=this._modSelector.elements;
                    this.placement= placement + 1;
                    idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId})
                    return Promise.resolve({target,ele:element as elementType,sel:null,rowEle:null,colEle:null,idValues}) as Promise<{target:HTMLElement,ele:elementType,sel:null,rowEle:null,colEle:null,idValues:idValueType[]}>;
                    
                }
        }

    };

   
  
    removeMainElement({parent,divCont,target,idValues,selRowCol}:{
        parent:HTMLElement,
        divCont:HTMLElement,
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }){
        divCont.style.position="relative";
        divCont.style.zIndex="";
        const isActive=([...target.classList as any] as string[]).includes("isActive");
        
        if(isActive){
            const css="position:absolute;transform:translate(-2px,-3px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:0px;right:0px;";
            divCont.classList.add("position-relative");
            const xIconDiv=document.createElement("div");
            xIconDiv.setAttribute("contenteditable","false");
            xIconDiv.setAttribute("is-icon","true");
            xIconDiv.className="xIconDiv-shapeOutside delete-popup";
            xIconDiv.id=`xIconDiv-shapeOutside`;
            xIconDiv.style.cssText=`${css}`;
            if(selRowCol){
                xIconDiv.style.transform="translate(-2px,-15px)";
                xIconDiv.style.left="10%";
                xIconDiv.style.right="";
            }else{
                xIconDiv.style.transform="translate(-2px,-3px)";
                xIconDiv.style.right="0px";
            }
            const cssStyle={background:"inherit",fontSize:"inherit"};
            FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
            divCont.appendChild(xIconDiv);
           
            xIconDiv.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                   
                    this._modSelector.removeElement({target,idValues,selRowCol}).then(async(res)=>{
                        if(res){
                            idValues=res.idValues;
                                Misc.message({parent,msg:`removed : ${res.ele.eleId}`,type_:"success",time:800});
                                if((res.ele as elementType).type){
                                    const ele=res.ele as elementType;
                                    this._modSelector.shiftPlace(ele.placement);
                                }
                        }
                    });
                    Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:500});
                    setTimeout(()=>{
                        parent.removeChild(divCont);
                    },498);
                    
                    
                    //resetting buttons
                    Main.initMainBtns();
                }
            });
         }else{
            Header.cleanUpByID(divCont,"xIconDiv-shapeOutside")
         }
    };




    setAttributes({column,divCont,target,idValues,selRowCol}:{
        column:HTMLElement,
        divCont:HTMLElement,
        target:HTMLParagraphElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }){
        
        column.style.zIndex="";
        divCont.style.zIndex="";
       divCont.classList.add("isActive");
       target.classList.add("isActive");
        ShapeOutside.cleanUpByID(divCont,"setAttributes");
        divCont.style.position="relative";
        const anchor=document.createElement("div");
        anchor.setAttribute("is-popup","true");
        anchor.id="setAttributes";
        anchor.classList.add("popup");
        anchor.style.cssText="position:absolute;display:flex;flex-direction:column;align-items:center;z-index:2;";
        if(!selRowCol){
            anchor.style.top="85%";
            anchor.style.left="30%";
            anchor.style.right="30%";

        }else{
            anchor.style.width="fit-content";
            anchor.style.inset="80% 0% 0% 0%";
            anchor.style.height="auto";
        }
        const label=document.createElement("label");
        label.textContent="attributes";
        label.className="text-center text-primary";
        if(divCont.id===`${this.divCont_class}-poly`){
            anchor.style.top="100%";
            anchor.style.left="35%";
            anchor.style.right="35%";
        }
        const form=document.createElement("form");
        form.id="form";
        form.style.cssText="margin:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;"
        const select=document.createElement("select");
        select.id="shapeOutside-select";
        label.setAttribute("for",select.id);
        form.appendChild(label);
        select.style.cssText="margin:auto;display:flex;justify-content:center;align-items:center;";
        select.selectedIndex=0;
        this.attributes.map(item=>{
            const option=document.createElement("option");
            option.textContent=item.name;
            if(item.ele){
                option.style.backgroundColor="#13274F";
                option.style.color="white";
            }else{
                option.style.color="black";
                option.style.backgroundColor="#C0C0C0";
            }
            option.value=JSON.stringify(item);
            select.appendChild(option);
        });
        form.appendChild(select);
        anchor.appendChild(form);
        divCont.appendChild(anchor);
        select.selectedIndex=0;
        select.onchange=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                const item=JSON.parse(value as string) as attributeType;
                if(item.ele){
                    if(item.name==="imgSize"){
                       
                        divCont.classList.add("isActive");
                        target.classList.add("isActive");
                        this.selectAdjustSize({column,divCont,target,idValues,selRowCol});
                    }else if(item.name==="color"){
                        
                        divCont.classList.add("isActive");
                        target.classList.add("isActive");
                        this.selectParaColor({column,divCont,target,idValues,selRowCol});
                    }else if(item.name==="upload image"){
                       
                        divCont.classList.add("isActive");
                        target.classList.add("isActive");
                        ([...target.children as any] as HTMLElement[]).map(child=>{
                            if(child && child.nodeName==="IMG"){
                                const img=child as HTMLImageElement;
                                return this.uploadImage({column,divCont,para:target,img,idValues,selRowCol});

                            }
                        });
                    }
                }else if(item.attr && item.attr !=="remove"){
                    const subCont=([...target.children as any] as HTMLElement[]).find(child=>(child.nodeName !=="IMG"));
                    this.selectChangeAttribute({divCont,subCont,target,key:item.attr,idValues,selRowCol});
                }else{
                   
                    ShapeOutside.cleanUpByID(divCont,"setAttributes");
                    ShapeOutside.cleanUpByID(target,"selectChangeAttribute");
                    return 
                }
            }
        }
    }

    selectAdjustSize({column,divCont,target,idValues,selRowCol}:{
        column:HTMLElement,
        divCont:HTMLElement,
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }){
        //para level
        const {isJSON}=Header.checkJson(column.getAttribute("flex"));
        if(isJSON){
            this.adjustImgSize({column,target,idValues,selRowCol});
        }else{
            this.adjustImgSize({column:divCont,target,idValues,selRowCol});
        }
        
    }
    selectParaColor({column,divCont,target,idValues,selRowCol}:{
        column:HTMLElement,
        divCont:HTMLElement,
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }){
        const popup=document.createElement("div");
        popup.setAttribute("is-popup","true");
        popup.style.cssText="position:absolute;display:flex;flex-direction:column;align-items:center;";
        const form=document.createElement("form");
        form.style.cssText="display:flex;justify-content:center;flex-direction:column;align-items:center;gap:0.5rem;background-color:white;box-shadow:1px 1px 12px 1px black,-1px -1px 12px 1px black;width:100%;border-radius:15px;";
        const {input,label}=Nav.inputComponent(form);
        buttonReturn({parent:form,text:"submit",bg:Nav.btnColor,color:"white",type:"submit"});
        label.textContent="color";
        input.name="color";
        input.type="color";
        input.id="color";
        popup.style.top="20%";
        popup.style.left="35%";
        popup.style.right="35%";
        popup.style.width="clamp(200px,250px,300px)";
        popup.appendChild(form);
        column.appendChild(popup);
        input.onchange=(e:Event)=>{
            if(e){
                const color=(e.currentTarget as HTMLInputElement).value;
                target.style.color=color;
            }
        };
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const color=formdata.get("color") as string;
                if(color){
                    target.style.color=color;
                    this._modSelector.updateElement({target,idValues,selRowCol}).then(async(res)=>{
                        if(res){
                            Misc.message({parent:column,type_:"success",time:600,msg:"saved"});
                        }
                    });
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        column.removeChild(popup)
                    },399);
                }
                ShapeOutside.cleanUpByID(target,"setAttributes");
            }
        });
    }
    selectChangeAttribute({divCont,subCont,target,key,idValues,selRowCol}:{
        divCont:HTMLElement,
        subCont:HTMLElement|undefined,
        target:HTMLElement,
        key:string,
        idValues:idValueType[],
        selRowCol:selRowColType|null
    }){
        target.style.zIndex="0";
       
        ShapeOutside.cleanUpByID(target,"selectChangeAttribute");
        const popup=document.createElement("div");
        popup.setAttribute("is-popup","true");
        popup.id="selectChangeAttribute";
        popup.style.cssText="position:absolute;display:flex;flex-direction:column;align-items:center;z-index:200";
        popup.style.width="clamp(250px,300px,400px)";
        if(selRowCol){
            popup.style.top="0%";
        }else{
            popup.style.top="40%";
        }
        const form=document.createElement("form");
        form.style.cssText="display:flex;justify-content:center;flex-direction:column;align-items:center;gap:0.5rem;background-color:white;box-shadow:1px 1px 12px 1px black,-1px -1px 12px 1px black;width:100%";
        const {input,label}=Nav.inputComponent(form);
        const submit=buttonReturn({parent:form,text:"submit",bg:Nav.btnColor,color:"white",type:"submit"});
        label.textContent=key;
        submit.disabled=false;
        popup.appendChild(form);
        //DELETE
        const xdiv=document.createElement("div");
        xdiv.style.cssText="background-color:black;border-radius:50%;padding:1px;position:absolute:top:0%;right:0%;transform.translate(3px,3px);"
        FaCreate({parent:xdiv,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"18px"}});
        form.appendChild(xdiv);
        
        //DELETE
        switch(true){
            case key==="lineHeight":
            input.name="lineHeight";
            input.type="number";
            input.min="16";
            input.max="40";
            input.value="16"
            input.id=key;
            label.setAttribute("for",key)
            popup.style.top="";
            popup.style.left="35%";
            popup.style.right="35%";
            divCont.appendChild(popup);
            Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
            break;
            case key==="fontFamily":
            this.font_family({column:divCont,target,idValues,selRowCol});
            break;
            case key==="marginRight":
            input.name="marginRight";
            input.type="number";
            input.min="1";
            input.max="130";
            input.value="1"
            input.id=key;
            label.setAttribute("for",key);
            popup.style.top="";
            popup.style.left="35%";
            popup.style.right="35%";
            divCont.appendChild(popup);
            Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
            break;

        }
        input.onchange=(e:Event)=>{
            if(e){
                submit.disabled=false;
            }
        };
        xdiv.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:399});
                setTimeout(()=>{
                    ShapeOutside.cleanUpByID(divCont,"selectChangeAttribute");
                },400);
            }
        };
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                divCont.classList.add("isActive");
                 target.classList.add("isActive");
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const lineHeight=formdata.get("lineHeight");
                const marginRight=formdata.get("marginRight");
                switch(true){
                    case lineHeight !==null:
                        target.style.lineHeight=`${Number(lineHeight)}px`;
                        setTimeout(()=>{this._modSelector.updateElement({target:target,idValues,selRowCol})},0);
                        ShapeOutside.cleanUpByID(divCont,"selectChangeAttribute");
                        divCont.classList.toggle("isActive");
                        target.classList.toggle("isActive");
                    
                    return;
                    case marginRight !==null:
                        target.style.marginRight=`${Number(marginRight)}px`;
                        divCont.style.marginRight=`${Number(marginRight)}px`;
                               target.classList.toggle("isActive");
                               divCont.classList.toggle("isActive");
                        setTimeout(()=>{this._modSelector.updateElement({target,idValues,selRowCol})},0);
                        ShapeOutside.cleanUpByID(divCont,"selectChangeAttribute");
                     
                    return;
                    
                    default:
                        ShapeOutside.cleanUpByID(target,"setAttributes");
                           return  ShapeOutside.cleanUpByID(target,"setAttributes");
                }
            }
        });
       
        
    }
    font_family({column,target,idValues,selRowCol}:{
        column:HTMLElement,
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null
    }){
        const parent= window.innerWidth <900 ? column : target;
        const fontFamilys=Misc.fontFamilys;
            const popup=document.createElement("div");
            popup.setAttribute("is-popup","true");
            popup.style.cssText="position:absolute;width:clamp(200px,250px,300px);margin-inline:auto;height:auto;padding:1rem;border-radius:12px;box-shadow:1px 1px 12px 1px black;background-color:white;z-index:200;";
            popup.id="popup";
            popup.style.top="20%";
            popup.style.left="40%";
            popup.style.right="40%";
            const form=document.createElement("form");
            form.style.cssText="margin-inline:auto;margin-block:1rem;width:100%;height:auto;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:1rem;width:100%;";
            const formGrp=document.createElement("div");
            formGrp.style.cssText="margin-inline;auto;display:flex;flex-direction:column;align-items:center;width:100%;"
            formGrp.className="group-control";
            const label=document.createElement("label");
            label.textContent="font-family";
            label.className="text-primary text-center my-1";
            label.setAttribute("for","fontFamily");
            formGrp.appendChild(label);
            const cssStyle={position:"relative",width:"clamp(200px,250px,275px)",marginInline:"auto"};
            const {select}=Misc.fontFamilySelect({parent:formGrp,cssStyle,selects:fontFamilys});
            select.id="fontFamily";
            select.name="fontFamily";
            select.className="form-control";
            select.onchange=(e:Event)=>{
                if(e){
                    const value=(e.currentTarget as HTMLSelectElement).value;
                    target.style.fontFamily=value;
                }
            }
            form.appendChild(formGrp);
            buttonReturn({parent:form,text:"submit",type:"submit",bg:"black",color:"white"});
            popup.appendChild(form);
            parent.appendChild(popup);
            Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
            Misc.matchMedia({parent:popup,maxWidth:820,cssStyle:{top:"30%",left:"15%",right:"15%"}});
            Misc.matchMedia({parent:popup,maxWidth:420,cssStyle:{top:"30%",left:"5%",right:"5%"}});
            form.onsubmit=(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    const getValue=new FormData(e.currentTarget as HTMLFormElement);
                    if(getValue){
                        const fontFamily=getValue.get("fontFamily") as string;
                        parent.style.fontFamily=fontFamily;

                        const idValue:idValueType={eleId:target.id,id:"text",attValue:"true"}
                        this._modSelector.dataset.upDateIdValue({target,idValues,idValue});

                        Misc.fadeOut({anchor:popup,xpos:40,ypos:100,time:400});
                        setTimeout(()=>{parent.removeChild(popup);},398);
                        setTimeout(()=>{
                            return this._modSelector.updateElement({target,idValues,selRowCol});
                        },0);
                        ShapeOutside.cleanUpByID(target,"setAttributes");
                        return  ShapeOutside.cleanUpByID(target,"setAttributes");
                    }
                }
            };

    }

    adjustImgSize({column,target,idValues,selRowCol}:{
        column:HTMLElement,
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }){
        const idValue:idValueType={eleId:target.id,id:"img",attValue:"true"}
                this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
        ([...target.children as any] as HTMLElement[]).map(child=>{
            if(child && (child.nodeName==="IMG" && child.id!=="shape-outside-polygon")){
                const img_or_poly=child as HTMLImageElement | HTMLElement;
                this.adjustSize({column,target,img_or_poly,idValues,selRowCol});
                
            }else if(child){
                ([...child.children as any] as HTMLElement[]).map(ch=>{
                    if(ch && ch.nodeName==="IMG"){
                        const img=ch as HTMLImageElement;
                        this.adjustSize({column,target,img_or_poly:img,idValues,selRowCol});
                    }
                });
            }
        });
    }
    //parent:adjustImgSize() :GENERATED FROM POPUP LIS
    adjustSize({column,target,img_or_poly,idValues,selRowCol}:{
        column:HTMLElement,
        target:HTMLElement,
        img_or_poly:HTMLImageElement|HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null
    }){
        ShapeOutside.cleanUpByID(target,"adjustSize");
        column.style.zIndex="0";
        target.classList.add("isActive");
        (target.parentElement as HTMLElement).classList.add("isActive");
        ShapeOutside.cleanUpByID(target,"popup");
        target.style.position="relative";
        const popup=document.createElement("div");
        popup.id="adjustSize";
        popup.style.cssText="position:absolute;width:150px;height:auto;background:white;display:flex;flex-direction:column;justify-content:center;align-items:center; padding:5px;box-shadow:1px 1px 6px 1px black";
        popup.style.width="clamp(250px,300px,350px)";
        popup.style.top="2%";
        popup.style.left="25%";
        popup.style.right="25%";
        popup.style.width="clamp(250px,300px,350px)";
        const {input,label}=Nav.inputComponent(popup);
        label.textContent="adjust image";
        input.id="number";
        input.type="number";
        input.name="number";
        input.value="75";
        input.min="75";
        input.max="350";
        label.setAttribute("for","number");
        column.appendChild(popup)
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{left:"15%",right:"15%"}});
        Misc.matchMedia({parent:popup,maxWidth:410,cssStyle:{left:"5%",right:"5%"}});
      
        const btn=buttonReturn({parent:popup,text:"okay",bg:Nav.btnColor,color:"white",type:"button"});
        input.addEventListener("input",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value;
                img_or_poly.style.width=`${value}px`;
                img_or_poly.style.height=`${value}px`;
            }
        });
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                target.classList.remove("isActive");
                (target.parentElement as HTMLElement).classList.remove("isActive");
                Misc.growOut({anchor:popup,opacity:0,scale:0,time:400});
                const idValue:idValueType={eleId:target.id,id:"text",attValue:"true"}
                this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                setTimeout(()=>{
                    ShapeOutside.cleanUpByID(column,"adjustSize");

                },395);
                setTimeout(()=>{this._modSelector.updateElement({target,idValues,selRowCol})},0);
                ShapeOutside.cleanUpByID(target,"setAttributes");
                (target.parentElement as HTMLElement).classList.toggle("isActive");
                target.classList.toggle("isActive");
                return  ShapeOutside.cleanUpByID(target,"setAttributes");
            };
        });
    };



   async uploadImage({column,divCont,para,img,idValues,selRowCol}:{
        column:HTMLElement,
        divCont:HTMLElement,
        para:HTMLParagraphElement,
        img:HTMLImageElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null
    }){
        //polygon
       
        const user=this._user.user;
        if(!(user.email && user.id)){
            Nav.navHeader=document.querySelector("header#navHeader") as HTMLElement;
            await this._service.signIn(Nav.navHeader);
        }
        if(selRowCol){
            column.classList.add("coliIsActive");
        }
        divCont.style.position="relative";
        divCont.style.zIndex="";
        // ShapeOutside.cleanUpByID(para,"popup")
            if(divCont && para && img){
                const eleId=para.id;
                const popup=document.createElement("div");
                popup.setAttribute("is-popup","true");
                popup.style.cssText="position:absolute;width:300px;height:300px;inset:0%;z-index:200";
                popup.id="uploadImage-popup";
                popup.classList.add("popup");
                const form=document.createElement("form");
                form.name="form";
                form.id="imgUpload";
                //cancel form
                const xdiv=document.createElement("div");
                xdiv.id="delete-key"
                xdiv.style.cssText="position:absolute:top:0%;right:0%;transform:translate(-5px,5px);z-index:200;";
                xdiv.style.position="absolute";
                xdiv.style.top="0%";
                xdiv.style.right="0%";
                FaCreate({parent:xdiv,name:FaCrosshairs,cssStyle:{color:"red",fontSize:"16px"}});
                //cancel form
                form.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;background-color:white;position:relative;"
                const {label,input}=Nav.inputComponent(form);
                label.textContent="upload an image";
                input.id="file";
                input.name="file";
                input.type="file";
                label.setAttribute("for","file");
                const {button}=Misc.simpleButton({anchor:form,text:"submit",bg:this.btnColor,color:"white",type:"submit",time:400});
                form.appendChild(xdiv);
                popup.appendChild(form);
                if(selRowCol){
                    column.appendChild(popup);
                }else{
                    divCont.appendChild(popup);
                }
                input.onchange=(e:Event)=>{
                    if(e){
                        button.disabled=false;
                    }
                };
                
                form.addEventListener("submit",async(e:SubmitEvent)=>{
                    if(e){
                        e.preventDefault();
                        const user=this._user.user
                        const formdata=new FormData(e.currentTarget as HTMLFormElement);
                        const file=formdata.get("file") as File;
                        if(!file){
                            if(selRowCol){
                             return Misc.message({parent:column,msg:`could not find file`,type_:"error",time:700});}else{
                                return Misc.message({parent:para,msg:`could not find file`,type_:"error",time:700});
                             };
                            }
                        const url=URL.createObjectURL(file as File);
                        const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                        img.src=url;
                        const idValue:idValueType={eleId,id:"imgKey",attValue:Key};
                        this._modSelector.dataset.upDateIdValue({target:para,idValues,idValue});
                        await this._modSelector.updateElement({target:para,idValues,selRowCol}).then(async(res)=>{
                            if(res ){

                                this._service.uploadfreeimage({formdata}).then(async(res)=>{
                                    if(res){
                                        
                                        img.setAttribute("imgKey",res.Key);
                                        idValues.push({eleId,id:"imgKey",attValue:Key});
                                        const getImgWidth=parseInt(window.getComputedStyle(img).getPropertyValue("width").split("px")[0]);
                                        img.src=imageLoader({src:res.img,width:getImgWidth,quality:75});
                                        img.alt=res.Key
                                       await this._modSelector.updateElement({target:para,idValues,selRowCol}).then(async(res)=>{
                                            if(res){
                                                Misc.message({parent:column,msg:" saved",type_:"success",time:900});
                                            }
                                        });
                                    }
                                });
                            }
                        })
                        Misc.blurIn({anchor:img,blur:"20px",time:700});
                        setTimeout(()=>{
                            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                            if(selRowCol){
                                setTimeout(()=>{column.removeChild(popup);},390);
                              
                            }else{
                                setTimeout(()=>{divCont.removeChild(popup);},390);
                            }
                         
                            divCont.classList.toggle("isActive");
                            para.classList.toggle("isActive");
                           
                        },380);
                       

                       
                    }
                },true);
                xdiv.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                        if(selRowCol){
                            setTimeout(()=>{column.removeChild(popup);},380);
                        }else{
                            setTimeout(()=>{divCont.removeChild(popup);},380);
                        }
                    }
                });
               
                
            };
    };



    setShapeOutside(target:HTMLElement|null,btn:HTMLButtonElement){
        //This is located in Main for btn activities
        if(!target) return;
        const isActive=([...target.classList as any] as string[]).includes("isActive");
        if(isActive){
            //attribute=>btn.id
            target.classList.toggle(btn.id);

        }
    }
    //ADD IMAGE TO shapeOutside
   async shapeOutsideInjectImage(item:{para:HTMLElement,imgKey:string}){
        const {para,imgKey}=item;
        if(imgKey){
           await this._service.getSimpleImg(imgKey).then(async(res:gets3ImgKey|null)=>{
                if(res){
                    const isCircle=para.getAttribute("data-shapeOutside-circle");
                    const isSquare=para.getAttribute("data-shapeOutside-square");
                    const isPolygon=para.getAttribute("data-shapeOutside-polygon");
                    if(isCircle || isSquare){

                        ([...para.children as any] as HTMLElement[]).map(child=>{
                            if(child && child.nodeName==="IMG"){
                                const img=child as HTMLImageElement;
                                img.src=res.img;
                                img.setAttribute("imgKey",res.Key);
                                Misc.blurIn({anchor:img,blur:"20px",time:500});
                            }
                        });
                    }else if(isPolygon){
                        const img=para.querySelector("img");
                        if(img){
                            img.src=res.img;
                            img.setAttribute("imgKey",res.Key);
                            Misc.blurIn({anchor:img,blur:"20px",time:500});
                        }
                    }
                }
            });
        }
    }
   
   static polyNumCalc(polyNum:string,perc:number):string{
        const xy_perc:string[]=polyNum.split(",");
       
        let xy_num:{x:number,y:number}[]=[];
        xy_perc.map(_xy_perc=>{
            let x=parseInt(_xy_perc.split(" ")[0].split("%")[0]);
            let y=parseInt(_xy_perc.split(" ")[1].split("%")[0]);
            xy_num.push({x,y});
            x=Math.round(x*perc);y=Math.round(y*perc);
            return `${x}% ${y}%`;
        });
        xy_num=xy_num.map((xy,index)=>{
            if(index>0){
                if(isNaN(xy.x)){
                    xy.x=xy_num[index-1].x;
                }
                if(isNaN(xy.y)){
                    xy.y=xy_num[index-1].y;
                }
            }
            return xy;
        });
        return xy_num.map(xy=>(`${xy.x}% ${xy.y}%`)).join(",")
    }
   
   
    selectFileFormComponent({parent,idValues,selRowCol}:{
        parent:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }){
        //RETURN IMG WITH NEW URL.CRETAED IMAGE FILE LOADED
        parent.style.position="relative";
        parent.style.zIndex="";
        const arr=["select","upload"];
        const select=document.createElement("select");
        select.style.cssText="width:fit-content;padding:0.5rem;position:absolute";
        select.style.zIndex="200";
        select.style.top="20%";
        select.style.left="15%";
        select.style.right="15%";
        parent.appendChild(select);
        arr.forEach(item=>{
            const option=document.createElement("option");
            option.value=item;
            option.textContent=item;
            select.appendChild(option);
        });
        select.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                if(value==="upload"){
                    parent.removeChild(select);
                    const form=document.createElement("form");
                    form.style.cssText="displayflex;flex-direction:column;align-items:center;justify-content:center;position:absolute;inset:0% 30% 40% 30%;background:white;z-index:200;border-radius:20px;box-shadow:1px 1px 10px black;padding:1.5rem;height:20vh";
                    const {input,label,formGrp}=Nav.inputComponent(form);
                    label.textContent="file upload"
                    formGrp.style.cssText="margin:auto;display:flex;flex-direction:column;";
                    input.type="file";
                    input.name="file";
                    input.accept="image/png image/jpg image/PNG image/JPG";
                    const div=document.createElement("div");
                    div.style.cssText="display:flex;justify-content:center;align-items:center;";
                    const submit=buttonReturn({parent:form,text:"upload",color:"white",bg:Nav.btnColor,type:"submit"});
                    const cancel=buttonReturn({parent:form,text:"cancel",color:"white",bg:"#00BFFF",type:"button"});
                    submit.disabled=true;
                    div.appendChild(cancel);
                    div.appendChild(submit);
                    form.appendChild(div);
                    parent.appendChild(form);
                    input.addEventListener("change",(e:Event)=>{
                        if(e){
                            submit.disabled=false;
                        }
                    });
                    form.addEventListener("submit",(e:SubmitEvent) =>{
                        if(e){
                            e.preventDefault();
                            const formdata=new FormData(e.currentTarget as HTMLFormElement);
                            const file=formdata.get("file") as File;
                            if(!file)return;
                            const filename=file.name as string;
                            const urlImg=URL.createObjectURL(file);
                            ([...parent.children as any] as HTMLElement[]).map(child=>{
                                if(child && child.nodeName==="IMG"){
                                    const img=child as HTMLImageElement;
                                    img.src=urlImg;
                                    img.alt=filename;
                                    Misc.blurIn({anchor:img,blur:"20px",time:700});
                                    this._user.refreshImageShow({parent,image:img,formdata,selRowCol,idValues});
                                    Misc.growOut({anchor:form,scale:0,opacity:0,time:400});
                                    if(!form) return
                                    setTimeout(()=>{form.remove()},398);
                                }
                            });
                            parent.removeChild(form);
                        }
                    });
                    cancel.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            Misc.fadeOut({anchor:form,xpos:100,ypos:100,time:400});
                            setTimeout(()=>{parent.removeChild(form);},398)
                            ShapeOutside.cleanUpByID(parent,"setAttributes");
                            return  ShapeOutside.cleanUpByID(parent,"setAttributes");
                        }
                    });
                    
                }
                select.selectedIndex=1;
            }
        });
        
    };
    retAttr(item:{strArr:string[]}):string|undefined{
        const {strArr}=item;
        let retStr:string|undefined;
        const shapeArr=["data-shapeOutside-circle","data-shapeOutside-square","data-shapeOutside-polygon"]
       shapeArr.map(str=>{
        retStr=strArr.find(sh=>(sh===str));
       });
       return retStr
    };


    static cleanUpByNodeName(parent:HTMLElement,node:string){
        ([...parent.children as any] as HTMLElement[]).map(child=>{
            if(child && child.nodeName===node){
                parent.removeChild(child);
            }
        });
    }
    static cleanUpByID(parent:HTMLElement,id:string){
        const children=([...parent.children as any] as HTMLElement[]).filter(child=>(child.id===id));
        
        children.map(child=>{
            if(child){
                parent.removeChild(child)
            }
        });
       
    }
    static cleanUp(parent:HTMLElement){
        while(parent.firstChild){
            parent.removeChild(parent.lastChild as ChildNode);
        }
    }
}
export default ShapeOutside;
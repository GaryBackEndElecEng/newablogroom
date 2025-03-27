import {flexType,element_selType,colType,rowType,selectorType,columnAttrType,colAttrType, blogType, elementType} from "./Types";
import ModSelector from "./modSelector";
import {FaTrash,FaCrosshairs} from "react-icons/fa";
import {FaCreate} from "@/components/common/ReactIcons";
import Service from "@/components/common/services";
import Header from "./header";
import Main from '@/components/editor/main';
import Flexbox from "./flexBox";
import User from "../user/userMain";
import { btnType, button, buttonRetDisable, buttonReturn } from "../common/tsFunctions";
import Misc, { fadeOutType } from "../common/misc";
import Nav from "../nav/headerNav";
import ShapeOutside from "./shapeOutside";
import Dataset from "../common/dataset";
import {idValueType, selRowColType, selRowType, typeEnumType } from "@/lib/attributeTypes";
import { attrEnumArr, attrEnumArrTest, typeEnumArr, typeEnumArrTest } from "../common/lists";



class CustomSetup{
    bgColor:string;
    btnColor:string;

    constructor(private _modSelector:ModSelector,private _service:Service){
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
    }
    columnSetup(selector:selectorType,row:HTMLElement):{retRow:HTMLElement,input:HTMLInputElement,formGrp:HTMLElement,btn:HTMLElement}{
        this._modSelector.header=selector;
        row.classList.add("flex-wrap");
        const formGrp=document.createElement("div");
        formGrp.className="form-group flexCol justify-center align-center";
        formGrp.setAttribute("data-form-group","true");
        formGrp.style.cssText="inset:0% 0% 0% 70%;z-index:200;width:30%;position:absolute";
        const label=document.createElement("label");
        label.className="form-control"
        label.textContent="how many columns";
        const input=document.createElement("input");
        input.className="form-control"
        input.type="number";
        input.name="number";
        input.min="0";
        input.max="4";
        const btn=document.createElement("button");
        btn.className="btnStyle1";
        btn.style.backgroundColor=this.btnColor;
        btn.type="button";
        btn.textContent="submit";
        formGrp.appendChild(label);
        formGrp.appendChild(input);
        formGrp.appendChild(btn);
        row.appendChild(formGrp);
        return {retRow:row,input,formGrp,btn}
    }
    
    imgSetup(parent:HTMLElement):{retParent:HTMLElement,form:HTMLFormElement,formContainer:HTMLElement}{
        parent.style.position="relative";
        const formContainer=document.createElement("div");
        formContainer.className="flexCol box-shadow";
        formContainer.style.cssText="position:absolute;top:10%;right0;max-width:150px;height:150px;width:fit-content;z-index:0;font-size:12px;background-color:rgba(255,125,255,0.5);z-index:200;";
        const form=document.createElement("form");
        form.className="m-auto d-flex flex-column gap-1 form-group";
        form.setAttribute("data-form-group","true");
        form.style.cssText="max-width:150px;font-size:inherit;display:flex;flex-direction:column;align-items:center;z-index:0;font-size:inherit;border-radius:16px;";
        const label=document.createElement("label");
        label.textContent="upload logo";
        label.className="form-control text-primary";
        label.style.cssText="font-size:inherit;";
        const input=document.createElement("input");
        input.type="file";
        input.name="file";
        input.style.cssText="font-size:inherit;"
        input.accept="image/jpg image/png image/JPG image/PNG";
        input.className="form-control";
        const btn_:btnType={
            parent:form,
            text:"submit",
            bg:"#00BFFF",
            color:"white",
            type:"submit"
        }
        form.appendChild(label);
        form.appendChild(input);
        button(btn_);
        const div=document.createElement("div");
        div.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-5px,5px),border-radius:50%;z-index:200;"
        FaCreate({parent:div,name:FaCrosshairs,cssStyle:{color:"red"},})
        form.appendChild(div);
        formContainer.appendChild(form);
        parent.appendChild(formContainer);
        ModSelector.modAddEffect(formContainer);
        div.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                const fade:fadeOutType={
                    anchor:formContainer,
                    xpos:50,
                    ypos:100,
                    time:600
                }
                Misc.fadeOut(fade);
                setTimeout(()=>{
                    parent.removeChild(formContainer);
                },580);
            }
        });
        return {retParent:parent,formContainer,form}
    }
    formSetup(col:HTMLElement):{retCol:HTMLElement,formGrp:HTMLDivElement,input:HTMLInputElement,btn:HTMLButtonElement}{
        const formGrp=document.createElement("div");
        formGrp.setAttribute("data-form-group","true");
        formGrp.className="form-group d-flex flex-column justify-content-center align-items-center";
        formGrp.style.cssText="position:absolute;inset:0;z-index:100;background:white;"
        const label=document.createElement("label");
        label.className="form-control text-info text-sm text-center";
        label.textContent="press up/down to adjust";
        const input=document.createElement("input");
        input.type="number";
        input.min="60";
        input.max="200";
        input.name="height";
        input.className="form-control text-sm text-primary";
        const btn=document.createElement("button");
        btn.className="btn btn-sm text-light btn-info btnStyle2";
        btn.textContent="submit";
        btn.type="submit";
        formGrp.appendChild(label);
        formGrp.appendChild(input);
        formGrp.appendChild(btn);
        col.appendChild(formGrp);
        return {retCol:col,formGrp,input,btn}
    }
};






class CustomHeader {
    phone:string="./images/phone.png";
    link:string="./images/link.png";
    mail:string="./images/mail.png";
    flex:flexType;
    isRefreshed:boolean;
    bgColor="#0C090A";
    btnColor:string;
    customSetup:CustomSetup;
    flexbox:Flexbox;
    divCont_css:string;
    divCont_class:string;
    _selector:selectorType;
   
    static nameValueAttrs:columnAttrType[]=[
        {id:0,name:"select",value:undefined,attr:undefined,remove:undefined,level:undefined},
        {id:1,name:"image",value:"img",level:"element"},
        {id:1,name:"h1",value:"h1",level:"element"},
        {id:2,name:"h2",value:"h2",level:"element"},
        {id:3,name:"h3",value:"h3",level:"element"},
        {id:4,name:"h4",value:"h4",level:"element"},
        {id:5,name:"p",value:"p",level:"element"},
        {id:6,name:"logo",value:"img",level:"element"},
        {id:7,name:"bg-image",attr:"bg-image",level:"col"},
        {id:8,name:"rm-bg-image",level:"col"},
        {id:8,name:"quote",value:"blockquote",level:"element"},
        {id:9,name:"ul",value:"ul",level:"element"},
        {id:10,name:"link",value:"a",level:"element"},
        {id:11,name:"h5",value:"h5",level:"element"},
        {id:12,name:"h6",value:"h6",level:"element"},
        {id:13,name:"line",value:"hr",level:"element"},
        {id:14,name:"vertical-line",value:"div",level:"element"},
        {id:15,name:"span",value:"span",level:"element"},
        {id:16,name:"email",value:"a",level:"element"},
        {id:17,name:"insert-tel",value:"a",level:"element"},
        {id:18,attr:"bg-color",name:"bg-color",level:"col"},
        {id:18,attr:"set-even-height",name:"set-even-height",level:"col"},
        {id:19,name:"adjust-img-size",attr:"adjust-img-size",level:"element"},
        {id:20,name:"pretty-font",attr:"pretty-font",level:"element"},
        {id:21,name:"flex-normal",attr:"flex-normal",level:"col"},
        {id:22,name:"flex-static",attr:"flex-static",level:"col"},
        {id:23,name:"flex-double",attr:"flex-double",level:"col"},
        {id:24,name:"skew-45",attr:"skew-45",level:"element"},
        {id:25,name:"skew-15",attr:"skew-15",level:"element"},
        {id:26,name:"flex-row",attr:"flexRow",level:"col"},
        {id:27,name:"flex-col",attr:"flexCol",level:"col"},
        {id:28,name:"box-shadow",attr:"box-shadow-md1",level:"element"},
        {id:29,name:"round",attr:"round",level:"element"},
        {id:30,name:"shadow-round",attr:"box-shadow-round",level:"element"},
        {id:31,name:"flex-1/4",attr:"flex-quarter",level:"col"},
        {id:32,name:"flex-1/2",attr:"flex-half",level:"col"},
        // {id:33,name:"flex-3/4",attr:"flex-three-quarter",level:"col"},
        {id:34,name:"flex-default",attr:"flex-default",level:"col"},
        {id:35,name:"bg-row-color",attr:"background-row",remove:false,level:"row"},
        {id:36,name:"bg-row-image",attr:"bg-row-image",remove:false,level:"row"},
        {id:37,name:"bg-row-height",attr:"bg-row-height",remove:false,level:"row"}

    ];


    static columnAttrs:columnAttrType[]=[
        {id:0,name:"select",attr:"select",remove:false},
        {id:1,name:"remove-drop-down",attr:"remove",remove:false},
        {id:2,name:"flex-normal",attr:"flex-normal",remove:false},
        {id:3,name:"flex-static",attr:"flex-static",remove:false},
        {id:4,name:"flex-double",attr:"flex-double",remove:false},
        {id:5,name:"flex-row",attr:"flexRow",remove:false},
        {id:6,name:"flex-col",attr:"flexCol",remove:false},
        {id:7,name:"flex-1/4",attr:"flex-quarter",remove:false},
        {id:8,name:"flex-3/4",attr:"flex-three-quarter",remove:false},
        {id:9,name:"flex-1/2",attr:"flex-half",level:"col"},
        {id:10,name:"bg-color",attr:"bg-color",remove:false},
        {id:11,name:"flex-col-normal",attr:"flexCol-normal",remove:false},
        {id:12,name:"header-height",attr:"header-height",remove:false},
        {id:13,name:"flex-default",attr:"flex-default",remove:false}

    ];

    static columnPartition:columnAttrType[]=[{id:1,name:"flex-normal",attr:"flex-normal",remove:false},{id:2,name:"flex-static",attr:"flex-static",remove:false},{id:3,name:"flex-double",attr:"flex-double",remove:false},{id:4,name:"flex-row",attr:"flexRow",remove:false},{id:5,name:"flex-col",attr:"flexCol",remove:false},{id:6,name:"flex-1/4",attr:"flex-quarter",remove:false},{id:7,name:"flex-1/2",attr:"flex-half",level:"col"},{id:8,name:"flex-3/4",attr:"flex-three-quarter",remove:false},{id:9,name:"flex-col-normal",attr:"flexCol-normal",remove:false},{id:10,name:"flex-default",attr:"flex-default",remove:false}];

    public mainHeader:HTMLElement;
    constructor(private _modSelector:ModSelector,private _service:Service,public header:Header,private _user:User,public _shapeOutside:ShapeOutside){
        
        this.mainHeader=document.createElement("section");
        this.mainHeader.id="sectionHeader";
        this.mainHeader.className = ModSelector.mainHeader_class;
        this.mainHeader.classList.add("custom-header");
        this.mainHeader.style.cssText = ModSelector.mainHeader_css;
        this.phone="./images/phone.png";
        this.link="./images/link.png";
        this.mail="./images/mail.png";
        this.isRefreshed=false;
        this.flex={} as flexType;
        this.customSetup= new CustomSetup(this._modSelector,this._service);
        this.flexbox=new Flexbox(this._modSelector,this._service,this._user,this._shapeOutside);
        this.btnColor=this._modSelector.btnColor;
        this.bgColor=this._modSelector._bgColor;
        this.divCont_css="display:flex;flex-direction:column;justify-content:center;width100%;align-items:center;padding:1rem;margin-inline:3rem;";
        this.divCont_class="eleContainer";
        this.bgColor=this._modSelector._bgColor;
        this._selector={
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
            headerType:"custom",
        }
       
    }
//-----------------GETTERS SETTERS-------------------//
get selector(){
    return this._selector;
}
set selector(selector:selectorType){
    this._selector=selector;
}
//-----------------GETTERS SETTERS-------------------//

//EDIT INJECTION AFTER REFRESH
    showCustHdrSelector(parent:HTMLElement,selector:selectorType,isRefresh:boolean,idValues:idValueType[]){
        //THIS TAKES BLOG DATA FROM LOCALSTORAGE("BLOG") AND DISPLAYS WITHS ATTRIBUTES TO CHANGE IF REFRESHED
        this.flex={} as flexType;
        this.isRefreshed=isRefresh;
        
        parent.style.width=`100%`;
        if(selector.name){
            const eleId=selector.eleId;
            selector={...selector,headerType:"custom"};
            this.selector={...selector,headerType:"custum"};
            //RESERVE PLACEMENT ADJACENT TO TEXTAREA
            const getHeader=document.getElementById("mainHeader") as HTMLElement;
            if(getHeader && getHeader as HTMLElement){
                if(getHeader.nodeName==="HEADER"){
                Main.cleanUp(parent)
                }
            }
            const innerCont=document.createElement(selector.name);
            innerCont.id=selector.eleId;
            innerCont.className=selector.class;
            innerCont.setAttribute("name",selector.name);
            innerCont.setAttribute("data-selector-id",`${selector.id}`);
                innerCont.setAttribute("is-header","true");
            innerCont.setAttribute("data-selector-id",selector.eleId);
            innerCont.style.cssText=selector.cssText;
            idValues.push({eleId:innerCont.id,id:"selectorId",attValue:String(innerCont.id)});
            idValues.push({eleId:innerCont.id,id:"selector_id",attValue:String(selector.id)});
            idValues.push({eleId:innerCont.id,id:"isHeader",attValue:"true"});
            //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
           const {idValues:retIdValues1}=this._modSelector.dataset.coreDefaultIdValues({
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
           idValues=retIdValues1
           idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
           this._modSelector.dataset.populateElement({target:innerCont,selRowColEle:selector,idValues,level:"selector",loc:"flexbox",clean:false});
           //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////


            const {rows}=this._modSelector.checkGetRows({select:selector});
            rows.toSorted((a,b)=>{if(a.order < b.order) return -1;return 1}).map(async(row_,index)=>{
                const eleId=row_.eleId;
                const selRow={selectorId:selector.eleId,rowId:row_.eleId} as selRowType;
                    const row=document.createElement("div");
                    row.id=row_.eleId;
                    idValues.push({eleId,id:"selectorId",attValue:innerCont.id});
                    idValues.push({eleId,id:"rowId",attValue:eleId});
                    idValues.push({eleId,id:"ID",attValue:eleId});
                    idValues.push({eleId,id:"isRow",attValue:"true"});
                    idValues.push({eleId,id:"row",attValue:String(index)});
                    idValues.push({eleId,id:"rowOrder",attValue:String(row_.order)});
                    row.className=row_.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                    row.style.cssText=row_.cssText;
                    row.setAttribute("name",row_.name);
                    row_= await this._modSelector.removeBlob({target:row,rowColEle:row_,loc:"flexbox",level:"row",idValues,selRowCol:null,selRow}) as rowType;
                    if(row_.imgKey){
                        
                        idValues.push({eleId,id:"backgroundImg",attValue:row_.imgKey});
                        row.setAttribute("data-backgroundimage","true");
                        const check=this._service.checkFreeImgKey({imgKey:row_.imgKey as string});
                       
                        if(check){
                            const url=this._service.getFreeBgImageUrl({imgKey:row_.imgKey as string});
                            row.style.backgroundImage=`url(${url})`;
                        }
                    
                    }
                   

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
                    idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
                    this._modSelector.dataset.populateElement({target:row,selRowColEle:row_,idValues,level:"row",loc:"flexbox",clean:false});
                    //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
                    await Promise.all(row_.cols.toSorted((a,b)=>{if(a.order < b.order) return -1;return 1}).map(async(col_,index)=>{
                        const selRowCol={...selRow,colId:col_.eleId} as selRowColType;
                        const col=document.createElement("div");
                        col.id=col_.eleId;
                        const eleId=col.id;
                        
                      
                        col_=await this._modSelector.removeBlob({target:col,rowColEle:col_,loc:"flexbox",level:"col",idValues,selRowCol,selRow:null}) as colType;
                        if(col_.imgKey){
                            col.setAttribute("data-backgroundimage","true");
                            idValues.push({eleId,id:"backgroundImg",attValue:"true"});
                            const check=this._service.checkFreeImgKey({imgKey:col_.imgKey as string});
                            if(check){
                                const url=this._service.getFreeBgImageUrl({imgKey:col_.imgKey as string});
                                col.style.backgroundImage=`url(${url})`;
                            }
                            
                        }
                      
                        idValues.push({eleId,id:"colId",attValue:eleId});
                        idValues.push({eleId,id:"col_id",attValue:String(col_.id)});
                        idValues.push({eleId,id:"colOrder",attValue:String(col_.order)});
                      
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
                        this._modSelector.dataset.populateElement({target:col,selRowColEle:col_,idValues,level:"col",loc:"flexbox",clean:false});
                        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
                      
                        //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
                        col.style.cssText=`${col_.cssText}`;
                        col.className=col_.class;
                        this.customElementChoices({parent:col,sel:selector,rowEle:row_,colEle:col_,idValues});
                        col.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                col.classList.toggle("coliIsActive");
                            
                            }
                        });
                        col_.elements.toSorted((a,b)=>{if(a.order < b.order) return -1;return 1}).map((element,index)=>{
                            
                            const eleId=element.eleId;
                            idValues.push({eleId,id:"eleOrder",attValue:String(element.order)});
                            idValues.push({eleId,id:"ele_id",attValue:String(element.id)});
                            idValues.push({eleId,id:"numEles",attValue:String(index)});
                            this.headerElementBuilder({
                                column:col,
                                element,
                                idValues,
                                selector,
                                row:row_,
                                col:col_
                            });

                        });
                        row.appendChild(col);
                    }));
                    innerCont.appendChild(row);
                    // console.log(innerCont)//works
                });
                this.removeHeader({parent,target:innerCont,idValues});
            parent.appendChild(innerCont);
        }
    };


     //INJECTOR:Main.container: THIS FEEDS Main._mainHeader the DOC
     editorHeader({parent}:{parent:HTMLElement}){
        Header.cleanUpByID(parent, "sectionHeader");
        parent.style.position = "relative";
        Main._mainHeader =this.mainHeader
        // ADD INSERT HEADER FROM EDIT
        // ADD INSERT HEADER FROM EDIT
        parent.appendChild(this.mainHeader)
     };


//MAIN CUSTOM INJECTION (SELECTED FROM SIDEBAR)-parent=this._main.mainHeader
  async  customHeader(parent:HTMLElement,isRefresh:boolean){
        //THIS IS THE INJECTION POINT FOR CUSTOM HEADER DESIGN.THIS IS INTEGRATED INTO showCustHdrSelector if REFRESHED
        parent.classList.remove("normal-header");
        parent.classList.add("custom-header");
        this.isRefreshed=isRefresh;
        this.selector={...this.selector,
            header:true,
            footer:false,
            headerType:"custom",
            placement:0
        }
        let idValues=this._modSelector.dataset.idValues;
        const rand=Math.floor(Math.random()*1000);
        const blog=this._modSelector.blog;
        //marking imgkeys as delete
        this._service.markHeaderImgKey(blog).then(async(res)=>{
            if(res){
                Misc.message({parent,msg:`${JSON.stringify(res)}`,type_:"success",time:700});
            }
        });
        if(parent){
            parent.style.cssText="margin-inline:0px;width:100%;";
            //RESERVE PLACEMENT ADJACENT TO TEXTAREA
            const getHeader=document.getElementById("mainHeader") as HTMLElement;
            if(getHeader && getHeader as HTMLElement){
                if(getHeader.nodeName==="HEADER"){
                Main.cleanUp(parent)
                }
            }
            const mainHeader=document.createElement("header");
            mainHeader.id=`mainHeader-${rand}`;//THIS IS THE SELECTORS FIXED ID
            const eleId=mainHeader.id;
            mainHeader.setAttribute("name","header");
            idValues.push({eleId,id:"selectorId",attValue:mainHeader.id});
            idValues.push({eleId,id:"placement",attValue:String(0)});
            this.selector={...this.selector,eleId,}
            mainHeader.style.cssText="margin-block:0px;align-items:center;width:100%;min-height:15vh;";
            mainHeader.classList.add("my-0");
            await this.selectorAdder({parent,target:mainHeader,selector:this.selector,idValues}).then(async(sel)=>{
                if(sel.target && sel.selector && sel.colsTop){
                    idValues=sel.idValues;
                    const row=document.createElement("div");
                    row.id=`custom_header_row-${rand}`;
                    const rowId=row.id;
                    row.setAttribute("is-row","true");
                    idValues.push({eleId,id:"rowId",attValue:eleId});
                   
                   this._modSelector.dataset.insertcssClassIntoComponents({
                        target:row,
                        level:"row",
                        headerType:"custom",
                        id:"rowId",
                        type:"customHeader",
                        loc:"flexbox"
                    });
                   
                    idValues.push({eleId:rowId,id:"ID",attValue:eleId});
                    idValues.push({eleId:rowId,id:"numCols",attValue:String(sel.colsTop)});
                    idValues.push({eleId:rowId,id:"name",attValue:"div"});
        
                   
        
                   await this._modSelector.rowAdder({target:row,selectEle:sel.target,idValues,selector:sel.selector}).then(async(rw)=>{
                       if(rw.selectEle && rw.idValues && rw.rowEle && rw.sel){
                        idValues=rw.idValues;
                        console.log("outside:after row:selector",sel.selector)//WORKS HAS ROW
                           this.selectColunms({parent:rw.target,sel:rw.sel,rowEle:rw.rowEle,idValues});
                       }
                   });//works
                    this.removeHeader({parent,target:sel.target,idValues});
                    sel.target.appendChild(row);
                    // parent.appendChild(mainHeader);//NO NEED selectorAdder does this
                    Misc.fadeIn({anchor:mainHeader,xpos:50,ypos:100,time:600});

                }
            });
            
            
        }
     }

     //PARENT customHeader()
   
     
     selectColunms({parent,sel,rowEle,idValues}:{parent:HTMLElement,sel:selectorType,idValues:idValueType[],rowEle:rowType}){
        //THIS INCORPORATES USERS SELECTION ON number of COLUMNS

        const {retRow,input,btn,formGrp}=this.customSetup.columnSetup(sel,parent);
        btn.addEventListener("click",async(e:MouseEvent)=>{
            if(e){
             
               const value=(input as HTMLInputElement).value;
                const nums=parseInt(value) as number;
            // console.log("SELECTCOLUMNS:SELECTOR:selector.rows",selector.rows);//WORKS
            const newColattr:colAttrType={id:0,T:nums,B:0,selector_id:sel.id};
            sel.colAttr[0]=newColattr
            this._modSelector.selectors=this._modSelector.selectors.map(_sel=>{
                    if(_sel.eleId===sel.eleId){
                        _sel=sel;
                    }
                    return sel;
                });
                //GENERATES AND ARRAY
                // console.log("SELECTCOLUMNS:SELECTOR:AFTER colAttre:selector.rows",selector.rows)//WORKS
              
               
                Array.from(Array(nums).keys()).map(async(num)=>{
                   
                    const col=document.createElement("div");
                    const rand=Math.floor(Math.random()*1000);
                    col.id=`custom_column-${num}-${rand}`;
                    const eleId=col.id;
                    const numCol=`${12/nums}`;
                    idValues.push({eleId,id:"colId",attValue:eleId});
                    idValues.push({eleId,id:"numCols",attValue:String(nums)});
                    //adding css/class(s)
                     this._modSelector.dataset.insertcssClassIntoComponents({
                        target:col,
                        level:"col",
                        headerType:"custom",
                        id:"colId",
                        loc:"flexbox",
                        type:"customHeader"

                    });
                    col.classList.add(`col-md-${numCol}`);
                            //saving it
                            parent.appendChild(col)
                           
                       
                            await this.colAdder({parent,target:col,idValues,sel,rowEle}).then(async(cl)=>{
                                if(cl ){
                                parent.appendChild(cl.target);
                                idValues=cl.idValues
                                
                                this.customElementChoices({parent:cl.target,sel:cl.sel,rowEle:cl.rowEle,colEle:cl.colEle,idValues});
                                col.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        col.classList.toggle("coliIsActive");
                                    }
                                });
                            }
                           });
                   
                });
                Header.removeTarget(retRow,formGrp);
            }
        });
       
     }
    
    
     async selectorAdder({parent,target,selector,idValues}:{parent:HTMLElement,target:HTMLElement,selector:selectorType,idValues:idValueType[]}):Promise<{target:HTMLElement,selector:selectorType,idValues:idValueType[],colsTop:number,colsBot:number}>{
        //THIS ADDS SELECTOR CONTAINER FOR ROWS/COLS, APPENDS THE TARGET TO THE NEW HEADER,REFRESHES SELECTOR.HEADER,ADDS IT TO LOCAL && RETURN INSERTION STYLES TO THE NEW HEADER 
        //INSERTS CLASSNAME AND CSS INTO TARGET!!!!!!!DOES NOT CHANGE THE ELEMENT'S ID!!!!!!
       
        const node=target.nodeName.toLowerCase();
        const eleId=target.id
        this._modSelector.dataset.insertcssClassIntoComponents({target,level:"selector",headerType:"custom",id:"selectorId",loc:"flexbox",type:"customHeader"});
       this._modSelector.selectors=this._modSelector.selectors.filter(select=>(!select.header));
       const blog={...this._modSelector.blog,selectors:this._modSelector.selectors}
       this._modSelector.localStore({blog});
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow","text-center"]});
       
        const colAttr:colAttrType={
            id:0,
            T:2,
            B:0,
            selector_id:0
        }
        const colsTop=colAttr.T;
        const colsBot=colAttr.B;

        selector={...selector,
            id:0,
            placement:0,
            eleId:eleId,
            name:node,
            header:true,
            footer:false,
            rowNum:0,
            colNum:2,
            class:cleaned.join(" "),
            cssText:target.style.cssText,
            rows:"",
            colAttr:[colAttr],
            headerType:"custom",
        } as selectorType;
        
        this._modSelector.count=this._modSelector.count+1;
        this.selector=selector;
        this._modSelector.selectors= [...this._modSelector.selectors,selector];//adding iot to teh stack
        const blog1={...this._modSelector.blog,selectors:this._modSelector.selectors}
       this._modSelector.localStore({blog:blog1});
        this._modSelector.footerPlacement();//shifting footer down by one
        this._modSelector.header=selector;
        idValues.push({eleId,id:"selectorId",attValue:eleId});
        idValues.push({eleId,id:"ID",attValue:eleId});
        idValues.push({eleId,id:"placement",attValue:"0"});
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        //addAttributes
        target.setAttribute("is-selector","true");
        //----------//---POPULATING ATTRIBUTES TO TARGET------\\-----///
        const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
            target,
            sel:selector,
            row:null,
            col:null,
            ele:null,
            level:"selector",
            loc:"flexbox",
            idValues,
            clean:false

        });
        idValues=retIdValues;
       this._modSelector.dataset.populateElement({target,selRowColEle:selector,idValues,level:"selector",loc:"flexbox",clean:false});
      
        //----------//---POPULATING ATTRIBUTES TO TARGET------\\-----///
        parent.appendChild(target);//appending/or re-apending target
        return Promise.resolve({selector,target,idValues,colsTop,colsBot})as Promise<{selector:selectorType,target:HTMLElement,idValues:idValueType[],colsTop:number,colsBot:number}>;
    };



  

    async colAdder({parent,target,idValues,sel,rowEle}:{parent:HTMLElement,target:HTMLElement,idValues:idValueType[],sel:selectorType,rowEle:rowType}):Promise<{target:HTMLElement,colEle:colType,idValues:idValueType[],parent:HTMLElement,sel:selectorType,rowEle:rowType}>{
       
        const eleId=target.id;
        const node=target.nodeName.toLowerCase();
        let colEle:colType={} as colType;
        rowEle.cols=rowEle.cols as colType[] 
        const selRow={selectorId:sel.id,rowId:rowEle.id};
        idValues.push({eleId,id:"selRow",attValue:JSON.stringify(selRow)});
        const check=rowEle.cols.map(col=>(col.eleId)).includes(target.id as string);
        // console.log("277:check:determines if COL extis",check,"target.id",target.id,)//works
        if(!check){
            const ID1=rowEle.cols?.length ? rowEle.cols.length : 0;
            colEle={
                id:ID1,
                name:node ,
                class:target.className.split(" ").filter(cl=>(cl !=="box-shadow")).join(" "),
                eleId:target.id,
                    inner_html:target.textContent ? target.textContent : "",
                    cssText:target.style.cssText,
                    elements:[] as element_selType[],
                    row_id:rowEle.id,
                    order:ID1,
                    attr:""
                }as colType;

            //LOADING ATTRIBUTES INTO ELEMENT, BELOW
            idValues.push({eleId,id:"colOrder",attValue:String(ID1)});
            //----------//---POPULATING ATTRIBUTES TO TARGET------\\-----///
            const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                target,
                sel,
                row:rowEle,
                col:colEle,
                ele:null,
                idValues,
                loc:"flexbox",
                level:"col",
                clean:false
            });
            idValues=retIdValues
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:eleId});
            this._modSelector.dataset.populateElement({target,selRowColEle:colEle,level:"col",loc:"flexbox",idValues,clean:false});
            //----------//---POPULATING ATTRIBUTES TO TARGET------\\-----///
            
            rowEle.cols=[...rowEle.cols,colEle];
            
            //ADDING MODIFIED ROW TO SELECTOR
            const {rows}=this._modSelector.checkGetRows({select:sel});
            const newRows=rows.map(row_=>{
                if(row_.eleId===rowEle.eleId){
                    row_=rowEle;
                }
                return row_;
            });
            //ADDING NEW ROWS TO SELECTOR
            sel.rows=JSON.stringify(newRows);
            //ADDING SELECTOR TO TO SELECTORS
            this._modSelector.selectors=this._modSelector.selectors.map(select=>{
                    if(select.eleId===sel.eleId){
                        select=sel;
                    }
                return select;
            });
            this._modSelector.localStore({blog:this._modSelector.blog});
        }
            
           this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(idValues);
           return Promise.resolve({target,colEle,idValues,parent,sel,rowEle}) as Promise<{target:HTMLElement,colEle:colType,idValues:idValueType[],parent:HTMLElement,sel:selectorType,rowEle:rowType}>;
            
    }
   

     ////////////PARENT showHideTools///////////////////////
     ///PARENT : selectColumn():ELEMENT SELECTION/////
     customElementChoices({parent,sel,rowEle,colEle,idValues}:{parent:HTMLElement,idValues:idValueType[],rowEle:rowType,sel:selectorType,colEle:colType}){
     
        const selRowCol:selRowColType={selectorId:sel.eleId,rowId:rowEle.eleId,colId:colEle.eleId};
        const selRow:selRowType={selectorId:sel.eleId,rowId:rowEle.eleId};
        const divFormGrp=document.createElement("div");
        divFormGrp.id="popup-customheader-elementchoices"
        divFormGrp.className="form-group text-sm popup";
        divFormGrp.setAttribute("is-popup","true");
        divFormGrp.className="popup-customheader-elementchoices";
        divFormGrp.setAttribute("data-form-group","true");
        divFormGrp.style.cssText="line-height:10px;margin:0px;z-index:2;width:fit-content;height:18px;font-size:12px;top:100%;box-shadow:1px 1px 3px lightgrey;transform:translateY(50%) scale(0.5);";
        
        divFormGrp.classList.add("position-absolute");
        divFormGrp.classList.add("top-100");
        divFormGrp.style.left="0";
        divFormGrp.style.position="absolute";
        const label=document.createElement("label");
        label.textContent="select";
        label.style.cssText="font-size:12px;"
        label.className="form-control ";
        label.style.cssText="font-size:12px;";
        label.textContent="item insert";
        const select=document.createElement("select");
        select.className="form-control";
        select.value="select";
        select.style.cssText="";
        select.name="eleName";
        select.style.cssText="font-size:12px;font-family:'Roboto' , sans serif";
     
        CustomHeader.nameValueAttrs.toSorted((a,b)=>{if(a.id < b.id){ return -1} else{ return 1}}).map((nameValueAtt)=>{
            const option=document.createElement("option");
            option.id=`${nameValueAtt.id}`;
            option.value=JSON.stringify(nameValueAtt);
            option.textContent=`${nameValueAtt.id}.-${nameValueAtt.id})-${nameValueAtt.name}`;
            if(nameValueAtt.value){
                //elements only
                option.classList.add("text-light");
                option.classList.add("bg-primary");
                option.classList.add("font-bold");
                select.appendChild(option);
             }else if(nameValueAtt.attr){
                //ONLY ATTRIBUTES
                option.classList.add("text-light");
                option.classList.add("bg-secondary");
                select.appendChild(option);
             }
        });
        
        divFormGrp.appendChild(label);
        divFormGrp.appendChild(select);
        parent.appendChild(divFormGrp);
        select.addEventListener("change",(e:Event)=>{
            if(e){
                e.preventDefault();
                const parent_=parent.parentElement as HTMLElement;
                const colValAtt=(e.currentTarget as HTMLSelectElement).value;
                if(!colValAtt) return
                const colAttrName:columnAttrType=JSON.parse(colValAtt);
                //Is  number
                const {name,attr,value,level}=colAttrName
                if(value){
                    
                    this.headerElementCreator({
                        column:parent,
                        selector:sel,
                        row:rowEle,
                        col:colEle,
                        node:value,
                        name,
                        idValues
                    });
                 
                }else if(attr ){
                    if(level==="element"){

                        if(attr ==="adjust-img-size"){
                        
                            this.changeImgSize({column:parent,idValues,selRowCol});
                        }else if(attr==="pretty-font"){
                            const eleActives=parent.querySelectorAll("[is-element].isActive");
                            ([...eleActives as any] as HTMLElement[]).forEach(element=>{
                                // console.log(element)//works
                                    element.classList.toggle(attr as string);
                                        const idValue:idValueType={eleId:element.id,id:"selRowCol",attValue:JSON.stringify(selRowCol)};
                                        this._modSelector.dataset.upDateIdValue({target:element,idValues,idValue});
                                    this.updateElement({target:element,idValues});
                                    
                                // }
                            });
                        }
                    }else if(level==="col"){
                        
                        switch(true){
                            case name==="bg-color":
                                this.columnColor({target:parent,idValues,selRowCol});
                            return;
                            case name==="set-even-height":
                                this.setEvenHeight({target:parent,idValues,selRowCol});
                            return;
                            case name==="bg-image":
                                this.getBgImage({target:parent,blog:this._modSelector.blog,idValues,selRowCol});
                            return;
                            case name==="bg-row-image":
                                this.bgRowImage({column:parent,blog:this._modSelector.blog,idValues,selRow});
                            return;
                            case name==="rm-bg-image":
                                this.rmBgImage({target:parent,idValues});
                            return;
                            default:
                                parent.classList.toggle(attr);
                                this.changePartition({target:parent,attr,idValues,selRowCol});
                                this._modSelector.updateColumn({target:parent,idValues,selRowCol});
                                return;
                            
                        }
                     }else if(level==="row"){
                        
                        switch(true){
                            case name==="bg-row-color":
                               
                                this.rowColor({row:parent_,idValues,selRow});
                                return;
                            case name==="bg-row-height":
                                this.rowHeight({column:parent,idValues,selRowCol});
                                return;
                            case name==="bg-row-image":
                                this.bgRowImage({column:parent,blog:this._modSelector.blog,idValues,selRow});
                                return;
                                default:
                                    return;

                        }
                     }
                    
                }
                
            }
            select.selectedIndex=0;
            this.removeChoices({parent:parent,target:divFormGrp});
        });
       
        
    };



    changePartition({target,attr,idValues,selRowCol}:{target:HTMLElement,attr:string,idValues:idValueType[],selRowCol:selRowColType}):void{
        //THIS CHANGES FLEX PARTITION (ie;flex:1 1 25%,,,50%,,,75%)
        const row=target.parentElement as HTMLElement;
        const columns=([...row.children as any] as HTMLElement[]);
        const colLen=columns.length;
        const checkAttr =CustomHeader.columnPartition.find(colAttr=>(colAttr.attr===attr));
        if(checkAttr){
                switch(true){
                    case attr==="flex-normal":
                        target.style.display="flex";
                        target.style.flexDirection="row";
                        target.style.flexWrap="wrap";
                        target.style.justifyContent="flex-start";
                        target.style.alignItems="flex-start";
                        this._modSelector.updateColumn({target,idValues,selRowCol});
                    return 
                    case attr==="flex-static":
                        columns.map(col=>{
                            if(col){
                                const findClass=([...col.classList as any] as string[]).find(cl=>(cl.includes("col-")));
                                if(findClass){
                                    col.classList.remove(findClass);
                                    col.classList.add(`col-lg-${12/colLen}`);
                                }
                                col.style.flex="1 0 33%";
                                this._modSelector.updateColumn({target:col,idValues,selRowCol})
                            }
                        });

                    return;
                    case attr==="flex-double":
                        columns.map(col=>{
                            if(col){
                                const findClass=([...col.classList as any] as string[]).find(cl=>(cl.includes("col-")));
                                if(findClass){
                                    col.classList.remove(findClass);
                                    if(col.id !==target.id){
                                        col.classList.add(`col-lg-${6/colLen}`);
                                        col.style.flex="1 0 33%";
                                    }else{
                                        col.classList.add(`col-lg-6`);
                                        col.style.flex="1 0 50%";
                                    }
                                }
                             
                        
                                this._modSelector.updateColumn({target:col,idValues,selRowCol})
                            }
                        });

                    return;
                    case attr==="flexRow":
                        target.style.display="flex";
                        target.style.flexDirection="row";
                        target.style.flexWrap="nowrap";
                        target.style.justifyContent="flex-start";
                        target.style.alignItems="flex-start";
                    
                        this._modSelector.updateColumn({target,idValues,selRowCol});
                    return 
                    case attr==="flexCol":
                        target.style.display="flex";
                        target.style.flexDirection="column";
                      
                        this._modSelector.updateColumn({target,idValues,selRowCol});
                        return 
                    case attr==="flex-quarter":
                        columns.map(col=>{
                            if(col){
                                const findClass=([...col.classList as any] as string[]).find(cl=>(cl.includes("col-")));
                                if(findClass){
                                    col.classList.remove(findClass);
                                    if(col.id !==target.id){
                                        //1/4*12
                                        col.classList.add(`col-lg-${4}`);
                                        col.style.flex="1 0 37.5%";
                                    }else{
                                        col.classList.add(`col-lg-3`);
                                        col.style.flex="1 0 25%";
                                    }
                                }
                             
                             
                                this._modSelector.updateColumn({target:col,idValues,selRowCol})
                            }
                        });
                    return;
                    case attr==="flex-three-quarter":
                        columns.map(col=>{
                            if(col){
                                const findClass=([...col.classList as any] as string[]).find(cl=>(cl.includes("col-")));
                                if(findClass){
                                    col.classList.remove(findClass);
                                    if(col.id !==target.id){
                                        //3/4*12=3*3=6
                                        col.classList.add(`col-lg-${3}`);
                                        col.style.flex="1 0 12.5%";
                                    }else{
                                        col.classList.add(`col-lg-6`);
                                        col.style.flex="1 0 75%";
                                    }
                                }
                              
                                this._modSelector.updateColumn({target:col,idValues,selRowCol})
                            }
                        });

                    return;
                    case attr==="flexCol-normal":
                       target.style.display="flex";
                       target.style.flexDirection="column";
                       target.style.justifyContent="flex-start";
                       target.style.alignItems="flex-start";
                      
                        this._modSelector.updateColumn({target,idValues,selRowCol});
                        return 
                    case attr==="flex-default":
                       
                        columns.map((col,index)=>{
                            if(col){
                                const lenArr:number[]=Array.from((Array(colLen).keys()));
                                const findClass=([...col.classList as any] as string[]).find(cl=>(cl.includes("col-")));
                                if(findClass){
                                    col.classList.remove(findClass);
                                    if(index===lenArr[0]){
                                        //3/4*12=3*3=6
                                        col.classList.add(`col-lg-${3}`);
                                        col.classList.add(`col-1`);
                                        col.style.flex="1 0 25%";
                                    }else if(index===lenArr[1]){
                                        col.classList.add(`col-lg-6`);
                                        col.classList.add(`col-2`);
                                        col.style.flex="1 0 50%";
                                    }else if(index===lenArr[2]){
                                        col.classList.add(`col-lg-3`);
                                        col.classList.add(`col-2`);
                                        col.style.flex="1 0 50%";
                                    }
                                    col.style.minHeight="15vh";
                                }
                               
                                this._modSelector.updateColumn({target:col,idValues,selRowCol})
                            }
                        });

                    return;
                }
        }
    };



    removeChoices({target,parent}:{parent:ParentNode,target:HTMLElement}){
        target.style.position="relative";
        const cssStyle={color:"red"}
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.setAttribute("data-delete","selector")
       
        xIconDiv.style.cssText="position:absolute;top:0;right:0;transform:translate(-2px,0px);border-radius:50%;"
        FaCreate({parent:xIconDiv,name:FaTrash,cssStyle:cssStyle});
        target.appendChild(xIconDiv);
        parent.appendChild(target);
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                
                Misc.fadeOut({anchor:target,xpos:50,ypos:100,time:600});
                setTimeout(()=>{
                    parent.removeChild(target);
                },580);
            }
        });
    }
        //FLEX TOOLS
    
    //PARENT columnFlexChoices()
   async headerElementCreator({column,node,name,idValues,selector,row,col}:{column:HTMLElement,node:string,name:string,idValues:idValueType[],selector:selectorType,row:rowType,col:colType}){
      const getPopup=column.querySelector("div#popup-customheader-elementchoices") as HTMLElement;
      const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId};
      
      
       const isUlType=(node) ? ["ul","ol","blockquote"].includes(node) : false;
       const textEle=node ? ["p","h1","h2","h3","h4","h5","h6",].includes(node):false;

       const showEleTexts:{name:string,value:string}[]=[{name:"p",value:"paragraph insert here"},{name:"h1",value:"title"},{name:"h2",value:"subtitle"},{name:"h3",value:"sub-subtitle"},{name:"ul",value:"add item"},{name:"ol",value:"ordered list"},{name:"blockquote",value:"your quote"}];
       const text=showEleTexts.find(nameVal=>(nameVal.name===node));
       const rand=Math.floor(Math.random()*1000);

       if(node){
          const divCont=document.createElement("div");
          divCont.id=`divCont-${rand}`;

           this._modSelector.dataset.insertcssClassIntoComponents({
           target:divCont,
           level:"element",
           headerType:"custom",
           id:"divContId",
           type:"customHeader",
           loc:"flexbox"
          });
       
            divCont.style.cssText=this.divCont_css;
            const target=document.createElement(node);
            target.setAttribute("contenteditable","true");
            target.setAttribute("is-element","true");
            //NEW ELEMENTS ADDED
           
            getPopup.style.position="absolute";
                
            /////-----NEW ID------/////
            target.id=`custom_${node}-${rand}`;//CREATING NEW ID
            const eleId=target.id
            /////-----NEW ID------/////
            idValues.push({eleId,id:"elementId",attValue:target.id});
            idValues.push({eleId,id:"ID",attValue:target.id});
            idValues.push({eleId,id:"name",attValue:node as string});
            idValues.push({eleId,id:"colId",attValue:column.id});
            idValues.push({eleId,id:"divContId",attValue:divCont.id});
            if(node !=="img"){
                idValues.push({eleId,id:"editableFalse",attValue:"true"});
            }else{
                idValues.push({eleId,id:"editableTrue",attValue:"true"});
            }
            const context=text?.value ||" insert here";
            const height=window.getComputedStyle(column).getPropertyValue("height");
            switch(true){
                case textEle:
                        this._modSelector.dataset.insertcssClassIntoComponents({
                        target:target,
                        level:"element",
                        headerType:"custom",
                        id:"elementId",
                        type:"customHeader",
                        loc:"flexbox"
                    });
                
                    target.textContent=context;
                    this.elementAdder({target,idValues,sel:selector,rowEle:row,colEle:col}).then(async(res)=>{
                        if(res){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                            divCont.addEventListener("click",(e:MouseEvent)=>{
                                if(e){
                                    res.target.classList.toggle("isActive");
                                    divCont.classList.toggle("isActive");
                                    const check=([...target.classList as any] as string[]).includes("isActive");
                                    this.removeMainElement({parent:column,divCont,target:res.target,idValues,selRowCol});
                                    if(check){
                                        this.updateElement({target,idValues});//updates class and cssText;
                                    }
                                }
                            });
                            this.editElement({target:res.target,idValues:res.idValues,selRowCol});//ADDS A LISTENER TO HEADER LABELS
                        }
                    });//adds both selector eles and elements
                    divCont.appendChild(target);
                    column.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    ModSelector.modAddEffect(target);
                
                return;
                case node==="a" && !(name ==="email" || name ==="insert-tel"):
                    this.createAnchor({parent:column,target,divCont,flex:this.flex,idValues,selector,row,col});
                return;
                case isUlType:
                   
                    this.elementAdder({target,idValues,sel:selector,rowEle:row,colEle:col}).then(async(res)=>{
                        if(res){
                            
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                            target.addEventListener("click",(e:MouseEvent)=>{
                                if(e){
                                    
                                    res.target.classList.toggle("isActive");
                                    divCont.classList.toggle("isActive");
                                        this.updateElement({target,idValues});//updates class and cssText;
                                    this.removeMainElement({parent:column,divCont,target:res.target,idValues,selRowCol});
                                    
                                }
                            });
                        }
                    });//adds both selector eles and elements
                    target.innerHTML=context;
                    target.style.cssText="margin:0;margin-left:0.5rem";
                    target.className=node;
                    target.setAttribute("is-element","true");
                    divCont.appendChild(target);
                    column.appendChild(divCont);
                    ModSelector.modAddEffect(divCont);
                    
                
                    this.editElement({target,idValues,selRowCol});//ADDS A LISTENER TO HEADER LABELS
                return;
                case name==="logo":
                    this.getImage({parent:column,target,divCont,idValues,selector,row,col});
                    
                return;
                case name==="image":
                    this.getImage({parent:column,divCont,target,idValues,selector,row,col});
                    
                return;
                case name==="email" && node==="a":
                    this.getEmail({parent:column,divCont,target,idValues,selector,row,col});
                    
                return;
                case name==="insert-tel":
                    this.insertTel({parent:column,divCont,target,idValues,selector,row,col});
                    
                return;
                case name==="line":
                    target.classList.add("my-auto");
                    target.style.cssText+="width:75%;height:3px;border-radius:10px;margin-block:1.25rem;margin-inline:auto;"
                    this.elementAdder({target:target,idValues,sel:selector,rowEle:row,colEle:col}).then(async(res)=>{
                        if(res){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                            divCont.addEventListener("click",(e:MouseEvent)=>{
                                if(e){
                                    res.target.classList.toggle("isActive");
                                    divCont.classList.toggle("isActive");
                                    const check=([...target.classList as any] as string[]).includes("isActive");
                                    this.removeMainElement({parent:column,divCont,target:res.target,idValues,selRowCol});
                                    if(check){
                                    this.updateElement({target:target,idValues});//updates class and cssText;
                                    }
                                }
                            });
                        }
                    });//adds both selector eles and elements
                    divCont.appendChild(target);
                    column.appendChild(divCont);
                    ModSelector.modAddEffect(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    
                return;
                case name==="vertical-line":
                    target.className="vertical-line";
                    target.setAttribute("data-line-width","3px");
                    target.style.cssText=`margin-right:0.25rem;width:3px;height:${height};margin-right:0.25rem;background-color:black;`
                    this.elementAdder({target,idValues,sel:selector,rowEle:row,colEle:col}).then(async(res)=>{
                        if(res){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                            divCont.addEventListener("click",(e:MouseEvent)=>{
                                if(e){
                                    res.target.classList.toggle("isActive");
                                    divCont.classList.toggle("isActive");
                                   
                                    const check=([...target.classList as any] as string[]).includes("isActive");
                                    this.removeMainElement({parent:column,divCont,target:res.target,idValues,selRowCol});
                                    if(check){
                                    this.updateElement({target:res.target,idValues});//updates class and cssText;
                                    }
                                }
                            });
                        }
                    });//adds both selector eles and elements
                    divCont.appendChild(target);
                    column.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    ModSelector.modAddEffect(divCont);
                    
                return;
                default:
                    return;
            }

           
        }
      
    };


   async headerElementBuilder({column,idValues,element,selector,row,col}:{column:HTMLElement,element:element_selType,idValues:idValueType[],selector:selectorType,row:rowType,col:colType}){
     
      const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId};
      const node:string=element.name;
      
   
       const isUlType=(node) ? ["ul","ol","blockquote"].includes(node) : false;
       const textEle=node ? ["p","h1","h2","h3","h4","h5","h6",].includes(node):false;
       const checkLine=node ? ["hr","div"].includes(node) : false;
       
     
       const rand=Math.floor(Math.random()*1000);
       const divCont=document.createElement("div");
       divCont.id=`divCont-${rand}`;
   
        this._modSelector.dataset.insertcssClassIntoComponents({
        target:divCont,
        level:"element",
        headerType:"custom",
        id:"divContId",
        type:"customHeader",
        loc:"flexbox"
       });
   
       divCont.style.cssText=this.divCont_css;
       const target=document.createElement(node);
       target.setAttribute("contenteditable","true");
       target.setAttribute("is-element","true");
   
      
           const eleId=element.eleId;
            target.innerHTML=element.inner_html;
           target.style.cssText=element.cssText;
           target.className=element.class;
           const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
           target.className=cleaned.join(" ");
           //EXISTING ELEMENTS ALREADY CREATED
            idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
           target.id=eleId
           //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
            const {idValues:retIdValues1}=this._modSelector.dataset.coreDefaultIdValues({
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
            idValues=retIdValues1
            //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
            divCont.setAttribute("data-placement",`${element?.order}-A`);
            divCont.setAttribute("data-placement",`${(element as element_selType).order}`);
            const attrTest=attrEnumArrTest(element);
            const typeTest=typeEnumArrTest(element);
            const link=attrTest && attrTest.id==="link" ? attrTest : undefined;
            const email=attrTest && attrTest.id==="email" ? attrTest : undefined;
            const tel=attrTest && attrTest.id==="tel" ? attrTest : undefined;
            const time=attrTest && attrTest.id==="time" ? attrTest : undefined;
            if(link) idValues.push({eleId,id:"link",attValue:link.value});
            if(email) idValues.push({eleId,id:"email",attValue:email.value});
            if(tel) idValues.push({eleId,id:"tel",attValue:tel.value});
            if(time) idValues.push({eleId,id:"time",attValue:time.value});
            if(typeTest) idValues.push({eleId,id:typeTest.id,attValue:typeTest.value});

            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            switch(true){
                case textEle:
                    target.setAttribute("contenteditable","true");
                    divCont.appendChild(target);
                    column.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    ModSelector.modAddEffect(divCont);
                    
                    divCont.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            target.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            const check=([...target.classList as any] as string[]).includes("isActive")
                            if(check){
                                this.updateElement({target,idValues});//updates class and cssText;
                                this._modSelector.removeMainElement({parent:column,divCont,target,idValues,selRowCol});
                                Main.activatebuttons({target});
                            }
                        }
                    });
                    
                    this.editElement({target,idValues,selRowCol});//ADDS A LISTENER TO HEADER LABELS
                return;
                case isUlType:
                    target.style.cssText="padding-inline:1.25rem;border-radius:8px;";
                    divCont.appendChild(target);
                    column.appendChild(divCont);
                    ModSelector.modAddEffect(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    divCont.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            target.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                           
                            const check=([...target.classList as any] as string[]).includes("isActive")
                            this.removeMainElement({parent:column,divCont,target:target,idValues,selRowCol});
                            Main.activatebuttons({target});
                            if(check){
                                this.updateElement({target,idValues});//updates class and cssText;
                            }
                        }
                    });
                
                    this.editElement({target,idValues,selRowCol});//ADDS A LISTENER TO HEADER LABELS
                return;
                case element.name==="img":
                    target.setAttribute("contenteditable","false");
                    element=await this._modSelector.removeBlob({target,rowColEle:element,loc:"flexbox",level:"element",idValues,selRowCol,selRow:null}) as element_selType;
                    if(element.imgKey){
                        this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                            if(res){
                                (target as HTMLImageElement).src=res.img;
                                (target as HTMLImageElement).alt=res.Key
                            }
                        });
                    }else{
                        (target as HTMLImageElement).src=element.img ? element.img : "#";
                        (target as HTMLImageElement).alt=element.inner_html;
                    }
                    divCont.appendChild(target);
                    column.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    target.removeAttribute("contenteditable");
                    divCont.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            target.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                           
                            this.updateElement({target:target,idValues});//updates class and cssText;
                            this.removeMainElement({parent:column,divCont,target:target,idValues,selRowCol});
                        }
                    });
                    
                return;
                case checkLine:
                  
                    divCont.appendChild(target);
                    column.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    ModSelector.modAddEffect(divCont);
                    
                    divCont.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            target.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                           
                            const check=([...target.classList as any] as string[]).includes("isActive")
                            this.removeMainElement({parent:column,divCont,target:target,idValues,selRowCol});
                            if(check){
                                this.updateElement({target:target,idValues});//updates class and cssText;
                            }
                        }
                    });
                return;
                case node==="a":
            
                    Header.cleanUp(target);
                    
                    target.innerHTML=element.inner_html;
                    if(link?.test){
                        target.setAttribute("data-link",link.value);
                        target.removeAttribute("contenteditable");
                        //PHONE IMAGE
                    this.showLinkEmailTelImg({target:target as HTMLAnchorElement,element,type:"link",isClean:false});
                  

                    };
                    if(email?.test){
                        console.log("TARGET",target.textContent,"ELEMENT",element.inner_html)
                        target.innerHTML=element.inner_html;
                        target.setAttribute("data-email",email.value)
                        this.showLinkEmailTelImg({target:target as HTMLAnchorElement,element,type:"email",isClean:false});
                        target.removeAttribute("contenteditable");
                    };
                    if(tel?.test){
                        target.setAttribute("data-tel",tel.value)
                        this.showLinkEmailTelImg({target:target as HTMLAnchorElement,element,type:"tel",isClean:false});
                        target.removeAttribute("contenteditable");
                    };
                    
                    divCont.appendChild(target);
                    column.appendChild(divCont);
                    divCont.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            target.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            const check=([...target.classList as any] as string[]).includes("isActive")
                            this.removeMainElement({parent:column,divCont,target,idValues,selRowCol});
                            Main.activatebuttons({target});
                            if(check){
                                this.updateElement({target:target,idValues});//updates class and cssText;
                            }
                        }
                    });
                return;
                default:
                    return;
            }
         
    
      
    };


     getImage({parent,target,divCont,idValues,selector,row,col}:{
        parent:HTMLElement,
        target:HTMLElement,
        divCont:HTMLElement,
        idValues:idValueType[],
        selector:selectorType,
        row:rowType,
        col:colType
     }):void{
        const blog=this._modSelector.blog;
        const selRowCol:selRowColType={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId};
     
        const {form,retParent,formContainer}=this.customSetup.imgSetup(parent)
        form.addEventListener("submit",async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata= new FormData(e.currentTarget as HTMLFormElement) as FormData;
                const file=formdata.get("file");
               
                if(file as File){
                    const image=URL.createObjectURL(file as File);
                    const eleId=target.id;
                    const img=target as HTMLImageElement;
                    //ADDING CSS AND CLASSES TO IMG
                    this._modSelector.dataset.insertcssClassIntoComponents({
                        target:img,
                        level:"element",
                        headerType:"custom",
                        id:"elementId",
                        type:"customHeader",
                        loc:"flexbox"

                    });
                    //ADDING CSS AND CLASSES TO IMG
                    img.src=image;
                    img.alt=(file as File).name ? (file as File).name :"www.masterconnect.ca";
                    const {Key}=this._service.generateImgKey(formdata,blog) as {Key:string};
                    const idValue:idValueType={eleId,id:"imgKey",attValue:Key};
                    this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                    idValues.push({eleId:img.id,id:"imgKey",attValue:Key});
                    this.elementAdder({target:img,idValues,sel:selector,rowEle:row,colEle:col}).then(async(res)=>{
                        if(res){
                            const ele=res.ele as element_selType;
                            res.target.removeAttribute("contenteditable");
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                            divCont.addEventListener("click",(e:MouseEvent)=>{
                                if(e){
                                    res.target.classList.toggle("isActive");
                                    divCont.classList.toggle("isActive");
                                    this.removeMainElement({parent:retParent,divCont,target:res.target,idValues,selRowCol});
                                }
                            });
                        }
                    });//this adds elements to selector and/or elements
                    this._user.askSendToServer({bg_parent:parent,formdata,image:img,blog,oldKey:null,idValues,selRowCol});//ORDERED SIGNIN
                    //----MULTIPURPOSE IMAGE SAVE ONLY //////
                    divCont.appendChild(img);
                    retParent.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    ModSelector.modAddEffect(divCont);
                    //REMOVINGFORM
                    Misc.fadeOut({anchor:formContainer,xpos:20,ypos:100,time:400});
                    setTimeout(()=>{
                        retParent.removeChild(formContainer)
                    },380);
                    //REMOVINGFORM
                    
                    //inserting div for deletion
                    
                }
            }
        });


        
     };

  
     getBgImage({target,blog,idValues,selRowCol}:{target:HTMLElement,blog:blogType,idValues:idValueType[],selRowCol:selRowColType}){
       //target====column
       const {selectorId,rowId}=selRowCol as selRowColType;
       const selRow={selectorId,rowId} as selRowType;
        const formContainer=document.createElement("div");
        formContainer.className="flexCol box-shadow";
        formContainer.style.cssText="position:absolute;width:200px;height:200px;z-index:0;font-size:12px;z-index:100;";
        const form=document.createElement("form");
        form.className="m-auto d-flex flex-column gap-1 form-group";
        form.setAttribute("data-form-group","true");
        form.style.cssText="position:absolute;inset:-1rem; width:inherit;";
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
        target.appendChild(formContainer);
        Header.removePopup({parent:target,target:formContainer,position:"right"});
        ModSelector.modAddEffect(formContainer);
        input.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        form.addEventListener("submit",async (e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const user=this._user.user;
                const getOldKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
                const oldKey= getOldKey ? getOldKey.attValue : null;
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file");
                if(file as File){
                target.style.zIndex="0";
                target.style.position="relative";
                const image=URL.createObjectURL(file as File);
                target.style.backgroundImage=`url(${image})`;
                target.style.backgroundPosition=`50% 50%`;
                target.style.backgroundSize=`100% 100%`;
                target.removeAttribute("contenteditable");
                const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                const idValue:idValueType={eleId:target.id,id:"imgKey",attValue:Key};
                this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                idValues.push({eleId:target.id,id:"backgroundImg",attValue:"true"});
                this._modSelector.updateColumn({target:target,idValues,selRowCol}).then(async(res)=>{
                    if(res){
                        const selRowCol:selRowColType={...selRow,colId:target.id};
                        this._user.askSendToServer({bg_parent:target,formdata,image:null,blog,oldKey,idValues,selRowCol});
                        target.setAttribute("data-background-image","true");
                    }
                });
                Misc.fadeOut({anchor:formContainer,xpos:50,ypos:100,time:500});
                setTimeout(()=>{
                    target.removeChild(formContainer);
                },480);

                }
            }
        });

     };



     bgRowImage({column,blog,idValues,selRow}:{column:HTMLElement,blog:blogType,idValues:idValueType[],selRow:selRowType}){
       
        const target=column.parentElement;
        column.style.zIndex="0";
        const user=this._user.user;
        if(!target) return;
        const eleId=target.id;
        target.style.zIndex="0";
        const getOld=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
        const oldKey=getOld ? getOld.attValue : null;
        const {form:form2,reParent:mainTextarea}=Misc.imageForm(column);
        Header.removePopup({parent:column,target:form2,position:"right"});
        target.removeAttribute("contenteditable");
        form2.addEventListener("submit",async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File;
                
                if(file){
                    const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                    const idValue:idValueType={eleId,id:"imgKey",attValue:Key};
                    this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                    const urlImg=URL.createObjectURL(file) as string;
                    target.style.backgroundImage=`url(${urlImg})`;
                    target.style.backgroundSize=`100% 100%`;
                    target.style.backgroundPosition=`50% 50%`;
                    target.setAttribute("data-backgroundImg","true");
                    idValues.push({eleId,id:"backgroundImg",attValue:"backgroundImg"})
                    mainTextarea.style.zIndex="0";
                    this._modSelector.updateRow({target,idValues,selRow}).then(async(res)=>{
                        if(res){
                            const selRowCol:selRowColType={...selRow,colId:column.id}
                            this._user.askSendToServer({bg_parent:target,formdata,image:null,blog,oldKey,idValues,selRowCol});
                            Misc.growOut({anchor:form2,scale:0,opacity:0,time:400});
                            setTimeout(()=>{mainTextarea.removeChild(form2)},398);
                        }
                    });
                }
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
        console.log("rowHeight",rowHeight)
        target.style.height=rowHeight;
        const idValue:idValueType={eleId,id:"height",attValue:rowHeight};
        this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
        this._modSelector.updateColumn({target:target,idValues,selRowCol}).then(async(col)=>{
            if(!col){
                Misc.message({parent:target,msg:"set height failed",time:700,type_:"error"});
            }
        });
    };



     rmBgImage({target,idValues}:{target:HTMLElement,idValues:idValueType[]}){
        for(const key of Object.keys(target.style)){
            if(key==="backgroundImg"){
                target.style.backgroundImage="";
                target.style.backgroundPosition="";
                target.style.backgroundSize="";
                this._modSelector.dataset.removeSubValue({target,idValues,id:"backgroundImg",eleId:target.id})
            };
        };
     };


     //PARENT:CUSTOMELEMENTCHOICES(){}
     changeImgSize({column,idValues,selRowCol}:{column:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){

        const getImages=column.querySelectorAll("img") as any as HTMLImageElement[];
        ([...getImages]).map(img=>{
            if(img){
                this.changeSize({column,img,idValues,selRowCol});
            }
        });
     };


     //PARENT: changeImgSize()
     changeSize({column,img,idValues,selRowCol}:{column:HTMLElement,img:HTMLImageElement,idValues:idValueType[],selRowCol:selRowColType}){
        column.style.zIndex="";
        const form=document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;position:absolute;width:150px;z-index:200;background:white;border-radius:12px;box-shadow:1px 1px 10px 1px black";
        form.style.top="10%";
        form.style.left="35%";
        form.style.right="35%";
        const {input,label}=Nav.inputComponent(form);
        label.textContent="adjust size";
        label.classList.add("text-primary");
        input.name="number";
        input.type="number";
        input.min="45";
        input.max="175";
        input.value="45";
        input.placeholder="45";
        const btn=buttonReturn({parent:form,text:"submit",bg:"black",color:"white",type:"button"});
        form.appendChild(input);
        column.appendChild(form);
        Misc.matchMedia({parent:column,maxWidth:400,cssStyle:{top:"40%",left:"10%",right:"10%"}});
        input.addEventListener("input",(e:Event)=>{
            if(e){
                img.style.width=`${(e.currentTarget as HTMLInputElement).value}px`;
                this._modSelector.updateElement({target:img,idValues,selRowCol});
            }
        },false);
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                e.preventDefault();
                Misc.fadeOut({anchor:form,xpos:50,ypos:100,time:400});
                setTimeout(()=>{
                    column.removeChild(form);
                    column.style.zIndex="";
                },380);
            }
        });
        

    };


    
      //PARENT columnFlexChoices()
      rowColor({row,idValues,selRow}:{row:HTMLElement,idValues:idValueType[],selRow:selRowType}){
        if(row){
            if(row as HTMLElement){
                row.style.zIndex="0";
                row.style.position="relative";
                const input=document.createElement("input");
                input.type="color";
                input.id="color-row-picker";
                input.style.cssText="position:absolute;inset:30% 40%;z-index:300;width:20%;"
                row.appendChild(input);
                input.addEventListener("change",()=>{
                    const color:string=input.value;
                    // console.log("color!!:",color)
                    (row as HTMLElement).style.background=color;
                    this._modSelector.updateRow({target:row as HTMLElement,idValues,selRow}); //updating selector and storing it
                    if(input.value){
                    row.removeChild(input);
                    }
                });
            }
        }
       
     };




     rowHeight({column,idValues,selRowCol}:{column:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
        if(!column) return;
        const {selectorId,rowId}=selRowCol as selRowColType;
        const selRow={selectorId,rowId} as selRowType;
        const parent=column.parentElement as HTMLElement;
        const getColumns=parent.querySelectorAll("div.column-header") as unknown as  HTMLElement[];
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
                parent.style.minHeight=`${number}px`;
                // console.log("number",number,"row",parent.style.height)
            
            }
        };
        button.onclick=(e:MouseEvent)=>{
            if(e){
                const height=(input as HTMLInputElement).value;
                parent.style.minHeight=`${height}px`;
                parent.style.height=`${height}px`;
                this._modSelector.updateRow({target:parent,idValues,selRow});
                (getColumns && [...getColumns] as HTMLElement[]).map(col=>{
                    if(col){
                        col.style.height=`${height}px`;
                        col.style.minHeight=`${height}px`;
                        this._modSelector.updateColumn({target:col,idValues,selRowCol});
                    }
                });
                Misc.fadeOut({anchor:cont,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(cont);
                },398);
            }
        };
     };




     columnColor({target,idValues,selRowCol}:{target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
        // console.log("INSIDE COLOR")
        if(target){
            target.style.position="relative";
            target.style.zIndex="0";
            const input=document.createElement("input");
            input.type="color";
            input.id="color-col-picker";
           input.style.cssText="position:absolute;inset:30% 40%;z-index:300;width:20%;"
            target.appendChild(input);
            Header.removePopup({parent:target,target:input,position:"right"});
            input.addEventListener("change",()=>{
                const color:string=input.value;
                // console.log("color!!:",color)
                target.style.background=color;
                this._modSelector.updateColumn({target,idValues,selRowCol}); //updating selector and storing it
                if(input.value){
                target.removeChild(input);
                }
            });
        }
       
     };


     
     getEmail({parent,target,divCont,idValues,selector,row,col}:{
        parent:HTMLElement,
        target:HTMLElement,
        divCont:HTMLElement,
        idValues:idValueType[],
        selector:selectorType,
        row:rowType,
        col:colType
     }){
        const form=document.createElement("form");
        
        form.style.cssText="position:absolute;width:clamp(200px,350px,400px);height:auto;display:flex;align-items:center;justify-content:center;top:0%;left:0%;right:10%;z-index:200;background-color:white;flex-direction:column;gap:1rem;backdrop-filter:blur(20px);background-color:whitesmoke;";
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
        parent.appendChild(form);
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const email=formdata.get("email") as string;
                const name=formdata.get("name") as string;
                const anchor=target as HTMLAnchorElement;
                const eleId=target.id;
                anchor.href=`mailto:${email}`;
               
                //INSERT MAIL IMAGE
                const selRowCol={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId} as selRowColType;
                this.addLinkEmailTelImg({target:anchor,name,image:this.mail,href:`mailto:${email}`,type:"email",isClean:false});
                //INSERT MAIL IMAGE
                anchor.setAttribute("data-email",email);
                idValues.push({eleId,id:"email",attValue:anchor.href});
                idValues.push({eleId,id:"editableFalse",attValue:"false"});
                anchor.removeAttribute("contenteditable");
                divCont.appendChild(anchor);
                parent.appendChild(divCont);
                this.elementAdder({target:anchor,idValues,sel:selector,rowEle:row,colEle:col}).then(async(res)=>{
                    if(res){
                        const ele=res.ele as element_selType;
                        res.target.removeAttribute("contenteditable");
                        divCont.setAttribute("data-placement",`${ele.order}-A`);
                        divCont.onclick=(e:MouseEvent)=>{
                            if(e){
                                divCont.classList.toggle("isActive");
                                res.target.classList.toggle("isActive");
                                this.removeMainElement({parent,divCont,target:res.target,idValues,selRowCol});
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


     insertTel({parent,target,divCont,idValues,selector,row,col}:{parent:HTMLElement,
        target:HTMLElement,
        divCont:HTMLElement,
        idValues:idValueType[]
        selector:selectorType,
        row:rowType,
        col:colType
     }){
       
        const form=document.createElement("form");
        form.style.cssText="position:absolute;width:clamp(200px,350px,400px);height:auto;display:flex;align-items:center;justify-content:center;top:100%;left:0%;right:10%;z-index:200;flex-direction:column;gap:1rem;background-color:white";
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
        parent.appendChild(form);
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const selRowCol={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId}
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const tel=formdata.get("tel") as string;
                const name=formdata.get("name") as string;
                const anchor=target as HTMLAnchorElement;
               
                const eleId=target.id;
                anchor.href=`tel:${tel}`;
                //PHONE IMAGE
                this.addLinkEmailTelImg({target:anchor,name,image:this.phone,href:`tel:${tel}`,type:"tel",isClean:false});
                //PHONE IMAGE
                idValues.push({eleId,id:"tel",attValue:anchor.href});
                idValues.push({eleId,id:"editableFalse",attValue:"false"});
                anchor.removeAttribute("contenteditable");
                divCont.appendChild(anchor);
                parent.appendChild(divCont);
                this.elementAdder({target:anchor,idValues,sel:selector,rowEle:row,colEle:col}).then(async(res)=>{
                    if(res){
                        const ele=res.ele as element_selType;
                        res.target.removeAttribute("contenteditable");
                        divCont.setAttribute("data-placement",`${ele.order}-A`)
                        divCont.onclick=(e:MouseEvent)=>{
                            if(e){
                                divCont.classList.toggle("isActive");
                                res.target.classList.toggle("isActive");
                              this.removeMainElement({parent,divCont,target:res.target,idValues,selRowCol});
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
     }
      //PARENT CustomElementChoices()
      modifyColEleAttrs({target,class_,idValues,selRowCol}:{target:HTMLElement,class_:string,idValues:idValueType[],selRowCol:selRowColType}){
        if(class_){
            //NEW ELEMENTS
           
            const getIsActiveElements=target.querySelectorAll("[is-element='true'].isActive");
            const getColumn=document.getElementById(target.id);

        ([...(getIsActiveElements as any)] as HTMLElement[]).map(eleActive=>{
                if(eleActive as HTMLElement){
                    eleActive.classList.toggle(class_ as string);
                    this.updateElement({target:eleActive,idValues});
                    
                }
        });
                        if(!getColumn) return;
                        getColumn.classList.toggle(class_ as string);
                        this._modSelector.updateColumn({target:getColumn,idValues,selRowCol});
        }else{
            //REBUILT ELEMENTS
        }
     };


     //PARENT columnFlexChoices(): adjusts row height
     headerHeightAdjust({target,idValues,selRowCol}:{target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
        if(!(target as HTMLElement)) return;
        const row=target.parentElement as HTMLElement;
        const getRow=document.getElementById(row.id);
                
        if(getRow){
            const {retCol,formGrp,input,btn}=this.customSetup.formSetup(target);
            retCol.style.position="relative";
            input.addEventListener("change",(e:Event)=>{
                if(e){
                    const value=(e.currentTarget as HTMLInputElement).value;
                    getRow.classList.add("rowHeightAdded") 
                    getRow.style.minHeight="none";
                    getRow.style.height=`${parseInt(value)}px;`;
                    let arrCss=getRow.style.cssText.split(";");
                    arrCss=arrCss.filter(item=>(!item.startsWith("min-height")));
                    arrCss.push(`height:${parseInt(value)}px;`);
                    getRow.style.cssText=arrCss.join(";");
                    getRow.style.paddingBlock="0.5rem";
                    const {selectorId,rowId}=selRowCol;
                    const selRow:selRowType={selectorId,rowId};
                    this._modSelector.updateRow({target:getRow,idValues,selRow});
                }
            });
            btn.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    e.preventDefault();
                    Header.removeTarget(retCol,formGrp);
                }
            });
        }
     };



     removeMainElement({parent,target,divCont,idValues,selRowCol}:{
        parent:HTMLElement,
        divCont:HTMLElement,
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType

     }){
        const check=([...target.classList as any] as string[]).includes("isActive");
        
        
        const css="position:absolute;transform:translate(2px,5px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:-6px;left:0px;"
        if(check){
            const xIconDiv=document.createElement("div");
            xIconDiv.setAttribute("contenteditable","false");
            xIconDiv.setAttribute("is-icon","true");
            xIconDiv.className="xIconDiv";
            xIconDiv.id="xIconDiv";
            xIconDiv.style.cssText=`${css}`;
            const cssStyle={background:"inherit",fontSize:"inherit"};
            FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
            divCont.appendChild(xIconDiv);
            xIconDiv.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    this.removeElement({target,idValues,selRowCol});
                    if(target.nodeName==="IMG"){
                       const idValue=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
                        if(idValue){
                            const check=this._service.checkFreeImgKey({imgKey:idValue.attValue});
                            if(check) return;
                            this._service.adminImagemark(idValue.attValue,true).then(async(res)=>{
                                if(res){
                                    Misc.message({parent,msg:`${idValue.attValue} is removed`,type_:"success",time:700});
                                }
                            });
                        }
                    }
                    parent.removeChild(divCont);
                    //resetting buttons
                    Main.initMainBtns();
                }
            });

        }else{
            Header.cleanUpByID(divCont,"xIconDiv");
        }
        
    };


    removeElement({target,idValues,selRowCol}:{target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
        const eleId=target.id;
        const {selectorId,rowId,colId}=selRowCol as selRowColType;
        this._modSelector.selectors=this._modSelector.selectors.map(sel=>{
                if(sel.eleId===selectorId){
                    const rows=JSON.parse(sel.rows) as rowType[];
                    rows.map(row=>{
                        if(row.eleId===rowId){
                            row.cols.map(col=>{
                                if(col.eleId===colId){
                                   col.elements.map((ele,index)=>{
                                    if(ele.eleId ===eleId){
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
        this._modSelector.blog={...this._modSelector.blog,selectors:this._modSelector.selectors};
        this._modSelector.localStore({blog:this._modSelector.blog});
        idValues = idValues.filter(kat=>(kat.eleId !==eleId));
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        this._modSelector.dataset.upDateIdValues({idValues})
    }
    createAnchor({parent,target,divCont,flex,idValues,selector,row,col}:{
        parent:HTMLElement,
        target:HTMLElement,
        divCont:HTMLElement,
        flex:flexType,
        idValues:idValueType[],
        selector:selectorType,
        row:rowType,
        col:colType

    }){
        const {parsed}=Header.checkJson(parent.getAttribute("flex"));
        this.flex=parsed ?  parsed as flexType : flex;
        const css="margin-inline:auto;display:flex;flex-direction:column;gap:1rem;align-items:center;justify-content:center;"
      
        const popup=document.createElement("div");
        popup.className="popup";
        popup.id="popup-createAnchor";
        popup.style.cssText=css + "position:absolute;width:clamp(300px,325px,350px);color:black;border-radius:12px;inset:0%;"
        const form=document.createElement("form");
        form.className="anchor-form mx-auto text-sm";
        form.setAttribute("data-form-group","true");
        form.style.cssText=css + `width:100%; font-size:12px;box-shadow:1px 1px 12px 1px black;border-radius:12px;background-color:white;`;
        const {input:inName,label:lname,formGrp:grpName}=Nav.inputComponent(form);
        grpName.style.cssText=css + "width:100%";
        lname.textContent="name";
        inName.type="text";
        inName.id="name";
        inName.name="name";
        inName.autocomplete="name";
        inName.placeholder="name";
        inName.classList.add("mx-auto");
        inName.style.cssText="width:inherit;margin-block:0.5rem;font-size:12px;";
        lname.setAttribute("for",inName.id);
        const {input:inLink,label:lLink,formGrp:grpLink}=Nav.inputComponent(form);
        grpLink.style.cssText=css + "width:100%";
        inLink.type="url";
        inLink.name="link";
        inLink.pattern="https://.*";
        inLink.id="link";
        inLink.autocomplete="on";
        lLink.textContent="link";
        inLink.placeholder="https://...";
        lLink.setAttribute("for",inLink.id);
       Misc.simpleButton({anchor:form,text:"create",bg:this.btnColor,color:"white",type:"submit",time:400});
        popup.appendChild(form);
        parent.appendChild(popup);
       
        form.addEventListener("submit",async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const selRowCol={selectorId:selector.eleId,rowId:row.eleId,colId:col.eleId} as selRowColType;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const name=formdata.get("name") as string;
                const link=formdata.get("link") as string;
                const anchor=target as HTMLAnchorElement;
                const eleId=target.id;
                anchor.style.cssText="margin-left:0.5rem;padding:1rem;font-size:12px;";
                anchor.className="text-primary";

                // LINK IMAGE
                //PHONE IMAGE
                this.addLinkEmailTelImg({target:anchor,name,image:this.link,href:link,type:"link",isClean:false});
                idValues.push({eleId,id:"editableFalse",attValue:String("false")});
                anchor.removeAttribute("contenteditable");
                //PHONE IMAGE
                // LINK IMAGE

              
                anchor.onclick=()=>{window.open(link,"_blank")};
                anchor.setAttribute("data-link",link)
                idValues.push({eleId,id:"link",attValue:String(link)});
                anchor.setAttribute("is-element","true");
               
                this.elementAdder({target:anchor,idValues,sel:selector,rowEle:row,colEle:col}).then(async(res)=>{
                    if(res ){
                        const ele=res.ele as element_selType;
                        divCont.setAttribute("data-placement",`${ele.order}-A`);
                        res.target.removeAttribute("contenteditable");
                    divCont.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            res.target.classList.toggle("isActive");
                            this.updateElement({target:res.target,idValues});
                            this.removeMainElement({parent,divCont,target:res.target,idValues,selRowCol});
                        }
                    });
                    this.editElement({target:res.target,idValues:res.idValues,selRowCol});//ADDS A LISTENER TO HEADER LABELS
                    }
                });
                divCont.appendChild(anchor);
                parent.appendChild(divCont);
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },380);
                
            }
        });

        
        
    };


    removeHeader({target,parent,idValues}:{parent:HTMLElement,target:HTMLElement,idValues:idValueType[]}){
        target.style.position="relative";
        const cssStyle={color:"white",fontSize:"12px",borderRadius:"50%"};
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.setAttribute("data-delete","selector")
        let idValRms:idValueType[]=[]
        xIconDiv.style.cssText="position:absolute;top:0;right:0;transform:translate(-2px,0px);border-radius:50%;z-index:200;padding:3px;background-color:black;color:white;"
        FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle:cssStyle});
        target.appendChild(xIconDiv);
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                const arr:{targetName:string,imgKey:string}[]=[];
                this._modSelector.selectors.map((sel,index)=>{
                    if(sel.header){
                        idValRms=idValRms.concat(idValues.filter(kat=>(kat.eleId ===sel.eleId)));
                        const {rows}=this._modSelector.checkGetRows({select:sel});
                        rows.map(row=>{
                            idValRms=idValRms.concat(idValues.filter(kat=>(kat.eleId ===row.eleId)));
                            if(row.imgKey ){
                                arr.push({targetName:row.eleId,imgKey:row.imgKey});
                            }else{
                                row.cols.map(col=>{
                                    idValRms=idValRms.concat(idValues.filter(kat=>(kat.eleId ===col.eleId)));
                                    if(col.imgKey){
                                        arr.push({targetName:col.eleId,imgKey:col.imgKey});
                                    }else if(col){
                                        col.elements.map(ele=>{
                                            idValRms=idValRms.concat(idValues.filter(kat=>(kat.eleId ===ele.eleId)));
                                            if(ele.imgKey){
                                                arr.push({targetName:col.eleId,imgKey:ele.imgKey});
                                            };

                                        });
                                    }
                                });
                            }
                        });
                        
                    }
                });
                this._modSelector.selectors.map((sel,index)=>{
                    if(sel.header){
                        this._modSelector.selectors.splice(index,1);
                    }
                });
               
                idValRms.map((kv,index)=>{
                    idValues.map((kat,ind)=>{
                        if(kat.eleId===kv.eleId){
                            idValues.splice(ind,1);
                        }
                    });
                });
                this._modSelector.dataset.upDateIdValues({idValues})
                arr.map(item=>{
                    if(item){
                        const check=this._service.checkFreeImgKey({imgKey:item.imgKey});
                            if(check) return;
                        this._service.adminImagemark(item.imgKey,true).then(async(res)=>{
                            if(res){
                                Misc.message({parent:parent,msg:`${item.imgKey}`,type_:"success",time:400});
                            }
                        });
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
                Misc.fadeOut({anchor:target,xpos:50,ypos:100,time:600});
                setTimeout(()=>{
                    parent.removeChild(target);
                },580);
            }
        });
       
    };

    
    editElement({target,idValues,selRowCol}:{target:HTMLElement | HTMLImageElement,idValues:idValueType[],selRowCol:selRowColType}){
        const eleId=target.id;
        const idValue={eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)} as idValueType;
        this._modSelector.dataset.upDateIdValue({target,idValue,idValues})
       
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
        
        if(selRowCol){
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
                    this._modSelector.blog={...this._modSelector.blog,selectors:this._modSelector.selectors};
                    this._modSelector.localStore({blog:this._modSelector.blog});
                }
            };
           
                const idValue:idValueType={eleId:target.id,id:"update",attValue:"edit"}
                this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
               
        }
            
       
    };




    updateElement({target,idValues}:{target:HTMLElement,idValues:idValueType[]}){
        const eleId=target.id;
        const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
        const imgKey=getImgKey?.attValue ||undefined;
        const selRowCol=this._modSelector.dataset.getIdValue({target,idValues,id:"selRowCol"});
        const {parsed,isJSON}=selRowCol  ? Header.checkJson(selRowCol.attValue) : {isJSON:false,parsed:null};
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]})
        if(isJSON){
            const {rowId,colId}=parsed as selRowColType;
            this._modSelector.selectors=this._modSelector.selectors.map(select=>{
                    if(select.header){
                        const {rows}=this._modSelector.checkGetRows({select});
                        rows.map(row=>{
                            if(row.eleId===rowId){
                                row.cols.map(col=>{
                                    if(col.eleId===colId){
                                        col.elements.map(ele=>{
                                            if(ele.eleId===eleId){
                                                ele.cssText=target.style.cssText;
                                                ele.class=cleaned.join(" ");
                                                ele.imgKey=imgKey;
                                                ele.inner_html=target.innerHTML;
                                               idValues=this._modSelector.datasetSincUpdate({target,ele:ele,idValues,level:"element",loc:"flexbox"});
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
    };

    
    async elementAdder({target,idValues,sel,rowEle,colEle}:{
        target:HTMLElement | HTMLImageElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType

    }): Promise<{
        target: HTMLElement;
        ele: element_selType;
        idValues:idValueType[];
        sel:selectorType;
        rowEle:rowType;
        colEle:colType
    } | undefined>{
        const eleId=target.id;
        const node=target.nodeName.toLowerCase();
        const getEleiDs=idValues.filter(kat=>(kat.eleId===eleId));
        const parent= target.parentElement;
        const parent_id=parent ? parent.id : null;
        let ele:element_selType={} as element_selType;
        if(parent_id) idValues.push({eleId,id:"parent_id",attValue:parent_id})
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        //ADDING selRowCol to idValues
        const selRowCol={selectorId:sel.id,rowId:rowEle.id,colId:colEle.id};
        idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
        //ADDING selRowCol to idValues
        idValues.push({eleId,id:"editableTrue",attValue:"true"});
        idValues.push({eleId,id:"isElement",attValue:"true"});
        idValues.push({eleId,id:"name",attValue:node});
        idValues.push({eleId,id:"elementId",attValue:eleId});
        const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
        const imgKey=getImgKey?.attValue || undefined;
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
        //ADDING ATTRIBUTES
        const check=colEle.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
        if(!check){
                const ID=colEle.elements ? colEle.elements.length:0;
                ele={
                    ...ele,
                    id:ID ,
                    selectorId:sel.id,
                    name:node,
                    class:cleaned.join(" "),
                    eleId:target.id,
                    cssText:target.style.cssText,
                    inner_html:target.innerHTML,
                    attr:undefined,
                    col_id:colEle.id,
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
                getEleiDs.map(kat=>{
                    const attrTest =attrEnumArr.includes(kat.id);
                    const typeTest =typeEnumArr.includes(kat.id as typeEnumType);
                  
                    if(attrTest ){
                        ele.attr=kat.attValue;
                    }else if(typeTest ){
                        ele.type=kat.attValue;
                      
                    }else if(kat.id==="imgKey"){
                        ele.imgKey=kat.attValue;
                    }
                });
                //THIS LOADS THE DEFAULTS AND POPULATES THE ELEMENT BASED ON IDVALUE INPUTS
                const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                    target,
                    sel,
                    row:rowEle,
                    col:colEle,
                    ele,
                    idValues,
                    loc:"flexbox",
                    level:"element",
                    clean:false
                });
                idValues=retIdValues
                idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:eleId});
               
                 //THIS LOADS THE DEFAULTS AND POPULATES THE ELEMENT BASED ON IDVALUE INPUTS
                //RE-ASSIGNMENT HAS NEW INFO FROM TARGET
               
                
                //RE-ASSIGNMENT HAS NEW INFO FROM TARGET
                colEle.elements.push(ele)// oushing it
        };
        //adding it TO ROW
        rowEle.cols=rowEle.cols.map(col_=>{
            if(col_.eleId===colEle.eleId){
                col_=colEle; //updating column
            }
            return col_;
        });
        //adding it TO ROW
        // adding ROW TO SELECTOR
        const {rows}=this._modSelector.checkGetRows({select:sel});
            const newRows=rows.map(row_=>{
                if(row_.eleId===rowEle.eleId){
                    row_.cols=rowEle.cols;
                }
                return row_;
            });
            const stringRows=JSON.stringify(newRows);
            sel={...sel,rows:stringRows};
        // adding ROW TO SELECTOR
        //ADDING SELECTOR TO SELECTORS AND SAVING IT TO LOCAL
        this._modSelector.selectors=this._modSelector.selectors.map(select=>{
            if(select.eleId===sel.eleId){
                select=sel;// ADDING SELECTOR
            }
            return select;
        }); 
        this._modSelector.localStore({blog:this._modSelector.blog});
        //ADDING SELECTOR TO SELECTORS AND SAVING IT TO LOCAL
        //UPDATING IDVALUES
       
        this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(idValues);
        //UPDATING IDVALUES
        return {target,ele:ele as element_selType,idValues,sel,rowEle,colEle};
       
    };
   
   
    addLinkEmailTelImg({target,name,image,href,type,isClean}:{target:HTMLAnchorElement,name:string,image:string,href:string,type:"link"|"email"|"tel",isClean:boolean}){
        const text=new Text(name);
        const img=document.createElement("img");
        img.src=image;
        img.alt="www.ablogroom.com";
        this._modSelector.dataset.insertcssClassIntoComponents({target:img,level:"element",loc:"flexbox",type:"customHeader",id:"linkImgs",headerType:"custom"});
        target.style.display="inline-flex";
        target.style.alignItems="center";
        target.style.gap="4px";
        target.appendChild(img);
        target.appendChild(text);
        target.href=href;
        if(type==="link" && isClean){
             window.open(href,"_blank");target.setAttribute("data-link",href)

        };
        if(type==="email") {target.setAttribute("data-email",href)};
        if(type==="tel"){ target.setAttribute("data-tel",href)}
       
    };


    showLinkEmailTelImg({target,element,type,isClean}:{target:HTMLAnchorElement,element:elementType|element_selType,type:"link"|"email"|"tel",isClean:boolean}){
       target.innerHTML=element.inner_html;
       const href=element.attr as string;
       target.href=href;
       if(type==="link" && isClean){ window.open(href,"_blank");target.setAttribute("data-link",href)};
       if(type==="email") {target.setAttribute("data-email",href)};
       if(type==="tel"){ target.setAttribute("data-tel",href)}
        
       
    };
   
   static insertBgImage(target:HTMLElement,urlImg:string){
    const cssArr=target.style.cssText.split(";");
        cssArr.push(`background-image:url(${urlImg})`);
        cssArr.push("background-size:100% 100%");
        cssArr.push("background-position:50% 50%");
        target.style.cssText=cssArr.join(";");
    };
    
   
     static flexColPutter(target:HTMLElement,element:colType,flex:flexType){
        
        flex={...flex,colId:element.eleId}
            const ID=JSON.stringify(flex);
            target.id=element.eleId;
            target.setAttribute("is-column","true");
            target.setAttribute("flex",ID);
        
      };
    static  flexRowPutter(target:HTMLElement,element:rowType,flex:flexType){
        flex={...flex,rowId:element.eleId}
            const ID=JSON.stringify(flex);
            target.id=element.eleId;
            target.setAttribute("is-row","true");
            target.setAttribute("flex",ID);
      }
      static cleanOnID(target:HTMLElement,ID:string){
        ([...target.children as any] as HTMLElement[]).map(child=>{
            if(child.id ===ID){
                target.removeChild(child);
            }
        });
      }

}
export default CustomHeader;
import {flexType,element_selType,colType,rowType,selectorType,columnAttrType,colAttrType, blogType} from "./Types";
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
}






class CustomHeader {
    flex:flexType;
    isRefreshed:boolean;
    bgColor="#0C090A";
    btnColor:string;
    customSetup:CustomSetup;
    flexbox:Flexbox;
    divCont_css:string;
    divCont_class:string;
    _selector:selectorType;
    _header:selectorType;
    static nameValueAttrs:columnAttrType[]=[{id:0,name:"select",value:"#"},{id:1,name:"image",value:"img",level:"element"},{id:1,name:"h1",value:"h1",level:"element"},{id:2,name:"h2",value:"h2",level:"element"},{id:3,name:"h3",value:"h3",level:"element"},{id:4,name:"h4",value:"h4",level:"element"},{id:5,name:"p",value:"p",level:"element"},{id:6,name:"logo",value:"img",level:"element"},{id:7,name:"bg-image",value:"img",level:"element"},{id:8,name:"rm-bg-image",attr:"rm-bg-image",level:"col"},{id:8,name:"quote",value:"blockquote",level:"element"},{id:9,name:"ul",value:"ul",level:"element"},{id:10,name:"link",value:"a",level:"element"},{id:11,name:"h5",value:"h5",level:"element"},{id:12,name:"h6",value:"h6",level:"element"},{id:13,name:"line",value:"hr",level:"element"},{id:14,name:"vertical-line",value:"vertical-line",level:"element"},{id:15,name:"span",value:"span",level:"element"},{id:16,name:"email",value:"email",level:"element"},{id:17,name:"insert-tel",value:"insert-tel",level:"element"},{id:18,attr:"bg-color",name:"bg-color",level:"col"},{id:19,name:"adjust-img-size",attr:"adjust-img-size",level:"element"},{id:20,name:"pretty-font",attr:"pretty-font",level:"element"},{id:21,name:"flex-normal",attr:"flex-normal",level:"col"},{id:22,name:"flex-static",attr:"flex-static",level:"col"},{id:23,name:"flex-double",attr:"flex-double",level:"col"},{id:24,name:"skew-45",attr:"skew-45",level:"element"},{id:25,name:"skew-15",attr:"skew-15",level:"element"},{id:26,name:"flex-row",attr:"flexRow",level:"col"},{id:27,name:"flex-col",attr:"flexCol",level:"col"},{id:28,name:"box-shadow",attr:"box-shadow-md1",level:"element"},{id:29,name:"round",attr:"round",level:"element"},{id:30,name:"shadow-round",attr:"box-shadow-round",level:"element"},{id:31,name:"flex-1/4",attr:"flex-quarter",level:"col"},{id:32,name:"flex-1/2",attr:"flex-half",level:"col"},{id:33,name:"flex-3/4",attr:"flex-three-quarter",level:"col"},{id:34,name:"flex-default",attr:"flex-default",level:"col"},{id:35,name:"bg-row-color",attr:"background-row",remove:false,level:"row"},{id:36,name:"bg-row-image",attr:"bg-row-image",remove:false,level:"row"},{id:37,name:"bg-row-height",attr:"bg-row-height",remove:false,level:"row"}];


    static columnAttrs:columnAttrType[]=[{id:0,name:"select",attr:"select",remove:false},{id:1,name:"remove-drop-down",attr:"remove",remove:false},{id:2,name:"flex-normal",attr:"flex-normal",remove:false},{id:3,name:"flex-static",attr:"flex-static",remove:false},{id:4,name:"flex-double",attr:"flex-double",remove:false},{id:5,name:"flex-row",attr:"flexRow",remove:false},{id:6,name:"flex-col",attr:"flexCol",remove:false},{id:7,name:"flex-1/4",attr:"flex-quarter",remove:false},{id:8,name:"flex-3/4",attr:"flex-three-quarter",remove:false},{id:9,name:"flex-1/2",attr:"flex-half",level:"col"},{id:10,name:"bg-color",attr:"bg-color",remove:false},{id:11,name:"flex-col-normal",attr:"flexCol-normal",remove:false},{id:12,name:"header-height",attr:"header-height",remove:false},{id:13,name:"flex-default",attr:"flex-default",remove:false}];

    static columnPartition:columnAttrType[]=[{id:1,name:"flex-normal",attr:"flex-normal",remove:false},{id:2,name:"flex-static",attr:"flex-static",remove:false},{id:3,name:"flex-double",attr:"flex-double",remove:false},{id:4,name:"flex-row",attr:"flexRow",remove:false},{id:5,name:"flex-col",attr:"flexCol",remove:false},{id:6,name:"flex-1/4",attr:"flex-quarter",remove:false},{id:7,name:"flex-1/2",attr:"flex-half",level:"col"},{id:8,name:"flex-3/4",attr:"flex-three-quarter",remove:false},{id:9,name:"flex-col-normal",attr:"flexCol-normal",remove:false},{id:10,name:"flex-default",attr:"flex-default",remove:false}];

    constructor(private _modSelector:ModSelector,private _service:Service,public header:Header,private _user:User,public _shapeOutside:ShapeOutside){
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
            rows:[] as rowType[],
            footer:false,
            headerType:"custom",
        }
        this._header={} as selectorType;
    }
//-----------------GETTERS SETTERS-------------------//
get header_(){
    return this._header;
}
set header_(header:selectorType){
    this._header=header;
}
//-----------------GETTERS SETTERS-------------------//

//EDIT INJECTION AFTER REFRESH
    showCustHdrSelector(parent:HTMLElement,selector:selectorType,isRefresh:boolean){
        //THIS TAKES BLOG DATA FROM LOCALSTORAGE("BLOG") AND DISPLAYS WITHS ATTRIBUTES TO CHANGE IF REFRESHED
    this.isRefreshed=isRefresh
    parent.style.width=`100%`;
        if(selector && selector.name){
            selector={...selector,headerType:"custom"};
            this.header_={...selector,headerType:"custum"};
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
            this.flex={...this.flex,selectorId:selector.eleId,placement:selector.placement,col:selector.colNum,row:selector.rowNum}
                selector.rows.sort((a,b)=>{if(a.order < b.order) return -1;return 1}).map((row_)=>{
                    const row=document.createElement("div");
                    row.className=row_.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                    row.style.cssText=row_.cssText;
                    row.setAttribute("name",row_.name);
                    row.id=row_.eleId;
                    this.flex={...this.flex,rowId:row_.eleId,order:row_.order};
                    if(row_.imgKey){
                        this.flex={...this.flex,backgroundImage:true};
                        row.setAttribute("data-backgroundimage","true");
                        const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                        this._service.injectBgAwsImage({target:row,imgKey:row_.imgKey,cssStyle});
                    
                    }
                    row.setAttribute("flex",JSON.stringify(this.flex));
                    row_.cols.sort((a,b)=>{if(a.order < b.order) return -1;return 1}).map(col_=>{
                        const col=document.createElement("div");
                        col.id=col_.eleId;
                        col.style.cssText=`${col_.cssText}`;
                        col.className=col_.class;
                        this.flex={...this.flex,colId:col_.eleId,order:col_.order};
                        if(col_.imgKey){
                            this.flex={...this.flex,backgroundImage:true};
                            col.setAttribute("data-backgroundimage","true");
                            const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                            this._service.injectBgAwsImage({target:col,imgKey:col_.imgKey,cssStyle});
                        
                        }
                        col.setAttribute("flex",JSON.stringify(this.flex));
                        this.customElementChoices(col,this.flex,this.isRefreshed);
                        col.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                this.flex={...this.flex,colId:col_.eleId}
                                col.classList.toggle("coliIsActive");
                                this._modSelector.updateColumn(col,this.flex);
                                //new elements and attr(s)
                                if(ModSelector.isActive(col)){
                                    // console.log("flex",this.flex)
                                }
                            
                            }
                        });
                        col_.elements.sort((a,b)=>{if(a.order < b.order) return -1;return 1}).map((element)=>{
                            this.flex={...this.flex,elementId:element.eleId,colId:col.id,order:element.order,imgKey:element.imgKey,position:"element",anchorContainer:element.attr}
                            this.headerElementCreatorBuilder(col,null,this.flex,element,true);

                        });
                        row.appendChild(col);
                    });
                    innerCont.appendChild(row);
                    // console.log(innerCont)//works
                });
                this.removeHeader(parent,innerCont);
            parent.appendChild(innerCont);
        }
    };
//MAIN CUSTOM INJECTION (SELECTED FROM SIDEBAR)-parent=this._main.mainHeader
    customHeader(parent:HTMLElement,isRefresh:boolean){
        //THIS IS THE INJECTION POINT FOR CUSTOM HEADER DESIGN.THIS IS INTEGRATED INTO showCustHdrSelector if REFRESHED
        this.isRefreshed=isRefresh;
        const blog=this._modSelector._blog;
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
            mainHeader.id="mainHeader";
            this.flex={...this.flex,selectorId:mainHeader.id}
            mainHeader.setAttribute("name","header");
            mainHeader.className="mainHeader flexCol text-center position-relative mb-5 ";
            //headerStyleCreator=> creates styles
           
            mainHeader.style.cssText="padding-inline:5px;justify-content:center;width:100%;";
            const row=document.createElement("div");
            row.setAttribute("is-row","true");
            row.setAttribute("order","1");
            row.className="row w-100 box-shadow-md1";
            row.style.cssText="min-height:20vh;position:relative;padding:5px;width:100%";
            let select:selectorType={} as selectorType;
            const colAttr:colAttrType={
                id:0,
                T:2,
                B:0,
                selector_id:0
            }
            select={...select,
                id:0,
                placement:0,
                eleId:mainHeader.id,
                name:"section",
                header:true,
                footer:false,
                headertype:"custom",
                rowNum:0,
                colNum:2,
                class:mainHeader.className,
                cssText:mainHeader.style.cssText,
                rows:[] as rowType[],
                colAttr:[colAttr],
                headerType:"custom",
            } as selectorType;
            this.promSelectorAdd(mainHeader,select).then((value:selectorType)=>{
                this.flex={...this.flex,order:1};
                const flexRow=Main.flexRowTracker(row,this.flex);//works
                this.promRowAdder(row,value.eleId).then((selector:selectorType)=>{
                    if(selector){
                        this.selectColunms(row,flexRow,selector);
                    }
                });//works
                
            });//works
            // this.selectColunms(row,flexRow,select);
            this.removeHeader(parent,mainHeader);
            mainHeader.appendChild(row);
            parent.appendChild(mainHeader);
            Misc.fadeIn({anchor:mainHeader,xpos:50,ypos:100,time:600});
            
        }
     }

     //PARENT customHeader()
     promSelectorAdd=(target:HTMLElement,selector:selectorType):Promise<selectorType>=>{
        const prom= new Promise((resolver)=>{
        resolver(this.selectorAdder(target,selector))
     });
     return prom as Promise<selectorType>
    }
    promRowAdder=(row:HTMLElement,selectorId:string):Promise<selectorType>=>{
        const pron=new Promise((resolver)=>{
            resolver(this.rowAdder(row,selectorId));
        });
        return pron as Promise<selectorType>;
    }
     promSelColumns=(row:HTMLElement,flex:flexType,selector:selectorType)=>{
        const promSelCols=new Promise((resolver)=>{
            resolver(this.selectColunms(row,flex,selector));
        });
        return promSelCols as Promise<HTMLElement[]>
     }
     selectColunms(row:HTMLElement,flex:flexType,selector:selectorType){
        //THIS INCORPORATES USERS SELECTION ON number of COLUMNS
        // this._modSelector.header=selector;
        const arr:HTMLElement[]=[];
        const {selectorId}=flex;
        const {retRow,input,btn,formGrp}=this.customSetup.columnSetup(selector,row);
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                // e.preventDefault();
               const value=(input as HTMLInputElement).value;
                const nums=parseInt(value) as number;
                // if(!nums) return;
                this._modSelector.selectors=this._modSelector._selectors.map(sel=>{
                    if(sel.eleId===selectorId){
                        selector.colNum=nums;
                        selector.colAttr[0].T=nums;
                        sel=selector;
                    }
                    return sel;
                });

                ModSelector.genArray(nums).map(()=>{
                    const col=document.createElement("div");
                    const numCol=`${12/nums}`;
                    col.className=`col-md-${numCol} box-shadow column column-header`;
                    col.style.cssText=`position:relative;flex:1 1 ${1/nums*100}%;min-height:15vh;`;
                    retRow.appendChild(col);
                    const flexCol=Main.flexColTracker(col,flex);//THIS ADDS FLEX TO COLUMN ATTRIBUTES AS WELL AS UNIQUE ID
                    this.columnAdder(col);
                    arr.push(col);
                    this.customElementChoices(col,flexCol,false);
                    col.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            col.classList.toggle("coliIsActive");
                        }
                    });
                });
                Header.removeEffect(retRow,formGrp);
            }
        });
       
     }
    
    
     selectorAdder(target:HTMLElement,selector:selectorType):selectorType{
        //THIS ADDS SELECTOR CONTAINER FOR ROWS/COLS TO MODSELECTOR.BLOG
        const checkPlaceHeader=selector.header ? 0 :this._modSelector.placement;
        const checkHeader=this._modSelector._selectors.find(sel=>(sel.header===selector.header));
        if(checkHeader){
            this._modSelector.selectors.map((sel,index)=>{
                if(sel.eleId===checkHeader.eleId){
                this._modSelector._selectors.splice(index,1);
                }
            });
        }
        const newSelect:selectorType={
            ...selector as selectorType,
            id:checkPlaceHeader,
            name:target.getAttribute("name")? target.getAttribute("name") : "",
            eleId:target.id,
            class:target.className,
            cssText:target.style.cssText,
            rows:[] as rowType[],
            header:checkPlaceHeader===0 ? true : false,
            placement:selector.footer ? this._modSelector.footerPlacement() :checkPlaceHeader,
            footer:selector.footer,
            headerType:"custom",
        } as selectorType;
        this._modSelector.count=this._modSelector.count+1;
        this._modSelector._selectors.push(newSelect);
        this._modSelector.selectors=this._modSelector._selectors;
        this._modSelector.footerPlacement();
        if(checkPlaceHeader !==0){
            this._modSelector.placement=this._modSelector.placement + 1;
        }
        if(selector.header){
            this._modSelector.header=newSelect;
        }
        if(selector.footer){
            this._modSelector.footer=newSelect;
        }
        //addAttributes
        target.setAttribute("is-selector","true");
        return newSelect
    }

    rowAdder(target:HTMLElement,selectorId:string):selectorType{
        //THIS ADDS ROW INFO TO _modSelector.blog
        let row_:rowType={} as rowType;
        this._modSelector._selectors=this._modSelector._selectors.map(select=>{
            if(select.eleId===selectorId){

                const ID=select.rows ? select.rows.length :0;
                    row_={
                        id: ID,
                        name:target.getAttribute("name") ? target.getAttribute("name") as string : '' ,
                        class:target.className,
                        eleId:target.id,
                        inner_html:target.textContent ? target.textContent : "",
                        cssText:target.style.cssText,
                        cols:[] as colType[],
                        selector_id:select.id,
                        order:ID
                    } as rowType;
                    select.rows.push(row_);
            }
            this._modSelector.header=select;
            return select;
        });
        this._modSelector.selectors=this._modSelector._selectors;
        return this._modSelector._selectors.filter(sel=>(sel.eleId===selectorId))[0]
    }

    columnAdder(column:HTMLElement){
        const {parsed,isJSON}=Header.checkJson(column.getAttribute("flex"));
        if(isJSON){
            const flex=parsed as flexType;
            const {selectorId,rowId}=flex;

            this._modSelector._selectors=this._modSelector._selectors.map(sel=>{
                // console.log("columnAdder:selector cmp:",sel.eleId,selectorId);//works
            if(sel.eleId===selectorId){
                //DOES NOT SEE ROW
                sel.rows.map(row=>{
                    // console.log("columnAdder:row:",row);
                    // console.log("columnAdder:row cmp:",row.eleId,rowId);//doesnt work
                    if(row.eleId===rowId){
                        const ID=row.cols.length
                        const col={
                            id:ID,
                            name:column.getAttribute("name") ? column.getAttribute("name") as string : '' ,
                            class:column.className,
                            eleId:column.id,
                            inner_html:column.textContent ? column.textContent : "",
                            cssText:column.style.cssText,
                            elements:[] as element_selType[],
                            row_id:row.id,
                            order:ID,
                        }as colType;
                        row.cols=[...row.cols,col]
                    }
                    // console.log("COLS ADDED",row.cols);
                    return row;
                });
            }
                this._modSelector.header=sel;
                return sel;
            });
            this._modSelector.selectors=this._modSelector._selectors;
        }
    }
   

     ////////////PARENT showHideTools///////////////////////
     ///PARENT : selectColumn():ELEMENT SELECTION/////
     customElementChoices(column:HTMLElement,flex:flexType,isRefreshed:boolean){
        //AT ROW TO SELECT NUMS OF COLUMNS
        // const eleNameValueArr:{name:string,value:string}[]=[{name:"p",value:"p"},{name:"h1",value:"h1"},{name:"h2",value:"h2"},{name:"h3",value:"h3"},{name:"h4",value:"h4"},{name:"logo",value:"img"},{name:"image",value:"img"},{name:"bgImage",value:"bgImage"},]
        this.flex = flex;
        // console.log("flex",this.flex)//works
        const divFormGrp=document.createElement("div");
        divFormGrp.className="form-group text-sm popup";
        divFormGrp.setAttribute("is-popup","true");
        divFormGrp.className="popup-customheader-elementchoices";
        divFormGrp.setAttribute("data-form-group","true");
        divFormGrp.style.cssText="margin:0px;z-index:200;width:fit-content;height:18px;position:absolute;font-size:12px;box-shadow:1px 1px 3px lightgrey";
        // divFormGrp.style.top="50%";
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
        
        CustomHeader.nameValueAttrs.sort((a,b)=>{if(a.id < b.id){ return -1} else{ return 1}}).map((nameValueAtt)=>{
            const option=document.createElement("option");
            option.id=`${nameValueAtt.id}`;
            option.value=JSON.stringify(nameValueAtt);
            option.textContent=`${nameValueAtt.id})-${nameValueAtt.name}`;
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
        column.appendChild(divFormGrp);
        select.addEventListener("change",(e:Event)=>{
            if(e){
                e.preventDefault();
                const colValAtt=(e.currentTarget as HTMLSelectElement).value;
                if(!colValAtt) return
                const colAttrName:columnAttrType=JSON.parse(colValAtt);
                //Is  number
                const {name,attr,value,level}=colAttrName
                if(value){
                    /////----!!!ELEMENTS ONLY=>colAttrName.value===nodeName.lowercase---/////
                    this.headerElementCreatorBuilder(column,colAttrName,this.flex,null,false);
                
                }else if(attr ){
                    if(level==="element"){

                        if(attr ==="adjust-img-size"){
                        
                            this.changeImgSize(column);
                        }else if(attr==="pretty-font"){
                            const eleActives=column.querySelectorAll("[is-element].isActive");
                            ([...eleActives as any] as HTMLElement[]).forEach(element=>{
                                // console.log(element)//works
                                    element.classList.toggle(attr as string);
                                    if(!isRefreshed){
                                    this.updateElement(element);
                                    }
                                // }
                            });
                        }else{
                            //-------!!ONLY ATTRIBUTE@ element level-----/////
                            const eleActives=column.querySelectorAll("[is-element].isActive");
                            ([...eleActives as any] as HTMLElement[]).forEach(element=>{
                                // console.log(element)//works
                                    element.classList.toggle(attr as string);
                                    if(!isRefreshed){
                                    this.updateElement(element);
                                    }
                                // }
                            });
                        }
                    }else if(level==="col"){
                        
                        if(name==="bg-color"){
                            this.columnColor(column,attr,flex)
                        }else{
                            column.classList.toggle(attr);
                            this._modSelector.updateColumn(column,flex);
                            this.changePartition(column,attr);
                        }
                     }else if(level==="row"){
                        if(name==="bg-row-color"){
                        const parent=column.parentElement as HTMLElement;
                        this.rowColor(parent,flex);
                        }else if(name==="bg-row-height"){
                            this.rowHeight(column);
                        }
                     }
                    
                }
                
            }
            select.selectedIndex=0;
            this.removeChoices(column,divFormGrp);
        });
       
        
    }

    changePartition(column:HTMLElement,attr:string):void{
        //THIS CHANGES FLEX PARTITION (ie;flex:1 1 25%,,,50%,,,75%)
        const row=column.parentElement as HTMLElement;
        const {parsed}=Header.checkJson(column.getAttribute("flex"));
        const columns=([...row.children as any] as HTMLElement[]);
        const colLen=columns.length;
        const checkAttr =CustomHeader.columnPartition.find(colAttr=>(colAttr.attr===attr));
        if(checkAttr){
                switch(true){
                    case checkAttr.attr==="flex-normal":
                        column.style.display="flex";
                        column.style.flexDirection="row";
                        column.style.flexWrap="wrap";
                        column.style.justifyContent="flex-start";
                        column.style.alignItems="flex-start";
                        const flex=parsed as flexType;
                        this._modSelector.updateColumn(column,flex);
                    return 
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
                        column.style.display="flex";
                        column.style.flexDirection="row";
                        column.style.flexWrap="nowrap";
                        column.style.justifyContent="flex-start";
                        column.style.alignItems="flex-start";
                        const flex1=parsed as flexType;
                        this._modSelector.updateColumn(column,flex1);
                    return 
                    case checkAttr.attr==="flexCol":
                        column.style.display="flex";
                        column.style.flexDirection="column";
                        const flex2=parsed as flexType;
                        this._modSelector.updateColumn(column,flex2);
                        return 
                    case checkAttr.attr==="flex-quarter":
                        columns.map(col=>{
                            if(col){
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
                        column.style.display="flex";
                        column.style.flexDirection="column";
                        column.style.justifyContent="flex-start";
                        column.style.alignItems="flex-start";
                        const flex3=parsed as flexType;
                        this._modSelector.updateColumn(column,flex3);
                        return 
                    case checkAttr.attr==="flex-default":
                        const lenArr:number[]=Array.from((Array(colLen).keys()));
                        columns.map((col,index)=>{
                            if(col){
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
                                const {parsed}=Header.checkJson(column.getAttribute("flex"));
                                const flex=parsed as flexType;
                                this._modSelector.updateColumn(col,flex)
                            }
                        });

                    return;
                }
        }
    }

    removeChoices(column:ParentNode,target:HTMLElement){
        target.style.position="relative";
        const cssStyle={color:"red"}
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.setAttribute("data-delete","selector")
        // xIconDiv.classList.add("delete");
        xIconDiv.style.cssText="position:absolute;top:0;right:0;transform:translate(-2px,0px);border-radius:50%;"
        FaCreate({parent:xIconDiv,name:FaTrash,cssStyle:cssStyle});
        target.appendChild(xIconDiv);
        column.appendChild(target);
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                
                Misc.fadeOut({anchor:target,xpos:50,ypos:100,time:600});
                setTimeout(()=>{
                    column.removeChild(target);
                },580);
            }
        });
    }
        //FLEX TOOLS
    
    //PARENT columnFlexChoices()
    headerElementCreatorBuilder(column:HTMLElement,nameValAttr:columnAttrType|null,flex:flexType,element:element_selType|null,isRefreshed:boolean){

        const divCont=document.createElement("div");
        divCont.setAttribute("data-placement","A");
        divCont.className=this.divCont_class;
        divCont.style.cssText=this.divCont_css;

        const {parsed,isJSON}=Header.checkJson(column.getAttribute("flex"));
        let flex_=isJSON ? parsed as flexType : flex;
        const {colId}=flex_;
        const eleName= element ? element.name : "";
        divCont.setAttribute("data-placement",`${element?.order}-A`);
        const link=element && element.attr && element.attr.startsWith("http") ? element.attr : null;
        const email=element && element.attr && element.attr.startsWith("email") ? element.attr : null;
        const tel=element && element.attr && element.attr.startsWith("tel") ? element.attr : null;
        const nodename=nameValAttr && nameValAttr.value ? nameValAttr.value : eleName;
        const nameLabel=nameValAttr && nameValAttr.name ? nameValAttr.name as string : "";
        const isUlType=["ul","ol","blockquote"].includes(nodename ? nodename : eleName as string);
        const textEle=["p","h1","h2","h3","h4","h5","h6",].includes(nodename ? nodename : eleName as string);
        const checkLine=["hr","div"].includes(nodename ? nodename : eleName as string);
        const showEleTexts:{name:string,value:string}[]=[{name:"p",value:"paragraph insert here"},{name:"h1",value:"title"},{name:"h2",value:"subtitle"},{name:"h3",value:"sub-subtitle"},{name:"ul",value:"add item"},{name:"ol",value:"ordered list"},{name:"blockquote",value:"your quote"}];
        const text=showEleTexts.find(nameVal=>(nameVal.name===nodename));
        if(isRefreshed && element && !nameValAttr){
            this.flex={...flex_,elementId:element.eleId,colId:column.id,order:element.order,imgKey:element.imgKey,position:"element"}
            //!!! GETTING ELEMENT FROM ALREADY COMPLETED WORK
            switch(true){
                case textEle:

                    const target=document.createElement(element.name);
                    target.setAttribute("contenteditable","true");
                    target.innerHTML=element.inner_html;
                    target.style.cssText=element.cssText;
                    target.className=element.class;
                    target.id=element.eleId
                    target.setAttribute("flex",JSON.stringify(this.flex));
                    target.setAttribute("order",String(element.order));
                    target.setAttribute("is-element","true");
                    target.style.cssText="padding-inline:1.25rem;border-radius:8px;";
                    if(element.attr && element.name==="a"){
                        (target as HTMLAnchorElement).href=element.attr;
                        target.setAttribute("data-href",`${element.attr}`);
                    }
                    divCont.appendChild(target);
                    column.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    ModSelector.modAddEffect(divCont);
                    
                    target.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            target.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            // this.updateCustom(target);//even listener:btns
                            this.modifyColEleAttrs(column,nameValAttr,this.flex);
                            const check=([...target.classList as any] as string[]).includes("isActive")
                            if(check){
                                this.removeMainElement(column,divCont,target);
                                this.updateElement(target);//updates class and cssText;
                            }
                        }
                    });
                
                    this.editElement(target);//ADDS A LISTENER TO HEADER LABELS
                return;
                case isUlType:

                    const ulTypePlus=document.createElement(element.name);
                    ulTypePlus.setAttribute("contenteditable","true");
                    ulTypePlus.innerHTML=element.inner_html;
                    ulTypePlus.style.cssText=element.cssText;
                    ulTypePlus.className=element.class;
                    ulTypePlus.id=element.eleId
                    ulTypePlus.setAttribute("flex",JSON.stringify(this.flex));
                    ulTypePlus.setAttribute("order",String(element.order));
                    ulTypePlus.setAttribute("is-element","true");
                    ulTypePlus.style.cssText="padding-inline:1.25rem;border-radius:8px;";
                    divCont.appendChild(ulTypePlus);
                    column.appendChild(divCont);
                    ModSelector.modAddEffect(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    
                    ulTypePlus.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            ulTypePlus.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            // this.updateCustom(target);//even listener:btns
                            this.modifyColEleAttrs(column,nameValAttr,this.flex);
                            const check=([...ulTypePlus.classList as any] as string[]).includes("isActive")
                            if(check){
                                this.removeMainElement(column,divCont,ulTypePlus);
                                this.updateElement(target);//updates class and cssText;
                            }
                        }
                    });
                
                    this.editElement(ulTypePlus);//ADDS A LISTENER TO HEADER LABELS
                return;
                case element.name==="img":
                    
                    const logo=document.createElement(element.name) as HTMLImageElement;
                    logo.id=element.eleId;
                    logo.style.cssText=element.cssText;
                    logo.className=element.class;
                    logo.src=element.img ? element.img : "#";
                    logo.alt=element.inner_html;
                    if(element.imgKey){
                        this.flex={...this.flex,imgKey:element.imgKey};
                    }
                    divCont.setAttribute("data-placement",`${element.order}-A`);
                    logo.setAttribute("contenteditable","false");
                    logo.setAttribute("flex",JSON.stringify(this.flex));
                    logo.setAttribute("is-element","true");
                    logo.setAttribute("order",String(element.order));
                    divCont.appendChild(logo);
                    column.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    logo.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            logo.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            this.removeMainElement(column,divCont,logo);
                            // this.updateCustom(target);//even listener:btns
                            this.modifyColEleAttrs(column,nameValAttr,this.flex);
                            this.updateElement(logo);//updates class and cssText;
                        }
                    });
                    
                return;
                case checkLine:

                    const line=document.createElement(element.name);
                    line.textContent=element.inner_html ? element.inner_html : "";
                    line.style.cssText=element.cssText;
                    line.className=element.class;
                    line.id=element.eleId
                    line.setAttribute("flex",JSON.stringify(this.flex));
                    line.setAttribute("is-element","true");
                    line.setAttribute("order",String(element.order));
                    divCont.setAttribute("data-placement",`${element.order}-A`);
                    divCont.appendChild(line);
                    column.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    ModSelector.modAddEffect(divCont);
                    
                    line.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            line.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            // this.updateCustom(target);//even listener:btns
                            this.modifyColEleAttrs(column,nameValAttr,this.flex);
                            const check=([...line.classList as any] as string[]).includes("isActive")
                            if(check){
                                this.removeMainElement(column,divCont,line);
                                this.updateElement(line);//updates class and cssText;
                            }
                        }
                    });
                return;
                case nameLabel==="rm-bg-image":
                    flex_.name="";
                    this.rmBgImage(column);
                return;
                case link !==null:
                    flex={...flex,anchorContainer:link};
                    const anchor=document.createElement("a");
                    anchor.setAttribute("data-href",link);
                    anchor.setAttribute("flex",JSON.stringify(flex));
                    anchor.textContent=element.inner_html;
                    anchor.onclick=()=>{
                        window.open(link,"_blank");
                    }
                    divCont.appendChild(anchor);
                    column.appendChild(divCont);
                return;
                case email !==null:
                    flex={...flex,anchorContainer:email};
                    const email_=document.createElement("a");
                    email_.setAttribute("data-href-email",email);
                    email_.setAttribute("flex",JSON.stringify(flex));
                    email_.textContent=element.inner_html;
                    email_.href=email;
                    divCont.appendChild(email_);
                    column.appendChild(divCont);
                return;
                case tel !==null:
                    flex={...flex,anchorContainer:tel};
                    const tel_=document.createElement("a");
                    tel_.setAttribute("data-href-tel",tel);
                    tel_.setAttribute("flex",JSON.stringify(flex));
                    tel_.textContent=element.inner_html;
                    tel_.href=tel;
                    divCont.appendChild(tel_);
                    column.appendChild(divCont);
                return;
                default:
                    return;
            }
        }else{
            //NEW ELEMENTS ADDED
            const {name,}=nameValAttr as columnAttrType;
            const {parsed}=Header.checkJson(column.getAttribute("flex"));
            this.flex=parsed as flexType;
            switch(true){
                case textEle:
                    const context=text? text.value as unknown as string:" insert here";
                    const target=document.createElement(nodename);
                    target.className="my-auto";
                    target.textContent=context;
                    flex_={...flex_,colId:colId}
                    const flexOne=Main.flexTracker(target,flex_);
                    this._modSelector.promElementAdder(target).then(async(res)=>{
                        if(res){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                        }
                    });//adds both selector eles and elements
                    divCont.appendChild(target);
                    column.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    ModSelector.modAddEffect(target);
                    target.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            target.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            // this.updateCustom(target);//even listener:btns
                            this.modifyColEleAttrs(column,nameValAttr,flexOne);
                            const check=([...target.classList as any] as string[]).includes("isActive");
                            if(check){
                                this.removeMainElement(column,divCont,target);
                                this.updateElement(target);//updates class and cssText;
                            }
                        }
                    });
                
                    this.editElement(target);//ADDS A LISTENER TO HEADER LABELS
                return;
                case nodename==="a" && !(name ==="email" || name ==="insert-tel"):
                    this.createAnchor(column);
                return;
                case isUlType:
                    const context1=text? text.value as unknown as string:" insert here";
                    const ulTypePlus=document.createElement(nodename);
                    ulTypePlus.setAttribute("contenteditable","true");
                    flex_={...flex_,colId:colId}
                    Main.flexTracker(ulTypePlus,flex_);
                    this._modSelector.promElementAdder(ulTypePlus).then(async(res)=>{
                        if(res){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                        }
                    });//adds both selector eles and elements
                    ulTypePlus.innerHTML=context1;
                    ulTypePlus.style.cssText="margin:0;margin-left:0.5rem";
                    ulTypePlus.className=nodename;
                    ulTypePlus.setAttribute("is-element","true");
                    divCont.appendChild(ulTypePlus);
                    column.appendChild(divCont);
                    ModSelector.modAddEffect(divCont);
                    
                    ulTypePlus.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            ulTypePlus.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            // this.updateCustom(target);//even listener:btns
                            this.modifyColEleAttrs(column,nameValAttr,flex);
                            const check=([...ulTypePlus.classList as any] as string[]).includes("isActive")
                            if(check){
                                this.removeMainElement(column,divCont,ulTypePlus);
                                this.updateElement(target);//updates class and cssText;
                            }
                        }
                    });
                
                    this.editElement(ulTypePlus);//ADDS A LISTENER TO HEADER LABELS
                return;
                case nameLabel==="logo":
                    this.getImage(column,this.flex,nameLabel);
                    
                return;
                case nameLabel==="bg-image":
                    const {parsed,isJSON}=Header.checkJson(column.getAttribute("flex"));
                    if(isJSON){
                        const flex=parsed as flexType;
                        this.getBgImage({column,flex,blog:this._modSelector.blog});
                    }
                return;
                case nameLabel==="bg-row-image":
                    this.bgRowImage({column,blog:this._modSelector.blog});
                return;
                case nameLabel==="rm-bg-image":
                    this.rmBgImage(column);
                return;
                case nameLabel==="image":
                    this.getImage(column,this.flex,nameLabel);
                    
                return;
                case name==="email":
                    this.getEmail(column);
                    
                return;
                case name==="insert-tel":
                    this.insertTel(column);
                    
                return;
                case nameLabel==="line":
                    const hr=document.createElement("hr");
                    hr.className="my-auto";
                    hr.style.cssText="width:75%;height:3px;border-radius:10px;margin-block:1.25rem;margin-inline:auto;"
                    const flexHr=Main.flexTracker(hr,this.flex);
                    this._modSelector.promElementAdder(hr).then(async(res)=>{
                        if(res){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                        }
                    });//adds both selector eles and elements
                    divCont.appendChild(hr);
                    column.appendChild(divCont);
                    ModSelector.modAddEffect(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    hr.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            hr.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            // this.updateCustom(target);//even listener:btns
                            this.modifyColEleAttrs(column,nameValAttr,flexHr);
                            const check=([...hr.classList as any] as string[]).includes("isActive");
                            if(check){
                            this.removeMainElement(column,divCont,hr);
                            this.updateElement(hr);//updates class and cssText;
                            }
                        }
                    });;
                    
                return;
                case nameLabel==="vertical-line":
                    const height=window.getComputedStyle(column).getPropertyValue("height");
                    const div=document.createElement("div");
                    div.className="vertical-line";
                    div.setAttribute("data-line-width","3px");
                    div.style.cssText=`margin-right:0.25rem;width:3px;height:${height};margin-right:0.25rem;background-color:black;`
                    const flexDiv=Main.flexTracker(div,this.flex);
                    this._modSelector.promElementAdder(div).then(async(res)=>{
                        if(res){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                        }
                    });//adds both selector eles and elements
                    divCont.appendChild(div);
                    column.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    ModSelector.modAddEffect(divCont);
                    div.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            div.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            // this.updateCustom(target);//even listener:btns
                            const check=([...div.classList as any] as string[]).includes("isActive");
                            if(check){
                                this.modifyColEleAttrs(column,nameValAttr,flexDiv);
                            this.removeMainElement(column,divCont,div);
                            this.updateElement(div);//updates class and cssText;
                            }
                        }
                    });;
                    
                return;
                default:
                    return;
            }
        }
      
    }
     getImage(column:HTMLElement,flex:flexType,nameLabel:string){
        const divCont=document.createElement("div");
        divCont.className=this.divCont_class;
        divCont.style.cssText=this.divCont_css;
        const {form,retParent,formContainer}=this.customSetup.imgSetup(column)
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata= new FormData(e.currentTarget as HTMLFormElement) as FormData;
                const file=formdata.get("file");
               
                if(file as File){
                    const image=URL.createObjectURL(file as File);
                    const target=document.createElement("img");
                    target.setAttribute("is-element","true");
                    retParent.style.position="relative";
                    target.setAttribute("is-image","true");
                    if(nameLabel==="image"){
                    target.style.cssText=`max-width:170px;aspect-ratio:1 / 1;position:relative;top:0px;left:0px;transform:translate(16px,16px);margin-inline:15px;margin-block:15px;`;
                    }else{
                        target.style.cssText=`max-width:120px;position:absolute;top:0px;left:0px;transform:translate(16px,16px);border-radius:6px;aspect:1 / 1;`;
                    }
                    target.src=image;
                    target.alt=(file as File).name ? (file as File).name :"www.masterconnect.ca";
                    Main.flexTracker(target,flex);
                    this._modSelector.promElementAdder(target).then(async(res)=>{
                        if(res){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                        }
                    });//this adds elements to selector and/or elements
                    const blog=this._modSelector.blog;
                    this._user.askSendToServer({bg_parent:column,formdata,image:target,blog,oldKey:null});//ORDERED SIGNIN
                    //----MULTIPURPOSE IMAGE SAVE ONLY //////
                    divCont.appendChild(target);
                    retParent.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    ModSelector.modAddEffect(divCont);
                    target.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            target.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            this.removeMainElement(column,divCont,target);
                        }
                    });
                    //REMOVINGFORM
                    Misc.fadeOut({anchor:formContainer,xpos:20,ypos:100,time:400});
                    setTimeout(()=>{
                        column.removeChild(formContainer)
                    },380);
                    //REMOVINGFORM
                    
                    //inserting div for deletion
                    
                }
            }
        });


        
     }
  
     getBgImage(item:{column:HTMLElement,flex:flexType,blog:blogType}){
        const {column,blog,flex}=item;
        const formContainer=document.createElement("div");
        formContainer.className="flexCol box-shadow";
        formContainer.style.cssText="position:relative;width:150px;height:150px;z-index:0;font-size:15px;";
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
        column.appendChild(formContainer);
        ModSelector.modAddEffect(formContainer);
        input.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        form.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const {parsed,isJSON}=Header.checkJson(column.getAttribute("flex"));
                const flex_= isJSON ? parsed as flexType :flex;
                const oldKey= flex_.imgKey ? flex_.imgKey : null;
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file");
                if(file as File){
                column.style.zIndex="0";
                column.style.position="relative";
                const image=URL.createObjectURL(file as File);
                const {Key}=this._service.generateImgKey(formdata,blog) as {Key:string};
                const flex_={...flex,name:"background",position:"col",backgroundImage:true,imgKey:Key};
                column.setAttribute("flex",JSON.stringify(flex_));
                this._modSelector.promUpdateColumn(column,flex_).then(async(res)=>{
                    if(res){

                        this._user.askSendToServer({bg_parent:column,formdata,image:null,blog,oldKey});
                        column.setAttribute("data-background-image","true");
                        column.style.cssText="background-position:50% 50%;background-size:100% 100%;position:relative;z-index:1;insert:0;";
                        column.style.backgroundImage=`url(${image})`;
                    }
                });
                Misc.fadeOut({anchor:formContainer,xpos:50,ypos:100,time:500});
                setTimeout(()=>{
                    column.removeChild(formContainer);
                },480);

                }
            }
        });


        
     }
     bgRowImage(item:{column:HTMLElement,blog:blogType}){
        const {column,blog}=item;
        const row=column.parentElement;
        if(!row) return;
        const {isJSON,parsed}=Header.checkJson(row.getAttribute("flex"));
        if(row && isJSON){
            let flex=parsed as flexType;
            const oldKey=flex.imgKey ? flex.imgKey : null;
            const {form:form2,reParent:mainTextarea}=Misc.imageForm(column,flex);
            mainTextarea.style.zIndex="-1";
            form2.addEventListener("submit",(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    const formdata= new FormData(e.currentTarget as HTMLFormElement);
                    const file=formdata.get("file") as File;
                    
                    if(file){
                        const {Key}=this._service.generateImgKey(formdata,blog) as {Key:string};
                        flex={...flex,imgKey:Key,backgroundImage:true};
                        row.setAttribute("flex",JSON.stringify(flex));
                        const urlImg=URL.createObjectURL(file) as string;
                        row.style.backgroundImage=`url(${urlImg})`;
                        row.style.backgroundSize=`100% 100%`;
                        row.style.backgroundPosition=`50% 50%`;
                        row.setAttribute("data-backgroundImage","true");
                        mainTextarea.style.zIndex="0";
                        this._modSelector.promUpdateRow(row).then(async(res)=>{
                            if(res){
                                
                                this._user.askSendToServer({bg_parent:row,formdata,image:null,blog,oldKey});
                                Misc.growOut({anchor:form2,scale:0,opacity:0,time:400});
                                setTimeout(()=>{mainTextarea.removeChild(form2)},398);
                            }
                        });
                    }
                }
            });
        }
     }
     rmBgImage(column:HTMLElement){
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
            this._service.adminImagemark(imgKey as string).then(async(res)=>{
                if(res){
                    Misc.message({parent:column,msg:`${imgKey} is removed`,type_:"success",time:700});
                    const flex_={...flex,imgKey:undefined,backgroundImage:undefined};
                    this._modSelector.updateColumn(column,flex_);
                }
            });
        
    }
     }
     //PARENT:CUSTOMELEMENTCHOICES(){}
     changeImgSize(column:HTMLElement){
        const getImages=column.querySelectorAll("img") as any as HTMLImageElement[];
        ([...getImages]).map(img=>{
            if(img){
                this.changeSize(column,img);
            }
        });
     }
     //PARENT: changeImgSize()
     changeSize(column:HTMLElement,img:HTMLImageElement){
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
                this._modSelector.updateElement(img);
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
        

    }
    
      //PARENT columnFlexChoices()
      rowColor(row:HTMLElement,flex:flexType){
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
                    this._modSelector.updateRow(row as HTMLElement,flex); //updating selector and storing it
                    if(input.value){
                    row.removeChild(input);
                    }
                });
            }
        }
       
     }
     rowHeight(column:HTMLElement){
        if(!column) return;
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
                console.log("number",number,"row",parent.style.height)
            
            }
        };
        button.onclick=(e:MouseEvent)=>{
            if(e){
                const height=(input as HTMLInputElement).value;
                const {parsed}=Header.checkJson(parent.getAttribute("flex"));
                const flex=parsed as flexType;
                parent.style.minHeight=`${height}px`;
                parent.style.height=`${height}px`;
                this._modSelector.updateRow(parent,flex);
                (getColumns && [...getColumns] as HTMLElement[]).map(col=>{
                    if(col){
                        const {parsed}=Header.checkJson(col.getAttribute("flex"));
                        const flex=parsed as flexType;
                        col.style.height=`${height}px`;
                        col.style.minHeight=`${height}px`;
                        this._modSelector.updateColumn(col,flex);
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
        console.log("INSIDE COLOR")
        if(col){
            col.style.position="relative";
            col.style.zIndex="0";
            const input=document.createElement("input");
            input.type="color";
            input.id="color-col-picker";
           input.style.cssText="position:absolute;inset:30% 40%;z-index:300;width:20%;"
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
     getEmail(col:HTMLElement){
        const {parsed}=Header.checkJson(col.getAttribute("flex"));
        this.flex= parsed as flexType;
        const form=document.createElement("form");
        form.style.cssText="position:absolute;width:clamp(200px,350px,400px);height:auto;display:flex;align-items:center;justify-content:center;top:100%;left:0%;right:10%;z-index:200;background-color:white;flex-direction:column;gap:1rem;";
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
                this.flex={...this.flex,anchorContainer:anchor.href} as flexType
                anchor.setAttribute("data-href-email",anchor.id);
                Main.flexTracker(anchor,parsed as flexType);
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
                this.removeMainElement(col,divCont,anchor);
            }
        };
     }
     insertTel(col:HTMLElement){
        const {parsed}=Header.checkJson(col.getAttribute("flex"));
        this.flex= parsed as flexType;
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
                anchor.href=`tel:${tel}`;
                anchor.textContent=name;
                this.flex={...this.flex,anchorContainer:anchor.href};
                anchor.setAttribute("data-href-tel",anchor.href);
                Main.flexTracker(anchor,parsed as flexType);
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
                this.removeMainElement(col,divCont,anchor);
            }
        };
     }
      //PARENT CustomElementChoices()
      modifyColEleAttrs(column:HTMLElement,nameValueAttr:columnAttrType|null,flex:flexType){
        if(nameValueAttr){
            //NEW ELEMENTS
            const {attr}=nameValueAttr;
            const getIsActiveElements=document.querySelectorAll("[is-element='true'].isActive");
            const getColumn=document.getElementById(column.id);

        ([...(getIsActiveElements as any)] as HTMLElement[]).map(eleActive=>{
                if(eleActive as HTMLElement){
                    eleActive.classList.toggle(attr as string);
                    this.updateElement(eleActive);
                    
                }
        });
                        if(!getColumn) return;
                        getColumn.classList.toggle(attr as string);
                        // this.updateElement(getCol);
                        this._modSelector.updateColumn(getColumn,flex);
        }else{
            //REBUILT ELEMENTS
        }
     }
     //PARENT columnFlexChoices(): adjusts row height
     headerHeightAdjust(col:HTMLElement,flex:flexType){
        if(!(col as HTMLElement)) return;
        const row=col.parentElement as HTMLElement;
        const getRow=document.getElementById(row.id);
                
        if(getRow){
            const {retCol,formGrp,input,btn}=this.customSetup.formSetup(col);
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
                    this._modSelector.updateRow(getRow,flex);
                }
            });
            btn.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    e.preventDefault();
                    Header.removeEffect(retCol,formGrp);
                }
            });
        }
     }
     removeMainElement(parent:HTMLElement,divCont:HTMLElement,target:HTMLElement){
        const getDivCont=divCont.querySelectorAll(".xIconDiv");
        if(getDivCont){
            ([...getDivCont as any] as HTMLElement[]).map(child=>{
                if(child){
                    divCont.removeChild(child);
                }
            });
        }
        
        const css="position:absolute;transform:translate(2px,5px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:-6px;left:0px;"
        divCont.style.position="relative";
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
                this.removeElement(target);
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
                const parEle=target.parentElement;
                if(parEle){
                    console.log("parEle",parEle)
                    parent.removeChild(parEle)
                }
                
                
                //resetting buttons
                Main.initMainBtns();
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
                    sel.rows.map(row=>{
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
                }
            return sel;
        });
        this._modSelector.selectors=this._modSelector._selectors
    }
    createAnchor(column:HTMLElement){
        const {parsed}=Header.checkJson(column.getAttribute("flex"));
        this.flex= parsed as flexType;
        const css="margin-inline:auto;display:flex;flex-direction:column;gap:1rem;align-items:center;justify-content:center;"
        const width=window.innerWidth < 900 ? 75 : 50;
        const form=document.createElement("form");
        form.className="anchor-form mx-auto text-sm";
        form.setAttribute("data-form-group","true");
        form.style.cssText=css + `width:${width}%; font-size:12px;box-shadow:1px 1px 12px 1px black;border-radius:12px;background-color:white;`;
        const {input:inName,label:lname,formGrp:grpName}=Nav.inputComponent(form);
        grpName.style.cssText=css + "width:100%";
        lname.textContent="name";
        inName.type="text";
        inName.id="name";
        inName.name="name";
        inName.placeholder="name";
        inName.classList.add("mx-auto");
        inName.style.cssText="width:inherit;margin-block:0.5rem;font-size:12px;";
        lname.setAttribute("for",inName.id);
        const {input:inLink,label:lLink,formGrp:grpLink}=Nav.inputComponent(form);
        grpLink.style.cssText=css + "width:100%";
        inLink.type="url";
        inLink.pattern="https://.*";
        inLink.id="link";
        lLink.textContent="link";
        inLink.placeholder="https://...";
        lLink.setAttribute("for",inLink.id);
        buttonRetDisable({parent:form,text:"create",bg:this.btnColor,color:"white",type:"submit",disable:true})
        column.appendChild(form);
       
        form.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const name=formdata.get("name") as string;
                const link=formdata.get("link") as string;
                const divCont=document.createElement("div");
                divCont.style.cssText="padding:0.25rem;";
                divCont.className="eleContainer"
                divCont.id=`anchor-container-${Math.round(Math.random()*100)}`;
                const anchor=document.createElement("a");
                anchor.style.cssText="margin-left:0.5rem;padding:1rem;font-size:12px;";
                anchor.className="text-primary"
                anchor.textContent=name;
                // anchor.href="#";
                anchor.onclick=()=>{window.open(link,"_blank")};
                anchor.setAttribute("data-href",link)
                this.flex={...this.flex,anchorContainer:link,colId:column.id,name:"a"} as flexType;
                Main.flexTracker(anchor,this.flex);
                this._modSelector.elementAdder(anchor);
                anchor.setAttribute("is-element","true");
                anchor.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        anchor.classList.toggle("isActive");
                        this.updateElement(anchor);
                        this.removeMainElement(column,divCont,anchor);
                    }
                });
                divCont.appendChild(anchor);
                column.appendChild(divCont);
                ([...column.children as any] as HTMLElement[]).map(child=>{
                    if(child){
                        const check=([...child.classList as any] as string[]).includes("anchor-form")
                        if(check){
                            column.removeChild(child);
                        }
                    }
                });
                
            }
        });

        
        
    }
    removeHeader(parent:HTMLElement,target:HTMLElement){
        target.style.position="relative";
        const cssStyle={color:"red"}
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.setAttribute("data-delete","selector")
        // xIconDiv.classList.add("delete");
        xIconDiv.style.cssText="position:absolute;top:0;right:0;transform:translate(-2px,0px);border-radius:50%;z-index:200;"
        FaCreate({parent:xIconDiv,name:FaTrash,cssStyle:cssStyle});
        target.appendChild(xIconDiv);
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this._modSelector._selectors.map((sel,index)=>{
                    if(sel.header){
                        const arr= Header.getImgKeys(sel);
                        if(arr && arr.length>0){
                            arr.map(item=>{
                                if(item){
                                    this._service.adminImagemark(item.imgKey).then(async(res)=>{
                                        if(res){
                                            Misc.message({parent:parent,msg:`${item.imgKey}`,type_:"success",time:400});
                                        }
                                    });
                                }
                            });
                        }
                        this._modSelector._selectors.splice(index,1)
                    }
                });
                this._modSelector.selectors=this._modSelector._selectors;
                Misc.fadeOut({anchor:target,xpos:50,ypos:100,time:600});
                setTimeout(()=>{
                    parent.removeChild(target);
                },580);
            }
        });
       
    }
    editElement(target:HTMLElement | HTMLImageElement){
        const isFlex=target.getAttribute("flex") as string ? target.getAttribute("flex") as string : null;
        const flex= isFlex ? JSON.parse(isFlex) as flexType : null;
        
            
                if(flex){
                    const {rowId,colId}= flex as flexType;
                    this._modSelector._selectors=this._modSelector._selectors.map(selector_=>{
                        if(selector_.header){
                            selector_.rows.map(row=>{
                                if(row.eleId===rowId){
                                    row.cols.map(col=>{
                                        if(col.eleId===colId){
                                            col.elements.map(element=>{
                                                if(element.eleId===target.id){
                                                    target.addEventListener("input",()=>{
                                                        const nodN=target.nodeName.toLowerCase();
                                                        const arrCheck=["ul","ol","blockquote","img","a"]
                                                        if(!(arrCheck.includes(nodN))){
                                                            element.inner_html=target.innerHTML;
                                                        }else if(nodN==="img"){
                                                            const img=target as HTMLImageElement;
                                                            element.img=img.src;
                                                            
                                                        }else if(target.nodeName.toLowerCase()==="a"){
                                                            
                                                                const link=target.getAttribute("data-href");
                                                                element.attr=link ? link:undefined
                                                                element.inner_html=target.innerHTML;
                                                            
                                                        }else{
                                                            element.inner_html=target.innerHTML;
                                                            
                                                        }
                                                        element.class=target.className.split(" ").filter(cl=>(cl !=="isActive")).join(" ");
                                                        element.cssText=target.style.cssText;
                                                },true);
                                                }
                                                return element;
                                            });
                                        }
                                        return col;
                                    });
                                }
                                return row;
                            });
                        }
                        return selector_;
                    });
                    this._modSelector.selectors=this._modSelector._selectors;
                    // console.log("953:modSelector:editElement",this.selectors)//works
                        
                }
            
       
    }
    updateElement(target:HTMLElement){
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        
        if(isJSON){
            const flex=parsed as flexType;
            const {rowId,colId,imgKey}=flex ;
            this._modSelector._selectors=this._modSelector._selectors.map(select=>{
                    if(select.header){
                        select.rows.map(row=>{
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
                                            }
                                            return ele;
                                        });
                                    }
                                    return col;
                                });
                            }
                            return row;
                        });
                    }
                return select;
            });
            this._modSelector.selectors=this._modSelector._selectors;
        }
    }
   
   static insertBgImage(target:HTMLElement,urlImg:string){
    const cssArr=target.style.cssText.split(";");
        cssArr.push(`background-image:url(${urlImg})`);
        cssArr.push("background-size:100% 100%");
        cssArr.push("background-position:50% 50%");
        target.style.cssText=cssArr.join(";");
    }
    
   
     static flexColPutter(target:HTMLElement,element:colType,flex:flexType){
        
        flex={...flex,colId:element.eleId}
            const ID=JSON.stringify(flex);
            target.id=element.eleId;
            target.setAttribute("is-column","true");
            target.setAttribute("flex",ID);
        
      }
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
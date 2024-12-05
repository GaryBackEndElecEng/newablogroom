import {flexType,elementType,colType,rowType,selectorType,element_selType, choiceType, iconType, focusOptions, deletedImgType,flexSelectorType} from "./Types";
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



const baseUrl="http://localhost:3000";

class Flexbox {
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
        rows:[],
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
        rows:[],
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
        rows:[],
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
        rows:[],
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
        rows:[],
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
        rows:[],
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
        rows:[],
        blog_id:0,
        header:false,
        footer:false
    },
    ]
static choice:choiceType[]=[
    {name:"select",ele:"select",isEle:false,level:"element"},
    {name:"image",ele:"img",isEle:true,level:"element"},
    {name:"bg-image",ele:"bg-image",isEle:false,level:"col"},
    {name:"bg-row-image",ele:"bg-row-image",isEle:false,level:"col"},
    {name:"title",ele:"h1",isEle:true,level:"element"},
    {name:"sub title",ele:"h2",isEle:true,level:"element"},
    {name:"inner title",ele:"h3",isEle:true,level:"element"},
    {name:"inner sub title",ele:"h4",isEle:true,level:"element"},
    {name:"h5-small",ele:"h5",isEle:true,level:"element"},
    {name:"h6-small",ele:"h6",isEle:true,level:"element"},
    {name:"text",ele:"p",isEle:true,level:"element"},
    {name:"list",ele:"list",isEle:true,level:"element"},
    {name:"link",ele:"a",isEle:true,level:"element"},
    {name:"time",ele:"time",isEle:true,level:"element"},
    {name:"quote",ele:"blockquote",isEle:true,level:"element"},
    {name:"pic-text-merge",ele:"shapeOutside",isEle:true,level:"element"},
    {name:"flex-center",ele:"col-center",isEle:false,attr:"col-center",level:"col"},
    {name:"shadow",ele:"box-shadow-md",isEle:false,attr:"box-shadow-md",level:"col"},
    {name:"bg-shade",ele:"bg-shade",isEle:true,level:"col"},
    {name:"flex-end",ele:"col-end",isEle:false,attr:"col-end",level:"col"},
    {name:"flex-start",ele:"col-start",isEle:false,attr:"col-start",level:"col"},
    {name:"img-round",ele:"round",isEle:false,attr:"round",level:"element"},
    {name:"set-even-height",ele:"set-even-height",isEle:false,attr:"set-even-height",level:"col"},
    {name:"remove-even-height",ele:"remove-even-height",isEle:false,attr:"remove-even-height",level:"col"},
    {name:"cleanUp",ele:"cleanUp",isEle:true,level:"none"},
    {name:"remove",ele:"remove",isEle:true,level:"none"},

];
eleAttrs=["round",];
colAttrs=["col-start","col-end","col-center"];

    constructor(private _modSelector:ModSelector,private _service:Service, private _user:User,public _shapeOutside:ShapeOutside){
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this._selectors=this._modSelector._selectors;
        this.flex={} as flexType;
        Flexbox.getPlacement().then(async(value)=>{
            if(value){
                this.placement=parseInt(value);
            }
        });
        this.divCont_css="display:flex;align-items:center;justify-content:center;flex-direction:column;padding:0.5rem;border-radius:12px;margin-inline:3rem;padding-inline:1rem;";
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
        this._modSelector._placement=placement;
    }
    get selectors(){
        return this._modSelector._selectors;
    }
    set selectors(selectors:selectorType[]){
        this._modSelector.selectors=selectors;

    }
    //GETTER SETTERS---////////
    ///--------------INJECTION INTO EDIT-----WORK DONE DURING REFRESH AND EDIT-------///////////////
   async showSelector(parent:HTMLElement,selector:selectorType){
        //THIS IS USED FOR REFRESH 
        this.flex={} as flexType;
        // console.log("Header selector",selector)//works
        if(selector && selector.name){
            const innerCont=document.createElement(selector.name);
            innerCont.id=selector.eleId;
            innerCont.className=selector.class;
            innerCont.setAttribute("data-placement",`${selector.placement}`);
            innerCont.setAttribute("name",selector.name);
            innerCont.setAttribute("data-selector-id",`${selector.id}`);
                innerCont.setAttribute("data-container-id",`${innerCont.id}`);
            innerCont.setAttribute("data-selector-id",selector.eleId);
            innerCont.setAttribute("is-selector","true");
            parent.appendChild(innerCont);
            Misc.blurIn({anchor:innerCont,blur:"20px",time:700});
            // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
        Main.container=document.querySelector("section#main") as HTMLElement;
        const checkBgShade=([...(Main.container as HTMLElement).classList as any] as string[]).includes("bgShade");
        if(checkBgShade){
            innerCont.classList.add("background-bgShade");
        }
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
            innerCont.style.cssText=selector.cssText;
            this.removeFlexbox(parent,innerCont);
            this.flex={...this.flex,selectorId:selector.eleId,placement:selector.placement}
              await  Promise.all(selector.rows.sort((a,b)=>{if(a.order < b.order) return -1;return 1}).map(async(row_)=>{
                    const row=document.createElement("div");
                    row.className=row_.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                    row.style.cssText=row_.cssText;
                    row.setAttribute("name",row_.name);
                    row.setAttribute("rowID",`${row_.id}`);
                    row.setAttribute("is-row","true");
                    row.id=row_.eleId;
                    if(row_.imgKey){
                        row.setAttribute("data-backgroundimage","true");
                    //     const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                    //    await this._service.injectBgAwsImage({target:row,imgKey:row_.imgKey,cssStyle});
                    }
                    Header.detectImageEffect(row);
                    this.flex={...this.flex,rowId:row_.eleId,position:"row",imgKey:row_.imgKey}
                    row.setAttribute("flex",JSON.stringify(this.flex));
                   await Promise.all(row_.cols && row_.cols.sort((a,b)=>{if(a.order < b.order) return -1;return 1}).map(async(col_)=>{
                        const col=document.createElement("div");
                        col.id=col_.eleId;
                        col.setAttribute("colID",`${col_.id}`);
                        col.style.cssText=`${col_.cssText}`;
                        col.className=col_.class;
                        col.setAttribute("is-column","true");
                        Header.detectImageEffect(col);
                        this.flex={...this.flex,colId:col_.eleId,position:"col",imgKey:col_.imgKey};
                        col.setAttribute("flex",JSON.stringify(this.flex));
                        row.appendChild(col);
                       
                        if(col_.imgKey){
                            col.setAttribute("data-backgroundimage","true");
                            // col.style.backgroundPosition="50% 50%";
                            // col.style.backgroundSize="100% 100%";
                            // const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                            // this._service.injectBgAwsImage({target:col,imgKey:col_.imgKey,cssStyle});
                        }
                        this.genChoice(col,this.flex);
                        col.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                this.flex={...this.flex,colId:col_.eleId,imgKey:col_.imgKey};
                                col.classList.toggle("coliIsActive");
                                innerCont.classList.toggle("isActive");
                                this.updateColumn(col,this.flex);
                            }
                        });
                     const div_conts=await Promise.all(col_.elements && col_.elements.sort((a,b)=>{if(a.order < b.order) return -1;return 1}).map(async (element)=>{
                            this.flex={...this.flex,elementId:element.eleId,position:"element",imgKey:element.imgKey,name:element.name};
                            const checkArr=["img","ul","ol","blockquote","a","span","logo","image"].includes(element.name);
                            const checkUlType=["ol","ul","blockquote"].includes(element.name);
                            const divCont=document.createElement("div");
                            divCont.setAttribute("data-placement",`${element.order}-A`);
                            divCont.className=this.divCont_class;
                            divCont.style.cssText=this.divCont_css;
                            if(!checkArr){
                                const _ele_:HTMLElement=document.createElement(element.name);
                                if(element.attr==="data-backgroundImage" && element.imgKey){
                                    ShapeOutside.cleanUpByID(parent,"popup");
                                    _ele_.setAttribute("data-backgroundImage","true");
                                    this.flex={...this.flex,backgroundImage:true,imgKey:element.imgKey};
                                    _ele_.style.backgroundPosition="50% 50%";
                                    _ele_.style.backgroundSize="100% 100%";
                                    // const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                                    // this._service.injectBgAwsImage({target:_ele_,imgKey:element.imgKey,cssStyle});
                                }else if(element.attr==="data-shapeOutside-circle" && element.imgKey){
                                    divCont.style.marginBlock="2rem";
                                    divCont.style.paddingBlock="1rem";
                                    this.flex={...this.flex,shapeOutsideCircle:true,imgKey:element.imgKey};
                                    this._shapeOutside.setAttributes({column:parent,divCont,target:_ele_ as HTMLParagraphElement});//ID=shape-outside-${rand}
                                    _ele_.setAttribute("data-shapeOutside-circle","true");
                                //    await this._shapeOutside.shapeOutsideInjectImage({para:_ele_,imgKey:element.imgKey});
                                }else if(element.attr==="data-shapeOutside-square" && element.imgKey){
                                    divCont.style.marginBlock="2rem";
                                    divCont.style.paddingBlock="1rem";
                                    this.flex={...this.flex,shapeOutsideCircle:true,imgKey:element.imgKey};
                                    this._shapeOutside.setAttributes({column:parent,divCont,target:_ele_ as HTMLParagraphElement});//ID=shape-outside-${rand}
                                    _ele_.setAttribute("data-shapeOutside-square","true");
                                //    await this._shapeOutside.shapeOutsideInjectImage({para:_ele_,imgKey:element.imgKey});
                                }else if(element.attr==="data-shapeOutside-polygon" && element.imgKey){
                                    divCont.style.marginBlock="2rem";
                                    divCont.style.paddingBlock="1rem";
                                    this._shapeOutside.setAttributes({column:parent,divCont,target:_ele_ as HTMLParagraphElement});//ID=shape-outside-${rand}
                                    _ele_.setAttribute("data-shapeOutside-polygon","true")
                                    this.flex={...this.flex,shapeOutsidePolygon:true,imgKey:element.imgKey};
                                //    await this._shapeOutside.shapeOutsideInjectImage({para:_ele_,imgKey:element.imgKey});
                                }
                                divCont.setAttribute("data-placement",`${element.order}-A`);
                                _ele_.setAttribute("data-placement",`${element.order}`);
                                _ele_.setAttribute("is-element","true");
                                _ele_.setAttribute("is-element","true");
                                _ele_.setAttribute("contenteditable","true");
                                _ele_.setAttribute("aria-selected","true");
                                _ele_.setAttribute("name",element.name);
                                _ele_.className=element.class;
                                _ele_.setAttribute("name",element.name);
                                _ele_.id=element.eleId;
                                _ele_.setAttribute("flex",JSON.stringify(this.flex));
                                _ele_.style.cssText=element.cssText;
                                _ele_.innerHTML=element.inner_html;
                                divCont.appendChild(_ele_);
                                // col.appendChild(divCont);
                                this.editElement(_ele_);
                                Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
                                Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
                                // Main.toggleActiveIcon(_ele_);
                                _ele_.addEventListener("click",(e:MouseEvent) =>{
                                    if(e){
                                        _ele_.classList.toggle("isActive");
                                        divCont.classList.toggle("isActive");
                                        this.updateElement(_ele_);
                                        this.removeMainElement(parent,divCont,_ele_);
                                    }
                                });
                                _ele_.addEventListener("imgKeydown",(e:KeyboardEvent)=>{
                                    if(e.key==="Enter"){
                                        const icon=Main.icons.find(ic=>(ic.name===_ele_.nodeName.toLowerCase()));
                                        this.appElement(col,null,icon,this.flex)
                                    }
                                });
                                return divCont;
                                
                            }else if(checkUlType){
                                const ele_=document.createElement("ul");
                                ele_.setAttribute("is-element","true");
                                ele_.setAttribute("contenteditable","true");
                                ele_.setAttribute("aria-selected","true");
                                ele_.setAttribute("name",element.name);
                                divCont.setAttribute("data-placement",`${element.order}-A`);
                                ele_.setAttribute("data-placement",`${element.order}`);
                                ele_.className=element.class;
                                ele_.classList.remove("isActive");
                                ele_.style.cssText=element.cssText;
                                ele_.innerHTML=element.inner_html;
                                divCont.appendChild(ele_);
                                // col.appendChild(divCont);
                                Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
                                Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
                                Main.toggleActiveIcon(ele_);
                                ele_.id=element.eleId;
                                ele_.setAttribute("name",element.name);
                                ele_.setAttribute("flex",JSON.stringify(this.flex));
                                ele_.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        Main.toggleActiveIcon(ele_);
                                        ele_.classList.toggle("isActive");
                                        divCont.classList.toggle("isActive");
                                        this.updateElement(ele_);
                                        this.removeMainElement(parent,divCont,ele_);
                                    }
                                });
                               
                                this._modSelector.editElement(ele_)
                                return divCont
                            }else if(element.name==="a"){
                                const link=element.attr as string;
                                const ele=document.createElement("a");
                                ele.setAttribute("data-href",link);
                                ele.setAttribute("is-element","true");
                                ele.setAttribute("contenteditable","true");
                                ele.setAttribute("aria-selected","true");
                                divCont.setAttribute("data-placement",`${element.order}-A`);
                                ele.setAttribute("data-placement",`${element.order}`);
                                ele.className=element.class;
                                ele.setAttribute("name",element.name);
                                ele.id=element.eleId;
                                ele.setAttribute("name",element.name);
                                ele.setAttribute("flex",JSON.stringify(this.flex));
                                ele.style.cssText=element.cssText;
                                ele.innerHTML=element.inner_html;
                                ele.href="#";
                                ele.onclick=()=>{return window.open(link,"_blank")};
                                divCont.appendChild(ele);
                                Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
                                Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
                                // col.appendChild(divCont);
                                ele.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        Main.toggleActiveIcon(ele);
                                        ele.classList.toggle("isActive");
                                        divCont.classList.toggle("isActive");
                                        this.updateElement(ele);
                                        this.removeMainElement(parent,divCont,ele);
                                    }
                                });
                                this.editElement(ele);
                                this.removeMainElement(parent,divCont,ele);
                                return divCont;
                            }else if(element.name==="img"){
                                const ele=document.createElement("img");
                                ele.setAttribute("is-element","true");
                                ele.setAttribute("contenteditable","false");
                                ele.setAttribute("aria-selected","true");
                                divCont.setAttribute("data-placement",`${element.order}-A`);
                                ele.setAttribute("name",element.name);
                                ele.id=element.eleId;
                                ele.setAttribute("name",element.name);
                                if(element.imgKey){
                                    this.flex={...this.flex,imgKey:element.imgKey};
                                    const res=await this._service.getSimpleImg(element.imgKey);
                                    if(res){
                                        ele.src=res.img;
                                        ele.alt=res.Key;
                                    }

                                }
                                ele.setAttribute("flex",JSON.stringify(this.flex));
                                ele.style.cssText=element.cssText;
                                ele.className=element.class;
                                ele.alt=element.inner_html;
                                ele.src=element.img ? element.img : this.logo;
                                divCont.appendChild(ele);
                                // col.appendChild(divCont);
                                Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
                                Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
                                Header.detectImageEffect(ele);
                                this._user.refreshImageShow(divCont,ele,null,this.flex);
                                ele.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        Main.toggleActiveIcon(ele);
                                        ele.classList.toggle("isActive");
                                        divCont.classList.toggle("isActive");
                                        this.updateElement(ele);
                                        this.removeMainElement(parent,divCont,ele);
                                    }
                                });
                                return ele
                            }

                        }));
                       
                        if(div_conts && div_conts.length>0){
                            div_conts.map(divcont=>{
                                if(divcont){
                                    col.appendChild(divcont);
                                }
                            });
                        }
                        Misc.matchMedia({parent:col,maxWidth:600,cssStyle:{height:"auto"}});
                    }));
                    innerCont.appendChild(row);
                    // console.log(innerCont)//works
                }));
        }
    };
    ///--------------INJECTION INTO EDIT-----WORK DONE-------///////////////
     //PARENT FLEXBOXLAYOUT()
     rowColGenerator(parent:HTMLElement,selector:selectorType){
        //PARENT =>THIS.TEXTAREA
        parent.classList.add("mx-2");
        const container=document.createElement("section");
        const rand=`${container.nodeName.toLowerCase()}-${Math.round(Math.random()*1000)}`
        container.id=rand;
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
        container.setAttribute("data-selector-id",`${selector.id}`);
        container.setAttribute("is-flexbox","true");
        this.flex={...this.flex,selectorId:container.id};
        selector.eleId=container.id;
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
        Main.container=document.querySelector("section#main") as HTMLElement;
        const checkBgShade=([...(Main.container as HTMLElement).classList as any] as string[]).includes("bgShade");
        if(checkBgShade){
            container.classList.add("background-bgShade");
        }
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
        this.asyncSelectorAdder(container,selector).then((retSelect)=>{
            if(retSelect){
                this.flex={} as flexType;
                this.flex={...this.flex,selectorId:retSelect.eleId};
                //--------------DELETE ICON----------------//
                const delDiv=document.createElement("div");
                delDiv.style.cssText="position:absolute;top:0;left:0;transform:translate(-12px,0px);background:black;color:white;border-radius:50%;font-size:26px;";
                delDiv.setAttribute("is-icon","true");
                delDiv.className="fa-solid fa-circle-xmark";
                const cssStyle={background:"inherit",color:"red"};
                FaCreate({parent:delDiv,name:FaTrash,cssStyle});
                container.appendChild(delDiv);
                delDiv.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        this._modSelector.selectors.map((sel,index)=>{
                            if(sel && sel.eleId===container.id){
                                this._modSelector.selectors.splice(index,1);
                                this._modSelector.shiftPlace(retSelect.placement);
                            }
                        });
                        Misc.fadeOut({anchor:container,xpos:100,ypos:100,time:400});
                        setTimeout(()=>{
                            parent.removeChild(container);
                        },380);
                       
                    }
                });
                //--------------DELETE ICON--------------//
               
                arrRow.map(( n)=>{
                    const row=document.createElement("div");
                    // row.id=numId;
                    row.className=" row mx-auto jusifiy-content-start flexbox-row";
                    row.style.cssText="margin-inline:auto;margin-block:2rem;width:100%;"
                    row.setAttribute("data-row-num",`${n+1}`);
                    row.setAttribute("name",`div`);
                    row.setAttribute("contenteditable","false");
                    row.setAttribute("is-row","true");
                    row.style.cssText="width:100%;min-height:10vh;position:relative;min-width:50vw;justify-content:flex-start;";
                    this.flex={...this.flex,order:n,position:"row"};
                    const flexRow=Main.flexRowTracker(row,this.flex) as flexType;
                    this.asyncRowAdder(row,retSelect.eleId as string).then((_row_:rowType)=>{
                        this.flex={...flexRow,rowId:_row_.eleId,selectorId:retSelect.eleId};
                        // console.log("ROW",_row_)
                        if(n===0){
                            arrColT.map((m)=>{
                                const col=document.createElement("div");
                                col.className=`col-lg-${numTop} flexbox-column`;
                                col.classList.add("col-container")
                                col.setAttribute("name",`div`);
                                col.setAttribute("contenteditable","false");
                                col.setAttribute("is-column","true");
                                col.classList.add("box-shadow");
                                col.classList.add("column");
                                col.style.cssText="align-items:stretch;";
                                this.flex={...this.flex,rowId:_row_.eleId,order:m,position:"col"};
                                const flexCol=Main.flexColTracker(col,this.flex) as flexType;
                                this.asyncColAdder(col,flexCol).then((_col_:colType)=>{
                                    if(_col_){
                                        // console.log("_col_UPPER:",_col_)
                                        this.flex={...flexCol,position:"col"};
                                        col.setAttribute("data-column",`${_col_.eleId}-${n+1}-${m+1}`);
                                        col.setAttribute("is-column","true");
                                        if(Edit.isBackgroundImage(col)){
                                            col.setAttribute("is-backgroundimage","true");
                                        };
                                        row.appendChild(col);
                                        this.flex={...flexCol,rowId:_row_.eleId,colId:_col_.eleId}
                                        this.genChoice(col,this.flex);
                                        col.addEventListener("click",(e:MouseEvent)=>{
                                            if(e){
                                                col.classList.toggle("coliIsActive");
                                            //    const isTrue= col.classList.toggle("coliIsActive",true);
                                                container.classList.toggle("isActive");
                                                // if(isTrue){
                                                   
                                                    this.updateColumn(col,this.flex);
                                                // }
                                            }
                                        });
                                    }
                                });
                                
                            });
                        }else{
                            arrColB.map((m)=>{
                                const col=document.createElement("div");
                                col.className=`col-lg-${numBot} col-container flexbox-column`;
                                col.setAttribute("is-column","true");
                                col.classList.add("column");
                                this.flex={...this.flex,rowId:_row_.eleId,order:m}
                                const flexCol1=Main.flexColTracker(col,this.flex) as flexType;
                                this.asyncColAdder(col,flexCol1).then((_col_:colType)=>{
                                    if(_col_){
                                        // console.log("_col_Lower",_col_)
                                        this.flex={...flexCol1,colId:_col_.eleId,position:"col"};
                                        col.setAttribute("data-column",`${_col_.eleId}-${n+1}-${m+1}`);
                                        col.setAttribute("name","div");
                                        col.classList.add("box-shadow");
                                        col.style.cssText="align-items:stretch;";
                                        if(Edit.isBackgroundImage(col)){
                                            col.setAttribute("is-backgroundimage","true");
                                        };
                                        row.appendChild(col);
                                        this.flex={...flexCol1,rowId:_row_.eleId,colId:_col_.eleId}
                                        // this.genChoice(col,this.flex);
                                        this.genChoice(col,this.flex);
                                        col.addEventListener("click",(e:MouseEvent)=>{
                                            if(e){
                                                col.classList.toggle("coliIsActive",true);
                                                container.classList.toggle("isActive");
                                                // if(isTrue){
                                                    this.updateColumn(col,this.flex)
                                                // }
                                            }
                                        });
                                    }
                                }).catch((err)=>console.error(getErrorMessage(err)));
                                
                            });
                        }
                    });
                    
                    if(Edit.isBackgroundImage(row)){
                        row.setAttribute("is-backgroundimage","true");
                    };
                    container.appendChild(row);
                    
                });
                parent.appendChild(container);
                Misc.fadeIn({anchor:container,xpos:50,ypos:100,time:700});
            }
        }).catch((err)=>{console.error(getErrorMessage(err));});
    }
    //PARENT ROWCOLGENERATOR()=> feeds to Main() appElement +++ others() on Main()
    async asyncSelectorAdder(target:HTMLElement,selector:selectorType):Promise<selectorType>{
        const prom=new Promise((resolve)=>{
            resolve(this.selectorAdder(target,selector))
        });
        return prom as Promise<selectorType>
    }
    async asyncRowAdder(row:HTMLElement,selectorId:string):Promise<rowType>{
        const prom=new Promise((resolver,reject)=>{
            resolver(this._modSelector.rowAdder(row,selectorId));
            reject("did not add row");

        });
        return prom as Promise<rowType>
    }
    async asyncColAdder(col:HTMLElement,flex:flexType):Promise<colType>{
        const prom=new Promise((resolver,reject)=>{
            resolver(this.colAdder(col,flex));
            reject("did not add column");

        });
        return prom as Promise<colType>
    }
    genChoice(column:HTMLElement,flex:flexType){
        Header.cleanUpByID(column,"popup");
        const {parsed,isJSON}=Header.checkJson(column.getAttribute("flex"));
        this.flex= isJSON ? parsed as flexType : flex;
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
                const choice_:choiceType={ele:choice.ele,isEle:choice.isEle,name:choice.ele,attr:choice.attr,level:choice.level}
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
        select.addEventListener("change",(e:Event)=>{
            if(e){
                // type valueType={[imgKey:string]:string}
                const value_=(e.currentTarget as HTMLSelectElement).value
                const {parsed,isJSON}=Header.checkJson(value_)
                const value:choiceType|null=isJSON ? parsed as choiceType : null;
                if(!value) return
                const {ele,isEle,level,attr}=value;
                const checkColAttrs=attr ? this.colAttrs.includes(attr as string) : false;
                const checkEleAttrs=attr ? this.eleAttrs.includes(attr as string) : false;
                let icon:iconType | undefined;
                let btn:HTMLButtonElement | null;
                const checkText=["p","h1","h2","h3","h4","h5","h6","span"].includes(ele)
                    if(isEle){
                        //GOES TO MAIN FOR ELEMENT CREATION
                        switch(true){
                            case ele==="img":
                                icon=Main.icons.find(ico=>(ico.name==="img")) as iconType;
                                btn=document.querySelector(`button#${icon.name}`) as HTMLButtonElement;
                                //ADDING IMAGE
                                this.addImage(column,btn,icon,this.flex)
                                
                            return;
                            case ele==="shapeOutside":
                                this.flex={...this.flex,shapeOutsideCircle:true};
                                column.setAttribute("flex",JSON.stringify(this.flex));
                                this._shapeOutside.shapeOutsideCircle({parent:column,flex:this.flex})
                                
                            return;
                            case checkText && ele !=="shapeOutside":
                                 icon=Main.icons.filter(ico=>(ico.isElement===true)).find(ico=>(ico.name===ele)) as iconType;
                                 btn=document.querySelector(`button#${icon.name}`) as HTMLButtonElement;
                                 if(icon){
                                    this.appElement(column,btn,icon,this.flex);
                                    
                                 }
                            return;
                            case ele ==="blockquote":
                                icon=Main.icons.find(ico=>(ico.name==="blockquote")) as iconType;
                                 btn=document.querySelector(`button#${icon.name}`) as HTMLButtonElement;
                                 this.createQuote(column,icon,this.flex);
                                 
                            return;
                            case ele ==="a":
                                icon=Main.icons.find(ico=>(ico.name==="a")) as iconType;
                                 btn=document.querySelector(`button#${icon.name}`) as HTMLButtonElement;
                                 this.createAnchor(column,btn,icon,this.flex);
                                 
                            return;
                            case ele ==="list":
                                icon=Main.icons.find(ico=>(ico.name==="list")) as iconType;
                                btn=document.querySelector(`button#${icon.name}`) as HTMLButtonElement;
                                this.selectUltype(column,btn,this.flex);
                                
                            return;
                            case ele ==="time":
                                icon=Main.icons.find(ico=>(ico.name==="time")) as iconType;
                                btn=document.querySelector(`button#${icon.name}`) as HTMLButtonElement;
                                this.insertDateTime(column,btn,icon,this.flex);
                                
                            return;
                            case ele ==="bg-shade":
                                icon=Main.icons.find(ico=>(ico.name==="bg-shade")) as iconType;
                                btn=document.querySelector(`button#${icon.name}`) as HTMLButtonElement;
                                this.bgShade(column,btn,icon,this.flex);
                                
                            return;
                            case ele ==="remove":
                                column.removeChild(popup);
                            return;
                            default:
                                return;
                        }

                    }else{
                        if(level==="col"){
                            switch(true){
                                
                                case ele==="col-center":
                                    column.classList.toggle(ele);
                                    this.updateColumn(column,flex);
                                return;
                                case ele==="col-end":
                                    column.classList.toggle(ele);
                                    this.updateColumn(column,flex);
                                return;
                                case ele==="col-start":
                                    column.classList.toggle(ele);
                                    this.updateColumn(column,flex);
                                return;
                                case ele==="box-shadow-md":
                                    column.classList.toggle(ele);
                                    this.updateColumn(column,flex);
                                return
                                case ele==="bg-image":
                                    column.classList.toggle(ele);
                                    this.bgImage(column,flex);
                                return
                                case ele==="bg-row-image":
                                    column.classList.toggle(ele);
                                    this.RowBgImage(column,flex);
                                return
                                case checkColAttrs:
                                    column.classList.toggle(ele);
                                return
                                case ele==="set-even-height":
                                    this.setEvenHeight(column);
                                return
                                case ele==="remove-even-height":
                                    this.removeEvenHeight(column);
                                return
                               
                                default:
                                    return;
                            }
                        }else if(level==="element"){
                            switch(true){
                                case checkEleAttrs:
                                    // this.setAttributes(column,ele)
                                return;
                                default:
                                    return;
                            }
                        }
                    }
            }
        });
        
    }
    //PARENT genChoice
    setAttributes(column:HTMLElement,attr:string){
        const eleConts=column.querySelectorAll(`div.${this.divCont_class}`) as any as HTMLElement[];
        
            ([...eleConts] as HTMLElement[]).map(child=>{
                if(child ){
                    ([...child.children as any] as HTMLElement[]).map(ele=>{
                        if(ele){

                            const {isJSON}=Header.checkJson(ele.getAttribute("flex"));
                            const isActive=([...ele.classList as any] as string[]).includes("isActive");
                            if(isActive && isJSON){
                                ele.classList.toggle(attr);
                                this.updateElement(ele);
                            }
                        }
                    });
                }
            });
        
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
    appElement(parent: HTMLElement,btn:HTMLElement|null, icon:iconType|undefined,flex_:flexType) {
        if(!icon)return
        const {parsed,isJSON}=Header.checkJson(parent.getAttribute("flex"));
        const flex=isJSON ? parsed as flexType : flex_;
        const divCont=document.createElement('div');
        divCont.className=this.divCont_class;
        divCont.style.cssText=this.divCont_css;
        const target = document.createElement(icon.name); //ICON.NAME=ELE TYPE
        target.classList.add(icon.display);
        // this.docSelect(target,icon);
        target.innerHTML = icon.name;
        target.style.cssText = "border-radius:6px;";
        target.style.cssText="margin-inline:8px;padding-inline:2rem;width:100% !important;position:relative;";
        target.classList.add("box-shadow");
        target.setAttribute("is-element","true");
        target.setAttribute("contenteditable","true");
        target.setAttribute("aria-selected","true");
        divCont.appendChild(target);
        parent.appendChild(divCont);
        Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
        Misc.fadeIn({anchor:divCont,xpos:50,ypos:100,time:600});
        Main.flexTracker(target,flex as flexType);//generate ID and flex attribute
        this.promElementAdder(target).then(async(res)=>{
            if(res && res.target && res.ele){
                const ele=res.ele as unknown as element_selType;
                // console.log(res.ele,"ele",ele);
                divCont.setAttribute("data-placement",`${ele.order}-A`);
                target.setAttribute("data-placement",`${ele.order}`);
                // console.log("RETURNED TARGET,ELE",res.target,res.ele)
                this.removeMainElement(parent,divCont,target);
                res.target.onclick=(e: MouseEvent) => {
                    if (e) {
                    
                        target.classList.toggle("isActive");
                        divCont.classList.toggle("isActive");
                        const focusOptions: focusOptions = { focusVisible: false, preventScroll: false }
                        res.target.focus(focusOptions);
                        this.updateElement(res.target);
                        
                        res.target.onkeydown=(e:KeyboardEvent)=>{
                            if(e.key==="Enter"){
                                this.appElement(parent,btn,icon,flex)
                            }
                        };
                        this.editElement(res.target)//pulls flex if exist from target attrubutes
                    }
                };
            }
        });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
        
        
        
        
    }
    //PARENT ADDELEMENT()
    async addImage(parent:HTMLElement,btnClicked:HTMLButtonElement,icon:iconType,flex_:flexType):Promise<void>{
        const {parsed,isJSON}=Header.checkJson(parent.getAttribute("flex"));
        const blog=this._modSelector._blog;
        this._modSelector.loadBlog(blog);
        let flex=isJSON ? parsed as flexType : flex_;
        if(flex.imgKey){
            const markDel:deletedImgType={id:undefined,imgKey:flex.imgKey,del:true,date:new Date()};
            await this._service.markDelKey(markDel);
        }
        btnClicked.classList.add("active");
        btnClicked.classList.add(icon.display);
        const floatContainer=document.createElement("div");
        parent.classList.add("position-relative");
        parent.classList.add("z-0");
        floatContainer.classList.add("select-image-container");
        floatContainer.classList.add("flexCol");
        const form=document.createElement("form");
        form.classList.add("group-form");
        form.classList.add("flexCol");
        const submit=document.createElement("button");
        submit.className="btn btn-primary btn-sm rounded d-flex align-items-center gap-1";
        submit.innerHTML=`submit <i class="far fa-file-image text-white bg-black"/>`;
        const input=document.createElement("input") as HTMLInputElement;
        input.type="file";
        input.name="file";
        form.appendChild(input);
        form.appendChild(submit);
        floatContainer.appendChild(form);
        parent.appendChild(floatContainer);
        form.addEventListener("submit",(e:SubmitEvent)=>{
            e.preventDefault();
            if(e && e.currentTarget){
                const formelement= new FormData(e.currentTarget as HTMLFormElement);
                const file=formelement.get("file");
                const image=URL.createObjectURL(file as File);
                //creating container && img
                const imgCont=document.createElement("div");
                imgCont.className=this.divCont_class;
                imgCont.classList.add("element");
                imgCont.style.cssText=this.divCont_css;
                imgCont.setAttribute("contenteditable","false");
                const img=document.createElement("img");
                img.src=image;
                img.alt="image";
                img.setAttribute("contenteditable","false");
                img.classList.add("image");
                img.style.cssText="position:relative !important;width:100% !important;padding-inline:2rem;margin-inline:auto;border-radius:12px;border-radius:6px;";
                const {Key}=this._service.generateImgKey(formelement,blog) as {Key:string};
                flex={...flex,imgKey:Key}
                Header.detectImageEffect(img);
                let retFlex=Main.flexTracker(img,flex);//generate ID and flex attribute
                this.promElementAdder(img).then(async(res)=>{
                    if(res && res.target && res.ele){
                        const ele=res.ele as unknown as element_selType;
                        imgCont.setAttribute("data-placement",`${ele.order}-A`)
                        imgCont.appendChild(img);
                        parent.appendChild(imgCont);
                        retFlex={...retFlex,imgKey:Key}
                        img.setAttribute("flex",JSON.stringify(retFlex));
                        this._user.askSendToServer({bg_parent:parent,formdata:formelement,image:img,blog,oldKey:null});
                        Misc.fadeIn({anchor:imgCont,xpos:50,ypos:100,time:600});
                        parent.removeChild(floatContainer);
                        btnClicked.classList.remove("active");
                        imgCont.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                imgCont.classList.toggle("isActive");
                                img.classList.toggle("isActive");
                                const isActive=([...imgCont.classList as any] as string[]).includes("isActive");
                                if(isActive){
                                    this.removeMainElement(parent,imgCont,img);
                                    imgCont.style.zIndex="";
                                }
                            }
                        });
                    }
                });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
                Misc.matchMedia({parent:imgCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
                Misc.matchMedia({parent:imgCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
                
                
            }
        });

    }

    async bgImage(column:HTMLElement,flex:flexType){
        const blog=this._modSelector._blog;
        this._modSelector.loadBlog(blog);
        const {form,reParent}=Misc.imageForm(column,flex);
        form.style.top="50%";
        reParent.style.zIndex="2";
        const {parsed}=Header.checkJson(column.getAttribute("flex"));
        let _flex=(parsed as flexType) ? parsed as flexType : flex;
        const oldKey=flex.imgKey ? flex.imgKey : null;
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File;
                if(file){
                    const user=this._user.user
                    const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                    const imgUrl=URL.createObjectURL(file);
                    column.style.backgroundImage=`url(${imgUrl})`;
                    column.style.backgroundSize=`100% 100%`;
                    column.style.backgroundPosition=`50% 50%`;
                    _flex={..._flex,position:"col",backgroundImage:true,imgKey:Key,colId:column.id};
                    _flex={..._flex,imgKey:Key,position:"col"};
                    column.setAttribute("flex",JSON.stringify(flex));
                    column.setAttribute("data-backgroundimage","true");
                    this._modSelector.promUpdateColumn(column,flex).then(async(col_)=>{
                        if(col_){
                            this._user.askSendToServer({bg_parent:column,formdata,image:null,blog,oldKey});//THIS SAVES IT AS BACKGROUND IF IMAGE=NULL
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
    async RowBgImage(column:HTMLElement,flex:flexType){
        const row=column.parentElement;
        if(!row) return;
        const {parsed}=Header.checkJson(row.getAttribute("flex"));
        let _flex=(parsed as flexType) ? parsed as flexType : flex;
        const oldKey=flex.imgKey ? flex.imgKey : null;
        const blog=this._modSelector._blog;
        this._modSelector.loadBlog(blog);
        const {form,reParent}=Misc.imageForm(row,flex);
        form.style.top="50%";
        reParent.style.zIndex="2";
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const user=this._user.user
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File;
                if(file){
                    const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                    _flex={..._flex,imgKey:Key,backgroundImage:true};
                    const imgUrl=URL.createObjectURL(file);
                    row.style.backgroundImage=`url(${imgUrl})`;
                    row.style.backgroundSize=`100% 100%`;
                    row.style.backgroundPosition=`50% 50%`;
                    flex={...flex,position:"row",backgroundImage:true};
                    row.setAttribute("flex",JSON.stringify(flex));
                    row.setAttribute("data-backgroundimage","true");
                    this._modSelector.promUpdateRow(row).then(async(row_)=>{
                        if(row_){
                            this._user.askSendToServer({bg_parent:row,formdata,image:null,blog,oldKey});//THIS SAVES IT AS BACKGROUND IF IMAGE=NULL
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
    createAnchor(parent:HTMLElement,btnClick:HTMLElement,icon:iconType,flex_:flexType){
        const {parsed,isJSON}=Header.checkJson(parent.getAttribute("flex"));
        let flex=isJSON ? parsed as flexType : flex_;
        //Form group
        const width=window.innerWidth < 900 ? 75 : 50;
        btnClick.classList.add("active");
        const div=document.createElement("div");
        div.className="m-1 position-relative element-container";
        div.style.cssText="margin-inline:auto;padding-inline:2rem;margin-block:1rem;"
        const groupForm=document.createElement("div");
        groupForm.className="form-group mx-auto flex flex-column align-items-center gap-1";
        groupForm.setAttribute("data-form-group","true");
        groupForm.style.cssText=`width:${width}%;text-align:center; font-size:12px;display:flex;flex-direction:column;gap:10px;`;
        const tName=document.createElement("h5");
        tName.textContent="enter name";
        const inName=document.createElement("input");
        inName.className="form-control mx-auto";
        inName.style.cssText="width:200px;margin-block:0.5rem";
        const tLink=document.createElement("h5");
        tLink.textContent="enter link";
        const inLink=document.createElement("input");
        inLink.className="form-control mx-auto";
        inLink.style.cssText="width:200px;margin-block:0.5rem";
        inLink.pattern="(https:\/\/)[a-zA-Z0-9]{2,}\.[a-z]{2,3}";
        const submitBtn=buttonRetDisable({parent:groupForm,text:"create",bg:this.btnColor,color:"white",type:"button",disable:true})
        groupForm.appendChild(tName);
        groupForm.appendChild(inName);
        groupForm.appendChild(tLink);
        groupForm.appendChild(inLink);
        groupForm.appendChild(submitBtn);
        parent.appendChild(groupForm);
        Misc.fadeIn({anchor:groupForm,xpos:50,ypos:100,time:600});
        const anchor=document.createElement("a");
        anchor.setAttribute("is-element","true");
        anchor.id=`${icon.name}-${Math.round(Math.random()*1000)}`;
        anchor.setAttribute("name",`${icon.name}`);
        anchor.style.cssText="margin-inline:auto;padding:1rem;font-size:18px;";
        anchor.className="text-primary"

        inName.addEventListener("change",(e:Event)=>{
            if(e){
                const nameValue=(e.currentTarget as HTMLInputElement).value;
                inName.value=nameValue;
            }
        });
        inLink.addEventListener("change",(e:Event)=>{
            if(e){
                const reg:RegExp=/(https:\/\/)[a-zA-Z0-9]{2,}\.[a-z]{2,3}/g;
                const linkValue=(e.currentTarget as HTMLInputElement).value;
                if(reg.test(linkValue)){
                inLink.value=linkValue;
                submitBtn.disabled=false;
                }else{
                    Misc.message({parent:groupForm,msg:"enter htpps://,,,.ca or .com or,,,",type_:"error",time:700})
                }
            }
        });
        submitBtn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                const divCont=document.createElement("div");
                divCont.style.cssText=this.divCont_css;
                divCont.className=this.divCont_class;
                divCont.id=`anchor-container-${Math.round(Math.random()*100)}`;
                anchor.textContent=inName.value;
                anchor.href="#";
                anchor.onclick=()=>{window.open(inLink.value,"_blank")};
                anchor.setAttribute("data-href",inLink.value);
                flex={...flex,anchorContainer:inLink.value};
                anchor.setAttribute("contenteditable","true");
                Main.flexTracker(anchor,flex);
                anchor.setAttribute("data-name-id",`${icon.name}-${anchor.id}`);
                this.promElementAdder(anchor).then(async(res)=>{
                    if(res && res.target && res.ele){
                        const ele=res.ele as unknown as element_selType;
                        divCont.setAttribute("data-placment",`${ele.order}-A`);
                        res.target.onclick=(e:MouseEvent)=>{
                            if(e){
                                anchor.classList.toggle("isActive");
                                divCont.classList.toggle("isActive");
                                this.updateElement(anchor)
                            }
                        };
                        divCont.appendChild(anchor);
                        parent.appendChild(divCont);
                        Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
                        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
                        this.removeMainElement(parent,divCont,anchor);
                        parent.removeChild(groupForm);
                        btnClick.classList.remove("active");
                    }
                });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
            }
        });

        
        
    }
    selectUltype(parent:HTMLElement,btnClick:HTMLElement,flex_:flexType){
        const {parsed,isJSON}=Header.checkJson(parent.getAttribute("flex"));
        const flex=isJSON ? parsed as flexType : flex_;
        const arr=[{name:"select",value:"select"},{name:"bullet",value:"none"},{name:"ordered",value:"decimal"}];
        // const useParent=selector && flex ? parent as HTMLElement :
        btnClick.classList.add("active");
        parent.classList.add("position-relative");
        const select=document.createElement("select");
        select.className="position-absolute selectUl";
        select.style.cssText="top:0; width:20%;";
        select.setAttribute("isPopup","true");
        arr.forEach((type_)=>{
            const option=document.createElement("option");
            option.value=type_.value;
            option.textContent=type_.name;
            select.appendChild(option);
        });
        parent.appendChild(select);
        Misc.fadeIn({anchor:select,xpos:50,ypos:100,time:600});
        select.addEventListener("change",(e:Event)=>{
            if(e){
                const check=([...btnClick.classList as any] as string[]).includes("active");
                if(check){
                const type__=(e.currentTarget as HTMLSelectElement).value
                this.createList(parent,btnClick,type__,flex);
                btnClick.classList.remove("active");
                parent.removeChild(select);
               
                }
                
            }
        });
        
    }
    //PARENT SELECTULTYPE()
    createList(parent:HTMLElement,btnClick:HTMLElement,type:string,flex_:flexType){
        const {parsed,isJSON}=Header.checkJson(parent.getAttribute("flex"));
        const flex=isJSON ? parsed as flexType : flex_;
        Main.textarea=document.querySelector("div#textarea");
        const useParent=parent as HTMLElement;
        if(useParent){
            const divCont=document.createElement("div");
            divCont.className=this.divCont_class;
            divCont.style.cssText=this.divCont_css;
            const ul=document.createElement("ul");
            ul.setAttribute("contenteditable","true");
            ul.setAttribute("is-element","true");
            ul.setAttribute("name","ul");
            ul.className=" box-shadow";
            ul.classList.add("element");
            ul.classList.add("box-shadow");
            ul.style.cssText="padding-inline:6px;width:90%;margin-inline:auto;";
            const li=document.createElement("li");
            // li.setAttribute("contenteditable","true");
            if(type==="decimal"){
                li.classList.add("decimal");
            }
            divCont.appendChild(ul);
            useParent.appendChild(divCont);
            Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
            Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
            Misc.fadeIn({anchor:divCont,xpos:50,ypos:100,time:600});
            Main.flexTracker(ul,flex);
            this.promElementAdder(ul).then(async(res)=>{
                if(res && res.target && res.ele){
                    const ele=res.ele as unknown as element_selType;
                    divCont.setAttribute("data-placement",`${ele.order}-A`);
                    this.editElement(res.target)//pulls flex if exist from target attrubutes
                    res.target.onclick=(e:MouseEvent)=>{
                        if(e){
                            if(!(([...res.target.children as any] as HTMLElement[]).map(li=>(li.nodeName)).includes("LI"))){
                                ul.appendChild(li);
                            }
                            res.target.classList.toggle("isActive");
                            if(([...res.target.classList as any] as string[]).includes("isActive")){
                            this.removeMainElement(useParent,divCont,res.target);
                            this.updateElement(res.target);//does both selectors and elements
                            }
                            btnClick.classList.remove("active");
                            
                        }
                    };
                }
            });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
            
            
            //ADDING element
            
           
           //NOTE CHANGE EVENT ONLY WORKS FOR INPUT,TEXTAREA TYPE
        }
    }
    createQuote(parent:HTMLElement,icon:iconType,flex_:flexType){
        const {parsed,isJSON}=Header.checkJson(parent.getAttribute("flex"));
        const flex=isJSON ? parsed as flexType : flex_;
        Main.textarea=document.querySelector("div#textarea");
        const useParent= parent as HTMLElement ;
        const divCont=document.createElement("div");
        divCont.style.cssText=this.divCont_css;
        divCont.className=this.divCont_class;
        const quote=document.createElement("blockquote");
        quote.setAttribute("name","blockquote");
        quote.setAttribute("is-element","true");
        quote.id=`blockquote-${Math.round(Math.random()*1000)}`;
        quote.className="position-relative";
        quote.classList.add(icon.display);
        quote.classList.add("element");
        quote.classList.add("box-shadow");
        quote.setAttribute("contenteditable","true");
        quote.textContent=icon.name;
        divCont.appendChild(quote);
        useParent.appendChild(divCont);
        Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
        Misc.fadeIn({anchor:quote,xpos:50,ypos:100,time:600});
        //ADDING element
        Main.flexTracker(quote,flex);//adds flex to attribute flex
        this.promElementAdder(quote).then(async(res)=>{
            if(res && res.target){
                const ele=res.ele as unknown as element_selType;
                divCont.setAttribute("data-placement",`${ele.order}-A`);
                res.target.onclick=(e:MouseEvent)=>{
                    if(!e) return
                    divCont.classList.toggle("isActive");
                    res.target.classList.toggle("isActive");
                    if(([...res.target.classList as any] as string[]).includes("isActive")){
                    this.removeMainElement(useParent,divCont,res.target);
                    this._modSelector.updateElement(res.target)//update bot element and selector elements
                    
                    };
                };
            };
            this.editElement(quote)//realtime edits on either flex or none items
        });//CRITICAL: needs flexTracker!!,this adds elements to selector and/or elements
        
       
        
    }
    insertDateTime(parent:HTMLElement,btnClicked:HTMLButtonElement,icon:iconType,flex_:flexType){
        const {parsed,isJSON}=Header.checkJson(parent.getAttribute("flex"));
        const flex=isJSON ? parsed as flexType : flex_;
        btnClicked.classList.add("active");
        const divCont=document.createElement("div");
        divCont.className=this.divCont_class;
        divCont.style.cssText=this.divCont_css;
        const container=document.createElement("div");
        container.className="position-relative flexCol justify-center align-center mx-auto my-auto px-1 py-2 ";
        container.style.cssText="width:200px;height:20vh;"
        const formGroup=document.createElement("form");
        formGroup.className="form-group flexCol justify-center align-center position-absolute gap-1";
        formGroup.setAttribute("data-form-group","true");
        formGroup.style.cssText="inset:-1rem;background:white;width:100%; max-height:100%;border-radius:15px;box-shadow:1px 1px 6px 1px black,-1px -1px 4px 1px black;";
        const label=document.createElement("label");
        label.textContent="select date and time";
        const input=document.createElement("input");
        input.type="datetime-local";
        input.name="datetime";
        input.id="datetime";
        input.min="2024-04-07T00:00";
        input.max="2026-04-24T00:00";
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        const submit:btnReturnDisableType={
            parent:formGroup,
            text:"submit",
            bg:this.bgColor,
            color:"white",
            type:"submit",
            disable:true
        }
       const btn= buttonRetDisable(submit);
        // formGroup.appendChild(btn);
        container.appendChild(formGroup);
        parent.appendChild(container);
        input.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        Misc.fadeIn({anchor:formGroup,xpos:50,ypos:100,time:600});
        formGroup.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const datetime=formdata.get("datetime") as string;
                const newDate=new Date(datetime as string);
                const mkDateTime=`about-${datetime.split("-")[2].split("T")[1]}`;
                const time=document.createElement("time");
                time.id=`${icon.name}-${Math.round(Math.random()*1000)}`;
                time.setAttribute("datetime",`${mkDateTime}`);
                time.innerHTML=newDate.toLocaleDateString();
                time.style.cssText="margin:0.75rem; font-size:16px";
                time.className="text-primary mx-auto my-3 show-time";
                divCont.appendChild(time);
                parent.appendChild(divCont);
                parent.removeChild(container);
                Misc.matchMedia({parent:divCont,maxWidth:820,cssStyle:{paddingInline:"1.5rem"}});
                Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{paddingInline:"10px"}});
                Main.flexTracker(time,flex);
                this.promElementAdder(time).then(async(res)=>{
                    if(res && res.target && res.ele){
                        const ele=res.ele as unknown as element_selType;
                        divCont.setAttribute("data-placement",`${ele.order}`);
                        res.target.addEventListener("click",(e:Event)=>{
                            if(e){
                                btnClicked.classList.toggle("active");
                                divCont.classList.toggle("isActive");
                                time.classList.toggle("isActive");
                                this.removeMainElement(parent,divCont,time);
                            }
                        });
                    }
                });
                
            }
        });

    }
    setEvenHeight(column:HTMLElement){
        for(const key of Object.keys(column.style)){
            if(key==="height"){
                column.style.height="auto";
            }
        }
        const getRow=column.parentElement;
        const {isJSON,parsed}=Header.checkJson(column.getAttribute("flex"));
        if(!getRow || !isJSON) return;
        const flex=parsed as flexType;
        const rowHeight=window.getComputedStyle(getRow).getPropertyValue("height");
        column.style.height=rowHeight;
        this._modSelector.promUpdateColumn(column,flex).then(async(col)=>{
            if(!col){
                Misc.message({parent:column,msg:"set height failed",time:700,type_:"error"});
            }
        });
    };
    removeEvenHeight(column:HTMLElement){
        const getRow=column.parentElement;
        const {isJSON,parsed}=Header.checkJson(column.getAttribute("flex"));
        if(!getRow || !isJSON) return;
        const flex=parsed as flexType;
        column.style.height="auto";
        this._modSelector.promUpdateColumn(column,flex).then(async(col)=>{
            if(!col){
                Misc.message({parent:column,msg:"remove height failed",time:700,type_:"error"});
            }
        });
    };
    removeFlexBox(parent:HTMLElement,target:HTMLElement){
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
                    if(sel && sel.eleId===parent.id){
                        const arr=Header.getImgKeys(sel);
                        if(arr && arr.length>0){
                            arr.map(item=>{
                                if(item){
                                    this._service.adminImagemark(item.imgKey).then(async(res)=>{
                                        if(res){
                                            Misc.message({parent,msg:`${item.imgKey}`,type_:"success",time:400});
                                        }
                                    });
                                }
                            });
                        }
                        this._modSelector.selectors.splice(index,1);
                        this._modSelector.shiftPlace(sel.placement);
                    }
                });
                Misc.fadeOut({anchor:target,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(target);
                },380);
               
            }
        });
    }
    static getPlacement():Promise<string | null>{
        return new Promise((resolver,reject)=>{
            if(typeof window !=="undefined"){
                resolver(localStorage.getItem("placement"));
                reject("flexbox: could not get placement")

            }
        }) as Promise<string | null>;
    }
   


   //PARENT: ROWCOLGENERATOR()- GENERATES COLUMNS
   colGenerator(cols:number){
     //Column GENERATOR
    const arrCol=[{col:1,num:12},{col:2,num:6},{col:3,num:4},{col:4,num:3},{col:6,num:2}]
    const result=arrCol.find(col_=>(col_.col===cols));
    if(!result)return
    return result.num;
    }


    bgShade(parent:HTMLElement,btnClicked:HTMLButtonElement,icon:iconType,flex_:flexType| null){
        const {parsed,isJSON}=Header.checkJson(parent.getAttribute("flex"));
        const flex=isJSON ? parsed as flexType : flex_;
        const useParent=flex ? parent : btnClicked as HTMLElement;
        const direction=window.innerWidth < 600 ? "column":"row" ;
        useParent.style.position="relative";
        useParent.style.zIndex="100";
        btnClicked.classList.add("active");
        //show drop-down on shade selection
        const popup=document.createElement("div");
        popup.style.cssText=`position:absolute;border-radius:5px;box-shadow:1px 1px 10px 1px #bdc5c9;display:flex;flex-direction:${direction};width:175px;height:auto;z-index:200;`;
        popup.setAttribute("is-popup","true");
        popup.id="popup";
        if(flex){
            popup.style.top="0px";
            popup.style.left="0px";
            popup.style.transform="translate(5px,-25px)";
        }else{
            popup.style.transform="none";
            if(direction==="column"){
                popup.style.width="75px";
                popup.style.inset="105% -50% -110% -150%";
            }else{
            popup.style.inset="105% -50% -110% -250%";
            };
        };
        const selectBlue=document.createElement("select");
        selectBlue.style.cssText="border-radius:15px;"
        selectBlue.className="box-shadow";
       
        Misc.blueShades?.forEach((shade)=>{
            const option=document.createElement("option");
            option.value=JSON.stringify(shade);
            option.textContent=shade.name;
            option.style.cssText=`font-size:9px;background-color:${shade.value};`;
            selectBlue.appendChild(option);
        });
        popup.appendChild(selectBlue);
        Misc.fadeIn({anchor:popup,xpos:50,ypos:100,time:600});
        selectBlue.addEventListener("change",(e:Event)=>{
            if(e){
                const getActives=document.querySelectorAll("[is-element=true].isActive");
                const value=(e.currentTarget as HTMLSelectElement).value as string;
                const {parsed,isJSON}=Header.checkJson(value);
                const shade= isJSON ? parsed as {name:string,value:string}:null;
                btnClicked.classList.remove("active");
                // console.log(shade)
                const check=(getActives && getActives.length>0)? true:false;
                
                if(check){
                    ([...getActives as any] as HTMLElement[]).forEach((element)=>{
                        
                            if(element && shade){
                                element.style.backgroundColor=shade.value;
                                this._modSelector.updateElement(element);//updates on both selector and Element
                            }
                        
                    });
                }else{
                    if(flex && shade){
                        useParent.style.backgroundColor=shade.value;
                        this._modSelector.updateColumn(useParent,flex);
                    }
                }
                ([...useParent.children as any] as HTMLElement[]).forEach(child=>{
                    if(child && child.id==="popup"){
                        useParent.removeChild(child);
                    }
                });
                
            }
        });
        const select1=document.createElement("select");
        select1.style.cssText="border-radius:15px;"
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
        useParent.appendChild(popup);
        select1.addEventListener("change",(e:Event)=>{
            if(e){
                const getActives=document.querySelectorAll("[is-element=true].isActive");
                const value=(e.currentTarget as HTMLSelectElement).value as string;
                
                btnClicked.classList.remove("active");
                const check=(getActives && getActives.length>0)? true:false;
                
                if(check){
                    ([...getActives as any] as HTMLElement[]).forEach((element)=>{
                        
                            if(element){
                                element.style.backgroundColor=value;
                                this._modSelector.updateElement(element);//updates on both selector and Element
                            }
                        
                    });
                }else{
                    if(flex){
                        useParent.style.backgroundColor=value;
                        this._modSelector.updateColumn(useParent,flex);
                    }
                }
                ([...useParent.children as any] as HTMLElement[]).forEach(child=>{
                    if(child && child.id==="popup"){
                        useParent.removeChild(child);
                    }
                });
                
            }
        });
        
        //then remove "active" on btn
    }

    selectorAdder(target:HTMLElement,selector:selectorType):selectorType{
        const maxcount=ModSelector.maxCount(this._modSelector.blog);
            localStorage.setItem("placement",String(maxcount+1));
            this.placement=maxcount+1;
        const arr=this.selectors;
      
        const newSelect:selectorType={
           ...selector as selectorType,
           id:this.placement,
           name:target.getAttribute("name")? target.getAttribute("name") : "",
           eleId:target.id,
           class:target.className,
           cssText:target.style.cssText,
           rows:[] as rowType[],
           header:false,
           placement:this.placement,
           footer:false
       } as selectorType;
       
    
           this.placement=this.placement + 1;
           arr.push(newSelect);
       //addAttributes
       this.selectors=arr
       this._modSelector.footerPlacement();
    //    console.log("selector",newSelect)
       return newSelect
       // console.log("191: selectorAdder: selectors",this._selectors)//works
   }
   rowAdder(target:HTMLElement,selectorId:string):rowType | undefined{
    let row_:rowType={} as rowType;
    const {parsed}=Header.checkJson(target.getAttribute("flex"));
    const flex= parsed as flexType;
    const {backgroundImage,imgKey}=flex;
    this._selectors=this.selectors.map(select=>{
        // console.log("197:modSelector:rowAdderr:outside",select.eleId,selectorId);
        if(select.eleId===selectorId){
            const ID=select.rows ? select.rows.length :0;
            const check=select.rows.find(row=>(row.eleId===target.id)) ? true:false;
            // console.log("201:modSelector:rowAdderr:inside",select.id,selectorId);
            if(!check){
                row_={
                    id: ID,
                    name:target.getAttribute("name") ? target.getAttribute("name") as string : '' ,
                    class:target.className.split(" ").filter(cl=>(cl !=="box-shadow")).join(" "),
                    eleId:target.id,
                    inner_html:target.textContent ? target.textContent : "",
                    cssText:target.style.cssText,
                    cols:[] as colType[],
                    selector_id:select.id,
                    imgimgKey:imgKey ? imgKey : undefined,
                    order:ID
                } as rowType;
                if(backgroundImage){
                    target.setAttribute("data-backgroundImage","true");
                }
                select.rows.push(row_);
            }
        }
        return select;
    });
    this.selectors=this._selectors;
    const _row_:rowType|undefined=row_
    if(_row_) return _row_
    return 
    }
    colAdder(target:HTMLElement,flex_:flexType):colType | undefined{
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        let flex:flexType=isJSON ? parsed as flexType : flex_;
        const {selectorId,rowId,imgKey,backgroundImage}=flex;
        let col:colType={} as colType
        this._selectors=this.selectors.map(select=>{
            if(select.eleId===selectorId){
                select.rows.map(row=>{
                    if(row.eleId ===rowId){
                        const check=row.cols.map(col=>(col.eleId)).includes(target.id as string);
                        // console.log("277:check:determines if COL extis",check,"target.id",target.id,)//works
                        if(!check){
                            const ID1=row.cols?.length ? row.cols.length : 0;
                                col={
                                    id:ID1,
                                    name:target.getAttribute("name") ? target.getAttribute("name") as string : '' ,
                                    class:target.className.split(" ").filter(cl=>(cl !=="box-shadow")).filter(cl=>(cl !=="coliIsActive")).join(" "),
                                    eleId:target.id,
                                    inner_html:target.textContent ? target.textContent : "",
                                    cssText:target.style.cssText,
                                    elements:[] as element_selType[],
                                    row_id:row.id,
                                    imgKey:imgKey ? imgKey : undefined,
                                    order:ID1
                            }as colType;
                            if(backgroundImage){
                                target.setAttribute("data-backgroundImage","true");
                            }
                            row.cols.push(col);
                            flex={...flex,order:ID1}
                            target.setAttribute("flex",JSON.stringify(flex));
                            target.setAttribute("order",String(ID1))
                        }
                    }
                    return row;
                });
            }
            return select;
        });
           this.selectors=this._selectors;
           return col
        //    console.log("colAdder():selectors:col",col_)
            
    }
    promElementAdder(target:HTMLElement){
        return new Promise((resolver,reject)=>{
            resolver(this.elementAdder(target));
            reject("did not add to modSelector");
        }) as Promise<{ target: HTMLElement | HTMLImageElement,ele: element_selType} | {target: HTMLElement | HTMLImageElement,ele: elementType;} | undefined>;
    }
    elementAdder(target:HTMLElement | HTMLImageElement):{ target: HTMLElement | HTMLImageElement,ele: element_selType} | undefined{

        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        const checkNodename=["a","blockquote","ul","img","ol"]
        const nodename=target.nodeName.toLowerCase();
        const specialNodename=checkNodename.includes(nodename);
        // console.log("isJson",isJSON,"parsed",parsed,"nodeName",target.nodeName);
        if(isJSON){
            let flex=parsed as flexType;
            const {selectorId,rowId,colId,shapeOutsideCircle,shapeOutsideSquare,shapeOutsidePolygon,imgKey}=flex;
            //ADDING ATTRIBUTES
            const name=target.nodeName.toLowerCase();
            target.setAttribute("is-element","true");
            target.setAttribute("name",name);
            let ele:element_selType={} as element_selType;
            //ADDING ATTRIBUTES
       
            this._selectors = this._modSelector._selectors.map(selector_=>{
                if(selector_.eleId===selectorId ){
                    // console.log("inside selector:",selector_.eleId===selectorId);//works
                    selector_.rows.map(row=>{
                        if(row.eleId===rowId){
                            row.cols.map((col)=>{
                                // console.log("compare col:",col.eleId,"flex.col",colId);//works
                                // console.log("1350 inside col:",col.eleId===colId);
                                if(col.eleId===colId){
                                    const ID=col.elements ? col.elements.length:0;
                                    // console.log("1352 HELROWSSSSS outside check: target.id",target.id);
                                    const check=col.elements && col.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
                                    // console.log("1357 HELROWSSSSS BEFORE CHECK: col.eleId",col.eleId);
                                        if(nodename && !check){
                                        
                                            // console.log("1357 HELROWSSSSS INSIDE",target.id);
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
                                                order:ID,
                                                imgKey: imgKey ? imgKey : undefined
                                            } as element_selType;
                                            
                                             if(shapeOutsideCircle){
                                                ele.attr="data-shapeOutside-circle";
                                            }else if(shapeOutsideSquare){
                                                ele.attr="data-shapeOutside-square";
                                            }else if(shapeOutsidePolygon){
                                                ele.attr="data-shapeOutside-polygon";
                                            }
                                            if(!specialNodename){
                                                    ele.inner_html=target.innerHTML;
                                    
                                            }else if(nodename==="a"){
                                                const link=target.getAttribute("data-href") as string;
                                                ele.attr=link;
                                                ele.inner_html=target.innerHTML;
                                                
                                            }else if(specialNodename && nodename !=="a"){
                                                ele.inner_html=target.innerHTML as string
                                                // console.log("modSelector.elementAdder()",ele.inner_html)
                                            }else if(nodename==="img"){
                                                const target_=target as HTMLImageElement;
                                                ele.img=target_.src;
                                                ele.inner_html=target_.alt;
                                            }else{
                                                ele.inner_html=target.innerHTML;
                                                ele.cssText=target.style.cssText;
                                                ele.class=target.className;
                                            }
                                            col.elements.push(ele)
                                            target.setAttribute("order",String(ID));
                                            flex={...flex,order:ID};
                                            target.setAttribute("flex",JSON.stringify(flex));
                                            // console.log("ELEMENT ADDER:INSIDE",col.elements)
                                        }
                                        // console.log("OUTSIDE",col.elements)
                                }
                                
                                return col;
                            })
                        }
                        return row;
                    });
                }
                return selector_;
            });
            this.selectors=this._selectors; //saving it to blog
            // const col_=this.selectors.find(sel=>(sel.eleId===selectorId))?.rows.find(row=>(row.eleId===rowId))?.cols.find(col=>(col.eleId===target.id));
            return {target:target,ele:ele};
        }

    }
    updateElement(target:HTMLElement){
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        const nodename=target.nodeName.toLowerCase();
        if(isJSON){
            const flex=parsed as flexType;
            const {selectorId,rowId,colId,imgKey}=flex ;
            this._selectors=this._selectors.map(select=>{
                if(select.eleId===selectorId){
                    select.rows.map(row=>{
                        if(row.eleId===rowId){
                            row.cols.map(col=>{
                                if(col.eleId===colId){
                                    col.elements.map(ele=>{
                                        if(ele.eleId===target.id){
                                            ele.cssText=target.style.cssText;
                                            ele.class=target.className.split(" ").filter(cl=>(cl !== "isActive")).join(" ");
                                            ele.inner_html=target.innerHTML;
                                            ele.imgKey=imgKey ? imgKey:undefined;
                                            if(nodename==="a"){
                                                const link=target.getAttribute("data-href");
                                                const anchorContainer=target.getAttribute("data-anchor-container");
                                                ele.attr=JSON.stringify({link,anchorContainer});
                                                ele.inner_html=target.innerHTML;
                                            }else if(nodename==="img"){
                                                const img=target as HTMLImageElement;
                                                ele.img=img.src;
                                                ele.inner_html=img.alt;
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
            this.selectors=this._selectors;
        }
    }
    editElement(target:HTMLElement | HTMLImageElement){
        const nodename=target.nodeName.toLowerCase();
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        const flex=isJSON ? parsed as flexType :null;
        const getTarget=document.getElementById(`${target.id}`);
        // console.log("flex",flex)
        if(flex){
            const isUlType=["ul","ol","blockquote","img","a"].includes(nodename)
            const editThis=getTarget ? getTarget : target;
            target.setAttribute("contenteditable","true");
                target.focus()
                const {selectorId,rowId,colId}= flex as flexType;
                this._selectors=this._modSelector._selectors.map(selector_=>{
                    // console.log("lev:selector:",selector_.eleId===selectorId);
                    if(selector_.eleId===selectorId){
                        selector_.rows.map(row=>{
                            if(row.eleId===rowId){
                                row.cols.map(col=>{
                                    if(col.eleId===colId){
                                        col.elements.map(element=>{
                                            if(element.eleId===target.id){
                                                editThis.addEventListener("input",(e:Event)=>{
                                                    if(e){

                                                        if(!isUlType){
                                                            element.inner_html=target.innerHTML;
                                                        }else if(nodename==="img"){
                                                            const img=target as HTMLImageElement;
                                                            element.img=img.src;
                                                            
                                                        }else if(target.nodeName.toLowerCase()==="a"){
                                                                const link=target.getAttribute("data-href");
                                                                element.attr=link ? link:undefined
                                                                element.inner_html=target.innerHTML;
                                                        }else{
                                                            
                                                            element.inner_html=target.innerHTML;
                                                            
                                                        }
                                                    }
                                                },true);
                                                element.class=target.className.split(" ").filter(cl=>(cl !=="isActive")).join(" ");
                                                element.cssText=target.style.cssText;
                                            
                                                    // console.log("1422: EDIT",element.inner_html)
                                                
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
                this.selectors=this._modSelector._selectors;
                // console.log("953:modSelector:editElement",this.selectors)//works
                        
                
            
        
        }
    }
    editElementTwo(target:HTMLElement | HTMLImageElement){
        const nodename=target.nodeName.toLowerCase();
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        const flex=isJSON ? parsed as flexType :null;
        if(flex){
            target.setAttribute("contenteditable","true");
            target.focus()
                const {selectorId,rowId,colId}= flex as flexType;
                this._selectors=this._selectors.map(selector_=>{

                    if(selector_.eleId===selectorId){
                        selector_.rows.map(row=>{
                            if(row.eleId===rowId){
                                row.cols.map(col=>{
                                    if(col.eleId===colId){
                                        col.elements.map(element=>{
                                            if(element.eleId===target.id){
                                                const arrCheck=["ul","ol","blockquote","img","a"]
                                                if(!(arrCheck.includes(nodename))){
                                                    element.inner_html=target.innerHTML;
                                                }else if(nodename==="img"){
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
                                            
                                                    // console.log("1422: EDIT",element.inner_html)
                                                
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
                this.selectors=this._selectors;
        }
    }
    updateColumn(column:HTMLElement,flex:flexType){
        if(flex && typeof(flex)==="object"){
            const {selectorId,rowId,colId,imgKey}=flex;
            this.selectors=this.selectors.map(select=>{
                if(select.eleId===selectorId){
                    select.rows.map(row=>{
                        if(row.eleId===rowId){
                            row.cols.map(col=>{
                                if(col.eleId===colId){
                                    col.class=column.className.split(" ").filter(cl=>(cl !=="box-shadow")).filter(cl=>(cl !=="coliIsActive")).join(" ");
                                    col.cssText=column.style.cssText;
                                    col.imgKey=imgKey ? imgKey : undefined
                                }
                                return col;
                            });
                        }
                        return row;
                    });
                }
                return select;
            });
        }
    }
    updateRow(target:HTMLElement,flex:flexType){
        const {selectorId,imgKey}=flex;
        this._selectors=this._selectors.map(select=>{
            if(select.eleId===selectorId){
                select.rows.map(row=>{
                    if(row.eleId===target.id){
                        row.class=target.className.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                        row.cssText=target.style.cssText;
                        row.imgKey=imgKey ? imgKey : undefined
                    }
                    return row;
                });
            }
            return select;
        });
    }

///---------ULTILITIES///-----------///

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
        xIconDiv.style.cssText=`${css}`;
        const cssStyle={background:"inherit",fontSize:"inherit"};
        FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
        divCont.appendChild(xIconDiv);
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.promRemoveElement(target).then(async(res)=>{
                    if(res){
                        const {isJSON,parsed}=Header.checkJson(target.getAttribute("flex"));
                        if(isJSON && target.nodeName==="IMG"){
                            const flex=parsed as flexType;
                            const {imgKey}=flex;
                            if(imgKey){
                            this._service.adminImagemark(imgKey).then(async(res)=>{
                                if(res){
                                    Misc.message({parent:parent,msg:`${imgKey} is deleted`,type_:"success",time:700});
                                }
                            });
                            }
                        }
                    }
                });
                Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:400});
                setTimeout(()=>{parent.removeChild(divCont);},398);
                //resetting buttons
                Main.initMainBtns();
            }
        });

    }
    promRemoveElement(target:HTMLElement){
        return new Promise((resolver)=>{
            resolver(this.removeElement(target))
        }) as Promise<boolean |undefined>;
    }
    //REMOVES ELEMENT FROM BLOG AND REINDEXES!!!!!!!!
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
        //----------REINDEXING------///
        
        this._modSelector.selectors=this._modSelector._selectors
        return true;
    }
    removeFlexbox(parent:HTMLElement,select:HTMLElement){
        const selectorId=select.id;
        select.style.position="relative";
        const css="position:absolute;transform:translate(-2px,-10px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:0px;left:0px;"
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("contenteditable","false");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.className="xIconDiv";
        xIconDiv.style.cssText=`${css}`;
        const cssStyle={background:"inherit",fontSize:"inherit"};
        FaCreate({parent:xIconDiv,name:FaTrash,cssStyle});
        select.appendChild(xIconDiv);
        xIconDiv.onmouseover=(e:MouseEvent)=>{
            if(e){
                parent.classList.toggle("borderOn")
            }
        }
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                parent.removeChild(select);
                
                    this._modSelector._selectors.map((sel,index)=>{
                        if(sel.eleId===selectorId){
                            this._modSelector._selectors.splice(index,1);
                            this._modSelector.shiftPlace(sel.placement);
                        }
                        return sel
                    });
                    this._modSelector.selectors=this._modSelector._selectors;
            }
        });

    }
   

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
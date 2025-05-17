import {flexType,colType,rowType,selectorType,elementChoiceType, userType, blogType,} from "./Types";
import ModSelector from "@/components/editor/modSelector";
import { separator } from "../blog/displayBlog";
import {FaCrosshairs,FaTrash,} from "react-icons/fa";
import {FaCreate} from "@/components/common/ReactIcons";
import { btnType, button, buttonReturn } from "../common/tsFunctions";
import Main,{ shades,blueShades } from "./main";
import Header from "./header";
import Misc from "../common/misc/misc";
import Service from "../common/services";
import User from "../user/userMain";
import Nav from "../nav/headerNav";
import { idValueType, selRowColType, selRowType, typeEnumType } from "@/lib/attributeTypes";
import { element_selType } from '@/components/editor/Types';
import { attrEnumArr, attrEnumArrTest, typeEnumArr, typeEnumArrTest } from "../common/lists";
import Reference from "./reference";
import Dataset from "../common/dataset";




class Footer{
    public mail:string;
    public phone:string;
    public link:string;
    public count=0;
    public divCont_css:string;
    public divCont_class:string;
    public bgColor:string;
    public btnColor:string;
    private _selectors:selectorType[];
    private _selector:selectorType;
    private _element_sel:element_selType;

   public static readonly elementChoices:elementChoiceType[]=[
        {id:0,name:"select",ele:null,isEle:false,attr:null},
        {id:1,name:"set-height",ele:null,isEle:false,attr:"minHeight"},
        {id:1,name:"set-row-height",ele:null,isEle:false,attr:"minHeight"},
        {id:2,name:"copyright",ele:"div",isEle:true,attr:null},
        {id:3,name:"image",ele:"img",isEle:false,attr:"image"},
        {id:3,name:"img-size-adjust",ele:null,isEle:false,attr:"img-size-adjus"},
        {id:4,name:"bg-image",ele:null,isEle:false,attr:"bg-image"},
        {id:5,name:"set-image-height",ele:"null",isEle:false,attr:"set-image-height"},
        {id:6,name:"bg-row-image",ele:null,isEle:false,attr:"bg-row-image"},
        {id:7,name:"rm-bg-image",ele:null,isEle:false,attr:"rm-bg-image"},
        {id:8,name:"set-column-height",ele:null,isEle:false,attr:"set-column-height"},
        {id:9,name:"text",ele:"p",isEle:true,attr:null},
        {id:10,name:"small",ele:"small",isEle:true,attr:null},
        {id:11,name:"insert-email",ele:"insert-email",isEle:false,attr:"insert-email"},
        {id:12,name:"insert-tel",ele:"insert-tel",isEle:false,attr:"insert-tel"},
        {id:13,name:"insert-link",ele:"insert-link",isEle:false,attr:"insert-link"},
        {id:14,name:"reference-links",ele:null,isEle:false,attr:"reference-links"},
        {id:15,name:"quote",ele:"blockquote",isEle:true,attr:null},
        {id:16,name:"image rounded",ele:null,isEle:false,attr:"imgRound"},
        {id:17,name:"flex-col",ele:null,isEle:false,attr:"flexCol"},
        {id:18,name:"flex-row",ele:null,isEle:false,attr:"flexRow"},
        {id:19,name:"flex-between",ele:null,isEle:false,attr:"flex-between"},
        {id:20,name:"flex-center",ele:null,isEle:false,attr:"flex-center"},
        {id:21,name:"flex-remove",ele:null,isEle:false,attr:"flex-remove"},
        {id:22,name:"bg-row-color",ele:null,isEle:false,attr:"bgColor"},
        {id:23,name:"bg-ele-color",ele:null,isEle:false,attr:"bgEleColor"},
        {id:24,name:"box-shadow",ele:null,isEle:false,attr:"box-shadow"},
        {id:25,name:"font-color",ele:null,isEle:false,attr:"font-color"},
        {id:26,name:"font-size",ele:null,isEle:false,attr:"font-size"},
        {id:27,name:"text-center",ele:null,isEle:false,attr:"text-center"},

    ];

    private _rows:rowType[];

    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,public reference: Reference,private _blog:blogType){
        this.mail="/images/mail.png";
        this.phone="/images/phone.png";
        this.link="/images/link.png";
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this.divCont_css="display:flex;flex-direction:column;justify-content:center;width100%;align-items:center;padding:0.25rem;";
        this.divCont_class="eleContainer";
        this._selector={
            id:5,
            eleId:"",
            placement:0,
            name:"flex-row2-colT4-colB4",
            class:"",
            cssText:"",
            inner_html:"",
            rowNum:2,
            colNum:8,
            colAttr:[{id:4,selector_id:5,T:4,B:4}],
            rows:"",
            blog_id:0,
            headerType:undefined,
            header:false,
            footer:true
        };
        this._element_sel=this._modSelector.initElement_sel;
        this._rows=[] as rowType[];
        
    };

    get blog(){
        const strBlog=localStorage.getItem("blog");
        if(strBlog){
            const blog=JSON.parse(strBlog) as blogType
            return blog
        }else{
            return this._blog
        }
    };
    set blog(blog:blogType){
        this._blog=blog;
        this._modSelector.blog=blog;
    };
    //SETTER GETTERS
    get selector(){
        return this._selector;
    };

    set selector(selector:selectorType){
        this._selector=selector;
    };
    get selectors(){
        return this._modSelector.selectors;
    };

    set selectors(selectors:selectorType[]){
        this._selectors=selectors
        this._modSelector.selectors=selectors
    };
    get placement(){
        const maxCount=ModSelector.maxCount(this._modSelector.blog)
        return maxCount + 1;
    };

    set placement(placement:number){
        this._modSelector.placement=placement;
    };
    get user(){
        return this._user.user;
    };

    set user(user:userType){
        this._user.user=user;
    };

    get rows(){
        return this._rows;
    };
    set rows(rows:rowType[]){
        this._rows=rows;
    };
    get groupRows(){
        return this._modSelector.groupRows;
    };
    set groupRows(groupRows:{selectorId:string,rows:rowType[]}[]){
        this._modSelector.groupRows=groupRows;
    };
   

    //SETTER GETTERS
    //INJECTION FROM LOCALSTORAGE
    async showSelector({parent_,selector,idValues,user}:{parent_:HTMLElement,selector:selectorType,idValues:idValueType[],user:userType|null}){
        const getMainFooter=document.querySelector("footer#mainFooter") as HTMLElement;
        const parent=getMainFooter || Main._mainFooter as HTMLElement;
        const _user = user || this.user;
        // console.log("Header selector",selector)//works
        if(selector){
            const innerCont=document.createElement(selector.name);
            const eleId=selector.eleId
            innerCont.id=selector.eleId;
            innerCont.className=selector.class;
            innerCont.setAttribute("name",selector.name);
            innerCont.setAttribute("data-selector-id",`${selector.id}`);
            innerCont.setAttribute("data-container-id",`${innerCont.id}`);
            innerCont.setAttribute("data-selector-id",selector.eleId);
            innerCont.setAttribute("data-placement",`${selector.placement}`);
            innerCont.style.cssText=selector.cssText;
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
            idValues=retIdValues;
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
            this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
            this._modSelector.dataset.populateElement({
                target:innerCont,
                selRowColEle:selector,
                level:"selector",
                loc:"flexbox",
                idValues,
                clean:false
               });
            const {rows}=this._modSelector.checkGetRows({select:selector});
            this.rows=rows;
                await Promise.all(this.rows.toSorted((a,b)=>{if(a.order < b.order) return -1 ; return 1}).map(async(row_)=>{
                    const selRow={selectorId:selector.eleId,rowId:row_.eleId} as selRowType;
                    const row=document.createElement("div");
                    row.id=row_.eleId;
                    const eleId=row.id;
                    row.className=row_.class;
                    const {cleaned}=this._modSelector.removeClasses({target:row,classes:["isActive"]});
                    row.className=cleaned.join(" ");
                    row.style.cssText=row_.cssText;
                    // console.log("ROW STYLES INCOMMING",row_.cssText)//works
                   idValues.push({eleId,id:"rowId",attValue:eleId});
                   idValues.push({eleId,id:"selRow",attValue:JSON.stringify(selRow)});
                   idValues.push({eleId,id:"ID",attValue:eleId});
                   idValues.push({eleId,id:"row_id",attValue:String(row_.id)});
                   idValues.push({eleId,id:"name",attValue:row_.name});
                   idValues.push({eleId,id:"selectorId",attValue:innerCont.id});
                  
                   const _row_=await this._modSelector.removeBlob({target:row,rowColEle:row_,loc:"flexbox",level:"row",idValues,selRowCol:null,selRow});
                   if(_row_.imgKey){
                       idValues.push({eleId,id:"imgKey",attValue:_row_.imgKey});
                       row.setAttribute("data-backgroundImg","true");
                       row.setAttribute("data-backgroundImg","true");
                       const url=this._service.getFreeBgImageUrl({imgKey:_row_.imgKey});
                       row.style.backgroundImage=`url(${url})`;
                       row.style.backgroundPosition="50% 50%";
                       row.style.backgroundSize="100% 100%";
                       
                    };
                    const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                        target:innerCont,
                        sel:selector,
                        row:row_,
                        col:null,
                        ele:null,
                        idValues,
                        loc:"flexbox",
                        level:"row",
                        clean:false
        
                    });
                    idValues=retIdValues;
                    idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
                    const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                    this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
                    this._modSelector.dataset.populateElement({
                     target:row,
                     selRowColEle:row_,
                     level:"row",
                     loc:"flexbox",
                     idValues,
                     clean:false
                    });
                   
                    await Promise.all(row_?.cols.toSorted((a,b)=>{if(a.order < b.order) return -1 ; return 1}).map(async(col_)=>{

                        const selRow:selRowType={selectorId:selector.eleId,rowId:row_.eleId}
                        const selRowCol={selectorId:selector.eleId,rowId:row_.eleId,colId:col_.eleId} as selRowColType
                        idValues.push({eleId:col_.eleId,id:"selRow",attValue:JSON.stringify(selRow)});
                        idValues.push({eleId:col_.eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});

                        this.generateColumn({sel:selector,rowEle:row_,row,col_,idValues}).then(async(cRes)=>{
                            if(cRes){
                                row.appendChild(cRes.col);

                                this.selectElements({
                                    column:cRes.col,
                                    sel:cRes.sel,
                                    rowEle:cRes.rowEle,
                                    colEle:cRes.colEle,
                                    idValues,
                                    user:_user

                                });//Selection ELEMENTS

                                cRes.col.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        cRes.col.classList.add("coliIsActive");
                                      
                                        // }
                                    }
                                });
                                await Promise.all(cRes.colEle?.elements.toSorted((a,b)=>{if(a.order < b.order) return -1 ; return 1}).map(async(element)=>{
                                    if(element){
                                        if(element.type==="reference"){
                                            this.reference.showLinks({
                                                parent:cRes.col,
                                                ele:element,
                                                idValues:cRes.idValues,
                                                isHtmlElement:false,
                                                sel:cRes.sel,
                                                rowEle:cRes.rowEle,
                                                colEle:cRes.colEle
                                            })
                                        }

                                        await this.generateElement({sel:selector,col:cRes.col,element,rowEle:row_,colEle:col_,idValues,selRowCol:cRes.selRowCol}).then(async(eRes)=>{
                                             if(eRes){
                                                if(eRes.isEdit){

                                                    this.editElement({
                                                       target:eRes.target,
                                                       sel:selector,
                                                       rowEle:eRes.rowEle,
                                                       colEle:eRes.colEle,
                                                       idValues:eRes.idValues
   
                                                    });
                                                }
                                                 eRes.divCont.onclick=(e:MouseEvent)=>{
                                                     if(e){
                                                         eRes.divCont.classList.toggle("isActive");
                                                         eRes.target.classList.toggle("isActive");
                                                         this.updateElement({
                                                             target:eRes.target,
                                                             sel:selector,
                                                             rowEle:eRes.rowEle,
                                                             colEle:eRes.colEle,
                                                             idValues:eRes.idValues
                                                         });
                                                         this.removeMainElement({
                                                            parent:cRes.col,
                                                            divCont:eRes.divCont,
                                                            sel:cRes.sel,
                                                            rowEle:eRes.rowEle,
                                                            colEle:eRes.colEle,
                                                            target:eRes.target,
                                                            idValues:eRes.idValues
                                            
                                                        });
                                                        
                                                     }
                                                 };
                                             }
                                         });
                                    }
        
                                }));
                            }
                        });
                    }));
                    innerCont.appendChild(row);
                    //remove selector
                    this.removeFooter(parent_,innerCont,idValues);
                    //remove selector
                }));
            parent.appendChild(innerCont);
            innerCont.onclick=(e:MouseEvent)=>{
                if(e){
                    innerCont.classList.toggle("isActive");
                    this.removeFooter(parent,innerCont,idValues);
                }
            };
        }
    };
    //GENERATE COLUMN
    async generateColumn({sel,rowEle,row,col_,idValues}:{

        sel:selectorType,
        rowEle:rowType,
        row:HTMLElement,
        col_:colType,
        idValues:idValueType[]

    }): Promise<{sel:selectorType,rowEle:rowType,selRowCol:selRowColType,colEle:colType,col:HTMLElement,row:HTMLElement,idValues:idValueType[]}>{
       
        
        const col=document.createElement("div");
        col.id=col_.eleId;
        const eleId=col.id;
        const selRowCol={selectorId:sel.eleId,rowId:rowEle.eleId,colId:col_.eleId} as selRowColType;
        idValues.push({eleId,id:"colId",attValue:eleId});
        idValues.push({eleId,id:"ID",attValue:eleId});
        idValues.push({eleId,id:"colOrder",attValue:String(col_.order)});
        idValues.push({eleId,id:"isColumn",attValue:"true"});
        idValues.push({eleId,id:"column",attValue:"true"});
        idValues.push({eleId,id:"col_id",attValue:String(col_.id)});
        idValues.push({eleId,id:"rowId",attValue:row.id});
        idValues.push({eleId,id:"name",attValue:"div"});
        idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
        col.style.cssText=col_.cssText;
        col.className=col_.class;
        
        const _col_=await this._modSelector.removeBlob({target:col,rowColEle:col_,loc:"flexbox",level:"col",idValues,selRow:null,selRowCol});
        if(_col_.imgKey){
            idValues.push({eleId,id:"imgKey",attValue:_col_.imgKey});
            col.setAttribute("data-backgroundImg","true");
            const url=this._service.getFreeBgImageUrl({imgKey:_col_.imgKey});
            col.style.backgroundImage=`url(${url})`;
            col.style.backgroundPosition="50% 50%";
            col.style.backgroundSize="100% 100%";
        }
        const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
            target:col,
            sel,
            row:rowEle,
            col:col_,
            ele:null,
            idValues,
            loc:"flexbox",
            level:"col",
            clean:false

        });
        idValues=retIdValues;
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
        this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
        this._modSelector.dataset.populateElement({
            target:col,
            selRowColEle:col_,
            level:"col",
            loc:"flexbox",
            idValues,
            clean:false
           });
        return Promise.resolve({sel,rowEle,colEle:col_,col,row,idValues,selRowCol}) as Promise<{sel:selectorType,rowEle:rowType,colEle:colType,col:HTMLElement,row:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}>;
    };

    //GENERATE ELEMENT
   
    async generateElement({sel,rowEle,colEle,col,element,idValues,selRowCol}:{
        sel:selectorType,
        rowEle:rowType,
        colEle:colType,
        col:HTMLElement,
        element:element_selType,
        idValues:idValueType[],
        selRowCol:selRowColType,

    }): Promise<{
        target: HTMLElement;
        divCont: HTMLDivElement;
        idValues:idValueType[];
        sel:selectorType;
        rowEle:rowType;
        colEle:colType;
        isEdit:boolean;
        selRowCol:selRowColType;
    } | undefined>{
        const node=element.name;
        const eleId=element.eleId;
        const checkArr=["img","ul","blockquote","a","span","logo","image","ol","time"].includes(node);
        const divCont=document.createElement("div");
        divCont.className="eleContainer";
        divCont.style.cssText="margin:0;padding:10px;margin-left:0.5rem;";
        divCont.setAttribute("data-placement",`${element.order}-A`);
        const target=document.createElement(node);
        target.className=element.class;
        target.innerHTML=element.inner_html;
        target.style.cssText=element.cssText;
        target.id=eleId
        
        const eleAttr=attrEnumArrTest(element)
        const eleType=typeEnumArrTest(element);//finds if type exists on element
        if(eleType && eleType.id==="reference"){
            //INSERT CLASS REFERENCE
        }else if(element.attr==="backgroundImg"){
            const _ele_=await this._modSelector.removeBlob({target,rowColEle:element,loc:"flexbox",level:"element",idValues,selRowCol,selRow:null});
            if(_ele_.imgKey){
                target.setAttribute("data-backgroundImg","true");
                idValues.push({eleId,id:"imgKey",attValue:_ele_.imgKey})
               const url=this._service.getFreeBgImageUrl({imgKey:_ele_.imgKey});
               target.style.backgroundImage=`url(${url})`;
               target.style.backgroundPosition="50% 50%";
               target.style.backgroundSize="100% 100%";
            }
        }
        if(eleAttr && eleAttr.id==="link")idValues.push({eleId,id:"link",attValue:eleAttr.value});
        if(eleAttr && eleAttr.id==="email")idValues.push({eleId,id:"email",attValue:eleAttr.value});
        if(eleAttr && eleAttr.id==="tel")idValues.push({eleId,id:"tel",attValue:eleAttr.value});
        idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
        idValues.push({eleId,id:"elementId",attValue:eleId});
        idValues.push({eleId,id:"name",attValue:element.name});
        idValues.push({eleId,id:"colId",attValue:col.id});
        idValues.push({eleId,id:"eleOrder",attValue:String(element.order)});
        idValues.push({eleId,id:"ele_id",attValue:String(element.id)});
        const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
            target,
            sel,
            row:rowEle,
            col:colEle,
            ele:element,
            level:"element",
            loc:"flexbox",
            idValues,
            clean:false
        });
        idValues=retIdValues;
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
        this._modSelector.dataset.idValues=this._modSelector.dataset.idValues.concat(getEleIds);
        this._modSelector.dataset.populateElement({
            target,
            selRowColEle:element,
            level:"element",
            loc:"flexbox",
            idValues,
            clean:false
        });
        const link=(eleAttr && eleAttr.id==="link") ? eleAttr.value:undefined;
        const email=(eleAttr && eleAttr.id==="email") ? eleAttr.value:undefined;
        const tel=(eleAttr && eleAttr.id==="tel") ? eleAttr.value:undefined;
        if(!checkArr){
            divCont.appendChild(target);
            col.appendChild(divCont);
            Main.toggleActiveIcon(target);
           
            
            return {target,divCont,idValues,rowEle,sel,colEle,isEdit:true,selRowCol};
            
        }else if(node==="ul"){
            const ele=target as HTMLUListElement;
            ele.setAttribute("is-element","true");
            ele.classList.remove("isActive");
            ele.id=element.eleId
            ele.setAttribute("name",element.name);
            divCont.appendChild(ele);
            col.appendChild(divCont);
            Main.toggleActiveIcon(ele);
           
            return {target:ele,divCont,rowEle,sel,colEle,idValues,isEdit:true,selRowCol};
        }else if(node==="blockquote"){
            const ele=target as HTMLQuoteElement;
            ele.classList.remove("isActive");
            divCont.appendChild(ele);
            col.appendChild(divCont);
            Main.toggleActiveIcon(ele);
           
            return {target:ele,divCont,rowEle,sel,colEle,idValues,isEdit:true,selRowCol};
        }else if(node==="a"){
            const anchor=target as HTMLAnchorElement;
            const content= anchor.textContent ? anchor.textContent:"name";
            Header.cleanUp(anchor);
            const img=document.createElement("img");
            img.alt="www.ablogroom.com";
            img.style.cssText="aspect-ratio:1/1;width:25px;border:none;margin-right:1rem;";
            const span=document.createElement("span");
            span.appendChild(img);
            const text=new Text(content);
            span.appendChild(text);
            if(link){
                img.src=this.link;
                anchor.appendChild(span);
                 anchor.onclick=()=>window.open(link,"_blank");
                 anchor.textContent=content;
               
                }
            else if(email){
                img.src=this.mail;
                anchor.appendChild(span);
                 anchor.href=email
                 anchor.onclick=()=>window.open(link,"_blank");
                 anchor.textContent=content;
           
                }
           else if(tel) {
            img.src=this.phone;
            anchor.appendChild(span);
            anchor.href=tel
            anchor.onclick=()=>window.open(link,"_blank");
        
            };
           
            Main.toggleActiveIcon(anchor);
            divCont.appendChild(anchor);
            col.appendChild(divCont);

            return {target:anchor,divCont,rowEle,sel,colEle,idValues,isEdit:false,selRowCol};

        }else if(node==="logo"){
            const eleId=element.eleId
            const ele=target as HTMLImageElement;
            ele.setAttribute("contenteditable","false");

            ele.className=element.class;
            ele.src=element.img as string;
            ele.id=element.eleId as string;
            ele.alt=element.inner_html;
            if(element.imgKey){
                idValues.push({eleId,id:"imgKey",attValue:element.imgKey});
                this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                    if(res){
                        ele.src=res.img as string;
                        ele.alt=res.Key as string;
                    }
                });
              
            }
            divCont.appendChild(ele);
            col.appendChild(divCont);

            return {target:ele,divCont,rowEle,sel,colEle,idValues,isEdit:false,selRowCol};

        }else if(node==="img" ){
            const eleId=element.eleId;
            const ele:HTMLImageElement=target as HTMLImageElement;
            ele.src=element.img as string;
            ele.alt=element.inner_html as string;
            if(element.imgKey){
                idValues.push({eleId,id:"imgKey",attValue:element.imgKey});
               await this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                    if(res){
                        ele.src=res.img as string;
                        ele.alt=`${res.Key.split("/")[1].split("-")[1]}`;
                    }
                });
                const {isJSON,parsed}=Header.checkJson(ele.getAttribute("flex"));
                let flex=isJSON ? {...parsed} as flexType:undefined;
                if(flex){
                    flex={...flex,imgKey:element.imgKey}
                    ele.setAttribute("flex",JSON.stringify(flex));
                    this._user.refreshImageShow({parent:divCont,image:ele,formdata:null,selRowCol,idValues});
                    ele.setAttribute("flex",JSON.stringify(flex));
                }
            };
            divCont.appendChild(ele);
            col.appendChild(divCont);
           
            return {target:ele,divCont,rowEle,sel,colEle,idValues,isEdit:false,selRowCol};
        }
    };

    //INJECTION target=>sidebar
    main(target:HTMLElement,idValues:idValueType[]){
        
        this.selectors=this._modSelector.selectors;
        const popup=document.createElement("section");
        popup.style.cssText="position:absolute;inset:0%;backdrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center; justify-content:center;gap:1rem;z-index:2000;width:100%;transform:translateY(-200%);";
        const form=document.createElement("form");
        form.style.cssText="margin-inline:auto;padding-inline:1rem;width:auto;display:flex;flex-direction:column;";
        const formGrp=document.createElement("div");
        formGrp.className="form-group mx-auto d-flex flex-column";
        const rlabel=document.createElement("label");
        rlabel.className="text-primary text-center mx-auto";
        rlabel.textContent=" # row";
        rlabel.setAttribute("for","row");
        const rinput=document.createElement("input");
        rinput.className="form-control";
        rinput.type="number";
        rinput.id="rows";
        rinput.min="1";
        rinput.max="2";
        rinput.name="rows";
        formGrp.appendChild(rlabel);
        formGrp.appendChild(rinput);
        const formGrp1=document.createElement("div");
        formGrp1.className="form-group mx-auto d-flex flex-column";
        const clabel=document.createElement("label");
        clabel.className="text-primary text-center mx-auto";
        clabel.textContent="columns";
        clabel.setAttribute("for","columns");
        const cinput=document.createElement("input");
        cinput.className="form-control";
        cinput.type="number";
        cinput.name="columns";
        cinput.min="1";
        cinput.max="4";
        cinput.id="columns";
        formGrp1.appendChild(clabel);
        formGrp1.appendChild(cinput);
        form.appendChild(formGrp);
        form.appendChild(formGrp1);
        const btn =document.createElement("button");
        btn.style.cssText=`margin-block:2rem;background:${this.btnColor};color:white;border:1px solid white;padding-inline:2rem;padding-block:0.5rem;border-radius:25px;`;
        btn.className="btn";
        btn.type="submit";
        btn.textContent="submit";
        separator(form,this.btnColor);
        form.appendChild(btn);
        popup.appendChild(form);
        target.appendChild(popup);
        Misc.fadeIn({anchor:popup,xpos:50,ypos:100,time:600});
        form.addEventListener("submit",(e:SubmitEvent) => {
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const columns=parseInt(formdata.get("columns") as string) as number;
                const rows=parseInt(formdata.get("rows") as string) as number;//colAttr:[{id:4,selector_id:5,T:4,B:4}]
                this.selector={...this.selector,
                    footer:true,
                    rowNum:rows,
                    colNum:columns,
                    colAttr:[{id:0,selector_id:0,T:rows-1,B:columns}]
            };
                
                this.createFooter(target,this.selector,idValues);//input from form
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                setTimeout(()=>{
                    target.removeChild(popup);
                },380);
            }
        });
    };

     //PARENT:main() : this is the created footer within main
    createFooter(parent:HTMLElement,select:selectorType,idValues:idValueType[]){
        // FROM FORM ( footer.main()) 
        this.selector=select;
        const user=this.user;
        const check=this.selectors.find(select=>(select.footer===true)) || false;
        // console.log(check);//works
        if(!check){
            const css_col="display:flex;justify-content:center;align-items:center;flex-direction:column;"
            const selectID=`footer-${Math.round(Math.random()*1000)}`;
            const main=document.createElement("footer");
            main.setAttribute("name","footer");
            main.style.cssText=css_col + "position:relative;width:100%; margin-inline:0px;padding:0px;margin-top:2.5rem;margin-bottom:0;border-top:1px solid grey;gap:0.25rem;";
            main.id=selectID;
            const eleId=main.id;
            main.className="footerContainer";
            main.setAttribute("data-placement",`${this.placement}`);
            this.selector={...this.selector,id:0,eleId:eleId,footer:true,header:false};
            this.selectorAdder({target:main,selector:this.selector,idValues}).then(async(sel)=>{
                if(sel ){
                   
                    Array.from(Array(sel.select?.rowNum).keys()).map((num)=>{
                        const rowNums=sel.select?.rowNum
                        const row=document.createElement("div");
                        const rand=Math.floor(Math.random()*1000);
                        row.id=`footer-row-${rowNums}-${num}-${rand}`;
                        const eleId=row.id;
                        row.className=`row my-0 mx-0 footer-row box-shadow`;
                        row.style.cssText=`padding-inline:10px;width:100%;margin-inline:0px;border-radius:10px; `;
                        row.style.minHeight="5vh";
                      
                       idValues.push({eleId,id:"rowId",attValue:eleId});
                       idValues.push({eleId,id:"selectorId",attValue:main.id});
                       idValues.push({eleId,id:"ID",attValue:eleId});
                       idValues.push({eleId,id:"isRow",attValue:"true"});
                       idValues.push({eleId,id:"rowNum",attValue:String(rowNums)});
                       idValues.push({eleId,id:"numCols",attValue:String(sel.select?.colNum)});
                       const selector=sel.select as selectorType;
                        this.rowAdder({target:row,selectEle:main,idValues,selector}).then(async(res)=>{
                            if(res ){
                                const numCols=res.sel.colNum
                                Array.from(Array(numCols).keys()).map((numCol)=>{
                                    const rand=Math.floor(Math.random()*1000);
                                    const col=document.createElement("div");
                                    col.id=`footer-row-${num}-col-${numCol}-${rand}`;
                                    const eleId=col.id;
                                    const colMd=`col-md-${12/numCols}`;
                                    col.className=`${colMd} mx-auto footer-col box-shadow`;
                                    col.style.cssText="display:flex;justify-content:space-between;align-items:center;"
                                    col.setAttribute("name","div");
                                    col.setAttribute("is-col","true");
                                    col.style.cssText=`flex:0 0 auto;height:inherit;display:flex;justify-content:center;gap:0;flex-wrap:wrap;border-radius:inherit;`;
                                    col.setAttribute("is-column","true");
                                    idValues.push({eleId,id:"colId",attValue:eleId});
                                    idValues.push({eleId,id:"ID",attValue:eleId});
                                    idValues.push({eleId,id:"numCols",attValue:String(numCol)});
                                    idValues.push({eleId,id:"rowNum",attValue:String(num)});
                                    
                                    this._modSelector.colAdder({parent:row,target:col,idValues,selector:res.sel,row:res.rowEle as rowType}).then(async(_res)=>{
                                        if(_res){
                                            
                                            _res.parent.appendChild(_res.target);
                                            this.selectElements({column:_res.target,idValues,sel:res.sel,rowEle:_res.row as rowType,colEle:_res.col,user});
                                            res.target.addEventListener("click",(e:MouseEvent)=>{
                                                if(e){
                                                    col.classList.add("coliIsActive");
                                                    
                                                }
                                            });
                                        }
                                    });
                                });
                            }
                        });
                        main.appendChild(row);
                    });
                }
            });
            Footer.divider(parent);
            parent.appendChild(main);
            main.onclick=(e:MouseEvent)=>{
                if(e){
                    main.classList.toggle("isActive");
                    this.removeFooter(parent,main,idValues);
                }
            };
        }else{
            Misc.message({parent,type_:"error",time:2000,msg:"you must delete the original footer before creating another!!"})
        }
        
    };



    //----------DROP-DOWN ATTRIBUTES FOR ELEMENT && ATT(S) SELECTION------////
    selectElements({column,idValues,sel,rowEle,colEle,user}:{
        column: HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType,
        user:userType
    }){
           Footer.cleanUpByID(column,"footer-popup-select-elements");
           column.style.position="relative";
           const popup=document.createElement("div");
           popup.setAttribute("isPopup","true");
           popup.classList.add("popup");
           popup.style.cssText="position:absolute;top:0;right:0;transform:translate(5px,-15px);width:fit-content;height:auto;font-size:10px;";
           popup.id="footer-popup-select-elements";
           const select=document.createElement("select");
           Footer.elementChoices.forEach(eleChoice=>{
               const option=document.createElement("option");
               const value=JSON.stringify(eleChoice);
               option.value=value;
               option.textContent=eleChoice.name;
               select.appendChild(option);
           });
           popup.appendChild(select);
           column.appendChild(popup);
           select.addEventListener("change",(e:Event)=>{
               if(e){
                const selectValue:string|undefined=(e.currentTarget as HTMLSelectElement).value ;
                const {parsed,isJSON}=Header.checkJson(selectValue);
                const eleChoice:elementChoiceType|null= isJSON ? parsed as elementChoiceType : null;
                   if(!eleChoice) return;
                   const {name,ele,isEle,attr}=eleChoice;
                   if(isEle && !attr){
                       this.create_element({column,eleName:ele,name,idValues,sel,rowEle,colEle}).then(async(eRes)=>{
                        //AFTER ITS CREATED( Target is appened onto divCont)
                        if(eRes ){
                           
                            this.removeMainElement({
                                parent:column,
                                divCont:eRes.divCont,
                                sel,
                                rowEle,
                                colEle,
                                target:eRes.target,
                                idValues

                            });
                            eRes.divCont.onclick=(e:MouseEvent)=>{
                                if(!e) return;
                                eRes.divCont.classList.toggle("isActive");
                                eRes.target.classList.toggle("isActive");
                            };
                            this.editElement({target:eRes.target,sel,rowEle:eRes.rowEle,colEle:eRes.colEle,idValues:eRes.idValues});
                        }
                       });
                   }else if(!isEle && attr){
                    //ADDING ATTRIBUTES
                        this.addAttribute({column,attr,idValues,sel,name,rowEle,colEle,user});
                   }
                   column.classList.remove("coliIsActive");
                   const getpopups=column.querySelectorAll("div#footer-popup");
                   ([...getpopups as any] as HTMLElement[]).map(ele=>{
                       if(ele){
                           column.removeChild(ele);
                       }
                   });
               }
           });
      
   };
    //----------DROP-DOWN ATTRIBUTES FOR ELEMENT && ATT(S) SELECTION------////
   
    
   async create_element({column,eleName,name,sel,rowEle,colEle,idValues}:{
    column:HTMLElement,
    eleName:string|null,
    name:string,
    idValues:idValueType[]
    sel:selectorType,
    rowEle:rowType,
    colEle:colType
   }):Promise<{
    column:HTMLElement,
    rowEle:rowType,
    idValues:idValueType[],
    colEle:colType,
    divCont:HTMLElement,
    target:HTMLElement
   }|undefined>{
        const rand=Math.floor(Math.random() *1000);
        if(eleName){

            const divCont=document.createElement("div");
            divCont.id=`footer-divCont-${rand}`;
            divCont.className="eleContainer";
            divCont.style.cssText="margin:0;padding:0.25rem;";
            const target=document.createElement(eleName);
            target.id=`footer-element-${eleName}-${rand}`;
            const eleId=target.id;
            const selRowCol={selectorId:sel.eleId,rowId:rowEle.eleId,colId:colEle.eleId};
            idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
            idValues.push({eleId,id:"elementId",attValue:eleId});
            idValues.push({eleId,id:"ID",attValue:eleId});
            idValues.push({eleId,id:"colId",attValue:colEle.eleId});
            const date=new Date().getFullYear();
           
            switch(true){
                case name==="copyright":
                    target.className="footer-ele";
                    target.style.cssText="position:absolute;inset:100% 0% 0% 0%;transform:translate(10px,-12px);font-family:'Roboto' sans serif;margin-top:1rem;font-size:9px;";
                    target.innerHTML=`<small>&copy; ${date}</small>`;
                    divCont.appendChild(target);
                   await this.elementAdder({
                        target,
                        sel:sel,
                        rowEle,
                        colEle,
                        idValues

                    }).then(async(res)=>{
                        if(res){
                            const ele=res.ele;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                        }
                    });
                    column.appendChild(divCont)
                return {target,column,divCont,idValues,rowEle,colEle};
                case name==="small":
                    target.className="footer-ele";
                    target.style.cssText="font-size:10px;margin-inline:5px;";
                    target.textContent=`${name}-edit`;
                    divCont.appendChild(target);
                    await this.elementAdder({
                        target,
                        sel:sel,
                        rowEle,
                        colEle,
                        idValues

                    }).then(async(res)=>{
                        if(res){
                            const ele=res.ele;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                        }
                    });
                    column.appendChild(divCont);
                return {target,column,divCont,idValues,rowEle,colEle};
                case name==="text":
                    target.className="footer-ele";
                    target.setAttribute("contenteditable","true");
                    target.style.cssText="margin-inline:16px;";
                    target.textContent=`${name}-edit`;
                    divCont.appendChild(target);
                    await this.elementAdder({
                        target,
                        sel:sel,
                        rowEle,
                        colEle,
                        idValues

                    }).then(async(res)=>{
                        if(res){
                            const ele=res.ele;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                        }
                    });
                    column.appendChild(divCont);
                return {target,column,divCont,idValues,rowEle,colEle};

                case name==="quote":
                    
                    target.className="footer-ele";
                    target.style.cssText="font-family:'Roboto', sans serif; font-weight:bold;margin-left:1.5rem;margin-inline:0px;margin-left:8px;";
                    target.setAttribute("contenteditable","true");
                    target.innerHTML=`<span>&quot;<span>${name}-edit</span> "</span>`;
                    divCont.appendChild(target);
                    await this.elementAdder({
                        target,
                        sel:sel,
                        rowEle,
                        colEle,
                        idValues

                    }).then(async(res)=>{
                        if(res){
                            const ele=res.ele;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                        }
                    });
                    column.appendChild(divCont);
                return {target,column,divCont,idValues,rowEle,colEle};
                default:
                    return;
            }
            
        }
        

    };


   async addAttribute({column,attr,idValues,name,sel,rowEle,colEle,user}:{
        column:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType,
        attr:string,
        name:string,
        user:userType
    }){
        const divConts=column.querySelectorAll("div.eleContainer.isActive") as any as HTMLElement[];
        switch(true){
            case name==="rm-bg-image" :
                column.style.position="relative";
                for(const [key,value] of Object.entries(column.style)){
                    if(key && value){
                        if( key==="backgroundImage"){
                            colEle={...colEle,imgKey:undefined};
                            column.style.backgroundImage="";
                        }else if(key==="backgroundPosition"){
                            column.style.backgroundPosition=""
                        }else if(key==="backgroundSize"){
                            column.style.backgroundSize=""
                        }

                    }
                }
               await this.updateColumn({target:column,sel,colEle,rowEle,idValues}).then(async(res)=>{
                if(res){
                    Misc.message({parent:column,msg:"removed",type_:"success",time:800});
                }
               });
            return;
            case name==="image" :
               await this.insertImage({column,sel,rowEle,colEle,idValues});
            return 
                
            case name==="insert-email" :
                 await this.getEmail({column,sel,rowEle,colEle,idValues});
            return 
            case name==="insert-tel":
                  
                await this.insertTel({column,sel,rowEle,colEle,idValues});
            return 
            case name==="set-column-height" :
                this.setColumnHeight({parent:column,target:column,sel,row:rowEle,col:colEle,idValues});
            return 
            case name==="insert-link" :
                await this.insertLink({column,sel,rowEle,colEle,idValues});
            return 
            case name==="reference-links" :
                this.reference.footerLinks({column,sel,rowEle,colEle,idValues})
               
            return 
            case name==="bg-row-image":
                this.bgRowImage({target:column.parentElement as HTMLElement,sel,rowEle,colEle,idValues,user});
                
            return;
            case name==="bg-image":
                column.style.position="relative";
                this.insertBgImage({target:column,sel,rowEle,colEle,idValues});
            return;
            case name==="font-color":
                    this.setColor({column,sel,rowEle,colEle,idValues});
            return;
            case name==="img-size-adjust":
                    this.setImageSize({parent:column,sel,rowEle,colEle,idValues});
            return;
            case name==="text-center":
                column.classList.toggle("text-center");
                this.updateColumn({target:column,sel,rowEle,colEle,idValues});
            return;
            case name==="set-height":
                this.setHeight({target:column,sel,rowEle,colEle,idValues,user});
            return;
            case name==="set-row-height":
                this.setRowHeight({target:column,sel,rowEle,colEle,idValues});
            return;
            case name==="set-image-height":
                this.setImageHeight({column:column,sel,rowEle,colEle,idValues});
            return;
            case name==="font-size":
                
                this.fontSize({column:column,divConts,sel,rowEle,colEle,idValues});
            return;
            default:
            return this.setColAttributes({
                parent:column,
                sel,
                rowEle,
                colEle,
                idValues,
                user,
                name,
                attr

            });
          
        }
    };



    setHeight({target,idValues,user,sel,rowEle,colEle}:{
        target:HTMLElement,
        idValues:idValueType[],
        user:userType
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
    }){
        target.style.position="relative";
        Header.cleanUpByID(target,"popup-set-column-height");
        //create popup
        const popup=document.createElement("div");
        popup.id="popup-set-column-height";
        popup.setAttribute("is-popup","true");
        popup.style.cssText="position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.75rem;background:white; border-radius:10px;box-shadow:1px 1px 10px 1px black,-2px -2px 12px 1px blue;";
        popup.style.inset="-75px 20% 0px 20%";
        const {input,label}= Nav.inputComponent(popup);
        input.type="number";
        input.id="number";
        input.min="100";
        input.max="800";
        input.placeholder="100";
        input.value="100";
        label.setAttribute("For",input.id);
        label.textContent="set height";
        const btn=buttonReturn({parent:popup,bg:Nav.btnColor,color:"white",text:"okay",type:"button"});
        btn.disabled=true;
        target.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:420,cssStyle:{inset:"-120px 5% 20px 5%"}});
        input.oninput=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value;
                btn.disabled=false;
                target.style.minHeight=`${value}px`;
            }
        };
        btn.onclick=(e:MouseEvent)=>{
            if(e){
                colEle={...colEle,cssText:target.style.cssText}
                this.updateColumn({target,sel,rowEle,colEle,idValues}).then(async(res)=>{
                    if(res){
                        Misc.message({parent:target,type_:"success",msg:"updated",time:600});
                    }
                });
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    target.removeChild(popup);
                },398);
            }
        };
    };


    setRowHeight({target,idValues,sel,rowEle,colEle}:{
        target:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
    }){
        target.style.position="relative";
        const row=target.parentElement as HTMLElement;
        //create popup
        const popup=document.createElement("div");
        popup.id="popup-set-height";
        popup.setAttribute("is-popup","true");
        popup.style.cssText="position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.75rem;background:white; border-radius:10px;box-shadow:1px 1px 10px 1px black,-2px -2px 12px 1px blue;";
        popup.style.inset="0%";
        popup.style.width="clamp(150px,200px,225px)";
        popup.style.height="200px";
        popup.style.transform="translateY(-150%)";
        const {input,label}= Nav.inputComponent(popup);
        input.type="number";
        input.id="number";
        input.min="100px";
        input.max="600px";
        input.placeholder="100";
        input.value="100";
        label.setAttribute("For",input.id);
        label.textContent="set height";
        const btn=buttonReturn({parent:popup,bg:Nav.btnColor,color:"white",text:"okay",type:"button"});
        btn.disabled=true;
        row.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:420,cssStyle:{inset:"-120px 5% 20px 5%"}});
        input.oninput=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value;
                btn.disabled=false;
                row.style.minHeight=`${value}px`;
            }
        };
        btn.onclick=(e:MouseEvent)=>{
            if(e){
                const value=(input as HTMLInputElement).value as string;
                rowEle={...rowEle,cssText:target.style.cssText};
                ([...row.children as any] as HTMLElement[]).forEach(col=>{
                    if(col){
                        const colEle_=rowEle.cols.find(obj=>(obj.eleId===col.id));
                        if(colEle_){
                            col.style.minHeight=`${value}px`;
                            colEle={...colEle,cssText:col.style.cssText}
                            this.updateColumn({target:col,sel,rowEle,colEle:colEle_,idValues});
                        }
                    }
                });
               
                this.updateRow({target:row,rowEle,colEle,sel,idValues}).then(async(res)=>{
                    if(res){
                        Misc.message({parent:target,type_:"success",msg:"updated",time:600});
                    }
                });
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    row.removeChild(popup);
                },398);
            }
        };
    };


    removeBgImage({column,idValues,selRowCol}:{
        column:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType

    }){
        for(const key of Object.keys(column.style)){
            if(key==="backgroundImage"){
                column.style.backgroundImage="";
            }else if(key==="backgroundPosition"){
                column.style.backgroundPosition="";
            }else if(key==="backgroundSize"){
                column.style.backgroundSize="";
            }
        };
        const {parsed}=Header.checkJson(column.getAttribute("flex"));
        const flex=parsed as flexType;
        const {imgKey} = flex;
        if( imgKey){
            const check=this._service.checkFreeImgKey({imgKey});
                if(check) return;
                this._service.adminImagemark(imgKey as string,true).then(async(res)=>{
                    if(res){
                        Misc.message({parent:column,msg:`${imgKey} is removed`,type_:"success",time:700});
                        this._modSelector.updateColumn({target:column,idValues,selRowCol});
                    }
                });
            
        }
    };




    bgRowImage({target,idValues,user,sel,rowEle,colEle}:{
        target:HTMLElement,
        idValues:idValueType[],
        user:userType
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
    }){
       const selRowCol={selectorId:sel.eleId,rowId:rowEle.eleId,colId:colEle.eleId} as selRowColType;
        target.style.position="relative";
        const eleId=target.id;
        const css="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;"
        const popup=document.createElement("div");
        popup.id="popup-setImageHeight";
        popup.style.cssText="position:absolute;background-color:white;border-radius:12px;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;";
        popup.style.top="-130%";
        popup.style.left="30%";
        popup.style.right="30%";
        popup.style.width="clamp(150px,200px,300px)";
        const form=document.createElement("form");
        form.style.cssText=css + "width:100%";
        const {input,label,formGrp}=Nav.inputComponent(form);
        formGrp.style.cssText=css;
        input.type="file";
        input.name="file";
        input.id="file";
        label.setAttribute("for",input.id);
        label.textContent="insert row image";
        const {button}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"red",text:"submit",type:"submit",time:400});
        button.disabled=true
        input.onchange=(e:Event)=>{
            if(e){
                button.disabled=false;
                button.style.color="white";
            }
        };
        popup.appendChild(form);
        target.appendChild(popup);
        form.onsubmit=async (e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file");
                if(file && file as File){
                    const idValue=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
                    const oldKey=idValue ? idValue.attValue : null;
                    const imgUrl=URL.createObjectURL(file as File);
                    target.style.backgroundImage=`url(${imgUrl})`;
                    target.style.backgroundSize=`100% 200%`;
                    target.style.backgroundPosition=`50% 50%`;
                    Misc.blurIn({anchor:target,blur:"20px",time:600});
                    const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                    const replaceId:idValueType={eleId,id:"imgKey",attValue:Key};
                    this._modSelector.dataset.upDateIdValue({target,idValues,idValue:replaceId});
                    rowEle={...rowEle,imgKey:Key};
                   await this.updateRow({target,sel,rowEle,colEle,idValues}).then(async(res)=>{
                        if(res){

                            const blog=this._modSelector.blog;
                            this._user.askSendToServer({bg_parent:res.target,formdata,image:null,blog,oldKey,idValues,selRowCol});
                        }
                    });
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        target.removeChild(popup);
                    },390);
                }
            }
        };
        this.deleteItem({parent:target,target:popup});


    };




    insertImage({column,sel,rowEle,colEle,idValues}:{
        column:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType

    }):Promise<{
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
    
        }>{
        column.style.position="relative";
        const popup=document.createElement("div");
        popup.style.cssText="position:absolute;inset:-175% 0% 100% 20%;width:150px;height:130px; background-color:white;box-shadow:1px 1px 7px 1px black;border-radius:8px;z-index:200;padding:5px;";
        const form=document.createElement("form");
        form.style.cssText="width:100%;margin:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;font-size:10px;overflow-x:hidden;";
        const input=document.createElement("input");
        input.type="file";
        input.id="file";
        input.name="file";
        input.className="formControl";
        input.style.cssText="font-size:12px;margin-inline:auto;"
        form.appendChild(input);
        const btnMsg:btnType={
            parent:form,
            text:"submit",
            bg:this.btnColor,
            color:"white",
            type:"submit"
        }
        const btn=buttonReturn(btnMsg);
        btn.disabled=true;
        const cancel=document.createElement("div");
        cancel.style.cssText="position:absolute;top:0;right:0;transform:translate(2px,2px);";
        FaCreate({parent:cancel,name:FaTrash,cssStyle:{color:"red"}});
        form.appendChild(cancel);
        popup.appendChild(form);
        this.removePopup({parent:column,target:popup});
        column.appendChild(popup);
        input.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        cancel.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:500});
                setTimeout(()=>{
                    column.removeChild(popup);
                },480);
            }
        });
        form.addEventListener("submit",async(e:SubmitEvent) =>{
            if(e){
                e.preventDefault();
                const selRowCol={selectorId:sel.eleId,rowId:rowEle.eleId,colId:colEle.eleId} as selRowColType;
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file_=formdata.get("file") as File;
                if(file_){
                    const rand=Math.floor(Math.random()*1000);
                    const divCont=document.createElement("div");
                    divCont.id=`footer-divCont-${rand}`;
                     this._modSelector.dataset.insertcssClassIntoComponents({
                        target:divCont,
                        level:"element",
                        headerType:undefined,
                        id:"divContId",
                        loc:"flexbox",
                        type:"footer"
                    });
                    const blog=this._modSelector.blog;
                    const urlImg=URL.createObjectURL(file_);
                    const image=document.createElement("img");
                    image.id=`footer-img-${rand}`;
                    const idValue=this._modSelector.dataset.getIdValue({target:image,idValues,id:"imgKey"});
                    const oldKey=idValue ? idValue.attValue : null;
                    let flex:flexType={} as flexType;
                    const {isJSON,parsed}=Header.checkJson(image.getAttribute("flex"));
                    flex=isJSON ? {...parsed} as flexType: {} as flexType;
                    const eleId=image.id;
                    image.className="footer-ele";
                    image.src=urlImg;
                    image.style.cssText=`border-radius:16px;drop-shadow(0 0 0.75rem ${this.btnColor});width:85px;height:85px;position:relative;left:0px;transform:translateX(6px)`;
                    image.alt=`www.ablogroom.com`;
                    divCont.appendChild(image);
                    column.appendChild(image);
                    const {Key}=this._service.generateImgKey(formdata,blog) as {Key:string};
                    const replaceId:idValueType={eleId,id:"imgKey",attValue:Key};
                    this._modSelector.dataset.upDateIdValue({target:image,idValues,idValue:replaceId});
                    idValues.push({eleId,id:"elementId",attValue:eleId});
                    idValues.push({eleId,id:"ID",attValue:eleId});
                    flex={...flex,imgKey:Key};
                    image.setAttribute("flex",JSON.stringify(flex));
               
                    this.elementAdder({target:image,sel,rowEle,colEle,idValues}).then(async(res)=>{
                        if(res){
                            const ele=res.ele
                            this.removeMainElement({parent:column,divCont,target:image,sel,rowEle,colEle,idValues});
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                            divCont.onclick=(e:MouseEvent)=>{
                                if(!e) return;
                                divCont.classList.toggle("isActive");
                                image.classList.toggle("isActive");
                            };
                            this._user.askSendToServer({bg_parent:column,formdata,image,blog,oldKey,idValues,selRowCol});
                        }
                    });
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{column.removeChild(popup)},390);
                   
                }
            }
        });
        return Promise.resolve({idValues,sel,colEle,rowEle}) as Promise<{idValues:idValueType[],sel:selectorType,rowEle:rowType,colEle:colType}>;
    };




    insertBgImage({target,sel,rowEle,colEle,idValues}:{target:HTMLElement,sel:selectorType,colEle:colType,rowEle:rowType,idValues:idValueType[]}){
        const selRowCol={selectorId:sel.eleId,rowId:rowEle.eleId,colId:colEle.eleId} as selRowColType;
        target.style.position="relative";
        const popup=document.createElement("div");
        popup.id="insert-bg-image";
        popup.style.cssText="position:absolute;inset:-175% 0% 100% 20%;width:150px;height:130px; background-color:white;box-shadow:1px 1px 7px 1px black;border-radius:8px;z-index:200;padding:5px;";
        const form=document.createElement("form");
        form.style.cssText="width:100%;margin:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;font-size:10px;overflow-x:hidden;";
        const input=document.createElement("input");
        input.type="file";
        input.id="file";
        input.name="file";
        input.className="formControl";
        input.style.cssText="font-size:12px;margin-inline:auto;"
        form.appendChild(input);
        const submit:btnType={
            parent:form,
            text:"submit",
            bg:this.btnColor,
            color:"white",
            type:"submit"
        }
        button(submit);
        popup.appendChild(form);
        this.removePopup({parent:target,target:popup});
        target.appendChild(popup);
       
        form.addEventListener("submit",(e:SubmitEvent) =>{
            if(e){
                e.preventDefault();
                const blog=this._modSelector.blog;
                const eleId=target.id;
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File;
                if(file){
                    const idValue_imgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
                    const oldKey =idValue_imgKey ? idValue_imgKey.attValue : null;
                    const {isJSON,parsed}=Header.checkJson(target.getAttribute("flex"));
                    let flex=isJSON ? {...parsed} as flexType : {} as flexType;
                
                    const {Key}=this._service.generateImgKey(formdata,blog) as {Key:string};
                    const urlImg=URL.createObjectURL(file as File);
                    const idValue:idValueType={eleId,id:"imgKey",attValue:Key};
                    this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                    const idValue1:idValueType={eleId,id:"colId",attValue:eleId};
                    this._modSelector.dataset.upDateIdValue({target,idValues,idValue:idValue1});
                    idValues.push({eleId,id:"backgroundImg",attValue:"true"});
                    target.style.backgroundImage=`url(${urlImg})`;
                    target.style.backgroundSize=`100% 100%`;
                    target.style.backgroundPosition=`50% 50%`;
                     flex={...flex,imgKey:Key,colId:target.id}
                    target.setAttribute("flex",JSON.stringify(flex));
                    if(!flex) return;
                    colEle={...colEle,imgKey:Key};
                    this.updateColumn({target,sel,rowEle,colEle,idValues}).then(async(col_)=>{
                        if(col_){
                           
                            Misc.message({parent:target,msg:"updated",type_:"success",time:700});
                        }
                    });
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        target.removeChild(popup);
                        Misc.blurIn({anchor:target,blur:"20px",time:600});
                    },398);
                    this._user.askSendToServer({bg_parent:target,formdata,image:null,blog,oldKey,idValues,selRowCol});
                }
            }
        });
    };



    fontSize({column,divConts,sel,rowEle,colEle,idValues}:{
        column:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType,
        divConts:HTMLElement[]

    }){
        //create popup
        const popup=document.createElement("div");
        popup.id="popup-set-height";
        popup.setAttribute("is-popup","true");
        popup.style.cssText="position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.75rem;background:white; border-radius:10px;box-shadow:1px 1px 10px 1px black,-2px -2px 12px 1px blue;";
        popup.style.inset="0%";
        popup.style.width="clamp(150px,200px,225px)";
        popup.style.height="200px";
        popup.style.transform="translateY(-150%)";
        const {input,label}= Nav.inputComponent(popup);
        input.type="number";
        input.id="number";
        input.min="12";
        input.max="30";
        input.placeholder="12";
        input.value="12";
        label.setAttribute("For",input.id);
        label.textContent="Font-size";
        const btn=buttonReturn({parent:popup,bg:Nav.btnColor,color:"white",text:"okay",type:"button"});
        btn.disabled=true;
        column.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:420,cssStyle:{inset:"-120px 5% 20px 5%"}});
        input.oninput=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value;
                btn.disabled=false;
                ([...column.children as any] as HTMLElement[]).map(ele=>{
                    const isActive=([...ele.classList as any] as string[]).includes("isActive");
                    if(ele && isActive){
                        ele.style.fontSize=`${value}px`;
                    }
                });
            }
        };
        btn.onclick=(e:MouseEvent)=>{
            if(e){
                const value=(input as HTMLInputElement).value as string;
                ([...divConts as any] as HTMLElement[]).map(divCont=>{
                    if(divCont){

                        ([...divCont.children as any] as HTMLElement[]).map(ele=>{
                            const isActive=([...ele.classList as any] as string[]).includes("isActive");
                            if(ele && isActive){
                                    ele.style.fontSize=`${value}px`;
                                    
                                    colEle.elements = colEle.elements.map(ele_=>{
                                            if(ele_.eleId===ele.id){
                                                ele_.cssText=ele.style.cssText;
                                            }
                                        return ele_;
                                    });
                                    this.updateElement({target:ele,sel,rowEle,colEle,idValues});
                                
                            }
                        });
                    }
                });
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    column.removeChild(popup);
                },398);
            }
        };

    };


    
    setImageHeight({column,sel,rowEle,colEle,idValues}:{column:HTMLElement,sel:selectorType,rowEle:rowType,colEle:colType,idValues:idValueType[]}){
        
        const {parsed}=Header.checkJson(column.getAttribute("flex"));
        let flex=parsed as flexType;
        column.style.position="relative";
        column.style.zIndex="1";
        const css="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;"
        const popup=document.createElement("div");
        popup.id="popup-setImageHeight";
        popup.style.cssText="position:absolute;background-color:white;border-radius:12px;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;";
        popup.style.inset="-10% 10% 10% 10%";
        const {input,label,formGrp}=Nav.inputComponent(popup);
        formGrp.className="";
        input.type="number";
        input.name="height";
        input.id="height";
        input.min="75";
        input.max="300";
        input.placeholder="75";
        label.setAttribute("for",input.id);
        label.textContent="set img height"
        formGrp.style.cssText=css;
        this.removePopup({parent:column,target:popup});
        column.appendChild(popup);
        this.deleteItem({parent:column,target:popup});
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        const {button}=Misc.simpleButton({anchor:formGrp,text:"set height",bg:Nav.btnColor,color:"green",type:"button",time:400});
        button.disabled=true;
        const getImage=column.querySelector("img.isActive") as HTMLImageElement;
        if(getImage){
            flex={...flex,colId:column.id,elementId:getImage.id};
            input.oninput=(e:Event)=>{
                if(e){
                    button.disabled=false;
                    button.style.color="white";
                    const height=(e.currentTarget as HTMLInputElement).value;
                    getImage.style.height=`${height}px`;
                    getImage.style.aspectRatio=`16 / 9`;
                    getImage.animate([
                        {backdropFilter:"blur(10px)"},
                        {backdropFilter:"blur(0px)"},
                    ],{duration:200,iterations:1,"easing":"ease-in-out"});
                }
            };
            button.onclick=(e:MouseEvent)=>{
                if(e){
                    getImage.setAttribute("flex",JSON.stringify(flex));
                  colEle.elements=colEle.elements.map(ele=>{
                        if(ele.eleId===getImage.id){
                            ele={...ele,cssText:getImage.style.cssText}
                        };
                        return ele;
                    });
                    this.updateColumn({target:column,sel,rowEle,colEle,idValues});
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        column.removeChild(popup);
                    },390);
                }
            };
        }


    };



    selectorAdder({target,selector,idValues}:{target:HTMLElement,selector:selectorType,idValues:idValueType[]}):Promise<{target:HTMLElement,select:selectorType|undefined,idValues:idValueType[]}>{
        this.selector=selector;
        const node=target.nodeName.toLowerCase();
        const check=this._modSelector.selectors.find(sel=>(sel.footer===true));
        if(check){
            this.groupRows= this.groupRows.filter(kv=>(kv.selectorId !==check.eleId));
        }
        const len=this.selectors.length;
        if(!check){
            const rowNum=selector.rowNum;
            const colNum=selector.colNum;
            const eleId=target.id;
            this.selector={
                ...selector as selectorType,
                id:len,
                name:node,
                eleId:target.id,
                class:target.className,
                cssText:target.style.cssText,
                rows:"",
                header:false,
                footer:true,
                placement:this._modSelector.placement,
            } as selectorType;
          
            idValues.push({eleId,id:"rowNum",attValue:String(rowNum)});
            idValues.push({eleId,id:"numCols",attValue:String(colNum)});
            idValues.push({eleId,id:"selectorId",attValue:eleId});
            idValues.push({eleId,id:"selector_id",attValue:String(len)});
            idValues.push({eleId,id:"ID",attValue:eleId});
            idValues.push({eleId,id:"isFooter",attValue:"true"});
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            this._modSelector.dataset.populateElement({
                target,
                selRowColEle:selector,
                level:"selector",
                loc:"flexbox",
                idValues,
                clean:false
               });
            
            this.selectors=[...this.selectors,this.selector];
            this.groupRows=[...this.groupRows,{selectorId:this.selector.eleId,rows:[] as rowType[]}];
            
            this._modSelector.footerPlacement();
            this._modSelector.placement=this._modSelector.placement + 1;
                this._modSelector._footer=this.selector;
           
            //addAttributes
            target.setAttribute("is-selector","true");
           
        };
        return Promise.resolve({target,select:this.selector,idValues}) as Promise<{target:HTMLElement,select:selectorType|undefined,idValues:idValueType[]}>;
    };


    async rowAdder({target,selectEle,idValues,selector}:{target:HTMLElement,selectEle:HTMLElement,idValues:idValueType[],selector:selectorType}):Promise<{rowEle:rowType | undefined,target:HTMLElement,selectEle:HTMLElement,idValues:idValueType[],sel:selectorType}>{
       
        const node=target.nodeName.toLowerCase();
        const colAttr=selector.colAttr[0];
        const topNum=colAttr.T;
        const botNum=colAttr.B;
        let row_:rowType={} as rowType;
        const parent=target.parentElement;
        const eleId=target.id;
        const parent_id= parent ? parent.id:null;
        if(parent_id) idValues.push({eleId,id:"parent_id",attValue:parent_id});
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
           
                const ID=this.rows ? this.rows.length :0;
                const check=!!(this.rows.find(row=>(row.eleId===eleId))) ;
                idValues.push({eleId,id:"rowId",attValue:eleId});
                const selRow:selRowType={selectorId:selector.eleId,rowId:eleId};
                idValues.push({eleId,id:"selRow",attValue:JSON.stringify(selRow)});
                idValues.push({eleId,id:"rowNum",attValue:String(topNum+botNum)});
                idValues.push({eleId,id:"selectorId",attValue:selector.eleId});
                idValues.push({eleId,id:"ID",attValue:eleId});
                idValues.push({eleId,id:"isRow",attValue:"true"});
                idValues.push({eleId,id:"rowOrder",attValue:String(ID)});
                const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                idValues.push({eleId:target.id,id:"selectorId",attValue:selector.eleId});
                if(!check){
                    row_={
                        id: ID,
                        name:node,
                        class:target.className,
                        eleId,
                        inner_html:target.innerHTML ? target.innerHTML : "",
                        cssText:target.style.cssText,
                        cols:[] as colType[],
                        selector_id:selector.id,
                        order:ID,
                        attr:undefined,
                        type:undefined
                    } as rowType;
                    //----------//---POPULATING ATTRIBUTES TO TARGET------\\-----///
                    const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                        target,loc:"flexbox",
                        level:"row",
                        clean:false,
                        sel:selector,
                        row:row_,
                        col:null,
                        ele:null,
                        idValues

                    });
                       
                    idValues=retIdValues;
                    idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
                    this._modSelector.dataset.populateElement({
                        target,
                        selRowColEle:row_,
                        level:"row",
                        loc:"flexbox",
                        idValues,
                        clean:false
                       });
                    getEleIds.map(kat=>{
                        const attrTest=attrEnumArrTest(row_);
                        const typeTest=typeEnumArrTest(row_);
                        const hasAttr=attrEnumArr.includes(kat.id);
                        const hasType=typeEnumArr.includes(kat.id as typeEnumType);
                        if(hasAttr && !attrTest){
                            row_.attr=kat.attValue;
                        }else if(hasType && !typeTest){
                            row_.type=kat.attValue;
                        }else if(kat.id==="imgKey"){
                            row_.imgKey=kat.attValue;
                        }
                    });
                     //THIS LOADS THE DEFAULTS AND POPULATES THE ELEMENT BASED ON IDVALUE INPUTS
                    this.rows=[...this.rows,row_];//WORKS
                    // RE-ASSIGNMENT
                  
                    selector.rows=JSON.stringify(this.rows);
                }
            //ADDING NEW SELECTOR TO SELECTORS && PUSHING IT TO LOCAL
            this.selectors=this._selectors.map(select=>{
                    if(select.eleId===selector.eleId){
                        select=selector
                    }
                return select
            });
           
            //ADDING NEW SELECTOR TO SELECTORS && PUSHING IT TO LOCAL
            
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            this._modSelector.dataset.idValues=idValues;
        //----------//---POPULATING ATTRIBUTES TO TARGET------\\-----///
        return Promise.resolve({rowEle:row_ as rowType,target,selectEle,idValues,sel:selector}) as Promise<{rowEle:rowType | undefined,target:HTMLElement,selectEle:HTMLElement,idValues:idValueType[],sel:selectorType}>;
        
    };



    removeFooter(parent:HTMLElement,target:HTMLElement,idValues:idValueType[]){
        const check=([...target.classList as any] as string[]).includes("isActive");
        if(check){
            const blog=this._modSelector.blog;
            Footer.cleanUpByID(parent,"delete-footer-selector-remove-footer");
            target.style.position="relative";
            const cssStyle={color:"white",fontSize:"12px"}
            const xIconDiv=document.createElement("div");
            xIconDiv.id="delete-footer-selector-remove-footer";
            xIconDiv.setAttribute("is-icon","true");
            xIconDiv.setAttribute("data-delete","selector");
         
            xIconDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-15px,-45px);border-radius:50%;padding:5px;background:black;z-index:200;"
            FaCreate({parent:xIconDiv,name:FaTrash,cssStyle:cssStyle});
            target.appendChild(xIconDiv);
            xIconDiv.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                   
                    this._modSelector.selectors.map((sel,index)=>{
                        if(sel.footer){
                          const {idValues:retIdValues,keys}=this._modSelector.dataset.removeComponentIdValues({blog,eleId:sel.eleId,idValues,loc:"flexbox"});
                          idValues=retIdValues;
                          this._modSelector.dataset.idValues=idValues;
                           
                            keys.map(key=>{
                                if(key){
                                    const check=this._service.checkFreeImgKey({imgKey:key});
                                    if(check) return;
                                    this._service.adminImagemark(key,true);
                                }
                            });
                            this._modSelector.selectors.splice(index,1);
                            this.placement = this.placement -1;
                            this.rows=[] as rowType[];
                        }
                    });

                    Misc.fadeOut({anchor:target,xpos:50,ypos:100,time:600});
                    setTimeout(()=>{
                        parent.removeChild(target);
                    },580);
                }
            });
        } else{
            Footer.cleanUpByID(parent,"delete-footer-selector-remove-footer");
        }
       
    };


   
    setColAttributes({parent,idValues,user,sel,rowEle,colEle,name,attr}:{
        parent:HTMLElement,
        idValues:idValueType[],
        user:userType
        sel:selectorType,
        rowEle:rowType,
        colEle:colType,
        name:string,
        attr:string
    }):void{
        const checkFlex=["flex-col","flex-row","flex-center","flex-between","flex-remove"].includes(name)
        const getImages=parent.querySelectorAll("img") as any as HTMLImageElement[];
        const target=parent.parentElement as HTMLElement|null;
        const bsArr=["box-shadow-md","box-shadow-md1","box-shadow-md2"]
        const parent_=parent.parentElement as HTMLElement|null;
        switch(true){
            case name==="image rounded":
                parent.classList.toggle(attr);
                if(getImages){
                    colEle.elements.forEach(ele=>{
                        if(ele){
                            getImages.forEach(img=>{
                                if(img && img.id===ele.eleId){
                                    img.style.borderRadius="50%";
                                    img.style.maxWidth="125px";
                                    img.style.maxHeight="125px";
                                    img.style.aspectRatio="1 / 1";
                                    const idValue:idValueType={eleId:img.id,id:"img",attValue:"updated"};
                                    this._modSelector.dataset.upDateIdValue({target:img,idValues,idValue});
                                    ele={...ele,cssText:img.style.cssText};
                                    this.updateElement({target:img,sel,rowEle,colEle,idValues});
                                }
                            });
                        }
                    });
                }
                
            break;
            case checkFlex:
                this.flexStyleAdjustments({target:parent,sel,rowEle,colEle,idValues,name});
            break;
            case name==="bg-row-color":
                if(!target) break;
                this.backgroundRowColor({target,sel,rowEle,colEle,idValues,attr,name});
            break;
            case name==="bg-ele-color":
                this.backgroundEleColor({parent,sel,rowEle,colEle,idValues});
            break;
            case name==="box-shadow":
                
                if(parent_){
                    //remove all box-shadows
                    ([...parent_.classList as any] as string[]).map(cl=>{
                        const check=bsArr.includes(cl);
                        if(check){
                        parent_.classList.remove(cl);
                        }
                    });
                    if(this.count <3){
                        parent_.classList.add(bsArr[this.count]);
                        this.count++;
                    }else{
                        this.count=0;
                    };
                    rowEle={...rowEle,class:parent_.className}
                    this.updateRow({target:parent_,rowEle,sel,colEle,idValues});
                }
            break;
            
            default:
                return; 
        }
    };



    setColumnHeight({parent,target,idValues,sel,row,col}:{parent:HTMLElement,
        target:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        row:rowType,
        col:colType

    }){
        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center;"
        const popup=document.createElement("form");
        popup.id="setColumnHeight-popup";
        popup.style.cssText=css_col +"position:absolute;inset:0% 0% auto 0%;width:clamp(150px,200px,250px);border-radius:12px;border:none;box-shadow:1px 1px 12px 1px black;background-color:white;color:black;";
        const {input,label,formGrp}=Nav.inputComponent(popup);
        formGrp.style.cssText=css_col + "padding:1rem";
        input.id="height";
        input.name="height";
        input.type="number";
        input.min="10";
        input.max="100";
        input.placeholder="";
        input.value="10";
        label.setAttribute("for",input.id);
        label.textContent="set column height";
        input.oninput=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLInputElement).value;
            target.style.height=`${value}vh`;
        };
        const {button}=Misc.simpleButton({anchor:popup,type:"submit",bg:this.btnColor,color:"white",text:"okay",time:400});
        button.disabled=true;
        button.textContent="?";
        input.onchange=(e:Event)=>{
            if(!e) return;
            button.disabled=false;
            button.textContent="okay";
        };
        parent.appendChild(popup)
        popup.onsubmit=(e:SubmitEvent)=>{
            if(!e) return;
            e.preventDefault();
            const formdata=new FormData(e.currentTarget as HTMLFormElement);
            const value=formdata.get("height") as string;
            target.style.height=`${value}vh`;
            this.updateColumn({target,idValues,sel,rowEle:row,colEle:col}).then(async(res)=>{
                if(res){
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{parent.removeChild(popup)},390);
                }
            });
        };
    }

    //GENERAL
   async getEmail({column,sel,rowEle,colEle,idValues}:{
    column:HTMLElement,
    idValues:idValueType[],
    sel:selectorType,
    rowEle:rowType,
    colEle:colType

    }):Promise<{
    idValues:idValueType[],
    sel:selectorType,
    rowEle:rowType,
    colEle:colType

    }>{
       
        const form=document.createElement("form");
        form.style.cssText="position:absolute;width:clamp(200px,350px,400px);height:auto;display:flex;align-items:center;justify-content:center;top:-130%;left:0%;right:10%;z-index:200;;flex-direction:column;gap:1rem;background-color:white";
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
        this.removePopup({parent:column,target:form});
        column.appendChild(form);
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const rand=Math.floor(Math.random()*1000);
                const divCont=document.createElement("div");
                divCont.id=`footer-divCont-${rand}`;
                 this._modSelector.dataset.insertcssClassIntoComponents({
                    target:divCont,
                    level:"element",
                    headerType:undefined,
                    id:"divContId",
                    loc:"flexbox",
                    type:"footer"
                });
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const email=formdata.get("email") as string;
                const name=formdata.get("name") as string;
                const anchor=document.createElement("a");
                const eleId=`footer-link-${rand}`;
                anchor.href=`mailto:${email}`;
                anchor.style.cssText="display:flex;gap:1rem;padding-inline:1rem;"
                anchor.setAttribute("data-email",anchor.href);
                const img=document.createElement("img");
                img.src=this.mail;
                img.alt="www.ablogroom.com";
                img.style.cssText="aspect-ratio:1/1;width:25px;border:none;margin-right:1rem;";
                const span=document.createElement("span");
                span.appendChild(img);
                const text=new Text(name);
                span.appendChild(text);
                anchor.appendChild(span);
                idValues.push({eleId,id:"email",attValue:anchor.href});
                idValues.push({eleId,id:"colId",attValue:column.id});
                idValues.push({eleId,id:"elementId",attValue:eleId});
                idValues.push({eleId,id:"ID",attValue:eleId});
               
                divCont.appendChild(anchor);
                column.appendChild(divCont);
                this.elementAdder({target:anchor,sel,rowEle,colEle,idValues}).then(async(res)=>{
                    if(res){
                        Misc.message({parent:column,msg:"added",time:500,type_:"success"});
                        this.removeMainElement({
                            parent:column,
                            divCont,
                            target:res.target,
                            colEle:res.col,
                            rowEle,
                            sel,
                            idValues:res.idValues

                        });
                        if(res.col){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                            divCont.onclick=(e:MouseEvent)=>{
                                if(!e) return;
                                divCont.classList.toggle("isActive");
                                res.target.classList.toggle("isActive");
                            };
                        }
                    }
                });
                Misc.fadeOut({anchor:form,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    column.removeChild(form);
                },398);
                
            }
        };
        return Promise.resolve({idValues,sel,colEle,rowEle}) as Promise<{idValues:idValueType[],sel:selectorType,rowEle:rowType,colEle:colType}>;
     };

    async insertTel({column,sel,rowEle,colEle,idValues}:{
        column:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
    
        }):Promise<{
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
    
        }>{
      
        const form=document.createElement("form");
        form.style.cssText="position:absolute;width:clamp(200px,350px,400px);height:auto;display:flex;align-items:center;justify-content:center;top:-130%;left:0%;right:10%;z-index:200;;flex-direction:column;gap:1rem;background-color:white";
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
        this.removePopup({parent:column,target:form});
        column.appendChild(form);
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const rand=Math.floor(Math.random()*1000);
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const tel=formdata.get("tel") as string;
                const name=formdata.get("name") as string;
                const divCont=document.createElement("div");
                divCont.id=`footer-divCont-${rand}`;
                 this._modSelector.dataset.insertcssClassIntoComponents({
                    target:divCont,
                    level:"element",
                    headerType:undefined,
                    id:"divContId",
                    loc:"flexbox",
                    type:"footer"
                });
                const anchor=document.createElement("a");
                anchor.id=`footer-tel-${rand}`;
                const eleId=anchor.id;
                anchor.href=`tel:${tel}`;
                anchor.setAttribute("data-tel",anchor.href);
                anchor.style.cssText="display:flex;gap:1rem;padding-inline:1rem;";
                const img=document.createElement("img");
                img.src=this.phone;
                img.alt="www.ablogroom.com";
                img.style.cssText="aspect-ratio:1/1;width:25px;border:none;margin-right:1rem;";
                const span=document.createElement("span");
                span.appendChild(img);
                const text=new Text(name);
                span.appendChild(text);
                anchor.appendChild(span);
                anchor.setAttribute("data-tel",tel);
                idValues.push({eleId,id:"tel",attValue:anchor.href});
                idValues.push({eleId,id:"elementId",attValue:eleId});
                idValues.push({eleId,id:"ID",attValue:eleId});
                idValues.push({eleId,id:"colId",attValue:column.id});
                divCont.appendChild(anchor);
                column.appendChild(divCont);
                this.elementAdder({target:anchor,sel,rowEle,colEle,idValues}).then(async(res)=>{
                    if(res){
                        console.log("OUT:ele",res.ele)
                        Misc.message({parent:column,msg:"added",time:500,type_:"success"});
                        if(res.col){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                            divCont.onclick=(e:MouseEvent)=>{
                                if(!e) return;
                                divCont.classList.toggle("isActive");
                                res.target.classList.toggle("isActive");
                                this.removeMainElement({
                                    parent:column,
                                    divCont,
                                    target:res.target,
                                    colEle:res.col,
                                    rowEle,
                                    sel,
                                    idValues:res.idValues
        
                                });
                            };
                        }
                    }
                });
                Misc.fadeOut({anchor:form,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    column.removeChild(form);
                },398);
                
            }
        };
        return Promise.resolve({idValues,sel,colEle,rowEle}) as Promise<{idValues:idValueType[],sel:selectorType,rowEle:rowType,colEle:colType}>;
     };

  

    async insertLink({column,sel,rowEle,colEle,idValues}:{
        column:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
    
        }):Promise<{
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
    
        }>{
        const form=document.createElement("form");
        form.style.cssText="position:absolute;width:clamp(200px,350px,400px);height:auto;display:flex;align-items:center;justify-content:center;top:-130%;left:0%;right:10%;z-index:200;;flex-direction:column;gap:1rem;background-color:white";
        const {input:LInput,label:Llabel}=Nav.inputComponent(form);
        LInput.type="url";
        LInput.name="link";
        LInput.id="link";
        LInput.pattern="https://.*";
        LInput.placeholder="link";
        Llabel.textContent="link";
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
        this.removePopup({parent:column,target:form});
        column.appendChild(form);
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const rand=Math.floor(Math.random()*1000);
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const link=formdata.get("link") as string;
                const name=formdata.get("name") as string;
                const divCont=document.createElement("div");
                divCont.id=`footer-divCont-${rand}`;
                this._modSelector.dataset.insertcssClassIntoComponents({
                    target:divCont,
                    level:"element",
                    headerType:undefined,
                    id:"divContId",
                    loc:"flexbox",
                    type:"footer"
                });
                const anchor=document.createElement("a");
                anchor.id=`footer-link-${rand}`;
                const eleId=anchor.id;
                idValues.push({eleId,id:"link",attValue:link});
                idValues.push({eleId,id:"elementId",attValue:eleId});
                idValues.push({eleId,id:"ID",attValue:eleId});
                idValues.push({eleId,id:"colId",attValue:column.id});
                
                anchor.onclick=(e:MouseEvent)=>{
                    if(e){
                        window.open(link,"_blank");
                    }
                }
                anchor.setAttribute("data-link",link);
                const img=document.createElement("img");
                img.src=this.mail;
                img.alt="www.ablogroom.com";
                img.style.cssText="aspect-ratio:1/1;width:25px;border:none;margin-right:1rem;";
                const span=document.createElement("span");
                span.appendChild(img);
                const text=new Text(name);
                span.appendChild(text);
                anchor.appendChild(span);
      
                divCont.appendChild(anchor);
                column.appendChild(divCont);
               
                this.elementAdder({target:anchor,sel,rowEle,colEle,idValues}).then(async(res)=>{
                    if(res){
                        Misc.message({parent:column,msg:"added",time:500,type_:"success"});
                        if(res.col){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`);
                            divCont.onclick=(e:MouseEvent)=>{
                                if(!e) return;
                                divCont.classList.toggle("isActive");
                                res.target.classList.toggle("isActive");
                                this.removeMainElement({
                                    parent:column,
                                    divCont,
                                    target:res.target,
                                    colEle:res.col,
                                    rowEle,
                                    sel,
                                    idValues:res.idValues
        
                                });
                            };
                        }
                    }
                });
                Misc.fadeOut({anchor:form,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    column.removeChild(form);
                },398);
            }
        };
        return Promise.resolve({idValues,sel,colEle,rowEle}) as Promise<{idValues:idValueType[],sel:selectorType,rowEle:rowType,colEle:colType}>;
     };



    //PARENT MAIN:mainBtn()
    footerAttributes({btn,idValues}:{btn:HTMLButtonElement,idValues:idValueType[]}):void{
            const getfooterEles=document.querySelectorAll("[is-element = 'true'");
            ([...getfooterEles as any] as HTMLElement[]).forEach(ele=>{
                if(ele){
                        const getSelRowCol=this._modSelector.dataset.getAttribute({target:ele,id:"selRowCol"});
                        const idValue=this._modSelector.dataset.getIdValue({target:ele,id:"selRowCol",idValues});
                        const selRowCol= idValue ? JSON.parse(idValue.attValue) as selRowColType:(getSelRowCol ? JSON.parse(getSelRowCol) as selRowColType:null);
                        
                        const check=([...ele.classList as any] as string[]).includes("isActive");
                        if(check){
                            ele.classList.toggle(btn.id);
                            this._modSelector.updateElement({target:ele,idValues,selRowCol});
                        }
                    }

                });
         
    };


    removePopup({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        const popup=document.createElement("div");
        popup.id="delete-popup-form";
        popup.style.cssText="position:absolute;top:0%;right:0%;transform:translate(5px,5px);z-index:20;border-radius:50%;background-color:black;color:white;padding:1px;aspect-ratio:1 / 1;font-size:10px;";
        FaCreate({parent:popup,name:FaCrosshairs,cssStyle:{fonstSize:"100%"}});
        target.appendChild(popup);
        popup.onclick=(e:MouseEvent)=>{
            if(!e) return;
            Misc.fadeOut({anchor:target,xpos:100,ypos:50,time:400});
            setTimeout(()=>{parent.removeChild(target)},390);
        };
    };

  
   
    removeMainElement({parent,divCont,target,sel,rowEle,colEle,idValues}:{
        parent:HTMLElement,
        divCont:HTMLElement,
        target:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType;

    }){
       const check= ([...divCont.classList as any] as string[]).map(cl=>(cl)).includes("isActive");
       if(check){
            divCont.style.position="relative";
           const popup=document.createElement("div");
           parent.style.zIndex="0";
           popup.id="footer-delete-popup";
           popup.style.cssText="position:absolute;top:0%;right:0%;transform:translate(5px,5px);z-index:20;border-radius:50%;background-color:black;color:white;padding:1px;aspect-ratio:1 / 1;font-size:10px;";
           FaCreate({parent:popup,name:FaCrosshairs,cssStyle:{fonstSize:"100%"}});
           divCont.appendChild(popup);
           popup.onclick=(e:MouseEvent)=>{
               if(e){
               
                   if(target.nodeName==="IMG"){
                       const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
                       const imgKey=getImgKey?.attValue || null;
                       if(imgKey){
                        const check=this._service.checkFreeImgKey({imgKey});
                            if(check) return;
                           this._service.adminImagemark(imgKey,true).then(async(res)=>{
                               if(res){
                                   Misc.message({parent:parent,msg:`${imgKey} was deleted`,type_:"success",time:700});
                               }
                           });
                       }
                   }
               const {colEle:retCol} = this.removeElement({target,sel,rowEle,colEle,idValues});
               if(retCol){
                   Misc.message({parent,msg:"removed",type_:"success",time:600});
               }
                   Misc.growOut({anchor:divCont,scale:0,opacity:0,time:400});
                   setTimeout(()=>{
                       parent.removeChild(divCont);
                   },380);
               }
           };
       }else{
        Header.cleanUpByID(divCont,"delete-popup");
       }

    };



    removeElement({target,idValues,sel,colEle,rowEle}:{
        target:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType;
    }){
        const eleId=target.id;
        idValues.map((kat,index)=>{
            if(kat.eleId===eleId){
                idValues.splice(index,1);
            }
        });
        colEle.elements= colEle.elements.filter((ele,index)=>(ele.eleId !==eleId));
        rowEle.cols=rowEle.cols.map(col=>{
            if(col.eleId===colEle.eleId){
                col=colEle;
            }
            return col;
        });
        this.rows=this.rows.map(row=>{
            if(row.eleId===rowEle.eleId){
                row=rowEle;
            }
            return row;
        });
        sel={...sel,rows:JSON.stringify(this.rows)};

        this.selectors=this.selectors.map(select=>{
                if(select.eleId===sel.eleId){
                    select=sel
                }
            return select;
        });
        return {sel,rowEle,colEle};
    };


    setImageSize({parent,idValues,sel,rowEle,colEle}:{parent:HTMLElement,sel:selectorType,rowEle:rowType,colEle:colType,idValues:idValueType[]}){
        parent.style.position="relative";
        const getImgs=parent.querySelectorAll("img.isActive") as any as HTMLImageElement[];
        if(!getImgs) Misc.message({parent,msg:"no images are selected",type_:"error",time:600});
        const ids:{id:string,img:HTMLImageElement}[]=[];
        const popup=document.createElement("div");
        popup.id="setImage-size-popup";
        popup.style.cssText=`position:absolute;border-radius:5px;box-shadow:1px 1px 10px 1px #bdc5c9;display:flex;flex-direction:column;gap:0.6rem;height:auto;z-index:200;inset:0% 20% 0% 20%;justify-content:center;width:clamp(150px,175px,200px);`;
        popup.setAttribute("is-popup","true");
        popup.style.transform="translateY(-100%)";
        const form=document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.35rem;";
        form.id="image-size-popup-form";
        const {input,label,formGrp}=Nav.inputComponent(form);
        input.id="number-size";
        input.name="number";
        input.type="number";
        input.min="75";
        input.max="175";
        label.setAttribute("for",input.id);
        label.textContent="image size";
        input.placeholder="75";
        input.value="75";
        formGrp.className="d-flex flex-direction-column mx-auto";
        const {button}=Misc.simpleButton({anchor:form,bg:Nav.btnColor,color:"white",text:"save?",time:400,type:"button"});
        popup.appendChild(form);
        parent.appendChild(popup);
        button.disabled=true;
        input.onchange=(e:Event)=>{
            if(!e) return;
            button.disabled=false;
        
            [...getImgs].map(img=>{
                if(img){
                    ids.push({id:img.id,img});
                }
            });
        };
        input.oninput=(e:Event)=>{
            if(!e) return;
            const width=(e.currentTarget as HTMLInputElement).value;
            const size=`${width}px`;
            [...getImgs].map(img=>{
                if(img){
                    img.style.width=size;
                    img.style.aspectRatio="1 / 1";
                    img.style.height="auto";
                }
            });

        };
        button.onclick=(e:MouseEvent)=>{
            if(!e) return;
            const idValue:idValueType={eleId:parent.id,id:"cssStyle",attValue:"image size update"};
            this._modSelector.dataset.upDateIdValue({target:parent,idValues,idValue});
           
            ids.map(item=>{
                if(item){
                  colEle.elements=colEle.elements.map(ele=>{
                            if(ele.eleId===item.id){
                                ele.cssText=item.img.style.cssText;
                            }
                        return ele
                    });
                }
            });
            this.updateColumn({target:parent,sel,rowEle,colEle,idValues}).then(async(res)=>{
                if(res){
                    Misc.message({parent,msg:"updated",type_:"success",time:600});
                }
            });
            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
            setTimeout(()=>{
                parent.removeChild(popup);
            },395);


        };
    };


   
    backgroundRowColor({target,idValues,attr,name,sel,rowEle,colEle}:{
        target:HTMLElement,
        idValues:idValueType[],
        attr:string,
        name:string,
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
    }):void{
        
        const direction=window.innerWidth < 600 ? "column":"row" ;
        target.style.position="relative";
        target.style.zIndex="0";
        const eleId=target.id;
        //show drop-down on shade selection
        const popup=document.createElement("div");
        popup.style.cssText=`position:absolute;border-radius:5px;box-shadow:1px 1px 10px 1px #bdc5c9;display:flex;flex-direction:${direction};gap:0.6rem;width:175px;height:auto;z-index:200;inset:-50px 25% 115% 25%;justify-content:center;`;
        popup.setAttribute("is-popup","true");
        popup.id="bg-popup";
        popup.style.transform="none";
        const selectBlue=document.createElement("select");
        selectBlue.style.cssText="border-radius:7px;font-size:10px;";
        selectBlue.className="box-shadow";
        blueShades.forEach((shade,index)=>{
            const option=document.createElement("option");
            option.value=shade;
            if(index===0) option.textContent=shade;
            option.style.cssText=`font-size:9px;background-color:${shade};`;
            option.textContent=shade;
            selectBlue.appendChild(option);
        });
        popup.appendChild(selectBlue);
        //SHADE BLUE
        selectBlue.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                 target.style.backgroundColor=value as string
                 const idValue:idValueType={eleId,id:"bgColor",attValue:"updated"};
                 rowEle={...rowEle,cssText:target.style.cssText};
                 this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                    this.updateRow({target,sel,rowEle,colEle,idValues}).then(async(res)=>{
                        if(res){
                            // console.log("ROWELE STYLES",res.rowEle.cssText);//works
                            Misc.message({parent:target,msg:"updated",type_:"success",time:600});
                        }
                       });;
                    target.removeChild(popup);
                
                
            }
        });
        const select1=document.createElement("select");
        select1.style.cssText="border-radius:7px;font-size:10px;";
        select1.className="box-shadow";
        //GREY SHADES
        shades.forEach((shade)=>{
            const option=document.createElement("option");
            option.value=shade;
            option.style.cssText=`font-size:9px;background-color:${shade};`;
            option.textContent=shade;
            select1.appendChild(option);
        });
        popup.appendChild(select1);
        popup.animate([
            {transform:"translateY(100%)",opacity:"0.2"},
            {transform:"translateY(0%)",opacity:"1"},
        ],{duration:600,iterations:1});
        this.removePopup({parent:target,target:popup});
        target.appendChild(popup);
        select1.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value as string;
                target.style.backgroundColor=value;
                const idValue:idValueType={eleId,id:"bgColor",attValue:"updated"};
                rowEle={...rowEle,cssText:target.style.cssText};
                this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                this.updateRow({target,sel,rowEle,colEle,idValues}).then(async(res)=>{
                    if(res){
                        // console.log("ROWELE STYLES",res.rowEle.cssText);//works
                        Misc.message({parent:target,msg:"updated",type_:"success",time:600});
                    }
                   });
                   target.removeChild(popup);
               
                
            }
        });
    };


    backgroundEleColor({parent,idValues,sel,rowEle,colEle}:{
        parent:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
    }):void{
        parent.style.position="relative";
        parent.style.zIndex="0";
        //show drop-down on shade selection
        const popup=document.createElement("div");
        popup.style.cssText=`position:absolute;border-radius:5px;box-shadow:1px 1px 10px 1px #bdc5c9;display:flex;flex-direction:column;gap:0.6rem;width:250px;height:auto;z-index:200;inset:-70px 20% 115% 20%;justify-content:center;`;
        popup.setAttribute("is-popup","true");
        popup.id="bg-ele-color-popup";
        popup.className="popup";
        const selectBlue=document.createElement("select");
        selectBlue.style.cssText="border-radius:7px;font-size:10px;";
        selectBlue.className="box-shadow";
        popup.appendChild(selectBlue);
        blueShades.forEach((shade,index)=>{
            const option=document.createElement("option");
            option.value=shade;
            if(index===0) option.textContent=shade;
            option.style.cssText=`font-size:9px;background-color:${shade};`;
            option.textContent=shade;
            selectBlue.appendChild(option);
        });
        const getActiveEles=parent.querySelectorAll(".isActive") as any as HTMLElement[];
        if(getActiveEles){
            //FOUND ACTIVE ELEMENTS
            selectBlue.addEventListener("change",(e:Event)=>{
                if(e){
                    const value=(e.currentTarget as HTMLSelectElement).value;
                    [...getActiveEles].map(ele=>{
                      colEle.elements=colEle.elements.map(element=>{
                            if(ele.id===element.eleId){
                                ele.style.backgroundColor=value;
                                ele.style.borderRadius="12px";
                                element={...element,cssText:ele.style.cssText}
                                 this.updateElement({target:ele,colEle,rowEle,sel,idValues});
                            }
                            return element;
                        });

                    });
                    this.updateColumn({target:parent,sel,colEle,rowEle,idValues}).then(async(res)=>{
                        if(res){
                            Misc.message({parent,msg:"updated",type_:"success",time:600});
                        }
                    });
                   Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                   setTimeout(()=>{parent.removeChild(popup)},390);
                    
                }
            });
            const select1=document.createElement("select");
            select1.style.cssText="border-radius:7px;font-size:10px;";
            select1.className="box-shadow";
            shades.forEach((shade)=>{
                const option=document.createElement("option");
                option.value=shade;
                option.style.cssText=`font-size:9px;background-color:${shade};`;
                option.textContent=shade;
                select1.appendChild(option);
            });
            popup.appendChild(select1);
            popup.animate([
                {transform:"translateY(100%)",opacity:"0.2"},
                {transform:"translateY(0%)",opacity:"1"},
            ],{duration:600,iterations:1});
            this.removePopup({parent,target:popup});
            parent.appendChild(popup);
            select1.addEventListener("change",(e:Event)=>{
                if(e){
                    const value=(e.currentTarget as HTMLSelectElement).value as string;
                    [...getActiveEles].map(ele=>{
                        colEle.elements=colEle.elements.map(element=>{
                            if(ele.id===element.eleId){
                                ele.style.backgroundColor=value;
                                ele.style.borderRadius="12px";
                                element={...element,cssText:ele.style.cssText}
                                 this.updateElement({target:ele,colEle,rowEle,sel,idValues});
                            }
                            return element;
                        });

                    });
                    this.updateColumn({target:parent,sel,colEle,rowEle,idValues}).then(async(res)=>{
                        if(res){
                            Misc.message({parent,msg:"updated",type_:"success",time:600});
                        }
                    });
                   Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                   setTimeout(()=>{parent.removeChild(popup)},390);
                
                    
                }
            });
        }else{
            Misc.message({parent:parent,type_:"error",msg:"no elements active",time:800});
        }
    };


    setColor({column,sel,rowEle,colEle,idValues}:{
        column:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        colEle:colType,
        rowEle:rowType
    }):void{
        const popup=document.createElement("div");
        popup.style.cssText=`position:absolute;border-radius:5px;box-shadow:1px 1px 10px 1px #bdc5c9;display:flex;flex-direction:column;gap:0.6rem;width:175px;height:auto;z-index:200;inset:-50px 40% 115% 40%;justify-content:center;`;
        popup.setAttribute("is-popup","true");
        popup.id="bg-popup";
        popup.style.transform="none";
        const input=document.createElement("input");
        input.type="color";
        input.id="color";
        input.name="color";
        input.className="form-control";
        input.style.cssText="margin-inline:auto;"
        popup.appendChild(input);
        const {button}=Misc.simpleButton({anchor:popup,bg:Nav.btnColor,color:"white",text:"ok!",time:400,type:"button"});
        this.removePopup({parent:column,target:popup});
        column.appendChild(popup);
        input.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value;
                const getActives=column.querySelectorAll(".isActive");
                ([...getActives as any] as HTMLElement[]).map(ele=>{
                    ele.style.color=value;
                    ele.style.paddingInline="0.5rem";
                    ele.style.paddingBlock="0.25rem";
                    ele.style.borderRadius="6px";
                   colEle.elements=colEle.elements.map(element=>{
                        if(element.eleId===ele.id){
                            element={...element,cssText:ele.style.cssText}
                        }
                        return element;
                    });
                  
                });
                this.updateColumn({target:column,sel,rowEle,colEle,idValues});
            }
        });
        button.onclick=(e:MouseEvent)=>{
            if(!e) return;
            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
            setTimeout(()=>{column.removeChild(popup);},390);
        };
        
    };


    deleteItem(item:{parent:HTMLElement,target:HTMLElement}){
        const {parent,target}=item;
        target.style.zIndex="20";
        const css="position:absolute;transform:translate(-12px,-35px);background:inherit;font-size:16px;background:black;font-weight:bold;border-radius:50%;color:white;top:0%;right:0%;padding:5px;";
        const xIconDiv=document.createElement("div");
        xIconDiv.setAttribute("contenteditable","false");
        xIconDiv.setAttribute("is-icon","true");
        xIconDiv.className="xIconDiv";
        xIconDiv.id="xIconDiv";
        xIconDiv.style.cssText=`${css}`;
        const cssStyle={background:"inherit",fontSize:"13px",color:"white",borderRadius:"50%"};
        FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
        target.appendChild(xIconDiv);
        xIconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:target,scale:0,opacity:0,time:400});
                setTimeout(()=>{parent.removeChild(target)},390);
            }
        });
    };


    
    getElementCount(column:HTMLElement):number|undefined{
        const {isJSON,parsed}=Header.checkJson(column.getAttribute("flex"));
        if(!isJSON) return;
        const {selectorId,rowId,colId}= parsed as flexType;
        const selector=this.selectors.filter(sel=>(sel.eleId===selectorId))[0];
        if(!selector) return;
        const row=this.rows.filter(row=>(row.eleId===rowId))[0];
        if(!row) return;
        const col=row.cols.filter(col_=>(col_.eleId===colId))[0];
        if(!col) return 1;
        const len=col.elements ? col.elements.length : 1;
        return len
    };

    async updateRow({target,sel,rowEle,colEle,idValues}:{target:HTMLElement,idValues:idValueType[],sel:selectorType,rowEle:rowType,colEle:colType}):Promise<{target:HTMLElement,rowEle:rowType,idValues:idValueType[],sel:selectorType,colEle:colType}>{
            const eleId=target.id;
            rowEle={...rowEle,
                class:target.className,
                cssText:target.style.cssText,
                imgKey:rowEle.imgKey
            };
            
           this.rows=this.rows.map((row)=>{
                if(row.eleId===target.id){
                    row=rowEle;

                     //LOADING ATTRIBUTES INTO ELE: ATTR/TYPE/IMGKEY FROM TARGET

                     //REPOPULATING TARGET
                     const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({
                        target,
                        sel,
                        row:rowEle,
                        col:null,
                        ele:null,
                        level:"row",
                        loc:"flexbox",
                        idValues,
                        clean:false

                    });
                    idValues=retIdValues
                    //REPOPULATING TARGET
                }
                return row;
            });
            
            sel={...sel,rows:JSON.stringify(this.rows)};
            this.selectors=this.selectors.map(select=>{
                if(select.eleId===sel.eleId){
                    select=sel;
                };
                return select;
            });
            
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            return Promise.resolve({rowEle:rowEle as rowType,target,idValues,sel,colEle}) as Promise<{rowEle:rowType,target:HTMLElement,idValues:idValueType[],sel:selectorType,colEle:colType}>;
    };

    

    async updateColumn({target,sel,colEle,rowEle,idValues}:{
        target:HTMLElement,
        sel:selectorType,
        rowEle:rowType,
        colEle:colType,
        idValues:idValueType[]
    }){
        const eleId=target.id;
    
        rowEle.cols = rowEle.cols.map(col=>{
            if(col.eleId===colEle.eleId){
                col.inner_html=target.innerHTML;
                col.imgKey=colEle.imgKey ? colEle.imgKey : undefined;
                col.class=target.className;
                col.cssText=target.style.cssText;
                col.type=colEle.type ? colEle.type : undefined;
                col.type=colEle.attr ? colEle.attr : undefined;
                this._modSelector.datasetSincUpdate({target,ele:col,idValues,level:"col",loc:"flexbox"});

            };
            return col;
        });
        
        this.rows= this.rows.map(row=>{
            if(row.eleId===rowEle.eleId){
                row=rowEle;
            }
            return row;
        });

        sel={...sel,rows:JSON.stringify(this.rows)};

        this.selectors=this.selectors.map(select=>{
            if(select.eleId===sel.eleId){
                select=sel;
            }
            return select;
        });
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        return Promise.resolve({target, colEle,rowEle,sel,idValues}) as Promise<{target:HTMLElement,colEle:colType,rowEle:rowType,sel:selectorType,idValues:idValueType[]}>;
    };



    async elementAdder({target,sel,rowEle,colEle,idValues}:{
        target:HTMLElement | HTMLImageElement,
        sel:selectorType,
        rowEle:rowType,
        colEle:colType,
        idValues:idValueType[]

    }): Promise<{
        target: HTMLElement;
        ele: element_selType;
        idValues:idValueType[];
        col:colType
    }>{
        const eleId=target.id;
        const node=target.nodeName.toLowerCase();
        const type=target.getAttribute("data-element-type") as string |null;
        const parent= target.parentElement;
        const parent_id=parent ? parent.id : null;
        let ele:element_selType=this._element_sel;
        if(parent_id) idValues.push({eleId,id:"parent_id",attValue:parent_id});
        idValues.push({eleId,id:"elementId",attValue:eleId});
        idValues.push({eleId,id:"colId",attValue:colEle.eleId});
        const selRowCol={selectorId:sel.eleId,rowId:rowEle.eleId,colId:colEle.eleId};
        idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
        idValues.push({eleId,id:"name",attValue:node});
        const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
     
       
        const name=target.nodeName.toLowerCase();
        target.setAttribute("is-element","true");
        target.setAttribute("name",name);
        ele=this._modSelector.initElement_sel
        //ADDING ATTRIBUTES
        //ROW
      rowEle.cols=rowEle.cols.map((col)=>{
           
            if(col.eleId===colEle.eleId){
                const ID=col.elements ? col.elements.length:0;
                const check=col.elements.find(ele_=>(ele_.eleId===eleId));
                    if(node && !check){
                    
                       
                        ele={
                            ...ele,
                            id:ID ,
                            selectorId:sel.id,
                            name:node,
                            class:target.className.split(" ").filter(cl=>(cl !=="isActive")).join(" "),
                            eleId:target.id,
                            cssText:target.style.cssText,
                            inner_html:target.innerHTML,
                            attr:undefined,
                            col_id:col.id,
                            imgKey:undefined,
                            order:ID,
                            type:type,
                            
                        } as element_selType;

                        getEleIds.map(kat=>{
                            const hasAttr=attrEnumArr.includes(kat.id);
                            const hasType=typeEnumArr.includes(kat.id as typeEnumType);
                            if(kat.id==="imgKey"){
                                ele.imgKey=kat.attValue;
                            }else if(hasAttr){
                                ele.attr=kat.attValue;
                            }else if(hasType){
                                ele.attr=kat.id;
                            }
                        });
                        
                            if(node==="img"){
                            const target_=target as HTMLImageElement;
                            ele.img=target_.src;
                            ele.inner_html=target_.alt;
                        }
                        //LOADING ATTRIBUTES INTO ELEMENT, BELOW
                        idValues.push({eleId,id:"eleOrder",attValue:String(ID)});
                        
                        //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
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
                      
                       
                        //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                        
                     
                        col.elements.push(ele)
                        colEle=col;
                        
                    }
                    
            }
            
            return col;
        });
        //ROW
       this.rows=this.rows.map((row)=>{
            if(row.eleId===rowEle.eleId){
                row=rowEle;
            }
            return row;
        });
        //adding it to selector
       
        sel={...sel,rows:JSON.stringify(this.rows),footer:true,header:false};
        //adding it to selector
        this.selectors=this.selectors.map(select=>{
            if(select.eleId===sel.eleId){
                select=sel;
            }
            return select;
        });//saving it to LOCAL
        
        
        
        // console.log("DATASET FULL",ids_)
        return {target,ele:ele as element_selType,idValues,col:colEle};
    };



    async updateElement({target,sel,rowEle,colEle,idValues}:{
        target:HTMLElement|HTMLImageElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType

    }):Promise<{
        target:HTMLElement,
        ele:element_selType,
        idValues:idValueType[],
        colEle:colType,
        rowEle:rowType

    }>{
        
        const node=target.nodeName.toLowerCase();
        const parent=target.parentElement;
        const parent_id= parent ? parent.id:null;
        const eleId=target.id;
        if(parent_id) idValues.push({eleId,id:"parent_id",attValue:parent_id});
        const {cleaned:classList}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
        let retEle:element_selType={} as element_selType;

        colEle.elements=colEle.elements.map((ele)=>{
            if(ele.eleId===target.id){
                ele.cssText=target.style.cssText;
                ele.class=classList.join(" ");
                ele.inner_html=target.innerHTML;
                ele.imgKey=ele.imgKey ? ele.imgKey: undefined;
                if(node==="img"){
                    const img=target as HTMLImageElement;
                    if(ele.imgKey){
                        const idValue:idValueType={eleId,id:"imgKey",attValue:ele.imgKey}
                        this._modSelector.dataset.upDateIdValue({target:img,idValues,idValue});
                    }
                    ele.img=img.src;
                    ele.inner_html=img.alt;
                }
                if(ele.type){
                    const idValue2:idValueType={eleId,id:"type",attValue:ele.type};
                    this._modSelector.dataset.upDateIdValue({target:target,idValues,idValue:idValue2});
                }else if(ele.attr){
                    const idValue2:idValueType={eleId,id:"attr",attValue:ele.attr};
                    this._modSelector.dataset.upDateIdValue({target:target,idValues,idValue:idValue2});
                };
                //LOADING ATTRIBUTES INTO ELE: ATTR/TYPE/IMGKEY
                //REPOPULATING TARGET
                this._modSelector.datasetSincUpdate({target,ele:ele,idValues,level:"element",loc:"flexbox"});
                //RE-ASSIGNMENT
               
                retEle=ele
            };
            
            return ele;
        });

        rowEle.cols= rowEle.cols.map((col)=>{
            if(col.eleId===colEle.eleId){
                col=colEle;
            }
            return col;
        });
        this.rows=this.rows.map((row)=>{
            if(row.eleId===rowEle.eleId){
               row=rowEle;
            }
            return row;
        });
        //aDDING NEWrOWS TO SEL
        sel={...sel,rows:JSON.stringify(this.rows)};
        //aDDING NEWrOWS TO SEL
        //UPDATING SELECTORS
        this.selectors=this.selectors.map(select=>{
            if(select.eleId===sel.eleId){
                select=sel;
            }
            return select;
        });
        //UPDATING SELECTORS
        return Promise.resolve({target,ele:retEle,idValues,colEle,rowEle}) as Promise<{target:HTMLElement,ele:element_selType,idValues:idValueType[],colEle:colType,rowEle:rowType}>;
       
    };



     editElement({target,sel,rowEle,colEle,idValues}:{
        target:HTMLElement,
        idValues:idValueType[],
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
        
    }):{target:HTMLElement,ele:element_selType,idValues:idValueType[],colEle:colType,rowEle:rowType}{
      
        let retEle:element_selType={} as element_selType;
        target.oninput=(e:Event)=>{
            if(!e) return;
            
            colEle.elements=colEle.elements.map((ele)=>{
                if(ele.eleId===target.id){
                   ele.inner_html=target.innerHTML;
                    retEle=ele
                };
                
                return ele;
            });
            
            rowEle.cols= rowEle.cols.map((col)=>{
                if(col.eleId===colEle.eleId){
                    col=colEle;
                }
                return col;
            });
            this.rows=this.rows.map((row)=>{
                if(row.eleId===rowEle.eleId){
                   row=rowEle;
                }
                return row;
            });
            //aDDING NEWrOWS TO SEL
           
            sel={...sel,rows:JSON.stringify(this.rows)};
           
            //aDDING NEWrOWS TO SEL
            //UPDATING SELECTORS
            this.selectors=this.selectors.map(select=>{
                if(select.eleId===sel.eleId){
                    select=sel;
                }
                return select;
            });
           
            //UPDATING SELECTORS
            
        };

        return {target,ele:retEle,idValues,colEle,rowEle};
       
    };


    flexStyleAdjustments({target,idValues,name,sel,rowEle,colEle}:{
        target:HTMLElement,
        idValues:idValueType[],
        name:string,
        sel:selectorType,
        rowEle:rowType,
        colEle:colType
    }){
        //initialize
        for(const [key,value] of Object.entries(target.style)){
            if(key && value){
                if(key==="display"){
                    target.style[key]="block";
                }else if(key==="justifyContent"){
                    target.style[key]="";
                }else if(key==="alignItems"){
                    target.style[key]="";
                }else if(key==="flexWrap"){
                    target.style[key]="";
                }
            }
        }
        //initialize above
        switch(true){
            case name==="flex-col":
                target.style.display="flex";
                target.style.flexDirection="column";
                target.style.justifyContent="center";
                target.style.alignItems="center";
            break;
            case name==="flex-row":
                target.style.display="flex";
                target.style.flexDirection="row";
                target.style.justifyContent="flex-start";
                target.style.alignItems="flex-start";
            break;
            case name==="flex-center":
                target.style.display="flex";
                target.style.flexDirection="row";
                target.style.justifyContent="center";
                target.style.alignItems="center";
            return;
            case name==="flex-between":
                target.style.display="flex";
                target.style.flexDirection="row";
                target.style.justifyContent="space-between";
                target.style.alignItems="center";
            break;
            case name==="flex-remove":
                for(const [key,value] of Object.entries(target.style)){
                    if(key && value){
                        if(key==="display"){
                            target.style[key]="block";
                        }else if(key==="justifyContent"){
                            target.style[key]="";
                        }else if(key==="alignItems"){
                            target.style[key]="";
                        }
                    }
                }
            break;
            default:
                break
        };


        this.updateColumn({target,sel,rowEle,colEle,idValues}).then(async(res)=>{
            if(res){
                Misc.message({parent:target,msg:"updated",time:600,type_:"success"});
            }
        });
    };


    static divider(parent:HTMLElement):void{
        const div = document.createElement("div");
        div.style.cssText="display:flex;flex-direction:column;align-items:center;justify-content:center;";
        const line=document.createElement("div");
        line.style.cssText="margin-inline:auto;width:49%;height:4px;background:aquamarine;border-radius:30px;box-shadow:1px 1px 3px 1px black,-1px -1px 3px -1px black,";
        const line2=document.createElement("div");
        line.style.cssText="margin-inline:auto;width:80%;height:4px;background:aquamarine;border-radius:30px;box-shadow:1px 1px 3px 1px black,-1px -1px 3px -1px black,";
        div.appendChild(line);
        div.appendChild(line2);
        parent.appendChild(div);
    }
    static cleanUpByID(parent:HTMLElement,id:string){
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
    static modifyCss(target:HTMLElement,cssStyle:{[key:string]:string}):void{
        let index=0;
         for(const key of Object.keys(target.style)){
            index++;
            for(const [key1,value1] of Object.entries(cssStyle)){
                if(key===key1){
                    target.style[index]=value1;
                };
            }
         }
    }
}

export default Footer;
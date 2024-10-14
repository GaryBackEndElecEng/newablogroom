import {flexType,element_selType,colType,rowType,selectorType,elementChoiceType} from "./Types";
import ModSelector from "@/components/editor/modSelector";
import { separator } from "../blog/displayBlog";
import {FaCrosshairs, FaMailBulk, FaPhone, FaTrash,} from "react-icons/fa";
import {FaCreate} from "@/components/common/ReactIcons";
import { btnType, button, buttonReturn } from "../common/tsFunctions";
import Main,{ shades,blueShades } from "./main";
import Header from "./header";
import Misc from "../common/misc";
import Service from "../common/services";
import User from "../user/userMain";
import Nav from "../nav/headerNav";


class Footer{
    count=0;
    divCont_css:string;
    divCont_class:string;
    bgColor:string;
    btnColor:string;
    _selectors:selectorType[];
    _selector:selectorType;

   static elementChoices:elementChoiceType[]=[
        {id:0,name:"select",ele:null,isEle:false,attr:null},
        {id:1,name:"set height",ele:null,isEle:false,attr:"minHeight"},
        {id:1,name:"set row height",ele:null,isEle:false,attr:"minHeight"},
        {id:2,name:"copyright",ele:"div",isEle:true,attr:null},
        {id:3,name:"image",ele:"img",isEle:true,attr:null},
        {id:4,name:"bg-image",ele:"div",isEle:true,attr:null},
        {id:5,name:"set-image-height",ele:"null",isEle:false,attr:"set-image-height"},
        {id:6,name:"bg-row-image",ele:"div",isEle:true,attr:null},
        {id:7,name:"rm-bg-image",ele:null,isEle:false,attr:"rm-bg-image"},
        {id:8,name:"text",ele:"p",isEle:true,attr:null},
        {id:9,name:"small",ele:"small",isEle:true,attr:null},
        {id:10,name:"insert-email",ele:"insert-email",isEle:true,attr:null},
        {id:11,name:"insert-tel",ele:"insert-tel",isEle:true,attr:null},
        {id:11,name:"insert-link",ele:"insert-link",isEle:true,attr:null},
        {id:12,name:"quote",ele:"blockquote",isEle:true,attr:null},
        {id:13,name:"image rounded",ele:null,isEle:false,attr:"imgRound"},
        {id:14,name:"flex-col",ele:null,isEle:false,attr:"flexCol"},
        {id:15,name:"flex-row",ele:null,isEle:false,attr:"flexRow"},
        {id:16,name:"flex-between",ele:null,isEle:false,attr:"flex-between"},
        {id:17,name:"flex-center",ele:null,isEle:false,attr:"flex-center"},
        {id:18,name:"flex-remove",ele:null,isEle:false,attr:"flex-remove"},
        {id:19,name:"bg-row-color",ele:null,isEle:false,attr:"bgColor"},
        {id:19,name:"bg-ele-color",ele:null,isEle:false,attr:"bgEleColor"},
        {id:20,name:"box-shadow",ele:null,isEle:false,attr:"box-shadow"},
        {id:21,name:"font-color",ele:null,isEle:false,attr:"font-color"},
        {id:22,name:"text-center",ele:null,isEle:false,attr:"text-center"},

    ]
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this._selectors=this._modSelector._selectors;
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
            rows:[],
            blog_id:0,
            headerType:undefined,
            header:false,
            footer:true
        };
    };
    //SETTER GETTERS
    get selectors(){
        this._selectors=this._modSelector._selectors;
        return this._selectors
    }
    set selectors(selectors:selectorType[]){
        this._modSelector._selectors=selectors;
        this._selectors=selectors;
    }
    get placement(){
        return this._modSelector.placement;
    }
    set placement(placement:number){
        this._modSelector.placement=placement;
    }
    //SETTER GETTERS
    //INJECTION FROM LOCALSTORAGE
    async showSelector(parent_:HTMLElement,selector:selectorType){
        const parent=parent_ ? parent_:Main._mainFooter as HTMLElement;
        let flex:flexType={} as flexType;
        // console.log("Header selector",selector)//works
        if(selector && selector.name){
            const innerCont=document.createElement(selector.name);
            innerCont.id=selector.eleId;
            innerCont.className=selector.class;
            innerCont.setAttribute("name",selector.name);
            innerCont.setAttribute("data-selector-id",`${selector.id}`);
            innerCont.setAttribute("data-container-id",`${innerCont.id}`);
            innerCont.setAttribute("data-selector-id",selector.eleId);
            innerCont.setAttribute("data-placement",`${selector.placement}`);
            innerCont.style.cssText=selector.cssText;
            flex={...flex,selectorId:selector.eleId,placement:selector.placement}
                await Promise.all(selector.rows.sort((a,b)=>{if(a.order < b.order) return -1 ; return 1}).map(async(row_)=>{
                    const row=document.createElement("div");
                    row.className=row_.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
                    row.style.cssText=row_.cssText;
                    row.setAttribute("name",row_.name);
                    row.setAttribute("rowID",`${row_.id}`);
                    row.setAttribute("order",String(row_.order));
                    row.setAttribute("is-row","true");
                    row.setAttribute("aria-selected","true");
                    row.id=row_.eleId;
                    flex={...flex,rowId:row_.eleId,order:row_.order};
                    if(row_.imgKey){
                        flex={...flex,imgKey:row_.imgKey,backgroundImage:true}
                        row.setAttribute("data-backgroundimage","true");
                        const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                        await this._service.injectBgAwsImage({target:row,imgKey:row_.imgKey,cssStyle});
                    }
                    row.setAttribute("flex",JSON.stringify(flex));
                    await Promise.all(row_.cols && row_.cols.sort((a,b)=>{if(a.order < b.order) return -1 ; return 1}).map(async(col_)=>{
                        this.generateColumn({row,col_,flex}).then(async(res)=>{
                            if(res){
                                const {parsed}=Header.checkJson(res.col.getAttribute("flex"));
                                flex={...parsed as flexType};
                                row.appendChild(res.col);
                                this.selectElements({column:res.col});//Selection ELEMENTS
                                res.col.addEventListener("click",(e:MouseEvent)=>{
                                    if(e){
                                        res.col.classList.add("coliIsActive");
                                        this._modSelector.updateColumn(res.col,flex);
                                        // if(selector.footer){
                                            //new elements and attr(s)
                                        // }
                                    }
                                });
                                await Promise.all(col_.elements && col_.elements.sort((a,b)=>{if(a.order < b.order) return -1 ; return 1}).map(async(element)=>{
                                   await this.generateElement({col:res.col,element,flex}).then(async(res)=>{
                                        if(res){
                                            res.ele.onclick=(e:MouseEvent)=>{
                                                if(e){
                                                    res.divCont.classList.toggle("isActive");
                                                    res.ele.classList.toggle("isActive");
                                                    Main.toggleActiveIcon(res.ele);
                                                    this._modSelector.updateElement(res.ele);
                                                   
                                                }
                                            };
                                        }
                                    });
        
                                }));
                            }
                        });
                    }));
                    innerCont.appendChild(row);
                    //remove selector
                    this.removeFooter(parent_,innerCont);
                    //remove selector
                }));
            // this._modSelector.removeHeader(parent,innerCont);
            parent.appendChild(innerCont);
            innerCont.onclick=(e:MouseEvent)=>{
                if(e){
                    innerCont.classList.toggle("isActive");
                    this.removeFooter(parent,innerCont);
                }
            };
        }
    };
    //GENERATE COLUMN
    async generateColumn(item:{row:HTMLElement,col_:colType,flex:flexType}): Promise<{col:HTMLDivElement}>{
        const {row,col_,flex}=item;
        let _flex=flex;
        _flex={...flex,name:"div",colId:col_.eleId,order:col_.order,imgKey:col_.imgKey,position:"col"};
        const col=document.createElement("div");
        col.id=col_.eleId;
        col.setAttribute("colID",`${col_.id}`);
        col.setAttribute("order",String(col_.order));
        col.setAttribute("is-column","true");
        col.setAttribute("aria-selected","true");
        col.setAttribute("name",col.nodeName.toLowerCase());
        col.style.cssText=col_.cssText;
        col.className=col_.class;
        col.setAttribute("flex",JSON.stringify(_flex));
        if(col_.imgKey){
            row.setAttribute("data-backgroundimage","true");
            const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
           await this._service.injectBgAwsImage({target:col,imgKey:col_.imgKey,cssStyle});
        }
        return {col};
    }
    //GENERATE ELEMENT
   
    async generateElement(item:{col:HTMLElement,element:element_selType,flex:flexType}): Promise<{
        ele: HTMLElement;
        divCont: HTMLDivElement;
    } | undefined>{
        const {col,element,flex}=item;
        const checkArr=["img","ul","blockquote","a","span","logo","image","ol"].includes(element.name);
        const divCont=document.createElement("div");
        divCont.className="eleContainer";
        divCont.style.cssText="margin:0;padding:10px;margin-left:0.5rem;";
        divCont.setAttribute("data-placement",`${element.order}`);
        const _flex={...flex,elementId:element.eleId,order:element.order,name:element.name,imgKey:element.imgKey,attr:element.attr,position:"element"};
        // console.log("generateElements: => element:",element,"flex",_flex)
        if(!checkArr){
            const ele:HTMLElement=document.createElement(element.name);
            ele.setAttribute("is-element","true");
            ele.setAttribute("contenteditable","true");
            ele.setAttribute("aria-selected","true");
            ele.setAttribute("data-placement",`${element.order}`);
            ele.setAttribute("order",String(element.order));
            ele.setAttribute("name",element.name);
            ele.className=element.class;
            ele.setAttribute("name",element.name);
            ele.id=element.eleId
            ele.setAttribute("flex",JSON.stringify(_flex));
            ele.style.cssText=element.cssText;
            ele.innerHTML=element.inner_html;
            divCont.appendChild(ele);
            col.appendChild(divCont);
            Main.toggleActiveIcon(ele);
            this.removeMainElement(col,divCont,ele);
            ele.addEventListener("click",(e:MouseEvent) =>{
                if(e){
                    this._modSelector.updateElement(ele);
                }
            });
            this._modSelector.editElement(ele);
            return {ele,divCont};
            
        }else if(element.name==="ul"){
            const ele=document.createElement("ul");
            ele.setAttribute("is-element","true");
            ele.setAttribute("contenteditable","true");
            ele.setAttribute("aria-selected","true");
            ele.setAttribute("data-placement",`${element.order}`);
            ele.setAttribute("order",String(element.order));
            ele.setAttribute("name",element.name);
            ele.className=element.class;
            ele.classList.remove("isActive");
            ele.style.cssText=element.cssText;
            ele.innerHTML=element.inner_html;
            ele.id=element.eleId
            ele.setAttribute("name",element.name);
            ele.setAttribute("flex",JSON.stringify(_flex));
            divCont.appendChild(ele);
            col.appendChild(divCont);
            Main.toggleActiveIcon(ele);
            this.removeMainElement(col,divCont,ele);
            ele.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    this._modSelector.updateElement(ele);
                }
            });
            this._modSelector.editElement(ele);
            return {ele,divCont};
        }else if(element.name==="blockquote"){
            const ele=document.createElement("blockquote");
            ele.setAttribute("is-element","true");
            ele.setAttribute("contenteditable","true");
            ele.setAttribute("aria-selected","true");
            ele.setAttribute("data-placement",`${element.order}`);
            ele.setAttribute("order",String(element.order));
            ele.className=element.class;
            ele.classList.remove("isActive");
            ele.style.cssText=element.cssText;
            ele.innerHTML=`"${element.inner_html}"`;
            ele.setAttribute("name",element.name);
            ele.id=element.eleId
            ele.setAttribute("name",element.name);
            divCont.appendChild(ele);
            col.appendChild(divCont);
            Main.toggleActiveIcon(ele);
            ele.setAttribute("flex",JSON.stringify(_flex));
            this.removeMainElement(col,divCont,ele);
            ele.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    this._modSelector.updateElement(ele);
                }
            });
            this._modSelector.editElement(ele);
            return {ele,divCont};
        }else if(element.name==="a"){
            const link=element.attr as string;
            const ele=document.createElement("a");
            
            if(link.startsWith("mail")){
                ele.setAttribute("data-href-email",link);
                ele.href=link;
            }else if(link.startsWith("tel")){
                ele.setAttribute("data-href-tel",link);
                ele.href=link
            }else{

                ele.href="#";
                ele.onclick=()=>{return window.open(link,"_blank")};
            }
            ele.setAttribute("is-element","true");
            ele.setAttribute("contenteditable","true");
            ele.setAttribute("aria-selected","true");
            ele.setAttribute("data-placement",`${element.order}`);
            ele.setAttribute("order",String(element.order));
            ele.className=element.class;
            ele.setAttribute("name",element.name);
            ele.id=element.eleId
            ele.setAttribute("name",element.name);
            ele.setAttribute("flex",JSON.stringify(_flex));
            ele.style.cssText=element.cssText;
            ele.innerHTML=element.inner_html;
            Main.toggleActiveIcon(ele);
            divCont.appendChild(ele);
            col.appendChild(divCont);
            this.removeMainElement(col,divCont,ele);
            divCont.onclick=(e:MouseEvent)=>{
                if(e){
                    this._modSelector.updateElement(ele);
                }
            };
            return {ele,divCont};
        }else if(element.name==="logo"){
            const ele=document.createElement("img");
            ele.setAttribute("is-element","true");
            ele.setAttribute("contenteditable","true");
            ele.setAttribute("aria-selected","true");
            ele.setAttribute("data-placement",`${element.order}`);
            ele.setAttribute("order",String(element.order));
            ele.setAttribute("name",element.name);
            ele.className=element.class;
            ele.src=element.img as string;
            ele.id=element.eleId as string;
            ele.setAttribute("name",element.name);
            ele.style.cssText=element.cssText;
            ele.alt=element.inner_html;
            if(element.imgKey){
                this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                    if(res){
                        ele.src=res.img as string
                    }
                });
            }
            ele.setAttribute("flex",JSON.stringify(_flex));
            divCont.appendChild(ele);
            col.appendChild(divCont);
            Main.toggleActiveIcon(ele);
            this._user.refreshImageShow(divCont,ele,null,flex);
            this.removeMainElement(col,divCont,ele);
            ele.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    this._modSelector.updateElement(ele);
                }
            });
            return {ele,divCont};
        }else if(element.name==="image"){
            // const link=element.attr as string;
            const ele=document.createElement("img") as HTMLImageElement;
            ele.setAttribute("is-element","true");
            ele.setAttribute("contenteditable","true");
            ele.setAttribute("aria-selected","true");
            ele.setAttribute("order",String(element.order));
            ele.setAttribute("data-placement",`${element.order}`);
            ele.setAttribute("name",element.name);
            ele.className=element.class;
            ele.src=element.img ? element.img : "";
            ele.id=element.eleId as string;
            ele.setAttribute("name",element.name);
            ele.style.cssText=element.cssText;
            ele.alt=element.inner_html;
            if(element.imgKey){
               await this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                    if(res){
                        ele.src=res.img as string;
                        ele.alt=`${res.Key.split("/")[1].split("-")[1]}`;
                    }
                });
            }
            ele.setAttribute("flex",JSON.stringify(_flex));
            divCont.appendChild(ele);
            col.appendChild(divCont);
            this._user.refreshImageShow(divCont,ele,null,flex);
            this.removeMainElement(col,divCont,ele);
            ele.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    
                    this._modSelector.updateElement(ele);
                }
            });
            return {ele,divCont};
        }else if(element.name==="img" ){
            const ele:HTMLImageElement=document.createElement("img");
            ele.setAttribute("is-element","true");
            ele.setAttribute("contenteditable","true");
            ele.setAttribute("aria-selected","true");
            ele.setAttribute("order",String(element.order));
            ele.setAttribute("name",element.name);
            ele.className=element.class;
            this._user.refreshImageShow(divCont,ele,null,flex);
            ele.id=element.eleId as string;
            ele.style.cssText=element.cssText;
            ele.src=element.img as string;
            ele.alt=element.inner_html as string;
            if(element.imgKey){
               await this._service.getSimpleImg(element.imgKey).then(async(res)=>{
                    if(res){
                        ele.src=res.img as string;
                        ele.alt=`${res.Key.split("/")[1].split("-")[1]}`;
                    }
                });
            }
            ele.setAttribute("flex",JSON.stringify(_flex));
            divCont.appendChild(ele);
            col.appendChild(divCont);
            this.removeMainElement(col,divCont,ele);
           
            return {ele,divCont};
        }
    }
    //INJECTION target=>sidebar
    main(target:HTMLElement){
        this.selectors=this._modSelector.selectors;
        const popup=document.createElement("section");
        popup.style.cssText="position:absolute;inset:65% 0%;backdrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center; justify-content:center;gap:1rem;z-index:2000;width:100%;";
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
                this._selector={...this._selector,footer:true,rowNum:rows,colNum:columns,colAttr:[{id:0,selector_id:0,T:rows-1,B:columns}]};
                
                this.createFooter(target,this._selector);
                Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                setTimeout(()=>{
                    target.removeChild(popup);
                },380);
            }
        });
    }

     //PARENT:main() : this is the created footer within main
    createFooter(parent:HTMLElement,select:selectorType){
        // const 
        const check=this.selectors.find(select=>(select.footer===true))? true:false;
        if(!check){
            let flex:flexType={} as flexType;
            const selectID=`footer-${Math.round(Math.random()*1000)}`;
            const main=document.createElement("footer");
            main.setAttribute("name","footer");
            main.style.cssText="position:relative;width:100%; margin-inline:0px;padding:0px;margin-top:2.5rem;margin-bottom:0;";
            main.id=selectID;
            main.className="footerContainer";
            main.setAttribute("data-placement",`${this.placement}`);
            this.promSelectorAdder({target:main,selector:select}).then(async(res)=>{
                if(res && res.select && res.reTarget){

                    Array.from(Array(select.rowNum).keys()).map((num)=>{
                        const row=document.createElement("div");
                        row.className=`row my-0 mx-0`;
                        row.style.cssText=`padding-inline:10px;width:100%;margin-inline:0px;border-radius:10px;background:#F0F8FF; `;
                        row.style.minHeight="5vh";
                        flex={... flex,selectorId:selectID,order:num};
                        flex=Main.flexRowTracker(row,flex);
                        this.promRowAdder({row,selectorId:main.id}).then(async(res)=>{
                            if(res){

                                Array.from(Array(select.colNum).keys()).map((num)=>{
                                    const col=document.createElement("div");
                                    
                                    const colMd=`col-md-${12/select.colNum}`;
                                    col.className=`${colMd} mx-auto`;
                                    col.style.cssText="display:flex;justify-content:space-between;align-items:center;"
                                    col.setAttribute("name","div");
                                    col.setAttribute("is-col","true");
                                    col.style.cssText=`flex:0 0 auto;height:inherit;display:flex;justify-content:center;gap:0;flex-wrap:wrap;border-radius:inherit;`;
                                    flex={...flex,order:num};
                                    col.setAttribute("is-column","true");
                                    Main.flexColTracker(col,flex);
                                    this.promColAdder({target:col}).then(async(res)=>{
                                        if(res && res.column){
                                            row.appendChild(res.column);
                                            this.selectElements({column:col});
                                            res.column.addEventListener("click",(e:MouseEvent)=>{
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
                    this.removeFooter(parent,main);
                }
            };
        }
        
    }
    //----------DROP-DOWN ATTRIBUTES FOR ELEMENT && ATT(S) SELECTION------////
    selectElements(item:{column: HTMLElement}){
       const {column}=item;
       // const check=([...column.classList as any] as string[]).includes("coliIsActive");
       const {parsed}=Header.checkJson(column.getAttribute("flex"));
      
           Footer.cleanUpByID(column,"footer-popup-select-elements");
           const flex= parsed as flexType;
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
                   this.create_element(column,ele,name,isEle,attr,flex);
                   column.classList.remove("coliIsActive");
                   const getpopups=column.querySelectorAll("div#footer-popup");
                   ([...getpopups as any] as HTMLElement[]).map(ele=>{
                       if(ele){
                           column.removeChild(ele);
                       }
                   });
               }
           });
      
   }
    //----------DROP-DOWN ATTRIBUTES FOR ELEMENT && ATT(S) SELECTION------////
    promRowAdder(item:{row:HTMLElement,selectorId:string}){
        const {row,selectorId}=item;
        return new Promise(resolver=>{
            resolver( this._modSelector.rowAdder(row,selectorId))
        }) as Promise<rowType | undefined>;
    }
    
    create_element(column:HTMLElement,eleName:string|null,name:string,isEle:boolean,attr:string | null,flex:flexType):void{
        const divCont=document.createElement("div");
        divCont.className="eleContainer";
        divCont.style.cssText="margin:0;padding:0.25rem;";
        const order:number= this.getElementCount(column) ? this.getElementCount(column) as number: 1;
        flex={...flex,order:order};
        const rand=Math.round(Math.random()*1000);
   
        if(isEle){
            switch(true){
                case name==="copyright":
                    if(!eleName) return;
                    const name_=`${name}-${rand}`;
                    const date=new Date().getFullYear();
                    const copyright=document.createElement(eleName);
                    Main.flexTracker(copyright,flex); //appends flex attribute and ID
                    copyright.className="footer-ele";
                    copyright.style.cssText="position:absolute;inset:100% 0% 0% 0%;transform:translate(10px,-12px);font-family:'Roboto' sans serif;margin-top:1rem;font-size:9px;";
                    copyright.innerHTML=`<small>&copy; ${date}</small>`;
                    divCont.appendChild(copyright);
                    column.appendChild(divCont);
                    flex={...flex,name:name_};
                    const {ele}=this.elementAdder(copyright) as {target:HTMLElement,ele:element_selType};
                    copyright.setAttribute("data-placement",`${ele.order}`);
                    copyright.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            copyright.classList.toggle("isActive");
                            this.removeMainElement(column,divCont,copyright);
                        }
                    });
                    
                return;
                case name==="image" && isEle:
                    this.insertImage(column,flex);
                return;
                case name==="bg-image" && isEle:
                    flex={...flex,position:"col"};
                    column.style.position="relative";
                    this.insertBgImage(column,flex);
                return;
                case name==="rm-bg-image" && isEle:
                    column.style.position="relative";
                    flex={...flex,position:"col"}
                    this._modSelector.updateColumn(column,flex);
                return;
                case name==="bg-row-image":
                    const row=column.parentElement as HTMLElement
                    const {parsed}=Header.checkJson(row.getAttribute("flex"));
                    let flex_={...parsed as flexType};
                    flex_={...flex_,position:"row"};
                    row.setAttribute("flex",JSON.stringify(flex_));
                    this.bgRowImage({row});
                return;
                case name==="insert-email" && isEle:
                    this.getEmail(column);
                return;
                case name==="insert-tel" && isEle:
                    this.insertTel(column);
                return;
                case name==="insert-link" :
                   this.insertLink(column);
                return;
                case name==="small":
                    if(!eleName) return;
                    const small=document.createElement("small");
                    small.className="footer-ele";
                    Main.flexTracker(small,flex); //appends flex attribute and ID
                    small.setAttribute("contenteditable","true");
                    small.style.cssText="font-size:10px;margin-inline:5px;";
                    small.textContent=`${name}-edit`;
                    divCont.appendChild(small);
                    column.appendChild(divCont);
                    const {ele:ele1}=this.elementAdder(small) as {target:HTMLElement,ele:element_selType};
                    divCont.setAttribute("data-placement",`${ele1.order}-A`);
                    this.removeMainElement(column,divCont,small);
                    small.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            small.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                        }
                    });
                    this.editElement(small);
                    

                return;
                case name==="text":
                    if(!eleName) return;
                    const para=document.createElement(eleName);
                    Main.flexTracker(para,flex); //appends flex attribute and ID
                    para.className="footer-ele";
                    para.setAttribute("contenteditable","true");
                    para.style.cssText="margin-inline:16px;";
                    para.textContent=`${name}-edit`;
                    divCont.appendChild(para);
                    column.appendChild(divCont);
                    const {ele:ele2}=this.elementAdder(para) as {target:HTMLElement,ele:element_selType};
                    divCont.setAttribute("data-placement",`${ele2.order}`);
                    this.removeMainElement(column,divCont,para);
                    para.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            para.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                        }
                    });
                    this._modSelector.editElement(para);
                    
                return;
                case name==="quote":
                    if(!eleName) return;
                    const quote=document.createElement(eleName);
                    quote.className="footer-ele";
                    quote.style.cssText="font-family:'Roboto', sans serif; font-weight:bold;margin-left:1.5rem;margin-inline:0px;margin-left:8px;";
                    quote.setAttribute("contenteditable","true");
                   Main.flexTracker(quote,flex); //appends flex attribute and ID
                    quote.innerHTML=`<span>&quot;<span>${name}-edit</span> "</span>`;
                    divCont.appendChild(quote);
                    column.appendChild(divCont);
                    const {ele:ele3}=this.elementAdder(quote) as {target:HTMLElement,ele:element_selType};
                    divCont.setAttribute("data-placement",`${ele3.order}`);
                    this._modSelector.editElement(quote);
                    quote.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            quote.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            this.removeMainElement(column,divCont,quote);
                        }
                    });
                    this._modSelector.editElement(quote);
                    
                return;
                default:
                    return;
            }
        }
        if(attr){

            switch(true){
                case name==="font-color":
                    this.setColor(column);
                break;
                case name==="text-center":
                    column.classList.toggle("text-center");
                    this._modSelector.updateColumn(column,flex);
                break;
                case name==="set height":
                    this.setHeight(column);
                break;
                case name==="set row height":
                    this.setRowHeight(column);
                break;
                case name==="rm-bg-image":
                    this.removeBgImage(column);
                break;
                case name==="set-image-height":
                    this.setImageHeight({column:column});
                break;
                default:
                    return this.setColAttributes(column,name,attr,flex);
            }
        }

    }
    setHeight(column:HTMLElement){
        column.style.position="relative";
        const {isJSON,parsed}=Header.checkJson(column.getAttribute("flex"));
        if(!isJSON) return;
        Header.cleanUpByID(column,"popup-set-column-height");
        //create popup
        const popup=document.createElement("div");
        popup.id="popup-set-column-height";
        popup.setAttribute("is-popup","true");
        popup.style.cssText="position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.75rem;background:white; border-radius:10px;box-shadow:1px 1px 10px 1px black,-2px -2px 12px 1px blue;";
        popup.style.inset="-75px 20% 0px 20%";
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
        column.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:420,cssStyle:{inset:"-120px 5% 20px 5%"}});
        input.oninput=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value;
                btn.disabled=false;
                const cssStyle={minHeight:`${value}px`};
                Footer.modifyCss(column,cssStyle);
            }
        };
        btn.onclick=(e:MouseEvent)=>{
            if(e){
                const flex=parsed as flexType;
                this._modSelector.updateColumn(column,flex);
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    column.removeChild(popup);
                },398);
            }
        };
    }
    setRowHeight(column:HTMLElement){
        column.style.position="relative";
        const row=column.parentElement as HTMLElement;
        const {isJSON,parsed}=Header.checkJson(column.getAttribute("flex"));
        if(!isJSON) return;
        //create popup
        const popup=document.createElement("div");
        popup.id="popup-set-height";
        popup.setAttribute("is-popup","true");
        popup.style.cssText="position:absolute;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0.75rem;background:white; border-radius:10px;box-shadow:1px 1px 10px 1px black,-2px -2px 12px 1px blue;";
        popup.style.inset="-75px 20% 0px 20%";
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
        column.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:420,cssStyle:{inset:"-120px 5% 20px 5%"}});
        input.oninput=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value;
                btn.disabled=false;
                const cssStyle={minHeight:`${value}px`};
                Footer.modifyCss(row,cssStyle);
            }
        };
        btn.onclick=(e:MouseEvent)=>{
            if(e){
                const value=(input as HTMLInputElement).value as string;
                ([...row.children as any] as HTMLElement[]).map(col=>{
                    if(col){
                        col.style.height=`${value}px`;
                        const {parsed}=Header.checkJson(col.getAttribute("flex"));
                        const flex_=parsed as flexType;
                        this._modSelector.updateColumn(col,flex_);
                    }
                });
                const flex=parsed as flexType;
                this._modSelector.updateRow(row,flex);
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    column.removeChild(popup);
                },398);
            }
        };
    }
    removeBgImage(column:HTMLElement){
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
                this._service.adminImagemark(imgKey as string).then(async(res)=>{
                    if(res){
                        Misc.message({parent:column,msg:`${imgKey} is removed`,type_:"success",time:700});
                        const flex_={...flex,imgKey:undefined,backgroundImage:undefined};
                        this._modSelector.updateColumn(column,flex_);
                    }
                });
            
        }
    };
    bgRowImage(item:{row:HTMLElement}){
        const {row}=item;
        row.style.position="relative";
        const css="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;"
        const popup=document.createElement("div");
        popup.id="popup-setImageHeight";
        popup.style.cssText="position:absolute;background-color:white;border-radius:12px;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;";
        popup.style.top="-130%";
        popup.style.left="30%";
        popup.style.right="30%";
        popup.style.width="300px";
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
        row.appendChild(popup);
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file");
                if(file && file as File){
                    const imgUrl=URL.createObjectURL(file as File);
                    row.style.backgroundImage=`url(${imgUrl})`;
                    row.style.backgroundSize=`100% 200%`;
                    row.style.backgroundPosition=`50% 50%`;
                    Misc.blurIn({anchor:row,blur:"20px",time:600});
                    const blog=this._modSelector.blog;
                    this._user.askSendToServer(row,formdata,null,blog);
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        row.removeChild(popup);
                    },390);
                }
            }
        };
        this.deleteItem({parent:row,target:popup});


    }
    insertImage(column:HTMLElement,flex:flexType):void{
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
        form.addEventListener("submit",(e:SubmitEvent) =>{
            if(e){
                e.preventDefault();
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file_=formdata.get("file") as File;
                if(file_){
                    const urlImg=URL.createObjectURL(file_);
                    const image=document.createElement("img");
                    image.className="footer-ele";
                    image.src=urlImg;
                    image.style.cssText=`border-radius:16px;drop-shadow(0 0 0.75rem ${this.btnColor});width:85px;height:85px;position:relative;left:0px;transform:translateX(6px)`;
                    image.alt=`www.ablogroom.com`;
                    const flexImg=Main.flexTracker(image,flex);
                    const divCont=document.createElement("div");
                    divCont.className="eleContainer";
                    divCont.style.cssText="padding:1rem;margin:0;margin-left:0.25rem;";
                    divCont.appendChild(image);
                    column.appendChild(divCont);
                    this._modSelector.promElementAdder(image).then(async(res)=>{
                        if(res){
                            const ele=res.ele as element_selType;
                            divCont.setAttribute("data-placement",`${ele.order}-A`)

                            column.removeChild(popup);
                            const blog={...this._modSelector.blog};
                            const flex_={...flexImg,position:"ele",};
                            image.setAttribute("flex",JSON.stringify(flex_));
                                //SIGNED IN
                            column.style.position="relative";
                            this._user.askSendToServer(column,formdata,image,blog);
                        }
                    });

                    image.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            image.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            this.removeMainElement(column,divCont,image);
                        }
                    });
                }
            }
        });
    }
    insertBgImage(column:HTMLElement,flex:flexType){
        column.style.position="relative";
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
        column.appendChild(popup);
        // this.removeItem(column,popup);
        form.addEventListener("submit",(e:SubmitEvent) =>{
            if(e){
                e.preventDefault();
                const blog=this._modSelector.blog;
                const formdata= new FormData(e.currentTarget as HTMLFormElement);
                const file=formdata.get("file") as File;
                if(file){
                    this._service.generateImgKey(formdata,blog) as {Key:string};
                    const urlImg=URL.createObjectURL(file as File);
                    column.setAttribute("data-backgroundimage","true");
                    column.style.backgroundImage=`url(${urlImg})`;
                    column.style.backgroundSize=`100% 100%`;
                    column.style.backgroundPosition=`50% 50%`;
                    flex={...flex,backgroundImage:true,position:"col"};
                    this._modSelector.promUpdateColumn(column,flex).then(async(col_)=>{
                        if(!col_){
                            Misc.message({parent:column,msg:"not updated",type_:"error",time:700});
                        }
                    });
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        column.removeChild(popup);
                        Misc.blurIn({anchor:column,blur:"20px",time:600});
                    },398);
                    this._user.askSendToServer(column,formdata,null,blog);
                }
            }
        });
    }
    //HEADERS USE THEIR OWN ADDER SEPARATE FROM MODSELECTOR
    async promSelectorAdder(item:{target:HTMLElement,selector:selectorType}){
        const {target,selector}=item;
        return new Promise(resolver=>{
            resolver(this.selectorAdder(target,selector))
        }) as Promise<{reTarget:HTMLElement,select:selectorType}>;
    }
    setImageHeight(item:{column:HTMLElement}){
        const {column}=item;
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
                    console.log([...getImage.style.cssText.split(";") as any] as string[])//has change height
                    console.log("element",getImage)//DOES NOT HAVE COL.ELEiD in flex
                    this._modSelector.updateElement(getImage);
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        column.removeChild(popup);
                    },390);
                }
            };
        }


    }
    selectorAdder(target:HTMLElement,selector:selectorType):{reTarget:HTMLElement,select:selectorType}{

        const newSelect:selectorType={
            ...selector as selectorType,
            id:this._modSelector.placement,
            name:target.nodeName.toLowerCase(),
            eleId:target.id,
            class:target.className,
            cssText:target.style.cssText,
            rows:[] as rowType[],
            header:false,
            footer:true,
            placement:this._modSelector.placement,
        } as selectorType;
        this._modSelector.count=this._modSelector.count+1;
        this._modSelector._selectors.push(newSelect);
        this._modSelector.selectors=this._modSelector._selectors;
        this._modSelector.footerPlacement();
        this._modSelector.placement=this._modSelector.placement + 1;
            this._modSelector.footer=newSelect;
       
        //addAttributes
        target.setAttribute("is-selector","true");
        return {reTarget:target,select:newSelect}
    }
    removeFooter(parent:HTMLElement,target:HTMLElement){
        const check=([...target.classList as any] as string[]).includes("isActive");
        if(check){
            Footer.cleanUpByID(parent,"delete-footer-selector-remove-footer");
            target.style.position="relative";
            const cssStyle={color:"white",fontSize:"12px"}
            const xIconDiv=document.createElement("div");
            xIconDiv.id="delete-footer-selector-remove-footer";
            xIconDiv.setAttribute("is-icon","true");
            xIconDiv.setAttribute("data-delete","selector");
            // xIconDiv.classList.add("delete");
            xIconDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-15px,-45px);border-radius:50%;padding:5px;background:black;z-index:200;"
            FaCreate({parent:xIconDiv,name:FaTrash,cssStyle:cssStyle});
            target.appendChild(xIconDiv);
            xIconDiv.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    // console.log("before: selectors",this.selectors);
                    this._modSelector._selectors.map((sel,index)=>{
                        if(sel.footer){
                            const arr =Header.getImgKeys(sel) as {targetName: string,imgKey: string;}[];
                            arr.map(key=>{
                                if(key){
                                    this._service.adminImagemark(key.imgKey).then(async(res)=>{
                                        if(res){
                                            Misc.message({parent,msg:`${key.imgKey}`,type_:"success",time:400});
                                        }
                                    });
                                }
                            });
                            this._modSelector._selectors.splice(index,1);
                            this._modSelector.footer={} as selectorType;
                            this.placement = this.placement -1;
                        }
                    });
                    this._modSelector.selectors=this._modSelector._selectors;
                    Misc.fadeOut({anchor:target,xpos:50,ypos:100,time:600});
                    setTimeout(()=>{
                        parent.removeChild(target);
                    },580);
                }
            });
        } else{
            Footer.cleanUpByID(parent,"delete-footer-selector-remove-footer");
        }
       
    }
    setColAttributes(parent:HTMLElement,name:string,attr:string,flex:flexType):void{
        const checkFlex=["flex-col","flex-row","flex-center","flex-between","flex-remove"].includes(name)
        switch(true){
            case name==="image rounded":
                parent.classList.toggle(attr);
                const getImages=parent.querySelectorAll("img");
                if(getImages){
                    getImages.forEach(img=>{
                        if(img){
                            img.style.borderRadius="50%";
                            img.style.width="85px";
                            img.style.height="85px";
                            const flex=JSON.parse(img.getAttribute("flex") as string) as flexType;
                            this._modSelector.updateColumn(parent,flex);
                            this._modSelector.updateElement(img);
                        }
                    });
                }
                
            break;
            case checkFlex:
                let cssArr=parent.style.cssText.split(";");
                cssArr=cssArr.filter(cl=>(!cl.startsWith("display:flex"))); //removing display:flex; 
                cssArr=cssArr.filter(cl=>(!cl.startsWith("justify-content:"))); //removing justify-content: 
                cssArr=cssArr.filter(cl=>(!cl.startsWith("align-items:"))); //removing align-items: 
                cssArr=cssArr.filter(cl=>(!cl.startsWith("flex-wrap:"))); //removing flex-direction: 
                parent.classList.toggle(attr);
                if(name==="flex-col"){
                    cssArr=cssArr.filter(cl=>(!cl.startsWith("flex-direction:"))); //removing flex-direction: 
                    cssArr.push("display:flex");
                    cssArr.push("flex-direction:column");
                    parent.style.cssText=cssArr.join(";");
                }else if(name==="flex-row"){
                    cssArr=cssArr.filter(cl=>(!cl.startsWith("flex-direction:"))); //removing flex-direction: 
                    cssArr.push("display:flex");
                    cssArr.push("flex-direction:row");
                    cssArr.push("flex-wrap:wrap");
                    parent.style.cssText=cssArr.join(";");
                }else if(name==="flex-center"){
                    cssArr.push("display:flex");
                    cssArr.push("justify-content:center");
                    cssArr.push("align-items:center");
                    parent.style.cssText=cssArr.join(";");
                }else if(name==="flex-between"){
                    //flex-between
                    cssArr.push("display:flex");
                    cssArr.push("justify-content:space-between");
                    cssArr.push("align-items:center");
                    parent.style.cssText=cssArr.join(";");
                }else if(name==="flex-remove"){
                    cssArr=cssArr.filter(cl=>(!cl.startsWith("flex-direction:"))); //removing 
                    parent.style.cssText=cssArr.join(";");
                }
                this._modSelector.updateColumn(parent,flex);
            break;
            case name==="bg-row-color":
                this.backgroundColor(parent,flex);
            break;
            case name==="bg-ele-color":
                this.backgroundEleColor({column:parent,flex:flex});
            break;
            case name==="box-shadow":
                const bsArr=["box-shadow-md","box-shadow-md1","box-shadow-md2"]
                const parent_=parent.parentElement;
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
                    }
                    this._modSelector.updateRow(parent_,flex);
                }
            break;
            
            default:
                return; 
        }
    }
    //GENERAL
    getEmail(col:HTMLElement){
        const {parsed}=Header.checkJson(col.getAttribute("flex"));
        let flex=parsed as flexType;
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
                anchor.href=`mailto:${email}`;
                anchor.style.cssText="display:flex;gap:1rem;padding-inline:1rem;"
                const faDiv=document.createElement("div");
                faDiv.style.cssText="padding-inline:0.75rem;";
                FaCreate({parent:faDiv,name:FaMailBulk,cssStyle:{fontSize:"20px"}});
                const para=document.createElement("p");
                para.textContent=name;
                anchor.appendChild(faDiv);
                anchor.appendChild(para);
                anchor.setAttribute("data-href-email",anchor.href);
                flex={...flex,anchorContainer:anchor.href}
                Main.flexTracker(anchor,flex);
                divCont.appendChild(anchor);
                col.appendChild(divCont);
                // console.log("before",anchor);//works
                this._modSelector.promElementAdder(anchor).then(async(res)=>{
                    if(res){
                        // console.log("after",anchor);//works
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
        let flex= parsed as flexType;
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
                anchor.href=`tel:${tel}`;
                anchor.setAttribute("data-href-tel",anchor.href);
                anchor.style.cssText="display:flex;gap:1rem;padding-inline:1rem;"
                const faDiv=document.createElement("div");
                faDiv.style.cssText="padding-inline:0.75rem;";
                FaCreate({parent:faDiv,name:FaPhone,cssStyle:{fontSize:"20px"}});
                const para=document.createElement("p");
                para.textContent=name;
                anchor.appendChild(faDiv);
                anchor.appendChild(para);
                flex={...flex,anchorContainer:anchor.href};
                Main.flexTracker(anchor,flex);
                divCont.appendChild(anchor);
                col.appendChild(divCont);
                this._modSelector.promElementAdder(anchor).then(async(res)=>{
                    if(res){
                        console.log("res.target",res.target)
                        const ele=res.ele as element_selType;
                        divCont.onclick=(e:MouseEvent)=>{
                            if(e){
                                divCont.setAttribute("data-placement",`${ele.order}-A`)
                                divCont.classList.toggle("isActive");
                                anchor.classList.toggle("isActive");
                                console.log("res.target",res.target)
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
     insertLink(col:HTMLElement){
        const {parsed}=Header.checkJson(col.getAttribute("flex"));
        let flex= parsed as flexType;
        const form=document.createElement("form");
        form.style.cssText="position:absolute;width:clamp(200px,350px,400px);height:auto;display:flex;align-items:center;justify-content:center;top:-130%;left:0%;right:10%;z-index:200;;flex-direction:column;gap:1rem;background-color:white";
        const {input:LInput,label:Llabel}=Nav.inputComponent(form);
        LInput.type="url";
        LInput.name="link";
        LInput.id="link";
        LInput.pattern="https://*";
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
        col.appendChild(form);
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const divCont=document.createElement("div");
                divCont.style.cssText=this.divCont_css;
                divCont.className=this.divCont_class;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const link=formdata.get("link") as string;
                const name=formdata.get("name") as string;
                const anchor=document.createElement("a");
                anchor.onclick=(e:MouseEvent)=>{
                    if(e){
                        window.open(link,"_blank");
                    }
                }
                anchor.setAttribute("data-href",link);
                anchor.textContent=name;
                flex={...flex,anchorContainer:link};
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
                this.removeMainElement(col,divCont,anchor);
            }
        };
     }
    //PARENT MAIN:mainBtn()
    footerAttributes(btn:HTMLButtonElement):void{
            const getfooterEles=document.querySelectorAll("[is-element = 'true'");

                ([...getfooterEles as any] as HTMLElement[]).forEach(ele=>{
                    if(ele){
                        const {isJSON}=Header.checkJson(ele.getAttribute("flex"));
                        const check=([...ele.classList as any] as string[]).includes("isActive");
                        if(check && isJSON){
                            ele.classList.toggle(btn.id);
                            this._modSelector.updateElement(ele);
                        }
                    }

                });
         
    }
    promColAdder(item:{target:HTMLElement}){
        const {target}=item;
        const {parsed}=Header.checkJson(target.getAttribute("flex"));
        return new Promise(resolver=>{
            resolver(this.colAdder(target,parsed as flexType));
        }) as Promise<{column:HTMLElement,col:colType}>;
    }
    colAdder(target:HTMLElement,flex_:flexType):{column:HTMLElement,col:colType}{
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        let flex:flexType=isJSON ? parsed as flexType : flex_;

        const {selectorId,rowId,imgKey}=flex;
        let col:colType={} as colType
        this._modSelector._selectors=this.selectors.map(select=>{
            if(select.eleId===selectorId){
                select.rows.map(row=>{
                    if(row.eleId ===rowId){
                        const check=row.cols.map(col=>(col.eleId)).includes(target.id as string);
                        // console.log("1032:check:determines if COL extis",check,"target.id",target.id,)//works
                        if(!check){
                            const ID1=row.cols?.length ? row.cols.length : 0;
                                col={
                                    id:ID1,
                                    name:target.getAttribute("name") ? target.getAttribute("name") as string : '' ,
                                    class:target.className.split(" ").filter(cl=>(cl !=="box-shadow")).join(" "),
                                    eleId:target.id,
                                    inner_html:target.textContent ? target.textContent : "",
                                    cssText:target.style.cssText,
                                    elements:[] as element_selType[],
                                    row_id:row.id,
                                    imgKey:imgKey ? imgKey : undefined,
                                    order:ID1
                            }as colType;
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
           this._modSelector.selectors=this._modSelector._selectors;
           return {column:target,col}
            
    }
    elementAdder(target:HTMLElement | HTMLImageElement):{ target: HTMLElement | HTMLImageElement,ele: element_selType}| undefined{

        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        const checkNodename=["a","blockquote","ul","img","ol"]
        const nodename=target.nodeName.toLowerCase();
        const specialNodename=checkNodename.includes(nodename);
       
        if(isJSON){
            let flex=parsed as flexType;
            const {selectorId,rowId,colId,backgroundImage,imgKey}=flex;
            // console.log("FLEX: ","rowId:",rowId,"eleId",flex.elementId);
            //ADDING ATTRIBUTES
            const name=target.nodeName.toLowerCase();
            target.setAttribute("is-element","true");
            target.setAttribute("name",name);
            let ele:element_selType={} as element_selType;
            //ADDING ATTRIBUTES
       
            this._modSelector._selectors = this._modSelector._selectors.map(selector_=>{
               
                if(selector_.eleId===selectorId ){
                    // console.log("inside selector:",selector_.eleId===selectorId);//works
                    selector_.rows.map(row=>{
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
                                                imgKey:imgKey ? imgKey : undefined,
                                                order:ID
                                            } as element_selType;
                                            if(backgroundImage){
                                                ele.attr="data-backgroundImage";
                                                target.setAttribute("data-backgroundImage","true");
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
            this._modSelector.selectors=this._modSelector._selectors; //saving it to blog
            return {target:target,ele:ele};
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
                if(target.nodeName==="IMG"){
                    const {parsed}=Header.checkJson(target.getAttribute("flex"));
                    const flex=parsed as flexType;
                    const {imgKey}=flex;
                    if(imgKey){
                        this._service.adminImagemark(imgKey).then(async(res)=>{
                            if(res){
                                Misc.message({parent:parent,msg:`${imgKey} was deleted`,type_:"success",time:700});
                            }
                        });
                    }
                }
                this.removeElement(target);
                Misc.growOut({anchor:divCont,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(divCont);
                },390);
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
    editElement(target:HTMLElement | HTMLImageElement){
        const nodename=target.nodeName.toLowerCase();
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        const link=target.getAttribute("data-href");
        const email=target.getAttribute("data-href-mail");
        const tel=target.getAttribute("data-href-tel");
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
                                                            
                                                                if(link){
                                                                    element.attr=link
                                                                }else if(email){
                                                                    element.attr=email;
                                                                }else if(tel){
                                                                    element.attr=tel;
                                                                }
                                                               
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
   
    backgroundColor(column:HTMLElement,flex:flexType):void{
        const useParent=column.parentElement;
        if(!useParent) return;
        const direction=window.innerWidth < 600 ? "column":"row" ;
        useParent.style.position="relative";
        useParent.style.zIndex="100";
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
        selectBlue.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                    if(flex){
                        useParent.style.backgroundColor=value;
                        this._modSelector.updateRow(useParent,flex);
                    }
                ([...column.children as any] as HTMLElement[]).forEach(child=>{
                    if(child && child.id==="bg-popup"){
                        column.removeChild(child);
                    }
                });
                
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
        ],{duration:600,iterations:1})
        column.appendChild(popup);
        select1.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value as string;
                if(flex){
                useParent.style.backgroundColor=value;
                this._modSelector.updateRow(useParent,flex);
                ([...column.children as any] as HTMLElement[]).forEach(child=>{
                    if(child && child.id==="bg-popup"){
                        column.removeChild(child);
                    }
                });
                }
               
                
            }
        });
    }
    backgroundEleColor(item:{column:HTMLElement,flex:flexType}):void{
        const {column}=item;
        column.style.position="relative";
        column.style.zIndex="0";
        //show drop-down on shade selection
        const popup=document.createElement("div");
        popup.style.cssText=`position:absolute;border-radius:5px;box-shadow:1px 1px 10px 1px #bdc5c9;display:flex;flex-direction:column;gap:0.6rem;width:250px;height:auto;z-index:200;inset:-70px 20% 115% 20%;justify-content:center;`;
        popup.setAttribute("is-popup","true");
        popup.id="bg-ele-color-popup";
        popup.className="popup";
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
        const getActiveEles=column.querySelectorAll(".isActive") as any as HTMLElement[];
        if(getActiveEles){
            //FOUND ACTIVE ELEMENTS
            popup.appendChild(selectBlue);
            column.appendChild(popup);
            selectBlue.addEventListener("change",(e:Event)=>{
                if(e){
                    const value=(e.currentTarget as HTMLSelectElement).value;
                    [...getActiveEles].map(ele=>{
                       ele.style.backgroundColor=value;
                       ele.style.borderRadius="12px";
                        this._modSelector.updateElement(ele);

                    });
                   Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                   setTimeout(()=>{column.removeChild(popup)},390);
                    
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
            ],{duration:600,iterations:1})
            column.appendChild(popup);
            select1.addEventListener("change",(e:Event)=>{
                if(e){
                    const value=(e.currentTarget as HTMLSelectElement).value as string;
                    [...getActiveEles].map(ele=>{
                       ele.style.backgroundColor=value;
                       ele.style.borderRadius="12px";
                        this._modSelector.updateElement(ele);

                    });
                   Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                   setTimeout(()=>{column.removeChild(popup)},390);
                
                    
                }
            });
        }else{
            Misc.message({parent:column,type_:"error",msg:"no elements active",time:800});
        }
    }
    setColor(column:HTMLElement):void{
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
        column.appendChild(popup);
        input.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value;
                const getActives=column.querySelectorAll(".isActive");
                ([...getActives as any] as HTMLElement[]).map(ele=>{
                    ele.style.color=value;
                    this._modSelector.updateElement(ele);
                });
                
                column.removeChild(popup);
            }
        });
        
    }
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
    }
    
    getElementCount(column:HTMLElement):number|undefined{
        const {isJSON,parsed}=Header.checkJson(column.getAttribute("flex"));
        if(!isJSON) return;
        const {selectorId,rowId,colId}= parsed as flexType;
        const selector=this._modSelector.selectors.filter(sel=>(sel.eleId===selectorId))[0];
        if(!selector) return;
        const row=selector.rows.filter(row=>(row.eleId===rowId))[0];
        if(!row) return;
        const col=row.cols.filter(col_=>(col_.eleId===colId))[0];
        if(!col) return 1;
        const len=col.elements ? col.elements.length : 1;
        return len
    }
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
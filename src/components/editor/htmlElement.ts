import { FaCrosshairs } from "react-icons/fa";
import Service from "../common/services";
import User from "../user/userMain";
import { arrDivContType,  elementType, iconType } from "./Types";
import ModSelector from "./modSelector";
import { FaCreate } from "../common/ReactIcons";
import Main from "./main";
import { btnReturnDisableType, buttonRetDisable, } from "../common/tsFunctions";
import Misc from "../common/misc";
import Header from "@/components/editor/header";
import ShapeOutside from "./shapeOutside";
import Reference from "./reference";

import EditText from "../common/editText";
import Dataset from "../common/dataset";
import { eleEnumType, idEnumType,  idValueType, selRowColType, typeEnumType } from "@/lib/attributeTypes";
import Design from "../common/design";
import { attrEnumArr, attrEnumArrTest,  typeEnumArr, typeEnumArrTest} from "@/components/common/lists";
import Ven from "../common/venDiagram";
import Headerflag from "./headerflag";
import PasteCode from "../common/pasteCode";
import Nav from "../nav/headerNav";




class HtmlElement {
    phone:string="./images/phone.png";
    link:string="./images/link.png";
    mail:string="./images/mail.png";
    logo:string="/images/gb_logo.png";
    _placement:number;
    _arrDivCont:arrDivContType[];
    static imgDesc_css:string="align-self:start;margin-top:1rem;color:black;font-weight:bold;font-style:italic;margin-inline:0px;border-radius:10px;";
    urlImg:string="./images/gb_logo.png";
    bgColor:string;
    btnColor:string;
    refresh:boolean;
    divCont_css:string;
    divCont_class:string;
    _elements:elementType[];
    editText:EditText;
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,public shapeOutside:ShapeOutside,public design:Design,public ven:Ven,public reference:Reference,public headerflag:Headerflag,public pasteCode:PasteCode){
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this._elements=this._modSelector.elements;
        this. phone="./images/phone.png";
        this.link="./images/link.png";
        this.mail="./images/mail.png";
        
        this._arrDivCont=[];
        this.divCont_css="margin:0px;padding:1rem;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;padding-inline:1.25rem;margin-inline:auto;border-radius:8px;width:100%;";
        this.refresh=false;
        this.divCont_class="eleContainer";
        this.urlImg="./images/gb_logo.png";
       
        //332
        this.editText= new EditText(this._modSelector);
    };
    //////------GETTERS/SETTERS-----/////////
    get placement(){
        const getPlace=localStorage.getItem("placement");
        // console.log("164:",getPlace)
        if(getPlace){
            return parseInt(getPlace)
        }else{
            return 1;
        };
    };
    set placement(placement:number){
        this._placement=placement;
        localStorage.setItem("placement",JSON.stringify(placement))
    };
    get elements(){
        return this._modSelector.elements;
    };
    set elements(elements:elementType[]){
        this._modSelector.elements=elements;
    };
    get arrDivCont(){
        return this._arrDivCont;
    };
    set arrDivCont(arrDivCont:arrDivContType[]){
        this._arrDivCont=arrDivCont
    };
    //////------GETTERS/SETTERS-----/////////



   async showCleanElement({parent,element,idValues}:{parent:HTMLElement,element:elementType,idValues:idValueType[]}):Promise<{div_cont:arrDivContType|undefined,idValues:idValueType[]}>{
    const rand=Math.floor(Math.random()*1000);
        const less400=window.innerWidth < 400;
       const eleId=element.eleId;
       
        const node=element.name as eleEnumType;
        const editableNodes=["p","ul","blockquote","ol","h1","h2","h3","h4","h5","h6"].includes(node);
        const attrTest= (element.attr && attrEnumArrTest(element)) ? attrEnumArrTest(element) : undefined;
        const typeTest= (element.type && typeEnumArrTest(element)) ? typeEnumArrTest(element) : undefined;
        const isTime=attrTest?.id==="time" ? attrTest.value:undefined;
        const isLink=attrTest?.id==="link" ? attrTest.value:undefined;
        const isEmail=attrTest?.id==="email" ? attrTest.value:undefined;
        const isTel=attrTest?.id==="tel" ? attrTest.value:undefined;
        const isImgDesc=attrTest?.id==="imgDesc" ? attrTest.value:undefined;
        const imgKey= element.imgKey ? element.imgKey : undefined;
        if(attrTest) idValues.push({eleId,id:attrTest.id as idEnumType,attValue:attrTest.value});
        if(typeTest) idValues.push({eleId,id:typeTest.id as idEnumType,attValue:typeTest.value});
        if(imgKey) idValues.push({eleId,id:"imgKey",attValue:String(element.imgKey)});
        idValues.push({eleId,id:"name",attValue:node});
        idValues.push({eleId,id:"isElement",attValue:"true"});
        
        if(typeTest){
            
            const id=typeTest.id as idEnumType
            if(id==="shapeOutside" && node==="p"){
              const arrDivCont= await this.shapeOutside.showCleanShapeOutside({parent,element,idValues,selRowCol:null});
              if(arrDivCont) {
                 const  div_cont=arrDivCont
                 return Promise.resolve({div_cont,idValues}) as Promise<{div_cont:arrDivContType,idValues:idValueType[]}>;
              };
            }else if(id==="headerflag"){
               const arrdivCont1= this.headerflag.showCleanHeaderflag({parent,element,idValues})
              const  div_cont=arrdivCont1
              return Promise.resolve({div_cont,idValues}) as Promise<{div_cont:arrDivContType,idValues:idValueType[]}>;
            }else if(id==="ven"){
               const arrdivCont2= this.ven.showVen({parent,element,idValues});
               const div_cont=arrdivCont2
               return Promise.resolve({div_cont,idValues}) as Promise<{div_cont:arrDivContType,idValues:idValueType[]}>;
            }else if(id==="design"){
                const arrdivCont3=this.design.showCleanDesign({parent,element,idValues});
                const div_cont=arrdivCont3;
                return Promise.resolve({div_cont,idValues}) as Promise<{div_cont:arrDivContType,idValues:idValueType[]}>;
            }else if(id==="pasteCode"){
                const target=document.createElement(element.name);
                target.id=element.eleId;
                const divCont=document.createElement("div");
                divCont.id=`divCont-pasteCode-${rand}`;
                const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({target,sel:null,row:null,col:null,ele:element,clean:true,level:"element",loc:"htmlElement",idValues});
                idValues=retIdValues;
              const div_cont= this.pasteCode.showClean({divCont,target,element,idValues});///FINISH THIS NEEDS RETURN ARRDIVCONT
              return Promise.resolve({div_cont,idValues}) as Promise<{div_cont:arrDivContType,idValues:idValueType[]}>;
               
            }else if(id==="reference"){
               const arrdivCont5= this.reference.showCleanLinks({parent,ele:element,idValues});///FINISH THIS NEEDS RETURN ARRDIVCONT
               const div_cont=arrdivCont5
               return Promise.resolve({div_cont,idValues}) as Promise<{div_cont:arrDivContType,idValues:idValueType[]}>;
            }
            //THEN TACKLE FLEXBOX, THEN COMBINED THEM TO DISPLAY
        }else{
            const target=document.createElement(node);
            target.id=element.eleId;
            const divCont=document.createElement("div");
            divCont.id=`divCont-normal-${rand}`;
            this._modSelector.dataset.insertcssClassIntoComponents({
                target:divCont,
                level:"element",
                loc:"htmlElement",
                id:"divContId",
                headerType:undefined,
                type:"htmlElement"
    
            })
            target.classList.remove("isActive");
            target.id=element.eleId;
            target.className=element.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
            const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
            target.className=cleaned.join(" ");
            target.classList.remove("isActive");
            target.style.cssText=element.cssText;
            target.innerHTML=element.inner_html;
            target.style.paddingInline=less400 ? "0.25rem":"1rem";
            const {idValues:retIdValues}=this._modSelector.dataset.coreDefaultIdValues({target,sel:null,row:null,col:null,ele:element,clean:true,level:"element",loc:"htmlElement",idValues});
            idValues=retIdValues;
            if(editableNodes){
                if(node==="p"){
                    if(!(target.style.lineHeight !=="" ||target.style.lineHeight)){
                        target.style.lineHeight="1.75rem";
                    };
                  
                }else if(node==="ul" || node==="ol"){
                    target.style.lineHeight="1.85rem";
                    const lis=(target as HTMLElement).querySelectorAll("li") as any as HTMLElement[];
                    lis.forEach(li=>{
                        if(li && li.textContent===""){
                            li.remove();
                        }
                    });
                };
                divCont.appendChild(target);
                const div_cont:arrDivContType={divCont,target,placement:element.placement,ele:element,isNormal:true,chart:null,sel:null}
                return Promise.resolve({div_cont,idValues}) as Promise<{div_cont:arrDivContType,idValues:idValueType[]}>;
            } else if(node==="a"){
                const anchor=target as HTMLAnchorElement;
                if(isLink){
                    const link=isLink;
                    const name=anchor.textContent ? anchor.textContent:"link"
                    this.addLinkEmailTelImg({target:anchor,image:this.link,href:link,name,type:"link"});
                }else if(isEmail){
                    const email=isEmail;
                    const name=anchor.textContent ? anchor.textContent:"email"
                    this.addLinkEmailTelImg({target:anchor,image:this.mail,href:email,name,type:"email"});
                }else if(isTel){
                    const tel=isTel;
                    const name=anchor.textContent ? anchor.textContent:"tel"
                    this.addLinkEmailTelImg({target:anchor,image:this.mail,href:tel,name,type:"tel"});
                }
                divCont.appendChild(target);
                const div_cont:arrDivContType={divCont,target:anchor,placement:element.placement,ele:element,isNormal:true,chart:null,sel:null}
                return Promise.resolve({div_cont,idValues}) as Promise<{div_cont:arrDivContType,idValues:idValueType[]}>;
            }else if(node==="time"){
                const time=target as HTMLTimeElement;
                if(isTime){
                    time.setAttribute("data-time",isTime);
                    divCont.appendChild(target);
                    const div_cont:arrDivContType={divCont,target:time,placement:element.placement,ele:element,isNormal:true,chart:null,sel:null}
                    return Promise.resolve({div_cont,idValues}) as Promise<{div_cont:arrDivContType,idValues:idValueType[]}>;
                }
            }else if(node==="img"){
                if(element.imgKey){
                    const check=this._service.checkFreeImgKey({imgKey:element.imgKey as string});
                    if(check){
                        const url=this._service.getFreeBgImageUrl({imgKey:element.imgKey as string});
                        (target as HTMLImageElement).src=url as string;
                        (target as HTMLImageElement).alt=url as string;
                    }else{
                        const res= await this._service.getSimpleImg(element.imgKey);
                        if(res){
                            target.style.width="100%";
                            (target as HTMLImageElement).src=res.img as string;
                            (target as HTMLImageElement).alt=res.Key as string;
                            Misc.blurIn({anchor:target,blur:"20px",time:500});
                            
                        }
                    }
                };
                target.style.width="100%";
                target.style.marginInline="1rem";
                divCont.appendChild(target);
                if(isImgDesc){
                    const idValue={eleId,id:"imgDesc",attValue:isImgDesc} as idValueType;
                    this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                    this.createImgDesc({divCont,target:(target as HTMLImageElement),element,clean:true,idValues});
                };
                const div_cont:arrDivContType={divCont,target,placement:element.placement,ele:element,isNormal:true,chart:null,sel:null}
                return Promise.resolve({div_cont,idValues}) as Promise<{div_cont:arrDivContType,idValues:idValueType[]}>;
            };
            if(less400){
                target.style.paddingInline="0.5rem";
                target.classList.remove("columns-3");
                target.classList.remove("columns-4");
                target.classList.remove("columns-2");
                target.classList.remove("columns");
            };
            
            
        }
        return Promise.resolve({div_cont:undefined,idValues}) as Promise<{div_cont:arrDivContType|undefined,idValues:idValueType[]}>;
    };

    ///-------------INJECTION/SOW WORK------------------///
    
   async showElement({parent,element,idValues,selRowCol}:{
        parent:HTMLElement,
        element:elementType,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }):Promise<arrDivContType|undefined>{
      
        const node=element.name;
        const editableNodes=["p","ul","blockquote","ol","h1","h2","h3","h4","h5","h6"].includes(node);
        const eleId=element.eleId;
        const attrTest=attrEnumArrTest(element);
        const typeTest=typeEnumArrTest(element);
        const less400=window.innerWidth < 400;
        const less900=window.innerWidth < 900;
        const divCont=document.createElement("div");
        const target=document.createElement(node);
        const rand=Math.floor(Math.random() *1000);
      
        const isImgDesc= attrTest && attrTest.id==="imgDesc"? attrTest.value:undefined;
        if(selRowCol){
            const idValue:idValueType={eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)};
            this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
        }


        if(typeTest){
            const id=typeTest.id
    
            if(id==="shapeOutside"){
               const div_cont= this.shapeOutside.showShapeOutside({
                    parent,
                    element,
                    idValues,
                    selRowCol
                });
                return Promise.resolve(div_cont) as Promise<arrDivContType>;

            }else if(id==="reference"){

               const div_cont= this.reference.showLinks({parent,
                 ele:element,
                 idValues,
                 isHtmlElement:true,
                 sel:null,
                 rowEle:null,
                 colEle:null
                });
                return Promise.resolve(div_cont) as Promise<arrDivContType>;
            }else if(id==="design"){
                const div_cont=this.design.showDesign({parent,element,idValues});
                return Promise.resolve(div_cont) as Promise<arrDivContType>
            }else if(id==="ven"){
                const div_cont=this.ven.showVen({parent,element,idValues});
                return Promise.resolve(div_cont) as Promise<arrDivContType>
            }else if(id==="headerflag"){
                const div_cont=this.headerflag.showHeaderflag({parent,element,less900,less400,idValues});
                return Promise.resolve(div_cont) as Promise<arrDivContType>
            }else if(id==="pasteCode"){
                const div_cont=this.pasteCode.main({parent,element,isNew:false,isClean:false,idValues});
                if(!div_cont) return;
                return Promise.resolve(div_cont) as Promise<arrDivContType>
            };
           
            
        }else{
            divCont.id=`divCont-html-${rand}`;
            divCont.setAttribute("data-placement",`${element.placement}-A`);
            divCont.style.paddingInline=less400 ? "0.25rem":"1.5rem";
            this._modSelector.dataset.insertcssClassIntoComponents({target:divCont,loc:"htmlElement",type:"htmlElement",headerType:undefined,id:"divContId",level:"element"});
            target.classList.remove("isActive");
            target.id=eleId;
            target.className=element.class;
            const {cleaned:cleanClasses}=this._modSelector.removeClasses({target,classes:["isActive"]});
            target.className=cleanClasses.join(" ");
            target.innerHTML=element.inner_html;
            target.style.cssText=`${element.cssText}`;
            idValues.push({eleId,id:"divContId",attValue:divCont.id});
            idValues.push({eleId,id:"ele_id",attValue:String(element.id)});
             idValues.push({eleId,id:"name",attValue:element.name});
             //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
             idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            
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
                idValues=retIdValues2;
              
            //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
            

            if(editableNodes){
               
                divCont.appendChild(target);
                divCont.setAttribute("data-placement",`${element.placement}-A`)
                if(node==="p"){
                    if(!(target.style.lineHeight !=="" ||target.style.lineHeight)){
                        target.style.lineHeight="1.75rem";
                    }
                    this.editText.paragraphEditorbar({parent:divCont,target:target,idValues});
                    target.onclick=(e:MouseEvent)=>{
                        if(!e) return;
                        divCont.classList.toggle("isActive");
                        target.classList.toggle("isActive");
                        this.removeMainElement({parent,divCont,target,idValues});
                        Main.activatebuttons({target});
                    };
                }else{

                    divCont.onclick=(e:MouseEvent)=>{
                        if(!e) return;
                        divCont.classList.toggle("isActive");
                        target.classList.toggle("isActive");
                        this.removeMainElement({parent,divCont,target,idValues});
                        Main.activatebuttons({target});
                    };
                };
                this.editElement({target,idValues});
                   if(divCont){
                    const div_cont={divCont,placement:element.placement,target,isNormal:true,ele:element,chart:null,sel:null}
                     return Promise.resolve(div_cont) as Promise<arrDivContType>
                    };
            }else if(node==="a"){
                const isLink=attrTest && attrTest.id==="link" ? attrTest:undefined;
                const isEmail=attrTest && attrTest.id==="email" ? attrTest:undefined;
                const isTel=attrTest && attrTest.id==="tel" ? attrTest:undefined;
                const name=target.textContent || "link";
                if(isLink){
                    this.addLinkEmailTelImg({target:(target as HTMLAnchorElement),image:this.link,href:isLink.value,name,type:"link"});
                }else if(isEmail){
                    this.addLinkEmailTelImg({target:(target as HTMLAnchorElement),image:this.mail,href:isEmail.value,name,type:"email"});
                }else if(isTel){
                    this.addLinkEmailTelImg({target:(target as HTMLAnchorElement),image:this.link,href:isTel.value,name,type:"tel"});
                };
                divCont.appendChild(target);
                divCont.onclick=(e:MouseEvent)=>{
                    if(!e) return;
                    divCont.classList.toggle("isActive");
                    target.classList.toggle("isActive");
                    this.removeMainElement({parent,divCont,target,idValues});
                    Main.activatebuttons({target});
                };
                if(divCont){ 
                   const div_cont={divCont,placement:element.placement,target,isNormal:true,ele:element,chart:null,sel:null}
                    return Promise.resolve(div_cont) as Promise<arrDivContType>;
                };
                
            }else if(node==="time"){
                const isTime=attrTest && attrTest.id==="time" ? attrTest:undefined;
                if(!isTime)return;
                idValues.push({eleId:target.id,id:"time",attValue:isTime.value})
                divCont.appendChild(target);
                divCont.onclick=(e:MouseEvent)=>{
                    if(!e) return;
                    divCont.classList.toggle("isActive");
                    target.classList.toggle("isActive");
                    this.removeMainElement({parent,divCont,target,idValues});
                    Main.activatebuttons({target});
                };
                if(divCont){ 
                   const div_cont={divCont,placement:element.placement,target,isNormal:true,ele:element,chart:null,sel:null}
                    return Promise.resolve(div_cont) as Promise<arrDivContType>;
                };
            }else if(node==="img"){
                (target as HTMLImageElement).src=element.img ||this.logo;
                (target as HTMLImageElement).alt=element.inner_html ||"www.ablogroom.com";
                target.style.width="100%";
                divCont.appendChild(target);
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
                if(isImgDesc){
                   
                    idValues.push({eleId,id:"imgDesc",attValue:isImgDesc});
                    this.createImgDesc({divCont,target:(target as HTMLImageElement),element,clean:false,idValues});
                };
                target.onclick=(e:MouseEvent)=>{
                    if(!e) return;
                    divCont.classList.toggle("isActive");
                    target.classList.toggle("isActive");
                    this.removeMainElement({parent,divCont,target,idValues});
                    Main.activatebuttons({target});
                };
                if(divCont) {
                    const div_cont={divCont,placement:element.placement,target,isNormal:true,ele:element,chart:null,sel:null};
                    return Promise.resolve(div_cont) as Promise<arrDivContType>;
                };
            }
        };
    };


    ///-------------INJECTION: PARENT:TEXTAREA/SOW WORK------------------///
    fromMain({parent,btn,icon,idValues}:{parent:HTMLElement,btn: HTMLButtonElement, icon: iconType,idValues:idValueType[]}): void {
    const rand=Math.floor(Math.random()*1000);
    const divCont=document.createElement('div');
    divCont.id=`divCont-normal-${rand}`;
    this._modSelector.dataset.insertcssClassIntoComponents({target:divCont,level:"element",headerType:undefined,id:"divContId",loc:"htmlElement",type:"htmlElement"});
    const node=icon.name;
    const target = document.createElement(icon.name); //ICON.NAME=ELE TYPE
    target.id=`htmlele-${icon.name}-${rand}`;
    const eleId=target.id;
    idValues.push({eleId,id:"name",attValue:node});
    idValues.push({eleId,id:"elementId",attValue:eleId});
    idValues.push({eleId,id:"ID",attValue:eleId});
    btn.classList.add(icon.display);
    target.classList.add(icon.name);
        if (icon.name === "img") {

          
            this.addImage({
                parent,
                target,
                divCont,
                btnClicked:btn,
                    icon,
                idValues

            });

        } else if (icon.name === "SH") {
            let ele: elementType = {} as elementType;
            ele = { ...ele,eleId:target.id, type: "shapeoutside", attr: "shapeOutsideCircle" };
            idValues.push({eleId,id:"shapeOutside",attValue:"true"});
            idValues.push({eleId,id:"type",attValue:"shapeOutside"});
            idValues.push({eleId,id:"elementId",attValue:eleId});
            idValues.push({eleId,id:"ID",attValue:eleId});
            idValues.push({eleId,id:"shapeOutsideCircle",attValue:"true"});
            this.shapeOutside.addShapeOutside({ parent, sel: null,rowEle:null,colEle:null, element: ele,idValues })
        }else if(icon.name==="time"){
            this.insertDateTime({
                parent,
                target,
                divCont,
                    btnClicked:btn,
                idValues,
                icon
            });
        } else if(icon.name==="ul"){
            this.selectUltype(parent,btn,icon);
        }else if(icon.name==="a"){
            this.createAnchor({
                parent,
                target,
                divCont,
                    btn,
                idValues,
                icon
            });
        }else if(icon.name==="blockquote"){
            this.createQuote({
                parent,
                target,
                divCont,
                    btn,
                    icon,
                idValues
            })
        }else {
            this.appElement({
                parent,
                target,
                divCont,
                    btn,
                    icon,
                idValues
            });

        }

     
    };

    
   async appElement({parent,target,divCont,btn,icon,idValues}:{
    parent: HTMLElement;
    btn:HTMLElement;
    target:HTMLElement;
    divCont:HTMLElement;
     icon:iconType;
    idValues:idValueType[]
   }) {
        //THIS ADDS ELEMENTS OTHER THAN UL,BLOCKQUOTE,TIME,A,IMG FROM MAIN CLASS
        
        target.innerHTML = `${icon.name}-insert text`;
        idValues.push({eleId:target.id,id:"divContId",attValue:divCont.id});
        
        
        await this.elementAdder({target,idValues}).then(async(res)=>{
            if(res){
                const ele=res.ele as elementType;
                    divCont.setAttribute("data-placement",`${ele.placement}-A`)
                  
                if(icon.name==="p"){
                    this.editText.paragraphEditorbar({parent:divCont,target:res.target,idValues});
                };
                this.editElement({target:res.target,idValues});
                divCont.setAttribute("data-placement",`${ele.placement}-A`)
                this._modSelector.count=this._modSelector.count + 1;
                this._modSelector.footerPlacement();//this shifts footer placement down
                
                divCont.addEventListener("click", (e: MouseEvent) => {
                    if (e) {
                        divCont.classList.toggle("isActive");
                        const check=([...divCont.classList as any] as string[]).includes("isActive");
                        btn.classList.toggle("active");
                        if(check){
                            res.target.classList.add("isActive");
                          
                        }else{
                            res.target.classList.remove("isActive");
                           
                        }
                        
                        this.removeMainElement({
                            parent,
                            divCont,
                            target:res.target,
                            idValues
                           });
                        
                    }
                });
             
            }
        });
            
        divCont.appendChild(target);
        parent.appendChild(divCont);
    
        Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
        Misc.fadeIn({anchor:divCont,xpos:60,ypos:100,time:600});
        if(icon.name==="list"){
            icon.name="ul";
        }
        
        Misc.matchMedia({parent:divCont,maxWidth:400,cssStyle:{paddingInline:"0px",marginInline:"0px;"}});
        
        
    };

   
     addAttribute(item:{target:HTMLElement,divCont:HTMLElement,icon:iconType|null,attValue:string|undefined}):{target:HTMLElement,divCont:HTMLElement}{
        //ADDS ATTRIBUTES ONLY
        const {target,divCont}=item;

        // THIS ADDS DEFAULT CSS AND DEFAULT CLASSES TO ELEMENT BELOW
       
        divCont.setAttribute("data-placement",`${this.placement}`);
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
        Main.container=document.querySelector("section#main") as HTMLElement;
        const checkBgShade=([...(Main.container as HTMLElement).classList as any] as string[]).includes("bgShade");
        if(checkBgShade){
            target.classList.add("background-bgShade");
            divCont.classList.add("background-bgShade");
        }
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
        return {target,divCont};
    };
    
   
    addImage({parent,btnClicked,icon,target,divCont,idValues}:{
        parent:HTMLElement,
        btnClicked:HTMLButtonElement,
        icon:iconType,
        idValues:idValueType[],
        target:HTMLElement|HTMLImageElement,
        divCont:HTMLElement,

    }):void{
        const img=target as HTMLImageElement;
        const eleId=img.id;
        parent.style.position="relative";
        btnClicked.classList.add("active");
        const floatContainer=document.createElement("div");
        floatContainer.style.cssText="position:absolute;z-index:200;display:flex;justify-content:flex-start;align-items:center;gap:1rem;flex-direction:column;width:fit-content;";
        floatContainer.style.inset="20% 0% auto 0%";
        parent.classList.add("z-0");
        floatContainer.classList.add("select-image-container");
        const form=document.createElement("form");
        form.style.cssText="display:flex;flex-direction:column;align-items:center;gap:1.5rem;";
        const {input,label,formGrp}=Nav.inputComponent(form);
        formGrp.style.cssText="display:flex;justify-content:center;align-items:center;gap:1rem;flex-direction:column;";
        input.id="file";
        input.type="file";
        input.name="file";
        label.setAttribute("for",input.id);
        label.textContent="add a large image";
        const {button}=Misc.simpleButton({anchor:form,bg:this.btnColor,color:"white",type:"submit",text:"submit",time:400});
        button.disabled=true;
        input.onchange=(e:Event)=>{
            if(!e) return;
            button.disabled=false;
        };
        floatContainer.appendChild(form);
        parent.appendChild(floatContainer);
        Misc.fadeIn({anchor:floatContainer,xpos:50,ypos:100,time:500});
        form.addEventListener("submit",async(e:SubmitEvent)=>{
            if(e ){
                e.preventDefault();
                const formelement= new FormData(e.currentTarget as HTMLFormElement);
                const file=formelement.get("file");
                const image=URL.createObjectURL(file as File);
                //creating container && img
                img.src=image ||this.urlImg;
                img.alt="image";
                img.style.cssText="width:100%;margin:auto;margin-inline:1rem;";
                idValues.push({eleId,id:"name",attValue:"img"});
                idValues.push({eleId,id:"ID",attValue:eleId});
               
                //THIS ADDS ATTRIBUTES ANC CLASSES TO THE ELEMENTS FROM DATASET CLASS

            //THIS ADDS ATTRIBUTES ANC CLASSES TO THE ELEMENTS FROM DATASET CLASS
                divCont.appendChild(target as HTMLImageElement);
                parent.appendChild(divCont);
                Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
                Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                Misc.blurIn({anchor:divCont,blur:"20px",time:600});
                parent.removeChild(floatContainer);
                btnClicked.classList.remove("active");
                const blog=this._modSelector.blog;
                const {Key}=this._service.generateImgKey(formelement,blog) as {Key:string};
                idValues.push({eleId,id:"imgKey",attValue:Key});
                this.elementAdder({target:img as HTMLImageElement,idValues}).then(async(_res)=>{
                    if( _res?.idValues){
                        const ele=_res.ele as elementType;
                        divCont.setAttribute("data-placement",`${ele.placement}-A`);
                        idValues=_res.idValues
                        const img_= _res.target as HTMLImageElement;
                        this._user.askSendToServer({bg_parent:parent,formdata:formelement,image:img_ as HTMLImageElement,blog,oldKey:null,idValues,selRowCol:null});
                        this.createImgDesc({divCont,target:img_,element:_res.ele,clean:false,idValues});//create && updates desc editing for image
                        divCont.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                divCont.classList.toggle("isActive");
                                img_.classList.toggle("isActive");
                                this._modSelector.footerPlacement();//this shifts footer placement down
                                const isActive=([...img_.classList  as any] as string[]).includes("isActive");
                                
                                this.removeMainElement({
                                    parent,
                                    divCont,
                                    target:img,
                                    idValues
                                   });
                                this._user.refreshImageShow({parent,image:target as HTMLImageElement,formdata:null,selRowCol:null,idValues})
                                const checkSVG=([...divCont.children as any] as HTMLElement[]).map(child=>(child.nodeName)).includes("SVG")
                                if(isActive){
                                    divCont.style.zIndex="0";
                                    
                                }else if(checkSVG){
                                    const getIcon=divCont.querySelector("svg") as SVGElement;
                                        divCont.removeChild(getIcon as ChildNode)
                                }
                            }
                        });
                    }
                });
                Misc.matchMedia({parent:divCont,maxWidth:400,cssStyle:{paddingInline:"0px",marginInline:"0px;"}});
        }
        });
    };


   
    selectColumns({parent,btnClk,idValues}:{parent:HTMLElement,btnClk:HTMLButtonElement,idValues:idValueType[]}){
        btnClk.classList.add("active");
        parent.style.position="relative";
        parent.style.zIndex="0";
        const text=document.createElement("p");
        text.style.cssText="margin:auto;font-size:10px;";
        text.textContent="columns";
        text.className="text-light text-decoration-underline;"
        const popup=document.createElement("div");
        popup.id="columns-popup";
        popup.className="columns-popup";
        popup.style.cssText="position:absolute;inset:-100% 0% auto auto;width:100px;height:70px;backdrop-filter:blur(20px);border-radius:12px;box-shadow:1px 1px 12px 1px;font-size:10px;z-index:10;display:flex;flex-direction:column;align-items:center;";
        const select=document.createElement("select") as HTMLSelectElement;
        select.style.cssText="width:100%;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;";
        popup.appendChild(text);
        popup.appendChild(select);
        const isActives=document.querySelectorAll("[is-element='true'].isActive");
        Main.colArr.forEach((op)=>{
            const option=document.createElement("option") as HTMLOptionElement;
            option.value=op.value;
            option.textContent=op.name;
            select.appendChild(option);
        });
        parent.appendChild(popup);
        select.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                
                ([...isActives as any] as HTMLElement[]).forEach((ele)=>{
                    if(ele){
                        Main.colArr.map(col=>(ele.classList.remove(col.value)));
                        if(value!=="noColumns"){
                            ele.classList.toggle(value);
                        }
                        this._modSelector.addAttribute({target:ele,type:"class",attr:value,idValues,selRowCol:null});
                        
                    }
                });
                parent.removeChild(popup);
                btnClk.classList.remove("active");
            }
        });
    };


    createAnchor({parent,target,divCont,btn,icon,idValues}:{
        parent: HTMLElement,
        btn:HTMLElement,target:HTMLElement,
        divCont:HTMLElement,
         icon:iconType,
        idValues:idValueType[]
       }){
        //Form group
        const anchor=target as HTMLAnchorElement;
        parent.classList.add("position-relative")
        btn.classList.add("active");
        const groupForm=document.createElement("div");
        groupForm.id="createAnchor-form";
        groupForm.className="form-group mx-auto flex flex-column align-items-center gap-1";
        groupForm.setAttribute("data-form-group","true");
        groupForm.style.cssText="width:75%;text-align:center;";
        const tName=document.createElement("h5");
        tName.textContent="enter name";
        const inName=document.createElement("input");
        inName.id="inName";
        inName.name="inName";
        inName.className="form-control mx-auto";
        inName.style.cssText="width:200px;margin-block:0.5rem";
        const tLink=document.createElement("h5");
        tLink.textContent="enter link";
        const inLink=document.createElement("input");
        inLink.id="inLink";
        inLink.name="inLink";
        inLink.className="form-control mx-auto";
        inLink.style.cssText="width:200px;margin-block:0.5rem;font-size:12px;";
        inLink.type="url";
        inLink.pattern="https://*";
        tLink.setAttribute("for",inLink.id);
        groupForm.appendChild(tName);
        groupForm.appendChild(inName);
        groupForm.appendChild(tLink);
        groupForm.appendChild(inLink);
        const submitBtn=buttonRetDisable({parent:groupForm,text:"create",bg:this.btnColor,color:"white",type:"submit",disable:true})
        parent.appendChild(groupForm);

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
        submitBtn.addEventListener("click",async(e:MouseEvent)=>{
            if(e){
                const eleId=anchor.id;
                anchor.textContent=inName.value;
                anchor.onclick=()=>{window.open(inLink.value,"_blank")};
                anchor.setAttribute("contenteditable","true");
                idValues.push({eleId,id:"name",attValue:"a"});
                idValues.push({eleId,id:"divContId",attValue:divCont.id});
                idValues.push({eleId,id:"link",attValue:String(inLink.value)});
                idValues.push({eleId,id:"attr",attValue:String(inLink.value)});
                
                this._modSelector.footerPlacement();//this shifts footer placement down
                this.elementAdder({target,idValues}).then(async(_res)=>{
                    if(_res){
                        const ele=_res.ele as elementType;
                        divCont.setAttribute("data-placement",`${ele.placement}-A`)
                        
                    }
                });
                this._modSelector.count=this._modSelector.count + 1;
                target.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        divCont.classList.toggle("isActive");
                        target.classList.toggle("isActive");
                    
                    }
                });
                divCont.appendChild(target);
                parent.appendChild(divCont);
                this.removeMainElement({
                    parent,
                    divCont,
                    target,
                    idValues
                    });
                parent.removeChild(groupForm);
                btn.classList.remove("active");
               
                
            }
        });

        
        
    };


    selectUltype(parent:HTMLElement,btnClick:HTMLElement,icon:iconType){
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
        select.selectedIndex=0;
        parent.appendChild(select);
        select.addEventListener("change",(e:Event)=>{
            if(e){
                const check=([...btnClick.classList as any] as string[]).includes("active");
                if(check){
                const type__=(e.currentTarget as HTMLSelectElement).value
                this.createList(parent,btnClick,icon,type__);
                btnClick.classList.remove("active");
                parent.removeChild(select);
               
                }
                
            }
        });
        
    };



    
    static cleanUpWithID(parent:HTMLElement,ID:string){
        ([...parent.children as any] as HTMLElement[]).map(child=>{
            if(child && child.id ===ID ){
                parent.removeChild(child);
            }
        });
    }
    //PARENT SELECTULTYPE()
   async createList(parent:HTMLElement,btnClick:HTMLElement,icon:iconType,type:string){
        Main.textarea=document.querySelector("div#textarea");
        const useParent=Main.textarea;
        const idValues: idValueType[]=[];
        btnClick.classList.toggle(icon.name);
        if(useParent){
            const divCont=document.createElement("div");
            this._modSelector.dataset.insertcssClassIntoComponents({target:divCont,level:"element",headerType:undefined,id:"divContId",loc:"htmlElement",type:"htmlElement"});
            const ul=document.createElement("ul");
            ul.id=`ul-${Math.round(Math.random()*1000)}`;
            const eleId=ul.id;
             //THIS ADDS ATTRIBUTES ANC CLASSES TO THE ELEMENTS FROM DATASET CLASS
        
           const {target}=this.addAttribute({target:ul,divCont,icon:null,attValue:undefined})
                    //ABOVE ADDS ATTRIBUTES AND CLASSES TO THE ELEMENTS FROM DATASET CLASS
                    const li=document.createElement("li");
                   
                    if(type==="decimal"){
                        li.classList.add("decimal");
                    }
                    target.style.cssText="padding-inline:6px;width:90%;margin-inline:auto;";
                    idValues.push({eleId,id:"ID",attValue:eleId});
               
                        this.elementAdder({target,idValues}).then(async(_res)=>{
                            if(_res){
                                const ele=_res.ele as elementType;
                                divCont.setAttribute("data-placement",`${ele.placement}-A`);
                                this.editElement({target:_res.target,idValues});
                             
                            }
                        });
                    divCont.appendChild(target);
                    Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
                    Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                    useParent.appendChild(divCont);
                    target.addEventListener("click", (e:MouseEvent)=>{
                        if(e){
                            if(!(([...target.children as any] as HTMLElement[]).map(li=>(li.nodeName)).includes("LI"))){
                                ul.appendChild(li);
                            }
                            target.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            if(([...target.classList as any] as string[]).includes("isActive")){
                            this.removeMainElement({
                                parent:useParent,
                                divCont,
                                target:ul,
                                idValues
                               });
                           
                            }
                            btnClick.classList.remove("active");
                            this._modSelector.footerPlacement();//this shifts footer placement down
                            
                        }
                    },true);
                   
                   
                        // useParent.classList.add(".position-relative")
                        this._modSelector.editElement({target,idValues,selRowCol:null})//pulls flex if exist from target attrubutes
                    //ADDING element
          
            
            
           
           //NOTE CHANGE EVENT ONLY WORKS FOR INPUT,TEXTAREA TYPE
        }
    };


   async createQuote({parent,target,divCont,btn,icon,idValues}:{
    parent: HTMLElement,
    btn:HTMLElement,target:HTMLElement,
    divCont:HTMLElement,
     icon:iconType,
    idValues:idValueType[]
   }){
       
        const useParent=parent ? parent as HTMLElement : Main.textarea as HTMLElement;
        const quote=target as HTMLQuoteElement;
        quote.innerHTML=`<span style="font-size:105%;font-weight:bold;">&#8220;</span>${icon.name}<span style="font-size:105%;font-weight:bold;">&#8221;</span>`;
        divCont.appendChild(quote);
        useParent.appendChild(divCont);
        Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
               //ADDING element
       
        this.elementAdder({target:quote,idValues}).then(async(res)=>{
            if(res){
                const ele=res.ele as elementType;
                divCont.setAttribute("data-placement",`${ele.placement}-A`)
                idValues=res.idValues;
                this.editElement({target:res.target,idValues});
                divCont.addEventListener("click",(e:MouseEvent)=>{
                    if(!e) return
                   
                    divCont.classList.toggle("isActive");
                    res.target.classList.toggle("isActive");
                    if(([...quote.classList as any] as string[]).includes("isActive")){
                    this.removeMainElement({
                     parent:useParent,
                     divCont,
                     target:res.target,
                     idValues
                    });
                   
                    this._modSelector.footerPlacement();//this shifts footer placement down
                    }
                    
                });
                res.target.addEventListener("keydown",(e:KeyboardEvent)=>{
                    if(e.key==="Enter"){
                        this.createQuote({parent,target,divCont,btn,icon,idValues});
                    }
                });
                
            }
               
        });
            
    };


    insertDateTime({parent,target,divCont,btnClicked,idValues}:{
        parent:HTMLElement,
        target:HTMLElement|HTMLTimeElement,
        divCont:HTMLElement,
        btnClicked:HTMLButtonElement,
        icon:iconType,
        idValues:idValueType[]
    }){
        btnClicked.classList.add("active");
        const time=target as HTMLTimeElement;
        const container=document.createElement("div");
        container.className="position-relative flexCol justify-center align-center mx-auto my-auto px-1 py-2 ";
        container.style.cssText="width:200px;height:20vh;"
        const formGroup=document.createElement("form");
        formGroup.id="insertDate-formGrp";
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
        formGroup.id="insertDate-formGrp"
        const submit:btnReturnDisableType={
            parent:formGroup,
            text:"submit",
            bg:this.bgColor,
            color:"white",
            type:"submit",
            disable:true
        }
       const btn= buttonRetDisable(submit);
   
        container.appendChild(formGroup);
        parent.appendChild(container);
        input.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        formGroup.addEventListener("submit",async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const datetime=formdata.get("datetime") as string;
                const newDate=new Date(datetime as string);
                const mkDateTime=`about-${datetime.split("-")[2].split("T")[1]}`;
                const eleId=time.id;
                time.setAttribute("data-time",`${mkDateTime}`);
                time.innerHTML=newDate.toLocaleDateString();
                divCont.appendChild(target);
                parent.appendChild(divCont);
                parent.removeChild(container);
                Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
                Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                idValues.push({eleId,id:"ele_id",attValue:eleId});
                idValues.push({eleId,id:"elementId",attValue:eleId});
                idValues.push({eleId,id:"time",attValue:String(mkDateTime)});
                idValues.push({eleId,id:"attr",attValue:String(mkDateTime)});
                idValues.push({eleId,id:"divContId",attValue:divCont.id});
                
                this.elementAdder({target,idValues}).then(async(_res)=>{
                    if(_res?.ele){
                        idValues=_res.idValues
                        const ele=_res.ele as elementType;
                        divCont.setAttribute("data-placement",`${ele.placement}-A`);

                        time.addEventListener("click",(e:Event)=>{
                            if(e){
                                btnClicked.classList.toggle("active");
                                time.classList.toggle("isActive");
                               
                            }
                        });
                        this.removeMainElement({
                            parent,
                            divCont,
                            target,
                            idValues
                            });
                     
                        btn.classList.remove("active");
                    }
                });
                this._modSelector.footerPlacement();//this shifts footer placement down
                 
                
            }
        });

    };


    removeMainElement({parent,divCont,target,idValues}:{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement,idValues:idValueType[]}){
        const check=([...divCont.classList as any] as string[]).includes("isActive");
        Header.cleanUpByID(parent,"xIconDiv");
       
        if(check ){
            const css="position:absolute;transform:translate(-2px,-3px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:0px;left:0px;";
            divCont.classList.add("position-relative");
            const xIconDiv=document.createElement("div");
            xIconDiv.setAttribute("contenteditable","false");
            xIconDiv.setAttribute("is-icon","true");
            xIconDiv.className="xIconDiv";
            xIconDiv.id=`xIconDiv`;
            xIconDiv.style.cssText=`${css}`;
            const cssStyle={background:"inherit",fontSize:"inherit"};
            FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
            divCont.appendChild(xIconDiv);
            xIconDiv.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    this.removeElement({target,idValues}).then(async(res)=>{
                        if(res?.ele){
                            idValues=res.idValues
                            if(target.nodeName==="IMG"){
                                const imgKey=target.getAttribute("imgKey");
                                if(imgKey){
                                    const check=this._service.checkFreeImgKey({imgKey});
                                    if(check) return;
                                    this._service.adminImagemark(imgKey).then(async(res)=>{
                                        if(res){
                                            Misc.message({parent:parent,msg:`${imgKey}`,type_:"success",time:700});
                                        }
                                    });
                                }
                            }
                            this._modSelector.shiftPlace(res.ele.placement);///REINDEX PLACEMENT!!!!
                        }
                    });
                    Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:500});
                    setTimeout(()=>{
                        parent.removeChild(divCont);
                        this.refresh=true;
                    },480);
                    
                    
                    //resetting buttons
                    Main.initMainBtns();
                }
            });
         }else {
            Header.cleanUpByID(parent,"xIconDiv");
         }
    };


    //INSERT element- delete
   
   async elementAdder({target,idValues}:{target:HTMLElement,idValues:idValueType[]}):Promise<{ele:elementType | undefined,target:HTMLElement,idValues:idValueType[]}>{
        // adds none selector elements to modSelector.blog
       
        const node=target.nodeName.toLowerCase()
        const eleId=target.id;
        const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
        const imgKey=getImgKey?.attValue || undefined;
        const ID=( this._modSelector.elements?.length)||1;
        const blog=this._modSelector.blog;
        
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        const getImgDesc=this._modSelector.dataset.getIdValue({target,idValues,id:"imgDesc"});
        const imgDesc=getImgDesc?.attValue || "not inserted";
        const {cleaned:classes}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
        const check=this.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
        let ele:elementType|undefined={} as elementType;
        if( !check){
            
            ele={
                ...ele,
                id:ID ,
                blog_id:blog.id,
                selectorId:undefined,
                placement:this.placement,
                name:node as string,
                class:classes.join(" "),
                eleId:target.id,
                inner_html:target.innerHTML,
                cssText:target.style.cssText,
                attr:imgDesc,
                imgKey: imgKey ||undefined,
                type:undefined
            };
            idValues.push({eleId,id:"elementId",attValue:target.id});
            idValues.push({eleId,id:"elePlacement",attValue:String(this.placement)});
            idValues.push({eleId,id:"ele_id",attValue:String(ID)});
            idValues.push({eleId,id:"elePlacement",attValue:`${ele.placement}`});
            if(imgKey)idValues.push({eleId,id:"imgKey",attValue:imgKey});
            const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
            
                    getEleIds.map(kat=>{
                        const hasAttr=attrEnumArr.includes(kat.id);
                        const hasType=typeEnumArr.includes(kat.id as typeEnumType);
                        if(ele){
                            if(kat.id==="imgKey"){
                                ele.imgKey=kat.attValue;
                            }else if(hasAttr){
                                ele.attr=kat.attValue;
                            }else if(hasType){
                                ele.attr=kat.id;
                            }else{
                                ele.imgKey=undefined;
                            }
                        }
                    });
                   
                    //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                   const {idValues:retIdValues}= this._modSelector.dataset.coreDefaultIdValues({
                        target,
                        sel:null,
                        row:null,
                        col:null,
                        ele,
                        level:"element",
                        loc:"htmlElement",
                        idValues,
                        clean:false
                    });
                    idValues=retIdValues
                    //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                    //POLULATING DEFAULT VALUES AND IDVALUES TO TARGET
                    if(node==="img"){
                        const target_=target as HTMLImageElement;
                        ele.img=target_.src;
                        ele.inner_html=target_.alt;
                        if(imgDesc){
                            ele.attr=imgDesc;
                        }
                    };
                
                    this.elements=[...this.elements,ele];
                   this.placement= this.placement + 1;
                   this._modSelector.blog={...this._modSelector.blog,elements:this.elements};
                   this._modSelector.localStore({blog:this._modSelector.blog});
                   
                }
            
                return Promise.resolve({ele,target,idValues}) as Promise<{ele:elementType|undefined,target:HTMLElement,idValues:idValueType[]}>;
            
    };



     updateElement({target,idValues}:{target:HTMLElement,idValues:idValueType[]}):{ele:elementType,idValues:idValueType[],target:HTMLElement}{
        let retEle:elementType={} as elementType;
        const getAttr=this._modSelector.dataset.getIdValue({target,idValues,id:"attr"});
        const attr=getAttr?.attValue || undefined;
        const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
        const imgKey=getImgKey?.attValue ||undefined;
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive"]});
        const class_=cleaned.join(" ");
        this._elements=this.elements.map(ele=>{
            if(ele.eleId===target.id){
                ele.cssText=target.style.cssText;
                retEle.cssText=target.style.cssText;
                ele.class=class_;
                ele.inner_html=target.innerHTML;
                ele.imgKey=imgKey;
                ele.attr=attr;
                retEle=ele;
            }
            return ele;
        });
    
    this.elements=this._elements;
    this._modSelector.localStore({blog:this._modSelector.blog});
    retEle.class=target.className;
    return {ele:retEle,idValues,target}
    };


    shiftPlacement(item:{target:HTMLElement,newTarget:HTMLElement}){
        //THIS ORGANIZES PLACEMENT ORDERING
        const {target,newTarget}=item;
        //WORK ON LOGIC
        const targetEle=this._modSelector.elements.find(ele=>(ele.eleId===target.id));
        const newTargetEle=this._modSelector.elements.find(ele=>(ele.eleId===newTarget.id));
        if(!targetEle) return;
        const targetPlace=targetEle.placement;
        if(!newTargetEle) return;
        const newTargetPlace=newTargetEle.placement;
        //sort with placement
        let elements=this._modSelector.elements;
        let codes=this._modSelector.selectCodes;
        let selectors=this._modSelector.selectors.map((sel,index)=>{if(index > 0) return sel}).filter(sel=>(typeof sel==="object"));
       
        const maxcount=ModSelector.maxCount(this._modSelector.blog);
        if(maxcount>1){
            elements=elements.map((ele,index)=>{
                if(ele.placement >targetPlace){

                    if(ele.placement===newTargetPlace){
                        // console.log("IF",ele.placement,ele.inner_html)
                        ele.placement=targetPlace + 1;
                    }else if(ele.placement >targetPlace + 1){
                        // console.log("ELSE",ele.placement,ele.inner_html)
                        ele.placement=ele.placement + 1
                    }
                }
                return ele;
            });
            selectors=selectors.map(sel=>{
                if(sel.placement >targetPlace + 1 && sel.placement !==newTargetPlace){
                    sel.placement=sel.placement + 1;
                }
                return sel;
            });
            codes=codes.map(sel=>{
                if(sel.placement >targetPlace + 1 && sel.placement !==newTargetPlace){
                    sel.placement=sel.placement + 1;
                }
                return sel;
            });
            this._modSelector.elements=elements;
            this._modSelector.selectors=selectors;
            this._modSelector.selectCodes=codes;
            this._modSelector.blog={...this._modSelector.blog,elements,selectors,codes};
        }


    };


    editElement({target,idValues}:{target:HTMLElement,idValues:idValueType[]}){
        const eleId=target.id;
        target.addEventListener("input",(e:Event)=>{
            if(e){

                this.elements=this._modSelector.elements.map(ele=>{
                    if(ele.eleId===target.id){
                        ele.inner_html=target.innerHTML;
                    }
                return ele;
            });
            this._modSelector.localStore({blog:this._modSelector.blog});
        };
    });

    target.onchange=(e:Event)=>{
        if(e){
            const idValue={eleId,id:"update",attValue:`last:${eleId}`} as idValueType;
            this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
        }
    };
    };

    createImgDesc({divCont,target,element,clean,idValues}:{divCont:HTMLElement,target:HTMLImageElement,element:elementType|undefined,clean:boolean,idValues:idValueType[]}){
        const desc=document.createElement("small");
        desc.id="imgDesc";
        desc.style.cssText="margin-block:1rem;width:80%;margin-inline:auto;font-weight:bold;font-family:Poppins-Regular;";
        desc.textContent=element?.attr || "image description";
        if(clean){
            desc.removeAttribute("contenteditable");
        }else if(!clean){
            desc.setAttribute("contenteditable","true");
            this.imgDescUpdate({target,imgDesc:desc,idValues})
        }
        divCont.appendChild(desc);
    };


    imgDescUpdate(item:{target:HTMLImageElement,imgDesc:HTMLElement,idValues:idValueType[]}){
        //IMAGE DESCRIPTION IS SAVED IN ELEMENT.ATTR
        const { target,imgDesc,idValues}=item;
        const eleId=target.id;
        imgDesc.oninput=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLElement).textContent;
              console.log("value:outside",value)
                if(value){
                    const idValue={eleId,id:"imgDesc",attValue:value} as idValueType;
                    this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                    console.log("inside",value)
                    this.elements=this.elements.map(ele=>{
                        if( ele.eleId===target.id){
                            ele.inner_html=target.alt;
                            ele.attr=value;
                        }
                        return ele;
                    });
                    this.elements=this._elements;
                    this._modSelector.blog={...this._modSelector.blog,elements:this.elements};
                    this._modSelector.localStore({blog:this._modSelector.blog})
                }
            }
        };
        imgDesc.onchange=(e:Event)=>{
            if(e){
                const ele=this.elements.find(ele=>(ele.eleId===eleId));
                if(!ele) return;
                const idValue={eleId,id:"imgDesc",attValue:ele?.attr} as idValueType;
                    this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
            }
        };
    };
   

    removeElement({target,idValues}:{target:HTMLElement,idValues:idValueType[]}):Promise<{ele:elementType | undefined,idValues:idValueType[]}>{
        let ele_:elementType|undefined;

        idValues=idValues.map((kat,index)=>{
            if(kat.eleId===target.id){
                idValues.splice(index,1)
            }
            return kat;
            });
        this._modSelector.elements.map((ele,index)=>{
                if(ele.eleId===target.id){
                    this._modSelector.elements.splice(index,1);
                    ele_= ele;
                }
        });
        this.elements=this._modSelector.elements;
        this._modSelector.dataset.idValues=idValues;
        return Promise.resolve({ele:ele_,idValues}) as Promise<{ele:elementType | undefined,idValues:idValueType[]}>;
    };


    //!!!THIS IS FOR ALL FLEX AND NON FLEX ELEMENTS ON FONTACTIONS
   async fontAction(btn:HTMLButtonElement,idValues:idValueType[]){
        //THIS IS THE MAIN CONTROLLER FOR ALL NONFLEX AND FLEX ITEMS
        const isActives=(Main.container as HTMLElement).querySelectorAll("[data-is-element='true']");
        // console.log("isActives",[...isActives])
        if(isActives){
           await Promise.all([...isActives as any as HTMLElement[]].map(async(activeEle)=>{
               const getSelRowCol=activeEle.getAttribute("data-sel-row-col");
               const {isJSON,parsed}=getSelRowCol ? Header.checkJson(getSelRowCol):{isJSON:false,parsed:null};
                if(activeEle?.classList.contains("isActive")){
                    activeEle.classList.toggle(btn.id);
                    if(isJSON){
                        const selRowCol=parsed as selRowColType;
                        await this._modSelector.updateElement({target:activeEle,idValues,selRowCol});
                    }else{
                        await this._modSelector.updateElement({target:activeEle,idValues,selRowCol:null});
                    }
                   
                }
            }));
        }
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


    static removeElement(inner_html:string,ID:string){
        let arr:{name:string,id:string,pattern:RegExp,str:string,start:number,end:number,match:boolean}[]=[
            {name:"frDiv",id:ID,pattern:/<div/g,str:"",start:0,end:0,match:false},
            {name:"bkDiv",id:ID,pattern:/<\/div>/g,str:"",start:0,end:0,match:false},
            {name:"id",id:ID,pattern:/(id=")[a-zA-Z0-9"]{2,}/g,str:"",start:0,end:0,match:false},
            
        ];
        arr=arr.map(item=>{
           const matches=inner_html.matchAll(item.pattern);
            [...matches as any].map(match=>{
                item.str=match[0];
                item.start=parseInt(match.index);
                item.end=parseInt(match.index + match[0].length);
                if(match[0].includes(item.id)){
                    item.match=true;
                }
            });
            
            return item;
        });
        const hasMatch=arr.map(item=>item.match).includes(true);
        if(hasMatch){
            const start=arr.filter(item=>(item.name==="frDiv"))[0].start;
            const end=arr.filter(item=>(item.name==="bkDiv"))[0].end;
            const result1=inner_html.slice(0,start);
            const result2=inner_html.slice(end,inner_html.length);
            const result=result1 + result2;
            return result;
        }else{
            return inner_html;
        }

    };


    static addStyle(element:HTMLElement,style:string){
        //ADDS STYLE TO CSSTEXT AND MODS IMGS ON SHADOW
        const css=element.style.cssText;
        const arr:string[]=css.split(";");
        //clear style;
        arr.forEach((item,index)=>{
            if(item.startsWith(style.split(":")[0])){
                arr.splice(index,1);
            }
        });
        //add
        if(style.split(":")[1] !=="none" && element.nodeName==="IMG"){
            arr.push(style);
            arr.push("padding:0.5rem");
            arr.push("border-radius:inherit");
        }else if(style.split(":")[1]==="none"){
            const ind1=arr.indexOf("padding:0.5rem");
            const ind2=arr.indexOf("border-radius:inherit");
            if(ind1 !==-1){
                arr.splice(ind1,1);
            }
            if(ind2 !==-1){
                arr.splice(ind2,1);
            }
        }else{
            arr.push(style);
        }
        return arr.join(";")
    };;

   
}
export default HtmlElement;
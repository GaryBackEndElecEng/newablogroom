import { idValueType, selRowColType, selRowType } from "@/lib/attributeTypes";
import ModSelector from "../editor/modSelector";
import { blogType, flexChoiceType, nameValueAttrType, selectorType, userType } from "../editor/Types";
import Misc from "./misc/misc";
import Service from "./services";
import Header from "../editor/header";
import Nav from "../nav/headerNav";
import { buttonRetDisable } from "./tsFunctions";



class CommonUltils{
    public btnColor:string;
    public nameValueAttrs:nameValueAttrType[];
    public flexChoices:flexChoiceType[]
    private _selectors:selectorType[];
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:userType){
        this.btnColor=this._modSelector.btnColor;
        this._selectors=[] as selectorType[];
        this.nameValueAttrs=[
                {id:0,name:"select",value:undefined,attr:undefined,remove:undefined,level:undefined},
                {id:1,name:"image",value:"img",level:"element"},
                {id:1,name:"h1",value:"h1",level:"element"},
                {id:2,name:"h2",value:"h2",level:"element"},
                {id:3,name:"h3",value:"h3",level:"element"},
                {id:4,name:"h4",value:"h4",level:"element"},
                {id:5,name:"p",value:"p",level:"element"},
                {id:6,name:"logo",value:"img",level:"element"},
                {id:7,name:"bg-image",attr:"bg-image",level:"col"},
                {id:8,name:"rm-bg-image",level:"col",attr:"rm-bg-image"},
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
                {id:19,attr:"rm-bg-color",name:"rm-bg-color",level:"col"},
                {id:20,attr:"add-flex-image",name:"add-flex-image",level:"selector"},
                {id:21,attr:"remove-flex-image",name:"add-flex-image",level:"selector"},
                {id:22,attr:"add-flex-bg",name:"add-flex-bg",level:"selector"},
                {id:23,attr:"remove-flex-bg",name:"remove-flex-bg",level:"selector"},
                {id:24,attr:"set-even-height",name:"set-even-height",level:"col"},
                {id:25,name:"adjust-img-size",attr:"adjust-img-size",level:"element"},
                {id:26,name:"set-column-height",attr:"set-column-height",level:"col"},
                {id:27,name:"pretty-font",attr:"pretty-font",level:"element"},
                {id:28,name:"flex-normal",attr:"flex-normal",level:"col"},
                {id:29,name:"flex-static",attr:"flex-static",level:"col"},
                {id:30,name:"flex-double",attr:"flex-double",level:"col"},
                {id:31,name:"skew-45",attr:"skew-45",level:"element"},
                {id:32,name:"skew-15",attr:"skew-15",level:"element"},
                {id:33,name:"flex-row",attr:"flexRow",level:"col"},
                {id:34,name:"flex-col",attr:"flexCol",level:"col"},
                {id:35,name:"box-shadow",attr:"box-shadow-md1",level:"element"},
                {id:36,name:"round",attr:"round",level:"element"},
                {id:37,name:"shadow-round",attr:"box-shadow-round",level:"element"},
                {id:38,name:"flex-1/4",attr:"flex-quarter",level:"col"},
                {id:39,name:"flex-1/2",attr:"flex-half",level:"col"},
                // {id:33,name:"flex-3/4",attr:"flex-three-quarter",level:"col"},
                {id:40,name:"flex-default",attr:"flex-default",level:"col"},
                {id:41,name:"bg-row-color",attr:"background-row",remove:false,level:"row"},
                {id:42,name:"rm-bg-row-color",attr:"rm-bg-row-color",remove:false,level:"row"},
                {id:43,name:"bg-row-image",attr:"bg-row-image",remove:false,level:"row"},
                {id:44,name:"bg-row-height",attr:"bg-row-height",remove:false,level:"row"}
        
        ];
        this.flexChoices=[
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
            {name:"bg-shade",isEle:false,level:"col",class_:undefined},
            {name:"bg-color",isEle:false,level:"col",class_:undefined},
            {name:"rm-bg-color",isEle:false,level:"col",class_:undefined},
            {name:"bg-row-color",isEle:false,level:"row",class_:undefined},
            {name:"rm-bg-row-color",isEle:false,level:"row",class_:undefined},
            {name:"add-flex-image",isEle:false,level:"selector",class_:undefined},
            {name:"remove-flex-image",isEle:false,level:"selector",class_:undefined},
            {name:"remove-flex-bg",isEle:false,level:"selector",class_:undefined},
            {name:"add-flex-bg",isEle:false,level:"selector",class_:undefined},
            {name:"flex-end",isEle:false,class_:"col-end",level:"col"},
            {name:"flex-start",isEle:false,class_:"col-start",level:"col"},
            {name:"img-round",isEle:false,class_:"round",level:"element"},
            {name:"set-even-height",isEle:false,class_:"set-even-height",level:"col"},
            {name:"set-column-height",isEle:false,class_:"set-column-height",level:"col"},
            {name:"remove-even-height",isEle:false,level:"col"},
            {name:"cleanUp",isEle:true,level:"none"},
            {name:"remove",isEle:true,level:"none"},
        
        ];
    };

//---------------GETTERS SETTERS--------------//

get user(){
    return this._user;
};
set user(user:userType){
    this._user=user;
};

get selectors(){
    return this._modSelector.selectors;
};
set selectors(selectors:selectorType[]){
    this._modSelector.selectors=selectors;
};
//---------------GETTERS SETTERS--------------//

async selectorBgImage({target,idValues}:{target:HTMLElement,idValues:idValueType[]}){
    
    const eleId=target.id;
    const {form,reParent}=Misc.imageForm(target);
    
    reParent.style.zIndex="2";
    Header.removePopup({parent:reParent,target:form,position:"right"});
    form.onsubmit=async(e:SubmitEvent)=>{
        if(e){
            e.preventDefault();
        
            const user=this.user
            const formdata= new FormData(e.currentTarget as HTMLFormElement);
            const file=formdata.get("file") as File;
            if(file){
                this._service.generateFreeImgKey({formdata,user});
                await this._service.uploadfreeimage({formdata}).then(async(res)=>{
                    if(res){
                        target.style.backgroundImage=`url(${res.img})`;
                        target.style.backgroundSize=`100% 100%`;
                        target.style.backgroundPosition=`50% 50%`;
                    }
                });
                const idValue:idValueType={eleId,id:"backgroundImg",attValue:"backgroundImg"};
                this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                this.updateSelector({target,idValues}).then(async(_res)=>{
                    if(_res){
                        Misc.message({parent:target,type_:'success',time:600,msg:"saved"});
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



async selRemoveBgImage({target,idValues}:{target:HTMLElement,idValues:idValueType[]}){
    target.style.backgroundImage="";
    target.style.backgroundSize="";
    target.style.backgroundPosition="";
    this._modSelector.dataset.removeSubValue({idValues,target,id:"backgroundImg",eleId:target.id});
    this.updateSelector({target,idValues}).then(async(_res)=>{
        if(_res){
            Misc.message({parent:target,type_:'success',time:600,msg:"saved"});
        }
    });
   
};



updateSelector({target,idValues}:{target:HTMLElement,idValues:idValueType[]}):Promise<{target:HTMLElement,select:selectorType|undefined}>{
    const eleId=target.id;
    let select:selectorType|undefined={} as selectorType;
    this.selectors=this.selectors.map(sel=>{
        if(sel.eleId===eleId){
            sel.cssText=target.style.cssText;
            sel.class=target.className;
            sel.inner_html=target.innerHTML;
            select=sel;
        };
        return sel;
    });
    return Promise.resolve({target,select}) as Promise<{target:HTMLElement,select:selectorType|undefined}>
};


addSelectorColor({target,select}:{target:HTMLElement,select:selectorType}){
        
    const {input,label,formGrp}=Nav.inputComponent(target);
    formGrp.classList.add("text-center");
    formGrp.id="commonUltils-formGrp";
    formGrp.style.cssText="position:absolute;inset:0% 0% auto 0%;width:300px;height:auto;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:1rem;z-index:200;background-color:#0000008f;border-radius:10px;";

    input.style.cssText="width:100px;height:50px;";
    input.type="color";
    input.id="color";
    input.name="color";
    label.setAttribute("for",input.id);
    label.style.cssText="color:white;background-color:black;padding:1rem;"
    label.textContent="flexbox-color";
    input.onchange=(e:Event)=>{
        if(!e) return;
        const color=(e.currentTarget as HTMLInputElement).value;
        target.style.background=color;
        this.selectors=this.selectors.map(sel=>{
            if(sel.eleId===select.eleId){
                sel.cssText=target.style.cssText;
            };
            return sel;
        });
        target.removeChild(formGrp);
    };

};



removeSelectorColor({target,select}:{target:HTMLElement,select:selectorType}){
    target.style.backgroundColor="";
    this.selectors= this.selectors.map(sel=>{
        if(sel.eleId===select.eleId){
            sel.cssText=target.style.cssText;
        }
        return sel;
    });
};


setColumnHeight({parent,target,idValues,selRowCol}:{parent:HTMLElement,target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}):Promise<{
    parent:HTMLElement,
    popup:HTMLElement,
    idValues:idValueType[],
    selRowCol:selRowColType,
}>{
    const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center;"
    const popup=document.createElement("form");
    popup.id="commonUltils-setColumnHeight-popup";
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
    return Promise.resolve({popup,parent,idValues,selRowCol,button}) as Promise<{parent:HTMLElement,popup:HTMLElement,idValues:idValueType[],selRowCol:selRowColType,button:HTMLButtonElement}>;

};


rowHeight({column,idValues,selRowCol}:{column:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
if(!column) return;
const {selectorId,rowId}=selRowCol as selRowColType;
const selRow={selectorId,rowId} as selRowType;
const row=column.parentElement as HTMLElement;
row.style.position="relative";
const container=document.createElement('div');
container.id="commonUltils-row-height";
container.classList.add("popup");
container.setAttribute("is-popup","true");
container.style.cssText ="position:absolute;top:100%;left:50%,right:50%;width:170px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;margin-block:1rem;box-shadow:1px 1px 12px 1px black;border-radius:12px;z-index:200;padding-block;";
container.style.left="40%";
container.style.right="40%";
const {input,label}=Nav.inputComponent(container);
input.type="number";
input.placeholder="100";
input.min="100";
input.max="600";
label.textContent="row-height";
label.classList.add("text-primary");
const {button}=Misc.simpleButton({anchor:container,bg:Nav.btnColor,color:"white",text:"ok",time:300,type:"button"});
row.appendChild(container);
return Promise.resolve({row,column,button,input,container,idValues,selRowCol,selRow}) as Promise<{row:HTMLElement,column:HTMLElement,button:HTMLButtonElement,input:HTMLInputElement,container:HTMLElement,idValues:idValueType[],selRowCol:selRowColType,selRow:selRowType}>
};


columnHeight({parent,target,idValues,selRowCol}:{parent:HTMLElement,target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center;"
    const popup=document.createElement("form");
    popup.id="commonUltils-setColumnHeight-popup";
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
    parent.appendChild(popup);
    return Promise.resolve({parent,target,popup,input,button,idValues,selRowCol}) as Promise<{parent:HTMLElement,target:HTMLElement,popup:HTMLElement,input:HTMLInputElement,idValues:idValueType[],selRowCol:selRowColType}>
};



BgImage({target,blog,idValues,selRowCol}:{target:HTMLElement,blog:blogType,idValues:idValueType[],selRowCol:selRowColType}){
    //target====column
    const {selectorId,rowId}=selRowCol as selRowColType;
    const selRow={selectorId,rowId} as selRowType;
     const popup=document.createElement("div");
     popup.id="commonUltils-bgImage-popup";
     popup.className="flexCol box-shadow";
     popup.style.cssText="position:absolute;width:200px;height:200px;z-index:0;font-size:12px;z-index:200;background-color:white;";
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
     popup.appendChild(form);
     target.appendChild(popup);
     Header.removePopup({parent:target,target:popup,position:"right"});
     ModSelector.modAddEffect(popup);
     input.addEventListener("change",(e:Event)=>{
         if(e){
             btn.disabled=false;
         }
     });
     return Promise.resolve({target,popup,blog,form,btn,selRowCol,selRow,idValues}) as Promise<{target:HTMLElement,popup:HTMLElement,blog,form:HTMLFormElement,btn:HTMLButtonElement,selRowCol:selRowColType,selRow:selRowType,idValues:idValueType[]}>;

};


rowColor({row,column,selRow,idValues}:{row:HTMLElement,column:HTMLElement,idValues:idValueType[],selRow:selRowType}){
    Header.cleanUpByID(column,"commonUltils-popup-background-color");
    const css_col="display:flex;flex-direction:column;align-items:center;justify-content;center;gap:1rem;";
    row.style.position="relative";
    const popup=document.createElement("div");
    popup.style.cssText=css_col +"position:absolute;width:clamp(150px,250px,300px);height:auto;background-color:white;box-shadow:1px 1px 12px 1px black;border-radius:17px;z-index:200;border:none;inset:0% 0% auto 0%;"
    popup.id="commonUltils-popup-background-color";
    popup.className="popup";
    popup.style.inset="0% 0% auto 0% !important";
    const title=document.createElement("h6");
    title.textContent="bg-row-color";
    title.className="text-primary text-center";
    popup.appendChild(title)
    row.appendChild(popup);
    Header.removePopup({parent:row,target:popup,position:"right"});
    const {input,label,formGrp}=Nav.inputComponent(popup);
    formGrp.style.cssText=css_col;
    input.id="color";
    input.type="color";
    input.name="color";
    input.style.cssText="width:50px;height:50px;";
    input.placeholder="";
    label.textContent="color";
    label.setAttribute("for",input.id);
    return Promise.resolve({row,column,popup,input,idValues,selRow}) as Promise<{row:HTMLElement,column:HTMLElement,popup:HTMLElement,input:HTMLInputElement,idValues:idValueType[],selRow:selRowType}>
};


bgColor({column,selRowCol,idValues}:{column:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}){
    Header.cleanUpByID(column,"commonUltils-popup-background-color");
    const css_col="display:flex;flex-direction:column;align-items:center;justify-content;center;gap:1rem;";
    column.style.position="relative";
    const popup=document.createElement("div");
    popup.style.cssText=css_col +"position:absolute;width:clamp(150px,250px,300px);height:auto;background-color:white;box-shadow:1px 1px 12px 1px black;border-radius:17px;z-index:200;border:none;inset:0% 0% auto 0%;"
    popup.id="commonUltils-popup-background-color";
    popup.className="popup";
    popup.style.inset="0% 0% auto 0% !important";
    const title=document.createElement("h6");
    title.textContent="bg-column-color";
    title.className="text-primary text-center";
    popup.appendChild(title)
    column.appendChild(popup);
    Header.removePopup({parent:column,target:popup,position:"right"});
    const {input,label,formGrp}=Nav.inputComponent(popup);
    formGrp.style.cssText=css_col;
    input.id="color";
    input.type="color";
    input.name="color";
    input.style.cssText="width:50px;height:50px;";
    input.placeholder="";
    label.textContent="color";
    label.setAttribute("for",input.id);
    return Promise.resolve({column,popup,input,idValues,selRowCol}) as Promise<{column:HTMLElement,popup:HTMLElement,input:HTMLInputElement,idValues:idValueType[],selRowCol:selRowColType}>
};




};
export default CommonUltils;
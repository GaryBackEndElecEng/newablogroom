
import { FaCrosshairs } from "react-icons/fa";
import { FaCreate } from "../common/ReactIcons";
import Service from "../common/services";
import Main from "./main";
import ModSelector from "./modSelector";
import { element_selType, elementType, flexType, gets3ImgKey, iconType } from "./Types";
import Misc from "../common/misc";
import { buttonReturn, imageLoader } from "../common/tsFunctions";
import Nav from "../nav/headerNav";
import User from "../user/userMain";
import Header from "./header";

export type attributeType={
    id:number,
    name:string,
    ele?:string,
    attr?:string
}

class ShapeOutside{
    _element:elementType={} as elementType;
    initElement:elementType={} as elementType;
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
        this.icons=Main.icons;
        this.divCont_css="display:flex;align-items:center;justify-content:center;flex-direction:column;padding:0.5rem;border-radius:12px;margin-inline:3rem;padding-inline:1rem;";
        this.divCont_class="eleContainer";
        this.initElement={
            id: 0, 
            placement:0,
            selectorId:undefined,
            eleId: "",
            name: "div",
            class: "",
            inner_html:"",
            cssText: "",
            attr:"",
            img:"",
            imgKey:undefined,
            blog_id:0,
            type:"shapeoutside"
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
        return this._element;
    }
    set element(element:elementType){
        this._element=element;
    }
    //////------GETTERS/SETTERS-----/////////
    ///-----FROM HTMLEMENT CLASS///
    showShapeOutside(item:{parent:HTMLElement,flex:flexType|null,element:elementType|element_selType}){
        //FOR HTMLELEMENT ON REFRESH; HTMLELEMENT THEN GOES TO EDIT
        const {parent,flex,element}=item;
        const less900=window.innerWidth < 900;
        const less800=window.innerWidth < 800;
        const less500=window.innerWidth < 500;
        const less400=window.innerWidth < 400;
        let ele:elementType|element_selType={} as elementType|element_selType;
        ele={...element};
        const type:string=ele.type ? ele.type : "shapeoutside";
        const attr=ele.attr ? ele.attr :"data-shapeoutside-undefined";
        const cssPara="position:relative;padding:0.35rem;";
        const rand=`${Math.round(Math.random()*1000)}`;
        const para=document.createElement("p");
        para.setAttribute("type",type);
        const {parsed}=Header.checkJson(parent.getAttribute("flex"));
        let flex_={...parsed as flexType|null};
        flex_=parsed ? parsed as flexType : flex as flexType;
        if(!flex_){
            
        }else{
            if(attr.includes("circle") || attr.includes("square")){
                flex_={...flex_,shapeOutsideSquare:true};
            }else{
                flex_={...flex_,shapeOutsidePolygon:true};
            }
            
            const paraFlex=Main.flexTracker({target:para,flex:flex_ as flexType,isNew:false});
            flex_=paraFlex
        }
        const divCont=document.createElement("div");
        divCont.id=this.divCont_class;
        divCont.style.cssText=this.divCont_css;
        if((element as elementType).type){
            divCont.setAttribute("data-placememt",`${ele.placement}-A`);
        }else if(flex){
            ele=ele as element_selType
            divCont.setAttribute("data-placememt",`${ele.order}-A`);
        }
        para.setAttribute("has-innerimage","true");
        para.setAttribute("contenteditable","true");
        para.setAttribute("data-shapeoutside","true");
        para.setAttribute("name","p");
        para.setAttribute(attr,attr);
        para.setAttribute("is-element","true");
        para.classList.add("shape-outside");
        const img=document.createElement("img");
        const imgCss="max-width:350px;width:100%;float:left !important;margin-block:1rem;";
        img.setAttribute("contenteditable","false");
        img.setAttribute("is-shapeoutside","true");
        img.src=this.logo;
        img.alt="ww.ablogroom.com";
        para.id=element.eleId;
        if(attr.includes("circle")){
            para.style.cssText=cssPara +"width:100%;";
            para.classList.add("shape-outside-circle");
            img.setAttribute("is-shapeoutside-circle","true");
            img.style.cssText=imgCss + "margin-right:4rem;shape-outside:circle();border-radius:50%;";
            img.id="shape-outside-circle";
            img.style.width=less900 ? ( less400 ? "300px":"320px"):"330px";
            img.style.aspectRatio="1 / 1";
            para.appendChild(img);
        }else if(attr.includes("square")){
            para.style.cssText=cssPara +"width:100%;";
            para.classList.add("shape-outside-square");
            img.setAttribute("is-shapeoutside-square","true");
            img.style.cssText=imgCss ;
            img.id="shape-outside-square";
            img.style.width=less900 ? ( less400 ? "300px":"320px"):"330px";
            img.style.aspectRatio="1 / 1";
            para.appendChild(img);
        }else if(attr.includes("polygon")){
            divCont.style.marginBlock="2rem";
            divCont.style.paddingBlock="1rem";
            divCont.id=this.divCont_class + "-" + "poly";
            para.style.cssText=cssPara;
            para.classList.add("shape-outside-polygon");
            const imgDiv=document.createElement("div");
            imgDiv.id="polygon";
            imgDiv.setAttribute("contenteditable","false");
            imgDiv.id="polygon";
            imgDiv.setAttribute("contenteditable","false");
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
            img.setAttribute("contenteditable","false");
            img.setAttribute("is-shapeoutside","true");
            imgDiv.appendChild(img);
            para.appendChild(imgDiv);
            Misc.matchMedia({parent:imgDiv,maxWidth:920,cssStyle:{width:"300px",height:"300px"}});
            Misc.matchMedia({parent:imgDiv,maxWidth:800,cssStyle:{width:"275px",height:"275px"}});
            Misc.matchMedia({parent:imgDiv,maxWidth:500,cssStyle:{width:"220px",height:"220px"}});
            Misc.matchMedia({parent:imgDiv,maxWidth:400,cssStyle:{width:"200px",height:"200px"}});
        }
        para.innerHTML =element.inner_html;
        divCont.appendChild(para);
        parent.appendChild(divCont);
        this._modSelector.editElement(para);
        Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
        
            this.setAttributes({column:parent,divCont,target:para});//ID=shape-outside-${rand}
            this.removeMainElement({parent,divCont,target:para,show:false});
                    divCont.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            ShapeOutside.cleanUpByID(para,"setAttributes");
                            this._modSelector.updateElement(para);
                            para.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            this.removeMainElement({parent,divCont,target:para,show:true});
                            
                           
                        }
                    });
    }
    //FROM SIDEBAR BTN
    sidebarMain(parent:HTMLElement){
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        parent.style.position="relative";
        parent.style.zIndex="";
        const popup=document.createElement("div");
        popup.style.cssText="margin:auto;position:absolute;background-color:white;border-radius:18px;box-shadow:1px 1px 12px 1px black,-1px -1px 12px 1px black;padding:1rem;z-index:200;height:padding-inline:2rem;display:flex;justify-content:center;align-items:center;flex-direction:column;background-color:#0a2351;height:20vh;";
        popup.id="popup-shape-outside";
        // popup.style.top="16%";
        popup.style.left="15%";
        popup.style.right="15%";
        const title=document.createElement("h6");
        title.className="text-light text-center my-2 display-6 lean";
        title.textContent="image-text-merger:shape-outside"
        const arr=[
            {name:"select",desc:"please select below",value:"select"},
            {name:"circular image",desc:"circular image embedded within your paragraph",value:"data-shapeoutside-circle"},
            {name:"square image",desc:"square image embedded within your paragraph",value:"data-shapeoutside-square"},
            {name:"polygon image",desc:"polgon image embedded within your paragraph",value:"data-shapeoutside-polygon"},

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
            const option=document.createElement("option");
            option.innerHTML=`<span style="color:purple;font-size:18px;">${item.name}</span><span> :=> ${item.desc}</span>`;
            option.value=item.value;
            select.appendChild(option);
        });
        select.onchange=(e:Event)=>{
            if(e){
                const attr=(e.currentTarget as HTMLSelectElement).value;
                if(attr){
                    this.element={...this.element,attr:attr};
                    this.addShapeOutside({parent,flex:null,element:this.element})
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
    }

    addShapeOutside(item:{parent:HTMLElement,flex:flexType|null,element:elementType|element_selType}){
        const {parent,flex,element}=item;
        const less900=window.innerWidth < 900;
        const less800=window.innerWidth < 800;
        const less500=window.innerWidth < 500;
        const less400=window.innerWidth < 400;
        let ele:elementType|element_selType={} as elementType|element_selType;
        ele={...element};
        const type=ele.type ? ele.type : "shapeoutside";
        const attr=ele.attr ? ele.attr :"data-shapeoutside-undefined";
        const cssPara="position:relative;padding:0.35rem;";
        const rand=`${Math.round(Math.random()*1000)}`;
        const para=document.createElement("p");
        para.setAttribute("type",type);
        para.setAttribute("name","p");
        para.setAttribute("has-innerimage","true");
        para.setAttribute("contenteditable","true");
        para.setAttribute("data-shapeoutside","true");
        para.setAttribute(attr,attr);
        para.setAttribute("is-element","true");
        para.classList.add("shape-outside");
        para.style.lineHeight="2.27rem;";
        const divCont=document.createElement("div");
        divCont.id=this.divCont_class;
        divCont.style.cssText=this.divCont_css;
        const {parsed}=Header.checkJson(parent.getAttribute("flex"));
        let flex_={...parsed as flexType|null};
        flex_=parsed ? parsed as flexType : flex as flexType;
        if(!flex_){
            
        }else{
            if(attr.includes("circle") || attr.includes("square")){
                flex_={...flex_,shapeOutsideSquare:true};
            }else{
                flex_={...flex_,shapeOutsidePolygon:true};
            }
            divCont.style.marginBlock="2rem";
            const paraFlex=Main.flexTracker({target:para,flex:flex_ as flexType,isNew:true});
            flex_=paraFlex
        }
        const img=document.createElement("img");
        const imgCss="max-width:350px;width:100%;float:left !important;margin-block:1rem;";
        img.setAttribute("contenteditable","false");
        img.setAttribute("is-shapeoutside","true");
        img.src=this.logo;
        img.alt="ww.ablogroom.com";
        if(attr.includes("circle")){
            para.id=`shape-outside-circle-${rand}`;
            para.style.cssText=cssPara +"width:100%;";
            para.classList.add("shape-outside-circle");
            img.setAttribute("is-shapeoutside-circle","true");
            img.style.cssText=imgCss + "margin-right:4rem;shape-outside:circle();border-radius:50%;";
            img.id="shape-outside-circle";
            img.style.width=less900 ? ( less400 ? "300px":"320px"):"330px";
            img.style.aspectRatio="1 / 1";
            para.appendChild(img);
        }else if(attr.includes("square")){
            para.id=`shape-outside-square-${rand}`;
            para.style.cssText=cssPara +"width:100%;";
            para.classList.add("shape-outside-square");
            img.setAttribute("is-shapeoutside-square","true");
            img.style.cssText=imgCss ;
            img.id="shape-outside-square";
            img.style.width=less900 ? ( less400 ? "300px":"320px"):"330px";
            img.style.aspectRatio="1 / 1";
            para.appendChild(img);
        }else if(attr.includes("polygon")){
            para.id=`shape-outside-polygon-${rand}`;
            divCont.style.marginBlock="2rem";
            divCont.style.paddingBlock="1rem";
            divCont.id=this.divCont_class + "-" + "poly";
            para.style.cssText=cssPara;
            para.classList.add("shape-outside-polygon");
            const imgDiv=document.createElement("div");
            imgDiv.id="polygon";
            imgDiv.setAttribute("contenteditable","false");
            imgDiv.id="polygon";
            imgDiv.setAttribute("contenteditable","false");
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
            img.setAttribute("contenteditable","false");
            img.setAttribute("is-shapeoutside","true");
            imgDiv.appendChild(img);
            para.appendChild(imgDiv);
            Misc.matchMedia({parent:imgDiv,maxWidth:920,cssStyle:{width:"300px",height:"300px"}});
            Misc.matchMedia({parent:imgDiv,maxWidth:800,cssStyle:{width:"275px",height:"275px"}});
            Misc.matchMedia({parent:imgDiv,maxWidth:500,cssStyle:{width:"220px",height:"220px"}});
            Misc.matchMedia({parent:imgDiv,maxWidth:400,cssStyle:{width:"200px",height:"200px"}});
        }
        para.innerHTML +=`ENTER YOUR TEXT HERE=> ${Misc.wordGen(100)}`;
        divCont.appendChild(para);
        parent.appendChild(divCont);
        Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
        
            this.setAttributes({column:parent,divCont,target:para});//ID=shape-outside-${rand}
            this._modSelector.promElementAdder(para).then(async(res)=>{
                if(res){
                    if((res.ele as elementType).type){
                        const ele=res.ele as unknown as elementType;
                        divCont.setAttribute("data-placememt",`${ele.placement}-A`);
                    }else if(flex_){
                        const ele=res.ele as unknown as element_selType;
                        divCont.setAttribute("data-placememt",`${ele.order}-A`);
                    }
                    this.removeMainElement({parent,divCont,target:res.target,show:false});
                    divCont.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                            ShapeOutside.cleanUpByID(res.target,"setAttributes");
                            this._modSelector.updateElement(res.target);
                            para.classList.toggle("isActive");
                            divCont.classList.toggle("isActive");
                            this.removeMainElement({parent,divCont,target:res.target,show:true});
                            
                           
                        }
                    });
                    this._modSelector.editElement(res.target);
                }
            });
        
        
       
    }
   
  
    removeMainElement(item:{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement,show:boolean}){
        const {parent,divCont,target,show}=item;
        divCont.style.position="relative";
        divCont.style.zIndex="";
        const isActive=([...target.classList as any] as string[]).includes("isActive");
        const getxDiv=divCont.querySelector("div#xIconDiv-shapOutside") as HTMLElement;
        const {isJSON}=Header.checkJson(target.getAttribute("flex"));
        
        if(!show){
            const rand=Math.round(Math.random()*1000);
            const css="position:absolute;transform:translate(-2px,-3px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:0px;right:0px;";
            divCont.classList.add("position-relative");
            const xIconDiv=document.createElement("div");
            xIconDiv.setAttribute("contenteditable","false");
            xIconDiv.setAttribute("is-icon","true");
            xIconDiv.className="xIconDiv-shapeOutside";
            xIconDiv.id=`xIconDiv-shapeOutside`;
            xIconDiv.style.cssText=`${css}`;
            if(isJSON){
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
                   
                    this._modSelector.promRemoveElement(target).then(async(res)=>{
                        if(res){
                                Misc.message({parent,msg:`removed : ${res.eleId}`,type_:"success",time:800});
                                if((res as elementType).type){
                                    const ele=res as elementType;
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
            if(getxDiv){
                if(isActive){
                    getxDiv.style.display="flex";
                }else{
                    getxDiv.style.display="none";
                }

            }
         }
    }
    setAttributes(item:{column:HTMLElement,divCont:HTMLElement,target:HTMLParagraphElement}){
        const {column,divCont,target}=item;
        // console.log("setAttributes=>column",column)
        const {isJSON,parsed}=Header.checkJson(target.getAttribute("flex"));
        const flex= parsed as flexType|null;
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
        if(!isJSON){
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
                        this.selectAdjustSize(column,divCont,target);
                    }else if(item.name==="color"){
                        // ShapeOutside.cleanUpByID(divCont,"setAttributes");
                        divCont.classList.add("isActive");
                        target.classList.add("isActive");
                        this.selectParaColor(column,divCont,target);
                    }else if(item.name==="upload image"){
                        // ShapeOutside.cleanUpByID(divCont,"setAttributes");
                        divCont.classList.add("isActive");
                        target.classList.add("isActive");
                        ([...target.children as any] as HTMLElement[]).map(child=>{
                            if(child && child.nodeName==="IMG"){
                                const img=child as HTMLImageElement;
                                return this.uploadImage(column,divCont,target,img);

                            }
                        });
                    }
                }else if(item.attr && item.attr !=="remove"){
                    const subCont=([...target.children as any] as HTMLElement[]).find(child=>(child.nodeName !=="IMG"));
                    this.selectChangeAttribute(divCont,subCont,target,item.attr);
                }else{
                    // ShapeOutside.cleanUpByID(target,"setAttributes");
                    ShapeOutside.cleanUpByID(divCont,"setAttributes");
                    ShapeOutside.cleanUpByID(target,"selectChangeAttribute");
                    return 
                }
            }
        }
    }

    selectAdjustSize(column:HTMLElement,divCont:HTMLElement,target:HTMLElement){
        //para level
        const {isJSON}=Header.checkJson(column.getAttribute("flex"));
        if(isJSON){
            this.adjustImgSize(column,target);
        }else{
            this.adjustImgSize(divCont,target);
        }
        
    }
    selectParaColor(column:HTMLElement,divCont:HTMLElement,target:HTMLElement){
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
                    this._modSelector.promUpdateElement({target}).then(async(res)=>{
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
    selectChangeAttribute(divCont:HTMLElement,subCont:HTMLElement|undefined,target:HTMLElement,key:string){
        target.style.zIndex="0";
        const {isJSON}=Header.checkJson(target.getAttribute("flex"));
        ShapeOutside.cleanUpByID(target,"selectChangeAttribute");
        const popup=document.createElement("div");
        popup.setAttribute("is-popup","true");
        popup.id="selectChangeAttribute";
        popup.style.cssText="position:absolute;display:flex;flex-direction:column;align-items:center;z-index:200";
        popup.style.width="clamp(250px,300px,400px)";
        if(isJSON){
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
            this.font_family(divCont,target);
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
                    // target.removeChild(popup);
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
                        target.style.lineHeight=`${lineHeight}px`;
                        setTimeout(()=>{this._modSelector.updateElement(target)},0);
                        ShapeOutside.cleanUpByID(divCont,"selectChangeAttribute");
                        divCont.classList.toggle("isActive");
                        target.classList.toggle("isActive");
                        // target.removeChild(popup);
                    return;
                    case marginRight !==null:
                        target.style.marginRight=`${marginRight}px`;
                        divCont.style.marginRight=`${marginRight}px`;
                               target.classList.toggle("isActive");
                               divCont.classList.toggle("isActive");
                        setTimeout(()=>{this._modSelector.updateElement(target)},0);
                        ShapeOutside.cleanUpByID(divCont,"selectChangeAttribute");
                        // target.removeChild(popup);
                    return;
                    
                    default:
                        ShapeOutside.cleanUpByID(target,"setAttributes");
                           return  ShapeOutside.cleanUpByID(target,"setAttributes");
                }
            }
        });
       
        
    }
    font_family(column:HTMLElement,target:HTMLElement){
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
                        Misc.fadeOut({anchor:popup,xpos:40,ypos:100,time:400});
                        setTimeout(()=>{parent.removeChild(popup);},398);
                        setTimeout(()=>{
                            return this._modSelector.updateElement(target);
                        },0);
                        ShapeOutside.cleanUpByID(target,"setAttributes");
                        return  ShapeOutside.cleanUpByID(target,"setAttributes");
                    }
                }
            };

    }

    adjustImgSize(column:HTMLElement,target:HTMLElement){
        ([...target.children as any] as HTMLElement[]).map(child=>{
            if(child && (child.nodeName==="IMG" && child.id!=="shape-outside-polygon")){
                const img_or_poly=child as HTMLImageElement | HTMLElement;
                this.adjustSize(column,target,img_or_poly);
                
            }else if(child){
                ([...child.children as any] as HTMLElement[]).map(ch=>{
                    if(ch && ch.nodeName==="IMG"){
                        const img=ch as HTMLImageElement;
                        this.adjustSize(column,target,img);
                    }
                });
            }
        });
    }
    //parent:adjustImgSize() :GENERATED FROM POPUP LIS
    adjustSize(column:HTMLElement,target:HTMLElement,img_or_poly:HTMLImageElement|HTMLElement){
        ShapeOutside.cleanUpByID(target,"adjustSize");
        column.style.zIndex="0";
        target.classList.add("isActive");
        (target.parentElement as HTMLElement).classList.add("isActive");
        // const startWidth=img_or_poly.style.width;
        // let polyNum="50% 0%,75% 25%,100% 50%,100% 50%,100% 50%,100% 50%, 90% 50%,80% 60%,70% 70%, 50% 80%,50% 80%,30% 90%";
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
        // let width_=parseInt(`${startWidth.split("px")[0]}`);
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
                setTimeout(()=>{
                    ShapeOutside.cleanUpByID(column,"adjustSize");

                },395);
                setTimeout(()=>{this._modSelector.updateElement(target)},0);
                ShapeOutside.cleanUpByID(target,"setAttributes");
                (target.parentElement as HTMLElement).classList.toggle("isActive");
                target.classList.toggle("isActive");
                return  ShapeOutside.cleanUpByID(target,"setAttributes");
            }
        });
    }
    uploadImage(column:HTMLElement,divCont:HTMLElement,para:HTMLParagraphElement,img:HTMLImageElement){
        //polygon
        
        const {isJSON,parsed}=Header.checkJson(para.getAttribute("flex"));
        if(isJSON){
            column.classList.add("coliIsActive");
        }
        divCont.style.position="relative";
        divCont.style.zIndex="";
        // ShapeOutside.cleanUpByID(para,"popup")
            if(divCont && para && img){
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
                if(isJSON){
                    column.appendChild(popup);
                }else{
                    divCont.appendChild(popup);
                }
                input.onchange=(e:Event)=>{
                    if(e){
                        button.disabled=false;
                    }
                };
                
                form.addEventListener("submit",(e:SubmitEvent)=>{
                    if(e){
                        e.preventDefault();
                        const user=this._user.user
                        const formdata=new FormData(e.currentTarget as HTMLFormElement);
                        const file=formdata.get("file") as File;
                        if(!file){
                            if(isJSON){
                             return Misc.message({parent:column,msg:`could not find file`,type_:"error",time:700});}else{
                                return Misc.message({parent:para,msg:`could not find file`,type_:"error",time:700});
                             };
                            }
                        const url=URL.createObjectURL(file as File);
                        const {Key}=this._service.generateFreeImgKey({formdata,user}) as {Key:string};
                        img.src=url;
                        this._service.uploadfreeimage({parent:column,formdata}).then(async(res)=>{
                            if(res){
                                const {isJSON,parsed:flex}=Header.checkJson(para.getAttribute("flex"));
                                if(isJSON){
                                    const flex_={...flex,imgKey:Key,isShapeOutside:true,level:"element"}
                                    para.setAttribute("flex",JSON.stringify(flex_));
                                }
                                img.setAttribute("imgKey",res.Key);
                                img.setAttribute("data-shapeoutside","true");
                                para.setAttribute("data-shapeoutside","true");
                                para.setAttribute("type","shapeoutside");
                                const getImgWidth=parseInt(window.getComputedStyle(img).getPropertyValue("width").split("px")[0]);
                                const width= getImgWidth ? getImgWidth : 300;
                                img.src=imageLoader({src:res.img,width:width,quality:75});
                                img.alt=res.Key
                                this._modSelector.promUpdateElement({target:para}).then(async(res)=>{
                                    if(res){
                                        Misc.message({parent:column,msg:" saved",type_:"success",time:900});
                                    }
                                });
                            }
                        });
                        img.setAttribute("is-shapeOutside","true");
                        Misc.blurIn({anchor:img,blur:"20px",time:700});
                        setTimeout(()=>{
                            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                            if(isJSON){
                                setTimeout(()=>{column.removeChild(popup);},390);
                                // column.classList.toggle("coliIsActive");
                            }else{
                                setTimeout(()=>{divCont.removeChild(popup);},390);
                            }
                            // HtmlElement.cleanUpWithID(para,"popup");
                            divCont.classList.toggle("isActive");
                            para.classList.toggle("isActive");
                            // ShapeOutside.cleanUpByID(para,"popup")
                        },380);
                        this._modSelector.updateElement(para);
                        img.setAttribute("is-shapeoutside","true");
                        if(isJSON){
                            const flex=parsed as flexType;
                            img.setAttribute("flex",JSON.stringify(flex));
                        }else{
                            img.setAttribute("para-id",`${para.id}`);
                        }
                        const blog=this._modSelector._blog;

                        // this._user.askSendToServer({bg_parent:para,formdata,image:img,blog,oldKey:null});
                    }
                },true);
                xdiv.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        Misc.fadeOut({anchor:popup,xpos:50,ypos:100,time:400});
                        if(isJSON){
                            setTimeout(()=>{column.removeChild(popup);},380);
                        }else{
                            setTimeout(()=>{divCont.removeChild(popup);},380);
                        }
                    }
                });
               
                
            }
    }

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
        // console.log("perc",xy_perc);
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
   
    // static deleteItem(target:HTMLElement){
    //     const divIcon=document.createElement("div");
    //     divIcon.style.cssText="position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;";

    // }
    selectFileFormComponent(parent:HTMLElement){
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
                                    this._user.refreshImageShow(parent,img,formdata,null);
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
    }
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
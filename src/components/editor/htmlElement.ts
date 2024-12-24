import { FaCrosshairs } from "react-icons/fa";
import Service from "../common/services";
import User from "../user/userMain";
import { elementType, focusOptions, iconType } from "./Types";
import ModSelector from "./modSelector";
import { FaCreate } from "../common/ReactIcons";
import Main from "./main";
import { btnReturnDisableType, buttonRetDisable, buttonReturn } from "../common/tsFunctions";
import Misc from "../common/misc";
import Flexbox from "./flexBox";
import Header from "@/components/editor/header";
import ShapeOutside from "./shapeOutside";
import Reference from "./reference";
import { maxCount } from './modSelector';



class HtmlElement {
    logo:string="/images/gb_logo.png";
    _placement:number;
    reference:Reference;
    static imgDesc_css:string="align-self:start;margin-top:1rem;color:black;font-weight:bold;font-style:italic;margin-inline:0px;border-radius:10px;";
    urlImg:string;
    bgColor:string;
    btnColor:string;
    refresh:boolean;
    divCont_css:string;
    divCont_class:string;
    _elements:elementType[];
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,public shapeOutside:ShapeOutside){
        this.bgColor=this._modSelector._bgColor;
        this.btnColor=this._modSelector.btnColor;
        this._elements=this._modSelector._elements;
        this.reference=new Reference(this._modSelector);
        this.divCont_css="margin:0px;padding:1rem;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;padding-inline:1.25rem;margin-inline:auto;border-radius:8px;width:100%;";
        this.refresh=false;
        this.divCont_class="eleContainer";
        this.urlImg="http://localhost:3000/images/gb_logo.png";
        Flexbox.getPlacement().then(async(value)=>{
            if(value){
                this.placement=parseInt(value)
            }
        });
    }
    //////------GETTERS/SETTERS-----/////////
    get placement(){
        const getPlace=localStorage.getItem("placement");
        // console.log("164:",getPlace)
        if(getPlace){
            return parseInt(getPlace)
        }else{
            return 1;
        }
    }
    set placement(placement:number){
        this._placement=placement;
        localStorage.setItem("placement",JSON.stringify(placement))
    }
    get elements(){
        return this._modSelector.elements;
    }
    set elements(elements:elementType[]){
        this._modSelector.elements=elements;
    }
    //////------GETTERS/SETTERS-----/////////
    ///-------------INJECTION/SOW WORK------------------///
    async showElement(parent:HTMLElement,element:elementType){
        const less400=window.innerWidth < 400;
        //THIS IS USED DURING REFRESH (PULLING LOCALSTORAGE.GETITEM(BLOG)) AND DISPLAYING I ON THE PAGE IN REFERENCE TO PLACEMENT NUMBERING BETWEEN ELEMENTS AND SELECTORS
        await this.asyncElement({parent,element}).then(async(res)=>{
            if(res){

                const checkEle=["p","h1","h2","h3","h4","h5","h6","div","blockquote","ul","hr"].includes(element.name);
                const checkULPlus=["blockquote","ul","ol"].includes(element.name)
                // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
                Main.container=document.querySelector("section#main") as HTMLElement;
                const checkBgShade=([...(Main.container as HTMLElement).classList as any] as string[]).includes("bgShade");
                const {isJSON}=Header.checkJson(element.attr as string)
                const isArrLink=isJSON ? true:false;//LINK REFERENCES
                if(checkBgShade){
                    res.ele.classList.add("background-bgShade");
                    res.divCont.classList.add("background-bgShade");
                }
                
                // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
                switch(true){
                    case checkEle:
                        if(isArrLink){
                            if(element.attr as string){
                                res.ele.setAttribute("contenteditable","false");
                                const arrLink=JSON.parse(element.attr as string) as {name:string,link:string}[];
                                if(arrLink && arrLink.length>0){
                                    //REF: Reference Class for Reference Links
                                    this.reference.showLinks({parent:res.divCont,ele:element});
                                }
                    
                            }
                        }else{
        
                            res.ele.innerHTML=element.inner_html;
                            res.ele.setAttribute("contenteditable","true");
                        }
                        if(element.attr==="data-backgroundImage"){
                            res.ele.setAttribute(element.attr,"true");
                            if(element.imgKey){
                                res.ele.setAttribute("imgKey",element.imgKey);
                                const cssStyle={backgroundPosition:"50% 50%",backgroundSize:"100% 100%"};
                            //    await this._service.injectBgAwsImage({target:res.ele,imgKey:element.imgKey,cssStyle});
                            }
                        }else if(element.attr==="data-shapeoutside-circle"){
                            res.ele.setAttribute("data-shapeoutside-circle","true");
                            res.ele.style.display=less400 ? "flex":"block";
                            res.ele.style.flexDirection=less400 ? "column":"";
                            // console.log("element.attr",element.attr,"element.imgKey",element.imgKey)
                            this.shapeOutside.setAttributes({column:parent,divCont:res.divCont,target:res.ele as HTMLParagraphElement});//ID=shape-outside-${rand}
                            if(element.imgKey){
                                res.ele.setAttribute("imgKey",element.imgKey);
                            //    await this.shapeOutside.shapeOutsideInjectImage({para:res.ele,imgKey:element.imgKey});
                            }
                        }else if(element.attr==="data-shapeoutside-square"){
                            res.ele.setAttribute("data-shapeoutside-square","true");
                            res.ele.style.display=less400 ? "flex":"block";
                            res.ele.style.flexDirection=less400 ? "column":"";
                            this.shapeOutside.setAttributes({column:parent,divCont:res.divCont,target:res.ele as HTMLParagraphElement});//ID=shape-outside-${rand}
                            if(element.imgKey){
        
                                res.ele.setAttribute("imgKey",element.imgKey);
                                // await this.shapeOutside.shapeOutsideInjectImage({para:res.ele,imgKey:element.imgKey});
                            }
                        }else if(element.attr==="data-shapeoutside-polygon"){
                            res.ele.setAttribute("data-shapeoutside-polygon","true");
                            res.ele.style.display=less400 ? "flex":"block";
                            res.ele.style.flexDirection=less400 ? "column":"";
                            this.shapeOutside.setAttributes({column:parent,divCont:res.divCont,target:res.ele as HTMLParagraphElement});//ID=shape-outside-${rand}
                            if(element.imgKey){
        
                                res.ele.setAttribute("imgKey",element.imgKey);
                            //    await this.shapeOutside.shapeOutsideInjectImage({para:res.ele,imgKey:element.imgKey});
                            }
                        }else if(element.attr==="is-vendiagram"){
                            res.ele.setAttribute(element.attr,"true");
                        }else if(element.attr==="is-wave"){
                            res.ele.setAttribute(element.attr,"true");
                        }else if(element.attr==="is-arch"){
                            res.ele.setAttribute(element.attr,"true");
                        }else if(element.attr==="data-circle-design"){
                            res.ele.setAttribute(element.attr,"true");
                            res.ele.setAttribute("contenteditable","false");
                            [...res.ele.children as any].map(el=>{
                                if(el && el.nodeName==="P"){
                                    res.ele.setAttribute("contenteditable","true");
                                }
                            });
                            
                        }
                        
                        res.ele.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                res.ele.classList.toggle("isActive");
                                res.divCont.classList.toggle("isActive");
                                const check=([...res.ele.classList as any] as string[]).includes("isActive")
                                this.removeMainElement(parent,res.divCont,res.ele);
                                if(check){
                                   
                                   
                                }else{
                                    
                                }
                            }
                        });
                        Misc.blurIn({anchor:res.divCont,blur:"20px",time:700});
                        ShapeOutside.cleanUpByID(res.ele,"popup");
                        ShapeOutside.cleanUpByID(res.ele,"setAttributes");
                        this.editElement(res.ele);
                        Misc.matchMedia({parent:res.divCont,maxWidth:400,cssStyle:{paddingInline:"0px",marginInline:"0px;"}});
                    return;
                    case element.name==="img":
                        const imgKey=element.imgKey ? element.imgKey :"";
                        const img=res.ele as HTMLImageElement;
                        img.alt=element.inner_html;
                        img.setAttribute("is-element","true");
                        img.setAttribute("contenteditable","false");
                        res.ele.setAttribute("imgKey",imgKey);
                        img.className=element.class;
                        img.id=element.eleId;
                        img.src=element.img ? element.img as string : this.urlImg;
                        const desc=document.createElement("SMALL");
                        desc.setAttribute("contenteditable","true");
                        desc.style.cssText=HtmlElement.imgDesc_css;
                        if(element.attr){
                            img.setAttribute("imgDesc",element.attr);
                            desc.textContent=element.attr;
                        }
                        res.divCont.appendChild(desc);
                        this.imgDescUpdate({target:img,imgDesc:desc});//updates desd editing
                        if(imgKey){
                            const res_= await this._service.getSimpleImg(imgKey);
                            if(res_ && res_.img && res_.Key){
                                (res.ele as HTMLImageElement).src=res_.img;
                                (res.ele as HTMLImageElement).alt=res_.Key as string;
                            }
                        }
                        (res.ele as HTMLImageElement).style.cssText=`${element.cssText};max-height:50vh;`;
                        Misc.blurIn({anchor:res.divCont,blur:"20px",time:700});
                        if(imgKey===""){
                            this._user.refreshImageShow(res.divCont,res.ele as HTMLImageElement,null,null);
                        }
                        res.ele.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                res.divCont.classList.toggle("isActive");
                                
                                ([...res.divCont.classList as any] as string[]).map(cl=>{
                                    if(cl==="isActive"){
                                       return res.ele.classList.add("isActive");
        
                                    }else{
                                        return res.ele.classList.remove("isActive");
                                    }
                                });
                                this.removeMainElement(parent,res.divCont,res.ele);
                                
                            }
                        });
                        Misc.matchMedia({parent:res.divCont,maxWidth:400,cssStyle:{paddingInline:"0px",marginInline:"0px;"}});
                    return;
                    case element.name==="time":
                        res.ele.innerHTML=element.inner_html;
                        res.ele.setAttribute("datetime",`${element.inner_html}`)
                        Misc.blurIn({anchor:res.divCont,blur:"20px",time:700});
                        res.ele.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                res.ele.classList.toggle("isActive");
                                res.divCont.classList.toggle("isActive");
                                if(ModSelector.isActive(res.ele)){
                                    this.removeMainElement(parent,res.divCont,res.ele);
                                    }
                            }
                        });
                    return;
                    case element.name==="a":
                        const link1=element.attr as string;
                        res.ele.innerHTML=element.inner_html;
                        (res.ele as HTMLAnchorElement).href="#";
                        res.ele.onclick=()=>{return window.open(link1,"_blank")};
                        Misc.blurIn({anchor:res.divCont,blur:"20px",time:700});
                        res.ele.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                res.ele.classList.toggle("isActive");
                                res.divCont.classList.toggle("isActive");
                                if(ModSelector.isActive(res.ele)){
                                    this.removeMainElement(parent,res.divCont,res.ele);
                                    }
                            }
                        });
                    return;
                    case checkULPlus:
                        const link=element.attr as string;
                        res.ele.innerHTML=element.inner_html;
                        (res.ele as HTMLAnchorElement).href="#";
                        res.ele.onclick=()=>{return window.open(link,"_blank")};
                        Misc.blurIn({anchor:res.divCont,blur:"20px",time:700});
                        const par1=res.ele.parentElement as HTMLElement;
                        res.ele.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                res.ele.classList.toggle("isActive");
                                res.divCont.classList.toggle("isActive");
                                this._modSelector.showRemoveItem(parent,res.divCont,par1);
                            }
                        });
                    return;
                    default:
                        return;
                }
            }
        });

        
    };
    async asyncElement(item:{parent:HTMLElement,element:elementType}):Promise<{divCont:HTMLElement,ele:HTMLElement}>{
        const {parent,element}=item;
        const less400=window.innerWidth < 400;
        parent.style.position="relative";
        const divCont=document.createElement("div");
        divCont.className=this.divCont_class;
        divCont.setAttribute("data-placement",`${element.placement}`);
        divCont.style.cssText=this.divCont_css;
        divCont.style.paddingInline=less400 ? "0.25rem":"1.5rem";
        const ele=document.createElement(element.name);
        ele.setAttribute("name",element.name);
        ele.setAttribute("data-placement",`${element.placement}`);
        ele.setAttribute("is-element","true");
        ele.setAttribute("aria-selected","true");
        ele.setAttribute("contenteditable","true");
        ele.classList.remove("isActive");
        ele.id=element.eleId;
        ele.className=element.class.split(" ").filter(cl=>(cl !=="box-shadow")).join(" ");
        // console.log("768:modSelector:element className",ele.className);
        ele.classList.toggle("isActive");
        ele.style.cssText=`${element.cssText}`;
        divCont.appendChild(ele);
        parent.appendChild(divCont);
        return new Promise(resolve=>{
            resolve({divCont,ele});
        }) as Promise<{divCont:HTMLElement,ele:HTMLElement}>;
    }
    ///-------------INJECTION/SOW WORK------------------///
    appElement(parent: HTMLElement,btn:HTMLElement, icon:iconType) {
        //THIS ADDS ELEMENTS OTHER THAN UL,BLOCKQUOTE,TIME,A,IMG FROM MAIN CLASS
        const divCont=document.createElement('div');
        divCont.className=this.divCont_class;
        divCont.style.cssText=this.divCont_css;
        const target = document.createElement(icon.name); //ICON.NAME=ELE TYPE
        btn.classList.add(icon.display);
        target.id=`${icon.name}-${Math.round(Math.random()*1000)}`
        target.innerHTML = icon.name;
        if(icon.name==="p"){
            target.style.cssText = "border-radius:6px;text-wrap:wrap;line-height:1.85rem;font-size:1.25rem;";
        }else{
            target.style.cssText = "border-radius:6px;";

        }
        this.addAttribute({target,divCont,icon}).then(async(resAtt)=>{
            if(resAtt){
                if(resAtt.target.nodeName==="UL" || resAtt.target.nodeName==="OL"){
                    resAtt.target.style.lineHeight="1.85rem";
                }
                this.promElementAdder(resAtt.target).then(async(res)=>{
                    if(res){
                        const ele=res.ele as elementType;
                        divCont.setAttribute("data-placement",`${ele.placement}-A`)
                        this._modSelector.count=this._modSelector.count + 1;
                        this._modSelector.footerPlacement();//this shifts footer placement down
                        res.target.addEventListener("click", (e: MouseEvent) => {
                            if (e) {
                                // console.log("click : 521:",target)
                                btn.classList.toggle("active");
                                res.target.classList.add(icon.name);
                                res.target.classList.toggle("isActive");
                                divCont.classList.toggle("isActive");
                                const focusOptions: focusOptions = { focusVisible: false, preventScroll: false }
                                res.target.focus(focusOptions);
                                this._modSelector.updateElement(target);
                                if(([...target.classList as any] as string[]).includes("isActive")){
                                    this.removeMainElement(parent,divCont,res.target);
                                }
                                
                            }
                        });
                        this._modSelector.editElement(res.target)//pulls flex if exist from target attrubutes
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
        
        
    }
    addAttribute(item:{target:HTMLElement,divCont:HTMLElement,icon:iconType|null}):Promise<{target:HTMLElement,divCont:HTMLElement}>{
        //ADDS ATTRIBUTES ONLY
        const {target,divCont,icon}=item;
        if(icon){
            target.setAttribute("name",icon.name);
            target.setAttribute("data-name-id",`${icon.name}-${target.id}`);

        }
        divCont.setAttribute("data-placement",`${this.placement}`);
        target.setAttribute("data-placement",`${this.placement}`);
        target.classList.add("position-relative");
        target.setAttribute("is-element","true");
        target.setAttribute("contenteditable","true");
        target.setAttribute("aria-selected","true");
        target.style.cssText="margin-inline:8px;padding-inline:2rem;width:100% !important;position:relative;";
        target.classList.add("box-shadow");
        target.classList.add("element");
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
        Main.container=document.querySelector("section#main") as HTMLElement;
        const checkBgShade=([...(Main.container as HTMLElement).classList as any] as string[]).includes("bgShade");
        if(checkBgShade){
            target.classList.add("background-bgShade");
            divCont.classList.add("background-bgShade");
        }
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
        return new Promise(resolver=>{
            resolver({target,divCont})
        }) as Promise<{target:HTMLElement,divCont:HTMLElement}>;
    }
    
    //FROM DESIGN
    designElement(parent: HTMLElement,eleName:string,text:string,class_:string){
        //THIS ADDS ELEMENTS OTHER THAN UL,BLOCKQUOTE,TIME,A,IMG FROM MAIN CLASS
        const less400=window.innerWidth < 400;
        const divCont=document.createElement('div');
        divCont.className=this.divCont_class;
        divCont.style.cssText=this.divCont_css;
        divCont.style.paddingInline=less400 ? "0rem":"1.5rem";
        divCont.setAttribute("data-placement",`${this.placement}`);
        const target = document.createElement(eleName); //ICON.NAME=ELE TYPE
        target.id=`${"design"}-${Math.round(Math.random()*1000)}`;
        // this.docSelect(target,icon);
        target.textContent=text;
        target.setAttribute("name",eleName);
        target.setAttribute("data-name-id",target.id);
        target.classList.add("position-relative");
        target.setAttribute("is-element","true");
        target.setAttribute("contenteditable","true");
        target.setAttribute("aria-selected","true");
        target.style.cssText="margin-inline:8px;padding-inline:2rem;width:100% !important;position:relative;border-radius:6px;text-wrap:pretty;";
        target.classList.add("box-shadow");
        target.classList.add("element");
        target.classList.add(class_);
        target.setAttribute("data-placement",`${this.placement}`);
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
        Main.container=document.querySelector("section#main") as HTMLElement;
        const checkBgShade=([...(Main.container as HTMLElement).classList as any] as string[]).includes("bgShade");
        if(checkBgShade){
            target.classList.add("background-bgShade");
            divCont.classList.add("background-bgShade");
        }
        if(eleName==="p"){
            target.style.lineHeight="1.75rem";
        }
        // ADDING BACKGROUND WHITE TO ELEMENTS WITH BACKGROUND COLOR
        divCont.appendChild(target);
        parent.appendChild(divCont);
        Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
        Misc.fadeIn({anchor:divCont,xpos:60,ypos:100,time:600});
        this.promElementAdder(target).then(async(res)=>{
            if(res){
                const ele=res.ele as elementType;
                this._modSelector.count=this._modSelector.count + 1;
                divCont.setAttribute("data-placment",`${ele.placement}-A`);
                this._modSelector.footerPlacement();//this shifts footer placement 
                const maxcount=ModSelector.maxCount(this._modSelector.blog);
                localStorage.setItem("placement",String(maxcount+1));
                res.target.addEventListener("click", (e: MouseEvent) => {
                    if (e) {
                        // console.log("click : 521:",target)
                        res.target.classList.toggle("isActive");
                        divCont.classList.toggle("isActive");
                        const focusOptions: focusOptions = { focusVisible: false, preventScroll: false }
                        target.focus(focusOptions);
                        this._modSelector.updateElement(res.target);
                        if(([...target.classList as any] as string[]).includes("isActive")){
                            this.removeMainElement(parent,divCont,res.target);
                        }
                        
                    }
                });
            }
        });
       
        this._modSelector.editElement(target)//pulls flex if exist from target attrubutes
        Misc.matchMedia({parent:divCont,maxWidth:400,cssStyle:{paddingInline:"0px",marginInline:"0px;"}});
        
        
    }
    addImage(parent:HTMLElement,btnClicked:HTMLButtonElement,icon:iconType):void{
        const width=window.innerWidth <900 ? 100 : 80;
        const rand=Math.round(Math.random()*1000);
        parent.style.position="relative";
        btnClicked.classList.add("active");
        btnClicked.classList.add(icon.display);
        const floatContainer=document.createElement("div");
        floatContainer.style.cssText="position:absolute;z-index:200;display:flex;justify-content:center;align-items:center;gap:1rem;";
        floatContainer.style.inset="20% 35% 50% 35%";
        parent.classList.add("position-relative");
        parent.classList.add("z-0");
        floatContainer.classList.add("select-image-container");
        floatContainer.classList.add("flexCol");
        const form=document.createElement("form");
        form.id=`add-image-${rand}`;
        form.classList.add("group-form");
        form.classList.add("flexCol");
        const input=document.createElement("input") as HTMLInputElement;
        input.type="file";
        input.name="file";
        input.id="file-image";
        form.appendChild(input);
        buttonReturn({parent:form,bg:this.btnColor,color:"white",type:"submit",text:"submit"});
        floatContainer.appendChild(form);
        parent.appendChild(floatContainer);
        Misc.fadeIn({anchor:floatContainer,xpos:50,ypos:100,time:500});
        form.addEventListener("submit",(e:SubmitEvent)=>{
            e.preventDefault();
            if(e && e.currentTarget){
                const formelement= new FormData(e.currentTarget as HTMLFormElement);
                const file=formelement.get("file");
                const image=URL.createObjectURL(file as File);
                //creating container && img
                const divCont=document.createElement("div");
                divCont.classList.add("element");
                divCont.id=this.divCont_class;
                divCont.style.cssText=this.divCont_css + "margin-block:1rem;";
                divCont.className=" eleContainer";
                divCont.style.display="grid";
                const img=document.createElement("img");
                img.id=`img-${Math.round(Math.random()*1000)}`
                img.setAttribute("is-element","true");
                img.setAttribute("name","img");
                img.src=image ? image : this.urlImg;
                img.alt="image";
                img.setAttribute("contenteditable","false");
                img.classList.add("image");
                img.style.cssText=`position:relative !important;margin-inline:auto;border-radius:12px;border-radius:6px;max-height:50vh;`;
                img.style.maxHeight="50vh !important";
                img.setAttribute("imgKey","");
                const desc=document.createElement("small");
                desc.style.cssText=HtmlElement.imgDesc_css;
                desc.setAttribute("contenteditable","true");
                desc.textContent="add description";
                img.setAttribute("imgDesc",desc.textContent); 
                divCont.appendChild(img);
                divCont.appendChild(desc);
                parent.appendChild(divCont);
                Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
                Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                Misc.blurIn({anchor:divCont,blur:"20px",time:600});
                parent.removeChild(floatContainer);
                btnClicked.classList.remove("active");
                const blog=this._modSelector.blog;
                const {Key}=this._service.generateImgKey(formelement,blog) as {Key:string};
                img.setAttribute("imgKey",Key);
                this.promElementAdder(img).then(async(res)=>{
                    if(res){
                        const ele=res.ele as elementType;
                        divCont.setAttribute("data-placement",`${ele.placement}-A`);
                        // console.log("IMG_",res.target)
                        // console.log("elements",this.elements)
                        const img_= res.target as HTMLImageElement;
                        this._user.askSendToServer({bg_parent:parent,formdata:formelement,image:img,blog,oldKey:null});
                        this.imgDescUpdate({target:img,imgDesc:desc});//updates desc editing for image
                        divCont.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                divCont.classList.toggle("isActive");
                                img.classList.toggle("isActive");
                                this._modSelector.footerPlacement();//this shifts footer placement down
                                const isActive=([...img.classList as any] as string[]).includes("isActive");
                                this.removeMainElement(parent,divCont,img);
                                this._user.refreshImageShow(parent,img,null,null)
                                if(isActive){
                                    this.updateElement(img);//updates on both selector and Element
                                    divCont.style.zIndex="0";
                                    
                                }else{
                                    if(([...divCont.children as any] as HTMLElement[]).map(child=>(child.nodeName)).includes("SVG")){
                                        const getIcon=divCont.querySelector("svg") as SVGElement;
                                        divCont.removeChild(getIcon as ChildNode)
                                    }
                                }
                            }
                        });
                    }
                });
                Misc.matchMedia({parent:divCont,maxWidth:400,cssStyle:{paddingInline:"0px",marginInline:"0px;"}});
                
            }
        });

    }
    bgShade(parent:HTMLElement,btnClicked:HTMLButtonElement){
        const useParent= btnClicked as HTMLElement;
        const direction=window.innerWidth < 600 ? "column":"row" ;
        useParent.style.position="relative";
        useParent.style.zIndex="100";
        btnClicked.classList.add("active");
        //show drop-down on shade selection
        const popup=document.createElement("div");
        popup.style.cssText=`position:absolute;border-radius:5px;box-shadow:1px 1px 10px 1px #bdc5c9;display:flex;flex-direction:${direction};width:175px;height:auto;z-index:200;`;
        popup.setAttribute("is-popup","true");
        popup.id="popup";
        popup.style.transform="none";
            if(direction==="column"){
                popup.style.width="75px";
                popup.style.inset="105% -50% -110% -150%";
            }else{
            popup.style.inset="105% -50% -110% -250%";
            }
        const selectBlue=document.createElement("select");
        selectBlue.style.cssText="border-radius:15px;"
        selectBlue.className="box-shadow";
        Misc.blue_shades.forEach((shade,index)=>{
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
                const getActives=document.querySelectorAll("[is-element=true].isActive");
                const value=(e.currentTarget as HTMLSelectElement).value as string;
                btnClicked.classList.remove("active");
                
                if(getActives){
                    ([...getActives as any] as HTMLElement[]).forEach((element)=>{
                        
                            if(element){
                                const style=`background-color:${value}`;
                                element.style.backgroundColor=value;
                                element.style.cssText=HtmlElement.addStyle(element,style)
                                this._modSelector.updateElement(element);//updates on both selector and Element
                            }
                           
                    });
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
                                const style=`background-color:${value}`;
                                element.style.backgroundColor=value;
                                element.style.cssText=HtmlElement.addStyle(element,style)
                                this._modSelector.updateElement(element);//updates on both selector and Element
                            }
                           
                    });
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
    selectColumns(parent:HTMLElement,btnClk:HTMLButtonElement){
        btnClk.classList.add("active");
        parent.style.position="relative";
        const select=document.createElement("select") as HTMLSelectElement;
        select.style.cssText="width:100%;margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;";
        const isActives=document.querySelectorAll("[is-element='true'].isActive");
        Main.colArr.forEach((op)=>{
            const option=document.createElement("option") as HTMLOptionElement;
            option.value=op.value;
            option.textContent=op.name;
            select.appendChild(option);
        });
        parent.appendChild(select);
        select.addEventListener("change",(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value;
                
                ([...isActives as any] as HTMLElement[]).forEach((ele)=>{
                    if(ele){
                        Main.colArr.map(col=>(ele.classList.remove(col.value)));
                        if(value!=="noColumns"){
                            ele.classList.toggle(value);
                        }
                        this._modSelector.addAttribute(ele,"class",value);
                        
                    }
                });
                parent.removeChild(select);
                btnClk.classList.remove("active");
            }
        });
    }
    createAnchor(parent:HTMLElement,btnClick:HTMLElement,icon:iconType){
        //Form group
        parent.classList.add("position-relative")
        btnClick.classList.add("active");
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
        submitBtn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                const divCont=document.createElement("div");
                divCont.className="eleContainer";
                divCont.style.cssText="margin:0px;padding:0.25rem;position:relative;"
                divCont.id=`anchor-container`;
                const anchor=document.createElement("a");
                anchor.setAttribute("is-element","true");
                anchor.id=`${icon.name}-${Math.round(Math.random()*1000)}`;
                anchor.setAttribute("name",`${icon.name}`);
                anchor.style.cssText="margin-inline:auto;padding:1rem;font-size:18px;";
                anchor.className="text-primary"
                anchor.textContent=inName.value;
                // anchor.href="#";
                anchor.onclick=()=>{window.open(inLink.value,"_blank")};
                anchor.setAttribute("data-href",inLink.value);
                anchor.setAttribute("contenteditable","true");
                this._modSelector.footerPlacement();//this shifts footer placement down
                this.promElementAdder(anchor).then(async(res)=>{
                    if(res){
                        const ele=res.ele as elementType;
                        divCont.setAttribute("data-placement",`${ele.placement}-A`)
                    }
                });
                this._modSelector.count=this._modSelector.count + 1;
                anchor.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                        divCont.classList.toggle("isActive");
                        anchor.classList.toggle("isActive");
                        this.updateElement(anchor)
                    }
                });
                divCont.appendChild(anchor);
                parent.appendChild(divCont);
                this.removeMainElement(parent,divCont,anchor);
                parent.removeChild(groupForm);
                btnClick.classList.remove("active");
            }
        });

        
        
    }
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
        
    }
    
    static cleanUpWithID(parent:HTMLElement,ID:string){
        ([...parent.children as any] as HTMLElement[]).map(child=>{
            if(child && child.id ===ID ){
                parent.removeChild(child);
            }
        });
    }
    //PARENT SELECTULTYPE()
    createList(parent:HTMLElement,btnClick:HTMLElement,icon:iconType,type:string){
        Main.textarea=document.querySelector("div#textarea");
        const useParent=Main.textarea;
        btnClick.classList.toggle(icon.name);
        if(useParent){
            const divCont=document.createElement("div");
            divCont.className="eleContainer";
            divCont.style.cssText="margin:0px;padding:0.25rem;position:relative;";
            const ul=document.createElement("ul");
            ul.setAttribute("contenteditable","true");
            ul.setAttribute("is-element","true");
            ul.setAttribute("name","ul");
            ul.className=" ul";
            ul.style.cssText="padding-inline:1.25rem;width:80%;margin-inline:auto;";
            ul.classList.add("element");
            ul.classList.add("box-shadow");
            ul.classList.add(icon.name);
            ul.id=`ul-${Math.round(Math.random()*1000)}`;
            const li=document.createElement("li");
            // li.setAttribute("contenteditable","true");
            if(type==="decimal"){
                li.classList.add("decimal");
            }
            ul.style.cssText="padding-inline:6px;width:90%;margin-inline:auto;";
                this.promElementAdder(ul).then(async(res)=>{
                    if(res){
                        const ele=res.ele as elementType;
                        divCont.setAttribute("data-placement",`${ele.placement}`);
                    }
                });
            divCont.appendChild(ul);
            Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
            Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
            useParent.appendChild(divCont);
            ul.addEventListener("click", (e:MouseEvent)=>{
                if(e){
                    if(!(([...ul.children as any] as HTMLElement[]).map(li=>(li.nodeName)).includes("LI"))){
                        ul.appendChild(li);
                    }
                    ul.classList.toggle("isActive");
                    divCont.classList.toggle("isActive");
                    if(([...ul.classList as any] as string[]).includes("isActive")){
                    this.removeMainElement(useParent,divCont,ul);
                    this.updateElement(ul);//does both selectors and elements
                    }
                    btnClick.classList.remove("active");
                    this._modSelector.footerPlacement();//this shifts footer placement down
                    
                }
            },true);
           
           
                // useParent.classList.add(".position-relative")
                this._modSelector.editElement(ul)//pulls flex if exist from target attrubutes
            //ADDING element
            
           
           //NOTE CHANGE EVENT ONLY WORKS FOR INPUT,TEXTAREA TYPE
        }
    }
    createQuote(parent:HTMLElement | null,btnClick:HTMLButtonElement,icon:iconType){
        Main.textarea=document.querySelector("div#textarea");
        const divCont=document.createElement("div");
        divCont.className="eleContainer";
        divCont.style.cssText="margin:0px;padding:0.25rem;position:relative;";
        const useParent=parent ? parent as HTMLElement : Main.textarea as HTMLElement;
        const quote=document.createElement("blockquote");
        quote.setAttribute("name","blockquote");
        quote.setAttribute("is-element","true");
        quote.id=`blockquote-${Math.round(Math.random()*1000)}`;
        quote.className="position-relative";
        quote.style.cssText="margin-left:2rem;margin-top:0.5rem;line-height:3rem;border-left:1px solid black;padding-left:1rem;";
        quote.classList.add(icon.display);
        quote.classList.add("element");
        quote.setAttribute("contenteditable","true");
        quote.innerHTML=`<span style="font-size:105%;font-weight:bold;">&#8220;</span>${icon.name}<span style="font-size:105%;font-weight:bold;">&#8221;</span>`;
        divCont.appendChild(quote);
        useParent.appendChild(divCont);
        Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
        Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
        //ADDING element
        this._modSelector.count=this._modSelector.count + 1;
        this.promElementAdder(quote).then(async(res)=>{
            if(res){
                const ele=res.ele as elementType;
                divCont.setAttribute("data-placement",`${ele.placement}-A`)
            }
        });;
        quote.addEventListener("click",(e:MouseEvent)=>{
            if(!e) return
            // btnClick.classList.toggle("active");
            // container.classList.toggle("isActive");
            divCont.classList.toggle("isActive");
            quote.classList.toggle("isActive");
            if(([...quote.classList as any] as string[]).includes("isActive")){
            this.removeMainElement(useParent,divCont,quote);
            this.updateElement(quote)//update bot element and selector elements
            this._modSelector.footerPlacement();//this shifts footer placement down
            }
            
        });
        quote.addEventListener("keydown",(e:KeyboardEvent)=>{
            if(e.key==="Enter"){
                this.createQuote(parent,btnClick,icon);
            }
        });
        this._modSelector.editElement(quote)//realtime edits on either flex or none items
        
       
        
    }
    insertDateTime(parent:HTMLElement,btnClicked:HTMLButtonElement,icon:iconType){
        btnClicked.classList.add("active");
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
        // const btn=document.createElement("button");
        // btn.className="btnStyle2 box-shadow";
        // btn.textContent="submit";
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
        // formGroup.appendChild(btn);
        container.appendChild(formGroup);
        parent.appendChild(container);
        input.addEventListener("change",(e:Event)=>{
            if(e){
                btn.disabled=false;
            }
        });
        formGroup.addEventListener("submit",(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const divCont=document.createElement("div");
                divCont.className="eleContainer";
                divCont.style.cssText="margin:0px;padding:0.25rem;position:relative;margin-left:0.5rem;"
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const datetime=formdata.get("datetime") as string;
                const newDate=new Date(datetime as string);
                const mkDateTime=`about-${datetime.split("-")[2].split("T")[1]}`;
                const time=document.createElement("time");
                time.id=`${icon.name}-${Math.round(Math.random()*1000)}`;
                time.setAttribute("datetime",`${mkDateTime}`);
                time.innerHTML=newDate.toLocaleDateString();
                time.style.cssText="margin:0.75rem; font-size:16px;margin-left:0.5rem;";
                time.className="text-primary mx-auto my-3 show-time";
                time.setAttribute("data-placement",`${this.placement}`);
                divCont.appendChild(time);
                parent.appendChild(divCont);
                parent.removeChild(container);
                Misc.matchMedia({parent:divCont,maxWidth:920,cssStyle:{marginInline:"1.5rem"}});
                Misc.matchMedia({parent:divCont,maxWidth:420,cssStyle:{marginInline:"10px"}});
                time.addEventListener("click",(e:Event)=>{
                    if(e){
                        btnClicked.classList.toggle("active");
                        time.classList.toggle("isActive");
                        this.removeMainElement(parent,divCont,time);
                    }
                });
                this.promElementAdder(time).then(async(res)=>{
                    if(res){
                        const ele=res.ele as elementType;
                        divCont.setAttribute("data-placement",`${ele.placement}-A`)
                    }
                });;
                this._modSelector.footerPlacement();//this shifts footer placement down
                }
        });

    }

    removeMainElement(parent:HTMLElement,divCont:HTMLElement,target:HTMLElement){
        const check=([...target.classList as any] as string[]).includes("isActive");
        Header.cleanUpByID(parent,"xIconDiv");
        
        if(check){
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
                    this.promRemoveElement(target).then(async(res)=>{
                        if(res){
                            if(target.nodeName==="IMG"){
                                const imgKey=target.getAttribute("imgKey");
                                if(imgKey){
                                    this._service.adminImagemark(imgKey).then(async(res)=>{
                                        if(res){
                                            Misc.message({parent:parent,msg:`${imgKey}`,type_:"success",time:700});
                                        }
                                    });
                                }
                            }
                            this._modSelector.shiftPlace(res.placement);///REINDEX PLACEMENT!!!!
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
         }else{
            Header.cleanUpByID(parent,"xIconDiv");
         }
    }
    //INSERT element- delete
    promElementAdder(target:HTMLElement |HTMLImageElement){
        return new Promise((resolver)=>{
            resolver(this.elementAdder(target))
        }) as Promise<{ele:elementType | undefined,target:HTMLElement}>;
    }
    elementAdder(target:HTMLElement):{ele:elementType | undefined,target:HTMLElement}{
        // adds none selector elements to modSelector.blog
        const ID=this._modSelector._elements.length;
            const checkNodename=["a","blockquote","ul","img","ol"]
            const imgDesc=target.getAttribute("imgDesc");
            const nodename=target.nodeName.toLowerCase();
            const specialNodename=checkNodename.includes(nodename);
            const hasinnerimage=target.getAttribute("has-innerimage");
            const imgKey:string | null=target.getAttribute("imgKey");
            const check=this.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
            let ele:elementType|undefined={} as elementType;
                if( !check){

                    // console.log("418 HELROWSSSSS",JSON.parse(target.id));
                    ele={
                        ...ele,
                        id:ID ,
                        selectorId:undefined,
                        placement:this.placement,
                        name:nodename as string,
                        class:target.className.split(" ").filter(cl=>(cl !=="isActive")).join(" "),
                        eleId:target.id,
                        cssText:target.style.cssText,
                        attr:target.getAttribute("attr") ? target.getAttribute("attr") as string :undefined,
                        imgKey: imgKey ? imgKey : undefined
                    };
                    if(hasinnerimage){
                        ele.attr="has-innerimage";
                    }
                    if(!specialNodename){
                            // ele.inner_html=ModSelector.cleanInnerHTML(target).innerHTML as string;
                            ele.inner_html=target.innerHTML;
            
                    }else if(nodename==="a"){
                        const link=target.getAttribute("data-href") as string;
                        const anchorContainer=target.getAttribute("anchorContainer");
                        if(anchorContainer){
                            ele.attr=JSON.stringify({link,anchorContainer});
                        }else{

                            ele.attr=link;
                        }
                        ele.inner_html=target.innerHTML;
                        
                    }else if(specialNodename && nodename !=="a"){
                        ele.inner_html=target.innerHTML as string
                        // console.log("modSelector.elementAdder()",ele.inner_html)
                    }else if(nodename==="img"){
                        const target_=target as HTMLImageElement;
                        ele.img=target_.src;
                        ele.inner_html=target_.alt;
                        if(imgDesc){
                            ele.attr=imgDesc;
                        }
                    }
                    this._elements=this.elements;
                    this._elements.push(ele);
                    this.elements=this._elements;
                    const blog=this._modSelector.blog;
                    if(!blog.show){
                        this._modSelector.blog={...blog,show:false,elements:this._elements};
                    }
                    this.placement= this.placement + 1;
                }
                return {ele,target};
            
    }
    updateElement(target:HTMLElement){
        const imgKey:string | null=target.getAttribute("imgKey");
        this._elements=this._modSelector._elements.map(ele=>{
            if(ele.eleId===target.id){
                ele.cssText=target.style.cssText;
                ele.class=target.className;
                if(target.nodeName==="IMG"){
                    const img=target as HTMLImageElement;
                    ele.img=img.src;
                    ele.inner_html=img.alt;
                    ele.imgKey=imgKey ? imgKey as string : undefined;
                }else{
                    ele.inner_html=target.innerHTML;
                }
            }
        return ele;
    });
    this.elements=this._elements;
    }
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
            this._modSelector._elements=elements;
            this._modSelector._selectors=selectors;
            this._modSelector._selectCodes=codes;
            this._modSelector.blog={...this._modSelector.blog,elements,selectors,codes};
        }


    }
    editElement(target:HTMLElement){
        target.addEventListener("input",(e:Event)=>{
            if(e){

                this._elements=this._modSelector._elements.map(ele=>{
                    if(ele.eleId===target.id){
                        ele.cssText=target.style.cssText;
                        ele.class=target.className;
                        if(target.nodeName !=="IMG"){
                        ele.inner_html=target.innerHTML;
                        }else{
                            const img=target as HTMLImageElement;
                            ele.img=img.src;
                            ele.inner_html=img.alt;

                        }
                    }
                return ele;
            });
        }     
        this.elements=this._elements;
    });
    }
    imgDescUpdate(item:{target:HTMLImageElement,imgDesc:HTMLElement}){
        const { target,imgDesc}=item;
        imgDesc.oninput=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLElement).textContent;
                if(value){
                    target.setAttribute("imgDesc",value);
                    this._elements=this._modSelector.elements;
                    this._elements=this._elements.map(ele=>{
                        if(ele && ele.eleId===target.id){
                            ele.inner_html=target.alt;
                            ele.attr=value;
                        }
                        return ele;
                    });
                    this.elements=this._elements;
                }
            }
        };
    }
    promRemoveElement(target:HTMLElement){
        return new Promise((resolve)=>{
            resolve(this.removeElement(target));
        }) as Promise<elementType|undefined>;
    }
    removeElement(target:HTMLElement):elementType|undefined{
        let ele_:elementType|undefined;
        this._modSelector._elements.map((ele,index)=>{
                if(ele.eleId===target.id){
                    this._modSelector._elements.splice(index,1);
                    ele_= ele;
                }
        });
        this.elements=this._modSelector._elements;
        return ele_
    }
    //PARENT MAINBTN() FONT ONLY WITH ATTR=TRUE-KEEP HERE
    fontAction(btn:HTMLButtonElement){
        //ADDING FONT-querying element by class:icon.display && isActive
        const isActives=(Main.container as HTMLElement).querySelectorAll("[is-element='true'].isActive");
        
        if(isActives){
            [...isActives as any as HTMLElement[]].forEach((activeEle)=>{
                const {isJSON}=Header.checkJson(activeEle.getAttribute("flex"));
                if(activeEle && !isJSON){
                   
                    activeEle.classList.toggle(btn.id);
                    this._modSelector.updateElement(activeEle);
                    // this._modSelector.editElement(activeEle);//updates on both selector and Element
                    
                }
            });
        }
    }
    static removeElement(inner_html:string,ID:string){
        let arr:{name:string,id:string,pattern:RegExp,str:string,start:number,end:number,match:boolean}[]=[
            {name:"frDiv",id:ID,pattern:/\<div/g,str:"",start:0,end:0,match:false},
            {name:"bkDiv",id:ID,pattern:/\<\/div\>/g,str:"",start:0,end:0,match:false},
            {name:"id",id:ID,pattern:/(id=\")[a-zA-Z0-9\"]{2,}/g,str:"",start:0,end:0,match:false},
            
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

    }
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
    }

   
}
export default HtmlElement;
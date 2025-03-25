import { FaCrosshairs } from "react-icons/fa";
import Misc from "../common/misc";
import { FaCreate } from "../common/ReactIcons";
import Service from "../common/services";
import ModSelector from "./modSelector";
import { arrDivContType, blogType, cardBodyCssType, elementType, } from "./Types";
import Nav from "../nav/headerNav";
import User from "../user/userMain";
import {  idValueType } from "@/lib/attributeTypes";


class Headerflag{
   public readonly freepicurl:string="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
public targetChildrenIds:{id:string,keyValue:{key:string,value400:string,value900:string}[]}[];
private attributeList:{name:string,class:string|undefined}[];
public readonly headerPic:string;
private _element:elementType;
private _initElement:elementType;
private _initCssText:string;
private _initClass:string;
private css_col:string;
private css_row:string;
private divCont:HTMLElement;
_placement:number;
static headerFlagSample:string= "/images/headerFlagSample.png";
public static readonly cardBodyCss:cardBodyCssType[]=[
    {id:0,name:"small",small:"margin:auto;line-height:0rem;",middle:"font-size:20px;line-height:2.3rem;margin-bottom:0rem;",img:"/images/headerFlagSample.png"},
        {id:1,name:"medium",small:"margin:auto;line-height:0rem;",middle:"font-size:30px;line-height:2.8rem;margin-bottom:0rem;",img:"/images/headerFlagSample.png"},
        {id:2,name:"medium-large",small:"margin:auto;line-height:0rem;",middle:"font-size:35px;line-height:3.2rem;margin-bottom:0rem;",img:"/images/headerFlagSample.png"},
        {id:3,name:"large",small:"margin:auto;line-height:0rem;",middle:"font-size:40px;line-height:3.6rem;margin-bottom:0rem;",img:"/images/headerFlagSample.png"},
        {id:4,name:"largest",small:"margin:auto;line-height:0rem;",middle:"font-size:45px;line-height:3.6rem;margin-bottom:0rem;",img:"/images/headerFlagSample.png"},
];
 

constructor(private _modSelector:ModSelector,private _service:Service,private _user:User){
    
    this.freepicurl="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
    this.headerPic="/images/headerFlag.png";
    this.css_col="display:flex;flex-direction:column;align-items:center;";
    this.css_row="display:flex;flex-wrap:wrap;justify-content:space-around;align-items:center;";
    this._initCssText=this.css_row + "width:100%;min-height:15vh;box-shadow:1px 1px 12px 1px black;border-radius:6px;padding:0.35rem;";
    this._initClass="w-100 header-flag-target d-flex justify-content-around flex-wrap-wrap";
    
    this._initElement={
        id: 0, 
        placement:0,
        selectorId:undefined,
        eleId: "",
        name: "div",
        class: this._initClass,
        inner_html:"",
        cssText: this._initCssText,
        attr:"data-headerflag",
        img: this.headerPic,
        imgKey:undefined,
        blog_id:0,
        type:"headerflag"
    };
    this._element=this._initElement;
    this.targetChildrenIds=[
        {id:"imgCont-container",keyValue:[
            {key:"flex",value400:"1 0 100%",value900:"1 0 30%"},
            {key:"width",value400:"100%",value900:""},
            {key:"order",value400:"-1",value900:"1"},
            {key:"maxHeight",value400:"170px",value900:"155px"},
            {key:"paddingBlock",value400:"10px",value900:"5px"},
            {key:"borderBottom",value400:"1px solid grey",value900:""},

        ]},
        {id:"cardBody-container",keyValue:[
            {key:"flex",value400:"1 0 100%",value900:"1 0 70%"},
            {key:"width",value400:"100%",value900:""},
            {key:"order",value400:"1",value900:"-1"},
            {key:"maxHeight",value400:"170px",value900:"155px"},
            {key:"minHeight",value400:"150px",value900:"135px"},
            {key:"height",value400:"100%",value900:"100%"},
            {key:"paddingBlock",value400:"10px",value900:"5px"},

        ]},
       

    ]
    this.attributeList=[
        {name:"select",class:undefined},
        {name:"upload image",class:undefined},
        {name:"font-size",class:undefined},
    ];
   
};

//---------------------GETTER/SETTER----------------------------//
get element(){
    return {...this._element,type:"headerflag"};
}
set element(element:elementType){
    this._element={...element,type:"headerflag"};
}
get elements(){
    return this._modSelector.elements;
}
set elements(elements:elementType[]){
    this._modSelector.elements=elements;
}
get placement(){
    return this._modSelector.placement;
}
set placement(placement:number){
    this._placement=placement;
    this._modSelector.placement=placement
}
get blog(){
    return this._modSelector.blog
}
get user(){
    return this._user.user;
}
//---------------------GETTER/SETTER----------------------------//

//-----------------------MAINS---------------------------------//

showCleanHeaderflag({parent,element,idValues}:{parent:HTMLElement,element:elementType,idValues:idValueType[]}){
    //TRIGGERED ON ELEMENT.TYPE==="headerflag"=> DisplayBlog()
    const less400=window.innerWidth <400;
    const less900=window.innerWidth <900;
    const rand=Math.floor(Math.random()*1000);
    const divCont=document.createElement("div");
    divCont.id=`divcont-headerflag-${rand}`;
    this._modSelector.dataset.insertcssClassIntoComponents({target:divCont,level:"element",loc:"htmlElement",type:"headerflag",headerType:undefined,id:"divContId"});
    const eleId=element.eleId;
    idValues.push({eleId,id:"parent_id",attValue:divCont.id});
    const target=document.createElement("div");
    target.id=element.eleId;
    idValues.push({eleId,id:"ID",attValue:eleId});
    target.style.cssText=element.cssText;
    target.className=element.class;
    target.innerHTML=element.inner_html;
    if(less900){
        target.classList.remove("d-flex");
        target.style.flexDirection="column";
        target.style.maxHeight="auto";
        target.style.paddingBlock="1rem";
        target.style.gap="1rem";
    }
  
    const middlePara=target.querySelector("p#cardBody-middlePara") as HTMLElement;
    const imgCont=target.querySelector("div#imgCont-container") as HTMLElement;
    const img=target.querySelector("img") as HTMLImageElement;
    idValues.push({eleId,id:"eleType",attValue:element.type as string});
    idValues.push({eleId,id:"isHeaderflag",attValue:String(element.attr)});
    //LARGE TEXT-ADJUSMENTS:CARDBODY>cardBody-middlePara 
    if(less400){
        if(middlePara){
            target.style.flexDirection="";
            target.style.flexDirection="column";
            target.style.height="";
            target.style.maxHeight="";
            middlePara.style.fontSize="";
            middlePara.style.fontSize="auto";
        };
        if(img){
            img.style.width="100%";
        };
        if(imgCont){
           
            imgCont.style.maxHeight="";
            imgCont.style.maxHeight="none";
            const getImg=imgCont.querySelector("img") as HTMLElement;
            getImg.style.maxHeight="";
            getImg.style.maxHeight="355px";
        };

    }else{
        this.screenSizeAdjust({target:target,less900,less400});
    }
    //LARGE TEXT-ADJUSMENTS:CARDBODY>cardBody-middlePara 
    img.src=element.img || this.headerPic;
    if(element.imgKey){
        const src=`${this.freepicurl}/${element.imgKey}`;
        img.src=src as string;
    }
    target.setAttribute("name","div");
   this._modSelector.dataset.generateIdValues({
        target,
        idValues,
        rowColEle:element,
        level:"element",
        loc:"htmlElement",
        index:element.placement
        
      });
    divCont.appendChild(target);
    this.removeEditable({target});//REMOVING contenteditable
    const arrDivCont:arrDivContType={divCont,placement:element.placement,target,isNormal:false,ele:element,chart:null,sel:null};
    return arrDivCont
    
};



 showHeaderflag({parent,element,less900,less400,idValues}:{
    parent:HTMLElement,
    element:elementType,
    less900:boolean,
    less400:boolean,
    idValues:idValueType[]

}):arrDivContType{
    //TRIGGERED ON ELEMENT.TYPE==="headerflag"=> edit()

    const eleId=element.eleId;
    const type=element.type ? element.type : "headerflag";
    idValues.push({eleId,id:"eleType",attValue:type});
    idValues.push({eleId,id:"parent_id",attValue:parent.id});
    idValues.push({eleId,id:"ele_id",attValue:String(element.id)});
    //-----------------divCont making--------------------//
    this.divCont=document.createElement("div");
    const rand=Math.round(Math.random()*1000);
    this.divCont.id=`divCont-headerflag-${rand}`;
    idValues.push({eleId,id:"divContId",attValue:this.divCont.id});
    this.divCont.className="eleContainer";
    this.divCont.style.cssText=this.css_col + "padding:0.5rem;width:100%;";
    //-----------------divCont making--------------------//
    this.element=element;
    const attr=element.attr ? element.attr : "data-headerflag";
    idValues.push({eleId,id:"headerflag",attValue:attr});
    idValues.push({eleId,id:"placement",attValue:String(element.placement)});
    const target=document.createElement("div");
    target.setAttribute("type",type);
    target.id=element.eleId;
    idValues.push({eleId,id:"ID",attValue:target.id});
    target.style.cssText=element.cssText;
    target.style.flexDirection=less400? "column":"row";
    target.style.maxHeight=less900 ? (less400 ? "500px":"140px"):"155px";
    target.className=element.class;
    target.innerHTML=element.inner_html;
    const img=target.querySelector("img") as HTMLImageElement;
    img.src=element.img || this.headerPic;
    img.alt="www.ablogroom.com";
    console.log("HEADERFLAG IMG",element.img,"IMGKEY",element.imgKey)
    if(element.imgKey){
        const src=`${this.freepicurl}/${element.imgKey}`;
        img.src=src;
        img.alt=element.imgKey
    }
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
        clean:false,

    });
    idValues=retIdValues2;
   //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
    target.setAttribute("name","div");
    this.divCont.setAttribute("data-placement",`${element.placement}-A`);
    this.divCont.appendChild(target);
    this.screenSizeAdjust({target:target,less900,less400});
    this.customAttributes({divCont:this.divCont,target,less400,less900,css_col:this.css_col,element:this.element,idValues});
    this.removeMainElement({parent,divCont:this.divCont,target,show:false,idValues});
    this.divCont.onclick=(e:MouseEvent)=>{
        if(e){
            this.divCont.classList.toggle("isActive");
            target.classList.toggle("isActive");
            this.removeMainElement({parent,divCont:this.divCont,target,show:true,idValues});
        }
    };
    this._modSelector.editElement({target,idValues,selRowCol:null});
    const arrDivCont:arrDivContType={divCont:this.divCont,placement:element.placement,target,isNormal:false,ele:element,chart:null,sel:null}
    return arrDivCont
};



async initMain({parent,cardBodyCss,idValues}:{parent:HTMLElement,cardBodyCss:cardBodyCssType,idValues:idValueType[]}){
   
    const blog=this._modSelector.blog;
    const less900=window.innerWidth < 900;
    const less400=window.innerWidth < 400;
    this.element=this._initElement;
    await this.addElement({parent,less900,less400,blog,element:this.element,cardBodyCss,idValues}).then(async(res)=>{
        // item has been registered and added
        if(res){
            this.element=res.ele;
            idValues=res.idValues
            this.screenSizeAdjust({target:res.target,less900,less400});
            this._modSelector.editElement({target:res.target,idValues,selRowCol:null});
            //return ele and target:=> generate list styles
            const divCont=res.target.parentElement as HTMLElement;
            this.customAttributes({divCont,target:res.target,less400,less900,css_col:this.css_col,element:this.element,idValues});
        }
    });
    
}

//-----------------------MAINS---------------------------------//
   async addElement({parent,less900,less400,blog,element,cardBodyCss,idValues}:{
    parent:HTMLElement,
    blog:blogType,
    less900:boolean,
    less400:boolean,
    element:elementType,
    cardBodyCss:cardBodyCssType,
    idValues:idValueType[]
   }):Promise<{ele: elementType,target: HTMLElement,idValues:idValueType[]} | undefined>{
    //THERE ARE TWO MAIN COMPONENTS;NAMELY cardBody() and imgCont()
       
        let ele: elementType={} as elementType;
        ele=element;
       
        //-----------------divCont making--------------------//
        this.divCont=document.createElement("div");
        const rand=Math.round(Math.random()*1000);
        this.divCont.id=`divCont-headerflag-${rand}`;
        this.divCont.className="eleContainer";
        this.divCont.style.cssText=this.css_col + "padding:0.5rem;width:100%;";
        //-----------------divCont making--------------------//
        // this.cleanUpByQuery({target:this.divCont,classOrID:"header-flag-target"});
        const target=document.createElement("div");
        target.style.cssText=this._initCssText;
        target.style.maxHeight=less900 ? (less400 ? "500px":"140px"):"165px";
        target.className=this._initClass;
        target.id=`headerFlag-${rand}`;
        const eleId=target.id;
        idValues.push({eleId,id:"divContId",attValue:this.divCont.id});
        idValues.push({eleId,id:"parent_id",attValue:parent.id});
        idValues.push({eleId,id:"ID",attValue:target.id});
        idValues.push({eleId,id:"elementId",attValue:target.id});
        idValues.push({eleId,id:"eleType",attValue:ele.type as string});
        ele={...ele,
            eleId:target.id,
            cssText:target.style.cssText,
            class:target.className,
            placement:this.placement,
            blog_id:blog.id,
        };
        
        //left side-Body-for-change
        await this.cardBody({parent:target,less900,less400,cardBodyCss}).then(async(res)=>{
            if(res){
                //right-side-body-for-change
                this.imgCont({parent:res.retParent,less900,less400});
            }
        });
        this.screenSizeAdjust({target:target,less900,less400});
        this.divCont.appendChild(target);
        parent.appendChild(this.divCont);
        return await this.elementAddAttribute({target,element:ele,less900,less400}).then(async(res)=>{
            if(res){
                ele={...res.ele}
                //ADDING element to modSelector
                // console.log("res",res.retTarget)//one
                return await this.elementAdder({target:res.retTarget,element:ele,blog,idValues}).then(async(_res)=>{
                    if(_res){
                      
                        const idValues:idValueType[]=[]
                        const ele=_res.ele as elementType;
                        this.element=ele;
                        this.divCont.setAttribute("data-placement",`${ele.placement}-A`);
                        this.removeMainElement({parent,divCont:this.divCont,target,show:false,idValues});
                        parent.appendChild(this.divCont);
                        this.divCont.onclick=(e:MouseEvent)=>{
                            if(e){
                                this.removeMainElement({parent,divCont:this.divCont,target,show:true,idValues});
                                const divCont=e.currentTarget as HTMLElement;
                                divCont.classList.toggle("isActive");
                                target.classList.toggle("isActive");
                            }
                        };
                        return {ele,target,idValues}
                    }
                });
            }
        });

    };

    cardBody(item:{parent:HTMLElement,less900:boolean,less400:boolean,cardBodyCss:cardBodyCssType}):Promise<{retParent:HTMLElement}>{
        //ADDS MAIN BODY TO HEADER FLAG
        const {parent,less400,cardBodyCss}=item;
        const round=Math.round(12*0.7);
        const container=document.createElement("div");
         //"DO NOT TOUCH ID!!!!!"
        container.id="cardBody-container";
         //"DO NOT TOUCH ID!!!!!"
        container.style.cssText=this.css_col + "margin-block:0.25rem;position:relative;align-items:flex-start;text-align:center;max-height:auto;height:auto;";
        container.className=less400 ? "col-md-12 target-child":`col-md-${round} target-child`;
        //----------------BODY---------------------------//
        //--------smallTop-----------------//
        const smallTop=document.createElement("small");
        smallTop.id="cardBody-smallTop";
        smallTop.setAttribute("contenteditable","true");
        smallTop.style.cssText=cardBodyCss.small;
        smallTop.textContent="U.S.SENATE COMMITTEE ON";
        container.appendChild(smallTop);
        //--------smallTop-----------------//
        //--------middlePara-----------------//
        const middlePara=document.createElement("p");
        middlePara.id="cardBody-middlePara";
        middlePara.style.cssText=cardBodyCss.middle;
        middlePara.textContent="HEALTH, EDUCATION, LABOR & PENSIONS";
        middlePara.setAttribute("contenteditable","true");
        container.appendChild(middlePara);
        //--------middlePara-----------------//
        //--------smallBottom-----------------//
        const smallBottom=document.createElement("small");
        smallBottom.id="cardBody-smallBottom";
        smallBottom.style.cssText=cardBodyCss.small;
        smallBottom.setAttribute("contenteditable","true");
        smallBottom.textContent="Chairman Bernie Sanders";
        container.appendChild(smallBottom);
        //--------smallBottom-----------------//
        parent.appendChild(container);
        //----------------BODY---------------------------//
        return Promise.resolve({retParent:parent}) as Promise<{retParent:HTMLElement}>;
    };


    imgCont(item:{parent:HTMLElement,less900:boolean,less400:boolean}){
        //ADDS IMG AND CONTAINER
        const {parent,less400}=item;
        const max=parent.style.maxHeight;
        const max_height=max ? parseInt(max.split("px")[0]) :155;
        const initImg=this.headerPic;
        const round=Math.round(12*0.3);
        const container=document.createElement("div");
        //"DO NOT TOUCH ID!!!!!"
        container.id="imgCont-container";
        //"DO NOT TOUCH ID!!!!!"
        container.style.cssText=this.css_col + `padding:0.15rem;position:relative;text-align:center;max-height:${max_height}px`;
        container.style.aspectRatio="1 / 1";
        container.className=less400 ? "col-md-12 target-child" :`col-md-${round} target-child`;
        const img=document.createElement("img");
        img.id="imgCont-img";
        img.style.cssText=`max-height:${max_height-10}px;aspect-ratio: 1 / 1;border-radius:50%;filter:drop-shadow(0 0 0.75rem white);`;
       
        img.src=initImg;
        img.alt="www.ablogroom.com";
        container.appendChild(img);
        parent.appendChild(container);
    };
   async elementAddAttribute({target,element,less400}:{target:HTMLElement,element:elementType,less900:boolean,less400:boolean}):Promise<{retTarget:HTMLElement,ele:elementType}>{
        //ADDS ATTRIBUTES TO TARGET
        const type=element.type ? element.type : "headerflag";
        target.setAttribute("type",type);
        target.setAttribute("is-element","true");
        target.setAttribute("name","div");
        target.style.cssText=element.cssText;
        target.style.flexDirection=less400 ? "column":"row";
        target.className=element.class;
        element={...element,placement:this.placement};
        return Promise.resolve({retTarget:target,ele:element}) as Promise<{retTarget:HTMLElement,ele:elementType}>;
    }

    screenSizeAdjust(item:{target:HTMLElement,less900:boolean,less400:boolean}){
        const {target,less900,less400}=item;
        const isMaxHeight=target.style.maxHeight;
        const max_height= isMaxHeight ? parseInt(isMaxHeight.split("px")[0]) :155;
        ([...target.children as any] as HTMLElement[]).map(child=>{
            if(child){
                this.targetChildrenIds.map(item=>{
                    if(child.id===item.id){
                        for(const key of Object.keys(child.style)){
                            item.keyValue.map(keyItem=>{
                                if(keyItem.key===key && key !=="maxHeight"){
                                    if(less900){
                                        child.style[key]=keyItem.value900;
                                    }else if(less400){
                                        child.style[key]=keyItem.value400;
                                    }
                                }else if(key==="maxHeight"){
                                    child.style[key]=`${max_height-10}px`;
                                }
                            });
                            
                        }
                    }
                });
            }
        });
    }
    removeEditable(item:{target:HTMLElement}){
        const {target}=item;
        ([...target.children as any] as HTMLElement[]).map(child=>{
            if(child){
                this.targetChildrenIds.map(item=>{
                    if(child.id===item.id){
                        ([...child.children as any] as HTMLElement[]).map(ch=>{
                            if(ch){
                                ch.removeAttribute("contenteditable");
                            }
                        });
                            
                    }
                });
            }
        });
    }

    //------------------CUSTOM SELECTION ---------------------------------//

    customAttributes({divCont,target,css_col,less400,less900,element,idValues}:{
        divCont:HTMLElement,
        target:HTMLElement,
        css_col:string,
        less400:boolean,
        less900:boolean,
        element:elementType,
        idValues:idValueType[]
    }){
        
        divCont.style.position="relative";
        const popup=document.createElement("div");
        popup.id="customAttributes-popup";
        popup.style.cssText=css_col + "position:absolute;width:fit-content;height:auto;background-color:white;border-radius:6px;z-index:2;";
        popup.style.top=less900 ? (less400 ? "105%":"102%"):"100%";
        const select=document.createElement("select");
        select.id="popup-select";
        select.selectedIndex=0;
        popup.appendChild(select);
        divCont.appendChild(popup);
        this.attributeList.map(_item=>{
            if(_item){
                const option=document.createElement("option");
                option.value=JSON.stringify(_item);
                option.textContent=_item.name;
                select.appendChild(option);
            }
        });
        select.onchange=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLSelectElement).value as string;
                const item:{name:string,class:string}=JSON.parse(value as string) as {name:string,class:string}
                if(item.name==="upload image"){
                    const getImage=target.querySelector("img#imgCont-img") as HTMLImageElement;
                    this.bgImage({divCont,target,img:getImage,css_col,less400,element,idValues});

                }else if(item.name==="font-size"){
                    this.fontSize({divCont,target,css_col,less400,element,idValues});
                };
            };
        };
    }
    
    async bgImage({divCont,target,img,css_col,less400,element,idValues}:{
        divCont:HTMLElement,
        target:HTMLElement,
        img:HTMLImageElement,
        css_col:string,
        less400:boolean,
        element:elementType,
        idValues:idValueType[]
    }){
        
        const blog=this.blog;
        let ele:elementType={} as elementType;
        ele=element;

        if(!blog.name){
           await  this._user.signInBlogForm({
            parent:target,
            blog,
            func:()=>{this.uploadImage({divCont,target,img,css_col,less400,element:ele,idValues});}
           });

        }else{
            //has SIGNED IN and CREATED a new blog
            this.uploadImage({divCont,target,img,css_col,less400,element:ele,idValues});
        }

    };
    uploadImage({divCont,target,img,css_col,less400,element,idValues}:{
        divCont:HTMLElement,
        target:HTMLElement,
        img:HTMLImageElement,
        css_col:string,
        less400:boolean,
        element:elementType,
        idValues:idValueType[]
    }){
       
        let ele:elementType={} as elementType;
        ele=element;
        const eleId=target.id;
        const popup=document.createElement("div");
            popup.id="bgImage-popup";
            popup.style.cssText=css_col + "position:absolute;top:100%;width:fit-content;height:auto;background-color:white;border-radius:6px;box-shadow:1px 1px 12px 1px;";
            const imgload=document.createElement("div");
            imgload.style.cssText="margin:auto";
            popup.appendChild(imgload);
            const form=document.createElement("form");
            form.id="bgImage-popup-form";
            form.style.cssText=css_col;
            const {input,label,formGrp}=Nav.inputComponent(form);
            formGrp.id="form-formgrp-file-upload";
            formGrp.style.cssText=css_col + "width:100%;";
            input.id="file-upload";
            input.type="file";
            input.name="file";
            input.autocomplete="off";
            input.accept="image/png , image/jpeg";
            input.placeholder="";
            label.setAttribute("for",input.id);
            label.classList.add("text-primary");
            label.textContent="choose an img";
            const {button}=Misc.simpleButton({anchor:form,type:"submit",text:"upload",bg:Nav.btnColor,color:"white",time:400});
            button.disabled=true;
            button.textContent="disabled";
            input.onchange=(e:Event)=>{
                if(e){

                    const files=(e.currentTarget as HTMLInputElement)?.files;
                    if(files){
                        const file=files[0];
                        button.disabled=false;
                        button.textContent="upload";
                        this.showUpLoadImg({parent:imgload,file:file as File,css_col});
                    }
                }
            }
            popup.appendChild(form);
            divCont.appendChild(popup);
            form.onsubmit=(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    const formdata=new FormData(e.currentTarget as HTMLFormElement);
                    const file=formdata.get("file");
                    if(file){
                        const {Key}=this._service.generateFreeImgKey({formdata,user:this.user}) as {Key:string};
                        ele={...ele,imgKey:Key};
                        idValues.push({eleId,id:"imgKey",attValue:Key});
                        this._service.uploadfreeimage({formdata}).then(async(res)=>{
                            if(res){
                                ele={...ele,img:res.img,imgKey:res.Key};
                                this.element=ele;
                                this.saveElement({target,element:ele,idValues});
                                img.src=res.img;
                                img.alt=res.Key;
                                Misc.blurIn({anchor:img,blur:"20px",time:600});
                                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    divCont.removeChild(popup);
                                },390);
                            }
                        });
                    }
                }
            };
    };
    showUpLoadImg(item:{parent:HTMLElement,file:File,css_col:string}){
        const {parent,file,css_col}=item;
        this.cleanUpByQuery({target:parent,classOrID:"showUpLoadImg-cont"});
        const cont=document.createElement("div");
        cont.id="showUpLoadImg-cont";
        cont.style.cssText=css_col + "width:200px;height:200px;margin:10px;";
        const url=URL.createObjectURL(file);
        const img=document.createElement("img");
        img.src=url;
        img.alt="www.ablogroom.com";
        img.style.cssText="width:200px;aspect-ratio:1/1;margin:auto;border-radius:50%;border:1px solid black;";
        img.style.boxShadow="1px 1px 12px 1px black";
        cont.appendChild(img);
        Misc.blurIn({anchor:img,blur:"12px",time:700});
        parent.appendChild(cont);
    };
    fontSize({divCont,target,css_col,less400,element,idValues}:{
        divCont:HTMLElement,
        target:HTMLElement,
        css_col:string,
        less400:boolean,
        element:elementType,
        idValues:idValueType[]
    }):void{
        const eleId=target.id;
        divCont.style.position="relative";
        const popup=document.createElement("div");
        popup.style.cssText="position:absolute;z-index:10;inset:0%;width:clamp(150px,150px,200px);background-color:white; color:black;border-radius:12px;padding:10px;display:flex;flex-direction:column;align-items:center;box-shadow:1px 1px 12px 1px black;";
        const {input,label}=Nav.inputComponent(popup);
        input.type="number";
        input.min="50";
        input.max="200";
        input.id="fontSize";
        input.name="fontSize";
        label.textContent="text-size adjust";
        input.placeholder="";
        label.setAttribute("for",input.id);
        const {button}=Misc.simpleButton({anchor:popup,type:"button",bg:Nav.btnColor,color:"white",text:"okay?",time:400});
        divCont.appendChild(popup);
        input.oninput=(e:Event)=>{
            if(!e) return;
            const value=(e.currentTarget as HTMLInputElement).value;
            const getCardBody=target.querySelector("div#cardBody-container") as HTMLElement;
            if(!getCardBody) return;
            const size=`${value}%`;
            getCardBody.style.fontSize=size;
        };
        button.onclick=(e:MouseEvent)=>{
           
            element={...element,inner_html:target.innerHTML};
            idValues.push({eleId,id:"text",attValue:"updated"});
            this.saveElement({target,element,idValues});
            Misc.message({parent:divCont,msg:"saved",type_:"success",time:400});
            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
            setTimeout(()=>{
                divCont.removeChild(popup);
            },390);

        };


        //cardBody-container
    }

    //------------------CUSTOM SELECTION ---------------------------------//

    //---------------------------REMOVE SECTION----------------------------//
    removeMainElement({parent,divCont,target,show,idValues}:{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement,show:boolean,idValues:idValueType[]}){
      
        const check=([...target.classList as any] as string[]).includes("isActive");
        const getxDiv=divCont.querySelector("div#xIconDiv-headerflag") as HTMLElement|null;
        if(!show){
            const css="display:block;position:absolute;transform:translate(-2px,-3px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:0px;left:0px;";
            divCont.classList.add("position-relative");
            const xIconDiv=document.createElement("div");
            xIconDiv.setAttribute("contenteditable","false");
            xIconDiv.setAttribute("is-icon","true");
            xIconDiv.className="xIconDiv";
            xIconDiv.id=`xIconDiv-headerflag`;
            xIconDiv.style.cssText=`${css}`;
            const cssStyle={background:"inherit",fontSize:"inherit"};
            FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
            divCont.appendChild(xIconDiv);
            xIconDiv.addEventListener("click",(e:MouseEvent)=>{
                if(e){
                    this.removeElement(target).then(async(res)=>{
                        if(res){
                            const ele=res.ele ? res.ele : null;
                            if(ele){
                                this._modSelector.shiftPlace(ele.placement);///REINDEX PLACEMENT!!!!
                                idValues.map((kat,index)=>{
                                    if(kat.eleId===ele.eleId){
                                        idValues.splice(index,1);
                                    }
                                });
                            }
                        }
                    });
                    Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:500});
                    setTimeout(()=>{
                        parent.removeChild(divCont);
                       
                    },480);
                }
            });
        }else if(show && getxDiv){
            if(check){
                getxDiv.style.display="block";
              }else{
                 getxDiv.style.display="none";
              }
         }
        
    };
    

    async removeElement(target:HTMLElement):Promise<{ele:elementType|undefined}>{
        let ele_:elementType|undefined;
        this._modSelector.elements.map((ele,index)=>{
                if(ele.eleId===target.id){
                    ele_= ele;
                    this._modSelector.elements.splice(index,1);
                }
        });
        this.elements=this._modSelector.elements;
        return Promise.resolve({ele:ele_}) as Promise<{ele:elementType|undefined}>;
    };
    //---------------------------REMOVE SECTION----------------------------//
    //---------------------------ultils----------------------------//
    cleanUpByQuery(item:{target:HTMLElement,classOrID:string}){
        const {target,classOrID}=item;
        ([...target.children as any] as HTMLElement[]).map(child=>{
            if(child){
                const checkId=child.id===classOrID;
                const checkClass=([...child.classList as any] as string[]).includes(classOrID);
                if(checkId || checkClass){
                    target.removeChild(child);
                }

            };
        });
    };
    saveElement({target,element,idValues}:{target:HTMLElement,element:elementType,idValues:idValueType[]}){
       
       const elements= this._modSelector.elements.map((ele,index)=>{
            if(ele.eleId===element.eleId){
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
                idValues=retIdValues2;
                idValues=this._modSelector.datasetSincUpdate({target,ele:element,level:"element",loc:"htmlElement",idValues});
               //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                ele=element
            }
            return ele;
    });
    this.elements=elements;
    };

    elementAdder({target,element,blog,idValues}:{
        target:HTMLElement,
        blog:blogType,
        element:elementType,
        idValues:idValueType[]

    }):Promise<{ele:elementType|undefined,idValues:idValueType[],target:HTMLElement}>{
      
        const len=this.elements.length;
        const eleId=target.id;
        const check=this.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
        if(!check){
            const placement=this._modSelector.placement
            element={...element,
                id:len,
                blog_id:blog.id,
                eleId,
                placement:placement,
                inner_html:target.innerHTML,
                cssText:target.style.cssText,
                class:target.className,
                attr:element.attr,
                type:element.type ? element.type : "headerflag"
            };
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
            idValues=retIdValues2;
           //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
          this._modSelector.datasetSincUpdate({target,ele:element,idValues,loc:"htmlElement",level:"element"})
           this._modSelector.dataset.populateElement({target,loc:"htmlElement",level:"element",idValues,selRowColEle:element,clean:false})
            this.elements=[...this.elements,element]
            this._modSelector.placement=placement + 1;
           
        }
        return Promise.resolve({ele:element,idValues,target}) as Promise<{ele:elementType|undefined,idValues:idValueType[],target:HTMLElement}>;
    };
    removePopup(item:{divCont:HTMLElement,target:HTMLElement,ID:string,element:elementType}):elementType{
        const {divCont,target,ID,element}=item;
        this.cleanUpByQuery({target:divCont,classOrID:ID});
        const ele={...element,inner_html:target.innerHTML};
        return ele;
    }
    //---------------------------ultils----------------------------//

};
export default Headerflag;
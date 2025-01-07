import { FaCrosshairs } from "react-icons/fa";
import Misc from "../common/misc";
import { FaCreate } from "../common/ReactIcons";
import Service from "../common/services";
import Header from "./header";
import ModSelector from "./modSelector";
import { blogType, cardBodyCssType, elementType, selectorType } from "./Types";
import Nav from "../nav/headerNav";
import User from "../user/userMain";


class Headerflag{
    freepicurl:string="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
targetChildrenIds:{id:string,keyValue:{key:string,value400:string,value900:string}[]}[];
attributeList:{name:string,class:string|undefined}[];
headerPic:string;
_element:elementType;
_initElement:elementType;
_initCssText:string;
_initClass:string;
css_col:string;
css_row:string;
divCont:HTMLElement;
_placement:number;
static headerFlagSample:string= "/images/headerFlagSample.png";
 static cardBodyCss:cardBodyCssType[]=[
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
            {key:"paddingBlock",value400:"10px",value900:"5px"},

        ]},
       

    ]
    this.attributeList=[
        {name:"select",class:undefined},
        {name:"upload image",class:undefined},
        {name:"font-size",class:undefined},
    ];
    Headerflag.cardBodyCss=[
        {id:0,name:"small",small:"margin:auto;line-height:0rem;",middle:"font-size:20px;line-height:2.3rem;margin-bottom:0rem;",img:"/images/headerFlagSample.png"},
        {id:1,name:"medium",small:"margin:auto;line-height:0rem;",middle:"font-size:30px;line-height:2.8rem;margin-bottom:0rem;",img:"/images/headerFlagSample.png"},
        {id:2,name:"medium-large",small:"margin:auto;line-height:0rem;",middle:"font-size:35px;line-height:3.2rem;margin-bottom:0rem;",img:"/images/headerFlagSample.png"},
        {id:3,name:"large",small:"margin:auto;line-height:0rem;",middle:"font-size:40px;line-height:3.6rem;margin-bottom:0rem;",img:"/images/headerFlagSample.png"},
        {id:4,name:"largest",small:"margin:auto;line-height:0rem;",middle:"font-size:45px;line-height:3.6rem;margin-bottom:0rem;",img:"/images/headerFlagSample.png"},
    ]
};

//---------------------GETTER/SETTER----------------------------//
get element(){
    return this._element;
}
set element(element:elementType){
    this._element=element;
}
get elements(){
    return this._modSelector.elements;
}
set elements(elements:elementType[]){
    this._modSelector.elements=elements;
}
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
get blog(){
    return this._modSelector.blog
}
get user(){
    return this._user.user;
}
//---------------------GETTER/SETTER----------------------------//

//-----------------------MAINS---------------------------------//

showCleanHeaderflag(item:{parent:HTMLElement,element:elementType}){
    //TRIGGERED ON ELEMENT.TYPE==="headerflag"=> DisplayBlog()
    const {parent,element}=item;
    const type=element.type ? element.type : "headerflag";
    const less900=window.innerWidth < 900;
    const less400=window.innerWidth < 400;
    const target=document.createElement("div");
    target.setAttribute("type",type);
    target.id=element.eleId;
    target.style.cssText=element.cssText;
    target.className=element.class;
    if(less900){
        target.classList.remove("d-flex");
        target.style.flexDirection="column";
        target.style.maxHeight="auto";
        target.style.paddingBlock="1rem";
        target.style.gap="1rem";
    }
    target.innerHTML=element.inner_html;
    const attr= element.attr ? element.attr : "data-headerflag";
    if(element.imgKey){
        const src=`${this.freepicurl}/${element.imgKey}`;
        const img=target.querySelector("img") as HTMLImageElement;
        img.src=element.img as string;
    }
    target.setAttribute(attr,attr);
    target.setAttribute("name","div");
    parent.appendChild(target);
    this.screenSizeAdjust({target:target,less900,less400});
    this.removeEditable({target});//REMOVING contenteditable
    
}
showHeaderflag(item:{parent:HTMLElement,element:elementType,less900:boolean,less400:boolean}){
    //TRIGGERED ON ELEMENT.TYPE==="headerflag"=> edit()
    const {parent,element,less900,less400}=item;
    const type=element.type ? element.type : "headerflag";
    //-----------------divCont making--------------------//
    this.divCont=document.createElement("div");
    const rand=Math.round(Math.random()*1000);
    this.divCont.id=`divCont-headerflag-${rand}`;
    this.divCont.className="eleContainer";
    this.divCont.style.cssText=this.css_col + "padding:0.5rem;width:100%;";
    //-----------------divCont making--------------------//
    this.element=element;
    const attr=element.attr ? element.attr : "data-headerflag";
    parent.appendChild(this.divCont);
    const target=document.createElement("div");
    target.setAttribute("type",type);
    target.id=element.eleId;
    target.style.cssText=element.cssText;
    target.style.flexDirection=less400? "column":"row";
    target.style.maxHeight=less900 ? (less400 ? "500px":"140px"):"155px";
    target.className=element.class;
    target.innerHTML=element.inner_html;
    if(element.imgKey){
        const src=`${this.freepicurl}/${element.imgKey}`;
        const img=target.querySelector("img") as HTMLImageElement;
        img.src=element.img as string;
        img.alt=element.imgKey
    }
    
    target.setAttribute(attr,attr);
    target.setAttribute("name","div");
    target.setAttribute("data-placement",`${element.placement}-A`);
    this.divCont.appendChild(target);
    this.screenSizeAdjust({target:target,less900,less400});
    this.customAttributes({divCont:this.divCont,less400,less900,css_col:this.css_col,element:this.element});
    this.removeMainElement({parent,divCont:this.divCont,target,show:false});
    this.divCont.onclick=(e:MouseEvent)=>{
        if(e){
            this.divCont.classList.toggle("isActive");
            target.classList.toggle("isActive");
            this.removeMainElement({parent,divCont:this.divCont,target,show:true});
        }
    };
    this._modSelector.editElement(target);
}
initMain(item:{parent:HTMLElement,cardBodyCss:cardBodyCssType}){
    const {parent,cardBodyCss}=item;
    const blog=this._modSelector.blog;
    const less900=window.innerWidth < 900;
    const less400=window.innerWidth < 400;
    this.element=this._initElement;
    this.addElement({parent,less900,less400,blog,element:this.element,cardBodyCss}).then(async(res)=>{
        // item has been registered and added
        if(res){
            this.screenSizeAdjust({target:res.target,less900,less400});
            this._modSelector.editElement(res.target);
            //return ele and target:=> generate list styles
            const divCont=res.target.parentElement as HTMLElement;
            this.customAttributes({divCont,less400,less900,css_col:this.css_col,element:this.element});
        }
    });
    
}

//-----------------------MAINS---------------------------------//
   async addElement(item:{parent:HTMLElement,blog:blogType,less900:boolean,less400:boolean,element:elementType,cardBodyCss:cardBodyCssType}):Promise<{ele: elementType,target: HTMLElement} | undefined>{
    //THERE ARE TWO MAIN COMPONENTS;NAMELY cardBody() and imgCont()
        const {parent,less900,less400,blog,element,cardBodyCss}=item;
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
        ele={...ele,
            eleId:target.id,
            cssText:target.style.cssText,
            class:target.className,
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
                return await this.elementAdder({target:res.retTarget,element:ele,blog}).then(async(_res)=>{
                    if(_res){
                        const ele=_res as elementType;
                        this.element=ele;
                        this.divCont.setAttribute("data-placement",`${ele.placement}-A`);
                        this.removeMainElement({parent,divCont:this.divCont,target,show:false});
                        parent.appendChild(this.divCont);
                        this.divCont.onclick=(e:MouseEvent)=>{
                            if(e){
                                this.removeMainElement({parent,divCont:this.divCont,target,show:true});
                                const divCont=e.currentTarget as HTMLElement;
                                divCont.classList.toggle("isActive");
                                target.classList.toggle("isActive");
                            }
                        };
                        return {ele,target}
                    }
                });
            }
        });

    };

    cardBody(item:{parent:HTMLElement,less900:boolean,less400:boolean,cardBodyCss:cardBodyCssType}):Promise<{retParent:HTMLElement}>{
        //ADDS MAIN BODY TO HEADER FLAG
        const {parent,less900,less400,cardBodyCss}=item;
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
        return new Promise(resolver=>{
            resolver({retParent:parent})
        }) as Promise<{retParent:HTMLElement}>;
    };
    imgCont(item:{parent:HTMLElement,less900:boolean,less400:boolean}){
        //ADDS IMG AND CONTAINER
        const {parent,less900,less400}=item;
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
        // img.style.maxWidth=less900 ? (less400 ? "100px":"75px"):"100px";
        img.src=initImg;
        img.alt="www.ablogroom.com";
        container.appendChild(img);
        parent.appendChild(container);
    };
   async elementAddAttribute(item:{target:HTMLElement,element:elementType,less900:boolean,less400:boolean}):Promise<{retTarget:HTMLElement,ele:elementType}>{
        //ADDS ATTRIBUTES TO TARGET
        const {target,element,less900,less400}=item;
        let ele:elementType={} as elementType;
        ele=element;
        const type=ele.type ? ele.type : "headerflag";
        const attr=element.attr ? element.attr : "data-headerflag";
        const rand=Math.round(Math.random()*1000);
        target.id=`headerflag-target-${rand}`;
        target.setAttribute("type",type);
        target.setAttribute("is-element","true");
        target.setAttribute("name","div");
        target.setAttribute(attr,attr);
        target.style.cssText=element.cssText;
        target.style.flexDirection=less400 ? "column":"row";
        target.className=element.class;
        ele={...ele,eleId:target.id,placement:this.placement};
        return new Promise(resolver=>{
            resolver({retTarget:target,ele})
        }) as Promise<{retTarget:HTMLElement,ele:elementType}>;
    }

    screenSizeAdjust(item:{target:HTMLElement,less900:boolean,less400:boolean}){
        const {target,less900,less400}=item;
        const isMaxHeight=target.style.maxHeight;
        const max_height= isMaxHeight ? parseInt(isMaxHeight.split("px")[0]) :155;
        ([...target.children as any] as HTMLElement[]).map(child=>{
            if(child){
                this.targetChildrenIds.map(item=>{
                    if(child.id===item.id){
                        for(const [key,value] of Object.entries(child.style)){
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

    customAttributes(item:{divCont:HTMLElement,css_col:string,less400:boolean,less900:boolean,element:elementType}){
        const {divCont,css_col,less400,less900,element}=item;
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
                switch(true){
                    case item.name==="upload image":
                        const target=divCont.querySelector("div.header-flag-target") as HTMLElement;
                        const getImage=target.querySelector("img#imgCont-img") as HTMLImageElement;
                        this.bgImage({divCont,target,img:getImage,css_col,less400,element});
                    return
                    case item.name==="font-size":
                    
                    return
                }
            }
        };
    }
    
    async bgImage(item:{divCont:HTMLElement,target:HTMLElement,img:HTMLImageElement,css_col:string,less400:boolean,element:elementType}){
        const {divCont,target,img,css_col,less400,element}=item;
        const blog=this.blog;
        let ele:elementType={} as elementType;
        ele=element;

        if(!blog.name){
            const isEle=blog.elements.find(_ele=>(_ele.eleId===target.id));
            ele=isEle ? isEle :element;
            // console.log("ele.id: inside bgImage",ele.id,"element.id",element.id);
           await  this._user.signInBlogForm({
            parent:target,
            blog,
            func:()=>{this.uploadImage({divCont,target,img,css_col,less400,element:ele});}
           });

        }else{
            //has SIGNED IN and CREATED a new blog
            this.uploadImage({divCont,target,img,css_col,less400,element:ele});
        }

    };
    uploadImage(item:{divCont:HTMLElement,target:HTMLElement,img:HTMLImageElement,css_col:string,less400:boolean,element:elementType}){
        const {divCont,target,img,css_col,less400,element}=item;
        let ele:elementType={} as elementType;
        ele=element;
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
                        this.showUpLoadImg({parent:imgload,file:file as File,css_col,less400});
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
                        this._service.uploadfreeimage({parent:divCont,formdata}).then(async(res)=>{
                            if(res){
                                ele={...ele,img:res.img,imgKey:res.Key};
                                this.element=ele;
                                this.saveElement({target,element:ele});
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
    }
    showUpLoadImg(item:{parent:HTMLElement,file:File,css_col:string,less400:boolean}){
        const {parent,file,css_col,less400}=item;
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
    }
    //------------------CUSTOM SELECTION ---------------------------------//

    //---------------------------REMOVE SECTION----------------------------//
    removeMainElement(item:{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement,show:boolean}){
        const {parent,divCont,target,show}=item;
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
                    this.promRemoveElement(target).then(async(res)=>{
                        if(res){
                            this._modSelector.shiftPlace(res.placement);///REINDEX PLACEMENT!!!!
                        }
                    });
                    Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:500});
                    setTimeout(()=>{
                        parent.removeChild(divCont);
                       
                    },480);
                }
            });
        }else{
            if(getxDiv){

                if(check){
                   getxDiv.style.display="block";
                 }else{
                    getxDiv.style.display="none";
                 }
            }
        }
    };
    promRemoveElement(target:HTMLElement){
        return new Promise((resolve)=>{
            resolve(this.removeElement(target));
        }) as Promise<elementType|undefined>;
    };
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
    saveElement(item:{target:HTMLElement,element:elementType}){
        const {target,element}=item;
        const divCont=target.parentElement as HTMLElement;
        // const cleanEle=this.removePopup({divCont,target,ID:"popup-blogNameDesc",element});
       const elements= this._modSelector._elements.map((ele,index)=>{
            if(ele.eleId===element.eleId){
                ele=element;
            }
            return ele;
    });
    this.elements=elements;
    };
    elementAdder(item:{target:HTMLElement,blog:blogType,element:elementType}):Promise<elementType|undefined>{
        const {target,element,blog}=item;
        const len=this.elements.length;
        let tempEle:elementType|undefined=undefined;
        const check=this.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
        if(!check){
            tempEle={...element,
                id:len,
                blog_id:blog.id,
                placement:this.placement,
                inner_html:target.innerHTML,
                cssText:target.style.cssText,
                class:target.className,
                attr:element.attr,
                type:element.type ? element.type : "headerflag"
            };
            this.elements=[...this.elements,{...tempEle}]
            this.placement=this.placement + 1;
        }
        return new Promise(resolver=>{
            resolver(tempEle);
        }) as Promise<elementType|undefined>;
    };
    removePopup(item:{divCont:HTMLElement,target:HTMLElement,ID:string,element:elementType}):elementType{
        const {divCont,target,ID,element}=item;
        let ele:elementType={} as elementType;
        this.cleanUpByQuery({target:divCont,classOrID:ID});
        ele={...element,inner_html:target.innerHTML};
        return ele;
    }
    //---------------------------ultils----------------------------//

};
export default Headerflag;
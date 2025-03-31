import { FaCrosshairs } from "react-icons/fa";
import Header from "../editor/header";
import ModSelector from "../editor/modSelector";
import { arrImgType3, imageType } from "../editor/Types";
import Nav from "../nav/headerNav";
import {FaCreate} from './ReactIcons';
import Misc from "./misc";
import Service from "./services";
import { idValueType, selRowColType, selRowType } from "@/lib/attributeTypes";



class LoadMisc {
    _arrImgs:imageType[]
    _arrLoadImgs:arrImgType3[];
    constructor(private _modSelector:ModSelector,private _service:Service){
        this._arrImgs=[
            {id:0,name:"Explore",image:"https://images.unsplash.com/photo-1657736301709-b1365740ddbe?crop=entropy",},
            {id:1,name:"symetric",image:"https://images.unsplash.com/photo-1658288797137-7ca820c77a2b?crop=entropy"},
            {id:2,name:"fast",image:"https://images.unsplash.com/photo-1657987273071-fbe77b5b4e90?crop=entropy&h=900"},
            {id:3,name:"elagent",image:"https://images.unsplash.com/photo-1655760862449-52e5b2bd8620?crop=entropy"},
            {id:4,name:"symetry",image:"https://images.unsplash.com/photo-1657963928657-9da48ea0c496?crop=entropy"},
            {id:5,name:"time",image:"https://images.unsplash.com/photo-1656922612260-2ebb170dd637?crop=entropy"},
            {id:6,name:"wonder",image:"https://images.unsplash.com/photo-1656342468017-a298b6c63cc9?crop=entropy"},
            {id:7,name:"tranquil",image:"https://images.unsplash.com/photo-1658137135662-82ab663ee627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"},
            {id:8,name:"majestic",image:"https://images.unsplash.com/photo-1657653463810-fa2f223fbb82?crop=entropy"},
            {id:9,name:"earth",image:"https://images.unsplash.com/photo-1657832034979-e2f9c5b0a2fc?crop=fit&h=900"},
            
        ];
        this._arrLoadImgs=[];
    }
    set arrImgs(arrImgs:imageType[]){
        this._arrImgs=arrImgs;
    };
    get arrImgs(){
        return this._arrImgs;
    }
    set arrLoadImgs(imgsLoadImgs:arrImgType3[]){
        this._arrLoadImgs=imgsLoadImgs;
    }
    get arrLoadImgs(){
        return this._arrLoadImgs;
    }
    //Injection:Main.textArea
    main({parent,idValues}:{parent:HTMLElement,idValues:idValueType[]}){
        Header.cleanUpByID(parent,"loadMisc-popup");
        const css="display:flex;justify-content:center;align-items:center;gap:1rem;flex-direction:column;border-radius:12px;";
        parent.style.zIndex="";
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.classList.add("popup");
        popup.id="loadMisc-popup";
        popup.style.cssText="margin:auto;position:absolute;box-shadow:1px 1px 12px 1px black;background-color:black;color:white;z-index:200;" + css;
        popup.style.inset="0%";
        popup.style.width="100%";
        popup.style.height="auto";
        popup.style.marginInline="5rem";
        popup.style.marginBlock="3rem";
        popup.style.paddingBlock="4rem";
        popup.style.paddingInline="10rem";
        const container=document.createElement("div");
        container.style.cssText="display:flex;align-items:center;gap:1rem;flex-direction:column;border-radius:12px;margin:auto;overflow-y:scroll;width:100%;position:relative;padding:1rem;background:lightblue;";
        const row=document.createElement("div");
        row.className="row gap-1 align-items-center";
        row.style.cssText="margin:auto;position:relative;display:flex;justify-content:center;align-items:center;gap:1rem;"
                this.arrImgs.map((item,index)=>{
                    if(item){
                        const col=document.createElement("div");
                        col.id="col"+ `-${index}`
                        col.className="col-md-3";
                        col.style.cssText="box-shadow:1px 1px 12px 1px black;border-radius:10px;padding:1rem;position:relative;display:flex;justify-content:center;flex-direction:column;align-items:center;gap:1rem;";
                        const img=document.createElement("img");
                         img.className="loaded-images";
                        img.style.cssText="margin:auto;filter:drop-shadow(0 0 0.5rem blue);";
                        img.style.width=`100%`;
                        img.src=item.image;
                        img.alt=item.name;
                        col.appendChild(img);
                        row.appendChild(col);
                        Misc.blurIn({anchor:img,blur:"20px",time:400});
                        const {button:select}=Misc.simpleButton({anchor:col,text:"select",bg:"green",color:"white",type:"button",time:400});
                        select.onclick=(e:MouseEvent)=>{
                            if(e){
                                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    parent.removeChild(popup);
                                    setTimeout(()=>{
                                        const main_container=parent.parentElement;
                                        if(!main_container) return;
                                        this.injectImage({parent:main_container,item,css,idValues});
                                    },300);
                                },380);
                            }
                        };
                    }
                });

            
       
        container.appendChild(row);
        popup.appendChild(container);
        parent.appendChild(popup);
        const btnGrp=document.createElement("div");
        btnGrp.style.cssText="display:flex;justify-content:center;align-items:center;gap:3rem;;padding-block:3rem;margin-block:2rem;"
        popup.appendChild(btnGrp);
        const {button}=Misc.simpleButton({anchor:btnGrp,text:"close",bg:Nav.btnColor,color:"white",type:"button",time:400});
        
        button.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:30,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },370);
            }
        };
        Misc.matchMedia({parent:popup,maxWidth:1100,cssStyle:{width:"auto",marginInline:"0rem",paddingInline:"3rem",paddingBlock:"6rem"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{width:"auto",marginInline:"0rem",paddingInline:"1rem",paddingBlock:"2rem",inset:"auto",top:"2.5%",left:"0%",right:"0%"}});
    }
    //parent=Injection Main.container
    injectImage({parent,item,css,idValues}:{
        parent:HTMLElement,
        item:imageType,
        css:string,
        idValues:idValueType[],

    }){
        //Parent covers Headers and Footer it searches is-elements>img
        Header.cleanUpByID(parent,"injectImage-popup");
        
        //imgs are the same as above( NEED A FILTER TO ELIMATE TO LOADED IMAGES!!)
        //GETTING ELEMENTS
        const rows:HTMLElement[]|null=parent.querySelectorAll("[data-is-row='true']") as any as HTMLElement[] | null;
        const columns:HTMLElement[]|null=parent.querySelectorAll("[data-is-column='true']") as any as HTMLElement[] | null;
        const elements:HTMLElement[]|null=parent.querySelectorAll("[is-element='true']") as any as HTMLElement[] | null
        const imgsFound:arrImgType3[]=this.gettingAllimages({elements,columns,rows,idValues});
        if(imgsFound && imgsFound.length>0){
            
            parent.style.zIndex="";
            parent.style.position="relative";
            const popup=document.createElement("div");
            popup.id="injectImage-popup";
            popup.classList.add("popup");
            popup.style.cssText="margin:auto;position:absolute;box-shadow:1px 1px 12px 1px black;background-color:black;color:white;z-index:200;padding:1rem;" + css;
            popup.style.inset="20%";
            popup.style.height="auto";
            popup.style.marginInline="5rem";
            popup.style.marginBlock="3rem";
            popup.style.paddingBlock="4rem";
            popup.style.paddingInline="2rem";
            const container=document.createElement("div");
            container.id="injectImage-popup-inner"
            container.style.cssText="height:inherit;overflow-y:scroll;width:inherit;color:black;border-radius:13px;width:100%;padding-inline:1rem;padding-block:2rem;background-color:lightblue;";
            popup.appendChild(container);
            const row=document.createElement("div");
            row.className="row gap-1 align-items-center";
            row.style.cssText="margin:auto;position:relative;display:flex;justify-content:center;align-items:center;gap:1rem;width:inherit;background-color:white;border-radius:inherit;";
            container.appendChild(row);
            imgsFound.map(imgFound=>{
            if(imgFound){
                const col=document.createElement("div");
                col.className="col-md-6";
                col.style.cssText="box-shadow:1px 1px 12px 1px black;border-radius:inherit;padding:1rem;position:relative;display:flex;justify-content:center;flex-direction:column;align-items:center;gap:1rem;border-radius:12px;box-shadow:1px 1px 12px 1px white;";
                const h6=document.createElement("h6");
                h6.className="text-center text-primary mb-2 text-decoration-underline text-underline-offset-3";
                h6.textContent=item.name;
                col.appendChild(h6);
                const img=document.createElement("img");
                img.style.cssText="border-radius:50%;width:125px;filter:drop-shadow(0 0 0.5rem black);aspect-ratio: 1 /1;";
               
                img.src=imgFound.img;
                img.alt=imgFound.name;
                col.appendChild(img);
                row.appendChild(col);
                //-------DELETE----////
                const xDiv=document.createElement("div");
                xDiv.id="delete-popup";
                xDiv.className="popup";
                xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(14px,-14px);padding:5px;background:black;border-radius:50%;width:fit-content;z-index:2000";
                FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"18px",borderRadius:"50%"}});
                popup.appendChild(xDiv)
                xDiv.onclick=(e:MouseEvent)=>{
                    if(e){
                        Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                        setTimeout(()=>{parent.removeChild(popup);},390);
                    }
                }
                //-------DELETE----////
                const {button:insert}=Misc.simpleButton({anchor:col,text:"insert",bg:Nav.btnColor,color:"white",type:"button",time:400});
                insert.onclick=(e:MouseEvent)=>{
                    //SELECTED IMAGE TO BE INSERTED
                    if(e){
                        const selRowCol={...imgFound.selRowCol} as selRowColType; 
                        const isShapeOutside=this._modSelector.dataset.getAttribute({target:imgFound.html,id:"shapeOutside"});
                        if(imgFound.loc==="element" && !(isShapeOutside && isShapeOutside.length>0)){
                            (imgFound.html as HTMLImageElement).src=item.image;//Changing image
                            (imgFound.html as HTMLImageElement).alt=item.name;//Changing image
                          
                            if(imgFound.imgKey){
                                this._service.adminImagemark(imgFound.imgKey,true).then(async(res)=>{
                                    if(res){
                                        this._modSelector.updateElement({target:imgFound.html,idValues,selRowCol});
                                        this._arrLoadImgs=[];
                                    }
                                });
                            }else{
                                this._modSelector.updateElement({target:imgFound.html,idValues,selRowCol});
                                this._arrLoadImgs=[];
                            }
                        }else if(isShapeOutside){
                            const selRowCol={...imgFound.selRowCol} as selRowColType;
                            if(!(imgFound.html.getAttribute("data-shapeoutside-polygon"))){
                                const para=imgFound.html.parentElement;
                                if(!para) return;
                                (imgFound.html as HTMLImageElement).src=item.image;//Changing image
                                (imgFound.html as HTMLImageElement).alt=item.name;//Changing image
                                 if(imgFound.imgKey){
                                    para.setAttribute("imgKey","");
                                    this._service.adminImagemark(imgFound.imgKey,true).then(async(res)=>{
                                        if(res){
                                            this._modSelector.updateElement({target:para,idValues,selRowCol});
                                            this._arrLoadImgs=[];
                                        }
                                    });
                                }else{
                                    this._modSelector.updateElement({target:para,idValues,selRowCol});
                                            this._arrLoadImgs=[];
                                }
                            }else{
                                const selRowCol={...imgFound.selRowCol} as selRowColType;
                                const child=imgFound.html.parentElement;
                                if(!child) return;
                                const para=child.parentElement;
                                if(!para) return;
                                (imgFound.html as HTMLImageElement).src=item.image;//Changing image
                                (imgFound.html as HTMLImageElement).alt=item.name;//Changing image
                                if(imgFound.imgKey){
                                    para.setAttribute("imgKey","");
                                    this._service.adminImagemark(imgFound.imgKey,true).then(async(res)=>{
                                        if(res){
                                            this._modSelector.updateElement({target:para,idValues,selRowCol});
                                            this._arrLoadImgs=[];
                                        }
                                    });
                                }else{
                                    this._modSelector.updateElement({target:para,idValues,selRowCol});
                                            this._arrLoadImgs=[];
                                }
                            }

                        }else if(imgFound.loc==="col"){
                            const isShape=this._modSelector.dataset.getAttribute({target:imgFound.html,id:"shapeOutside"});
                            const selRowCol={...imgFound.selRowCol} as selRowColType;
                            if(!isShape){
                                imgFound.html.style.backgroundImage="url(" + item.image + ")";
                                    if(imgFound.imgKey){
                                        this._service.adminImagemark(imgFound.imgKey,true).then(async(res)=>{
                                            if(res){
                                                const selRowCol:selRowColType={...imgFound.selRowCol} as selRowColType;
                                                this._modSelector.updateColumn({target:imgFound.html,idValues,selRowCol});
                                                this._arrLoadImgs=[];
                                            }
                                        });
                                    }
                                    this._modSelector.updateColumn({target:imgFound.html,idValues,selRowCol});
                                    this._arrLoadImgs=[];
                               
                            }else if(!(imgFound.html.getAttribute("data-shapeoutside-polygon"))){
                                    const para=imgFound.html.parentElement;
                                    if(!para) return;
                                    (imgFound.html as HTMLImageElement).src=item.image;//Changing image
                                    (imgFound.html as HTMLImageElement).alt=item.name;//Changing image
                                     if(imgFound.imgKey){
                                        para.setAttribute("imgKey","");
                                        this._service.adminImagemark(imgFound.imgKey,true).then(async(res)=>{
                                            if(res){
                                                const selRowCol={...imgFound.selRowCol} as selRowColType;
                                                this._modSelector.updateElement({target:para,idValues,selRowCol});
                                                this._arrLoadImgs=[];
                                            }
                                        });
                                    }else{
                                        const selRowCol={...imgFound.selRowCol} as selRowColType;
                                        this._modSelector.updateElement({target:para,idValues,selRowCol});
                                                this._arrLoadImgs=[];
                                    }
                                }else{
                                    const child=imgFound.html.parentElement;
                                    if(!child) return;
                                    const para=child.parentElement;
                                    if(!para) return;
                                    const selRowCol={...imgFound.selRowCol} as selRowColType;
                                    (imgFound.html as HTMLImageElement).src=item.image;//Changing image
                                    (imgFound.html as HTMLImageElement).alt=item.name;//Changing image
                                    if(imgFound.imgKey){
                                        para.setAttribute("imgKey","");
                                        this._service.adminImagemark(imgFound.imgKey,true).then(async(res)=>{
                                            if(res){
                                                this._modSelector.updateElement({target:para,idValues,selRowCol});
                                                this._arrLoadImgs=[];
                                            }
                                        });
                                    }else{
                                        this._modSelector.updateElement({target:para,idValues,selRowCol});
                                                this._arrLoadImgs=[];
                                    }
                                }
                            
                        } else if(imgFound.loc==="row"){
                            imgFound.html.style.backgroundImage="url(" + item.image + ")";
                            const {selectorId,rowId}=imgFound.selRowCol as selRowColType
                            const selRow={selectorId,rowId};
                          
                            
                                if(imgFound.imgKey){
                                    this._service.adminImagemark(imgFound.imgKey,true).then(async(res)=>{
                                        if(res){
                                            this._modSelector.updateRow({target:imgFound.html,idValues,selRow});
                                            this._arrLoadImgs=[];
                                        }
                                    });
                                }
                                this._modSelector.updateRow({target:imgFound.html,idValues,selRow});
                                    this._arrLoadImgs=[];
                            
                        }
                        
                        Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                        setTimeout(()=>{parent.removeChild(popup);},390);
                    }
                };
            }else{
            Misc.msgSourceImage({parent,msg:"there are no imgs found.Note:it checks the full main container doc.load an image",src:item.image,width:125,quality:75,time:2800,cssStyle:{background:"white",boxShadow:"1px 1px 12px 1px black",borderRadius:"12px"}});
            }
            });
            
            parent.appendChild(popup);
            Misc.matchMedia({parent:popup,maxWidth:1100,cssStyle:{marginInline:"0rem",paddingInline:"1rem",paddingBlock:"6rem",inset:"10%"}});
            Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{marginInline:"0rem",paddingBlock:"2rem",inset:"0%"}});
            Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{marginInline:"0rem",paddingBlock:"2rem",inset:"auto",top:"2.5%",left:"0%",right:"0%"}});
        }else{
            Misc.msgSourceImage({parent:parent,msg:"there are no imgs found.Note:it checks the full main container doc.load an image",src:item.image,width:125,quality:75,time:2800,cssStyle:{background:"white",boxShadow:"1px 1px 12px 1px black",borderRadius:"12px"}});
        };


    };



    gettingAllimages(item:{elements:HTMLElement[]|null,columns:HTMLElement[]|null,rows:HTMLElement[]|null,idValues:idValueType[]}):arrImgType3[]{
        const {elements,columns,rows,idValues}=item;
        const getElements:{html:HTMLElement,selRowCol:selRowColType|null}[]=[];
        const getColumns:{html:HTMLElement|null,selRowCol:selRowColType}[]=[];
        const getRows:{html:HTMLElement|null,selRow:selRowType}[]=[];
        if(elements && elements.length>0){
            const shapeOutsides=[...elements].filter(ele=>(ele.nodeName==="P")).filter(para=>(this._modSelector.dataset.getAttribute({target:para,id:"shapeOutside"})));
            
            const imgs=[...elements].filter(ele=>(ele.nodeName==="IMG")) as HTMLImageElement[] | null
            if(imgs && imgs.length>0){
                imgs.map((img,index)=>{
                    if(img){
                        const idValue=this._modSelector.dataset.getIdValue({target:img,id:"imgKey",idValues});
                        const getselRowCol=this._modSelector.dataset.getIdValue({target:img,idValues,id:"selRowCol"});
                        const imgKey=idValue?.attValue || undefined;
                        const selRowCol=getselRowCol ?  JSON.parse(getselRowCol.attValue) as selRowColType:null;
                        this._arrLoadImgs.push({id:index,html:img,name:img.alt,img:img.src,loc:"element",imgKey:imgKey,selRowCol})
                    }
                });
            }
            if(shapeOutsides && shapeOutsides.length>0){
                    ([...shapeOutsides as any] as HTMLParagraphElement[]).map(para=>{
                        if(para && para.nodeName==="P"){
                            const idValue=this._modSelector.dataset.getIdValue({target:para,id:"imgKey",idValues});
                            const getselRowCol=this._modSelector.dataset.getIdValue({target:para,idValues,id:"selRowCol"});
                            const imgKey=idValue?.attValue || undefined;
                            const selRowCol=getselRowCol ?  JSON.parse(getselRowCol.attValue) as selRowColType:null;
                            ([...para.children as any] as HTMLElement[]).map((child,index)=>{
                                if(child && child.nodeName==="IMG"){
                                    const img=child as HTMLImageElement;
                                    this._arrLoadImgs.push({id:index,html:img,name:img.alt,img:img.src,loc:"element",imgKey:imgKey,selRowCol})
                                }
                            });
                        }
                    });
                
             
            }
        }
        if(columns && columns.length>0){
            const getColumns=[...columns as any] as HTMLElement[];
            getColumns.map(col=>{
                const idValue=this._modSelector.dataset.getIdValue({target:col,id:"imgKey",idValues});
                const getselRowCol=this._modSelector.dataset.getIdValue({target:col,idValues,id:"selRowCol"});
                const imgKey=idValue?.attValue || undefined;
                const selRowCol=getselRowCol ?  JSON.parse(getselRowCol.attValue) as selRowColType:null;
                if(col){
                    let index=0;
                    for(const [key,value] of Object.entries(col.style) ){
                        if(key==="backgroundImage" && value){
                            const getSrc=this.regClean({str:value,start:/url\(/g,end:/\)/g});;
                            this._arrLoadImgs.push({id:index,html:col,name:col.nodeName,img:getSrc,imgKey:imgKey,loc:"col",selRowCol});
                            index++;
                        }
                    };

                    ([...col.children as any] as HTMLElement[]).map(divCont=>{
                            if(divCont){
                                ([...divCont.children as any] as HTMLElement[]).map(targ=>{
                                    if(targ && targ.nodeName==="P"){
                                        const isShape=this._modSelector.dataset.getAttribute({target:targ,id:"shapeOutside"});
                                        if(isShape){
                                            const idValue=this._modSelector.dataset.getIdValue({target:targ,id:"imgKey",idValues});
                                            const getselRowCol=this._modSelector.dataset.getIdValue({target:targ,idValues,id:"selRowCol"});
                                            const imgKey=idValue?.attValue || undefined;
                                            const selRowCol=getselRowCol ?  JSON.parse(getselRowCol.attValue) as selRowColType:null;
                                            ([...targ.children as any ] as HTMLElement[]).map(img=>{
                                                if(img && img.nodeName==="IMG"){
                                                    const img_=img as HTMLImageElement
                                                    this._arrLoadImgs.push({id:index,html:col,name:col.nodeName,img:img_.src,imgKey:imgKey as string,loc:"col",selRowCol});
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                    });
                    
                }
            });
           
              
            
            
        }
        if(rows && rows.length>0){
            const getRows=[...rows as any] as HTMLElement[]
            getRows.map(row=>{
                const idValue:idValueType|null=this._modSelector.dataset.getIdValue({target:row,idValues,id:"imgKey"});
                const imgKey=idValue?.attValue || null;
                const idValueSel=this._modSelector.dataset.getIdValue({target:row,id:"selRow",idValues});
                const selRow_=idValueSel ? JSON.parse(idValueSel.attValue) as selRowType : null;
                const selRow=idValueSel?.attValue ? JSON.parse(idValueSel.attValue) as selRowType:selRow_;
                if(row){
                    let index=0;
                    for(const [key,value] of Object.entries(row.style) ){
                        if(key==="backgroundImage" && value){
                            const getSrc=this.regClean({str:value,start:/url\(/g,end:/\)/g});
                            const selRowCol:selRowColType|null= selRow ? {...selRow,colId:""}:null
                            this._arrLoadImgs.push({id:index,html:row,name:row.nodeName,img:getSrc,imgKey:imgKey as string,loc:"row",selRowCol})
                            index++;
                        }
                    }
                    
                }
            });
        }
        return this._arrLoadImgs
    }
    regClean(item:{str:string,start:RegExp,end:RegExp}):string{
        const {str,start,end}=item;
        let word="";
        let word2="";
        if(!str) return word;
        const starts=str.matchAll(start) as any;
        const ends=str.matchAll(end) as any;
        for(const matchStart of starts){
            for ( const matchEnd of ends){
                word=str.slice(matchStart.index + matchStart[0].length,matchEnd.index + matchEnd[0].length-1).trim()
            }
        }
        if(!word) return "";
        const start2:RegExp=/(https:\/\/)[0-9a-z-.?=/]{2,}|(blob:http:\/\/)[0-9a-z\-:/]{2,}/g;
        const end2:RegExp=/"/g;
        const start2Match=word.matchAll(start2) as any;
        const end2Match=word.matchAll(end2) as any;
        console.log(end2Match)
        for (const matchOne of start2Match){
            for (const matchend of end2Match){
                // console.log("matchOne",matchOne,"matchEnd",matchend)
                // console.log("matchStart[0]",matchOne[0],"matchend[0]",matchend[0])
                word2=word.slice(matchOne.index,matchend.index).trim()
            }
        }
        return word2;
    }
    
}
export default LoadMisc;
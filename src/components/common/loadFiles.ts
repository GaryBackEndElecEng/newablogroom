import { FaCrosshairs } from "react-icons/fa";
import Header from "../editor/header";
import ModSelector from "../editor/modSelector";
import { arrImgType3, flexType, imageType } from "../editor/Types";
import Nav from "../nav/headerNav";
import {FaCreate} from './ReactIcons';
import Misc from "./misc";
import Service from "./services";



class LoadMisc {
    _arrImgs:imageType[]
    _arrLoadImgs:arrImgType3[];
    constructor(private _modSelector:ModSelector,private _service:Service){
        this._arrImgs=[];
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
    main(parent:HTMLElement){
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
        this._service.getImages().then(async(res:imageType[])=>{
            if(res){
                this.arrImgs=res;
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
                                        this.injectImage(main_container,item,css);
                                    },300);
                                },380);
                            }
                        };
                    }
                });

            }
        });
        container.appendChild(row);
        popup.appendChild(container);
        parent.appendChild(popup);
        const btnGrp=document.createElement("div");
        btnGrp.style.cssText="display:flex;justify-content:center;align-items:center;gap:3rem;;padding-block:3rem;margin-block:2rem;"
        popup.appendChild(btnGrp);
        const {button}=Misc.simpleButton({anchor:btnGrp,text:"close",bg:Nav.btnColor,color:"white",type:"button",time:400});
        const {button:editor}=Misc.simpleButton({anchor:btnGrp,text:"some",bg:"green",color:"white",type:"button",time:400});
        editor.onclick=(e:MouseEvent)=>{
            if(e){
                
            }
        };
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
    injectImage(parent:HTMLElement,item:imageType,css:string){
        //Parent covers Headers and Footer it searches is-elements>img
        Header.cleanUpByID(parent,"injectImage-popup");
        
        //imgs are the same as above( NEED A FILTER TO ELIMATE TO LOADED IMAGES!!)
        //GETTING ELEMENTS
        const getElements:HTMLElement[]|null=parent.querySelectorAll("[is-element='true']") as any as HTMLElement[] | null;
        const getColumns:HTMLElement[]|null=parent.querySelectorAll("[is-column='true']") as any as HTMLElement[] | null;
        const getRows:HTMLElement[]|null=parent.querySelectorAll("[is-row='true']") as any as HTMLElement[] | null;
        const imgsFound:arrImgType3[]=this.gettingAllimages({elements:getElements,columns:getColumns,rows:getRows});
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
                        const shapeOutsides=[imgFound.html.getAttribute("data-shapeoutside-circle"),imgFound.html.getAttribute("data-shapeoutside-square"),imgFound.html.getAttribute("data-shapeoutside-polygon")]
                        const isShapeOutside=shapeOutsides.filter(isShape=>(isShape !==null));
                        if(imgFound.loc==="element" && !(isShapeOutside && isShapeOutside.length>0)){
                            (imgFound.html as HTMLImageElement).src=item.image;//Changing image
                            (imgFound.html as HTMLImageElement).alt=item.name;//Changing image
                            const {parsed,isJSON}=Header.checkJson(imgFound.html.getAttribute("flex"));
                            const getImgKey=imgFound.html.getAttribute("imgKey");
                            if(isJSON){
                                let flex=parsed as flexType;
                                flex={...flex,imgKey:undefined};
                                imgFound.html.setAttribute("flex",JSON.stringify(flex));
                            }else if(getImgKey){
                                imgFound.html.setAttribute("imgKey","");
                            }
                            if(imgFound.imgKey){
                                this._service.adminImagemark(imgFound.imgKey).then(async(res)=>{
                                    if(res){
                                        this._modSelector.updateElement(imgFound.html);
                                        this._arrLoadImgs=[];
                                    }
                                });
                            }else{
                                this._modSelector.updateElement(imgFound.html);
                                this._arrLoadImgs=[];
                            }
                        }else if(isShapeOutside){
                            if(!(imgFound.html.getAttribute("data-shapeoutside-polygon"))){
                                const para=imgFound.html.parentElement;
                                if(!para) return;
                                (imgFound.html as HTMLImageElement).src=item.image;//Changing image
                                (imgFound.html as HTMLImageElement).alt=item.name;//Changing image
                                 if(imgFound.imgKey){
                                    para.setAttribute("imgKey","");
                                    this._service.adminImagemark(imgFound.imgKey).then(async(res)=>{
                                        if(res){
                                            this._modSelector.updateElement(para);
                                            this._arrLoadImgs=[];
                                        }
                                    });
                                }else{
                                    this._modSelector.updateElement(para);
                                            this._arrLoadImgs=[];
                                }
                            }else{
                                const child=imgFound.html.parentElement;
                                if(!child) return;
                                const para=child.parentElement;
                                if(!para) return;
                                (imgFound.html as HTMLImageElement).src=item.image;//Changing image
                                (imgFound.html as HTMLImageElement).alt=item.name;//Changing image
                                if(imgFound.imgKey){
                                    para.setAttribute("imgKey","");
                                    this._service.adminImagemark(imgFound.imgKey).then(async(res)=>{
                                        if(res){
                                            this._modSelector.updateElement(para);
                                            this._arrLoadImgs=[];
                                        }
                                    });
                                }else{
                                    this._modSelector.updateElement(para);
                                            this._arrLoadImgs=[];
                                }
                            }

                        }else if(imgFound.loc==="col"){
                            const shapeOutsides=[imgFound.html.getAttribute("data-shapeoutside-circle"),imgFound.html.getAttribute("data-shapeoutside-square"),imgFound.html.getAttribute("data-shapeoutside-polygon")]
                            const isShapeOutside=shapeOutsides.filter(isShape=>(isShape !==null));
                            if(!isShapeOutside){
                                imgFound.html.style.backgroundImage="url(" + item.image + ")";
                                const {parsed,isJSON}=Header.checkJson(imgFound.html.getAttribute("flex"));
                                if(isJSON){
                                    let flex=parsed as flexType;
                                    flex={...flex,imgKey:undefined};
                                    imgFound.html.setAttribute("flex",JSON.stringify(flex));
                            
                                    if(imgFound.imgKey){
                                        this._service.adminImagemark(imgFound.imgKey).then(async(res)=>{
                                            if(res){
                                                this._modSelector.updateColumn(imgFound.html,flex);
                                                this._arrLoadImgs=[];
                                            }
                                        });
                                    }
                                    this._modSelector.updateColumn(imgFound.html,flex);
                                    this._arrLoadImgs=[];
                                }
                            }else{
                                if(!(imgFound.html.getAttribute("data-shapeoutside-polygon"))){
                                    const para=imgFound.html.parentElement;
                                    if(!para) return;
                                    (imgFound.html as HTMLImageElement).src=item.image;//Changing image
                                    (imgFound.html as HTMLImageElement).alt=item.name;//Changing image
                                     if(imgFound.imgKey){
                                        para.setAttribute("imgKey","");
                                        this._service.adminImagemark(imgFound.imgKey).then(async(res)=>{
                                            if(res){
                                                this._modSelector.updateElement(para);
                                                this._arrLoadImgs=[];
                                            }
                                        });
                                    }else{
                                        this._modSelector.updateElement(para);
                                                this._arrLoadImgs=[];
                                    }
                                }else{
                                    const child=imgFound.html.parentElement;
                                    if(!child) return;
                                    const para=child.parentElement;
                                    if(!para) return;
                                    (imgFound.html as HTMLImageElement).src=item.image;//Changing image
                                    (imgFound.html as HTMLImageElement).alt=item.name;//Changing image
                                    if(imgFound.imgKey){
                                        para.setAttribute("imgKey","");
                                        this._service.adminImagemark(imgFound.imgKey).then(async(res)=>{
                                            if(res){
                                                this._modSelector.updateElement(para);
                                                this._arrLoadImgs=[];
                                            }
                                        });
                                    }else{
                                        this._modSelector.updateElement(para);
                                                this._arrLoadImgs=[];
                                    }
                                }
                            }
                        }if(imgFound.loc==="row"){
                            imgFound.html.style.backgroundImage="url(" + item.image + ")";
                            const {parsed,isJSON}=Header.checkJson(imgFound.html.getAttribute("flex"));
                            if(isJSON){
                                let flex=parsed as flexType;
                                flex={...flex,imgKey:undefined};
                                imgFound.html.setAttribute("flex",JSON.stringify(flex));
                            
                                if(imgFound.imgKey){
                                    this._service.adminImagemark(imgFound.imgKey).then(async(res)=>{
                                        if(res){
                                            this._modSelector.updateRow(imgFound.html,flex);
                                            this._arrLoadImgs=[];
                                        }
                                    });
                                }
                                this._modSelector.updateRow(imgFound.html,flex);
                                    this._arrLoadImgs=[];
                            }
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


    }
    gettingAllimages(item:{elements:HTMLElement[]|null,columns:HTMLElement[]|null,rows:HTMLElement[]|null}):arrImgType3[]{
        const {elements,columns,rows}=item;
        if(elements && elements.length>0){
            const shapeOutsides_circle=[...elements].filter(ele=>(ele.nodeName==="P")).filter(para=>(para.getAttribute("data-shapeOutside-circle")));
            const shapeOutsides_square=[...elements].filter(ele=>(ele.nodeName==="P")).filter(para=>(para.getAttribute("data-shapeOutside-square")));
            const shapeOutsides_polygon=[...elements].filter(ele=>(ele.nodeName==="P")).filter(para=>(para.getAttribute("data-shapeOutside-polygon")));
            const imgs=[...elements].filter(ele=>(ele.nodeName==="IMG")) as HTMLImageElement[] | null
            if(imgs && imgs.length>0){
                imgs.map((img,index)=>{
                    if(img){
                        const {parsed,isJSON}=Header.checkJson(img.getAttribute("flex"));
                        const getImgKey=img.getAttribute("imgKey");
                        let imgKey:string|undefined;
                        if(isJSON){
                            const flex=parsed as flexType;
                            imgKey=flex.imgKey ? flex.imgKey : undefined;
                        }else if(getImgKey){
                            imgKey=getImgKey;
                        }
                        this._arrLoadImgs.push({id:index,html:img,name:img.alt,img:img.src,loc:"element",imgKey:imgKey})
                    }
                });
            }
            if(((shapeOutsides_circle && shapeOutsides_circle.length>0) || (shapeOutsides_square && shapeOutsides_square.length>0) || (shapeOutsides_polygon && shapeOutsides_polygon.length>0))){
                if(shapeOutsides_circle){
                    ([...shapeOutsides_circle as any] as HTMLParagraphElement[]).map(para=>{
                        if(para && para.nodeName==="P"){
                            let imgKey:string|undefined;
                            imgKey=para.getAttribute("imgKey") ? para.getAttribute("imgKey") as string:undefined;
                            const {isJSON,parsed}=Header.checkJson(para.getAttribute("flex"));
                            if(isJSON){
                                const flex=parsed as flexType;
                                imgKey=flex.imgKey;
                            }
                            ([...para.children as any] as HTMLElement[]).map((child,index)=>{
                                if(child && child.nodeName==="IMG"){
                                    const img=child as HTMLImageElement;
                                    this._arrLoadImgs.push({id:index,html:img,name:img.alt,img:img.src,loc:"element",imgKey:imgKey})
                                }
                            });
                        }
                    });
                }
                if(shapeOutsides_square){
                    ([...shapeOutsides_square as any] as HTMLParagraphElement[]).map(para=>{
                        if(para && para.nodeName==="P"){
                            let imgKey:string|undefined;
                            imgKey=para.getAttribute("imgKey") ? para.getAttribute("imgKey") as string:undefined;
                            const {isJSON,parsed}=Header.checkJson(para.getAttribute("flex"));
                            if(isJSON){
                                const flex=parsed as flexType;
                                imgKey=flex.imgKey;
                            }
                            ([...para.children as any] as HTMLElement[]).map((child,index)=>{
                                if(child && child.nodeName==="IMG"){
                                    const img=child as HTMLImageElement;
                                    this._arrLoadImgs.push({id:index,html:img,name:img.alt,img:img.src,loc:"element",imgKey:imgKey})
                                }
                            });
                        }
                    });
                }
                if(shapeOutsides_polygon && shapeOutsides_polygon.length>0){
                    ([...shapeOutsides_polygon as any] as HTMLParagraphElement[]).map(para=>{
                        if(para && para.nodeName==="P"){
                            let imgKey:string|undefined;
                            imgKey=para.getAttribute("imgKey") ? para.getAttribute("imgKey") as string:undefined;
                            const {isJSON,parsed}=Header.checkJson(para.getAttribute("flex"));
                            if(isJSON){
                                const flex=parsed as flexType;
                                imgKey=flex.imgKey;
                            }
                            ([...para.children as any] as HTMLElement[]).map((child,index)=>{
                                ([...child.children as any] as HTMLElement[]).map(ch=>{
                                    if(ch && ch.nodeName==="IMG"){
                                        const img=ch as HTMLImageElement;
                                        this._arrLoadImgs.push({id:index,html:img,name:img.alt,img:img.src,loc:"element",imgKey:imgKey});
                                    }
                                });
                            });
                        }
                    });
                }
            }
        }
        if(columns && columns.length>0){
            const getColumns=[...columns as any] as HTMLElement[];
            const shapeOutsides_circle_col=[...columns].filter(ele=>(ele.nodeName==="P")).filter(para=>(para.getAttribute("data-shapeOutside-circle")));
            const shapeOutsides_square_col=[...columns].filter(ele=>(ele.nodeName==="P")).filter(para=>(para.getAttribute("data-shapeOutside-square")));
            const shapeOutsides_polygon_col=[...columns].filter(ele=>(ele.nodeName==="P")).filter(para=>(para.getAttribute("data-shapeOutside-polygon")));
            getColumns.map(col=>{
                const {parsed}=Header.checkJson(col.getAttribute("flex"));
                const flex=parsed as flexType;
                if(col){
                    let index=0;
                    for(const [key,value] of Object.entries(col.style) ){
                        if(key==="backgroundImage" && value){
                            const imgKey:string|undefined = flex.imgKey;
                            index+=1
                            if(!value)return;
                            const getSrc=this.regClean({str:value,start:/url\(/g,end:/\)/g});;
                            this._arrLoadImgs.push({id:index,html:col,name:col.nodeName,img:getSrc,imgKey:imgKey,loc:"col"})
                        }
                    }
                    
                }
            });
            if(((shapeOutsides_circle_col && shapeOutsides_circle_col.length>0) || (shapeOutsides_square_col && shapeOutsides_square_col.length>0) || (shapeOutsides_polygon_col && shapeOutsides_polygon_col.length>0))){
                if(shapeOutsides_circle_col){
                    ([...shapeOutsides_circle_col as any] as HTMLParagraphElement[]).map(para=>{
                        if(para && para.nodeName==="P"){
                            let imgKey:string|undefined;
                            const {isJSON,parsed}=Header.checkJson(para.getAttribute("flex"));
                            if(isJSON){
                                const flex=parsed as flexType;
                                imgKey=flex.imgKey;
                            }
                            ([...para.children as any] as HTMLElement[]).map((child,index)=>{
                                if(child && child.nodeName==="IMG"){
                                    const img=child as HTMLImageElement;
                                    this._arrLoadImgs.push({id:index,html:img,name:img.alt,img:img.src,loc:"col",imgKey:imgKey})
                                }
                            });
                        }
                    });
                }
                if(shapeOutsides_square_col){
                    ([...shapeOutsides_square_col as any] as HTMLParagraphElement[]).map(para=>{
                        if(para && para.nodeName==="P"){
                            let imgKey:string|undefined;
                            const {isJSON,parsed}=Header.checkJson(para.getAttribute("flex"));
                            if(isJSON){
                                const flex=parsed as flexType;
                                imgKey=flex.imgKey;
                            }
                            ([...para.children as any] as HTMLElement[]).map((child,index)=>{
                                if(child && child.nodeName==="IMG"){
                                    const img=child as HTMLImageElement;
                                    this._arrLoadImgs.push({id:index,html:img,name:img.alt,img:img.src,loc:"col",imgKey:imgKey})
                                }
                            });
                        }
                    });
                }
                if(shapeOutsides_polygon_col && shapeOutsides_polygon_col.length>0){
                    ([...shapeOutsides_polygon_col as any] as HTMLParagraphElement[]).map(para=>{
                        if(para && para.nodeName==="P"){
                            let imgKey:string|undefined;
                            const {isJSON,parsed}=Header.checkJson(para.getAttribute("flex"));
                            if(isJSON){
                                const flex=parsed as flexType;
                                imgKey=flex.imgKey;
                            }
                            ([...para.children as any] as HTMLElement[]).map((child,index)=>{
                                ([...child.children as any] as HTMLElement[]).map(ch=>{
                                    if(ch && ch.nodeName==="IMG"){
                                        const img=ch as HTMLImageElement;
                                        this._arrLoadImgs.push({id:index,html:img,name:img.alt,img:img.src,loc:"col",imgKey:imgKey});
                                    }
                                });
                            });
                        }
                    });
                }
            }
            
        }
        if(rows && rows.length>0){
            const getRows=[...rows as any] as HTMLElement[]
            getRows.map(row=>{
                const {parsed}=Header.checkJson(row.getAttribute("flex"));
                const flex=parsed as flexType;
                if(row){
                    let index=0;
                    for(const [key,value] of Object.entries(row.style) ){
                        if(key==="backgroundImage" && value){
                            const imgKey:string|undefined = flex.imgKey;
                            index+=1
                            if(!value) return
                            const getSrc=this.regClean({str:value,start:/url\(/g,end:/\)/g});
                            if(getSrc){
                            }
                            console.log(getSrc)
                            this._arrLoadImgs.push({id:index,html:row,name:row.nodeName,img:getSrc,imgKey:imgKey,loc:"row"})
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
        const start2:RegExp=/(https\:\/\/)[0-9a-z\-\.\?\=\/]{2,}|(blob\:http\:\/\/)[0-9a-z\-\:\/]{2,}/g;
        const end2:RegExp=/\"/g;
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
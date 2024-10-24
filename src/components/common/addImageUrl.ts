import { FaCrosshairs } from "react-icons/fa";
import Header from "../editor/header";
import ModSelector from "../editor/modSelector";
import { blogType, deletedImgType, flexType, gets3ImgKey } from "../editor/Types";
import Nav from "../nav/headerNav";
import Misc from "./misc";
import { FaCreate } from "./ReactIcons";
import Service from "./services";
import { AWSImageLoader } from "./tsFunctions";


class AddImageUrl {
    mainContainer:HTMLElement;
    imageUrls:{name:string,url:string}[];
    imgEles:{level:"element"|"col"|"row",img:HTMLImageElement|HTMLElement}[];
    constructor(private _modSelector:ModSelector,private _service:Service){
        this.imageUrls=[
            {name:"all you need",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/allYouNeed.png"},
            {name:"blackhole",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/blackhole.png"},
            {name:"children",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/children.png"},
            {name:"coffeeTime",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/coffeeTime.png"},
            {name:"dynamicArt",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/dynamic_art.png"},
            {name:"einstein",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/einsteing.png"},
            {name:"goldenRatio",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/goldenRatio.png"},
            {name:"goldenRule",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/goldenRule.png"},
            {name:"welcome",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/main.png"},
            {name:"precious",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/precious.png"},
            {name:"relax",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/relaxing.png"},
            {name:"seasons",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/seasons.png"},
            {name:"work",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/video/pics/vacationWork.png"},
            {name:"align",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/alignment.png"},
            {name:"align",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/alignment.png"},
            {name:"articles",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/article.png"},
            {name:"bank",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/bank.png"},
            {name:"beauty",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/beautyGirl.png"},
            {name:"beauty",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/beautyGirl.png"},
            {name:"blackDesign",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/blackDesign.png"},
            {name:"book",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/book.png"},
            {name:"businessman",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/businessMan.png"},
            {name:"relaxing",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/checkout2.png"},
            {name:"relaxing",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/checkout2.png"},
            {name:"beach stroll",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/checkout1b.png"},
            {name:"cheetah",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/cheetaFramed.png"},
            {name:"cheetah",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/cheetaFramed.png"},
            {name:"graphic",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/consult1.png"},
            {name:"graphic",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/consult1.png"},
            {name:"graphic2",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/consult3.png"},
            {name:"graphic3",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/consult3.png"},
            {name:"graphic4",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/contactWallpaper.png"},
            {name:"corporate portal",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/corporatePortal.png"},
            {name:"corporate portal",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/corporatePortal.png"},
            {name:"beach relaxing",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/coupleOnBeach.png"},
            {name:"contact us",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/customPage.png"},
            {name:"contact us",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/customPage.png"},
            {name:"design graphic",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/design.png"},
            {name:"design graphic",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/design.png"},
            {name:"art",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/designMain.png"},
            {name:"earth",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/earth.png"},
            {name:"earth moon",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/earthMoon.png"},
            {name:"laugh",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/girlLaugh.png"},
            {name:"mountain",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/GreatMountain.png"},
            {name:"hand-shake",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/handShaking.png"},
            {name:"jupitor",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/jupiter.png"},
            {name:"faqs",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/FAQS.png"},
            {name:"landscape",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/landscape.png"},
            {name:"lepard",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/lepard.png"},
            {name:"lepard",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/lepard.png"},
            {name:"lions",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/lion.png"},
            {name:"lions",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/lion.png"},
            {name:"lions2",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/lions.png"},
            {name:"baby monkey",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/monkey2.png"},
            {name:"baby monkey",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/monkey2.png"},
            {name:"store front",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/storeFront.png"},
            {name:"zebra",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/zebra/zebra1.png"},
            {name:"zebra2",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/zebra/zebra3.png"},
            {name:"meeting",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/work.png"},
            {name:"turtle",url:"https://new-master.s3.ca-central-1.amazonaws.com/static/water/turtle.png"},

        ]
        this.mainContainer=document.querySelector("section#main") as HTMLElement;
        this.imgEles=[];
    }

    async main(item:{parent:HTMLElement,blog:blogType}){
        const {parent,blog}=item;
        this._modSelector.blog=blog;
        this.mainContainer=document.querySelector("section#main") as HTMLElement;
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.className="popup-main";
        popup.style.cssText="position:absolute;max-width:800px;width:fit-content;min-height:5vh;height:auto;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;padding:1rem;gap:1.5rem;z-index:200;top:0%;left:35%;right:35%;background-color:black;color:white;";
        parent.appendChild(popup);
        this.removePopup({parent,target:popup});
        const title=document.createElement("h6");
        title.className="text-center text-primary my-2";
        title.textContent="select an image to insert";
        popup.appendChild(title);
        const row=document.createElement("div");
        row.id="popup-main-row"
        row.className="row";
        row.style.cssText="padding-inline:1rem;";
        popup.appendChild(row);
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        //get images;
        const getImages=this.mainContainer.querySelectorAll("img") as any as HTMLImageElement[];
        const getColImgs=this.mainContainer.querySelectorAll("[is-column]") as any as HTMLElement[];
        const getRowImgs=this.mainContainer.querySelectorAll("[is-row]") as any as HTMLElement[];
        [...getColImgs].map(col=>{
            if(col){
                const str=typeof(col.style.backgroundImage)==="string" ? col.style.backgroundImage:null;
                if(!str)return;
                this.imgEles.push({level:"col",img:col as HTMLElement});
            }
        });
        [...getRowImgs].map(row=>{
            if(row){
                const str=typeof(row.style.backgroundImage)==="string" ? row.style.backgroundImage:null;
                if(!str)return;
                this.imgEles.push({level:"row",img:row as HTMLElement});
            }
        });
        [...getImages].map(img=>{
            if(img){
                this.imgEles.push({level:"element",img:img as HTMLImageElement});
            }
        });
        if(this.imgEles && this.imgEles.length>0){
            await Promise.all(this.imgEles.map(async(img_,index)=>{
                if(img_){

                    const divCont=document.createElement("div");
                    divCont.id=`divCont-${index}`;
                    divCont.style.cssText="padding:1rem;position:relative;flex:0 0 25%;display:flex;flex-direction:column;align-items:center;gap:1rem;";
                    const span=document.createElement("span");
                    span.id="after-divCont";
                    span.style.cssText="position:absolute;top:-10%;right:0%;transform:translate(-30px,-20px);padding:5px;background-color:black;color:white;"
                    span.textContent=`A-${index}`;
                    divCont.after(span);
                    const img=document.createElement("img");
                    img.style.cssText="border-radius:50%;width:100px;height:100px;filter:drop-shadow(0 0 0.75rem white);";
                    if(img_.level==="element"){
                        const image=img_.img as HTMLImageElement;
                        // if(img_)
                        img.src=image.src;
                        img.alt=image.alt;
                    }else if(img_.level==="col"){
                        const imgUrl=await this.extractImg({ele:img_.img}) as string;
                        img.src=imgUrl;
                        img.alt=imgUrl;
                    }else if(img_.level==="row"){
                        const imgUrl=await this.extractImg({ele:img_.img}) as string;
                        img.src=imgUrl;
                        img.alt=imgUrl;
                    }
                    divCont.appendChild(img);
                    const {button:imgBtn}=Misc.simpleButton({anchor:divCont,bg:Nav.btnColor,color:"white",text:"select",time:400,type:"button"});
                    row.appendChild(divCont);
                    Misc.matchMedia({parent:divCont,maxWidth:900,cssStyle:{flex:"0 0 50%"}});
                    Misc.matchMedia({parent:divCont,maxWidth:400,cssStyle:{flex:"0 0 100%"}});
                    imgBtn.onclick=(e:MouseEvent)=>{
                        if(e){
                            this.requestOption({parent,targetImg:img_});

                            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                            setTimeout(()=>{
                                parent.removeChild(popup);
                            },390);
                        }
                    };

                }
            }));
        }else{
            //MESSAGE NO IMAGES FOUND WITH BUTTON OKAY CLICK WITHIN POPUP
            popup.style.width="300px";
            const para=document.createElement("p");
            para.style.cssText="padding:1rem;padding-inline:2rem;text-wrap:pretty;font-size:120%;font-family:Poppins-Thin;font-weight:800;";
            para.textContent="There are no images found. suggestion add an image, then select an image, then, once done, the system will find the image and allow you to select an alternate replacement for it.";
            popup.appendChild(para);
            Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{to:"10%",left:"25%",right:"25%"}});
            Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{to:"20%",left:"0%",right:"0%"}});
            const {button}=Misc.simpleButton({anchor:popup,type:"button",text:"close",bg:Nav.btnColor,color:"white",time:400});
            button.onclick=(e:MouseEvent)=>{
                if(e){
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        parent.removeChild(popup);
                    },390);
                }
            };
        }
    };
    requestOption(item:{parent:HTMLElement,targetImg:{img:HTMLImageElement | HTMLElement,level:"element"|"col"|"row"}}){
        const {parent,targetImg}=item;
        const popup=document.createElement("div");
        popup.className="requestoption-popup-main";
        const title=document.createElement("h6");
        title.textContent="insert URL?/insertImage?";
        title.className="text-primary text-center my-2";
        popup.style.cssText="position:absolute;max-width:350px;width:100%;min-height:5vh;height:auto;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:row;padding:1rem;gap:1.5rem;z-index:200;top:10%;left:35%;right:35%;background-color:white;";
        this.removePopup({parent,target:popup});
        parent.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{top:"20%",left:"25%",right:"25%"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{top:"25%",left:"5%",right:"5%"}});
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});

        const {button:insertUrl}=Misc.simpleButton({anchor:popup,type:"button",text:"insert url",bg:"blue",color:"white",time:400});
        insertUrl.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    this.insertImageUrl({parent,targetImg});
                    parent.removeChild(popup);
                },390);
            }
        };
        const {button:insertImage}=Misc.simpleButton({anchor:popup,type:"button",text:"insert image",bg:"green",color:"white",time:400});
        insertImage.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    this.insertImage({parent,targetImg});
                    parent.removeChild(popup);
                },390);
            }
        };
    };
    insertImageUrl(item:{parent:HTMLElement,targetImg:{img:HTMLImageElement | HTMLElement,level:"element"|"col"|"row"}}){
        const {parent,targetImg}=item;
        const popup=document.createElement("div");
        popup.className="insertUrl-popup";
        popup.style.cssText="position:absolute;max-width:800px;width:100%;min-height:5vh;height:auto;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;padding:1rem;gap:1.5rem;";
        const title=document.createElement("h6");
        title.textContent="insert URL image";
        title.className="text-center text-primary my-2";
        popup.appendChild(title);
        const form=document.createElement("form");
        form.style.cssText="width:100%;display:flex;flex-direction:column;padding:1rem;gap:1.5rem;";
        const {input,label,formGrp}=Nav.inputComponent(form);
        label.textContent="paste url below";
        input.type="url";
        input.name="url";
        input.id="url";
        label.setAttribute("for",input.id);
        input.placeholder="https://myimage,,.com";
        const {button}=Misc.simpleButton({anchor:form,type:"submit",text:"submit",bg:Nav.btnColor,color:"white",time:400});
        button.disabled=true;
        input.onchange=(e:Event)=>{
            if(e){
                button.disabled=false;
            }
        };
        popup.appendChild(form);
        this.removePopup({parent,target:popup});
        parent.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{top:"20%",left:"0%",right:"0%"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{top:"25%"}});
        form.onsubmit=(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const url=formdata.get("url") as string;
                if(url ){
                    console.log("URL",url)
                    if(targetImg.level==="element"){
                        (targetImg.img as HTMLImageElement).src=url;
                    }else if(targetImg.level==="col"){
                        targetImg.img.style.backgroundImage=`url(${url})`;
                    }else if(targetImg.level==="row"){
                        targetImg.img.style.backgroundImage=`url(${url})`;
                    }
                    const {parsed,isJSON}=Header.checkJson(targetImg.img.getAttribute("flex"));
                        if(isJSON){
                            let flex=parsed as flexType;
                            if(flex.imgKey){
                                const markDel:deletedImgType={imgKey:flex.imgKey,del:true,date:new Date()};
                                this._service.markDelKey(markDel)

                            }
                            flex={...flex,imgKey:undefined};
                            targetImg.img.setAttribute("flex",JSON.stringify(flex));
                            if(targetImg.level==="element"){
                                this._modSelector.updateElement(targetImg.img);
                            }else if(targetImg.level==="col"){
                                this._modSelector.updateColumn(targetImg.img,flex)
                            }else if(targetImg.level==="row"){
                                this._modSelector.updateRow(targetImg.img,flex)
                            }
                        }else{
                            const imgKey=targetImg.img.getAttribute("imgKey");
                                if(imgKey){
                                    const markDel:deletedImgType={imgKey:imgKey,del:true,date:new Date()};
                                    this._service.markDelKey(markDel)
                                }
                            targetImg.img.removeAttribute("imgKey");
                            this._modSelector.updateElement(targetImg.img);
                        }
                        Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                        setTimeout(()=>{
                            parent.removeChild(popup);
                        },390);
                }else{
                    Misc.message({parent,msg:"not a url",type_:"error",time:1200});
                }
            }
        };


    }
    insertImage(item:{parent:HTMLElement,targetImg:{img:HTMLImageElement | HTMLElement,level:"element"|"col"|"row"}}){
        const {parent,targetImg}=item;
        const popup=document.createElement("div");
        popup.className="insert-popup";
        popup.style.cssText="position:absolute;max-width:800px;width:100%;min-height:5vh;height:auto;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;padding:1rem;gap:1.5rem;background-color:black;color:white;left:20%;right:20%";
        const title=document.createElement("h6");
        title.textContent="insert Image";
        title.className="text-center text-primary my-2";
        popup.appendChild(title);
        const row=document.createElement("div");
        row.id="insert-popup-main-row"
        row.className="row";
        row.style.cssText="padding-inline:1rem;";
        popup.appendChild(row);
        parent.appendChild(popup);
        this.removePopup({parent,target:popup});
        this.imageUrls.map((insertImg,index)=>{
            if(insertImg){

                const divCont=document.createElement("div");
                const title=document.createElement("h6");
                title.className="text-primary text-center my-2";
                title.textContent=insertImg.name;
                divCont.id=`insert-popup-main-row-divCont-${index}`;
                divCont.style.cssText="padding:1rem;position:relative;flex:0 0 25%;display:flex;flex-direction:column;align-items:center;gap:1rem;";
                divCont.appendChild(title);
                const img=document.createElement("img");
                img.style.cssText="border-radius:50%;width:100px;height:100px;filter:drop-shadow(0 0 0.75rem black);";
                const image=AWSImageLoader({url:insertImg.url,width:100,quality:60});
                img.src=image;
                img.alt=insertImg.name;
                divCont.appendChild(img);
                const {button:imgBtn}=Misc.simpleButton({anchor:divCont,bg:Nav.btnColor,color:"white",text:"insert",time:400,type:"button"});
                row.appendChild(divCont);
                Misc.matchMedia({parent:divCont,maxWidth:900,cssStyle:{flex:"0 0 50%"}});
                Misc.matchMedia({parent:divCont,maxWidth:400,cssStyle:{flex:"0 0 100%"}});
                imgBtn.onclick=(e:MouseEvent)=>{
                    if(e){
                        const selImage=this.imageUrls[index];
                        if(targetImg.level==="element"){
                            (targetImg.img as HTMLImageElement).src=selImage.url;
                            (targetImg.img as HTMLImageElement).alt=selImage.name;
                        }else if(targetImg.level==="col"){
                            targetImg.img.style.backgroundImage=`url(${selImage.url})`;
                        }else if(targetImg.level==="row"){
                            targetImg.img.style.backgroundImage=`url(${selImage.url})`;
                        }
                        const {parsed,isJSON}=Header.checkJson(targetImg.img.getAttribute("flex"));
                            if(isJSON){
                                let flex=parsed as flexType;
                                if(flex.imgKey){
                                    const markDel:deletedImgType={imgKey:flex.imgKey,del:true,date:new Date()};
                                    this._service.markDelKey(markDel)

                                }
                                flex={...flex,imgKey:undefined};
                                targetImg.img.setAttribute("flex",JSON.stringify(flex));
                                if(targetImg.level==="element"){
                                    this._modSelector.updateElement(targetImg.img);
                                }else if(targetImg.level==="col"){
                                    this._modSelector.updateColumn(targetImg.img,flex)
                                }else if(targetImg.level==="row"){
                                    this._modSelector.updateRow(targetImg.img,flex)
                                }
                            }else{
                                const imgKey=targetImg.img.getAttribute("imgKey");
                                if(imgKey){
                                    const markDel:deletedImgType={imgKey:imgKey,del:true,date:new Date()};
                                    this._service.markDelKey(markDel)
                                }
                                targetImg.img.removeAttribute("imgKey");
                                this._modSelector.updateElement(targetImg.img);
                            }
                            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                            setTimeout(()=>{
                                parent.removeChild(popup);
                            },390);
                    }
                };
            }
        });
    
    }
    async extractImg(item:{ele:HTMLElement}):Promise<string|undefined>{
        const {ele}=item;
        const urlStr=ele.style.backgroundImage;
        const {parsed,isJSON}=Header.checkJson(ele.getAttribute("flex"));
        let retImg:string|undefined;
        if(isJSON){
            const flex=parsed as flexType;
            const imgKey=flex.imgKey;
            if(imgKey){
              const {img}= await this._service.getSimpleImg(imgKey) as gets3ImgKey;
                retImg=img
            }else{
                const startReg:RegExp=/(url\(\")/g;
                const endReg:RegExp=/\"\)/g;
                const starts=urlStr.matchAll(startReg) as any;
                const ends=urlStr.matchAll(endReg) as any;
                for(const start of starts){
                    for (const end of ends ){
                        const beg=start.index + start[0].length;
                        const end_=end.index;
                        retImg=urlStr.slice(beg,end_);
                    }
                }
            }
        }else{
            const imgKey=ele.getAttribute("imgKey");
            if(imgKey){
                const {img}= await this._service.getSimpleImg(imgKey) as gets3ImgKey;
                  retImg=img
              }
        }
        if(!retImg && ele.nodeName==="IMG"){
            retImg=(ele as HTMLImageElement).src
        }
        
        return retImg;
    }
    removePopup(item:{parent:HTMLElement,target:HTMLElement}){
        const {parent,target}=item;
        const xDiv=document.createElement("div");
        xDiv.style.cssText="padding:1rem;position:absolute;top:0%;right:0%;border-radius:50%;background-color:black;transform:translate(-10px,10px);display:flex;align-items:center;justify-content:center;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"18px",color:"white",borderRadius:"50%"}});
        target.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:target,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(target);
                },390);
            }
        };
    }
}
export default AddImageUrl;
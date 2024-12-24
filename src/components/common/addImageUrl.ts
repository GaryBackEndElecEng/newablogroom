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
    unsplash:string;
    freepicurl:string="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
    imageUrls:{name:string,url:string}[];
    imgEles:{level:"element"|"col"|"row",img:HTMLImageElement|HTMLElement}[];
    constructor(private _modSelector:ModSelector,private _service:Service){
        this.unsplash="https://images.unsplash.com";
        this.freepicurl="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
        this.imageUrls=[
            {name:"all you need",url:this.freepicurl + "/allYouNeed.png"},
            {name:"blackhole",url:this.freepicurl + "/blackhole.png"},
            {name:"children",url:this.freepicurl + "/children.png"},
            {name:"coffeeTime",url:this.freepicurl + "/coffeeTime.png"},
            {name:"dynamicArt",url:this.freepicurl + "/dynamic_art.png"},
            {name:"einstein",url:this.freepicurl + "/einstein.png"},
            {name:"goldenRatio",url:this.freepicurl + "/goldenRatio.png"},
            {name:"lion-eye",url:this.freepicurl + "/main.png"},
            {name:"precious",url:this.freepicurl + "/precious.png"},
            {name:"relax",url:this.freepicurl + "/relaxing.png"},
            {name:"seasons",url:this.freepicurl + "/seasons.png"},
            {name:"work",url:this.freepicurl + "/vacationWork.png"},
            {name:"align",url:this.freepicurl + "/alignment.png"},
            {name:"articles",url:this.freepicurl + "/article.png"},
            {name:"bank",url:this.freepicurl + "/bank.png"},
            {name:"beauty",url:this.freepicurl + "/beautyGirl.png"},
            {name:"blackDesign",url:this.freepicurl + "/blackDesign.png"},
            {name:"book",url:this.freepicurl + "/book.png"},
            {name:"businessman",url:this.freepicurl + "/businessMan.png"},
            {name:"beach stroll",url:this.freepicurl + "/checkout1b.png"},
            {name:"cheetah",url:this.freepicurl + "/cheetaFramed.png"},
            {name:"cheetah",url:this.freepicurl + "/cheetaFramed.png"},
            {name:"graphic",url:this.freepicurl + "/consult1.png"},
            {name:"graphic",url:this.freepicurl + "/consult1.png"},
            {name:"graphic-reading",url:this.freepicurl +"/consult3.png"},
            {name:"computer graphic",url:this.freepicurl +"/contactWallpaper.png"},
            {name:"beach relaxing",url:this.freepicurl +"/coupleOnBeach.png"},
            {name:"contact us",url:this.freepicurl +"/customPage.png"},
            {name:"relaxing",url:this.freepicurl +"/design.png"},
            {name:"art",url:this.freepicurl +"/designMain.png"},
            {name:"earth moon",url:this.freepicurl +"/earthMoon.png"},
            {name:"laugh",url:this.freepicurl +"/girlLaugh.png"},
            // {name:"mountain",url:this.freepicurl +"/GreatMountain.png"},
            // {name:"hand-shake",url:this.freepicurl +"/handShaking.png"},
            {name:"jupitor",url:this.freepicurl +"/jupiter.png"},
            // {name:"faqs",url:this.freepicurl +"/FAQS.png"},
            {name:"landscape",url:this.freepicurl +"/landscape.png"},
            {name:"lepard",url:this.freepicurl +"/lepard.png"},
            {name:"lepard",url:this.freepicurl +"/lepard.png"},
            {name:"lions",url:this.freepicurl +"/lion.png"},
            {name:"lions2",url:this.freepicurl +"/lions.png"},
            {name:"baby monkey",url:this.freepicurl +"/monkey2.png"},
            {name:"architect",url:this.freepicurl +"/architect.png"},
            {name:"article",url:this.freepicurl +"/article.png"},
            {name:"bango",url:this.freepicurl +"/bango1.png"},
            {name:"bango2",url:this.freepicurl +"/bango2.png"},
            {name:"cheetah",url:this.freepicurl +"/cheetah.png"},
            {name:"wolf",url:this.freepicurl +"/wolf.png"},
            {name:"wolf 2",url:this.freepicurl +"/wolf2.png"},
            {name:"wolf 3",url:this.freepicurl +"/wolf3.png"},
            {name:"wolf 3",url:this.freepicurl +"/wolf3.png"},
            {name:"coffee",url:this.freepicurl +"/coffee.png"},
            {name:"coffee",url:this.freepicurl +"/coffee2.png"},
            {name:"moon-earth-view",url:this.freepicurl +"/moonToEarth.png"},
            {name:"moon-earth-view",url:this.freepicurl +"/moonToEarth2.png"},
            {name:"logo",url:this.freepicurl +"/gb_logo_600.png"},
            {name:"cartoon 1",url:this.freepicurl +"/img1.png"},
            {name:"cartoon 2",url:this.freepicurl +"/img10.png"},
            {name:"cartoon 3",url:this.freepicurl +"/img2.png"},
            {name:"cartoon 4",url:this.freepicurl +"/img3.png"},
            {name:"cartoon 5",url:this.freepicurl +"/img4.png"},
            {name:"cartoon 6",url:this.freepicurl +"/img5.png"},
            {name:"cartoon 7",url:this.freepicurl +"/img6.png"},
            {name:"cartoon 8",url:this.freepicurl +"/img7.png"},
            {name:"cartoon 9",url:this.freepicurl +"/img8.png"},
            {name:"cartoon 10",url:this.freepicurl +"/img9.png"},
            {name:"secure form",url:this.freepicurl +"/formSecure.png"},
            {name:"hand shake",url:this.freepicurl +"/handshake.png"},
            {name:"internet purchase flow",url:this.freepicurl +"/internet_purchase_process.png"},
            {name:"Great Mountain",url:this.freepicurl +"/mountain.png"},
            {name:"signin process",url:this.freepicurl +"/signInProcess.png"},
            {name:"specials",url:this.freepicurl +"/specials.png"},
            {name:"solar works",url:this.freepicurl +"/solarWorks.png"},
            {name:"Explore",url:`${this.unsplash}/photo-1657736301709-b1365740ddbe?crop=entropy`,},
            {name:"symetric",url:`${this.unsplash}/photo-1658288797137-7ca820c77a2b?crop=entropy`},
            {name:"fast",url:`${this.unsplash}/photo-1657987273071-fbe77b5b4e90?crop=entropy&h=900`},
            {name:"elagent",url:`${this.unsplash}/photo-1655760862449-52e5b2bd8620?crop=entropy`},
            {name:"symetry",url:`${this.unsplash}/photo-1657963928657-9da48ea0c496?crop=entropy`},
            {name:"time",url:`${this.unsplash}/photo-1656922612260-2ebb170dd637?crop=entropy`},
            {name:"wonder",url:`${this.unsplash}/photo-1656342468017-a298b6c63cc9?crop=entropy`},
            {name:"tranquil",url:`${this.unsplash}/photo-1658137135662-82ab663ee627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg`},
            {name:"majestic",url:`${this.unsplash}/photo-1657653463810-fa2f223fbb82?crop=entropy`},
            {name:"earth",url:`${this.unsplash}/photo-1657832034979-e2f9c5b0a2fc?crop=fit&h=900`},
            {name:"AIMapping",url:this.freepicurl +"/AIMapping.png"},
            {name:"black hole type",url:this.freepicurl +"/blackHType.png"},
            {name:"galaxyFormation",url:this.freepicurl +"/galaxyFormation.png"},
            {name:"jamesWeb",url:this.freepicurl +"/jamesWeb.png"},
            {name:"javaScript",url:this.freepicurl +"/javascript.png"},
            {name:"sisters black hole",url:this.freepicurl +"/sistersBlackhole.png"},
            {name:"time",url:this.freepicurl +"/time.png"},
            {name:"our black hole",url:this.freepicurl +"/ourBlackH.png"},
            {name:"sample Quote",url:this.freepicurl +"/sampleQuote.png"},

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
        popup.style.cssText="position:absolute;max-width:800px;width:fit-content;min-height:5vh;height:auto;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;padding:1rem;gap:1.5rem;z-index:200;left:35%;right:35%;background-color:black;color:white;";
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
                console.log(col)
                const check=(col.style.cssText.includes("background-image")) ? true:false;
                const str=check ? col.style.backgroundImage:null;
                if(!str)return;
                this.imgEles.push({level:"col",img:col as HTMLElement});
            }
        });
        [...getRowImgs].map(row=>{
            if(row){
                const check=(row.style.cssText.includes("background-image")) ? true:false;
                const str=check ? row.style.backgroundImage:null;
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
                    const src=img_.img as HTMLImageElement;
                    console.log("addImageUrl:imgEles:",src.src,img_.level)
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
                        console.log("col:",imgUrl)
                        img.src=imgUrl;
                        img.alt=imgUrl;
                    }else if(img_.level==="row"){
                        const imgUrl=await this.extractImg({ele:img_.img}) as string;
                        img.src=imgUrl;
                        img.alt=imgUrl;
                    }
                    divCont.appendChild(img);
                    const {button:imgBtn}=Misc.simpleButton({anchor:divCont,bg:Nav.btnColor,color:"white",text:"select",time:400,type:"button"});
                    imgBtn.id=`imgBtn-${index}`;
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
    async getImages(item:{parent:HTMLElement}){
        const {parent}=item;
        const option={
            headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        return fetch(this.freepicurl,option).then(async(res)=>{
            if(res){
                console.log(res)
            }
        });
    }
    requestOption(item:{parent:HTMLElement,targetImg:{img:HTMLImageElement | HTMLElement,level:"element"|"col"|"row"}}){
        const {parent,targetImg}=item;
        const popup=document.createElement("div");
        popup.id="addImageUrl-requestOption-popup";
        popup.className="requestoption-popup-main";
        const title=document.createElement("h6");
        title.textContent="insert URL?/insertImage?";
        title.className="text-primary text-center my-2";
        popup.style.cssText="position:absolute;max-width:350px;width:100%;min-height:5vh;height:auto;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:row;padding:1rem;gap:1.5rem;z-index:200;left:35%;right:35%;background-color:white;";
        this.removePopup({parent,target:popup});
        parent.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{top:"20%",left:"25%",right:"25%"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{top:"25%",left:"5%",right:"5%"}});
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});

        const {button:insertUrl}=Misc.simpleButton({anchor:popup,type:"button",text:"insert url",bg:"blue",color:"white",time:400});
        insertUrl.onclick=(e:MouseEvent)=>{
            if(e){
                insertUrl.disabled=true;
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
                insertImage.disabled=true;
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
        const less900= window.innerWidth <900;
        const less400= window.innerWidth <400;
        const popup=document.createElement("div");
        popup.className="insertUrl-popup";
        popup.style.cssText="position:absolute;max-width:800px;width:100%;min-height:5vh;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;padding:1rem;gap:1.5rem;";
        popup.style.overflowY="scroll";
        popup.style.height=less900 ? (less400 ? "120vh" :"100vh") : "80vh";
        popup.style.top=less900 ? (less400 ? "25%" :"20%") : "0%";
        popup.style.left="0%";
        popup.style.right="0%";
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
        form.onsubmit=async(e:SubmitEvent)=>{
            if(e){
                e.preventDefault();
                button.disabled=true;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const url=formdata.get("url") as string;
                if(url ){
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
                               await  this._service.markDelKey(markDel)

                            }
                            flex={...flex,imgKey:undefined};
                            targetImg.img.setAttribute("flex",JSON.stringify(flex));
                            if(targetImg.level==="element"){
                                targetImg.img.removeAttribute("imgKey");
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
                                await this._service.markDelKey(markDel);
                            }
                            targetImg.img.removeAttribute("imgKey");
                            this._modSelector.updateElement(targetImg.img);
                        }
                        this.updateParaShapeOutside({parent,image:targetImg.img as HTMLImageElement});
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
    updateParaShapeOutside(item:{parent:HTMLElement,image:HTMLImageElement}){
        const {parent,image}=item;
        const para=image.parentElement;
        if(!(para && para.nodeName==="P")) return;
        const {isJSON,parsed:flex}=Header.checkJson(para.getAttribute("flex"));
        if(isJSON){
            const flex_={...flex,isShapeOutside:true};
            para.setAttribute("flex",JSON.stringify(flex_));
        }
        this._modSelector.updateElement(para);

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
                            this.updateParaShapeOutside({parent,image:targetImg.img as HTMLImageElement});
                            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                            setTimeout(()=>{
                                parent.removeChild(popup);
                            },390);
                    }
                };
            }
        });
    
    }
    asyncPicImage(item:{parent:HTMLElement}):Promise<{arr:{btn:HTMLButtonElement,imageUrl:string}[],popup:HTMLElement,reParent:HTMLElement}>{
        const {parent}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const arr:{btn:HTMLButtonElement,imageUrl:string}[]=[];
        const popup=document.createElement("div");
        popup.id="addImageUrl-asyncPicImag-popup";
        popup.style.cssText="position:absolute;max-width:800px;width:100%;min-height:5vh;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;padding:1rem;gap:1.5rem;background-color:black;color:white;";
        popup.style.top="0%";
        popup.style.left=less900 ? (less400 ? "0%":"0%"):"0%";
        popup.style.right=less900 ? (less400 ? "0%":"0%"):"0%";
        popup.style.height=less900 ? (less400 ? "110vh":"100vh"):"80vh";
        popup.style.overflowY="scroll";
        const title=document.createElement("h6");
        title.textContent="insert Image";
        title.className="text-center text-primary my-2";
        popup.appendChild(title);
        const row=document.createElement("div");
        row.id="popup-main-row"
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
                divCont.id=`main-row-divCont-${index}`;
                divCont.style.cssText="padding:1rem;position:relative;flex:0 0 25%;display:flex;flex-direction:column;align-items:center;gap:1rem;";
                divCont.appendChild(title);
                const img=document.createElement("img");
                img.id="divCont-" + index + "-image";
                img.style.cssText="border-radius:50%;width:100px;height:100px;filter:drop-shadow(0 0 0.75rem black);";
                const image=AWSImageLoader({url:insertImg.url,width:100,quality:60});
                img.src=image;
                img.alt=insertImg.name;
                divCont.appendChild(img);
                const {button:imgBtn}=Misc.simpleButton({anchor:divCont,bg:Nav.btnColor,color:"white",text:"insert",time:400,type:"button"});
                imgBtn.id=`imgBtn-${index}`;
                arr.push({btn:imgBtn,imageUrl:insertImg.url});//PUSHING
                row.appendChild(divCont);
                Misc.matchMedia({parent:divCont,maxWidth:900,cssStyle:{flex:"0 0 50%"}});
                Misc.matchMedia({parent:divCont,maxWidth:400,cssStyle:{flex:"0 0 100%"}});
                
            }
        });
        return new Promise(resolve=>{
            resolve({arr,popup,reParent:parent});
        }) as Promise<{arr:{btn:HTMLButtonElement,imageUrl:string}[],popup:HTMLElement,reParent:HTMLElement}>;
    
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
                        // console.log("extractImg:img",retImg)//works
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
        xDiv.id="removePopup-xDiv"
        xDiv.style.cssText="padding:2px;position:absolute;top:0%;right:0%;border-radius:50%;background-color:black;transform:translate(10px,-10px);display:flex;align-items:center;justify-content:center;";
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
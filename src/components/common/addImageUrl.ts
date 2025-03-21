import { FaCrosshairs } from "react-icons/fa";
import ModSelector from "../editor/modSelector";
import { blogType, deletedImgType, gets3ImgKey, imageInsertType, imgEleType, imgExtractType, userType } from "../editor/Types";
import Nav from "../nav/headerNav";
import Misc from "./misc";
import { FaCreate } from "./ReactIcons";
import Service from "./services";
import { AWSImageLoader, imageLoader } from "./tsFunctions";
import Main from "../editor/main";
import { idValueType, selRowColType, selRowType } from "@/lib/attributeTypes";



class AddImageUrl {
    noimage:string="images/noimage.png";
    mainContainer:HTMLElement|null;
    hasBlobMsg:string;
    logo:string;
    unsplash:string;
    freepicurl:string="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
    imageUrls:imageInsertType[];
    imgEles:imgEleType[];
    constructor(private _modSelector:ModSelector,private _service:Service){
        this.hasBlobMsg="the image was not uploaded because it has a blob file that was not saved in the server. As a result, an image was replaced temporarily as space. The system can not freely upload files from your personal system to show your image.It must be requested by you to download it from your personal computer...just download it to the server to remove this message.";
        this.noimage="images/noimage.png";
        this.mainContainer=Main.container as HTMLElement;
        this.logo="./images/gb_logo_600.png"
        this.unsplash="https://images.unsplash.com";
        this.freepicurl="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";
        this.imageUrls=[
            {key:"allYouNeed.png",name:"all you need",url:this.freepicurl + "/allYouNeed.png"},
            {key:"blackhole.png",name:"blackhole",url:this.freepicurl + "/blackhole.png"},
            {key:"children.png",name:"children",url:this.freepicurl + "/children.png"},
            {key:"coffeeTime.png",name:"coffeeTime",url:this.freepicurl + "/coffeeTime.png"},
            {key:"dynamic_art.png",name:"dynamicArt",url:this.freepicurl + "/dynamic_art.png"},
            {key:"einstein.png",name:"einstein",url:this.freepicurl + "/einstein.png"},
            {key:"goldenRatio.png",name:"goldenRatio",url:this.freepicurl + "/goldenRatio.png"},
            {key:"main.png",name:"lion-eye",url:this.freepicurl + "/main.png"},
            {key:"precious.png",name:"precious",url:this.freepicurl + "/precious.png"},
            {key:"relaxing.png",name:"relax",url:this.freepicurl + "/relaxing.png"},
            {key:"seasons.png",name:"seasons",url:this.freepicurl + "/seasons.png"},
            {key:"vacationWork.png",name:"work",url:this.freepicurl + "/vacationWork.png"},
            {key:"alignment.png",name:"align",url:this.freepicurl + "/alignment.png"},
            {key:"article.png",name:"articles",url:this.freepicurl + "/article.png"},
            {key:"bank.png",name:"bank",url:this.freepicurl + "/bank.png"},
            {key:"background1.png",name:"background1",url:this.freepicurl + "/background1.png"},
            {key:"background2.png",name:"background2",url:this.freepicurl + "/background2.png"},
            {key:"background3.png",name:"background3",url:this.freepicurl + "/background3.png"},
            {key:"colors.png",name:"colors",url:this.freepicurl + "/colors.png"},
            {key:"beachRelax.png",name:"beach-relax",url:this.freepicurl + "/beachRelax.png"},
            {key:"contactUs.png",name:"contactUs",url:this.freepicurl + "/contactUs.png"},
            {key:"design.png",name:"design",url:this.freepicurl + "/design.png"},
            {key:"beautyGirl.png",name:"beauty",url:this.freepicurl + "/beautyGirl.png"},
            {key:"userpic.png",name:"user",url:this.freepicurl + "/userpic.png"},
            {key:"blackDesign.png",name:"blackDesign",url:this.freepicurl + "/blackDesign.png"},
            {key:"book.png",name:"book",url:this.freepicurl + "/book.png"},
            {key:"businessMan.png",name:"businessman",url:this.freepicurl + "/businessMan.png"},
            {key:"checkout1b.png",name:"beach stroll",url:this.freepicurl + "/checkout1b.png"},
            {key:"cheetaFramed.png",name:"cheetah",url:this.freepicurl + "/cheetaFramed.png"},
            {key:"cheetaFramed.png",name:"cheetah",url:this.freepicurl + "/cheetaFramed.png"},
            {key:"consult1.png",name:"graphic",url:this.freepicurl + "/consult1.png"},
            {key:"consult1.png",name:"graphic",url:this.freepicurl + "/consult1.png"},
            {key:"consult3.png",name:"graphic-reading",url:this.freepicurl +"/consult3.png"},
            {key:"contactWallpaper.png",name:"computer graphic",url:this.freepicurl +"/contactWallpaper.png"},
            {key:"coupleOnBeach.png",name:"beach relaxing",url:this.freepicurl +"/coupleOnBeach.png"},
            {key:"customPage.png",name:"contact us",url:this.freepicurl +"/customPage.png"},
            {key:"design.png",name:"relaxing",url:this.freepicurl +"/design.png"},
            {key:"designMain.png",name:"art",url:this.freepicurl +"/designMain.png"},
            {key:"earthMoon.png",name:"earth moon",url:this.freepicurl +"/earthMoon.png"},
            {key:"girlLaugh.png",name:"laugh",url:this.freepicurl +"/girlLaugh.png"},
            {key:"jupiter.png",name:"jupitor",url:this.freepicurl +"/jupiter.png"},
            {key:"landscape.png",name:"landscape",url:this.freepicurl +"/landscape.png"},
            {key:"lepard.png",name:"lepard",url:this.freepicurl +"/lepard.png"},
            {key:"lepard.png",name:"lepard",url:this.freepicurl +"/lepard.png"},
            {key:"lion.png",name:"lions",url:this.freepicurl +"/lion.png"},
            {key:"lions.png",name:"lions2",url:this.freepicurl +"/lions.png"},
            {key:"monkey2.png",name:"baby monkey",url:this.freepicurl +"/monkey2.png"},
            {key:"architect.png",name:"architect",url:this.freepicurl +"/architect.png"},
            {key:"article.png",name:"article",url:this.freepicurl +"/article.png"},
            {key:"bango1.png",name:"bango",url:this.freepicurl +"/bango1.png"},
            {key:"bango2.png",name:"bango2",url:this.freepicurl +"/bango2.png"},
            {key:"cheetah.png",name:"cheetah",url:this.freepicurl +"/cheetah.png"},
            {key:"wolf.png",name:"wolf",url:this.freepicurl +"/wolf.png"},
            {key:"wolf2.png",name:"wolf 2",url:this.freepicurl +"/wolf2.png"},
            {key:"wolf3.png",name:"wolf 3",url:this.freepicurl +"/wolf3.png"},
            {key:"wolf3.png",name:"wolf 3",url:this.freepicurl +"/wolf3.png"},
            {key:"coffee.png",name:"coffee",url:this.freepicurl +"/coffee.png"},
            {key:"coffee2.png",name:"coffee",url:this.freepicurl +"/coffee2.png"},
            {key:"moon.png",name:"moon-earth-view",url:this.freepicurl +"/moon.png"},
            {key:"bannerBio.png",name:"livingroom",url:this.freepicurl +"/bannerBio.png"},
            {key:"londonBridge.JPG",name:"londonBridge",url:this.freepicurl +"/londonBridge.JPG"},
            {key:"bannerBio.png",name:"livingroom",url:this.freepicurl +"/bannerBio.png"},
            {key:"gb_logo_600.png",name:"logo",url:this.freepicurl +"/gb_logo_600.png"},
            {key:"img1.png",name:"cartoon 1",url:this.freepicurl +"/img1.png"},
            {key:"img10.png",name:"cartoon 2",url:this.freepicurl +"/img10.png"},
            {key:"img2.png",name:"cartoon 3",url:this.freepicurl +"/img2.png"},
            {key:"img3.png",name:"cartoon 4",url:this.freepicurl +"/img3.png"},
            {key:"img4.png",name:"cartoon 5",url:this.freepicurl +"/img4.png"},
            {key:"img5.png",name:"cartoon 6",url:this.freepicurl +"/img5.png"},
            {key:"img6.png",name:"cartoon 7",url:this.freepicurl +"/img6.png"},
            {key:"img7.png",name:"cartoon 8",url:this.freepicurl +"/img7.png"},
            {key:"img8.png",name:"cartoon 9",url:this.freepicurl +"/img8.png"},
            {key:"img9.png",name:"cartoon 10",url:this.freepicurl +"/img9.png"},
            {key:"formSecure.png",name:"secure form",url:this.freepicurl +"/formSecure.png"},
            {key:"handshake.png",name:"hand shake",url:this.freepicurl +"/handshake.png"},
            {key:"internet_purchase_process.png",name:"internet purchase flow",url:this.freepicurl +"/internet_purchase_process.png"},
            {key:"mountain.png",name:"Great Mountain",url:this.freepicurl +"/mountain.png"},
            {key:"signInProcess.png",name:"signin process",url:this.freepicurl +"/signInProcess.png"},
            {key:"specials.png",name:"specials",url:this.freepicurl +"/specials.png"},
            {key:"solarWorks.png",name:"solar works",url:this.freepicurl +"/solarWorks.png"},
            {key:null,name:"Explore",url:`${this.unsplash}/photo-1657736301709-b1365740ddbe?crop=entropy`,},
            {key:null,name:"symetric",url:`${this.unsplash}/photo-1658288797137-7ca820c77a2b?crop=entropy`},
            {key:null,name:"fast",url:`${this.unsplash}/photo-1657987273071-fbe77b5b4e90?crop=entropy&h=900`},
            {key:null,name:"elagent",url:`${this.unsplash}/photo-1655760862449-52e5b2bd8620?crop=entropy`},
            {key:null,name:"symetry",url:`${this.unsplash}/photo-1657963928657-9da48ea0c496?crop=entropy`},
            {key:null,name:"time",url:`${this.unsplash}/photo-1656922612260-2ebb170dd637?crop=entropy`},
            {key:null,name:"wonder",url:`${this.unsplash}/photo-1656342468017-a298b6c63cc9?crop=entropy`},
            {key:null,name:"tranquil",url:`${this.unsplash}/photo-1658137135662-82ab663ee627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg`},
            {key:null,name:"majestic",url:`${this.unsplash}/photo-1657653463810-fa2f223fbb82?crop=entropy`},
            {key:null,name:"earth",url:`${this.unsplash}/photo-1657832034979-e2f9c5b0a2fc?crop=fit&h=900`},
            {key:"AIMapping.png",name:"AIMapping",url:this.freepicurl +"/AIMapping.png"},
            {key:"beachView.png",name:"beach view",url:this.freepicurl +"/beachView.png"},
            {key:"galaxyFormation.png",name:"galaxyFormation",url:this.freepicurl +"/galaxyFormation.png"},
            // {key:"jamesWeb.png",name:"jamesWeb",url:this.freepicurl +"/jamesWeb.png"},
            {key:"javascript.png",name:"javaScript",url:this.freepicurl +"/javascript.png"},
            {key:"sistersBlackhole.png",name:"sisters black hole",url:this.freepicurl +"/sistersBlackhole.png"},
            {key:"time.png",name:"time",url:this.freepicurl +"/time.png"},
            // {key:"/ourBlackH.png",name:"our black hole",url:this.freepicurl +"/ourBlackH.png"},
            {key:"sampleQuote.png",name:"sample Quote",url:this.freepicurl +"/sampleQuote.png"},

        ]
        this.mainContainer=document.querySelector("section#main") as HTMLElement;
        this.imgEles=[];
    };

    async main({parent,blog,useParent,idValues,user}:{
        parent:HTMLElement,
        blog:blogType,
        useParent:boolean,
        idValues:idValueType[],
        user:userType|null

    }){
        //INSERTS AN IMAGE INTO ALREADY INSTALLED IMAGES ( BG AND FORGROUND IMGS)
        //IF(useParent)=> uses parent;else uses Main.Container of EDITOR
       
        let newParent:HTMLElement|null;
        if(useParent){
            newParent=parent as HTMLElement;
        }else if(this.mainContainer){
                newParent=this.mainContainer as HTMLElement;
            }else{
                this.mainContainer=document.querySelector("section#main") as HTMLElement;
                newParent=this.mainContainer;
            }
        
        this._modSelector.blog=blog;
        this.mainContainer=document.querySelector("section#main") as HTMLElement;
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.className="popup-main";
        popup.style.cssText="position:absolute;max-width:800px;width:fit-content;min-height:5vh;height:fit-content;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;padding:1rem;gap:1.5rem;z-index:200;left:35%;right:35%;background-color:black;color:white;";
        popup.style.inset="30% 0% 30% 0%";
        newParent.appendChild(popup);
        this.removePopup({parent:newParent,target:popup});
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
        const reg:RegExp=/(background-image)/
        //get images;
        this.imgEles=[];
       
        const getColImgs=this.mainContainer.querySelectorAll("[data-is-column]") as any as HTMLElement[];
        const getRowImgs=this.mainContainer.querySelectorAll("[data-is-row]") as any as HTMLElement[];
        const getElements=this.mainContainer.querySelectorAll("[data-is-element]") as any as HTMLElement[];
        await Promise.all([...getColImgs].map(async(col)=>{
            if(col){
                const check=(reg.test(col.style.cssText));
                if(!check)return;
                const getImgKey=this._modSelector.dataset.getIdValue({target:col,idValues,id:"imgKey"});
                const _imgKey=getImgKey ? getImgKey.attValue:null;
                const getSelRowCol=this._modSelector.dataset.getIdValue({target:col,idValues,id:"selRowCol"});
                const _selRowCol=getSelRowCol?.attValue ? JSON.parse(getSelRowCol.attValue) as selRowColType:null;
                const retSelImg=await this.extractImg({target:col,idValues,level:"col",imgKey:_imgKey,selRowCol:_selRowCol,selRow:null}) as imgExtractType;
                const {imgUrl,selRowCol,selRow,imgKey,level,hasBlob,hasFreeImg,hasGenericImgKey}=retSelImg
                this.imgEles.push({level,target:col as HTMLElement,selRowCol,selRow,imgUrl,imgKey,hasBlob,hasFreeImg,hasGenericImgKey});
            }
        }));

        await Promise.all([...getElements].map(async(target)=>{
            if(target){
                const getSelRowCol=this._modSelector.dataset.getIdValue({target:target,idValues,id:"selRowCol"});
                const _selRowCol=getSelRowCol?.attValue ? JSON.parse(getSelRowCol.attValue) as selRowColType:null;
                const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
                const _imgKey=getImgKey ? getImgKey.attValue:null;
                const node=target.nodeName.toLowerCase();
                const check2=([...target.children as any] as HTMLElement[]).map(child=>child.nodeName.toLowerCase()).includes("img");
                const check3=([...target.children as any] as HTMLElement[]).map(child=>{
                    if(child){
                      const check3=([...child.children as any] as HTMLElement[]).map(ch=>(ch.nodeName)).includes("IMG");
                      return check3
                    }
                    return false;
                }).find(ch=>(ch)) || false;
                
               
                if( node==="img"){
                    const imgItem=await this.extractImg({target,idValues,level:"element",imgKey:_imgKey,selRowCol:_selRowCol,selRow:null}) as imgExtractType;
                    const {imgUrl,selRowCol,selRow,imgKey,level,hasBlob,hasFreeImg,hasGenericImgKey}=imgItem
                    this.imgEles.push({level,target,selRowCol,selRow,imgUrl,imgKey,hasBlob,hasFreeImg,hasGenericImgKey});
                }else if(check2){
                    //for shapeOutside and headerflags
                    const img=([...target.children as any] as HTMLElement[]).find(child=>(child.nodeName==="IMG")) as HTMLImageElement;
                    const imgKey1=this._modSelector.dataset.getIdValue({idValues,target,id:"imgKey"});
                    const imgKey2=this._modSelector.dataset.getIdValue({idValues,target:img,id:"imgKey"});
                    const imgKey3=imgKey1?.attValue ? imgKey1.attValue :(imgKey2?.attValue)|| null;
                    const retSelImg=this.extractSpecial({target,img,idValues,level:"special",imgKey:imgKey3,selRowCol:_selRowCol,selRow:null}) as imgExtractType;
                    const {imgUrl,selRowCol,selRow,imgKey,level,hasBlob,hasFreeImg,hasGenericImgKey}=retSelImg
                    this.imgEles.push({level,target,selRowCol,selRow,imgUrl,imgKey,hasBlob,hasFreeImg,hasGenericImgKey});
                }else if(check3){
                    //HEADERFLAG: DEEPER=> HAS IMGCONTAINER
                    const imgKey1=this._modSelector.dataset.getIdValue({idValues,target,id:"imgKey"});
                    const imgKey3=imgKey1?.attValue || null;
                    const retSelImg=this.extractHeaderType({target,idValues,level:"headerflag",imgKey:imgKey3,selRowCol:_selRowCol,selRow:null}) as imgExtractType;
                    const {imgUrl,selRowCol,selRow,imgKey,level,hasBlob,hasFreeImg,hasGenericImgKey}=retSelImg
                    this.imgEles.push({level,target,selRowCol,selRow,imgUrl,imgKey,hasBlob,hasFreeImg,hasGenericImgKey});
                }
            }//THIS CAN NOT UPLOAD A BLOB:HTTP-CHECK ID=F BLOG=> THEN INSERT NOIMAGE IN ITS PLACE
        }));

        await Promise.all([...getRowImgs].map(async(row)=>{
            if(row){
                 const reg:RegExp=/(background-image)/
                const check=(reg.test(row.style.cssText)) ;
                if(!check)return;
                const getImgKey=this._modSelector.dataset.getIdValue({target:row,idValues,id:"imgKey"});
                const imgKey1=getImgKey?.attValue ? getImgKey.attValue : null;
                const getSelRow=this._modSelector.dataset.getIdValue({target:row,idValues,id:"selRow"});
                const _selRow=getSelRow?.attValue ? JSON.parse(getSelRow.attValue) as selRowType : null;
                const retSelImg=await this.extractImg({target:row,idValues,level:"row",imgKey:imgKey1,selRow:_selRow,selRowCol:null}) as imgExtractType;
                const {imgUrl,selRowCol,selRow,imgKey,level,hasBlob,hasFreeImg,hasGenericImgKey}=retSelImg;
               
                this.imgEles.push({level,target:row as HTMLElement,imgUrl,selRowCol,selRow,imgKey,hasBlob,hasFreeImg,hasGenericImgKey});
            }
        }));

        if(this.imgEles && this.imgEles.length>0){
            await Promise.all(this.imgEles.map(async(item,index)=>{
                if(item){
                    
                    const url=new URL(window.location.origin)
                    const noimage=`${url}${this.noimage}`;
                    // console.log("addImageUrl:imgEles:",src.src,img_.level)
                    const divCont=document.createElement("div");
                    divCont.id=`divCont-${index}`;
                    divCont.style.cssText="padding:1rem;position:relative;flex:0 0 25%;display:flex;flex-direction:column;align-items:center;gap:1rem;";
                  
                    const img=document.createElement("img");
                    img.style.cssText="border-radius:50%;width:100px;height:100px;filter:drop-shadow(0 0 0.75rem white);";
                    const checkRowCol=item.level==="col" || item.level==="row";
                    const image=item.target as HTMLImageElement;
                    if(item.level==="element" ){
                        // FreeFile from server
                        img.src=image.src;
                        img.alt=image.alt;
                    }else if(checkRowCol && item.imgUrl){
                        //free file from server
                        img.src=item.imgUrl as string;
                        img.alt=item.imgKey ? item.imgKey : "www.ablogroom.com";
                    }else if((item.level==="special" || item.level==="headerflag") && item.imgUrl){
                        // free file from server
                        img.src=item.imgUrl as string ;
                        img.alt=item.imgKey ? item.imgKey :"www.ablogroom";
                    }else{
                        //no file from server
                        img.src=noimage;
                        img.alt="www.ablogroom.com";
                    };
                    divCont.appendChild(img);
                    if(item.hasBlob) divCont.classList.add("hasBlob");
                    if(item.hasBlob) divCont.setAttribute("data-has-blob",this.hasBlobMsg);
                    const {button:imgBtn}=Misc.simpleButton({anchor:divCont,bg:Nav.btnColor,color:"white",text:"select",time:400,type:"button"});
                    imgBtn.id=`imgBtn-${index}`;
                    row.appendChild(divCont);
                    imgBtn.onclick=async(e:MouseEvent)=>{
                        if(e){
                            this.requestOption({parent:newParent,item:item,idValues,user});

                            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                            setTimeout(()=>{
                                newParent.removeChild(popup);
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
          
            const {button}=Misc.simpleButton({anchor:popup,type:"button",text:"close",bg:Nav.btnColor,color:"white",time:400});
            button.onclick=(e:MouseEvent)=>{
                if(e){
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        newParent.removeChild(popup);
                    },390);
                }
            };
        }
    };


    requestOption({parent,item,idValues,user}:{parent:HTMLElement,item:imgEleType,idValues:idValueType[],user:userType|null}){
       //SELECTED IMG TO BE INSERTED : NOW INSERTING
        const popup=document.createElement("div");
        popup.id="addImageUrl-requestOption-popup";
        popup.className="requestoption-popup-main";
        const title=document.createElement("h6");
        title.textContent="insert URL?/insertImage?";
        title.className="text-primary text-center my-2";
        popup.style.cssText="position:absolute;max-width:350px;width:100%;min-height:5vh;height:auto;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:row;padding:1rem;gap:1.5rem;z-index:200;background-color:white;";
        popup.style.inset="20% 0% auto 0%";
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
                    this.insertImageUrl({parent,item,idValues,user});
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
                    this.insertImage({parent,item,idValues,user});
                    parent.removeChild(popup);
                },390);
            }
        };
    };


    insertImageUrl({parent,item,idValues,user}:{parent:HTMLElement,item:imgEleType,idValues:idValueType[],user:userType|null}){
       
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
        const {input,label}=Nav.inputComponent(form);
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
                
                // INSERTING SELECTED IMAGE
                const {selRowCol,target,imgKey,level}=item
                const eleId=target.id;
                const {selectorId,rowId}=selRowCol ||{selectorId:null,rowId:null,colId:null};
                const selRow={selectorId,rowId};
                button.disabled=true;
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const url=formdata.get("url") as string;
                if(url ){
                    //SELECTING IMAGE TO BE INSERTED
                    if(imgKey){
                      idValues=this._modSelector.dataset.removeSubValue({target,idValues,eleId,id:"imgKey"});
                    };
                    const idValue:idValueType={eleId,id:"addUrlImg",attValue:"addUrlImg"};
                    this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
                    if(level==="element"){
                        (target as HTMLImageElement).src=url;
                    }else if(level==="col"){
                        target.style.backgroundImage=`url(${url})`;
                    }else if(level==="row"){
                        target.style.backgroundImage=`url(${url})`;
                    };
                           
                    target.removeAttribute("data-img-key");

                    if(level==="element"){
                        this._modSelector.updateElement({target:target,idValues,selRowCol});
                        if(imgKey){
                            const markDel:deletedImgType={imgKey:imgKey,del:true,date:new Date()};
                            await this._service.markDelKey(markDel);
                        }
                    }else if(level==="col" && selRowCol){
                        this._modSelector.updateColumn({target:target,idValues,selRowCol})
                    }else if(level==="row" && selRow){
                        this._modSelector.updateRow({target:target,idValues,selRow:selRow as selRowType})
                    }
                    if(imgKey){
                        idValues=this._modSelector.dataset.removeSubValue({target:target,idValues,id:"imgKey",eleId});
                    }

                    this._modSelector.updateElement({target:target,idValues,selRowCol});
                    
                    Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                    setTimeout(()=>{
                        parent.removeChild(popup);
                    },390);
                }else{
                    Misc.message({parent,msg:"not a url",type_:"error",time:1200});
                }
            }
        };


    };


    updateParaShapeOutside({parent,image,idValues,key,selRowCol}:{parent:HTMLElement,image:HTMLImageElement,idValues:idValueType[],selRowCol:selRowColType,key:string}){
       
        const para=image.parentElement;
        if(!(para && para.nodeName==="P")) return;
        const idValue:idValueType={eleId:para.id,id:"imgKey",attValue:key};
        this._modSelector.dataset.upDateIdValue({target:para,idValues,idValue});
        this._modSelector.updateElement({target:para,idValues,selRowCol});

    };


//FIX ADD IMGKEY TO ELE UPON INSERT IMAGE
    insertImage({parent,item,idValues,user}:{parent:HTMLElement,item:imgEleType,idValues:idValueType[],user:userType|null}){
        const popup=document.createElement("div");
        popup.className="insert-popup";
        popup.style.cssText="position:absolute;max-width:800px;width:100%;min-height:5vh;height:auto;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;padding:1rem;gap:1.5rem;background-color:black;color:white;z-index:200;";
        popup.style.inset="0% 0% auto 0%";
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
                       
                        //SELECTING IMAGE TO BE INSERTED
                        this.insertSelectedImage({item,insert:insertImg,idValues});
                        Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                        setTimeout(()=>{
                            parent.removeChild(popup);
                        },390);
                    }
                };
            };
            
        });
    };



    insertSelectedImage({item,insert,idValues}:{
        insert:imageInsertType,
        item:imgEleType,
        idValues:idValueType[]

    }){
        //SELECTING IMAGE TO BE INSERTED
        const {selRowCol,selRow,target,imgKey,level,}=item;
        const {key:selectedKey,name:selectedName,url:selectedUrl}=insert;
       
        if(selectedKey){
            const eleId=target.id;
            const idValue:idValueType={eleId,id:"imgKey",attValue:selectedKey};
            this._modSelector.dataset.upDateIdValue({target,idValues,idValue});
            target.setAttribute("data-img-key",selectedKey);
            const check=["element","special","headerflag"].includes(level);
            if(imgKey ){
                //deleting none free/or none generic imgkey in db/aws
                const check=this._service.checkFreeImgKey({imgKey});
                if(!check){
                    const markDel:deletedImgType={imgKey:imgKey,del:true,date:new Date()};
                    this._service.markDelKey(markDel);
                };
            };
            if( selectedUrl){
                //FREE PICS
               
                if((level==="col" || level==="row") ){
                
                    target.style.backgroundImage=`url(${selectedUrl})`;
                    if(level==="col" ){
                        if(selRowCol){
                            this._modSelector.updateColumn({target:target,idValues,selRowCol:selRowCol});
                        }
                    }else if(level==="row" ){
                        if(selRow){
                           
                            this._modSelector.updateRow({target:target,idValues,selRow})
                        }
                    }
                }else if(check){
                    if(level==="element"){
                        (target as HTMLImageElement).src=selectedUrl;
                        (target as HTMLImageElement).alt=selectedName;
                    }else if(level==="special"){
                        const childs=([...target.children as any] as HTMLElement[]);
                        [...childs as HTMLElement[]].map(child=>{
                            if(child && child.nodeName==="IMG"){
                                const img=child as HTMLImageElement;
                                const getWidth=getComputedStyle(img).getPropertyValue("width");
                                const width=Number(getWidth.split("px")[0]);
                                img.src=imageLoader({src:selectedUrl,width,quality:95});
                            }
                        });
                    }else if(level==="headerflag"){
                        const childs=([...target.children as any] as HTMLElement[]);
                        [...childs as HTMLElement[]].map(child=>{
                            if(child ){
                                ([...child.children as any] as HTMLElement[]).map(ch=>{
                                    if(ch && ch.nodeName==="IMG"){
    
                                        const img=ch as HTMLImageElement;
                                        const getWidth=getComputedStyle(img).getPropertyValue("width");
                                        const width=Number(getWidth.split("px")[0]);
                                        img.src=imageLoader({src:selectedUrl,width,quality:95});
                                    }
                                });
                            }
                        });
                    }
                   
                    this._modSelector.updateElement({target,idValues,selRowCol});
                };
            };

        }else if(!selectedKey){
            this._modSelector.dataset.removeSubValue({target:target,id:"imgKey",idValues,eleId:target.id});
       
        };
        

    };



    asyncPicImage(item:{parent:HTMLElement}):Promise<{arr:{btn:HTMLButtonElement,imageUrl:string}[],popup:HTMLElement,reParent:HTMLElement}>{
        const {parent}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const arr:{btn:HTMLButtonElement,imageUrl:string}[]=[];
        const popup=document.createElement("div");
        popup.id="addImageUrl-asyncPicImag-popup";
        popup.style.cssText="position:absolute;max-width:800px;width:100%;min-height:5vh;border-radius:12px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;padding:1rem;gap:1.5rem;background-color:black;color:white;";
        popup.style.top="0%";
        popup.style.left="0%";
        popup.style.right="0%";
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
        return Promise.resolve({arr,popup,reParent:parent}) as Promise<{arr:{btn:HTMLButtonElement,imageUrl:string}[],popup:HTMLElement,reParent:HTMLElement}>;
    
    };


    async extractImg({target,idValues,level,imgKey,selRow,selRowCol}:{target:HTMLElement,idValues:idValueType[],level:"element"|"col"|"row",imgKey:string|null,selRow:selRowType|null,selRowCol:selRowColType|null}):Promise<imgExtractType>{
        const url=new URL(window.location.origin)
        const noimage=`${url}${this.noimage}`;
        let hasBlob=false;
        const node=target.nodeName.toLowerCase();
        const urlStr=target.style.backgroundImage;
        let imgUrl:string|undefined;
        let hasFreeImg:boolean=false;
        //no_userid-unknownUser-sequenceSolution.png
        //https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/imgKey
        const blob:RegExp=/(blob:http)/;
        const regFreeTest:RegExp=/(https:\/\/newablogroom-free-bucket.s3.us-east-1.amazonaws.com)/;
        const null_:RegExp=/(null)/;
        let hasGenericImgKey:boolean=false;
        const genericImgKey:RegExp=/(no_userid)/;
        const regFreeImgKey:RegExp=/(freeImg)/;
        const hasFreeImgKey=imgKey ? regFreeImgKey.test(imgKey):false;
        hasGenericImgKey=imgKey ? genericImgKey.test(imgKey) || null_.test(imgKey):false;
        
        if(level==="col" || level==="row"){
            imgUrl= this.extractBgImage({str:urlStr});//url(image)
            hasFreeImg=imgUrl ? regFreeTest.test(imgUrl):false;
            imgKey =(hasFreeImg && imgUrl && !hasBlob) ? this._service.getKey({imgUrl}) : imgKey;
            hasBlob=imgUrl ?  blob.test(imgUrl as string):false;
            switch(true){
                
                case !hasBlob && hasFreeImg && hasFreeImgKey && imgKey !==null:
                    //free image
                    imgUrl=this._service.getFreeBgImageUrl({imgKey}) as string;// same as `${this.freepicurl}/${imgKey}`;
                break;
                case hasBlob:
                    //not downloaded && no key
                    imgUrl=noimage;
                break;

                default:
                    break;
            }
            
        }else if( level==="element" && node==="img"){
            const img_=target as HTMLImageElement;
            imgUrl=img_.src;
            hasBlob=blob.test(imgUrl);
            hasFreeImg=regFreeTest.test(imgUrl);
            imgKey =(hasFreeImg && imgUrl && !hasBlob) ? this._service.getKey({imgUrl}) : imgKey;
            switch(true){
                case imgKey && !hasBlob && !hasFreeImg :
                    await this._service.getSimpleImg(imgKey).then(async(res)=>{
                        if(res){
                            imgUrl=res.img;
                        }
                    }) as gets3ImgKey;
                break;
                case hasFreeImg && !hasBlob:
                    imgUrl=(target as HTMLImageElement).src;
                break;
                case hasBlob:
                    imgUrl=noimage;
                break;
                default:
                    imgUrl=(target as HTMLImageElement).src;
                break;
            }
            
        };

        return {imgUrl,selRowCol,selRow,imgKey,level,hasBlob,hasFreeImg,hasGenericImgKey};
    };


    //@ level [data-is-element]
    extractSpecial({target,img,idValues,level,imgKey,selRowCol,selRow}:{target:HTMLElement,img:HTMLImageElement|null,idValues:idValueType[],level:"row"|"col"|"element"|"special",imgKey:string|null,selRowCol:selRowColType|null,selRow:selRowType|null}):imgExtractType{
        const url=new URL(window.location.origin)
        const noimage=`${url}${this.noimage}`;
        let hasBlob:boolean=false;
        let hasFreeImg:boolean=false;
        const blob:RegExp=/(blob:http)/;
        let hasGenericImgKey:boolean=false;
        const genericImgKey:RegExp=/(no_userid)/;
        hasGenericImgKey=imgKey ? genericImgKey.test(imgKey):false;
        const regFreeTest:RegExp=/(newablogroom-free-bucket)/;
        const regFreeImgKey:RegExp=/(freeImg)/;
        const hasFreeImgKey=imgKey ? regFreeImgKey.test(imgKey):false;
        let imgExtract:imgExtractType={} as imgExtractType;
        if(img){
            let imgUrl:string=img.src;
            hasBlob=blob.test(img.src);
            hasFreeImg=regFreeTest.test(img.src);
            imgKey =(hasFreeImg && imgUrl && !hasBlob) ? this._service.getKey({imgUrl}) : imgKey;
            switch(true){
                case hasBlob:
                    imgUrl=noimage;
                break;
                case hasFreeImg && hasFreeImgKey && !hasBlob && imgKey !==null:
                    imgUrl=this._service.getFreeBgImageUrl({imgKey});
                break;
                default:
                    imgUrl=img.src;
                    break;
            }
            
            imgExtract={imgUrl,selRowCol,selRow,imgKey,level,hasBlob,hasFreeImg,hasGenericImgKey}
            return imgExtract
        };
        imgExtract={imgUrl:noimage,selRowCol,selRow,imgKey,level,hasBlob,hasFreeImg,hasGenericImgKey}
        return imgExtract
    };


    extractHeaderType({target,idValues,imgKey,level,selRowCol,selRow}:{
        target:HTMLElement,
        idValues:idValueType[],
        imgKey:string|null,
        level:"element"|"col"|"row"|"special"|"headerflag",
        selRowCol:selRowColType|null,
        selRow:selRowType|null
        }):imgExtractType{
            const url=new URL(window.location.origin)
            const noimage=`${url}${this.noimage}`;
            let imgUrl:string|undefined;
            let hasBlob:boolean=false;
            let hasFreeImg:boolean=false;
            const blob:RegExp=/(blob:http)/;
            const regHeaderFlag:RegExp=/(headerflag)/;
            const genericImgKey:RegExp=/(no_userid)/;
            const hasGenericImgKey=imgKey ? genericImgKey.test(imgKey):false;
            const regFreeTest:RegExp=/(newablogroom-free-bucket)/;
            const getImgKey=this._modSelector.dataset.getIdValue({target,idValues,id:"imgKey"});
            const _imgKey=getImgKey?.attValue ? getImgKey.attValue : null;
            imgKey=imgKey || _imgKey;
            ([...target.children as any] as HTMLElement[]).map(child=>{
                if(child){
                    ([...child.children as any] as HTMLElement[]).map(ch=>{
                        if(ch && ch.nodeName==="IMG"){
                            const img=ch as HTMLImageElement
                            imgUrl=img.src;
                            hasBlob=blob.test(imgUrl);
                            const hasHflagImg=regHeaderFlag.test(imgUrl);
                            hasFreeImg=regFreeTest.test(img.src);
                            const checkImg=hasFreeImg && imgUrl && !hasBlob && !hasHflagImg;
                            if(checkImg){
                                imgKey =this._service.getKey({imgUrl});
                            };
                            if(!hasFreeImg && hasHflagImg) imgUrl=img.src;
                            if(hasBlob) imgUrl=noimage;
                        }
                    });
                }
            });

        const imgExtract:imgExtractType={imgUrl,selRowCol,selRow,imgKey,level,hasBlob,hasFreeImg,hasGenericImgKey};
        return imgExtract
    };


   

    extractBgImage({str}:{str:string}):string|undefined{
        let retImg:string|undefined;
        const startReg:RegExp=/(url\(")/g;
            const endReg:RegExp=/"\)/g;
            const starts=str.matchAll(startReg) as any;
            const ends=str.matchAll(endReg) as any;
            for(const start of starts){
                for (const end of ends ){
                    const beg=start.index + start[0].length;
                    const end_=end.index;
                    retImg=str.slice(beg,end_);
                    // console.log("extractImg:img",retImg)//works
                }
            }
            return retImg
    };


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
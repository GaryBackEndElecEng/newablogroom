import Misc from "../common/misc/misc";
import Service from "../common/services";
import Header from "../editor/header";
import Nav from "../nav/headerNav";

type imgItemType={id:number,name:string,desc:string,img:string}
class HomeIntro {
    img1:string=`/images/instruction/small/showone.png`;
    img2:string=`/images/instruction/small/showtwo.png`;
    img3:string=`/images/instruction/small/showthree.png`;
    arrImgs:imgItemType[]=[]
    constructor(public service:Service){
        this.arrImgs=[
            {id:0,name:"Top part",desc:" introduction: to help you,Customize Background themes, create a new Blog or website,One-Step Edit your work,Quick refresh,",img:this.img1},
            {id:1,name:"Middle-section",desc:" Effective Creation:: Edit your Meta,Preserve your work,Restructor your work, and choose  your header",img:this.img2},
            {id:2,name:"Bottom-section",desc:"over 12 unique features that no-one else has,Make your own Custom Page,Merge text with image, generate Code, select a footer to customize and choose your grid.",img:this.img3},
        ]
    }
    main(parent:HTMLElement,baseUrl:string){
        Header.cleanUpByID(parent,"intro-popup");
        const css="display:flex;justify-content:center;align-items:center;gap:1rem;flex-direction:column;border-radius:12px;";
        parent.style.zIndex="";
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.id="intro-popup";
        popup.style.cssText="margin:auto;position:absolute;box-shadow:1px 1px 12px 1px black;background-color:black;color:white;z-index:200;position:relative;" + css;
        popup.style.inset="-48% 0% 20% 0%";
        popup.style.height="auto";
        popup.style.marginInline="5rem";
        popup.style.marginBlock="3rem";
        popup.style.paddingBlock="4rem";
        popup.style.paddingInline="18rem";
        const container=document.createElement("div");
        container.style.cssText="display:flex;align-items:center;gap:1rem;flex-direction:column;border-radius:12px;;margin:auto;overflow-y:scroll;width:100%;position:relative;padding:1rem;background:blue;"
        const time=1200;
        this.arrImgs.map((item,)=>{

            this.card(container,item,css,time).then(async(res)=>{
                if(res){
                    
                     //OBSERVER--------------/////
                    const entryParams=([...res.card.children as any] as HTMLElement[]).filter(child=>(([...child.classList as any] as string[]).includes("intro-cardBody")));
                    this.observe(entryParams,null);
                    //OBSERVER--------------/////
                           
                        }
            });
        });         
        popup.appendChild(container)
        parent.appendChild(popup);
        const btnGrp=document.createElement("div");
        btnGrp.style.cssText="display:flex;justify-content:center;align-items:center;gap:3rem;;padding-block:3rem;margin-block:2rem;"
        popup.appendChild(btnGrp);
        const {button}=Misc.simpleButton({anchor:btnGrp,text:"close",bg:Nav.btnColor,color:"white",type:"button",time:400});
        const {button:editor}=Misc.simpleButton({anchor:btnGrp,text:"editor",bg:"green",color:"white",type:"button",time:400});
        editor.onclick=(e:MouseEvent)=>{
            if(e){
                this.service.initializeBlog();
                const url=new URL("/editor",baseUrl)
                window.location.href=url.href;
            }
        };
        button.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:30,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },380);
            }
        };
        Misc.matchMedia({parent:popup,maxWidth:2100,cssStyle:{inset:"-46% 0% 20% 0%",marginInline:"0rem",paddingInline:"15rem",paddingBlock:"6rem"}});
        Misc.matchMedia({parent:popup,maxWidth:1529,cssStyle:{inset:"-55% 0% 20% 0%",marginInline:"0rem",paddingInline:"13rem",paddingBlock:"6rem"}});
        Misc.matchMedia({parent:popup,maxWidth:1300,cssStyle:{inset:"-55% 0% 20% 0%",marginInline:"0rem",paddingInline:"10rem",paddingBlock:"6rem"}});
        Misc.matchMedia({parent:popup,maxWidth:1100,cssStyle:{inset:"-46% 0% 20% 0%",marginInline:"0rem",paddingInline:"2rem",paddingBlock:"6rem"}});
        Misc.matchMedia({parent:popup,maxWidth:840,cssStyle:{inset:"-46% 0% 20% 0%",paddingInline:"1rem"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{inset:"-69% 0% 30% 0%",marginInline:"0rem",paddingInline:"1rem",paddingBlock:"2rem"}});
       
    }
    async card(parent:HTMLElement,item:imgItemType,css:string,time:number){
        const paraFont=window.innerWidth <420 ? "70%":"110%"
        const card=document.createElement("div");
        card.id=`card-${item.id}`
        card.style.cssText=css + "gap:2rem;background-color:white;color:black;width:100%;min-height:70vh;position:relative;border-radius:inherit;box-shadow:1px 1px 12px 1px black;";
        card.style.backgroundImage=`url(${item.img})`;
        card.style.backgroundSize=`100% 100%`;
        card.style.backgroundPosition=`50% 50%`;
        const cardBody=document.createElement("div");
        cardBody.className="intro-cardBody"
        cardBody.style.cssText=css + "position:absolute;top:0%;right:0%;width:220px;padding-inline:1rem;padding-block:1rem;gap:2rem;background-color:rgb(0 0 255 / 39%);color:white;height:auto;"
        const title=document.createElement("h6");
        title.className="lean display-6 my-1 text-decoration-underline text-underline-offset-4 text-center";
        title.style.cssText="position:relative;";
        title.style.borderRadius="13px";
        title.textContent=item.name;
        const para=document.createElement("p");
        para.style.cssText=`text-wrap:pretty;border-radius:15px;font-family:Poppins-Regular;position:relative;font-size:${paraFont};`;
        para.textContent=item.desc;
        const timeOne=time/4;
        setTimeout(()=>{
            cardBody.appendChild(title);
            title.animate([
                {transform:"translate(-100%,-100%)",opacity:"0"},
                {transform:"translate(0%,0%)",opacity:"1"},
            ],{duration:time*2,iterations:1});

            setTimeout(()=>{
                cardBody.appendChild(para);
                para.animate([
                    {transform:"translate(-100%,-100%)",opacity:"0",fontSize:"100%"},
                    {transform:"translate(0%,0%)",opacity:"1",fontSize:`${paraFont}`},
                ],{duration:time*2,iterations:1});
            },time*2);
        },time);
        card.appendChild(cardBody);
        parent.appendChild(card);
        card.animate([
            {opacity:"0"},
            {opacity:"1"},
        ],{duration:timeOne + 200,iterations:1});
        Misc.matchMedia({parent:cardBody,maxWidth:420,cssStyle:{width:"120px"}});
        Misc.matchMedia({parent:title,maxWidth:420,cssStyle:{fontSize:"80%"}});
        Misc.matchMedia({parent:para,maxWidth:420,cssStyle:{fontSize:"70%"}});


        return Promise.resolve({card:card}) as Promise<{card:HTMLElement}>;

    }
    observe(arr:HTMLElement[],root:HTMLElement|null){
        const observer=new IntersectionObserver(entries=>{
            const entry=entries[0];
                if(entry){
                    const html=entry.target as HTMLElement
                    if(entry.isIntersecting){
                        html.style.animation="";
                        html.style.opacity="1";
                        html.animate([
                            {opacity:"0"},
                            {opacity:"1"},
                        ],{duration:600,iterations:1});
                    }else{
                        html.style.animation="";
                        html.style.opacity="0";
                        html.animate([
                            {opacity:"1"},
                            {opacity:"0"},
                        ],{duration:600,iterations:1});
                    }
                }
        },{threshold:0.8,rootMargin:"0px",root:root});
        arr.forEach(item=>{
            if(item){
            observer.observe(item);
            }else{
                observer.disconnect()
            }
        });
       
    }

}
export default HomeIntro;
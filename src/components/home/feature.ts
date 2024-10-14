import { FaCrosshairs } from "react-icons/fa";
import Misc from "../common/misc";
import { FaCreate } from "../common/ReactIcons";
import Nav from "../nav/headerNav";

export type descType={
    id:number,
    li1:string|null,
    li2:string|null,
    li3:string|null,
    li4:string|null,
    li5:string|null,
    li6:string|null,
}
export type featureType={
    id:number,
    name:string,
    summary:string,
    list:descType,
    img:string
}

class Features{
    effectImg:string="/images/feature/effect.png";
    descList:descType[]=[
        {id:0,li1:"authorized allowed url viewing",li2:"life time viewing one hour",li3:"AI upload preventable",li4:"high resolution",li5:"accepts png/jpg only",li6:"quick Upload"},
        {id:1,li1:"password && email changeout",li2:"blog-meta editing",li3:"comment viewing && email responses",li4:"personalize profile",li5:"blog-quick editing",li6:"quick online/off-line toggling"},
        {id:2,li1:"Selective Title-effect",li2:"Customize Ven-diagram",li3:"arrow text-emphasize art",li4:"Customized wave art",li5:"Customize Arch-art",li6:"Customize bubble art"},
        {id:3,li1:"Drop-down 36-choice menu",li2:"dynamic size-fit-all screens",li3:"adjustable flex cell views",li4:"background and forground imagery",li5:"Custom email and cell displays",li6:"something here"},
        {id:4,li1:"Custom drop-down selection",li2:"background && forground imagery",li3:"dynamic flex box for all screen sizes",li4:"cell column && row adjustment",li5:"div5",li6:"div6"},
        {id:5,li1:"text-fill for paragraph tags",li2:"clean text to remove clutter to when copying text from the web",li3:"toolbar having over 30 options",li4:"image capture for poster creation, maluable for all screen sizes",li5:"side-bar isolator, allowing for centering the editor viewport",li6:"easy sign-in  and signout methods."},
        {id:6,li1:"keyword filtering",li2:"brief decsription display",li3:"twitter, Facebook, Google, Explorer and safari compatible",li4:"title and tab display",li5:"dynamic Google registration",li6:"reference section for back-link population."},
        {id:7,li1:"bar or line graph display option;",li2:"floating cursor message display",li3:"easy data creation form with multi-color display;",li4:"multi-color display;",li5:null,li6:null},
    ];
    featureList:featureType[]=[
        {id:0,name:"AWS image protection",summary:"Aws provides a signed key, allowing a one time upload from source. This allows for absolute image protection, preserved to the originator and disallows AI to unlock and use the image.",list:this.descList[0],img:"/images/feature/aws.png"},
        {id:1,name:"Floating Secure Profile",summary:"Secure profile for quick streamline blog management. It display your blogs and allows you to quickly edit your blogs, while viewing and answering viewers comments, along with personalizable issuances and references.",list:this.descList[1],img:"/images/feature/profile.png"},
        {id:2,name:"Text-Art",summary:"encourages viewer text focus through text emphasis with graphics centered on a statement or idea in an enjoyable and enlightening way, enlightning the pleasure of understanding, which draws pleasure of reading.",list:this.descList[2],img:"/images/feature/art.png"},
        {id:3,name:"Headers and Footers",summary:"Improves on area focus, outlined by structure and imagery and allows introductory easing.It allows the author to emphasize headings along with final statements and or idea, with re-emphasism with footer display, along with additional means of connecting via email,commenting and or telecommunication.",list:this.descList[3],img:"/images/feature/header.png"},
        {id:4,name:"Flexbox",summary:"Improves on structure and thought organization through dynamic screen formats facilitated by easy custom drop-down features and element selection to choose from.",list:this.descList[4],img:"/images/feature/flexbox.png"},
        {id:5,name:"Tools",summary:"Accommodates the allowance of effective blog creation.",list:this.descList[5],img:"/images/feature/tools.png"},
        {id:6,name:"Dynamic Metadata",summary:"Dynamic Metadata population to each blog,for easy media site, browsers and MSM link sharing with a professional approach, allowing  topic sharing with ease. Dynamic Meta extracts keywords,images and description with AI assistance and inserts descriptors on the fly on each blog.",list:this.descList[6],img:"/images/feature/meta.png"},
        {id:7,name:"Custom graphs",summary:"Customizeable graph generation, allowing you to present your data as seen fit so that your viewers can visually see visual facts. The graph tool can hold upto 1000 points and provides a floating message cursor identifying the points value for improved client interaction. It provides the following:",list:this.descList[7],img:"/images/feature/graph.png"},
    ];
    constructor(){

    }
    feature(parent:HTMLElement){
        const name=parent.nodeName.toLowerCase();
        parent.style.position="relative";
        parent.style.zIndex="1";
        const popup=document.createElement("div");
        popup.id="popup-feature-main";
        popup.style.cssText="margin-inline:auto;position:absolute;display:flex;flex-direction:column;align-items:center;gap:1rem;border-radius:12px;box-shadow:1px 1px 12px 1px black;overflow-y:scroll;overflow-x:hidden;padding-inline:1rem;padding-block:1rem;padding-bottom:2rem;height:80vh;";
        if(name==="body"){
            popup.style.inset="5% 15% 30% 15%";
            popup.style.zIndex="200";
        }else{
            popup.style.inset="5% 5% 20% 5%";
        }
        const container=document.createElement("div");
        container.id="popup-feature-main-container";
        container.style.cssText="width:100%;margin-inline:center;background-color:white;border-radius:inherit;position:relative;";
        const mainTitle=document.createElement("h4");
        mainTitle.className="text-center text-primary lean display-4 mb-3";
        mainTitle.textContent="Features";
        container.appendChild(mainTitle);
        parent.appendChild(popup);
        window.scroll(0,0);
        this.backgroundEffect({parent:container,time:30000});//background-effects;
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{inset:"5% 2% 50% 2%"}});
        if(name==="body"){
            Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{inset:"5% 10% 40% 10%"}});
        }else{
            Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{inset:"5% 5% 40% 5%"}});
        }
        this.removeElement({parent,target:popup});
        Misc.growIn({anchor:popup,scale:1,opacity:0,time:400});

        
        this.featureList.map((feature)=>{
            this.card({parent:container,feature});
        });
        popup.appendChild(container);
        const {button:close}=Misc.simpleButton({anchor:popup,bg:Nav.btnColor,color:"white",text:"close features",time:400,type:"button"});
        close.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:-100,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },390);
            }
        };
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{inset:"5% 0% 40% 0%"}})
    }
    card(item:{parent:HTMLElement,feature:featureType}){
        const {parent,feature}=item;
        const paddingInline=window.innerWidth <900 ? "0px" :"1rem";
        const css=`margin-inline:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding-inline:${paddingInline};`;
        const flex="margin-inline:auto;width:100%;display:flex !important;align-items:center;gap:2rem;padding-inline:1rem;flex-wrap:nowrap;";
        const container=document.createElement("div");
        container.id="card-container" + `${feature.id}`;
        container.style.cssText=css + "width:100%";
        const title=document.createElement("div");
        title.className="text-center text-primary lean display-6 mb-2";
        title.textContent=feature.name;
        container.appendChild(title);
        const card=document.createElement("div");
        card.id="card-"+ `${feature.id}`;
        card.className="d-flex align-items-center";
        card.style.cssText=flex + "font-family:Poppins-Regular;font-size:120%;";
        const img=document.createElement("img");
        img.id=`${feature.name}-${feature.id}-${feature.id}`;
        img.src=feature.img ? feature.img : "/images/gb_logo.png";
        img.alt=`${feature.name}-${feature.id}`;
        img.style.cssText="max-width:400px;border-radius:inherit;aspect-ratio:1 / 1;filter:drop-shadow(0 0 0.75rem black);border-radius:12px;width:100%; "
        card.appendChild(img);
        const cardBody=document.createElement("div");
        cardBody.id="card-cardBody-" + `${feature.id}`;
        cardBody.style.cssText=css + "max-width:600px;font-family:'Poppins-Regular';";
        const summary=document.createElement("p");
        summary.style.cssText="padding:1rem;border-radius:12px;margin:auto;text-wrap:pretty;";
        summary.textContent=feature.summary;
        const descContainer=document.createElement("div");
        descContainer.style.cssText=css;
        descContainer.innerHTML+=`<div style="order:-1;"><p style="color:blue;font-weight:bold;font-size:120%;"> feature items:</p></div>`;
        const desc=document.createElement("ol");
        desc.id="card-cardBody-desc-"+ `${feature.id}`;
        desc.style.cssText="margin-inline:auto;display:flex;flex-direction:row;align-items:flex-start;justify-content:center;gap:1rem;flex-wrap:nowrap;gap:1rem;color:#05056a;";
        const div1=document.createElement("div");
        div1.id="ul-divider-1-" + `${feature.id}`;
        div1.style.cssText=css + "align-items:flex-start;gap:1rem;";
        const div2=document.createElement("div");
        div2.id="ul-divider-2-" + `${feature.id}`;
        div2.style.cssText=css + "align-items:flex-start;gap:1rem;";
        let i=1;
        const len=Object.values(feature.list).length;
        for( const [key,value] of Object.entries(feature.list)){
            if(key !=="id" && value ){
                if(i <4){
                    const li=document.createElement("li");
                    li.style.cssText="order:1;text-wrap:pretty;width:100%;"
                    li.innerHTML=`<span>${value}</span>`;
                    div1.appendChild(li);
                    if(i===3 && len>3){ desc.appendChild(div1)}
                    else if(len<3){desc.appendChild(div1)};
                }else if(i >=4 && i<7){
                    const li=document.createElement("li");
                    li.style.cssText="order:1;text-wrap:pretty;width:100%;"
                    li.innerHTML=`<span>${value}</span>`;
                    div2.appendChild(li);
                    if(i===6 || i===len){ desc.appendChild(div2)};
                }
               
                i++;
            }
        }
        cardBody.appendChild(summary);
        descContainer.appendChild(desc);
        cardBody.appendChild(descContainer);
        card.appendChild(cardBody);
        container.appendChild(card);
        parent.appendChild(container);
        Misc.matchMedia({parent:card,maxWidth:900,cssStyle:{flexDirection:"column",flexWrap:"wrap"}});
        Misc.matchMedia({parent:desc,maxWidth:400,cssStyle:{flexDirection:"column"}});
        Misc.matchMedia({parent:summary,maxWidth:400,cssStyle:{paddingInline:"0rem"}});
        Misc.matchMedia({parent:img,maxWidth:900,cssStyle:{maxWidth:"600px"}});
        Misc.matchMedia({parent:img,maxWidth:400,cssStyle:{maxWidth:"400px"}});
    }
    backgroundEffect(item:{parent:HTMLElement,time:number}){
        const {parent,time}=item;
        //BACKGROUND-EEFFECT
        const rot=100/5;
        const popupEffect=document.createElement("div");
        popupEffect.id="popup-effect-main";
        popupEffect.style.cssText=`position:absolute;inset:-0.5rem;border-radius:inherit;background-image:url(${this.effectImg});background-position:50% 50%;background-size:200% 200%;overflow:hidden;`;
        popupEffect.style.zIndex="-1";
        parent.appendChild(popupEffect);
        popupEffect.animate([
            {backgroundPosition:"50% 50%",filter:`drop-shadow(0 0 0.75rem hsl(177, ${rot*5*0.93}%, ${rot*1*0.48}%))`},
            {backgroundPosition:"100% 100%",filter:`drop-shadow(0 0 0.75rem hsl(177, ${rot*4*0.93}%,  ${rot*2*0.48}%))`},
            {backgroundPosition:"50% 50%",filter:`drop-shadow(0 0 0.75rem hsl(177, ${rot*3*0.93}%,  ${rot*3*0.48}%))`},
            {backgroundPosition:"0% 0%",filter:`drop-shadow(0 0 0.75rem hsl(177, ${rot*4*0.93}%,  ${rot*4*0.48}%))`},
            {backgroundPosition:"50% 50%",filter:`drop-shadow(0 0 0.75rem hsl(177, ${rot*5*0.93}%,  ${rot*5*0.48}%))`},
        ],{duration:time,iterations:Infinity});
        // popupEffect.animate([
        //     {background: `linear-gradient(-${rot*20}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*20}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*19}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*19}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*18}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*18}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*17}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*17}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*16}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*16}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*15}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*15}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*14}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*14}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*13}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*13}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*12}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*12}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*11}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*11}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*10}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*10}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*9}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*9}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*8}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*8}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*7}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*7}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*6}deg, white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*6}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*5}deg,white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*5}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*4}deg,white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*4}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*3}deg,white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*3}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*2}deg,white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*2}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(-${rot*1}deg,white,blue,white)`,boxShadow:`1px 1px 12px 1px hsl(${rot*1}deg 94.14% 49.7% / 95%)`},
        //     {background: `linear-gradient(0deg,white,blue)`},
        // ],{duration:time,iterations:Infinity})
    }
    removeElement(item:{parent:HTMLElement,target:HTMLElement}){
        const {parent,target}=item;
        const xDiv=document.createElement("div");
        xDiv.style.cssText="position:absolute;width:30px,height:30px;top:0%;right:0%;border-radius:50%;transform:translate(-10px,10px);background:black;z-index:200;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{color:"white",fontSize:"28px"}});
        target.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:target,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(target);
                });
            }
        };
    }
}
export default Features;
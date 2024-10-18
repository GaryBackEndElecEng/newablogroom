import Misc from "@/components/common/misc";
import Header from "@/components/editor/header";
import Meta from "@/components/meta/meta";
import Nav from "@/components/nav/headerNav";



class ErrorClass {
    meta:Meta;
    urls_:string[];
    logo:string="/images/gb_logo.png";
    bend:string="/images/bend.png";
   _params:{[key:string]:string}[];
    constructor(){
       this._params=[];
       this.meta=new Meta();
      
    }

    get params(){
        return this._params
    }
    set params(params:{[key:string]:string}[]){
        this._params=params
    }
    async main(item:{parent:HTMLElement,urls:string[]}){
        const {parent,urls}=item;
        this.getUrl();//Getting paramters from url && feeding params
        Header.cleanUpByID(parent,"error-page-main");
        parent.style.cssText="margin-inline:auto;padding-inline:10rem;padding-block:3rem;;min-height:110vh;";
        const container=document.createElement("section");
        container.id="error-page-main";
        container.style.cssText="padding-inline:2rem;margin-inline:2rem;margin-block:3rem;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1.5rem;background-color:black;border-radius:12px;z-index:2;";
        const text=document.createElement("p");
        text.textContent=" error Page";
        text.className="text-center text-primary text-decoration-underline text-underline-offset-4"
        text.style.cssText="font-size:300%;";
        const innerContainer=document.createElement("div");
        innerContainer.id="error-page-main-sub";
        innerContainer.style.cssText="padding:5rem;border-radius:12px;background-color:blue;z-index:2;width:100%;height:90vh;display:flex;align-items:center;flex-direction:column;justify-content:center;";
        const div=document.createElement("div");
        div.id="register-page-main-inner-div";
        div.style.cssText=`width:100%;height:100%;border-radius:inherit;background-color:white;box-shadow:1px 1px 12px 1px black;display:flex;justify-content:center;gap:2rem;align-items:center;flex-direction:column;background-image:url(${this.bend});background-position:50% 50%;background-size:100% 100%;margin-bottom:2rem;`;
        innerContainer.appendChild(div);
        const para=document.createElement('p');
        para.style.cssText="margin-inline:auto;padding:2rem;margin-block:2rem;background-color:black;color:white;border-radius:12px;padding:1rem;margin-block:auto;";
        const btnGrp=document.createElement("div");
        btnGrp.style.cssText="margin-inline:auto;display:flex;flex-wrap:wrap;align-items:center;gap:1.25rem;"
        const {button:back}=Misc.simpleButton({anchor:btnGrp,type:"button",bg:Nav.btnColor,color:"white",time:500,text:"go back"});
        const {button:home}=Misc.simpleButton({anchor:btnGrp,type:"button",bg:Nav.btnColor,color:"white",time:500,text:"go home"});
        const img=document.createElement('img');
        img.id="shape-outside-log";
        img.src=this.logo;
        img.alt="www.ablogroom.com"
        img.style.cssText="shape-outside:circle(50%);border-radius:50%;width:175px;aspect-ratio: 1 / 1;filter:drop-shadow(0 0 0.75rem white);box-shadow:1px 1px 12px 1px black;float:left;margin-right:1.25rem;";
        para.appendChild(img);
        para.innerHTML+=" I believe you have made an error on getting to a page. You have accessed the following:"
        Object.values(this.params).map((item,index)=>{
            if(item.key && item.value && index >0){
                para.innerHTML+=`<span style="color:white;font-weight:bold;">${item.key}</span> : <span style="color:white;font-weight:bold;">${item.value}</span> <br/>`;
                if(item.key==="intent"){
                    const {button:intent}=Misc.simpleButton({anchor:btnGrp,type:"button",bg:Nav.btnColor,color:"white",time:500,text:`${item.value}`});
                    intent.onclick=(e:MouseEvent)=>{
                        if(e){
                            const pathname=item.value;
                            const url= new URL(window.location.href);
                            const newUrl=new URL(pathname,url.origin);
                            window.location.href=newUrl.href;
                        }
                    }

                }
            }

        });
        para.innerHTML+="try again or usee the buttons below to redirect you appropriately."
        div.appendChild(para);
        innerContainer.appendChild(div);
        //OTHER SITES
        this.otherSites({parent:div,urls});;
        //OTHER SITES
        innerContainer.appendChild(btnGrp);
        container.appendChild(text);
        container.appendChild(innerContainer);
        
        parent.appendChild(container)
        Misc.matchMedia({parent,maxWidth:1100,cssStyle:{paddingInline:"6rem"}});
        Misc.matchMedia({parent,maxWidth:900,cssStyle:{paddingInline:"4rem"}});
        Misc.matchMedia({parent,maxWidth:400,cssStyle:{paddingInline:"1rem"}});
        Misc.matchMedia({parent:innerContainer,maxWidth:400,cssStyle:{paddingInline:"0rem",marginInline:"0rem",height:"80vh"}});
        Misc.matchMedia({parent:innerContainer,maxWidth:900,cssStyle:{paddingInline:"4rem",height:"60vh"}});
        Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{paddingInline:"0rem",marginInline:"0rem"}});
        back.onclick=(e:MouseEvent)=>{
            if(e){
                window.history.go(-1);
            }
        };
        
        home.onclick=(e:MouseEvent)=>{
            if(e){
                const url=new URL(window.location.href);
                window.location.href=url.origin;
            }
        };

    }
    async getUrl(){
        //GETTING PARAMETERS FROM URL
        const url=new URL(window.location.href);
        this.meta.params.map(key=>{
            if(key){
                const value=url.searchParams.get(key);
                if(value){
                    this._params.push({key,value});
                }
            }
        });

    }
    otherSites(item:{parent:HTMLElement,urls:string[]}){
        const {parent,urls}=item;
        const text=document.createElement("h6");
        text.className="text-center text-primary lean display-6";
        text.textContent="other sites";
        parent.appendChild(text);
        const otherSite=document.createElement("div");
        otherSite.id="otherSite";
       otherSite.style.cssText="margin:auto;width:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;border-radius:12px;padding:1.25rem;box-shadow:1px 1px 12px 1px rgba(0, 191, 255,0.5);height:60vh;overflow-y:scroll;";
       const ol=document.createElement("ol");
       ol.style.cssText="margin-block:1.5rem;margin-inline:auto;padding-inline:1.5rem;";

       urls.map(site=>{
        const li=document.createElement("li");
        const anchor=document.createElement("a");
        anchor.style.cssText="text-decoration:underline;cursor:pointer";
        anchor.href=site;
        anchor.textContent=site;
        li.appendChild(anchor);
        ol.appendChild(li);
       });
       otherSite.appendChild(ol);
       parent.appendChild(otherSite);
    }
}
export default ErrorClass;
import Misc from "@/components/common/misc";
import Header from "@/components/editor/header";
import Nav from "@/components/nav/headerNav";



class ErrorClass {
  public readonly btnColor:string=Nav.btnColor;
  public urls_:string[];
  public readonly logo:string="/images/gb_logo.png";
  public readonly bend:string="/images/bend.png";
  public _params:{[key:string]:string}[];
  public pages:{id:number,page:string,redir:RegExp,match:RegExp}[]
    constructor(){
        this.btnColor=Nav.btnColor;
       this._params=[];
       this.pages=[
        {id:0,page:'/az',redir:/\/[a-z]{1,3}\//,match:/\//},
        {id:1,page:'/blog/',redir:/\/(blog)\/\d+[a-z/]+/,match:/\/(blog)\/\d+/},
        {id:2,page:'/blogs',redir:/\/(blogs)[a-zA-Z/]+/,match:/\/(blogs)/},
        {id:3,page:"/register",redir:/\/(register)\w+/,match:/\/(register)/},
        {id:4,page:"/editor",redir:/\/(editor)\/\w+/,match:/\/(editor)/},
        {id:5,page:"/policy",redir:/\/(policy)[a-zA-Z/]+/,match:/\/(policy)/},
        {id:6,page:"/termsOfService",redir:/\/(termsOfService)[a-zA-Z/]+/,match:/\/(termsOfService)/},
        {id:7,page:"/admin",redir:/\/(admin)[a-zA-Z/]+/,match:/\/(admin)/},
        {id:8,page:"/posts",redir:/\/(posts)[a-zA-Z/]+/,match:/\/(posts)/},
      ]
      
      
    }

    get params(){
        return this._params
    }
    set params(params:{[key:string]:string}[]){
        this._params=params
    }
    async main(item:{parent:HTMLElement,urls:string[],params:{[key:string]:string}[]}){
        const {parent,urls,params}=item;
        this.params=params;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        this.getUrl();//Getting paramters from url && feeding params
        Header.cleanUpByID(parent,"error-page-main");
        const container=document.createElement("section");
        container.id="error-page-main";
        container.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1.5rem;background-color:black;border-radius:12px;z-index:2;";
        container.style.marginBlock=less900 ? (less400 ? "0rem":"0.5rem"):"2rem";
        container.style.paddingInline=less900 ? (less400 ? "0rem":"2rem"):"3rem";
        container.style.width=less900 ? (less400 ? "100%":"95%"):"70%";
        this.titlePage({parent:container});
        const text=document.createElement("p");
        text.textContent=" error Page";
        text.className="text-center text-primary text-decoration-underline text-underline-offset-4"
        text.style.cssText="font-size:300%;";
        const innerContainer=document.createElement("div");
        innerContainer.id="error-page-main-sub";
        innerContainer.style.cssText="border-radius:12px;background-color:blue;z-index:2;height:90vh;display:flex;align-items:center;flex-direction:column;justify-content:center;";
        innerContainer.style.padding=less900 ? (less400 ? "0px":"1.2rem"):"3rem";
        innerContainer.style.paddingInline=less900 ? (less400 ? "0px":"2rem"):"3rem";
        innerContainer.style.paddingBlock=less900 ? (less400 ? "0px":"1rem"):"2rem";
        innerContainer.style.paddingBottom=less900 ? (less400 ? "2rem":"1rem"):"2rem";
        innerContainer.style.marginBottom=less900 ? (less400 ? "1.5rem":"1rem"):"auto";
        ///
        const div=document.createElement("div");
        div.id="register-page-main-inner-div";
        div.style.cssText=`width:100%;height:100%;border-radius:inherit;background-color:white;box-shadow:1px 1px 12px 1px black;display:flex;justify-content:center;gap:2rem;align-items:center;flex-direction:column;background-image:url(${this.bend});background-position:50% 50%;background-size:100% 100%;margin-bottom:2rem;padding-bottom:2rem;`;
        innerContainer.appendChild(div);
        await this.ShapeOutside({parent:div,subParent:innerContainer}).then(async(res)=>{
            if(res){

                res.back.onclick=(e:MouseEvent)=>{
                    if(e){
                        const origin=new URL(window.location.href).origin;
                        const newUrl=new URL("/blogs",origin);
                        window.location.replace(newUrl.href);
                    }
                };
                
                res.home.onclick=(e:MouseEvent)=>{
                    if(e){
                        const url=new URL(window.location.href);
                        window.location.href=url.origin;
                    }
                };
            }
        });
        ///

        
        //OTHER SITES
        this.otherSites({parent:div,urls});;
        //OTHER SITES
        container.appendChild(text);
        container.appendChild(innerContainer);
        
        parent.appendChild(container)
        

    };


    ShapeOutside(item:{parent:HTMLElement,subParent:HTMLElement}):Promise<{back:HTMLButtonElement,home:HTMLButtonElement}>{
        const {parent,subParent}=item;
        const less900= window.innerWidth < 900;
        const less400= window.innerWidth < 400;
        const para=document.createElement('p');
        para.id="div-para";
        para.style.cssText="margin-inline:auto;padding:2rem;background-color:black;color:white;border-radius:12px;padding:1rem;";
        para.style.lineHeight=less900 ? (less400 ? "1.75rem":"2.2rem"):"2.75rem";
        para.style.width="100%";
        const img=document.createElement('img');
        img.id="shape-outside-log";
        img.src=this.logo;
        img.alt="www.ablogroom.com"
        img.style.cssText="shape-outside:circle(50%);border-radius:50%;width:175px;aspect-ratio: 1 / 1;filter:drop-shadow(0 0 0.75rem white);box-shadow:1px 1px 12px 1px black;float:left;margin-right:1.25rem;";
        para.appendChild(img);
        para.innerHTML+=" I believe you have made an error on getting to a page. You have accessed the following:";
        para.innerHTML+="try again or use the buttons below to redirect you appropriately."
        parent.appendChild(para);
        const btnGrp=document.createElement("div");
        btnGrp.style.cssText="margin-inline:auto;display:flex;flex-wrap:wrap;align-items:center;gap:1.25rem;"
        const {button:back}=Misc.simpleButton({anchor:btnGrp,type:"button",bg:"black",color:"white",time:500,text:"go back"});
        const {button:home}=Misc.simpleButton({anchor:btnGrp,type:"button",bg:"black",color:"white",time:500,text:"go home"});
        subParent.appendChild(btnGrp);
        Object.values(this.params).map((item,index)=>{
            if(item.key && item.value && index >0){
                para.innerHTML+=`<span style="color:white;font-weight:bold;">${item.key}</span> : <span style="color:white;font-weight:bold;">${item.value}</span> <br/>`;
                if(item.key==="intent"){
                    const {button:intent}=Misc.simpleButton({anchor:btnGrp,type:"button",bg:"black",color:"white",time:500,text:`${item.value}`});
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
        return Promise.resolve({back,home}) as Promise<{back:HTMLButtonElement,home:HTMLButtonElement}>;
    };


    async getUrl(){
        //GETTING PARAMETERS FROM URL
        const url=new URL(window.location.href);
        const params=["blog_id","misc","intent"]
        params.map(key=>{
            if(key){
                const value=url.searchParams.get(key);
                if(value){
                    this._params.push({key,value});
                }
            }
        });

    };


    otherSites(item:{parent:HTMLElement,urls:string[]}){
        const {parent,urls}=item;
        const text=document.createElement("h6");
        text.className="text-center text-primary lean display-6";
        text.textContent="other sites";
        parent.appendChild(text);
        const otherSite=document.createElement("div");
        otherSite.id="otherSite";
       otherSite.style.cssText="margin:auto;width:auto;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:1rem;border-radius:12px;padding:1.25rem;box-shadow:1px 1px 12px 1px rgba(0, 191, 255,0.5);height:40vh;overflow-y:scroll;";
       const ol=document.createElement("ol");
       ol.style.cssText="margin-block:1.5rem;margin-inline:auto;padding-inline:1.5rem;";

       urls.map(site=>{
        const li=document.createElement("li");
        li.textContent=site;
        li.style.cssText="text-decoration:underline;cursor:pointer;";
        li.className="text-primary";
        ol.appendChild(li);
        li.onclick=(e:MouseEvent)=>{
            if(!e) return;
            window.location.replace(site);
        };
       });
       otherSite.appendChild(ol);
       parent.appendChild(otherSite);
    };


    retPage(item: { pathname: string }) {
        const { pathname } = item;
        let rtPage: string = '';
        if (!pathname) return `/error_page?misc=${pathname}`;
        const pages: { id: number, page: string, redir: RegExp, match: RegExp }[] = [
            { id: 0, page: '/az', redir: /\/\w+\//, match: /\// },
            { id: 1, page: '/blog/', redir: /\/(blog)\/\d{2,}\w+/, match: /\/(blog)\/\d+/ },
            { id: 2, page: '/blogs', redir: /\/(blogs)\w+/, match: /\/(blogs)/ },
            { id: 3, page: "/register", redir: /\/(register)\w+/, match: /\/(register)/ },
            { id: 4, page: "/editor", redir: /\/(editor)\w+/, match: /\/(editor)/ },
            { id: 5, page: "/policy", redir: /\/(policy)\w+/, match: /\/(policy)/ },
            { id: 6, page: "/termsOfService", redir: /\/(termsOfService)\w+/, match: /\/(termsOfService)/ },
            { id: 7, page: "/admin", redir: /\/(admin)\w+/, match: /\/(admin)/ },
            { id: 8, page: "/posts", redir: /\/(posts)\w+/, match: /\/(posts)/ },
        ]
        pages.map(page => {
            if (page.match.test(pathname)) {
                if (page.id === 1) {
                    const id = pathname.split("/")[1].split("/")[1];
                    rtPage = `/error_page?blog_id=${id}`
                } else {
                    rtPage = `/error_page?intent=${pathname}`
                }
            } else {
                rtPage = `/error_page?misc=${pathname}`
            }
        });
        return rtPage
    };


    titlePage(item:{parent:HTMLElement}){
        const {parent}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const container=document.createElement("div");
        container.id="titlePage-container";
        container.style.cssText="padding-inline:1rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;text-transform:uppercase;";
        container.style.marginInline=less900 ? (less400 ? "0rem":"0.25rem"):"1rem";
        const title=document.createElement("p");
        title.id="container-title";
        title.style.cssText="color:white;";
        title.className="title-art-one";
        title.textContent="best editor in Canada";
        container.appendChild(title);
        parent.appendChild(container);

    }
}
export default ErrorClass;
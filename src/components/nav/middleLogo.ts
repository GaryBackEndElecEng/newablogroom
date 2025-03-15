import BrowserType from "../common/browserType";


class MiddleLogo {
    public readonly logo:string="/images/gb_logo.png";

    constructor(public browser:BrowserType){
        this.logo="/images/gb_logo.png"
    };



         main({parent}:{parent:HTMLElement}):void{
            //MUST PARENT MUST APPEND CONTAINER OR IT WILL NOT SHOW
            const pathname=window.location.pathname;
            if(pathname !=="/"){

                const repeatCount=2;
                const isRepeat=this.browser.repeatShowControl({repeatCount});
                const less400= window.innerWidth <400;
                const css_col="display:flex;justify-content:center;align-items:center;flex-direction:column;height:45px;";
                const css_row="display:flex;justify-content:center;align-items:center;flex-wrap:nowrap;height:40px;gap:1rem;";
                const container=document.createElement("div");
                container.id="middleLogo-main-container";
                container.style.cssText=css_col + "margin:auto;justify-content:center;height:100%;width:fit-content;align-items:center;";
                container.style.transform=less400 ? "scale(0.8)":"scale(1.0)";
                container.style.gap=less400 ? "0":"1rem";
                this.logoEffect({parent:container,css_col,css_row,less400,isRepeat}).then(async(res)=>{
                    if(res){
                        // if(res.isRepeat){
                            this.ablogroomEffect({parent:res.container,time:res.time,pagename:res.pagename})
                        // }
                    }
                });
               parent.appendChild(container);
            }
            
        };


       async logoEffect({parent,css_col,css_row,less400,isRepeat}:{
        parent:HTMLElement,
        css_col:string,
        css_row:string,
        less400:boolean,
        isRepeat:boolean

       }){
            const time=1500;
            const pagename=window.location.pathname.split("/")[1];

            const container=document.createElement("div");
            container.id="logoEffect-container";
            container.style.cssText=css_row + "z-index:0;position:relative;height:100%;width:fit-content;justify-content:center;align-items:center;gap:0;";
            container.style.transform=less400 ? "scale(0.8)":"scale(1)";
            const img=document.createElement("img");
            img.id="middleLogo-img";
            img.src=this.logo;
            img.alt="www.ablogroom.com";
            img.style.cssText="height:100%;margin:auto;border-radius:inherit;aspect-ratio:1/1;";
            container.appendChild(img);
            parent.appendChild(container);
            img.animate([
                {transform:"rotateY(-90deg)",opacity:"0"},
                {transform:"rotateY(0deg)",opacity:"1"},
            ],{duration:time,iterations:1,"easing":"ease-in-out"});
            return Promise.resolve({parent,container,isRepeat,time,pagename}) as Promise<{parent:HTMLElement,container:HTMLElement,isRepeat:boolean,time:number,pagename:string}>;
        };



        ablogroomEffect({parent,time,pagename}:{parent:HTMLElement,time:number,pagename:string}){
            const word="BLOGROOM";
            const innerTime=time-600;
            const container=document.createElement("div");
            container.id="ablogroomEffect-container";
            container.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:0;color:white;transform:scale(0.9);";
            container.style.opacity="0";
            const para=document.createElement("p");
            para.id="blogroom";
            para.textContent=word;
            para.style.cssText="letter-spacing:-1px;color:white;z-index:20;font-size:140%;line-height:0.15rem;margin-top:1rem;";
            const small=document.createElement("small");
            small.id="pagename";
            small.style.cssText="opacity:0;family-font:Poppins-Thin;font-weight:bold;"
            small.textContent=pagename;
            container.appendChild(para);
            container.appendChild(small);
            parent.appendChild(container);
            setTimeout(()=>{
                container.style.opacity="1";
                container.animate([
                    {transform:"rotateY(-90deg) scale(0.6)",opacity:"0.5",letterSpacing:"0.2rem"},
                    {transform:"rotateY(0deg) scale(0.9)",opacity:"1",letterSpacing:"-1px"},
                ],{duration:time,iterations:1,"easing":"ease-in-out"});
                setTimeout(()=>{
                    small.style.opacity="1";
                    small.animate([
                        {transform:"translateX(-100%)",opacity:"0"},
                        {transform:"translateX(0%)",opacity:"1"},
                    ],{duration:time + innerTime,iterations:1,"easing":"ease-in-out"});
                },innerTime);
            },innerTime);
        }
    
};
export default MiddleLogo;
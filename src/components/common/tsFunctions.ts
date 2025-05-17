"use client";
import Misc from "./misc/misc";
export const baseUrl="http://localhost:3000";
 export const DOMAIN=process.env.DOMAIN ? process.env.DOMAIN : baseUrl;


export type btnReturnType={
    parent:HTMLElement,
    text:string,
    bg:string,
    color:string,
    type:"button" | "submit" | "reset"|undefined,

}
export type btnReturnDisableType={
    parent:HTMLElement,
    text:string,
    bg:string,
    color:string,
    type:"button" | "submit" | "reset"|undefined,
    disable:boolean,

}
export type btnType={
    parent:HTMLElement,
    text:string,
    bg:string,
    color:string,
    type:"button" | "submit" | "reset"|undefined
}
export function button(btnparams:btnType){
    const {parent,text,bg,color,type}=btnparams;
    const btn=document.createElement("button");
    btn.type=type || "button";
    btn.style.cssText=`margin-inline:auto;margin-block:1.5rem;padding-inline:2rem;padding-block:0.5rem;border-radius:20px;color:${color};background:${bg};font-size:10px;`;
    btn.style.color=color;
    btn.textContent=text;
    btn.style.backgroundColor=bg;
    btn.style.border=`1px solid ${color}`;
    parent.appendChild(btn);
    
}

export function buttonReturn(message:btnReturnType):HTMLButtonElement{
    const {parent,text,bg,color,type}=message;
    const btn=document.createElement("button");
    parent.style.textAlign="center";
    btn.type=type || "button";
    btn.style.cssText=`margin-inline:auto;margin-block:1.5rem;padding-inline:1.5rem;padding-block:5px;border-radius:20px;color:${color};background:${bg};font-size:12px;box-shadow:1px 1px 3px 1px white,-1px -1px 3px 1px white;`;
    btn.setAttribute("contenteditable","false");
    btn.style.color=color;
    btn.textContent=text;
    btn.style.backgroundColor=bg;
    btn.onmouseover=()=>{
        btn.animate([
            {transform:"",color:"inherit",backgroundColor:"inherit",boxShadow:"1px 1px 3px 1px white,-1px -1px 3px 1px white"},
            {transform:"",color:"white",backgroundColor:"green",boxShadow:"1px 1px 3px 1px black,-1px -1px 3px 1px black"},
            {transform:"",color:"inherit",backgroundColor:"inherit",boxShadow:"1px 1px 3px 1px white,-1px -1px 3px 1px white"},
        ],{duration:600,iterations:1});
    };
   
    parent.appendChild(btn);
    return btn;
}
export function buttonRetDisable(message:btnReturnDisableType):HTMLButtonElement{
    const {parent,text,bg,color,type,disable}=message;
   
    const btn=document.createElement("button");
    parent.style.textAlign="center";
    btn.type=type || "button";
    btn.style.cssText=`margin-inline:auto;margin-block:1.5rem;padding-inline:1.5rem;padding-block:5px;border-radius:20px;color:${color};background:${bg};font-size:12px;box-shadow:1px 1px 3px 1px ${bg},-1px -1px 3px 1px ${bg};`;
    btn.style.color=color;
    btn.textContent=text;
    btn.style.backgroundColor=bg;
    btn.disabled=disable
    btn.onmouseover=()=>{
        btn.animate([
            {transform:"",color:"inherit",backgroundColor:"inherit"},
            {transform:"",color:"white",backgroundColor:"green"},
            {transform:"",color:"inherit",backgroundColor:"inherit"},
        ],{duration:600,iterations:1});
    };
    btn.addEventListener("click",(e:MouseEvent)=>{
        if(e){
            if(btn.disabled){
                Misc.message({parent:parent,msg:"please select",type_:"error",time:400})
            }
        }
    });
   
    parent.appendChild(btn);
    return btn;
}
export function smallbtnReturn(message:btnReturnType):HTMLButtonElement{
    const {parent,text,bg,color,type}=message;
    const btn=document.createElement("button");
    btn.type=type || "button";
    btn.style.cssText=`margin-inline:auto;margin-block:3px;padding-inline:1.5rem;padding-block:5px;border-radius:20px;color:${color};background:${bg};font-size:12px;box-shadow:1px 1px 3px 1px ${bg},-1px -1px 3px 1px ${bg};`;
    btn.style.color=color;
    btn.textContent=text;
    btn.style.backgroundColor=bg;
    btn.onmouseover=()=>{
        btn.animate([
            {transform:"scale(1)",color:"inherit",backgroundColor:"inherit"},
            {transform:"scale(1.008)",color:"white",backgroundColor:"green"},
        ],{duration:600,iterations:1});
    };
    btn.onmouseout=()=>{
        btn.animate([
            {transform:"scale(1.008)",color:"white",backgroundColor:"green"},
            {transform:"scale(1)",color:"inherit",backgroundColor:"inherit"},
        ],{duration:600,iterations:1});
    };
    parent.appendChild(btn);
    return btn;
}
export  function imageLoader({ src, width, quality }) {
    const test_1:RegExp=/(\/(images)\/[a-zA-Z0-9/_-]+.(png)|(jpg)|(JPG))/;
    const test_2:RegExp=/(https:\/\/)\w+^(?!.amazonaws)/;
    const test_3:RegExp=/(https:\/\/newablogroom-free-bucket)/;
    const test_4:RegExp=/[a-zA-Z0-9/_-]+.(png)|(jpg)|(JPG)^(?!.amazonaws)/;
    const check=[
        {name:"local",test:test_1.test(src)},
        {name:"general",test:test_2.test(src)},
        {name:"free",test:test_3.test(src)},
        {name:"src",test:test_4.test(src)},
    ].find(kv=>(kv.test));
    if(check){
        if((check.name ==="general")){
            const url=new URL(src);
            url.searchParams.set("w",width.toString());
            url.searchParams.set("q",(quality || 75).toString());
            return url.href;
        }else if(check.name==="free"){
            const url= new URL(src);
            url.searchParams.set('format', 'auto')
            url.searchParams.set('width', width.toString())
            url.searchParams.set('quality', (quality || 75).toString());
            return url.href;
        }else if(check.name==="src"){
            const append=`/images/${src}`;
            const url=new URL(append,window.location.origin);
            url.searchParams.set("w",width.toString());
            url.searchParams.set("q",(quality || 75).toString());
            return url.href;
        }else{
            //local
            const url=new URL(src,window.location.origin);
            url.searchParams.set("w",width.toString());
            url.searchParams.set("q",(quality || 75).toString());
            return url.href;
        };
    }else{
        return src;
    };
  };

export  function httpImageLoader(item:{ src:string, width:number, quality:number }) {
    const {src,width,quality}=item;
    const url=new URL(src);
    url.searchParams.set("w",width.toString());
    url.searchParams.set("q",(quality || 75).toString());
    return url.href
  }
export  function AWSImageLoader(item:{ url:string, width:number, quality:number }) {
    //THIS DOES NOT WORK WITH SIGNED IMAGES!!!=> IT RETURS ONLY THE FILE NAME AND NOT THE HTTPS://URL REQUIRED, GIVEN A MANIPULATION OF THE URL;
    const {url,width,quality}=item;
    const url_ = new URL(url)
    url_.searchParams.set('format', 'auto')
    url_.searchParams.set('width', width.toString())
    url_.searchParams.set('quality', (quality || 75).toString())
    return url_.href
  }
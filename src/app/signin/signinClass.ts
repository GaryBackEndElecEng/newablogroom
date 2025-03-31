
import Service from "@/components/common/services";
import ModSelector from "@/components/editor/modSelector";
import { providerType } from "@/components/editor/Types";
import RegSignIn from "@/components/nav/regSignin";
import User from "@/components/user/userMain";
import { getCsrfToken, getProviders } from "next-auth/react";
import Register from "../register/register";
import Misc from "@/components/common/misc";
import Header from "@/components/editor/header";


class SigninClass{
    public readonly msg:string=Register.msg;
    public readonly logo:string="./images/gb_logo.png";
    public readonly navHeader:HTMLElement|null=document.querySelector("header#navHeader");
    regSignin:RegSignIn;
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private regSignIn:RegSignIn){
        this.navHeader=document.querySelector("header#navHeader");
        this.msg=Register.msg;
    };



   async main({parent,count}:{parent:HTMLElement,count:number}){
    const less900=window.innerWidth < 900;
    const less400=window.innerWidth < 400;
    const css_col="display:flex;justify-content:center;align-items:center;flex-direction:column;";
    const css_row="display:flex;align-items:center;flex-wrap:wrap;";
    parent.style.cssText=css_col + "min-height:100vh;background-color:#f0f1eb57;border-radius:12px;box-shadow:1px 1px 12px 1px black;position:relative;gap:2.5rem;";
    parent.style.padding=less900 ? (less400 ? "10px":"2.5rem"):"5rem";
    this.logoContainer({parent,css_col,css_row,less900,less400});
    const container=document.createElement("section");
    container.id="signIn-container";
    container.style.cssText="margin:auto;border-radius:inherit;padding-block:1rem;position:relative";
    container.style.paddingInline=less900 ? (less400 ? "0rem":"7rem"):"10rem";
    container.style.width=less400 ? "100%":"auto";
    container.style.backgroundColor="black";
    parent.appendChild(container);
    const csrfToken= await getCsrfToken();
    const providers= await getProviders() as unknown as providerType[];
    this.regSignIn.signiMain(container,providers,csrfToken);
    container.style.position="relative";
    container.animate([
        {transform:"rotateY(-90deg)",opacity:"0"},
        {transform:"rotateY(0deg)",opacity:"1"},
    ],{duration:2000,iterations:1,"easing":"ease-in-out"});
        return Promise.resolve({parent,count:count+1}) as Promise<{parent:HTMLElement,count:number}>;

    };


    logoContainer({parent,css_row,css_col,less900,less400}:{parent:HTMLElement,css_row:string,css_col:string,less900:boolean,less400:boolean}){
        const container=document.createElement("div");
        const imgWidth=less900 ? (less400 ? "200px":"150px"): "175px";
        container.id="logoContainer";
        container.style.cssText=css_row + "width:100%;background-color:black;color:white;min-height:20vh;border-radius:inherit;margin-inline:auto;justify-content:stretch;";
        container.style.paddingInline=less900 ? (less400 ? "0rem":"3rem"):"5rem";
        container.style.paddingBlock=less900 ? (less400 ? "1rem":"1.5rem"):"2rem";
        container.style.gap=less400 ? "3rem":"0rem";
        container.style.flexDirection=less400 ? "column":"row";
        container.style.flexWrap="nowrap";
        container.style.height=less900 ? (less400 ? "55vh":"30vh"):"23vh";
        parent.appendChild(container);
        const img=document.createElement("img");
        img.src=this.logo;
        img.style.cssText=`width:${imgWidth};border-radius:20%;filter:drop-shadow(0 0 0.75rem white);border:none;`;
        container.appendChild(img);
        const text=document.createElement("p");
        text.style.cssText="text-wrap:pretty;color:white;";
        text.style.flex=less900 ? (less400 ? "1 0 100%":"1 0 50%"):"1 0 70%";
        text.style.paddingInline=less900 ? (less400 ? "1rem":"0.5rem"):"1.5rem";
        parent.appendChild(container);
        container.animate([
            {transform:"rotateX(-180deg)",opacity:"0"},
            {transform:"rotateX(0deg)",opacity:"1"},
        ],{duration:3000,iterations:1,"easing":"ease-in-out"});
        setTimeout(()=>{
            text.textContent=this.msg;
            container.appendChild(text);
            text.animate([
                {lineHeight:"0",opacity:"0"},
                {lineHeight:"auto",opacity:"1"},
            ],{duration:1600,iterations:1,"easing":"ease-in-out"});
        },3000);

    };

    textEffect({target,str,time}:{target:HTMLElement,str:string,time:number}){
        let count=0;
        target.style.position="relative";
        const arr=str.split(" ");
        const len=arr.length;
        const clear=setInterval(()=>{
            if(count<=len-1){
                Header.cleanUp(target);
                const phrase=arr.slice(0,count-1).join(" ");
                const word=arr[count];
                const span=document.createElement("span");
                span.textContent=` ${word}`;
                const spanMain=document.createElement("span");
                spanMain.textContent=phrase;
                target.appendChild(spanMain);
                span.animate([
                    {letterSpacing:"0.5rem"},
                    {letterSpacing:"auto"},
                ],{duration:time*0.75,iterations:1,"easing":"ease-in-out"})
                target.appendChild(span);
                count++;
            }else{
                clearInterval(clear);
                target.textContent=str;
            }
        },time);
    }

}
export default SigninClass;
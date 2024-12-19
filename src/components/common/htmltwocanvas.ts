
import { getErrorMessage } from "@/lib/errorBoundaries";
import { canvasType, quoteimgType, signupQuoteType, userType } from "../editor/Types";
import Misc from "./misc";
import Service from "./services";
import html2canvas from "html2canvas";



class Htmltwocanvas{
    blob:Blob;
    option_init:canvasType={
        backgroundColor:null,
        // backgroundColor:"#ffffff",null=transparent
        width:900,
        height:1800,
        x:0,
        foreignObjectRendering:false,
        scale:2,
        proxy:"masterultils-postimages.s3.us-east-1.amazonaws.com,newablogroom-free-bucket.s3.us-east-1.amazonaws.com",
        logging:true,
        allowTaint:false,
        useCORS:false,
        }
    option:canvasType;

    constructor(private _service:Service){
        this.option=this.option_init;
        this.blob={} as Blob;
    }

    imageQuote(item:{target:HTMLElement,user:userType|null,button:HTMLButtonElement}){
        // THIS CONVERTS THE QUOTE TO AN IMAGE AND THEN UPLOADS THE IMAGE TO AWS UNDER FOLDER NAME: QUOTE, THEN SAVES THE QUOTE, ATTACHED TO USER ACCOUNT
        const {target,user,button}=item;
        const element=document.getElementById(target.id);
        if(!element) return;
        const height=parseInt(window.getComputedStyle(element).getPropertyValue("height").split("px")[0]) as number;
        const width=parseInt(window.getComputedStyle(element).getPropertyValue("width").split("px")[0]) as number;
        const area=target.getBoundingClientRect();
        console.log("USER",user)
        this.option={...this.option,
            width,
            height:height + 100,
        }
        if(user && user.email){
            html2canvas(target,this.option).then(canvas=>{
                //converting to base64 url string
                button.style.display="block";
                 canvas.toBlob(async(blob)=>{
                    if(blob){
                        this.blob=blob 
                        const name=user.name ? user.name.split(" ").join("") :"quote";
                        const file= new File([blob],name,{type:"image/png"});//converting blob to file
                        // this.file=URL.createObjectURL(blob)
                        const formdata=new FormData();
                        formdata.append("file",file);
                        const {Key}=this._service.generateQuoteKey({formdata,user}) as {Key:string};
                        formdata.append("Key",Key);
                        // console.log(formdata.get("Key"))//works
                        // console.log(formdata.get("file"))//works
                        if(blob && Key){
                           await this._service.putQuoteimg({formdata}).then(async(res)=>{
                                if(res){
                                    if(user && user.id){
                                        //if register user
                                        const quoteKey=res.Key;
                                        const quoteimgParams:quoteimgType={user_id:user.id,email:user.email,name:user.name ? user.name : "no user name",quoteKey:Key}
                                        this._service.postQuoteimg({quoteimgParams}).then(async(res)=>{
                                            if(res){
                                                const msg=`thank you ${user.name} for this quote. We sent pdf to your email. click on the print btn, below to PDF a copy.`
                                                Misc.message({parent:target,msg,type_:"success",time:2000});
                                            }
                                        });
                                    }else{
                                        // save email=> sign-up
                                        const name=user.name ? user.name:"no-name";
                                        const email=user.email;
                                        const signUp:signupQuoteType={name,email,imgKey:Key}
                                        this._service.signup({signupquote:signUp}).then(async(res)=>{
                                            if(res){
                                                const msg=`thank you ${name} for this quote. We sent pdf to your email. click on the print btn, below to PDF a copy.`
                                                Misc.message({parent:target,msg,type_:"success",time:2000});
                                            }
                                        });
                                    }
                                }else{
                                    Misc.message({parent:target,msg:"there is no file",type_:"error",time:1200});
                                    console.log(this.blob)
                                }
                            }).catch((err)=>{const msg=getErrorMessage(err);Misc.message({parent:target,msg,time:5000,type_:"error"});});
                        }else{
                            if(!blob){
                                Misc.message({parent:target,type_:"error",time:1200,msg:"There is no BLOB"});
                            }else{
                                Misc.message({parent:target,type_:"error",time:1200,msg:"There is no KEY"});
                            }
                        }
                    }
                },"image/png",0.95,);
                // const anchor=document.createElement("a");
                // anchor.href=file;
                // anchor.download=`${"quote"}.png`;
                // document.body.appendChild(anchor);
                // anchor.click();
                // document.body.removeChild(anchor);
                // setTimeout(()=>{
                   
                // },700);
            });
        }
       
    }
   
    
}
export default Htmltwocanvas;
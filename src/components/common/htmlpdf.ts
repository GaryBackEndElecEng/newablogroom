import ModSelector from "../editor/modSelector";
import { blogType, pdfOptionType } from "../editor/Types";
import Service from "./services";
import html2canvas from "html2canvas";
// import { promises as fs } from 'fs';//used for server to convert a file, from webServer to pdf
// import { html2pdf } from 'html2pdf-ts';//used for server to convert a file, from webServer to pdf
// import { HTML2PDFOptions } from 'html2pdf-ts';//used for server to convert a file, from webServer to pdf
import html2pdf from "html2pdf.js";


class Htmlpdf{
    pdfOption:pdfOptionType;
    _html2pdf:any;
    pdfInitOption:pdfOptionType={
        filename:"blog.pdf",
        image:{type:"jpg",quality:0.85},
        html2canvas:{
            scale:2,
            logging:true,
            letterRendering:true,
            useCORS:false,
            height:0,
            width:0,
            foreignObjectRendering:false,
            windowWidth:window.innerWidth,

        },
        jsPDF:{
            unit:"in",
            format:"letter",
            orientation:"portrait"
        }
    };
    constructor(private _modSelector:ModSelector,private _service:Service){
        this.pdfOption=this.pdfInitOption
        this._html2pdf=html2pdf;
    }

    main(item:{target:HTMLElement,blog:blogType}){
        const {target,blog}=item;
        const height=parseInt(window.getComputedStyle(target).getPropertyValue("height").split("px")[0]) as number;
        const width=parseInt(window.getComputedStyle(target).getPropertyValue("width").split("px")[0]) as number;
        this.pdfOption={...this.pdfOption,
            html2canvas:{...this.pdfOption.html2canvas,width,height:height + 800},
            jsPDF:{...this.pdfOption.jsPDF,width:width as number,height:1090}
        }
        // this._html2pdf(target).toPdf()
        // this._html2pdf(target).set(this.pdfOption).toPdf().save(); // get target
        this._html2pdf().set(this.pdfOption).from(target).toPdf().save(); // get target
    }
    usehtmlpdf(item:{target:HTMLElement,blog:blogType}){
        const {target,blog}=item;
        const height=parseInt(window.getComputedStyle(target).getPropertyValue("height").split("px")[0]) as number;
        const width=parseInt(window.getComputedStyle(target).getPropertyValue("width").split("px")[0]) as number;
        this.pdfOption={...this.pdfOption,
            html2canvas:{...this.pdfOption.html2canvas,width,height:height + 800},
            jsPDF:{...this.pdfOption.jsPDF,width:width as number,height:1090}
        }
        // this._html2pdf(target).toPdf()
        // this._html2pdf(target).set(this.pdfOption).toPdf().save(); // get target
        this._html2pdf().set(this.pdfOption).from(target).toPdf().save(); // get target
    }
    //NOT USING BELOW
    async htmlTwoCanvassPDF(parent:HTMLElement,blog:blogType){
        const getFinalWork=document.querySelector("div#blog-work") as HTMLElement;
       if(!getFinalWork) return;
            const getBase=window.getComputedStyle(getFinalWork);
            const getWidth=parseInt(getBase.getPropertyValue("width").split("px")[0]);
            const getHeight=parseInt(getBase.getPropertyValue("height").split("px")[0]);
            const margin=16;
            const area=parent.getBoundingClientRect();
            const scale =2;
            // const scale =(getWidth + margin*2) / getWidth;
            window.scroll(0,0);
            //PROBLEM IS FORMATTING!!- WIDTH!! FIND THE MAXIMUM WIDTH BEFORE SCREWING UP WITH BLACK
            html2canvas(getFinalWork,{
                backgroundColor:null,
                // backgroundColor:"#ffffff",
                width: (area.width + margin),
                // width:getWindowWidth + margin,
                height:(area.height + margin*2),
                // height:getWindowHeight + margin*3,
                x:margin/2,
                scrollY:0,
                scrollX:0,
                foreignObjectRendering:false,
                scale,
                imageTimeout:3000,
                "proxy":"masterultils-postimages.s3.us-east-1.amazonaws.com",
                "logging":false,
                allowTaint:false,
                useCORS:true,
                
            }).then(canvas=>{
                //converting to base64 url string
                // canvas.style.marginInline="auto";
                canvas.style.width=`${getWidth}px`;
                canvas.style.height=`${getHeight}px`;
                canvas.style.paddingInline=`${margin *2}px`;
                canvas.style.backgroundColor=`inherit`;
                const imgData=canvas.toDataURL("image/png");
                const anchor=document.createElement("a");
                anchor.href=imgData;
                anchor.download=`${blog.name}.png`;
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
                setTimeout(()=>{
                    parent.style.height="auto";
                    parent.style.overflowY="auto";
                },700);
            });
        
    
    }
    
}
export default Htmlpdf;
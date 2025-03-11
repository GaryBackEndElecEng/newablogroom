import Header from "../editor/header";
import ModSelector from "../editor/modSelector";
import { introDescType,slideType } from "../editor/Types";
import Nav from "../nav/headerNav";
import Misc from "./misc";
import Service from "./services";


class Intro{
    introDesc:introDescType[]=[
        {id:0,desc:"Provides you with Themes, a means of creating New Blogs, edit your work with ease, refresh your work with one click and edit your Blog/ website for interests",slide:[
            {name:"Themes",expOne:"It allows you to set their blog/web-site theme",expTwo:"You can set background image, background shading,font type themes,text-color and button colors"},
        {name:"New Blog",expOne:"It allows you create your new blog or website description",expTwo:"You can set a file name and give it a description to attract increased viewer-ship"},
        {name:"Edit Work",expOne:"It allows you to view and edit, with ease all your blogs in really time.",expTwo:"Once, signed in, a list of all you blogs will be revealed for viewing ease and editing."},
        {name:"refresh",expOne:"It allows you to refresh the page without using page refresh.",expTwo:""},
        {name:"Edit Meta",expOne:"It allows you to edit your blog description and upload an image representing your blog.",expTwo:"You can upload an image of modify your description in realtime."},
        ]
        },
        {id:1,desc:"Allows you to Save your work securly, Re-order you work with ease, and choose a header that suits your interests.",slide:[
            {name:"Save Work",expOne:"It allows you to save your work",expTwo:"all images are signed and secure with an expiration time of one hour,afterwards the images will be disaalowed for viewing. if you want viewing upload time, then please email us."},
            {name:"Re-order",expOne:"It allows you organize your blog without cut-paste",expTwo:"It gives you a order number that places your items in order during blog or web-site editing / creation."},
            {name:"Header Selector",expOne:"It allows you to select pre-set headers of your choice.",expTwo:"Headers comes with over 36 options for element insertion and or customaization provided by a drop-drop list."},
        ]
        },
        {id:2,desc:"Gives you a vast array of options to choose from, build a Customizeable header, emphasize text with an image, generate code on the go for display purposes, Create footers,and choose a grid-work-block that suits your display intent.",slide:[
            {name:"feature List",expOne:"This gives you a minumum of 10 options you can choose from",expTwo:"Divider:gives you pretty divider design, Separator: gives you a simple divider line, Design: gives you a unique art design,Arrow-Design: gives you an arrow design for text emphasism, Clean-Text: cleans text copied from the net, VenDiagram: provides a customizable ven-diagram,Wave-Art: gives you customizable wave art,Arch-Art: provides a customizable unique design tool for text emphasism,Title-Art: provides a selection of text-design for text emphasism and Add-Fill: provides a mean of filling a text area with text fill during web-site/Blog design."},
            {name:"Customize-Header",expOne:"It allows you to really customize your header to your needs.",expTwo:"Their are over 37 drop-down options for you to help you design your header."},
            {name:"Image-text-merger",expOne:"provides you with a way to emphasize your description with an image.",expTwo:"You have a choice of three image shape design; circle,square and polygon where text is wrapped around the image. A drop-down is provided to accentuate the para-image to your delight."},
            {name:"Generate code",expOne:"provides you a creative way to add code to your blog.",expTwo:"The options are Jave, Python, HTML or JSON"},
            {name:"Generate Footer",expOne:"provides you a customizable footer creation.",expTwo:"Once, initiated, options or row number, column number with  30 option drop-down list to choose from for customization."},
        ]
        },
        {id:3,desc:"Toolbar that provides more options than most of all editors to accentuate your point.",slide:[
            {name:"Font-Size",expOne:"Reatltime adjust all text",expTwo:null},
            {name:"Bold",expOne:"Bolds your text",expTwo:null},
            {name:"Italic",expOne:"italics all text",expTwo:null},
            {name:"underline",expOne:"underlines text",expTwo:null},
            {name:"Center",expOne:"centers text",expTwo:null},
            {name:"Left-Align",expOne:"floats text left",expTwo:null},
            {name:"Right-align",expOne:"floats text right",expTwo:null},
            {name:"Quote",expOne:"gives Quote ID to text",expTwo:null},
            {name:"UpperCase",expOne:"upper case first letter of a word",expTwo:null},
            {name:"List",expOne:"creates an un-ordered or ordered list",expTwo:null},
            {name:"Text Color",expOne:"allows you to color your text",expTwo:null},
            {name:"Paragraph",expOne:"creates a paragraph and adds it to your blog / web-site",expTwo:null},
            {name:"Upload Image",expOne:"allows a means to add an image to the main page",expTwo:null},
            {name:"Background-shading",expOne:"provides background shading to text",expTwo:null},
            {name:"Dynamic-Shadow-Effect",expOne:"adds 3-background shadow to text",expTwo:null},
            {name:"text-line-height",expOne:"adjusts line-height to a pargraph",expTwo:null},
            {name:"Title-Text",expOne:"main Title Text",expTwo:null},
            {name:"Subtitle",expOne:"sub-title text",expTwo:null},
            {name:"Sub-subtitle",expOne:"Sub--sib-title text",expTwo:null},
            {name:"Final",expOne:"Allows  you to view, print and or save you work",expTwo:null},
            {name:"Section-Title",expOne:"Section title (h3)",expTwo:null},
            {name:"Small-Title",expOne:"sub section title",expTwo:null},
            {name:"Text-Column-Creator",expOne:"creates two, three or four columns",expTwo:null},
            {name:"Link-Creator",expOne:"creates a link",expTwo:null},
            {name:"Date-Creator",expOne:"creates a dynamic date-time",expTwo:null},
            {name:"Font-Family",expOne:"target changes font-type to an active text",expTwo:null},
        ]
        },
    ];
    imgInstructArr:{id:number,name:string,title:string,intro:introDescType,img:string}[]=[
        {id:0,name:"sidebar-part-one",title:"title-one",intro:this.introDesc[0],img:"./images/instruction/sidebarOne.png"},
        {id:1,name:"sidebar-part-two",title:"title-two",intro:this.introDesc[1],img:"./images/instruction/sidebarTwo.png"},
        {id:2,name:"sidebar-part-three",title:"title-three",intro:this.introDesc[2],img:"./images/instruction/sidebarThree.png"},
        {id:3,name:"toolbar",title:"title-four",intro:this.introDesc[3],img:"./images/instruction/toolBar.png"},
    ];
    msg:string;
  
    constructor(private _modSelector:ModSelector,private _service:Service){
        this.msg="sorry. the introductory display, opens on screen that are larger than 920px wide. The reason is"
    }
   

    viewInstruction(parent:HTMLElement){
        const less920=window.innerWidth < 920 ;
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.id="viewInstruction-main";
        popup.style.cssText="position:absolute;min-height:30vh;background:white;border-radius:20px;box-shadow:1px 1px 12px 1px black;display:flex;flex-direction:column;align-items:center:gap:2rem;;justify-content:center;z-index:200;padding-block:2rem;width:100%;";
        popup.style.alignItems="center";
        popup.style.gap="2rem";
        const innerPopup=document.createElement("div");
        innerPopup.style.cssText="margin:auto;position:relative;display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:center;z-index:200;width:100%;";
        popup.appendChild(innerPopup);
   
            //INTRO-EXPLAINED OPENS IF WIDTH >920
            const explain=document.createElement("div");
            explain.id="explain";
            explain.style.cssText="flex:1 1 25%;display:flex;align-items:center;flex-direction:column;width:25%;position:relative;padding-inline:1rem;";
            explain.style.opacity="0";
            const titleOne=document.createElement("h6");
            titleOne.className="text-center text-primary lean display-6 my-2 text-decoration-underline";
            titleOne.textContent=" title one";
            explain.appendChild(titleOne);
           
            const titleTwo=document.createElement("p");
            titleTwo.className="text-center text-primary my-2";
            titleTwo.style.fontSize="130%";
            titleTwo.style.textWrap="nowrap";
            titleTwo.textContent="This is a title to be displayed";
            explain.appendChild(titleTwo);
            const desc=document.createElement("p");
            desc.style.cssText="margin-inline:auto;padding-inline:1rem;line-height:1.9rem;text-wrap:pretty;";
            desc.textContent="";
            explain.appendChild(desc);
            innerPopup.appendChild(explain);
            //explain
            //slider
            const row=document.createElement("div");
            row.className="";
            row.style.cssText=`max-width:800px;align-items:center;display:flex;flex-wrap:nowrap;height:auto;overflow-x:scroll;position:relative;`;
            row.style.scrollSnapType="x mandatory";
            this.imgInstructArr.map(item=>{
                if(item){
                    
                    const col=document.createElement("div");
                    col.id=item.name;
                    col.style.cssText=`margin:auto;display:flex;justify-content:center;align-items:center;flex-direction:column;position:relative;height:auto;flex:1 0 100% !important;`;
                    col.style.scrollSnapAlign="center";
                    col.style.scrollSnapStop="always";
                    const para=document.createElement("p");
                    para.style.cssText="margin-inline:auto;margin-block:0px;padding-block:2rem;";
                    para.textContent=item.name;
                    col.appendChild(para);
                    const img=document.createElement("img");
                    img.src=item.img;
                    img.alt=item.name;
                    img.style.cssText=`width:100%`;
                    col.appendChild(img);
                    row.appendChild(col);
                    col.onmouseover=(e:Event)=>{
                        if(e){
                            titleOne.textContent=item.name;
                            titleTwo.textContent=item.title;
                            desc.innerHTML=item.intro.desc;
                            this.createIntroDesc(col,explain,item.intro.slide,less920);
                            explain.style.opacity="1";
                            Misc.blurIn({anchor:explain,blur:"20px",time:700});
                        }
                    };
                }
            });
            innerPopup.appendChild(row);
            //slider
            parent.appendChild(popup);
            Misc.matchMedia({parent:explain,maxWidth:900,cssStyle:{flex:"1 1 100%",width:"100%",paddingInline:"0.75rem"}});
            Misc.matchMedia({parent:innerPopup,maxWidth:900,cssStyle:{flexDirection:"column"}});
            Misc.matchMedia({parent:row,maxWidth:900,cssStyle:{flex:"1 1 100%",width:"100%",maxWidth:"800px"}});
            Misc.fadeIn({anchor:popup,xpos:100,ypos:100,time:400});
        
        const {button}=Misc.simpleButton({anchor:popup,bg:Nav.btnColor,color:"white",type:"button",time:400,text:"close"});
        button.style.maxWidth="200px";
        button.onclick=(e:MouseEvent) =>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{parent.removeChild(popup)},398);
            }
        };
        
        

    }
    createIntroDesc(col:HTMLElement,explain:HTMLElement,slide:slideType[],less920:boolean){
        col.style.position="relative";
        const height= less920 ? "40vh":"auto";
        const overflow=less920 ? "scroll":"auto";
        Header.cleanUpByID(explain,"createIntroDesc");
        const container=document.createElement("div");
        container.id="createIntroDesc";
        container.style.cssText=`width:100%;height:${height};overflow:${overflow};box-shadow:1px 1px 12px 1px lightgrey;margin:0px;padding-inline:10px;`;
        const ul=document.createElement("ul");
        ul.style.cssText="height:40vh;overflow-y:scroll;box-shadow:1px 1px 12px 1px lightblue;padding-block:2rem;display:flex;flex-direction:column;"
        slide.map((item)=>{
            const color=Misc.blueShades.find(obj=>(obj.name==="royal blue"));
            const text=document.createElement("span");
            text.style.cssText="color:red;font-weight:bold;text-decoration:underline;text-underline-offset:0.75rem;margin-bottom:1.25rem;";
            text.textContent=item.name;
            ul.appendChild(text);
            const li=document.createElement("li");
            li.innerHTML=item.expOne;
            if(color){
                li.style.color=color.value;
            }else{
                li.classList.add("text-primary");
            }
            ul.appendChild(li);
            if(!item.expTwo) return;
            const liTwo=document.createElement("li");
            liTwo.innerHTML=item.expTwo;
            liTwo.classList.add("text-primary");
            ul.appendChild(liTwo);
        });
        container.appendChild(ul);
        explain.appendChild(container);
        Misc.matchMedia({parent:ul,maxWidth:900,cssStyle:{height:"auto",overflowY:"auto"}});
    }
}
export default Intro;
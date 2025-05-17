import { getErrorMessage } from "@/lib/errorBoundaries";
import { firstTimeType, pointType } from "../editor/Types";
import Misc from "./misc/misc";
import { imageLoader } from "./tsFunctions";


class FirstTimeIntro{
    public readonly points:pointType[];
    public readonly firstTimeSlides:firstTimeType[];
    constructor(){
        this.points=[
            {id:"whoWeAre",name:"editors",point:"Dataset:dataset tracking references"},
            {id:"whoWeAre",name:"editors",point:"Dynamic Styling"},
            {id:"whoWeAre",name:"editors",point:"Data Conservation:Data preservation using Typescript"},
            {id:"whoWeAre",name:"general",point:"injection: class injection constructs"},
            {id:"whoWeAre",name:"general",point:"Custom Forms: specialized forms"},
            {id:"whoWeAre",name:"general",point:"TypeScript"},
            {id:"whoWeAre",name:"general",point:"DB development"},
            {id:"whoWeAre",name:"general",point:"Front: Front End development"},
            {id:"overview",name:"overview",point:"Design: Ven Diagrams"},
            {id:"overview",name:"overview",point:"Design: Title Art"},
            {id:"overview",name:"overview",point:"Design: Flex-box"},
            {id:"overview",name:"overview",point:"Design: Headers"},
            {id:"overview",name:"overview",point:"Design: Footers"},
            {id:"overview",name:"overview",point:"Target Image Injector"},
            {id:"overview",name:"overview",point:"Signed-Signatures: image protection Signed Signatures"},
            {id:"overview",name:"overview",point:"Toolbar Design:Dynamic Toolbar Creation"},
            {id:"overview",name:"overview",point:"...so much more"},
            {id:"sidebar",name:"sidebar",point:"Themes: themes for the overall page-theme look && preferences;"},
            {id:"sidebar",name:"sidebar",point:"New Blog: generate a new Blog or Website;"},
            {id:"sidebar",name:"sidebar",point:"Edit Work: generate a list of your work in progress as well as your finished project. All blogs/sites are editable on the fly;"},
            {id:"sidebar",name:"sidebar",point:"Edit Meta:It allows you to edit/modify your blog's Meta description, with customizable tools;"},
            {id:"sidebar",name:"sidebar",point:"Refresh Page:It allows you to refresh your page quickly;"},
            {id:"sidebar2",name:"sidebar - cont",point:"Save Work: Allows you to quickly save your work in on click;"},
            {id:"sidebar2",name:"sidebar - cont",point:"Re-order: re-orders your blog with ease, without doing a cut and paste;"},
            {id:"sidebar2",name:"sidebar - cont",point:"Header Selector: Allows you to choose from custom Header design types;"},
            {id:"sidebar3",name:"sidebar-cont",point:"Feature-list: houses very specialized customizable tools to choose from - eleven tools/design features to use;"},
            {id:"sidebar3",name:"sidebar-cont",point:"Custom Headers: it allows you to make your own header, from scatch;"},
            {id:"sidebar3",name:"sidebar-cont",point:"Generate Code: it allows a developer to past code into a template for display purposes;"},
            {id:"sidebar3",name:"sidebar-cont",point:"Text-Image-Merger:It gives the designer a template for showcasing an image with text following the contour of the shape image. Its real name is called shape-outside image merger;"},
            {id:"sidebar3",name:"sidebar-cont",point:"Generate Footer: In one click a footer, with options is selected in furtherance of driving an idea to home;"},
            {id:"sidebar3",name:"sidebar-cont",point:"Flex-box: It gives you a choice to choose a grid-type for the desired layout;"},
            {id:"toolbar",name:"toolbar",point:"General: Bold"},
            {id:"toolbar",name:"toolbar",point:"General: Italic"},
            {id:"toolbar",name:"toolbar",point:"General: left,right && center margin"},
            {id:"toolbar",name:"toolbar",point:"General: Uppercase,text-color,Image loader"},
            {id:"toolbar",name:"toolbar",point:"Generic Elements: all known and common text/HTML elements"},
            {id:"toolbar",name:"toolbar",point:"Style manipulation: All common text Styling applications"},
            {id:"toolbar",name:"toolbar",point:"additional: text-image-merger,link,date,email && telephone inserter"},
            {id:"toolbar",name:"toolbar",point:"additional: shadow,text size,background,column and line-height creators"},
            {id:"toolbar",name:"toolbar",point:"lastly,shadow effect,as well as family-font creator."},
            {id:"profile",name:"profile",point:"Personal: personal Info Editor board;"},
            {id:"profile",name:"profile",point:"Personal: password/email changer board;"},
            {id:"profile",name:"profile",point:"Personal: client messaging board;"},
            {id:"profile",name:"profile",point:"Personal: Post editor/creator board,and finally;"},
            {id:"profile",name:"profile",point:"Personal: Quote Viewer board"},
            {id:"profile",name:"intro",point:"all known and common text/HTML elements"},
            {id:"profileServices",name:"intro",point:"point one"},
            {id:"meta",name:"meta",point:"Metadata: blog keywords dynamic updates"},
            {id:"meta",name:"meta",point:"Metadata: blog description dynamic updates"},
            {id:"meta",name:"meta",point:"Metadata: author dynamic updates"},
            {id:"meta",name:"meta",point:"Metadata: dynamic link and image updates"},
            {id:"services",name:"services",point:" DataFlow: The diagram reflects the sites dataflow to maintain security as well as data preservation. for additional information, please do not hesitate to message us and thank-you for joining our community."},
        ];
        this.firstTimeSlides=[
            {id:0,name:"who We Are",desc: "<span style=text-indent:0.75rem;> Welcome to Ablogroom.com. Before we explain the features to the <span class='text-primary'>Best blog in Canada</span>, we would like to introduce ourselves to you.</span><br/><span style=text-indent:0.75rem;> To start, we are a young and upcomming web-development company unifying backend and front end of integrated web designs for business designs using secure encrypted techniques in the aim to satisfy the our clients needs.We've been doing this for 5-years and specialized in the following:</span>",image:"/images/thankYou.png",points:this.points.filter(par=>(par.id==="whoWeAre"))},
            {id:1,name:"overview",desc: "Welcome to the Editor Page - A True Editor. The Ablogroom Editor is a blog/Web-site/post editor with specialized customizable features that no other blog editor has, such as:",image:"/images/gb_logo_768x1025.png",points:this.points.filter(par=>(par.id==="overview"))},
            {id:2,name:"sidebar",desc: " The left Panel represents the Sidebar - The toolBox of features to use. The Sidebar houses all easy accessible features for you to dabble in. Starting from the top, items are:.",image:"/images/instruction/sidebarOne.png",points:this.points.filter(par=>(par.id==="sidebar"))},
            {id:3,name:"sidebar-cont",desc: " Continue,,,the sidebar's mid-section consists of:",image:"/images/instruction/sidebarTwo.png",points:this.points.filter(par=>(par.id==="sidebar2"))},
            {id:4,name:"sidebar-cont",desc: " Continue,,,the sidebar's lower-section consists of:",image:"/images/instruction/sidebarThree.png",points:this.points.filter(par=>(par.id==="sidebar3"))},
            {id:5,name:"toolbar",desc: "There are two toolbar;namely a static ( positioned at the top) and the dynamic toolbar(ref: gold button on the sidebar).Style change to an element is done, when you see '#-A.' ( left-side of an element). This allows the element to adopt the style change. The Toolbar has the following:",image:"/images/instruction/toolBar.png",points:this.points.filter(par=>(par.id==="toolbar"))},
            {id:6,name:"profile",desc: "Once you've signed in, your secure profile page will be available, within the nav-drop-down.The page is triple protected using personal info, data JWT payload as well as data transfer encryption when logged in. You can stay on a page and access your profile page via a plug-in or be directed to the profile main page for editing work in full screen. The page has 6-major services for you to add/delete/edit/or Create work, along with easy-reply message board to build up you client base. These are as the following:",image:"/images/instruction/profile.png",points:this.points.filter(par=>(par.id==="profile"))},
            {id:7,name:"meta",desc: " All blogs have dynamic metadata population for improved enhanced  metadata updates to Google and other search engine base applications. these include:",image:"/images/instruction/meta.png",points:this.points.filter(par=>(par.id==="meta"))},
            {id:8,name:"services",desc: "All client can send message or recommendations to our administration by either using the profile-messaging app, within you user account or by eith message, phone or by direct email. All forward comments are cc'd to you via email. Additionally, all messages via the blog page are directed to the author's account. This maintains strong client-author relations.",image:"/images/instruction/dataflow.png",points:this.points.filter(par=>(par.id==="services"))},
            

        ]
    };

    main({parent}:{parent:HTMLElement}){
        const less900= window.innerWidth < 900;
        const less400= window.innerWidth <400;
        if(window.scrollY){
            window.scroll(0,0);
        }
        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:1rem;";
        const css_row="display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;justify-content:center;gap:1rem;";
        parent.style.position="relative";
        //use browser for one Time execution
       
        const time=8000;
      
        //show QUICK SUMMARY INTRO WITH WELCOME WITH DELETE POPUP OPTION.
        const popup=document.createElement("div");
        popup.id="firstTime-popup";
        popup.style.cssText=css_col + "position:absolute;border-radius:8px;border:none;box-shadow:1px 1px 12px 1px black;background-color:white;z-index:200;width:100%;";
        popup.style.top="2%";
        Misc.removePopup({parent,target:popup,position:"right"});
        this.showFirstTimeSlides({parent:popup,css_col,css_row,time,less400,less900});
        Misc.slideIn({anchor:popup,xpos:0,ypos:100,time:500});
        parent.appendChild(popup);

    };

    showFirstTimeSlides({parent,css_row,css_col,time,less400,less900}:{parent:HTMLElement,css_row:string,css_col:string,time:number,less400:boolean,less900:boolean}){
        let count=0;
        const slideCont=document.createElement("div");
        slideCont.id="slideCont-row";
        slideCont.style.cssText=css_row + "margin-inline:auto;justify-content:flex-start;width:100%;overflow-x:scroll;align-items:flex-start";
        slideCont.style.scrollSnapType="x mandatory";
        parent.appendChild(slideCont);
        this.firstTimeSlides.forEach(slide=>{
            if(slide){
                this.card({
                    parent:slideCont,
                    slide,
                    css_col,
                    css_row,
                    less900,
                    less400
                });
            }
        });
        const scrollExec=({parent,count}:{parent:HTMLElement,count:number})=>{
            const getData=this.firstTimeSlides.find(first=>(first.id===count));
            if(!getData) return {found:false,count};
            const {id}=getData;
            const ID=`card-col-${id}`
            const getCont=parent.querySelector(`div#${ID}`) as HTMLElement;
            if(count>0 && getCont){
                const img=getCont.querySelector("img") as HTMLImageElement;
                Misc.rotateIn({anchor:img,rotate:180,direction:"x",time:600});

            }
            getCont.scrollIntoView({
            behavior:"smooth",
            block:"center",
            });
            return {found:true,count}
        };

        const clear=setInterval(()=>{
            try {
                
               const scroll= scrollExec({parent:slideCont,count});
               const {found:hasFound}=scroll;
                if(hasFound){
                    count++;
                }else{
                    clearInterval(clear);
                    scrollExec({parent:slideCont,count:0});
                }
            } catch (error) {
                clearInterval(clear);
                const msg=getErrorMessage(error);
                console.log(msg);
            };
            
        },time);
        
    };


    card({parent,slide,css_col,css_row,less900,less400}:{
        parent:HTMLElement,
        slide:firstTimeType,
        css_col:string,
        css_row:string,
        less900:boolean,
        less400:boolean

    }){
        const maxWidth=less900 ? (less400 ? 380:780):900;
        const {id,name,desc,points,image}=slide;
        const col=document.createElement("div");
        if(less900){
            col.style.cssText=css_col + `flex:1 0 100%;maxWidth:${maxWidth}px;font-family:'Poppins-Regular',sans serif;gap:0;`;
        }else{
            col.style.cssText=css_row + `flex:1 0 100%;maxWidth:${maxWidth}px;flex-wrap:nowrap;font-family:Poppins-Regular;font-family:'Poppins-Regular',sans serif;gap:0;`;
        }col.style.scrollSnapAlign="center";
        col.id=`card-col-${id}`;
        col.className="card";
        const img=document.createElement("img");
        img.className="card-img-top";
        img.alt="www.ablogroom.com";
        const cardBody=document.createElement("div");
        cardBody.id="card-cardBody";
        cardBody.className="card-body";
        const h6=document.createElement("h6");
        h6.className="text-center text-primary display-6 lean";
        h6.textContent=name||"";
        cardBody.appendChild(h6);
        if(less900){
            const css=`max-width:${maxWidth}px;width:100%;margin-inline:auto;border:none;`;
            img.src=imageLoader({src:image,width:maxWidth,quality:90});
            img.style.cssText=css;
            cardBody.style.cssText=css + css_col + "padding-inline:0.5rem;justify-content:flex-start;padding-block:1rem;width:100%;";
        }else if(less400){
            const css=`;width:100%;margin-inline:auto;border:none;`;
            img.src=imageLoader({src:image,width:maxWidth,quality:90});
            img.style.cssText=css;
            cardBody.style.cssText=css + css_col + "padding-inline:0rem;justify-content:flex-start;padding-block:1rem;width:100%";
        }else{
            const css=`max-width:${maxWidth*0.75}px;flex:1 0 50%;border:none;`;
            img.src=imageLoader({src:image,width:maxWidth*0.75,quality:90});
            img.style.cssText=css;
            cardBody.style.cssText=css + css_col + "padding-inline:1.25rem;justify-content:flex-start;padding-block:1rem;";
        };
        const para=document.createElement("p");
        para.id="cardBody-desc";
        para.style.cssText="margin-inline:auto;text-wrap:pretty;line-height:1.65rem;"
        para.innerHTML=desc || "";
        const ul=document.createElement("ul");
        ul.id="cardBody-ul";
        ul.style.cssText="margin-inline:0;margin-left:10px;padding-block:1.25rem;";
        points.forEach((point,index)=>{
            const twoPoint=point.point.split(":")
            const li=document.createElement("li");
            li.id="cardBody-ul-li-" + String(index);
            li.style.listStyleType="georgian";//can use '-',etc to change
            if(twoPoint.length>1){
                li.innerHTML=`<span style=color:blue>${twoPoint[0]} </span><span> ${twoPoint[1]}</span>`
            }else{
                li.innerHTML=point.point || "";

            }
            ul.appendChild(li);
        });
        col.appendChild(img);
        cardBody.appendChild(para);
        cardBody.appendChild(ul);
        col.appendChild(cardBody);
        parent.appendChild(col);
      
    };
};
export default FirstTimeIntro;
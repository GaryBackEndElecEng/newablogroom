
import Service from "@/components/common/services";
import Nav from "../nav/headerNav";
import Misc from "./misc";
import Header from "../editor/header";

class Dataflow {
 overView:string="/images/dataFlow/draftOverflow.png";
 mainImg:string="/images/dataFlow/draftOverflowMain.png";
 blogsImg:string="/images/dataFlow/draftOverflowBlogs.png";
 blogImg:string="/images/dataFlow/draftOverflowDisplay.png";
 editImg:string="/images/dataFlow/draftOverflowEdit.png";
 sidebarImg:string="/images/dataFlow/draftOverflowSidebar.png";
 userImg:string="/images/dataFlow/draftOverflowUser.png";
 profileImg:string="/images/dataFlow/draftOverflowProfile.png";
 chartImg:string="/images/dataFlow/draftOverflowChart.png";
 storage:string="/images/storage/storage.png";
 cookie:string="/images/storage/cookie.png";
 nameStyle:string;
 nameStyle2:string;
 slides:{id:number,name:string,img:string,desc:string}[]=[];
    constructor(private _service:Service){
        this.nameStyle="color:blue;font-weight:bold;text-decoration:underline;";
        this.nameStyle2="color:lightblue;font-weight:bold;";
        this.slides=[
            {id:0,name:"Over View",img:this.overView,desc:`
                <span style="font-family:Poppins-Regular"> 
                The Editor is built on a multi-layer iclass injectable dependencies. This whole project was constructed within a 3-month period. Each class contributes to the added client service. The site is built on a combination of class and style component attributes, enhancing the users experiaence. The image reflects the main data flow, used to build the editor. The most important feature are the image and data storage means. All images have a timed-elapse signed signature that self destructs upon tampering, allowing the users to ensure their privacy to their images. The data storage has a three-nest layer, providing a non-error copying means for the user. This was constructed to ensure exact presigned-image upload with exact copying means per location. The security has a two layer approach, ensuring safe data storage means. There are seven main class components, involved on how the editor was constructed; namely;<span style="${this.nameStyle}" > Main Display, Sidebar,Edit, User, Auth, Service and Selector / storage.</span>
                <span> The Main Display is the loading area for the editor. It allows a view box area for all executable injectable components, using class methods, to be executed by the client based on a combination of onclick and async triggers, ensuring an organized flow of data.</span>
                </span>
                `},
            {id:1,name:"Main Display Component",img:this.mainImg,desc:`
                <span style="font-family:Poppins-Regular">The Main Display,has the largest volume of class injections and is used as teh viewbox for ongoing work. The main display is injected into an html page for browser access. Aside for the additional feature injectable components, The main has access to the footer,toolbar(31 editing features for text and image enhancement needs), Headers ( standard and Custom), Code generator, flexbox ( for grid-layout), user's profile access, edit ( for additional editing features), and display component(s) ( showing final built project/ blog).<br/> <span> in all, think of the main as chalkboard</span></span>
                `},
            {id:2,name:"Sidebar component",img:this.sidebarImg,desc:`
                <span style="font-family:Poppins-Regular">
                The Sidebar component is a visual selector to see all available features for enhance user experience. It allows the user to select / add / drop components for enhance building puroses. basically the sidebar is a panel housing clickable / executables allowing easy component or tool additions to help the user build a blog quickly with ease.
                <br/>
                <p> the has a choice of adding the following features:</p>
                <ol style=${this.nameStyle2}>
                <li>Footer;</li>
                <li>Display blog;</li>
                <li>Ultilities;</li>
                <li>Flexbox ( grid creation);</li>
                <li>special elements;</li>
                <li>code generator;</li>
                <li>Header or customize a header;</li>
                </ol>
                </span>
                `},
            {id:3,name:"edit component",img:this.editImg,desc:`
                <span style="font-family:Poppins-Regular">
                The Edit Component is primarily used to ensure data preservation for encase purposes, such as page refresh and or browser. It allows the user an ensurance that their data will be preserved, temporarily, until properly saved within the cloud. Auth with User data ensures proper access and blog set-up in prep for saving. Services and Storage work in parallel to coordinate saving with data preservation during all processes. The Edit has over 10- injectable classes for blog/ website rebuilding process is identical to the original preserved data. This ensures proper data preservation, at the browser level.
                </span>
                `},
            {id:4,name:"User Component",img:this.userImg,desc:`
                <span style="font-family:Poppins-Regular">
                 The user component, ide with the Auth, provides authorize access to user data. The security has two essential security component, injected within the header, using JWT for assurance to tamper preservation going to and coming from the web-server. The sign-in process involves two means, email/password and or sign-in, using a gmail account. The system uses only gmail because Google, aloong with AWS are the two most secure OS to use. The password is csrf injected within the header cookie using navigator means. Once logged-in, another app is used to secure secure session.
                 <br/>
                 <span></span>
                </span>
                `},
            {id:5,name:"Blogs Page Component",img:this.blogsImg,desc:`
                <span style="font-family:Poppins-Regular">
                    The blogs component uploads, having an html injection point for browser viewing, pulls all the "go-live" avalaible blogs data and displays the blogs within a two nested HTML generator for quick uploading. it dynamically uploads secure , show info - allowed user partial info, linked to each general blog. Each blog has only meta data for quick viewing and upload rates. storage is temporaily used to house the meta-blogs upload for data access.
                </span>
                `},
            {id:6,name:"blog Page Component",img:this.blogImg,desc:`
                <span style="font-family:Poppins-Regular">
                    The display blog component displays the main blog multi-layer component along with the blogger's authorized access for viewer display. The viewer can send the blogger an email, by clicking on the "sendMsg" button.
                    <br/>
                    <span>Upon sending, the viewer's response is uploaded for public viewing and submitted within a list at realtime. This ensures teh viewer that the message was sent with success.
                    <br>
                    <span> all emails are redirected to the blogger and are avalaible to the user via their dynamic profile acount.</span>
                    </span>
                </span>
                `},
            {id:7,name:"Partial Profile Component",img:this.profileImg,desc:`
                <span style="font-family:Poppins-Regular">
                    The Profile Component has many features for the user. Its dynamic, meaning that once the user sign-ins, he/she has instant access to their profile.
                    <br/>
                    <span>Within the profile, the user can edit blogs on realtime, view their blogs, bring a blog online or bring it off-line,review recieved messages from viewers, send message responses to viewers, change password and email,,,, etc
                    <br>
                    <span> The user has all available features allowing for easy control and managerial control.</span>
                    </span>
                </span>
                `},
            {id:8,name:"Chart Component",img:this.chartImg,desc:`
                <span style="font-family:Poppins-Regular">
                    The Chart Component allows you to customize your chart element before saving.Once saved, the chart migrates your work to the editor for further add-ons. The Chart Component consists of a 2 by 2 data storage array with a maximum capacity of 10,000 x,y sets,along with a floating point indicator emphasizing the x,y-point value for further visualy graph clarity.
                    <br/>
                    <span><span style=color:#0CAFFF;font-size:140%;text-decoration:underline dotted red;>Entering data:</span> Entering data is easy, there are two arrays, similarly: x array and y-array.You copy the array ( number or string separated by a comma()',') into the input area, and then give your graph a name. Once saved, the system brings you to the editor for further entries.,,,, etc
                    <br>
                    <span> The user has all available features allowing for easy control. <pre style=color:pink;font-size:160%;> TRY IT!</pre></span>
                    </span>
                </span>
                <p> features: </p>
                <ol style=${this.nameStyle2}>
                <li>easy data entry;</li>
                <li>line or Bar option; and</li>
                <li>stringify data preservation;</li>
                </ol>
                `},
        ]
        this.storage="/images/storage/storage.png";
        this.cookie="/images/storage/cookie.png";
    }
    main(parent:HTMLElement){
        window.scroll(0,0);
        const less900=window.innerWidth < 900;
        const less600=window.innerWidth < 600;
        const less400=window.innerWidth < 400;
        const width_=window.innerWidth < 900 ? (window.innerWidth < 400 ? 375 :420) : 800;
        const size=window.innerWidth < 900 ? (window.innerWidth < 420 ? "xs" :"md") : "lg";
        const padding=window.innerWidth <900 ? "0rem":"1rem";
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.id="infor-popup";
        popup.className="popup";
        popup.style.cssText=`position:absolute;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;padding:5rem;background-color:#0C090A;color:white;width:100%;z-index:300;height:100vh;overflow-y:scroll;gap:2rem;`;
        popup.style.width=less400 ? "102%":"100%";
        popup.style.overflowX=size==="xs" ? `hidden`:"auto";
        popup.style.padding=(size==="xs") ? `0rem`:(size==="md") ? "2rem":"5rem";
        popup.style.inset=less900 ? (less600 ? (less400 ? "0%" :"5% 0% 0% 0%"): "0%") : "0%";
        this.slides.map((slide,index)=>{
            const card=document.createElement("div");
            card.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:center;width:100%;position:relative;";
            // card.style.maxWidth=window.innerWidth <900 ? (window.innerWidth <400 ? "350px" : "600px"):"800px";
            card.id=`info-card-${index}`;
            const text=document.createElement("h6");
            text.className="text-center text-primary mb-2 text-decoration-underline lean display-6";
            text.style.cssText="text-align:center; align-self:center;"
            text.textContent=slide.name;
            card.appendChild(text);
            const para=document.createElement("p");
            para.id=`shapoutside-${index}`;
            para.style.cssText="margin-inline:auto;width:100%;padding-inline:3rem;line-height:2.55rem;font-size:115%;";
            const img=document.createElement("img");
            img.style.cssText=`shape-outside:circle(50%);margin-block:2rem;width:${width_}px;aspect-ratio: 1 / 1;border-radius:50%;padding:${padding};filter:drop-shadow(0 0 0.75rem white);margin-right:4rem;float:left;`;
            img.src=slide.img;
            img.id=`image-round-${index}`;
            if(size==="xs"){
                card.style.width="100%";
                para.style.display= "flex";
                para.style.flexDirection= "column";
                para.style.alignItems= "center";
                para.style.justifyContent="center";
                para.style.gap="2rem";
                para.style.width="auto";
                para.style.marginInline="auto";
                img.style.float="none";
                img.style.marginRight="0px";
                img.style.marginInline="auto";
                img.style.width="300px"
            }
            para.appendChild(img);
            para.innerHTML +=slide.desc;
            card.appendChild(para);
            popup.appendChild(card);
            Misc.matchMedia({parent:card,maxWidth:400,cssStyle:{maxWidth:"390px",margin:"0px"}});
            const getImg=para.querySelector(`img#image-round-${index}`) as HTMLImageElement;
            Misc.matchMedia({parent:getImg,maxWidth:900,cssStyle:{marginRight:"2rem"}});
            Misc.matchMedia({parent:getImg,maxWidth:400,cssStyle:{float:"none",marginRight:"none",marginInline:"auto"}});
            Misc.matchMedia({parent:para,maxWidth:900,cssStyle:{padding:"2rem",lineHeight:"1.80rem"}});
            Misc.matchMedia({parent:para,maxWidth:420,cssStyle:{display:"flex",flexDirection:"column",alignItems:"center",padding:"1rem",lineHeight:"1.5rem",paddingInline:"1.5rem",fontSize:"100%"}});
        });
        const {button}=Misc.simpleButton({anchor:popup,bg:Nav.btnColor,color:"white",text:"close",type:"button",time:400});
        button.style.textAlign="center";
        button.style.alignSelf="center";
        button.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },390);
            }
        };
        parent.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{padding:"3rem"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{padding:"1rem"}});
        Misc.growIn({anchor:popup,scale:2,opacity:0,time:600});
        window.scroll(0,0);
    }
     promStoragMessage(parent:HTMLElement){
        return new Promise(resolve=>{
           
                resolve({message:()=>{
                   
                    if(parent){
                    this.storageMessage(parent)
                    }
                }});
            
        }) as Promise<{message:()=>void}>;
    }
    
    storageMessage(parent:HTMLElement):void{
        parent.style.zIndex='';
        window.scroll(0,0);
        Header.cleanUpByID(parent,"storage-message-popup");
        const liCss="list-style-type:disc;margin-left:1rem;"
        const popup=document.createElement("div");
        popup.className="storage-message-popup";
        popup.style.cssText=`color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem;box-shadow:1px 1px 12px 1px black; border-radius:12px;font-family:Poppins-Regular;background-color:#030c31fa;z-index:200;color:white;`;
        popup.id="storage-message-popup";
        popup.style.position="absolute";
        popup.style.top="30%";
        popup.style.left="30%";
        popup.style.right="30%";
        const title=document.createElement("h6");
        title.textContent="message";
        title.className="text-center text-primary lean display-6 my-2 mb-3 text-decoration-underline text-underline-offset-4";
        popup.appendChild(title);
       
        const text=document.createElement("p");
        text.style.cssText="margin-block:2rem;margin-inline:1rem;padding-inline:3rem";
        const intro=document.createElement("span");
        intro.innerHTML=`The site uses Editor uses local storage to ensure that your work is saved and secure.<br/> We believe in securing your interests. <br/>For more info: we use the browser's storage to assist with the following:`;
        text.appendChild(intro);
        const ul=document.createElement("ul");
        text.appendChild(ul);
        const liStorage=document.createElement("li");
        const storage_img=document.createElement("img");
        storage_img.style.cssText="width:100px;padding:7px;border-radius:50%;filter:drop-shadow(0 0 0.75rem white);border:none;margin-right:10px;";
        storage_img.src=this.storage;
        storage_img.alt="cookie : www.ablogroom.com";
        liStorage.appendChild(storage_img);
        liStorage.innerHTML+="storage:"
        liStorage.innerHTML+=`<ul> When on /editor:
                            <li style=${liCss}> to save your work temporarily until you save it;</li>
                            <li style=${liCss}> to ensure that work will be saved  when refreshing the browser; and</li>
                            <li style=${liCss}> available account after page refresh.</li>
                            </ul>
                            <ul> When on site:
                            <li style=${liCss}> to ensure that your browser is secure when using personal data.</li>
                            </ul>
                            `;
        ul.appendChild(liStorage);
        const liCookie=document.createElement("li");
        const cookie=document.createElement("img");
        cookie.style.cssText="width:100px;padding:7px;border-radius:50%;filter:drop-shadow(0 0 0.75rem white);border:none;margin-right:10px;";
        cookie.src=this.cookie;
        cookie.alt="cookie : www.ablogroom.com";
        liCookie.appendChild(cookie);
        liCookie.innerHTML+="cookie:";
        liCookie.innerHTML+=`
        <ul> When on site:
               <li style=${liCss}> to encode all personal information, such as passwords and email info; and</li>
               <li style=${liCss}> to help prevent cross-site contamination.</li>
        </ul>
        `;
        ul.appendChild(liCookie);
        text.appendChild(ul);
        text.innerHTML+=`
        <br/>
        <span>Gary Wallace</span>
        <br/>
        <pre style=color:#0CAFFF;font-size:120%;margin-block:1rem>
            <span> Developer, </span>
            <span>
            <a style=color:inherit;text-decoration:none; href='tel:4169175768'>
            cell</a>
            </span>
        </pre>`;
        popup.appendChild(text);
        const {button}=Misc.simpleButton({anchor:popup,bg:Nav.btnColor,color:"white",type:"button",time:400,text:"close"});
        parent.appendChild(popup);
        button.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.slideOut({anchor:popup,xpos:50,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },390);
            }
        };
        popup.style.top=window.innerWidth <900 ? (window.innerWidth <400 ? "35%" : "30%") : "30%";
        popup.style.left=window.innerWidth <900 ? (window.innerWidth <400 ? "0%" : "10%") : "30%";
        popup.style.right=window.innerWidth <900 ? (window.innerWidth <400 ? "0%" : "10%") : "30%";
        Misc.fadeIn({anchor:popup,xpos:50,ypos:100,time:400});
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{top:"30%",left:"10%",right:"10%"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{top:"35%",left:"0%",right:"0%"}});
        Misc.matchMedia({parent:text,maxWidth:900,cssStyle:{paddingInline:"2rem"}});
        Misc.matchMedia({parent:text,maxWidth:400,cssStyle:{paddingInline:"1rem"}});

    }
}
export default Dataflow;

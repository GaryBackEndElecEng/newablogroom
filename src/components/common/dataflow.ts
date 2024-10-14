
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
                    <span> The user has all available features alowing for easy control and managerial control.</span>
                    </span>
                </span>
                `},
        ]
    }
    main(parent:HTMLElement){
        window.scroll(0,0);
        const width_=window.innerWidth < 900 ? (window.innerWidth > 420 ? 400 :350) : 500;
        const padding=window.innerWidth <900 ? "0rem":"1rem";
        parent.style.position="relative";
        const popup=document.createElement("div");
        popup.id="infor-popup";
        popup.className="popup";
        popup.style.cssText="position:absolute;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;padding:5rem;background-color:#0C090A;color:white;max-width:100%;z-index:300;height:100vh;overflow-y:scroll;gap:2rem;";
        this.slides.map((slide,index)=>{
            const card=document.createElement("div");
            card.style.cssText="margin:auto;display:flex;flex-direction:column;align-items:center;";
            card.id=`info-card-${index}`;
            const text=document.createElement("h6");
            text.className="text-center text-primary mb-2 text-decoration-underline lean display-6";
            text.textContent=slide.name;
            card.appendChild(text);
            const para=document.createElement("p");
            para.style.cssText="margin-inline:auto;width:100%;padding-inline:3rem;line-height:2.55rem;font-size:115%;";
            const img=document.createElement("img");
            img.style.cssText=`shape-outside:circle();margin-block:2rem;width:${width_}px;aspect-ratio: 1 / 1;border-radius:50%;padding:${padding};filter:drop-shadow(0 0 0.75rem white);`;
            img.src=slide.img;
            img.id=`image-round-${index}`;
            img.className="image-round";
            img.style.float="left";
            img.style.marginRight="4rem";
            para.appendChild(img);
            para.innerHTML +=slide.desc;
            card.appendChild(para);
            popup.appendChild(card);
            Misc.matchMedia({parent:card,maxWidth:400,cssStyle:{maxWidth:"390px",margin:"0px"}});
            Misc.matchMedia({parent:para,maxWidth:900,cssStyle:{padding:"2rem",lineHeight:"1.80rem"}});
            Misc.matchMedia({parent:para,maxWidth:420,cssStyle:{padding:"1rem",lineHeight:"1.5rem",paddingInline:"1.5rem",fontSize:"100%"}});
        });
        parent.appendChild(popup);
        const {button}=Misc.simpleButton({anchor:popup,bg:Nav.btnColor,color:"white",text:"close",type:"button",time:400});
        button.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    parent.removeChild(popup);
                },390);
            }
        };
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{padding:"3rem"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{padding:"1rem"}});
        Misc.growIn({anchor:popup,scale:2,opacity:0,time:600});

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
        text.innerHTML=`The site uses Editor uses local storage to ensure that your work is saved and secure.<br/> We believe in securing your interests. <br/>For more info: we use the browser's storage to assist with the following:
        <ul>
            <li class="liStyle"> local storage:
               <ul> When on /editor:
               <li style=${liCss}> to save your work temporarily until you save it;</li>
               <li style=${liCss}> to ensure that work will be saved  when refreshing the browser; and</li>
               <li style=${liCss}> available account after page refresh.</li>
               </ul>
               <ul> When on site:
               <li style=${liCss}> to ensure that your browser is secure when using personal data.</li>
               </ul>
            </li>
            <li class="liStyle"> cookies:
               <ul> When on site:
               <li style=${liCss}> to encode all personal information, such as passwords and email info; and</li>
               <li style=${liCss}> to help prevent cross-site contamination.</li>
               </ul>
            </li>
        </ul>
        <br/>
        <span>Gary Wallace</span>`;
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
        Misc.fadeIn({anchor:popup,xpos:50,ypos:100,time:400});
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{top:"30%",left:"10%",right:"10%"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{top:"35%",left:"0%",right:"0%"}});
        Misc.matchMedia({parent:text,maxWidth:900,cssStyle:{paddingInline:"2rem"}});
        Misc.matchMedia({parent:text,maxWidth:400,cssStyle:{paddingInline:"1rem"}});

    }
}
export default Dataflow;

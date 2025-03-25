import { SiAnswer } from "react-icons/si";
import Message from "../common/message";
import Misc from "../common/misc";
import { FaCreate } from "../common/ReactIcons";
import Service from "../common/services";
import ModSelector from "../editor/modSelector";
import { blogType, messageType } from "../editor/Types";
import Header from "../editor/header";
import { buttonReturn } from "../common/tsFunctions";
import Nav from "../nav/headerNav";


class AllMsgs{
    private _telephone:string;
    private _email:string;
    public signed:string;
    public readonly btnDetail:string;
    public readonly btnColor:string;
    public readonly phone:string;
    public readonly email:string;
    public readonly logo:string;
    public readonly bcard:string;
    public readonly brief:string;
    public readonly assistant:string;
    public readonly aboutMe:string;
    public readonly profileImg:string;
    private _msgs:messageType[];
    constructor(private _modSelector:ModSelector,private _service:Service,public message:Message){
        this._msgs=[];
        this.btnColor=this._modSelector.btnColor;
        this.btnDetail=this._modSelector.btnDetail;
        this._telephone="416-917-5768";
        this._email="masterconnect919@gmail.com";
        this.logo="/images/gb_logo.png";
        this.profileImg="/images/profileImg2.png";
        this.bcard="/images/bcard.png";
        this.email="/images/mail.png";
        this.phone="/images/phone.png";
        this.brief=" Thank you for the visit. Ablogroom is a free site for all users. Ablogroom allows you to create a website, blog or post to enhance your means to connect with your viewers. This free site contains the best editor means possible, giving the tools to the user to build a professional web-site, with nested complex structures.";
        this.assistant=" We help develop sites for you. if you need a site and own a buisness, just let us know. We will kick into gear to serve you well.";
        this.aboutMe="Thank-you for visiting the site, in short, I am an retired Military Officer with over 30 years experience within the Hightech field. I have an Engineering degree and have worked for Nortel and Positron before entering the military, after 911 World Tower incidence. I am now a front && back developer with  over 5-years in the field. I am loyal and honest and would humbly be honored to assist with your needs ";
        this.signed="/images/signed.png";
    }
    get msgs(){
        return this._msgs;
    };
    set msgs(msgs:messageType[]){
        this._msgs=msgs;
    }
    get telephone(){
        return this._telephone;
    }
    get Email(){
        return this._email
    }

    async showMsgs(parent:HTMLElement){
       const msgs:messageType[]|undefined= await this._service.getAllmsgs({rating:4,secret:null});
       if(msgs && msgs.length>0){
        this.msgs=msgs;
        this.addMsgsToBlogs({blogs:this._modSelector.blogs,msgs});
        Header.cleanUpByID(parent,"non-secret-messages");
        const height=msgs.length < 3 ? 15 : 20;
        const scroll=msgs.length < 3 ? "hidden":"scroll";
        const container=document.createElement("section");
        container.id="non-secret-messages";
        container.style.cssText=`width:100%;display:flex;justify-content:flex-start;align-items:center;flex-direction:column;gap:1.25rem;height:${height}vh;overflow-y:${scroll}`;
        this.msgs.map(msg=>{
            this.singleMsg({container:container,msg});
        });
        parent.appendChild(container);
       };
    };


    // for individual Card
    blogMsgs(item:{col:HTMLElement,blog:blogType}){
        const {col,blog}=item;
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;

        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;";
        const msgs=blog.messages ? blog.messages : [] as messageType[];
        if(blog && msgs && msgs.length>0){
            const contScroll=document.createElement("div");
            contScroll.id="allMsgs-blogMsgs-contScroll";
            contScroll.style.cssText=css_col + "height:15vh;overflow-y:scroll;padding:1rem;width:100%";
            contScroll.style.marginBlock=less900 ? (less400 ? "3rem": "1rem") : "0.5rem";
            contScroll.style.marginBlock=window.innerWidth <420 ? "0px":"auto";
            contScroll.style.paddingInline=window.innerWidth < 900 ? (window.innerWidth<400 ? "1.25rem":"2.75rem"):"5.5rem";
            col.appendChild(contScroll);
            msgs.map(msg=>{
                if(msg){
                    
                    this.singleMsgTwo({col:col,contScroll:contScroll,msg,imgKey:blog.imgKey})
                };
            });
        };
    };


    addMsgsToBlogs(item:{blogs:blogType[],msgs:messageType[]}){
        const {blogs,msgs}=item;
        this._modSelector.blogs=blogs.map(blog=>{
          msgs.filter(msg=>{
              if(msg.blog_id===blog.id){
                  blog.messages.push(msg)
              }
          });
            return blog
        });
    };


    singleMsg(item:{container:HTMLElement,msg:messageType}){
        const {container,msg}=item;
        Header.cleanUpByID(container,`msg-card-${msg.id}`);
        const less900=window.innerWidth <900 ;
        const less400=window.innerWidth <400 ;
        if(less900){
            window.scrollBy(0,-200)
        }else if(less400){
            window.scrollBy(0,-500)
        }else{
            window.scrollBy(0,-80);

        }
        const card=document.createElement("div");
        card.id=`msg-card-${msg.id}`;
        card.className="msgCard row";
        card.style.cssText=`width:100%;display:inline-flex;justify-content:center;box-shadow:1px 1px 5px 1px #00BFFF,-1px -1px 5px 1px #00BFFF;cursor:pointer;`
            //ICONDIV && NAME
            const nameCont=document.createElement("span");
            nameCont.style.cssText="display:flex;flex-wrap:nowrap;justify-content:space-around;align-items:center;margin-block:auto;";
            nameCont.id="nameCont";
            nameCont.classList.add("viewCard");
            nameCont.setAttribute("data-link","click to view comment");
            const name=document.createElement("p");
            name.id="msg-name";
            name.style.cssText="margin-right:0.5rem;margin-block:0.5rem;";
            name.textContent=msg.name;
        const iconDiv=document.createElement("span");
        iconDiv.id="iconDiv";
        iconDiv.style.cssText="font-size:40px;width:45px;height:45px;padding:3px;display:flex;"
        FaCreate({parent:iconDiv,name:SiAnswer,cssStyle:{marginRight:"10px",background:"white",color:"black",zIndex:"100"}});
        //APPENDING ICONDIV && NAME
        nameCont.appendChild(iconDiv);
        nameCont.appendChild(name);
        card.appendChild(nameCont);
            //APPENDING ICONDIV && NAME
            //STARS AND RATING
            const rating=document.createElement("p");
            rating.id="rating";
            rating.style.cssText="margin-right:0.5rem;margin-block:auto;padding-block:auto;";
        rating.textContent=`rating:${msg.rate}`;

        const contStar=document.createElement("span");
        contStar.id="contStar";
        contStar.style.cssText="display:flex;flex-wrap:wrap;";
        contStar.appendChild(rating);
        const cssStyle={color:"yellow","backgroundColor":"black",padding:"1px",borderRadius:"50%","fontSize":"25px","fill":"yellow","marginInline":"0px"};
        const rowCssStyle={"backgroundColor":"black",padding:"1px",borderRadius:"12px"};
        Misc.starRating({parent:contStar,rating:msg.rate,cssStyle,rowCssStyle});
        //APPENDING rating and contStar
        //APPENDING rating and contStar
        nameCont.appendChild(contStar);
        container.appendChild(card);
        card.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                const getHomeIndex=document.querySelector("section#home-index") as HTMLElement;
                if(!getHomeIndex) return;
                this.message.viewCard({parent:getHomeIndex,msg});
            }
        });
       
    };


    singleMsgTwo(item:{col:HTMLElement,contScroll:HTMLElement,msg:messageType,imgKey:string|undefined}){
        const {col,contScroll,msg,imgKey}=item;
        const css_col="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;";
        const css_row="display:flex;flex-direction:row;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap;";
        Header.cleanUpByID(contScroll,`allMsgs-singleMsgTwo-msg-card-${msg.id}`);
        const card=document.createElement("div");
        card.id=`allMsgs-singleMsgTwo-msg-card-${msg.id}`;
        card.className="msgCard row";
        card.style.cssText=css_row +`width:100%;box-shadow:1px 1px 5px 1px #00BFFF,-1px -1px 5px 1px #00BFFF;cursor:pointer;`;
            //ICONDIV && NAME
            const nameCont=document.createElement("span");
            nameCont.style.cssText=css_row + "flex-wrap:nowrap;";
            nameCont.id="nameCont";
            nameCont.classList.add("viewCard");
            nameCont.setAttribute("data-link","click to view comment");
            const name=document.createElement("p");
            name.id="msg-name";
            name.style.cssText="margin-right:0.5rem;margin-block:0.5rem;";
            name.textContent=msg.name;
        const iconDiv=document.createElement("span");
        iconDiv.id="singleMsgTwo-iconDiv";
        iconDiv.style.cssText=css_col + "font-size:40px;width:45px;height:45px;padding:3px;"
        FaCreate({parent:iconDiv,name:SiAnswer,cssStyle:{marginRight:"10px",background:"white",color:"#00BFFF",zIndex:"1"}});
        //APPENDING ICONDIV && NAME
        nameCont.appendChild(iconDiv);
        nameCont.appendChild(name);
        card.appendChild(nameCont);
        //APPENDING ICONDIV && NAME
        //STARS AND RATING
        const rating=document.createElement("p");
        rating.id="singleMsgTwo-rating";
        rating.style.cssText="position:absolute;top:0%;margin-right:0.5rem;text-decoration:underline;text-underline-offset:0.25rem;width:40px;font-size:70%;";
        rating.style.left=window.innerWidth <900 ? (window.innerWidth <400 ? "-10%" : "0%") : "90%";
        rating.style.transform=window.innerWidth <900 ? (window.innerWidth <400 ? "translate(-30px,0px)" : "translate(-40px,5px)") : "translate(20px,-5px)";
       
        rating.innerHTML=`<span style=color:red;font-size:80%;>R</span> : ${msg.rate}`;

        const contStar=document.createElement("span");
        contStar.id="singleMsgTwo-contStar";
        contStar.style.cssText=css_row +"position:relative;";
        contStar.appendChild(rating);
        const cssStyle={color:"yellow","backgroundColor":"black",padding:"1px",borderRadius:"50%","fontSize":"25px","fill":"yellow","marginInline":"0px"};
        const rowCssStyle={"backgroundColor":"black",padding:"1px",borderRadius:"12px"};
        Misc.starRating({parent:contStar,rating:msg.rate,cssStyle,rowCssStyle});
        //APPENDING rating and contStar
        //APPENDING rating and contStar
        nameCont.appendChild(contStar);
        contScroll.appendChild(card);
        card.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.viewCard({parent:col,msg,imgKey});
            };
        });
       
    };


   async viewCard(item:{parent:HTMLElement,msg:messageType,imgKey:string|undefined}){
        const {parent,msg,imgKey}=item;
        const url=new URL(window.location.href);
        const less900=window.innerWidth <900 ;
        const less400=window.innerWidth <400 ;
       
        if(less900){
            window.scrollBy(0,-80)
        }else if(less400){
            window.scrollBy(0,-100)
        }
        const container=document.createElement("div");
        container.id="allMsgs-viewCard-container";
        container.style.cssText ="max-width:800px;padding-inline:1rem;display:flex;flex-direction:column;place-items:center;position:absolute;border-radius:14px;box-shadow:1px 1px 10px 1px #0CAFFF,-1px -1px 10px 1px #0CAFFF;z-index:100;background-color:white;padding-block:1rem;";
        if( url.pathname==="/"){
            container.style.inset=less900 ? (less400 ? "30% 0% 38% 0%" : "-95% 5% 40% 5%") :"0% 10% 30% 10%";
        }else{
            container.style.inset=less900 ? (less400 ? "30% 0% 38% 0%" : "30% 10% 45% 10%") :"30% 10% 30% 10%";

        }
        parent.appendChild(container);
        const card=document.createElement("div");
        card.id="allMsgs-viewCard-card"
        card.style.cssText ="padding-inline:1rem;display:flex;justify-content:space-around;flex-wrap:nowrap;align-items:flex-start;position:relative;background-color:white;width:100%;padding-block:1rem;";
        container.appendChild(card);
        const img=document.createElement("img");
        img.id="allMsgs-viewCard-img";
        if(imgKey){
            this._service.getSimpleImg(imgKey).then(async(res)=>{
                if(res){
                    img.src=res.img;
                    img.alt="www.ablogroom.ca";
                }
            });
        }else{
            img.src=this.logo;
            img.alt="www.ablogroom.ca";
        }
        
        img.style.cssText="width:50px;height:50px;aspect-ratio:1 / 1;border-radius:50%;filter:drop-shadow(0 0 0.5rem #0CAFFF);background-color:black;";
        card.appendChild(img);
        const cardBody=document.createElement("div");
        cardBody.id="allMsgs-viewCard-body";
        cardBody.style.cssText="width:100%; margin-inline:auto;padding:0.5rem;display:flex;flex-direction:column;align-items:flex-start;max-height:15vh;overflow-y:scroll;position:relative;";
        card.appendChild(cardBody);
        const name=document.createElement("span");
        name.id="allMsgs-viewCrad-body-name";
        name.style.cssText="display:flex;flex-wrap:wrap;";
        const rate=document.createElement("div");
       rate.style.cssText="margin-inline:auto;"
        rate.id="allMsgs-cardBody-rate";
        const cssStyle={color:"yellow","backgroundColor":"black",padding:"1px",borderRadius:"50%","fontSize":"25px","fill":"yellow","marginInline":"0px"};
        const rowCssStyle={"backgroundColor":"black",padding:"1px",borderRadius:"12px"};
        Misc.starRating({parent:rate,rating:msg.rate,cssStyle,rowCssStyle});
        name.innerHTML=`<span id="view-cardBody-name" style="display:flex;"><span style="color:black;font-weight:bold;">name: </span> <h6 style="font-size:18px;color:blue;margin-right:0.5rem;"> ${msg.name}</h6></span>`;
        cardBody.appendChild(rate);
        cardBody.appendChild(name);
        const mess=document.createElement("p");
        mess.id="allMsgs-viewCard-body-mess";
        mess.style.cssText="padding:0.7rem;border:1px solid #0CAFFF;border-radius:7px;width:100%; ";
        mess.textContent=msg.msg;
        cardBody.appendChild(mess);
        Misc.fadeIn({anchor:container,xpos:70,ypos:100,time:400});
        Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{inset:"30% 5% 30% 5%"}});
            Misc.matchMedia({parent:container,maxWidth:500,cssStyle:{inset:"33% 0% 35% 0%"}});
        Misc.matchMedia({parent:rate,maxWidth:500,cssStyle:{width:"8px;"}});
        
        const btn=buttonReturn({parent:container,bg:"black",color:"white",text:"close",type:"button"});
        btn.id="viewCard-btn";
        btn.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:container,xpos:30,ypos:100,time:400});
                setTimeout(()=>{
                    parent.removeChild(container);
                },380);
            };
        });

    };


    advertise(item:{col:HTMLElement,main:HTMLElement}){
        const {col,main}=item;
        const isSVGs=document.querySelectorAll("svg");
        if(isSVGs && isSVGs.length>0){
            ([...isSVGs as any] as SVGElement[]).forEach(svg=>{
                if(svg){
                    svg.style.zIndex="0";
                }
            });
        }
        const phoneNum=this._telephone;
        const email=this._email;
        const less900=window.innerWidth <900 ;
        const less400=window.innerWidth <400 ;
        if(less900){
            window.scrollBy(0,-200)
        }else if(less400){
            window.scrollBy(0,-500)
        }else{
            window.scrollBy(0,-80);

        }
        
        
        const popup=document.createElement("div");
        popup.id="allMsgs-advertise-popup";
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem;height:auto;";
        const css_row="margin-inline:auto;display:flex;flex-direction:row;justify-content:center;align-items:center;gap:1rem;flex-wrap:wrap;height:auto;position:relative;width:100%;";
        const css="position:absolute;border-radius:20px;backdrop-filter:blur(20px);box-shadow:1px 1px 12px rgb(0, 191, 255);z-index:1000;color:black; ";
        const css_img="margin:auto;margin-inline:1rem;border-radius:26px;filter:drop-shadow(0 0 0.75rem #343504);padding:0.5rem;";
        popup.style.cssText=css + css_col;
        popup.style.top=less900 ? (less400 ? "-10%":"-30%"): "-35%";
        
        popup.style.width="100%";
        if(less900){
                popup.style.paddingInline="1rem";
                popup.style.transform="translateY(-55%)";
            if(less400){
                popup.style.paddingInline="0.25rem";
                popup.style.transform="translateY(-80%)";
            }
        }else{
                popup.style.paddingInline="3rem";
                popup.style.transform="translateY(-90%)";
        }
        const transform=popup.style.transform;

        const container=document.createElement("section");
        container.id="allMsgs-advertise-popup-container";
        container.style.cssText=css_col + "margin-block:1rem;min-height:5vh;background-color:white;border-radius:inherit;box-shadow:1px 1px 12px black;padding:0.5rem;gap:2rem;color:black;position:relative;width:100%;z-index:200;";
        container.style.height=less900 ? (less400 ? "100vh" : "80vh") :"auto";
        container.style.overflowY=less900 ? "scroll":"auto";
        container.style.justifyContent=less900 ? "flex-start":"center";
        //--------------------------CONTENT---------------/////
        this.advertiseUpper({parent:container,css_col,css_row,css_img,less400,less900});
        //----------DIVIDER------------------------//
        const hr=document.createElement("div");
        hr.id="divider";
        hr.classList.add("divider")
        
        //----------DIVIDER------------------------//
        container.appendChild(hr);
        this.showLowerBio({
            parent:container,
            css_col,
            css_row,
            css_img,
            less400,
            less900,
            phoneNum,
            email
        });
        //--------------------------CONTENT---------------/////
        popup.appendChild(container);
        main.appendChild(popup);
        popup.animate([
            {transform:`translateY(0%) scale(0.5)`,opacity:"0.3",backdropFilter:"blur(0px)",boxShadow:"1px 3px 20px black"},
            {transform:`${transform} scale(1)`,opacity:"0.3",backdropFilter:"blur(20px)",boxShadow:"1px 1px 12px rgb(0, 191, 255)"},
        ],{duration:800,iterations:1});
        const {button:close}=Misc.simpleButton({anchor:popup,text:"close",bg:Nav.btnColor,color:"white",time:400,type:"button"});
        close.style.alignSelf="center";
        close.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:popup,xpos:0,ypos:100,time:400});
                setTimeout(()=>{main.removeChild(popup)},380);
                
            }
        };
    };


    advertiseUpper({parent,css_col,css_row,css_img,less400,less900}:{parent:HTMLElement,css_col:string,css_row:string,css_img:string,less900:boolean,less400:boolean}){
        const container=document.createElement("section");
        container.id="allMsgs-advertise-popup-container";
        container.style.cssText=css_col + "margin-block:1rem;min-height:5vh;background-color:white;border-radius:inherit;box-shadow:1px 1px 12px black;padding:0.5rem;gap:2rem;color:black;position:relative;width:100%;z-index:200;";
        container.style.height=less900 ? (less400 ? "100vh" : "80vh") :"auto";
        container.style.overflowY=less900 ? "scroll":"auto";
        container.style.justifyContent=less900 ? "flex-start":"center";
        //--------------------------CONTENT---------------/////
        const upperCard=document.createElement("div");
        upperCard.style.cssText=css_row + "padding-inline:1rem;padding-block:1rem;flex-wrap:nowrap;width:100%;position:relative;";
        upperCard.style.flexDirection=less900 ? "column":"row";
        const imgUpper=document.createElement("img");
        imgUpper.style.cssText=css_img ;
        imgUpper.style.border="none" ;
        imgUpper.src=this.logo;
        imgUpper.alt="www.ablogroom.com";
        imgUpper.style.width=less900 ? (less400 ? "300px" : "325px") : "350px";
        upperCard.appendChild(imgUpper);//APPENDING
        const uppertext=document.createElement("p");
        uppertext.textContent=this.brief;
        uppertext.style.cssText="text-align:center;text-wrap:pretty;padding-inline:0.5rem;font-family:'LobsterTwo-Regular';line-height:2.75rem;";
        uppertext.style.width="100%";
        uppertext.style.fontSize=less900 ? "120%": "150%";
        upperCard.appendChild(uppertext);//APPENDING
        parent.appendChild(upperCard);
    };

    showLowerBio({parent,css_col,css_row,css_img,less400,less900,phoneNum,email}:{
        parent:HTMLElement,
        css_col:string,
        css_row:string,
        css_img:string,
        less900:boolean,
        less400:boolean,
        phoneNum:string,
        email:string

    }){
        const contLowerMain=document.createElement("div");
        contLowerMain.id="cont-lower-main";
        contLowerMain.style.cssText=css_col + " margin-inline:auto;margin-block:1rem;";
        const lowerInner=document.createElement("div");
        lowerInner.id="cont-lower-main";
        lowerInner.style.cssText=css_col + " margin-inline:auto;margin-block:1rem;";
        const lowerWhoIAm=document.createElement("div");
        lowerWhoIAm.id="cont-lower-main";
        lowerWhoIAm.style.cssText=css_col + " margin-inline:auto;margin-block:1rem;";
        const {button}=Misc.simpleButton({anchor:contLowerMain,type:"button",bg:this.btnColor,color:"white",text:"who I am",time:400});
        lowerWhoIAm.hidden=true;
        button.onclick=(e:MouseEvent)=>{
            if(!e) return;
            if(lowerWhoIAm.hidden){
                Header.cleanUp(lowerInner);
                lowerWhoIAm.hidden=false;
                lowerInner.hidden=true;
                button.textContent="close";
                this.whoIam({parent:lowerWhoIAm,css_col,css_row,css_img,less400,less900,phoneNum,email});
            }else{
                Header.cleanUp(lowerWhoIAm);
                lowerWhoIAm.hidden=true;
                lowerInner.hidden=false;
                button.textContent="who I am";
                this.advertiseLower({parent:lowerInner,css_col,css_row,css_img,less400,less900});
            }
        };
        contLowerMain.appendChild(lowerInner);
        contLowerMain.appendChild(lowerWhoIAm);
        this.advertiseLower({parent:lowerInner,css_col,css_row,css_img,less400,less900});
        parent.appendChild(contLowerMain);
    }


    advertiseLower({parent,css_col,css_row,css_img,less400,less900}:{
        parent:HTMLElement,
        css_col:string,
        css_row:string,
        css_img:string,
        less900:boolean,
        less400:boolean,

    }){
        const lowerCard=document.createElement("div");
        lowerCard.style.cssText=css_row + "padding-inline:1rem;padding-block:1rem;flex-wrap:nowrap;width:100%;position:relative;";
        lowerCard.style.flexDirection=less900 ? "column":"row";
        const imgLower=document.createElement("img");
        imgLower.style.cssText=css_img;
        imgLower.src=this.bcard;
        imgLower.alt="www.ablogroom.com";
        imgLower.style.width=less900 ? (less400 ? "300px" : "325px") : "350px";
        lowerCard.appendChild(imgLower);//APPENDING
        const lowertext=document.createElement("p");
        lowertext.innerHTML=this.assistant;
        lowertext.style.cssText="text-align:center;text-wrap:pretty;padding-inline:0.5rem;font-family:'Poppins-Thin';font-weight:bold;line-height:2.75rem;font-weight:700;";
        lowertext.style.width="100%";
        lowertext.style.fontSize=less900 ? "120%": "150%";
        lowerCard.appendChild(lowertext);//appending
        parent.appendChild(lowerCard);
        Misc.rotateIn({anchor:lowerCard,rotate:90,direction:"x",time:600});
    };


    whoIam({parent,css_col,css_row,css_img,less400,less900,phoneNum,email}:{
        parent:HTMLElement,
        css_col:string,
        css_row:string,
        css_img:string,
        less900:boolean,
        less400:boolean,
        phoneNum:string,
        email:string

    }){
        Header.cleanUpByID(parent,"whoIam-container");
        const container=document.createElement("div");
        container.id="whoIam-container";
        container.style.cssText=css_col + "padding-block:1rem;flex-wrap:nowrap;width:100%;position:relative;";
        container.style.width=less900 ? "100%":"60%";
        const para=document.createElement("p");
        para.id="para";
        para.style.cssText=css_row + "width:100%;margin-inline:auto;margiin-block:1rem;";
        para.style.flexWrap="nowrap";
        para.style.paddingInline=less900 ? "0rem":"1rem";
        para.style.display=less400 ? "flex":"block";
        para.style.lineHeight=less400 ? "auto":"3.25rem";
        para.style.flexDirection=less400 ? "column":"none";
        const profileimg=document.createElement("img");
        profileimg.style.cssText=css_img;
        profileimg.style.shapeOutside="circle(50%)";
        profileimg.style.marginRight=less900 ? (less400 ? "1rem":"1.75rem"):"2rem";
        profileimg.style.float=less400 ? "center":"left";
        profileimg.style.borderRadius="50%";
        profileimg.style.border="none";
        profileimg.style.filter="drop-shadow(0 0 0.5rem black)";
        profileimg.src=this.profileImg;
        profileimg.alt="www.ablogroom.com";
        profileimg.style.width=less900 ? (less400 ? "300px" : "325px") : "250px";
        const text=new Text(this.aboutMe);
        para.style.cssText="text-align:center;text-wrap:pretty;padding-inline:0.5rem;font-family:'Poppins-Thin';font-weight:bold;line-height:2.75rem;font-weight:700;";
        para.style.width="100%";
        para.style.fontSize=less900 ? "120%": "150%";
        para.appendChild(profileimg);//APPENDING
        para.appendChild(text);
        container.appendChild(para);
        this.signature({parent:container,css_row,css_col,phoneNum,email,less400});
        parent.appendChild(container);
        Misc.rotateIn({anchor:container,rotate:90,direction:"x",time:600});
    };
    
    signature({parent,css_row,css_col,phoneNum,email,less400}:{parent:HTMLElement,css_row:string,css_col:string,phoneNum:string,email:string,less400:boolean}){
        const rowCont=document.createElement("div");
        rowCont.id="signed-container";
        rowCont.style.cssText=css_row + "padding-block:1rem;padding-inline:0.5rem;position:relative;";
        rowCont.style.marginInline=less400 ? "auto":"170px";
        rowCont.style.flexWrap="nowrap";
        rowCont.style.maxWidth="375px";
        const signedCont=document.createElement("div");
        signedCont.id="signedCont";
        signedCont.style.cssText=css_row + "flex-wrap:nowrap;";
        const name=document.createElement("p");
        name.id="gary";
        name.style.cssText="font-family:Playwrite;font-weight:bold;padding-block:1rem;text-wrap:nowrap;"
        name.textContent="Gary Wallace, ";
        const signedImg=document.createElement("img");
        signedImg.style.cssText="width:120px;aspect-ratio:16 / 9;align-self:center;margin-bottom:1rem;border:none;";
        signedImg.src=this.signed;
        signedImg.alt=", Gary Wallace";
        // rowCont.appendChild(signedImg);
        signedCont.appendChild(name);
        rowCont.appendChild(signedCont);
        this.phoneWrapper({parent:signedCont,css_row,phoneNum});
        this.mailWrapper({parent:signedCont,css_row,email});
        parent.appendChild(rowCont);
    };

    phoneWrapper({parent,css_row,phoneNum}:{parent:HTMLElement,css_row:string,phoneNum:string}){
        const phoneAnchor=document.createElement("a");
        phoneAnchor.style.cssText=css_row + "gap:0.5rem;transform:scale(0.8);";
        const phone=document.createElement("img");
        phone.src=this.phone;
        phone.style.cssText="width:38px;filter:drop-shadow(0 0 0.5rem black);border-radius:50%;border:none;";
        const text=document.createElement("span");
        text.style.fontStyle="italic";
        text.textContent="phone";
        phoneAnchor.appendChild(phone);
        phoneAnchor.appendChild(text);
        phoneAnchor.href=`tel:${phoneNum}`;
        parent.appendChild(phoneAnchor);
    };

    mailWrapper({parent,css_row,email}:{parent:HTMLElement,css_row:string,email:string}){
        const mailAnchor=document.createElement("a");
        mailAnchor.style.cssText=css_row + "gap:0.5rem;transform:scale(0.8);";
        const mail=document.createElement("img");
        mail.src=this.email;
        mail.style.cssText="width:38px;filter:drop-shadow(0 0 0.5rem black);border-radius:50%;border:none;";
        const text=document.createElement("span");
        text.style.fontStyle="italic";
        text.textContent="email";
        mailAnchor.appendChild(mail);
        mailAnchor.appendChild(text);
        mailAnchor.href=`mailto:${email}`;
        parent.appendChild(mailAnchor);
    };


}
export default AllMsgs;
import { SiAnswer } from "react-icons/si";
import Message from "../common/message";
import Misc from "../common/misc";
import { FaCreate } from "../common/ReactIcons";
import Service from "../common/services";
import ModSelector from "../editor/modSelector";
import { blogType, messageType } from "../editor/Types";
import Header from "../editor/header";
import { buttonReturn } from "../common/tsFunctions";


class AllMsgs{
    logo:string;
    _msgs:messageType[];
    constructor(private _modSelector:ModSelector,private _service:Service,public message:Message){
        this._msgs=[];
        this.logo="/images/gb_logo.png";
    }
    get msgs(){
        return this._msgs;
    };
    set msgs(msgs:messageType[]){
        this._msgs=msgs;
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
       }
    }
    // for individual Card
    blogMsgs(item:{col:HTMLElement,blog:blogType}){
        const {col,blog}=item;
        const msgs=blog.messages ? blog.messages : [] as messageType[];
        if(blog && msgs && msgs.length>0){
            const contScroll=document.createElement("div");
            contScroll.id="blogMsgs-contScroll";
            contScroll.style.cssText="height:15vh;overflow-y:scroll;margin-block:2rem;padding:1rem;display:flex;flex-direction:column;align-items:center;gap:1rem;";
            col.appendChild(contScroll);
            msgs.map(msg=>{
                if(msg){
                    this.singleMsgTwo({col:col,contScroll:contScroll,msg,imgKey:blog.imgKey})
                }
            });
        }
    }
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
    }
    singleMsg(item:{container:HTMLElement,msg:messageType}){
        const {container,msg}=item;
        Header.cleanUpByID(container,`msg-card-${msg.id}`);
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
        Misc.starRating({parent:contStar,rating:msg.rate,cssStyle:{color:"yellow","backgroundColor":"black",padding:"1px",borderRadius:"50%","fontSize":"25px","fill":"yellow","marginInline":"0px"}});
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
       
    }
    singleMsgTwo(item:{col:HTMLElement,contScroll:HTMLElement,msg:messageType,imgKey:string|undefined}){
        const {col,contScroll,msg,imgKey}=item;
        Header.cleanUpByID(contScroll,`msg-card-${msg.id}`);
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
        Misc.starRating({parent:contStar,rating:msg.rate,cssStyle:{color:"yellow","backgroundColor":"black",padding:"1px",borderRadius:"50%","fontSize":"25px","fill":"yellow","marginInline":"0px"}});
        //APPENDING rating and contStar
        //APPENDING rating and contStar
        nameCont.appendChild(contStar);
        contScroll.appendChild(card);
        card.addEventListener("click",(e:MouseEvent)=>{
            if(e){
                this.viewCard({parent:col,msg,imgKey});
            }
        });
       
    }
   async viewCard(item:{parent:HTMLElement,msg:messageType,imgKey:string|undefined}){
        const {parent,msg,imgKey}=item;
        const container=document.createElement("div");
        container.id="viewCard-container";
        container.style.cssText ="max-width:800px;padding-inline:1rem;display:flex;flex-direction:column;place-items:center;position:absolute;border-radius:14px;box-shadow:1px 1px 10px 1px #0CAFFF,-1px -1px 10px 1px #0CAFFF;z-index:100;background-color:white;padding-block:1rem;";
        container.style.inset=window.innerWidth < 900 ? (window.innerWidth < 400 ? "30% 0% 25% 0%" : "30% 10% 25% 10%") :"30% 10% 30% 10%"
        parent.appendChild(container);
        const card=document.createElement("div");
        card.id="viewCard-card"
        card.style.cssText ="padding-inline:1rem;display:flex;justify-content:space-around;flex-wrap:nowrap;align-items:flex-start;position:relative;background-color:white;width:100%;padding-block:1rem;";
        container.appendChild(card);
        const img=document.createElement("img");
        img.id="viewCard-img";
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
        cardBody.id="viewCard-body";
        cardBody.style.cssText="width:100%; margin-inline:auto;padding:0.5rem;display:flex;flex-direction:column;justify-content:space-around;align-items:flex-start;max-height:15vh;overflow-y:scroll;position:relative;";
        card.appendChild(cardBody);
        const name=document.createElement("span");
        name.id="viewCrad-body-name";
        name.style.cssText="display:flex;flex-wrap:wrap;";
        const rate=document.createElement("div");
       rate.style.cssText="margin-inline:auto;"
        rate.id="cardBody-rate";
        Misc.starRating({parent:rate,rating:msg.rate,cssStyle:{width:"100%",padding:"1px",color:"yellow",backgroundColor:"black",borderRadius:"50%"}});
        name.innerHTML=`<span id="view-cardBody-name" style="display:flex;"><span style="color:black;font-weight:bold;">name: </span> <h6 style="font-size:18px;color:blue;margin-right:0.5rem;"> ${msg.name}</h6></span>`;
        cardBody.appendChild(rate);
        cardBody.appendChild(name);
        const mess=document.createElement("p");
        mess.id="viewCard-body-mess";
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
            }
        });

    }
    
}
export default AllMsgs;
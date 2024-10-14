import { SiAnswer } from "react-icons/si";
import Message from "../common/message";
import Misc from "../common/misc";
import { FaCreate } from "../common/ReactIcons";
import Service from "../common/services";
import ModSelector from "../editor/modSelector";
import { messageType } from "../editor/Types";
import Header from "../editor/header";


class AllMsgs{
   
    _msgs:messageType[];
    constructor(private _modSelector:ModSelector,private _service:Service,public message:Message){
        this._msgs=[];
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
        Header.cleanUpByID(parent,"non-secret-messages");
        const height=msgs.length < 3 ? 15 : 20;
        const scroll=msgs.length < 3 ? "hidden":"scroll";
        const container=document.createElement("section");
        container.id="non-secret-messages";
        container.style.cssText=`width:100%;display:flex;justify-content:flex-start;align-items:center;flex-direction:column;gap:1.25rem;height:${height}vh;overflow-y:${scroll}`;
        this.msgs.map(msg=>{
            this.singleMsg({parent,container:container,msg});
        });
        parent.appendChild(container);
       }
    }
    singleMsg(item:{parent:HTMLElement,container:HTMLElement,msg:messageType}){
        const {parent,container,msg}=item;
        Header.cleanUpByID(parent,"msg-card");
        const card=document.createElement("div");
        card.id="msg-card";
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
    
}
export default AllMsgs;
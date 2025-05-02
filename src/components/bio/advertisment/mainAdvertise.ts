import { topbarRows,topbarCats,paraIntro,paraIntroFr } from "../resume/topbarData";
import { topbarRowType,topbarCatType, catType } from "../resume/refTypes";
import styles from "./mainAdvertise.module.css";
import { FaCreate } from "@/components/common/ReactIcons";
import Resume from "../resume/resume";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaCrosshairs } from "react-icons/fa";
import { langConversion } from '../resume/engFre';
import { IconType } from "react-icons";

class MainAdvertise {
    public readonly paraIntro:string;
    public readonly paraIntroFr:string;
    public readonly resumeBuilderImg:string;
    public readonly topbarRows:topbarRowType[];
    public readonly topbarCats:topbarCatType[];

    constructor(){
        this.resumeBuilderImg="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/resumeBuilder600x433.png";
        this.topbarRows=topbarRows;
        this.topbarCats=topbarCats;
        this.paraIntro=paraIntro;
        this.paraIntroFr=paraIntroFr;
    }

    main({parent,count}:{parent:HTMLElement,count:number}):Promise<{count:number}>{
        const cont=document.createElement("section");
        cont.id="main";
        const french=false;
        this.langBtnConvert({parent:cont,french});
        
        cont.className=styles.main;
        this.header({parent:cont,french});
        this.mainLower({parent:cont,topbarRows:this.topbarRows,french});
        // const text=french ? "voyons ça !":"let see it!";
        const {button}=Resume.simpleButton({anchor:cont,bg:"black",color:"white",text:"let see it!",type:"button",time:400});
        button.id="engFrBtn";
        button.style.order="200";
        button.textContent="let see it!";
        button.style.marginBlock="2rem";
        button.onclick=(e:MouseEvent)=>{
            if(!e) return;
            const url=new URL("/bio",location.origin);
            location.href=url.href;
        };
        parent.appendChild(cont);
        if(window.scrollY){
            window.scroll(0,0);
        }
        return Promise.resolve({count:count++});
    };

    langBtnConvert({parent,french}:{parent:HTMLElement,french:boolean}){
        let _french=french;
        const langBox=document.createElement("div");
       langBox.id="lang-box";
       langBox.className=styles.langBox;
        parent.appendChild(langBox);
        const small=document.createElement("small");
        small.textContent="français";
        langBox.appendChild(small);
        langBox.onclick=(e:MouseEvent)=>{
            if(!e) return;
            if(small.textContent==="français"){
                small.textContent="english";
                _french=true;
                this.header({parent,french:_french});
                this.mainLower({parent,topbarRows:this.topbarRows,french:_french});
                const engFrBtn=parent.querySelector("button#engFrBtn") as HTMLButtonElement;
                if(!engFrBtn) return;
                const text=_french ? "voyons ça !":"let see it!";
                engFrBtn.textContent=text;
            }else{
                small.textContent="français";
                _french=false;
                this.header({parent,french:_french});
                this.mainLower({parent,topbarRows:this.topbarRows,french:_french});
                const engFrBtn=parent.querySelector("button#engFrBtn") as HTMLButtonElement;
                if(!engFrBtn) return;
                const text=_french ? "voyons ça !":"let see it!";
                engFrBtn.textContent=text;
            }
            langBox.animate([
                {transform:"rotateX(0deg) translate(-20px, 10px)"},
                {transform:"rotateX(360deg) translate(-20px, 10px)"},
            ],{duration:1000,iterations:1});
        };
        return _french
    };

    mainPopup({parent,count}:{parent:HTMLElement,count:number}):Promise<{count:number,cont:HTMLElement}>{
        if(window.scrollY){
            window.scroll(0,0);
        }
        parent.style.position="relative";
        const cont=document.createElement("section");
        cont.id="main-popup-resume-advertisement";

        cont.className=styles.mainPopup;
        this.removePopup({parent,target:cont});
        this.header({parent:cont,french:false});
        this.mainLower({parent:cont,topbarRows:this.topbarRows,french:false});
        const {button}=Resume.simpleButton({anchor:cont,bg:"black",color:"white",text:"let see it!",type:"button",time:400});
        button.style.marginBlock="2rem";
        button.onclick=(e:MouseEvent)=>{
            if(!e) return;
            const url=new URL("/bio",location.origin);
            location.href=url.href;
        };
        parent.appendChild(cont);
        return Promise.resolve({count:count++,cont}) as Promise<{count:number,cont:HTMLElement}>;
    };

    header({parent,french}:{parent:HTMLElement,french:boolean}){
        Resume.cleanUpById({parent,id:"header"});
        const header=document.createElement("header");
        header.id="header";
        header.className=styles.header;
        const headerUpperRow=document.createElement("div");
        headerUpperRow.id="headerUpperRow";
        headerUpperRow.className=styles.headerUpperRow;
        header.appendChild(headerUpperRow)
        this.imgContainerLeft({parent:headerUpperRow});
        this.containerRight({parent:headerUpperRow,topbarRows:this.topbarRows,french});
     
        parent.appendChild(header);
    };

    imgContainerLeft({parent}:{parent:HTMLElement}){
        const imgContainer=document.createElement("div");
        imgContainer.style.backgroundImage=`url(${this.resumeBuilderImg})`;
        imgContainer.className=styles.headerImgContainer;
        parent.appendChild(imgContainer);
    };

    containerRight({parent,topbarRows,french}:{parent:HTMLElement,topbarRows:topbarRowType[],french:boolean}){
        const contRight=document.createElement("div");
        contRight.className=styles.headerContRight;
        const paraIntro=document.createElement("p");
        paraIntro.id="paraIntro";
        paraIntro.className=styles.paraIntro;
        paraIntro.textContent=french  ? this.paraIntroFr :this.paraIntro;
        contRight.appendChild(paraIntro);
        parent.appendChild(contRight);
        const rightColRow=document.createElement("div");
        rightColRow.id="rightColRow";
        rightColRow.className=styles.rightColRow;
       contRight.appendChild(rightColRow);
        topbarRows.map((row,index)=>{
            if(row){
                const {cat,desc:_desc,icon,descFr}=row;
                const col=document.createElement("div");
                col.id="upper-row-col-"+ String(index);
                const name=document.createElement("h6");
                name.className="text-center text-primary my-1 mb-2 lean display-6";
                name.style.order="0";
                name.textContent=cat;
                col.appendChild(name);
                const desc=french ? descFr:_desc;
                this.showHideDesc({parent:col,order:1,desc,index});
                const iconCont=document.createElement("div");
                iconCont.className=styles.iconCont;
                FaCreate({parent:iconCont,name:icon,cssStyle:{fontSize:"45px",borderRadius:"50%",backgroundColor:"white",color:"red"}});
                col.appendChild(iconCont);
                rightColRow.appendChild(col);
            }
        });
    };

    catIcon({parent,cat,icon,french}:{parent:HTMLElement,icon:IconType,cat:catType,french:boolean}){
        const name=document.createElement("h6");
        name.className="text-center text-primary my-1 mb-2 lean display-6";
        name.textContent=french ? langConversion({key:cat}) :cat;
        parent.appendChild(name);
        const iconCont=document.createElement("div");
        iconCont.className=styles.iconCont;
        FaCreate({parent:iconCont,name:icon,cssStyle:{fontSize:"45px",borderRadius:"50%",backgroundColor:"white",color:"red"}});
        parent.appendChild(iconCont);
    };


    showHideDesc({parent,desc,order,index}:{parent:HTMLElement,desc:string,order:number,index:number}){
        const upCont=document.createElement("div");
        upCont.id="upCont";
        upCont.className=styles.showHideDescRow;
        upCont.style.order=String(order);
        const iconDivUp=document.createElement("div");
        iconDivUp.id="iconDivUp";
        const open=document.createElement("h6");
        open.textContent="open";
        open.className="text-primary text-transform-uppercase mx-1";
        FaCreate({parent:iconDivUp,name:FaArrowAltCircleUp,cssStyle:{color:"black",backgroundColor:"white",fontSize:"20px"}});
        upCont.appendChild(iconDivUp);
        upCont.appendChild(open);
        parent.appendChild(upCont);

        const downCont=document.createElement("div");
        downCont.id="downCont";
        downCont.className=styles.showHideDescRow;
        const iconDivDown=document.createElement("div");
        iconDivDown.id="iconDivDown";
        const close=document.createElement("h6");
        close.textContent="close";
        close.className="text-primary text-transform-uppercase mx-1";
        FaCreate({parent:iconDivDown,name:FaArrowAltCircleDown,cssStyle:{color:"black",backgroundColor:"white",fontSize:"20px"}});
        downCont.appendChild(iconDivDown);
        downCont.appendChild(close);
       
        parent.appendChild(downCont);

        downCont.hidden=true;
        upCont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            upCont.hidden=true;
            downCont.hidden=false;
            const para=document.createElement("p");
            para.style.order=String(order-1);
            para.id="upper-col-para-"+ String(index);
            para.className="mx-auto px-1 py-0.5";
            para.textContent=desc;
            para.style.height="20vh";
            parent.style.overflowY="scroll";
            parent.style.justifyContent="flex-start";
            parent.appendChild(para);
            para.animate([
                {height:"0vh",opacity:"0"},
                {height:"20vh",opacity:"1"},
            ],{duration:700,iterations:1});
        };
        downCont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            const getPara=parent.querySelector("p#upper-col-para-"+ String(index)) as HTMLElement;
            if(!getPara) return;
            getPara.style.height="0vh";
            getPara.style.opacity="0";
            getPara.animate([
                {height:"20vh",opacity:"1"},
                {height:"0vh",opacity:"0"},
            ],{duration:700,iterations:1});
            setTimeout(()=>{
               
                parent.removeChild(getPara);
                upCont.hidden=false;
                downCont.hidden=true;
                parent.style.overflowY="";
            },680);
        };
    };


    showHideDescLower({parent,desc,order,index}:{parent:HTMLElement,desc:string,order:number,index:number}){
        const upCont=document.createElement("div");
        upCont.id="upCont";
        upCont.className=styles.showHideDescRow;
        upCont.style.order=String(order-1);
        const iconDivUp=document.createElement("div");
        iconDivUp.id="iconDivUp";
        const open=document.createElement("h6");
        open.textContent="open";
        open.className="text-primary text-transform-uppercase mx-1";
        FaCreate({parent:iconDivUp,name:FaArrowAltCircleUp,cssStyle:{color:"black",backgroundColor:"white",fontSize:"20px"}});
        upCont.appendChild(iconDivUp);
        upCont.appendChild(open);
        parent.appendChild(upCont);

        const downCont=document.createElement("div");
        downCont.id="downCont";
        downCont.className=styles.showHideDescRow;
        downCont.style.order=String(order-1);
        const iconDivDown=document.createElement("div");
        iconDivDown.id="iconDivDown";
        const close=document.createElement("h6");
        close.textContent="close";
        close.className="text-primary text-transform-uppercase mx-1";
        FaCreate({parent:iconDivDown,name:FaArrowAltCircleDown,cssStyle:{color:"black",backgroundColor:"white",fontSize:"20px"}});
        downCont.appendChild(iconDivDown);
        downCont.appendChild(close);
        parent.appendChild(downCont);
        //---------------------------para--------------------------------//
        const paraCont=document.createElement("div");
        paraCont.id="upper-col-para-"+ String(index);
        paraCont.style.order=String(order-1);
        const para=document.createElement("p");
        para.style.order="0";
        para.id="para-"+ String(index);
        para.className="mx-auto px-1 py-0.5";
        para.textContent=desc;
        para.style.height="30vh";
        paraCont.appendChild(para);
        paraCont.style.overflowY="scroll";
        paraCont.style.justifyContent="flex-start";
        paraCont.hidden=true;
        parent.appendChild(paraCont);
        //---------------------------para--------------------------------//
        downCont.hidden=true;
        upCont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            const getPara=parent.querySelector("div#upper-col-para-"+ String(index)) as HTMLParagraphElement;
            if(!getPara) return;
            upCont.hidden=true;
            getPara.hidden=false;
            getPara.style.opacity="1";
            getPara.style.height="30vh";
            downCont.hidden=false;
            getPara.animate([
                {height:"0vh",opacity:"0"},
                {height:"30vh",opacity:"1"},
            ],{duration:700,iterations:1});
        };
        downCont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            const getPara=parent.querySelector("div#upper-col-para-"+ String(index)) as HTMLParagraphElement;
            if(!getPara) return;
            getPara.style.height="0vh";
            getPara.style.opacity="0";
            getPara.animate([
                {height:"30vh",opacity:"1"},
                {height:"0vh",opacity:"0"},
            ],{duration:700,iterations:1});
            setTimeout(()=>{
                getPara.style.animation=""
                getPara.hidden=true
                upCont.hidden=false;
                downCont.hidden=true;
                getPara.style.overflowY="";
            },680);
        };
    };

    headerLowerRow({parent}:{parent:HTMLElement,topbarRows:topbarRowType[]}){
        const lowerRow=document.createElement("div");
        lowerRow.id="headerLowerRow";
        lowerRow.className=styles.lowerRow;
       
        topbarRows.map((row,index)=>{
            if(row){
                const {cat,desc}=row;
                const col=document.createElement("div");
                col.id="upper-row-col-"+ String(index);
                const name=document.createElement("h6");
                name.className="text-center text-primary my-1 mb-2 lean display-6";
                name.textContent=cat;
                col.appendChild(name);
                const para=document.createElement("p");
                para.id="upper-col-para-"+ String(index);
                para.className="mx-auto px-1 py-0.5";
                para.textContent=desc;
                col.appendChild(para);
                lowerRow.appendChild(col);
            }
        });

        parent.appendChild(lowerRow);
    };

    mainLower({parent,french}:{parent:HTMLElement,topbarRows:topbarRowType[],french:boolean}){
        Resume.cleanUpById({parent,id:"mainLower"})
        const mainLower=document.createElement("div");
        mainLower.id="mainLower";
        mainLower.className=styles.mainLower;
        const mainLowerRow=document.createElement("div");
        mainLowerRow.id="mainLower-row";
        mainLowerRow.className=styles.mainLowerRow;
        mainLower.appendChild(mainLowerRow);
       
        topbarRows.map((row,index)=>{
            if(row){
                const {cat,desc,descFr,topbarCats,icon}=row;
                const col=document.createElement("div");
                col.id="mainLower-row-col-"+ String(index);
                this.catIcon({parent:col,cat,icon,french});
                this.divider({parent:col,width:75,position:"center"});
                const _desc=french ? descFr : desc;
                this.showHideDescLower({parent:col,order:1,desc:_desc,index});
                this.mainLowerColRow({parent:col,order:10,topbarCats,french});
                mainLowerRow.appendChild(col);
            }
        });

        parent.appendChild(mainLower);
    };

    mainLowerColRow({parent,topbarCats,order,french}:{parent:HTMLElement,topbarCats:topbarCatType[],order:number,french:boolean}){
        const lowerInnerCont=document.createElement("div");
        lowerInnerCont.id="lowerInnerCont";
        const lowerInnerColRow=document.createElement("div");
        lowerInnerColRow.id="lowerInnerColRow";
        lowerInnerColRow.style.order=String(order);
        lowerInnerColRow.className=styles.lowerInnerColCol;
        lowerInnerCont.appendChild(lowerInnerColRow)
        topbarCats.map((topbarCat,index)=>{
            if(topbarCat){
                this.lowerInnerColRowCol({parent:lowerInnerColRow,topbarCat,index,french})
            }
        });
        
        parent.appendChild(lowerInnerCont);
    };

    lowerInnerColRowCol({parent,topbarCat,index,french}:{parent:HTMLElement,topbarCat:topbarCatType,index:number,french:boolean}){
        const {cat,name,desc,descFr,textFr}=topbarCat;
        const lowerInnerColColCol=document.createElement("div");
        lowerInnerColColCol.id="lowerInnerColRowCol-" + String(index);
        lowerInnerColColCol.className=styles.lowerInnerColRowCol;
        const _name=document.createElement("h6");
        _name.className="text-center text-primary";
        _name.style.fontSize="130%";
        _name.textContent=french ? textFr:name;
        lowerInnerColColCol.appendChild(_name);
        const para=document.createElement("p");
        para.id="lowerInnerColRowCol-para";
        para.textContent=french ? descFr : desc;
        lowerInnerColColCol.appendChild(para);
        parent.appendChild(lowerInnerColColCol);
    };

    removePopup({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        const xDiv=document.createElement("div");
        xDiv.id="del-popup";
        xDiv.className=styles.removePopup;
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"18px",borderRadius:"50%",color:"white",backgroundColor:"black"}})
        target.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(!e) return;
            parent.removeChild(target);
        };
    };

    divider({parent,width,position}:{parent:HTMLElement,width:number,position:"left"|"center"|"right"}){
        const line=document.createElement("div");
        if(position==="left"){
            line.classList.add("text-left");
        }else if(position==="center"){
            line.classList.add("text-center");
        }else if(position==="right"){
            line.classList.add("text-right");
        }
        line.style.cssText=`width:${width}%;height:3px;background-color:#0d6efd;box-shadow:1px 1px 4px 1px #0d6efd,-1px -1px 4px 1px #0d6efd;margin-block:1rem;`;
        parent.appendChild(line);
    }

};

export default MainAdvertise;
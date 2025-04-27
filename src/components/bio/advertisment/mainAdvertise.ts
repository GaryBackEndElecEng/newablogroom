import { topbarRows,topbarCats,paraIntro } from "../resume/topbarData";
import { topbarRowType,topbarCatType } from "../resume/refTypes";
import styles from "./mainAdvertise.module.css";
import { FaCreate } from "@/components/common/ReactIcons";
import Resume from "../resume/resume";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaCrosshairs } from "react-icons/fa";

class MainAdvertise {
    public readonly paraIntro;
    public readonly resumeBuilderImg:string;
    public readonly topbarRows:topbarRowType[];
    public readonly topbarCats:topbarCatType[];

    constructor(){
        this.resumeBuilderImg="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/resumeBuilder600x433.png";
        this.topbarRows=topbarRows;
        this.topbarCats=topbarCats;
        this.paraIntro=paraIntro
    }

    main({parent,count}:{parent:HTMLElement,count:number}):Promise<{count:number}>{
        const cont=document.createElement("section");
        cont.id="main";
        cont.className=styles.main;
        this.header({parent:cont});
        this.mainLower({parent:cont,topbarRows:this.topbarRows});
        parent.appendChild(cont);
        return Promise.resolve({count:count++});
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
        this.header({parent:cont});
        this.mainLower({parent:cont,topbarRows:this.topbarRows});
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

    header({parent}:{parent:HTMLElement}){
        const header=document.createElement("header");
        header.id="header";
        header.className=styles.header;
        const headerUpperRow=document.createElement("div");
        headerUpperRow.id="headerUpperRow";
        headerUpperRow.className=styles.headerUpperRow;
        header.appendChild(headerUpperRow)
        this.imgContainerLeft({parent:headerUpperRow});
        this.containerRight({parent:headerUpperRow,topbarRows:this.topbarRows});
     
        parent.appendChild(header);
    };

    imgContainerLeft({parent}:{parent:HTMLElement}){
        const imgContainer=document.createElement("div");
        imgContainer.style.backgroundImage=`url(${this.resumeBuilderImg})`;
        imgContainer.className=styles.headerImgContainer;
        parent.appendChild(imgContainer);
    };

    containerRight({parent,topbarRows}:{parent:HTMLElement,topbarRows:topbarRowType[]}){
        const contRight=document.createElement("div");
        contRight.className=styles.headerContRight;
        const paraIntro=document.createElement("p");
        paraIntro.id="paraIntro";
        paraIntro.className=styles.paraIntro;
        paraIntro.textContent=this.paraIntro;
        contRight.appendChild(paraIntro);
        parent.appendChild(contRight);
        const rightColRow=document.createElement("div");
        rightColRow.id="rightColRow";
        rightColRow.className=styles.rightColRow;
       contRight.appendChild(rightColRow);
        topbarRows.map((row,index)=>{
            if(row){
                const {cat,desc,icon}=row;
                const col=document.createElement("div");
                col.id="upper-row-col-"+ String(index);
                const name=document.createElement("h6");
                name.className="text-center text-primary my-1 mb-2 lean display-6";
                name.textContent=cat;
                col.appendChild(name);
                this.showHideDesc({parent:col,desc,index});
                const iconCont=document.createElement("div");
                iconCont.className=styles.iconCont;
                FaCreate({parent:iconCont,name:icon,cssStyle:{fontSize:"45px",borderRadius:"50%",backgroundColor:"white",color:"red"}});
                col.appendChild(iconCont);
                rightColRow.appendChild(col);
            }
        });
    };

    showHideDesc({parent,desc,index}:{parent:HTMLElement,desc:string,index:number}){
        const upCont=document.createElement("div");
        upCont.id="upCont";
        upCont.className=styles.showHideDescRow;
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
            para.id="upper-col-para-"+ String(index);
            para.className="mx-auto px-1 py-0.5";
            para.textContent=desc;
            para.style.height="20vh";
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
                // Resume.cleanUpById({parent,id:"upper-col-para-"+ String(index)});
                parent.removeChild(getPara);
                upCont.hidden=false;
                downCont.hidden=true;

            },680);
        };
    }

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

    mainLower({parent}:{parent:HTMLElement,topbarRows:topbarRowType[]}){
        const mainLower=document.createElement("div");
        mainLower.id="mainLower";
        mainLower.className=styles.mainLower;
        const mainLowerRow=document.createElement("div");
        mainLowerRow.id="mainLower";
        mainLowerRow.className=styles.mainLowerRow;
        mainLower.appendChild(mainLowerRow);
       
        topbarRows.map((row,index)=>{
            if(row){
                const {cat,desc,topbarCats}=row;
                const col=document.createElement("div");
                col.id="mainLower-row-col-"+ String(index);
                const name=document.createElement("h6");
                name.className="text-center text-primary my-1 mb-2 lean display-6";
                name.textContent=cat;
                col.appendChild(name);
                const para=document.createElement("p");
                para.id="row-col-para-"+ String(index);
                para.className="mx-auto px-1 py-0.5";
                para.textContent=desc;
                col.appendChild(para);
                this.mainLowerColRow({parent:col,topbarCats});
                mainLowerRow.appendChild(col);
            }
        });

        parent.appendChild(mainLower);
    };

    mainLowerColRow({parent,topbarCats}:{parent:HTMLElement,topbarCats:topbarCatType[]}){
        const lowerInnerCont=document.createElement("div");
        lowerInnerCont.id="lowerInnerCont";
        const lowerInnerColRow=document.createElement("div");
        lowerInnerColRow.id="lowerInnerColRow";
        lowerInnerColRow.className=styles.lowerInnerColCol;
        lowerInnerCont.appendChild(lowerInnerColRow)
        topbarCats.map((topbarCat,index)=>{
            if(topbarCat){
                this.lowerInnerColRowCol({parent:lowerInnerColRow,topbarCat,index})
            }
        });
        
        parent.appendChild(lowerInnerCont);
    };

    lowerInnerColRowCol({parent,topbarCat,index}:{parent:HTMLElement,topbarCat:topbarCatType,index:number}){
        const {cat,name,desc,text}=topbarCat;
        const lowerInnerColColCol=document.createElement("div");
        lowerInnerColColCol.id="lowerInnerColRowCol-" + String(index);
        lowerInnerColColCol.className=styles.lowerInnerColRowCol;
        const _name=document.createElement("h6");
        _name.className="text-center text-primary";
        _name.style.fontSize="130%";
        _name.textContent=name;
        lowerInnerColColCol.appendChild(_name);
        const para=document.createElement("p");
        para.id="lowerInnerColRowCol-para";
        para.textContent=desc;
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
    }

};

export default MainAdvertise;
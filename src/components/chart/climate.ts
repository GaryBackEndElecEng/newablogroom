import Chart, { Color } from 'chart.js/auto';
import data from "./temperature.json";
import { lineOptionType, } from '../editor/Types';
import events from "./events.json";
import Misc from '../common/misc';

export type activityType={
    year:string,
    activities:[
        {
            name:string,
            desc:string
        }
    ]
}
export type eventType={
    events:activityType[]
}

export type optionLineType={
    type:"bar",
    data:{
        labels:string[],
        datasets:[
            {
                label:string,
                data:number[] | string[],
                borderWidth:1,
                backgroundColor:Color[],
                borderColor:Color[],
                borderRadius:10,
                
            }
        ]
    },
    options:{
        scales:{
            y:{
                beginAtZero:boolean
            }
        }
    }
}
export type dataType={
    description: {
        title: string,
        units: string,
        base_period:string,
        missing:string
    },
    data:{[key:string]:string}
}
class Climate{
    oilPic:string;
    events:eventType;
    lineOption:optionLineType;
    _data:dataType;
    _chart:Chart;
    bgColors:string[];
    bdr:string[];
    xaxis:string[];
    yaxis:string[] | number[];
    constructor(){
        this._data=data;
        this.xaxis=[];
        this.yaxis=[];
        this.convertX({data:this._data.data});
        this.convertY({data:this._data.data});
        this.events=events as eventType;
        this.oilPic="/images/climate/oilPic.png";
    }
     generateGraph(item:{parent:HTMLElement}){
        const {parent}=item;
        parent.style.position="relative";
        const label=this._data.description.title;
        const len=this.xaxis.length;
        const {bgs,bdrs}=this.gencolors({len});
        this.lineOption=this.genLineOption({xaxis:this.xaxis,yaxis:this.yaxis,bgs,bdrs,label:label});
        const convLineOption=this.lineOption as unknown as lineOptionType;
        const container=document.createElement("section");
        container.style.cssText="background-color:white;border-radius:16px;box-shadow:1px 1px 12px 1px white;padding:1rem; padding-block:2rem;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:1rem;";
        const mainTitle=document.createElement("h6");
        mainTitle.textContent="climate Change";
        mainTitle.className="text-primary text-center text-decoration-underline text-underline-offset-4 my-1 lean display-6 ";
        container.appendChild(mainTitle);
        const para=document.createElement("p");
        para.style.cssText="line-height:1.75rem;font-family:'Poppins-Regular';padding-inline:0.55rem;margin-inline:auto;";
        para.textContent="Mitigating climate change is one of the biggest challenges that confront mankind in the present millennium, where temperature rise is directly correlated to oil consumption.Analysis shows that since about 1850, the global use of fossil fuels (coal, oil and gas) has increased and dominated world energy consumption and supply.This gives you a graphical glimpse of the relationship between oil consumption and temperature rise.";
        container.appendChild(para);
        const ctx=document.createElement("canvas");
        ctx.id="climate-change";
        ctx.style.cssText="width:100%;max-width:1000px;min-height:800px;margin-inline:auto;padding-block:2rem;";
        const legend=document.createElement("small");
        legend.style.cssText="display:flex;gap:0.5rem;justify-content:center;align-items:center;box-shadow:1px 1px 12px 1px rgb(0, 127, 255);border-radius:8px;padding-block:0.25rem;padding-inline:0.75rem;background-color:black;color:white;";
        const title=document.createElement("span");
        title.textContent=this._data.description.title;
        legend.appendChild(title);
        const units=document.createElement("span");
        units.textContent=`${this._data.description.units},`;
        legend.appendChild(units);
        const range=document.createElement("span");
        range.textContent=this._data.description.base_period;
        legend.appendChild(range);
        container.appendChild(ctx);
        container.appendChild(legend);
        parent.appendChild(container);
        const getCtx=parent.querySelector("canvas#climate-change") as HTMLCanvasElement;
        new Chart(getCtx,convLineOption);
        this.showEvents({parent,events:this.events})
    }
    genLineOption(item:{xaxis:string[],yaxis:number[]|string[],bgs:string[],bdrs:string[],label:string}):optionLineType{
        const {xaxis,yaxis,label,bgs,bdrs}=item;
        return{
                type:"bar",
            data:{
                labels:xaxis,
                datasets:[
                    {
                        label:label,
                        data:yaxis,
                        borderWidth:1,
                        backgroundColor:bgs,
                        borderColor:bdrs,
                        borderRadius:10,
                        
                    }
                ]
            },
            options:{
                scales:{
                    y:{
                        beginAtZero:true
                    }
                }
            }
        }
    }
    convertX(item:{data:{[key:string]:string}}){
        const {data}=item;
        for(const key of Object.keys(data)){
            this.xaxis.push(key);
        }
    }
    convertY(item:{data:{[key:string]:string}}){
        const {data}=item;
        this.yaxis=[] as string[];
        for(const value of Object.values(data)){
            if(!isNaN(parseInt(value))){
                const int=parseInt(value);
                this.yaxis.push(value);

            }
        }
    }
    gencolors(item:{len:number}):{bgs:string[],bdrs:string[]}{
        const {len}=item;
        const bgs:string[]=[];
        const bdrs:string[]=[];
        const colors:{bg:string,bdr:string}[] = [
            {bg:"rgba(255, 99, 132, 0.2)",bdr:"rgb(255, 99, 132)"},
            {bg:"rgba(255, 159, 64, 0.2)",bdr:"rgb(255, 159, 64)"},
            {bg:"rgba(255, 205, 86, 0.2)",bdr:"rgb(255, 205, 86)"},
            {bg:"rgba(75, 192, 192, 0.2)",bdr:"rgb(75, 192, 192)"},
            {bg:"rgba(54, 162, 235, 0.2)",bdr:"rgb(54, 162, 235)"},
            {bg:"rgba(153, 102, 255, 0.2)",bdr:"rgb(54, 162, 235)" },
            {bg:"rgba(201, 203, 207, 0.2)",bdr:"rgb(201, 203, 207)" },
          ];
          const colLen=colors.length;
          const multiplier=Math.floor(len/colLen);
          let i=0;
          Array.from(Array(len).keys()).map((num,index)=>{
            if(colLen < index && index<2*colLen){
                i=1;
            }else if(2*colLen <index && index <3*colLen){
                i=2;
            }else if(3*colLen <index && index <4*colLen){
                i=3;
            }else if(4*colLen <index && index <5*colLen){
                i=4;
            }else if(5*colLen <index && index <6*colLen){
                i=5;
            }else if(6*colLen <index && index <7*colLen){
                i=6;
            }else if(7*colLen <index && index <8*colLen){
                i=7;
            }else if(8*colLen <index && index <9*colLen){
                i=8;
            }else if(9*colLen <index && index <10*colLen){
                i=9;
            }else{
                i=10;
            }
            if(num && colors[index]){
                bgs.push(colors[index].bg);
                bdrs.push(colors[index].bdr);
            }else{
                if(i===1 ){
                    const index2=index-i*colLen;
                    bgs.push(colors[index2].bg);
                    bdrs.push(colors[index2].bdr);
                }else if(i===2){
                    const index2=index-i*colLen;
                    bgs.push(colors[index2].bg);
                    bdrs.push(colors[index2].bdr);
                }else if(i===3){
                    const index2=index-i*colLen;
                    bgs.push(colors[index2].bg);
                    bdrs.push(colors[index2].bdr);
                }else if(i===4){
                    const index2=index-i*colLen;
                    bgs.push(colors[index2].bg);
                    bdrs.push(colors[index2].bdr);
                }else if(i===5){
                    const index2=index-i*colLen;
                    bgs.push(colors[index2].bg);
                    bdrs.push(colors[index2].bdr);
                }else if(i===6){
                    const index2=index-i*colLen;
                    bgs.push(colors[index2].bg);
                    bdrs.push(colors[index2].bdr);
                }else if(i===7){
                    const index2=index-i*colLen;
                    bgs.push(colors[index2].bg);
                    bdrs.push(colors[index2].bdr);
                }else if(i===8){
                    const index2=index-i*colLen;
                    bgs.push(colors[index2].bg);
                    bdrs.push(colors[index2].bdr);
                }else if(i===9){
                    const index2=index-i*colLen;
                    bgs.push(colors[index2].bg);
                    bdrs.push(colors[index2].bdr);
                }else if(i===10){
                    const index2=index-i*colLen;
                    const check=colors[index2]
                    if(check){
                        bgs.push(colors[index2].bg);
                        bdrs.push(colors[index2].bdr);

                    }
                }
            }
          });
          return {bgs,bdrs}
    }
    showEvents(item:{parent:HTMLElement,events:eventType}){
        const {parent,events}=item;
        parent.style.maxWidth="1000px";
        parent.style.position="relative";
        const container=document.createElement("section");
        container.id="showEvents-container";
        container.style.cssText="max-width:1100px;width:100%;padding:lrem;background-color:whitesmoke;border-radius:12px;box-shadow:1px 1px 12px 1px #0CAFFF;position:relative;";
        container.style.padding="1rem;";
        const oilpic=document.createElement("img");
        oilpic.style.cssText="filter:drop-shadow(0 0 0.75rem #0CAFFF);margin-inline:auto;";
        oilpic.src=this.oilPic;
        oilpic.alt="www.ablogroom.com";
        oilpic.style.width="100%";
        container.appendChild(oilpic);
        const getEvents: activityType[]=events.events;
        const row=document.createElement("row");
        row.className="row";
        row.style.cssText="background-color:white;margin-block:1rem;border-radius:inherit;display:flex;flex-wrap:wrap;align-items:center;";
        container.appendChild(row);
        parent.appendChild(container);
        getEvents.map((ev,index)=>{
            if(ev){
                const col=document.createElement("div");
                col.id=`col-${index}`;
                col.className="col-md-6";
                col.style.cssText="margin-inline:auto;margin-block:1rem;display:block;position:relative;flex:0 0 50%;border-radius:inherit;";
                const title=document.createElement("h6");
                title.className="text-center text-primary lean text-decoration-underline text-underline-offset-2";
                title.textContent=ev.year;
                const innerRow=document.createElement("div");
                innerRow.id=`innerRow-${index}`;
                innerRow.style.cssText="margin-inline:auto;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:0.5rem;";
                col.appendChild(title);
                col.appendChild(innerRow);
                row.appendChild(col);
                Misc.matchMedia({parent:container,maxWidth:900,cssStyle:{maxWidth:"850px"}});
                Misc.matchMedia({parent:container,maxWidth:700,cssStyle:{width:"650px"}});
                Misc.matchMedia({parent:container,maxWidth:400,cssStyle:{width:"350px"}});
                Misc.matchMedia({parent:col,maxWidth:900,cssStyle:{flex:"0 0 100%"}})
                ev.activities.map((act,ind)=>{
                    if(act){
                        this.showAct({row:innerRow,act,index:ind});
                    }
                });
            }
        });
        const getContainer=parent.querySelector("section#showEvents-container") as HTMLElement;
        getContainer.style.padding="1rem";
    }
    showAct(item:{row:HTMLElement,act:{name:string,desc:string},index:number}){
        const {row,act,index}=item;
        const col=document.createElement("div");
        col.className="col-md-6";
        col.id=`innerCol-${index}`;
        col.style.cssText="display:flex;flex-direction:column;justify-content:center;align-items:center;"
        const title=document.createElement("p");
        title.style.cssText="margin-inline:auto;font-size:160%;color:rgb(8, 4, 249);padding-block:0.5rem;font-family:'LobsterTwo-Regular'";
        title.textContent=act.name;
        col.appendChild(title);
        const desc=document.createElement("p");
        desc.style.cssText="margin-block:1rem;margin-inline:auto;padding-inline:0.25rem;line-height:1.75rem;font-family:'Poppins-Regular'";
        desc.textContent=act.desc;
        col.appendChild(desc);
        row.appendChild(col);
        Misc.matchMedia({parent:title,maxWidth:900,cssStyle:{fontSize:"145%"}});
        Misc.matchMedia({parent:title,maxWidth:400,cssStyle:{fontSize:"130%"}});

    }

};
export default Climate;
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import User from '../user/userMain';
import Nav from '../nav/headerNav';
import Misc from '../common/misc';
import Header from '../editor/header';
import Chart from 'chart.js/auto';
import Message from '../common/message';
import { chartType, lineOptionType, barOptionType, optionType, blogType } from '../editor/Types';
import { ChartConfiguration, ChartConfigurationCustomTypesPerDataset } from 'chart.js/auto';
import { FaCreate } from '../common/ReactIcons';
import { FaCrosshairs } from 'react-icons/fa';
import Main from '../editor/main';
import { getErrorMessage } from '@/lib/errorBoundaries';

export type barDataType={
    xaxis:number|string,yaxis:number,bg:string,bdr:string
}


class ChartJS {
    
    message:Message;
    _placement:number;
    barData:barDataType[];
    _barOption:barOptionType;
    _lineOption:lineOptionType;
    _chart:chartType;
    _charts:chartType[];
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User) {
        this._barOption=this._modSelector.barOption;
        this._placement=1;
        this._lineOption=this._modSelector.lineOption;
     this.barData = [
        { xaxis: 2010, yaxis: 10,bg:"rgba(255, 99, 132, 0.2)",bdr:"rgb(255, 99, 132)"},
        { xaxis: 2011, yaxis: 20,bg:"rgba(255, 159, 64, 0.2)",bdr:"rgb(255, 159, 64)"},
        { xaxis: 2012, yaxis: 15,bg:"rgba(255, 205, 86, 0.2)",bdr:"rgb(255, 205, 86)"},
        { xaxis: 2013, yaxis: 25,bg:"rgba(75, 192, 192, 0.2)",bdr:"rgb(75, 192, 192)"},
        { xaxis: 2014, yaxis: 22,bg:"rgba(54, 162, 235, 0.2)",bdr:"rgb(54, 162, 235)"},
        { xaxis: 2015, yaxis: 30,bg:"rgba(153, 102, 255, 0.2)",bdr:"rgb(54, 162, 235)" },
        { xaxis: 2016, yaxis: 28,bg:"rgba(201, 203, 207, 0.2)",bdr:"rgb(201, 203, 207)" },
      ];
      this._charts=[];
      this._charts=this._modSelector._charts;
      this._chart=this._modSelector._chart;
      this.message=new Message(this._modSelector,this._service,null);
    }
    //---------SETTERS/GETTERS------------//
    get placement(){
        const isPlace=localStorage.getItem("placement");
        if(isPlace){
            this._placement=parseInt(isPlace);
            return parseInt(isPlace)
        }else{
            return this._placement
        }
    }
    set placement(placement:number){
        this._placement=placement;
        localStorage.setItem("placement",String(placement));
    }
    get barOption(){
        return this._barOption;
    }
    set barOption(barOption:barOptionType){
        this._barOption=barOption;
        //adding it to localStorage
    }
    get lineOption(){
        return this._lineOption;
    }
    set lineOption(lineOption:lineOptionType){
        this._lineOption=lineOption;
        //adding it to localStorage
    }
    get chart(){
        return this._chart;
    }
    set chart(chart:chartType){
        this._chart=chart;
        this._modSelector._chart=chart;
    }
    get charts(){
        return this._charts;
    }
    set charts(charts:chartType[]){
        this._charts=charts;
        this._modSelector.charts=charts;//sending it to storage
    }
  
    //---------SETTERS/GETTERS------------//
    async showCleanChart(item:{parent:HTMLElement,chart:chartType}){
        //THIS IS SHOWN IN DISPLAY_BLOG && CHARTS;
        const {chart,parent}=item;
        await this.cleanChart({chart,parent}).then(async(res)=>{
            if(res){
                console.log("res.chart.eleId",res.chart.eleId);
                const getCtx=parent.querySelector(`canvas#${res.ctx.id}`) as HTMLCanvasElement;
                Misc.matchMedia({parent:getCtx,maxWidth:900,cssStyle:{maxwidth:"900px",width:"100%",height:"750px",minWidth:"600px"}});
                Misc.matchMedia({parent:getCtx,maxWidth:400,cssStyle:{maxWidth:"380px",height:"400px",width:"100%",minWidth:"340px"}});
                const option=JSON.parse(res.chart.chartOption as string) as barOptionType | lineOptionType;
                new Chart(getCtx,option);
            }
        });


    }
    async cleanChart(item:{parent:HTMLElement,chart:chartType}):Promise<{ctx:HTMLCanvasElement,chart:chartType}>{
        const {parent,chart}=item;
        Header.cleanUpByID(parent,chart.eleId);
        parent.style.position="relative";
        parent.style.width="100%";
        //use await + promise on ctx
        const ctx=document.createElement("canvas") as HTMLCanvasElement;
        ctx.id=chart.eleId;
        ctx.style.cssText="width:100%;maxWidth:1200px;min-width:900px;height:800px;border-radius:12px;margin-inline:auto;margin-block:2rem;padding-block:1rem;padding:1rem;margin-inline:auto;";
        ctx.style.minWidth="none";
        parent.appendChild(ctx);
        Misc.matchMedia({parent:ctx,maxWidth:900,cssStyle:{maxwidth:"900px",width:"100%",height:"750px",minWidth:"700px"}});
        Misc.matchMedia({parent:ctx,maxWidth:400,cssStyle:{maxWidth:"380px",height:"400px",minWidth:"340px"}});
        return new Promise(resolve=>{
            resolve({ctx,chart});
        }) as Promise<{ctx:HTMLCanvasElement,chart:chartType}>;
    }
    
    async viewChart(item:{parent:HTMLElement,chart:chartType}){
        const {chart,parent}=item;
        await this.asyncChart({parent,chart}).then(async(res)=>{
            if(res){
                this.removeElement({parent,divCont:res.divCont,target:res.ctx});
                const getCtx=res.divCont.querySelector(`canvas#${res.ctx.id}`) as HTMLCanvasElement;
                Misc.matchMedia({parent:getCtx,maxWidth:900,cssStyle:{maxWidth:"575px",width:"100%"}});
                Misc.matchMedia({parent:getCtx,maxWidth:400,cssStyle:{maxWidth:"340px",width:"100%"}});
                const getDivCont=parent.querySelector(`div#divCont-${chart.eleId}`) as HTMLElement;
                const option=JSON.parse(chart.chartOption as string) as barOptionType|lineOptionType;
                res.divCont.setAttribute("data-placement",String(chart.placement));
                getCtx.hidden=true;
                getDivCont.onclick=(e:MouseEvent)=>{
                    if(e){
                        getDivCont.classList.toggle("showGraph");
                    }
                };
                   await this.viewChartInner({divCont:getDivCont,option:option,getCtx:getCtx,chart});
            }
        });

       
    }
    async asyncChart(item:{parent:HTMLElement,chart:chartType}):Promise<{divCont:HTMLElement,ctx:HTMLCanvasElement}>{
        const {parent,chart}=item;
        Header.cleanUpByID(parent,`divCont-${chart.eleId}`);
        const divCont=document.createElement("div");
        divCont.style.cssText="margin-inline:auto;border-radius:20px;width:100%;position:relative;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:1rem;background-color:white;border-radius:12px;overflow-y:scroll;";
        divCont.style.height="auto";
        divCont.classList.add("eleContainer");
        divCont.id=`divCont-${chart.eleId}`;
        divCont.style.maxHeight="800px";
        divCont.style.minHeight="auto";
        const ctx=document.createElement("canvas") as HTMLCanvasElement;
        ctx.id=chart.eleId;
        ctx.style.cssText="max-width:730px;width:100%;height:100%;border-radius:12px;margin-inline:auto;margin-block:2rem;padding-block:1rem";
        divCont.appendChild(ctx);
        Misc.matchMedia({parent:ctx,maxWidth:900,cssStyle:{maxWidth:"575px",width:"100%"}});
        Misc.matchMedia({parent:ctx,maxWidth:400,cssStyle:{maxWidth:"340px",width:"100%"}});
        parent.appendChild(divCont);
        return new Promise(resolve=>{
            resolve({divCont,ctx});
        }) as Promise<{divCont:HTMLElement,ctx:HTMLCanvasElement}>;
    }
    async viewChartInner(item:{divCont:HTMLElement,getCtx:HTMLCanvasElement,option:barOptionType|lineOptionType,chart:chartType}){
        const {divCont,option,getCtx,chart}=item;
        //draw graph
        Header.cleanUpByID(divCont,"viewChartInner-view-chart-btn");
        const btnCont=document.createElement("div");
        btnCont.id="viewChartInner-view-chart-btn";
        btnCont.style.cssText="margin-block:1.5rem;margin-inline:auto;display:flex;justify-content:center;align-items:center:padding-block:1rem;gap:1rem";
        let newChart:Chart<"line" | "bar", number[], string | number>;
        const {button:open}=Misc.simpleButton({anchor:btnCont,bg:Nav.btnColor,color:"white",text:"open-graph",time:400,type:"button"});
        const {button:close}=Misc.simpleButton({anchor:btnCont,bg:Nav.btnColor,color:"white",text:"close-graph",time:400,type:"button"});
        const {button:edit}=Misc.simpleButton({anchor:btnCont,bg:"rgba(0, 34, 68,0.5)",color:"red",text:"edit-graph",time:400,type:"button"});
        divCont.appendChild(btnCont);
        divCont.style.height="auto";
        close.hidden=true;
        open.onclick=(e:MouseEvent)=>{
            if(e){
                divCont.style.maxHeight="800px";
                divCont.style.height="600px";
                getCtx.style.height="500px";
                getCtx.hidden=false;
                newChart=new Chart(getCtx,option);
                open.hidden=true;
                close.hidden=false;
                divCont.animate([
                    {opacity:"0"},
                    {opacity:"1"},
                ],{duration:400,iterations:1,"easing":"ease-in-out"});
            }
        };
        close.onclick=(e:MouseEvent)=>{
            if(e){
                newChart.destroy();
                divCont.style.maxHeight="100px";
                getCtx.style.height="10px";
                getCtx.hidden=true;
                open.hidden=false;
                close.hidden=true;
                divCont.animate([
                    {opacity:"1"},
                    {opacity:"0"},
                ],{duration:400,iterations:1,"easing":"ease-in-out"});
            }
        };
        edit.onclick=(e:MouseEvent)=>{
            if(e){
                divCont.style.maxHeight="800px";
                divCont.style.height="700px";
                getCtx.style.height="600px";
                if(!newChart){
                    newChart=new Chart(getCtx,option);
                }
               const {form,popup}= this.editGraph({divCont,option,chart});
               form.onsubmit=(e:SubmitEvent)=>{
                if(e){
                    e.preventDefault();
                    const title=option.data.datasets[0].label as string;
                    const formdata=new FormData(e.currentTarget as HTMLFormElement);
                    const xaxis=formdata.get("xaxis") as string;
                    const yaxis=formdata.get("yaxis") as string;
                    const barType=formdata.get("barType") as string;
                    console.log("xaxis",xaxis,"yaxis",yaxis,"type:",barType)
                    if(xaxis && yaxis && barType){

                        const con_xaxis=this.convertXaxis({parent:divCont,strX:xaxis});
                        const con_yaxis=this.convertYaxis({parent:divCont,strY:yaxis});
                        if(con_xaxis && con_yaxis){
                            this.barData=this.convergeBarData({xaxis:con_xaxis,yaxis:con_yaxis});
                            let barOption:barOptionType|lineOptionType;
                            let strBarOption:string="";
                            if(barType==="bar"){
                               barOption= this.bar_options({barData:this.barData,label:title}) as barOptionType
                               strBarOption=JSON.stringify(barOption);
                               newChart.destroy();
                               //DRAWING NEW CHART
                                newChart=new Chart(getCtx,barOption);
                            }else if(barType==="line"){
                                barOption= this.line_options({barData:this.barData,label:title}) as lineOptionType;
                                strBarOption=JSON.stringify(barOption);
                                newChart.destroy();
                                //DRAWING NEW CHART
                                newChart=new Chart(getCtx,barOption);
                            }
                            this.chart={...chart,chartOption:strBarOption};
                            //save
                            const remain=this._modSelector.charts.filter(chart_=>(chart_.eleId !==chart.eleId));
                            this.charts=[...remain,this.chart];
                            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                            setTimeout(()=>{
                                divCont.removeChild(popup);
                            },380);
                        }
                    }else{
                        Misc.message({parent:divCont,type_:"error",msg:`There is no xaxis,yaxis && bartType:xaxis:${JSON.stringify(xaxis)},yaxis:${JSON.stringify(yaxis)}`,time:1200});
                    }
                }
               };
            }
        };


    }
    async mainChart(injector:HTMLElement,blog:blogType){
        this._modSelector.blog={...blog};
        Misc.matchMedia({parent:injector,maxWidth:900,cssStyle:{paddingInline:"1rem"}})
        await this.mainBarChart({injector,blog});

    }
    async mainBarChart(item:{injector:HTMLElement,blog:blogType}){
        const {injector,blog}=item;
        const lenId=this.charts.length;
        Header.cleanUpByID(injector,"ctx-container-target");
        if(injector.id !=="textarea"){
            injector.style.cssText="min-height:100vh;margin-inline:auto;border-radius:20px;max-width:1000px;min-width:800px;width:100%;position:relative;display:flex;justify-content:center;align-items:center;flex-direction:column;";
        }
        Misc.matchMedia({parent:injector,maxWidth:900,cssStyle:{minWidth:"800px",maxWidth:"890px",width:"100%"}});
        Misc.matchMedia({parent:injector,maxWidth:800,cssStyle:{minWidth:"700px",maxWidth:"790px",width:"100%"}});
        Misc.matchMedia({parent:injector,maxWidth:700,cssStyle:{minWidth:"600px",maxWidth:"690px",width:"100%"}});
        Misc.matchMedia({parent:injector,maxWidth:400,cssStyle:{minWidth:"300px",maxWidth:"390px",width:"100%"}});
        const divCont=document.createElement("section");
        divCont.id="ctx-container-target";
        divCont.style.cssText="margin-inline:auto;margin-block:2rem;padding-inline:2rem; width:100%;display:flex;flex-direction:column;gap:1rem;align-items:center;justify-content:flex-start;gap:1rem;background-color:white;max-width:800px;border-radius:20px;overflow-y:scroll;height:800px;";
        const ctx=document.createElement("canvas") as HTMLCanvasElement;
        ctx.id=`ctx-graph-${lenId}`;
        ctx.style.cssText="width:100%;height:100%;max-height:400px;border-radius:12px;margin-inline:auto;margin-block:2rem;padding-block:1rem;";
        divCont.appendChild(ctx);
        Misc.matchMedia({parent:divCont,maxWidth:900,cssStyle:{width:"100%",maxWidth:"850px",height:"900px"}});
        Misc.matchMedia({parent:divCont,maxWidth:400,cssStyle:{width:"100%",maxWidth:"350px",height:"400px"}});
        injector.appendChild(divCont);
        const getCtx=document.getElementById(`ctx-graph-${lenId}`) as HTMLCanvasElement;
        if(!getCtx)return;
        Misc.matchMedia({parent:getCtx,maxWidth:900,cssStyle:{maxWidth:"890px",width:"100%",minWidth:"575px"}});
        Misc.matchMedia({parent:getCtx,maxWidth:400,cssStyle:{maxWidth:"380px",width:"100%",minWidth:"320px"}});
        this.removeElement({parent:injector,divCont,target:ctx});
        this.barGraph({parent:injector,divCont,getCtx,blog});

    }
    editGraph(item:{divCont:HTMLElement,option:barOptionType|lineOptionType,chart:chartType}):{form:HTMLFormElement,popup:HTMLElement}{
        const {divCont,option,chart}=item;
        divCont.style.position="relative";
        //get data=> display data stringify in intp
        this.barData=this.convertToBarLineOption({option});
        const popup=document.createElement("div");
        popup.id="edit-graph-popup";
        popup.classList.add("popup");
        popup.style.cssText="position:absolute;width:300px;height:350px;padding:1rem;border-radius:12px;backdrop-filter:blur(20px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;";
        popup.style.inset="0% 35% 0% 35%";
        const form=document.createElement("form");
        form.style.cssText="width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;";
        const {input:xaxis,label:xlabel}=Nav.inputComponent(form);
        xaxis.id="xaxis";
        xaxis.name="xaxis";
        xaxis.value=JSON.stringify(this.barData.map(data=>(data.xaxis)));
        xlabel.setAttribute("for",xaxis.id);
        xlabel.textContent="xaxis-labels";
        const {input:yaxis,label:ylabel}=Nav.inputComponent(form);
        yaxis.id="xaxis";
        yaxis.name="yaxis";
        yaxis.value=JSON.stringify(this.barData.map(data=>(data.yaxis)));
        ylabel.setAttribute("for",yaxis.id);
        ylabel.textContent="xaxis-labels";
        const selects=[{name:"select",value:""},{name:"bar",value:"bar"},{name:"line",value:"line"}];
        const {select,label:labelSel}=Misc.selectComponent({parent:form,name:"graph type",selects,cssStyle:{backgroundColor:"black",color:"white"}});
        select.name="barType";
        select.id="barTpe";
        select.value=chart.type;
        labelSel.setAttribute("for",select.id);
        select.value=chart.type;
        Misc.simpleButton({anchor:form,type:"submit",bg:Nav.btnColor,color:"white",time:400,text:"submit"});
        popup.appendChild(form);
        divCont.appendChild(popup);
        Misc.matchMedia({parent:popup,maxWidth:900,cssStyle:{inset:"0% 30% 0% 30%"}});
        Misc.matchMedia({parent:popup,maxWidth:400,cssStyle:{inset:"0% 10% 0% 10%"}});
        Misc.growIn({anchor:popup,scale:0,opacity:0,time:400});
        return {popup,form}
      
    }
    async barGraph(item:{parent:HTMLElement,divCont:HTMLElement,getCtx:HTMLCanvasElement,blog:blogType}){
        const {parent,divCont,getCtx,blog}=item;
        let chart:Chart<"bar", number[], string | number>|Chart<"line", number[], string | number>
        divCont.style.position="relative";
        const option=this.bar_options({barData:this.barData,label:"add your data"}) as unknown as optionType;
        await this.addChart({divCont,Ctx:getCtx,option,blog}).then(async(res)=>{
            if(res){
                this.barOption=res.option as barOptionType;
                chart=new Chart(res.Ctx,this.barOption)
                res.divCont.setAttribute("data-placement",String(this.placement));
                this.removeElement({parent,divCont:res.divCont,target:res.Ctx})
            }
        });
        const btnContainer=document.createElement("div");
        btnContainer.id="btnContainer";
        btnContainer.style.cssText="margin-inline:auto;margin-block:1rem;display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center;align-items:center;";
        const btnView=document.createElement("div");
        btnView.id="btnContainer";
        btnView.style.cssText="margin-inline:auto;margin-block:1rem;display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center;align-items:center;";
        const {button:openForm}=Misc.simpleButton({anchor:btnContainer,bg:"black",color:"white",time:400,type:"button",text:"open form"});
        openForm.onclick=(e:MouseEvent)=>{
            if(e){
                done.hidden=false;
                const {form,popup}=this.optionForm({divCont});
                form.onsubmit=async(e:SubmitEvent)=>{
                    if(e){
                        e.preventDefault();
                        const formdata=new FormData(e.currentTarget as HTMLFormElement);
                        const xaxis=formdata.get("xaxis") as string;
                        const yaxis=formdata.get("yaxis") as string;
                        const graphType=formdata.get("graphType") ? formdata.get("graphType") as string :"bar";
                        const label=formdata.get("label") ? formdata.get("label") as string :"add your label";
                        if(xaxis && yaxis){
                            //convert yaxis from string=>number[]
                            // console.log("xaxis",xaxis,"yaxis",yaxis);//works
                            const yaxisSet=this.convertYaxis({parent:divCont,strY:yaxis});
                            const xaxisSet=this.convertXaxis({parent:divCont,strX:xaxis});
                            // console.log("yaxisSet",yaxisSet,"xaxisSet",xaxisSet)//works
                            if(yaxisSet && xaxisSet){
                            const barData=this.convergeBarData({xaxis:xaxisSet,yaxis:yaxisSet});
                            // console.log("this.barData",this.barData)//works
                                if(barData){
                                    Header.cleanUp(getCtx);
                                    //redo graph
                                    if(graphType==="bar"){
                                        const option_=this.bar_options({barData:barData,label}) as unknown as optionType;
                                        await this.addChart({divCont,Ctx:getCtx,option:option_,blog}).then(async(res)=>{
                                            if(res){
                                                chart.destroy();
                                                this.barOption=res.option as barOptionType
                                                chart= new Chart(res.Ctx,this.barOption);
                                                res.divCont.onclick=(e:MouseEvent)=>{
                                                    if(e){
                                                        divCont.classList.toggle("showGraph");
                                                    }
                                                };
                                            }
                                        });

                                    }else if(graphType==="line"){
                                        const _option=this.line_options({barData:barData,label}) as unknown as optionType;
                                        console.log("_option",_option);
                                        await this.addChart({divCont,Ctx:getCtx,option:_option,blog}).then(async(res)=>{
                                            if(res){
                                                chart.destroy();
                                                this.lineOption=res.option as lineOptionType;
                                                chart= new Chart(res.Ctx,this.lineOption);
                                                // console.log("chart",chart);
                                                res.divCont.onclick=(e:MouseEvent)=>{
                                                    if(e){
                                                        divCont.classList.toggle("showGraph");
                                                    }
                                                };
                                            }
                                        });
                                    }
                                 //saving it to modSelector
                            
                                    Misc.blurIn({anchor:getCtx,blur:"12px",time:600});
                                }
                            }
                            Misc.growOut({anchor:popup,scale:0,opacity:0,time:400});
                            setTimeout(()=>{
                                divCont.removeChild(popup);
                            },390);
                        }
                    }
                };
            }
        };
        const {button:hide}=Misc.simpleButton({anchor:btnView,bg:"black",color:"white",time:400,type:"button",text:"hide"});
        hide.hidden=true;
        const {button:view}=Misc.simpleButton({anchor:btnView,bg:"black",color:"white",time:400,type:"button",text:"view"});
        view.hidden=true;
        const {button:done}=Misc.simpleButton({anchor:btnContainer,bg:"black",color:"white",time:400,type:"button",text:"done!"});
        done.onclick=(e:MouseEvent)=>{
            if(e){
                const url=new URL(window.location.href);
                const pathname=url.pathname;
                const user=this._user.user;
                const _blog=this._modSelector.blog;
                this.charts=_blog.charts ? _blog.charts :[] as chartType[]
                if(pathname !=="/editor" && this.charts.length>0){
                    this.message.chartmessage(divCont,this.charts);
                }else if(pathname==="/editor"){
                    if(user && user.id && blog.name && user.email){
                        // console.log(user,blog)
                        const _blog={...blog,user_id:user.id,name:blog.name};
                        const getBtnCont=divCont.querySelector("div#btnContainer") as HTMLElement;
                                Misc.growOut({anchor:getBtnCont,scale:0,opacity:0,time:400});
                                setTimeout(()=>{
                                    divCont.removeChild(getBtnCont);
                                    getCtx.style.height="auto";
                                    divCont.style.height="auto";
                                    view.hidden=true;
                                    hide.hidden=false;
                                },390);
                    }
                }
            }
        };
        //SEEN AFTER SAVED
        view.onclick=(e:MouseEvent)=>{
            if(e){
                getCtx.style.width="100%";
                getCtx.style.height="600px";
                getCtx.hidden=false;
                Misc.growIn({anchor:getCtx,scale:0,opacity:0,time:400});
                view.hidden=true;
                hide.hidden=false;
                setTimeout(()=>{
                    getCtx.style.width="100%";
                    getCtx.style.height="600px";
                },0);
            }
        };
        hide.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.growOut({anchor:getCtx,scale:0,opacity:0,time:400});
                setTimeout(()=>{
                    getCtx.hidden=true;
                },390);
                view.hidden=false;
                hide.hidden=true;
            }
        };
        //SEEN AFTER SAVED
        divCont.appendChild(btnContainer);
        divCont.appendChild(btnView);
    }
    bar_options(item:{barData:barDataType[],label:string}):barOptionType{
        const {barData,label}=item;
        
        return {
            type:"bar",
            data:{
                labels:barData.map(row=>(String(row.xaxis))),
                datasets:[
                    {
                        label:label,
                        data:barData.map(row=>(row.yaxis)),
                        borderWidth:1,
                        backgroundColor:barData.map(row=>(row.bg)),
                        borderColor:barData.map(row=>(row.bdr)),
                        borderRadius:12,
                        
                    }
                ]
            },
            options:{
                scales:{
                    y:{
                        beginAtZero:false
                    }
                }
            }
        }

    }
    line_options(item:{barData:barDataType[],label:string}):lineOptionType{
        const {barData,label}=item;
        
        return {
            type:"line",
            data:{
                labels:barData.map(row=>(String(row.xaxis))),
                datasets:[
                    {
                        label:label,
                        data:barData.map(row=>(row.yaxis)),
                        borderWidth:1,
                        backgroundColor:barData.map(row=>(row.bg)),
                        borderColor:barData.map(row=>(row.bdr)),
                        
                    }
                ]
            },
            options:{
                scales:{
                    y:{
                        beginAtZero:false
                    }
                }
            }
        }

    }
    optionForm(item:{divCont:HTMLElement}):{form:HTMLFormElement,popup:HTMLElement}{
        //async and returns form
        const {divCont}=item;
        divCont.style.position="relative";
        const popup=document.createElement("div");
        popup.id="popup-bar-form";
        popup.style.cssText="margin:auto;position:absolute;inset:20% 10% -50% 10%;backdrop-filter:blur(10px);display:flex;justify-content:flex-start;align-items:center;flex-direction:column;padding:1rem;padding-block:2rem;";
        const form=document.createElement("form");
        form.id="bar-form";
        form.style.cssText="width:100%;margin:auto;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:1.25rem";
        const {input:label,label:lLabel}=Nav.inputComponent(form);
        label.type="string";
        label.id="label";
        label.name="label";
        lLabel.setAttribute("for",label.id);
        lLabel.textContent="graph title";
        label.placeholder="add your title";
        const {input:xaxis,label:lxaxis}=Nav.inputComponent(form);
        xaxis.type="string";
        xaxis.id="xaxis";
        xaxis.name="xaxis";
        lxaxis.setAttribute("for",xaxis.id);
        lxaxis.textContent="horizontal data";
        xaxis.placeholder="data1,data2,data3,,,";
        const {input:yaxis,label:lyaxis}=Nav.inputComponent(form);
        yaxis.type="string";
        yaxis.id="yaxis";
        yaxis.name="yaxis";
        lyaxis.setAttribute("for",yaxis.id);
        lyaxis.textContent="vertical data";
        yaxis.placeholder="data1,data2,data3,,,";
        const graphTypes=[{name:"select",value:""},{name:"bar",value:"bar"},{name:"line",value:"line"},]
        const {select,label:slabel,formGrp:sGrp}=Misc.selectComponent({parent:form,name:"graph types",selects:graphTypes,cssStyle:{backgroundColor:"black",color:"white"}});
        select.id="graphType";
        select.name="graphType";
        slabel.textContent="bar or line";
        slabel.setAttribute("for",select.id);
        select.selectedIndex=0;
        const {button}=Misc.simpleButton({anchor:form,type:"submit",bg:Nav.btnColor,color:"white",time:400,text:"submit"});
        button.disabled=true;
        yaxis.onchange=(e:Event)=>{
            if(e){
                const yValue=(e.currentTarget as HTMLInputElement).value;
                const xValue=(yaxis as HTMLInputElement).value;
                if(xValue && yValue){
                    button.disabled=false;
                }
            }
        };
        popup.appendChild(form);
        divCont.appendChild(popup);
        Misc.growIn({anchor:popup,scale:0,opacity:20,time:400});
        return {form,popup}


    }
    convertToBarLineOption(item:{option:barOptionType|lineOptionType}):barDataType[]{
        const {option}=item;
        let option_:optionType=option as unknown as optionType;
        option_=option as unknown as optionType;
        const labels=option.data.labels;
        const numbers=option.data.datasets[0].data;
        const check=( labels && labels.length>0 && numbers && numbers.length>0)?true:false;
        if(check && labels){
            return this.convergeBarData({xaxis:labels as string[],yaxis:numbers})
        }
        return [] as barDataType[]
    }
    
    convertYaxis(item:{parent:HTMLElement,strY:string}):void | number[]{
        const {parent,strY}=item;
        const yaxisNum:number[]=[];
        if(strY){
            const yaxisStr:string[]=strY.split(",");
            const leny=yaxisStr.length;
            yaxisStr[0]=yaxisStr[0].split("[")[1];
            yaxisStr[leny-1]=yaxisStr[leny-1].split("]")[0];
            const checkComma=yaxisStr.length && yaxisStr.length>0 ?true:false;
            if(checkComma){
                yaxisStr.map(str=>{
                    if(str){
                        const isNum=isNaN(parseInt(str)) ? false:true;
                        if(isNum){
                            yaxisNum.push(parseInt(str));
                        }
                    }
                });
                return yaxisNum;
            }else{
                return Misc.message({parent,type_:"error",msg:"There is no Y data,,it can not be done",time:800});
            }
        }else{
            return Misc.message({parent,type_:"error",msg:"there is no string: null!",time:800});
        }
    }
    convertXaxis(item:{parent:HTMLElement,strX:string}):void | string[]{
        const {parent,strX}=item;
        if(strX){
            const yaxisStr:string[]=strX.split(",");
            const leny=yaxisStr.length;
            if(yaxisStr[0].split("[")[1]){
                yaxisStr[0]=yaxisStr[0].split("[")[1];
            }
            if(yaxisStr[leny-1].split("]")[0]){
                yaxisStr[leny-1]=yaxisStr[leny-1].split("]")[0];
            }
            const checkComma=yaxisStr.length && yaxisStr.length>0 ?true:false;
            if(checkComma){
                return yaxisStr;
            }else{
                return Misc.message({parent,type_:"error",msg:"There is no Label data,,it can not be done",time:800});
            }
        }else{
            return Misc.message({parent,type_:"error",msg:"There is no strX=>null",time:800});
        }
    }
    convergeBarData(item:{xaxis:number[]|string[],yaxis:number[]}):barDataType[]{
        const {xaxis,yaxis}=item;
        const lenx=xaxis.length
        const bgColors=this.barData.map(row=>(row.bg));
        const bdrColors=this.barData.map(row=>(row.bdr));
        const combineCols=this.generatColors({bg:bgColors,bdr:bdrColors,qty:lenx});
        const arr:barDataType[]=[]
        yaxis.map((data,index)=>{
            if(data && combineCols[index]){
                arr.push({xaxis:xaxis[index],yaxis:data,bg:combineCols[index].bg,bdr:combineCols[index].bdr});
            }
           
        });
        return arr;
    }
    generatColors(item:{bg:string[],bdr:string[],qty:number}):{bg:string,bdr:string}[]{
        const {bg,bdr,qty}=item;
        const arr:{bg:string,bdr:string}[]=[];
        const numArr=Math.round(qty/bg.length);
        if(numArr>0){
            Array.from(Array(numArr).keys()).map(()=>{
                bg.map((col,index)=>{
                    if(col){
                        arr.push({bg:col,bdr:bdr[index]});
                    }
                });
                
            });
        }else{
            bg.map((col,index)=>{
                arr.push({bg:col,bdr:bdr[index]});
            });
        }
        return arr;
    }
    removeElement(item:{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement}){
        const {parent,divCont,target}=item;
        const xDiv=document.createElement("div");
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-20px,10px);padding:0.25rem;border-radius:50%;background-color:black;color:white;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"18px",borderRadius:"50%"}});
        divCont.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
                Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    this._modSelector._charts.map((chart,index)=>{
                        // console.log("outside:side:eleId",chart.eleId,"targetId",target.id)//works
                        if(chart.eleId===target.id){
                            this._modSelector._charts.splice(index,1);
                            this._modSelector.shiftPlace(chart.placement);
                            this.placement=this.placement - 1;
                            this._modSelector.charts=this._modSelector._charts;
                            parent.removeChild(divCont);
                           this.placement=this.placement;
                        }
                        
                    })
                },390);
            }
        };
    }
   async addChart(item:{divCont:HTMLElement,Ctx:HTMLCanvasElement,option:optionType,blog:blogType}):Promise<{option:optionType,divCont:HTMLElement,Ctx:HTMLCanvasElement}>{
        const {divCont,Ctx,option,blog}=item;
        const maxcount=ModSelector.maxCount(blog);
        this.placement=maxcount + 1;
        localStorage.setItem("placement",String(maxcount + 1));
        const remainder=blog.charts ? blog.charts.filter(ctx=>(ctx.eleId !==Ctx.id)) : [] as chartType[];
        const foundChart=blog.charts ? blog.charts.find(ctx=>(ctx.eleId ===Ctx.id)) : undefined;
        let eleId:string;
        let chart:chartType;
        const len=blog.charts ? blog.charts.length :0;
        if(!foundChart){
            const rand=Math.round(Math.random()*100);
            eleId=`ctx-chart-${rand}`;
            divCont.id=`divCont-ctx-chart-${rand}`;
            Ctx.id=eleId;
            chart={
                id:len,
                type:option.type,
                eleId,
                placement:this.placement,
                chartOption:JSON.stringify(option) as string,
                blog_id:blog.id
            };
            divCont.setAttribute("data-placement",`${String(maxcount+1)}-A`);
            // console.log("maxcount",maxcount);
            this.placement=this.placement + 1;
        }else{
            chart=foundChart
            chart.chartOption=JSON.stringify(option) as string;
        }
        this._modSelector.charts=[...remainder,chart];
        return new Promise((resolve)=>{
            resolve({option,divCont,Ctx});
        }) as Promise<{option:optionType,divCont:HTMLElement,Ctx:HTMLCanvasElement}>;
    }
    static setGenerator(item:{count:number}):{xaxis:string[],yaxis:number[]}{
        const {count}=item;
        const arrx:string[]=[];
        const arry:number[]=[];
        Array.from(Array(count).keys()).map(num=>{
            const numYRand=Math.round(Math.random()*1000);
            const strX=`${num}-label`;
            arrx.push(strX);
            arry.push(numYRand);
        });
        return {xaxis:arrx,yaxis:arry}
    }

}
export default ChartJS;


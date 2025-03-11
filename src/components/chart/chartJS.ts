import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import User from '../user/userMain';
import Nav from '../nav/headerNav';
import Misc from '../common/misc';
import Header from '../editor/header';
import Chart from 'chart.js/auto';
import Message from '../common/message';
import { chartType, lineOptionType, barOptionType, optionType, blogType, arrDivContType } from '../editor/Types';
import { FaCreate } from '../common/ReactIcons';
import { FaCrosshairs } from 'react-icons/fa';
import { idValueType } from '@/lib/attributeTypes';

export type barDataType={
    xaxis:number|string,yaxis:number,bg:string,bdr:string
}


class ChartJS {
    
    _placement:number;
    barData:barDataType[];
    _barOption:barOptionType;
    _lineOption:lineOptionType;
    _chart:chartType;
    _charts:chartType[];
    constructor(private _modSelector:ModSelector,private _service:Service,private _user:User,private message:Message) {
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
      this._charts=this._modSelector.charts;
      this._chart=this._modSelector.chart;
      
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
        this._modSelector.chart=chart;
        this._modSelector.localStore({blog:this._modSelector.blog});
    }
    get charts(){
        return this._charts;
    }
    set charts(charts:chartType[]){
        this._charts=charts;
        this._modSelector.charts=charts;//sending it to storage
    }
  
    //---------SETTERS/GETTERS------------//
    async showCleanChart(item:{parent:HTMLElement,chart:chartType}): Promise<{
        divCont: HTMLElement;
        placement: number;
        target:HTMLCanvasElement;
    } | undefined>{
        //THIS IS SHOWN IN DISPLAY_BLOG && CHARTS;
        const {chart,parent}=item;

        return await this.cleanChart({chart,parent}).then(async(res)=>{
            if(res){
                
                // console.log("getCtx",getCtx)//works
                Misc.matchMedia({parent:res.target,maxWidth:900,cssStyle:{maxwidth:"900px",width:"100%",height:"750px",minWidth:"600px"}});
                Misc.matchMedia({parent:res.target,maxWidth:400,cssStyle:{maxWidth:"380px",height:"400px",width:"100%",minWidth:"340px"}});
                // const option=JSON.parse(res.chart.chartOption as string) as barOptionType | lineOptionType;
                // console.log("OPTION",option);//works
                //CHART RETURNS THE CHART:const isChart= new Chart(getCtx,option);
                // console.log(isChart)//works
                return {divCont:res.divCont,placement:chart.placement,target:res.target}
            }
        });


    };


    async cleanChart(item:{parent:HTMLElement,chart:chartType}):Promise<{target:HTMLCanvasElement,chart:chartType,divCont:HTMLElement}>{
        const {parent,chart}=item;
        Header.cleanUpByID(parent,chart.eleId);
        const divCont=document.createElement("div");
        divCont.id="divCont-cleanChart";
        divCont.style.cssText="width:100%;max-width:1000px;display:flex;flex-direction:column;justify-content:center;align-items:center;";
        parent.style.position="relative";
        parent.style.width="100%";
        //use await + promise on ctx
        const ctx=document.createElement("canvas") as HTMLCanvasElement;
        ctx.id=chart.eleId;
        ctx.style.cssText="min-width:350px;width:694px;maxWidth:1200px;height:800px;min-height:496px;border-radius:12px;margin-inline:auto;margin-block:2rem;padding-block:1rem;padding:1rem;margin-inline:auto;";
        ctx.style.width="100%";
        divCont.appendChild(ctx);
        parent.appendChild(divCont);
        Misc.matchMedia({parent:ctx,maxWidth:900,cssStyle:{maxwidth:"900px",width:"100%",height:"750px",minWidth:"700px"}});
        Misc.matchMedia({parent:ctx,maxWidth:400,cssStyle:{maxWidth:"380px",height:"400px",minWidth:"340px"}});
        return Promise.resolve({target:ctx,chart,divCont}) as Promise<{target:HTMLCanvasElement,chart:chartType,divCont:HTMLElement}>;
    };

    
    async viewChart(item:{parent:HTMLElement,chart:chartType,idValues:idValueType[]}){
        const {chart,parent,idValues}=item;
        return await this.asyncChart({parent,chart,idValues}).then(async(res)=>{
            if(res){
                
                Misc.matchMedia({parent:res.ctx,maxWidth:900,cssStyle:{maxWidth:"575px",width:"100%"}});
                Misc.matchMedia({parent:res.ctx,maxWidth:400,cssStyle:{maxWidth:"340px",width:"100%"}});
                const option=JSON.parse(res.chart.chartOption as string) as barOptionType|lineOptionType;
                res.divCont.setAttribute("data-placement",String(chart.placement));
                const arrDiv= await this.viewChartInner({parent,divCont:res.divCont,option:option,getCtx:res.ctx,chart});
                   return arrDiv
            }
        });

       
    };


    async asyncChart({parent,chart,idValues}:{parent:HTMLElement,chart:chartType,idValues:idValueType[]}):Promise<{divCont:HTMLElement,ctx:HTMLCanvasElement,chart:chartType,idValues:idValueType[]}>{
       
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        Header.cleanUpByID(parent,`divCont-${chart.eleId}`);
        const divCont=document.createElement("div");
        const width=less900 ? (window.innerWidth < 600 ? (less400 ? "340px":"500px") : "600px") : "730px";
        divCont.style.cssText=`max-width:${width};aspect-ratio:1 /1;margin-inline:auto;border-radius:20px;width:100%;position:relative;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:1rem;background-color:white;border-radius:12px;overflow-y:scroll;`;
        divCont.style.minHeight=less900 ? (less400 ? "200px":"300px"):"400px;";
        divCont.style.maxHeight=less900 ? (less400 ? "600px":"500px"):"470px;";
        divCont.style.height=less900 ? (less400 ? "430px !important":"400px !important"):"470px !important";
        divCont.style.maxWidth=width;
        divCont.style.width=width;
        divCont.classList.add("eleContainer");
        divCont.id=`divCont-${chart.eleId}`;
        const ctx=document.createElement("canvas") as HTMLCanvasElement;
        ctx.id=chart.eleId;
        ctx.style.cssText=`max-width:${width};width:100%;aspect-ratio:1/1;border-radius:12px;margin-inline:auto;margin-block:2rem;padding-block:1rem`;
        ctx.style.maxWidth=width
        divCont.appendChild(ctx);
        const {idValues:retIdValues}=this._modSelector.dataset.coreChartIdValues({target:ctx,idValues,chart,clean:true})
        idValues=retIdValues;
        return Promise.resolve({divCont,ctx,chart,idValues}) as Promise<{divCont:HTMLElement,ctx:HTMLCanvasElement,chart:chartType,idValues:idValueType[]}>;
    };


    async viewChartInner(item:{parent:HTMLElement,divCont:HTMLElement,getCtx:HTMLCanvasElement,option:barOptionType|lineOptionType,chart:chartType}){
        const {divCont,option,getCtx,chart,parent}=item;
        //draw graph
        Header.cleanUpByID(divCont,"viewChartInner-view-chart-btn");
        const btnCont=document.createElement("div");
        btnCont.id="viewChartInner-view-chart-btn";
        btnCont.style.cssText="margin-block:1.5rem;margin-inline:auto;display:flex;justify-content:center;align-items:center:padding-block:1rem;gap:1rem";
        let newChart:Chart<"line" | "bar", number[], string | number>= {} as Chart<"line" | "bar", number[], string | number> ;
        const {button:open}=Misc.simpleButton({anchor:btnCont,bg:Nav.btnColor,color:"white",text:"open-graph",time:400,type:"button"});
        const {button:close}=Misc.simpleButton({anchor:btnCont,bg:Nav.btnColor,color:"white",text:"close-graph",time:400,type:"button"});
        const {button:edit}=Misc.simpleButton({anchor:btnCont,bg:"rgba(0, 34, 68,0.5)",color:"red",text:"edit-graph",time:400,type:"button"});
        divCont.appendChild(btnCont);
        divCont.style.height="auto";
        close.hidden=true;
        open.onclick=(e:MouseEvent)=>{
            if(e){
                divCont.style.maxHeight="800px";
                divCont.style.aspectRatio="auto";
                divCont.style.height="600px";
                getCtx.style.height="500px";
                getCtx.hidden=false;
                newChart=new Chart(getCtx,option);
                this.removeElement({parent,divCont:divCont,target:getCtx,chart:newChart});
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
                divCont.style.aspectRatio="auto";
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
                newChart.destroy();
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
                            this._modSelector.localStore({blog:this._modSelector.blog});
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

        const arrDiv:arrDivContType={divCont,placement:chart.placement,target:getCtx,isNormal:false,ele:null,chart:chart,sel:null};
        return Promise.resolve(arrDiv) as Promise<arrDivContType>
    
    };

        //INJECTION POINT
    async mainChart({injector,blog,idValues}:{injector:HTMLElement,blog:blogType,idValues:idValueType[]}){
        this._modSelector.blog={...blog};
        return await this.titlePage({container:injector,time:1200}).then(async(res)=>{
            if(res){
               return await this.mainBarChart({injector,blog,idValues}).then((inject)=>{
                    if(inject){
                        res.textContainer.style.opacity="1";
                        res.textContainer.style.width="100%";
                        res.para.style.opacity="1";
                        res.para.style.marginTop="1rem";
                        res.para.style.transform="translateX(0%)";
                        res.textContainer.animate([
                            {transform:"translateY(-100%)",opacity:"0"},
                            {opacity:"1"},
                        ],{duration:res.time,iterations:1,"easing":"ease-in-out"});
                        res.para.animate([
                            {transform:"translateX(-75%)",opacity:"0.3",color:"white"},
                            {opacity:"1",color:res.para.style.color},
                        ],{duration:res.time + 700,iterations:1,"easing":"ease-in-out"});
                        return inject;
                    }
                });
            

            }
        });

    };
   

    async sleep({ms}:{ms:number}):Promise<()=>boolean>{
        return Promise.resolve(()=>{setTimeout(()=>{return true},ms)}) as Promise<()=>boolean>;
    };


    //FROM SIDEBAR MENU: INJECTION
    async editorChart(injector:HTMLElement,blog:blogType,idValues:idValueType[]){
        this._modSelector.blog={...blog};
        await this.mainBarChart({injector,blog,idValues});

    };


   async titlePage(item:{container:HTMLElement,time:number}):Promise<{textContainer:HTMLElement,container:HTMLElement,para:HTMLElement,time:number}>{
        const {container,time}=item;
        const less900=window.innerWidth < 900;
        const less400=window.innerWidth < 400;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;justify-content:center;align-items:center;";
        const textContainer=document.createElement("div");
        textContainer.id="chart-titlepage-textContainer";
        textContainer.style.cssText=css_col + "background-color:black;border-radius:12px;margin-top:1rem;filter:drop-shadow(0 0 0.5rem white);width:100%;";
        textContainer.style.width=less900 ? (less400 ? "100%":"80%") : "70%";
        textContainer.style.paddingBottom=less900 ? (less400 ? "2rem":"2.5rem") : "2rem";
        textContainer.style.paddingInline=less900 ? "1rem" : "2rem";
        await this.leftEllipe({parent:textContainer,less400,less900}).then(async(res)=>{
            if(res){
                res.ellipseL.animate([
                    {clipPath:"ellipse(180px 190px at -7% -19%)"},
                    {clipPath:"ellipse(80px 90px at -7% -19%)"},
                ],{duration:3*time,iterations:1,"easing":"ease-in-out"});
                res.ellipseR.animate([
                    {clipPath:"ellipse(190px 180px at 107% 119%)"},
                    {clipPath:"ellipse(90px 80px at 107% 119%)"},
                ],{duration:3*time,iterations:1,"easing":"ease-in-out"});
            }
        });
        const text=document.createElement("p");
        text.id="container-mainTitle";
        text.className=" text-center  my-2 mb-4 mx-auto lean";
        text.style.cssText="margin-bottom:1.62rem;background:linear-gradient(180deg, #fff, #0668f7);background-clip:text;-webkit-background-clip:text;color:transparent;";
        text.style.fontSize=less900 ? (less400 ? "200%":"300%"):"375%";
        text.textContent="Create Your Graph";
        text.id="showBlogs-title";
        text.style.textTransform="capitalize";
        const div1=document.createElement("div");
        div1.id="textContainer-div1";
        const dividerStyle="background-clip:border-box;-webkit-background-clip:border-box;background:linear-gradient(180deg, #fff, #0668f7);"
        div1.style.cssText="margin-inline:auto;width:85%;height:3px;filter:drop-shadow(0 0 0.25rem blue);" + dividerStyle;
        div1.style.height=less900 ? (less400 ? "5px":"8px"):"9px";
       
        const div2=document.createElement("div");
        div2.id="textContainer-div1";
        div2.className="lineStyleOne";
        div2.style.cssText="margin-block;margin-inline:auto;width:55%;height:3px;filter:drop-shadow(0 0 0.25rem blue);" + dividerStyle;
        div2.style.height=less900 ? (less400 ? "5px":"8px"):"9px";
        const para=document.createElement("p");
        para.id="textContainer-para";
        para.textContent="for you to test and play with.";
        para.style.cssText="padding-block:1rem;padding-inline:1rem;margin-inline:auto;margin-top:0.5rem;text-wrap:wrap;text-align:center;box-shadow:1px 1px 3px 1px rgb(29, 203, 251);";
        para.style.fontSize=less900 ? (less400 ? "130%":"150%"):"175%";
        para.style.color="#0668f7";
        textContainer.appendChild(text);
        textContainer.appendChild(div1);
        textContainer.appendChild(div2);
        textContainer.appendChild(para);
        textContainer.style.opacity="0";
        para.style.opacity="0";
        
        
        container.appendChild(textContainer);
        return Promise.resolve({textContainer,container,para,time}) as Promise<{textContainer:HTMLElement,container:HTMLElement,para:HTMLElement,time:number}>;
    };


    leftEllipe({parent,less400,less900}:{parent:HTMLElement,less400:boolean,less900:boolean}): Promise<{ellipseL:HTMLElement,ellipseR:HTMLElement}>{
        parent.style.position="relative";
        const cssEllipsL="display:block;clip-path: ellipse(80px 90px at -7% -19%);position:absolute;z-index:1;top:0%;left:0%;transform:translate(0px,0px);background: rgb(29, 203, 251);width:100px;height:100px;";
        const cssEllipsR="display:block;clip-path: ellipse(90px 80px at 107% 119%);position:absolute;z-index:1;top:100%;right:0%;transform:translate(1px,-100px);background: rgb(29, 203, 251);width:100px;height:100px;";
        const ellipseL=document.createElement("div");
        const ellipseR=document.createElement("div");
        ellipseL.id="ellipse1";
        ellipseR.id="ellipse1";
        ellipseL.style.cssText=cssEllipsL;
        ellipseR.style.cssText=cssEllipsR;

        parent.appendChild(ellipseL);
        parent.appendChild(ellipseR);
        return Promise.resolve({ellipseL,ellipseR}) as Promise<{ellipseL:HTMLElement,ellipseR:HTMLElement}>;
    };


    //parent:editorChart(): SIDEBAR LINE
    async mainBarChart({injector,blog,idValues}:{injector:HTMLElement,blog:blogType,idValues:idValueType[]}):Promise<HTMLElement>{
       
        const less900=window.innerWidth < 900;
        const less500=window.innerWidth < 500;
        const less400=window.innerWidth < 400;
        const isTextarea=injector.id==="textarea";
        const lenId=this.charts.length;
        const widthMax=less900 ? (less500 ? (less400 ? "340px":"400px") : "500px") : "800px";
        const widthMin=less900 ? (less500 ? (less400 ? "300px":"375px") : "400px") : "700px";
        const heightMax=less900 ? (less500 ? (less400 ? "400px":"500px") : "600px") : "900px";
        const heightMin=less900 ? (less500 ? (less400 ? "350px":"450px") : "500px") : "800px";
        if(!isTextarea){
            injector.style.minWidth=widthMin;
        }else{
            injector.style.width="100%";
        }
        Header.cleanUpByID(injector,"ctx-container-target");
        if(injector.id !=="textarea"){
            injector.style.cssText="min-height:80vh;margin-inline:auto;border-radius:20px;width:100%;position:relative;display:flex;justify-content:center;align-items:center;flex-direction:column;";
            injector.style.width="100% !important";
        }

        const divCont=document.createElement("section");
        divCont.className="mainBarChart-divCont";
        divCont.id="ctx-container-target";
        divCont.style.cssText="margin-inline:auto;margin-block:2rem;padding-inline:2rem; width:100%;display:flex;flex-direction:column;gap:1rem;align-items:center;justify-content:flex-start;gap:1rem;background-color:white;border-radius:20px;overflow-y:scroll;overflow-x:hidden;height:100%;";
        divCont.style.minHeight=less900 ? (less400 ? "200px":"300px"):"400px;";
        divCont.style.maxHeight=less900 ? (less400 ? "600px":"500px"):"470px;";
        divCont.style.minWidth=widthMin;
        divCont.style.maxWidth=widthMax;
        const ctx=document.createElement("canvas") as HTMLCanvasElement;
        ctx.id=`ctx-graph-${lenId}`;
        ctx.style.cssText=`width:100%;height:100%;max-height:${heightMax};min-height:${heightMin};min-width:${widthMin};max-width:${widthMax};border-radius:12px;margin-inline:auto;margin-block:2rem;padding-block:1rem;`;
        ctx.style.minWidth=widthMin;
        ctx.style.maxWidth=widthMax;
        ctx.style.minHeight=heightMin;
        ctx.style.maxHeight=heightMax;
        divCont.appendChild(ctx);
        injector.appendChild(divCont);
        this.cleanUpKeepOne({parent:injector,class_:"mainBarChart-divCont"});
        const getCtx=document.getElementById(`ctx-graph-${lenId}`) as HTMLCanvasElement;
        if(!getCtx)return injector;
        await this.barGraph({parent:injector,divCont,getCtx,blog,less900,less500,less400,idValues});
        return Promise.resolve(injector) as Promise<HTMLElement>;
    };



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
      
    };



    async barGraph({parent,divCont,getCtx,blog,less900,less500,less400,idValues}:{
        parent:HTMLElement,
        divCont:HTMLElement,
        getCtx:HTMLCanvasElement,
        blog:blogType,
        less900:boolean,
        less500:boolean,
        less400:boolean,
        idValues:idValueType[]

    }){
      
        let chart:Chart<"bar", number[], string | number>|Chart<"line", number[], string | number>
        divCont.style.position="relative";
        const option=this.bar_options({barData:this.barData,label:"add your data"}) as unknown as optionType;
        await this.addChart({divCont,target:getCtx,option,blog,idValues}).then(async(res)=>{
            if(res){
                this.cleanUpKeepOne({parent,class_:res.divCont.className});
                this.barOption=res.option as barOptionType;
                chart=new Chart(res.target,this.barOption)
                res.divCont.setAttribute("data-placement",String(this.placement));
                this.removeElement({parent,divCont:res.divCont,target:res.target,chart})
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
                            const yaxisSet=this.convertYaxis({parent:divCont,strY:yaxis});
                            const xaxisSet=this.convertXaxis({parent:divCont,strX:xaxis});
                        
                            if(yaxisSet && xaxisSet){
                            const barData=this.convergeBarData({xaxis:xaxisSet,yaxis:yaxisSet});
                            // console.log("this.barData",this.barData)//works
                                if(barData){
                                    Header.cleanUp(getCtx);
                                    //redo graph
                                    if(graphType==="bar"){
                                        const option_=this.bar_options({barData:barData,label}) as unknown as optionType;
                                        await this.addChart({divCont,target:getCtx,option:option_,blog,idValues}).then(async(res)=>{
                                            if(res){
                                                chart.destroy();
                                                this.barOption=res.option as barOptionType
                                                chart= new Chart(res.target,this.barOption);
                                                res.divCont.onclick=(e:MouseEvent)=>{
                                                    if(e){
                                                        divCont.classList.toggle("showGraph");
                                                    }
                                                };
                                            }
                                        });

                                    }else if(graphType==="line"){
                                        const _option=this.line_options({barData:barData,label}) as unknown as optionType;
                                        
                                        await this.addChart({divCont,target:getCtx,option:_option,blog,idValues}).then(async(res)=>{
                                            if(res){
                                                chart.destroy();
                                                this.lineOption=res.option as lineOptionType;
                                                chart= new Chart(res.target,this.lineOption);
                                                
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
                
                const _blog=this._modSelector.blog;
                this.charts=_blog.charts ? _blog.charts :[] as chartType[]
                if(pathname !=="/editor" && this.charts.length>0){
                    //SAVE OR CANCEL REQUEST-popup
                    this.message.chartmessage(divCont,this.charts);
                }else if(pathname==="/editor"){
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
    };


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

    };


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

    };


    optionForm(item:{divCont:HTMLElement}):{form:HTMLFormElement,popup:HTMLElement}{
        //async and returns form
        const {divCont}=item;
        divCont.style.position="relative";
        const popup=document.createElement("div");
        popup.id="popup-bar-form";
        popup.style.cssText="margin:auto;position:absolute;inset:0% 0% auto;backdrop-filter:blur(10px);display:flex;justify-content:flex-start;align-items:center;flex-direction:column;padding:1rem;padding-block:2rem;overflow-y:scroll;";
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
        const {select,label:slabel}=Misc.selectComponent({parent:form,name:"graph types",selects:graphTypes,cssStyle:{backgroundColor:"black",color:"white"}});
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


    };


    convertToBarLineOption(item:{option:barOptionType|lineOptionType}):barDataType[]{
        const {option}=item;
        const labels=option.data.labels;
        const numbers=option.data.datasets[0].data;
        const check=(labels && numbers?.length>0)|| false;
        if(check && labels){
            return this.convergeBarData({xaxis:labels as string[],yaxis:numbers})
        }
        return [] as barDataType[]
    };


    
    convertYaxis(item:{parent:HTMLElement,strY:string}):void | number[]{
        const {parent,strY}=item;
        const yaxisNum:number[]=[];
        const regOpen:RegExp=/\[|\{/;
        const regClose:RegExp=/\]|\}/;
        if(strY){
            const testStart=regOpen.test(strY);
            const testEnd=regClose.test(strY);
            const len=strY.split(",").length;
            if(testStart ||testEnd){
                const start=RegExp(regOpen).exec(strY) as any;
                const end=RegExp(regClose).exec(strY) as any;
                const startIn=start.index + start[0].length;
                const endIn=end.index;
                const middle=strY.slice(startIn,endIn);
                const yaxisArr:string[]=middle.split(",");
                const testNum=yaxisArr.find(kv=>(isNaN(Number(kv))));
                if(testNum){
                    Misc.message({parent,msg:"please enter ONLY numbers on the y-axis,,try again",type_:"error",time:3000});
                    return;
                }else if(len===0){
                    Misc.message({parent,msg:"please enter an array,try again",type_:"error",time:3000});
                    return;
                }else{
                    const arr=yaxisArr.map(kv=>(Number(kv)));
                    if(arr.length<=0){
                        Misc.message({parent,msg:"must have atleast one number in the y-array,,,,try again",type_:"error",time:3000});
                        return;
                    }
                    return arr;
                }
            }else{
                const yaxisStr:string[]=strY.split(",");
                return yaxisStr.map(kv=>(Number(kv)));
            };
        }else{
            return Misc.message({parent,type_:"error",msg:"you did not enter an array in the y-axs,,,try again",time:800});
        }
    };


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
            const checkComma=yaxisStr?.length>0 || false;
            if(checkComma){
                return yaxisStr;
            }else{
                return Misc.message({parent,type_:"error",msg:"There is no Label data,,it can not be done",time:800});
            }
        }else{
            return Misc.message({parent,type_:"error",msg:"There is no strX=>null",time:800});
        }
    };


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
    };


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
    };


    removeElement(item:{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement,chart:Chart<"bar"|"line", number[], string | number> | Chart<"line", number[], string | number>}){
        const {parent,divCont,target,chart}=item;
        const xDiv=document.createElement("div");
        xDiv.id="delete-popup";
        xDiv.style.cssText="position:absolute;top:0%;right:0%;transform:translate(-20px,10px);padding:0.25rem;border-radius:50%;background-color:black;color:white;";
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{fontSize:"18px",borderRadius:"50%"}});
        divCont.appendChild(xDiv);
        console.log("divCont",divCont)
        xDiv.onclick=(e:MouseEvent)=>{
            if(e){
                chart.destroy();
                Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:400});
                setTimeout(()=>{
                    this._modSelector.charts.map((chart,index)=>{
                        if(chart.eleId===target.id){
                            this._modSelector.charts.splice(index,1);
                            this._modSelector.shiftPlace(chart.placement);
                            this.placement=this.placement - 1;
                            parent.removeChild(divCont);
                            this._modSelector.blog={...this._modSelector.blog,charts:this._modSelector.charts}
                            this._modSelector.localStore({blog:this._modSelector.blog});
                        }
                        
                    })
                },390);
            }
        };
    };


   async addChart({target,divCont,option,blog,idValues}:{
    divCont:HTMLElement,
    target:HTMLCanvasElement,
    option:optionType,
    blog:blogType,
    idValues:idValueType[]

   }):Promise<{option:optionType,divCont:HTMLElement,target:HTMLCanvasElement,idValues:idValueType[]}>{
        
        const eleId=target.id;
        const maxcount=ModSelector.maxCount(blog);
        this.placement=maxcount + 1;
        localStorage.setItem("placement",String(maxcount + 1));
        const remainder=blog.charts ? blog.charts.filter(ctx=>(ctx.eleId !==eleId)) : [] as chartType[];
        const foundChart=blog.charts ? blog.charts.find(ctx=>(ctx.eleId ===eleId)) : undefined;
        const {cleaned}=this._modSelector.removeClasses({target,classes:["isActive","box-shadow"]});
        let chart:chartType;
        const len=blog.charts ? blog.charts.length :0;
        if(!foundChart){
            chart={
                id:len,
                type:option.type,
                eleId,
                cssText:target.style.cssText,
                class:cleaned.join(" "),
                placement:this.placement,
                chartOption:JSON.stringify(option) as string,
                blog_id:blog.id
            };
            divCont.setAttribute("data-placement",`${String(maxcount+1)}-A`);
            this.placement=this.placement + 1;
            const {idValues:retIdValues}=this._modSelector.dataset.coreChartIdValues({target,idValues,chart,clean:true});
            idValues=retIdValues
        }else{
            chart=foundChart
            chart.chartOption=JSON.stringify(option) as string;
        }
        this._modSelector.charts=[...remainder,chart];
        this.placement=this.placement + 1;
        return Promise.resolve({option,divCont,target,idValues}) as Promise<{option:optionType,divCont:HTMLElement,target:HTMLCanvasElement,idValues:idValueType[]}>;
    };


    cleanUpKeepOne(item:{parent:HTMLElement,class_:string}){
        const {parent,class_}=item;
        const getEles=parent.querySelectorAll(`.${class_}`) as any as HTMLElement[];
        if(getEles && getEles.length>0) {
            ([...getEles as any] as HTMLElement[]).map((ele,index)=>{
                if( ele && index>1){
                    parent.removeChild(ele);
                }
            });
        }
    };
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


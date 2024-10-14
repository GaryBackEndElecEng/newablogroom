import {flexType,elementType,colType,rowType,selectorType,element_selType,codeType,blogType, userType, themeType, saveProcessType, pageCountType, chartType,barOptionType, lineOptionType} from "./Types";

import { FaCreate } from "../common/ReactIcons";
import { FaCrosshairs, FaTrash } from "react-icons/fa";
import { MouseOver } from "../common/MouseOver";
import Header from "@/components/editor/header";
import Main from "./main";
import Misc from "../common/misc";
import { Color } from "chart.js";


class ModSelector {
    static main_css:string="min-height:100vh;height:auto;box-shadow:1px 1px 12px 2px black;border-radius:10px;padding-inline:0px;padding-block:0px;margin:0px;z-index:0;position:relative;width:100%;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:1rem;";
    static main_class="mx-auto d-flex w-100 flex-column";
    static mainHeader_css:string="margin-inline:0px;width:100%;display:flex;flex-direction:column;align-items:center;";
    static mainHeader_class:string="sectionHeader";
    static mainFooter_class:string="mainFooter";
    static mainFooter_css:string="width:100%;padding-inline:5px;margin-inline:0px;";
    urlUpload="/api/uploadImage";
    btnColor="#0C090A";
    _count=1;
    _placement=1;
    _chart:chartType;
    _charts:chartType[];
   _barOption:barOptionType;
   _lineOption:lineOptionType;
    _selector:selectorType={
        id:1,
        placement:1,
        name: "header",
        eleId: "",
        class: "",
        inner_html:"",
        cssText: "",
        colAttr: [{
            id:0,
            selector_id:1,
            T: 1,
            B: 0
        }],
        rows: [],
        rowNum:1,
        colNum:3,
        header:false,
        footer:false,
        blog_id:0,
        
    };
    textArr:selectorType[];
    _user:userType;
    _header:selectorType;
    _footer:selectorType;
    _nameSelected:boolean;
    _element:elementType={} as elementType;
    _elements:elementType[]=[];
    _selectors:selectorType[]=[];
    _blog:blogType={} as blogType;
    _blogs:blogType[]=[];
    _flex:flexType={} as flexType;
    _selectCode:codeType={} as codeType;
    _selectCodes:codeType[]=[];
    _cols:colType[]=[];
    _col:colType={} as colType;
    _row:rowType={} as rowType;
    _rows:rowType[]=[];
    _codes:codeType[];
    _isLocalBlog:boolean=false;  
    _bgColor:string="";
    _afterSignIn:saveProcessType;
    _pageCounts:pageCountType[]
    constructor()
    {
        // this.main=document.querySelector("section#main");//covers teaxtarea and btns
        // this._blog.header=this._Header.selector;
        this._bgColor="rgb(233, 236, 242)" 
        this._nameSelected=false;
        this._header={} as selectorType;
        this._footer={} as selectorType;
        this._selector={} as selectorType;
        this._selectors=[] as selectorType[];
        this._elements=[] as elementType[];
        this._user={} as userType;
        this.textArr=[];
        this._barOption={
            type:"bar",
            data:{
                labels:[] as string[],
                datasets:[
                    {
                        label:"",
                        data:[] as number[],
                        borderWidth:1,
                        backgroundColor:[] as Color[],
                        borderColor:[] as Color[],
                        borderRadius:10,
                    }
                ]
            },
            options:{
                scales:{
                    y:{
                        beginAtZero:true,
                       
                    }
                }
            }
        }
        this._lineOption={
            type:"line",
            data:{
                labels:[] as string[],
                datasets:[
                    {
                        label:"",
                        data:[] as number[],
                        borderWidth:1,
                        backgroundColor:[] as Color[],
                        borderColor:[] as Color[],
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
        this._codes=[];
        this._chart={
            id:0,
            type:"bar",
            eleId:"",
            chartOption:"",
            placement:0,
            blog_id:0
        };
        this._charts=[];
        this._pageCounts=[] as pageCountType[];
        this._blog={id:0,name:"",desc:"",title:"title",img:undefined,eleId:undefined,class:ModSelector.main_class,cssText:ModSelector.main_css,imgKey:undefined,selectors:this._selectors,elements:this._elements,codes:this._codes,show:false,rating:0,pageCounts:this._pageCounts,username:"username",date:new Date(),attr:"square",charts:this._charts,barOptions:[]};
        this._afterSignIn={} as saveProcessType;
        this.promAfterSignIn().then(async(res:saveProcessType)=>{
            if(res){
                this._afterSignIn=res;
                localStorage.removeItem("process");
            }
        });
    };

get count(){
    const getCount=localStorage.getItem("count");
    if(getCount){
        return parseInt(getCount)
    }else{
        return 1;
    }
}
set count(count:number){
    localStorage.setItem("count",String(count))
}

get element(){
    return this._element;
}
set element(element:elementType){
    this._element=element;
}
get elements(){
    return this._elements;
}
set elements(elements:elementType[]){
    this._elements=elements;
    this._blog={...this._blog,elements:elements};
    this.blog=this._blog;
}
set selectors(selectors:selectorType[]){
    this._selectors=selectors;
    this._header=selectors.filter(sel=>(sel.header ===true))[0] ? selectors.filter(sel=>(sel.header ===true))[0] as selectorType:{} as selectorType;
    this._footer=selectors.filter(sel=>(sel.footer ===true))[0] ? selectors.filter(sel=>(sel.footer ===true))[0] as selectorType:{} as selectorType;;
   
    this._blog={...this._blog,selectors:selectors};
    this.blog=this._blog;
}
get selectors(){
    return this._selectors
}
get selector(){
    return this._selector;
}
set selector(selector:selectorType){
    this._selector=selector;
}
get selectCodes(){
    return this._selectCodes;
}
set selectCodes(selectCodes:codeType[]){
    this._selectCodes=selectCodes;
    this._blog={...this._blog,codes:selectCodes};
    this.blog=this._blog;
    
}
get selectCode(){
    return this._selectCode;
}
set selectCode(selectCode:codeType){
    this._selectCode=selectCode;
    // localStorage.setItem("selectCode",JSON.stringify(selectCode));
    
}
set header(selector:selectorType){
 this._header=selector;
}
get header(){
    return this._header;
}
set footer(selector:selectorType){
    this._footer=selector;
}
get footer(){
    return this._footer;
}
set pageCounts(pageCounts:pageCountType[]){
    this._pageCounts=pageCounts;
}
get pageCounts(){
    return this._pageCounts;
}

get flex(){
    return this._flex;
}
set flex(flex:flexType){
    this._flex=flex;
}
get placement(){
    const getPlace=localStorage.getItem("placement");
    // console.log("164:",getPlace)
    if(getPlace){
        return parseInt(getPlace)
    }else{
        return 1;
    }
}
set placement(placement:number){
    this._placement=placement;
    localStorage.setItem("placement",JSON.stringify(placement))
}
get barOption(){
    return this._barOption
}
set barOption(barOption:barOptionType){
    this._barOption=barOption;
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
}
get charts(){
    return this._charts;
}
set charts(charts:chartType[]){
    this._charts=charts;
    this.blog={...this.blog,charts:charts};
}

get blog(){
    return this._blog;
}
set blog(blog:blogType){
    if(blog.show){
        this._blog={...blog};
    }else{
        this._blog={...blog,show:false};
    }
    localStorage.setItem("blog",JSON.stringify(blog));
}
get blogs(){
    return this._blogs;
}
set blogs(blogs:blogType[]){
    if(!blogs) return;
    this._blogs=blogs;
}
set afterSignIn(afterSignIn:saveProcessType){
    this._afterSignIn=afterSignIn;
}
get afterSignIn(){
    return this._afterSignIn
}
 promAfterSignIn(){
    return new Promise((resolver)=>{
        if( typeof window !=="undefined"){
            const getProcess=localStorage.getItem("process");
            if(!getProcess)return
            resolver(JSON.parse(getProcess))
        }
    }) as Promise<saveProcessType>;
 }

get row(){
    return this._row;
}
set row(row:rowType){
    this._row=row;
}
get rows(){
    return this._rows;
}
set rows(rows:rowType[]){
    this._rows=rows;
}
//THIS GETS THE BLOG FROM DISPLAYBLOG INDEX.
    async awaitBlog(blog:blogType){
        return new Promise((resolver,reject)=>{
            resolver({
                blog:()=>{
                    this._elements=blog.elements;
                    this._selectors=blog.selectors;
                    this._selectCodes=blog.codes;
                    // this.placement=1;
                    this._blog=blog;
                    return this._blog;
                }

            });
            reject("did not recieve blog detail")
        }) as Promise<{blog:()=>blogType}>;
    }
    async awaitBlogs(blogs:blogType[]){
        return new Promise((resolver,reject)=>{
            resolver({
                blogs:()=>{
                    // this.placement=1;
                    this.blogs=blogs;
                    return this.blogs;
                }

            });
            reject("did not recieve blog detail")
        }) as Promise<{blogs:()=>blogType[]}>;
    }


    rowAdder(target:HTMLElement,selectorId:string):rowType | undefined{
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        let flex:flexType=isJSON ? parsed as flexType : {} as flexType;
        
        const {backgroundImage,shapeOutsideCircle,shapeOutsideSquare,shapeOutsidePolygon}=flex;
        let row_:rowType={} as rowType;
        this._selectors=this._selectors.map(select=>{
            // console.log("197:modSelector:rowAdderr:outside",select.eleId,selectorId);
            if(select.eleId===selectorId){
                const ID=select.rows ? select.rows.length :0;
                const check=select.rows.find(row=>(row.eleId===target.id)) ? true:false;
                // console.log("201:modSelector:rowAdderr:inside",select.id,selectorId);
                if(!check){
                    row_={
                        id: ID,
                        name:target.getAttribute("name") ? target.getAttribute("name") as string : '' ,
                        class:target.className,
                        eleId:target.id,
                        inner_html:target.textContent ? target.textContent : "",
                        cssText:target.style.cssText,
                        cols:[] as colType[],
                        selector_id:select.id,
                        order:ID
                    } as rowType;
                    select.rows.push(row_);
                    flex={...flex,order:ID};
                    if(backgroundImage){
                        target.setAttribute("data-backgroundImage","true");
                    }else if(shapeOutsideCircle){
                        target.setAttribute("data-shapeOutside-circle","true")
                    }else if(shapeOutsidePolygon){
                        target.setAttribute("data-shapeOutside-polygon","true")
                    }else if(shapeOutsideSquare){
                        target.setAttribute("data-shapeOutside-square","true")
                    }
                    target.setAttribute("flex",JSON.stringify(flex));
                    target.setAttribute("order",String(ID));
                }
            }
            return select;
        });
        this.selectors=this._selectors;
        const _row_:rowType|undefined=this._selectors.filter(select=>(select.eleId===selectorId))[0]?.rows.find(row=>(row.eleId===target.id))
        if(_row_) return _row_
        return 
    }
    colAdder(target:HTMLElement,flex_:flexType):colType | undefined{
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        let flex:flexType=isJSON ? parsed as flexType : flex_;

        const {selectorId,rowId,backgroundImage,shapeOutsideCircle,shapeOutsidePolygon}=flex;
        let col:colType={} as colType
        this._selectors=this.selectors.map(select=>{
            if(select.eleId===selectorId){
                select.rows.map(row=>{
                    if(row.eleId ===rowId){
                        const check=row.cols.map(col=>(col.eleId)).includes(target.id as string);
                        // console.log("277:check:determines if COL extis",check,"target.id",target.id,)//works
                        if(!check){
                            const ID1=row.cols?.length ? row.cols.length : 0;
                                col={
                                    id:ID1,
                                    name:target.getAttribute("name") ? target.getAttribute("name") as string : '' ,
                                    class:target.className.split(" ").filter(cl=>(cl !=="box-shadow")).join(" "),
                                    eleId:target.id,
                                    inner_html:target.textContent ? target.textContent : "",
                                    cssText:target.style.cssText,
                                    elements:[] as element_selType[],
                                    row_id:row.id,
                                    order:ID1
                            }as colType;
                            if(backgroundImage){
                                target.setAttribute("data-backgroundImage","true");
                            }else if(shapeOutsideCircle){
                                target.setAttribute("data-shapeOutside-circle","true")
                            }else if(shapeOutsidePolygon){
                                target.setAttribute("data-shapeOutside-polygon","true")
                            }
                            row.cols.push(col);
                            flex={...flex,order:ID1}
                            target.setAttribute("flex",JSON.stringify(flex));
                            target.setAttribute("order",String(ID1))
                        }
                    }
                    return row;
                });
            }
            return select;
        });
           this.selectors=this._selectors;
           return col
            
    }
    promElementAdder(target:HTMLElement):Promise< {target: HTMLElement | HTMLImageElement,ele: element_selType} | {target: HTMLElement | HTMLImageElement,ele:elementType} | undefined>{
        return new Promise((resolver)=>{
            resolver(this.elementAdder(target));
        });
    }
    elementAdder(target:HTMLElement | HTMLImageElement):{ target: HTMLElement | HTMLImageElement,ele: element_selType} | {target: HTMLElement | HTMLImageElement,ele: elementType;} | undefined{

        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        const checkNodename=["a","blockquote","ul","img","ol"]
        const nodename=target.nodeName.toLowerCase();
        const specialNodename=checkNodename.includes(nodename);
        const hrefEmail=target.getAttribute("data-href-email");
        const hrefTel=target.getAttribute("data-href-tel");
        const link=target.getAttribute("data-href");
        const arrowDesign=target.getAttribute("data-arrow-design");
        
        
        if(isJSON){
            let flex=parsed as flexType;
            const {selectorId,rowId,colId,backgroundImage,imgKey,shapeOutsideCircle,shapeOutsideSquare,shapeOutsidePolygon,anchorContainer}=flex;
            // console.log("FLEX: ","rowId:",rowId,"eleId",flex.elementId);
            //ADDING ATTRIBUTES
            const name=target.nodeName.toLowerCase();
            target.setAttribute("is-element","true");
            target.setAttribute("name",name);
            let ele:element_selType={} as element_selType;
            //ADDING ATTRIBUTES
       
            this._selectors = this._selectors.map(selector_=>{
                if(selector_.eleId===selectorId ){
                    // console.log("inside selector:",selector_.eleId===selectorId);//works
                    selector_.rows.map(row=>{
                        if(row.eleId===rowId){
                            row.cols.map((col)=>{
                                // console.log("compare col:",col.eleId,"flex.col",colId);//works
                                // console.log("inside col:",col.eleId===colId);
                                if(col.eleId===colId){
                                    const ID=col.elements ? col.elements.length:0;

                                    const check=col.elements && col.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);

                                        if(nodename && !check){
                                        
                                            // console.log("418 HELROWSSSSS",JSON.parse(target.id));
                                            ele={
                                                ...ele,
                                                id:ID ,
                                                selectorId:selector_.id,
                                                name:nodename as string,
                                                class:target.className.split(" ").filter(cl=>(cl !=="isActive")).join(" "),
                                                eleId:target.id,
                                                placement:ID ? ID as number : undefined,
                                                cssText:target.style.cssText,
                                                attr:target.getAttribute("attr") ? target.getAttribute("attr") as string :undefined,
                                                col_id:col.id,
                                                imgKey:imgKey ? imgKey :undefined,
                                                order:ID
                                            } as element_selType;
                                            if(backgroundImage){
                                                ele.attr="data-backgroundImage";
                                                target.setAttribute("data-backgroundImage","true");
                                            }else if(anchorContainer){
                                                ele.attr=anchorContainer;
                                                ele.inner_html=target.innerHTML;
                                                target.setAttribute("data-href",anchorContainer);
                                            }else if(shapeOutsideCircle){
                                                ele.attr="data-shapeoutside-circle";
                                                target.setAttribute("data-shapeoutside-circle","true");
                                                ele.inner_html=target.innerHTML;
                                            }else if(shapeOutsideSquare){
                                                ele.attr="data-shapeoutside-square";
                                                target.setAttribute("data-shapeoutside-square","true");
                                                ele.inner_html=target.innerHTML;
                                            }else if(shapeOutsidePolygon){
                                                ele.attr="data-shapeoutside-polygon";
                                                target.setAttribute("data-shapeoutside-polygon","true");
                                                ele.inner_html=target.innerHTML;
                                            }else if(arrowDesign){
                                                ele.attr="data-arrow-design";
                                                target.setAttribute("data-arrow-design","true");
                                                ele.inner_html=target.innerHTML;
                                            }else if(hrefEmail){
                                                ele.attr=hrefEmail;
                                                ele.inner_html=target.innerHTML;
                                            }else if(hrefTel){
                                                ele.attr=hrefTel;
                                                ele.inner_html=target.innerHTML;
                                            }else{
                                                ele.attr=target.getAttribute("attr") ? target.getAttribute("attr") as string :undefined;
                                            }
                                            if(!specialNodename){
                                                    ele.inner_html=target.innerHTML;
                                            }else if(link){
                                                
                                                ele.attr=link;
                                                ele.inner_html=target.innerHTML;
                                                
                                            }else if(specialNodename && nodename !=="a"){
                                                ele.inner_html=target.innerHTML as string
                                                // console.log("modSelector.elementAdder()",ele.inner_html)
                                            }else if(nodename==="img"){
                                                const target_=target as HTMLImageElement;
                                                ele.img=target_.src;
                                                ele.inner_html=target_.alt;
                                            }else{
                                                ele.inner_html=target.innerHTML;
                                                ele.cssText=target.style.cssText;
                                                ele.class=target.className;
                                            }
                                            col.elements.push(ele)
                                            target.setAttribute("order",String(ID));
                                            flex={...flex,order:ID};
                                            target.setAttribute("flex",JSON.stringify(flex));
                                            // console.log("ELEMENT ADDER:INSIDE",col.elements)
                                        }
                                        // console.log("OUTSIDE",col.elements)
                                }
                                
                                return col;
                            })
                        }
                        return row;
                    });
                }
                return selector_;
            });
            this.selectors=this._selectors; //saving it to blog
            return {target:target,ele:ele};
        }else{
            const ID=this.elements.length;
            const hasInnerImage=target.getAttribute("has-innerimage");
            const shapeOutsideCircle=target.getAttribute("data-shapeoutside-circle");
            const shapeOutsideSquare=target.getAttribute("data-shapeoutside-square");
            const shapeOutsidePolygon=target.getAttribute("data-shapeoutside-polygon");
            const reference=target.getAttribute("data-href-reference");//data-href-reference
            const venDiagram=target.getAttribute("is-vendiagram");
            const wave=target.getAttribute("is-wave");
            const arch=target.getAttribute("is-arch");
            const circle=target.getAttribute("data-circle-design");
            const imgKey=target.getAttribute("imgKey");
            const check=this.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
                if(nodename && !check){

                let ele:elementType={} as elementType;
                    // console.log("418 HELROWSSSSS",JSON.parse(target.id));
                    ele={
                        ...ele,
                        id:ID ,
                        selectorId:undefined,
                        placement:this.placement,
                        name:nodename as string,
                        class:target.className.split(" ").filter(cl=>(cl !=="isActive")).join(" "),
                        eleId:target.id,
                        imgKey:imgKey ? imgKey : undefined,
                        cssText:target.style.cssText,
                        attr:target.getAttribute("attr") ? target.getAttribute("attr") as string :undefined,
                    };
                    if(hasInnerImage){
                        ele.attr="has-innerimage";
                    }
                    if(shapeOutsideCircle){
                        ele.attr="data-shapeoutside-circle";
                        target.setAttribute("data-shapeoutside-circle","true");
                    }else if(shapeOutsideSquare){
                        ele.attr="data-shapeoutside-square";
                        target.setAttribute("data-shapeoutside-square","true");
                    }else if(shapeOutsidePolygon){
                        ele.attr="data-shapeoutside-polygon";
                        target.setAttribute("data-shapeoutside-polygon","true");
                    }else if(circle){
                        ele.attr="data-circle-design";
                        target.setAttribute("data-circle-design","true");
                    }else if(reference){
                        ele.attr=reference
                        //list of <ol>list=><li><a></a></li></ol> in JSON.stringify(arrLink)
                        target.setAttribute("data-href-reference",ele.attr);
                    }else if(hrefEmail){
                        ele.attr=hrefEmail;
                        ele.inner_html=target.innerHTML;
                    }else if(hrefTel){
                        ele.attr=hrefTel;
                        ele.inner_html=target.innerHTML;
                    }else if(link){
                        ele.attr=link;
                        ele.inner_html=target.innerHTML;
                    }else if(arrowDesign){
                        ele.attr="data-arrow-design";
                        ele.inner_html=target.innerHTML;
                    }
                    if(venDiagram){
                        ele.attr="is-vendiagram";
                        target.setAttribute("is-vendiagram","true");
                    }
                    if(wave){
                        ele.attr="is-wave";
                        target.setAttribute("is-wave","true");
                    }
                    if(arch){
                        ele.attr="is-arch";
                        target.setAttribute("is-arch","true");
                    }
                    if(!specialNodename){
                            // ele.inner_html=ModSelector.cleanInnerHTML(target).innerHTML as string;
                            ele.inner_html=target.innerHTML;
            
                    }else if(specialNodename && nodename !=="a"){
                        ele.inner_html=target.innerHTML as string
                        // console.log("modSelector.elementAdder()",ele.inner_html)
                    }else if(nodename==="img"){
                        const target_=target as HTMLImageElement;
                        ele.img=target_.src;
                        ele.inner_html=target_.alt;
                        ///imgKey will be on update
                    }
                    this._elements.push(ele);
                    this.elements=this._elements;
                    this.placement= this.placement + 1;
                    return {target:target,ele:ele};
                }
        }

    }
    removeElement(target:HTMLElement):elementType|undefined{
         const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex")) as {parsed:flexType,isJSON:boolean};
         let ele_:elementType|undefined;
        if(isJSON){
            const flex=parsed;
            const {selectorId,rowId,colId}=flex;
            this.selectors=this._selectors.map(selector_=>{
                // console.log("sel.id",selector_.id, "select",selector)
                if(selectorId===selector_.eleId){
                    selector_.rows.forEach(row=>{
                        // console.log("row",row.eleId,"match",rowId);
                        if(row.eleId===rowId){
                            // console.log("row",rowId)
                            row.cols.forEach(col=>{
                                if(col.eleId===colId){
                                    const remain=col.elements.filter(ele=>(ele.eleId !==target.id));
                                    col.elements=remain;
                                    // console.log("1276:removeElement:remain",remain)
                                }
                                return col;
                            });
                        }
                        return row;
                    })
                }
                return selector_;
            });
           return
        }else{
            this._elements.map((ele,index)=>{
                if(ele.eleId===target.id){
                    this.elements.splice(index,1);
                    ele_=ele
                }
            });
            this.elements=this._elements;
            return ele_;
        }
        
        
    }
    promRemoveElement(target:HTMLElement){
        return new Promise((resolver)=>{
            resolver(this.removeElement(target));
        }) as Promise<elementType|undefined>;
    }
    addAttribute(target:HTMLElement,type:string,attr:string){
        const arrType=["color","class","font-family","font-size"];
        const check=arrType.includes(type);
        if(!check ) return
        const getFlex=target.getAttribute("flex");
        const {parsed,isJSON}= Header.checkJson(getFlex);
        if(type !=="font-family"){
            if(isJSON){
                const {selectorId,rowId,colId}= parsed as flexType;
                // console.log("TAG",tag,this.selectors)
                this._selectors=this._selectors.map(selector_=>{
                    if(selectorId && (selector_.eleId===(selectorId as string))){
                        selector_.rows.map(row=>{
                            if(row.eleId===rowId){
                                row.cols.map(col=>{
                                    if(col.eleId===colId){
                                        col.elements.map(element=>{
                                            if(element.eleId===target.id){
                                                switch(true){
                                                    case type==="color":
                                                        element.cssText+=`color:${attr};`;
                                                    break;
                                                    case type==="class" :
                                                        let classList=element.class.split(" ");
                                                        classList=this.removeClass(target,"isActive").split(" ");
                                                        const check=classList.includes(attr) ? true:false;
                                                        if(check){
                                                            classList=classList.filter(cl=>(cl !==attr));
                                                        element.class=classList.join(" ");
                                                        }else{
                                                            classList.push(attr);
                                                            element.class=classList.join(" ");
                                                        }
                                                    break;
                                                    case type==="font-family":
                                                        element.cssText=element.cssText + "font-family:"+ attr +";";
                                                    break;
                                                    case type==="font-size":
                                                        element.cssText=element.cssText + "font-size:"+ attr +";";
                                                    break;
                                                    default:
                                                        return;
                                                }
                                            }
                                            return element;
                                        });
                                    }
                                    return col;
                                });
                            }
                            return row;
                        });
                    }
                    return selector_;
                });
                this.selectors=this._selectors;
            }else{
                this._elements=this._elements.map(ele=>{
                        if(ele.eleId===target.id){
                            switch(true){
                                case type==="color":
                                    ele.cssText+=`color:${attr};`;
                                return ele;
                                case type==="class" :
                                    let classList=ele.class.split(" ");
                                    classList=this.removeClass(target,"isActive").split(" ");
                                    const check=classList.includes(attr) ? true:false;
                                    if(check){
                                        classList=classList.filter(cl=>(cl !==attr));
                                    ele.class=classList.join(" ");
                                    }else{
                                        classList.push(attr);
                                        ele.class=classList.join(" ");
                                    }
                                return ele;
                                case type==="font-family":
                                    ele.cssText=ele.cssText + "font-family:"+ attr +";";
                                return ele;
                                case type==="font-size":
                                    ele.cssText=ele.cssText + "font-size:"+ attr +";";
                                return ele;
                                default:
                                    return ele;
                            }
                        }
                    return ele;
                });
                this.elements=this._elements;
            }
        }else{
            const fontFamily=target.style.fontFamily;
            if(fontFamily){
                this._selectors=this._selectors.map(selector=>{
                    const addFont=selector.cssText.split(";");
                    addFont.push(`"font-family":${fontFamily}`);
                    selector.cssText=addFont.join(";");
                    return selector;
                });
                this.selectors=this._selectors;
                if(!Main.textarea) return;
                Main.textarea.style.fontFamily =`${fontFamily}`;
            }
        }
    }
    removeClass(target:HTMLElement,class_:string):string{
        let classes=([...target.classList as any] as string[]);
        classes =classes.map(cls=>{
            if(cls===class_){
                cls="";
            }
            return cls
        });
        
        return classes.join(" ");
    }
    updateElement(target:HTMLElement){
        const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
        const shapeOutside=target.getAttribute("data-shapeOutside");
        const reference=target.getAttribute("data-href-reference");
        const hrefEmail=target.getAttribute("data-href-email");
        const hrefTel=target.getAttribute("data-href-tel");
        const link=target.getAttribute("data-href");
        
        if(isJSON){
            const flex=parsed as flexType;
            const { selectorId,rowId,colId,imgKey,backgroundImage}=flex ;
            this._selectors=this._selectors.map(select=>{
                    if(select.eleId===selectorId){
                        select.rows.map(row=>{
                            if(row.eleId===rowId){
                                row.cols.map(col=>{
                                    if(col.eleId===colId){
                                        col.elements.map(ele=>{
                                            if(ele.eleId===target.id){
                                                ele.cssText=target.style.cssText;
                                                ele.class=target.className.split(" ").filter(cl=>(cl !== "isActive")).join(" ");
                                                ele.inner_html=target.innerHTML;
                                                ele.imgKey=imgKey ? imgKey : undefined;
                                                if(target.nodeName.toLowerCase()==="a"){
                                                    if(link){
                                                        ele.attr=link;
                                                    }else if(hrefEmail){
                                                        ele.attr=hrefEmail;
                                                    }else if(hrefTel){
                                                        ele.attr=hrefTel;
                                                    }
                                                    ele.inner_html=target.innerHTML;
                                                }else if(target.nodeName.toLowerCase()==="img"){
                                                    const img=target as HTMLImageElement;
                                                    ele.img=img.src;
                                                    ele.inner_html=img.alt;
                                                    ele.imgKey=imgKey ? imgKey as string : undefined;
                                                }else if(backgroundImage){
                                                    ele.attr="data-backgroundImage";
                                                    target.setAttribute("data-backgroundImage","true");
                                                }
                                            }
                                            return ele;
                                        });
                                    }
                                    return col;
                                });
                            }
                            return row;
                        });
                    }
                return select;
            });
            this.selectors=this._selectors;
        }else{
            this._elements=this._elements.map(ele=>{
                    if(ele.eleId===target.id){
                        ele.cssText=target.style.cssText;
                        ele.class=target.className;
                        if(shapeOutside){
                            const imgKey=target.getAttribute("imgKey");
                            ele.imgKey=imgKey? imgKey : undefined;
                        }
                        else if(target.nodeName==="IMG"){
                            const img=target as HTMLImageElement;
                            const imgKey= img.getAttribute("imgKey");
                            ele.img=img.src;
                            ele.inner_html=img.alt;
                            ele.imgKey=imgKey ? imgKey as string : undefined;
                        }else if(reference){
                            ele.attr=reference;
                            ele.inner_html=target.innerHTML;
                            ele.cssText=target.style.cssText;
                        }else{
                            ele.inner_html=target.innerHTML;
                        }
                    }
                return ele;
            });
            this.elements=this._elements;
        }
    }
    footerPlacement():number{
        const maxPlacement=ModSelector.maxCount(this._blog);
        let footer=this._blog.selectors && this._blog.selectors.find(select=>(select.footer===true));
        if(footer && maxPlacement>1){
            const remain=this._blog.selectors.filter(select=>(select.footer !==true));
            footer={...footer,placement:maxPlacement +1};
            this._selectors=[...remain,footer];
            this._blog.selectors=this._selectors;
            this.blog=this._blog;
        }
        return maxPlacement +1
    }
    
    
   
    editElement(target:HTMLElement | HTMLImageElement){
        const isFlex=target.getAttribute("flex") as string ? target.getAttribute("flex") as string : null;
        const flex= isFlex ? JSON.parse(isFlex) as flexType : null;
        target.addEventListener("input",(e:Event)=>{
            if(e){
                if(flex){
                    const {selectorId,rowId,colId}= flex as flexType;
                    this._selectors=this._selectors.map(selector_=>{
                        if(selector_.eleId===selectorId){
                            selector_.rows.map(row=>{
                                if(row.eleId===rowId){
                                    row.cols.map(col=>{
                                        if(col.eleId===colId){
                                            col.elements.map(element=>{
                                                if(element.eleId===target.id){
                                                    const cleanClassHTML=this.removeTargetClass(e.currentTarget as HTMLElement)
                                                    const nodN=target.nodeName.toLowerCase();
                                                    const arrCheck=["ul","ol","blockquote","img","a"]
                                                    if(!(arrCheck.includes(nodN))){
                                                        element.inner_html=target.innerHTML;
                                                    }else if(nodN==="img"){
                                                        const img=target as HTMLImageElement;
                                                        element.img=img.src;
                                                        
                                                    }else if(target.nodeName.toLowerCase()==="a"){
                                                        
                                                            const link=target.getAttribute("data-href");
                                                            element.attr=link ? link:undefined
                                                            element.inner_html=target.innerHTML;
                                                        
                                                    }else{
                                                        element.inner_html=target.innerHTML;
                                                        
                                                    }
                                                    element.class=cleanClassHTML.className;
                                                    element.cssText=target.style.cssText;
                                                
                                                        // console.log("1679: FIGURE ON HOW TO REMOVE THE REPEATS")
                                                    
                                                }
                                                return element;
                                            });
                                        }
                                        return col;
                                    });
                                }
                                return row;
                            });
                        }
                        return selector_;
                    });
                    this.selectors=this._selectors;
                    // console.log("953:modSelector:editElement",this.selectors)//works
                        
                }else{
                    
                    this._elements=this._elements.map(ele=>{
                            if(ele.eleId===target.id){
                                ele.cssText=target.style.cssText;
                                ele.class=target.className;
                                if(target.nodeName !=="IMG"){
                                ele.inner_html=target.innerHTML;
                                }else{
                                    const img=target as HTMLImageElement;
                                    ele.img=img.src;
                                    ele.inner_html=img.alt;
                                }
                            }
                        return ele;
                    });
                        this.elements=this._elements;
                        // console.log("953:modSelector:editElement",this.selectors)//works
                        
                }
            }
        });
    }
    promUpdateRow(target:HTMLElement){
        const {parsed}=Header.checkJson(target.getAttribute("flex"));
        const flex=parsed as flexType;
        return new Promise((resolver)=>{
            resolver(this.updateRow(target,flex))
        }) as Promise<rowType | undefined>;
    }
    updateRow(target:HTMLElement,flex:flexType):rowType | undefined{
            const {selectorId,imgKey,backgroundImage}=flex;
            let row_:rowType| undefined;
            this._selectors=this._selectors.map(select=>{
                if(select.eleId===selectorId){
                    select.rows.map(row=>{
                        if(row.eleId===target.id){
                            row.class=target.className;
                            row.cssText=target.style.cssText;
                            row.imgKey=imgKey ? imgKey : undefined
                        }
                        if(backgroundImage){
                            target.setAttribute("data-backgroundimage","true");
                        }
                        row_=row;
                        return row;
                    });
                }
                return select;
            });
            this.selectors=this._selectors;
            return row_
    }
    promUpdateColumn(column:HTMLElement,flex:flexType){
        return new Promise((resolver)=>{
            resolver(this.updateColumn(column,flex))
        }) as Promise<colType | undefined>;
    }
    updateColumn(column:HTMLElement,flex:flexType){
        if(flex && typeof(flex)==="object"){
            let col_:colType|undefined;
            const {selectorId,rowId,colId,imgKey,backgroundImage}=flex;
            this.selectors=this._selectors.map(select=>{
                if(select.eleId===selectorId){
                    select.rows.map(row=>{
                        if(row.eleId===rowId){
                            row.cols.map(col=>{
                                if(col.eleId===colId){
                                    col.class=column.className;
                                    col.cssText=column.style.cssText;
                                    col.imgKey=imgKey ? imgKey : undefined;
                                    col_=col;
                                }
                                if(backgroundImage){
                                    column.setAttribute("data-backgroundimage","true");
                                }
                                return col;
                            });
                        }
                        return row;
                    });
                }
                return select;
            });
            return col_;
        }
    }
    updateSelectorElement(target:HTMLElement,flex:flexType){
        
        if(target.id && flex){
            const {selectorId,rowId,colId}=flex as flexType;
            this._selectors=this.selectors.map(select=>{
                // console.log("962:modSelector:updateSelectorElement:outside selector.id:",select.id,selectorId);//works
                if(select.eleId===selectorId){
                    // console.log("964:inside selector.id:",select.eleId,selectorId);//works
                    // console.log("967:inside selector.id:flex",rowId,colId);//works
                    select.rows.map(row=>{
                        // console.log("966: outside row:",row.eleId,flex.rowId);
                        if(row.eleId===rowId){
                            // console.log("967: inside row:",row.eleId,flex.rowId);
                            row.cols.map(col=>{
                                // console.log("970: outside col:",col.eleId,flex.colId);
                                if(col.eleId===colId){
                                    // console.log("971: inside col:",col.eleId,flex.colId);
                                    col.elements.map(ele=>{
                                        if(ele.eleId===target.id){
                                        if(ele.name !=="img"){
                                        ele.cssText=target.style.cssText;
                                        ele.class=target.className;
                                        ele.inner_html=target.innerHTML;
                                        }else{
                                            ele.img=(target as HTMLImageElement).src as string;
                                        }
                                        // console.log("1018:modSelector:updateSelectorElement:inside:ele.inner_html:",ele.inner_html);//works
                                        }
                                        return ele;
                                    });
                                }
                                return col;
                            });
                        }
                        return row;
                    });
                }
                return select
            });
            this.selectors=this._selectors;
        }
        
    }
    //REMOVE ALL classes to parent/child
    removeTargetClass(target:HTMLElement):HTMLElement{
        target.classList.remove("isActive");
        ([...target.children as any] as HTMLElement[]).map((child)=>{
            const check=[...child.className.split(" ")].includes("isActive");
            if(child as Element && check){
               const rmClss= child.className.split(" ").filter(cl=>(cl !=="isActive")).join(" ")
                child.className=rmClss;
            }
            
            return child;
        });
        return target
    }
    //PARENT EDITELEMENT()
    cleanClass(target:HTMLElement):string{
        //REMOVES isActive and adding all sub classes to parent
        const remClasses=["isActive","active"];
        let classes='';
        let arr:string[]=[];
        let classes_top:string[]=[...target.classList as any] as string[];
        const classes_inner=[...target.children as any] as HTMLElement[];
        classes_inner.forEach((ele)=>{
            const check=([...ele.classList as any] as string[]).includes("isActive");
            if(ele as HTMLElement){
                if(check){
                ele.classList.remove("isActive");
                }

               arr=arr.concat([...ele.classList as any] as string[])
            }
        });
        const set=new Set(arr);
        classes=new Array(set).join(" ");
        classes_top = classes_top.map(str=>{
            const check=remClasses.includes(str);
            if(check){
                str="";
            }
            return str
        });
        return [classes_top.join(" "),classes].join(" ");
    }
    //PARENT EDITELEMENT()
    static cleanInnerHTML(target:HTMLElement):HTMLElement{
        const childtags=["I","SPAN","kdb","STRONG","SMALL","ICON"]
        let content="";
        const textContent=target.textContent ? target.textContent : "";
        // console.log("943:cleanInnerHTML():textContent",target.textContent)
        if(target){
            ([...target.children as any] as HTMLElement[]).map(ele=>{
                const nodeN=ele.nodeName;
                const check=childtags.includes(nodeN);
                if(check){
                    content+=ele.textContent;
                    target.removeChild(ele);
                    
                }
            });
            target.textContent=textContent + content;
            target.textContent.trim();
        }
        
            
    
        return target
    }
 
    cleanSelectorClass(selector:selectorType):selectorType | undefined{
        const arrClasses=["isActive","active"];
        if(!selector) return undefined;
        arrClasses.map(class_=>(selector.class.replace(class_,"")));
        const selectorRows=selector.rows.map(row=>{
            arrClasses.map(class_=>(row.class.replace(class_,"")));
            if(row.cols.length>0){
                row.cols.map(col=>{
                    arrClasses.map(class_=>(col.class.replace(class_,"")));
                    if(col.elements.length>0){
                        col.elements.map(ele=>{
                            arrClasses.map(class_=>(ele.class.replace(class_,"")));
                            return ele;
                        });
                    }
                    return col;
                });
            }
            return row
    
        });
        
        selector={...selector,rows:selectorRows}
        return selector
    }

    
// GENERAL///////////////////////
removeHeader(parent:HTMLElement,target:HTMLElement){
    target.style.position="relative";
    const cssStyle={color:"red"}
    const xIcon=document.createElement("div");
    xIcon.id="modSelector-remove-header";
    xIcon.setAttribute("is-icon","true");
    xIcon.setAttribute("data-delete","selector")
    xIcon.classList.add("delete");
    xIcon.style.cssText="position:absolute;top:0;right:0;transform:translate(-18px,0px);border-radius:50%;"
    FaCreate({parent:xIcon,name:FaTrash,cssStyle:cssStyle});
    target.appendChild(xIcon);
    xIcon.addEventListener("click",(e:MouseEvent)=>{
        if(e){
            this._selectors=this._selectors.filter(sel=>(sel.eleId !=target.id));
            this.selectors=this._selectors;
            target.animate([
                {transform:"translate(0%,0%) scale(1)",opacity:"1"},
                {transform:"translate(-100%,-100%) scale(0.3)",opacity:"0"}
            ],{duration:600,iterations:1});
            setTimeout(()=>{
                parent.removeChild(target);
            },580);
        }
    });
    xIcon.onmouseover=(e:MouseEvent)=>{
        if(e){
            MouseOver({parent:xIcon,msg:"Remove"});
        }
    };
}

updateBgImage(flex:flexType){
    //INSERTS IMGKEY:::NEEDS POSITION(COL,ROW,BLOG) AND IMGKEY:KEY
    if(flex){
    const {rowId,colId,position,imgKey,elementId}=flex as flexType;
    if(!position) return
    const checkPos=["col","row","selector","blog","ele"].includes(position);
    if(checkPos){
        if(position==="blog"){
            this._blog={...this._blog,imgKey:imgKey}
            this.blog=this._blog;
        }
        this._selectors=this._selectors.map(select=>{
                select.rows.map(row=>{
                if(position==="row" && row.eleId===rowId){
                    row.imgKey=imgKey;
                }else{
                    row.cols.map(col=>{
                        if(position==="col" && col.eleId===colId){
                            col.imgKey=imgKey;
                        }else{
                            col.elements.map(ele=>{
                                if(position==="ele" && ele.eleId===elementId){
                                    ele.imgKey=imgKey;
                                }
                                return ele;
                            });
                        }
                        return col;
                    });
                };
                return row
                });

            return select;
                
            });
        this.selectors=this._selectors;
        this.blog={...this.blog,selectors:this.selectors};
    };
};
};

showRemoveItem(parent:HTMLElement,divCont:HTMLElement,target:HTMLElement):void{
    const check=([...target.classList as any] as string[]).includes("isActive");
    if(check){
    target.style.position="relative";
    // Main.cleanUp(target);
    const iconDiv=document.createElement("div");
    iconDiv.id="delete-XiconDiv";
    iconDiv.style.cssText="position:absolute;top:0%;right:0%;width:25px;height:25px;transform:translate(12px,12px);"
    const css={color:"red"}
    FaCreate({parent:iconDiv,name:FaCrosshairs,cssStyle:css})
    
        target.appendChild(iconDiv);
        iconDiv.addEventListener("click",(e:MouseEvent)=>{
            if(e ){
                Misc.fadeOut({anchor:divCont,xpos:100,ypos:100,time:400});
                setTimeout(()=>{parent.removeChild(divCont)},398);
            }
        });
    }else{
        Header.cleanUpByID(parent,"delete-XiconDiv");
    }
    
    
}
///THIS IS FOR REMOVING EXTRA UNWANTED ELEMENTS OF SUBselector elements
removeUnwanted(eleName:string){
    this._selectors=this._selectors.map(sel=>{
        sel.rows.map(row=>{
                row.cols.map(col=>{
                        col.elements.filter(ele=>(ele.name !==eleName));
                    return col;
                });
            return row;
        });
        return sel;
    });
    this.selectors=this._selectors;
}
blogInitializer(user:userType|null){
    localStorage.removeItem("blog");
    localStorage.setItem("placement","1");
    this._elements=[] as elementType[];
    this._selectors=[] as selectorType[];
    this._codes=[] as codeType[];
    this._charts=[] as chartType[];
    this._blog={id:0,name:"",desc:"",img:undefined,eleId:undefined,class:undefined,cssText:undefined,imgKey:undefined,selectors:this._selectors,elements:this._elements,codes:this._codes,show:false,rating:0,pageCounts:this.pageCounts,date:new Date(),attr:"square",charts:this.charts,barOptions:[]};
    if(!user){
        this._blog={...this._blog,user_id:""}
    }
}

async IsInfinite(len:number){
    const prom=new Promise((resolver)=>{
        resolver({
            bool:()=>{
                const Num= Math.abs(Array.from(Array(len).keys()).length);
                if(Num===Infinity){ return true;return false}
            },

        })
    });
    return prom
    
}
checkitemExist(eleId:string):{level:string,exist:boolean}{
    this._selectors.map(sel=>{
        if(sel.eleId===eleId){
            return{level:"selector",exist:true};
        }
        sel.rows.map(row=>{
            if(row.eleId===eleId){
                return {level:"row",exist:true};
            }
            row.cols.map(col=>{
                if(col.eleId===eleId){
                    return {level:"col",exist:true};
                }
                col.elements.map(ele=>{
                    if(ele.eleId===eleId){
                        return {level:"element_sel",exist:true}
                    }
                });
            });
        });
    });
    this.elements.map(ele=>{
        if(ele.eleId===eleId){
            return {level:"element",exist:true}
        }
    });
    return {level:"none",exist:false};
}
promGetElement(target:HTMLElement){
    return new Promise((resolver)=>{
        resolver(this.getElement(target));
    })as Promise<blogType>;
}
getElement(target:HTMLElement):blogType{
    //adds imgKey: flex.imgKey if selector && getAttribute("imgKey") Not selector and then adds data-backgroundimage=true
    if(!target) return this.blog; 
    const circle=target.getAttribute("data-shapeoutside-circle");
    const square=target.getAttribute("data-shapeoutside-square");
    const polygon=target.getAttribute("data-shapeoutside-polygon");
    const arrShapeoutside=[{name:"circle",value:circle},{name:"square",value:square},{name:"polygon",value:polygon},]
    const checkShape=arrShapeoutside.find(item=>(item.value !==null)) as {name:string,value:string|null};
    const {parsed,isJSON}=Header.checkJson(target.getAttribute("flex"));
    const nonFlexImgKey=target.getAttribute("imgKey");
    if(isJSON){
        const flex=parsed as flexType;
        const {selectorId,imgKey}=flex as flexType;
        this._selectors = this._selectors.map(select=>{
            if(select.eleId===selectorId){
                select.rows.map(row=>{
                    if(row.eleId===target.id){
                        row.imgKey=imgKey;
                        row.cssText=target.style.cssText;
                        row.class=target.className;
                        target.setAttribute("level","row");
                        target.setAttribute("data-backgroundimage","true");
                    }else{
                        row.cols.map(col=>{
                            if(col.eleId===target.id){
                                col.imgKey=imgKey;
                                col.cssText=target.style.cssText;
                                col.class=target.className;
                                target.setAttribute("level","col");
                                target.setAttribute("data-backgroundimage","true");
                            }else{
                                col.elements.map(ele=>{
                                    if(ele.eleId===target.id){
                                        ele.imgKey=imgKey;
                                        ele.cssText=target.style.cssText;
                                        ele.class=target.className;
                                        target.setAttribute("level","element");
                                        if((checkShape)){
                                            if( circle){
                                                ele.attr="data-shapeoutside-circle";
                                            }else if(square){
                                                ele.attr="data-shapeoutside-square";
                                            }else if(polygon){
                                                ele.attr="data-shapeoutside-polygon";
                                            }
                                        }
                                    }
                                    return ele;
                                });
                            }
                            return col;
                        });
                    }
                    return row;
                });
            }
            return select
        });
        this.selectors=this._selectors;
            this.blog={...this.blog,selectors:this.selectors};
    }else if(!isJSON){
        const ele=this.elements.find(element=>(element.eleId===target.id)) as elementType;
        if(nonFlexImgKey){

            if(ele){
                this._elements=this._elements.map(ele_=>{
                    if(ele_.eleId===target.id){
                        ele_.imgKey=nonFlexImgKey;
                        ele_.cssText=target.style.cssText;
                        ele_.class=target.className;
                        target.setAttribute("level","element");
                        if((checkShape)){
                            if(circle){
                                target.setAttribute(`data-shapeoutside-circle`,"true");
                                ele_.attr="data-shapeoutside-circle";
                            }else if(square){
                                target.setAttribute(`data-shapeoutside-square`,"true");
                                ele_.attr="data-shapeoutside-square";
                            }else if(polygon){
                                target.setAttribute(`data-shapeoutside-polygon`,"true");
                                ele_.attr="data-shapeoutside-polygon";
                            }
                        };
                    }
                    return ele_;
                });
                this.elements=this._elements;
                this.blog={...this.blog,elements:this.elements}
            }else if(this._blog.eleId===target.id){
                    const isTrue=target.getAttribute("data-backgroundImage");
                    if(isTrue==="true"){
                        this._blog={...this._blog,imgBgKey:nonFlexImgKey,class:target.className,cssText:target.style.cssText}
                        target.setAttribute("level","blog");
                    }else{
                        this._blog={...this._blog,imgKey:nonFlexImgKey,class:target.className,cssText:target.style.cssText};
                        target.setAttribute("level","blog");
                    }
                    this.blog=this._blog;
                
            }
        }
    }
    return this.blog
}
saveTheme(parent:HTMLElement,themes:themeType[]|null){
    //ADDS STYLES TO EXISTING PARENT STYLES
    if(parent){
        if(themes){
            themes.map(theme=>{
               for(const key of Object.keys(parent.style)){
                   if(theme.type==="fonts" && key==="fontFamily"){
                       parent.style[key]=theme.value;
                   }else if(theme.type==="background" && key==="backgroundColor"){
                       parent.style[key]=theme.value;
                   }else if(theme.type==="colors" && key==="color"){
                       parent.style[key]=theme.value;
                   }else if(theme.type==="backgroundImage" && key==="backgroundImage"){
                       parent.style[key]=theme.value;
                   }else if(theme.type==="backgroundSize" && key==="backgroundSize"){
                       parent.style[key]=theme.value;
                   }else if(theme.type==="backgroundPosition" && key==="backgroundPosition"){
                       parent.style[key]=theme.value;
                   }
               }
           });
        }
            //SAVE PARENT TO BLOG
            this._blog={...this._blog,cssText:parent.style.cssText}
            this.blog=this._blog;
    }
};
removeMainElement(parent:HTMLElement,divCont:HTMLElement,target:HTMLElement){
    const getDivCont=divCont.querySelectorAll(".xIconDiv");
    if(getDivCont){
        ([...getDivCont as any] as HTMLElement[]).map(child=>{
            if(child){
                divCont.removeChild(child);
            }
        });
    }
    
    const css="position:absolute;transform:translate(2px,5px);background:inherit;font-size:16px;background:lightgrey;font-weight:bold;border-radius:50%;color:black;top:-6px;left:0px;"
    divCont.style.position="relative";
    const xIconDiv=document.createElement("div");
    xIconDiv.setAttribute("contenteditable","false");
    xIconDiv.setAttribute("is-icon","true");
    xIconDiv.className="xIconDiv";
    xIconDiv.id="xIconDiv";
    xIconDiv.style.cssText=`${css}`;
    const cssStyle={background:"inherit",fontSize:"inherit"};
    FaCreate({parent:xIconDiv,name:FaCrosshairs,cssStyle})
    divCont.appendChild(xIconDiv);
    
    xIconDiv.addEventListener("click",(e:MouseEvent)=>{
        if(e){
            this.promRemoveElement(target).then(async(res)=>{
                if(res){
                    this.shiftPlace(res.placement)
                }
            });
            parent.removeChild(divCont)
            
            
            
            //resetting buttons
            Main.initMainBtns();
        }
    });

};
   

loadBlog(blog:blogType){
    this._elements=blog.elements;
    this._selectors=blog.selectors;
    this._selectCodes=blog.codes;
    this.charts=blog.charts;
    this._blog={...blog,name:blog.name,desc:blog.desc,title:blog.title,user_id:blog.user_id,selectors:blog.selectors,elements:blog.elements,codes:blog.codes,charts:this.charts};
    this.blog=this._blog;
    // localStorage.setItem("blog",JSON.stringify(blog));
    const max_=ModSelector.maxCount(blog);
    localStorage.setItem("placement",String(max_ + 1));
}
   

    
     shiftUpItems(item:{blog:blogType,changeEle:elementType|null,changeSelector:selectorType|null,changeCode:codeType|null,changeChart:chartType|null,place:number}):blogType{
        const {blog,changeEle,changeSelector,changeCode,changeChart,place}=item;
        let eles:elementType[]=blog.elements;
        let selects:selectorType[]=blog.selectors.filter(sel=>(!sel.header));
        let codes:codeType[]=blog.codes;
        let charts:chartType[]=blog.charts;
        const maxCount=ModSelector.maxCount(blog);
        if(maxCount >1){
            if(changeEle && eles){
                const ref=changeEle.placement;
                const toBePlaced=place;
                const check=eles && eles.find(ele=>(ele.placement ===toBePlaced)) ? true:false;
                eles=eles.sort((a,b)=>{if(a.id < b.id){return -1}else return 1}).map((ele)=>{
                    //THIS HANDLES ELEMENTS ONLY
                    // SHIFTING UP num> place
                if(ele.id !==(changeEle as elementType).id ){
                    if(ref>toBePlaced){
                        //SHIFT DOWN
                        if(ele.placement >=toBePlaced &&  ele.placement <= ref){
                            ele.placement +=1; //shifts down and slots (changeEle.placement=2,place=4)
                        }
                    }else if(toBePlaced >ref){
                        //SHIFT UP
                        if(ele.placement<=toBePlaced && ele.placement >= ref){
                            ele.placement -=1; //shifts up and slots
                        }
                    }
                    
                }
                        
                    return ele;
                });
                eles=eles.map(ele=>{
                    if(ele.id ===changeEle.id){
                        ele.placement=toBePlaced;
                        if(!check){
                            //THIS HANDLES SELECTS
                            selects= selects.map(sel=>{
                                if(sel.placement >= toBePlaced){
                                sel.placement +=1;
                                }else if(sel.placement <= toBePlaced){
                                    sel.placement -=1;
                                }
                                return sel;
                            });
                        }else{
                        }
                    }
                    return ele;
                });
               
                this._blog={...blog,elements:eles};
                this._blog={...this._blog,selectors:selects}
                this.blog=this._blog;
            }
            else if(changeSelector && selects){
                //REPLACING ITEM IN ORDER
                const ref=changeSelector.placement;
                const toBePlaced=place;
                const check=selects && selects.find(sel=>(sel.placement ===toBePlaced)) ? true:false;
                
                selects=selects.sort((a,b)=>{if(a.placement < b.placement){return -1}else return 1}).map((select,)=>{
                    //HANDLES WITHIN SELECTS
                    if(select.id !==(changeSelector as elementType).id ){
                        if(ref>toBePlaced){
                            //SHIFT DOWN
                            if(select.placement >=toBePlaced &&  select.placement <= ref){
                                select.placement +=1; //shifts down and slots (changeEle.placement=2,place=4)
                            }
                        }else if(toBePlaced >ref){
                            //SHIFT UP
                            if(select.placement<=toBePlaced && select.placement >= ref){
                                select.placement -=1; //shifts up and slots
                            }
                        }
                    }
                    return select;
                });
                selects=selects.map(sel=>{
                    if(sel.id ===changeSelector.id){
                        sel.placement=toBePlaced;
                        if(!check){
                            //THIS SHIFTS ALL DOW ONE
                            eles=eles.map(ele=>{
                            if(ele.placement >= toBePlaced){
                                ele.placement +=1;
                            }else if(ele.placement <= toBePlaced){
                                ele.placement -=1
                            }
                            return ele;
                            });
                        }
                    }
                    return sel;
                });
             
                this._blog={...blog,selectors:selects};
                this._blog={...this._blog,elements:eles};
                this.blog=this._blog;
            }
            else if(changeCode && codes){
                const ref=changeCode.placement;
                const toBePlaced=place

                codes=codes.sort((a,b)=>{if(a.placement < b.placement){return -1}else return 1}).map((code)=>{
                    // SHIFTING UP num> place
                    if(code.id !==(changeCode as elementType).id ){
                        if(ref>toBePlaced){
                            //SHIFT DOWN
                            if(code.placement >=toBePlaced &&  code.placement <= ref){
                                code.placement +=1; //shifts down and slots (changeEle.placement=2,place=4)
                            }
                        }else if(toBePlaced >ref){
                            //SHIFT UP
                            if(code.placement<=toBePlaced && code.placement >= ref){
                                code.placement -=1; //shifts up and slots
                            }
                        }
                    }
                    return code;
                });

            codes=codes.map(ele=>{
                if(ele.id ===changeCode.id){
                    ele.placement=place;
                }
                return ele;
            });
     
        this._blog={...blog,codes:codes};
        this.blog=this._blog;
            }else if(changeChart && charts){
                const ref=changeChart.placement;
                const toBePlaced=place

                charts=charts.sort((a,b)=>{if(a.placement < b.placement){return -1}else return 1}).map((chart)=>{
                    // SHIFTING UP num> place
                    if(chart.id !==(changeCode as elementType).id ){
                        if(ref>toBePlaced){
                            //SHIFT DOWN
                            if(chart.placement >=toBePlaced &&  chart.placement <= ref){
                                chart.placement +=1; //shifts down and slots (changeEle.placement=2,place=4)
                            }
                        }else if(toBePlaced >ref){
                            //SHIFT UP
                            if(chart.placement<=toBePlaced && chart.placement >= ref){
                                chart.placement -=1; //shifts up and slots
                            }
                        }
                    }
                    return chart;
                });

            charts=charts.map(ele=>{
                if(ele.id ===changeChart.id){
                    ele.placement=place;
                }
                return ele;
            });
     
        this._blog={...blog,charts:charts};
        this.blog=this._blog;
            }
            
        }
        return blog;
       
    }
    //THIS IS USED
    shiftPlace(ref:number){
        //THIS SHIFTS ALL SELECTORS AND ELEMENTS -1 AFTER ELEMENT DELETION THEN ASSIGNS PLACEMENT=MAXCOUNT: SEE BELOW
        const blog=this._blog;
        let eles=(blog && blog.elements && blog.elements) ? blog.elements : [] as elementType[];
        let selectors=(blog && blog.selectors) ? blog.selectors : [] as selectorType[];
        let codes=(blog && blog.codes) ? blog.codes : [] as codeType[];
        let charts=(blog && blog.charts) ? blog.charts : [] as chartType[];
        const maxCount=ModSelector.maxCount(blog);//already deleted
       
        if(maxCount>0 && !isNaN(maxCount)){
           
            eles=eles.sort((a,b)=>{if(a.placement < b.placement) return -1;return 1}).map((ele_,)=>{
                if(ele_ && ele_.placement > ref  && ele_.placement >0){
                    ele_.placement -=1;
                }
                return ele_;
            });
            selectors=selectors.sort((a,b)=>{if(a.placement < b.placement) return -1;return 1}).map((selector_)=>{
                if(selector_ && selector_.placement > ref && selector_.placement>0){
                    selector_.placement -=1;
                }
                return selector_;
            });
            codes=codes.sort((a,b)=>{if(a.placement < b.placement) return -1;return 1}).map((code_,index)=>{
                if(code_ && code_.placement > ref && code_.placement>0){
                    code_.placement =index+1;
                }
                return code_;
            });
            charts=charts.sort((a,b)=>{if(a.placement < b.placement) return -1;return 1}).map((chart_,index)=>{
                if(chart_ && chart_.placement > ref && chart_.placement>0){
                    chart_.placement =index+1;
                }
                return chart_;
            });
           

        }
        this._blog={...this._blog,selectors,elements:eles,codes,charts:charts}
        this.blog=this._blog;//sending it to localStorage
        this.placement=maxCount + 1;
        // console.log("shiftPlace")

    }
    static maxCount(blog:blogType):number{
        if(!blog) return 0;
        const eleCount=blog.elements ? blog.elements.length:0;
        const selCount=blog.selectors ? blog.selectors.length :0;
        const codeCount=blog.codes ? blog.codes.length :0;
        const chartCount=blog.charts ? blog.charts.length :0;
        const len=[eleCount,selCount,codeCount,chartCount].reduce((a,b)=>(a+b),0);
        // console.log("eleCount",eleCount,"selCount",selCount,"codeCount",codeCount,"len",len,"charts",chartCount);
        return len
    }
    static modAddEffect(target:HTMLElement){
        target.animate([
            {transform:"translate(-50%,-50%) scale(0.2)"},
            {transform:"translate(0%,0%) scale(1)"},
        ],{duration:750,iterations:1});
    };
    static isActive(target:HTMLElement){
        const arr=["iseActive","coliIsActive"]
        if(target as HTMLElement){
           arr.map(cl=>{
            const check= ([...target.classList as any] as string[]).includes(cl);
            return check
           });

        }
        return false;
    }
    static genArray(num:number):number[]{
        const arr:number[]=[];
        for(let i=1;i<=num;i++){
            arr.push(i);
        }
        return arr;
    }
    
    static cleanHtml(target:HTMLElement):string{
        const cleanItems=["DIV","SVG","I"];
        const textArr:string[]=[];
        const childs=target.children ? ([...target.children as any] as Element[]) :null;
        if(childs){
            childs.map(child=>{
                const check=cleanItems.includes(child.nodeName);
                if(child && check && child.textContent){
                    textArr.push(child.textContent);
                }
            });
            
        }else{
            return target.innerHTML
        }
        return textArr.join(" ")
    }
    static addBgImageToCss(target:HTMLElement,url:string):string{
        //THIS ADDS BACKGROUND-IMAGE TO TARGET
        let css=target.style.cssText;
        const arr:string[]=css.split(";");
        arr.push(`background-image:url(${url})`);
        arr.push("background-position:50% 50%");
        arr.push("background-size:100% 100%");
        css=arr.join(";");
        target.style.cssText=css;
        return css;
    }
   static getAllImgKeys(blog:blogType){
    let index=0;
    const arrimgs:{id:number,imgKey:string}[]=[];
    if(blog.imgKey){
        arrimgs.push({id:index,imgKey:blog.imgKey});
        index+=1;
    }else if(blog.imgBgKey){
        arrimgs.push({id:index,imgKey:blog.imgBgKey});
        index+=1;
    }
    blog.selectors.map(select=>{
        if(select){
            select.rows.map(row=>{
                if(row){
                    if(row.imgKey){
                        arrimgs.push({id:index,imgKey:row.imgKey});
                        index+=1;
                    }
                    row.cols.map(col=>{
                        if(col){

                            if(col.imgKey){
                                arrimgs.push({id:index,imgKey:col.imgKey});
                                index+=1;
                            }
                            col.elements.map(ele=>{
                                if(ele){
                                    if(ele.imgKey){
                                        arrimgs.push({id:index,imgKey:ele.imgKey});
                                        index+=1;
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    blog.elements.map(ele=>{
        if(ele){
            if(ele.imgKey){
                arrimgs.push({id:index,imgKey:ele.imgKey});
                index+=1;
            }
        }
    });
    return arrimgs;
    }

   
     
//NOT USED BELOW
    createDoc(element:string){
        
        switch(true){
            case element==="h1":
            return document.createElement("h1");
            case element==="h2":
            return document.createElement("h2");
            case element==="h3":
            return document.createElement("h3");
            case element==="h4":
            return document.createElement("h4");
            case element==="h5":
            return document.createElement("h5");
            case element==="p":
            return document.createElement("p");
            default:
                return
        }
    }
}

export default ModSelector 
export const modAddEffect=ModSelector.modAddEffect;
export const cleanInnerHTML=ModSelector.cleanInnerHTML;
export const maxCount=ModSelector.maxCount;

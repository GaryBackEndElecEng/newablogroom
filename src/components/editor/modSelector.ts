import { flexType, elementType, colType, rowType, selectorType, element_selType, codeType, blogType, userType, themeType, saveProcessType, pageCountType, chartType, barOptionType, lineOptionType, messageType, userDevelopType, postType, userQuoteType, accountType, sessionType, reorderType } from './Types';

import { FaCreate } from "../common/ReactIcons";
import { FaCrosshairs } from "react-icons/fa";
import { MouseOver } from "../common/MouseOver";
import Header from "@/components/editor/header";
import Main from "./main";
import Misc from "../common/misc";
import { Color } from "chart.js";
import Dataset from '../common/dataset';
import { idEnumType, idValueType, locationEnumType, selRowColType, selRowType, typeEnumType } from "@/lib/attributeTypes";
import { attrEnumArr, attrEnumArrTest, IDKeys, typeEnumArr, typeEnumArrTest } from '../common/lists';
import { mainIntroLetterStrType, mainIntroLetterType, mainResumeRefType, mainResumeStrType, mainResumeType, resumeRefStrType } from '../bio/resume/refTypes';





class ModSelector {
    static readonly main_css:string="min-height:100vh;height:100%;box-shadow:1px 1px 12px 2px black;border-radius:10px;padding-inline:0px;padding-block:0px;margin:0px;z-index:0;position:relative;width:100%;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;gap:1rem;";
    static readonly main_class="mx-auto d-flex w-100 flex-column my-0 h-100";
    static readonly mainHeader_css:string="margin-inline:0px;width:100%;display:flex;flex-direction:column;align-items:center;";
    static readonly mainHeader_class:string="sectionHeader";
    static readonly mainFooter_class:string="mainFooter";
    static readonly mainFooter_css:string="width:100%;padding-inline:5px;margin-inline:0px;";
    public readonly urlUpload="/api/uploadImage";
    public btnColor="#0C090A";
    private _status:"authenticated" | "loading" | "unauthenticated";
    private _count=1;
    private _placement=1;
    private _chart:chartType;
    public userInit:userType;
    public readonly initChart:chartType={
        id:0,
        type:"bar",
        eleId:"",
        cssText:"",
        class:"",
        chartOption:"",
        placement:0,
        blog_id:0
    }
   private _charts:chartType[];
   private _barOption:barOptionType;
   private _lineOption:lineOptionType;
   private readonly initSelector:selectorType={
    id:1,
    placement:1,
    name: "div",
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
    rows:"",
    rowNum:1,
    colNum:3,
    header:false,
    footer:false,
    blog_id:0,
    
    };
    private _selector:selectorType;
    public textArr:selectorType[];
  
    public  _header:selectorType;
    public  _footer:selectorType;
   
    public  _element:elementType;
    public initElement:elementType={
        id: 0,
        placement:0,
        selectorId:undefined,
        eleId: "",
        name: "",
        class: "",
        inner_html: "",
        cssText: "",
        attr:undefined,
        img:undefined,
        imgKey:undefined,
        blog_id:0,
        type:undefined,
    };
   public initElement_sel:element_selType={
        id: 0,
        col_id:0,
        selectorId:0,
        eleId: "",
        name: "",
        class: "",
        inner_html: "",
        cssText: "",
        attr:undefined,
        img:undefined,
        imgKey:undefined,
        order:0,
        type:undefined,

    };
    public _elements:elementType[]=[];
    public _selectors:selectorType[]=[];
    public _blog:blogType={} as blogType;
    public _blogs:blogType[]=[];
    private _selectCode:codeType={} as codeType;
    private _selectCodes:codeType[]=[];
    public initBlog:blogType;
    private _groupRows:{selectorId:string,rows:rowType[]}[];
    public _row:rowType={} as rowType;
    private _rows:rowType[]=[];
    private _codes:codeType[];
    public _bgColor:string;
  
    private _afterSignIn:saveProcessType;
    private _pageCounts:pageCountType[];
    public readonly btnUpDate:string;
    public readonly btnDetail:string;
   
    constructor(public dataset:Dataset)
    {
        this.userInit={
            id:"",
            email:"",
            name:undefined,
            password:undefined,
            emailVerified:undefined,
            image:undefined,
            imgKey:undefined,
            bio:undefined,
            showinfo:undefined,
            blogs:[] as blogType[],
            posts:[] as postType[],
            devDeployimgs:[] as userDevelopType[],
            quoteImgs:[] as userQuoteType[],
            accounts:[] as accountType[],
            sessions:[] as sessionType[],
            letters:[] as mainIntroLetterStrType[]|mainIntroLetterType[],
            resumes:[] as mainResumeStrType[] |mainResumeType[],
            references:[] as mainResumeRefType[] | resumeRefStrType[],
            admin:false,
            username:undefined,
        } as userType;

        this.btnUpDate="#0d6efd";
        this.btnDetail="#0dcaf0";
        this.initElement_sel={
            id: 0,
            col_id:0,
            selectorId:0,
            eleId: "",
            name: "",
            class: "",
            inner_html: "",
            cssText: "",
            attr:undefined,
            img:undefined,
            imgKey:undefined,
            order:0,
            type:undefined,
    
        };

        this.initElement={
            id: 0,
            placement:0,
            selectorId:undefined,
            eleId: "",
            name: "",
            class: "",
            inner_html: "",
            cssText: "",
            attr:undefined,
            img:undefined,
            imgKey:undefined,
            blog_id:0,
            type:undefined,
        };
        this._groupRows=[] as {selectorId:string,rows:rowType[]}[];
        
        this._selector=this.initSelector;
        this._element=this.initElement;
        this._status="unauthenticated";
        this._bgColor="rgb(233, 236, 242)" 
        this._header={} as selectorType;
        this._footer={} as selectorType;
        this._selector={} as selectorType;
        this._selectors=[] as selectorType[];
        this._elements=[] as elementType[];
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
        };
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
        this._chart=this.initChart;
        this._charts=[];
        this._pageCounts=[] as pageCountType[];
        this.initBlog={
            id:0,user_id:"",
            name:"",
            desc:"",
            title:"",
            img:undefined,
            eleId:undefined,
            class:ModSelector.main_class,
            cssText:ModSelector.main_css,
            imgKey:undefined,
            selectors:this._selectors,
            elements:this._elements,
            codes:this._codes,messages:[] as messageType[],
            show:false,rating:0,
            pageCounts:this._pageCounts,
            username:"username",
            date:new Date(),
            update:new Date(),
            attr:"square",
            charts:this._charts,
            barOptions:[]
        };

        this._afterSignIn={} as saveProcessType;
        const maxCount=ModSelector.maxCount(this._blog);
        const hasId=!!(this.blog?.user_id && this.blog.user_id !=="");
        const hasBlog=hasId && maxCount >0;
        if(!hasBlog){
            this._blog=this.initBlog;
        };
    
    };

get status(){
    return this._status;
};
set status(status:"authenticated" | "loading" | "unauthenticated"){
    this._status=status;
};

get count(){
    const getCount=localStorage.getItem("count");
    if(getCount){
        return parseInt(getCount)
    }else{
        return 1;
    }
};
set count(count:number){
    localStorage.setItem("count",String(count))
};

get element(){
    return this._element;
};
set element(element:elementType){
    this._element=element;
};
get elements(){
    return this._elements;
};
set elements(elements:elementType[]){
   
    this._elements=elements;
    this.blog={...this.blog,elements:elements};
    this.localStore({blog:this.blog});
};
get groupRows(){
    if(this._groupRows.length<=0){
        return [] as {selectorId:string,rows:rowType[]}[];
    }else{
        return this._groupRows;
    }
};
set groupRows(groupRows:{selectorId:string,rows:rowType[]}[]){
    this._groupRows=groupRows;
};
get rows(){
    return this._rows;
};
set rows(rows:rowType[]){
    this._rows=rows;
};
get row(){
    return this._row;
};
set row(row:rowType){
    this._row=row;
};
set selectors(selectors:selectorType[]){
    this._selectors=selectors;
    this.blog={...this.blog,selectors:selectors};
    this.localStore({blog:this.blog});
};
get selectors(){
    return this._selectors
};
get selector(){
    return this._selector;
};
set selector(selector:selectorType){
    this._selector=selector;
};
get selectCodes(){
    return this._selectCodes;
};
set selectCodes(selectCodes:codeType[]){
    this._selectCodes=selectCodes;
    this.blog={...this._blog,codes:selectCodes};
};
get selectCode(){
    return this._selectCode;
};
set selectCode(selectCode:codeType){
    this._selectCode=selectCode;
};

get header(){
    return this._header
}

get footer(){
    return this._footer
}

set pageCounts(pageCounts:pageCountType[]){
    this._pageCounts=pageCounts;
};
get pageCounts(){
    return this._pageCounts;
};

get placement(){
    const getPlace=localStorage.getItem("placement");
    // console.log("164:",getPlace)
    if(getPlace){
        this._placement=Number(getPlace);
        return parseInt(getPlace)
    }else{
        return 1;
    }
};
set placement(placement:number){
    this._placement=placement;
    localStorage.setItem("placement",JSON.stringify(placement))
};
get barOption(){
    return this._barOption
};
set barOption(barOption:barOptionType){
    this._barOption=barOption;
};
get lineOption(){
    return this._lineOption;
};
set lineOption(lineOption:lineOptionType){
    this._lineOption=lineOption;
    //adding it to localStorage
};
get chart(){
    return this._chart;
};
set chart(chart:chartType){
    this._chart=chart;
};
get charts(){
    return this._charts;
};
set charts(charts:chartType[]){
    this._charts=charts;
    this.blog={...this.blog,charts:charts};
    this.localStore({blog:this.blog});
};


get blog(){
    return this._blog
};

set blog(blog:blogType){
    blog={...blog};
    if(blog.show){
        this._blog={...blog};
    }else{
        this._blog={...blog,show:false};
    };
    // this.localStore({blog:this.blog})
    
   
};

localStore({blog}:{blog:blogType}){
    return localStorage.setItem("blog",JSON.stringify(blog));
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
};

 testBlog({name,count}:{name:string,count:number}): Promise<() => number | undefined>{
    return Promise.resolve(()=>{
        if(typeof window!=="undefined"){
            console.log("testBlog",name);
            return count
        }
    }) as  Promise<() => number | undefined>;
 };

//FOR CONTEXT importContext().
    async awaitLoadBlog(blog:blogType){
        return Promise.resolve({
                blog:()=>{
                    this._elements=blog.elements;
                    this._selectors=blog.selectors;
                    this._selectCodes=blog.codes;
                    this._charts=blog.charts;
                    this.blog=blog;
                    return this.blog;
                }

            }) as Promise<{blog:()=>blogType}>;
    };
    //FOR CONTEXT importContext()
    async awaitLoadBlogs(blogs:blogType[]){
        return Promise.resolve({
                blogs:()=>{
                    this.blogs=blogs;
                    return this.blogs;
                }

            }) as Promise<{blogs:()=>blogType[]}>;
    };

    loadFromLocal():Promise<{getBlog:()=>{blog:blogType,user:userType|null}}>{
        return Promise.resolve({
            getBlog:()=>{
                if(typeof window !=="undefined"){
                    const strBlog=localStorage.getItem("blog");
                    const strUser=localStorage.getItem("user");
                    if(strBlog){
                        const blog=JSON.parse(strBlog);
                        const maxCount=ModSelector.maxCount(blog);
                        if(maxCount>0){
                            this.blog={...blog};
                            if(strUser){
                                const user=JSON.parse(strUser);
                                this.blog={...this.blog,user_id:user.id};
                                this.loadBlog({blog:this.blog,user});
                                return {blog:this.blog,user};
                            }else{
                                this.loadBlog({blog:this.blog,user:null});
    
                                return {blog:this.blog,user:null};
                            }

                        }else{
                            this.blog=this.initBlog;
                            this.loadBlog({blog:this.blog,user:null});
                            return {blog:this.blog,user:null};
                        }
                    }else if(strUser){
                        const user=JSON.parse(strUser);
                        this.blog={...this.initBlog,user_id:user.id};
                        this.loadBlog({blog:this.blog,user:null});
                        return {blog:this.blog,user};
                    }else{
                        this.loadBlog({blog:this.initBlog,user:null});
                        return {blog:this.initBlog,user:null};
                    }
                    
                }

            }
        }) as Promise<{getBlog:()=>{blog:blogType,user:userType|null}}>;
    };

    

   async rowAdder({target,selectEle,idValues,selector}:{target:HTMLElement,selectEle:HTMLElement,idValues:idValueType[],selector:selectorType}):Promise<{rowEle:rowType | undefined,target:HTMLElement,selectEle:HTMLElement,idValues:idValueType[],sel:selectorType}>{
       
        const node=target.nodeName.toLowerCase();
        const colAttr=selector.colAttr[0];
        const topNum=colAttr.T;
        const botNum=colAttr.B;
        let row_:rowType={} as rowType;
        const parent=target.parentElement;
        const eleId=target.id;
        const parent_id= parent ? parent.id:null;
        if(parent_id) idValues.push({eleId,id:"parent_id",attValue:parent_id});
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
           
                const {rows}=this.checkGetRows({select:selector});
                const ID=rows ? rows.length :0;
                const check=(rows.find(row=>(row.eleId===eleId))) ;
                idValues.push({eleId,id:"rowId",attValue:eleId});
                const selRow:selRowType={selectorId:selector.eleId,rowId:eleId};
                idValues.push({eleId,id:"selRow",attValue:JSON.stringify(selRow)});
                idValues.push({eleId,id:"rowNum",attValue:String(topNum+botNum)});
                idValues.push({eleId,id:"selectorId",attValue:selector.eleId});
                idValues.push({eleId,id:"ID",attValue:eleId});
                idValues.push({eleId,id:"isRow",attValue:"true"});
                idValues.push({eleId,id:"rowOrder",attValue:String(ID)});
                const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                idValues.push({eleId:target.id,id:"selectorId",attValue:selector.eleId});
                if(!check){
                    row_={
                        id: ID,
                        name:node,
                        class:target.className,
                        eleId,
                        inner_html:target.innerHTML ? target.innerHTML : "",
                        cssText:target.style.cssText,
                        cols:[] as colType[],
                        selector_id:selector.id,
                        order:ID,
                        attr:undefined,
                        type:undefined
                    } as rowType;
                    //----------//---POPULATING ATTRIBUTES TO TARGET------\\-----///
                    const {idValues:retIdValues}=this.dataset.coreDefaultIdValues({
                        target,loc:"flexbox",
                        level:"row",
                        clean:false,
                        sel:selector,
                        row:row_,
                        col:null,
                        ele:null,
                        idValues

                    });
                       
                    idValues=retIdValues;
                    idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
                    this.dataset.populateElement({
                        target,
                        selRowColEle:row_,
                        level:"row",
                        loc:"flexbox",
                        idValues,
                        clean:false
                       });
                    getEleIds.map(kat=>{
                        const attrTest=attrEnumArrTest(row_);
                        const typeTest=typeEnumArrTest(row_);
                        const hasAttr=attrEnumArr.includes(kat.id);
                        const hasType=typeEnumArr.includes(kat.id as typeEnumType);
                        if(hasAttr && !attrTest){
                            row_.attr=kat.attValue;
                        }else if(hasType && !typeTest){
                            row_.type=kat.attValue;
                        }else if(kat.id==="imgKey"){
                            row_.imgKey=kat.attValue;
                        }
                    });
                     //THIS LOADS THE DEFAULTS AND POPULATES THE ELEMENT BASED ON IDVALUE INPUTS
                    rows.push(row_);//WORKS
                    // RE-ASSIGNMENT
                    const rowsString=JSON.stringify(rows);//works
                    selector.rows=rowsString
                }
            //ADDING NEW SELECTOR TO SELECTORS && PUSHING IT TO LOCAL
            this.selectors=this._selectors.map(select=>{
                    if(select.eleId===selector.eleId){
                        select=selector
                    }
                return select
            });
            this.localStore({blog:this.blog});
            //ADDING NEW SELECTOR TO SELECTORS && PUSHING IT TO LOCAL
            
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            this.dataset.idValues=idValues;
        //----------//---POPULATING ATTRIBUTES TO TARGET------\\-----///
        return Promise.resolve({rowEle:row_ as rowType,target,selectEle,idValues,sel:selector}) as Promise<{rowEle:rowType | undefined,target:HTMLElement,selectEle:HTMLElement,idValues:idValueType[],sel:selectorType}>;
        
    };

    
  
    async colAdder({parent,target,idValues,selector,row}:{parent:HTMLElement,target:HTMLElement,idValues:idValueType[],selector:selectorType,row:rowType}):Promise<{target:HTMLElement,col:colType,idValues:idValueType[],parent:HTMLElement,selector:selectorType,row:rowType}>{
       
        const eleId=target.id;
        const node=target.nodeName.toLowerCase();
        let col:colType={} as colType;
        row.cols=row.cols as colType[] 
        const check=row.cols.map(col=>(col.eleId)).includes(target.id as string);
        // console.log("277:check:determines if COL extis",check,"target.id",target.id,)//works
        if(!check){
            const ID1=row.cols?.length ? row.cols.length : 0;
            col={
                id:ID1,
                name:node ,
                class:target.className.split(" ").filter(cl=>(cl !=="box-shadow")).join(" "),
                eleId:target.id,
                inner_html:target.textContent ? target.textContent : "",
                cssText:target.style.cssText,
                elements:[] as element_selType[],
                row_id:row.id,
                order:ID1,
                attr:""
                }as colType;

            //LOADING ATTRIBUTES INTO ELEMENT, BELOW
            idValues.push({eleId,id:"colOrder",attValue:String(ID1)});
            idValues.push({eleId,id:"colId",attValue:eleId});
            idValues.push({eleId,id:"ID",attValue:eleId});
            const selRowCol:selRowColType={selectorId:selector.eleId,rowId:eleId,colId:eleId};
            idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
            idValues.push({eleId,id:"rowNum",attValue:String(row.order)});
            const selRow={selectorId:selector.id,rowId:row.id};
            idValues.push({eleId,id:"selRow",attValue:JSON.stringify(selRow)});
            //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
            const {idValues:retIdValues}=this.dataset.coreDefaultIdValues({
                target,
                sel:selector,
                row,
                col:col,
                ele:null,
                idValues,
                loc:"flexbox",
                level:"col",
                clean:false
            });
            idValues=retIdValues
            const getEleIds=idValues.filter(kat=>(kat.id===eleId));
            getEleIds.map(kat=>{
                const hasAttr=attrEnumArr.includes(kat.id);
                const hasType=typeEnumArr.includes(kat.id as typeEnumType);
                if(hasAttr){
                    col.attr=kat.attValue;
                }else if(hasType){
                    col.type=kat.attValue;
                }else if(kat.id==="imgKey"){
                    col.imgKey=kat.attValue;
                }
            });
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:eleId});
            this.dataset.populateElement({target,selRowColEle:col,loc:"flexbox",level:"col",idValues,clean:false});
            this.dataset.idValues=this.dataset.idValues.concat(getEleIds);
            //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
            
            row.cols=[...row.cols,col];
            
            //ADDING MODIFIED ROW TO SELECTOR
            const {rows}=this.checkGetRows({select:selector});
            const newRows=rows.map(row_=>{
                if(row_.eleId===row.eleId){
                    row_=row;
                }
                return row_;
            });
            //ADDING NEW ROWS TO SELECTOR
            selector.rows=JSON.stringify(newRows);
            //ADDING SELECTOR TO TO SELECTORS
            this.selectors=this._selectors.map(select=>{
                    if(select.eleId===selector.eleId){
                        select=selector;
                    }
                return select;
            });
            this.localStore({blog:this.blog});
        };

        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        const getEleIds_=idValues.filter(kat=>(kat.eleId===eleId));
        this.dataset.idValues=this.dataset.idValues.concat(getEleIds_);

           return Promise.resolve({target,col,idValues,parent,selector,row}) as Promise<{target:HTMLElement,col:colType,idValues:idValueType[],parent:HTMLElement,selector:selectorType,row:rowType}>;
            
    };
   

    async elementAdder({target,sel,rowEle,colEle,idValues}:{target:HTMLElement,sel:selectorType|null,rowEle:rowType|null,colEle:colType|null,idValues:idValueType[]}): Promise<{
        target: HTMLElement;
        flex: flexType | null;
        ele: element_selType;
        idValues:idValueType[];
    } | {
        target: HTMLElement;
        sel:selectorType|null;
        rowEle:rowType|null;
        colEle:colType|null;
        ele: elementType | element_selType;
        idValues:idValueType[];
    } | undefined>{
        const blog=this.blog;
        const eleId=target.id;
        const {cleaned}=this.removeClasses({target,classes:["isActive","box-shadow"]});
        const node=target.nodeName.toLowerCase();
        let ele:element_selType|elementType={} as element_selType|elementType;
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        if(sel && rowEle && colEle){
            sel=sel as selectorType;
            rowEle=rowEle as rowType;
            colEle=colEle as colType;
            ele=ele as element_selType;
            const selRowCol:selRowColType={selectorId:sel.eleId,rowId:rowEle.eleId,colId:colEle.eleId}
            idValues.push({eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)});
            target.setAttribute("is-element","true");
            ele=this.initElement_sel
            //ADDING ATTRIBUTES
            const {rows}=this.checkGetRows({select:sel});
            rowEle.cols = rowEle.cols.map(col=>{
                if(colEle && sel){
                    if(col.eleId===colEle.eleId){
                        
                        const ID=col.elements ? col.elements.length:0;
                        const check=col.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
                        if(node && !check){
                            ele={
                                ...ele,
                                id:ID ,
                                selectorId:sel.id,
                                name:node,
                                class:cleaned.join(" "),
                                eleId:target.id,
                                cssText:target.style.cssText,
                                inner_html:target.innerHTML,
                                attr:undefined,
                                col_id:col.id,
                                order:ID,
                                
                            } as element_selType;
                            
                            if(node==="img"){
                                const target_=target as HTMLImageElement;
                                ele.img=target_.src;
                                ele.inner_html=target_.alt;
                            }
                            //LOADING ATTRIBUTES INTO ELEMENT, BELOW
                            idValues.push({eleId,id:"eleOrder",attValue:String(ID)});
                            const {idValues:retIdValues}=this.dataset.coreDefaultIdValues({
                                target,
                                sel,
                                row:rowEle,
                                col:colEle,
                                ele,
                                idValues,
                                loc:"flexbox",
                                level:"element",
                                clean:false
                            });
                            idValues=retIdValues
                            const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                            getEleIds.map(kat=>{
                                const hasAttr=attrEnumArr.includes(kat.id);
                                const hasType=typeEnumArr.includes(kat.id as typeEnumType);
                                if(kat.attValue){
                                    if(hasAttr && !ele.attr){
                                        ele.attr=kat.attValue;
                                        console.log("attValue",kat.attValue)
                                    }else if(hasType && !ele.type){
                                        ele.type=kat.attValue;
                                    }else if(kat.id==="imgKey"){
                                            ele.imgKey=kat.attValue;
                                        }
                                    }
                                });
                                idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:eleId});
                                this.dataset.idValues=this.dataset.idValues.concat(getEleIds);
                                //-------////// ----GETTING COMPONENT ATTRIBUTES-------\\\\\\---/////
                                
                                
                                //RE-ASSIGNMENT HAS NEW INFO FROM TARGET
                                // ele={...newEle} as element_selType
                                //RE-ASSIGNMENT HAS NEW INFO FROM TARGET
                                col.elements.push(ele)
                                // console.log("ELEMENT ADDER:INSIDE",col.elements)
                            }
    
                    }

                }
                return col;
            });
            const newRows= rows.map(row=>{
                    if(rowEle && row.eleId===rowEle.eleId){
                        row=rowEle;
                    }
                return row;
            });
            const strRows=JSON.stringify(newRows);
            sel={...sel,rows:strRows} as selectorType;
            this.selectors = this._selectors.map(select=>{
                    if(select.eleId===(sel as selectorType).eleId){
                        select=sel as selectorType;
                    }
                return select;
            });
            this.selectors=this._selectors; //saving it to blog
            this.localStore({blog:this.blog});
            // console.log("DATASET FULL",ids_)
            ele=ele as element_selType|elementType
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            return Promise.resolve({target,ele:ele as element_selType,sel:sel as selectorType,rowEle:rowEle as rowType,colEle:colEle as colType,idValues}) as Promise<{target:HTMLElement,ele:element_selType,sel:selectorType,rowEle:rowType,colEle:colType,idValues:idValueType[]}>;
        }else{
            ele=ele as elementType
            ele=this.initElement;
            const ID=this.elements.length;
            const imgKey=target.getAttribute("imgKey") ;
            const check=this.elements.map(ele_=>(ele_.eleId)).includes(target.id as string);
                if(node && !check){

                let ele:elementType={} as elementType;
                    ele={
                        ...ele,
                        id:ID ,
                        blog_id:blog.id,
                        selectorId:undefined,
                        placement:this.placement,
                        name:node,
                        class:cleaned.join(" "),
                        eleId:target.id,
                        cssText:target.style.cssText,
                        inner_html:target.innerHTML,
                    };
                   if(imgKey) ele={...ele,imgKey};
                    
                    if(node==="img"){
                        const target_=target as HTMLImageElement;
                        ele.img=target_.src;
                        ele.inner_html=target_.alt;
                        if(imgKey) ele={...ele,imgKey};
                    }
                    //LOADING ATTRIBUTES INTO TARGET ELEMENT, BELOW
                    idValues.push({eleId,id:"numEles",attValue:String(ID)});
                    idValues.push({eleId,id:"elementId",attValue:target.id});
                    idValues.push({eleId,id:"elePlacement",attValue:String(this.placement)});
                    idValues.push({eleId,id:"ele_id",attValue:String(ID)});
                     //LOADING ATTRIBUTES INTO ELEMENT, BELOW
                     idValues.push({eleId,id:"eleOrder",attValue:String(ID)});
                     //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///
                     const {idValues:retIdValues}=this.dataset.coreDefaultIdValues({
                        target,
                        sel:null,
                        row:null,
                        col:null,
                        ele,
                        idValues,
                        loc:"htmlElement",
                        level:"element",
                        clean:false
                    });
                    idValues=retIdValues;
                    const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                     getEleIds.map(kat=>{
                        const hasAttr=attrEnumArr.includes(kat.id);
                        const hasType=typeEnumArr.includes(kat.id as typeEnumType);
                        if(hasAttr && !ele.attr){
                            ele.attr=kat.attValue;
                        }else if(hasType && !ele.attr){
                            ele.type=kat.attValue;
                        }else if(kat.id==="imgKey"){
                            ele.imgKey=kat.attValue;
                        }
                    });
                    idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId:eleId});
                    this.dataset.idValues=this.dataset.idValues.concat(getEleIds);
                    //----------//---POPULATING ATTRIBUTES TO TARGET && ADDS ATTR/TYPE/IMGKEY ATTRIBUTES FROM IDVALUES------\\-----///

                    //RE-ASSIGNMENT HAS NEW INFO FROM TARGET
                  
                    
                    this._elements.push(ele);
                    this.elements=this._elements;
                   
                    this.placement= this.placement + 1;
                    idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
                    this.dataset.idValues=idValues;
                    return Promise.resolve({target,ele:ele as elementType,sel:null,rowEle:null,colEle:null,idValues}) as Promise<{target:HTMLElement,ele:elementType,sel:null,rowEle:null,colEle:null,idValues:idValueType[]}>;
                    
                }
        }

    };


    removeElement({target,idValues,selRowCol}:{
        target:HTMLElement,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }):Promise<{ele: element_selType | undefined;idValues: idValueType[];}> | Promise<{
        ele: elementType | undefined;
        idValues: idValueType[];
    }>{
        const eleId=target.id;
        
       
         idValues.map((kat,index)=>{
             if(kat.eleId===target.id){
                 idValues.splice(index,1);
                 this.dataset.idValues=idValues;
                }
            });
            if(selRowCol){
                let retEle:element_selType|undefined={} as element_selType;
                const {selectorId,rowId,colId}=selRowCol;
                idValues.map((kat,index)=>{
                    if(kat.eleId===rowId || kat.eleId===colId || kat.eleId===selectorId || kat.eleId===eleId){
                        idValues.splice(index,1);
                    }
                });
            this._selectors=this._selectors.map(select=>{
                // console.log("sel.id",selector_.id, "select",selector)
                if(selectorId===select.eleId){
                    const {rows}=this.checkGetRows({select:select});
                  const newRows=rows.map(row=>{
                        
                        if(row.eleId===rowId){
                            // console.log("row",rowId)
                            row.cols.map(col=>{
                                if(col.eleId===colId){
                                    col.elements.map((ele,index)=>{
                                        if(ele.eleId===target.id){
                                            retEle=ele as element_selType;
                                            col.elements.splice(index,1);
                                        }
                                    });
                                    
                                }
                                return col;
                            });
                        }
                        return row;
                    })
                    select.rows=JSON.stringify(newRows) as string;
                }
                return select;
            });
            this.selectors=this._selectors;
            this.dataset.idValues=idValues;
           return Promise.resolve({ele:retEle as element_selType,idValues}) as Promise<{ele:element_selType|undefined,idValues:idValueType[]}>;
        }else{
           let retEle_:elementType|undefined={} as elementType|undefined;
            this._elements.map((ele,index)=>{
                if(ele.eleId===target.id){
                    retEle_=ele as elementType;
                    this._elements.splice(index,1);
                }
            });
            this.elements=this._elements;
            idValues.map((kat,index)=>{
                if(kat.eleId===eleId){
                    idValues.splice(index,1);
                }
            });
            this.dataset.idValues=idValues;
            return Promise.resolve({ele:retEle_,idValues}) as Promise<{ele:elementType|undefined,idValues:idValueType[]}>;
        }
        
        
    };

   
    addAttribute({target,type,attr,idValues,selRowCol}:{
        target:HTMLElement,
        type:string,
        attr:string,
        idValues:idValueType[],
        selRowCol:selRowColType|null

    }){
        const eleId=target.id;
        const isActive=([...target.classList as any] as string[]).includes("isActive");
        const arrType=["color","class","font-family","font-size"];
        const {cleaned}=this.removeClasses({target,classes:["isActive","box-shadow",attr]});
        const checkclass=cleaned.includes(attr)||false;
        const check=arrType.includes(type);
        const idValue:idValueType={eleId,id:"update",attValue:"attribute"};
        this.dataset.upDateIdValue({target,idValues,idValue})
        if(!check ) return
        
        if(type !=="font-family" && isActive){
            if(selRowCol){
                const {selectorId,rowId,colId}= selRowCol;
                // console.log("TAG",tag,this.selectors)
                this._selectors=this._selectors.map(selector_=>{
                    if(selectorId && (selector_.eleId===(selectorId as string))){
                        const rows=JSON.parse(selector_.rows) as rowType[];
                        rows.map(row=>{
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
                                                        if(checkclass){
                                                        element.class=cleaned.join(" ");
                                                        }else{
                                                            cleaned.push(attr);
                                                            element.class=cleaned.join(" ");
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
                        selector_.rows=JSON.stringify(rows) as string;
                    }
                    return selector_;
                });
                this.selectors=this._selectors;
            }else{
                this.elements=this.elements.map(ele=>{
                        if(ele.eleId===target.id){
                            switch(true){
                                case type==="color":
                                    ele.cssText+=`color:${attr};`;
                                return ele;
                                case type==="class" :
                                    if(checkclass){
                                        ele.class=cleaned.join(" ");
                                        }else{
                                            cleaned.push(attr);
                                            ele.class=cleaned.join(" ");
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
                            
                            };
                        };
                        
                    return ele;
                });
            };
        }else{
            const fontFamily=target.style.fontFamily;
            if(fontFamily){
                this.selectors=this.selectors.map(selector=>{
                    const addFont=selector.cssText.split(";");
                    addFont.push(`"font-family":${fontFamily}`);
                    selector.cssText=addFont.join(";");
                    return selector;
                });
                if(!Main.textarea) return;
                Main.textarea.style.fontFamily =`${fontFamily}`;
            }
        }
    };


    removeClass(target:HTMLElement,class_:string):string{
        let classes=([...target.classList as any] as string[]);
        classes =classes.map(cls=>{
            if(cls===class_){
                cls="";
            }
            return cls
        });
        
        return classes.join(" ");
    };

   
   async updateElement({target,idValues,selRowCol}:{
    target:HTMLElement|HTMLImageElement,
    idValues:idValueType[],
    selRowCol:selRowColType|null
 

   }):Promise<{target:HTMLElement,ele:elementType|element_selType|undefined,idValues:idValueType[]}>{
    
        const eleId=target.id;
        const node=target.nodeName.toLowerCase()
        const getImgKey=this.dataset.getIdValue({target,idValues,id:"imgKey"});
        const getImgDesc=this.dataset.getIdValue({target,idValues,id:"imgDesc"});
        const imgDesc=getImgDesc?.attValue || undefined;
        const imgKey=getImgKey?.attValue ||undefined
        let retEle:elementType|element_selType|undefined={} as elementType|element_selType|undefined;
       
        if(selRowCol){
            const { selectorId,rowId,colId}=selRowCol ;
            this.selectors=this.selectors.map((select)=>{
                    if(select.eleId===selectorId){
                       this.rows=this.groupRows.filter(kv=>(kv.selectorId===select.eleId))[0]?.rows;
                      this.rows=this.rows.map((row)=>{
                            if(row.eleId===rowId){
                              row.cols.map(async(col)=>{
                                if(col.eleId===colId){
                                    col.elements.map((ele)=>{
                                        if(ele.eleId===target.id){
                                            ele.cssText=target.style.cssText;
                                            ele.class=target.className;
                                            ele.inner_html=target.innerHTML;
                                            ele.imgKey=imgKey;
                                            ele.attr=imgDesc;
                                            if(node==="img"){ 
                                                ele.img=(target as HTMLImageElement).src;
                                                ele.inner_html=(target as HTMLImageElement).alt
                                            };
                                            retEle=ele;
                                           idValues= this.datasetSincUpdate({target,ele:ele,idValues,level:"element",loc:"flexbox"});
                                            retEle=ele;
                                            const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                                            const testAttr=attrEnumArrTest(ele);
                                            const testType=typeEnumArrTest(ele);
                                            getEleIds.map(kat=>{
                                                if(kat.attValue){
                                                    if(testAttr && kat.id===testAttr.id ){
                                                        ele.attr=kat.attValue
                                                    }else if(testType && kat.id===testType.id ){
                                                        ele.type=kat.attValue
                                                    }else if(kat.id==="imgKey"){
                                                        ele.imgKey=kat.attValue
                                                    }
                                                }
                                            });

                                        };
                                        
                                        return ele;
                                    });
                                }
                                return col;
                            });
                            }
                            return row;
                        });
                        select.rows=JSON.stringify(this.rows) as string;
                        this.groupRows=this.groupRows.map(kv=>{
                            if(kv.selectorId===select.eleId){
                                kv.rows=this.rows;
                            }
                            return kv;
                        });
                    }
                return select;
            });
           
            retEle=retEle as element_selType;
            this.dataset.idValues=idValues;
            return Promise.resolve({target,ele:retEle as element_selType,idValues}) as Promise<{target:HTMLElement,idValues:idValueType[],ele:element_selType}>;
        }else{
            this.elements=this.elements.map((ele)=>{
                if(ele.eleId===target.id){
                    ele.cssText=target.style.cssText;
                    ele.class=target.className;
                    ele.imgKey=imgKey;
                    ele.attr=imgDesc;
                    ele.inner_html=target.innerHTML;
                    if(node==="img") ele.inner_html=(target as HTMLImageElement).alt;
                    idValues= this.datasetSincUpdate({target,ele:ele,idValues,level:"element",loc:"htmlElement"});
                    retEle=ele;
                    const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                    const testAttr=attrEnumArrTest(ele);
                    const testType=typeEnumArrTest(ele);
                    getEleIds.map(kat=>{
                        if(kat.attValue){
                            if(testAttr && kat.id===testAttr.id ){
                                ele.attr=kat.attValue
                            }else if(testType && kat.id===testType.id ){
                                ele.type=kat.attValue
                            }else if(kat.id==="imgKey"){
                                ele.imgKey=kat.attValue
                            }
                        }
                    });
                    retEle=ele;
                }
            return ele;
            });
            
            retEle=retEle as elementType;
            //REPOPULATING TARGET
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            this.dataset.idValues=idValues;
            this.datasetSincUpdate({target,ele:retEle,idValues,level:"element",loc:"htmlElement"});
           return Promise.resolve({target,ele:retEle as elementType,idValues}) as Promise<{target:HTMLElement,idValues:idValueType[],ele:elementType}>;
        }
    };


    footerPlacement():number{
        const maxPlacement=ModSelector.maxCount(this.blog);
        let footer=this._blog?.selectors?.find(select=>(select.footer===true));
        if(footer && maxPlacement>1){
            const remain=this._blog?.selectors?.filter(select=>(select.footer !==true));
            footer={...footer,placement:maxPlacement +1};
            this._selectors=[...remain,footer];
            this.selectors=this._selectors;
           
        }
        return maxPlacement +1
    };
    
    
   
    editElement({target,idValues,selRowCol}:{target:HTMLElement | HTMLImageElement,idValues:idValueType[],selRowCol:selRowColType|null}){
        const eleId=target.id;
        const idValue={eleId,id:"update",attValue:"edit"} as idValueType;
        this.dataset.upDateIdValue({target,idValue,idValues});
        if(selRowCol){
           
            const {selectorId,rowId,colId}= selRowCol as selRowColType;
            
            target.oninput=(e:Event)=>{
                if(e){
                        const select=this.selectors.find(sel=>sel.eleId===selectorId)
                        if(select){
                           this.rows=this.groupRows.filter(kv=>(kv.selectorId===select.eleId))[0]?.rows;
                            this.rows=this.rows.map(row=>{
                                if(row.eleId===rowId){
                                    row.cols.map(col=>{
                                        if(col.eleId===colId){
                                            col.elements.map(element=>{
                                                if(element.eleId===target.id){
                                                    element.inner_html=target.innerHTML;
                                                        
                                                    }
                                                    return element;
                                                });
                                        }
                                        return col;
                                    });
                                }
                                return row;
                                });

                            select.rows=JSON.stringify(this.rows) as string;
                            this.blog.selectors=this.selectors.map(sel=>{
                                    if(sel.eleId===select.eleId){
                                        sel=select;
                                    }
                                return sel;
                            });
                            this.groupRows=this.groupRows.map(kv=>{
                                if(kv.selectorId===select.eleId){
                                    kv.rows=this.rows;
                                }
                                return kv;
                            });

                        }}

                }
                      
        target.onclick=(e:Event)=>{
            if(!e) return;
            this.updateElement({target,idValues,selRowCol})
        };
        target.onchange=(e:Event)=>{
            if(!e) return;
            this.updateElement({target,idValues,selRowCol})
        };

        }else{
            target.oninput=(e:Event)=>{
                if(!e) return;
                          
                this._elements=this._elements.map(ele=>{
                    if(ele.eleId===target.id){
                        ele.inner_html=target.innerHTML;
                    }
                return ele;
                });
                
            };
        }
    };

    
    async updateRow({target,idValues,selRow}:{target:HTMLElement,idValues:idValueType[],selRow:selRowType}):Promise<{row:rowType,target:HTMLElement,idValues:idValueType[]}|undefined>{
       
        const eleId=target.id;
        let row_:rowType| undefined = {} as rowType|undefined;
        const getImgKey=this.dataset.getIdValue({idValues,target,id:"imgKey"});
        const imgKey=getImgKey?.attValue || undefined;
        if(!selRow) return;
        const {selectorId,rowId}=selRow;
        const isRow= rowId===eleId
        if(!isRow){
            Misc.message({parent:target,msg:"target.id is not RowId,,,canceling row-update",type_:"error",time:1300});
        }else{

            this.selectors=this._selectors.map((select)=>{
                if(select.eleId===selectorId){
                    this.rows=this.groupRows.filter(kv=>(kv.selectorId===selectorId))[0]?.rows;
                   this.rows= this.rows.map((row)=>{
                        if(row.eleId===target.id){
                            row.class=target.className;
                            row.cssText=target.style.cssText;
                            row.imgKey=imgKey
                           idValues= this.datasetSincUpdate({target,ele:row,idValues,level:"row",loc:"flexbox"});
                           const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                                  const testAttr=attrEnumArrTest(row);
                                  const testType=typeEnumArrTest(row);
                                  getEleIds.map(kat=>{
                                    if(kat.attValue){
                                        if(testAttr && kat.id===testAttr.id ){
                                            row.attr=kat.attValue
                                        }else if(testType && kat.id===testType.id ){
                                            row.type=kat.attValue
                                        }else if(kat.id==="imgKey"){
                                            row.imgKey=kat.attValue
                                        }
                                    }
                                  });
                        }
                        row_=row;
                        return row;
                    });
                    select.rows=JSON.stringify(this.rows);
                    this.groupRows=this.groupRows.map(kv=>{
                        if(kv.selectorId===select.eleId){
                            kv.rows=this.rows;
                        }
                        return kv;
                    });
                }

                return select;
            });
            
            //REPOPULATING TARGET
            idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            if(row_){
                this.dataset.populateElement({target,selRowColEle:row_,idValues,level:"row",loc:"flexbox",clean:false});
            }
           this.dataset.idValues=this.dataset.idValues.concat(idValues);
        }
            return Promise.resolve({row:row_ as rowType,target,idValues}) as Promise<{row:rowType,target:HTMLElement,idValues:idValueType[]}|undefined>;
    };

  
    async updateColumn({target,idValues,selRowCol}:{target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType}): Promise<{target:HTMLElement,col:colType|undefined,idValues:idValueType[]}|undefined>{
        const eleId=target.id;
        const getImgKey=this.dataset.getIdValue({idValues,target,id:"imgKey"});
        const imgKey=getImgKey?.attValue || undefined;
        let colEle:colType|undefined;
        const {selectorId,rowId,colId}=selRowCol
        
      
       
        if(!(colId && colId===eleId)){
            Misc.message({parent:target,msg:"!!TARGET IS NOT COLID,,,,canceling update",type_:"error",time:1200});
            return;
        }else{
    
            this.selectors=this._selectors.map((select)=>{
                if(select.eleId===selectorId){
                    this.rows=this.groupRows.filter(kv=>(kv.selectorId===select.eleId))[0]?.rows;
                    this.rows=this.rows.map((row)=>{
                        if(row.eleId===rowId){
                            row.cols.map((_col_)=>{
                                if(_col_.eleId===eleId){
                                    _col_.class=target.className;
                                    _col_.cssText=target.style.cssText;
                                    _col_.imgKey=imgKey;
                                    //LOADING ELEMENT 
                                    //REPOPULATING TARGET
                                  idValues=this.datasetSincUpdate({target,ele:_col_,idValues,level:"col",loc:"flexbox"});
                                  const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
                                  const testAttr=attrEnumArrTest(_col_);
                                  const testType=typeEnumArrTest(_col_);
                                  getEleIds.map(kat=>{
                                    if(kat.attValue){
                                        if(testAttr && kat.id===testAttr.id ){
                                            _col_.attr=kat.attValue
                                        }else if(testType && kat.id===testType.id ){
                                            _col_.type=kat.attValue
                                        }else if(kat.id==="imgKey"){
                                            _col_.imgKey=kat.attValue
                                        }
                                    }
                                  });
                                }
                                colEle=_col_;
                                return _col_;
                            });
                        }
                        return row;
                    });
                    select.rows=JSON.stringify(this.rows);
                    this.groupRows=this.groupRows.map(kv=>{
                        if(kv.selectorId===select.eleId){
                            kv.rows=this.rows;
                        }
                        return kv;
                    });
                }
                return select;
            });
            this.selectors=this._selectors;
            this.blog={...this.blog,selectors:this.selectors};
            this.localStore({blog:this.blog});
        }
        //RE-POPULATING TARGET WITH NEW COLLECTED ATTRIBUTES
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        this.dataset.idValues=idValues;
        //RE-POPULATING TARGET WITH NEW COLLECTED ATTRIBUTES
        return Promise.resolve({target,col:colEle,idValues}) as Promise<{target:HTMLElement,col:colType|undefined,idValues:idValueType[]}|undefined>;
        
    };


    datasetSincUpdate({target,ele,idValues,level,loc}:{
        target:HTMLElement,
        ele: elementType|element_selType|colType|rowType,
        idValues:idValueType[],
        level:"row"|"col"|"element",
        loc:"flexbox"|"htmlElement"
    }){
        const eleId=target.id;
        if(loc==="flexbox"){
            if(level==="row"){
                ele=ele as rowType;
            }else if(level==="col"){
                ele=ele as colType;
            }else{
                ele=ele as element_selType
            };

        }else{
            ele=ele as elementType;
        }

        const attrTest=attrEnumArrTest(ele);//ele.attr
        const typeTest=typeEnumArrTest(ele);//ele.type
        const removeAddIdValues:idValueType[]=[];
        for(const [key,value] of Object.entries(target.dataset)){
            if(attrTest && key===attrTest.id ){
                if(value){
                    ele.attr=value;
                    removeAddIdValues.push({eleId,id:key as idEnumType,attValue:value});
                }else{
                    ele.type=undefined;
                    removeAddIdValues.push({eleId,id:key as idEnumType,attValue:"remove"});
                }
            }else if(typeTest && key===typeTest.id){
                if(value){
                    ele.type=value;
                    removeAddIdValues.push({eleId,id:key,attValue:value});
                }else{
                    ele.type=undefined;
                    removeAddIdValues.push({eleId,id:key,attValue:"remove"});
                }
            }else if(key==="imgKey"){
                if(value){
                    ele.imgKey=value
                    removeAddIdValues.push({eleId,id:key,attValue:value});
                };
            }
        };
        removeAddIdValues.map(kv=>{
            if(kv){
                idValues.map((kat,index)=>{
                    if(kat.eleId===eleId){
                        const check=idValues.filter(kat=>(kat.eleId===eleId)).find(kat=>(kat.id===kv.id));
                        if(check){
                            if(kat && kat.id===kv.id){
                                if(kv.attValue==="remove"){
                                    idValues.splice(index,1);
                                    const idKey=IDKeys.find(k=>(k.id===kv.id));
                                    if(idKey?.key){
                                        target.removeAttribute(idKey.key)
                                    };
                                }else{
                                    kat.attValue=kv.attValue;
                                    const getIDKey=IDKeys.find(kv_=>(kv_.id===kv.id))
                                    if(getIDKey?.key){
                                        target.setAttribute(getIDKey.key,kv.attValue);
                                    }
                                };
                            };

                        }else if(!check && kv.attValue !=="remove"){
                            idValues.push({eleId,id:kv.id,attValue:kv.attValue});
                            const getIDKey=IDKeys.find(kv_=>(kv_.id===kv.id))
                                if(getIDKey?.key){
                                    target.setAttribute(getIDKey.key,kv.attValue);
                                }
                        };
                    };
                });
            };
        });
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId})
        return idValues;
    };

   
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
    };
   

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
    };

 
    cleanSelectorClass(selector:selectorType):selectorType | undefined{
        const arrClasses=["isActive","active"];
        if(!selector) return undefined;
        arrClasses.map(class_=>(selector.class.replace(class_,"")));
        const rows=JSON.parse(selector.rows) as rowType[];
        const selectorRows=rows.map(row=>{
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
        const strRows=JSON.stringify(selectorRows)
        selector={...selector,rows:strRows}
        return selector
    };


    
// GENERAL///////////////////////
removeHeader({parent,target,idValues}:{parent:HTMLElement,target:HTMLElement,idValues:idValueType[]}){
    target.style.position="relative";
    const blog=this.blog;
    const cssStyle={color:"white",fontSize:"12px",borderRadius:"50%"};
    const xIcon=document.createElement("div");
    xIcon.id="modSelector-remove-header";
    xIcon.setAttribute("is-icon","true");
    xIcon.setAttribute("data-delete","selector");
    xIcon.style.cssText="position:absolute;top:0;right:0;transform:translate(-18px,0px);border-radius:50%;background-color:black;color:white;border-radius:50%;padding:2px;"
    FaCreate({parent:xIcon,name:FaCrosshairs,cssStyle:cssStyle});
    target.appendChild(xIcon);
    xIcon.addEventListener("click",(e:MouseEvent)=>{
        if(e){
            const {idValues:retValues}=this.dataset.removeComponentIdValues({blog,eleId:target.id,idValues,loc:"flexbox"});
            this._selectors.map((sel,index)=>{
                if(sel.eleId===target.id){
                    this._selectors.splice(index,1);
                }
               
            });
            this.selectors=this._selectors;
            target.animate([
                {transform:"translate(0%,0%) scale(1)",opacity:"1"},
                {transform:"translate(-100%,-100%) scale(0.3)",opacity:"0"}
            ],{duration:600,iterations:1});
            setTimeout(()=>{
                parent.removeChild(target);
            },580);
            this.dataset.idValues=retValues
        }
    });
    xIcon.onmouseover=(e:MouseEvent)=>{
        if(e){
            MouseOver({parent:xIcon,msg:"Remove"});
        }
    };
};


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
            const rows=JSON.parse(select.rows) as rowType[];
               rows.map(row=>{
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
                select.rows=JSON.stringify(rows);
            return select;
                
            });
        this.selectors=this._selectors;
       
    };
};
};


showRemoveItem(parent:HTMLElement,divCont:HTMLElement,target:HTMLElement):void{
    const check=([...target.classList as any] as string[]).includes("isActive");
    if(check){
    target.style.position="relative";
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
    
    
};


///THIS IS FOR REMOVING EXTRA UNWANTED ELEMENTS OF SUBselector elements
removeUnwanted(eleName:string){
    this._selectors=this._selectors.map(sel=>{
        const rows=JSON.parse(sel.rows) as rowType[];
        rows.map(row=>{
                row.cols.map(col=>{
                        col.elements.filter(ele=>(ele.name !==eleName));
                    return col;
                });
            return row;
        });
        sel.rows=JSON.stringify(rows);
        return sel;
    });
    this.selectors=this._selectors;
};

async asyncBlogInitializer({user}:{user:userType}):Promise<blogType>{
    return Promise.resolve(this.blogInitializer(user)) as Promise<blogType>;
};

blogInitializer(user:userType|null):blogType{
    localStorage.setItem("placement","1");
    this._element=this.initElement;
    this._selector=this.initSelector;
    this._chart=this.initChart;
    this._elements=[] as elementType[];
    this._selectors=[] as selectorType[];
    this._codes=[] as codeType[];
    this._charts=[] as chartType[];
    this._blog={id:0,user_id:"",name:"",desc:"",img:undefined,eleId:undefined,class:undefined,cssText:undefined,imgKey:undefined,selectors:this._selectors,elements:this._elements,codes:this._codes,show:false,rating:0,pageCounts:this.pageCounts,date:new Date(),update:new Date(),attr:"square",charts:this.charts,barOptions:[],messages:[] as messageType[]};
    if(user){
        this._blog={...this._blog,user_id:user.id}
    }
    this.blog=this._blog;
    return this._blog;
}

async IsInfinite(len:number){
    const prom=Promise.resolve({
            bool:()=>{
                const Num= Math.abs(Array.from(Array(len).keys()).length);
                if(Num===Infinity)return true;
                return false;
            },

        });
    return prom
    
};


checkitemExist(eleId:string):{level:string,exist:boolean}{
    this._selectors.map(sel=>{
        if(sel.eleId===eleId){
            return{level:"selector",exist:true};
        }
        const rows=JSON.parse(sel.rows) as rowType[];
        rows.map(row=>{
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
};


saveTheme(parent:HTMLElement,themes:themeType[]|null){
    //ADDS STYLES TO EXISTING PARENT STYLES
    if(parent){
        if(themes){
            themes.forEach(theme=>{
               for(const key of Object.keys(parent.style)){
                const check1=["backgroundImage","backgroundSize","backgroundPosition","backgroundColor","color"].includes(key);
                const check2=["backgroundImage","backgroundSize","backgroundPosition","background","colors"].includes(theme.type);
                   if(check1 && check2){
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


removeMainElement({parent,divCont,target,idValues,selRowCol}:{parent:HTMLElement,divCont:HTMLElement,target:HTMLElement,idValues:idValueType[],selRowCol:selRowColType|null}){
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
            this.removeElement({target,idValues,selRowCol}).then(async(res)=>{
                if(res){
                    if((res.ele as elementType).type){
                        const ele=res.ele as elementType;
                        this.shiftPlace(ele.placement)

                    }
                }
            });
            parent.removeChild(divCont)
            
            
            
            //resetting buttons
            Main.initMainBtns();
        }
    });

};
   

loadBlog(item:{blog:blogType,user:userType|null}):{blog:blogType,user:userType|null}{
    const {blog,user}=item;
    this._elements=blog.elements;
    this._selectors=blog.selectors;//This consists of JSON selector.rows as JSON string
    this._selectCodes=blog.codes;
    this.charts=blog.charts;
    this._blog={...blog,id:blog.id,name:blog.name,desc:blog.desc,title:blog.title,user_id:blog.user_id,selectors:blog.selectors,elements:blog.elements,codes:blog.codes,charts:blog.charts,update:new Date()};
    if(user?.id){
        this._blog={...this._blog,user_id:user.id};
    }else{
        this._blog={...this._blog,user_id:""};
    }
    this.blog=this._blog;
  
    const max_=ModSelector.maxCount(blog);
    localStorage.setItem("placement",String(max_ + 1));
    return {blog:this.blog,user};
}

loadSimpleBlog(blog:blogType){
    this._elements=blog.elements;
    this._selectors=blog.selectors;
    this._selectCodes=blog.codes;
    this.charts=blog.charts;
    this._blog={...blog,name:blog.name,desc:blog.desc,title:blog.title,user_id:blog.user_id,selectors:blog.selectors,elements:blog.elements,codes:blog.codes,charts:this.charts};
    
}
   

    
     reOrder(item:{blog:blogType,toBeSlottedObj:{toBeSlotted:number,toBeSlottedName:string},place:number}):blogType{
        const {blog,place,toBeSlottedObj}=item;
         const {toBeSlotted,toBeSlottedName}=toBeSlottedObj
        const eles:elementType[]= blog.elements;
        const selects:selectorType[]= blog.selectors.filter(sel=>(!sel.header));
        const codes:codeType[]= blog.codes;
        const charts:chartType[]= blog.charts;

        //CHECK ON FINDING COMPONENT FROM PLACE SEARCH
        const isEles=eles.map(kv=>(kv.placement)).includes(place);
        const isSelectors=selects.map(kv=>(kv.placement)).includes(place);
        const isCodes=codes.map(kv=>(kv.placement)).includes(place);
        const isCharts=charts.map(kv=>(kv.placement)).includes(place);
        const maxCount=ModSelector.maxCount(blog);
        const groups=[{name:"elements",group:eles},{name:"selectors",group:selects},{name:"codes",group:codes},{name:"charts",group:charts}].filter(item=>(item.group.length>0));
        const toBeSlotterObject=groups.filter(group=>(group.name===toBeSlottedName))[0].group.find(item_=>(item_.placement===toBeSlotted));
        
        const foundEle=eles.find(ele=>(ele.placement ===place));
        const foundSel=selects.find(sel=>(sel.placement ===place));
        const foundCode=codes.find(code=>(code.placement ===place));
        const foundChart=charts.find(chart=>(chart.placement ===place));

        const itemSelected=[
            {name:"elements",isFound:isEles,selected:foundEle},
            {name:"selectors",isFound:isSelectors,selected:foundSel},
            {name:"codes",isFound:isCodes,selected:foundCode},
            {name:"charts",isFound:isCharts,selected:foundChart}
        ].find(_item=>(_item.isFound));
        // console.log("itemSelected",itemSelected);//works
        if(maxCount >1 && groups && itemSelected){
            groups.map(group=>{
                /// --FOUND ITEM---///
                let groupItems:elementType[]|selectorType[]|codeType[]|chartType[]=[];
                if(group.name==="elements"){
                    groupItems=group.group as elementType[];
                }else if(group.name==="selectors"){
                    groupItems=group.group as selectorType[];
                }else if(group.name==="codes"){
                    groupItems=group.group as codeType[];
                }else if(group.name==="charts"){
                    groupItems=group.group as chartType[];
                };
                let selectedItem:elementType | selectorType | codeType | chartType;
                let selected:number
                if(itemSelected.name==="elements"){
                    selectedItem=itemSelected.selected as elementType;
                    selected=selectedItem.placement;
                }else if(itemSelected.name==="selectors"){
                    selectedItem=itemSelected.selected as selectorType;
                    selected=selectedItem.placement;
                }else if(itemSelected.name==="codes"){
                    selectedItem=itemSelected.selected as codeType;
                    selected=selectedItem.placement;
                }else if(itemSelected.name==="charts"){
                    selectedItem=itemSelected.selected as chartType;
                    selected=selectedItem.placement;
                }
                // console.log("toBeSlottedObject",toBeSlotterObject)//works
                if( toBeSlotterObject){
                    //TARGET GROUP WITH TO BE SLOTTED WITHIN GROUP
                    //--------------OPEN A SLOT AND SLOT: SLOTINSERTCREATOR--------------//
                    // console.log("groupItems",groupItems)//works
                    groupItems=groupItems.toSorted((a,b)=>{if(a.placement < b.placement){return -1}else return 1}).map((item:any)=>{
                        if(item.placement===selected){
                            item.placement+=1;//SHIFTING UP ONE
                            toBeSlotterObject.placement=selected;//SLOTTED
                            console.log("SLOTTED",selected);//works
                        }else if(item.placement > selected  && item.placement <= toBeSlotted){
                            //SHIFT DOWN
                            // console.log("SHIFTDOWN ele.place",item.name,item.placement)
                            item.placement +=1;
                            console.log("SHIFT DOWN",selected);
                        }else if( item.placement >0 && item.placement < selected && selected > toBeSlotted){
                            item.placement -=1;
                            console.log("SHIFT UP",item.placement);
                        }   
                        return item;
                    });
                    if(group.name==="elements" && typeof group.group as "object"){
                        console.log("inside")
                            this.blog={...blog,elements:groupItems as elementType[]};
                            
                    }else if(group.name==="selectors" && typeof group.group as "object"){
                        this.blog={...this._blog,selectors:groupItems as selectorType[]}
                    }else if(group.name==="codes" && typeof group.group as "object"){
                        this.blog={...this._blog,codes:groupItems as codeType[]}
                    }else if(group.name==="charts" && typeof group.group as "object"){
                        this.blog={...this._blog,charts:groupItems as chartType[]}
                    }
                    this.blog=this.removeZeroPlacment({blog:this._blog});
                    this.localStore({blog:this.blog}); 
                }

            });
           
            
        }
        return this.blog;
       
    }
    //THIS IS USED
    removeZeroPlacment(item:{blog:blogType}):blogType{
        const {blog}=item;
        const eles=(blog?.elements) ? blog.elements : [] as elementType[];
        eles.toSorted((a,b)=>{if(a.placement < b.placement)return -1;return 1});
        const selectors=(blog?.selectors) ? blog.selectors : [] as selectorType[];
        selectors.toSorted((a,b)=>{if(a.placement < b.placement)return -1;return 1});
        const codes=(blog?.codes) ? blog.codes : [] as codeType[];
        codes.toSorted((a,b)=>{if(a.placement < b.placement)return -1;return 1});
        const charts=(blog?.charts) ? blog.charts : [] as chartType[];
        charts.toSorted((a,b)=>{if(a.placement < b.placement)return -1;return 1});
        const isElesZero=eles.find(ele=>(ele.placement===0));
        const isSelectsZero=selectors.find(sel=>(sel.placement===0));
        const isCodesZero=codes.find(code=>(code.placement===0));
        const isChartsZero=codes.find(chart=>(chart.placement===0));
        const checkGrps=[
            {id:0,name:"elements",len:eles.length,items:eles,isZeroItem:isElesZero},
            {id:1,name:"selectors",len:selectors.length,items:selectors,isZeroItem:isSelectsZero},
            {id:2,name:"codes",len:codes.length,items:codes,isZeroItem:isCodesZero},
            {id:3,name:"charts",len:charts.length,items:charts,isZeroItem:isChartsZero},
        ].filter(item=>(item.len > 0));
        const hasZero=checkGrps.find(item=>(item.isZeroItem)) ? checkGrps.find(item=>(item.isZeroItem)):false;
        if(hasZero){
            checkGrps.map(item=>{if(item.id===hasZero.id)return {...item,id:0};return item});
            checkGrps.map((itemGrp)=>{
                if(itemGrp.isZeroItem !==undefined){
                    itemGrp.items = itemGrp.items.toSorted((a,b)=>{if(a.placement < b.placement)return -1;return 1});
                    itemGrp.items = itemGrp.items.map((item,index)=>{
                        item.placement=index+1;
                        return item;
                    });
                }
            });

        }
        return {...blog,elements:eles,selectors,codes,charts};
    };

    shiftPlace(ref:number){
        //THIS SHIFTS ALL SELECTORS AND ELEMENTS -1 AFTER ELEMENT DELETION THEN ASSIGNS PLACEMENT=MAXCOUNT: SEE BELOW
        const blog=this._blog;
        let arrTotal:reorderType[]=[];
        blog.elements=blog?.elements.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as elementType[] || [] as elementType[];
        blog.selectors=blog?.selectors.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as selectorType[] || [] as selectorType[];
        blog.charts=blog?.charts.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as chartType[] || [] as chartType[];
        const maxCount=ModSelector.maxCount(blog)
        if(maxCount>0 && !isNaN(maxCount)){
            arrTotal=arrTotal.concat(blog.elements.map(kv=>({id:kv.id,placement:kv.placement,type:"element",eleId:kv.eleId,html:kv.inner_html.slice(0,10),name:kv.name})));
            arrTotal=arrTotal.concat(blog.selectors.map(kv=>({id:kv.id,placement:kv.placement,type:"element",eleId:kv.eleId,html:"BOX",name:kv.name})));
            arrTotal=arrTotal.concat(blog.charts.map(kv=>({id:kv.id,placement:kv.placement,type:"element",eleId:kv.eleId,html:"Graph",name:"canvas"})));
           
            arrTotal.toSorted((a,b)=>{if(a.placement < b.placement) return -1;return 1}).map((comb,index)=>{
                if(comb){
                    const {type,eleId}=comb;
                    if(type==="element"){
                        blog.elements.map(ele=>{
                           
                            const check= ele.eleId===eleId
                            if(check){
                                ele.placement=index + 1;
                            }
                          
                        });
                    }else if(type==="selector"){
                        blog.selectors.map(sel=>{
                         
                            const check= sel.eleId===eleId
                            if(check){
                                sel.placement=index + 1;
                            }
                        });
                    }else if(type==="chart"){
                        blog.charts.map(sel=>{
                      
                            const check= sel.eleId===eleId
                            if(check){
                                sel.placement=index + 1;
                            }
                            
                        });
                    }
                }
            });
           

        }
        this._blog=blog;
        this.blog=this._blog;//sending it to localStorage
        this.placement=maxCount + 1;
        // console.log("shiftPlace")

    };


    checkGetRows(item:{select:selectorType}):{isRows:boolean,rows:rowType[]}{
        const {select}=item;
        let rows=[] as rowType[];
        if(!select) return {isRows:false,rows:[] as rowType[]}
        const check=(select.rows!=="" && typeof(JSON.parse(select.rows)))==="object";
        if(check){
            rows=JSON.parse(select.rows as string) as rowType[];
            return {isRows:true,rows};
        }else{
            return {isRows:false,rows:[] as rowType[]}
        };
     
    };

    removeDuplicates({blog}:{blog:blogType}){
        // REMOVES DUPLICATES FROM BLOG AND SAVES IT TO LOCALSTORAGE
        blog.elements=blog?.elements.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as elementType[] || [] as elementType[];
        blog.selectors=blog?.selectors.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as selectorType[] || [] as selectorType[];
        blog.charts=blog?.charts.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as chartType[] || [] as chartType[];
        
        const eles=blog.elements.map(kv=>(kv.eleId));
        if(eles?.length){
                const elements:elementType[]=[];
                const newSet=new Set();

                eles.map(kat=>{
                    newSet.add(kat)
                });
                Array.from(newSet).map(id=>{
                    const getEle=blog.elements.find(kv=>(kv.eleId===id));
                    if(getEle){
                        elements.push(getEle);
                    }
                });
                blog.elements=elements;
            }

        const sels=blog.selectors.map(kv=>(kv.eleId));
        if(sels?.length){
            const selectors:selectorType[]=[];
            const newSet1=new Set();

            sels.map(kat=>{
                newSet1.add(kat)
            });
            Array.from(newSet1).map(id=>{
                const getSel=blog.selectors.find(kv=>(kv.eleId===id));
                if(getSel){
                    selectors.push(getSel);
                }
            });
            blog.selectors=selectors;
        }

        const chts=blog.charts.map(kv=>(kv.eleId));
        if(chts?.length){
            const charts:chartType[]=[];
            const newSet2=new Set();

            chts.map(kat=>{
                newSet2.add(kat)
            });
            Array.from(newSet2).map(id=>{
                const getChart=blog.charts.find(kv=>(kv.eleId===id));
                if(getChart){
                    charts.push(getChart);
                }
            });
            blog.charts=charts;
        }
          localStorage.setItem("blog",JSON.stringify(blog));
          this.blog=blog;
        return blog;
    };


    removeClasses({target,classes}:{target:HTMLElement,classes:string[]}):{cleaned:string[],target:HTMLElement}{
        const targetClasses=([...target.classList as any] as string[]);
        targetClasses.map((cl,index)=>{
            const check=classes.find(cls=>cls===cl);
            if(check){
                targetClasses.splice(index,1);
            };
           
        });
        return {cleaned:targetClasses,target};
    };


    static maxCount(blog:blogType):number{
        if(!blog) return 0;
        const eleCount=blog.elements ? blog.elements.length:0;
        const selCount=blog.selectors ? blog.selectors.length :0;
        const codeCount=blog.codes ? blog.codes.length :0;
        const chartCount=blog.charts ? blog.charts.length :0;
        const len=[eleCount,selCount,codeCount,chartCount].reduce((a,b)=>(a+b),0);
      
        return len
    };


    static modAddEffect(target:HTMLElement){
        target.animate([
            {transform:"translate(-50%,-50%) scale(0.2)"},
            {transform:"translate(0%,0%) scale(1)"},
        ],{duration:750,iterations:1});
    };
    static isActive(target:HTMLElement){
        const arr=["isActive","coliIsActive"]
        if(target as HTMLElement){
           arr.map(cl=>{
            const check= ([...target.classList as any] as string[]).includes(cl);
            return check
           });

        }
        return false;
    };

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
    };
  
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
                const rows=JSON.parse(select.rows) as rowType[];
                rows.map(row=>{
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
    };


    async removeBlob({target,rowColEle,loc,level,idValues,selRowCol,selRow}:{
        target:HTMLElement,
        rowColEle:rowType|colType|elementType|element_selType,
        loc:locationEnumType,
        level:"row"|"col"|"element",
        idValues:idValueType[],
        selRowCol:selRowColType|null,
        selRow:selRowType|null,
     }):Promise<rowType|colType|elementType|element_selType>{
        const node=target.nodeName.toLowerCase();
        const eleId=target.id;
        let ele=rowColEle as rowType|colType|elementType|element_selType;
        if(loc==="flexbox" || loc==="header" || loc==="footer" || loc==="customHeader"){
            if(level==='row'){
                ele=ele as rowType;
            }else if(level==="col"){
                ele=ele as colType;
            }else if(level==="element"){
                ele=ele as element_selType
            }
        }else{
            ele=ele as elementType
        }
        const reg:RegExp=/(blob:http)/
        const checkBg=reg.test(target.style.backgroundImage)
        const check1=node==="img" && reg.test((target as HTMLImageElement).src) ;
        if(checkBg || check1){
            ele.imgKey=undefined;
            target.removeAttribute("data-img-key");
            this.dataset.removeSubValue({target,idValues,id:"imgKey",eleId});
            if(check1 && level==="element"){
                (target as HTMLImageElement).src=Header.logo;
             const retEle=await this.updateElement({target,idValues,selRowCol});
             const {ele:newEle}=retEle as {target:HTMLElement,ele:elementType|element_selType}
             ele=newEle;
            }else if(level==="col" || level==="row"){
                target.style.backgroundImage=`url(${Header.logo})`;
                target.style.backgroundPosition="50% 50%";
                target.style.backgroundSize="100% 100%";

                if(level==="col" && selRowCol){
                  const retCol=await this.updateColumn({target,idValues,selRowCol});
                  const {col:newEle}=retCol as {target:HTMLElement,col:colType}
                  if(newEle){
                      ele=newEle;
                  };
                }else if(level==="row" && selRow){
                    const retRow =await this.updateRow({target,idValues,selRow});
                    const {row:newEle}=retRow as {target:HTMLElement,row:rowType}
                    ele=newEle
                }
            };
          
        };
        return ele
     };



//NOT USED BELOW
  


//END
};

export default ModSelector 
export const modAddEffect=ModSelector.modAddEffect;
export const maxCount=ModSelector.maxCount;

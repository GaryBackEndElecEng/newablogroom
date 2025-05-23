import { colAttType, insertClassMsgType, eleAttType, flexToAttInterfaceType, getKeyvaluePairsType, keyValueType, rowAttType, standardAttType,cssClassType,  appendAttType,  IDKeyValueType, selectIdType, rowIdType, colIdType, eleIdType, idValueType, idEnumType, headerEnumType, levelEnumType, eleEnumType,  locationEnumType, typeEnumType, selRowType, selRowColType } from "@/lib/attributeTypes";
import { blogType,  chartType,  colType, element_selType, elementType, rowType, selectorType } from '../editor/Types';
import {cssClassArr,flexCoretoAtt,allAttributes,allFlexAttributes,   IDKeyValuepairs, IDKeys, locationEnumArr, attrEnumArr, typeEnumArr, attrEnumArrTest, typeEnumArrTest} from "@/components/common/lists";


class Dataset{
    cssClassArr:cssClassType[]=[];
    flexCoretoAtt:flexToAttInterfaceType[];
    allAttributes:standardAttType[];
    allFlexAttributes:standardAttType[];
    customAttributes:keyValueType[];
    insertClassAttMsgs:insertClassMsgType[];
    rowAttributeInit:rowAttType;
    colAttributeInit:colAttType;
    eleAttributeInit:eleAttType;
    _rowAttribute:rowAttType;
    _colAttribute:colAttType;
    _eleAttribute:eleAttType;
    _rowAttributes:rowAttType[];
    _colAttributes:colAttType[];
    _eleAttributes:eleAttType[];
    _placement:number;
    _initEle:elementType;
    _initEle_sel:element_selType;
    _initCol:colType;
    _initRow:rowType;
    _element:elementType;
    _element_sel:element_selType;
    _col:colType;
    _row:rowType;
    _idValues:idValueType[];

    constructor(){
        // ArrayMsgs FROM GLOBALS
        this._idValues=[];
        this._placement=0;
        this.cssClassArr=cssClassArr;
        // this.insertClassAttMsgs=insertClassAttMsgs;
        //FLEXTYPE TO ATTTYPE INTERFACE
        this.flexCoretoAtt=flexCoretoAtt;
        this.allAttributes=allAttributes
        this.allFlexAttributes=allFlexAttributes
        this.eleAttributeInit={
            id:0,
            cat:undefined,
            eleId:"",
            colEleId:"",
            type:"",
            classList:[],
            order:undefined,
            placement:undefined,
            flex:undefined,
            cssMsg:{"":""},
            name:"",
            attr:""
            
        }
        this.colAttributeInit={
            id:0,
            eleId:"",
            name:"",
            rowEleId:"",
            type:"",
            classList:[],
            order:0,
            flex:{key:"",value:undefined},
            cssMsg:{"":""},
            attr:""
        }
        this.rowAttributeInit={
            id:0,
            name:"",
            eleId:"",
            selectorEleId:"",
            type:"",
            classList:[],
            order:0,
            flex:{key:"",value:undefined},
            cssMsg:{"":""},
            attr:""

        }
        this._rowAttribute=this.rowAttributeInit;
        this._colAttribute=this.colAttributeInit;
        this._eleAttribute=this.eleAttributeInit;
        this._initEle={
            id: 0,
            placement: 0,
            selectorId: undefined,
            eleId: "",
            name: "",
            class: "",
            inner_html: "",
            cssText: "",
            attr:undefined,
            img: "",
            imgKey: "",
            blog_id: 0,
            type: undefined,
        }
        this._initEle_sel={
            id: 0,
            order: 0,
            selectorId: undefined,
            eleId: "",
            name: "",
            class: "",
            inner_html: "",
            cssText: "",
            attr:undefined,
            img: "",
            imgKey: "",
            col_id: 0,
            type: undefined,
        }
        this._initRow={
            id: 0,
            order: 0,
            selector_id:0,
            eleId: "",
            name: "",
            class: "",
            inner_html: "",
            cssText: "",
            attr:undefined,
            imgKey: "",
            cols:[] as colType[]
        }
        this._initCol={
            id: 0,
            order: 0,
            row_id:0,
            eleId: "",
            name: "",
            class: "",
            inner_html: "",
            cssText: "",
            attr:undefined,
            imgKey: "",
            elements:[] as element_selType[]
        }
        this._element=this._initEle;
        this._col=this._initCol;
        this._row=this._initRow;
        this._element_sel=this._initEle_sel;
        this._rowAttributes=[] as rowAttType[];
        this._colAttributes=[] as colAttType[];
        this._eleAttributes=[] as eleAttType[];
    }
    //--------------------------GETTER/SETTERS------------------------//
    get idValues(){
        return this._idValues;
    }
    set idValues(idValues:idValueType[]){
        this._idValues=idValues;
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
    };
    get rowAttribute(){
        return this._rowAttribute;
    };
    set rowAttribute(rowAttribute:rowAttType){
        this._rowAttribute=rowAttribute;
    };
    get rowAttributes(){
        return this._rowAttributes;
    };
    set rowAttributes(rowAttributes:rowAttType[]){
        this._rowAttributes=rowAttributes;
    }
    get colAttribute(){
        return this._colAttribute;
    };
    set colAttribute(colAttribute:colAttType){
        this._colAttribute=colAttribute;
    }
    get colAttributes(){
        return this._colAttributes;
    };
    set colAttributes(colAttributes:colAttType[]){
        this._colAttributes=colAttributes;
    };
    get eleAttribute(){
        return this._eleAttribute;
    };
    set eleAttribute(eleAttribute:eleAttType){
        this._eleAttribute=eleAttribute;
    };
    get eleAttributes(){
        return this._eleAttributes;
    };
    set eleAttributes(eleAttributes:eleAttType[]){
        this._eleAttributes=eleAttributes;
    };
    get element(){
        return this._element;
    };
    set element(element:elementType){
        this._element=element;
    };
    get element_sel(){
        return this._element_sel;
    };
    set element_sel(element_sel:element_selType){
        this._element_sel=element_sel;
    };
    get col(){
        return this._col;
    };
    set col(col:colType){
        this._col=col;
    }
    get row(){
        return this._row;
    };
    set row(row:rowType){
        this._row=row;
    }
    //--------------------------GETTER/SETTERS------------------------//

    //FUNCTION
    insertcssClassIntoComponents({target,level,headerType,id,loc,type}:
       {
           target:HTMLElement,
           id:idEnumType,
           level:levelEnumType,
           headerType:headerEnumType,
           type:locationEnumType,
           loc:"flexbox"|"htmlElement",
        }
   ): {target:HTMLElement,level:levelEnumType,css_:string|undefined,class_:string|undefined}{
       //THIS INSERTS CSSS AND CLASSES FOR NEW INJECTED ELEMENTS
       const node=target.nodeName.toLowerCase();
      
       let css_:string|undefined=undefined;
       let class_:string|undefined=undefined;
       const check=locationEnumArr.find(tpe=>(tpe===type));
       if(check){
           this.cssClassArr.map(item=>{
            if(item.loc===loc && item.eleType===node && target){
               
                if(item.id===id && item.level===level && item.type===type){
                   
                            if(!headerType && !item.headerType){
                                //NO HEADER
                              
                                    for(const [key,value] of Object.entries(item)){
                                        if(key==="css" && value){
                                            css_=value as string
                                            target.style.cssText=value
                                        }else if(key==="className" && value){
                                            class_=value as string;
                                            [...value.split(" ") as string[]].map(cl=>{
                                                if(cl){
                                                    target.classList.add(cl)
                                                }
                                            });
                                           
                                        }
                                    }
                                   
                              
                            }else if(headerType===item.headerType ){
                               
                                for(const [key,value] of Object.entries(item)){
                                    if(key==="css" && value){
                                        css_=value as string;
                                        target.style.cssText=value
                                       
                                    }else if(key==="className" && value){
                                        class_=value as string;
                                        [...value.split(" ") as string[]].map(cl=>{
                                         if(cl){
                                             target.classList.add(cl)
                                         }
                                        });
                                        
                                    }
                                }
                            };
                    };
            }
            });
       }
       return {target,level,css_,class_}
   };

     async appendAttributes({target,loc,isNew,idValues,action,level}:
        {
        target:HTMLElement,
        loc:"flexbox"|"htmlElement"|"both",
        isNew:boolean,
        idValues:idValueType[] | undefined,
        action:"append"|"upload",
        level:"element"|"col"|"row"|"selector"

    }

    ):Promise<{target:HTMLElement,appendKVArr:appendAttType[],idValues:idValueType[]}>{
        //ID AND ATTVALUE ARE BINDED ID(IDENTIFIER && ATTVALUE:=>INSERTED INTO VALUE OF KEY-VALUE PAIRS)
        //UNIQUE VALUES:=>ALL IDVALUES ARE HAVE eleId:target.id to each respective record
        // IF ACTION ==="UPLOAD" THEN id && attvalue is NOT USED
        //VARIABLES:KEYVALUES: DEPENDANTS: LEVEL,ID,NODE keyvalues(level,id,node), item(level,node,loc,)
        const node=target.nodeName.toLowerCase();
        const name=target.nodeName.toLowerCase();
        const arrKeyvalue:appendAttType[]=[];
        let idValuesAcc:idValueType[]=[];
        // console.log("outside action",action,"_loc",_loc,)
        const eleId=target.id;
        if(action==="append"){
            this.allAttributes.map(item=>{
                if(item.loc===loc && item.node===node && item.level===level){
                    if(isNew){
                        item.keyvalues.map(kv=>{
                            //secondLevel{type,nodes,id,key,value,level}
                            const checkNode=kv.nodes.find(nd=>(nd===item.node));//has proper node for proper insertion
                            if(checkNode && item.level===kv.level ){
                                if(item.eleProperty===kv.eleProperty && kv.eleProperty==="generic"){
                                    //GENERIC
                                    if(kv.type===item.type){
                                    
                                      
                                        if(!(kv.value)){
                                            //--------KV.VALUE=> UNDEFINED--------//
                                            if(!(idValues)){
                                                 ////--MANUFACTURE INPUT----NO ATTVALUE && ID--&&& KV.VALUE UNDEFINED-----///
                                                //kv.value===undefined && no id or attValue
                                            const {idValues:retIdValues}=this.appendGenericNo_idAttValue({target,item,kv,loc,arrKeyvalue});
                                            idValuesAcc=retIdValues;
                                            }else{
                                                // INPUT FROM ATTVALUE FOR=> ID
                                                //attValue && id && kv.value===undefined
                                                const idValue=idValues.filter(idVal=>(idVal.eleId===eleId)).find(idVal=>(idVal.id===kv.id));

                                                if(idValue){
                                                    const id=idValue.id;
                                                    const attValue=idValue.attValue;
                                                    this.appendGenericIDAttValue({target,item,id,attValue,kv,arrKeyvalue});
                                                }
                                            }
                                            
                                        }else{
                                            //--------KV.VALUE IS DEFINED---------///
                                            //installing generic defaults
                                            target.setAttribute(kv.key,kv.value);
                                            arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:kv.value});
                                        }
                                    }
                                }else if(item.eleProperty===kv.eleProperty && kv.eleProperty==="attr"){
                                    //FOR ATTR ELEMENT SLOT
                                    if(item.level===kv.level && kv.level===level){
                                        
                                        if(!(idValues)){
                                            if(kv.value){
                                                target.setAttribute(kv.key,kv.value);
                                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:kv.value});
                                                idValuesAcc.push({eleId:target.id,id:kv.id,attValue:kv.value});
                                                if(kv.class_){
                                                    target.classList.add(kv.class_)
                                                }
                                            }else{
                                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:undefined});
                                            }
    
                                        }else{
                                            //idvalues
                                            idValues.filter(idVal=>(idVal.eleId===eleId)).map(idVal=>{
                                                if(idVal){
                                                    const {id,attValue}=idVal;
                                                    if(id===kv.id){
                                                        target.setAttribute(kv.key,String(attValue));
                                                        arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:id,key:kv.key,value:attValue});
                                                        if(kv.class_){
                                                            target.classList.add(kv.class_)
                                                        }
                                                    }else{
                                                        arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:undefined});
                                                    }

                                                }
                                            });
                                        }
                                    }

                                }else if(item.eleProperty===kv.eleProperty && kv.eleProperty==="type"){
                                    if(item.level===kv.level && kv.level===level){
                                        if(!(idValues)){
                                            if(kv.value){
                                                target.setAttribute(kv.key,kv.value);
                                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:kv.value});
                                                idValuesAcc.push({eleId:target.id,id:kv.id,attValue:kv.value});
                                                if(kv.class_){
                                                    target.classList.add(kv.class_)
                                                }
                                            }else{
                                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:undefined});
                                            }
    
                                        }else{
                                            //idvalues
                                            idValues.filter(idVal=>(idVal.eleId===eleId)).map(idVal=>{
                                                if(idVal){
                                                    const {id,attValue}=idVal;
                                                    if(id===kv.id){
                                                        target.setAttribute(kv.key,String(attValue));
                                                        arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:id,key:kv.key,value:attValue});
                                                        if(kv.class_){
                                                            target.classList.add(kv.class_)
                                                        }
                                                    }else{
                                                        arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:id,key:kv.key,value:undefined});
                                                    }

                                                }
                                            });
                                        }
                                    }
                                }else if(kv.eleProperty !=="generic"){
                                    //NONE GENERIC
                                   
                                    if(kv.type){
                                        
                                        if(!(kv.value)){
                                            /////-------KV.VALUE===UNDEFINED--------////
                                            if(idValues){
                                                ////////-NEED INPUT--ATT VALUE && ID DEFINED IN KV.VALUE UNDEFINED  --------///
                                                const idValue=idValues.find(idVal=>(idVal.id===kv.id));
                                                if(idValue){
                                                    const id=idValue.id;
                                                    const attValue=idValue.attValue;
                                                    target.setAttribute(kv.key,attValue);
                                                    target.setAttribute(id,kv.type);
                                                    arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:id,key:kv.key,value:kv.type});
                                                    arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:id,key:kv.key,value:attValue});
                                                }
                                            }else{
                                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:undefined});
                                            }
                                        }else{
                                            /////--------KV.VALUE IS VALID-------////
                                            target.setAttribute(kv.key,kv.value);
                                            arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:kv.value});
                                        }
                                       
                                    }
                                }
                              
                            }
                        });
                    }else{
                        // TARGET ID ( append: it needs id && attvalue) FOR A SPECIFIC ACTION  SUCH AS: order/placememnt/backgroundImg,imgKey,etc
                        item.keyvalues.map(kv=>{
                            const checkNode=kv.nodes.find(nd=>(nd===item.node));//has proper node for proper insertion
                            if(checkNode && item.level===kv.level ){
                                if(item.eleProperty===kv.eleProperty && kv.eleProperty==="generic"){
                                    //GENERIC
                                    if(kv.type===item.type){
                                      
                                        if(!(kv.value)){
                                            //--------KV.VALUE=> UNDEFINED--------//
                                            if(!(idValues)){
                                                 ////--MANUFACTURE INPUT----NO ATTVALUE && ID--&&& KV.VALUE UNDEFINED-----///
                                                //kv.value===undefined && no id or attValue
                                                this.appendGenericNo_idAttValue({target,item,kv,loc,arrKeyvalue})
                                            }else{
                                                // INPUT FROM ATTVALUE FOR=> ID
                                                //attValue && id && kv.value===undefined
                                                const idValue=idValues.filter(idVal=>(idVal.eleId===eleId)).find(idVal=>(idVal.id===kv.id));

                                                if(idValue){
                                                    const id=idValue.id;
                                                    const attValue=idValue.attValue;
                                                    this.appendGenericIDAttValue({target,item,id,attValue,kv,arrKeyvalue});
                                                }
                                            }
                                            
                                        }else{
                                            //--------KV.VALUE IS DEFINED---------///
                                            //installing generic defaults
                                            target.setAttribute(kv.key,kv.value);
                                            arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:kv.value});
                                            idValuesAcc.push({eleId:target.id,id:kv.id,attValue:kv.value});
                                        }
                                    }
                                }else if(item.eleProperty===kv.eleProperty && kv.eleProperty==="attr"){
                                    //FOR ATTR ELEMENT SLOT
                                    if(item.level===kv.level && kv.level===level){
                                       
                                        if(!(idValues)){
                                            if(kv.value){
                                                target.setAttribute(kv.key,kv.value);
                                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:kv.value});
                                                idValuesAcc.push({eleId:target.id,id:kv.id,attValue:kv.value});
                                            }else{
                                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:undefined});
                                            }
    
                                        }else{
                                            //idvalues
                                            idValues.filter(idVal=>(idVal.eleId===eleId)).map(idVal=>{
                                                if(idVal){
                                                    const {id,attValue}=idVal;
                                                    if(id===kv.id){
                                                        target.setAttribute(kv.key,String(attValue));
                                                        arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:id,key:kv.key,value:attValue});
                                                        if(kv.class_){
                                                            target.classList.add(kv.class_)
                                                        }
                                                    }else{
                                                        arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:undefined});
                                                    }

                                                }
                                            });
                                        }
                                    }

                                }else if(item.eleProperty===kv.eleProperty && kv.eleProperty==="type"){
                                    if(item.level===kv.level && kv.level===level){
                                        if(kv.class_){
                                            target.classList.add(kv.class_)
                                        }
                                        if(!(idValues)){
                                            if(kv.value){
                                                target.setAttribute(kv.key,kv.value);
                                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:kv.value});
                                                idValuesAcc.push({eleId:target.id,id:kv.id,attValue:kv.value});
                                            }else{
                                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:undefined});
                                            }
    
                                        }else{
                                            //idvalues
                                            idValues.filter(idVal=>(idVal.eleId===eleId)).map(idVal=>{
                                                if(idVal){
                                                    const {id,attValue}=idVal;
                                                    if(id===kv.id){
                                                        target.setAttribute(kv.key,String(attValue));
                                                        arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:id,key:kv.key,value:attValue});
                                                    }

                                                }
                                            });
                                        }
                                    }
                                }else if(kv.eleProperty !=="generic"){
                                    //NONE GENERIC
                                   
                                    if(kv.type){
                                        
                                        if(!(kv.value)){
                                            /////-------KV.VALUE===UNDEFINED--------////
                                            if(idValues){
                                                ////////-NEED INPUT--ATT VALUE && ID DEFINED IN KV.VALUE UNDEFINED  --------///
                                                const idValue=idValues.filter(idVal=>(idVal.eleId===eleId)).find(idVal=>(idVal.id===kv.id));
                                                if(idValue){
                                                    const id=idValue.id;
                                                    const attValue=idValue.attValue;
                                                    target.setAttribute(kv.key,attValue);
                                                    target.setAttribute(id,kv.type);
                                                    arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:id,key:kv.key,value:kv.type});
                                                    arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:id,key:kv.key,value:attValue});
                                                }
                                            }else{
                                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:undefined});
                                            }
                                        }else{
                                            /////--------KV.VALUE IS VALID-------////
                                            target.setAttribute(kv.key,kv.value);
                                            arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:kv.value});
                                            idValuesAcc.push({eleId:target.id,id:kv.id,attValue:kv.value});
                                        }
                                       
                                    }
                                }
                              
                            }
                        });
                        
                    };
                }
            });
        }else{
            //UPLOAD GET ALL ATTRIBUTES FROM TARGET AND IDVALUES
            const checkIdValues=(idValues && idValues.length>0);
            this.allAttributes.map(item=>{
                if(item.node===name && item.level===level){
                    item.keyvalues.map(kv=>{
                        const isNode=kv.nodes.find(nd=>(nd===item.node))
                        if(isNode){
                            const getAtt=target.getAttribute(kv.key);
                            if(getAtt){
                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:name,id:kv.id,key:kv.key,value:getAtt})
                            }else if(checkIdValues && idValues){
                                //NO ATTRIBUTES FOUND
                                idValues.filter(idVal=>(idVal.eleId===eleId)).map(idVal=>{
                                    if(idVal){
                                        const {id,attValue}=idVal;
                                        if(attValue && id){
                                            if(kv.id===id){
                                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:name,id:kv.id,key:kv.key,value:attValue});
                                            }
                                        }else if(id && !attValue && kv.id===id){
                                            arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:name,id:kv.id,key:kv.key,value:undefined});
                                        }
                                    }
                                });
                                
                            }else{
                                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:name,id:kv.id,key:kv.key,value:undefined});
                            }
                        }
                    });
                }
            });
        }
        return Promise.resolve({target,appendKVArr:arrKeyvalue,idValues:idValuesAcc}) as Promise<{target:HTMLElement,appendKVArr:appendAttType[],idValues:idValueType[]}>;
    }



    appendGenericNo_idAttValue({target,item,kv,arrKeyvalue,loc}:{
        target:HTMLElement,
        item:standardAttType,
        kv:IDKeyValueType,
        arrKeyvalue:appendAttType[],
        loc:"htmlElement"|"flexbox"|"both"

    }):{idValues:idValueType[]}{
        //THIS SETS TARGET ELEMENT ATTRIBUTES TO CORRESPONDING NO id && ATTVALUE INPUT, THEN APPENDS RESULTS TO AN ARRAY THAT OUPUTS FOR VALIDATION
        const idValues:idValueType[]=[];
         const node=target.nodeName.toLowerCase();

        const checklinks=["link","tel","email"].includes(kv.id)
        if(kv.class_ && kv.eleProperty==="attr" && checklinks && kv.value){
            const checkClass=([target.classList as any] as string[]).includes(kv.class_);
            if(!checkClass){
                target.classList.add(kv.class_);
            }
        };
        const ID=target.id;
        const parent=target.parentElement;
        if(kv.id==="name"){
            target.setAttribute(kv.key,node);
            arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:node});
            idValues.push({eleId:ID,id:kv.id,attValue:String(node)});
        }else if(kv.id==="ID"){
            target.setAttribute(kv.key,ID);
            arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:ID});
            idValues.push({eleId:ID,id:kv.id,attValue:String(ID)});
        }else if(kv.id==="placement" && loc==="htmlElement"){
            target.setAttribute(kv.key,String(this.placement));
            arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:String(this.placement)});
            idValues.push({eleId:ID,id:kv.id,attValue:String(this.placement)});
        }else if((kv.id==="colOrder" || kv.id==="rowOrder" ) && loc==="flexbox" && parent && item.level==="col"){
            let order=0;
            ([...parent.children as any] as HTMLElement[]).map((child,index)=>{
                if(child && child.id===ID){
                    order=index;
                }
            });
            target.setAttribute(kv.key,String(order));
            arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:String(order)});
            idValues.push({eleId:ID,id:kv.id,attValue:String(order)});
        }else if(kv.id !=="type"){
            arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:undefined});
        };

        return {idValues}
    };


    appendGenericIDAttValue({target,item,id,attValue,kv,arrKeyvalue}:{
        target:HTMLElement,
        item:standardAttType,
        id:string,
        attValue:string|number,
        kv:IDKeyValueType,
        arrKeyvalue:appendAttType[]

    }){
        //THIS SETS TARGET ELEMENT ATTRIBUTES TO CORRESPONDING id INPUT TARGETING FOR VALUE INSERTION, THEN APPENDS RESULTS TO AN ARRAY THAT OUPUTS FOR VALIDATION
        const check=["shapeOutsideCircle","shapeOutsideSquare","shapeOutsidePolygon"].find(sh=>(sh===id));
        const isLink=["link","mailto","tel"].find(sh=>(id.includes(sh)));
        const node=target.nodeName.toLowerCase() as eleEnumType;
        const checkNode=kv.nodes.includes(node);
        if(checkNode){

            if( id==="attr"&& kv.id==="attr"){
                if(item.class_){
                    const checkClass=([target.classList as any] as string[]).includes(item.class_);
                    if(!checkClass){
                        target.classList.add(item.class_);
                    }
                };
                target.setAttribute(kv.key,String(attValue))
                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:String(attValue)});
            }else if(id==="imgDesc" && kv.id===id){
                //image description for htmlElement
                target.setAttribute(kv.key,String(attValue))
    
            }else if(item.cat==="shapeOutside"){
                if(check){
                    
                    if(item.class_){
                        const checkClass=([target.classList as any] as string[]).includes(item.class_);
                        if(!checkClass){
                            target.classList.add(item.class_);
                        }
                    };
                    if(kv.id==="shapeOutside" && kv.type){
                        target.setAttribute(kv.id,kv.type);
                        target.setAttribute(kv.key,kv.id);
                        arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:kv.id});
                        arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.id,value:kv.type});
                    }else{
                        //type
                        target.setAttribute(kv.key,check);
                        arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:check});
        
                    }
                }
            }else if(attValue && isLink){
                target.setAttribute(kv.key,String(attValue));
                const check=kv.id==="email" ||kv.id==="link" || kv.id==="tel";
                if(check && kv.class_){
                    target.classList.add(kv.class_);
                }

            }

            }else if(item.cat==="headerflag" && id==="headerflag"){
                if(kv.id===id){
                    if(item.class_){
                        const checkClass=([target.classList as any] as string[]).includes(item.class_);
                        if(!checkClass){
                            target.classList.add(item.class_);
                        }
                    };
                    target.setAttribute(kv.key,kv.id);
                    target.setAttribute(kv.key,String(attValue));
                    arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:kv.id});
                    arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:String(attValue)});
                }
            }else{
    
                target.setAttribute(kv.key,String(attValue));
                arrKeyvalue.push({eleProperty:kv.eleProperty,level:kv.level,type:kv.type,node:node,id:kv.id,key:kv.key,value:String(attValue)});
            }
    };


    //used
    generateIdValues({target,idValues,rowColEle,level,loc,index}:{
        //THIS TAKES IN IDVALUES AND ADDS TO THEM WHILE POPULATING THE ELEMENT WITH ATTRIBUTES
        //RETURNS ==> {id,attValue}[] ACCUMULATED VALUES WHICH REFLECTS THE ELEMENT'S ATTRIBUTE, OUTSIDE OF KNOWN IDKeyValuepairs' values;
    
        target:HTMLElement,
        rowColEle:rowType | colType | element_selType | elementType|selectorType,
        idValues:idValueType[],
        level:"element"|"col"|"row"|"selector",
        loc:"flexbox"|"htmlElement"|"both",
        index:number
    }):{idValues:idValueType[]}{
        const node=target.nodeName.toLowerCase();
        const parent=target.parentElement;
        const typeArr=[
            {name:"header",nodes:["h1","h2","h3","h4","h5","h6"]},
            {name:"text",nodes:["p","small","span","pre","blockquote"]},
            {name:"divider",nodes:["div","section","article","header",]},
         ]
         const nodeType=typeArr.find(cl=>(cl.nodes.includes(node)));
        const isFlex=loc==="flexbox" ;
        const parent_id=parent? parent.id : null;
        rowColEle=((level==="row" && loc==="flexbox") ? rowColEle as rowType :((level==="col" && loc==="flexbox") ? rowColEle as colType :((level==="element" && loc==="flexbox") ? rowColEle as element_selType : rowColEle as elementType)))
        const type=(rowColEle as elementType|element_selType).type
         const eleId=target.id;
        IDKeyValuepairs.map(kv=>{
            if(kv.level===level){
                if(!kv.value){
                   kv.id=kv.id as idEnumType
                    if(kv.eleProperty==="attr" && rowColEle.attr){
                        const idValue=idValues.filter(idVal=>(idVal.eleId===eleId)).find(idValue=>(idValue.id===kv.id));
                        if(!idValue){
                            const check=[
                                {name:"link",isTrue:rowColEle.attr.includes("http")},
                                {name:"email",isTrue:rowColEle.attr.includes("mail")},
                                {name:"tel",isTrue:rowColEle.attr.includes("tel")},
                                {name:"time",isTrue:rowColEle.attr.includes("time")},
                            ].find(cl=>(cl.isTrue ===true));
                          
                            if( check?.isTrue){
                                if( kv.id===check.name as idEnumType){
                                    idValues.push({eleId,id:kv.id,attValue:rowColEle.attr});
                                    target.setAttribute(kv.key,rowColEle.attr);
                                }
        
                            }else if(kv.id==="type"){
                                idValues.push({eleId,id:kv.id,attValue:rowColEle.attr});
                                target.setAttribute(kv.key,rowColEle.attr);
                            };
                        }else{
                            const {attValue}=idValue;
                            target.setAttribute(kv.key,attValue);
                        };
                    }else if(kv.eleProperty==="type" && level==="element"){
                        const idValue=idValues.filter(idVal=>(idVal.eleId===eleId)).find(idValue=>(idValue.id===kv.id));
                        if(!idValue){

                            if(kv.id==="eleType" && type){
                                idValues.push({eleId,id:kv.id,attValue:type as string});
                                target.setAttribute(kv.key,type as string);
                            }
                        }else{
                            const {attValue}=idValue;
                            target.setAttribute(kv.key,attValue);
                        };
                        
                    }else if(kv.eleProperty==="imgKey" && rowColEle.imgKey){
                        const idValue=idValues.filter(idVal=>(idVal.eleId===eleId)).find(idValue=>(idValue.id===kv.id));
                        if(!idValue){
                            if(kv.id==="imgKey"){
                                target.setAttribute(kv.key,rowColEle.imgKey);
                                idValues.push({eleId,id:kv.id,attValue:rowColEle.imgKey});
                            }
                        }else{
                            const {attValue}=idValue;
                            target.setAttribute(kv.key,attValue);
                        };
                    } else if(kv.eleProperty==="generic"){
                        const idValue=idValues.filter(idVal=>(idVal.eleId===eleId)).find(idValue=>(idValue.id===kv.id));
                        if(!idValue){
                            if(kv.id==="name"){
                                idValues.push({eleId,id:kv.id,attValue:rowColEle.name});
                                target.setAttribute(kv.key,rowColEle.name);
                            }else if(kv.id==="parent_id" && parent_id){
                                idValues.push({eleId,id:kv.id,attValue:parent_id});
                                target.setAttribute(kv.key,parent_id);
                            }else if(kv.id==="dFlex" && isFlex){
                                idValues.push({eleId,id:kv.id,attValue:"true"});
                                target.setAttribute(kv.key,"true");
                            }else if(kv.id==="ID" && target.id){
                                idValues.push({eleId,id:kv.id,attValue:target.id});
                                target.setAttribute(kv.key,target.id);
                            }else if(kv.id==="type" && nodeType?.name){
                                idValues.push({eleId,id:kv.id,attValue:nodeType.name});
                                target.setAttribute(kv.key,nodeType.name);
                              
                            };
                        }else{
                            const {id,attValue}=idValue;
                            if(kv.id===id){
                                target.setAttribute(kv.key,attValue);
                            }
                        };
                        if(kv.level==="row"){
                            const idValue=idValues.filter(idVal=>(idVal.eleId===eleId)).find(idValue=>(idValue.id===kv.id));
                            if(!idValue){
                                if(kv.id==="row_id"){
                                    target.setAttribute(kv.key,String(rowColEle.id));
                                }else if(kv.id==="rowOrder"){
                                    idValues.push({eleId,id:kv.id,attValue:String(index+1)});
                                    target.setAttribute(kv.key,String(index+1));
                                }else if(kv.id==="rowId"){
                                    idValues.push({eleId,id:kv.id,attValue:eleId});
                                    target.setAttribute(kv.key,target.id);
                                }else if(kv.id==="selectorId" && parent_id){
                                    idValues.push({eleId,id:kv.id,attValue:parent_id});
                                    target.setAttribute(kv.key,parent_id);
                                };

                            }else{
                                const {id,attValue}=idValue;
                                if(kv.id===id){
                                    target.setAttribute(kv.key,attValue);
                                };
                            };
                        }else if(kv.level==="col"){
                            const idValue=idValues.filter(idVal=>(idVal.eleId===eleId)).find(idValue=>(idValue.id===kv.id));
                            if(!idValue){
                                if(kv.id==="colId"){
                                    idValues.push({eleId,id:kv.id,attValue:eleId});
                                    target.setAttribute(kv.key,eleId);
                                } else if(kv.id==="col_id"){
                                    target.setAttribute(kv.key,String(rowColEle.id));
                                }else if(kv.id==="colOrder"){
                                    idValues.push({eleId,id:kv.id,attValue:String(index)});
                                    target.setAttribute(kv.key,String(index+1));
                                }else if(kv.id==="rowId" && parent_id){
                                    idValues.push({eleId,id:kv.id,attValue:parent_id});
                                    target.setAttribute(kv.key,parent_id);
                                };
                            }else{
                                const {id,attValue}=idValue;
                                if(kv.id===id){
                                    target.setAttribute(kv.key,attValue);
                                };
                            };
                        }else if(kv.level==="element"){
                            const idValue=idValues.filter(idVal=>(idVal.eleId===eleId)).find(idValue=>(idValue.id===kv.id));
                            if(!idValue){
                                if(kv.id==="ele_id"){
                                    target.setAttribute(kv.key,eleId);
                                }else if(kv.id==="eleOrder" && loc==="flexbox"){
                                    idValues.push({eleId,id:kv.id,attValue:String(index+1)});
                                    target.setAttribute(kv.key,String(index+1));
                                }else if(kv.id==="placement" && loc==="htmlElement"){
                                    idValues.push({eleId,id:kv.id,attValue:String(index)});
                                    target.setAttribute(kv.key,String(index));
                                }else if(kv.id==="elementId"){
                                    idValues.push({eleId,id:kv.id,attValue:eleId});
                                    target.setAttribute(kv.key,eleId);
                                }else if(kv.id==="numEles"){
                                    idValues.push({eleId,id:kv.id,attValue:String(this.placement)});
                                    target.setAttribute(kv.key,String(this.placement));
                                }else if((kv.id==="colId" || kv.id==="divContId") && parent_id && (loc==="flexbox" || loc==="htmlElement")){
                                    idValues.push({eleId,id:kv.id,attValue:parent_id});
                                    target.setAttribute(kv.key,parent_id);
                                };
                            }else{
                                const {id,attValue}=idValue;
                                if(kv.id===id){
                                    target.setAttribute(kv.key,attValue);
                                };
                            };
                        };
                    };
                };
            };
        });
       
        return {idValues}
    };
  


    appendIdValueToComponent({target,selRowColEle,level,idValues,loc}:{
        selRowColEle:rowType|colType|element_selType|elementType|selectorType,
        idValues:idValueType[],
        target:HTMLElement,
        level:"element"|"col"|"row"|"selector",
        loc:"flexbox"|"htmlElement",
    }):{ele:rowType|colType|elementType|element_selType,idValues:idValueType[]}{
       let ele={} as any
        if(loc==="flexbox"){
            switch(true)
            {
                case level==="row":
                    ele=selRowColEle as rowType;
                break;
                case level==="col":
                    ele=selRowColEle as colType;
                break;
                case level==="element":
                    ele=selRowColEle as element_selType;
                break;
            }
        }else{
            ele=selRowColEle as elementType
        }
     
        const parent=target.parentElement;
        //PICKING UP DEFAULT VALUES
        const {idValues:retIdValues}=this.defaultIdValues({
            target,
            selRowColEle:ele,
            parent:parent,
            level,
            loc,
            idValues,
            index:ele.id,
        });
        idValues=idValues.concat(retIdValues);
        
        
         //POPULATING ELE AND OR ATTVALUES TO IDVALUES TO ENSURE THAT INPUTS ARE APPROPRIATELY ASSIGNED
        //-------////// ----GETTING COMPONENT ATTRIBUTES- && pushing IDVALUE IF DOW NOT EXIST!!!------\\\\\\---/////
        const {idValues:retIdValues4}=this.displayIdValueResponse({
            target:target,
            rowColEle:ele,
            idValues,
            loc:loc,
            level:level
        });
        idValues=retIdValues4;
        this.populateElement({target,selRowColEle:ele,idValues,level,loc,clean:false});
        //-------////// ----GETTING COMPONENT ATTRIBUTES && pushing IDVALUE IF DOW NOT EXIST!!!-------\\\\\\---/////
      
        return {ele,idValues}
    };


    simplePopulateAttributes({target,idValues,popIdValues}:{
        idValues:idValueType[],
        popIdValues:idValueType[],
        target:HTMLElement,
    }):void{
       
        const eleId=target.id;
        idValues.map(kat=>{
            if(kat.eleId===eleId && kat.attValue){
                const check=popIdValues.find(kv=>(kv.id===kat.id));
                if(check){
                    IDKeys.map(kv=>{
                        if(kv.key && kv.id===kat.id){
                            target.setAttribute(kv.key,kat.attValue);
                        }else if(kv.key){
                            target.removeAttribute(kv.key)
                        }
                    });
                }
            }
        });
    };


    defaultIdValues({target,parent,selRowColEle,level,idValues,loc,index}:{
        selRowColEle:rowType|colType|element_selType|elementType|selectorType,
        idValues:idValueType[],
        target:HTMLElement,
        level:"element"|"col"|"row"|"selector",
        loc:"flexbox"|"htmlElement",
        index:number|null,
        parent:HTMLElement|null
    }):{ele:rowType|colType|element_selType|elementType|selectorType,idValues:idValueType[]}{
       const node=target.nodeName.toLowerCase();
       let ele=selRowColEle as rowType|colType|element_selType|elementType|selectorType|undefined
       const eleId=target.id;
       const getParent=parent || target.parentElement;
        const parent_id=parent ? parent.id :null;
        if(loc==="flexbox"){
            if(level==="selector"){
                const eleId=target.id;
                ele=selRowColEle as selectorType;
                const numRow=ele.rowNum ? ele.rowNum : 0;
                const numCol=ele.colNum ? ele.colNum : 0;
                const node=ele.name;
                [
                    {id:"selectorId",val:eleId},
                    {id:"selector_id",val:String(ele.id)},
                    {id:"ID",val:eleId},
                    {id:"placement",val:String(this.placement)},
                    {id:"isHeader",val:"true"},
                    {id:"rowNum",val:String(numRow)},
                    {id:"numCols",val:String(numCol)},
                    {id:"name",val:String(node)},

                ].map(idv=>{
                   
                        idValues.push({eleId,id:idv.id as idEnumType,attValue:idv.val});

                   
                });
            }else if(level==="row"){
                const numCols= parent ? parent.getAttribute("data-num-cols"):"null";
                const eleId=target.id;
                ele=selRowColEle as rowType;
                const rowOrder=ele.order;
                const node=ele.name;
                if(parent) idValues.push({eleId,id:"selectorId",attValue:parent_id as string});
                else if(getParent) idValues.push({eleId,id:"selectorId",attValue:getParent.id});
                if(index) idValues.push({eleId,id:"rowNum",attValue:String(index)});
                
                
                [
                    {id:"rowId",val:eleId},
                    {id:"ID",val:eleId},
                    {id:"rowOrder",val:String(rowOrder)},
                    {id:"row",val:"true"},
                    {id:"isRow",val:"true"},
                    {id:"rowNum",val:String(selRowColEle.id)},
                    {id:"numCols",val:String(numCols)},
                    {id:"name",val:String(node)},

                ].map(idv=>{
                   
                        idValues.push({eleId,id:idv.id as idEnumType,attValue:idv.val})
                   
                });
            }else if(level==="col"){
                const eleId=target.id;
                ele=selRowColEle as colType;
                const colOrder=ele.order;
                const node=ele.name;
                idValues.push({eleId,id:"col_id",attValue:String(ele.id)});
                if(parent) idValues.push({eleId,id:"rowId",attValue:parent_id as string});
                else if(getParent) idValues.push({eleId,id:"rowId",attValue:getParent.id as string});
                if(index) idValues.push({eleId,id:"numCols",attValue:String(index)});
               
                [
                    {id:"colId",val:eleId},
                    {id:"ID",val:eleId},
                    {id:"colOrder",val:String(colOrder)},
                    {id:"column",val:"true"},
                    {id:"isColumn",val:"true"},
                    {id:"name",val:String(node)},

                ].map(idv=>{
                    
                        idValues.push({eleId,id:idv.id as idEnumType,attValue:idv.val})
                    
                });
            }else if(level==="element"){
                const eleId=target.id;
                ele=selRowColEle as element_selType;
                const node=ele.name;
                const eleOrder=ele.order;
               
                if(parent) idValues.push({eleId,id:"colId",attValue:parent_id as string});
                if(index) idValues.push({eleId,id:"numEles",attValue:String(index)});
                [
                    {id:"ele_id",val:String(ele.id)},
                    {id:"elementId",val:eleId},
                    {id:"ID",val:eleId},
                    {id:"eleOrder",val:String(eleOrder)},
                    {id:"element",val:"true"},
                    {id:"isElement",val:"true"},
                    {id:"name",val:String(node)},
                    {id:"name",val:String(node)},

                ].map(idv=>{
                    
                        idValues.push({eleId,id:idv.id as idEnumType,attValue:idv.val})
                   
                });
                
            }

        }else if(loc==="htmlElement"){
            const eleId=target.id;
            ele=selRowColEle as elementType;
            const node=ele.name as eleEnumType;
            const elePlacement=ele.placement;
            idValues.push({eleId,id:"ele_id",attValue:String(ele.id)});
            if(parent) idValues.push({eleId,id:"divContId",attValue:parent_id as string});
            if(index) idValues.push({eleId,id:"numEles",attValue:String(index)});
            if(parent) idValues.push({eleId,id:"colId",attValue:parent_id as string});
                if(index) idValues.push({eleId,id:"numEles",attValue:String(index)});
                [
                    {id:"ele_id",val:String(ele.id)},
                    {id:"elementId",val:eleId},
                    {id:"ID",val:eleId},
                    {id:"elePlacement",val:String(elePlacement)},
                    {id:"element",val:"true"},
                    {id:"isElement",val:"true"},
                    {id:"name",val:String(node)},

                ].map(idv=>{
                    const check=idValues.find(idval=>(idval.id===idv.id));
                    if(!check){
                        idValues.push({eleId,id:idv.id as idEnumType,attValue:idv.val})
                    };
                });
        }
        IDKeyValuepairs.map(kv=>{
            const checkNode=kv.nodes.includes(node as eleEnumType)
            if(kv.level===level && checkNode){
                if( kv.id && ele){
                    if(!kv.value){
                        idValues.map(kat=>{
                            if(kat.eleId===eleId){
                                if(kat.id===kv.id && kat.attValue){
                                    target.setAttribute(kv.key,kat.attValue);
                                    if(kv.class_){
                                        target.classList.add(kv.class_);
                                        ele.class=target.className;
                                    };
                                };
    
                            }
                        });
                    }else{
                        //populating is-element,,,etc
                        target.setAttribute(kv.key,kv.value);
                        if(kv.class_){
                            target.classList.add(kv.class_);
                            ele.class=target.className;
                        };
                    };
    
                };
            }
        });

        return {ele:selRowColEle as rowType|colType|element_selType|elementType|selectorType,idValues}
    };


    coreDefaultIdValues({target,sel,row,col,ele,idValues,loc,level,clean}:{
        //GARANTEEDS THAT ALL DEFAULT IDVALUES ARE INCORPORATED. IT PUSHES NEW IDVALUES ONTO IDVALUES
        sel:selectorType|null,
        row:rowType|null,
        col:colType|null,
        ele:elementType|element_selType|null,
        idValues:idValueType[],
        target:HTMLElement,
        level:"element"|"col"|"row"|"selector",
        loc:"flexbox"|"htmlElement",
        clean:boolean
    }):{idValues:idValueType[]}{
        idValues=idValues.filter(kat=>(kat.attValue !=="null"));
       const node=target.nodeName.toLowerCase();
       const checkEleh=ele && level==="element" && loc==="htmlElement" && ele.eleId===target.id ;
       const checkElef=ele && level==="element" && loc==="flexbox" && ele.eleId===target.id;
       const eleh=checkEleh ? ele as elementType: null;
       const elef= checkElef ? ele as element_selType: null;
       const eleId=target.id;
        if(loc==="flexbox"){
            if(level==="selector" && sel && !(row && col && ele) && sel.eleId===target.id){
                const eleId=sel.eleId;
                const numRow=sel.rowNum ? sel.rowNum : 0;
                const numCol=sel.colNum ? sel.colNum : 0;
                const node=sel.name;
               const idValueSel:idValueType[]= [
                    {eleId,id:"selectorId",attValue:eleId},
                    {eleId,id:"selector_id",attValue:String(sel.id)},
                    {eleId,id:"ID",attValue:eleId},
                    {eleId,id:"placement",attValue:String(this.placement)},
                    {eleId,id:"isHeader",attValue:"true"},
                    {eleId,id:"rowNum",attValue:String(numRow)},
                    {eleId,id:"numCols",attValue:String(numCol)},
                    {eleId,id:"name",attValue:String(node)},

                ];  
                idValueSel.map(item=>{

                        idValues.push(item);

                   
                });
                idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            }else if(level==="row" && row && sel && !(col && ele) && row.eleId===target.id){
                const eleId=row.eleId;
                const attrTest=attrEnumArrTest(row);
                const typeTest=typeEnumArrTest(row);
                if(attrTest) idValues.push({eleId,id:attrTest.id as idEnumType,attValue:attrTest.value});
                if(typeTest) idValues.push({eleId,id:typeTest.id,attValue:typeTest.value});
                if(row.imgKey){
                     idValues.push({eleId,id:"imgKey",attValue:row.imgKey});
                     idValues.push({eleId,id:"backgroundImg",attValue:"backgroundImg"});
                };
                const rowOrder=row.order;
                const node=row.name;
                const numCols=row.cols.length;
                const rowTop=sel.colAttr[0].T;
                const rowBot=sel.colAttr[0].B;
                const rowNums=rowTop > 0 && rowBot >0 ? 2 : 1;
                const selRow:selRowType={selectorId:sel.eleId,rowId:row.eleId};
                const rowIdValues:idValueType[]=[
                    {eleId,id:"rowId",attValue:eleId},
                    {eleId,id:"ID",attValue:eleId},
                    {eleId,id:"rowOrder",attValue:String(rowOrder)},
                    {eleId,id:"selRow",attValue:JSON.stringify(selRow)},
                    {eleId,id:"row",attValue:"true"},
                    {eleId,id:"isRow",attValue:"true"},
                    {eleId,id:"rowNum",attValue:String(rowNums)},
                    {eleId,id:"numCols",attValue:String(numCols)},
                    {eleId,id:"name",attValue:String(node)},
                    {eleId,id:"selectorId",attValue:sel.eleId},

                ]
                rowIdValues.map(idv=>{
                    
                        idValues.push(idv)
                    
                });
                idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
                
            }else if(level==="col" && col && row && sel && !ele && col.eleId===target.id){
                const eleId=col.eleId;
                const numCols=row.cols.length;
                const attrTest=attrEnumArrTest(col);
                const typeTest=typeEnumArrTest(col);
                if(attrTest) idValues.push({eleId,id:attrTest.id as idEnumType,attValue:attrTest.value});
                if(typeTest) idValues.push({eleId,id:typeTest.id,attValue:typeTest.value});
                if(col.imgKey){
                    idValues.push({eleId,id:"imgKey",attValue:col.imgKey});
                    idValues.push({eleId,id:"backgroundImg",attValue:"backgroundImg"});
                };
                const colOrder=col.order;
                const col_id=String(col.id);
                const node=col.name;
                const numsEle=String(col.elements.length);
                const selRow:selRowType={selectorId:sel.eleId,rowId:row.eleId};
                const selRowCol:selRowColType={selectorId:sel.eleId,rowId:row.eleId,colId:eleId};
                
               
               const colIdValues:idValueType[]= [
                    {eleId,id:"colId",attValue:eleId},
                    {eleId,id:"numCols",attValue:String(numCols)},
                    {eleId,id:"rowId",attValue:row.eleId},
                    {eleId,id:"col_id",attValue:col_id},
                    {eleId,id:"ID",attValue:eleId},
                    {eleId,id:"colOrder",attValue:String(colOrder)},
                    {eleId,id:"column",attValue:"true"},
                    {eleId,id:"isColumn",attValue:"true"},
                    {eleId,id:"name",attValue:String(node)},
                    {eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)},
                    {eleId,id:"selRow",attValue:JSON.stringify(selRow)},
                    {eleId,id:"numEles",attValue:numsEle},

                ]
                colIdValues.map(idv=>{
                    
                        idValues.push(idv)
                    
                });
                idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            }else if(level==="element" && elef && sel && row && col && elef.eleId===target.id){
                const eleId=elef.eleId;
                const attrTest=attrEnumArrTest(elef);
                const typeTest=typeEnumArrTest(elef);
                if(attrTest) idValues.push({eleId,id:attrTest.id as idEnumType,attValue:attrTest.value});
                if(typeTest) idValues.push({eleId,id:typeTest.id,attValue:typeTest.value});
                if(elef.imgKey){
                    idValues.push({eleId,id:"imgKey",attValue:elef.imgKey});
                };
                const node=elef.name;
                const eleOrder=elef.order;
                const numEles=String(col.elements.length);
                const selRowCol:selRowColType={selectorId:sel.eleId,rowId:row.eleId,colId:col.eleId}
                const ele_id=String(elef.id);
               
                const elefIdValues:idValueType[]=[
                    {eleId,id:"ele_id",attValue:ele_id},
                    {eleId,id:"elementId",attValue:eleId},
                    {eleId,id:"ID",attValue:eleId},
                    {eleId,id:"eleOrder",attValue:String(eleOrder)},
                    {eleId,id:"element",attValue:"true"},
                    {eleId,id:"isElement",attValue:"true"},
                    {eleId,id:"name",attValue:String(node)},
                    {eleId,id:"editableTrue",attValue:"true"},
                    {eleId,id:"numEles",attValue:numEles},
                    {eleId,id:"selRowCol",attValue:JSON.stringify(selRowCol)},

                ];
                elefIdValues.map(idv=>{
                    
                        idValues.push(idv)
                   
                });
                idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
            };

        }else if(loc==="htmlElement" && !(sel && row && col) && eleh && eleh.eleId===target.id){
            const eleId=eleh.eleId;
            const attrTest=attrEnumArrTest(eleh);
            const typeTest=typeEnumArrTest(eleh);
            if(attrTest) idValues.push({eleId,id:attrTest.id as idEnumType,attValue:attrTest.value});
            if(typeTest) idValues.push({eleId,id:typeTest.id,attValue:typeTest.value});
            if(eleh.imgKey){
                idValues.push({eleId,id:"imgKey",attValue:eleh.imgKey});
            };
            const node=eleh.name as eleEnumType;
            const ele_id=String(eleh.id);
            const elePlacement=String(eleh.placement);
            const divContId=target.parentElement ? target.parentElement.id : undefined;
               const elehIdValues:idValueType[]= [
                    {eleId,id:"ele_id",attValue:ele_id},
                    {eleId,id:"elementId",attValue:eleId},
                    {eleId,id:"ID",attValue:eleId},
                    {eleId,id:"elePlacement",attValue:elePlacement},
                    {eleId,id:"element",attValue:"true"},
                    {eleId,id:"isElement",attValue:"true"},
                    {eleId,id:"name",attValue:node},
                    {eleId,id:"editableTrue",attValue:"true"},
                    {eleId,id:"divContId",attValue:String(divContId)},

                ];
                elehIdValues.map(idv=>{
                        idValues.push(idv)
                });
                idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});
        };
        idValues=idValues.filter(kat=>(kat.attValue !=="null"));
        this.upDateIdValues({idValues});
        IDKeyValuepairs.map(kv=>{
            const checkNode=kv.nodes.includes(node as eleEnumType)
            if(kv.level===level && checkNode){
                if( kv.id && ele){
                    if(!(kv.value==="null" && !kv.value )){
                        idValues.map(kat=>{
                            if(kat.eleId===eleId && kat.attValue !==null){
                                if(kat.id===kv.id && kat.attValue){
                                    target.setAttribute(kv.key,kat.attValue);
                                    if(kv.class_){
                                        target.classList.add(kv.class_);
                                        ele.class=target.className;
                                    };
                                };
    
                            }
                        });
                    }else if(kv.value){
                        target.setAttribute(kv.key,kv.value);
                        if(kv.class_){
                            target.classList.add(kv.class_);
                            ele.class=target.className;
                        };
                        if(clean && kv.id==="editableTrue"){
                            target.setAttribute(kv.key,"false")
                        //populating is-element,,,etc
                    };
    
                };
            };
            }
        });
       
        return {idValues}
    };



    coreChartIdValues({target,idValues,chart,clean}:{
        //GARANTEEDS THAT ALL DEFAULT IDVALUES ARE INCORPORATED. IT PUSHES NEW IDVALUES ONTO IDVALUES
        idValues:idValueType[],
        target:HTMLElement,
        chart:chartType,
        clean:boolean
    }):{idValues:idValueType[]}{
        idValues=idValues.filter(kat=>(kat.attValue !=="null"));
       const node=target.nodeName.toLowerCase();
       const eleId=target.id;
       const divContId=target.parentElement ? target.parentElement.id : undefined;
          const elehIdValues:idValueType[]= [
               {eleId,id:"elementId",attValue:eleId},
               {eleId,id:"ID",attValue:eleId},
               {eleId,id:"elePlacement",attValue:String(chart.placement)},
               {eleId,id:"element",attValue:"true"},
               {eleId,id:"isElement",attValue:"true"},
               {eleId,id:"name",attValue:node},
               {eleId,id:"divContId",attValue:String(divContId)},

           ];
           elehIdValues.map(idv=>{
                   idValues.push(idv)
           });
           idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});;
        idValues=idValues.filter(kat=>(kat.attValue !=="null"));
        this.upDateIdValues({idValues});
        IDKeyValuepairs.map(kv=>{
            const checkNode=kv.nodes.includes(node as eleEnumType)
            if(kv.level==="element" && checkNode){
                if( kv.id && chart){
                    if(!(kv.value==="null" && !kv.value )){
                        idValues.map(kat=>{
                            if(kat.eleId===eleId && kat.attValue !==null){
                                if(kat.id===kv.id && kat.attValue){
                                    target.setAttribute(kv.key,kat.attValue);
                                    if(kv.class_){
                                        target.classList.add(kv.class_);
                                        chart.class=target.className;
                                    };
                                };
    
                            }
                        });
                    }else if(kv.value){
                        target.setAttribute(kv.key,kv.value);
                        if(kv.class_){
                            target.classList.add(kv.class_);
                            chart.class=target.className;
                        };
                        if(kv.id==="editableTrue"){
                            target.removeAttribute(kv.key);
                        //populating is-element,,,etc
                    };
    
                };
            };
            }
        });
       
        return {idValues}
    };



    populateElement({target,selRowColEle,idValues,level,loc,clean}:{
        target:HTMLElement,
        selRowColEle:selectorType|rowType|colType|elementType|element_selType,
        idValues:idValueType[],
        level:"selector"|"row"|"col"|"element",
        loc:"flexbox"|"htmlElement",
        clean:boolean

    }){
        idValues=idValues.filter(kat=>(kat.attValue !=="null"));
        const eleId=target.id;
        const parent=target.parentElement;
        const node=target.nodeName.toLowerCase();
        let ele=selRowColEle as selectorType|rowType|colType|elementType|element_selType;
        const type=typeEnumArrTest(ele as rowType|colType|elementType|element_selType);
        const attr=attrEnumArrTest(ele as rowType|colType|elementType|element_selType);
        switch(true){
            case level==="selector" && loc==="flexbox":
                ele=ele as selectorType;
                idValues.push({eleId,id:"rowNum",attValue:String(ele.rowNum)});
                idValues.push({eleId,id:"numCols",attValue:String(ele.colNum)});
                idValues.push({eleId,id:"selectorId",attValue:eleId});
                idValues.push({eleId,id:"ID",attValue:eleId});
                if(ele.footer) idValues.push({eleId,id:"isFooter",attValue:"true"});
                if(ele.header) idValues.push({eleId,id:"isHeader",attValue:"true"});
                if(clean) idValues.push({eleId,id:"editableFalse",attValue:"true"});
                break;
                case level==="row" && loc==="flexbox":
                ele=ele as rowType;
                idValues.push({eleId,id:"rowNum",attValue:String(ele.order)});
                if(parent) idValues.push({eleId,id:"selectorId",attValue:parent.id});
                 idValues.push({eleId,id:"ID",attValue:eleId});
                 if(ele.imgKey) idValues.push({eleId,id:"imgKey",attValue:ele.imgKey});
                 if(type) idValues.push({eleId,id:type.id,attValue:ele.type as string});
                 if(attr) idValues.push({eleId,id:attr.id as idEnumType,attValue:ele.attr as string});
                 if(clean) idValues.push({eleId,id:"editableFalse",attValue:"true"});
                
            break;
            case level==="col" && loc==="flexbox":
                ele=ele as colType;
                idValues.push({eleId,id:"colId",attValue:eleId});
                if(parent) idValues.push({eleId,id:"rowId",attValue:parent.id});
                 idValues.push({eleId,id:"ID",attValue:eleId});
                 if(ele.imgKey) idValues.push({eleId,id:"imgKey",attValue:ele.imgKey});
                 if(type) idValues.push({eleId,id:type.id,attValue:ele.type as string});
                 if(attr) idValues.push({eleId,id:attr.id as idEnumType,attValue:ele.attr as string});
                 if(clean) idValues.push({eleId,id:"editableFalse",attValue:"true"});
               
            break;
            case level==="element" && loc==="flexbox":
                ele=ele as element_selType;
                if(parent) idValues.push({eleId,id:"divContId",attValue:parent.id});
                 idValues.push({eleId,id:"ID",attValue:eleId});
                 if(ele.imgKey) idValues.push({eleId,id:"imgKey",attValue:ele.imgKey});
                 if(type) idValues.push({eleId,id:type.id,attValue:ele.type as string});
                 if(attr) idValues.push({eleId,id:attr.id as idEnumType,attValue:ele.attr as string});
                 if(clean) idValues.push({eleId,id:"editableFalse",attValue:"true"});
            break;
            case level==="element" && loc==="htmlElement":
                ele=ele as elementType
                if(parent) idValues.push({eleId,id:"divContId",attValue:parent.id});
                 idValues.push({eleId,id:"ID",attValue:eleId});
                 if(ele.imgKey) idValues.push({eleId,id:"imgKey",attValue:ele.imgKey});
                 if(type) idValues.push({eleId,id:type.id,attValue:ele.type as string});
                 if(attr) idValues.push({eleId,id:attr.id as idEnumType,attValue:ele.attr as string});
                 if(clean) idValues.push({eleId,id:"editableFalse",attValue:"true"});
            break;

        };
        idValues=idValues.filter(kat=>(kat.attValue !=="null"));
        idValues=Dataset.removeIdValueDuplicates({arr:idValues,eleId});

            const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
            IDKeyValuepairs.map(kv=>{
                const check=kv.nodes.includes(node as eleEnumType);
                if(check && kv.level===level){
                    if((kv.value !==null || kv.value !=="null") && !kv.value){
                        getEleIds.map(kat=>{
                            if(kat.attValue && kv.id===kat.id){
                                target.setAttribute(kv.key,kat.attValue);
                                if(kv.class_){
                                    target.classList.add(kv.class_);
                                }
                            }
                        });
                    }else if(kv.value && kv.value!=="null") {
                        target.setAttribute(kv.key,kv.value)
                        if(kv.id !=="editableTrue"){
                            target.removeAttribute("contenteditable");
                        }
                    }
                }
                
            });
        this.upDateIdValues({idValues});
    };



    removeComponentIdValues({blog,eleId,idValues,loc}:{
        //ONLY REMOVES IDVALUES !!
        blog:blogType,
        eleId:string,
        idValues:idValueType[]
        loc:"flexbox"|"htmlElement"
    }):{idValues:idValueType[],keys:string[]}{
        const selects=blog.selectors;
        const keyArr:string[]=[];
        if(loc==="flexbox"){

            selects.map((sel,index)=>{
                if(sel.eleId===eleId){
                    const {rows}=this.checkGetRows({select:sel}) as {rows:rowType[]};
                    if(rows){
                        rows.map(row=>{
                            if(row){
                                row.cols.map(col=>{
                                    if(col){
                                        col.elements.map(ele=>{
                                            if(ele){
                                                idValues.map((kat,index)=>{
                                                    const check= kat.eleId===col.eleId || kat.eleId===row.eleId || kat.eleId===sel.eleId
                                                    if(kat.eleId===ele.eleId){
                                                       if(kat.id==="imgKey") keyArr.push(kat.attValue);
                                                        idValues.splice(index,1)
                                                    }else if(check){
                                                       if(kat.id==="imgKey") keyArr.push(kat.attValue);
                                                        idValues.splice(index,1);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    };
                }
               
            });
        }else{
            idValues.map((kat,index)=>{
                if(kat.eleId===eleId){
                    if(kat.id==="imgKey") keyArr.push(kat.attValue);
                    idValues.splice(index,1);
                }
            });
        };
        if(idValues.length>0){
            this.upDateIdValues({idValues});
        }
        return {idValues,keys:keyArr}
    };

    checkGetRows(item:{select:selectorType}):{isRows:boolean,rows:rowType[]}{
        const {select}=item;
        const check=(select && select.rows!=="" && typeof(JSON.parse(select.rows)))==="object";
        if(check){
            const rows=JSON.parse(select.rows as string) as rowType[];
            return {isRows:true,rows}
        }else{
            return {isRows:false,rows:[] as rowType[]}
        };
        
    };

    getAttribute({target,id}:{target:HTMLElement,id:idEnumType}):string|undefined{
        let value:string|null=null;
        IDKeys.map(kv=>{
            if(id && id===kv.id && kv.key){
                value=target.getAttribute(kv.key)
            }
        });
        return value || undefined
    }

    removeSubValue({idValues,id,target,eleId}:{idValues:idValueType[],target:HTMLElement,id:string,eleId:string}):idValueType[]{
        const getEleIds=idValues.filter(kat=>(kat.eleId===eleId));
        IDKeys.map(kv=>{
            getEleIds.map((kat,index)=>{
                if(kat.id===id && kv.id===kat.id && kv.key){
                    
                    target.removeAttribute(kv.key)
                }
            });
        });
        idValues=idValues.filter(kat=>(kat.id!==id));
        if(idValues.length>0){
            this.upDateIdValues({idValues});
        }
        return idValues
    };



    simpleInsertAttrAndType({target,ele,idValues}:{
        //THIS COMPLETES TARGET'S ATTR && TYPE  ATTRIBUTES IF ELE .ATTR/ELE.TYPE EXISTS AND POPULATES ELE.ATTR/ELE.TYPE IF IDVALUES HAS ATTRS && TYPES IDS WITH ATTVALUES
        //RETURNS NEWLY POPULATED ELE IF TYPE/ATTR=UNDEFINED && AND IDVALUES=> HAS ATTVALUE AND ID KEY, ALONG WITH IDVALUES
        target:HTMLElement,
        idValues:idValueType[]
        ele:elementType|element_selType|colType|rowType
    }):{ele:elementType|element_selType|colType|rowType,idValues:idValueType[]}{
        const node=target.nodeName.toLowerCase() as eleEnumType;
        const eleId=target.id;
        const attrTest=attrEnumArrTest(ele);
        const typeTest=typeEnumArrTest(ele);
        const eleIdIdValues=idValues.filter(kat=>(kat.eleId===eleId));

        
        IDKeyValuepairs.map(kv=>{
            const checkNode=kv.nodes.includes(node as eleEnumType);
            if(kv.id && kv.key && checkNode){
                if(attrTest && kv.eleProperty==="attr"){
                        const isAttr=attrTest.test;
                        //TEST IS TRUE
                    if(isAttr){

                        idValues= idValues.map(kat=>{
                                if(kat.eleId===eleId){
                                    if(kat.id===attrTest.id && kv.id===kat.id){
                                        if(kat.attValue===attrTest.value){
                                            target.setAttribute(kv.key,kat.attValue);
                                        }else{
                                            target.setAttribute(kv.key,attrTest.value);
                                            kat.attValue=attrTest.value
                                        }
                                        if(kv.class_){
                                            target.classList.add(kv.class_);
                                            ele.class=target.className
                                        }
                                    }
                                }
                                return kat
                            });
                    }
                }else if(typeTest && kv.eleProperty==="type"){
                    //TEST IS TRUE
                    const isType=typeTest.test;
                    if(isType){

                        idValues= idValues.map(kat=>{
                            if(kat.eleId===eleId){
                                if(kat.id===typeTest.id && kv.id===kat.id){
                                    if(kat.attValue && kat.attValue===typeTest.value){
                                        target.setAttribute(kv.key,kat.attValue);
                                    }else{
                                        target.setAttribute(kv.key,typeTest.value);
                                        kat.attValue=typeTest.value
                                    }
                                    if(kv.class_){
                                        target.classList.add(kv.class_);
                                        ele.class=target.className
                                    }
                                }
                            }
                            return kat
                        });
                    }
                }else if(eleIdIdValues && eleIdIdValues.length>0){
                    //has attValue but no ele.attr && ele.type values
                    eleIdIdValues.map(kat=>{
                        const checkAttr = attrEnumArr.includes(kat.id);
                        const checkType = typeEnumArr.includes(kat.id as typeEnumType);
                        if(kat.id ===kv.id && kat.attValue){
                            if(checkAttr || checkType){
                                //ATTR(S)
                               
                                target.setAttribute(kv.key,kat.attValue);
                                if(kv.class_){
                                    target.classList.add(kv.class_);
                                    ele.class=target.className
                                }
                            }
                        }
                    });
                }
            }
            });

        return {ele,idValues}
    };

    getIdValue({target,idValues,id}:{target:HTMLElement,idValues:idValueType[],id:idEnumType}):idValueType|null{
        const eleId=target.id;
        const getEleValues=idValues.filter(kat=>(kat.eleId===eleId));
        const idValue=getEleValues.find(kat=>(kat.id===id));
        const getKey =IDKeys.find(kv=>(kv.id===id)) as {id:idEnumType,key:string|undefined};
        const getIdString=getKey.key ? target.getAttribute(getKey.key as string):null;
        const retResult=idValue ? idValue.attValue :(getIdString || null) 
        if(retResult) return {eleId,id,attValue:String(retResult)};
        return null
    };


    upDateIdValue({target,idValues,idValue}:{target:HTMLElement,idValues:idValueType[],idValue:idValueType}){
        const eleId=target.id;
        const id=idValue.id;
        const isExist=idValues.filter(kat=>(kat.eleId===eleId)).find(kat=>(kat.id===id));
        if(isExist){
            idValues=idValues.map(kat=>{
                if(kat.eleId===eleId){
                    if(kat.id===id){
                        kat=idValue;
                    }
                }
                return kat;
            });
        }else{
            idValues.push(idValue);
        };
        const getIDKey=IDKeys.find(kv=>(kv.id===id));
        if(getIDKey?.key && idValue.attValue){
            target.setAttribute(getIDKey.key as string,idValue.attValue);
        }
        
        if(idValues.length>0){
            this.upDateIdValues({idValues});
        }
    };


    upDateIdValues({idValues}:{idValues:idValueType[]}){
        const idSet=new Set();
        let cleanArr:idValueType[]=[];
        idValues.map(kat=>(idSet.add(kat.eleId)));
        Array.from(idSet).map(group=>{
            const hetEleIds=idValues.filter(kat=>(kat.eleId===group));
            cleanArr=cleanArr.concat(hetEleIds);
        });
        
        //Reome items
        this.idValues=cleanArr
        //Reome items
        return cleanArr
    };


    displayIdValueResponse({target,rowColEle,loc,level,idValues}:{
        // populates the target with the approriate attribute, based on what the element FILTERS/OR ADDS IDVALUES
        //RETURNS IDVALUES
        target:HTMLElement,
        rowColEle:rowType|colType|elementType|element_selType|selectorType,
        loc:"htmlElement"|"flexbox",
        level:"element"|"col"|"row"|"selector",
        idValues:idValueType[]

    }):{idValues:idValueType[]}{
        const eleId=target.id;
        const node=target.nodeName.toLowerCase() as eleEnumType;
        let ele={} as any;
        ele=rowColEle as rowType|colType|elementType|element_selType
       if(loc==="flexbox"){
        if(level==="element") ele=ele as element_selType;
        if(level==="col") ele=ele as colType;
        if(level==="row") ele=ele as rowType;
        if(level==="selector") ele=ele as selectorType;
       }else{
        ele=ele as elementType
       }
     
        
        IDKeyValuepairs.map(kv=>{
            const checkNode=kv.nodes.includes(node as eleEnumType);
            if(kv.level===level && checkNode){
                if(!kv.value){
                    const attrTest=attrEnumArrTest(ele);
                    const typeTest=typeEnumArrTest(ele);
                    const getEleids=idValues.filter(kat=>(kat.eleId===eleId))
                    const checkIdValue=getEleids.find(kat=>(kat.id===kv.id));
                    if(kv.eleProperty==="attr" && attrTest && attrTest.id===kv.id){
                        if(!checkIdValue){
                            const idValue:idValueType={eleId,id:attrTest.id,attValue:attrTest.value}
                            this.upDateIdValue({target,idValues,idValue});
                        }
                        target.setAttribute(kv.key,attrTest.value);
                        if( ele.imgKey){
                            if(!checkIdValue){
                                const idValue:idValueType={eleId,id:"imgKey",attValue:ele.imgKey}
                                this.upDateIdValue({target,idValues,idValue});
                            }
                            target.setAttribute("imgKey",ele.imgKey);
                            target.setAttribute(kv.key,attrTest.value);
                        }
                        if(kv.class_){
                            target.classList.add(kv.class_)
                        }
                    }else if(kv.eleProperty==="type" && typeTest && typeTest.id===kv.id){
                        if(!checkIdValue){
                            const idValue:idValueType={eleId,id:typeTest.id,attValue:typeTest.value}
                            this.upDateIdValue({target,idValues,idValue});
                        }
                        target.setAttribute(kv.key,typeTest.value);
                        if(kv.class_){
                            target.classList.add(kv.class_)
                        }
                    }else if( ele.attr==="backgroundImg" && kv.id===ele.attr){
                        target.setAttribute(kv.key,kv.id);
                    }
                }else{
                    target.setAttribute(kv.key,kv.value)
                }

            }
        });
       return {idValues}
    }

  
   

    getcssMsgs({eleItem,level}:{eleItem:elementType|element_selType|colType|rowType,level:"element" | "col" | "row" | "selector" | "main"}):{[key:string]:string}|undefined{
        const pairs:{[key:string]:string}={"":""};
        const nameType=["a","button","div","button","h6","p","time"].find(ty=>(ty===eleItem.name));
        const classes=eleItem.class.split(" ");
        const getBody=this.insertClassAttMsgs.filter(ins=>(ins.level===level)).find(ins=>(ins.action.name==="generic"));
        if(!getBody) return ;
        getBody.action.action.map(item=>{
                if(item && nameType){
                    const getClass=classes.find(cl=>(cl===item.key));
                    if(getClass && item.key){
                        pairs[item.key]=String(item.value);
                    }
                }
            });
        return pairs
    };
  
 
    static async genKeyValuePairsFrom_RowColEleData({eleItem,type,allAtts}:{eleItem:elementType|element_selType|colType|rowType,type:"element"|"col"|"row",allAtts:standardAttType[]}):Promise<getKeyvaluePairsType[]>{
        //eleItem===REFERENCE:GENERATES ONLY KEY,VALUE PAIRS==> to INSERT OR NOT INTO SETATTRIBUTE(KEY,VALUE) BASED ON TYPE=row|col|element.
        //OUTPUT:=>{type:string,name:string,keyvalue:{key:string,value:string}[]
        const arr:getKeyvaluePairsType[]=[];
        const name=eleItem.name as eleEnumType;
        const imgKey=(eleItem?.imgKey) ? eleItem.imgKey : undefined;
        const backgroundImg=(name==="div" && imgKey!==undefined);
        if(type==="row" || type==="col"){
            eleItem=eleItem as rowType;
            const attr= (eleItem?.attr) ? eleItem.attr : undefined;
            const order= (eleItem?.order) ? eleItem.order : undefined;
            allAtts.map(item=>{
                if(item.node===name){
                    item.keyvalues.map(kv=>{
                        const hasNode=kv.nodes.includes(name);
                        if(hasNode){
                            const check=(kv.id==="rowOrder" || kv.id==="colOrder") && item.level==="row" && item.loc==="flexbox"
                            if(!(kv.value)){
                                if(imgKey && kv.id==="imgKey"){
                                    arr.push({id:kv.id,level:type,name:kv.id,keyvalue:{key:kv.id,value:imgKey}});
                                }else if(kv.id==="name"){
                                    arr.push({id:kv.id,level:type,name:kv.id,keyvalue:{key:kv.key,value:name}});
                                }else if(check){
                                    arr.push({id:kv.id,level:type,name:kv.id,keyvalue:{key:kv.key,value:order}});
                                }else if(kv.id==="backgroundImg" && imgKey){
                                    arr.push({id:kv.id,level:type,name:kv.id,keyvalue:{key:kv.id,value:"true"}});
                                }else if(kv.id==="attr"){
                                    arr.push({id:kv.id,level:type,name:kv.id,keyvalue:{key:kv.id,value:attr}});
                                }else if(kv.id==="type"){
                                    arr.push({id:kv.id,level:type,name:kv.id,keyvalue:{key:kv.key,value:kv.value}});
                                };
                            }else{
                                arr.push({id:kv.id,level:type,name:kv.id,keyvalue:{key:kv.key,value:kv.value}});
                            }
                        }

                    });
                }
            });

        }else if(type==="element"){
            eleItem=(type==="element" && ((eleItem as elementType).placement )) ? eleItem as elementType:eleItem as element_selType;
            
            const attr= (eleItem.attr) ? eleItem.attr : undefined;
            const type_=(eleItem.type) ? eleItem.type : undefined;
            const order=(eleItem && (eleItem as element_selType).order) ? (eleItem as element_selType).order : undefined;
            const placement=(eleItem && (eleItem as elementType).placement) ? (eleItem as elementType).placement : undefined;
            const link=(eleItem && eleItem.name==="a" && attr) ? attr : undefined;
            const email=link?.startsWith("mailto") ? link : null;
            const tel= link?.startsWith("tel") ? link : null;
            const time=(eleItem && name==="time" && attr) ? attr : undefined;
            const shapeOutside=(eleItem && type && type_==="shapeOutside");
            const shapeOutsideCircle=(eleItem && name==="p" && attr?.includes("circle")) ? attr:null;
            const shapeOutsideSquare=(eleItem && name==="p" && attr?.includes("square")) ? attr:null;
            const shapeOutsidePolygon=(eleItem && name==="p" && attr?.includes("polygon")) ? attr:null;
            const isCircle=(eleItem && name==="div" && attr?.includes("circle")) ? attr:null;
            const headerflag=(eleItem && name==="div" && type_==="headerflag") ? type_:null;
            const isCode=(eleItem && name==="p" && attr?.includes("codeElement")) ? type_:null;
            const isArrow=(eleItem && name==="div" && attr?.includes("design")) ? type_:null;
            const isVen=(eleItem && name==="div" && attr?.includes("ven")) ? type_:null;
            const isWave=(eleItem && name==="div" && attr?.includes("wave")) ? type_:null;
            const isArch=(eleItem && name==="div" && attr?.includes("arch")) ? type_:null;
            const isPasteCode=(eleItem && name==="div" && attr?.includes("pasetCode")) ? type_:null;
            const design=(eleItem && name==="div" && attr?.includes("design")) ? type_:null;
            [
                {id:"attr",value:attr},
                {id:"type",value:type},
                {id:"elePlacement",value:placement},
                {id:"link",value:link},
                {id:"order",value:order},
                {id:"time",value:time},
                {id:"email",value:email},
                {id:"tel",value:tel},
                {id:"imgKey",value:imgKey},
                {id:"backgroundImg",value:backgroundImg},
                {id:"shapeOutside",value:shapeOutside},
                {id:"shapeOutsideCircle",value:shapeOutsideCircle},
                {id:"shapeOutsideSquare",value:shapeOutsideSquare},
                {id:"shapeOutsidePolygon",value:shapeOutsidePolygon},
                {id:"headerflag",value:headerflag},
                {id:"isCircle",value:isCircle},
                {id:"isCode",value:isCode},
                {id:"isPasteCode",value:isCode},
                {id:"isArrow",value:isArrow},
                {id:"isVen",value:isVen},
                {id:"isWave",value:isWave},
                {id:"isArch",value:isArch},
                {id:"design",value:design},
                {id:"isPasteCode",value:isPasteCode},
    
            ].map(isItem=>{
                //isItem is the controller && ID identifies
                allAtts.map(item=>{
                    if(type===item.level){
                        item.keyvalues.map(kv=>{
                            const hasNode=kv.nodes.find(nd=>(nd===name));
                            if(hasNode){

                                if(!(kv.value)){
                                    if(kv.eleProperty ===item.eleProperty && kv.eleProperty==="type"){
                                        if(isItem.value && isItem.id==="type"){
                                            if(kv.id==="type"  ){
                                                arr.push({id:kv.id,level:type,name,keyvalue:{key:kv.key,value:String(isItem.value)}});
                                                arr.push({id:kv.id,level:type,name,keyvalue:{key:`data-${kv.key}`,value:String(isItem.value)}});;
                                            }
                                        }
                                    }else if(kv.eleProperty ===item.eleProperty && kv.eleProperty==="attr"){
                                        if(isItem.value && isItem.id===kv.id){
                                            arr.push({id:kv.id,level:type,name,keyvalue:{key:kv.key,value:String(isItem.value)}});
                                                arr.push({id:kv.id,level:type,name,keyvalue:{key:`data-${kv.key}`,value:String(isItem.value)}});;
                                        }
                                    }
                                   
                                }else{
                                    arr.push({id:kv.id,level:type,name:kv.id,keyvalue:{key:kv.key,value:kv.value}});
                                }
                            }
                        });
                    }
                });
            });
        }
        return Promise.resolve(arr) as Promise<getKeyvaluePairsType[]>;
    };
   


   static getBlogIds({blog}:{blog:blogType}): {
    selectIds: selectIdType[];
    rowIds: rowIdType[];
    colIds: colIdType[];
    eleIds: eleIdType[];
    }{
        
        let selId:selectIdType={eleId:"",eleNum:0,rowIds:[]} as selectIdType;
        const selectIds:selectIdType[]=[];
        const rowIds:rowIdType[]=[];
        let rowId:rowIdType={eleId:"",eleNum:0,colIds:[]} as rowIdType;
        const colIds:colIdType[]=[];
        let colId:colIdType={eleId:"",eleNum:0,eleIds:[]} as colIdType;
        const eleIds:eleIdType[]=[];
     blog.selectors.map((select,selNum)=>{
            if(select.rows){
                selId={...selId,eleId:select.eleId,eleNum:selNum}
                const rows=JSON.parse(select.rows) as rowType[];
                rows.map((row,rowNum)=>{
                    if(row.eleId && selId){
                        rowId={...rowId,eleId:row.eleId,eleNum:rowNum};
                        selId.rowIds=[...selId.rowIds,rowId];
                        if(row.cols && rowId){
                            row.cols.map((col,colNum)=>{
                                if(col.eleId){
                                    colId={...colId,eleId:col.eleId,eleNum:colNum};
                                    rowId.colIds=[...rowId.colIds,colId]
                                    if(col.elements && colId){
                                        col.elements.map(el=>(eleIds.push({eleId:el.eleId,eleNum:el.id})))
                                       
                                    }
                                    colIds.push(colId)
                                }
                            });
                        }
                        rowIds.push(rowId)
                    }
                    
                });
                selectIds.push(selId)
            }
            return selId;
        });
        return {selectIds:selectIds,rowIds:rowIds,colIds:colIds,eleIds:eleIds}
    };
  
    static genClassKeys({class_}:{class_:string}):{[key:string]:string}{
        const classes=class_.split(" ");
        const _class:{[key:string]:string}={} as {[key:string]:string};
        classes.map((cl,index)=>{
            const str=String(index)
            _class[str]=cl;
        });

        return _class
    };

    static removeIdValueDuplicates({arr,eleId}:{arr:idValueType[],eleId:string}):idValueType[]{
        const newSet=new Set<string>();
        const cleanIdValues:idValueType[]=[];
        const getEleIds=arr.filter(kat=>(kat.eleId===eleId));
        const getRemainder=arr.filter(kat=>(kat.eleId!==eleId));
        getEleIds.map(kat=>{
            newSet.add(kat.id)
        });
        Array.from(newSet).map(id=>{
            const getOne=getEleIds.find(kat=>(kat.id===id));
            if(getOne){
                cleanIdValues.push({eleId:getOne.eleId,id:getOne.id,attValue:getOne.attValue});
            }
        });
        arr=getRemainder.concat(cleanIdValues)
        return arr
    };
}
export default Dataset;
export const removeIdValueDuplicates=Dataset.removeIdValueDuplicates;
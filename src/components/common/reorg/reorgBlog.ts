import { idValueType } from "@/lib/attributeTypes";
import ModSelector from "../../editor/modSelector";
import { blogType, chartType, elementType, reorderType, selectorType, userType } from "../../editor/Types";
import styles from "./reorg.module.css";
import Misc from "../misc";
import { FaCreate } from "../ReactIcons";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCrosshairs } from "react-icons/fa";
import Header from "@/components/editor/header";


class ReorgBlog{
   public remove:boolean;
   public fromDivId:string;
   public toDivId:string;
    constructor(private _modSelector:ModSelector){
        this.remove=false;
        this.fromDivId="from-x-div";
        this.toDivId="to-x-div";
    };

    async main({parent,blog,textarea}:{
        parent:HTMLElement,
        blog:blogType,
        textarea:HTMLElement,
       }){
        const reorgMain=document.createElement("div");
            reorgMain.className=styles.reorgMain;
            parent.appendChild(reorgMain);

            this.reOrder({
                parent:reorgMain,
                blog,
                textarea,
                callback:(blog)=>{

                }
            })
       };


    async reOrder({parent,blog,textarea,callback}:{
        parent:HTMLElement,
        blog:blogType,
        textarea:HTMLElement,
        callback:(blog:blogType)=>Promise<void>|void
       }){
       this.remove=false;
            //cleaning attributes
            const elements=blog?.elements.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as elementType[] || [] as elementType[];
            const selectors=blog?.selectors.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as selectorType[] || [] as selectorType[];
            const charts=blog?.charts.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as chartType[] || [] as chartType[];
            const checkEles=!!(elements && elements?.length);
            const checkSeles=!!(selectors && selectors?.length);
            const checkChrts=!!(charts && charts?.length);
            // console.log("selectors",selectors)//duplicates


            const reorgMain=document.createElement("div");
            reorgMain.id="reorgMain";
            reorgMain.className=styles.reorgMain;
            parent.appendChild(reorgMain);
           this.removePopup({parent,target:reorgMain});
        console.log("REMOVE",this.remove)
            const reorg=document.createElement("div");
            reorg.className=styles.reorg;
            const row=document.createElement("div");
            row.id="reorg-row";
            row.className=styles.reorgRow;
            const col1=document.createElement("div");
            col1.id="reorg-row-col-1";
            col1.style.order="-1";
            col1.className=styles.reorgCol;
            row.appendChild(col1);
           
            reorgMain.appendChild(row);
            if(checkEles){
                elements.map((ele,index)=>{
                    if(ele){
                        this.fromElement({
                            col:col1,
                            textarea,
                            ele,
                            index,
                            blog,
                            callback
                        });
                    }
                   
                });
            }
            if(checkSeles){
                selectors.map((sel,index)=>{
                    if(sel && !sel.header && !sel.footer){
                        this.fromSelector({
                            col:col1,
                            textarea,
                            sel,
                            index,
                            blog,
                            callback
                        });
                    }
                   
                });
            }
            if(checkChrts){
               charts.map((chart,index)=>{
                    if(chart){
                        this.fromChart({
                            col:col1,
                            textarea,
                            chart,
                            index,
                            blog,
                            callback
                        });
                    }
                    
                });
            };
        };



        fromElement({textarea,col,ele,index,blog,callback}:{
            col:HTMLElement,
            textarea:HTMLElement,
            ele:elementType,
            index:number,
            blog:blogType,
            callback:(blog:blogType)=>Promise<void>|void
        }){
            const {eleId:baseEleId,name:baseName,placement}=ele;
            const innerCol=document.createElement("div");
            innerCol.className=styles.reorgCol;
            innerCol.id="from-col-"+String(index);
            col.appendChild(innerCol);
            const row=document.createElement("div");
            row.id="row-"+String(index);
            row.className=styles.reorgRow;
          
                for(const [key,value] of Object.entries(ele)){
                    const check=["placement","name","id"].includes(key);
                    if(check && value){
                        const name=document.createElement("h6");
                        name.className="text-primary mx-auto mb-1";
                        name.textContent=`${key}: `;
                        const name2=document.createElement("h6");
                        if(key==="name"){
                            const getEle=document.querySelector(`${ele.name}#${ele.eleId}`) as HTMLElement;
                            if(getEle){
                                name2.textContent=`${ele.name}-${getEle.textContent?.slice(0,10) || String(value)}`
                            }else{
                                name2.textContent=String(value);

                            }

                        }else{
                            name2.textContent=`${String(value)}`;
                        }
                        const div=document.createElement("div");
                        div.id="col-row-" + String(index);
                        div.style.cssText="display:inline-flex;align-items:center;gap:0.5rem;";
                        div.appendChild(name);
                        div.appendChild(name2);
                        if(key==="name"){

                            this.selectFunc({textarea,parent:div,blog,baseEleId,baseName,placement,type:"element",
                                callback
                            });
                        }
                        
                        row.appendChild(div);
                        innerCol.appendChild(row);
                       
                    };
                };
        };

        fromSelector({textarea,col,sel,index,blog,callback}:{
            col:HTMLElement,
            textarea:HTMLElement,
            sel:selectorType,
            index:number,
            blog:blogType,
            callback:(blog:blogType)=>Promise<void>|void
        }){
            const {eleId:baseEleId,name:baseName,placement}=sel;
            const row=document.createElement("div");
            row.className=styles.reorgRow;
            row.id="from-row-"+String(index);
            col.appendChild(row);
                for(const [key,value] of Object.entries(sel)){
                    const check=["placement","name","id"].includes(key);
                    if(check  && value && typeof(value) !=="object"){
                        const name=document.createElement("h6");
                        name.className="text-primary mx-auto";
                        name.textContent=key;
                        const name2=document.createElement("h6");
                        if(key==="name"){
                            name2.textContent=`BOX-${value}`
                        }else{
                            name2.textContent=String(value);

                        }
                        const div=document.createElement("div");
                        div.id="col-row-" + String(index);
                        div.style.cssText="display:inline-flex;align-items:center;gap:0.5rem";
                        div.appendChild(name);
                        div.appendChild(name2);
                        if(key==="name"){
                            this.selectFunc({textarea,parent:div,blog,baseName,baseEleId,placement,type:"selector",
                                callback
                            });
                        }
                        row.appendChild(div);
                    };
                };
        };


        fromChart({col,textarea,chart,index,blog,callback}:{
            col:HTMLElement,
            textarea:HTMLElement,
            chart:chartType,
            index:number,
            blog:blogType,
            callback:(blog:blogType)=>Promise<void>|void
        }){
            const {eleId:baseEleId,placement}=chart;
            const row=document.createElement("div");
            row.className=styles.reorgRow;
            row.id="from-row-"+String(index);
            col.appendChild(row);
                for(const [key,value] of Object.entries(chart)){
                    const check=["placement","type","id"].includes(key);
                    if(check && value && typeof(value) !=="object"){
                        const name=document.createElement("h6");
                        name.textContent=key;
                        const name2=document.createElement("h6");
                        name2.textContent=String(value);
                        const div=document.createElement("div");
                        div.id="col-row-" + String(index);
                        div.style.cssText="display:inline-flex;align-items:center;gap:0.5rem;";
                        div.appendChild(name);
                        div.appendChild(name2);
                        if(key==="type"){

                            this.selectFunc({parent:div,textarea,blog,baseEleId,baseName:"canvas",placement,type:"chart",
                                callback
                            });
                        }
                        row.appendChild(div);
                    };
                };
        };



    selectFunc({parent,textarea,blog,baseEleId,baseName,placement,type,callback}:{
        blog:blogType,
        parent:HTMLElement,
        textarea:HTMLElement,
        baseEleId:string,
        baseName:string,
        placement:number,
        type:"element"|"selector"|"chart",
        callback:(blog:blogType)=>Promise<void>|void
    }){
        let arr:reorderType[]=[];
        const base:{baseEleId:string,placement:number,baseName:string,type:string}={baseEleId,baseName,placement,type};
        const elements=blog?.elements || [] as elementType[];
        const selectors=blog?.selectors.filter(kv=>(!kv.header)) || [] as selectorType[];
        const charts=blog?.charts || [] as chartType[];
       

        arr.push({id:0,eleId:"",placement:0,type:"select",html:"",name:""});
        arr=arr.concat(elements.map(kv=>({id:kv.id,placement:kv.placement,eleId:kv.eleId,type:"element",html:kv.inner_html.slice(0,5),name:kv.name})));
        arr=arr.concat(selectors.map(kv=>({id:kv.id,placement:kv.placement,eleId:kv.eleId,type:"selector",html:"BOX",name:kv.name})));
        arr=arr.concat(charts.map(kv=>({id:kv.id,placement:kv.placement,eleId:kv.eleId,type:"chart",html:"chart",name:"canvas"})));
        const select=document.createElement("select");
        select.className=styles.select;
            arr.map((ele,ind)=>{
                const option=document.createElement("option");
                if(ind===0){
                    option.style.cssText="background-color:black;color:white;";
                    option.textContent="select"
                }else{
                    option.textContent=`${ele.html}-${String(ele.placement)}`;
                }
                option.value=JSON.stringify(ele);
                select.appendChild(option);
            });
            parent.appendChild(select);

        select.onchange=(e:MouseEvent)=>{
            if(!e) return;

            const value=(e.currentTarget as HTMLSelectElement).value;
            const selected=JSON.parse(value) as reorderType;
            this.pointer({textarea,selected,baseEleId,baseName});
            const getBtn=parent.querySelector("button#select-btn") as HTMLButtonElement;
            if(!getBtn) return
            getBtn.textContent="re-order";
            getBtn.disabled=false;
        };
        const {button}=Misc.simpleButton({anchor:parent,type:"button",bg:"blue",color:"white",text:"re-order",time:400});
        button.id="select-btn";
        button.disabled=true;
        button.textContent="disabled";
        button.onclick=(e:MouseEvent)=>{
            if(!e) return;
            
            const value=(select as HTMLSelectElement).value;
            const selected=JSON.parse(value) as reorderType;
            const _blog=this.slotShiftdown({selected,base,blog});
            const getFromDiv=document.querySelector(`div#${this.fromDivId}`) as HTMLElement;
            const getToDiv=document.querySelector(`div#${this.toDivId}`) as HTMLElement;
        if(getFromDiv && getToDiv){
            getFromDiv.remove();
            getToDiv.remove();
        }
            callback(_blog);
        };
    };

    pointer({textarea,selected,baseEleId,baseName}:{textarea:HTMLElement,selected:reorderType,baseEleId:string,baseName:string}){
        const {placement:selectPlace,eleId,name}=selected;
        const fromDoc=textarea.querySelector(`${baseName}#${baseEleId}`) as HTMLElement;
        const toDoc=textarea.querySelector(`${name}#${eleId}`) as HTMLElement;
        if(!fromDoc && !toDoc) return;
        let getFromDiv=document.querySelector(`div#${this.fromDivId}`) as HTMLElement;
        let getToDiv=document.querySelector(`div#${this.toDivId}`) as HTMLElement;
        if(getFromDiv && getToDiv){
            getFromDiv.remove();
            getToDiv.remove();
        }
                fromDoc.style.position="relative";
                toDoc.style.position="relative";
                const fromDivCont=fromDoc.parentElement;
                const fromPlace=fromDivCont?.getAttribute("data-placement")
                // ADD ICON ON SELECTED AND FROM
                getFromDiv=document.createElement("div");
                getFromDiv.id=this.fromDivId;
                getFromDiv.setAttribute("data-placement",String(fromPlace));
                getToDiv=document.createElement("div");
                getToDiv.id=this.toDivId;
                getToDiv.setAttribute("data-placement",String(selectPlace));
                getToDiv.className=styles.toPointer;
                getFromDiv.className=styles.toPointer;
                FaCreate({parent:getFromDiv,name:FaArrowAltCircleRight,cssStyle:{borderRadius:"50%",backgroundColor:"red",color:"black",fontSize:"26px"}});
                FaCreate({parent:getToDiv,name:FaArrowAltCircleLeft,cssStyle:{borderRadius:"50%",backgroundColor:"white",color:"green",fontSize:"26px"}});
                fromDoc.appendChild(getFromDiv);
                toDoc.appendChild(getToDiv);
       
        

    }


    slotShiftdown({selected,base,blog}:{blog:blogType,selected:reorderType,base:{baseEleId:string,baseName:string,placement:number,type:string}}){
       
        blog.elements=blog?.elements.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as elementType[] || [] as elementType[];
        blog.selectors=blog?.selectors.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as selectorType[] || [] as selectorType[];
        blog.charts=blog?.charts.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as chartType[] || [] as chartType[];
       
        const {placement:selectPlace,eleId:selectEleId}=selected;
        const {baseEleId,placement:basePlacement}=base;

            blog.elements.map(ele=>{
                const increment=ele?.placement > selectPlace && selectPlace < basePlacement && ele?.placement >1;
                const decrement=ele?.placement < selectPlace && selectPlace > basePlacement && ele?.placement >1;
                const check3=ele?.eleId!==baseEleId || ele?.eleId!==selectEleId;
                if(ele?.eleId===baseEleId){
                    //change placememnt
                    ele.placement=selectPlace;
                }else if(ele?.eleId===selectEleId){
                    ele.placement=selectPlace + 1;
                }else if(check3 ){
                        if(increment){
                            ele.placement=ele.placement + 1;
                        }else if(decrement){
                            ele.placement=ele.placement - 1;
                        };
                }
                
            });
    
            blog.selectors.map(ele=>{
                const increment=ele?.placement > selectPlace && selectPlace <= basePlacement && ele?.placement >1;
                const decrement=ele?.placement < selectPlace && selectPlace > basePlacement && ele?.placement >1;
                const check3=ele?.eleId!==baseEleId || ele?.eleId!==selectEleId;
                if(ele?.eleId===baseEleId){
                    //change placememnt
                    ele.placement=selectPlace;
                }else if(ele?.eleId===selectEleId){
                    ele.placement=selectPlace + 1;
                }else if(check3){
                    if(increment){
                        ele.placement=ele.placement + 1;
                    }else if(decrement){
                        ele.placement=ele.placement - 1;
                    }
    
                }
               
               
            });
    
            blog.charts.map(ele=>{
                const increment=ele?.placement > selectPlace && selectPlace < basePlacement && ele?.placement >1;
                const decrement=ele?.placement < selectPlace && selectPlace > basePlacement && ele?.placement >1;
                const check3=ele?.eleId!==baseEleId || ele?.eleId!==selectEleId;
                if(ele?.eleId===baseEleId){
                    //change placememnt
                    ele.placement=selectPlace;
                }else if(ele?.eleId===selectEleId){
                    ele.placement=selectPlace + 1;
                }else if(check3){
                    if(increment){
                        ele.placement=ele.placement + 1;
                    }else if(decrement){
                        ele.placement=ele.placement - 1;
                    }
    
                }
               
                return ele;
            });
      

        const sortedBlog=ReorgBlog.sortPlacement({blog});
        return sortedBlog
    };



    static sortPlacement({blog}:{blog:blogType}):blogType{
        let arrTotal:reorderType[]=[];
        blog.elements=blog?.elements.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as elementType[] || [] as elementType[];
        blog.selectors=blog?.selectors.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as selectorType[] || [] as selectorType[];
        blog.charts=blog?.charts.toSorted((a,b)=>{if(a.placement <b.placement) return -1;return 1}) as chartType[] || [] as chartType[];
        arrTotal=arrTotal.concat(blog.elements.map(kv=>({id:kv.id,placement:kv.placement,type:"element",eleId:kv.eleId,html:kv.inner_html.slice(0,5),name:kv.name})));
        arrTotal=arrTotal.concat(blog.selectors.map(kv=>({id:kv.id,placement:kv.placement,type:"element",eleId:kv.eleId,html:kv.name,name:kv.name})));
        arrTotal=arrTotal.concat(blog.charts.map(kv=>({id:kv.id,placement:kv.placement,type:"element",eleId:kv.eleId,html:"chart",name:"canvas"})));
        
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
        localStorage.setItem("blog",JSON.stringify(blog));
        const _max=Math.max(...arrTotal.map(kv=>(kv.placement)))
        localStorage.setItem("placement",String(_max + 1));
       
        return blog;
    };


 

    removePopup({parent,target}:{parent:HTMLElement,target:HTMLElement}){
        target.style.position="relative";
        const xDiv=document.createElement("div");
        xDiv.className=styles.removePopup;
        FaCreate({parent:xDiv,name:FaCrosshairs,cssStyle:{backgroundColor:"black",color:"white",borderRadius:"50%",fontSize:"16px"}});
        target.appendChild(xDiv);
        xDiv.onclick=(e:MouseEvent)=>{
            if(!e) return;
            parent.removeChild(target);
            const getFromDiv=document.querySelector(`div#${this.fromDivId}`);
            const getToDiv=document.querySelector(`div#${this.toDivId}`);
            if(getFromDiv && getToDiv){
                getFromDiv.remove();
                getToDiv.remove();
            }
        };
        
    };

};
export default ReorgBlog;
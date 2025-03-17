import Misc from "@/components/common/misc";
import Header from "@/components/editor/header";
import { quoteCalcItemType, returnCalcType, userType } from "@/components/editor/Types";
import Nav from "@/components/nav/headerNav";
import styles from "./quote.module.css";
import Service from "@/components/common/services";
import { returnQuoteFinalType } from '../../components/editor/Types';
import Htmltwocanvas from "@/components/common/htmltwocanvas";
import { calculateQuote } from "@/lib/ultils/quoteFunctions";

type component_type={
    name:string,
    value:string | undefined,
    desc:string,
    checked?:boolean;
};

class Quote{
    private _list:quoteCalcItemType[]
    private _nameEmail:{user_id:string|null,name:string,email:string};
    public _quoteListParams:returnQuoteFinalType;
    private _user:userType | null;
    public quotepic:string="/images/quote_600.png";
    public phone:string="/images/phone.png";
_componentTypes:component_type[];
initTypes:component_type[]=[
    {name:"scheduler",desc:"for client booking appointments?",value:undefined,checked:false},
    {name:"images",desc:"free or professional?",value:undefined,checked:false},
    {name:"#users",desc:"how many users?",value:undefined,checked:undefined},
    {name:"meta",desc:"want google to know your pages?",value:undefined,checked:false},
    {name:"text",desc:"Do you want us to fill in the information for you?",value:undefined,checked:false},
];
    constructor(private _service:Service,user:userType|null,list:quoteCalcItemType[],private html2canvas:Htmltwocanvas){
        this._user=user;
        this.phone="/images/phone.png";
        this.quotepic="/images/quote_600.png"
        this._componentTypes=this.initTypes;
        this._list=list;
        //---GET LIST FROM SERVER---//
        if(user){
            this._nameEmail={name:user.name || "",email:user.email,user_id:user.id ||""};
        };
    }
    get list(){
        return this._list
    }
    set list(list:quoteCalcItemType[]){
        this._list=list;
    }
    get user(){
        return this._user
    }
    get nameEmail(){
        return this._nameEmail;
    }
    set nameEmail(nameEmail:{name:string,email:string,user_id:string|null}){
        this._nameEmail=nameEmail;
    }
    get componentTypes(){
        return this._componentTypes
    }
    set componentTypes(componentTypes:component_type[]){
        this._componentTypes=componentTypes;
    }
    get quoteListParams(){
        return this._quoteListParams;
    }
    set quoteListParams(quoteListParams:returnQuoteFinalType){
        this._quoteListParams=quoteListParams;
    }

    main({parent}:{parent:HTMLElement}){
        if(!parent) return;
        const less400=window.innerWidth < 400;
        const css_col="margin-inline:auto;display:flex;flex-direction:column;align-items:center;";
        const css_row="margin-inline:auto;display:flex;flex-wrap:wrap;align-items:center;width:100%;justify-content:center;";
        parent.style.cssText=css_col + "position:relative;width:100%;";
        Header.cleanUpByID(parent,"quote-main-container");
        const container=document.createElement("div");
        container.id="quote-main-container";
        container.style.cssText=css_col;
        this.titleContainer({parent:container,user:this.user,css_col,less400});
        this.form({parent:container,user:this.user,css_col,css_row,less400}).then(async(res)=>{
            if(res){
                res.form.onsubmit=(e:SubmitEvent)=>{
                    if(e){
                        e.preventDefault();
                        
                        const arr:{name:string,value:string|undefined}[]=[];
                        const formdata= new FormData(e.currentTarget as HTMLFormElement);
                        const name=formdata.get("name") as string;
                        arr.push({name:"name",value:name});
                        const email=formdata.get("email") as string;
                        arr.push({name:"email",value:email});
                        const pages=formdata.get("pages") as string;
                        arr.push({name:"pages",value:pages});
                        const pageNames=formdata.get("pageNames") as string;
                        arr.push({name:"pageNames",value:pageNames});
                        this.componentTypes.map(item=>{
                            arr.push({name:item.name,value:item.value})
                        });
                        const hasPassed=this.passedTests({parent:res.form,arr});

                        if(hasPassed?.passed){
                            const user_id=this.user?.id || "";
                            const _name=this.user?.name || name;
                            const _email=this.user?.email || email;
                            this.nameEmail={name:_name,email:_email,user_id:user_id};
                            //QUOTE RESULTS PARAMS
                            const returnQuoteFinal:returnQuoteFinalType|undefined = calculateQuote({ nameValue:arr, list:this.list, user:this.user });
                            //QUOTE RESULTS PARAMS
                            // USER
                            let user =this.user ? this.user : {} as userType;
                            user= {...user,name:_name,email:_email,id:user_id}
                            //USER
                            if(returnQuoteFinal){
                                //RETURNING PAGENAMES IN DESCRIPTION
                                const finaleReslts=this.insertPageNames({returnQuoteFinal,nameValues:arr})
                                this.quoteListParams=finaleReslts;
                                //generating quote WITHOUT API REQUEST 
                                this.showPageQuote({parent:container,returnQuoteFinal:finaleReslts,user}).then(async(res)=>{
                                    if(res){
                                        // This EMAILS THE USER THE QUOTE MADE FROM SHOWPAGEQUOTE
                                        this.generatingQuote({target:res.quoteContainer,user,button:res.button});
                                    };
                                });
                                //generating quote WITHOUT API REQUEST----END 
                            };
                            
                        }
                    }
                };
            }
        });
        parent.appendChild(container);

        
    };



    insertPageNames(item:{returnQuoteFinal:returnQuoteFinalType,nameValues:{name:string,value:string|undefined}[]}):returnQuoteFinalType{
        const {returnQuoteFinal,nameValues}=item;
        let returnCalcList=returnQuoteFinal.returnCalcList;
        returnCalcList= returnCalcList.map(item=>{
            item.list.map(subItem=>{
                const nameValue=nameValues.find(item_=>(item_.name==="pageNames"))
                if(subItem.type==="pages" && nameValue?.value){
                    subItem.desc+=`for pages:${nameValue.value.toUpperCase()}`;
                }
                return subItem;
            });
            return item;
        });
        return {...returnQuoteFinal,returnCalcList};
    };



    generatingQuote(item:{target:HTMLElement,user:userType,button:HTMLButtonElement}){
        const {target,user,button}=item;
        // GENERATING QUOTE
        const getFooter=document.querySelector("section#footerInjector") as HTMLElement;
        if(!getFooter) return;
        getFooter.style.display="none";
        
        setTimeout(()=>{
            button.style.display="none";
            this.html2canvas.imageQuote({target:target,user:user,button:button});
        },0);
        button.onclick=(e:MouseEvent)=>{
            if(e){
                const getHeader=document.querySelector("div#headerInjector") as HTMLElement;
                if(!getHeader) return;
                const getBody=document.body as HTMLElement;
                getBody.style.display="flex";
                getBody.style.flexDirection="column";
                getBody.style.alignItems="center";
                getBody.style.justifyContent="center";
                getHeader.style.display="none";
                button.style.opacity="0";
                setTimeout(()=>{
                    window.print();
                    getBody.style.display="block";
                    getBody.style.flexDirection="";
                    getBody.style.alignItems="";
                    getBody.style.justifyContent="";
                    getFooter.style.display="display";
                    getHeader.style.display="display";
                    window.history.go(-1);
                },0);
            }
        };
        //GENERATING QUOTE END
    }
    titleContainer(item:{parent:HTMLElement,user:userType|null,css_col:string,less400:boolean}){
        const {parent,css_col,less400}=item;
        const container=document.createElement("div");
        container.id="title-container";
        container.style.cssText=css_col + "justify-content:center;padding:1rem;width:100%;background-color:black;border-radius:12px;font-family:'Poppins-regular';margin-bottom:2rem;";
        container.style.minHeight=less400 ? "40vh":"20vh";
        this.lineStyle({parent:container});
        const title=document.createElement("p");
        title.textContent="Garrantee Lowest Full Stack Quote";
        title.className="mx-auto";
        title.className=styles.quoteTitleStyle
        const para=document.createElement("p");
        para.id="title-para";
        // para.style.cssText="margin-inline:auto;margin-bottom:1rem;color:white;text-wrap:pretty;position:relative;padding-inline:2rem;"
        para.className=styles.quoteTitlePara;
        this.callUs({parent:para});
        para.innerHTML+="fill it out, click and the response will be in your email as as soon as possible, or just give us a call.";
        container.appendChild(title);
        container.appendChild(para);
        this.lineStyle({parent:container});
        parent.appendChild(container);

    }
    lineStyle({parent}:{parent:HTMLElement}){
        const div=document.createElement("div");
        div.className="subTitleStyleThree";
        div.style.cssText="height:5px;width:100%;margin-inline:auto;";
        parent.appendChild(div);
    }
    callUs({parent}:{parent:HTMLElement}){
        //FIX NOTTTTT CLICKING!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const anchor=document.createElement("a");
        parent.style.position="relative";
        parent.style.zIndex="0";
        anchor.classList.add("btnMessageHover");
        anchor.setAttribute("data-message","any Questions? - call");
        anchor.id="phone-icon-container-btn";
        anchor.style.cssText="padding:0px;background-color:black;margin-right:1.5rem;color:white;position:absolute;top:0%;left:-2%;z-index:20;width:30px;height:30px;display:flex;justify-content:center;align-items:center;transform:translateY(-40%);border-radius:50%;filter:drop-shadow(0 0 0.5rem white);cursor:pointer;border:none;";
        anchor.href="tel:416-917-5768";
        const img=document.createElement("img");
        img.src=this.phone;
        img.alt="www.ablogroom.com";
        img.style.cssText="margin:auto;border-radius:inherit;width:100%;";
        anchor.appendChild(img);
        parent.appendChild(anchor);
    };



    form(item:{parent:HTMLElement,user:userType|null,css_col:string,css_row:string,less400:boolean}):Promise<{form:HTMLFormElement,user:userType|null}>{
        const {parent,user,css_col,css_row,less400}=item;
        const name=user?.name || "";
        const email=user?.email || "";
        const form=document.createElement("form");
        form.id="main-container-form";
        form.style.cssText=css_col + " width:100%;border-radius:12px;box-shadow:1px 1px 6px 1px lightblue;background-color:white;";
        form.style.padding=less400 ? "0.5rem":"1rem";
        const {input:inName,label:labName,formGrp:grpName}=Nav.inputComponent(form);
        grpName.classList.add("w-100");
        grpName.classList.add("mx-auto");
        inName.style.cssText="margin-inline:auto;"
        inName.style.width=less400 ? "100%":"75%";
        inName.id="quote-name";
        // inName.pattern="\w{3,16}\sw{3,16}"
        inName.type="name";
        inName.name="name";
        inName.value=name ||"";
        inName.autocomplete="name";
        inName.placeholder="full name please";
        labName.id="label-name";
        labName.textContent="full name";
        labName.setAttribute("for",inName.id);
        const {input:inEmail,label:labEmail,formGrp:grpEmail}=Nav.inputComponent(form);
        grpEmail.classList.add("w-100");
        grpEmail.classList.add("mx-auto");
        inEmail.style.cssText="margin-inline:auto;"
        inEmail.style.width=less400 ? "100%":"75%";
        inEmail.autocomplete="email";
        inEmail.id="email";
        inEmail.name="email";
        inEmail.pattern="[a-zA-Z0-9.]{2,}@[a-zA-Z0-9.]{3,}.[a-zA-Z0-9.]{1,3}";
        inEmail.value=email || "";
        inEmail.type="email";
        inEmail.placeholder="myEmail@mail.com";
        labEmail.id="label-email";
        labEmail.textContent="email";
        labEmail.setAttribute("for",inEmail.id);
        
        ///----page characteristic------------------///
        this.pageTypeLists({form,css_row,less400});
        ///----page characteristic------------------///
        ///----page components------------------///
        this.pageComponents({form,css_row,css_col,less400});
        ///----page components------------------///
        const {button}=Misc.simpleButton({anchor:form,type:"submit",text:"submit",bg:"black",color:"white",time:400});
        button.id="submit-btn";
        
        parent.appendChild(form);
        return Promise.resolve({form,user}) as Promise<{form:HTMLFormElement,user:userType|null}>;

    };


    pageTypeLists({form,css_row,less400}:{form:HTMLFormElement,css_row:string,less400:boolean}){
        const titlePage=document.createElement("h6");
        titlePage.id="titlePage";
        titlePage.textContent="Page Characteristic";
        titlePage.className="text-primary text-center mb-1 mt-2";
        form.appendChild(titlePage);
        const pages=document.createElement("div");
        pages.id="form-pages";
        pages.style.cssText=css_row + "margin-block:1rem;box-shadow:1px 1px 3px lightblue;border-radius:12px;padding:1rem;gap:1.5rem";
        const {input:inPages,label:labPages,formGrp:grpPages}=Nav.inputComponent(pages);
        grpPages.classList.add("mx-auto");
        grpPages.classList.remove("form-group");
        grpPages.style.flex=less400 ? "1 0 100%" : "1 0 30%";
        inPages.style.cssText="margin-inline:auto;width:fit-content;"
        inPages.classList.remove("form-control");
        inPages.autocomplete="on";
        inPages.id="quote-pages";
        inPages.name="pages";
        inPages.type="number";
        inPages.placeholder="";
        inPages.min="1";
        inPages.max="10";
        labPages.id="label-pages";
        labPages.textContent="#pages";
        inPages.onchange=(e:Event)=>{
            if(e){
                const getBtn=form.querySelector("button#submit-btn") as HTMLButtonElement;
                const value=(e.currentTarget as HTMLInputElement).value;
                inPages.value=value;
                if(value){
                    getBtn.disabled=false;
                }
            }
        };
       
        const {textarea:inPageNames,label:labPageNames,formGrp:grpPageNames}=Nav.textareaComponent(pages);
        grpPageNames.style.flex=less400 ? "1 0 100%" : "1 0 65%";
        grpPageNames.classList.add("mx-auto");
        inPageNames.style.cssText="margin-inline:auto;"
        inPageNames.autocomplete="off";
        inPageNames.id="pageNames";
        inPageNames.rows=4;
        inPageNames.name="pageNames";
        inPageNames.placeholder="list pages";
        labPageNames.id="label-pageNames";
        labPageNames.textContent="What page type do you want?";
        labPageNames.setAttribute("for",inPageNames.id);
        inPageNames.onchange=(e:Event)=>{
            if(e){
                const getBtn=form.querySelector("button#submit-btn") as HTMLButtonElement;
                const value=(e.currentTarget as HTMLInputElement).value;
                inPageNames.value=value;
                if(getBtn && value){
                  getBtn.disabled=false;
                }
            }
        };
        form.appendChild(pages);
    };

    pageComponents({form,css_row,less400,css_col}:{form:HTMLFormElement,css_row:string,less400:boolean,css_col:string}){
        const titlePage=document.createElement("h6");
        titlePage.id="titlePage-components";
        titlePage.textContent="Page Components";
        titlePage.className="text-primary text-center mb-1 mt-2";
        form.appendChild(titlePage);
        const pages=document.createElement("div");
        pages.id="form-page-components";
        pages.className="row";
        pages.style.cssText= "margin-block:1rem;box-shadow:1px 1px 3px lightblue;border-radius:12px;padding:1rem;width:100%";
        const col1=document.createElement("div");
        col1.id="page-components-col1";
        col1.className="col-md-8";
        col1.style.cssText=css_col +"margin-auto;";
        col1.style.flex=less400 ? "1 0 100%" : "1 0 68%";
        const col2=document.createElement("div");
        col2.className="col-md-4";
        col2.id="page-components-col2";
        col2.style.cssText=css_col +"margin-auto;border-radius:12px;box-shadow:1px 1px 6px 1px blue";
        col2.style.flex=less400 ? "1 0 100%" : "1 0 30%";
        const responseCol2=document.createElement("h6");
        responseCol2.className="text-primary text-center mb-2";
        responseCol2.textContent="Recorded &&";
        col2.appendChild(responseCol2);
        this.componentTypes.map((item,index)=>{
            this.rendComponentType({column1:col1,column2:col2,item})
        });
        
        pages.appendChild(col1);
        Header.cleanUpByID(pages,"page-components-col2");
        pages.appendChild(col2);
        form.appendChild(pages);
    };
    
  


    rendComponentType({column1,column2,item}:{column1:HTMLElement,column2:HTMLElement,item:component_type}){
        
        const desc=document.createElement("small");
            desc.id=`desc-${item.name}`;
            desc.textContent=item.desc
            desc.style.cssText="padding-inline:0;";
            desc.className="text-primary text-center";
            column1.appendChild(desc);
            const {input:inType,label:labType,formGrp:grpType}=Nav.inputComponent(column1);
            if(item.name !=="#users"){

                grpType.classList.add("mx-auto");
                grpType.classList.remove("form-group");
                inType.style.cssText="margin-inline:auto;width:fit-content;"
                inType.classList.remove("form-control")
                inType.autocomplete="off";
                inType.id=`types-checkbox-${item.name}`;
                inType.name=item.name;
                inType.type="checkbox";
                inType.checked=item.checked ? item.checked : false;
                inType.placeholder="";
                labType.id=`types-label-${item.name}`;
                labType.textContent=item.name;
                labType.setAttribute("for",inType.id);
            }else{
                grpType.classList.add("mx-auto");
                grpType.classList.remove("form-group");
                inType.style.cssText="margin-inline:auto;width:fit-content;"
                inType.classList.remove("form-control")
                inType.autocomplete="off";
                inType.id=`types-${item.name}`;
                inType.name=item.name;
                inType.value=item.value ? item.value :"0";
                inType.type="number";
                inType.min="0";
                inType.max="5";
                labType.id=`types-label-${item.name}`;
                labType.textContent=item.name;
                labType.setAttribute("for",inType.id);
            }
            inType.onchange=(e:Event)=>{
                if(e){
                    this.componentTypes=this.componentTypes.map(item=>{
                        const value=(e.currentTarget as HTMLInputElement).checked;
                        const name=(e.currentTarget as HTMLInputElement).name;
                        const nameVal=(e.currentTarget as HTMLInputElement).value;
                        if( value && item.name===name){
                            item.checked=value;
                            item.value=item.name;
                        }else if(!value && item.name===name && item.name !=="#users"){
                            item.checked=value;
                            item.value=undefined;
                        }else if(item.name==="#users" && item.name===name){
                            item.value=nameVal
                            
                        }
                        
                        return item;
                    });
                   
                    Header.cleanUp(column2);
                    this.componentTypes.map((item,index)=>{
                        this.rendComponentTypeResponse({column2,item,index});
                    });
                }
            };
    };



    rendComponentTypeResponse({column2,item,index}:{column2:HTMLElement,item:component_type,index:number}){
        if(index===0){
            const h6=document.createElement("h6");
            h6.className="text-primary text-center text-decoration-underline text-underline-offset-10px mb-2 mt-1";
            h6.textContent="ADDED";
            column2.appendChild(h6);
        }
        if(item.checked && item.name!=="#users"){
            const show=document.createElement("h6");
            show.id=`show-${item.name}`;
            show.textContent=item.name;
            show.className="text-primary text-center";
            column2.appendChild(show);
        }else if(item.name==="#users" && item.value !==""){
            const show=document.createElement("h6");
            show.id=`show-${item.name}`;
            show.textContent=item.name;
            show.className="text-primary text-center";
            column2.appendChild(show);
            const amount=document.createElement("span");
            amount.textContent=item.value ? item.value : "0";
            amount.className="text-primary mx-auto";
            column2.appendChild(amount);
        }
    };


    passedTests({parent,arr}:{parent:HTMLElement,arr:{name:string,value:string|undefined}[]}):{
        passed: boolean;
        msg: string;
        name: string;
        value: string | undefined;
    } | undefined{
        if(!(arr && arr.length>0)) return {name:"",value:"",passed:false,msg:""};
        let notPassed:{name:string,value:string|undefined,passed:boolean,msg:string}= {name:"",value:"",passed:true,msg:"passed"} ;
        const regName:RegExp=/[a-zA-Z\s]{2,}\s[a-zA-Z\s]{2,}/;
        const regEmail:RegExp=/[a-zA-Z0-9.]{2,}@[a-zA-Z0-9.]{3,}\.[a-zA-Z0-9.]{1,3}/;
        const pageNames:RegExp=/[a-zA-Z,\n]{2,}/;
        const pageNum:RegExp=/\d+/;
        const testArr:{name:string,test:RegExp}[]=[
            {name:"name",test:regName},
            {name:"email",test:regEmail},
            {name:"pageNames",test:pageNames},
            {name:"pages",test:pageNum},
        ];
       
      const testPassed=testArr.map(testItem=>{
          const isPassed= arr.map(item=>{
            if(item.name==="name" && item.value===""){
                const msg=`you forgot your full name`;
                notPassed={...item,passed:false,msg};
                return notPassed;
            }else if(item.name==="email" && item.value===""){
                const msg=`you forgot your email`;
                notPassed={...item,passed:false,msg};
                return notPassed;
            }else if(item.name==="pages" && item.value===""){
                const msg=`we need at least 1 # of pages`;
                notPassed={...item,passed:false,msg};
                return notPassed;
            }else if(item.name===testItem.name && item.value){
                    if(!testItem.test.test(item.value)){
                        const msg=`please correct your ${item.name}`;
                        notPassed={...item,passed:false,msg};
                       return notPassed;
                    }
                }else{
                    return {...item,passed:true,msg:"passed"};
                }
            
            });
            return isPassed.filter(notPass=>(notPass?.passed===false))[0]
        });

        const checkNotPassed=testPassed.filter(isPassed=>(isPassed !==undefined)).find(isPassed=>(isPassed.passed===false));
        if(checkNotPassed){
            Misc.message({parent,msg:checkNotPassed.msg,type_:"error",time:1400});
        }else{
            return {...notPassed,passed:true,msg:"passed"}

        }
    };


      showPageQuote({parent,returnQuoteFinal,user}:{parent:HTMLElement,returnQuoteFinal:returnQuoteFinalType,user:userType}):Promise<{button:HTMLButtonElement,quoteContainer:HTMLElement,quoteInnerCont:HTMLElement}>{
        const css_col="margin-inline:auto;display:flex;flex-direction:column;align-items:center;";
        const css_row="margin-inline:auto;display:flex;flex-wrap:warp;align-items:center;";
        const container=document.createElement("section");
        container.style.cssText=css_col + "justify-content:flex-start;position:absolute;inset:0% -10% -100% -10%;padding-inline:1rem;z-index:2;background-color:whitesmoke;border-radius:12px;"
        container.id="showPageQuote-container";
        const innerCont=document.createElement("div");
        innerCont.id="container-innerCont";
        innerCont.style.cssText="width:100%;overflow:scroll;border-radius:12px;";
        container.appendChild(innerCont);
        container.style.position="absolute";
        this.titleQuoteContainer({parent:innerCont,returnQuoteFinal,css_col,css_row,user})
         this.quoteLayout({parent:innerCont,returnQuoteFinal,css_col,css_row});
         const {button}=Misc.simpleButton({anchor:container,bg:"#23ff00",color:"white",type:"button",time:600,text:"print"});
         button.id="print-quote-btn";
        parent.appendChild(container);
        Misc.growIn({anchor:container,scale:0,opacity:0,time:400});
        return Promise.resolve({button,quoteContainer:container,quoteInnerCont:innerCont}) as Promise<{button:HTMLButtonElement,quoteContainer:HTMLElement,quoteInnerCont:HTMLElement}>;
        

    };


     quoteLayout({parent,returnQuoteFinal,css_col,css_row}:{parent:HTMLElement,returnQuoteFinal:returnQuoteFinalType,css_col:string,css_row:string}){
        const container=document.createElement("div");
       
        const less400=window.innerWidth <400;
        container.id=parent.id + "-quoteLayout-container";
        container.style.cssText=css_col + "border-radius:inherit;";
        this.returnCalcHeader({parent:container,less400,css_col,returnQuoteFinal});
        parent.appendChild(container);
    };


    titleQuoteContainer({parent,returnQuoteFinal,css_col,css_row,user}:{parent:HTMLElement,returnQuoteFinal:returnQuoteFinalType,css_col:string,css_row:string,user:userType}){
        const container=document.createElement("div");
        const less900=window.innerWidth <900;
        const less400=window.innerWidth <400;
        container.style.cssText=css_col + "background-color:black;border-radius:6px;color:white;min-height:10vh;width:100%;border-radius:inherit;width:100%;";
        container.style.width="100%";
        const innerContainer=document.createElement("div");
        innerContainer.id="container-innerContainer";
        innerContainer.classList.add("mx-auto");
        innerContainer.style.cssText=css_row + "justify-content:space-between;background-color:black;color:white;width:100%;";
        const img=document.createElement("img");
        img.id=innerContainer.id + "-img";
        img.src=this.quotepic;
        img.style.cssText="border-radius:26%;shape-outside:circle(26%);filter:drop-shadow(0 0 0.75rem white);";
        img.style.width=less900 ? ( less400 ? "300px":"350px"):"375px";
        innerContainer.appendChild(img);
        const showTotal=document.createElement("div");
        showTotal.id=innerContainer.id + "-showTotal";
        showTotal.style.cssText=css_col + "width:fit-content;";
        const nameEmail=document.createElement("div");
        nameEmail.style.cssText=css_row + "justify-content:space-between;align-items:center;gap:1rem;";
        const name=document.createElement("h6");
        name.className="text-primary mb-1";
        name.textContent=user.name ? user.name : " user name";
        const email=document.createElement("small");
        email.className="text-primary mb-1";
        email.textContent=user.email;
        nameEmail.appendChild(name);
        nameEmail.appendChild(email);
        const showTitle=document.createElement("h6");
        showTitle.textContent="QUOTE";
        showTitle.className="text-center text-light lean display-6";
        showTotal.appendChild(nameEmail);
        showTotal.appendChild(showTitle);
        const totalAmount=document.createElement("p");
        totalAmount.id="showTotal-amount";
        totalAmount.style.cssText="margin-inline;margin-block:1rem;";
        totalAmount.textContent=`Total:$${returnQuoteFinal.total}.00 CAD`;
        const totalHours=document.createElement("p");
        totalHours.id="showTotal-hours";
        totalHours.style.cssText="margin-inline;margin-block:1rem;";
        totalHours.textContent=`Hours:${returnQuoteFinal.totalHrs} Hrs`;
        showTotal.appendChild(totalAmount);
        showTotal.appendChild(totalHours);
        innerContainer.appendChild(showTotal);
        container.appendChild(innerContainer);
        parent.appendChild(container);
    };


    returnCalcHeader({parent,less400,css_col,returnQuoteFinal}:{parent:HTMLElement,less400:boolean,css_col:string,returnQuoteFinal:returnQuoteFinalType}):void{
        const container=document.createElement("div");
        container.id="returnCalcRow-container";
        container.style.cssText=css_col + "width:100%;";
        returnQuoteFinal.returnCalcList.map((item,index)=>{
            if(item.total_time >0){
                this.tableHeaderTotalHours({parent:container,item,less400,css_col,index});
            }
        });
        parent.appendChild(container);
        
    };


    tableHeaderTotalHours({parent,item,less400,css_col,index}:{parent:HTMLElement,item:returnCalcType,less400:boolean,css_col:string,index:number}){
        const sectionContainer=document.createElement("section");
                sectionContainer.id="container-sectionContainer";
                sectionContainer.style.cssText=css_col + "width:100%;margin-block:1rem;box-shadow:1px 1px 6px 1px lightblue;background-color:#d0ede5;padding-inline:1rem;";
                const retCalcRow=document.createElement("div");
                retCalcRow.id="container-retCalcTypeRow";
                retCalcRow.className="row";
                retCalcRow.style.cssText="width:100%;justify-content:space-between;box-shadow:1px 1px 6px 1px #09b4ec;margin-block:1rem;border-radius:6px;background-color:white;";
                const col1=document.createElement("div");
                col1.id="container-col1";
                col1.className=less400 ? "col-md-12":"col-md-3";
                col1.style.cssText=css_col;
                col1.style.flex=less400 ? "1 0 100%": " 1 0 23%";
                retCalcRow.appendChild(col1);
                const col2=document.createElement("div");
                col2.id="container-col2";
                col2.className=less400 ? "col-md-12":"col-md-6";
                col2.style.cssText=css_col;
                col2.style.flex=less400 ? "1 0 100%": " 1 0 48%";
                const h6=document.createElement("h6");
                h6.id="col2-h6";
                h6.className="text-center text-primary lean display-6";
                h6.textContent=item.type;
                col2.appendChild(h6);
                retCalcRow.appendChild(col2);
                const col3=document.createElement("div");
                col2.id="container-col3";
                col3.className=less400 ? "col-md-12":"col-md-3";
                col3.style.cssText=css_col;
                col3.style.flex=less400 ? "1 0 100%": " 1 0 23%";
                retCalcRow.appendChild(col3);
                const totalAmount=document.createElement("p");
                totalAmount.id=col3.id +"-amount";
                totalAmount.style.cssText="margin-inline;margin-block:1rem;";
                totalAmount.textContent=`section amount: $${item.total_cost}.00 CAD`;
                const totalHours=document.createElement("p");
                totalHours.id= col1.id + "-hours";
                totalHours.style.cssText="margin-inline;margin-block:1rem;";
                totalHours.textContent=`${item.total_time} Hrs`;
                col1.appendChild(totalHours);
                col3.appendChild(totalAmount);
                sectionContainer.appendChild(retCalcRow);
                parent.appendChild(sectionContainer);
                 //TABLE
                 this.tableQuoteCalcItems({parent:sectionContainer,calcItems:item.list,index});
                 //TABLE
    };


    tableQuoteCalcItems({parent,calcItems,index}:{parent:HTMLElement,calcItems:quoteCalcItemType[],index:number}){
        //TABLE
        const table=document.createElement('table');
        table.id="quoteCalcItems-table-" + index;
        table.style.cssText="width:100%;"
        calcItems.map((item,index)=>{
            const thead=document.createElement('thead');
            thead.id=table.id + "-thead";
            table.appendChild(thead);
            const trh=document.createElement('tr');
            trh.id="thread-tr";
            thead.appendChild(trh);
            const tbody=document.createElement('tbody');
            const tr1=document.createElement('tr');
            tbody.appendChild(tr1);
            this.genRow({parent:tr1,parentH:trh,item})
            table.appendChild(tbody);
        });
        parent.appendChild(table);

    };


    genRow({parent,parentH,item}:{parent:HTMLElement,parentH:HTMLElement,item:quoteCalcItemType}){
        const items=Object.entries(item);
      
        for(const [key,value] of items){
            if(key==="name" && value){
                const th=document.createElement('th');
                th.setAttribute("scope","row");
                th.textContent=key;
                parentH.appendChild(th);
                const td=document.createElement('td');
                td.textContent=`${value}`;
                parent.appendChild(td);
            }else if(key==="desc"){
                const th=document.createElement('th');
                th.setAttribute("scope","row");
                th.textContent="description";
                parentH.appendChild(th);
                const td=document.createElement('td');
                const isPages=value && (typeof value ==="string") && value.includes(":") ? value.split(":"):null;
                if(isPages){
                    const newValue=`<span>${isPages[0]}</span><span class='text-danger'> : ${isPages[1]}</span>`
                    td.innerHTML=`${newValue}`;
                }else{
                    td.textContent=`${value || "description absent"}`;
                }
                parent.appendChild(td);
            }else if(key==="time" || key==="qty"){
                const th=document.createElement('th');
                th.setAttribute("scope","row");
                th.textContent="Hr";
                parentH.appendChild(th);
                const td=document.createElement('td');
                td.textContent=`${value} hrs`;
                parent.appendChild(td);
            }else if(key==="dollar"){
                const th=document.createElement('th');
                th.setAttribute("scope","row");
                th.textContent="$";
                parentH.appendChild(th);
                const td=document.createElement('td');
                td.textContent=`$ ${value}.00`;
                parent.appendChild(td);
            }

        }
    };

}
export default Quote;
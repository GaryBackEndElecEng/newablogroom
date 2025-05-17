
import { FaDollarSign } from "react-icons/fa";
import Misc from "../common/misc/misc";
import { FaCreate } from "../common/ReactIcons";
import Service from "../common/services";
import Header from "../editor/header";
import { quoteCalcItemType, userType } from "../editor/Types";
import Nav from "../nav/headerNav";
import styles from "./admin.module.css";
import { FaCircleDollarToSlot } from "react-icons/fa6";


class ModQuote {
    _quotes:quoteCalcItemType[];
    public mainQuoteCont:string;
    public btnSaveId:string;
    public isPageContId:string;
    public isBasicContId:string;
    public amountContainerId:string;
    constructor(private _service:Service,private _user:userType){
        this._quotes=[];
        this.mainQuoteCont="main-quote-cont";
        this.btnSaveId="btn-save-quote";
        this.amountContainerId="totale-amount-container";
        this.isPageContId="displayPage-cont";
        this.isBasicContId="displayBasic-cont";
    };

    get user(){
        return this._user;
    };
    set user(user:userType){
        this._user=user;
    }

    get quotes(){
        return this._quotes
    };
    set quotes(quotes:quoteCalcItemType[]){
        this._quotes=quotes;
    };


   async main({parent}:{parent:HTMLElement}){
    Header.cleanUpByID(parent,this.mainQuoteCont);
    Header.cleanUpByID(parent,this.btnSaveId);
    const mainQuoteCont=document.createElement("div");
    mainQuoteCont.id=this.mainQuoteCont;
    mainQuoteCont.className=styles.mainQuoteContRow;
    parent.appendChild(mainQuoteCont);

        const check=!!(this.quotes?.length && this.quotes?.length>0)
        if(!check){
            const {id,email}=this.user;
            const quotes= await this._service.adminGetQuotes({userId:id,email});
            if(quotes){
                this.quotes=quotes;
                
            }
        };
       this.quotes=this.displayQuote({parent:mainQuoteCont,quotes:this.quotes});
       this.totalAmount({parent,quotes:this.quotes});
        this.displayBasicOnly({parent,quotes:this.quotes});
        this.displayPageOnly({parent,quotes:this.quotes});

        const {button}=Misc.simpleButton({anchor:parent,type:"button",time:400,bg:"black",color:"white",text:"save"});
        button.id=this.btnSaveId;
        button.onclick=async(e:MouseEvent)=>{
            if(!e) return;
            const quotes= await this._service.adminSaveQuotes({userId:this.user.id,email:this.user.email,quotes:this.quotes});
            if(quotes){
                this.quotes=quotes;
                 this.displayQuote({parent:mainQuoteCont,quotes:this.quotes});
                 this.totalAmount({parent,quotes:this.quotes});
                 this.displayBasicOnly({parent,quotes:this.quotes});
                 this.displayPageOnly({parent,quotes:this.quotes});
                 Misc.message({parent:mainQuoteCont,time:800,msg:"saved",type_:"success"});
            }
        };

    };


    displayQuote({parent,quotes}:{parent:HTMLElement,quotes:quoteCalcItemType[]}):quoteCalcItemType[]{
       
        quotes= quotes.toSorted((a,b)=>{if(a.type < b.type) return -1; return 1;}).map((quote,index)=>{
            if(quote){
                const rand=Math.floor(Math.random()*1000);
                const {name,type}=quote;
                const row=document.createElement("div");
                row.id="quote-row";
                row.className=styles.quoteContRow;
                const quoteCont=document.createElement("div");
                quoteCont.id="quoteCont-" + name;
                quoteCont.className=styles.quoteCont;
                const _name=document.createElement("h6");
                _name.className="text-center text-primary mb-2 lean display-6";
                _name.textContent=name;
                const subName=document.createElement("p");
                subName.className="text-primary text-center";
                subName.textContent=`type: ${type}`;
                quoteCont.appendChild(_name);
                quoteCont.appendChild(subName);
                this.typeColor({parent:row,type,ind:index});
                parent.appendChild(row);

                for(const [key,value] of Object.entries(quote)){
                    const check=["desc","time","qty","dollar"].includes(key);
                    if(check ){
                        const {input,label,formGrp}=Nav.inputComponent(quoteCont);
                        formGrp.classList.add("text-center");
                        if(key!=="desc"){
                            formGrp.classList.remove("form-group");
                        }
                        input.id=`input-${key}-${rand}`;
                        input.name=key;
                        if(key==="desc") {input.type="text";formGrp.style.width="100%";input.style.order="0"};
                        if(key==="time") {input.type="number";input.classList.remove("form-control");input.style.cssText="";formGrp.style.width="50px";input.style.order="1"};
                        if(key==="qty") {input.type="number";input.classList.remove("form-control");input.style.cssText="";formGrp.style.width="50px";input.style.order="2"};
                        if(key==="dollar"){ input.type="number";input.classList.remove("form-control");input.style.cssText="";formGrp.style.width="50px";input.style.order="3"};
                        label.setAttribute("for",input.id);
                        label.textContent=key;
                        input.value=String(value);
                        input.onchange=(e:Event)=>{
                            if(!e) return;
                            const value=(e.currentTarget as HTMLInputElement).value;
                            if(key==="desc"){
                                quote.desc=value
                            }else if(key==="time"){
                                quote.time=Number(value);
                            }else if(key==="qty"){
                                quote.qty=Number(value);
                            }else if(key==="dollar"){
                                quote.dollar=Number(value)
                            }
                        };

                    }else if(key==="isPage" || key==="basic"){

                        let innerPageBasicRow=quoteCont.querySelector("div#innerRow") as HTMLElement;
                        if(!innerPageBasicRow){
                            innerPageBasicRow=document.createElement("div");
                            innerPageBasicRow.id="innerRow";
                            innerPageBasicRow.className=styles.innerPageBasicRow;
                            quoteCont.appendChild(innerPageBasicRow);
                        };
                        const {input,label,formGrp}=Nav.inputComponent(innerPageBasicRow);
                        formGrp.classList.remove("form-group");
                        input.classList.remove("form-control");
                        input.id=`input-${key}-${rand}`;
                        if(key==="isPage"){input.style.order="4"}else{input.style.order="5"} ;
                        label.textContent=key;
                        label.setAttribute("for",input.id);
                        input.placeholder="";
                        input.type="checkbox";
                        input.checked=Boolean(value);
                        input.onchange=(e:Event)=>{
                            if(!e) return;
                            const value=(e.currentTarget as HTMLInputElement).value;
                            if(key==="isPage"){
                                quote.isPage=Boolean(value);
                            }else{
                                quote.basic=Boolean(value);
                            }
                        };
                        

                    };
                }
                this.itemCalc({parent:quoteCont,quote});
                row.appendChild(quoteCont)
            };
            return quote;
        });
        return quotes;
    };


    displayBasicOnly({parent,quotes}:{parent:HTMLElement,quotes:quoteCalcItemType[]}){
        Header.cleanUpByID(parent,this.isBasicContId);
        const basics=quotes.filter(kv=>(kv.basic));
        const container=document.createElement("div");
        container.id=this.isBasicContId;
        container.className=styles.displayBasicOnly;
        const total=basics.reduce((a,b)=>(a + b.time *b.qty * b.dollar),0);
        const _total=document.createElement("h6");
        _total.className="text-primary text-center lean display-6";
        _total.textContent="basic Total $" +String(total);
        const row=document.createElement("div");
        row.id="displayBasic-row";
        row.className=styles.displayBasicRow;
        basics.map((quote,index)=>{
            if(quote){
                const innerRow=document.createElement("div");
                for(const [key,value] of Object.entries(quote)){
                    const check=["desc","dollar"].includes(key);
                    if(check){
                        const span=document.createElement("span");
                        span.style.color="red";
                        span.textContent=`${key}: `;
                        const spanValue=document.createElement("span");
                        if(key==="dollar"){
                            spanValue.textContent="$ " +String(value);
                        }else if(key==="desc"){
                            spanValue.textContent=`${(value as string).split("").slice(0,25).join("")}...`;
                            spanValue.style.textWrap="wrap";
                        }else{
                            spanValue.textContent=String(value);
                        }
                        innerRow.appendChild(span);
                        innerRow.appendChild(spanValue);
                    }
                };
                row.appendChild(innerRow);

            }
            container.appendChild(row);
        });
        container.appendChild(_total);
        parent.appendChild(container);
    };

    displayPageOnly({parent,quotes}:{parent:HTMLElement,quotes:quoteCalcItemType[]}){
        Header.cleanUpByID(parent,this.isPageContId);
        const isPages=quotes.filter(kv=>(kv.isPage));
        const container=document.createElement("div");
        container.id=this.isPageContId;
        container.className=styles.displayBasicOnly;
        const total=isPages.reduce((a,b)=>(a + b.time *b.qty * b.dollar),0);
        const _total=document.createElement("h6");
        _total.className="text-primary text-center lean display-6";
        _total.textContent="total page $" +String(total);
        const row=document.createElement("div");
        row.id="displayBasic-row";
        row.className=styles.displayBasicRow;
        isPages.map((quote,index)=>{
            if(quote){
                const innerRow=document.createElement("div");
                for(const [key,value] of Object.entries(quote)){
                    const check=["desc","dollar"].includes(key);
                    innerRow.id=`${index}-innerRow`;
                    if(check){
                        const span=document.createElement("span");
                        span.style.color="red";
                        span.textContent=`${key}: `;
                        const spanValue=document.createElement("span");
                        if(key==="dollar"){
                            spanValue.textContent="$ " +String(value);
                        }else if(key==="desc"){
                            spanValue.textContent=`${(value as string).split("").slice(0,25).join("")}...`;
                            spanValue.style.textWrap="wrap";
                        }else{
                            spanValue.textContent=String(value);
                        }
                        innerRow.appendChild(span);
                        innerRow.appendChild(spanValue);
                    }
                };
                row.appendChild(innerRow);

            };
        });
        container.appendChild(row);
        container.appendChild(_total);
        parent.appendChild(container);
    };

    typeColor({parent,type,ind}:{parent:HTMLElement,type:string,ind:number}){
        const nameColor:{type:string,color:string}={type,color:`hsl(180/${(ind+1)*10}deg ${2*ind}% 0% /${5*ind}%)`};
        const color=nameColor.color;
         parent.style.border=`1px solid ${color}`;
    };

    itemCalc({parent,quote}:{parent:HTMLElement,quote:quoteCalcItemType}){
        const {time,qty,dollar}=quote;
        const amount=time * qty * dollar;
        const base=document.createElement("div");
        base.className=styles.itemCalcBase;
        const xDiv=document.createElement("span");
        xDiv.style.cssText="background-color:white;color:green;";
        xDiv.textContent="total: $"
        const span=document.createElement("span");
        span.textContent=String(amount);
        base.appendChild(xDiv);
        base.appendChild(span);
        parent.appendChild(base);
    };

    totalAmount({parent,quotes}:{parent:HTMLElement,quotes:quoteCalcItemType[]}){
        const total=quotes.reduce((a,b)=>(a + (b.time * b.qty * b.dollar)),0);
        Header.cleanUpByID(parent,this.amountContainerId);
        const container=document.createElement("div");
        container.className=styles.containerTotalAmount;
        container.id=this.amountContainerId;
        //amount
        const totalAmount=document.createElement("div");
        totalAmount.id="total-amount";
        totalAmount.className=styles.totalAmount;
        const span=document.createElement("span");
        span.textContent="total amount/page";
        span.className="text-primary lean display-6";
        const span2=document.createElement("span");
        span2.className="lean display-6";
        span2.id="span2";
        span2.textContent="$ " + String(total);
        totalAmount.appendChild(span);
        totalAmount.appendChild(span2);
        container.appendChild(totalAmount);
        //amount
        //tax
        const tax=document.createElement("div");
        tax.className=styles.tax;
        const span3=document.createElement("span");
        span3.className="text-primary lean display-6";
        span3.textContent="tax/page: ";
        const span4=document.createElement("span");
        span4.className="text-primary lean display-6";
        const _tax=Math.floor(total*0.15 + total*0.13)
        span4.textContent="$" +String(_tax);
        tax.appendChild(span3);
        tax.appendChild(span4);
        container.appendChild(tax);
        //tax
        //total
        const _total=document.createElement("div");
        _total.className=styles.total;
        const span5=document.createElement("span");
        span5.className="text-primary lean display-6";
        span5.textContent="total/page: ";
        const span6=document.createElement("span");
        span6.className="text-primary lean display-6";
        span6.textContent="$" +String(total + _tax);
        _total.appendChild(span5);
        _total.appendChild(span6);
        container.appendChild(_total);
        //total
        parent.appendChild(container);

    };
};
export default ModQuote;

import { contactType, letterType, mainIntroLetterType, paragraphType, signatureType } from "../resume/refTypes";
import styles from "./letter.module.css"
import Resume from "../resume/resume";


class LetterView{
private _mainIntroLetter:mainIntroLetterType|null;
private _letter:letterType;
private _paragraph:paragraphType;
private _paragraphs:paragraphType[];
public contact:contactType;
public signed:signatureType;


    constructor(){
        this._mainIntroLetter={} as mainIntroLetterType;
        this._letter={} as letterType;
        this._paragraph={
            id:0,
            para:"You can apply this method for any function and or method. What's powerful about this approach is that you don't need to worry about executing follow-up function or organize timings to when they should be executed. This increases compact efficiencies to when coding. Additionally, this method is much easier than using React methods on function imports, when programming with TypeScript. This method is similar to React.node, children method for parent layouts"
        }
        this._paragraphs=[this._paragraph];

        this.signed={
            name:"",
            cell:"",
            email:""
        };
        
        this.contact={
            name:"Gary Wallace",
            address:"21 a Sain-Jean",
            PO:"J6J-2A6",
            city:"chateauguay",
            cell:"123-456-7892",
            email1:"myEmail@gmail.com",
            email2:"myEmail2@gmail.com"
        }
        this._letter={
            filename:"start",
            to:"",
            position:"",
            contact:this.contact,
            summary:"Executed timings are critical and hard to organize these injected methods during asynchronous executable events. To better organize on methods, as well as effectively transfer data from one getter/setter, housed within a class to another getter/setter in another class is to use imported functions. This method can save headaches and pain , when synchronizing data and method integration. You can apply this method for any function and or method. What's powerful about this approach is that you don't need to worry about executing follow-up function or organize timings to when they should be executed. This increases compact efficiencies to when coding. Additionally, this method is much easier than using React methods on function imports, when programming with TypeScript. This method is similar to React.node, children method for parent layouts",
            paragraphs:[this._paragraph],
            conclusion:"",
            signature:this.signed
        }
        this._mainIntroLetter={
            id:0,
            name:"start",
            user_id:"",
            letter:this._letter
        }
    };


    ///-----------------GETTERS SETTERS----------------------//
    get mainIntroLeter(){
        return this._mainIntroLetter;
    };
    set mainIntroLetter(mainIntroLetter:mainIntroLetterType){
        this._mainIntroLetter=mainIntroLetter;
    };
    get letter(){
        return this._letter;
    };
    set letter(letter:letterType){
        this._letter=letter;
    };
    ///-----------------GETTERS SETTERS----------------------//
    //---------------//-GETS mainletter FILE FROM THE URL\\------------///
    main({parent,mainletter,showToPrint}:{parent:HTMLElement,mainletter:mainIntroLetterType|null,showToPrint:boolean}){
        const mainLetter = document.createElement('div');
        mainLetter.id="main-letter-cont";
        mainLetter.className=styles.mainLetterCont;
        parent.appendChild(mainLetter);
        if(mainletter){
            this.letter=mainletter.letter;
            this.showLetter({parent,mainletter,showToPrint});
        }else{
            Resume.message({parent,msg:"SORRY FILE WAS NOT FOUND",type:"warning",time:200});
        }

    };

    showLetter({parent,mainletter,showToPrint}:{parent:HTMLElement,mainletter:mainIntroLetterType,showToPrint:boolean}){
        const less400=window.innerWidth <400;
        Resume.cleanUpById({parent,id:"main-show-letter"});
        const mainShowLetter=document.createElement("section");
        mainShowLetter.id="main-show-letter";
        mainShowLetter.className=styles.mainShowLetter;
        parent.appendChild(mainShowLetter);
        const {id,name}=mainletter;
        if(!showToPrint) this.filename({parent:mainShowLetter,id,name,less400});
       this.letterBody({parent:mainShowLetter,mainletter,less400});
       if(showToPrint){

           const btnRow=document.createElement("div");
           btnRow.id="btn-row";
           btnRow.className=styles.btnRow;
           btnRow.style.order="20";
           mainShowLetter.appendChild(btnRow);
            const {button:back}=Resume.simpleButton({anchor:btnRow,bg:"black",color:"white",type:"button",time:400,text:"go back"});
            back.id="go-back";
            const {button}=Resume.simpleButton({anchor:btnRow,bg:"black",color:"white",type:"button",time:400,text:"print"});
            button.style.alignSelf="center";
            button.style.marginBlock="2rem";
            button.style.justifySelf="center";
            button.style.order="8";
            button.onclick=(e:MouseEvent)=>{
                if(e){
                    const goback=btnRow.querySelector("button#go-back") as HTMLElement;
                    goback.hidden=true;
                    button.hidden=true;
                    parent.style.backgroundColor="white";
                    const getNav=document.querySelector("header#navHeader") as HTMLElement;
                    const getFooter=document.querySelector("section#footerInjector") as HTMLElement;
                    if(!getNav || !getFooter) return;
                    getNav.hidden=true;
                    getFooter.hidden=true;
                    window.print();
                   
                    const newUrl=new URL("/",location.origin);
                    location.replace(newUrl);
                }
            }
            back.onclick=(e:MouseEvent)=>{
                if(e){
                    history.go(-1)
                };
            };

       };

    };

    letterBody({parent,mainletter,less400}:{parent:HTMLElement,mainletter:mainIntroLetterType,less400:boolean}){
        const {letter,res_name_id:filename}=mainletter;
        const {contact,summary,conclusion,paragraphs,to,signature,position}=letter
        this.contactHeader({parent,contact,position,filename,order:0,less400});
        this.lineDivider({parent,width:47,color:"blue",height:"3px",order:1,position:"flex-start"});
        this.toWhom({parent,to,order:2,less400});
        this.summary({parent,summary,order:3,less400});
        this.paraBody({parent,paragraphs,order:4,less400});
        this.conclusion({parent,conclusion,order:5,less400});
        this.signature({parent,signature,order:6,less400});
    }

    contactHeader({parent,contact,position,filename,order,less400}:{parent:HTMLElement,contact:contactType,filename:string|undefined,order:number,less400:boolean,position:string}){
        const contactHeader=document.createElement("div");
        contactHeader.id="contact-header";
        contactHeader.className=styles.contactHeader;
        contactHeader.style.width="100%";
        contactHeader.style.order=String(order);
        parent.appendChild(contactHeader);
        const row=document.createElement("div");
        row.id='contact-header-row';
        row.className=styles.contactRow;
        row.style.marginBlock="2rem";
        contactHeader.appendChild(row);
        const leftSide=document.createElement("div");
        leftSide.id="contact-row-leftside";
        leftSide.className=styles.contactHeaderColLeft;
        leftSide.style.order=less400 ? "1":"0";
        row.appendChild(leftSide);
        const rightSide=document.createElement("div");
        rightSide.id="contact-row-rightside";
        rightSide.className=styles.contactHeaderColRight;
       
        row.appendChild(rightSide);

        //LEFTSIDE
        for(const [key,value] of Object.entries(contact)){
            if(key==="name"){
                const name=document.createElement("h6");
                name.className="text-primary lean display-6";
                name.id="full-name";
                name.textContent=value;
                name.style.order="0";
                name.style.marginBottom="0.75rem";
                leftSide.appendChild(name);
            }else if(key==="address"){
                const address=document.createElement("p");
                address.id="address";
                address.textContent=value;
                address.style.order="1";
                address.style.lineHeight="0.5rem";
                leftSide.appendChild(address);
            }else if(key==="city"){
                const city=document.createElement("p");
                city.id="city-name";
                city.textContent=value;
                city.style.order="2";
                city.style.lineHeight="0.5rem";
                leftSide.appendChild(city);
            }else if(key==="PO"){
                const PO=document.createElement("p");
                PO.id="PO";
                PO.textContent=value;
                PO.style.order="3";
                PO.style.lineHeight="0.5rem";
                leftSide.appendChild(PO);
            }else if(key==="cell"){
                const cell=document.createElement("p");
                cell.id="cell";
                cell.textContent=value;
                cell.style.order="4";
                cell.style.lineHeight="0.5rem";
                leftSide.appendChild(cell);
            }else{
                const email=document.createElement("p");
                email.id="email";
                email.textContent=value;
                email.style.order="5";
                email.style.lineHeight="0.5rem";
                leftSide.appendChild(email);
            }
        };
        //LEFTSIDE

        //RIGHT SIDE

        //DATE
        const date=new Date();
        const formatdate=date.toLocaleDateString();
        const date_=document.createElement("h6");
        date_.className="text-primary";
        date_.style.cssText="text-spacing:0.25rem";
        date_.style.order="0";
        date_.textContent=formatdate;
        rightSide.appendChild(date_);

        //POSITION CONT

        const positioncont=document.createElement("div");
        positioncont.id="position-cont";
        positioncont.className=styles.css_row_normal;
        positioncont.style.alignItems=less400 ? "flex-start":"center";
        positioncont.style.order="1";
        positioncont.style.alignSelf="flex-start";
        positioncont.style.order=less400 ? "0":"1";
        positioncont.style.flex=less400 ? "column":"row";
        positioncont.style.width=less400 ? "100%":"auto";
        const nameTitle=document.createElement("h6");
        nameTitle.textContent="position:";
        const position_=document.createElement("h6");
        position_.textContent=position;
        position_.className="text-primary";
        position_.style.cssText="text-transform:capitalize;font-size:110%;";
        positioncont.appendChild(nameTitle);
        positioncont.appendChild(position_);
        rightSide.appendChild(positioncont);

        //POSITION CONT
        //ANCHOR PATH
        if(filename){

            const anchor=document.createElement("a");
            const newUrl=new URL(`/showResume/${filename}`,window.location.origin)
            anchor.href=newUrl.href
            anchor.textContent="resume + reference";
            anchor.style.order="2"
            rightSide.appendChild(anchor);
        }
        //ANCHOR PATH

    };


    summary({parent,summary,order,less400}:{parent:HTMLElement,summary:string,order:number,less400:boolean}){
        const summaryCont=document.createElement("div");
        summaryCont.id="summary-cont";
        summaryCont.className=styles.summaryCont;
        summaryCont.style.width="100%";
        summaryCont.style.order=String(order);
        const para=document.createElement("p");
        para.style.cssText="margin-inline:auto;text-indent:2rem;text-wrap:pretty;";
        para.style.paddingInline=less400 ? "0.5rem":"1rem";
        para.style.letterSpacing="0.15rem";
        para.textContent=summary;
        summaryCont.appendChild(para);
        parent.appendChild(summaryCont);
    };

    toWhom({parent,to,order,less400}:{parent:HTMLElement,to:string,order:number,less400:boolean}){
        const toCont=document.createElement("div");
        toCont.id="to-cont";
        toCont.style.cssText="display:flex;flex-direction:column;align-items:flex-start;justify-content:center;"
        toCont.style.alignItems="flex-start";
        toCont.style.width="100%";
        toCont.style.order=String(order);
        const para=document.createElement("p");
        para.style.cssText="margin-inline:0;";
        para.style.paddingInline=less400 ? "0.5rem":"1rem";
        para.style.letterSpacing="0.15rem";
        para.style.textTransform="capitalize";
        para.style.fontSize="110%";
        para.innerHTML=`${to}`;
        toCont.appendChild(para);
        parent.appendChild(toCont);
    };


    paraBody({parent,paragraphs,order,less400}:{parent:HTMLElement,paragraphs:paragraphType[],order:number,less400:boolean}){
        const paragraphCont=document.createElement("div");
        paragraphCont.id="paragraph-cont";
        paragraphCont.className=styles.paragraphCont;
        paragraphCont.style.width="100%";
        paragraphCont.style.gap="1rem";
        paragraphCont.style.order=String(order);
        parent.appendChild(paragraphCont);
        console.log("paragrph:",paragraphs)
        paragraphs.map((text,index)=>{
            if(text){
                const para=document.createElement("p");
                para.id="para-content-"+String(index);
                para.style.cssText="align-self:start;justify-self:start;text-indent:2rem;";
                para.style.paddingInline=less400 ? "0.5rem":"1rem";
                para.style.letterSpacing="0.15rem";
                para.textContent=text.para;
                paragraphCont.appendChild(para);
            }
        });

    };


    conclusion({parent,conclusion,order,less400}:{parent:HTMLElement,conclusion:string,order:number,less400:boolean}){
        const conclusionCont=document.createElement("div");
        conclusionCont.id="conclusion-cont";
        conclusionCont.className=styles.summaryCont;
        conclusionCont.style.width="100%";
        conclusionCont.style.order=String(order);
        const para=document.createElement("p");
        para.style.cssText="margin-inline:auto;text-indent:2rem;";
        para.style.paddingInline=less400 ? "0.5rem":"1rem";
        para.style.letterSpacing="0.15rem";
        para.textContent=conclusion;
        conclusionCont.appendChild(para);
        parent.appendChild(conclusionCont);
    };

    filename({parent,id,name,less400}:{parent:HTMLElement,id:number,name:string,less400:boolean}){
        const filenameCont=document.createElement("div");
        filenameCont.id="filenameCont-id";
        filenameCont.className=styles.filenameCont;
        filenameCont.style.transform=less400 ? "translate(2px,0px) scale(0.7)":"translate(15px,0px) scale(0.9)";
        parent.style.position="relative";
        const id_=document.createElement("span");
        id_.textContent=String(id);
        const name_=document.createElement("span");
        name_.textContent=name;
        filenameCont.appendChild(id_);
        filenameCont.appendChild(name_);
        parent.appendChild(filenameCont);
    };


    signature({parent,signature,order,less400}:{parent:HTMLElement,signature:signatureType,order:number,less400:boolean}){
      
        const signedCont=document.createElement("div");
        signedCont.id="signed-cont";
        signedCont.className=styles.signature;
        signedCont.style.width="100%";
        signedCont.style.order=String(order);
        parent.appendChild(signedCont);
        const signInner=document.createElement("div");
        signInner.id="signed-inner";
        signInner.className=styles.css_col_normal;
        signInner.style.alignItems="flex-start";
        signInner.style.alignSelf="flex-start";
        signInner.style.marginBlock="0px";
        signInner.style.width="100%";
        signedCont.appendChild(signInner);

        //LEFTSIDE
        for(const [key,value] of Object.entries(signature)){
            if(key==="name"){
                const name=document.createElement("h6");
                name.className="text-primary lean display-6";
                name.style.fontSize=less400 ? "130%":"140%";
                name.id="full-name";
                name.textContent=value;
                name.style.order="0";
                signInner.appendChild(name);
            }else if(key==="cell"){
                const cell=document.createElement("p");
                cell.id="cell";
                cell.textContent=value;
                cell.style.order="4";
                cell.style.lineHeight="0.5rem";
                signInner.appendChild(cell);
            }else{
                const email=document.createElement("p");
                email.id="email";
                email.textContent=value;
                email.style.order="5";
                email.style.lineHeight="0.5rem";
                signInner.appendChild(email);
            }
        };
        

    };

    lineDivider({parent,width,color,height,order,position}:{
        parent:HTMLElement,
        width:number
        ,color:string,
        height:string,
        order:number
        position:"flex-start"|"center"|"flex-end"
    }){
        const line=document.createElement("div");
        line.style.cssText=`height:${height};background-color:${color};width:${width}%;border-radius:20px;`;
        line.style.marginInline="0";
        line.id="divider";
        line.style.marginTop="0rem";
        line.style.marginBottom="3rem";
        line.style.order=String(order);
        line.style.alignSelf=position;
        parent.appendChild(line);
    }
};
export default LetterView;
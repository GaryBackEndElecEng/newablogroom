import EditResume from "../resume/editResume";
import {  letterType, } from "../resume/refTypes";
import Resume from "../resume/resume";
import AddRemoveLet from "./addRemoveLet";
import styles from "./letter.module.css";


class FormLetComponents{
   
    constructor(public addRemoveLet:AddRemoveLet){

    }

formPara({parent,letter,key,order,less400}:{parent:HTMLElement,letter:letterType,key:string,order:number,less400:boolean}):letterType{
    parent.style.position="relative";
    const len=letter?.paragraphs?.length;
    const paraCont=document.createElement("div");
    paraCont.id="form-para-cont";
    paraCont.className=styles.formParaCont;
    paraCont.style.order=String(order);
    paraCont.style.position="relative";
    parent.appendChild(paraCont);
    this.addRemoveLet.addParagaph({
        parent:paraCont,
        letter,
        index:order,
        key,
        less400,
        func:(letter)=>{
            Resume.cleanUpById({parent,id:"form-para-cont"});
            this.formPara({parent,letter,key,order,less400});
        }
    });
    
    if(len>0){
        const placeLen=AddRemoveLet.paraPlaceHolder?.length||0;
        letter.paragraphs=letter.paragraphs.map((paragraph,index)=>{
            if(paragraph){
                const {para}=paragraph;
                const {textarea:textInput,label,formGrp}=EditResume.textareaComponent(paraCont);
                formGrp.className=styles.paraFormGroup;
                formGrp.classList.add("form-group");
                formGrp.style.width="100%";
                formGrp.style.order=String(index);
                textInput.id=`${key}-achievement-textarea`;
                textInput.name="work-"+ key + "-" + String(index);
                if(index + 1 <=placeLen){
                    textInput.placeholder=AddRemoveLet.paraPlaceHolder[index]||"";
                }
                textInput.value=para as string;
                textInput.style.width="100%";
                label.setAttribute("for",textInput.id);
                label.textContent=key;
                textInput.rows=6;
                this.addRemoveLet.removeParagaph({
                    target:formGrp,
                    letter,
                    index:order,
                    paragraph,
                    key,
                    less400,
                    func:(letter)=>{
                        Resume.cleanUpById({parent,id:"form-para-cont"});
                        this.formPara({parent,letter,key,order,less400});
                    }
                });
                textInput.onchange=(e:Event)=>{
                    if(!e) return;
                    const value=(e.currentTarget as HTMLInputElement).value;
                    paragraph.para=value;
                };
            }
            return paragraph;
        });
    };
    return letter;
};



formContact({parent,letter,key,order,less400}:{parent:HTMLElement,letter:letterType,key:string,order:number,less400:boolean}):letterType{
        parent.style.position="relative";
        const contactCont=document.createElement("div");
        contactCont.id="particular-cont";
        contactCont.className=styles.css_col;
        contactCont.style.marginBlock="1.5rem";
        contactCont.style.order=String(order);
        const name=document.createElement("h6");
        name.textContent=key;
        name.className="text-primary text-center mb-2 lean display-6";
        name.style.fontSize=less400 ? "150%":"180%";
        contactCont.appendChild(name);
        parent.appendChild(contactCont);
        const row=document.createElement("div");
        row.className=styles.contactRow;
        contactCont.appendChild(row);
       const contact=letter.contact;
       const signed=letter.signature;
        for(const [contKey,value] of Object.entries(contact)){
            if(key){
                const {input,label,formGrp}=EditResume.inputComponent(row);
                formGrp.className=styles.contactCol;
                formGrp.style.flex=less400 ? "none":"1 1 50%";
                formGrp.style.width=less400 ? "100%":"50%";
                formGrp.classList.add("form-group");
                formGrp.style.gap=less400 ? "0.75rem":"1rem";
                label.classList.add("text-primary");
                label.classList.add("text-center");
                label.style.textTransform="uppercase";
                if(contKey==="name"){ formGrp.style.order="0";signed.name=value};
                if(contKey==="address") {formGrp.style.order="1";};
                if(contKey==="city") {formGrp.style.order="2";};
                if(contKey==="PO") {formGrp.style.order="3";};
                if(contKey==="cell") {formGrp.style.order="4";signed.cell=value};
                if(contKey==="email1") {formGrp.style.order="5";signed.email=value};
                if(contKey==="email2") {formGrp.style.order="6";};
                input.id=`${key}-${contKey}`;
                input.name="let-contact-" + key + "-" + contKey;
                input.value=value as string;
                input.style.width="100%";
                label.setAttribute("for",input.id);
                label.textContent=contKey;
                input.oninput=(e:Event)=>{
                    if(!e) return;
                    const value1=(e.currentTarget as HTMLInputElement).value;
                    switch(true){
                        case contKey==="name":
                            contact.name=value1;
                            signed.name=value1;
                        break;
                        case contKey==="address":
                            contact.address=value1;
                        break;
                        case contKey==="city":
                            contact.city=value1;
                        break;
                        case contKey==="PO":
                            contact.PO=value1;
                        break;
                        case contKey==="cell":
                            contact.cell=value1;
                            signed.cell=value1;
                        break;
                        case contKey==="email1":
                            contact.email1=value1;
                            signed.email=value1;
                        break;
                        case contKey==="email2":
                            contact.email2=value1;
                        break;
                        default:
                            break;
                    }
                };
            };
            
        };
     
       letter.contact=contact;
       letter.signature=signed;
        return letter
};



formSummary({parent,letter,key,order,less400}:{parent:HTMLElement,letter:letterType,key:string,order:number,less400:boolean}):letterType{
    parent.style.position="relative";
    const summaryCont=document.createElement("div");
    summaryCont.id="summary-cont";
    summaryCont.className=styles.summaryCont;
    parent.appendChild(summaryCont);
    const {textarea:textInput,label,formGrp}=EditResume.textareaComponent(summaryCont);
    formGrp.id="form-summary";
    formGrp.className=styles.css_col;
    formGrp.style.marginBottom="1.75rem";
    formGrp.classList.add("form-group");
    formGrp.style.order=String(order);
    formGrp.style.width=less400 ? "100%":"80%";
    textInput.id=`form-${key}-summary-input`;
    textInput.name="form-summary-"+ key + "-" + String(order);
    textInput.value=letter.summary as string;
    textInput.style.width="100%";
    textInput.placeholder="what position?,how you learned of the hiring.";
    label.setAttribute("for",textInput.id);
    label.textContent=key;
    textInput.rows=8;
    textInput.onchange=(e:Event)=>{
        if(!e) return;
        const value=(e.currentTarget as HTMLInputElement).value;
        letter.summary=value;
    };
    return letter;
};

rowToPosition({parent,letter,less400,order}:{parent:HTMLElement,letter:letterType,less400:boolean,order:number}):letterType{
    const row=document.createElement("div");
    row.id="row-to-position";
    row.className=styles.css_row;
    parent.appendChild(row);
    letter=this.formTo({parent:row,letter,key:"to",order,less400});
    letter=this.formPosition({parent:row,letter,key:"position",order:order+1,less400});
    return letter
}

formTo({parent,letter,key,order,less400}:{parent:HTMLElement,letter:letterType,key:string,order:number,less400:boolean}):letterType{
    parent.style.position="relative";
    const toCont=document.createElement("div");
    toCont.id="to-cont";
    toCont.className=styles.css_col;
    parent.appendChild(toCont);
    const {input,label,formGrp}=EditResume.inputComponent(toCont);
    formGrp.id="form-to";
    formGrp.className=styles.css_col;
    formGrp.style.position="relative";
    formGrp.style.marginBottom="1.75rem";
    formGrp.classList.add("form-group");
    formGrp.style.order=String(order);
    formGrp.style.width=less400 ? "80%":"40%";
    input.id=`form-${key}-to-input`;
    input.name="form-to-"+ key + "-" + String(order);
    input.value=letter.to as string;
    input.placeholder="to Whom";
    input.style.width="auto";
    label.setAttribute("for",input.id);
    label.textContent=key;
   
    input.onchange=(e:Event)=>{
        if(!e) return;
        const value=(e.currentTarget as HTMLInputElement).value;
        letter.to=value;
    };
    return letter;
};

formPosition({parent,letter,key,order,less400}:{parent:HTMLElement,letter:letterType,key:string,order:number,less400:boolean}):letterType{
    parent.style.position="relative";
    const toCont=document.createElement("div");
    toCont.id="position-cont";
    toCont.className=styles.css_col;
    parent.appendChild(toCont);
    const {input,label,formGrp}=EditResume.inputComponent(toCont);
    formGrp.id="form-position";
    formGrp.className=styles.css_col;
    formGrp.style.position="relative";
    formGrp.style.marginBottom="1.75rem";
    formGrp.classList.add("form-group");
    formGrp.style.order=String(order);
    formGrp.style.width=less400 ? "80%":"40%";
    input.id=`form-${key}-position-input`;
    input.name="form-position-"+ key + "-" + String(order);
    input.value=letter.position as string;
    input.placeholder="requested position";
    input.style.width="auto";
    label.setAttribute("for",input.id);
    label.textContent=key;
   
    input.onchange=(e:Event)=>{
        if(!e) return;
        const value=(e.currentTarget as HTMLInputElement).value;
        letter.position=value;
    };
    return letter;
};




formConlusion({parent,letter,key,order,less400}:{parent:HTMLElement,letter:letterType,key:string,order:number,less400:boolean}):letterType{
    const {textarea:textInput,label,formGrp}=EditResume.textareaComponent(parent);
    formGrp.id="form-conclusion";
    formGrp.className=styles.css_col;
    formGrp.style.marginTop="1.5rem";
    formGrp.classList.add("form-group");
    formGrp.style.order=String(order);
    formGrp.style.width=less400 ? "100%":"90%";
    textInput.id=`form-${key}-conclusion-input`;
    textInput.name="form-conclusion-"+ key + "-" + String(order);
    textInput.value=letter.conclusion as string;
    textInput.style.width="100%";
    textInput.placeholder="when you can be available,where you can be contacted,and THANK THEM for the consideration.";
    label.setAttribute("for",textInput.id);
    label.textContent=key;
    textInput.rows=6;
    textInput.onchange=(e:Event)=>{
        if(!e) return;
        const value=(e.currentTarget as HTMLInputElement).value;
        letter.conclusion=value;
    };
    return letter;
};



};
export default FormLetComponents; 
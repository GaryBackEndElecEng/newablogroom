import { FaCreate } from "@/components/common/ReactIcons";
import { contactType, letterType, mainIntroLetterType, paragraphType, signatureType, userType } from "../resume/refTypes";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import styles from "./letter.module.css";

class AddRemoveLet{
    public count:number;
    public readonly paragraphInit1:paragraphType;
    public readonly paragraphInit2:paragraphType;
    public readonly paragraphInit3:paragraphType;
    public readonly paragraphInits:paragraphType[];
    public static readonly paraPlaceHolder:string[]=["critical skills","demonstration of skills","give employ reason to why you are a good fit"];
    private _mainIntroLetter:mainIntroLetterType;
    private _letter:letterType;
    private _paragraph:paragraphType;
    public paraInit:paragraphType;
    private _paragraphs:paragraphType[];
    public contact:contactType;
    public signed:signatureType;
    constructor(private _user:userType|null){
        this.count=0;
        this.paragraphInit1={
            id:0,
            para:"This paragraph gives a summary of your background and critical skills (hard skills) that make you qualified for the position"
        }
        this.paragraphInit2={
            id:1,
            para:"This paragraph can be used to demonstrate your persuasive skills (soft skills)."
        }
        this.paragraphInit3={
            id:1,
            para:"This paragraph can be used to give the employer reasons to employ you by through your research of the company."
        }
        this.paragraphInits=[this.paragraphInit1,this.paragraphInit2,this.paragraphInit3];
       
        this._paragraph={
            id:0,
            para:""
        };
        this.paraInit=this._paragraph;
        this._paragraphs=[this.paragraphInit1];
        
        this.contact={
            name:this._user?.name ||"",
            address:"",
            PO:"",
            city:"",
            cell:"",
            email1:this._user?.email ||"",
            email2:""
        };
        this.signed={
            name:this._user?.name ||"",
            cell:"",
            email:this._user?.email ||""
        };
        this._letter={
            filename:"start",
            to:"",
            position:"",
            contact:this.contact,
            summary:"",
            paragraphs:[this._paragraph],
            conclusion:"",
            signature:this.signed
        };
        this._mainIntroLetter={
            id:0,
            user_id:this._user?.id || "",
            name:"start",
            letter:this._letter
        };
    };

     ///-----------------GETTERS SETTERS----------------------//
    get user(){
        return this._user;
    };
    set user(user:userType|null){
        this._user=user;
    }
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
    get paragraph(){
        return this._paragraph;
    };
    set paragraph(paragraph:paragraphType){
        this._paragraph=paragraph;
    }
    get paragraphs(){
        return this._paragraphs;
    };
    set paragraphs(paragraphs:paragraphType[]){
        this._paragraphs=paragraphs;
    }
    ///-----------------GETTERS SETTERS----------------------//


    removeParagaph({target,letter,paragraph,index,key,less400,func}:{target:HTMLElement,paragraph:paragraphType,letter:letterType,key:string,less400:boolean,index:number,func:(letter:letterType)=>letterType|void}){
        const {id}=paragraph
        const len=letter?.paragraphs?.length;
        const less900=window.innerWidth < 900;
        const cont=document.createElement("div");
        cont.id="remove-paragraph-"+String(index);
        cont.className=styles.removeParagraph
        cont.style.position="absolute";
        cont.style.top="0%";
        cont.style.right="0%";
        if(len>0){
            cont.style.transform="translate(175px, -15px) scale(0.9)";
            if(less900)cont.style.transform="translate(95px, -35px) scale(0.7)";
            if(less400)cont.style.transform="translate(20px, -25px) scale(0.5)";
        }else{
            cont.style.transform="translate(-13px, -30px) scale(0.5)";
            if(less900)cont.style.transform="translate(-0px, -75px) scale(0.6)";
            if(less400)cont.style.transform="translate(-0px,-40px) scale(0.4)";
            
        }
        if(!less400){
            const small=document.createElement("small");
            small.id=`remove-skill-name-${key}`;
            small.textContent="rem para";
            small.style.fontSize="0.5rem";
            small.style.cssText="font-size:0.5rem;text-wrap:wrap;";
            cont.appendChild(small);
        }
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:red;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaMinusCircle,cssStyle:{fontSize:"25px",color:"red",borderRadius:"50%"}});
        target.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            letter.paragraphs=letter.paragraphs.filter(kv=>kv.id !==id);
            func(letter);
        };
        
    };


    addParagaph({parent,letter,index,key,less400,func}:{parent:HTMLElement,letter:letterType,key:string,less400:boolean,index:number,func:(letter:letterType)=>letterType|void}){
        const len=letter?.paragraphs?.length;
        const less900=window.innerWidth < 900;
        const cont=document.createElement("div");
        cont.id="add-paragraph-"+String(index);
        cont.className=styles.addParagraph
        cont.style.position="absolute";
        cont.style.top="0%";
        cont.style.left="0%";
        if(len>0){
            cont.style.transform="translate(-95px, -35px) scale(0.9)";
            if(less900)cont.style.transform="translate(-55px, -35px) scale(0.7)";
            if(less400)cont.style.transform="translate(-10px, -25px) scale(0.5)";
        }else{
            cont.style.transform="translate(-13px, -30px) scale(0.9)";
            if(less900)cont.style.transform="translate(-0px, -75px) scale(0.6)";
            if(less400)cont.style.transform="translate(-0px,-40px) scale(0.4)";
            
        }
        if(!less400){
            const small=document.createElement("small");
            small.id=`remove-para-name-${key}`;
            small.textContent="rem para";
            small.style.fontSize="0.5rem";
            small.style.cssText="font-size:0.5rem;text-wrap:wrap;";
            cont.appendChild(small);
        }
        const xDiv=document.createElement("div");
        xDiv.style.cssText="margin-inline:auto;padding:2px;border-radius:50%;color:blue;";
        cont.appendChild(xDiv);
        FaCreate({parent:xDiv,name:FaPlusCircle,cssStyle:{fontSize:"25px",color:"blue",borderRadius:"50%"}});
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            const len=letter.paragraphs?.length || 0;
            if(len >3)this.count=0;
            const paraInit=this.paragraphInits[this.count];
                this.paragraph={...paraInit,id:len};
            letter.paragraphs=[...letter.paragraphs,this.paragraph];
            this.count++;
            func(letter);
        };
        
    };
};
export default AddRemoveLet;
import Service from "@/components/common/services";
import FormComponents from "../resume/formComponents";
import { contactType, letterType, mainIntroLetterType, paragraphType, signatureType } from "../resume/refTypes";


class IntroLetter{
    public signature:signatureType;
    private _mainIntroLetter:mainIntroLetterType;
    private _letter:letterType;
    private _paragraph:paragraphType;
    private _paragraphs:paragraphType[];
    public contact:contactType;
    constructor(private _service:Service,private formComp:FormComponents){
        this.signature={
            name:"",
            cell:"",
            email:""
        }
        this._paragraph={
            id:0,
            para:""
        }
        this._paragraphs=[this._paragraph];
        
        this.contact={
            name:"",
            address:"",
            PO:"",
            city:"",
            cell:"",
            email1:"",
            email2:""
        }
        this._letter={
            to:"",
            filename:"start",
            contact:this.contact,
            summary:"",
            position:"",
            paragraphs:[this._paragraph],
            conclusion:"",
            signature:this.signature,
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




};



export default IntroLetter;
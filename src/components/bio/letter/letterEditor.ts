import Service from "@/components/common/services";
import { companyLetType, contactType, letterType, mainIntroLetterType, nameLetterType, paragraphType, signatureType, userType } from "../resume/refTypes";
import styles from "./letter.module.css";
import FormLetComponents from "./formLetComponents";
import EditResume from "../resume/editResume";
import Resume from "../resume/resume";
import DeleteClass from "../resume/deleteClass";
import LetterView from "./letterView";
import { langConversion, langInserts, langLetter } from "../resume/engFre";



class LetterEditor{
    public rowId:string;
    public containerId:string;
    private _mainLetter:mainIntroLetterType;
    public readonly letterInit:letterType;
    public readonly mainLetterInit:mainIntroLetterType;
    private _mainLetters:mainIntroLetterType[];
    private _nameLetters:nameLetterType[];
    private _letter:letterType;
    private _paragraph:paragraphType;
    public readonly paragraphInit1:paragraphType;
    public readonly paragraphInit2:paragraphType;
    private _paragraphs:paragraphType[];
    public readonly paragraphInits:paragraphType[];
    public contact:contactType;
    public signed:signatureType;
    public company:companyLetType;
  

    constructor(private _service:Service,private formLetComp:FormLetComponents,private _user:userType|null,public deleteClass:DeleteClass,public letterView:LetterView){
        this._mainLetter={} as mainIntroLetterType;
        this.rowId="";
        this.containerId="";
        this._mainLetters=[] as mainIntroLetterType[]
        this.company={
            name:"Co",
            loc:"",
            site:""
        }
        this.paragraphInit1={
            id:0,
            para:"This paragraph gives a summary of your background and critical skills (hard skills) that make you qualified for the position"
        }
        this.paragraphInit2={
            id:1,
            para:"This paragraph can be used to demonstrate your persuasive skills (soft skills)."
        }
        this.paragraphInits=[this.paragraphInit1,this.paragraphInit2];
        this._paragraph=this.paragraphInit1
        this._paragraphs=[this._paragraph];

        this.signed={
            name:this._user?.name || "",
            cell:"",
            email:this._user?.email ||""
        };
        
        this.contact={
            name:this._user?.name ||"full name",
            address:"address",
            PO:"postal code",
            city:"city",
            cell:"phon number",
            email1:this._user?.email ||"myEmail@mail.com",
            email2:"myEmail2@gmail.com"
        }
        
        this.letterInit={
            filename:"",
            position:"what position",
            to:"",
            company:this.company,
            contact:this.contact,
            summary:"In the opening paragraph tell what position you are applying for, then how you learned about the position.",
            paragraphs:[this._paragraph],
            conclusion:"At the end of the letter talk about your availability for the job, where you can be contacted, and when you are going to contact the hiring person for an appointment to discuss your application. If you have no contact name you may simply want to indicate your anticipation for a response in this part of the letter. Thank the person to whom you are writing for his/her time and consideration of your application",
            signature:this.signed
        }
        this._letter=this.letterInit;
        
        this.mainLetterInit={
            id:0,
            user_id:this._user?.id ||"",
            name:"",
            letter:this.letterInit
        };
        this._mainLetters=this._user?.letters as mainIntroLetterType[]|| [] as mainIntroLetterType[];
        this._nameLetters=(this._user?.letters as mainIntroLetterType[]).map(kv=>({id:kv.id,name:kv.name,user_id:kv.user_id,res_name_id:kv.res_name_id}))
    };


    ///-----------------GETTERS SETTERS----------------------//
    get user(){
        return this._user;
    };
    set user(user:userType|null){
        this._user=user;
        
    };
    get nameLetters(){
        return this._nameLetters;
    };
    set nameLetters(nameLetters:nameLetterType[]){
        this._nameLetters=nameLetters;
    }
    get mainLetter(){
        return this._mainLetter;
    };
    set mainLetter(mainLetter:mainIntroLetterType){
        this._mainLetter=mainLetter;
    };
    get mainLeters(){
        return this._mainLetters;
    };
    set mainLetters(mainLetters:mainIntroLetterType[]){
        this._mainLetters=mainLetters;
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
    newLetter({parent,french,func1}:{parent:HTMLElement,french:boolean,
        func1:(mainLetters:mainIntroLetterType[],nameLets:nameLetterType[])=>Promise<void>|void
    }){
        const time=1500;
        const mainCont=document.createElement("div");
        mainCont.id="main-editor-cont";
        mainCont.className=styles.mainEditor;
        mainCont.style.transform="rotate(0deg)";
        mainCont.style.opacity="1";
        parent.appendChild(mainCont);
        this.mainLetterContainer({parent:mainCont,french,mainLetter:this.mainLetterInit,isNew:true,func1});
       
        mainCont.animate([
            {transform:"rotateX(90deg)",opacity:"0"},
            {transform:"rotateX(0deg)",opacity:"1"},
        ],{duration:time,iterations:1,"easing":"ease-in"})
    };
    

    editLetter({parent,filename,french,func1}:{parent:HTMLElement,filename:string,french:boolean,
        func1:(mainLetters:mainIntroLetterType[],nameLets:nameLetterType[])=>Promise<void>|void
    }){
       
        const isMainLetter=this._mainLetters?.find(kv=>(kv.name===filename));
        if(!isMainLetter){
            this._service.getLetter({name:filename}).then(async(res)=>{
                if(res){
                    this.mainLetter=res;
                    const mainLetter=res;
                    const remain=this.mainLetters.filter(kv=>(kv.id !==res.id));
                    this.mainLetters=[...remain,res];
                    this.mainLetterContainer({parent,mainLetter,french,isNew:false,func1});
                };
            });
        }else{
            this.mainLetterContainer({parent,mainLetter:isMainLetter,isNew:false,french,func1});
        }
    };



    mainLetterContainer({parent,mainLetter,isNew,french,func1}:{parent:HTMLElement,mainLetter:mainIntroLetterType,isNew:boolean,french:boolean,func1:(mainLets:mainIntroLetterType[],nameLet:nameLetterType[])=>Promise<void>|void

    }){
        const less400=window.innerWidth <400;
        
        const mainLetterCont=document.createElement("section");
        mainLetterCont.id="main-letter-cont";
        mainLetterCont.className=styles.mainLetterCont;
        parent.appendChild(mainLetterCont);
        const {letter:letterIn,name:_name}=mainLetter;
        
        if(isNew){
            const convLetter=langLetter({french,user:this.user});
            this.letter=convLetter
            this.letter=this.addFilename({parent:mainLetterCont,letter:convLetter,less400,french});
            this.letter=this.showMainLetter({parent:mainLetterCont,letter:convLetter,less400,french});
        }else{
            const filenameCont=document.createElement("div");
            filenameCont.id="filename-cont";
            filenameCont.className=styles.css_col;
            filenameCont.style.order="-1";
            mainLetterCont.appendChild(filenameCont);
            const filename=document.createElement("h6");
            filename.className="text-primary text-center my-1 mb-2 lean display-6";
            filename.style.fontSize=less400 ? "150%":"225%";
            filename.textContent=_name;
            filenameCont.appendChild(filename);
            this.letter=this.showMainLetter({parent:mainLetterCont,letter:letterIn,less400,french});
        }
      
        const outerBtnDiv=document.createElement("div");
        outerBtnDiv.id="btn-cont";
        outerBtnDiv.className=styles.outerBtnDiv;
        const btnCont=document.createElement("div");
        btnCont.id="btn-cont";
        btnCont.className=styles.btnCont;
        outerBtnDiv.appendChild(btnCont);
        mainLetterCont.appendChild(outerBtnDiv);
        if(!isNew){

            this.deleteClass.deleteLet({parent,target:mainLetterCont,french,mainLet:mainLetter,
                func:({mainLets,nameLets})=>{
                    this._mainLetters=mainLets;
                    this._nameLetters=nameLets;
                    func1(mainLets,nameLets)
                }
            })
        }

        const {button}=Resume.simpleButton({anchor:btnCont,bg:"black",color:"white",type:"button",text:"save letter",time:400});

        button.onclick=(e:MouseEvent)=>{
            if(e && this._user){
                const check=this.letter.filename !== ""
                const mainLetter={id:0,name:this.letter.filename,user_id:this._user?.id,letter:this.letter} as mainIntroLetterType;
                this.mainLetter=mainLetter;
               
                if(check){
                    this._service.saveLetter({mainLetter:mainLetter}).then(async(res)=>{
                        if(res){
                            const {id,name,res_name_id,user_id}=res;
                            this.mainLetter=res;
                            const remain=this._mainLetters.filter(kv=>(kv.name !==name));
                            const remainNameLets=this._nameLetters.filter(kv=>(kv.name !==name));
                            this._mainLetters=[...remain,res];
                            this._nameLetters=[...remainNameLets,{id:id as number,name,user_id,res_name_id}];
                            Resume.message({parent:mainLetterCont,msg:"saved",time:800,type:"success"});
                            ([...parent.children] as HTMLElement[]).forEach(child=>{
                                if(child && child.id !==this.rowId){
                                    parent.removeChild(child);
                                }
                            });
                            func1(this._mainLetters,this._nameLetters);
                        }
                    });
                }else{
                    Resume.message({parent:mainLetterCont,type:"warning",time:1500,msg:"please give a filename, abaove"});
                };

            }
        };
       
    };



    addFilename({parent,letter,less400,french}:{parent:HTMLElement,letter:letterType,less400:boolean,french:boolean}):letterType{
        
        const rand=Math.floor(Math.random()*1000);
        const addFileCont=document.createElement("div");
        parent.style.position="relative";
        addFileCont.id="file-cont";
        addFileCont.className=styles.addFileCont;
        parent.appendChild(addFileCont);
        const {input,label,formGrp}=EditResume.inputComponent(addFileCont);
        formGrp.className=styles.css_col;
        formGrp.classList.add("form-group");
        formGrp.style.width=less400 ? "90%":"70%";
        formGrp.style.gap=less400 ? "0.75rem":"1rem";
        label.classList.add("text-primary")
        label.style.textTransform="uppercase";
        input.id=`filename-input`;
        input.name="filename-input";
        input.type="text";
        input.placeholder=langInserts({french,key:"filename"}).place;
        input.style.width="100%";
        label.setAttribute("for",input.id);
        label.textContent=french ? langConversion({key:"filename"}):"filename";
        input.onchange=(e:Event)=>{
            if(e){
                const value=(e.currentTarget as HTMLInputElement).value;
                const _name=value.split(" ").join("_").trim()
                letter.filename=`${_name}_${rand}`
              
            }
        };
        return letter;

    };


    showMainLetter({parent,letter,less400,french}:{parent:HTMLElement,letter:letterType,less400:boolean,french:boolean}){
        parent.style.position="relative";
       
        const letterCont=document.createElement("section");
        letterCont.id="letter-cont";
        letterCont.className=styles.letterCont;
        if(!letter.company) letter.company=this.company;
        parent.appendChild(letterCont);
        letter=this.formLetComp.formCompany({parent:letterCont,letter,order:0,less400,french});
        letter=this.formLetComp.rowToPosition({parent:letterCont,letter,order:1,less400,french});
        letter=this.formLetComp.formSummary({parent:letterCont,letter,french,key:"summary",order:2,less400});
        letter=this.formLetComp.formContact({parent:letterCont,letter,key:"contact",order:3,less400,french});
        letter=this.formLetComp.formPara({parent:letterCont,letter,french,key:"paragraph",order:4,less400});
        letter=this.formLetComp.formConlusion({parent:letterCont,letter,french,key:"conclusion",order:5,less400});
        

        return letter
    };
    
   
    
};
export default LetterEditor;
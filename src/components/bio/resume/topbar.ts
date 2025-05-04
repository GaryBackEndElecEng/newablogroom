import Service from "@/components/common/services";
import Resume from "./resume";
import Reference from "./viewReference";
import ViewResume from "./viewResume";
import LetterEditor from "../letter/letterEditor";
import ModuleConnect from "./moduleConnect";
import { catType, combinedType, mainIntroLetterType, mainResumeRefType, mainResumeType, nameLetterType, nameRefType, nameResumeType, noDataMsgType, topbarCatResType, topbarCatType, topbarRowColDescType, topbarRowDescType, topbarRowType, userType } from './refTypes';
import styles from "./headerTop.module.css";
import CreateResume from "./createResume";
import CreateRef from "./createRef";
import EditReference from "./editReference";
import EditResume from "./editResume";
import LetterView from "../letter/letterView";
import { FaCreate } from "@/components/common/ReactIcons";
import { FaInfoCircle } from "react-icons/fa";
import { topbarRows,topbarRowDescs,topbarRowColDescs,topbarCats } from "./topbarData";
import { langConversion } from "./engFre";


//-------------------//THIS CLASS IS THE MAIN MENU FOR RESUME\\\---------------/////////
class Topbar{
    public static topbarRows:topbarRowType[]=topbarRows;
    public static topbarRowDescs:topbarRowDescType[]=topbarRowDescs;
    public static topbarRowColDescs:topbarRowColDescType[]=topbarRowColDescs;
    public static topbarCats:topbarCatType[]=topbarCats
    public readonly dataRow:string;
    public readonly noDataMsg:noDataMsgType[];
    public readonly rowId:string;
    public readonly openId:string;
    private _nameResumes:nameResumeType[];
    private _nameRefs:nameRefType[];
    private _nameLetters:nameLetterType[];
    private _mainRefs:mainResumeRefType[];
    private _mainResumes:mainResumeType[];
    private _mainLetters:mainIntroLetterType[]
    private _containerId:string;
    public backBtnId:string;
    public titleId:string;
    public titleName:string;

    constructor(private _service:Service, private _user:userType|null,public resumeRef:Reference,public viewResume:ViewResume,public createResume:CreateResume,private createRef:CreateRef,private letterEditor:LetterEditor,private _moduleConnect:ModuleConnect,private editRef:EditReference,private _editResume:EditResume,public letterView:LetterView){
        this._nameResumes=[] as nameResumeType[];
        this._nameRefs=[] as nameRefType[];
        this._nameLetters=[] as nameLetterType[];
        this.openId="open-container";
        this.dataRow="div[data-row-display]";
        this.rowId="container-row";
        this.titleId="";
        this.titleName="";
        this._containerId="";
        this._editResume.rowId=this.rowId;
        this.editRef.rowId=this.rowId;
        this.letterEditor.rowId=this.rowId;
        this._moduleConnect.rowId=this.rowId;
        this.viewResume.rowId=this.rowId;
        this.createRef.rowId=this.rowId;
        this.createResume.rowId=this.rowId;
        this._mainLetters=this._user?.letters as mainIntroLetterType[] ||[] as mainIntroLetterType[];
        this._nameLetters=this._user?.letters?.map(kv=>({id:kv.id as number,user_id:kv.user_id,name:kv.name,res_name_id:kv.res_name_id})) as nameLetterType[] || [] as nameLetterType[]
        this._mainResumes=this._user?.resumes as mainResumeType[]||[] as mainResumeType[];
        this._nameResumes=this._user?.resumes?.map(kv=>({id:kv.id as number,user_id:kv.user_id,name:kv.name})) as nameResumeType[] || [] as nameResumeType[];
        this._mainRefs=this._user?.references as mainResumeRefType[] || [] as mainResumeRefType[];
        this._nameRefs=this._user?.references?.map(kv=>({id:kv.id as number,user_id:kv.user_id,name:kv.name,res_name_id:kv.res_name_id})) as nameRefType[] || [] as nameRefType[];
        this.backBtnId="back-btn-id";
    
        this.noDataMsg=[
            {cat:"let",msg:"You have no saved intro-letters in your repetoir ",msgFr:"Vous n'avez aucune lettre d'introduction enregistrée dans votre répertoire"},
            {cat:"res",msg:"You have no saved resumes in your repetoir ",msgFr:"Vous n'avez aucun CV enregistré dans votre répertoire"},
            {cat:"ref",msg:"You have no saved references in your repetoir ",msgFr:"Vous n'avez aucune référence enregistrée dans votre répertoire"},
            {cat:"comb",msg:"You have no saved references, or resumes or intro letter in your repetoir ",msgFr:"Vous n'avez aucune référence enregistrée, ni CV, ni lettre de présentation dans votre répertoire"},
        ]

    };


    ///-------GETTER/SETTERS-------------------//
    get containerId(){
        return this._containerId;
    };
    set containerId(containerId:string){
        this._containerId=containerId;
        this._editResume.containerId=containerId;
        this.editRef.containerId=containerId;
        this.letterEditor.containerId=containerId;
        this._moduleConnect.containerId=containerId;
        this.viewResume.containerId=containerId;
        this.createRef.containerId=containerId;
    }
    get user(){
        return this._user;
    };
    set user(user:userType|null){
        this._user=user;
    };
   
    get mainletters(){
        return this._mainLetters
    }
    set mainLetters(mainLetters:mainIntroLetterType[]){
        this._mainLetters=mainLetters
        
       
    }
    get mainResumes(){
        return this._mainResumes
    }
    set mainResumes(mainResumes:mainResumeType[]){
        this._mainResumes=mainResumes;
       
    }
    get mainRefs(){
        return this._mainRefs
    }
    set mainRefs(mainRefs:mainResumeRefType[]){
        this._mainRefs=mainRefs;
    }
    get nameResumes(){
        return this._nameResumes;
    };
    set nameResumes(nameResumes:nameResumeType[]){
        this._nameResumes=nameResumes;
    };
    set nameRefs(nameRefs:nameRefType[]){
        this._nameRefs=nameRefs;
    };
    get nameRefs(){
        return this._nameRefs
    }
    get nameLetters(){
        return this._nameLetters
    };
    set nameLetters(nameLetters:nameLetterType[]){
        this._nameLetters=nameLetters;
    }
    ///-------GETTER/SETTERS-------------------//




//PARENT===INJECTOR: MAINCONTROLLER=MAINCONTAINER
    async getTopBar({parent,mainContainer,titleName,titleId,less400,mainResumes,mainRefs,mainLetters,user,french}:{
        parent:HTMLElement,
        mainContainer:HTMLElement,
        titleName:string,
        titleId:string,
        less400:boolean
        mainResumes:mainResumeType[],
        mainRefs:mainResumeRefType[],
        mainLetters:mainIntroLetterType[],
        user:userType|null,
        french:boolean
    }){
        // console.log("mainLetter",mainLetters,"this.mainLetters",this._mainLetters)//works
       const {nameResumes,nameRefs,nameLetters}= this.pickupData({mainResumes,mainRefs,mainLetters});
        this.titleId=titleId;
        this.titleName=titleName;
        this.user=user;
        //RENEWING DELETE CLASS DATA AFTER REFRESHING
        this.viewResume.deleteClass.mainResumes=mainResumes;
        this.viewResume.deleteClass.nameResumes=nameResumes;
        this.resumeRef.deleteClass.mainRefs=mainRefs;
        this.resumeRef.deleteClass.nameRefs=nameRefs;
        this.resumeRef.deleteClass.mainLets=mainLetters;
        this.letterEditor.deleteClass.nameLets=nameLetters;
        this.letterEditor.deleteClass.mainLets=mainLetters;
        // this.mainLetters=mainLetters
        
      
  
      Resume.cleanUp(mainContainer);//cleaning MAINCONTAINER
        //GETTING URL PARAMS
        // const getUrl=new URL(window.location.href);
        // const params=getUrl.searchParams
        // const name=params.get("name");
        // const id=params.get("id");
        // if(id && name){
        //     this.viewResume.showResume({parent:mainContainer,name});
        // }
        //GETTING URL PARAMS
        //-------------YOU CAN USE COMBINED FRO THE BELOW---///
        //----------------REMOVE THIS AFTER CONFIRMING THAT NEW FORMS ARE ADDED TO THE ORIGNAL LIST!!!--------//
        // this.verifyData({user:this.user});//THIS CHECK THE DB FOR FILES=
        //----------------REMOVE THIS AFTER CONFIRMING THAT NEW FORMS ARE ADDED TO THE ORIGNAL LIST!!!--------//
        const title=document.createElement("h6");
        title.id=this.titleId;
        title.className="text-center text-primary display-6 lean my-1";
        title.style.textTransform="capitalize";
        title.textContent=titleName;
        title.style.order="-1";
        mainContainer.appendChild(title);

        this.generateTopBar({
            grandParent:parent,
            mainContainer,
            less400,
            mainResumes,
            mainLetters,
            mainRefs,
            french,
            topbarRows:topbarRows,
            func: (topbarCats) => {
                const time = 1000;
                this.genTopbarcats({
                    parent,
                    mainContainer,
                    nameRefs,
                    mainResumes,
                    nameLetters,
                    nameResumes,
                    topbarCats,
                    time,
                    french
                   });
            }
        });

    };

    genTopbarcats({parent,mainContainer,nameRefs,mainResumes,nameLetters,nameResumes,topbarCats,time,french}:{
        parent:HTMLElement,
        mainContainer:HTMLElement,
        nameRefs:nameRefType[],
        nameLetters:nameLetterType[],
        nameResumes:nameResumeType[],
        mainResumes:mainResumeType[],
        topbarCats:topbarCatResType[],
        time:number,
        french:boolean
    }){
       const css_col="display:flex;flex-direction:column;gap:1rem;";
       const css_row="display:flex;flex-wrap:wrap;gap:1rem;";
       const less900=window.innerWidth <900;;
       const less400=window.innerWidth <400;
        const hasLetters=!!(nameLetters?.length && nameLetters.length>0);
        const hasRefs=!!(nameRefs?.length && nameRefs.length>0);
        const hasResumes=!!(nameResumes?.length && nameResumes.length>0);
        this.mainResumes=mainResumes;
        this.nameRefs=nameRefs;
        this.nameLetters=nameLetters;
        topbarCats.forEach((item) => {
            if (item) {
                const { name,nameFr, html, order } = item;
                const name_=nameFr || name;
                if (name === "resumes") {
                    if(hasResumes){

                        nameResumes.map((_res) => {
                            if (_res) {
                                const {name:_name}=_res;
                                const { button } = Resume.simpleButton({ anchor: html, bg: "black", color: "white", text: _name, time: 400, type: "button"});
                                button.style.order = order;

                                button.onclick = (e: MouseEvent) => {
                                    if (e) {
                                        
                                        Topbar.executeOpen({
                                            mainContainer,
                                            openId: this.openId,
                                            time,
                                            rowId:this.rowId,
                                            backBtnId:this.backBtnId,
                                            show: true,
                                            func: (openCont) => {
                                                const mainResume=mainResumes.find(res=>(res.name===_res.name));
                                                if(!mainResume) return;
                                                this.viewResume.showResume({ parent: openCont,mainResume,french,
                                                    func1:async(mainResumes,nameResumes)=>{
                                                        
                                                        this.nameResumes=nameResumes;
                                                        this.mainResumes=mainResumes;
                                                        this._editResume.mainResumes=mainResumes;
                                                        this.viewResume.mainResumes=mainResumes;
                                                        await this.getTopBar({
                                                            parent,
                                                            mainContainer,
                                                            titleName:this.titleName,
                                                            titleId:this.titleId,
                                                            less400,
                                                            mainResumes,
                                                            mainRefs:this.mainRefs,
                                                            mainLetters:this.mainLetters,
                                                            user:this.user,
                                                            french
                                                        });
                                                    }
                                                 });
                                            }
                                        });
                                    }
                                };
                            }
                        });

                    }else{
                        //MESSAGE HAS NO RESUMES
                        const msgCont=this.noDataMsg.find(kv=>(kv.cat==="res")) as noDataMsgType;
                        Topbar.noLetsResRefsMsg({parent:html,isRes:true,isLet:false,isRef:false,isEdit:false,noDataMsg:msgCont,french});
                    }
                } else if (name === "newResume") {
                    const { button: createBtn } = Resume.simpleButton({ anchor: html, bg: "black", color: "white", text: name_, time: 400, type: "button" });
                    createBtn.style.order = order;
                    createBtn.onclick = (e: MouseEvent) => {
                        if (!e) return;
                        Topbar.executeOpen({
                            mainContainer,
                            openId: this.openId,
                            time,
                            rowId:this.rowId,
                            backBtnId:this.backBtnId,
                            show: true,
                            func: (openCont) => {
                                this.createResume.main({ parent, innerParent: openCont,french,
                                    func:async(mainResumes,mainResume)=>{
                                        this.mainResumes=mainResumes;
                                        this._editResume.mainResumes=mainResumes;
                                        this.viewResume.mainResumes=mainResumes;
                                        await this.getTopBar({
                                            parent,
                                            mainContainer,
                                            titleName:this.titleName,
                                            titleId:this.titleId,
                                            less400,
                                            mainResumes:mainResumes,
                                            mainRefs:this.mainRefs,
                                            mainLetters:this.mainLetters,
                                            user:this.user,
                                            french
                                        });
                                       
                                        this.viewResume.showResume({parent:mainContainer,mainResume:mainResume,french,
                                            func1:async(mainResumes,nameResumes)=>{
                                                // RESPONSE AFTER DELETING item.id +"-inner"
                                                this.mainResumes=mainResumes;
                                                this.nameResumes=nameResumes;
                                                this._editResume.mainResumes=mainResumes;
                                                this.viewResume.mainResumes=mainResumes;
                                                //row-col-edit
                                                await this.getTopBar({
                                                    parent,
                                                    mainContainer,
                                                    titleName:this.titleName,
                                                    titleId:this.titleId,
                                                    less400,
                                                    mainResumes:mainResumes,
                                                    mainRefs:this.mainRefs,
                                                    mainLetters:this.mainLetters,
                                                    user:this.user,
                                                    french
                                                });
                                            }
                                        });
                                    },
                                 });
                            }
                        });


                    };
                }else if (name === "edit_resumes") {
                    if(hasResumes){
                        this.nameResumes.map(nameRes=>{
                            if(nameRes){
                                const {name}=nameRes;
                                const {button}=Resume.simpleButton({anchor:html,text:name,type:"button",bg:"black",color:"white",time:400});
                                button.onclick=(e:MouseEvent)=>{
                                    if(!e) return;

                                    Topbar.executeOpen({
                                       mainContainer,
                                        openId: this.openId,
                                        time,
                                        rowId:this.rowId,
                                        backBtnId:this.backBtnId,
                                        show: true,
                                        func: (openCont) => {
                                            const getRow=mainContainer.querySelector(`div#${this.rowId}`) as HTMLElement;
                                            this._editResume.editResume({
                                                grandParent:parent,
                                                parent:openCont,
                                                row:getRow,
                                                nameResume:nameRes,
                                                css_col,
                                                css_row,
                                                less900,
                                                less400,
                                                user:this.user,
                                                french,
                                                func:async(mainResumes,mainResume,type)=>{
                                                    if(type==="rem"){
                                                        mainResumes=mainResumes.filter(kv=>(kv.id!==mainResume.id));
                                                        await this.getTopBar({
                                                            parent,
                                                            mainContainer,
                                                            titleName:this.titleName,
                                                            titleId:this.titleId,
                                                            less400,
                                                            mainResumes:mainResumes,
                                                            mainRefs:this.mainRefs,
                                                            mainLetters:this.mainLetters,
                                                            user:this.user,
                                                            french
                                                        });
                                                    }else{
                                                        await this.getTopBar({
                                                            parent,
                                                            mainContainer,
                                                            titleName:this.titleName,
                                                            titleId:this.titleId,
                                                            less400,
                                                            mainResumes:mainResumes,
                                                            mainRefs:this.mainRefs,
                                                            mainLetters:this.mainLetters,
                                                            user:this.user,
                                                            french
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    });
                                };
                            }
                        });

                    }else{
                        //MESSAGE NO RESUMES
                        const msgCont=this.noDataMsg.find(kv=>(kv.cat==="res")) as noDataMsgType;
                        Topbar.noLetsResRefsMsg({parent:html,isRes:true,isLet:false,isRef:false,isEdit:true,noDataMsg:msgCont,french});
                    }
                   
                } else if (name === "References") {
                    if(hasRefs){

                        nameRefs.forEach(name => {
                            if (name) {
                                const { button } = Resume.simpleButton({ anchor: html, type: "button", bg: "black", color: "white", time: 400, text: name.name });
                                button.style.order = order;
                                button.onclick = (e: MouseEvent) => {
                                    if (!e) return;
                                   
                                    Topbar.executeOpen({
                                        mainContainer,
                                        openId: this.openId,
                                        time,
                                        rowId:this.rowId,
                                        backBtnId:this.backBtnId,
                                        show: true,
                                        func: (openCont) => {
                                            this.resumeRef.main({ parent: openCont, name: name.name, less400, less900, css_col, css_row,french, buttonEffect: false,toPrint:true,
                                                func1:async(mainRefs,nameRefs)=>{
                                                    console.log("refs",mainRefs);
                                                    console.log("nameRefs",nameRefs);
                                                    this.mainRefs=mainRefs;
                                                    this.nameRefs=nameRefs;
                                                    await this.getTopBar({
                                                        parent,
                                                        mainContainer,
                                                        titleName:this.titleName,
                                                        titleId:this.titleId,
                                                        less400,
                                                        mainResumes:mainResumes,
                                                        mainRefs,
                                                        mainLetters:this.mainLetters,
                                                        user:this.user,
                                                        french
                                                    });
                                                }
                                             });
                                        }
                                    });


                                };
                            }
                        });

                    }else{
                        //MESSAGE HAS NO REFERENCES
                        const msgCont=this.noDataMsg.find(kv=>(kv.cat==="ref")) as noDataMsgType;
                        Topbar.noLetsResRefsMsg({parent:html,isRes:false,isLet:false,isRef:true,isEdit:false,noDataMsg:msgCont,french});
                    }
                }else if (name === "edit_ref") {
                    if(hasRefs){

                        this.nameRefs.forEach(item => {
                            if (item) {
                                const {name}=item;
                                const { button } = Resume.simpleButton({ anchor: html, type: "button", bg: "black", color: "white", time: 400, text: name,});
                                button.style.order = order;
                                button.onclick = (e: MouseEvent) => {
                                    if (!e) return;
                                   
                                    Topbar.executeOpen({
                                        mainContainer,
                                        openId: this.openId,
                                        time,
                                        rowId:this.rowId,
                                        backBtnId:this.backBtnId,
                                        show: true,
                                        func: (openCont) => {
                                            
                                            this.editRef.editResumeRef({
                                                parent:openCont,
                                                 less400,
                                                 less900,
                                                 css_col,
                                                 css_row,
                                                item,
                                                func:async(nameRefs,mainRef,type)=>{
                                                    this.resumeRef.nameRefs=nameRefs
                                                    this.nameRefs=nameRefs;
                                                    if(type==="rem"){
                                                        const remain=this.mainRefs.filter(kv=>(kv.id !==item.id));
                                                        if(!remain) return;
                                                        await this.getTopBar({
                                                            parent,
                                                            mainContainer,
                                                            titleName:this.titleName,
                                                            titleId:this.titleId,
                                                            less400,
                                                            mainResumes:mainResumes,
                                                            mainRefs:remain,
                                                            mainLetters:this.mainLetters,
                                                            user:this.user,french
                                                        });
                                                    }else{

                                                        await this.getTopBar({
                                                            parent,
                                                            mainContainer,
                                                            titleName:this.titleName,
                                                            titleId:this.titleId,
                                                            less400,
                                                            mainResumes:mainResumes,
                                                            mainRefs:[...this.mainRefs,mainRef],
                                                            mainLetters:this.mainLetters,
                                                            user:this.user,french
                                                        });
                                                    }
                                                }

                                             });
                                        }
                                    });


                                };
                            }
                        });

                    }else{
                        //MESSAGE HAS NO REFS
                        const msgCont=this.noDataMsg.find(kv=>(kv.cat==="ref")) as noDataMsgType;
                        Topbar.noLetsResRefsMsg({parent:html,isRes:false,isLet:false,isRef:true,isEdit:true,noDataMsg:msgCont,french});
                    }
                } else if (name === "create_ref") {
                    const { button: create_ref } = Resume.simpleButton({ anchor: html, bg: "black", color: "white", text: name_, time: 400, type: "button" });
                    create_ref.style.order = order;
                    create_ref.onclick = (e: MouseEvent) => {
                        if (!e) return;
                       
                        Topbar.executeOpen({
                            mainContainer,
                            openId: this.openId,
                            time,
                            rowId:this.rowId,
                            backBtnId:this.backBtnId,
                            show: true,
                            func: (openCont) => {
                                this.createRef.main({ parent: openCont,user:this.user,french,
                                    func:async(mainRefs)=>{
                                        this.mainRefs=mainRefs;
                                        this.editRef.mainRefs=mainRefs;
                                        this.resumeRef.mainResumerefs=mainRefs;
                                        this.nameRefs=mainRefs.map(kv=>(
                                            {id:kv.id as number,name:kv.name,user_id:kv.user_id,res_name_id:kv.res_name_id,french:kv.french}
                                        ));
                                        this.resumeRef.nameRefs=this.nameRefs
                                      await this.getTopBar({
                                            parent,
                                            mainContainer,
                                            titleName:this.titleName,
                                            titleId:this.titleId,
                                            less400,
                                            mainResumes,
                                            mainRefs:mainRefs,
                                            mainLetters:this.mainLetters,
                                            user:this.user,
                                            french
                                        });
                                    }
                                 });
                            }
                        });

                    };
                } else if (name === "new_letter") {
                    const { button: letter } = Resume.simpleButton({ anchor: html, bg: "black", color: "white", text: name_, time: 400, type: "button"});
                    letter.style.order = order;
                    letter.onclick = (e: MouseEvent) => {
                        if (!e) return;
                        
                        Topbar.executeOpen({
                            mainContainer,
                            openId: this.openId,
                            time,
                            rowId:this.rowId,
                            backBtnId:this.backBtnId,
                            show: true,
                            func: (openCont) => {
                                this.letterEditor.newLetter({ parent: openCont,french,
                                    func1:async(mainLetters,nameLetters)=>{
                                        this.mainLetters=mainLetters;
                                        this.nameLetters=nameLetters;
                                       await this.getTopBar({
                                            parent,
                                            mainContainer,
                                            titleName:this.titleName,
                                            titleId:this.titleId,
                                            less400,
                                            mainResumes,
                                            mainRefs:this.mainRefs,
                                            mainLetters:mainLetters,
                                            user:this.user,
                                            french
                                        });
                                    }
                                 });
                            }
                        });
                    };
                } else if (name === "edit_letter") {
                    if(hasLetters){

                        this.nameLetters.map((nameLetter, index) => {
                            if (nameLetter) {
                                const { name } = nameLetter;
                                const { button: editLetter } = Resume.simpleButton({ anchor: html, bg: "black", color: "white", text: name, time: 400, type: "button" });
                                editLetter.style.order = String(index);
                                editLetter.onclick = (e: MouseEvent) => {
                                    if (!e) return;
                                    
                                    Topbar.executeOpen({
                                        mainContainer,
                                        openId: this.openId,
                                        time,
                                        rowId:this.rowId,
                                        backBtnId:this.backBtnId,
                                        show: true,
                                        func: (openCont) => {
                                            this.letterEditor.editLetter({ parent: openCont, filename: name,french,
                                                func1:async(mainLetters,nameLetters)=>{
                                                    //DELETE && SAVE
                                                   const mainLet=this.mainLetters?.find(kv=>(kv.name===name)) as mainIntroLetterType;
                                                   this.mainLetters=mainLetters;
                                                   this.nameLetters=nameLetters;
                                                  
                                                       await this.getTopBar({
                                                            parent,
                                                            mainContainer,
                                                            titleName:this.titleName,
                                                            titleId:this.titleId,
                                                            less400,
                                                            mainResumes,
                                                            mainRefs:this.mainRefs,
                                                            mainLetters:mainLetters,
                                                            user:this.user,
                                                            french
                                                        });
                                                        if(mainLet){
                                                            this.letterEditor.letterView.showLetter({parent:mainContainer,mainletter:mainLet,showToPrint:false,french});
                                                        }
                                                    
                                                 
                                                }
                                             });
                                        }
                                    });
                                };
                            }
                        });
                           
                    }else{
                        //MESSAGE HAS NO LETTERS
                        const msgCont=this.noDataMsg.find(kv=>(kv.cat==="let")) as noDataMsgType;
                        Topbar.noLetsResRefsMsg({parent:html,isRes:false,isLet:true,isRef:false,isEdit:true,noDataMsg:msgCont,french});
                    }
                } else if (name === "print-letters") {
                   
                    if(hasLetters){
                        this.nameLetters.map(namelet => {
                            const {name}=namelet;
                            const { button: nameLetBtn } = Resume.simpleButton({ anchor: html, bg: "black", color: "white", text: name, time: 400, type: "button" });
                            nameLetBtn.style.order = order;
                            nameLetBtn.onclick = (e: MouseEvent) => {
                                if (e) {
                                   
                                    const newUrl = new URL("/print", window.location.origin);
                                    newUrl.searchParams.set("nameLetter",name);
                                    window.location.href = newUrl.href;
                                }
                            };
                        });

                    }else{
                        //MESSAGE HAS NO LETTERS
                        const msgCont=this.noDataMsg.find(kv=>(kv.cat==="let")) as noDataMsgType;
                        Topbar.noLetsResRefsMsg({parent:html,isRes:false,isLet:true,isRef:false,isEdit:false,noDataMsg:msgCont,french});
                    }
                } else if (name === "view-letters") {
                    if(hasLetters){

                        nameLetters.map(namelet => {
                          
                            const {name}=namelet;
                            const { button: nameLetBtn } = Resume.simpleButton({ anchor: html, bg: "black", color: "white", text: name, time: 400, type: "button"});
                            nameLetBtn.style.order = order;
                            nameLetBtn.onclick = (e: MouseEvent) => {
                                if (e) {
                                   const mainletter=this._mainLetters?.find(kv=>(kv.name===name))||undefined;
                                  
                                   if(mainletter){
                                    Topbar.executeOpen({
                                        mainContainer,
                                        openId: this.openId,
                                        time,
                                        rowId:this.rowId,
                                        backBtnId:this.backBtnId,
                                        show: true,
                                        func: (openCont) => {
                                       this.letterView.main({parent:openCont,mainletter,showToPrint:false,french});
                                        },
                                    });

                                   }
                                    
                                }
                            };
                        });

                    }else{
                        //MESSAGE HAS NO LETTERS
                        const msgCont=this.noDataMsg.find(kv=>(kv.cat==="let")) as noDataMsgType;
                        Topbar.noLetsResRefsMsg({parent:html,isRes:false,isLet:true,isRef:false,isEdit:false,noDataMsg:msgCont,french});
                    }
                } else if (name === "attach") {
                    const { button: attachBtn } = Resume.simpleButton({ anchor: html, bg: "black", color: "white", text: name_, time: 400, type: "button" });
                    attachBtn.style.order = order;
                    attachBtn.onclick = (e: MouseEvent) => {
                        if (e) {
                            Topbar.executeOpen({
                                mainContainer,
                                openId: this.openId,
                                time,
                                rowId:this.rowId,
                                backBtnId:this.backBtnId,
                                show: true,
                                func: (openCont) => {
                                    this._moduleConnect.combined={nameResumes,nameRefs:nameRefs,nameLetters}
                                    this._moduleConnect.main({ parent: openCont,nameResumes,nameReferences:nameRefs,nameLetters,french });
                                }
                            });
                        }
                    };
                } else if (name === "view_attach") {
                    if(hasResumes){

                        this.nameResumes.map((name) => {
                            if (name) {
                                const { button } = Resume.simpleButton({ anchor: html, bg: "black", color: "white", text: name.name, time: 400, type: "button", });
                                button.style.order = order;

                                button.onclick = (e: MouseEvent) => {
                                    if (e) {
                                        const newUrl = new URL(`/showResume/${name.name}`, location.origin);
                                        location.href = newUrl.href;

                                    }
                                };
                            }
                        });

                    }else{
                        const msgCont=this.noDataMsg.find(kv=>(kv.cat==="comb")) as noDataMsgType;
                        Topbar.noLetsResRefsMsg({parent:html,isRes:false,isLet:true,isRef:false,isEdit:false,noDataMsg:msgCont,french});
                    }
                }else if(name==="clear_attach"){
                    if(hasResumes){
                        this.nameResumes.map(nameRes=>{
                            if(nameRes){
                                const {name}=nameRes;
                                const { button: attachBtn } = Resume.simpleButton({ anchor: html, bg: "black", color: "white", text: name, time: 400, type: "button", });
                                attachBtn.style.order = order;
                                attachBtn.onclick = (e: MouseEvent) => {
                                        if (e) {
                                            Topbar.executeOpen({
                                                mainContainer,
                                                openId: this.openId,
                                                time,
                                                rowId:this.rowId,
                                                backBtnId:this.backBtnId,
                                                show: true,
                                                func: (openCont) => {
                                                    this._moduleConnect.combined={nameResumes,nameRefs:nameRefs,nameLetters}
                                                    const combined={nameResumes,nameRefs,nameLetters} as combinedType
                                                    this._moduleConnect.clearAccess({ parent: openCont,nameResume:nameRes,combined });
                                                }
                                            });
                                        }                                                       
                                    };
                            }
                        });

                    }else{
                        const msgCont=this.noDataMsg.find(kv=>(kv.cat==="comb")) as noDataMsgType;
                        Topbar.noLetsResRefsMsg({parent:html,isRes:false,french,isLet:true,isRef:false,isEdit:false,noDataMsg:msgCont});
                    }
                };
            }
        });
    }

    generateTopBar({grandParent,mainContainer,less400,topbarRows,mainResumes,mainLetters,mainRefs,french,func}:{
        grandParent:HTMLElement,
        mainContainer:HTMLElement,
        less400:boolean,
        topbarRows:topbarRowType[],
        mainResumes:mainResumeType[],
        mainRefs:mainResumeRefType[],
        mainLetters:mainIntroLetterType[],
        french:boolean
        func:(topbarCatRes:topbarCatResType[],cat:string)=>Promise<void>|void

    }){
        //CATAGORY LEVEL
        const len=topbarRows?.length || 1;
        const partition=Math.floor(100/len);
        const row=document.createElement("div");
        row.id=this.rowId;
        row.className=styles.topbarRow
        row.style.flexDirection=less400 ? "column":"row";
        row.style.flexWrap=less400 ? "":"wrap";
        row.style.alignItems=less400 ? "center":"flex-start";
        row.style.alignItems=less400 ? "center":"flex-start";
        mainContainer.appendChild(row);


        topbarRows.map((topbarItem,index)=>{
            const {desc,descFr}=topbarItem
            const col=document.createElement("div");
            col.id=topbarItem.id;
            col.className=styles.rowCol;
            col.style.flex=less400 ? "none":`1 0 ${partition}%`;
            const _desc=french ? descFr :desc;
            this.topbarRowInfoIcon({parent:col,desc:_desc});
            row.appendChild(col);

            const name=document.createElement("h6");
            const {cat,topbarCats}=topbarItem;
            name.className="text-center text-light display-6 lean my-1";
            name.style.textTransform="capitalize";
            const _cat:catType=french ? langConversion({key:cat}) as catType:cat;
            name.textContent=_cat;
            col.appendChild(name);
            const {button}=Resume.simpleButton({anchor:col,type:'button',bg:'black',color:'white',text:_cat,time:400});
            button.id=topbarItem.id;
            button.style.order=String(index);

            button.onclick=async (e:MouseEvent)=>{
                if(!e) return;
                //GENERATING SUB CAT
                const topbarCatRes= await this.openTopbarCats({
                    grandParent,
                    mainContainer,
                    row,
                    cat,
                    less400,
                    topbarCats,
                    mainResumes,
                    mainRefs,
                    mainLetters,
                    french
                })
                func(topbarCatRes,cat);
            };
        });
        
    };

    topbarRowInfoIcon({parent,desc}:{parent:HTMLElement,desc:string}){
        const cont=document.createElement("div");
        cont.id="topbarRow_info";
        cont.className=styles.topbarRowInfo;
        FaCreate({parent:cont,name:FaInfoCircle,cssStyle:{fontSize:"20px",backgroundColor:"blue",color:"white",padding:"1px",borderRadius:"50%"}});
        parent.appendChild(cont);
        cont.onclick=(e:MouseEvent)=>{
            if(!e) return;
            parent.className=styles.topbarRowCol;
            parent.setAttribute("data-topbar-desc",desc);

        };
        parent.onmouseout=(e:Event)=>{
            if(!e) return;
            parent.className=styles.rowCol;
            parent.removeAttribute("data-topbar-desc");
        }
    }


    
    openTopbarCats({grandParent,mainContainer,row,cat,less400,topbarCats,mainResumes,mainRefs,mainLetters,french}:{
        grandParent:HTMLElement,
        mainContainer:HTMLElement,
        row:HTMLElement,
        cat:string,
        topbarCats:topbarCatType[],
        less400:boolean,
        mainResumes:mainResumeType[],
        mainRefs:mainResumeRefType[],
        mainLetters:mainIntroLetterType[],
        french:boolean

    }):Promise<topbarCatResType[]>{
        //SUB CATAGORY LEVEL
       
        row.className=""
        Resume.cleanUp(row);
        Resume.cleanUpById({parent:mainContainer,id:"cat-name"});
        row.className=styles.topbarRow;
        const nameQuery=`h6#${this.titleId}`;
        const name=mainContainer.querySelector(nameQuery) as HTMLElement;
        name.textContent=french ? langConversion({key:cat}) :cat;
        name.style.order="-1";
        //BACK BUTTON
        const {button:back}=Resume.simpleButton({anchor:mainContainer,type:"button",bg:"black",color:'white',text:'back',time:400});
        row.style.order="0";
        back.style.order="0";
        back.id=this.backBtnId;
        back.onclick=async(e:MouseEvent)=>{
            if(!e) return;
            const titleName=this.titleName;
            const titleId=this.titleId;
            await this.getTopBar({
                parent:grandParent,
                mainContainer,
                titleName,
                titleId,
                less400,
                mainResumes,
                mainRefs,
                mainLetters,
                user:this.user,
                french
            });
        };
        //BACK BUTTON
        const arr:topbarCatResType[]=[];
        const len=topbarCats?.length || 1;
        const partition=Math.floor(100/len);
        topbarCats.forEach((item,index)=>{
            const {id,dataset,name:_name,desc,descFr,text,textFr,order}=item;
            const col=document.createElement("div");
            col.id=item.id;
            col.className=styles.rowCol;
            col.style.order=`order:${order};`;
            col.style.borderRight="1px solid black";
            col.style.flex=less400 ? "" :`1 0 ${partition}%`;
            const _desc=french ? descFr:desc;
            this.topbarRowInfoIcon({parent:col,desc:_desc});
            const name=document.createElement("h6");
            name.id=item.id +"-"+ String(index)+"-name";
            name.textContent=french? textFr:text;
            name.style.cssText="margin-inline:auto;text-transform:uppercase;letter-spacing:0.15rem;";
            col.appendChild(name);
            const innerCol=document.createElement("div");
            innerCol.id=item.id +"-inner";
            innerCol.setAttribute(dataset,"true");
            innerCol.className=styles.innerRowCol;
            innerCol.style.order=String(order);
            col.appendChild(innerCol);
            row.appendChild(col);
            const nameFr=french ? textFr :null
            arr.push({id:index,cat,ID:id,name:_name,nameFr,html:innerCol,redirect:item.redirect,order:order});
        });
        return Promise.resolve(arr) as Promise<topbarCatResType[]>
    };

        //-----------------NOT USED-----------------------///
   async verifyData({user}:{user:userType|null}){
        const hasResumes=!!(this.nameResumes && this.nameResumes.length>0);
        const hasRefs=!!(this.nameRefs && this.nameRefs?.length>0);
        const hasLets=!!(this.nameLetters && this.nameLetters?.length>0);
        if(user?.id){
            if(!hasResumes){
                const nameResumes= await this._service.getResumes({user_id:user.id});
                if(nameResumes){
                 this.nameResumes=nameResumes;
                 };
            };
           
            if(!hasRefs){
                const nameReferences= await this._service.getReferences({user_id:user.id});
                if(nameReferences){
                    this.resumeRef.nameRefs=nameReferences;
                    this.nameRefs=nameReferences
                }
            };
            if(!hasLets){
                const getnameLets=await this._service.getLetters({user_id:user.id});
                if(getnameLets){
                    this.nameLetters=getnameLets;
                }
            }

        }
    };

    pickupData({mainResumes,mainRefs,mainLetters}:{mainResumes:mainResumeType[],mainRefs:mainResumeRefType[],mainLetters:mainIntroLetterType[]}):{
        nameLetters:nameLetterType[],
        nameRefs:nameRefType[],
        nameResumes:nameResumeType[]
    }{
        
        const hasLetters=!!(mainLetters?.length);
        const hasResumes=!!(mainResumes?.length && mainResumes.length > 0);
        const hasRefs=!!(mainRefs?.length && mainRefs.length>0);
        if(hasLetters){
            // console.log("INSIDE PICK UP>HASLETTERS",mainLetters)//works
            this._mainLetters=mainLetters ;
            this.nameLetters=this._mainLetters.map(mainL=>({id:mainL.id,name:mainL.name,user_id:mainL.user_id,res_name_id:mainL.res_name_id}));
        }else{
            this._mainLetters=[] as mainIntroLetterType[];
            this.nameLetters=[] as nameLetterType[];
        }; if(hasResumes){
            this._mainResumes=mainResumes;
            this.nameResumes=this._mainResumes.map(mainL=>({id:mainL.id as number,enable:mainL.enable,name:mainL.name,user_id:mainL.user_id,french:mainL.french}));
            
            
        }else{
            this.mainResumes=[] as mainResumeType[];
            this.nameResumes=[] as nameResumeType[];
        }; if(hasRefs){
            this._mainRefs=mainRefs;
            this.nameRefs=this._mainRefs.map(mainL=>({id:mainL.id as number,name:mainL.name,user_id:mainL.user_id,res_name_id:mainL.res_name_id,french:mainL.french}));
          
        }else{
            this.mainRefs=[] as mainResumeRefType[];
            this.nameRefs=[] as nameRefType[];
        };

        return {nameLetters:this.nameLetters,nameResumes:this.nameResumes,nameRefs:this.nameRefs}
    };

    static executeOpen({mainContainer,openId,rowId,backBtnId,time,show,func}:{mainContainer:HTMLElement,openId:string,rowId:string,backBtnId:string,time:number,show:boolean,func:(openCont:HTMLElement)=>Promise<void>|void}){
        //THIS CLEANS OUT THE MAINCONTAINER EXCEPTE THE ROWID BOX THEN APPENDS A VIEW WITHIN THE openCont
        ([...mainContainer.children] as HTMLElement[]).map(child => {
            const check=[rowId,backBtnId].includes(child.id);
            if (child && !check) {
                mainContainer.removeChild(child);
            }
        });
        const openCont=document.createElement("div");
        openCont.id=openId;
        openCont.className=styles.innerMainOpenCont;
        mainContainer.appendChild(openCont);
        func(openCont);
        Resume.openCloseEffect({parent:mainContainer,target:openCont,time,show});
    };

    static noLetsResRefsMsg({parent,isRes,isLet,isRef,isEdit,french,noDataMsg}:{parent:HTMLElement,isRes:boolean,isLet:boolean,isRef:boolean,isEdit:boolean,french:boolean,noDataMsg:noDataMsgType}){
        const cont=document.createElement("div");
        cont.className=styles.noDataCont;
        const para=document.createElement("p");
        const msg=french ? noDataMsg.msgFr :noDataMsg.msg;
        if(isRes){
            para.textContent=msg;
            if(isEdit) para.textContent=`${msg} to edit`;
            cont.id=`no-data-Resume-msg`;

        }else if(isLet){
            para.textContent=msg;
            if(isEdit) para.textContent=`${msg} to edit`;
            cont.id=`no-data-letter-msg`;
        }else if(isRef){
            para.textContent=msg;
            if(isEdit) para.textContent=`${msg} to edit`;
            cont.id=`no-data-ref-msg`;
        }else{
            cont.id=`no-data-combined-msg`;
            para.textContent=msg;
        }
        cont.appendChild(para);
        parent.appendChild(cont);
    };


    static customButton(btn:{anchor:HTMLElement,type:"submit"|"button",isLeft:boolean,bg:string,color:string,text:string,alt:string|undefined,time:number}):{button:HTMLButtonElement}{
        const {anchor,bg,color,text,type,time,alt,isLeft}=btn;
        const button=document.createElement("button");
        const rand=Math.round(Math.random()*100);
        button.id=`custom-${type}-${rand}`;
        if(isLeft){
            button.className=styles.customButtonLeft;
        }else{

            button.className=styles.customButton;
        }
        button.classList.add("customButton");
        button.textContent=text;
        button.style.backgroundColor=bg;
        button.style.color=color;
        button.type=type;
        button.style.borderRadius="20px";
        button.classList.add("btnBoxShadow");
        const msg= alt || text;
        button.setAttribute("data-button",msg);
        if(!button.disabled){
            button.style.color=color;
            button.style.backdropFilter="";
            button.animate([
                {backdropFilter:"blur(20px)"},
                {backdropFilter:"blur(0px)"},
            ],{duration:1200,iterations:1});
        }else{
            button.style.color="transparent";
            button.style.backdropFilter="blur(10px)";
        }
        anchor.appendChild(button);
        button.onmouseover=(e:Event)=>{
            if(e){

                button.animate([
                    {color:color,background:bg,boxShadow:"1px 1px 12px 1px rgb(12, 175, 255)"},
                    {color:"black",background:"rgb(12, 175, 255)",boxShadow:"-1px -1px 12px 1px rgb(12, 175, 255)"},
                ],{iterations:1,duration:time})
            }
        };
        button.onmouseout=(e:Event)=>{
            if(e){

                button.animate([
                    {color:"black",background:"rgb(12, 175, 255)",boxShadow:"-1px -1px 12px 1px rgb(12, 175, 255)"},
                    {color:color,background:bg,boxShadow:"1px 1px 12px 1px rgb(12, 175, 255)"},
                ],{iterations:1,duration:time})
            }
        };
        button.style.zIndex="0"
        return {button};
    };
};
export default Topbar;
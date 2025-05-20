import FormComponents from "./formComponents";
import { contactRefType, linkType, mainResumeRefType, nameRefType, resumeRefType, topbarCatType, userType } from "./refTypes";
import styles from "./createRef.module.css";
import Resume from "./resume";
import Service from "@/components/common/services";
import EditResume from "./editResume";
import ViewReference from "./viewReference";
import Topbar from "./topbar";
import { langReference } from "./engFre";


class CreateRef{
    public readonly topbarCats:topbarCatType[]=Topbar.topbarCats;
    public rowId:string;
    public containerId:string;
private _mainRefs:mainResumeRefType[];
private _mainRef:mainResumeRefType;
private _references:resumeRefType[];
private _initReferences:resumeRefType[];
private _reference:resumeRefType;
private _nameRefs:nameRefType[];
private _nameRef:nameRefType;
public links:linkType[];
private _contact:contactRefType;
private _contacts:contactRefType[];
public count:number;



    constructor(private _service:Service,private formComp:FormComponents,private viewRef:ViewReference,private _user:userType|null){
        this.topbarCats=Topbar.topbarCats;
        this.rowId="";

        this.containerId="";

        this._mainRefs=[] as mainResumeRefType[];
    this.count=0;
    this._contact={
        id:0,
        name:"name",
        cell:"",
        address:"",
        city:"",
        email:""
    };
    this._contacts=[this._contact];
    this._mainRef={} as mainResumeRefType;
   

    this._mainRefs=this._user ? this._user.references as mainResumeRefType[] : [] as mainResumeRefType[];
    this.nameRefs=this._user ? this._user.references.map(kv=>({id:kv.id as number,name:kv.name,user_id:kv.user_id,res_name_id:kv.res_name_id,french:kv.french})) : [] as nameRefType[]
    
    this.links=[{name:"ablogroom",link:"https://www.ablogroom.com"},{name:"example",link:"https://example.com"}]
    this._reference={
        id:0,
        res_name_id:undefined,
        name:"name",
        composite:"composed of",
        desc:"description",
        mainLink:"https://www.yourSite.com",
        links:this.links,
        contacts:this._contacts
    };
    this._references=[this._reference];
    this._mainRef={
        id:0,
        name:"",
        user_id:this._user?.id || "",
        res_name_id:"",
        french:false,
        references:this._references
    }
    this._initReferences=[this.formComp.addRemove.reference];
    this._nameRef={} as nameRefType;
    this._nameRefs=[] as nameRefType[];
    }

    //-------------GETTER/SETTERS-----------//
    
    get user(){
        return this._user;
    };
    set user(user:userType|null){
        this._user=user;
    };
    get mainRefs(){
        return this._mainRefs;
    };
    set mainRefs(mainRefs:mainResumeRefType[]){
        this._mainRefs=mainRefs;
    };
    get mainRef(){
        return this._mainRef;
    };
    set mainRef(mainRef:mainResumeRefType){
        this._mainRef=mainRef;
    };
    get references(){
        return this._references
    };
    set references(references:resumeRefType[]){
        this._references=references
    };
    get nameRef(){
        return this._nameRef;
    };
    set nameRef(nameRef:nameRefType){
        this._nameRef=nameRef;
    };
    get nameRefs(){
        return this._nameRefs;
    };
    set nameRefs(nameRefs:nameRefType[]){
        this._nameRefs=nameRefs;
    };
    //-------------GETTER/SETTERS-----------//

    main({parent,user,french,func}:{parent:HTMLElement,user:userType|null,french:boolean,func:(mainRefs:mainResumeRefType[])=>Promise<void>|void}){
        const less400=window.innerWidth < 400;
        const less900=window.innerWidth < 900;
        const css_col="display:flex;justify-content:flex-start;align-items:center;gap:1rem;flex-direction:column;padding-inline:1rem;";
        const css_row="display:flex;flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:nowrap;";
        const mainCreateRef=document.createElement("section");
        mainCreateRef.id="main-create-ref";
        mainCreateRef.className=styles.mainCreateRef;
        mainCreateRef.style.order="2";
        parent.appendChild(mainCreateRef);
        if(!this.references){
            this.references=this._initReferences;
        };
        if(french) this.references=[langReference({french,user:this.user})];
       this.addReferences({grandParent:parent,parent:mainCreateRef,french,references:this.references,less400,less900,css_col,css_row,user,func});
       
       const dividerCont=document.createElement("div");
       dividerCont.id="create-ref-main-divider-cont";
       dividerCont.className=styles.dividerCont;
       dividerCont.style.order="3";
       mainCreateRef.appendChild(dividerCont);
       ///-----------------------BUTTON-------------------------------///
       const outerBtnDiv=document.createElement("div");
       outerBtnDiv.id="outer-btn-div";
       outerBtnDiv.className=styles.outerBtnDiv;
       const btnDiv=document.createElement("div");
       btnDiv.id="btn-cont";
       btnDiv.className=styles.btnCont;
       btnDiv.style.backgroundColor="white";
       outerBtnDiv.appendChild(btnDiv);
       mainCreateRef.appendChild(outerBtnDiv);
       const {button}=Resume.simpleButton({anchor:btnDiv,type:"button",bg:"black",color:"white",text:"save",time:400});
       button.style.order="4"
       button.onclick=(e:MouseEvent)=>{
        if(e){
            
            this.savereference({grandParent:parent,parent:mainCreateRef,references:this.references,less900,less400,css_col,css_row,user,func});
        }
       };
       ///-----------------------BUTTON-------------------------------///
    };




    addReferences({grandParent,parent,references,french,less400,less900,css_col,css_row,user,func}:{grandParent:HTMLElement,parent:HTMLElement,references:resumeRefType[],french:boolean,less400:boolean,less900:boolean,css_col:string,css_row:string,user:userType|null,func:(mainRefs:mainResumeRefType[])=>Promise<void>|void}){
       
        
        const innerCreateRef=document.createElement("div");
        innerCreateRef.id="inner-create-ref";
        innerCreateRef.style.order="-1";
        innerCreateRef.className=styles.mainInnerCreateRef;
        parent.appendChild(innerCreateRef);
        
        this.formComp.addRemove.addReference({
            parent:innerCreateRef,
            css_col,
            references,
            less400,
            french,
            func:(references)=>{
                Resume.cleanUpById({parent,id:"inner-create-ref"});
                this.addReferences({grandParent,parent,references,less400,less900,french,css_col,css_row,user,func});
            }
        });
        
       this.references =references.map((reference,index)=>{
        const dividerCont=document.createElement("div");
        dividerCont.id="create-ref-main-divider-cont";
        dividerCont.className=styles.dividerCont;
        dividerCont.style.order=String(index);
        innerCreateRef.appendChild(dividerCont);

                this.count++;
                reference.id=index;
                const refCardCont=document.createElement("div");
                refCardCont.id="ref-card-cont";
                refCardCont.className=styles.refCardCont;
                refCardCont.style.order=String(index+1);
                const name=document.createElement("h6");
                name.className="text-center my-1 mb-2 text-primary lean";
                name.style.fontSize="130%";
                name.textContent=`Reference card-${index}`;
                refCardCont.appendChild(name);
                innerCreateRef.appendChild(refCardCont);
                this.formComp.addRemove.removeReference({
                    target:refCardCont,
                    css_col,
                    references,
                    reference,
                    less400,
                    func:(references)=>{
                        Resume.cleanUpById({parent,id:"inner-create-ref"});
                        this.addReferences({grandParent,parent,references,less400,french,less900,css_col,css_row,user,func});
                    }
                });
               reference= this.formComp.referenceComponent({parent:refCardCont,reference,less400,french});
          
            return reference;
        });
     
    };


    savereference({grandParent,parent,references,less900,less400,css_col,css_row,user,func}:{grandParent:HTMLElement,parent:HTMLElement,references:resumeRefType[],less900:boolean,less400:boolean,css_col:string,css_row:string,user:userType|null,
        func:(mainRefs:mainResumeRefType[])=>Promise<void>|void
    }){
        const rand=Math.floor(Math.random()*100);
        const popup=document.createElement("div");
        popup.id="main-resume-ref-popup";
        popup.className=styles.genericPopup;
        popup.style.width="300px"
        popup.style.height="300px"
        const name=document.createElement("p");
        name.id="save-name";
        name.className="text-center text-primary my-1 lean";
        name.style.cssText="text-transform:Calitalize;letter-spacing:0.18rem;font-size:120%;order:1;";
        name.textContent="file name";
        popup.appendChild(name);
        parent.appendChild(popup);
        const form=document.createElement("form");
        form.className=styles.form;
        form.style.order="2";
        //FILENAAME
        const {input,label,formGrp}=EditResume.inputComponent(form);
        formGrp.className=styles.form;
        formGrp.classList.add("form-group");
        input.id="name-"+ String(rand);
        input.name="name";
        input.type="text";
        label.setAttribute("for",input.id);
        //FRENCH OR ENGLISH
        const {input:inputIsFr,label:labelIsFr,formGrp:grpIsFr}=EditResume.inputComponent(form);
        grpIsFr.className=styles.form;
        grpIsFr.classList.remove("form-group");
        formGrp.classList.add("form-group");
        inputIsFr.id="isFr-"+ String(rand);
        inputIsFr.classList.remove("form-control");
        inputIsFr.name="isFr";
        inputIsFr.type="checkbox";
        labelIsFr.setAttribute("for",inputIsFr.id);
        labelIsFr.textContent="French / Français ?";
        (inputIsFr).value="false";
        //FRENCH OR ENGLISH
        Resume.simpleButton({anchor:form,text:"submit",color:"white",bg:"black",type:"submit",time:400});
        popup.appendChild(form);
        Resume.deletePopup({parent,target:popup});
        form.onsubmit=async(e:Event)=>{
            if(e && user){
                e.preventDefault();
                const rand=Math.floor(Math.random()*1000);
                const formdata=new FormData(e.currentTarget as HTMLFormElement);
                const name=formdata.get("name") as string;
                const isFr=Boolean(formdata.get("isFr") as string);
                const _name=`${name.split(" ").join("_").trim()}_${rand}`;
                this.mainRef={...this.mainRef,references,user_id:user.id,name:_name,french:isFr};
                await this._service.saveReferences({mainReference:this.mainRef}).then(async(res)=>{
                    if(res){
                        
                        this.user=user;
                        this.mainRef=res;
                        const {id,name,references,french}=res
                        this.references=references;
                        this.mainRefs=[...this.mainRefs,res];
                        this.nameRefs=[...this.nameRefs,{id:id as number,name,user_id:this.user.id,res_name_id:undefined,french}];
                        this.viewRef.mainResumerefs=this.mainRefs;
                        this.viewRef.nameRefs=[...this.nameRefs];
                        popup.animate([
                            {transform:"scale(1)",opacity:"1"},
                            {transform:"scale(0)",opacity:"0"},
                        ],{duration:400,iterations:1,"easing":"ease-in-out"});
                        setTimeout(()=>{
                            parent.removeChild(popup);
                            Resume.message({parent,msg:"saved",type:"success",time:600});
                            setTimeout(()=>{

                                ([...grandParent.children] as HTMLElement[]).forEach(child=>{
                                    if(child && child.id !==this.rowId){
                                        grandParent.removeChild(child)
                                    }
                                });
                                this.viewRef.showReferences({parent:grandParent,name,references,less400,less900,css_col,css_row,toPrint:false,show:true,time:1500,french});
                                func(this.mainRefs)
                            },580);
                        },380);
                    }
                });
            };
        };

        popup.appendChild(name);


    };

    getdataset({name,cat}:{name:string,cat:"resumes"|"references"|"letters"|"combined"}){
        const getDataset=Topbar.topbarCats.filter(kv=>(kv.cat===cat)).find(kv=>(kv.name===name)) as topbarCatType;
        const dataset=getDataset.dataset;
        return dataset
    }

   

};

export default CreateRef;

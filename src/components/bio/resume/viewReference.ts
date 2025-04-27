import { contactRefType, linkType, mainResumeRefType, nameRefType, resumeRefType } from "./refTypes";
import Resume from "./resume";
import Service from "@/components/common/services";
import styles from "./viewRef.module.css";
import DeleteClass from "./deleteClass";


class ViewReference {
   private _mainResumerefs:mainResumeRefType[];
   private _references:resumeRefType[];
   private _nameRefs:nameRefType[];
   private _nameRef:nameRefType;
    public show:boolean;
    constructor(private _service:Service,private _deleteClass:DeleteClass){
        this._nameRefs=[] as nameRefType[];
        this._nameRef={} as nameRefType;
        this._mainResumerefs=[] as mainResumeRefType[];
        this.show=false;
        this._references=[] as resumeRefType[];
    };
    //GETTERS/SETTERS
    get mainResumerefs(){
        return this._mainResumerefs;
    };
    set mainResumerefs(mainResumerefs:mainResumeRefType[]){
        this._mainResumerefs=mainResumerefs;
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
    //GETTERS/SETTERS

    async main({parent,name,less400,less900,css_col,css_row,buttonEffect,toPrint,func1}:{parent:HTMLElement,name:string,less400:boolean,less900:boolean,css_col:string,css_row:string,buttonEffect:boolean,toPrint:boolean,
        func1:(mainRef:mainResumeRefType)=>Promise<void>|void
    }){
        const width=less900 ? (less400 ? "100%":"90%"):"75%";
        let show=this.show;
        const time=1000;
        const {mainReference}= await this.storeReferences({name}) as {mainReference:mainResumeRefType};
       
        if(mainReference){

            const mainRefsCont=document.createElement("section");
            mainRefsCont.id="main-refs-cont";
            mainRefsCont.className=styles.mainRefsCont;
            const {references}=mainReference;
            if(buttonEffect){
                const title=document.createElement("h4");
                title.id="resumeRefs-title";
                title.textContent="site summary";
                title.style.cssText="text-transform:uppercase;margin-top:1rem;";
                title.style.lineHeight=less900 ? (less400 ? "1.25rem":"1.50rem"):"1.75rem";
                const btnDiv=document.createElement("div");
                btnDiv.id="container-btnDiv";
                btnDiv.style.cssText=css_row + "margin-inline:0;gap:1.5rem";
                const _name=document.createElement("h4");
                _name.style.cssText="text-transform:uppercase;";
                _name.style.fontSize="100%";
                _name.style.order="0";
                _name.textContent="work reference";
                btnDiv.appendChild(_name);
                const {button:btn}=Resume.simpleButton({anchor:btnDiv,type:"button",bg:"black",color:"white",text:"open",time:400});
                btn.style.order="1";
               
                    btn.onclick=(e:MouseEvent)=>{
                        if(!e) return;
                        if(!show){
                            show=true;
                            _name.style.opacity="0";
                            _name.style.transition="opacity 1s ease-in-out";
                            btn.textContent="close";
                            this.showReferences({parent:mainRefsCont,name,less400,less900,css_col,css_row,references,show,time,toPrint});
                        }else{
                            show=!show;
                            _name.style.opacity="1";
                            _name.style.transition="opacity 1s ease-in-out";
                            btn.textContent="open";
                            this.showReferences({parent:mainRefsCont,name,less400,less900,css_col,css_row,references,show,time,toPrint});
                            this._deleteClass.deleteReF({parent,target:mainRefsCont,mainRef:mainReference,
                                func:({mainRefs,nameRefs})=>{
                                    this.mainResumerefs=mainRefs;
                                    this.nameRefs=nameRefs;
                                  
                                    func1(mainReference);
                                },
                            })
                        }
                    };

                    Resume.lineDivison({parent:mainRefsCont,width,background:"lightblue"});
                    mainRefsCont.appendChild(btnDiv);
                    Resume.lineDivison({parent:mainRefsCont,width,background:"lightblue"});
            }else{
                Resume.lineDivison({parent:mainRefsCont,width,background:"lightblue"});
                this.showReferences({parent:mainRefsCont,name,less400,less900,css_col,css_row,references,show:true,time:1500,toPrint});
                this._deleteClass.deleteReF({parent,target:mainRefsCont,mainRef:mainReference,
                    func:({mainRefs,nameRefs})=>{
                        this.mainResumerefs=mainRefs;
                        this.nameRefs=nameRefs;
                        func1(mainReference);
                    },
                })
                Resume.lineDivison({parent:mainRefsCont,width,background:"lightblue"});
            }
         
            parent.appendChild(mainRefsCont);
        }
    };



    async storeReferences({name}:{name:string}):Promise<{mainReference:mainResumeRefType}|undefined>{

        const hasRefs=this.mainResumerefs.find(kv=>(kv.name===name))
        if(!hasRefs){
            const mainReference = await this._service.getReference({name});
            if(mainReference){
                const {id,name,user_id,res_name_id}=mainReference;
                this.nameRef={id:id as number,user_id,res_name_id,name};
                const check=this.nameRefs.find(kv=>(kv.name===name));
                if(!check) this.nameRefs=[...this.nameRefs,this.nameRef];
                this.mainResumerefs=[...this.mainResumerefs,mainReference];
                const {references}=mainReference;
                this.references=references
                return {mainReference:mainReference}
                
            }
        }else{
            const {name}=hasRefs;
            const check=this.nameRefs.find(kv=>(kv.name===name));
                if(!check) this.nameRefs=[...this.nameRefs,this.nameRef];
            this.references=hasRefs.references;
            return {mainReference:hasRefs}
        };
        
    };

    showReferences({parent,references,name,less400,less900,css_col,css_row,show,time,toPrint}:{parent:HTMLElement,references:resumeRefType[],name:string,less400:boolean,less900:boolean,css_col:string,css_row:string,show:boolean,time:number,toPrint:boolean}){
       
        const innerMainRefsCont=document.createElement("div");
        innerMainRefsCont.id="inner-main-ref-cont";
        innerMainRefsCont.className=styles.innerMainRefsCont;
        references.map((reference,index)=>{
            this.refCard({parent:innerMainRefsCont,less400,less900,css_col,css_row,reference,index});
        });
        parent.appendChild(innerMainRefsCont);
        ViewReference.showEffect({parent,target:innerMainRefsCont,time,show});
        if(toPrint){
            const {button:print}=Resume.simpleButton({anchor:innerMainRefsCont,type:"button",bg:"black",color:"white",text:"print",time:400});
            print.onclick=(e:MouseEvent)=>{
                if(!e) return;
                const newUrl=new URL("/print",window.location.origin);
                newUrl.searchParams.set("nameRef",name);
                window.location.href=newUrl.href;
            };
        }
    };


    refCard({parent,less400,less900,css_col,css_row,reference,index}:{parent:HTMLElement,less400:boolean,less900:boolean,css_col:string,css_row:string,reference:resumeRefType,index:number}){
        const {name,desc,composite,mainLink,links,contacts}=reference;
        const card=document.createElement("div");
        card.className=styles.innerMainRefCard;
        card.id="refCard-cont-" + String(index);
        card.style.width=less900 ? (less400 ? "100%" : "85%"): "80%";
        this.headerRef({parent:card,name,desc,composite,mainLink,links,contacts,css_col,css_row,less900,less400});
        parent.appendChild(card);
    };


    headerRef({parent,name,desc,composite,mainLink,links,contacts,css_col,css_row,less900,less400}:{parent:HTMLElement,name:string,desc:string,composite:string,mainLink:string,links:linkType[],contacts:contactRefType[],css_col:string,css_row:string,less900:boolean,less400:boolean}){
        const container=document.createElement("div");
        container.id="refCardHeader";
        container.className=styles.refCardHeader;
        container.style.width="100%";
        const contRow=document.createElement("div");
        contRow.id="headerRef-contRow";
        contRow.className=styles.contRow;
        container.appendChild(contRow);
        this.leftSideHeader({parent:contRow,name,desc,css_col,less400,less900});
        this.rightSideHeader({parent:contRow,mainLink,composite,css_col,less400});
        this.contactsRef({parent:container,contacts,less400});
        if(links?.length>0){
            this.linksRef({parent:container,links,less400,less900,css_row});
        };
        parent.appendChild(container);
    };


    linksRef({parent,links,less400,less900,css_row}:{parent:HTMLElement,links:linkType[],less400:boolean,less900:boolean,css_row:string}){
        if(links?.length >0){
            const linkCont=document.createElement("div");
            linkCont.id="links-cont";
            linkCont.className=styles.refCardLinkCont;
            parent.appendChild(linkCont);
            const row=document.createElement("div");
            row.id="links-cont-row";
            row.style.cssText=css_row +"margin-inline:auto;width:100%;margin-block:1rem;";
            row.style.flexDirection=less400 ? "column":"row";
            row.style.alignItems=less400 ? "center":"stretch";
            const col1=document.createElement("div");
            col1.id="row-left-side";
            col1.style.cssText="margin-inline:auto;align-self:center;justify-self:center;order:0;";
            col1.style.flex=less400 ? "1 0 100%":"0 0 30%";
            col1.style.width=less400 ? "100%":"auto";
            const leftName=document.createElement("h6");
            leftName.className="text-primary text-center display-6 lean";
            leftName.textContent="Related links";
            leftName.style.fontSize="150%";
            col1.appendChild(leftName);
            row.appendChild(col1);
            const col2=document.createElement("div");
            col2.id="row-right-side";
            col2.className=styles.linksRefRowRightSide;
            row.appendChild(col2);
            links.map((link,ind)=>{
                this.refLinks({parent:col2,link,less400,less900,css_row,index:ind});
            });
            linkCont.appendChild(row);

        };

    };

    leftSideHeader({parent,name,desc,css_col,less400,less900}:{parent:HTMLElement,name:string,css_col:string,desc:string,less400:boolean,less900:boolean}){
        const leftSide=document.createElement("div");
        leftSide.id="contRow-left-side";
        leftSide.className=styles.headerLeftSide;
       
        leftSide.style.padding=less400 ? "0.25rem": "1rem";
        const title=document.createElement("h6");
        title.className="display-6 mx-0 mt-1 mb-0 lean text-primary ";
        title.id="left-name";
        title.textContent=name;
        title.style.marginBottom="0";
        title.style.cssText="text-transform:capitalize;margin-block:0.25rem;";
        title.style.fontSize=less900 ? (less400 ? "110%" : "145%"): "180%";
        const desc_=document.createElement("p");
        desc_.className="";
        desc_.id="left-desc";
        desc_.innerHTML=`<span style=color:blue;>description: </span>${desc}`;
        leftSide.appendChild(title);
        leftSide.appendChild(desc_);
        parent.appendChild(leftSide);
    };

    rightSideHeader({parent,mainLink,composite,css_col,less400}:{parent:HTMLElement,mainLink:string,css_col:string,composite:string,less400:boolean}){
        const rightSide=document.createElement("div");
        rightSide.id="contRow-right-side";
        rightSide.className=styles.headerRightSide;
        rightSide.style.padding=less400 ? "0.25rem": "1rem";
        const anchor=document.createElement("a");
        anchor.classList.add("data-main-link");
        anchor.id="right-main-link";
        anchor.style.cssText="cursor:pointer;text-wrap:pretty;";
        anchor.innerHTML=`<span style=color:blue;>link: </span>${mainLink}`;
        anchor.href=mainLink;
        const composite_=document.createElement("p");
        composite_.className="";
        composite_.id="right-composite";
        composite_.style.cssText="text-wrap:pretty;";
        composite_.innerHTML=`<span style=color:blue;>composite:</span>${composite}`;
        composite_.style.display=less400 ? "flex":"";
        composite_.style.flexDirection=less400 ? "column":"";
        composite_.style.alignItems=less400 ? "stretch":"";
        rightSide.appendChild(composite_);
        rightSide.appendChild(anchor);
        parent.appendChild(rightSide);
    };

    refLinks({parent,link,less400,less900,css_row,index}:{parent:HTMLElement,link:linkType,less400:boolean,less900:boolean,css_row:string,index:number}){
        const row=document.createElement("div");
        row.id="link"+ String(index);
        row.style.cssText=css_row + "width:100%;align-items:center;justify-content:flex-start;";
        row.style.flexDirection=less400 ? "column":"row";
        row.style.flexWrap=less400 ? "wrap":"nowrap";
        row.style.alignItems=less400 ? "stretch":"center";
        row.style.marginLeft=less900 ? (less400 ? "0.25rem":"0.5rem"):"1.5rem";
        row.className="row mx-0 ml-1";
        //name
        const span=document.createElement("small");
        span.id="name-span";
        span.style.cssText=css_row + "align-items:center;gap:5px;flex-wrap:nowrap;";
        span.style.color="blue";
        span.style.flex=less400 ? "1 0 100%":"1 0 30%";
        span.style.order="0";
        const text=new Text("Cat: ");
        const name=document.createElement("span");
        name.id="link-name";
        name.style.color="black";
        name.textContent=link.name;
        span.appendChild(text);
        span.appendChild(name);
        row.appendChild(span);
        //link
        const anchor=document.createElement("a");
        anchor.id="link-name";
        anchor.style.flex=less400 ? "1 0 100%":"1 0 70%";
        anchor.style.order="1";
        const _name=Resume.convertSitename({site:link.link}).pathname;
        anchor.textContent=_name;
        anchor.href=link.link;
        row.appendChild(anchor);
        parent.appendChild(row);
    };

    contactsRef({parent,contacts,less400}:{parent:HTMLElement,contacts:contactRefType[],less400:boolean}){
        if(contacts?.length){

            const contactCont=document.createElement("div");
            contactCont.id="contacts-cont";
            contactCont.className=styles.contactRefCont;
            parent.appendChild(contactCont);
            const name=document.createElement("h6");
            name.className="display-6 text-primary lean text-center my-1";
            name.textContent="Contacts";
            contactCont.appendChild(name);
            contacts.forEach((contact,index)=>{
                if(contact){
                    this.contactCard({parent:contactCont,contact,index,less400});
                }
            });
        };
        
        
    };

    contactCard({parent,contact,index,less400}:{parent:HTMLElement,contact:contactRefType,index:number,less400:boolean}){
        let count=0;
        const cont=document.createElement("div");
        cont.id="contact-cont-"+ String(index);
        cont.style.cssText="margin-inline:auto;width:100%;margin-block:1rem;border:1px solid lightblue;border-radius:6px;padding-block:0.5rem;";
        cont.className=styles.css_col;
        cont.style.alignItems=less400 ? "center":"stretch";
        cont.style.order=String(index);
        parent.appendChild(cont);
        for(const [key,value] of Object.entries(contact)){
            if(key!=="id" && typeof(key)==="string"  && typeof(value)==="string"){
                const row=document.createElement("div");
                row.id="contacts-cont-row-"+String(index);
                row.style.cssText="width:100%;margin-block:0;";
                row.className=styles.css_row;
                row.style.flexWrap="wrap";
                row.style.lineHeight="1rem";
                row.style.flexDirection=less400 ? "column":"row";
                row.style.alignItems=less400 ? "center":"stretch";
                row.style.order=String(index);
                cont.appendChild(row);

                const col1=document.createElement("div");
                col1.id="row-left-side";
                col1.style.cssText="margin-inline:auto;align-self:center;justify-self:center;order:0;";
                col1.style.flex=less400 ? "1 0 100%":"0 0 20%";
                col1.style.width=less400 ? "100%":"auto";
                col1.style.order=String(count);
                const leftName=document.createElement("h6");
                leftName.className="text-primary text-center display-6 lean";
                leftName.textContent=key;
                leftName.style.fontSize="120%";
                col1.appendChild(leftName);
                row.appendChild(col1);
                const col2=document.createElement("div");
                col2.id="row-right-side";
                col2.style.order=String(count+1);
                col2.className=styles.linksRefRowRightSide;
                const para=document.createElement("p");
                para.id=`para-${index}-${count}`;
                para.textContent=value;
                col2.appendChild(para);
                row.appendChild(col2);
                count++;
            }
        }
    }

    static showEffect({parent,target,time,show}:{parent:HTMLElement,target:HTMLElement,time:number,show:boolean}){
        const nodeName=target.nodeName.toLowerCase();
        const gettarget=parent.querySelector(`${nodeName}#${target.id}`) as HTMLElement;
        if(show){
          
            gettarget.style.opacity="1";
            gettarget.animate([
                {opacity:"0"},
                {opacity:"1"},
            ],{duration:time,iterations:1,"easing":"ease-in"});
        }else{
          
            gettarget.style.opacity="0";
            gettarget.animate([
                {opacity:"1"},
                {opacity:"0"},
            ],{duration:time,iterations:1,"easing":"ease-out"});
            setTimeout(()=>{
                Resume.cleanUpById({parent,id:gettarget.id});
            },time);
        };
    }


};
export default ViewReference;
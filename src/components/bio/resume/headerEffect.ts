import Topbar from "./topbar";
import styles from "./headerTop.module.css";
import Resume from "./resume";
import { introResumeType, mainIntroLetterType, mainResumeRefType, mainResumeType, userType } from "./refTypes";
import PageHistory from "@/components/common/pageHistory";

import MainAdvertise from "../advertisment/mainAdvertise";
import { langConversion } from "./engFre";


class HeaderEffect{
    public readonly introResumes:introResumeType[]
    public readonly castleImg:string;
    public readonly mainImg:string;
    private _mainRefs:mainResumeRefType[];
    private _mainResumes:mainResumeType[];
    private _mainLetters:mainIntroLetterType[]
   public rowId:string;
   public dataRow:string;
   public containerId:string;
   public containerData:string
    public row:HTMLElement;
    public mainContainer:HTMLElement;
    public headerContId:string;
    public readonly titleId:string;
  
///ADD BUTTON TO HEADER EFFECT FOR ADVERTISEMENT( TOPLEFT CORNER ( WITH ICON AS DISPLAY))
    constructor(public topbar:Topbar,public pageHistory:PageHistory,private _user:userType|null,public advertise:MainAdvertise){
        this._mainLetters=[] as mainIntroLetterType[];
        this._mainResumes=[] as mainResumeType[];
        this._mainRefs=[] as mainResumeRefType[];
        this._mainLetters=this._user?.letters as mainIntroLetterType[] ||[] as mainIntroLetterType[];
        this._mainResumes=this._user?.resumes as mainResumeType[]||[] as mainResumeType[];
        this._mainRefs=this._user?.references as mainResumeRefType[] || [] as mainResumeRefType[];
        // console.log("this._mainLetters",this._mainLetters)//works
        this.castleImg="/images/castleOcean.png";
        this.mainImg="/images/main.png";
        this.titleId="main-title-id";
        this.row={} as HTMLElement;
        this.headerContId="header-cont";
        this.mainContainer={} as HTMLElement;
        this.rowId=this.topbar.rowId;
        this.dataRow=this.topbar.dataRow;
        this.containerId="container-resumes";
        this.containerData="section[data-resume-container]";
        this.dataRow=""
        this.topbar.containerId=this.containerId
       
        this.introResumes=[
            {id:0,name:"single page dynamic display/builder",desc:"3 pre-designed catagories",img:this.mainImg,isDark:false},
            {id:1,name:"letter builder",desc:"build professinal letter with ease",img:this.castleImg,isDark:false},
            {id:2,name:"Resume builder",desc:"Professional template",img:this.castleImg,isDark:false},
            {id:3,name:"Reference builder",desc:"for your references",img:this.castleImg,isDark:false},
            {id:4,name:"single && combined display",desc:"full online width easy pdf printing",img:this.castleImg,isDark:false},
            {id:5,name:"Pre-design templates",desc:" resume, references && intro letter-no formatting required",img:this.castleImg,isDark:false},
            {id:6,name:"Resume Builder",desc:"The Best in Canada, with confidence",img:this.mainImg,isDark:true},
        ];

       

       
    };

    get user(){
        return this._user
    }
    set user(user:userType|null){
        this._user=user;
       
    }
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
        this._mainResumes=mainResumes
        
    }
    get mainRefs(){
        return this._mainRefs
    }
    set mainRefs(mainRefs:mainResumeRefType[]){
        this._mainRefs=mainRefs;
       
    }

   

    main({parent,less400,french}:{parent:HTMLElement,less400:boolean,french:boolean}){
      
        Resume.cleanUpById({parent,id:this.headerContId});
        this.header({parent});
        Resume.cleanUpById({parent,id:this.containerId});
        const mainContainer=document.createElement("section");
        mainContainer.id="container-resumes";
        mainContainer.setAttribute("data-resume-container","true");
        mainContainer.className=styles.containerResumes;
        parent.appendChild(mainContainer);
        const titleId=this.titleId;
        const titleName=french ? langConversion({key:"Resume Portfolio Editor"}):"Resume Portfolio Editor";
        this.topbar.getTopBar({
            parent,
            mainContainer,
            titleId,
            titleName,
            less400,
            french,
            mainResumes:this.mainResumes,
            mainRefs:this.mainRefs,
            mainLetters:this._mainLetters,
            user:this.user as userType
            
        });
      
        Resume.lineDivison({parent:mainContainer,width:"100%",background:"lightblue"});
        
    };

    header({parent,}:{parent:HTMLElement}){
        let count=0;
        const isLimit= this.pageHistory.main({limit:1});
        const headerCont=document.createElement("div");
        headerCont.id=this.headerContId;
        headerCont.className=styles.headerCont;
        const row=document.createElement("div");
        row.className=styles.headerEffectRow;
        headerCont.appendChild(row);
        const items=this.introResumes;
        const len=items.length;
        const time=7000;
        if(!isLimit){

            this.changeScreen({row,id:-1,items});
            const getInterval=setInterval(()=>{
                    if(count<=len){
                        this.changeScreen({row,id:count,items});
                        count++;
                    }else{
                        clearInterval(getInterval)
                    };
            },time)
        }else{
            this.changeScreen({row,id:len-2,items});
        }

        parent.appendChild(headerCont);
    };

    changeScreen({row,id,items}:{row:HTMLElement,id:number,items:introResumeType[]}){
        //fade-out +get next slide; fade-in
        const len=items.length;
        if(id <=len){
            const getCurrent=items.find(kv=>(kv.id===(id)));
            const getNext=items.find(kv=>(kv.id===(id+1)));
            if(getCurrent && id <len-1){

                this.buildShowSlide({row,item:getCurrent,show:false,len});
            }
            if(getNext){
                this.buildShowSlide({row,item:getNext,show:true,len});
            }
        }
    };


    buildShowSlide({row,item,show,len}:{row:HTMLElement,item:introResumeType,show:boolean,len:number,}){
        const {id,name,desc,isDark}=item;
        let getCol=row.querySelector(`div#col-${id}`) as HTMLElement;
        if(!getCol){
            getCol=document.createElement("div");
            getCol.id=`col-${id}`;
            getCol.style.order=String(id);
            getCol.style.backgroundImage=`url(${this.mainImg})`;
            getCol.style.flex="1 0 100%";
            getCol.style.width="100%";
            getCol.style.zIndex="0";
            const title=document.createElement("h6");
            title.className="text-primary text-center lean display-6";
            title.textContent=name;
            if(isDark) title.classList.add("text-light");
            title.style.textTransform="capitalize";
            const para=document.createElement("p");
        
            if(id===len-1){
                console.log("len",id)
                para.className=styles.headerLastPara
            }else{

                para.className=styles.colPara;
            };
            para.classList.add("text-center");
            para.classList.add("lean");
            if(isDark) para.classList.add("text-light");
            else para.classList.add("text-primary");
            para.textContent=desc;
            getCol.appendChild(title);
            getCol.appendChild(para);
            row.appendChild(getCol);
            getCol.hidden=true;
        };
        
        if(show){
            getCol.style.zIndex="1";
            getCol.className=styles.headerCol;
            getCol.hidden=false;
        }else{
            getCol.className="";
            getCol.style.opacity="0";
            getCol.hidden=true;
           
        };
    };

};
export default HeaderEffect;
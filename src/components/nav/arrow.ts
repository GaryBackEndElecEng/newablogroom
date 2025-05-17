
import { FaAccessibleIcon, FaBlog,FaInfo,FaEdit,FaHome,FaMedapps,FaSign,FaFilePowerpoint,FaArrowRight} from "react-icons/fa";
import { navLinkBtnType, userType, blogType, } from "../editor/Types";
import { FaBtn, FaCreate } from "../common/ReactIcons";
import { BiSolidReport } from "react-icons/bi";
import * as Icons from "react-icons/fa";
import Header from '../editor/header';
import RegSignIn from './regSignin';
import Service from '../common/services';
import User from '../user/userMain';
import ModSelector from '../editor/modSelector';
import Misc from '../common/misc/misc';
import Nav from './headerNav';
import MainHeader from './mainHeader';
import Profile from '../profile/profile';
import Features from '../home/feature';
import AuthService from "../common/auth";
import { FaRightLong } from "react-icons/fa6";
import CommonInfo from "../common/generalInfo/commonInfo";
import styles from "./nav.module.css";

class NavArrow{
    public logo:string;
    public centerBtnsParent:HTMLElement | null;
    public mainHeader:HTMLElement | null;
    public checkUser:boolean;
    public isAuthenticated:boolean;
    public nav:Nav;
    private _isAdmin:boolean=false;
    public  btnArray:navLinkBtnType[];
    constructor(private _user:User,private auth:AuthService,private _regSignin:RegSignIn,private _service:Service,private _profile:Profile,private _modSelector:ModSelector,public feature:Features,public commonInfo:CommonInfo){
        this.logo="/images/gb_logo.png";
        this._isAdmin=this._user.user.admin ? this._user.user.admin:false;
        this.checkUser=false;
        this.btnArray=[];
        this.centerBtnsParent=document.querySelector("div#footer-centerBtns-container");
        this.mainHeader=document.querySelector("header#navHeader");
        this.nav=new Nav(this._modSelector,this._service,this._user);
        if(this._user.user.id!==""){
            this.isAuthenticated=true;
        }
    }

    //////------------------------GETTERS/SETTERS--------------------------///
get user(){
    return this._user.user
};
set user(user:userType){
    this._user.user=user;
};
    //////------------------------GETTERS/SETTERS--------------------------///
   getuser({user}:{user:userType|null}){
    if(user){
        this.user=user;
    }else{
        this.user=this._user.init
    }
   }
    rotateArrow(item:{navHeader:HTMLElement,headerStart:HTMLElement,button:HTMLButtonElement,time:number,user:userType,isAuthenticated:boolean}){
        const {navHeader,headerStart,button,time,user,isAuthenticated}=item;
        const heightWidth=36;
        let show:boolean=false;
      
        let getPageCount:HTMLElement|null;
        button.className=styles.rotateArrow;
        button.style.width=`${heightWidth}px`;
        button.style.height=`${heightWidth}px`;
        button.style.color="white";
        button.id="rotateArrow-btn";
        FaCreate({parent:button,name:FaArrowRight,cssStyle:{width:"100%"}});
        button.onclick=(e:MouseEvent)=>{
            if(e){
                
                    getPageCount=headerStart.querySelector("div#genPageCount-main") as HTMLElement;
                    if(getPageCount){
                        const marginLeft=getPageCount.style.marginLeft;
                        const left=getPageCount.style.left;
                       const cssStyle={marginLeft,left}as any as {[key:string]:string}
                       this.fadeOutIn({target:getPageCount,time:400,cssStyle});
                    }
             
                if(button.style.transform==="" || button.style.transform==="rotate(180deg)"){
                    show=true;
                    this.imageAfterEffect({button,heightWidth,time:600,show:true});
                    button.style.transform="rotate(0deg)";
                    button.style.color="black";
                    button.style.backgroundColor="white";
                    this.slideMenu({navHeader,show:true,time:600,user,isAuthenticated});
                    button.animate([
                        { transform: "rotate(180deg)",color:"white",backgroundColor:"transparent" },
                        { transform: "rotate(0deg)",color:"black",backgroundColor:"white" },
                    ], { duration: time, iterations: 1 });
                }else{
                    show=false;
                    button.style.transform="rotate(180deg)";
                    button.style.color="white";
                    button.style.backgroundColor="transparent";
                    this.slideMenu({navHeader,show:false,time:600,user,isAuthenticated});
                    button.animate([
                        { transform: "rotate(0deg)",color:"black",backgroundColor:"white" },
                        { transform: "rotate(180deg)",color:"white",backgroundColor:"transparent" },
                    ], { duration: time, iterations: 1 });
                }
                this.closeMenuWhenMouseOutside({actionButton:button,show:show});
            }
        };
        
    };


    slideMenu(item:{navHeader:HTMLElement,show:boolean,time:number,user:userType,isAuthenticated:boolean}){
        const {navHeader,show,time,user,isAuthenticated}=item;
        navHeader.style.zIndex="";
        const less400=window.innerWidth <400;
        const header_height=less400 ? 195 :160;
        const headerHeight=this.isAuthenticated ? header_height + 70 : header_height;
        Header.cleanUpByID(navHeader,"slide-menu");
        const popup=document.createElement("div");
        popup.id="slide-menu";
        popup.className=styles.slideMenuPopup;
        popup.style.width=less400 ? "350px":"400px";
        popup.style.minHeight="800px";
        popup.style.height="auto";
        popup.style.transform="translateX(-100%)";
        this.header({parent:popup,show,time,headerHeight,isAuthenticated});
        this.listItems({parent:popup,headerHeight,user:user,isAuthenticated})
        navHeader.appendChild(popup);
        if(show){
            popup.style.display="flex";
            popup.style.transform="translateX(0%)";
            popup.style.opacity="1";
            popup.animate([
                {transform:"translateX(-100%)",opacity:"0"},
                {transform:"translateX(0%)",opacity:"1"},
            ],{duration:time,iterations:1,easing:"ease-in-out"});
        }else{
            
            popup.style.transform="translateX(-100%)";
            popup.style.opacity="0";
            popup.animate([
                {transform:"translateX(0%)",opacity:"1"},
                {transform:"translateX(-100%)",opacity:"0"},
            ],{duration:time,iterations:1,easing:"ease-in-out"});
            setTimeout(()=>{popup.style.display="none";},time-20);
        }
        
    };


    closeMenuWhenMouseOutside(item:{actionButton:HTMLButtonElement,show:boolean}){
        const {actionButton,show}=item;
        const less900=window.innerWidth < 900;
        const getSlider=document.querySelector("div#slide-menu") as HTMLElement;
        if(show && getSlider){
            if(!less900){
                
                getSlider.onmouseleave=(e:MouseEvent)=>{
                    if(e){
                        actionButton.click();
                    }
                };
            }else{
                getSlider.onmouseout=(e:MouseEvent)=>{
                    if(e){
                        actionButton.click();
                        getSlider.removeEventListener("mouseout",()=>{e.stopPropagation()});
                    }
                };
            }
        }
    };


    header(item:{parent:HTMLElement,show:boolean,time:number,headerHeight:number,isAuthenticated:boolean}){
        const {parent,show,time,headerHeight,isAuthenticated}=item;
       
        const less400=window.innerWidth < 400;
        const width=less400 ? "375px":"400px";
        const container=document.createElement("div");
        container.id="header-logo";
        container.style.cssText=`width:100%;max-width:${width}height:${headerHeight-0}px;padding:10px;border-radius:12px;margin-inline:auto;display:flex;place-items:center;background-color:white;color:black;position:absolute;top:0%;left:0%;box-shadow:1px 1px 6px 1px white;`;
        const para=document.createElement("p");
        para.id="para-header";
        const img=document.createElement("img");
        img.src=this.logo;
        img.alt="www.ablogroom.com";
        img.style.cssText="width:125px;height:125px;aspect-ratio:1 / 1;border-radius:50%;shape-outside:circle(50%);float:left;margin-right:7px;filter:drop-shadow(0 0 0.7rem blue);background-color:black;";
        para.appendChild(img);
        para.style.cssText="font-family:Poppins-Regular;font-size:16px;line-height:2.5rem;";
        if(isAuthenticated){
            this.isAuthenticated=true;
            para.innerHTML+="<span style='color:blue;font-size:110%;'>signed in</span>. please check your <span style='color:blue;font-size:110%;'>profile</span>, below to manage your blogs,,,over <span style='color:blue;font-weight:bold'> 30 management features</span> for you to use.";
        }else{
            this.isAuthenticated=false;
            para.innerHTML+="yours to use, we strive to suit your needs. <br/><span>www.ablogroom.com</span>";
        }
        container.appendChild(para);
        this.headerImageEffect({img,show,time});
        if(show){
            container.style.transform="translateX(0%)";
            container.style.opacity="1";
            parent.appendChild(container);
            container.animate([
                {transform:"translateX(-100%)",opacity:"0",boxShadow:""},
                {transform:"translateX(0%)",opacity:"1",boxShadow:"1px 1px 6px 1px white"},
            ],{duration:time+50,iterations:1,easing:"ease-in-out"});
        }else{
            container.style.transform="translateX(-100%)";
            container.style.opacity="0";
            container.animate([
                {transform:"translateX(0%)",opacity:"1",boxShadow:"1px 1px 6px 1px white"},
                {transform:"translateX(-100%)",opacity:"0",boxShadow:""},
            ],{duration:time-50,iterations:1,easing:"ease-in-out"});
            
        }
        

    };


    headerImageEffect(item:{img:HTMLImageElement,show:boolean,time:number}){
        const {img,show,time}=item;
        if(show){
            img.style.opacity="1";
            img.style.transform="scale(1)";
            img.animate([
                {backdropFilter:"blur(20px)",opacity:"0.3"},
                {backdropFilter:"blur(0px)",opacity:"1"},
            ],{duration:time + 475,iterations:1,easing:"ease-in-out"});
        }else{
            img.style.opacity="0.3";
            img.style.transform="scale(0.5)";
            img.animate([
                {transform:"scale(1)",opacity:"1"},
                {transform:"scale(0.5)",opacity:"0.3"},
            ],{duration:time -200,iterations:1,easing:"ease-in-out"});
        }
    };


    imageAfterEffect(item:{button:HTMLElement,heightWidth:number,time:number,show:boolean}){
        const {button,heightWidth,time,show}=item;
        button.style.position="relative";
        Header.cleanUpByID(button,"imgAfterEffect");
        const img=document.createElement("img");
        img.id="imgAfterEffect";
        img.src=this.logo;
        img.alt="www.ablogroom.com";
        img.style.cssText=`width:${heightWidth}px;height:${heightWidth}px;box-shadow:1px 1px 12px 1px white;align-self:center;border-radius:50%;margin-block:auto;position:absolute;`;
        img.style.display="none";
        button.appendChild(img);
        if(show){
            setTimeout(()=>{
                img.style.display="block";
                img.style.transform="translateX(110%)";
                img.animate([
                    {opacity:"0",boxShadow:"",transform:"translateX(-100%)"},
                    {opacity:"1",boxShadow:"1px 1px 12px 1px white",transform:"translateX(110%)"}
                ],{duration:time,iterations:1});
            },time);
        }else{
            img.style.boxShadow="";
            img.style.opacity="0";
            img.style.transform="translateX(-100%)";
            img.animate([
                {opacity:"1",boxShadow:"1px 1px 12px 1px white",transform:"translateX(0%)"},
                {opacity:"0",boxShadow:"",transform:"translateX(-100%)"},
            ],{duration:time -100,iterations:1});
            setTimeout(()=>{button.removeChild(img)},time-120);
        }
    };


    listItems(item:{parent:HTMLElement,headerHeight:number,user:userType,isAuthenticated:boolean}){
        const {parent,headerHeight,user,isAuthenticated}=item;
        this.centerBtnsParent=document.querySelector("div#footer-centerBtns-container") as HTMLElement;
        if( typeof window !=="undefined"){
            this.checkUser=(user.id!=="" && user.email!=="") ;
            this._isAdmin=(isAuthenticated && user.admin);
            MainHeader.header=document.querySelector("header#navHeader") as HTMLElement;
            const getHeaderInjector=document.querySelector("div#headerInjector") as HTMLElement;
            if(!MainHeader.header || !getHeaderInjector) return;
           
            this.btnArray=[
                {id:0,name:"home",color:"pink",link:"/",func:()=>Nav.navHistory("/"),icon:FaHome,show:true,isEditor:false,save:async()=>null},
                {id:1,name:"blogs",color:"#00BFFF",link:"/blogs",func:()=>Nav.navHistory("/blogs"),icon:FaBlog,show:true,isEditor:false,save:async()=>null},
                {id:1,name:"get a quote",color:"#00FF00",link:"/quote",func:()=>Nav.navHistory("/quote"),icon:FaBlog,show:true,isEditor:false,save:async()=>null},
                {id:2,name:"admin",color:"red",link:"/admin",func:()=> Nav.navHistory("/admin"),icon:FaSign,show:this._isAdmin,isEditor:false,save:async()=>null},
                {id:3,name:"editor",color:"#00BFFF",link:"/editor",func:()=>Nav.navHistory("/editor"),icon:FaEdit,show:true,isEditor:true,save:()=>null},
                {id:4,name:"posts",color:"#00BFFF",link:"/posts",func:()=>Nav.navHistory("/posts"),icon:Icons.FaDropbox,show:true,isEditor:false,save:()=>null},
                {id:5,name:"resume builder",color:"blue",link:"/bio",func:()=>Nav.navHistory("/bio"),icon:BiSolidReport,show:isAuthenticated,isEditor:false,save:()=>null},
                {id:6,name:"chart",color:"#00BFFF",link:"/chart",func:()=>Nav.navHistory("/chart"),icon:Icons.FaChartBar,show:true,isEditor:false,save:()=>null},
                {id:7,name:"signin",color:"#00FF00",link:null,func:()=> this._regSignin.signIn(),icon:FaSign,show:!isAuthenticated,isEditor:false,save:()=>null},
                {id:8,name:"logout",color:"#00FF00",link:null,func:()=>this.auth.logout({func:()=>undefined,redirect:true}),icon:FaSign,show:isAuthenticated,isEditor:false,save:()=>null},
                {id:9,name:"contact",color:"#00FF00",link:null,func:()=> this.commonInfo.contact({user,isAuthenticated}),icon:FaMedapps,show:true,isEditor:false,save:()=>null},
                {id:10,name:"profile on demand",color:"#800000",link:null,func:()=> this._profile.main(getHeaderInjector),icon:FaAccessibleIcon,show:isAuthenticated,isEditor:false,save:()=>null},
                {id:11,name:"profile page",color:"#00FF00",link:"/profile",func:()=> Nav.navHistory("/profile"),icon:FaAccessibleIcon,show:isAuthenticated,isEditor:false,save:()=>null},
                {id:12,name:"general-Info",color:"#00FF00",link:null,func:()=> this.commonInfo.generalInfo(MainHeader.header as HTMLElement),icon:FaInfo,show:true,isEditor:false,save:()=>null},
                {id:13,name:"features",color:"#00FF00",link:null,func:()=> this.feature.feature(document.body as HTMLElement),icon:FaFilePowerpoint,show:true,isEditor:false,save:()=>null},
            ]
        }
       
        
        this.checkUser= (user && user.id!=="");
       
        const container=document.createElement("div");
        container.id="list-items-container";
        container.className=styles.listItemsCont;
        container.style.marginTop=`${headerHeight}px`;
        parent.appendChild(container);
        this.btnArray.map(navItem=>{
            if(navItem.show){
                this.navItem({parent:container,navItem:navItem,user:user,isAuthenticated});
                const hr=document.createElement("hr");
                hr.style.cssText="width:100%;margin-bottom:0.25rem;background:white;";
                container.appendChild(hr);
            }
        });
    };


    navItem(item:{parent:HTMLElement,navItem:navLinkBtnType,user:userType,isAuthenticated:boolean}){
        const {parent,navItem,user,isAuthenticated}=item;
        const {icon,name,color}=navItem;
        const url=new URL(window.location.href);
        const pathname=url.pathname;
        
        const iDiv=document.createElement("div");
        iDiv.className="list-icon";
        iDiv.className=styles.navItemIDivIcon;
        FaBtn({parent:iDiv,icon,cssStyle:{background:"inherit",width:"100%"}});
        const li=document.createElement("li");
        li.style.cssText="position:relative;"
        li.id="list-nav-item";
        li.textContent=`${name.toUpperCase()}`;
        li.style.cssText=`list-style:none;`;
        const col1=document.createElement("div");
        const col2=document.createElement("div");
        col2.appendChild(iDiv)
        col1.appendChild(li)
        const rowContainer=document.createElement("div");
        rowContainer.id=`item-container-${name}`;
        rowContainer.className=styles.navItemRowContainer;
        rowContainer.appendChild(col2);
        rowContainer.appendChild(col1);
        parent.appendChild(rowContainer);
        rowContainer.onmouseover=(e:Event)=>{
            if(e){
                rowContainer.style.color=color;
                rowContainer.style.transform="translateX(5%)";
                rowContainer.animate([
                    {color:"white",transform:"translateX(0%)"},
                    {color:color,transform:"translateX(5%)"},
                ],{duration:700,iterations:1,"easing":"ease-in-out"});
            }
        };
        rowContainer.onmouseout=(e:Event)=>{
            if(e){
                rowContainer.style.color="white";
                rowContainer.style.transform="translateX(0%)";
                rowContainer.animate([
                    {color:color,transform:"translateX(5%)"},
                    {color:"white",transform:"translateX(0%)"},
                ],{duration:700,iterations:1,"easing":"ease-in-out"});
            }
        };
        rowContainer.setAttribute("data-color",color);
        rowContainer.onclick=async(e:MouseEvent)=>{
            if(e){
                this.centerBtnsParent=document.querySelector("div#footer-centerBtns-container");
                if(navItem.link){
                    const newUrl=new URL(navItem.link,location.origin);
                    window.location.href=newUrl.href;
                }else{
                    const getArrowButton=document.querySelector("button#rotateArrow-btn") as HTMLButtonElement;
                    if(!getArrowButton) return;
                    getArrowButton.click();
                    if(navItem.name==="logout" && isAuthenticated){
                        if(pathname==="/editor"){
                            
                                await this.navigateSaveBlog({parent:MainHeader.header as HTMLElement,link:"/",user:user})
                            
                        }else if(url.pathname==="/posts"){
            
                            await this.auth.logout({
                                func:()=>{

                                this.centerBtnsRow({container:this.centerBtnsParent,isAuthenticated:false,user});
                                },
                                redirect:true
                            })

                        }else{
                            this.centerBtnsParent=document.querySelector("div#footer-centerBtns-container");
                           await this.auth.logout({func:()=>this.centerBtnsRow({container:this.centerBtnsParent,isAuthenticated:false,user}),redirect:true})
                        }

                    }else{
                        navItem.func(); //executing nav functions
                    }
                }
                navItem.save(); // executing save function if exists
            }
        };
        Misc.growIn({anchor:li,scale:0,opacity:0,time:900});

    };


    async navigateSaveBlog(item:{parent:HTMLElement,link:string,user:userType}){
        const {parent,user}=item;
       
        this.promGetBlog().then(async(res)=>{
            if(res){
               let blog= res.blog()
               if(blog){
                   const shift=window.innerWidth <500 ? "15%":"25%";
                   parent.style.position="relative";
                   parent.style.zIndex="";
                   if(parent  && typeof window !=="undefined"){
                      
                        blog={...blog,user_id:user.id};
                        const btnGrp=document.createElement("div");
                        btnGrp.id="navigateSaveBtnGrp";
                        btnGrp.style.cssText="position:absolute;width:300px;min-height:100px;background-color:#0a2351;border-radius:10px;box-shadow:1px 1px 10px 1px black;display:flex;flex-direction:row;justify-content:space-around;align-items:center;z-index:100;"
                        btnGrp.style.inset=`10% ${shift} 90% ${shift}`;
                        const {button:save}=Misc.simpleButton({anchor:btnGrp,text:"save",color:"white",bg:Nav.btnColor,type:"button",time:400});
                        const {button:cancel}=Misc.simpleButton({anchor:btnGrp,text:"not now",color:"white",bg:Nav.btnColor,type:"button",time:400});
                        //APPENDING btnGrp TO PARENT
                        parent.appendChild(btnGrp);
                        Misc.fadeIn({anchor:btnGrp,xpos:100,ypos:50,time:400});
                        save.addEventListener("click",async(e:MouseEvent)=>{
                            if(e){
                                if( user.id!=="" && blog){
                                    if(blog.name){
        
                                        //SAVE WORK HERE
                                        this._service.saveBlog({blog:blog,user}).then(async(blog)=>{
                                            if(blog){
                                                this._modSelector.blog=blog;
                                                Misc.message({parent,msg:"saved",type_:"success",time:400});
                                                setTimeout(()=>{
                                                    const navigateSaveBtnGrp=parent.querySelector("div#navigateSaveBtnGrp") as HTMLElement;
                                                    Misc.fadeOut({anchor:navigateSaveBtnGrp,xpos:50,ypos:100,time:400});
                                                    setTimeout(async()=>{
                                                        this.centerBtnsParent=document.querySelector("div#footer-centerBtns-container");
                                                       await this.auth.logout({func:()=>this.centerBtnsRow({container:this.centerBtnsParent,isAuthenticated:false,user}),redirect:true})
                                                       parent.removeChild(navigateSaveBtnGrp);
                                                    },380);
                                                },380);
                                            }
                                        });
                                    }else{
                                        blog={...blog,name:"newBlog",desc:"enter description",title:"Your Title"};
                                        this._service.newBlog(blog).then(async(newBlog)=>{
                                            if(newBlog && typeof(newBlog)!=="string"){
                                                blog={...newBlog,id:newBlog.id};
                                                //SAVE WORK HERE
                                                this._service.saveBlog({blog:blog,user}).then(async(blog)=>{
                                                    if(blog){
        
                                                        Misc.message({parent,msg:"saved",type_:"success",time:400});
                                                        setTimeout(()=>{
                                                            const navigateSaveBtnGrp=parent.querySelector("div#navigateSaveBtnGrp") as HTMLElement;
                                                            Misc.fadeOut({anchor:navigateSaveBtnGrp,xpos:50,ypos:100,time:400});
                                                            setTimeout(async()=>{
                                                                this.centerBtnsParent=document.querySelector("div#footer-centerBtns-container");
                                                               await this.auth.logout({func:()=>this.centerBtnsRow({container:this.centerBtnsParent,isAuthenticated:false,user}),redirect:true});
                                                                parent.removeChild(navigateSaveBtnGrp);
                                                            },380);
                                                        },380);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }else{
                                    this._regSignin.signIn();
                                }
                                
                            }
                        });
                        
                        cancel.addEventListener("click",(e:MouseEvent)=>{
                            if(e){
                                Misc.fadeOut({anchor:btnGrp,xpos:50,ypos:100,time:400});
                                setTimeout(async()=>{
                                    parent.removeChild(btnGrp);
                                    this.centerBtnsParent=document.querySelector("div#footer-centerBtns-container");
                                   await this.auth.logout({func:()=>this.centerBtnsRow({container:this.centerBtnsParent,isAuthenticated:false,user}),redirect:true})
                                },380);
                            }
                        });
                       
           
                   }
               }else{
                this.centerBtnsParent=document.querySelector("div#footer-centerBtns-container");
                await this.auth.logout({func:()=>this.centerBtnsRow({container:this.centerBtnsParent,isAuthenticated:false,user}),redirect:true});
               }
            }else{
                this.centerBtnsParent=document.querySelector("div#footer-centerBtns-container");
                await this.auth.logout({func:()=>this.centerBtnsRow({container:this.centerBtnsParent,isAuthenticated:false,user}),redirect:true});
            }
        });
    };


    
    centerBtnsRow(item:{container:HTMLElement|null,isAuthenticated:boolean,user:userType}){
        //!!! NOTE:THIS GETS TOGGLED TO LOGOUT FROM auth.getUser()
        const {container,isAuthenticated,user}=item;
        if(!container) return;
        Header.cleanUpByID(container,"footer-centerBtns-row")
        const row=document.createElement("div");
        row.id="footer-centerBtns-row";
        row.style.cssText="display:flex; justify-content:space-between;align-items:center;margin:auto;gap:4rem;";
        const arr=["contact","signup","quote generator"];
        arr.forEach(async(item)=>{
            if(item==="contact"){
                const cssStyle={backgroundColor:"#34282C",color:"white",borderRadius:"50%",padding:"3px"}
                const btn=Misc.btnIcon({anchor:row,icon:Icons.FaInfoCircle,msgHover:"contact info",label:null,cssStyle,time:400});
           
                btn.addEventListener("click",(e:MouseEvent)=>{
                    if(e){
                           window.scroll(0,0);
                           this.commonInfo.contact({user,isAuthenticated})
                        }
                });

            }else if(item==="signup"){
                if(this.isAuthenticated){

                    const cssStyle={backgroundColor:"black",color:"white",borderRadius:"50%",padding:"3px",zIndex:"2",boxShadow:"1px 1px 12px 1px lightblue"}
                    const btn=Misc.btnIcon({anchor:row,icon:Icons.FaSignOutAlt,msgHover:"signout",cssStyle,label:null,time:400});
                            btn.id="btn-footer-logout";
                            btn.addEventListener("click",(e:MouseEvent)=>{
                                if(e){
                                       window.scroll(0,0);
                                       this.auth.logout({func:()=>undefined,redirect:true})
                                    }
                            });
                }else{

                    const cssStyle={backgroundColor:"black",color:"white",borderRadius:"50%",padding:"3px"}
                    const btn=Misc.btnIcon({anchor:row,icon:Icons.FaSignInAlt,msgHover:"signin",cssStyle,label:null,time:1000});
                    btn.id="btn-footer-logout";
                    btn.addEventListener("click",(e:MouseEvent)=>{
                        if(e){
                               window.scroll(0,0);
                               this._regSignin.signIn();
                            }
                    });
                }

            }else if(item==="quote generator"){
                const cssStyle={backgroundColor:"#34282C",color:"white",borderRadius:"20px",padding:"3px",fontSize:"20px",boxShadow:"1px 1px 4px 1px blue"};
                    const btn=Misc.btnIcon({anchor:row,icon:FaRightLong,cssStyle,msgHover:"web-services",label:item,time:800});
                    btn.onclick=(e:MouseEvent)=>{
                        if(e){
                            const newUrl=new URL("/quote",window.location.origin);
                            window.location.href=newUrl.href;
                        }
                    };
            }
        });
        container.appendChild(row);
    };

    promGetBlog(){
        
            return Promise.resolve({
                    blog:()=>{
                        if(typeof window !=="undefined"){
                           const getBlogStr= localStorage.getItem("blog");
                            if(!getBlogStr) return null;
                            return JSON.parse(getBlogStr) as blogType
                        }else{
                            return null
                        }

                    }
                }) as Promise<{blog:()=>blogType|null}>;
        
    }
    fadeOutIn(item:{target:HTMLElement,time:number,cssStyle:{[key:string]:string}}){
        const {target,time,cssStyle}=item;
        if(target.hidden===false){
            target.animate([
                {transform:"scale(1)",opacity:"1"},
                {transform:"scale(0)",opacity:"0"},
            ],{duration:time,iterations:1});
            setTimeout(()=>{
                target.hidden=true;
            },time-10);
        }else{
            target.hidden=false;
            for(const key of Object.keys(target.style)){
                for(const [key1,value] of Object.entries(cssStyle)){
                    if(key===key1){
                        target.style[key]=value;
                    }
                };
            };
            target.style.opacity="1";
            target.animate([
                {transform:"scale(0)",opacity:"0"},
                {transform:"scale(1)",opacity:"1"},
            ],{duration:time,iterations:1});
            setTimeout(()=>{
                target.hidden=false;
                target.style.opacity="1";
            },time-10);
            
        }
    }
    cleanUpByQueryKeep(parent:HTMLElement,query:string){
        //THIS REMOVES ALL BUT ONE CHILD BY QUERY ( CLASS OR ID);
        const getContainers=parent.querySelectorAll(query);
        const elements=([...getContainers as any] as Element[]);
        if(getContainers && elements.length>1){
                elements.map((child,index)=>{
                    if(child && index>0){
                        parent.removeChild(child);
                    }
                });

        }
    }

}
export default NavArrow;
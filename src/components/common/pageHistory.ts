import { pageTrackerType } from "../bio/resume/refTypes";


class PageHistory{
    public _pageTrackers:pageTrackerType[];
    constructor(){
        this._pageTrackers=[] as pageTrackerType[]
    };


    get pageTrackers(){
        const getTrackerStr=localStorage.getItem("pageTracker");
        if(getTrackerStr) return JSON.parse(getTrackerStr) as pageTrackerType[];
        else return this._pageTrackers
    };
    set pageTrackers(pageTrackers:pageTrackerType[]){
        this._pageTrackers=pageTrackers;
        localStorage.setItem("pageTracker",JSON.stringify(pageTrackers));
    };

    main({limit}:{limit:number}){
        const url=new URL(location.href);
        const pathname=url.pathname
        return this.track({pathname,limit});
    };

    track({pathname,limit}:{pathname:string,limit:number}){
        const pageTracker=this.pageTrackers.find(kv=>(kv.pathname===pathname));
        const remain=this.pageTrackers.filter(kv=>(kv.pathname!==pathname));
       
        if(pageTracker){
            const {count}=pageTracker;
            pageTracker.count=count+1;
            this.pageTrackers=[...remain,pageTracker];
                
            if( limit < count+1 ){
                return true;
            }
        }else{
            this.pageTrackers=[...this.pageTrackers,{count:1,pathname:pathname}]
        }
        return false
    };

};

export default PageHistory;
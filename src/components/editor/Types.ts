import { eleEnumType, selRowColType, selRowType } from '@/lib/attributeTypes';
import { ChartConfiguration, ChartConfigurationCustomTypesPerDataset, Color } from 'chart.js/auto'
 import { LiteralUnion, ClientSafeProvider} from "next-auth/react";
 import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";
 
 export interface CustomWindow extends Window {
    custWindow:any;
 }
 export const navList:string[]=["/admin","/blog/","/blogs","/home","/editor","/policy","/termsOfService"]

 export type buttonCheckType={
    id:number,name:string,
    btn:HTMLButtonElement,
    check:boolean,
    isEditor:boolean,
    link:string|null,
    count:number,
    isUser:boolean
 }
 export type linkType={
    name:string,
    link:string
 }
 export type navLinkBtnType={
    id:number,
    name:string,
    color:string,
    link:string|null,
    func:()=>buttonCheckType[]|void | Promise<void| undefined> | undefined,
    save:()=>Promise<void|null> | void|null,
    icon:IconType,
    show:boolean,
    isEditor:boolean
 }
 export type navLinkType={
    parent:HTMLElement,
    flexDirection:"row"|"column",
    btnArray:navLinkBtnType[],
}
 export type swapHeaderType={
    normal:boolean,
    custom:boolean
 }
export type gets3ImgKey={
    img:string,
    Key:string
}
export interface emailtelType{
    link:string,
    anchorContainer:string
}
export type themeType={
    name:string,
    value:string,
    type:string
}

export type categoryListType={
    id:string,
    name:string,
    section:string,
    catagories:[],
    catWordSnippet:[],
    categoryGeneralInfo:generalInfoType[],
    imageCategory:[]
}
 import { IconType } from "react-icons";

 export type dataType2 = {
    id: number, //order of display
    eleId:string,
    name: string,
    class: string,
    content: string,
    cssText: string,
    img?:string,
}
export type elementChoiceType={
    id:number,
    name:string,
    ele:string | null,
    isEle:boolean,
    attr:string | null
}
 
export type tagType={name:string,selector:number,rowId:string,colId:string}
export type colAttrType={
    id?:number,
    T:number,
    B:number,
    selector_id?:number,
}
export type columnAttrType={
    id:number
    name:string,
    attr?:string,
    value?:string,
    remove?:boolean,
    level?:"col"|"row"|"element"
}
export type flexType={
    name?:string,
    col?:number,
    row?:number,
    rowOrder:number,
    colOrder:number,
    eleOrder:number,
    selectorNum?:number,
    selectorId?:string,
    colId:string,
    rowId:string,
    placement?:number,
    elementId?:string,
    position?:string,
    link?:string,
    email?:string,
    tel?:string,
    time?:string,
    imgKey?:string,
    attr?:string,
    rowType?:string,
    colType?:string,
    eleType?:string,
    backgroundImg?:boolean,
    shapeOutside?:boolean,
    shapeOutsideCircle?:boolean,
    shapeOutsideSquare?:boolean,
    shapeOutsidePolygon?:boolean,

}
export type selectelementType={
    id:string;
    name:string,
   
}
export type choiceType={
    name:string,
    ele?:eleEnumType,
    isEle:boolean,
    class_?:string
    level:string
}
export type elementType = {
    id: number, //order of display
    placement:number,
    selectorId?:number,
    eleId: string,
    name: string,
    class: string,
    inner_html: string,
    cssText: string,
    attr?:string,
    img?: string,
    imgKey?:string,
    blog_id:number,
    type?:string

}
export type element_selType = {
    id: number, //order of display
    col_id:number,
    selectorId?:number,
    eleId: string,
    name: string,
    class: string,
    inner_html: string,
    cssText: string,
    attr?:string,
    img?: string,
    imgKey?:string,
    order:number,
    type?:string

}
export type colType={
    id:number;
    name:string,
    eleId:string,
    class: string,
    imgKey?:string,
    inner_html?: string,
    cssText: string,
    elements:element_selType[]
    row_id:number,
    type?:string,
    attr?:string,
    order:number
}
export type rowType={
    id:number;
    name:string,
    eleId:string,
    class: string,
    imgKey?:string,
    inner_html?: string,
    cssText: string,
    cols:colType[]
    selector_id:number,
    attr?:string,
    type?:string,
    order:number
}
export interface flexSelectorType extends selectorType{
    image:string
}
export type selectorType={
    id:number,
    placement:number,
    name:string,
    eleId:string,
    class: string,
    inner_html?: string,
    cssText: string,
    colAttr:colAttrType[],
    rows:string,
    rowNum:number,
    colNum:number,
    blog_id?:number,
    header:boolean,
    footer:boolean,
    headerType?:string
}
export type barOptionType=ChartConfiguration<"bar", number[], number|string> | ChartConfigurationCustomTypesPerDataset<"bar", number[], number|string>
export type lineOptionType=ChartConfiguration<"line", number[], number|string> | ChartConfigurationCustomTypesPerDataset<"line", number[], number|string>

export type optionType={
    type:"bar"|"line",
    data:{
        labels:string[],
        datasets:[
            {
                label:string,
                data:number[],
                borderWidth:1,
                backgroundColor:Color[],
                borderColor:Color[],
                borderRadius:10,
                
            }
        ]
    },
    options:{
        scales:{
            y:{
                beginAtZero:boolean
            }
        }
    }
}

export type pageCountType={
    id?:number,
    count:number,
    name:string,
    blog_id?:number,
    post_id?:number,
}

export type styleType={
    id:number,
    shadow:boolean,
    border:boolean,
    bg:string,
    rounded:boolean,
    color:string
}
export type headerDataType={
    id:number,
    height:number,
    width:number,
    style:styleType,
}
export type headerType={
    id:number,
    placement:number,
    eleId:string,
    name:string,
    image:string,
    isOn:boolean;
    headerStyle:{[key:string]:string},
}
export type codeBodyType={
    id:number,
    type:string,
    eleId:string,
    name:string,
    cssText:string,
    class:string,
    inner_html:string,
    attr?:string,
}
export type linecodeType={
    id:number,
    text:string,
    code_id:number
}

export type codeType={
    id:number,
    eleId:string,
    type:string,
    name:string,
    placement:number,
    cssText:string,
    class:string,
    inner_html:string,
    linecode:linecodeType[];
    attr?:string,
    img:string,
    blog_id:number
    template:string

}
export type arrCatchType={
    id: string;
    start: number;
    end: number;
    word: string;
    replace: string;
    index:number;
    isAncClose:boolean
}

export type chartType={
    id:number,
    type:"bar"|"line",
    eleId:string,
    cssText:string,
    class:string,
    chartOption:string,
    placement:number,
    blog_id:number
}
export type blogType={
    id:number,
    user_id:string,
    title?:string,
    name?:string,
    desc?:string,
    attr:string,
    class?:string,
    inner_html?:string,
    cssText?:string,
    eleId?:string,
    img?:string,
    imgKey?:string,
    imgBgKey?:string
    selectors:selectorType[],
    elements:elementType[],
    codes:codeType[],
    charts:chartType[],
    show:boolean,
    username?:string
    rating:number,
    barOptions:barOptionType[],
    date: Date,
    update: Date,
    pageCounts:pageCountType[],
    messages:messageType[]
}
export type postType={
    id:number,
    title:string,
    image?:string,
    imageKey?:string,
    sendReqKey?:string,
    sendMsg?:string,
    content?:string,
    link?:string,
    published: boolean,
    date:Date,
    userId:string,
    likes:number,
    pageCounts:pageCountType[],
};
export type sessionType={
    id:string,
    userId:string,
    expires:Date,
    sessionToken: string,
    accessToken:string,
    createdAt:Date,
    updatedAt:Date
}
export type accountType={
    id:string,
  userId:string,
  providerType:string,
  providerId:string,
  providerAccountId:string,
  refreshToken?:string,
  accessToken?:string,
  accessTokenExpires?:Date,
  token_type?:string,
  createdAt:Date,
  updatedAt:Date,
}
export type jwtPayload={
        id:string
        name: string,
        email: string,
        picture: string,
        iat: number,
        exp: number

};
export type credentialType={
    id?:string
    email:string,
    password?:string,
    admin:boolean
};


export type statusType="authenticated" | "loading" | "unauthenticated";


export type providerType =Record<LiteralUnion<any, string>, ClientSafeProvider> ;


export type userType={
    id:string,
    name?:string;
    email:string,
    password?:string,
    emailVerified?:Date,
    image?:string;
    imgKey?:string,
    bio?:string,
    accounts:accountType[],
    sessions:sessionType[],
    blogs:blogType[],
    posts:postType[],
    devDeployimgs:userDevelopType[],
    quoteImgs:userQuoteType[],
    showinfo?:boolean,
    admin:boolean,
    username?:string
}
export type userSignInType={
    email:string;
    password?:string,
    user_id?:string
}
export type quoteImgKeyType={
    id?:number,
    user_id:string,
    imgKey:string
}

export type classAttType={
    id:number,
    attr:string,
    cssStyle:{[key:string]:string},
    level:string
}

export type providerSigninType={
    id: string;
    name: string;
    img: string;
}

export type generalInfoType={
    id: number,
    name: string,
    address: string,
    cell: string,
    country: string,
    provState: string,
    city: string,
    postal:string,
    extra: string,
    siteArray: string[]
}
export type iconType = {
    id:string,
    name: string,
    display: string,
    class_: string,
    faIcon?:IconType,
    isIcon: boolean,
    attr:boolean,
    isElement: boolean

}
export type focusOptions = {
    focusVisible: boolean,
    preventScroll: boolean
}
export type replType={
    name_1:string,
    name_2:string
} | {name:string}


export type regType={
    name:string,
    word1:RegExp,
    word2:RegExp,
    value:RegExp,
    repl:(name1:string,name2:string)=>string
}
export type signInType={
    password:string;
    email:string;
}
export type messageType={
    id?:number,
    user_id?:string,
    blog_id?:number,
    rate:number,
    name:string,
    email:string,
    msg:string,
    secret:boolean,
    sent:boolean
}
export type footerInputType={
    rows:number,
    cols:number,
    color?:string,
    bg?:string
}
export type imageType={
    id:number,
    name:string,
    image:string
}
export type deletedImgType={
    id?: number,
    imgKey: string,
    del:boolean,
    date?:Date
}
export type adminImageType={
    id: number,
    img:string
    imgKey: string,
    del:boolean,
    date:Date
}
export type img_keyType={
    id:number,
    del:boolean,
    imgKey:string,
    url:string,
    date?:Date
}
export type arrImgType={start:number,end:number,word:string,found:boolean};
export type arrImgType2={name:string,img:string,loc:string};
export type arrImgType3={
    id:number,
    html:HTMLElement,
    name:string,
    img:string,
    loc:string,
    imgKey?:string
    selRowCol:selRowColType|null
};
export type slideType={name:string,expOne:string,expTwo:string|null};
export type introDescType={
    id:number,
    desc:string,
    slide:slideType[]
};

export type sendEmailMsgType={user_id:string,messageId:number,msg:string,viewerEmail:string,viewerName:string}
export type saveProcessType={
    class_:string,
    method:()=>Promise<void>|void|undefined,
    imgKey:string|null,
    target_id:string |null,
    parent_id:string

}
export type adminReplyMsgType={
    msg:messageType,
    reply:string,
    user_id:string,
    admin_id:string
}
export type delteUserType={
    adminemail:string,
    adminId:string,
    delete_id:string
}
export type sitemapType={
    url: string;
    lastModified?: string | Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    alternates?: {
        languages?: Languages<string>;
    };
}
export type infoType2={
    id:number,
    name:string,
    address:string,
    cell:string,
    country:string,
    provState:string,
    city:string,
    postal:string,
    hours:string,
    vacation:string,
    delay:string,
    extra:string,
    siteArray:{name:string,url:string}[]
}
export type bucketType ="masterultils-postimages" | "newablogroom-free-bucket"
export type regenCleanType={id:number,duplicate:boolean,selEleChrt:elementType|selectorType|chartType,type:"element"|"selector"|"chart"}
export type canvasType={
    backgroundColor:string|null,
    scale:number,
    logging:boolean,
    useCORS:boolean,
    width:number,
    height:number,
    proxy:string,
    foreignObjectRendering:boolean,
    x?:number, //crops x
    y?:number //crops Y
    windowWidth?:number,
    windowHeight?:number,
    allowTaint:boolean
}
//-----------QUOTE-----------//
export type subQuoteTypeType="text"|"images"|"#users"|"meta"|"scheduler"|"pageNames"|"no type"|"pages";

export type quoteType={
    user_id:string,
    nameValue:{
        value:string|undefined,
        name:string
    }[]
}
export type quoteCalcItemType={
    id:number,
    type:string,
    basic:boolean,
    name:string,
    desc:string,
    isPage:boolean,
    time:number,
    qty:number
    dollar:number
}
export type returnCalcType={
    total_time: number,
    total_cost: number,
    type: string,
    list: quoteCalcItemType[]

}
export type returnQuoteFinalType={
    total:number,
    totalHrs:number,
    returnCalcList:returnCalcType[],
    user:userType|null
}
export type quoteimgType={
    user_id:string|undefined,
    email:string,
     name:string, 
    quoteKey:string 

}
export type userQuoteType={
    user_id:string|undefined,
    imgKey:string

}
export type userDevelopType={
    user_id:string|undefined,
    email:string,
     name:string, 
    imgKey:string 

}
//-----------QUOTE-----------//
export type signupType={
    id?:number
    email:string,
    name:string,
};
export type checkemailType={
    name:string|null,
    email:string|null,
    hasPassword:boolean

};
export type signupQuoteType={
    id?:number
    email:string,
    name:string,
    imgKey:string
};
//----------DEVELOPMENT DEPLOY SECTION---------------//
export type developDeployType={
    id:number,
    type:string,
    basic:boolean,
    name:string,
    stage:string,
    desc:string,
    isPage:boolean,
    time:number,
    qty:number,
    dollar:number,
}
//----------DEVELOPMENT DEPLOY SECTION---------------//
//----------SEARCHBAR---------------//
export type searchbarType={
    blogId:number,
    name:string,
    keywords:string[]
    
}
//----------SEARCHBAR---------------//
export type onChangeVerifyType={name:string|null,email:string|null,tel:string|null}

//------REQUEST POST ANSWER  -------//
export type sendPostRequestType={
    post:postType,
    clientName?:string,
    clientEmail:string
}
export type idEmailType={
    id?:number
    email:string,
    user_id:string,
};
//------REQUEST POST ANSWER  -------//
///---ADIMAGEURL----////
export type imgExtractType={
    imgUrl?:string,
    selRowCol:selRowColType|null,
    selRow:selRowType|null,
    imgKey:string|null,
    level:"element"|"col"|"row"|"special"|"headerflag",
    hasBlob:boolean,
    hasFreeImg:boolean,
    hasGenericImgKey:boolean
}
export type imgEleType={
    level:"element"|"col"|"row"|"special"|"headerflag",
    target:HTMLImageElement|HTMLElement,
    imgUrl?:string,
    imgKey:string|null,
    selRowCol:selRowColType|null,
    selRow:selRowType|null,
    hasBlob:boolean,
    hasFreeImg:boolean,
    hasGenericImgKey:boolean
}
export type imageInsertType={
    key: string | null;
    name: string;
    url: string;
}
///---ADIMAGEURL----////
//------headerflag  -------//
export type cardBodyCssType={
    id:number,
    name:string,
    small:string,
    middle:string,
    img:string
}
//------headerflag  -------//
//------FOR HTMLELEMENT CLASS FOR showElement()  -------//
export type arrDivContType={
    divCont:HTMLElement,
    placement:number,
    target:HTMLElement,
    isNormal:boolean,
    ele:elementType|element_selType|null,
    sel:selectorType|null,
    chart:chartType|null,
    
}
//------FOR HTMLELEMENT CLASS FOR showElement()  -------//
//------FOR BlogDisplays  -------//
export type arrDivPlaceType={
    id:number,
    divCont:HTMLElement,
    parent:HTMLElement,
    target:HTMLElement,
    displayClean:boolean,
    type:"element"|"chart"|"selector",
    element:elementType|element_selType|null,
    chart:chartType|null,
    selector:selectorType|null,
}
//------FOR BlogDisplays  -------//
//------HTTP TYPE  -------//

export type httpType={
    http:string
}
//------HTTP TYPE  -------//
export type useAgentDataType={
    brands:[
        {brand:string,version:string}
    ],
    mobile:boolean,
    platform:string

}
//----BROWSER---///
export type stateType={
    page_id:number,
    pathname:string,
    id:number,
    pagename:string,
    user_id?:string,
    count:number,
    isAdmin:boolean

};

export type pageType={
    reg:RegExp,
    id: number,
     pathname: string,
    pagename:string

};
//----BROWSER---///
//----INTRO---///
export type pointType={
    id:string,
    name?:string,
    point:string

};
export type firstTimeType={
    id:number,
    name:string,
    desc:string,
    points:pointType[],
    image:string
    
}
//----INTRO---///

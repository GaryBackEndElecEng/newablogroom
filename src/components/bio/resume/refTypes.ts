import { blogType, postType, userDevelopType, userQuoteType } from "@/components/editor/Types";
import { IconType } from "react-icons";

export type accountType={
    id:string,
  userId:string,
  type:string,
  providerId:string,
  providerAccountId:string,
  refreshToken?:string,
  accessToken?:string,
  accessTokenExpires?:Date,
  token_type?:string,
  createdAt:Date,
  updatedAt:Date,
}

export type sessionType={
    id:string,
    userId:string,
    expires:Date,
    sessionToken: string,
    accessToken:string,
    createdAt:Date,
    updatedAt:Date
}


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
    letters:mainIntroLetterStrType[]|mainIntroLetterType[],
    resumes:mainResumeStrType[] |mainResumeType[],
    references:mainResumeRefType[] | resumeRefStrType[],
    showinfo?:boolean,
    admin:boolean,
    username?:string
}

export type workExperienceType={
    id:number,
    title:string,
    company:string,
    summary:string,
    location:string,
    from:string,
    to:string,
    skills:string[],
    achievements:awardType[]
}

export type educationType={
    id:number,
    school:string,
    location:string,
    level:string,
    from:string,
    to:string
    degree:string,
    GPA?:number,
    relevantWork?:string,
    extracurricular?:string,
    skills:string[],
    achievements:awardType[]
};

export type orgType={
    id:number,
    cat:string,
    catFr:string
}

export type awardType={
    id:number,
    achievement:string,
    reason?:string,
    composite?:string
};

export type miscType={
    languages:string[],
    
};
export type contactType={
    address:string,
    name:string,
    city:string,
    PO:string,
    cell:string,
    email1:string,
    email2?:string,
};
export type contactRefType={
    id:number
    address?:string,
    name:string,
    city?:string,
    PO?:string,
    cell?:string,
    email?:string,
};

export type resumeType={
    id?:number,
    name:string,
    contact:contactType,
    sites:string[],
    summary:string,
    workExperience:workExperienceType[],
    education:educationType[],
    extra:miscType
};

export type mainResumeType={
    id?:number,
    name:string,
    enable:boolean,
    user_id:string,
    resume:resumeType,
    french:boolean
}
export type mainResumeStrType={
    id?:number,
    name:string,
    enable:boolean,
    user_id:string,
    resume:string,
    french:boolean
};
export type resumeRefType={
    id:number,
    res_name_id?:string,
    name:string,
    composite:string,
    desc:string,
    mainLink:string,
    links:linkType[],
    contacts:contactRefType[]
};
export type mainResumeRefType={
    id?:number,
    name:string,
    user_id:string,
    french:boolean,
    res_name_id?:string,
    references:resumeRefType[]
}

export type resumeRefStrType={
    id?:number,
    name:string,
    user_id:string,
    french:boolean,
    res_name_id?:string,
    reference:string
}
export type linkType={
    name:string,
    link:string
}

export type formResType={
    cat:"workExperience"|"education"|"sites"|"main"|"extra"|"contact"|"mainRef"|"refLinks",
    subCat:string,
    item:string|undefined,
    name:string
    value:string
};

export type msgType={
    parent:HTMLElement,
    msg:string,
    type:"success"|"warning"|"error",
    time:number
};

export type nameResumeType={
    id:number,
    name:string,
    user_id:string,
    enable:boolean,
    french:boolean,
};
export type nameRefType={
    id:number,
    name:string,
    user_id:string,
    french:boolean,
    res_name_id?:string|null
};
export type insertType={key:string,type:string,place:string,placeFr:string};

export type catType="resumes"|"references"|"letters"|"combined"|"CVs"|"références"|"lettres de motivation"|"combinée";

export type topbarRowType={
    id:string,
    cat:catType,
    catFr:catType,
    topbarCats:topbarCatType[],
    desc:string,
    descFr:string,
    icon:IconType

};
export type topbarRowDescType={
    cat:catType,
    desc:string
}
export type topbarRowColDescType={
    cat:catType,
    desc:string,
    name:string,
}

export type topbarCatType={
    id:string,
    cat:catType,
    name:string,
    text:string,
    textFr:string,
    desc:string,
    descFr:string,
    order:string,
    dataset:string,
    redirect:boolean
}
export type topbarCatResType={
    id:number,
    ID:string,
    cat:string,
    name:string,
    nameFr:string|null,
    html:HTMLElement,
    redirect:boolean,
    order:string
}
//-----------IntroLetter--------------//

export type mainIntroLetterStrType={
    id:number,
    name:string,
    user_id:string,
    res_name_id?:string,
    letter:string
}
export type mainIntroLetterType={
    id:number,
    name:string,
    user_id:string,
    res_name_id?:string,
    letter:letterType
}
export type paragraphType={
    id:number,
    para:string
}
export type signatureType={
    name:string,
    cell:string,
    email:string,
}
export type companyLetType={
    name:string,
    loc?:string,
    site?:string
}
export type letterType={
    res_name_id?:string,
    filename:string,
    to:string,
    contact:contactType,
    position:string,
    company?:companyLetType,
    summary:string,
    paragraphs:paragraphType[],
    conclusion:string,
    signature:signatureType
}
export type nameLetterType={
    id:number,
    user_id:string,
    name:string,
    res_name_id?:string |null
}
//-----------IntroLetter--------------//

//-----------COMBINED--------------//
export type combinedType={
    nameResumes:nameResumeType[],
    nameRefs:nameRefType[]|null,
    nameLetters:nameLetterType[] |null
}
//-----------COMBINED--------------//
export type introResumeType={
    id:number,
    name:string,
    desc:string,
    img:string,
    isDark:boolean
};
//------------pageHistory--------///
export type pageTrackerType={
    pathname:string,
    count:number,
    
}

export type genKeyType="select"|"Ed25519"|"X25519"|"RSA-OAEP"|"ECDSA"|"HMAC"|"AES-GCM";
export type secretResType={
    type:string,
    extractable:boolean,
    algorithm:{
        name:string,
        length:number,
        hash:[],
        usages:string[]
    }
}
export type noDataMsgType={
    cat:"res"|"ref"|"let"|"comb",
    msg:string,
    msgFr:string
}

export type langType={
    eng:string,
    fr:string
}
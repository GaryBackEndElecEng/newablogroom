import { awardType, catType, insertType, linkType, resumeType, userType, workExperienceType } from './refTypes';

export const links:linkType[]=[{name:"ablogroom",link:"https://www.ablogroom.com"},{name:"masterultils",link:"https://masterultils.com"},{name:"masterconnect",link:"https://www.masterconnect.com"},]

export const langConversion=({key}:{key:string}):string=>{
    const convertArr=[
        {eng:"address",fr:"adresse"},
        {eng:"name",fr:"nom"},
        {eng:"city",fr:"ville"},
        {eng:"PO",fr:"code Postale"},
        {eng:"cell",fr:"# mobile"},
        {eng:"email1",fr:"courriel-1"},
        {eng:"email2",fr:"courriel-2"},
        {eng:"summary",fr:"résumé"},
        {eng:"save",fr:"sauvegarder"},
        {eng:"resumes",fr:"CVs"},
        {eng:"no-link",fr:"sans lien"},
        {eng:"references",fr:"références"},
        {eng:"letters",fr:"lettres de motivation"},
        {eng:"combined",fr:"combinée"},
        {eng:"extracurricular",fr:"périscolaire"},
        {eng:"saved",fr:"enregistrée"},
        {eng:"attached",fr:"ci-jointe"},
        {eng:"not saved",fr:"non enregistré"},
        {eng:"deleted",fr:"supprimé"},
        {eng:"paragraph",fr:"paragraphe"},
        {eng:"position",fr:"poste de travail"},
        {eng:"GPA",fr:"GPA/MPC"},
        {eng:"press submit to save",fr:"appuyez sur Soumettre pour enregistrer"},
        {eng:"languages",fr:"langages"},
        {eng:"achievements",fr:"réalisations"},
        {eng:"skill",fr:"compétence"},
        {eng:"skills",fr:"compétences"},
        {eng:"links",fr:"liens"},
        {eng:"mainLink",fr:"lien pricipale"},
        {eng:"enabled",fr:"activé"},
        {eng:"disabled",fr:"désactivé"},
        {eng:"to Whom",fr:"à qui"},
        {eng:"conclusion",fr:"quand vous pouvez être disponible, où vous pouvez être contacté et REMERCIEZ-LES pour la considération."},
        {eng:"cancel",fr:"Annuler"},
        {eng:"ref Contacts",fr:"réf Contacts"},
        {eng:"delete",fr:"supprimer"},
        {eng:"achievement",fr:"réalisation"},
        {eng:"work experience",fr:"expérience de travail"},
        {eng:"reason",fr:"raison"},
        {eng:"Resume Portfolio Editor",fr:"Éditeur de portfolio de CV"},
        {eng:"experience",fr:"expérience"},
        {eng:"education",fr:"éducation"},
        {eng:"save as new File?",fr:"Enregistrer en tant que nouveau fichier ?"},
        {eng:"what position?,how you learned of the hiring.",fr:"quel poste ?, comment avez-vous appris l'embauche."},
        {eng:"reason",fr:"raison"},
        {eng:"link",fr:"lien"},
        {eng:"open",fr:"ouvrir"},
        {eng:"requested position",fr:"poste demandé"},
        {eng:"filename",fr:"nom de filier"},
        {eng:"company",fr:"companie"},
        {eng:"site",fr:"site web"},
        {eng:"loc",fr:"loc"},
        {eng:"to",fr:"a"},
        {eng:"from",fr:"de"},
        {eng:"resume + reference",fr:"CV + référence"},
        {eng:"print",fr:"imprimer"},
        {eng:"res_name_id",fr:"res_name_id"},
        {eng:"contacts",fr:"contacts"},
        {eng:"experience",fr:"expérience"},
        {eng:"education",fr:"éducation"},
        {eng:"aim",fr:"objectif"},
        {eng:"coName",fr:"Co:"},
        {eng:"contact",fr:"filiale /connexion"},
        {eng:"ref links",fr:"liens de reference"},
        {eng:"reference link",fr:"liens de reference"},
        {eng:"desc",fr:"desc"},
        {eng:"success",fr:"succès"},
        {eng:"email",fr:"couriel"},
        {eng:"file name",fr:"nom de fichier"},
        {eng:"composite",fr:"composer de:"},
        {eng:"purpose",fr:"objective"},
        {eng:"description",fr:"description"},
        {eng:"mainLink",fr:"lien principale"},
        {eng:"contracts",fr:"contrats"},
        {eng:"Related links",fr:"Liens connexes"},
        {eng:"language",fr:"langage"},
        {eng:"hide",fr:"cacher"},
        {eng:"link",fr:"lien"},
        {eng:"Add Education",fr:"Ajouter une formation"},
        {eng:"Add Experience",fr:"Ajouter de l'expérience"},
        {eng:"Add Summary",fr:"Ajouter un résumé"},
        {eng:"Add Contact",fr:"Ajouter un contact"},
        {eng:"View Resumes",fr:"Voir les CV"},
        {eng:"school",fr:"école"},
        {eng:"location",fr:"emplacement"},
        {eng:"level",fr:"niveau"},
        {eng:"degree",fr:"degré"},
        {eng:"relevantWork",fr:"pertinentTravail"},
        {eng:"deleteRequest",fr:"êtes-vous sûr de vouloir supprimer ce CV ?"},
        {eng:"deleteRefRequest",fr:"êtes-vous sûr de vouloir supprimer ce CV ?"},
        {eng:"deleteLetRequest",fr:"êtes-vous sûr de vouloir supprimer cette lettre"},
        {eng:"are you sure you want to delete this resume?",fr:"êtes-vous sûr de vouloir supprimer ce CV ?"},

    ]

    return convertArr.find(kv=>(kv.eng===key.trim()))?.fr || key
};

export const inserts:insertType[]=[
    {key:"address",type:"address",place:"address",placeFr:"addresse"},
    {key:"name",type:"name",place:"full name",placeFr:"nom"},
    {key:"city",type:"text",place:"city",placeFr:"ville"},
    {key:"level",type:"text",place:"diploma level",placeFr:"niveau de diplôme"},
    {key:"PO",type:"text",place:"postal code",placeFr:"code postale"},
    {key:"cell",type:"tel",place:"cell",placeFr:"# mobile"},
    {key:"email1",type:"email",place:"email",placeFr:"couriel"},
    {key:"email2",type:"email",place:"email",placeFr:"couriel"},
    {key:"school",type:"text",place:"school name",placeFr:"nom de l'ecole"},
    {key:"location",type:"text",place:"location",placeFr:"location"},
    {key:"skill",type:"text",place:"learned skill",placeFr:"compétence acquise"},
    {key:"degree",type:"text",place:"degree",placeFr:"degré"},
    {key:"GPA",type:"number",place:"0",placeFr:"0"},
    {key:"position",type:"text",place:"job position",placeFr:"poste de travail"},
    {key:"relevantWork",type:"text",place:"Your relevant description to stand out",placeFr:"Votre description pertinente pour vous démarquer"},
    {key:"extracurricular",type:"text",place:"your extra work completed during school",placeFr:"votre travail supplémentaire effectué pendant l'école"},
    {key:"achievement",type:"text",place:"your achievement",placeFr:"votre réussite"},
    {key:"reason",type:"text",place:"your reason to why",placeFr:"ta raison pour laquelle"},
    {key:"composite",type:"text",place:"composed of",placeFr:"composé de"},
    {key:"title",type:"text",place:"your title",placeFr:"votre titre"},
    {key:"company",type:"text",place:"Company's name",placeFr:"Nom de l'entreprise"},
    {key:"summary",type:"text",place:"Work Summary description: It is a section where you describe your past jobs, titles, and work history",placeFr:"Description du résumé des travaux: Il s'agit d'une section dans laquelle vous décrivez vos emplois passés, vos titres et votre historique de travail"},
    {key:"workSummary",type:"text",place:"Work description:It is a section where you describe your responsibilities when working with the company, above.",placeFr:"Description du poste : Il s'agit d'une section dans laquelle vous décrivez vos responsabilités lorsque vous travaillez avec l'entreprise, ci-dessus."},
    {key:"from",type:"number",place:"from",placeFr:"de"},
    {key:"to",type:"number",place:"to",placeFr:"a"},
    {key:"achievement",type:"text",place:"achievement: Instead of highlighting your duties and responsibilities, try to outline your achievements and awards",placeFr:"réalisation : Au lieu de mettre en évidence vos devoirs et responsabilités, essayez de décrire vos réalisations et vos récompenses."},
    {key:"reason",type:"text",place:"reason",placeFr:"raison"},
    {key:"filename",type:"text",place:"add filename",placeFr:"ajouter un nom de fichier"},
    {key:"composite",type:"text",place:"what do you use?- What you used to attain the above achievement.",placeFr:"Qu'est-ce que tu utilises ?- Ce que vous avez utilisé pour atteindre le résultat ci-dessus."}

];

export const langInserts=({french,key}:{french:boolean,key:string}):{place:string,type:string}=>{
    const insert=inserts.find(kv=>(kv.key===key))
    if (french) if(insert) return {place:insert.placeFr,type:insert.type};
    if(french) if(!insert) return {place:"insert",type:"text"};
    if(!french) if(insert) return  {place:insert.place,type:insert.type};
    if(!french) if(!insert) return {place:"insert",type:"text"};
    return {place:"insert",type:"text"};
};

export const paraPlaceHolder:string[]=["critical skills","demonstration of skills","give employ reason to why you are a good fit"]
export const paraFrPlaceHolder:string[]=[" compétences essentielles ", " démonstration de compétences ", " donner à l'employeur les raisons pour lesquelles vous êtes un bon candidat "]
export const langExtra=({french}:{french:boolean})=>{
    if(french) return {
        languages:["Anglais", "Français"]
    }
    else return {
        languages:["English", "French"]
    }
};
export const langLanguages=({french}:{french:boolean})=>{
    if(french) return ["Anglais", "Français", "Espagnol", "Mandarin", "Hindi", "Bengali", "Russe", "Italien", "Turc", "Portugais", "Japonais"," Géorgien", "Arabe"," Néerlandais", "Latin"," Gaélique", "Gallois", "Hongrois", "Indonésien", "Persan", "Péruvien"];
    else return ["English","French","Spanish","Mandarin","Hindi","Bengali","Russian","Italian","Turkish","Portuguese","Japanese","Georgian","Arabic","Dutch","Latin","Gaelic","Welsh","Hungarian","Indonesian","Persian","Perubian"]
}
export const langAchievement=({french}:{french:boolean}):awardType=>{
    const frenchAchiev:awardType={
        id:1,
        achievement:"Au lieu de mettre en évidence vos devoirs et responsabilités, essayez de décrire vos réalisations et vos récompenses",
        reason:" Donnez une réponse remarquable à la question « raisons pour lesquelles vous devriez être embauché ? par la raison » en prouvant à quel point vous avez bien géré les choses dans votre passé",
        composite:" Ce que vous avez utilisé pour atteindre le résultat ci-dessus."
    }
    const englishAchiev:awardType={
        id:1,
            achievement:"Instead of highlighting your duties and responsibilities, try to outline your achievements and awards",
            reason:" Provide a stand-out answer to the question “reasons to why you should get hired? through reason” by proving how well you handled the things in your past",
            composite:" What you used to attain the above achievement."
    }
    if(french) return frenchAchiev;
    else return englishAchiev
};
export const langSummary=({french}:{french:boolean}):string=>{
    const frenchSummary:string="Ce résumé vise à convaincre les responsables du recrutement que vous êtes un choix parfait pour ce poste en 3 à 5 phrases. Un résumé de CV doit être court, concis et engageant, convaincant le recruteur de continuer à lire.";
    const engSummary="This summary aims to convince the hiring managers why you are a perfect choice for this position in 3-5 sentences.A resume summary should be short, concise, and engaging, convincing the recruiter to continue reading"
    if(french) return frenchSummary;
    else return engSummary;
};

export const langSkills=({french}:{french:boolean})=>{
    const frenchSkills=[" Travail d'équipe ", " Pensée critique ", " Résolution de problèmes ", " Service client","Out-Of-The-Box-Thinker","Analytical","Managerial","Unapprehensive"]
    const englishSkills=["Teamwork","Critical Thinking","Problem Solving","Customer Service"," Penseur original ", " Analytique ", " Gestionnaire ", " Insensible "]
    if(french)return frenchSkills;
    else return englishSkills;
};

export const langRefContact=({french,user}:{french:boolean,user:userType|null})=>{
    return{
        id:0,
        name:user?.name || french ? "nom":"name",
        cell:"",
        address:"",
        city:"",
        email:user?.email || ""
    }
};
export const langContact=({french,user}:{french:boolean,user:userType|null})=>{
    return{
        id:0,
        address:"",
        name:user?.name || (french ? "nom":"name"),
        city:"",
        PO:"",
        cell:"",
        email1:user?.email ||"",
        email2:"",
    }
};

export const langReference=({french,user}:{french:boolean,user:userType|null})=>{
    return {
        id:0,
        res_name_id:undefined,
        name:french ? "nom":"name",
        composite:french ? "composé de":"composed of",
        desc:"description",
        mainLink:"https://reference-main-link.com",
        links:links,
        contacts:[langRefContact({french,user})]
    }
};

//-----------------------------------LANGUAGES---------------------------------//
export const langParagraph1=({french}:{french:boolean})=>{
    if(french) return {
        id:0,
        para:"Ce paragraphe donne un résumé de votre parcours et de vos compétences essentielles (compétences techniques) qui vous qualifient pour le poste."
    }
    else return {
        id:0,
        para:"This paragraph gives a summary of your background and critical skills (hard skills) that make you qualified for the position"
    };
};
export const langParagraph2=({french}:{french:boolean})=>{
    if(french) return {
        id:0,
        para:"Ce paragraphe peut être utilisé pour démontrer vos compétences de persuasion (compétences générales)"
    }
    else return {
        id:0,
        para:"This paragraph can be used to demonstrate your persuasive skills (soft skills)."
    };
};
export const langParagraph3=({french}:{french:boolean})=>{
    if(french) return {
        id:0,
        para:"Ce paragraphe peut être utilisé pour donner à l'employeur des raisons de vous embaucher grâce à vos recherches sur l'entreprise."
    }
    else return {
        id:0,
        para:"This paragraph can be used to give the employer reasons to employ you by through your research of the company."
    };
};
export const langParagraphs=({french,num}:{french:boolean,num:number})=>{
    const count=num;
    if(count===1) return langParagraph1({french});
    else if(count===2) return langParagraph2({french});
    else if(count===3) return langParagraph3({french});
    return langParagraph1({french});
};
//-----------------------------------LANGUAGES---------------------------------//

//---------------------------------EDUCATION------------------------------------//
export const langEducation=({french}:{french:boolean})=>{
     return {
        id:0,
        school:"",
        location:"",
        level:"",
        from:"",
        to:"",
        degree:"",
        GPA:0,
        relevantWork:"",
        extracurricular:"",
        skills:langSkills({french}).slice(0,1),
        achievements:[langAchievement({french})]
    };
    
}
//---------------------------------EDUCATION------------------------------------//

//---------------------------------EXPERIENCE------------------------------------//


export const langExperience=({french}:{french:boolean})=>{
    const experience:workExperienceType={
        id:0,
        title:"",
        company:"",
        summary:"",
        location:"",
        from:"",
        to:"",
        skills:langSkills({french}).slice(0,1),
        achievements:[langAchievement({french})]
    }
    return experience
}
//---------------------------------EXPERIENCE------------------------------------//
//---------------------------------RESUME------------------------------------//
export const langResume=({french,user}:{french:boolean,user:userType|null}):resumeType=>{
    return {
        id:0,
        name:"",
        contact:langContact({french,user}),
        sites:[""],
        summary:"This summary aims to convince the hiring managers why you are a perfect choice for this position in 3-5 sentences.A resume summary should be short, concise, and engaging, convincing the recruiter to continue reading",
        workExperience:[langExperience({french})],
        education:[langEducation({french})],
        extra:langExtra({french}),

    };
};
//---------------------------------RESUME------------------------------------//
//---------------------------------LETTER------------------------------------//
export const langLetter=({french,user}:{french:boolean,user:userType|null})=>{
    if(french) return {
        filename:"",
        position:"poste de travail",
        to:"",
        contact:langContact({french,user}),
        summary:"Dans le paragraphe d'ouverture, indiquez pour quel poste vous postulez, puis comment vous avez entendu parler de ce poste.",
        paragraphs:[langParagraph1({french})],
        conclusion:"À la fin de la lettre, indiquez votre disponibilité pour le poste, où vous pouvez être contacté et quand vous contacterez le recruteur pour un rendez-vous afin de discuter de votre candidature. Si vous n'avez pas de contact, vous pouvez simplement indiquer votre attente de réponse dans cette partie de la lettre. Remerciez la personne à qui vous écrivez pour son temps et l'attention qu'elle a portée à votre candidature.",
        signature:{
            name:user?.name || "",
            cell:"",
            email:user?.email ||""
        }
    };
    else return {
        filename:"",
        position:"job position",
        to:"",
        contact:langContact({french,user}),
        summary:"In the opening paragraph tell what position you are applying for, then how you learned about the position.",
        paragraphs:[langParagraph1({french})],
        conclusion:"At the end of the letter talk about your availability for the job, where you can be contacted, and when you are going to contact the hiring person for an appointment to discuss your application. If you have no contact name you may simply want to indicate your anticipation for a response in this part of the letter. Thank the person to whom you are writing for his/her time and consideration of your application",
        signature:{
            name:user?.name || "",
            cell:"",
            email:user?.email ||""
        }
    };
}
//---------------------------------LETTER------------------------------------//
//---------------------------------MISC------------------------------------//

export const langNoData=({french,cat}:{french:boolean,cat:catType})=>{
    const arr:{eng:catType,fr:string}[]=[
        {eng:"resumes",fr:"CVs"},{eng:"references",fr:"références"},{eng:"letters",fr:"lettres de motivation"},{eng:"combined",fr:"combinée"}
    ]
    const catRes=arr.find(kv=>(kv.eng===cat));
    if(french)return `Désolé, vous n'avez enregistré aucun contenu dans votre répertoire du ${catRes?.fr ||"des items"}. Une fois votre CV créé avec une lettre de recommandation et/ou une lettre de motivation, les données seront affichées pour être jointes au fichier.`
   else return `sorry, you have no saved content, within your ${catRes?.eng ||"items"}' repetoir. Once you have built a resume with a reference and or letter, the data will be displayed for file attchment.`
}
//---------------------------------MISC------------------------------------//
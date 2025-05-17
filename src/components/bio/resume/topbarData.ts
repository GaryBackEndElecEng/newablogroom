import { topbarCatType, topbarRowColDescType, topbarRowDescType, topbarRowType } from "./refTypes";
import { BiSolidReport } from "react-icons/bi";
import { VscReferences } from "react-icons/vsc";
import { SlEnvolopeLetter } from "react-icons/sl";
import { IoIosAttach } from "react-icons/io";

export const paraIntro:string=" Welcome to the resume Builder. This resume Builder allows you to build a fully professionalize resume for instant online viewing. It provides you with the authority to allow online viewing in one click. I comes with four main sections, such as resumes, references, letters ( Cover letters) and combined ( giving you the options of attaching Cover Letters  and or References to your resume). Below are the full descriptions for the four sections. This is FREE to use so enjoy. "
export const paraIntroFr:string=" Bienvenue dans l'outil de création de CV. Cet outil vous permet de créer un CV entièrement professionnel et de le consulter instantanément en ligne. Il vous permet de le consulter en ligne en un clic. Il comprend quatre sections principales : CV, références, lettres de motivation et une section combinée (vous permettant de joindre des lettres de motivation et/ou des références à votre CV). Vous trouverez ci-dessous la description complète de chaque section. Son utilisation est gratuite, alors profitez-en ! "
export const topbarRowDescs:topbarRowDescType[]=[
    {cat:"resumes",desc:"This section allows you to store, create and edit your resumes. It comes with a very attractive resume template that allows you to accelerate a professionally design in minutes."},
    {cat:"references",desc:"This section allows you to create professional contact list tha can be binded (attached) to you resume for printing and or linking using our online view feature in one click."},
    {cat:"letters",desc:"This section allows you create professionally designed Cover Letters for your resumes. It gives you an instructional writing information tha will help you write a cover letters that can be bounded to your resume for one-click view professional viewing. The template uses the best professional template for best presentability."},
    {cat:"combined",desc:"This section gives you the power of binding your Cover letter and reference to you tailored resume to give the employer an ease of viewing and or printing."},
];
export const topbarRowDescsFr:topbarRowDescType[]=[
    {cat:"resumes",desc:"Cette section vous permet de stocker, créer et modifier vos CV. Elle propose un modèle de CV attrayant qui vous permet de créer rapidement une conception professionnelle en quelques minutes."},
    {cat:"references",desc:"Cette section vous permet de créer une liste de contacts professionnels qui peut être liée (jointe) à votre CV pour impression et/ou liaison à l'aide de notre fonction d'affichage en ligne en un clic."},
    {cat:"letters",desc:"Cette section vous permet de créer des lettres de motivation professionnelles pour votre CV. Elle vous fournit des instructions de rédaction pour vous aider à rédiger des lettres de motivation qui peuvent être jointes à votre CV pour une consultation professionnelle en un clic. Le modèle utilise les meilleurs modèles professionnels pour une présentation optimale."},
    {cat:"combined",desc:"Cette section vous donne le pouvoir de lier votre lettre de motivation et votre référence à votre CV personnalisé pour donner à l'employeur une facilité de visualisation et/ou d'impression."},
];

const resumeDesc=topbarRowDescs.find(kv=>(kv.cat==="resumes")) as topbarRowDescType;
        const refDesc=topbarRowDescs.find(kv=>(kv.cat==="references")) as topbarRowDescType;
        const letterDesc=topbarRowDescs.find(kv=>(kv.cat==="letters")) as topbarRowDescType;
        const combinedDesc=topbarRowDescs.find(kv=>(kv.cat==="combined")) as topbarRowDescType;

const resumeDescFr=topbarRowDescsFr.find(kv=>(kv.cat==="resumes")) as topbarRowDescType;
        const refDescFr=topbarRowDescsFr.find(kv=>(kv.cat==="references")) as topbarRowDescType;
        const letterDescFr=topbarRowDescsFr.find(kv=>(kv.cat==="letters")) as topbarRowDescType;
        const combinedDescFr=topbarRowDescsFr.find(kv=>(kv.cat==="combined")) as topbarRowDescType;

export const topbarRowColDescs:topbarRowColDescType[]=[
    {cat:"resumes",name:"resumes",desc:"This sub section displays all your current built resumes"},
    {cat:"resumes",name:"newResume",desc:"This sub section allows you to custom build your resume that will come alive once done.You can add/remove all resume sub components to fit your needs."},
    {cat:"references",name:"References",desc:"This sub section displays all your references for easy viewing."},
    {cat:"references",name:"create_ref",desc:"This sub section allows you to build your own reference tailored to your needs. It allows you to add/remove all sub-components."},
    {cat:"references",name:"edit_ref",desc:"This sub section allows you to edit your reference, including adding/removing sub-components."},
    {cat:"resumes",name:"edit_resumes",desc:"This sub section allows you to edit your resume(s), including adding/removing sub-components."},
    {cat:"letters",name:"new_letter",desc:"This sub section allows you to quickly create and customize your cover letter for your respective employer."},
    // {cat:"letters",name:"print-letters",desc:"This sub section allows you to view your cover letters with option to PDF print."},
    {cat:"letters",name:"view-letters",desc:"This sub section allows you to view your cover letters in one click, giving a quick means on what letter to modify for a quick reply response to a job opportunity."},
    {cat:"letters",name:"edit_letter",desc:"This sub section allows you to quickly edit your Cover Letter quick response."},
    {cat:"combined",name:"attach",desc:"This magically attaches references or Cover letters to your resume and adds the link for quick access to your cover letter for instant professional viewing."},
    {cat:"combined",name:"view_attach",desc:"This provides you with bounded letter-to-resume or/and reference-to-resume or/and letter-reference-to-resumes for quick online-viewing. This is a powerful feature that allows you to make available one-click-viewing pleasure."},
    {cat:"combined",name:"clear_attach",desc:"This clears the resume-to reference and/or cover-letter binding.Secondly, it removes the link from the internet,once disabled. This allows you to the power of combined online-viewing"},
];

export const topbarRowColDescsFr:topbarRowColDescType[]=[
    {cat:"resumes",name:"resumes",desc:"Cette sous-section affiche tous vos CV actuellement créés"},
    {cat:"resumes",name:"newResume",desc:"Cette sous-section vous permet de créer sur mesure votre CV qui prendra vie une fois terminé. Vous pouvez ajouter/supprimer tous les sous-composants du CV en fonction de vos besoins."},
    {cat:"references",name:"References",desc:"Cette sous-section affiche toutes vos références pour une visualisation facile."},
    {cat:"references",name:"create_ref",desc:"Cette sous-section vous permet de créer votre propre référence adaptée à vos besoins. Elle vous permet d'ajouter ou de supprimer tous les sous-composants."},
    {cat:"references",name:"edit_ref",desc:"Cette sous-section vous permet de modifier votre référence, notamment en ajoutant/supprimant des sous-composants."},
    {cat:"resumes",name:"edit_resumes",desc:"Cette sous-section vous permet de modifier votre/vos CV, notamment en ajoutant/supprimant des sous-composants."},
    {cat:"letters",name:"new_letter",desc:"Cette sous-section vous permet de créer et de personnaliser rapidement votre lettre de motivation pour votre employeur respectif"},
    // {cat:"letters",name:"print-letters",desc:"Cette sous-section vous permet de visualiser vos lettres de motivation avec option d'impression PDF."},
    {cat:"letters",name:"view-letters",desc:"Cette sous-section vous permet de visualiser vos lettres de motivation en un clic, vous donnant un moyen rapide de savoir quelle lettre modifier pour une réponse rapide à une opportunité d'emploi."},
    {cat:"letters",name:"edit_letter",desc:"Cette sous-section vous permet de modifier rapidement votre réponse rapide à la lettre de motivation"},
    {cat:"combined",name:"attach",desc:"Cela attache comme par magie des références ou des lettres de motivation à votre CV et ajoute le lien pour un accès rapide à votre lettre de motivation pour une visualisation professionnelle instantanée"},
    {cat:"combined",name:"view_attach",desc:"Cette fonctionnalité vous permet de consulter rapidement en ligne des lettres de motivation et/ou des références de motivation. Cette fonctionnalité puissante vous permet de consulter vos CV en un clic."},
    {cat:"combined",name:"clear_attach",desc:"Cela supprime la liaison entre le CV et la lettre de motivation. Ensuite, le lien Internet, serait désactivé, et supprimé. Vous pouvez ainsi profiter de la puissance d'une presentation du votre CV aficher et complet et ci-joint."},
];


export const topbarresumes=topbarRowColDescs.find(kv=>(kv.name==="resumes")) as topbarRowColDescType;
export const topbarnewResume=topbarRowColDescs.find(kv=>(kv.name==="newResume")) as topbarRowColDescType;
export const topbarReferences=topbarRowColDescs.find(kv=>(kv.name==="References")) as topbarRowColDescType;
export const topbarcreate_ref=topbarRowColDescs.find(kv=>(kv.name==="create_ref")) as topbarRowColDescType;
export const topbaredit_ref=topbarRowColDescs.find(kv=>(kv.name==="edit_ref")) as topbarRowColDescType;
export const topbaredit_resumes=topbarRowColDescs.find(kv=>(kv.name==="edit_resumes")) as topbarRowColDescType;
export const topbarnew_letter=topbarRowColDescs.find(kv=>(kv.name==="new_letter")) as topbarRowColDescType;
// export const topbarprint_letters=topbarRowColDescs.find(kv=>(kv.name==="print-letters")) as topbarRowColDescType;
export const topbarview_letters=topbarRowColDescs.find(kv=>(kv.name==="view-letters")) as topbarRowColDescType;
export const topbaredit_letter=topbarRowColDescs.find(kv=>(kv.name==="edit_letter")) as topbarRowColDescType;
export const topbarattach=topbarRowColDescs.find(kv=>(kv.name==="attach")) as topbarRowColDescType;
export const topbarview_attach=topbarRowColDescs.find(kv=>(kv.name==="view_attach")) as topbarRowColDescType;
export const topbarclear_attach=topbarRowColDescs.find(kv=>(kv.name==="clear_attach")) as topbarRowColDescType;

export const topbarresumesFr=topbarRowColDescsFr.find(kv=>(kv.name==="resumes")) as topbarRowColDescType;
export const topbarnewResumeFr=topbarRowColDescsFr.find(kv=>(kv.name==="newResume")) as topbarRowColDescType;
export const topbarReferencesFr=topbarRowColDescsFr.find(kv=>(kv.name==="References")) as topbarRowColDescType;
export const topbarcreate_refFr=topbarRowColDescsFr.find(kv=>(kv.name==="create_ref")) as topbarRowColDescType;
export const topbaredit_refFr=topbarRowColDescsFr.find(kv=>(kv.name==="edit_ref")) as topbarRowColDescType;
export const topbaredit_resumesFr=topbarRowColDescsFr.find(kv=>(kv.name==="edit_resumes")) as topbarRowColDescType;
export const topbarnew_letterFr=topbarRowColDescsFr.find(kv=>(kv.name==="new_letter")) as topbarRowColDescType;
// export const topbarprint_lettersFr=topbarRowColDescsFr.find(kv=>(kv.name==="print-letters")) as topbarRowColDescType;
export const topbarview_lettersFr=topbarRowColDescsFr.find(kv=>(kv.name==="view-letters")) as topbarRowColDescType;
export const topbaredit_letterFr=topbarRowColDescsFr.find(kv=>(kv.name==="edit_letter")) as topbarRowColDescType;
export const topbarattachFr=topbarRowColDescsFr.find(kv=>(kv.name==="attach")) as topbarRowColDescType;
export const topbarview_attachFr=topbarRowColDescsFr.find(kv=>(kv.name==="view_attach")) as topbarRowColDescType;
export const topbarclear_attachFr=topbarRowColDescsFr.find(kv=>(kv.name==="clear_attach")) as topbarRowColDescType;



export const topbarCats:topbarCatType[]=[
    {id:"row-col-resumes",dataset:"data-resumes-resumes",cat:"resumes",name:"resumes",desc:topbarresumes.desc,descFr:topbarresumesFr.desc,text:"Current resumes",textFr:"CV actuels",order:"0",redirect:false},
    {id:"row-col-new",dataset:"data-resumes-newResumes",cat:"resumes",name:"newResume",desc:topbarnewResume.desc,descFr:topbarnewResumeFr.desc,text:"Create New",textFr:"Créer nouveau",order:"1",redirect:false},
    {id:"row-col-references",dataset:"data-references-References",cat:"references",name:"References",desc:topbarReferences.desc,descFr:topbarReferencesFr.desc,text:"References",textFr:"Références",order:"2",redirect:false},
    {id:"row-col-create-ref",dataset:"data-references-create_ref",cat:"references",name:"create_ref",desc:topbarcreate_ref.desc,descFr:topbarcreate_refFr.desc,text:"new Reference",textFr:"nouvelle référence",order:"3",redirect:false},
    {id:"row-col-edit-ref-ref",dataset:"data-references-edit_ref",cat:"references",name:"edit_ref",desc:topbaredit_ref.desc,descFr:topbaredit_refFr.desc,text:"edit Reference",textFr:"modifier la référence",order:"4",redirect:false},
    {id:"row-col-edit",dataset:"data-set-edit-resumes",cat:"resumes",name:"edit_resumes",desc:topbaredit_resumes.desc,descFr:topbaredit_resumesFr.desc,text:" edit Resumes",textFr:"modifier les CV",order:"5",redirect:true},
    {id:"row-col-letter-newlet",dataset:"data-letters-new_letter",cat:"letters",name:"new_letter",desc:topbarnew_letter.desc,descFr:topbarnew_letterFr.desc,text:"new cover letter",textFr:"nouvelle lettre de motivation",order:"6",redirect:false},
    // {id:"row-col-letter-edit",dataset:"data-letters-print-letters",cat:"letters",name:"print-letters",desc:topbarprint_letters.desc,descFr:topbarprint_lettersFr.desc,text:"print-letters",textFr:"lettres imprimées",order:"8",redirect:false},
    {id:"row-col-letter-edit",dataset:"data-letters-print-letters",cat:"letters",name:"view-letters",desc:topbarview_letters.desc,descFr:topbarview_lettersFr.desc,text:"view letters",textFr:"voir les lettres",order:"9",redirect:false},
    {id:"row-col-letter-view",dataset:"data-letters-edit_letters",cat:"letters",name:"edit_letter",desc:topbaredit_letter.desc,descFr:topbaredit_letterFr.desc,text:"edit-letters",textFr:"modifier les lettres",order:"10",redirect:true},
    {id:"row-col-moduleConnect-view",dataset:"data-combined-attach",cat:"combined",name:"attach",desc:topbarattach.desc,descFr:topbarattachFr.desc,text:"attach",textFr:"attacher",order:"9",redirect:false},
    {id:"row-col-combine-attach",dataset:"data-combined-view_attach",cat:"combined",name:"view_attach",desc:topbarview_attach.desc,descFr:topbarview_attachFr.desc,text:"combined",textFr:"combiné",order:"11",redirect:false},
    {id:"row-col-combine-clear",dataset:"data-combined-clear-attach",cat:"combined",name:"clear_attach",desc:topbarclear_attach.desc,descFr:topbarclear_attachFr.desc,text:"clear view access",textFr:"accès à une vue dégagée",order:"12",redirect:false},
];

export const topbarRows:topbarRowType[]=[
    {id:"topbar-row-resumes",cat:"resumes",catFr:"CVs",icon:BiSolidReport,desc:resumeDesc.desc,descFr:resumeDescFr.desc,topbarCats:topbarCats.filter(kv=>(kv.cat==="resumes"))},
    {id:"topbar-row-references",cat:"references",catFr:"références",icon:VscReferences,desc:refDesc.desc,descFr:refDescFr.desc,topbarCats:topbarCats.filter(kv=>(kv.cat==="references"))},
    {id:"topbar-row-letters",cat:"letters",catFr:"lettres de motivation",icon:SlEnvolopeLetter,desc:letterDesc.desc,descFr:letterDescFr.desc,topbarCats:topbarCats.filter(kv=>(kv.cat==="letters"))},
    {id:"topbar-row-combined",cat:"combined",catFr:"combinée",icon:IoIosAttach,desc:combinedDesc.desc,descFr:combinedDescFr.desc,topbarCats:topbarCats.filter(kv=>(kv.cat==="combined"))},
];


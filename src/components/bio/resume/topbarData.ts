import { topbarCatType, topbarRowColDescType, topbarRowDescType, topbarRowType } from "./refTypes";
import { BiSolidReport } from "react-icons/bi";
import { VscReferences } from "react-icons/vsc";
import { SlEnvolopeLetter } from "react-icons/sl";
import { IoIosAttach } from "react-icons/io";

export const paraIntro:string=" Welcome to the resume Builder. This resume Builder allows you to build a fully professionalize resume for instant online viewing. It provides you with the authority to allow online viewing in one click. I comes with four main sections, such as resumes, references, letters ( Cover letters) and combined ( giving you the options of attaching Cover Letters  and or References to your resume). Below are the full descriptions for the four sections. This is FREE to use so enjoy. "
export const topbarRowDescs:topbarRowDescType[]=[
    {cat:"resumes",desc:"This section allows you to store, create and edit your resumes. It comes with a very attractive resume template that allows you to accelerate a professionally design in minutes."},
    {cat:"references",desc:"This section allows you to create professional contact list tha can be binded (attached) to you resume for printing and or linking using our online view feature in one click."},
    {cat:"letters",desc:"This section allows you create professionally designed Cover Letters for your resumes. It gives you an instructional writing information tha will help you write a cover letters that can be bounded to your resume for one-click view professional viewing. The template uses the best professional template for best presentability."},
    {cat:"combined",desc:"This section gives you the power of binding your Cover letter and reference to you tailored resume to give the employer an ease of viewing and or printing."},
];

const resumeDesc=topbarRowDescs.find(kv=>(kv.cat==="resumes")) as topbarRowDescType;
        const refDesc=topbarRowDescs.find(kv=>(kv.cat==="references")) as topbarRowDescType;
        const letterDesc=topbarRowDescs.find(kv=>(kv.cat==="letters")) as topbarRowDescType;
        const combinedDesc=topbarRowDescs.find(kv=>(kv.cat==="combined")) as topbarRowDescType;

export const topbarRowColDescs:topbarRowColDescType[]=[
    {cat:"resumes",name:"resumes",desc:"This sub section displays all your current built resumes"},
    {cat:"resumes",name:"newResume",desc:"This sub section allows you to custom build your resume that will come alive once done.You can add/remove all resume sub components to fit your needs."},
    {cat:"references",name:"References",desc:"This sub section displays all your references for easy viewing."},
    {cat:"references",name:"create_ref",desc:"This sub section allows you to build your own reference tailored to your needs. It allows you to add/remove all sub-components."},
    {cat:"references",name:"edit_ref",desc:"This sub section allows you to edit your reference, including adding/removing sub-components."},
    {cat:"resumes",name:"edit_resumes",desc:"This sub section allows you to edit your resume(s), including adding/removing sub-components."},
    {cat:"letters",name:"new_letter",desc:"This sub section allows you to quickly create and customize your cover letter for your respective employer."},
    {cat:"letters",name:"print-letters",desc:"This sub section allows you to view your cover letters with option to PDF print."},
    {cat:"letters",name:"view-letters",desc:"This sub section allows you to view your cover letters in one click, giving a quick means on what letter to modify for a quick reply response to a job opportunity."},
    {cat:"letters",name:"edit_letter",desc:"This sub section allows you to quickly edit your Cover Letter quick response."},
    {cat:"combined",name:"attach",desc:"This magically attaches references or Cover letters to your resume and adds the link for quick access to your cover letter for instant professional viewing."},
    {cat:"combined",name:"view_attach",desc:"This provides you with bounded letter-to-resume or/and reference-to-resume or/and letter-reference-to-resumes for quick online-viewing. This is a powerful feature that allows you to make available one-click-viewing pleasure."},
    {cat:"combined",name:"clear_attach",desc:"This clears the resume-to reference and cover-letter binding and removes the link from the internet. This allows you to give a time period of online-viewing"},
];


export const topbarresumes=topbarRowColDescs.find(kv=>(kv.name==="resumes")) as topbarRowColDescType;
export const topbarnewResume=topbarRowColDescs.find(kv=>(kv.name==="newResume")) as topbarRowColDescType;
export const topbarReferences=topbarRowColDescs.find(kv=>(kv.name==="References")) as topbarRowColDescType;
export const topbarcreate_ref=topbarRowColDescs.find(kv=>(kv.name==="create_ref")) as topbarRowColDescType;
export const topbaredit_ref=topbarRowColDescs.find(kv=>(kv.name==="edit_ref")) as topbarRowColDescType;
export const topbaredit_resumes=topbarRowColDescs.find(kv=>(kv.name==="edit_resumes")) as topbarRowColDescType;
export const topbarnew_letter=topbarRowColDescs.find(kv=>(kv.name==="new_letter")) as topbarRowColDescType;
export const topbarprint_letters=topbarRowColDescs.find(kv=>(kv.name==="print-letters")) as topbarRowColDescType;
export const topbarview_letters=topbarRowColDescs.find(kv=>(kv.name==="view-letters")) as topbarRowColDescType;
export const topbaredit_letter=topbarRowColDescs.find(kv=>(kv.name==="edit_letter")) as topbarRowColDescType;
export const topbarattach=topbarRowColDescs.find(kv=>(kv.name==="attach")) as topbarRowColDescType;
export const topbarview_attach=topbarRowColDescs.find(kv=>(kv.name==="view_attach")) as topbarRowColDescType;
export const topbarclear_attach=topbarRowColDescs.find(kv=>(kv.name==="clear_attach")) as topbarRowColDescType;



export const topbarCats:topbarCatType[]=[
    {id:"row-col-resumes",dataset:"data-resumes-resumes",cat:"resumes",name:"resumes",desc:topbarresumes.desc,text:"Current resumes",textFr:"CV actuels",order:"0",redirect:false},
    {id:"row-col-new",dataset:"data-resumes-newResumes",cat:"resumes",name:"newResume",desc:topbarnewResume.desc,text:"Create New",textFr:"Créer nouveau",order:"1",redirect:false},
    {id:"row-col-references",dataset:"data-references-References",cat:"references",name:"References",desc:topbarReferences.desc,text:"References",textFr:"Références",order:"2",redirect:false},
    {id:"row-col-create-ref",dataset:"data-references-create_ref",cat:"references",name:"create_ref",desc:topbarcreate_ref.desc,text:"new Reference",textFr:"nouvelle référence",order:"3",redirect:false},
    {id:"row-col-edit-ref-ref",dataset:"data-references-edit_ref",cat:"references",name:"edit_ref",desc:topbaredit_ref.desc,text:"edit Reference",textFr:"modifier la référence",order:"4",redirect:false},
    {id:"row-col-edit",dataset:"data-set-edit-resumes",cat:"resumes",name:"edit_resumes",desc:topbaredit_resumes.desc,text:" edit Resumes",textFr:"modifier les CV",order:"5",redirect:true},
    {id:"row-col-letter-newlet",dataset:"data-letters-new_letter",cat:"letters",name:"new_letter",desc:topbarnew_letter.desc,text:"new cover letter",textFr:"nouvelle lettre de motivation",order:"6",redirect:false},
    {id:"row-col-letter-edit",dataset:"data-letters-print-letters",cat:"letters",name:"print-letters",desc:topbarprint_letters.desc,text:"print-letters",textFr:"lettres imprimées",order:"8",redirect:false},
    {id:"row-col-letter-edit",dataset:"data-letters-print-letters",cat:"letters",name:"view-letters",desc:topbarview_letters.desc,text:"view letters",textFr:"voir les lettres",order:"9",redirect:false},
    {id:"row-col-letter-view",dataset:"data-letters-edit_letters",cat:"letters",name:"edit_letter",desc:topbaredit_letter.desc,text:"edit-letters",textFr:"modifier les lettres",order:"10",redirect:true},
    {id:"row-col-moduleConnect-view",dataset:"data-combined-attach",cat:"combined",name:"attach",desc:topbarattach.desc,text:"attach",textFr:"attacher",order:"9",redirect:false},
    {id:"row-col-combine-attach",dataset:"data-combined-view_attach",cat:"combined",name:"view_attach",desc:topbarview_attach.desc,text:"combined",textFr:"combiné",order:"11",redirect:false},
    {id:"row-col-combine-clear",dataset:"data-combined-clear-attach",cat:"combined",name:"clear_attach",desc:topbarclear_attach.desc,text:"clear view access",textFr:"accès à une vue dégagée",order:"12",redirect:false},
];

export const topbarRows:topbarRowType[]=[
    {id:"topbar-row-resumes",cat:"resumes",catFr:"CVs",icon:BiSolidReport,desc:resumeDesc.desc,topbarCats:topbarCats.filter(kv=>(kv.cat==="resumes"))},
    {id:"topbar-row-references",cat:"references",catFr:"références",icon:VscReferences,desc:refDesc.desc,topbarCats:topbarCats.filter(kv=>(kv.cat==="references"))},
    {id:"topbar-row-letters",cat:"letters",catFr:"lettres de motivation",icon:SlEnvolopeLetter,desc:letterDesc.desc,topbarCats:topbarCats.filter(kv=>(kv.cat==="letters"))},
    {id:"topbar-row-combined",cat:"combined",catFr:"combinée",icon:IoIosAttach,desc:combinedDesc.desc,topbarCats:topbarCats.filter(kv=>(kv.cat==="combined"))},
];


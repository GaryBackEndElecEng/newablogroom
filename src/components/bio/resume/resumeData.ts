import { resumeType } from "./refTypes";



export const resume:resumeType={
    name:"main_resume",
    contact:{
        name:"Gary Wallace",
        address:"21 A Saint-Jean",
        city:"Chateauguay, QC, CA",
        PO:"J6J 2x6",
        cell:"416.917.5768",
        email1:"masterconnect919@gmail.com",
        email2:"masterultils@gmail.com",
    },
    sites:["www.masterconnect.ca","www.ablogroom.com","www.masterultils.com","https://github.com/GaryBackEndElecEng/","https://www.linkedin.com/in/gary-wallace-501513229/"],
    summary:"A self-learner, military trained, passionate developer  with +30 years in the High-Tech industry, activily serving serving constituents in the Hightech field ,  is seeking a software position.",
    workExperience:[
        {
            id:0,
            title:"Full Stack Developer",
            company:"Digital Master Connect",
            summary:"Deploy over 6 full stack ES6/NEXT/Django/Angular TypeScript applications, 2 ES6/React-Native apps, 1 popular chrome extensions with JWT user login accounts, all tied to AWS services.",
            location:"Chateauguay, QC,CA",
            from:"2020",
            to:"2025",
            achievements:[
                {
                    id:0,
                    achievement:"specialized in editors using ES6 class-injector base libraries for improved user-friendly editing and data retention features.",
                    reason:"improved JS system && data enhancement while reducing code.",
                    composite:"class dependency injection",
                },
                
                {
                    id:1,
                    achievement:"tailored database tables, using JSON/PSQL mixtures for quick response with minimal delays at the web-server level.",
                    reason:"reduce data corruption while maximizing data retrieval.",
                    composite:"combined JSON/PSQL tables"
                },
                {
                    id:2,
                    achievement:"created multi-layer credit-card payment/confirmation system",
                    reason:"to blend payment processes and confirmation fluidy.",
                },
            ],
            skills:["programming","analytical","mastery of math"]

        },
        {
            id:1,
            title:"Application Engineer",
            company:"Mircom Technologies Inc.",
            summary:"Project designed assisted communication based projects, resolved communication equipment deficiencies and assisted in contract closures.",
            location:"Vaughan, ON,CA",
            from:"2012",
            to:"2019",
            achievements:[
                {
                    id:3,
                    achievement:"Organized and managed a 5000-unit condo multi-layer network system within a 3-month period",
                    reason:"to save cost",
                    composite:"hard-wired / zigbee-MESH /WIFI topology."
                },
               
            ],
            skills:["Hardware","software","IT skills","Rf"]

        },
        {
            id:2,
            title:"Captain level, signals",
            company:"Department of National Defense (DnD)",
            summary:"Manage large existing supply and communication contracts (CANCAP- Canadian National Contractors Agreement (KAF-Kandahar),Managed DWAN network/IP services (CF College,ON) and coordinated CF public-work projects",
            location:"Vaughan, ON / KAF Afghanistan / Saint-Jean, QC / Trenton,ON",
            from:"2001",
            to:"2012",
            achievements:[
                {
                    id:4,
                    achievement:"assisted in a mission through the heaviest Canadian single-day death toll south of Kakerac,AF of the AF-war",
                    reason:""
                },
                {
                    id:5,
                    achievement:"resolved grounding communication issue (Valcartier), which mitigated static discharge issues to the ammo-depo",
                    reason:"initial line communication issue",
                    composite:"1km by 1km ground mesh"
                },
               
            ],
            skills:["persistance","mission Orientated","objectve compliance","encryption"]

        },
    ],

    education:[
        {
            id:0,
            school:"Concordi University",
            location:"Montreal,QC",
            level:"University",
            from:"1995",
            to:"1999",
            degree:"B.Elec Eng.",
            GPA:3.25,
            relevantWork:"",
            extracurricular:" lab work,Micro-chip development",
            skills:["communications","Technology","programming"],
            achievements:[
                    {
                        id:1,
                        achievement:"contructed a npn transitor",
                        reason:"understanding technology",
                        composite:"SiO2-quartz,Bo/Phos,SI-seed",
                    },
                    {
                        id:2,
                        achievement:"contructed a c-gate transitor",
                        reason:"understanding technology",
                        composite:"SiO2-quartz,Bo/Phos,SI-seed, with higher cook time.",
                    },
                    {
                        id:3,
                        achievement:"contructed a voice-recognition system using MC-32 PIC using C-assembly",
                        reason:"understanding technology",
                        composite:"MC-32 PIC,bread-board,C-assembly code"
                    },
                ],
            
        },
        {
            id:1,
            school:"CFC-Platoon Cmd,Signals",
            location:"Kingston,ON",
            level:"Platoon-commander",
            from:"2004",
            to:"2004",
            degree:"Command",
            GPA:undefined,
            relevantWork:"Leadership",
            extracurricular:undefined,
            skills:["communications","Leadership","encryption","RF","planning"],
            achievements:[
                    {
                        id:0,
                        achievement:"completed the shortest comms deployment without personel loss on course",
                        reason:"planning",
                        composite:"75-pers, 15 viehicles",
                    },
                    
                ]
        },
        {
            id:2,
            school:"CFC-Company Cmd,Signals",
            location:"Kingston,ON",
            level:"company-commander",
            from:"2005",
            to:"2005",
            degree:"Company command",
            GPA:undefined,
            relevantWork:"Leadership",
            extracurricular:undefined,
            skills:["communications","Leadership","encryption","RF","planning"],
            achievements:[]
        },
    ],
    extra:{
        languages:["English","French"]
    }
}
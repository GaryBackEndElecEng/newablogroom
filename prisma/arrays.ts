import { developDeployType, quoteCalcItemType } from "@/components/editor/Types";


export const quoteArr:quoteCalcItemType[]=[
    {
        id:0,
        name:"Text Styling",
        type:"text",
        basic:true,
        isPage:true,
        desc:"style text includes margins, line-height and setting format as per client",
        time:1,
        qty:1,
        dollar:20
    },
    {
        id:1,
        name:"Write Up",
        type:"text",
        basic:true,
        isPage:true,
        desc:"corrrelating description to compay's related sub/mission",
        time:1,
        qty:1,
        dollar:30
    },
    {
        id:2,
        name:"Pre Setup",
        type:"schedular",
        basic:false,
        isPage:true,
        desc:"appointment table, db table set up",
        time:3,
        qty:1,
        dollar:20
    },
    {
        id:3,
        name:"Format Scheduler",
        type:"schedular",
        basic:false,
        isPage:true,
        desc:"format data box with date and time selection",
        time:8,
        qty:1,
        dollar:20
    },
    {
        id:4,
        name:"Basic Image Format",
        type:"images",
        basic:true,
        isPage:true,
        desc:"format images as per client requests",
        time:1,
        qty:1,
        dollar:30
    },
    {
        id:5,
        name:"Professional Images",
        type:"images",
        basic:true,
        isPage:true,
        desc:"using adobe pro with subscription",
        time:4,
        qty:1,
        dollar:30
    },
    {
        id:6,
        name:"User Setup",
        type:"#users",
        basic:false,
        isPage:false,
        desc:"database account setup",
        time:3,
        qty:1,
        dollar:20
    },
    {
        id:6,
        name:"Secure Accounts",
        type:"#users",
        basic:false,
        isPage:false,
        desc:"using JWT and CSRF to secure account",
        time:4,
        qty:1,
        dollar:30
    },
    {
        id:7,
        name:"User Login Integration",
        type:"#users",
        basic:false,
        isPage:false,
        desc:"Integrate users into navigation for login & logout access",
        time:6,
        qty:1,
        dollar:30
    },
    {
        id:8,
        name:"Meta Static page",
        type:"meta",
        basic:false,
        isPage:true,
        desc:"Add Metadata to each page",
        time:6,
        qty:1,
        dollar:30
    },
    {
        id:9,
        name:"Goggle Registration",
        type:"meta",
        basic:false,
        isPage:true,
        desc:"register all pages to google for google searches",
        time:2,
        qty:1,
        dollar:30
    },
    {
        id:10,
        name:"Page Setup",
        type:"pages",
        basic:false,
        isPage:true,
        desc:"basic page setup ",
        time:1,
        qty:1,
        dollar:30
    },
    {
        id:11,
        name:"Page Selection",
        type:"pageNames",
        basic:false,
        isPage:true,
        desc:"page selection ",
        time:0,
        qty:1,
        dollar:0
    },
]

export const deveDeployArr:developDeployType[]=[
    {
        id:0,
        name:"work on this",
        type:"text",
        basic:true,
        isPage:true,
        stage:"development",
        desc:"style text includes margins, line-height and setting format as per client",
        time:1,
        qty:1,
        dollar:20
    },
    {
        id:1,
        name:"Text Styling",
        type:"text",
        basic:true,
        isPage:true,
        stage:"development",
        desc:"style text includes margins, line-height and setting format as per client",
        time:1,
        qty:1,
        dollar:20
    },
    {
        id:2,
        name:"Text Styling",
        type:"text",
        basic:true,
        isPage:true,
        stage:"development",
        desc:"style text includes margins, line-height and setting format as per client",
        time:1,
        qty:1,
        dollar:20
    },
    {
        id:3,
        name:"Text Styling",
        type:"text",
        basic:true,
        isPage:true,
        stage:"deployment",
        desc:"style text includes margins, line-height and setting format as per client",
        time:1,
        qty:1,
        dollar:20
    },
    {
        id:4,
        name:"Text Styling",
        type:"text",
        basic:true,
        isPage:true,
        stage:"deployment",
        desc:"style text includes margins, line-height and setting format as per client",
        time:1,
        qty:1,
        dollar:20
    },
]
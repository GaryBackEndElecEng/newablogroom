import { getUserImage } from "@/lib/awsFunctions";
import { messageType, postType, userType } from "../editor/Types"
const logo = "https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/gb_logo_600.png";
const userpic = "https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/userpic.png";
const thankyou = "https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/thankYou.png"

export const signUpText = (item: { user: userType }) => {
    const { user } = item;
    return (
        `<h1>Community member</h1>
        <h4>${user.name ? user.name : "blogger"}, Thank for signing up with Us</h4>
    <br>
    <span><img src="${logo}" alt="www.ablogroom.com" style="width:100px;height:100px;"/><h4>${"ABLOGROOM.COM"}</h4></span>
    <br/>
    <p>We are always updating our free services and will let you know when, new services are available</p>
    <p>We will email as soon as new services become available to your email @: ${user.email}</p>
    <br>
    <br>
    <a href="www.masterconncet.ca">master connect</a>
    <p>email: masterultils@gmail.com</p>`
    )
}
export const signUpHTML = async (item: { user: userType }) => {
    const { user } = item;
    const newUser = await getUserImage(user)
    const username = user.name ? user.name : "blogger";
    const image = newUser.imgKey || userpic;
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>You've signed up</title>
            <style>
                body{
                    border-radius:10px;
                    box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
                }
                h4{
                    color:blue;
                }
                h1{ 
                font:bold;
                text-decoration:underline;
                text-underline-offset:0.5rem;
                color:#0848ea;
                }
                .masterultils{
                    background:whitesmoke;
                    margin-block:20px;
                    padding-block:20px;
                    border-radius:10%;
                    width:30%;
                    padding:2rem;
                    text-align:left;
                    box-shadow:1px 1px 20px 2px grey,-1px -1px 20px 2px grey;
                }
                p{margin-block:10px}
                .list{
                    margin-block:20px;
                    background:white;
                    border-radius:10px;
                    padding:7px;
                    box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
                }
                    .list>li{
                    padding-block:3px;
                }
                img{
                    border-radius:50%;
                    padding:1rem;
                    box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px white;
                    width:100px;
                    aspect-ratio:1 /1;
                    background-color:whitesmoke;
                    filter:drop-shadow(0 0 0 0.75rem white);
                    float:left;
                    shape-outside:circle(50%);
                    margin-right:1rem;
                }
                .img2{
                    border-radius:50%;
                    padding:1rem;
                    box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px white;
                    width:65px;
                    aspect-ratio:1 /1;
                    background-color:whitesmoke;
                    filter:drop-shadow(0 0 0 0.75rem white);
                    float:left;
                    margin-right:1rem;
                }
                #thankyou{
                border-radius:12px;
                box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px lightblue;
                width:100px;
                padding:1rem;
                background-color:blue;
                filter:drop-shadow(0 0 0 0.75rem lightblue);
                float:left;
                shape-outside:inset(10px 10px 10px 10px);
                margin-right:1rem;
                }
                    .flex-row{
                    display:flex;
                    flex-direction:row;
                    flex-wrap:wrap;
                    justify-content:center;
                    align-items:center;
                    gap:1rem;
                    }
            </style>
        </head>
        <body>
            <h1>Community Member.</h1>
           <span class="flex-row"><img class="img2" src="${image}" alt="${username}" <h4>Thank you ${username} for Signing up with us.</h4></span>
            <br/>
            <span><img class="img2" src=${logo} /><h4>ABLOGROOM.COM</h4></span>
            <br/>
            <p>We are always updating our free services and will let you know when, new services are available</p>
            <p>We will email as soon as new services become available to your email @: ${user.email}</p>
            <p> please do not hesitate to communicate with us.We work hard to provide free services for your needs.</p>
            <h4> additional interesting things you might like</h4>
            <ul class="list">
                <li><a href="https://www.masterultils.com/articles">articles</a></li>
                <li><a href="https://www.masterultils.com/contact">Contact Us</a></li>
                <li><a href="https://www.masterultils.com/register">register</a></li>
                <li><a href="https://www.masterconnect.ca/design">Our Designs</a></li>
            </ul>
            
            <p style="max-width:600px;">

                <img id=thankyou src=${thankyou} alt="www.masterconnect.ca"
                
                />
                We try to make your life easy and equally ensure that you are connected. Please let us know if we can improve your needs.
                <a href="www.masterconncet.ca">master connect</a>
                Gary Wallace,<a href="mailto: masterultils@gmail.com">send us an email.</a>
            </p>
        </body>
        </html>
    `
    )
}
export const simpleSignUpText = (item: { email: string, name: string }) => {
    const { email, name } = item;
    return (
        `<h1>Community member</h1>
        <h4>${name || "blogger"}, Thank for signing up with Us</h4>
    <br>
    <span><img src="${logo}" alt="www.ablogroom.com" style="width:100px;height:100px;"/><h4>${"ABLOGROOM.COM"}</h4></span>
    <br/>
    <p>We are always updating our free services and will let you know when, new services are available</p>
    <p>We will email as soon as new services become available to your email @: ${email}</p>
    <br>
    <br>
    <a href="www.masterconncet.ca">master connect</a>
    <p>email: masterultils@gmail.com</p>`
    )
}
export const simpleSignUpHTML = (item: { name: string, email: string }) => {
    const { name, email } = item;

    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>You've signed up</title>
            <style>
                body{
                    border-radius:10px;
                    box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
                }
                h4{
                    color:blue;
                }
                h1{ 
                font:bold;
                text-decoration:underline;
                text-underline-offset:0.5rem;
                color:#0848ea;
                }
                .masterultils{
                    background:whitesmoke;
                    margin-block:20px;
                    padding-block:20px;
                    border-radius:10%;
                    width:30%;
                    padding:2rem;
                    text-align:left;
                    box-shadow:1px 1px 20px 2px grey,-1px -1px 20px 2px grey;
                }
                p{margin-block:10px}
                .list{
                    margin-block:20px;
                    background:white;
                    border-radius:10px;
                    padding:7px;
                    box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
                }
                    .list>li{
                    padding-block:3px;
                }
                img{
                    border-radius:50%;
                    padding:1rem;
                    box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px white;
                    width:100px;
                    aspect-ratio:1 /1;
                    background-color:whitesmoke;
                    filter:drop-shadow(0 0 0 0.75rem white);
                    float:left;
                    shape-outside:circle(50%);
                    margin-right:1rem;
                }
                .img2{
                    border-radius:50%;
                    padding:1rem;
                    box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px white;
                    width:65px;
                    aspect-ratio:1 /1;
                    background-color:whitesmoke;
                    filter:drop-shadow(0 0 0 0.75rem white);
                    float:left;
                    margin-right:1rem;
                }
                #thankyou{
                border-radius:12px;
                box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px lightblue;
                width:100px;
                padding:1rem;
                background-color:blue;
                filter:drop-shadow(0 0 0 0.75rem lightblue);
                float:left;
                shape-outside:inset(10px 10px 10px 10px);
                margin-right:1rem;
                }
                    .flex-row{
                    display:flex;
                    flex-direction:row;
                    flex-wrap:wrap;
                    justify-content:center;
                    align-items:center;
                    gap:1rem;
                    }
            </style>
        </head>
        <body>
            <h1>Community Member.</h1>
           <h4>Thank you ${name} for Signing up with us.</h4>
            <br/>
            <span><img class="img2" src=${logo} /><h4>ABLOGROOM.COM</h4></span>
            <br/>
            <p>We are always updating our free services and will let you know when, new services are available</p>
            <p>We will email as soon as new services become available to your email @: ${email}</p>
            <p> please do not hesitate to communicate with us.We work hard to provide free services for your needs.</p>
            <h4> additional interesting things you might like</h4>
            <ul class="list">
                <li><a href="https://www.masterultils.com/articles">articles</a></li>
                <li><a href="https://www.masterultils.com/contact">Contact Us</a></li>
                <li><a href="https://www.masterultils.com/register">register</a></li>
                <li><a href="https://www.masterconnect.ca/design">Our Designs</a></li>
            </ul>
            
            <p style="max-width:600px;">

                <img id=thankyou src=${thankyou} alt="www.masterconnect.ca"
                
                />
                We try to make your life easy and equally ensure that you are connected. Please let us know if we can improve your needs.
                <a href="www.masterconncet.ca">master connect</a>
                Gary Wallace,<a href="mailto: masterultils@gmail.com">send us an email.</a>
            </p>
        </body>
        </html>
    `
    )
}
export const clientMsgText = (item: { viewerName: string | null, viewerEmail: string, msg: string, user: userType }) => {
    const { viewerName, viewerEmail, msg, user } = item;
    return (
        `<h1>Community member</h1>
        <h4>Thank for emailing us ${viewerName}</h4>
    <br>
        ${msg}
        <br/>
    <span><img src="${user.image ? user.image : logo}" alt="${viewerName}" style="width:100px;height:100px;"/><h4>${viewerName || "blogger"}</h4></span>
    <br/>
    <p>We are always updating our free services and will let you know when, new services are available</p>
    <p>We will email as soon as new services become available to your email @: ${viewerEmail}</p>
    <br>
    <br>
    <a href="www.masterconncet.ca">master connect</a>
    <p>email: masterultils@gmail.com</p>`
    )
}
export const clientMsgHTML = async (item: { viewerName: string | null, viewerEmail: string, msg: string, user: userType }) => {
    const { viewerName, viewerEmail, msg, user } = item;
    const newUser = user ? await getUserImage(user) : null;
    const userImage = newUser?.imgKey ? newUser.image : userpic;

    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>You've signed up</title>
            <style>
                body{
                    border-radius:10px;
                    box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
                }
                h4{
                    color:blue;
                }
                h1{ 
                font:bold;
                text-decoration:underline;
                text-underline-offset:0.5rem;
                color:#0848ea;
                }
                .masterultils{
                    background:whitesmoke;
                    margin-block:20px;
                    padding-block:20px;
                    border-radius:10%;
                    width:30%;
                    padding:2rem;
                    text-align:left;
                    box-shadow:1px 1px 20px 2px grey,-1px -1px 20px 2px grey;
                }
                p{margin-block:10px}
                .list{
                    margin-block:20px;
                    background:white;
                    border-radius:10px;
                    padding:7px;
                    box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
                }
                    .list>li{
                    padding-block:3px;
                }
                img{
                    border-radius:50%;
                    padding:1rem;
                    box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px white;
                    width:100px;
                    aspect-ratio:1 /1;
                    background-color:whitesmoke;
                    filter:drop-shadow(0 0 0 0.75rem white);
                    float:left;
                    shape-outside:circle(50%);
                    margin-right:1rem;
                }
                .img2{
                    border-radius:50%;
                    padding:1rem;
                    box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px white;
                    width:50px;
                    aspect-ratio:1 /1;
                    background-color:whitesmoke;
                    filter:drop-shadow(0 0 0 0.75rem white);
                    float:left;
                    margin-right:1rem;
                }
                .flex-row{
                display:flex;
                flex-wrap:wrap;
                align-items:center;
                gap:1rem;

                }
            </style>
        </head>
        <body>
            <h1>Community member</h1>
            <br/>
            <span class="flex-row"><img class="img2" src=${userImage} /><h4>${viewerName || "blogger"}</h4></span>
            <br/>
            <p>${msg}</p>
            <br/>
            <p>We are always updating our free services and will let you know when, new services are available</p>
            <p>We will email as soon as new services become available to your email @: ${viewerEmail}</p>
            <br>
            <br>
            <h4> additional interesting things you might like</h4>
            <ul class="list">
                <li><a href="https://www.masterultils.com/articles">articles</a></li>
                <li><a href="https://www.masterultils.com/contact">Contact Us</a></li>
                <li><a href="https://www.masterultils.com/register">register</a></li>
                <li><a href="https://www.masterconnect.ca/design">Our Designs</a></li>
            </ul>
            
            <p style="max-width:600px;">

                <img src=${logo} alt="www.masterconnect.ca"
                
                />
                We try to make your life easy and equally ensure that you are connected. Please let us know if we can accommodate your needs to further your relations with us.
                <a href="www.masterconncet.ca">master connect</a>
                Gary Wallace,<a href="mailto: masterultils@gmail.com">send us an email.</a>
            </p>
        </body>
        </html>
    `
    )
}
export const adminMsgText = (item: { message: messageType, user: userType, reply: string }) => {
    const { message, reply, user } = item;
    const { email, name, msg } = message;
    return (
        `<h1>Community member</h1>
    <br>
    <h1>Thanks for your request ${name || "Blogger"}</h1>
    <ul>
    <li>email:<u>${email}</u></li>
    <li><u>your rquest:</u><span> ${msg}</span></li>
    </ul>

    <p>Thank you for sending us a reply for your concern. Please see our reply for your concern.</p>
    <br/>
    <p ><bold>${reply}</bold></p>
    <br>
    <div>
    <p>Sincerely,</p>
    <br>
    <div>
    <bold>
    <p>${user.name ? user.name : "Gary Wallace"}</p>
    <p>Admin Staff: developer</p>
    <p>email:<a href="mailto:${user.email}">${user.email}</a></p>
    <p>tel:<a href="tel:416-917-5768">cell</a></p>
    </bold>
    </div>
    </div>
    <br>
    <br>
    <a href="www.masterconncet.ca">master connect</a>
    <p>email: masterultils@gmail.com</p>`
    )
}
export const adminMsgHTML = (item: { message: messageType, user: userType, reply: string }) => {
    const { message, reply, user } = item;
    const { email, name, msg } = message;
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>REPLY:<span style="color:blue;">ADMIN:Ablogroom.com</span></title>
            <style>
            .flex-column{
                display:flex;
                justify-content:center;
                align-items:flex-start;
                flex-direction:column;
                gap:1.5rem;
            }
                body{
                    border-radius:10px;
                    box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
                    border-radius:12px;
                    background-color:#0C090A;
                    color:white;
                    font-family:Poppins-Regular;
                    padding:1rem;
                    padding-inline:2rem;
                    display:flex;
                    justify-content:flex-start;
                    align-items:flex-start;
                    flex-direction:column;
                    width:100%;
                    font-size:16px;
                }
                h4{
                    color:blue;
                }
                h1{ 
                font:bold;
                text-decoration:underline;
                text-underline-offset:0.5rem;
                color:#0848ea;
                }
                .masterultils{
                    background:whitesmoke;
                    margin-block:20px;
                    padding-block:20px;
                    border-radius:10%;
                    width:30%;
                    padding:2rem;
                    text-align:left;
                    box-shadow:1px 1px 20px 2px grey,-1px -1px 20px 2px grey;
                }
                p{margin-block:10px}
                .list{
                    margin-block:20px;
                    background:white;
                    border-radius:10px;
                    padding:7px;
                    box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
                }
                .list >li{
                    padding-block:3px;
                }  
                img{
                    border-radius:50%;
                    padding:1rem;
                    box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px white;
                    width:100px;
                    aspect-ratio:1 /1;
                    background-color:whitesmoke;
                    filter:drop-shadow(0 0 0 0.75rem white);
                    float:left;
                    shape-outside:circle(50%);
                    margin-right:1rem;
                }
                .reply {
                    padding-inline:1rem;
                    margin-inline:auto;
                    margin-block:1.5rem;
                    text-wrap:pretty;
                     font-family:Poppins-Regular;
                }
                .sincerely {
                    font-family:LobsterTwo-Regular;
                    font-size:110%;
                    margin-left:1rem;
                }
                .signature {
                    margin-left:1rem;
                    color:rgba(8, 4, 249,0.5);
                    font-weight:bold;
                }
            </style>
        </head>
        <body>
            <h3>Thanks for your request ${name || "Blogger"}</h3>
            <ul>
            <li>email:${email}</li>
            <li>your request:<span class="reply"> ${msg}</span></li>
            </ul>

            <p>Thank you for sending us a reply for your concern. Please see our reply for your concern.</p>
            <p class="reply">${reply}</p>
            <br>
            <p class="sincerely">Sincerely,</p>
            <br>
            <div class="signature flex-column">
            <p class="color:white;">${user.name ? user.name : "Gary Wallace"}</p>
            <p class="color:white;">Admin Staff: developer</p>
            <p class="color:white;">email:<a href="mailto:${user.email}">${user.email}</a></p>
            <p class="color:white;">tel:<a href="tel:416-917-5768">cell</a></p>
            </div>
            <h4> additional interesting things you might like</h4>
            <ul class="list">
                <li><a href="https://www.masterultils.com/articles">articles</a></li>
                <li><a href="https://www.masterultils.com/contact">Contact Us</a></li>
                <li><a href="https://www.masterultils.com/register">register</a></li>
                <li><a href="https://www.masterconnect.ca/design">Our Designs</a></li>
            </ul>
            
            <p style="max-width:600px;">

                <img src="https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logo.png" alt="www.masterconnect.ca"
                
                />
                We try to make your life easy and equally ensure that you are connected. Please let us know if we can accommodate your needs to further your relations with us.
                <a href="www.masterconncet.ca">master connect</a>
                Gary Wallace,<a href="mailto: masterultils@gmail.com">send us an email.</a>
            </p>
        </body>
        </html>
    `
    )
}
export const QuoteHTML = (item: { message: { msg: string }, user: userType, quoteImg: string, EMAIL: string }) => {
    const { message, user, quoteImg, EMAIL } = item;
    const { name, email } = user;
    const { msg } = message
    return (
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .flex-column{
            display:flex;
            justify-content:center;
            align-items:flex-start;
            flex-direction:column;
            gap:1.5rem;
        }
            body{
                border-radius:10px;
                box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
                border-radius:12px;
                background-color:white;
                font-family:'Poppins-Regular';
                padding:1rem;
                padding-inline:2rem;
                display:flex;
                justify-content:flex-start;
                align-items:flex-start;
                flex-direction:column;
                width:100%;
                font-size:16px;
                 margin-inline:auto;
                 position:relative;
            }
            h4{
                color:blue;
            }
            h1{ 
                font:bold;
                text-decoration:underline;
                text-underline-offset:0.5rem;
                color:#0848ea;
                }
            .masterultils{
                background:whitesmoke;
                margin-block:20px;
                padding-block:20px;
                border-radius:10%;
                width:30%;
                padding:2rem;
                text-align:left;
                box-shadow:1px 1px 20px 2px grey,-1px -1px 20px 2px grey;
            }
            p{margin-block:10px}
            .list{
                margin-block:20px;
                background:white;
                border-radius:10px;
                padding:7px;
                box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
            }
            .list >li{
                padding-block:3px;
            }  
            img{
                border-radius:50%;
                box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px white;
                width:120px;
                aspect-ratio:1 /1;
                background-color:whitesmoke;
                filter:drop-shadow(0 0 0 0.75rem white);
                float:left;
                shape-outside:circle(50%);
                margin-right:1rem;
            }
            #divCont{
                margin-inline:1px;
                padding:0.5rem;
                border-radius:12px;
                max-width:800px;
                position:relative;
                background-color:black;
                margin-block:1.5rem;
                width:100%;
                overflow-x:scroll;
                height:auto;
            }
            img#quote{
                border-radius:12px;
                padding:1rem;
                box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px lightblue;
                width:100%;
                /* max-width:800px; */
                background-color:whitesmoke;
                float:center;
                margin-inline:10px;
            }
            .reply {
                padding-inline:1rem;
                margin-inline:auto;
                margin-block:1.5rem;
                text-wrap:pretty;
                 font-family:Poppins-Regular;
            }
            .sincerely {
                font-family:LobsterTwo-Regular;
                font-size:110%;
                margin-left:1rem;
            }
            .signature {
                margin-left:1rem;
                color:rgba(8, 4, 249,0.5);
                font-weight:bold;
            }
    </style>
</head>
<body>
    <h3>Thanks for your request ${name || "Blogger"}</h3>
    <ul>
    <li>email:${email}</li>
    <li>your request:<span class="reply"> ${msg}</span></li>
    </ul>

    <p>Thank you for sending us a request for quote.your quote is below.</p>
    <div id="divCont">
        <img id="quote" src=${quoteImg} alt="www.ablogroom.com"/>

    </div>
    <p class="sincerely">Sincerely,</p>
    <br>
    <div class="signature flex-column">
    <p class="color:white;">Gary Wallace</p>
    <p class="color:white;">Admin Staff: developer</p>
    <p class="color:white;">email:<a href="mailto:${EMAIL}">${EMAIL}</a></p>
    <p class="color:white;">tel:<a href="tel:416-917-5768">cell</a></p>
    </div>
    <h4> additional interesting things you might like</h4>
    <ul class="list">
        <li><a href="https://www.masterultils.com/articles">articles</a></li>
        <li><a href="https://www.masterultils.com/contact">Contact Us</a></li>
        <li><a href="https://www.masterultils.com/register">register</a></li>
        <li><a href="https://www.masterconnect.ca/design">Our Designs</a></li>
    </ul>
    
    <p style="max-width:600px;">

        <img src="https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/quote_large.png" alt="www.masterconnect.ca"
        
        />
        We try to make your life easy and equally ensure that you are connected. Please let us know if we can accommodate your needs to further your relations with us.
        <a href="www.masterconncet.ca">master connect</a>
        Gary Wallace,<a href="mailto: masterultils@gmail.com">send us an email.</a>
    </p>
</body>
</html>
    `
    )
}
export const QuoteText = (item: { message: { msg: string }, user: userType, quoteImg: string, EMAIL: string }) => {
    const { message, quoteImg, user, EMAIL } = item;
    const { msg } = message;
    const { name, email } = user;
    return (
        `<h1>Community member</h1>
    <br>
    <h1>Thanks for your request ${name || "Blogger"}</h1>
    <ul>
    <li>email:<u>${email}</u></li>
    <li><u>your request:</u><span> ${msg}</span></li>
    </ul>

    <p>Thank you for sending us a request for Quote. Please see our your quote below.</p>
    
    <br/>
    <a href=${quoteImg}> your Quote( click to see)</a>
    <br>
    <div>
    <p>Sincerely,</p>
    <br>
    <div>
    <bold>
    <p>${"Gary Wallace"}</p>
    <p>Admin Staff: developer</p>
    <p>email:<a href="mailto:${EMAIL}">${EMAIL}</a></p>
    <p>tel:<a href="tel:416-917-5768">cell</a></p>
    </bold>
    </div>
    </div>
    <br>
    <br>
    <a href="www.masterconncet.ca">master connect</a>
    <p>email: masterultils@gmail.com</p>`
    )
}
export const sendReqAnswerText = async (item: { clientName: string | undefined, clientEmail: string, msg: string | undefined, user: userType, post: postType, uri: string | null }) => {
    const { clientName, clientEmail, msg, user, post, uri } = item;
    const user_aws = user.imgKey ? await getUserImage(user) : { ...user, image: userpic };
    return (
        `<h1>Community member</h1>
        <h4>Thank for emailing us ${clientName}</h4>
    <br>
        ${msg}
        <br/>
    <span><img src="${user_aws.image}" alt="${user_aws.image}" style="width:100px;height:100px;"/><h4>${user.name ? user.name : "blogger"}</h4></span>
    <br/>
    <p> ${post.sendReqKey ? `Thank you ${clientName} for sending an request for answers to the post, linked below` : `the answers are presented blow:`}</p>
    <p>We are sending your request as a link to your email @: ${clientEmail}</p>
    <br>
    <a href=https://www.ablogroom.com/post/${post.id}>${post.title}</a>
    <br>
    <p>safe amazon link registered link to the answer, below</p>
        <br/>
        ${post.sendReqKey ? `<a href=${uri || "#"}>${uri ? uri.slice(0, 25) : ""}</a>` : `<p> ${msg}</p>`}
    <br>
    <a href="www.masterconncet.ca">master connect</a>
    <p>email: masterultils@gmail.com</p>
    <br/>
    <p> email author:</p>
    <a href=mailto:${user.email}>${user.name}</a>
    `
    )
}
export const sendReqAnswerHTML = async (item: { clientName: string | undefined, clientEmail: string, msg: string | undefined, user: userType, post: postType, uri: string | null }) => {
    const { clientName, msg, user, post, uri } = item;
    const user_aws = user.imgKey ? await getUserImage(user) : { ...user, image: userpic };

    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>You've signed up</title>
            <style>
                body{
                    border-radius:10px;
                    box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
                }
                h4{
                    color:blue;
                }
                h1{ 
                font:bold;
                text-decoration:underline;
                text-underline-offset:0.5rem;
                color:#0848ea;
                }
                .masterultils{
                    background:whitesmoke;
                    margin-block:20px;
                    padding-block:20px;
                    border-radius:10%;
                    width:30%;
                    padding:2rem;
                    text-align:left;
                    box-shadow:1px 1px 20px 2px grey,-1px -1px 20px 2px grey;
                }
                p{margin-block:10px}
                .list{
                    margin-block:20px;
                    background:white;
                    border-radius:10px;
                    padding:7px;
                    box-shadow:1px 1px 5px 20px grey,-1px -1px -5px 20px grey;
                }
                    .list>li{
                    padding-block:3px;
                }
                .img1{
                    border-radius:50%;
                    padding:1rem;
                    box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px white;
                    width:100px;
                    aspect-ratio:1 /1;
                    background-color:whitesmoke;
                    filter:drop-shadow(0 0 0 0.75rem white);
                    float:left;
                    shape-outside:circle(50%);
                    margin-right:1rem;
                }
                .img2{
                    border-radius:50%;
                    padding:5px;
                    box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px black;
                    width:70px;
                    aspect-ratio:1 /1;
                    background-color:whitesmoke;
                    filter:drop-shadow(0 0 0 0.75rem black);
                    float:left;
                    margin-right:1rem;
                }
                div.sendReqKeyImgCont{
                    self-align:start;
                    self-justify:start;
                    border-radius:12px;
                    padding:5px;
                    box-shadow: 2px 2px 10px 2px black,-2px -2px 10px 2px black;
                    max-width:650px;
                    width:100%;
                    background-color:whitesmoke;
                    filter:drop-shadow(0 0 0 0.75rem black);
                    float:center;
                    margin-right:1rem;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }
                .flex-row{
                display:flex;
                flex-wrap:wrap;
                align-items:center;
                gap:1rem;

                }
                div.intro{
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                    gap:0.75rem;
                }
                div.msgContainer{
                self-align:start;
                self-justify:start;
                display:flex;
                flex-direction:column;
                align-items:center;
                max-width:700px;
                width:100%;
                padding-inline:1rem;
                border-top:1px solid blue;
                border-bottom:1px solid blue;
                padding-block:1.5rem;
                }
            </style>
        </head>
        <body>
            <h1>Community member</h1>
            <br/>
            <span class="flex-row"><img class="img2" src=${user_aws.image} />
            <div class="intro">
                <h6>${user.name ? user.name : "Blogger"}</h6>
                ${clientName ? `<h6>, Thank for emailing us ${clientName}</h6>` : "<h6> thank you for emailing us.</h6>"}</h6>
            </div>
            </span>
            <br/>
            
            <p> ${post.sendReqKey ? `Thank you ${clientName} for sending an request for answers to the post, linked below` : `the answers are presented below:`}</p>
            <br>
            <a href=https://www.ablogroom.com/post/${post.id}>${post.title}</a>
            <br>
            <p>safe amazon link registered link to the ${post.title ? post.title : "post"}. The answer is below</p>
            <br/>
            ${post.sendReqKey ? `<div class="sendReqKeyImgCont"><img src=${uri || "#"} alt=" sorry your email does not accept styling"></div>` : ""}
            ${post.sendMsg ? `<div class="msgContainer"><p>cont: ${msg}</p></div>` : ""}
            <br>
            <br>
            <h4> additional interesting things you might like</h4>
            <ul class="list">
                <li><a href="https://www.masterultils.com/articles">articles</a></li>
                <li><a href="https://www.masterultils.com/contact">Contact Us</a></li>
                <li><a href="https://www.masterultils.com/register">register</a></li>
                <li><a href="https://www.masterconnect.ca/design">Our Designs</a></li>
            </ul>
            
            <p style="max-width:600px;">

                <img class="img1" src=${logo} alt="www.masterconnect.ca"
                
                />
               <span> We try to make your life easy and equally ensure that you are connected. Please let us know if we can accommodate your needs to further your relations with us.
                <a href="www.masterconncet.ca">master connect</a>
                Gary Wallace,<a href="mailto: masterultils@gmail.com">send us an email.</a></span>
            </p>
        </body>
        </html>
    `
    )
}
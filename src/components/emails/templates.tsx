import { getUserImage } from "@/lib/awsFunctions";
import { messageType, userType } from "../editor/Types"
const logo = "/images/gb_logo.png"

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
    const image = user.imgKey ? newUser.image : logo;
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
                h1{ font:"bold";text-decoration:underline;text-underline-offset: 3;}
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
                    width:100px;
                    aspect-ratio:1 /1;
                    background-color:whitesmoke;
                    filter:drop-shadow(0 0 0 0.75rem white);
                    float:left;
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
           <span class="flex-row"><img class="img2" src="${image}" alt="${username}" <h4>Thank you ${username} for Signin up with us.</h4></span>
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

                <img src="https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logo.png" alt="www.masterconnect.ca"
                
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
    <span><img src="${user.image ? user.image : logo}" alt="${viewerName}" style="width:100px;height:100px;"/><h4>${viewerName ? viewerName : "blogger"}</h4></span>
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
    const newUser = user.imgKey ? await getUserImage(user) : user;

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
                h1{ font:"bold";text-decoration:underline;text-underline-offset: 3;}
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
                    width:100px;
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
            <span class="flex-row"><img class="img2" src=${newUser.image ? newUser.image : logo} /><h4>${viewerName ? viewerName : "Blogger"}</h4></span>
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
export const adminMsgText = (item: { message: messageType, user: userType, reply: string }) => {
    const { message, reply, user } = item;
    const { email, name, msg } = message;
    return (
        `<h1>Community member</h1>
    <br>
    <h1>Thanks for your request ${name ? name : "Blogger"}</h1>
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
                h1{ font:"bold";text-decoration:underline;text-underline-offset: 3;}
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
            <h3>Thanks for your request ${name ? name : "Blogger"}</h3>
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
            h1{ font:"bold";text-decoration:underline;text-underline-offset: 3;}
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
    <h3>Thanks for your request ${name ? name : "Blogger"}</h3>
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
    <h1>Thanks for your request ${name ? name : "Blogger"}</h1>
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
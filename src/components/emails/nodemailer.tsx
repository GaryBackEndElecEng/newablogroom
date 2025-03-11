import nodemailer from "nodemailer";
const email = process.env.EMAIL2 as string;
const pass = process.env.EMAIL_PASS as string;
const adminEmail = process.env.NEXT_PUBLIC_adminemail as string
const file = "https://new-master.s3.ca-central-1.amazonaws.com/static/files/Resume.pdf";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass
    }
});
export const mailOptions = (toEmail: string) => {
    return ({
        from: email,
        to: toEmail,
        bcc: [adminEmail, email],
        html: 'Embedded image: <img src="https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logo.png" alt="www.masterconnect.ca"/>',
        attachments: [{
            filename: 'resume',
            path: file,

        }]
    })
}
export const sendOptions = ({ toEmail, viewerEmail }: { toEmail: string, viewerEmail: string }) => {
    //VIEWEREMAIL===CLIENT!!
    return ({
        from: email,
        to: viewerEmail,
        bcc: [adminEmail, email, toEmail],
        html: 'Embedded image: <img src="https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logo.png" alt="www.masterconnect.ca"/>',

    })
}
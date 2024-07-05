const nodemail = require('nodemailer');
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASSWORD;

interface EmailParams {
    emailTo: string;
    subject: string;
    code: string;
    content: string;
  }

  

  const sendEmail = async ({emailTo, subject, code, content}: EmailParams):Promise<void> => {
    const transporter = nodemail.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: senderEmail,
            pass: senderPassword
        }

        

    })

    
        const message = {
            to: emailTo,
            subject,
            html:`
            <div>
            <h3>Use this below code to ${content}</h3>
            <p><strong>Code:</strong> ${code} </p>
            </div>
            `
        }

        await transporter.sendMail(message)


  }

  export default sendEmail
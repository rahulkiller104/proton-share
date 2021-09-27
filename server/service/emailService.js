const { response } = require('express');
const nodemailer=require('nodemailer');

const sendMail=async({from,to,subject,text,html})=>{
 
    let transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_MAIL, // generated ethereal user
          pass: process.env.SMTP_PASS, // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: `proton <${from}>`, // sender address
        to: to, // list of receivers
        subject:subject, // Subject line
        text: text, // plain text body
        html: html, // html body
      });

   
    

}

module.exports=sendMail;
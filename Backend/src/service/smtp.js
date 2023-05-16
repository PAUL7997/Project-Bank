const nodemailer = require('nodemailer');

const sendEmail = async(data)=>
{
    try
    {console.log(data)
        let transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "gmail", // generated ethereal user
              pass: "password" // generated ethereal password
            },
          });
        
          let info = await transporter.sendMail({
            from: 'paul.sudhakar78@gmail.com', // sender address
            to: 'paul.sudhakar78@gmail.com', // list of receivers
            subject: data.subject, // Subject line
            text: "Hello world?", // plain text body
            html:`<h1>Hello ${data.message.fistName}</h1>`, // html body
          });
        
    }
    catch(error)
    {
        console.log(error);
    }
}; 

module.exports = {
    sendEmail : sendEmail
}

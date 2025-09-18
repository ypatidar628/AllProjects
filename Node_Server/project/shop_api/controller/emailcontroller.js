import nodemailer from 'nodemailer'

function sendMessageOnMail(receiver_mail,message){
    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'example.964322@gmail.com',
            pass:'xuqhijsaxkcmkxkp'
        }
    })

    var details = {
        from: 'example.964322@gmail.com', // Replace with your email
        to: receiver_mail,
        subject: 'Batch 4:30 PM',
        html: `<h1>Welcome to My Shop App</h1>
               <p>This is a verification mail from My Shop App</p>
               <h2>Email: ${receiver_mail}<br/>OTP is: ${message}</h2>`
      };

    transporter.sendMail(details,(err,result)=>{
        if(!err)
        {
            console.log("Otp Sent To your Mail : Please Check",result.response);
        }
        else{
            console.log("Mail Not Sent : ",err)                
        }
    })
}
export default sendMessageOnMail;
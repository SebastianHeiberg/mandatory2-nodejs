import { Router, text } from "express"
import nodemailer from 'nodemailer'

const router = Router()

router.post('/contact', async (req, res) => {
    const { to, subject, text } = req.body  
   
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });

    try{
    await transporter.sendMail({
        from: 'student@kea.dk',
        to: to,
        subject: subject,
        text: text,
        html: `<b>${text}</b>`,
      });

      res.status(200).send( { data: 'Mail successfully' })

    } catch(err) {
        console.log('Error with mail: ', err)
        res.status(500).send({ data: 'Error in sending mail: ' + err })
    }
    })
  
  export default router
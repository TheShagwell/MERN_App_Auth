import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

import ENV from '../config.js'

let config = {
    service: 'gmail',
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD
    }
}

let transporter = nodemailer.createTransport(config);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
})

export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    // body of the mail
    var email = {
        body: {
            name: username,
            intro: text || 'Oh Buddy! you are welcome to our live-session with you',
            outro: 'If you need any assistance to how you can be onboarded, please visit our live-session'
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from: ENV.EMAIL,
        to: userEmail, 
        subject: subject || 'Welcome to Live-Session',
        html: emailBody
    }

    transporter.sendMail(message)
        .then(() => {
            return res.status(200).json({ msg: "You should receive an email from us shortly..."})
        })
        .catch(error => { 
            res.status(500).json({ error })
        })
}
    
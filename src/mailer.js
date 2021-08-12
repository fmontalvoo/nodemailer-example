import { createTransport } from 'nodemailer';

export default (email) => {
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    const mail = {
        from: process.env.USER,
        to: email.to,
        subject: email.subject,
        // text: email.text,
        html: `
    <strong>Mensaje:</strong> <br/>
    <p>${email.message}</p>
    `
    };

    transporter.sendMail(mail, function (err, info) {
        if (err)
            console.error(err)
        else
            console.info(info);
    });
}
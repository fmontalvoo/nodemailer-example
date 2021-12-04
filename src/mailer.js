import { createTransport } from 'nodemailer';

import fs from "fs";
import path from "path";
import handlebars from "handlebars";

export default (email) => {
    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    const filePath = path.resolve('./src/template/email.handlebars');
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);

    const replacements = {
        title: email.subject,
        message: email.message,
        button: 'Confirmar cuenta'
    };

    const htmlToSend = template(replacements);

    const mail = {
        from: process.env.USER,
        to: email.to,
        subject: email.subject,
        // text: email.text,
        html: htmlToSend
    };

    transporter.sendMail(mail,
        function (err, info) {
            if (err)
                console.error(err)
            else
                console.info(info);
        });
}

// https://unlayer.com/templates
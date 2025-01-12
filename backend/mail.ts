import { BackendiumRouter } from "backendium";
import { object, string } from "checkeasy";
import { createTransport } from "nodemailer";
import cryptoRandomString from "crypto-random-string";

let router = new BackendiumRouter;

const mailer = createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
});

let urlKeys = new Map<string, string>();

router.patch<Buffer, {key: string}>("/recovery/:key", async (request) => {
    
}, {
    paramsValidator: object({
        key: string()
    })
});

router.patch<{mail: string}>("/recovery", async (request, response) => {
    let key = cryptoRandomString({length: 128, type: 'url-safe'});
    let link = `http://176.123.165.201/recovery/${key}`;
    urlKeys.set(key, request.body.mail);
    await mailer.sendMail({
        from: `Информатика в школе №54 <${process.env.MAIL_USER}>`,
        to: request.body.mail,
        subject: "Восстановление пароля",
        html: `Здравствуйте!<br>Для восстановления пароля перейдите по ссылке: <a href="${link}" target="_blank">${link}</a>.`
    });
    response.end();
}, {
    bodyValidator: object({
        mail: string({pattern: /[a-zA-Z_.-]+@[a-zA-Z_.-]+\.(ru|com)/})
    })
});
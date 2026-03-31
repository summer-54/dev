import {createTransport} from "nodemailer";
import {string} from "checkeasy";

export const mailer = createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
});

export async function sendRecoveryMail(to: string, link: string) {
    await mailer.sendMail({
        from: `Информатика в школе №54 <${process.env.MAIL_USER}>`, to,
        subject: "Восстановление пароля",
        html: `Здравствуйте!<br>Для восстановления пароля перейдите по ссылке: <a href="${link}" target="_blank">${link}</a>.`
    });
}

export function emailValidator() {return string({pattern: /[a-zA-Z0-9_.-]+@[a-zA-Z_.-0-9]+\.(ru|com)/});}

export async function sendEventConfirmEmail(to: string, event: string, summaryLink: string | undefined, formFields: Record<string, string>) {
    await mailer.sendMail({
        from: `Информатика в школе №54 <${process.env.MAIL_USER}>`, to,
        subject: `Регистрация на событие "${event}"`,
        html: `Вы зарегистрировались на событие "${event}".<br>Вот ваши ответы на форму:`
            + Object.entries(formFields).map(([x, y]) => `${x}: ${y}`).join("<br>")
            + (summaryLink ? `<br>Подробнее: ${summaryLink}` : ""),
    });
}
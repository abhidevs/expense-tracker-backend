"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendmail = (mailTo, subject, text, html) => {
    const msg = {
        to: mailTo,
        from: {
            name: "Expense Tracker",
            email: process.env.SENDGRID_SENDER_EMAIL,
        },
        subject: subject,
        text: text,
        html: html,
    };
    return mail_1.default.send(msg);
};
exports.default = sendmail;

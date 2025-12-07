const nodemailer = require("nodemailer");

console.log("📨 SMTP DEBUG INFO:");
console.log("HOST:", process.env.SMTP_HOST || " NOT SET");
console.log("PORT:", process.env.SMTP_PORT || " NOT SET");
console.log("USER:", process.env.SMTP_USER || " NOT SET");
console.log("PASS:", process.env.SMTP_PASS ? "Loaded" : " NOT SET");
console.log("EMAIL:", process.env.FROM_EMAIL || " NOT SET");
console.log("---------------------------------------------------");

if (!process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.FROM_EMAIL) {
  console.error("SMTP env variables missing");
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendCapsuleEmail(recipients, subject, message) {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: recipients.join(","),
    subject,
    html: `<p>${message.replace(/\n/g, "<br>")}</p>`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendCapsuleEmail };

const nodemailer = require("nodemailer");
const { createReadStream } = require("fs");

module.exports = (nodemailer_config, kindle_email, title) => {
	const transporter = nodemailer.createTransport(nodemailer_config);
	const mail_options = {
		from: "raok",
		to: kindle_email,
		text: "Sent from raok.",
		subject: title,
		attachments: [
			{
				filename: `${title}.mobi`,
				content: createReadStream(`./newspapers/${title}.mobi`),
			},
		],
	};
	return transporter.sendMail(mail_options);
};

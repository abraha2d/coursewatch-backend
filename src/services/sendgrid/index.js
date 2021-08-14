import sgMail from "@sendgrid/mail";
import { sendgridKey, defaultEmail } from "../../config";

sgMail.setApiKey(sendgridKey);

export const sendMail = ({
  fromEmail = defaultEmail,
  toEmail,
  subject,
  content,
  contentType = "text/html"
}) => {
  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: subject,
    html: content
  };
  return sgMail.send(msg);
};

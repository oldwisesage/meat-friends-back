import { createTransport, getTestMessageUrl } from 'nodemailer';
// Haylie Huels
// haylie.huels42@ethereal.email
// E2s4a1g1jDkaKPZTMz

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.Mail_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

//TODO create a cool template for emails
function makeNiceEmail(text: string) {
  return `
    <div style="border: 1px solid black; padding: 20px; font-family: san-serif; line-height: 2; font-size: 20px;">
        <h2>Hello there!</h2>
        <p>${text}</p>
        <p>❤️, meat friends</p>
    </div>`;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = (await transport.sendMail({
    to,
    from: 'butcher@meatfriends.co',
    subject: 'Your password reset token',
    html: makeNiceEmail(`Your password reset token is here!
                <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
  })) as MailResponse;
  if (process.env.MAIL_USER?.includes('ethereal.email')) {
    console.log(`💌 Message sent! Here is a link: ${getTestMessageUrl(info)}`);
  }
}

import { sendRegisterNotificationMail, sendWelcomeMail } from "@/utils/mail";
import { forwardRegistrationData, stringToBool } from "@/utils/misc";

export async function POST(request: Request) {
  const requiredVars = [
    "SMTP_HOST",
    "SMTP_USERNAME",
    "SMTP_PASSWORD",
    "SMTP_PORT",
    "SMTP_TLS",
    "EMAIL_RECIPIENTS"
  ];
  for (const varName of requiredVars) {
    if (process.env[varName]) continue;
    console.log(`ERROR: Missing variable '${varName}'.`);
    return new Response(JSON.stringify({}), { status: 500 });
  }

  const transport = {
    host: process.env.SMTP_HOST!,
    port: +process.env.SMTP_PORT!,
    secure: stringToBool(process.env.SMTP_TLS),
    auth: { user: process.env.SMTP_USERNAME!, pass: process.env.SMTP_PASSWORD! }
  };

  const recipientEmails = process.env
    .EMAIL_RECIPIENTS!.split(",")
    .map((mail) => mail.trim());

  const body: Record<string, string | undefined> = await request.json();
  console.log("Registration Data" + JSON.stringify(body));

  const notificationSuccess = await sendRegisterNotificationMail(
    transport,
    recipientEmails,
    body
  );

  sendWelcomeMail(
    transport,
    {
      // validate
      language: body.language!,
      email: body.email!,
      firstName: body.firstName!,
      lastName: body.lastName!
    },
    recipientEmails
  )
    .then(() => {})
    .catch(() => {});

  if (process.env.REGISTER_ENDPOINT) {
    forwardRegistrationData(process.env.REGISTER_ENDPOINT, body)
      .then(() => {})
      .catch(() => {});
  }

  return new Response(undefined, { status: notificationSuccess ? 201 : 500 });
}

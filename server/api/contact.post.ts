import nodemailer from "nodemailer";
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const body = await useBody(event)

  const token: string = body.token
  const first: string = body.first
  const last: string = body.last
  const email: string = body.email
  const message: string = body.message
  const website: string | null = body.website

  if (token == '') {
    return { statusCode: 403, statusMessage: 'You must pass the reCaptcha to submit this form' }
  }

  const verified: any = await $fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    params: {
      secret: config.captchaKey,
      response: token
    },
  });
  const success: boolean = verified.success
  let emailInfo: any;

  if (!success) {
    return { statusCode: 403, statusMessage: 'Dear Robot, your human verification has failed' }
  }

  if (success) {
    const transporter = nodemailer.createTransport({
      host: "mail.hover.com",
      port: 587,
      secure: false,
      auth: {
        user: config.emailUsername,
        pass: config.emailPassword,
      }
    });

    emailInfo = await transporter.sendMail({
      from: `"Brett Anda" <${config.emailUsername}>`,
      to: config.emailUsername,
      subject: `New form submission from Brettanda.ca`,
      text: `First name: ${first}\nLast name: ${last}\nEmail: ${email}\nWebsite: ${website}\nMessage: ${message}`,
    })

    return { statusCode: 200, statusMessage: "Thanks for your message, I will get back to you as soon as possible." }
  }

  return { statusCode: 500, statusMessage: "Something went wrong" }
})

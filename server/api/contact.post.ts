// import { createTransport } from "nodemailer";
const config = useRuntimeConfig()

// function createMailClient() {
//   return createTransport({
//       host: "mail.hover.com",
//       port: 465,
//       secure: true,
//       // dkim: {
//       //   domainName: "brettanda.ca",
//       //   keySelector: "",
//       //   privateKey: ""
//       // },
//       auth: {
//         user: config.emailUsername,
//         pass: config.emailPassword,
//       }
//     });
// }

export default defineEventHandler(async (event) => {
  return { statusCode: 418, statusMessage: "🍵" }
  const body = await useBody(event)

  const token: string = body.token
  const firstname: string = body.firstname
  const lastname: string = body.lastname
  const email: string = body.email
  const message: string = body.message
  const website: string | null = body.website

  const verified = verifyTurnstileToken(token)
  console.log(verified)

  // if (token == '') {
  //   return { statusCode: 403, statusMessage: 'You must pass the reCaptcha to submit this form' }
  // }

  // const verified: any = await $fetch("https://www.google.com/recaptcha/api/siteverify", {
  //   method: "POST",
  //   params: {
  //     secret: config.captchaKey,
  //     response: token
  //   },
  // });
  // const success: boolean = verified.success
  let emailInfo: any;

  // if (!success) {
  //   return { statusCode: 403, statusMessage: 'Dear Robot, your human verification has failed' }
  // }

  // if (success) {
  try {
    // const transporter = createMailClient()

    // emailInfo = await transporter.sendMail({
    //   from: `"Brett Anda" <${config.emailUsername}>`,
    //   to: config.emailUsername,
    //   subject: `New form submission from Brettanda.ca`,
    //   text: `First name: ${firstname}\nLast name: ${lastname}\nEmail: ${email}\nWebsite: ${website}\nMessage: ${message}`,
    // })

    // setResponseStatus(200, "Thanks for your message, I will get back to you as soon as possible.")
    return { statusCode: 200, statusMessage: "Thanks for your message, I will get back to you as soon as possible." }

  } catch (error) {
    console.log(error);
    return { statusCode: 500, statusMessage: "Something went wrong" }
    // setResponseStatus(500, "Something went wrong")
  }
  // }

  // setResponseStatus(500, "Something went wrong")

  // } catch {
  // }
  // }

  return { statusCode: 500, statusMessage: "Something went wrong" }
})

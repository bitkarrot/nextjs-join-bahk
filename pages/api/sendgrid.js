import sendgrid from "@sendgrid/mail";
import format from "../format";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  let content = req.body.message;
  let memberdata = format(content);
  console.log(memberdata);

  try {
    await sendgrid.send({
      to: "join@bitcoin.org.hk", // Your email where you'll receive emails
      from: "join@bitcoin.org.hk", // your website email address here
      subject: `[BAHK New Member Application] : ${req.body.type}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>New Member Application</title>
        <meta name="description" content="New Member Application">
        <meta name="author" content="SitePoint">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      </head>

      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h2>You've got a new member application!</h2>
              <h3> NOTE: this message does not confirm
              they have paid dues. </h3>
              <h3>Leo, please check BTCPAY Server for payment </h3>
              <div style="font-size: 16px;">
              <p>Message:</p>
              <div> ${memberdata} </div>
              <br>
              </div>
              <img src="https://www.bitcoin.org.hk/images/bahk-logo-big-white.svg" class="logo-image" style="height: 50px;width: 50px;border-radius: 5px;overflow: hidden;">
              <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Coded by bitkarrot<br>SendGrid email for bitcoin.org.hk<br></p>
              <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
                <a href="https://bitcoin.org.hk/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">
                Bitcoin HK    
                </a>
              </div>
              </div>
      </body>
      </html>`,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;

import nodemailer from 'nodemailer';

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendWelcomeEmail = async (email) => {
    await transporter.sendMail({
        from: `"Blogify" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "🎉 Welcome to Blogify!",

        html: `
        <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" style="padding:40px 20px;">

                        <table width="600" cellpadding="0" cellspacing="0"
                        style="background:#ffffff;border-radius:18px;overflow:hidden;
                        box-shadow:0 10px 30px rgba(0,0,0,.08);">

                            <!-- Header -->
                            <tr>
                                <td style="background:#5044E5;padding:45px;text-align:center;">
                                    <h1 style="margin:0;color:#ffffff;font-size:34px;">
                                        Welcome to Blogify 🎉
                                    </h1>

                                    <p style="margin-top:15px;color:#e9e7ff;font-size:17px;">
                                        Thank you for joining our growing community of readers,
                                        creators, and lifelong learners.
                                    </p>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td style="padding:40px;color:#444;line-height:1.8;">

                                    <h2 style="margin-top:0;color:#222;">
                                        Your subscription is confirmed!
                                    </h2>

                                    <p>
                                        We're excited to have you with us.
                                    </p>

                                    <p>
                                        Blogify is a place to discover fresh ideas, expert insights,
                                        and engaging stories from a wide range of industries and interests.
                                    </p>

                                    <h3 style="color:#5044E5;margin-top:30px;">
                                        Here's what you can look forward to:
                                    </h3>

                                    <ul style="padding-left:22px;">
                                        <li>📚 Thought-provoking articles</li>
                                        <li>💼 Business & Startup insights</li>
                                        <li>💻 Technology & AI trends</li>
                                        <li>🌍 Lifestyle, Travel & Culture</li>
                                        <li>💰 Finance & Personal Growth</li>
                                        <li>🎯 Productivity tips & expert opinions</li>
                                    </ul>

                                    <p style="margin-top:25px;">
                                        Whether you're here to learn something new, stay informed,
                                        or simply explore different perspectives, Blogify is built to inspire curiosity every day.
                                    </p>

                                    <div style="text-align:center;margin:40px 0;">
                                        <a href="https://your-blogify-url.com"
                                        style="background:#5044E5;
                                        color:white;
                                        text-decoration:none;
                                        padding:15px 34px;
                                        border-radius:10px;
                                        font-weight:bold;
                                        display:inline-block;">
                                        Explore Blogify →
                                        </a>
                                    </div>

                                    <hr style="border:none;border-top:1px solid #eeeeee;">

                                    <p style="font-size:14px;color:#777;">
                                        You're receiving this email because you subscribed to Blogify.
                                        Stay tuned for curated articles, featured stories, and exciting updates.
                                    </p>

                                    <p style="margin-bottom:0;">
                                        Happy Reading ❤️,<br><br>
                                        <strong>The Blogify Team</strong>
                                    </p>

                                </td>
                            </tr>

                        </table>

                    </td>
                </tr>
            </table>
            </div>
        `
    });
};
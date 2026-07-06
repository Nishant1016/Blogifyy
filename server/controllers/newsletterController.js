import Newsletter from "../models/newsletter.js";
import { sendWelcomeEmail } from "../utils/sendEmail.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required",
      });
    }

    const existingEmail = await Newsletter.findOne({ email });

    if (existingEmail) {
      return res.json({
        success: false,
        message: "You are already subscribed.",
      });
    }

    await Newsletter.create({ email });
    
    try {
      await sendWelcomeEmail(email);
    } catch (error) {
      console.error("Error sending welcome email:", error.message);
    }

    res.json({
      success: true,
      message: "Successfully subscribed!",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
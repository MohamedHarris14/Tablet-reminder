// app.js
const express = require("express");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const app = express();
const PORT = 8010;
require("dotenv").config();

// Configure your email transporter (use Gmail or any SMTP service)
const transporter = nodemailer.createTransport({
  service: "gmail", // or "hotmail", "yahoo", etc.
  auth: {
    user: process.env.EMAIL_USER,   // replace with your email
    pass: process.env.EMAIL_PASS       // use App Password, not real password
  }
});

// Function to send reminder mail
function sendReminder(time) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,  // replace with recipient email
    subject: "Tablet Reminder",
    text: `It's ${time}! tablet 💊 poda maranthuratha pondatti 😻 😘.`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log(`Reminder sent (${time}):`, info.response);
    }
  });
}

// Schedule jobs
// Morning 9:00
cron.schedule("47 11 * * *", () => {
  sendReminder("Morning 9:00 AM");
}, { timezone: "Asia/Kolkata" });

// Evening 9:00
cron.schedule("0 21 * * *", () => {
  sendReminder("Evening 9:00 PM");
}, { timezone: "Asia/Kolkata" });

app.get("/", (req, res) => {
  res.render("index", { status: "Tablet Reminder Service is running ✅" });
});

app.get("/test", async (req, res) => {
  try {
    await sendReminder("Manual Test Reminder");
    res.send("✅ Test email sent successfully!");
  } catch (err) {
    res.send("❌ Error sending email: " + err.message);
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




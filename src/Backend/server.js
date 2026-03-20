require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// POST API for Contact Form
app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Transporter setup (Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { 
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Enquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email Sent Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error Sending Email" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
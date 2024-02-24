const sendVerifyMail = asyncHandler(async (name, email, user_id) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification",
        html: `
        <div class="container">
        <h1>Welcome to Educative!</h1>
        <h2>Email Verification</h2>
        <p>We're excited to have you onboard. To complete your registration and unlock all the benefits of Educative, please click the button below to verify your email address:</p>
        <a href="http://localhost:4000/api/v1/user/student/verify?id=${user_id}" class="btn">Verify Email</a>
        <p>If you did not request this verification, please ignore this email.</p>
        </div>
      `,
        text: "hello",
      };
  
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending verification email:", error.message);
          throw new Error("Failed to send verification email");
        }
        //console.log("Verification email sent:", info);
      });
    } catch (error) {
      console.error("Error sending verification email:", error.message);
      throw new Error("Failed to send verification email");
    }
  });
const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");
const { comparePassword } = require("../utils/encryptPass");
const { generateAccessToken } = require("../utils/jwtToken");
const sendmail = require("../utils/sendmail");
const { v4: uuidv4 } = require("uuid");

exports.registerUser = async (req, res) => {
  try {
    const checkUser = await UserService.checkIfUserExists(req.body);
    if (checkUser) {
      res.status(403).json({ message: "User already exists!", success: false });
    } else {
      await AuthService.createUser(req.body);
      res.status(201).json({
        message: "Signed up successfully. Please login.",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const checkUser = await UserService.checkIfUserExists(req.body);
    if (checkUser) {
      const match = await comparePassword(
        req.body.password,
        checkUser.password
      );
      if (match) {
        const token = generateAccessToken({
          id: checkUser.id,
          name: checkUser.name,
          email: checkUser.email,
        });
        res.json({
          accessToken: token,
          isPremiumMember: checkUser.isPremiumMember,
        });
      } else {
        res.status(401).json({ message: "Wrong password!", success: false });
      }
    } else {
      res.status(404).json({ message: "User not found!", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const checkUser = await UserService.checkIfUserExists(req.body);
    if (!checkUser) {
      res.status(404).json({ message: "User not found", success: false });
    } else {
      const uid = uuidv4();
      await AuthService.createForgetPassRequest(checkUser, uid);
      const passResetLink = `http://localhost:3000/api/auth/resetpassword/${uid}`;

      const mailSubject = "Reset password for Expense tracker";
      const mailText = `Hello ${checkUser.name},
      A request has been received to change the password for your account on Expense tracker.

      Click on the link below to reset your password
      ${passResetLink}`;
      const mailHtml = `<strong>Hello ${checkUser.name}</strong>,
      <p>A request has been received to change the password for your account on Expense tracker.</p>

      <p>Click on the link below to reset your password</p>
      <a href="${passResetLink}">${passResetLink}</a>`;

      sendmail(req.body.email, mailSubject, mailText, mailHtml)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      res.status(200).json({
        message:
          "An email with password reset link has been sent to your mail.",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getResetPassword = async (req, res) => {
  try {
    const check = await AuthService.checkForgetPassRequest(req.params.id);
    if (!check) {
      res.status(404).send("<h1>Reset entry not found!</h1>");
    } else {
      console.log(check);
      res.send(`
        <html>
        <head><title>Reset Password</title></head>
        <body>
        <form method="POST" action="http://localhost:3000/api/auth/resetpassword/${check.id}" onsubmit="return checkPasswords()">
          <input name="password" placeholder="Enter new password" />
          <input name="repeatPass" placeholder="Repeat new password" />
          <input type="submit" value="Reset" />
        </form>

        <script>
          function checkPasswords () {
            const formData = new FormData(document.forms[0]);
            console.log(formData.get('password'), formData.get('repeatPass'));
            if(formData.get('password') !== formData.get('repeatPass')) {
              alert('Passwords don"t match');
              return false;
            }
          }
        </script>
        </body>
        </html>
      `);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.postResetPassword = async (req, res) => {
  try {
    const check = await AuthService.checkForgetPassRequest(req.params.id);
    if (!check) {
      res.status(404).send("<h1>Reset entry not found.</h1>");
    } else {
      console.log(check);
      const { password, repeatPass } = req.body;
      if (password !== repeatPass)
        return res.status(401).send("<h1>Passwords don't match!</h1>");

      await UserService.findUserByIdAndUpdatePassword(check.userId, password);
      await AuthService.deactivateForgetPassRequest(check.id);
      return res.status(200).send("<h1>Password changed successfully.</h1>");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

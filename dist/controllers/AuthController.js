"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResetPassword = exports.getResetPassword = exports.forgetPassword = exports.loginUser = exports.registerUser = void 0;
const AuthService = __importStar(require("../services/AuthService"));
const UserService = __importStar(require("../services/UserService"));
const encryptPass_1 = require("../utils/encryptPass");
const jwtToken_1 = require("../utils/jwtToken");
const sendmail_1 = __importDefault(require("../utils/sendmail"));
const uuid_1 = require("uuid");
const uuidv4 = uuid_1.v4;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield UserService.checkIfUserExists(req.body);
        if (checkUser) {
            res.status(403).json({ message: "User already exists!", success: false });
        }
        else {
            yield AuthService.createUser(req.body);
            res.status(201).json({
                message: "Signed up successfully. Please login.",
                success: true,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield UserService.checkIfUserExists(req.body);
        if (checkUser) {
            const match = yield (0, encryptPass_1.comparePassword)(req.body.password, checkUser.password);
            if (match) {
                const token = (0, jwtToken_1.generateAccessToken)({
                    id: checkUser.id,
                    name: checkUser.name,
                    email: checkUser.email,
                });
                res.json({
                    accessToken: token,
                    isPremiumMember: checkUser.isPremiumMember,
                });
            }
            else {
                res.status(401).json({ message: "Wrong password!", success: false });
            }
        }
        else {
            res.status(404).json({ message: "User not found!", success: false });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.loginUser = loginUser;
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield UserService.checkIfUserExists(req.body);
        if (!checkUser) {
            res.status(404).json({ message: "User not found", success: false });
        }
        else {
            const uid = uuidv4();
            yield AuthService.createForgetPassRequest(checkUser, uid);
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
            (0, sendmail_1.default)(req.body.email, mailSubject, mailText, mailHtml)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            res.status(200).json({
                message: "An email with password reset link has been sent to your mail.",
                success: true,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.forgetPassword = forgetPassword;
const getResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield AuthService.checkForgetPassRequest(req.params.id);
        if (!check) {
            res.status(404).send("<h1>Reset entry not found!</h1>");
        }
        else {
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
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.getResetPassword = getResetPassword;
const postResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield AuthService.checkForgetPassRequest(req.params.id);
        if (!check) {
            res.status(404).send("<h1>Reset entry not found.</h1>");
        }
        else {
            console.log(check);
            const { password, repeatPass } = req.body;
            if (password !== repeatPass)
                return res.status(401).send("<h1>Passwords don't match!</h1>");
            yield UserService.findUserByIdAndUpdatePassword(check.userId, password);
            yield AuthService.deactivateForgetPassRequest(check.id);
            return res.status(200).send("<h1>Password changed successfully.</h1>");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.postResetPassword = postResetPassword;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupHandler = void 0;
const email_1 = require("../utils/email");
const signupHandler = async (req, res) => {
    try {
        // getting the email from the request
        const { email = "" } = req.body;
        // validating the email
        if (!email) {
            throw new Error("email is required!");
        }
        if (!(0, email_1.isEmailValid)(email)) {
            throw new Error("email is not valid");
        }
        return res.status(200).json({ message: "ok" });
    }
    catch (error) {
        console.log(error);
        throw new Error();
    }
};
exports.signupHandler = signupHandler;
//# sourceMappingURL=signup.controller.js.map
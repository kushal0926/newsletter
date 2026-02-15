"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailValid = void 0;
const EMAIL_REGEX = /^(?!.*\.\.)(?!.*\.$)[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const isEmailValid = (email) => {
    return EMAIL_REGEX.test(email);
};
exports.isEmailValid = isEmailValid;
//# sourceMappingURL=email.js.map
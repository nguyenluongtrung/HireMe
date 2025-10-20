import { EMAIL_REGEX } from "./regex";

export const PASSWORD_VALIDATION = {
  required: "Mật khẩu là bắt buộc",
  minLength: {
    value: 6,
    message: "Mật khẩu phải có ít nhất 6 ký tự",
  },
  maxLength: {
    value: 100,
    message: "Mật khẩu không được vượt quá 100 ký tự",
  },
};

export const EMAIL_VALIDATION = {
  required: "Email là bắt buộc",
  pattern: {
    value: EMAIL_REGEX,
    message: "Email không hợp lệ",
  },
  minLength: {
    value: 6,
    message: "Email phải có ít nhất 6 ký tự",
  },
  maxLength: {
    value: 255,
    message: "Email không được vượt quá 255 ký tự",
  },
};

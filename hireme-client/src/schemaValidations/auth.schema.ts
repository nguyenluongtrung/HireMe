import z from "zod";

export const LoginBody = z
  .object({
    email: z
      .string()
      .nonempty('Email không được để trống')
      .email("Email không hợp lệ"),
    password: z
      .string()
      .nonempty("Mật khẩu không được để trống")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(100, "Mật khẩu không được dài quá 100 ký tự"),
  })
  .strict();

export type LoginBodyType = z.infer<typeof LoginBody>;

export const LoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    account: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      role: z.enum(["USER", "ADMIN"]),
    }),
  }),
  message: z.string(),
});

export type LoginResType = z.infer<typeof LoginRes>;

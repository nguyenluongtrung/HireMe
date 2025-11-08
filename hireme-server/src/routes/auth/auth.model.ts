import z from "zod"

import { UserSchema } from "src/shared/models/shared-user.model"

export const LoginBodySchema = UserSchema.pick({
  email: true,
  password: true,
}).strict()

export const LoginResSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export const RegisterBodySchema = UserSchema.pick({ email: true, password: true, name: true })
  .extend({ confirmPassword: z.string().min(6).max(100) })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({ code: "custom", message: "Password and confirm password must match", path: ["confirmPassword"] })
    }
  })
export const UpdateMeBodySchema = UserSchema.pick({
  email: true,
  password: true,
  name: true,
  phoneNumber: true,
  avatarUrl: true,
})
  .extend({ confirmPassword: z.string().min(6).max(100) })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({ code: "custom", message: "Password and confirm password must match", path: ["confirmPassword"] })
    }
  })

export const PublicUserSchema = UserSchema.omit({ password: true })

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>
export type RegisterResType = z.infer<typeof PublicUserSchema>
export type LoginBodyType = z.infer<typeof LoginBodySchema>
export type LoginResType = z.infer<typeof LoginResSchema>
export type GetMeResType = z.infer<typeof PublicUserSchema>
export type UpdateMeBodyType = z.infer<typeof UpdateMeBodySchema>
export type UpdateMeResType = z.infer<typeof PublicUserSchema>

import { z } from "zod";

export const authSchema = z.object({
  email: z.string().min(3, "Username ít nhất 3 ký tự"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export type AuthInput = z.infer<typeof authSchema>;

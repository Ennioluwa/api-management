import * as z from "zod";

export const ContactSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  title: z.string().min(1, {
    message: "Message title is required",
  }),
  body: z.string().min(1, {
    message: "Message body is required",
  }),
});
export const SignupSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required",
  }),
});
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

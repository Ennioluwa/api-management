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

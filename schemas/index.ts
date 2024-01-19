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

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const PasswordResetSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export const BusinessInformationSchema = z.object({
  businessName: z.string().min(1, {
    message: "Business name is required",
  }),
  businessIndustry: z.string().min(1, {
    message: "Business industry is required",
  }),
  businessAddress: z.string().min(1, {
    message: "Business address is required",
  }),
  businessLocation: z.string().min(1, {
    message: "Business Location is required",
  }),
});

export const BusinessIdentitySchema = z.object({
  businessTpid: z.string().min(1, {
    message: "Business TPID is required",
  }),
  branchId: z.string().min(1, {
    message: "Branch ID is required",
  }),
  businessSerialNumber: z.string().min(1, {
    message: "Business serial number is required",
  }),
});

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const AddUserModalSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  roles: z.array(optionSchema).min(1),
});

export const AddApiKeySchema = z.object({
  ApiKeyName: z.string().min(1, {
    message: "App name is required",
  }),
});

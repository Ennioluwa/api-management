import * as z from "zod";

enum CountryCode {
  NG = "NG",
  PH = "PH",
  ZM = "ZM",
  GH = "GH",
  MY = "MY",
  FR = "FR",
  CN = "CN",
}

const phoneRegex = {
  [CountryCode.NG]: /^\+?234\d{10}$/,
  [CountryCode.ZM]: /^\+?26\d{9}$/,
  [CountryCode.PH]: /^\+?63\d{10}$/,
  [CountryCode.GH]: /^\+?23\d{9}$/,
  [CountryCode.MY]: /^\+?6\d{8,9}$/,
  [CountryCode.FR]: /^\+?33\d{9}$/,
  [CountryCode.CN]: /^\+?86\d{11}/,
};

const phoneSchema = z.string().refine(
  (value) => {
    const code = value.slice(0, 2) as CountryCode;
    return phoneRegex[code].test(value);
  },
  { message: "Invalid phone number" }
);

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

const strongPassword = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must be minimum 8 characters including at least one upper case, one lower case, one number and one special character",
    }
  );

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
  password: strongPassword,
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: strongPassword,
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const PasswordResetSchema = z
  .object({
    password: strongPassword,
    confirmPassword: strongPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export const ChangePasswordSchema = z
  .object({
    newPassword: strongPassword,
    confirmPassword: strongPassword,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
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
  phone: z.string().min(6, { message: "Valid phone number is required" }),
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

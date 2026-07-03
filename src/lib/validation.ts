import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.email("Enter a valid email address.").trim().toLowerCase(),
  phone: z.string().trim().optional(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const LoginSchema = z.object({
  email: z.email("Enter a valid email address.").trim().toLowerCase(),
  password: z.string().min(1, "Enter your password."),
});

export const OrderSchema = z
  .object({
    tier: z.enum(["SIMPLE", "STANDARD", "ELABORATE", "HOLIDAY_BUNDLE"]),
    itemCount: z.coerce.number().int().min(1, "At least 1 item.").max(500),
    deliveryType: z.enum(["PICKUP", "DELIVERY"]),
    addressStreet: z.string().trim().optional(),
    addressCity: z.string().trim().optional(),
    addressState: z.string().trim().optional(),
    addressZip: z.string().trim().optional(),
    rush: z.coerce.boolean().default(false),
    neededBy: z.string().min(1, "Choose the date you need this by."),
    contactName: z.string().trim().min(2, "Enter your name."),
    contactEmail: z.email("Enter a valid email address.").trim().toLowerCase(),
    contactPhone: z.string().trim().min(7, "Enter a phone number we can reach you at."),
    notes: z.string().trim().optional(),
    confirmed: z.coerce.boolean().refine((v) => v === true, {
      error: "Please confirm the order summary before submitting.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryType === "DELIVERY") {
      if (!data.addressStreet) {
        ctx.addIssue({
          code: "custom",
          path: ["addressStreet"],
          message: "Street address is required for delivery.",
        });
      }
      if (!data.addressCity) {
        ctx.addIssue({
          code: "custom",
          path: ["addressCity"],
          message: "City is required for delivery.",
        });
      }
      if (!data.addressState) {
        ctx.addIssue({
          code: "custom",
          path: ["addressState"],
          message: "State is required for delivery.",
        });
      }
      if (!data.addressZip) {
        ctx.addIssue({
          code: "custom",
          path: ["addressZip"],
          message: "ZIP code is required for delivery.",
        });
      }
    }
  });

export const WorkshopLeadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.email("Enter a valid email address.").trim().toLowerCase(),
  phone: z.string().trim().optional(),
  groupSize: z.coerce.number().int().min(1).max(500).optional(),
  preferredDate: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export const PartnerLeadSchema = z.object({
  businessName: z.string().trim().min(2, "Enter your business name."),
  contactName: z.string().trim().min(2, "Enter a contact name."),
  email: z.email("Enter a valid email address.").trim().toLowerCase(),
  phone: z.string().trim().optional(),
  businessType: z.string().trim().min(2, "Tell us what kind of business this is."),
  message: z.string().trim().optional(),
});

export const PricingConfigSchema = z.object({
  simplePrice: z.coerce.number().min(0),
  standardPrice: z.coerce.number().min(0),
  elaboratePrice: z.coerce.number().min(0),
  deliveryFee: z.coerce.number().min(0),
  rushFee: z.coerce.number().min(0),
  minimumOrder: z.coerce.number().min(0),
  holidayBundlePrice: z.coerce.number().min(0),
  holidayBundleNote: z.string().trim().min(1),
});

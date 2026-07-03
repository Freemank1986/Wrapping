"use server";

import { prisma } from "@/lib/prisma";
import { PartnerLeadSchema, WorkshopLeadSchema } from "@/lib/validation";

export type LeadFormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      success?: boolean;
    }
  | undefined;

export async function submitWorkshopLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const validated = WorkshopLeadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    groupSize: formData.get("groupSize") || undefined,
    preferredDate: formData.get("preferredDate"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const { name, email, phone, groupSize, preferredDate, message } = validated.data;

  await prisma.workshopLead.create({
    data: {
      name,
      email,
      phone: phone || null,
      groupSize: groupSize ?? null,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
      message: message || null,
    },
  });

  return { success: true, message: "Thanks! We'll be in touch to set up your workshop." };
}

export async function submitPartnerLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const validated = PartnerLeadSchema.safeParse({
    businessName: formData.get("businessName"),
    contactName: formData.get("contactName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    businessType: formData.get("businessType"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const { businessName, contactName, email, phone, businessType, message } = validated.data;

  await prisma.partnerLead.create({
    data: { businessName, contactName, email, phone: phone || null, businessType, message: message || null },
  });

  return { success: true, message: "Thanks! We'll reach out to talk partnership details." };
}

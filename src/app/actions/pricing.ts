"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { PricingConfigSchema } from "@/lib/validation";

export type PricingFormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      success?: boolean;
    }
  | undefined;

function toCents(dollars: number) {
  return Math.round(dollars * 100);
}

export async function updatePricing(
  _prevState: PricingFormState,
  formData: FormData,
): Promise<PricingFormState> {
  await requireAdmin();

  const validated = PricingConfigSchema.safeParse({
    simplePrice: formData.get("simplePrice"),
    standardPrice: formData.get("standardPrice"),
    elaboratePrice: formData.get("elaboratePrice"),
    deliveryFee: formData.get("deliveryFee"),
    rushFee: formData.get("rushFee"),
    minimumOrder: formData.get("minimumOrder"),
    holidayBundlePrice: formData.get("holidayBundlePrice"),
    holidayBundleNote: formData.get("holidayBundleNote"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const data = validated.data;
  const existing = await prisma.pricingConfig.findFirst();

  const values = {
    simplePricePerItem: toCents(data.simplePrice),
    standardPricePerItem: toCents(data.standardPrice),
    elaboratePricePerItem: toCents(data.elaboratePrice),
    deliveryFee: toCents(data.deliveryFee),
    rushFee: toCents(data.rushFee),
    minimumOrder: toCents(data.minimumOrder),
    holidayBundlePrice: toCents(data.holidayBundlePrice),
    holidayBundleNote: data.holidayBundleNote,
  };

  if (existing) {
    await prisma.pricingConfig.update({ where: { id: existing.id }, data: values });
  } else {
    await prisma.pricingConfig.create({ data: values });
  }

  revalidatePath("/pricing");
  revalidatePath("/book");
  revalidatePath("/dashboard/admin/pricing");

  return { success: true, message: "Pricing updated." };
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireAdmin } from "@/lib/dal";
import { OrderSchema } from "@/lib/validation";
import { calculateOrderPrice } from "@/lib/pricing";
import { getPricingConfig } from "@/lib/pricing-config";

export type OrderFormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
    }
  | undefined;

export async function createOrder(
  _prevState: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?callbackUrl=/book");
  }

  const validated = OrderSchema.safeParse({
    tier: formData.get("tier"),
    itemCount: formData.get("itemCount"),
    deliveryType: formData.get("deliveryType"),
    addressStreet: formData.get("addressStreet"),
    addressCity: formData.get("addressCity"),
    addressState: formData.get("addressState"),
    addressZip: formData.get("addressZip"),
    rush: formData.get("rush") === "true",
    neededBy: formData.get("neededBy"),
    contactName: formData.get("contactName"),
    contactEmail: formData.get("contactEmail"),
    contactPhone: formData.get("contactPhone"),
    notes: formData.get("notes"),
    confirmed: formData.get("confirmed") === "true",
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const data = validated.data;

  const neededByDate = new Date(data.neededBy);
  if (Number.isNaN(neededByDate.getTime())) {
    return { message: "That date doesn't look right." };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (neededByDate < today) {
    return { message: "The date you need this by can't be in the past." };
  }

  const config = await getPricingConfig();
  const quote = calculateOrderPrice(config, {
    tier: data.tier,
    itemCount: data.itemCount,
    deliveryType: data.deliveryType,
    rush: data.rush,
  });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      tier: data.tier,
      itemCount: data.itemCount,
      deliveryType: data.deliveryType,
      addressStreet: data.deliveryType === "DELIVERY" ? data.addressStreet : null,
      addressCity: data.deliveryType === "DELIVERY" ? data.addressCity : null,
      addressState: data.deliveryType === "DELIVERY" ? data.addressState : null,
      addressZip: data.deliveryType === "DELIVERY" ? data.addressZip : null,
      rush: data.rush,
      neededBy: neededByDate,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      notes: data.notes || null,
      subtotal: quote.subtotal,
      deliveryFee: quote.deliveryFee,
      rushFee: quote.rushFee,
      total: quote.total,
      status: "PENDING_REVIEW",
    },
  });

  revalidatePath("/dashboard");
  redirect(`/dashboard?justBooked=${order.id}`);
}

export async function approveOrder(orderId: string) {
  await requireAdmin();
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "APPROVED", declineReason: null },
  });
  revalidatePath("/dashboard/admin/orders");
  revalidatePath("/dashboard");
}

export async function declineOrder(orderId: string, reason: string) {
  await requireAdmin();
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "DECLINED", declineReason: reason || null },
  });
  revalidatePath("/dashboard/admin/orders");
  revalidatePath("/dashboard");
}

export async function markOrderCompleted(orderId: string) {
  await requireAdmin();
  await prisma.order.update({
    where: { id: orderId },
    data: { status: "COMPLETED" },
  });
  revalidatePath("/dashboard/admin/orders");
  revalidatePath("/dashboard");
}

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const existingConfig = await prisma.pricingConfig.findFirst();
  if (!existingConfig) {
    await prisma.pricingConfig.create({
      data: {
        simplePricePerItem: 900,
        standardPricePerItem: 1600,
        elaboratePricePerItem: 2800,
        deliveryFee: 1500,
        rushFee: 2000,
        minimumOrder: 2500,
        holidayBundlePrice: 22500,
        holidayBundleNote:
          "Best for 15+ gifts. One flat price, no counting items — just hand over the whole pile.",
      },
    });
    console.log("Seeded default pricing config.");
  } else {
    console.log("Pricing config already exists, skipping.");
  }

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@wrapt.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "AdminWrap123!";

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        name: "Wrapt Admin",
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log(`Seeded admin user: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log("Admin user already exists, skipping.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

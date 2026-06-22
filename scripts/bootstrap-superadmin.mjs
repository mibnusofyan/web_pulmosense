import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
const name = process.env.PARUSCAN_SUPERADMIN_NAME?.trim();
const email = process.env.PARUSCAN_SUPERADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.PARUSCAN_SUPERADMIN_PASSWORD;

if (!connectionString || !name || !email || !password) {
  throw new Error(
    "DATABASE_URL and PARUSCAN_SUPERADMIN_NAME/EMAIL/PASSWORD are required",
  );
}

if (password.length < 10) {
  throw new Error("PARUSCAN_SUPERADMIN_PASSWORD must contain at least 10 characters");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(connectionString),
});

try {
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true, passwordHash: true, role: true },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hash(password, 12),
        role: "superadmin",
      },
    });
    console.log(`Created initial superadmin: ${email}`);
  } else {
    const passwordMatches = existing.passwordHash
      ? await compare(password, existing.passwordHash)
      : false;

    await prisma.user.update({
      where: { id: existing.id },
      data: {
        role: "superadmin",
        passwordHash: passwordMatches ? undefined : await hash(password, 12),
      },
    });
    console.log(`Initial superadmin is ready: ${email}`);
  }
} finally {
  await prisma.$disconnect();
}

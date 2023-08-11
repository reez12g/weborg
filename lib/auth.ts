import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
          required: true
        },
        password: {
          label: "Password",
          type: "password",
          required: true
        },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.email || !credentials?.password) return null;
        console.log("here");
        const company = await prisma.company.findMany();
        console.log(company);
        const administrator = await prisma.administrator.findUnique({
          where: {
            email: credentials.email
          }
        });
        console.log("here2");
        console.log(administrator);
        if (!administrator) return null;
        if (!await compare(credentials.password, administrator.password)) return null;

        return {
          id: administrator.id,
          name: administrator.name,
          email: administrator.email
        }
      },
    }),
  ],
};

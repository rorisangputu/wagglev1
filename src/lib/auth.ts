import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import db from "@/db/db";
import { loginSchema } from "./validationSchemas";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validated = loginSchema.parse(credentials);

        const user = await db.user.findUnique({
          where: { email: validated.email },
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(
          validated.password,
          user.password as string
        );
        if (!isValid) {
          return null;
        }

        if (!user.emailVerified) return null;

        return user;
      },
    }),
  ],
  pages: {
    error: "/auth/error",
  },
});

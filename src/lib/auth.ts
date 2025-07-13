import db from "@/db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { authLimiter } from "./rateLimiter";
import { loginSchema } from "./validationSchemas";

const adapter = PrismaAdapter(db);

export const { auth, handlers, signIn } = NextAuth({
  adapter: adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        //Rate Limiter based on ip address
        const ip = (await headers()).get("x-forwarded-for") ?? "anonymous";

        const { success } = await authLimiter.limit(ip);
        if (!success) {
          throw new Error("Too many login attempts. Try again later.");
        }

        //Validating credentials from sign in form
        const validatedCredentials = loginSchema.parse(credentials);

        //Search for user in db using validted email
        const user = await db.user.findFirst({
          where: { email: validatedCredentials.email },
        });

        //Throw new error if user with email is not found
        if (!user) {
          throw new Error("Invalid credentials");
        }

        //If user is present, compare password with hashed db password
        const isValid = await bcrypt.compare(
          validatedCredentials.password,
          user.password as string
        );
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        //Return user if credentials match
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});

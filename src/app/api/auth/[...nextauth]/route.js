import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error("Missing fields");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, name: true, email: true, password: true },
        });

        if (!user) throw new Error("User not found");
        if (!await bcrypt.compare(credentials.password, user.password)) throw new Error("Incorrect password");

        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "github") return true;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true },
      });

      if (existingUser) {
        if (!existingUser.accounts.some((acc) => acc.provider === "github")) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
          });
        }
        user.id = existingUser.id;
        user.image = existingUser.image || profile?.avatar_url;
        return true;
      }

      await prisma.user.create({
        data: {
          name: profile?.name || profile?.login || "GitHub User",
          email: user.email,
          image: profile?.avatar_url,
          accounts: {
            create: {
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
            },
          },
        },
      });
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token || {};
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.name = token.name;
        session.email = token.email;
        session.user = { image: token.image };
      }
      // Remove or comment out this line
      // console.log("Session:", session);
      return session || {};
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/auth/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
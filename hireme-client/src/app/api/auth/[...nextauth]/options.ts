import type { NextAuthOptions } from "next-auth";
// eslint-disable-next-line import/no-named-as-default
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import api from "@/base/api";

import { login } from "@/apiRequests/auth/api";

import { User } from "@/interfaces/user";

import { apiEndpoints } from "@/contants/routers";
import { ServerStatusCode } from "@/contants/enums";

import { decodeToken } from "@/lib/utils";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_ID),
      clientSecret: String(process.env.GOOGLE_SECRET),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "User login",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          // 1. Call login API
          const loginResponse = await login({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });
          const { data: loginData } = loginResponse;
          if (loginResponse?.status !== ServerStatusCode.OK) {
            throw new Error(loginData?.message);
          }

          const token = loginData?.accessToken;
          if (!token) {
            throw new Error("No token returned from login API");
          }

          // 2. Call "get me" API with token
          const meResponse = await api.get(apiEndpoints.SYSTEM.USER_PROFILE, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const { data: userData } = meResponse;
          // 3. Return user data + token to NextAuth
          return {
            user: {
              id: userData.id,
              name: userData.name,
              avatarUrl: userData.avatarUrl,
              email: userData.email,
            },
            token,
          } as any;
        } catch (err: any) {
          throw new Error(err.response?.data?.message);
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account }) {
      // ---- Credentials login (already OK) ----
      if (account?.provider === "credentials" && user) {
        token.accessToken = (user as any).token;
        token.user = (user as any).user;
      }

      // ---- Google login ----
      if (account?.provider === "google" && user) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/google/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idToken: account.id_token,
            }),
          },
        );

        const data = await res.json();

        token.accessToken = data.accessToken;
        token.user = { ...user };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      session.accessToken = token.accessToken as string;

      const decodedToken = decodeToken(session.accessToken);
      const expirationDate = new Date(decodedToken.exp * 1000);

      session.expires = expirationDate.toISOString();
      return Promise.resolve(session);
    },
  },
  theme: {
    colorScheme: "light",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
  },
};

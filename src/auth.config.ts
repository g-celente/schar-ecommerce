import type { NextAuthConfig } from "next-auth";
import { ROUTES } from "@/lib/constants";

/**
 * Edge-compatible auth config — used by middleware.
 * Must NOT import any Node.js-only modules (e.g. bcryptjs, fs).
 */
export default {
  pages: {
    signIn: ROUTES.login,
    error: ROUTES.login,
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ["/account", "/orders"];
      const isProtected = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL(ROUTES.login, nextUrl.origin);
        redirectUrl.searchParams.set("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }

      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

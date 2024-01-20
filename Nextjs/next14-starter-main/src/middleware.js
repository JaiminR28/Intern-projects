import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

export default NextAuth(authConfig).auth;

//~ matcher allows you to filter Middleware to run ( or not run like in the example) on specific paths. If you don't add any matcher. Middleware will be invoked for every route in the Project

export const config = {
	matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

// FOR MORE INFORMATION CHECK: https://nextjs.org/docs/app/building-your-application/routing/middleware

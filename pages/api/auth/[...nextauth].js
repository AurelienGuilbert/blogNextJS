import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "../../../models/user";
import bcrypt from "bcryptjs";
import dbConnect from "../../../config/dbConnect";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid Email");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.token = process.env.NEXTAUTH_SECRET;  // Setting token in session
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  // change TOKEN accoridng to the user name ?
  secret: process.env.NEXTAUTH_SECRET,
});

// import GoogleProvider from "next-auth/providers/google";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       authorization: {
//         params: {
//           access_type: "offline",
//           prompt: "consent",
//           response_type: "code",
//           scope:
//             "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.file",
//         },
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ profile }) {},
//     async session({ session }) {},
//   },
// } 
